"use client";

import { useState } from "react";

const betaOwners = [
  {
    quote: "14 Einheiten, Hamburg-Altona — seit 3 Wochen dabei",
    initial: "M.H.",
  },
  {
    quote: "8 Einheiten, Eimsbüttel — Wechsel läuft reibungslos",
    initial: "K.W.",
  },
];

const totalSpots = 5;
const takenSpots = 2;
const remainingSpots = totalSpots - takenSpots;

export function BetaUrgency() {
  return (
    <section className="bg-amber/10 border-y border-amber/30 py-14 px-6">
      <div className="max-w-[1100px] mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Left: urgency copy */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-amber text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              Beta-Programm läuft
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-3">
              Nur noch {remainingSpots} Beta-Plätze verfügbar
            </h2>
            <p className="text-text-light mb-6 max-w-md mx-auto lg:mx-0">
              {takenSpots} von {totalSpots} Eigentümern sind bereits dabei. Testen Sie einfach verwaltet. zu reduzierten Beta-Konditionen und gestalten Sie das Produkt mit.
            </p>
            {/* Spots bar */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="flex gap-1.5">
                  {Array.from({ length: totalSpots }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-3 w-8 rounded-full transition-all ${
                        i < takenSpots ? "bg-amber" : "bg-amber/20"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-text-light font-medium">{takenSpots}/{totalSpots} vergeben</span>
              </div>
            </div>
            <a
              href="/beta"
              className="inline-flex items-center gap-2 bg-amber hover:bg-amber/90 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Jetzt Beta-Platz sichern →
            </a>
          </div>

          {/* Right: testimonial snippets */}
          <div className="flex-1 w-full max-w-sm lg:max-w-none">
            <div className="grid gap-4">
              {betaOwners.map((owner) => (
                <div
                  key={owner.initial}
                  className="bg-white border border-amber/20 rounded-2xl px-5 py-4 flex items-start gap-4 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-full bg-navy text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {owner.initial}
                  </div>
                  <div>
                    <p className="text-navy font-medium text-sm leading-relaxed">
                      &ldquo;{owner.quote}&rdquo;
                    </p>
                    <p className="text-text-light text-xs mt-1">Beta-Eigentümer</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
