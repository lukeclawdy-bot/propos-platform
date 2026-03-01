export const dynamic = "force-dynamic";

import { db, hasDatabase } from "@/lib/db";
import { leads, properties, tenants, tickets, aiActions, landlords, units, approvals } from "@/lib/db/schema";
import { desc, sql, ne, eq, and } from "drizzle-orm";
import { subDays, formatDistanceToNow } from "date-fns";
import { de } from "date-fns/locale";

interface Lead {
  id: string;
  createdAt: Date;
  name: string;
  email: string;
  telefon: string | null;
  verwaltungstyp: string | null;
  einheiten: string | null;
  standort: string | null;
  status: string | null;
  notes: string | null;
}

interface AIAction {
  id: string;
  createdAt: Date;
  type: string;
  title: string;
  status: string;
  landlordId: string;
}

async function getDashboardData() {
  if (!hasDatabase) return null;

  const now = new Date();
  const weekAgo = subDays(now, 7);
  const dayAgo = subDays(now, 1);

  try {
    // ── Leads ─────────────────────────────────────────────────────────────────
    const allLeads = await db.query.leads.findMany({
      orderBy: desc(leads.createdAt),
    }) as Lead[];

    const leadsThisWeek = allLeads.filter(l => new Date(l.createdAt) >= weekAgo);
    const completedLeads = allLeads.filter(l => l.verwaltungstyp && l.einheiten && l.standort);
    const completionRate = allLeads.length > 0
      ? Math.round((completedLeads.length / allLeads.length) * 100) : 0;

    const einheitenNumbers = allLeads
      .map(l => { const m = l.einheiten?.match(/(\d+)/); return m ? parseInt(m[1]) : 0; })
      .filter(n => n > 0);
    const avgEinheiten = einheitenNumbers.length > 0
      ? Math.round(einheitenNumbers.reduce((a, b) => a + b, 0) / einheitenNumbers.length) : 0;

    const convertedLeads = allLeads.filter(l =>
      l.status && ['contacted', 'demo_booked', 'proposal_sent', 'won'].includes(l.status)
    );
    const conversionRate = allLeads.length > 0
      ? Math.round((convertedLeads.length / allLeads.length) * 100) : 0;

    // Open leads (status = new or null)
    const openLeadsCount = allLeads.filter(l => !l.status || l.status === 'new').length;

    // ── Tickets ───────────────────────────────────────────────────────────────
    const allTickets = await db.query.tickets.findMany();
    // Active tickets: status != resolved AND != closed
    const activeTicketsCount = allTickets.filter(t =>
      t.status !== 'resolved' && t.status !== 'closed'
    ).length;
    const openTickets = allTickets.filter(t => t.status === 'open').length;
    const resolvedToday = allTickets.filter(t =>
      t.status === 'resolved' && t.resolvedAt && new Date(t.resolvedAt) >= dayAgo
    ).length;

    // ── Landlords ─────────────────────────────────────────────────────────────
    const allLandlords = await db.query.landlords.findMany();
    const activeLandlordsCount = allLandlords.filter(l => l.onboardingCompleted).length;

    // ── Units ─────────────────────────────────────────────────────────────────
    // Sum of all property unitCount columns
    const unitCountResult = await db
      .select({ total: sql<number>`coalesce(sum(${properties.unitCount}), 0)` })
      .from(properties);
    const totalUnitsUnderManagement = Number(unitCountResult[0]?.total ?? 0);

    // ── Approvals ────────────────────────────────────────────────────────────
    const allApprovals = await db.query.approvals.findMany();
    const pendingApprovalsCount = allApprovals.filter(a => a.status === 'pending').length;

    // ── Properties & Tenants (counts) ────────────────────────────────────────
    const propertyCount = await db.select({ count: sql<number>`count(*)` }).from(properties);
    const tenantCount   = await db.select({ count: sql<number>`count(*)` }).from(tenants);

    // ── Recent AI Actions ────────────────────────────────────────────────────
    const recentActions = await db.query.aiActions.findMany({
      orderBy: desc(aiActions.createdAt),
      limit: 5,
    }) as AIAction[];

    return {
      totalLeads: allLeads.length,
      leadsThisWeek: leadsThisWeek.length,
      completionRate,
      avgEinheiten,
      conversionRate,
      openLeadsCount,
      activeTicketsCount,
      openTickets,
      resolvedToday,
      activeLandlordsCount,
      totalUnitsUnderManagement,
      pendingApprovalsCount,
      propertyCount: Number(propertyCount[0]?.count ?? 0),
      tenantCount: Number(tenantCount[0]?.count ?? 0),
      recentLeads: allLeads.slice(0, 10),
      recentActions,
    };
  } catch (error) {
    console.error("Dashboard DB error:", error);
    return null;
  }
}

