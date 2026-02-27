import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Hausordnung Vorlage Vermieter: Muster, Inhalt und Rechtliches 2026 | einfach verwaltet.",
  description:
    "Hausordnung Vorlage für Vermieter: Was muss rein, was ist durchsetzbar? Ruhezeiten, Müll, Rauchen, Tierhaltung erklärt — mit Musterklauseln und rechtlichen Hinweisen.",
  keywords:
    "Hausordnung Vorlage Vermieter, Hausordnung Muster, Hausordnung Mietwohnung, Hausordnung Inhalt, Ruhezeiten Mietwohnung",
  openGraph: {
    title: "Hausordnung Vorlage Vermieter: Muster, Inhalt und Rechtliches 2026",
    description:
      "Was gehört in die Hausordnung? Musterklauseln zu Ruhezeiten, Müll, Rauchen, Tierhaltung und Gemeinschaftsräumen — rechtlich geprüft erklärt.",
    url: "https://einfach-verwaltet.de/blog/hausordnung-vorlage-vermieter",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Hausordnung Vorlage Vermieter: Muster, Inhalt und Rechtliches 2026",
  description:
    "Was muss eine Hausordnung enthalten? Ruhezeiten, Müll, Rauchen, Tierhaltung und Gemeinschaftsräume — mit Musterklauseln für Vermieter.",
  author: { "@type": "Organization", name: "einfach verwaltet." },
  publisher: {
    "@type": "Organization",
    name: "einfach verwaltet.",
    logo: { "@type": "ImageObject", url: "https://einfach-verwaltet.de/logo.png" },
  },
  datePublished: "2026-02-27",
  inLanguage: "de",
  url: "https://einfach-verwaltet.de/blog/hausordnung-vorlage-vermieter",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Ist eine Hausordnung für Vermieter Pflicht?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Eine gesetzliche Pflicht zur Hausordnung gibt es nicht. Dennoch ist sie für Vermieter ab zwei Wohneinheiten dringend empfohlen, da sie klare Verhaltensregeln schafft, Konflikte reduziert und als Grundlage für Abmahnungen dient. Bei WEGs ist die Hausordnung häufig Teil der Gemeinschaftsordnung.",
      },
    },
    {
      "@type": "Question",
      name: "Kann der Vermieter die Hausordnung einseitig ändern?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nein. Eine Hausordnung, die als Bestandteil des Mietvertrags gilt, kann nicht einseitig geändert werden — dafür wäre die Zustimmung des Mieters erforderlich. Eine eigenständige Hausordnung (Anlage zum Vertrag) kann der Vermieter unter bestimmten Umständen anpassen, wenn er einen sachlichen Grund hat. Im Zweifel sollten Änderungen mit einem Rechtsanwalt abgestimmt werden.",
      },
    },
    {
      "@type": "Question",
      name: "Was darf die Hausordnung NICHT enthalten?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Generelle Tierverbote sind unwirksam (BGH-Urteil VIII ZR 168/12). Absolute Rauchverbote in der Mietwohnung selbst sind ebenfalls nicht durchsetzbar. Kinderspielverbote im Freien verstoßen gegen §22 BImSchG. Ruhezeiten dürfen Nachtruhe (22–6 Uhr) vorschreiben, aber keine unverhältnismäßigen Tagesruhezeiten erzwingen.",
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
            <span className="text-gray-700">Hausordnung Vorlage Vermieter</span>
          </nav>

          <header className="mb-10">
            <p className="text-teal text-sm font-semibold uppercase tracking-wider mb-3">
              Ratgeber · 9 min Lesezeit
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-navy font-playfair mb-4 leading-tight">
              Hausordnung Vorlage Vermieter: Was rein muss, was gilt und was nicht
            </h1>
            <p className="text-gray-500 text-sm">Februar 2026 · einfach verwaltet.</p>
          </header>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <p>
              Die Hausordnung ist das Regelwerk des Zusammenlebens im Mehrfamilienhaus. Sie legt fest, 
              wann Ruhe herrscht, wie Müll zu trennen ist und was in den Gemeinschaftsräumen erlaubt ist. 
              Für Vermieter ist eine gut formulierte Hausordnung ein unverzichtbares Instrument — 
              sie schützt vor Konflikten, schafft Klarheit und liefert die Grundlage für rechtliche 
              Schritte bei Verstößen.
            </p>
            <p>
              Doch was muss eine Hausordnung enthalten? Welche Klauseln sind wirksam — und welche 
              kippen vor Gericht? Dieser Leitfaden gibt Ihnen einen praxisnahen Überblick mit 
              Musterklauseln für die wichtigsten Bereiche.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Warum brauche ich als Vermieter eine Hausordnung?
            </h2>
            <p>
              Ohne schriftliche Hausordnung regelt sich das Zusammenleben nach dem Prinzip Hoffnung. 
              Sobald mehrere Parteien ein Haus bewohnen, entstehen Reibungspunkte: Wer reinigt das 
              Treppenhaus? Ab wann gilt Nachtruhe? Darf der Hund mit in den Innenhof? 
            </p>
            <p>
              Eine klare Hausordnung:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Verhindert Konflikte durch klare Erwartungen</li>
              <li>Schafft die Grundlage für Abmahnungen bei wiederholten Verstößen</li>
              <li>Schützt den Vermieter vor Haftungsrisiken (z. B. bei Reinigungspflichten)</li>
              <li>Sichert den Wert der Immobilie durch geordneten Betrieb</li>
            </ul>
            <p>
              Wichtig: Eine Hausordnung, die als Anlage zum Mietvertrag übergeben und unterschrieben 
              wird, ist rechtlich bindend. Nur mündlich kommunizierte Regeln sind schwer durchsetzbar.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Was muss eine Hausordnung enthalten?
            </h2>
            <p>
              Es gibt keine gesetzliche Vorgabe für den Mindestinhalt einer Hausordnung. 
              In der Praxis hat sich jedoch eine bewährte Struktur etabliert:
            </p>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              1. Ruhezeiten (Nachtruhe und Mittagsruhe)
            </h3>
            <p>
              Die Nachtruhe von 22:00 bis 06:00 Uhr ist in Deutschland allgemein anerkannt und 
              kann problemlos vorgeschrieben werden. Viele Hausordnungen sehen zusätzlich eine 
              Mittagsruhe von 13:00 bis 15:00 Uhr vor. Das ist zulässig, solange die Beschränkung 
              verhältnismäßig ist.
            </p>
            <div className="bg-gray-50 border-l-4 border-teal p-4 rounded">
              <p className="text-sm font-semibold text-navy mb-1">Musterklausel Ruhezeiten:</p>
              <p className="text-sm italic">
                &ldquo;In der Zeit von 22:00 bis 06:00 Uhr sowie täglich von 13:00 bis 15:00 Uhr 
                sind alle Tätigkeiten zu unterlassen, die geeignet sind, die Mitbewohner zu stören 
                (Nachtruhe). Fernseh- und Radiogeräte sind auf Zimmerlautstärke zu begrenzen.&rdquo;
              </p>
            </div>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              2. Müllentsorgung und Mülltrennung
            </h3>
            <p>
              Die Hausordnung kann und sollte die korrekte Mülltrennung vorschreiben sowie 
              festlegen, wann Mülltonnen an die Straße gestellt und zurückgebracht werden. 
              Klarheit über Sperrmüll- und Sondermüllentsorgung verhindert Konflikte 
              und Ordnungswidrigkeiten.
            </p>
            <div className="bg-gray-50 border-l-4 border-teal p-4 rounded">
              <p className="text-sm font-semibold text-navy mb-1">Musterklausel Müll:</p>
              <p className="text-sm italic">
                &ldquo;Abfälle sind entsprechend den kommunalen Vorgaben zu trennen und 
                ausschließlich in den dafür vorgesehenen Behältern zu entsorgen. 
                Mülltonnen sind spätestens am Abend des Abfuhrtages wieder in die 
                dafür vorgesehene Stellfläche zu stellen. Sperrmüll ist ausschließlich 
                über die kommunale Sperrmüllabfuhr zu entsorgen.&rdquo;
              </p>
            </div>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              3. Rauchen
            </h3>
            <p>
              In Gemeinschaftsbereichen (Treppenhaus, Keller, Tiefgarage) kann das Rauchen 
              verboten werden — aus Brandschutz- und Hygienegründen. Ein Rauchverbot 
              in der eigenen Mietwohnung ist dagegen grundsätzlich nicht durchsetzbar, 
              solange keine dauerhaften Schäden entstehen (BGH VIII ZR 124/18).
            </p>
            <div className="bg-gray-50 border-l-4 border-teal p-4 rounded">
              <p className="text-sm font-semibold text-navy mb-1">Musterklausel Rauchen:</p>
              <p className="text-sm italic">
                &ldquo;Das Rauchen in allen Gemeinschaftsbereichen des Hauses (Treppenhaus, 
                Keller, Waschküche, Tiefgarage, Aufzug) ist aus Brandschutzgründen 
                nicht gestattet.&rdquo;
              </p>
            </div>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              4. Tierhaltung
            </h3>
            <p>
              Ein generelles Haustierverbot ist nach ständiger BGH-Rechtsprechung 
              (VIII ZR 168/12) unwirksam. Kleintierhaltung (Hamster, Vögel, Fische) 
              kann nicht verboten werden. Für Hunde und Katzen bedarf es einer 
              Einzelfallentscheidung, die der Vermieter nur aus triftigem Grund verweigern darf. 
              Die Hausordnung kann jedoch Verhaltensregeln für Haustiere festlegen.
            </p>
            <div className="bg-gray-50 border-l-4 border-teal p-4 rounded">
              <p className="text-sm font-semibold text-navy mb-1">Musterklausel Tierhaltung:</p>
              <p className="text-sm italic">
                &ldquo;Die Haltung von Hunden und Katzen bedarf der vorherigen schriftlichen 
                Zustimmung des Vermieters. Im Haus und auf dem Grundstück sind Hunde 
                an der Leine zu führen. Verunreinigungen durch Haustiere sind unverzüglich 
                zu beseitigen.&rdquo;
              </p>
            </div>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              5. Gemeinschaftsräume und -flächen
            </h3>
            <p>
              Keller, Waschküche, Fahrradkeller und Innenhof müssen geordnet genutzt werden. 
              Die Hausordnung kann Nutzungszeiten, Reinigungspflichten und Verbote 
              (z. B. keine privaten Gegenstände im Flur aus Brandschutzgründen) festlegen.
            </p>
            <div className="bg-gray-50 border-l-4 border-teal p-4 rounded">
              <p className="text-sm font-semibold text-navy mb-1">Musterklausel Gemeinschaftsräume:</p>
              <p className="text-sm italic">
                &ldquo;Flure, Treppenhäuser und sonstige Gemeinschaftsflächen sind freizuhalten. 
                Das Abstellen von Fahrrädern, Kinderwagen oder sonstigen Gegenständen ist 
                nur in den dafür vorgesehenen Bereichen gestattet. Die Waschküche ist nach 
                Benutzung in ordnungsgemäßem Zustand zu hinterlassen.&rdquo;
              </p>
            </div>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Was ist rechtlich durchsetzbar?
            </h2>
            <p>
              Nicht jede Hausordnungsklausel hält einer gerichtlichen Überprüfung stand. 
              Folgende Grundsätze gelten:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Wirksam:</strong> Nachtruhe ab 22:00 Uhr, Mülltrennung, Rauchverbot in Gemeinschaftsbereichen, Leinenpflicht für Hunde</li>
              <li><strong>Unwirksam:</strong> Generelles Haustierverbot, Rauchverbot in der eigenen Wohnung, Kinderspielverbot im Freien (§22 BImSchG)</li>
              <li><strong>Grauzone:</strong> Besuchszeiten-Regelungen, sehr strenge Mittagsruhezeiten, Verbote für bestimmte Musikinstrumente</li>
            </ul>
            <p>
              Bei Verstößen gegen die Hausordnung gilt: Erst Gespräch suchen, dann schriftliche 
              Abmahnung, dann weitere rechtliche Schritte. Eine Kündigung wegen 
              Hausordnungsverstößen setzt in der Regel eine oder mehrere Abmahnungen voraus.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Hinweis zur rechtlichen Prüfung
            </h2>
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
              <p className="text-sm text-amber-800">
                <strong>Wichtiger Hinweis:</strong> Die Musterklauseln in diesem Artikel dienen 
                ausschließlich der Orientierung. Eine Hausordnung, die Sie als Vermieter rechtlich 
                absichert, sollte stets von einem Fachanwalt für Mietrecht geprüft werden — 
                insbesondere wenn Sie auf spezifische lokale Besonderheiten oder 
                Sonderregelungen eingehen möchten. Wir übernehmen keine Haftung für 
                die Verwendung der Musterklauseln.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              FAQ: Hausordnung für Vermieter
            </h2>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-navy mb-2">
                  Ist eine Hausordnung für Vermieter Pflicht?
                </h3>
                <p className="text-sm">
                  Nein, es gibt keine gesetzliche Pflicht. Für Mehrfamilienhäuser ab zwei 
                  Wohneinheiten ist sie aber dringend empfohlen, da sie Konflikte reduziert 
                  und Abmahnungen rechtlich absichert.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-navy mb-2">
                  Kann der Vermieter die Hausordnung einseitig ändern?
                </h3>
                <p className="text-sm">
                  Nein, wenn die Hausordnung Teil des Mietvertrags ist. Änderungen erfordern 
                  die Zustimmung der Mieter. Nur bei einer eigenständigen Hausordnung 
                  (separate Anlage) gibt es unter Umständen mehr Flexibilität — 
                  aber auch hier ist rechtlicher Rat empfehlenswert.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-navy mb-2">
                  Was darf die Hausordnung NICHT enthalten?
                </h3>
                <p className="text-sm">
                  Generelle Tierverbote (BGH VIII ZR 168/12), Rauchverbote in der eigenen 
                  Wohnung und Kinderspielverbote im Freien sind unwirksam. Klauseln, die 
                  vertraglich vereinbarte Mieterrechte einschränken, sind ebenfalls nichtig.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Fazit: Klare Regeln schaffen Frieden
            </h2>
            <p>
              Eine durchdachte Hausordnung ist eine der günstigsten Investitionen, die ein 
              Vermieter tätigen kann. Sie klärt Erwartungen, reduziert Konflikte und schützt 
              bei rechtlichen Auseinandersetzungen. Entscheidend ist, dass sie rechtlich 
              belastbar formuliert ist — und von allen Mietern unterzeichnet wird.
            </p>
            <p>
              Lassen Sie die fertige Hausordnung von einem Fachanwalt für Mietrecht 
              überprüfen, bevor Sie sie einsetzen.
            </p>
          </div>

          <div className="mt-12 bg-teal/10 border border-teal/20 rounded-xl p-8">
            <h3 className="text-xl font-bold text-navy mb-2 font-playfair">
              einfach verwaltet. übernimmt die Hausordnungs-Compliance für Sie
            </h3>
            <p className="text-gray-600 mb-4">
              Von der Erstellung und Übergabe der Hausordnung bis hin zur Bearbeitung 
              von Verstößen und Abmahnungen — wir verwalten Ihre Immobilie vollständig 
              und rechtssicher. Transparent, digital und ohne versteckte Gebühren.
            </p>
            <Link
              href="/anfrage"
              className="inline-block bg-teal text-white font-semibold px-6 py-3 rounded-lg hover:bg-teal/90 transition-colors"
            >
              Angebot anfordern
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
