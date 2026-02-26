import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Verwaltervertrag kündigen: So wechseln Sie die Hausverwaltung fristgerecht | einfach verwaltet.",
  description:
    "Verwaltervertrag kündigen: Kündigungsfristen, Muster-Kündigung und Schritt-für-Schritt-Anleitung für einen reibungslosen Verwalterwechsel. §26 WEG, §621 BGB erklärt.",
  keywords:
    "Verwaltervertrag kündigen, Hausverwaltung wechseln, WEG Verwalter abberufen, Kündigungsfrist Hausverwaltung",
  openGraph: {
    title: "Verwaltervertrag kündigen: So wechseln Sie die Hausverwaltung fristgerecht",
    description:
      "Schritt-für-Schritt: Verwaltervertrag kündigen, Fristen einhalten und den Wechsel rechtssicher gestalten.",
    url: "https://einfach-verwaltet.de/blog/verwaltervertrag-kuendigen",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Verwaltervertrag kündigen: So wechseln Sie die Hausverwaltung fristgerecht",
  description:
    "Kündigungsfristen, rechtliche Grundlagen und Schritt-für-Schritt-Anleitung für den Verwalterwechsel.",
  author: { "@type": "Organization", name: "einfach verwaltet." },
  publisher: {
    "@type": "Organization",
    name: "einfach verwaltet.",
    logo: { "@type": "ImageObject", url: "https://einfach-verwaltet.de/logo.png" },
  },
  datePublished: "2026-02-01",
  inLanguage: "de",
  url: "https://einfach-verwaltet.de/blog/verwaltervertrag-kuendigen",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://einfach-verwaltet.de/blog/verwaltervertrag-kuendigen",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Welche Kündigungsfristen gelten für den Verwaltervertrag?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Bei der WEG-Verwaltung beträgt die gesetzliche Amtszeit des Verwalters maximal 5 Jahre (§26 WEG). Die Abberufung kann jederzeit durch Beschluss der Eigentümerversammlung erfolgen, der Dienstvertrag kann jedoch bis zu 6 Monate nach der Abberufung weiterlaufen. Bei der Mietverwaltung gilt §621 BGB: bei monatlicher Vergütung ist eine Kündigung mit einer Frist von einem Monat zum Monatsende möglich, wenn vertraglich nicht anders vereinbart.",
      },
    },
    {
      "@type": "Question",
      name: "Kann ich den Verwaltervertrag außerordentlich kündigen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Eine außerordentliche fristlose Kündigung ist aus wichtigem Grund nach §626 BGB möglich — z.B. bei Veruntreuung von Geldern, systematischer Verletzung der Verwalterpflichten oder grober Pflichtverletzung. In diesem Fall endet das Dienstverhältnis sofort. Wichtig: Der wichtige Grund muss dokumentierbar sein.",
      },
    },
    {
      "@type": "Question",
      name: "Welche Unterlagen muss der alte Verwalter bei einem Wechsel übergeben?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Der alte Verwalter ist verpflichtet, alle objektbezogenen Unterlagen herauszugeben: Mietverträge, Betriebskostenabrechnungen, Kontoauszüge, Korrespondenz, Handwerkerverträge, Schlüsselliste, Versicherungsunterlagen und alle sonstigen Verwaltungsunterlagen. Bei Weigerung besteht ein gerichtlich durchsetzbarer Herausgabeanspruch.",
      },
    },
    {
      "@type": "Question",
      name: "Wie lange dauert ein Verwalterwechsel?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ein Verwalterwechsel dauert in der Regel 4–12 Wochen. Die Zeit hängt von der Kündigungsfrist, der Bereitschaft des alten Verwalters zur Übergabe und dem Umfang des Portfolios ab. Ein professioneller neuer Verwalter übernimmt die Organisation des Übergangs und koordiniert die Dokumentenübergabe.",
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
              Verwaltervertrag kündigen: So wechseln Sie die Hausverwaltung fristgerecht
            </h1>
            <p className="text-gray-500 text-sm">Februar 2026 · einfach verwaltet.</p>
          </header>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">

            <p>
              Sie sind mit Ihrer Hausverwaltung unzufrieden — nicht erreichbar, Abrechnungen
              fehlerhaft, Reparaturen werden verschleppt. Der Wunsch nach einem Wechsel
              ist verständlich. Aber wie kündigen Sie den Verwaltervertrag rechtssicher?
              Welche Fristen gelten? Und was passiert mit den Unterlagen?
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Zwei Rechtsverhältnisse — eine wichtige Unterscheidung
            </h2>
            <p>
              Bei der Hausverwaltung existieren grundsätzlich zwei getrennte Rechtsverhältnisse:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Das Bestellungsverhältnis</strong> (Bestellung zum Verwalter durch
                Eigentümerbeschluss — bei WEG nach §26 WEG)
              </li>
              <li>
                <strong>Der Verwaltervertrag (Dienstverhältnis)</strong> — regelt die
                konkreten Pflichten, Vergütung und Kündigungsmodalitäten
              </li>
            </ul>
            <p>
              Bei der WEG-Verwaltung müssen beide Verhältnisse beendet werden. Bei der
              Mietverwaltung (Verwaltung von Mietobjekten durch einen Privateigentümer)
              gibt es nur den Verwaltervertrag.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Kündigung bei der WEG-Verwaltung: §26 WEG
            </h2>
            <p>
              Bei Wohnungseigentümergemeinschaften regelt §26 WEG die Abberufung des
              Verwalters:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Die <strong>Amtszeit des Verwalters</strong> beträgt maximal 5 Jahre,
                bei einer Erstbestellung 3 Jahre (§26 Abs. 1 WEG)
              </li>
              <li>
                Die Eigentümerversammlung kann den Verwalter jederzeit durch
                <strong> einfachen Mehrheitsbeschluss abberufen</strong>
              </li>
              <li>
                Der zugrundeliegende Dienstvertrag kann aber noch bis zu{" "}
                <strong>6 Monate nach der Abberufung</strong> weiterlaufen, wenn er
                nicht gleichzeitig gekündigt wird
              </li>
            </ul>
            <p>
              <strong>Wichtig:</strong> Beschließen Sie bei der Eigentümerversammlung
              sowohl die Abberufung des Verwalters als auch die Kündigung des
              Verwaltervertrags — idealerweise zeitgleich.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Kündigung bei der Mietverwaltung: §621 BGB
            </h2>
            <p>
              Für die Kündigung eines Mietverwaltungsvertrags gilt grundsätzlich §621 BGB
              (Kündigung bei Dienstverhältnissen mit Zeitabschnitten). Bei monatlicher
              Vergütung ist eine Kündigung mit einer Frist von{" "}
              <strong>einem Monat zum Monatsende</strong> möglich — sofern der Vertrag
              keine längere Frist vorsieht.
            </p>
            <p>
              In der Praxis enthalten Verwalterverträge oft abweichende Regelungen:
              Kündigungsfristen von 3–6 Monaten und Mindestlaufzeiten von 1–3 Jahren
              sind üblich. Prüfen Sie Ihren Vertrag sorgfältig.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Außerordentliche Kündigung: Wann ist sie möglich?
            </h2>
            <p>
              Eine fristlose Kündigung aus wichtigem Grund nach §626 BGB ist möglich, wenn
              das Vertrauensverhältnis irreparabel gestört ist. Anerkannte wichtige Gründe:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Veruntreuung von Hausgeld oder Rücklagen</li>
              <li>Systematische Verletzung der Verwalterpflichten trotz Abmahnung</li>
              <li>Strafbare Handlungen gegen die Gemeinschaft</li>
              <li>Grobe Pflichtverletzungen (z.B. keine Betriebskostenabrechnung seit Jahren)</li>
              <li>Insolvenz des Verwalters</li>
            </ul>
            <p>
              Dokumentieren Sie den wichtigen Grund sorgfältig — Schriftverkehr, E-Mails,
              Protokolle. Im Streitfall müssen Sie die Voraussetzungen der fristlosen
              Kündigung nachweisen.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Schritt-für-Schritt: So kündigen Sie den Verwaltervertrag
            </h2>

            <div className="space-y-4">
              {[
                {
                  step: "1",
                  title: "Verwaltervertrag prüfen",
                  text: "Lesen Sie den bestehenden Vertrag vollständig. Achten Sie auf Kündigungsfristen, Mindestlaufzeiten und eventuelle Verlängerungsklauseln.",
                },
                {
                  step: "2",
                  title: "Neuen Verwalter auswählen",
                  text: "Wählen Sie den neuen Verwalter vor der Kündigung. So gibt es keine Lücke in der Verwaltung. Achten Sie auf §34c GewO-Genehmigung.",
                },
                {
                  step: "3",
                  title: "Kündigung formulieren und versenden",
                  text: "Kündigen Sie schriftlich per Einschreiben mit Rückschein. Nennen Sie Datum, Kündigungsfrist und — bei außerordentlicher Kündigung — den wichtigen Grund.",
                },
                {
                  step: "4",
                  title: "Unterlagenübergabe anfordern",
                  text: "Fordern Sie alle Verwaltungsunterlagen schriftlich an: Mietverträge, Abrechnungen, Kontoauszüge, Handwerkerverträge, Schlüssel, Versicherungsunterlagen.",
                },
                {
                  step: "5",
                  title: "Mieter informieren",
                  text: "Informieren Sie alle Mieter schriftlich über den Wechsel — neue Ansprechperson, neue Bankverbindung für die Miete, neuer Notfallkontakt.",
                },
              ].map(({ step, title, text }) => (
                <div key={step} className="flex gap-4 p-4 border border-gray-200 rounded-xl">
                  <div className="w-8 h-8 bg-teal text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {step}
                  </div>
                  <div>
                    <div className="font-bold text-navy mb-1">{title}</div>
                    <p className="text-sm text-gray-600">{text}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Muster-Kündigung: Verwaltervertrag
            </h2>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 font-mono text-sm text-gray-700 space-y-3">
              <p>[Ihr Name / Eigentümergemeinschaft]</p>
              <p>[Adresse]</p>
              <p className="mt-4">[Name der Hausverwaltung]</p>
              <p>[Adresse der Hausverwaltung]</p>
              <p className="mt-4">Datum: [TT.MM.JJJJ]</p>
              <p className="mt-4 font-bold">
                Kündigung des Verwaltervertrags für [Objektadresse]
              </p>
              <p className="mt-4">
                Sehr geehrte Damen und Herren,
              </p>
              <p>
                hiermit kündigen wir den Verwaltervertrag vom [Datum des Vertrags]
                für das oben genannte Objekt fristgerecht zum [Kündigungsdatum].
              </p>
              <p>
                Wir bitten Sie, uns alle Verwaltungsunterlagen, Originalbelege,
                Schlüssel und sonstigen objektbezogenen Dokumente bis spätestens
                [Datum] zu übergeben.
              </p>
              <p>
                Mit freundlichen Grüßen,
              </p>
              <p>[Unterschrift]</p>
            </div>

            {/* FAQ Section */}
            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-6">
              Häufige Fragen zur Kündigung des Verwaltervertrags
            </h2>

            <div className="space-y-6">
              {[
                {
                  q: "Welche Kündigungsfristen gelten für den Verwaltervertrag?",
                  a: "Bei der WEG-Verwaltung kann die Eigentümerversammlung den Verwalter jederzeit abberufen. Der Dienstvertrag läuft jedoch bis zu 6 Monate weiter. Bei der Mietverwaltung gilt §621 BGB: meist 1 Monat zum Monatsende, wenn vertraglich nicht anders geregelt. Viele Verträge sehen 3–6 Monate vor.",
                },
                {
                  q: "Kann ich den Verwaltervertrag außerordentlich kündigen?",
                  a: "Ja, bei wichtigem Grund nach §626 BGB — z.B. Veruntreuung, systematische Pflichtverletzung oder Insolvenz. Die Kündigung ist sofort wirksam, muss aber gut dokumentiert sein.",
                },
                {
                  q: "Welche Unterlagen muss der alte Verwalter übergeben?",
                  a: "Alle objektbezogenen Unterlagen: Mietverträge, Betriebskostenabrechnungen, Kontoauszüge, Korrespondenz, Handwerkerverträge, Schlüsselliste, Versicherungsunterlagen. Bei Weigerung besteht ein gerichtlich durchsetzbarer Herausgabeanspruch.",
                },
                {
                  q: "Wie lange dauert ein Verwalterwechsel?",
                  a: "In der Regel 4–12 Wochen — abhängig von der Kündigungsfrist und der Kooperationsbereitschaft des alten Verwalters. Ein guter neuer Verwalter übernimmt die Koordination.",
                },
              ].map(({ q, a }) => (
                <div key={q} className="border border-gray-200 rounded-xl p-5">
                  <h3 className="font-bold text-navy mb-2">{q}</h3>
                  <p className="text-gray-600 text-sm">{a}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="bg-navy text-white rounded-2xl p-8 mt-10 text-center">
              <h3 className="text-xl font-bold font-playfair mb-3">
                Wechsel zu einfach verwaltet. — wir machen das für Sie
              </h3>
              <p className="text-white/80 mb-6 text-sm">
                Kündigung, Dokumentenübergabe, Mieterinformation — wir begleiten Sie
                durch den kompletten Verwalterwechsel. Kostenlos und ohne Risiko.
              </p>
              <Link
                href="/anfrage"
                className="inline-block bg-teal hover:bg-teal/90 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                Jetzt Wechsel anfragen →
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
