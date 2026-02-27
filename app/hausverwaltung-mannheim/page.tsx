import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Hausverwaltung Mannheim — einfach verwaltet.",
  description:
    "Professionelle Hausverwaltung in Mannheim: transparente Preise ab €24/Einheit, 24/7 Erreichbarkeit, lokales Netzwerk. Für WEG und Mietverwaltung in Mannheim und Umgebung.",
  openGraph: {
    title: "Hausverwaltung Mannheim — einfach verwaltet.",
    description: "Die moderne Hausverwaltung für Mannheim. Lokales Know-how, transparente Preise, immer erreichbar.",
    url: "https://einfach-verwaltet.de/hausverwaltung-mannheim",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "website",
  },
};

const localBusinessData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "einfach verwaltet. — Hausverwaltung Mannheim",
  "description": "Professionelle Hausverwaltung in Mannheim für WEG und Mietverwaltung. Transparente Preise, lokales Know-how, 24/7 Erreichbarkeit.",
  "url": "https://einfach-verwaltet.de/hausverwaltung-mannheim",
  "telephone": "+49-40-000000",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Mannheim",
    "addressRegion": "Baden-Württemberg",
    "addressCountry": "DE"
  },
  "areaServed": {
    "@type": "City",
    "name": "Mannheim"
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
      "name": "Was kostet eine Hausverwaltung in Mannheim?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In Mannheim kosten professionelle Hausverwaltungsleistungen bei einfach verwaltet. ab 24 € pro Einheit und Monat für Mietverwaltung, ab 28 € für WEG-Verwaltung. Alle Leistungen inklusive: Mieterkommunikation, Nebenkostenabrechnung, Instandhaltungskoordination und digitales Eigentümer-Portal. Keine versteckten Kosten.",
      },
    },
    {
      "@type": "Question",
      "name": "Welche Stadtteile in Mannheim betreuen Sie?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wir betreuen Immobilien in ganz Mannheim: Quadrate (Innenstadt), Lindenhof, Neuostheim, Schwetzingerstadt, Neckarstadt, Sandhofen, Waldhof, Rheinau und allen anderen Stadtbezirken. Auch Objekte in Ludwigshafen und dem Rhein-Neckar-Kreis sind möglich.",
      },
    },
    {
      "@type": "Question",
      "name": "Gibt es in Mannheim eine Mietpreisbremse?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, Mannheim liegt in Baden-Württemberg, das eine Mietpreisbremseverordnung eingeführt hat. In bestimmten Lagen gilt daher die gesetzliche Mietpreisbremse nach § 556d BGB. Bei Neuvermietungen darf die Miete maximal 10 % über der ortsüblichen Vergleichsmiete liegen. Wir prüfen dies bei jeder Neuvermietung automatisch.",
      },
    },
    {
      "@type": "Question",
      "name": "Wie lange dauert der Wechsel der Hausverwaltung in Mannheim?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ein Verwalterwechsel in Mannheim dauert in der Regel 4–8 Wochen. Nach Ihrer Kündigung beim bisherigen Verwalter übernehmen wir die Dokumentation, informieren alle Mieter und koordinieren die Übergabe vollständig.",
      },
    },
    {
      "@type": "Question",
      "name": "Betreuen Sie auch WEG-Objekte in Mannheim?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, wir betreuen sowohl WEG-Objekte (Wohnungseigentümergemeinschaften) als auch reine Mietobjekte in Mannheim. WEG-Verwaltung ab 28 €/Einheit/Monat, inklusive Eigentümerversammlungen, Beschlussbuchhaltung und Rücklagenverwaltung.",
      },
    },
    {
      "@type": "Question",
      "name": "Was ist beim Mannheimer Mietspiegel zu beachten?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Der Mannheimer Mietspiegel dient als Grundlage für Mieterhöhungen nach §558 BGB. Wir analysieren regelmäßig die aktuellen Vergleichsmieten in Mannheim und unterstützen Sie dabei, Mieterhöhungen rechtskonform und renditeoptimierend durchzusetzen.",
      },
    },
  ],
};

