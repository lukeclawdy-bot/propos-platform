import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Hausverwaltung Dortmund — Ihr zuverlässiger Partner im Ruhrgebiet | einfach verwaltet.",
  description:
    "Hausverwaltung Dortmund: Professionelle Mietverwaltung und WEG-Verwaltung für Dortmunder Eigentümer. §34c GewO, Reaktionszeit unter 15 Minuten, transparente Preise.",
  keywords:
    "Hausverwaltung Dortmund, WEG-Verwaltung Dortmund, Mietverwaltung Dortmund, Hausverwaltung Ruhrgebiet",
  openGraph: {
    title: "Hausverwaltung Dortmund — Ihr zuverlässiger Partner im Ruhrgebiet",
    description:
      "Mietverwaltung und WEG-Verwaltung in Dortmund — digital, transparent, immer erreichbar.",
    url: "https://einfach-verwaltet.de/blog/hausverwaltung-dortmund",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "article",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "einfach verwaltet.",
  description:
    "Professionelle Hausverwaltung in Dortmund und dem Ruhrgebiet. Mietverwaltung, WEG-Verwaltung, Sondereigentumsverwaltung.",
  url: "https://einfach-verwaltet.de",
  email: "kontakt@einfach-verwaltet.de",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Singapurstr. 19",
    addressLocality: "Hamburg",
    postalCode: "20457",
    addressCountry: "DE",
  },
  areaServed: ["Dortmund", "Ruhrgebiet", "Nordrhein-Westfalen"],
  serviceType: ["Hausverwaltung", "WEG-Verwaltung", "Mietverwaltung"],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was kostet eine Hausverwaltung in Dortmund?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In Dortmund liegen die marktüblichen Preise für professionelle Hausverwaltung zwischen €22 und €38 pro Einheit und Monat. Bei einfach verwaltet. zahlen Sie €24–34/Einheit/Monat — inklusive digitalem Mieterportal und 15-Minuten-Reaktionszeit.",
      },
    },
    {
      "@type": "Question",
      name: "Verwalten Sie auch WEGs in Dortmund?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, wir übernehmen die vollständige WEG-Verwaltung nach WEGMoG 2020. Das umfasst Eigentümerversammlungen, Beschlussprotokolle, Hausgeldabrechnung und Instandhaltungsrücklage.",
      },
    },
    {
      "@type": "Question",
      name: "Wie funktioniert der Wechsel zu einfach verwaltet.?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Der Wechsel dauert in der Regel 4–6 Wochen. Wir koordinieren die Unterlagenübergabe mit dem alten Verwalter, übernehmen alle laufenden Verträge und informieren Ihre Mieter. Sie müssen sich um nichts kümmern.",
      },
    },
  ],
};

