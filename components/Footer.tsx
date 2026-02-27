import { HouseLogoIcon } from "./Icons";

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-[1100px] mx-auto px-6 py-16">
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          <div className="md:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-teal rounded-lg flex items-center justify-center">
                <HouseLogoIcon className="w-[18px] h-[18px] text-white" />
              </div>
              <span className="font-bold text-xl">einfach verwaltet.</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              Professionelle Hausverwaltung in Hamburg. Transparent, zuverlässig, immer erreichbar.
            </p>
            <div className="mt-4 text-sm font-semibold text-teal italic">
              „Ihre Immobilie? Einfach verwaltet."
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white text-sm mb-4 uppercase tracking-wide">Leistungen</h4>
            <ul className="space-y-2.5">
              {["Mietverwaltung", "WEG-Verwaltung", "Nebenkostenabrechnung", "Handwerker-Service", "Preise"].map((item) => (
                <li key={item}>
                  <a href="#leistungen" className="text-white/60 text-sm hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white text-sm mb-4 uppercase tracking-wide">Ratgeber</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Hausverwaltung wechseln", href: "/blog/hausverwaltung-wechseln-hamburg" },
                { label: "Nebenkostenabrechnung", href: "/blog/nebenkostenabrechnung-fehler" },
                { label: "Mieterhöhung Hamburg", href: "/blog/mieterhohung-hamburg-2026" },
                { label: "Kosten Hausverwaltung", href: "/blog/hausverwaltung-hamburg-kosten" },
                { label: "Alle Artikel", href: "/blog" },
                { label: "BKA-Rechner", href: "/bka-rechner" },
                { label: "Mieterhöhung Rechner", href: "/mieterhohung-rechner" },
                { label: "Beschlussprotokoll Generator", href: "/beschlussprotokoll" },
                { label: "Kostenvergleich HV", href: "/kostenvergleich" },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-white/60 text-sm hover:text-white transition-colors">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white text-sm mb-4 uppercase tracking-wide">Standorte</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Hamburg", href: "/hausverwaltung-hamburg" },
                { label: "Berlin", href: "/hausverwaltung-berlin" },
                { label: "München", href: "/hausverwaltung-muenchen" },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-white/60 text-sm hover:text-white transition-colors">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white text-sm mb-4 uppercase tracking-wide">Portal</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Portal starten", href: "/portal/onboarding" },
                { label: "Portal Login", href: "/portal/login" },
                { label: "Demo ansehen", href: "/demo" },
                { label: "Beta-Programm", href: "/beta" },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-white/60 text-sm hover:text-white transition-colors">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white text-sm mb-4 uppercase tracking-wide">Rechtliches</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Impressum", href: "/impressum" },
                { label: "Datenschutz", href: "/datenschutz" },
                { label: "AGB", href: "/agb" },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-white/60 text-sm hover:text-white transition-colors">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
            <div className="text-white/50 text-sm">
              © {new Date().getFullYear()} RVLT Ventures GmbH. Alle Rechte vorbehalten.
            </div>
            <div className="flex items-center gap-2 text-white/50 text-xs">
              <span>Made in Hamburg 🏴‍☠️</span>
            </div>
          </div>
          <div className="text-white/35 text-xs text-center sm:text-left leading-relaxed">
            RVLT Ventures GmbH · Singapurstr. 19, 20457 Hamburg · AG Hamburg HRB 193395 · GF: Lukas Schmitz
          </div>
        </div>
      </div>
    </footer>
  );
}
