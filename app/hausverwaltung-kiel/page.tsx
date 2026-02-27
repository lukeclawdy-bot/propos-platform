import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Hausverwaltung Kiel — einfach verwaltet.",
  description:
    "Professionelle Hausverwaltung in Kiel: transparente Preise ab €24/Einheit, 24/7 Erreichbarkeit, lokales Handwerkernetzwerk. Für WEG und Mietverwaltung in Kiel und der Region.",
  openGraph: {
    title: "Hausverwaltung Kiel — einfach verwaltet.",
    description: "Die moderne Hausverwaltung für Kiel. Lokales Know-how, transparente Preise, immer erreichbar.",
    url: "https://einfach-verwaltet.de/hausverwaltung-kiel",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "website",
  },
};

const localBusinessData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "einfach verwaltet. — Hausverwaltung Kiel",
  "description": "Professionelle Hausverwaltung in Kiel für WEG und Mietverwaltung. Transparente Preise, lokales Know-how, 24/7 Erreichbarkeit.",
  "url": "https://einfach-verwaltet.de/hausverwaltung-kiel",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Kiel",
    "addressRegion": "Schleswig-Holstein",
    "addressCountry": "DE"
  },
  "areaServed": {
    "@type": "City",
    "name": "Kiel"
  },
  "priceRange": "ab €24/Einheit",
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
        "text": "In Kiel kosten professionelle Hausverwaltungsleistungen bei einfach verwaltet. ab 24 € pro Einheit und Monat für Mietverwaltung, ab 28 € für WEG-Verwaltung. Alle Leistungen inklusive: Mieterkommunikation, Nebenkostenabrechnung, Instandhaltungskoordination und digitales Eigentümer-Portal. Keine versteckten Kosten.",
      },
    },
    {
      "@type": "Question",
      "name": "Welche Stadtteile in Kiel betreuen Sie?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wir betreuen Immobilien in ganz Kiel: Innenstadt, Wik, Gaarden, Elmschenhagen, Meimersdorf, Rönne, Steenbek-Projensdorf, Pries-Friedrichsort, Suchsdorf und allen anderen Stadtbezirken. Auch Objekte im Kieler Umland sind möglich.",
      },
    },
    {
      "@type": "Question",
      "name": "Gibt es in Kiel eine Mietpreisbremse?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Schleswig-Holstein hat eine Mietpreisbremsenverordnung erlassen, die in ausgewählten Gemeinden gilt. Kiel ist als Landeshauptstadt und angespannter Wohnungsmarkt einbezogen. Bei Neuvermietungen darf die Miete maximal 10 % über der ortsüblichen Vergleichsmiete liegen. Wir prüfen dies automatisch bei jeder Neuvermietung.",
      },
    },
    {
      "@type": "Question",
      "name": "Wie ist der Kieler Immobilienmarkt 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Kiel ist die Landeshauptstadt Schleswig-Holsteins mit ca. 250.000 Einwohnern. Die Christian-Albrechts-Universität sorgt für eine starke Studentennachfrage. Der Mietmarkt ist durch Küstenlage und Universitätsstadt-Dynamik geprägt — mit stabiler Nachfrage besonders für kleinere Einheiten.",
      },
    },
    {
      "@type": "Question",
      "name": "Betreuen Sie auch Studentenwohnungen in Kiel?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, wir haben Erfahrung mit der Verwaltung von Studentenwohnungen und kleinen Einheiten in Kiel. Besonderheiten wie häufigerer Mieterwechsel, spezifische Bonitätsprüfungen und befristete Mietverträge kennen wir aus dem Alltag.",
      },
    },
    {
      "@type": "Question",
      "name": "Wie lange dauert der Verwalterwechsel in Kiel?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ein Verwalterwechsel in Kiel dauert in der Regel 4–8 Wochen. Nach Ihrer Kündigung beim bisherigen Verwalter übernehmen wir die gesamte Dokumentation, informieren alle Mieter und koordinieren die reibungslose Übergabe.",
      },
    },
  ],
};

