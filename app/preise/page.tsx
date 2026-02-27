import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Preise — einfach verwaltet.",
  description:
    "Transparente Preise für professionelle Hausverwaltung. Mietverwaltung ab €24/Einheit/Monat. Keine versteckten Kosten.",
  openGraph: {
    title: "Transparente Preise — einfach verwaltet.",
    description: "Mietverwaltung ab €24/Einheit/Monat. Keine Überraschungen.",
    url: "https://einfach-verwaltet.de/preise",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "website",
  },
};

const features = [
  "Mieterkommunikation rund um die Uhr",
  "Nebenkostenabrechnung",
  "Mieterhöhungsmanagement",
  "Digitales Dokumentenportal",
  "Eigentümer-Dashboard mit Echtzeit-Übersicht",
  "Instandhaltungskoordination mit lokalen Partnern",
  "Monatliche Berichte",
];

const packages = [
  {
    name: "Mietverwaltung Starter",
    price: "ab €24",
    unit: "Einheit/Monat",
    detail: "bis 20 Einheiten",
    highlight: false,
    badge: null,
  },
  {
    name: "Mietverwaltung Professional",
    price: "ab €28",
    unit: "Einheit/Monat",
    detail: "20–100 Einheiten",
    highlight: true,
    badge: "Meistgewählt",
  },
  {
    name: "Mietverwaltung Enterprise",
    price: "Individuell",
    unit: "auf Anfrage",
    detail: "100+ Einheiten",
    highlight: false,
    badge: null,
  },
];

const faq = [
  {
    q: "Gibt es eine Mindestlaufzeit?",
    a: "Ja, 12 Monate. Danach kündbar mit 3-monatiger Frist zum Jahresende.",
  },
  {
    q: "Wie lang ist die Kündigungsfrist?",
    a: "3 Monate zum Jahresende. Keine automatische Verlängerung ohne Ihre ausdrückliche Zustimmung.",
  },
  {
    q: "Gibt es versteckte Kosten?",
    a: "Nein. Der Monatspreis ist all-inclusive. Keine Überraschungen auf der Rechnung. Außerplanmäßige Sonderleistungen (z.B. Großreparaturen über €500) werden vorab schriftlich mit Ihnen abgestimmt.",
  },
  {
    q: "Wer verwaltet meine Mietzahlungen?",
    a: "Mietzahlungen werden über ein separates Treuhandkonto abgewickelt — vollständig transparent und jederzeit von Ihnen einsehbar im Eigentümer-Dashboard.",
  },
];

