import { PhoneIcon, ChartIcon, WrenchIcon, CreditCardIcon, ClipboardIcon, HomeIcon } from "./Icons";

const services = [
  {
    icon: PhoneIcon,
    title: "Erreichbarkeit, die hält",
    desc: "Ihre Anfrage wird sofort bearbeitet — nicht morgen, nicht nächste Woche. Per Telefon, E-Mail oder Portal. Kein Anrufbeantworter, der nie zurückruft.",
  },
  {
    icon: ChartIcon,
    title: "Jahresabrechnung pünktlich",
    desc: "Ihre Nebenkostenabrechnung kommt termintreu — nicht im Oktober, sondern fristgerecht nach §556 BGB. Vollständig, nachvollziehbar, geprüft.",
  },
  {
    icon: WrenchIcon,
    title: "Handwerker-Koordination",
    desc: "Schadensmeldung rein, Handwerker raus. Wir koordinieren Reparaturen mit unserem Partnernetzwerk — mit Nachweispflicht und Kostenfreigabe durch Sie.",
  },
  {
    icon: CreditCardIcon,
    title: "Mieteinzug & Buchhaltung",
    desc: "SEPA-Lastschrift, Mahnwesen nach BGB §286, monatliche Abrechnungen — alles transparent einsehbar in Ihrem Eigentümer-Dashboard.",
  },
  {
    icon: ClipboardIcon,
    title: "WEG-Verwaltung",
    desc: "Eigentümerversammlungen, Beschlussprotokolle, Instandhaltungsrücklagen — wir führen Ihre WEG rechts- und fristsicher nach aktuellem WEGMoG.",
  },
  {
    icon: HomeIcon,
    title: "Mietverwaltung",
    desc: "Mieterauswahl, Vertragsgestaltung, Mieterhöhungen nach Mietspiegel, Wohnungsübergaben — vollständig betreut, weniger Stress für Sie.",
  },
];

export function Leistungen() {
  return (
    <section id="leistungen" className="py-20 lg:py-32 bg-white">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-teal/10 rounded-full px-4 py-1.5 mb-6">
            <span className="text-teal text-sm font-semibold">Leistungen</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4 font-serif">
            Alles, was gute Hausverwaltung braucht
          </h2>
          <p className="text-text-light text-lg max-w-2xl mx-auto">
            Keine halbe Verwaltung. Kein Outsourcing Ihrer Probleme. Wir übernehmen vollständig — damit Sie wirklich frei sind.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="group bg-warm-white rounded-2xl p-6 border border-gray-100 hover:border-teal/30 hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-navy/8 flex items-center justify-center mb-4 group-hover:bg-teal/10 transition-colors">
                <s.icon className="w-6 h-6 text-navy group-hover:text-teal transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-navy mb-2 group-hover:text-teal transition-colors">
                {s.title}
              </h3>
              <p className="text-text-light text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-text-light mb-4">Unsicher, was Sie brauchen?</p>
          <a href="#kontakt" className="inline-flex items-center gap-2 text-teal font-semibold hover:underline">
            Sprechen Sie kostenlos mit uns →
          </a>
        </div>
      </div>
    </section>
  );
}
