import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Hausverwaltung Frankfurt: Kosten, Preise und Vergleich 2026 | einfach verwaltet.",
  description:
    "Hausverwaltung Frankfurt Kosten 2026: Mietverwaltung €25-38/Einheit, WEG-Verwaltung €24-34/Einheit. Preisvergleich, Leistungen & Tipps zur Verwalterwahl.",
  keywords:
    "Hausverwaltung Frankfurt Kosten, Hausverwaltung Frankfurt Preise, Mietverwaltung Frankfurt, WEG Verwaltung Frankfurt, Verwalter Frankfurt 2026",
  openGraph: {
    title: "Hausverwaltung Frankfurt: Kosten, Preise und Vergleich 2026",
    description:
      "Aktuelle Kosten für Hausverwaltung in Frankfurt am Main 2026. Preisvergleich und Tipps zur Verwalterwahl.",
    url: "https://einfach-verwaltet.de/blog/hausverwaltung-frankfurt-kosten",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Hausverwaltung Frankfurt: Kosten, Preise und Vergleich 2026",
  description:
    "Aktuelle Kosten für Hausverwaltung in Frankfurt am Main 2026: Preisvergleich, Leistungsumfang und Tipps zur Verwalterwahl.",
  author: { "@type": "Organization", name: "einfach verwaltet." },
  publisher: {
    "@type": "Organization",
    name: "einfach verwaltet.",
    logo: { "@type": "ImageObject", url: "https://einfach-verwaltet.de/logo.png" },
  },
  datePublished: "2026-02-27",
  inLanguage: "de",
  url: "https://einfach-verwaltet.de/blog/hausverwaltung-frankfurt-kosten",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was kostet eine Hausverwaltung in Frankfurt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Eine Hausverwaltung in Frankfurt kostet typischerweise zwischen €25 und €38 pro Einheit und Monat für Mietverwaltung. WEG-Verwaltungen liegen bei €24–34 pro Einheit. Die Preise sind höher als im Bundesdurchschnitt aufgrund der gestiegenen Personalkosten in der Mainmetropole.",
      },
    },
    {
      "@type": "Question",
      name: "Wie unterscheiden sich Mietverwaltung und WEG-Verwaltung in den Kosten?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mietverwaltungen in Frankfurt kosten meist €25–38 pro Einheit/Monat, während WEG-Verwaltungen bei €24–34 liegen. WEG-Verwaltungen sind oft etwas günstiger, da bestimmte Aufgaben (wie die Mieterbetreuung) weniger umfangreich sind, aber dafür kommen komplexe Eigentümerversammlungen hinzu.",
      },
    },
    {
      "@type": "Question",
      name: "Gibt es versteckte Kosten bei der Hausverwaltung?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Achten Sie auf Zusatzkosten für Vermietungsprovisionen (oft 1,5–2 Nettokaltmieten), Nebenkostenabrechnung pro Einheit (€30–80), Bereitstellungsgebühren für Mietverträge und Jahresabrechnungen. Seriöse Verwalter kommunizieren alle Kosten transparent im Vertrag.",
      },
    },
  ],
};

