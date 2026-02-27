import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Verwaltervertrag kündigen: Fristen, Ablauf und Wechsel zur besseren Hausverwaltung | einfach verwaltet.",
  description:
    "Verwaltervertrag kündigen: Kündigungsfristen nach §26 WEG und §621 BGB, Dokumentenübergabe-Pflichten, was bei laufenden Mandaten passiert — und wie einfach verwaltet. den Wechsel einfach macht.",
  keywords:
    "Verwaltervertrag kündigen, Hausverwaltung kündigen Frist, WEG Verwalter abberufen, §26 WEG Kündigung, Hausverwaltung wechseln",
  openGraph: {
    title: "Verwaltervertrag kündigen: Fristen, Ablauf und Wechsel zur besseren Hausverwaltung",
    description:
      "§26 WEG und §621 BGB erklärt: Kündigungsfristen, Dokumentenübergabe-Pflichten und reibungsloser Verwalterwechsel.",
    url: "https://einfach-verwaltet.de/blog/verwaltervertrag-kuendigen",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Verwaltervertrag kündigen: Fristen, Ablauf und Wechsel zur besseren Hausverwaltung",
  description:
    "Kündigungsfristen nach §26 WEG und §621 BGB, Dokumentenübergabepflichten und wie ein reibungsloser Verwalterwechsel gelingt.",
  author: { "@type": "Organization", name: "einfach verwaltet." },
  publisher: {
    "@type": "Organization",
    name: "einfach verwaltet.",
    logo: { "@type": "ImageObject", url: "https://einfach-verwaltet.de/logo.png" },
  },
  datePublished: "2026-02-27",
  inLanguage: "de",
  url: "https://einfach-verwaltet.de/blog/verwaltervertrag-kuendigen",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Welche Kündigungsfrist gilt für einen Verwaltervertrag?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Bei WEG-Verwaltungsverträgen gilt §26 WEG: Der Verwalter kann nur durch Eigentümerbeschluss abberufen werden. Die Amtszeit beträgt maximal 5 Jahre. Vertragsklauseln können eine ordentliche Kündigungsfrist von 3 Monaten zum Jahresende vorsehen. Mietverwaltungsverträge ohne feste Laufzeit können nach §621 BGB mit einer Frist von einem Monat zum Monatsende gekündigt werden, sofern der Vertrag nichts anderes regelt.",
      },
    },
    {
      "@type": "Question",
      name: "Was passiert mit laufenden Mandaten nach der Kündigung?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nach Vertragsende muss der alte Verwalter alle laufenden Vorgänge geordnet übergeben: offene Wartungsaufträge, laufende Gerichts- oder Verwaltungsverfahren, Mieterkorrespondenz und alle Vertragsunterlagen. Die Übergabepflicht besteht unabhängig davon, ob ein Streit über die Kündigung vorliegt. Laufende Dienstleister-Verträge (Hausmeister, Reinigung) bleiben in der Regel bestehen — Ansprechpartner ändert sich.",
      },
    },
    {
      "@type": "Question",
      name: "Welche Unterlagen muss der alte Verwalter übergeben?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Der scheidende Verwalter ist zur vollständigen Unterlagenübergabe verpflichtet. Dazu gehören: alle Mietverträge und Mieterakten, Hausgeldkonten und Kontoauszüge, Betriebskostenabrechnungen der Vorjahre, Wartungsverträge und Handwerkerrechnungen, Schlüsselverzeichnisse und Grundrisse, Protokolle der Eigentümerversammlungen (WEG) sowie laufende Korrespondenz. Verweigert der alte Verwalter die Übergabe, kann auf Herausgabe geklagt werden.",
      },
    },
  ],
};