const features = [
  {
    title: "Mannheim-lokales Know-how",
    description: "Wir kennen den Mannheimer Immobilienmarkt — von den Quadraten über Lindenhof bis zur Neckarstadt. Lokale Besonderheiten wie Mietpreisbremse und Mannheimer Mietspiegel sind unser tägliches Geschäft.",
  },
  {
    title: "Transparente Preise ohne Extras",
    description: "Ab 24 €/Einheit/Monat für Mietverwaltung. Alle Kosten auf einen Blick — keine Sondervergütungen für Eigentümerversammlungen, Wohnungsübergaben oder Mieterhöhungen.",
  },
  {
    title: "24/7 Erreichbarkeit",
    description: "Mieteranfragen werden innerhalb von 15 Minuten bestätigt. Kein Anrufbeantworter, keine Warteschleifen. Rückrufe am selben Werktag — garantiert.",
  },
  {
    title: "Digitales Eigentümer-Portal",
    description: "Rund um die Uhr Zugriff auf Mieteingänge, Abrechnungen, Reparaturstatus und alle Dokumente. Volle Transparenz über Ihr Mannheimer Portfolio in Echtzeit.",
  },
];

const localKnowledge = [
  {
    title: "Mietpreisbremse Baden-Württemberg",
    description: "Mannheim liegt im Anwendungsbereich der Mietpreisbremse nach §556d BGB. Wir prüfen vor jeder Neuvermietung die ortsübliche Vergleichsmiete und sichern Ihre Rendite innerhalb des rechtlichen Rahmens.",
  },
  {
    title: "Mannheimer Mietspiegel",
    description: "Der aktuelle Mannheimer Mietspiegel ist Grundlage für Mieterhöhungen nach §558 BGB. Wir kennen die Mietspiegel-Tabellen und maximieren Ihre Mieteinnahmen rechtssicher.",
  },
  {
    title: "Lokales Handwerkernetzwerk",
    description: "Von den Quadraten bis nach Sandhofen: Unser Netzwerk aus geprüften Mannheimer Handwerkern garantiert schnelle Reaktionszeiten bei Reparaturen und faire Preise ohne Provisionen.",
  },
];

const mannheimMarketData = [
  { label: "Bevölkerung", value: "ca. 320.000 Einw." },
  { label: "Bundesland", value: "Baden-Württemberg" },
  { label: "Ø Kaltmiete (2026)", value: "ca. 12–16 €/m²" },
  { label: "Leerstandsquote", value: "< 3 % (zentral)" },
  { label: "Betreute Stadtteile", value: "Alle Bezirke" },
  { label: "Reaktionszeit", value: "< 15 Min." },
];

