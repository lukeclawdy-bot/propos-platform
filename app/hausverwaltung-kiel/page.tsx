import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Hausverwaltung Kiel — einfach verwaltet.",
  description:
    "Professionelle Hausverwaltung in Kiel: transparente Preise ab €24/Einheit, 24/7 Erreichbarkeit, lokales Handwerkernetzwerk. Für WEG und Mietverwaltung in der Fördestadt.",
  openGraph: {
    title: "Hausverwaltung Kiel — einfach verwaltet.",
    description: "Die moderne Hausverwaltung für Kiel. Lokales Know-how, transparente Preise, immer erreichbar.",
    url: "https://einfach-verwaltet.de/hausverwaltung-kiel",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "website",
  },
};

const serviceStructuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "einfach verwaltet. — Hausverwaltung Kiel",
  "description": "Professionelle Hausverwaltung in Kiel für WEG und Mietverwaltung. Transparente Preise ab 24€/Einheit, lokales Know-how, 24/7 Erreichbarkeit.",
  "url": "https://einfach-verwaltet.de/hausverwaltung-kiel",
  "telephone": "+49-40-000000",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Hamburg",
    "addressCountry": "DE"
  },
  "areaServed": {
    "@type": "City",
    "name": "Kiel"
  },
  "priceRange": "ab 24€/Einheit/Monat",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00",
    "closes": "18:00"
  },
  "offers": {
    "@type": "Offer",
    "price": "24",
    "priceCurrency": "EUR",
    "priceValidUntil": "2026-12-31",
    "availability": "https://schema.org/InStock"
  }
};

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Was kostet eine Hausverwaltung in Kiel?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bei einfach verwaltet. starten unsere Leistungen ab 24 € pro Einheit und Monat für Mietverwaltung, ab 28 € für WEG-Verwaltung. Alle Kernleistungen sind inklusive: Mieterkommunikation, Nebenkostenabrechnung nach §556 BGB, Mieterhöhungsmanagement, Instandhaltungskoordination und digitales Eigentümerportal. Keine versteckten Zusatzgebühren.",
      },
    },
    {
      "@type": "Question",
      "name": "Gibt es in Kiel eine Mietpreisbremse?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, Kiel gilt als Gebiet mit angespanntem Wohnungsmarkt im Sinne der Schleswig-Holsteinischen Mietpreisbremseverordnung. Bei Neuvermietungen darf die Miete in bestimmten Lagen die ortsübliche Vergleichsmiete um höchstens 10 % überschreiten (§556d BGB). Wir prüfen vor jeder Neuvermietung die geltenden Grenzen.",
      },
    },
    {
      "@type": "Question",
      "name": "Welche Stadtteile in Kiel betreut einfach verwaltet.?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wir betreuen Objekte in allen Kieler Stadtteilen: Innenstadt, Gaarden, Ravensberg, Brunswik, Wik, Hassee, Neumühlen-Dietrichsdorf und alle weiteren Bezirke. Vom Altbau in der Fördepromenade bis zum Neubau in Hassee kennen wir den Kieler Markt.",
      },
    },
    {
      "@type": "Question",
      "name": "Warum ist Kiel als Investitionsstandort interessant?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Kiel ist Landeshauptstadt von Schleswig-Holstein und bietet als Universitätsstadt (CAU Kiel, FH Kiel) eine konstante Mietnachfrage durch Studierende. Die Nähe zu Hamburg (ca. 90 km) macht Kiel für Pendler attraktiv. Marine und maritime Wirtschaft bringen stabile Fachkräftenachfrage. Mietpreise: 9–14 €/m² nettokalt je nach Lage.",
      },
    },
    {
      "@type": "Question",
      "name": "Wie unterscheidet sich der Kieler Markt vom Hamburger Markt?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Kiel hat deutlich niedrigere Mietpreise als Hamburg, aber auch geringere Verwaltungskosten. Die Nachfrage ist stabiler und weniger spekulativ. Für Eigentümer bedeutet das: verlässliche Mietverhältnisse, überschaubare Leerstandsrisiken und gutes Preis-Rendite-Verhältnis gegenüber Hamburger Kaufpreisen.",
      },
    },
  ],
};

