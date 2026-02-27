import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Hausverwaltung Leipzig — einfach verwaltet.",
  description:
    "Professionelle Hausverwaltung in Leipzig: transparente Preise ab €24/Einheit, 24/7 Erreichbarkeit, lokales Handwerkernetzwerk. Für WEG und Mietverwaltung in der am schnellsten wachsenden Großstadt Deutschlands.",
  openGraph: {
    title: "Hausverwaltung Leipzig — einfach verwaltet.",
    description: "Die moderne Hausverwaltung für Leipzig. Lokales Know-how, transparente Preise, immer erreichbar.",
    url: "https://einfach-verwaltet.de/hausverwaltung-leipzig",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "website",
  },
};

// Schema.org LocalBusiness for Leipzig
const localBusinessStructuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "einfach verwaltet. — Hausverwaltung Leipzig",
  "description": "Professionelle Hausverwaltung in Leipzig für WEG und Mietverwaltung. Transparente Preise, lokales Know-how, 24/7 Erreichbarkeit.",
  "url": "https://einfach-verwaltet.de/hausverwaltung-leipzig",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Leipzig",
    "addressRegion": "Sachsen",
    "addressCountry": "DE"
  },
  "areaServed": {
    "@type": "City",
    "name": "Leipzig"
  },
  "priceRange": "€€",
  "telephone": "+49 40 000000",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "09:00",
    "closes": "18:00"
  }
};

// Schema.org FAQPage for Leipzig
const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Was kostet eine Hausverwaltung in Leipzig?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bei einfach verwaltet. kosten unsere Hausverwaltungsleistungen in Leipzig ab 24 € pro Einheit und Monat für Mietverwaltung, ab 28 € für WEG-Verwaltung. Alle Standardleistungen sind inklusive: Mieterkommunikation, Nebenkostenabrechnung nach § 556 BGB, Instandhaltungskoordination und digitales Eigentümer-Portal. Keine versteckten Kosten.",
      },
    },
    {
      "@type": "Question",
      "name": "Welche Stadtteile in Leipzig betreut einfach verwaltet.?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wir betreuen Immobilien in allen Leipziger Stadtteilen — darunter Altstadt, Gohlis, Connewitz, Schleußig, Plagwitz und Reudnitz. Als bundesweit aktiver Verwalter sind wir in ganz Sachsen und darüber hinaus tätig.",
      },
    },
    {
      "@type": "Question",
      "name": "Warum ist Leipzig ein attraktiver Immobilienmarkt?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Leipzig ist mit rund 630.000 Einwohnern die am schnellsten wachsende Großstadt Deutschlands. Die hohe Nachfrage nach Mietwohnungen — besonders in beliebten Stadtteilen wie Connewitz, Schleußig und Gohlis — macht Leipzig zu einem der interessantesten Märkte für Vermieter. Eine professionelle Hausverwaltung sichert Ihre Erträge und gibt Ihnen Freiraum.",
      },
    },
  ],
};

const features = [
  {
    title: "Leipzig-lokales Know-how",
    description: "Wir kennen den Leipziger Mietmarkt — von Mietpreisentwicklungen bis zu lokalen Besonderheiten. Egal ob Connewitz, Gohlis, Plagwitz oder Schleußig.",
  },
  {
    title: "Transparente Preise",
    description: "Ab 24 €/Einheit/Monat für Mietverwaltung. Alle Kosten auf einen Blick — keine versteckten Gebühren, keine Überraschungen bei der Jahresabrechnung.",
  },
  {
    title: "24/7 Erreichbarkeit",
    description: "Mieteranfragen werden innerhalb von 15 Minuten bestätigt. Rückrufe am selben Werktag. Keine Warteschleifen, keine Mailbox-Ansagen.",
  },
  {
    title: "Digitales Eigentümer-Portal",
    description: "Rund um die Uhr Zugriff auf alle Dokumente, Mieteingänge, Reparaturstatus und Mieterkommunikation. Volle Transparenz in Echtzeit.",
  },
];

const localKnowledge = [
  {
    title: "Wachstumsmarkt Leipzig",
    description: "Mit rund 630.000 Einwohnern ist Leipzig die am schnellsten wachsende Großstadt Deutschlands. Die starke Zuzugsrate sorgt für anhaltend hohe Mieternachfrage — besonders in beliebten Stadtteilen wie Connewitz und Schleußig.",
  },
  {
    title: "Mietrecht in Sachsen",
    description: "Wir prüfen vor jeder Mieterhöhung die rechtlichen Rahmenbedingungen nach § 558 BGB und den aktuellen Mietspiegel Leipzig. Ihre Erträge sind in sicheren Händen.",
  },
  {
    title: "Lokales Handwerkernetzwerk",
    description: "Von Altstadt bis Reudnitz: Unser Netzwerk aus geprüften Handwerkern garantiert schnelle Reaktionszeiten bei Reparaturen und faire Preise — für Ihre Objekte in Leipzig.",
  },
];

