import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Treppenhausreinigung: Pflichten des Vermieters nach Mietrecht | einfach verwaltet.",
  description:
    "Wer muss das Treppenhaus reinigen? Pflichten von Vermieter und Mieter nach Mietrecht — inklusive Kosten und rechtlicher Einordnung.",
  keywords:
    "Treppenhausreinigung Pflicht, Treppenhaus putzen Mieter, Reinigungspflicht Vermieter, Mietrecht Treppenhaus, Betriebskosten Treppenhausreinigung",
  openGraph: {
    title: "Treppenhausreinigung: Pflichten des Vermieters nach Mietrecht",
    description:
      "Wer ist für die Treppenhausreinigung zuständig? Rechtliche Klarheit für Vermieter und Mieter.",
    url: "https://einfach-verwaltet.de/blog/treppenhausreinigung-pflicht",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Treppenhausreinigung: Pflichten des Vermieters nach Mietrecht",
  description:
    "Rechtliche Einordnung der Treppenhausreinigungspflicht: Wer muss was tun und wer trägt die Kosten?",
  author: { "@type": "Organization", name: "einfach verwaltet." },
  publisher: {
    "@type": "Organization",
    name: "einfach verwaltet.",
    logo: { "@type": "ImageObject", url: "https://einfach-verwaltet.de/logo.png" },
  },
  datePublished: "2026-02-26",
  inLanguage: "de",
  url: "https://einfach-verwaltet.de/blog/treppenhausreinigung-pflicht",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Muss der Mieter das Treppenhaus putzen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nein. Die Reinigung gemeinsam genutzter Flächen wie das Treppenhaus ist grundsätzlich Aufgabe des Vermieters. Eine Übertragung dieser Pflicht auf den Mieter durch den Mietvertrag ist unwirksam (BGH, Urteil vom 20.01.2021, VIII ZR 252/19). Der Vermieter kann die Reinigung jedoch als umlagefähige Betriebskosten auf die Mieter umlegen.",
      },
    },
    {
      "@type": "Question",
      name: "Was kostet eine professionelle Treppenhausreinigung?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die Kosten für eine professionelle Treppenhausreinigung liegen je nach Region und Objektgröße zwischen €1,50 und €3,50 pro Quadratmeter und Reinigung. Bei einem durchschnittlichen Mehrfamilienhaus mit 500 m² Treppenhausfläche und wöchentlicher Reinigung ergeben sich monatliche Kosten von etwa €300–700, die auf die Mieter umgelegt werden können.",
      },
    },
    {
      "@type": "Question",
      name: "Wie oft muss das Treppenhaus gereinigt werden?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die Reinigungshäufigkeit richtet sich nach der Nutzung und dem Verschmutzungsgrad. Üblich sind wöchentliche bis zweiwöchentliche Reinigungen bei normal frequentierten Wohngebäuden. Bei stark frequentierten Objekten oder Gewerbeanteilen kann eine tägliche Reinigung erforderlich sein. Die Mindestanforderung ist die Aufrechterhaltung einer ordnungsgemäßen Beschaffenheit.",
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
            <span className="text-gray-700">Treppenhausreinigung Pflicht</span>
          </nav>

          <header className="mb-10">
            <p className="text-teal text-sm font-semibold uppercase tracking-wider mb-3">
              Ratgeber · 7 min Lesezeit
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-navy font-playfair mb-4 leading-tight">
              Treppenhausreinigung: Pflichten des Vermieters nach Mietrecht
            </h1>
            <p className="text-gray-500 text-sm">Februar 2026 · einfach verwaltet.</p>
          </header>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Wer ist für die Treppenhausreinigung zuständig?
            </h2>
            <p>
              Die Reinigung gemeinsam genutzter Bereiche wie Treppenhäuser, 
              Flure und Eingangsbereiche gehört zu den Pflichten des 
              Vermieters. Dies ergibt sich aus dem Erhaltungsgebot nach 
              § 535 Abs. 1 S. 2 BGB: Der Vermieter muss die Mietsache 
              in einem zum vertragsgemäßen Gebrauch geeigneten Zustand 
              erhalten.
            </p>
            <p className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
              <strong>Urteil des BGH (2021):</strong> Eine Klausel im 
              Mietvertrag, die dem Mieter die Reinigungspflicht für 
              Gemeinschaftsflächen auferlegt, ist unwirksam (BGH, Urteil 
              vom 20.01.2021, VIII ZR 252/19).
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Die Pflichten des Vermieters im Detail
            </h2>
            <p>
              Als Vermieter haben Sie folgende Verpflichtungen bezüglich 
              der Treppenhausreinigung:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Sicherstellung der Reinigung:</strong> Die Flächen 
                müssen in einem hygienischen und sicheren Zustand gehalten werden
              </li>
              <li>
                <strong>Angemessene Häufigkeit:</strong> Die Reinigung muss 
                der Nutzung und dem Verschmutzungsgrad angemessen sein
              </li>
              <li>
                <strong>Dokumentation:</strong> Die durchgeführten Reinigungen 
                sollten nachweisbar sein (z.B. durch Rechnungen eines 
                Reinigungsdienstes)
              </li>
              <li>
                <strong>Gefahrenabwehr:</strong> Bei Rutschgefahr durch 
                Verschmutzung muss sofort gehandelt werden
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Umlagefähigkeit der Kosten
            </h2>
            <p>
              Obwohl die Pflicht zur Reinigung beim Vermieter liegt, können 
              die Kosten auf die Mieter umgelegt werden. Die Treppenhausreinigung 
              ist eine umlagefähige Betriebskostenart nach Nr. 17 der 
              Betriebskostenverordnung (BetrKV).
            </p>
            <p>
              Voraussetzungen für die Umlage:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Die Kosten müssen tatsächlich angefallen sein</li>
              <li>Der Mietvertrag muss die Umlage von Betriebskosten vorsehen</li>
              <li>Die Umlage muss nach einem angemessenen Schlüssel erfolgen (meist Wohnfläche)</li>
              <li>Die Kosten müssen in der Nebenkostenabrechnung nachvollziehbar ausgewiesen werden</li>
            </ul>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Was umfasst die Treppenhausreinigung?
            </h2>
            <p>
              Eine professionelle Treppenhausreinigung umfasst üblicherweise:
            </p>
            <div className="bg-navy/5 border border-navy/10 rounded-xl p-6">
              <h3 className="font-bold text-navy mb-3">Leistungsumfang Treppenhausreinigung</h3>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Kehren und Wischen aller Treppenläufe und Podeste</li>
                <li>Reinigung von Geländern und Handläufen</li>
                <li>Entleeren und Reinigen von Abfalleimern</li>
                <li>Reinigung von Eingangstüren und Klingelanlagen</li>
                <li>Spiegel- und Glasreinigung</li>
                <li>Sonderreinigungen bei Bedarf (z.B. nach Bauarbeiten)</li>
                <li>Glas- und Rahmenreinigung der Fenster im Treppenhaus</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Kosten und Häufigkeit
            </h2>
            <p>
              Die Kosten für eine professionelle Treppenhausreinigung 
              hängen von verschiedenen Faktoren ab:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Größe des Objekts:</strong> Anzahl der Wohneinheiten und zu reinigende Fläche</li>
              <li><strong>Reinigungshäufigkeit:</strong> Wöchentlich, zweiwöchentlich oder täglich</li>
              <li><strong>Standort:</strong> Regionale Preisunterschiede bei Reinigungsdiensten</li>
              <li><strong>Spezielle Anforderungen:</strong> Denkmalschutz, besondere Materialien</li>
            </ul>
            <p>
              Bei einem durchschnittlichen Mehrfamilienhaus mit 10 Wohneinheiten 
              und wöchentlicher Reinigung liegen die Kosten typischerweise bei 
              €200–400 pro Monat, also etwa €20–40 pro Wohnung.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Eigenleistung vs. Fremdvergabe
            </h2>
            <p>
              Der Vermieter kann die Reinigung grundsätzlich selbst durchführen 
              oder an einen Dienstleister vergeben. Für die Eigenleistung gilt:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Die Kosten dürfen nur mit einem angemessenen Stundensatz 
                auf die Mieter umgelegt werden
              </li>
              <li>
                Die Arbeitszeit muss nachweisbar dokumentiert sein
              </li>
              <li>
                Materialkosten (Reinigungsmittel, Geräte) sind als 
                Betriebskosten umlagefähig
              </li>
            </ul>
            <p>
              Die Fremdvergabe an einen professionellen Reinigungsdienst 
              ist empfehlenswert, da:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Die Qualität gewährleistet ist</li>
              <li>Die Kosten transparent und nachweisbar sind</li>
              <li>Haftungsfragen bei Unfällen geklärt sind</li>
              <li>Bei Ausfall Ersatz organisiert werden kann</li>
            </ul>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              FAQ: Treppenhausreinigung
            </h2>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-navy mb-2">
                  Muss der Mieter das Treppenhaus putzen?
                </h3>
                <p className="text-sm">
                  Nein. Die Reinigungspflicht liegt beim Vermieter. Eine 
                  Übertragung auf den Mieter ist unwirksam.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-navy mb-2">
                  Was kostet eine professionelle Treppenhausreinigung?
                </h3>
                <p className="text-sm">
                  Etwa €1,50–3,50 pro m². Bei einem 10-Parteien-Haus mit 
                  wöchentlicher Reinigung: €200–400/Monat.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-navy mb-2">
                  Wie oft muss das Treppenhaus gereinigt werden?
                </h3>
                <p className="text-sm">
                  Normalerweise wöchentlich bis zweiwöchentlich. Bei 
                  stark frequentierten Objekten täglich.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Fazit: Klarheit schafft Sicherheit
            </h2>
            <p>
              Die rechtliche Lage ist eindeutig: Die Treppenhausreinigung 
              ist Pflicht des Vermieters, kann aber als Betriebskosten auf 
              die Mieter umgelegt werden. Wer diese Grundsätze beachtet, 
              vermeidet Konflikte und stellt die Wohnqualität im Objekt 
              sicher.
            </p>
          </div>

          <div className="mt-12 bg-teal/10 border border-teal/20 rounded-xl p-8">
            <h3 className="text-xl font-bold text-navy mb-2 font-playfair">
              Professionelle Gebäudereinigung inklusive
            </h3>
            <p className="text-gray-600 mb-4">
              einfach verwaltet. organisiert die Treppenhausreinigung 
              über zertifizierte Partner — inklusive Dokumentation für 
              Ihre Betriebskostenabrechnung.
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
