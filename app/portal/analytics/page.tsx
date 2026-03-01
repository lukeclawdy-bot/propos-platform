import Link from "next/link";
import { cookies, headers } from "next/headers";
import { getTokenFromCookie } from "@/lib/auth/jwt";
import { getDemoAnalyticsData } from "@/lib/demo-data";

// ── Session helper (same pattern as dashboard) ──────────────────────────────
async function getSessionInfo(): Promise<{ landlordId: string; isDemo: boolean }> {
  const hdrs = await headers();
  const fromHeader = hdrs.get("x-landlord-id");
  const isDemoHeader = hdrs.get("x-is-demo") === "true";
  if (fromHeader) return { landlordId: fromHeader, isDemo: isDemoHeader };

  const cookieStore = await cookies();
  const demoToken = cookieStore.get("ev-demo-session")?.value;
  if (demoToken) {
    const payload = await getTokenFromCookie(demoToken);
    if (payload?.landlordId) return { landlordId: payload.landlordId, isDemo: true };
  }
  const token = cookieStore.get("portal_session")?.value;
  if (token) {
    const payload = await getTokenFromCookie(token);
    if (payload?.landlordId) return { landlordId: payload.landlordId, isDemo: !!payload.isDemo };
  }
  return { landlordId: process.env.DEMO_LANDLORD_ID || "", isDemo: false };
}

