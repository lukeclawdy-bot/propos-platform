import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Hausverwaltung Hamburg Kosten 2026: Was kostet Mietverwaltung? | einfach verwaltet.",
  description:
    "Was kostet eine professionelle Hausverwaltung in Hamburg? Marktpreise, Leistungsumfang und versteckte Kosten im Vergleich – transparent erklärt von einfach verwaltet.",
  keywords:
    "Hausverwaltung Hamburg Kosten, Hausverwaltung Kosten 2026, Mietverwaltung Preis Hamburg, Hausverwaltung Preisvergleich",
  openGraph: {
    title: "Hausverwaltung Hamburg: Was kostet eine professionelle Mietverwaltung?",
    description:
      "€24–34/Einheit/Monat — aber was steckt wirklich drin? ROI-Analyse und Kostenvergleich.",
    url: "https://einfach-verwaltet.de/blog/hausverwaltung-hamburg-kosten",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Hausverwaltung Hamburg: Was kostet eine professionelle Mietverwaltung?",
  description:
    "Hausverwaltung Hamburg Kosten 2026: Marktpreise, Leistungsumfang, versteckte Gebühren und ROI-Berechnung für private Vermieter.",
  author: { "@type": "Organization", name: "einfach verwaltet." },
  publisher: {
    "@type": "Organization",
    name: "einfach verwaltet.",
    logo: { "@type": "ImageObject", url: "https://einfach-verwaltet.de/logo.png" },
  },
  datePublished: "2026-02-01",
  inLanguage: "de",
  url: "https://einfach-verwaltet.de/blog/hausverwaltung-hamburg-kosten",
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
            <span className="text-gray-700">Hausverwaltung Hamburg Kosten</span>
          </nav>

          <header className="mb-10">
            <p className="text-teal text-sm font-semibold uppercase tracking-wider mb-3">
              Ratgeber · 7 min Lesezeit
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-navy font-playfair mb-4 leading-tight">
              Hausverwaltung Hamburg: Was kostet eine professionelle Mietverwaltung?
            </h1>
            <p className="text-gray-500 text-sm">Februar 2026 · einfach verwaltet.</p>
          </header>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Die ehrliche Antwort auf eine häufige Frage
            </h2>
            <p>
              &bdquo;Was kostet eine Hausverwaltung?&ldquo; — der Preis allein sagt wenig
              aus. Entscheidend ist, was er umfasst, was er ausschließt und was
              passiert, wenn etwas Unvorhergesehenes eintritt.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Marktpreise in Hamburg 2026: Was ist der Maßstab?
            </h2>
            <p>
              Für die Mietverwaltung liegt das Marktpreisniveau in Hamburg bei{" "}
              <strong>€24–34 pro Einheit und Monat</strong>. Je mehr Einheiten
              ein Eigentümer hat, desto günstiger wird der Preis pro Einheit.
            </p>
            <div className="bg-navy/5 border border-navy/10 rounded-xl p-6">
              <h3 className="font-bold text-navy mb-3">Orientierungsrahmen Hamburg 2026</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>1–5 Einheiten</span>
                  <span className="font-semibold">€30–34/Einheit/Monat</span>
                </div>
                <div className="flex justify-between">
                  <span>6–20 Einheiten</span>
                  <span className="font-semibold">€26–30/Einheit/Monat</span>
                </div>
                <div className="flex justify-between">
                  <span>21–50 Einheiten</span>
                  <span className="font-semibold">€24–28/Einheit/Monat</span>
                </div>
                <div className="flex justify-between">
                  <span>50+ Einheiten</span>
                  <span className="font-semibold">individuell</span>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Was sollte im Grundhonorar enthalten sein?
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Mietkommunikation:</strong> Entgegennahme und Bearbeitung von Mieteranfragen</li>
              <li><strong>Mietzahlungsüberwachung:</strong> Kontrolle des Mieteingangs, Mahnwesen</li>
              <li><strong>Betriebskostenabrechnung:</strong> Erstellung und Versand der jährlichen Abrechnung</li>
              <li><strong>Belegmanagement:</strong> Verwaltung von Rechnungen, Verträgen, Wartungsnachweisen</li>
              <li><strong>Handwerkereinsätze:</strong> Organisation von Reparaturen und Wartungen</li>
              <li><strong>Eigentümerreporting:</strong> Regelmäßige Berichte über Einnahmen und Ausgaben</li>
            </ul>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Versteckte Kosten: Was oft nicht im Basispreis steckt
            </h2>
            <p>Typische Posten, die extra berechnet werden:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Vermietungsprovisionen:</strong> 1–2 Nettokaltmieten bei Mieterwechsel</li>
              <li><strong>Mieterhöhungsverlangen:</strong> Formulierung und Versand als Extraleistung</li>
              <li><strong>Mahngebühren:</strong> Pauschale pro Mahnschreiben</li>
              <li><strong>Außerordentliche Korrespondenz:</strong> Jedes Schreiben über das &bdquo;Normale&ldquo; hinaus</li>
            </ul>
            <p className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
              <strong>Tipp:</strong> Verlangen Sie vor Vertragsschluss ein vollständiges
              Leistungsverzeichnis mit allen möglichen Zusatzgebühren. Ein günstiger
              Grundpreis kann sich durch diese Positionen schnell verdoppeln.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Selbstverwaltung: Die Kosten, die man nicht sieht
            </h2>
            <p>
              Die Selbstverwaltung einer Einheit kostet erfahrungsgemäß 4–8
              Stunden pro Monat. Bei 10 Einheiten: 40–80 Stunden monatlich — eine
              Halbzeitstelle, unbezahlt, mit persönlicher Haftung und ohne Urlaub.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Der ROI einer professionellen Hausverwaltung
            </h2>
            <p>
              Bei 10 Einheiten à €30/Monat zahlen Sie €3.600 im Jahr. Im
              Gegenzug gewinnen Sie:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Mehrere hundert Stunden Ihrer Zeit zurück</li>
              <li>Rechtssicherheit bei Abrechnungen und Mieterhöhungen</li>
              <li>Professionelles Mahnwesen, das Mietausfälle reduziert</li>
              <li>Schnelle Handwerkerkoordination, die Leerstandszeiten verkürzt</li>
            </ul>
            <p>
              Wer eine einzige fehlerhafte Betriebskostenabrechnung vermeidet,
              hat die Verwaltungskosten eines ganzen Jahres bereits refinanziert.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Fazit: Qualität zahlt sich aus
            </h2>
            <p>
              Beim Hausverwaltung zahlen Sie nicht für einen Dienstleister — Sie
              zahlen für Ihre Ruhe und die Sicherheit Ihres Investments. Wer auf
              das vermeintlich billigste Angebot setzt, zahlt häufig doppelt.
            </p>
          </div>

          <div className="mt-12 bg-teal/10 border border-teal/20 rounded-xl p-8">
            <h3 className="text-xl font-bold text-navy mb-2 font-playfair">
              Transparente Preise — kein Kleingedrucktes
            </h3>
            <p className="text-gray-600 mb-4">
              einfach verwaltet. publiziert seine Preise offen — als Einziger in
              Hamburg. Keine versteckten Gebühren, kein Nachverhandeln.
            </p>
            <Link
              href="/preise"
              className="inline-block bg-teal text-white font-semibold px-6 py-3 rounded-lg hover:bg-teal/90 transition-colors mr-3"
            >
              Preise ansehen
            </Link>
            <Link
              href="/anfrage"
              className="inline-block border border-teal text-teal font-semibold px-6 py-3 rounded-lg hover:bg-teal/5 transition-colors"
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
