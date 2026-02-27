import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Hausverwaltung Hannover — einfach verwaltet.",
  description:
    "Professionelle Hausverwaltung in Hannover: transparente Preise ab €24/Einheit, 24/7 Erreichbarkeit, lokales Handwerkernetzwerk. Für WEG und Mietverwaltung in Niedersachsen.",
  openGraph: {
    title: "Hausverwaltung Hannover — einfach verwaltet.",
    description: "Die moderne Hausverwaltung für Hannover. Lokales Know-how, transparente Preise, immer erreichbar.",
    url: "https://einfach-verwaltet.de/hausverwaltung-hannover",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "website",
  },
};

// Schema.org LocalBusiness for Hannover
const localBusinessStructuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "einfach verwaltet. — Hausverwaltung Hannover",
  "description": "Professionelle Hausverwaltung in Hannover für WEG und Mietverwaltung. Transparente Preise, lokales Know-how, 24/7 Erreichbarkeit.",
  "url": "https://einfach-verwaltet.de/hausverwaltung-hannover",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Hannover",
    "addressRegion": "Niedersachsen",
    "addressCountry": "DE"
  },
  "areaServed": {
    "@type": "City",
    "name": "Hannover"
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

// Schema.org FAQPage for Hannover
const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Was kostet eine Hausverwaltung in Hannover?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bei einfach verwaltet. kosten unsere Hausverwaltungsleistungen in Hannover ab 24 € pro Einheit und Monat für Mietverwaltung, ab 28 € für WEG-Verwaltung. Alle Standardleistungen sind inklusive: Mieterkommunikation, Nebenkostenabrechnung nach § 556 BGB, Instandhaltungskoordination und digitales Eigentümer-Portal. Keine versteckten Kosten.",
      },
    },
    {
      "@type": "Question",
      "name": "Welche Stadtteile in Hannover betreut einfach verwaltet.?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wir betreuen Immobilien in allen Hannoveraner Stadtteilen — darunter Mitte, Linden, Südstadt, Vahrenwald, List und Ricklingen. Als bundesweit aktiver Verwalter sind wir in ganz Niedersachsen und darüber hinaus tätig.",
      },
    },
    {
      "@type": "Question",
      "name": "Wie funktioniert der Wechsel der Hausverwaltung in Hannover?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Der Wechsel zu einfach verwaltet. dauert in der Regel 4–8 Wochen. Nach Ihrer Kündigung beim bisherigen Verwalter übernehmen wir die komplette Dokumentation, informieren alle Mieter und koordinieren die Übergabe. Wir begleiten Sie durch jeden Schritt — ohne Extrakosten.",
      },
    },
  ],
};

const features = [
  {
    title: "Hannover-lokales Know-how",
    description: "Wir kennen den Hannoveraner Mietmarkt — von der Mietpreisbremse bis zum lokalen Mietspiegel. Egal ob Mitte, Linden, Südstadt oder Vahrenwald.",
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
    title: "Mietpreisbremse Hannover",
    description: "Hannover verfügt über angespannte Wohnungsmärkte in vielen Stadtteilen. Wir prüfen vor jeder Mieterhöhung die rechtlichen Rahmenbedingungen nach § 558 BGB und sichern Ihre Erträge ab.",
  },
  {
    title: "Niedersächsischer Mietmarkt",
    description: "Mit rund 535.000 Einwohnern ist Hannover die größte Stadt Niedersachsens und ein bedeutender Mietmarkt — mit starker Nachfrage in den innenstadtnahen Stadtteilen List, Linden und Südstadt.",
  },
  {
    title: "Lokales Handwerkernetzwerk",
    description: "Von Mitte bis Ricklingen: Unser Netzwerk aus geprüften Handwerkern garantiert schnelle Reaktionszeiten bei Reparaturen und faire Preise — für Ihre Objekte in Hannover.",
  },
];

