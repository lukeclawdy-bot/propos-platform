import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { db, hasDatabase } from "../../db";
import { leads } from "../../db/schema";

interface LeadSubmission {
  verwaltungstyp?: string;
  einheiten?: string;
  standort?: string;
  situation?: string;
  prioritaet?: string;
  name?: string;
  email?: string;
  telefon?: string;
}

// Lazy initialization of Resend client to avoid build-time errors
let resendClient: Resend | null = null;

function getResendClient(): Resend {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY is not configured");
    }
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

export async function POST(request: NextRequest) {
  try {
    const body: LeadSubmission = await request.json();

    // Validate required fields
    if (!body.name || !body.email) {
      return NextResponse.json(
        { success: false, error: "Name und E-Mail sind erforderlich" },
        { status: 400 }
      );
    }

    // Save to database if available
    if (hasDatabase && db) {
      try {
        await db.insert(leads).values({
          name: body.name,
          email: body.email,
          telefon: body.telefon || null,
          verwaltungstyp: body.verwaltungstyp || null,
          einheiten: body.einheiten || null,
          standort: body.standort || null,
          situation: body.situation || null,
          prioritaet: body.prioritaet || null,
          quelle: "anfrage",
        });
      } catch (dbError) {
        console.error("Database error (continuing with email):", dbError);
        // Don't fail the request if DB save fails - still send email
      }
    }

    // Format values for display
    const formatValue = (val?: string) => val ? val.replace(/-/g, " ") : "—";

    const verwaltungstypDisplay = formatValue(body.verwaltungstyp);
    const einheitenDisplay = formatValue(body.einheiten);
    const standortDisplay = formatValue(body.standort);
    const situationDisplay = formatValue(body.situation);
    const prioritaetDisplay = formatValue(body.prioritaet);

    // Build email HTML
    const htmlContent = `
      <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1a1a2e;">
        <h2 style="color: #1a365d; margin-bottom: 24px; font-size: 20px;">Neue Anfrage über einfach verwaltet.</h2>

        <div style="background: #f7fafc; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
          <h3 style="margin-top: 0; color: #2d3748; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Kontaktdaten</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #718096; width: 120px;">Name:</td>
              <td style="padding: 8px 0; font-weight: 500;">${body.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #718096;">E-Mail:</td>
              <td style="padding: 8px 0; font-weight: 500;">${body.email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #718096;">Telefon:</td>
              <td style="padding: 8px 0; font-weight: 500;">${body.telefon || "—"}</td>
            </tr>
          </table>
        </div>

        <div style="background: #f7fafc; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
          <h3 style="margin-top: 0; color: #2d3748; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Anfragedetails</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #718096; width: 120px;">Verwaltungstyp:</td>
              <td style="padding: 8px 0; font-weight: 500;">${verwaltungstypDisplay}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #718096;">Einheiten:</td>
              <td style="padding: 8px 0; font-weight: 500;">${einheitenDisplay}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #718096;">Standort:</td>
              <td style="padding: 8px 0; font-weight: 500;">${standortDisplay}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #718096;">Situation:</td>
              <td style="padding: 8px 0; font-weight: 500;">${situationDisplay}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #718096;">Priorität:</td>
              <td style="padding: 8px 0; font-weight: 500;">${prioritaetDisplay}</td>
            </tr>
          </table>
        </div>

        <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; color: #718096; font-size: 12px;">
          <p style="margin: 0;">Gesendet am ${new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin" })}</p>
          <p style="margin: 8px 0 0 0;">Quelle: einfach-verwaltet.de/anfrage</p>
        </div>
      </div>
    `;

    // Send email via Resend
    const resend = getResendClient();
    const { data, error } = await resend.emails.send({
      from: "anfrage@einfach-verwaltet.de",
      to: "kontakt@einfach-verwaltet.de",
      subject: `Neue Anfrage: ${body.name} — ${einheitenDisplay} Einheiten (${standortDisplay})`,
      html: htmlContent,
      replyTo: body.email,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { success: false, error: "E-Mail konnte nicht gesendet werden" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      id: data?.id,
    });

  } catch (error) {
    console.error("API error:", error);
    const message = error instanceof Error ? error.message : "Interner Serverfehler";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
