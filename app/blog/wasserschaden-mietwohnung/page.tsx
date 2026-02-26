import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Wasserschaden in der Mietwohnung: Wer zahlt und was jetzt zu tun ist",
  description:
    "Wasserschaden in der Mietwohnung — was ist zu tun? Wer zahlt Mieter, wer Vermieter? § 535 BGB, Mängelanzeige, Versicherung und Fristen erklärt.",
  keywords:
    "Wasserschaden Mietwohnung, Wasserschaden wer zahlt Mieter Vermieter, Wasserschaden Mängelanzeige, Wasserschaden Hausrat, Wasserschaden BGB",
  openGraph: {
    title: "Wasserschaden in der Mietwohnung: Wer zahlt und was jetzt zu tun ist",
    description:
      "§ 535 BGB, Instandhaltungspflicht, Versicherungsschutz: Alles was Mieter und Vermieter bei einem Wasserschaden wissen müssen.",
    url: "https://einfach-verwaltet.de/blog/wasserschaden-mietwohnung",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Wasserschaden in der Mietwohnung: Wer zahlt und was jetzt zu tun ist",
  description:
    "Rechtliche Grundlagen, Kostenverteilung und Handlungsleitfaden bei Wasserschäden in Mietwohnungen — für Mieter und Vermieter.",
  author: { "@type": "Organization", name: "einfach verwaltet." },
  publisher: {
    "@type": "Organization",
    name: "einfach verwaltet.",
    logo: { "@type": "ImageObject", url: "https://einfach-verwaltet.de/logo.png" },
  },
  datePublished: "2026-02-26",
  inLanguage: "de",
  url: "https://einfach-verwaltet.de/blog/wasserschaden-mietwohnung",
};

