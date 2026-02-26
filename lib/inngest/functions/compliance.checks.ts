import { inngest } from "../client";

export const complianceChecks = inngest.createFunction(
  { id: "compliance-checks", name: "Weekly Compliance Monitor" },
  { cron: "0 9 * * 1" }, // Every Monday at 09:00
  async ({ step }) => {
    // Step 1: Check Energieausweis expiry (10yr validity)
    const energieausweis = await step.run("check-energieausweis", async () => {
      // Query DB for properties with Energieausweis expiring within 6 months
      return { expiringSoon: [] };
    });

    // Step 2: Check Mieterhöhung eligibility (§558 BGB — 15 months since last increase)
    const mieterhoehung = await step.run("check-mieterhoehung", async () => {
      // Query DB for units where last rent increase was >15 months ago
      return { eligible: [] };
    });

    // Step 3: Check WEG Eigentümerversammlung dates (§24 WEG — annual)
    const etv = await step.run("check-etv", async () => {
      // Query DB for WEG properties without ETV in last 12 months
      return { overdue: [] };
    });

    // Step 4: DSGVO data retention check
    const dsgvo = await step.run("check-dsgvo-retention", async () => {
      // Flag personal data older than legal retention period
      return { flagged: 0 };
    });

    return {
      energieausweisExpiring: energieausweis.expiringSoon.length,
      mieterhoehungEligible: mieterhoehung.eligible.length,
      etvOverdue: etv.overdue.length,
      dsgvoFlagged: dsgvo.flagged,
    };
  }
);
