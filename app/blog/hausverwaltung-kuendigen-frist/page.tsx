import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Hausverwaltung kündigen: Fristen, Ablauf und Wechsel 2026 | einfach verwaltet.",
  description:
    "Hausverwaltung kündigen Frist 2026: Kündigungsfristen für WEG und Mietverwaltung, §26 WEG, Außerordentliche Kündigung, Checkliste für den Verwalterwechsel.",
  keywords:
    "Hausverwaltung kündigen Frist, Hausverwaltung kündigen, Verwaltervertrag kündigen, Kündigungsfrist Hausverwaltung, WEG Verwalter abberufen",
  openGraph: {
    title: "Hausverwaltung kündigen: Fristen, Ablauf und Wechsel 2026",
    description:
      "Wie kündigen Sie einen Hausverwalter rechtssicher? Fristen, Abberufungsbeschluss bei WEG, Außerordentliche Kündigung und Checkliste für die Übergabe.",
    url: "https://einfach-verwaltet.de/blog/hausverwaltung-kuendigen-frist",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "article",
  },
  alternates: {
    canonical: "https://einfach-verwaltet.de/blog/hausverwaltung-kuendigen-frist",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Hausverwaltung kündigen: Fristen, Ablauf und Wechsel 2026",
  description:
    "Schritt-für-Schritt-Anleitung zur Kündigung einer Hausverwaltung: WEG-Abberufung, Mietverwaltungskündigung, Fristen, Übergabecheckliste.",
  author: { "@type": "Organization", name: "einfach verwaltet." },
  publisher: {
    "@type": "Organization",
    name: "einfach verwaltet.",
    logo: { "@type": "ImageObject", url: "https://einfach-verwaltet.de/logo.png" },
  },
  datePublished: "2026-02-27",
  inLanguage: "de",
  url: "https://einfach-verwaltet.de/blog/hausverwaltung-kuendigen-frist",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Wie kündige ich eine Hausverwaltung?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Bei Mietverwaltung: Schriftliche Kündigung per eingeschriebenem Brief unter Einhaltung der vertraglichen Kündigungsfrist (üblich: 3–6 Monate zum Jahresende). Bei WEG-Verwaltung: Abberufungsbeschluss der Eigentümerversammlung nach §26 WEG mit einfacher Stimmenmehrheit. Danach endet das Amtsverhältnis sofort; der Dienstvertrag kann separat mit vereinbarter Frist gekündigt werden.",
      },
    },
    {
      "@type": "Question",
      name: "Wie lang ist die Kündigungsfrist bei einer Hausverwaltung?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die Kündigungsfrist steht im Verwaltervertrag und variiert je nach Vertrag. Typisch sind 3 Monate (Mietverwaltung, kleinere Objekte) bis 6 Monate (größere WEG-Objekte) zum Jahresende oder Quartalsletzten. Bei WEG kann der Verwalter außerdem jederzeit durch Mehrheitsbeschluss abberufen werden — unabhängig von der Vertragslaufzeit.",
      },
    },
    {
      "@type": "Question",
      name: "Kann ich einen Verwalter außerordentlich kündigen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja — wenn ein wichtiger Grund vorliegt, ist eine außerordentliche Kündigung ohne Einhaltung von Fristen möglich. Wichtige Gründe sind: nachgewiesene Untreue oder Unterschlagung, schwerwiegende Pflichtverletzungen (z.B. keine Nebenkostenabrechnung trotz Fristsetzung), arglistige Täuschung bei Vertragsschluss oder grobe Nachlässigkeit. Die außerordentliche Kündigung sollte schriftlich mit Begründung erfolgen.",
      },
    },
    {
      "@type": "Question",
      name: "Welche Unterlagen muss der alte Verwalter übergeben?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Der ausscheidende Verwalter ist verpflichtet, alle Unterlagen herauszugeben, die er im Rahmen seines Auftrags erhalten oder erstellt hat. Dazu gehören: Mietverträge, Nebenkostenabrechnungen der letzten Jahre, Korrespondenz mit Mietern, Wartungsprotokolle und -verträge, Versicherungsunterlagen, Bankvollmachten und Hausgeldkonten (bei WEG), Beschlussbuch (bei WEG), Objektschlüssel und technische Unterlagen.",
      },
    },
  ],
};

