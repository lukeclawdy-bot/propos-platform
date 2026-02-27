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
  title: "Hausverwaltung Wiesbaden — Mietverwaltung & WEG | einfach verwaltet.",
  description:
    "Professionelle Hausverwaltung in Wiesbaden: Mietverwaltung & WEG-Verwaltung ab €24/Einheit. Innenstadt, Biebrich, Südost, Nordenstadt. Hessens Hauptstadt, hohe Immobilienwerte.",
  alternates: {
    canonical: "https://einfach-verwaltet.de/hausverwaltung-wiesbaden",
  },
  openGraph: {
    title: "Hausverwaltung Wiesbaden — Mietverwaltung & WEG | einfach verwaltet.",
    description:
      "Hausverwaltung in Wiesbaden: digitale Prozesse, transparente Preise, lokales Markt-Know-how. Ab €24/Einheit.",
  },
};

const localStructuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "einfach verwaltet. — Hausverwaltung Wiesbaden",
  description:
    "Professionelle Hausverwaltung in Wiesbaden für Miet- und WEG-Immobilien. Transparente Preise, digitale Prozesse, Kenntnis des Wiesbadener Mietspiegels.",
  url: "https://einfach-verwaltet.de/hausverwaltung-wiesbaden",
  areaServed: [
    { "@type": "City", name: "Wiesbaden" },
    { "@type": "City", name: "Mainz" },
    { "@type": "City", name: "Rüsselsheim" },
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
      name: "Was kostet eine Hausverwaltung in Wiesbaden?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Eine professionelle Hausverwaltung in Wiesbaden kostet typischerweise €24–34 pro Einheit und Monat für Mietverwaltung. WEG-Verwaltung liegt bei €28–34. einfach verwaltet. bietet transparente Festpreise ohne versteckte Gebühren.",
      },
    },
    {
      "@type": "Question",
      name: "Welche Stadtteile in Wiesbaden betreut einfach verwaltet.?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "einfach verwaltet. betreut Immobilien in allen Wiesbadener Stadtteilen — Innenstadt, Biebrich, Südost, Westend, Nordenstadt, Schierstein, Bierstadt, Klarenthal und weitere. Digitale Prozesse ermöglichen stadtweite Abdeckung ohne Aufpreis.",
      },
    },
    {
      "@type": "Question",
      name: "Was zeichnet den Wiesbadener Immobilienmarkt aus?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wiesbaden ist die Landeshauptstadt Hessens mit rund 290.000 Einwohnern. Als Finanz- und Verwaltungsstandort in der Rhein-Main-Region zählt Wiesbaden zu den Wohnmärkten mit den höchsten Immobilienwerten Deutschlands. Durchschnittliche Kaltmieten liegen bei €12–17/qm, in Premiumlagen deutlich höher. Der Wiesbadener Mietspiegel wird alle zwei Jahre aktualisiert.",
      },
    },
    {
      "@type": "Question",
      name: "Gilt die Mietpreisbremse in Wiesbaden?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Wiesbaden ist Teil des hessischen Mieterschutzgebiets. Die Mietpreisbremse gilt für Neuvermietungen — die Miete darf die ortsübliche Vergleichsmiete nach Wiesbadener Mietspiegel nicht um mehr als 10 % überschreiten. Ausnahmen: Erstbezug, umfassende Modernisierung. Wir prüfen vor jeder Neuvermietung die rechtliche Situation.",
      },
    },
  ],
};

const features = [
  {
    icon: ClockIcon,
    title: "Reaktionszeit unter 15 Minuten",
    desc: "Mieteranfragen rund um die Uhr — keine Warteschleifen, kein Anrufbeantworter.",
  },
  {
    icon: BuildingIcon,
    title: "Rhein-Main-Marktkenntnisse",
    desc: "Wiesbadener Mietspiegel, Mietpreisbremse, Hessisches Mietrecht — wir kennen den Markt.",
  },
  {
    icon: ShieldIcon,
    title: "DSGVO-konformes Dokumentenportal",
    desc: "Mietverträge, Abrechnungen und Protokolle — sicher digital verfügbar.",
  },
  {
    icon: StarIcon,
    title: "Echtzeit-Transparenz",
    desc: "Dashboard mit allen Einnahmen, Ausgaben und Rücklagen — immer aktuell.",
  },
];

const stadtteile = [
  "Innenstadt",
  "Biebrich",
  "Südost",
  "Westend",
  "Nordenstadt",
  "Schierstein",
  "Bierstadt",
  "Klarenthal",
  "Sonnenberg",
  "Erbenheim",
  "Delkenheim",
  "Dotzheim",
];

