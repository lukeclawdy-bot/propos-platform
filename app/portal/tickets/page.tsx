import Link from "next/link";
import { cookies, headers } from "next/headers";
import { getTokenFromCookie } from "@/lib/auth/jwt";
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

        <div className="flex-1">
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
