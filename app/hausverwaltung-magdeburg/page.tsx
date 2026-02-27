import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Hausverwaltung Magdeburg — einfach verwaltet.",
  description:
    "Professionelle Hausverwaltung in Magdeburg: transparente Preise ab €24/Einheit, 24/7 Erreichbarkeit, lokales Handwerkernetzwerk. Für WEG und Mietverwaltung in der Elbestadt.",
  openGraph: {
    title: "Hausverwaltung Magdeburg — einfach verwaltet.",
    description: "Die moderne Hausverwaltung für Magdeburg. Lokales Know-how, transparente Preise, immer erreichbar.",
    url: "https://einfach-verwaltet.de/hausverwaltung-magdeburg",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "website",
  },
};

const serviceStructuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "einfach verwaltet. — Hausverwaltung Magdeburg",
  "description": "Professionelle Hausverwaltung in Magdeburg für WEG und Mietverwaltung. Transparente Preise ab 24€/Einheit, lokales Know-how, 24/7 Erreichbarkeit.",
  "url": "https://einfach-verwaltet.de/hausverwaltung-magdeburg",
  "telephone": "+49-40-000000",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Hamburg",
    "addressCountry": "DE"
  },
  "areaServed": {
    "@type": "City",
    "name": "Magdeburg"
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
      "name": "Was kostet eine Hausverwaltung in Magdeburg?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bei einfach verwaltet. starten unsere Leistungen ab 24 € pro Einheit und Monat für Mietverwaltung, ab 28 € für WEG-Verwaltung. Alle Kernleistungen sind inklusive: Mieterkommunikation, Nebenkostenabrechnung nach §556 BGB, Mieterhöhungsmanagement, Instandhaltungskoordination und digitales Eigentümerportal.",
      },
    },
    {
      "@type": "Question",
      "name": "Welche Stadtteile in Magdeburg verwaltet einfach verwaltet.?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wir betreuen Objekte in allen Magdeburger Stadtteilen: Altstadt, Buckau, Stadtfeld, Sudenburg, Cracau, Beyendorf-Sohlen und alle weiteren Bezirke. Von der Gründerzeitvilla bis zum Neubau kennen wir den Magdeburger Markt.",
      },
    },
    {
      "@type": "Question",
      "name": "Wie ist der Immobilienmarkt in Magdeburg 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Magdeburg ist die Landeshauptstadt Sachsen-Anhalts und verzeichnet seit Jahren wachsende Mietnachfrage, getrieben durch die Universität Magdeburg, die OVGU und wachsende Unternehsen wie Intel (Chip-Werk). Die Mietpreise liegen bei 7–12 €/m² nettokalt — mit Potenzial nach oben. Leerstand konzentriert sich auf periphere Lagen, Innenstadtlagen sind gut vermietet.",
      },
    },
    {
      "@type": "Question",
      "name": "Gibt es in Magdeburg eine Mietpreisbremse?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nein, in Magdeburg gilt derzeit keine Mietpreisbremse nach §556d BGB. Sachsen-Anhalt hat keine Mietpreisbremsenverordnung erlassen, da der Wohnungsmarkt nicht als angespannt gilt. Mieterhöhungen sind daher nach §558 BGB (bis zur ortsüblichen Vergleichsmiete, Kappungsgrenze 20 % in 3 Jahren) möglich.",
      },
    },
    {
      "@type": "Question",
      "name": "Welche Besonderheiten hat die Immobilienverwaltung in Magdeburg gegenüber Westdeutschland?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Magdeburg hat einen hohen Anteil an Plattenbauten (WBS 70) und Gründerzeitgebäuden, die spezifisches Know-how bei Sanierung und Instandhaltung erfordern. Der Markt ist preissensibler als westdeutsche Großstädte. Gleichzeitig bieten Bestandsimmobilien in zentralen Lagen attraktive Renditen für Eigentümer.",
      },
    },
  ],
};