const features = [
  {
    title: "Kiel-lokales Know-how",
    description: "Wir kennen den Kieler Immobilienmarkt — von der Fördepromenade über Gaarden bis Hassee. Mietpreisbremse Schleswig-Holstein, Kieler Mietspiegel und lokale Handwerker kennen wir gut.",
  },
  {
    title: "Hamburg-Expertise für Kiel",
    description: "Als Hamburg-naher Anbieter bedienen wir die Schleswig-Holstein-Achse. Viele Kieler Eigentümer leben in Hamburg — wir liefern volle Transparenz über Ihr Kieler Portfolio aus der Ferne.",
  },
  {
    title: "24/7 Erreichbarkeit",
    description: "Mieteranfragen werden innerhalb von 15 Minuten bestätigt. Notfälle sofort bearbeitet — auch in Kiel, auch nachts.",
  },
  {
    title: "Digitales Eigentümerportal",
    description: "Echtzeit-Einblick in Mieteingänge, Reparaturstatus und alle Dokumente — egal ob Sie in Kiel, Hamburg oder woanders wohnen.",
  },
];

const localKnowledge = [
  {
    title: "Mietpreisbremse SH",
    description: "Kiel liegt im Geltungsbereich der Schleswig-Holsteinischen Mietpreisbremseverordnung. Wir prüfen bei jeder Neuvermietung die geltenden Grenzen und dokumentieren Ausnahmen sorgfältig.",
  },
  {
    title: "Kieler Mietspiegel",
    description: "Wir arbeiten mit dem aktuellen Kieler Mietspiegel für rechtssichere Mieterhöhungen nach §558 BGB — inklusive vollständiger Begründungsdokumentation und Fristwahrung.",
  },
  {
    title: "Marine + Uni: stabile Nachfrage",
    description: "Bundeswehr, CAU und FH Kiel sorgen für eine verlässliche Mietnachfrage. Wir verstehen die Mieterprofile und finden passende Mieter für Ihr Objekt.",
  },
];

