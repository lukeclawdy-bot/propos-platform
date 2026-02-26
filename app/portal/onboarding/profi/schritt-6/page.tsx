"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { OnboardingShell } from "../../../components/OnboardingShell";

export default function ProfiSchritt6() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    router.push("/portal/onboarding/privat/schritt-7"); // reuse success screen
  };

  return (
    <OnboardingShell>
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-teal/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <svg className="w-8 h-8 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-navy mb-2">Fast fertig!</h1>
        <p className="text-text-light">Erstellen Sie Ihren professionellen Zugang.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6 text-sm">
        <div className="flex justify-between py-2 border-b border-gray-50">
          <span className="text-text-light">Kontotyp</span>
          <span className="font-medium text-navy">Professioneller Verwalter</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-text-light">Preis</span>
          <span className="font-medium text-teal">auf Anfrage (ab €24/Einheit/Monat)</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-navy mb-1.5">Geschäftliche E-Mail-Adresse</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="name@unternehmen.de" required autoFocus
            className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none text-navy text-base" />
        </div>
        <button type="submit" disabled={!email || loading}
          className={`w-full py-4 rounded-xl font-semibold text-lg transition-all
            ${email && !loading ? "bg-teal text-white hover:bg-navy" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}>
          {loading ? "Zugang wird eingerichtet..." : "Professionellen Zugang erstellen →"}
        </button>
        <p className="text-center text-xs text-text-light">
          Nach der Registrierung vereinbaren wir ein kostenloses Onboarding-Gespräch.
        </p>
      </form>
    </OnboardingShell>
  );
}
