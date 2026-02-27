import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "10 Kriterien für eine gute Hausverwaltung: Der Qualitäts-Check 2026 | einfach verwaltet.",
  description:
    "Wie erkennen Sie eine wirklich gute Hausverwaltung? 10 konkrete Qualitätskriterien für Vermieter 2026: Transparenz, Reaktionszeit, Qualifikation und mehr.",
  keywords:
    "Hausverwaltung Qualität Kriterien, gute Hausverwaltung finden, Hausverwaltung Qualitätscheck, Hausverwaltung bewerten, Hausverwalter wechseln Kriterien",
  openGraph: {
    title: "10 Kriterien für eine gute Hausverwaltung: Der Qualitäts-Check",
    description:
      "10 konkrete Kriterien, mit denen Sie die Qualität Ihrer Hausverwaltung objektiv bewerten — und entscheiden, ob ein Wechsel sinnvoll ist.",
    url: "https://einfach-verwaltet.de/blog/hausverwaltung-qualitaet-kriterien",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "10 Kriterien für eine gute Hausverwaltung: Der Qualitäts-Check 2026",
  description:
    "Mit diesen 10 Kriterien bewerten Eigentümer die Qualität ihrer Hausverwaltung — sachlich, vollständig und umsetzbar.",
  author: { "@type": "Organization", name: "einfach verwaltet." },
  publisher: {
    "@type": "Organization",
    name: "einfach verwaltet.",
    logo: { "@type": "ImageObject", url: "https://einfach-verwaltet.de/logo.png" },
  },
  datePublished: "2026-02-27",
  dateModified: "2026-02-27",
  inLanguage: "de",
  url: "https://einfach-verwaltet.de/blog/hausverwaltung-qualitaet-kriterien",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Wie erkenne ich eine seriöse Hausverwaltung?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Seriöse Hausverwaltungen sind transparent über Preise und Leistungen, haben nachweisbare Qualifikationen (IHK-Zertifikat, VDIV-Mitgliedschaft), reagieren schnell auf Anfragen und legen klare Verträge vor. Vorsicht bei Verwaltungen, die pauschale Preisangaben verweigern oder Zusatzgebühren für Standardleistungen berechnen.",
      },
    },
    {
      "@type": "Question",
      name: "Was kostet eine gute Hausverwaltung?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Qualitätsverwaltungen kosten für Mietverwaltung ca. 24–35 € pro Einheit und Monat, für WEG-Verwaltung 26–40 €. Der Preis allein ist kein Qualitätsmerkmal — eine günstige Verwaltung mit versteckten Zusatzgebühren kostet am Ende mehr als eine transparente Flatrate.",
      },
    },
    {
      "@type": "Question",
      name: "Welche Qualifikationen sollte ein Hausverwalter haben?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wichtige Qualifikationen: Geprüfter Immobilienverwalter (IHK), VDIV-Mitgliedschaft, Zertifizierung nach §26a WEG (für WEG-Verwaltung). Außerdem sollte die Verwaltung über eine Vermögensschadenhaftpflichtversicherung und Berufshaftpflichtversicherung verfügen.",
      },
    },
    {
      "@type": "Question",
      name: "Wann sollte ich die Hausverwaltung wechseln?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ein Wechsel ist angezeigt, wenn: Abrechnungen regelmäßig verspätet oder fehlerhaft sind, Anfragen nicht innerhalb von 24 Stunden beantwortet werden, Verwalter bei Eigentümerversammlungen unvorbereitet erscheinen, versteckte Zusatzgebühren auftreten oder keine digitalen Tools angeboten werden.",
      },
    },
    {
      "@type": "Question",
      name: "Wie viele Einheiten sollte eine Hausverwaltung maximal betreuen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Professionelle Hausverwaltungen können je nach Digitalisierungsgrad 300–600 Einheiten pro Vollzeitkraft betreuen. Als Faustformel gilt: Eine Verwaltung mit 5 Mitarbeitern sollte nicht mehr als 2.000 Einheiten betreuen. Fragen Sie aktiv nach der Betreuungsquote.",
      },
    },
  ],
};

