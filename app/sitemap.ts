import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://einfach-verwaltet.de";

  const staticPages = [
    { url: baseUrl, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/leistungen`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/preise`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/anfrage`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/beta`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/kontakt`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/blog`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/mieterhohung-rechner`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/bka-rechner`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/beschlussprotokoll`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/hausverwaltung-hamburg-vergleich`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/hausverwaltung-berlin`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/hausverwaltung-hamburg`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/mietverwaltung-hamburg`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/hausverwaltung-wechseln`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/weg-verwaltung`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/impressum`, priority: 0.3, changeFrequency: "yearly" as const },
    { url: `${baseUrl}/datenschutz`, priority: 0.3, changeFrequency: "yearly" as const },
    { url: `${baseUrl}/agb`, priority: 0.3, changeFrequency: "yearly" as const },
  ];

  const blogPosts = [
    "weg-hamburg",
    "mietspiegel-hamburg-2025",
    "hausordnung-mietwohnung",
    "immobilien-vermieten-steuern",
    "verwaltervertrag-hausverwaltung",
    "hausverwaltung-wechseln-hamburg",
    "nebenkostenabrechnung-fehler",
    "mieterhohung-hamburg-2026",
    "hausverwaltung-hamburg-kosten",
    "moderne-hausverwaltung-2026",
    "betriebskostenabrechnung-hamburg",
    "eigentuemerversammlung-vorbereiten",
    "mietvertrag-kuendigen-hamburg",
    "hausverwaltung-selbst-machen",
    "schoenheitsreparaturen-bgh-2026",
    "hausverwaltung-hamburg-altona",
    "wasserschaden-mietwohnung",
    "weg-vs-mietverwaltung",
    "hausverwaltung-kuendigen-muster",
    "nebenkostenabrechnung-pruefen",
    "hausverwalter-wechseln-hamburg",
    "weg-verwaltung-hamburg",
    "beschlussprotokoll-eigentuemerversammlung",
  ].map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
    lastModified: new Date("2026-02-01"),
  }));

  return [
    ...staticPages.map((page) => ({
      ...page,
      lastModified: new Date("2026-02-26"),
    })),
    ...blogPosts,
  ];
}
