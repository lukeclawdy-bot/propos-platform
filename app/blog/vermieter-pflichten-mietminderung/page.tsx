import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Vermieter Pflichten bei Mietminderung: §536 BGB erklärt | einfach verwaltet.",
  description:
    "Wann gilt §536 BGB? Mangelarten, Anzeigepflicht, Wie viel Miete darf gemindert werden, wie Vermieter Streit vermeiden und was sie tun müssen, wenn der Mieter die Miete kürzt.",
  keywords:
    "Vermieter Pflichten Mietminderung, §536 BGB Mietminderung, Mietmangel Vermieter, Mietminderung Voraussetzungen, Mietminderung vermeiden",
  openGraph: {
    title: "Vermieter Pflichten bei Mietminderung: §536 BGB, Mangelarten & Vorbeugung",
    description:
      "Wann darf der Mieter die Miete kürzen? Was muss der Vermieter tun? §536 BGB vollständig erklärt.",
    url: "https://einfach-verwaltet.de/blog/vermieter-pflichten-mietminderung",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "article",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Vermieter Pflichten bei Mietminderung: §536 BGB, Mangelarten und Streitvorbeugung",
  description:
    "§536 BGB Mietminderung: Wann gilt sie, welche Mangeltypen gibt es, wie hoch darf die Minderung sein und wie vermeiden Vermieter Konflikte.",
  author: { "@type": "Organization", name: "einfach verwaltet." },
  publisher: {
    "@type": "Organization",
    name: "einfach verwaltet.",
    logo: { "@type": "ImageObject", url: "https://einfach-verwaltet.de/logo.png" },
  },
  datePublished: "2026-02-27",
  inLanguage: "de",
  url: "https://einfach-verwaltet.de/blog/vermieter-pflichten-mietminderung",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Wann darf ein Mieter die Miete mindern?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Gemäß §536 BGB ist der Mieter zur Mietminderung berechtigt, wenn die Mietsache einen Mangel aufweist, der ihre Tauglichkeit zum vertragsgemäßen Gebrauch aufhebt oder erheblich mindert. Voraussetzung ist, dass der Mieter den Mangel dem Vermieter angezeigt hat (Anzeigepflicht nach §536c BGB). Eine Minderung ohne vorherige Anzeige ist nur in Ausnahmefällen zulässig.",
      },
    },
    {
      "@type": "Question",
      name: "Welche Mängel berechtigen zur Mietminderung?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mietminderungsfähige Mängel umfassen: Heizungsausfall (besonders im Winter), Schimmelbefall, Wasserrohrbrüche, Lärm durch Baustellen (wenn nicht vorhersehbar), Ungeziefer, dauerhafter Ausfall von Fahrstuhl oder Gemeinschaftseinrichtungen, wesentliche Wohnflächenunterschreitung. Nicht berechtigt zur Minderung: normale Gebrauchsabnutzung, selbst verursachte Mängel, Mängel nach schriftlichem Verzicht.",
      },
    },
    {
      "@type": "Question",
      name: "Was muss der Vermieter tun, wenn ein Mangel gemeldet wird?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nach der Mangelanzeige durch den Mieter muss der Vermieter den Mangel in angemessener Zeit beseitigen. Was 'angemessen' ist, hängt von der Dringlichkeit ab: Ein Heizungsausfall im Winter erfordert sofortiges Handeln (24–48 Stunden), ein defektes Schloss innerhalb weniger Tage. Bei Verzögerung kann der Mieter den Mangel selbst beseitigen lassen und die Kosten als Vorschuss oder Aufrechnung geltend machen (§536a BGB).",
      },
    },
    {
      "@type": "Question",
      name: "Kann der Vermieter die Mietminderung ausschließen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Das Recht zur Mietminderung nach §536 BGB ist halbzwingend und kann nicht vollständig vertraglich ausgeschlossen werden (§536 Abs. 4 BGB). Ausnahmen: Kenntnis des Mieters bei Vertragsschluss (§536b BGB) und schriftliche Übernahme des Risikos bekannter Mängel.",
      },
    },
  ],
};