export default function HausverwaltungLeipzigPage() {
  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessStructuredData) }}
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
              <span className="text-teal text-sm font-semibold">Hausverwaltung in Leipzig</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 font-serif leading-tight">
              Hausverwaltung Leipzig
              <br />
              <span className="text-teal">die funktioniert.</span>
            </h1>
            <p className="text-lg text-white/75 max-w-2xl mx-auto">
              Professionelle Hausverwaltung für Leipzig. Lokales Know-how, transparente Preise ab 24 €/Einheit, 
              24/7 Erreichbarkeit. Für WEG und Mietverwaltung — von Connewitz über Gohlis bis nach Plagwitz.
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
                Warum Leipzig-Eigentümer einfach verwaltet. wählen
              </h2>
              <p className="text-text-light max-w-xl mx-auto">
                In Deutschlands am schnellsten wachsender Stadt zählt professionelle Verwaltung mehr denn je. 
                Wir kombinieren lokales Know-how mit modernem Service.
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
                  Leipzig-Expertise, die sich auszahlt
                </h2>
                <p className="text-text-light leading-relaxed mb-8">
                  Leipzig boomt. Die starke Zuzugsrate, eine lebendige Kulturszene und wachsende Wirtschaft 
                  machen Leipzig zu einem der attraktivsten Mietmärkte Ostdeutschlands. Von Connewitz und Schleußig 
                  bis Reudnitz und Gohlis — wir kennen die lokalen Besonderheiten.
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
                <h3 className="text-xl font-bold text-navy mb-6 font-serif">Unser Leipzig-Netzwerk</h3>
                <div className="space-y-4 text-text-light">
                  <div className="flex justify-between py-2 border-b border-navy/10">
                    <span>Geprüfte Handwerker</span>
                    <span className="font-semibold text-navy">40+ Partner</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-navy/10">
                    <span>Betreute Stadtteile</span>
                    <span className="font-semibold text-navy">Alle Bezirke</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-navy/10">
                    <span>Durchschnittliche Reaktionszeit</span>
                    <span className="font-semibold text-navy">&lt; 15 Min.</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-navy/10">
                    <span>Nebenkostenabrechnung</span>
                    <span className="font-semibold text-navy">Fristgerecht</span>
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

        {/* Stadtteile */}
        <section className="py-16 lg:py-24 bg-warm-white">
          <div className="max-w-[1100px] mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-navy mb-4 font-serif">
                Mietverwaltung Leipzig — alle Stadtteile
              </h2>
              <p className="text-text-light max-w-xl mx-auto">
                Von der Innenstadt bis zu den Trendvierteln — wir verwalten Ihre Immobilien in ganz Leipzig.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {["Altstadt", "Gohlis", "Connewitz", "Schleußig", "Plagwitz", "Reudnitz", "Lindenau", "Leutzsch", "Eutritzsch"].map((stadtteil) => (
                <div key={stadtteil} className="bg-white rounded-xl p-4 border border-gray-100 text-center">
                  <span className="font-semibold text-navy text-sm">{stadtteil}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-[800px] mx-auto px-6">
            <h2 className="text-3xl font-bold text-navy mb-8 text-center font-serif">
              Häufige Fragen zur Hausverwaltung in Leipzig
            </h2>
            
            <div className="space-y-4">
              <div className="bg-warm-white rounded-xl p-6 border border-gray-100">
                <h3 className="font-bold text-navy mb-2">Was kostet eine Hausverwaltung in Leipzig?</h3>
                <p className="text-text-light text-sm leading-relaxed">
                  Bei einfach verwaltet. kosten unsere Hausverwaltungsleistungen in Leipzig ab 24 € pro Einheit und Monat 
                  für Mietverwaltung, ab 28 € für WEG-Verwaltung. Alle Leistungen inklusive: Mieterkommunikation, 
                  Nebenkostenabrechnung, Instandhaltungskoordination und digitales Eigentümer-Portal. Keine versteckten Kosten.
                </p>
              </div>

              <div className="bg-warm-white rounded-xl p-6 border border-gray-100">
                <h3 className="font-bold text-navy mb-2">Welche Stadtteile in Leipzig betreut einfach verwaltet.?</h3>
                <p className="text-text-light text-sm leading-relaxed">
                  Wir betreuen Immobilien in allen Leipziger Stadtteilen — darunter Altstadt, Gohlis, Connewitz, 
                  Schleußig, Plagwitz und Reudnitz. Als bundesweit aktiver Verwalter sind wir in ganz Sachsen 
                  und darüber hinaus tätig.
                </p>
              </div>

              <div className="bg-warm-white rounded-xl p-6 border border-gray-100">
                <h3 className="font-bold text-navy mb-2">Warum ist Leipzig ein attraktiver Immobilienmarkt?</h3>
                <p className="text-text-light text-sm leading-relaxed">
                  Leipzig ist mit rund 630.000 Einwohnern die am schnellsten wachsende Großstadt Deutschlands. 
                  Die hohe Nachfrage nach Mietwohnungen — besonders in beliebten Stadtteilen wie Connewitz, 
                  Schleußig und Gohlis — macht Leipzig zu einem der interessantesten Märkte für Vermieter. 
                  Eine professionelle Hausverwaltung sichert Ihre Erträge und gibt Ihnen Freiraum.
                </p>
              </div>

              <div className="bg-warm-white rounded-xl p-6 border border-gray-100">
                <h3 className="font-bold text-navy mb-2">Was ist bei der Mietverwaltung in Leipzig inklusive?</h3>
                <p className="text-text-light text-sm leading-relaxed">
                  Unser Service umfasst: 24/7 Mieterkommunikation mit Reaktionszeit unter 15 Minuten, fristgerechte 
                  Nebenkostenabrechnung nach § 556 BGB, Mieterhöhungsmanagement nach § 558 BGB, Instandhaltungskoordination 
                  mit geprüftem Handwerkernetzwerk, digitales Dokumentenportal und monatliche Eigentümerberichte. 
                  Keine Zusatzkosten für Standardleistungen.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-20 bg-navy text-white">
          <div className="max-w-[700px] mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4 font-serif">
              Bereit für eine bessere Hausverwaltung in Leipzig?
            </h2>
            <p className="text-white/75 mb-8">
              Vereinbaren Sie ein kostenloses Erstgespräch. Wir analysieren Ihr Leipziger Portfolio 
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
