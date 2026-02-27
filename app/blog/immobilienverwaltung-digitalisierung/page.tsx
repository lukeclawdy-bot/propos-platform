import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Digitalisierung der Immobilienverwaltung 2026: Was moderne Vermieter erwarten können | einfach verwaltet.",
  description:
    "Digitale Hausverwaltung 2026: Eigentümerportale, automatisierte Nebenkostenabrechnung, digitale Mieterkommunikation und mehr. Was moderne Vermieter von ihrer Verwaltung verlangen sollten.",
  keywords:
    "Immobilienverwaltung Digitalisierung, digitale Hausverwaltung 2026, Hausverwaltung Software, proptech Deutschland, modernes Immobilienmanagement",
  openGraph: {
    title: "Digitalisierung der Immobilienverwaltung 2026: Was Sie erwarten können",
    description:
      "Wie sieht eine moderne, digitale Hausverwaltung 2026 aus? Eigentümerportal, Automatisierung, Transparenz — der Überblick für Vermieter.",
    url: "https://einfach-verwaltet.de/blog/immobilienverwaltung-digitalisierung",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Digitalisierung der Immobilienverwaltung 2026: Was moderne Vermieter erwarten können",
  description:
    "Überblick über digitale Werkzeuge und moderne Prozesse in der Hausverwaltung 2026 — für Vermieter, die verstehen wollen, was heute technisch möglich ist.",
  author: { "@type": "Organization", name: "einfach verwaltet." },
  publisher: {
    "@type": "Organization",
    name: "einfach verwaltet.",
    logo: { "@type": "ImageObject", url: "https://einfach-verwaltet.de/logo.png" },
  },
  datePublished: "2026-02-27",
  dateModified: "2026-02-27",
  inLanguage: "de",
  url: "https://einfach-verwaltet.de/blog/immobilienverwaltung-digitalisierung",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was ist ein digitales Eigentümerportal?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ein digitales Eigentümerportal ist eine sichere Online-Plattform, über die Eigentümer jederzeit auf alle relevanten Daten ihrer Immobilie zugreifen können: Mieteingänge in Echtzeit, Kontoauszüge, Nebenkostenabrechnung, Reparaturstatus, Dokumente und monatliche Berichte. Gute Portale sind auch mobil nutzbar.",
      },
    },
    {
      "@type": "Question",
      name: "Wie funktioniert digitale Mieterkommunikation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Moderne Hausverwaltungen nutzen digitale Ticketing-Systeme: Mieter melden Mängel oder Anliegen über eine App oder ein Webportal. Das System protokolliert automatisch Eingangszeitpunkt, Bearbeitungsstatus und Abschluss. Eigentümer sehen in Echtzeit, welche Anfragen offen sind und wie schnell diese bearbeitet werden.",
      },
    },
    {
      "@type": "Question",
      name: "Kann eine Hausverwaltung Nebenkostenabrechnung automatisch erstellen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, moderne Hausverwaltungssoftware kann Nebenkostenabrechnungen auf Basis von digitalisierten Belegen, automatischen Zählerstandserfassungen und hinterlegten Umlageschlüsseln weitgehend automatisch erstellen. Das reduziert Fehler und beschleunigt die Erstellung erheblich.",
      },
    },
    {
      "@type": "Question",
      name: "Was ist PropTech und warum ist es relevant für Vermieter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PropTech (Property Technology) bezeichnet Technologieunternehmen und -anwendungen im Immobilienbereich. Für Vermieter relevant sind PropTech-Lösungen für Verwaltung, Mieterauswahl, Bonitätsprüfung, Mieteingangsverfolgung und Wartungsmanagement. Sie ermöglichen eine effizientere, transparentere Immobilienverwaltung.",
      },
    },
    {
      "@type": "Question",
      name: "Ist eine digitale Hausverwaltung teurer als eine traditionelle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nein — oft ist das Gegenteil der Fall. Digitale Prozesse reduzieren den manuellen Aufwand erheblich, was sich in wettbewerbsfähigen Preisen niederschlägt. einfach verwaltet. bietet digitale Vollverwaltung ab 24 €/Einheit/Monat — günstiger als viele traditionelle Anbieter mit weniger Leistung.",
      },
    },
  ],
};

