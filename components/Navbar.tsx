import { HouseLogoIcon } from "./Icons";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-warm-white/95 backdrop-blur-sm border-b border-navy/8">
      <div className="max-w-[1100px] mx-auto px-6 py-4 flex justify-between items-center">
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-navy rounded-lg flex items-center justify-center group-hover:bg-teal transition-colors">
            <HouseLogoIcon className="w-[18px] h-[18px] text-white" />
          </div>
          <span className="font-bold text-xl text-navy tracking-tight">
            einfach <span className="text-teal">verwaltet.</span>
          </span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          <a href="#leistungen" className="text-text-light hover:text-navy text-sm font-medium transition-colors">Leistungen</a>
          <a href="#preise" className="text-text-light hover:text-navy text-sm font-medium transition-colors">Preise</a>
          <a href="#so-funktionierts" className="text-text-light hover:text-navy text-sm font-medium transition-colors">So funktioniert&apos;s</a>
          <a href="#nachfolge" className="text-text-light hover:text-navy text-sm font-medium transition-colors">Nachfolge</a>
          <a href="#kontakt" className="text-text-light hover:text-navy text-sm font-medium transition-colors">Kontakt</a>
          <a href="#kontakt" className="bg-teal text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-navy transition-colors">
            Kostenlose Beratung
          </a>
        </div>
      </div>
    </nav>
  );
}
