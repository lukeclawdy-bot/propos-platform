import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Hausverwaltung selbst machen vs. Verwalter beauftragen | einfach verwaltet.",
  description:
    "Selbstverwalten oder Hausverwaltung beauftragen? Kosten, Zeitaufwand und Risiken im ehrlichen Vergleich für private Vermieter.",
  keywords:
    "Hausverwaltung selbst machen, Selbstverwaltung Immobilie, Hausverwaltung beauftragen, Vermieter Zeitaufwand",
  openGraph: {
    title: "Hausverwaltung selbst machen vs. Verwalter: Was lohnt sich?",
    description:
      "Kosten, Zeitaufwand und Risiken — der ehrliche Vergleich für private Vermieter.",
    url: "https://einfach-verwaltet.de/blog/hausverwaltung-selbst-machen",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Hausverwaltung selbst machen vs. Verwalter beauftragen: Was lohnt sich?",
  description:
    "Kosten, Zeitaufwand und Risiken der Selbstverwaltung vs. professioneller Hausverwaltung — ehrlicher Vergleich.",
  author: { "@type": "Organization", name: "einfach verwaltet." },
  publisher: {
    "@type": "Organization",
    name: "einfach verwaltet.",
    logo: { "@type": "ImageObject", url: "https://einfach-verwaltet.de/logo.png" },
  },
  datePublished: "2026-01-25",
  inLanguage: "de",
  url: "https://einfach-verwaltet.de/blog/hausverwaltung-selbst-machen",
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
            <span className="text-gray-700">Hausverwaltung selbst machen</span>
          </nav>

          <header className="mb-10">
            <p className="text-teal text-sm font-semibold uppercase tracking-wider mb-3">
              Ratgeber · 7 min Lesezeit
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-navy font-playfair mb-4 leading-tight">
              Hausverwaltung selbst machen vs. Verwalter beauftragen: Was lohnt sich wirklich?
            </h1>
            <p className="text-gray-500 text-sm">Januar 2026 · einfach verwaltet.</p>
          </header>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Die ehrliche Frage, die sich jeder Vermieter stellt
            </h2>
            <p>
              &bdquo;Brauche ich wirklich eine Hausverwaltung, oder kann ich das
              selbst?&ldquo; — eine berechtigte Frage, besonders wenn man die
              Kosten sieht. Die Antwort hängt von drei Faktoren ab: Anzahl der
              Einheiten, verfügbare Zeit und Bereitschaft, sich in deutsches
              Mietrecht einzuarbeiten.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Was Selbstverwaltung wirklich bedeutet
            </h2>
            <p>Wer selbst verwaltet, übernimmt folgende Aufgaben:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Mietinkasso:</strong> Mieteingang kontrollieren, Rückstände verfolgen, Mahnungen schreiben (BGB §286)</li>
              <li><strong>Betriebskostenabrechnung:</strong> Jährlich, fristgerecht, nach §2 BetrKV — fehlerresistent ist das nicht</li>
              <li><strong>Mieterkommunikation:</strong> Reparaturmeldungen, Beschwerden, Konflikte — oft am Wochenende oder abends</li>
              <li><strong>Handwerkerkoordination:</strong> Angebote einholen, beauftragen, Qualität kontrollieren, Rechnungen prüfen</li>
              <li><strong>Mieterhöhungen:</strong> Korrekt nach §558 BGB, Mietspiegel prüfen, Formvorschriften einhalten</li>
              <li><strong>Mieterwechsel:</strong> Kündigung, Wohnungsübergabe, Kautionsabrechnung, Neuvermietung</li>
              <li><strong>Versicherungen:</strong> Gebäudeversicherung, Haftpflicht, Schadensmeldungen</li>
              <li><strong>Steuern:</strong> Belegorganisation für die Steuererklärung, AfA, Werbungskosten</li>
            </ul>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Der Zeitaufwand — die unterschätzte Größe
            </h2>
            <div className="bg-navy/5 border border-navy/10 rounded-xl p-6">
              <h3 className="font-bold text-navy mb-3">Geschätzter monatlicher Aufwand pro Einheit</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>1–3 Einheiten</span>
                  <span className="font-semibold">4–8 Stunden/Monat — machbar als Nebenbei</span>
                </div>
                <div className="flex justify-between">
                  <span>4–10 Einheiten</span>
                  <span className="font-semibold">15–30 Stunden/Monat — ein Teilzeitjob</span>
                </div>
                <div className="flex justify-between">
                  <span>11–30 Einheiten</span>
                  <span className="font-semibold">40–80 Stunden/Monat — Vollzeitäquivalent</span>
                </div>
                <div className="flex justify-between">
                  <span>30+ Einheiten</span>
                  <span className="font-semibold">Nicht realistisch ohne Team</span>
                </div>
              </div>
            </div>
            <p>
              Dazu kommen unplanbare Spitzen: Ein Wasserschaden am Freitagabend,
              ein Mietausfall im Urlaubsmonat, eine fehlerhafte Abrechnung, die
              angefochten wird. Diese Spitzen machen die Selbstverwaltung ab einer
              gewissen Größe unberechenbar.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Die Kostenrechnung: Selbst vs. Verwalter
            </h2>
            <p>
              Bei 10 Einheiten kostet eine professionelle Hausverwaltung in Hamburg
              ca. €26–30 pro Einheit pro Monat — also €3.120–3.600 im Jahr.
            </p>
            <p>
              Die Selbstverwaltung kostet &bdquo;nichts&ldquo; — wenn Sie Ihre
              eigene Zeit nicht bewerten. Bei 20+ Stunden pro Monat und einem
              Stundensatz von €50 (ein konservativer Wert für einen
              Selbstständigen) sind das €12.000 im Jahr. Dazu das Risiko einer
              fehlerhaften Betriebskostenabrechnung (durchschnittliche
              Nachforderung bei Anfechtung: €800–2.000 pro Einheit).
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Wann Selbstverwaltung Sinn ergibt
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Sie haben 1–3 Einheiten im selben Gebäude</li>
              <li>Sie wohnen selbst im Haus und kennen die Mieter persönlich</li>
              <li>Sie haben beruflich flexible Zeiten und sind erreichbar</li>
              <li>Sie haben Erfahrung mit Mietrecht und Buchhaltung</li>
            </ul>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Wann ein Verwalter die bessere Wahl ist
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Ab 4+ Einheiten — der Aufwand skaliert nicht linear</li>
              <li>Sie leben nicht am Standort der Immobilie</li>
              <li>Sie haben einen Vollzeitjob und keine Kapazitäten für Mieterkommunikation</li>
              <li>Sie wollen kein rechtliches Risiko bei Abrechnungen und Mieterhöhungen</li>
              <li>Sie wollen Urlaub machen, ohne ans Telefon gehen zu müssen</li>
            </ul>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Fazit: Ab 4 Einheiten rechnet sich der Verwalter
            </h2>
            <p>
              Für 1–3 Einheiten kann Selbstverwaltung funktionieren — wenn Sie die
              Zeit, das Fachwissen und die Nerven haben. Ab 4 Einheiten übersteigt
              der Zeitaufwand den finanziellen Vorteil. Und ab 10 Einheiten ist
              Selbstverwaltung wirtschaftlich und persönlich kaum noch sinnvoll.
            </p>
          </div>

          <div className="mt-12 bg-teal/10 border border-teal/20 rounded-xl p-8">
            <h3 className="text-xl font-bold text-navy mb-2 font-playfair">
              Mehr Zeit. Weniger Stress. Bessere Ergebnisse.
            </h3>
            <p className="text-gray-600 mb-4">
              einfach verwaltet. übernimmt Ihre komplette Mietverwaltung — von der
              Mieterkommunikation bis zur Betriebskostenabrechnung. Transparent,
              zuverlässig, ohne versteckte Kosten.
            </p>
            <Link
              href="/anfrage"
              className="inline-block bg-teal text-white font-semibold px-6 py-3 rounded-lg hover:bg-teal/90 transition-colors"
            >
              Jetzt unverbindlich anfragen
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
