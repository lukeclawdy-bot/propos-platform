import { ShieldIcon, CheckIcon } from "./Icons";

const promises = [
  "Wir kündigen Ihre alte Verwaltung — Sie unterschreiben nur.",
  "Lückenlose Dokumentenübernahme in 30 Tagen.",
  "Ein Wechsel, der tatsächlich funktioniert — vom Erstgespräch bis zur ersten Abrechnung.",
  "Keine Ausfallzeit. Kein Chaos. Keine bösen Überraschungen.",
];

export function WechselVersprechen() {
  return (
    <section className="py-20 lg:py-28 bg-navy text-white">
      <div className="max-w-[900px] mx-auto px-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-teal/20 flex items-center justify-center mx-auto mb-8">
          <ShieldIcon className="w-8 h-8 text-teal" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-serif">
          Unser Wechsel-Versprechen
        </h2>
        <p className="text-white/70 text-lg mb-12 max-w-lg mx-auto">
          Der Wechsel der Hausverwaltung klingt nach Stress. Muss er aber nicht sein.
          Wir übernehmen den gesamten Prozess — Sie lehnen sich zurück.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 text-left mb-12">
          {promises.map((p) => (
            <div key={p} className="flex items-start gap-3 bg-white/5 rounded-xl p-5 border border-white/10">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-teal/20 flex items-center justify-center mt-0.5">
                <CheckIcon className="w-3 h-3 text-teal" />
              </div>
              <span className="text-white/90 text-sm leading-relaxed">{p}</span>
            </div>
          ))}
        </div>

        <a
          href="#kontakt"
          className="inline-flex items-center justify-center gap-2 bg-white text-navy px-8 py-4 rounded-xl font-semibold text-base hover:bg-white/90 transition-all hover:shadow-lg"
        >
          Jetzt wechseln — kostenlos anfragen
        </a>
        <p className="text-white/40 text-xs mt-4">
          Kostenlos und unverbindlich. Wir melden uns noch am selben Tag.
        </p>
      </div>
    </section>
  );
}
