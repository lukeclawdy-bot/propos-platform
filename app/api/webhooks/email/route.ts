export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { db, hasDatabase } from "@/lib/db";
import { tenants, landlords, leads, tickets, conversations, units, properties } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { inngest } from "@/lib/inngest/client";
import { Resend } from "resend";

// POST /api/webhooks/email
// Resend inbound webhook — receives emails sent to *@einfach-verwaltet.de
//
// Resend Setup:
//   Dashboard → Domains → einfach-verwaltet.de → Inbound Routing
//   Webhook URL: https://einfach-verwaltet.de/api/webhooks/email
//   This catches ALL emails to *@einfach-verwaltet.de
//
// Identity resolution:
//   1. Match sender email → tenant  → create ticket (linked to property/unit)
//   2. Match sender email → landlord → create ticket (linked to landlord)
//   3. No match           → create lead (source: "email")

interface ResendInboundPayload {
  from: string;
  to: string[];
  subject: string;
  text?: string;
  html?: string;
  headers?: Record<string, string>;
  attachments?: Array<{
    filename: string;
    content: string; // base64
    contentType: string;
  }>;
}

function extractEmail(from: string): string {
  const match = from.match(/<(.+?)>/);
  return match ? match[1].toLowerCase().trim() : from.toLowerCase().trim();
}

function truncate(str: string, max: number): string {
  if (!str) return "";
  return str.length > max ? str.slice(0, max - 3) + "..." : str;
}

