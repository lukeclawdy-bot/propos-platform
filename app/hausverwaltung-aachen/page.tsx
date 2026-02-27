import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Hausverwaltung Aachen — einfach verwaltet.",
  description:
    "Professionelle Hausverwaltung in Aachen ab €24/Einheit/Monat. Mietverwaltung und WEG-Verwaltung in der Kaiserstadt. Transparent, digital, zuverlässig.",
  openGraph: {
    title: "Hausverwaltung Aachen — einfach verwaltet.",
    description: "Moderne Hausverwaltung für Aachen und die Euregio. Transparente Preise, lokale Expertise, digitales Eigentümer-Portal.",
    url: "https://einfach-verwaltet.de/hausverwaltung-aachen",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "website",
  },
};

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Was kostet eine Hausverwaltung in Aachen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Unsere Hausverwaltungsgebühren in Aachen beginnen ab €24 pro Einheit und Monat für Mietverwaltung, ab €28 für WEG-Verwaltung. Alle Leistungen inklusive — kein Kleingedrucktes, keine Extrakosten für Standardleistungen.",
      },
    },
    {
      "@type": "Question",
      "name": "Was macht den Aachener Wohnungsmarkt besonders?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Aachen ist Universitätsstadt mit über 45.000 Studierenden (RWTH + FH) und profitiert von einer stabilen Nachfrage nach Mietwohnungen. Die Nähe zu Belgien und den Niederlanden zieht zudem internationale Fachkräfte an. Die Mietpreise liegen über dem NRW-Durchschnitt, mit Spitzenlagen in Burtscheid, dem Driescher Hof und der Innenstadt.",
      },
    },
    {
      "@type": "Question",
      "name": "Verwalten Sie auch studentischen Wohnraum in Aachen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja. Wir haben Erfahrung mit studentisch geprägten Wohnlagen, hoher Mieterfluktuation und WGs. Unser digitales Mietermanagement eignet sich besonders gut für Objekte mit häufigem Mieterwechsel.",
      },
    },
    {
      "@type": "Question",
      "name": "Wie läuft der Wechsel zur einfach verwaltet. in Aachen ab?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nach Ihrer Kündigung beim bisherigen Verwalter übernehmen wir die komplette Übergabe: Unterlagen, Mieterinformation, Konten und Portal-Einrichtung. Der Wechsel dauert in der Regel 4–8 Wochen.",
      },
    },
  ],
};

const localBusinessStructuredData = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "einfach verwaltet. — Hausverwaltung Aachen",
  "description": "Professionelle Hausverwaltung in Aachen. Transparente Preise, digitales Eigentümer-Portal, schnelle Reaktionszeiten.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Aachen",
    "addressCountry": "DE"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": "50.7753", "longitude": "6.0839" },
  "url": "https://einfach-verwaltet.de/hausverwaltung-aachen",
  "priceRange": "€€",
};

const stadtteile = [
  "Aachen-Mitte", "Burtscheid", "Laurensberg", "Richterich", "Eilendorf", "Brand", "Haaren", "Kornelimünster", "Verlautenheide", "Preuswald",
];

const features = [
  { title: "Universitätsstadt-Expertise", desc: "Wir kennen den Aachener Markt — von RWTH-Nähe bis Burtscheid. Hohe Fluktuation? Kein Problem für unser digitales Mietermanagement." },
  { title: "Digitales Eigentümer-Portal", desc: "24/7-Zugriff auf Mietstatus, Dokumente, Tickets und Finanzen — egal ob Sie in Aachen oder Berlin sind." },
  { title: "Schnelle Kommunikation", desc: "Mieteranfragen werden innerhalb von 15 Minuten bearbeitet. Keine überfüllten Telefonleitungen." },
  { title: "Rechtssichere Abrechnung", desc: "Pünktliche Nebenkostenabrechnung nach §556 BGB, DATEV-Export für Ihren Steuerberater." },
];

