import Link from "next/link";
import { cookies, headers } from "next/headers";
import { getTokenFromCookie } from "@/lib/auth/jwt";
import { getDemoDashboardData, getDemoTickets } from "@/lib/demo-data";
import { DemoBanner } from "@/components/DemoBanner";
import { StatsCard } from "./components/StatsCard";
import { ActionButtons } from "./components/ActionButtons";

const URGENCY_COLOR: Record<number, string> = { 5: "bg-red-500", 4: "bg-red-400", 3: "bg-amber-400", 2: "bg-green-500", 1: "bg-gray-300" };
const UrgencyDot = ({ urgency }: { urgency: number }) => (
  <span className={`inline-block w-2.5 h-2.5 rounded-full mt-1 flex-shrink-0 ${URGENCY_COLOR[urgency] || "bg-gray-300"}`} />
);

async function getSessionInfo(): Promise<{ landlordId: string; isDemo: boolean }> {
  // Prefer headers injected by middleware (fastest — no JWT verify)
  const hdrs = await headers();
  const fromHeader = hdrs.get("x-landlord-id");
  const isDemoHeader = hdrs.get("x-is-demo") === "true";
  if (fromHeader) return { landlordId: fromHeader, isDemo: isDemoHeader };

  // Fallback: parse cookie directly (e.g., during static rendering or direct access)
  const cookieStore = await cookies();
  // Check demo cookie first
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

  // Final fallback for local dev without auth
  return { landlordId: process.env.DEMO_LANDLORD_ID || "", isDemo: false };
}

