import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Vermieter Versicherungen: Welche Policen sind Pflicht? | einfach verwaltet.',
  description: 'Versicherungen für Vermieter: Gebäudeversicherung, Haftpflicht, Mietausfall. Welche Policen Vermieter wirklich brauchen und was optional ist.',
}

export default function BlogPost() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Vermieter Versicherungen: Welche Policen sind Pflicht?',
    datePublished: '2026-02-27',
    author: { '@type': 'Organization', name: 'einfach verwaltet.' },
    publisher: { '@type': 'Organization', name: 'einfach verwaltet.' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="max-w-3xl mx-auto px-4 py-16">
        <article>
          <h1 className="text-4xl font-bold text-navy-900 mb-4">Vermieter Versicherungen: Welche Policen sind Pflicht?</h1>
          <p className="text-gray-500 mb-8">27. Februar 2026 · 8 Min. Lesezeit</p>
          
          <p className="text-lg text-gray-700 mb-6">
            Als Vermieter tragen Sie Verantwortung für Ihre Immobilie und die darin lebenden Mieter. 
            Doch welche Versicherungen sind wirklich notwendig und welche sind bloße Zusatzleistungen? 
            Wir geben Ihnen den Überblick über die wichtigsten Policen für Vermieter.
          </p>

          <h2 className="text-2xl font-bold text-navy-900 mt-10 mb-4">Gebäudeversicherung: Die Basis-Absicherung</h2>
          <p className="text-gray-700 mb-4">
            Die Gebäudeversicherung ist für Vermieter unverzichtbar. Sie schützt vor Schäden durch Feuer, 
            Sturm, Hagel, Leitungswasser und andere Elementarereignisse. Bei Mietshäusern ist eine 
            Gebäudeversicherung in der Regel über die WEG- oder Mietverwaltung zentral organisiert – 
            die Kosten werden auf die Eigentümer oder über die Betriebskosten umgelegt.
          </p>
          <p className="text-gray-700 mb-4">
            Wichtig: Die Versicherungssumme sollte regelmäßig an die aktuellen Wiederherstellungskosten 
            angepasst werden (z.B. durch einen Baupreisindex). Bei Unterversicherung zahlt der Versicherer 
            im Schadensfall nur anteilig. Auch Denkmalschutz und energetische Modernisierungen können 
            die Wiederherstellungskosten beeinflussen.
          </p>
          <p className="text-gray-700 mb-4">
            Für Einfamilienhäuser und kleinere Vermietungsobjekte ist eine separate Absicherung des 
            Gebäudes ratsam. Achten Sie auf erweiterte Deckungen wie Glasbruch, Rohrbruch oder 
            Innenausbauelemente.
          </p>

          <h2 className="text-2xl font-bold text-navy-900 mt-10 mb-4">Haftpflichtversicherung: Schutz vor Schadensersatzansprüchen</h2>
          <p className="text-gray-700 mb-4">
            Als Vermieter haften Sie für Schäden, die durch Mängel an der Immobilie entstehen – 
            unabhängig von einem Verschulden. Die Vermieterhaftpflichtversicherung (oft als 
            „Vermieterrechtsschutz" oder erweiterte Haftpflicht verkauft) schützt vor finanziellen 
            Risiken durch:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li>Personenschäden durch bauliche Mängel (z.B. Treppensturz durch defektes Geländer)</li>
            <li>Sachschäden an Mieter-Eigentum durch Gebäudedefekte</li>
            <li>Schäden an Nachbargrundstücken</li>
            <li>Vermögensschäden durch vermietungsbedingte Streitigkeiten</li>
          </ul>
          <p className="text-gray-700 mb-4">
            Die Haftpflichtversicherung sollte eine Deckungssumme von mindestens 5 Millionen Euro 
            aufweisen. Bei größeren Objekten oder gewerblichen Mietverhältnissen sind höhere 
            Deckungssummen (10 Mio. Euro und mehr) empfohlen.
          </p>

          <h2 className="text-2xl font-bold text-navy-900 mt-10 mb-4">Mietausfallversicherung: Absicherung der Mieteinnahmen</h2>
          <p className="text-gray-700 mb-4">
            Die Mietausfallversicherung (auch Mietausfalldeckung) schützt Vermieter vor finanziellen 
            Einbußen, wenn eine Wohnung aufgrund eines versicherten Schadens (z.B. Feuer, Wasserschaden) 
            nicht vermietet werden kann. Sie kommt für:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li>Ausfall der Mieteinnahmen während der Reparaturphase</li>
            <li>Zusätzliche Kosten für Ersatzunterkünfte des Mieters</li>
            <li>Heiz- und Nebenkosten, die während des Ausfalls anfallen</li>
          </ul>
          <p className="text-gray-700 mb-4">
            Die Mietausfallversicherung ist besonders für Vermieter mit hohen Finanzierungslasten 
            wichtig, da sie die laufenden Kredittilgungen auch bei Ausfall der Miete deckt. Die Versicherung 
            ist meist als Zusatzbaustein zur Gebäudeversicherung erhältlich.
          </p>

          <h2 className="text-2xl font-bold text-navy-900 mt-10 mb-4">Häufig gestellte Fragen</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-navy-900 mb-2">Muss ein Vermieter eine Hausratversicherung abschließen?</h3>
              <p className="text-gray-700">
                Nein, die Hausratversicherung deckt ausschließlich bewegliche Gegenstände und ist Sache des Mieters. 
                Als Vermieter benötigen Sie keine Hausratversicherung, es sei denn, Sie stellen möblierte Wohnungen 
                oder Ferienwohnungen zur Verfügung.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-navy-900 mb-2">Was ist eine Rechtsschutzversicherung für Vermieter?</h3>
              <p className="text-gray-700">
                Die Vermieter-Rechtsschutzversicherung deckt Kosten für Rechtsstreitigkeiten im Zusammenhang mit der 
                Vermietung ab – z.B. Mieterhöhungsverfahren, Räumungsklagen oder Schadensersatzansprüche. Sie ist 
                nicht Pflicht, aber für professionelle Vermieter sehr empfehlenswert.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-navy-900 mb-2">Kann ich die Versicherungskosten auf den Mieter umlegen?</h3>
              <p className="text-gray-700">
                Die Gebäudeversicherung und die öffentliche Haftpflichtversicherung der WEG können als Betriebskosten 
                auf den Mieter umgelegt werden (§2 BetrKV). Eine Mietausfall- oder Rechtsschutzversicherung ist 
                dagegen Sache des Vermieters und nicht umlagefähig.
              </p>
            </div>
          </div>

          <div className="mt-12 p-6 bg-teal-50 rounded-xl">
            <h2 className="text-xl font-bold mb-2">Professionelle Hausverwaltung in Hamburg</h2>
            <p className="mb-4">Lassen Sie uns Ihre Immobilie verwalten — transparent, zuverlässig, ohne Stress.</p>
            <Link href="/anfrage" className="inline-block bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700">
              Kostenlos anfragen
            </Link>
          </div>
        </article>
      </main>
    </>
  )
}
