import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Hausverwaltung Essen — Professionelle Verwaltung für Ihr Eigentum | einfach verwaltet.",
  description:
    "Hausverwaltung Essen: Mietverwaltung, WEG-Verwaltung und Sondereigentumsverwaltung für Essener Eigentümer. Transparente Preise, schnelle Reaktionszeiten, §34c-zertifiziert.",
  keywords:
    "Hausverwaltung Essen, Mietverwaltung Essen, WEG-Verwaltung Essen, Hausverwaltung Ruhrgebiet",
  openGraph: {
    title: "Hausverwaltung Essen — Professionelle Verwaltung für Ihr Eigentum",
    description:
      "Mietverwaltung und WEG-Verwaltung in Essen — transparent, digital, immer erreichbar.",
    url: "https://einfach-verwaltet.de/blog/hausverwaltung-essen",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "article",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "einfach verwaltet.",
  description:
    "Professionelle Hausverwaltung in Essen und dem Ruhrgebiet. Mietverwaltung, WEG-Verwaltung, Sondereigentumsverwaltung.",
  url: "https://einfach-verwaltet.de",
  email: "kontakt@einfach-verwaltet.de",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Singapurstr. 19",
    addressLocality: "Hamburg",
    postalCode: "20457",
    addressCountry: "DE",
  },
  areaServed: ["Essen", "Ruhrgebiet", "Nordrhein-Westfalen"],
  serviceType: ["Hausverwaltung", "WEG-Verwaltung", "Mietverwaltung"],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was kostet eine Hausverwaltung in Essen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In Essen liegen die Preise für professionelle Hausverwaltung üblicherweise zwischen €22 und €38 pro Einheit und Monat, abhängig von Leistungsumfang und Portfoliogröße. Bei einfach verwaltet. starten die Preise ab €24/Einheit/Monat.",
      },
    },
    {
      "@type": "Question",
      name: "Bieten Sie WEG-Verwaltung in Essen an?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Wir übernehmen die vollständige WEG-Verwaltung nach aktuellem WEGMoG — inklusive Eigentümerversammlung, Beschlussprotokoll, Instandhaltungsrücklage und Jahresabrechnung.",
      },
    },
    {
      "@type": "Question",
      name: "Wie schnell reagiert die Hausverwaltung auf Mieteranfragen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Unser SLA: Jede Mieteranfrage wird innerhalb von 15 Minuten bestätigt. Kritische Fälle (Wasserschaden, Heizungsausfall) werden sofort eskaliert und innerhalb von 2 Stunden aktiv bearbeitet.",
      },
    },
  ],
};

