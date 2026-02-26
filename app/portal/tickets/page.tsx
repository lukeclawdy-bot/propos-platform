import Link from "next/link";

const DEMO_LANDLORD_ID = process.env.DEMO_LANDLORD_ID || "";
const URGENCY_COLOR: Record<number, string> = { 5: "bg-red-500", 4: "bg-red-400", 3: "bg-amber-400", 2: "bg-green-500", 1: "bg-gray-300" };
const UrgencyDot = ({ urgency }: { urgency: number }) => (
  <span className={`inline-block w-2.5 h-2.5 rounded-full flex-shrink-0 ${URGENCY_COLOR[urgency] || "bg-gray-300"}`} />
);

const MOCK_TICKETS = [
  { id: "t-1", urgency: 4, title: "Heizung ausgefallen", tenantName: "M. Richter", unitDesignation: "Whg. 3", status: "open", createdAt: new Date().toISOString() },
  { id: "t-2", urgency: 2, title: "Briefkasten defekt", tenantName: "S. Müller", unitDesignation: "Whg. 1", status: "inprogress", createdAt: new Date().toISOString() },
  { id: "t-3", urgency: 1, title: "Nebenkostenabrechnung Frage", tenantName: "A. Schmidt", unitDesignation: "Whg. 2", status: "resolved", createdAt: new Date().toISOString() },
];

async function getTickets(landlordId: string) {
  if (!landlordId) return MOCK_TICKETS;
  try {
    const base = process.env.NEXT_PUBLIC_APP_URL || "https://einfach-verwaltet.de";
    const res = await fetch(`${base}/api/portal/tickets?landlordId=${landlordId}`, { cache: "no-store" });
    if (!res.ok) return MOCK_TICKETS;
    const { data } = await res.json();
    return data || MOCK_TICKETS;
  } catch { return MOCK_TICKETS; }
}

export default async function TicketsPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status: filterStatus } = await searchParams;
  const allTickets = await getTickets(DEMO_LANDLORD_ID);
  const tickets = filterStatus ? allTickets.filter((t: { status: string }) => t.status === filterStatus) : allTickets;

  const tabs = [
    { label: "Alle", value: undefined },
    { label: "Offen", value: "open" },
    { label: "In Bearbeitung", value: "inprogress" },
    { label: "Gelöst", value: "resolved" },
  ];

  return (
    <div className="min-h-screen bg-light-gray flex">
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
            { label: "Finanzen", href: "/portal/finanzen", active: false },
          ].map((item) => (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors
                ${item.active ? "bg-teal/20 text-teal font-medium" : "text-white/60 hover:bg-white/5 hover:text-white"}`}>
              {item.label}
            </Link>
          ))}
        </nav>
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
  );
}