export default function HausverwaltungHannoverPage() {
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
              <span className="text-teal text-sm font-semibold">Hausverwaltung in Hannover</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 font-serif leading-tight">
              Hausverwaltung Hannover
              <br />
              <span className="text-teal">die funktioniert.</span>
            </h1>
            <p className="text-lg text-white/75 max-w-2xl mx-auto">
              Professionelle Hausverwaltung für Hannover. Lokales Know-how, transparente Preise ab 24 €/Einheit, 
              24/7 Erreichbarkeit. Für WEG und Mietverwaltung — von Mitte über Linden bis nach Ricklingen.
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
                Warum Hannover-Eigentümer einfach verwaltet. wählen
              </h2>
              <p className="text-text-light max-w-xl mx-auto">
                In Hannovers wachsendem Mietmarkt zählt jede Minute. 
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
                  Hannover-Expertise, die sich auszahlt
                </h2>
                <p className="text-text-light leading-relaxed mb-8">
                  Hannovers Immobilienmarkt wächst. Von den angespannten Wohnlagen in List und Linden über die 
                  ruhigeren Stadtteile Vahrenwald und Ricklingen bis zur Südstadt — wir kennen die lokalen 
                  Besonderheiten und arbeiten für Ihre Rendite.
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
                <h3 className="text-xl font-bold text-navy mb-6 font-serif">Unser Hannover-Netzwerk</h3>
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
                Mietverwaltung Hannover — alle Stadtteile
              </h2>
              <p className="text-text-light max-w-xl mx-auto">
                Von der Innenstadt bis zu den Außenbezirken — wir verwalten Ihre Immobilien in ganz Hannover.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {["Mitte", "Linden", "Südstadt", "Vahrenwald", "List", "Ricklingen", "Misburg", "Bothfeld", "Stöcken"].map((stadtteil) => (
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
              Häufige Fragen zur Hausverwaltung in Hannover
            </h2>
            
            <div className="space-y-4">
              <div className="bg-warm-white rounded-xl p-6 border border-gray-100">
                <h3 className="font-bold text-navy mb-2">Was kostet eine Hausverwaltung in Hannover?</h3>
                <p className="text-text-light text-sm leading-relaxed">
                  Bei einfach verwaltet. kosten unsere Hausverwaltungsleistungen in Hannover ab 24 € pro Einheit und Monat 
                  für Mietverwaltung, ab 28 € für WEG-Verwaltung. Alle Leistungen inklusive: Mieterkommunikation, 
                  Nebenkostenabrechnung, Instandhaltungskoordination und digitales Eigentümer-Portal. Keine versteckten Kosten.
                </p>
              </div>

              <div className="bg-warm-white rounded-xl p-6 border border-gray-100">
                <h3 className="font-bold text-navy mb-2">Welche Stadtteile in Hannover betreut einfach verwaltet.?</h3>
                <p className="text-text-light text-sm leading-relaxed">
                  Wir betreuen Immobilien in allen Hannoveraner Stadtteilen — darunter Mitte, Linden, Südstadt, 
                  Vahrenwald, List und Ricklingen. Als bundesweit aktiver Verwalter sind wir in ganz Niedersachsen 
                  und darüber hinaus tätig.
                </p>
              </div>

              <div className="bg-warm-white rounded-xl p-6 border border-gray-100">
                <h3 className="font-bold text-navy mb-2">Wie funktioniert der Wechsel der Hausverwaltung in Hannover?</h3>
                <p className="text-text-light text-sm leading-relaxed">
                  Der Wechsel zu einfach verwaltet. dauert in der Regel 4–8 Wochen. Nach Ihrer Kündigung beim bisherigen 
                  Verwalter übernehmen wir die komplette Dokumentation, informieren alle Mieter und koordinieren die 
                  Übergabe. Wir begleiten Sie durch jeden Schritt — ohne Extrakosten.
                </p>
              </div>

              <div className="bg-warm-white rounded-xl p-6 border border-gray-100">
                <h3 className="font-bold text-navy mb-2">Was ist bei der Mietverwaltung in Hannover inklusive?</h3>
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
              Bereit für eine bessere Hausverwaltung in Hannover?
            </h2>
            <p className="text-white/75 mb-8">
              Vereinbaren Sie ein kostenloses Erstgespräch. Wir analysieren Ihr Hannoveraner Portfolio 
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