export default function Post() {
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
      <main className="bg-warm-white min-h-screen pt-16">
        <article className="max-w-3xl mx-auto px-4 py-16">
          <nav className="text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-teal">Startseite</Link>
            <span className="mx-2">›</span>
            <Link href="/blog" className="hover:text-teal">Ratgeber</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-700">Hausverwaltung Frankfurt Kosten</span>
          </nav>

          <header className="mb-10">
            <p className="text-teal text-sm font-semibold uppercase tracking-wider mb-3">
              Ratgeber · 9 min Lesezeit
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-navy font-playfair mb-4 leading-tight">
              Hausverwaltung Frankfurt: Kosten, Preise und Vergleich 2026
            </h1>
            <p className="text-gray-500 text-sm">Februar 2026 · einfach verwaltet.</p>
          </header>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <p>
              Frankfurt am Main ist Deutschlands führender Finanzplatz und einer der 
              attraktivsten Immobilienmärkte des Landes. Wer hier eine Immobilie besitzt, 
              stellt sich früher oder später die Frage: Was kostet eine professionelle 
              Hausverwaltung? Dieser Artikel gibt einen vollständigen Überblick über 
              aktuelle Preise, Leistungen und was Sie bei der Verwalterwahl beachten sollten.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Aktuelle Kosten für Hausverwaltung in Frankfurt 2026
            </h2>
            <p>
              Die Preise für Hausverwaltung in Frankfurt liegen über dem Bundesdurchschnitt. 
              Das liegt am hohen Preisniveau der Stadt, das sich in höheren Personalkosten 
              und Mieten für Büroflächen niederschlägt.
            </p>

            <div className="bg-navy/5 border border-navy/10 rounded-xl p-6">
              <h3 className="font-bold text-navy mb-3">Preisrahmen Frankfurt 2026</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Mietverwaltung (pro Einheit/Monat)</span>
                  <span className="font-semibold">€25–38</span>
                </div>
                <div className="flex justify-between">
                  <span>WEG-Verwaltung (pro Einheit/Monat)</span>
                  <span className="font-semibold">€24–34</span>
                </div>
                <div className="flex justify-between">
                  <span>Commercial-Verwaltung</span>
                  <span className="font-semibold">ab €40</span>
                </div>
                <div className="flex justify-between">
                  <span>Vermietungsprovision</span>
                  <span className="font-semibold">1,5–2 Nettokaltmieten</span>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Was ist im Preis enthalten?
            </h2>
            <p>
              Der Grundpreis deckt typischerweise folgende Leistungen ab. Achten Sie darauf, 
              dass diese im Vertrag explizit aufgeführt sind:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Mieterbetreuung:</strong> Erreichbarkeit für Anfragen, Koordination 
                von Reparaturen, Begehungen
              </li>
              <li>
                <strong>Nebenkostenabrechnung:</strong> Erstellung der jährlichen Betriebskostenabrechnung
              </li>
              <li>
                <strong>Mahnwesen:</strong> Überwachung der Mietzahlungen, Mahnungen bei Verzug
              </li>
              <li>
                <strong>Vertragsmanagement:</strong> Mietvertragsänderungen, Kündigungen, Neuvormietungen
              </li>
              <li>
                <strong>Jahresabrechnung:</strong> Zusammenstellung der Einnahmen und Ausgaben
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Zusatzkosten: Worauf Sie achten sollten
            </h2>
            <p>
              Neben dem Grundpreis können weitere Kosten anfallen. Seriöse Verwalter 
              kommunizieren diese transparent:
            </p>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-bold text-navy mb-3">Mögliche Zusatzkosten</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span>Vermietungsprovision</span>
                  <span className="font-semibold">1,5–2 Nettokaltmieten</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span>Nebenkostenabrechnung pro Einheit</span>
                  <span className="font-semibold">€30–80</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span>Zeitaufwand (€/Stunde)</span>
                  <span className="font-semibold">€60–120</span>
                </div>
                <div className="flex justify-between">
                  <span>ETV (Eigentümerversammlung)</span>
                  <span className="font-semibold">€400–1.200</span>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Frankfurt im Vergleich: Hamburg, München, Berlin
            </h2>
            <p>
              Wie positioniert sich Frankfurt im bundesweiten Vergleich? Die Preise in 
              der Mainmetropole sind vergleichbar mit München, aber höher als in Hamburg 
              oder Berlin.
            </p>

            <div className="bg-gray-50 rounded-xl p-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 font-semibold text-navy">Stadt</th>
                    <th className="text-right py-2 font-semibold text-navy">Mietverwaltung</th>
                    <th className="text-right py-2 font-semibold text-navy">WEG-Verwaltung</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-2">Frankfurt</td>
                    <td className="text-right py-2">€25–38</td>
                    <td className="text-right py-2">€24–34</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2">München</td>
                    <td className="text-right py-2">€28–38</td>
                    <td className="text-right py-2">€22–32</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2">Hamburg</td>
                    <td className="text-right py-2">€24–34</td>
                    <td className="text-right py-2">€22–30</td>
                  </tr>
                  <tr>
                    <td className="py-2">Berlin</td>
                    <td className="text-right py-2">€24–34</td>
                    <td className="text-right py-2">€22–30</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Kriterien für die Auswahl Ihrer Hausverwaltung
            </h2>
            <p>
              Der Preis sollte nicht das einzige Entscheidungskriterium sein. Achten Sie 
              auf diese Punkte:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Transparenz:</strong> Wer seine Preise nicht offen kommuniziert, 
                hat oft etwas zu verbergen.
              </li>
              <li>
                <strong>Lokale Expertise:</strong> Kennt die Verwaltung den Frankfurter Markt? 
                Die Unterschiede zwischen Westend und Sachsenhausen sind erheblich.
              </li>
              <li>
                <strong>Erreichbarkeit:</strong> Testen Sie die Telefonnummer. Werden Sie 
                durchgestellt oder landen Sie in einer Warteschleife?
              </li>
              <li>
                <strong>Digitalisierung:</strong> Ein Eigentümerportal und digitale 
                Dokumentenablage sollten Standard sein.
              </li>
              <li>
                <strong>Referenzen:</strong> Fragen Sie nach Referenzen in Ihrem Stadtteil.
              </li>
            </ol>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Steuerliche Aspekte
            </h2>
            <p>
              Die Kosten für eine Hausverwaltung sind bei der Vermietung von Immobilien 
              als Werbungskosten steuerlich absetzbar (§ 9 EStG). Das reduziert Ihre 
              steuerliche Belastung effektiv um Ihren persönlichen Steuersatz.
            </p>
            <p>
              Beispiel: Bei einem Steuersatz von 35% und Hausverwaltungskosten von 
              €300/Monat beträgt die steuerliche Ersparnis ca. €105/Monat. Die 
              effektiven Kosten liegen somit bei nur €195.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              FAQ: Hausverwaltung Frankfurt Kosten
            </h2>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-navy mb-2">
                  Was kostet eine Hausverwaltung in Frankfurt?
                </h3>
                <p className="text-sm">
                  Eine Hausverwaltung in Frankfurt kostet typischerweise zwischen 
                  €25 und €38 pro Einheit und Monat für Mietverwaltung. WEG-Verwaltungen 
                  liegen bei €24–34 pro Einheit.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-navy mb-2">
                  Was ist der Unterschied zwischen Miet- und WEG-Verwaltung?
                </h3>
                <p className="text-sm">
                  Mietverwaltungen betreuen vermietete Einheiten eines Eigentümers. 
                  WEG-Verwaltungen verwalten Eigentümergemeinschaften mit allen 
                  damit verbundenen Pflichten (ETV, Beschlüsse, Rücklagen).
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-navy mb-2">
                  Sind Hausverwaltungskosten steuerlich absetzbar?
                </h3>
                <p className="text-sm">
                  Ja, die Kosten für eine Hausverwaltung sind als Werbungskosten 
                  bei der Vermietung steuerlich absetzbar und reduzieren Ihre 
                  steuerliche Belastung.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Fazit: Preis ist nicht alles
            </h2>
            <p>
              Die Kosten für eine Hausverwaltung in Frankfurt sind höher als im 
              Bundesdurchschnitt, aber sie sparen Ihnen Zeit und Nerven. Konzentrieren 
              Sie sich bei der Wahl weniger auf den Preis als auf die Gesamtleistung. 
              Eine gute Hausverwaltung ist ein langfristiger Partner, der Ihre Immobilie 
              wertsteigernd betreut.
            </p>
          </div>

          <div className="mt-12 bg-teal/10 border border-teal/20 rounded-xl p-8">
            <h3 className="text-xl font-bold text-navy mb-2 font-playfair">
              Transparente Preise für Frankfurt
            </h3>
            <p className="text-gray-600 mb-4">
              einfach verwaltet. bietet professionelle Hausverwaltung in Frankfurt 
              ab €24/Einheit. Keine versteckten Kosten, keine Mindestvertragslaufzeit 
              über 1 Jahr.
            </p>
            <Link
              href="/anfrage"
              className="inline-block bg-teal text-white font-semibold px-6 py-3 rounded-lg hover:bg-teal/90 transition-colors"
            >
              Kostenloses Angebot anfordern
            </Link>
          </div>

          <div className="mt-10">
            <Link href="/blog" className="text-teal hover:underline text-sm">
              ← Zurück zum Ratgeber
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
