import Image from "next/image";
import { CheckIcon, ArrowRightIcon } from "./Icons";

const heroChecks = [
  "Reaktionszeit unter 5 Minuten — garantiert",
  "Preise ab €24/Einheit/Monat — offen auf dieser Seite",
  "Hamburger Unternehmen, kein anonymes Callcenter",
];

const painPoints = [
  { label: "Telefonisch nie erreichbar", pct: 78 },
  { label: "Keine Transparenz bei Kosten", pct: 71 },
  { label: "Abrechnung kam zu spät", pct: 63 },
  { label: "Handwerker-Probleme ungeklärt", pct: 55 },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/hero-bg.jpg"
          alt="Modernes Apartment in Hamburg HafenCity"
          fill
          className="object-cover object-center"
          priority
          quality={85}
        />
        {/* Overlay: white gradient from left (where text sits) fading to semi-transparent right */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/30" />
        {/* Bottom fade for clean section transition */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/60 to-transparent" />
      </div>

      <div className="relative max-w-[1100px] mx-auto px-6 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 bg-navy/8 rounded-full px-4 py-1.5 mb-8">
              <div className="w-2 h-2 rounded-full bg-teal" />
              <span className="text-navy text-sm font-medium">Hausverwaltung Hamburg</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-navy leading-tight mb-6 font-serif">
              Ihre Immobilie.{" "}
              <span className="text-teal">Einfach verwaltet.</span>
            </h1>

            <p className="text-lg sm:text-xl text-text-light leading-relaxed mb-10 max-w-xl">
              Professionelle Hausverwaltung in Hamburg — mit echten Reaktionszeiten,
              transparenten Preisen und einer Verwaltung, die hält, was sie verspricht.
            </p>

            <div className="space-y-3 mb-10">
              {heroChecks.map((text) => (
                <div key={text} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green/15 flex items-center justify-center mt-0.5">
                    <CheckIcon className="w-3 h-3 text-green" />
                  </div>
                  <span className="text-navy font-medium">{text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/anfrage"
                className="inline-flex items-center justify-center gap-2 bg-navy text-white px-8 py-4 rounded-xl font-semibold text-base hover:bg-navy/85 transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                Angebot in 2 Minuten
                <ArrowRightIcon className="w-4 h-4" />
              </a>
              <a
                href="#preise"
                className="inline-flex items-center justify-center gap-2 border-2 border-navy/20 text-navy px-8 py-4 rounded-xl font-semibold text-base hover:border-navy/40 hover:bg-navy/5 transition-all"
              >
                Preise ansehen
              </a>
            </div>
          </div>

          {/* Right — Pain point card */}
          <div className="relative hidden lg:block">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-6">
              <div className="text-sm font-semibold text-text-light uppercase tracking-wide">
                Warum Eigentümer ihre Verwaltung wechseln
              </div>
              {painPoints.map((p) => (
                <div key={p.label}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm text-navy font-medium">{p.label}</span>
                    <span className="text-sm font-bold text-amber">{p.pct}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-teal to-navy rounded-full"
                      style={{ width: `${p.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Price badge — floating top-right, offset outside card */}
            <div className="absolute -top-8 -right-5 bg-amber text-white rounded-xl px-4 py-2 shadow-lg z-10">
              <div className="text-xs font-medium">Ab sofort in Hamburg</div>
              <div className="text-lg font-bold">ab €24/Einheit</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
