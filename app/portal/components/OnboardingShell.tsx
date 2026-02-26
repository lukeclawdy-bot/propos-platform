"use client";

import { usePathname } from "next/navigation";

const STEPS = [
  "/portal/onboarding",
  "/portal/onboarding/privat/schritt-2",
  "/portal/onboarding/privat/schritt-3",
  "/portal/onboarding/privat/schritt-4",
  "/portal/onboarding/privat/schritt-5",
  "/portal/onboarding/privat/schritt-6",
  "/portal/onboarding/privat/schritt-7",
];

export function OnboardingShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const current = STEPS.indexOf(pathname) + 1 || 1;
  const total = 7;
  const pct = Math.round((current / total) * 100);

  return (
    <div className="min-h-screen bg-warm-white flex flex-col">
      {/* Top bar */}
      <header className="fixed top-0 w-full z-50 bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-navy rounded-md flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <span className="font-bold text-navy text-sm">einfach <span className="text-teal">verwaltet.</span></span>
          </a>
          <span className="text-xs text-text-light font-medium">Schritt {current} von {total}</span>
        </div>
        {/* Progress bar */}
        <div className="h-0.5 bg-gray-100">
          <div
            className="h-full bg-teal transition-all duration-500 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 pt-20 pb-10">
        <div className="max-w-2xl w-full">
          {children}
        </div>
      </main>

      <footer className="py-4 text-center text-xs text-text-light">
        <a href="/datenschutz" className="hover:text-navy mx-3">Datenschutz</a>
        <a href="/impressum" className="hover:text-navy mx-3">Impressum</a>
      </footer>
    </div>
  );
}
