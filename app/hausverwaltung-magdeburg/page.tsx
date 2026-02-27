import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Hausverwaltung Magdeburg — einfach verwaltet.",
  description:
    "Professionelle Hausverwaltung in Magdeburg: transparente Preise ab €24/Einheit, 24/7 Erreichbarkeit, lokales Handwerkernetzwerk. Für WEG und Mietverwaltung in Magdeburg.",
  openGraph: {
    title: "Hausverwaltung Magdeburg — einfach verwaltet.",
    description: "Die moderne Hausverwaltung für Magdeburg. Lokales Know-how, transparente Preise, immer erreichbar.",
    url: "https://einfach-verwaltet.de/hausverwaltung-magdeburg",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "website",
  },
};

const localBusinessData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "einfach verwaltet. — Hausverwaltung Magdeburg",
  "description": "Professionelle Hausverwaltung in Magdeburg für WEG und Mietverwaltung. Transparente Preise, lokales Know-how, 24/7 Erreichbarkeit.",
  "url": "https://einfach-verwaltet.de/hausverwaltung-magdeburg",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Magdeburg",
    "addressRegion": "Sachsen-Anhalt",
    "addressCountry": "DE"
  },
  "areaServed": {
    "@type": "City",
    "name": "Magdeburg"
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
      "name": "Was kostet eine Hausverwaltung in Magdeburg?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In Magdeburg kosten professionelle Hausverwaltungsleistungen bei einfach verwaltet. ab 24 € pro Einheit und Monat für Mietverwaltung, ab 28 € für WEG-Verwaltung. Alle Leistungen inklusive: Mieterkommunikation, Nebenkostenabrechnung, Instandhaltungskoordination und digitales Eigentümer-Portal. Keine versteckten Kosten.",
      },
    },
    {
      "@type": "Question",
      "name": "Welche Stadtteile in Magdeburg betreuen Sie?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wir betreuen Immobilien in ganz Magdeburg: Altstadt, Stadtfeld Ost und West, Sudenburg, Buckau, Cracau, Herrenkrug, Wilhelmstadt, Neue Neustadt und allen anderen Stadtbezirken. Auch Objekte im Umland von Magdeburg sind möglich.",
      },
    },
    {
      "@type": "Question",
      "name": "Gibt es in Magdeburg besondere Mietrecht-Regelungen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Magdeburg liegt in Sachsen-Anhalt, einem Bundesland ohne aktive Mietpreisbremseverordnung. Das bedeutet: keine 10%-Kappung bei Neuvermietung, aber bundesweites Mietrecht (§558 BGB) gilt weiterhin für Mieterhöhungen im Bestand. Wir kennen die lokalen Besonderheiten und den Magdeburger Mietspiegel.",
      },
    },
    {
      "@type": "Question",
      "name": "Wie ist der Magdeburger Immobilienmarkt 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Magdeburg ist die Landeshauptstadt von Sachsen-Anhalt mit ca. 240.000 Einwohnern. Der Immobilienmarkt ist im Vergleich zu westdeutschen Großstädten günstiger, zeigt aber Stabilisierungstendenzen. Leerstandsquoten sind in bestimmten Lagen rückläufig. Für Investoren bietet Magdeburg attraktive Renditen.",
      },
    },
    {
      "@type": "Question",
      "name": "Betreuen Sie auch Altbauimmobilien in Magdeburg?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, wir haben Erfahrung mit dem typischen Magdeburger Gebäudebestand: Gründerzeit-Altbauten in Sudenburg und Stadtfeld, DDR-Plattenbauten in Neustädter See-Nähe sowie modernisierte Wohnbestände. Wir kennen die spezifischen Instandhaltungsanforderungen dieser Gebäudetypen.",
      },
    },
    {
      "@type": "Question",
      "name": "Wie lange dauert der Verwalterwechsel in Magdeburg?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ein Verwalterwechsel in Magdeburg dauert in der Regel 4–8 Wochen. Nach Ihrer Kündigung beim bisherigen Verwalter übernehmen wir die gesamte Dokumentation, informieren alle Mieter und koordinieren die reibungslose Übergabe.",
      },
    },
  ],
};

