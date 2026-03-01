export const dynamic = "force-dynamic";

import { AdminSidebar } from "../components/AdminLayout";
import { db, hasDatabase } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

interface LeadRow {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  einheiten: string | null;
  message: string | null;
  status: string | null;
  createdAt: string;
}

const DEMO_LEADS: LeadRow[] = [
  { id: "le1", name: "Klaus Müller", email: "k.mueller@gmail.com", phone: "+49 40 111222", einheiten: "8", message: "Suche zuverlässige Verwaltung für mein Mehrfamilienhaus", status: "new", createdAt: "01.03.2026 09:14" },
  { id: "le2", name: "Sabine Becker", email: "s.becker@web.de", phone: "+49 40 333444", einheiten: "4", message: "Unzufrieden mit aktuellem Verwalter, Wechsel geplant", status: "contacted", createdAt: "28.02.2026 14:30" },
  { id: "le3", name: "Hans Fischer", email: "h.fischer@t-online.de", phone: null, einheiten: "12", message: "WEG-Verwaltung für Neubau gesucht", status: "converted", createdAt: "25.02.2026 11:00" },
  { id: "le4", name: "Monika Weber", email: "m.weber@gmx.de", phone: "+49 30 555666", einheiten: "2", message: "Eigentumswohnung, Mieter gesucht", status: "lost", createdAt: "20.02.2026 16:45" },
];

const STATUS_STYLES: Record<string, { label: string; bg: string; text: string }> = {
  new:        { label: "Neu",         bg: "bg-amber-50",  text: "text-amber-700" },
  contacted:  { label: "Kontaktiert", bg: "bg-blue-50",   text: "text-blue-700" },
  converted:  { label: "Gewonnen",    bg: "bg-green-50",  text: "text-green-700" },
  lost:       { label: "Verloren",    bg: "bg-gray-100",  text: "text-gray-500" },
};

async function getLeads(): Promise<LeadRow[]> {
  if (!hasDatabase) return DEMO_LEADS;
  try {
    const rows = await db
      .select({
        id: leads.id,
        name: leads.name,
        email: leads.email,
        telefon: leads.telefon,
        einheiten: leads.einheiten,
        situation: leads.situation,
        status: leads.status,
        createdAt: leads.createdAt,
      })
      .from(leads)
      .orderBy(desc(leads.createdAt))
      .limit(50);

    if (rows.length === 0) return DEMO_LEADS;

    return rows.map((l) => ({
      id: l.id,
      name: l.name,
      email: l.email,
      phone: l.telefon,
      einheiten: l.einheiten,
      message: l.situation,
      status: l.status,
      createdAt: l.createdAt
        ? new Date(l.createdAt).toLocaleString("de-DE", { dateStyle: "short", timeStyle: "short" })
        : "—",
    }));
  } catch (err) {
    console.error("Leads DB error:", err);
    return DEMO_LEADS;
  }
}

export default async function AdminLeadsPage() {
  const rows = await getLeads();

  const newCount       = rows.filter((l) => l.status === "new" || !l.status).length;
  const contactedCount = rows.filter((l) => l.status === "contacted").length;
  const convertedCount = rows.filter((l) => l.status === "converted").length;
  const lostCount      = rows.filter((l) => l.status === "lost").length;

  return (
    <div className="flex min-h-screen bg-light-gray">
      <AdminSidebar />
      <main className="ml-64 flex-1 p-8">
        <h1 className="text-2xl font-bold text-navy mb-1">Leads</h1>
        <p className="text-text-light text-sm mb-6">
          Alle Anfragen aus dem Quiz und direktem Kontakt — {rows.length} gesamt
        </p>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            ["Neu",         newCount,       "text-amber-700"],
            ["Kontaktiert", contactedCount, "text-blue-700"],
            ["Gewonnen",    convertedCount, "text-green-600"],
            ["Verloren",    lostCount,      "text-gray-500"],
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
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">E-Mail</th>
                <th className="px-4 py-3 text-left">Telefon</th>
                <th className="px-4 py-3 text-left">Einheiten</th>
                <th className="px-4 py-3 text-left">Nachricht</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Datum</th>
                <th className="px-4 py-3 text-right">Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((l) => {
                const s = STATUS_STYLES[l.status ?? "new"] || STATUS_STYLES.new;
                return (
                  <tr key={l.id} className="border-t border-gray-50 hover:bg-gray-50/50">
                    <td className="px-4 py-3 font-medium text-navy">{l.name}</td>
                    <td className="px-4 py-3 text-text-light">{l.email}</td>
                    <td className="px-4 py-3 text-text-light">{l.phone ?? "—"}</td>
                    <td className="px-4 py-3 text-text-light">{l.einheiten ?? "—"}</td>
                    <td className="px-4 py-3 text-text-light max-w-[220px]">
                      <span className="line-clamp-1" title={l.message ?? ""}>
                        {l.message ? l.message.slice(0, 60) + (l.message.length > 60 ? "…" : "") : "—"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${s.bg} ${s.text}`}>
                        {s.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-text-light">{l.createdAt}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        className="text-xs bg-teal/10 text-teal px-2 py-1 rounded hover:bg-teal/20 transition-colors cursor-not-allowed opacity-60"
                        disabled
                        title="Als Eigentümer anlegen — coming soon"
                      >
                        Als Eigentümer anlegen
                      </button>
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
