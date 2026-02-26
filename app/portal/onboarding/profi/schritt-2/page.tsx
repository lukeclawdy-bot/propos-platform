"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { OnboardingShell } from "../../../components/OnboardingShell";

export default function ProfiSchritt2() {
  const router = useRouter();
  const [form, setForm] = useState({ firma: "", vorname: "", nachname: "", rolle: "" });

  const rollen = ["Eigentümer", "Hausverwalter", "Wohnungsgesellschaft", "Family Office", "Sonstiges"];

  const handleRolle = (rolle: string) => {
    setForm(f => ({ ...f, rolle }));
    if (form.firma && form.vorname) {
      setTimeout(() => router.push("/portal/onboarding/profi/schritt-3"), 300);
    }
  };

  const canContinue = form.firma && form.vorname && form.rolle;

  return (
    <OnboardingShell>
      <h1 className="text-2xl font-bold text-navy mb-2">Ihre Unternehmensdaten</h1>
      <p className="text-text-light mb-8">Damit wir Ihr Portfolio richtig einrichten können.</p>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-navy mb-1.5">Firmenname / Gesellschaft</label>
          <input type="text" value={form.firma} onChange={e => setForm(f => ({ ...f, firma: e.target.value }))}
            placeholder="Mustermann Immobilien GmbH"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none text-navy" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">Vorname</label>
            <input type="text" value={form.vorname} onChange={e => setForm(f => ({ ...f, vorname: e.target.value }))}
              placeholder="Max"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none text-navy" />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">Nachname</label>
            <input type="text" value={form.nachname} onChange={e => setForm(f => ({ ...f, nachname: e.target.value }))}
              placeholder="Mustermann"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none text-navy" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-navy mb-2">Ihre Rolle</label>
          <div className="grid grid-cols-2 gap-2">
            {rollen.map(r => (
              <button key={r} onClick={() => handleRolle(r)}
                className={`px-4 py-3 rounded-xl border-2 text-sm font-medium text-left transition-all duration-150
                  ${form.rolle === r ? "border-teal bg-teal/5 text-teal" : "border-gray-200 bg-white text-navy hover:border-teal/40"}`}>
                {r}
              </button>
            ))}
          </div>
        </div>

        {canContinue && (
          <button onClick={() => router.push("/portal/onboarding/profi/schritt-3")}
            className="w-full bg-teal text-white py-4 rounded-xl font-semibold hover:bg-navy transition-colors">
            Weiter →
          </button>
        )}
      </div>
    </OnboardingShell>
  );
}
