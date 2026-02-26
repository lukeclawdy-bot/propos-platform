import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "WEG-Verwaltung vs. Mietverwaltung: Was ist der Unterschied? (2026)",
  description:
    "WEG-Verwaltung oder Mietverwaltung — oder beides? Der vollständige Vergleich: Aufgaben, Rechtsbasis, Kosten und wann Sie welche Verwaltungsform brauchen.",
  keywords:
    "WEG Verwaltung Unterschied, WEG vs Mietverwaltung, WEG Verwalter Aufgaben, Mietverwaltung Aufgaben, Unterschied WEG Mietverwaltung",
  openGraph: {
    title: "WEG-Verwaltung vs. Mietverwaltung: Was ist der Unterschied?",
    description:
      "§ 26 WEG, Eigentümerversammlung, Jahresabrechnung: Was WEG-Verwaltung leistet und worin sie sich von der Mietverwaltung unterscheidet.",
    url: "https://einfach-verwaltet.de/blog/weg-vs-mietverwaltung",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "WEG-Verwaltung vs. Mietverwaltung: Was ist der Unterschied?",
  description:
    "Alles über den Unterschied zwischen WEG-Verwaltung und Mietverwaltung — Rechtsbasis, Aufgaben, Kosten und wann welche Form notwendig ist.",
  author: { "@type": "Organization", name: "einfach verwaltet." },
  publisher: {
    "@type": "Organization",
    name: "einfach verwaltet.",
    logo: { "@type": "ImageObject", url: "https://einfach-verwaltet.de/logo.png" },
  },
  datePublished: "2026-02-26",
  inLanguage: "de",
  url: "https://einfach-verwaltet.de/blog/weg-vs-mietverwaltung",
};

