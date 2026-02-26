import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Mietvertrag kündigen Hamburg: Fristen und Voraussetzungen nach § 573 BGB | einfach verwaltet.",
  description:
    "Mietvertrag kündigen Hamburg: Kündigungsgründe, Fristen, Eigenbedarfskündigung und Widerspruchsrecht des Mieters — rechtssicher erklärt.",
  keywords:
    "Mietvertrag kündigen Hamburg, Kündigung Mietvertrag Vermieter, Eigenbedarfskündigung Hamburg, Kündigung § 573 BGB",
  openGraph: {
    title: "Mietvertrag kündigen Hamburg: Fristen und Voraussetzungen nach § 573 BGB",
    description:
      "Was Vermieter in Hamburg bei einer Kündigung beachten müssen — von der Begründung bis zur Kündigungsfrist.",
    url: "https://einfach-verwaltet.de/blog/mietvertrag-kuendigen-hamburg",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Mietvertrag kündigen Hamburg: Fristen und Voraussetzungen nach § 573 BGB",
  description:
    "Kündigungsgründe, Fristen, Eigenbedarfskündigung und Widerspruchsrecht — ein Leitfaden für Vermieter in Hamburg.",
  author: { "@type": "Organization", name: "einfach verwaltet." },
  publisher: {
    "@type": "Organization",
    name: "einfach verwaltet.",
    logo: { "@type": "ImageObject", url: "https://einfach-verwaltet.de/logo.png" },
  },
  datePublished: "2026-02-01",
  inLanguage: "de",
  url: "https://einfach-verwaltet.de/blog/mietvertrag-kuendigen-hamburg",
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
            <span className="text-gray-700">Mietvertrag kündigen Hamburg</span>
          </nav>

          <header className="mb-10">
            <p className="text-teal text-sm font-semibold uppercase tracking-wider mb-3">
              Ratgeber · 8 min Lesezeit
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-navy font-playfair mb-4 leading-tight">
              Mietvertrag kündigen in Hamburg: Fristen und Voraussetzungen nach § 573 BGB
            </h1>
            <p className="text-gray-500 text-sm">Februar 2026 · einfach verwaltet.</p>
          </header>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">

            <p>
              Eine Kündigung des Mietverhältnisses durch den Vermieter ist in Deutschland an strenge
              Voraussetzungen geknüpft. Anders als beim Mieter braucht der Vermieter stets einen gesetzlich
              anerkannten Grund. Wer diese Regeln nicht kennt, riskiert eine unwirksame Kündigung — und im
              schlimmsten Fall eine jahrelange Auseinandersetzung vor Gericht.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Grundprinzip: Vermieter braucht berechtigtes Interesse
            </h2>
            <p>
              Nach <strong>§ 573 Abs. 1 BGB</strong> kann der Vermieter nur dann ordentlich kündigen, wenn
              er ein <em>berechtigtes Interesse</em> an der Beendigung des Mietverhältnisses hat. Das Gesetz
              nennt drei anerkannte Fälle:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Pflichtverletzung des Mieters</strong> (§ 573 Abs. 2 Nr. 1 BGB): z. B. erheblicher
                Zahlungsverzug, wiederholte Ruhestörung, unerlaubte Untervermietung
              </li>
              <li>
                <strong>Eigenbedarf</strong> (§ 573 Abs. 2 Nr. 2 BGB): Vermieter oder nahe Familienangehörige
                benötigen die Wohnung zur eigenen Nutzung
              </li>
              <li>
                <strong>Verwertungskündigung</strong> (§ 573 Abs. 2 Nr. 3 BGB): wirtschaftliche Verwertung
                des Grundstücks ist ohne Kündigung nicht möglich und würde erhebliche Nachteile bedeuten
              </li>
            </ul>
            <p>
              Eine Kündigung ohne anerkannten Grund — etwa weil der Vermieter einen zahlungskräftigeren
              Mieter bevorzugt — ist unwirksam.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Kündigungsfristen: Was gilt in Hamburg?
            </h2>
            <p>
              Die gesetzlichen Kündigungsfristen richten sich nach der Mietdauer (§ 573c BGB):
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Bis 5 Jahre Mietdauer:</strong> 3 Monate Kündigungsfrist</li>
              <li><strong>5 bis 8 Jahre:</strong> 6 Monate Kündigungsfrist</li>
              <li><strong>Mehr als 8 Jahre:</strong> 9 Monate Kündigungsfrist</li>
            </ul>
            <p>
              Die Kündigung muss dem Mieter <strong>spätestens am dritten Werktag eines Monats</strong> zugehen,
              damit dieser Monat als erster Kündigungsmonat zählt. Geht die Kündigung später zu, beginnt die
              Frist erst im Folgemonat.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Eigenbedarfskündigung: Häufig genutzt, oft fehlerhaft
            </h2>
            <p>
              Die Eigenbedarfskündigung ist der häufigste Kündigungsgrund für Privatvermieter. Sie ist aber
              auch besonders fehleranfällig. Folgendes muss zwingend beachtet werden:
            </p>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-3">
              Konkrete Begründung erforderlich
            </h3>
            <p>
              Die Kündigung muss den Eigenbedarfsgrund <em>konkret</em> benennen: Name der Person, Verwandtschaftsverhältnis,
              Wohnungsbedarf und Grund. Eine pauschale Formulierung wie &bdquo;ich benötige die Wohnung
              selbst&ldquo; genügt nicht. Hamburger Gerichte legen hier strenge Maßstäbe an.
            </p>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-3">
              Vorgetäuschter Eigenbedarf hat Konsequenzen
            </h3>
            <p>
              Wer Eigenbedarf nur vorschützt, um einen Mieter loszuwerden, und die Wohnung danach anderweitig
              nutzt oder vermietet, macht sich schadensersatzpflichtig. Der Mieter kann Umzugskosten,
              Mietdifferenz und immateriellen Schaden geltend machen.
            </p>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-3">
              Soziale Härteklausel (§ 574 BGB)
            </h3>
            <p>
              Der Mieter kann der Kündigung widersprechen, wenn sie für ihn eine <em>unzumutbare Härte</em>
              bedeutet — etwa hohes Alter, schwere Krankheit oder fehlende Ersatzwohnung auf dem Hamburger
              Wohnungsmarkt. In diesen Fällen entscheidet das Gericht, ob und zu welchem Zeitpunkt der Mieter
              ausziehen muss.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Fristlose Kündigung: Nur bei schwerem Verstoß
            </h2>
            <p>
              Eine außerordentliche fristlose Kündigung ist nach <strong>§ 543 BGB</strong> möglich, wenn dem
              Vermieter die Fortsetzung des Mietverhältnisses unzumutbar ist. Klassische Fälle:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Zahlungsverzug mit mindestens zwei Monatsmieten (§ 543 Abs. 2 Nr. 3 BGB)
              </li>
              <li>Erhebliche Beschädigung der Mietsache</li>
              <li>Unerlaubte Untervermietung trotz Abmahnung</li>
            </ul>
            <p>
              Auch die fristlose Kündigung muss schriftlich erfolgen und den Kündigungsgrund klar benennen.
              Empfehlenswert ist, gleichzeitig eine <em>hilfsweise ordentliche Kündigung</em> auszusprechen,
              falls die fristlose Kündigung scheitert.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Form und Zugang: Auf diese Details kommt es an
            </h2>
            <p>
              Jede Kündigung muss <strong>schriftlich</strong> erfolgen und <strong>eigenhändig
              unterschrieben</strong> sein (§ 568 BGB). Eine E-Mail oder WhatsApp-Nachricht genügt nicht.
              Der Zugang beim Mieter muss nachgewiesen werden können — per Einwurf-Einschreiben oder durch
              persönliche Übergabe mit Zeugen.
            </p>
            <p>
              In Mehrfamilienhäusern mit mehreren Mietern müssen <em>alle</em> im Mietvertrag genannten
              Mieter die Kündigung erhalten. Wird ein Mieter vergessen, ist die Kündigung unwirksam.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Fazit: Ohne Begründung keine wirksame Kündigung
            </h2>
            <p>
              Der Mieterschutz in Deutschland ist stark — und das zu Recht. Als Vermieter kommen Sie an
              einer sorgfältigen, rechtssicheren Begründung nicht vorbei. Fristen präzise einhalten,
              Kündigungsgrund konkret formulieren und den Zugang lückenlos dokumentieren: Das sind die drei
              Grundpfeiler einer wirksamen Vermieterkündigung in Hamburg.
            </p>

          </div>

          {/* CTA */}
          <div className="mt-14 bg-teal/10 border border-teal/20 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-navy mb-3 font-playfair">
              Rechtssichere Mietverhältnisse — ohne Kopfzerbrechen
            </h2>
            <p className="text-gray-600 mb-6">
              Wir begleiten Sie durch kritische Mietverhältnisse, übernehmen die Kommunikation und sorgen
              für dokumentationssichere Prozesse — von der Mahnung bis zur Übergabe.
            </p>
            <Link
              href="/anfrage"
              className="inline-block bg-teal text-white font-semibold px-8 py-3 rounded-lg hover:bg-teal/90 transition-colors"
            >
              Jetzt unverbindlich anfragen
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
