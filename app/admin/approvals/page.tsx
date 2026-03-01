export const dynamic = "force-dynamic";
import { AdminSidebar } from "../components/AdminLayout";
import { db, hasDatabase } from "@/lib/db";
import { approvals, landlords } from "@/lib/db/schema";
import { desc, eq, and } from "drizzle-orm";
import Link from "next/link";

interface ApprovalRow {
  id: string;
  type: string;
  title: string;
  description: string | null;
  amountCents: number | null;
  landlordName: string;
  status: string;
  requestedAt: string;
  decidedAt: string | null;
}

const DEMO_APPROVALS: ApprovalRow[] = [
  { id: "a1", type: "repair_cost", title: "Heizungswartung — Müller GmbH", description: "Jährliche Wartung der Gasheizung", amountCents: 34000, landlordName: "Thomas Bergmann", status: "pending", requestedAt: "01.03.2026 08:00", decidedAt: null },
  { id: "a2", type: "rent_increase", title: "Mieterhöhung Wohnung 1 — +4,2% §558 BGB", description: null, amountCents: null, landlordName: "Thomas Bergmann", status: "pending", requestedAt: "28.02.2026 16:00", decidedAt: null },
  { id: "a3", type: "repair_cost", title: "Wasserschaden Notfallreparatur", description: "Rohrbruch in Badezimmer EG", amountCents: 85000, landlordName: "Maria Wagner", status: "pending", requestedAt: "01.03.2026 10:30", decidedAt: null },
  { id: "a4", type: "investment", title: "Dämmung Dachgeschoss — §559 BGB", description: null, amountCents: 1200000, landlordName: "Rolf Hoffmann", status: "pending", requestedAt: "26.02.2026 14:00", decidedAt: null },
  { id: "a5", type: "repair_cost", title: "Briefkastenanlage erneuern", description: null, amountCents: 48000, landlordName: "Petra Schulz", status: "approved", requestedAt: "25.02.2026 09:00", decidedAt: "26.02.2026 11:00" },
];

const TYPE_LABELS: Record<string, string> = {
  repair_cost:    "Reparatur",
  rent_increase:  "Mieterhöhung",
  tenant_change:  "Mieterwechsel",
  eviction:       "Kündigung",
  investment:     "Investition",
};

const TYPE_COLORS: Record<string, string> = {
  repair_cost:   "bg-orange-100 text-orange-700",
  rent_increase: "bg-blue-100 text-blue-700",
  investment:    "bg-purple-100 text-purple-700",
  tenant_change: "bg-teal-100 text-teal-700",
  eviction:      "bg-red-100 text-red-700",
};

const STATUS_STYLES: Record<string, { label: string; bg: string; text: string }> = {
  pending:  { label: "Ausstehend", bg: "bg-amber-50",  text: "text-amber-600" },
  approved: { label: "Genehmigt",  bg: "bg-green-50",  text: "text-green-600" },
  rejected: { label: "Abgelehnt",  bg: "bg-red-50",    text: "text-red-600" },
  expired:  { label: "Abgelaufen", bg: "bg-gray-100",  text: "text-gray-500" },
};

type StatusFilter = "all" | "pending" | "approved" | "rejected";

async function getApprovals(statusFilter: StatusFilter): Promise<ApprovalRow[]> {
  if (!hasDatabase) {
    if (statusFilter === "all") return DEMO_APPROVALS;
    return DEMO_APPROVALS.filter((a) => a.status === statusFilter);
  }
  try {
    const rows = await db
      .select({
        id: approvals.id,
        type: approvals.type,
        title: approvals.title,
        description: approvals.description,
        amountCents: approvals.amountCents,
        status: approvals.status,
        requestedAt: approvals.requestedAt,
        decidedAt: approvals.decidedAt,
        landlordName: landlords.name,
        landlordEmail: landlords.email,
      })
      .from(approvals)
      .leftJoin(landlords, eq(approvals.landlordId, landlords.id))
      .orderBy(desc(approvals.requestedAt));

    const filtered = statusFilter === "all"
      ? rows
      : rows.filter((a) => a.status === statusFilter);

    if (filtered.length === 0 && statusFilter === "all") return DEMO_APPROVALS;

    return filtered.map((a) => ({
      id: a.id,
      type: a.type,
      title: a.title,
      description: a.description,
      amountCents: a.amountCents,
      landlordName: a.landlordName ?? a.landlordEmail ?? "—",
      status: a.status,
      requestedAt: a.requestedAt
        ? new Date(a.requestedAt).toLocaleString("de-DE", { dateStyle: "short", timeStyle: "short" })
        : "—",
      decidedAt: a.decidedAt
        ? new Date(a.decidedAt).toLocaleString("de-DE", { dateStyle: "short", timeStyle: "short" })
        : null,
    }));
  } catch (err) {
    console.error("Approvals DB error:", err);
    return DEMO_APPROVALS;
  }
}

