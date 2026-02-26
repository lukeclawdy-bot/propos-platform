import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Nebenkostenabrechnung Fehler: Die 7 häufigsten Irrtümer | einfach verwaltet.",
  description:
    "Fehler in der Nebenkostenabrechnung können teuer werden. Die 7 häufigsten Fehler bei der Betriebskostenabrechnung – und wie Sie sich schützen.",
  keywords:
    "Nebenkostenabrechnung Fehler, Betriebskostenabrechnung Fehler, Nebenkostenabrechnung prüfen Hamburg",
  openGraph: {
    title: "Nebenkostenabrechnung: Die 7 häufigsten Fehler",
    description:
      "Formale und inhaltliche Fehler in der BKA — was teuer werden kann und wie Sie es vermeiden.",
    url: "https://einfach-verwaltet.de/blog/nebenkostenabrechnung-fehler",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Nebenkostenabrechnung: Die 7 häufigsten Fehler — und wie Sie sie vermeiden",
  description:
    "Welche Fehler bei der Nebenkostenabrechnung am häufigsten auftreten und wie Vermieter sich rechtlich absichern.",
  author: { "@type": "Organization", name: "einfach verwaltet." },
  publisher: {
    "@type": "Organization",
    name: "einfach verwaltet.",
    logo: { "@type": "ImageObject", url: "https://einfach-verwaltet.de/logo.png" },
  },
  datePublished: "2026-02-01",
  inLanguage: "de",
  url: "https://einfach-verwaltet.de/blog/nebenkostenabrechnung-fehler",
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
            <span className="text-gray-700">Nebenkostenabrechnung Fehler</span>
          </nav>

          <header className="mb-10">
            <p className="text-teal text-sm font-semibold uppercase tracking-wider mb-3">
              Ratgeber · 7 min Lesezeit
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-navy font-playfair mb-4 leading-tight">
              Nebenkostenabrechnung: Die 7 häufigsten Fehler — und wie Sie sie vermeiden
            </h1>
            <p className="text-gray-500 text-sm">Februar 2026 · einfach verwaltet.</p>
          </header>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Warum die Betriebskostenabrechnung so fehleranfällig ist
            </h2>
            <p>
              Die Nebenkostenabrechnung ist eine der häufigsten Streitquellen
              zwischen Vermietern und Mietern in Deutschland. Selbst wenn Ihre
              Zahlen inhaltlich korrekt sind, kann ein formaler Mangel dazu
              führen, dass die gesamte Abrechnung unwirksam ist — und Sie auf den
              Kosten sitzenbleiben.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Fehler 1: Die Abrechnungsfrist versäumt
            </h2>
            <p>
              Nach § 556 Abs. 3 BGB muss die Nebenkostenabrechnung dem Mieter
              spätestens zwölf Monate nach Ende des Abrechnungszeitraums zugehen.
              Wer diese Frist verpasst, verliert das Recht auf Nachzahlung —
              selbst wenn der Mieter tatsächlich zu wenig Vorauszahlungen
              geleistet hat.
            </p>
            <p className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
              <strong>Konkret:</strong> Eine Abrechnung für das Kalenderjahr 2025
              muss dem Mieter bis zum 31. Dezember 2026 vorliegen. Ein Tag zu
              spät, und Nachforderungen sind ausgeschlossen.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Fehler 2: Nicht umlagefähige Kosten abgerechnet
            </h2>
            <p>
              Die Betriebskostenverordnung (BetrKV) definiert abschließend, was
              umlagefähig ist. Zu den häufig fälschlich abgerechneten Positionen
              gehören:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Verwaltungskosten (die Vergütung der Hausverwaltung selbst)</li>
              <li>Instandhaltungs- und Reparaturkosten</li>
              <li>Leerstandskosten</li>
              <li>Kosten für den Eigentümerbedarf</li>
            </ul>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Fehler 3: Falscher oder fehlender Umlageschlüssel
            </h2>
            <p>
              Wenn mehrere Mieteinheiten in einem Gebäude vorhanden sind, müssen
              die Gesamtkosten auf die einzelnen Einheiten verteilt werden. Fehler
              entstehen, wenn der falsche Schlüssel verwendet wird, Leerstandswohnungen
              nicht korrekt berücksichtigt werden oder die Gesamtfläche falsch
              berechnet ist.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Fehler 4: Fehlende oder unvollständige Belege
            </h2>
            <p>
              Mieter haben nach § 259 BGB das Recht, Einsicht in die
              Abrechnungsbelege zu verlangen. Bereiten Sie sich darauf vor, für
              jede abgerechnete Position auf Anfrage Rechnungen, Verträge und
              Nachweise vorlegen zu können.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Fehler 5: Vorauszahlungen nicht korrekt verrechnet
            </h2>
            <p>
              Die Abrechnung muss die geleisteten Vorauszahlungen des Mieters
              transparent ausweisen und korrekt verrechnen. Guthabenauszahlungen
              sollten innerhalb von 30 Tagen nach Zugang der Abrechnung
              erfolgen — Verzögerungen können Verzugszinsen auslösen.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Fehler 6: Abrechnungszeitraum stimmt nicht mit dem Mietvertrag überein
            </h2>
            <p>
              Der im Mietvertrag festgelegte Abrechnungszeitraum muss in der
              Betriebskostenabrechnung exakt eingehalten werden. Bei
              Mieterwechseln innerhalb des Jahres müssen anteilige Abrechnungen
              erstellt werden.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Fehler 7: Formale Mängel im Abrechnungsdokument selbst
            </h2>
            <p>
              Die Nebenkostenabrechnung muss formalen Mindestanforderungen
              genügen. Dazu gehören: vollständige Bezeichnung der Mietparteien,
              Abrechnungszeitraum, Aufstellung aller Kostenpositionen,
              Verteilungsschlüssel, Anteil des Mieters und Saldo aus
              Vorauszahlungen.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Fazit: Präzision schützt Sie vor Verlusten
            </h2>
            <p>
              Eine fehlerhafte Nebenkostenabrechnung ist kein Kavaliersdelikt.
              Sie kostet Geld, Zeit und im schlimmsten Fall eine gerichtliche
              Auseinandersetzung. Wer strukturiert und fristgerecht arbeitet,
              vermeidet die meisten Probleme.
            </p>
          </div>

          <div className="mt-12 bg-teal/10 border border-teal/20 rounded-xl p-8">
            <h3 className="text-xl font-bold text-navy mb-2 font-playfair">
              Nebenkostenabrechnungen ohne Fehler?
            </h3>
            <p className="text-gray-600 mb-4">
              einfach verwaltet. erstellt Ihre Nebenkostenabrechnung vollständig,
              fristgerecht und prüffähig — mit lückenloser Belegdokumentation.
            </p>
            <Link
              href="/leistungen"
              className="inline-block bg-teal text-white font-semibold px-6 py-3 rounded-lg hover:bg-teal/90 transition-colors"
            >
              So funktioniert die Abrechnung bei uns
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
