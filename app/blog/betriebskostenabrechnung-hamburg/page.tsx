import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Betriebskostenabrechnung Hamburg: Was Vermieter wissen müssen | einfach verwaltet.",
  description:
    "Alles zur Betriebskostenabrechnung in Hamburg: Fristen, umlagefähige Kosten nach §2 BetrKV, häufige Fehler und wie Sie rechtssicher abrechnen.",
  keywords:
    "Betriebskostenabrechnung Hamburg, Nebenkostenabrechnung Hamburg, BetrKV, umlagefähige Kosten, Abrechnungsfrist",
  openGraph: {
    title: "Betriebskostenabrechnung Hamburg: Was Vermieter wissen müssen",
    description:
      "Fristen, umlagefähige Kosten, häufige Fehler — der komplette Leitfaden für Hamburger Vermieter.",
    url: "https://einfach-verwaltet.de/blog/betriebskostenabrechnung-hamburg",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Betriebskostenabrechnung Hamburg: Was Vermieter wissen müssen",
  description:
    "Fristen, umlagefähige Kosten nach §2 BetrKV, häufige Fehler und wie Hamburger Vermieter rechtssicher abrechnen.",
  author: { "@type": "Organization", name: "einfach verwaltet." },
  publisher: {
    "@type": "Organization",
    name: "einfach verwaltet.",
    logo: { "@type": "ImageObject", url: "https://einfach-verwaltet.de/logo.png" },
  },
  datePublished: "2026-02-15",
  inLanguage: "de",
  url: "https://einfach-verwaltet.de/blog/betriebskostenabrechnung-hamburg",
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
            <span className="text-gray-700">Betriebskostenabrechnung Hamburg</span>
          </nav>

          <header className="mb-10">
            <p className="text-teal text-sm font-semibold uppercase tracking-wider mb-3">
              Ratgeber · 8 min Lesezeit
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-navy font-playfair mb-4 leading-tight">
              Betriebskostenabrechnung Hamburg: Was Vermieter wissen müssen
            </h1>
            <p className="text-gray-500 text-sm">Februar 2026 · einfach verwaltet.</p>
          </header>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Warum die Betriebskostenabrechnung so wichtig ist
            </h2>
            <p>
              Die jährliche Betriebskostenabrechnung gehört zu den anspruchsvollsten
              Pflichten eines Vermieters. In Hamburg — mit seinen hohen Nebenkosten
              für Wasser, Abwasser und Müllabfuhr — ist eine korrekte Abrechnung
              besonders wichtig. Fehler können teuer werden: Mieter haben das Recht,
              fehlerhafte Abrechnungen anzufechten, und Sie als Vermieter verlieren
              unter Umständen Nachforderungen in Tausenderhöhe.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Die Frist: §556 Abs. 3 BGB — 12 Monate, keine Ausnahme
            </h2>
            <p>
              Die Abrechnung muss dem Mieter spätestens 12 Monate nach Ende des
              Abrechnungszeitraums zugehen. Endet Ihr Abrechnungsjahr am 31.12.2025,
              muss die Abrechnung bis zum 31.12.2026 beim Mieter sein. Verpassen
              Sie diese Frist, verfällt Ihr Anspruch auf Nachzahlungen — selbst wenn
              Ihre Abrechnung inhaltlich korrekt ist.
            </p>
            <p className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
              <strong>Wichtig:</strong> &bdquo;Zugehen&ldquo; bedeutet, dass die
              Abrechnung im Briefkasten des Mieters landet — nicht, wann Sie sie
              absenden. Planen Sie also Postlaufzeiten ein.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Welche Kosten sind umlagefähig? §2 BetrKV im Überblick
            </h2>
            <p>
              Die Betriebskostenverordnung (BetrKV) definiert 17 Kostenarten, die
              auf Mieter umgelegt werden dürfen — aber nur, wenn der Mietvertrag
              dies vorsieht. Die wichtigsten für Hamburg:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Grundsteuer</strong> — wird von der Gemeinde erhoben</li>
              <li><strong>Wasser &amp; Abwasser</strong> — in Hamburg über Hamburg Wasser, oft einer der größten Posten</li>
              <li><strong>Heizkosten</strong> — nach Heizkostenverordnung mindestens 50% nach Verbrauch</li>
              <li><strong>Warmwasser</strong> — häufig kombiniert mit Heizkosten</li>
              <li><strong>Müllabfuhr</strong> — Stadtreinigung Hamburg</li>
              <li><strong>Gebäudeversicherung</strong> — Feuer, Wasser, Sturm</li>
              <li><strong>Hausmeister</strong> — nur tatsächliche Kosten, keine Verwaltungsanteile</li>
              <li><strong>Gartenpflege</strong> — sofern Garten vorhanden</li>
              <li><strong>Aufzug</strong> — in Hamburg besonders relevant bei Altbauten mit nachgerüstetem Aufzug</li>
              <li><strong>Straßenreinigung &amp; Winterdienst</strong></li>
            </ul>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Umlageschlüssel: Wie verteilen Sie die Kosten?
            </h2>
            <p>
              Ohne vertragliche Vereinbarung gilt die Wohnfläche als
              Verteilungsmaßstab. In Hamburg sind die gängigsten Schlüssel:
            </p>
            <div className="bg-navy/5 border border-navy/10 rounded-xl p-6">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Wohnfläche (m²)</span>
                  <span className="font-semibold">Standard, fair bei ähnlichen Wohnungen</span>
                </div>
                <div className="flex justify-between">
                  <span>Personenzahl</span>
                  <span className="font-semibold">Gerecht bei Wasser, Müll</span>
                </div>
                <div className="flex justify-between">
                  <span>Verbrauch</span>
                  <span className="font-semibold">Pflicht bei Heizung (HeizkV)</span>
                </div>
                <div className="flex justify-between">
                  <span>Pro Einheit</span>
                  <span className="font-semibold">Einfach, aber selten der fairste Schlüssel</span>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Die 5 häufigsten Fehler bei der Betriebskostenabrechnung
            </h2>
            <ol className="list-decimal pl-6 space-y-3">
              <li>
                <strong>Fristversäumnis:</strong> Die 12-Monats-Frist wird
                verpasst — der gesamte Nachforderungsanspruch geht verloren.
              </li>
              <li>
                <strong>Nicht umlagefähige Kosten:</strong> Verwaltungskosten,
                Instandhaltungsrücklagen oder Reparaturen auf den Mieter umzulegen
                ist unzulässig.
              </li>
              <li>
                <strong>Falscher Umlageschlüssel:</strong> Ein Schlüssel, der
                nicht im Mietvertrag vereinbart ist, kann die gesamte Abrechnung
                anfechtbar machen.
              </li>
              <li>
                <strong>Fehlende Belegeinsicht:</strong> Mieter haben nach §259
                BGB das Recht, alle Originalbelege einzusehen. Verweigern Sie das,
                wird die Abrechnung unwirksam.
              </li>
              <li>
                <strong>Vorjahresvergleich fehlt:</strong> Ohne nachvollziehbare
                Gesamtkostenaufstellung ist die Abrechnung formell unwirksam.
              </li>
            </ol>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Hamburg-spezifische Besonderheiten
            </h2>
            <p>
              Hamburger Vermieter müssen einige lokale Besonderheiten beachten:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Die Grundsteuer in Hamburg ist vergleichsweise hoch und wird 2026 nach dem neuen Bundesmodell berechnet</li>
              <li>Hamburg Wasser erhebt Sielbenutzungsgebühren separat — diese sind umlagefähig</li>
              <li>Die Stadtreinigung Hamburg bietet verschiedene Mülltonnengrößen — wählen Sie bedarfsgerecht</li>
              <li>Fernwärme (z.B. von Hamburger Energiewerke) erfordert besondere Abrechnungsnachweise</li>
            </ul>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Fazit: Professionell abrechnen oder abrechnen lassen
            </h2>
            <p>
              Eine korrekte Betriebskostenabrechnung erfordert Sorgfalt, Fachwissen
              und Fristenbewusstsein. Bei mehreren Einheiten steigt der Aufwand
              exponentiell — und jeder Fehler kostet bares Geld. Viele Hamburger
              Vermieter entscheiden sich deshalb für eine professionelle Verwaltung,
              die Abrechnungen zuverlässig und termingerecht erstellt.
            </p>
          </div>

          <div className="mt-12 bg-teal/10 border border-teal/20 rounded-xl p-8">
            <h3 className="text-xl font-bold text-navy mb-2 font-playfair">
              Nie wieder Ärger mit der Nebenkostenabrechnung
            </h3>
            <p className="text-gray-600 mb-4">
              einfach verwaltet. erstellt Ihre Betriebskostenabrechnung termingerecht,
              rechtssicher und nachvollziehbar — für jede einzelne Einheit.
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