const features = [
  {
    title: "Magdeburg-lokales Know-how",
    description: "Wir kennen den Magdeburger Immobilienmarkt — von der gründerzeitlichen Sudenburg über die Neue Neustadt bis zu modernisierten Beständen im Stadtfeld. Kein bundesweiter Einheitsbrei, sondern echter Lokalmarkt-Expertise.",
  },
  {
    title: "Transparente Pauschalpreise",
    description: "Ab 24 €/Einheit/Monat für Mietverwaltung. Alle Leistungen inklusive — keine Sondervergütungen, keine Jahresgespräch-Gebühren, keine Überraschungen bei der Jahresrechnung.",
  },
  {
    title: "24/7 Mieterkommunikation",
    description: "Mieteranfragen werden innerhalb von 15 Minuten bestätigt. Kein Anrufbeantworter, keine Mailbox. Direkter Kontakt zu Ihrem persönlichen Verwalter — an 365 Tagen im Jahr.",
  },
  {
    title: "Digitales Eigentümer-Portal",
    description: "Echtzeit-Einblick in Mieteingänge, Reparaturstatus, Abrechnungen und alle Dokumente. Volle Transparenz über Ihr Magdeburger Portfolio — jederzeit, von überall.",
  },
];

const localKnowledge = [
  {
    title: "Kein Mietpreisbremselandrecht in Sachsen-Anhalt",
    description: "In Magdeburg gilt keine Mietpreisbremse — das eröffnet bei Neuvermietungen mehr Spielraum. Wir kennen die Marktpreise und helfen Ihnen, Mieten marktgerecht anzusetzen, ohne dabei rechtliche Grenzen zu übersehen.",
  },
  {
    title: "Magdeburger Altbaubestand",
    description: "Viele Magdeburger Immobilien sind Gründerzeit-Altbauten oder modernisierte DDR-Bestände. Wir kennen die typischen Instandhaltungsthemen und haben geprüfte Handwerkerpartner vor Ort.",
  },
  {
    title: "Lokales Handwerkernetzwerk Magdeburg",
    description: "Von der Altstadt bis nach Cracau: Unser Netzwerk aus geprüften Magdeburger Handwerkern gewährleistet schnelle Reaktionszeiten und faire Preise — keine überregionalen Aufschläge.",
  },
];

const magdeburgMarketData = [
  { label: "Bevölkerung", value: "ca. 240.000 Einw." },
  { label: "Bundesland", value: "Sachsen-Anhalt" },
  { label: "Ø Kaltmiete (2026)", value: "ca. 7–11 €/m²" },
  { label: "Mietpreisbremse", value: "Nicht aktiv" },
  { label: "Betreute Stadtteile", value: "Alle Bezirke" },
  { label: "Reaktionszeit", value: "< 15 Min." },
];

