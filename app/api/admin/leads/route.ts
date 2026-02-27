export const dynamic = "force-dynamic";

import { db, hasDatabase } from "@/lib/db";
import { leads, emailEvents } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

// Parse einheiten string to estimated units number
function parseEinheiten(einheiten: string | null): number {
  if (!einheiten) return 0;
  
  // Map ranges to representative values
  // 1-3→2, 4-10→7, 11-30→20, 31-100→65, 100+→120
  if (einheiten.includes("1-3")) return 2;
  if (einheiten.includes("4-10")) return 7;
  if (einheiten.includes("11-30")) return 20;
  if (einheiten.includes("31-100")) return 65;
  if (einheiten.includes("100+") || einheiten.includes("mehr als 100")) return 120;
  
  // Try to extract number directly
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

interface EnrichedLead {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
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
  estimatedUnits: number | null;
  pipelineValueCents: number | null;
  assignedTo: string | null;
}

export async function GET() {
  if (!hasDatabase || !db) {
    return NextResponse.json({ error: "Database not available" }, { status: 500 });
  }

  try {
    const data = await db.query.leads.findMany({
      orderBy: desc(leads.createdAt),
    }) as EnrichedLead[];

    // Enrich with computed fields
    const enrichedLeads = data.map(lead => {
      const estimatedUnits = parseEinheiten(lead.einheiten);
      const pipelineValueCents = estimatedUnits * 2900; // €29 per unit per month
      
      return {
        ...lead,
        estimatedUnits: lead.estimatedUnits ?? estimatedUnits,
        pipelineValueCents: lead.pipelineValueCents ?? pipelineValueCents,
      };
    });

    return NextResponse.json({ leads: enrichedLeads });
  } catch (error) {
    console.error("Failed to fetch leads:", error);
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}
