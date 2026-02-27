import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Mietvertrag Sonderklauseln: Was gilt, was ist unwirksam? | einfach verwaltet.",
  description:
    "Tierhaltungsverbot, Untervermietung (§553 BGB), Parabolantenne, Schönheitsreparaturen nach BGH 2015: Welche Sonderklauseln im Mietvertrag wirksam sind — und welche nicht.",
  keywords:
    "Mietvertrag Sonderklauseln, Tierhaltungsverbot Mietvertrag BGH, Untervermietung §553 BGB, Schönheitsreparaturen BGH unwirksam, Parabolantenne Mietvertrag",
  openGraph: {
    title: "Mietvertrag Sonderklauseln: Tierhaltung, Untervermietung, Schönheitsreparaturen",
    description:
      "BGH-Urteile im Überblick: Welche Sonderklauseln im Mietvertrag halten — und welche vor Gericht keinen Bestand haben.",
    url: "https://einfach-verwaltet.de/blog/mietvertrag-sonderklauseln",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "article",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Mietvertrag Sonderklauseln: Was gilt, was ist unwirksam?",
  description:
    "Tierhaltungsverbot, Untervermietung §553 BGB, Parabolantenne, Schönheitsreparaturen nach BGH 2015 — welche Klauseln im Mietvertrag wirksam sind.",
  author: { "@type": "Organization", name: "einfach verwaltet." },
  publisher: {
    "@type": "Organization",
    name: "einfach verwaltet.",
    logo: { "@type": "ImageObject", url: "https://einfach-verwaltet.de/logo.png" },
  },
  datePublished: "2026-02-27",
  inLanguage: "de",
  url: "https://einfach-verwaltet.de/blog/mietvertrag-sonderklauseln",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Ist ein generelles Tierhaltungsverbot im Mietvertrag wirksam?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nein. Ein formularmäßiges Totalverbot der Tierhaltung ist nach BGH (Urteil vom 20.03.2013, Az. VIII ZR 168/12) unwirksam. Der Vermieter kann die Haltung bestimmter Tiere von seiner Zustimmung abhängig machen, darf diese aber nicht willkürlich verweigern. Kleintiere wie Hamster, Fische oder Vögel dürfen stets ohne Erlaubnis gehalten werden.",
      },
    },
    {
      "@type": "Question",
      name: "Kann der Vermieter die Untervermietung verbieten?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ein vollständiges Untervermietungsverbot ist nicht möglich. Gemäß §553 BGB hat der Mieter einen Anspruch auf Erlaubnis zur Untervermietung, wenn ein berechtigtes Interesse besteht (z.B. Auslandsaufenthalt, finanzielle Gründe). Der Vermieter darf nur in bestimmten Fällen verweigern — etwa wenn die Wohnung dadurch übermäßig belegt würde oder wichtige Gründe in der Person des Untermieters vorliegen.",
      },
    },
    {
      "@type": "Question",
      name: "Sind Schönheitsreparaturklauseln im Mietvertrag noch wirksam?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nach den BGH-Urteilen von 2015 sind viele Schönheitsreparaturklauseln unwirksam. Unwirksam sind insbesondere: starre Fristenregelungen (ohne Berücksichtigung des tatsächlichen Zustands), Quotenabgeltungsklauseln und Anfangsrenovierungsklauseln bei unrenovierten Wohnungen. Wirksam sind Klauseln, die flexible Fristen und den tatsächlichen Abnutzungsgrad berücksichtigen.",
      },
    },
  ],
};

