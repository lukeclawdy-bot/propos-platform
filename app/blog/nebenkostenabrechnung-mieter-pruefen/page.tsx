import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Nebenkostenabrechnung prüfen: Leitfaden für Vermieter und Hausverwaltungen | einfach verwaltet.",
  description:
    "Nebenkostenabrechnung prüfen: Was eine gültige NKA enthalten muss, typische Fehler die Mieter angreifbar machen, die 12-Monats-Frist nach §556 Abs. 3 BGB und Belegeinsichtsrecht erklärt.",
  keywords:
    "Nebenkostenabrechnung prüfen Mieter, Nebenkostenabrechnung kontrollieren, NKA Fehler Vermieter, §556 BGB Betriebskostenabrechnung, Nebenkostenabrechnung Inhalt",
  openGraph: {
    title: "Nebenkostenabrechnung prüfen: Leitfaden für Vermieter und Hausverwaltungen",
    description:
      "Was muss eine Nebenkostenabrechnung enthalten? Häufige Fehler, die 12-Monats-Frist nach §556 Abs. 3 BGB und Mieterrechte auf Belegeinsicht.",
    url: "https://einfach-verwaltet.de/blog/nebenkostenabrechnung-mieter-pruefen",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Nebenkostenabrechnung prüfen: Leitfaden für Vermieter und Hausverwaltungen",
  description:
    "Was eine gültige Nebenkostenabrechnung enthalten muss, häufige Fehler und die 12-Monats-Frist nach §556 Abs. 3 BGB.",
  author: { "@type": "Organization", name: "einfach verwaltet." },
  publisher: {
    "@type": "Organization",
    name: "einfach verwaltet.",
    logo: { "@type": "ImageObject", url: "https://einfach-verwaltet.de/logo.png" },
  },
  datePublished: "2026-02-27",
  inLanguage: "de",
  url: "https://einfach-verwaltet.de/blog/nebenkostenabrechnung-mieter-pruefen",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Bis wann muss die Nebenkostenabrechnung dem Mieter vorliegen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nach §556 Abs. 3 BGB muss die Nebenkostenabrechnung dem Mieter spätestens 12 Monate nach Ende des Abrechnungszeitraums zugehen. Endet das Abrechnungsjahr am 31. Dezember, muss die NKA also bis zum 31. Dezember des Folgejahres zugestellt sein. Nach Ablauf der Frist können Nachzahlungen vom Vermieter nicht mehr geltend gemacht werden — es sei denn, der Vermieter hat die Verspätung nicht zu vertreten.",
      },
    },
    {
      "@type": "Question",
      name: "Welche Kosten dürfen in der Nebenkostenabrechnung nicht enthalten sein?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nicht umlagefähig sind: Verwaltungskosten (Hausverwaltungsgebühren), Reparatur- und Instandhaltungskosten, Kosten für Leerstand, Rechtsanwaltskosten sowie Kosten, die nicht ausdrücklich im Mietvertrag als umlagefähig vereinbart wurden. Auch Positionen, die nicht in der Betriebskostenverordnung (BetrKV) aufgeführt sind, können nur dann abgerechnet werden, wenn sie im Mietvertrag ausdrücklich vereinbart wurden.",
      },
    },
    {
      "@type": "Question",
      name: "Darf der Mieter die Originalbelege zur Nebenkostenabrechnung einsehen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Nach §259 BGB hat der Mieter das Recht, die der Abrechnung zugrunde liegenden Belege einzusehen — in der Regel beim Verwalter vor Ort. Fotokopien müssen auf Verlangen und ggf. gegen Kostenerstattung zur Verfügung gestellt werden. Verweigert der Vermieter die Belegeinsicht, kann der Mieter die Nachzahlung zurückhalten.",
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
            <span className="text-gray-700">Nebenkostenabrechnung prüfen</span>
          </nav>

          <header className="mb-10">
            <p className="text-teal text-sm font-semibold uppercase tracking-wider mb-3">
              Ratgeber · 10 min Lesezeit
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-navy font-playfair mb-4 leading-tight">
              Nebenkostenabrechnung prüfen: Was eine gültige NKA enthalten muss
            </h1>
            <p className="text-gray-500 text-sm">Februar 2026 · einfach verwaltet.</p>
          </header>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <p>
              Die Nebenkostenabrechnung (NKA) ist ein jährlicher Pflichttermin für 
              jeden Vermieter. Doch viele Abrechnungen sind fehlerhaft — und 
              fehlerhafte NKAs werden von Mietern zu Recht angefochten. 
              Das Ergebnis: Der Vermieter verliert Nachzahlungsansprüche oder 
              muss langwierige Streitigkeiten führen.
            </p>
            <p>
              Dieser Leitfaden erklärt aus Vermieter- und Hausverwaltungsperspektive, 
              was eine gültige Nebenkostenabrechnung enthalten muss, welche Fehler 
              sie angreifbar machen und welche Rechte Mieter bei der Belegeinsicht haben.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Die gesetzliche Grundlage: §556 Abs. 3 BGB
            </h2>
            <p>
              §556 Abs. 3 BGB ist die zentrale Norm für die Nebenkostenabrechnung. 
              Die wichtigste Vorgabe: Die NKA muss dem Mieter <strong>spätestens 
              12 Monate nach Ende des Abrechnungszeitraums</strong> zugehen. 
              Bei einem Abrechnungsjahr vom 1. Januar bis 31. Dezember muss 
              die Abrechnung also bis spätestens 31. Dezember des Folgejahres 
              beim Mieter eingegangen sein.
            </p>
            <p>
              Wichtige Konsequenz: Verpasst der Vermieter diese Frist ohne 
              Entschuldigung, verliert er den Anspruch auf Nachzahlung — 
              der Mieter muss dann nichts zahlen, selbst wenn die Abrechnung 
              korrekt ist. Guthaben müssen jedoch weiterhin ausgezahlt werden.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Was muss die Nebenkostenabrechnung enthalten?
            </h2>
            <p>
              Eine formell korrekte Nebenkostenabrechnung muss folgende 
              Bestandteile aufweisen:
            </p>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              1. Abrechnungszeitraum und -objekt
            </h3>
            <p>
              Klare Angabe des Zeitraums (z. B. 01.01.2025 bis 31.12.2025) und 
              der betreffenden Wohneinheit. Ohne diese Angabe ist die Abrechnung 
              formell unwirksam.
            </p>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              2. Auflistung aller Kostenarten
            </h3>
            <p>
              Jede Nebenkostenart muss einzeln aufgeführt werden mit den 
              Gesamtkosten für das Objekt. Erlaubt sind nur umlagefähige 
              Betriebskosten nach der Betriebskostenverordnung (BetrKV), 
              die im Mietvertrag auch vereinbart sind. Dazu gehören u. a.:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Grundsteuer</li>
              <li>Wasser/Abwasser</li>
              <li>Heizkosten (nach Heizkostenverordnung abzurechnen)</li>
              <li>Müllbeseitigung</li>
              <li>Hausmeisterservice</li>
              <li>Gebäudeversicherung</li>
              <li>Treppenhausreinigung und Gemeinschaftsstrom</li>
            </ul>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              3. Verteilerschlüssel nachvollziehbar darstellen
            </h3>
            <p>
              Der Verteilerschlüssel (z. B. Wohnfläche, Personenzahl, Verbrauch) 
              muss für jede Position angegeben und begründet werden. 
              Ohne nachvollziehbaren Schlüssel ist die Abrechnung anfechtbar.
            </p>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              4. Anteil des Mieters
            </h3>
            <p>
              Aus Gesamtkosten, Schlüssel und Mieteranteil muss der auf 
              den konkreten Mieter entfallende Betrag klar errechnet werden. 
              Verwirrende oder schwer nachvollziehbare Berechnungen führen 
              regelmäßig zu Widersprüchen.
            </p>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              5. Vorausgezahlte Vorauszahlungen verrechnen
            </h3>
            <p>
              Die geleisteten Nebenkostenvorauszahlungen des Mieters müssen 
              von den tatsächlichen Kosten abgezogen werden. Das Ergebnis 
              ist entweder eine Nachzahlung oder ein Guthaben.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Häufige Fehler, die eine NKA angreifbar machen
            </h2>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              Fehler 1: Nicht umlagefähige Kosten abgerechnet
            </h3>
            <p>
              Reparatur- und Instandhaltungskosten, Hausverwaltungsgebühren 
              und Kosten für Leerstand sind nicht umlagefähig. Tauchen sie 
              trotzdem in der NKA auf, kann der Mieter den Widerspruch einlegen.
            </p>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              Fehler 2: Unklarer oder falscher Verteilerschlüssel
            </h3>
            <p>
              Wird der Verteilerschlüssel nicht erklärt oder wird eine falsche 
              Gesamtfläche zugrunde gelegt, ist die Abrechnung formell fehlerhaft. 
              Prüfen Sie vor dem Versand, ob die Flächen stimmen.
            </p>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              Fehler 3: Frist verpasst
            </h3>
            <p>
              Die häufigste und teuerste Falle: Die NKA geht nach dem 
              31. Dezember des Folgejahres beim Mieter ein. Konsequenz: 
              Nachzahlungen verfallen. Guthaben müssen trotzdem ausgezahlt werden.
            </p>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              Fehler 4: Heizkosten nicht nach Heizkostenverordnung
            </h3>
            <p>
              Heizkosten müssen nach der Heizkostenverordnung (HeizKV) 
              abgerechnet werden — mindestens 50 %, maximal 70 % nach 
              dem tatsächlichen Verbrauch, der Rest nach Fläche. 
              Wer diese Aufteilung ignoriert, hat ein ernstes Problem.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Das Belegeinsichtsrecht des Mieters
            </h2>
            <p>
              Mieter haben nach §259 BGB das Recht, die der NKA zugrunde 
              liegenden Originalbelege einzusehen. Das bedeutet konkret: 
              Der Mieter kann verlangen, die Rechnungen und Belege 
              beim Verwalter vor Ort zu prüfen. Auf Anfrage müssen 
              (ggf. kostenpflichtige) Kopien zur Verfügung gestellt werden.
            </p>
            <p>
              Verweigert der Vermieter die Belegeinsicht, darf der Mieter 
              die Nachzahlung zurückhalten — bis die Belege vorgelegt werden. 
              Als Vermieter und Hausverwaltung sollten Sie daher alle Belege 
              geordnet aufbewahren und auf Anfrage zugänglich machen.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              FAQ: Nebenkostenabrechnung prüfen
            </h2>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-navy mb-2">
                  Bis wann muss die Nebenkostenabrechnung dem Mieter vorliegen?
                </h3>
                <p className="text-sm">
                  Spätestens 12 Monate nach Ende des Abrechnungszeitraums (§556 Abs. 3 BGB). 
                  Bei Dezember-Jahresende also bis zum 31. Dezember des Folgejahres. 
                  Verspätete NKAs führen zum Verlust des Nachzahlungsanspruchs.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-navy mb-2">
                  Welche Kosten dürfen in der NKA nicht enthalten sein?
                </h3>
                <p className="text-sm">
                  Nicht umlagefähig: Hausverwaltungsgebühren, Reparaturkosten, 
                  Leerstandskosten, Anwaltskosten und Positionen, die nicht im 
                  Mietvertrag vereinbart sind oder nicht in der BetrKV stehen.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-navy mb-2">
                  Darf der Mieter die Originalbelege einsehen?
                </h3>
                <p className="text-sm">
                  Ja, nach §259 BGB hat der Mieter Anspruch auf Belegeinsicht 
                  beim Verwalter. Kopien können auf Anfrage ggf. kostenpflichtig 
                  bereitgestellt werden. Verweigerung berechtigt zum Zurückhalten 
                  der Nachzahlung.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Fazit: Fehlerfreie NKA schützt den Vermieter
            </h2>
            <p>
              Eine korrekte Nebenkostenabrechnung ist kein bürokratischer 
              Selbstzweck — sie schützt den Vermieter vor verlorenen 
              Nachzahlungsansprüchen und vermeidet Streit. 
              Die drei größten Risiken: Fristversäumnis, nicht umlagefähige 
              Kosten und unklare Verteilerschlüssel. 
              Wer diese Fehler vermeidet, hat schon 80 % der Probleme im Griff.
            </p>
            <p>
              Möchten Sie Ihre Nebenkostenabrechnung zur Referenz haben? 
              Schauen Sie sich unseren{" "}
              <Link href="/bka-rechner" className="text-teal hover:underline">
                Betriebskostenrechner
              </Link>{" "}
              an — für eine erste Orientierung zur Abrechnung.
            </p>
          </div>

          <div className="mt-12 bg-teal/10 border border-teal/20 rounded-xl p-8">
            <h3 className="text-xl font-bold text-navy mb-2 font-playfair">
              Nebenkostenabrechnung ohne Fehler — mit einfach verwaltet.
            </h3>
            <p className="text-gray-600 mb-4">
              Wir erstellen Ihre Betriebskostenabrechnungen rechtssicher, 
              fristgerecht und vollständig nachvollziehbar. 
              Keine Fehler, keine Streitigkeiten, keine verlorenen Nachzahlungen.
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