export async function POST(req: NextRequest) {
  let payload: ResendInboundPayload;

  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const fromRaw = payload.from ?? "";
  const fromEmail = extractEmail(fromRaw);
  const subject = truncate(payload.subject || "(Kein Betreff)", 100);
  const bodyText = (payload.text || payload.html?.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim() || "").slice(0, 5000);
  const attachmentCount = payload.attachments?.length ?? 0;

  let tenantId: string | null = null;
  let landlordId: string | null = null;
  let leadId: string | null = null;
  let newTicketId: string | null = null;

  if (hasDatabase && db) {
    try {
      // ── Step 1: Identify sender ──────────────────────────────────────────
      const [tenant] = await db
        .select({ id: tenants.id, unitId: tenants.unitId })
        .from(tenants)
        .where(eq(tenants.email, fromEmail));

      if (tenant) {
        tenantId = tenant.id;
      } else {
        const [landlord] = await db
          .select({ id: landlords.id })
          .from(landlords)
          .where(eq(landlords.email, fromEmail));

        if (landlord) {
          landlordId = landlord.id;
        } else {
          // Unknown sender — create lead
          const [newLead] = await db
            .insert(leads)
            .values({
              name: fromRaw.includes("<") ? fromRaw.split("<")[0].trim() : fromEmail,
              email: fromEmail,
              source: "email",
              pipelineStage: "identified",
              notes: `Inbound email to ${payload.to?.[0] ?? "?"}.\n\nBetreff: ${subject}\n\n${bodyText.slice(0, 500)}`,
            })
            .returning({ id: leads.id });
          leadId = newLead?.id ?? null;
        }
      }

      // ── Step 2: Create ticket (only when we know who sent it) ────────────
      if (tenantId || landlordId) {
        // Resolve property for ticket (propertyId is NOT NULL in schema)
        let resolvedPropertyId: string | null = null;
        let resolvedUnitId: string | null = null;

        if (tenantId && tenant?.unitId) {
          const [unit] = await db
            .select({ id: units.id, propertyId: units.propertyId })
            .from(units)
            .where(eq(units.id, tenant.unitId));

          if (unit?.propertyId) {
            resolvedUnitId = unit.id;
            resolvedPropertyId = unit.propertyId;
          }
        }

        if (!resolvedPropertyId && landlordId) {
          // Landlord email — find their first property
          const [prop] = await db
            .select({ id: properties.id })
            .from(properties)
            .where(eq(properties.landlordId, landlordId))
            .limit(1);
          resolvedPropertyId = prop?.id ?? null;
        }

        if (resolvedPropertyId) {
          const slaDeadline = new Date(Date.now() + 24 * 3600_000); // 24h default for email

          const [ticket] = await db
            .insert(tickets)
            .values({
              ...(tenantId ? { tenantId } : {}),
              ...(landlordId ? { landlordId } : {}),
              ...(resolvedUnitId ? { unitId: resolvedUnitId } : {}),
              propertyId: resolvedPropertyId,
              title: subject,
              description: bodyText.slice(0, 2000),
              category: "other",
              urgency: 2,
              priority: "normal",
              status: "open",
              slaDeadline,
            })
            .returning({ id: tickets.id });

          newTicketId = ticket?.id ?? null;

          // Log inbound message as conversation
          // conversations.landlordId is NOT NULL — resolve it
          if (newTicketId && (tenantId || landlordId)) {
            // For tenant-sourced tickets, get the landlordId via property
            let convLandlordId = landlordId;
            if (!convLandlordId && resolvedPropertyId) {
              const [prop] = await db
                .select({ landlordId: properties.landlordId })
                .from(properties)
                .where(eq(properties.id, resolvedPropertyId));
              convLandlordId = prop?.landlordId ?? null;
            }
            if (convLandlordId) {
              await db.insert(conversations).values({
                ...(tenantId ? { tenantId } : {}),
                landlordId: convLandlordId,
                ticketId: newTicketId,
                channel: "email",
                direction: "inbound",
                body: bodyText.slice(0, 5000),
                aiClassification: "other",
                aiUrgency: 2,
              });
            }
          }
        } else {
          // No property found — fall back to lead creation
          console.warn("[webhooks/email] Could not resolve property for", fromEmail, "— creating lead instead");
          const [newLead] = await db
            .insert(leads)
            .values({
              name: fromRaw.includes("<") ? fromRaw.split("<")[0].trim() : fromEmail,
              email: fromEmail,
              source: "email",
              pipelineStage: "identified",
              notes: `Inbound email (no property match).\nBetreff: ${subject}\n\n${bodyText.slice(0, 500)}`,
            })
            .returning({ id: leads.id });
          leadId = newLead?.id ?? null;
          tenantId = null;
          landlordId = null;
        }
      }
    } catch (dbErr) {
      // Never throw 500 to Resend — just log
      console.error("[webhooks/email] DB error:", dbErr);
    }
  } else {
    // Demo mode — no DB
    console.log("[webhooks/email] Demo mode: inbound email from", fromEmail, "|", subject);
    newTicketId = "demo-" + Date.now().toString(36);
  }

  // ── Step 3: Trigger Inngest event ──────────────────────────────────────────
  try {
    await inngest.send({
      name: "tenant/message.received",
      data: {
        source: "email",
        from: fromEmail,
        to: payload.to?.[0] ?? "unknown",
        subject,
        body: bodyText.slice(0, 2000),
        attachmentCount,
        ticketId: newTicketId,
        tenantId,
        landlordId,
        leadId,
      },
    });
  } catch (inngestErr) {
    console.error("[webhooks/email] Inngest error:", inngestErr);
  }

  // ── Step 4: Auto-reply via Resend ──────────────────────────────────────────
  try {
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey && fromEmail) {
      const resend = new Resend(resendKey);
      const ticketRef = newTicketId && !newTicketId.startsWith("demo")
        ? `\nIhre Referenznummer: ${newTicketId.slice(0, 8).toUpperCase()}`
        : "";
      await resend.emails.send({
        from: "anfrage@immo.einfach-verwaltet.de",
        to: [fromEmail],
        replyTo: "kontakt@einfach-verwaltet.de",
        subject: `Re: ${payload.subject || "Ihre Anfrage"}`,
        text: [
          "Vielen Dank für Ihre Nachricht.",
          "",
          "Ihre Nachricht wurde erhalten. Wir melden uns innerhalb von 15 Minuten.",
          ticketRef,
          "",
          "Mit freundlichen Grüßen",
          "Ihr Team von einfach verwaltet.",
          "",
          "---",
          "einfach verwaltet. — Hausverwaltung, die funktioniert.",
          "https://einfach-verwaltet.de",
        ]
          .filter((l) => l !== undefined)
          .join("\n"),
      });
    }
  } catch (emailErr) {
    console.error("[webhooks/email] Auto-reply error:", emailErr);
  }

  // Always 200 — Resend expects success
  return NextResponse.json({
    ok: true,
    ticketId: newTicketId,
    tenantId,
    landlordId,
    leadId,
  });
}
