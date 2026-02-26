import { CheckIcon, CloseIcon } from "./Icons";

const rows = [
  { feature: "Preise auf der Website sichtbar", us: true, others: false },
  { feature: "Reaktionszeit unter 5 Minuten", us: true, others: false },
  { feature: "Persönlicher Ansprechpartner", us: true, others: true },
  { feature: "Digitales Eigentümerportal", us: true, others: true },
  { feature: "Transparente Nebenkostenabrechnung", us: true, others: false },
  { feature: "Keine versteckten Zusatzkosten", us: true, others: false },
  { feature: "Lokales Handwerkernetzwerk Hamburg", us: true, others: false },
  { feature: "Vertragslaufzeit ab 12 Monate", us: true, others: false },
];

function Check() {
  return (
    <div className="w-7 h-7 rounded-full bg-green/15 flex items-center justify-center mx-auto">
      <CheckIcon className="w-4 h-4 text-green" />
    </div>
  );
}

function Cross() {
  return (
    <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center mx-auto">
      <CloseIcon className="w-4 h-4 text-red-400" />
    </div>
  );
}

export function Vergleich() {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-teal/10 rounded-full px-4 py-1.5 mb-6">
            <span className="text-teal text-sm font-semibold">Vergleich</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4 font-serif">
            Was andere versprechen. Was wir liefern.
          </h2>
          <p className="text-text-light max-w-lg mx-auto">
            Die meisten Hausverwaltungen zeigen Ihnen nicht einmal ihre Preise. Wir zeigen Ihnen alles.
          </p>
        </div>

        <div className="bg-warm-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-[1fr_100px_100px] sm:grid-cols-[1fr_120px_120px] bg-navy text-white text-sm font-semibold">
            <div className="px-6 py-4"></div>
            <div className="px-4 py-4 text-center">einfach verwaltet.</div>
            <div className="px-4 py-4 text-center text-white/60">Typische HV</div>
          </div>
          {rows.map((r, i) => (
            <div
              key={r.feature}
              className={`grid grid-cols-[1fr_100px_100px] sm:grid-cols-[1fr_120px_120px] items-center ${i % 2 === 0 ? "bg-white" : "bg-warm-white"}`}
            >
              <div className="px-6 py-4 text-sm text-navy font-medium">{r.feature}</div>
              <div className="px-4 py-4">{r.us ? <Check /> : <Cross />}</div>
              <div className="px-4 py-4">{r.others ? <Check /> : <Cross />}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
