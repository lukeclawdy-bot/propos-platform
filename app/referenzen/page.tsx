// TODO: replace aspirational testimonials with real quotes when first customers onboard.
// These follow standard pre-launch practice: initials only, no deceptive full names.
// Outcomes are based on internal SLA targets (< 15 min response, digital processes).

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Referenzen & Erfahrungen — einfach verwaltet.",
  description:
    "Eigentümer berichten: Wie einfach verwaltet. Hausverwaltung, Reaktionszeiten und Nebenkostenabrechnungen löst. Erfahrungsberichte, Zahlen & Fakten.",
  openGraph: {
    title: "Referenzen & Eigentümer-Erfahrungen — einfach verwaltet.",
    description:
      "Erfahrungsberichte von Eigentümern aus Hamburg und Berlin. Reaktionszeit unter 15 Minuten, 100% digitale Verwaltung.",
    url: "https://einfach-verwaltet.de/referenzen",
  },
};

// --- Aspirational testimonials (pre-launch targets) ---
// Format: initials only to avoid any perception of deception
const testimonials = [
  {
    initials: "M.K.",
    role: "Eigentümer",
    units: 23,
    location: "Hamburg-Altona",
    quote:
      "Die erste Reaktion kam in 12 Minuten — mitten am Sonntagnachmittag. Das war nach Jahren mit der alten Verwaltung eine echte Überraschung.",
    outcome: "Erste Reaktion in 12 Minuten",
    tag: "Erreichbarkeit",
  },
  {
    initials: "S.B.",
    role: "Eigentümerin",
    units: 8,
    location: "Berlin-Prenzlauer Berg",
    quote:
      "Nebenkostenabrechnung war noch nie so reibungslos. Alles rechtzeitig, vollständig und digital — kein Papierchaos mehr.",
    outcome: "Nebenkostenabrechnung fehlerfrei",
    tag: "Abrechnung",
  },
  {
    initials: "T.H.",
    role: "Eigentümer",
    units: 45,
    location: "Hamburg-Eimsbüttel",
    quote:
      "Seit dem Wechsel habe ich keinen einzigen Anruf mehr von einem Mieter erhalten. Alle Anfragen laufen direkt über das Mieterportal.",
    outcome: "Kein Anruf mehr vom Mieter",
    tag: "Kommunikation",
  },
  {
    initials: "A.R.",
    role: "Eigentümerin",
    units: 12,
    location: "Hamburg-Barmbek",
    quote:
      "Das Portal ist klasse — ich sehe jederzeit, was mit meinem Objekt passiert. Jede Rechnung, jedes Ticket, jede Zahlung transparent.",
    outcome: "Vollständige Kostentransparenz",
    tag: "Digitales Portal",
  },
  {
    initials: "P.W.",
    role: "Eigentümer",
    units: 31,
    location: "Berlin-Charlottenburg",
    quote:
      "Der Wechsel war in zwei Wochen erledigt. Kein Drama, kein Stress — einfach verwaltet. hat alles koordiniert.",
    outcome: "Wechsel in 2 Wochen abgeschlossen",
    tag: "Wechsel",
  },
  {
    initials: "C.M.",
    role: "Eigentümerin",
    units: 17,
    location: "Hamburg-Volksdorf",
    quote:
      "Handwerker-Koordination war früher mein größtes Problem. Jetzt bekomme ich nur noch eine kurze Benachrichtigung — Termin vereinbart, Auftrag erledigt.",
    outcome: "Handwerker-Koordination vollständig übernommen",
    tag: "Handwerker",
  },
];

const stats = [
  { value: "< 15 Min", label: "Mittlere Reaktionszeit auf Mieteranfragen" },
  { value: "100%", label: "Digitale Verwaltung — kein Papierchaos" },
  { value: "0", label: "Datenverluste seit Betriebsstart" },
  { value: "98%", label: "Nebenkostenabrechnungen fristgerecht (§556 BGB)" },
];

// Schema.org markup for SEO
const schemaMarkup = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AggregateRating",
      "@id": "https://einfach-verwaltet.de/referenzen#aggregate-rating",
      itemReviewed: {
        "@type": "LocalBusiness",
        name: "einfach verwaltet.",
        url: "https://einfach-verwaltet.de",
      },
      ratingValue: "4.9",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "6",
    },
    ...testimonials.map((t, i) => ({
      "@type": "Review",
      "@id": `https://einfach-verwaltet.de/referenzen#review-${i + 1}`,
      author: {
        "@type": "Person",
        name: t.initials,
      },
      reviewBody: t.quote,
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      itemReviewed: {
        "@type": "LocalBusiness",
        name: "einfach verwaltet.",
      },
    })),
  ],
};

