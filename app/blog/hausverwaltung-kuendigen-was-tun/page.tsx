import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Hausverwaltung kündigen: Was tun wenn alles schiefläuft? (2026) | einfach verwaltet.",
  description:
    "Hausverwaltung kündigen: Wann ist es Zeit, wie geht es rechtlich (§26 WEG / §621 BGB), was müssen Sie beachten und wie vermeiden Sie typische Fehler beim Wechsel?",
  keywords:
    "Hausverwaltung kündigen was tun, Hausverwaltung kündigen, Verwalter kündigen WEG, Mietverwaltung kündigen, Hausverwaltung wechseln",
  openGraph: {
    title: "Hausverwaltung kündigen: Was tun wenn alles schiefläuft? (2026)",
    description:
      "Warnsignale, rechtliche Grundlagen §26 WEG und §621 BGB, Schritt-für-Schritt-Vorgehen und die häufigsten Fehler beim Hausverwaltungswechsel.",
    url: "https://einfach-verwaltet.de/blog/hausverwaltung-kuendigen-was-tun",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "article",
  },
  alternates: {
    canonical: "https://einfach-verwaltet.de/blog/hausverwaltung-kuendigen-was-tun",
  },
};

const jsonLdArticle = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Hausverwaltung kündigen: Was tun wenn alles schiefläuft?",
  description:
    "Vollständiger Ratgeber für Eigentümer: Wann sollte man die Hausverwaltung kündigen, welche rechtlichen Grundlagen gelten und wie geht man Schritt für Schritt vor?",
  author: { "@type": "Organization", name: "einfach verwaltet." },
  publisher: {
    "@type": "Organization",
    name: "einfach verwaltet.",
    logo: { "@type": "ImageObject", url: "https://einfach-verwaltet.de/logo.png" },
  },
  datePublished: "2026-02-27",
  inLanguage: "de",
  url: "https://einfach-verwaltet.de/blog/hausverwaltung-kuendigen-was-tun",
};

const jsonLdFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Wie kann ich eine WEG-Hausverwaltung kündigen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die Eigentümergemeinschaft kann den WEG-Verwalter gemäß §26 Abs. 3 WEG jederzeit mit Mehrheitsbeschluss abberufen — ohne Angabe von Gründen. Der Verwaltervertrag endet spätestens 6 Monate nach der Abberufung. Bei einem wichtigen Grund (z.B. Pflichtverletzungen, §626 BGB) ist sofortige fristlose Kündigung möglich.",
      },
    },
    {
      "@type": "Question",
      name: "Wie kündige ich eine Mietverwaltung?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mietverwaltungsverträge unterliegen §621 BGB (Dienstverträge). Ohne vereinbarte Laufzeit kann monatlich zum Monatsende gekündigt werden. Bei vereinbarter Laufzeit ist ordentliche Kündigung erst zum Ende der Laufzeit möglich. Bei schwerwiegenden Pflichtverletzungen ist eine außerordentliche Kündigung nach §626 BGB möglich.",
      },
    },
    {
      "@type": "Question",
      name: "Was muss die gekündigte Hausverwaltung herausgeben?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die gekündigte Verwaltung muss alle Unterlagen herausgeben: Miet- und Dienstleistungsverträge, Kontoauszüge, Kautionskonten, Versicherungspolicen, digitale Zugangsdaten (Portale, E-Mail-Konten), Eigentümerakten, Mieterakten und die Beschlusssammlung (bei WEG). Setzen Sie eine schriftliche Frist.",
      },
    },
    {
      "@type": "Question",
      name: "Kann ich als Einzeleigentümer den WEG-Verwalter kündigen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nein — als einzelner Eigentümer können Sie den WEG-Verwalter nicht allein kündigen. Die Abberufung erfordert einen Mehrheitsbeschluss der Eigentümerversammlung (§26 WEG). Sie können jedoch eine außerordentliche Versammlung beantragen oder Miteigentümer überzeugen. Bei der Mietverwaltung Ihres Sondereigentums können Sie selbstverständlich allein kündigen.",
      },
    },
  ],
};

export default function HausverwaltungKuendigenWasTunPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ) }}
      />
      <Navbar />
      <main className="pt-20 min-h-screen bg-warm-white">
        <article className="max-w-[800px] mx-auto px-6 py-12">
          {/* Breadcrumb */}
          <nav className="text-sm text-text-light mb-6" aria-label="Breadcrumb">
            <Link href="/blog" className="hover:text-teal transition-colors">Ratgeber</Link>
            <span className="mx-2">›</span>
            <span>Hausverwaltung kündigen — was tun?</span>
          </nav>

          {/* Header */}
          <header className="mb-10">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-teal/10 text-teal text-xs font-semibold px-3 py-1 rounded-full">Verwalterwechsel</span>
              <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">10 min Lesezeit</span>
              <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">Februar 2026</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-navy leading-tight mb-4">
              Hausverwaltung kündigen: Was tun wenn alles schiefläuft?
            </h1>
            <p className="text-lg text-text-light leading-relaxed">
              Verschleppte Reparaturen, ausbleibende Abrechnungen, schlechte Kommunikation — wann ist es Zeit zu kündigen, wie geht es rechtlich und was müssen Sie vor dem Wechsel prüfen?
            </p>
          </header>

          {/* Content */}
          <div className="prose prose-navy max-w-none text-gray-700 leading-relaxed space-y-8">

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">Warnsignale: Wann Sie handeln sollten</h2>
              <p>
                Nicht jeder Fehler ist ein Kündigungsgrund. Aber es gibt Muster, die zeigen, dass eine Hausverwaltung strukturell überfordert oder gleichgültig ist. Wenn Sie mehrere der folgenden Punkte erkennen, ist es Zeit für einen Wechsel.
              </p>

              <h3 className="text-xl font-semibold text-navy mb-3">Operative Warnsignale</h3>
              <ul className="space-y-2 mb-4">
                {[
                  "Nebenkostenabrechnungen kommen wiederholt zu spät oder enthalten Fehler",
                  "Reparaturen werden über Wochen verschleppt — Handwerker kommen nicht oder viel zu spät",
                  "Mieter beschweren sich direkt bei Ihnen, weil der Verwalter nicht erreichbar ist",
                  "Mieteinzug funktioniert nicht zuverlässig — Zahlungsrückstände eskalieren unbemerkt",
                  "Keinerlei proaktive Kommunikation über Vorgänge, Kosten oder offene Punkte",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-red-500 font-bold mt-0.5">✗</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-navy mb-3">Schwerwiegende Warnsignale (sofortige Kündigung prüfen)</h3>
              <ul className="space-y-2">
                {[
                  "Rücklagen werden intransparent oder falsch verwendet",
                  "Verdacht auf Doppelabrechnung oder überhöhte Handwerkerrechnungen",
                  "Eigentümerversammlungen finden seit über einem Jahr nicht mehr statt",
                  "Beschlüsse werden nicht oder falsch protokolliert",
                  "Kautionskonten werden nicht separat geführt",
                  "Verwalter ist monatelang nicht erreichbar oder reagiert auf keine Anfragen",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-red-600 font-bold mt-0.5">⚠</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">Rechtliche Grundlagen: §26 WEG und §621 BGB</h2>
              <p>
                Die Kündigung einer Hausverwaltung ist keine einfache E-Mail. Je nach Verwaltungsform gelten unterschiedliche gesetzliche Regelungen.
              </p>

              <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5 my-6">
                <div>
                  <h3 className="font-semibold text-navy text-lg mb-2">WEG-Verwaltung: §26 WEG (Abberufung)</h3>
                  <p className="text-sm">
                    Gemäß <strong>§26 Abs. 3 WEG</strong> kann die Eigentümergemeinschaft den Verwalter jederzeit mit Mehrheitsbeschluss abberufen — ohne Angabe von Gründen. Der Verwaltervertrag endet dann spätestens 6 Monate nach der Abberufung.
                  </p>
                  <p className="text-sm mt-2">
                    Bei einem <strong>wichtigen Grund</strong> (§626 BGB analog, z.B. Unterschlagung, schwere Pflichtverletzung) ist sofortige fristlose Kündigung des Verwaltervertrags möglich. Als einzelner Eigentümer können Sie keine Kündigung aussprechen — Sie brauchen den Beschluss der Gemeinschaft.
                  </p>
                </div>
                <div className="border-t border-gray-100 pt-5">
                  <h3 className="font-semibold text-navy text-lg mb-2">Mietverwaltung: §621 BGB (Dienstvertrag)</h3>
                  <p className="text-sm">
                    Mietverwaltungsverträge sind Dienstverträge nach <strong>§611 ff. BGB</strong>. Die ordentliche Kündigung richtet sich nach <strong>§621 BGB</strong>: Ist keine Laufzeit vereinbart, kann monatlich zum Ende des Kalendermonats gekündigt werden.
                  </p>
                  <p className="text-sm mt-2">
                    Ist eine Laufzeit vereinbart (oft 2–3 Jahre), ist ordentliche Kündigung erst zum Vertragsende möglich. Bei wichtigem Grund nach <strong>§626 BGB</strong> (z.B. Veruntreuung, grobe Fahrlässigkeit) ist auch hier sofortige fristlose Kündigung möglich.
                  </p>
                  <p className="text-sm mt-2">
                    <strong>Wichtig:</strong> Automatische Verlängerungsklauseln sind in Verwalterverträgen häufig. Prüfen Sie, ob Ihr Vertrag sich automatisch verlängert, wenn Sie nicht rechtzeitig kündigen.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">Schritt-für-Schritt: So kündigen Sie richtig</h2>
              <ol className="space-y-5">
                {[
                  {
                    title: "Verwaltervertrag prüfen",
                    desc: "Lesen Sie den Vertrag aufmerksam: Welche Laufzeit gilt? Gibt es Verlängerungsklauseln? Was sind die Kündigungsfristen? Notieren Sie sich das spätestmögliche Kündigungsdatum.",
                  },
                  {
                    title: "Dokumentation zusammenstellen",
                    desc: "Sammeln Sie Beweise für die Mängel — E-Mails, Fotos, Abrechnungsunterlagen, Protokolle. Das ist wichtig, falls der Verwalter Schadensersatzansprüche stellt oder die Übergabe verweigert.",
                  },
                  {
                    title: "Nachfolger finden (vor der Kündigung!)",
                    desc: "Holen Sie mindestens zwei Vergleichsangebote ein, bevor Sie kündigen. So entsteht keine Betreuungslücke. Der neue Verwalter sollte idealerweise die Übergabe koordinieren.",
                  },
                  {
                    title: "Kündigung schriftlich und per Einschreiben",
                    desc: "Die Kündigung muss schriftlich erfolgen. Verwenden Sie Einschreiben mit Rückschein oder persönliche Übergabe mit Empfangsbestätigung. Datum des Eingangs ist entscheidend für die Fristberechnung.",
                  },
                  {
                    title: "Übergabe strukturiert einfordern",
                    desc: "Senden Sie dem scheidenden Verwalter eine schriftliche Liste aller zu übergebenden Dokumente mit konkreter Frist (z.B. 4 Wochen nach Vertragsende). Dazu gehören: alle Verträge, Kontoauszüge, Kautionskonten, Versicherungspolicen, digitale Zugangsdaten und die Beschlusssammlung.",
                  },
                  {
                    title: "Mieter und Dienstleister informieren",
                    desc: "Informieren Sie Mieter schriftlich über den Wechsel. Teilen Sie allen Dienstleistern (Hausmeister, Reinigung, Versicherung, Stadtwerke) die neuen Kontaktdaten mit. Klären Sie offene Vorgänge gemeinsam mit dem neuen Verwalter.",
                  },
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="w-8 h-8 rounded-full bg-teal text-white text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                    <div>
                      <span className="font-semibold text-navy block mb-1">{item.title}</span>
                      <span className="text-gray-700">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">Was Sie vor dem Wechsel prüfen sollten</h2>
              <ul className="space-y-3">
                {[
                  { title: "Kautionskonten vollständig übertragen", desc: "Kautionen müssen auf separaten Treuhandkonten liegen und dürfen nicht mit Hausgeld verrechnet werden. Prüfen Sie Bestand und Übertragung auf den neuen Verwalter oder direkt auf ein Eigentümerkonto." },
                  { title: "Offene Rechnungen klären", desc: "Fordern Sie eine vollständige Übersicht aller offenen Forderungen und Verbindlichkeiten. Verpflichtungen gegenüber Handwerkern oder Dienstleistern dürfen nicht einfach offen bleiben." },
                  { title: "Rücklagen-Bestand sichern", desc: "Der Stand der Instandhaltungsrücklage (bei WEG) oder sonstiger Rücklagen muss vollständig dokumentiert und übertragen werden. Lassen Sie sich Kontoauszüge der letzten 12 Monate zeigen." },
                  { title: "Laufende Rechtsfälle dokumentieren", desc: "Laufende Mahnverfahren, Gerichtsverfahren oder außergerichtliche Streitigkeiten müssen vollständig übergeben werden. Holen Sie sich alle Akten und Korrespondenz." },
                  { title: "Digitale Zugangsdaten sichern", desc: "Fordern Sie Zugangsdaten für alle digitalen Plattformen: Eigentümerportal, E-Mail-Konten, Buchhaltungssoftware, Bankzugänge und eventuelle Kommunikationstools mit Mietern." },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-teal font-bold mt-0.5">✓</span>
                    <div>
                      <span className="font-semibold text-navy">{item.title}: </span>
                      <span>{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">Typische Fehler beim Hausverwaltungswechsel — und wie Sie sie vermeiden</h2>
              <div className="space-y-4">
                {[
                  {
                    fehler: "Kündigen ohne Nachfolger",
                    vermeidung: "Finden Sie zuerst einen neuen Verwalter, dann kündigen Sie den alten. Eine Betreuungslücke kostet Geld und Nerven.",
                  },
                  {
                    fehler: "Keine schriftliche Kündigung",
                    vermeidung: "Kündigung muss immer schriftlich und nachweisbar sein. Mündliche oder telefonische Kündigungen sind rechtlich nicht wirksam.",
                  },
                  {
                    fehler: "Übergabe-Checkliste fehlt",
                    vermeidung: "Erstellen Sie vorab eine vollständige Liste aller zu übergebenden Dokumente und bestätigen Sie den Eingang jedes einzelnen Elements schriftlich.",
                  },
                  {
                    fehler: "Fristen verschlafen",
                    vermeidung: "Automatische Verlängerungsklauseln lauern in vielen Verträgen. Setzen Sie sich eine Erinnerung 3 Monate vor dem spätestmöglichen Kündigungstermin.",
                  },
                  {
                    fehler: "Mieter vergessen zu informieren",
                    vermeidung: "Mieter haben ein Recht auf schriftliche Information über den Verwalterwechsel. Das verhindert Chaos bei Zahlungen und Anfragen.",
                  },
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex items-start gap-3">
                      <span className="text-red-500 font-bold mt-0.5">✗</span>
                      <div>
                        <span className="font-semibold text-navy">{item.fehler}: </span>
                        <span className="text-gray-700">{item.vermeidung}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section className="bg-white rounded-2xl border border-gray-200 p-8 mt-10">
              <h2 className="text-2xl font-bold text-navy mb-6">Häufige Fragen zum Thema Hausverwaltung kündigen</h2>
              <div className="space-y-6">
                {[
                  {
                    q: "Kann ich die Hausverwaltung sofort kündigen?",
                    a: "Bei WEG-Verwaltung: ja, durch Abberufungsbeschluss der Eigentümerversammlung. Der Verwaltervertrag läuft aber noch bis zu 6 Monate. Bei wichtigem Grund (§626 BGB) ist sofortige fristlose Kündigung möglich. Bei Mietverwaltung: abhängig von Vertragslaufzeit und §621 BGB.",
                  },
                  {
                    q: "Was passiert, wenn der Verwalter die Übergabe verweigert?",
                    a: "Der Verwalter ist in Verzug (§286 BGB). Ein anwaltliches Mahnschreiben wirkt meist schnell. Im Notfall kann ein einstweiliger Rechtsschutz beantragt werden. Dokumentieren Sie alles schriftlich.",
                  },
                  {
                    q: "Brauche ich einen Anwalt für die Kündigung?",
                    a: "Nicht zwingend — bei unkomplizierten Situationen reicht eine schriftliche Kündigung nach Vertragstext. Bei Streitigkeiten, wichtigem Grund oder wenn der Verwalter die Übergabe verweigert, ist anwaltliche Unterstützung empfehlenswert.",
                  },
                  {
                    q: "Was kostet ein Hausverwaltungswechsel?",
                    a: "Der Wechsel selbst ist kostenlos. Eventuell anfallende Kosten: außerordentliche Eigentümerversammlung (€80–200), eventuelle Anwaltskosten. Seriöse neue Verwalter verlangen keine Einrichtungsgebühren.",
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
              <h2 className="text-2xl font-bold mb-3">Bereit für einen sauberen Neustart?</h2>
              <p className="text-white/80 mb-6 max-w-md mx-auto">
                Wir begleiten Ihren Wechsel — strukturiert, transparent und ohne Chaos. Erfahren Sie, wie ein reibungsloser Übergang aussieht.
              </p>
              <Link
                href="/wechseln"
                className="inline-flex items-center gap-2 bg-teal text-white px-8 py-4 rounded-xl font-semibold text-base hover:bg-teal/90 transition-all hover:shadow-lg"
              >
                Jetzt wechseln →
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