const features = [
  {
    title: "Kiel-lokales Know-how",
    description: "Wir kennen Kiels Immobilienmarkt — von der Universitätsstadt-Dynamik mit hoher Studentennachfrage über die attraktiven Lagen in Wik und Gaarden bis zur wachsenden Nachfrage in Stadtrandlagen.",
  },
  {
    title: "Transparente Pauschalpreise",
    description: "Ab 24 €/Einheit/Monat für Mietverwaltung. Alle Leistungen inklusive — keine Sondervergütungen für Wohnungsübergaben, Mieterhöhungen oder Jahresgespräche. Kein Kleingedrucktes.",
  },
  {
    title: "24/7 Erreichbarkeit",
    description: "Mieteranfragen werden innerhalb von 15 Minuten bestätigt. Kein Anrufbeantworter — direkter Kontakt zu Ihrem persönlichen Verwalter an 365 Tagen im Jahr.",
  },
  {
    title: "Digitales Eigentümer-Portal",
    description: "Echtzeit-Einblick in Mieteingänge, Reparaturstatus, Abrechnungen und alle Dokumente. Volle Transparenz über Ihr Kieler Portfolio — jederzeit, von überall.",
  },
];

const localKnowledge = [
  {
    title: "Universitätsstadt-Dynamik",
    description: "Die Christian-Albrechts-Universität Kiel mit ca. 27.000 Studierenden erzeugt eine starke Nachfrage nach kleinen Wohneinheiten. Wir kennen die spezifischen Anforderungen dieser Mietergruppe und die typischen Leerstandsrisiken zum Semesterwechsel.",
  },
  {
    title: "Mietpreisbremse Schleswig-Holstein",
    description: "Kiel ist als Landeshauptstadt in der schleswig-holsteinischen Mietpreisbremseverordnung erfasst. Wir prüfen bei jeder Neuvermietung die ortsübliche Vergleichsmiete und setzen Mieten rechtskonform und renditeoptimiert.",
  },
  {
    title: "Lokales Handwerkernetzwerk Kiel",
    description: "Von der Innenstadt bis nach Pries-Friedrichsort: Unser Netzwerk aus geprüften Kieler Handwerkern garantiert schnelle Reaktionszeiten bei Reparaturen — besonders wichtig bei winterlichen Witterungsschäden an der Küste.",
  },
];

const kielMarketData = [
  { label: "Bevölkerung", value: "ca. 250.000 Einw." },
  { label: "Bundesland", value: "Schleswig-Holstein" },
  { label: "Ø Kaltmiete (2026)", value: "ca. 10–14 €/m²" },
  { label: "Mietpreisbremse", value: "Aktiv (SH-Verordnung)" },
  { label: "Betreute Stadtteile", value: "Alle Bezirke" },
  { label: "Reaktionszeit", value: "< 15 Min." },
];

