import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "WEG oder Mietverwaltung: Was brauchen Sie? | einfach verwaltet.",
  description:
    "WEG Verwaltung vs Mietverwaltung: Der vollständige Vergleich. Aufgaben, Kosten, Rechtsgrundlagen und wann Sie welche Form brauchen.",
  keywords:
    "WEG Verwaltung vs Mietverwaltung, Unterschied WEG Mietverwaltung, WEG Verwaltung Aufgaben, Mietverwaltung Leistungen, Hausverwaltung Vergleich",
  openGraph: {
    title: "WEG oder Mietverwaltung: Was brauchen Sie?",
    description:
      "Der vollständige Vergleich: WEG-Verwaltung vs. Mietverwaltung — Aufgaben, Kosten und Entscheidungshilfe.",
    url: "https://einfach-verwaltet.de/blog/mietverwaltung-oder-wohnungseigentumsverwaltung",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "WEG oder Mietverwaltung: Was brauchen Sie?",
  description:
    "Der vollständige Vergleich von WEG-Verwaltung und Mietverwaltung: Aufgaben, Kosten, Rechtsgrundlagen und Entscheidungshilfe.",
  author: { "@type": "Organization", name: "einfach verwaltet." },
  publisher: {
    "@type": "Organization",
    name: "einfach verwaltet.",
    logo: { "@type": "ImageObject", url: "https://einfach-verwaltet.de/logo.png" },
  },
  datePublished: "2026-02-27",
  inLanguage: "de",
  url: "https://einfach-verwaltet.de/blog/mietverwaltung-oder-wohnungseigentumsverwaltung",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was ist der Unterschied zwischen WEG- und Mietverwaltung?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die Mietverwaltung betreut vermietete Immobilien eines Eigentümers (§ 675 BGB). Die WEG-Verwaltung verwaltet Wohnungseigentümergemeinschaften mit gemeinschaftlichem Eigentum (§ 26 WEG). Während die Mietverwaltung den Eigentümer bei der Vermietung unterstützt, organisiert die WEG-Verwaltung die Gemeinschaft aller Eigentümer eines Gebäudes.",
      },
    },
    {
      "@type": "Question",
      name: "Brauche ich beide Verwaltungsformen gleichzeitig?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, wenn Sie eine vermietete Eigentumswohnung besitzen. Die WEG-Verwaltung kümmert sich um das Gemeinschaftseigentum (Dach, Fassade, Treppenhaus), während die Mietverwaltung Ihre spezifische Einheit betreut (Mieter, Miete, Abrechnung). Viele Hausverwaltungen bieten beide Leistungen kombiniert an.",
      },
    },
    {
      "@type": "Question",
      name: "Was kostet eine WEG-Verwaltung im Vergleich zur Mietverwaltung?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "WEG-Verwaltungen kosten typischerweise €22–32 pro Einheit/Monat, Mietverwaltungen €24–38. Die WEG-Verwaltung ist oft etwas günstiger, da sie keine direkte Mieterbetreuung umfasst, aber dafür komplexere organisatorische Aufgaben wie Eigentümerversammlungen übernimmt.",
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
            <span className="text-gray-700">WEG vs Mietverwaltung</span>
          </nav>

          <header className="mb-10">
            <p className="text-teal text-sm font-semibold uppercase tracking-wider mb-3">
              Ratgeber · 10 min Lesezeit
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-navy font-playfair mb-4 leading-tight">
              WEG oder Mietverwaltung: Was brauchen Sie?
            </h1>
            <p className="text-gray-500 text-sm">Februar 2026 · einfach verwaltet.</p>
          </header>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <p>
              Eigentümer von Immobilien stehen vor einer wichtigen Entscheidung: Brauchen 
              sie eine WEG-Verwaltung, eine Mietverwaltung — oder sogar beides? Dieser 
              Artikel erklärt die Unterschiede, zeigt die jeweiligen Aufgabenbereiche 
              und hilft Ihnen, die richtige Wahl zu treffen.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Die Grundlagen: Was ist was?
            </h2>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              Mietverwaltung: Der klassische Service für Vermieter
            </h3>
            <p>
              Die Mietverwaltung betreut vermietete Immobilien für einen Eigentümer. 
              Sie übernimmt alle Aufgaben, die mit der Vermietung einer Immobilie 
              verbunden sind — von der Mietersuche bis zur Nebenkostenabrechnung.
            </p>

            <div className="bg-navy/5 border border-navy/10 rounded-xl p-6">
              <h4 className="font-bold text-navy mb-3">Typische Aufgaben der Mietverwaltung</h4>
              <ul className="space-y-1 text-sm">
                <li>• Mieterbetreuung und Kommunikation</li>
                <li>• Mietvertragsmanagement und Kündigungen</li>
                <li>• Mieteinzug und Mahnwesen</li>
                <li>• Nebenkostenabrechnung (NKA)</li>
                <li>• Koordination von Reparaturen und Instandhaltung</li>
                <li>• Mieterhöhungen nach Vorgabe</li>
                <li>• Übergabeprotokolle bei Ein- und Auszug</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              WEG-Verwaltung: Organisation der Eigentümergemeinschaft
            </h3>
            <p>
              Die WEG-Verwaltung (Wohnungseigentumsverwaltung) kümmert sich um 
              Wohnungseigentümergemeinschaften. Sie organisiert die gemeinschaftlichen 
              Belange aller Eigentümer eines Gebäudes oder einer Wohnanlage.
            </p>

            <div className="bg-navy/5 border border-navy/10 rounded-xl p-6">
              <h4 className="font-bold text-navy mb-3">Typische Aufgaben der WEG-Verwaltung</h4>
              <ul className="space-y-1 text-sm">
                <li>• Organisation der Eigentümerversammlung (§ 24 WEG)</li>
                <li>• Erstellung von Beschlussprotokollen</li>
                <li>• Verwaltung der Rücklagen (§ 21 WEG)</li>
                <li>• Jahresabrechnung und Wirtschaftsplan</li>
                <li>• Instandhaltung des Gemeinschaftseigentums</li>
                <li>• Versicherungsmanagement (Gebäudeversicherung)</li>
                <li>• Rechnungsstellung und Zahlungsverkehr der WEG</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Der entscheidende Unterschied: Auftraggeber und Rechtsgrundlage
            </h2>
            <p>
              Der fundamentale Unterschied liegt im Auftraggeber und der rechtlichen Basis:
            </p>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 font-semibold text-navy">Aspekt</th>
                    <th className="text-left py-2 font-semibold text-navy">Mietverwaltung</th>
                    <th className="text-left py-2 font-semibold text-navy">WEG-Verwaltung</th>
                  </tr>
                </thead>
                <tbody className="space-y-2">
                  <tr className="border-b border-gray-100">
                    <td className="py-2 font-medium">Rechtsgrundlage</td>
                    <td className="py-2">§ 675 BGB (Auftrag)</td>
                    <td className="py-2">§ 26 WEG (gesetzlich)</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 font-medium">Auftraggeber</td>
                    <td className="py-2">Einzelner Eigentümer</td>
                    <td className="py-2">Eigentümergemeinschaft</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 font-medium">Betreuungsobjekt</td>
                    <td className="py-2">Einzelne Wohnung/Haus</td>
                    <td className="py-2">Gemeinschaftseigentum</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 font-medium">Kündigungsfrist</td>
                    <td className="py-2">3 Monate (§ 621 BGB)</td>
                    <td className="py-2">3–5 Jahre (ETV-Beschluss)</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium">Kosten</td>
                    <td className="py-2">€24–38/Einheit/Monat</td>
                    <td className="py-2">€22–32/Einheit/Monat</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Praxisfall: Was brauche ich wann?
            </h2>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              Szenario 1: Einfamilienhaus zur Vermietung
            </h3>
            <p>
              Sie besitzen ein Zweifamilienhaus und vermieten beide Einheiten. Hier 
              benötigen Sie <strong>nur eine Mietverwaltung</strong>. Es gibt keine 
              WEG-Struktur, da das gesamte Gebäude Ihnen gehört.
            </p>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              Szenario 2: Eigentumswohnung zur Eigennutzung
            </h3>
            <p>
              Sie wohnen in Ihrer eigenen Wohnung in einem Mehrfamilienhaus. Hier 
              benötigen Sie <strong>nur eine WEG-Verwaltung</strong>. Die kümmert sich 
              um das Gemeinschaftseigentum (Dach, Fassade, Treppenhaus). Da Sie selbst 
              wohnen, brauchen Sie keine Mietverwaltung.
            </p>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              Szenario 3: Vermietete Eigentumswohnung
            </h3>
            <p>
              Sie besitzen eine vermietete Eigentumswohnung. Hier benötigen Sie 
              <strong> beide Verwaltungsformen</strong>: Die WEG-Verwaltung kümmert 
              sich um das Gemeinschaftseigentum (Dach, Fassade), die Mietverwaltung 
              um Ihre spezifische Einheit (Mieter, Miete, Abrechnung).
            </p>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              Szenario 4: Mehrere Eigentumswohnungen im selben Haus
            </h3>
            <p>
              Sie besitzen drei Wohnungen in einem Mehrfamilienhaus und vermieten 
              diese. Auch hier benötigen Sie <strong>beide Formen</strong> — allerdings 
              können Sie bei der Mietverwaltung oft Staffelrabatte für mehrere Einheiten 
              aushandeln.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Kombinierte Verwaltung: Ein Ansprechpartner für alles?
            </h2>
            <p>
              Viele Hausverwaltungen bieten beide Leistungen kombiniert an. Das hat 
              Vorteile:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Ein Ansprechpartner:</strong> Sie müssen nicht zwischen WEG- 
                und Mietverwaltung unterscheiden
              </li>
              <li>
                <strong>Bessere Kommunikation:</strong> Die Verwaltung kennt alle 
                Details Ihrer Immobilie
              </li>
              <li>
                <strong>Mögliche Rabatte:</strong> Kombipakete sind oft günstiger 
                als zwei separate Verträge
              </li>
              <li>
                <strong>Koordination:</strong> WEG-Maßnahmen können direkt mit 
                Mietern abgestimmt werden
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Kosten im Vergleich
            </h2>
            <p>
              Die Kosten für beide Verwaltungsformen unterscheiden sich nicht 
              dramatisch. Im Durchschnitt liegt die Mietverwaltung etwas höher, 
              da sie mehr direkte Mieterbetreuung beinhaltet.
            </p>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-navy mb-3">Kostenübersicht 2026</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span>Mietverwaltung</span>
                  <span className="font-semibold">€24–38/Einheit/Monat</span>
                </div>
                <div className="flex justify-between">
                  <span>WEG-Verwaltung</span>
                  <span className="font-semibold">€22–32/Einheit/Monat</span>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              FAQ: WEG vs. Mietverwaltung
            </h2>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-navy mb-2">
                  Was ist der Hauptunterschied?
                </h3>
                <p className="text-sm">
                  Die Mietverwaltung betreut vermietete Einheiten eines Eigentümers, 
                  die WEG-Verwaltung organisiert die Gemeinschaft aller Eigentümer 
                  eines Gebäudes.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-navy mb-2">
                  Kann ich dieselbe Firma für beides nutzen?
                </h3>
                <p className="text-sm">
                  Ja, viele Hausverwaltungen bieten beide Leistungen an. Das ist oft 
                  praktischer und kann günstiger sein.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-navy mb-2">
                  Wer bestellt die WEG-Verwaltung?
                </h3>
                <p className="text-sm">
                  Die WEG-Verwaltung wird von der Eigentümerversammlung bestellt 
                  (§ 26 WEG). Als Einzeleigentümer können Sie das nicht allein entscheiden.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Fazit: Die richtige Wahl treffen
            </h2>
            <p>
              Die Entscheidung zwischen WEG- und Mietverwaltung hängt von Ihrer 
              Eigentumssituation ab: Bei einem ganzen vermieteten Haus brauchen Sie 
              nur Mietverwaltung. Bei einer Eigentumswohnung brauchen Sie WEG-Verwaltung 
              — und zusätzlich Mietverwaltung, wenn Sie vermieten. Die gute Nachricht: 
              Die meisten Verwaltungen bieten beides und können Ihnen ein maßgeschneidertes 
              Paket zusammenstellen.
            </p>
          </div>

          <div className="mt-12 bg-teal/10 border border-teal/20 rounded-xl p-8">
            <h3 className="text-xl font-bold text-navy mb-2 font-playfair">
              Beide Verwaltungsformen aus einer Hand
            </h3>
            <p className="text-gray-600 mb-4">
              einfach verwaltet. bietet sowohl Mietverwaltung als auch WEG-Verwaltung. 
              Ein Ansprechpartner, transparente Preise, digitale Prozesse.
            </p>
            <Link
              href="/anfrage"
              className="inline-block bg-teal text-white font-semibold px-6 py-3 rounded-lg hover:bg-teal/90 transition-colors"
            >
              Unverbindlich beraten lassen
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
