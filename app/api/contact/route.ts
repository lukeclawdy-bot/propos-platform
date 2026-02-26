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

async function sendEmail(payload: Record<string, string>) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const body = {
    from: "einfach verwaltet. <kontakt@einfach-verwaltet.de>",
    to: ["lukas@rvlt.de"],
    subject: `Neue Anfrage: ${payload.name} — ${payload.einheiten} Einheiten (${payload.typ})`,
    html: `
      <h2>Neue Kontaktanfrage</h2>
      <p><strong>Name:</strong> ${payload.name}</p>
      <p><strong>E-Mail:</strong> ${payload.email}</p>
      <p><strong>Telefon:</strong> ${payload.telefon || "—"}</p>
      <p><strong>Einheiten:</strong> ${payload.einheiten}</p>
      <p><strong>Verwaltungstyp:</strong> ${payload.typ}</p>
      <p><strong>Nachricht:</strong><br>${payload.nachricht || "—"}</p>
    `,
  };

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return res.ok;
  } catch {
    return false;
  }
}

function saveLead(payload: Record<string, string>) {
  try {
    const dir = join(process.cwd(), "data");
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    const line = JSON.stringify({ ...payload, timestamp: new Date().toISOString() }) + "\n";
    appendFileSync(join(dir, "leads.json"), line);
  } catch {
    // Non-fatal
  }
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Zu viele Anfragen. Bitte versuchen Sie es später erneut." }, { status: 429 });
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
    return NextResponse.json({ error: "Name und E-Mail sind erforderlich." }, { status: 400 });
  }

  saveLead(payload);
  await sendEmail(payload);

  return NextResponse.json({ ok: true });
}
