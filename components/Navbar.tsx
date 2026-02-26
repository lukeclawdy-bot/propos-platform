"use client";

import { useState } from "react";
import { HouseLogoIcon } from "./Icons";

// Primary nav — max 5 items to prevent wrapping
const navLinks = [
  { href: "/leistungen", label: "Leistungen" },
  { href: "/preise", label: "Preise" },
  { href: "/blog", label: "Ratgeber" },
];

const werkzeuge = [
  { href: "/bka-rechner", label: "BKA-Rechner", sub: "Betriebskosten nach §2 BetrKV" },
  { href: "/mieterhohung-rechner", label: "Mieterhöhungsrechner", sub: "§ 558 BGB berechnen" },
  { href: "/werkzeuge/beschlussprotokoll", label: "Beschlussprotokoll", sub: "WEG-Protokoll per KI erstellen" },
];

const mehr = [
  { href: "/hausverwaltung-hamburg", label: "Hamburg", sub: "Hausverwaltung Hamburg" },
  { href: "/hausverwaltung-berlin", label: "Berlin", sub: "Hausverwaltung Berlin" },
  { href: "/weg-verwaltung", label: "WEG-Verwaltung", sub: "Eigentümergemeinschaft ab €22/Einheit" },
  { href: "/kontakt", label: "Kontakt", sub: "Schreiben Sie uns" },
  { href: "/nachfolge", label: "Nachfolge", sub: "Für Verwalter im Ruhestand" },
];

export function Navbar() {
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mehrOpen, setMehrOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const [mobileMehrOpen, setMobileMehrOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-warm-white/95 backdrop-blur-sm border-b border-navy/8">
      <div className="max-w-[1100px] mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group flex-shrink-0">
          <div className="w-8 h-8 bg-navy rounded-lg flex items-center justify-center group-hover:bg-teal transition-colors">
            <HouseLogoIcon className="w-[18px] h-[18px] text-white" />
          </div>
          <span className="font-bold text-xl text-navy tracking-tight whitespace-nowrap">
            einfach <span className="text-teal">verwaltet.</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href}
              className="text-text-light hover:text-navy text-sm font-medium transition-colors whitespace-nowrap">
              {l.label}
            </a>
          ))}

          {/* Werkzeuge dropdown */}
          <div className="relative">
            <button
              onClick={() => { setToolsOpen(!toolsOpen); setMehrOpen(false); }}
              onBlur={() => setTimeout(() => setToolsOpen(false), 150)}
              className="text-text-light hover:text-navy text-sm font-medium transition-colors flex items-center gap-1 whitespace-nowrap"
            >
              Werkzeuge
              <svg className={`w-4 h-4 transition-transform ${toolsOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {toolsOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                {werkzeuge.map((w) => (
                  <a key={w.href} href={w.href} className="block px-4 py-2.5 text-sm text-navy hover:bg-teal/5 hover:text-teal transition-colors">
                    <span className="font-medium">{w.label}</span>
                    <span className="block text-xs text-text-light">{w.sub}</span>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Mehr dropdown */}
          <div className="relative">
            <button
              onClick={() => { setMehrOpen(!mehrOpen); setToolsOpen(false); }}
              onBlur={() => setTimeout(() => setMehrOpen(false), 150)}
              className="text-text-light hover:text-navy text-sm font-medium transition-colors flex items-center gap-1 whitespace-nowrap"
            >
              Mehr
              <svg className={`w-4 h-4 transition-transform ${mehrOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {mehrOpen && (
              <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                {mehr.map((w) => (
                  <a key={w.href} href={w.href} className="block px-4 py-2.5 text-sm text-navy hover:bg-teal/5 hover:text-teal transition-colors">
                    <span className="font-medium">{w.label}</span>
                    <span className="block text-xs text-text-light">{w.sub}</span>
                  </a>
                ))}
              </div>
            )}
          </div>

          <a href="/anfrage"
            className="bg-teal text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-navy transition-colors whitespace-nowrap ml-2">
            Angebot anfragen
          </a>
        </div>

        {/* Mobile: CTA + burger */}
        <div className="flex md:hidden items-center gap-3">
          <a href="/anfrage" className="bg-teal text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-navy transition-colors whitespace-nowrap">
            Angebot
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-navy/5 transition-colors"
            aria-label="Menü"
          >
            <span className={`block w-5 h-0.5 bg-navy transition-all duration-200 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-navy transition-all duration-200 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-navy transition-all duration-200 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-navy/8 bg-warm-white/98 backdrop-blur-sm">
          <div className="px-6 py-4 space-y-1">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
                className="block py-3 text-navy font-medium border-b border-gray-100 hover:text-teal transition-colors">
                {l.label}
              </a>
            ))}

            {/* Werkzeuge accordion */}
            <button onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
              className="w-full flex justify-between items-center py-3 text-navy font-medium border-b border-gray-100 hover:text-teal transition-colors">
              Werkzeuge
              <svg className={`w-4 h-4 transition-transform ${mobileToolsOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {mobileToolsOpen && (
              <div className="pl-4 space-y-1 pb-1">
                {werkzeuge.map((w) => (
                  <a key={w.href} href={w.href} onClick={() => setMobileOpen(false)}
                    className="block py-2.5 text-sm text-navy hover:text-teal transition-colors">
                    <span className="font-medium">{w.label}</span>
                    <span className="block text-xs text-text-light">{w.sub}</span>
                  </a>
                ))}
              </div>
            )}

            {/* Mehr accordion */}
            <button onClick={() => setMobileMehrOpen(!mobileMehrOpen)}
              className="w-full flex justify-between items-center py-3 text-navy font-medium border-b border-gray-100 hover:text-teal transition-colors">
              Mehr
              <svg className={`w-4 h-4 transition-transform ${mobileMehrOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {mobileMehrOpen && (
              <div className="pl-4 space-y-1 pb-1">
                {mehr.map((w) => (
                  <a key={w.href} href={w.href} onClick={() => setMobileOpen(false)}
                    className="block py-2.5 text-sm text-navy hover:text-teal transition-colors">
                    <span className="font-medium">{w.label}</span>
                    <span className="block text-xs text-text-light">{w.sub}</span>
                  </a>
                ))}
              </div>
            )}

            <div className="pt-3">
              <a href="/anfrage" onClick={() => setMobileOpen(false)}
                className="block w-full text-center bg-navy text-white py-3.5 rounded-xl font-semibold hover:bg-teal transition-colors">
                Angebot in 2 Minuten →
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
