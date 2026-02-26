"use client";

import { useRouter } from "next/navigation";
import { OnboardingShell } from "../../../components/OnboardingShell";

const importOptions = [
  { value: "csv", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>, label: "CSV-Import", desc: "Mieter & Objekte aus Tabelle importieren" },
  { value: "manual", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>, label: "Manuell eingeben", desc: "Objekte einzeln anlegen" },
  { value: "later", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, label: "Später einrichten", desc: "Zunächst Dashboard freischalten" },
];

export default function ProfiSchritt4() {
  const router = useRouter();

  return (
    <OnboardingShell>
      <h1 className="text-2xl font-bold text-navy mb-2">Daten importieren</h1>
      <p className="text-text-light mb-8">Wie möchten Sie Ihre Objekte und Mieter einrichten?</p>

      <div className="space-y-3">
        {importOptions.map(o => (
          <button key={o.value} onClick={() => setTimeout(() => router.push("/portal/onboarding/profi/schritt-5"), 300)}
            className="w-full flex items-center gap-4 px-6 py-5 rounded-2xl border-2 border-gray-200 bg-white text-left
              hover:border-teal hover:bg-teal/5 hover:shadow-md active:scale-[0.99] transition-all duration-150 group">
            <div className="w-10 h-10 rounded-xl bg-navy/8 text-navy flex items-center justify-center flex-shrink-0 group-hover:bg-teal group-hover:text-white transition-colors">
              {o.icon}
            </div>
            <div>
              <p className="font-semibold text-navy group-hover:text-teal transition-colors">{o.label}</p>
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
