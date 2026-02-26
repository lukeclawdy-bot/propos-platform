"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { OnboardingShell } from "../../../components/OnboardingShell";

export default function Schritt4() {
  const router = useRouter();
  const [mieter, setMieter] = useState<string>("");
  const [probleme, setProbleme] = useState<boolean | null>(null);
  const [beschreibung, setBeschreibung] = useState("");

  const mieterOptions = ["1", "2", "3", "4", "5", "6–10", "Mehr als 10"];

  const handleMieter = (val: string) => {
    setMieter(val);
    // If no problems already selected, wait for that choice
  };

  const handleProbleme = (val: boolean) => {
    setProbleme(val);
    if (!val) {
      // No problems → auto advance
      setTimeout(() => router.push("/portal/onboarding/privat/schritt-5"), 300);
    }
  };

  const canContinue = mieter && probleme !== null && (!probleme || beschreibung.length > 5);

  return (
    <OnboardingShell>
      <h1 className="text-2xl font-bold text-navy mb-2">Ihre Mieter</h1>
      <p className="text-text-light mb-8">Kurze Bestandsaufnahme — dauert 30 Sekunden.</p>

      <div className="space-y-6">
        {/* Mieteranzahl */}
        <div>
          <label className="block text-sm font-medium text-navy mb-2">Wie viele Mieter haben Sie aktuell?</label>
          <div className="flex flex-wrap gap-2">
            {mieterOptions.map((o) => (
              <button
                key={o}
                onClick={() => handleMieter(o)}
                className={`px-4 py-2.5 rounded-xl border-2 text-sm font-medium transition-all duration-150
                  ${mieter === o ? "border-teal bg-teal text-white" : "border-gray-200 bg-white text-navy hover:border-teal/40"}`}
              >
                {o}
              </button>
            ))}
          </div>
        </div>

        {/* Probleme */}
        {mieter && (
          <div>
            <label className="block text-sm font-medium text-navy mb-2">Gibt es offene Probleme mit Mietern?</label>
            <div className="grid grid-cols-2 gap-3">
              {[{ val: false, label: "Nein, alles gut ✅" }, { val: true, label: "Ja, es gibt Probleme ⚠️" }].map((o) => (
                <button
                  key={String(o.val)}
                  onClick={() => handleProbleme(o.val)}
                  className={`px-4 py-3.5 rounded-xl border-2 text-sm font-medium text-center transition-all duration-150
                    ${probleme === o.val ? "border-teal bg-teal/5 text-teal" : "border-gray-200 bg-white text-navy hover:border-teal/40"}`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Problembeschreibung */}
        {probleme === true && (
          <div>
            <label className="block text-sm font-medium text-navy mb-2">Kurze Beschreibung</label>
            <textarea
              value={beschreibung}
              onChange={(e) => setBeschreibung(e.target.value)}
              placeholder="z.B. Mieter zahlt seit 2 Monaten nicht..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none text-navy resize-none transition-all"
            />
            <button
              onClick={() => canContinue && router.push("/portal/onboarding/privat/schritt-5")}
              disabled={!canContinue}
              className={`mt-3 w-full py-3.5 rounded-xl font-semibold transition-all
                ${canContinue ? "bg-navy text-white hover:bg-teal" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
            >
              Weiter →
            </button>
          </div>
        )}

        {/* Optional doc upload */}
        <div className="border border-dashed border-gray-200 rounded-xl p-5 text-center">
          <p className="text-sm text-text-light mb-2">Mietvertrag hochladen <span className="text-xs">(optional — können Sie später nachholen)</span></p>
          <label className="inline-block cursor-pointer text-teal text-sm font-medium hover:underline">
            Datei auswählen
            <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
          </label>
        </div>
      </div>
    </OnboardingShell>
  );
}
