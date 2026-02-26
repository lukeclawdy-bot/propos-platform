import { inngest } from "../client";
import { db } from "@/lib/db";
import { conversations, tickets, tenants } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";

export const tenantMessage = inngest.createFunction(
  { id: "tenant-message", name: "Tenant Message Handler" },
  { event: "tenant/message.received" },
  async ({ event, step }) => {
    const { message, tenantId, propertyId, landlordId, landlordEmail } = event.data;

    // Step 1: Classify message via OpenRouter
    const classification = await step.run("classify-message", async () => {
      if (!process.env.OPENROUTER_API_KEY) {
        return { category: "general", urgency: 2, summary: message.substring(0, 100) };
      }
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://einfach-verwaltet.de",
          "X-Title": "einfach verwaltet. — Tenant Message Classifier",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash", // Fast + cheap for classification
          messages: [
            {
              role: "system",
              content: `Du bist ein Assistent für eine deutsche Hausverwaltung. Klassifiziere Mieteranfragen.
Antworte NUR mit JSON: {"category": "maintenance|payment|complaint|general", "urgency": 1-5, "summary": "max 100 Zeichen"}
Urgency-Skala: 1=unwichtig, 3=normal, 5=Notfall (Wasser/Feuer/Heizung im Winter)`
            },
            { role: "user", content: message }
          ],
          response_format: { type: "json_object" },
        }),
      });
      const data = await res.json();
      const content = data.choices?.[0]?.message?.content;
      return content ? JSON.parse(content) : { category: "general", urgency: 2, summary: message.substring(0, 100) };
    });

    // Step 2: Persist conversation to DB
    const conversationResult = await step.run("persist-conversation", async () => {
      try {
        const [newConversation] = await db
          .insert(conversations)
          .values({
            ...(tenantId ? { tenantId } : {}),
            landlordId: landlordId,
            channel: "portal",
            direction: "inbound",
            body: message,
            aiClassification: classification.category,
            aiUrgency: classification.urgency,
          })
          .returning();
        
        return { conversationId: newConversation.id, error: null };
      } catch (error) {
        console.error("Database error persisting conversation:", error);
        return { conversationId: null, error: error instanceof Error ? error.message : "Unknown DB error" };
      }
    });

    // Step 3: Create ticket if maintenance or urgent
    const ticketResult = await step.run("create-ticket", async () => {
      if (["maintenance", "complaint"].includes(classification.category) || classification.urgency >= 4) {
        try {
          const slaDeadline = new Date();
          slaDeadline.setHours(slaDeadline.getHours() + 48);

          const [newTicket] = await db
            .insert(tickets)
            .values({
              propertyId: propertyId,
              ...(tenantId ? { tenantId } : {}),
              ...(landlordId ? { landlordId } : {}),
              title: classification.summary || "Neue Mieteranfrage",
              description: message,
              category: classification.category,
              priority: classification.urgency >= 4 ? "urgent" : "normal",
              status: "open",
              aiTriage: {
                category: classification.category,
                urgency: classification.urgency,
                summary: classification.summary,
              },
              slaDeadline: slaDeadline,
            })
            .returning();
          
          return { ticketId: newTicket.id, error: null };
        } catch (error) {
          console.error("Database error creating ticket:", error);
          return { ticketId: null, error: error instanceof Error ? error.message : "Unknown DB error" };
        }
      }
      return null;
    });

    // Step 4: Notify landlord if urgent
    await step.run("notify-landlord", async () => {
      if (classification.urgency >= 4 && landlordEmail && process.env.RESEND_API_KEY) {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: "system@einfach-verwaltet.de",
          to: landlordEmail,
          subject: `🔴 Dringende Mieteranfrage — ${classification.category}`,
          html: `<p><strong>Dringend (${classification.urgency}/5):</strong> ${classification.summary}</p>${ticketResult?.ticketId ? `<p>Ticket erstellt: ${ticketResult.ticketId}</p>` : ""}`,
        });
      }
    });

    // Step 5: Wait up to 15 min for human response, then escalate
    await step.sleep("sla-wait", "15m");

    return { 
      classification, 
      ticketId: ticketResult?.ticketId,
      conversationId: conversationResult.conversationId
    };

  }
);

/**
 * Voice Call Handler — processes tenant calls via Kai (Retell AI)
 *
 * Handles tenant/voice-call-received events triggered by /api/voice/webhook
 * Same classification logic as text messages, but source: 'voice'
 * Emergency calls escalate immediately via email alert to Lukas.
 */
