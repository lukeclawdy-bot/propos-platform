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
  title: "Hausverwaltung Köln — Zuverlässige Mietverwaltung | einfach verwaltet.",
  description:
    "Professionelle Hausverwaltung in Köln: Mietverwaltung & WEG-Verwaltung ab €24/Einheit. Transparent, digital, immer erreichbar. Alle Stadtteile: Innenstadt, Ehrenfeld, Nippes, Rodenkirchen, Lindenthal, Bayenthal.",
  alternates: {
    canonical: "https://einfach-verwaltet.de/hausverwaltung-koeln",
  },
  openGraph: {
    title: "Hausverwaltung Köln — Zuverlässige Mietverwaltung | einfach verwaltet.",
    description:
      "Moderne Hausverwaltung in Köln. Mietverwaltung & WEG-Verwaltung, digitale Kommunikation, transparente Abrechnung. Ab €24/Einheit.",
  },
};

const localStructuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "einfach verwaltet. — Hausverwaltung Köln",
  description:
    "Professionelle Hausverwaltung in Köln für Miet- und WEG-Immobilien. Transparente Preise, lokales Know-how, 24/7 Erreichbarkeit.",
  url: "https://einfach-verwaltet.de/hausverwaltung-koeln",
  areaServed: [
    { "@type": "City", name: "Köln" },
    { "@type": "City", name: "Leverkusen" },
    { "@type": "City", name: "Bergisch Gladbach" },
  ],
  serviceType: ["Mietverwaltung", "WEG-Verwaltung", "Hausverwaltung"],
  priceRange: "€€",
  telephone: "+49-40-0000000",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hamburg",
    addressCountry: "DE",
  },
};

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was kostet eine Hausverwaltung in Köln?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Eine professionelle Hausverwaltung in Köln kostet typischerweise €24–34 pro Einheit und Monat. einfach verwaltet. bietet transparente Preise ohne versteckte Gebühren. Die Kosten hängen von der Anzahl der Einheiten und dem Leistungsumfang ab.",
      },
    },
    {
      "@type": "Question",
      name: "Welche Stadtteile in Köln betreut einfach verwaltet.?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "einfach verwaltet. betreut Immobilien in allen Kölner Stadtteilen — von der Innenstadt über Ehrenfeld, Nippes und Lindenthal bis Rodenkirchen und Bayenthal. Digitale Prozesse ermöglichen effiziente Verwaltung in ganz Köln.",
      },
    },
    {
      "@type": "Question",
      name: "Was zeichnet den Kölner Immobilienmarkt aus?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Köln ist ein angespannter Wohnungsmarkt mit über 1,1 Millionen Einwohnern. Die Mietpreise liegen im Schnitt bei €12–15/qm. Beliebte Stadtteile wie die Innenstadt, Ehrenfeld und das Agnesviertel verzeichnen hohe Nachfrage. Die Mietpreisbremse gilt in ausgewiesenen Gebieten.",
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
    title: "Kölner Mietrecht-Expertise",
    desc: "Kölner Mietspiegel, Mietpreisbremse, befristete Mietverträge — wir kennen die lokalen Besonderheiten.",
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
  "Innenstadt",
  "Ehrenfeld",
  "Nippes",
  "Rodenkirchen",
  "Lindenthal",
  "Bayenthal",
  "Altstadt-Nord",
  "Neustadt-Süd",
  "Mülheim",
  "Kalk",
  "Porz",
  "Zollstock",
];

const leistungen = [
  "Mieterbetreuung & Kommunikation",
  "Nebenkostenabrechnung (NKA) nach §556 BGB",
  "Mieterhöhungen nach Kölner Mietspiegel",
  "Handwerker-Koordination & Auftragsvergabe",
  "WEG-Eigentümerversammlung & Beschlussprotokoll",
  "Jahresabrechnung & Wirtschaftsplan",
  "Digitales Mieterportal (Tickets, Dokumente)",
  "Vermietungsbegleitung & Mieterwechsel",
  "Energieausweis-Verwaltung (§16a GEG)",
  "Mahnung & SEPA-Einzug",
];

