export const dynamic = "force-dynamic";
import { AdminSidebar } from "../components/AdminLayout";
import { db, hasDatabase } from "@/lib/db";
import { tickets, tenants, properties, landlords } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

const DEMO_TICKETS = [
  { id: "t1", title: "Heizung ausgefallen", tenantName: "M. Richter", property: "Musterstr. 12", landlord: "T. Bergmann", status: "open", priority: "high", created: "2026-03-01 08:14", lastAction: "Vor 2h — KI hat geantwortet" },
  { id: "t2", title: "Briefkasten defekt", tenantName: "S. Müller", property: "Alsterblick 5", landlord: "T. Bergmann", status: "open", priority: "medium", created: "2026-02-28 17:30", lastAction: "Vor 18h — Ticket erstellt" },
  { id: "t3", title: "Wasserschaden Küche", tenantName: "A. Koch", property: "Eppendorfer Weg 3", landlord: "M. Wagner", status: "in_progress", priority: "critical", created: "2026-03-01 10:00", lastAction: "Vor 30 Min — Freelancer beauftragt" },
  { id: "t4", title: "Fenster klemmt", tenantName: "B. Schulz", property: "Musterstr. 12", landlord: "T. Bergmann", status: "resolved", priority: "low", created: "2026-02-27 09:00", lastAction: "Gestern — Gelöst" },
  { id: "t5", title: "Schimmel im Bad", tenantName: "C. Klein", property: "Wandsbeker Str. 8", landlord: "R. Hoffmann", status: "open", priority: "high", created: "2026-02-28 14:00", lastAction: "Vor 1 Tag — Eskaliert" },
];

const STATUS: Record<string, { label: string; bg: string; text: string }> = {
  open:        { label: "Offen",        bg: "bg-red-50",    text: "text-red-600" },
  in_progress: { label: "In Bearbeitung", bg: "bg-amber-50", text: "text-amber-600" },
  resolved:    { label: "Gelöst",       bg: "bg-green-50",  text: "text-green-600" },
};
const PRIO: Record<string, { label: string; color: string }> = {
  critical: { label: "Kritisch", color: "bg-red-500" },
  high:     { label: "Hoch",     color: "bg-orange-400" },
  medium:   { label: "Mittel",   color: "bg-amber-400" },
  low:      { label: "Niedrig",  color: "bg-gray-300" },
};

export default async function AdminTicketsPage() {
  let rows = DEMO_TICKETS;
  try {
    if (hasDatabase()) {
      const dbTickets = await db.select().from(tickets).orderBy(desc(tickets.createdAt)).limit(50);
      if (dbTickets.length > 0) rows = dbTickets.map((t) => ({
        id: t.id, title: t.title, tenantName: "—", property: "—", landlord: "—",
        status: t.status || "open", priority: t.priority || "medium",
        created: t.createdAt?.toLocaleString("de-DE") || "—",
        lastAction: t.updatedAt?.toLocaleString("de-DE") || "—",
      }));
    }
  } catch {}

  const open = rows.filter(t => t.status === "open").length;
  const inProg = rows.filter(t => t.status === "in_progress").length;
  const resolved = rows.filter(t => t.status === "resolved").length;

  return (
    <div className="flex min-h-screen bg-light-gray">
      <AdminSidebar />
      <main className="ml-64 flex-1 p-8">
        <h1 className="text-2xl font-bold text-navy mb-1">Alle Tickets</h1>
        <p className="text-text-light text-sm mb-6">Vollständige Übersicht aller Mieteranfragen über alle Eigentümer</p>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {[["Offen", open, "text-red-600"],["In Bearbeitung", inProg, "text-amber-600"],["Gelöst", resolved, "text-green-600"]].map(([label, val, cls]) => (
            <div key={String(label)} className="bg-white rounded-xl border border-gray-100 p-4">
              <p className="text-xs text-text-light uppercase tracking-wide">{label}</p>
              <p className={`text-3xl font-bold mt-1 ${cls}`}>{val}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="text-xs text-text-light uppercase bg-gray-50">
              <th className="px-4 py-3 text-left">Prio</th>
              <th className="px-4 py-3 text-left">Ticket</th>
              <th className="px-4 py-3 text-left">Mieter</th>
              <th className="px-4 py-3 text-left">Objekt</th>
              <th className="px-4 py-3 text-left">Eigentümer</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Letzte Aktion</th>
              <th className="px-4 py-3 text-right">Aktionen</th>
            </tr></thead>
            <tbody>
              {rows.map((t) => {
                const s = STATUS[t.status] || STATUS.open;
                const p = PRIO[t.priority] || PRIO.medium;
                return (
                  <tr key={t.id} className="border-t border-gray-50 hover:bg-gray-50/50">
                    <td className="px-4 py-3"><span className={`inline-block w-2.5 h-2.5 rounded-full ${p.color}`} title={p.label} /></td>
                    <td className="px-4 py-3 font-medium text-navy">{t.title}</td>
                    <td className="px-4 py-3 text-text-light">{t.tenantName}</td>
                    <td className="px-4 py-3 text-text-light">{t.property}</td>
                    <td className="px-4 py-3 text-text-light">{t.landlord}</td>
                    <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${s.bg} ${s.text}`}>{s.label}</span></td>
                    <td className="px-4 py-3 text-xs text-text-light">{t.lastAction}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex gap-1 justify-end">
                        <button className="text-xs bg-teal/10 text-teal px-2 py-1 rounded hover:bg-teal/20 transition-colors">Freelancer</button>
                        <button className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded hover:bg-gray-200 transition-colors">Lösen</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
