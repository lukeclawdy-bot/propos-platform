import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  CheckIcon,
  ArrowRightIcon,
  BuildingIcon,
  ShieldIcon,
  ClockIcon,
  StarIcon,
} from "@/components/Icons";

export const metadata: Metadata = {
  title: "Hausverwaltung Nürnberg | einfach verwaltet.",
  description:
    "Professionelle Hausverwaltung in Nürnberg — WEG & Mietverwaltung ab €24/Einheit. 24h Reaktionszeit, lokales Netzwerk. Jetzt kostenloses Angebot anfragen.",
  alternates: {
    canonical: "https://einfach-verwaltet.de/hausverwaltung-nuernberg",
  },
  openGraph: {
    title: "Hausverwaltung Nürnberg | einfach verwaltet.",
    description:
      "Hausverwaltung in Nürnberg für WEG & Mietverwaltung. Digital, transparent, ab €24/Einheit. Jetzt Angebot sichern.",
    url: "https://einfach-verwaltet.de/hausverwaltung-nuernberg",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "website",
  },
};

const localStructuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "einfach verwaltet. — Hausverwaltung Nürnberg",
  description:
    "Professionelle Hausverwaltung in Nürnberg für Miet- und WEG-Immobilien. Digital, transparent, immer erreichbar.",
  url: "https://einfach-verwaltet.de/hausverwaltung-nuernberg",
  areaServed: [
    { "@type": "City", name: "Nürnberg" },
    { "@type": "City", name: "Fürth" },
    { "@type": "City", name: "Erlangen" },
  ],
  serviceType: ["Mietverwaltung", "WEG-Verwaltung", "Hausverwaltung"],
  priceRange: "€€",
  telephone: "+49-40-0000000",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nürnberg",
    addressCountry: "DE",
  },
};

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was kostet eine Hausverwaltung in Nürnberg?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Eine Hausverwaltung in Nürnberg kostet typischerweise €20–38 pro Einheit und Monat. einfach verwaltet. bietet professionelle Mietverwaltung ab €24/Einheit inkl. Mieterbetreuung, Nebenkostenabrechnung und digitalem Portal. WEG-Verwaltung ab €28/Einheit.",
      },
    },
    {
      "@type": "Question",
      name: "Welche Stadtteile in Nürnberg betreut einfach verwaltet.?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "einfach verwaltet. betreut Immobilien in allen Nürnberger Stadtteilen: Altstadt, Gostenhof, Schweinau, Maxfeld, St. Johannis, Langwasser, Großreuth, Mögeldorf, Ziegelstein und Reichelsdorf sowie dem gesamten Großraum Nürnberg (Fürth, Erlangen, Schwabach).",
      },
    },
    {
      "@type": "Question",
      name: "Was ist der Mietspiegel Nürnberg 2025?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Der Nürnberger Mietspiegel 2025 zeigt eine durchschnittliche Nettokaltmiete von ca. €11,50–14,50/qm bei Bestandswohnungen, je nach Baujahr, Lage und Ausstattung. In begehrten Lagen wie der Altstadt oder St. Johannis werden deutlich höhere Mieten erzielt. Der Mietspiegel wird alle zwei Jahre von der Stadt Nürnberg aktualisiert.",
      },
    },
    {
      "@type": "Question",
      name: "Wie wechsle ich die Hausverwaltung in Nürnberg?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Der Wechsel der Hausverwaltung in Nürnberg erfordert eine ordentliche Kündigung (meist 3 Monate zum Jahresende). Wir übernehmen die Kommunikation mit dem alten Verwalter, sorgen für vollständige Dokumentenübergabe und informieren alle Mieter. Der Wechsel dauert in der Regel 4–8 Wochen.",
      },
    },
    {
      "@type": "Question",
      name: "Gibt es Mietpreisbremse in Nürnberg?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Die Mietpreisbremse gilt in Nürnberg als angespannter Wohnungsmarkt. Bei Neuvermietungen darf die Miete maximal 10% über der ortsüblichen Vergleichsmiete nach dem Mietspiegel liegen (§556d BGB). Ausnahmen gelten für Neubauten und umfassend sanierte Wohnungen. Wir prüfen bei jeder Vermietung die Zulässigkeit der Miethöhe.",
      },
    },
  ],
};

