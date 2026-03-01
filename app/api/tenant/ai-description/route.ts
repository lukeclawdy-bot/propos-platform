export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";

// POST /api/tenant/ai-description
// Generates a 2-3 sentence German damage description from wizard answers
// Uses OpenRouter Gemini 2.5 Flash; falls back to template generation if no key

interface AiDescriptionRequest {
  category: string;
  answers: Record<string, string>;
  photoCount: number;
}

const CATEGORY_LABELS: Record<string, string> = {
  heating: "Heizung & Warmwasser",
  water: "Wasser & Abwasser",
  electric: "Elektro & Licht",
  window: "Fenster & Türen",
  mold: "Schimmel & Feuchtigkeit",
  other: "Sonstiges",
};

function buildPrompt(category: string, answers: Record<string, string>, photoCount: number): string {
  const catLabel = CATEGORY_LABELS[category] ?? category;
  const answerText = Object.entries(answers)
    .filter(([, v]) => v && v.trim())
    .map(([k, v]) => `- ${k}: ${v}`)
    .join("\n");

  return [
    `Du bist Assistent einer deutschen Hausverwaltung.`,
    `Erstelle eine präzise Schadensmeldung auf Deutsch (2-3 Sätze) basierend auf:`,
    ``,
    `Kategorie: ${catLabel}`,
    `Angaben des Mieters:`,
    answerText || "(keine weiteren Angaben)",
    photoCount > 0 ? `Fotos beigefügt: ${photoCount}` : "Keine Fotos beigefügt.",
    ``,
    `Schreibe sachlich, vollständig und ohne Füllwörter. Keine Anrede, keine Grußformel. Nur die Beschreibung.`,
  ].join("\n");
}

function templateFallback(category: string, answers: Record<string, string>, photoCount: number): string {
  const catLabel = CATEGORY_LABELS[category] ?? category;
  const answerLines = Object.entries(answers)
    .filter(([, v]) => v && v.trim())
    .map(([, v]) => v.trim())
    .join("; ");

  const parts: string[] = [];
  parts.push(`Der Mieter meldet einen Schaden im Bereich ${catLabel}.`);

  if (answerLines) {
    parts.push(`Details: ${answerLines}.`);
  }

  if (photoCount > 0) {
    parts.push(`Es wurden ${photoCount} Foto${photoCount > 1 ? "s" : ""} beigefügt.`);
  } else {
    parts.push("Es wurden keine Fotos hochgeladen.");
  }

  return parts.join(" ");
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  let body: AiDescriptionRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { category = "other", answers = {}, photoCount = 0 } = body;

  const apiKey = process.env.OPENROUTER_API_KEY;

  if (apiKey) {
    try {
      const prompt = buildPrompt(category, answers, photoCount);

      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://einfach-verwaltet.de",
          "X-Title": "einfach verwaltet.",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash-preview-05-20",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 300,
          temperature: 0.3,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const description = data.choices?.[0]?.message?.content?.trim();
        if (description) {
          return NextResponse.json({ description });
        }
      }
    } catch (err) {
      console.error("[ai-description] OpenRouter error:", err);
    }
  }

  // Fallback — template-based description
  const description = templateFallback(category, answers, photoCount);
  return NextResponse.json({ description });
}
