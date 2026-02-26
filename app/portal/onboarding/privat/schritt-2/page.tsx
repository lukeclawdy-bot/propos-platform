"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { OnboardingShell } from "../../../components/OnboardingShell";

export default function Schritt2() {
  const router = useRouter();
  const [form, setForm] = useState({ strasse: "", plz: "", stadt: "", einheiten: "", typ: "" });

  const isValid = form.strasse && form.plz && form.einheiten && form.typ;

  const handleTyp = (typ: string) => {
    setForm((f) => ({ ...f, typ }));
    // Auto-advance only if all other fields are filled
    if (form.strasse && form.plz && form.einheiten) {
      setTimeout(() => router.push("/portal/onboarding/privat/schritt-3"), 300);
    }
  };

  const einheitenOptions = ["1", "2", "3", "4", "5", "6–10", "Mehr als 10"];
  const typOptions = [
    { value: "miet", label: "Mietverwaltung", desc: "Vermietete Wohnungen" },
    { value: "weg", label: "WEG", desc: "Eigentümergemeinschaft" },
    { value: "sev", label: "Sondereigentum (SEV)", desc: "Einzelne Einheit in WEG" },
  ];

  return (
    <OnboardingShell>
      <h1 className="text-2xl font-bold text-navy mb-2">Ihre Immobilie</h1>
      <p className="text-text-light mb-8">Wo liegt Ihr Objekt und wie ist es strukturiert?</p>

      <div className="space-y-5">
        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-navy mb-1.5">Straße & Hausnummer</label>
          <input
            type="text"
            value={form.strasse}
            onChange={(e) => setForm((f) => ({ ...f, strasse: e.target.value }))}
            placeholder="Musterstraße 42"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none text-navy transition-all"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">PLZ</label>
            <input
              type="text"
              value={form.plz}
              onChange={(e) => setForm((f) => ({ ...f, plz: e.target.value }))}
              placeholder="20459"
              maxLength={5}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none text-navy transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">Stadt</label>
            <input
              type="text"
              value={form.stadt}
              onChange={(e) => setForm((f) => ({ ...f, stadt: e.target.value }))}
              placeholder="Hamburg"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none text-navy transition-all"
            />
          </div>
        </div>

        {/* Einheiten */}
        <div>
          <label className="block text-sm font-medium text-navy mb-2">Anzahl Wohneinheiten</label>
          <div className="flex flex-wrap gap-2">
            {einheitenOptions.map((o) => (
              <button
                key={o}
                onClick={() => setForm((f) => ({ ...f, einheiten: o }))}
                className={`px-4 py-2.5 rounded-xl border-2 text-sm font-medium transition-all duration-150
                  ${form.einheiten === o ? "border-teal bg-teal text-white" : "border-gray-200 bg-white text-navy hover:border-teal/40"}`}
              >
                {o}
              </button>
            ))}
          </div>
        </div>

        {/* Verwaltungstyp — auto-advance on select */}
        <div>
          <label className="block text-sm font-medium text-navy mb-2">Art der Verwaltung</label>
          <div className="space-y-2">
            {typOptions.map((o) => (
              <button
                key={o.value}
                onClick={() => handleTyp(o.value)}
                className={`w-full flex items-center justify-between px-5 py-3.5 rounded-xl border-2 text-left transition-all duration-150
                  ${form.typ === o.value ? "border-teal bg-teal/5" : "border-gray-200 bg-white hover:border-teal/40"}`}
              >
                <div>
                  <span className="font-medium text-navy">{o.label}</span>
                  <span className="text-xs text-text-light block">{o.desc}</span>
                </div>
                {form.typ === o.value && (
                  <svg className="w-5 h-5 text-teal flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Manual continue fallback */}
        {isValid && (
          <button
            onClick={() => router.push("/portal/onboarding/privat/schritt-3")}
            className="w-full bg-navy text-white py-4 rounded-xl font-semibold hover:bg-teal transition-colors"
          >
            Weiter →
          </button>
        )}
      </div>
    </OnboardingShell>
  );
}
