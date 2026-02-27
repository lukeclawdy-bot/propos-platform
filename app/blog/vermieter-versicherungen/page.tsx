import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Vermieter Versicherungen: Gebäude-, Haftpflicht- & Rechtsschutz 2026 | einfach verwaltet.",
  description:
    "Welche Versicherungen braucht ein Vermieter? Gebäudeversicherung, Vermieterhaftpflicht, Rechtsschutz — alle wichtigen Policen für Eigentümer 2026.",
  keywords:
    "Vermieter Versicherungen, Gebäudeversicherung Vermieter, Vermieterhaftpflicht, Mietrechtsschutz",
  openGraph: {
    title: "Vermieter Versicherungen: Gebäude-, Haftpflicht- & Rechtsschutz 2026",
    description:
      "Der komplette Versicherungsguide für Vermieter: Welche Policen Pflicht sind, was sie kosten und worauf beim Abschluss zu achten ist.",
    url: "https://einfach-verwaltet.de/blog/vermieter-versicherungen",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "article",
  },
  alternates: {
    canonical: "https://einfach-verwaltet.de/blog/vermieter-versicherungen",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Vermieter Versicherungen: Gebäude-, Haftpflicht- und Rechtsschutz 2026",
  description:
    "Welche Versicherungen braucht ein Vermieter wirklich? Gebäudeversicherung, Haftpflicht, Rechtsschutz — Kosten, Leistungen und Abschlusstipps.",
  author: { "@type": "Organization", name: "einfach verwaltet." },
  publisher: {
    "@type": "Organization",
    name: "einfach verwaltet.",
    logo: { "@type": "ImageObject", url: "https://einfach-verwaltet.de/logo.png" },
  },
  datePublished: "2026-02-27",
  inLanguage: "de",
  url: "https://einfach-verwaltet.de/blog/vermieter-versicherungen",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Welche Versicherungen sind für Vermieter Pflicht?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die Gebäudeversicherung ist für Eigentümer faktisch Pflicht, da Hypothekengeber sie voraussetzen. Die Feuer-Elementarversicherung deckt Brandschäden, Sturm, Hagel und Leitungswasser. Weitere wichtige Versicherungen: Vermieterhaftpflicht für Schäden an Mieter & Dritten, Rechtsschutz für Mietrechtstreitigkeiten und Glasversicherung bei entsprechenden Gebäuden.",
      },
    },
    {
      "@type": "Question",
      name: "Was kostet eine Gebäudeversicherung für Vermieter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die Kosten der Gebäudeversicherung hängen von Versicherungssumme, Baujahr, Wohnlage, Zustand und gewählten Tarifen ab. Übliche Bruttoprämien liegen zwischen 0,50 € und 1,50 € pro 1.000 € Versicherungssumme jährlich. Ein Mehrfamilienhaus mit 1 Millionen € Versicherungssumme kostet ca. 500–1.500 €/Jahr.",
      },
    },
    {
      "@type": "Question",
      name: "Braucht ein Vermieter eine separate Haftpflichtversicherung?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, die private Haftpflicht deckt Vermieterrisiken nicht ab. Eine spezielle Vermieterhaftpflichtversicherung schützt vor Schadenersatzansprüchen von Mietern und Dritten, wenn durch mangelnde Instandhaltung Schäden entstehen (z.B. durch herabfallende Dachziegel, rutschige Treppen oder defekte Installationen).",
      },
    },
  ],
};

