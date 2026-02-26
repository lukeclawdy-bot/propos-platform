import { inngest } from "../client";

export const rentMonitoring = inngest.createFunction(
  { id: "rent-monitoring", name: "Rent Monitoring & Mahnwesen" },
  { cron: "0 8 * * *" }, // Daily at 08:00
  async ({ step }) => {
    const today = new Date();

    // Step 1: Check all units for overdue rent
    const overdueUnits = await step.run("check-overdue", async () => {
      // In production: query Neon DB for units where rent not received this month
      return []; // placeholder
    });

    // Step 2: Send Zahlungserinnerung (day 4)
    await step.run("send-erinnerung", async () => {
      // Filter units overdue by 4 days, send reminder email
      return { sent: 0 };
    });

    // Step 3: Send formal Mahnung (day 10)
    await step.run("send-mahnung", async () => {
      // Filter units overdue by 10 days, send formal Mahnung
      return { sent: 0 };
    });

    // Step 4: Escalate to landlord (day 20)
    await step.run("escalate", async () => {
      // Flag for Rechtsanwalt intervention, notify landlord
      return { escalated: 0 };
    });

    return { checkedAt: today.toISOString(), overdue: overdueUnits.length };
  }
);
