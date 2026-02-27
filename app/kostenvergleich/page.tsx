import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { KostenvergleichClient } from "./KostenvergleichClient";

export const metadata: Metadata = {
  title: "Kostenvergleich Hausverwaltung 2026: Selbstverwaltung vs. HV vs. einfach verwaltet.",
  description:
    "Was kostet Ihre Hausverwaltung wirklich? Vergleich Selbstverwaltung vs. klassische Hausverwaltung vs. einfach verwaltet. — mit Zeitkosten-Rechner.",
  keywords:
    "Hausverwaltung Kosten Vergleich, Hausverwaltung kostet, Selbstverwaltung vs Hausverwaltung, Hausverwaltung günstig",
  openGraph: {
    title: "Was kostet Ihre Hausverwaltung wirklich?",
    description:
      "Vergleich: Selbstverwaltung vs. klassische HV vs. einfach verwaltet. — inklusive Zeitkosten-Rechner.",
    url: "https://einfach-verwaltet.de/kostenvergleich",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "website",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Ist €24-34 pro Einheit nicht teuer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Im Vergleich zu klassischen Hausverwaltungen (€26–40/Einheit) liegen wir günstiger — und bieten mehr: kürzere Reaktionszeiten, digitales Mieterportal, automatische Nebenkostenabrechnung und 24/7-Verfügbarkeit. Wenn Sie Ihren eigenen Zeitaufwand einrechnen (Handwerker-Koordination, Mahnwesen, Jahresabrechnung), ist Selbstverwaltung selten wirklich günstiger.",
      },
    },
    {
      "@type": "Question",
      name: "Was wenn ich nur 2-3 Einheiten habe?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Gerade kleine Portfolios profitieren überproportional: Sie haben dieselben gesetzlichen Pflichten wie große Eigentümer (§556 BGB, §14 MaBV, BetrKV), aber weniger Spielraum für Fehler. Unser Einstiegspaket startet ab 2 Einheiten — sprechen Sie uns einfach an.",
      },
    },
    {
      "@type": "Question",
      name: "Ist eine Kündigung jederzeit möglich?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Unser Vertrag hat eine Laufzeit von 12 Monaten mit 3-monatiger Kündigungsfrist zum Vertragsende. Außerordentliche Kündigung bei wichtigem Grund jederzeit. Keine versteckten Klauseln, kein automatisches Rollover.",
      },
    },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Kostenvergleich Hausverwaltung — Was kostet Ihre Hausverwaltung wirklich?",
  description:
    "Vergleich: Selbstverwaltung vs. klassische Hausverwaltung vs. einfach verwaltet. — Kosten, Reaktionszeiten und versteckte Zeitkosten.",
  url: "https://einfach-verwaltet.de/kostenvergleich",
  publisher: {
    "@type": "Organization",
    name: "einfach verwaltet.",
    url: "https://einfach-verwaltet.de",
  },
};

export default function Kostenvergleich() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <Navbar />
      <main className="bg-warm-white min-h-screen pt-16">
        {/* Hero */}
        <div className="bg-navy py-16 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block bg-teal/20 text-teal text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
              Kostenvergleich
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Was kostet Ihre Hausverwaltung wirklich?
            </h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              Vergleich: Selbstverwaltung vs. klassische HV vs. einfach verwaltet. — inklusive versteckter Zeitkosten.
            </p>
          </div>
        </div>

        <KostenvergleichClient />
      </main>
      <Footer />
    </>
  );
}
