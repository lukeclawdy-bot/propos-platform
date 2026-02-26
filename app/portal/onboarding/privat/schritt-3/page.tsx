"use client";

import { useRouter } from "next/navigation";
import { OnboardingShell } from "../../../components/OnboardingShell";

const options = [
  {
    value: "gut",
    emoji: "✅",
    title: "Alles läuft gut",
    desc: "Ich will die Verwaltung einfach einfacher machen",
  },
  {
    value: "probleme",
    emoji: "⚠️",
    title: "Ich habe offene Probleme",
    desc: "Streitigkeiten, Reparaturen oder unbezahlte Miete",
  },
  {
    value: "neu",
    emoji: "🆕",
    title: "Ich bin neu als Vermieter",
    desc: "Erste Erfahrungen, ich brauche Orientierung",
  },
];

export default function Schritt3() {
  const router = useRouter();

  const handleSelect = (value: string) => {
    // Pure auto-advance — no Weiter button needed for single-choice
    setTimeout(() => router.push(`/portal/onboarding/privat/schritt-4?situation=${value}`), 300);
  };

  return (
    <OnboardingShell>
      <h1 className="text-2xl font-bold text-navy mb-2">Wie ist Ihre aktuelle Situation?</h1>
      <p className="text-text-light mb-8">Damit wir die richtigen ersten Schritte vorschlagen können.</p>

      <div className="space-y-3">
        {options.map((o) => (
          <button
            key={o.value}
            onClick={() => handleSelect(o.value)}
            className="w-full flex items-center gap-5 px-6 py-5 rounded-2xl border-2 border-gray-200 bg-white text-left
              hover:border-teal hover:bg-teal/5 hover:shadow-md active:scale-[0.99] transition-all duration-150 group"
          >
            <span className="text-3xl">{o.emoji}</span>
            <div>
              <p className="font-semibold text-navy group-hover:text-teal transition-colors">{o.title}</p>
              <p className="text-sm text-text-light">{o.desc}</p>
            </div>
            <svg className="w-5 h-5 text-gray-300 group-hover:text-teal ml-auto flex-shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ))}
      </div>
    </OnboardingShell>
  );
}