export default function MietvertragSonderklauselnPost() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
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
            <span className="text-gray-700">Mietvertrag Sonderklauseln</span>
          </nav>

          <header className="mb-10">
            <p className="text-teal text-sm font-semibold uppercase tracking-wider mb-3">
              Ratgeber · 9 min Lesezeit
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-navy font-playfair mb-4 leading-tight">
              Mietvertrag Sonderklauseln: Was gilt — und was hält vor Gericht nicht stand?
            </h1>
            <p className="text-gray-500 text-sm">Februar 2026 · einfach verwaltet.</p>
          </header>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Warum Sonderklauseln im Mietvertrag riskant sein können
            </h2>
            <p>
              Viele Vermieter nutzen Musterverträge und ergänzen diese um eigene Sonderklauseln — zu Tieren,
              Untervermietung, Antennen oder Renovierungspflichten. Das Problem: Klauseln, die gegen zwingendes
              Mietrecht oder das AGB-Recht (§§307 ff. BGB) verstoßen, sind von vornherein unwirksam.
              Der Mieter muss sie nicht einhalten — aber der Vermieter kann sich trotzdem auf Haftungsrisiken eingelassen haben.
            </p>
            <p>
              Der Bundesgerichtshof (BGH) hat in den letzten Jahren mehrfach klargestellt, welche Klauseln
              Bestand haben und welche nicht. Dieser Überblick erklärt die wichtigsten Bereiche.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Tierhaltungsverbot: Totales Verbot ist unwirksam
            </h2>
            <p>
              Viele Mietverträge enthalten den Satz: <em>&bdquo;Die Haltung von Tieren aller Art ist untersagt.&ldquo;</em>
              Diese Klausel ist unwirksam.
            </p>
            <p>
              Der BGH hat mit Urteil vom <strong>20.03.2013 (Az. VIII ZR 168/12)</strong> entschieden:
              Ein formularmäßiges Totalverbot der Tierhaltung benachteiligt den Mieter unangemessen und ist
              nach §307 Abs. 1 BGB nichtig. Das gilt auch für Klauseln, die jegliche Tierhaltung von der
              Erlaubnis des Vermieters abhängig machen, ohne Ausnahmen zuzulassen.
            </p>
            <h3 className="text-xl font-bold text-navy mt-6 mb-3">Was Vermieter stattdessen können</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Zustimmungsvorbehalt</strong> für bestimmte Tierarten (z.B. Hunde, Katzen):
                Der Mieter muss die Erlaubnis einholen, der Vermieter darf sie aber nur aus sachlichen
                Gründen verweigern (z.B. Tierschutz, Lärmbelästigung anderer Mieter).
              </li>
              <li>
                <strong>Kleintiere:</strong> Hamster, Vögel, Fische, Zierfische dürfen Mieter grundsätzlich
                ohne Erlaubnis halten. Eine gegenteilige Klausel wäre unwirksam.
              </li>
              <li>
                <strong>Schriftliche Erlaubniserteilung</strong> bei Hund/Katze ist empfehlenswert — mit
                Widerrufsvorbehalt für den Fall nachgewiesener Störungen.
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Untervermietung: §553 BGB schützt den Mieter
            </h2>
            <p>
              Ein generelles Verbot der Untervermietung im Mietvertrag ist unwirksam. §553 BGB gibt dem
              Mieter unter bestimmten Umständen einen Rechtsanspruch auf Erlaubnis:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Es muss ein <strong>berechtigtes Interesse</strong> nach Vertragsschluss entstanden sein —
                z.B. Auslandsaufenthalt, Zusammenziehen mit Lebenspartner, finanzielle Notlage.
              </li>
              <li>
                Der Vermieter darf die Erlaubnis nur verweigern, wenn ein wichtiger Grund in der Person
                des Untermieters vorliegt (z.B. Vorstrafen mit Relevanz) oder die Wohnung überbelegt würde.
              </li>
              <li>
                Verweigert der Vermieter die Erlaubnis ohne triftigen Grund, kann der Mieter das
                Mietverhältnis mit verkürzter Frist kündigen (§553 Abs. 2 BGB).
              </li>
            </ul>
            <p className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
              <strong>Wichtig:</strong> Die Untervermietung der gesamten Wohnung (statt nur eines Zimmers)
              ist ein Sonderfall — hierfür besteht kein gesetzlicher Anspruch. Der Vermieter kann diese
              form der Untervermietung wirksam ausschließen.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Parabolantenne: Abwägungssache
            </h2>
            <p>
              Das Recht auf eine Parabolantenne ist nicht absolut. Vermieter können das Anbringen einer
              Parabolantenne einschränken oder verbieten, wenn:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Das Gebäude bereits mit einem Kabelanschluss ausgestattet ist, der ausreichende
                Empfangsmöglichkeiten bietet (BGH, VIII ZR 207/04).</li>
              <li>Die Befestigung die Gebäudesubstanz gefährdet.</li>
              <li>Das äußere Erscheinungsbild des Gebäudes erheblich beeinträchtigt wird.</li>
            </ul>
            <p>
              Ist kein ausreichender Kabelanschluss vorhanden und hat der Mieter nachweislich ein
              besonderes Interesse am Empfang fremdsprachiger Programme (z.B. Ausländer mit Bezug
              zum Heimatland), überwiegt sein Informationsinteresse — ein Klauselverbot kann dann
              unwirksam sein (BVerfG-Rechtsprechung).
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Schönheitsreparaturen: BGH 2015 hat vieles auf den Kopf gestellt
            </h2>
            <p>
              Die BGH-Urteile vom <strong>18.03.2015 (Az. VIII ZR 185/14 und VIII ZR 242/13)</strong> haben
              die Rechtslage zu Schönheitsreparaturen grundlegend verändert.
            </p>
            <h3 className="text-xl font-bold text-navy mt-6 mb-3">Was unwirksam ist</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Starre Fristenpläne</strong> (z.B. &bdquo;Küche alle 3 Jahre, Wohnzimmer alle 5 Jahre&ldquo;)
                ohne Rücksicht auf den tatsächlichen Zustand — unwirksam seit BGH-Grundsatzurteil.
              </li>
              <li>
                <strong>Quotenabgeltungsklauseln</strong> (Mieter zahlt anteilig bei Auszug) — unwirksam
                nach BGH 2015, wenn sie auf starren Fristenplänen aufbauen.
              </li>
              <li>
                <strong>Anfangsrenovierungsklauseln</strong> bei unrenoviert übergebenen Wohnungen —
                unwirksam, weil der Mieter dann eine Leistung für etwas erbringen würde, das er nicht
                erhalten hat (BGH VIII ZR 185/14).
              </li>
              <li>
                <strong>Endrenovierungsklauseln ohne Ausnahmen</strong> — grundsätzlich problematisch,
                wenn sie auch bei nicht abgenutzten Wohnungen greifen.
              </li>
            </ul>
            <h3 className="text-xl font-bold text-navy mt-6 mb-3">Was wirksam bleibt</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Klauseln, die Schönheitsreparaturen <strong>bei Bedarf</strong> und nach dem
                <strong>tatsächlichen Abnutzungsgrad</strong> vorschreiben.
              </li>
              <li>
                Individuelle Vereinbarungen (außerhalb von AGB-Formulartexten), die konkrete
                Leistungen gegen Mietnachlass aushandeln.
              </li>
              <li>
                Klauseln in renoviert übergebenen Wohnungen, sofern die Fristen flexibel formuliert sind.
              </li>
            </ul>
            <p className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
              <strong>Praxisempfehlung:</strong> Überprüfen Sie Ihren Mietvertrag mit einem auf Mietrecht
              spezialisierten Anwalt oder einer erfahrenen Hausverwaltung. Veraltete Klauseln aus
              Musterverträgen vor 2015 sind in vielen Fällen unwirksam — mit direkten Konsequenzen
              bei Wohnungsübergabe.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Weitere häufig problematische Klauseln
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Rauchverbot:</strong> Ein absolutes Rauchverbot in der Wohnung ist unwirksam —
                Rauchen ist vom vertragsgemäßen Gebrauch umfasst. Vermieter können aber bei nachgewiesenen
                Schäden Schadenersatz verlangen.
              </li>
              <li>
                <strong>Verbot der Kindermöbel-Befestigung:</strong> Klauseln, die das Setzen von
                Dübeln generell verbieten, sind in der Regel unwirksam.
              </li>
              <li>
                <strong>Pauschale Haftungsklauseln</strong> für alle Schäden jeder Art — unzulässige
                Haftungserweiterung zulasten des Mieters.
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Fazit: Mietverträge regelmäßig prüfen lassen
            </h2>
            <p>
              Die BGH-Rechtsprechung hat in den letzten Jahren viele Standardklauseln für unwirksam erklärt.
              Wer als Vermieter mit alten Musterverträgen arbeitet, läuft Gefahr, auf unwirksame Klauseln
              zu setzen — und am Ende keine Handhabe zu haben, wenn ein Mieter auszieht, ohne zu renovieren.
            </p>
            <p>
              Eine professionelle Hausverwaltung prüft Mietverträge, begleitet Wohnungsübergaben rechtssicher
              und stellt sicher, dass alle Klauseln der aktuellen Rechtsprechung entsprechen.
            </p>

            {/* FAQ Section */}
            <h2 className="text-2xl font-bold text-navy font-playfair mt-12 mb-6">
              Häufige Fragen zu Mietvertrag-Sonderklauseln
            </h2>
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-navy mb-2">Ist ein generelles Tierhaltungsverbot im Mietvertrag wirksam?</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Nein. Ein formularmäßiges Totalverbot der Tierhaltung ist nach BGH (VIII ZR 168/12, 2013) unwirksam.
                  Der Vermieter kann die Haltung bestimmter Tiere von seiner Zustimmung abhängig machen,
                  darf diese aber nicht willkürlich verweigern. Kleintiere dürfen stets ohne Erlaubnis gehalten werden.
                </p>
              </div>
              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-navy mb-2">Kann der Vermieter die Untervermietung verbieten?</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Ein vollständiges Untervermietungsverbot ist nicht möglich. Gemäß §553 BGB hat der Mieter
                  einen Anspruch auf Erlaubnis zur Untervermietung (Teilvermietung), wenn ein berechtigtes
                  Interesse besteht. Der Vermieter darf nur in besonderen Fällen verweigern.
                </p>
              </div>
              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-navy mb-2">Sind Schönheitsreparaturklauseln im Mietvertrag noch wirksam?</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Viele klassische Klauseln sind nach den BGH-Urteilen 2015 unwirksam — insbesondere starre
                  Fristenpläne, Quotenabgeltung und Anfangsrenovierungspflichten in unrenovierten Wohnungen.
                  Nur flexible, zustandsabhängige Formulierungen halten einer rechtlichen Prüfung stand.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 bg-teal/10 border border-teal/20 rounded-xl p-8">
            <h3 className="text-xl font-bold text-navy mb-2 font-playfair">
              Lassen Sie uns Ihre Immobilie verwalten
            </h3>
            <p className="text-gray-600 mb-4">
              Rechtssichere Mietverträge, BGH-konforme Klauseln, professionelle Wohnungsübergaben —
              einfach verwaltet. sorgt für rechtliche Sicherheit bei Ihrer Vermietung.
            </p>
            <Link
              href="/anfrage"
              className="inline-block bg-teal text-white font-semibold px-6 py-3 rounded-lg hover:bg-teal/90 transition-colors"
            >
              Jetzt unverbindlich anfragen
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
