import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Betriebskosten-Checkliste für Vermieter 2025/2026 — §2 BetrKV erklärt | einfach verwaltet.",
  description:
    "Alle 17 umlagefähigen Betriebskostenpositionen nach §2 BetrKV erklärt. Checkliste für Vermieter, FAQ und Tipps zur rechtssicheren Nebenkostenabrechnung 2025/2026.",
  keywords:
    "Betriebskosten Checkliste, §2 BetrKV, umlagefähige Betriebskosten, Nebenkostenabrechnung Vermieter, BetrKV Positionen",
  openGraph: {
    title: "Betriebskosten-Checkliste für Vermieter 2025/2026 — §2 BetrKV erklärt",
    description:
      "Alle 17 Betriebskostenpositionen nach §2 BetrKV — vollständige Checkliste für rechtssichere Nebenkostenabrechnungen.",
    url: "https://einfach-verwaltet.de/blog/betriebskosten-checkliste-vermieter",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "article",
  },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Betriebskostenabrechnung erstellen nach §2 BetrKV",
  description:
    "Schritt-für-Schritt: So erstellen Vermieter eine rechtssichere Betriebskostenabrechnung nach der Betriebskostenverordnung.",
  step: [
    {
      "@type": "HowToStep",
      name: "Umlagebare Positionen identifizieren",
      text: "Prüfen Sie, welche Kosten nach §2 BetrKV umlagefähig sind und ob sie im Mietvertrag vereinbart wurden.",
    },
    {
      "@type": "HowToStep",
      name: "Belege sammeln",
      text: "Sammeln Sie alle Rechnungen und Belege für das Abrechnungsjahr — Energieversorger, Müllabfuhr, Versicherungen etc.",
    },
    {
      "@type": "HowToStep",
      name: "Umlageschlüssel anwenden",
      text: "Wenden Sie den im Mietvertrag vereinbarten Umlageschlüssel an (meist Wohnfläche, alternativ Personenzahl oder Verbrauch).",
    },
    {
      "@type": "HowToStep",
      name: "Frist einhalten",
      text: "Die Abrechnung muss dem Mieter spätestens 12 Monate nach Ende des Abrechnungszeitraums zugehen (§556 Abs. 3 BGB).",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Welche Betriebskosten darf der Vermieter umlegen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nur die in §2 BetrKV abschließend aufgelisteten 17 Kostenkategorien sind umlagefähig — und auch nur dann, wenn sie im Mietvertrag ausdrücklich vereinbart wurden. Verwaltungskosten, Instandhaltungskosten und Reparaturen gehören nicht dazu.",
      },
    },
    {
      "@type": "Question",
      name: "Was passiert, wenn die Betriebskostenabrechnung zu spät kommt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Kommt die Abrechnung nach der 12-Monats-Frist des §556 Abs. 3 BGB, verliert der Vermieter den Anspruch auf Nachzahlungen. Der Mieter kann Guthaben dennoch einfordern. Die Frist gilt als Ausschlussfrist — sie kann weder verlängert noch nachgeholt werden.",
      },
    },
    {
      "@type": "Question",
      name: "Muss jede Betriebskostenposition im Mietvertrag stehen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Nur Kosten, die im Mietvertrag ausdrücklich als umlagefähig vereinbart wurden, dürfen auf den Mieter umgelegt werden. Die bloße Formulierung 'der Mieter trägt die Betriebskosten' reicht aus, wenn sie auf die BetrKV verweist.",
      },
    },
  ],
};

