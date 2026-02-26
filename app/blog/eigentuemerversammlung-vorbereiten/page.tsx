import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Eigentümerversammlung vorbereiten: Checkliste für Vermieter 2026 | einfach verwaltet.",
  description:
    "Eigentümerversammlung richtig vorbereiten: Einladungsfristen, Tagesordnung, Beschlussfähigkeit, Protokoll und digitale ETV nach WEG-Reform.",
  keywords:
    "Eigentümerversammlung vorbereiten, ETV Checkliste, WEG Versammlung, Eigentümerversammlung Einladung, digitale Eigentümerversammlung",
  openGraph: {
    title: "Eigentümerversammlung vorbereiten: Checkliste für Vermieter",
    description:
      "Von der Einladung bis zum Protokoll — so gelingt Ihre nächste Eigentümerversammlung.",
    url: "https://einfach-verwaltet.de/blog/eigentuemerversammlung-vorbereiten",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Eigentümerversammlung vorbereiten: Checkliste für Vermieter",
  description:
    "Einladungsfristen, Tagesordnung, Beschlussfähigkeit und Protokoll — der komplette Leitfaden für WEG-Versammlungen.",
  author: { "@type": "Organization", name: "einfach verwaltet." },
  publisher: {
    "@type": "Organization",
    name: "einfach verwaltet.",
    logo: { "@type": "ImageObject", url: "https://einfach-verwaltet.de/logo.png" },
  },
  datePublished: "2026-02-10",
  inLanguage: "de",
  url: "https://einfach-verwaltet.de/blog/eigentuemerversammlung-vorbereiten",
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
            <span className="text-gray-700">Eigentümerversammlung vorbereiten</span>
          </nav>

          <header className="mb-10">
            <p className="text-teal text-sm font-semibold uppercase tracking-wider mb-3">
              Ratgeber · 7 min Lesezeit
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-navy font-playfair mb-4 leading-tight">
              Eigentümerversammlung vorbereiten: Checkliste für Vermieter
            </h1>
            <p className="text-gray-500 text-sm">Februar 2026 · einfach verwaltet.</p>
          </header>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Die Eigentümerversammlung — Pflicht und Chance zugleich
            </h2>
            <p>
              Mindestens einmal im Jahr muss eine ordentliche
              Eigentümerversammlung (ETV) stattfinden. Für viele Eigentümer ist
              sie ein notwendiges Übel. Doch gut vorbereitet wird sie zum
              wirkungsvollen Steuerungsinstrument für Ihre Immobilie.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Schritt 1: Einladung — Fristen und Formalien
            </h2>
            <p>
              Die Einladung muss nach §24 Abs. 4 WEG mindestens drei Wochen vor
              der Versammlung in Textform an alle Eigentümer ergehen. &bdquo;Textform&ldquo;
              bedeutet: Brief, E-Mail oder Fax — mündlich reicht nicht.
            </p>
            <div className="bg-navy/5 border border-navy/10 rounded-xl p-6">
              <h3 className="font-bold text-navy mb-3">Pflichtinhalte der Einladung</h3>
              <ul className="list-disc pl-4 space-y-1 text-sm">
                <li>Datum, Uhrzeit und Ort der Versammlung</li>
                <li>Vollständige Tagesordnung mit allen Beschlusspunkten</li>
                <li>Hinweis auf Vollmachtserteilung</li>
                <li>Bei virtueller ETV: Zugangsdaten und technische Voraussetzungen</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Schritt 2: Tagesordnung — Struktur schafft Ergebnisse
            </h2>
            <p>Eine durchdachte Tagesordnung enthält typischerweise:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Begrüßung und Feststellung der Beschlussfähigkeit</li>
              <li>Genehmigung des Protokolls der letzten Versammlung</li>
              <li>Bericht des Verwalters — Jahresabrechnung und Wirtschaftsplan</li>
              <li>Entlastung des Verwalters und des Verwaltungsbeirats</li>
              <li>Beschluss über den Wirtschaftsplan für das kommende Jahr</li>
              <li>Instandhaltungsmaßnahmen und Sanierungsbeschlüsse</li>
              <li>Verschiedenes (keine Beschlussfassung möglich)</li>
            </ol>
            <p className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
              <strong>Wichtig:</strong> Über Themen, die nicht auf der Tagesordnung
              stehen, darf grundsätzlich nicht abgestimmt werden. Ausnahme:
              Alle Eigentümer sind anwesend und stimmen der Erweiterung zu.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Schritt 3: Beschlussfähigkeit prüfen
            </h2>
            <p>
              Eine ETV ist beschlussfähig, wenn sie ordnungsgemäß einberufen
              wurde. Eine Mindestanwesenheit ist seit der WEG-Reform 2020 nicht
              mehr erforderlich — allerdings kann die Gemeinschaftsordnung
              abweichende Regelungen enthalten.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Schritt 4: Abstimmungen — Mehrheiten kennen
            </h2>
            <div className="bg-navy/5 border border-navy/10 rounded-xl p-6">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Einfache Mehrheit</span>
                  <span className="font-semibold">Laufende Verwaltung, Wirtschaftsplan</span>
                </div>
                <div className="flex justify-between">
                  <span>Doppelt qualifizierte Mehrheit</span>
                  <span className="font-semibold">Bauliche Veränderungen (§20 WEG)</span>
                </div>
                <div className="flex justify-between">
                  <span>Allstimmigkeit</span>
                  <span className="font-semibold">Änderung der Gemeinschaftsordnung</span>
                </div>
                <div className="flex justify-between">
                  <span>3/4-Mehrheit + &gt;50% Miteigentumsanteile</span>
                  <span className="font-semibold">Virtuelle ETV dauerhaft ermöglichen</span>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Schritt 5: Protokoll — rechtssicher dokumentieren
            </h2>
            <p>
              Das Beschlussprotokoll ist rechtlich bindend. Es muss enthalten:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Datum, Ort und Dauer der Versammlung</li>
              <li>Anwesende Eigentümer und Stimmrechte</li>
              <li>Exakter Wortlaut aller Beschlüsse</li>
              <li>Abstimmungsergebnis (Ja/Nein/Enthaltung)</li>
              <li>Unterschrift des Versammlungsleiters und eines Eigentümers</li>
            </ul>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Digitale Eigentümerversammlung seit WEG-Reform
            </h2>
            <p>
              Seit der WEG-Reform 2020 kann die Gemeinschaft beschließen,
              Versammlungen auch virtuell durchzuführen. Voraussetzung: Ein
              Beschluss mit 3/4-Mehrheit und mehr als 50% der
              Miteigentumsanteile (§23 Abs. 1a WEG). Hybride Formate — also
              Präsenz und Online gleichzeitig — sind ebenfalls möglich.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Fazit: Vorbereitung ist alles
            </h2>
            <p>
              Eine gut vorbereitete Eigentümerversammlung spart Zeit, vermeidet
              Konflikte und führt zu tragfähigen Beschlüssen. Wer die Fristen
              kennt, die Tagesordnung sauber strukturiert und das Protokoll
              professionell führt, hat die Grundlage für eine funktionierende
              WEG-Verwaltung gelegt.
            </p>
          </div>

          <div className="mt-12 bg-teal/10 border border-teal/20 rounded-xl p-8">
            <h3 className="text-xl font-bold text-navy mb-2 font-playfair">
              WEG-Verwaltung ohne Stress
            </h3>
            <p className="text-gray-600 mb-4">
              einfach verwaltet. organisiert Ihre Eigentümerversammlung von der
              Einladung bis zum Protokoll — termingerecht und rechtssicher.
            </p>
            <Link
              href="/anfrage"
              className="inline-block bg-teal text-white font-semibold px-6 py-3 rounded-lg hover:bg-teal/90 transition-colors"
            >
              Jetzt unverbindlich anfragen
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
