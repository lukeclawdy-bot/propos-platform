import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Wohnungsübergabe Protokoll: Checkliste & Vorlage für Vermieter 2026 | einfach verwaltet.",
  description:
    "Wohnungsübergabe Protokoll 2026: Was muss dokumentiert werden? Checkliste für Ein- und Auszug, Zählerstände, Schlüssel, Mängel — kostenlose Vorlage für Vermieter.",
  keywords:
    "Wohnungsübergabe Protokoll, Übergabeprotokoll Wohnung, Wohnungsübergabe Checkliste, Auszug Protokoll, Einzug Protokoll",
  openGraph: {
    title: "Wohnungsübergabe Protokoll: Checkliste & Vorlage für Vermieter 2026",
    description:
      "Rechtssichere Wohnungsübergabe: Was dokumentiert werden muss, wie Konflikte vermieden werden und was rechtlich gilt.",
    url: "https://einfach-verwaltet.de/blog/wohnungsuebergabe-protokoll",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "article",
  },
  alternates: {
    canonical: "https://einfach-verwaltet.de/blog/wohnungsuebergabe-protokoll",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Wohnungsübergabe Protokoll: Checkliste & Vorlage für Vermieter 2026",
  description:
    "Vollständige Anleitung zum Wohnungsübergabeprotokoll: Inhalt, Checkliste, rechtliche Bedeutung und häufige Fehler.",
  author: { "@type": "Organization", name: "einfach verwaltet." },
  publisher: {
    "@type": "Organization",
    name: "einfach verwaltet.",
    logo: { "@type": "ImageObject", url: "https://einfach-verwaltet.de/logo.png" },
  },
  datePublished: "2026-02-27",
  inLanguage: "de",
  url: "https://einfach-verwaltet.de/blog/wohnungsuebergabe-protokoll",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was muss im Wohnungsübergabeprotokoll stehen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ein vollständiges Wohnungsübergabeprotokoll enthält: Datum und Uhrzeit der Übergabe, Namen und Unterschriften beider Parteien, Zählerstände (Strom, Gas, Wasser), Anzahl und Zustand aller übergebenen Schlüssel, Zustand aller Räume mit genauen Beschreibungen vorhandener Mängel, Fotos der dokumentierten Schäden sowie Vereinbarungen über eventuelle Reparaturen und Fristen.",
      },
    },
    {
      "@type": "Question",
      name: "Ist ein Übergabeprotokoll rechtlich bindend?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ein beidseitig unterschriebenes Übergabeprotokoll hat hohe Beweiskraft. Im Streitfall gilt: Was im Protokoll steht, ist schwer zu widerlegen. Mängel, die beim Auszug nicht im Protokoll festgehalten wurden, kann der Vermieter kaum noch dem Mieter anlasten. Umgekehrt gilt: Mängel, die bei Einzug dokumentiert wurden, sind Vorschäden — der Mieter haftet nicht.",
      },
    },
    {
      "@type": "Question",
      name: "Was darf der Vermieter nach dem Auszug einbehalten?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Der Vermieter darf von der Mietkaution einbehalten: Kosten für Schäden, die über normale Abnutzung hinausgehen, ausstehende Mietrückstände, fehlende Schlüssel (Kosten für Austauch des Schlosses), nicht durchgeführte vertraglich vereinbarte Schönheitsreparaturen (wenn die Klausel wirksam ist). Nicht einbehalten darf er: Kosten für normale Abnutzung, Schönheitsreparaturen bei unwirksamen Mietvertragsklauseln.",
      },
    },
    {
      "@type": "Question",
      name: "Muss der Mieter beim Übergabeprotokoll anwesend sein?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Idealerweise ja — das Protokoll sollte von beiden Parteien gemeinsam erstellt und unterschrieben werden. Wenn der Mieter die Teilnahme verweigert, können Sie die Übergabe mit einem unabhängigen Zeugen durchführen und dem Mieter das Protokoll im Anschluss zustellen. Ein einseitig erstelltes Protokoll hat jedoch geringere Beweiskraft.",
      },
    },
  ],
};

