import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Energieausweis Pflicht Vermieter: §16a GEG, Kosten & Bußgelder | einfach verwaltet.",
  description:
    "Energieausweis-Pflicht für Vermieter: §16a GEG erklärt — Bedarfs- vs. Verbrauchsausweis, Kosten €80–500, wer zahlt, Bußgelder bis €10.000. Alles, was Vermieter wissen müssen.",
  keywords:
    "Energieausweis Pflicht Vermieter, Energieausweis §16a GEG, Bedarfsausweis Verbrauchsausweis, Energieausweis Kosten, Energieausweis Bußgeld",
  openGraph: {
    title: "Energieausweis Pflicht Vermieter: §16a GEG, Kosten & Bußgelder",
    description:
      "Was Vermieter zum Energieausweis wissen müssen: Pflichten, Arten, Kosten und Bußgelder bei Verstößen.",
    url: "https://einfach-verwaltet.de/blog/energieausweis-pflicht-vermieter",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "article",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Energieausweis Pflicht Vermieter: §16a GEG, Kosten & Bußgelder",
  description:
    "§16a GEG: Was Vermieter beim Energieausweis beachten müssen — Bedarfs- vs. Verbrauchsausweis, Kosten €80–500, Bußgelder bis €10.000.",
  author: { "@type": "Organization", name: "einfach verwaltet." },
  publisher: {
    "@type": "Organization",
    name: "einfach verwaltet.",
    logo: { "@type": "ImageObject", url: "https://einfach-verwaltet.de/logo.png" },
  },
  datePublished: "2026-02-27",
  inLanguage: "de",
  url: "https://einfach-verwaltet.de/blog/energieausweis-pflicht-vermieter",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Wann ist der Energieausweis für Vermieter Pflicht?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Gemäß §16a GEG (Gebäudeenergiegesetz) muss der Energieausweis bei Neuvermietung, Verkauf oder Neubau vorgelegt werden. Bei Inseraten in kommerziellen Medien müssen Energiekennwerte bereits in der Anzeige angegeben werden. Der Ausweis ist bei der Besichtigung unaufgefordert vorzulegen und bei Vertragsschluss zu übergeben.",
      },
    },
    {
      "@type": "Question",
      name: "Was ist der Unterschied zwischen Bedarfsausweis und Verbrauchsausweis?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Der Bedarfsausweis (technische Analyse, €150–500) berechnet den theoretischen Energiebedarf anhand der Gebäudesubstanz — unabhängig vom Nutzerverhalten. Der Verbrauchsausweis (€80–150) basiert auf dem tatsächlichen Energieverbrauch der letzten 3 Jahre. Für Gebäude mit weniger als 5 Wohneinheiten, Baujahr vor 1977, ohne spätere Sanierung auf Wärmeschutzverordnung 1977 ist der Bedarfsausweis Pflicht.",
      },
    },
    {
      "@type": "Question",
      name: "Wie hoch ist das Bußgeld bei fehlendem Energieausweis?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wer keinen Energieausweis vorlegt oder Pflichtangaben in Inseraten weglässt, begeht eine Ordnungswidrigkeit nach §108 GEG. Das Bußgeld beträgt bis zu €10.000 pro Verstoß. Die zuständigen Behörden (Baubehörden der Länder) können stichprobenartig kontrollieren.",
      },
    },
    {
      "@type": "Question",
      name: "Wer zahlt den Energieausweis — Vermieter oder Mieter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die Kosten für den Energieausweis trägt grundsätzlich der Eigentümer / Vermieter. Die Kosten können nicht als Betriebskosten auf den Mieter umgelegt werden (BGH, §556 BGB). Lediglich im Kontext von Modernisierungsmaßnahmen können mittelbar Kosten über §559 BGB teilweise weitergegeben werden.",
      },
    },
  ],
};

