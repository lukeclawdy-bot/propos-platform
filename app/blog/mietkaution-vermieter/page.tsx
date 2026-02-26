import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Mietkaution: Was Vermieter und Mieter wissen müssen (3 Monatsmieten Regel) | einfach verwaltet.",
  description:
    "Mietkaution nach §551 BGB: Höchstbetrag 3 Monatsmieten, Kautionskonto, Rückzahlung, Verzinsung. Was Vermieter und Mieter wissen müssen.",
  keywords:
    "Mietkaution Vermieter, Mietkaution 3 Monate, §551 BGB Kaution, Kautionskonto Pflicht, Mietkaution Rückzahlung",
  openGraph: {
    title: "Mietkaution: Was Vermieter und Mieter wissen müssen (3 Monatsmieten Regel)",
    description:
      "3 Monatsmieten Höchstbetrag, Kautionskonto, Rückzahlung und Verzinsung — der komplette Leitfaden für Vermieter.",
    url: "https://einfach-verwaltet.de/blog/mietkaution-vermieter",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Mietkaution: Was Vermieter und Mieter wissen müssen (3 Monatsmieten Regel)",
  description:
    "Mietkaution nach §551 BGB: Höchstbetrag, Kautionskonto, Rückzahlung, Verzinsung und häufige Fehler vermeiden.",
  author: { "@type": "Organization", name: "einfach verwaltet." },
  publisher: {
    "@type": "Organization",
    name: "einfach verwaltet.",
    logo: { "@type": "ImageObject", url: "https://einfach-verwaltet.de/logo.png" },
  },
  datePublished: "2026-02-26",
  inLanguage: "de",
  url: "https://einfach-verwaltet.de/blog/mietkaution-vermieter",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Wie hoch darf die Mietkaution maximal sein?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nach §551 Abs. 1 BGB darf die Mietkaution maximal das Dreifache der monatlichen Kaltmiete betragen (3 Monatsmieten). Höhere Kautionen sind unwirksam. Bei einer Nettokaltmiete von €1.000 beträgt die maximal zulässige Kaution also €3.000.",
      },
    },
    {
      "@type": "Question",
      name: "Muss die Mietkaution auf ein separates Kautionskonto?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, nach §551 Abs. 2 BGB muss der Vermieter die Kaution getrennt vom seinem Vermögen auf einem Treuhandkonto (Kautionskonto) bei einer Bank anlegen. Das Konto muss auf den Namen des Mieters oder mit einem Treuhandvermerk laufen. Der Mieter hat Anspruch auf die Verzinsung zu dem für Spareinlagen mit dreimonatiger Kündigungsfrist üblichen Zinssatz.",
      },
    },
    {
      "@type": "Question",
      name: "Wann muss der Vermieter die Mietkaution zurückzahlen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nach §551 Abs. 3 BGB muss der Vermieter die Kaution unverzüglich nach Beendigung des Mietverhältnisses zurückzahlen, sobald der Mieter die Wohnung zurückgegeben hat und alle Forderungen des Vermieters geklärt sind. Das bedeutet: Nach Rückgabe der Wohnung, Übergabe aller Schlüssel und Erstellung eines Abrechnungsüberblicks über Nebenkosten und mögliche Schäden. In der Regel sollte die Rückzahlung innerhalb von 3–6 Monaten erfolgen.",
      },
    },
    {
      "@type": "Question",
      name: "Muss der Vermieter die Kaution verzinsen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, der Vermieter muss die Kaution verzinsen. Der gesetzliche Zinssatz orientiert sich an dem für Spareinlagen mit dreimonatiger Kündigungsfrist üblichen Zinssatz (aktuell ca. 2,5–3%). Die Zinsen stehen dem Mieter zu und müssen bei Rückzahlung der Kaution ausgekehrt werden.",
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
            <span className="text-gray-700">Mietkaution Vermieter</span>
          </nav>

          <header className="mb-10">
            <p className="text-teal text-sm font-semibold uppercase tracking-wider mb-3">
              Ratgeber · 9 min Lesezeit
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-navy font-playfair mb-4 leading-tight">
              Mietkaution: Was Vermieter und Mieter wissen müssen (3 Monatsmieten Regel)
            </h1>
            <p className="text-gray-500 text-sm">Februar 2026 · einfach verwaltet.</p>
          </header>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Die Mietkaution: Ein Überblick für Vermieter
            </h2>
            <p>
              Die Mietkaution ist für Vermieter eine wichtige Absicherung — für 
              Mieter oft eine finanzielle Hürde. Doch was genau ist erlaubt? Wie 
              hoch darf die Kaution sein? Und welche Pflichten hat der Vermieter 
              bei der Anlage und Rückzahlung? Dieser Leitfaden klärt die wichtigsten 
              Fragen rund um die Mietkaution nach §551 BGB.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Höchstbetrag: 3 Monatsmieten nach §551 Abs. 1 BGB
            </h2>
            <p>
              Der Gesetzgeber hat den Höchstbetrag der Mietkaution klar geregelt: 
              Nach §551 Abs. 1 BGB darf die Kaution maximal das Dreifache der 
              monatlichen Kaltmiete betragen. Das bedeutet:
            </p>
            <div className="bg-navy/5 border border-navy/10 rounded-xl p-6">
              <h3 className="font-bold text-navy mb-3">Berechnung der maximalen Kaution</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Monatliche Kaltmiete</span>
                  <span className="font-semibold">€1.200</span>
                </div>
                <div className="flex justify-between">
                  <span>Maximale Kaution (3 Monatsmieten)</span>
                  <span className="font-semibold">€3.600</span>
                </div>
                <div className="border-t pt-2 mt-2 text-xs text-gray-500">
                  Bei einer Kaltmiete von €1.200 darf die Kaution also maximal €3.600 betragen.
                </div>
              </div>
            </div>
            <p>
              Wichtig: Auf die Kaltmiete kommen es an, nicht auf die Warmmiete. 
              Nebenkosten dürfen nicht in die Berechnung der maximalen Kaution 
              einfließen. Eine Kaution von 3 Monatskaltmieten plus Nebenkosten 
              wäre rechtswidrig.
            </p>
            <p>
              <strong>Hinweis:</strong> Werden mehrere Mietkautionen verlangt — 
              zum Beispiel für Möbel oder eine Garage zusätzlich zur Wohnungskaution — 
              addieren sich diese. Der Gesamtbetrag darf nicht das Dreifache der 
              Kaltmiete überschreiten.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Kautionskonto: Pflichten des Vermieters nach §551 Abs. 2 BGB
            </h2>
            <p>
              Der Vermieter ist nicht Eigentümer der Kaution — er verwahrt sie 
              nur treuhänderisch. Das hat konkrete Konsequenzen:
            </p>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              Getrennte Anlage auf Kautionskonto
            </h3>
            <p>
              Nach §551 Abs. 2 BGB muss der Vermieter die Kaution getrennt von 
              seinem Vermögen bei einem Kreditinstitut anlegen. Das Konto muss 
              entweder:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Auf den Namen des Mieters laufen (Sparbuch auf den Mieter)</li>
              <li>Oder mit einem Treuhandvermerk für den Mieter geführt werden</li>
            </ul>
            <p>
              Das eigene Geschäftskonto des Vermieters oder das Privatkonto sind 
              nicht zulässig. Die getrennte Anlage schützt das Geld vor Zugriffen 
              durch Gläubiger des Vermieters oder im Insolvenzfall.
            </p>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              Verzinsungspflicht
            </h3>
            <p>
              Der Vermieter muss die Kaution verzinsen. Nach §551 Abs. 3 Satz 1 BGB 
              gilt der übliche Zinssatz für Spareinlagen mit dreimonatiger 
              Kündigungsfrist. Aktuell liegt dieser bei etwa 2,5–3% pro Jahr.
            </p>
            <p>
              Die Zinsen stehen dem Mieter zu. Der Vermieter darf sie nicht 
              einbehalten — sie müssen bei Rückzahlung der Kaution ausgekehrt 
              werden.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Rückzahlung: Wann und wie?
            </h2>
            <p>
              Nach §551 Abs. 3 BGB muss der Vermieter die Kaution unverzüglich 
              nach Beendigung des Mietverhältnisses zurückzahlen. "Unverzüglich" 
              bedeutet: Sobald der Mieter die Wohnung zurückgegeben hat und alle 
              Forderungen des Vermieters geklärt sind.
            </p>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              Voraussetzungen für die Rückzahlung
            </h3>
            <p>
              Der Vermieter darf die Kaution zurückhalten, bis:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Die Wohnung ordnungsgemäß zurückgegeben wurde (Übergabeprotokoll)</li>
              <li>Alle Schlüssel zurückgegeben wurden</li>
              <li>Die Nebenkostenabrechnung erstellt und geprüft wurde</li>
              <li>Eventuelle Schäden festgestellt und bewertet wurden</li>
              <li>Offene Mietforderungen geklärt sind</li>
            </ul>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              Fristen für die Rückzahlung
            </h3>
            <p>
              Die gesetzliche Jahresfrist für die Nebenkostenabrechnung nach §556 
              Abs. 3 Satz 1 BGB gibt auch den Rahmen für die Kautionsrückzahlung vor: 
              In der Regel sollte die Kaution innerhalb von 3–6 Monaten nach 
              Mietende zurückgezahlt werden. Nur bei komplexen Schadensfällen oder 
              strittigen Nachzahlungen kann die Rückzahlung länger dauern — der 
              Vermieter muss dies dann aber begründen und nachweisen.
            </p>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              Rückzahlung inklusive Zinsen
            </h3>
            <p>
              Bei der Rückzahlung muss der Vermieter nicht nur die eingezahlte 
              Kaution, sondern auch die angefallenen Zinsen auskehren. Die 
              Berechnung erfolgt pro rata temporis — also für den tatsächlichen 
              Zeitraum der Hinterlegung.
            </p>
            <p>
              Beispiel: Bei einer Kaution von €3.600 und einem Zinssatz von 3% 
              über 2 Jahre beträgt die Zinszahlung €216. Der Mieter erhält also 
              €3.816 zurück.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Häufige Fehler und Fallstricke
            </h2>
            <p>
              Viele Vermieter machen Fehler bei der Kaution, die teuer werden können:
            </p>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              Fehler 1: Zu hohe Kaution verlangen
            </h3>
            <p>
              Eine Kaution über 3 Monatskaltmieten ist unwirksam. Der übersteigende 
              Teil muss sofort zurückgezahlt werden. Wenn der Vermieter die zu hohe 
              Kaution behält, kann der Mieter Schadensersatz wegen mutwilliger 
              Verzögerung verlangen (§551 Abs. 4 BGB).
            </p>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              Fehler 2: Kein separates Kautionskonto
            </h3>
            <p>
              Wer die Kaution auf dem eigenen Konto belässt, verstößt gegen §551 
              Abs. 2 BGB. Bei Insolvenz des Vermieters ist das Geld dann nicht mehr 
              geschützt. Auch hier droht Schadensersatz.
            </p>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              Fehler 3: Zu späte Rückzahlung
            </h3>
            <p>
              Wer die Kaution ohne triftigen Grund lange zurückhält, muss 
              Verzugszinsen zahlen. Der Verzugszinsatz beträgt aktuell Basiszins 
              (1,27%) plus 5 Prozentpunkte, also 6,27% p.a. (§288 Abs. 1 BGB).
            </p>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              Fehler 4: Zinsen nicht ausschütten
            </h3>
            <p>
              Die Zinsen auf die Kaution gehören dem Mieter. Wer sie einbehält, 
              macht sich schadensersatzpflichtig.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Die Mietkaution in 3 Raten nach §551 Abs. 2 Satz 2 BGB
            </h2>
            <p>
              Der Gesetzgeber hat Mietern eine Erleichterung geschaffen: Die 
              Kaution kann in drei gleichen monatlichen Raten gezahlt werden. 
              Der Mieter muss dies nicht beantragen — es ist sein Recht. Der 
              Vermieter kann die Ratenzahlung nicht verweigern.
            </p>
            <p>
              Die erste Rate ist mit Beginn des Mietverhältnisses fällig, die 
              weiteren Raten mit den nächsten Monatsmieten. Bis zur vollständigen 
              Zahlung steht dem Vermieter ein Zurückbehaltungsrecht an der 
              Wohnung zu — aber kein Kündigungsrecht wegen unpünktlicher 
              Kautionszahlung.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              FAQ: Mietkaution für Vermieter
            </h2>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-navy mb-2">
                  Wie hoch darf die Mietkaution maximal sein?
                </h3>
                <p className="text-sm">
                  Maximal 3 Monatskaltmieten nach §551 Abs. 1 BGB. Bei einer 
                  Kaltmiete von €1.000 also maximal €3.000.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-navy mb-2">
                  Muss die Kaution auf ein separates Kautionskonto?
                </h3>
                <p className="text-sm">
                  Ja, nach §551 Abs. 2 BGB muss die Kaution getrennt vom Vermietervermögen 
                  auf einem Treuhandkonto oder Sparbuch auf den Mieter angelegt werden.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-navy mb-2">
                  Wann muss die Kaution zurückgezahlt werden?
                </h3>
                <p className="text-sm">
                  Unverzüglich nach Mietende, sobald Wohnung zurückgegeben, Schlüssel 
                  übergeben und alle Forderungen geklärt sind. In der Regel innerhalb 
                  von 3–6 Monaten.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-navy mb-2">
                  Muss die Kaution verzinst werden?
                </h3>
                <p className="text-sm">
                  Ja, mit dem üblichen Zinssatz für Spareinlagen (aktuell ca. 2,5–3%). 
                  Die Zinsen stehen dem Mieter zu und müssen bei Rückzahlung ausgekehrt werden.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Fazit: Kaution korrekt handhaben
            </h2>
            <p>
              Die Mietkaution ist kein zusätzliches Einkommen für den Vermieter, 
              sondern eine treuhänderische Verwahrung. Wer die Regeln des §551 BGB 
              beachtet — Höchstbetrag von 3 Monatsmieten, getrennte Anlage auf 
              Kautionskonto, Verzinsung und rechtzeitige Rückzahlung — vermeidet 
              rechtliche Probleme und schützt sich selbst und den Mieter.
            </p>
          </div>

          <div className="mt-12 bg-teal/10 border border-teal/20 rounded-xl p-8">
            <h3 className="text-xl font-bold text-navy mb-2 font-playfair">
              Lassen Sie Ihre Immobilie von einfach verwaltet. professionell verwalten
            </h3>
            <p className="text-gray-600 mb-4">
              Wir kümmern uns um die korrekte Handhabung von Mietkautionen — von 
              der Einzahlung über die Verzinsung bis zur ordnungsgemäßen Rückzahlung. 
              Rechtssicher und transparent.
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
