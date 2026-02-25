import Image from "next/image";
import { BoltIcon, MapPinIcon, LockOpenIcon, ScaleIcon, LockIcon, HomeIcon, ShieldIcon, StarIcon } from "./Icons";

const stats = [
  { icon: BoltIcon, value: "< 24h", label: "Reaktionszeit", desc: "Garantiert, schriftlich festgehalten. Nicht \"so schnell wie möglich\"." },
  { icon: MapPinIcon, value: "Hamburg", label: "Verwurzelt", desc: "Kein Fernverwalter. Wir kennen Altona, Eimsbüttel, Winterhude." },
  { icon: LockOpenIcon, value: "100%", label: "Preistransparenz", desc: "Alle Kosten auf dieser Seite. Kein Anruf nötig, um den Preis zu erfahren." },
  { icon: ScaleIcon, value: "§34c", label: "GewO Lizenz", desc: "Vollständig zugelassene Hausverwaltung nach deutschem Recht." },
];

const testimonials = [
  {
    text: "Endlich eine Verwaltung, die zurückruft. In drei Jahren mit der alten Verwaltung hatte ich mehr unerledigte Anfragen als in drei Monaten mit einfach verwaltet.",
    name: "M. K.",
    role: "Eigentümer, 4 Einheiten, Altona",
  },
  {
    text: "Die Jahresabrechnung kam zum ersten Mal pünktlich. Und ich konnte jeden Beleg im Portal nachvollziehen. Das hat mich wirklich überrascht.",
    name: "S. H.",
    role: "WEG-Vorstand, Eimsbüttel",
  },
  {
    text: "Ich war skeptisch gegenüber einer neuen Verwaltung. Aber das Angebot war transparent, der Wechsel lief reibungslos, und ich habe seitdem keinen Stress mehr.",
    name: "T. B.",
    role: "Vermieter, 8 Einheiten, Winterhude",
  },
];

const badges = [
  { icon: ScaleIcon, label: "§34c GewO zugelassen" },
  { icon: LockIcon, label: "DSGVO-konform" },
  { icon: HomeIcon, label: "Hamburger Unternehmen" },
  { icon: ShieldIcon, label: "Berufshaftpflicht versichert" },
];

export function WarumWir() {
  return (
    <section className="py-20 lg:py-32 bg-warm-white">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-amber/10 rounded-full px-4 py-1.5 mb-6">
            <span className="text-amber text-sm font-semibold">Warum einfach verwaltet.</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4 font-serif">
            Der Unterschied, den Sie spüren werden
          </h2>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-6 border border-gray-100 text-center hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-navy/8 flex items-center justify-center mx-auto mb-3">
                <s.icon className="w-6 h-6 text-navy" />
              </div>
              <div className="text-3xl font-bold text-navy mb-1">{s.value}</div>
              <div className="text-sm font-semibold text-teal mb-2">{s.label}</div>
              <p className="text-xs text-text-light leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Person cutout + testimonials intro */}
        <div className="flex flex-col lg:flex-row items-center gap-10 mb-10">
          <div className="hidden lg:block flex-shrink-0 w-[200px]">
            <Image
              src="/person-tablet.png"
              alt="Ihre persönliche Ansprechpartnerin"
              width={600}
              height={800}
              className="w-full h-auto drop-shadow-xl"
            />
          </div>
          <div className="text-center lg:text-left">
            <h3 className="text-2xl font-bold text-navy font-serif mb-2">Was Eigentümer sagen</h3>
            <p className="text-text-light text-sm max-w-lg">Echte Stimmen von Immobilieneigentümern aus Hamburg, die zu uns gewechselt haben.</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col">
              <div className="flex gap-0.5 mb-4">
                {[1,2,3,4,5].map(i => <StarIcon key={i} className="w-4 h-4 text-amber" />)}
              </div>
              <p className="text-navy text-sm leading-relaxed flex-1 italic">„{t.text}"</p>
              <div className="flex items-center gap-3 mt-5 pt-4 border-t border-gray-100">
                <div className="w-9 h-9 rounded-full bg-navy flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-navy">{t.name}</div>
                  <div className="text-xs text-text-light">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-6">
          {badges.map((b) => (
            <div key={b.label} className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-navy">
              <b.icon className="w-4 h-4 text-navy" />
              <span>{b.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
