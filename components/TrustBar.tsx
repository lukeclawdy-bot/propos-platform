const trustSignals = [
  { value: "5 Eigentümer", label: "im Beta-Programm" },
  { value: "Hamburg-Fokus", label: "seit 2026" },
  { value: "< 15 Minuten", label: "Antwortzeit garantiert" },
];

export function TrustBar() {
  return (
    <section className="bg-teal/10 border-b border-teal/20 py-4 px-6">
      <div className="max-w-[1100px] mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
          {trustSignals.map((signal, i) => (
            <div key={signal.label} className="flex items-center gap-2">
              {i > 0 && <span className="hidden sm:block text-teal/30 select-none">·</span>}
              <div className="text-center sm:text-left">
                <span className="text-navy font-bold text-sm">{signal.value}</span>
                <span className="text-text-light text-sm"> {signal.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
