import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Eigentümer Pflichten Vermietung: Die vollständige Checkliste 2026 | einfach verwaltet.",
  description:
    "Eigentümer Pflichten Vermietung 2026: Instandhaltung, Verkehrssicherung, Nebenkostenabrechnung, DSGVO, Energieausweis. Alles was Vermieter gesetzlich beachten müssen.",
  keywords:
    "Eigentümer Pflichten Vermietung, Vermieter Pflichten, Vermieterpflichten BGB, Instandhaltungspflicht Vermieter, Verkehrssicherungspflicht",
  openGraph: {
    title: "Eigentümer Pflichten Vermietung: Die vollständige Checkliste 2026",
    description:
      "Vollständiger Leitfaden zu gesetzlichen Vermieterpflichten: Instandhaltung, Sicherheit, Abrechnung, Datenschutz und mehr.",
    url: "https://einfach-verwaltet.de/blog/eigentuemer-pflichten-vermietung",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "article",
  },
  alternates: {
    canonical: "https://einfach-verwaltet.de/blog/eigentuemer-pflichten-vermietung",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Eigentümer Pflichten Vermietung: Die vollständige Checkliste 2026",
  description:
    "Gesetzliche Pflichten von Vermietern in Deutschland: von der Instandhaltungspflicht über die Verkehrssicherungspflicht bis zur DSGVO-Konformität.",
  author: { "@type": "Organization", name: "einfach verwaltet." },
  publisher: {
    "@type": "Organization",
    name: "einfach verwaltet.",
    logo: { "@type": "ImageObject", url: "https://einfach-verwaltet.de/logo.png" },
  },
  datePublished: "2026-02-27",
  inLanguage: "de",
  url: "https://einfach-verwaltet.de/blog/eigentuemer-pflichten-vermietung",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was sind die wichtigsten Pflichten eines Vermieters?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die wichtigsten Vermieterpflichten nach BGB umfassen: 1) Gebrauchsgewährungs- und Instandhaltungspflicht (§535 BGB) — die Wohnung muss in bewohnbarem Zustand gehalten werden. 2) Verkehrssicherungspflicht — alle Gefahrenquellen am Gebäude müssen beseitigt oder gesichert werden. 3) Nebenkostenabrechnung fristgerecht nach §556 Abs. 3 BGB (12-Monatsfrist). 4) Ruhe- und Datenschutzrechte der Mieter respektieren. 5) Rauchmelder-Installation nach Landesrecht.",
      },
    },
    {
      "@type": "Question",
      name: "Was ist die Verkehrssicherungspflicht des Vermieters?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die Verkehrssicherungspflicht verpflichtet Vermieter, Gefahren für Leib und Leben zu beseitigen. Dazu gehören: Streupflicht im Winter, sichere Treppenhäuser, funktionsfähige Beleuchtung in Gemeinschaftsflächen, sichere Balkone und Geländer, funktionierende Fahrstühle und die regelmäßige Kontrolle des Gebäudezustands. Verletzungen der Verkehrssicherungspflicht können zu erheblichen Schadensersatzforderungen führen.",
      },
    },
    {
      "@type": "Question",
      name: "Muss ein Vermieter einen Energieausweis vorlegen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Nach §16a GEG (Gebäudeenergiegesetz) müssen Vermieter bei Neuvermietung dem Mieter unaufgefordert einen gültigen Energieausweis vorlegen. Bereits bei der ersten Besichtigung muss der Ausweis zugänglich sein. Bei Nichtvorlage drohen Bußgelder bis zu €10.000. Der Energieausweis ist 10 Jahre gültig.",
      },
    },
    {
      "@type": "Question",
      name: "Was gilt zur DSGVO-Pflicht bei Vermietung?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Vermieter verarbeiten personenbezogene Daten ihrer Mieter und sind damit Verantwortliche im Sinne der DSGVO. Pflichten: Datenschutzerklärung bei Vertragsschluss, Löschfristen für Bewerberdaten (nicht zugelassene Bewerber: max. 6 Monate), sichere Aufbewahrung von Mietkopien und Kontodaten, kein Weitergabe an Dritte ohne Rechtsgrundlage.",
      },
    },
  ],
};

