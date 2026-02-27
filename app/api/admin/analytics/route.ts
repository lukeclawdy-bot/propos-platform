export const dynamic = "force-dynamic";

import { db, hasDatabase } from "@/lib/db";
import { leads, outreachContacts, emailEvents } from "@/lib/db/schema";
import { sql, gte, and } from "drizzle-orm";
import { subDays, startOfDay, startOfWeek } from "date-fns";
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

export async function GET() {
  if (!hasDatabase || !db) {
    return NextResponse.json({ 
      leads: { total: 0, thisWeek: 0, byStatus: {}, byStandort: {}, byVerwaltungstyp: {}, byEinheiten: {}, completionRate: 0 },
      pipeline: { totalValueCents: 0, byStage: {}, avgDealValueCents: 0 },
      outreach: { total: 0, byStage: {}, overdueTouchCount: 0, responseRate: 0 },
      activity: { emailsSentToday: 0, emailsSentThisWeek: 0 }
    });
  }

  try {
    const now = new Date();
    const weekAgo = subDays(now, 7);
    const dayAgo = subDays(now, 1);
    const twoWeeksAgo = subDays(now, 14);

    // ─── LEADS ANALYTICS ─────────────────────────────────────────────────────
    
    // Get all leads
    const allLeads = await db.query.leads.findMany();
    
    // Leads this week
    const leadsThisWeek = allLeads.filter(l => l.createdAt && l.createdAt >= weekAgo);
    const leadsLastWeek = allLeads.filter(l => {
      const date = l.createdAt;if (!date) return false;
      return date >= twoWeeksAgo && date < weekAgo;
    });

    // By status
    const byStatus: Record<string, number> = {};
    allLeads.forEach(l => {
      const status = l.status || 'new';
      byStatus[status] = (byStatus[status] || 0) + 1;
    });

    // By standort
    const byStandort: Record<string, number> = {};
    allLeads.forEach(l => {
      if (l.standort) {
        byStandort[l.standort] = (byStandort[l.standort] || 0) + 1;
      }
    });

    // By verwaltungstyp
    const byVerwaltungstyp: Record<string, number> = {};
    allLeads.forEach(l => {
      if (l.verwaltungstyp) {
        byVerwaltungstyp[l.verwaltungstyp] = (byVerwaltungstyp[l.verwaltungstyp] || 0) + 1;
      }
    });

    // By einheiten range
    const byEinheiten: Record<string, number> = {};
    allLeads.forEach(l => {
      const range = l.einheiten || 'Unknown';
      byEinheiten[range] = (byEinheiten[range] || 0) + 1;
    });

    // Completion rate (leads with all fields filled)
    const completedLeads = allLeads.filter(l => 
      l.verwaltungstyp && l.einheiten && l.standort
    );
    const completionRate = allLeads.length > 0 
      ? Math.round((completedLeads.length / allLeads.length) * 100) 
      : 0;

    // By source
    const bySource: Record<string, number> = {};
    allLeads.forEach(l => {
      const source = l.source || 'quiz';
      bySource[source] = (bySource[source] || 0) + 1;
    });

    // ─── PIPELINE ANALYTICS ──────────────────────────────────────────────────
    
    // Active pipeline (non-lost leads)
    const activeLeads = allLeads.filter(l => l.status !== 'lost');
    const totalValueCents = activeLeads.reduce((sum, l) => {
      const units = l.estimatedUnits || parseEinheiten(l.einheiten);
      return sum + (units * 2900);
    }, 0);

    // Pipeline by stage
    const byStage: Record<string, { count: number; valueCents: number }> = {
      new: { count: 0, valueCents: 0 },
      contacted: { count: 0, valueCents: 0 },
      demo_booked: { count: 0, valueCents: 0 },
      proposal_sent: { count: 0, valueCents: 0 },
      won: { count: 0, valueCents: 0 },
      lost: { count: 0, valueCents: 0 },
    };
    
    allLeads.forEach(l => {
      const status = l.status || 'new';
      const units = l.estimatedUnits || parseEinheiten(l.einheiten);
      const value = units * 2900;
      
      if (!byStage[status]) {
        byStage[status] = { count: 0, valueCents: 0 };
      }
      byStage[status].count++;
      byStage[status].valueCents += value;
    });

    // Avg deal value (for won deals)
    const wonLeads = allLeads.filter(l => l.status === 'won');
    const wonValue = wonLeads.reduce((sum, l) => {
      const units = l.estimatedUnits || parseEinheiten(l.einheiten);
      return sum + (units * 2900);
    }, 0);
    const avgDealValueCents = wonLeads.length > 0 ? Math.round(wonValue / wonLeads.length) : 0;

    // ─── OUTREACH ANALYTICS ──────────────────────────────────────────────────
    
    const allContacts = await db.query.outreachContacts.findMany();
    
    // By pipeline stage
    const outreachByStage: Record<string, number> = {};
    allContacts.forEach(c => {
      const stage = c.pipelineStage || 'identified';
      outreachByStage[stage] = (outreachByStage[stage] || 0) + 1;
    });

    // Overdue follow-ups
    const overdueTouches = allContacts.filter(c => {
      if (c.pipelineStage === 'signed' || c.pipelineStage === 'dead') return false;
      if (!c.followUpDueAt) return false;
      return new Date(c.followUpDueAt) < now;
    });

    // Response rate (responded and beyond)
    const respondedContacts = allContacts.filter(c => {
      const stage = c.pipelineStage || 'identified';
      return ['responded', 'meeting', 'demo', 'proposal', 'signed'].includes(stage);
    });
    const responseRate = allContacts.length > 0 
      ? Math.round((respondedContacts.length / allContacts.length) * 100)
      : 0;

    // ─── ACTIVITY ANALYTICS ──────────────────────────────────────────────────
    
    // Email events today
    const todayStart = startOfDay(now);
    const emailsSentToday = await db.select({ count: sql<number>`count(*)` })
      .from(emailEvents)
      .where(and(
        gte(emailEvents.createdAt, todayStart),
        sql`${emailEvents.eventType} = 'sent'`
      ));

    // Email events this week
    const weekStart = startOfWeek(now, { weekStartsOn: 1 });
    const emailsSentThisWeek = await db.select({ count: sql<number>`count(*)` })
      .from(emailEvents)
      .where(and(
        gte(emailEvents.createdAt, weekStart),
        sql`${emailEvents.eventType} = 'sent'`
      ));

    return NextResponse.json({
      leads: {
        total: allLeads.length,
        thisWeek: leadsThisWeek.length,
        lastWeek: leadsLastWeek.length,
        byStatus,
        byStandort,
        byVerwaltungstyp,
        byEinheiten,
        bySource,
        completionRate,
      },
      pipeline: {
        totalValueCents,
        byStage,
        avgDealValueCents,
      },
      outreach: {
        total: allContacts.length,
        byStage: outreachByStage,
        overdueTouchCount: overdueTouches.length,
        responseRate,
      },
      activity: {
        emailsSentToday: emailsSentToday[0]?.count || 0,
        emailsSentThisWeek: emailsSentThisWeek[0]?.count || 0,
      }
    });
  } catch (error) {
    console.error("Failed to fetch analytics:", error);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
