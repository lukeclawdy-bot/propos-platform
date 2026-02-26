import { inngest } from "../client";

export const leadIntake = inngest.createFunction(
  { id: "lead-intake", name: "Lead Intake & Qualification" },
  { event: "lead/submitted" },
  async ({ event, step }) => {
    const lead = event.data;

    // Step 1: Score lead quality
    const score = await step.run("score-lead", async () => {
      const units = Number(lead.einheiten) || 0;
      const locationScore = ["Hamburg", "Berlin"].some((c) =>
        lead.standort?.includes(c)
      )
        ? 30
        : 10;
      const unitScore = units >= 20 ? 40 : units >= 5 ? 25 : 10;
      return { score: locationScore + unitScore, units, location: lead.standort };
    });

    // Step 2: Send welcome email via Resend
    await step.run("send-welcome-email", async () => {
      if (!process.env.RESEND_API_KEY) return { skipped: true };
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "anfrage@einfach-verwaltet.de",
        to: lead.email,
        subject: "Willkommen bei einfach verwaltet.",
        html: `<p>Hallo ${lead.name},</p><p>vielen Dank für Ihre Anfrage. Wir melden uns innerhalb von 24 Stunden bei Ihnen.</p><p>Ihr Team von einfach verwaltet.</p>`,
      });
    });

    // Step 3: Notify admin of high-quality lead
    await step.run("notify-admin", async () => {
      if (score.score >= 50 && process.env.RESEND_API_KEY) {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: "system@einfach-verwaltet.de",
          to: "kontakt@einfach-verwaltet.de",
          subject: `🔥 High-quality lead: ${lead.name} — ${score.units} Einheiten (${lead.standort})`,
          html: `<p><strong>Score: ${score.score}/70</strong></p><pre>${JSON.stringify(lead, null, 2)}</pre>`,
        });
      }
    });

    return { leadId: lead.id, score: score.score };
  }
);
