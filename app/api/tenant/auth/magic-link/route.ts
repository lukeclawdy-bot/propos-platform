import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { tenants, units, properties } from "@/lib/db/schema";
import { eq, or, ilike } from "drizzle-orm";
import { createTenantToken } from "@/lib/auth/tenant-jwt";
import { storeTenantPin } from "@/lib/auth/tenant-pin-store";
import { Resend } from "resend";

// Lazy init — avoid build-time crash when RESEND_API_KEY is missing
let _resend: InstanceType<typeof Resend> | null = null;
function getResend() {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY);
  return _resend;
}

const GENERIC_MSG =
  "Wenn Sie registriert sind, erhalten Sie in Kürze einen Link.";

function generatePin(): string {
  // 6 uppercase alphanumeric characters (excluding confusing chars 0/O/I/1)
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let pin = "";
  for (let i = 0; i < 6; i++) {
    pin += chars[Math.floor(Math.random() * chars.length)];
  }
  return pin;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { email, unitCode } = body as { email?: string; unitCode?: string };

    if (!email && !unitCode) {
      return NextResponse.json(
        { error: "E-Mail-Adresse oder Wohnungscode ist erforderlich." },
        { status: 400 }
      );
    }

    let tenant: typeof tenants.$inferSelect | undefined;

    // Search by email
    if (email) {
      const normalizedEmail = email.trim().toLowerCase();
      const [found] = await db
        .select()
        .from(tenants)
        .where(eq(tenants.email, normalizedEmail));
      tenant = found;
    }

    // Search by unit code (format: PROPERTY-CODE-UNIT, e.g., "MUSTER-001-A")
    if (!tenant && unitCode) {
      const normalizedCode = unitCode.trim().toUpperCase();
      // Try to find by unit designation match or unit ID
      const [foundUnit] = await db
        .select()
        .from(units)
        .where(ilike(units.designation, `%${normalizedCode}%`));
      
      if (foundUnit) {
        const [foundTenant] = await db
          .select()
          .from(tenants)
          .where(eq(tenants.unitId, foundUnit.id));
        tenant = foundTenant;
      }
    }

    // Do NOT reveal whether tenant exists
    if (!tenant || !tenant.email) {
      return NextResponse.json({ message: GENERIC_MSG });
    }

    // Generate PIN + JWT token
    const pin = generatePin();
    storeTenantPin(tenant.email, pin, tenant.id);

    const token = await createTenantToken({
      tenantId: tenant.id,
      email: tenant.email,
    });

    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL || "https://einfach-verwaltet.de";
    const verifyUrl = `${baseUrl}/api/tenant/auth/verify?token=${token}`;

    // Get tenant info for email
    const [tenantUnit] = tenant.unitId
      ? await db.select().from(units).where(eq(units.id, tenant.unitId))
      : [];
    const [property] = tenantUnit?.propertyId
      ? await db.select().from(properties).where(eq(properties.id, tenantUnit.propertyId))
      : [];

    // Send email (best-effort)
    try {
      await getResend().emails.send({
        from: "einfach verwaltet. <mieter@immo.einfach-verwaltet.de>",
        to: tenant.email,
        subject: "Ihr Anmeldelink für das Mieterportal",
        html: `<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:system-ui,-apple-system,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px">
    <tr><td align="center">
      <table width="480" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08)">
        <tr>
          <td style="background:#1B2B5B;padding:28px 32px;text-align:center">
            <span style="font-size:20px;font-weight:700;color:#ffffff">
              einfach <span style="color:#3BBFBF">verwaltet.</span>
            </span>
          </td>
        </tr>
        <tr>
          <td style="padding:32px">
            <p style="margin:0 0 12px;font-size:15px;color:#374151">
              Hallo${tenant.firstName ? ` ${tenant.firstName}` : ""},
            </p>
            <p style="margin:0 0 24px;font-size:15px;color:#374151;line-height:1.6">
              Sie haben einen Anmeldelink für das Mieterportal angefordert. Verwenden Sie einen der folgenden Wege:
            </p>
            <div style="background:#f8fafc;border:2px dashed #cbd5e1;border-radius:12px;padding:20px;text-align:center;margin-bottom:24px">
              <p style="margin:0 0 6px;font-size:11px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:1px">Ihr Einmal-Code</p>
              <p style="margin:0;font-size:36px;font-weight:700;color:#1B2B5B;letter-spacing:6px;font-family:monospace">${pin}</p>
              <p style="margin:8px 0 0;font-size:12px;color:#94a3b8">Gültig für 10 Minuten · Einmalig verwendbar</p>
            </div>
            <p style="margin:0 0 16px;font-size:14px;color:#6b7280;text-align:center">— oder —</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr><td align="center">
                <a href="${verifyUrl}" style="display:inline-block;background:#1B2B5B;color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:8px;font-weight:600;font-size:15px">
                  Jetzt anmelden →
                </a>
              </td></tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 32px;border-top:1px solid #f1f5f9;text-align:center">
            <p style="margin:0;font-size:12px;color:#9ca3af;line-height:1.6">
              Wenn Sie sich nicht angemeldet haben, können Sie diese E-Mail ignorieren.<br>
              Link und Code verfallen automatisch nach 10 Minuten.
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
        text: `Ihr Anmeldelink für das Mieterportal\n\nHallo${tenant.firstName ? ` ${tenant.firstName}` : ""},\n\nIhr Einmal-Code: ${pin}\n(Gültig für 10 Minuten)\n\nOder klicken Sie hier:\n${verifyUrl}\n\nWenn Sie sich nicht angemeldet haben, ignorieren Sie diese E-Mail.`,
      });
    } catch (emailErr) {
      console.error("[tenant-magic-link] Resend error:", emailErr);
      // In dev without email, still return success-like message
    }

    // Dev mode: return token in response
    if (process.env.NODE_ENV === "development") {
      return NextResponse.json({ message: GENERIC_MSG, token });
    }

    return NextResponse.json({ message: GENERIC_MSG });
  } catch (err) {
    console.error("[tenant-magic-link] Error:", err);
    return NextResponse.json(
      { error: "Ein interner Fehler ist aufgetreten." },
      { status: 500 }
    );
  }
}
