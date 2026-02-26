"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { OnboardingShell } from "../../../components/OnboardingShell";

export default function ProfiSchritt3() {
  const router = useRouter();
  const [objekte, setObjekte] = useState("");
  const [einheiten, setEinheiten] = useState("");
  const [staedte, setStaedte] = useState("");

  const einheitenOptions = ["10–25", "26–50", "51–100", "101–200", "200+"];

  const handleEinheiten = (val: string) => {
    setEinheiten(val);
    if (objekte && staedte) {
      setTimeout(() => router.push("/portal/onboarding/profi/schritt-4"), 300);
    }
  };

  const canContinue = objekte && einheiten && staedte;

  return (
    <OnboardingShell>
      <h1 className="text-2xl font-bold text-navy mb-2">Ihr Portfolio</h1>
      <p className="text-text-light mb-8">Überblick über Ihren Immobilienbestand.</p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-navy mb-1.5">Anzahl Objekte (Gebäude)</label>
          <input type="number" min={1} value={objekte} onChange={e => setObjekte(e.target.value)}
            placeholder="z.B. 8"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none text-navy" />
        </div>

        <div>
          <label className="block text-sm font-medium text-navy mb-2">Gesamtanzahl Einheiten</label>
          <div className="flex flex-wrap gap-2">
            {einheitenOptions.map(o => (
              <button key={o} onClick={() => handleEinheiten(o)}
                className={`px-4 py-2.5 rounded-xl border-2 text-sm font-medium transition-all duration-150
                  ${einheiten === o ? "border-teal bg-teal text-white" : "border-gray-200 bg-white text-navy hover:border-teal/40"}`}>
                {o}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-navy mb-1.5">Städte / Regionen</label>
          <input type="text" value={staedte} onChange={e => setStaedte(e.target.value)}
            placeholder="z.B. Hamburg, Berlin"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none text-navy" />
        </div>

        {canContinue && (
          <button onClick={() => router.push("/portal/onboarding/profi/schritt-4")}
            className="w-full bg-teal text-white py-4 rounded-xl font-semibold hover:bg-navy transition-colors">
            Weiter →
          </button>
        )}
      </div>
    </OnboardingShell>
  );
}