const betrkvPositions = [
  { nr: "§2 Nr. 1", name: "Grundsteuer", desc: "Die auf das Grundstück entfallende Grundsteuer." },
  { nr: "§2 Nr. 2", name: "Wasserversorgung", desc: "Kosten für Wasserlieferung, Abgaben, Eichung und Betrieb der Anlage." },
  { nr: "§2 Nr. 3", name: "Entwässerung / Abwasser", desc: "Gebühren für Entwässerung, Hauskläranlage oder Abfuhr." },
  { nr: "§2 Nr. 4", name: "Heizungsanlage", desc: "Betrieb, Wartung und Eichung der zentralen Heizungsanlage." },
  { nr: "§2 Nr. 5", name: "Warmwasserversorgung", desc: "Kosten der zentralen Warmwasserversorgungsanlage." },
  { nr: "§2 Nr. 6", name: "Verbundene Heizung und Warmwasser", desc: "Bei kombinierten Anlagen: Kosten für Heizung und Warmwasser." },
  { nr: "§2 Nr. 7", name: "Aufzug", desc: "Betrieb, Wartung, Prüfung und Reinigung des Aufzugs." },
  { nr: "§2 Nr. 8", name: "Straßenreinigung und Müllbeseitigung", desc: "Gemeindliche Straßenreinigungsgebühren und Müllabfuhr." },
  { nr: "§2 Nr. 9", name: "Gebäudereinigung und Ungezieferbekämpfung", desc: "Reinigung gemeinschaftlich genutzter Flächen, Ungezieferbekämpfung." },
  { nr: "§2 Nr. 10", name: "Gartenpflege", desc: "Pflege gärtnerisch angelegter Flächen, Pflanzenkauf, Erneuerung." },
  { nr: "§2 Nr. 11", name: "Beleuchtung", desc: "Strom für gemeinschaftliche Beleuchtung (Treppenhäuser, Außenanlage)." },
  { nr: "§2 Nr. 12", name: "Schornsteinreinigung", desc: "Kehr- und Messgebühren des Schornsteinfegers." },
  { nr: "§2 Nr. 13", name: "Versicherungen", desc: "Sach- und Haftpflichtversicherung des Gebäudes, ggf. Glasversicherung." },
  { nr: "§2 Nr. 14", name: "Hauswart", desc: "Vergütung des Hauswarts, soweit nicht für Verwaltung oder Instandhaltung." },
  { nr: "§2 Nr. 15", name: "Gemeinschaftsantenne / Kabelanschluss", desc: "Betrieb einer gemeinschaftlichen Antennenanlage oder Kabelanschluss." },
  { nr: "§2 Nr. 16", name: "Einrichtungen für die Wäschepflege", desc: "Betrieb von Waschmaschinen oder Trocknern in Gemeinschaftsräumen." },
  { nr: "§2 Nr. 17", name: "Sonstige Betriebskosten", desc: "Weitere regelmäßig anfallende Kosten, die im Mietvertrag zu benennen sind." },
];