export default function VermieterVersicherungenPage() {
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
      <main className="pt-20 min-h-screen bg-warm-white">
        <article className="max-w-[800px] mx-auto px-6 py-12">
          <nav className="text-sm text-text-light mb-6" aria-label="Breadcrumb">
            <Link href="/blog" className="hover:text-teal transition-colors">Ratgeber</Link>
            <span className="mx-2">›</span>
            <span>Vermieter Versicherungen</span>
          </nav>

          <header className="mb-10">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-teal/10 text-teal text-xs font-semibold px-3 py-1 rounded-full">Versicherungen</span>
              <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">10 min Lesezeit</span>
              <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">Februar 2026</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-navy leading-tight mb-4">
              Vermieter Versicherungen: Gebäude-, Haftpflicht- & Rechtsschutz 2026
            </h1>
            <p className="text-lg text-text-light leading-relaxed">
              Welche Versicherungen braucht ein Vermieter wirklich? Der komplette Überblick über Pflicht- und Zusatzversicherungen — mit Kosten, Leistungen und Abschlusstipps.
            </p>
          </header>

          <div className="prose prose-navy max-w-none text-gray-700 leading-relaxed space-y-8">

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">Die wichtigsten Versicherungen für Vermieter</h2>
              <p>
                Als Vermieter tragen Sie Risiken — finanziell und rechtlich. Die richtige Versicherungsabsicherung schützt vor existenzbedrohenden Schäden und Streitigkeiten. Doch welche Policen sind wirklich notwendig?
              </p>
              <div className="grid md:grid-cols-2 gap-4 my-6">
                <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                  <h3 className="font-bold text-green-800 mb-2">Essenziell</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Gebäudeversicherung (Feuer, Elementar)</li>
                    <li>• Vermieterhaftpflicht</li>
                    <li>• Rechtsschutzversicherung (Mietrecht)</li>
                  </ul>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                  <h3 className="font-bold text-amber-800 mb-2">Empfohlen</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Glasversicherung (bei vielen Fenstern)</li>
                    <li>• Betriebshaftpflicht (WEG-Verwalter)</li>
                    <li>• D&O-Versicherung (für große Portfolios)</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">Gebäudeversicherung: Die Grundabsicherung</h2>
              <p>
                Die Gebäudeversicherung ist für Vermieter faktisch unverzichtbar. Sie deckt Schäden am Gebäude selbst ab — nicht am Inventar oder den Mietergegenständen.
              </p>
              <h3 className="text-xl font-semibold text-navy mb-3">Was deckt die Gebäudeversicherung ab?</h3>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-teal font-bold">✓</span>
                  <span><strong>Feuer</strong> — Brand, Explosion, Blitzschlag</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal font-bold">✓</span>
                  <span><strong>Leitungswasser</strong> — Rohrbruch, Frostschäden</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal font-bold">✓</span>
                  <span><strong>Sturm/Hagel</strong> — ab Windstärke 8 (meist)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal font-bold">✓</span>
                  <span><strong>Elementarschäden</strong> — optional: Überschwemmung, Erdbeben</span>
                </li>
              </ul>
              <h3 className="text-xl font-semibold text-navy mb-3">Was kostet die Gebäudeversicherung?</h3>
              <p>
                Die Kosten hängen von mehreren Faktoren ab:
              </p>
              <ul className="space-y-2 my-3">
                <li>• Versicherungssumme (Wiederherstellungswert)</li>
                <li>• Baujahr und Zustand des Gebäudes</li>
                <li>• Wohnlage (Hochwassergebiet, Kriminalitätsbelastung)</li>
                <li>• Selbstbeteiligung</li>
                <li>• Zusatzleistungen (z.B. Mietausfall, Rohrreinigung)</li>
              </ul>
              <div className="bg-gray-50 rounded-xl p-5 my-4">
                <p className="text-sm">
                  <strong>Richtlinienwert:</strong> Ca. 0,50–1,50 € pro 1.000 € Versicherungssumme jährlich. Ein Mehrfamilienhaus mit 1 Mio. € Versicherungssumme kostet zwischen 500 € und 1.500 € im Jahr.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">Vermieterhaftpflichtversicherung</h2>
              <p>
                Die private Haftpflicht deckt keine Vermieter-Risiken ab. Wenn ein Mieter oder Dritter durch mangelhafte Instandhaltung des Gebäudes zu Schaden kommt, haftet der Vermieter — und das können schnell sechsstellige Beträge sein.
              </p>
              <h3 className="text-xl font-semibold text-navy mb-3">Typische Haftungsfälle</h3>
              <ul className="space-y-2 mb-4">
                <li>• Herabfallende Dachziegel verletzen einen Passanten</li>
                <li>• Rutschunfall auf nicht gestreuter Treppe im Winter</li>
                <li>• Sturz durch defektes Treppengeländer</li>
                <li>• Verletzung durch lose Bodenfliesen im Treppenhaus</li>
                <li>• Gesundheitsschäden durch Schimmel aufgrund mangelnder Dichtheit</li>
              </ul>
              <p>
                Eine Vermieterhaftpflicht schützt vor solchen Schadenersatzansprüchen — inklusive Anwalts- und Gerichtskosten.
              </p>
              <div className="bg-teal/5 border border-teal/20 rounded-xl p-5 my-4">
                <p className="text-sm text-teal-dark">
                  <strong>Tipp:</strong> Achten Sie auf eine Deckungssumme von mindestens 5 Mio. €, besser 10 Mio. € — bei Personenschäden reichen niedrigere Versicherungssummen schnell nicht aus.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">Rechtsschutzversicherung für Vermieter</h2>
              <p>
                Mietrechtliche Streitigkeiten sind teuer. Ein Zivilprozess vor dem Amtsgericht kann schnell 5.000–15.000 € kosten — und das ohne Garantie auf Erfolg. Eine Rechtsschutzversicherung deckt:
              </p>
              <ul className="space-y-2 my-4">
                <li className="flex items-start gap-2">
                  <span className="text-teal font-bold">✓</span>
                  <span>Kündigungsschutzklagen des Mieters</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal font-bold">✓</span>
                  <span>Mietnomaden-Rückgabeverfahren</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal font-bold">✓</span>
                  <span>Mietminderungsstreitigkeiten</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal font-bold">✓</span>
                  <span>Nebenkostenabrechnungsstreitigkeiten</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal font-bold">✓</span>
                  <span>Anwaltskosten für Mahnungen und Abmahnungen</span>
                </li>
              </ul>
              <p>
                Die Prämien liegen je nach Deckungssumme und Wartezeit zwischen 150 € und 400 € jährlich — eine Investition, die sich bei einer einzigen Streitigkeit amortisiert.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">Weitere Versicherungen für Vermieter</h2>
              
              <h3 className="text-xl font-semibold text-navy mb-3">Glasversicherung</h3>
              <p>
                Bei vielen Fenstern, Wintergärten oder Glasfassaden sinnvoll. Deckt Bruch- und Zerstörungsschäden an Fenster- und Türscheiben, Spiegeln und Sanitärglas.
              </p>

              <h3 className="text-xl font-semibold text-navy mb-3">Mietausfallversicherung</h3>
              <p>
                Ergänzung zur Gebäudeversicherung: Wenn das Gebäude durch einen versicherten Schaden unbewohnbar wird, erstattet die Mietausfallversicherung die entgangene Miete für die Dauer der Renovierung.
              </p>

              <h3 className="text-xl font-semibold text-navy mb-3">D&O-Versicherung (Directors & Officers)</h3>
              <p>
                Für professionelle Vermieter mit vielen Einheiten oder WEG-Verwalter: Deckt Schadensersatzansprüche wegen Pflichtverletzung in der Geschäftsführung.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">Versicherung kündigen oder wechseln: Was beachten?</h2>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 my-6">
                <h3 className="font-bold text-amber-800 mb-3">Checkliste Kündigung/Wechsel</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Kündigungsfrist beachten (meist 3 Monate zum Jahresende)</li>
                  <li>• Neues Angebot frühzeitig einholen (bis September für 01.01.)</li>
                  <li>• Versicherungssumme an aktuellen Wiederherstellungswert anpassen</li>
                  <li>• Neubewertung bei Umbauten oder Modernisierungen</li>
                  <li>• Schadensfreiheitsrabatte mitnehmen oder aushandeln</li>
                </ul>
              </div>
            </section>

            <section className="bg-white rounded-2xl border border-gray-200 p-8 mt-10">
              <h2 className="text-2xl font-bold text-navy mb-6">Häufige Fragen zu Vermieter Versicherungen</h2>
              <div className="space-y-6">
                {[
                  {
                    q: "Welche Versicherungen sind für Vermieter Pflicht?",
                    a: "Die Gebäudeversicherung ist faktisch Pflicht, da Banken sie voraussetzen. Sie deckt Feuer, Leitungswasser und Sturm ab. Zusätzlich empfohlen: Vermieterhaftpflicht und Rechtsschutz. Die private Haftpflicht deckt keine Vermieter-Risiken ab.",
                  },
                  {
                    q: "Was kostet eine Gebäudeversicherung für Vermieter?",
                    a: "Die Kosten hängen von Versicherungssumme, Baujahr und Lage ab. Als Richtwert: 0,50–1,50 € pro 1.000 € Versicherungssumme jährlich. Ein Mehrfamilienhaus mit 1 Mio. € Versicherungssumme kostet ca. 500–1.500 €/Jahr.",
                  },
                  {
                    q: "Braucht ein Vermieter eine separate Haftpflichtversicherung?",
                    a: "Ja, die private Haftpflicht reicht nicht. Eine Vermieterhaftpflicht schützt vor Schadensersatzansprüchen, wenn Mieter oder Dritte durch mangelnde Instandhaltung zu Schaden kommen (z.B. durch Stürze, herabfallende Teile). Deckungssumme: mindestens 5 Mio. €.",
                  },
                ].map((item, i) => (
                  <div key={i} className="border-b border-gray-100 pb-5 last:border-0 last:pb-0">
                    <h3 className="font-semibold text-navy mb-2">{item.q}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-navy rounded-2xl p-8 text-white text-center mt-10">
              <h2 className="text-2xl font-bold mb-3">Rundum-sorglos als Vermieter?</h2>
              <p className="text-white/80 mb-6 max-w-md mx-auto">
                Wir verwalten Ihre Immobilie professionell — inklusive Versicherungsmanagement, Schadensabwicklung und rechtssicherer Prozesse.
              </p>
              <Link
                href="/anfrage"
                className="inline-flex items-center gap-2 bg-teal text-white px-8 py-4 rounded-xl font-semibold text-base hover:bg-teal/90 transition-all hover:shadow-lg"
              >
                Jetzt kostenlos anfragen →
              </Link>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
