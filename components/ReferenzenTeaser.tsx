// ReferenzenTeaser — homepage section linking to /referenzen
// Positioned after WarumWir to reinforce social proof before the final CTA

const highlights = [
  { stat: "< 15 Min", desc: "Mittlere Reaktionszeit" },
  { stat: "100%", desc: "Digitale Verwaltung" },
  { stat: "0", desc: "Datenverluste" },
];

const quotes = [
  {
    text: "Kein Anruf mehr vom Mieter — seit dem ersten Tag.",
    attr: "T.H., 45 Einheiten, Hamburg-Eimsbüttel",
  },
  {
    text: "Nebenkostenabrechnung fehlerfrei, pünktlich und vollständig digital.",
    attr: "S.B., 8 Einheiten, Berlin",
  },
];

export function ReferenzenTeaser() {
  return (
    <section className="py-20 bg-gradient-to-b from-navy/4 to-white px-6">
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-teal/10 rounded-full px-4 py-1.5 mb-5">
            <div className="w-2 h-2 rounded-full bg-teal" />
            <span className="text-teal text-sm font-medium">Eigentümer-Erfahrungen</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy font-serif mb-4">
            Was Eigentümer berichten
          </h2>
          <p className="text-text-light text-lg max-w-xl mx-auto">
            Echte Reaktionszeiten. Transparente Prozesse. Keine leeren Versprechen.
          </p>
        </div>

        {/* Mini stats */}
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          {highlights.map((h) => (
            <div
              key={h.stat}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center"
            >
              <div className="text-teal font-bold text-3xl mb-1">{h.stat}</div>
              <div className="text-text-light text-sm">{h.desc}</div>
            </div>
          ))}
        </div>

        {/* Quote snippets */}
        <div className="grid md:grid-cols-2 gap-5 mb-10">
          {quotes.map((q) => (
            <blockquote
              key={q.attr}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
            >
              <p className="text-navy italic mb-3 leading-relaxed">
                &ldquo;{q.text}&rdquo;
              </p>
              <p className="text-text-light text-xs font-medium">{q.attr}</p>
            </blockquote>
          ))}
        </div>

        {/* CTA to /referenzen */}
        <div className="text-center">
          <a
            href="/referenzen"
            className="inline-flex items-center gap-2 border-2 border-navy/20 text-navy px-8 py-4 rounded-xl font-semibold text-base hover:border-teal hover:text-teal transition-all"
          >
            Alle Erfahrungsberichte lesen
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Trust badge row */}
        <div className="mt-14 pt-8 border-t border-gray-100 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-text-light">
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            DSGVO-konform
          </span>
          <span className="text-gray-200">·</span>
          <span>RVLT Ventures GmbH</span>
          <span className="text-gray-200">·</span>
          <span>Amtsgericht Hamburg HRB 193395</span>
          <span className="text-gray-200">·</span>
          <span>§34c GewO (in Beantragung)</span>
        </div>
      </div>
    </section>
  );
}
