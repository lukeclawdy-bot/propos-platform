/**
 * Inngest Function: WhatsApp Message Handler
 *
 * Event: tenant/whatsapp.received
 *
 * Flow:
 * 1. Look up tenant by phone number in DB
 * 2. Classify intent (repair, payment, noise, general) via OpenRouter AI
 * 3. Create or update ticket in DB
 * 4. Send AI-generated reply via WhatsApp template
 * 5. Log conversation to conversations table
 */

import { inngest } from "@/lib/inngest/client";
import { db } from "@/lib/db";
import { tenants, tickets, conversations, units, properties } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getWhatsAppClient, WHATSAPP_TEMPLATES } from "@/lib/whatsapp/client";

interface WhatsAppReceivedData {
  from: string;           // Sender's phone number (e.g., "4915123456789")
  senderName: string;     // Display name from WhatsApp profile
  messageId: string;      // WhatsApp message ID
  messageText: string;    // Message text content
  messageType: string;    // "text" | "image" | "audio" | "document"
  timestamp: string;      // Unix timestamp string
  phoneNumberId: string;  // Our WhatsApp phone number ID
}

interface IntentClassification {
  intent: "repair" | "payment" | "noise" | "document" | "general";
  urgency: "high" | "medium" | "low";
  summary: string;
  suggestedResponse: string;
}

const INTENT_PROMPTS: Record<IntentClassification["intent"], string> = {
  repair: "Reparatur/Instandhaltung",
  payment: "Miete/Zahlung/Abrechnung",
  noise: "Lärm/Nachbarschaft",
  document: "Dokument/Unterlagen/Bescheinigung",
  general: "Allgemeine Anfrage",
};

async function classifyIntent(messageText: string): Promise<IntentClassification> {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    // Fallback classification without AI
    const lower = messageText.toLowerCase();
    if (lower.match(/heizung|wasser|strom|defekt|kaputt|reparatur|rohr/)) {
      return { intent: "repair", urgency: "high", summary: messageText.substring(0, 100), suggestedResponse: "Wir kümmern uns darum." };
    }
    if (lower.match(/miete|zahlung|rechnung|abrechnung|nebenkosten/)) {
      return { intent: "payment", urgency: "medium", summary: messageText.substring(0, 100), suggestedResponse: "Wir prüfen Ihre Anfrage." };
    }
    if (lower.match(/lärm|laut|musik|nachbar|beschwerde/)) {
      return { intent: "noise", urgency: "medium", summary: messageText.substring(0, 100), suggestedResponse: "Wir nehmen Ihre Beschwerde auf." };
    }
    return { intent: "general", urgency: "low", summary: messageText.substring(0, 100), suggestedResponse: "Vielen Dank für Ihre Nachricht." };
  }

  const prompt = `Du bist ein Assistent für eine deutsche Hausverwaltung. Klassifiziere die folgende WhatsApp-Nachricht von einem Mieter.

Nachricht: "${messageText}"

Antworte NUR mit diesem JSON (keine Erklärung):
{
  "intent": "repair" | "payment" | "noise" | "document" | "general",
  "urgency": "high" | "medium" | "low",
  "summary": "Kurze Zusammenfassung auf Deutsch (max 100 Zeichen)",
  "suggestedResponse": "Kurze freundliche Bestätigungsnachricht auf Deutsch (max 160 Zeichen)"
}

Regeln:
- repair = Reparaturwunsch, defekte Geräte, Wasserschaden, Heizungsausfall
- payment = Fragen zu Miete, Nebenkosten, Abrechnung
- noise = Lärmbeschwerde, Nachbarschaftskonflikt
- document = Anfrage nach Bescheinigungen, Nebenkostenabrechnung, Quittungen
- general = alles andere
- high urgency = sofortiger Handlungsbedarf (kein Wasser, Heizungsausfall, Notfall)`;

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://einfach-verwaltet.de",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 300,
        temperature: 0.1,
      }),
    });

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content || "";

    // Extract JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]) as IntentClassification;
    }
  } catch (err) {
    console.error("[whatsapp-handler] AI classification failed:", err);
  }

  // Fallback
  return {
    intent: "general",
    urgency: "low",
    summary: messageText.substring(0, 100),
    suggestedResponse: "Vielen Dank für Ihre Nachricht. Wir melden uns in Kürze.",
  };
}