export default function HausverwaltungKielPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessData) }}
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
              Professionelle Hausverwaltung für Kiel. Lokales Know-how, transparente Preise ab 24 €/Einheit, 
              24/7 Erreichbarkeit. Für WEG und Mietverwaltung — von der Innenstadt bis nach Gaarden und Wik.
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

        {/* Features */}
        <section className="py-16 lg:py-24 bg-warm-white">
          <div className="max-w-[1100px] mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-navy mb-4 font-serif">
                Warum Kieler Eigentümer einfach verwaltet. wählen
              </h2>
              <p className="text-text-light max-w-xl mx-auto">
                In Kiels dynamischem Immobilienmarkt — geprägt durch Universitätsstadt, Küstenlage 
                und wachsende Bevölkerung — zählt echte lokale Expertise.
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
                  Kiel als Landeshauptstadt Schleswig-Holsteins und Universitätsstadt hat seinen 
                  ganz eigenen Immobilienmarkt: starke Studentennachfrage, Küstenlage mit spezifischen 
                  Instandhaltungsanforderungen, und eine Mietpreisbremse, die bei jeder Neuvermietung 
                  zu beachten ist. Wir kennen alle diese Besonderheiten.
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
                <h3 className="text-xl font-bold text-navy mb-6 font-serif">Kiel im Überblick</h3>
                <div className="space-y-4 text-text-light">
                  {kielMarketData.map((item, i) => (
                    <div
                      key={item.label}
                      className={`flex justify-between py-2 ${i < kielMarketData.length - 1 ? "border-b border-navy/10" : ""}`}
                    >
                      <span>{item.label}</span>
                      <span className="font-semibold text-navy">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Market Insight */}
        <section className="py-16 lg:py-24 bg-warm-white">
          <div className="max-w-[1100px] mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-navy mb-4 font-serif">
                Der Kieler Immobilienmarkt 2026
              </h2>
              <p className="text-text-light max-w-2xl mx-auto">
                Kiel wächst — die Universitätsstadt an der Förde verzeichnet stabile Nachfrage 
                nach Mietwohnungen in allen Preissegmenten.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 text-center">
                <div className="text-3xl font-bold text-teal mb-2">~250.000</div>
                <div className="text-text-light text-sm">Einwohner — Landeshauptstadt Schleswig-Holsteins</div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 text-center">
                <div className="text-3xl font-bold text-teal mb-2">~27.000</div>
                <div className="text-text-light text-sm">Studierende an der CAU Kiel — starke Nachfrage nach kleinen Einheiten</div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 text-center">
                <div className="text-3xl font-bold text-teal mb-2">Mietpreisbremse</div>
                <div className="text-text-light text-sm">Kiel ist von der Schleswig-Holstein-Verordnung erfasst</div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-[800px] mx-auto px-6">
            <h2 className="text-3xl font-bold text-navy mb-8 text-center font-serif">
              Häufige Fragen zur Hausverwaltung in Kiel
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: "Was kostet eine Hausverwaltung in Kiel?",
                  a: "Bei einfach verwaltet. kosten Hausverwaltungsleistungen ab 24 € pro Einheit und Monat für Mietverwaltung, ab 28 € für WEG-Verwaltung. Alle Leistungen inklusive — keine versteckten Kosten.",
                },
                {
                  q: "Welche Stadtteile in Kiel betreuen Sie?",
                  a: "Wir betreuen Immobilien in ganz Kiel: Innenstadt, Wik, Gaarden, Elmschenhagen, Meimersdorf, Suchsdorf und allen anderen Stadtbezirken. Auch Objekte im Kieler Umland sind möglich.",
                },
                {
                  q: "Gibt es in Kiel eine Mietpreisbremse?",
                  a: "Ja, Kiel ist als Landeshauptstadt in der schleswig-holsteinischen Mietpreisbremseverordnung erfasst. Bei Neuvermietungen darf die Miete maximal 10 % über der ortsüblichen Vergleichsmiete liegen. Wir prüfen dies automatisch bei jeder Neuvermietung.",
                },
                {
                  q: "Betreuen Sie auch Studentenwohnungen in Kiel?",
                  a: "Ja, wir haben Erfahrung mit Studentenwohnungen und kleinen Einheiten. Besonderheiten wie häufigerer Mieterwechsel, spezifische Bonitätsprüfungen und befristete Mietverträge kennen wir aus dem Alltag.",
                },
                {
                  q: "Wie ist der Kieler Immobilienmarkt 2026?",
                  a: "Kiel verzeichnet stabile Nachfrage durch Universität und Landeshauptstadt-Funktion. Besonders kleine Einheiten nahe der CAU Kiel sind begehrt. Die Mietpreisbremse begrenzt bei Neuvermietungen das Potenzial nach oben.",
                },
                {
                  q: "Wie lange dauert der Verwalterwechsel in Kiel?",
                  a: "Ein Verwalterwechsel dauert in der Regel 4–8 Wochen. Nach Ihrer Kündigung übernehmen wir die Dokumentation, informieren alle Mieter und koordinieren die reibungslose Übergabe.",
                },
              ].map((faq) => (
                <div key={faq.q} className="bg-warm-white rounded-xl p-6 border border-gray-100">
                  <h3 className="font-bold text-navy mb-2">{faq.q}</h3>
                  <p className="text-text-light text-sm leading-relaxed">{faq.a}</p>
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
