import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { landlords } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { createToken } from "@/lib/auth/jwt";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, type, name, firma, kommunikation, aiAutonomy } = body;

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const normalised = email.toLowerCase().trim();

    // Check if landlord already exists
    const existing = await db
      .select()
      .from(landlords)
      .where(eq(landlords.email, normalised))
      .limit(1);

    let landlordId: string;

    if (existing.length > 0) {
      landlordId = existing[0].id;
    } else {
      const [newLandlord] = await db
        .insert(landlords)
        .values({
          email: normalised,
          name: name || firma || null,
          companyName: firma || null,
          type: type === "profi" ? "professional" : "private",
          communicationChannel: kommunikation || "email",
          aiAutonomyLevel: aiAutonomy || "supervised",
          onboardingCompleted: true,
        })
        .returning();
      landlordId = newLandlord.id;
    }

    // Generate magic link using existing createToken helper
    const token = await createToken({ landlordId, email: normalised });
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://einfach-verwaltet.de";
    const magicLink = `${baseUrl}/api/portal/auth/verify?token=${token}`;

    // Send via Resend
    if (!process.env.RESEND_API_KEY) {
      console.error("[onboarding/complete] RESEND_API_KEY not set");
      return NextResponse.json({
        success: true,
        landlordId,
        message: "Konto erstellt. E-Mail-Versand nicht konfiguriert.",
        debug: "RESEND_API_KEY missing",
      });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error: sendError } = await resend.emails.send({
      from: "einfach verwaltet. <portal@immo.einfach-verwaltet.de>",
      to: normalised,
      subject: "Ihr Portal ist bereit — einfach verwaltet.",
      html: `
<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:system-ui,-apple-system,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px">
    <tr><td align="center">
      <table width="480" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08)">
        <tr>
          <td style="background:#1e3a5f;padding:28px 32px;text-align:center">
            <span style="font-size:20px;font-weight:700;color:#ffffff">
              einfach <span style="color:#0d9488">verwaltet.</span>
            </span>
          </td>
        </tr>
        <tr>
          <td style="padding:32px">
            <h1 style="margin:0 0 12px;font-size:22px;font-weight:700;color:#0f172a">Willkommen!</h1>
            <p style="margin:0 0 24px;font-size:15px;color:#475569;line-height:1.6">
              Ihr Portal ist eingerichtet. Klicken Sie auf den Button, um sich anzumelden — kein Passwort notwendig.
            </p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center">
                  <a href="${magicLink}" style="display:inline-block;background:#0d9488;color:white;font-weight:600;padding:14px 32px;border-radius:10px;text-decoration:none;font-size:16px">
                    Portal öffnen →
                  </a>
                </td>
              </tr>
            </table>
            <p style="margin:24px 0 0;font-size:13px;color:#94a3b8;text-align:center">
              Dieser Link ist 24 Stunden gültig.
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
      text: `Willkommen bei einfach verwaltet.\n\nIhr Portal-Link:\n${magicLink}\n\nGültig für 24 Stunden.`,
    });

    if (sendError) {
      console.error("[onboarding/complete] Resend error:", sendError);
      return NextResponse.json({
        success: true,
        landlordId,
        message: "Konto erstellt, aber E-Mail konnte nicht gesendet werden.",
        emailError: sendError.message,
      });
    }

    return NextResponse.json({
      success: true,
      landlordId,
      message: "Konto erstellt. Magic Link wurde gesendet.",
    });
  } catch (e) {
    console.error("[onboarding/complete] Error:", e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