async function getDashboardData(landlordId: string) {
  if (!landlordId) return null;
  try {
    const base =
      process.env.NEXT_PUBLIC_APP_URL || "https://einfach-verwaltet.de";
    const res = await fetch(
      `${base}/api/portal/dashboard?landlordId=${landlordId}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    const { data } = await res.json();
    return data;
  } catch {
    return null;
  }
}

async function getTickets(landlordId: string) {
  if (!landlordId) return [];
  try {
    const base =
      process.env.NEXT_PUBLIC_APP_URL || "https://einfach-verwaltet.de";
    const res = await fetch(
      `${base}/api/portal/tickets?landlordId=${landlordId}&status=open`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    const { data } = await res.json();
    return data || [];
  } catch {
    return [];
  }
}

// Mock data shown when no real data is available
const MOCK = {
  propertiesCount: 2,
  totalUnits: 8,
  occupancyRate: 87,
  openTicketsCount: 2,
  pendingActionsCount: 3,
  rentThisMonthCents: 560000,
  topAiActions: [
    {
      id: "mock-1",
      urgency: 4,
      title:
        "Mieter Wohnung 3 hat seit 5 Tagen nicht auf Nebenkostenabrechnung reagiert.",
      actionLabel: "Erinnerung senden",
      dismissLabel: "Ignorieren",
    },
    {
      id: "mock-2",
      urgency: 3,
      title:
        "Mieterhöhung Wohnung 1 möglich — §558 BGB, letzte Erhöhung vor 19 Monaten (+4,2% möglich).",
      actionLabel: "Berechnen",
      dismissLabel: "Später",
    },
    {
      id: "mock-3",
      urgency: 2,
      title:
        "Heizungswartung Wohnung 2 — Angebot Müller Heizung: €340. Beauftragen?",
      actionLabel: "Beauftragen",
      dismissLabel: "Ablehnen",
    },
  ],
};

const MOCK_TICKETS = [
  {
    id: "t-1",
    urgency: 4,
    title: "Heizung ausgefallen",
    tenantName: "M. Richter",
    unitDesignation: "Whg. 3",
    status: "open",
    createdAt: new Date().toISOString(),
  },
  {
    id: "t-2",
    urgency: 2,
    title: "Briefkasten defekt",
    tenantName: "S. Müller",
    unitDesignation: "Whg. 1",
    status: "open",
    createdAt: new Date().toISOString(),
  },
];

export default async function DashboardPage() {
  const { landlordId, isDemo } = await getSessionInfo();

  // Use demo data when in demo mode — no DB calls
  const data = isDemo
    ? getDemoDashboardData()
    : landlordId
    ? await getDashboardData(landlordId)
    : MOCK;

  const ticketList = isDemo
    ? getDemoTickets()
    : landlordId
    ? await getTickets(landlordId)
    : MOCK_TICKETS;

  const d = data || MOCK;
  const tl = ticketList.length > 0 ? ticketList : MOCK_TICKETS;
  const rentEuro = (d.rentThisMonthCents / 100).toLocaleString("de-DE", {
    style: "currency",
    currency: "EUR",
  });

  return (
    <div className="min-h-screen bg-light-gray flex flex-col">
      {/* Demo Banner — shown only in demo mode */}
      {isDemo && <DemoBanner />}

      <div className="flex flex-1">
      {/* Sidebar */}
      <aside className="w-56 bg-navy min-h-screen flex flex-col fixed left-0 top-0 bottom-0">
        <div className="px-5 py-5 border-b border-white/10">
          <a href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-teal rounded-md flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </div>
            <span className="text-white text-sm font-bold">
              einfach <span className="text-teal">verwaltet.</span>
            </span>
          </a>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {[
            { label: "Übersicht", href: "/portal/dashboard", active: true },
            { label: "Chat", href: "/portal/chat", active: false },
            { label: "Einheiten", href: "/portal/einheiten", active: false },
            { label: "Mieter", href: "/portal/mieter", active: false },
            { label: "Tickets", href: "/portal/tickets", active: false },
            { label: "Partner", href: "/portal/partner", active: false },
            { label: "Dokumente", href: "/portal/dokumente", active: false },
            { label: "Finanzen", href: "/portal/finanzen", active: false },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors
                ${
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
          <a
            href="/api/portal/auth/logout"
            className="block text-white/40 hover:text-white/70 text-xs transition-colors"
          >
            Abmelden
          </a>
          <p className="text-white/30 text-xs">einfach verwaltet. v1</p>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 ml-56">
        <div className="max-w-4xl mx-auto px-8 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-navy">Guten Morgen.</h1>
            <p className="text-text-light text-sm mt-0.5">
              Hier ist Ihr Überblick für heute.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatsCard
              label="Einheiten"
              value={d.totalUnits}
              sub={`${d.propertiesCount} Objekte`}
            />
            <StatsCard
              label="Belegung"
              value={`${d.occupancyRate}%`}
              sub="aktuell vermietet"
              highlight
            />
            <StatsCard
              label="Offene Tickets"
              value={d.openTicketsCount}
              sub="offen"
            />
            <StatsCard
              label="Miete (diesen Monat)"
              value={rentEuro}
              sub="eingegangen"
            />
          </div>

          {/* AI Action Feed */}
          {d.topAiActions?.length > 0 && (
            <div className="bg-white rounded-2xl border-l-4 border-teal border border-gray-100 p-6 mb-8">
              <h2 className="font-bold text-navy mb-4 flex items-center gap-2">
                Ihre nächsten Schritte
                <span className="text-xs bg-teal/10 text-teal px-2 py-0.5 rounded-full font-normal">
                  {d.pendingActionsCount} ausstehend
                </span>
              </h2>
              <div className="space-y-4">
                {d.topAiActions.map(
                  (a: {
                    id: string;
                    urgency: number;
                    title: string;
                    actionLabel: string;
                    dismissLabel: string;
                  }) => (
                    <div
                      key={a.id}
                      className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0"
                    >
                      <span className="text-lg flex-shrink-0 mt-0.5">
                        <UrgencyDot urgency={a.urgency} />
                      </span>
                      <p className="text-sm text-text-main flex-1">{a.title}</p>
                      <ActionButtons
                        actionId={a.id}
                        actionLabel={a.actionLabel || "Handeln"}
                        dismissLabel={a.dismissLabel || "Ignorieren"}
                      />
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* Tickets */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
              <h2 className="font-bold text-navy">Offene Tickets</h2>
              <Link
                href="/portal/tickets"
                className="text-sm text-teal hover:underline"
              >
                Alle anzeigen →
              </Link>
            </div>
            {tl.length === 0 ? (
              <div className="px-6 py-12 text-center text-text-light text-sm">
                Keine offenen Tickets — alles unter Kontrolle ✅
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="text-xs text-text-light uppercase tracking-wide bg-gray-50">
                    <th className="px-6 py-3 text-left">Ticket</th>
                    <th className="px-6 py-3 text-left">Mieter</th>
                    <th className="px-6 py-3 text-left hidden md:table-cell">
                      Einheit
                    </th>
                    <th className="px-6 py-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tl
                    .slice(0, 5)
                    .map(
                      (t: {
                        id: string;
                        urgency: number;
                        title: string;
                        tenantName: string;
                        unitDesignation: string;
                        status: string;
                      }) => (
                        <tr
                          key={t.id}
                          className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors cursor-pointer"
                        >
                          <td className="px-6 py-4 text-sm">
                            <Link
                              href={`/portal/tickets/${t.id}`}
                              className="flex items-center gap-2"
                            >
                              <span><UrgencyDot urgency={t.urgency} /></span>
                              <span className="text-navy font-medium">
                                {t.title}
                              </span>
                            </Link>
                          </td>
                          <td className="px-6 py-4 text-sm text-text-light">
                            {t.tenantName || "—"}
                          </td>
                          <td className="px-6 py-4 text-sm text-text-light hidden md:table-cell">
                            {t.unitDesignation || "—"}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-2.5 py-1 rounded-full text-xs font-medium
                              ${
                                t.status === "open"
                                  ? "bg-red-50 text-red-600"
                                  : t.status === "inprogress"
                                  ? "bg-amber-50 text-amber-600"
                                  : "bg-green-50 text-green-600"
                              }`}
                            >
                              {t.status === "open"
                                ? "Offen"
                                : t.status === "inprogress"
                                ? "In Bearbeitung"
                                : "Gelöst"}
                            </span>
                          </td>
                        </tr>
                      )
                    )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
