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
  title: "Hausverwaltung Freiburg — Mietverwaltung & WEG | einfach verwaltet.",
  description:
    "Professionelle Hausverwaltung in Freiburg im Breisgau: Mietverwaltung & WEG-Verwaltung ab €24/Einheit. Altstadt, Wiehre, Vauban, Stühlinger. Universitätsstadt, nachhaltig verwaltet.",
  alternates: {
    canonical: "https://einfach-verwaltet.de/hausverwaltung-freiburg",
  },
  openGraph: {
    title: "Hausverwaltung Freiburg — Mietverwaltung & WEG | einfach verwaltet.",
    description:
      "Hausverwaltung in Freiburg im Breisgau: digital, transparent, nachhaltig orientiert. Ab €24/Einheit.",
  },
};

const localStructuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "einfach verwaltet. — Hausverwaltung Freiburg",
  description:
    "Professionelle Hausverwaltung in Freiburg im Breisgau. Mietverwaltung & WEG-Verwaltung mit digitalen Prozessen, transparenten Preisen und Kenntnis des Freiburger Mietmarkts.",
  url: "https://einfach-verwaltet.de/hausverwaltung-freiburg",
  areaServed: [
    { "@type": "City", name: "Freiburg im Breisgau" },
    { "@type": "City", name: "Breisach" },
    { "@type": "City", name: "Merzhausen" },
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
      name: "Was kostet eine Hausverwaltung in Freiburg?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Eine professionelle Hausverwaltung in Freiburg im Breisgau kostet typischerweise €24–34 pro Einheit und Monat. einfach verwaltet. bietet transparente Preise für Mietverwaltung und WEG-Verwaltung ohne versteckte Gebühren.",
      },
    },
    {
      "@type": "Question",
      name: "Welche Stadtteile in Freiburg betreut einfach verwaltet.?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "einfach verwaltet. betreut Immobilien in allen Freiburger Stadtteilen — Altstadt, Wiehre, Vauban, Stühlinger, Herdern, Haslach, Landwasser, Rieselfeld und weitere. Der ökologische Vorzeige-Stadtteil Vauban und das Rieselfeld sind besonders bei nachhaltigkeitsbewussten Eigentümern beliebt.",
      },
    },
    {
      "@type": "Question",
      name: "Was zeichnet den Freiburger Immobilienmarkt aus?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Freiburg im Breisgau ist eine der begehrtesten Universitätsstädte Deutschlands mit rund 230.000 Einwohnern. Die Albert-Ludwigs-Universität mit etwa 25.000 Studierenden sorgt für hohe Nachfrage nach kleinen Wohneinheiten. Der Freiburger Wohnungsmarkt ist chronisch angespannt — Leerstandsquoten unter 1 %. Kaltmieten liegen bei €12–16/qm in begehrten Lagen.",
      },
    },
    {
      "@type": "Question",
      name: "Gilt die Mietpreisbremse in Freiburg?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Freiburg im Breisgau ist Teil der baden-württembergischen Mieterschutzverordnung. Die Mietpreisbremse gilt für Neuvermietungen — die Miete darf die ortsübliche Vergleichsmiete nach Freiburger Mietspiegel nicht um mehr als 10 % übersteigen. Ausnahmen bestehen für Erstbezug nach Neubau und umfassend modernisierte Wohnungen.",
      },
    },
  ],
};

const features = [
  {
    icon: ClockIcon,
    title: "Reaktionszeit unter 15 Minuten",
    desc: "Mieteranfragen rund um die Uhr — besonders wichtig in einem Markt mit hoher Mieterfluktuation durch Studenten.",
  },
  {
    icon: BuildingIcon,
    title: "Freiburger Marktkenntnis",
    desc: "Freiburger Mietspiegel, Studierenden-Vermietung, WEG-Besonderheiten — wir kennen den Breisgauer Markt.",
  },
  {
    icon: ShieldIcon,
    title: "Digitales Dokumentenportal",
    desc: "Alle Unterlagen DSGVO-konform digital verfügbar — für Sie und Ihre Mieter.",
  },
  {
    icon: StarIcon,
    title: "Nachhaltige Verwaltung",
    desc: "Papierlose Prozesse, digitale Kommunikation — passend zur Philosophie der Ökostadt Freiburg.",
  },
];