const criteria = [
  {
    nr: "01",
    title: "Transparente Preisstruktur",
    weight: "Sehr wichtig",
    weightColor: "bg-red-100 text-red-700",
    desc: "Eine gute Hausverwaltung nennt Preise klar und pauschal. Versteckte Zusatzgebühren für Mahnungen, Wohnungsübergaben oder Jahresgespräche sind ein Warnsignal. Fordern Sie eine vollständige Preisliste mit allen Leistungen und Sondervergütungen.",
    checkitems: [
      "Gibt es eine Pauschalpreisliste?",
      "Welche Leistungen kosten extra?",
      "Sind Jahresgespräche und Eigentümerversammlungen inklusive?",
    ],
  },
  {
    nr: "02",
    title: "Reaktionszeit und Erreichbarkeit",
    weight: "Sehr wichtig",
    weightColor: "bg-red-100 text-red-700",
    desc: "Ein Heizungsausfall im Winter duldet keinen Aufschub. Fragen Sie konkret: Wie lange dauert die Erstreaktion auf eine Mieteranfrage? Gibt es einen 24/7-Notfallkontakt? Gute Verwaltungen reagieren innerhalb von 15–30 Minuten auf Notfälle und innerhalb eines Werktags auf Standardanfragen.",
    checkitems: [
      "Reaktionszeit auf Standardanfragen (Ziel: < 4 Stunden)?",
      "Notfallkontakt außerhalb der Bürozeiten?",
      "Wie wird kommuniziert: E-Mail, Portal, Telefon?",
    ],
  },
  {
    nr: "03",
    title: "Qualifikation und Zertifizierung",
    weight: "Sehr wichtig",
    weightColor: "bg-red-100 text-red-700",
    desc: "Hausverwaltung ist in Deutschland kein regulierter Beruf — theoretisch kann jeder eine Hausverwaltung eröffnen. Achten Sie daher auf freiwillige Qualifikationsnachweise: IHK-Zertifikat als Geprüfter Immobilienverwalter, VDIV-Mitgliedschaft oder den Zertifizierungsstatus nach §26a WEG.",
    checkitems: [
      "IHK-Zertifikat oder VDIV-Mitgliedschaft vorhanden?",
      "Zertifizierung nach §26a WEG (für WEG-Verwaltung)?",
      "Regelmäßige Fortbildungen nachweisbar?",
    ],
  },
  {
    nr: "04",
    title: "Digitales Eigentümerportal",
    weight: "Wichtig",
    weightColor: "bg-amber-100 text-amber-700",
    desc: "2026 ist ein reines telefonisches Reporting nicht mehr zeitgemäß. Moderne Hausverwaltungen bieten ein digitales Portal, über das Sie jederzeit Kontoauszüge, Abrechnungen, Mieteingangsübersichten und Reparaturstatus einsehen können. Fragen Sie nach einer Demo.",
    checkitems: [
      "Digitales Portal für Eigentümer vorhanden?",
      "Echtzeit-Einblick in Mieteingänge und Konten?",
      "Dokumentenarchiv digital zugänglich?",
    ],
  },
  {
    nr: "05",
    title: "Nebenkostenabrechnung: Qualität und Pünktlichkeit",
    weight: "Sehr wichtig",
    weightColor: "bg-red-100 text-red-700",
    desc: "Die Nebenkostenabrechnung nach §556 BGB muss innerhalb von 12 Monaten nach Abrechnungszeitraum beim Mieter sein. Fragen Sie, wie viele Abrechnungen im Vorjahr pünktlich zugestellt wurden, und lassen Sie sich eine Musterabrechnung zeigen.",
    checkitems: [
      "Wann werden NKA üblicherweise versendet?",
      "Gibt es eine Musterabrechnung zum Anschauen?",
      "Wie wird mit Abrechnungsfehlern umgegangen?",
    ],
  },
  {
    nr: "06",
    title: "Handwerkernetzwerk und Kosteneffizienz",
    weight: "Wichtig",
    weightColor: "bg-amber-100 text-amber-700",
    desc: "Eine gute Hausverwaltung hat ein gepflegtes Netzwerk geprüfter, fairer Handwerker. Sie holt mehrere Angebote ein, verhandelt Rahmenverträge und gibt Kosteneinsparungen an Sie weiter. Schlechte Verwaltungen empfehlen immer denselben teuren Handwerker — manchmal mit versteckten Provisionen.",
    checkitems: [
      "Wie viele Handwerkerpartner gibt es?",
      "Werden Rahmenverträge genutzt?",
      "Gibt es eine Deckelungsgrenze für Eigenentscheidungen?",
    ],
  },
  {
    nr: "07",
    title: "Transparente Rücklagenbildung (WEG)",
    weight: "Wichtig",
    weightColor: "bg-amber-100 text-amber-700",
    desc: "Bei WEG-Verwaltungen ist die Instandhaltungsrücklage nach §19 WEG von zentraler Bedeutung. Gute Verwaltungen präsentieren Rücklagenpläne auf Basis von Gebäudezustand und absehbarem Sanierungsbedarf — nicht irgendwelche Pauschalsätze.",
    checkitems: [
      "Liegt ein aktueller Rücklagenplan vor?",
      "Wird die Rücklage getrennt angelegt und ausgewiesen?",
      "Wie werden Sonderumlagen begründet?",
    ],
  },
  {
    nr: "08",
    title: "Mietermanagement und Leerstandsquote",
    weight: "Wichtig",
    weightColor: "bg-amber-100 text-amber-700",
    desc: "Eine professionelle Verwaltung hält die Leerstandsquote niedrig und vermietet Einheiten schnell zu marktgerechten Preisen. Fragen Sie nach der durchschnittlichen Leerstandsdauer und wie Neuvermietungen ablaufen.",
    checkitems: [
      "Durchschnittliche Leerstandsdauer?",
      "Bonitätsprüfung bei Neumietern vorhanden?",
      "Unterstützung bei der Mietpreisfindung?",
    ],
  },
  {
    nr: "09",
    title: "Rechtliche Aktualität und Compliance",
    weight: "Wichtig",
    weightColor: "bg-amber-100 text-amber-700",
    desc: "Mietrecht, WEG, GEG, BetrKV — das rechtliche Umfeld ändert sich laufend. Gute Hausverwaltungen informieren Sie proaktiv über relevante Gesetzesänderungen und passen Verträge und Prozesse entsprechend an.",
    checkitems: [
      "Gibt es regelmäßige Rechtsupdates für Eigentümer?",
      "Werden Mietverträge regelmäßig auf Aktualität geprüft?",
      "Kennt die Verwaltung §16a GEG und WEG-Reform?",
    ],
  },
  {
    nr: "10",
    title: "Referenzen und Bewertungen",
    weight: "Hilfreich",
    weightColor: "bg-green-100 text-green-700",
    desc: "Referenzen anderer Eigentümer sind wertvoll — aber hinterfragen Sie kritisch: Wählt die Verwaltung nur zufriedene Referenzkunden aus? Googeln Sie den Verwaltungsnamen und lesen Sie Rezensionen auf Google Maps und Trustpilot. Fragen Sie auch Mieter.",
    checkitems: [
      "Können Sie unabhängige Referenzen kontaktieren?",
      "Wie sind Google-Bewertungen?",
      "Gibt es Beschwerden beim Gewerbeaufsichtsamt?",
    ],
  },
];

