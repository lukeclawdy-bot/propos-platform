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
  title: "Hausverwaltung Stuttgart — Professionelle Mietverwaltung | einfach verwaltet.",
  description:
    "Professionelle Hausverwaltung in Stuttgart: Mietverwaltung & WEG-Verwaltung ab €24/Einheit. Transparent, digital, immer erreichbar. Alle Stadtteile: Mitte, Bad Cannstatt, Vaihingen, Feuerbach, Zuffenhausen, Degerloch.",
  alternates: {
    canonical: "https://einfach-verwaltet.de/hausverwaltung-stuttgart",
  },
  openGraph: {
    title: "Hausverwaltung Stuttgart — Professionelle Mietverwaltung | einfach verwaltet.",
    description:
      "Moderne Hausverwaltung in Stuttgart. Mietverwaltung & WEG-Verwaltung, digitale Kommunikation, transparente Abrechnung. Baden-Württemberg Spezialist.",
  },
};

const localStructuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "einfach verwaltet. — Hausverwaltung Stuttgart",
  description:
    "Professionelle Hausverwaltung in Stuttgart für Miet- und WEG-Immobilien. Transparente Preise, lokales Know-how, 24/7 Erreichbarkeit. Baden-Württemberg Experte.",
  url: "https://einfach-verwaltet.de/hausverwaltung-stuttgart",
  areaServed: [
    { "@type": "City", name: "Stuttgart" },
    { "@type": "State", name: "Baden-Württemberg" },
    { "@type": "City", name: "Ludwigsburg" },
    { "@type": "City", name: "Esslingen" },
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
      name: "Was kostet eine Hausverwaltung in Stuttgart?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Eine professionelle Hausverwaltung in Stuttgart kostet typischerweise €24–34 pro Einheit und Monat. einfach verwaltet. bietet transparente Preise ohne versteckte Gebühren. Die Kosten variieren je nach Anzahl der Einheiten und Leistungsumfang.",
      },
    },
    {
      "@type": "Question",
      name: "Welche Stadtteile in Stuttgart betreut einfach verwaltet.?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "einfach verwaltet. betreut Immobilien in allen Stuttgarter Stadtteilen — von Stuttgart-Mitte, West und Süd über Vaihingen, Feuerbach und Bad Cannstatt bis Zuffenhausen, Degerloch und Degerloch. Digitale Prozesse ermöglichen effiziente Verwaltung in ganz Stuttgart.",
      },
    },
    {
      "@type": "Question",
      name: "Was zeichnet den Stuttgarter Immobilienmarkt aus?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Stuttgart gehört zu den teuersten Wohnungsmärkten Deutschlands mit Mieten über €15/qm. Als Standort von Daimler, Porsche und Bosch besteht hohe Nachfrage nach Wohnraum. Die Region bietet besonders solvente Mieter und eine stabile Wirtschaft mit vielen hochqualifizierten Arbeitnehmern.",
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
    title: "Baden-Württemberg Expertise",
    desc: "Stuttgarter Mietspiegel, VDI 2077 Heizkosten, energetische Sanierung — wir kennen die Besonderheiten.",
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
  "Stuttgart-Mitte",
  "Bad Cannstatt",
  "Vaihingen",
  "Feuerbach",
  "Zuffenhausen",
  "Degerloch",
  "Stuttgart-West",
  "Stuttgart-Süd",
  "Möhringen",
  "Plieningen",
  "Sillenbuch",
  "Untertürkheim",
];

const leistungen = [
  "Mieterbetreuung & Kommunikation",
  "Nebenkostenabrechnung (NKA) nach §556 BGB",
  "Mieterhöhungen nach Stuttgarter Mietspiegel",
  "Handwerker-Koordination & Auftragsvergabe",
  "WEG-Eigentümerversammlung & Beschlussprotokoll",
  "Jahresabrechnung & Wirtschaftsplan",
  "Digitales Mieterportal (Tickets, Dokumente)",
  "Vermietungsbegleitung & Mieterwechsel",
  "Energieausweis-Verwaltung (§16a GEG)",
  "Mahnung & SEPA-Einzug",
];

