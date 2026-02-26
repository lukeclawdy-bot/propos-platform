import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Rauchmelder Pflicht Hamburg 2026: Welche Wohnungen sind betroffen? | einfach verwaltet.",
  description:
    "Rauchmelderpflicht in Hamburg: Welche Wohnungen brauchen Rauchmelder? Wer ist verantwortlich? Aktuelle Regelungen 2026 mit Bußgeldern.",
  keywords:
    "Rauchmelder Pflicht Hamburg, Rauchmelder Hamburg 2026, Rauchmelderpflicht Wohnung, Rauchmelder Bußgeld Hamburg, Feuermelder Pflicht",
  openGraph: {
    title: "Rauchmelder Pflicht Hamburg 2026: Welche Wohnungen sind betroffen?",
    description:
      "Rauchmelderpflicht in Hamburg erklärt — Pflichten, Bußgelder und praktische Tipps für Vermieter.",
    url: "https://einfach-verwaltet.de/blog/rauchmelder-pflicht-hamburg",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Rauchmelder Pflicht Hamburg 2026: Welche Wohnungen sind betroffen?",
  description:
    "Alle Informationen zur Rauchmelderpflicht in Hamburg: Betroffene Wohnungen, Verantwortlichkeiten, Bußgelder und Installationshinweise.",
  author: { "@type": "Organization", name: "einfach verwaltet." },
  publisher: {
    "@type": "Organization",
    name: "einfach verwaltet.",
    logo: { "@type": "ImageObject", url: "https://einfach-verwaltet.de/logo.png" },
  },
  datePublished: "2026-02-26",
  inLanguage: "de",
  url: "https://einfach-verwaltet.de/blog/rauchmelder-pflicht-hamburg",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "In welchen Räumen muss ein Rauchmelder in Hamburg installiert werden?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nach der Hamburgischen Bauordnung (HBauO) müssen in Wohnungen Rauchmelder in allen Schlaf- und Kinderzimmern sowie in Fluren installiert werden, die als Rettungswege dienen. Küchen und Bäder sind von der Pflicht ausgenommen, da hier Fehlalarme durch Dampf oder Kochdünste häufiger auftreten würden.",
      },
    },
    {
      "@type": "Question",
      name: "Wer ist für die Installation und Wartung der Rauchmelder verantwortlich?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Der Eigentümer ist für die Installation der Rauchmelder verantwortlich. Bei Mietwohnungen obliegt die Wartung — insbesondere der regelmäßige Batteriewechsel oder Funktionstest — dem Mieter. Der Vermieter muss jedoch sicherstellen, dass zum Mietbeginn funktionierende Rauchmelder installiert sind und diese regelmäßig auf Funktionsfähigkeit überprüft werden.",
      },
    },
    {
      "@type": "Question",
      name: "Wie hoch ist das Bußgeld bei fehlenden Rauchmeldern in Hamburg?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die Bußgelder für fehlende oder nicht funktionsfähige Rauchmelder in Hamburg können bis zu €5.000 pro Wohnung betragen. Bei wiederholten Verstößen oder besonders schwerwiegenden Verstößen sind auch höhere Geldbußen möglich. Zusätzlich kann im Schadensfall eine Haftpflicht des Vermieters oder Mieters wegen fahrlässiger Brandverursachung entstehen.",
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
            <span className="text-gray-700">Rauchmelder Pflicht Hamburg</span>
          </nav>

          <header className="mb-10">
            <p className="text-teal text-sm font-semibold uppercase tracking-wider mb-3">
              Ratgeber · 7 min Lesezeit
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-navy font-playfair mb-4 leading-tight">
              Rauchmelder Pflicht Hamburg 2026: Welche Wohnungen sind betroffen?
            </h1>
            <p className="text-gray-500 text-sm">Februar 2026 · einfach verwaltet.</p>
          </header>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Die rechtliche Grundlage in Hamburg
            </h2>
            <p>
              Die Rauchmelderpflicht in Hamburg ist seit dem 1. Januar 2016 
              durch eine Änderung der Hamburgischen Bauordnung (HBauO) für 
              bestehende Wohnungen eingeführt worden. Für Neubauten gilt die 
              Pflicht bereits seit 2005. Die Vorschrift zielt darauf ab, 
              durch frühzeitige Brandwarnung die Zahl der Brandtoten zu 
              reduzieren. [Quelle: § 50 HBauO]
            </p>
            <p className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
              <strong>Wichtig:</strong> Jährlich sterben in Deutschland über 
              400 Menschen bei Wohnungsbränden. Rauchmelder erhöhen die 
              Überlebenschance um das Vierfache. [Quelle: Deutsche Feuerwehr]
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Welche Wohnungen und Räume sind betroffen?
            </h2>
            <p>
              Die Rauchmelderpflicht in Hamburg gilt für:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Alle Wohnungen in Wohngebäuden</li>
              <li>Altbauten und Neubauten gleichermaßen</li>
              <li>Eigentumswohnungen und Mietwohnungen</li>
              <li>Studentenwohnheime und Seniorenresidenzen</li>
            </ul>
            <p>
              Innerhalb der Wohnung müssen Rauchmelder installiert werden in:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Allen Schlafzimmern</li>
              <li>Kinderzimmern</li>
              <li>Fluren, die als Rettungswege dienen</li>
            </ul>
            <p>
              Ausgenommen von der Pflicht sind:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Küchen (Risiko von Fehlalarmen durch Kochdünste)</li>
              <li>Bäder (Dampf kann Alarm auslösen)</li>
              <li>Unbeheizte Kellerräume ohne Aufenthaltsfunktion</li>
            </ul>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Wer ist verantwortlich für Installation und Wartung?
            </h2>
            <p>
              Die Verantwortlichkeiten sind klar geregelt:
            </p>
            <div className="bg-navy/5 border border-navy/10 rounded-xl p-6">
              <h3 className="font-bold text-navy mb-3">Zuständigkeiten im Überblick</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span><strong>Installation:</strong></span>
                  <span>Eigentümer/Vermieter</span>
                </div>
                <div className="flex justify-between">
                  <span><strong>Wartung/Test:</strong></span>
                  <span>Mieter</span>
                </div>
                <div className="flex justify-between">
                  <span><strong>Batteriewechsel:</strong></span>
                  <span>Mieter</span>
                </div>
                <div className="flex justify-between">
                  <span><strong>Defekte Geräte:</strong></span>
                  <span>Vermieter ersetzt</span>
                </div>
              </div>
            </div>
            <p>
              Der Vermieter muss zum Mietbeginn funktionsfähige Rauchmelder 
              bereitstellen. In der Betriebsanleitung sollte der Mieter über 
              seine Wartungspflichten informiert werden.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Technische Anforderungen
            </h2>
            <p>
              Nicht jeder Rauchmelder ist gleich. Für den Einsatz in 
              Hamburg müssen die Geräte folgende Anforderungen erfüllen:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Norm:</strong> DIN EN 14604 mit CE-Kennzeichnung
              </li>
              <li>
                <strong>Batterie:</strong> Mindestens 1 Jahr Lebensdauer, 
                besser 10 Jahre (Lithium)
              </li>
              <li>
                <strong>Signalstärke:</strong> Mindestens 85 dB(A) im 3-Meter-Abstand
              </li>
              <li>
                <strong>Funktionsanzeige:</strong> Sicht- oder hörbare 
                Kontrollmöglichkeit
              </li>
              <li>
                <strong>Stummschaltung:</strong> Test-Stop-Taste für Fehlalarme
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Richtige Installation: Tipps und Positionierung
            </h2>
            <p>
              Die korrekte Positionierung ist entscheidend für die Funktion:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Decke:</strong> Immer in der Mitte der Decke montieren, 
                nicht an der Wand
              </li>
              <li>
                <strong>Abstand:</strong> Mindestens 50 cm von Ecken und Wänden
              </li>
              <li>
                <strong>Luftzug:</strong> Nicht über Türen oder Fenstern anbringen
              </li>
              <li>
                <strong>Temperatur:</strong> Nicht in Räumen unter 5°C oder 
                über 45°C installieren
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Bußgelder bei Nichtbeachtung
            </h2>
            <p>
              Die Einhaltung der Rauchmelderpflicht wird in Hamburg 
              regelmäßig durch die Bauaufsichtsbehörden überprüft. Bei 
              Verstößen drohen empfindliche Bußgelder:
            </p>
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h3 className="font-bold text-red-800 mb-3">Bußgelder bei Verstößen</h3>
              <ul className="list-disc pl-6 space-y-1 text-sm text-red-900">
                <li>Fehlende Rauchmelder: bis zu €5.000 pro Wohnung</li>
                <li>Nicht funktionsfähige Geräte: bis zu €2.500</li>
                <li>Wiederholte Verstöße: Erhöhung der Bußgelder möglich</li>
              </ul>
            </div>
            <p>
              Zusätzlich zur Geldstrage kann im Brandfall eine Haftung wegen 
              fahrlässiger Körperverletzung oder Tötung entstehen, wenn der 
              Mangel an Rauchmeldern zu einem schwereren Schaden beigetragen 
              hat.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Verbindung mit anderen Pflichten
            </h2>
            <p>
              Die Rauchmelderpflicht steht in Verbindung mit weiteren 
              sicherheitsrelevanten Vorschriften:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Brandschutztüren:</strong> Müssen in Flucht- und 
                Rettungswegen funktionsfähig sein
              </li>
              <li>
                <strong>Fluchtwege:</strong> Müssen jederzeit frei zugänglich 
                gehalten werden
              </li>
              <li>
                <strong>Feuerlöscher:</strong> Empfohlen in Wohnungen, 
                Pflicht in Gemeinschaftsflächen
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              FAQ: Rauchmelder in Hamburg
            </h2>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-navy mb-2">
                  In welchen Räumen muss ein Rauchmelder installiert werden?
                </h3>
                <p className="text-sm">
                  In allen Schlaf- und Kinderzimmern sowie in Fluren, 
                  die als Rettungswege dienen.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-navy mb-2">
                  Wer ist für Installation und Wartung verantwortlich?
                </h3>
                <p className="text-sm">
                  Der Eigentümer installiert, der Mieter wartet und testet 
                  regelmäßig.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-navy mb-2">
                  Wie hoch ist das Bußgeld?
                </h3>
                <p className="text-sm">
                  Bis zu €5.000 pro Wohnung bei fehlenden Rauchmeldern.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Fazit: Sicherheit geht vor
            </h2>
            <p>
              Die Rauchmelderpflicht ist keine lästige Bürokratie, sondern 
              eine Lebensversicherung. Die Kosten für die Geräte sind 
              überschaubar, die Konsequenzen bei einem Brand ohne Warnung 
              können verheerend sein. Jeder Vermieter sollte sicherstellen, 
              dass seine Wohnungen vollständig ausgestattet sind — und die 
              Mieter regelmäßig über ihre Wartungspflichten informieren.
            </p>
          </div>

          <div className="mt-12 bg-teal/10 border border-teal/20 rounded-xl p-8">
            <h3 className="text-xl font-bold text-navy mb-2 font-playfair">
              Sicherheitsmanagement inklusive
            </h3>
            <p className="text-gray-600 mb-4">
              einfach verwaltet. übernimmt die Beschaffung, Installation 
              und Wartungskontrolle von Rauchmeldern — inklusive 
              Dokumentation für den Ernstfall.
            </p>
            <Link
              href="/anfrage"
              className="inline-block bg-teal text-white font-semibold px-6 py-3 rounded-lg hover:bg-teal/90 transition-colors"
            >
              Sicherheitskonzept anfragen
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
