"use client";

import { useState } from "react";
import { HouseLogoIcon } from "./Icons";

export function Navbar() {
  const [toolsOpen, setToolsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-warm-white/95 backdrop-blur-sm border-b border-navy/8">
      <div className="max-w-[1100px] mx-auto px-6 py-4 flex justify-between items-center">
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-navy rounded-lg flex items-center justify-center group-hover:bg-teal transition-colors">
            <HouseLogoIcon className="w-[18px] h-[18px] text-white" />
          </div>
          <span className="font-bold text-xl text-navy tracking-tight">
            einfach <span className="text-teal">verwaltet.</span>
          </span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          <a href="/leistungen" className="text-text-light hover:text-navy text-sm font-medium transition-colors">Leistungen</a>
          <a href="/preise" className="text-text-light hover:text-navy text-sm font-medium transition-colors">Preise</a>
          <a href="/blog" className="text-text-light hover:text-navy text-sm font-medium transition-colors">Ratgeber</a>

          {/* Werkzeuge Dropdown */}
          <div className="relative">
            <button
              onClick={() => setToolsOpen(!toolsOpen)}
              onBlur={() => setTimeout(() => setToolsOpen(false), 150)}
              className="text-text-light hover:text-navy text-sm font-medium transition-colors flex items-center gap-1"
            >
              Werkzeuge
              <svg className={`w-4 h-4 transition-transform ${toolsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {toolsOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                <a href="/bka-rechner" className="block px-4 py-2.5 text-sm text-navy hover:bg-teal/5 hover:text-teal transition-colors">
                  <span className="font-medium">BKA-Rechner</span>
                  <span className="block text-xs text-text-light">Betriebskosten nach §2 BetrKV</span>
                </a>
                <a href="/mieterhohung-rechner" className="block px-4 py-2.5 text-sm text-navy hover:bg-teal/5 hover:text-teal transition-colors">
                  <span className="font-medium">Mieterhöhungsrechner</span>
                  <span className="block text-xs text-text-light">§ 558 BGB berechnen</span>
                </a>
              </div>
            )}
          </div>

          <a href="/kontakt" className="text-text-light hover:text-navy text-sm font-medium transition-colors">Kontakt</a>
          <a href="/anfrage" className="bg-teal text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-navy transition-colors">
            Angebot anfragen
          </a>
        </div>
      </div>
    </nav>
  );
}