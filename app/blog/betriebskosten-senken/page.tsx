import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Betriebskosten senken: 8 legale Wege für Vermieter 2026 | einfach verwaltet.",
  description:
    "Betriebskosten senken als Vermieter: 8 bewährte und rechtssichere Wege, um Nebenkosten zu reduzieren und die Rendite Ihrer Immobilie zu steigern.",
  keywords:
    "Betriebskosten senken, Nebenkosten reduzieren Vermieter, Betriebskosten optimieren, Nebenkosten Einsparungen Immobilie",
  openGraph: {
    title: "Betriebskosten senken: 8 legale Wege für Vermieter 2026",
    description:
      "Wie Vermieter Betriebskosten rechtssicher reduzieren — 8 konkrete Strategien.",
    url: "https://einfach-verwaltet.de/blog/betriebskosten-senken",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Betriebskosten senken: 8 legale Wege für Vermieter",
  description:
    "8 bewährte Strategien für Vermieter, um Betriebskosten rechtssicher zu senken.",
  author: { "@type": "Organization", name: "einfach verwaltet." },
  publisher: {
    "@type": "Organization",
    name: "einfach verwaltet.",
    logo: { "@type": "ImageObject", url: "https://einfach-verwaltet.de/logo.png" },
  },
  datePublished: "2026-02-01",
  inLanguage: "de",
  url: "https://einfach-verwaltet.de/blog/betriebskosten-senken",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Welche Betriebskosten kann ein Vermieter am einfachsten senken?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die größten Einsparpotenziale liegen bei Versicherungsprämien (regelmäßige Marktvergleiche), Müllgebühren (Behälteroptimierung), Hausmeisterkosten (Ausschreibung und Pauschalverträge) sowie bei der Gartenpflege. Energiekosten (Heizung, Strom für Allgemeinflächen) bieten durch Modernisierung langfristig die größten Einsparungen.",
      },
    },
    {
      "@type": "Question",
      name: "Darf ein Vermieter nicht umlagefähige Kosten auf Mieter abwälzen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nein. Nur die in §2 BetrKV aufgeführten Betriebskosten dürfen auf Mieter umgelegt werden. Verwaltungskosten, Instandhaltungskosten und Reparaturen sind nicht umlagefähig. Wer unzulässige Positionen abrechnet, riskiert Widersprüche und Rückforderungen.",
      },
    },
    {
      "@type": "Question",
      name: "Lohnt sich eine Solaranlage zur Reduzierung der Betriebskosten?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, bei günstigen Bedingungen. Eine Photovoltaikanlage mit Mieterstrom-Modell kann Allgemeinstromkosten deutlich senken. Die Amortisationszeit liegt bei 8–12 Jahren. Förderungen sind über KfW-Kredite und das EEG möglich. Eine Fachplanung ist empfehlenswert.",
      },
    },
    {
      "@type": "Question",
      name: "Wie kann ich die Heizkosten in meiner Immobilie reduzieren?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wichtige Maßnahmen: Hydraulischer Abgleich der Heizungsanlage (senkt Verbrauch um 10–15%), Dämmung der Heizkörpernischen, Heizungswartung (Wirkungsgrad verbessern), smarte Thermostatventile und ggf. Heizungstausch bei alten Anlagen. Auch der Anbieterwechsel beim Gaslieferanten spart oft 5–15% der Kosten.",
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
            <span className="text-gray-700">Betriebskosten senken</span>
          </nav>

          <header className="mb-10">
            <p className="text-teal text-sm font-semibold uppercase tracking-wider mb-3">
              Ratgeber · 10 min Lesezeit
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-navy font-playfair mb-4 leading-tight">
              Betriebskosten senken: 8 legale Wege für Vermieter
            </h1>
            <p className="text-gray-500 text-sm">Februar 2026 · einfach verwaltet.</p>
          </header>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">

            <p>
              Steigende Betriebskosten belasten Eigentümer und Mieter gleichermaßen.
              Viele Vermieter lassen jedoch Einsparpotenziale ungenutzt — aus Zeitmangel,
              fehlendem Überblick oder der Annahme, dass sich Optimierungen kaum lohnen.
              Das ist ein Irrtum: Bei einem Mehrfamilienhaus mit 10 Einheiten können
              systematische Betriebskostenoptimierungen jährlich €2.000–6.000 einsparen.
            </p>

            <div className="bg-teal/10 border border-teal/20 rounded-xl p-5 my-6">
              <p className="font-bold text-navy text-sm mb-1">Hinweis: Was sind Betriebskosten?</p>
              <p className="text-sm text-gray-700">
                Betriebskosten sind laufende Kosten des Gebäudes, die nach §2 BetrKV
                auf Mieter umgelegt werden können: Heizung, Wasser, Müll, Hausmeister,
                Versicherungen u.a. Verwaltungs- und Instandhaltungskosten gehören
                nicht dazu.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-6">
              8 Wege, um Betriebskosten legal zu senken
            </h2>

            {[
              {
                num: "1",
                title: "Versicherungen regelmäßig vergleichen",
                content: `Gebäudeversicherungen werden selten gekündigt — obwohl der Markt erhebliche Preisunterschiede aufweist. Ein Wechsel der Gebäudeversicherung spart bei einem typischen Hamburger Mehrfamilienhaus (10 Einheiten, €2M Neubausumme) oft €200–500 pro Jahr.

Empfehlung: Holen Sie alle 2–3 Jahre mindestens drei Vergleichsangebote ein. Vergleichsportale wie CHECK24 oder Direktanfragen bei Allianz, AXA, Zurich, und ERGO liefern schnell Anhaltspunkte. Achten Sie dabei auf gleiche Leistungsumfänge (Leitungswasser, Sturm, Feuer) und keine Deckungslücken.`,
              },
              {
                num: "2",
                title: "Müllbehälter und -frequenzen optimieren",
                content: `Viele Eigentümer zahlen für zu große Müllbehälter oder zu häufige Leerungen. Prüfen Sie: Welche Behältergröße ist tatsächlich nötig? Wird der Bioabfall tatsächlich genutzt? In Hamburg kostet ein 240-Liter-Restmüllbehälter (wöchentliche Leerung) deutlich mehr als ein 120-Liter-Behälter (14-tägige Leerung).

Maßnahme: Analysieren Sie die Abfallmengen über 2–3 Monate. Beantragen Sie beim Hamburger Stadtreinigungsdienst (SRH) eine Behälteranpassung. Auch Umstieg auf 14-tägige Leerung (Restmüll) ist bei entsprechender Entsorgungsdisziplin der Mieter möglich.`,
              },
              {
                num: "3",
                title: "Hydraulischen Abgleich der Heizung durchführen",
                content: `Ein hydraulisch nicht abgeglichener Heizkreislauf verbraucht 10–15% mehr Energie, als nötig wäre. Der hydraulische Abgleich nach Verfahren A oder B sorgt dafür, dass alle Heizkörper die richtige Wärmemenge erhalten — ohne dass einzelne Räume überhitzt werden.

Kosten: €500–2.000 (je nach Größe des Gebäudes). Förderung möglich über BEG-Bundesförderung (BAFA) mit bis zu 15% der Kosten. Amortisationszeit: 2–4 Jahre.`,
              },
              {
                num: "4",
                title: "Strom für Allgemeinflächen optimieren",
                content: `Treppenhaus, Keller, Außenbeleuchtung — der Allgemeinstrom wird oft vergessen. Umrüstung auf LED-Beleuchtung mit Bewegungsmelder spart bis zu 70% des Allgemeinstroms. Bei einem typischen Hamburger Mehrfamilienhaus sind das €150–400 pro Jahr.

Weitere Maßnahme: Wechsel des Allgemeinstromanbieters. Viele Eigentümer haben noch Altverträge mit Standardtarifen. Vergleich und Wechsel lohnen sich jedes Jahr.`,
              },
              {
                num: "5",
                title: "Hausmeister- und Reinigungsverträge ausschreiben",
                content: `Hausmeisterverträge laufen oft über Jahre ohne Überprüfung. Holen Sie alle 2–3 Jahre neue Angebote ein. Die Preisspanne für Hausmeisterleistungen in Hamburg ist erheblich — 30–50% Unterschied zwischen vergleichbaren Angeboten sind keine Seltenheit.

Tipp: Definieren Sie ein klares Leistungsverzeichnis (Reinigungsfrequenz, Winterdienst, Grünpflege) und vergleichen Sie apfel-mit-apfel. Pauschalverträge sind oft günstiger als Stundenabrechnung.`,
              },
              {
                num: "6",
                title: "Wasserleckagen und Rohrprobleme beheben",
                content: `Undichte Wasserleitungen, tropfende Hähne und schlecht eingestellte Druckreduzierventile erhöhen den Wasserverbrauch erheblich. Eine Dämmung von Warmwasserleitungen reduziert den Energieverlust beim Warmwasser.

Empfehlung: Lassen Sie alle 3–5 Jahre eine Wasserverbrauchsanalyse durchführen. Auffälligkeiten zeigen sich oft schon in den Verbrauchswerten der Betriebskostenabrechnung — ein Vergleich mit dem Vorjahr ist aufschlussreich.`,
              },
              {
                num: "7",
                title: "Gartenpflege und Außenanlage optimieren",
                content: `Gartenarbeiten sind nach §2 Nr. 10 BetrKV umlagefähig — aber nur tatsächlich erbrachte Leistungen. Überprüfen Sie, ob alle in Rechnung gestellten Leistungen auch tatsächlich durchgeführt wurden.

Einsparmöglichkeit: Automatische Bewässerungsanlage reduziert den Wasserverbrauch für die Außenanlage um 20–40%. Rasen durch pflegeleichte Bepflanzung (Bodendecker, Gehölze) ersetzen — senkt Mähkosten dauerhaft.`,
              },
              {
                num: "8",
                title: "Betriebskosten professionell verwalten lassen",
                content: `Viele Eigentümer zahlen überhöhte Betriebskosten, weil niemand systematisch nach Optimierungen sucht. Eine professionelle Hausverwaltung analysiert regelmäßig alle Kostenpositionen, holt Vergleichsangebote ein und gibt Empfehlungen.

Die Kosten für eine professionelle Verwaltung (€24–34/Einheit/Monat) rechnen sich oft allein durch die Betriebskostenoptimierungen — ohne die Zeitersparnis für den Eigentümer.`,
              },
            ].map(({ num, title, content }) => (
              <div key={num} className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="flex items-center gap-3 bg-navy/5 px-5 py-4">
                  <div className="w-8 h-8 bg-teal text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {num}
                  </div>
                  <h3 className="font-bold text-navy">{title}</h3>
                </div>
                <div className="px-5 py-4">
                  {content.split("\n\n").map((para, i) => (
                    <p key={i} className={`text-gray-700 text-sm ${i > 0 ? "mt-3" : ""}`}>
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            <div className="bg-navy/5 border border-navy/10 rounded-xl p-6 my-6">
              <h3 className="font-bold text-navy mb-3">Einsparpotenzial: Beispielrechnung</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between border-b pb-2">
                  <span>Versicherungswechsel</span>
                  <span className="font-semibold text-green-700">− €300/Jahr</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Mülloptimierung</span>
                  <span className="font-semibold text-green-700">− €200/Jahr</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>LED-Umrüstung Allgemeinstrom</span>
                  <span className="font-semibold text-green-700">− €250/Jahr</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Hydraulischer Abgleich</span>
                  <span className="font-semibold text-green-700">− €600/Jahr</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Hausmeister-Neuausschreibung</span>
                  <span className="font-semibold text-green-700">− €400/Jahr</span>
                </div>
                <div className="flex justify-between pt-2 font-bold">
                  <span>Gesamteinsparung (Beispiel 10 Einheiten)</span>
                  <span className="text-green-700">− €1.750/Jahr</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                [Schätzwerte] Tatsächliche Einsparungen hängen vom Objekt ab.
              </p>
            </div>

            {/* FAQ Section */}
            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-6">
              Häufige Fragen zu Betriebskosten senken
            </h2>

            <div className="space-y-6">
              {[
                {
                  q: "Welche Betriebskosten kann ein Vermieter am einfachsten senken?",
                  a: "Die größten Einsparpotenziale liegen bei Versicherungsprämien, Müllgebühren, Hausmeisterkosten und Allgemeinstrom. Energiekosten bieten durch Modernisierung die langfristig größten Einsparungen.",
                },
                {
                  q: "Darf ein Vermieter nicht umlagefähige Kosten auf Mieter abwälzen?",
                  a: "Nein. Nur §2 BetrKV-konforme Positionen dürfen umgelegt werden. Verwaltungs- und Instandhaltungskosten sind nicht umlagefähig. Wer unzulässige Positionen abrechnet, riskiert Widersprüche und Rückforderungen.",
                },
                {
                  q: "Lohnt sich eine Solaranlage zur Reduzierung der Betriebskosten?",
                  a: "Bei günstigen Bedingungen ja. Eine PV-Anlage mit Mieterstrom-Modell kann Allgemeinstromkosten deutlich senken. Amortisationszeit: 8–12 Jahre. Förderungen über KfW und EEG sind möglich.",
                },
                {
                  q: "Wie kann ich die Heizkosten in meiner Immobilie reduzieren?",
                  a: "Hydraulischer Abgleich (−10–15%), Heizungswartung, smarte Thermostate, Dämmaßnahmen und ggf. Heizungstausch. Auch ein Wechsel des Gaslieferanten spart oft 5–15% der Energiekosten.",
                },
              ].map(({ q, a }) => (
                <div key={q} className="border border-gray-200 rounded-xl p-5">
                  <h3 className="font-bold text-navy mb-2">{q}</h3>
                  <p className="text-gray-600 text-sm">{a}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="bg-navy text-white rounded-2xl p-8 mt-10 text-center">
              <h3 className="text-xl font-bold font-playfair mb-3">
                Betriebskosten optimieren lassen
              </h3>
              <p className="text-white/80 mb-6 text-sm">
                einfach verwaltet. analysiert Ihre Betriebskosten und identifiziert
                Einsparpotenziale — systematisch, rechtssicher und ohne Mehraufwand
                für Sie.
              </p>
              <Link
                href="/anfrage"
                className="inline-block bg-teal hover:bg-teal/90 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                Kostenloses Angebot anfragen →
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
