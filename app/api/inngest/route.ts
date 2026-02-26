import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest/client";
import { leadIntake } from "@/lib/inngest/functions/lead.intake";
import { dripCampaign } from "@/lib/inngest/functions/drip.campaign";
import { tenantMessage, voiceCallHandler } from "@/lib/inngest/functions/tenant.message";
import { rentMonitoring } from "@/lib/inngest/functions/rent.monitoring";
import { complianceChecks } from "@/lib/inngest/functions/compliance.checks";
import { billingInvoicePaid, billingDunningSequence } from "@/lib/inngest/functions/billing";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    leadIntake,
    dripCampaign,
    tenantMessage,
    voiceCallHandler,      // Kai voice call handler (Retell AI)
    rentMonitoring,
    complianceChecks,
    billingInvoicePaid,
    billingDunningSequence,
  ],
});
