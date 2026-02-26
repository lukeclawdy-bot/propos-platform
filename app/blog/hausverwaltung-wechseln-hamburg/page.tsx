import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Hausverwaltung wechseln Hamburg – stressfrei wechseln | einfach verwaltet.",
  description:
    "Hausverwaltung wechseln in Hamburg? Erfahren Sie, wie der Wechsel rechtssicher und stressfrei gelingt – inkl. Kündigungsfristen und Checkliste.",
  keywords:
    "Hausverwaltung wechseln Hamburg, Hausverwaltung kündigen, Verwalterwechsel Hamburg",
  openGraph: {
    title: "Hausverwaltung wechseln in Hamburg: Stressfrei Schritt für Schritt",
    description:
      "Kündigungsfristen, Übergabecheckliste, Mieterinformation — alles zum rechtssicheren Verwalterwechsel.",
    url: "https://einfach-verwaltet.de/blog/hausverwaltung-wechseln-hamburg",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Hausverwaltung wechseln in Hamburg: So gelingt der Wechsel stressfrei",
  description:
    "Schritt-für-Schritt-Anleitung zum stressfreien Wechsel der Hausverwaltung in Hamburg.",
  author: { "@type": "Organization", name: "einfach verwaltet." },
  publisher: {
    "@type": "Organization",
    name: "einfach verwaltet.",
    logo: {
      "@type": "ImageObject",
      url: "https://einfach-verwaltet.de/logo.png",
    },
  },
  datePublished: "2026-02-01",
  inLanguage: "de",
  url: "https://einfach-verwaltet.de/blog/hausverwaltung-wechseln-hamburg",
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
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-teal">Startseite</Link>
            <span className="mx-2">›</span>
            <Link href="/blog" className="hover:text-teal">Ratgeber</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-700">Hausverwaltung wechseln Hamburg</span>
          </nav>

          {/* Header */}
          <header className="mb-10">
            <p className="text-teal text-sm font-semibold uppercase tracking-wider mb-3">
              Ratgeber · 6 min Lesezeit
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-navy font-playfair mb-4 leading-tight">
              Hausverwaltung wechseln in Hamburg: So gelingt der Wechsel stressfrei
            </h1>
            <p className="text-gray-500 text-sm">Februar 2026 · einfach verwaltet.</p>
          </header>

          {/* Content */}
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Warum immer mehr Eigentümer in Hamburg ihre Hausverwaltung wechseln
            </h2>
            <p>
              Die Gründe sind oft dieselben: Mieter beschweren sich wochenlang,
              ohne dass etwas passiert. Die Nebenkostenabrechnung kommt zu spät
              oder enthält Fehler. Anfragen werden ignoriert, Rückrufe bleiben
              aus. Und am Jahresende fragt man sich: Wofür zahle ich das
              eigentlich?
            </p>
            <p>
              Wenn Sie sich das auch fragen, sind Sie nicht allein. Die Nachfrage
              nach einem Hausverwaltungswechsel in Hamburg hat in den letzten
              Jahren deutlich zugenommen — und das aus gutem Grund. Viele
              klassische Verwaltungen sind mit steigenden gesetzlichen
              Anforderungen, digitaler Kommunikation und dem Anspruch moderner
              Eigentümer schlicht überfordert.
            </p>
            <p>
              Die gute Nachricht: Ein Wechsel ist einfacher als gedacht.
              Vorausgesetzt, Sie kennen die Schritte.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Schritt 1: Den bestehenden Vertrag prüfen
            </h2>
            <p>
              Bevor Sie handeln, schauen Sie in Ihren Verwaltervertrag. Folgende
              Punkte sind entscheidend:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Vertragslaufzeit:</strong> Wurde ein festes Ende
                vereinbart? Viele Verträge laufen auf unbestimmte Zeit oder haben
                eine automatische Verlängerungsklausel.
              </li>
              <li>
                <strong>Kündigungsfrist:</strong> Üblich sind drei bis sechs
                Monate zum Jahresende. Ohne fristgerechte Kündigung verlängert
                sich der Vertrag automatisch.
              </li>
              <li>
                <strong>Außerordentliches Kündigungsrecht:</strong> Bei
                schwerwiegenden Pflichtverletzungen können Sie unter Umständen
                fristlos kündigen. Lassen Sie das im Zweifel rechtlich prüfen.
              </li>
            </ul>
            <p className="text-gray-500 italic">
              Tipp: Wenn Ihr Vertrag keine eindeutige Regelung enthält, gilt im
              Zweifel § 621 BGB für Dauerschuldverhältnisse.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Schritt 2: Die Kündigung rechtssicher formulieren
            </h2>
            <p>
              Die Kündigung der Hausverwaltung muss schriftlich erfolgen — per
              Brief, idealerweise per Einschreiben mit Rückschein. Eine E-Mail
              reicht in den meisten Fällen nicht aus, wenn der Vertrag Schriftform
              verlangt.
            </p>
            <p>Was gehört in die Kündigung?</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Vollständige Bezeichnung der Vertragsparteien</li>
              <li>Adresse der verwalteten Immobilie(n)</li>
              <li>Explizite Erklärung der Kündigung zum nächstmöglichen Termin</li>
              <li>Datum und Unterschrift</li>
            </ul>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Schritt 3: Neue Hausverwaltung in Hamburg auswählen
            </h2>
            <p>
              Nutzen Sie die Zeit zwischen Kündigung und Vertragsende aktiv.
              Worauf sollten Sie beim Vergleich neuer Verwaltungen achten?
            </p>
            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              Transparenz bei Kosten und Leistungen
            </h3>
            <p>
              Seriöse Hausverwaltungen legen offen, was im Grundhonorar enthalten
              ist. Seien Sie vorsichtig bei besonders niedrigen Angeboten — diese
              sind häufig die Basis für eine lange Liste kostenpflichtiger
              Sonderleistungen.
            </p>
            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              Erreichbarkeit und Reaktionszeiten
            </h3>
            <p>
              Fragen Sie konkret: Wie lange dauert es, bis Mieteranfragen
              beantwortet werden? Gibt es ein Ticketsystem oder ein Mieterportal?
              Wie werden Notfälle gehandhabt?
            </p>
            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              Digitale Prozesse
            </h3>
            <p>
              Moderne Hausverwaltungen arbeiten mit digitalen Eigentümerportalen,
              elektronischen Dokumenten und nachvollziehbarer Kommunikation. Das
              bedeutet: jederzeit Einblick in Ihren Bestand — ohne Wartezeit.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Schritt 4: Die Übergabe sauber organisieren
            </h2>
            <p>
              Sobald der neue Vertrag unterzeichnet ist, beginnt die
              Übergabephase. Sie haben das Recht, folgende Unterlagen von der
              alten Verwaltung zurückzufordern:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Alle Mietverträge und Mieterakten</li>
              <li>Kautionskonten und -belege</li>
              <li>Betriebskostenabrechnungen der letzten Jahre</li>
              <li>Wartungsverträge und Dienstleisterverzeichnisse</li>
              <li>Schlüssellisten und Korrespondenz mit Behörden</li>
            </ul>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Schritt 5: Mieter informieren
            </h2>
            <p>
              Nach dem Wechsel müssen Ihre Mieter schriftlich über die neue
              Hausverwaltung informiert werden. Teilen Sie mit: Name und Anschrift
              der neuen Verwaltung, neue Kontaktdaten und neue Bankverbindung für
              die Mietzahlung.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Häufige Fehler beim Hausverwaltungswechsel
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Kündigung vergessen oder zu spät abgeschickt</strong> —
                Der Vertrag verlängert sich automatisch.
              </li>
              <li>
                <strong>Kautionskonten nicht rechtzeitig übertragen</strong> —
                Das kann zu Liquiditätsproblemen führen.
              </li>
              <li>
                <strong>Keine Übergabecheckliste vereinbart</strong> — Ohne
                Protokoll ist schwer nachzuweisen, was übergeben wurde.
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Fazit: Ein Wechsel lohnt sich — wenn Sie es richtig angehen
            </h2>
            <p>
              Ein Hausverwaltungswechsel in Hamburg ist kein Drama. Mit der
              richtigen Vorbereitung und einem klaren Zeitplan ist er in wenigen
              Wochen abgeschlossen. Und wenn die neue Verwaltung professionell
              arbeitet, spüren Sie den Unterschied sofort.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-12 bg-teal/10 border border-teal/20 rounded-xl p-8">
            <h3 className="text-xl font-bold text-navy mb-2 font-playfair">
              Bereit für den Wechsel?
            </h3>
            <p className="text-gray-600 mb-4">
              einfach verwaltet. analysiert Ihr Portfolio kostenlos und begleitet
              Sie durch den gesamten Wechselprozess — ohne Verpflichtung.
            </p>
            <Link
              href="/anfrage"
              className="inline-block bg-teal text-white font-semibold px-6 py-3 rounded-lg hover:bg-teal/90 transition-colors"
            >
              Jetzt kostenlose Portfolioanalyse anfordern
            </Link>
          </div>

          {/* Back */}
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
