import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Ratgeber — Hausverwaltung Hamburg | einfach verwaltet.",
  description:
    "Wissenswertes für Eigentümer in Hamburg: Hausverwaltung wechseln, Nebenkostenabrechnung, Mieterhöhung, Kosten und mehr.",
  keywords:
    "Hausverwaltung Hamburg Blog, Nebenkostenabrechnung Tipps, Mieterhöhung Hamburg, Hausverwaltung wechseln",
  openGraph: {
    title: "Ratgeber für Eigentümer — einfach verwaltet.",
    description:
      "Praktische Tipps und rechtliche Infos rund um Hausverwaltung in Hamburg.",
    url: "https://einfach-verwaltet.de/blog",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "website",
  },
};

const posts = [
  {
    slug: "hausverwaltung-wechseln-hamburg",
    title: "Hausverwaltung wechseln in Hamburg: So gelingt der Wechsel stressfrei",
    description:
      "Die Gründe für einen Wechsel sind oft dieselben: fehlende Erreichbarkeit, fehlerhafte Abrechnungen, keine Reaktion. Schritt für Schritt zum stressfreien Wechsel.",
    keyword: "Hausverwaltung wechseln Hamburg",
    readTime: "6 min",
    date: "Februar 2026",
  },
  {
    slug: "nebenkostenabrechnung-fehler",
    title: "Nebenkostenabrechnung: Die 7 häufigsten Fehler — und wie Sie sie vermeiden",
    description:
      "Formale Fehler in der Nebenkostenabrechnung können teuer werden — auch wenn die Zahlen stimmen. Kennen Sie die häufigsten Fallstricke.",
    keyword: "Nebenkostenabrechnung Fehler",
    readTime: "7 min",
    date: "Februar 2026",
  },
  {
    slug: "mieterhohung-hamburg-2026",
    title: "Mieterhöhung in Hamburg 2026: Was ist nach § 558 BGB erlaubt?",
    description:
      "Kappungsgrenze 15 %, Hamburger Mietspiegel, Sperrfrist: Alles was Vermieter über rechtssichere Mieterhöhungen in Hamburg wissen müssen.",
    keyword: "Mieterhöhung Hamburg 2026",
    readTime: "7 min",
    date: "Februar 2026",
  },
  {
    slug: "hausverwaltung-hamburg-kosten",
    title: "Hausverwaltung Hamburg: Was kostet eine professionelle Mietverwaltung?",
    description:
      "Marktpreise zwischen €24–34/Einheit/Monat — aber was steckt wirklich drin? Transparenz bei Kosten, versteckten Gebühren und ROI.",
    keyword: "Hausverwaltung Hamburg Kosten",
    readTime: "7 min",
    date: "Februar 2026",
  },
  {
    slug: "moderne-hausverwaltung-2026",
    title: "Warum moderne Hausverwaltung heute anders aussieht — und was das für Sie bedeutet",
    description:
      "Digitale Prozesse, schnelle Reaktionszeiten, Echtzeit-Einblick: Was moderne Hausverwaltung 2026 auszeichnet und was Eigentümer fordern sollten.",
    keyword: "Moderne Hausverwaltung",
    readTime: "7 min",
    date: "Februar 2026",
  },
  {
    slug: "betriebskostenabrechnung-hamburg",
    title: "Betriebskostenabrechnung Hamburg: Was Vermieter wissen müssen",
    description:
      "Fristen, umlagefähige Kosten nach §2 BetrKV, häufige Fehler und wie Sie als Hamburger Vermieter rechtssicher abrechnen.",
    keyword: "Betriebskostenabrechnung Hamburg",
    readTime: "8 min",
    date: "Februar 2026",
  },
  {
    slug: "eigentuemerversammlung-vorbereiten",
    title: "Eigentümerversammlung vorbereiten: Checkliste für Vermieter",
    description:
      "Einladungsfristen, Tagesordnung, Beschlussfähigkeit, Protokoll und digitale ETV — der komplette Leitfaden für WEG-Versammlungen.",
    keyword: "Eigentümerversammlung vorbereiten",
    readTime: "7 min",
    date: "Februar 2026",
  },
  {
    slug: "mietvertrag-kuendigen-hamburg",
    title: "Mietvertrag kündigen Hamburg: Fristen und Voraussetzungen nach §573 BGB",
    description:
      "Was Hamburger Vermieter bei der Kündigung beachten müssen — Kündigungsfristen, Eigenbedarf, Formvorschriften und häufige Fehler.",
    keyword: "Mietvertrag kündigen Hamburg",
    readTime: "8 min",
    date: "Februar 2026",
  },
  {
    slug: "hausverwaltung-selbst-machen",
    title: "Hausverwaltung selbst machen vs. Verwalter beauftragen: Was lohnt sich?",
    description:
      "Kosten, Zeitaufwand und Risiken der Selbstverwaltung — der ehrliche Vergleich für private Vermieter ab 4 Einheiten.",
    keyword: "Hausverwaltung selbst machen",
    readTime: "7 min",
    date: "Januar 2026",
  },
  {
    slug: "schoenheitsreparaturen-bgh-2026",
    title: "Schönheitsreparaturen nach BGH: Was Vermieter 2026 beachten müssen",
    description:
      "BGH-Urteile, unwirksame Klauseln, Quotenabgeltung — und was bei unrenoviert übergebenen Wohnungen gilt.",
    keyword: "Schönheitsreparaturen Vermieter BGH",
    readTime: "8 min",
    date: "Januar 2026",
  },
];

export default function BlogIndex() {
  return (
    <>
      <Navbar />
      <main className="bg-warm-white min-h-screen pt-16">
        {/* Hero */}
        <section className="bg-navy text-white py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-teal text-sm font-semibold uppercase tracking-wider mb-3">
              Ratgeber
            </p>
            <h1 className="text-3xl md:text-5xl font-bold font-playfair mb-4">
              Wissen für Eigentümer
            </h1>
            <p className="text-lg text-white/80 max-w-2xl">
              Praktische Anleitungen und rechtliche Infos rund um Hausverwaltung
              in Hamburg — verständlich erklärt.
            </p>
          </div>
        </section>

        {/* Posts */}
        <section className="max-w-4xl mx-auto px-4 py-16">
          <div className="grid gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block bg-white rounded-xl border border-gray-200 hover:border-teal hover:shadow-md transition-all p-6 md:p-8"
              >
                <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime} Lesezeit</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-navy group-hover:text-teal transition-colors mb-3 font-playfair">
                  {post.title}
                </h2>
                <p className="text-gray-600 leading-relaxed">{post.description}</p>
                <div className="mt-4 flex items-center gap-2 text-teal font-semibold text-sm">
                  Artikel lesen
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 bg-teal/10 border border-teal/20 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-navy mb-3 font-playfair">
              Bereit für eine bessere Hausverwaltung?
            </h2>
            <p className="text-gray-600 mb-6">
              Kostenlose Portfolioanalyse — ohne Verpflichtung, ohne Kleingedrucktes.
            </p>
            <Link
              href="/anfrage"
              className="inline-block bg-teal text-white font-semibold px-8 py-3 rounded-lg hover:bg-teal/90 transition-colors"
            >
              Jetzt unverbindlich anfragen
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
