import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Hausverwaltung Frankfurt: Kosten und Anbieter im Vergleich 2026 | einfach verwaltet.",
  description:
    "Hausverwaltung Frankfurt 2026: Aktuelle Kosten, Anbietervergleich und worauf Eigentümer bei der Wahl des richtigen Hausverwalters in Frankfurt am Main achten müssen.",
  keywords:
    "Hausverwaltung Frankfurt, Hausverwaltung Frankfurt Kosten, Mietverwaltung Frankfurt, Hausverwalter Frankfurt 2026",
  openGraph: {
    title: "Hausverwaltung Frankfurt: Kosten und Anbieter im Vergleich 2026",
    description:
      "Marktpreise, Leistungsvergleich und Tipps zur Auswahl des richtigen Hausverwalters in Frankfurt am Main.",
    url: "https://einfach-verwaltet.de/blog/hausverwaltung-frankfurt",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Hausverwaltung Frankfurt: Kosten und Anbieter im Vergleich 2026",
  description:
    "Hausverwaltung Frankfurt 2026: Aktuelle Kosten, Anbietervergleich und Tipps zur Auswahl des richtigen Hausverwalters.",
  author: { "@type": "Organization", name: "einfach verwaltet." },
  publisher: {
    "@type": "Organization",
    name: "einfach verwaltet.",
    logo: { "@type": "ImageObject", url: "https://einfach-verwaltet.de/logo.png" },
  },
  datePublished: "2026-02-01",
  inLanguage: "de",
  url: "https://einfach-verwaltet.de/blog/hausverwaltung-frankfurt",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://einfach-verwaltet.de/blog/hausverwaltung-frankfurt",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was kostet eine Hausverwaltung in Frankfurt am Main?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In Frankfurt am Main liegen die Kosten für eine professionelle Mietverwaltung zwischen €25 und €38 pro Einheit und Monat. WEG-Verwaltung kostet in der Regel €24–36 pro Einheit/Monat. Die Preise hängen von der Anzahl der Einheiten, dem Objektzustand und dem Leistungsumfang ab.",
      },
    },
    {
      "@type": "Question",
      name: "Was muss ein guter Hausverwalter in Frankfurt leisten?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ein guter Hausverwalter in Frankfurt übernimmt die komplette Mietverwaltung: Mietinkasso, Betriebskostenabrechnung, Instandhaltungskoordination, Mieterkorrespondenz, Leerstandsmanagement und rechtliche Betreuung. Er muss eine §34c GewO-Gewerbeerlaubnis besitzen.",
      },
    },
    {
      "@type": "Question",
      name: "Wie wechsle ich die Hausverwaltung in Frankfurt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Kündigen Sie den bestehenden Verwaltervertrag schriftlich unter Einhaltung der Kündigungsfrist (meist 3 Monate). Wählen Sie rechtzeitig einen neuen Verwalter. Dieser übernimmt alle Unterlagen, Bankkonten und Mieterkorrespondenz. Der Wechsel dauert in der Regel 4–8 Wochen.",
      },
    },
    {
      "@type": "Question",
      name: "Welche Vorteile bietet eine digitale Hausverwaltung gegenüber traditionellen Anbietern in Frankfurt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Digitale Hausverwaltungen bieten schnellere Reaktionszeiten, transparente Echtzeit-Berichte, digitale Dokumentenarchive und oft günstigere Preise durch effizientere Prozesse. Eigentümer erhalten jederzeit Zugriff auf Abrechnungen und können Anfragen rund um die Uhr einreichen.",
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
            <span className="text-gray-700">Hausverwaltung Frankfurt</span>
          </nav>

          <header className="mb-10">
            <p className="text-teal text-sm font-semibold uppercase tracking-wider mb-3">
              Ratgeber · 8 min Lesezeit
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-navy font-playfair mb-4 leading-tight">
              Hausverwaltung Frankfurt: Kosten und Anbieter im Vergleich 2026
            </h1>
            <p className="text-gray-500 text-sm">Februar 2026 · einfach verwaltet.</p>
          </header>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">

            <p>
              Frankfurt am Main ist einer der dynamischsten Immobilienmärkte Deutschlands.
              Hohe Mietnachfrage, internationale Mieter, dichte Bebauung im Stadtgebiet —
              und eine Hausverwaltungsbranche, deren Preise und Qualität stark variieren.
              Wer als Eigentümer die richtige Verwaltung wählt, spart Zeit, Nerven und
              langfristig bares Geld.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Was kostet eine Hausverwaltung in Frankfurt 2026?
            </h2>
            <p>
              Die Kosten für eine professionelle Hausverwaltung in Frankfurt am Main bewegen
              sich 2026 je nach Leistungsumfang und Portfoliogröße zwischen{" "}
              <strong>€25 und €38 pro Einheit und Monat</strong>. Damit liegt Frankfurt
              leicht über dem bundesweiten Durchschnitt von €26,74 pro Einheit (Quelle:
              VDIV Branchenbarometer 2024) — bedingt durch die hohe Nachfrage und das
              gehobene Preisniveau der Stadt.
            </p>

            <div className="bg-navy/5 border border-navy/10 rounded-xl p-6 my-6">
              <h3 className="font-bold text-navy mb-3">Marktpreise Frankfurt 2026</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between border-b pb-2">
                  <span>1–5 Einheiten</span>
                  <span className="font-semibold">€32–38/Einheit/Monat</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>6–20 Einheiten</span>
                  <span className="font-semibold">€28–34/Einheit/Monat</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>21–50 Einheiten</span>
                  <span className="font-semibold">€25–30/Einheit/Monat</span>
                </div>
                <div className="flex justify-between">
                  <span>WEG-Verwaltung</span>
                  <span className="font-semibold">€24–36/Einheit/Monat</span>
                </div>
              </div>
            </div>

            <p>
              Wichtig: Der Grundpreis ist nicht alles. Viele Anbieter kalkulieren
              Zusatzleistungen separat — etwa Sondereigentumsverwaltung, Leerstandsbetreuung
              oder die Organisation von Handwerkeraufträgen. Fragen Sie immer nach einem
              vollständigen Leistungsverzeichnis, bevor Sie unterschreiben.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Was leistet eine gute Hausverwaltung in Frankfurt?
            </h2>
            <p>
              Eine vollständige Mietverwaltung in Frankfurt umfasst weit mehr als das
              bloße Einziehen der Miete. Professionelle Hausverwalter übernehmen:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Mietinkasso:</strong> Monatlicher Einzug der Nettokaltmiete,
                Mahnung bei Zahlungsverzug, Einleitung des Mahnverfahrens nach §286 BGB
              </li>
              <li>
                <strong>Betriebskostenabrechnung:</strong> Jährliche Abrechnung nach
                §2 BetrKV, fristgerecht bis spätestens 12 Monate nach Abrechnungsperiode
                (§556 Abs. 3 BGB)
              </li>
              <li>
                <strong>Instandhaltung:</strong> Koordination von Handwerkern, Einholung
                von Angeboten, Überwachung der Ausführung
              </li>
              <li>
                <strong>Mieterkorrespondenz:</strong> Bearbeitung aller Anfragen,
                Beschwerden und Reparaturmeldungen
              </li>
              <li>
                <strong>Rechtliche Betreuung:</strong> Mieterhöhungen nach §558 BGB,
                Modernisierungsankündigungen, Kündigungsverfahren
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Worauf sollten Eigentümer bei der Auswahl achten?
            </h2>

            <h3 className="text-xl font-bold text-navy font-playfair mt-6 mb-3">
              1. Gewerbeerlaubnis nach §34c GewO
            </h3>
            <p>
              Jeder gewerbliche Hausverwalter in Deutschland benötigt eine Erlaubnis nach
              §34c Abs. 1 Nr. 4 GewO. Fragen Sie explizit nach dieser Genehmigung — ein
              seriöser Anbieter weist diese unaufgefordert nach.
            </p>

            <h3 className="text-xl font-bold text-navy font-playfair mt-6 mb-3">
              2. Berufshaftpflichtversicherung
            </h3>
            <p>
              Eine Vermögensschadenshaftpflicht ist Pflicht. Die Mindestdeckungssumme
              beträgt laut §34c GewO €1,13 Mio. pro Schadenfall. Ohne diese Versicherung
              haften Eigentümer im Zweifel selbst.
            </p>

            <h3 className="text-xl font-bold text-navy font-playfair mt-6 mb-3">
              3. Transparenz bei Kosten und Abrechnung
            </h3>
            <p>
              Seriöse Verwaltungen legen die Verwaltungsgebühren offen und berechnen keine
              Versteckten Nebengebühren für Standardleistungen wie Mahnungen oder
              Handwerkeraufträge. Fordern Sie ein vollständiges Leistungsverzeichnis an.
            </p>

            <h3 className="text-xl font-bold text-navy font-playfair mt-6 mb-3">
              4. Erreichbarkeit und Reaktionszeiten
            </h3>
            <p>
              Ein zentrales Qualitätsmerkmal — und zugleich die häufigste Beschwerdeursache.
              Fragen Sie konkret: Wie lange dauert die Beantwortung von Mieteranfragen?
              Gibt es einen 24/7-Notfallkontakt? Wer ist Ihr persönlicher Ansprechpartner?
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Typische Fehler bei der Verwalterwahl in Frankfurt
            </h2>
            <p>
              Viele Eigentümer wählen den günstigsten Anbieter — und bereuen es später.
              Häufige Fehler:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Kein Leistungsverzeichnis angefordert:</strong> Was ist inklusive,
                was wird extra berechnet?
              </li>
              <li>
                <strong>Langfristige Vertragsbindung unterschätzt:</strong> Viele Verträge
                haben Laufzeiten von 2–3 Jahren mit Kündigungsfrist von 6 Monaten.
              </li>
              <li>
                <strong>Keine Referenzen eingeholt:</strong> Sprechen Sie mit aktuellen
                Kunden des Verwalters.
              </li>
              <li>
                <strong>§34c nicht geprüft:</strong> Spart manchmal €2–3/Einheit — kostet
                aber bei einem Schadensfall das Vielfache.
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Hausverwaltung in Frankfurt wechseln: So geht es
            </h2>
            <p>
              Der Wechsel des Hausverwalters ist rechtlich unkompliziert, erfordert aber
              Vorlaufzeit:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                Prüfen Sie den bestehenden Verwaltervertrag auf Kündigungsfristen
                (meist 3 Monate)
              </li>
              <li>
                Kündigen Sie schriftlich (Einschreiben empfohlen) unter Einhaltung der Frist
              </li>
              <li>Wählen Sie rechtzeitig einen neuen Verwalter</li>
              <li>
                Fordern Sie alle Unterlagen, Bankverbindungen und Mieterdaten vom alten
                Verwalter an
              </li>
              <li>
                Informieren Sie Mieter schriftlich über den neuen Ansprechpartner
              </li>
            </ol>
            <p>
              Ein professioneller neuer Verwalter begleitet diesen Prozess und übernimmt
              den Großteil der Übergabeorganisation.
            </p>

            <div className="bg-teal/10 border border-teal/20 rounded-xl p-6 my-8">
              <h3 className="font-bold text-navy mb-2">Fazit für Eigentümer in Frankfurt</h3>
              <p className="text-gray-700 text-sm">
                Der Frankfurter Markt bietet eine große Auswahl an Hausverwaltern —
                von lokalen Einzelbüros bis zu überregionalen Plattformanbietern.
                Entscheidend ist nicht der niedrigste Preis, sondern das beste
                Preis-Leistungs-Verhältnis: Transparente Kosten, klare Erreichbarkeit
                und nachgewiesene Kompetenz. Holen Sie mindestens drei Angebote ein
                und prüfen Sie die §34c-Genehmigung.
              </p>
            </div>

            {/* FAQ Section */}
            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-6">
              Häufige Fragen zur Hausverwaltung in Frankfurt
            </h2>

            <div className="space-y-6">
              <div className="border border-gray-200 rounded-xl p-5">
                <h3 className="font-bold text-navy mb-2">
                  Was kostet eine Hausverwaltung in Frankfurt am Main?
                </h3>
                <p className="text-gray-600 text-sm">
                  In Frankfurt am Main liegen die Kosten für eine professionelle
                  Mietverwaltung zwischen €25 und €38 pro Einheit und Monat. WEG-Verwaltung
                  kostet in der Regel €24–36 pro Einheit/Monat. Die Preise hängen von der
                  Anzahl der Einheiten, dem Objektzustand und dem Leistungsumfang ab.
                </p>
              </div>
              <div className="border border-gray-200 rounded-xl p-5">
                <h3 className="font-bold text-navy mb-2">
                  Was muss ein guter Hausverwalter in Frankfurt leisten?
                </h3>
                <p className="text-gray-600 text-sm">
                  Ein guter Hausverwalter übernimmt Mietinkasso, Betriebskostenabrechnung,
                  Instandhaltungskoordination, Mieterkorrespondenz, Leerstandsmanagement
                  und rechtliche Betreuung. Er muss eine §34c GewO-Gewerbeerlaubnis besitzen.
                </p>
              </div>
              <div className="border border-gray-200 rounded-xl p-5">
                <h3 className="font-bold text-navy mb-2">
                  Wie wechsle ich die Hausverwaltung in Frankfurt?
                </h3>
                <p className="text-gray-600 text-sm">
                  Kündigen Sie den bestehenden Verwaltervertrag schriftlich unter Einhaltung
                  der Kündigungsfrist (meist 3 Monate). Wählen Sie rechtzeitig einen neuen
                  Verwalter. Dieser übernimmt alle Unterlagen, Bankkonten und
                  Mieterkorrespondenz. Der Wechsel dauert in der Regel 4–8 Wochen.
                </p>
              </div>
              <div className="border border-gray-200 rounded-xl p-5">
                <h3 className="font-bold text-navy mb-2">
                  Welche Vorteile bietet eine digitale Hausverwaltung?
                </h3>
                <p className="text-gray-600 text-sm">
                  Digitale Hausverwaltungen bieten schnellere Reaktionszeiten, transparente
                  Echtzeit-Berichte, digitale Dokumentenarchive und oft günstigere Preise
                  durch effizientere Prozesse. Eigentümer erhalten jederzeit Zugriff auf
                  Abrechnungen und können Anfragen rund um die Uhr einreichen.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-navy text-white rounded-2xl p-8 mt-10 text-center">
              <h3 className="text-xl font-bold font-playfair mb-3">
                Professionelle Hausverwaltung — transparent und zuverlässig
              </h3>
              <p className="text-white/80 mb-6 text-sm">
                Erhalten Sie ein individuelles Angebot für Ihr Objekt — mit klaren
                Preisen und ohne versteckte Kosten.
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
