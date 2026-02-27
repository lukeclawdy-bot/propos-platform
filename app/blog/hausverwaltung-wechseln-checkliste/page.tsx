import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Hausverwaltung wechseln Checkliste: Schritt für Schritt | einfach verwaltet.",
  description:
    "Hausverwaltung wechseln Checkliste: Kündigungsfristen, Unterlagenübergabe, Mieterinformation, Onboarding neue HV. Der vollständige Leitfaden für einen reibungslosen Verwalterwechsel.",
  keywords:
    "Hausverwaltung wechseln Checkliste, Hausverwaltung kündigen, Verwalterwechsel Ablauf, Hausverwaltung wechseln Schritt für Schritt, Hausverwaltung kündigen Fristen",
  openGraph: {
    title: "Hausverwaltung wechseln Checkliste: Der vollständige Leitfaden",
    description:
      "Kündigungsfristen, Datenübergabe, Mieterinformation — alles was Sie für einen reibungslosen Hausverwaltungs-Wechsel brauchen.",
    url: "https://einfach-verwaltet.de/blog/hausverwaltung-wechseln-checkliste",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "article",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Hausverwaltung wechseln Checkliste: Schritt für Schritt zum reibungslosen Wechsel",
  description:
    "Kündigungsfristen, Unterlagenübergabe, Mieterinformation, neue HV onboarden — der vollständige Leitfaden für den Hausverwaltungs-Wechsel.",
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
      name: "Welche Kündigungsfristen gelten beim Hausverwaltungswechsel?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Bei der Mietverwaltung gilt für den Verwaltervertrag in der Regel eine Kündigungsfrist von 3 Monaten zum Jahresende (§621 BGB bei unbefristeten Verträgen). Bei WEG-Verwaltung beträgt die Amtszeit nach §26 WEG maximal 5 Jahre — Abberufung ist jederzeit möglich, der Verwaltervertrag kann aber besondere Fristen enthalten. Schauen Sie immer in Ihren konkreten Vertrag.",
      },
    },
    {
      "@type": "Question",
      name: "Welche Unterlagen muss die alte Hausverwaltung übergeben?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die alte Verwaltung ist verpflichtet, alle Verwaltungsunterlagen herauszugeben: Mietverträge, Betriebskostenabrechnungen, Kontoauszüge und Rücklagenkonten, Wartungsverträge, Schlüssellisten, Versicherungsverträge, Korrespondenz mit Mietern sowie Grundbuchauszüge und Baupläne. Die Übergabe muss vollständig und geordnet erfolgen.",
      },
    },
    {
      "@type": "Question",
      name: "Wie werden Mieter über den Hausverwaltungswechsel informiert?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mieter müssen schriftlich über den Wechsel informiert werden — Name und Kontaktdaten der neuen Verwaltung, neues Konto für Mietzahlungen (SEPA-Mandate müssen aktualisiert werden), neue Ansprechpartner für Reparaturmeldungen und Notfälle. Die Information sollte mindestens 4 Wochen vor dem Übergabedatum erfolgen.",
      },
    },
  ],
};

