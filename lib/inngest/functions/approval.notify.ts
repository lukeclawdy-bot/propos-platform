import { inngest } from "../client";

// Type label mapping (DE)
const TYPE_LABELS: Record<string, string> = {
  repair_cost: "Reparaturkosten",
  rent_increase: "Mieterhöhung",
  contractor_hire: "Handwerker beauftragen",
  legal_action: "Rechtliche Maßnahme",
  // fallbacks for existing types in schema
  tenant_change: "Mieterwechsel",
  eviction: "Kündigung",
  investment: "Investition",
};

function getTypeLabel(type: string): string {
  return TYPE_LABELS[type] ?? type;
}

// base64(approvalId + ":" + landlordId) — for URL construction only
function buildShortToken(approvalId: string, landlordId: string): string {
  return Buffer.from(`${approvalId}:${landlordId}`).toString("base64url");
}

function formatEuro(cents: number): string {
  return (cents / 100).toLocaleString("de-DE", {
    style: "currency",
    currency: "EUR",
  });
}

// ─── Email HTML ───────────────────────────────────────────────────────────────
function buildApprovalEmail({
  typeLabel,
  address,
  description,
  amountCents,
  approveUrl,
  rejectUrl,
}: {
  typeLabel: string;
  address: string;
  description?: string | null;
  amountCents?: number | null;
  approveUrl: string;
  rejectUrl: string;
}): string {
  const amountRow =
    amountCents != null
      ? `<tr>
          <td style="padding:6px 0;color:#64748b;font-size:14px;">Betrag</td>
          <td style="padding:6px 0;font-weight:700;color:#0f172a;font-size:14px;">${formatEuro(amountCents)}</td>
        </tr>`
      : "";

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Genehmigung erforderlich] ${typeLabel} — ${address}</title>
</head>
<body style="background:#f1f5f9;margin:0;padding:16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#0f172a 0%,#1e293b 100%);padding:32px 24px;text-align:center;border-radius:12px 12px 0 0;">
      <p style="color:#14b8a6;font-size:12px;letter-spacing:2px;text-transform:uppercase;margin:0 0 8px;">einfach verwaltet.</p>
      <h1 style="color:#ffffff;margin:0;font-size:22px;font-weight:700;">Ihre Entscheidung ist gefragt</h1>
    </div>

    <!-- Content -->
    <div style="background:#ffffff;padding:32px 24px;">

      <p style="color:#475569;line-height:1.6;margin-top:0;">
        Ein Antrag wurde für Ihre Immobilie gestellt und wartet auf Ihre Genehmigung oder Ablehnung.
      </p>

      <!-- Summary Box -->
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-left:4px solid #14b8a6;border-radius:8px;padding:20px;margin:20px 0;">
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:6px 0;color:#64748b;font-size:14px;width:140px;">Art der Anfrage</td>
            <td style="padding:6px 0;font-weight:700;color:#0f172a;font-size:14px;">${typeLabel}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#64748b;font-size:14px;">Objekt</td>
            <td style="padding:6px 0;font-weight:600;color:#0f172a;font-size:14px;">${address}</td>
          </tr>
          ${amountRow}
          ${
            description
              ? `<tr>
              <td style="padding:6px 0;color:#64748b;font-size:14px;vertical-align:top;">Details</td>
              <td style="padding:6px 0;color:#334155;font-size:14px;">${description.replace(/\n/g, "<br>")}</td>
            </tr>`
              : ""
          }
        </table>
      </div>

      <!-- CTA Buttons -->
      <table style="width:100%;margin:28px 0 16px;" cellspacing="0" cellpadding="0">
        <tr>
          <td style="padding-right:8px;" align="center">
            <a href="${approveUrl}"
               style="display:block;background:#16a34a;color:#ffffff;text-decoration:none;padding:14px 20px;border-radius:8px;font-weight:700;font-size:16px;text-align:center;">
              ✓ Genehmigen
            </a>
          </td>
          <td style="padding-left:8px;" align="center">
            <a href="${rejectUrl}"
               style="display:block;background:#dc2626;color:#ffffff;text-decoration:none;padding:14px 20px;border-radius:8px;font-weight:700;font-size:16px;text-align:center;">
              ✗ Ablehnen
            </a>
          </td>
        </tr>
      </table>

      <!-- Fine print -->
      <p style="color:#94a3b8;font-size:12px;text-align:center;margin-top:24px;">
        Sie können auch direkt im Portal entscheiden unter
        <a href="https://einfach-verwaltet.de/portal/dashboard" style="color:#14b8a6;">einfach-verwaltet.de/portal/dashboard</a>
      </p>
    </div>

    <!-- Footer -->
    <div style="background:#f8fafc;padding:20px 24px;text-align:center;border-top:1px solid #e2e8f0;border-radius:0 0 12px 12px;">
      <p style="color:#94a3b8;font-size:12px;margin:0;">
        © ${new Date().getFullYear()} einfach verwaltet. — Hausverwaltung, die funktioniert.
      </p>
    </div>

  </div>
