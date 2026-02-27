import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Vermieter Pflichten im Winter: Heizung, Schneeräumen und mehr | einfach verwaltet.",
  description:
    "Welche Winterpflichten hat der Vermieter? Heiztemperaturen, Streupflicht, Dachlawinen, Rohrsicherung — Überblick über alle gesetzlichen Anforderungen.",
  keywords:
    "Vermieter Pflichten Winter, Streupflicht Vermieter, Heizpflicht Vermieter, Mindesttemperatur Heizung, Schneeräumen Vermieter",
  openGraph: {
    title: "Vermieter Pflichten im Winter: Heizung, Schneeräumen und mehr",
    description:
      "Was Vermieter im Winter leisten müssen: Heizung, Streupflicht, Dachlawinen — der komplette Überblick.",
    url: "https://einfach-verwaltet.de/blog/vermieter-pflichten-winter-heizung-schnee",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Vermieter Pflichten im Winter: Heizung, Schneeräumen und mehr",
  description:
    "Alle gesetzlichen Winterpflichten des Vermieters: Heizung, Streupflicht, Dachlawinen, Rohrsicherung.",
  author: { "@type": "Organization", name: "einfach verwaltet." },
  publisher: {
    "@type": "Organization",
    name: "einfach verwaltet.",
    logo: { "@type": "ImageObject", url: "https://einfach-verwaltet.de/logo.png" },
  },
  datePublished: "2026-02-27",
  inLanguage: "de",
  url: "https://einfach-verwaltet.de/blog/vermieter-pflichten-winter-heizung-schnee",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Welche Mindesttemperatur muss der Vermieter gewährleisten?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Der Vermieter muss während der Heizperiode (1. Oktober bis 30. April) in Wohnräumen tagsüber mindestens 20–22°C und nachts mindestens 18°C sicherstellen. Bei Unterschreitung liegt ein Mietmangel vor, der zur Mietminderung berechtigt.",
      },
    },
    {
      "@type": "Question",
      name: "Wer muss Schnee räumen — Vermieter oder Mieter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Grundsätzlich liegt die Streupflicht beim Eigentümer. Diese kann per Mietvertrag oder Hausordnung auf Mieter übertragen werden. Ohne entsprechende Klausel ist der Vermieter in der Pflicht — er haftet bei Unfällen auf dem Grundstücksweg.",
      },
    },
    {
      "@type": "Question",
      name: "Wie früh muss Schnee geräumt werden?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die genauen Zeiten regeln kommunale Satzungen. Üblich ist werktags ab 7:00 Uhr und sonntags ab 8:00 oder 9:00 Uhr. Am Abend muss bis etwa 20:00 Uhr gestreut werden. Eis und Schnee sind unverzüglich nach dem Aufhören des Schneefalls zu beseitigen.",
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
            <span className="text-gray-700">Vermieter Pflichten Winter</span>
          </nav>

          <header className="mb-10">
            <p className="text-teal text-sm font-semibold uppercase tracking-wider mb-3">
              Ratgeber · 9 min Lesezeit
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-navy font-playfair mb-4 leading-tight">
              Vermieter Pflichten im Winter: Heizung, Schneeräumen und mehr
            </h1>
            <p className="text-gray-500 text-sm">Februar 2026 · einfach verwaltet.</p>
          </header>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <p>
              Der Winter bringt für Vermieter besondere Pflichten mit sich. Wer seinen
              Verpflichtungen nicht nachkommt, riskiert Mietminderungen, Bußgelder und
              im schlimmsten Fall Schadensersatzklagen. Dieser Ratgeber gibt einen
              vollständigen Überblick über alle gesetzlichen Anforderungen.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              1. Heizpflicht: Mindesttemperaturen einhalten
            </h2>
            <p>
              Die wichtigste Winterpflicht ist die Heizpflicht. Der Vermieter ist nach
              § 535 Abs. 1 BGB verpflichtet, die Mietsache in einem vertragsgemäßen
              Zustand zu erhalten — dazu gehört ausreichende Beheizung.
            </p>

            <div className="bg-navy/5 border border-navy/10 rounded-xl p-6">
              <h3 className="font-bold text-navy mb-3">Mindesttemperaturen im Überblick</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between border-b border-navy/10 pb-2">
                  <span>Wohnräume tagsüber (06:00–23:00 Uhr)</span>
                  <span className="font-semibold text-navy">mindestens 20–22°C</span>
                </div>
                <div className="flex justify-between border-b border-navy/10 pb-2">
                  <span>Wohnräume nachts (23:00–06:00 Uhr)</span>
                  <span className="font-semibold text-navy">mindestens 18°C</span>
                </div>
                <div className="flex justify-between border-b border-navy/10 pb-2">
                  <span>Badezimmer</span>
                  <span className="font-semibold text-navy">mindestens 21°C</span>
                </div>
                <div className="flex justify-between">
                  <span>Heizperiode</span>
                  <span className="font-semibold text-navy">1. Oktober – 30. April</span>
                </div>
              </div>
            </div>

            <p>
              Werden diese Temperaturen nicht erreicht, liegt ein Mietmangel vor. Mieter
              können dann gemäß § 536 BGB die Miete mindern — bei vollständigem
              Heizungsausfall um bis zu 100%.
            </p>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              Was tun bei Heizungsausfall?
            </h3>
            <p>
              Meldet ein Mieter einen Heizungsausfall, muss der Vermieter unverzüglich
              handeln. Die Rechtsprechung geht von einer Reaktionspflicht innerhalb weniger
              Stunden aus. Bei längeren Ausfällen sind Interimsheizlösungen zu stellen.
              Vermieter, die über eine professionelle Hausverwaltung verfügen, sind hier
              klar im Vorteil: Ein 24/7-Bereitschaftsdienst sorgt für schnelle Reaktion.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              2. Streupflicht: Sicherheit auf Gehwegen und Zufahrten
            </h2>
            <p>
              Die Verkehrssicherungspflicht verpflichtet Grundstückseigentümer dazu,
              Gehwege und Zufahrten auf ihrem Grundstück von Schnee und Eis zu räumen.
              Grundlage ist § 823 BGB (Schadensersatzpflicht bei Verletzung der
              Verkehrssicherungspflicht).
            </p>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              Übertragung auf Mieter
            </h3>
            <p>
              Der Vermieter kann die Streupflicht per Mietvertrag oder Hausordnung auf
              die Mieter übertragen. Wichtig dabei:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Die Übertragung muss <strong>ausdrücklich und eindeutig</strong> vereinbart sein</li>
              <li>Der Vermieter bleibt in einer <strong>Kontrollpflicht</strong> — er muss prüfen, ob Mieter ihrer Pflicht nachkommen</li>
              <li>Bei längeren Abwesenheiten der Mieter (Urlaub) bleibt der Vermieter verantwortlich</li>
              <li>Für öffentliche Gehwege vor dem Grundstück gilt die jeweilige <strong>kommunale Streusatzung</strong></li>
            </ul>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              Zeitliche Anforderungen
            </h3>
            <p>
              Die genauen Räumzeiten regeln Gemeinden und Städte in ihren Satzungen.
              Typisch sind:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Werktags: ab 7:00 Uhr morgens</li>
              <li>Sonn- und Feiertage: ab 8:00 oder 9:00 Uhr</li>
              <li>Abends: bis ca. 20:00 Uhr bei anhaltendem Schneefall</li>
            </ul>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              3. Dachlawinen und Eiszapfen: Sicherungspflicht
            </h2>
            <p>
              Bei starkem Schneefall können sich auf Dächern gefährliche Schnee- und
              Eismengen ansammeln. Vermieter müssen Gefahrenstellen sichern und bei
              Bedarf Fachleute beauftragen, um Dachlawinen oder herabfallende Eiszapfen
              zu entfernen.
            </p>
            <p>
              Besonders bei Dächern mit starker Neigung, älteren Gebäuden und
              Garagenzufahrten besteht erhöhtes Risiko. Eine regelmäßige Begehung durch
              den Hausmeister oder die Hausverwaltung ist empfehlenswert.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              4. Frostschutz: Rohre und Leitungen sichern
            </h2>
            <p>
              Der Vermieter ist verpflichtet, das Gebäude so instand zu halten, dass
              Wasserleitungen bei Frost nicht einfrieren. Das umfasst:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Isolierung von Außenleitungen</strong> — insbesondere in unbeheizten
                Kellern und Dachböden
              </li>
              <li>
                <strong>Absperrhähne zugänglich halten</strong> — Mieter müssen im Notfall
                die Wasserversorgung abstellen können
              </li>
              <li>
                <strong>Mindesttemperatur in Keller und Dachboden</strong> — ungeheizte
                Bereiche müssen ausreichend isoliert sein
              </li>
            </ul>
            <p>
              Frieren Leitungen durch mangelnde Instandhaltung des Vermieters ein, haftet
              dieser für den entstandenen Wasserschaden. Mieter müssen ihrerseits
              ausreichend heizen und Fenster nicht dauerhaft gekippt lassen.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              5. Nebenkostenabrechnung: Winterdienst korrekt abrechnen
            </h2>
            <p>
              Die Kosten für den Winterdienst — also professionelles Schneefräsen,
              Streusalz und Hausmeisterservice — können als Betriebskosten auf Mieter
              umgelegt werden (§ 2 Nr. 8 und Nr. 10 BetrKV). Voraussetzung: Sie sind im
              Mietvertrag als umlagefähige Betriebskosten ausgewiesen.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              FAQ: Vermieter Pflichten Winter
            </h2>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-navy mb-2">
                  Welche Mindesttemperatur muss der Vermieter gewährleisten?
                </h3>
                <p className="text-sm">
                  In Wohnräumen tagsüber mindestens 20–22°C, nachts mindestens 18°C.
                  Im Badezimmer mindestens 21°C. Die Heizperiode läuft vom 1. Oktober
                  bis 30. April.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-navy mb-2">
                  Wer räumt Schnee — Vermieter oder Mieter?
                </h3>
                <p className="text-sm">
                  Grundsätzlich der Vermieter. Die Pflicht kann aber per Mietvertrag
                  oder Hausordnung auf Mieter übertragen werden. Der Vermieter bleibt
                  jedoch in der Kontrollpflicht.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-navy mb-2">
                  Kann ich den Winterdienst auf Mieter umlegen?
                </h3>
                <p className="text-sm">
                  Ja, wenn der Winterdienst im Mietvertrag als umlagefähige Betriebskosten
                  ausgewiesen ist. Grundlage ist § 2 Nr. 8/10 BetrKV.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Fazit: Prävention ist besser als Haftung
            </h2>
            <p>
              Die Winterpflichten des Vermieters sind vielfältig. Wer einen Hausmeisterservice
              oder eine professionelle Hausverwaltung beauftragt, delegiert diese Aufgaben
              rechtssicher. Das spart nicht nur Zeit, sondern schützt auch vor
              Haftungsrisiken — ein Ausrutscher auf ungepflastertem Eis kann teuer werden.
            </p>
          </div>

          <div className="mt-12 bg-teal/10 border border-teal/20 rounded-xl p-8">
            <h3 className="text-xl font-bold text-navy mb-2 font-playfair">
              Winterpflichten rechtssicher delegieren
            </h3>
            <p className="text-gray-600 mb-4">
              einfach verwaltet. übernimmt Heizungsmonitoring, Winterdienst-Koordination
              und alle Verkehrssicherungspflichten für Ihre Immobilie.
            </p>
            <Link
              href="/anfrage"
              className="inline-block bg-teal text-white font-semibold px-6 py-3 rounded-lg hover:bg-teal/90 transition-colors"
            >
              Jetzt Angebot anfordern
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
