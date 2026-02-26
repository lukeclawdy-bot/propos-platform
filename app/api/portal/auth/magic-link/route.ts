import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { landlords } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { createToken, isDemoMode } from "@/lib/auth/jwt";
import { storePin } from "@/lib/auth/pin-store";
import { Resend } from "resend";

// Lazy init — avoid build-time crash when RESEND_API_KEY is missing
let _resend: InstanceType<typeof Resend> | null = null;
function getResend() {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY);
  return _resend;
}

const GENERIC_MSG =
  "Wenn Sie ein Konto haben, erhalten Sie in Kürze einen Link.";

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
    const { email } = body as { email?: string };

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "E-Mail-Adresse ist erforderlich." },
        { status: 400 }
      );
    }

    const normalised = email.trim().toLowerCase();

    // Look up landlord — do NOT reveal whether they exist
    const [landlord] = await db
      .select()
      .from(landlords)
      .where(eq(landlords.email, normalised));

    if (!landlord) {
      return NextResponse.json({ message: GENERIC_MSG });
    }

    // Generate PIN + JWT token
    const pin = generatePin();
    storePin(normalised, pin, landlord.id);

    const token = await createToken({
      landlordId: landlord.id,
      email: normalised,
    });

    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL || "https://einfach-verwaltet.de";
    const verifyUrl = `${baseUrl}/api/portal/auth/verify?token=${token}`;
    const demo = isDemoMode(normalised);

    // Send email (best-effort — never fail silently in dev)
    try {
      await getResend().emails.send({
        from: "einfach verwaltet. <noreply@einfach-verwaltet.de>",
        to: normalised,
        subject: "Ihr Anmeldelink für einfach verwaltet.",
        html: `
<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:system-ui,-apple-system,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px">
    <tr><td align="center">
      <table width="480" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08)">
        <!-- Header -->
        <tr>
          <td style="background:#1e3a5f;padding:28px 32px;text-align:center">
            <span style="font-size:20px;font-weight:700;color:#ffffff">
              einfach <span style="color:#0d9488">verwaltet.</span>
            </span>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:32px">
            <p style="margin:0 0 12px;font-size:15px;color:#374151">
              Hallo${landlord.name ? ` ${landlord.name}` : ""},
            </p>
            <p style="margin:0 0 24px;font-size:15px;color:#374151;line-height:1.6">
              Sie haben einen Anmeldelink für Ihr Eigentümer-Dashboard angefordert. Verwenden Sie einen der folgenden Wege:
            </p>

            <!-- PIN box -->
            <div style="background:#f8fafc;border:2px dashed #cbd5e1;border-radius:12px;padding:20px;text-align:center;margin-bottom:24px">
              <p style="margin:0 0 6px;font-size:11px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:1px">Ihr Einmal-Code</p>
              <p style="margin:0;font-size:36px;font-weight:700;color:#1e3a5f;letter-spacing:6px;font-family:monospace">${pin}</p>
              <p style="margin:8px 0 0;font-size:12px;color:#94a3b8">Gültig für 10 Minuten · Einmalig verwendbar</p>
            </div>

            <p style="margin:0 0 16px;font-size:14px;color:#6b7280;text-align:center">— oder —</p>

            <!-- CTA button -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center">
                  <a href="${verifyUrl}" style="display:inline-block;background:#1e3a5f;color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:8px;font-weight:600;font-size:15px">
                    Jetzt anmelden →
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- Footer -->
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
        text: `Ihr Anmeldelink für einfach verwaltet.\n\nHallo${landlord.name ? ` ${landlord.name}` : ""},\n\nIhr Einmal-Code: ${pin}\n(Gültig für 10 Minuten)\n\nOder klicken Sie hier:\n${verifyUrl}\n\nWenn Sie sich nicht angemeldet haben, ignorieren Sie diese E-Mail.`,
      });
    } catch (emailErr) {
      console.error("[magic-link] Resend error:", emailErr);
      // In dev/demo mode still return token so dev can test without email
      if (demo) {
        return NextResponse.json({ message: GENERIC_MSG, token });
      }
      return NextResponse.json({ message: GENERIC_MSG });
    }

    // Demo mode → return token in response for easy local testing
    if (demo) {
      return NextResponse.json({ message: GENERIC_MSG, token });
    }

    return NextResponse.json({ message: GENERIC_MSG });
  } catch (err) {
    console.error("[magic-link] Error:", err);
    return NextResponse.json(
      { error: "Ein interner Fehler ist aufgetreten." },
      { status: 500 }
    );
  }
}
