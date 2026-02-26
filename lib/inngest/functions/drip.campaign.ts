import { inngest } from "../client";

// Email templates for the 5-part lead nurture drip campaign
// Tone: professional but warm, Hamburg-local feel, practical German
// CRITICAL: Never mention AI, automation, bots, or KI in customer-facing copy

const emailTemplates = {
  // Email 1: Day 0 - Immediate welcome
  welcome: {
    subject: "Willkommen bei einfach verwaltet. — Wir melden uns innerhalb von 24 Stunden",
    html: (lead: any) => `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Willkommen bei einfach verwaltet.</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 20px;">
  
  <p style="font-size: 16px;">Hallo ${lead.name || "da"},</p>
  
  <p style="font-size: 16px;">schön, dass Sie da sind. Ich bin Lukas Schmitz, Gründer von <strong>einfach verwaltet.</strong> aus Hamburg.</p>
  
  <p style="font-size: 16px;">Ihre Anfrage ist bei uns angekommen. Ein Mitglied unseres Teams meldet sich <strong>innerhalb der nächsten 24 Stunden</strong> bei Ihnen — meist schneller.</p>
  
  <p style="font-size: 16px;">Wenn Sie direkt sprechen möchten, buchen Sie sich gerne einen Termin in meinen Kalender:</p>
  
  <p style="font-size: 16px; margin: 24px 0;">
    <a href="https://calendly.com/einfach-verwaltet" style="background-color: #0f172a; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 500;">Termin buchen →</a>
  </p>
  
  <p style="font-size: 16px;">Wir freuen uns darauf, Ihre Immobilienverwaltung zu vereinfachen.</p>
  
  <p style="font-size: 16px; margin-top: 32px;">
    Mit freundlichen Grüßen<br>
    <strong>Lukas Schmitz</strong><br>
    Gründer, einfach verwaltet.<br>
    <a href="mailto:lukas@einfach-verwaltet.de" style="color: #0f172a;">lukas@einfach-verwaltet.de</a>
  </p>
  
  <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 32px 0;">
  
  <p style="font-size: 13px; color: #666;">
    einfach verwaltet. | Singapurstr. 19 | 20457 Hamburg<br>
    <a href="https://einfach-verwaltet.de" style="color: #666;">einfach-verwaltet.de</a> | 
    <a href="https://einfach-verwaltet.de/datenschutz" style="color: #666;">Datenschutz</a> | 
    <a href="https://einfach-verwaltet.de/impressum" style="color: #666;">Impressum</a>
  </p>
  
</body>
</html>`,
  },

  // Email 2: Day 2 - Value content: 5 expensive mistakes
  mistakes: {
    subject: "Die 5 teuersten Fehler bei der Hausverwaltung (und wie Sie sie vermeiden)",
    html: (lead: any) => `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Die 5 teuersten Fehler bei der Hausverwaltung</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 20px;">
  
  <p style="font-size: 16px;">Hallo ${lead.name || "da"},</p>
  
  <p style="font-size: 16px;">in 15 Jahren als Eigentümer habe ich fast jeden Fehler gemacht, den man machen kann. Hier sind die fünf teuersten — und wie Sie sie von Anfang an vermeiden.</p>
  
  <h2 style="font-size: 18px; font-weight: 600; margin-top: 28px; margin-bottom: 12px; color: #0f172a;">1. Der "günstigste" Verwalter wählen</h2>
  <p style="font-size: 16px; margin-bottom: 16px;">Ein Verwalter, der 5 €/Monat weniger kostet, aber Mieter 3 Wochen auf Reparaturen warten lässt, kostet Sie am Ende Mietrückstände, Leerstände und Nerven. Rechnen Sie den <em>Gesamtwert</em>, nicht nur den Preis.</p>
  
  <h2 style="font-size: 18px; font-weight: 600; margin-top: 28px; margin-bottom: 12px; color: #0f172a;">2. Keine klaren Kommunikationsregeln</h2>
  <p style="font-size: 16px; margin-bottom: 16px;">Wenn Mieter nicht wissen, wie sie Sie erreichen, rufen sie an — oft mehrfach, oft frustriert. Ein einfaches Ticketsystem mit klarer Erwartungshaltung ("Wir antworten innerhalb von X Stunden") reduziert Anrufe um 60-70%.</p>
  
  <h2 style="font-size: 18px; font-weight: 600; margin-top: 28px; margin-bottom: 12px; color: #0f172a;">3. Wartung erst wenn's brennt</h2>
  <p style="font-size: 16px; margin-bottom: 16px;">Kleine Probleme werden große Schäden. Ein undichter Wasserhahn wird zur Wasserschadensanierung. Ein defektes Fenster wird zur Schimmelsanierung. Regelmäßige Begehungen und ein zuverlässiges Handwerkernetzwerk verhindern fünfstellige Schäden.</p>
  
  <h2 style="font-size: 18px; font-weight: 600; margin-top: 28px; margin-bottom: 12px; color: #0f172a;">4. Mieten nicht anpassen</h2>
  <p style="font-size: 16px; margin-bottom: 16px;">Viele Eigentümer erhöhen die Miete nicht, weil es "unangenehm" ist oder sie den Prozess nicht kennen. Bei 3% Inflation und 2% Mietsteigerung pro Jahr verlieren Sie bei einer Kaltmiete von 1.000 €/Monat über 5 Jahre über 15.000 €. Ein professioneller Verwalter kennt die rechtlichen Rahmenbedingungen und kommuniziert Erhöhungen sachlich.</p>
  
  <h2 style="font-size: 18px; font-weight: 600; margin-top: 28px; margin-bottom: 12px; color: #0f172a;">5. Dokumentation im Chaos</h2>
  <p style="font-size: 16px; margin-bottom: 16px;">Verträge, Begehungsprotokolle, Rechnungen, Schriftverkehr — wenn das alles in verschiedenen E-Mail-Postfächern, Schubladen und Cloud-Ordnern liegt, finden Sie nichts, wenn Sie es brauchen. Ein zentraler, DSGVO-konformer Dokumentenspeicher ist keine "schöne-to-have" — er ist Pflicht bei Prüfungen und Streitfällen.</p>
  
  <p style="font-size: 16px; margin-top: 28px; margin-bottom: 16px;">Diese Fehler haben mich damals Zeit, Geld und viele Nerven gekostet. Deshalb haben wir <strong>einfach verwaltet.</strong> gegründet — um Eigentümern genau diese Probleme zu ersparen.</p>
  
  <p style="font-size: 16px; margin-bottom: 24px;">Unsere Preise sehen Sie transparent auf unserer Website — keine versteckten Kosten, keine Überraschungen.</p>
  
  <p style="font-size: 16px; margin: 24px 0;">
    <a href="https://einfach-verwaltet.de/preise" style="background-color: #0f172a; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 500;">Preise ansehen →</a>
  </p>
  
  <p style="font-size: 16px;">Fragen? Antworten wir gerne persönlich.</p>
  
  <p style="font-size: 16px; margin-top: 32px;">
    Mit freundlichen Grüßen<br>
    <strong>Lukas Schmitz</strong><br>
    Gründer, einfach verwaltet.<br>
    <a href="mailto:lukas@einfach-verwaltet.de" style="color: #0f172a;">lukas@einfach-verwaltet.de</a>
  </p>
  
  <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 32px 0;">
  
  <p style="font-size: 13px; color: #666;">
    einfach verwaltet. | Singapurstr. 19 | 20457 Hamburg<br>
    <a href="https://einfach-verwaltet.de" style="color: #666;">einfach-verwaltet.de</a> | 
    <a href="https://einfach-verwaltet.de/datenschutz" style="color: #666;">Datenschutz</a> | 
    <a href="https://einfach-verwaltet.de/impressum" style="color: #666;">Impressum</a>
  </p>
  
</body>
</html>`,
  },

  // Email 3: Day 4 - Case study (fictional)
  casestudy: {
    subject: "Wie Familie Hoffmann aus Hamburg ihren Hausverwaltungs-Stress losgeworden ist",
    html: (lead: any) => `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wie Familie Hoffmann ihren Stress loswurde</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 20px;">
  
  <p style="font-size: 16px;">Hallo ${lead.name || "da"},</p>
  
  <p style="font-size: 16px;">manchmal hilft eine Geschichte, um zu verstehen, was wir anders machen. Diese hier ist fiktiv, aber sie basiert auf Dutzenden Gesprächen, die wir mit Eigentümern geführt haben.</p>
  
  <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 28px 0;">
  
  <h2 style="font-size: 20px; font-weight: 600; margin-bottom: 16px; color: #0f172a;">Die Geschichte der Familie Hoffmann</h2>
  
  <p style="font-size: 16px; margin-bottom: 16px;"><strong>Die Ausgangslage:</strong> Familie Hoffmann besitzt drei Mehrfamilienhäuser in Hamburg-Barmbek — insgesamt 24 Wohneinheiten. Seit acht Jahren betreut sie eine traditionelle Hausverwaltung. "Es läuft schon", dachten sie. Bis es nicht mehr lief.</p>
  
  <p style="font-size: 16px; margin-bottom: 16px;"><strong>Der Wendepunkt:</strong> Ein Wasserschaden im Dachgeschoss. Der Mieter rief an — niemand meldete sich zurück. Nach drei Tagen war der Schaden auf drei Wohnungen ausgeweitet. Die Handwerkerorganisation der Verwaltung dauerte weitere fünf Tage. Am Ende: 12.000 € Schaden, die die Haftpflicht der Verwaltung nicht vollständig deckte.</p>
  
  <p style="font-size: 16px; margin-bottom: 16px;"><strong>Die Suche:</strong> Familie Hoffmann beschloss zu wechseln. Aber wohin? Die meisten Verwaltungen sahen auf den ersten Blick gleich aus — ähnliche Websites, ähnliche Versprechen. Preise? Mussten sie erst anfragen. Antwortzeiten? Unbekannt.</p>
  
  <p style="font-size: 16px; margin-bottom: 16px;"><strong>Die Entscheidung:</strong> Sie fanden uns über eine Empfehlung. Was überzeugte sie: transparente Preise auf der Website, eine klare Antwortzeit-Garantie (unter 15 Minuten bei Dringlichem), und ein Dokumentenportal, über das sie jederzeit Zugriff auf alle Verträge und Protokolle haben.</p>
  
  <p style="font-size: 16px; margin-bottom: 16px;"><strong>Das Ergebnis nach sechs Monaten:</strong> Keine einzige Eskalation. Drei kleine Wartungsfälle, alle innerhalb von 24 Stunden gelöst. Familie Hoffmann schaut etwa einmal pro Woche ins Portal — sonst vergessen sie ihre Verwaltung einfach. So soll es sein.</p>
  
  <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 28px 0;">
  
  <p style="font-size: 14px; color: #666; font-style: italic; margin-bottom: 20px;">*Diese Geschichte ist eine fiktive Darstellung basierend auf typischen Erfahrungen von Eigentümern. Sie dient als Beispiel für die Art von Problemen, die wir lösen.</p>
  
  <p style="font-size: 16px; margin-bottom: 16px;">Klingt das nach etwas, das auch Ihnen helfen könnte? Wir würden uns freuen, mit Ihnen zu sprechen.</p>
  
  <p style="font-size: 16px; margin: 24px 0;">
    <a href="https://einfach-verwaltet.de/anfrage" style="background-color: #0f172a; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 500;">Gespräch vereinbaren →</a>
  </p>
  
  <p style="font-size: 16px; margin-top: 32px;">
    Mit freundlichen Grüßen<br>
    <strong>Lukas Schmitz</strong><br>
    Gründer, einfach verwaltet.
  </p>
  
  <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 32px 0;">
  
  <p style="font-size: 13px; color: #666;">
    einfach verwaltet. | Singapurstr. 19 | 20457 Hamburg<br>
    <a href="https://einfach-verwaltet.de" style="color: #666;">einfach-verwaltet.de</a> | 
    <a href="https://einfach-verwaltet.de/datenschutz" style="color: #666;">Datenschutz</a> | 
    <a href="https://einfach-verwaltet.de/impressum" style="color: #666;">Impressum</a>
  </p>
  
</body>
</html>`,
  },

  // Email 4: Day 7 - Pricing transparency
  pricing: {
    subject: "Warum wir unsere Preise öffentlich zeigen (und andere nicht)",
    html: (lead: any) => `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Warum wir unsere Preise zeigen</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 20px;">
  
  <p style="font-size: 16px;">Hallo ${lead.name || "da"},</p>
  
  <p style="font-size: 16px;">eine Sache, die mich bei der Suche nach einer Hausverwaltung immer gestört hat: <strong>Preise waren ein Geheimnis.</strong></p>
  
  <p style="font-size: 16px;">Auf den Websites: "Individuelles Angebot". "Kontaktieren Sie uns". "Wir beraten Sie gerne". Übersetzt: Wir wollen erst wissen, wie viel Sie haben, bevor wir Ihnen sagen, was es kostet.</p>
  
  <p style="font-size: 16px;">Das ist nicht böse. Das ist Branchenstandard. Aber es ist auch nicht transparent.</p>
  
  <h2 style="font-size: 18px; font-weight: 600; margin-top: 28px; margin-bottom: 12px; color: #0f172a;">Warum wir anders machen</h2>
  
  <p style="font-size: 16px; margin-bottom: 16px;"><strong>1. Sie wissen sofort, ob wir passen.</strong> Keine Zeitverschwendung auf beiden Seiten. Wenn unser Preismodell nicht zu Ihren Erwartungen passt, finden Sie das vor dem ersten Gespräch heraus.</p>
  
  <p style="font-size: 16px; margin-bottom: 16px;"><strong>2. Vertrauen beginnt mit Offenheit.</strong> Wir verwalten Ihre Immobilien — oft Ihr größtes Vermögen. Wenn wir schon beim Preis nicht transparent sind, wie sollten Sie uns bei wichtigeren Dingen vertrauen?</p>
  
  <p style="font-size: 16px; margin-bottom: 16px;"><strong>3. Keine Überraschungen später.</strong> Was Sie auf unserer Preisseite sehen, ist was Sie zahlen. Keine versteckten Gebühren für "Sonderaufgaben", keine Aufschläge für "Systemnutzung".</p>
  
  <h2 style="font-size: 18px; font-weight: 600; margin-top: 28px; margin-bottom: 12px; color: #0f172a;">Unsere Preise</h2>
  
  <p style="font-size: 16px; margin-bottom: 16px;">Wir berechnen <strong>24–34 € pro Einheit und Monat</strong> — je nach Umfang und Objektgröße. Für Wohnungseigentümergemeinschaften (WEG) gibt es separate Konditionen.</p>
  
  <p style="font-size: 16px; margin-bottom: 16px;">Das beinhaltet: Mieterkommunikation, Mietzahlungsüberwachung, Mahnwesen bis zur Zahlungsklage, Dokumentenmanagement, Jahresabrechnungsvorbereitung, 24/7-Notfallhotline für Mieter.</p>
  
  <p style="font-size: 16px; margin: 24px 0;">
    <a href="https://einfach-verwaltet.de/preise" style="background-color: #0f172a; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 500;">Preise im Detail →</a>
  </p>
  
  <p style="font-size: 16px;">Transparente Preise. Klare Leistungen. Keine Überraschungen.</p>
  
  <p style="font-size: 16px; margin-top: 32px;">
    Mit freundlichen Grüßen<br>
    <strong>Lukas Schmitz</strong><br>
    Gründer, einfach verwaltet.
  </p>
  
  <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 32px 0;">
  
  <p style="font-size: 13px; color: #666;">
    einfach verwaltet. | Singapurstr. 19 | 20457 Hamburg<br>
    <a href="https://einfach-verwaltet.de" style="color: #666;">einfach-verwaltet.de</a> | 
    <a href="https://einfach-verwaltet.de/datenschutz" style="color: #666;">Datenschutz</a> | 
    <a href="https://einfach-verwaltet.de/impressum" style="color: #666;">Impressum</a>
  </p>
  
</body>
</html>`,
  },

  // Email 5: Day 14 - Last chance / Beta offer
  beta: {
    subject: "Letzte Chance: 50% Rabatt für unsere ersten 5 Kunden (Beta-Programm)",
    html: (lead: any) => `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Beta-Programm - 50% Rabatt</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 20px;">
  
  <p style="font-size: 16px;">Hallo ${lead.name || "da"},</p>
  
  <p style="font-size: 16px;">vor zwei Wochen haben Sie sich bei uns gemeldet. Vielleicht war es gerade viel los, vielleicht wollten Sie erst einmal schauen, was wir so machen.</p>
  
  <p style="font-size: 16px;">Das ist völlig in Ordnung. Aber wir wollten Ihnen eine Chance nicht vorenthalten:</p>
  
  <div style="background-color: #f8fafc; border-left: 4px solid #0f172a; padding: 20px; margin: 24px 0;">
    <h2 style="font-size: 18px; font-weight: 600; margin-top: 0; margin-bottom: 12px; color: #0f172a;">Unser Beta-Programm</h2>
    <p style="font-size: 16px; margin-bottom: 12px;"><strong>50% Rabatt auf die ersten 3 Monate</strong> für die ersten 5 Kunden, die bei uns unterschreiben.</p>
    <p style="font-size: 16px; margin-bottom: 12px;">Was wir von Ihnen erwarten: Nach 6 Monaten ein kurzes, ehrliches Gespräch über Ihre Erfahrung — das wir als Testimonial nutzen dürfen (natürlich nur mit Ihrer Zustimmung).</p>
    <p style="font-size: 16px; margin-bottom: 0;">Was Sie bekommen: Premium-Service zum halben Preis, direkter Draht zu mir persönlich, und die Gewissheit, dass Ihre Immobilien in den besten Händen sind.</p>
  </div>
  
  <p style="font-size: 16px;">Warum machen wir das? Weil wir neu sind und Vertrauen aufbauen müssen. Die ersten Kunden sind für uns Gold wert — nicht nur wirtschaftlich, sondern als Referenz.</p>
  
  <p style="font-size: 16px;"><strong>Die Plätze sind begrenzt.</strong> Wenn Sie Interesse haben, melden Sie sich einfach auf unserer Beta-Seite:</p>
  
  <p style="font-size: 16px; margin: 24px 0;">
    <a href="https://einfach-verwaltet.de/beta" style="background-color: #0f172a; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 500;">Zum Beta-Programm →</a>
  </p>
  
  <p style="font-size: 16px;">Kein Druck. Wenn jetzt nicht der richtige Zeitpunkt ist, verstehen wir das. Aber die 50% bleiben nur für die ersten 5 Kunden.</p>
  
  <p style="font-size: 16px; margin-top: 32px;">
    Mit freundlichen Grüßen<br>
    <strong>Lukas Schmitz</strong><br>
    Gründer, einfach verwaltet.
  </p>
  
  <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 32px 0;">
  
  <p style="font-size: 13px; color: #666;">
    einfach verwaltet. | Singapurstr. 19 | 20457 Hamburg<br>
    <a href="https://einfach-verwaltet.de" style="color: #666;">einfach-verwaltet.de</a> | 
    <a href="https://einfach-verwaltet.de/datenschutz" style="color: #666;">Datenschutz</a> | 
    <a href="https://einfach-verwaltet.de/impressum" style="color: #666;">Impressum</a>
  </p>
  
</body>
</html>`,
  },
};