const features = [
  {
    icon: ClockIcon,
    title: "Reaktionszeit unter 15 Minuten",
    desc: "Mieteranfragen werden rund um die Uhr bearbeitet — keine Warteschleifen, kein Anrufbeantworter.",
  },
  {
    icon: BuildingIcon,
    title: "Nürnberger Mietrecht-Expertise",
    desc: "Mietspiegel Nürnberg, Mietpreisbremse, §558 BGB — wir kennen den Nürnberger Immobilienmarkt.",
  },
  {
    icon: ShieldIcon,
    title: "DSGVO-konformes Dokumentenportal",
    desc: "Alle Mietverträge, Abrechnungen und Protokolle sicher digital verfügbar — für Sie und Ihre Mieter.",
  },
  {
    icon: StarIcon,
    title: "Transparente Abrechnung",
    desc: "Echtzeit-Dashboard statt Papierberge. Sehen Sie jeden Euro — Einnahmen, Ausgaben, Rücklagen.",
  },
];

const stadtteile = [
  "Altstadt",
  "Gostenhof",
  "Schweinau",
  "Maxfeld",
  "St. Johannis",
  "Langwasser",
  "Großreuth",
  "Mögeldorf",
  "Ziegelstein",
  "Reichelsdorf",
];

const leistungen = [
  "Mieterbetreuung & Kommunikation",
  "Nebenkostenabrechnung (NKA) nach §556 BGB",
  "Mieterhöhungen nach Nürnberger Mietspiegel",
  "Handwerker-Koordination & Auftragsvergabe",
  "WEG-Eigentümerversammlung & Beschlussprotokoll",
  "Jahresabrechnung & Wirtschaftsplan",
  "Digitales Mieterportal (Tickets, Dokumente)",
  "Vermietungsbegleitung & Mieterwechsel",
  "Energieausweis-Verwaltung (§16a GEG)",
  "Mahnung & SEPA-Einzug",
];

export default function HausverwaltungNuernbergPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <Navbar />
      <main className="pt-20 min-h-screen bg-warm-white">
        {/* Hero */}
        <section className="bg-navy text-white py-20 px-6">
          <div className="max-w-[1100px] mx-auto">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
                <BuildingIcon className="w-4 h-4" />
                Nürnberg
              </div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
                Hausverwaltung Nürnberg
              </h1>
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                Ihr zuverlässiger Partner für WEG- und Mietverwaltung in Nürnberg. Professionell, digital, immer erreichbar — ab €24/Einheit/Monat.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/anfrage"
                  className="inline-flex items-center justify-center gap-2 bg-teal text-white px-7 py-4 rounded-xl font-semibold text-base hover:bg-teal/90 transition-all hover:shadow-lg"
                >
                  Kostenlos anfragen
                  <ArrowRightIcon className="w-5 h-5" />
                </Link>
                <Link
                  href="/preise"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/30 px-7 py-4 rounded-xl font-semibold text-base hover:bg-white/20 transition-all"
                >
                  Preise ansehen
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-white/60">
                <span className="flex items-center gap-1.5"><CheckIcon className="w-4 h-4 text-teal" />Kostenlos & unverbindlich</span>
                <span className="flex items-center gap-1.5"><CheckIcon className="w-4 h-4 text-teal" />Antwort am selben Tag</span>
                <span className="flex items-center gap-1.5"><CheckIcon className="w-4 h-4 text-teal" />§34c GewO lizenziert</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl font-bold text-navy text-center mb-10">
              Warum einfach verwaltet. in Nürnberg?
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((f) => (
                <div key={f.title} className="bg-warm-white rounded-2xl p-6 border border-gray-100">
                  <f.icon className="w-8 h-8 text-teal mb-4" />
                  <h3 className="font-bold text-navy mb-2 text-sm">{f.title}</h3>
                  <p className="text-xs text-text-light leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leistungen & Stadtteile */}
        <section className="py-16 px-6">
          <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-navy mb-6">
                Leistungen der Hausverwaltung Nürnberg
              </h2>
              <ul className="space-y-3">
                {leistungen.map((l) => (
                  <li key={l} className="flex items-center gap-3 text-sm text-gray-700">
                    <CheckIcon className="w-4 h-4 text-teal flex-shrink-0" />
                    {l}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  href="/anfrage"
                  className="inline-flex items-center gap-2 bg-navy text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-navy/85 transition-all"
                >
                  Angebot für Nürnberger Immobilie
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-navy mb-6">
                Nürnberger Stadtteile & Region
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {stadtteile.map((b) => (
                  <div key={b} className="flex items-center gap-2 text-sm text-gray-700 bg-white rounded-xl px-4 py-2.5 border border-gray-100">
                    <CheckIcon className="w-3.5 h-3.5 text-teal flex-shrink-0" />
                    {b}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-text-light">
                Und alle weiteren Stadtteile sowie Fürth, Erlangen und Schwabach — digitale Prozesse ohne geografische Einschränkungen.
              </p>
            </div>
          </div>
        </section>

        {/* Nürnberg specifics */}
        <section className="py-16 px-6 bg-navy/5">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl font-bold text-navy text-center mb-10">
              Nürnberg-Spezial: Lokaler Immobilienmarkt
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h3 className="font-bold text-navy mb-2">Mietspiegel Nürnberg 2025</h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  Der Nürnberger Mietspiegel 2025 weist eine durchschnittliche Nettokaltmiete von ca. €11,50–14,50/qm aus — je nach Baujahr, Lage und Ausstattung. In gefragten Lagen wie der Altstadt oder St. Johannis werden deutlich höhere Mieten erzielt. Grundlage für alle Mieterhöhungen nach §558 BGB.
                </p>
                <div className="text-sm text-teal font-medium">
                  Quelle: Stadt Nürnberg, Mietspiegel 2025
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h3 className="font-bold text-navy mb-2">Mietpreisbremse in Nürnberg</h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  Nürnberg gilt als Gebiet mit angespanntem Wohnungsmarkt. Die Mietpreisbremse (§556d BGB) ist aktiv: Neuvertragsmieten dürfen maximal 10% über der ortsüblichen Vergleichsmiete liegen. Ausnahmen gelten für Neubauten und umfassend sanierte Wohnungen. Wir prüfen bei jeder Vermietung automatisch.
                </p>
                <div className="text-sm text-teal font-medium">
                  Quelle: §556d BGB, Bayerische MieterschVO
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h3 className="font-bold text-navy mb-2">Wachsender Immobilienmarkt</h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  Nürnberg gehört zur Metropolregion Nürnberg (3,5 Mio. Einwohner) und ist einer der dynamischsten Immobilienstandorte Bayerns. Die Leerstandsquote liegt unter 2 %. Steigende Bevölkerungszahlen und Zugang zu Technologie-Unternehmen sorgen für anhaltend starke Mietnachfrage.
                </p>
                <div className="text-sm text-teal font-medium">
                  Quelle: Metropolregion Nürnberg, 2024
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h3 className="font-bold text-navy mb-2">WEG-Expertise für Nürnberg</h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  Nürnberg hat einen hohen Anteil an Altbau-Eigentumswohnungen, besonders in der Innenstadt und in Gostenhof. WEG-Verwaltung erfordert hier besondere Sorgfalt: Sanierungsbeschlüsse, Rücklagenbildung nach § 19 Abs. 2 WEG und transparente Jahresabrechnungen.
                </p>
                <div className="text-sm text-teal font-medium">
                  Inkl. §24 WEG-konformer Beschlussprotokolle
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing teaser */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="text-2xl font-bold text-navy mb-4">
              Hausverwaltung Nürnberg Kosten
            </h2>
            <p className="text-text-light mb-8">
              Transparente Preise — keine versteckten Kosten über 1 Monat hinaus.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-warm-white rounded-2xl p-6 border-2 border-gray-100 text-left">
                <h3 className="font-bold text-navy mb-1">Mietverwaltung Nürnberg</h3>
                <div className="text-3xl font-bold text-teal mb-1">ab €24</div>
                <div className="text-sm text-text-light mb-4">/Einheit/Monat</div>
                <ul className="space-y-2 text-sm text-gray-700">
                  {["Mieterbetreuung 24/7", "Nebenkostenabrechnung", "Mahnung & SEPA", "Digitales Portal"].map((i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckIcon className="w-3.5 h-3.5 text-teal flex-shrink-0" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-navy rounded-2xl p-6 text-left">
                <h3 className="font-bold text-white mb-1">WEG-Verwaltung Nürnberg</h3>
                <div className="text-3xl font-bold text-teal mb-1">ab €28</div>
                <div className="text-sm text-white/60 mb-4">/Einheit/Monat</div>
                <ul className="space-y-2 text-sm text-white/80">
                  {["Alles aus Mietverwaltung", "Eigentümerversammlung", "Beschlussprotokoll", "Jahresabrechnung WEG"].map((i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckIcon className="w-3.5 h-3.5 text-teal flex-shrink-0" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-8">
              <Link
                href="/anfrage"
                className="inline-flex items-center gap-2 bg-teal text-white px-8 py-4 rounded-xl font-semibold hover:bg-teal/90 transition-all hover:shadow-md"
              >
                Kostenloses Angebot anfordern
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-6">
          <div className="max-w-[700px] mx-auto">
            <h2 className="text-2xl font-bold text-navy text-center mb-8">
              Häufige Fragen — Hausverwaltung Nürnberg
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: "Was kostet eine Hausverwaltung in Nürnberg?",
                  a: "Eine professionelle Hausverwaltung in Nürnberg kostet typischerweise €20–38 pro Einheit und Monat. einfach verwaltet. bietet Mietverwaltung ab €24/Einheit und WEG-Verwaltung ab €28/Einheit — alle Standardleistungen inklusive, keine versteckten Gebühren.",
                },
                {
                  q: "Welche Stadtteile betreut einfach verwaltet. in Nürnberg?",
                  a: "Wir verwalten Immobilien in allen zentralen Nürnberger Stadtteilen: Altstadt, Gostenhof, Schweinau, Maxfeld, St. Johannis, Langwasser, Mögeldorf und weiteren. Auch Objekte in Fürth, Erlangen und Schwabach betreuen wir.",
                },
                {
                  q: "Gilt die Mietpreisbremse in Nürnberg?",
                  a: "Ja. Nürnberg ist als Gebiet mit angespanntem Wohnungsmarkt ausgewiesen. Bei Neuvermietungen gilt die Mietpreisbremse (§556d BGB): maximal 10% über der ortsüblichen Vergleichsmiete. Wir prüfen bei jeder Vermietung automatisch.",
                },
                {
                  q: "Was ist der aktuelle Mietspiegel Nürnberg?",
                  a: "Der Mietspiegel Nürnberg 2025 weist eine durchschnittliche Nettokaltmiete von ca. €11,50–14,50/qm aus. In Toplagen (Altstadt, St. Johannis) sind auch höhere Mieten möglich. Wir nutzen den Mietspiegel als Grundlage für alle Mieterhöhungen nach §558 BGB.",
                },
                {
                  q: "Wie lange dauert der Wechsel der Hausverwaltung in Nürnberg?",
                  a: "Nach ordentlicher Kündigung (meist 3 Monate) übernehmen wir alle Unterlagen, informieren Ihre Mieter und koordinieren die Übergabe. Der gesamte Wechselprozess dauert in der Regel 4–8 Wochen.",
                },
              ].map((faq, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 p-5">
                  <h3 className="font-semibold text-navy text-sm mb-2">{faq.q}</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 px-6 bg-navy">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              Nürnberger Immobilie abgeben?
            </h2>
            <p className="text-white/70 mb-8">
              Kostenlos anfragen — wir melden uns am selben Tag mit einem individuellen Angebot.
            </p>
            <Link
              href="/anfrage"
              className="inline-flex items-center gap-2 bg-teal text-white px-8 py-4 rounded-xl font-semibold text-base hover:bg-teal/90 transition-all hover:shadow-lg"
            >
              Jetzt Angebot anfragen
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
            <p className="mt-4 text-xs text-white/40">Kostenlos & unverbindlich · Antwort am selben Tag</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
