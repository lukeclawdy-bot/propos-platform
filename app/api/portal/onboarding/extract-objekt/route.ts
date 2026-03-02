export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";

// POST /api/portal/onboarding/extract-objekt
// Body: { files: Array<{ name: string, type: string, dataUrl: string }> }
// Returns: { extracted: ExtractedObjektData, confidence: Record<string, number> }
// No auth required (pre-login flow), rate-limited: 5 req/IP/10min

// ─── Types ────────────────────────────────────────────────────────────────────
export interface ExtractedUnit {
  whgNr: string;
  etage: number;
  zimmer: number;
  flaeche: number;
  kaltmiete: number;
  nkVorauszahlung: number;
}

export interface ExtractedObjektData {
  strasse: string | null;
  hausnummer: string | null;
  plz: string | null;
  stadt: string | null;
  immobilientyp: "MFH" | "EFH" | "Gewerbe" | null;
  baujahr: number | null;
  gesamtflaeche: number | null;
  energieausweis: "A+" | "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | null;
  einheiten: ExtractedUnit[];
  confidence: Record<string, number>;
}

// ─── Simple in-memory rate limiter ────────────────────────────────────────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now >= entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT) {
    return false;
  }

  entry.count++;
  return true;
}

// ─── Gemini Extraction Prompt ─────────────────────────────────────────────────
const EXTRACT_PROMPT = `Du bist ein Datenextraktions-Assistent für eine deutsche Hausverwaltung.
Analysiere dieses Dokument und extrahiere folgende Immobiliendaten als JSON.
Fehlende Werte → null. Confidence 0-100 pro Feld.

Antworte NUR mit validem JSON, ohne Markdown-Codeblöcke, ohne Erklärungen.

{
  "strasse": string|null,
  "hausnummer": string|null,
  "plz": string|null,
  "stadt": string|null,
  "immobilientyp": "MFH"|"EFH"|"Gewerbe"|null,
  "baujahr": number|null,
  "gesamtflaeche": number|null,
  "energieausweis": "A+"|"A"|"B"|"C"|"D"|"E"|"F"|"G"|"H"|null,
  "einheiten": [{ "whgNr": string, "etage": number, "zimmer": number, "flaeche": number, "kaltmiete": number, "nkVorauszahlung": number }],
  "confidence": { "strasse": 0, "hausnummer": 0, "plz": 0, "stadt": 0, "immobilientyp": 0, "baujahr": 0, "gesamtflaeche": 0, "energieausweis": 0 }
}

Hinweise:
- MFH = Mehrfamilienhaus (≥3 Wohneinheiten), EFH = Einfamilienhaus / Zweifamilienhaus, Gewerbe = gewerbliche Nutzung
- Confidence: 90-100 = explizit im Dokument genannt, 60-89 = mit hoher Wahrscheinlichkeit, 30-59 = Schätzung, 0-29 = nicht gefunden
- Für Einheiten: nur erfassen wenn konkrete Daten vorhanden (mind. Wohnungsnummer oder Fläche)`;

// ─── Call OpenRouter / Gemini for one file ─────────────────────────────────────
async function extractFromFile(
  file: { name: string; type: string; dataUrl: string },
  apiKey: string
): Promise<ExtractedObjektData> {
  const isImage = file.type.startsWith("image/");

  // Strip the data URL prefix to get raw base64
  const base64Match = file.dataUrl.match(/^data:[^;]+;base64,(.+)$/);
  const base64Data = base64Match ? base64Match[1] : file.dataUrl;

  let messageContent: unknown;

  if (isImage) {
    // Vision: pass image as image_url
    messageContent = [
      {
        type: "text",
        text: EXTRACT_PROMPT,
      },
      {
        type: "image_url",
        image_url: {
          url: file.dataUrl, // pass the full data URL for vision
        },
      },
    ];
  } else {
    // PDF: pass as base64 text content — Gemini handles PDF via base64
    messageContent = [
      {
        type: "text",
        text: `${EXTRACT_PROMPT}\n\nDokument (${file.name}, base64-kodiert):\n${base64Data}`,
      },
    ];
  }

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://einfach-verwaltet.de",
      "X-Title": "einfach verwaltet.",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [
        {
          role: "user",
          content: messageContent,
        },
      ],
      max_tokens: 1500,
      temperature: 0.1,
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`OpenRouter error ${res.status}: ${errText.slice(0, 200)}`);
  }

  const result = await res.json();
  const raw = result.choices?.[0]?.message?.content?.trim() ?? "";

  // Strip any markdown fences
  const jsonStr = raw
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();

  const parsed = JSON.parse(jsonStr) as ExtractedObjektData;
  return parsed;
}