const features = [
  {
    icon: "📊",
    title: "Echtzeit-Finanzübersicht",
    desc: "Mieteingänge, offene Posten, Kontostand — alles in Echtzeit einsehbar. Kein Warten auf den monatlichen Bericht mehr.",
    traditional: "Monatlicher Papierbericht",
    modern: "Live-Dashboard, 24/7 zugänglich",
  },
  {
    icon: "🔧",
    title: "Digitales Mängelmanagement",
    desc: "Mieter melden Mängel über App oder Portal. Automatische Protokollierung, Statusupdates und Abschlussbestätigung.",
    traditional: "Telefon, E-Mail, Notizzettel",
    modern: "Ticketsystem mit Zeitstempel und Fotodokumentation",
  },
  {
    icon: "📄",
    title: "Automatisierte Nebenkostenabrechnung",
    desc: "Digitalisierte Belege, automatischer Umlageschlüssel, Konsistenzprüfung — NKA in einem Bruchteil der Zeit.",
    traditional: "Manuelle Excel-Tabellen, 6–8 Wochen Erstellung",
    modern: "Automatisierte Erstellung, Qualitätsprüfung, digitaler Versand",
  },
  {
    icon: "📱",
    title: "Digitale Mieter-App",
    desc: "Mieter erreichen die Verwaltung rund um die Uhr — strukturiert und dokumentiert, nicht über private Handynummern.",
    traditional: "Bürozeiten 9–17 Uhr, Mailbox",
    modern: "24/7 Erreichbarkeit, Reaktionszeit < 15 Min. auf Notfälle",
  },
  {
    icon: "📁",
    title: "Digitales Dokumentenarchiv",
    desc: "Alle Verträge, Protokolle, Abrechnungen und Korrespondenzen sicher gespeichert und sofort abrufbar.",
    traditional: "Papierordner, lokal archiviert",
    modern: "Cloudbasiert, verschlüsselt, sofort per Klick abrufbar",
  },
  {
    icon: "🏦",
    title: "Separierte Treuhandkonten",
    desc: "Mietgelder auf separaten Treuhandkonten — klar getrennt vom Betriebsvermögen der Verwaltung. Vollständige Transparenz.",
    traditional: "Sammelkonto, schwer nachvollziehbar",
    modern: "Eigentümer-Einzelkonten, tagesaktuelle Einsicht",
  },
];