export default function HausverwaltungKoelnPage() {
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
                Rheinland & NRW
              </div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
                Hausverwaltung Köln —<br />
                <span className="text-teal">zuverlässig & transparent.</span>
              </h1>
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                Professionelle Mietverwaltung & WEG-Verwaltung für Kölner Immobilien. 
                Alle Stadtteile: Innenstadt, Ehrenfeld, Nippes, Rodenkirchen, Lindenthal, Bayenthal. 
                Ab €24/Einheit/Monat.
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
              <div className="mt-8 flex items-center gap-6 text-sm text-white/60">
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
              Warum einfach verwaltet. für Köln?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((f) => (
                <div key={f.title} className="bg-warm-white rounded-2xl p-6">
                  <div className="w-10 h-10 bg-teal/10 rounded-xl flex items-center justify-center mb-4">
                    <f.icon className="w-5 h-5 text-teal" />
                  </div>
                  <h3 className="font-bold text-navy text-sm mb-2">{f.title}</h3>
                  <p className="text-xs text-text-light leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Local Market Info */}
        <section className="py-16 px-6">
          <div className="max-w-[1100px] mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-2xl font-bold text-navy mb-6">
                  Hausverwaltung Köln: Markt & Mietspiegel
                </h2>
                <p className="text-text-light leading-relaxed mb-6">
                  Köln ist mit über 1,1 Millionen Einwohnern die größte Stadt Nordrhein-Westfalens 
                  und einer der angespanntesten Wohnungsmärkte Deutschlands. Der Kölner Mietspiegel 
                  bildet die Grundlage für Mieterhöhungen nach §558 BGB.
                </p>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-teal mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-navy mb-1">Mietpreise Köln 2026</h4>
                      <p className="text-text-light text-sm">
                        Durchschnittliche Kaltmieten: €12–15/qm in beliebten Lagen, 
                        €10–12/qm in Stadtteilen außerhalb der Ringe.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-teal mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-navy mb-1">Mietpreisbremse</h4>
                      <p className="text-text-light text-sm">
                        In vielen Kölner Stadtteilen gilt die Mietpreisbremse. 
                        Wir prüfen vor jeder Mieterhöhung die rechtlichen Rahmenbedingungen.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-teal mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-navy mb-1">Beliebte Stadtteile</h4>
                      <p className="text-text-light text-sm">
                        Innenstadt, Ehrenfeld, Nippes und das Agnesviertel verzeichnen 
                        die höchste Nachfrage und Mietpreise.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-navy mb-6">
                  Alle Kölner Stadtteile
                </h2>
                <div className="grid grid-cols-2 gap-2">
                  {stadtteile.map((s) => (
                    <div key={s} className="flex items-center gap-2 text-sm text-gray-700 bg-white rounded-xl px-4 py-2.5 border border-gray-100">
                      <CheckIcon className="w-3.5 h-3.5 text-teal flex-shrink-0" />
                      {s}
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-text-light">
                  Und alle weiteren Kölner Stadtteile — digitale Prozesse ohne geografische Einschränkungen.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Leistungen */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl font-bold text-navy text-center mb-10">
              Leistungen der Hausverwaltung Köln
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {leistungen.map((l) => (
                <li key={l} className="flex items-center gap-3 text-sm text-gray-700 list-none">
                  <CheckIcon className="w-4 h-4 text-teal flex-shrink-0" />
                  {l}
                </li>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link
                href="/anfrage"
                className="inline-flex items-center gap-2 bg-navy text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-navy/85 transition-all"
              >
                Angebot für Kölner Immobilie
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Pricing teaser */}
        <section className="py-16 px-6">
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="text-2xl font-bold text-navy mb-4">
              Hausverwaltung Köln Kosten
            </h2>
            <p className="text-text-light mb-8">
              Transparente Preise — keine versteckten Kosten, keine Mindestvertragslaufzeit über 1 Jahr.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 text-left">
                <h3 className="font-bold text-navy mb-1">Mietverwaltung Köln</h3>
                <div className="text-3xl font-bold text-teal mb-1">€24–34</div>
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
                <h3 className="font-bold text-white mb-1">WEG-Verwaltung Köln</h3>
                <div className="text-3xl font-bold text-teal mb-1">€28–34</div>
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
        <section className="py-16 px-6 bg-white">
          <div className="max-w-[700px] mx-auto">
            <h2 className="text-2xl font-bold text-navy text-center mb-8">
              Häufige Fragen — Hausverwaltung Köln
            </h2>
            <div className="space-y-4">
              <div className="bg-warm-white rounded-xl border border-gray-100 p-5">
                <h3 className="font-semibold text-navy text-sm mb-2">Was kostet eine Hausverwaltung in Köln?</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Eine professionelle Hausverwaltung in Köln kostet typischerweise €24–34 pro Einheit und Monat. 
                  einfach verwaltet. bietet transparente Preise ohne versteckte Gebühren. 
                  Die genauen Kosten hängen von der Anzahl der Einheiten und dem gewählten Leistungsumfang ab.
                </p>
              </div>
              <div className="bg-warm-white rounded-xl border border-gray-100 p-5">
                <h3 className="font-semibold text-navy text-sm mb-2">Welche Stadtteile betreut einfach verwaltet. in Köln?</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Wir verwalten Immobilien in allen Kölner Stadtteilen — von der Innenstadt über Ehrenfeld, 
                  Nippes und Lindenthal bis Rodenkirchen, Bayenthal und dem gesamten Kölner Umland. 
                  Digitale Prozesse ermöglichen effiziente Verwaltung ohne geografische Einschränkungen.
                </p>
              </div>
              <div className="bg-warm-white rounded-xl border border-gray-100 p-5">
                <h3 className="font-semibold text-navy text-sm mb-2">Was zeichnet den Kölner Immobilienmarkt aus?</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Köln ist ein angespannter Wohnungsmarkt mit über 1,1 Millionen Einwohnern. 
                  Die Mietpreise liegen im Schnitt bei €12–15/qm. Beliebte Stadtteile wie die Innenstadt, 
                  Ehrenfeld und das Agnesviertel verzeichnen hohe Nachfrage. Die Mietpreisbremse gilt 
                  in ausgewiesenen Gebieten.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 px-6 bg-navy">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              Kölner Immobilie professionell verwalten?
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