export default function Post() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="bg-warm-white min-h-screen pt-16">
        <article className="max-w-3xl mx-auto px-4 py-16">
          <nav className="text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-teal">Startseite</Link>
            <span className="mx-2">›</span>
            <Link href="/blog" className="hover:text-teal">Ratgeber</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-700">WEG-Verwaltung vs. Mietverwaltung</span>
          </nav>

          <header className="mb-10">
            <p className="text-teal text-sm font-semibold uppercase tracking-wider mb-3">
              Ratgeber · 8 min Lesezeit · WEG &amp; Mietverwaltung
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-navy font-playfair mb-4 leading-tight">
              WEG-Verwaltung vs. Mietverwaltung: Was ist der Unterschied?
            </h1>
            <p className="text-gray-500 text-sm">Februar 2026 · einfach verwaltet.</p>
          </header>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <p>
              Wer zum ersten Mal eine Wohnung kauft oder ein Mehrfamilienhaus erwirbt, begegnet
              schnell zwei Begriffen: WEG-Verwaltung und Mietverwaltung. Beide klingen ähnlich —
              meinen aber grundlegend verschiedene Dinge. Das Verständnis des Unterschieds ist
              entscheidend, um die richtige Verwaltungsform zu wählen und Ihre Immobilie
              optimal aufgestellt zu haben.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Die Grundlage: Welche Eigentumssituation liegt vor?
            </h2>
            <p>
              Der entscheidende Unterschied liegt nicht in der Leistung, sondern in der
              <strong> Eigentumssituation</strong>:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>WEG (Wohnungseigentümergemeinschaft):</strong> Mehrere Personen besitzen
                gemeinsam ein Gebäude. Jeder ist Eigentümer seiner Wohnung (Sondereigentum) —
                und Miteigentümer des Gebäudes, des Grundstücks und der gemeinschaftlichen
                Anlagen (Gemeinschaftseigentum).
              </li>
              <li>
                <strong>Allein-Eigentümer:</strong> Eine Person oder ein Unternehmen besitzt
                das gesamte Gebäude und vermietet die einzelnen Wohnungen.
              </li>
            </ul>
            <p>
              Für eine <strong>WEG</strong> ist WEG-Verwaltung zwingend erforderlich. Für einen
              <strong> Allein-Eigentümer</strong> kommt Mietverwaltung in Frage. Wer als
              WEG-Eigentümer seine Wohnung vermietet, braucht häufig beides: die WEG-Verwaltung
              für das Gemeinschaftseigentum und eine Sondereigentumsverwaltung (SEV) für
              sein persönliches Mietverhältnis.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Was ist WEG-Verwaltung?
            </h2>
            <p>
              Die WEG-Verwaltung ist im <strong>Wohnungseigentumsgesetz (WEG)</strong> geregelt.
              Der WEG-Verwalter wird von der Eigentümergemeinschaft bestellt (§ 26 WEG) und
              hat klare gesetzliche Aufgaben.
            </p>
            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              Kernaufgaben der WEG-Verwaltung
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Eigentümerversammlung (§ 24 WEG):</strong> Einberufung mindestens einmal
                jährlich, Vorbereitung der Tagesordnung, Protokollführung und Beschlussdurchführung.
              </li>
              <li>
                <strong>Verwalterbestellung (§ 26 WEG):</strong> Der Verwalter wird für maximal
                fünf Jahre bestellt. Die Gemeinschaft kann ihn jederzeit mit einfacher Mehrheit
                abberufen.
              </li>
              <li>
                <strong>Jahresabrechnung (§ 28 Abs. 2 WEG):</strong> Abrechnung aller tatsächlichen
                Kosten des Gemeinschaftseigentums — aufgeteilt auf alle Eigentümer nach Miteigentumsanteilen.
              </li>
              <li>
                <strong>Wirtschaftsplan (§ 28 Abs. 1 WEG):</strong> Kostenprognose für das
                kommende Jahr, Grundlage der monatlichen Hausgeldvorauszahlungen.
              </li>
              <li>
                <strong>Instandhaltungsrücklage:</strong> Verwaltung und Anlage der Rücklagen für
                zukünftige Instandhaltungen.
              </li>
              <li>
                <strong>Instandhaltung Gemeinschaftseigentum:</strong> Beauftragung von Handwerkern
                für Treppenhaus, Fassade, Dach, Heizungsanlage etc.
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              Verwalterbestellung nach § 26 WEG: Was Sie wissen sollten
            </h3>
            <p>
              Die Eigentümergemeinschaft wählt den Verwalter per Beschluss mit einfacher Mehrheit.
              Die Amtszeit beträgt maximal fünf Jahre (§ 26 Abs. 1 WEG). Wichtig seit der
              WEG-Reform 2020: Auch ohne wichtigen Grund kann der Verwalter jederzeit abberufen
              werden — der Vertrag endet dann nach spätestens sechs Monaten.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Was ist Mietverwaltung?
            </h2>
            <p>
              Die Mietverwaltung — auch <strong>Sondereigentumsverwaltung (SEV)</strong> oder
              einfach Miethausverwaltung genannt — kümmert sich um das Verhältnis zwischen
              Vermieter und Mieter. Sie ist nicht durch das WEG geregelt, sondern durch den
              BGB-Mietvertrag und den Verwaltervertrag.
            </p>
            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              Kernaufgaben der Mietverwaltung
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Mieteinzug und Mahnung:</strong> Überwachung des monatlichen Mieteingangs,
                Erstellung und Versand von Mahnungen bei Zahlungsverzug.
              </li>
              <li>
                <strong>Nebenkostenabrechnung:</strong> Jährliche Abrechnung der umlagefähigen
                Betriebskosten nach § 556 BGB und § 2 BetrKV.
              </li>
              <li>
                <strong>Mietermananagement:</strong> Kommunikation mit Mietern, Bearbeitung von
                Anfragen und Beschwerden, Koordination von Reparaturen.
              </li>
              <li>
                <strong>Neuvermietung:</strong> Mietersuche, Bonitätsprüfung, Mietvertragsabschluss,
                Wohnungsübergaben.
              </li>
              <li>
                <strong>Mieterhöhung:</strong> Prüfung der Möglichkeit, Berechnung und Versand
                von Mieterhöhungsschreiben nach § 558 BGB.
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Der direkte Vergleich: WEG-Verwaltung vs. Mietverwaltung
            </h2>
            <div className="overflow-x-auto my-6 not-prose">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-navy text-white">
                    <th className="px-4 py-3 text-left rounded-tl-lg">Merkmal</th>
                    <th className="px-4 py-3 text-center">WEG-Verwaltung</th>
                    <th className="px-4 py-3 text-center rounded-tr-lg">Mietverwaltung</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Gesetzliche Basis", "WEG (§§ 18–48)", "BGB (§§ 535 ff.)"],
                    ["Auftraggeber", "Eigentümergemeinschaft", "Einzelner Eigentümer"],
                    ["Zuständigkeit", "Gemeinschaftseigentum", "Sondereigentum / Mietverhältnis"],
                    ["Pflichtorgan", "Ja (§ 26 WEG)", "Nein (optional)"],
                    ["Eigentümerversammlung", "Ja (mindestens 1×/Jahr)", "Nein"],
                    ["Jahresabrechnung", "WEG-Gesamtabrechnung", "Nebenkostenabrechnung"],
                    ["Kosten (Hamburg)", "ab €22–35/Einheit/Monat", "ab €24–34/Einheit/Monat"],
                  ].map(([merkmal, weg, miete], i) => (
                    <tr key={merkmal} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-4 py-3 font-medium text-navy border-b border-gray-100">{merkmal}</td>
                      <td className="px-4 py-3 text-center border-b border-gray-100">{weg}</td>
                      <td className="px-4 py-3 text-center border-b border-gray-100">{miete}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Wann brauchen Sie was?
            </h2>
            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              Sie brauchen WEG-Verwaltung, wenn …
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Sie eine Eigentumswohnung in einem Mehrparteienhaus besitzen</li>
              <li>Ihr Haus in Wohnungseigentum aufgeteilt ist (Teilungserklärung vorhanden)</li>
              <li>Es mehrere Eigentümer in einem Gebäude gibt</li>
            </ul>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              Sie brauchen Mietverwaltung, wenn …
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Sie ein Mehrfamilienhaus vollständig besitzen und alle Einheiten vermieten</li>
              <li>Sie eine einzelne Wohnung besitzen und diese vermieten</li>
              <li>Sie als WEG-Eigentümer Ihre Einheit vermieten (dann zusätzlich zur WEG-Verwaltung)</li>
            </ul>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Die Kombination: WEG + Sondereigentumsverwaltung (SEV)
            </h2>
            <p>
              Wer eine Eigentumswohnung besitzt und vermietet, braucht in der Praxis beides:
              Die WEG-Verwaltung kümmert sich um das Gebäude und die Gemeinschaft, die SEV
              kümmert sich um das persönliche Mietverhältnis. Viele Eigentümer beauftragens
              denselben Anbieter mit beiden Leistungen — das spart Koordinationsaufwand und
              ergibt ein kohärentes Bild.
            </p>
            <p>
              einfach verwaltet. bietet WEG-Verwaltung und Mietverwaltung aus einer Hand —
              abgestimmt, transparent und mit einem einzigen Ansprechpartner für alles.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Fazit: Zwei Verwaltungsformen, eine Entscheidung
            </h2>
            <p>
              WEG-Verwaltung und Mietverwaltung sind keine Alternativen, sondern Ergänzungen.
              Welche Form — oder welche Kombination — für Sie richtig ist, hängt von Ihrer
              Eigentumssituation ab. Was beide gemeinsam haben: Sie funktionieren nur so gut
              wie der Anbieter dahinter. Transparenz, Erreichbarkeit und Zuverlässigkeit
              sind der eigentliche Unterschied.
            </p>
          </div>

          <div className="mt-12 bg-teal/10 border border-teal/20 rounded-xl p-8">
            <h3 className="text-xl font-bold text-navy mb-2 font-playfair">
              WEG und Mietverwaltung aus einer Hand
            </h3>
            <p className="text-gray-600 mb-4">
              einfach verwaltet. übernimmt beide Verwaltungsformen — abgestimmt, digital, mit
              transparenter Abrechnung. Jetzt kostenlos Angebot anfragen.
            </p>
            <Link
              href="/anfrage"
              className="inline-block bg-teal text-white font-semibold px-6 py-3 rounded-lg hover:bg-teal/90 transition-colors"
            >
              Angebot in 2 Minuten →
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