export default function VermieterPflichtenMietminderungPost() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
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
            <span className="text-gray-700">Vermieter Pflichten Mietminderung</span>
          </nav>

          <header className="mb-10">
            <p className="text-teal text-sm font-semibold uppercase tracking-wider mb-3">
              Ratgeber · 9 min Lesezeit
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-navy font-playfair mb-4 leading-tight">
              Vermieter Pflichten bei Mietminderung: §536 BGB, Mangelarten und wie Sie Streit vermeiden
            </h1>
            <p className="text-gray-500 text-sm">Februar 2026 · einfach verwaltet.</p>
          </header>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Was ist Mietminderung — und warum ist sie für Vermieter so relevant?
            </h2>
            <p>
              Wenn ein Mieter die Miete kürzt, ist das für viele Vermieter zunächst ein Schock.
              Aber Mietminderung ist kein taktisches Instrument des Mieters — sie ist ein gesetzlich
              verankertes Recht, das automatisch eintritt, sobald die gesetzlichen Voraussetzungen erfüllt sind.
              Wer als Vermieter die Rechtslage kennt, kann Konflikte deutlich besser einschätzen — und oft
              von vornherein vermeiden.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              §536 BGB: Die gesetzliche Grundlage
            </h2>
            <p>
              §536 BGB regelt das Mietminderungsrecht für Wohnraummietverhältnisse. Der Kern:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Ist die Mietsache mit einem Mangel behaftet, der ihre Tauglichkeit zum vertragsgemäßen
                Gebrauch <strong>aufhebt</strong>, ist der Mieter für die Dauer des Mangels von der
                Mietzahlungspflicht vollständig befreit.
              </li>
              <li>
                Ist die Tauglichkeit lediglich <strong>erheblich gemindert</strong>, hat der Mieter
                nur eine angemessen herabgesetzte Miete zu zahlen. Die Höhe richtet sich nach dem
                Ausmaß der Beeinträchtigung.
              </li>
              <li>
                Bei einer nur unerheblichen Beeinträchtigung (§536 Abs. 1 S. 3 BGB) entfällt das
                Minderungsrecht. Die Grenze liegt bei ca. 10–15 % Funktionseinschränkung (je nach Rechtsprechung).
              </li>
            </ul>
            <p className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
              <strong>Wichtig:</strong> Die Mietminderung tritt kraft Gesetzes ein — der Mieter muss
              keinen Minderungsbetrag beantragen oder gerichtlich durchsetzen. Er darf einfach weniger zahlen.
              Der Vermieter muss dann ggf. klagen, wenn er die Minderung für unberechtigt hält.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Welche Mangelarten berechtigen zur Mietminderung?
            </h2>

            <h3 className="text-xl font-bold text-navy mt-6 mb-3">Bauliche Mängel</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Schimmelbefall (besonders häufiger Streitpunkt — Frage ist, ob Vermieter- oder Mieterverursachung)</li>
              <li>Heizungsausfall oder unzureichende Heizleistung (weniger als 20°C tagsüber)</li>
              <li>Wasserschäden und Rohrbrüche</li>
              <li>Undichtes Dach, feuchte Wände</li>
              <li>Ausfall von Aufzug oder anderen Gemeinschaftseinrichtungen</li>
            </ul>

            <h3 className="text-xl font-bold text-navy mt-6 mb-3">Lärm- und Umweltbeeinträchtigungen</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Baulärm durch externe Baustellen (nur wenn nicht vorhersehbar bei Vertragsschluss)</li>
              <li>Lärm durch andere Mieter (Vermieter muss aktiv werden, sonst haftet er mit)</li>
              <li>Geruchsbeeinträchtigungen durch Dritte</li>
            </ul>

            <h3 className="text-xl font-bold text-navy mt-6 mb-3">Wohnflächenabweichungen</h3>
            <p>
              Weicht die tatsächliche Wohnfläche mehr als 10 % von der im Mietvertrag angegebenen Fläche ab,
              gilt dies als Mangel (BGH, VIII ZR 295/03). Der Mieter darf die Miete proportional zur
              Flächenabweichung mindern — rückwirkend bis zu 3 Jahre.
            </p>

            <h3 className="text-xl font-bold text-navy mt-6 mb-3">Was kein Mangel ist</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Normale Abnutzung durch vertragsgemäßen Gebrauch</li>
              <li>Selbst durch den Mieter verursachte Mängel</li>
              <li>Mängel, die der Mieter bei Vertragsschluss kannte und akzeptiert hat (§536b BGB)</li>
              <li>Unerhebliche Beeinträchtigungen (Bagatellfälle)</li>
            </ul>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Die Anzeigepflicht: Ohne Meldung kein Minderungsrecht
            </h2>
            <p>
              §536c BGB verpflichtet den Mieter, dem Vermieter einen Mangel unverzüglich anzuzeigen.
              Tut er dies nicht, verliert er für die Zeit, in der die Anzeige unterblieben ist, sein
              Minderungsrecht — und haftet außerdem für Schäden, die durch die verspätete Meldung entstanden sind.
            </p>
            <p>
              Für Vermieter bedeutet das: Erst nach der Mangelanzeige läuft die Minderungsberechtigung.
              Wer schnell auf Mangelanzeigen reagiert, begrenzt den Minderungszeitraum erheblich.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Was Vermieter nach einer Mangelanzeige tun müssen
            </h2>
            <p>
              Nach Eingang der Mangelanzeige gilt: Der Vermieter muss den Mangel innerhalb angemessener
              Frist beseitigen. Was &bdquo;angemessen&ldquo; ist, hängt von der Dringlichkeit ab:
            </p>
            <div className="bg-navy/5 border border-navy/10 rounded-xl p-6">
              <h3 className="font-bold text-navy mb-3">Reaktionszeiten nach Dringlichkeit</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Heizungsausfall im Winter</span>
                  <span className="font-semibold text-red-600">24–48 Stunden</span>
                </div>
                <div className="flex justify-between">
                  <span>Wasserrohrbruch</span>
                  <span className="font-semibold text-red-600">sofort</span>
                </div>
                <div className="flex justify-between">
                  <span>Schloss defekt / Einbruchgefahr</span>
                  <span className="font-semibold text-orange-600">1–3 Tage</span>
                </div>
                <div className="flex justify-between">
                  <span>Schimmelflecken (begrenzt)</span>
                  <span className="font-semibold text-orange-600">1–2 Wochen</span>
                </div>
                <div className="flex justify-between">
                  <span>Defektes Fenster (kein Zugwind)</span>
                  <span className="font-semibold text-yellow-600">2–4 Wochen</span>
                </div>
              </div>
            </div>
            <p>
              Verzögert der Vermieter die Mangelbeseitigung schuldhaft, kann der Mieter:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Den Mangel selbst beseitigen lassen und die Kosten vom Vermieter verlangen (§536a Abs. 2 BGB)</li>
              <li>Schadensersatz für durch den Mangel entstandene Schäden fordern (§536a Abs. 1 BGB)</li>
              <li>Bei gravierenden dauerhaften Mängeln fristlos kündigen (§543 BGB)</li>
            </ul>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Wie Vermieter Mietminderungsstreitigkeiten vermeiden
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Schnelles Reaktionssystem:</strong> Richten Sie einen klaren Prozess für Mangelanzeigen
                ein — Eingangsbestätigung innerhalb 24h, Erstbegehung innerhalb 48h, Maßnahmenzusage innerhalb einer Woche.
              </li>
              <li>
                <strong>Schriftliche Dokumentation:</strong> Halten Sie Mangelanzeigen und Ihre Reaktionen
                immer schriftlich fest — E-Mail oder Mieterportal sind ideal.
              </li>
              <li>
                <strong>Regelmäßige Begehungen:</strong> Identifizieren Sie Mängel proaktiv, bevor der Mieter
                sie meldet. Jährliche Besichtigungen (mit Zustimmung des Mieters) können spätere Streitigkeiten
                über den Ursprung von Schäden deutlich reduzieren.
              </li>
              <li>
                <strong>Handwerker-Netzwerk:</strong> Qualifizierte Handwerker mit kurzen Reaktionszeiten
                sind eines der wertvollsten Assets eines Vermieters.
              </li>
            </ul>

            {/* FAQ Section */}
            <h2 className="text-2xl font-bold text-navy font-playfair mt-12 mb-6">
              Häufige Fragen zur Mietminderung
            </h2>
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-navy mb-2">Wann darf ein Mieter die Miete mindern?</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Gemäß §536 BGB bei Mängeln, die die Tauglichkeit der Wohnung aufheben oder erheblich mindern,
                  nach vorheriger schriftlicher Mangelanzeige beim Vermieter (§536c BGB). Unerhebliche
                  Beeinträchtigungen berechtigen nicht zur Minderung.
                </p>
              </div>
              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-navy mb-2">Welche Mängel berechtigen zur Mietminderung?</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Typische Fälle: Heizungsausfall, Schimmel, Wasserrohrbruch, erheblicher Lärm durch externe
                  Baustellen, Ungeziefer, Fahrstuhlausfall, wesentliche Wohnflächenunterschreitung (&gt;10 %).
                  Nicht: selbst verursachte Schäden, normale Abnutzung, bekannte Mängel bei Vertragsschluss.
                </p>
              </div>
              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-navy mb-2">Was muss der Vermieter tun, wenn ein Mangel gemeldet wird?</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Den Mangel in angemessener Frist beseitigen. Dringende Mängel (Heizungsausfall im Winter,
                  Wassereinbruch) erfordern sofortige Reaktion innerhalb von 24–48 Stunden. Bei Verzögerung
                  riskiert der Vermieter, dass der Mieter Kosten selbst verauslagt und aufrechnet.
                </p>
              </div>
              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-navy mb-2">Kann der Vermieter die Mietminderung ausschließen?</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Nein — §536 Abs. 4 BGB erklärt vertragliche Ausschlüsse des Minderungsrechts für unwirksam.
                  Ausnahmen: Kenntnis des Mieters bei Vertragsschluss (§536b BGB) und ausdrückliche schriftliche
                  Übernahme des Mangelrisikos.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 bg-teal/10 border border-teal/20 rounded-xl p-8">
            <h3 className="text-xl font-bold text-navy mb-2 font-playfair">
              Lassen Sie uns Ihre Immobilie verwalten
            </h3>
            <p className="text-gray-600 mb-4">
              Schnelle Reaktion auf Mangelanzeigen, professionelles Handwerker-Netzwerk, dokumentierte
              Kommunikation — einfach verwaltet. minimiert Ihre Mietminderungsrisiken.
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
