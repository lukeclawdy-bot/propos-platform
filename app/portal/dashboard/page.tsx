import Link from "next/link";

const aiActions = [
  {
    urgency: "red",
    icon: "🔴",
    text: "Mieter Wohnung 2 hat seit 3 Tagen nicht auf die Nebenkostenabrechnung reagiert.",
    action: "Erinnerung senden",
    dismiss: "Ignorieren",
  },
  {
    urgency: "yellow",
    icon: "🟡",
    text: "Mieterhöhung für Wohnung 1 ist seit 18 Monaten nicht angepasst — §558 BGB erlaubt +4,2%.",
    action: "Berechnen",
    dismiss: "Später",
  },
  {
    urgency: "green",
    icon: "🟢",
    text: "Heizungswartung Wohnung 3 — Angebot von Müller Heizung: €340. Beauftragen?",
    action: "Beauftragen",
    dismiss: "Ablehnen",
  },
];

const tickets = [
  { id: "T-001", title: "Heizung ausgefallen", tenant: "M. Richter", unit: "Whg. 3", status: "offen", urgency: "🔴" },
  { id: "T-002", title: "Briefkasten defekt", tenant: "S. Müller", unit: "Whg. 1", status: "in Bearbeitung", urgency: "🟡" },
  { id: "T-003", title: "Nebenkostenabrechnung Frage", tenant: "A. Schmidt", unit: "Whg. 2", status: "gelöst", urgency: "🟢" },
];

export default function Dashboard() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Guten Morgen" : hour < 18 ? "Guten Tag" : "Guten Abend";

  return (
    <div className="min-h-screen bg-light-gray flex">
      {/* Sidebar */}
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
            { label: "Übersicht", href: "/portal/dashboard", active: true },
            { label: "Einheiten", href: "/portal/einheiten", active: false },
            { label: "Mieter", href: "/portal/mieter", active: false },
            { label: "Tickets", href: "/portal/tickets", active: false },
            { label: "Dokumente", href: "/portal/dokumente", active: false },
            { label: "Finanzen", href: "/portal/finanzen", active: false },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors
                ${item.active ? "bg-teal/20 text-teal font-medium" : "text-white/60 hover:bg-white/5 hover:text-white"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="px-4 py-4 border-t border-white/10">
          <p className="text-white/50 text-xs">einfach verwaltet. v1</p>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 ml-56">
        <div className="max-w-4xl mx-auto px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-navy">{greeting}, Lukas.</h1>
            <p className="text-text-light text-sm">Hier ist Ihr Überblick für heute.</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: "Einheiten", value: "3", sub: "Hamburg" },
              { label: "Offene Tickets", value: "1", sub: "1 dringend" },
              { label: "Miete diesen Monat", value: "€3.200", sub: "vollständig ✅" },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5">
                <p className="text-text-light text-xs font-medium uppercase tracking-wide mb-1">{s.label}</p>
                <p className="text-3xl font-bold text-navy">{s.value}</p>
                <p className="text-xs text-text-light mt-1">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* AI Action Feed */}
          <div className="bg-white rounded-2xl border-l-4 border-teal border border-gray-100 p-6 mb-8">
            <h2 className="font-bold text-navy mb-4 flex items-center gap-2">
              <span>Ihre nächsten Schritte</span>
              <span className="text-xs bg-teal/10 text-teal px-2 py-0.5 rounded-full font-normal">KI-generiert</span>
            </h2>
            <div className="space-y-4">
              {aiActions.map((a, i) => (
                <div key={i} className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0">
                  <span className="text-lg flex-shrink-0 mt-0.5">{a.icon}</span>
                  <p className="text-sm text-text-main flex-1">{a.text}</p>
                  <div className="flex gap-2 flex-shrink-0">
                    <button className="text-xs bg-navy text-white px-3 py-1.5 rounded-lg hover:bg-teal transition-colors">
                      {a.action}
                    </button>
                    <button className="text-xs text-text-light hover:text-navy px-2 py-1.5 transition-colors">
                      {a.dismiss}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tickets */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
              <h2 className="font-bold text-navy">Aktive Tickets</h2>
              <Link href="/portal/tickets" className="text-sm text-teal hover:underline">Alle anzeigen</Link>
            </div>
            <table className="w-full">
              <thead>
                <tr className="text-xs text-text-light uppercase tracking-wide bg-gray-50">
                  <th className="px-6 py-3 text-left">Ticket</th>
                  <th className="px-6 py-3 text-left">Mieter</th>
                  <th className="px-6 py-3 text-left">Einheit</th>
                  <th className="px-6 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((t) => (
                  <tr key={t.id} className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm">
                      <span className="mr-2">{t.urgency}</span>
                      <span className="text-navy font-medium">{t.title}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-light">{t.tenant}</td>
                    <td className="px-6 py-4 text-sm text-text-light">{t.unit}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium
                        ${t.status === "offen" ? "bg-red-50 text-red-600" :
                          t.status === "in Bearbeitung" ? "bg-amber-50 text-amber-600" :
                          "bg-green-50 text-green-600"}`}>
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