// Main drip campaign function
export const dripCampaign = inngest.createFunction(
  { 
    id: "drip-campaign", 
    name: "Lead Nurture Drip Campaign",
    concurrency: 10,
  },
  { event: "lead/submitted" },
  async ({ event, step }) => {
    const lead = event.data;
    
    // Ensure lead has required fields
    if (!lead.email) {
      return { error: "Lead missing email address", leadId: lead.id };
    }

    // Email 1: Day 0 - Welcome (immediate, but this is handled by lead.intake)
    // We skip this here since lead.intake already sends the welcome email
    
    // Email 2: Day 2 - Value content (5 mistakes)
    await step.sleep("wait-2-days", "2d");
    
    await step.run("send-email-2-mistakes", async () => {
      if (!process.env.RESEND_API_KEY) {
        return { skipped: true, reason: "RESEND_API_KEY not configured" };
      }
      
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      
      const template = emailTemplates.mistakes;
      
      await resend.emails.send({
        from: "lukas@einfach-verwaltet.de",
        to: lead.email,
        subject: template.subject,
        html: template.html(lead),
      });
      
      return { sent: true, email: "mistakes", to: lead.email };
    });
    
    // Email 3: Day 4 - Case study (2 days after email 2)
    await step.sleep("wait-2-more-days", "2d");
    
    await step.run("send-email-3-casestudy", async () => {
      if (!process.env.RESEND_API_KEY) {
        return { skipped: true, reason: "RESEND_API_KEY not configured" };
      }
      
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      
      const template = emailTemplates.casestudy;
      
      await resend.emails.send({
        from: "lukas@einfach-verwaltet.de",
        to: lead.email,
        subject: template.subject,
        html: template.html(lead),
      });
      
      return { sent: true, email: "casestudy", to: lead.email };
    });
    
    // Email 4: Day 7 - Pricing transparency (3 days after email 3)
    await step.sleep("wait-3-more-days", "3d");
    
    await step.run("send-email-4-pricing", async () => {
      if (!process.env.RESEND_API_KEY) {
        return { skipped: true, reason: "RESEND_API_KEY not configured" };
      }
      
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      
      const template = emailTemplates.pricing;
      
      await resend.emails.send({
        from: "lukas@einfach-verwaltet.de",
        to: lead.email,
        subject: template.subject,
        html: template.html(lead),
      });
      
      return { sent: true, email: "pricing", to: lead.email };
    });
    
    // Email 5: Day 14 - Beta offer (7 days after email 4)
    await step.sleep("wait-7-more-days", "7d");
    
    await step.run("send-email-5-beta", async () => {
      if (!process.env.RESEND_API_KEY) {
        return { skipped: true, reason: "RESEND_API_KEY not configured" };
      }
      
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      
      const template = emailTemplates.beta;
      
      await resend.emails.send({
        from: "lukas@einfach-verwaltet.de",
        to: lead.email,
        subject: template.subject,
        html: template.html(lead),
      });
      
      return { sent: true, email: "beta", to: lead.email };
    });
    
    return { 
      leadId: lead.id, 
      email: lead.email,
      campaign: "5-part-drip",
      completed: true 
    };
  }
);