export default function BetriebskostenCheckliste() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <main className="bg-warm-white min-h-screen pt-16">
        <div className="bg-navy py-16 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="inline-block bg-teal/20 text-teal text-xs font-semibold px-3 py-1 rounded-full mb-4">
              Ratgeber · Betriebskosten
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Betriebskosten-Checkliste für Vermieter 2025/2026 — §2 BetrKV erklärt
            </h1>
            <p className="text-white/70 text-lg">
              Alle 17 umlagefähigen Betriebskostenpositionen, häufige Fehler und wie Sie rechtssicher abrechnen.
            </p>
            <div className="flex items-center gap-4 mt-6 text-white/50 text-sm">
              <span>Februar 2026</span>
              <span>·</span>
              <span>10 min Lesezeit</span>
            </div>
          </div>
        </div>

        <article className="max-w-3xl mx-auto px-4 py-12">
          <nav className="text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-teal">Startseite</Link>
            <span className="mx-2">›</span>
            <Link href="/blog" className="hover:text-teal">Ratgeber</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-700">Betriebskosten-Checkliste</span>
          </nav>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">

            <h2 className="text-2xl font-bold text-navy mt-2 mb-4">
              Was sind Betriebskosten — und was nicht?
            </h2>
            <p>
              Die <strong>Betriebskostenverordnung (BetrKV)</strong> definiert abschließend, welche Kosten als Betriebskosten auf Mieter umgelegt werden dürfen. Das Prinzip ist einfach: Nur <em>laufende</em> Kosten des Gebäudebetriebs sind umlagefähig — keine Instandhaltungskosten, keine Verwaltungskosten, keine einmaligen Ausgaben.
            </p>
            <p>
              Ein häufiger Fehler: Vermieter legen Kosten um, die nicht in §2 BetrKV stehen — z.B. Kontoführungsgebühren oder Reparaturkosten. Das kann zur Unwirksamkeit der gesamten Abrechnung führen.
            </p>
            <div className="not-prose bg-amber/10 border border-amber/30 rounded-xl p-4 my-4 text-sm">
              <strong className="text-navy">Merksatz:</strong> Betriebskosten = laufend + in §2 BetrKV genannt + im Mietvertrag vereinbart. Fehlt eine dieser drei Voraussetzungen, ist die Umlage unwirksam.
            </div>

            <h2 className="text-2xl font-bold text-navy mt-10 mb-4">
              Alle 17 Betriebskostenpositionen nach §2 BetrKV
            </h2>
            <p>Die vollständige Liste der umlagefähigen Betriebskosten:</p>
            <div className="not-prose space-y-2 my-4">
              {betrkvPositions.map((pos) => (
                <div key={pos.nr} className="flex items-start gap-4 bg-white border border-navy/10 rounded-xl p-4">
                  <div className="text-xs font-bold text-teal bg-teal/10 px-2 py-1 rounded-lg flex-shrink-0 whitespace-nowrap">
                    {pos.nr}
                  </div>
                  <div>
                    <p className="font-semibold text-navy text-sm">{pos.name}</p>
                    <p className="text-text-light text-sm">{pos.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-navy mt-10 mb-4">
              Fristen: Was Vermieter unbedingt beachten müssen
            </h2>
            <p>
              Die wichtigste Frist der Betriebskostenabrechnung steht in <strong>§556 Abs. 3 BGB</strong>: Die Abrechnung muss dem Mieter spätestens <strong>12 Monate nach Ende des Abrechnungszeitraums</strong> zugegangen sein.
            </p>
            <div className="not-prose bg-light-gray rounded-xl p-5 my-4 text-sm space-y-3">
              <div><strong className="text-navy">Abrechnungszeitraum 01.01.–31.12.2025:</strong> Abrechnung muss bis spätestens <strong>31.12.2026</strong> beim Mieter sein.</div>
              <div><strong className="text-navy">Folge bei Fristversäumnis:</strong> Nachzahlungsansprüche des Vermieters erlöschen — unwiederbringlich. Guthaben kann der Mieter weiterhin fordern.</div>
              <div><strong className="text-navy">Ausnahme:</strong> Zu späte Abrechnung trotz Verzögerung durch Dritte (z.B. Versorger) kann Vermieter entlasten — muss aber nachgewiesen werden.</div>
            </div>

            <h2 className="text-2xl font-bold text-navy mt-10 mb-4">
              5 häufige Fehler bei der Betriebskostenabrechnung
            </h2>
            <div className="not-prose space-y-3 my-4">
              {[
                { title: "Falsche oder fehlende Umlageschlüssel", desc: "Der Umlageschlüssel muss im Mietvertrag vereinbart sein. Fehlt er, gilt Wohnfläche (§556a Abs. 1 BGB)." },
                { title: "Nicht umlagefähige Positionen", desc: "Verwaltungskosten, Instandhaltung oder Reparaturen dürfen nicht als Betriebskosten abgerechnet werden." },
                { title: "Fehlende Belegeinsicht", desc: "Mieter haben Anspruch auf Einsicht in alle Belege (§ 259 BGB analog). Verweigerte Einsicht berechtigt zur Einbehaltung von Nachzahlungen." },
                { title: "Falsche Gesamtfläche", desc: "Liegt die in der Abrechnung verwendete Gesamtfläche um mehr als 10% von der tatsächlichen ab, kann der Mieter die Abrechnung anfechten." },
                { title: "Frist verpasst", desc: "Nach Ablauf der 12-Monats-Frist des §556 Abs. 3 BGB gehen Nachforderungen verloren — auch wenn sie sachlich berechtigt wären." },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-white border border-navy/10 rounded-xl p-4">
                  <span className="text-amber font-bold mt-0.5">!</span>
                  <div>
                    <p className="font-semibold text-navy text-sm">{item.title}</p>
                    <p className="text-text-light text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-navy mt-10 mb-4">
              Häufige Fragen zur Betriebskosten-Checkliste
            </h2>

            <div className="not-prose space-y-4 my-4">
              <div className="bg-white border border-navy/10 rounded-xl p-5">
                <p className="font-semibold text-navy mb-2">Welche Betriebskosten darf der Vermieter umlegen?</p>
                <p className="text-text-light text-sm">Nur die in §2 BetrKV abschließend aufgelisteten 17 Kostenkategorien sind umlagefähig — und nur, wenn sie im Mietvertrag vereinbart wurden. Verwaltungskosten und Instandhaltung gehören nicht dazu.</p>
              </div>
              <div className="bg-white border border-navy/10 rounded-xl p-5">
                <p className="font-semibold text-navy mb-2">Was passiert, wenn die Betriebskostenabrechnung zu spät kommt?</p>
                <p className="text-text-light text-sm">Kommt die Abrechnung nach der 12-Monats-Frist (§556 Abs. 3 BGB), verliert der Vermieter Nachzahlungsansprüche unwiederbringlich. Mieterguthaben können weiterhin eingefordert werden.</p>
              </div>
              <div className="bg-white border border-navy/10 rounded-xl p-5">
                <p className="font-semibold text-navy mb-2">Muss jede Betriebskostenposition im Mietvertrag stehen?</p>
                <p className="text-text-light text-sm">Ja. Nur vereinbarte Positionen dürfen umgelegt werden. Die Formulierung „Mieter trägt alle Betriebskosten lt. BetrKV" reicht als Globalverweisung aus.</p>
              </div>
            </div>

            <div className="not-prose bg-teal/10 border border-teal/20 rounded-2xl p-6 my-8">
              <h3 className="text-lg font-bold text-navy mb-2">Tipp: Betriebskosten professionell abrechnen lassen</h3>
              <p className="text-text-light text-sm mb-4">
                Mit einfach verwaltet. erhalten Sie jedes Jahr eine fristgerechte, vollständige Nebenkostenabrechnung — automatisch erstellt, digital übermittelt, rechtssicher nach §2 BetrKV.{" "}
                <Link href="/preise" className="text-teal underline hover:no-underline">Preise ansehen →</Link>
              </p>
              <Link
                href="/anfrage"
                className="inline-flex items-center gap-2 bg-amber hover:bg-amber/90 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
              >
                Kostenloses Angebot anfragen →
              </Link>
            </div>

          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