const leistungen = [
  "Mieterbetreuung & Kommunikation",
  "Nebenkostenabrechnung nach §556 BGB",
  "Mieterhöhungen nach Wiesbadener Mietspiegel",
  "Handwerker-Koordination & Auftragsvergabe",
  "WEG-Eigentümerversammlung & Beschlussprotokoll",
  "Jahresabrechnung & Wirtschaftsplan",
  "Digitales Mieterportal (Tickets, Dokumente)",
  "Vermietungsbegleitung & Mieterwechsel",
  "Energieausweis-Verwaltung (§16a GEG)",
  "Mahnung & SEPA-Einzug",
];

export default function HausverwaltungWiesbadenPage() {
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
                Hessen · Rhein-Main
              </div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
                Hausverwaltung Wiesbaden —<br />
                <span className="text-teal">professionell & transparent.</span>
              </h1>
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                Professionelle Mietverwaltung & WEG-Verwaltung für Wiesbadener Immobilien.
                Alle Stadtteile: Innenstadt, Biebrich, Südost, Westend, Nordenstadt.
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
              Warum einfach verwaltet. für Wiesbaden?
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
                  Hausverwaltung Wiesbaden: Markt & Mietspiegel
                </h2>
                <p className="text-text-light leading-relaxed mb-6">
                  Wiesbaden ist die Landeshauptstadt Hessens und gehört zur dynamischen Rhein-Main-Region.
                  Als Finanz-, Kongress- und Verwaltungsstandort mit rund 290.000 Einwohnern und unmittelbarer
                  Nähe zu Frankfurt am Main zählt Wiesbaden zu den begehrtesten Wohnstandorten Deutschlands.
                  Die hohen Immobilienwerte stellen besondere Anforderungen an die Qualität der Hausverwaltung.
                </p>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-teal mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-navy mb-1">Mietpreise Wiesbaden 2026</h4>
                      <p className="text-text-light text-sm">
                        Durchschnittliche Kaltmieten: €12–17/qm in begehrten Lagen (Innenstadt,
                        Westend, Südost). In Randlagen ab €10/qm.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-teal mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-navy mb-1">Wiesbadener Mietspiegel</h4>
                      <p className="text-text-light text-sm">
                        Der qualifizierte Mietspiegel wird alle zwei Jahre aktualisiert und bildet
                        die Grundlage für Mieterhöhungsbegehren nach §558 BGB. Wir berechnen
                        Mieterhöhungsspielräume präzise auf Basis aktueller Daten.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-teal mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-navy mb-1">Mietpreisbremse</h4>
                      <p className="text-text-light text-sm">
                        Wiesbaden ist als angespannter Wohnungsmarkt eingestuft.
                        Die Mietpreisbremse gilt für Neuvermietungen — wir prüfen die Grenzen
                        bei jedem Mieterwechsel automatisch.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-navy mb-6">
                  Alle Wiesbadener Stadtteile
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
                  Und alle weiteren Wiesbadener Stadtteile und Vororte — digital und ohne geografische Einschränkungen.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Leistungen */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl font-bold text-navy text-center mb-10">
              Leistungen der Hausverwaltung Wiesbaden
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
                Angebot für Wiesbadener Immobilie
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 px-6">
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="text-2xl font-bold text-navy mb-4">
              Hausverwaltung Wiesbaden Kosten
            </h2>
            <p className="text-text-light mb-8">
              Transparente Preise — keine versteckten Kosten, keine langen Bindungsfristen.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 text-left">
                <h3 className="font-bold text-navy mb-1">Mietverwaltung Wiesbaden</h3>
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
                <h3 className="font-bold text-white mb-1">WEG-Verwaltung Wiesbaden</h3>
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
                className="inline-flex items-center gap-2 bg-teal text-white px-7 py-4 rounded-xl font-semibold hover:bg-teal/90 transition-all"
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
            <h2 className="text-2xl font-bold text-navy text-center mb-10">
              Häufige Fragen zur Hausverwaltung Wiesbaden
            </h2>
            <div className="space-y-4">
              {faqStructuredData.mainEntity.map((faq) => (
                <details key={faq.name} className="border border-gray-200 rounded-xl overflow-hidden">
                  <summary className="px-6 py-4 font-semibold text-navy cursor-pointer list-none flex items-center justify-between hover:bg-gray-50 transition-colors">
                    {faq.name}
                    <ArrowRightIcon className="w-4 h-4 text-teal rotate-90 flex-shrink-0 ml-4" />
                  </summary>
                  <div className="px-6 pb-4 text-sm text-text-light leading-relaxed">
                    {faq.acceptedAnswer.text}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-6 bg-navy text-white">
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ihre Wiesbadener Immobilie. Einfach verwaltet.
            </h2>
            <p className="text-white/70 mb-8 text-lg">
              Professionelle Verwaltung für anspruchsvolle Lagen — transparent, digital, zuverlässig.
            </p>
            <Link
              href="/anfrage"
              className="inline-flex items-center gap-2 bg-teal text-white px-8 py-4 rounded-xl font-semibold text-base hover:bg-teal/90 transition-all"
            >
              Jetzt kostenlos anfragen
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
