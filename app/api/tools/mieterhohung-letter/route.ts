import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

interface MieterhohungRequest {
  tenantName: string;
  address: string;
  currentRent: number; // in cents
  newRent: number; // in cents
  increaseAmount: number; // in cents
  increasePercent: number;
  referenzmiete: number; // in cents
  effectiveDate: string; // YYYY-MM-DD
  isMilieuSchutz?: boolean;
  city?: string;
  landlordName?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: MieterhohungRequest = await req.json();

    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: 'AI-Service nicht verfügbar' },
        { status: 503 }
      );
    }

    // Validate required fields
    if (!body.tenantName || !body.address || !body.currentRent || !body.newRent) {
      return NextResponse.json(
        { error: 'Fehlende Pflichtfelder' },
        { status: 400 }
      );
    }

    const formatEuro = (cents: number) => (cents / 100).toLocaleString('de-DE', { 
      style: 'currency', 
      currency: 'EUR' 
    });

    const effectiveDateFormatted = new Date(body.effectiveDate).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    const kappungsgrenze = body.isMilieuSchutz ? '15%' : '20%';
    const kappungszeitraum = '3 Jahre';

    const prompt = `Erstelle ein formelles Mieterhöhungsverlangen nach § 558 BGB (in Verbindung mit § 558a BGB).

ABSENDER (Vermieter/Hausverwaltung):
${body.landlordName || 'einfach verwaltet. GmbH'}
Singapurstr. 19
20457 Hamburg

EMPÄNGER (Mieter):
${body.tenantName}
${body.address}

MIETERHÖHUNGSDATEN:
- Aktuelle Kaltmiete: ${formatEuro(body.currentRent)}
- Neue Kaltmiete: ${formatEuro(body.newRent)}
- Erhöhungsbetrag: ${formatEuro(body.increaseAmount)}
- Erhöhung in Prozent: ${body.increasePercent.toFixed(2)}%
- Referenzmiete (ortsübliche Vergleichsmiete): ${formatEuro(body.referenzmiete)}
- Wirksamkeitsdatum: ${effectiveDateFormatted}
- Kappungsgrenze: ${kappungsgrenze} in ${kappungszeitraum} (${body.isMilieuSchutz ? 'Milieuschutzgebiet nach § 557 Abs. 4 BGB' : '§ 558 Abs. 3 BGB'})

Das Mieterhöhungsverlangen muss folgende Anforderungen erfüllen:
1. Deutliche Erklärung nach § 558 Abs. 1 BGB (eindeutiges Erhöhungsverlangen)
2. Zustimmungsfiktion gemäß § 558b BGB (Zustimmung gilt als erteilt, wenn nicht innerhalb 2 Monaten seit Zugang widersprochen)
3. Rechtliche Grundlagen: § 558 BGB, § 558a BGB (Begründung), § 557a BGB (Staffelmietverträge), § 557b BGB (Indexmiete)
4. Erklärung zur Kappungsgrenze (§ 558 Abs. 3 BGB): Erhöhung über 20% in 3 Jahren nicht zulässig (bzw. 15% in Milieuschutzgebieten)
5. Formvorschriften beachten: Schriftform, eindeutige Bezeichnung der Mietsache

Verwende einen höflichen, aber formellen und rechtssicheren Ton. Das Schreiben soll gerichtsfest sein.

Struktur des Briefes:
1. Absender mit Kontaktdaten
2. Datum
3. Empfängeradresse
4. Betreff: "Mieterhöhungsverlangen gemäß § 558 BGB"
5. Einleitung mit Hinweis auf Mietverhältnis
6. Begründung der Erhöhung (Vergleichsmiete, Erhöhungsbetrag)
7. Rechtliche Hinweise (Kappungsgrenze, Zustimmungsfiktion)
8. Wirksamkeitsdatum
9. Höflicher Schluss
10. Hinweis auf Widerspruchsmöglichkeit und Erklärung zur Zustimmungsfiktion

Das Schreiben soll professionell und verständlich sein.`;

    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://einfach-verwaltet.de',
        'X-Title': 'einfach verwaltet. — Mieterhöhungsverlangen Generator',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: 'Du bist ein erfahrener Rechtsanwalt für Mietrecht mit 20 Jahren Erfahrung. Du erstellst rechtssichere Mieterhöhungsverlangen nach § 558 BGB. Deine Schreiben sind gerichtsfest, professionell und höflich.',
          },
          { role: 'user', content: prompt },
        ],
        max_tokens: 2500,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error('OpenRouter error:', error);
      return NextResponse.json(
        { error: 'Fehler bei der KI-Generierung' },
        { status: 500 }
      );
    }

    const data = await res.json();
    const letter =
      data.choices?.[0]?.message?.content ||
      'Das Mieterhöhungsverlangen konnte nicht erstellt werden.';

    return NextResponse.json({ letter });
  } catch (e) {
    console.error('Mieterhohung letter error:', e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
