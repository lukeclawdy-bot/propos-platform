import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

interface BeschlussItem {
  tagesordnungspunkt: string;
  beschluss: string;
  abstimmung: {
    ja: number;
    nein: number;
    enthaltung: number;
  };
  ergebnis: 'angenommen' | 'abgelehnt';
}

interface ProtokollRequest {
  gemeinschaft: string;
  adresse: string;
  datum: string;
  uhrzeit: string;
  ort: string;
  verwalter: string;
  vorsitzender: string;
  anwesende: string;
  gesamtmiteigentuemer: number;
  vertreteneAnteile: number;
  gesamtanteile: number;
  tagesordnung: BeschlussItem[];
  sonstiges?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: ProtokollRequest = await req.json();

    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: 'AI nicht verfügbar' },
        { status: 503 }
      );
    }

    const beschlusspunkte = body.tagesordnung
      .map((top, i) => {
        const gesamt = top.abstimmung.ja + top.abstimmung.nein + top.abstimmung.enthaltung;
        return `TOP ${i + 1}: ${top.tagesordnungspunkt}
Beschluss: ${top.beschluss}
Abstimmung: ${top.abstimmung.ja} Ja / ${top.abstimmung.nein} Nein / ${top.abstimmung.enthaltung} Enthaltung (von ${gesamt} anwesenden Stimmen)
Ergebnis: ${top.ergebnis === 'angenommen' ? 'ANGENOMMEN' : 'ABGELEHNT'}`;
      })
      .join('\n\n');

    const beschlussfaehigkeit = (body.vertreteneAnteile / body.gesamtanteile) * 100;
    const isBeschlussfaehig = beschlussfaehigkeit > 50;

    const prompt = `Du bist ein erfahrener WEG-Verwalter. Erstelle ein rechtssicheres Beschlussprotokoll für die folgende Eigentümerversammlung. Das Protokoll muss den Anforderungen des WEG (§ 24 WEG) entsprechen.

VERSAMMLUNGSDATEN:
- Wohnungseigentümergemeinschaft: ${body.gemeinschaft}
- Anschrift: ${body.adresse}
- Datum: ${body.datum}
- Uhrzeit: ${body.uhrzeit} Uhr
- Ort: ${body.ort}
- Versammlungsleiter/Vorsitzender: ${body.vorsitzender}
- Verwalter: ${body.verwalter}
- Anwesende Eigentümer: ${body.anwesende}
- Gesamtzahl der Miteigentümer: ${body.gesamtmiteigentuemer}
- Vertretene Miteigentumsanteile: ${body.vertreteneAnteile} von ${body.gesamtanteile} (= ${beschlussfaehigkeit.toFixed(1)}%)
- Beschlussfähigkeit: ${isBeschlussfaehig ? 'JA (Mehrheit vertreten)' : 'NEIN (weniger als 50% vertreten — Versammlung trotzdem beschlussfähig nach § 25 Abs. 4 WEG n.F.)'}

TAGESORDNUNG & BESCHLÜSSE:
${beschlusspunkte}

${body.sonstiges ? `SONSTIGES: ${body.sonstiges}` : ''}

Erstelle ein vollständiges, professionelles Beschlussprotokoll auf Deutsch. Struktur:
1. Kopfzeile mit allen Versammlungsdaten
2. Feststellung der Beschlussfähigkeit
3. Genehmigung der Tagesordnung
4. Für jeden TOP: formelle Beschlussfassung mit Wortlaut und Abstimmungsergebnis
5. Schluss der Versammlung
6. Unterschriftenzeilen für Versammlungsleiter und Protokollführer

Verwende formelle, rechtssichere Sprache. Beschlüsse im Indikativ formulieren.`;

    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://einfach-verwaltet.de',
        'X-Title': 'einfach verwaltet. — Beschlussprotokoll Generator',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content:
              'Du bist ein spezialisierter WEG-Verwalter mit 20 Jahren Erfahrung. Du erstellst rechtssichere Beschlussprotokolle nach WEG n.F. (Reform 2020). Deine Protokolle sind professionell, vollständig und gerichtsfest.',
          },
          { role: 'user', content: prompt },
        ],
        max_tokens: 3000,
      }),
    });

    const data = await res.json();
    const protokoll =
      data.choices?.[0]?.message?.content ||
      'Protokoll konnte nicht erstellt werden.';

    return NextResponse.json({ protokoll });
  } catch (e) {
    console.error('Beschlussprotokoll error:', e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
