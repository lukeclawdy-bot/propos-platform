import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "AfA und Steuerabschreibungen für Vermieter 2026 — Vollständiger Leitfaden",
  description:
    "Alles über AfA (Absetzung für Abnutzung), Werbungskosten und Steuerabschreibungen für Vermieter in Deutschland 2026. Mit Beispielrechnungen.",
  openGraph: {
    title: "Steuerabschreibungen für Vermieter 2026 — AfA, Werbungskosten & mehr",
    description: "Welche Kosten können Vermieter steuerlich absetzen? AfA, Zinsen, Hausverwaltung, Reparaturen — vollständiger Überblick.",
    url: "https://einfach-verwaltet.de/blog/vermieter-steuern-abschreibung",
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
              <span className="text-teal text-xs font-semibold uppercase tracking-wide">Steuern</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-4 font-serif leading-tight">
              AfA und Steuerabschreibungen für Vermieter 2026 — Vollständiger Leitfaden
            </h1>
            <p className="text-text-light text-lg leading-relaxed">
              Wer Immobilien vermietet, kann erhebliche Kosten steuerlich geltend machen. Die wichtigsten Positionen: AfA, Schuldzinsen, Hausverwaltungskosten und Werbungskosten.
            </p>
            <div className="flex items-center gap-4 mt-6 text-sm text-text-light">
              <span>27. Februar 2026</span>
              <span>·</span>
              <span>8 Min. Lesezeit</span>
            </div>
          </header>

          <div className="prose prose-lg max-w-none text-navy/85 leading-relaxed space-y-6">

            <div className="p-4 bg-amber/10 rounded-xl border border-amber/20 not-prose">
              <p className="text-navy text-sm"><strong>Hinweis:</strong> Dieser Artikel dient der allgemeinen Information. Steuerliche Entscheidungen sollten immer mit einem Steuerberater abgestimmt werden. Die Angaben beziehen sich auf das Steuerjahr 2026.</p>
            </div>

            <h2 className="text-2xl font-bold text-navy font-serif mt-10">Was sind Werbungskosten bei Vermietung?</h2>
            <p>
              Vermietungseinkünfte werden als „Einkünfte aus Vermietung und Verpachtung" (§ 21 EStG) versteuert. 
              Davon abziehbar sind alle Ausgaben, die durch die Vermietung entstehen — die sogenannten Werbungskosten (§ 9 EStG). 
              Das Ziel: Nur der tatsächliche Gewinn wird besteuert.
            </p>

            <h2 className="text-2xl font-bold text-navy font-serif mt-10">AfA: Absetzung für Abnutzung</h2>
            <p>
              Die AfA ist der wichtigste steuerliche Hebel für Vermieter. Gebäude werden über ihre Nutzungsdauer 
              abgeschrieben — der Kaufpreis (ohne Grundstücksanteil) wird auf viele Jahre verteilt und jährlich 
              als Werbungskosten abgesetzt.
            </p>
            <div className="not-prose space-y-3">
              {[
                { typ: "Gebäude, Baujahr vor 1925", afa: "2,5 % pro Jahr", hinweis: "40 Jahre Abschreibungsdauer" },
                { typ: "Gebäude, Baujahr 1925–2022", afa: "2,0 % pro Jahr (§ 7 Abs. 4 Nr. 2 EStG)", hinweis: "50 Jahre Abschreibungsdauer" },
                { typ: "Neubauten ab 2023", afa: "3,0 % pro Jahr (§ 7 Abs. 4 Nr. 2a EStG)", hinweis: "33 Jahre — erhöht durch JStG 2022" },
                { typ: "Denkmalschutz (§ 7i EStG)", afa: "9 % für 8 Jahre, dann 7 % für 4 Jahre", hinweis: "Nur für Sanierungskosten" },
              ].map(row => (
                <div key={row.typ} className="p-4 bg-warm-white rounded-xl border border-gray-100">
                  <p className="font-semibold text-navy text-sm">{row.typ}</p>
                  <p className="text-teal font-medium text-sm mt-1">{row.afa}</p>
                  <p className="text-text-light text-xs mt-0.5">{row.hinweis}</p>
                </div>
              ))}
            </div>
            <p className="mt-4">
              <strong>Beispiel:</strong> Kaufpreis Wohnung €300.000 (Gebäudeanteil €240.000, Grundstück €60.000). 
              AfA bei 2 %: €4.800/Jahr — ohne eine einzige Ausgabe zu tätigen.
            </p>

            <h2 className="text-2xl font-bold text-navy font-serif mt-10">Schuldzinsen vollständig absetzbar</h2>
            <p>
              Zinsen für Hypothekendarlehen, die der Finanzierung der Vermietungsimmobilie dienen, sind in 
              voller Höhe als Werbungskosten abzugsfähig. Das Tilgungsanteil des Darlehens hingegen ist 
              <strong> nicht</strong> absetzbar — nur der Zinsanteil zählt.
            </p>

            <h2 className="text-2xl font-bold text-navy font-serif mt-10">Weitere absetzbare Werbungskosten</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Hausverwaltungskosten</strong> — vollständig absetzbar (§ 9 Abs. 1 EStG)</li>
              <li><strong>Instandhaltungskosten</strong> — Reparaturen bis zu 15 % des Gebäudewerts im Jahr als sofortige Werbungskosten (Erhaltungsaufwand); größere Maßnahmen eventuell als Herstellungskosten zu aktivieren</li>
              <li><strong>Grundsteuer</strong> — als Werbungskosten absetzbar</li>
              <li><strong>Gebäudeversicherung</strong></li>
              <li><strong>Fahrtkosten</strong> zur Immobilie (€0,30/km mit eigenem PKW)</li>
              <li><strong>Steuerberatungskosten</strong> (für den Vermietungsbereich)</li>
              <li><strong>Werbungskosten Leerstand</strong> — auch bei leerstehendem Objekt absetzbar, sofern Vermietungsabsicht besteht</li>
              <li><strong>Finanzierungsnebenkosten</strong> (Notar, Grundbuch, Maklerprovision beim Kauf)</li>
            </ul>

            <h2 className="text-2xl font-bold text-navy font-serif mt-10">Erhaltungsaufwand vs. Herstellungskosten</h2>
            <p>
              Ein häufiger Fehler: Eigentümer unterschätzen den Unterschied zwischen Erhaltungsaufwand und 
              Herstellungskosten. Erhaltungsaufwand (Reparaturen, die den ursprünglichen Zustand erhalten) 
              kann sofort abgesetzt werden. Herstellungskosten (Verbesserungen, die den Wert oder die Nutzfläche 
              erhöhen) müssen über die AfA-Dauer abgeschrieben werden.
            </p>
            <p>
              Wichtige Grenze: Die „Anschaffungsnahen Herstellungskosten" (§ 6 Abs. 1 Nr. 1a EStG): Übersteigen 
              Instandsetzungs- und Modernisierungskosten in den ersten 3 Jahren nach Kauf 15 % des Gebäudewertes, 
              müssen sie als Herstellungskosten aktiviert werden.
            </p>

            <h2 className="text-2xl font-bold text-navy font-serif mt-10">Fazit</h2>
            <p>
              Die steuerlichen Möglichkeiten für Vermieter sind erheblich — insbesondere AfA, Schuldzinsen und 
              laufende Werbungskosten können die Steuerlast deutlich senken. Gleichzeitig sind die Regeln komplex. 
              Die Zusammenarbeit mit einem erfahrenen Steuerberater zahlt sich in der Regel deutlich aus.
            </p>
          </div>

          <div className="mt-12 p-6 bg-teal/8 rounded-2xl border border-teal/15">
            <p className="text-navy font-semibold mb-2">Hausverwaltungskosten steuerlich absetzen</p>
            <p className="text-text-light text-sm mb-4">
              Die Kosten für einfach verwaltet. sind vollständig als Werbungskosten absetzbar. Transparente Jahresabrechnung für Ihren Steuerberater inklusive.
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
        "headline": "AfA und Steuerabschreibungen für Vermieter 2026 — Vollständiger Leitfaden",
        "description": "Steuerliche Abschreibungen für Vermieter: AfA-Sätze, Schuldzinsen, Werbungskosten und der Unterschied zwischen Erhaltungsaufwand und Herstellungskosten.",
        "author": { "@type": "Organization", "name": "einfach verwaltet." },
        "publisher": { "@type": "Organization", "name": "einfach verwaltet.", "url": "https://einfach-verwaltet.de" },
        "datePublished": "2026-02-27",
        "url": "https://einfach-verwaltet.de/blog/vermieter-steuern-abschreibung"
      })}} />
      <Footer />
    </>
  );
}
