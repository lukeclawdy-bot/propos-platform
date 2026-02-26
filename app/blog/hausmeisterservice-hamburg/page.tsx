import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Hausmeisterservice Hamburg: Kosten und worauf Sie achten sollten | einfach verwaltet.",
  description:
    "Hausmeisterservice Hamburg 2026: Aktuelle Kosten, Leistungsübersicht und Tipps zur Auswahl des richtigen Hausmeisterdiensts für Eigentümer in Hamburg.",
  keywords:
    "Hausmeisterservice Hamburg, Hausmeister Hamburg Kosten, Hausmeisterdienst Hamburg, Gebäudeservice Hamburg",
  openGraph: {
    title: "Hausmeisterservice Hamburg: Kosten und worauf Sie achten sollten",
    description:
      "Hausmeisterservice in Hamburg: Preise, Leistungen und Tipps für Eigentümer.",
    url: "https://einfach-verwaltet.de/blog/hausmeisterservice-hamburg",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Hausmeisterservice Hamburg: Kosten und worauf Sie achten sollten",
  description:
    "Alles über Hausmeisterservices in Hamburg: Kosten, Leistungen und Auswahlkriterien.",
  author: { "@type": "Organization", name: "einfach verwaltet." },
  publisher: {
    "@type": "Organization",
    name: "einfach verwaltet.",
    logo: { "@type": "ImageObject", url: "https://einfach-verwaltet.de/logo.png" },
  },
  datePublished: "2026-02-01",
  inLanguage: "de",
  url: "https://einfach-verwaltet.de/blog/hausmeisterservice-hamburg",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was kostet ein Hausmeisterservice in Hamburg?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ein professioneller Hausmeisterservice in Hamburg kostet je nach Umfang €20–40 pro Stunde (Festpreis) oder €80–200 pro Monat für ein Pauschalpaket bei einem typischen Mehrfamilienhaus. Die Kosten hängen von der Objektgröße, dem Leistungsumfang (Winterdienst, Grünpflege, Reinigung) und der Häufigkeit ab.",
      },
    },
    {
      "@type": "Question",
      name: "Welche Leistungen gehören zum Hausmeisterservice?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ein typischer Hausmeisterservice umfasst: Treppenhausreinigung, Außenbereichspflege (Rasen, Gehwege), Winterdienst (Räumen, Streuen), Pflege technischer Anlagen (Heizung, Aufzug), Kleinreparaturen, Müllentsorgung und Leerstandsüberwachung. Spezialisierte Dienste wie Gebäudereinigung oder Sanitärwartung werden oft separat beauftragt.",
      },
    },
    {
      "@type": "Question",
      name: "Sind Hausmeisterkosten auf Mieter umlagefähig?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, Hausmeisterkosten können nach §2 Nr. 14 BetrKV auf die Mieter umgelegt werden — aber nur für tatsächlich erbrachte Leistungen, die dem Gemeinschaftseigentum zugutekommen. Verwaltungsleistungen (z.B. Buchhaltung) sind nicht umlagefähig. Die Abgrenzung muss im Mietvertrag klar geregelt sein.",
      },
    },
    {
      "@type": "Question",
      name: "Wie finde ich einen guten Hausmeisterservice in Hamburg?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Achten Sie auf: nachgewiesene Erfahrung mit Hamburger Wohnobjekten, Referenzen bei vergleichbaren Objekten, klares Leistungsverzeichnis, Haftpflichtversicherung, schnelle Reaktionszeiten und transparente Preisgestaltung. Holen Sie mindestens drei Angebote ein und prüfen Sie Bewertungen.",
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
            <span className="text-gray-700">Hausmeisterservice Hamburg</span>
          </nav>

          <header className="mb-10">
            <p className="text-teal text-sm font-semibold uppercase tracking-wider mb-3">
              Ratgeber · 8 min Lesezeit
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-navy font-playfair mb-4 leading-tight">
              Hausmeisterservice Hamburg: Kosten und worauf Sie achten sollten
            </h1>
            <p className="text-gray-500 text-sm">Februar 2026 · einfach verwaltet.</p>
          </header>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">

            <p>
              Ein zuverlässiger Hausmeisterservice ist das Rückgrat jeder funktionierenden
              Immobilienverwaltung. Saubere Treppenhäuser, gepflegte Außenanlagen, schnell
              behobene Kleinschäden — das steigert die Wohnqualität, reduziert Mieterstreit
              und schützt den Wert der Immobilie. Doch was kostet ein guter Hausmeisterdienst
              in Hamburg, und worauf sollten Eigentümer achten?
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Was kostet ein Hausmeisterservice in Hamburg?
            </h2>
            <p>
              Die Kosten für Hausmeisterservices in Hamburg variieren stark je nach
              Leistungsumfang, Objektgröße und Vertragsmodell. Als Orientierung gelten
              folgende Richtwerte für 2026:
            </p>

            <div className="bg-navy/5 border border-navy/10 rounded-xl p-6 my-6">
              <h3 className="font-bold text-navy mb-4">Preisübersicht Hamburg 2026</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b pb-2">
                  <span>Stundenpreis (Einzelauftrag)</span>
                  <span className="font-semibold">€20–35/Stunde</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Pauschalvertrag (MFH 4–8 Einheiten)</span>
                  <span className="font-semibold">€80–180/Monat</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Pauschalvertrag (MFH 10–20 Einheiten)</span>
                  <span className="font-semibold">€180–350/Monat</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Winterdienst (Räumen + Streuen)</span>
                  <span className="font-semibold">€50–120/Einsatz</span>
                </div>
                <div className="flex justify-between">
                  <span>Treppenhausreinigung (wöchentlich)</span>
                  <span className="font-semibold">€60–120/Monat</span>
                </div>
              </div>
            </div>

            <p>
              Wichtig: Vergleichen Sie immer den <strong>Leistungsumfang</strong>, nicht
              nur den Preis. Ein Pauschalpaket für €120/Monat kann mehr Leistung beinhalten
              als fünf Einzelaufträge für je €35/Stunde.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Welche Leistungen gehören zum Hausmeisterservice?
            </h2>
            <p>
              Ein vollständiger Hausmeisterservice umfasst typischerweise folgende
              Leistungsbereiche:
            </p>

            <h3 className="text-xl font-bold text-navy font-playfair mt-6 mb-3">
              Reinigung und Pflege
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Wöchentliche Treppenhausreinigung (Wischen, Saugen, Geländer wischen)</li>
              <li>Reinigung von Keller, Fahrradkeller und Gemeinschaftsräumen</li>
              <li>Pflege der Außenanlagen (Rasen mähen, Hecken schneiden)</li>
              <li>Laubblasen und Gehwegsreinigung</li>
            </ul>

            <h3 className="text-xl font-bold text-navy font-playfair mt-6 mb-3">
              Winterdienst
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Schneeräumen auf Gehwegen und Zufahrten (Verkehrssicherungspflicht §823 BGB)</li>
              <li>Streuen mit abstumpfenden Mitteln bei Glätte</li>
              <li>Dokumentation der Einsätze für Haftungszwecke</li>
            </ul>

            <h3 className="text-xl font-bold text-navy font-playfair mt-6 mb-3">
              Technische Wartung
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Sichtprüfung Heizungsanlage, Ablesedienst</li>
              <li>Austausch von Leuchtmitteln im Gemeinschaftsbereich</li>
              <li>Kleinreparaturen (bis ca. €50 Materialwert)</li>
              <li>Kontrolle und Meldung von Schäden an die Verwaltung</li>
            </ul>

            <h3 className="text-xl font-bold text-navy font-playfair mt-6 mb-3">
              Verwaltungsunterstützung
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Mülltrennung und -bereitstellung (Abfuhrdaten beachten)</li>
              <li>Schlüsselverwaltung bei Mieterein- und -auszügen</li>
              <li>Handwerker empfangen und einweisen</li>
              <li>Ansprechpartner für Mieter bei dringenden Anliegen</li>
            </ul>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Sind Hausmeisterkosten auf Mieter umlagefähig?
            </h2>
            <p>
              Ja — Hausmeisterkosten können nach{" "}
              <strong>§2 Nr. 14 BetrKV</strong> (Betriebskostenverordnung) auf die
              Mieter umgelegt werden. Voraussetzung: Die Kosten entstehen durch Tätigkeiten,
              die dem Gemeinschaftseigentum zugutekommen (Reinigung, Winterdienst,
              Grünpflege).
            </p>
            <p>
              <strong>Nicht umlagefähig</strong> sind Verwaltungsleistungen des
              Hausmeisters (z.B. Rechnungsbearbeitung, Buchführung) — diese gelten als
              Verwaltungskosten (§26 Abs. 1 S. 1 Nr. 7 BetrKV). Der Anteil von
              Verwaltung vs. Betriebskostenpositionen muss im Zweifel nachgewiesen werden.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              So wählen Sie den richtigen Hausmeisterservice in Hamburg
            </h2>
            <div className="space-y-4">
              {[
                {
                  num: "1",
                  title: "Leistungsverzeichnis anfordern",
                  text: "Holen Sie ein schriftliches Angebot mit exakt definiertem Leistungsumfang ein. Was ist inklusive — was wird extra berechnet?",
                },
                {
                  num: "2",
                  title: "Haftpflichtversicherung prüfen",
                  text: "Ein seriöser Hausmeisterservice verfügt über eine Betriebshaftpflichtversicherung. Fragen Sie nach dem Versicherungsnachweis.",
                },
                {
                  num: "3",
                  title: "Reaktionszeiten definieren",
                  text: "Wie schnell reagiert der Service bei dringenden Meldungen? Gibt es einen Notfallkontakt? Bei Hamburger Wintern entscheidend.",
                },
                {
                  num: "4",
                  title: "Referenzen einholen",
                  text: "Fragen Sie nach vergleichbaren Referenzobjekten in Hamburg — idealerweise ähnlicher Größe und Lage wie Ihre Immobilie.",
                },
                {
                  num: "5",
                  title: "Mindestens 3 Angebote einholen",
                  text: "Die Preisspanne ist groß. Drei Vergleichsangebote zeigen Ihnen, was marktüblich ist.",
                },
              ].map(({ num, title, text }) => (
                <div key={num} className="flex gap-4 p-4 border border-gray-200 rounded-xl">
                  <div className="w-8 h-8 bg-teal text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {num}
                  </div>
                  <div>
                    <div className="font-bold text-navy mb-1">{title}</div>
                    <p className="text-sm text-gray-600">{text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ Section */}
            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-6">
              Häufige Fragen zum Hausmeisterservice Hamburg
            </h2>

            <div className="space-y-6">
              {[
                {
                  q: "Was kostet ein Hausmeisterservice in Hamburg?",
                  a: "Je nach Umfang €20–35/Stunde oder €80–350/Monat (Pauschalvertrag). Die Kosten hängen von Objektgröße, Leistungsumfang und Häufigkeit ab.",
                },
                {
                  q: "Welche Leistungen gehören zum Hausmeisterservice?",
                  a: "Treppenhausreinigung, Außenbereichspflege, Winterdienst, Pflege technischer Anlagen, Kleinreparaturen, Müllentsorgung und Leerstandsüberwachung.",
                },
                {
                  q: "Sind Hausmeisterkosten auf Mieter umlagefähig?",
                  a: "Ja, nach §2 Nr. 14 BetrKV — aber nur für tatsächliche Betriebsleistungen, nicht für Verwaltungsleistungen des Hausmeisters.",
                },
                {
                  q: "Wie finde ich einen guten Hausmeisterservice in Hamburg?",
                  a: "Achten Sie auf: Erfahrung mit Hamburger Wohnobjekten, Referenzen, klares Leistungsverzeichnis, Haftpflichtversicherung, schnelle Reaktionszeiten und transparente Preise. Holen Sie mindestens drei Angebote ein.",
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
                Hausmeisterservice inklusive — keine Extra-Koordination
              </h3>
              <p className="text-white/80 mb-6 text-sm">
                Mit einfach verwaltet. koordinieren wir Hausmeisterservice, Reinigung
                und Winterdienst für Sie — ein Ansprechpartner, ein Vertrag.
              </p>
              <Link
                href="/anfrage"
                className="inline-block bg-teal hover:bg-teal/90 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                Kostenloses Angebot anfragen →
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