export default function HausverwaltungMagdeburgPage() {
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
              <span className="text-teal text-sm font-semibold">Hausverwaltung in Magdeburg</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 font-serif leading-tight">
              Hausverwaltung Magdeburg
              <br />
              <span className="text-teal">die funktioniert.</span>
            </h1>
            <p className="text-lg text-white/75 max-w-2xl mx-auto">
              Professionelle Hausverwaltung für Magdeburg. Lokales Know-how, transparente Preise ab 24 €/Einheit, 
              24/7 Erreichbarkeit. Für WEG und Mietverwaltung — von Sudenburg bis zur Neuen Neustadt.
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
                Warum Magdeburger Eigentümer einfach verwaltet. wählen
              </h2>
              <p className="text-text-light max-w-xl mx-auto">
                In Magdeburgs Immobilienmarkt mit seinen Besonderheiten als ostdeutsche Landeshauptstadt 
                zählt lokale Expertise besonders. Wir kennen den Markt.
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
                  Magdeburgs Immobilienmarkt hat seine eigenen Gesetze: attraktive Renditeobjekte, 
                  ein starkes Gründerzeit-Erbe in Stadtfeld und Sudenburg, und wachsende Nachfrage 
                  durch die Hochschulen und den öffentlichen Sektor als Arbeitgeber. 
                  Wir kennen jedes dieser Facetten.
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
                <h3 className="text-xl font-bold text-navy mb-6 font-serif">Magdeburg im Überblick</h3>
                <div className="space-y-4 text-text-light">
                  {magdeburgMarketData.map((item, i) => (
                    <div
                      key={item.label}
                      className={`flex justify-between py-2 ${i < magdeburgMarketData.length - 1 ? "border-b border-navy/10" : ""}`}
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
                Der Magdeburger Immobilienmarkt 2026
              </h2>
              <p className="text-text-light max-w-2xl mx-auto">
                Magdeburg bietet Vermietern interessante Renditepotenziale: günstigere Kaufpreise 
                als westdeutsche Vergleichsstädte bei stabiler Mieternachfrage.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 text-center">
                <div className="text-3xl font-bold text-teal mb-2">~240.000</div>
                <div className="text-text-light text-sm">Einwohner — Landeshauptstadt Sachsen-Anhalts</div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 text-center">
                <div className="text-3xl font-bold text-teal mb-2">7–11 €</div>
                <div className="text-text-light text-sm">Ø Kaltmiete pro m² — attraktive Investitionsrenditen [Schätzung]</div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 text-center">
                <div className="text-3xl font-bold text-teal mb-2">Keine</div>
                <div className="text-text-light text-sm">Mietpreisbremse in Sachsen-Anhalt — mehr Spielraum bei Neuvermietung</div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-[800px] mx-auto px-6">
            <h2 className="text-3xl font-bold text-navy mb-8 text-center font-serif">
              Häufige Fragen zur Hausverwaltung in Magdeburg
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: "Was kostet eine Hausverwaltung in Magdeburg?",
                  a: "Bei einfach verwaltet. kosten Hausverwaltungsleistungen ab 24 € pro Einheit und Monat für Mietverwaltung, ab 28 € für WEG-Verwaltung. Alle Leistungen inklusive — keine versteckten Kosten.",
                },
                {
                  q: "Welche Stadtteile in Magdeburg betreuen Sie?",
                  a: "Wir betreuen Immobilien in ganz Magdeburg: Altstadt, Stadtfeld, Sudenburg, Buckau, Cracau, Herrenkrug, Wilhelmstadt, Neue Neustadt und allen anderen Stadtbezirken.",
                },
                {
                  q: "Gibt es in Magdeburg besondere Mietrecht-Regelungen?",
                  a: "Magdeburg liegt in Sachsen-Anhalt, einem Bundesland ohne aktive Mietpreisbremseverordnung. Das bedeutet mehr Spielraum bei Neuvermietungen. Bundesweites Mietrecht (§558 BGB) gilt natürlich weiterhin für Mieterhöhungen im Bestand.",
                },
                {
                  q: "Betreuen Sie auch Altbauimmobilien in Magdeburg?",
                  a: "Ja, wir haben Erfahrung mit Gründerzeit-Altbauten in Sudenburg und Stadtfeld sowie mit DDR-Plattenbauten und modernisierten Beständen. Wir kennen die spezifischen Instandhaltungsanforderungen dieser Gebäudetypen.",
                },
                {
                  q: "Wie ist der Magdeburger Immobilienmarkt 2026?",
                  a: "Magdeburg bietet als ostdeutsche Landeshauptstadt attraktive Renditeobjekte — günstigere Kaufpreise als westdeutsche Vergleichsstädte bei stabiler Mieternachfrage durch Universitäten und öffentlichen Sektor.",
                },
                {
                  q: "Wie lange dauert der Verwalterwechsel in Magdeburg?",
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
