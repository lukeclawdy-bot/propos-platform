import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Hausordnung durchsetzen als Vermieter — Rechtliche Grundlagen 2026",
  description:
    "Wie können Vermieter eine Hausordnung rechtlich durchsetzen? Welche Regeln sind zulässig, welche nicht? Abmahnung, Kündigung und Praxistipps.",
  openGraph: {
    title: "Hausordnung als Vermieter rechtlich durchsetzen",
    description: "Zulässige Hausordnungsregeln, Abmahnung und Kündigung bei Verstößen — alles was Vermieter wissen müssen.",
    url: "https://einfach-verwaltet.de/blog/mietrecht-hausordnung-durchsetzung",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "article",
  },
};

export default function BlogPost() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20">
        <article className="max-w-[780px] mx-auto px-6">
          <header className="mb-10">
            <div className="inline-flex items-center gap-2 bg-teal/10 rounded-full px-3 py-1 mb-4">
              <span className="text-teal text-xs font-semibold uppercase tracking-wide">Mietrecht</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-4 font-serif leading-tight">
              Hausordnung als Vermieter rechtlich durchsetzen — Was geht, was nicht
            </h1>
            <p className="text-text-light text-lg leading-relaxed">
              Die Hausordnung regelt das Miteinander im Haus. Doch nicht jede Regel ist zulässig — und nicht jeder Verstoß rechtfertigt eine Kündigung. Was Vermieter wissen müssen.
            </p>
            <div className="flex items-center gap-4 mt-6 text-sm text-text-light">
              <span>27. Februar 2026</span>
              <span>·</span>
              <span>7 Min. Lesezeit</span>
            </div>
          </header>

          <div className="prose prose-lg max-w-none text-navy/85 leading-relaxed space-y-6">
            <h2 className="text-2xl font-bold text-navy font-serif mt-10">Was ist die Hausordnung?</h2>
            <p>
              Die Hausordnung ist eine Zusammenstellung von Verhaltensregeln für das gemeinschaftliche Leben 
              in einem Mehrfamilienhaus. Sie kann als Anlage zum Mietvertrag vereinbart werden — dann ist sie 
              Vertragsbestandteil — oder als einseitige Anweisung des Vermieters. Der Unterschied ist erheblich: 
              Nur als Vertragsbestandteil ist sie für Mieter rechtlich bindend.
            </p>

            <h2 className="text-2xl font-bold text-navy font-serif mt-10">Zulässige Regelungen in der Hausordnung</h2>
            <p>Typische und rechtlich zulässige Regelungen umfassen:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Ruhezeiten (z.B. 22–6 Uhr, Mittagsruhe 13–15 Uhr)</li>
              <li>Treppenreinigung (Zuständigkeiten und Turnus)</li>
              <li>Regelungen zur Müllentsorgung und Mülltrennung</li>
              <li>Nutzung von Gemeinschaftsräumen (Keller, Waschküche)</li>
              <li>Abstellen von Fahrrädern und Kinderwagen</li>
              <li>Schließzeiten der Haustür</li>
            </ul>
            <p>
              Diese Regelungen müssen verhältnismäßig sein und dürfen den vertragsgemäßen Gebrauch der 
              Mietsache nicht unzumutbar einschränken (§ 535 BGB).
            </p>

            <h2 className="text-2xl font-bold text-navy font-serif mt-10">Unzulässige Regelungen</h2>
            <p>Folgende Regelungen hat die Rechtsprechung für unwirksam erklärt:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Generelles Tierhaltungsverbot (BGH, AZ VIII ZR 168/12) — es muss eine Einzelfallabwägung stattfinden</li>
              <li>Verbot des Besuchs außerhalb bestimmter Uhrzeiten</li>
              <li>Absolutes Musizierverbot (allgemeine Mietrechtsübung: 2 Stunden/Tag sind erlaubt)</li>
              <li>Verbot von Kinderlärm während normaler Tageszeiten</li>
              <li>Verpflichtung zur Beaufsichtigung volljähriger Gäste</li>
            </ul>

            <h2 className="text-2xl font-bold text-navy font-serif mt-10">Wie Vermieter Verstöße rechtlich angehen</h2>
            <p>
              <strong>Schritt 1 — Dokumentation:</strong> Halten Sie Verstöße schriftlich fest. Datum, Uhrzeit, 
              Art des Verstoßes, ggf. Zeugen. Je besser die Dokumentation, desto stärker Ihre rechtliche Position.
            </p>
            <p>
              <strong>Schritt 2 — Abmahnung:</strong> Vor jeder Kündigung wegen Hausordnungsverstoßes ist 
              grundsätzlich eine schriftliche Abmahnung (§ 314 BGB analog) erforderlich. Die Abmahnung muss 
              den konkreten Verstoß benennen und den Mieter auffordern, diesen zu unterlassen.
            </p>
            <p>
              <strong>Schritt 3 — Fristsetzung und Wiederholung:</strong> Wenn nach der Abmahnung erneut 
              gegen die Hausordnung verstoßen wird, kann die ordentliche Kündigung (§ 573 BGB) oder — 
              bei besonderer Schwere — die außerordentliche fristlose Kündigung (§ 569 BGB) in Betracht kommen.
            </p>

            <h2 className="text-2xl font-bold text-navy font-serif mt-10">Lärmbeschwerden: Besonders häufiger Streitpunkt</h2>
            <p>
              Lärm ist der häufigste Grund für Hausordnungskonflikte. Wichtig: Nicht jeder Lärm rechtfertigt 
              eine Abmahnung. Normale Lebensgeräusche (Kinderlärm, alltägliche Geräusche aus dem Wohnbereich) 
              sind hinzunehmen. Erst wenn der Lärm die Mietsache dauerhaft und erheblich beeinträchtigt, 
              liegt ein abmahnwürdiger Verstoß vor.
            </p>

            <h2 className="text-2xl font-bold text-navy font-serif mt-10">Hausordnung und WEG</h2>
            <p>
              In Wohnungseigentümergemeinschaften (WEG) gilt die Gemeinschaftsordnung als übergeordnetes Regelwerk. 
              Die Hausordnung wird durch Beschluss der Eigentümerversammlung (§ 19 Abs. 2 WEG) festgelegt. 
              Einzelne Eigentümer können die Hausordnung nicht eigenmächtig ändern — das ist Sache der Gemeinschaft.
            </p>

            <h2 className="text-2xl font-bold text-navy font-serif mt-10">Fazit</h2>
            <p>
              Eine wirksam vereinbarte und inhaltlich zulässige Hausordnung ist ein wichtiges Instrument für 
              ein funktionierendes Miteinander im Haus. Vermieter, die Verstöße konsequent und dokumentiert 
              angehen — beginnend mit der Abmahnung — stehen rechtlich auf solidem Boden. Wer die Hausordnung 
              ignoriert oder zu strenge Regeln aufstellt, riskiert im Zweifelsfall selbst Nachteile.
            </p>
          </div>

          <div className="mt-12 p-6 bg-teal/8 rounded-2xl border border-teal/15">
            <p className="text-navy font-semibold mb-2">Professionelle Unterstützung</p>
            <p className="text-text-light text-sm mb-4">
              Konflikte im Haus kosten Nerven und Zeit. Eine professionelle Hausverwaltung übernimmt die 
              Kommunikation, dokumentiert Vorfälle und handelt rechtssicher.
            </p>
            <a
              href="/anfrage"
              className="inline-block bg-teal text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-teal/85 transition-all"
            >
              Kostenlose Beratung anfragen →
            </a>
          </div>
        </article>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Hausordnung als Vermieter rechtlich durchsetzen — Was geht, was nicht",
        "description": "Zulässige und unzulässige Regelungen in der Hausordnung, Abmahnungsprozess und Kündigungsrecht bei Verstößen.",
        "author": { "@type": "Organization", "name": "einfach verwaltet." },
        "publisher": { "@type": "Organization", "name": "einfach verwaltet.", "url": "https://einfach-verwaltet.de" },
        "datePublished": "2026-02-27",
        "url": "https://einfach-verwaltet.de/blog/mietrecht-hausordnung-durchsetzung"
      })}} />
      <Footer />
    </>
  );
}
