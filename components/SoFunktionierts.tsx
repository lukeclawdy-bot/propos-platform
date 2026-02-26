import { ClockIcon, HandshakeIcon, StarIcon } from "./Icons";

const steps = [
  { num: "01", time: "Sofort", title: "Kostenloses Erstgespräch", desc: "Sie schildern Ihre Situation — wir hören zu. Kein Verkaufsgespräch, keine Überrumpelung. Direkt telefonisch oder in Hamburg." },
  { num: "02", time: "24 Std", title: "Ihr individuelles Angebot", desc: "Am nächsten Tag liegt Ihr schriftliches Angebot vor — mit klaren Preisen, konkreten Leistungen und ohne versteckte Klauseln." },
  { num: "03", time: "2–3 Wochen", title: "Reibungsloser Wechsel", desc: "Wir koordinieren die komplette Übergabe mit Ihrer bisherigen Verwaltung. Kein Aufwand für Sie — wir kümmern uns um alles." },
  { num: "04", time: "Ab Tag 1", title: "Alles läuft. Sofort.", desc: "Ihr Eigentümerportal ist live. Anfragen werden sofort bearbeitet. Abrechnungen, Belege, Wartungshistorien — alles einsehbar, nichts bleibt liegen." },
];

export function SoFunktionierts() {
  return (
    <section id="so-funktionierts" className="py-20 lg:py-32 bg-white">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-navy/8 rounded-full px-4 py-1.5 mb-6">
            <span className="text-navy text-sm font-semibold">So funktioniert&apos;s</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4 font-serif">
            Vom ersten Gespräch bis zur sorgenfreien Verwaltung
          </h2>
          <p className="text-text-light text-lg max-w-2xl mx-auto">
            Vier Schritte, kein Papierkram-Chaos. Wir haben den Wechselprozess so gestaltet, dass er für Sie so wenig Aufwand wie möglich bedeutet.
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-teal via-navy to-teal opacity-20" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s) => (
              <div key={s.num} className="relative flex flex-col items-center text-center">
                <div className="relative w-16 h-16 rounded-full bg-navy flex items-center justify-center mb-6 shadow-md z-10">
                  <span className="text-white font-bold text-lg">{s.num}</span>
                </div>
                <div className="inline-flex items-center gap-1 bg-teal/10 text-teal text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  <ClockIcon className="w-3 h-3" />
                  {s.time}
                </div>
                <h3 className="text-base font-bold text-navy mb-2">{s.title}</h3>
                <p className="text-sm text-text-light leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Promise banner */}
        <div className="mt-16 bg-gradient-to-br from-navy to-teal rounded-2xl p-8 md:p-12 text-white text-center">
          <HandshakeIcon className="w-10 h-10 mx-auto mb-4 opacity-80" />
          <h3 className="text-2xl font-bold mb-3 font-serif">Kein Leerlauf. Kein Chaos. Sofort.</h3>
          <p className="text-white/80 max-w-xl mx-auto mb-6 leading-relaxed">
            Jede Anfrage — per Telefon, E-Mail oder Portal — wird sofort bearbeitet und am selben Tag beantwortet. Verbindlich und nachvollziehbar. Weil Ihre Immobilie nicht warten kann.
          </p>
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-xl px-5 py-3 text-sm font-medium">
            <span className="text-amber flex gap-0.5">
              {[1,2,3,4,5].map(i => <StarIcon key={i} className="w-4 h-4" />)}
            </span>
            <span>Ihr Vertrauen ist unser wichtigstes Asset</span>
          </div>
        </div>
      </div>
    </section>
  );
}