export default function HausverwaltungKuendigenFristPage() {
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
      <main className="pt-20 min-h-screen bg-warm-white">
        <article className="max-w-[800px] mx-auto px-6 py-12">
          <nav className="text-sm text-text-light mb-6" aria-label="Breadcrumb">
            <Link href="/blog" className="hover:text-teal transition-colors">Ratgeber</Link>
            <span className="mx-2">›</span>
            <span>Hausverwaltung kündigen Frist</span>
          </nav>

          <header className="mb-10">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-teal/10 text-teal text-xs font-semibold px-3 py-1 rounded-full">Verwalterwechsel</span>
              <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">9 min Lesezeit</span>
              <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">Februar 2026</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-navy leading-tight mb-4">
              Hausverwaltung kündigen: Fristen, Ablauf und Checkliste für den Wechsel
            </h1>
            <p className="text-lg text-text-light leading-relaxed">
              Schritt-für-Schritt: Wie Sie Ihren Hausverwalter rechtssicher kündigen — für Mietverwaltung und WEG, mit Kündigungsfristen, Abberufungsbeschluss und Übergabe-Checkliste.
            </p>
          </header>

          <div className="prose prose-navy max-w-none text-gray-700 leading-relaxed space-y-8">

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">Zwei Szenarien: WEG-Verwaltung vs. Mietverwaltung</h2>
              <p>
                Der Weg zur Kündigung einer Hausverwaltung unterscheidet sich grundlegend je nach Art des Mietverhältnisses. Der wichtigste Unterschied: Bei der WEG-Verwaltung ist die Abberufung des Verwalters eine Entscheidung der Eigentümergemeinschaft als Kollektiv. Bei der Mietverwaltung kündigt der einzelne Eigentümer seinen Verwaltervertrag.
              </p>

              <div className="grid md:grid-cols-2 gap-5 my-6">
                <div className="bg-white rounded-xl border-2 border-navy/10 p-5">
                  <h3 className="font-bold text-navy mb-3">WEG-Verwaltung</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2"><span className="text-teal">•</span>Abberufungsbeschluss der Eigentümerversammlung (§26 WEG)</li>
                    <li className="flex gap-2"><span className="text-teal">•</span>Einfache Stimmenmehrheit genügt</li>
                    <li className="flex gap-2"><span className="text-teal">•</span>Amtsverhältnis endet mit Beschluss sofort</li>
                    <li className="flex gap-2"><span className="text-teal">•</span>Dienstvertrag separat kündigen (Fristen beachten)</li>
                    <li className="flex gap-2"><span className="text-teal">•</span>Neuwahl des Verwalters auf gleicher Versammlung möglich</li>
                  </ul>
                </div>
                <div className="bg-white rounded-xl border-2 border-navy/10 p-5">
                  <h3 className="font-bold text-navy mb-3">Mietverwaltung</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2"><span className="text-teal">•</span>Schriftliche Kündigung per Einschreiben</li>
                    <li className="flex gap-2"><span className="text-teal">•</span>Kündigungsfrist aus Verwaltervertrag (meist 3–6 Monate)</li>
                    <li className="flex gap-2"><span className="text-teal">•</span>Häufig: Kündigung zum Jahresende</li>
                    <li className="flex gap-2"><span className="text-teal">•</span>Außerordentliche Kündigung bei wichtigem Grund</li>
                    <li className="flex gap-2"><span className="text-teal">•</span>Alle Unterlagen müssen übergeben werden</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">Kündigungsfristen: Was gilt rechtlich?</h2>
              <p>
                Die Kündigungsfrist für eine Hausverwaltung ist im Verwaltervertrag geregelt. Typische Fristen:
              </p>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden my-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-navy text-white">
                      <th className="text-left px-4 py-3 font-semibold">Art des Vertrags</th>
                      <th className="text-left px-4 py-3 font-semibold">Typische Frist</th>
                      <th className="text-left px-4 py-3 font-semibold">Kündigung zum</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-3">Mietverwaltung (kleines Objekt)</td>
                      <td className="px-4 py-3">3 Monate</td>
                      <td className="px-4 py-3">Jahresende oder Quartalsende</td>
                    </tr>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <td className="px-4 py-3">Mietverwaltung (größeres Objekt)</td>
                      <td className="px-4 py-3">6 Monate</td>
                      <td className="px-4 py-3">Jahresende</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-3">WEG-Verwaltung (Dienstvertrag)</td>
                      <td className="px-4 py-3">3–6 Monate</td>
                      <td className="px-4 py-3">Jahresende (nach Abberufung)</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">Außerordentliche Kündigung</td>
                      <td className="px-4 py-3 font-semibold text-teal">Keine</td>
                      <td className="px-4 py-3">Sofort (wichtiger Grund)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-500">
                Hinweis: Keine vertragliche Kündigungsregelung? Nach §621 BGB gelten gesetzliche Fristen: Bei monatlicher Vergütung bis zum 15. eines Monats zum Monatsende; ansonsten 6 Wochen zum Quartalsende.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">Außerordentliche Kündigung: Wann ist sie möglich?</h2>
              <p>
                Bei schwerwiegenden Verstößen des Verwalters müssen Sie keine Kündigungsfrist einhalten. Wichtige Gründe für eine außerordentliche Kündigung sind:
              </p>
              <ul className="space-y-2 mt-3">
                {[
                  "Nachgewiesene Untreue oder Unterschlagung von Mieten oder Hausgeld",
                  "Keine Nebenkostenabrechnung nach wiederholter Mahnung und Fristsetzung",
                  "Dauerhafte Unerreichbarkeit trotz dringender Schadensfälle",
                  "Arglistige Täuschung beim Vertragsschluss",
                  "Schwerwiegende Interessenkonflikte (z.B. Auftragsvergabe an eigene Firma zu überhöhten Preisen)",
                  "Grobe Nachlässigkeit bei der Verkehrssicherungspflicht",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm list-none">
                    <span className="text-red-500 font-bold mt-0.5 shrink-0">!</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4">
                Die außerordentliche Kündigung muss schriftlich erfolgen und den wichtigen Grund benennen. Dokumentieren Sie alle relevanten Vorgänge sorgfältig, bevor Sie kündigen.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">Übergabe-Checkliste: Was muss der alte Verwalter herausgeben?</h2>
              <p>
                Nach der Kündigung ist der ausscheidende Verwalter verpflichtet, alle Objekt-Unterlagen herauszugeben. Fordern Sie folgende Dokumente schriftlich an:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                {[
                  "Alle aktuellen Mietverträge",
                  "Nebenkostenabrechnungen der letzten 3 Jahre",
                  "Korrespondenz mit Mietern (letzten 2 Jahre)",
                  "Mieterliste mit Kontaktdaten und Zahlungshistorie",
                  "Alle Wartungsverträge und -protokolle",
                  "Versicherungsscheine und Schadensmeldungen",
                  "Bankvollmachten widerrufen, Kontozugänge übertragen",
                  "Hausgeldkonten und Rücklagen (bei WEG)",
                  "Beschlussbuch der Eigentümerversammlung (bei WEG)",
                  "Technische Unterlagen: Heizungspass, Grundrisse, Pläne",
                  "Alle Objektschlüssel",
                  "Aktuelle offene Posten und laufende Streitfälle",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm bg-white rounded-lg border border-gray-200 px-4 py-3">
                    <span className="w-4 h-4 rounded border border-gray-300 shrink-0"></span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">Der richtige Zeitpunkt für den Wechsel</h2>
              <p>
                Der beste Zeitpunkt für einen Verwalterwechsel ist das Jahresende — aus mehreren Gründen:
              </p>
              <ul className="space-y-2 mt-3">
                {[
                  "Die Nebenkostenabrechnung für das laufende Jahr wird noch vom alten Verwalter erstellt",
                  "Neue Wirtschaftspläne können direkt für das neue Jahr aufgesetzt werden",
                  "Mieteinzug und Bankverbindungen werden zum Jahreswechsel umgestellt",
                  "Eigentümerversammlungen finden meist im Herbst statt — ideal für Abberufungsbeschlüsse",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm list-none">
                    <span className="text-teal font-bold mt-0.5 shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4">
                Wenn Sie zum 1. Januar wechseln möchten, müssen Sie bei einer 6-Monats-Frist spätestens Ende Juni kündigen. Planen Sie ausreichend Zeit für die Suche nach einem neuen Verwalter ein — eine gute Hausverwaltung ist gefragt.
              </p>
            </section>

            {/* FAQ */}
            <section className="bg-white rounded-2xl border border-gray-200 p-8 mt-10">
              <h2 className="text-2xl font-bold text-navy mb-6">Häufige Fragen: Hausverwaltung kündigen</h2>
              <div className="space-y-6">
                {[
                  {
                    q: "Wie kündige ich eine Hausverwaltung?",
                    a: "Bei Mietverwaltung: Schriftliche Kündigung per Einschreiben unter Einhaltung der vertraglichen Frist. Bei WEG: Abberufungsbeschluss der Eigentümerversammlung nach §26 WEG mit einfacher Mehrheit.",
                  },
                  {
                    q: "Wie lang ist die Kündigungsfrist?",
                    a: "Meist 3–6 Monate zum Jahresende, je nach Vertragsgestaltung. Ohne vertragliche Regelung gilt §621 BGB. Bei außerordentlicher Kündigung aus wichtigem Grund: keine Frist.",
                  },
                  {
                    q: "Kann ich außerordentlich kündigen?",
                    a: "Ja, bei wichtigem Grund (Untreue, schwerwiegende Pflichtverletzung, Unerreichbarkeit). Die Kündigung muss schriftlich mit Begründung erfolgen.",
                  },
                  {
                    q: "Welche Unterlagen muss der alte Verwalter übergeben?",
                    a: "Alle Mietverträge, Abrechnungen, Korrespondenz, Wartungsunterlagen, Versicherungsdokumente, Schlüssel, Bankzugänge und bei WEG: Hausgeldkonten und Beschlussbuch.",
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
              <h2 className="text-2xl font-bold mb-3">Bereit für den Wechsel?</h2>
              <p className="text-white/80 mb-6 max-w-md mx-auto">
                Wir begleiten Sie durch den gesamten Verwalterwechsel — von der Kündigung über die Dokumentenübergabe bis zur reibungslosen Übernahme.
              </p>
              <Link
                href="/anfrage"
                className="inline-flex items-center gap-2 bg-teal text-white px-8 py-4 rounded-xl font-semibold text-base hover:bg-teal/90 transition-all hover:shadow-lg"
              >
                Wechsel starten →
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
