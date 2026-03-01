export const dynamic = "force-dynamic";
import { AdminSidebar } from "../components/AdminLayout";

const DEMO_APPROVALS = [
  { id: "a1", type: "repair_cost", title: "Heizungswartung — Müller GmbH", landlord: "Thomas Bergmann", property: "Musterstr. 12", amount: 340, status: "pending", since: "Vor 2 Stunden", expires: "In 22h" },
  { id: "a2", type: "rent_increase", title: "Mieterhöhung Wohnung 1 — +4,2% §558 BGB", landlord: "Thomas Bergmann", property: "Musterstr. 12, Whg. 1", amount: null, status: "pending", since: "Vor 1 Tag", expires: "In 6 Tagen" },
  { id: "a3", type: "repair_cost", title: "Wasserschaden Notfallreparatur", landlord: "Maria Wagner", property: "Eppendorfer Weg 3", amount: 850, status: "pending", since: "Vor 30 Min", expires: "In 23,5h" },
  { id: "a4", type: "investment", title: "Dämmung Dachgeschoss — Modernisierungsumlage §559 BGB", landlord: "Rolf Hoffmann", property: "Wandsbeker Str. 8", amount: 12000, status: "pending", since: "Vor 3 Tagen", expires: "In 4 Tagen" },
  { id: "a5", type: "repair_cost", title: "Briefkastenanlage erneuern", landlord: "Petra Schulz", property: "Alsterblick 5", amount: 480, status: "approved", since: "Vor 2 Tagen", expires: "—" },
];

const TYPE_LABELS: Record<string, string> = {
  repair_cost: "Reparatur",
  rent_increase: "Mieterhöhung",
  tenant_change: "Mieterwechsel",
  eviction: "Kündigung",
  investment: "Investition",
};

const TYPE_COLORS: Record<string, string> = {
  repair_cost: "bg-orange-100 text-orange-700",
  rent_increase: "bg-blue-100 text-blue-700",
  investment: "bg-purple-100 text-purple-700",
  tenant_change: "bg-teal-100 text-teal-700",
  eviction: "bg-red-100 text-red-700",
};

export default function AdminApprovalsPage() {
  const pending = DEMO_APPROVALS.filter(a => a.status === "pending");

  return (
    <div className="flex min-h-screen bg-light-gray">
      <AdminSidebar />
      <main className="ml-64 flex-1 p-8">
        <h1 className="text-2xl font-bold text-navy mb-1">Genehmigungen</h1>
        <p className="text-text-light text-sm mb-6">Alle ausstehenden Eigentümer-Approvals — Admin kann manuell eingreifen</p>

        {pending.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="font-semibold text-red-800 text-sm">🚨 {pending.length} Genehmigungen ausstehend</p>
            <p className="text-red-700 text-xs mt-0.5">Eigentümer wurden bereits per E-Mail benachrichtigt. Admin kann bei Inaktivität manuell genehmigen.</p>
          </div>
        )}

        <div className="space-y-3">
          {DEMO_APPROVALS.map((a) => (
            <div key={a.id} className={`bg-white rounded-xl border p-5 ${a.status === "approved" ? "border-green-100 opacity-60" : "border-gray-100"}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${TYPE_COLORS[a.type] || "bg-gray-100 text-gray-600"}`}>
                      {TYPE_LABELS[a.type] || a.type}
                    </span>
                    {a.status === "approved" && <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-600">Genehmigt</span>}
                    {a.status === "pending" && <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-600">Ausstehend</span>}
                  </div>
                  <h3 className="font-semibold text-navy">{a.title}</h3>
                  <div className="flex gap-4 mt-1 text-xs text-text-light">
                    <span>👤 {a.landlord}</span>
                    <span>🏠 {a.property}</span>
                    {a.amount && <span>💶 {a.amount.toLocaleString("de-DE")} €</span>}
                    <span>⏱ Seit: {a.since}</span>
                    {a.status === "pending" && <span className="text-red-500">⏰ Läuft ab: {a.expires}</span>}
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
          ))}
        </div>
      </main>
    </div>
  );
}
