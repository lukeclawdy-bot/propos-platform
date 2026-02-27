import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowRightIcon, CheckIcon, BuildingIcon, MapPinIcon, SparklesIcon, UsersIcon, StarIcon, ShieldIcon, CurrencyIcon, ClockIcon, ChatIcon, TargetIcon } from "@/components/Icons";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beta-Programm — einfach verwaltet.",
  description: "Werden Sie einer der ersten fünf Kunden. 3 Monate 50% Rabatt auf Hausverwaltung in Hamburg.",
};

const benefits = [
  {
    icon: CurrencyIcon,
    title: "3 Monate 50% Rabatt",
    description: "€12–17/Einheit/Monat statt €24–34. Voller Service, halber Preis.",
  },
  {
    icon: ShieldIcon,
    title: "Vollständiger Service",
    description: "Keine eingeschränkte Version — Sie bekommen alles: Mieterbetreuung, Abrechnung, Handwerker, Dokumente.",
  },
  {
    icon: UsersIcon,
    title: "Direkter Draht zum Gründer",
    description: "Kein Callcenter. Direkter Kontakt zu Lukas Schmitz für Feedback und Fragen.",
  },
  {
    icon: SparklesIcon,
    title: "Priorisierter Support",
    description: "Ihre Anfragen werden als erstes bearbeitet — garantierte Reaktionszeit unter 5 Minuten.",
  },
];

const eligibility = [
  { icon: MapPinIcon, text: "Hamburg oder direktes Umland" },
  { icon: BuildingIcon, text: "5–50 Einheiten (Wohnungen/Gewerbe)" },
  { icon: ClockIcon, text: "Aktuell unzufrieden mit bestehender HV oder Selbstverwalter" },
  { icon: ChatIcon, text: "Bereit, nach 3 Monaten ehrliches Feedback zu geben" },
];

const faqs = [
  {
    question: "Gibt es versteckte Kosten nach den 3 Monaten?",
    answer: "Nein. Nach den 3 Monaten zahlen Sie den regulären Preis von €24–34/Einheit/Monat — je nach Umfang. Keine Einrichtungsgebühren, keine versteckten Kosten, keine Mindestlaufzeit.",
  },
  {
    question: "Was wenn ich nach den 3 Monaten nicht zufrieden bin?",
    answer: "Dann können Sie jederzeit mit einer Frist von 3 Monaten zum Quartalsende kündigen. Wir möchten langfristige Partnerschaften — aber nur, wenn Sie wirklich überzeugt sind.",
  },
  {
    question: "Wie lange dauert das Onboarding?",
    answer: "In der Regel 2–3 Wochen. Wir übernehmen die komplette Übergabe von Ihrer alten Verwaltung oder richten alles neu ein, falls Sie selbst verwaltet haben.",
  },
  {
    question: "Warum macht ihr das Beta-Programm?",
    answer: "Wir sind ein junges Unternehmen und brauchen echte Erfahrung sowie Referenzen. Dafür bieten wir einen echten Vorteil: 50% Rabatt. Win-win.",
  },
  {
    question: "Was erwartet ihr als Feedback?",
    answer: "Nach 3 Monaten bitten wir um ein kurzes, ehrliches Feedback — entweder schriftlich (2–3 Sätze) oder ein kurzes Video (2–3 Minuten). Das dürfen wir mit Ihrer Erlaubnis auf unserer Website veröffentlichen.",
  },
];