export default function HausverwaltungEssen() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <main className="bg-warm-white min-h-screen pt-16">
        <div className="bg-navy py-16 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="inline-block bg-teal/20 text-teal text-xs font-semibold px-3 py-1 rounded-full mb-4">
              Hausverwaltung Essen
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Hausverwaltung Essen — Professionelle Verwaltung für Ihr Eigentum
            </h1>
            <p className="text-white/70 text-lg">
              Mietverwaltung und WEG-Verwaltung in Essen — digital, transparent, immer erreichbar.
            </p>
            <div className="flex items-center gap-4 mt-6 text-white/50 text-sm">
              <span>Februar 2026</span>
              <span>·</span>
              <span>8 min Lesezeit</span>
            </div>
          </div>
        </div>

        <article className="max-w-3xl mx-auto px-4 py-12">
          <nav className="text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-teal">Startseite</Link>
            <span className="mx-2">›</span>
            <Link href="/blog" className="hover:text-teal">Ratgeber</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-700">Hausverwaltung Essen</span>
          </nav>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">

            <h2 className="text-2xl font-bold text-navy mt-2 mb-4">
              Hausverwaltung in Essen — was Eigentümer heute erwarten
            </h2>
            <p>
              Essen ist die drittgrößte Stadt Nordrhein-Westfalens und ein bedeutender Immobilienmarkt im Ruhrgebiet. Mit rund 583.000 Einwohnern, einer diversifizierten Wirtschaftsstruktur und einem wachsenden Anteil an Mehrfamilienhäusern stehen Eigentümer vor einer komplexen Aufgabe: professionelle <strong>Hausverwaltung in Essen</strong>, die nicht nur Miete einzieht, sondern den Wert der Immobilie aktiv schützt.
            </p>
            <p>
              Viele Eigentümer in Essen berichten über dasselbe Problem: Der alte Hausverwalter ist schwer erreichbar, die Nebenkostenabrechnung kommt zu spät, und Reparaturen werden verschleppt. Dabei ist die Rechtslage klar — nach §556 BGB muss die Betriebskostenabrechnung innerhalb von 12 Monaten nach dem Abrechnungszeitraum beim Mieter sein. Wer diese Frist verpasst, verliert Nachforderungen.
            </p>

            <h2 className="text-2xl font-bold text-navy mt-10 mb-4">
              Mietverwaltung Essen: Was gehört dazu?
            </h2>
            <p>
              Eine vollständige <strong>Mietverwaltung in Essen</strong> umfasst weit mehr als den Mieteinzug. Zu den Kernleistungen gehören:
            </p>
            <ul className="space-y-2 my-4 pl-4">
              <li className="flex items-start gap-2"><span className="text-teal mt-1">✓</span><span><strong>Mieteinzug und Mahnwesen</strong> — SEPA-Lastschrift, Kontoabstimmung, rechtssichere Mahnung nach §286 BGB</span></li>
              <li className="flex items-start gap-2"><span className="text-teal mt-1">✓</span><span><strong>Jährliche Nebenkostenabrechnung</strong> — termingerecht, vollständig, nach §2 BetrKV</span></li>
              <li className="flex items-start gap-2"><span className="text-teal mt-1">✓</span><span><strong>Handwerker-Koordination</strong> — Schadensmeldung, Auftragsvergabe, Qualitätskontrolle</span></li>
              <li className="flex items-start gap-2"><span className="text-teal mt-1">✓</span><span><strong>Mieterkorrespondenz</strong> — schriftliche Kommunikation, Eingangsbestätigung innerhalb von 15 Minuten</span></li>
              <li className="flex items-start gap-2"><span className="text-teal mt-1">✓</span><span><strong>Wohnungsübergaben</strong> — Übergabeprotokoll, Schlüsselmanagement, Dokumentation</span></li>
              <li className="flex items-start gap-2"><span className="text-teal mt-1">✓</span><span><strong>Eigentümer-Dashboard</strong> — Echtzeit-Übersicht über Zahlungsstatus, offene Tickets, Unterlagen</span></li>
            </ul>

            <h2 className="text-2xl font-bold text-navy mt-10 mb-4">
              WEG-Verwaltung Essen: Ihre Pflichten als WEG
            </h2>
            <p>
              Eigentümergemeinschaften in Essen unterliegen dem <strong>Wohnungseigentumsgesetz (WEG)</strong>, zuletzt grundlegend reformiert durch das WEGMoG 2020. Die wichtigsten Pflichten des Verwalters:
            </p>
            <div className="bg-light-gray rounded-xl p-5 my-4 text-sm space-y-3 not-prose">
              <div><strong className="text-navy">Eigentümerversammlung (§24 WEG):</strong> Mindestens einmal jährlich, mit ordnungsgemäßer Einladung, Beschlussfähigkeit und Protokollierung.</div>
              <div><strong className="text-navy">Hausgeldabrechnung (§28 WEG):</strong> Jahresabrechnung mit Einzel- und Gesamtabrechnung, fristgerecht erstellt.</div>
              <div><strong className="text-navy">Instandhaltungsrücklage:</strong> Angemessene Bildung und sichere Anlage der Rücklage — häufig vernachlässigt von kleinen Verwaltungen.</div>
              <div><strong className="text-navy">Beschluss-Sammlung:</strong> Lückenlose Dokumentation aller Beschlüsse nach §24 Abs. 7 WEG.</div>
            </div>
            <p>
              Mit einfach verwaltet. erhalten Sie einen <strong>zertifizierten WEG-Verwalter nach §34c GewO</strong>, der alle gesetzlichen Anforderungen kennt und terminsicher umsetzt.
            </p>

            <h2 className="text-2xl font-bold text-navy mt-10 mb-4">
              Kosten der Hausverwaltung in Essen
            </h2>
            <p>
              Die Preise für <strong>Hausverwaltung Essen</strong> variieren erheblich. Marktüblich sind:
            </p>
            <div className="not-prose overflow-x-auto rounded-xl border border-navy/10 my-4">
              <table className="w-full text-sm">
                <thead className="bg-navy text-white">
                  <tr>
                    <th className="py-3 px-4 text-left">Anbietertyp</th>
                    <th className="py-3 px-4 text-center">Kosten/Einheit/Monat</th>
                    <th className="py-3 px-4 text-center">Reaktionszeit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="py-3 px-4">Lokale Verwaltung (klassisch)</td>
                    <td className="py-3 px-4 text-center">€26–40</td>
                    <td className="py-3 px-4 text-center">24–72 Stunden</td>
                  </tr>
                  <tr className="bg-light-gray">
                    <td className="py-3 px-4">Großverwaltung</td>
                    <td className="py-3 px-4 text-center">€20–30</td>
                    <td className="py-3 px-4 text-center">Tage/Wochen</td>
                  </tr>
                  <tr className="bg-white font-semibold">
                    <td className="py-3 px-4 text-teal">einfach verwaltet.</td>
                    <td className="py-3 px-4 text-center text-teal">€24–34</td>
                    <td className="py-3 px-4 text-center text-teal">&lt; 15 Minuten</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-navy mt-10 mb-4">
              Warum einfach verwaltet. für Essener Eigentümer?
            </h2>
            <p>
              Wir sind keine klassische Hausverwaltung, die mit Fax und Excel arbeitet. Als <strong>digital-native Verwaltung</strong> setzen wir auf:
            </p>
            <ul className="space-y-2 my-4 pl-4">
              <li className="flex items-start gap-2"><span className="text-amber mt-1">→</span><span><strong>KI-gestützte Kommunikation:</strong> Mieteranfragen werden automatisch kategorisiert, priorisiert und innerhalb von 15 Minuten beantwortet.</span></li>
              <li className="flex items-start gap-2"><span className="text-amber mt-1">→</span><span><strong>Digitales Mieterportal:</strong> Mieter melden Schäden, laden Dokumente hoch und verfolgen den Status — ohne Telefonwarteschleifen.</span></li>
              <li className="flex items-start gap-2"><span className="text-amber mt-1">→</span><span><strong>Transparentes Eigentümer-Dashboard:</strong> Sie sehen in Echtzeit, was mit Ihrer Immobilie passiert — Zahlungsstatus, Handwerkertermine, Dokumente.</span></li>
              <li className="flex items-start gap-2"><span className="text-amber mt-1">→</span><span><strong>§34c GewO zertifiziert:</strong> Volle rechtliche Absicherung, keine Graubereiche.</span></li>
            </ul>

            <h2 className="text-2xl font-bold text-navy mt-10 mb-4">
              Häufige Fragen zur Hausverwaltung in Essen
            </h2>

            <div className="not-prose space-y-4 my-4">
              <div className="bg-white border border-navy/10 rounded-xl p-5">
                <p className="font-semibold text-navy mb-2">Was kostet eine Hausverwaltung in Essen?</p>
                <p className="text-text-light text-sm">In Essen liegen die Preise üblicherweise zwischen €22 und €38 pro Einheit und Monat. Bei einfach verwaltet. starten die Preise ab €24/Einheit/Monat mit vollem Leistungsumfang.</p>
              </div>
              <div className="bg-white border border-navy/10 rounded-xl p-5">
                <p className="font-semibold text-navy mb-2">Bieten Sie WEG-Verwaltung in Essen an?</p>
                <p className="text-text-light text-sm">Ja. Wir übernehmen die vollständige WEG-Verwaltung nach aktuellem WEGMoG — inklusive Eigentümerversammlung, Beschlussprotokoll, Instandhaltungsrücklage und Jahresabrechnung.</p>
              </div>
              <div className="bg-white border border-navy/10 rounded-xl p-5">
                <p className="font-semibold text-navy mb-2">Wie schnell reagiert einfach verwaltet. auf Mieteranfragen?</p>
                <p className="text-text-light text-sm">Unser SLA: Jede Mieteranfrage wird innerhalb von 15 Minuten bestätigt. Kritische Fälle (Wasserschaden, Heizungsausfall) werden sofort eskaliert und innerhalb von 2 Stunden aktiv bearbeitet.</p>
              </div>
            </div>

            <div className="not-prose bg-amber/10 border border-amber/30 rounded-2xl p-7 my-8 text-center">
              <h3 className="text-xl font-bold text-navy mb-2">Kostenloses Angebot für Essen anfragen</h3>
              <p className="text-text-light text-sm mb-5">Teilen Sie uns Ihre Einheitenzahl mit — wir melden uns innerhalb von 24 Stunden mit einem transparenten Angebot.</p>
              <Link
                href="/anfrage"
                className="inline-flex items-center gap-2 bg-amber hover:bg-amber/90 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Jetzt Angebot anfragen →
              </Link>
            </div>

          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