export default function Post() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="bg-warm-white min-h-screen pt-16">
        <article className="max-w-3xl mx-auto px-4 py-16">
          <nav className="text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-teal">Startseite</Link>
            <span className="mx-2">›</span>
            <Link href="/blog" className="hover:text-teal">Ratgeber</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-700">Wasserschaden Mietwohnung</span>
          </nav>

          <header className="mb-10">
            <p className="text-teal text-sm font-semibold uppercase tracking-wider mb-3">
              Ratgeber · 8 min Lesezeit · Mieter &amp; Vermieter
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-navy font-playfair mb-4 leading-tight">
              Wasserschaden in der Mietwohnung: Wer zahlt und was jetzt zu tun ist
            </h1>
            <p className="text-gray-500 text-sm">Februar 2026 · einfach verwaltet.</p>
          </header>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <p>
              Ein tropfendes Rohr, ein geplatzter Schlauch, ein defektes Dach: Wasserschäden
              gehören zu den häufigsten und teuersten Schadensfällen in Mietwohnungen. Für
              Mieter und Vermieter stellen sich sofort dieselben Fragen — wer muss handeln,
              wer zahlt, und was ist zu tun? Dieser Leitfaden gibt Antworten.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Sofortmaßnahmen: Was bei einem Wasserschaden als erstes zu tun ist
            </h2>
            <p>
              Unabhängig davon, wer letztlich für die Kosten aufkommt — bei einem Wasserschaden
              zählt jede Minute. Jede Verzögerung kann den Schaden vergrößern und Kosten treiben.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Wasserquelle abstellen:</strong> Hauptwasserhahn schließen, wenn die
                Quelle nicht klar ist. Der Absperrhahn sitzt meist im Keller oder unter dem
                Waschbecken.
              </li>
              <li>
                <strong>Strom sichern:</strong> Bei Nässe in der Nähe von Steckdosen oder
                Elektrogeräten: Sicherungskasten abschalten und Elektriker rufen.
              </li>
              <li>
                <strong>Vermieter/Hausverwaltung sofort informieren:</strong> Die Mängelanzeige
                muss unverzüglich erfolgen — am besten schriftlich (E-Mail mit Lesebestätigung).
              </li>
              <li>
                <strong>Schaden dokumentieren:</strong> Fotos und Videos erstellen, bevor
                etwas verändert wird. Datum und Uhrzeit festhalten.
              </li>
              <li>
                <strong>Hausratversicherung informieren:</strong> Wenn eigene Gegenstände betroffen
                sind, sofort der eigenen Versicherung melden.
              </li>
            </ul>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 my-6 text-sm">
              <strong>⚠️ Wichtig:</strong> Wer Schäden nicht unverzüglich meldet, riskiert den
              Verlust von Versicherungsleistungen und kann für Folgeschäden mitverantwortlich
              gemacht werden.
            </div>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Rechtliche Grundlage: § 535 BGB — Instandhaltungspflicht des Vermieters
            </h2>
            <p>
              Das Bürgerliche Gesetzbuch regelt die Pflichten des Vermieters klar:
              Nach <strong>§ 535 Abs. 1 Satz 2 BGB</strong> ist der Vermieter verpflichtet,
              die Mietsache während der gesamten Mietzeit in einem vertragsgemäßen Zustand
              zu erhalten. Das bedeutet: Der Vermieter muss Mängel beheben — und zwar auf
              eigene Kosten, wenn er sie nicht zu verantworten hat.
            </p>
            <p>
              Konkret gilt für Wasserschäden, die auf Mängel der Bausubstanz zurückzuführen
              sind (z. B. undichtes Dach, marode Rohre, defekte Abdichtung):
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Der Vermieter muss den Schaden auf eigene Kosten beseitigen</li>
              <li>Der Vermieter trägt die Kosten der Sanierung (Trocknung, Renovierung)</li>
              <li>Der Mieter kann ab Mängelanzeige Mietminderung geltend machen (§ 536 BGB)</li>
              <li>
                Bei Untätigkeit: Mieter kann nach angemessener Frist selbst Abhilfe schaffen
                und Kostenerstattung verlangen (§ 536a Abs. 2 BGB)
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Wer zahlt was? Die Kostenfrage im Detail
            </h2>
            <p>
              Die Kostenfrage hängt davon ab, wer den Wasserschaden verursacht hat. Grob gilt:
            </p>
            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              Vermieter trägt die Kosten, wenn …
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>ein Rohrbruch in der Gebäudeinstallation vorliegt (kein Verschulden des Mieters)</li>
              <li>ein Dachschaden zum Eindringen von Wasser führt</li>
              <li>Wasser aus einer anderen Wohnung eingedrungen ist (Haftung des Verursachers)</li>
              <li>Mängel der Bausubstanz den Schaden ermöglicht haben</li>
            </ul>
            <p>
              Die <strong>Gebäudeversicherung</strong> des Vermieters deckt in der Regel Leitungswasserschäden
              am Gebäude ab. Der Schaden am Eigentum des Mieters (Möbel, Kleidung, Elektronik)
              ist damit jedoch <strong>nicht</strong> gedeckt.
            </p>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              Mieter trägt die Kosten, wenn …
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>der Mieter selbst den Schaden verursacht hat (z. B. vergessener Wasserhahn)</li>
              <li>ein Gerät des Mieters defekt war (z. B. undichte Waschmaschine)</li>
              <li>
                der Mieter seiner Anzeigepflicht nicht nachgekommen ist und der Schaden dadurch
                größer wurde
              </li>
            </ul>
            <p>
              Hier greift die <strong>Haftpflichtversicherung des Mieters</strong> — sofern
              eine vorhanden ist. Das ist ein starkes Argument dafür, bei Neuvermietungen auf
              den Nachweis einer Privathaftpflichtversicherung zu achten.
            </p>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              Der eigene Hausrat: Hausratversicherung des Mieters
            </h3>
            <p>
              Eigentum des Mieters — Möbel, Kleidung, Elektronik — ist nur über eine
              <strong> Hausratversicherung</strong> abgesichert. Diese ist freiwillig, aber
              dringend empfohlen. Fehlt sie, bleibt der Mieter auf seinen eigenen Schäden sitzen,
              selbst wenn der Vermieter für den Gebäudeschaden aufkommt.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Die Mängelanzeige: Form und Fristen
            </h2>
            <p>
              Der Mieter ist gesetzlich verpflichtet, Mängel der Mietsache dem Vermieter
              unverzüglich anzuzeigen (§ 536c BGB). Das gilt auch für Wasserschäden. Die
              Mängelanzeige sollte:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>schriftlich erfolgen (E-Mail oder Brief mit Beleg)</li>
              <li>den Mangel präzise beschreiben (was, wo, seit wann)</li>
              <li>Fotos oder Dokumentation als Anlage enthalten</li>
              <li>eine angemessene Frist zur Behebung nennen (in der Regel 7–14 Tage bei normalem Schaden, sofort bei akutem Schaden)</li>
            </ul>
            <p>
              <strong>Achtung Vermieter:</strong> Wer auf eine Mängelanzeige nicht reagiert,
              riskiert Mietminderungsansprüche des Mieters und im schlimmsten Fall Schadensersatz.
              Professionelle Hausverwaltung stellt sicher, dass Mängelanzeigen umgehend
              bearbeitet werden.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Was der Vermieter jetzt tun muss
            </h2>
            <p>
              Als Vermieter oder Hausverwaltung sind nach Eingang einer Wasserschadenmeldung
              folgende Schritte notwendig:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Schaden unverzüglich besichtigen oder besichtigen lassen</li>
              <li>Notmaßnahmen veranlassen (Wassereinzug stoppen, Trocknung beauftragen)</li>
              <li>Gebäudeversicherung informieren — Meldefrist beachten (meist 72 Stunden)</li>
              <li>Handwerker beauftragen und Terminkoordination mit Mieter sicherstellen</li>
              <li>Sanierungsmaßnahmen dokumentieren und dem Mieter bestätigen</li>
              <li>Bei längerer Unbewohnbarkeit: Ersatzunterkunft oder Mietminderung klären</li>
            </ul>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Fazit: Wasserschaden erfordert schnelles und strukturiertes Handeln
            </h2>
            <p>
              Ein Wasserschaden ist unangenehm — muss aber kein Desaster werden, wenn alle
              Beteiligten wissen, was zu tun ist. Für Mieter gilt: sofort anzeigen, dokumentieren,
              Hausratversicherung informieren. Für Vermieter gilt: unverzüglich reagieren,
              Versicherung einschalten, Sanierung koordinieren.
            </p>
            <p>
              Wer als Vermieter keine professionelle Hausverwaltung hat, merkt gerade in solchen
              Momenten, wie viel Wissen, Zeit und Koordinationsaufwand ein einziger Schaden
              verursacht. Eine erfahrene Hausverwaltung übernimmt genau das — damit Sie sich
              keine Sorgen machen müssen.
            </p>
          </div>

          <div className="mt-12 bg-teal/10 border border-teal/20 rounded-xl p-8">
            <h3 className="text-xl font-bold text-navy mb-2 font-playfair">
              Kein Stress mit Schadensfällen mehr
            </h3>
            <p className="text-gray-600 mb-4">
              einfach verwaltet. übernimmt die Koordination bei Wasserschäden — von der
              Mängelanzeige bis zur abgeschlossenen Sanierung. Transparent und zuverlässig.
            </p>
            <Link
              href="/anfrage"
              className="inline-block bg-teal text-white font-semibold px-6 py-3 rounded-lg hover:bg-teal/90 transition-colors"
            >
              Jetzt kostenlos anfragen
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
