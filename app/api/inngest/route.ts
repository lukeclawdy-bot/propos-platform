import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest/client";
import { leadIntake } from "@/lib/inngest/functions/lead.intake";
import { tenantMessage } from "@/lib/inngest/functions/tenant.message";
import { rentMonitoring } from "@/lib/inngest/functions/rent.monitoring";
import { complianceChecks } from "@/lib/inngest/functions/compliance.checks";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    leadIntake,
    tenantMessage,
    rentMonitoring,
    complianceChecks,
  ],
});