export default function HausverwaltungDortmund() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <main className="bg-warm-white min-h-screen pt-16">
        <div className="bg-navy py-16 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="inline-block bg-teal/20 text-teal text-xs font-semibold px-3 py-1 rounded-full mb-4">
              Hausverwaltung Dortmund
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Hausverwaltung Dortmund — Ihr zuverlässiger Partner im Ruhrgebiet
            </h1>
            <p className="text-white/70 text-lg">
              Professionelle Mietverwaltung und WEG-Verwaltung in Dortmund — digital, schnell und rechtssicher.
            </p>
            <div className="flex items-center gap-4 mt-6 text-white/50 text-sm">
              <span>Februar 2026</span>
              <span>·</span>
              <span>8 min Lesezeit</span>
            </div>
          </div>
        </div>

        <article className="max-w-3xl mx-auto px-4 py-12">
          <nav className="text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-teal">Startseite</Link>
            <span className="mx-2">›</span>
            <Link href="/blog" className="hover:text-teal">Ratgeber</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-700">Hausverwaltung Dortmund</span>
          </nav>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">

            <h2 className="text-2xl font-bold text-navy mt-2 mb-4">
              Dortmund als Immobilienstandort — was Eigentümer wissen müssen
            </h2>
            <p>
              Dortmund ist mit über 600.000 Einwohnern die größte Stadt des Ruhrgebiets und hat sich in den letzten Jahren zu einem attraktiven Immobilienmarkt entwickelt. Steigende Mieten, eine wachsende Hochschulpopulation und der Strukturwandel von der Industriestadt zur Dienstleistungs- und Logistikmetropole schaffen neue Chancen für Eigentümer — aber auch neue Anforderungen an eine professionelle <strong>Hausverwaltung in Dortmund</strong>.
            </p>
            <p>
              Viele Eigentümer kämpfen mit denselben Problemen: langsame Reaktionszeiten des Verwalters, fehlerhafte Betriebskostenabrechnungen oder fehlende Transparenz bei Handwerkerkosten. Dabei sind die rechtlichen Anforderungen klar definiert — von der Abrechnungsfrist nach §556 BGB über die WEG-Pflichten nach §28 WEG bis zur Gewerberlaubnispflicht nach §34c GewO.
            </p>

            <h2 className="text-2xl font-bold text-navy mt-10 mb-4">
              Mietverwaltung in Dortmund: Was leisten wir?
            </h2>
            <p>
              Als Verwalter Ihrer Mietimmobilien in Dortmund übernehmen wir den kompletten operativen Betrieb:
            </p>
            <ul className="space-y-2 my-4 pl-4">
              <li className="flex items-start gap-2"><span className="text-teal mt-1">✓</span><span><strong>Mieteinzug und Mahnwesen</strong> — automatisierter SEPA-Einzug, 3-stufiges Mahnverfahren nach §286 BGB, Übergabe an Rechtsanwalt bei Bedarf</span></li>
              <li className="flex items-start gap-2"><span className="text-teal mt-1">✓</span><span><strong>Nebenkostenabrechnung</strong> — fristgerecht nach §556 BGB, vollständige Belegablage, digitale Übermittlung</span></li>
              <li className="flex items-start gap-2"><span className="text-teal mt-1">✓</span><span><strong>Handwerker-Netzwerk Ruhrgebiet</strong> — qualifizierte Partner für alle Gewerke, Kostenfreigabe durch Sie</span></li>
              <li className="flex items-start gap-2"><span className="text-teal mt-1">✓</span><span><strong>24/7 Notfallservice</strong> — für echte Notfälle wie Wasserschaden, Heizungsausfall</span></li>
              <li className="flex items-start gap-2"><span className="text-teal mt-1">✓</span><span><strong>Wohnungsübergaben</strong> — professionelle Protokollierung, Schlüsselmanagement, Fotodokumentation</span></li>
            </ul>

            <h2 className="text-2xl font-bold text-navy mt-10 mb-4">
              WEG-Verwaltung Dortmund: Nach WEGMoG 2020
            </h2>
            <p>
              Das WEGMoG 2020 hat die Rechte und Pflichten von Eigentümergemeinschaften grundlegend neu geregelt. Für <strong>WEG-Verwaltung in Dortmund</strong> bedeutet das konkret:
            </p>
            <div className="bg-light-gray rounded-xl p-5 my-4 text-sm space-y-3 not-prose">
              <div>
                <strong className="text-navy">Eigentümerversammlung (§24 WEG):</strong> Wir laden fristgerecht ein (mindestens 2 Wochen), erstellen die Tagesordnung, leiten die Versammlung und protokollieren alle Beschlüsse.
              </div>
              <div>
                <strong className="text-navy">Online-Eigentümerversammlung:</strong> Seit WEGMoG möglich — wir organisieren hybride oder rein digitale Versammlungen für Eigentümergemeinschaften in Dortmund.
              </div>
              <div>
                <strong className="text-navy">Hausgeldabrechnung (§28 WEG):</strong> Vollständige Jahresabrechnung mit Einzel- und Gesamtabrechnung, Vermögensbericht und Wirtschaftsplan für das Folgejahr.
              </div>
              <div>
                <strong className="text-navy">Instandhaltungsrücklage:</strong> Angemessene Bildung nach §19 Abs. 2 Nr. 4 WEG, Anlage auf separatem Verwahrkonto, transparente Übersicht im Owner Dashboard.
              </div>
            </div>

            <h2 className="text-2xl font-bold text-navy mt-10 mb-4">
              Hausverwaltung wechseln in Dortmund: So geht es
            </h2>
            <p>
              Ein Verwalterwechsel muss kein Kraftakt sein. Unser bewährter Prozess:
            </p>
            <div className="not-prose space-y-3 my-4">
              {[
                { step: "1", title: "Unverbindliches Gespräch", desc: "Wir analysieren Ihre aktuelle Situation und zeigen Ihnen konkret, was wir besser machen." },
                { step: "2", title: "Kündigung koordinieren", desc: "Wir prüfen Ihren Verwaltervertrag und begleiten die Kündigung rechtssicher." },
                { step: "3", title: "Unterlagen übernehmen", desc: "Wir organisieren die Übergabe aller Dokumente, Konten und Zugangsdaten vom alten Verwalter." },
                { step: "4", title: "Mieter informieren", desc: "Schriftliche Information aller Mieter über den Verwalterwechsel — neue Kontaktdaten, neue Bankverbindung." },
              ].map((s) => (
                <div key={s.step} className="flex items-start gap-4 bg-white border border-navy/10 rounded-xl p-4">
                  <div className="w-8 h-8 rounded-full bg-navy text-white flex items-center justify-center text-sm font-bold flex-shrink-0">{s.step}</div>
                  <div>
                    <p className="font-semibold text-navy">{s.title}</p>
                    <p className="text-text-light text-sm">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-navy mt-10 mb-4">
              Kosten der Hausverwaltung in Dortmund
            </h2>
            <p>
              Marktübliche Preise für <strong>Hausverwaltung Dortmund</strong>:
            </p>
            <div className="not-prose overflow-x-auto rounded-xl border border-navy/10 my-4">
              <table className="w-full text-sm">
                <thead className="bg-navy text-white">
                  <tr>
                    <th className="py-3 px-4 text-left">Leistungspaket</th>
                    <th className="py-3 px-4 text-center">Preis/Einheit/Monat</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="py-3 px-4">Basis (Mieteinzug + NKA)</td>
                    <td className="py-3 px-4 text-center">€24–28</td>
                  </tr>
                  <tr className="bg-light-gray">
                    <td className="py-3 px-4">Standard (+ Handwerker-Service)</td>
                    <td className="py-3 px-4 text-center">€28–32</td>
                  </tr>
                  <tr className="bg-white font-semibold text-teal">
                    <td className="py-3 px-4">Premium (+ WEG-Verwaltung)</td>
                    <td className="py-3 px-4 text-center">€32–34</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-text-light">
              Individuelle Angebote ab 2 Einheiten. Keine Vertragslaufzeit über 12 Monate, 3 Monate Kündigungsfrist.
            </p>

            <h2 className="text-2xl font-bold text-navy mt-10 mb-4">
              Häufige Fragen zur Hausverwaltung Dortmund
            </h2>

            <div className="not-prose space-y-4 my-4">
              <div className="bg-white border border-navy/10 rounded-xl p-5">
                <p className="font-semibold text-navy mb-2">Was kostet eine Hausverwaltung in Dortmund?</p>
                <p className="text-text-light text-sm">Marktüblich sind €22–38/Einheit/Monat. Bei einfach verwaltet. zahlen Sie €24–34 — inklusive digitalem Mieterportal und garantierter 15-Minuten-Reaktionszeit.</p>
              </div>
              <div className="bg-white border border-navy/10 rounded-xl p-5">
                <p className="font-semibold text-navy mb-2">Verwalten Sie auch WEGs in Dortmund?</p>
                <p className="text-text-light text-sm">Ja. Wir übernehmen die vollständige WEG-Verwaltung nach WEGMoG 2020 — inklusive Eigentümerversammlungen, Beschlussprotokolle und Hausgeldabrechnung.</p>
              </div>
              <div className="bg-white border border-navy/10 rounded-xl p-5">
                <p className="font-semibold text-navy mb-2">Wie funktioniert der Wechsel zu einfach verwaltet.?</p>
                <p className="text-text-light text-sm">Der Wechsel dauert 4–6 Wochen. Wir koordinieren die Übergabe komplett — Sie müssen sich um nichts kümmern.</p>
              </div>
            </div>

            <div className="not-prose bg-amber/10 border border-amber/30 rounded-2xl p-7 my-8 text-center">
              <h3 className="text-xl font-bold text-navy mb-2">Jetzt Angebot für Dortmund anfragen</h3>
              <p className="text-text-light text-sm mb-5">Kostenlos und unverbindlich — Angebot innerhalb von 24 Stunden.</p>
              <Link
                href="/anfrage"
                className="inline-flex items-center gap-2 bg-amber hover:bg-amber/90 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Jetzt Angebot anfragen →
              </Link>
            </div>

          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
