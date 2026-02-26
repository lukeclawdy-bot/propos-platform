import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Hausverwaltung kündigen: Muster-Kündigung und wichtige Fristen (2026)",
  description:
    "Hausverwaltung kündigen: Kündigungsfristen, rechtliche Grundlagen (§ 621 BGB, § 26 WEG), Muster-Kündigungsschreiben und Checkliste für den Übergang.",
  keywords:
    "Hausverwaltung kündigen Muster, Hausverwaltung kündigen Frist, Verwalterwechsel, Kündigungsschreiben Hausverwaltung, Hausverwaltung wechseln Hamburg",
  openGraph: {
    title: "Hausverwaltung kündigen: Muster-Kündigung und wichtige Fristen",
    description:
      "Alles zur Kündigung Ihrer Hausverwaltung: Fristen, Muster-Brief und Schritt-für-Schritt-Leitfaden für einen reibungslosen Verwalterwechsel.",
    url: "https://einfach-verwaltet.de/blog/hausverwaltung-kuendigen-muster",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Hausverwaltung kündigen: Muster-Kündigung und wichtige Fristen",
  description:
    "Rechtssicher kündigen: § 621 BGB, Kündigungsfristen, Muster-Kündigungsschreiben und Checkliste für den Wechsel der Hausverwaltung.",
  author: { "@type": "Organization", name: "einfach verwaltet." },
  publisher: {
    "@type": "Organization",
    name: "einfach verwaltet.",
    logo: { "@type": "ImageObject", url: "https://einfach-verwaltet.de/logo.png" },
  },
  datePublished: "2026-02-26",
  inLanguage: "de",
  url: "https://einfach-verwaltet.de/blog/hausverwaltung-kuendigen-muster",
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
            <span className="text-gray-700">Hausverwaltung kündigen Muster</span>
          </nav>

          <header className="mb-10">
            <p className="text-teal text-sm font-semibold uppercase tracking-wider mb-3">
              Ratgeber · 9 min Lesezeit · Verwalterwechsel
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-navy font-playfair mb-4 leading-tight">
              Hausverwaltung kündigen: Muster-Kündigung und wichtige Fristen
            </h1>
            <p className="text-gray-500 text-sm">Februar 2026 · einfach verwaltet.</p>
          </header>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <p>
              Sie sind unzufrieden mit Ihrer Hausverwaltung — und zu Recht. Falsche Abrechnungen,
              mangelnde Erreichbarkeit, Handwerkertermine die nie klappen: Es gibt viele Gründe,
              den Verwalter zu wechseln. Dieser Leitfaden zeigt Ihnen, wie Sie rechtssicher
              kündigen, welche Fristen gelten und wie ein reibungsloser Übergang gelingt.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Rechtliche Grundlage: § 621 BGB und der Verwaltervertrag
            </h2>
            <p>
              Der Hausverwaltungsvertrag ist ein Dienstvertrag im Sinne des BGB. Für die
              Kündigung gilt daher grundsätzlich <strong>§ 621 BGB</strong>, der eine
              ordentliche Kündigung mit bestimmten Fristen ermöglicht.
            </p>
            <p>
              In der Praxis ist jedoch entscheidend, was <strong>im Verwaltervertrag selbst</strong>
              vereinbart wurde. Die meisten Verwalterverträge enthalten eine Kündigungsfrist
              von <strong>drei Monaten zum Jahresende</strong> oder zum Quartalsende. Prüfen Sie
              Ihren Vertrag genau — das ist der erste Schritt vor jeder Kündigung.
            </p>

            <div className="bg-teal/5 border-l-4 border-teal rounded-r-xl p-5 my-6 not-prose">
              <p className="font-semibold text-navy mb-2">Wichtiger Hinweis für WEG-Eigentümer</p>
              <p className="text-sm text-gray-700">
                Bei einer WEG gilt zusätzlich <strong>§ 26 WEG</strong>: Die Eigentümergemeinschaft
                kann den WEG-Verwalter jederzeit durch Mehrheitsbeschluss abberufen — unabhängig
                vom Verwaltervertrag. Der Vertrag endet dann automatisch spätestens sechs Monate
                nach Abberufung. Für die Abberufung genügt ein einfacher Mehrheitsbeschluss auf
                der Eigentümerversammlung.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Ordentliche Kündigung: Fristen und Vorgehensweise
            </h2>
            <p>
              Die ordentliche Kündigung ist der Standardfall — keine besonderen Gründe notwendig.
              Folgende Schritte sind typisch:
            </p>
            <ol className="list-decimal pl-6 space-y-3">
              <li>
                <strong>Verwaltervertrag lesen:</strong> Kündigungsfrist und -termin herausfinden.
                Üblich: 3 Monate zum Jahresende oder Quartalsende.
              </li>
              <li>
                <strong>Frist berechnen:</strong> Wenn Sie zum 31.12. kündigen wollen und eine
                3-Monats-Frist gilt, muss die Kündigung spätestens am 30.09. zugegangen sein.
              </li>
              <li>
                <strong>Schriftliche Kündigung verfassen</strong> (Muster unten).
              </li>
              <li>
                <strong>Kündigung per Einschreiben/Rückschein senden</strong> — Zugangsnachweis
                ist entscheidend. E-Mail allein reicht in der Regel nicht.
              </li>
              <li>
                <strong>Bestätigung einfordern:</strong> Bitten Sie die Hausverwaltung um eine
                schriftliche Bestätigung des Zugangs und des Enddatums.
              </li>
            </ol>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Außerordentliche Kündigung: Wann ist sie möglich?
            </h2>
            <p>
              Bei schwerwiegenden Pflichtverletzungen können Sie den Verwaltervertrag ohne
              Einhaltung der Kündigungsfrist außerordentlich kündigen (§ 626 BGB). Ein
              außerordentlicher Grund liegt vor bei:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Veruntreuung von Hausgeld oder Mietgeldern</li>
              <li>Dauerhafter Erreichbarkeit trotz mehrfacher Abmahnungen</li>
              <li>Grob fehlerhaften Jahresabrechnungen (mit nachgewiesenem Schaden)</li>
              <li>Missachtung von Eigentümerbeschlüssen</li>
              <li>Schwerwiegenden Interessenkonflikten</li>
            </ul>
            <p>
              Wichtig: Bei außerordentlicher Kündigung sollten Sie vorher eine <strong>Abmahnung</strong>
              aussprechen und dem Verwalter die Möglichkeit zur Nachbesserung geben —
              andernfalls riskieren Sie Schadensersatzansprüche.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Muster-Kündigung: Vorlage zum Anpassen
            </h2>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 font-mono text-sm leading-relaxed not-prose">
              <p className="font-semibold text-navy mb-4">Muster-Kündigung Hausverwaltungsvertrag</p>
              <p>[Ihr Name]<br />[Ihre Adresse]<br />[PLZ Ort]</p>
              <br />
              <p>[Name der Hausverwaltung]<br />[Adresse der Hausverwaltung]</p>
              <br />
              <p>[Ort, Datum]</p>
              <br />
              <p><strong>Kündigung des Hausverwaltungsvertrages</strong><br />
              Objekt: [Adresse der verwalteten Immobilie]<br />
              Vertragsnummer / Kundennummer (falls bekannt): [XXX]</p>
              <br />
              <p>Sehr geehrte Damen und Herren,</p>
              <br />
              <p>
                hiermit kündige ich / kündigen wir den bestehenden Hausverwaltungsvertrag
                für das oben genannte Objekt fristgerecht zum [Kündigungsdatum, z. B. 31. Dezember 2026].
              </p>
              <br />
              <p>
                Ich / Wir bitte(n) Sie um eine schriftliche Bestätigung des Zugangs
                dieser Kündigung sowie des Vertragsendetermins bis spätestens
                [Datum, z. B. zwei Wochen nach Kündigung].
              </p>
              <br />
              <p>
                Zur ordnungsgemäßen Übergabe bitte ich / bitten wir Sie, uns folgende
                Unterlagen bis zum Vertragsende vollständig zu übergeben:
              </p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Alle Mietverträge und Mieterkontakte</li>
                <li>Aktuelle Mieterliste mit Kontoverbindungen</li>
                <li>Letzte Betriebskosten- / Jahresabrechnung</li>
                <li>Alle Kontoauszüge und Buchungsbelege</li>
                <li>Laufende Handwerkeraufträge und Gewährleistungsunterlagen</li>
                <li>Alle Schlüssel und Zugangscodes</li>
                <li>Versicherungsdokumente</li>
              </ul>
              <br />
              <p>Mit freundlichen Grüßen,</p>
              <br />
              <p>[Unterschrift]<br />[Vollständiger Name]</p>
            </div>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Checkliste: Reibungsloser Verwalterwechsel
            </h2>
            <p>
              Ein Verwalterwechsel ist kein Hexenwerk — aber er erfordert Planung. Diese
              Checkliste hilft Ihnen, nichts zu vergessen:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>☐ Neuen Verwalter auswählen und Vertragsabschluss vorbereiten</li>
              <li>☐ Kündigung an alte Hausverwaltung mit Einschreiben versenden</li>
              <li>☐ Übergabetermin vereinbaren (idealerweise 4–6 Wochen vor Vertragsende)</li>
              <li>☐ Vollständige Unterlagenübergabe einfordern (alle Mietverträge, Abrechnungen, Schlüssel)</li>
              <li>☐ Bankkonten umstellen (SEPA-Mandate, Hausgeldkonto)</li>
              <li>☐ Mieter über den Verwalterwechsel informieren (neue Kontaktdaten, neue Bankverbindung)</li>
              <li>☐ Laufende Verträge prüfen (Versicherungen, Wartungsverträge)</li>
              <li>☐ Übergangsprotokoll erstellen und von alter Verwaltung unterzeichnen lassen</li>
            </ul>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Fazit: Wechsel ist einfacher als gedacht
            </h2>
            <p>
              Viele Eigentümer schieben den Verwalterwechsel auf, weil sie glauben, er sei
              kompliziert. Das ist ein Irrtum. Mit der richtigen Vorbereitung, einem klaren
              Zeitplan und einem neuen Verwalter, der die Übergabe professionell begleitet,
              ist ein Wechsel in wenigen Wochen vollzogen.
            </p>
            <p>
              Wenn Ihre Hausverwaltung nicht erreichbar ist, fehlerhafte Abrechnungen liefert
              oder Beschlüsse ignoriert, gibt es keinen Grund zu warten. Die Kündigung ist Ihr gutes Recht.
            </p>
          </div>

          <div className="mt-12 bg-teal/10 border border-teal/20 rounded-xl p-8">
            <h3 className="text-xl font-bold text-navy mb-2 font-playfair">
              Bereit für einen reibungslosen Wechsel zu einfach verwaltet.?
            </h3>
            <p className="text-gray-600 mb-4">
              Wir begleiten den Verwalterwechsel von Anfang bis Ende — inklusive Übergabekoordination,
              Mieterkommunikation und sofortiger Erreichbarkeit. Jetzt kostenlos anfragen.
            </p>
            <Link
              href="/anfrage"
              className="inline-block bg-teal text-white font-semibold px-6 py-3 rounded-lg hover:bg-teal/90 transition-colors"
            >
              Jetzt zu einfach verwaltet. wechseln →
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