export const voiceCallHandler = inngest.createFunction(
  { id: "voice-call-handler", name: "Voice Call Handler (Kai/Retell)" },
  { event: "tenant/voice-call-received" },
  async ({ event, step }) => {
    const {
      callId,
      phoneNumber,
      tenantId,
      propertyId,
      landlordId,
      intent,
      urgency,
      ticketId,
      transcript,
      summary,
      durationSeconds,
      escalated,
    } = event.data;

    // Step 1: AI re-classification of transcript for high-urgency calls
    const classification = await step.run("classify-voice-transcript", async () => {
      // For low urgency, trust webhook's initial classification
      if (urgency < 4 || !process.env.OPENROUTER_API_KEY) {
        return { category: mapIntentToCategory(intent), urgency, summary: summary || "" };
      }

      const transcriptText = Array.isArray(transcript)
        ? transcript.map((t: { role: string; content: string }) => t.content).join(" ")
        : String(transcript);

      try {
        const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://einfach-verwaltet.de",
            "X-Title": "einfach verwaltet. — Voice Call Classifier",
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash",
            messages: [
              {
                role: "system",
                content: `Du bist ein Assistent für eine deutsche Hausverwaltung. Analysiere das Transkript eines Sprachanrufs.
Antworte NUR mit JSON: {"category": "maintenance|payment|complaint|general", "urgency": 1-5, "summary": "max 100 Zeichen", "isEmergency": boolean}
Urgency-Skala: 1=unwichtig, 3=normal, 5=Notfall (Wasser/Feuer/Gas/Heizung Winter)`,
              },
              { role: "user", content: transcriptText.substring(0, 2000) },
            ],
            response_format: { type: "json_object" },
          }),
        });
        const data = await res.json();
        const content = data.choices?.[0]?.message?.content;
        return content ? JSON.parse(content) : { category: mapIntentToCategory(intent), urgency, summary };
      } catch {
        return { category: mapIntentToCategory(intent), urgency, summary };
      }
    });

    // Step 2: Log voice call as a conversation entry
    const conversationResult = await step.run("log-voice-conversation", async () => {
      try {
        const transcriptText = Array.isArray(transcript)
          ? transcript
              .map((t: { role: string; content: string }) =>
                `${t.role === "agent" ? "Kai" : "Mieter"}: ${t.content}`)
              .join("\n")
          : String(transcript);

        if (!landlordId) return { conversationId: null, error: "no_landlord" };
        const [newConversation] = await db
          .insert(conversations)
          .values({
            ...(tenantId ? { tenantId } : {}),
            landlordId,
            channel: "voice",
            direction: "inbound",
            body: `📞 Sprachanruf (${Math.round((durationSeconds || 0) / 60)} Min)\n\n${summary || transcriptText.substring(0, 500)}`,
            aiClassification: classification.category,
            aiUrgency: classification.urgency,
          })
          .returning();

        return { conversationId: newConversation.id, error: null };
      } catch (error) {
        console.error("Error logging voice conversation:", error);
        return { conversationId: null, error: error instanceof Error ? error.message : "Unknown DB error" };
      }
    });

    // Step 3: Emergency alert — immediate email for urgency >= 4
    if (escalated && classification.urgency >= 4) {
      await step.run("emergency-escalation-email", async () => {
        if (!process.env.RESEND_API_KEY) return;
        try {
          const { Resend } = await import("resend");
          const resend = new Resend(process.env.RESEND_API_KEY);
          // Lukas's emergency contact — configured as env var
          const emergencyEmail = process.env.EMERGENCY_EMAIL || "lukas@einfach-verwaltet.de";
          await resend.emails.send({
            from: "system@einfach-verwaltet.de",
            to: emergencyEmail,
            subject: `🚨 SOFORT: Mieter-Notfall per Sprachanruf — Ticket ${ticketId || "?"}`,
            html: `
              <div style="font-family:sans-serif;border:3px solid #dc2626;padding:20px;border-radius:8px">
                <h1 style="color:#dc2626;margin-top:0">🚨 Notfall-Sprachanruf eingegangen</h1>
                <p><strong>Anrufer:</strong> ${phoneNumber}</p>
                <p><strong>Anliegen:</strong> ${summary || "Notfall — Details im Portal"}</p>
                <p><strong>Ticket-Nr.:</strong> ${ticketId || "nicht zugeordnet"}</p>
                <p><strong>Priorität:</strong> ${classification.urgency}/5</p>
                <p style="background:#fee2e2;padding:12px;border-radius:4px">
                  Bitte sofort prüfen und ggf. Notdienst veranlassen.
                </p>
              </div>`,
          });
        } catch (err) {
          console.error("Failed to send emergency email:", err);
        }
      });
    }

    // Step 4: Create ticket if webhook didn't already create one
    const finalTicketId = await step.run("ensure-ticket-exists", async () => {
      if (ticketId) return ticketId; // Already created in webhook
      // Fallback: create ticket here if webhook failed
      try {
        const slaDeadline = new Date();
        slaDeadline.setHours(slaDeadline.getHours() + (classification.urgency >= 4 ? 4 : 48));
        if (!propertyId) return null; // Cannot create ticket without property
        const [newTicket] = await db
          .insert(tickets)
          .values({
            propertyId,
            ...(tenantId ? { tenantId } : {}),
            ...(landlordId ? { landlordId } : {}),
            title: `Sprachanruf — ${classification.summary || intent}`,
            description: Array.isArray(transcript)
              ? transcript.map((t: { role: string; content: string }) => `${t.role === "agent" ? "Kai" : "Mieter"}: ${t.content}`).join("\n").substring(0, 4000)
              : String(transcript).substring(0, 4000),
            category: classification.category,
            priority: classification.urgency >= 4 ? "urgent" : classification.urgency >= 3 ? "high" : "normal",
            status: "open",
            aiTriage: { intent, urgency: classification.urgency, summary: classification.summary, callId, source: "voice" },
            slaDeadline,
          })
          .returning();
        return newTicket.id;
      } catch (err) {
        console.error("Fallback ticket creation failed:", err);
        return null;
      }
    });

    // Step 5: Send confirmation email to tenant if we have their email
    await step.run("send-tenant-confirmation", async () => {
      if (!tenantId || !finalTicketId || !process.env.RESEND_API_KEY) return;
      try {
        const tenant = await db.query.tenants?.findFirst({
          where: eq(tenants.id, tenantId),
        });
        if (!tenant?.email) return;

        const intentMsg: Record<string, string> = {
          emergency: "Ihr Notfall wurde als dringend markiert und sofort weitergeleitet.",
          repair: "Ihre Reparaturanfrage wurde aufgenommen. Ein Handwerker meldet sich innerhalb von 24 Stunden.",
          heating: "Ihr Heizungsproblem wurde dringend markiert. Wir kümmern uns schnellstmöglich.",
          key: "Ihr Schlüsselnotfall wurde weitergeleitet. Ein Schlüsseldienst kontaktiert Sie.",
          noise: "Ihre Lärmbeschwerde wurde dokumentiert.",
          mold: "Ihre Schimmelmeldung wurde als dringend eingestuft. Wir melden uns für einen Termin.",
          payment: "Ihre Zahlungsfrage wurde aufgenommen und wird geprüft.",
          general: "Ihr Anliegen wurde aufgenommen und wird bearbeitet.",
        };

        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: "system@einfach-verwaltet.de",
          to: tenant.email,
          subject: "Ihr Anruf wurde bearbeitet — einfach verwaltet.",
          html: `
            <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
              <h2 style="color:#0369a1">Guten Tag,</h2>
              <p>vielen Dank für Ihren Anruf. ${intentMsg[intent] || intentMsg.general}</p>
              <p><strong>Ihre Ticket-Nummer:</strong> ${finalTicketId}</p>
              <p>Bei Rückfragen antworten Sie einfach auf diese E-Mail oder rufen Sie uns erneut an.</p>
              <p style="margin-top:30px;color:#6b7280">
                Mit freundlichen Grüßen<br>
                Kai &amp; das Team von einfach verwaltet.
              </p>
            </div>`,
        });
      } catch (err) {
        console.error("Failed to send tenant confirmation:", err);
      }
    });

    return {
      callId,
      intent,
      urgency: classification.urgency,
      ticketId: finalTicketId,
      escalated,
      conversationId: conversationResult.conversationId,
    };
  }
);

// Map voice intent → ticket category
function mapIntentToCategory(intent: string): string {
  const map: Record<string, string> = {
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
  return map[intent] ?? "general";
}
