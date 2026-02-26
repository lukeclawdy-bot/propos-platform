import { CheckIcon } from "./Icons";

const mietFeatures = [
  "Mieterauswahl & Vertragsgestaltung",
  "SEPA-Mieteinzug & Mahnwesen",
  "Handwerker-Koordination",
  "Nebenkostenabrechnung (jährlich)",
  "Sofortige Bearbeitung aller Anfragen",
  "Online-Eigentümerportal",
  "Monatliche Abrechnungsberichte",
];

const wegFeatures = [
  "Alles aus Mietverwaltung",
  "Eigentümerversammlungen (digital oder vor Ort)",
  "Beschlussprotokolle & -sammlungen",
  "Instandhaltungsrücklagen-Verwaltung",
  "WEG-Buchhaltung nach HGB",
  "Umlaufbeschlüsse digital",
  "Prioritäts-Support für WEG-Vorstände",
];

const faq = [
  {
    q: "Gibt es versteckte Kosten?",
    a: "Nein. Der Monatspreis ist inklusiv. Außerplanmäßige Großreparaturen (>€500) werden vorher mit Ihnen abgestimmt und separat ausgewiesen.",
  },
  {
    q: "Was ist mit dem Honorar für Wohnungsvermittlung?",
    a: "Neuvermietung nach § 2 WoVermG: einmalig 1,5 Nettokaltmieten. Wird vor Beauftragung schriftlich festgehalten.",
  },
  {
    q: "Welche Mindestlaufzeit gilt?",
    a: "12 Monate, danach jederzeit mit 3-monatiger Frist kündbar. Keine automatische Verlängerung ohne Ihre Zustimmung.",
  },
];

export function Preise() {
  return (
    <section id="preise" className="py-20 lg:py-32 bg-warm-white">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-amber/10 rounded-full px-4 py-1.5 mb-6">
            <span className="text-amber text-sm font-semibold">Transparente Preise</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4 font-serif">
            Kein Preisrätsel. Klare Zahlen.
          </h2>
          <p className="text-text-light text-lg max-w-2xl mx-auto">
            Wir veröffentlichen unsere Preise. Weil Transparenz kein Risiko ist — sie ist unser Versprechen.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-3 bg-navy text-white rounded-xl px-5 py-3 text-sm">
            <CheckIcon className="w-4 h-4 text-amber" />
            <span>95% der deutschen Hausverwaltungen veröffentlichen keine Preise. Wir schon.</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Mietverwaltung */}
          <div className="relative rounded-2xl p-8 border-2 border-gray-200 bg-white hover:border-teal/40 hover:shadow-md transition-all">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-navy mb-1">Mietverwaltung</h3>
              <p className="text-text-light text-sm">Für Vermieter mit einzelnen oder mehreren Mietobjekten.</p>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-bold text-navy">€24 – €28</span>
              <div className="text-text-light text-sm mt-1">pro Einheit/Monat</div>
            </div>
            <ul className="space-y-3 mb-8">
              {mietFeatures.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <CheckIcon className="w-4 h-4 flex-shrink-0 mt-0.5 text-green" />
                  <span className="text-sm text-navy">{f}</span>
                </li>
              ))}
            </ul>
            <a href="#kontakt" className="block text-center w-full py-3 px-6 rounded-xl font-semibold bg-navy text-white hover:bg-navy/85 transition-all">
              Angebot anfragen
            </a>
            <p className="text-xs text-text-light text-center mt-3">Ab 1 Einheit. Preis abhängig von Einheitenanzahl und Lage.</p>
          </div>

          {/* WEG */}
          <div className="relative rounded-2xl p-8 border-2 border-teal bg-white shadow-xl">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="bg-teal text-white text-xs font-semibold px-4 py-1.5 rounded-full whitespace-nowrap">
                Meistgewählt
              </span>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-bold text-navy mb-1">WEG-Verwaltung</h3>
              <p className="text-text-light text-sm">Vollständige Verwaltung von Wohnungseigentümergemeinschaften.</p>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-bold text-navy">€28 – €34</span>
              <div className="text-text-light text-sm mt-1">pro Einheit/Monat</div>
            </div>
            <ul className="space-y-3 mb-8">
              {wegFeatures.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <CheckIcon className="w-4 h-4 flex-shrink-0 mt-0.5 text-teal" />
                  <span className="text-sm text-navy">{f}</span>
                </li>
              ))}
            </ul>
            <a href="#kontakt" className="block text-center w-full py-3 px-6 rounded-xl font-semibold bg-teal text-white hover:bg-teal/85 shadow-md hover:shadow-lg transition-all">
              WEG-Angebot anfragen
            </a>
            <p className="text-xs text-text-light text-center mt-3">Ab 4 Einheiten. Mindestlaufzeit 12 Monate.</p>
          </div>
        </div>

        {/* Pricing FAQ */}
        <div className="mt-12 max-w-2xl mx-auto space-y-4">
          <h4 className="text-center font-semibold text-navy mb-6">Häufige Fragen zu den Preisen</h4>
          {faq.map((item) => (
            <div key={item.q} className="bg-white rounded-xl p-5 border border-gray-100">
              <div className="font-semibold text-navy mb-1 text-sm">{item.q}</div>
              <div className="text-text-light text-sm leading-relaxed">{item.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
