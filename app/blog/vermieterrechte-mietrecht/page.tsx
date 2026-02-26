import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Vermieterrechte: Was darf ein Vermieter nach deutschem Mietrecht? | einfach verwaltet.",
  description:
    "Welche Rechte hat ein Vermieter? Überblick über Zutrittsrecht, Mieterhöhung, Kündigung, Schönheitsreparaturen und mehr nach BGB.",
  keywords:
    "Vermieterrechte, Vermieter Rechte BGB, Mieterhöhung Recht, Vermieter Zutrittsrecht, Kündigung Vermieter",
  openGraph: {
    title: "Vermieterrechte: Was darf ein Vermieter nach deutschem Mietrecht?",
    description:
      "Ihre Rechte als Vermieter im Überblick — rechtssicher und praxisnah erklärt.",
    url: "https://einfach-verwaltet.de/blog/vermieterrechte-mietrecht",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Vermieterrechte: Was darf ein Vermieter nach deutschem Mietrecht?",
  description:
    "Überblick über die wichtigsten Vermieterrechte nach BGB: Zutritt, Mieterhöhung, Kündigung und mehr.",
  author: { "@type": "Organization", name: "einfach verwaltet." },
  publisher: {
    "@type": "Organization",
    name: "einfach verwaltet.",
    logo: { "@type": "ImageObject", url: "https://einfach-verwaltet.de/logo.png" },
  },
  datePublished: "2026-02-26",
  inLanguage: "de",
  url: "https://einfach-verwaltet.de/blog/vermieterrechte-mietrecht",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Darf ein Vermieter jederzeit in die Wohnung?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nein. Ein Vermieter hat nur unter bestimmten Voraussetzungen ein Zutrittsrecht nach § 242 BGB: bei Gefahr im Verzug, für vereinbarte Besichtigungen oder zur Durchführung notwendiger Reparaturen. Ohne vorherige Absprache oder berechtigten Grund ist der Zutritt untersagt.",
      },
    },
    {
      "@type": "Question",
      name: "Wie oft darf der Vermieter die Miete erhöhen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nach § 558 Abs. 1 BGB ist eine Mieterhöhung auf die ortsübliche Vergleichsmiete nur alle 15 Monate möglich (§ 558 Abs. 1 BGB). Die Kappungsgrenze besagt, dass die Miete innerhalb von drei Jahren höchstens um 15 % steigen darf (§ 558 Abs. 3 BGB).",
      },
    },
    {
      "@type": "Question",
      name: "Darf der Vermieter Haustiere verbieten?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ein generelles Haustierverbot in der Hausordnung ist unwirksam (BGH, Urteil vom 20.03.2019, VIII ZR 10/18). Kleintiere wie Goldfische oder Kanarienvögel dürfen grundsätzlich gehalten werden. Bei Hunden und Katzen ist eine Interessenabwägung erforderlich. Der Vermieter kann das Halten verbieten, wenn die Wohnung oder das Mietverhältnis dadurch beeinträchtigt wird.",
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
            <span className="text-gray-700">Vermieterrechte Mietrecht</span>
          </nav>

          <header className="mb-10">
            <p className="text-teal text-sm font-semibold uppercase tracking-wider mb-3">
              Ratgeber · 9 min Lesezeit
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-navy font-playfair mb-4 leading-tight">
              Vermieterrechte: Was darf ein Vermieter nach deutschem Mietrecht?
            </h1>
            <p className="text-gray-500 text-sm">Februar 2026 · einfach verwaltet.</p>
          </header>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Die rechtliche Grundlage
            </h2>
            <p>
              Das Mietrecht in Deutschland ist primär im Bürgerlichen Gesetzbuch (BGB) 
              geregelt — speziell in den §§ 535 bis 597 BGB. Doch nicht alle Rechte 
              sind dort ausdrücklich formuliert. Viele ergeben sich aus der Natur 
              des Mietvertrags als gegenseitiger Vertrag mit Treuepflichten. 
              [Quelle: § 535 BGB]
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Das Zutrittsrecht: Wann darf der Vermieter in die Wohnung?
            </h2>
            <p>
              Eines der am häufigsten gestellten Fragen: Darf der Vermieter einfach 
              hereinkommen? Die Antwort ist ein klares Nein — mit wenigen Ausnahmen.
            </p>
            <p>
              Nach § 242 BGB (Treu und Glauben) hat der Vermieter unter folgenden 
              Voraussetzungen ein Zutrittsrecht:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Gefahr im Verzug:</strong> Bei Wasserschaden, Gasgeruch oder 
                ähnlichen Notfällen
              </li>
              <li>
                <strong>Vereinbarte Besichtigungen:</strong> Bei Verkaufsabsicht 
                oder für neue Mieter (mit angemessener Vorankündigung)
              </li>
              <li>
                <strong>Notwendige Reparaturen:</strong> Die der Vermieter zu 
                verantworten hat
              </li>
            </ul>
            <p className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
              <strong>Wichtig:</strong> Ohne vorherige Absprache oder berechtigten 
              Notfall ist der Zutritt in die Mietwohnung untersagt. Der Mieter kann 
              sich notfalls zur Wehr setzen.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Mieterhöhung: Rechtssicher vorgehen
            </h2>
            <p>
              Das Recht zur Mieterhöhung ist in § 558 BGB geregelt. Doch es gibt 
              klare Grenzen:
            </p>
            <div className="bg-navy/5 border border-navy/10 rounded-xl p-6">
              <h3 className="font-bold text-navy mb-3">Regeln für Mieterhöhungen</h3>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li>
                  <strong>Sperrfrist:</strong> Höchstens alle 15 Monate (§ 558 Abs. 1 BGB)
                </li>
                <li>
                  <strong>Kappungsgrenze:</strong> Maximal 15 % in drei Jahren (§ 558 Abs. 3 BGB)
                </li>
                <li>
                  <strong>Höchstbetrag:</strong> Ortsübliche Vergleichsmiete (§ 558 Abs. 2 BGB)
                </li>
                <li>
                  <strong>Form:</strong> Schriftlich oder Textform (§ 126a BGB)
                </li>
                <li>
                  <strong>Zustimmungsfrist:</strong> Mieter hat zwei Monate Zeit
                </li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Kündigungsrecht: Wann ist eine Kündigung zulässig?
            </h2>
            <p>
              Die ordentliche Kündigung durch den Vermieter ist stark eingeschränkt. 
              Sie ist nur zulässig bei Vorliegen eines berechtigten Interesses 
              gemäß § 573 BGB. Die wichtigsten Kündigungsgründe:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Eigenbedarf (§ 573 Abs. 2 Nr. 1 BGB):</strong> Der Vermieter 
                oder Angehörige wollen selbst einziehen
              </li>
              <li>
                <strong>Betriebsbedarf (§ 573 Abs. 2 Nr. 2 BGB):</strong> Die 
                Wohnung wird für Arbeitskräfte benötigt
              </li>
              <li>
                <strong>Hinderung angemessener wirtschaftlicher Verwertung 
                (§ 573 Abs. 2 Nr. 3 BGB):</strong> Beispiel: Sanierung wäre 
                nur bei Leerstand möglich
              </li>
            </ul>
            <p>
              Die fristlose Kündigung nach § 543 BGB kommt bei schweren 
              Vertragsverstößen des Mieters in Betracht — etwa bei wiederholter 
              Mietrückstand oder erheblicher Vertragsverletzung.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Schönheitsreparaturen: Was kann der Vermieter fordern?
            </h2>
            <p>
              Nach mehreren BGH-Urteilen in den letzten Jahren ist die Rechtslage 
              klarer geworden. Unwirksame Klauseln (Formularmäßige Abgeltung oder 
              starre Fristenregelungen) sind weit verbreitet.
            </p>
            <p>
              Was der Vermieter grundsätzlich fordern darf:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Renovierung bei Auszug, wenn eine wirksame Vereinbarung besteht</li>
              <li>Schadensersatz bei übermäßiger Abnutzung über die normale Nutzung hinaus</li>
              <li>Quotenausgleich bei abweichender Renovierungsphase</li>
            </ul>
            <p>
              Was nicht gefordert werden darf: Renovierungspflichten bei 
              unrenoviertem Einzug oder starre Fristen ohne Abwägung der 
              tatsächlichen Nutzungsdauer.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Haustiere: Verbote und Einschränkungen
            </h2>
            <p>
              Der BGH hat 2019 klargestellt: Ein generelles Haustierverbot in 
              der Hausordnung ist unwirksam (BGH, Urteil vom 20.03.2019, VIII ZR 10/18). 
              Kleintiere wie Goldfische oder Kanarienvögel dürfen grundsätzlich 
              gehalten werden.
            </p>
            <p>
              Bei Hunden und Katzen ist eine Interessenabwägung erforderlich. 
              Der Vermieter kann das Halten verbieten, wenn:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Die Wohnung hierfür ungeeignet ist (z.B. sehr kleine Wohnung, großer Hund)</li>
              <li>Andere Mieter erheblich gestört würden</li>
              <li>Die Gefahr von Schäden am Mietobjekt besteht</li>
            </ul>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              FAQ: Die wichtigsten Vermieterrechte
            </h2>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-navy mb-2">
                  Darf ein Vermieter jederzeit in die Wohnung?
                </h3>
                <p className="text-sm">
                  Nein. Nur bei Gefahr im Verzug, vereinbarten Besichtigungen 
                  oder notwendigen Reparaturen.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-navy mb-2">
                  Wie oft darf der Vermieter die Miete erhöhen?
                </h3>
                <p className="text-sm">
                  Höchstens alle 15 Monate, maximal 15 % in drei Jahren 
                  (Kappungsgrenze).
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-navy mb-2">
                  Darf der Vermieter Haustiere verbieten?
                </h3>
                <p className="text-sm">
                  Ein generelles Verbot ist unwirksam. Bei Hunden und Katzen 
                  ist eine Interessenabwägung erforderlich.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Fazit: Rechte wahrnehmen, Pflichten nicht vergessen
            </h2>
            <p>
              Das deutsche Mietrecht ist ausgewogen. Der Vermieter hat 
              umfassende Rechte — aber auch Pflichten. Wer diese Balance 
              respektiert, kann das Mietverhältnis langfristig erfolgreich 
              gestalten. Bei Unsicherheit lohnt sich der Blick in den 
              Vertrag oder die Konsultation eines Fachanwalts.
            </p>
          </div>

          <div className="mt-12 bg-teal/10 border border-teal/20 rounded-xl p-8">
            <h3 className="text-xl font-bold text-navy mb-2 font-playfair">
              Rechtssicherheit für Vermieter
            </h3>
            <p className="text-gray-600 mb-4">
              einfach verwaltet. sorgt dafür, dass Ihre Vermieterrechte 
              gewahrt werden — von der korrekten Mieterhöhung bis zur 
              fristgerechten Kündigung.
            </p>
            <Link
              href="/anfrage"
              className="inline-block bg-teal text-white font-semibold px-6 py-3 rounded-lg hover:bg-teal/90 transition-colors"
            >
              Beratung anfordern
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
