import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Hausverwaltung kündigen: Fristen, Muster & Was dann? (2026) | einfach verwaltet.",
  description:
    "Hausverwaltung kündigen 2026: §26 WEG Abberufung, Verwaltervertrag kündigen, Fristen, Musterschreiben und Übergabe-Prozess erklärt.",
  keywords:
    "hausverwaltung kündigen frist, hausverwalter abberufen, verwaltervertrag kündigen, §26 WEG",
  openGraph: {
    title: "Hausverwaltung kündigen: Fristen, Muster & Was dann? (2026)",
    description:
      "§26 WEG Abberufung, Kündigungsfristen, Musterschreiben und Übergabe-Prozess — der komplette Leitfaden.",
    url: "https://einfach-verwaltet.de/blog/hausverwaltung-kuendigen-frist",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "article",
  },
};

const jsonLdArticle = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Hausverwaltung kündigen: Fristen, Muster & Was dann? (2026)",
  description:
    "Alles zur Kündigung und Abberufung der Hausverwaltung: §26 WEG, Verwaltervertrag, Kündigungsfristen, Musterschreiben und geordnete Übergabe.",
  author: { "@type": "Organization", name: "einfach verwaltet." },
  publisher: {
    "@type": "Organization",
    name: "einfach verwaltet.",
    logo: { "@type": "ImageObject", url: "https://einfach-verwaltet.de/logo.png" },
  },
  datePublished: "2026-02-26",
  inLanguage: "de",
  url: "https://einfach-verwaltet.de/blog/hausverwaltung-kuendigen-frist",
};

const jsonLdFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Kann ein WEG-Verwalter jederzeit abberufen werden?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Nach §26 Abs. 3 WEG kann die Eigentümerversammlung den Verwalter jederzeit durch Mehrheitsbeschluss abberufen. Die Abberufung als Organamt erfolgt sofort, der Verwaltervertrag endet jedoch frühestens nach der vereinbarten Kündigungsfrist.",
      },
    },
    {
      "@type": "Question",
      name: "Welche Kündigungsfristen gelten beim Verwaltervertrag?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die Kündigungsfrist des Verwaltervertrags ist frei verhandelbar. Üblich sind 3-6 Monate zum Vertragsende. Bei Abberufung aus wichtigem Grund nach §26 Abs. 3 WEG kann der Vertrag auch fristlos beendet werden.",
      },
    },
    {
      "@type": "Question",
      name: "Was muss der alte Verwalter bei der Übergabe herausgeben?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Der ausscheidende Verwalter ist nach §27 Abs. 1 Nr. 8 WEG verpflichtet, alle Unterlagen der Gemeinschaft herauszugeben: Beschlusssammlung, Kontoauszüge, Vertragsunterlagen, Rücklagensaldo, laufende Korrespondenz und alle weiteren verwaltungsrelevanten Dokumente.",
      },
    },
  ],
};

