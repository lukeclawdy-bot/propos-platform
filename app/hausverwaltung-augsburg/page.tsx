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
  title: "Hausverwaltung Augsburg — Professionelle Mietverwaltung | einfach verwaltet.",
  description:
    "Professionelle Hausverwaltung in Augsburg: Mietverwaltung & WEG-Verwaltung ab €24/Einheit. Innenstadt, Lechhausen, Hochzoll, Göggingen. Transparent, digital, zuverlässig.",
  alternates: {
    canonical: "https://einfach-verwaltet.de/hausverwaltung-augsburg",
  },
  openGraph: {
    title: "Hausverwaltung Augsburg — Professionelle Mietverwaltung | einfach verwaltet.",
    description:
      "Moderne Hausverwaltung in Augsburg. Mietverwaltung & WEG-Verwaltung, digitale Kommunikation, transparente Abrechnung. Ab €24/Einheit.",
  },
};

const localStructuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "einfach verwaltet. — Hausverwaltung Augsburg",
  description:
    "Professionelle Hausverwaltung in Augsburg für Miet- und WEG-Immobilien. Transparente Preise, digitaler Service, lokales Bayern-Know-how.",
  url: "https://einfach-verwaltet.de/hausverwaltung-augsburg",
  areaServed: [
    { "@type": "City", name: "Augsburg" },
    { "@type": "City", name: "Königsbrunn" },
    { "@type": "City", name: "Friedberg" },
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
      name: "Was kostet eine Hausverwaltung in Augsburg?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Eine professionelle Hausverwaltung in Augsburg kostet typischerweise €24–34 pro Einheit und Monat. einfach verwaltet. bietet transparente Preise ohne versteckte Gebühren — für Mietverwaltung und WEG-Verwaltung.",
      },
    },
    {
      "@type": "Question",
      name: "Welche Stadtteile in Augsburg betreut einfach verwaltet.?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "einfach verwaltet. betreut Immobilien in allen Augsburger Stadtteilen — Innenstadt, Lechhausen, Hochzoll, Göggingen, Haunstetten, Oberhausen, Pfersee und alle weiteren. Digitale Prozesse ermöglichen effiziente Verwaltung in ganz Augsburg.",
      },
    },
    {
      "@type": "Question",
      name: "Was zeichnet den Augsburger Immobilienmarkt aus?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Augsburg ist mit ~300.000 Einwohnern die drittgrößte Stadt Bayerns. Der Wohnungsmarkt ist durch Zuzug aus München geprägt — Augsburg bietet deutlich günstigere Mieten bei guter Anbindung an die Landeshauptstadt. Durchschnittliche Kaltmieten liegen bei €10–14/qm. Die Mietpreisbremse gilt in Augsburg seit 2020 für weite Teile des Stadtgebiets.",
      },
    },
    {
      "@type": "Question",
      name: "Gilt die Mietpreisbremse in Augsburg?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Augsburg wurde in die bayerische Mieterschutzverordnung aufgenommen. Die Mietpreisbremse gilt für neu abgeschlossene Mietverträge — Neuvermietungen dürfen die ortsübliche Vergleichsmiete laut Augsburger Mietspiegel maximal um 10 % übersteigen. Ausnahmen gelten für Erstbezug nach Neubau und umfassend modernisierte Wohnungen.",
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
    title: "Augsburger Marktkenntnis",
    desc: "Augsburger Mietspiegel, Mietpreisbremse, WEG-Recht — wir kennen den bayerischen Markt.",
  },
  {
    icon: ShieldIcon,
    title: "DSGVO-konformes Dokumentenportal",
    desc: "Alle Mietverträge, Abrechnungen und Protokolle sicher digital verfügbar.",
  },
  {
    icon: StarIcon,
    title: "Transparente Abrechnung",
    desc: "Echtzeit-Dashboard statt Papierberge. Sehen Sie jeden Euro — Einnahmen, Ausgaben, Rücklagen.",
  },
];

const stadtteile = [
  "Innenstadt",
  "Lechhausen",
  "Hochzoll",
  "Göggingen",
  "Haunstetten",
  "Oberhausen",
  "Pfersee",
  "Bärenkeller",
  "Kriegshaber",
  "Stadtbergen",
  "Antonsviertel",
  "Augsburg-West",
];

