export const dynamic = "force-dynamic";
import { AdminSidebar } from "../components/AdminLayout";

const DEMO_FREELANCERS = [
  { id: "f1", name: "Klaus Mertens", email: "k.mertens@gmail.com", skills: ["Übergabe", "ETV", "Besichtigung"], rating: 4.9, jobs: 23, earnings: 840, status: "active", city: "Hamburg" },
  { id: "f2", name: "Ingrid Bauer", email: "i.bauer@web.de", skills: ["Übergabe", "Schlüssel"], rating: 4.7, jobs: 11, earnings: 420, status: "active", city: "Hamburg" },
  { id: "f3", name: "Werner Schmidt", email: "w.schmidt@gmx.de", skills: ["Begehung", "Streitschlichtung", "ETV"], rating: 0, jobs: 0, earnings: 0, status: "pending", city: "Hamburg" },
  { id: "f4", name: "Helga Richter", email: "h.richter@t-online.de", skills: ["Besichtigung", "Übergabe"], rating: 4.5, jobs: 7, earnings: 280, status: "active", city: "Berlin" },
];

const STATUS: Record<string, { label: string; bg: string; text: string }> = {
  active:   { label: "Aktiv",    bg: "bg-green-50",  text: "text-green-600" },
  pending:  { label: "Ausstehend", bg: "bg-amber-50", text: "text-amber-600" },
  inactive: { label: "Inaktiv",  bg: "bg-gray-100",  text: "text-gray-500" },
};

export default function AdminFreelancersPage() {
  return (
    <div className="flex min-h-screen bg-light-gray">
      <AdminSidebar />
      <main className="ml-64 flex-1 p-8">
        <h1 className="text-2xl font-bold text-navy mb-1">Freelancer</h1>
        <p className="text-text-light text-sm mb-6">Lokale Auftragnehmer — Jobs, Bewertungen, Verwaltung</p>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-xs text-text-light uppercase tracking-wide">Aktive Freelancer</p>
            <p className="text-3xl font-bold text-navy mt-1">{DEMO_FREELANCERS.filter(f => f.status === "active").length}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-xs text-text-light uppercase tracking-wide">Ausstehende Genehmigung</p>
            <p className="text-3xl font-bold text-amber-500 mt-1">{DEMO_FREELANCERS.filter(f => f.status === "pending").length}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-xs text-text-light uppercase tracking-wide">Jobs gesamt</p>
            <p className="text-3xl font-bold text-teal mt-1">{DEMO_FREELANCERS.reduce((s, f) => s + f.jobs, 0)}</p>
          </div>
        </div>

        {/* Pending approval banner */}
        {DEMO_FREELANCERS.some(f => f.status === "pending") && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-center justify-between">
            <div>
              <p className="font-semibold text-amber-800 text-sm">⚠️ {DEMO_FREELANCERS.filter(f => f.status === "pending").length} Freelancer warten auf Genehmigung</p>
              <p className="text-amber-700 text-xs mt-0.5">Profil und ID-Dokument prüfen, dann freigeben</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="text-xs text-text-light uppercase bg-gray-50">
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Skills</th>
              <th className="px-4 py-3 text-left">Stadt</th>
              <th className="px-4 py-3 text-left">Jobs</th>
              <th className="px-4 py-3 text-left">Bewertung</th>
              <th className="px-4 py-3 text-left">Verdient</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-right">Aktionen</th>
            </tr></thead>
            <tbody>
              {DEMO_FREELANCERS.map((f) => {
                const s = STATUS[f.status] || STATUS.inactive;
                return (
                  <tr key={f.id} className="border-t border-gray-50 hover:bg-gray-50/50">
                    <td className="px-4 py-3">
                      <div className="font-medium text-navy">{f.name}</div>
                      <div className="text-xs text-text-light">{f.email}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {f.skills.map(sk => <span key={sk} className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">{sk}</span>)}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-text-light">{f.city}</td>
                    <td className="px-4 py-3 text-navy font-medium">{f.jobs}</td>
                    <td className="px-4 py-3">
                      {f.rating > 0 ? <span className="text-amber-500 font-medium">★ {f.rating}</span> : <span className="text-text-light text-xs">Neu</span>}
                    </td>
                    <td className="px-4 py-3 text-navy">{f.earnings > 0 ? `${f.earnings} €` : "—"}</td>
                    <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${s.bg} ${s.text}`}>{s.label}</span></td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex gap-1 justify-end">
                        {f.status === "pending" && <button className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">Genehmigen</button>}
                        {f.status === "active" && <button className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded hover:bg-gray-200">Deaktivieren</button>}
                        <button className="text-xs bg-teal/10 text-teal px-2 py-1 rounded hover:bg-teal/20">Jobs</button>
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
