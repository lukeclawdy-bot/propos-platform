import { inngest } from "../client";
import { db } from "@/lib/db";
import { conversations, tickets } from "@/lib/db/schema";
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