export default async function AdminApprovalsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const params = await searchParams;
  const rawStatus = params.status ?? "all";
  const statusFilter: StatusFilter = ["all", "pending", "approved", "rejected"].includes(rawStatus)
    ? (rawStatus as StatusFilter)
    : "all";

  const rows = await getApprovals(statusFilter);
  const pendingCount = rows.filter((a) => a.status === "pending").length;

  const tabs: { key: StatusFilter; label: string }[] = [
    { key: "all",      label: "Alle" },
    { key: "pending",  label: "Ausstehend" },
    { key: "approved", label: "Genehmigt" },
    { key: "rejected", label: "Abgelehnt" },
  ];

  return (
    <div className="flex min-h-screen bg-light-gray">
      <AdminSidebar />
      <main className="ml-64 flex-1 p-8">
        <h1 className="text-2xl font-bold text-navy mb-1">Genehmigungen</h1>
        <p className="text-text-light text-sm mb-6">
          Eigentümer-Approvals — Admin kann bei Inaktivität manuell eingreifen
        </p>

        {pendingCount > 0 && statusFilter !== "approved" && statusFilter !== "rejected" && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="font-semibold text-red-800 text-sm">
              🚨 {pendingCount} Genehmigung{pendingCount !== 1 ? "en" : ""} ausstehend
            </p>
            <p className="text-red-700 text-xs mt-0.5">
              Eigentümer wurden per E-Mail benachrichtigt. Admin kann manuell genehmigen.
            </p>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          {tabs.map((tab) => (
            <Link
              key={tab.key}
              href={tab.key === "all" ? "/admin/approvals" : `/admin/approvals?status=${tab.key}`}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === tab.key
                  ? "bg-navy text-white"
                  : "bg-white border border-gray-200 text-text-light hover:bg-gray-50"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>

        {/* Approval Cards */}
        <div className="space-y-3">
          {rows.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
              <p className="text-text-light">Keine Genehmigungen gefunden.</p>
            </div>
          ) : (
            rows.map((a) => {
              const s = STATUS_STYLES[a.status] || STATUS_STYLES.pending;
              const isApproved = a.status === "approved" || a.status === "rejected";
              return (
                <div
                  key={a.id}
                  className={`bg-white rounded-xl border p-5 ${isApproved ? "border-gray-100 opacity-70" : "border-gray-100"}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${TYPE_COLORS[a.type] || "bg-gray-100 text-gray-600"}`}>
                          {TYPE_LABELS[a.type] || a.type}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${s.bg} ${s.text}`}>
                          {s.label}
                        </span>
                      </div>
                      <h3 className="font-semibold text-navy">{a.title}</h3>
                      {a.description && (
                        <p className="text-xs text-text-light mt-0.5">{a.description}</p>
                      )}
                      <div className="flex flex-wrap gap-4 mt-2 text-xs text-text-light">
                        <span>👤 {a.landlordName}</span>
                        {a.amountCents != null && (
                          <span>
                            💶 {(a.amountCents / 100).toLocaleString("de-DE", { style: "currency", currency: "EUR" })}
                          </span>
                        )}
                        <span>📅 Angefordert: {a.requestedAt}</span>
                        {a.decidedAt && <span>✅ Entschieden: {a.decidedAt}</span>}
                      </div>
                    </div>
                    {a.status === "pending" && (
                      <div className="flex gap-2 ml-4 flex-shrink-0">
                        <button className="px-3 py-1.5 bg-green-500 text-white text-xs font-semibold rounded-lg hover:bg-green-600 transition-colors">
                          ✓ Genehmigen
                        </button>
                        <button className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-semibold rounded-lg hover:bg-gray-200 transition-colors">
                          ✗ Ablehnen
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}