export default function Post() {
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
      <main className="bg-warm-white min-h-screen pt-16">
        <article className="max-w-3xl mx-auto px-4 py-16">
          <nav className="text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-teal">Startseite</Link>
            <span className="mx-2">›</span>
            <Link href="/blog" className="hover:text-teal">Ratgeber</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-700">Hausverwaltung kündigen</span>
          </nav>

          <header className="mb-10">
            <p className="text-teal text-sm font-semibold uppercase tracking-wider mb-3">
              Ratgeber · 8 min Lesezeit
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-navy font-playfair mb-4 leading-tight">
              Hausverwaltung kündigen: Fristen, Muster &amp; Was dann? (2026)
            </h1>
            <p className="text-gray-500 text-sm">Februar 2026 · einfach verwaltet.</p>
          </header>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <p>
              Die Kündigung einer Hausverwaltung ist ein zweistufiger Prozess: Erst wird der Verwalter als Organ der WEG abberufen, dann wird der zugrundeliegende Verwaltervertrag gekündigt. Wer diese Unterscheidung nicht versteht, riskiert teure Fehler — oder zahlt weiterlaufende Vertragsgebühren, obwohl längst ein neuer Verwalter tätig ist.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Schritt 1: Abberufung nach §26 WEG
            </h2>
            <p>
              Die Abberufung des Verwalters ist ein Beschluss der Eigentümerversammlung. Nach §26 Abs. 3 WEG kann die WEG den Verwalter jederzeit durch einfachen Mehrheitsbeschluss abberufen — einen wichtigen Grund brauchen Sie dafür nicht.
            </p>
            <p className="bg-teal/10 border-l-4 border-teal p-4 rounded">
              <strong>Rechtswirkung:</strong> Mit der Abberufung verliert der Verwalter sofort seine Organstellung. Er darf keine Verwaltungshandlungen mehr vornehmen — außer in dringenden Notfällen zur Schadensabwehr.
            </p>
            <p>
              Wichtig: Die Abberufung auf der ETV und der Beschluss über die Neuwahl eines Nachfolgers sollten im selben Tagesordnungspunkt behandelt werden, um eine Verwaltungsunterbrechung zu vermeiden.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Schritt 2: Kündigung des Verwaltervertrags
            </h2>
            <p>
              Neben der Abberufung als Organ muss der Verwaltervertrag separat gekündigt werden. Die Kündigungsfrist richtet sich nach den Vertragsbedingungen:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Ordentliche Kündigung:</strong> Frist aus dem Verwaltervertrag (typisch: 3–6 Monate zum Jahresende)</li>
              <li><strong>Außerordentliche Kündigung:</strong> Bei wichtigem Grund fristlos möglich (§626 BGB analog)</li>
              <li><strong>Auslaufen lassen:</strong> Wenn der Vertrag befristet ist, läuft er zum Ende der Laufzeit aus</li>
            </ul>
            <p className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
              <strong>Achtung:</strong> Wird der Verwaltervertrag nicht explizit gekündigt, kann der abberufene Verwalter trotz fehlender Organstellung Vergütungsansprüche für die laufende Restlaufzeit haben.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Wichtige Gründe für eine fristlose Abberufung
            </h2>
            <p>
              Wenn ein wichtiger Grund vorliegt, ist eine sofortige Abberufung und fristlose Kündigung möglich. Anerkannte wichtige Gründe sind:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Veruntreuung von Gemeinschaftsgeldern oder Rücklagen</li>
              <li>Schwerwiegende Pflichtverletzungen (z.B. jahrelange Missachtung von Instandhaltungspflichten)</li>
              <li>Vertrauensverlust durch strafbares Verhalten</li>
              <li>Dauerhafter Interessenkonflikt (z.B. gleichzeitige Tätigkeit für konkurrierende WEG)</li>
              <li>Schwerwiegende Verstöße gegen Beschlüsse der Eigentümerversammlung</li>
            </ul>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Musterschreiben: Abberufung und Vertragskündigung
            </h2>
            <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg font-mono text-sm">
              <p className="font-bold mb-4">Beschlussantrag für die Eigentümerversammlung</p>
              <p>TOP [X]: Abberufung des Verwalters und Kündigung des Verwaltervertrags</p>
              <p className="mt-3">Die Eigentümerversammlung beschließt:</p>
              <p className="mt-2">1. Die [Firma Verwalter GmbH] wird als Verwalter der WEG [Adresse] mit sofortiger Wirkung abberufen.</p>
              <p className="mt-2">2. Der Verwaltervertrag vom [Datum] wird hiermit ordentlich zum [Datum] / außerordentlich fristlos aus wichtigem Grund gekündigt.</p>
              <p className="mt-2">3. Als neuer Verwalter wird [Neue Firma] bestellt.</p>
              <p className="mt-4 italic">Abstimmung: [Ja-Stimmen / Nein-Stimmen / Enthaltungen]</p>
            </div>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Der Übergabe-Prozess: Was muss herausgegeben werden?
            </h2>
            <p>
              Nach der Abberufung ist der ausscheidende Verwalter nach §27 Abs. 1 Nr. 8 WEG zur Herausgabe aller Unterlagen verpflichtet. Eine vollständige Übergabe umfasst:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Beschlusssammlung:</strong> Alle Beschlüsse der WEG seit Gründung</li>
              <li><strong>Finanzen:</strong> Kontoauszüge, Jahresabrechnungen, Rücklagensaldo</li>
              <li><strong>Vertragsunterlagen:</strong> Versicherungen, Wartungsverträge, Dienstleister</li>
              <li><strong>Korrespondenz:</strong> Laufende Mieterposts, Behördenkorrespondenz, Mahnungen</li>
              <li><strong>Schlüssel und Zugänge:</strong> Alle physischen Schlüssel und digitalen Zugangsdaten</li>
              <li><strong>Objektunterlagen:</strong> Baupläne, Grundbuchauszüge, Teilungserklärung</li>
            </ul>
            <p>
              Verweigert der alte Verwalter die Herausgabe, kann die WEG per einstweiliger Verfügung die Übergabe erzwingen.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Checkliste: Verwalterwechsel Schritt für Schritt
            </h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Verwaltervertrag prüfen: Laufzeit, Kündigungsfristen, Klauseln</li>
              <li>ETV einberufen (Einladungsfrist 2 Wochen beachten)</li>
              <li>TOP: Abberufung + Kündigung + Neuwahl auf die Tagesordnung</li>
              <li>Beschluss mit einfacher Mehrheit fassen</li>
              <li>Schriftliche Kündigung an alten Verwalter senden (eingeschrieben)</li>
              <li>Übergabe-Termin vereinbaren (Frist: spätestens 2 Wochen nach Abberufung)</li>
              <li>Übergabeprotokoll erstellen und von beiden Seiten unterschreiben</li>
              <li>Bankkonten auf neuen Verwalter umschreiben</li>
              <li>Alle Dienstleister über Verwalterwechsel informieren</li>
            </ol>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Was passiert nach der Übergabe?
            </h2>
            <p>
              Nach einer erfolgreichen Übergabe übernimmt der neue Verwalter sofort alle laufenden Aufgaben. In den ersten 30 Tagen sollte er:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Alle laufenden Verträge und Versicherungen prüfen</li>
              <li>Zustand des Gemeinschaftseigentums begehen</li>
              <li>Offene Forderungen und Verbindlichkeiten identifizieren</li>
              <li>Erste Eigentümerversammlung zur Festlegung der nächsten Schritte planen</li>
            </ul>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Fazit: Verwalterwechsel ist machbar — mit dem richtigen Prozess
            </h2>
            <p>
              Die Kündigung einer Hausverwaltung erfordert Sorgfalt und die Einhaltung rechtlicher Formvorschriften. Wer die zweistufige Struktur aus Abberufung und Vertragskündigung versteht und den Übergabe-Prozess strukturiert abwickelt, kann einen Verwalterwechsel reibungslos vollziehen.
            </p>
          </div>

          <div className="mt-12 bg-teal/10 border border-teal/20 rounded-xl p-8">
            <h3 className="text-xl font-bold text-navy mb-2 font-playfair">
              Hausverwaltung wechseln — wir machen es einfach
            </h3>
            <p className="text-gray-600 mb-4">
              einfach verwaltet. übernimmt die komplette Übergabe von Ihrem alten Verwalter: Beschlusssammlung, Finanzunterlagen, Verträge — strukturiert, vollständig, reibungslos.
            </p>
            <Link
              href="/anfrage"
              className="inline-block bg-teal text-white font-semibold px-6 py-3 rounded-lg hover:bg-teal/90 transition-colors"
            >
              Verwalterwechsel anfragen
            </Link>
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
