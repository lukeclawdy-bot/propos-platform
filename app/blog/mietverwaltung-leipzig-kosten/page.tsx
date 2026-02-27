import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Mietverwaltung Leipzig: Professionell und günstig — geht das wirklich? (2026) | einfach verwaltet.",
  description:
    "Mietverwaltung Leipzig: Was kostet eine professionelle Mietverwaltung 2026? Marktkontext, Leistungsumfang, Preisvergleich und wie Sie in Leipzig den besten Verwalter finden.",
  keywords:
    "Mietverwaltung Leipzig, Hausverwaltung Leipzig Kosten, Mietverwaltung Leipzig Preise, Hausverwalter Leipzig, Mietverwaltung Leipzig günstig",
  openGraph: {
    title: "Mietverwaltung Leipzig: Professionell und günstig — geht das wirklich? (2026)",
    description:
      "Marktkontext Leipzig, reale Preisranges und was moderne Mietverwaltung im Vergleich zu traditionellen Verwaltern leisten kann.",
    url: "https://einfach-verwaltet.de/blog/mietverwaltung-leipzig-kosten",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "article",
  },
  alternates: {
    canonical: "https://einfach-verwaltet.de/blog/mietverwaltung-leipzig-kosten",
  },
};

const jsonLdArticle = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Mietverwaltung Leipzig: Professionell und günstig — geht das wirklich? (2026)",
  description:
    "Ratgeber für Vermieter in Leipzig: Was kostet Mietverwaltung, was ist inklusive, und wie findet man einen guten Verwalter im wachsenden Leipziger Markt?",
  author: { "@type": "Organization", name: "einfach verwaltet." },
  publisher: {
    "@type": "Organization",
    name: "einfach verwaltet.",
    logo: { "@type": "ImageObject", url: "https://einfach-verwaltet.de/logo.png" },
  },
  datePublished: "2026-02-27",
  inLanguage: "de",
  url: "https://einfach-verwaltet.de/blog/mietverwaltung-leipzig-kosten",
};

const jsonLdFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was kostet eine Mietverwaltung in Leipzig 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mietverwaltung in Leipzig kostet 2026 typischerweise €20–32 pro Einheit und Monat. Das ist etwas günstiger als in München oder Hamburg, da das Mietniveau und die Personalkosten in Sachsen niedriger liegen. Einige Anbieter beginnen bereits ab €22/Einheit all-inklusive.",
      },
    },
    {
      "@type": "Question",
      name: "Was ist in einer Mietverwaltung inklusive?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Im Leistungsstandard enthalten sein sollten: Mieterkommunikation, Mieteinzug und Mahnwesen, Nebenkostenabrechnung nach §556 BGB, Instandhaltungskoordination, monatlicher Eigentümerbericht und ein digitales Dokumentenportal. Mieterwechsel-Begleitung wird oft separat abgerechnet.",
      },
    },
    {
      "@type": "Question",
      name: "Lohnt sich eine Mietverwaltung in Leipzig für Kleinvermieter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja — bereits ab einer Einheit kann sich eine Mietverwaltung lohnen, wenn man den eigenen Zeitaufwand realistisch einkalkuliert (3–5 Stunden/Monat je Einheit). Die Kosten sind als Werbungskosten nach §21 EStG vollständig absetzbar. Gerade für Fernvermieter oder Berufstätige ist es fast immer sinnvoll.",
      },
    },
    {
      "@type": "Question",
      name: "Gibt es günstige Mietverwaltung in Leipzig ohne Qualitätsverlust?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja — moderne Verwaltungsdienstleister können durch effizientere Prozesse und digitale Plattformen bei gleichem oder besserem Service günstiger anbieten als traditionelle Büros. Entscheidend ist das All-in-Preismodell: kein Basispreis plus versteckte Zusatzgebühren, sondern eine transparente Monatspauschale.",
      },
    },
  ],
};

export default function MietverwaltungLeipzigKostenPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ) }}
      />
      <Navbar />
      <main className="pt-20 min-h-screen bg-warm-white">
        <article className="max-w-[800px] mx-auto px-6 py-12">
          {/* Breadcrumb */}
          <nav className="text-sm text-text-light mb-6" aria-label="Breadcrumb">
            <Link href="/blog" className="hover:text-teal transition-colors">Ratgeber</Link>
            <span className="mx-2">›</span>
            <span>Mietverwaltung Leipzig Kosten</span>
          </nav>

          {/* Header */}
          <header className="mb-10">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-teal/10 text-teal text-xs font-semibold px-3 py-1 rounded-full">Kosten & Preise</span>
              <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">10 min Lesezeit</span>
              <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">Februar 2026</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-navy leading-tight mb-4">
              Mietverwaltung Leipzig: Professionell und günstig — geht das wirklich?
            </h1>
            <p className="text-lg text-text-light leading-relaxed">
              Was kostet eine Mietverwaltung in Leipzig wirklich, was ist inklusive, und wie finden Sie einen Verwalter, der beides bietet: Qualität und fairen Preis?
            </p>
          </header>

          {/* Content */}
          <div className="prose prose-navy max-w-none text-gray-700 leading-relaxed space-y-8">

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">Leipzig: Wachstumsmarkt mit besonderer Dynamik</h2>
              <p>
                Leipzig ist eine der am schnellsten wachsenden Großstädte Deutschlands. Die Einwohnerzahl überschritt 2024 die Marke von 630.000 — und der Zuzug hält an. Studierende, junge Familien und Berufspendler aus Berlin und München sorgen für eine anhaltend hohe Nachfrage nach Mietwohnungen. Das treibt die Mieten, erhöht den Verwaltungsaufwand und macht professionelle Mietverwaltung für Vermieter wichtiger denn je.
              </p>
              <p>
                Gleichzeitig ist Leipzig kein München: Das Preisniveau ist moderater, der Wettbewerb unter Hausverwaltungen intensiver, und viele Eigentümer sind kostenbewusster als in teuren Westmetropolen. Die Frage, die wir in diesem Artikel beantworten, lautet deshalb: Geht professionelle Mietverwaltung in Leipzig auch zu wettbewerbsfähigen Preisen — ohne dass die Qualität leidet?
              </p>
              <p>
                Die kurze Antwort: Ja, wenn man weiß, worauf man achten muss.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">Was eine Mietverwaltung in Leipzig leisten sollte</h2>
              <p>
                Professionelle Mietverwaltung ist weit mehr als Miete einziehen. Ein guter Verwalter nimmt Ihnen den gesamten operativen Aufwand ab — und schützt Sie gleichzeitig vor teuren Fehlern.
              </p>

              <h3 className="text-xl font-semibold text-navy mb-3">Kernleistungen (sollten immer inklusive sein)</h3>
              <ul className="space-y-2 mb-6">
                {[
                  "Mieterkommunikation: Anfragen, Beschwerden, Kündigungen — alles wird strukturiert bearbeitet",
                  "Mieteinzug via SEPA-Lastschrift, Buchung und monatlicher Abrechnung",
                  "Mahnwesen: frühzeitige, rechtssichere Reaktion bei Zahlungsrückständen",
                  "Jährliche Nebenkostenabrechnung nach §556 BGB inkl. Belegvorhaltung",
                  "Koordination von Instandhaltungen: Handwerkerbeauftragung, Terminüberwachung, Qualitätsprüfung",
                  "Monatliches Reporting: Was wurde eingenommen, was ausgegeben, was steht an?",
                  "Digitales Dokumentenportal: Verträge, Abrechnungen, Korrespondenz immer abrufbar",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-teal font-bold mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-navy mb-3">Zusatzleistungen (meist separat oder nach Aufwand)</h3>
              <ul className="space-y-2">
                {[
                  "Mieterwechsel-Begleitung inkl. Übergabeprotokoll (€100–300 je Wechsel)",
                  "Leerstandsmanagement und Vermarktungsbegleitung",
                  "Koordination größerer Renovierungs- oder Sanierungsmaßnahmen",
                  "Bonitätsprüfung von Mietinteressenten",
                  "Rechtliche Auseinandersetzungen und Anwaltskommunikation",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-amber-500 font-bold mt-0.5">!</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">Mietverwaltung Leipzig: Realistische Preisranges 2026</h2>
              <p>
                Die Preise für Mietverwaltung in Leipzig sind 2026 etwas günstiger als in westdeutschen Großstädten, liegen aber im vergleichbaren Bereich zu Dresden oder Halle. Das liegt an moderateren Personalkosten und einem insgesamt wettbewerbsfähigeren Markt.
              </p>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden my-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-navy text-white">
                      <th className="text-left px-4 py-3 font-semibold">Anbietertyp</th>
                      <th className="text-left px-4 py-3 font-semibold">Preisspanne</th>
                      <th className="text-left px-4 py-3 font-semibold">Typisch für</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-3 font-medium">Kleines Lokalbüro</td>
                      <td className="px-4 py-3">€18–25/Einheit/Monat</td>
                      <td className="px-4 py-3 text-gray-500">Oft viele Zusatzgebühren, begrenzte Digitalisierung</td>
                    </tr>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <td className="px-4 py-3 font-medium">Mittelgroßes Büro</td>
                      <td className="px-4 py-3">€24–32/Einheit/Monat</td>
                      <td className="px-4 py-3 text-gray-500">Solide Leistung, teilweise digitalisiert</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-3 font-medium">Bundesweiter Anbieter</td>
                      <td className="px-4 py-3">€28–38/Einheit/Monat</td>
                      <td className="px-4 py-3 text-gray-500">Standardisierte Prozesse, weniger lokale Kenntnis</td>
                    </tr>
                    <tr className="bg-teal/5">
                      <td className="px-4 py-3 font-medium text-teal">einfach verwaltet.</td>
                      <td className="px-4 py-3 text-teal">ab €24/Einheit/Monat</td>
                      <td className="px-4 py-3 text-teal font-medium">All-in, digital, schnell</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                Wichtiger als der Papierpeis ist der Gesamtpreis: Ein Anbieter mit €18 Basishonorar, der Eigentümerversammlungen, Mieterwechsel und Mahnschreiben extra berechnet, kann am Ende teurer sein als ein All-in-Anbieter für €26.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">Professionell UND günstig: Wie geht das zusammen?</h2>
              <p>
                Viele Eigentümer in Leipzig glauben, dass günstig automatisch bedeutet: weniger Service, langsamere Reaktion, mehr Fehler. Das war früher häufig so — ist es aber nicht mehr.
              </p>
              <p>
                Moderne Verwaltungsanbieter arbeiten mit anderen Strukturen: konsequente Digitalisierung aller Abläufe, strukturierte Kommunikationskanäle, klare Verantwortlichkeiten und effiziente Reportingprozesse. Das Ergebnis für Eigentümer: schnellere Antworten, weniger Rückfragen, zuverlässige Abrechnungen — bei einem fairen Preis.
              </p>
              <p>
                Was für Sie als Eigentümer konkret bedeutet:
              </p>
              <ul className="space-y-3">
                {[
                  { title: "Keine wochenlangen Wartezeiten", desc: "Mieteranfragen werden schnell bearbeitet. Das schützt vor Eskalationen und hält Mieter länger in der Wohnung." },
                  { title: "Nebenkostenabrechnung ohne Nacharbeit", desc: "Korrekte, fristgerechte Abrechnungen bedeuten keine Widersprüche, keine Nachkorrektur, keine Mieterkonflikte." },
                  { title: "Transparenz ohne Anruf", desc: "Sie sehen jederzeit, was auf Ihrem Konto ist, welche Rechnungen offen sind und was der Verwalter gerade bearbeitet." },
                  { title: "Volle steuerliche Absetzbarkeit", desc: "Alle Verwaltungskosten sind als Werbungskosten nach §21 EStG absetzbar — bei 35–42% Steuersatz reduziert sich der Nettobetrag erheblich." },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-teal font-bold mt-0.5 text-lg">→</span>
                    <div>
                      <span className="font-semibold text-navy">{item.title}: </span>
                      <span>{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">5 Fragen, die Sie jedem Mietverwaltungsanbieter in Leipzig stellen sollten</h2>
              <ol className="space-y-4">
                {[
                  "Ist die Nebenkostenabrechnung im Preis inbegriffen — oder wird die separat berechnet?",
                  "Wie schnell werden Mieteranfragen beantwortet? Gibt es eine garantierte Reaktionszeit?",
                  "Wie werden Handwerker ausgewählt — mit oder ohne Vergleichsangebote?",
                  "Welches Reporting erhalte ich? Monatlich, digital, mit welchen Kennzahlen?",
                  "Was kostet ein Mieterwechsel, eine außerordentliche Sonderbeauftragung, eine Mahnung?",
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="w-7 h-7 rounded-full bg-navy text-white text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-4">
                Ein guter Verwalter antwortet auf alle fünf Fragen klar und vollständig. Vague Antworten oder ausweichendes Verhalten sind Warnsignale.
              </p>
            </section>

            {/* FAQ */}
            <section className="bg-white rounded-2xl border border-gray-200 p-8 mt-10">
              <h2 className="text-2xl font-bold text-navy mb-6">Häufige Fragen zur Mietverwaltung in Leipzig</h2>
              <div className="space-y-6">
                {[
                  {
                    q: "Was kostet Mietverwaltung in Leipzig 2026?",
                    a: "Typisch sind €20–32 pro Einheit und Monat. Achten Sie auf das All-in-Preismodell: Basispreise unter €20 enthalten oft viele kostenpflichtige Extras, die den Gesamtpreis deutlich erhöhen.",
                  },
                  {
                    q: "Lohnt sich Mietverwaltung für eine einzelne Wohnung in Leipzig?",
                    a: "Bei realistischer Zeitbewertung (3–5 h/Monat) und steuerlicher Absetzbarkeit (§21 EStG) lohnt sich Mietverwaltung fast immer — besonders für Berufstätige und Fernvermieter.",
                  },
                  {
                    q: "Was ist der Unterschied zwischen Mietverwaltung und WEG-Verwaltung?",
                    a: "Mietverwaltung betreut das Mietverhältnis zwischen Eigentümer und Mieter (Einzeleigentum). WEG-Verwaltung ist für Eigentümergemeinschaften zuständig (Gemeinschaftseigentum, Eigentümerversammlung). Beides kann kombiniert werden.",
                  },
                  {
                    q: "Kann ich die Mietverwaltungskosten steuerlich absetzen?",
                    a: "Ja — vollständig als Werbungskosten bei Einkünften aus Vermietung und Verpachtung nach §21 EStG. Bei 42% Steuersatz trägt das Finanzamt knapp die Hälfte der Kosten.",
                  },
                ].map((item, i) => (
                  <div key={i} className="border-b border-gray-100 pb-5 last:border-0 last:pb-0">
                    <h3 className="font-semibold text-navy mb-2">{item.q}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section className="bg-navy rounded-2xl p-8 text-white text-center mt-10">
              <h2 className="text-2xl font-bold mb-3">Mietverwaltung Leipzig — jetzt Angebot anfragen</h2>
              <p className="text-white/80 mb-6 max-w-md mx-auto">
                Transparente All-in-Preise, schnelle Kommunikation, kein Chaos. Erhalten Sie in 24 Stunden ein individuelles Angebot.
              </p>
              <Link
                href="/hausverwaltung-leipzig"
                className="inline-flex items-center gap-2 bg-teal text-white px-8 py-4 rounded-xl font-semibold text-base hover:bg-teal/90 transition-all hover:shadow-lg"
              >
                Hausverwaltung Leipzig →
              </Link>
              <p className="text-white/50 text-xs mt-4">Kostenlos & unverbindlich · Antwort am selben Tag</p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