// ── Production data fetchers ─────────────────────────────────────────────────
async function getAnalyticsData(landlordId: string) {
  if (!landlordId) return null;
  try {
    const base = process.env.NEXT_PUBLIC_APP_URL || "https://einfach-verwaltet.de";
    const [dashRes, ticketRes, finRes] = await Promise.all([
      fetch(`${base}/api/portal/dashboard?landlordId=${landlordId}`, { cache: "no-store" }),
      fetch(`${base}/api/portal/tickets?landlordId=${landlordId}`, { cache: "no-store" }),
      fetch(`${base}/api/portal/finanzen?landlordId=${landlordId}`, { cache: "no-store" }),
    ]);

    const dashData = dashRes.ok ? (await dashRes.json()).data : null;
    const ticketData = ticketRes.ok ? (await ticketRes.json()).data : [];
    const finData = finRes.ok ? (await finRes.json()).data : null;

    // Compute ticket stats
    const allTickets: Array<{ status: string; createdAt: string; updatedAt: string }> = ticketData || [];
    const resolvedTickets = allTickets.filter((t) => t.status === "resolved" || t.status === "closed");
    const openTickets = allTickets.filter((t) => t.status === "open");
    const resolutionRate = allTickets.length > 0
      ? Math.round((resolvedTickets.length / allTickets.length) * 100)
      : 0;
    // Avg resolution hours from createdAt → updatedAt
    const avgResolutionHours = resolvedTickets.length > 0
      ? Math.round(
          resolvedTickets.reduce((sum, t) => {
            const ms = new Date(t.updatedAt).getTime() - new Date(t.createdAt).getTime();
            return sum + ms / 3600000;
          }, 0) / resolvedTickets.length
        )
      : 0;

    // Compute rent collection from financial transactions
    const transactions: Array<{ type: string; status: string; amountCents: number; createdAt: string }> =
      finData?.transactions || [];
    const rentTx = transactions.filter((t) => t.type === "rent_received");
    const paidTx = rentTx.filter((t) => t.status === "completed");
    const collectionRate = rentTx.length > 0 ? Math.round((paidTx.length / rentTx.length) * 100) : 0;

    // Revenue trend (last 6 months from monthlySummary)
    const monthlySummary: Array<{ month: string; income: number; expenses: number }> =
      finData?.monthlySummary || [];
    const revenueTrend = monthlySummary.slice(-6).map((m) => ({
      month: m.month.split(" ")[0], // strip year
      amountCents: m.income,
    }));

    return {
      portfolio: {
        propertiesCount: dashData?.propertiesCount ?? 0,
        totalUnits: dashData?.totalUnits ?? 0,
        occupiedUnits: dashData?.occupiedUnits ?? 0,
        monthlyRevenueCents: dashData?.rentThisMonthCents ?? 0,
      },
      tickets: {
        total: allTickets.length,
        resolved: resolvedTickets.length,
        open: openTickets.length,
        inProgress: allTickets.filter((t) => t.status === "inprogress").length,
        resolutionRate,
        avgResolutionHours,
      },
      rentCollection: {
        totalTenants: rentTx.length,
        paidOnTime: paidTx.length,
        overdue: rentTx.length - paidTx.length,
        collectionRate,
        outstandingCents: transactions
          .filter((t) => t.type === "rent_received" && t.status !== "completed")
          .reduce((s, t) => s + t.amountCents, 0),
      },
      revenueTrend,
      aiAutomation: {
        totalTickets: allTickets.length,
        aiHandled: 0, // ai_actions join requires separate endpoint — show 0 without it
        automationRate: 0,
      },
    };
  } catch {
    return null;
  }
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function fmtEuro(cents: number) {
  return (cents / 100).toLocaleString("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
}

type RevenueTrendItem = { month: string; amountCents: number };

function BarChart({ data }: { data: RevenueTrendItem[] }) {
  if (!data.length) return null;
  const max = Math.max(...data.map((d) => d.amountCents), 1);
  return (
    <div className="flex items-end gap-2 h-32 mt-4">
      {data.map((d) => {
        const pct = Math.round((d.amountCents / max) * 100);
        return (
          <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
            <div
              className="w-full bg-teal/80 rounded-t-md transition-all"
              style={{ height: `${pct}%`, minHeight: "4px" }}
              title={fmtEuro(d.amountCents)}
            />
            <span className="text-xs text-text-light">{d.month}</span>
          </div>
        );
      })}
    </div>
  );
}

function GaugeBar({ value, color = "bg-teal" }: { value: number; color?: string }) {
  return (
    <div className="w-full bg-gray-100 rounded-full h-3 mt-3 overflow-hidden">
      <div
        className={`h-full ${color} rounded-full transition-all`}
        style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
      />
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default async function AnalyticsPage() {
  const { landlordId, isDemo } = await getSessionInfo();

  const raw = isDemo
    ? getDemoAnalyticsData()
    : await getAnalyticsData(landlordId);

  const d = raw ?? getDemoAnalyticsData();

  return (
        {/* Sidebar */}

        {/* Main */}
        <div className="flex-1">
          <div className="max-w-4xl mx-auto px-8 py-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-navy">Analysen</h1>
              <p className="text-text-light text-sm mt-0.5">
                KPI-Übersicht Ihres Immobilienportfolios.
              </p>
            </div>

            {/* ── KPI Cards ─────────────────────────────────────────── */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {/* Objekte */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <p className="text-text-light text-xs font-medium uppercase tracking-wide mb-1">Objekte</p>
                <p className="text-3xl font-bold text-navy">{d.portfolio.propertiesCount}</p>
                <p className="text-xs text-text-light mt-1">{d.portfolio.totalUnits} Einheiten gesamt</p>
              </div>

              {/* Monatlicher Umsatz */}
              <div className="bg-teal/5 border-teal/20 rounded-2xl border p-5">
                <p className="text-text-light text-xs font-medium uppercase tracking-wide mb-1">Monatsumsatz</p>
                <p className="text-3xl font-bold text-teal">{fmtEuro(d.portfolio.monthlyRevenueCents)}</p>
                <p className="text-xs text-text-light mt-1">laufender Monat</p>
              </div>

              {/* Ticket-Lösungsrate */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <p className="text-text-light text-xs font-medium uppercase tracking-wide mb-1">Lösungsrate</p>
                <p className="text-3xl font-bold text-navy">{d.tickets.resolutionRate}%</p>
                <p className="text-xs text-text-light mt-1">
                  {d.tickets.resolved}/{d.tickets.total} Tickets gelöst
                </p>
              </div>

              {/* Mieteingangsquote */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <p className="text-text-light text-xs font-medium uppercase tracking-wide mb-1">Mieteingang</p>
                <p className="text-3xl font-bold text-navy">{d.rentCollection.collectionRate}%</p>
                <p className="text-xs text-text-light mt-1">
                  {d.rentCollection.paidOnTime}/{d.rentCollection.totalTenants} pünktlich
                </p>
              </div>
            </div>

            {/* ── Second Row KPIs ────────────────────────────────────── */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {/* Belegung */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <p className="text-text-light text-xs font-medium uppercase tracking-wide mb-1">Belegung</p>
                <p className="text-3xl font-bold text-navy">
                  {d.portfolio.totalUnits > 0
                    ? Math.round((d.portfolio.occupiedUnits / d.portfolio.totalUnits) * 100)
                    : 0}%
                </p>
                <p className="text-xs text-text-light mt-1">
                  {d.portfolio.occupiedUnits} von {d.portfolio.totalUnits} Einheiten belegt
                </p>
              </div>

              {/* Ø Lösungszeit */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <p className="text-text-light text-xs font-medium uppercase tracking-wide mb-1">Ø Lösungszeit</p>
                <p className="text-3xl font-bold text-navy">
                  {d.tickets.avgResolutionHours < 24
                    ? `${d.tickets.avgResolutionHours}h`
                    : `${Math.round(d.tickets.avgResolutionHours / 24)}d`}
                </p>
                <p className="text-xs text-text-light mt-1">pro gelöstem Ticket</p>
              </div>

              {/* Automatisierungsrate */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <p className="text-text-light text-xs font-medium uppercase tracking-wide mb-1">Automatisierungsrate</p>
                <p className="text-3xl font-bold text-navy">{d.aiAutomation.automationRate}%</p>
                <p className="text-xs text-text-light mt-1">
                  {d.aiAutomation.aiHandled}/{d.aiAutomation.totalTickets} von KI bearbeitet
                </p>
              </div>
            </div>

            {/* ── Charts Section ─────────────────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Revenue Trend */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="font-bold text-navy mb-1">Umsatzentwicklung</h2>
                <p className="text-xs text-text-light">Letzte 6 Monate</p>
                <BarChart data={d.revenueTrend} />
                <div className="mt-3 flex justify-between text-xs text-text-light">
                  <span>Min: {d.revenueTrend.length ? fmtEuro(Math.min(...d.revenueTrend.map((r) => r.amountCents))) : "—"}</span>
                  <span>Max: {d.revenueTrend.length ? fmtEuro(Math.max(...d.revenueTrend.map((r) => r.amountCents))) : "—"}</span>
                </div>
              </div>

              {/* Ticket Status Breakdown */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="font-bold text-navy mb-1">Ticket-Status</h2>
                <p className="text-xs text-text-light mb-4">{d.tickets.total} Tickets gesamt</p>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-text-main">Gelöst</span>
                      <span className="font-medium text-navy">{d.tickets.resolutionRate}%</span>
                    </div>
                    <GaugeBar value={d.tickets.resolutionRate} color="bg-teal" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-text-main">Mieteingang</span>
                      <span className="font-medium text-navy">{d.rentCollection.collectionRate}%</span>
                    </div>
                    <GaugeBar
                      value={d.rentCollection.collectionRate}
                      color={d.rentCollection.collectionRate >= 80 ? "bg-teal" : "bg-amber-400"}
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-text-main">Automatisierungsrate</span>
                      <span className="font-medium text-navy">{d.aiAutomation.automationRate}%</span>
                    </div>
                    <GaugeBar value={d.aiAutomation.automationRate} color="bg-indigo-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* ── Detail Cards ───────────────────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Rent Collection Detail */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="font-bold text-navy mb-4 flex items-center gap-2">
                  Mieteingang
                  <span className={`text-xs px-2 py-0.5 rounded-full font-normal ${
                    d.rentCollection.collectionRate >= 90
                      ? "bg-green-50 text-green-600"
                      : d.rentCollection.collectionRate >= 70
                      ? "bg-amber-50 text-amber-600"
                      : "bg-red-50 text-red-600"
                  }`}>
                    {d.rentCollection.collectionRate}%
                  </span>
                </h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-2 border-b border-gray-50">
                    <span className="text-text-light">Pünktlich gezahlt</span>
                    <span className="font-medium text-navy">{d.rentCollection.paidOnTime} Mieter</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-50">
                    <span className="text-text-light">Ausstehend / Rückstand</span>
                    <span className="font-medium text-red-600">{d.rentCollection.overdue} Mieter</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-text-light">Offener Betrag</span>
                    <span className="font-medium text-red-600">{fmtEuro(d.rentCollection.outstandingCents)}</span>
                  </div>
                </div>
              </div>

              {/* AI Automation Detail */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="font-bold text-navy mb-4 flex items-center gap-2">
                  KI-Automatisierung
                  <span className="text-xs px-2 py-0.5 rounded-full font-normal bg-indigo-50 text-indigo-600">
                    {d.aiAutomation.automationRate}%
                  </span>
                </h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-2 border-b border-gray-50">
                    <span className="text-text-light">Tickets gesamt</span>
                    <span className="font-medium text-navy">{d.aiAutomation.totalTickets}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-50">
                    <span className="text-text-light">Von KI bearbeitet</span>
                    <span className="font-medium text-indigo-600">{d.aiAutomation.aiHandled}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-text-light">Manuell bearbeitet</span>
                    <span className="font-medium text-navy">
                      {d.aiAutomation.totalTickets - d.aiAutomation.aiHandled}
                    </span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-indigo-50 rounded-xl">
                  <p className="text-xs text-indigo-700">
                    Durch KI-Automatisierung sparen Sie geschätzt{" "}
                    <strong>{Math.round(d.aiAutomation.aiHandled * 0.5)} Stunden</strong> pro Monat.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
