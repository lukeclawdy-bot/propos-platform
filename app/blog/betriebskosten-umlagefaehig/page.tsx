import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Welche Betriebskosten sind umlagefähig? §2 BetrKV Übersicht 2026",
  description:
    "Vollständige Übersicht aller umlagefähigen Betriebskosten nach §2 BetrKV. Was Vermieter auf Mieter umlegen dürfen — und was nicht.",
  openGraph: {
    title: "Umlagefähige Betriebskosten nach §2 BetrKV — vollständige Übersicht",
    description: "Alle 17 Betriebskostenpositionen erklärt: Was ist umlagefähig, was nicht, und worauf Vermieter bei der Abrechnung achten müssen.",
    url: "https://einfach-verwaltet.de/blog/betriebskosten-umlagefaehig",
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
              <span className="text-teal text-xs font-semibold uppercase tracking-wide">Nebenkostenabrechnung</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-4 font-serif leading-tight">
              Welche Betriebskosten sind umlagefähig? §2 BetrKV — vollständige Übersicht 2026
            </h1>
            <p className="text-text-light text-lg leading-relaxed">
              Nicht jede Ausgabe kann auf Mieter umgelegt werden. Die Betriebskostenverordnung (BetrKV) legt abschließend fest, was zur Nebenkostenabrechnung gehört. Hier ist die vollständige Übersicht.
            </p>
            <div className="flex items-center gap-4 mt-6 text-sm text-text-light">
              <span>27. Februar 2026</span>
              <span>·</span>
              <span>9 Min. Lesezeit</span>
            </div>
          </header>

          <div className="prose prose-lg max-w-none text-navy/85 leading-relaxed space-y-6">
            <h2 className="text-2xl font-bold text-navy font-serif mt-10">Was sind Betriebskosten?</h2>
            <p>
              Betriebskosten sind laufende Kosten, die dem Eigentümer durch das Eigentum oder durch den bestimmungsgemäßen 
              Gebrauch des Gebäudes entstehen (§ 1 Abs. 1 BetrKV). Entscheidend: Es müssen <em>laufende</em> Kosten sein — 
              einmalige Investitionen, Reparaturen und Instandhaltungsmaßnahmen sind grundsätzlich <strong>nicht</strong> umlagefähig.
            </p>

            <h2 className="text-2xl font-bold text-navy font-serif mt-10">Die 17 umlagefähigen Betriebskostenarten (§2 BetrKV)</h2>

            <div className="space-y-4 not-prose">
              {[
                { nr: "1", title: "Grundsteuer", desc: "Die vom Eigentümer zu zahlende Grundsteuer ist vollständig umlagefähig." },
                { nr: "2", title: "Wasserversorgung", desc: "Kosten des Wasserverbrauchs, Grundgebühren, Zählermiete, Wassersoftanlage, Warmwasserbereitung (sofern nicht separat abgerechnet)." },
                { nr: "3", title: "Entwässerung", desc: "Abwassergebühren (Schmutz- und Niederschlagswasser), Kosten für Entwässerungsanlagen." },
                { nr: "4", title: "Heizung", desc: "Brennstoffkosten, Bedienung, Überwachung, Pflege der Anlage. Heizkosten müssen nach der Heizkostenverordnung verbrauchsabhängig abgerechnet werden (mindestens 50–70 % verbrauchsabhängig)." },
                { nr: "5", title: "Warmwasser", desc: "Sofern zentral bereitgestellt, sind Brennstoffkosten und Betriebskosten der Anlage umlagefähig. Oft mit Position 4 kombiniert." },
                { nr: "6", title: "Aufzug", desc: "Kosten für Betrieb, Überwachung, Pflege des Aufzugs sowie regelmäßige TÜV-Prüfungen." },
                { nr: "7", title: "Straßenreinigung und Müllbeseitigung", desc: "Gebühren der Gemeinde für Straßenreinigung sowie Müllabfuhr (Grundgebühr + Leerungsgebühr)." },
                { nr: "8", title: "Gebäudereinigung und Ungezieferbekämpfung", desc: "Kosten der Reinigung gemeinschaftlich genutzter Gebäudeteile, regelmäßige Ungezieferbekämpfung." },
                { nr: "9", title: "Gartenpflege", desc: "Pflege der Grünanlagen, Baumschnitt, Rasenmähen. Einmalige Neuanlage ist nicht umlagefähig." },
                { nr: "10", title: "Beleuchtung", desc: "Strom für Beleuchtung gemeinschaftlicher Flächen (Treppenhaus, Keller, Außenanlagen)." },
                { nr: "11", title: "Schornsteinreinigung", desc: "Kosten des Schornsteinfegers für Kehrarbeiten und Emissionsmessungen." },
                { nr: "12", title: "Sach- und Haftpflichtversicherung", desc: "Gebäudeversicherung (Feuer, Sturm, Wasser), Haftpflichtversicherung für das Gebäude. Nicht umlagefähig: Rechtsschutz, Mietausfallversicherung." },
                { nr: "13", title: "Hauswart", desc: "Lohn- und Gehaltskosten des Hauswarts, jedoch nur für Tätigkeiten, die umlagefähigen Betriebskosten entsprechen (nicht: Instandhaltung, Verwaltung)." },
                { nr: "14", title: "Gemeinschaftsantenne / Kabelanschluss", desc: "Seit Juli 2024 darf das Nebenkostenprivileg für Kabelfernsehen nicht mehr auf Mieter umgelegt werden (§ 2 Nr. 14 BetrKV n.F.)." },
                { nr: "15", title: "Breitbandanschluss", desc: "Kosten für einen Glasfaser- oder Breitbandanschluss können umgelegt werden, sofern vertraglich vereinbart." },
                { nr: "16", title: "Einrichtungen für die Wäschepflege", desc: "Betriebskosten von Waschmaschinen und Trocknern in Gemeinschaftswaschküchen." },
                { nr: "17", title: "Sonstige Betriebskosten", desc: "Dachrinnenreinigung, Wartung von Rauchmeldern, Zählerablesung — sofern laufend anfallend und vertraglich vereinbart." },
              ].map(item => (
                <div key={item.nr} className="flex gap-4 p-4 bg-warm-white rounded-xl border border-gray-100">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal/10 flex items-center justify-center text-teal font-bold text-sm">{item.nr}</div>
                  <div>
                    <p className="font-semibold text-navy text-sm">{item.title}</p>
                    <p className="text-text-light text-sm mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-navy font-serif mt-10">Was ist NICHT umlagefähig?</h2>
            <p>Folgende Kosten dürfen <strong>nicht</strong> auf Mieter umgelegt werden:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Instandhaltungs- und Reparaturkosten (z.B. Heizungsreparatur, Dachsanierung)</li>
              <li>Verwaltungskosten (Kosten der Hausverwaltung selbst)</li>
              <li>Leerstandskosten</li>
              <li>Kosten für den Erwerb des Grundstücks oder Gebäudes</li>
              <li>Mietausfallversicherung, Rechtsschutzversicherung</li>
              <li>Einmalige Erschließungskosten</li>
            </ul>

            <h2 className="text-2xl font-bold text-navy font-serif mt-10">Formelle Anforderungen an die Abrechnung</h2>
            <p>
              Die Nebenkostenabrechnung muss dem Mieter spätestens 12 Monate nach Ende des Abrechnungszeitraums 
              zugehen (§ 556 Abs. 3 BGB). Nach Ablauf dieser Frist kann der Vermieter keine Nachzahlung mehr 
              fordern — auch wenn die Abrechnung inhaltlich korrekt wäre.
            </p>

            <h2 className="text-2xl font-bold text-navy font-serif mt-10">Fazit</h2>
            <p>
              Die Nebenkostenabrechnung ist fehleranfällig — und Fehler können teuer werden. Eine korrekte 
              Abrechnung auf Basis der §2 BetrKV schützt Vermieter vor Rückforderungen und Streit. 
              Professionelle Verwaltungssoftware und erfahrene Hausverwaltungen arbeiten nach diesem Standard.
            </p>
          </div>

          <div className="mt-12 p-6 bg-teal/8 rounded-2xl border border-teal/15">
            <p className="text-navy font-semibold mb-2">Nebenkostenabrechnung ohne Fehler</p>
            <p className="text-text-light text-sm mb-4">
              Unsere Nebenkostenabrechnung erstellt die BKA automatisch nach §2 BetrKV — transparent, pünktlich, fehlerfrei.
            </p>
            <a href="/bka-rechner" className="inline-block bg-teal text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-teal/85 transition-all">
              BKA-Rechner ausprobieren →
            </a>
          </div>
        </article>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Welche Betriebskosten sind umlagefähig? §2 BetrKV — vollständige Übersicht 2026",
        "description": "Alle 17 Betriebskostenpositionen der BetrKV erklärt: Was Vermieter auf Mieter umlegen dürfen und was nicht.",
        "author": { "@type": "Organization", "name": "einfach verwaltet." },
        "publisher": { "@type": "Organization", "name": "einfach verwaltet.", "url": "https://einfach-verwaltet.de" },
        "datePublished": "2026-02-27",
        "url": "https://einfach-verwaltet.de/blog/betriebskosten-umlagefaehig"
      })}} />
      <Footer />
    </>
  );
}