export default function AachenPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <section className="py-16 lg:py-24 bg-navy text-white">
          <div className="max-w-[1100px] mx-auto px-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-teal/20 rounded-full px-4 py-1.5 mb-6">
                <span className="text-teal text-sm font-semibold">Hausverwaltung Aachen</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 font-serif leading-tight">
                Hausverwaltung in Aachen.
                <br />
                <span className="text-teal">Modern. Transparent.</span>
              </h1>
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                Professionelle Mietverwaltung und WEG-Verwaltung in der Kaiserstadt und der Euregio. Ab €24/Einheit/Monat — ohne Überraschungen.
              </p>
              <a
                href="/anfrage"
                className="inline-block bg-teal text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-teal/85 transition-all shadow-lg"
              >
                Kostenlose Beratung anfragen →
              </a>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 lg:py-24 bg-warm-white">
          <div className="max-w-[1100px] mx-auto px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-10 font-serif text-center">Was wir in Aachen bieten</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map(f => (
                <div key={f.title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-navy mb-2">{f.title}</h3>
                  <p className="text-text-light text-sm">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stadtteile */}
        <section className="py-12 bg-white">
          <div className="max-w-[1100px] mx-auto px-6">
            <h2 className="text-xl font-bold text-navy mb-6 font-serif text-center">Wir verwalten in allen Stadtteilen Aachens</h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {stadtteile.map(s => (
                <span key={s} className="bg-warm-white border border-gray-200 text-navy text-sm px-4 py-2 rounded-full">{s}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 bg-warm-white">
          <div className="max-w-[700px] mx-auto px-6 text-center">
            <h2 className="text-2xl font-bold text-navy mb-4 font-serif">Transparente Preise für Aachen</h2>
            <p className="text-text-light mb-8">Was Sie sehen ist was Sie zahlen — keine versteckten Gebühren.</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
                <p className="font-bold text-navy mb-1">Mietverwaltung</p>
                <p className="text-3xl font-bold text-teal">ab €24</p>
                <p className="text-text-light text-sm">pro Einheit / Monat</p>
              </div>
              <div className="bg-white rounded-2xl p-6 border-2 border-teal shadow-md">
                <p className="font-bold text-navy mb-1">WEG-Verwaltung</p>
                <p className="text-3xl font-bold text-teal">ab €28</p>
                <p className="text-text-light text-sm">pro Einheit / Monat</p>
              </div>
            </div>
            <a href="/preise" className="inline-block mt-6 text-teal font-semibold hover:text-navy transition-colors">Alle Leistungen & Preise →</a>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-white">
          <div className="max-w-[800px] mx-auto px-6">
            <h2 className="text-2xl font-bold text-navy mb-10 font-serif text-center">Häufige Fragen — Hausverwaltung Aachen</h2>
            <div className="space-y-4">
              {faqStructuredData.mainEntity.map((item) => (
                <details key={item.name} className="group bg-warm-white rounded-xl border border-gray-100 overflow-hidden open:ring-2 open:ring-teal/20">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <span className="font-semibold text-navy pr-4 text-sm">{item.name}</span>
                    <svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </summary>
                  <div className="px-6 pb-6 text-text-light text-sm leading-relaxed">{item.acceptedAnswer.text}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-navy text-white">
          <div className="max-w-[700px] mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4 font-serif">Bereit für eine bessere Hausverwaltung in Aachen?</h2>
            <p className="text-white/75 mb-8">Kostenloses Erstgespräch. Wir melden uns innerhalb von 24 Stunden.</p>
            <a href="/anfrage" className="inline-block bg-teal text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-teal/85 transition-all shadow-lg">
              Jetzt anfragen →
            </a>
            <p className="text-white/50 text-sm mt-4">Kein Vertrag. Kein Risiko. Kein Druck.</p>
          </div>
        </section>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessStructuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      <Footer />
    </>
  );
}
