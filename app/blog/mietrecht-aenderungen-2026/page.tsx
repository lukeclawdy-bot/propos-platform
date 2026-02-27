import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Mietrecht 2026: Wichtige Änderungen für Vermieter in Deutschland | einfach verwaltet.",
  description:
    "Mietrecht 2026: Was haben sich Mietpreisbremse, Energieausweis-Pflichten und WEG-Reform verändert? Der aktuelle Überblick für Vermieter in Deutschland.",
  keywords:
    "Mietrecht 2026, Mietpreisbremse 2026, Energieausweis Pflicht 2026, Mietrecht Änderungen Vermieter, WEG Reform 2026",
  openGraph: {
    title: "Mietrecht 2026: Wichtige Änderungen für Vermieter in Deutschland",
    description:
      "Was Vermieter 2026 wissen müssen: Mietpreisbremse, Energieausweis, Kündigungsschutz und mehr — kompakt erklärt.",
    url: "https://einfach-verwaltet.de/blog/mietrecht-aenderungen-2026",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Mietrecht 2026: Wichtige Änderungen für Vermieter in Deutschland",
  description:
    "Der aktuelle Überblick über mietrechtliche Pflichten und Änderungen 2026 für Vermieter.",
  author: { "@type": "Organization", name: "einfach verwaltet." },
  publisher: {
    "@type": "Organization",
    name: "einfach verwaltet.",
    logo: { "@type": "ImageObject", url: "https://einfach-verwaltet.de/logo.png" },
  },
  datePublished: "2026-02-27",
  inLanguage: "de",
  url: "https://einfach-verwaltet.de/blog/mietrecht-aenderungen-2026",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Gilt die Mietpreisbremse 2026 noch?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, die Mietpreisbremse nach §556d BGB gilt 2026 weiterhin in den Bundesländern, die entsprechende Landesverordnungen erlassen haben — darunter Berlin, Hamburg, München und viele weitere Städte. Die Regelung begrenzt die Miete bei Neuvermietung auf maximal 10% über der ortsüblichen Vergleichsmiete. Ausnahmen gelten für Neubauten (Erstbezug nach Oktober 2014) und umfassend modernisierte Wohnungen.",
      },
    },
    {
      "@type": "Question",
      name: "Was müssen Vermieter 2026 beim Energieausweis beachten?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Vermieter müssen bei Neuvermietung einen gültigen Energieausweis vorlegen (§16 GEG). Der Energieausweis ist spätestens bei der Besichtigung unaufgefordert vorzuzeigen und dem neuen Mieter auszuhändigen. Ein Verstoß kann mit Bußgeldern bis zu €15.000 geahndet werden. Energieausweise haben eine Gültigkeitsdauer von 10 Jahren.",
      },
    },
    {
      "@type": "Question",
      name: "Was hat sich durch die WEG-Reform geändert?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die WEG-Reform 2020 brachte erhebliche Neuerungen: zertifizierungspflichtige Verwalter (ab 2022/2023), erleichterte Online-Eigentümerversammlungen, ein Anspruch der Eigentümer auf E-Mobilität-Ladeinfrastruktur, barrierefreien Umbau und schnelle Glasfaseranbindung. Verwalter, die seit Dezember 2023 bestellt werden, benötigen den IHK-Sachkundeausweis als zertifizierter Verwalter.",
      },
    },
    {
      "@type": "Question",
      name: "Wann darf ich die Miete 2026 erhöhen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mieterhöhungen sind nach §558 BGB unter folgenden Bedingungen zulässig: Die Miete muss mindestens 15 Monate unverändert sein, die Erhöhung darf maximal die ortsübliche Vergleichsmiete erreichen und innerhalb von 3 Jahren nicht mehr als 20% betragen (Kappungsgrenze, in angespannten Märkten 15%). Eine formell korrekte Mieterhöhungserklärung mit Begründung (z.B. Mietspiegel) ist Pflicht.",
      },
    },
    {
      "@type": "Question",
      name: "Müssen Vermieter 2026 den CO2-Preis mit Mietern teilen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Nach §559b BGB (CO2-Kostenaufteilungsgesetz) werden die CO2-Kosten seit 2023 gestaffelt zwischen Vermieter und Mieter aufgeteilt, abhängig vom Energieeffizienzstandard des Gebäudes. Je schlechter die Energieeffizienz, desto höher der Vermieteranteil. Bei Gebäuden mit Energieausweis F oder G trägt der Vermieter bis zu 95% der CO2-Kosten.",
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
            <span className="text-gray-700">Mietrecht 2026</span>
          </nav>

          <header className="mb-10">
            <p className="text-teal text-sm font-semibold uppercase tracking-wider mb-3">
              Ratgeber · 10 min Lesezeit
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-navy font-playfair mb-4 leading-tight">
              Mietrecht 2026: Wichtige Änderungen für Vermieter in Deutschland
            </h1>
            <p className="text-gray-500 text-sm">Februar 2026 · einfach verwaltet.</p>
          </header>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <p className="text-lg font-medium text-gray-800 leading-relaxed">
              Das deutsche Mietrecht ist komplex — und unterliegt einem ständigen Wandel. 
              Für Vermieter ist es wichtig, den aktuellen Stand zu kennen: Was gilt 2026 in Bezug auf 
              Mietpreisbremse, Energieausweispflichten und die WEG-Reform? Dieser Ratgeber 
              fasst die wichtigsten Punkte verständlich zusammen.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Mietpreisbremse 2026: Was gilt noch?
            </h2>
            <p>
              Die Mietpreisbremse nach <strong>§556d BGB</strong> begrenzt Mieten bei Neuvermietung in 
              angespannten Wohnungsmärkten auf maximal 10% über der ortsüblichen Vergleichsmiete. 
              Sie gilt in den Bundesländern, die entsprechende Landesverordnungen erlassen haben.
            </p>
            <p>
              Zu den Bundesländern mit aktiver Mietpreisbremse gehören weiterhin:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>Berlin (gesamtes Stadtgebiet)</li>
              <li>Hamburg (seit 2015, immer wieder verlängert)</li>
              <li>Bayern (München und zahlreiche weitere Kommunen)</li>
              <li>Baden-Württemberg (Stuttgart, Freiburg u.a.)</li>
              <li>Hessen (Frankfurt, Wiesbaden u.a.)</li>
              <li>Nordrhein-Westfalen (Köln, Düsseldorf, Bonn u.a.)</li>
            </ul>
            <p>
              <strong>Wichtige Ausnahmen:</strong> Die Mietpreisbremse gilt nicht für Neubauten 
              (Erstbezug nach dem 1. Oktober 2014) und nicht für Wohnungen, die vor der 
              Neuvermietung umfassend modernisiert wurden. Auch wenn die bisherige Vormiete 
              bereits über der Vergleichsmiete lag (sog. Vormieten-Ausnahme), kann die erhöhte 
              Miete unter Umständen weitergegeben werden.
            </p>
            <p>
              Vermieter müssen auf Verlangen des Mieters unaufgefordert über die maßgebliche 
              Vormiete oder eine Ausnahme von der Mietpreisbremse Auskunft geben — das sieht 
              §556e BGB vor. Transparenz ist hier Pflicht, keine Kulanz.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Energieausweis-Pflichten 2026: Was Vermieter wissen müssen
            </h2>
            <p>
              Das Gebäudeenergiegesetz (GEG) stellt klare Anforderungen an Vermieter im Zusammenhang 
              mit dem Energieausweis:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                <strong>Vorzeigepflicht bei Besichtigung:</strong> Der Energieausweis muss potenziellen 
                Mietern spätestens bei der Besichtigung unaufgefordert vorgelegt werden (§16 GEG).
              </li>
              <li>
                <strong>Aushändigungspflicht:</strong> Dem Mieter ist bei Vertragsschluss eine Kopie 
                des Energieausweises zu übergeben.
              </li>
              <li>
                <strong>Gültigkeitsdauer:</strong> Energieausweise sind 10 Jahre gültig. Abgelaufene 
                Ausweise müssen erneuert werden.
              </li>
              <li>
                <strong>Bußgeld bei Verstoß:</strong> Wer keinen gültigen Energieausweis vorlegt, 
                riskiert ein Bußgeld von bis zu €15.000.
              </li>
            </ul>
            <p>
              Besonders relevant: Die Energieeffizienzklasse des Gebäudes (A+ bis H) bestimmt, 
              wie die CO2-Kosten zwischen Vermieter und Mieter aufgeteilt werden. Je schlechter 
              die Klasse, desto höher der Vermieteranteil.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              WEG-Reform: Was gilt 2026 noch?
            </h2>
            <p>
              Die Wohnungseigentumsgesetz-Reform von 2020 hat nachhaltige Veränderungen gebracht, 
              die auch 2026 noch relevant sind:
            </p>

            <h3 className="text-xl font-bold text-navy font-playfair mt-8 mb-3">
              Zertifizierter Verwalter (§26a WEG)
            </h3>
            <p>
              Seit dem 1. Dezember 2023 haben Eigentümer das Recht, einen 
              <strong> zertifizierten WEG-Verwalter</strong> zu verlangen. Verwalter, die nach diesem 
              Datum erstmals bestellt oder wiederbestellt werden, müssen die IHK-Prüfung zum 
              zertifizierten Verwalter (§ 26a WEG) nachweisen können — oder eine gleichwertige 
              Qualifikation besitzen. Dies stärkt die Rechte der Eigentümergemeinschaften erheblich.
            </p>

            <h3 className="text-xl font-bold text-navy font-playfair mt-8 mb-3">
              Online-Eigentümerversammlungen (§23 WEG)
            </h3>
            <p>
              Eigentümer können nun per einfachem Mehrheitsbeschluss rein virtuelle oder hybride 
              Eigentümerversammlungen abhalten — ein Ergebnis der Reform von 2020 und der 
              Erfahrungen aus der Pandemie. Das spart Zeit und erhöht die Beteiligung, 
              besonders bei Eigentümern, die nicht vor Ort wohnen.
            </p>

            <h3 className="text-xl font-bold text-navy font-playfair mt-8 mb-3">
              Anspruch auf bauliche Veränderungen (§20 WEG)
            </h3>
            <p>
              Einzelne Eigentümer haben seit der Reform das Recht, auf eigene Kosten Ladestationen 
              für Elektrofahrzeuge, barrierefreie Zugänge, Einbruchsschutz oder Glasfaseranschlüsse 
              zu installieren — wenn sie einen entsprechenden Beschluss herbeiführen können. 
              Dies kann zu Konflikten führen und erfordert professionelles Verwalterhandeln.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              CO2-Kostenaufteilung: Vermieter in der Pflicht
            </h2>
            <p>
              Seit dem 1. Januar 2023 werden die CO2-Kosten aus dem nationalen Emissionshandel 
              zwischen Vermietern und Mietern aufgeteilt. Das Stufenmodell nach §559b BGB richtet 
              sich nach der Energieeffizienzklasse:
            </p>
            <div className="bg-navy/5 rounded-xl p-6 border border-navy/10 my-6">
              <h3 className="text-lg font-bold text-navy mb-4">CO2-Kostenaufteilung nach Energieeffizienz</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b border-navy/10">
                  <span>Effizienzklassen A+, A, B, C (sparsam)</span>
                  <span className="font-semibold text-navy">100% Mieter</span>
                </div>
                <div className="flex justify-between py-2 border-b border-navy/10">
                  <span>Klasse D</span>
                  <span className="font-semibold text-navy">90% Mieter / 10% Vermieter</span>
                </div>
                <div className="flex justify-between py-2 border-b border-navy/10">
                  <span>Klasse E</span>
                  <span className="font-semibold text-navy">73% Mieter / 27% Vermieter</span>
                </div>
                <div className="flex justify-between py-2 border-b border-navy/10">
                  <span>Klasse F</span>
                  <span className="font-semibold text-navy">47% Mieter / 53% Vermieter</span>
                </div>
                <div className="flex justify-between py-2">
                  <span>Klassen G, H (sehr ineffizient)</span>
                  <span className="font-semibold text-navy">5% Mieter / 95% Vermieter</span>
                </div>
              </div>
            </div>
            <p>
              Für Vermieter ineffizienter Gebäude ist dies ein starker finanzieller Anreiz zur 
              energetischen Sanierung. Eine professionelle Hausverwaltung behält diese Abrechnung 
              im Blick und sorgt für korrekte Umlage.
            </p>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Mieterhöhungen 2026: Kappungsgrenze und Mietspiegel
            </h2>
            <p>
              Mieterhöhungen nach §558 BGB sind an strenge Voraussetzungen geknüpft:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Mindestens 15 Monate keine Erhöhung</li>
              <li>Neue Miete darf ortsübliche Vergleichsmiete nicht übersteigen</li>
              <li>Kappungsgrenze: max. 20% in 3 Jahren (15% in angespannten Märkten)</li>
              <li>Formell korrekte schriftliche Begründung (Mietspiegel, Sachverständigengutachten oder Vergleichswohnungen)</li>
              <li>Zustimmungsfrist des Mieters: 2 Monate nach Erhalt</li>
            </ul>
            <p>
              Fehler bei Mieterhöhungen können dazu führen, dass die Erhöhung unwirksam ist. 
              Eine professionelle Hausverwaltung stellt sicher, dass alle formellen Anforderungen 
              erfüllt sind.
            </p>

            <div className="bg-teal/10 border border-teal/20 rounded-xl p-6 my-8">
              <p className="font-semibold text-navy mb-2">Mietrecht ist komplex — lassen Sie sich unterstützen</p>
              <p className="text-gray-700 text-sm mb-4">
                Eine professionelle Hausverwaltung sorgt dafür, dass alle mietrechtlichen Pflichten 
                korrekt und fristgerecht erfüllt werden — von der Nebenkostenabrechnung bis zur 
                Mieterhöhung.
              </p>
              <Link
                href="/anfrage"
                className="inline-block bg-teal text-white px-6 py-3 rounded-xl font-semibold hover:bg-teal/85 transition-all"
              >
                Jetzt kostenlos beraten lassen →
              </Link>
            </div>

            <h2 className="text-2xl font-bold text-navy font-playfair mt-10 mb-4">
              Häufige Fragen zum Mietrecht 2026
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: "Gilt die Mietpreisbremse 2026 noch?",
                  a: "Ja, die Mietpreisbremse nach §556d BGB gilt 2026 weiterhin in den Bundesländern mit entsprechenden Landesverordnungen — darunter Berlin, Hamburg und München. Die Regelung begrenzt die Miete bei Neuvermietung auf maximal 10% über der ortsüblichen Vergleichsmiete.",
                },
                {
                  q: "Was müssen Vermieter 2026 beim Energieausweis beachten?",
                  a: "Vermieter müssen bei Neuvermietung einen gültigen Energieausweis vorlegen (§16 GEG). Der Energieausweis ist spätestens bei der Besichtigung unaufgefordert vorzuzeigen. Ein Verstoß kann mit Bußgeldern bis zu €15.000 geahndet werden.",
                },
                {
                  q: "Was hat sich durch die WEG-Reform geändert?",
                  a: "Die WEG-Reform 2020 brachte zertifizierungspflichtige Verwalter (ab Dezember 2023), erleichterte Online-Eigentümerversammlungen und einen Anspruch der Eigentümer auf Ladeinfrastruktur, Barrierefreiheit und Glasfaser.",
                },
                {
                  q: "Müssen Vermieter 2026 den CO2-Preis mit Mietern teilen?",
                  a: "Ja. Nach §559b BGB werden die CO2-Kosten seit 2023 gestaffelt aufgeteilt. Bei Gebäuden mit Energieausweis F oder G trägt der Vermieter bis zu 95% der CO2-Kosten.",
                },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-6 border border-gray-100">
                  <h3 className="font-bold text-navy mb-2">{item.q}</h3>
                  <p className="text-text-light text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-3">Weitere Ratgeber:</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/blog/vermieter-erklaerung-steuern" className="text-teal text-sm hover:underline">
                  Steuererklärung als Vermieter →
                </Link>
                <Link href="/blog/eigenbedarfskuendigung-anforderungen" className="text-teal text-sm hover:underline">
                  Eigenbedarfskündigung: Voraussetzungen →
                </Link>
                <Link href="/blog/nebenkostenabrechnung-pruefen" className="text-teal text-sm hover:underline">
                  Nebenkostenabrechnung prüfen →
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
