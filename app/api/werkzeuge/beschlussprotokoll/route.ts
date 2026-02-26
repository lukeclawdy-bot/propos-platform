import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tops, datum, ort, verwalter, anwesend, beschlussfaehig, vorsitzender } = body;

    if (!tops || !datum) {
      return NextResponse.json({ error: 'TOPs und Datum erforderlich' }, { status: 400 });
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json({ error: 'KI nicht konfiguriert' }, { status: 503 });
    }

    const topsText = tops.map((t: { nr: string; titel: string; beschlusstext: string; ergebnis: string; ja: number; nein: number; enthalten: number }, i: number) =>
      `TOP ${i + 1}: ${t.titel}\nBeschlussantrag: ${t.beschlusstext}\nErgebnis: ${t.ergebnis} (Ja: ${t.ja}, Nein: ${t.nein}, Enthaltungen: ${t.enthalten})`
    ).join('\n\n');

    const prompt = `Erstelle ein rechtssicheres WEG-Beschlussprotokoll nach § 24 Abs. 6 WEG auf Deutsch.

Versammlungsdaten:
- Datum: ${datum}
- Ort: ${ort || 'nicht angegeben'}
- Verwalter: ${verwalter || 'einfach verwaltet.'}
- Vorsitzender: ${vorsitzender || 'Verwalter'}
- Anwesend/vertreten: ${anwesend || 'nicht angegeben'} Miteigentumsanteile
- Beschlussfähigkeit: ${beschlussfaehig ? 'JA — festgestellt nach § 25 Abs. 3 WEG' : 'NEIN — nicht beschlussfähig'}

Tagesordnungspunkte:
${topsText}

Erstelle ein vollständiges, professionelles Protokoll mit:
1. Kopfzeile (Art der Versammlung, Datum, Ort, Beginn)
2. Anwesenheitsfeststellung und Beschlussfähigkeit
3. Für jeden TOP: Sachvortrag, Abstimmung, Beschluss im Wortlaut (fettgedruckt markiert mit **...**)
4. Schlussteil mit Unterschriftenzeile für Vorsitzenden und Protokollführer
5. Hinweis auf Anfechtungsfrist (§ 44 WEG: 1 Monat)

Sprache: Formelles Deutsch, juristisch präzise. Keine Abkürzungen außer gesetzlich üblich.`;

    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://einfach-verwaltet.de',
        'X-Title': 'einfach verwaltet. — WEG Beschlussprotokoll Generator',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await res.json();
    const protokoll = data.choices?.[0]?.message?.content;

    if (!protokoll) {
      return NextResponse.json({ error: 'KI-Generierung fehlgeschlagen' }, { status: 500 });
    }

    return NextResponse.json({ protokoll });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
