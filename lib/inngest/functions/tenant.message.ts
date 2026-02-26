import { inngest } from "../client";

export const tenantMessage = inngest.createFunction(
  { id: "tenant-message", name: "Tenant Message Handler" },
  { event: "tenant/message.received" },
  async ({ event, step }) => {
    const { message, tenantId, propertyId, landlordEmail } = event.data;

    // Step 1: Classify message via OpenAI
    const classification = await step.run("classify-message", async () => {
      if (!process.env.OPENAI_API_KEY) {
        return { category: "general", urgency: 2, summary: message.substring(0, 100) };
      }
      // OpenAI classification would go here
      return { category: "maintenance", urgency: 3, summary: message.substring(0, 100) };
    });

    // Step 2: Create ticket if maintenance or urgent
    const ticket = await step.run("create-ticket", async () => {
      if (["maintenance", "complaint"].includes(classification.category) || classification.urgency >= 4) {
        return {
          id: `ticket-${Date.now()}`,
          tenantId,
          propertyId,
          category: classification.category,
          urgency: classification.urgency,
          status: "open",
          createdAt: new Date().toISOString(),
        };
      }
      return null;
    });

    // Step 3: Notify landlord if urgent
    await step.run("notify-landlord", async () => {
      if (classification.urgency >= 4 && landlordEmail && process.env.RESEND_API_KEY) {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: "system@einfach-verwaltet.de",
          to: landlordEmail,
          subject: `🔴 Dringende Mieteranfrage — ${classification.category}`,
          html: `<p><strong>Dringend (${classification.urgency}/5):</strong> ${classification.summary}</p>${ticket ? `<p>Ticket erstellt: ${ticket.id}</p>` : ""}`,
        });
      }
    });

    // Step 4: Wait up to 15 min for human response, then escalate
    await step.sleep("sla-wait", "15m");

    return { classification, ticketId: ticket?.id };
  }
);
