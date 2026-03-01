export const dynamic = "force-dynamic";
import { AdminSidebar } from "../components/AdminLayout";
import { db, hasDatabase } from "@/lib/db";
import { tickets, tenants, properties, units } from "@/lib/db/schema";
import { desc, eq, ne, and } from "drizzle-orm";
import Link from "next/link";

const DEMO_TICKETS = [
  { id: "t1", title: "Heizung ausgefallen", tenantName: "M. Richter", property: "Musterstr. 12", category: "maintenance", status: "open", priority: "high", createdAt: "01.03.2026 08:14" },
  { id: "t2", title: "Briefkasten defekt", tenantName: "S. Müller", property: "Alsterblick 5", category: "maintenance", status: "open", priority: "normal", createdAt: "28.02.2026 17:30" },
  { id: "t3", title: "Wasserschaden Küche", tenantName: "A. Koch", property: "Eppendorfer Weg 3", category: "maintenance", status: "inprogress", priority: "urgent", createdAt: "01.03.2026 10:00" },
  { id: "t4", title: "Fenster klemmt", tenantName: "B. Schulz", property: "Musterstr. 12", category: "maintenance", status: "resolved", priority: "low", createdAt: "27.02.2026 09:00" },
  { id: "t5", title: "Schimmel im Bad", tenantName: "C. Klein", property: "Wandsbeker Str. 8", category: "complaint", status: "open", priority: "high", createdAt: "28.02.2026 14:00" },
];

const PAGE_SIZE = 20;

interface TicketRow {
  id: string;
  title: string;
  tenantName: string;
  property: string;
  category: string | null;
  status: string | null;
  priority: string | null;
  createdAt: string;
}

async function getTickets(page: number): Promise<{ rows: TicketRow[]; total: number }> {
  if (!hasDatabase) return { rows: DEMO_TICKETS, total: DEMO_TICKETS.length };
  try {
    const offset = (page - 1) * PAGE_SIZE;
    const dbTickets = await db
      .select({
        id: tickets.id,
        title: tickets.title,
        category: tickets.category,
        status: tickets.status,
        priority: tickets.priority,
        createdAt: tickets.createdAt,
        tenantFirstName: tenants.firstName,
        tenantLastName: tenants.lastName,
        propertyAddress: properties.address,
      })
      .from(tickets)
      .leftJoin(tenants, eq(tickets.tenantId, tenants.id))
      .leftJoin(properties, eq(tickets.propertyId, properties.id))
      .orderBy(desc(tickets.createdAt))
      .limit(PAGE_SIZE)
      .offset(offset);

    // Count total
    const allTickets = await db.select({ id: tickets.id }).from(tickets);
    const total = allTickets.length;

    const rows: TicketRow[] = dbTickets.map((t) => ({
      id: t.id,
      title: t.title,
      tenantName: t.tenantFirstName
        ? `${t.tenantFirstName.charAt(0)}. ${t.tenantLastName ?? ""}`.trim()
        : "—",
      property: t.propertyAddress ?? "—",
      category: t.category,
      status: t.status,
      priority: t.priority,
      createdAt: t.createdAt
        ? new Date(t.createdAt).toLocaleString("de-DE", { dateStyle: "short", timeStyle: "short" })
        : "—",
    }));

    return { rows: rows.length > 0 ? rows : DEMO_TICKETS, total };
  } catch (err) {
    console.error("Tickets DB error:", err);
    return { rows: DEMO_TICKETS, total: DEMO_TICKETS.length };
  }
}

const STATUS: Record<string, { label: string; bg: string; text: string }> = {
  open:        { label: "Offen",          bg: "bg-red-50",    text: "text-red-600" },
  inprogress:  { label: "In Bearbeitung", bg: "bg-amber-50",  text: "text-amber-600" },
  in_progress: { label: "In Bearbeitung", bg: "bg-amber-50",  text: "text-amber-600" },
  resolved:    { label: "Gelöst",         bg: "bg-green-50",  text: "text-green-600" },
  closed:      { label: "Geschlossen",    bg: "bg-gray-100",  text: "text-gray-500" },
};

const PRIO: Record<string, { label: string; color: string }> = {
  urgent: { label: "Kritisch", color: "bg-red-500" },
  high:   { label: "Hoch",     color: "bg-orange-400" },
  normal: { label: "Mittel",   color: "bg-amber-400" },
  medium: { label: "Mittel",   color: "bg-amber-400" },
  low:    { label: "Niedrig",  color: "bg-gray-300" },
};

const CAT_LABELS: Record<string, string> = {
  maintenance: "Instandhaltung",
  billing:     "Abrechnung",
  complaint:   "Beschwerde",
  other:       "Sonstiges",
};

export default async function AdminTicketsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? "1", 10));
  const { rows, total } = await getTickets(page);

  const open      = rows.filter((t) => t.status === "open").length;
  const inProg    = rows.filter((t) => t.status === "inprogress" || t.status === "in_progress").length;
  const resolved  = rows.filter((t) => t.status === "resolved" || t.status === "closed").length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="flex min-h-screen bg-light-gray">
      <AdminSidebar />
      <main className="ml-64 flex-1 p-8">
        <h1 className="text-2xl font-bold text-navy mb-1">Alle Tickets</h1>
        <p className="text-text-light text-sm mb-6">
          Vollständige Übersicht aller Mieteranfragen — {total} gesamt
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            ["Offen", open, "text-red-600"],
            ["In Bearbeitung", inProg, "text-amber-600"],
            ["Gelöst", resolved, "text-green-600"],
          ].map(([label, val, cls]) => (
            <div key={String(label)} className="bg-white rounded-xl border border-gray-100 p-4">
              <p className="text-xs text-text-light uppercase tracking-wide">{label}</p>
              <p className={`text-3xl font-bold mt-1 ${cls}`}>{val}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-text-light uppercase bg-gray-50">
                <th className="px-4 py-3 text-left">Prio</th>
                <th className="px-4 py-3 text-left">Ticket</th>
                <th className="px-4 py-3 text-left">Kategorie</th>
                <th className="px-4 py-3 text-left">Mieter</th>
                <th className="px-4 py-3 text-left">Objekt</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Erstellt</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((t) => {
                const s = STATUS[t.status ?? "open"] || STATUS.open;
                const p = PRIO[t.priority ?? "normal"] || PRIO.normal;
                return (
                  <tr key={t.id} className="border-t border-gray-50 hover:bg-gray-50/50">
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block w-2.5 h-2.5 rounded-full ${p.color}`}
                        title={p.label}
                      />
                    </td>
                    <td className="px-4 py-3 font-medium text-navy max-w-[200px] truncate">
                      {t.title}
                    </td>
                    <td className="px-4 py-3 text-text-light">
                      {CAT_LABELS[t.category ?? ""] || t.category || "—"}
                    </td>
                    <td className="px-4 py-3 text-text-light">{t.tenantName}</td>
                    <td className="px-4 py-3 text-text-light max-w-[160px] truncate">{t.property}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${s.bg} ${s.text}`}>
                        {s.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-text-light">{t.createdAt}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-text-light">
            Seite {page} von {totalPages} · {total} Tickets gesamt
          </p>
          <div className="flex gap-2">
            {page > 1 && (
              <Link
                href={`/admin/tickets?page=${page - 1}`}
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-navy hover:bg-gray-50 transition-colors"
              >
                ← Zurück
              </Link>
            )}
            {page < totalPages && (
              <Link
                href={`/admin/tickets?page=${page + 1}`}
                className="px-4 py-2 bg-navy text-white rounded-lg text-sm hover:bg-navy/90 transition-colors"
              >
                Weiter →
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