export default function HausverwaltungMannheimPage() {
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
              <span className="text-teal text-sm font-semibold">Hausverwaltung in Mannheim</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 font-serif leading-tight">
              Hausverwaltung Mannheim
              <br />
              <span className="text-teal">die funktioniert.</span>
            </h1>
            <p className="text-lg text-white/75 max-w-2xl mx-auto">
              Professionelle Hausverwaltung für Mannheim. Lokales Know-how, transparente Preise ab 24 €/Einheit, 
              24/7 Erreichbarkeit. Für WEG und Mietverwaltung — von den Quadraten bis zur Neckarstadt.
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
                Warum Mannheimer Eigentümer einfach verwaltet. wählen
              </h2>
              <p className="text-text-light max-w-xl mx-auto">
                In Mannheims wachsendem Immobilienmarkt zählt lokale Expertise. 
                Wir kombinieren Mannheimer Marktkenntnisse mit modernem Service.
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
                  Mannheim-Expertise, die sich auszahlt
                </h2>
                <p className="text-text-light leading-relaxed mb-8">
                  Mannheims Immobilienmarkt ist einzigartig: die historischen Quadrate in der Innenstadt, 
                  die begehrten Lagen in Lindenhof und Neuostheim, die aufstrebende Schwetzingerstadt — 
                  jedes Viertel hat seine eigenen Besonderheiten. Wir kennen sie alle.
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
                <h3 className="text-xl font-bold text-navy mb-6 font-serif">Mannheim im Überblick</h3>
                <div className="space-y-4 text-text-light">
                  {mannheimMarketData.map((item, i) => (
                    <div
                      key={item.label}
                      className={`flex justify-between py-2 ${i < mannheimMarketData.length - 1 ? "border-b border-navy/10" : ""}`}
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
                Der Mannheimer Immobilienmarkt 2026
              </h2>
              <p className="text-text-light max-w-2xl mx-auto">
                Mannheim wächst: Als drittgrößte Stadt Baden-Württembergs und Zentrum der 
                Metropolregion Rhein-Neckar zieht die Stadt weiterhin Zuzügler aus der Region an.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 text-center">
                <div className="text-3xl font-bold text-teal mb-2">~320.000</div>
                <div className="text-text-light text-sm">Einwohner — wachsende Nachfrage nach Mietwohnungen</div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 text-center">
                <div className="text-3xl font-bold text-teal mb-2">12–16 €</div>
                <div className="text-text-light text-sm">Ø Kaltmiete pro m² — je nach Lage und Ausstattung [Schätzung]</div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 text-center">
                <div className="text-3xl font-bold text-teal mb-2">Mietpreisbremse</div>
                <div className="text-text-light text-sm">Baden-Württemberg hat aktive Mietpreisbremsezonen</div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-[800px] mx-auto px-6">
            <h2 className="text-3xl font-bold text-navy mb-8 text-center font-serif">
              Häufige Fragen zur Hausverwaltung in Mannheim
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: "Was kostet eine Hausverwaltung in Mannheim?",
                  a: "Bei einfach verwaltet. kosten unsere Hausverwaltungsleistungen ab 24 € pro Einheit und Monat für Mietverwaltung, ab 28 € für WEG-Verwaltung. Alle Leistungen inklusive: Mieterkommunikation, Nebenkostenabrechnung, Instandhaltungskoordination und digitales Eigentümer-Portal. Keine versteckten Kosten.",
                },
                {
                  q: "Welche Stadtteile in Mannheim betreuen Sie?",
                  a: "Wir betreuen Immobilien in ganz Mannheim: Quadrate, Lindenhof, Neuostheim, Schwetzingerstadt, Neckarstadt, Sandhofen, Waldhof, Rheinau und allen anderen Stadtbezirken.",
                },
                {
                  q: "Gibt es in Mannheim eine Mietpreisbremse?",
                  a: "Ja, Mannheim liegt im Anwendungsbereich der Mietpreisbremse nach §556d BGB. Bei Neuvermietungen darf die Miete maximal 10 % über der ortsüblichen Vergleichsmiete liegen. Wir prüfen dies bei jeder Neuvermietung automatisch.",
                },
                {
                  q: "Wie lange dauert der Wechsel der Hausverwaltung in Mannheim?",
                  a: "Ein Verwalterwechsel in Mannheim dauert in der Regel 4–8 Wochen. Nach Ihrer Kündigung beim bisherigen Verwalter übernehmen wir die Dokumentation, informieren alle Mieter und koordinieren die Übergabe vollständig.",
                },
                {
                  q: "Betreuen Sie auch WEG-Objekte in Mannheim?",
                  a: "Ja, wir betreuen sowohl WEG-Objekte als auch reine Mietobjekte in Mannheim. WEG-Verwaltung ab 28 €/Einheit/Monat, inklusive Eigentümerversammlungen, Beschlussbuchhaltung und Rücklagenverwaltung.",
                },
                {
                  q: "Was ist beim Mannheimer Mietspiegel zu beachten?",
                  a: "Der Mannheimer Mietspiegel ist Grundlage für Mieterhöhungen nach §558 BGB. Wir analysieren regelmäßig die aktuellen Vergleichsmieten und unterstützen Sie dabei, Mieterhöhungen rechtskonform und renditeoptimierend durchzusetzen.",
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
              Bereit für eine bessere Hausverwaltung in Mannheim?
            </h2>
            <p className="text-white/75 mb-8">
              Vereinbaren Sie ein kostenloses Erstgespräch. Wir analysieren Ihr Mannheimer Portfolio 
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
