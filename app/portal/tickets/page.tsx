import Link from "next/link";
import { cookies, headers } from "next/headers";
import { getTokenFromCookie } from "@/lib/auth/jwt";
import { DemoBanner } from "@/components/DemoBanner";
import { getDemoTickets } from "@/lib/demo-data";

const URGENCY_COLOR: Record<number, string> = { 
  5: "bg-red-500", 
  4: "bg-red-400", 
  3: "bg-amber-400", 
  2: "bg-green-500", 
  1: "bg-gray-300" 
};

const UrgencyDot = ({ urgency }: { urgency: number }) => (
  <span className={`inline-block w-2.5 h-2.5 rounded-full flex-shrink-0 ${URGENCY_COLOR[urgency] || "bg-gray-300"}`} />
);

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

async function getTickets(landlordId: string, isDemo: boolean) {
  if (isDemo || landlordId === "demo") {
    return getDemoTickets();
  }
  if (!landlordId) return [];
  try {
    const base = process.env.NEXT_PUBLIC_APP_URL || "https://einfach-verwaltet.de";
    const res = await fetch(`${base}/api/portal/tickets?landlordId=${landlordId}`, { cache: "no-store" });
    if (!res.ok) return [];
    const { data } = await res.json();
    return data || [];
  } catch { 
    return []; 
  }
}

export default async function TicketsPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status: filterStatus } = await searchParams;
  const { landlordId, isDemo } = await getSessionInfo();
  const allTickets = await getTickets(landlordId, isDemo);
  const tickets = filterStatus ? allTickets.filter((t: { status: string }) => t.status === filterStatus) : allTickets;

  const tabs = [
    { label: "Alle", value: undefined },
    { label: "Offen", value: "open" },
    { label: "In Bearbeitung", value: "inprogress" },
    { label: "Gelöst", value: "resolved" },
  ];

  return (
    <div className="min-h-screen bg-light-gray flex flex-col">
      {isDemo && <DemoBanner />}

      <div className="flex flex-1">
        <aside className="w-56 bg-navy min-h-screen flex flex-col fixed left-0 top-0 bottom-0">
          <div className="px-5 py-5 border-b border-white/10">
            <a href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 bg-teal rounded-md flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <span className="text-white text-sm font-bold">einfach <span className="text-teal">verwaltet.</span></span>
            </a>
          </div>
          <nav className="flex-1 px-3 py-4 space-y-1">
            {[
              { label: "Übersicht", href: "/portal/dashboard", active: false },
              { label: "Chat", href: "/portal/chat", active: false },
              { label: "Einheiten", href: "/portal/einheiten", active: false },
              { label: "Mieter", href: "/portal/mieter", active: false },
              { label: "Tickets", href: "/portal/tickets", active: true },
              { label: "Partner", href: "/portal/partner", active: false },
              { label: "Dokumente", href: "/portal/dokumente", active: false },
              { label: "Vertrag", href: "/portal/vertrag", active: false },
              { label: "Finanzen", href: "/portal/finanzen", active: false },
              { label: "Mieterhöhung", href: "/portal/mieterhohung", active: false },
              { label: "NKA", href: "/portal/nka", active: false },
              { label: "Analysen", href: "/portal/analytics", active: false },
              { label: "DATEV Export", href: "/portal/datev", active: false },
            ].map((item) => (
              <Link key={item.href} href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors
                  ${item.active ? "bg-teal/20 text-teal font-medium" : "text-white/60 hover:bg-white/5 hover:text-white"}`}>
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

        <div className="flex-1 ml-56">
          <div className="max-w-4xl mx-auto px-8 py-8">
            <h1 className="text-2xl font-bold text-navy mb-6">Tickets</h1>

            {/* Filter tabs */}
            <div className="flex gap-2 mb-6">
              {tabs.map((tab) => (
                <Link key={tab.label} href={tab.value ? `/portal/tickets?status=${tab.value}` : "/portal/tickets"}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                    ${filterStatus === tab.value || (!filterStatus && !tab.value)
                      ? "bg-navy text-white" : "bg-white text-text-light hover:bg-gray-50 border border-gray-200"}`}>
                  {tab.label}
                </Link>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              {tickets.length === 0 ? (
                <div className="py-16 text-center">
                  <div className="text-4xl mb-3">✅</div>
                  <p className="text-navy font-semibold">Keine offenen Tickets</p>
                  <p className="text-text-light text-sm mt-1">Alles unter Kontrolle.</p>
                </div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="text-xs text-text-light uppercase tracking-wide bg-gray-50">
                      <th className="px-6 py-3 text-left">Ticket</th>
                      <th className="px-6 py-3 text-left">Mieter</th>
                      <th className="px-6 py-3 text-left">Einheit</th>
                      <th className="px-6 py-3 text-left">Datum</th>
                      <th className="px-6 py-3 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.map((t: { id: string; urgency: number; title: string; tenantName: string; unitDesignation: string; status: string; createdAt: string }) => (
                      <tr key={t.id} className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <Link href={`/portal/tickets/${t.id}`} className="flex items-center gap-2 text-sm">
                            <span><UrgencyDot urgency={t.urgency} /></span>
                            <span className="text-navy font-medium hover:text-teal">{t.title}</span>
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-sm text-text-light">{t.tenantName || "—"}</td>
                        <td className="px-6 py-4 text-sm text-text-light">{t.unitDesignation || "—"}</td>
                        <td className="px-6 py-4 text-sm text-text-light">
                          {new Date(t.createdAt).toLocaleDateString("de-DE")}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium
                            ${t.status === "open" ? "bg-red-50 text-red-600" :
                              t.status === "inprogress" ? "bg-amber-50 text-amber-600" :
                              "bg-green-50 text-green-600"}`}>
                            {t.status === "open" ? "Offen" : t.status === "inprogress" ? "In Bearbeitung" : "Gelöst"}
                          </span>
                        </td>
                      </tr>
                    ))}
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