export const whatsappHandler = inngest.createFunction(
  {
    id: "whatsapp-message-handler",
    name: "WhatsApp: Tenant Message Handler",
    throttle: {
      limit: 100,
      period: "1m",
    },
  },
  { event: "tenant/whatsapp.received" },
  async ({ event, step }) => {
    const data = event.data as WhatsAppReceivedData;
    const { from, senderName, messageText, messageId } = data;

    // Step 1: Find tenant by phone number (with joined unit + property)
    const tenant = await step.run("find-tenant", async () => {
      // Normalize phone for lookup: strip country code prefix for matching
      const phoneVariants = [
        from,
        `+${from}`,
        from.replace(/^49/, "0"),  // Convert 4915... to 015...
      ];

      for (const phone of phoneVariants) {
        const found = await db
          .select({
            id: tenants.id,
            unitId: tenants.unitId,
            firstName: tenants.firstName,
            lastName: tenants.lastName,
            phone: tenants.phone,
            propertyId: units.propertyId,
            landlordId: properties.landlordId,
          })
          .from(tenants)
          .leftJoin(units, eq(tenants.unitId, units.id))
          .leftJoin(properties, eq(units.propertyId, properties.id))
          .where(eq(tenants.phone, phone))
          .limit(1);

        if (found.length > 0) return found[0];
      }

      return null;
    });

    // Step 2: Classify intent
    const classification = await step.run("classify-intent", async () => {
      return classifyIntent(messageText);
    });

    // Step 3: Create ticket in DB
    const ticket = await step.run("create-ticket", async () => {
      const title = `WhatsApp: ${INTENT_PROMPTS[classification.intent]} — ${senderName}`;
      const priority = classification.urgency === "high" ? 5 : classification.urgency === "medium" ? 3 : 1;

      const categoryMap: Record<IntentClassification["intent"], string> = {
        repair: "maintenance",
        payment: "billing",
        noise: "complaint",
        document: "general",
        general: "general",
      };

      // tickets table requires propertyId — use a placeholder if tenant not found
      const propertyId = tenant?.propertyId || "00000000-0000-0000-0000-000000000000";

      const [newTicket] = await db
        .insert(tickets)
        .values({
          landlordId: tenant?.landlordId || null,
          tenantId: tenant?.id || null,
          propertyId,
          unitId: tenant?.unitId || null,
          title,
          description: `[WhatsApp von ${senderName} (${from})]\n\n${messageText}`,
          category: categoryMap[classification.intent],
          urgency: priority,
          status: "open",
          aiTriage: {
            channel: "whatsapp",
            whatsappFrom: from,
            whatsappMessageId: messageId,
            senderName,
            aiIntent: classification.intent,
            aiSummary: classification.summary,
          },
        })
        .returning();

      return newTicket;
    });

    // Step 4: Log conversation
    await step.run("log-conversation", async () => {
      if (ticket?.id && tenant?.landlordId) {
        await db.insert(conversations).values({
          ticketId: ticket.id,
          tenantId: tenant?.id || null,
          landlordId: tenant.landlordId,
          direction: "inbound",
          body: messageText,
          channel: "whatsapp",
          aiGenerated: false,
          aiClassification: classification.intent,
          aiUrgency: classification.urgency === "high" ? 5 : classification.urgency === "medium" ? 3 : 1,
        });
      }
    });

    // Step 5: Send acknowledgment via WhatsApp
    await step.run("send-whatsapp-reply", async () => {
      const client = getWhatsAppClient();

      try {
        // Use template if tenant was identified (within 24h window or template needed)
        // For now, try plain text first (within conversation window)
        const ackText = classification.suggestedResponse ||
          `Vielen Dank, ${senderName}! Ihre Anfrage (${classification.intent}) wurde aufgenommen. Wir melden uns in Kürze.`;

        await client.sendMessage(from, ackText);

        console.log(`[whatsapp-handler] Reply sent to ${from}`);
      } catch (err) {
        // If plain message fails (24h window expired), fall back to template
        console.warn("[whatsapp-handler] Plain message failed, trying template:", err);
        try {
          const client2 = getWhatsAppClient();
          await client2.sendTemplate(
            from,
            WHATSAPP_TEMPLATES.TICKET_ACKNOWLEDGED,
            [ticket?.id?.substring(0, 8).toUpperCase() || "EV"]
          );
        } catch (templateErr) {
          console.error("[whatsapp-handler] Template also failed:", templateErr);
        }
      }
    });

    return {
      success: true,
      ticketId: ticket?.id,
      tenantFound: !!tenant,
      intent: classification.intent,
      urgency: classification.urgency,
    };
  }
);
