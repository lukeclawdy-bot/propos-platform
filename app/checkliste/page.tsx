import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Vermieter Checkliste 2025 | 25 Punkte kostenlos | einfach verwaltet.",
  description:
    "Vermieter Checkliste kostenlos PDF: 25 Punkte, die jeder Vermieter kennen muss — Mietrecht, Nebenkostenabrechnung, Mieterhöhung, Instandhaltung & Kündigung. Jetzt herunterladen.",
  alternates: {
    canonical: "https://einfach-verwaltet.de/checkliste",
  },
  openGraph: {
    title: "Die ultimative Vermieter-Checkliste 2025/2026 | einfach verwaltet.",
    description:
      "25 Punkte Checkliste für Vermieter — kostenlos als PDF. Rechtssicher, aktuell, sofort nutzbar.",
    url: "https://einfach-verwaltet.de/checkliste",
    type: "website",
  },
};

// ─── Schema.org HowTo ─────────────────────────────────────────────────────────

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Die ultimative Vermieter-Checkliste 2025/2026",
  description: "25 Punkte, die jeder Vermieter kennen muss — rechtssicher und aktuell.",
  totalTime: "PT30M",
  estimatedCost: {
    "@type": "MonetaryAmount",
    currency: "EUR",
    value: "0",
  },
  step: [
    {
      "@type": "HowToSection",
      name: "Rechtliches & Verträge",
      itemListElement: [
        { "@type": "HowToStep", name: "Gültigen Mietvertrag verwenden", position: 1 },
        { "@type": "HowToStep", name: "Energieausweis bereitstellen", position: 2 },
        { "@type": "HowToStep", name: "Rauchwarnmelder installieren", position: 3 },
        { "@type": "HowToStep", name: "Mietkaution korrekt einbehalten", position: 4 },
        { "@type": "HowToStep", name: "Schönheitsreparaturen-Klauseln prüfen", position: 5 },
      ],
    },
    {
      "@type": "HowToSection",
      name: "Nebenkostenabrechnung",
      itemListElement: [
        { "@type": "HowToStep", name: "§556 BGB 12-Monats-Frist einhalten", position: 6 },
        { "@type": "HowToStep", name: "Nur §2 BetrKV-Kosten abrechnen", position: 7 },
        { "@type": "HowToStep", name: "Umlageschlüssel definieren", position: 8 },
        { "@type": "HowToStep", name: "Nachzahlung innerhalb 30 Tage einfordern", position: 9 },
        { "@type": "HowToStep", name: "12-monatiges Prüfungsrecht gewähren", position: 10 },
      ],
    },
    {
      "@type": "HowToSection",
      name: "Mieterhöhung",
      itemListElement: [
        { "@type": "HowToStep", name: "15-Monats-Sperrfrist beachten", position: 11 },
        { "@type": "HowToStep", name: "Kappungsgrenze 15% (Hamburg) prüfen", position: 12 },
        { "@type": "HowToStep", name: "2-Monate Ankündigungsfrist einhalten", position: 13 },
        { "@type": "HowToStep", name: "Mietspiegel als Referenz nutzen", position: 14 },
        { "@type": "HowToStep", name: "Mieterhöhung schriftlich mitteilen", position: 15 },
      ],
    },
    {
      "@type": "HowToSection",
      name: "Instandhaltung & Reparaturen",
      itemListElement: [
        { "@type": "HowToStep", name: "Schönheitsreparaturen nur bei wirksamer Klausel", position: 16 },
        { "@type": "HowToStep", name: "Kleinreparaturen maximal €100", position: 17 },
        { "@type": "HowToStep", name: "Wasserschäden sofort melden lassen", position: 18 },
        { "@type": "HowToStep", name: "Übergabeprotokoll erstellen", position: 19 },
        { "@type": "HowToStep", name: "Inventarliste pflegen", position: 20 },
      ],
    },
    {
      "@type": "HowToSection",
      name: "Mietende & Kündigung",
      itemListElement: [
        { "@type": "HowToStep", name: "§573 BGB Kündigungsgründe beachten", position: 21 },
        { "@type": "HowToStep", name: "§573c BGB Fristen einhalten", position: 22 },
        { "@type": "HowToStep", name: "Wohnungsübergabeprotokoll erstellen", position: 23 },
        { "@type": "HowToStep", name: "Kaution 3–6 Monate zurückhalten", position: 24 },
        { "@type": "HowToStep", name: "Schlüsselrückgabe dokumentieren", position: 25 },
      ],
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Wie lange hat ein Vermieter Zeit für die Nebenkostenabrechnung?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nach §556 Abs. 3 BGB muss die Nebenkostenabrechnung spätestens 12 Monate nach Ende des Abrechnungszeitraums beim Mieter eingehen. Verspätet der Vermieter die Abrechnung, verliert er in der Regel den Anspruch auf Nachzahlungen — es sei denn, er hat die Verspätung nicht zu vertreten.",
      },
    },
    {
      "@type": "Question",
      name: "Wie viel Kaution darf ein Vermieter verlangen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die Mietkaution darf nach §551 BGB maximal 3 Nettokaltmieten betragen. Der Mieter hat das Recht, die Kaution in 3 gleichen Raten zu zahlen. Außerdem muss der Vermieter die Kaution zinsbringend anlegen — getrennt vom eigenen Vermögen auf einem Treuhandkonto.",
      },
    },
    {
      "@type": "Question",
      name: "Wann darf ein Vermieter die Miete erhöhen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Eine Mieterhöhung bis zur ortsüblichen Vergleichsmiete (§558 BGB) ist frühestens 15 Monate nach Einzug oder der letzten Mieterhöhung möglich. Der Vermieter muss dem Mieter mindestens 2 Monate Zeit geben, der Erhöhung zuzustimmen. In Hamburg gilt eine Kappungsgrenze von 15% innerhalb von 3 Jahren (statt der regulären 20%).",
      },
    },
  ],
};

