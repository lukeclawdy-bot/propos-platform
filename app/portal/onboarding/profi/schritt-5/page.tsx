"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { OnboardingShell } from "../../../components/OnboardingShell";

const autonomyOptions = [
  { value: "supervised", title: "Beobachten & freigeben", desc: "KI schlägt vor, ich entscheide — volle Kontrolle", badge: "Empfohlen" },
  { value: "semi-auto", title: "Halbautomatisch", desc: "KI handelt bei Standardvorgängen selbst, wichtige Entscheidungen landen bei mir" },
  { value: "full-auto", title: "Vollautomatisch", desc: "KI übernimmt alle Routineaufgaben — ich werde nur bei Eskalationen informiert" },
];

export default function ProfiSchritt5() {
  const router = useRouter();
  const [selected, setSelected] = useState("");

  const handleSelect = (val: string) => {
    setSelected(val);
    setTimeout(() => router.push("/portal/onboarding/profi/schritt-6"), 300);
  };

  return (
    <OnboardingShell>
      <h1 className="text-2xl font-bold text-navy mb-2">KI-Automatisierungsgrad</h1>
      <p className="text-text-light mb-8">Wie viel soll das System eigenständig erledigen?</p>

      <div className="space-y-3">
        {autonomyOptions.map(o => (
          <button key={o.value} onClick={() => handleSelect(o.value)}
            className={`w-full text-left px-6 py-5 rounded-2xl border-2 transition-all duration-150
              ${selected === o.value ? "border-teal bg-teal/5" : "border-gray-200 bg-white hover:border-teal/40 hover:shadow-md"}`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-navy">{o.title}</p>
                <p className="text-sm text-text-light mt-0.5">{o.desc}</p>
              </div>
              {o.badge && (
                <span className="text-xs bg-teal text-white px-2 py-0.5 rounded-full ml-3 flex-shrink-0">{o.badge}</span>
              )}
            </div>
          </button>
        ))}
      </div>
    </OnboardingShell>
  );
}
