import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Kündigungsfristen Hausverwaltungsvertrag — §621 BGB erklärt (2026)",
  description:
    "Wie kündigt man den Hausverwaltungsvertrag? Fristen nach §621 BGB, Sonderkündigungsrechte und was beim Verwalterwechsel zu beachten ist.",
  openGraph: {
    title: "Hausverwaltungsvertrag kündigen — Fristen und §621 BGB",
    description: "Kündigungsfristen für Hausverwaltungsverträge: ordentliche Kündigung, außerordentliche Kündigung und Übergabeprozess.",
    url: "https://einfach-verwaltet.de/blog/hausverwaltung-kuendigungsfristen",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "article",
  },
};

export default function BlogPost() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20">
        <article className="max-w-[780px] mx-auto px-6">
          <header className="mb-10">
            <div className="inline-flex items-center gap-2 bg-teal/10 rounded-full px-3 py-1 mb-4">
              <span className="text-teal text-xs font-semibold uppercase tracking-wide">Hausverwalterwechsel</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-4 font-serif leading-tight">
              Hausverwaltungsvertrag kündigen — Fristen, §621 BGB und der Verwalterwechsel
            </h1>
            <p className="text-text-light text-lg leading-relaxed">
              Viele Eigentümer wissen nicht, wie einfach ein Verwalterwechsel rechtlich ist. Die Kündigungsfristen sind gesetzlich geregelt — und oft kürzer als befürchtet.
            </p>
            <div className="flex items-center gap-4 mt-6 text-sm text-text-light">
              <span>27. Februar 2026</span>
              <span>·</span>
              <span>7 Min. Lesezeit</span>
            </div>
          </header>

          <div className="prose prose-lg max-w-none text-navy/85 leading-relaxed space-y-6">
            <h2 className="text-2xl font-bold text-navy font-serif mt-10">Rechtliche Einordnung des Hausverwaltungsvertrags</h2>
            <p>
              Der Hausverwaltungsvertrag (auch: Verwaltervertrag) ist in der Regel ein Geschäftsbesorgungsvertrag 
              mit Dienstleistungscharakter (§§ 675, 611 ff. BGB). Bei WEG-Verwaltern gelten zusätzlich die 
              Sonderregeln des Wohnungseigentumsgesetzes (§ 26 WEG).
            </p>

            <h2 className="text-2xl font-bold text-navy font-serif mt-10">Ordentliche Kündigung nach §621 BGB</h2>
            <p>
              Für Hausverwaltungsverträge ohne feste Laufzeit gilt §621 BGB. Danach kann der Vertrag 
              mit folgenden Fristen ordentlich gekündigt werden:
            </p>
            <div className="not-prose space-y-3">
              {[
                { vergütung: "Tägliche Vergütung", frist: "Zum Ablauf des folgenden Tages" },
                { vergütung: "Wöchentliche Vergütung", frist: "Zum Ende der laufenden Woche" },
                { vergütung: "Monatliche Vergütung (Regelfall)", frist: "Zum 15. oder Ende des Monats — mit 15 Tagen Vorlauf" },
                { vergütung: "Vierteljährliche Vergütung", frist: "Spätestens am 1. Quartalstag für Ende des Quartals" },
                { vergütung: "Längere Vergütungsperioden", frist: "Mit 6-wöchiger Frist zum Ende des Kalenderhalbjahres" },
              ].map(row => (
                <div key={row.vergütung} className="flex gap-4 p-4 bg-warm-white rounded-xl border border-gray-100">
                  <div className="flex-1">
                    <p className="text-navy font-semibold text-sm">{row.vergütung}</p>
                    <p className="text-text-light text-sm">{row.frist}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4">
              In der Praxis sind monatliche Verwaltungsgebühren üblich — damit gilt die Kündigung zum 15. 
              oder Monatsende mit mindestens 15 Tagen Vorlauf. Viele Verträge vereinbaren längere Fristen 
              oder Mindestlaufzeiten (z.B. 12 Monate). Diese sind grundsätzlich zulässig.
            </p>

            <h2 className="text-2xl font-bold text-navy font-serif mt-10">Außerordentliche Kündigung aus wichtigem Grund</h2>
            <p>
              Bei Vorliegen eines wichtigen Grundes kann der Vertrag jederzeit fristlos gekündigt werden 
              (§ 626 BGB). Als wichtige Gründe anerkannt sind:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Schwerwiegende Pflichtverletzungen (z.B. nicht abgeführte Mieten, fehlerhafte Abrechnungen)</li>
              <li>Nachhaltige Vertrauenszerstörung durch wiederholte Schlechtleistung</li>
              <li>Untreue oder Unterschlagung von Mietergeldern</li>
              <li>Verlust der §34c GewO Lizenz durch die Verwaltung</li>
            </ul>
            <p>
              Wichtig: Die außerordentliche Kündigung muss unverzüglich erfolgen — spätestens 2 Wochen nach 
              Kenntnis des Kündigungsgrundes (§ 626 Abs. 2 BGB). Wer zu lange wartet, verwirkt sein Recht.
            </p>

            <h2 className="text-2xl font-bold text-navy font-serif mt-10">WEG: Abberufung des Verwalters</h2>
            <p>
              Bei WEG-Verwaltungen ist die Situation etwas anders: Der Verwalter kann durch Beschluss der 
              Eigentümerversammlung jederzeit abberufen werden (§ 26 Abs. 3 WEG, seit WEG-Reform 2020). 
              Die gleichzeitige Kündigung des Verwaltervertrags erfolgt dann nach den vereinbarten Fristen — 
              bei Abberufung aus wichtigem Grund mit sofortiger Wirkung.
            </p>

            <h2 className="text-2xl font-bold text-navy font-serif mt-10">Was nach der Kündigung passiert</h2>
            <p>
              Der alte Verwalter ist zur vollständigen Übergabe verpflichtet (§ 667 BGB): 
              Unterlagen, Schlüssel, Konten, Kautionen. Die Übergabe sollte schriftlich protokolliert werden. 
              Ein professioneller Neuverwalter begleitet diesen Prozess und prüft die Vollständigkeit der 
              Unterlagen systematisch.
            </p>

            <h2 className="text-2xl font-bold text-navy font-serif mt-10">Fazit: Wechsel oft einfacher als gedacht</h2>
            <p>
              Viele Eigentümer scheuen den Verwalterwechsel aus Angst vor Aufwand oder Unsicherheit. 
              In der Praxis ist der Prozess gut strukturierbar — besonders wenn der neue Verwalter die 
              Übergabe aktiv koordiniert. Entscheidend ist: Kündigung rechtzeitig und schriftlich einreichen, 
              Fristen einhalten, Übergabe vollständig dokumentieren.
            </p>
          </div>

          <div className="mt-12 p-6 bg-teal/8 rounded-2xl border border-teal/15">
            <p className="text-navy font-semibold mb-2">Verwalterwechsel ohne Stress</p>
            <p className="text-text-light text-sm mb-4">
              Wir übernehmen die komplette Übergabe von Ihrer alten Verwaltung — inklusive Unterlagen, Konten und Mieterinformation.
            </p>
            <a href="/wechseln" className="inline-block bg-teal text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-teal/85 transition-all">
              Wie der Wechsel funktioniert →
            </a>
          </div>
        </article>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Hausverwaltungsvertrag kündigen — Fristen, §621 BGB und der Verwalterwechsel",
        "description": "Kündigungsfristen für Hausverwaltungsverträge nach §621 BGB, außerordentliche Kündigung und WEG-Abberufung.",
        "author": { "@type": "Organization", "name": "einfach verwaltet." },
        "publisher": { "@type": "Organization", "name": "einfach verwaltet.", "url": "https://einfach-verwaltet.de" },
        "datePublished": "2026-02-27",
        "url": "https://einfach-verwaltet.de/blog/hausverwaltung-kuendigungsfristen"
      })}} />
      <Footer />
    </>
  );
}