export default function HausverwaltungWechselnChecklistePost() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
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
              Hausverwaltung wechseln Checkliste: Der vollständige Leitfaden
            </h1>
            <p className="text-gray-500 text-sm">Februar 2026 · einfach verwaltet.</p>
          </header>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Warum der Hausverwaltungswechsel oft zu lange aufgeschoben wird
            </h2>
            <p>
              Viele Eigentümer sind mit ihrer Hausverwaltung unzufrieden — schlechte Erreichbarkeit,
              fehlerhafte Abrechnungen, träge Reaktionen auf Mieteranfragen. Trotzdem bleibt der Wechsel
              aus. Der Grund: Die meisten fürchten den Aufwand. Dieser Leitfaden zeigt, dass ein
              strukturierter Wechsel in 5 Schritten deutlich reibungsloser verläuft, als viele denken.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Schritt 1: Vertrag prüfen — Kündigungsfristen und Laufzeit
            </h2>
            <p>
              Bevor Sie handeln, müssen Sie Ihren bestehenden Verwaltervertrag kennen. Prüfen Sie:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Vertragslaufzeit:</strong> Ist der Vertrag befristet oder unbefristet?
                Befristete Verträge enden automatisch, können aber auch Verlängerungsklauseln enthalten.
              </li>
              <li>
                <strong>Kündigungsfristen:</strong> Bei unbefristeten Mietverwaltungsverträgen gilt
                nach §621 BGB in der Regel eine Frist von 3 Monaten zum Quartals- oder Jahresende.
                Viele Verträge enthalten abweichende Regelungen.
              </li>
              <li>
                <strong>WEG-Verwaltung:</strong> Die Abberufung des Verwalters kann nach §26 WEG
                jederzeit durch Eigentümermehrheit erfolgen. Der Verwaltervertrag kann aber
                Entschädigungsregelungen enthalten.
              </li>
              <li>
                <strong>Automatische Verlängerung:</strong> Gibt es eine Verlängerungsklausel?
                Wenn ja, müssen Sie vor dem Fristablauf kündigen.
              </li>
            </ul>
            <p className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
              <strong>Wichtig:</strong> Die Kündigung immer schriftlich per Einschreiben mit Rückschein.
              Bewahren Sie den Rückschein als Nachweis auf. Faxkündigung ist möglich, aber riskanter.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Schritt 2: Neue Hausverwaltung auswählen
            </h2>
            <p>
              Beginnen Sie die Suche parallel zur Kündigungsankündigung — nicht danach. So haben Sie Zeit
              für einen sorgfältigen Vergleich und ein geordnetes Übergabeverfahren.
            </p>
            <p>Kriterien für die Auswahl einer neuen Hausverwaltung:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>§34c GewO-Lizenz:</strong> Pflichtvoraussetzung für gewerbliche Hausverwaltung</li>
              <li><strong>Lokale Marktkenntnisse:</strong> Kenntnis des Mietspiegels, lokaler Handwerker, Behörden</li>
              <li><strong>Transparente Preisgestaltung:</strong> Vollständiges Leistungsverzeichnis ohne versteckte Gebühren</li>
              <li><strong>Digitale Infrastruktur:</strong> Mieterportal, Online-Abrechnung, Dokumentenmanagement</li>
              <li><strong>Reaktionszeiten:</strong> Wie schnell werden Mangelanzeigen bearbeitet?</li>
              <li><strong>Referenzen:</strong> Vergleichbare Objekte und nachweisbare Erfahrung</li>
            </ul>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Schritt 3: Unterlagenübergabe — Was Sie zurückbekommen müssen
            </h2>
            <p>
              Die alte Verwaltung ist rechtlich verpflichtet, alle Verwaltungsunterlagen vollständig
              herauszugeben. Fordern Sie diese aktiv an — und haken Sie nach, wenn Unterlagen fehlen.
            </p>

            <h3 className="text-xl font-bold text-navy mt-6 mb-3">Checkliste Unterlagenübergabe</h3>
            <div className="bg-navy/5 border border-navy/10 rounded-xl p-6">
              <div className="space-y-3 text-sm">
                {[
                  "Alle Mietverträge (Original oder beglaubigte Kopie)",
                  "Aktuelle Mieterübersicht mit Miethöhen, Mietbeginn, Kaution",
                  "Kautionskonten-Nachweis oder Abtretungserklärungen",
                  "Betriebskostenabrechnungen der letzten 3 Jahre",
                  "Kontoauszüge aller verwalteten Konten",
                  "Rücklagenkonten (insbesondere bei WEG)",
                  "Alle Wartungsverträge (Heizung, Aufzug, Rauchmelderwartung, etc.)",
                  "Versicherungsverträge (Gebäudeversicherung, Haftpflicht)",
                  "Schlüsselliste und ggf. Schlüssel",
                  "Korrespondenz mit Mietern der letzten 2 Jahre",
                  "Offene Forderungen und laufende Mahnverfahren",
                  "Grundbuchauszüge, Baupläne, Baugenehmigungen",
                  "Energieausweise aller Einheiten",
                  "WEG: Beschlussprotokolle der letzten 5 Jahre, Teilungserklärung",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-4 h-4 border-2 border-teal rounded mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Schritt 4: Mieter über den Wechsel informieren
            </h2>
            <p>
              Die Kommunikation mit den Mietern ist ein unterschätzter aber kritischer Schritt.
              Eine gute Information verhindert Verwirrung bei Mietzahlungen und Notfällen.
            </p>
            <p>Das Anschreiben an die Mieter sollte enthalten:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name, Adresse und Kontaktdaten der neuen Hausverwaltung</li>
              <li>Datum des Übergangs</li>
              <li>Neue Bankverbindung für Mietzahlungen (IBAN)</li>
              <li>Hinweis auf Anpassung von Daueraufträgen oder SEPA-Mandaten</li>
              <li>Neuer Ansprechpartner für Reparaturmeldungen und Notfälle (inklusive Notfallnummer)</li>
            </ul>
            <p className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
              <strong>Timing:</strong> Das Anschreiben sollte mindestens 4 Wochen vor dem Übergabedatum
              bei den Mietern ankommen — so haben sie ausreichend Zeit, Daueraufträge anzupassen.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Schritt 5: Neue Hausverwaltung onboarden
            </h2>
            <p>
              Der erste Monat mit der neuen Verwaltung entscheidet über Erfolg oder Misserfolg des Wechsels.
              Übergeben Sie nicht nur Unterlagen — übergeben Sie Kontext:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Offene Themen und laufende Reparaturen mit Status</li>
              <li>Besonderheiten bei einzelnen Mietern (z.B. laufende Mahnverfahren, bekannte Konflikte)</li>
              <li>Wartungsintervalle und nächste Fälligkeiten</li>
              <li>Absprachen, die mündlich oder informell getroffen wurden</li>
            </ul>
            <p>
              Eine gute Hausverwaltung wird Sie aktiv nach dieser Information fragen — und Ihre
              Immobilie innerhalb weniger Wochen vollständig erfassen.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Typische Fehler beim Hausverwaltungswechsel — und wie man sie vermeidet
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Zu spät kündigen:</strong> Unbedingt Kündigungsfristen einhalten — sonst verlängert
                sich der Vertrag automatisch um ein weiteres Jahr.
              </li>
              <li>
                <strong>Neue Verwaltung zu spät beauftragen:</strong> Mindestens 8 Wochen Vorlauf einplanen,
                damit Übergabe und Mieterinformation sauber koordiniert werden können.
              </li>
              <li>
                <strong>Unvollständige Unterlagenübergabe akzeptieren:</strong> Haken Sie nach. Fehlende
                Unterlagen können später teuer werden — z.B. fehlende Betriebskostenabrechnungen.
              </li>
              <li>
                <strong>Mieter nicht oder zu spät informieren:</strong> Zu knappe Information führt zu
                Mietzahlungen auf das falsche Konto und unnötigen Rückbuchungen.
              </li>
            </ul>

            {/* FAQ Section */}
            <h2 className="text-2xl font-bold text-navy font-playfair mt-12 mb-6">
              Häufige Fragen zum Hausverwaltungswechsel
            </h2>
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-navy mb-2">Welche Kündigungsfristen gelten beim Hausverwaltungswechsel?</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Bei der Mietverwaltung gilt für unbefristete Verträge in der Regel 3 Monate zum
                  Quartals- oder Jahresende (§621 BGB). Bei WEG-Verwaltung ist Abberufung jederzeit
                  möglich, der Verwaltervertrag kann aber abweichende Fristen enthalten.
                  Immer den konkreten Vertrag prüfen.
                </p>
              </div>
              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-navy mb-2">Welche Unterlagen muss die alte Hausverwaltung übergeben?</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Alle Verwaltungsunterlagen: Mietverträge, Betriebskostenabrechnungen, Kontoauszüge,
                  Kautionsnachweise, Wartungsverträge, Versicherungsverträge, Schlüssellisten,
                  Korrespondenz mit Mietern, Energieausweise, bei WEG: Beschlussprotokolle und Teilungserklärung.
                </p>
              </div>
              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-navy mb-2">Wie werden Mieter über den Hausverwaltungswechsel informiert?</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Schriftlich, mindestens 4 Wochen vor dem Übergabedatum: Neue Kontaktdaten,
                  neue Bankverbindung für Mietzahlungen, neuer Ansprechpartner für Reparaturen.
                  SEPA-Mandate müssen bei Bankeinzug neu erteilt werden.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 bg-teal/10 border border-teal/20 rounded-xl p-8">
            <h3 className="text-xl font-bold text-navy mb-2 font-playfair">
              Lassen Sie uns Ihre Immobilie verwalten
            </h3>
            <p className="text-gray-600 mb-4">
              Wir begleiten Ihren Verwaltungswechsel von der Unterlagenübergabe bis zur Mieterinformation.
              Reibungslos und ohne Leerstand-Risiko.
            </p>
            <Link
              href="/anfrage"
              className="inline-block bg-teal text-white font-semibold px-6 py-3 rounded-lg hover:bg-teal/90 transition-colors"
            >
              Jetzt wechseln — kostenlos anfragen
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
