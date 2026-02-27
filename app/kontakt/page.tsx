import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Kontakt } from "@/components/Kontakt";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Kontakt — einfach verwaltet.",
  description:
    "Kostenloses Erstgespräch anfragen. Wir melden uns noch am selben Werktag. Hausverwaltung Hamburg.",
  openGraph: {
    title: "Kontakt — einfach verwaltet.",
    description: "Kostenloses Erstgespräch anfragen. Antwort noch am selben Tag.",
    url: "https://einfach-verwaltet.de/kontakt",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "website",
  },
};

export default function KontaktPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="py-10 bg-navy text-center">
          <h1 className="text-4xl font-bold text-white font-serif">Kontakt aufnehmen</h1>
          <p className="text-white/70 mt-2">Kostenloses Erstgespräch — Rückmeldung noch heute.</p>
        </div>
        <Kontakt />

        {/* Termin buchen */}
        <section className="py-16 px-6 bg-gray-50 border-t border-gray-100">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-teal/10 rounded-full px-4 py-1.5 mb-5">
              <span className="text-teal text-sm font-semibold">Direkttermin</span>
            </div>
            <h2 className="text-3xl font-bold text-navy font-serif mb-4">
              Termin direkt buchen
            </h2>
            <p className="text-text-light text-lg mb-8">
              Wählen Sie einen passenden Termin für Ihr kostenloses Erstgespräch.
              30 Minuten, kein Verkaufsdruck — nur ein ehrliches Gespräch über Ihre Immobilie.
            </p>
            {/* TODO: Lukas — embed Calendly here: https://calendly.com/new */}
            <div
              id="calendly-widget"
              className="bg-white rounded-2xl border-2 border-dashed border-teal/30 p-12 text-center"
            >
              <div className="text-teal/60 text-sm font-medium mb-2">Kalender wird geladen …</div>
              <p className="text-text-light text-xs">
                {/* TODO: Lukas — embed Calendly here: https://calendly.com/new */}
                Calendly-Buchungswidget (wird eingebettet)
              </p>
              <a
                href="/anfrage"
                className="inline-flex items-center gap-2 mt-6 bg-teal text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-navy transition-colors"
              >
                Alternativ: Anfrage-Formular nutzen →
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
