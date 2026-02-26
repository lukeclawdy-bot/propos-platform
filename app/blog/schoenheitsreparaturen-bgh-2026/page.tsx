import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Schönheitsreparaturen 2026: Was Vermieter nach BGH-Urteilen wissen müssen | einfach verwaltet.",
  description:
    "Schönheitsreparaturen Vermieter: Welche Klauseln unwirksam sind, wann Mieter renovieren müssen und was BGH-Urteile 2024–2026 für Hamburger Vermieter bedeuten.",
  keywords:
    "Schönheitsreparaturen Vermieter, Schönheitsreparaturen BGH, Renovierungspflicht Mieter, Schönheitsreparaturen unwirksam",
  openGraph: {
    title: "Schönheitsreparaturen 2026: Was Vermieter nach BGH-Urteilen wissen müssen",
    description:
      "Unwirksame Klauseln, Renovierungspflicht des Mieters, Quotenabgeltung — der aktuelle Stand nach BGH-Rechtsprechung.",
    url: "https://einfach-verwaltet.de/blog/schoenheitsreparaturen-bgh-2026",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Schönheitsreparaturen 2026: Was Vermieter nach BGH-Urteilen wissen müssen",
  description:
    "Unwirksame Klauseln, Fristenpläne, Quotenabgeltung — der aktuelle Stand der BGH-Rechtsprechung zu Schönheitsreparaturen für Vermieter.",
  author: { "@type": "Organization", name: "einfach verwaltet." },
  publisher: {
    "@type": "Organization",
    name: "einfach verwaltet.",
    logo: { "@type": "ImageObject", url: "https://einfach-verwaltet.de/logo.png" },
  },
  datePublished: "2026-02-01",
  inLanguage: "de",
  url: "https://einfach-verwaltet.de/blog/schoenheitsreparaturen-bgh-2026",
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
            <span className="text-gray-700">Schönheitsreparaturen BGH 2026</span>
          </nav>

          <header className="mb-10">
            <p className="text-teal text-sm font-semibold uppercase tracking-wider mb-3">
              Ratgeber · 7 min Lesezeit
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-navy font-playfair mb-4 leading-tight">
              Schönheitsreparaturen 2026: Was Vermieter nach BGH-Urteilen beachten müssen
            </h1>
            <p className="text-gray-500 text-sm">Februar 2026 · einfach verwaltet.</p>
          </header>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">

            <p>
              Kaum ein Thema beschäftigt Vermieter und Mieter gleichermaßen so intensiv wie
              Schönheitsreparaturen. Der BGH hat in den vergangenen Jahren zahlreiche Klauseln für unwirksam
              erklärt — was dazu geführt hat, dass viele Mietverträge, die noch vor zehn Jahren als
              &bdquo;sicher&ldquo; galten, heute keine Renovierungspflicht mehr begründen. Dieser Überblick
              zeigt den aktuellen Stand.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Was sind Schönheitsreparaturen überhaupt?
            </h2>
            <p>
              Schönheitsreparaturen sind laufende Instandhaltungsarbeiten, die den normalen Verschleiß durch
              den Wohnbetrieb beseitigen. Dazu zählen nach <strong>§ 28 Abs. 4 Satz 3 der II. Berechnungsverordnung</strong>:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Streichen und Tapezieren von Wänden und Decken</li>
              <li>Streichen der Fußböden</li>
              <li>Streichen bzw. Lackieren von Heizkörpern und Heizungsrohren</li>
              <li>Streichen der Innentüren sowie Fenster und Außentüren von innen</li>
            </ul>
            <p>
              <strong>Nicht</strong> zu den Schönheitsreparaturen gehören: Teppichböden reinigen oder
              erneuern, Parkettschleifen, Fenster putzen oder Küchenfliesen erneuern. Diese Maßnahmen
              können nicht per Schönheitsreparaturklausel auf den Mieter abgewälzt werden.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Die wichtigsten BGH-Entscheidungen im Überblick
            </h2>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-3">
              Unrenovierte Wohnung bei Einzug (BGH, Urt. v. 18.03.2015, Az. VIII ZR 185/14)
            </h3>
            <p>
              Wer eine <em>unrenovierte Wohnung</em> übernimmt, kann nicht zur Renovierung beim Auszug
              verpflichtet werden — es sei denn, es wurde ein angemessener Ausgleich (z. B. Mietminderung
              oder Renovierungszuschuss) vereinbart. Das gilt auch dann, wenn im Mietvertrag eine
              Renovierungspflicht steht. Wurde die Wohnung unrenoviert übergeben und kein Ausgleich
              gewährt, ist die gesamte Schönheitsreparaturklausel unwirksam.
            </p>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-3">
              Starre Fristenpläne sind unwirksam
            </h3>
            <p>
              Klauseln, die Renovierungsfristen starr festlegen — z. B. &bdquo;alle 3 Jahre Küche und Bad,
              alle 5 Jahre Wohnräume&ldquo; — ohne die Möglichkeit, den tatsächlichen Zustand der Wohnung
              zu berücksichtigen, hat der BGH wiederholt für unwirksam erklärt (u.a. BGH VIII ZR 101/14).
              Zulässig sind nur <em>flexible</em> Formulierungen, die auf den Renovierungsbedarf abstellen.
            </p>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-3">
              Farbwahlklauseln bei laufender Miete
            </h3>
            <p>
              Klauseln, die dem Mieter während der Mietzeit eine bestimmte Farbe (z. B. weiß) vorschreiben,
              sind unwirksam. Der Mieter darf seine Wohnung nach eigenem Geschmack gestalten — muss aber
              beim Auszug in einen neutralen Zustand zurückversetzen. Klauseln, die nur für den Auszug
              eine Übergabe in hellen, deckenden Farben verlangen, sind nach BGH dagegen zulässig.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Quotenabgeltungsklauseln: Seit 2015 weitgehend unwirksam
            </h2>
            <p>
              Quotenabgeltungsklauseln sollten den Mieter anteilig für Renovierungen zahlen lassen, wenn
              er vor Ablauf der Renovierungsfristen auszieht. Der BGH hat diese Klauseln 2015 (VIII ZR 242/13)
              grundsätzlich für unwirksam erklärt, weil sie auf starren Fristenplänen beruhen und den Mieter
              unangemessen benachteiligen.
            </p>
            <p>
              Für Vermieter bedeutet das: Wer auf Quotenabgeltung setzt, wird damit vor Gericht kaum
              durchdringen. Die einzige verlässliche Strategie ist ein Mietvertrag mit wirksamer
              Renovierungsklausel von Anfang an.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Was bleibt? Wann Vermieter Schäden ersetzt bekommen
            </h2>
            <p>
              Auch wenn viele Klauseln unwirksam sind: Für <em>über den normalen Verschleiß hinausgehende
              Beschädigungen</em> haftet der Mieter weiterhin nach § 280 BGB. Das umfasst etwa Löcher in
              Wänden, zerkratzte Parkettböden oder stark verschmutzte Teppiche.
            </p>
            <p>
              Entscheidend ist die Dokumentation: Ein lückenloses Übergabeprotokoll mit Fotos bei Ein- und
              Auszug ist die wichtigste Grundlage für Schadensersatzansprüche. Fehlt das Protokoll,
              wird es schwer, den Ausgangszustand der Wohnung nachzuweisen.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Praktische Empfehlungen für Vermieter in Hamburg
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Bestehende Mietverträge prüfen lassen</strong> — viele Klauseln aus den 2000er und
                2010er Jahren sind unwirksam. Kennen Sie Ihren Ist-Stand.
              </li>
              <li>
                <strong>Neue Verträge rechtssicher formulieren</strong> — flexible Renovierungsklauseln,
                kein starrer Fristenplan, keine Farbvorschriften während der Mietzeit.
              </li>
              <li>
                <strong>Wohnungsübergabe immer protokollieren</strong> — mit Fotos, Zeugen und
                Unterschrift beider Parteien.
              </li>
              <li>
                <strong>Renovierten Zustand bei Einzug dokumentieren</strong> — nur dann kann eine
                wirksame Renovierungspflicht entstehen.
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Fazit: Unwirksame Klauseln sind das Hauptproblem
            </h2>
            <p>
              Die meisten Streitigkeiten um Schönheitsreparaturen entstehen nicht weil Vermieter böswillig
              handeln, sondern weil sie Klauseln verwenden, die längst nicht mehr halten, was sie versprechen.
              Wer seinen Mietvertrag kennt und die Übergabe sauber dokumentiert, ist für den Regelfall gut
              aufgestellt — und kann im Streitfall die eigenen Ansprüche durchsetzen.
            </p>

          </div>

          {/* CTA */}
          <div className="mt-14 bg-teal/10 border border-teal/20 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-navy mb-3 font-playfair">
              Mietverträge, die halten — und Übergaben, die schützen
            </h2>
            <p className="text-gray-600 mb-6">
              Wir sorgen für rechtssichere Mietvertragsgestaltung, lückenlose Übergabeprotokolle und
              professionelles Schadensmanagement — damit Sie im Streitfall auf der sicheren Seite stehen.
            </p>
            <Link
              href="/anfrage"
              className="inline-block bg-teal text-white font-semibold px-8 py-3 rounded-lg hover:bg-teal/90 transition-colors"
            >
              Jetzt unverbindlich anfragen
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
