import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Hausverwaltung wechseln: Die ultimative Checkliste | einfach verwaltet.",
  description:
    "Hausverwaltung wechseln Checkliste: Kündigung, Unterlagenübergabe, Mieterinformation — Schritt für Schritt zum erfolgreichen Verwalterwechsel.",
  keywords:
    "Hausverwaltung wechseln Checkliste, Hausverwaltung kündigen, Verwalterwechsel, Hausverwaltung wechseln Schritt für Schritt",
  openGraph: {
    title: "Hausverwaltung wechseln: Die ultimative Checkliste",
    description:
      "Die vollständige Checkliste für den Wechsel Ihrer Hausverwaltung — von der Kündigung bis zur reibungslosen Übergabe.",
    url: "https://einfach-verwaltet.de/blog/hausverwaltung-wechseln-checkliste",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Hausverwaltung wechseln: Die ultimative Checkliste",
  description:
    "Schritt-für-Schritt-Checkliste für den Wechsel der Hausverwaltung: Kündigung, Unterlagenübergabe, Mieterinformation.",
  author: { "@type": "Organization", name: "einfach verwaltet." },
  publisher: {
    "@type": "Organization",
    name: "einfach verwaltet.",
    logo: { "@type": "ImageObject", url: "https://einfach-verwaltet.de/logo.png" },
  },
  datePublished: "2026-02-27",
  inLanguage: "de",
  url: "https://einfach-verwaltet.de/blog/hausverwaltung-wechseln-checkliste",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Wie kündige ich meiner Hausverwaltung?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die Kündigung muss schriftlich per Einwurfeinschreiben erfolgen. Die übliche Kündigungsfrist beträgt 3 Monate zum Jahresende (§ 621 BGB). Bei WEG-Verwaltungen ist ein Beschluss der Eigentümerversammlung erforderlich (§ 26 WEG). Lesen Sie Ihren Verwaltervertrag sorgfältig auf abweichende Regelungen.",
      },
    },
    {
      "@type": "Question",
      name: "Welche Unterlagen muss die alte Hausverwaltung übergeben?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die alte Verwaltung muss übergeben: alle Mietverträge, Nebenkostenabrechnungen, Korrespondenz mit Mietern, Kontoauszüge und Salden, Handwerkerverträge, Versicherungspolicen, Schlüsselverzeichnis und alle digitalen Zugangsdaten.",
      },
    },
    {
      "@type": "Question",
      name: "Wie lange dauert ein Verwalterwechsel?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ein Verwalterwechsel dauert typischerweise 4–8 Wochen nach der Kündigung. Die Kündigungsfrist selbst beträgt meist 3 Monate. Planen Sie mindestens 6 Monate von der Entscheidung bis zur vollständigen Übernahme durch die neue Verwaltung.",
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
            <span className="text-gray-700">Hausverwaltung wechseln Checkliste</span>
          </nav>

          <header className="mb-10">
            <p className="text-teal text-sm font-semibold uppercase tracking-wider mb-3">
              Ratgeber · 10 min Lesezeit
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-navy font-playfair mb-4 leading-tight">
              Hausverwaltung wechseln: Die ultimative Checkliste
            </h1>
            <p className="text-gray-500 text-sm">Februar 2026 · einfach verwaltet.</p>
          </header>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <p>
              Sie haben entschieden: Die aktuelle Hausverwaltung muss weg. Zu langsam,
              zu undurchsichtig, zu unzuverlässig. Jetzt kommt der entscheidende Schritt —
              der Wechsel. Mit dieser Checkliste gelingt er strukturiert und ohne
              unangenehme Überraschungen.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Phase 1: Vorbereitung (8–12 Wochen vor Wechsel)
            </h2>

            <div className="bg-navy/5 border border-navy/10 rounded-xl p-6">
              <h3 className="font-bold text-navy mb-4">✓ Checkliste Phase 1</h3>
              <ul className="space-y-3 text-sm">
                {[
                  "Verwaltervertrag lesen: Kündigungsfristen und -bedingungen notieren",
                  "Mögliche Gründe für außerordentliche Kündigung prüfen (grobe Pflichtverletzung)",
                  "Bei WEG: Tagesordnungspunkt für nächste ETV einplanen (§ 26 WEG)",
                  "Neue Verwaltung auswählen und Angebote einholen (mindestens 3)",
                  "Referenzen der neuen Verwaltung prüfen",
                  "Preisvergleich: Grundgebühr + Zusatzleistungen vergleichen",
                  "Vertragsentwurf mit neuer Verwaltung prüfen lassen",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded border-2 border-teal flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Phase 2: Kündigung (6–12 Wochen vor Wechsel)
            </h2>
            <p>
              Die Kündigung ist der formale Startschuss. Sie muss korrekt formuliert und
              fristgerecht zugestellt werden.
            </p>

            <div className="bg-navy/5 border border-navy/10 rounded-xl p-6">
              <h3 className="font-bold text-navy mb-4">✓ Checkliste Kündigung</h3>
              <ul className="space-y-3 text-sm">
                {[
                  "Kündigung schriftlich formulieren (per Einwurfeinschreiben)",
                  "Kündigungsfrist einhalten (meist 3 Monate zum Jahresende nach § 621 BGB)",
                  "Bei WEG: Eigentümerversammlungsbeschluss herbeiführen (§ 26 WEG)",
                  "Empfangsbestätigung der Kündigung anfordern",
                  "Übergabetermin vereinbaren",
                  "Fristen für Abrechnungen klären (z.B. offene Nebenkostenabrechnung)",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded border-2 border-teal flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              Muster-Kündigung (Mietverwaltung)
            </h3>
            <div className="bg-white border border-gray-200 rounded-xl p-6 text-sm font-mono">
              <p>[Ihr Name]<br />[Ihre Adresse]</p>
              <br />
              <p>[Name Hausverwaltung]<br />[Adresse Hausverwaltung]</p>
              <br />
              <p><strong>Kündigung Verwaltervertrag — [Objekt/Adresse]</strong></p>
              <br />
              <p>Sehr geehrte Damen und Herren,</p>
              <br />
              <p>hiermit kündige ich den Verwaltervertrag vom [Datum] für das Objekt
              [Adresse] fristgerecht zum [Datum — 3 Monate zum Jahresende].</p>
              <br />
              <p>Ich bitte um schriftliche Bestätigung des Eingangs sowie um Benennung
              eines Termins zur Übergabe aller Unterlagen.</p>
              <br />
              <p>Mit freundlichen Grüßen,<br />[Unterschrift]</p>
            </div>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Phase 3: Unterlagenübergabe (2–4 Wochen vor Wechsel)
            </h2>
            <p>
              Die vollständige Übergabe aller Unterlagen ist der kritischste Schritt.
              Bestehen Sie auf Vollständigkeit — die alte Verwaltung ist rechtlich
              verpflichtet, alle Dokumente herauszugeben.
            </p>

            <div className="bg-navy/5 border border-navy/10 rounded-xl p-6">
              <h3 className="font-bold text-navy mb-4">✓ Checkliste Unterlagenübergabe</h3>
              <ul className="space-y-3 text-sm">
                {[
                  "Alle Mietverträge (Original oder beglaubigte Kopie)",
                  "Aktuelle Mieterkorrespondenz (letzten 3 Jahre)",
                  "Kontoauszüge und Salden (Mietkautionskonto, Rücklagenkonto bei WEG)",
                  "Offene Nebenkostenabrechungen und Vorschüsse",
                  "Handwerker- und Dienstleisterverträge",
                  "Versicherungspolicen (Gebäudeversicherung, Haftpflicht)",
                  "Schlüsselverzeichnis und alle Schlüssel",
                  "Energieausweis und technische Dokumentation",
                  "Digitale Zugangsdaten (Online-Banking, Portale, E-Mail)",
                  "Offene Beschlüsse und laufende Rechtsstreitigkeiten (bei WEG)",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded border-2 border-teal flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Phase 4: Mieterinformation (1–2 Wochen vor Wechsel)
            </h2>
            <p>
              Mieter müssen über den Wechsel der Hausverwaltung informiert werden.
              Dies ist nicht nur höflich, sondern teilweise rechtlich notwendig.
            </p>

            <div className="bg-navy/5 border border-navy/10 rounded-xl p-6">
              <h3 className="font-bold text-navy mb-4">✓ Checkliste Mieterinformation</h3>
              <ul className="space-y-3 text-sm">
                {[
                  "Anschreiben an alle Mieter: Datum des Wechsels, neue Kontaktdaten",
                  "Neue Kontoverbindung für Mietzahlungen kommunizieren",
                  "Notfallkontakt (24h) der neuen Verwaltung bekanntgeben",
                  "Laufende Reparaturanfragen an neue Verwaltung übergeben",
                  "Kautionskonten auf neue Verwaltung übertragen",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded border-2 border-teal flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Phase 5: Erste Wochen mit der neuen Verwaltung
            </h2>

            <div className="bg-navy/5 border border-navy/10 rounded-xl p-6">
              <h3 className="font-bold text-navy mb-4">✓ Checkliste Einarbeitung</h3>
              <ul className="space-y-3 text-sm">
                {[
                  "Kick-off-Termin mit neuer Verwaltung: Ziele und Erwartungen klären",
                  "Bestandsaufnahme: Immobilienzustand, offene Mängel",
                  "Laufende Verträge prüfen und ggf. kündigen",
                  "Reporting-Rhythmus vereinbaren (monatlich/quartalsweise)",
                  "Online-Zugang zu Eigentümerportal einrichten",
                  "Erste Abrechnung nach 3 Monaten prüfen",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded border-2 border-teal flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              FAQ: Hausverwaltung wechseln
            </h2>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-navy mb-2">
                  Wie kündige ich meiner Hausverwaltung?
                </h3>
                <p className="text-sm">
                  Schriftlich per Einwurfeinschreiben, mit 3 Monaten Kündigungsfrist
                  zum Jahresende. Bei WEG-Verwaltungen ist ein ETV-Beschluss erforderlich.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-navy mb-2">
                  Welche Unterlagen muss die alte Verwaltung übergeben?
                </h3>
                <p className="text-sm">
                  Alle Mietverträge, Abrechnungen, Kontoauszüge, Schlüssel, Verträge,
                  Versicherungspolicen und digitale Zugangsdaten. Bestehen Sie auf
                  vollständige Übergabe.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-navy mb-2">
                  Wie lange dauert ein Verwalterwechsel?
                </h3>
                <p className="text-sm">
                  Von der Entscheidung bis zur vollständigen Übergabe ca. 4–6 Monate.
                  Planen Sie genug Zeit ein, damit nichts im Stress passiert.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Fazit: Strukturiert wechseln spart Nerven
            </h2>
            <p>
              Ein Verwalterwechsel ist eine ernste Angelegenheit, aber kein Hexenwerk.
              Mit dieser Checkliste behalten Sie den Überblick über alle Schritte —
              von der Kündigung bis zur vollständigen Einarbeitung der neuen Verwaltung.
              Die meisten professionellen Hausverwaltungen unterstützen Sie aktiv beim
              Wechselprozess und übernehmen die Koordination mit der Vorgängerverwaltung.
            </p>
          </div>

          <div className="mt-12 bg-teal/10 border border-teal/20 rounded-xl p-8">
            <h3 className="text-xl font-bold text-navy mb-2 font-playfair">
              Wir begleiten Ihren Wechsel
            </h3>
            <p className="text-gray-600 mb-4">
              einfach verwaltet. übernimmt die komplette Koordination des Verwalterwechsels —
              Unterlagenübergabe, Mieterinformation, alles aus einer Hand.
            </p>
            <Link
              href="/anfrage"
              className="inline-block bg-teal text-white font-semibold px-6 py-3 rounded-lg hover:bg-teal/90 transition-colors"
            >
              Jetzt Wechsel starten
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