</body>
</html>`;
}

// ─── Inngest Function ─────────────────────────────────────────────────────────
export const approvalNotify = inngest.createFunction(
  { id: "approval-notify", name: "Approval Email Notification" },
  { event: "approval/created" },
  async ({ event, step }) => {
    const {
      approvalId,
      landlordId,
    } = event.data as {
      approvalId: string;
      landlordId: string;
    };

    // 1. Load approval from DB
    const approval = await step.run("load-approval", async () => {
      try {
        const { db } = await import("@/lib/db");
        const { approvals } = await import("@/lib/db/schema");
        const { eq } = await import("drizzle-orm");

        const [row] = await db
          .select({
            id: approvals.id,
            type: approvals.type,
            title: approvals.title,
            description: approvals.description,
            amountCents: approvals.amountCents,
            landlordId: approvals.landlordId,
            ticketId: approvals.ticketId,
            jobId: approvals.jobId,
            metadata: approvals.metadata,
          })
          .from(approvals)
          .where(eq(approvals.id, approvalId))
          .limit(1);

        return row ?? null;
      } catch (err) {
        console.error("[approval-notify] load-approval error:", err);
        return null;
      }
    });

    if (!approval) {
      console.warn(`[approval-notify] Approval ${approvalId} not found`);
      return { sent: false, reason: "approval_not_found" };
    }

    // 2. Load landlord email
    const landlordEmail = await step.run("load-landlord", async () => {
      try {
        const { db } = await import("@/lib/db");
        const { landlords } = await import("@/lib/db/schema");
        const { eq } = await import("drizzle-orm");

        const [row] = await db
          .select({ email: landlords.email, name: landlords.name })
          .from(landlords)
          .where(eq(landlords.id, landlordId))
          .limit(1);

        return row ?? null;
      } catch (err) {
        console.error("[approval-notify] load-landlord error:", err);
        return null;
      }
    });

    if (!landlordEmail?.email) {
      console.warn(`[approval-notify] No email for landlord ${landlordId}`);
      return { sent: false, reason: "no_landlord_email" };
    }

    // 3. Load property address (via ticketId or jobId if present)
    const propertyAddress = await step.run("load-property", async () => {
      try {
        const { db } = await import("@/lib/db");

        // Try to get address from jobs table via jobId
        if (approval.jobId) {
          const { jobs } = await import("@/lib/db/schema");
          const { eq } = await import("drizzle-orm");
          const [job] = await db
            .select({ propertyAddress: jobs.propertyAddress })
            .from(jobs)
            .where(eq(jobs.id, approval.jobId))
            .limit(1);
          if (job?.propertyAddress) return job.propertyAddress;
        }

        // Try to get address from tickets → properties via ticketId
        if (approval.ticketId) {
          const { tickets, properties } = await import("@/lib/db/schema");
          const { eq } = await import("drizzle-orm");
          const [row] = await db
            .select({ address: properties.address, city: properties.city })
            .from(tickets)
            .innerJoin(properties, eq(tickets.propertyId, properties.id))
            .where(eq(tickets.id, approval.ticketId))
            .limit(1);
          if (row?.address) return `${row.address}, ${row.city}`;
        }

        // Fallback: get first property for this landlord
        const { properties } = await import("@/lib/db/schema");
        const { eq } = await import("drizzle-orm");
        const [prop] = await db
          .select({ address: properties.address, city: properties.city })
          .from(properties)
          .where(eq(properties.landlordId, landlordId))
          .limit(1);
        if (prop?.address) return `${prop.address}, ${prop.city}`;

        return "Ihre Immobilie";
      } catch (err) {
        console.error("[approval-notify] load-property error:", err);
        return "Ihre Immobilie";
      }
    });

    // 4. Build and send email
    const emailResult = await step.run("send-email", async () => {
      if (!process.env.RESEND_API_KEY) {
        console.warn("[approval-notify] RESEND_API_KEY not configured, skipping");
        return { skipped: true };
      }

      const typeLabel = getTypeLabel(approval.type);
      const shortToken = buildShortToken(approvalId, landlordId);
      const baseUrl = "https://einfach-verwaltet.de";
      const approveUrl = `${baseUrl}/portal/dashboard?approve=${approvalId}&token=${shortToken}`;
      const rejectUrl = `${baseUrl}/portal/dashboard?reject=${approvalId}&token=${shortToken}`;

      const html = buildApprovalEmail({
        typeLabel,
        address: propertyAddress,
        description: approval.description,
        amountCents: approval.amountCents,
        approveUrl,
        rejectUrl,
      });

      const subject = `[Genehmigung erforderlich] ${typeLabel} — ${propertyAddress}`;

      try {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: "einfach verwaltet. <system@einfach-verwaltet.de>",
          to: landlordEmail.email,
          subject,
          html,
        });
        console.log(`[approval-notify] Email sent to ${landlordEmail.email}: ${subject}`);
        return { sent: true, to: landlordEmail.email };
      } catch (err) {
        console.error("[approval-notify] send-email error:", err);
        return { sent: false, error: String(err) };
      }
    });

    // 5. Log to audit_trail
    await step.run("audit-log", async () => {
      try {
        const { db } = await import("@/lib/db");
        const { auditTrail } = await import("@/lib/db/schema");

        await db.insert(auditTrail).values({
          entityType: "approval",
          entityId: approvalId,
          action: "approval_notification_sent",
          actorType: "agent",
          actorId: "inngest:approval-notify",
          description: `Benachrichtigungs-Email an ${landlordEmail.email} gesendet für ${getTypeLabel(approval.type)}`,
          metadata: {
            to: landlordEmail.email,
            approvalType: approval.type,
            propertyAddress,
          },
        });
      } catch (err) {
        console.warn("[approval-notify] audit-log error (non-fatal):", err);
      }
    });

    return {
      sent: emailResult,
      approvalId,
      landlordId,
      to: landlordEmail.email,
    };
  }
);
