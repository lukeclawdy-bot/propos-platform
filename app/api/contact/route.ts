import { NextRequest, NextResponse } from "next/server";
import { appendFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

// Rate limiting (simple in-memory)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 3600000 });
    return true;
  }
  if (entry.count >= 5) return false;
  entry.count++;
  return true;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function autoReplyText(name: string): string {
  return `Guten Tag ${name},\n\nvielen Dank für Ihre Anfrage bei einfach verwaltet.\n\nWir haben Ihre Nachricht erhalten und melden uns noch am selben Werktag bei Ihnen.\n\nDAS PASSIERT ALS NÄCHSTES:\n1. Wir prüfen Ihre Anforderungen\n2. Wir rufen Sie noch heute zurück\n3. Sie erhalten ein konkretes Angebot am nächsten Werktag\n\nFalls wir uns verpasst sollten: Sie erreichen uns unter kontakt@einfach-verwaltet.de.\n\nMit freundlichen Grüßen\nLukas Schmitz\nGründer, einfach verwaltet.\n\n---\neinfach verwaltet.\nSingapurstr. 19\n20457 Hamburg\nWeb: https://einfach-verwaltet.de\nE-Mail: kontakt@einfach-verwaltet.de\n`;
}

function autoReplyHtml(name: string): string {
  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ihre Anfrage bei einfach verwaltet.</title>
</head>
<body style="margin:0;padding:0;background-color:#faf8f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
          <tr>
            <td style="background:linear-gradient(135deg,#1a365d 0%,#234876 100%);padding:40px 30px;text-align:center;">
              <div style="font-size:28px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">einfach verwaltet.</div>
              <div style="color:#90cdf4;font-size:14px;margin-top:8px;">Hausverwaltung Hamburg</div>
            </td>
          </tr>
          <tr>
            <td style="padding:40px 30px;">
              <h1 style="color:#1a365d;font-size:22px;font-weight:600;margin:0 0 20px 0;">Ihre Anfrage ist bei uns angekommen</h1>
              <p style="color:#4a5568;font-size:16px;line-height:1.7;margin:0 0 20px 0;">Guten Tag <strong>${escapeHtml(name)}</strong>,</p>
              <p style="color:#4a5568;font-size:16px;line-height:1.7;margin:0 0 25px 0;">vielen Dank für Ihre Anfrage bei <strong>einfach verwaltet.</strong> Wir haben Ihre Nachricht erhalten und melden uns <strong style="color:#2b6cb0;">noch am selben Werktag</strong> bei Ihnen.</p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f7fafc;border-radius:12px;margin:25px 0;">
                <tr>
                  <td style="padding:25px;">
                    <div style="color:#1a365d;font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:20px;">Das passiert als Nächstes:</div>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="width:40px;vertical-align:top;">
                          <div style="width:28px;height:28px;background:linear-gradient(135deg,#38b2ac 0%,#2c7a7b 100%);border-radius:50%;text-align:center;line-height:28px;color:#ffffff;font-weight:600;font-size:14px;">1</div>
                        </td>
                        <td style="padding-bottom:15px;">
                          <div style="color:#2d3748;font-size:15px;font-weight:500;">Wir prüfen Ihre Anforderungen</div>
                          <div style="color:#718096;font-size:13px;margin-top:4px;">Typ, Anzahl Einheiten, Besonderheiten</div>
                        </td>
                      </tr>
                      <tr>
                        <td style="width:40px;vertical-align:top;">
                          <div style="width:28px;height:28px;background:linear-gradient(135deg,#38b2ac 0%,#2c7a7b 100%);border-radius:50%;text-align:center;line-height:28px;color:#ffffff;font-weight:600;font-size:14px;">2</div>
                        </td>
                        <td style="padding-bottom:15px;">
                          <div style="color:#2d3748;font-size:15px;font-weight:500;">Wir rufen Sie noch heute zurück</div>
                          <div style="color:#718096;font-size:13px;margin-top:4px;">Kurzes Erstgespräch, ca. 15 Minuten</div>
                        </td>
                      </tr>
                      <tr>
                        <td style="width:40px;vertical-align:top;">
                          <div style="width:28px;height:28px;background:linear-gradient(135deg,#38b2ac 0%,#2c7a7b 100%);border-radius:50%;text-align:center;line-height:28px;color:#ffffff;font-weight:600;font-size:14px;">3</div>
                        </td>
                        <td>
                          <div style="color:#2d3748;font-size:15px;font-weight:500;">Sie erhalten ein konkretes Angebot</div>
                          <div style="color:#718096;font-size:13px;margin-top:4px;">Am nächsten Werktag — direkt umsetzbar</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <p style="color:#4a5568;font-size:15px;line-height:1.7;margin:25px 0 0 0;">Falls wir uns verpasst sollten: Sie erreichen uns unter <a href="mailto:kontakt@einfach-verwaltet.de" style="color:#2b6cb0;text-decoration:none;font-weight:500;">kontakt@einfach-verwaltet.de</a></p>
            </td>
          </tr>
          <tr>
            <td style="padding:30px;background-color:#f7fafc;border-top:1px solid #e2e8f0;">
              <div style="font-size:16px;font-weight:600;color:#1a365d;">Lukas Schmitz</div>
              <div style="font-size:14px;color:#718096;margin-top:2px;">Gründer, einfach verwaltet.</div>
            </td>
          </tr>
          <tr>
            <td style="padding:25px 30px;background-color:#edf2f7;border-top:1px solid #e2e8f0;text-align:center;">
              <div style="color:#718096;font-size:13px;line-height:1.6;">
                <strong style="color:#4a5568;">einfach verwaltet.</strong><br>
                Singapurstr. 19, 20457 Hamburg<br>
                <a href="https://einfach-verwaltet.de" style="color:#2b6cb0;text-decoration:none;">einfach-verwaltet.de</a>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

async function sendEmail(payload: Record<string, string>) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const typLabels: Record<string, string> = {
    miet: "Mietverwaltung",
    weg: "WEG-Verwaltung",
    beides: "Beides",
    unsicher: "Noch unsicher",
  };

  const einheitenLabels: Record<string, string> = {
    "1-3": "1–3 Einheiten",
    "4-10": "4–10 Einheiten",
    "11-30": "11–30 Einheiten",
    "30+": "Mehr als 30 Einheiten",
  };

  try {
    // Internal notification to Lukas
    const internalRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { 
        Authorization: \`Bearer \${apiKey}\`, 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        from: "einfach verwaltet. <hallo@einfach-verwaltet.de>",
        to: ["lukas.schmitz@einfach-verwaltet.de"],
        subject: \`Neue Anfrage: \${payload.name} — \${einheitenLabels[payload.einheiten]}\`,
        html: \`
          <h2>Neue Kontaktanfrage</h2>
          <p><strong>Name:</strong> \${escapeHtml(payload.name)}</p>
          <p><strong>E-Mail:</strong> \${escapeHtml(payload.email)}</p>
          <p><strong>Telefon:</strong> \${escapeHtml(payload.telefon || "—")}</p>
          <p><strong>Einheiten:</strong> \${einheitenLabels[payload.einheiten]}</p>
          <p><strong>Verwaltungstyp:</strong> \${typLabels[payload.typ]}</p>
          <p><strong>Nachricht:</strong><br>\${escapeHtml(payload.nachricht || "—")}</p>
        \`,
      }),
    });

    if (!internalRes.ok) {
      console.error("Failed to send internal notification:", await internalRes.text());
      return false;
    }

    // Auto-reply to the prospect
    const autoReplyRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { 
        Authorization: \`Bearer \${apiKey}\`, 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        from: "einfach verwaltet. <hallo@einfach-verwaltet.de>",
        reply_to: "lukas.schmitz@einfach-verwaltet.de",
        to: [payload.email],
        subject: "Ihre Anfrage bei einfach verwaltet. — Wir melden uns bald",
        html: autoReplyHtml(payload.name),
        text: autoReplyText(payload.name),
      }),
    });

    if (!autoReplyRes.ok) {
      console.error("Failed to send auto-reply:", await autoReplyRes.text());
    }

    return true;
  } catch (error) {
    console.error("Email send error:", error);
    return false;
  }
}

function saveLead(payload: Record<string, string>) {
  try {
    const dir = join(process.cwd(), "data");
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    const line = JSON.stringify({ ...payload, timestamp: new Date().toISOString() }) + "\n";
    appendFileSync(join(dir, "leads.jsonl"), line);
  } catch {
    // Non-fatal
  }
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ 
      error: "Zu viele Anfragen. Bitte versuchen Sie es später erneut." 
    }, { status: 429 });
  }

  let payload: Record<string, string>;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  // Honeypot check
  if (payload.website) {
    return NextResponse.json({ ok: true }); // Silently ignore spam
  }

  const { name, email } = payload;
  if (!name || !email) {
    return NextResponse.json({ 
      error: "Name und E-Mail sind erforderlich." 
    }, { status: 400 });
  }

  saveLead(payload);
  const emailSent = await sendEmail(payload);
  
  if (!emailSent) {
    return NextResponse.json({ 
      error: "E-Mail konnte nicht gesendet werden." 
    }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
