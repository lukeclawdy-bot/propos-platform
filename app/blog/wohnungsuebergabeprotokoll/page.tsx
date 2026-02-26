import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Wohnungsübergabeprotokoll: Vorlage und Tipps für Vermieter 2026 | einfach verwaltet.",
  description:
    "Das Wohnungsübergabeprotokoll schützt Vermieter und Mieter. Kostenlose Vorlage, Checkliste und rechtliche Tipps für eine lückenlose Wohnungsübergabe.",
  keywords:
    "Wohnungsübergabeprotokoll, Wohnungsübergabe Protokoll Vorlage, Übergabeprotokoll Wohnung, Wohnungsübergabe Checkliste",
  openGraph: {
    title: "Wohnungsübergabeprotokoll: Vorlage und Tipps für Vermieter 2026",
    description:
      "Professionelles Übergabeprotokoll erstellen: Vorlage, Checkliste und häufige Fehler vermeiden.",
    url: "https://einfach-verwaltet.de/blog/wohnungsuebergabeprotokoll",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Wohnungsübergabeprotokoll: Vorlage und Tipps für Vermieter",
  description:
    "Alles zum Wohnungsübergabeprotokoll: Rechtliche Grundlagen, Vorlage und Tipps für Vermieter.",
  author: { "@type": "Organization", name: "einfach verwaltet." },
  publisher: {
    "@type": "Organization",
    name: "einfach verwaltet.",
    logo: { "@type": "ImageObject", url: "https://einfach-verwaltet.de/logo.png" },
  },
  datePublished: "2026-02-01",
  inLanguage: "de",
  url: "https://einfach-verwaltet.de/blog/wohnungsuebergabeprotokoll",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Ist ein Wohnungsübergabeprotokoll gesetzlich vorgeschrieben?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nein, ein Übergabeprotokoll ist gesetzlich nicht vorgeschrieben. Es ist aber dringend empfohlen, da es den Zustand der Wohnung bei Ein- und Auszug dokumentiert. Ohne Protokoll ist es im Streitfall schwer nachzuweisen, welche Schäden beim Auszug vorhanden waren.",
      },
    },
    {
      "@type": "Question",
      name: "Was muss ein Wohnungsübergabeprotokoll enthalten?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ein vollständiges Übergabeprotokoll enthält: Datum und Uhrzeit, Namen von Vermieter und Mieter, Adresse, Zählerstand für Strom/Gas/Wasser, Schlüsselanzahl und -beschreibung, Zustand aller Räume (Wände, Böden, Fenster, Türen), vorhandene Mängel mit Beschreibung, Fotos als Anlage sowie Unterschriften beider Parteien.",
      },
    },
    {
      "@type": "Question",
      name: "Kann der Vermieter nach der Wohnungsübergabe noch Schäden geltend machen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, jedoch nur für Schäden, die im Protokoll vermerkt oder beim Auszug erkennbar waren. Versteckte Mängel können auch nach der Übergabe geltend gemacht werden. Die Verjährungsfrist für Ansprüche aus dem Mietverhältnis beträgt 6 Monate nach Rückgabe der Mietsache (§548 BGB).",
      },
    },
    {
      "@type": "Question",
      name: "Muss der Mieter das Übergabeprotokoll unterschreiben?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Der Mieter ist rechtlich nicht verpflichtet, das Protokoll zu unterschreiben. Eine Unterschrift gilt als Bestätigung des dokumentierten Zustands. Verweigert der Mieter die Unterschrift, vermerken Sie dies im Protokoll und nehmen Sie möglichst einen Zeugen mit.",
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
            <span className="text-gray-700">Wohnungsübergabeprotokoll</span>
          </nav>

          <header className="mb-10">
            <p className="text-teal text-sm font-semibold uppercase tracking-wider mb-3">
              Ratgeber · 9 min Lesezeit
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-navy font-playfair mb-4 leading-tight">
              Wohnungsübergabeprotokoll: Vorlage und Tipps für Vermieter
            </h1>
            <p className="text-gray-500 text-sm">Februar 2026 · einfach verwaltet.</p>
          </header>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">

            <p>
              Ein fehlerhaftes oder fehlendes Übergabeprotokoll ist einer der häufigsten
              Streitgründe zwischen Vermietern und Mietern. Wer beim Einzug oder Auszug
              kein lückenloses Protokoll erstellt, verliert im Zweifel seinen Anspruch
              auf Schadensersatz — selbst wenn echte Schäden vorhanden sind.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Warum ist das Übergabeprotokoll so wichtig?
            </h2>
            <p>
              Das Übergabeprotokoll ist kein Formalismus — es ist Ihr zentrales
              Beweisdokument. Es dokumentiert den Zustand der Wohnung zu einem bestimmten
              Zeitpunkt und dient als Grundlage für:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Schadensersatzansprüche beim Auszug (§ 280 BGB)</li>
              <li>Berechnung von Kautionsabzügen (§ 551 BGB)</li>
              <li>Nachweis des Wohnungszustands bei Rechtsstreitigkeiten</li>
              <li>Klarheit über abgelesene Zählerstände (Strom, Gas, Wasser)</li>
            </ul>
            <p>
              Ohne Protokoll gilt im Zweifelsfall: Die Wohnung wurde in ordnungsgemäßem
              Zustand übergeben — unabhängig vom tatsächlichen Zustand.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Was gehört in ein vollständiges Übergabeprotokoll?
            </h2>

            <div className="bg-navy/5 border border-navy/10 rounded-xl p-6 my-6">
              <h3 className="font-bold text-navy mb-4">Checkliste: Pflichtinhalt</h3>
              <div className="space-y-2 text-sm">
                {[
                  "Datum und Uhrzeit der Übergabe",
                  "Namen und Unterschriften von Vermieter und Mieter",
                  "Vollständige Adresse der Wohnung (inkl. Stockwerk, Wohnungsnummer)",
                  "Zählerstand Strom (mit Zählernummer)",
                  "Zählerstand Gas (falls vorhanden, mit Zählernummer)",
                  "Zählerstand Wasser (Kalt- und Warmwasser, mit Zählernummer)",
                  "Anzahl und Art der übergebenen Schlüssel",
                  "Zustand aller Räume: Wände, Böden, Decken, Fenster, Türen",
                  "Vorhandene Mängel mit genauer Beschreibung",
                  "Fotos aller Mängel als Anlage (nummeriert und datiert)",
                  "Zustand von Einbauküche, Sanitäreinrichtungen, Heizung",
                  "Zustand Keller, Balkon, Garage (falls vorhanden)",
                  "Bestehende Vereinbarungen über Beseitigung von Mängeln",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <span className="text-teal font-bold flex-shrink-0">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Vorlage: Wohnungsübergabeprotokoll
            </h2>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-sm text-gray-700 space-y-3 font-mono">
              <p className="font-bold text-center">WOHNUNGSÜBERGABEPROTOKOLL</p>
              <p>Datum: _______________ &nbsp;&nbsp; Uhrzeit: _______________</p>
              <p>Vermieter: _______________________________________________</p>
              <p>Mieter: _________________________________________________</p>
              <p>Objekt: _________________________________________________</p>
              <p className="mt-3 font-bold">ZÄHLERSTÄNDE</p>
              <p>Strom (Zähler-Nr. _______): _______ kWh</p>
              <p>Gas (Zähler-Nr. _______): _______ m³</p>
              <p>Wasser kalt (Zähler-Nr. _______): _______ m³</p>
              <p>Wasser warm (Zähler-Nr. _______): _______ m³</p>
              <p className="mt-3 font-bold">SCHLÜSSEL</p>
              <p>Wohnungsschlüssel: __ Stück &nbsp; Briefkastenschlüssel: __ Stück</p>
              <p>Keller: __ Stück &nbsp; Garage: __ Stück &nbsp; Sonstige: ___________</p>
              <p className="mt-3 font-bold">MÄNGEL (falls vorhanden)</p>
              <p>Raum: ___________ Beschreibung: _________________________</p>
              <p>Raum: ___________ Beschreibung: _________________________</p>
              <p className="mt-3">Fotos angefertigt: □ Ja &nbsp; □ Nein &nbsp; Anzahl: _____</p>
              <p className="mt-3">____________________________ ____________________________</p>
              <p>Unterschrift Vermieter &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Unterschrift Mieter</p>
            </div>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              5 häufige Fehler beim Übergabeprotokoll
            </h2>
            <div className="space-y-4">
              {[
                {
                  fehler: "Kein Protokoll beim Einzug",
                  folge: "Beim Auszug ist unklar, welche Schäden schon vorher vorhanden waren.",
                },
                {
                  fehler: "Mängel nur vage beschreiben",
                  folge: "‚Kratzer in der Küche' statt ‚3 cm Kratzer links neben der Spüle, sichtbar auf Foto 4'.",
                },
                {
                  fehler: "Keine Fotos",
                  folge: "Fotos sind das stärkste Beweismittel — ohne Fotos ist jede Beschreibung angreifbar.",
                },
                {
                  fehler: "Falsche Zählerstände",
                  folge: "Führt zu Streit bei der Nebenkostenabrechnung. Lesen Sie stets direkt am Zähler ab.",
                },
                {
                  fehler: "Unterschrift fehlt",
                  folge: "Ein Protokoll ohne Unterschrift hat vor Gericht wenig Beweiskraft. Bestehen Sie auf die Unterschrift.",
                },
              ].map(({ fehler, folge }) => (
                <div key={fehler} className="flex gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <span className="text-red-500 font-bold flex-shrink-0">✗</span>
                  <div>
                    <div className="font-bold text-red-800 text-sm">{fehler}</div>
                    <p className="text-red-700 text-sm mt-1">{folge}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Tipps für die professionelle Übergabe
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Übergabe bei Tageslicht:</strong> Mängel sind bei Kunstlicht
                schwerer erkennbar.
              </li>
              <li>
                <strong>Ausreichend Zeit einplanen:</strong> Rechnen Sie mindestens
                45–60 Minuten für eine Durchschnittswohnung.
              </li>
              <li>
                <strong>Zeugen mitbringen:</strong> Falls der Mieter die Unterschrift
                verweigert, ist ein Zeuge hilfreich.
              </li>
              <li>
                <strong>Zweifaches Exemplar:</strong> Beide Parteien erhalten eine
                Kopie des unterzeichneten Protokolls.
              </li>
              <li>
                <strong>Fotos mit Zeitstempel:</strong> Smartphone-Fotos speichern
                automatisch Datum und Uhrzeit — nutzen Sie das.
              </li>
            </ul>

            {/* FAQ Section */}
            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-6">
              Häufige Fragen zum Wohnungsübergabeprotokoll
            </h2>

            <div className="space-y-6">
              {[
                {
                  q: "Ist ein Wohnungsübergabeprotokoll gesetzlich vorgeschrieben?",
                  a: "Nein, ein Übergabeprotokoll ist gesetzlich nicht vorgeschrieben — aber dringend empfohlen. Ohne Protokoll ist es im Streitfall schwer nachzuweisen, welche Schäden beim Auszug vorhanden waren.",
                },
                {
                  q: "Was muss ein Wohnungsübergabeprotokoll enthalten?",
                  a: "Datum und Uhrzeit, Namen beider Parteien, Adresse, Zählerstände, Schlüsselanzahl, Zustand aller Räume, vorhandene Mängel mit Beschreibung, Fotos als Anlage sowie Unterschriften beider Parteien.",
                },
                {
                  q: "Kann der Vermieter nach der Übergabe noch Schäden geltend machen?",
                  a: "Ja — für Schäden, die im Protokoll vermerkt oder beim Auszug erkennbar waren. Versteckte Mängel können auch nachträglich geltend gemacht werden. Die Verjährungsfrist beträgt 6 Monate nach Rückgabe der Mietsache (§548 BGB).",
                },
                {
                  q: "Muss der Mieter das Übergabeprotokoll unterschreiben?",
                  a: "Rechtlich nicht verpflichtend. Verweigert der Mieter die Unterschrift, vermerken Sie dies im Protokoll und nehmen Sie einen Zeugen mit. Eine Unterschrift gilt als Bestätigung des dokumentierten Zustands.",
                },
              ].map(({ q, a }) => (
                <div key={q} className="border border-gray-200 rounded-xl p-5">
                  <h3 className="font-bold text-navy mb-2">{q}</h3>
                  <p className="text-gray-600 text-sm">{a}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="bg-navy text-white rounded-2xl p-8 mt-10 text-center">
              <h3 className="text-xl font-bold font-playfair mb-3">
                Wohnungsübergaben professionell organisiert
              </h3>
              <p className="text-white/80 mb-6 text-sm">
                Professionelle Hausverwaltung übernimmt Übergaben, Protokollierung und
                Schlüsselübergabe — lückenlos und rechtssicher.
              </p>
              <Link
                href="/anfrage"
                className="inline-block bg-teal hover:bg-teal/90 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                Hausverwaltung anfragen →
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
