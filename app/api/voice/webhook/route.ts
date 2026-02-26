import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { tenants, tickets, properties, phoneCalls, units } from "@/lib/db/schema";
import { eq, like, or } from "drizzle-orm";
import { inngest } from "@/lib/inngest/client";

/**
 * Retell AI Webhook Handler — Kai Voice Agent
 *
 * Receives POST events from Retell AI after inbound voice calls.
 * Endpoint: https://einfach-verwaltet.de/api/voice/webhook
 *
 * Flow:
 *   Tenant calls → Retell AI (Kai answers) → call ends
 *   → POST /api/voice/webhook (this file)
 *   → look up tenant by phone number
 *   → classify intent from transcript
 *   → create ticket in Neon DB (Drizzle)
 *   → trigger Inngest event for async processing
 *   → return call disposition to Retell
 */

// ─── Types ────────────────────────────────────────────────────────────────────

interface RetellTranscriptItem {
  role: "agent" | "user";
  content: string;
  words?: Array<{ word: string; start: number; end: number }>;
}

interface RetellWebhookPayload {
  event: "call_started" | "call_ended" | "call_analyzed";
  call: {
    call_id: string;
    call_type: "inbound" | "outbound";
    from_number: string;
    to_number: string;
    disconnection_reason?: string;
    start_timestamp: number;
    end_timestamp: number;
    duration_ms: number;
    transcript: RetellTranscriptItem[];
    recording_url?: string;
    summary?: string;
    user_sentiment?: "Positive" | "Neutral" | "Negative";
    call_successful?: boolean;
    call_analysis?: {
      call_summary?: string;
      in_voicemail?: boolean;
      user_sentiment?: string;
      call_successful?: boolean;
      custom_analysis_data?: Record<string, unknown>;
    };
  };
}

type Intent =
  | "emergency"
  | "repair"
  | "heating"
  | "payment"
  | "key"
  | "noise"
  | "mold"
  | "move_in"
  | "move_out"
  | "general";

// ─── Intent Classification ────────────────────────────────────────────────────

const INTENT_KEYWORDS: Record<Intent, string[]> = {
  emergency: ["wasserschaden", "rohrbruch", "feuer", "gasgeruch", "gas geruch", "stromausfall", "notfall", "112", "überschwemmung"],
  repair: ["reparatur", "kaputt", "defekt", "tropft", "leck", "broken", "defect", "geht nicht"],
  heating: ["heizung", "heizungsausfall", "warmwasser", "kalt", "heizt nicht"],
  payment: ["miete", "zahlung", "nebenkosten", "abrechnung", "betriebskosten", "kaution", "rechnung"],
  key: ["schlüssel", "ausgesperrt", "tür auf", "schloss", "eingang", "zugangscode"],
  noise: ["lärm", "ruhestörung", "laut", "musik", "party", "nachbar", "krach"],
  mold: ["schimmel", "feuchtigkeit", "modrig", "schwarz fleck", "schimmelfleck"],
  move_in: ["einzug", "einziehen", "neuer mieter", "mietvertrag", "übergabe", "wohnungsübergabe"],
  move_out: ["auszug", "ausziehen", "kündigen", "kündigung", "abmeldung"],
  general: ["frage", "information", "wie", "wann", "welche", "allgemein"],
};

function classifyIntent(transcript: RetellTranscriptItem[]): Intent {
  const text = transcript.map((t) => t.content.toLowerCase()).join(" ");

  // Emergency always wins
  for (const kw of INTENT_KEYWORDS.emergency) {
    if (text.includes(kw)) return "emergency";
  }

  const scores: Partial<Record<Intent, number>> = {};
  for (const [intent, keywords] of Object.entries(INTENT_KEYWORDS) as [Intent, string[]][]) {
    scores[intent] = keywords.filter((kw) => text.includes(kw)).length;
  }

  const sorted = (Object.entries(scores) as [Intent, number][])
    .filter(([, s]) => s > 0)
    .sort(([, a], [, b]) => b - a);

  return sorted[0]?.[0] ?? "general";
}

function calculateUrgency(intent: Intent, transcript: RetellTranscriptItem[]): number {
  if (intent === "emergency") return 5;
  const text = transcript.map((t) => t.content.toLowerCase()).join(" ");
  if (intent === "heating" || text.includes("kein warmwasser")) return 4;
  if (intent === "key") return 4;
  if (intent === "mold") return 4;
  if (intent === "repair" && (text.includes("winter") || text.includes("kalt"))) return 4;
  if (intent === "noise" && text.includes("nacht")) return 3;
  return intent === "repair" ? 3 : 2;
}

function intentToCategory(intent: Intent): string {
  const map: Record<Intent, string> = {
    emergency: "maintenance",
    repair: "maintenance",
    heating: "maintenance",
    mold: "maintenance",
    noise: "complaint",
    key: "general",
    payment: "payment",
    move_in: "general",
    move_out: "general",
    general: "general",
  };
  return map[intent];
}

// ─── DB Helpers ───────────────────────────────────────────────────────────────

async function lookupTenantByPhone(phoneNumber: string) {
  // Normalize: strip spaces, dashes; try last 8 digits for flexible matching
  const clean = phoneNumber.replace(/[\s\-+]/g, "");
  const suffix = clean.slice(-8);

  const tenant = await db.query.tenants.findFirst({
    where: or(like(tenants.phone, `%${suffix}`), like(tenants.phone, `%${clean}`)),
  });
  if (!tenant) return null;

  const unit = await db.query.units.findFirst({ where: eq(units.id, tenant.unitId) });
  const property = unit
    ? await db.query.properties.findFirst({ where: eq(properties.id, unit.propertyId) })
    : null;

  return { tenant, unit, property };
}