export default function BetaPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-warm-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-navy via-navy to-teal py-20 lg:py-28 overflow-hidden">
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }} />
          </div>
          
          <div className="relative max-w-[1100px] mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-white/20">
              <div className="w-2 h-2 rounded-full bg-amber animate-pulse" />
              <span className="text-white/90 text-sm font-medium">Nur 5 Plätze verfügbar</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 font-serif max-w-4xl mx-auto">
              Beta-Programm —{" "}
              <span className="text-teal">Werden Sie einer der ersten fünf</span>
            </h1>

            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
              Wir suchen 5 Eigentümer in Hamburg, die gemeinsam mit uns wachsen wollen. 
              3 Monate voller Service zum halben Preis — im Austausch für ehrliches Feedback.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/anfrage?beta_program=true"
                className="inline-flex items-center justify-center gap-2 bg-amber text-white px-8 py-4 rounded-xl font-semibold text-base hover:bg-amber/90 transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                Beta-Platz sichern
                <ArrowRightIcon className="w-4 h-4" />
              </a>
              <a
                href="#vorteile"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-base hover:border-white/50 hover:bg-white/10 transition-all"
              >
                Mehr erfahren
              </a>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-6 mt-12 text-white/70 text-sm">
              <span className="flex items-center gap-2">
                <CheckIcon className="w-4 h-4 text-teal" />
                Keine Einrichtungsgebühr
              </span>
              <span className="flex items-center gap-2">
                <CheckIcon className="w-4 h-4 text-teal" />
                Kündbar mit 3 Monaten Frist
              </span>
              <span className="flex items-center gap-2">
                <CheckIcon className="w-4 h-4 text-teal" />
                Hamburg & Umland
              </span>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="vorteile" className="py-20 lg:py-28 bg-white">
          <div className="max-w-[1100px] mx-auto px-6">
            <div className="text-center mb-16">
              <span className="inline-block text-teal font-semibold text-sm uppercase tracking-wide mb-3">Was Sie erhalten</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4 font-serif">
                Alles inklusive — zum halben Preis
              </h2>
              <p className="text-text-light max-w-2xl mx-auto">
                Keine eingeschränkte Beta-Version. Sie erhalten den vollen Service — wir möchten nur lernen und wachsen.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="bg-warm-white rounded-2xl p-8 border border-gray-100 hover:border-teal/30 hover:shadow-lg transition-all group">
                  <div className="w-14 h-14 rounded-xl bg-teal/10 flex items-center justify-center mb-5 group-hover:bg-teal/20 transition-colors">
                    <benefit.icon className="w-7 h-7 text-teal" />
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-2">{benefit.title}</h3>
                  <p className="text-text-light leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What we ask Section */}
        <section className="py-20 lg:py-28 bg-navy">
          <div className="max-w-[1100px] mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <span className="inline-block text-teal font-semibold text-sm uppercase tracking-wide mb-3">Was wir im Gegenzug bitten</span>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 font-serif">
                  Ehrliches Feedback nach 3 Monaten
                </h2>
                <p className="text-white/70 text-lg mb-8 leading-relaxed">
                  Nach den ersten 3 Monaten bitten wir Sie um ein kurzes Feedback — schriftlich oder als kurzes Video. 
                  Damit helfen Sie uns, besser zu werden, und anderen Eigentümern, sich zu entscheiden.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                      <StarIcon className="w-5 h-5 text-amber" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Was hat Ihnen gefallen?</h4>
                      <p className="text-white/60 text-sm">Ihre positiven Erfahrungen helfen uns, unsere Stärken zu verstehen.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                      <SparklesIcon className="w-5 h-5 text-amber" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Was können wir besser machen?</h4>
                      <p className="text-white/60 text-sm">Kritik ist willkommen — wir sind hier, um zu lernen.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                      <CheckIcon className="w-5 h-5 text-amber" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Dürfen wir es veröffentlichen?</h4>
                      <p className="text-white/60 text-sm">Mit Ihrer Erlaubnis nutzen wir Ihr Feedback auf unserer Website.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-teal/20 flex items-center justify-center mx-auto mb-4">
                    <TargetIcon className="w-9 h-9 text-teal" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Ihre Investition</h3>
                  <p className="text-white/60 text-sm">Nur Ihre Zeit und ehrliches Feedback</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-white/70">Zeitaufwand</span>
                    <span className="text-white font-semibold">~10 Minuten</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-white/70">Form</span>
                    <span className="text-white font-semibold">Schriftlich oder Video</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-white/70">Veröffentlichung</span>
                    <span className="text-white font-semibold">Mit Ihrer Zustimmung</span>
                  </div>
                </div>

                <a
                  href="/anfrage?beta_program=true"
                  className="block w-full text-center bg-amber text-white py-4 rounded-xl font-semibold hover:bg-amber/90 transition-all"
                >
                  Beta-Platz sichern →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Eligibility Section */}
        <section className="py-20 lg:py-28 bg-warm-white">
          <div className="max-w-[1100px] mx-auto px-6">
            <div className="text-center mb-16">
              <span className="inline-block text-teal font-semibold text-sm uppercase tracking-wide mb-3">Für wen das Programm gedacht ist</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4 font-serif">
                Sind Sie dabei?
              </h2>
              <p className="text-text-light max-w-2xl mx-auto">
                Wir suchen Eigentümer, die bereit sind, mit uns zusammenzuwachsen.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {eligibility.map((item) => (
                <div key={item.text} className="bg-white rounded-2xl p-6 text-center border border-gray-100 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-teal" />
                  </div>
                  <p className="text-navy font-medium text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>

            {/* Timeline */}
            <div className="mt-16 bg-white rounded-2xl p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-navy mb-8 text-center font-serif">Zeitplan</h3>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200 hidden lg:block" style={{ transform: 'translateY(-50%)' }} />
                
                <div className="grid lg:grid-cols-4 gap-8">
                  <div className="relative text-center lg:text-left">
                    <div className="w-10 h-10 rounded-full bg-teal text-white flex items-center justify-center font-bold mx-auto lg:mx-0 mb-3 relative z-10">1</div>
                    <h4 className="font-semibold text-navy mb-1">Jetzt</h4>
                    <p className="text-text-light text-sm">Platz sichern über das Anfrage-Formular</p>
                  </div>
                  <div className="relative text-center lg:text-left">
                    <div className="w-10 h-10 rounded-full bg-teal text-white flex items-center justify-center font-bold mx-auto lg:mx-0 mb-3 relative z-10">2</div>
                    <h4 className="font-semibold text-navy mb-1">Februar/März 2026</h4>
                    <p className="text-text-light text-sm">Persönliches Gespräch & Onboarding-Planung</p>
                  </div>
                  <div className="relative text-center lg:text-left">
                    <div className="w-10 h-10 rounded-full bg-teal text-white flex items-center justify-center font-bold mx-auto lg:mx-0 mb-3 relative z-10">3</div>
                    <h4 className="font-semibold text-navy mb-1">März–Mai 2026</h4>
                    <p className="text-text-light text-sm">3 Monate Beta-Phase mit vollem Service</p>
                  </div>
                  <div className="relative text-center lg:text-left">
                    <div className="w-10 h-10 rounded-full bg-amber text-white flex items-center justify-center font-bold mx-auto lg:mx-0 mb-3 relative z-10">4</div>
                    <h4 className="font-semibold text-navy mb-1">Juni 2026</h4>
                    <p className="text-text-light text-sm">Feedback & Entscheidung für langfristige Partnerschaft</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-[800px] mx-auto px-6 text-center">
            <span className="inline-block text-teal font-semibold text-sm uppercase tracking-wide mb-3">Warum wir das anbieten</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-6 font-serif">
              Transparenz statt Marketing-Floskeln
            </h2>
            <div className="prose prose-lg mx-auto text-text-light">
              <p className="mb-6">
                Wir sind ein junges Unternehmen — ehrlich gesagt haben wir noch keine Kunden. 
                Aber das ist kein Nachteil, sondern eine Chance: Für Sie und für uns.
              </p>
              <p className="mb-6">
                Wir bieten Ihnen einen echten Vorteil: 3 Monate professionelle Hausverwaltung zum halben Preis. 
                Im Gegenzug lernen wir von Ihnen, wie wir uns noch besser machen können — und hoffen auf ein ehrliches Feedback, 
                das zukünftigen Eigentümern hilft, sich für uns zu entscheiden.
              </p>
              <p>
                Das ist kein Marketing-Gag. Das ist der ehrliche Weg eines Startups, das langfristig erfolgreich sein will — 
                indem wir von Anfang an die richtigen Prozesse und die richtige Kultur aufbauen.
              </p>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/anfrage?beta_program=true"
                className="inline-flex items-center justify-center gap-2 bg-navy text-white px-8 py-4 rounded-xl font-semibold text-base hover:bg-navy/85 transition-all"
              >
                Ich bin dabei →
              </a>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 lg:py-28 bg-warm-white">
          <div className="max-w-[800px] mx-auto px-6">
            <div className="text-center mb-12">
              <span className="inline-block text-teal font-semibold text-sm uppercase tracking-wide mb-3">FAQ</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy font-serif">
                Häufige Fragen
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details key={index} className="group bg-white rounded-xl border border-gray-100 overflow-hidden open:ring-2 open:ring-teal/20">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <span className="font-semibold text-navy pr-4">{faq.question}</span>
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 group-open:bg-teal/10 flex items-center justify-center transition-colors">
                      <svg className="w-4 h-4 text-gray-500 group-open:text-teal transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-text-light leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 lg:py-28 bg-navy">
          <div className="max-w-[800px] mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 bg-amber/20 rounded-full px-4 py-2 mb-6 border border-amber/30">
              <div className="w-2 h-2 rounded-full bg-amber animate-pulse" />
              <span className="text-amber text-sm font-medium">Nur noch 3 Plätze verfügbar</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 font-serif">
              Bereit, einer der ersten fünf zu werden?
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
              Sichern Sie sich Ihren Beta-Platz noch heute. Wir melden uns innerhalb von 24 Stunden bei Ihnen.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/anfrage?beta_program=true"
                className="inline-flex items-center justify-center gap-2 bg-amber text-white px-10 py-5 rounded-xl font-semibold text-lg hover:bg-amber/90 transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                Jetzt Beta-Platz sichern
                <ArrowRightIcon className="w-5 h-5" />
              </a>
            </div>

            <p className="text-white/50 text-sm mt-6">
              Keine Verpflichtung. Keine versteckten Kosten. Keine Kaltakquise.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
