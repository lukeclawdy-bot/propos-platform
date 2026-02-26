import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import fs from "fs";

const resend = new Resend(process.env.RESEND_API_KEY);

const NOTIFICATION_EMAIL = "verwaltung@einfach-verwaltet.de";
const FROM_EMAIL = "noreply@einfach-verwaltet.de";
const LEADS_FILE = "/tmp/leads.json";

interface ContactBody {
  name: string;
  email: string;
  phone?: string;
  units?: string;
  message?: string;
  website?: string; // honeypot
  // German field names from existing form component
  telefon?: string;
  einheiten?: string;
  nachricht?: string;
  typ?: string;
}

function appendLead(lead: object) {
  try {
    let leads: object[] = [];
    if (fs.existsSync(LEADS_FILE)) {
      const raw = fs.readFileSync(LEADS_FILE, "utf-8");
      leads = JSON.parse(raw);
    }
    leads.push(lead);
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to append lead:", err);
  }
}

export async function POST(req: NextRequest) {
  let body: ContactBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  // Honeypot — if filled, silently reject (bot detected)
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  // Normalise field names
  const name = body.name?.trim();
  const email = body.email?.trim();
  const phone = (body.phone || body.telefon || "").trim();
  const units = (body.units || body.einheiten || "").trim();
  const message = (body.message || body.nachricht || "").trim();
  const typ = (body.typ || "").trim();

  // Validation
  if (!name || name.length < 2) {
    return NextResponse.json(
      { error: "Bitte geben Sie Ihren Namen ein." },
      { status: 422 }
    );
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Bitte geben Sie eine gültige E-Mail-Adresse ein." },
      { status: 422 }
    );
  }
  if (!units) {
    return NextResponse.json(
      { error: "Bitte geben Sie die Anzahl der Einheiten an." },
      { status: 422 }
    );
  }

  const timestamp = new Date().toISOString();
  const lead = { name, email, phone, units, typ, message, timestamp };

  // Internal notification email
  const internalHtml = `
    <div style="font-family:sans-serif;max-width:600px;color:#1B2B4B;">
      <div style="background:#1B2B4B;padding:20px 24px;border-radius:8px 8px 0 0;">
        <h1 style="color:white;margin:0;font-size:20px;">Neue Anfrage — einfach verwaltet.</h1>
      </div>
      <div style="background:#f9fafb;padding:24px;border:1px solid #e5e7eb;border-radius:0 0 8px 8px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;font-weight:600;width:140px;">Name</td><td style="padding:8px 0;">${name}</td></tr>
          <tr><td style="padding:8px 0;font-weight:600;">E-Mail</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#2DD4BF;">${email}</a></td></tr>
          ${phone ? `<tr><td style="padding:8px 0;font-weight:600;">Telefon</td><td style="padding:8px 0;">${phone}</td></tr>` : ""}
          <tr><td style="padding:8px 0;font-weight:600;">Einheiten</td><td style="padding:8px 0;">${units}</td></tr>
          ${typ ? `<tr><td style="padding:8px 0;font-weight:600;">Typ</td><td style="padding:8px 0;">${typ}</td></tr>` : ""}
          ${message ? `<tr><td style="padding:8px 0;font-weight:600;vertical-align:top;">Nachricht</td><td style="padding:8px 0;white-space:pre-line;">${message}</td></tr>` : ""}
          <tr><td style="padding:8px 0;font-weight:600;">Zeitpunkt</td><td style="padding:8px 0;color:#6b7280;font-size:13px;">${timestamp}</td></tr>
        </table>
        <div style="margin-top:20px;">
          <a href="mailto:${email}?subject=Re: Ihre Anfrage bei einfach verwaltet." style="display:inline-block;background:#2DD4BF;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;">Jetzt antworten</a>
        </div>
      </div>
    </div>
  `;

  // German auto-reply for prospect
  const autoReplyHtml = `
    <div style="font-family:sans-serif;max-width:600px;color:#1B2B4B;">
      <div style="background:#1B2B4B;padding:20px 24px;border-radius:8px 8px 0 0;">
        <h1 style="color:white;margin:0;font-size:20px;">einfach <span style="color:#2DD4BF;">verwaltet.</span></h1>
      </div>
      <div style="padding:28px 24px;background:#ffffff;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;">
        <p style="font-size:16px;margin-top:0;">Guten Tag ${name},</p>
        <p>vielen Dank für Ihre Anfrage — wir haben sie erhalten und melden uns <strong>noch am selben Werktag</strong> bei Ihnen.</p>
        <div style="background:#f0fdfb;border-left:4px solid #2DD4BF;padding:16px 20px;border-radius:0 8px 8px 0;margin:20px 0;">
          <p style="margin:0 0 8px;font-weight:600;">Was als Nächstes passiert:</p>
          <ol style="margin:0;padding-left:20px;line-height:1.8;">
            <li>✓ Eingangsbestätigung erhalten (gerade eben)</li>
            <li>Rückruf noch heute (oder am nächsten Werktag)</li>
            <li>Schriftliches Angebot innerhalb von 24 Stunden</li>
          </ol>
        </div>
        <p>Ihre Angaben:</p>
        <ul style="background:#f9fafb;padding:16px 20px 16px 36px;border-radius:8px;line-height:1.8;">
          <li>Einheiten: <strong>${units}</strong></li>
          ${typ ? `<li>Verwaltungstyp: <strong>${typ}</strong></li>` : ""}
          ${message ? `<li>Ihre Nachricht: <em>${message}</em></li>` : ""}
        </ul>
        <p>Bei dringenden Fragen erreichen Sie uns direkt unter <a href="mailto:verwaltung@einfach-verwaltet.de" style="color:#2DD4BF;">verwaltung@einfach-verwaltet.de</a>.</p>
        <p style="margin-bottom:0;">Mit freundlichen Grüßen,<br><strong>Das Team von einfach verwaltet.</strong><br><span style="color:#6b7280;font-size:13px;">Singapurstr. 19 · 20457 Hamburg</span></p>
      </div>
      <p style="font-size:11px;color:#9ca3af;padding:12px 0;text-align:center;">Diese Nachricht wurde automatisch versendet. Bitte antworten Sie nicht direkt auf diese E-Mail.</p>
    </div>
  `;

  try {
    await Promise.all([
      resend.emails.send({
        from: `einfach verwaltet. <${FROM_EMAIL}>`,
        to: [NOTIFICATION_EMAIL],
        subject: `Neue Anfrage von ${name} (${units} Einheiten)`,
        html: internalHtml,
        replyTo: email,
      }),
      resend.emails.send({
        from: `einfach verwaltet. <${FROM_EMAIL}>`,
        to: [email],
        subject:
          "Ihre Anfrage bei einfach verwaltet. — Wir melden uns noch heute",
        html: autoReplyHtml,
      }),
    ]);
  } catch (err) {
    // Log but don't fail — lead is still saved
    console.error("Resend error:", err);
  }

  appendLead(lead);

  return NextResponse.json({
    ok: true,
    message: "Vielen Dank! Wir melden uns noch heute bei Ihnen.",
  });
}
