"use client";

import { useState } from "react";

const tableRows = [
  {
    label: "Kosten/Monat",
    selbst: "0 € (+ Zeitaufwand)",
    klassisch: "€26–40/Einheit",
    ev: "€24–34/Einheit",
  },
  {
    label: "Reaktionszeit",
    selbst: "Stunden/Tage",
    klassisch: "24–72 Stunden",
    ev: "< 15 Minuten",
  },
  {
    label: "Nebenkostenabrechnung",
    selbst: "Manuell",
    klassisch: "Papier-basiert",
    ev: "Automatisch",
  },
  {
    label: "Verfügbarkeit",
    selbst: "Nur Werktags",
    klassisch: "Werktags",
    ev: "24/7",
  },
  {
    label: "Mieterportal",
    selbst: "✗",
    klassisch: "Selten",
    ev: "✅",
  },
  {
    label: "Rechtliche Absicherung",
    selbst: "Eigenverantwortung",
    klassisch: "§34c",
    ev: "§34c ✅",
  },
];

const faqs = [
  {
    q: "Ist €24-34 pro Einheit nicht teuer?",
    a: "Im Vergleich zu klassischen Hausverwaltungen (€26–40/Einheit) liegen wir günstiger — und bieten mehr: kürzere Reaktionszeiten, digitales Mieterportal, automatische Nebenkostenabrechnung und 24/7-Verfügbarkeit. Wenn Sie Ihren eigenen Zeitaufwand einrechnen (Handwerker-Koordination, Mahnwesen, Jahresabrechnung), ist Selbstverwaltung selten wirklich günstiger.",
  },
  {
    q: "Was wenn ich nur 2-3 Einheiten habe?",
    a: "Gerade kleine Portfolios profitieren überproportional: Sie haben dieselben gesetzlichen Pflichten wie große Eigentümer (§556 BGB, §14 MaBV, BetrKV), aber weniger Spielraum für Fehler. Unser Einstiegspaket startet ab 2 Einheiten — sprechen Sie uns einfach an.",
  },
  {
    q: "Ist eine Kündigung jederzeit möglich?",
    a: "Ja. Unser Vertrag hat eine Laufzeit von 12 Monaten mit 3-monatiger Kündigungsfrist zum Vertragsende. Außerordentliche Kündigung bei wichtigem Grund jederzeit. Keine versteckten Klauseln, kein automatisches Rollover — versprochen.",
  },
];

function TimeCalculator() {
  const [hours, setHours] = useState<number | "">("");
  const hourlyRate = 50;

  const hoursPerYear = hours !== "" ? Number(hours) * 52 : null;
  const opportunityCost = hoursPerYear !== null ? hoursPerYear * hourlyRate : null;

  return (
    <div className="bg-white border border-navy/10 rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-bold text-navy mb-2">Zeitkosten-Rechner</h3>
      <p className="text-text-light text-sm mb-5">
        Wie viele Stunden verbringen Sie pro Woche mit Ihrer Immobilie?
        (Mieteranfragen, Handwerker, Abrechnung, Behördenpost …)
      </p>
      <div className="flex items-center gap-3 mb-4">
        <input
          type="number"
          min={0}
          max={168}
          value={hours}
          onChange={(e) => setHours(e.target.value === "" ? "" : Number(e.target.value))}
          placeholder="z.B. 5"
          className="w-28 border border-navy/20 rounded-xl px-4 py-2.5 text-navy font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-teal"
        />
        <span className="text-text-light text-sm">Stunden/Woche</span>
      </div>
      {hoursPerYear !== null && opportunityCost !== null && hours !== "" && Number(hours) > 0 && (
        <div className="bg-teal/10 border border-teal/20 rounded-xl px-5 py-4 space-y-1">
          <p className="text-navy text-sm">
            Das sind{" "}
            <strong className="text-navy">{hoursPerYear.toLocaleString("de-DE")} Stunden/Jahr</strong>
          </p>
          <p className="text-navy text-sm">
            ={" "}
            <strong className="text-teal text-base">
              €{opportunityCost.toLocaleString("de-DE")} Opportunitätswert
            </strong>{" "}
            <span className="text-text-light text-xs">(bei €50/Std. Ansatz)</span>
          </p>
          <p className="text-text-light text-xs mt-2">
            Mit einfach verwaltet. gewinnen Sie diese Zeit zurück — für €24–€34/Einheit/Monat.
          </p>
        </div>
      )}
    </div>
  );
}

export function KostenvergleichClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-4 py-14 space-y-16">
      {/* Comparison Table */}
      <section>
        <h2 className="text-2xl font-bold text-navy mb-6 text-center">
          Der direkte Vergleich
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-navy/10 shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-navy text-white">
                <th className="py-4 px-4 text-left font-semibold rounded-tl-2xl">Kriterium</th>
                <th className="py-4 px-4 text-center font-semibold">Selbstverwaltung</th>
                <th className="py-4 px-4 text-center font-semibold">Klassische HV</th>
                <th className="py-4 px-4 text-center font-semibold text-amber rounded-tr-2xl">
                  einfach verwaltet.
                </th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, i) => (
                <tr key={row.label} className={i % 2 === 0 ? "bg-white" : "bg-light-gray"}>
                  <td className="py-3 px-4 font-medium text-navy">{row.label}</td>
                  <td className="py-3 px-4 text-center text-text-light">{row.selbst}</td>
                  <td className="py-3 px-4 text-center text-text-light">{row.klassisch}</td>
                  <td className="py-3 px-4 text-center font-semibold text-teal">{row.ev}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-text-light mt-3 text-center">
          Preise: Marktübliche Spannweiten. Eigene Konditionen auf Anfrage.
          [Quelle: VDIV, eigene Marktrecherche 2026]
        </p>
      </section>

      {/* Time Calculator */}
      <section>
        <h2 className="text-2xl font-bold text-navy mb-6 text-center">
          Rechnen Sie Ihren Zeitaufwand durch
        </h2>
        <div className="max-w-lg mx-auto">
          <TimeCalculator />
        </div>
      </section>

      {/* FAQ */}
      <section>
        <h2 className="text-2xl font-bold text-navy mb-6">Häufige Fragen</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white border border-navy/10 rounded-2xl overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-navy hover:bg-light-gray/50 transition-colors"
              >
                <span>{faq.q}</span>
                <span className="text-teal ml-4 flex-shrink-0 text-xl">
                  {openFaq === i ? "−" : "+"}
                </span>
              </button>
              {openFaq === i && (
                <div className="px-6 pb-5 text-text-light text-sm leading-relaxed border-t border-navy/5">
                  <p className="mt-3">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy rounded-3xl p-10 text-center">
        <h2 className="text-2xl font-bold text-white mb-3">
          Kostenloses Angebot in 24 Stunden
        </h2>
        <p className="text-white/70 mb-6 max-w-md mx-auto">
          Sagen Sie uns kurz, wie viele Einheiten Sie verwalten möchten — wir machen Ihnen ein
          transparentes Angebot ohne versteckte Kosten.
        </p>
        <a
          href="/anfrage"
          className="inline-flex items-center gap-2 bg-amber hover:bg-amber/90 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors text-base"
        >
          Kostenloses Angebot anfragen →
        </a>
      </section>
    </div>
  );
}