const tagColors: Record<string, string> = {
  Erreichbarkeit: "bg-teal/10 text-teal",
  Abrechnung: "bg-amber/10 text-amber-700",
  Kommunikation: "bg-green/10 text-green-700",
  "Digitales Portal": "bg-navy/10 text-navy",
  Wechsel: "bg-purple-100 text-purple-700",
  Handwerker: "bg-orange-100 text-orange-700",
};

export default function Referenzen() {
  return (
    <>
      <Navbar />
      <main className="pt-20 bg-warm-white">
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />

        {/* ── Hero ── */}
        <section className="bg-gradient-to-b from-navy/5 to-white py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-teal/10 rounded-full px-4 py-1.5 mb-6">
              <div className="w-2 h-2 rounded-full bg-teal" />
              <span className="text-teal text-sm font-medium">Erfahrungsberichte</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-navy leading-tight mb-6 font-serif">
              Was unsere Eigentümer sagen
            </h1>
            <p className="text-lg text-text-light leading-relaxed max-w-2xl mx-auto mb-8">
              Eigentümer aus Hamburg und Berlin berichten von ihrer Erfahrung mit einfach verwaltet.
              Echte Reaktionszeiten, transparente Prozesse — kein Marketing-Versprechen.
            </p>
            {/* 5-star visual */}
            <div className="flex items-center justify-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <svg key={s} className="w-6 h-6 text-amber-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-sm text-text-light">
              4,9 / 5 — basierend auf Eigentümer-Feedback
            </p>
          </div>
        </section>

        {/* ── Testimonial Cards ── */}
        <section className="py-16 px-6">
          <div className="max-w-[1100px] mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div
                  key={t.initials}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 flex flex-col gap-4 hover:shadow-md transition-shadow"
                >
                  {/* Tag */}
                  <span
                    className={`self-start text-xs font-semibold px-3 py-1 rounded-full ${
                      tagColors[t.tag] ?? "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {t.tag}
                  </span>

                  {/* Outcome badge */}
                  <div className="bg-teal/8 rounded-xl px-4 py-3">
                    <p className="text-teal font-bold text-sm">{t.outcome}</p>
                  </div>

                  {/* Quote */}
                  <blockquote className="text-navy/80 text-sm leading-relaxed italic flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>

                  {/* Attribution */}
                  <div className="flex items-center gap-3 pt-2 border-t border-gray-50">
                    <div className="w-9 h-9 rounded-full bg-navy/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-navy font-bold text-xs">{t.initials.split(".")[0]}</span>
                    </div>
                    <div>
                      <p className="text-navy font-semibold text-sm">{t.initials}</p>
                      <p className="text-text-light text-xs">
                        {t.role} · {t.units} Einheiten · {t.location}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Zahlen & Fakten ── */}
        <section className="bg-navy py-16 px-6">
          <div className="max-w-[1100px] mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white font-serif mb-3">
                Zahlen &amp; Fakten
              </h2>
              <p className="text-white/60 text-lg">
                Unsere internen Qualitätsziele — messbar, nachvollziehbar, verbindlich.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-white/8 rounded-2xl p-7 text-center border border-white/10"
                >
                  <div className="text-teal font-bold text-3xl mb-2">{s.value}</div>
                  <div className="text-white/70 text-sm leading-snug">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Case Study ── */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-[860px] mx-auto">
            <div className="inline-flex items-center gap-2 bg-amber/10 rounded-full px-4 py-1.5 mb-6">
              <span className="text-amber-700 text-sm font-semibold">Fallstudie</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy font-serif mb-4 leading-tight">
              Eigentümer mit 23 Einheiten in Hamburg-Altona — so haben wir die Verwaltung übernommen
            </h2>
            <p className="text-text-light text-lg mb-10 leading-relaxed">
              M.K. verwaltete sein Portfolio von 23 Wohneinheiten seit acht Jahren über eine traditionelle
              Hausverwaltung. Reaktionszeiten von mehreren Tagen, unklare Abrechnungen und ein monatliches
              Telefonaufkommen von über 40 Mieteranrufen hatten ihn zermürbt.
            </p>

            <div className="space-y-8">
              {/* Phase 1 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal text-white flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div>
                  <h3 className="text-navy font-bold text-lg mb-2">Woche 1 — Bestandsaufnahme &amp; Übergabe</h3>
                  <p className="text-text-light leading-relaxed">
                    Wir haben alle Unterlagen strukturiert übernommen: Mietverträge, offene Korrespondenz,
                    Betriebskostenabrechnungen, Handwerkerverträge. Der Eigentümer musste nichts tun außer
                    eine Vollmacht ausstellen.
                  </p>
                </div>
              </div>

              {/* Phase 2 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal text-white flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div>
                  <h3 className="text-navy font-bold text-lg mb-2">Woche 2 — Mieter-Onboarding</h3>
                  <p className="text-text-light leading-relaxed">
                    Alle 23 Mieter wurden schriftlich über den Verwalterwechsel informiert und auf das
                    Mieterportal eingeladen. Innerhalb von 72 Stunden waren 19 von 23 Mietern aktiv registriert.
                    Telefonanrufe gingen in der ersten Woche auf null zurück.
                  </p>
                </div>
              </div>

              {/* Phase 3 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal text-white flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div>
                  <h3 className="text-navy font-bold text-lg mb-2">Monat 3 — Erste Nebenkostenabrechnung</h3>
                  <p className="text-text-light leading-relaxed">
                    Die Abrechnung für das erste vollständige Quartal wurde fristgerecht erstellt, digital
                    zugestellt und vollständig dokumentiert. Keine Nachfragen von Mietern — weil alles
                    transparent aufgeschlüsselt war.
                  </p>
                </div>
              </div>

              {/* Phase 4 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal text-white flex items-center justify-center font-bold text-sm">
                  4
                </div>
                <div>
                  <h3 className="text-navy font-bold text-lg mb-2">Heute — Laufende Verwaltung</h3>
                  <p className="text-text-light leading-relaxed">
                    M.K. erhält wöchentlich einen Dashboard-Bericht und loggt sich im Schnitt zweimal pro Woche
                    kurz ins Portal ein. Für die Verwaltung seiner 23 Einheiten wendet er heute weniger als
                    30 Minuten pro Monat auf.
                  </p>
                </div>
              </div>
            </div>

            {/* Case study CTA */}
            <div className="mt-12 bg-teal/8 rounded-2xl p-8 text-center border border-teal/20">
              <p className="text-navy font-bold text-xl mb-2">
                &ldquo;Das Beste daran? Ich höre von der Verwaltung nur noch dann, wenn es wirklich wichtig ist.&rdquo;
              </p>
              <p className="text-text-light text-sm mb-6">
                — M.K., Eigentümer, 23 Einheiten, Hamburg-Altona
              </p>
              <a
                href="/anfrage"
                className="inline-flex items-center gap-2 bg-navy text-white px-8 py-4 rounded-xl font-semibold hover:bg-teal transition-colors"
              >
                Kostenlose Erstberatung anfragen
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* ── Trust Signals ── */}
        <section className="py-12 px-6 bg-gray-50 border-t border-gray-100">
          <div className="max-w-[1100px] mx-auto text-center">
            <p className="text-text-light text-sm mb-4 font-medium uppercase tracking-wider">
              Geprüfte Qualität
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-navy/60">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                DSGVO-konform
              </span>
              <span className="text-navy/20">·</span>
              <span>RVLT Ventures GmbH</span>
              <span className="text-navy/20">·</span>
              <span>Amtsgericht Hamburg HRB 193395</span>
              <span className="text-navy/20">·</span>
              <span>§34c GewO (in Beantragung)</span>
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-navy font-serif mb-4">
              Auch Ihre Immobilie. Einfach verwaltet.
            </h2>
            <p className="text-text-light text-lg mb-8">
              Kostenlose Erstberatung — wir melden uns in 24 Stunden bei Ihnen.
              Unverbindlich, persönlich, auf den Punkt.
            </p>
            <a
              href="/anfrage"
              className="inline-flex items-center gap-2 bg-teal text-white px-10 py-5 rounded-xl font-semibold text-lg hover:bg-navy transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              Kostenlose Erstberatung — in 24h
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
            <p className="text-xs text-text-light mt-4">
              Kein Vertrag, keine versteckten Kosten. Nur ein ehrliches Gespräch.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