const stadtteile = [
  "Altstadt",
  "Wiehre",
  "Vauban",
  "Stühlinger",
  "Herdern",
  "Haslach",
  "Rieselfeld",
  "Landwasser",
  "Weingarten",
  "Betzenhausen",
  "Oberau",
  "Littenweiler",
];

const leistungen = [
  "Mieterbetreuung & Kommunikation",
  "Nebenkostenabrechnung nach §556 BGB",
  "Mieterhöhungen nach Freiburger Mietspiegel",
  "Handwerker-Koordination & Auftragsvergabe",
  "WEG-Eigentümerversammlung & Beschlussprotokoll",
  "Jahresabrechnung & Wirtschaftsplan",
  "Digitales Mieterportal (Tickets, Dokumente)",
  "Vermietungsbegleitung & Mieterwechsel",
  "Energieausweis-Verwaltung (§16a GEG)",
  "Mahnung & SEPA-Einzug",
];

export default function HausverwaltungFreiburgPage() {
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
                Baden-Württemberg · Breisgau
              </div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
                Hausverwaltung Freiburg —<br />
                <span className="text-teal">digital & zuverlässig.</span>
              </h1>
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                Professionelle Mietverwaltung & WEG-Verwaltung für Freiburger Immobilien.
                Alle Stadtteile: Altstadt, Wiehre, Vauban, Stühlinger, Herdern, Rieselfeld.
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
              Warum einfach verwaltet. für Freiburg?
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
                  Hausverwaltung Freiburg: Markt & Mietspiegel
                </h2>
                <p className="text-text-light leading-relaxed mb-6">
                  Freiburg im Breisgau ist mit rund 230.000 Einwohnern die viertgrößte Stadt
                  Baden-Württembergs und einer der attraktivsten Wohnstandorte Süddeutschlands.
                  Die Albert-Ludwigs-Universität prägt den Wohnungsmarkt erheblich: Rund 25.000
                  Studierende suchen jedes Jahr nach bezahlbarem Wohnraum — mit entsprechend
                  hoher Nachfrage bei kleinen Wohnungen und WGs.
                </p>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-teal mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-navy mb-1">Mietpreise Freiburg 2026</h4>
                      <p className="text-text-light text-sm">
                        Kaltmieten: €12–16/qm in Toplagen (Altstadt, Wiehre, Vauban).
                        Studiennahe Stadtteile wie Stühlinger und Herdern: €10–13/qm.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-teal mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-navy mb-1">Angespannter Markt</h4>
                      <p className="text-text-light text-sm">
                        Freiburg verzeichnet eine der niedrigsten Leerstandsquoten Deutschlands
                        (unter 1 %). Gut vermietete Immobilien finden sich in Stunden.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-teal mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-navy mb-1">Mietpreisbremse</h4>
                      <p className="text-text-light text-sm">
                        Freiburg ist als angespannter Wohnungsmarkt nach der
                        BadenWürttembergischen Mieterschutzverordnung eingestuft.
                        Die Mietpreisbremse gilt für Neuvermietungen.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-navy mb-6">
                  Alle Freiburger Stadtteile
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
                  Und alle weiteren Freiburger Stadtteile — einschließlich der Stadtteile der
                  Eingemeindungen und Vororte der Region.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Leistungen */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl font-bold text-navy text-center mb-10">
              Leistungen der Hausverwaltung Freiburg
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
                Angebot für Freiburger Immobilie
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 px-6">
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="text-2xl font-bold text-navy mb-4">
              Hausverwaltung Freiburg Kosten
            </h2>
            <p className="text-text-light mb-8">
              Transparente Preise — keine versteckten Kosten, keine langen Bindungsfristen.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 text-left">
                <h3 className="font-bold text-navy mb-1">Mietverwaltung Freiburg</h3>
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
                <h3 className="font-bold text-white mb-1">WEG-Verwaltung Freiburg</h3>
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
              Häufige Fragen zur Hausverwaltung Freiburg
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
              Ihre Freiburger Immobilie. Einfach verwaltet.
            </h2>
            <p className="text-white/70 mb-8 text-lg">
              Vom Studierenden-WG bis zur Eigentümergemeinschaft im Vauban —
              wir verwalten Ihre Freiburger Immobilie professionell und nachhaltig.
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