async function createTicket(
  call: RetellWebhookPayload["call"],
  ctx: Awaited<ReturnType<typeof lookupTenantByPhone>>,
  intent: Intent,
  urgency: number
) {
  const transcriptText = call.transcript
    .map((t) => `${t.role === "agent" ? "Kai" : "Mieter"}: ${t.content}`)
    .join("\n");

  const titleMap: Record<Intent, string> = {
    emergency: "🚨 NOTFALL (Sprachanruf)",
    repair: "Reparaturanfrage (Sprachanruf)",
    heating: "Heizungsausfall (Sprachanruf)",
    payment: "Zahlungsfrage (Sprachanruf)",
    key: "Schlüsselnotfall (Sprachanruf)",
    noise: "Lärmbeschwerde (Sprachanruf)",
    mold: "Schimmelmeldung (Sprachanruf)",
    move_in: "Einzugsanfrage (Sprachanruf)",
    move_out: "Auszugsfrage (Sprachanruf)",
    general: "Allgemeine Anfrage (Sprachanruf)",
  };

  const slaDeadline = new Date();
  slaDeadline.setHours(slaDeadline.getHours() + (urgency >= 4 ? 4 : urgency >= 3 ? 24 : 72));

  // Tickets require propertyId — skip creation if unknown caller
  if (!ctx?.property?.id) {
    throw new Error("Cannot create ticket: property unknown for caller " + call.from_number);
  }

  const [ticket] = await db
    .insert(tickets)
    .values({
      propertyId: ctx.property.id,
      ...(ctx?.tenant?.id && { tenantId: ctx.tenant.id }),
      ...(ctx?.property?.landlordId && { landlordId: ctx.property.landlordId }),
      title: titleMap[intent],
      description: transcriptText.substring(0, 4000),
      category: intentToCategory(intent),
      priority: urgency >= 4 ? "urgent" : urgency >= 3 ? "high" : "normal",
      status: "open",
      aiTriage: {
        intent,
        urgency,
        summary: call.summary ?? call.call_analysis?.call_summary ?? "",
        callId: call.call_id,
        source: "voice",
        phoneFrom: call.from_number,
      },
      slaDeadline,
    })
    .returning();

  return ticket;
}

async function persistPhoneCall(
  call: RetellWebhookPayload["call"],
  ctx: Awaited<ReturnType<typeof lookupTenantByPhone>>,
  ticketId: string | null,
  intent: Intent,
  urgency: number
) {
  try {
    await db.insert(phoneCalls).values({
      tenantId: ctx?.tenant?.id ?? undefined,
      propertyId: ctx?.property?.id ?? undefined,
      landlordId: ctx?.property?.landlordId ?? undefined,
      retellCallId: call.call_id,
      phoneFrom: call.from_number,
      phoneTo: call.to_number,
      startedAt: new Date(call.start_timestamp),
      endedAt: new Date(call.end_timestamp),
      durationSeconds: Math.round(call.duration_ms / 1000),
      transcript: call.transcript,
      aiSummary: call.summary ?? call.call_analysis?.call_summary ?? null,
      intent,
      ticketId: ticketId ?? undefined,
      recordingConsent: true,
      recordingUrl: call.recording_url ?? null,
      escalated: urgency >= 4,
      escalationReason: urgency >= 4 ? `Hochdringlich — Prio ${urgency}/5` : null,
    });
  } catch (err) {
    console.error("[voice/webhook] Failed to persist phone call:", err);
  }
}

// ─── Route Handlers ───────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const payload: RetellWebhookPayload = await request.json();

    // Only process end-of-call events
    if (payload.event !== "call_ended" && payload.event !== "call_analyzed") {
      return NextResponse.json({ status: "ignored", reason: payload.event });
    }

    const { call } = payload;

    // Skip outbound calls (only handle inbound tenant calls)
    if (call.call_type !== "inbound") {
      return NextResponse.json({ status: "ignored", reason: "outbound_call" });
    }

    // 1. Tenant lookup
    const ctx = await lookupTenantByPhone(call.from_number);

    // 2. Classify intent from transcript
    const intent = classifyIntent(call.transcript);
    const urgency = calculateUrgency(intent, call.transcript);

    // 3. Create ticket
    let ticket: { id: string } | null = null;
    try {
      ticket = await createTicket(call, ctx, intent, urgency);
    } catch (err) {
      console.error("[voice/webhook] Ticket creation failed:", err);
    }

    // 4. Persist phone call record
    await persistPhoneCall(call, ctx, ticket?.id ?? null, intent, urgency);

    // 5. Trigger Inngest for async processing (email, escalation, re-classification)
    await inngest.send({
      name: "tenant/voice-call-received",
      data: {
        callId: call.call_id,
        phoneNumber: call.from_number,
        tenantId: ctx?.tenant?.id ?? null,
        propertyId: ctx?.property?.id ?? null,
        landlordId: ctx?.property?.landlordId ?? null,
        intent,
        urgency,
        ticketId: ticket?.id ?? null,
        transcript: call.transcript,
        summary: call.summary ?? call.call_analysis?.call_summary ?? null,
        durationSeconds: Math.round(call.duration_ms / 1000),
        escalated: urgency >= 4,
      },
    });

    // 6. Return disposition to Retell AI
    return NextResponse.json({
      status: "processed",
      intent,
      urgency,
      ticketId: ticket?.id ?? null,
      tenantFound: !!ctx?.tenant,
      disposition: urgency >= 5 ? "emergency_escalated" : urgency >= 4 ? "escalated" : "ticket_created",
    });
  } catch (err) {
    console.error("[voice/webhook] Unhandled error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Health check — Retell uses GET to verify webhook URL
export async function GET() {
  return NextResponse.json({ status: "ok", service: "kai-voice-webhook", version: "1.0" });
}
