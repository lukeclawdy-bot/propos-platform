import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Energieausweis Pflichten für Vermieter 2026 — Was ist Pflicht?",
  description:
    "Welche Pflichten haben Vermieter beim Energieausweis? §16a GEG erklärt: Wann ist er Pflicht, welche Typen gibt es, und was kostet ein Verstoß?",
  openGraph: {
    title: "Energieausweis Pflicht für Vermieter 2026 — Vollständiger Leitfaden",
    description: "Bedarfsausweis vs. Verbrauchsausweis, Vorlagepflicht bei Besichtigungen und Bußgelder bei Verstößen nach GEG.",
    url: "https://einfach-verwaltet.de/blog/vermieter-pflichten-energieausweis",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "article",
  },
};

export default function BlogPost() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20">
        <article className="max-w-[780px] mx-auto px-6">
          <header className="mb-10">
            <div className="inline-flex items-center gap-2 bg-teal/10 rounded-full px-3 py-1 mb-4">
              <span className="text-teal text-xs font-semibold uppercase tracking-wide">Compliance</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-4 font-serif leading-tight">
              Energieausweis-Pflichten für Vermieter 2026 — §16a GEG vollständig erklärt
            </h1>
            <p className="text-text-light text-lg leading-relaxed">
              Der Energieausweis ist Pflicht — bei Vermietung, Verpachtung und Verkauf. Wer ihn nicht vorlegt, riskiert ein Bußgeld bis zu €10.000. Was Vermieter wissen müssen.
            </p>
            <div className="flex items-center gap-4 mt-6 text-sm text-text-light">
              <span>27. Februar 2026</span>
              <span>·</span>
              <span>7 Min. Lesezeit</span>
            </div>
          </header>

          <div className="prose prose-lg max-w-none text-navy/85 leading-relaxed space-y-6">
            <h2 className="text-2xl font-bold text-navy font-serif mt-10">Was ist der Energieausweis?</h2>
            <p>
              Der Energieausweis (auch: Energiepass) dokumentiert den energetischen Zustand eines Gebäudes 
              und bewertet dessen Energieeffizienz auf einer Skala von A+ (sehr effizient) bis H (ineffizient). 
              Er ist in Deutschland durch das Gebäudeenergiegesetz (GEG) seit 2020 geregelt und ersetzt die 
              früheren Regelungen der EnEV.
            </p>

            <h2 className="text-2xl font-bold text-navy font-serif mt-10">Wann ist der Energieausweis Pflicht?</h2>
            <p>Gemäß §16 GEG besteht Energieausweispflicht bei:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Neuvermietung oder Neuverpachtung von Wohn- oder Gewerbegebäuden</li>
              <li>Verkauf von Immobilien</li>
              <li>Wesentlichen Renovierungen (Neubau-ähnliche Sanierung)</li>
            </ul>
            <p>
              Bereits bei der Besichtigung muss der Energieausweis unaufgefordert vorgelegt oder eine Kopie 
              ausgehändigt werden (§16a GEG). Spätestens bei Vertragsabschluss muss er übergeben werden.
            </p>

            <h2 className="text-2xl font-bold text-navy font-serif mt-10">Bedarfsausweis vs. Verbrauchsausweis</h2>
            <div className="not-prose space-y-3">
              <div className="p-4 bg-warm-white rounded-xl border border-gray-100">
                <p className="font-semibold text-navy">Bedarfsausweis</p>
                <p className="text-text-light text-sm mt-1">Basiert auf den technischen Eigenschaften des Gebäudes (Dämmung, Heizung, Fenster). Unabhängig vom tatsächlichen Verbrauch. Aufwändiger und teurer, aber aussagekräftiger. Pflicht für: Gebäude mit weniger als 5 Wohnungen, die vor 1977 gebaut wurden und nicht nach WSchV 1977 saniert wurden.</p>
              </div>
              <div className="p-4 bg-warm-white rounded-xl border border-gray-100">
                <p className="font-semibold text-navy">Verbrauchsausweis</p>
                <p className="text-text-light text-sm mt-1">Basiert auf dem tatsächlichen Energieverbrauch der letzten 3 Jahre. Einfacher und günstiger, aber von individuellem Nutzerverhalten abhängig. Zulässig für: die meisten Bestandsgebäude ab 5 Wohnungen.</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-navy font-serif mt-10">Kosten und Gültigkeitsdauer</h2>
            <p>
              Ein Energieausweis ist 10 Jahre gültig. Die Kosten variieren stark:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Verbrauchsausweis: ca. €50–100 (online, über Schornsteinfeger oder Energieberater)</li>
              <li>Bedarfsausweis: ca. €300–500 (erfordert Vor-Ort-Begehung durch qualifizierten Energieberater)</li>
            </ul>
            <p>
              Hinweis: Die Kosten für den Energieausweis sind steuerlich als Werbungskosten absetzbar und 
              dürfen <strong>nicht</strong> auf den Mieter umgelegt werden.
            </p>

            <h2 className="text-2xl font-bold text-navy font-serif mt-10">Bußgelder bei Verstoß</h2>
            <p>
              Wer keinen Energieausweis vorlegt oder einen gefälschten/veralteten Ausweis verwendet, 
              begeht eine Ordnungswidrigkeit. Das Bußgeld beträgt bis zu <strong>€10.000</strong> 
              (§ 108 Abs. 1 Nr. 13 GEG). Zuständig für die Verfolgung sind die Landesbehörden 
              (in Hamburg: Behörde für Stadtentwicklung und Wohnen).
            </p>

            <h2 className="text-2xl font-bold text-navy font-serif mt-10">Angaben in Immobilienanzeigen</h2>
            <p>
              Bei der Schaltung von Vermietungsanzeigen (ImmoScout24, Immowelt etc.) müssen folgende 
              Angaben aus dem Energieausweis verpflichtend angegeben werden (§16a GEG):
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Art des Energieausweises (Bedarfs- oder Verbrauchsausweis)</li>
              <li>Energieeffizienzklasse (A+ bis H)</li>
              <li>Endenergiebedarf oder -verbrauch in kWh/(m²a)</li>
              <li>Wesentlicher Energieträger der Heizung</li>
              <li>Baujahr des Gebäudes (bei Bedarfsausweis)</li>
            </ul>

            <h2 className="text-2xl font-bold text-navy font-serif mt-10">Fazit</h2>
            <p>
              Der Energieausweis ist keine bürokratische Pflichtübung — er beeinflusst die Vermietbarkeit 
              und den Wert von Immobilien. Eigentümer mit Gebäuden in schlechten Energieeffizienzklassen 
              (E–H) sollten mittelfristig Sanierungsmaßnahmen einplanen, da die EU-Gebäuderichtlinie 
              zunehmend Druck auf ineffiziente Altbauten ausübt.
            </p>
          </div>

          <div className="mt-12 p-6 bg-teal/8 rounded-2xl border border-teal/15">
            <p className="text-navy font-semibold mb-2">Energieausweis-Compliance automatisch</p>
            <p className="text-text-light text-sm mb-4">
              Unsere Verwaltung überwacht den Ablauf Ihres Energieausweises und erinnert Sie rechtzeitig — automatisch.
            </p>
            <a href="/anfrage" className="inline-block bg-teal text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-teal/85 transition-all">
              Kostenlose Beratung anfragen →
            </a>
          </div>
        </article>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Energieausweis-Pflichten für Vermieter 2026 — §16a GEG vollständig erklärt",
        "description": "Bedarfsausweis vs. Verbrauchsausweis, Vorlagepflicht bei Besichtigungen und Bußgelder bei Verstößen nach GEG.",
        "author": { "@type": "Organization", "name": "einfach verwaltet." },
        "publisher": { "@type": "Organization", "name": "einfach verwaltet.", "url": "https://einfach-verwaltet.de" },
        "datePublished": "2026-02-27",
        "url": "https://einfach-verwaltet.de/blog/vermieter-pflichten-energieausweis"
      })}} />
      <Footer />
    </>
  );
}
