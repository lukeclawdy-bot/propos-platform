import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Mietkaution zurückhalten: Was Vermieter einbehalten dürfen (und was nicht) | einfach verwaltet.",
  description:
    "Mietkaution zurückhalten: Zulässige Gründe (Schäden, Mietrückstände, fehlende Schlüssel), unzulässige Einbehalte und die 6-Monats-Rückgabefrist nach §551 BGB erklärt.",
  keywords:
    "Mietkaution zurückhalten, Kaution einbehalten Gründe, Mietkaution Abzug, Kaution zurück Frist, §551 BGB Kaution",
  openGraph: {
    title: "Mietkaution zurückhalten: Was Vermieter einbehalten dürfen (und was nicht)",
    description:
      "Zulässige Einbehalte, unzulässige Abzüge und die 6-Monats-Frist: Der vollständige Leitfaden zur Kautionsrückgabe nach §551 BGB.",
    url: "https://einfach-verwaltet.de/blog/mietkaution-zurueckhalten-vermieter",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Mietkaution zurückhalten: Was Vermieter einbehalten dürfen (und was nicht)",
  description:
    "Was darf der Vermieter von der Mietkaution einbehalten? Zulässige Gründe, unzulässige Abzüge und Fristen nach §551 BGB.",
  author: { "@type": "Organization", name: "einfach verwaltet." },
  publisher: {
    "@type": "Organization",
    name: "einfach verwaltet.",
    logo: { "@type": "ImageObject", url: "https://einfach-verwaltet.de/logo.png" },
  },
  datePublished: "2026-02-27",
  inLanguage: "de",
  url: "https://einfach-verwaltet.de/blog/mietkaution-zurueckhalten-vermieter",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Wie lange darf der Vermieter die Mietkaution einbehalten?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nach Auszug und Schlüsselübergabe hat der Vermieter in der Regel 3 bis 6 Monate Zeit, berechtigte Forderungen zu prüfen und abzurechnen. Eine starre gesetzliche Frist von exakt 6 Monaten gibt es nicht, aber nach 6 Monaten müssen triftige Gründe vorliegen, um die Kaution noch zurückzuhalten. Anderenfalls gerät der Vermieter in Verzug und muss Verzugszinsen nach §288 Abs. 1 BGB zahlen.",
      },
    },
    {
      "@type": "Question",
      name: "Was kann der Vermieter von der Kaution abziehen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Zulässige Abzüge sind: offene Mietrückstände, Schäden über normale Abnutzung hinaus (mit Nachweisen wie Fotos und Kostenvoranschlägen), fehlende oder nicht zurückgegebene Schlüssel sowie ausstehende Nebenkostennachzahlungen. Nicht abgezogen werden dürfen Schönheitsreparaturen bei unwirksamen Mietvertragsklauseln (BGH-Rechtsprechung seit 2015), normale Abnutzung (Kratzer, Verfärbungen durch normalen Gebrauch) und Mängel, die bereits vor Einzug vorhanden waren.",
      },
    },
    {
      "@type": "Question",
      name: "Was passiert, wenn der Vermieter die Kaution zu Unrecht einbehält?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Behält der Vermieter die Kaution ohne berechtigten Grund ein, gerät er in Verzug. Der Mieter kann dann die Kaution zuzüglich Verzugszinsen (Basiszinssatz + 5 Prozentpunkte, §288 Abs. 1 BGB) klageweise einfordern. Bei bewusst unberechtigtem Einbehalt kann zusätzlich Schadensersatz verlangt werden. Im schlimmsten Fall drohen Gerichtsverfahren und Kostenpflicht für den Vermieter.",
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
            <span className="text-gray-700">Mietkaution zurückhalten Vermieter</span>
          </nav>

          <header className="mb-10">
            <p className="text-teal text-sm font-semibold uppercase tracking-wider mb-3">
              Ratgeber · 10 min Lesezeit
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-navy font-playfair mb-4 leading-tight">
              Mietkaution zurückhalten: Was Vermieter einbehalten dürfen — und was nicht
            </h1>
            <p className="text-gray-500 text-sm">Februar 2026 · einfach verwaltet.</p>
          </header>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <p>
              Nach dem Auszug eines Mieters stellt sich für viele Vermieter die Frage: 
              Was darf ich von der Mietkaution einbehalten? Welche Schäden kann ich abziehen? 
              Und wann muss ich die Kaution zurückzahlen? Dieser Leitfaden klärt die rechtliche 
              Grundlage nach §551 BGB und gibt praktische Orientierung für den Vermieteralltag.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Die rechtliche Grundlage: §551 BGB
            </h2>
            <p>
              Die Mietkaution ist in §551 BGB geregelt. Der Höchstbetrag beträgt drei 
              Monatsnettomieten (§551 Abs. 1 BGB). Die Kaution muss auf einem separaten 
              Treuhandkonto verwahrt und verzinst werden (§551 Abs. 2 BGB). 
              Über die Rückgabe schweigt das Gesetz weitgehend — es spricht lediglich 
              von einer Rückzahlung „nach Beendigung des Mietverhältnisses".
            </p>
            <p>
              In der Praxis hat die Rechtsprechung konkretisiert: Der Vermieter darf die 
              Kaution nicht unbegrenzt einbehalten. Er muss entweder innerhalb von 
              drei bis sechs Monaten nach Auszug abrechnen oder konkrete, noch offene 
              Ansprüche benennen, die eine längere Prüfung rechtfertigen.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Was darf der Vermieter von der Kaution abziehen?
            </h2>
            <p>
              Vermieter dürfen die Kaution nur für berechtigte Forderungen einbehalten. 
              Dazu gehören:
            </p>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              1. Offene Mietrückstände
            </h3>
            <p>
              Hat der Mieter Miete schuldig geblieben, darf der Vermieter diesen Betrag 
              von der Kaution einbehalten. Voraussetzung: Die Forderung muss klar 
              dokumentiert sein (Kontoauszüge, Mahnungen). 
              Auch ausstehende Betriebskostennachzahlungen aus bereits erstellten 
              Abrechnungen sind abzugsfähig.
            </p>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              2. Schäden über die normale Abnutzung hinaus
            </h3>
            <p>
              Vermieter können Kosten für Schäden geltend machen, die über die 
              vertragsgemäße Abnutzung hinausgehen. Beispiele:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Löcher in Wänden (über handelsübliche Größe)</li>
              <li>Tierschäden am Bodenbelag oder an Türen</li>
              <li>Eingebaute Schäden an Küche oder Bad</li>
              <li>Verbrennungsflecken auf dem Parkett</li>
            </ul>
            <p>
              Wichtig: Der Vermieter muss die Schäden nachweisen können — mit Fotos 
              vom Einzug und Auszug sowie einem Kostenvoranschlag oder einer Rechnung 
              für die Beseitigung.
            </p>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              3. Fehlende oder nicht zurückgegebene Schlüssel
            </h3>
            <p>
              Gibt der Mieter nicht alle Schlüssel zurück, kann der Vermieter die 
              Kosten für Austausch von Schlössern und neue Schlüssel von der Kaution abziehen. 
              Der Aufwand muss nachgewiesen werden (Rechnung des Schlüsseldienstes oder Schlossers).
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Was darf NICHT von der Kaution abgezogen werden?
            </h2>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              Schönheitsreparaturen bei unwirksamen Klauseln
            </h3>
            <p>
              Seit mehreren BGH-Urteilen (u. a. VIII ZR 185/14 von 2015) gilt: 
              Starre Renovierungsklauseln im Mietvertrag sind in vielen Fällen unwirksam. 
              Das betrifft vor allem „Fristenklauseln" (z. B. „alle 3 Jahre Küche, alle 5 Jahre 
              Wohnräume streichen") ohne Berücksichtigung des tatsächlichen Zustands. 
              Ist die Klausel im Mietvertrag unwirksam, kann der Vermieter 
              Schönheitsreparaturen nicht von der Kaution einbehalten.
            </p>
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
              <p className="text-sm text-amber-800">
                <strong>Achtung:</strong> Prüfen Sie Ihre Schönheitsreparaturklausel 
                vor der Kautionsabrechnung sorgfältig. Im Zweifel gilt: 
                Rechtliche Beratung einholen, bevor Sie Abzüge vornehmen.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              Normale Abnutzung (vertragsgemäßer Gebrauch)
            </h3>
            <p>
              Gebrauchsspuren, die durch normale Nutzung entstehen, darf der Vermieter 
              nicht von der Kaution abziehen. Dazu gehören:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Leichte Kratzer in Bodenbelägen</li>
              <li>Verblassung von Tapeten durch Sonneneinstrahlung</li>
              <li>Kleine Nagel- oder Schraubenspuren in normaler Anzahl</li>
              <li>Farbveränderungen durch normale Nutzung</li>
            </ul>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              Vorhandene Mängel beim Einzug
            </h3>
            <p>
              Schäden, die bereits beim Einzug dokumentiert waren (im Übergabeprotokoll 
              festgehalten), können nicht vom auszugswilligen Mieter verlangt werden. 
              Deshalb ist ein sorgfältiges Übergabeprotokoll beim Einzug essenziell.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Die Rückgabefrist: Wann muss die Kaution zurück?
            </h2>
            <p>
              Eine starre gesetzliche Frist existiert nicht. Die Rechtsprechung hat jedoch 
              herausgearbeitet: Nach Schlüsselübergabe und Ende des Mietverhältnisses 
              sollte der Vermieter die Kaution innerhalb von <strong>drei bis sechs Monaten</strong> 
              zurückzahlen oder eine konkrete Abrechnung vorlegen.
            </p>
            <p>
              Ausstehende Nebenkostenabrechnungen können eine längere Einbehaltfrist 
              rechtfertigen — aber nur für den entsprechenden Teilbetrag. Den Rest muss 
              der Vermieter unverzüglich zurückzahlen.
            </p>
            <p>
              Nach sechs Monaten ohne konkreten Grund gerät der Vermieter in Verzug 
              und schuldet dem Mieter Verzugszinsen nach §288 Abs. 1 BGB 
              (Basiszinssatz + 5 Prozentpunkte, derzeit ca. 7,37% p.a.).
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Verzinsungspflicht: Die Zinsen gehören dem Mieter
            </h2>
            <p>
              Die auf einem Kautionskonto angesammelten Zinsen stehen dem Mieter zu und 
              müssen bei der Rückzahlung ausgekehrt werden. Die Pflicht zur Verzinsung 
              ergibt sich aus §551 Abs. 2 BGB. Der Zinssatz orientiert sich am 
              üblichen Zinssatz für Spareinlagen mit dreimonatiger Kündigungsfrist.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              FAQ: Mietkaution zurückhalten
            </h2>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-navy mb-2">
                  Wie lange darf der Vermieter die Mietkaution einbehalten?
                </h3>
                <p className="text-sm">
                  In der Praxis haben Vermieter 3 bis 6 Monate Zeit. Danach müssen 
                  konkrete Ansprüche benannt sein, die eine längere Einbehaltung 
                  rechtfertigen. Andernfalls drohen Verzugszinsen.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-navy mb-2">
                  Was kann der Vermieter von der Kaution abziehen?
                </h3>
                <p className="text-sm">
                  Zulässig: Mietrückstände, Schäden über normale Abnutzung, fehlende 
                  Schlüssel, offene Nebenkostennachzahlungen. Nicht zulässig: 
                  Schönheitsreparaturen bei unwirksamen Klauseln, normale Gebrauchsspuren, 
                  Vorschäden aus dem Übergabeprotokoll.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-navy mb-2">
                  Was passiert, wenn der Vermieter die Kaution zu Unrecht einbehält?
                </h3>
                <p className="text-sm">
                  Der Mieter kann die Kaution zuzüglich Verzugszinsen (§288 Abs. 1 BGB) 
                  einklagen. Bei bewusst unberechtigtem Einbehalt kann zusätzlich 
                  Schadensersatz geltend gemacht werden.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Fazit: Kautionsabrechnung rechtssicher gestalten
            </h2>
            <p>
              Die Kautionsabrechnung ist fehleranfällig — und für Vermieter ein 
              häufiger Streitpunkt. Die wichtigsten Erfolgsfaktoren: 
              Sorgfältiges Übergabeprotokoll beim Einzug, klare Fotodokumentation 
              beim Auszug, rechtlich geprüfte Mietvertragsklauseln und eine 
              transparente Abrechnung innerhalb von sechs Monaten.
            </p>
          </div>

          <div className="mt-12 bg-teal/10 border border-teal/20 rounded-xl p-8">
            <h3 className="text-xl font-bold text-navy mb-2 font-playfair">
              Kautionsverwaltung ohne Risiko — mit einfach verwaltet.
            </h3>
            <p className="text-gray-600 mb-4">
              Wir verwalten Mietkautionen rechtssicher: Vom Übergabeprotokoll bis 
              zur vollständigen Abrechnung nach dem Auszug. Dokumentiert, transparent 
              und ohne versteckte Gebühren.
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
