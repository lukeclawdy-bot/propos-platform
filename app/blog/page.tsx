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
    slug: "hausverwaltung-kosten-sparen",
    title: "Hausverwaltung Kosten sparen: Weniger zahlen ohne Qualitätsabstriche",
    description:
      "Marktpreise (€24–34/Einheit), versteckte Gebühren erkennen, digitale Verwaltung und Mengenrabatte — der Leitfaden für Eigentümer, die sinnvoll sparen wollen.",
    keyword: "Hausverwaltung Kosten sparen",
    readTime: "9 min",
    date: "Februar 2026",
  },
  {
    slug: "nebenkostenabrechnung-mieter-pruefen",
    title: "Nebenkostenabrechnung prüfen: Was eine gültige NKA enthalten muss",
    description:
      "Die 12-Monats-Frist nach §556 Abs. 3 BGB, Pflichtbestandteile, häufige Fehler und das Belegeinsichtsrecht — der vollständige Leitfaden für Vermieter und Hausverwaltungen.",
    keyword: "Nebenkostenabrechnung prüfen Mieter",
    readTime: "10 min",
    date: "Februar 2026",
  },
  {
    slug: "verwaltervertrag-kuendigen",
    title: "Verwaltervertrag kündigen: Fristen, Ablauf und Verwalterwechsel",
    description:
      "§26 WEG und §621 BGB erklärt: Kündigungsfristen, Dokumentenübergabe-Pflichten und wie ein reibungsloser Verwalterwechsel gelingt — mit internem Link zu /wechseln.",
    keyword: "Verwaltervertrag kündigen",
    readTime: "9 min",
    date: "Februar 2026",
  },
  {
    slug: "mietkaution-zurueckhalten-vermieter",
    title: "Mietkaution zurückhalten: Was Vermieter einbehalten dürfen (und was nicht)",
    description:
      "Zulässige Einbehalte (Schäden, Mietrückstände, Schlüssel), unzulässige Abzüge (Schönheitsreparaturen bei unwirksamen Klauseln) und die 6-Monats-Frist nach §551 BGB.",
    keyword: "Mietkaution zurückhalten",
    readTime: "10 min",
    date: "Februar 2026",
  },
  {
    slug: "hausordnung-vorlage-vermieter",
    title: "Hausordnung Vorlage Vermieter: Muster, Inhalt und Rechtliches 2026",
    description:
      "Was muss eine Hausordnung enthalten? Musterklauseln zu Ruhezeiten, Müll, Rauchen, Tierhaltung und Gemeinschaftsräumen — rechtlich erklärt für Vermieter.",
    keyword: "Hausordnung Vorlage Vermieter",
    readTime: "9 min",
    date: "Februar 2026",
  },
  {
    slug: "hausverwaltung-frankfurt-kosten",
    title: "Hausverwaltung Frankfurt: Kosten, Preise und Vergleich 2026",
    description:
      "Hausverwaltung Frankfurt Kosten 2026: Mietverwaltung €25–38/Einheit, WEG-Verwaltung €24–34/Einheit. Preisvergleich mit Hamburg, München, Berlin und Tipps zur Verwalterwahl.",
    keyword: "Hausverwaltung Frankfurt Kosten",
    readTime: "9 min",
    date: "Februar 2026",
  },
  {
    slug: "mietverwaltung-oder-wohnungseigentumsverwaltung",
    title: "WEG oder Mietverwaltung: Was brauchen Sie?",
    description:
      "WEG-Verwaltung vs. Mietverwaltung: Der vollständige Vergleich — Aufgaben, Rechtsgrundlagen (§26 WEG / §675 BGB), Kosten und wann Sie welche Form benötigen.",
    keyword: "WEG Verwaltung vs Mietverwaltung",
    readTime: "10 min",
    date: "Februar 2026",
  },
  {
    slug: "vermieter-pflichten-winter-heizung-schnee",
    title: "Vermieter Pflichten im Winter: Heizung, Schneeräumen und mehr",
    description:
      "Welche Winterpflichten hat der Vermieter? Heiztemperaturen (20–22°C tagsüber), Streupflicht, Dachlawinen, Rohrsicherung — alle gesetzlichen Anforderungen im Überblick.",
    keyword: "Vermieter Pflichten Winter",
    readTime: "9 min",
    date: "Februar 2026",
  },
  {
    slug: "hausverwaltung-wechseln-checkliste",
    title: "Hausverwaltung wechseln: Die ultimative Checkliste",
    description:
      "Hausverwaltung wechseln Schritt für Schritt: Kündigung (§621 BGB), Unterlagenübergabe-Checkliste, Mieterinformation und reibungsloser Start mit der neuen Verwaltung.",
    keyword: "Hausverwaltung wechseln Checkliste",
    readTime: "10 min",
    date: "Februar 2026",
  },
  {
    slug: "betriebskosten-senken-tipps",
    title: "Betriebskosten senken: 10 Tipps für Vermieter",
    description:
      "10 bewährte Strategien um Betriebskosten zu senken: Versicherungsvergleich, LED-Umrüstung, hydraulischer Abgleich, smarte Heizsteuerung — mit konkreten Einsparpotenzialen.",
    keyword: "Betriebskosten senken",
    readTime: "10 min",
    date: "Februar 2026",
  },
  {
    slug: "weg-verwaltung-hamburg-kosten-vergleich",
    title: "WEG-Verwaltung Hamburg: Was kostet ein Hausverwalter für WEG?",
    description:
      "WEG Verwaltung Hamburg Kosten 2026: €22-32/Einheit, vollständiger Vergleich WEG vs. Mietverwaltung, Checkliste für die Verwalterwahl und Warnsignale bei Billigangeboten.",
    keyword: "WEG Verwaltung Hamburg Kosten",
    readTime: "10 min",
    date: "Februar 2026",
  },
  {
    slug: "betriebskostenabrechnung-widerspruch-mieter",
    title: "Betriebskostenabrechnung Widerspruch: So gehen Mieter richtig vor",
    description:
      "Widerspruch gegen Betriebskostenabrechnung nach §556 BGB: 12-Monats-Frist, häufige Fehler, richtige Reaktion als Vermieter und wie widerspruchssichere Abrechnungen aussehen.",
    keyword: "Betriebskostenabrechnung Widerspruch",
    readTime: "9 min",
    date: "Februar 2026",
  },
  {
    slug: "wasserschaden-mietrecht-rechte-pflichten",
    title: "Wasserschaden im Mietrecht: Rechte und Pflichten von Mieter und Vermieter",
    description:
      "Wasserschaden Mietrecht: Wer zahlt bei Rohrbruch, Dachschaden oder Mieterverschulden? Mietminderung nach §536 BGB, Reparaturfristen und Sofortmaßnahmen für Vermieter.",
    keyword: "Wasserschaden Mietrecht",
    readTime: "9 min",
    date: "Februar 2026",
  },
  {
    slug: "hausverwaltung-frankfurt-kosten-2026",
    title: "Hausverwaltung Frankfurt: Was kostet die Mietverwaltung 2026?",
    description:
      "Hausverwaltung Frankfurt Kosten 2026: Mietverwaltung €25-38/Einheit, Frankfurter Mietspiegel €14,50/qm, Vergleich mit Hamburg und Tipps zur Verwalterwahl im Rhein-Main-Gebiet.",
    keyword: "Hausverwaltung Frankfurt Kosten",
    readTime: "9 min",
    date: "Februar 2026",
  },
  {
    slug: "vermieter-pflichten-keller-gemeinschaftsflaechen",
    title: "Vermieter Pflichten Keller und Gemeinschaftsflächen: Was Sie wissen müssen",
    description:
      "Vermieter Pflichten bei Keller, Treppenhaus und Gemeinschaftsflächen: § 535 BGB, Instandhaltung, BetrKV-Umlagefähigkeit und Haftungsrisiken — der komplette Leitfaden.",
    keyword: "Vermieter Pflichten Gemeinschaftsflächen",
    readTime: "9 min",
    date: "Februar 2026",
  },
  {
    slug: "hausverwaltung-frankfurt",
    title: "Hausverwaltung Frankfurt: Kosten und Anbieter im Vergleich 2026",
    description:
      "Hausverwaltung Frankfurt 2026: Aktuelle Marktpreise €25–38/Einheit, Leistungsvergleich und Tipps zur Auswahl des richtigen Hausverwalters in Frankfurt am Main.",
    keyword: "Hausverwaltung Frankfurt",
    readTime: "8 min",
    date: "Februar 2026",
  },
  {
    slug: "verwaltervertrag-kuendigen",
    title: "Verwaltervertrag kündigen: So wechseln Sie die Hausverwaltung fristgerecht",
    description:
      "Verwaltervertrag rechtssicher kündigen: Kündigungsfristen nach §26 WEG und §621 BGB, Muster-Kündigung und Schritt-für-Schritt-Anleitung für den Verwalterwechsel.",
    keyword: "Verwaltervertrag kündigen",
    readTime: "9 min",
    date: "Februar 2026",
  },
  {
    slug: "wohnungsuebergabeprotokoll",
    title: "Wohnungsübergabeprotokoll: Vorlage und Tipps für Vermieter",
    description:
      "Das Wohnungsübergabeprotokoll schützt Vermieter und Mieter. Kostenlose Vorlage, vollständige Checkliste und die 5 häufigsten Fehler die Eigentümer vermeiden sollten.",
    keyword: "Wohnungsübergabeprotokoll",
    readTime: "9 min",
    date: "Februar 2026",
  },
  {
    slug: "hausmeisterservice-hamburg",
    title: "Hausmeisterservice Hamburg: Kosten und worauf Sie achten sollten",
    description:
      "Hausmeisterservice Hamburg 2026: Preise €20–35/Stunde oder €80–350/Monat, Leistungsübersicht, Umlagefähigkeit nach §2 Nr. 14 BetrKV und Auswahlkriterien.",
    keyword: "Hausmeisterservice Hamburg",
    readTime: "8 min",
    date: "Februar 2026",
  },
  {
    slug: "betriebskosten-senken",
    title: "Betriebskosten senken: 8 legale Wege für Vermieter",
    description:
      "8 bewährte Strategien, um Betriebskosten rechtssicher zu reduzieren: Versicherungsvergleich, Mülloptimierung, hydraulischer Abgleich, LED-Umrüstung und mehr.",
    keyword: "Betriebskosten senken",
    readTime: "10 min",
    date: "Februar 2026",
  },
  {
    slug: "indexmiete-vs-staffelmiete",
    title: "Indexmiete vs. Staffelmiete: Was ist besser für Vermieter?",
    description:
      "Vergleich von Indexmiete und Staffelmiete: Vor- und Nachteile für Vermieter, rechtliche Grundlagen §557b BGB, automatische Anpassung vs. Planungssicherheit.",
    keyword: "Indexmiete Staffelmiete Vergleich",
    readTime: "10 min",
    date: "Februar 2026",
  },
  {
    slug: "kautionsrueckgabe-frist",
    title: "Kautionsrückgabe: Wann und wie viel muss der Vermieter zurückzahlen?",
    description:
      "Kautionsrückgabe nach §551 BGB: Rückgabefrist, Verzinsung, Abzüge für Schäden — der komplette Leitfaden für Vermieter und Mieter.",
    keyword: "Kautionsrückgabe Frist",
    readTime: "9 min",
    date: "Februar 2026",
  },
  {
    slug: "abmahnung-mieter-muster",
    title: "Abmahnung Mieter: Wann ist sie berechtigt und wie muss sie formuliert werden?",
    description:
      "Rechtssichere Abmahnung von Mietern: Voraussetzungen nach BGB, Formvorschriften, Fristen und was eine wirksame Abmahnung enthalten muss.",
    keyword: "Abmahnung Mieter Muster",
    readTime: "9 min",
    date: "Februar 2026",
  },
  {
    slug: "vermieter-steuern-optimieren",
    title: "Vermieter Steuern optimieren: Abschreibungen, Werbungskosten und Steuervorteile 2026",
    description:
      "Steuerliche Optimierung für Immobilienvermieter: AfA-Abschreibung, Werbungskosten, Hausverwaltungsgebühren absetzen und alle Steuervorteile nutzen.",
    keyword: "Vermieter Steuern",
    readTime: "10 min",
    date: "Februar 2026",
  },
  {
    slug: "nebenkostenabrechnung-frist-verpasst",
    title: "Nebenkostenabrechnung Frist verpasst: Was passiert nach §556 Abs. 3 BGB?",
    description:
      "12-Monats-Frist für Nebenkostenabrechnung erklärt: Rechtsfolgen bei verspäteter Abrechnung, Ausschlussfrist §556 BGB, was Vermieter beachten müssen.",
    keyword: "Nebenkostenabrechnung Frist",
    readTime: "9 min",
    date: "Februar 2026",
  },
  {
    slug: "eigenbedarfskuendigung-fristen",
    title: "Eigenbedarfskündigung: Voraussetzungen und Fristen nach §573 BGB",
    description:
      "Eigenbedarfskündigung richtig durchführen: Fristen (3/6/9 Monate), berechtigtes Interesse, Angehörige, soziale Härte — der komplette Leitfaden für Vermieter.",
    keyword: "Eigenbedarfskündigung",
    readTime: "10 min",
    date: "Februar 2026",
  },
  {
    slug: "mietkaution-vermieter",
    title: "Mietkaution: Was Vermieter und Mieter wissen müssen (3 Monatsmieten Regel)",
    description:
      "Mietkaution nach §551 BGB: Höchstbetrag 3 Monatsmieten, Kautionskonto-Pflicht, Rückzahlung, Verzinsung — alles was Vermieter beachten müssen.",
    keyword: "Mietkaution Vermieter",
    readTime: "9 min",
    date: "Februar 2026",
  },
  {
    slug: "energieausweis-kosten-2026",
    title: "Energieausweis Kosten 2026: Was kostet ein Energieausweis in Deutschland?",
    description:
      "Energieausweis Kosten 2026: Bedarfsausweis €300-500, Verbrauchsausweis €100-200. §16a GEG Compliance, Bußgeld bis €10.000 — was Eigentümer wissen müssen.",
    keyword: "Energieausweis Kosten",
    readTime: "8 min",
    date: "Februar 2026",
  },
  {
    slug: "whatsapp-mieter-kommunikation",
    title: "WhatsApp für Mieter: Wie moderne Hausverwaltungen kommunizieren",
    description:
      "Mieterkommunikation 2026: Schnelle Bearbeitung, sofortige Rückmeldung, 24/7 Erreichbarkeit — das erwarten Mieter heute von ihrer Hausverwaltung.",
    keyword: "Hausverwaltung WhatsApp Mieter",
    readTime: "8 min",
    date: "Februar 2026",
  },
  {
    slug: "hausverwaltung-muenchen-2026",
    title: "Hausverwaltung München 2026: Kosten, Vergleich und was Eigentümer wissen müssen",
    description:
      "Hausverwaltung München 2026: Kosten €24-38/Einheit, Marktvergleich mit Hamburg, lokale Regulierungen. Was Eigentümer bei der Verwalterwahl beachten müssen.",
    keyword: "Hausverwaltung München",
    readTime: "10 min",
    date: "Februar 2026",
  },
  {
    slug: "vermieter-pflichten-heizung",
    title: "Vermieter Pflichten Heizung: Mindesttemperaturen und Heizperiode",
    description:
      "Welche Mindesttemperaturen muss ein Vermieter gewährleisten? Heizperiode 1. Oktober bis 30. April, 20°C tagsüber, 18°C nachts — Pflichten, Folgen und Tipps.",
    keyword: "Vermieter Pflichten Heizung",
    readTime: "8 min",
    date: "Februar 2026",
  },
  {
    slug: "grundsteuer-hamburg-2025",
    title: "Grundsteuer Hamburg 2025: Was Vermieter jetzt wissen müssen",
    description:
      "Grundsteuerreform 2025 in Hamburg: Neue Messbeträge, Hebesatz 975%, korrekte Umlage auf Mieter und was Vermieter bei den neuen Bescheiden prüfen müssen.",
    keyword: "Grundsteuer Hamburg 2025",
    readTime: "8 min",
    date: "Februar 2026",
  },
  {
    slug: "wohnungsuebergabe-protokoll",
    title: "Wohnungsübergabe Protokoll: Checkliste für die Übergabe",
    description:
      "Das Wohnungsübergabe Protokoll Schritt für Schritt: Räume, Zählerstände, Schlüssel, Fotos — und warum das Protokoll bei Streitigkeiten über die Kaution entscheidend ist.",
    keyword: "Wohnungsübergabe Protokoll",
    readTime: "9 min",
    date: "Februar 2026",
  },
  {
    slug: "mietminderung-hamburg",
    title: "Mietminderung Hamburg: Wann und wie viel darf man kürzen?",
    description:
      "Mietminderung in Hamburg nach §536 BGB: Schimmel 20-100%, Heizungsausfall 10-50% — Tabelle mit typischen Mängeln, Verfahren und Musterschreiben.",
    keyword: "Mietminderung Hamburg",
    readTime: "8 min",
    date: "Februar 2026",
  },
  {
    slug: "nebenkostenabrechnung-pruefen-checkliste",
    title: "Nebenkostenabrechnung prüfen: Checkliste für Mieter und Vermieter",
    description:
      "Die komplette Checkliste zur Nebenkostenabrechnung: Fristen nach §556 BGB, formale und inhaltliche Fehler erkennen, Widerspruch einlegen — für Mieter und Vermieter.",
    keyword: "Nebenkostenabrechnung prüfen Checkliste",
    readTime: "9 min",
    date: "Februar 2026",
  },
  {
    slug: "rauchmelder-pflicht-hamburg",
    title: "Rauchmelder Pflicht Hamburg 2026: Welche Wohnungen sind betroffen?",
    description:
      "Rauchmelderpflicht in Hamburg: Welche Wohnungen brauchen Rauchmelder? Wer ist verantwortlich? Aktuelle Regelungen 2026 mit Bußgeldern.",
    keyword: "Rauchmelder Pflicht Hamburg",
    readTime: "7 min",
    date: "Februar 2026",
  },
  {
    slug: "treppenhausreinigung-pflicht",
    title: "Treppenhausreinigung: Pflichten des Vermieters nach Mietrecht",
    description:
      "Wer muss das Treppenhaus reinigen? Pflichten von Vermieter und Mieter nach Mietrecht — inklusive Kosten und rechtlicher Einordnung.",
    keyword: "Treppenhausreinigung Pflicht",
    readTime: "7 min",
    date: "Februar 2026",
  },
  {
    slug: "wohnungsmaengel-melden",
    title: "Wohnungsmängel melden: Rechte und Pflichten von Mieter und Vermieter",
    description:
      "Wohnungsmängel richtig melden: Fristen, Formvorschriften, Mietminderung und was bei Streit zu tun ist — kompetent erklärt.",
    keyword: "Wohnungsmängel",
    readTime: "8 min",
    date: "Februar 2026",
  },
  {
    slug: "vermieterrechte-mietrecht",
    title: "Vermieterrechte: Was darf ein Vermieter nach deutschem Mietrecht?",
    description:
      "Welche Rechte hat ein Vermieter? Überblick über Zutrittsrecht, Mieterhöhung, Kündigung, Schönheitsreparaturen und mehr nach BGB.",
    keyword: "Vermieterrechte",
    readTime: "9 min",
    date: "Februar 2026",
  },
  {
    slug: "hausverwaltung-muenchen",
    title: "Hausverwaltung München 2026: Kosten, Anbieter und Vergleich",
    description:
      "Hausverwaltung in München 2026: Aktuelle Kosten, Marktpreise, Anbietervergleich und worauf Eigentümer beim Verwalterwechsel achten müssen.",
    keyword: "Hausverwaltung München",
    readTime: "8 min",
    date: "Februar 2026",
  },
  {
    slug: "weg-hamburg",
    title: "WEG Hamburg: Was Wohnungseigentümer über die Verwaltung wissen müssen",
    description:
      "WEG-Verwaltung in Hamburg erklärt: §26 WEG Verwalterbestellung, Eigentümerversammlung, Jahresabrechnung, Rücklagen und wie Sie den richtigen WEG-Verwalter wählen.",
    keyword: "WEG Hamburg",
    readTime: "10 min",
    date: "Februar 2026",
  },
  {
    slug: "mietspiegel-hamburg-2025",
    title: "Mietspiegel Hamburg 2025: Aktuelle Mietpreise und was Vermieter wissen müssen",
    description:
      "Hamburger Mietspiegel 2023/2025 erklärt: Aktuelle Mietpreise nach Stadtteilen, §558c BGB, Mieterhöhung mit Mietspiegel, ortsübliche Vergleichsmiete — der komplette Leitfaden.",
    keyword: "Mietspiegel Hamburg 2025",
    readTime: "9 min",
    date: "Februar 2026",
  },
  {
    slug: "hausordnung-mietwohnung",
    title: "Hausordnung Mietwohnung: Was ist erlaubt und was nicht?",
    description:
      "Hausordnung in der Mietwohnung: Rechtsgrundlagen, was Vermieter vorschreiben dürfen (BVerfG), Ruhezeiten, Treppenhaus, Haustiere und Konsequenzen bei Verstößen.",
    keyword: "Hausordnung Mietwohnung",
    readTime: "9 min",
    date: "Februar 2026",
  },
  {
    slug: "immobilien-vermieten-steuern",
    title: "Immobilien vermieten und Steuern: Was Vermieter 2025 wissen müssen",
    description:
      "Steuern für Vermieter 2025: §21 EStG, Werbungskosten, Hausverwaltungsgebühren steuerlich absetzbar, AfA, Verluste und Spekulationssteuer nach §23 EStG erklärt.",
    keyword: "Immobilien vermieten Steuern",
    readTime: "10 min",
    date: "Februar 2026",
  },
  {
    slug: "verwaltervertrag-hausverwaltung",
    title: "Verwaltervertrag: Was muss ein guter Hausverwaltungsvertrag enthalten?",
    description:
      "Verwaltervertrag Checkliste: §34c GewO Pflichten, Leistungsumfang, Vergütung, Kündigung, Haftung. Red Flags erkennen und den richtigen Hausverwalter wählen.",
    keyword: "Verwaltervertrag Hausverwaltung",
    readTime: "10 min",
    date: "Februar 2026",
  },
  {
    slug: "hausverwaltung-hamburg-altona",
    title: "Hausverwaltung Hamburg Altona: Was Eigentümer wissen müssen",
    description:
      "Altbaubestand, Denkmalschutz, steigende Preise: Was eine gute Hausverwaltung in Hamburg-Altona leisten muss — und wie Sie die Richtige finden.",
    keyword: "Hausverwaltung Hamburg Altona",
    readTime: "8 min",
    date: "Februar 2026",
  },
  {
    slug: "wasserschaden-mietwohnung",
    title: "Wasserschaden in der Mietwohnung: Wer zahlt und was jetzt zu tun ist",
    description:
      "Rohrbruch, undichtes Dach, Waschmaschine defekt: Wer zahlt bei einem Wasserschaden in der Mietwohnung? § 535 BGB, Versicherung, Mängelanzeige und Fristen erklärt.",
    keyword: "Wasserschaden Mietwohnung",
    readTime: "8 min",
    date: "Februar 2026",
  },
  {
    slug: "weg-vs-mietverwaltung",
    title: "WEG-Verwaltung vs. Mietverwaltung: Was ist der Unterschied?",
    description:
      "WEG oder Mietverwaltung — oder beides? Der vollständige Vergleich: Aufgaben, Rechtsbasis (§ 26 WEG, BGB), Kosten und wann Sie welche Form brauchen.",
    keyword: "WEG Verwaltung Unterschied",
    readTime: "8 min",
    date: "Februar 2026",
  },
  {
    slug: "hausverwaltung-kuendigen-muster",
    title: "Hausverwaltung kündigen: Muster-Kündigung und wichtige Fristen",
    description:
      "Kündigung der Hausverwaltung: § 621 BGB, Kündigungsfristen (meist 3 Monate), Muster-Kündigungsbrief und Checkliste für einen reibungslosen Verwalterwechsel.",
    keyword: "Hausverwaltung kündigen Muster",
    readTime: "9 min",
    date: "Februar 2026",
  },
  {
    slug: "nebenkostenabrechnung-pruefen",
    title: "Nebenkostenabrechnung prüfen: So erkennen Sie Fehler als Mieter und Vermieter",
    description:
      "§ 556 BGB, 12-Monats-Frist, häufige Fehler und Muster-Widerspruch: Der Leitfaden zur richtigen Prüfung der Nebenkostenabrechnung — für Mieter und Vermieter.",
    keyword: "Nebenkostenabrechnung prüfen",
    readTime: "9 min",
    date: "Februar 2026",
  },
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
  {
    slug: "hausverwaltung-frankfurt-kosten",
    title: "Hausverwaltung Frankfurt: Kosten, Preise und Vergleich 2026",
    description:
      "Aktuelle Kosten für Hausverwaltung in Frankfurt am Main. Mietverwaltung €25-38/Einheit, WEG €24-34/Einheit. Preisvergleich und Tipps.",
    keyword: "Hausverwaltung Frankfurt Kosten",
    readTime: "7 min",
    date: "Februar 2026",
  },
  {
    slug: "mietverwaltung-oder-wohnungseigentumsverwaltung",
    title: "WEG oder Mietverwaltung: Was brauchen Sie?",
    description:
      "Unterschiede zwischen WEG-Verwaltung und Mietverwaltung erklärt. Kosten, Leistungen und wann welche Form sinnvoll ist.",
    keyword: "WEG Verwaltung vs Mietverwaltung",
    readTime: "6 min",
    date: "Februar 2026",
  },
  {
    slug: "vermieter-pflichten-winter-heizung-schnee",
    title: "Vermieter Pflichten im Winter: Heizung, Schneeräumen & mehr",
    description:
      "Heizpflicht, Schneeräumung, Streupflicht — alle Winterpflichten für Vermieter nach §535 BGB und Verkehrssicherungspflicht.",
    keyword: "Vermieter Pflichten Winter",
    readTime: "6 min",
    date: "Februar 2026",
  },
  {
    slug: "hausverwaltung-wechseln-checkliste",
    title: "Hausverwaltung wechseln: Die ultimative Checkliste",
    description:
      "Schritt-für-Schritt Anleitung zum Verwalterwechsel: Fristen, Kündigungsvorlage, Übergabe-Checkliste und typische Fehler.",
    keyword: "Hausverwaltung wechseln Checkliste",
    readTime: "7 min",
    date: "Februar 2026",
  },
  {
    slug: "betriebskosten-senken-tipps",
    title: "Betriebskosten senken: 10 Tipps für Vermieter",
    description:
      "10 erprobte Strategien zur Senkung der Nebenkosten. Versicherungen, Energiekosten und Wartungsverträge optimieren.",
    keyword: "Betriebskosten senken",
    readTime: "8 min",
    date: "Februar 2026",
  },
  // Sprint 12 — Köln/Stuttgart + high-value evergreen topics
  {
    slug: "hausverwaltung-koeln-kosten",
    title: "Hausverwaltung Köln Kosten 2026: Was kostet eine Mietverwaltung?",
    description:
      "Hausverwaltung Köln Kosten 2026: Marktpreise €20–35/Einheit, Preisfaktoren, Leistungsumfang und ROI. Transparent erklärt.",
    keyword: "Hausverwaltung Köln Kosten",
    readTime: "8 min",
    date: "Februar 2026",
  },
  {
    slug: "hausverwaltung-stuttgart-kosten",
    title: "Hausverwaltung Stuttgart Kosten 2026: Preise im Vergleich",
    description:
      "Hausverwaltung Stuttgart Kosten 2026: Marktpreise €24–38/Einheit, teuerster Markt Deutschlands, Preisfaktoren und ROI. Transparent erklärt.",
    keyword: "Hausverwaltung Stuttgart Kosten",
    readTime: "8 min",
    date: "Februar 2026",
  },
  {
    slug: "vermieter-pflichten-checkliste",
    title: "Vermieter Pflichten 2026: Die vollständige Checkliste",
    description:
      "Alle gesetzlichen Pflichten für Vermieter 2026: Instandhaltung, Nebenkostenabrechnung, Heizung, Rauchmelder, DSGVO und mehr.",
    keyword: "Vermieter Pflichten Checkliste",
    readTime: "9 min",
    date: "Februar 2026",
  },
  {
    slug: "mietvertrag-befristet",
    title: "Befristeter Mietvertrag nach §575 BGB: Voraussetzungen & Risiken",
    description:
      "Zeitmietvertrag 2026: Wann ist er nach §575 BGB zulässig? Eigenbedarfsbefristung, Risiken unwirksamer Befristung und BGH-Rechtsprechung.",
    keyword: "Befristeter Mietvertrag §575 BGB",
    readTime: "8 min",
    date: "Februar 2026",
  },
  // Sprint 14 — Cost guide, landlord obligations, tenant rights
  {
    slug: "hausverwaltung-kosten-2026",
    title: "Hausverwaltung Kosten 2026: Was kostet eine Hausverwaltung wirklich?",
    description:
      "Vollständiger Kostenguide: Mietverwaltung €22–38/Einheit, WEG-Verwaltung €20–34/Einheit. Preismodelle, was inklusive ist, versteckte Kosten und Bewertungskriterien.",
    keyword: "Hausverwaltung Kosten 2026",
    readTime: "10 min",
    date: "Februar 2026",
  },
  {
    slug: "mietminderung-gruende",
    title: "Mietminderung Gründe: Was Mieter mindern dürfen — Vermieter-Leitfaden",
    description:
      "§536 BGB erklärt: Heizungsausfall, Schimmel, Lärmbelästigung — Minderungsquoten, Voraussetzungen und wie Sie als Vermieter Konflikte lösen.",
    keyword: "Mietminderung Gründe",
    readTime: "9 min",
    date: "Februar 2026",
  },
  {
    slug: "eigentuemer-pflichten-vermietung",
    title: "Eigentümer Pflichten Vermietung: Die vollständige Checkliste 2026",
    description:
      "Alle gesetzlichen Vermieterpflichten: Instandhaltung, Verkehrssicherungspflicht, Energieausweis, Rauchmelder, Nebenkostenabrechnung und DSGVO.",
    keyword: "Eigentümer Pflichten Vermietung",
    readTime: "11 min",
    date: "Februar 2026",
  },
  {
    slug: "wohnungsuebergabe-protokoll",
    title: "Wohnungsübergabe Protokoll: Checkliste & Vorlage für Vermieter 2026",
    description:
      "Rechtssichere Übergabe: Was dokumentiert werden muss, Checkliste für Ein- und Auszug, Zählerstände, Schlüssel und häufige Fehler vermeiden.",
    keyword: "Wohnungsübergabe Protokoll",
    readTime: "9 min",
    date: "Februar 2026",
  },
  {
    slug: "hausverwaltung-kuendigen-frist",
    title: "Hausverwaltung kündigen: Fristen, Ablauf und Checkliste für den Wechsel",
    description:
      "Hausverwalter kündigen 2026: Kündigungsfristen für WEG (§26 WEG) und Mietverwaltung, außerordentliche Kündigung und vollständige Übergabe-Checkliste.",
    keyword: "Hausverwaltung kündigen Frist",
    readTime: "9 min",
    date: "Februar 2026",
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