export default function EnergieausweisPost() {
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
            <span className="text-gray-700">Energieausweis Pflicht Vermieter</span>
          </nav>

          <header className="mb-10">
            <p className="text-teal text-sm font-semibold uppercase tracking-wider mb-3">
              Ratgeber · 8 min Lesezeit
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-navy font-playfair mb-4 leading-tight">
              Energieausweis Pflicht für Vermieter: §16a GEG, Kosten und Bußgelder
            </h1>
            <p className="text-gray-500 text-sm">Februar 2026 · einfach verwaltet.</p>
          </header>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Was ist der Energieausweis und warum ist er Pflicht?
            </h2>
            <p>
              Der Energieausweis ist ein amtliches Dokument, das die energetische Qualität eines Gebäudes beschreibt.
              Er zeigt Mietern und Käufern auf einen Blick, wie viel Energie ein Gebäude verbraucht — und welche
              Heizkosten sie ungefähr erwarten müssen. Grundlage ist das <strong>Gebäudeenergiegesetz (GEG)</strong>,
              das 2020 in Kraft trat und das frühere EnEV sowie das EEWärmeG abgelöst hat.
            </p>
            <p>
              Für Vermieter ist der Energieausweis keine Kür, sondern gesetzliche Pflicht. Wer dagegen verstößt,
              riskiert empfindliche Bußgelder.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              §16a GEG: Was Vermieter konkret schulden
            </h2>
            <p>
              §16a GEG regelt die Pflichten bei Vermietung, Verpachtung und Leasing:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>In Inseraten:</strong> Energiekennwerte (Energieeffizienzklasse, Endenergieverbrauch/-bedarf,
                Art des Energieträgers) müssen bereits in kommerziellen Anzeigen angegeben werden — in Print,
                online und auf Makler-Plattformen.
              </li>
              <li>
                <strong>Bei der Besichtigung:</strong> Der Energieausweis ist potenziellen Mietern unaufgefordert
                zur Ansicht vorzulegen. Es genügt nicht, ihn nur auf Nachfrage herauszugeben.
              </li>
              <li>
                <strong>Bei Vertragsschluss:</strong> Eine Kopie oder das Original des Energieausweises ist dem neuen
                Mieter auszuhändigen (§16 Abs. 2 GEG).
              </li>
            </ul>
            <p className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
              <strong>Praxishinweis:</strong> Der Energieausweis ist 10 Jahre gültig (§79 GEG). Wer noch einen
              Ausweis nach alter EnEV hat, sollte prüfen, ob dieser noch gültig ist — abgelaufene Ausweise
              müssen erneuert werden, bevor eine neue Vermietung erfolgt.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Bedarfsausweis vs. Verbrauchsausweis: Welcher ist Pflicht?
            </h2>
            <p>
              Es gibt zwei Arten des Energieausweises — und nicht jeder Eigentümer hat die freie Wahl:
            </p>

            <h3 className="text-xl font-bold text-navy mt-6 mb-3">Verbrauchsausweis</h3>
            <p>
              Basiert auf dem tatsächlichen Energieverbrauch der letzten drei Heizperioden.
              Kosten: <strong>€80–150</strong>. Vorteil: günstiger und schneller zu erstellen.
              Nachteil: Das Ergebnis hängt vom Verhalten der bisherigen Bewohner ab — ein sparsamer
              Mieter macht das Gebäude besser aussehen, als es tatsächlich ist.
            </p>

            <h3 className="text-xl font-bold text-navy mt-6 mb-3">Bedarfsausweis</h3>
            <p>
              Analysiert die Gebäudesubstanz: Wände, Dach, Fenster, Heizungsanlage. Das Ergebnis ist
              eine technisch berechnete Kennzahl, unabhängig vom Nutzerverhalten. Kosten: <strong>€150–500</strong>.
            </p>
            <p>
              <strong>Pflicht zum Bedarfsausweis</strong> besteht für Wohngebäude, die:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>weniger als 5 Wohneinheiten haben, <strong>und</strong></li>
              <li>vor dem 1. November 1977 gebaut wurden, <strong>und</strong></li>
              <li>nicht nachträglich auf den Wärmeschutzstandard der Wärmeschutzverordnung 1977 saniert wurden.</li>
            </ul>
            <p>
              Für alle anderen Gebäude (5+ Einheiten oder nach 1977 gebaut oder auf 1977-Standard saniert)
              ist der Verbrauchsausweis zulässig.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Was kostet ein Energieausweis? Kosten im Überblick
            </h2>
            <div className="bg-navy/5 border border-navy/10 rounded-xl p-6">
              <h3 className="font-bold text-navy mb-3">Kostenübersicht 2026</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Verbrauchsausweis (online, einfach)</span>
                  <span className="font-semibold">€80–120</span>
                </div>
                <div className="flex justify-between">
                  <span>Verbrauchsausweis (Energieberater vor Ort)</span>
                  <span className="font-semibold">€100–150</span>
                </div>
                <div className="flex justify-between">
                  <span>Bedarfsausweis (kleines Gebäude)</span>
                  <span className="font-semibold">€150–300</span>
                </div>
                <div className="flex justify-between">
                  <span>Bedarfsausweis (größeres Mehrfamilienhaus)</span>
                  <span className="font-semibold">€300–500</span>
                </div>
              </div>
            </div>
            <p>
              Die Kosten trägt der <strong>Eigentümer / Vermieter</strong>. Eine Umlage auf den Mieter als
              Betriebskosten ist nicht möglich (§2 BetrKV enthält keinen entsprechenden Posten).
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Anbieter: Wer stellt den Energieausweis aus?
            </h2>
            <p>
              Den Energieausweis dürfen nur qualifizierte Fachleute ausstellen, die die Anforderungen
              des §21 GEG erfüllen:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Energieberater</strong> (z.B. über die Energieeffizienz-Expertenliste der dena)</li>
              <li><strong>Architekten und Bauingenieure</strong> mit entsprechender Qualifikation</li>
              <li><strong>Online-Plattformen</strong> (z.B. Ista, Brunata, ImmoScout24 Energieausweis-Service)</li>
              <li><strong>Schornsteinfeger</strong> für bestimmte einfache Ausweise</li>
            </ul>
            <p>
              Für einfache Mehrfamilienhäuser mit Verbrauchsausweis sind Online-Anbieter meist die
              günstigste und schnellste Lösung — der Ausweis wird innerhalb weniger Werktage per E-Mail geliefert.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Bußgelder: Was bei Verstößen droht
            </h2>
            <p>
              §108 GEG stuft folgende Handlungen als Ordnungswidrigkeiten ein:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Kein Energieausweis bei Besichtigung vorgelegt</li>
              <li>Keine oder falsche Energiekennwerte im Inserat angegeben</li>
              <li>Kein Aushändigen des Ausweises bei Vertragsschluss</li>
              <li>Ausstellen eines Ausweises durch nicht qualifizierte Person</li>
            </ul>
            <p>
              Das <strong>Bußgeld beträgt bis zu €10.000</strong> pro Verstoß. Die Kontrolle obliegt den
              Baubehörden der Bundesländer. In der Praxis werden Stichproben bei Inseraten und anlassbezogene
              Kontrollen (z.B. nach Mieterbeschwerden) durchgeführt.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Energieausweis und Pflichtangaben im Inserat: Worauf achten?
            </h2>
            <p>
              Bei kommerziellen Inseraten (ImmoScout24, Immonet, Immowelt, Zeitungsanzeigen) müssen folgende
              Pflichtangaben gemäß §16a GEG enthalten sein:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Art des Energieausweises (Bedarfs- oder Verbrauchsausweis)</li>
              <li>Endenergiebedarf oder -verbrauch in kWh/(m²·a)</li>
              <li>Wesentlicher Energieträger der Heizungsanlage</li>
              <li>Baujahr des Gebäudes</li>
              <li>Energieeffizienzklasse (A+ bis H)</li>
            </ul>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Fazit: Kein Vermietungsstart ohne gültigen Energieausweis
            </h2>
            <p>
              Der Energieausweis ist eine rechtliche Pflicht, keine bürokratische Formalie. Vermieter,
              die beim nächsten Mieterwechsel keinen gültigen Ausweis vorliegen haben, riskieren Bußgelder
              bis zu €10.000 — und einen schlechten Start mit dem neuen Mieter.
            </p>
            <p>
              Wer mehrere Einheiten verwaltet, sollte die Gültigkeitsdaten aller Energieausweise zentral
              tracken und rechtzeitig Erneuerungen beauftragen. Eine professionelle Hausverwaltung übernimmt
              diese Aufgabe zuverlässig.
            </p>

            {/* FAQ Section */}
            <h2 className="text-2xl font-bold text-navy font-playfair mt-12 mb-6">
              Häufige Fragen zum Energieausweis für Vermieter
            </h2>

            <div className="space-y-6">
              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-navy mb-2">Wann ist der Energieausweis für Vermieter Pflicht?</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Gemäß §16a GEG muss der Energieausweis bei Neuvermietung, Verkauf oder Neubau vorgelegt werden.
                  Bei Inseraten in kommerziellen Medien müssen Energiekennwerte bereits in der Anzeige angegeben
                  werden. Der Ausweis ist bei der Besichtigung unaufgefordert vorzulegen und bei Vertragsschluss
                  zu übergeben.
                </p>
              </div>
              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-navy mb-2">Was ist der Unterschied zwischen Bedarfsausweis und Verbrauchsausweis?</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Der Bedarfsausweis (€150–500) berechnet den theoretischen Energiebedarf anhand der Gebäudesubstanz.
                  Der Verbrauchsausweis (€80–150) basiert auf dem tatsächlichen Verbrauch der letzten 3 Jahre.
                  Für Gebäude mit weniger als 5 Einheiten, Baujahr vor 1977 und ohne Sanierung auf WärmeschutzVO
                  1977 ist der Bedarfsausweis Pflicht.
                </p>
              </div>
              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-navy mb-2">Wie hoch ist das Bußgeld bei fehlendem Energieausweis?</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Wer keinen Energieausweis vorlegt oder Pflichtangaben in Inseraten weglässt, begeht eine
                  Ordnungswidrigkeit nach §108 GEG. Das Bußgeld beträgt bis zu €10.000 pro Verstoß.
                </p>
              </div>
              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-navy mb-2">Wer zahlt den Energieausweis — Vermieter oder Mieter?</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Die Kosten trägt grundsätzlich der Eigentümer / Vermieter. Eine Umlage als Betriebskosten
                  ist nicht möglich, da der Energieausweis nicht in §2 BetrKV aufgeführt ist.
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
              Energieausweis-Tracking, Mieterwechsel-Prozesse, Betriebskostenabrechnung —
              einfach verwaltet. übernimmt alle Pflichten zuverlässig für Sie.
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
