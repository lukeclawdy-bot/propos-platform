import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest/client";
import { leadIntake } from "@/lib/inngest/functions/lead.intake";
import { dripCampaign } from "@/lib/inngest/functions/drip.campaign";
import { tenantMessage, voiceCallHandler } from "@/lib/inngest/functions/tenant.message";
import { rentMonitoring } from "@/lib/inngest/functions/rent.monitoring";
import { rentDunning } from "@/lib/inngest/functions/dunning";
import { complianceChecks } from "@/lib/inngest/functions/compliance.checks";
import { billingInvoicePaid, billingDunningSequence } from "@/lib/inngest/functions/billing";
import { documentProcessor } from "@/lib/inngest/functions/document.processor";
import { ownerNotifications } from "@/lib/inngest/functions/owner-notifications";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    leadIntake,
    dripCampaign,
    tenantMessage,
    voiceCallHandler,      // Kai voice call handler (Retell AI)
    rentMonitoring,        // Legacy rent monitoring (daily 08:00)
    rentDunning,           // New BGB §286 compliant dunning (daily 08:30)
    complianceChecks,
    billingInvoicePaid,
    billingDunningSequence,
    documentProcessor,     // AI document OCR & intelligence
    ownerNotifications,    // Owner email notifications (tickets, rent, documents)
  ],
});