// ─── Merge results from multiple files ────────────────────────────────────────
function mergeExtractions(results: ExtractedObjektData[]): ExtractedObjektData {
  if (results.length === 0) {
    return {
      strasse: null,
      hausnummer: null,
      plz: null,
      stadt: null,
      immobilientyp: null,
      baujahr: null,
      gesamtflaeche: null,
      energieausweis: null,
      einheiten: [],
      confidence: {},
    };
  }

  if (results.length === 1) return results[0];

  const fields: (keyof Omit<ExtractedObjektData, "einheiten" | "confidence">)[] = [
    "strasse",
    "hausnummer",
    "plz",
    "stadt",
    "immobilientyp",
    "baujahr",
    "gesamtflaeche",
    "energieausweis",
  ];

  const merged: ExtractedObjektData = {
    strasse: null,
    hausnummer: null,
    plz: null,
    stadt: null,
    immobilientyp: null,
    baujahr: null,
    gesamtflaeche: null,
    energieausweis: null,
    einheiten: [],
    confidence: {},
  };

  // Per field: take the value with the highest confidence
  for (const field of fields) {
    let bestValue: ExtractedObjektData[typeof field] = null;
    let bestConfidence = -1;

    for (const r of results) {
      const conf = r.confidence?.[field] ?? 0;
      if (conf > bestConfidence && r[field] !== null && r[field] !== undefined) {
        bestConfidence = conf;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        bestValue = r[field] as any;
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (merged as any)[field] = bestValue;
    merged.confidence[field] = Math.max(0, bestConfidence);
  }

  // Merge einheiten: collect all unique units from all results
  const allUnits: ExtractedUnit[] = [];
  const seenWhgNr = new Set<string>();
  for (const r of results) {
    for (const unit of r.einheiten ?? []) {
      if (unit.whgNr && !seenWhgNr.has(unit.whgNr)) {
        seenWhgNr.add(unit.whgNr);
        allUnits.push(unit);
      } else if (!unit.whgNr) {
        allUnits.push(unit);
      }
    }
  }
  merged.einheiten = allUnits;

  return merged;
}

// ─── Handler ──────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest): Promise<NextResponse> {
  // Rate limiting by IP
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Zu viele Anfragen. Bitte in 10 Minuten erneut versuchen." },
      { status: 429 }
    );
  }

  // Parse body
  let files: Array<{ name: string; type: string; dataUrl: string }>;
  try {
    const body = await req.json();
    files = body.files;
    if (!Array.isArray(files) || files.length === 0) {
      return NextResponse.json({ error: "Keine Dateien übermittelt." }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  // Validate files
  if (files.length > 5) {
    return NextResponse.json({ error: "Maximal 5 Dateien erlaubt." }, { status: 400 });
  }

  for (const f of files) {
    if (!f.name || !f.type || !f.dataUrl) {
      return NextResponse.json({ error: "Ungültiges Dateiformat." }, { status: 400 });
    }
    // Rough size check: base64 ~= 4/3 of binary, 10MB * 4/3 ≈ 13.3MB chars
    if (f.dataUrl.length > 14_000_000) {
      return NextResponse.json(
        { error: `Datei "${f.name}" ist zu groß (max. 10 MB).` },
        { status: 400 }
      );
    }
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    console.error("[extract-objekt] OPENROUTER_API_KEY not configured");
    return NextResponse.json(
      { error: "KI-Extraktion momentan nicht verfügbar." },
      { status: 503 }
    );
  }

  // Extract from each file
  const results: ExtractedObjektData[] = [];
  const errors: string[] = [];

  for (const file of files) {
    try {
      const extracted = await extractFromFile(file, apiKey);
      results.push(extracted);
    } catch (err) {
      console.error(`[extract-objekt] Error processing ${file.name}:`, err);
      errors.push(file.name);
    }
  }

  if (results.length === 0) {
    return NextResponse.json(
      {
        error:
          "Die KI konnte keine Daten aus den Dokumenten extrahieren. Bitte prüfen Sie die Dateien oder geben Sie die Daten manuell ein.",
      },
      { status: 422 }
    );
  }

  const merged = mergeExtractions(results);

  return NextResponse.json({
    extracted: merged,
    confidence: merged.confidence,
    warnings:
      errors.length > 0
        ? `${errors.length} Datei(en) konnten nicht verarbeitet werden: ${errors.join(", ")}`
        : undefined,
  });
}
