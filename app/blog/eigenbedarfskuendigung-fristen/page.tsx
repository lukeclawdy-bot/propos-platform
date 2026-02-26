import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Eigenbedarfskündigung: Voraussetzungen und Fristen nach §573 BGB | einfach verwaltet.",
  description:
    "Eigenbedarfskündigung nach §573 BGB: Voraussetzungen, Kündigungsfristen (3/6/9 Monate), soziale Härte, berechtigtes Interesse. Was Vermieter wissen müssen.",
  keywords:
    "Eigenbedarfskündigung, §573 BGB Eigenbedarf, Kündigungsfrist Eigenbedarf, Eigenbedarfskündigung Voraussetzungen, soziale Härte Kündigung",
  openGraph: {
    title: "Eigenbedarfskündigung: Voraussetzungen und Fristen nach §573 BGB",
    description:
      "Eigenbedarf richtig kündigen: Fristen, berechtigtes Interesse, Angehörige und soziale Härte — der komplette Leitfaden.",
    url: "https://einfach-verwaltet.de/blog/eigenbedarfskuendigung-fristen",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Eigenbedarfskündigung: Voraussetzungen und Fristen nach §573 BGB",
  description:
    "Eigenbedarfskündigung nach §573 BGB: Voraussetzungen, Fristen, berechtigtes Interesse und soziale Härte.",
  author: { "@type": "Organization", name: "einfach verwaltet." },
  publisher: {
    "@type": "Organization",
    name: "einfach verwaltet.",
    logo: { "@type": "ImageObject", url: "https://einfach-verwaltet.de/logo.png" },
  },
  datePublished: "2026-02-26",
  inLanguage: "de",
  url: "https://einfach-verwaltet.de/blog/eigenbedarfskuendigung-fristen",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Welche Kündigungsfrist gilt bei Eigenbedarfskündigung?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die Kündigungsfrist bei Eigenbedarfskündigung richtet sich nach der Dauer des Mietverhältnisses: Bis 5 Jahre Mietdauer: 3 Monate, 5–8 Jahre Mietdauer: 6 Monate, Über 8 Jahre Mietdauer: 9 Monate (§573c BGB). Die Fristen gelten für Wohnraum, nicht für Gewerberaum.",
      },
    },
    {
      "@type": "Question",
      name: "Wer gilt als berechtigter Angehöriger für Eigenbedarfskündigung?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Als berechtigte Angehörige gelten nach §573 Abs. 2 Satz 1 BGB: Ehegatten oder Lebenspartner, Eltern und Kinder, Enkelkinder, Geschwister, Schwiegereltern und Schwiegerkinder. Der Angehörige muss den Bedarf tatsächlich haben — eine bloße "Vorsorgekündigung" für später ist unwirksam.",
      },
    },
    {
      "@type": "Question",
      name: "Was ist die soziale Härteklausel bei Eigenbedarfskündigung?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nach §574 BGB kann der Mieter der Kündigung widersprechen, wenn die Fortsetzung des Mietverhältnisses für ihn eine Härte bedeuten würde, die auch unter Würdigung der berechtigten Interessen des Vermieters nicht zu rechtfertigen ist. Relevant sind: Schwangerschaft, schwere Krankheit, hohes Alter, mangelnde Wohnungsversorgung am Ort, Kündigung würde Existenzgrundlage gefährden.",
      },
    },
    {
      "@type": "Question",
      name: "Welche Pflichten hat der Vermieter nach erfolgter Eigenbedarfskündigung?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Der Vermieter muss den Eigenbedarf tatsächlich realisieren — er muss selbst oder der angegebene Angehörige die Wohnung für mindestens die angemessene Dauer beziehen (in der Regel mindestens 3 Jahre). Bei Verstoß droht Schadensersatz an den gekündigten Mieter. Zudem muss der Vermieter im Kündigungsschreiben den Grund des Eigenbedarfs konkret benennen (Verwendungszweck, Name des zukünftigen Nutzers).",
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
            <span className="text-gray-700">Eigenbedarfskündigung</span>
          </nav>

          <header className="mb-10">
            <p className="text-teal text-sm font-semibold uppercase tracking-wider mb-3">
              Ratgeber · 10 min Lesezeit
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-navy font-playfair mb-4 leading-tight">
              Eigenbedarfskündigung: Voraussetzungen und Fristen nach §573 BGB
            </h1>
            <p className="text-gray-500 text-sm">Februar 2026 · einfach verwaltet.</p>
          </header>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Eigenbedarfskündigung: Eine sensible Angelegenheit
            </h2>
            <p>
              Die Eigenbedarfskündigung ist ein wichtiges Instrument für Vermieter — 
              aber auch eine Gratwanderung. Wer sie missbraucht, riskiert teure 
              Prozesse und Schadensersatzforderungen. Wer sie korrekt anwendet, kann 
              seine Immobilie für den eigenen Bedarf oder den von Angehörigen freimachen. 
              Dieser Leitfaden erklärt die Voraussetzungen, Fristen und Fallstricke 
              der Eigenbedarfskündigung nach §573 BGB.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Die Rechtsgrundlage: §573 BGB
            </h2>
            <p>
              Nach §573 Abs. 1 BGB ist die Kündigung des Mietverhältnisses über 
              Wohnraum nur zulässig, wenn ein berechtigtes Interesse des Vermieters 
              vorliegt. Ein solches berechtigtes Interesse wird in §573 Abs. 2 BGB 
              abschließend aufgezählt. Der wichtigste Grund: Der Vermieter benötigt 
              die Wohnung für sich selbst oder für Angehörige (§573 Abs. 2 Nr. 2 BGB).
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Kündigungsfristen bei Eigenbedarfskündigung
            </h2>
            <p>
              Die Kündigungsfrist richtet sich nach der Dauer des Mietverhältnisses 
              und ist in §573c BGB geregelt:
            </p>
            <div className="bg-navy/5 border border-navy/10 rounded-xl p-6">
              <h3 className="font-bold text-navy mb-3">Kündigungsfristen nach Mietdauer</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Bis 5 Jahre Mietdauer</span>
                  <span className="font-semibold">3 Monate zum Monatsende</span>
                </div>
                <div className="flex justify-between">
                  <span>5–8 Jahre Mietdauer</span>
                  <span className="font-semibold">6 Monate zum Monatsende</span>
                </div>
                <div className="flex justify-between">
                  <span>Über 8 Jahre Mietdauer</span>
                  <span className="font-semibold">9 Monate zum Monatsende</span>
                </div>
              </div>
            </div>
            <p>
              Wichtig: Die Fristen gelten für den Kündigungstermin, nicht für die 
              Zugangsfrist. Die Kündigung muss dem Mieter rechtzeitig zugehen, damit 
              sie wirksam wird. Bei einer 3-Monats-Frist muss die Kündigung also 
              spätestens am letzten Tag des Monats zugehen, der dem gewünschten 
              Beendigungsmonat um 3 Monate vorangeht.
            </p>
            <p>
              Beispiel: Möchte der Vermieter, dass das Mietverhältnis zum 31.12. 
              endet, muss die Kündigung bei 3 Monaten Frist spätestens am 30.09. 
              zugegangen sein.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Berechtigtes Interesse: Wer zählt als Angehöriger?
            </h2>
            <p>
              Der Vermieter kann nicht nur für sich selbst, sondern auch für 
              Angehörige kündigen. Nach §573 Abs. 2 Satz 1 BGB gelten als 
              berechtigte Angehörige:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Ehegatten oder eingetragene Lebenspartner</li>
              <li>Eltern (auch Pflegeeltern)</li>
              <li>Kinder (auch Pflegekinder)</li>
              <li>Enkelkinder</li>
              <li>Geschwister</li>
              <li>Schwiegereltern</li>
              <li>Schwiegerkinder</li>
            </ul>
            <p>
              Außerhalb dieses Kreises ist eine Eigenbedarfskündigung nicht 
              möglich — auch nicht für enge Freunde, Verlobte oder Partner 
              nichtehelicher Lebensgemeinschaften (sofern nicht eingetragener 
              Lebenspartnerschaft).
            </p>
            <p>
              <strong>Wichtig:</strong> Der angegebene Angehörige muss den Bedarf 
              tatsächlich haben. Eine "Vorsorgekündigung" für den Fall, dass 
              das Kind später einmal studieren möchte, ist unwirksam. Der Bedarf 
              muss bei Ausspruch der Kündigung bestehen oder unmittelbar bevorstehen.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Soziale Härte: Der Mieter kann widersprechen
            </h2>
            <p>
              Die Eigenbedarfskündigung ist nicht unwidersprechlich. Nach §574 BGB 
              kann der Mieter der Kündigung widersprechen und die Fortsetzung des 
              Mietverhältnisses verlangen, wenn die Beendigung für ihn eine Härte 
              bedeuten würde, die auch unter Würdigung der berechtigten Interessen 
              des Vermieters nicht zu rechtfertigen ist.
            </p>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              Härtegründe, die relevant sein können
            </h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Schwangerschaft:</strong> Eine schwangere Mieterin hat 
                besonderen Schutz.
              </li>
              <li>
                <strong>Schwere Krankheit:</strong> Umzug würde die medizinische 
                Versorgung gefährden.
              </li>
              <li>
                <strong>Hohes Alter:</strong> Ältere Mieter haben oft Schwierigkeiten, 
                eine neue angemessene Wohnung zu finden.
              </li>
              <li>
                <strong>Mangelnde Wohnungsversorgung:</strong> Am Wohnort gibt es 
                kaum freie Wohnungen.
              </li>
              <li>
                <strong>Existenzgefährdung:</strong> Der Umzug würde die berufliche 
                oder wirtschaftliche Existenz gefährden.
              </li>
              <li>
                <strong>Behinderung:</strong> Barrierefreie Alternativwohnungen 
                sind nicht verfügbar.
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              Abwägung der Interessen
            </h3>
            <p>
              Das Gericht wägt die Interessen des Vermieters (Eigenbedarf) gegen 
              die Interessen des Mieters (Härte) ab. Dabei spielen die Intensität 
              des Bedarfs, die Dringlichkeit und die Verhältnismäßigkeit eine Rolle.
            </p>
            <p>
              Beispiel: Der Vermieter möchte die Wohnung für seine Tochter, die in 
              die Stadt zum Studium zieht. Der Mieter ist 75 Jahre alt, hat die 
              Wohnung 20 Jahre bewohnt und findet aufgrund des angespannten 
              Wohnungsmarktes keine angemessene Ersatzwohnung. Hier könnte die 
              soziale Härte des Mieters schwerer wiegen als der Eigenbedarf der 
              Tochter — zumal diese theoretisch auch andere Wohnmöglichkeiten hat.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Formvorschriften: Was muss im Kündigungsschreiben stehen?
            </h2>
            <p>
              Eine Eigenbedarfskündigung muss bestimmte formale Anforderungen erfüllen, 
              um wirksam zu sein:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Bestimmtheit des Grundes:</strong> Der Vermieter muss den 
                Grund des Eigenbedarfs konkret benennen. Es reicht nicht "Eigenbedarf" 
                zu schreiben. Notwendig ist: "Ich benötige die Wohnung für mich selbst" 
                oder "Ich benötige die Wohnung für meine Tochter [Name], die zum 
                Studium nach Hamburg zieht."
              </li>
              <li>
                <strong>Verwendungszweck:</strong> Es muss klar sein, für wen der 
                Bedarf besteht und zu welchem Zweck die Wohnung genutzt werden soll.
              </li>
              <li>
                <strong>Schriftform:</strong> Die Kündigung muss schriftlich erfolgen 
                (§568 BGB). E-Mail oder Textnachricht reichen nicht aus.
              </li>
              <li>
                <strong>Zugang:</strong> Die Kündigung muss dem Mieter zugehen. 
                Einschreiben mit Rückschein ist empfohlen.
              </li>
              <li>
                <strong>Belehrung:</strong> Der Vermieter sollte den Mieter auf 
                das Widerspruchsrecht nach §574 BGB hinweisen.
              </li>
            </ol>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Pflichten des Vermieters nach erfolgter Kündigung
            </h2>
            <p>
              Wer erfolgreich eigenbedarfsgekündigt hat, hat weitere Pflichten:
            </p>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              Tatsächlicher Bezug
            </h3>
            <p>
              Der Vermieter (oder der angegebene Angehörige) muss die Wohnung 
              tatsächlich beziehen. Eine Weitervermietung, ein Leerstand oder 
              eine Nutzung zu anderen Zwecken widersprechen dem Eigenbedarf 
              und können Schadensersatzansprüche des gekündigten Mieters 
              auslösen.
            </p>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              Angemessene Nutzungsdauer
            </h3>
            <p>
              Der Vermieter muss die Wohnung für eine angemessene Zeit selbst 
              nutzen. Was "angemessen" ist, hängt von den Umständen ab. Als 
              Faustregel gilt: Mindestens 3 Jahre sollte die Wohnung für den 
              Eigenbedarf genutzt werden. Bei kürzerer Nutzung droht der 
              Verdacht der Scheinkündigung.
            </p>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              Beweispflicht
            </h3>
            <p>
              Im Streitfall muss der Vermieter den Eigenbedarf beweisen. Das 
              bedeutet: Nachweis über den tatsächlichen Bezug, ggf. Meldebescheinigung, 
              Umzugsunterlagen. Wer keine Beweise hat, riskiert die Unterliegen 
              im Prozess.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Häufige Fehler und Fallstricke
            </h2>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              Fehler 1: Vorsorgekündigung
            </h3>
            <p>
              Der Eigenbedarf muss bei Ausspruch der Kündigung bestehen oder 
              unmittelbar bevorstehen. Wer "vorsorglich" kündigt, weil das 
              Kind vielleicht in zwei Jahren studieren möchte, handelt unwirksam.
            </p>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              Fehler 2: Unzureichende Begründung
            </h3>
            <p>
              "Ich benötige die Wohnung für Eigenbedarf" reicht nicht. Name 
              des Bedürftigen, Verwendungszweck und Art des Bedarfs müssen 
              klar erkennbar sein.
            </p>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              Fehler 3: Falsche Personenkreise
            </h3>
            <p>
              Für Freunde, Verlobte oder nicht eingetragene Partner kann nicht 
              eigenbedarfsgekündigt werden. Nur die in §573 Abs. 2 Satz 1 BGB 
              genannten Angehörigen qualifizieren sich.
            </p>

            <h3 className="text-xl font-semibold text-navy mt-6 mb-2">
              Fehler 4: Kein tatsächlicher Bezug
            </h3>
            <p>
              Wer kündigt und die Wohnung dann nicht bezieht, begeht eine 
              Scheinkündigung. Das kann Schadensersatz in Höhe der Differenzmiete 
              für die verlorene Wohnung bedeuten.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              FAQ: Eigenbedarfskündigung
            </h2>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-navy mb-2">
                  Welche Kündigungsfrist gilt bei Eigenbedarfskündigung?
                </h3>
                <p className="text-sm">
                  3 Monate (bis 5 Jahre Mietdauer), 6 Monate (5–8 Jahre), 
                  9 Monate (über 8 Jahre) zum Monatsende nach §573c BGB.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-navy mb-2">
                  Wer gilt als berechtigter Angehöriger?
                </h3>
                <p className="text-sm">
                  Ehegatten/Lebenspartner, Eltern, Kinder, Enkel, Geschwister, 
                  Schwiegereltern und Schwiegerkinder nach §573 Abs. 2 Satz 1 BGB.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-navy mb-2">
                  Was ist die soziale Härteklausel?
                </h3>
                <p className="text-sm">
                  Nach §574 BGB kann der Mieter widersprechen, wenn die Kündigung 
                  eine unzumutbare Härte bedeuten würde (Schwangerschaft, Krankheit, 
                  hohes Alter, mangelnde Wohnungsversorgung).
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-navy mb-2">
                  Welche Pflichten hat der Vermieter nach der Kündigung?
                </h3>
                <p className="text-sm">
                  Tatsächlicher Bezug der Wohnung für mindestens 3 Jahre, 
                  keine Weitervermietung, Beweispflicht über den tatsächlichen 
                  Eigenbedarf.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Fazit: Eigenbedarfskündigung korrekt durchführen
            </h2>
            <p>
              Die Eigenbedarfskündigung ist ein wirksames Instrument für Vermieter — 
              wenn sie korrekt angewendet wird. Wer die Fristen, Formvorschriften und 
              die Abwägungspflicht beachtet, kann seinen Eigenbedarf durchsetzen. Wer 
              die Regeln missachtet, riskiert teure Prozesse und Schadensersatz. 
              Bei Unsicherheit lohnt sich die Beratung durch einen Fachanwalt für 
              Mietrecht oder eine erfahrene Hausverwaltung.
            </p>
          </div>

          <div className="mt-12 bg-teal/10 border border-teal/20 rounded-xl p-8">
            <h3 className="text-xl font-bold text-navy mb-2 font-playfair">
              Lassen Sie Ihre Immobilie von einfach verwaltet. professionell verwalten
            </h3>
            <p className="text-gray-600 mb-4">
              Wir beraten Sie bei Eigenbedarfskündigungen, erstellen rechtskonforme 
              Kündigungsschreiben und begleiten den gesamten Prozess — rechtssicher 
              und professionell.
            </p>
            <Link
              href="/anfrage"
              className="inline-block bg-teal text-white font-semibold px-6 py-3 rounded-lg hover:bg-teal/90 transition-colors"
            >
              Angebot anfordern
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
