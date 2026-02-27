import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://einfach-verwaltet.de";
  const today = new Date("2026-02-27");

  // ─── Static marketing pages ───────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, priority: 1.0, changeFrequency: "weekly", lastModified: today },
    // High-intent conversion pages
    { url: `${baseUrl}/anfrage`, priority: 0.9, changeFrequency: "monthly", lastModified: today },
    { url: `${baseUrl}/beta`, priority: 0.9, changeFrequency: "weekly", lastModified: today },
    { url: `${baseUrl}/preise`, priority: 0.9, changeFrequency: "monthly", lastModified: today },
    { url: `${baseUrl}/leistungen`, priority: 0.8, changeFrequency: "monthly", lastModified: today },
    { url: `${baseUrl}/kontakt`, priority: 0.8, changeFrequency: "monthly", lastModified: today },
    // Tools & utilities — high-value SEO
    { url: `${baseUrl}/werkzeuge`, priority: 0.8, changeFrequency: "monthly", lastModified: today },
    { url: `${baseUrl}/bka-rechner`, priority: 0.8, changeFrequency: "monthly", lastModified: today },
    { url: `${baseUrl}/mieterhohung-rechner`, priority: 0.8, changeFrequency: "monthly", lastModified: today },
    { url: `${baseUrl}/beschlussprotokoll`, priority: 0.8, changeFrequency: "monthly", lastModified: today },
    { url: `${baseUrl}/eigentuemerversammlung-online`, priority: 0.9, changeFrequency: "monthly", lastModified: today },
    { url: `${baseUrl}/wechseln`, priority: 0.8, changeFrequency: "monthly", lastModified: today },
    // Blog & content hub
    { url: `${baseUrl}/blog`, priority: 0.8, changeFrequency: "weekly", lastModified: today },
    // Demo
    { url: `${baseUrl}/demo`, priority: 0.5, changeFrequency: "monthly", lastModified: today },
    // Other marketing
    { url: `${baseUrl}/nachfolge`, priority: 0.7, changeFrequency: "monthly", lastModified: today },
    { url: `${baseUrl}/kostenvergleich`, priority: 0.8, changeFrequency: "monthly", lastModified: today },
    { url: `${baseUrl}/pitch`, priority: 0.5, changeFrequency: "monthly", lastModified: today },
    // Legal pages (low priority)
    { url: `${baseUrl}/impressum`, priority: 0.3, changeFrequency: "yearly", lastModified: today },
    { url: `${baseUrl}/datenschutz`, priority: 0.3, changeFrequency: "yearly", lastModified: today },
    { url: `${baseUrl}/agb`, priority: 0.3, changeFrequency: "yearly", lastModified: today },
  ];

  // ─── City pages (priority 0.8) ────────────────────────────────────────────
  const cityPages: MetadataRoute.Sitemap = [
    "hausverwaltung-hamburg",
    "hausverwaltung-berlin",
    "hausverwaltung-muenchen",
    "hausverwaltung-frankfurt",
    "hausverwaltung-duesseldorf",
    "hausverwaltung-bremen",
    "hausverwaltung-hannover",
    "hausverwaltung-koeln",
    "hausverwaltung-leipzig",
    "hausverwaltung-stuttgart",
    "hausverwaltung-nuernberg",
    "hausverwaltung-dortmund",
    "hausverwaltung-essen",
    "hausverwaltung-bonn",
    "hausverwaltung-bielefeld",
    "hausverwaltung-karlsruhe",
    "hausverwaltung-augsburg",
    "hausverwaltung-wiesbaden",
    "hausverwaltung-freiburg",
    "hausverwaltung-mannheim",
    "hausverwaltung-magdeburg",
    "hausverwaltung-kiel",
    "checkliste",
  ].map((slug) => ({
    url: `${baseUrl}/${slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
    lastModified: today,
  }));

  // ─── Pillar / service pages (priority 0.8) ────────────────────────────────
  const pillarPages: MetadataRoute.Sitemap = [
    "mietverwaltung-hamburg",
    "weg-verwaltung",
    "hausverwaltung-wechseln",
    "hausverwaltung-hamburg-vergleich",
  ].map((slug) => ({
    url: `${baseUrl}/${slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
    lastModified: today,
  }));

  // ─── Blog posts (priority 0.7) ────────────────────────────────────────────
  // All 74 blog posts discovered from app/blog/ directory
  const blogSlugs = [
    // Sprint 1 — Core Hamburg SEO
    "weg-hamburg",
    "mietspiegel-hamburg-2025",
    "hausordnung-mietwohnung",
    "immobilien-vermieten-steuern",
    "verwaltervertrag-hausverwaltung",
    // Sprint 2 — Wechseln + NKA
    "hausverwaltung-wechseln-hamburg",
    "nebenkostenabrechnung-fehler",
    "mieterhohung-hamburg-2026",
    "hausverwaltung-hamburg-kosten",
    "moderne-hausverwaltung-2026",
    // Sprint 3 — BKA + Eigentümer + Kündigen
    "betriebskostenabrechnung-hamburg",
    "eigentuemerversammlung-vorbereiten",
    "mietvertrag-kuendigen-hamburg",
    "hausverwaltung-selbst-machen",
    "schoenheitsreparaturen-bgh-2026",
    // Sprint 4 — Hamburg districts + repairs
    "hausverwaltung-hamburg-altona",
    "wasserschaden-mietwohnung",
    "weg-vs-mietverwaltung",
    "hausverwaltung-kuendigen-muster",
    "nebenkostenabrechnung-pruefen",
    // Additional pillar blog posts
    "hausverwalter-wechseln-hamburg",
    "weg-verwaltung-hamburg",
    "beschlussprotokoll-eigentuemerversammlung",
    // Sprint 5 — Berlin SEO + high-value topics
    "hausverwaltung-berlin-wechseln",
    "mietpreisbremse-berlin-2026",
    "eigentuemerversammlung-online",
    "wohnungseigentuemer-rechte-pflichten",
    "hausverwaltung-kuendigen-frist",
    // Sprint 7 — AEO-optimized posts
    "nebenkostenabrechnung-pruefen-checkliste",
    "mietminderung-hamburg",
    "wohnungsuebergabe-protokoll",
    "grundsteuer-hamburg-2025",
    "vermieter-pflichten-heizung",
    // Sprint 8 — City + legal posts
    "eigenbedarfskuendigung-fristen",
    "energieausweis-kosten-2026",
    "hausverwaltung-muenchen",
    "hausverwaltung-muenchen-2026",
    "mietkaution-vermieter",
    "rauchmelder-pflicht-hamburg",
    "treppenhausreinigung-pflicht",
    "vermieterrechte-mietrecht",
    "whatsapp-mieter-kommunikation",
    // Sprint 9 — NKA + Mahnung + Kaution
    "nebenkostenabrechnung-frist-verpasst",
    "vermieter-steuern-optimieren",
    "abmahnung-mieter-muster",
    "kautionsrueckgabe-frist",
    "indexmiete-vs-staffelmiete",
    // Sprint 10 — Frankfurt + evergreen
    "hausverwaltung-frankfurt",
    "verwaltervertrag-kuendigen",
    "wohnungsuebergabeprotokoll",
    "hausmeisterservice-hamburg",
    "betriebskosten-senken",
    // Sprint 11 — Frankfurt/Düsseldorf SEO + evergreen
    "hausverwaltung-frankfurt-kosten",
    "mietverwaltung-oder-wohnungseigentumsverwaltung",
    "vermieter-pflichten-winter-heizung-schnee",
    "hausverwaltung-wechseln-checkliste",
    "betriebskosten-senken-tipps",
    // Sprint 12 — Köln/Stuttgart + evergreen
    "hausverwaltung-koeln-kosten",
    "hausverwaltung-stuttgart-kosten",
    "vermieter-pflichten-checkliste",
    "mietvertrag-befristet",
    // Sprint 13 — Hausordnung, Kaution, Verwaltervertrag, NKA, Kosten sparen
    "hausordnung-vorlage-vermieter",
    "mietkaution-zurueckhalten-vermieter",
    "nebenkostenabrechnung-mieter-pruefen",
    "hausverwaltung-kosten-sparen",
    // Additional discovered posts
    "betriebskostenabrechnung-widerspruch-mieter",
    "grundsteuer-reform-2025-vermieter",
    "hausverwaltung-frankfurt-kosten-2026",
    "mietminderung-voraussetzungen",
    "vermieter-pflichten-keller-gemeinschaftsflaechen",
    "verwaltervertrag-kuendigen-frist",
    "wasserschaden-mietrecht-rechte-pflichten",
    "weg-verwaltung-hamburg-kosten-vergleich",
    "wohnungsmaengel-melden",
    // Sprint 14 — Cost guide, landlord obligations, tenant rights
    "hausverwaltung-kosten-2026",
    "mietminderung-gruende",
    "eigentuemer-pflichten-vermietung",
    "wohnungsuebergabe-protokoll",
    "hausverwaltung-kuendigen-frist",
    // Sprint 15 — City page SEO support posts
    "hausverwaltung-frankfurt-kosten",
    "hausverwaltung-duesseldorf-wechseln",
    "weg-verwaltung-hannover",
    "mietverwaltung-leipzig-kosten",
    "hausverwaltung-kuendigen-was-tun",
    // Sprint 16 — Essen/Dortmund + BK Checkliste + Mietvertrag + NKA Einspruch
    "hausverwaltung-essen",
    "hausverwaltung-dortmund",
    "betriebskosten-checkliste-vermieter",
    "mietvertrag-klauseln-unwirksam",
    "nebenkostenabrechnung-einspruch-fristen",
    // Sprint 18 — Mietrecht FAQ, Software Vergleich, Kaution, BKA Fehler, Kündigen Vorlage
    "mietrecht-faq",
    "hausverwaltung-software-vergleich",
    "mietkaution-rueckzahlung",
    "betriebskostenabrechnung-fehler",
    "hausverwaltung-kuendigen-vorlage",
    // Sprint 19 — Legal obligations, Energieausweis, Mietminderung, NKA-Frist
    "energieausweis-pflicht-vermieter",
    "mietvertrag-sonderklauseln",
    "vermieter-pflichten-mietminderung",
    "nebenkostenabrechnung-frist-vermieter",
    // Sprint 20 — Mannheim city blog, Vermieter-Handbuch, Mietrechtsstreit, Qualitätskriterien, Software
    "hausverwaltung-mannheim",
    "vermieter-handbuch-2026",
    "mietrecht-streitigkeiten-loesen",
    "hausverwaltung-qualitaet-kriterien",
    "immobilienverwaltung-software-2026",
  ];

  const blogPosts: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
    lastModified: today,
  }));

  return [
    ...staticPages,
    ...cityPages,
    ...pillarPages,
    ...blogPosts,
  ];
}