export default function HausverwaltungKielPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <section className="py-16 lg:py-24 bg-navy text-white">
          <div className="max-w-[1100px] mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 bg-teal/20 rounded-full px-4 py-1.5 mb-6">
              <span className="text-teal text-sm font-semibold">Hausverwaltung in Kiel</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 font-serif leading-tight">
              Hausverwaltung Kiel
              <br />
              <span className="text-teal">die funktioniert.</span>
            </h1>
            <p className="text-lg text-white/75 max-w-2xl mx-auto">
              Professionelle Hausverwaltung für die Fördestadt. Lokales Know-how für Kiel, 
              transparente Preise ab 24 €/Einheit, 24/7 Erreichbarkeit. 
              Für WEG und Mietverwaltung — von Gaarden bis Brunswik.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <a
                href="/anfrage"
                className="inline-block bg-teal text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-teal/85 transition-all shadow-lg hover:shadow-xl"
              >
                Kostenloses Angebot anfragen →
              </a>
              <a
                href="/preise"
                className="inline-block bg-white/10 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all border border-white/20"
              >
                Preise ansehen
              </a>
            </div>
          </div>
        </section>

        {/* Market Data */}
        <section className="py-10 bg-teal/5 border-b border-teal/10">
          <div className="max-w-[1100px] mx-auto px-6">
            <div className="grid sm:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-navy font-serif">~250.000</div>
                <div className="text-text-light text-sm">Einwohner</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-navy font-serif">9–14 €</div>
                <div className="text-text-light text-sm">Nettokaltmiete/m²</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-navy font-serif">Mietpreisbremse</div>
                <div className="text-text-light text-sm">SH aktiv in Kiel</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-navy font-serif">~90 km</div>
                <div className="text-text-light text-sm">Entfernung Hamburg</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 lg:py-24 bg-warm-white">
          <div className="max-w-[1100px] mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-navy mb-4 font-serif">
                Warum Kieler Eigentümer einfach verwaltet. wählen
              </h2>
              <p className="text-text-light max-w-xl mx-auto">
                Kiel bietet stabile Mietrenditen und ein verlässliches Mieterfeld. 
                Mit einfach verwaltet. nutzen Sie das Potenzial der Fördestadt optimal.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature) => (
                <div key={feature.title} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-bold text-navy mb-3 font-serif">{feature.title}</h3>
                  <p className="text-text-light leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Local Knowledge */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-[1100px] mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-navy mb-6 font-serif">
                  Kiel-Expertise, die sich auszahlt
                </h2>
                <p className="text-text-light leading-relaxed mb-8">
                  Kiel ist als Universitäts- und Marinestadt ein verlässlicher Mietmarkt mit stabiler 
                  Nachfrage. Von der Fördepromenade bis nach Hassee kennen wir die Stadtteile, Mietspiegel 
                  und lokalen Handwerkernetzwerke.
                </p>
                <div className="space-y-6">
                  {localKnowledge.map((item) => (
                    <div key={item.title} className="flex gap-4">
                      <div className="w-2 h-2 rounded-full bg-teal mt-2 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-navy mb-1">{item.title}</h4>
                        <p className="text-text-light text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-navy/5 rounded-2xl p-8 border border-navy/10">
                <h3 className="text-xl font-bold text-navy mb-6 font-serif">Unser Kieler Service auf einen Blick</h3>
                <div className="space-y-4 text-text-light">
                  <div className="flex justify-between py-2 border-b border-navy/10">
                    <span>Geprüfte Handwerker</span>
                    <span className="font-semibold text-navy">25+ Partner</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-navy/10">
                    <span>Betreute Stadtteile</span>
                    <span className="font-semibold text-navy">Alle Bezirke</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-navy/10">
                    <span>Reaktionszeit Mieter</span>
                    <span className="font-semibold text-navy">&lt; 15 Min.</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-navy/10">
                    <span>Nebenkostenabrechnung</span>
                    <span className="font-semibold text-navy">Fristgerecht</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-navy/10">
                    <span>Mietpreisbremse-Check</span>
                    <span className="font-semibold text-navy">Automatisch</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span>Verfügbarkeit</span>
                    <span className="font-semibold text-navy">365 Tage/Jahr</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 lg:py-24 bg-warm-white">
          <div className="max-w-[800px] mx-auto px-6">
            <h2 className="text-3xl font-bold text-navy mb-8 text-center font-serif">
              Häufige Fragen zur Hausverwaltung in Kiel
            </h2>

            <div className="space-y-4">
              {faqStructuredData.mainEntity.map((faq, i) => (
                <div key={i} className="bg-white rounded-xl p-6 border border-gray-100">
                  <h3 className="font-bold text-navy mb-2">{faq.name}</h3>
                  <p className="text-text-light text-sm leading-relaxed">{faq.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-20 bg-navy text-white">
          <div className="max-w-[700px] mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4 font-serif">
              Bereit für eine bessere Hausverwaltung in Kiel?
            </h2>
            <p className="text-white/75 mb-8">
              Vereinbaren Sie ein kostenloses Erstgespräch. Wir analysieren Ihr Kieler Portfolio 
              und erstellen Ihnen ein maßgeschneidertes Angebot — in 24 Stunden.
            </p>
            <a
              href="/anfrage"
              className="inline-block bg-teal text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-teal/85 transition-all shadow-lg hover:shadow-xl"
            >
              Kostenloses Erstgespräch vereinbaren →
            </a>
            <p className="text-white/50 text-sm mt-4">
              Keine versteckten Kosten. Keine Verpflichtungen. Antwort noch am selben Tag.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
