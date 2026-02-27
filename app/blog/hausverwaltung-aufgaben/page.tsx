import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Hausverwaltung Aufgaben: Die vollständige Liste für Eigentümer | einfach verwaltet.",
  description:
    "Hausverwaltung Aufgaben im Überblick: Mietverwaltung, WEG-Verwaltung, technisches & kaufmännisches Management — alle Pflichten und Services.",
  keywords:
    "Hausverwaltung Aufgaben, Mietverwaltung Aufgaben, WEG Verwaltung Aufgaben, Hausverwalter Pflichten",
  openGraph: {
    title: "Hausverwaltung Aufgaben: Die vollständige Liste für Eigentümer",
    description:
      "Was macht eine Hausverwaltung wirklich? Die komplette Aufgabenübersicht für Miet- und WEG-Verwaltung — von der Miete bis zur Eigentümerversammlung.",
    url: "https://einfach-verwaltet.de/blog/hausverwaltung-aufgaben",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "article",
  },
  alternates: {
    canonical: "https://einfach-verwaltet.de/blog/hausverwaltung-aufgaben",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Hausverwaltung Aufgaben: Die vollständige Liste für Eigentümer",
  description:
    "Alle Aufgaben einer Hausverwaltung im Überblick: Mietverwaltung, WEG-Verwaltung, technisches und kaufmännisches Management.",
  author: { "@type": "Organization", name: "einfach verwaltet." },
  publisher: {
    "@type": "Organization",
    name: "einfach verwaltet.",
    logo: { "@type": "ImageObject", url: "https://einfach-verwaltet.de/logo.png" },
  },
  datePublished: "2026-02-27",
  inLanguage: "de",
  url: "https://einfach-verwaltet.de/blog/hausverwaltung-aufgaben",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Welche Hauptaufgaben hat eine Hausverwaltung?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Eine Hausverwaltung hat drei Hauptaufgabenbereiche: kaufmännisches Management (Mieteinzug, Abrechnung, Buchhaltung), technisches Management (Instandhaltung, Reparaturen, Wartung) und rechtliches Management (Mietverträge, Kündigungen, Mahnwesen). Bei WEG-Verwaltungen kommen Versammlungsmanagement und Beschlussumsetzung hinzu.",
      },
    },
    {
      "@type": "Question",
      name: "Was macht eine Mietverwaltung konkret?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Eine Mietverwaltung kümmert sich um Mieterakquise und -auswahl, Mietvertragsgestaltung, Mieteinzug und Mahnwesen, Mieterbetreuung und -kommunikation, Nebenkostenabrechnung, Instandhaltungskoordination, Mängelbeseitigung sowie die Durchsetzung von Mieterrechten und -pflichten. Sie ist der Ansprechpartner für alle Mieterbelange.",
      },
    },
    {
      "@type": "Question",
      name: "Was ist der Unterschied zwischen Miet- und WEG-Verwaltung?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mietverwaltung betreut vermietete Immobilien eines Eigentümers mit Fokus auf Mieterbetreuung und Renditeoptimierung. WEG-Verwaltung verwaltet gemeinschaftliches Eigentum nach §26 WEG mit Fokus auf Eigentümerversammlungen, Beschlussumsetzung, Rücklagenbildung und Gemeinschaftsinteressen. Manche Verwalter bieten beide Leistungen an.",
      },
    },
  ],
};

export default function HausverwaltungAufgabenPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />
      <main className="pt-20 min-h-screen bg-warm-white">
        <article className="max-w-[800px] mx-auto px-6 py-12">
          <nav className="text-sm text-text-light mb-6" aria-label="Breadcrumb">
            <Link href="/blog" className="hover:text-teal transition-colors">Ratgeber</Link>
            <span className="mx-2">›</span>
            <span>Hausverwaltung Aufgaben</span>
          </nav>

          <header className="mb-10">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-teal/10 text-teal text-xs font-semibold px-3 py-1 rounded-full">Aufgaben</span>
              <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">11 min Lesezeit</span>
              <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">Februar 2026</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-navy leading-tight mb-4">
              Hausverwaltung Aufgaben: Die vollständige Liste für Eigentümer
            </h1>
            <p className="text-lg text-text-light leading-relaxed">
              Was genau macht eigentlich eine Hausverwaltung? Von der Miete bis zur Eigentümerversammlung — der komplette Überblick über alle Aufgabenbereiche.
            </p>
          </header>

          <div className="prose prose-navy max-w-none text-gray-700 leading-relaxed space-y-8">

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">Die drei Säulen der Hausverwaltung</h2>
              <p>
                Eine professionelle Hausverwaltung ist viel mehr als nur "die Miete eintreiben". Sie agiert als Schnittstelle zwischen Eigentümern, Mietern, Handwerkern und Behörden. Die Aufgaben lassen sich in drei Kernbereiche gliedern:
              </p>
              <div className="grid md:grid-cols-3 gap-4 my-6">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                  <h3 className="font-bold text-blue-800 mb-2">1. Kaufmännisches Management</h3>
                  <p className="text-sm">Miete, Abrechnung, Buchhaltung, Finanzplanung</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                  <h3 className="font-bold text-green-800 mb-2">2. Technisches Management</h3>
                  <p className="text-sm">Instandhaltung, Reparaturen, Wartung, Modernisierung</p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-5">
                  <h3 className="font-bold text-purple-800 mb-2">3. Rechtliches Management</h3>
                  <p className="text-sm">Verträge, Kündigungen, Mahnwesen, Compliance</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">Aufgaben der Mietverwaltung</h2>
              
              <h3 className="text-xl font-semibold text-navy mb-3">Mieterbetreuung & -akquise</h3>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-teal font-bold">✓</span>
                  <span>Besichtigungstermine koordinieren und durchführen</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-teal font-bold">✓</span>
                  <span>Mieterauswahl und Bonitätsprüfung</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-teal font-bold">✓</span>
                  <span>Mietvertragsgestaltung und -abschluss</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-teal font-bold">✓</span>
                  <span>Wohnungsübergabe und -rückgabe dokumentieren</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-teal font-bold">✓</span>
                  <span>Mieteranfragen beantworten (telefonisch, schriftlich, digital)</span>
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-navy mb-3">Mieteinzug & Finanzmanagement</h3>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-teal font-bold">✓</span>
                  <span>SEPA-Lastschriften einrichten und verwalten</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-teal font-bold">✓</span>
                  <span>Mieteingänge überwachen und prüfen</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-teal font-bold">✓</span>
                  <span>Mahnbescheide bei Zahlungsverzug</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-teal font-bold">✓</span>
                  <span>Räumungsklagen bei Mietnomaden</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-teal font-bold">✓</span>
                  <span>Kautionskonten verwalten (§551 BGB)</span>
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-navy mb-3">Nebenkostenabrechnung</h3>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-teal font-bold">✓</span>
                  <span>Betriebskosten erfassen und kontieren</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-teal font-bold">✓</span>
                  <span>Zählerstände dokumentieren und auswerten</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-teal font-bold">✓</span>
                  <span>Heizkostenabrechnung nach HeizkostenV</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-teal font-bold">✓</span>
                  <span>Jährliche Nebenkostenabrechnung erstellen (§556 BGB)</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-teal font-bold">✓</span>
                  <span>Widersprüche bearbeiten und Nachzahlungen einfordern</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">Aufgaben der WEG-Verwaltung</h2>
              <p>
                Die WEG-Verwaltung hat zusätzliche Schwerpunkte, da hier das Gemeinschaftseigentum im Vordergrund steht:
              </p>

              <h3 className="text-xl font-semibold text-navy mb-3">Eigentümerversammlung</h3>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-teal font-bold">✓</span>
                  <span>Einberufung (Einladung 2 Wochen vorher, §24 WEG)</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-teal font-bold">✓</span>
                  <span>Tagesordnung erstellen und Pflichtpunkte einplanen</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-teal font-bold">✓</span>
                  <span>Versammlung moderieren und protokollieren</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-teal font-bold">✓</span>
                  <span>Beschlussausfertigungen erstellen</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-teal font-bold">✓</span>
                  <span>Beschlussumsetzung organisieren</span>
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-navy mb-3">Wirtschaftsplan & Rücklagen</h3>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-teal font-bold">✓</span>
                  <span>Jährlichen Wirtschaftsplan erstellen</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-teal font-bold">✓</span>
                  <span>Hausgeldabrechnung erstellen</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-teal font-bold">✓</span>
                  <span>Instandhaltungsrücklage verwalten (§21 WEG)</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-teal font-bold">✓</span>
                  <span>Verzinsung der Rücklagen überwachen</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">Technische Aufgaben</h2>
              
              <h3 className="text-xl font-semibold text-navy mb-3">Instandhaltung & Reparaturen</h3>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-teal font-bold">✓</span>
                  <span>Mängelanzeigen von Mietern entgegennehmen</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-teal font-bold">✓</span>
                  <span>Handwerker beauftragen und koordinieren</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-teal font-bold">✓</span>
                  <span>Angebote einholen und vergleichen</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-teal font-bold">✓</span>
                  <span>Rechnungsprüfung und Freigabe</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-teal font-bold">✓</span>
                  <span>Qualitätskontrolle nach Fertigstellung</span>
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-navy mb-3">Wartung & Inspektion</h3>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-teal font-bold">✓</span>
                  <span>Heizungswartung (gesetzlich vorgeschrieben)</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-teal font-bold">✓</span>
                  <span>Aufzugsprüfung ( jährlich, BGV)</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-teal font-bold">✓</span>
                  <span>Elektroprüfung (VDE 0105)</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-teal font-bold">✓</span>
                  <span>Rauchmelder prüfen</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-teal font-bold">✓</span>
                  <span>Kehr-/ Überprüfung (Schornsteinfeger)</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">Rechtliche Begleitung</h2>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-teal font-bold">✓</span>
                  <span>Mietvertragsgestaltung (inkl. Sonderklauseln prüfen)</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-teal font-bold">✓</span>
                  <span>Mieterhöhungen nach §558 BGB durchsetzen</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-teal font-bold">✓</span>
                  <span>Kündigungen nach §573 BGB erstellen</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-teal font-bold">✓</span>
                  <span>Abmahnungen bei Vertragsverstößen</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-teal font-bold">✓</span>
                  <span>Zusammenarbeit mit Anwälten bei Streitfällen</span>
                </li>
              </ul>
            </section>

            <section className="bg-white rounded-2xl border border-gray-200 p-8 mt-10">
              <h2 className="text-2xl font-bold text-navy mb-6">Häufige Fragen zu Hausverwaltung Aufgaben</h2>
              <div className="space-y-6">
                {[
                  {
                    q: "Welche Hauptaufgaben hat eine Hausverwaltung?",
                    a: "Drei Hauptbereiche: Kaufmännisches Management (Miete, Abrechnung, Buchhaltung), Technisches Management (Instandhaltung, Reparaturen) und Rechtliches Management (Verträge, Kündigungen).",
                  },
                  {
                    q: "Was macht eine Mietverwaltung konkret?",
                    a: "Mieterakquise, Mietverträge, Mieteinzug, Mieterkommunikation, Nebenkostenabrechnung, Instandhaltungskoordination, Mängelbeseitigung — sie ist der zentrale Ansprechpartner für alle Mieterbelange.",
                  },
                  {
                    q: "Was ist der Unterschied zwischen Miet- und WEG-Verwaltung?",
                    a: "Mietverwaltung betreut vermietete Immobilien mit Fokus auf Mieter. WEG-Verwaltung verwaltet Gemeinschaftseigentum mit Fokus auf Eigentümerversammlungen, Beschlussumsetzung und Rücklagenbildung nach §26 WEG.",
                  },
                ].map((item, i) => (
                  <div key={i} className="border-b border-gray-100 pb-5 last:border-0 last:pb-0">
                    <h3 className="font-semibold text-navy mb-2">{item.q}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-navy rounded-2xl p-8 text-white text-center mt-10">
              <h2 className="text-2xl font-bold mb-3">Alle Aufgaben professionell erledigt?</h2>
              <p className="text-white/80 mb-6 max-w-md mx-auto">
                Wir übernehmen alle Aufgaben Ihrer Hausverwaltung — von der Miete bis zur Eigentümerversammlung, transparent und digital.
              </p>
              <Link
                href="/anfrage"
                className="inline-flex items-center gap-2 bg-teal text-white px-8 py-4 rounded-xl font-semibold text-base hover:bg-teal/90 transition-all hover:shadow-lg"
              >
                Jetzt unverbindlich anfragen →
              </Link>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