const checklistItems = [
  {
    category: "Grunddaten",
    items: ["Datum und Uhrzeit", "Name und Unterschrift Vermieter", "Name und Unterschrift Mieter(in)", "Anschrift der Wohnung", "Art der Übergabe (Einzug / Auszug)"],
  },
  {
    category: "Schlüssel",
    items: ["Anzahl Wohnungsschlüssel", "Anzahl Briefkastenschlüssel", "Anzahl Haustürschlüssel", "Anzahl Keller-/Garagenschlüssel", "Sonstige Schlüssel (z.B. Gemeinschaftsraum)"],
  },
  {
    category: "Zählerstände",
    items: ["Stromzähler (Nummer und Stand)", "Gaszähler (Nummer und Stand)", "Wasserzähler (Nummer und Stand)", "Wärmemengenzähler falls vorhanden"],
  },
  {
    category: "Räume und Zustand",
    items: ["Wohnzimmer: Wände, Böden, Decke, Fenster", "Schlafzimmer: Wände, Böden, Decke, Fenster", "Küche: Einbauküche, Geräte, Fliesen", "Bad/WC: Sanitärobjekte, Fliesen, Schimmel", "Flur/Diele: Wände, Bodenbelag", "Balkon/Terrasse: Zustand, Reinigung"],
  },
  {
    category: "Dokumentation",
    items: ["Fotos aller relevanten Räume", "Fotos aller festgestellten Mängel", "Benennung des Mangels mit genauem Ort", "Vereinbarte Nachbesserungsfristen schriftlich"],
  },
];

export default function WohnungsuebergabeProtokollPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />
      <main className="pt-20 min-h-screen bg-warm-white">
        <article className="max-w-[800px] mx-auto px-6 py-12">
          <nav className="text-sm text-text-light mb-6" aria-label="Breadcrumb">
            <Link href="/blog" className="hover:text-teal transition-colors">Ratgeber</Link>
            <span className="mx-2">›</span>
            <span>Wohnungsübergabe Protokoll</span>
          </nav>

          <header className="mb-10">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-teal/10 text-teal text-xs font-semibold px-3 py-1 rounded-full">Praxis-Leitfaden</span>
              <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">9 min Lesezeit</span>
              <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">Februar 2026</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-navy leading-tight mb-4">
              Wohnungsübergabe Protokoll: Checkliste & Anleitung für Vermieter
            </h1>
            <p className="text-lg text-text-light leading-relaxed">
              Ein vollständiges Übergabeprotokoll ist Ihr wichtigstes Schutzinstrument bei Mieterwechseln. Wir zeigen, was hinein muss, wie die Übergabe abläuft und wie Sie Konflikte über Schäden und Kaution vermeiden.
            </p>
          </header>

          <div className="prose prose-navy max-w-none text-gray-700 leading-relaxed space-y-8">

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">Warum das Übergabeprotokoll so wichtig ist</h2>
              <p>
                Das Wohnungsübergabeprotokoll ist kein bürokratisches Pflichtformular — es ist Ihr Beweisdokument für alle möglichen Streitigkeiten nach dem Mietverhältnis. Wer bei der Übergabe sorgfältig dokumentiert, hat bei Kautionsstreitigkeiten eine solide Grundlage. Wer es nicht tut, steht im Streitfall oft mit leeren Händen da.
              </p>
              <p>
                Laut einer Studie des Deutschen Mieterbunds entstehen rund 40 % aller Rechtsstreitigkeiten zwischen Vermietern und Mietern im Zusammenhang mit Kautionsrückgabe und Schäden bei Auszug. Ein lückenloses Protokoll reduziert dieses Risiko erheblich.
              </p>
              <div className="bg-teal/5 border border-teal/20 rounded-xl p-5 my-4">
                <p className="text-sm font-semibold text-teal mb-1">💡 Kernprinzip</p>
                <p className="text-sm text-gray-700">
                  Was beim Einzug dokumentiert wurde, ist <strong>Vorschaden</strong> — der Mieter haftet nicht. Was beim Auszug neu festgestellt wird und nicht im Einzugsprotokoll steht, trägt der Mieter. Deshalb: Beide Übergaben gleich sorgfältig protokollieren.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">Checkliste: Was ins Übergabeprotokoll muss</h2>
              <div className="space-y-6 mt-4">
                {checklistItems.map((section, si) => (
                  <div key={si} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="bg-navy/5 px-5 py-3 border-b border-gray-200">
                      <h3 className="font-semibold text-navy text-sm">{section.category}</h3>
                    </div>
                    <ul className="px-5 py-3 space-y-2">
                      {section.items.map((item, ii) => (
                        <li key={ii} className="flex items-center gap-3 text-sm">
                          <span className="w-4 h-4 rounded border border-gray-300 shrink-0 flex items-center justify-center text-xs">□</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">Ablauf einer rechtssicheren Übergabe</h2>
              <div className="space-y-4 mt-4">
                {[
                  {
                    step: "Termin rechtzeitig vereinbaren",
                    desc: "Vereinbaren Sie den Übergabetermin mindestens eine Woche im Voraus. Wählen Sie einen Zeitpunkt mit gutem Tageslicht — am besten tagsüber. Beide Parteien sollten Zeit für eine gründliche Begehung mitbringen.",
                  },
                  {
                    step: "Protokollformular vorbereiten",
                    desc: "Drucken Sie das Protokollformular aus oder nutzen Sie eine digitale Variante. Alle Räume sollten vorab aufgeführt sein, damit nichts vergessen wird.",
                  },
                  {
                    step: "Systematische Begehung durchführen",
                    desc: "Gehen Sie jeden Raum einzeln durch — von links nach rechts, von oben nach unten. Notieren Sie Zustand von Wänden, Böden, Decken, Fenstern, Türen und Sanitärobjekten. Prüfen Sie alle Einbaugeräte auf Funktion.",
                  },
                  {
                    step: "Alles fotografieren",
                    desc: "Dokumentieren Sie jeden Mangel mit mindestens einem Foto. Nennen Sie Raum und genaue Position im Bild oder in der Beschriftung. Fotos sind das stärkste Beweisinstrument.",
                  },
                  {
                    step: "Zählerstände ablesen",
                    desc: "Lesen Sie alle Zähler gemeinsam ab und notieren Sie Datum, Zählernummer und Stand. Diese Daten werden für die Nebenkostenabrechnung benötigt.",
                  },
                  {
                    step: "Schlüssel übergeben und dokumentieren",
                    desc: "Zählen und dokumentieren Sie alle Schlüssel. Lassen Sie den Empfang schriftlich quittieren. Bei Auszug: Fehlende Schlüssel berechtigen zur Einbehaltung von Schlosstauschkosten.",
                  },
                  {
                    step: "Protokoll unterzeichnen",
                    desc: "Beide Parteien unterschreiben das Protokoll. Jede Partei erhält eine Kopie. Das Original verwahren Sie dauerhaft.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-white rounded-xl border border-gray-200">
                    <span className="w-7 h-7 rounded-full bg-teal text-white text-sm font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                    <div>
                      <p className="font-semibold text-navy">{item.step}</p>
                      <p className="text-sm text-gray-600 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">Häufige Fehler und wie Sie sie vermeiden</h2>
              <div className="space-y-3 mt-4">
                {[
                  {
                    fehler: "Zu wenig Zeit eingeplant",
                    loesung: "Rechnen Sie für eine 3-Zimmer-Wohnung mindestens 60–90 Minuten ein. Hektik führt zu Lücken.",
                  },
                  {
                    fehler: "Keine Fotos gemacht",
                    loesung: "Fotos sind Beweis. Ohne Bilder ist ein Mangel im Streitfall kaum nachweisbar — auch wenn er im Protokoll steht.",
                  },
                  {
                    fehler: "Zu vage Beschreibungen",
                    loesung: "Statt 'Wand beschädigt' lieber: 'Wohnzimmer, Nordwand, ca. 30cm unter Fenster, Riss in Verputz, ca. 15cm Länge'.",
                  },
                  {
                    fehler: "Normale Abnutzung als Schaden deklariert",
                    loesung: "Normale Abnutzung (z.B. verblasste Farbe nach 5 Jahren) ist kein Schaden. Übertriebene Forderungen schaden im Streitfall.",
                  },
                  {
                    fehler: "Protokoll ohne Mieterunterschrift",
                    loesung: "Verweigert der Mieter die Unterschrift, vermerken Sie das im Protokoll und lassen Sie einen Zeugen unterschreiben.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-white rounded-xl border border-red-100">
                    <span className="text-red-500 font-bold text-lg shrink-0">✗</span>
                    <div>
                      <p className="font-semibold text-navy text-sm">{item.fehler}</p>
                      <p className="text-sm text-gray-600 mt-0.5">
                        <span className="text-teal font-medium">Lösung: </span>{item.loesung}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section className="bg-white rounded-2xl border border-gray-200 p-8 mt-10">
              <h2 className="text-2xl font-bold text-navy mb-6">Häufige Fragen zum Wohnungsübergabe Protokoll</h2>
              <div className="space-y-6">
                {[
                  {
                    q: "Was muss im Wohnungsübergabeprotokoll stehen?",
                    a: "Datum, Namen, Unterschriften beider Parteien, Zählerstände, Schlüsselanzahl, Zustand aller Räume mit Mängelbeschreibungen, Fotos und etwaige Vereinbarungen über Reparaturen.",
                  },
                  {
                    q: "Ist ein Übergabeprotokoll rechtlich bindend?",
                    a: "Ein beidseitig unterschriebenes Protokoll hat hohe Beweiskraft. Was dokumentiert ist, ist schwer zu widerlegen — in beide Richtungen.",
                  },
                  {
                    q: "Was darf der Vermieter nach dem Auszug einbehalten?",
                    a: "Kosten für Schäden über normale Abnutzung hinaus, Mietrückstände, fehlende Schlüssel. Nicht: Kosten für normale Abnutzung oder bei unwirksamen Schönheitsreparaturklauseln.",
                  },
                  {
                    q: "Muss der Mieter beim Protokoll anwesend sein?",
                    a: "Idealerweise ja. Verweigert der Mieter die Teilnahme, Protokoll mit Zeugen erstellen und dem Mieter zustellen. Ein einseitiges Protokoll hat geringere Beweiskraft.",
                  },
                ].map((item, i) => (
                  <div key={i} className="border-b border-gray-100 pb-5 last:border-0 last:pb-0">
                    <h3 className="font-semibold text-navy mb-2">{item.q}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section className="bg-navy rounded-2xl p-8 text-white text-center mt-10">
              <h2 className="text-2xl font-bold mb-3">Mieterwechsel professionell abwickeln</h2>
              <p className="text-white/80 mb-6 max-w-md mx-auto">
                Professionelle Hausverwaltung führt vollständige Übergaben durch, dokumentiert lückenlos und schützt Ihr Eigentum.
              </p>
              <Link
                href="/anfrage"
                className="inline-flex items-center gap-2 bg-teal text-white px-8 py-4 rounded-xl font-semibold text-base hover:bg-teal/90 transition-all hover:shadow-lg"
              >
                Kostenlos anfragen →
              </Link>
              <p className="text-white/50 text-xs mt-4">Kostenlos & unverbindlich · Antwort am selben Tag</p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