export default function ImmobilienverwaltungDigitalisierungPage() {
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
                Digitalisierung
              </span>
              <span className="text-text-light text-sm">9 min Lesezeit · Februar 2026</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-navy mb-6 font-serif leading-tight">
              Digitalisierung der Immobilienverwaltung 2026: Was moderne Vermieter erwarten können
            </h1>
            <p className="text-xl text-text-light leading-relaxed">
              Die Immobilienverwaltung steckte jahrzehntelang in der Papierwelt fest. 2026 
              hat sich das grundlegend verändert. Dieser Artikel zeigt, was digitale Hausverwaltung 
              heute bedeutet — und warum Vermieter das einfordern sollten.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 lg:py-16 bg-white">
          <div className="max-w-[800px] mx-auto px-6">

            <h2 className="text-3xl font-bold text-navy mb-6 font-serif">
              Warum die Digitalisierung der Hausverwaltung überfällig war
            </h2>
            <p className="text-text-light leading-relaxed mb-4">
              Stellen Sie sich vor: Ihr Mieter meldet um 22 Uhr eine defekte Heizung. 
              Beim traditionellen Verwalter geht eine Nachricht auf dem Anrufbeantworter ein — 
              und wird vielleicht am nächsten Werktag gehört. Der Mieter friert. Sie als 
              Eigentümer haben keinerlei Einblick.
            </p>
            <p className="text-text-light leading-relaxed mb-4">
              Oder: Sie möchten wissen, ob der Mieter im dritten Stock seine Miete bezahlt hat. 
              Sie rufen beim Verwalter an, der Ihnen sagt, er schaut nach und meldet sich. 
              Drei Tage später haben Sie eine E-Mail.
            </p>
            <p className="text-text-light leading-relaxed mb-8">
              Das war 2020 noch Normalzustand. 2026 ist es inakzeptabel. Die Technologie, 
              dieses Problem zu lösen, existiert — und moderne Hausverwaltungen setzen sie ein.
            </p>

            <div className="bg-navy text-white rounded-2xl p-8 mb-10">
              <h3 className="text-xl font-bold mb-4 font-serif">Der Status quo in Zahlen</h3>
              <div className="grid sm:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-teal mb-1">73 %</div>
                  <div className="text-white/70 text-sm">der Vermieter sind unzufrieden mit der Reaktionszeit ihrer Verwaltung [Schätzung]</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-teal mb-1">6–8 Wo.</div>
                  <div className="text-white/70 text-sm">dauert die Erstellung einer manuellen Nebenkostenabrechnung durchschnittlich</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-teal mb-1">60 %</div>
                  <div className="text-white/70 text-sm">weniger Fehler in digitalisierten vs. manuell erstellten Nebenkostenabrechnungen [Schätzung]</div>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-navy mb-8 font-serif">
              6 Bereiche, in denen Digitalisierung den Unterschied macht
            </h2>

            <div className="space-y-8 mb-12">
              {features.map((f) => (
                <div key={f.title} className="bg-warm-white rounded-2xl p-7 border border-gray-100">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-3xl flex-shrink-0">{f.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold text-navy mb-2 font-serif">{f.title}</h3>
                      <p className="text-text-light text-sm leading-relaxed mb-4">{f.desc}</p>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-red-50 rounded-lg p-3">
                      <div className="text-xs font-bold text-red-700 mb-1">Traditionell</div>
                      <div className="text-sm text-red-800">{f.traditional}</div>
                    </div>
                    <div className="bg-teal/10 rounded-lg p-3">
                      <div className="text-xs font-bold text-teal mb-1">Moderne Verwaltung</div>
                      <div className="text-sm text-navy">{f.modern}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-3xl font-bold text-navy mb-6 font-serif">
              Datenschutz und Sicherheit: Was digitale Verwaltung bedeutet
            </h2>
            <p className="text-text-light leading-relaxed mb-4">
              Digitalisierung bedeutet nicht, dass Daten irgendwo unsicher in der Cloud liegen. 
              Serióse digitale Hausverwaltungen erfüllen strenge Anforderungen:
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                { title: "DSGVO-Konformität", desc: "Verarbeitung personenbezogener Mieterdaten nur nach DSGVO-Anforderungen. Auftragsverarbeitungsvertrag vorhanden." },
                { title: "Verschlüsselung", desc: "Daten at rest und in transit verschlüsselt. SSL/TLS für alle Übertragungen, AES-256 für Speicherung." },
                { title: "Serverstandort Deutschland", desc: "Daten ausschließlich auf deutschen oder europäischen Servern — keine Übermittlung in Drittstaaten." },
                { title: "Backup und Verfügbarkeit", desc: "Regelmäßige automatische Backups, redundante Infrastruktur, garantierte Verfügbarkeit." },
              ].map((item) => (
                <div key={item.title} className="bg-warm-white rounded-xl p-4 border border-gray-100">
                  <h4 className="font-bold text-navy mb-1 text-sm">{item.title}</h4>
                  <p className="text-text-light text-xs">{item.desc}</p>
                </div>
              ))}
            </div>

            <h2 className="text-3xl font-bold text-navy mb-6 font-serif">
              Was moderne Vermieter 2026 von ihrer Verwaltung verlangen sollten
            </h2>
            <p className="text-text-light leading-relaxed mb-4">
              Die Technologie ist da. Die Frage ist, ob Ihre Hausverwaltung sie einsetzt. 
              Hier ist, was Sie heute vernünftigerweise einfordern können:
            </p>
            <div className="bg-navy/5 rounded-xl p-6 border border-navy/10 mb-8">
              <ul className="space-y-3 text-text-light">
                {[
                  "Eigentümerportal mit Echtzeit-Mieteingängen und Kontostand",
                  "Digitales Ticketsystem für Mieteranfragen mit Zeitstempel",
                  "Elektronische Nebenkostenabrechnung — prüfbar, mit digitalen Belegen",
                  "Mieterkommunikation über App oder Mieterportal (kein privates Handy des Verwalters)",
                  "Digitales Dokumentenarchiv — jederzeit abrufbar",
                  "Monatliche automatische Reportings per E-Mail oder im Portal",
                  "Digitale Wohnungsübergabeprotokolle mit Fotodokumentation",
                  "Online-Eigentümerversammlung nach §23 WEG (für WEG-Objekte)",
                ].map((item) => (
                  <li key={item} className="flex gap-2 text-sm">
                    <span className="text-teal font-bold flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <h2 className="text-3xl font-bold text-navy mb-6 font-serif">
              Worauf Sie beim Wechsel zu einer digitalen Verwaltung achten sollten
            </h2>
            <p className="text-text-light leading-relaxed mb-4">
              Nicht jede Verwaltung, die &quot;digital&quot; verspricht, hält das auch. Achten Sie auf:
            </p>
            <div className="space-y-4 mb-6">
              <div className="flex gap-3">
                <span className="text-teal font-bold flex-shrink-0">→</span>
                <div>
                  <strong className="text-navy">Demo verlangen</strong>
                  <p className="text-text-light text-sm">Lassen Sie sich das Eigentümerportal live zeigen. Echte Software, nicht PowerPoint-Folien.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-teal font-bold flex-shrink-0">→</span>
                <div>
                  <strong className="text-navy">Nach Reaktionszeiten fragen</strong>
                  <p className="text-text-light text-sm">Konkrete SLA-Vereinbarungen in die Vertrag aufnehmen: z.B. Erstreaktion auf Notfall innerhalb 15 Min.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-teal font-bold flex-shrink-0">→</span>
                <div>
                  <strong className="text-navy">Datenschutzhinweise lesen</strong>
                  <p className="text-text-light text-sm">Wo werden Daten gespeichert? Gibt es einen Auftragsverarbeitungsvertrag nach Art. 28 DSGVO?</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-teal font-bold flex-shrink-0">→</span>
                <div>
                  <strong className="text-navy">Datenmigration klären</strong>
                  <p className="text-text-light text-sm">Was passiert mit Ihren Daten beim Verwalterwechsel? Wie werden historische Abrechnungen übertragen?</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 lg:py-24 bg-warm-white">
          <div className="max-w-[800px] mx-auto px-6">
            <h2 className="text-3xl font-bold text-navy mb-8 font-serif">
              Häufige Fragen zur digitalen Immobilienverwaltung
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: "Was ist ein digitales Eigentümerportal?",
                  a: "Ein sicheres Online-Dashboard, über das Eigentümer jederzeit Mieteingänge, Kontoauszüge, Nebenkostenabrechnung, Reparaturstatus und alle Dokumente einsehen können — ohne auf einen Rückruf warten zu müssen.",
                },
                {
                  q: "Ist eine digitale Hausverwaltung teurer?",
                  a: "Nein — oft günstiger, weil Prozesseffizienz die Kosten senkt. einfach verwaltet. bietet digitale Vollverwaltung ab 24 €/Einheit/Monat — wettbewerbsfähig mit traditionellen Anbietern bei deutlich mehr Leistung.",
                },
                {
                  q: "Ist meine Mieter-App DSGVO-konform?",
                  a: "Seriöse digitale Verwaltungen arbeiten ausschließlich mit DSGVO-konformen Tools — Serverstandort Deutschland/EU, Auftragsverarbeitungsvertrag, verschlüsselte Datenübertragung.",
                },
                {
                  q: "Können Mieter auch digital mit der Verwaltung kommunizieren?",
                  a: "Ja — moderne Hausverwaltungen bieten Mieter-Apps oder -portale an, über die Mängel gemeldet, Fragen gestellt und Dokumente angefordert werden können. Das entlastet die Verwaltung und schafft lückenlose Dokumentation.",
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
              Erleben Sie, wie moderne Hausverwaltung aussieht
            </h2>
            <p className="text-white/75 mb-8">
              Echtzeit-Portal, digitale Abrechnung, 24/7-Erreichbarkeit. 
              Vereinbaren Sie ein kostenloses Erstgespräch mit Live-Demo.
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
