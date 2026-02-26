import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { landlords } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, type, name, firma, kommunikation, aiAutonomy } = body;

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    // Check if landlord already exists
    const existing = await db
      .select()
      .from(landlords)
      .where(eq(landlords.email, email.toLowerCase().trim()))
      .limit(1);

    let landlordId: string;

    if (existing.length > 0) {
      landlordId = existing[0].id;
    } else {
      // Create new landlord
      const [newLandlord] = await db
        .insert(landlords)
        .values({
          email: email.toLowerCase().trim(),
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

    // Send magic link via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        // Generate a magic link token (reuse existing logic)
        const { SignJWT } = await import("jose");
        const secret = new TextEncoder().encode(
          process.env.JWT_SECRET || "fallback-secret-change-in-production"
        );
        const token = await new SignJWT({ landlordId, email: email.toLowerCase().trim() })
          .setProtectedHeader({ alg: "HS256" })
          .setIssuedAt()
          .setExpirationTime("24h")
          .sign(secret);

        const magicLink = `${process.env.NEXT_PUBLIC_APP_URL || "https://einfach-verwaltet.de"}/api/portal/auth/verify?token=${token}`;

        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
          from: "portal@immo.einfach-verwaltet.de",
          to: email,
          subject: "Ihr Portal ist bereit — einfach verwaltet.",
          html: `
            <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px 24px">
              <div style="margin-bottom:24px">
                <span style="font-size:20px;font-weight:700;color:#0f172a">einfach <span style="color:#0d9488">verwaltet.</span></span>
              </div>
              <h1 style="font-size:24px;font-weight:700;color:#0f172a;margin:0 0 12px">Willkommen!</h1>
              <p style="color:#475569;margin:0 0 24px">Ihr Verwalter-Portal ist eingerichtet. Klicken Sie auf den Button, um sich anzumelden — kein Passwort notwendig.</p>
              <a href="${magicLink}" style="display:inline-block;background:#0d9488;color:white;font-weight:600;padding:14px 28px;border-radius:10px;text-decoration:none;font-size:16px">
                Portal öffnen →
              </a>
              <p style="color:#94a3b8;font-size:13px;margin:24px 0 0">Dieser Link ist 24 Stunden gültig. Falls Sie kein Konto erstellt haben, ignorieren Sie diese E-Mail.</p>
            </div>
          `,
        });
      } catch (emailErr) {
        console.error("Failed to send magic link email:", emailErr);
        // Don't fail the whole request if email fails
      }
    }

    return NextResponse.json({
      success: true,
      landlordId,
      message: "Konto erstellt. Magic Link wurde gesendet.",
    });
  } catch (e) {
    console.error("Onboarding complete error:", e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
