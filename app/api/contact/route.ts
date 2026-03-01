import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, telefon, einheiten, typ, nachricht, website } = body;

    // Honeypot check
    if (website) {
      return NextResponse.json({ success: true }); // silently ignore bots
    }

    if (!name || !email) {
      return NextResponse.json({ error: "Name und E-Mail sind Pflichtfelder." }, { status: 400 });
    }

    const typLabel: Record<string, string> = {
      miet: "Mietverwaltung",
      weg: "WEG-Verwaltung",
      beides: "Miet- & WEG-Verwaltung",
      unsicher: "Noch unsicher",
    };

    const emailBody = `
Neue Kontaktanfrage über einfach-verwaltet.de/kontakt

Name: ${name}
E-Mail: ${email}
Telefon: ${telefon || "nicht angegeben"}
Einheiten: ${einheiten || "nicht angegeben"}
Verwaltungstyp: ${typLabel[typ] || typ || "nicht angegeben"}

Nachricht:
${nachricht || "(keine Nachricht)"}

---
Eingegangen: ${new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin" })} Uhr
    `.trim();

    // Send to Lukas
    const { error: sendError } = await resend.emails.send({
      from: "einfach verwaltet. <kontakt@einfach-verwaltet.de>",
      to: ["lukas.schmitz@years.co"],
      replyTo: email,
      subject: `Neue Kontaktanfrage: ${name} (${einheiten || "?"} Einheiten)`,
      text: emailBody,
    });

    if (sendError) {
      console.error("Resend error:", sendError);
      return NextResponse.json({ error: "E-Mail konnte nicht gesendet werden." }, { status: 500 });
    }

    // Send confirmation to visitor
    await resend.emails.send({
      from: "einfach verwaltet. <kontakt@einfach-verwaltet.de>",
      to: [email],
      subject: "Ihre Anfrage bei einfach verwaltet. — Wir melden uns heute noch",
      text: `Hallo ${name},

vielen Dank für Ihre Anfrage! Wir haben Ihre Nachricht erhalten und melden uns noch heute bei Ihnen.

Ihre Angaben:
- Einheiten: ${einheiten || "nicht angegeben"}
- Verwaltungstyp: ${typLabel[typ] || "nicht angegeben"}

Bei dringenden Fragen erreichen Sie uns unter kontakt@einfach-verwaltet.de.

Mit freundlichen Grüßen
Ihr Team von einfach verwaltet.
Hausverwaltung Hamburg

---
einfach verwaltet. | Singapurstr. 19, 20457 Hamburg
kontakt@einfach-verwaltet.de | einfach-verwaltet.de`,
    }).catch(() => null); // non-blocking — don't fail if confirmation fails

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Interner Fehler. Bitte versuchen Sie es erneut." }, { status: 500 });
  }
}
