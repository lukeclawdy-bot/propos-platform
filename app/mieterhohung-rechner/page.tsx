"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

function CalculatorIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
  );
}

export default function MieterhohungRechnerPage() {
  const [currentRent, setCurrentRent] = useState<string>("");
  const [area, setArea] = useState<string>("");
  const [lastIncreaseDate, setLastIncreaseDate] = useState<string>("");
  const [neverIncreased, setNeverIncreased] = useState<boolean>(false);
  const [mietspiegel, setMietspiegel] = useState<string>("11.50");
  const [results, setResults] = useState<{
    ortsüblicheVergleichsmiete: number;
    maxIncreaseAmount: number;
    maxIncreasePercent: number;
    kappungsgrenze: number;
    kappungsgrenzePercent: number;
    kappungsgrenzeExceeded: boolean;
    nextPossibleDate: string;
    newMaxRent: number;
  } | null>(null);

  function calculate() {
    const rent = parseFloat(currentRent) || 0;
    const fläche = parseFloat(area) || 0;
    const spiegel = parseFloat(mietspiegel) || 0;

    // Ortsübliche Vergleichsmiete
    const ortsübliche = spiegel * fläche;

    // Maximum legal increase: min(10% of current rent, amount to reach local Mietspiegel)
    const tenPercentCap = rent * 0.10;
    const amountToReachSpiegel = Math.max(0, ortsübliche - rent);
    const maxIncreaseAmount = Math.min(tenPercentCap, amountToReachSpiegel);
    const maxIncreasePercent = rent > 0 ? (maxIncreaseAmount / rent) * 100 : 0;

    // Hamburg Kappungsgrenze: 15% in 3 years (Ballungsgebiete per §558 Abs. 3)
    const kappungsgrenzePercent = 15;
    const kappungsgrenze = rent * 0.15;
    const kappungsgrenzeExceeded = maxIncreaseAmount > kappungsgrenze;

    // Maximum legally allowable increase (lower of the two caps)
    const actualMaxIncrease = kappungsgrenzeExceeded ? kappungsgrenze : maxIncreaseAmount;
    const newMaxRent = rent + actualMaxIncrease;

    // Frühestes Datum der nächsten Mieterhöhung
    // §558a: 2 months notice + must be 15 months since last increase
    const today = new Date();
    let nextDate = new Date(today);
    nextDate.setMonth(nextDate.getMonth() + 2); // 2 months notice

    if (!neverIncreased && lastIncreaseDate) {
      const lastDate = new Date(lastIncreaseDate);
      const fifteenMonthsLater = new Date(lastDate);
      fifteenMonthsLater.setMonth(fifteenMonthsLater.getMonth() + 15);
      
      if (fifteenMonthsLater > nextDate) {
        nextDate = fifteenMonthsLater;
      }
    }

    // Format date as German format
    const nextPossibleDate = nextDate.toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    setResults({
      ortsüblicheVergleichsmiete: Math.round(ortsübliche * 100) / 100,
      maxIncreaseAmount: Math.round(actualMaxIncrease * 100) / 100,
      maxIncreasePercent: Math.round(maxIncreasePercent * 10) / 10,
      kappungsgrenze: Math.round(kappungsgrenze * 100) / 100,
      kappungsgrenzePercent,
      kappungsgrenzeExceeded,
      nextPossibleDate,
      newMaxRent: Math.round(newMaxRent * 100) / 100,
    });
  }

  function formatCurrency(value: number): string {
    return value.toLocaleString("de-DE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  return (
    <>
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <section className="py-12 lg:py-16 bg-navy text-white">
          <div className="max-w-[1100px] mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 bg-teal/20 rounded-full px-4 py-1.5 mb-6">
              <CalculatorIcon />
              <span className="text-teal text-sm font-semibold">Kostenloser Rechner</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 font-serif leading-tight">
              Mieterhöhung berechnen
              <br />
              <span className="text-teal">nach § 558 BGB</span>
            </h1>
            <p className="text-lg text-white/75 max-w-2xl mx-auto">
              Prüfen Sie, wie viel Sie Ihren Mietern rechtlich erlaubt erhöhen dürfen — mit Berücksichtigung der aktuellen Kappungsgrenzen für Hamburg.
            </p>
          </div>
        </section>

        {/* Calculator */}
        <section className="py-12 lg:py-16 bg-warm-white">
          <div className="max-w-[900px] mx-auto px-6">
            <div className="grid lg:grid-cols-[1fr_1fr] gap-8">
              {/* Input Form */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
                <h2 className="text-xl font-bold text-navy mb-6 font-serif">Ihre Angaben</h2>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5">
                      Aktuelle Kaltmiete (€/Monat)
                    </label>
                    <input
                      type="number"
                      value={currentRent}
                      onChange={(e) => setCurrentRent(e.target.value)}
                      placeholder="z.B. 850"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-navy text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5">
                      Wohnfläche (m²)
                    </label>
                    <input
                      type="number"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      placeholder="z.B. 75"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-navy text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5">
                      Datum der letzten Mieterhöhung
                    </label>
                    <div className="space-y-2">
                      <input
                        type="date"
                        value={lastIncreaseDate}
                        onChange={(e) => {
                          setLastIncreaseDate(e.target.value);
                          if (e.target.value) setNeverIncreased(false);
                        }}
                        disabled={neverIncreased}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-navy text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all disabled:bg-light-gray disabled:text-text-light"
                      />
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={neverIncreased}
                          onChange={(e) => {
                            setNeverIncreased(e.target.checked);
                            if (e.target.checked) setLastIncreaseDate("");
                          }}
                          className="w-4 h-4 rounded border-gray-300 text-teal focus:ring-teal cursor-pointer"
                        />
                        <span className="text-sm text-text-light">Noch nie erhöht (Neumietvertrag)</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5">
                      Lokaler Mietspiegel-Wert (€/m²)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={mietspiegel}
                      onChange={(e) => setMietspiegel(e.target.value)}
                      placeholder="z.B. 11.50"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-navy text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all"
                    />
                    <p className="text-xs text-text-light mt-1.5">
                      Voreingestellt: Hamburg-Durchschnitt 2023 (ca. €11,50/m²) — aktuellen Wert auf <a href="https://www.hamburg.de/mietspiegel/" target="_blank" rel="noopener noreferrer" className="text-teal hover:underline">hamburg.de</a> prüfen
                    </p>
                  </div>

                  <button
                    onClick={calculate}
                    disabled={!currentRent || !area}
                    className="w-full bg-teal text-white py-3.5 px-6 rounded-xl font-semibold text-base hover:bg-teal/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-md"
                  >
                    Berechnen →
                  </button>

                  <p className="text-xs text-text-light text-center">
                    Alle Berechnungen nach § 558 BGB
                  </p>
                </div>
              </div>

              {/* Results */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
                <h2 className="text-xl font-bold text-navy mb-6 font-serif">Ergebnis</h2>

                {!results ? (
                  <div className="text-center py-12 text-text-light">
                    <CalculatorIcon />
                    <p className="mt-4 text-sm">
                      Geben Sie Ihre Daten ein und klicken Sie auf „Berechnen", um das Ergebnis zu sehen.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {/* Vergleichsmiete */}
                    <div className="bg-light-gray rounded-xl p-4">
                      <div className="text-xs font-medium text-text-light uppercase tracking-wide mb-1">
                        Ortsübliche Vergleichsmiete
                      </div>
                      <div className="text-2xl font-bold text-navy">
                        {formatCurrency(results.ortsüblicheVergleichsmiete)} €
                      </div>
                      <div className="text-xs text-text-light mt-1">
                        ({mietspiegel} €/m² × {area} m²)
                      </div>
                    </div>

                    {/* Max Erhöhung */}
                    <div className="bg-teal/8 rounded-xl p-4 border border-teal/15">
                      <div className="text-xs font-medium text-teal uppercase tracking-wide mb-1">
                        Maximale Erhöhung nach § 558
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-navy">
                          {formatCurrency(results.maxIncreaseAmount)} €
                        </span>
                        <span className="text-sm text-teal font-semibold">
                          (+{results.maxIncreasePercent.toFixed(1)}%)
                        </span>
                      </div>
                      <div className="text-xs text-text-light mt-2">
                        Begrenzt auf max. 10% innerhalb von 12 Monaten
                      </div>
                    </div>

                    {/* Kappungsgrenze */}
                    <div className={`rounded-xl p-4 border ${results.kappungsgrenzeExceeded ? 'bg-amber/10 border-amber/30' : 'bg-navy/5 border-navy/10'}`}>
                      <div className={`text-xs font-medium uppercase tracking-wide mb-1 ${results.kappungsgrenzeExceeded ? 'text-amber' : 'text-navy/60'}`}>
                        Hamburg Kappungsgrenze (§ 558 Abs. 3)
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-navy">
                          {results.kappungsgrenzePercent}% in 3 Jahren
                        </span>
                      </div>
                      <div className="text-sm text-navy mt-1">
                        = max. {formatCurrency(results.kappungsgrenze)} €
                      </div>
                      {results.kappungsgrenzeExceeded && (
                        <div className="text-xs text-amber font-medium mt-2 flex items-start gap-1.5">
                          <InfoIcon />
                          <span>Die 10%-Grenze ist geringer als die Kappungsgrenze und gilt daher.</span>
                        </div>
                      )}
                    </div>

                    {/* Nächstes mögliches Datum */}
                    <div className="bg-light-gray rounded-xl p-4">
                      <div className="text-xs font-medium text-text-light uppercase tracking-wide mb-1">
                        Nächstmögliche Erhöhung (§ 558a)
                      </div>
                      <div className="text-xl font-bold text-navy">
                        {results.nextPossibleDate}
                      </div>
                      <div className="text-xs text-text-light mt-1">
                        2 Monate Kündigungsfrist + 15 Monate seit letzter Erhöhung
                      </div>
                    </div>

                    {/* Neue Max-Miete */}
                    <div className="bg-navy rounded-xl p-4 text-white">
                      <div className="text-xs font-medium text-white/70 uppercase tracking-wide mb-1">
                        Neue maximale Kaltmiete
                      </div>
                      <div className="text-3xl font-bold">
                        {formatCurrency(results.newMaxRent)} €
                      </div>
                      <div className="text-sm text-white/70 mt-1">
                        pro Monat
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-8 bg-amber/10 border border-amber/20 rounded-xl p-4 sm:p-6">
              <div className="flex items-start gap-3">
                <div className="text-amber flex-shrink-0 mt-0.5">
                  <InfoIcon />
                </div>
                <div>
                  <h3 className="font-semibold text-navy mb-1">Rechtlicher Hinweis</h3>
                  <p className="text-sm text-text-light leading-relaxed">
                    Diese Berechnung ist unverbindlich und dient nur der Orientierung. Die tatsächlich mögliche Erhöhung hängt vom aktuellen, amtlichen Mietspiegel ab und kann durch weitere Faktoren beeinflusst werden. Lassen Sie sich vor einer Mieterhöhung professionell beraten, um rechtliche Risiken zu vermeiden. Die Kappungsgrenze in Hamburg beträgt als Ballungsraum 15% innerhalb von 3 Jahren (§ 558 Abs. 3 BGB), in anderen Regionen maximal 20%.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 text-center">
              <a
                href="/anfrage"
                className="inline-block bg-teal text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-teal/90 transition-all shadow-lg hover:shadow-xl"
              >
                Mieterhöhung rechtssicher durchführen — jetzt anfragen →
              </a>
              <p className="text-sm text-text-light mt-3">
                Wir prüfen Ihren individuellen Fall und setzen die Erhöhung korrekt um.
              </p>
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-12 lg:py-16 bg-white border-t border-gray-100">
          <div className="max-w-[900px] mx-auto px-6">
            <h2 className="text-2xl font-bold text-navy mb-6 font-serif">Mieterhöhung nach § 558 BGB — So funktioniert es</h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-warm-white rounded-xl p-5">
                <div className="w-8 h-8 bg-teal/10 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-teal font-bold text-sm">1</span>
                </div>
                <h3 className="font-semibold text-navy">Ortsübliche Vergleichsmiete</h3>
                <p className="text-sm text-text-light mt-2">
                  Die Miete darf auf das ortsübliche Vergleichsniveau angehoben werden, das der Mietspiegel oder geeignete Vergleichswohnungen bestimmen.
                </p>
              </div>

              <div className="bg-warm-white rounded-xl p-5">
                <div className="w-8 h-8 bg-teal/10 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-teal font-bold text-sm">2</span>
                </div>
                <h3 className="font-semibold text-navy">10%-Grenze (§ 558 Abs. 3)</h3>
                <p className="text-sm text-text-light mt-2">
                  Innerhalb von 12 Monaten darf die Miete maximal um 10% erhöht werden — oder weniger, falls die Vergleichsmiete bereits erreicht ist.
                </p>
              </div>

              <div className="bg-warm-white rounded-xl p-5">
                <div className="w-8 h-8 bg-teal/10 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-teal font-bold text-sm">3</span>
                </div>
                <h3 className="font-semibold text-navy">Kappungsgrenze (15% in Hamburg)</h3>
                <p className="text-sm text-text-light mt-2">
                  In Ballungsräumen wie Hamburg gilt eine Kappungsgrenze von 15% innerhalb von 3 Jahren. Das ist meist höher als die 10%-Grenze.
                </p>
              </div>
            </div>

            <div className="mt-8 bg-navy/5 rounded-xl p-5 border border-navy/10">
              <h3 className="font-semibold text-navy mb-2">Fristen beachten (§ 558a BGB)</h3>
              <p className="text-sm text-text-light">
                Eine Mieterhöhung muss spätestens 2 Monate vor dem gewünschten Termin angekündigt werden. Nach der Zustimmung gilt sie vom Beginn des übernächsten Monats an. Außerdem mssen seit der letzten Erhöhung mindestens 15 Monate vergangen sein.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