export default function HausverwaltungStuttgartPage() {
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
                Baden-Württemberg
              </div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
                Hausverwaltung Stuttgart —<br />
                <span className="text-teal">professionell & zuverlässig.</span>
              </h1>
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                Professionelle Mietverwaltung & WEG-Verwaltung für Stuttgarter Immobilien. 
                Alle Stadtteile: Mitte, Bad Cannstatt, Vaihingen, Feuerbach, Zuffenhausen, Degerloch. 
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
              Warum einfach verwaltet. für Stuttgart?
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
                  Hausverwaltung Stuttgart: Markt & Mietspiegel
                </h2>
                <p className="text-text-light leading-relaxed mb-6">
                  Stuttgart ist die Hauptstadt Baden-Württembergs und einer der wirtschaftlich 
                  stärksten Standorte Deutschlands. Als Heimat von Daimler, Porsche und Bosch 
                  zieht die Region hochqualifizierte Fachkräfte an — was den Wohnungsmarkt 
                  besonders dynamisch macht.
                </p>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-teal mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-navy mb-1">Mietpreise Stuttgart 2026</h4>
                      <p className="text-text-light text-sm">
                        Durchschnittliche Kaltmieten: €15–18/qm in zentralen Lagen, 
                        €12–15/qm in Stadtteilen außerhalb der Kernstadt.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-teal mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-navy mb-1">Wirtschaftsstandort</h4>
                      <p className="text-text-light text-sm">
                        Daimler, Porsche, Bosch und zahlreiche Mittelständler sorgen für 
                        besonders solvente Mieter und eine stabile Nachfrage.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-teal mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-navy mb-1">Beliebte Stadtteile</h4>
                      <p className="text-text-light text-sm">
                        Stuttgart-Mitte, West, Süd, Vaihingen und Degerloch gehören zu den 
                        gefragtesten Wohnlagen mit hohen Mietpreisen.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-navy mb-6">
                  Alle Stuttgarter Stadtteile
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
                  Und alle weiteren Stuttgarter Stadtteile — digitale Prozesse ohne geografische Einschränkungen.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Leistungen */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl font-bold text-navy text-center mb-10">
              Leistungen der Hausverwaltung Stuttgart
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
                Angebot für Stuttgarter Immobilie
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Pricing teaser */}
        <section className="py-16 px-6">
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="text-2xl font-bold text-navy mb-4">
              Hausverwaltung Stuttgart Kosten
            </h2>
            <p className="text-text-light mb-8">
              Transparente Preise — keine versteckten Kosten, keine Mindestvertragslaufzeit über 1 Jahr.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 text-left">
                <h3 className="font-bold text-navy mb-1">Mietverwaltung Stuttgart</h3>
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
                <h3 className="font-bold text-white mb-1">WEG-Verwaltung Stuttgart</h3>
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
              Häufige Fragen — Hausverwaltung Stuttgart
            </h2>
            <div className="space-y-4">
              <div className="bg-warm-white rounded-xl border border-gray-100 p-5">
                <h3 className="font-semibold text-navy text-sm mb-2">Was kostet eine Hausverwaltung in Stuttgart?</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Eine professionelle Hausverwaltung in Stuttgart kostet typischerweise €24–34 pro Einheit und Monat. 
                  einfach verwaltet. bietet transparente Preise ohne versteckte Gebühren. 
                  Die genauen Kosten hängen von der Anzahl der Einheiten und dem gewählten Leistungsumfang ab.
                </p>
              </div>
              <div className="bg-warm-white rounded-xl border border-gray-100 p-5">
                <h3 className="font-semibold text-navy text-sm mb-2">Welche Stadtteile betreut einfach verwaltet. in Stuttgart?</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Wir verwalten Immobilien in allen Stuttgarter Stadtteilen — von Stuttgart-Mitte, 
                  West und Süd über Vaihingen, Feuerbach und Bad Cannstatt bis Zuffenhausen, 
                  Degerloch und dem gesamten Stuttgarter Umland. 
                  Digitale Prozesse ermöglichen effiziente Verwaltung ohne geografische Einschränkungen.
                </p>
              </div>
              <div className="bg-warm-white rounded-xl border border-gray-100 p-5">
                <h3 className="font-semibold text-navy text-sm mb-2">Was zeichnet den Stuttgarter Immobilienmarkt aus?</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Stuttgart gehört zu den teuersten Wohnungsmärkten Deutschlands mit Mieten über €15/qm. 
                  Als Standort von Daimler, Porsche und Bosch besteht hohe Nachfrage nach Wohnraum. 
                  Die Region bietet besonders solvente Mieter und eine stabile Wirtschaft 
                  mit vielen hochqualifizierten Arbeitnehmern.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 px-6 bg-navy">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              Stuttgarter Immobilie professionell verwalten?
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