export default function Post() {
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
      <main className="bg-warm-white min-h-screen pt-16">
        <article className="max-w-3xl mx-auto px-4 py-16">
          <nav className="text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-teal">Startseite</Link>
            <span className="mx-2">›</span>
            <Link href="/blog" className="hover:text-teal">Ratgeber</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-700">Verwaltervertrag kündigen</span>
          </nav>

          <header className="mb-10">
            <p className="text-teal text-sm font-semibold uppercase tracking-wider mb-3">
              Ratgeber · 9 min Lesezeit
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-navy font-playfair mb-4 leading-tight">
              Verwaltervertrag kündigen: Fristen, Ablauf und Wechsel zur besseren Hausverwaltung
            </h1>
            <p className="text-gray-500 text-sm">Februar 2026 · einfach verwaltet.</p>
          </header>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <p>
              Die Hausverwaltung läuft nicht gut? Reagiert zu langsam, rechnet ungenau ab oder 
              kommuniziert kaum? Dann ist ein Verwalterwechsel oft die richtige Entscheidung. 
              Doch wie kündigt man einen Verwaltervertrag fristgerecht? Was gilt für WEG und 
              Mietverwaltung? Und welche Unterlagen muss der alte Verwalter übergeben?
            </p>
            <p>
              Dieser Leitfaden erklärt die rechtlichen Grundlagen und zeigt, wie ein 
              geordneter Wechsel gelingt.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Rechtliche Grundlagen: §621 BGB und §26 WEG
            </h2>
            <p>
              Die Kündigung eines Verwaltervertrags richtet sich nach der Art der Verwaltung:
            </p>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              Mietverwaltungsvertrag (§621 BGB)
            </h3>
            <p>
              Für Verträge ohne feste Laufzeit gilt §621 BGB: Ordentliche Kündigung 
              mit einer Frist von einem Monat zum Ende des Kalendermonats. 
              Die meisten Mietverwaltungsverträge enthalten jedoch spezifische 
              Regelungen zur Laufzeit und Kündigungsfrist — häufig 3 Monate 
              zum Jahresende. Prüfen Sie Ihren Vertrag genau.
            </p>
            <p>
              Eine fristlose Kündigung aus wichtigem Grund (§626 BGB) ist bei 
              schwerwiegenden Pflichtverletzungen möglich: Unterschlagung von 
              Mietergeldern, grobe Vernachlässigung der Verwalterpflichten oder 
              wiederholte nachgewiesene Fehlabrechnungen.
            </p>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              WEG-Verwaltervertrag (§26 WEG)
            </h3>
            <p>
              Bei Wohnungseigentümergemeinschaften regelt §26 WEG die Abberufung 
              des Verwalters. Die wichtigsten Punkte:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Abberufung durch Beschluss:</strong> Der WEG-Verwalter wird 
                durch Eigentümerbeschluss abberufen — ein einfacher Mehrheitsbeschluss 
                genügt (§26 Abs. 3 WEG).
              </li>
              <li>
                <strong>Maximal 5 Jahre Amtszeit:</strong> Ein WEG-Verwalter kann 
                höchstens für 5 Jahre bestellt werden (§26 Abs. 1 WEG).
              </li>
              <li>
                <strong>Kündigungsfrist im Vertrag:</strong> Üblich sind 3 Monate 
                zum Jahresende. Der Verwaltervertrag läuft bis zum nächsten 
                ordentlichen Kündigungstermin — selbst wenn die Abberufung sofort wirkt.
              </li>
              <li>
                <strong>Außerordentliche Abberufung:</strong> Aus wichtigem Grund 
                (z. B. Untreue, schwerwiegende Pflichtverletzung) kann der Verwalter 
                jederzeit und ohne Frist abberufen werden.
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Was passiert mit laufenden Mandaten?
            </h2>
            <p>
              Nach der Kündigung laufen viele Vorgänge weiter — Wartungsverträge, 
              Mieteranliegen, offene Handwerkeraufträge. Die Verantwortung geht 
              zum nächsten Verwalter über, sobald der Vertrag endet und 
              die Unterlagen übergeben sind.
            </p>
            <p>
              Laufende Verträge mit Dienstleistern (Hausmeister, Reinigungsfirma, 
              Winterdienst) sind nicht automatisch an den Verwaltervertrag gebunden — 
              sie laufen weiter und werden vom neuen Verwalter übernommen. 
              Achten Sie darauf, alle laufenden Verträge im Übergabeprotokoll 
              zu dokumentieren.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Dokumentenübergabe: Was der alte Verwalter herausgeben muss
            </h2>
            <p>
              Der scheidende Verwalter ist rechtlich zur vollständigen 
              Dokumentenübergabe verpflichtet. Das umfasst:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Alle Mietverträge und Mieterakten</li>
              <li>Hausgeldkonten, Bankkontoauszüge, Rücklagen</li>
              <li>Betriebskosten- und Nebenkostenabrechnungen der letzten Jahre</li>
              <li>Wartungsverträge (Aufzug, Heizung, Feuerlöscher etc.)</li>
              <li>Handwerkerrechnungen und offene Aufträge</li>
              <li>Schlüsselverzeichnisse, Grundrisse, Baupläne</li>
              <li>WEG: Protokolle aller Eigentümerversammlungen, Beschlusssammlung</li>
              <li>Laufende Korrespondenz mit Mietern, Behörden, Handwerkern</li>
            </ul>
            <p>
              Verweigert der alte Verwalter die Übergabe, können Sie ihn auf Herausgabe 
              verklagen — und ggf. einstweilige Verfügung beantragen, um dringende 
              Unterlagen schnell zu erhalten.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Schritt für Schritt: So läuft ein Verwalterwechsel ab
            </h2>
            <ol className="list-decimal pl-6 space-y-3">
              <li>
                <strong>Verwaltervertrag prüfen:</strong> Laufzeit, Kündigungsfrist, 
                Bedingungen für außerordentliche Kündigung ermitteln.
              </li>
              <li>
                <strong>Bei WEG: Eigentümerversammlung einberufen</strong> und 
                Abberufungsbeschluss fassen.
              </li>
              <li>
                <strong>Kündigung schriftlich</strong> und per Einschreiben 
                mit Rückschein zustellen. Fristen einhalten.
              </li>
              <li>
                <strong>Neuen Verwalter auswählen</strong> und Vertrag 
                vor Ende der alten Verwaltung abschließen.
              </li>
              <li>
                <strong>Übergabetermin vereinbaren</strong> — idealerweise 
                gemeinsam mit dem alten und neuen Verwalter.
              </li>
              <li>
                <strong>Mieter informieren:</strong> Über Wechsel des Verwalters, 
                neue Kontaktdaten und neue Bankverbindung für Mietzahlungen.
              </li>
            </ol>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              FAQ: Verwaltervertrag kündigen
            </h2>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-navy mb-2">
                  Welche Kündigungsfrist gilt für einen Verwaltervertrag?
                </h3>
                <p className="text-sm">
                  Mietverwaltung ohne feste Laufzeit: 1 Monat zum Monatsende (§621 BGB). 
                  In der Praxis meist 3 Monate zum Jahresende (Vertragsklausel). 
                  WEG: Abberufung durch Beschluss, Vertrag läuft bis zum nächsten 
                  Kündigungstermin — oft 3 Monate zum Jahresende.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-navy mb-2">
                  Was passiert mit laufenden Mandaten nach der Kündigung?
                </h3>
                <p className="text-sm">
                  Laufende Dienstleisterverträge (Hausmeister, Reinigung) gehen 
                  auf den neuen Verwalter über. Offene Vorgänge werden im 
                  Übergabeprotokoll dokumentiert und übernommen.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-navy mb-2">
                  Welche Unterlagen muss der alte Verwalter übergeben?
                </h3>
                <p className="text-sm">
                  Alle Mietverträge, Kontoauszüge, Betriebskostenabrechnungen, 
                  Wartungsverträge, Schlüsselverzeichnisse, Protokolle (WEG) 
                  und laufende Korrespondenz. Verweigerung ist rechtlich 
                  nicht zulässig — Herausgabeklage ist möglich.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Fazit: Wechsel lohnt sich — wenn er gut vorbereitet ist
            </h2>
            <p>
              Ein Verwalterwechsel ist kein Drama, sondern eine normale geschäftliche 
              Entscheidung. Mit der richtigen Vorbereitung — Vertragscheck, 
              Kündigungsfristen einhalten, sorgfältige Dokumentenübergabe — 
              läuft der Übergang reibungslos. Wer frühzeitig plant, vermeidet 
              Lücken in der Verwaltung und Ärger mit dem alten Verwalter.
            </p>
            <p>
              Möchten Sie wechseln? Bei einfach verwaltet. begleiten wir Sie durch 
              den gesamten Übergabeprozess — inklusive Übernahme aller Unterlagen 
              und sofortiger Ansprechbarkeit für Ihre Mieter.
            </p>
            <p>
              <Link href="/wechseln" className="text-teal hover:underline font-semibold">
                Mehr zum reibungslosen Verwalterwechsel →
              </Link>
            </p>
          </div>

          <div className="mt-12 bg-teal/10 border border-teal/20 rounded-xl p-8">
            <h3 className="text-xl font-bold text-navy mb-2 font-playfair">
              Bereit für den Wechsel? einfach verwaltet. macht es einfach.
            </h3>
            <p className="text-gray-600 mb-4">
              Wir übernehmen Ihre Immobilien nahtlos — mit strukturiertem Übergabeprozess, 
              vollständiger Dokumentenübernahme und transparenter Kommunikation. 
              Kein Chaos, kein Datenverlust.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/wechseln"
                className="inline-block bg-navy text-white font-semibold px-6 py-3 rounded-lg hover:bg-navy/90 transition-colors"
              >
                Zum Verwalterwechsel
              </Link>
              <Link
                href="/anfrage"
                className="inline-block bg-teal text-white font-semibold px-6 py-3 rounded-lg hover:bg-teal/90 transition-colors"
              >
                Angebot anfordern
              </Link>
            </div>
          </div>

          <div className="mt-10">
            <Link href="/blog" className="text-teal hover:underline text-sm">
              ← Zurück zum Ratgeber
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
