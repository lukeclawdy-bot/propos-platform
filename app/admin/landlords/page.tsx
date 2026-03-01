export const dynamic = "force-dynamic";
import { AdminSidebar } from "../components/AdminLayout";
import { db, hasDatabase } from "@/lib/db";
import { landlords, properties, units } from "@/lib/db/schema";
import { eq, count, sql, desc } from "drizzle-orm";
import Link from "next/link";

interface LandlordRow {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  city: string | null;
  propertyCount: number;
  unitCount: number;
  status: string;
  createdAt: string;
}

const DEMO_LANDLORDS: LandlordRow[] = [
  { id: "l1", name: "Thomas Bergmann", email: "t.bergmann@gmail.com", phone: "+49 40 123456", city: "Hamburg", propertyCount: 2, unitCount: 8, status: "active", createdAt: "01.02.2026" },
  { id: "l2", name: "Maria Wagner", email: "m.wagner@web.de", phone: "+49 40 234567", city: "Hamburg", propertyCount: 1, unitCount: 4, status: "active", createdAt: "15.02.2026" },
  { id: "l3", name: "Rolf Hoffmann", email: "r.hoffmann@t-online.de", phone: null, city: "Berlin", propertyCount: 3, unitCount: 14, status: "onboarding", createdAt: "20.02.2026" },
  { id: "l4", name: "Petra Schulz", email: "p.schulz@gmx.de", phone: "+49 30 345678", city: "Hamburg", propertyCount: 1, unitCount: 6, status: "active", createdAt: "25.02.2026" },
];

async function getLandlords(): Promise<LandlordRow[]> {
  if (!hasDatabase) return DEMO_LANDLORDS;
  try {
    // Get landlords with property count
    const rows = await db
      .select({
        id: landlords.id,
        name: landlords.name,
        email: landlords.email,
        phone: landlords.phone,
        onboardingCompleted: landlords.onboardingCompleted,
        createdAt: landlords.createdAt,
        propertyCount: count(properties.id),
      })
      .from(landlords)
      .leftJoin(properties, eq(properties.landlordId, landlords.id))
      .groupBy(landlords.id)
      .orderBy(desc(landlords.createdAt));

    if (rows.length === 0) return DEMO_LANDLORDS;

    // For each landlord, get unit count via properties
    const result: LandlordRow[] = await Promise.all(
      rows.map(async (l) => {
        let unitCount = 0;
        try {
          // Sum unitCount from all properties of this landlord
          const unitResult = await db
            .select({ total: sql<number>`coalesce(sum(${properties.unitCount}), 0)` })
            .from(properties)
            .where(eq(properties.landlordId, l.id));
          unitCount = Number(unitResult[0]?.total ?? 0);
        } catch {}

        return {
          id: l.id,
          name: l.name ?? l.email,
          email: l.email,
          phone: l.phone,
          city: null, // landlords table has no city column
          propertyCount: Number(l.propertyCount ?? 0),
          unitCount,
          status: l.onboardingCompleted ? "active" : "onboarding",
          createdAt: l.createdAt
            ? new Date(l.createdAt).toLocaleDateString("de-DE")
            : "—",
        };
      })
    );

    return result;
  } catch (err) {
    console.error("Landlords DB error:", err);
    return DEMO_LANDLORDS;
  }
}

const STATUS_STYLES: Record<string, { label: string; bg: string; text: string }> = {
  active:     { label: "Aktiv",       bg: "bg-green-50",  text: "text-green-600" },
  onboarding: { label: "Onboarding",  bg: "bg-amber-50",  text: "text-amber-600" },
  inactive:   { label: "Inaktiv",     bg: "bg-gray-100",  text: "text-gray-500" },
};

export default async function AdminLandlordsPage() {
  const rows = await getLandlords();

  const totalUnits      = rows.reduce((s, l) => s + l.unitCount, 0);
  const totalProperties = rows.reduce((s, l) => s + l.propertyCount, 0);
  const activeCount     = rows.filter((l) => l.status === "active").length;

  return (
    <div className="flex min-h-screen bg-light-gray">
      <AdminSidebar />
      <main className="ml-64 flex-1 p-8">
        <h1 className="text-2xl font-bold text-navy mb-1">Eigentümer</h1>
        <p className="text-text-light text-sm mb-6">
          Alle Landlord-Accounts, Objekte und Status — {rows.length} gesamt
        </p>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-xs text-text-light uppercase tracking-wide">Eigentümer gesamt</p>
            <p className="text-3xl font-bold text-navy mt-1">{rows.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-xs text-text-light uppercase tracking-wide">Aktiv</p>
            <p className="text-3xl font-bold text-green-600 mt-1">{activeCount}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-xs text-text-light uppercase tracking-wide">Objekte gesamt</p>
            <p className="text-3xl font-bold text-teal mt-1">{totalProperties}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-xs text-text-light uppercase tracking-wide">Einheiten gesamt</p>
            <p className="text-3xl font-bold text-teal mt-1">{totalUnits}</p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-text-light uppercase bg-gray-50">
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">E-Mail</th>
                <th className="px-4 py-3 text-left">Telefon</th>
                <th className="px-4 py-3 text-left">Objekte</th>
                <th className="px-4 py-3 text-left">Einheiten</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Seit</th>
                <th className="px-4 py-3 text-right">Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((l) => {
                const s = STATUS_STYLES[l.status] || STATUS_STYLES.onboarding;
                return (
                  <tr key={l.id} className="border-t border-gray-50 hover:bg-gray-50/50">
                    <td className="px-4 py-3 font-medium text-navy">{l.name}</td>
                    <td className="px-4 py-3 text-text-light">{l.email}</td>
                    <td className="px-4 py-3 text-text-light">{l.phone ?? "—"}</td>
                    <td className="px-4 py-3 text-text-light">{l.propertyCount}</td>
                    <td className="px-4 py-3 text-text-light">{l.unitCount}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${s.bg} ${s.text}`}>
                        {s.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-text-light">{l.createdAt}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex gap-1 justify-end">
                        <Link
                          href="/portal/dashboard"
                          target="_blank"
                          className="text-xs bg-teal/10 text-teal px-2 py-1 rounded hover:bg-teal/20 transition-colors"
                        >
                          Portal öffnen
                        </Link>
                        <a
                          href={`mailto:${l.email}`}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                        >
                          E-Mail
                        </a>
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
