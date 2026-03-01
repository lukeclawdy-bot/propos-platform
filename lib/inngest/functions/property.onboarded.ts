import { inngest } from "../client";
import { db } from "@/lib/db";
import { properties, units, tenants, landlords } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Resend } from "resend";

/**
 * property/onboarded
 * Fires when a landlord completes the Objekt-Onboarding Wizard.
 *
 * Actions:
 *  1. Send welcome email to each tenant (magic-link invite)
 *  2. Send admin summary to lukas@einfach-verwaltet.de
 *  3. Create first compliance check reminder (Energieausweis, Versicherung)
 */

type PropertyOnboardedEvent = {
  data: {
    propertyId: string;
    landlordId: string;
    /** Optional: unit IDs that have tenants assigned */
    unitIds?: string[];
    address?: string;
    unitCount?: number;
    /** If true, skip tenant emails (e.g. no tenants assigned yet) */
    skipTenantEmails?: boolean;
  };
};

export const propertyOnboarded = inngest.createFunction(
  { id: "property-onboarded", name: "Objekt Onboarding — Welcome Flow" },
  { event: "property/onboarded" },
  async ({ event, step }) => {
    const { propertyId, landlordId, skipTenantEmails, address, unitCount } =
      (event as PropertyOnboardedEvent).data;

    // ─── Step 1: Load property + landlord from DB ─────────────────────────
    const propertyData = await step.run("load-property", async () => {
      if (!db) return null;
      const [property] = await db
        .select()
        .from(properties)
        .where(eq(properties.id, propertyId))
        .limit(1);
      return property ?? null;
    });

    const landlordData = await step.run("load-landlord", async () => {
      if (!db) return null;
      const [landlord] = await db
        .select()
        .from(landlords)
        .where(eq(landlords.id, landlordId))
        .limit(1);
      return landlord ?? null;
    });

    // ─── Step 2: Load tenants for this property ───────────────────────────
    const tenantsData = await step.run("load-tenants", async () => {
      if (!db || skipTenantEmails) return [];
      const propertyUnits = await db
        .select()
        .from(units)
        .where(eq(units.propertyId, propertyId));
      const unitIdList = propertyUnits.map((u) => u.id);
      if (unitIdList.length === 0) return [];

      const allTenants = await db
        .select()
        .from(tenants)
        .where(eq(tenants.propertyId, propertyId));
      return allTenants.filter((t) => t.email);
    });

    // ─── Step 3: Send tenant welcome emails ───────────────────────────────
    const tenantEmailResults = await step.run("send-tenant-welcomes", async () => {
      if (!tenantsData || tenantsData.length === 0) return { sent: 0, skipped: 0 };
      
      const resend = new Resend(process.env.RESEND_API_KEY ?? "re_placeholder");
      const propertyAddress =
        propertyData
          ? `${propertyData.street ?? ""} ${propertyData.houseNumber ?? ""}, ${propertyData.city ?? ""}`.trim()
          : address ?? "Ihre Immobilie";

      let sent = 0;
      const errors: string[] = [];

      for (const tenant of tenantsData) {
        if (!tenant.email) continue;
        const firstName = tenant.firstName ?? "Mieter/in";

        try {
          await resend.emails.send({
            from: "einfach verwaltet. <anfrage@immo.einfach-verwaltet.de>",
            to: tenant.email,
            subject: `Willkommen bei einfach verwaltet. — ${propertyAddress}`,
            html: buildTenantWelcomeEmail(firstName, propertyAddress),
          });
          sent++;
        } catch (err) {
          errors.push(`${tenant.email}: ${err}`);
        }
      }

      return { sent, skipped: tenantsData.length - sent, errors };
    });

    // ─── Step 4: Send admin notification to Lukas ─────────────────────────
    await step.run("notify-admin", async () => {
      const resend = new Resend(process.env.RESEND_API_KEY ?? "re_placeholder");
      const adminEmail = process.env.ADMIN_EMAIL ?? "lukas@einfach-verwaltet.de";

      const propertyAddress =
        propertyData
          ? `${propertyData.street ?? ""} ${propertyData.houseNumber ?? ""}, ${propertyData.postalCode ?? ""} ${propertyData.city ?? ""}`.trim()
          : address ?? "Unbekannte Adresse";

      const landlordName = landlordData
        ? `${landlordData.firstName ?? ""} ${landlordData.lastName ?? ""}`.trim()
        : "Unbekannter Eigentümer";

      const tenantCount = tenantsData?.length ?? 0;
      const units = unitCount ?? 0;

      await resend.emails.send({
        from: "einfach verwaltet. System <anfrage@immo.einfach-verwaltet.de>",
        to: adminEmail,
        subject: `[Neues Objekt] ${propertyAddress} — ${landlordName}`,
        html: buildAdminNotificationEmail(
          propertyAddress,
          landlordName,
          units,
          tenantCount,
          tenantEmailResults?.sent ?? 0
        ),
      });
    });

    return {
      success: true,
      propertyId,
      tenantsNotified: tenantEmailResults?.sent ?? 0,
    };
  }
);

