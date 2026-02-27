import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Mietrecht Kündigungsschutz: Was Vermieter wissen müssen | einfach verwaltet.',
  description: 'Kündigungsschutz im Mietrecht: §573 BGB, Eigenbedarfskündigung, Kündigungsfristen. Was Vermieter bei der Kündigung eines Mietverhältnisses beachten müssen.',
}

export default function BlogPost() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Mietrecht Kündigungsschutz: Was Vermieter wissen müssen',
    datePublished: '2026-02-27',
    author: { '@type': 'Organization', name: 'einfach verwaltet.' },
    publisher: { '@type': 'Organization', name: 'einfach verwaltet.' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="max-w-3xl mx-auto px-4 py-16">
        <article>
          <h1 className="text-4xl font-bold text-navy-900 mb-4">Mietrecht Kündigungsschutz: Was Vermieter wissen müssen</h1>
          <p className="text-gray-500 mb-8">27. Februar 2026 · 8 Min. Lesezeit</p>
          
          <p className="text-lg text-gray-700 mb-6">
            Der Kündigungsschutz im deutschen Mietrecht ist umfassend und schützt Mieter vor willkürlichen 
            Vertragsbeendigungen. Für Vermieter bedeutet dies: Eine Kündigung ist nur unter strikten 
            Voraussetzungen zulässig. Wir erklären die wichtigsten Regelungen des §573 BGB.
          </p>

          <h2 className="text-2xl font-bold text-navy-900 mt-10 mb-4">§573 BGB: Die Grundlagen des berechtigten Interesses</h2>
          <p className="text-gray-700 mb-4">
            Nach §573 BGB kann der Vermieter das Mietverhältnis nur kündigen, wenn ein berechtigtes Interesse vorliegt. 
            Das Gesetz nennt in Absatz 2 drei anerkannte Gründe:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li><strong>Eigenbedarf (§573 Abs. 2 Nr. 2 BGB):</strong> Der Vermieter oder ein Familienangehöriger benötigt die Wohnung zum Selbstbezug.</li>
            <li><strong>Hinderung angemessener wirtschaftlicher Verwertung (§573 Abs. 2 Nr. 3 BGB):</strong> Der Vermieter könnte durch die Vermietung erhebliche Nachteile erleiden.</li>
            <li><strong>Vertragsverletzung des Mieters (§573 Abs. 2 Nr. 1 BGB):</strong> Zahlungsverzug oder andere schwerwiegende Verstöße gegen den Mietvertrag.</li>
          </ul>
          <p className="text-gray-700 mb-4">
            Die Kündigung muss zudem unter Berücksichtigung der berechtigten Interessen des Mieters als angemessen 
            erscheinen (§573 Abs. 1 BGB). Diese sogenannte „Interessenabwägung" prüft das Gericht im Falle eines 
            Rechtsstreits.
          </p>

          <h2 className="text-2xl font-bold text-navy-900 mt-10 mb-4">Eigenbedarfskündigung: Anforderungen und Voraussetzungen</h2>
          <p className="text-gray-700 mb-4">
            Die Eigenbedarfskündigung ist der häufigste Grund für eine zulässige Kündigung. Doch nicht jeder Bedarf 
            ist ein „berechtigter" Eigenbedarf. Voraussetzungen sind:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li>Die Wohnung wird tatsächlich für den Eigenbedarf des Vermieters oder eines nahen Angehörigen benötigt.</li>
            <li>Der Bedarf ist konkret und nicht nur allgemein behauptet.</li>
            <li>Der Bedarf ist dringend und nicht nur wünschenswert.</li>
            <li>Der Vermieter muss nachweisen können, dass er die Wohnung nutzen wird (z.B. durch Arbeitsplatzwechsel, Familienzuwachs).</li>
          </ul>
          <p className="text-gray-700 mb-4">
            Wichtig: Der Vermieter muss in der Kündigung den Eigenbedarf konkret benennen. Bei Gerichtsverfahren 
            muss er den Bedarf glaubhaft machen und darlegen, warum eine Interessenabwägung zugunsten des Vermieters 
            ausfällt.
          </p>

          <h2 className="text-2xl font-bold text-navy-900 mt-10 mb-4">Kündigungsfristen im Überblick</h2>
          <p className="text-gray-700 mb-4">
            Die gesetzlichen Kündigungsfristen richten sich nach §573c BGB und der Dauer des Mietverhältnisses:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li><strong>Bis 5 Jahre:</strong> 3 Monate zum Monatsende</li>
            <li><strong>5 bis 8 Jahre:</strong> 6 Monate zum Monatsende</li>
            <li><strong>Mehr als 8 Jahre:</strong> 9 Monate zum Monatsende</li>
          </ul>
          <p className="text-gray-700 mb-4">
            Abweichende Vereinbarungen können im Mietvertrag getroffen werden, dürfen aber nicht zuungunsten des 
            Mieters von den gesetzlichen Fristen abweichen. Für Wohnraum in Gebieten mit angespanntem Wohnungsmarkt 
            (sog. „Mietpreisbremse-Gebiete") gelten zusätzliche Schutzvorschriften.
          </p>

          <h2 className="text-2xl font-bold text-navy-900 mt-10 mb-4">Häufig gestellte Fragen</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-navy-900 mb-2">Was passiert bei missbräuchlicher Eigenbedarfskündigung?</h3>
              <p className="text-gray-700">
                Wenn der Vermieter den Eigenbedarf nur vortäuscht, um den Mieter loszuwerden, ist die Kündigung unwirksam. 
                Der Mieter kann auf Feststellung der Wirksamkeit des Mietvertrags klagen. Bei vorsätzlicher Täuschung 
                können sogar Schadensersatzansprüche gegen den Vermieter entstehen. Der Mieter hat Anspruch auf 
                Räumungsfristen und möglicherweise auf Entschädigungen.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-navy-900 mb-2">Kann ich als Vermieter bei Eigenbedarf sofort kündigen?</h3>
              <p className="text-gray-700">
                Nein, eine fristlose Kündigung aus Eigenbedarf ist nicht möglich. Der Eigenbedarf rechtfertigt nur 
                eine ordentliche Kündigung mit den gesetzlichen Fristen nach §573c BGB. Eine fristlose Kündigung ist 
                nur bei schwerwiegenden Vertragsverstößen des Mieters (z.B. Zahlungsverzug über 2 Monatsmieten) zulässig.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-navy-900 mb-2">Wie lange muss ein Vermieter nach Eigenbedarfskündigung selbst einziehen?</h3>
              <p className="text-gray-700">
                Der Vermieter muss die Wohnung für einen angemessenen Zeitraum selbst nutzen. Nach herrschender Meinung 
                sind dies mindestens 3-5 Jahre. Eine Wiedervermietung kurz nach der Räumung kann als missbräuchlich 
                gewertet werden und Schadensersatzansprüche des gekündigten Mieters auslösen.
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
