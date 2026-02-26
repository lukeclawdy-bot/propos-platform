import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Mieterhöhung Hamburg 2026: Was erlaubt §558 BGB? | einfach verwaltet.",
  description:
    "Mieterhöhung in Hamburg 2026: Was dürfen Vermieter nach §558 BGB verlangen? Mietspiegel, Kappungsgrenze, Mietpreisbremse – alles Wichtige im Überblick.",
  keywords:
    "Mieterhöhung Hamburg 2026, Mieterhöhung §558 BGB, Kappungsgrenze Hamburg, Hamburger Mietspiegel",
  openGraph: {
    title: "Mieterhöhung Hamburg 2026: Was ist nach §558 BGB erlaubt?",
    description:
      "Kappungsgrenze 15%, Hamburger Mietspiegel, 15-Monats-Sperrfrist — alles zur rechtssicheren Mieterhöhung.",
    url: "https://einfach-verwaltet.de/blog/mieterhohung-hamburg-2026",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Mieterhöhung in Hamburg 2026: Was ist nach §558 BGB erlaubt?",
  description:
    "Alles zur Mieterhöhung in Hamburg 2026: §558 BGB, Mietspiegel, Kappungsgrenze 15%, Mietpreisbremse und 15-Monats-Sperrfrist.",
  author: { "@type": "Organization", name: "einfach verwaltet." },
  publisher: {
    "@type": "Organization",
    name: "einfach verwaltet.",
    logo: { "@type": "ImageObject", url: "https://einfach-verwaltet.de/logo.png" },
  },
  datePublished: "2026-02-01",
  inLanguage: "de",
  url: "https://einfach-verwaltet.de/blog/mieterhohung-hamburg-2026",
};

export default function Post() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="bg-warm-white min-h-screen pt-16">
        <article className="max-w-3xl mx-auto px-4 py-16">
          <nav className="text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-teal">Startseite</Link>
            <span className="mx-2">›</span>
            <Link href="/blog" className="hover:text-teal">Ratgeber</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-700">Mieterhöhung Hamburg 2026</span>
          </nav>

          <header className="mb-10">
            <p className="text-teal text-sm font-semibold uppercase tracking-wider mb-3">
              Ratgeber · 7 min Lesezeit
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-navy font-playfair mb-4 leading-tight">
              Mieterhöhung in Hamburg 2026: Was ist nach § 558 BGB erlaubt?
            </h1>
            <p className="text-gray-500 text-sm">Februar 2026 · einfach verwaltet.</p>
          </header>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Mieterhöhung: Ein Recht mit klaren Grenzen
            </h2>
            <p>
              Als Vermieter haben Sie das Recht, die Miete anzupassen — aber
              dieses Recht ist gesetzlich eng begrenzt. Wer die Regeln nicht
              kennt, riskiert, dass eine Mieterhöhung rechtlich unwirksam ist
              und das Vertrauensverhältnis mit dem Mieter beschädigt wird.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Die Rechtsgrundlage: § 558 BGB
            </h2>
            <p>
              Das Herzstück des deutschen Mieterhöhungsrechts ist § 558 BGB —
              die Vergleichsmietenerhöhung. Das Gesetz erlaubt es Vermietern,
              die Miete bis zur ortsüblichen Vergleichsmiete zu erhöhen. In
              Hamburg wird dieser Wert durch den offiziellen Hamburger
              Mietspiegel dokumentiert.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Die 15-Monats-Sperrfrist
            </h2>
            <p>
              Eine Mieterhöhung ist frühestens 15 Monate nach der letzten
              Mieterhöhung zulässig. Das Erhöhungsverlangen muss mindestens zwei
              Monate vor der gewünschten Wirksamkeit zugestellt werden.
            </p>
            <p className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
              <strong>Beispiel:</strong> Letzte Erhöhung Januar 2025 →
              nächste frühestens April 2026.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Die Kappungsgrenze: In Hamburg nur 15 % in drei Jahren
            </h2>
            <p>
              Bundesweit gilt eine Kappungsgrenze von 20 % innerhalb von drei
              Jahren. In Hamburg wurde die Kappungsgrenze durch Landesverordnung
              auf <strong>15 %</strong> abgesenkt — Hamburg gilt als Gebiet mit
              angespanntem Wohnungsmarkt.
            </p>
            <p>
              Konkret: Bei einer aktuellen Miete von 1.000 € dürfen Sie innerhalb
              von drei Jahren auf maximal 1.150 € erhöhen — auch wenn der
              Mietspiegel theoretisch mehr erlauben würde.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Die Hamburger Mietpreisbremse
            </h2>
            <p>
              Die Mietpreisbremse gilt in Hamburg flächendeckend und greift bei
              Neuvermietungen: Die Startmiete darf maximal 10 % über der
              ortsüblichen Vergleichsmiete liegen. Für laufende Mietverhältnisse
              gilt die Mietpreisbremse nicht direkt.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Der Hamburger Mietspiegel als Bezugsgröße
            </h2>
            <p>
              Für eine wirksame Mieterhöhung nach § 558 BGB müssen Sie eines der
              gesetzlich anerkannten Begründungsmittel nutzen:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Mietspiegel:</strong> Der offiziell anerkannte Hamburger
                Mietspiegel — einfachstes und rechtssicherstes Begründungsmittel.
              </li>
              <li>
                <strong>Sachverständigengutachten:</strong> Für Wohnungen, die
                im Mietspiegel nicht abgebildet sind.
              </li>
              <li>
                <strong>Vergleichswohnungen:</strong> Mindestens drei vergleichbare
                Wohnungen benennen — in der Praxis selten verwendet.
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              So formulieren Sie ein wirksames Mieterhöhungsverlangen
            </h2>
            <p>Das Erhöhungsverlangen muss schriftlich erfolgen und enthalten:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Angabe der bisherigen und der neuen Miete</li>
              <li>Begründung durch Bezug auf ein Begründungsmittel (z. B. Mietspiegel mit konkreter Zeile)</li>
              <li>Hinweis auf die Zustimmungspflicht des Mieters und die Frist</li>
            </ul>
            <p>
              Der Mieter hat zwei volle Monate nach Zugang Zeit zur Zustimmung.
              Verweigert er diese, können Sie innerhalb von drei weiteren Monaten
              auf Zustimmung klagen.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Fazit: Rechtssicher erhöhen — mit dem richtigen Prozess
            </h2>
            <p>
              Eine Mieterhöhung ist kein administrativer Selbstläufer. Fristen,
              Begründungspflichten, Kappungsgrenzen und Mietpreisbremse ergeben
              ein komplexes Regelwerk. Wer hier Fehler macht, riskiert unwirksame
              Erhöhungen und Rechtsstreitigkeiten.
            </p>
          </div>

          <div className="mt-12 bg-teal/10 border border-teal/20 rounded-xl p-8">
            <h3 className="text-xl font-bold text-navy mb-2 font-playfair">
              Mieterhöhung rechtssicher durchführen
            </h3>
            <p className="text-gray-600 mb-4">
              einfach verwaltet. übernimmt Ihre Mieterhöhung vollständig — von
              der Prüfung der Voraussetzungen über die Formulierung bis zur
              Zustellung.
            </p>
            <Link
              href="/anfrage"
              className="inline-block bg-teal text-white font-semibold px-6 py-3 rounded-lg hover:bg-teal/90 transition-colors"
            >
              Jetzt Portfolioanalyse anfordern
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
