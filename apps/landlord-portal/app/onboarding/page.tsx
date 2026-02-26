"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import StepIndicator from "./components/StepIndicator";

export default function OnboardingPage() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<"private" | "professional" | null>(null);
  const currentStep = 1;
  const totalSteps = 7;

  const handleContinue = () => {
    if (selectedType) {
      // Store selection and proceed to next step
      // In real implementation: save to onboarding session
      router.push(`/onboarding/step-2?type=${selectedType}`);
    }
  };

  return (
    <div className="min-h-screen bg-warm-white flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-border px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-navy rounded-lg flex items-center justify-center">
              <span className="text-white font-serif text-xl font-bold">e</span>
            </div>
            <span className="font-serif text-xl text-navy font-semibold">
              einfach verwaltet.
            </span>
          </div>
          <div className="text-sm text-text-muted">
            Schritt {currentStep} von {totalSteps}
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-2xl w-full">
          {/* Welcome Message */}
          <div className="text-center mb-10">
            <h1 className="font-serif text-4xl md:text-5xl text-navy font-bold mb-4">
              Willkommen bei PropOS
            </h1>
            <p className="text-lg text-text-muted max-w-lg mx-auto">
              Ihre persönliche KI-gestützte Immobilienverwaltung. 
              Lassen Sie uns Ihr perfektes Setup finden.
            </p>
          </div>

          {/* Type Selection Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {/* Private Landlord Card */}
            <button
              onClick={() => setSelectedType("private")}
              className={`group relative p-8 rounded-2xl border-2 text-left transition-all duration-200 ${
                selectedType === "private"
                  ? "border-teal bg-teal/5 shadow-lg"
                  : "border-border bg-white hover:border-teal/50 hover:shadow-md"
              }`}
            >
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-colors ${
                  selectedType === "private" ? "bg-teal" : "bg-navy/10 group-hover:bg-teal/20"
                }`}
              >
                <svg
                  className={`w-7 h-7 ${selectedType === "private" ? "text-white" : "text-navy"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-semibold text-navy mb-2">
                Ich bin Privatvermieter
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                1–5 Einheiten, selbst verwaltet. Sie möchten Zeit sparen 
                und die KI übernimmt Routineaufgaben.
              </p>
              {selectedType === "private" && (
                <div className="absolute top-4 right-4">
                  <div className="w-6 h-6 bg-teal rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              )}
            </button>

            {/* Professional Card */}
            <button
              onClick={() => setSelectedType("professional")}
              className={`group relative p-8 rounded-2xl border-2 text-left transition-all duration-200 ${
                selectedType === "professional"
                  ? "border-teal bg-teal/5 shadow-lg"
                  : "border-border bg-white hover:border-teal/50 hover:shadow-md"
              }`}
            >
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-colors ${
                  selectedType === "professional" ? "bg-teal" : "bg-navy/10 group-hover:bg-teal/20"
                }`}
              >
                <svg
                  className={`w-7 h-7 ${selectedType === "professional" ? "text-white" : "text-navy"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-semibold text-navy mb-2">
                Ich bin professioneller Verwalter
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                20–200+ Einheiten, WEG oder Mietverwaltung. 
                Sie brauchen ein skalierbares System für Ihr Portfolio.
              </p>
              {selectedType === "professional" && (
                <div className="absolute top-4 right-4">
                  <div className="w-6 h-6 bg-teal rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              )}
            </button>
          </div>

          {/* Continue Button */}
          <div className="flex justify-center">
            <button
              onClick={handleContinue}
              disabled={!selectedType}
              className={`px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
                selectedType
                  ? "bg-teal text-white hover:bg-teal-dark shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Weiter
              <svg
                className="inline-block ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Skip Option */}
          <p className="text-center mt-6 text-sm text-text-light">
            Bereits registriert?{" "}
            <a href="/login" className="text-teal hover:underline font-medium">
              Hier anmelden
            </a>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-border px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between text-sm text-text-muted">
          <span>© 2026 einfach verwaltet.</span>
          <div className="flex gap-6">
            <a href="/datenschutz" className="hover:text-navy transition-colors">
              Datenschutz
            </a>
            <a href="/impressum" className="hover:text-navy transition-colors">
              Impressum
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}