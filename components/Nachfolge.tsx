import Image from "next/image";
import { CheckIcon, ArrowRightIcon, UsersIcon } from "./Icons";

const benefits = [
  "Ihre Kunden werden weiter professionell betreut — ohne Qualitätsverlust",
  "Nahtlose Übernahme aller Verträge, Dokumente und Beziehungen",
  "Diskrete Abwicklung — Ihre Kunden erfahren es erst, wenn alles steht",
  "Faire Bewertung Ihres Unternehmens — basierend auf Bestandsgröße und Vertragslaufzeiten",
  "Option: Sie bleiben als Berater an Bord, so lange Sie möchten",
];

export function Nachfolge() {
  return (
    <section id="nachfolge" className="py-20 lg:py-32 bg-warm-white">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Image + floating card */}
          <div className="relative hidden lg:block">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/hero-hamburg.png"
                alt="Hamburg HafenCity — Hausverwaltung Nachfolge"
                width={1408}
                height={768}
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-5 shadow-lg border border-gray-100 max-w-[240px]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-amber/10 flex items-center justify-center">
                  <UsersIcon className="w-5 h-5 text-amber" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-navy">33.000+</div>
                  <div className="text-xs text-text-light">Hausverwaltungen in DE</div>
                </div>
              </div>
              <p className="text-xs text-text-light leading-relaxed">
                Über 40% der Inhaber gehen in den nächsten 10 Jahren in den Ruhestand.
                <span className="text-text-light/60"> [VDIV, Schätzung]</span>
              </p>
            </div>
          </div>

          {/* Right — Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-amber/10 rounded-full px-4 py-1.5 mb-6">
              <span className="text-amber text-sm font-semibold">Für Hausverwaltungen</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4 font-serif">
              Sie gehen in den Ruhestand. <br />
              <span className="text-teal">Ihr Lebenswerk lebt weiter.</span>
            </h2>
            <p className="text-text-light text-lg leading-relaxed mb-8">
              Sie haben Ihre Hausverwaltung über Jahre aufgebaut. Ihre Kunden vertrauen Ihnen.
              Jetzt suchen Sie einen Nachfolger, der dieses Vertrauen verdient — und Ihre
              Standards hält. Genau das ist unser Versprechen.
            </p>

            <div className="space-y-3 mb-10">
              {benefits.map((text) => (
                <div key={text} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-teal/15 flex items-center justify-center mt-0.5">
                    <CheckIcon className="w-3 h-3 text-teal" />
                  </div>
                  <span className="text-navy text-sm font-medium">{text}</span>
                </div>
              ))}
            </div>

            <div className="bg-navy/5 rounded-xl p-5 mb-8 border border-navy/10">
              <p className="text-sm text-navy leading-relaxed">
                <strong>Vertraulich und unverbindlich.</strong> Wir bewerten Ihren Bestand kostenlos
                und erstellen ein faires Angebot. Kein Druck, keine Verpflichtung. Alles in Ihrem Tempo.
              </p>
            </div>

            <a
              href="mailto:nachfolge@einfach-verwaltet.de?subject=Nachfolge-Anfrage&body=Guten%20Tag%2C%0A%0Aich%20interessiere%20mich%20f%C3%BCr%20eine%20%C3%9Cbernahme%20meiner%20Hausverwaltung.%0A%0AAnzahl%20Einheiten%3A%0AStandort%3A%0A%0AMit%20freundlichen%20Gr%C3%BC%C3%9Fen"
              className="inline-flex items-center justify-center gap-2 bg-navy text-white px-8 py-4 rounded-xl font-semibold text-base hover:bg-navy/85 transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              Vertrauliches Gespräch vereinbaren
              <ArrowRightIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
