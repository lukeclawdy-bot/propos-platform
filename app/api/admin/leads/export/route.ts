export const dynamic = "force-dynamic";

import { db, hasDatabase } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

// Parse einheiten string to estimated units number
function parseEinheiten(einheiten: string | null): number {
  if (!einheiten) return 0;
  
  if (einheiten.includes("1-3")) return 2;
  if (einheiten.includes("4-10")) return 7;
  if (einheiten.includes("11-30")) return 20;
  if (einheiten.includes("31-100")) return 65;
  if (einheiten.includes("100+") || einheiten.includes("mehr als 100")) return 120;
  
  const match = einheiten.match(/(\d+)/);
  if (match) {
    const num = parseInt(match[1]);
    if (num >= 1 && num <= 3) return 2;
    if (num >= 4 && num <= 10) return 7;
    if (num >= 11 && num <= 30) return 20;
    if (num >= 31 && num <= 100) return 65;
    if (num > 100) return 120;
  }
  
  return 0;
}

interface Lead {
  id: string;
  createdAt: Date;
  name: string;
  email: string;
  telefon: string | null;
  verwaltungstyp: string | null;
  einheiten: string | null;
  standort: string | null;
  situation: string | null;
  prioritaet: string | null;
  status: string | null;
  notes: string | null;
  source: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  contactedAt: Date | null;
  demoAt: Date | null;
  proposalSentAt: Date | null;
  wonAt: Date | null;
  lostAt: Date | null;
  lostReason: string | null;
}

export async function GET() {
  if (!hasDatabase || !db) {
    return NextResponse.json({ error: "Database not available" }, { status: 500 });
  }

  try {
    const data = await db.query.leads.findMany({
      orderBy: desc(leads.createdAt),
    }) as Lead[];

    const headers = [
      "ID",
      "Datum",
      "Name",
      "E-Mail",
      "Telefon",
      "Verwaltungstyp",
      "Einheiten",
      "Geschatzte Einheiten",
      "Pipeline Value (EUR)",
      "Standort",
      "Situation",
      "Priorität",
      "Status",
      "Source",
      "UTM Medium",
      "UTM Campaign",
      "Kontaktiert am",
      "Demo am",
      "Angebot gesendet am",
      "Gewonnen am",
      "Verloren am",
      "Verloren Grund",
      "Notizen",
    ];

    const rows = data.map((lead) => {
      const estimatedUnits = parseEinheiten(lead.einheiten);
      const pipelineValue = estimatedUnits * 29; // €29 per unit
      
      return [
        lead.id,
        new Date(lead.createdAt).toISOString(),
        lead.name,
        lead.email,
        lead.telefon || "",
        lead.verwaltungstyp || "",
        lead.einheiten || "",
        estimatedUnits.toString(),
        pipelineValue.toString(),
        lead.standort || "",
        lead.situation || "",
        lead.prioritaet || "",
        lead.status || "",
        lead.source || "",
        lead.utmMedium || "",
        lead.utmCampaign || "",
        lead.contactedAt ? new Date(lead.contactedAt).toISOString() : "",
        lead.demoAt ? new Date(lead.demoAt).toISOString() : "",
        lead.proposalSentAt ? new Date(lead.proposalSentAt).toISOString() : "",
        lead.wonAt ? new Date(lead.wonAt).toISOString() : "",
        lead.lostAt ? new Date(lead.lostAt).toISOString() : "",
        lead.lostReason || "",
        lead.notes || "",
      ];
    });

    const csvContent = [
      headers.join(";"),
      ...rows.map((row) =>
        row
          .map((cell) => {
            const cellStr = String(cell);
            if (cellStr.includes(";") || cellStr.includes('"')) {
              return `"${cellStr.replace(/"/g, '""')}"`;
            }
            return cellStr;
          })
          .join(";")
      ),
    ].join("\n");

    return new NextResponse(csvContent, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="leads-export-${new Date().toISOString().split("T")[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error("Failed to export leads:", error);
    return NextResponse.json({ error: "Failed to export leads" }, { status: 500 });
  }
}