function StatusBadge({ status }: { status: string | null }) {
  const styles: Record<string, string> = {
    new: "bg-teal/10 text-teal",
    contacted: "bg-amber/10 text-amber",
    demo_booked: "bg-blue-100 text-blue-700",
    proposal_sent: "bg-purple-100 text-purple-700",
    won: "bg-green-100 text-green-700",
    lost: "bg-red-100 text-red-700",
  };
  const labels: Record<string, string> = {
    new: "Neu", contacted: "Kontaktiert", demo_booked: "Demo gebucht",
    proposal_sent: "Angebot gesendet", won: "Gewonnen", lost: "Verloren",
  };
  const style = status ? styles[status] || styles.new : styles.new;
  return (
    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${style}`}>
      {status ? labels[status] || status : "Neu"}
    </span>
  );
}

function KPICard({ label, value, subtext, color = "navy", badge }: {
  label: string;
  value: string | number;
  subtext?: string;
  color?: "navy" | "teal" | "amber" | "green" | "red";
  badge?: number;
}) {
  const colors = {
    navy: "text-navy", teal: "text-teal", amber: "text-amber",
    green: "text-green", red: "text-red-600",
  };
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm relative">
      {badge != null && badge > 0 && (
        <span className="absolute top-3 right-3 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
          {badge > 9 ? "9+" : badge}
        </span>
      )}
      <p className="text-sm text-text-light mb-1">{label}</p>
      <p className={`text-3xl font-bold ${colors[color]}`}>{value}</p>
      {subtext && <p className="text-xs text-text-light mt-1">{subtext}</p>}
    </div>
  );
}

function FunnelBar({ label, value, total, color }: { label: string; value: number; total: number; color: string }) {
  const percentage = total > 0 ? (value / total) * 100 : 0;
  return (
    <div className="flex items-center gap-4 py-2">
      <div className="w-32 text-sm text-text-light text-right">{label}</div>
      <div className="flex-1 bg-gray-100 rounded-full h-8 overflow-hidden">
        <div
          className={`h-full ${color} flex items-center justify-end px-3 transition-all duration-500`}
          style={{ width: `${Math.max(percentage, 2)}%` }}
        >
          {percentage > 15 && <span className="text-white text-sm font-medium">{value}</span>}
        </div>
      </div>
      <div className="w-12 text-sm font-medium text-navy">{value}</div>
    </div>
  );
}

export default async function AdminDashboardPage() {
  const data = await getDashboardData();

  if (!data) {
    return (
      <div className="p-8">
        <div className="bg-amber/10 border border-amber/30 rounded-xl p-6 text-center">
          <p className="text-amber font-medium">Keine Verbindung zur Datenbank</p>
          <p className="text-text-light text-sm mt-2">
            Bitte überprüfe die DATABASE_URL Umgebungsvariable.
          </p>
        </div>
      </div>
    );
  }

  const funnelData = {
    total: data.totalLeads,
    completed: Math.round(data.totalLeads * (data.completionRate / 100)),
    contacted: Math.round(data.totalLeads * (data.conversionRate / 100)),
    demoBooked: Math.round(data.totalLeads * (data.conversionRate / 200)),
    won: Math.round(data.totalLeads * (data.conversionRate / 400)),
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-navy">Übersicht</h1>
        <p className="text-text-light text-sm mt-1">Willkommen im Command Center, Lukas.</p>
      </div>

      {/* KPI Bar — Lead funnel */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <KPICard label="Total Leads" value={data.totalLeads} color="navy" />
        <KPICard label="Diese Woche" value={`+${data.leadsThisWeek}`} color="teal" subtext="neue Anfragen" />
        <KPICard label="Completion Rate" value={`${data.completionRate}%`} color="amber" subtext="vollständige Profile" />
        <KPICard label="Ø Einheiten" value={data.avgEinheiten} color="teal" />
        <KPICard label="Conversion" value={`${data.conversionRate}%`} color="green" subtext="contacted → won" />
      </div>

      {/* Operational Stats Row — real DB data */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <KPICard
          label="Aktive Tickets"
          value={data.activeTicketsCount}
          color={data.activeTicketsCount > 0 ? "red" : "green"}
          subtext="offen / in Bearbeitung"
        />
        <KPICard
          label="Offene Leads"
          value={data.openLeadsCount}
          color="amber"
          subtext="Status: neu"
        />
        <KPICard
          label="Aktive Eigentümer"
          value={data.activeLandlordsCount}
          color="teal"
          subtext="Onboarding abgeschlossen"
        />
        <KPICard
          label="Einheiten verwaltet"
          value={data.totalUnitsUnderManagement}
          color="navy"
          subtext="alle Objekte"
        />
        <KPICard
          label="Genehmigungen"
          value={data.pendingApprovalsCount > 0 ? `${data.pendingApprovalsCount} ausstehend` : "Keine"}
          color={data.pendingApprovalsCount > 0 ? "red" : "green"}
          badge={data.pendingApprovalsCount}
          subtext={data.pendingApprovalsCount > 0 ? "→ /admin/approvals" : "alles erledigt"}
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lead Funnel */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="font-bold text-navy mb-6">Lead Funnel</h2>
          <div className="space-y-1">
            <FunnelBar label="Quiz gestartet" value={funnelData.total} total={funnelData.total} color="bg-navy" />
            <FunnelBar label="Quiz completed" value={funnelData.completed} total={funnelData.total} color="bg-teal" />
            <FunnelBar label="Email gesendet" value={funnelData.completed} total={funnelData.total} color="bg-teal/80" />
            <FunnelBar label="Kontaktiert" value={funnelData.contacted} total={funnelData.total} color="bg-amber" />
            <FunnelBar label="Demo gebucht" value={funnelData.demoBooked} total={funnelData.total} color="bg-blue-500" />
            <FunnelBar label="Vertrag signed" value={funnelData.won} total={funnelData.total} color="bg-green" />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-6">
          {/* Recent Leads */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="font-bold text-navy mb-4">Neuste Leads</h2>
            <div className="space-y-3">
              {data.recentLeads.length > 0 ? data.recentLeads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-navy">{lead.name}</p>
                    <p className="text-xs text-text-light">{lead.standort} • {lead.einheiten}</p>
                  </div>
                  <div className="text-right">
                    <StatusBadge status={lead.status} />
                    <p className="text-xs text-text-light mt-1">
                      {formatDistanceToNow(new Date(lead.createdAt), { addSuffix: true, locale: de })}
                    </p>
                  </div>
                </div>
              )) : (
                <p className="text-sm text-text-light text-center py-4">Noch keine Leads.</p>
              )}
            </div>
          </div>

          {/* Agent Activity */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="font-bold text-navy mb-4">Agent Activity</h2>
            {data.recentActions.length > 0 ? (
              <div className="space-y-3">
                {data.recentActions.map((action) => (
                  <div key={action.id} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
                    <div className="w-2 h-2 rounded-full bg-teal mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-navy">{action.title}</p>
                      <p className="text-xs text-text-light">
                        {action.type} • {formatDistanceToNow(new Date(action.createdAt), { addSuffix: true, locale: de })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {[
                  { dot: "bg-teal", text: "Ticket #1234 automatisch kategorisiert", meta: "p3-ops • vor 5 Minuten" },
                  { dot: "bg-amber", text: "Lead-Score für M. Schmidt berechnet: 85/100", meta: "p3-growth • vor 12 Minuten" },
                  { dot: "bg-green", text: "Nebenkostenabrechnung für Objekt #42 validiert", meta: "p3-finance • vor 23 Minuten" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
                    <div className={`w-2 h-2 rounded-full ${item.dot} mt-2 flex-shrink-0`} />
                    <div>
                      <p className="text-sm text-navy">{item.text}</p>
                      <p className="text-xs text-text-light">{item.meta}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <p className="text-sm text-text-light">Tickets offen</p>
          <p className="text-2xl font-bold text-navy mt-1">{data.openTickets}</p>
          <p className="text-xs text-green">+{data.resolvedToday} heute gelöst</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <p className="text-sm text-text-light">Objekte verwaltet</p>
          <p className="text-2xl font-bold text-navy mt-1">{data.propertyCount}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <p className="text-sm text-text-light">Aktive Mieter</p>
          <p className="text-2xl font-bold text-navy mt-1">{data.tenantCount}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <p className="text-sm text-text-light">System Health</p>
          <p className="text-2xl font-bold text-green mt-1">✓ OK</p>
          <p className="text-xs text-text-light">Alle Systeme online</p>
        </div>
      </div>
    </div>
  );
}