export default function EigentueerPflichtenVermietungPage() {
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
            <span>Eigentümer Pflichten Vermietung</span>
          </nav>

          <header className="mb-10">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-teal/10 text-teal text-xs font-semibold px-3 py-1 rounded-full">Vermieterpflichten</span>
              <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">11 min Lesezeit</span>
              <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">Februar 2026</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-navy leading-tight mb-4">
              Eigentümer Pflichten Vermietung: Die vollständige Checkliste 2026
            </h1>
            <p className="text-lg text-text-light leading-relaxed">
              Wer vermietet, übernimmt eine Vielzahl gesetzlicher Pflichten — von der Instandhaltung über die Verkehrssicherung bis zum Datenschutz. Dieser Leitfaden fasst alles zusammen, was Sie wissen müssen.
            </p>
          </header>

          <div className="prose prose-navy max-w-none text-gray-700 leading-relaxed space-y-8">

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">Grundpflicht: Die Wohnung in bewohnbarem Zustand erhalten</h2>
              <p>
                Die wichtigste Pflicht jedes Vermieters steht in §535 Abs. 1 BGB: Sie müssen dem Mieter die Mietsache in einem zum vertragsgemäßen Gebrauch geeigneten Zustand überlassen und sie während der Mietzeit in diesem Zustand erhalten. Das klingt einfach — hat aber weitreichende Konsequenzen.
              </p>
              <p>
                In der Praxis bedeutet das: Wenn Heizung, Fenster, Wasserleitungen oder andere Einrichtungen defekt werden, sind Sie als Vermieter in der Pflicht, diese auf eigene Kosten zu reparieren. Die Faustregel: Was Sie bei Einzug in Ordnung übergeben haben, müssen Sie während der Mietzeit in Ordnung halten.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">Instandhaltungspflichten im Detail</h2>
              <p>
                Die Instandhaltungspflicht umfasst alle Maßnahmen, die erforderlich sind, um die Mietsache in einem funktionsfähigen Zustand zu erhalten. Dazu gehören:
              </p>
              <div className="grid md:grid-cols-2 gap-4 my-6">
                {[
                  { title: "Heizungsanlage", desc: "Regelmäßige Wartung, schnelle Reparatur bei Ausfall (besonders im Winter)" },
                  { title: "Wasserinstallationen", desc: "Dichtigkeit aller Leitungen, Funktionsfähigkeit von Armaturen" },
                  { title: "Elektrik", desc: "Sicherheit der Elektroinstallationen, Funktion aller Anschlüsse" },
                  { title: "Fenster und Türen", desc: "Dichtigkeit, Schließbarkeit, Funktionsfähigkeit" },
                  { title: "Dach und Fassade", desc: "Kein Eindringen von Feuchtigkeit, Substanzerhalt" },
                  { title: "Gemeinschaftsanlagen", desc: "Fahrstuhl, Treppenhaus, Waschkeller in Ordnung halten" },
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
                    <p className="font-semibold text-navy text-sm">{item.title}</p>
                    <p className="text-xs text-gray-600 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">Verkehrssicherungspflicht: Sicherheit am Gebäude</h2>
              <p>
                Die Verkehrssicherungspflicht ist eine der folgenreichsten Vermieterpflichten. Wer eine Gefahrenquelle schafft oder kontrolliert, muss dafür sorgen, dass niemand zu Schaden kommt. Bei Verletzungen drohen erhebliche Schadensersatzansprüche.
              </p>
              <p>Konkret bedeutet das für Vermieter:</p>
              <ul className="space-y-2 mt-3">
                {[
                  "Streupflicht im Winter: Gehwege und Zufahrten bei Schnee und Eis räumen (oder Übertragung auf Mieter durch Hausordnung)",
                  "Treppenhäuser: ausreichende Beleuchtung, sichere Treppengeländer, rutschfeste Beläge",
                  "Balkone: regelmäßige Prüfung der Tragfähigkeit, sichere Geländerhöhe (mind. 90 cm)",
                  "Keller und Außenanlagen: keine vorstehenden Objekte, sichere Kellertreppen",
                  "Gebäudehülle: lose Fassadenteile, defekte Dachziegel oder baufällige Kamine müssen unverzüglich gesichert werden",
                  "Spielplätze: regelmäßige Prüfung der Spielgeräte auf Sicherheit",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm list-none">
                    <span className="text-teal font-bold mt-0.5 shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">Gesetzliche Sicherheitspflichten</h2>
              <p>
                Neben der allgemeinen Instandhaltung gibt es eine Reihe spezifischer gesetzlicher Pflichten, die Vermieter erfüllen müssen:
              </p>
              <div className="space-y-4 mt-4">
                {[
                  {
                    title: "Rauchmelder-Pflicht",
                    desc: "In allen 16 Bundesländern Pflicht. Jedes Schlaf- und Kinderzimmer sowie jeder Flur, der als Fluchtweg dient, muss mit einem Rauchmelder ausgestattet sein. Die Wartungspflicht kann per Mietvertrag auf Mieter übertragen werden.",
                    gesetz: "Landesbauordnungen der Länder",
                  },
                  {
                    title: "Energieausweis-Pflicht",
                    desc: "Bei Neuvermietung unaufgefordert vorlegen — bereits bei der ersten Besichtigung. Bußgeld bis €10.000 bei Nichtvorlage.",
                    gesetz: "§16a GEG",
                  },
                  {
                    title: "Trinkwasserhygiene",
                    desc: "Bei Gebäuden mit mehr als 400 Litern Wasservolumen in der Trinkwasseranlage: Legionellenuntersuchung alle 3 Jahre durch akkreditiertes Labor.",
                    gesetz: "Trinkwasserverordnung (TrinkwV)",
                  },
                  {
                    title: "Heizpflicht",
                    desc: "Von Oktober bis April muss die Heizung eine Mindesttemperatur von 20°C ermöglichen. In den Übergangsmonaten: mindestens 18°C.",
                    gesetz: "§535 BGB i.V.m. Mietvertrag",
                  },
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-semibold text-navy">{item.title}</h3>
                      <span className="text-xs text-gray-400 shrink-0 mt-0.5">{item.gesetz}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">Nebenkostenabrechnung: Fristen und Pflichten</h2>
              <p>
                Die Nebenkostenabrechnung ist eine der praktisch wichtigsten Vermieterpflichten. Die Regeln sind in §556 BGB geregelt und werden von Gerichten streng ausgelegt:
              </p>
              <ul className="space-y-2 mt-3">
                {[
                  "Die Abrechnung muss spätestens 12 Monate nach Ende des Abrechnungszeitraums erstellt sein (§556 Abs. 3 BGB)",
                  "Spätere Nachforderungen des Vermieters sind nach Ablauf der Frist ausgeschlossen — Nachzahlungsansprüche des Mieters bleiben bestehen",
                  "Der Mieter hat das Recht auf Belegeinsicht (Kopien auf Verlangen — ggf. kostenpflichtig)",
                  "Nur umlagefähige Betriebskosten nach §2 BetrKV dürfen auf Mieter umgelegt werden",
                  "Jede Kostenposition muss nachvollziehbar aufgeschlüsselt sein",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm list-none">
                    <span className="text-teal font-bold mt-0.5 shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">Datenschutz (DSGVO) bei der Vermietung</h2>
              <p>
                Vermieter verarbeiten personenbezogene Daten ihrer Mieter und Interessenten. Die DSGVO gilt auch für private Vermieter, sobald die Daten strukturiert gespeichert werden.
              </p>
              <ul className="space-y-2 mt-3">
                {[
                  "Datenschutzerklärung bei Vertragsschluss aushändigen",
                  "Mieterdaten nur zweckgebunden verwenden (keine Weitergabe ohne Rechtsgrundlage)",
                  "Bewerber, die abgelehnt wurden: Daten nach max. 6 Monaten löschen",
                  "Mieterdaten nach Mietende: Aufbewahrungsfrist für steuerlich relevante Unterlagen beachten (6–10 Jahre nach §147 AO)",
                  "Sichere Aufbewahrung von Kopien der Ausweise und Gehaltsabrechnungen",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm list-none">
                    <span className="text-teal font-bold mt-0.5 shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* FAQ */}
            <section className="bg-white rounded-2xl border border-gray-200 p-8 mt-10">
              <h2 className="text-2xl font-bold text-navy mb-6">Häufige Fragen: Eigentümer Pflichten Vermietung</h2>
              <div className="space-y-6">
                {[
                  {
                    q: "Was sind die wichtigsten Pflichten eines Vermieters?",
                    a: "Instandhaltungspflicht (§535 BGB), Verkehrssicherungspflicht, fristgerechte Nebenkostenabrechnung (§556 BGB), Energieausweis (§16a GEG), Rauchmelder, Heizpflicht und DSGVO-Konformität.",
                  },
                  {
                    q: "Was ist die Verkehrssicherungspflicht?",
                    a: "Die Pflicht, Gefahrenquellen am Gebäude zu beseitigen: Streupflicht im Winter, sichere Treppenhäuser, Balkone, Fassade und Spielplätze. Verletzungen können zu Schadensersatzansprüchen führen.",
                  },
                  {
                    q: "Muss ich als Vermieter einen Energieausweis vorlegen?",
                    a: "Ja, bei Neuvermietung unaufgefordert — bereits bei der ersten Besichtigung (§16a GEG). Bußgeld bei Nichtvorlage: bis zu €10.000.",
                  },
                  {
                    q: "Was gilt zur DSGVO bei der Vermietung?",
                    a: "Vermieter sind Verantwortliche im Sinne der DSGVO. Datenschutzerklärung aushändigen, Daten zweckgebunden verwenden, abgelehnte Bewerber-Daten nach max. 6 Monaten löschen.",
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
              <h2 className="text-2xl font-bold mb-3">Alle Pflichten erfüllt — ohne eigenen Aufwand</h2>
              <p className="text-white/80 mb-6 max-w-md mx-auto">
                Professionelle Hausverwaltung übernimmt alle Eigentümerpflichten — von der Instandhaltung bis zur DSGVO-konformen Dokumentation.
              </p>
              <Link
                href="/anfrage"
                className="inline-flex items-center gap-2 bg-teal text-white px-8 py-4 rounded-xl font-semibold text-base hover:bg-teal/90 transition-all hover:shadow-lg"
              >
                Kostenlos anfragen →
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
