import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Energieausweis Kosten 2026: Was kostet ein Energieausweis in Deutschland? | einfach verwaltet.",
  description:
    "Energieausweis Kosten 2026: Bedarfsausweis €300-500, Verbrauchsausweis €100-200. §16a GEG, Bußgeld bis €10.000. Wer braucht welchen Ausweis?",
  keywords:
    "Energieausweis Kosten, Energieausweis 2026, Bedarfsausweis Preis, Verbrauchsausweis Kosten, §16a GEG, Energieausweis Hamburg",
  openGraph: {
    title: "Energieausweis Kosten 2026: Was kostet ein Energieausweis in Deutschland?",
    description:
      "Kosten, Anbieter in Hamburg, GEG-Compliance und Bußgelder — der komplette Leitfaden für Eigentümer.",
    url: "https://einfach-verwaltet.de/blog/energieausweis-kosten-2026",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Energieausweis Kosten 2026: Was kostet ein Energieausweis in Deutschland?",
  description:
    "Überblick über Energieausweis-Kosten 2026: Bedarfsausweis vs. Verbrauchsausweis, GEG-Compliance und Bußgelder.",
  author: { "@type": "Organization", name: "einfach verwaltet." },
  publisher: {
    "@type": "Organization",
    name: "einfach verwaltet.",
    logo: { "@type": "ImageObject", url: "https://einfach-verwaltet.de/logo.png" },
  },
  datePublished: "2026-02-26",
  inLanguage: "de",
  url: "https://einfach-verwaltet.de/blog/energieausweis-kosten-2026",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was kostet ein Energieausweis 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ein Bedarfsausweis kostet €300–500, ein Verbrauchsausweis €100–200. Die Kosten hängen von der Gebäudegröße, dem Alter und dem Aufwand der Datenerhebung ab. Bei Mehrfamilienhäusern werden die Kosten oft auf die Einheiten umgelegt.",
      },
    },
    {
      "@type": "Question",
      name: "Was ist der Unterschied zwischen Bedarfsausweis und Verbrauchsausweis?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Der Bedarfsausweis berechnet den theoretischen Energiebedarf auf Basis der Gebäudehülle und Heizungsanlage — er ist genauer und gilt 10 Jahre. Der Verbrauchsausweis basiert auf den tatsächlichen Verbrauchsdaten der letzten 3 Jahre — er ist einfacher zu erstellen, aber nur für bestehende Gebäude und gilt maximal 10 Jahre.",
      },
    },
    {
      "@type": "Question",
      name: "Wer benötigt einen Energieausweis nach §16a GEG?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ein Energieausweis ist Pflicht beim Verkauf, bei der Vermietung oder bei grundlegenden Modernisierungen eines Gebäudes. Ab dem 1. Juli 2025 müssen alle zum Verkauf oder zur Vermietung stehenden Gebäude einen gültigen Energieausweis haben — unabhängig vom Baujahr.",
      },
    },
    {
      "@type": "Question",
      name: "Wie hoch ist das Bußgeld bei fehlendem Energieausweis?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Bei Verstoß gegen §16a GEG droht ein Bußgeld von bis zu €10.000. Das gilt sowohl für Verkäufer, die keinen Energieausweis vorlegen, als für Vermieter, die bei der Vermietung keinen gültigen Ausweis bereitstellen.",
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
            <span className="text-gray-700">Energieausweis Kosten 2026</span>
          </nav>

          <header className="mb-10">
            <p className="text-teal text-sm font-semibold uppercase tracking-wider mb-3">
              Ratgeber · 8 min Lesezeit
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-navy font-playfair mb-4 leading-tight">
              Energieausweis Kosten 2026: Was kostet ein Energieausweis in Deutschland?
            </h1>
            <p className="text-gray-500 text-sm">Februar 2026 · einfach verwaltet.</p>
          </header>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Energieausweis-Pflicht: Was Eigentümer wissen müssen
            </h2>
            <p>
              Seit dem 1. Juli 2025 ist die Energieausweis-Pflicht verschärft worden. 
              Wer ein Gebäude verkauft oder vermietet, muss einen gültigen Energieausweis 
              vorlegen — unabhängig vom Baujahr. Doch welche Kosten kommen auf Eigentümer 
              zu? Und welcher Ausweis ist der richtige?
            </p>
            <p>
              Die Kosten für einen Energieausweis sind überschaubar, aber das Bußgeld 
              bei Nichtbeachtung kann empfindlich sein: Bis zu €10.000 drohen bei 
              Verstößen gegen §16a des Gebäudeenergiegesetzes (GEG).
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Energieausweis Kosten 2026: Der Überblick
            </h2>
            <p>
              Die Kosten für einen Energieausweis hängen vom Typ des Ausweises, 
              der Gebäudegröße und dem Aufwand der Datenerhebung ab. Hier die 
              aktuellen Preisrahmen für 2026:
            </p>
            <div className="bg-navy/5 border border-navy/10 rounded-xl p-6">
              <h3 className="font-bold text-navy mb-3">Preisrahmen Energieausweis 2026</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Bedarfsausweis (Ein- bis Zweifamilienhaus)</span>
                  <span className="font-semibold">€300–450</span>
                </div>
                <div className="flex justify-between">
                  <span>Bedarfsausweis (Mehrfamilienhaus)</span>
                  <span className="font-semibold">€400–500</span>
                </div>
                <div className="flex justify-between">
                  <span>Verbrauchsausweis (Ein- bis Zweifamilienhaus)</span>
                  <span className="font-semibold">€100–150</span>
                </div>
                <div className="flex justify-between">
                  <span>Verbrauchsausweis (Mehrfamilienhaus)</span>
                  <span className="font-semibold">€150–200</span>
                </div>
                <div className="flex justify-between">
                  <span>Nachträgliche Änderung/Neuausstellung</span>
                  <span className="font-semibold">€50–150</span>
                </div>
              </div>
            </div>
            <p>
              Bei Mehrfamilienhäusern werden die Kosten in der Regel auf die 
              einzelnen Wohneinheiten umgelegt und über die Betriebskosten 
              abgerechnet. Der Eigentümer muss die Kosten somit nicht allein tragen.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Bedarfsausweis vs. Verbrauchsausweis: Wer braucht was?
            </h2>
            <p>
              Nicht jeder Energieausweis ist gleich. Je nach Gebäudetyp und 
              Situation kommt der eine oder andere Typ infrage:
            </p>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              Der Bedarfsausweis
            </h3>
            <p>
              Der Bedarfsausweis berechnet den theoretischen Energiebedarf des 
              Gebäudes auf Basis seiner physikalischen Eigenschaften: Wände, Dämmung, 
              Fenster, Heizungsanlage. Er ist genauer und aussagekräftiger als der 
              Verbrauchsausweis.
            </p>
            <p>
              <strong>Geeignet für:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Neubauten (kein Verbrauch vorhanden)</li>
              <li>Gebäude mit weniger als 3 Jahren Nutzung</li>
              <li>Bestandsgebäude bei Verkauf oder Vermietung</li>
              <li>Alle Gebäude, bei denen eine fundierte energetische Bewertung gewünscht ist</li>
            </ul>
            <p>
              <strong>Gültigkeit:</strong> 10 Jahre ab Ausstellung
            </p>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              Der Verbrauchsausweis
            </h3>
            <p>
              Der Verbrauchsausweis basiert auf den tatsächlichen Verbrauchsdaten 
              der letzten 3 Jahre. Er ist einfacher und günstiger zu erstellen, 
              sagt aber weniger über die energetische Qualität des Gebäudes aus — 
              denn der Verbrauch hängt stark vom Nutzerverhalten ab.
            </p>
            <p>
              <strong>Geeignet für:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Bestandsgebäude mit mindestens 3 Jahren Nutzung</li>
              <li>Vermietete Objekte mit kontinuierlicher Nutzung</li>
              <li>Schnelle, kostengünstige Lösung bei geringem Budget</li>
            </ul>
            <p>
              <strong>Gültigkeit:</strong> Maximal 10 Jahre, bei signifikanten 
              Verbrauchsänderungen früher ungültig
            </p>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 my-6">
              <h3 className="font-bold text-amber-800 mb-2">Entscheidungshilfe</h3>
              <p className="text-sm text-amber-900">
                Für Neubauten und Gebäude unter 3 Jahren Nutzung ist der Bedarfsausweis 
                Pflicht. Bei Bestandsgebäuden können Eigentümer wählen — der 
                Bedarfsausweis ist aber bei Verkauf meist die bessere Wahl, da er 
                das energetische Potenzial des Gebäudes besser darstellt.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              §16a GEG: Die rechtlichen Grundlagen
            </h2>
            <p>
              Die Pflicht zum Energieausweis ist im Gebäudeenergiegesetz (GEG) 
              verankert. §16a GEG regelt die Anforderungen an den Ausweis:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Verkauf:</strong> Beim Verkauf eines Gebäudes muss der 
                Energieausweis potenziellen Käufern vorgelegt werden.
              </li>
              <li>
                <strong>Vermietung:</strong> Bei der Vermietung muss der Ausweis 
                Interessenten zur Verfügung gestellt werden.
              </li>
              <li>
                <strong>Modernisierung:</strong> Bei grundlegenden energetischen 
                Modernisierungen kann ein neuer Ausweis erforderlich werden.
              </li>
            </ul>
            <p>
              Der Ausweis muss von einem qualifizierten Energieberater erstellt 
              werden, der im Bundesamt für Bauwesen und Raumordnung (BBR) gelistet 
              ist. Nur so ist der Ausweis rechtsgültig.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Bußgeld bei Nichtbeachtung: Bis zu €10.000
            </h2>
            <p>
              Wer die Energieausweis-Pflicht missachtet, riskiert empfindliche 
              Bußgelder. Die Höhe richtet sich nach Schwere und Dauer des Verstoßes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Kein Energieausweis beim Verkauf/Vermietung:</strong> 
                Bis zu €10.000
              </li>
              <li>
                <strong>Falscher oder veralteter Ausweis:</strong> Bis zu €5.000
              </li>
              <li>
                <strong>Nicht-Vorlage auf Anfrage:</strong> Bis zu €1.000
              </li>
            </ul>
            <p>
              Besonders riskant: Wer ein Gebäude ohne Energieausweis bewirbt und 
              Interessenten den Ausweis nicht vorlegt, begeht einen Ordnungswidrigkeit 
              — mit entsprechenden Konsequenzen.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Energieausweis in Hamburg: Lokale Anbieter
            </h2>
            <p>
              In Hamburg gibt es zahlreiche zertifizierte Energieberater, die 
              Energieausweise erstellen. Bei der Wahl sollten Eigentümer auf 
              folgende Kriterien achten:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>BBR-Zertifizierung:</strong> Der Berater muss im BBR-Verzeichnis 
                gelistet sein.
              </li>
              <li>
                <strong>Lokale Erfahrung:</strong> Ein Berater, der Hamburger 
                Gebäude kennt, kann besser beurteilen, welche energetischen 
                Maßnahmen sinnvoll sind.
              </li>
              <li>
                <strong>Transparente Preise:</strong> Vorab ein verbindliches 
                Angebot einholen — ohne versteckte Kosten.
              </li>
              <li>
                <strong>Termintreue:</strong> Der Ausweis sollte innerhalb von 
                1–2 Wochen nach Auftragserteilung vorliegen.
              </li>
            </ul>
            <p>
              Viele Hausverwaltungen in Hamburg arbeiten mit festen Energieberatern 
              zusammen und können Eigentümern bei der Beschaffung des Ausweises 
              unterstützen — inklusive Terminkoordination und Dokumentenbeschaffung.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Checkliste: So beschaffen Sie Ihren Energieausweis
            </h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Gebäudedaten sammeln:</strong> Baujahr, Wohnfläche, 
                Heizungsart, Dämmung, Fenster — je mehr Daten, desto genauer der Ausweis.
              </li>
              <li>
                <strong>Verbrauchsdaten prüfen:</strong> Für den Verbrauchsausweis 
                die letzten 3 Jahre Strom- und Heizkostenabrechnungen bereitlegen.
              </li>
              <li>
                <strong>Energieberater auswählen:</strong> Im BBR-Verzeichnis 
                nach zertifizierten Beratern in Hamburg suchen.
              </li>
              <li>
                <strong>Angebot einholen:</strong> Mehrere Angebote vergleichen, 
                auf Pauschalpreise achten.
              </li>
              <li>
                <strong>Termin vereinbaren:</strong> Die meisten Berater erstellen 
                den Ausweis auch ohne Vor-Ort-Termin, wenn alle Unterlagen vorliegen.
              </li>
              <li>
                <strong>Ausweis prüfen:</strong> Bei Erhalt auf Vollständigkeit 
                und Korrektheit überprüfen.
              </li>
            </ol>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              FAQ: Energieausweis Kosten und Pflichten
            </h2>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-navy mb-2">
                  Was kostet ein Energieausweis 2026?
                </h3>
                <p className="text-sm">
                  Ein Bedarfsausweis kostet €300–500, ein Verbrauchsausweis €100–200. 
                  Die Kosten hängen von der Gebäudegröße und dem Aufwand ab.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-navy mb-2">
                  Was ist der Unterschied zwischen Bedarfs- und Verbrauchsausweis?
                </h3>
                <p className="text-sm">
                  Der Bedarfsausweis berechnet den theoretischen Energiebedarf 
                  (genauer, 10 Jahre gültig). Der Verbrauchsausweis basiert auf 
                  tatsächlichen Verbrauchsdaten (einfacher, günstiger).
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-navy mb-2">
                  Wer benötigt einen Energieausweis?
                </h3>
                <p className="text-sm">
                  Jeder Eigentümer, der ein Gebäude verkauft oder vermietet. 
                  Seit 1. Juli 2025 gilt die Pflicht für alle Gebäude unabhängig 
                  vom Baujahr.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-navy mb-2">
                  Wie hoch ist das Bußgeld bei fehlendem Energieausweis?
                </h3>
                <p className="text-sm">
                  Bis zu €10.000 bei Verstößen gegen §16a GEG. Das gilt für 
                  Verkäufer und Vermieter gleichermaßen.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Fazit: Energieausweis ist Pflicht, aber bezahlbar
            </h2>
            <p>
              Die Kosten für einen Energieausweis sind überschaubar — das 
              Bußgeld bei Nichtbeachtung nicht. Wer ein Gebäude verkauft oder 
              vermietet, sollte den Energieausweis frühzeitig beschaffen und 
              dabei auf qualifizierte, im BBR gelistete Energieberater setzen. 
              Die Investition von €100–500 schützt vor Bußgeldern bis €10.000 
              und signalisiert professionelles Immobilienmanagement.
            </p>
          </div>

          <div className="mt-12 bg-teal/10 border border-teal/20 rounded-xl p-8">
            <h3 className="text-xl font-bold text-navy mb-2 font-playfair">
              Lassen Sie Ihre Immobilie von einfach verwaltet. professionell verwalten
            </h3>
            <p className="text-gray-600 mb-4">
              Wir unterstützen Eigentümer bei der Beschaffung von Energieausweisen, 
              koordinieren Energieberater und stellen die GEG-Compliance sicher. 
              Lassen Sie sich unverbindlich beraten.
            </p>
            <Link
              href="/anfrage"
              className="inline-block bg-teal text-white font-semibold px-6 py-3 rounded-lg hover:bg-teal/90 transition-colors"
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