export default function HausverwaltungQualitaetKriterienPage() {
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
      <main className="pt-24">
        {/* Hero */}
        <section className="py-16 lg:py-24 bg-warm-white">
          <div className="max-w-[800px] mx-auto px-6">
            <div className="mb-6">
              <Link href="/blog" className="text-teal text-sm font-medium hover:underline">
                ← Zurück zum Ratgeber
              </Link>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-navy/10 text-navy text-xs font-semibold px-3 py-1 rounded-full">
                Verwalterauswahl
              </span>
              <span className="text-text-light text-sm">11 min Lesezeit · Februar 2026</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-navy mb-6 font-serif leading-tight">
              10 Kriterien für eine gute Hausverwaltung: Der Qualitäts-Check 2026
            </h1>
            <p className="text-xl text-text-light leading-relaxed">
              Wie erkennen Sie eine wirklich gute Hausverwaltung — bevor Sie einen Vertrag 
              unterschreiben? Diese 10 Kriterien helfen Ihnen, Angebote objektiv zu bewerten 
              und die Verwaltung zu finden, die Ihr Portfolio verdient.
            </p>
          </div>
        </section>

        {/* Intro */}
        <section className="py-12 bg-white">
          <div className="max-w-[800px] mx-auto px-6">
            <p className="text-text-light leading-relaxed mb-4">
              Hausverwaltung ist in Deutschland kein geschützter Begriff. Jeder kann sich 
              Hausverwaltung nennen — ohne Prüfung, ohne Mindestqualifikation, ohne Kontrolle. 
              Das erklärt, warum die Qualität so extrem schwankt: zwischen professionellen 
              Volldienstleistern und Ein-Mann-Betrieben, die Eigentümer mit verspäteten Abrechnungen 
              und unreizbaren Telefonnummern frustrieren.
            </p>
            <p className="text-text-light leading-relaxed mb-8">
              Diese 10 Kriterien helfen Ihnen, den Unterschied zu erkennen — und die richtige 
              Entscheidung zu treffen.
            </p>

            {/* Score card */}
            <div className="bg-navy/5 rounded-xl p-6 border border-navy/10 mb-4">
              <h3 className="font-bold text-navy mb-3">Legende: Gewichtung</h3>
              <div className="flex flex-wrap gap-3 text-sm">
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">Sehr wichtig — k.o.-Kriterium</span>
                <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full">Wichtig — differenzierend</span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">Hilfreich — zusätzliches Signal</span>
              </div>
            </div>
          </div>
        </section>

        {/* 10 Criteria */}
        <section className="py-4 bg-white">
          <div className="max-w-[800px] mx-auto px-6 space-y-8">
            {criteria.map((c) => (
              <div key={c.nr} className="bg-warm-white rounded-2xl p-8 border border-gray-100">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl font-bold text-navy/20 font-serif flex-shrink-0 leading-none">
                    {c.nr}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h2 className="text-xl font-bold text-navy font-serif">{c.title}</h2>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.weightColor}`}>
                        {c.weight}
                      </span>
                    </div>
                    <p className="text-text-light leading-relaxed text-sm mb-4">{c.desc}</p>
                    <div className="bg-white rounded-xl p-4 border border-gray-100">
                      <h4 className="text-xs font-bold text-navy mb-2 uppercase tracking-wide">Fragen Sie konkret:</h4>
                      <ul className="space-y-1">
                        {c.checkitems.map((item) => (
                          <li key={item} className="flex gap-2 text-text-light text-sm">
                            <span className="text-teal flex-shrink-0">☐</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* einfach verwaltet check */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-[800px] mx-auto px-6">
            <h2 className="text-3xl font-bold text-navy mb-6 font-serif">
              Wie schneidet einfach verwaltet. ab?
            </h2>
            <p className="text-text-light leading-relaxed mb-6">
              Wir stellen uns dem Qualitäts-Check gerne. Hier unser Selbstbericht — 
              und wie Sie es überprüfen können:
            </p>
            <div className="space-y-3 mb-8">
              {[
                { label: "Transparente Preise", value: "Ab 24 €/Einheit/Monat — vollständige Preisliste auf /preise" },
                { label: "Reaktionszeit", value: "< 15 Minuten Erstreaktion auf Notfälle, < 4 Stunden Standard" },
                { label: "Qualifikation", value: "Geprüfte Immobilienverwalter, laufende Fortbildungen" },
                { label: "Digitales Portal", value: "24/7 Eigentümerportal mit Echtzeit-Einblick in alle Daten" },
                { label: "NKA-Qualität", value: "Fristgerechte Abrechnungen, transparente Aufschlüsselung" },
                { label: "Handwerkernetzwerk", value: "40+ geprüfte Partner, faire Rahmenverträge" },
                { label: "WEG-Rücklage", value: "Individueller Rücklagenplan pro Objekt" },
                { label: "Rechtliche Aktualität", value: "Monatliche Rechtsupdates für Eigentümer" },
              ].map((item) => (
                <div key={item.label} className="flex gap-3 items-start py-3 border-b border-gray-100">
                  <span className="text-teal font-bold flex-shrink-0">✓</span>
                  <div>
                    <span className="font-semibold text-navy text-sm">{item.label}:</span>{" "}
                    <span className="text-text-light text-sm">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-text-light text-sm leading-relaxed">
              Sprechen Sie uns an — wir beantworten alle Fragen aus dem Qualitäts-Check 
              konkret und nachprüfbar.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 lg:py-24 bg-warm-white">
          <div className="max-w-[800px] mx-auto px-6">
            <h2 className="text-3xl font-bold text-navy mb-8 font-serif">
              Häufige Fragen zur Hausverwaltungsqualität
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: "Wie erkenne ich eine seriöse Hausverwaltung?",
                  a: "Seriöse Hausverwaltungen sind transparent über Preise, haben nachweisbare Qualifikationen (IHK-Zertifikat, VDIV-Mitgliedschaft), reagieren schnell und legen klare Verträge vor. Vorsicht bei pauschaler Preisangabe-Verweigerung oder Zusatzgebühren für Standardleistungen.",
                },
                {
                  q: "Wann sollte ich die Hausverwaltung wechseln?",
                  a: "Ein Wechsel ist sinnvoll bei: verspäteten oder fehlerhaften Abrechnungen, langen Reaktionszeiten (> 24h auf Standardanfragen), unvorbereiteten Eigentümerversammlungen, versteckten Zusatzgebühren oder fehlenden digitalen Tools.",
                },
                {
                  q: "Was kostet eine gute Hausverwaltung?",
                  a: "Qualitätsverwaltungen kosten für Mietverwaltung ca. 24–35 € pro Einheit/Monat, für WEG-Verwaltung 26–40 €. Günstiger heißt nicht unbedingt besser — achten Sie auf den Gesamtleistungsumfang.",
                },
                {
                  q: "Brauche ich als Vermieter eine Hausverwaltung?",
                  a: "Bei WEG ist ein Verwalter gesetzlich vorgeschrieben. Bei reinen Mietobjekten nicht — aber eine professionelle Verwaltung kann erheblichen Aufwand ersparen und rechtliche Risiken minimieren, besonders bei mehr als 3–4 Einheiten.",
                },
              ].map((faq) => (
                <div key={faq.q} className="bg-white rounded-xl p-6 border border-gray-100">
                  <h3 className="font-bold text-navy mb-2">{faq.q}</h3>
                  <p className="text-text-light text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-20 bg-navy text-white">
          <div className="max-w-[700px] mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4 font-serif">
              Stellen Sie uns auf den Qualitäts-Check
            </h2>
            <p className="text-white/75 mb-8">
              Alle 10 Kriterien. Keine Ausreden. Beim kostenlosen Erstgespräch beantworten 
              wir jede Frage aus diesem Artikel — konkret und nachprüfbar.
            </p>
            <Link
              href="/anfrage"
              className="inline-block bg-teal text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-teal/85 transition-all shadow-lg hover:shadow-xl"
            >
              Kostenloses Erstgespräch vereinbaren →
            </Link>
            <p className="text-white/50 text-sm mt-4">
              Keine versteckten Kosten. Keine Verpflichtungen. Antwort noch am selben Tag.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