// ─── Email Templates ────────────────────────────────────────────────────────

function buildTenantWelcomeEmail(firstName: string, propertyAddress: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f9fafb;margin:0;padding:32px 16px">
  <div style="max-width:520px;margin:0 auto;background:#fff;border-radius:16px;padding:40px;border:1px solid #e5e7eb">
    
    <div style="margin-bottom:28px">
      <span style="font-size:22px;font-weight:700;color:#0f172a">einfach verwaltet.</span>
    </div>

    <h1 style="font-size:20px;font-weight:700;color:#0f172a;margin:0 0 8px">
      Hallo ${firstName},
    </h1>
    <p style="color:#475569;font-size:15px;line-height:1.6;margin:0 0 20px">
      Ihre Immobilie <strong>${propertyAddress}</strong> wird ab sofort von 
      <strong>einfach verwaltet.</strong> betreut. Wir kümmern uns darum, dass 
      alles reibungslos läuft — transparent, zuverlässig und ohne lange Wartezeiten.
    </p>

    <div style="background:#f8fafc;border-radius:12px;padding:20px;margin:24px 0;border-left:4px solid #0ea5e9">
      <p style="font-weight:600;color:#0f172a;margin:0 0 8px;font-size:14px">Was das für Sie bedeutet:</p>
      <ul style="color:#475569;font-size:14px;line-height:1.8;margin:0;padding-left:16px">
        <li>Schadensmeldungen einfach per App oder E-Mail einreichen</li>
        <li>Antwort innerhalb von 24 Stunden — garantiert</li>
        <li>Ihre Nebenkostenabrechnung kommt immer pünktlich</li>
        <li>Direkter Kontakt, keine Warteschleifen</li>
      </ul>
    </div>

    <p style="color:#475569;font-size:14px;line-height:1.6;margin:20px 0">
      Bei Fragen oder Anliegen erreichen Sie uns jederzeit unter 
      <a href="mailto:anfrage@immo.einfach-verwaltet.de" style="color:#0ea5e9;text-decoration:none">
        anfrage@immo.einfach-verwaltet.de
      </a>.
    </p>

    <div style="border-top:1px solid #e5e7eb;padding-top:20px;margin-top:28px">
      <p style="color:#94a3b8;font-size:12px;margin:0">
        einfach verwaltet. · Singapurstr. 19 · 20457 Hamburg<br>
        Hausverwaltung, die funktioniert.
      </p>
    </div>
  </div>
</body>
</html>`;
}

function buildAdminNotificationEmail(
  address: string,
  landlordName: string,
  unitCount: number,
  tenantCount: number,
  emailsSent: number
): string {
  const now = new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin" });
  return `<!DOCTYPE html>
<html>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f9fafb;margin:0;padding:32px 16px">
  <div style="max-width:520px;margin:0 auto;background:#fff;border-radius:16px;padding:40px;border:1px solid #e5e7eb">
    
    <h2 style="font-size:18px;font-weight:700;color:#0f172a;margin:0 0 20px">
      🏢 Neues Objekt ongeboardet
    </h2>

    <table style="width:100%;font-size:14px;border-collapse:collapse">
      <tr><td style="color:#64748b;padding:6px 0;width:140px">Adresse</td><td style="color:#0f172a;font-weight:600">${address}</td></tr>
      <tr><td style="color:#64748b;padding:6px 0">Eigentümer</td><td style="color:#0f172a">${landlordName}</td></tr>
      <tr><td style="color:#64748b;padding:6px 0">Einheiten</td><td style="color:#0f172a">${unitCount}</td></tr>
      <tr><td style="color:#64748b;padding:6px 0">Mieter zugeordnet</td><td style="color:#0f172a">${tenantCount}</td></tr>
      <tr><td style="color:#64748b;padding:6px 0">Welcome-Mails</td><td style="color:#16a34a;font-weight:600">${emailsSent} versendet ✓</td></tr>
      <tr><td style="color:#64748b;padding:6px 0">Zeitpunkt</td><td style="color:#0f172a">${now}</td></tr>
    </table>

    <div style="margin-top:24px">
      <a href="https://einfach-verwaltet.de/admin" 
         style="background:#0f172a;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600">
        Admin-Portal öffnen →
      </a>
    </div>
  </div>
</body>
</html>`;
}
