"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { OnboardingShell } from "../components/OnboardingShell";

export default function OnboardingStep1() {
  const router = useRouter();
  const [selected, setSelected] = useState<"privat" | "profi" | null>(null);

  const handleSelect = (type: "privat" | "profi") => {
    setSelected(type);
    // Auto-advance after 300ms — user sees confirmation, then moves on
    setTimeout(() => {
      router.push(`/portal/onboarding/${type}/schritt-2`);
    }, 300);
  };

  return (
    <OnboardingShell>
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-navy mb-3">Wie verwalten Sie Ihre Immobilien?</h1>
        <p className="text-text-light">Wir passen Ihr Setup genau auf Sie an.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <SelectionCard
          selected={selected === "privat"}
          onClick={() => handleSelect("privat")}
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          }
          title="Privatvermieter"
          subtitle="1–10 Einheiten"
          perks={["In 10 Minuten startklar", "Keine Vorkenntnisse nötig", "Automatische Mieterkorrespondenz"]}
        />
        <SelectionCard
          selected={selected === "profi"}
          onClick={() => handleSelect("profi")}
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          }
          title="Professioneller Verwalter"
          subtitle="10+ Einheiten oder WEG"
          perks={["Portfolio-Import (CSV)", "Team-Zugang", "WEG & Mietverwaltung"]}
        />
      </div>

      <p className="text-center mt-8 text-sm text-text-light">
        Bereits registriert?{" "}
        <a href="/portal/login" className="text-teal font-medium hover:underline">Hier anmelden</a>
      </p>
    </OnboardingShell>
  );
}

function SelectionCard({
  selected, onClick, icon, title, subtitle, perks,
}: {
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  perks: string[];
}) {
  return (
    <button
      onClick={onClick}
      className={`relative w-full text-left p-7 rounded-2xl border-2 transition-all duration-200 cursor-pointer
        ${selected
          ? "border-teal bg-teal/5 shadow-lg scale-[1.02]"
          : "border-gray-200 bg-white hover:border-teal/40 hover:shadow-md"
        }`}
    >
      {/* Checkmark */}
      <div className={`absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200
        ${selected ? "bg-teal opacity-100 scale-100" : "opacity-0 scale-75"}`}>
        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      {/* Icon */}
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-colors duration-200
        ${selected ? "bg-teal text-white" : "bg-navy/8 text-navy"}`}>
        {icon}
      </div>

      <h3 className="font-bold text-xl text-navy mb-1">{title}</h3>
      <p className="text-sm text-text-light mb-4">{subtitle}</p>

      <ul className="space-y-2">
        {perks.map((p) => (
          <li key={p} className="flex items-center gap-2 text-sm text-text-main">
            <svg className="w-4 h-4 text-teal flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            {p}
          </li>
        ))}
      </ul>
    </button>
  );
}
