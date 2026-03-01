export const dynamic = "force-dynamic";
import { AdminSidebar } from "../components/AdminLayout";

const DEMO_LANDLORDS = [
  { id: "l1", name: "Thomas Bergmann", email: "t.bergmann@gmail.com", properties: 2, units: 8, mrr: 216, status: "active", lastLogin: "Heute, 10:14", contract: "Unterzeichnet" },
  { id: "l2", name: "Maria Wagner", email: "m.wagner@web.de", properties: 1, units: 4, mrr: 108, status: "active", lastLogin: "Gestern", contract: "Unterzeichnet" },
  { id: "l3", name: "Rolf Hoffmann", email: "r.hoffmann@t-online.de", properties: 3, units: 14, mrr: 378, status: "onboarding", lastLogin: "Vor 3 Tagen", contract: "Ausstehend" },
  { id: "l4", name: "Petra Schulz", email: "p.schulz@gmx.de", properties: 1, units: 6, mrr: 174, status: "active", lastLogin: "Vor 1h", contract: "Unterzeichnet" },
];

export default function AdminLandlordsPage() {
  const totalMRR = DEMO_LANDLORDS.reduce((s, l) => s + l.mrr, 0);
  const totalUnits = DEMO_LANDLORDS.reduce((s, l) => s + l.units, 0);

  return (
    <div className="flex min-h-screen bg-light-gray">
      <AdminSidebar />
      <main className="ml-64 flex-1 p-8">
        <h1 className="text-2xl font-bold text-navy mb-1">Eigentümer</h1>
        <p className="text-text-light text-sm mb-6">Alle Landlord-Accounts, Objekte und Vertragsstatus</p>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-xs text-text-light uppercase tracking-wide">Aktive Eigentümer</p>
            <p className="text-3xl font-bold text-navy mt-1">{DEMO_LANDLORDS.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-xs text-text-light uppercase tracking-wide">Einheiten gesamt</p>
            <p className="text-3xl font-bold text-teal mt-1">{totalUnits}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-xs text-text-light uppercase tracking-wide">MRR gesamt</p>
            <p className="text-3xl font-bold text-green-600 mt-1">{totalMRR} €</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="text-xs text-text-light uppercase bg-gray-50">
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">E-Mail</th>
              <th className="px-4 py-3 text-left">Objekte</th>
              <th className="px-4 py-3 text-left">Einheiten</th>
              <th className="px-4 py-3 text-left">MRR</th>
              <th className="px-4 py-3 text-left">Vertrag</th>
              <th className="px-4 py-3 text-left">Letzter Login</th>
              <th className="px-4 py-3 text-right">Aktionen</th>
            </tr></thead>
            <tbody>
              {DEMO_LANDLORDS.map((l) => (
                <tr key={l.id} className="border-t border-gray-50 hover:bg-gray-50/50">
                  <td className="px-4 py-3 font-medium text-navy">{l.name}</td>
                  <td className="px-4 py-3 text-text-light">{l.email}</td>
                  <td className="px-4 py-3 text-text-light">{l.properties}</td>
                  <td className="px-4 py-3 text-text-light">{l.units}</td>
                  <td className="px-4 py-3 font-medium text-navy">{l.mrr} €</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${l.contract === "Unterzeichnet" ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"}`}>
                      {l.contract}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-text-light">{l.lastLogin}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex gap-1 justify-end">
                      <button className="text-xs bg-teal/10 text-teal px-2 py-1 rounded hover:bg-teal/20">Portal</button>
                      <button className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded hover:bg-gray-200">E-Mail</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