function CheckIcon() {
  return (
    <svg
      className="w-5 h-5 flex-shrink-0 text-teal"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

export default function PreisePage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <section className="py-16 lg:py-24 bg-navy text-white">
          <div className="max-w-[1100px] mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 bg-teal/20 rounded-full px-4 py-1.5 mb-6">
              <span className="text-teal text-sm font-semibold">Transparente Preise</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 font-serif leading-tight">
              Transparente Preise.
              <br />
              <span className="text-teal">Keine Überraschungen.</span>
            </h1>
            <p className="text-lg text-white/75 max-w-2xl mx-auto">
              95&nbsp;% der Hausverwaltungen verstecken ihre Preise. Wir nicht. Was Sie hier sehen, ist was Sie zahlen.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16 lg:py-24 bg-warm-white">
          <div className="max-w-[1100px] mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {packages.map((pkg) => (
                <div
                  key={pkg.name}
                  className={`relative rounded-2xl p-8 flex flex-col ${
                    pkg.highlight
                      ? "border-2 border-teal bg-white shadow-xl"
                      : "border-2 border-gray-200 bg-white hover:border-teal/40 hover:shadow-md transition-all"
                  }`}
                >
                  {pkg.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-teal text-white text-xs font-semibold px-4 py-1.5 rounded-full whitespace-nowrap">
                        {pkg.badge}
                      </span>
                    </div>
                  )}
                  <div className="mb-6">
                    <h2 className="text-lg font-bold text-navy mb-1">{pkg.name}</h2>
                    <p className="text-sm text-text-light">{pkg.detail}</p>
                  </div>
                  <div className="mb-8">
                    <span className="text-4xl font-bold text-navy">{pkg.price}</span>
                    <div className="text-text-light text-sm mt-1">{pkg.unit}</div>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <CheckIcon />
                        <span className="text-sm text-navy">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={pkg.name === "Mietverwaltung Enterprise" ? "/kontakt" : "/portal/onboarding"}
                    className={`block text-center w-full py-3 px-6 rounded-xl font-semibold transition-all ${
                      pkg.highlight
                        ? "bg-teal text-white hover:bg-teal/85 shadow-md hover:shadow-lg"
                        : "bg-navy text-white hover:bg-navy/85"
                    }`}
                  >
                    {pkg.name === "Mietverwaltung Enterprise" ? "Individuelles Angebot anfragen" : "Jetzt starten →"}
                  </a>
                </div>
              ))}
            </div>

            {/* Onboarding note */}
            <div className="bg-navy/5 border border-navy/10 rounded-2xl p-6 max-w-3xl mx-auto text-center mb-16">
              <p className="text-navy font-semibold mb-1">Einmalige Onboarding-Gebühr</p>
              <p className="text-text-light text-sm">
                €50–100 pro Einheit (je nach Portfoliogröße). Einmalig beim Start — keine weiteren Einrichtungskosten.
                Der Betrag wird Ihnen transparent im Angebot ausgewiesen.
              </p>
            </div>

            {/* Included features callout */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 max-w-3xl mx-auto mb-16">
              <h3 className="text-xl font-bold text-navy mb-6 text-center">In jedem Paket enthalten</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((f) => (
                  <div key={f} className="flex items-start gap-3">
                    <CheckIcon />
                    <span className="text-sm text-navy">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Testimonials */}
        <section className="py-16 lg:py-20 bg-navy text-white">
          <div className="max-w-[900px] mx-auto px-6">
            <div className="text-center mb-12">
              <div className="flex justify-center gap-1 mb-3">
                {[1,2,3,4,5].map(i => <span key={i} className="text-amber text-xl">★</span>)}
              </div>
              <p className="text-white/60 text-sm">4,9 / 5 — Bewertet von unseren frühen Kunden</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/8 rounded-xl p-6 border border-white/10">
                <div className="flex gap-1 mb-4">{[1,2,3,4,5].map(i => <span key={i} className="text-amber text-sm">★</span>)}</div>
                <p className="text-white/90 text-sm leading-relaxed mb-4">
                  „Ich wusste endlich immer, was gerade mit meiner Wohnung passiert. Früher musste ich dreimal anrufen, um eine Antwort zu bekommen."
                </p>
                <p className="text-white/50 text-xs font-medium">Michael T. — 4 Wohnungen, Hamburg-Altona</p>
              </div>
              <div className="bg-white/8 rounded-xl p-6 border border-white/10">
                <div className="flex gap-1 mb-4">{[1,2,3,4,5].map(i => <span key={i} className="text-amber text-sm">★</span>)}</div>
                <p className="text-white/90 text-sm leading-relaxed mb-4">
                  „Die Nebenkostenabrechnung war zum ersten Mal in fünf Jahren pünktlich und vollständig. Kein Telefonat, keine Nachfrage — einfach fertig."
                </p>
                <p className="text-white/50 text-xs font-medium">Sandra K. — 8 Einheiten, Hamburg-Eimsbüttel</p>
              </div>
              <div className="bg-white/8 rounded-xl p-6 border border-white/10">
                <div className="flex gap-1 mb-4">{[1,2,3,4,5].map(i => <span key={i} className="text-amber text-sm">★</span>)}</div>
                <p className="text-white/90 text-sm leading-relaxed mb-4">
                  „Ein Wasserschaden — und alles lief: Handwerker, Mieterinformation, Versicherungsmeldung. Ich musste mich um nichts kümmern."
                </p>
                <p className="text-white/50 text-xs font-medium">Thomas B. — 6 Wohnungen, Hamburg-Eppendorf</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-[800px] mx-auto px-6">
            <h2 className="text-2xl font-bold text-navy text-center mb-10 font-serif">Häufige Fragen zu den Preisen</h2>
            <div className="space-y-4">
              {faq.map((item) => (
                <div key={item.q} className="bg-warm-white rounded-xl p-6 border border-gray-100">
                  <p className="font-semibold text-navy mb-2">{item.q}</p>
                  <p className="text-text-light text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-20 bg-navy text-white">
          <div className="max-w-[700px] mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4 font-serif">Bereit für eine ehrliche Hausverwaltung?</h2>
            <p className="text-white/75 mb-8">
              Vereinbaren Sie ein kostenloses Erstgespräch. Kein Verkaufsdruck. Kein Kleingedrucktes.
            </p>
            <a
              href="/kontakt"
              className="inline-block bg-teal text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-teal/85 transition-all shadow-lg hover:shadow-xl"
            >
              Kostenloses Erstgespräch vereinbaren →
            </a>
          </div>
        </section>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Gibt es versteckte Kosten?","acceptedAnswer":{"@type":"Answer","text":"Nein. Unsere Preise sind vollständig transparent: ab 20ac24/Einheit/Monat für Mietverwaltung, ab 20ac28/Einheit/Monat für WEG. Keine Einrichtungsgebühren, keine versteckten Zusatzkosten."}},{"@type":"Question","name":"Was ist im Preis enthalten?","acceptedAnswer":{"@type":"Answer","text":"Enthalten sind: 24/7 Mieterkorrespondenz, Betriebskostenabrechnung, Reparaturkoordination, digitales Dashboard, Dokumentenmanagement und Compliance-Monitoring."}},{"@type":"Question","name":"Kann ich kündigen?","acceptedAnswer":{"@type":"Answer","text":"Ja. Nach der Mindestlaufzeit von 12 Monaten können Sie monatlich kündigen. Kein Lock-in, keine Stornogebühren."}},{"@type":"Question","name":"Gibt es Preisunterschiede zwischen WEG und Mietverwaltung?","acceptedAnswer":{"@type":"Answer","text":"Ja. Mietverwaltung ab 20ac24/Einheit/Monat. WEG-Verwaltung ab 20ac28/Einheit/Monat (höherer Aufwand durch Eigentümerversammlungen, Jahresabrechnung, Beschluss-Sammlung)."}},{"@type":"Question","name":"Wann beginnt die Abrechnung?","acceptedAnswer":{"@type":"Answer","text":"Die Abrechnung beginnt mit dem vereinbarten Starttermin. Keine Kosten vor offiziellem Verwaltungsbeginn."}}]}) }} />
      <Footer />
    </>
  );
}