// ─── Checklist data ───────────────────────────────────────────────────────────

const sections = [
  {
    id: "rechtliches",
    title: "Rechtliches & Verträge",
    number: 1,
    color: "bg-blue-50 border-blue-200",
    badgeColor: "bg-blue-600",
    items: [
      {
        id: 1,
        label: "Gültiger Mietvertrag",
        detail:
          "Aktuellen Formularmietvertrag verwenden (DMB oder Haus & Grund) — keine veralteten Klauseln, die nach BGH-Rechtsprechung unwirksam sind.",
      },
      {
        id: 2,
        label: "Energieausweis",
        detail:
          "Bei Neuvermietung muss der Energieausweis nach §16a GEG vor Besichtigung vorliegen und dem Mieter ausgehändigt werden. Pflicht seit Mai 2014.",
      },
      {
        id: 3,
        label: "Rauchwarnmelder",
        detail:
          "In Hamburg Pflicht in Schlafzimmern, Kinderzimmern und Fluren (§45 HBauO). Vermieter ist für Installation verantwortlich, Mieter für Funktionskontrolle.",
      },
      {
        id: 4,
        label: "Mietkaution max. 3 Monatskaltmieten",
        detail:
          "Nach §551 BGB maximal 3 Nettokaltmieten. Getrennte, zinsbringende Anlage auf Treuhandkonto pflicht. Rückzahlung nach Mietende, max. 6 Monate Prüfungsfrist.",
      },
      {
        id: 5,
        label: "Schönheitsreparaturen-Klauseln (BGH-konform)",
        detail:
          "Starre Fristen in Schönheitsreparaturklauseln sind unwirksam (BGH VIII ZR 185/14). Nur flexible Klauseln mit Renovierungspflicht je nach Bedarf sind zulässig.",
      },
    ],
  },
  {
    id: "nebenkostenabrechnung",
    title: "Nebenkostenabrechnung",
    number: 2,
    color: "bg-teal-50 border-teal-200",
    badgeColor: "bg-teal",
    items: [
      {
        id: 6,
        label: "§556 BGB: 12-Monats-Frist einhalten",
        detail:
          "Die Nebenkostenabrechnung muss spätestens 12 Monate nach Ablauf des Abrechnungszeitraums beim Mieter eingehen. Bei Überschreitung verliert der Vermieter Nachzahlungsansprüche.",
      },
      {
        id: 7,
        label: "Nur §2 BetrKV-Kosten abrechnen",
        detail:
          "Nur die in §2 Betriebskostenverordnung aufgeführten Kostenpositionen sind umlagefähig. Verwaltungskosten, Instandhaltungsrücklagen und Reparaturkosten sind NICHT umlagefähig.",
      },
      {
        id: 8,
        label: "Umlageschlüssel im Mietvertrag definiert",
        detail:
          "Der Verteilerschlüssel (Wohnfläche, Personenzahl, Wohneinheiten) muss im Mietvertrag vereinbart sein. Ohne Vereinbarung gilt Wohnfläche als Standardschlüssel.",
      },
      {
        id: 9,
        label: "Nachzahlung innerhalb 30 Tage fällig",
        detail:
          "Nachzahlungen werden mit Zugang der Abrechnung fällig. Übliche Zahlungsfrist beträgt 30 Tage. Verzug führt zu Verzugszinsen nach §288 BGB (aktuell 6,27% p.a.).",
      },
      {
        id: 10,
        label: "Mieter hat 12 Monate Prüfungsrecht",
        detail:
          "Der Mieter kann innerhalb von 12 Monaten nach Erhalt der Abrechnung Einsicht in die Belege verlangen (§259 BGB). Belegprüfung vor Ort oder als Kopie (auf Kosten des Mieters).",
      },
    ],
  },
  {
    id: "mieterhoehung",
    title: "Mieterhöhung",
    number: 3,
    color: "bg-amber-50 border-amber-200",
    badgeColor: "bg-amber-600",
    items: [
      {
        id: 11,
        label: "15 Monate seit letzter Erhöhung",
        detail:
          "Zwischen der letzten Mieterhöhung und dem Wirksamkeitsdatum der neuen Erhöhung müssen mindestens 15 Monate liegen (§558 Abs. 1 S. 2 BGB).",
      },
      {
        id: 12,
        label: "Hamburg: Kappungsgrenze 15%",
        detail:
          "In Hamburg gilt die Kappungsgrenze von 15% innerhalb von 3 Jahren (statt regulär 20%). Dies gilt für die meisten Stadtteile als Gebiete mit angespanntem Wohnungsmarkt.",
      },
      {
        id: 13,
        label: "§558a BGB: Ankündigung 2 Monate vor",
        detail:
          "Das Mieterhöhungsschreiben muss dem Mieter mindestens 2 Monate vor dem Wirksamkeitsdatum zugehen. Der Mieter hat dann 2 Monate Zeit, zuzustimmen oder zu kündigen.",
      },
      {
        id: 14,
        label: "Mietspiegel als Begründung",
        detail:
          "Die Erhöhung muss durch Mietspiegel, Vergleichswohnungen oder Sachverständigengutachten begründet sein (§558a Abs. 2 BGB). Aktuellen qualifizierten Mietspiegel verwenden.",
      },
      {
        id: 15,
        label: "Schriftliche Form einhalten",
        detail:
          "Das Mieterhöhungsschreiben muss schriftlich erfolgen und vom Vermieter oder seinem Vertreter unterzeichnet sein. E-Mail ist ausreichend, jedoch empfiehlt sich Einwurfeinschreiben.",
      },
    ],
  },
  {
    id: "instandhaltung",
    title: "Instandhaltung & Reparaturen",
    number: 4,
    color: "bg-purple-50 border-purple-200",
    badgeColor: "bg-purple-600",
    items: [
      {
        id: 16,
        label: "Schönheitsreparaturen nur bei wirksamer Klausel",
        detail:
          "Ohne wirksame Vertragsklausel muss der Vermieter Schönheitsreparaturen selbst tragen. Unwirksam sind starre Fristenpläne, Quotenabgeltungsklauseln bei Einzug ohne frische Renovierung.",
      },
      {
        id: 17,
        label: "Kleinreparaturen max. €100",
        detail:
          "Kleinreparaturklauseln sind nur wirksam bis max. €100–150 pro Einzelfall und ca. €300/Jahr insgesamt (BGH Rechtsprechung). Höhere Beträge gehen zu Lasten des Vermieters.",
      },
      {
        id: 18,
        label: "Wasserschaden: sofort melden lassen",
        detail:
          "Mieter sind nach §536c BGB zur unverzüglichen Meldung von Mängeln verpflichtet. Vermieter sollte klare Meldeweg-Regelungen im Vertrag und Notfallkontakt schriftlich mitteilen.",
      },
      {
        id: 19,
        label: "Übergabeprotokoll bei Ein- & Auszug",
        detail:
          "Detailliertes Übergabeprotokoll bei Einzug (Zustand aller Räume, Zählerstände, Schlüssel) und Auszug. Beide Parteien unterschreiben. Grundlage für Kautionsabrechnung.",
      },
      {
        id: 20,
        label: "Inventarliste bei Möblierung",
        detail:
          "Bei möblierten Wohnungen vollständige Inventarliste mit Fotos als Anlage zum Mietvertrag. Aktuelle Wiederbeschaffungswerte dokumentieren für Schadensersatzansprüche.",
      },
    ],
  },
  {
    id: "mietende",
    title: "Mietende & Kündigung",
    number: 5,
    color: "bg-red-50 border-red-200",
    badgeColor: "bg-red-600",
    items: [
      {
        id: 21,
        label: "§573 BGB: Berechtigte Kündigungsgründe",
        detail:
          "Ordentliche Kündigung nur bei berechtigtem Interesse: Eigenbedarf, erhebliche Pflichtverletzung des Mieters, wirtschaftliche Verwertung. Schriftlich begründen. Sozialklausel beachten.",
      },
      {
        id: 22,
        label: "§573c BGB: Kündigungsfristen",
        detail:
          "Grundfrist 3 Monate zum Monatsende. Verlängert sich nach Mietdauer: 6 Monate ab 5 Jahren, 9 Monate ab 8 Jahren. Zum 3. Werktag des Monats für Fristwahrung einwerfen.",
      },
      {
        id: 23,
        label: "Wohnungsübergabeprotokoll",
        detail:
          "Ausführliches Protokoll beim Auszug: Zustand jedes Raums, Mängelliste, Zählerstände, Schlüsselrückgabe. Fotos anhängen. Beide Parteien unterschreiben — unbedingt Mieter dazu einladen.",
      },
      {
        id: 24,
        label: "Kautionsrückgabe 3–6 Monate",
        detail:
          "Keine feste Frist im Gesetz, aber max. 3–6 Monate nach Auszug gilt als angemessen (BGH). Abzüge nur für tatsächliche Schäden über normalen Verschleiß hinaus — mit Belegen.",
      },
      {
        id: 25,
        label: "Schlüsselrückgabe dokumentieren",
        detail:
          "Alle ausgehändigten Schlüssel (Haustür, Wohnung, Keller, Briefkasten, Garage) im Übergabeprotokoll auflisten. Bei fehlenden Schlüsseln: Schlossaustausch kann berechnet werden.",
      },
    ],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function ChecklistePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />

      <main className="pt-20 min-h-screen bg-warm-white">
        {/* Hero */}
        <section className="bg-navy text-white py-20 px-6">
          <div className="max-w-[900px] mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-teal/20 text-teal rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              Kostenlose Vermieter-Ressource 2025
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
              Die ultimative<br />
              <span className="text-teal">Vermieter-Checkliste 2025/2026</span>
            </h1>
            <p className="text-xl text-white/80 mb-4">
              25 Punkte, die jeder Vermieter kennen muss
            </p>
            <p className="text-base text-white/60 max-w-2xl mx-auto mb-10">
              Von Mietrecht über Nebenkostenabrechnung bis zur Kündigung — 
              kompakt, rechtssicher und mit §-Angaben. Als PDF kostenlos herunterladen.
            </p>
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 text-sm mb-10">
              {[
                { value: "25", label: "Checkpunkte" },
                { value: "5", label: "Themenbereiche" },
                { value: "100%", label: "Kostenlos" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-bold text-teal">{s.value}</div>
                  <div className="text-white/50">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Email capture form */}
        <section className="py-12 px-6 bg-teal/5 border-y border-teal/20">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="text-xl font-bold text-navy mb-2">
              Checkliste als PDF herunterladen
            </h2>
            <p className="text-text-light text-sm mb-6">
              Ihre E-Mail — wir senden Ihnen die Checkliste sofort als PDF zu.
            </p>
            <form
              action="/api/leads"
              method="POST"
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input type="hidden" name="source" value="checkliste" />
              <input
                type="email"
                name="email"
                required
                placeholder="ihre@email.de"
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-white text-navy placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal text-sm"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-teal text-white rounded-xl font-semibold text-sm hover:bg-teal/90 transition-colors whitespace-nowrap"
              >
                Jetzt kostenlos herunterladen
              </button>
            </form>
            <p className="mt-3 text-xs text-text-light">
              Kein Spam. Jederzeit abmeldbar. Datenschutz nach DSGVO.
            </p>
          </div>
        </section>

        {/* Full Checklist */}
        <section className="py-16 px-6">
          <div className="max-w-[800px] mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-navy mb-3">
                Die vollständige Checkliste
              </h2>
              <p className="text-text-light text-sm">
                Alle 25 Punkte — zum Durcharbeiten, Abhaken und als Referenz.
              </p>
            </div>

            <div className="space-y-8">
              {sections.map((section) => (
                <div
                  key={section.id}
                  className={`rounded-2xl border p-6 ${section.color}`}
                >
                  {/* Section header */}
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className={`w-8 h-8 ${section.badgeColor} rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}
                    >
                      {section.number}
                    </div>
                    <h3 className="text-lg font-bold text-navy">{section.title}</h3>
                  </div>

                  {/* Items */}
                  <div className="space-y-4">
                    {section.items.map((item) => (
                      <div key={item.id} className="flex items-start gap-3">
                        {/* CSS-only checkbox — no JS */}
                        <label className="flex items-start gap-3 cursor-pointer group w-full">
                          <input
                            type="checkbox"
                            className="mt-0.5 w-5 h-5 rounded border-2 border-gray-300 text-teal accent-teal cursor-pointer flex-shrink-0"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-gray-400 tabular-nums">
                                #{item.id}
                              </span>
                              <span className="text-sm font-semibold text-navy group-hover:text-teal transition-colors">
                                {item.label}
                              </span>
                            </div>
                            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                              {item.detail}
                            </p>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Progress hint */}
            <div className="mt-8 bg-navy/5 rounded-2xl p-6 text-center">
              <p className="text-sm text-navy font-medium mb-2">
                Alle 25 Punkte erledigt?
              </p>
              <p className="text-xs text-text-light mb-4">
                Dann sind Sie rechtlich gut aufgestellt — oder delegieren Sie die Verwaltung komplett an uns.
              </p>
              <Link
                href="/anfrage"
                className="inline-flex items-center gap-2 bg-teal text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-teal/90 transition-colors"
              >
                Hausverwaltung anfragen
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-[700px] mx-auto">
            <h2 className="text-2xl font-bold text-navy text-center mb-8">
              Häufige Fragen zur Vermieter-Checkliste
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: "Wie lange hat ein Vermieter Zeit für die Nebenkostenabrechnung?",
                  a: "Nach §556 Abs. 3 BGB muss die Nebenkostenabrechnung spätestens 12 Monate nach Ende des Abrechnungszeitraums beim Mieter eingehen. Verspätet der Vermieter die Abrechnung, verliert er in der Regel den Anspruch auf Nachzahlungen — es sei denn, er hat die Verspätung nicht zu vertreten.",
                },
                {
                  q: "Wie viel Kaution darf ein Vermieter verlangen?",
                  a: "Die Mietkaution darf nach §551 BGB maximal 3 Nettokaltmieten betragen. Der Mieter hat das Recht, die Kaution in 3 gleichen Raten zu zahlen. Außerdem muss der Vermieter die Kaution zinsbringend anlegen — getrennt vom eigenen Vermögen auf einem Treuhandkonto.",
                },
                {
                  q: "Wann darf ein Vermieter die Miete erhöhen?",
                  a: "Eine Mieterhöhung bis zur ortsüblichen Vergleichsmiete (§558 BGB) ist frühestens 15 Monate nach Einzug oder der letzten Mieterhöhung möglich. Der Vermieter muss dem Mieter mindestens 2 Monate Zeit geben, der Erhöhung zuzustimmen. In Hamburg gilt eine Kappungsgrenze von 15% innerhalb von 3 Jahren (statt der regulären 20%).",
                },
              ].map((faq, i) => (
                <div key={i} className="bg-warm-white rounded-xl border border-gray-100 p-5">
                  <h3 className="font-semibold text-navy text-sm mb-2">{faq.q}</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 px-6 bg-navy">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              Lieber alles auslagern?
            </h2>
            <p className="text-white/70 mb-8 text-sm leading-relaxed">
              Hausverwaltung ist komplex. Mit einfach verwaltet. übernehmen wir alle 25 Punkte — 
              und noch viel mehr. Ab €24/Einheit/Monat.
            </p>
            <Link
              href="/anfrage"
              className="inline-flex items-center gap-2 bg-teal text-white px-8 py-4 rounded-xl font-semibold hover:bg-teal/90 transition-all hover:shadow-lg"
            >
              Jetzt Angebot anfragen
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <p className="mt-4 text-xs text-white/40">
              Kostenlos & unverbindlich · Antwort am selben Tag
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