const leistungen = [
  "Mieterbetreuung & Kommunikation",
  "Nebenkostenabrechnung (NKA) nach §556 BGB",
  "Mieterhöhungen nach Augsburger Mietspiegel",
  "Handwerker-Koordination & Auftragsvergabe",
  "WEG-Eigentümerversammlung & Beschlussprotokoll",
  "Jahresabrechnung & Wirtschaftsplan",
  "Digitales Mieterportal (Tickets, Dokumente)",
  "Vermietungsbegleitung & Mieterwechsel",
  "Energieausweis-Verwaltung (§16a GEG)",
  "Mahnung & SEPA-Einzug",
];

export default function HausverwaltungAugsburgPage() {
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
                Bayern · Augsburg
              </div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
                Hausverwaltung Augsburg —<br />
                <span className="text-teal">zuverlässig & transparent.</span>
              </h1>
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                Professionelle Mietverwaltung & WEG-Verwaltung für Augsburger Immobilien.
                Alle Stadtteile: Innenstadt, Lechhausen, Hochzoll, Göggingen, Haunstetten.
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
              Warum einfach verwaltet. für Augsburg?
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
                  Hausverwaltung Augsburg: Markt & Mietspiegel
                </h2>
                <p className="text-text-light leading-relaxed mb-6">
                  Augsburg ist die drittgrößte Stadt Bayerns mit rund 300.000 Einwohnern.
                  Als wirtschaftliches Zentrum Bayerisch-Schwabens und mit exzellenter Schienenanbindung
                  an München zieht Augsburg zunehmend Zuzug aus der teuren Landeshauptstadt an.
                  Der Augsburger Mietspiegel bildet die Grundlage für Mieterhöhungen nach §558 BGB.
                </p>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-teal mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-navy mb-1">Mietpreise Augsburg 2026</h4>
                      <p className="text-text-light text-sm">
                        Durchschnittliche Kaltmieten: €10–14/qm in bevorzugten Lagen (Innenstadt,
                        Göggingen), €9–11/qm in den Außenstadtteilen.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-teal mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-navy mb-1">Mietpreisbremse in Augsburg</h4>
                      <p className="text-text-light text-sm">
                        Augsburg ist in der bayerischen Mieterschutzverordnung gelistet.
                        Bei Neuvermietungen gilt: max. ortsübliche Vergleichsmiete + 10 %.
                        Wir prüfen vor jeder Neuvermietung die aktuellen Grenzen.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-teal mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-navy mb-1">Nachfragestarke Lagen</h4>
                      <p className="text-text-light text-sm">
                        Innenstadt und Antonsviertel verzeichnen die höchste Nachfrage.
                        Göggingen und Hochzoll sind für Familien besonders attraktiv.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-navy mb-6">
                  Alle Augsburger Stadtteile
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
                  Und alle weiteren Augsburger Stadtteile — digitale Prozesse ohne geografische Einschränkungen.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Leistungen */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl font-bold text-navy text-center mb-10">
              Leistungen der Hausverwaltung Augsburg
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
                Angebot für Augsburger Immobilie
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 px-6">
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="text-2xl font-bold text-navy mb-4">
              Hausverwaltung Augsburg Kosten
            </h2>
            <p className="text-text-light mb-8">
              Transparente Preise — keine versteckten Kosten, keine Mindestvertragslaufzeit über 1 Jahr.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 text-left">
                <h3 className="font-bold text-navy mb-1">Mietverwaltung Augsburg</h3>
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
                <h3 className="font-bold text-white mb-1">WEG-Verwaltung Augsburg</h3>
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
              Häufige Fragen zur Hausverwaltung Augsburg
            </h2>
            <div className="space-y-4">
              {faqStructuredData.mainEntity.map((faq) => (
                <details key={faq.name} className="border border-gray-200 rounded-xl overflow-hidden group">
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
              Ihre Augsburger Immobilie. Einfach verwaltet.
            </h2>
            <p className="text-white/70 mb-8 text-lg">
              Vom Mieterwechsel bis zur Jahresabrechnung — wir übernehmen die gesamte Verwaltung
              Ihrer Augsburger Immobilie. Transparent, digital, zuverlässig.
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
