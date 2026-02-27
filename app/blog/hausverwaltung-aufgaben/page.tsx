import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Hausverwaltung Aufgaben: Was macht ein Verwalter? | einfach verwaltet.',
  description: 'Aufgaben der Hausverwaltung: Was macht ein Verwalter? WEG-Verwaltung, Mietverwaltung, technisches Management. Alle Pflichten und Leistungen im Überblick.',
}

export default function BlogPost() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Hausverwaltung Aufgaben: Was macht ein Verwalter?',
    datePublished: '2026-02-27',
    author: { '@type': 'Organization', name: 'einfach verwaltet.' },
    publisher: { '@type': 'Organization', name: 'einfach verwaltet.' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="max-w-3xl mx-auto px-4 py-16">
        <article>
          <h1 className="text-4xl font-bold text-navy-900 mb-4">Hausverwaltung Aufgaben: Was macht ein Verwalter?</h1>
          <p className="text-gray-500 mb-8">27. Februar 2026 · 8 Min. Lesezeit</p>
          
          <p className="text-lg text-gray-700 mb-6">
            Eine professionelle Hausverwaltung übernimmt vielfältige Aufgaben – von der finanziellen Verwaltung 
            über die technische Betreuung bis hin zur rechtlichen Beratung. Doch was genau gehört zum Leistungsspektrum 
            eines Verwalters? Wir geben Ihnen den vollständigen Überblick.
          </p>

          <h2 className="text-2xl font-bold text-navy-900 mt-10 mb-4">Mietverwaltung: Kommunikation und Vermietung</h2>
          <p className="text-gray-700 mb-4">
            Die Mietverwaltung umfasst alle Tätigkeiten rund um das Mietverhältnis:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li><strong>Mieterkommunikation:</strong> Ansprechpartner für alle Fragen der Mieter, Bearbeitung von Anfragen und Beschwerden</li>
            <li><strong>Vermietung:</strong> Besichtigungstermine, Auswahl neuer Mieter, Erstellung und Verwaltung der Mietverträge</li>
            <li><strong>Mietzahlungen:</strong> Überwachung der Zahlungseingänge, Mahnwesen bei Rückständen</li>
            <li><strong>Mieterhöhungen:</strong> Anpassung der Mieten nach VPI, qualifiziertem Mietspiegel oder Staffelmiete</li>
            <li><strong>Schönheitsreparaturen:</strong> Koordination bei Auszug und Übergabe, Abnahme und Abrechnung</li>
            <li><strong>Wohnungsübergaben:</strong> Protokollierung des Zustands bei Ein- und Auszug</li>
          </ul>
          <p className="text-gray-700 mb-4">
            Eine gute Mietverwaltung sorgt für zufriedene Mieter und schützt den Vermieter vor rechtlichen Fallstricken. 
            Der Verwalter fungiert hier als Bindeglied zwischen Eigentümer und Mietern.
          </p>

          <h2 className="text-2xl font-bold text-navy-900 mt-10 mb-4">Nebenkostenabrechnung (NKA)</h2>
          <p className="text-gray-700 mb-4">
            Die Erstellung der Nebenkostenabrechnung ist eine der zentralen Aufgaben der Hausverwaltung:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li>Erfassung und Kontrolle aller Betriebskostenrechnungen</li>
            <li>Verteilung der Kosten nach dem vereinbarten Umlageschlüssel</li>
            <li>Berücksichtigung von Mieterwechseln und Abrechnungszeiträumen</li>
            <li>Erstellung der individuellen Abrechnungen für jeden Mieter</li>
            <li>Nachforderung oder Erstattung der Differenzen</li>
          </ul>
          <p className="text-gray-700 mb-4">
            Die Nebenkostenabrechnung muss transparent und nachvollziehbar sein, um Widersprüchen vorzubeugen. 
            Moderne Verwaltungen nutzen hier digitale Tools für eine effiziente Abwicklung.
          </p>

          <h2 className="text-2xl font-bold text-navy-900 mt-10 mb-4">Technisches Management und Instandhaltung</h2>
          <p className="text-gray-700 mb-4">
            Der Verwalter ist für die technische Betreuung des Gebäudes verantwortlich:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li><strong>Instandhaltung:</strong> Planung und Überwachung von Reparaturen und Wartungsarbeiten</li>
            <li><strong>Handwerkerverwaltung:</strong> Ausschreibung, Beauftragung und Kontrolle von Handwerksbetrieben</li>
            <li><strong>Notfälle:</strong> 24/7-Erreichbarkeit bei Wasserschäden, Stromausfällen oder anderen Havarien</li>
            <li><strong>Sicherheit:</strong> Überwachung von Brandschutz, Zugangskontrollen, Aufzugsanlagen</li>
            <li><strong>Modernisierung:</strong> Planung und Umsetzung von Sanierungen und energetischen Maßnahmen</li>
          </ul>

          <h2 className="text-2xl font-bold text-navy-900 mt-10 mb-4">Rechtliche Beratung und Vertragsmanagement</h2>
          <p className="text-gray-700 mb-4">
            Hausverwalter verfügen über Fachkenntnisse im Miet- und WEG-Recht:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li><strong>Mietrecht:</strong> Kündigungen, Mieterhöhungen, Mängelbeseitigung nach BGB</li>
            <li><strong>WEG-Recht:</strong> Durchführung von Eigentümerversammlungen, Beschlussfassung, Verwaltervertrag</li>
            <li><strong>Verträge:</strong> Erstellung und Prüfung von Mietverträgen, Wartungsverträgen, Versicherungen</li>
            <li><strong>Streitschlichtung:</strong> Vermittlung bei Konflikten zwischen Eigentümern oder zwischen Vermieter und Mieter</li>
          </ul>

          <h2 className="text-2xl font-bold text-navy-900 mt-10 mb-4">WEG-Verwaltung: Besonderheiten bei Eigentumswohnungen</h2>
          <p className="text-gray-700 mb-4">
            Bei Wohnungseigentümergemeinschaften (WEG) kommen weitere Aufgaben hinzu:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li>Einberufung und Durchführung von Eigentümerversammlungen</li>
            <li>Protokollierung und Umsetzung von Beschlüssen</li>
            <li>Verwaltung der Rücklage (Instandhaltungsrücklage)</li>
            <li>Verteilung der Kosten nach WEG-Anteilen</li>
            <li>Kommunikation mit allen Wohnungseigentümern</li>
          </ul>

          <h2 className="text-2xl font-bold text-navy-900 mt-10 mb-4">Häufig gestellte Fragen</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-navy-900 mb-2">Muss ein Verwalter 24/7 erreichbar sein?</h3>
              <p className="text-gray-700">
                Für Notfälle (Wasserschaden, Heizungsausfall etc.) sollte ein Verwalter oder eine Notfallhotline 
                rund um die Uhr erreichbar sein. Für Routineanfragen genügt eine Erreichbarkeit während der 
                Geschäftszeiten. Moderne Verwaltungen bieten oft Online-Portale für einfache Anliegen.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-navy-900 mb-2">Was ist der Unterschied zwischen WEG- und Mietverwaltung?</h3>
              <p className="text-gray-700">
                Die WEG-Verwaltung betreut Eigentumswohnanlagen und verwaltet die Gemeinschaft der Eigentümer. 
                Die Mietverwaltung betreut vermietete Immobilien im Auftrag des Eigentümers. Einige Verwalter 
                bieten beide Leistungen an, andere spezialisieren sich auf einen Bereich.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-navy-900 mb-2">Darf ein Verwalter auch Bauleistungen erbringen?</h3>
              <p className="text-gray-700">
                Nach §26 Abs. 2 WEG darf der Verwalter nur mit Zustimmung aller Wohnungseigentümer oder auf 
                Grundlage eines Beschlusses der Eigentümerversammlung Bauleistungen erbringen oder beauftragen. 
                Dies soll Interessenkonflikte verhindern. Für gewerbliche Verwalter gelten ähnliche 
                Sorgfaltspflichten.
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
