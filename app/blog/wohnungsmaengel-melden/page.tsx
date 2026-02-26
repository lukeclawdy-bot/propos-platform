import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Wohnungsmängel melden: Rechte und Pflichten von Mieter und Vermieter | einfach verwaltet.",
  description:
    "Wohnungsmängel richtig melden: Fristen, Formvorschriften, Mietminderung und was bei Streit zu tun ist — kompetent erklärt.",
  keywords:
    "Wohnungsmängel melden, Mängelanzeige Mieter, Mietminderung Mängel, Mängelbeseitigung Vermieter, Wasserschaden melden",
  openGraph: {
    title: "Wohnungsmängel melden: Rechte und Pflichten von Mieter und Vermieter",
    description:
      "Was bei Wohnungsmängeln zu tun ist — von der Meldung bis zur Mietminderung.",
    url: "https://einfach-verwaltet.de/blog/wohnungsmaengel-melden",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Wohnungsmängel melden: Rechte und Pflichten von Mieter und Vermieter",
  description:
    "Wie Mieter Wohnungsmängel richtig melden und welche Rechte sie haben — inklusive Mietminderung und Selbstvornahme.",
  author: { "@type": "Organization", name: "einfach verwaltet." },
  publisher: {
    "@type": "Organization",
    name: "einfach verwaltet.",
    logo: { "@type": "ImageObject", url: "https://einfach-verwaltet.de/logo.png" },
  },
  datePublished: "2026-02-26",
  inLanguage: "de",
  url: "https://einfach-verwaltet.de/blog/wohnungsmaengel-melden",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Wie muss ein Mieter einen Wohnungsmangel melden?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nach § 536c BGB muss der Mieter einen Mangel unverzüglich dem Vermieter anzeigen. Empfohlen ist die schriftliche Meldung per Brief oder E-Mail, um den Nachweis zu erbringen. Die Meldung sollte den Mangel beschreiben, wann er aufgetreten ist und um Behebung bitten.",
      },
    },
    {
      "@type": "Question",
      name: "Wie lange hat der Vermieter Zeit, einen Mangel zu beheben?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die Behebungsfrist richtet sich nach Art und Schwere des Mangels. Bei einer kaputten Heizung im Winter handelt es sich um einen Notfall, der innerhalb von 24–48 Stunden behoben werden muss. Bei kosmetischen Mängeln können mehrere Wochen angemessen sein. Maßgeblich ist die Zumutbarkeit für den Mieter.",
      },
    },
    {
      "@type": "Question",
      name: "Wie viel Mietminderung ist bei Wohnungsmängeln möglich?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die Mietminderung bei Wohnungsmängeln orientiert sich am Wertverhältnis nach § 536 BGB. Übliche Minderungssätze reichen von 5–10% bei kleineren Beeinträchtigungen bis zu 50–100% bei schwerwiegenden Mängeln wie fehlender Heizung oder nicht benutzbarem Bad. Es gibt keine pauschalen Prozentsätze; jeder Fall wird individualisiert betrachtet.",
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
            <span className="text-gray-700">Wohnungsmängel melden</span>
          </nav>

          <header className="mb-10">
            <p className="text-teal text-sm font-semibold uppercase tracking-wider mb-3">
              Ratgeber · 8 min Lesezeit
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-navy font-playfair mb-4 leading-tight">
              Wohnungsmängel melden: Rechte und Pflichten von Mieter und Vermieter
            </h1>
            <p className="text-gray-500 text-sm">Februar 2026 · einfach verwaltet.</p>
          </header>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Was gilt als Wohnungsmangel?
            </h2>
            <p>
              Ein Wohnungsmangel liegt vor, wenn die Mietsache einen Zustand 
              aufweist, der ihre Tauglichkeit zu dem vertragsgemäßen Gebrauch 
              beeinträchtigt. Das kann sein:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Bauliche Mängel (undichte Fenster, Schimmel, kaputte Heizung)</li>
              <li>Funktionsstörungen (defekte Elektroinstallation, Sanitär)</li>
              <li>Lärmbelästigungen durch Nachbarn oder Baustellen</li>
              <li>Mangelnde Sicherheit (defekte Schlösser, fehlender Rauchmelder)</li>
            </ul>
            <p className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
              <strong>Wichtiger Hinweis:</strong> Der Vermieter haftet grundsätzlich 
              nicht für Störungen, die der Mieter selbst verursacht hat (z.B. 
              verstopfter Abfluss durch unsachgemäße Nutzung).
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Die Pflicht zur Mängelanzeige (§ 536c BGB)
            </h2>
            <p>
              Der Mieter ist verpflichtet, dem Vermieter einen Mangel 
              unverzüglich anzuzeigen. Das bedeutet: Sobald der Mieter 
              von dem Mangel Kenntnis erlangt, muss er handeln — nicht 
              erst in zwei Wochen.
            </p>
            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              So melden Sie einen Mangel richtig
            </h3>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Beschreiben Sie den Mangel:</strong> Was ist defekt? 
                Wo genau? Seit wann?
              </li>
              <li>
                <strong>Dokumentieren Sie:</strong> Fotos, Videos oder 
                Zeugen können später wichtig sein.
              </li>
              <li>
                <strong>Form wählen:</strong> Schriftlich (Brief/E-Mail) 
                ist nachweisbarer als telefonisch.
              </li>
              <li>
                <strong>Frist setzen:</strong> Fordern Sie eine angemessene 
                Behebungsfrist an.
              </li>
              <li>
                <strong>Eingang bestätigen lassen:</strong> Bei E-Mail: 
                Lesebestätigung. Bei Brief: Einschreiben.
              </li>
            </ol>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Behebungsfrist: Wie lange hat der Vermieter Zeit?
            </h2>
            <p>
              Die angemessene Frist zur Mängelbeseitigung hängt von der 
              Dringlichkeit ab:
            </p>
            <div className="bg-navy/5 border border-navy/10 rounded-xl p-6">
              <h3 className="font-bold text-navy mb-3">Orientierungswerte für Behebungsfristen</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Notfälle (keine Heizung im Winter)</span>
                  <span className="font-semibold">24–48 Stunden</span>
                </div>
                <div className="flex justify-between">
                  <span>Wichtige Störungen (undichtes Dach)</span>
                  <span className="font-semibold">3–5 Tage</span>
                </div>
                <div className="flex justify-between">
                  <span>Normale Reparaturen (kaputter Wasserhahn)</span>
                  <span className="font-semibold">1–2 Wochen</span>
                </div>
                <div className="flex justify-between">
                  <span>Kosmetische Mängel (abgeblätterte Farbe)</span>
                  <span className="font-semibold">4–6 Wochen</span>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Mietminderung: Das Recht auf reduzierte Miete
            </h2>
            <p>
              Bei einem erheblichen Mangel hat der Mieter das Recht, die 
              Miete zu mindern (§ 536 BGB). Die Minderung orientiert sich 
              am Wertverhältnis: Wie viel ist die Wohnung unter den 
              gegebenen Umständen noch wert?
            </p>
            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              Übliche Minderungssätze
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>5–10% bei geringfügigen Beeinträchtigungen</li>
              <li>15–25% bei merklichen Einschränkungen</li>
              <li>30–50% bei schwerwiegenden Mängeln</li>
              <li>Bis 100% bei unbewohnbarkeit (z.B. nach Wasserschaden)</li>
            </ul>
            <p className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
              <strong>Achtung:</strong> Die Mietminderung muss angemessen sein. 
              Bei Überschreitung kann der Vermieter Schadensersatz wegen 
              ungerechtfertigter Bereicherung verlangen.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Selbstvornahme: Was der Mieter selbst tun darf
            </h2>
            <p>
              Weigert sich der Vermieter, den Mangel zu beseitigen, oder 
              lässt er die gesetzte Frist verstreichen, kann der Mieter 
              nach § 536a Abs. 2 BGB die Mängelbeseitigung selbst vornehmen 
              und vom Vermieter Ersatz der Kosten verlangen.
            </p>
            <p>
              Voraussetzungen für die Selbstvornahme:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Der Mangel ist erheblich</li>
              <li>Eine angemessene Frist zur Beseitigung wurde gesetzt</li>
              <li>Die Frist ist fruchtlos verstrichen</li>
              <li>Die Maßnahmen sind angemessen und verhältnismäßig</li>
            </ul>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Die Pflichten des Vermieters
            </h2>
            <p>
              Der Vermieter hat nach § 535 Abs. 1 S. 2 BGB die Pflicht, 
              die Mietsache in einem zum vertragsgemäßen Gebrauch 
              geeigneten Zustand zu überlassen und zu erhalten. Das 
              umfasst:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Überlassung der Wohnung in vertragsgemäßem Zustand bei Einzug</li>
              <li>Durchführung aller Instandhaltungs- und Instandsetzungsarbeiten</li>
              <li>Behebung von Mängeln innerhalb angemessener Frist</li>
              <li>Übernahme der Kosten für die Mängelbeseitigung</li>
            </ul>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              FAQ: Wohnungsmängel
            </h2>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-navy mb-2">
                  Wie muss ein Mieter einen Wohnungsmangel melden?
                </h3>
                <p className="text-sm">
                  Unverzüglich und schriftlich. Beschreiben Sie den Mangel, 
                  dokumentieren Sie Fotos und setzen Sie eine angemessene 
                  Frist zur Behebung.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-navy mb-2">
                  Wie lange hat der Vermieter Zeit?
                </h3>
                <p className="text-sm">
                  Je nach Dringlichkeit: 24–48 Stunden bei Notfällen, 
                  1–2 Wochen bei normalen Reparaturen, bis zu 6 Wochen bei 
                  kosmetischen Mängeln.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-navy mb-2">
                  Wie viel Mietminderung ist möglich?
                </h3>
                <p className="text-sm">
                  5–10% bei geringen, 30–50% bei schweren Mängeln. Bei 
                  Unbewohnbarkeit bis zu 100%.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Fazit: Kommunikation ist der Schlüssel
            </h2>
            <p>
              Die meisten Konflikte um Wohnungsmängel entstehen durch 
              mangelnde Kommunikation. Wer Mängel früh, klar und 
              dokumentiert meldet, schafft die Grundlage für eine 
              zügige Behebung. Sowohl Mieter als auch Vermieter sollten 
              ihre Rechte und Pflichten kennen — das verhindert 
              unnötige Eskalationen.
            </p>
          </div>

          <div className="mt-12 bg-teal/10 border border-teal/20 rounded-xl p-8">
            <h3 className="text-xl font-bold text-navy mb-2 font-playfair">
              Schnelle Mängelbeseitigung
            </h3>
            <p className="text-gray-600 mb-4">
              einfach verwaltet. reagiert auf Mieteranfragen innerhalb 
              von Stunden, nicht Tagen. Professionelle Koordination 
              von Handwerkern inklusive.
            </p>
            <Link
              href="/anfrage"
              className="inline-block bg-teal text-white font-semibold px-6 py-3 rounded-lg hover:bg-teal/90 transition-colors"
            >
              Mehr erfahren
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
