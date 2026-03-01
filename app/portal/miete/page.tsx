import Link from "next/link";
import { cookies, headers } from "next/headers";
import { getTokenFromCookie } from "@/lib/auth/jwt";
import { getDemoRentCollectionData } from "@/lib/demo-data";
import { DemoBanner } from "@/components/DemoBanner";
import { MieteFilters } from "./MieteFilters";

// Types
interface RentCollectionItem {
  tenantId: string;
  tenantName: string;
  propertyAddress: string;
  unitDesignation: string;
  coldRentCents: number;
  dueDate: string;
  paymentStatus: "paid" | "overdue" | "pending";
  daysOverdue: number;
  mahnungLevel?: number;
  mahnungCount: number;
}

interface StatsData {
  totalRentRollCents: number;
  collectedThisMonthCents: number;
  outstandingCents: number;
  collectionRate: number;
  overdueCount: number;
}

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

async function getRentCollectionData(landlordId: string): Promise<{ items: RentCollectionItem[]; stats: StatsData } | null> {
  if (!landlordId) return null;
  try {
    const base = process.env.NEXT_PUBLIC_APP_URL || "https://einfach-verwaltet.de";
    const res = await fetch(`${base}/api/portal/miete?landlordId=${landlordId}`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// Format currency helper
function formatEuro(cents: number): string {
  return (cents / 100).toLocaleString("de-DE", { style: "currency", currency: "EUR" });
}

// Status badge component
function StatusBadge({ status, daysOverdue }: { status: string; daysOverdue: number }) {
  const configs: Record<string, { bg: string; text: string; label: string }> = {
    paid: { bg: "bg-green-50", text: "text-green-600", label: "Bezahlt" },
    pending: { bg: "bg-amber-50", text: "text-amber-600", label: "Ausstehend" },
    overdue: { bg: "bg-red-50", text: "text-red-600", label: `${daysOverdue} Tage überfällig` },
  };
  const config = configs[status] || configs.pending;
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
}

// Mahnung level badge
function MahnungLevel({ level, count }: { level?: number; count: number }) {
  if (!level || level === 0) {
    if (count === 0) return <span className="text-gray-400 text-xs">—</span>;
    return <span className="text-gray-500 text-xs">{count} gesendet</span>;
  }
  const labels: Record<number, string> = {
    1: "Zahlungserinnerung",
    2: "1. Mahnung",
    3: "2. Mahnung",
    4: "Inkasso",
  };
  const colors: Record<number, string> = {
    1: "bg-gray-100 text-gray-600",
    2: "bg-amber-100 text-amber-700",
    3: "bg-orange-100 text-orange-700",
    4: "bg-red-100 text-red-700",
  };
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${colors[level]}`}>
      {labels[level]}
    </span>
  );
}

export default async function MietePage({ searchParams }: { searchParams: Promise<{ filter?: string; property?: string }> }) {
  const { landlordId, isDemo } = await getSessionInfo();
  const params = await searchParams;

  // Use demo data or fetch from API
  const data = isDemo
    ? getDemoRentCollectionData()
    : landlordId
    ? await getRentCollectionData(landlordId)
    : null;

  const items = data?.items || [];
  const stats = data?.stats;

  // Get filter parameters
  const statusFilter = params.filter || "all";
  const propertyFilter = params.property || "all";

  // Get unique properties for filter
  const properties = Array.from(new Set(items.map((i) => i.propertyAddress)));

  // Apply filters
  const filteredItems = items.filter((item) => {
    if (statusFilter !== "all" && item.paymentStatus !== statusFilter) return false;
    if (propertyFilter !== "all" && item.propertyAddress !== propertyFilter) return false;
    return true;
  });

  // Sort: overdue first, then pending, then paid
  const sortedItems = filteredItems.sort((a, b) => {
    const order = { overdue: 0, pending: 1, paid: 2 };
    return order[a.paymentStatus] - order[b.paymentStatus];
  });

  // Check if any overdue items exist for Mahnung page
  const hasOverdue = items.some((i) => i.paymentStatus === "overdue");

  return (
    <div className="min-h-screen bg-light-gray flex flex-col">
      {isDemo && <DemoBanner />}

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-56 bg-navy min-h-screen flex flex-col fixed left-0 top-0 bottom-0">
          <div className="px-5 py-5 border-b border-white/10">
            <a href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 bg-teal rounded-md flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <span className="text-white text-sm font-bold">
                einfach <span className="text-teal">verwaltet.</span>
              </span>
            </a>
          </div>
          <nav className="flex-1 px-3 py-4 space-y-1">
            {[
              { label: "Übersicht", href: "/portal/dashboard" },
              { label: "Chat", href: "/portal/chat" },
              { label: "Einheiten", href: "/portal/einheiten" },
              { label: "Mieter", href: "/portal/mieter" },
              { label: "Tickets", href: "/portal/tickets" },
              { label: "Partner", href: "/portal/partner" },
              { label: "Dokumente", href: "/portal/dokumente" },
              { label: "Vertrag", href: "/portal/vertrag" },
              { label: "Finanzen", href: "/portal/finanzen" },
              { label: "Mieterhöhung", href: "/portal/mieterhohung" },
            { label: "NKA", href: "/portal/nka", active: false },
              { label: "Miete", href: "/portal/miete", active: true },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  item.active
                    ? "bg-teal/20 text-teal font-medium"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="px-4 py-4 border-t border-white/10 space-y-2">
            <a href="/api/portal/auth/logout" className="block text-white/40 hover:text-white/70 text-xs transition-colors">
              Abmelden
            </a>
            <p className="text-white/30 text-xs">einfach verwaltet. v1</p>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 ml-56">
          <div className="max-w-6xl mx-auto px-8 py-8">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-navy">Mietzahlungen</h1>
                <p className="text-text-light text-sm mt-0.5">
                  Übersicht aller Mietzahlungen und Mahnungen
                </p>
              </div>
              {hasOverdue && (
                <Link
                  href="/portal/miete/mahnung"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Mahnungen verwalten
                </Link>
              )}
            </div>

            {/* Stats */}
            {stats && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white rounded-xl border border-gray-100 p-5">
                  <p className="text-xs text-text-light uppercase tracking-wide">Gesamtmiete/Monat</p>
                  <p className="text-2xl font-bold text-navy mt-1">{formatEuro(stats.totalRentRollCents)}</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 p-5">
                  <p className="text-xs text-text-light uppercase tracking-wide">Eingegangen</p>
                  <p className="text-2xl font-bold text-green-600 mt-1">{stats.collectionRate}%</p>
                  <p className="text-xs text-text-light mt-1">{formatEuro(stats.collectedThisMonthCents)}</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 p-5">
                  <p className="text-xs text-text-light uppercase tracking-wide">Ausstehend</p>
                  <p className={`text-2xl font-bold mt-1 ${stats.outstandingCents > 0 ? "text-red-600" : "text-navy"}`}>
                    {formatEuro(stats.outstandingCents)}
                  </p>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 p-5">
                  <p className="text-xs text-text-light uppercase tracking-wide">Überfällig</p>
                  <p className={`text-2xl font-bold mt-1 ${stats.overdueCount > 0 ? "text-red-600" : "text-navy"}`}>
                    {stats.overdueCount}
                  </p>
                  <p className="text-xs text-text-light mt-1">Mieter</p>
                </div>
              </div>
            )}

            {/* Filters */}
            <MieteFilters
              properties={properties}
              statusFilter={statusFilter}
              propertyFilter={propertyFilter}
            />

            {/* Rent Collection Table */}
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
                <h2 className="font-bold text-navy">Mietzahlungen</h2>
                <span className="text-sm text-text-light">{sortedItems.length} Mieter</span>
              </div>

              {sortedItems.length === 0 ? (
                <div className="px-6 py-12 text-center text-text-light">
                  Keine Mietzahlungen gefunden.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-xs text-text-light uppercase tracking-wide bg-gray-50">
                        <th className="px-6 py-3 text-left">Mieter</th>
                        <th className="px-6 py-3 text-left">Objekt/Einheit</th>
                        <th className="px-6 py-3 text-left">Miete</th>
                        <th className="px-6 py-3 text-left">Fällig</th>
                        <th className="px-6 py-3 text-left">Status</th>
                        <th className="px-6 py-3 text-left">Mahnung</th>
                        <th className="px-6 py-3 text-right">Aktion</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedItems.map((item) => (
                        <tr
                          key={item.tenantId}
                          className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="font-medium text-navy">{item.tenantName}</div>
                          </td>
                          <td className="px-6 py-4 text-sm text-text-light">
                            <div className="text-navy">{item.propertyAddress}</div>
                            <div className="text-xs">{item.unitDesignation}</div>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-navy">
                            {formatEuro(item.coldRentCents)}
                          </td>
                          <td className="px-6 py-4 text-sm text-text-light">
                            {new Date(item.dueDate).toLocaleDateString("de-DE")}
                          </td>
                          <td className="px-6 py-4">
                            <StatusBadge status={item.paymentStatus} daysOverdue={item.daysOverdue} />
                          </td>
                          <td className="px-6 py-4">
                            <MahnungLevel level={item.mahnungLevel} count={item.mahnungCount} />
                          </td>
                          <td className="px-6 py-4 text-right">
                            {item.paymentStatus !== "paid" && (
                              <form
                                action={`/api/portal/miete/${item.tenantId}`}
                                method="POST"
                                className="inline"
                              >
                                <input type="hidden" name="action" value="mark_paid" />
                                <input
                                  type="hidden"
                                  name="redirect"
                                  value="/portal/miete"
                                />
                                <button
                                  type="submit"
                                  className="text-sm text-teal hover:text-teal-dark font-medium transition-colors"
                                  title="Als bezahlt markieren"
                                >
                                  Als bezahlt ✓
                                </button>
                              </form>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Info box */}
            <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-sm text-blue-800">
                  <p className="font-medium">Automatische Mahnstufen (§286 BGB)</p>
                  <p className="mt-1 text-blue-700">
                    <strong>Zahlungserinnerung:</strong> 0–7 Tage überfällig ·{" "}
                    <strong>1. Mahnung:</strong> 8–30 Tage · <strong>2. Mahnung:</strong> 31–60 Tage ·{" "}
                    <strong>Inkasso:</strong> ab 60 Tagen
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