const features = [
  {
    title: "Magdeburg-lokales Know-how",
    description: "Wir kennen den Magdeburger Markt — von Gründerzeit-Altbauten in der Altstadt bis zu Neubauten in Stadtfeld. Kein Mietpreisbremse-Stress, aber rechtssichere Mieterhöhungen nach §558 BGB.",
  },
  {
    title: "Transparente Pauschalpreise",
    description: "Ab 24 €/Einheit/Monat ohne Extragebühren. Alle Kernleistungen inklusive — gerade für Eigentümer in Ostdeutschland, wo günstige Verwaltungskosten die Rendite entscheidend beeinflussen.",
  },
  {
    title: "24/7 Erreichbarkeit",
    description: "Mieteranfragen werden innerhalb von 15 Minuten bestätigt. Notfälle sofort bearbeitet. Keine Wartezeiten — auch in Magdeburg.",
  },
  {
    title: "Digitales Eigentümerportal",
    description: "Echtzeit-Einblick in Mieteingänge, Reparaturstatus und alle Dokumente — ob Sie in Magdeburg wohnen oder Ihren Bestand aus Hamburg verwalten lassen.",
  },
];

const localKnowledge = [
  {
    title: "Wachsender Mietmarkt",
    description: "Intel-Ansiedlung und Universitätswachstum treiben die Mietnachfrage in Magdeburg. Für Vermieter entstehen neue Chancen — wir helfen, sie rechtssicher zu nutzen.",
  },
  {
    title: "Bestandsgebäude-Expertise",
    description: "Magdeburg hat viele WBS-70-Plattenbauten und Gründerzeithäuser. Unsere Handwerker kennen diese Bautypen und arbeiten effizient und kostenbewusst.",
  },
  {
    title: "Kein Mietpreisbremse-Risiko",
    description: "In Sachsen-Anhalt gilt keine Mietpreisbremse. Wir nutzen den §558-Spielraum optimal — mit korrekter Mietspiegel-Analyse und vollständiger Begründungsdokumentation.",
  },
];

export default function HausverwaltungMagdeburgPage() {
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
              <span className="text-teal text-sm font-semibold">Hausverwaltung in Magdeburg</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 font-serif leading-tight">
              Hausverwaltung Magdeburg
              <br />
              <span className="text-teal">die funktioniert.</span>
            </h1>
            <p className="text-lg text-white/75 max-w-2xl mx-auto">
              Professionelle Hausverwaltung für die Landeshauptstadt Sachsen-Anhalts. 
              Lokales Know-how, transparente Preise ab 24 €/Einheit, 24/7 Erreichbarkeit. 
              Für WEG und Mietverwaltung — von der Altstadt bis Stadtfeld.
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
                <div className="text-2xl font-bold text-navy font-serif">~240.000</div>
                <div className="text-text-light text-sm">Einwohner</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-navy font-serif">7–12 €</div>
                <div className="text-text-light text-sm">Nettokaltmiete/m²</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-navy font-serif">Kein Bremse</div>
                <div className="text-text-light text-sm">Keine Mietpreisbremse in SA</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-navy font-serif">Wachsend</div>
                <div className="text-text-light text-sm">Intel-Effekt + Universität</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 lg:py-24 bg-warm-white">
          <div className="max-w-[1100px] mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-navy mb-4 font-serif">
                Warum Magdeburger Eigentümer einfach verwaltet. wählen
              </h2>
              <p className="text-text-light max-w-xl mx-auto">
                Magdeburg wächst. Mit einem erfahrenen Verwalter sichern Sie Ihren Bestand optimal ab — 
                zu fairen, transparenten Konditionen.
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
                  Magdeburg-Expertise, die sich auszahlt
                </h2>
                <p className="text-text-light leading-relaxed mb-8">
                  Die Elbestadt bietet Immobilieneigentümern attraktive Renditen — besonders seit der 
                  Intel-Ansiedlung und dem Wachstum der Universität Magdeburg. Wir kennen die lokale 
                  Marktdynamik und helfen Ihnen, Ihr Portfolio optimal zu verwalten.
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
                <h3 className="text-xl font-bold text-navy mb-6 font-serif">Unser Magdeburger Service</h3>
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
                    <span>Mieterhöhungen nach §558</span>
                    <span className="font-semibold text-navy">Rechtssicher</span>
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
              Häufige Fragen zur Hausverwaltung in Magdeburg
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
              Bereit für eine bessere Hausverwaltung in Magdeburg?
            </h2>
            <p className="text-white/75 mb-8">
              Vereinbaren Sie ein kostenloses Erstgespräch. Wir analysieren Ihr Magdeburger Portfolio 
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
