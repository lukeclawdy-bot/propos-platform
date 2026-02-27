"use client";

import { useState } from "react";

interface Tenant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  unitDesignation?: string | null;
  propertyAddress?: string | null;
  coldRentCents?: number | null;
  moveInDate?: string | null;
  moveOutDate?: string | null;
  active: boolean;
}

interface MieterClientProps {
  initialTenants: Tenant[];
  isDemo: boolean;
}

function formatRent(cents: number | null | undefined) {
  if (!cents) return "—";
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(cents / 100);
}

function formatDate(dateStr: string | null | undefined) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export function MieterClient({ initialTenants, isDemo }: MieterClientProps) {
  const [tenants, setTenants] = useState<Tenant[]>(initialTenants);
  const [showModal, setShowModal] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    moveInDate: "", unitId: "",
  });

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isDemo) { setShowModal(false); return; }
    setSaving(true);
    try {
      const res = await fetch("/api/portal/tenants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const { data } = await res.json();
        setTenants(prev => [...prev, data]);
        setShowModal(false);
        setForm({ firstName: "", lastName: "", email: "", phone: "", moveInDate: "", unitId: "" });
      }
    } catch (err) {
      console.error(err);
    }
    setSaving(false);
  };

  const activeTenants = tenants.filter(t => t.active !== false);
  const inactiveTenants = tenants.filter(t => t.active === false);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-navy">Mieter</h1>
          <p className="text-text-light text-sm mt-1">{activeTenants.length} aktive Mieter</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-teal text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-navy transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Mieter hinzufügen
        </button>
      </div>

      {/* Tenant list */}
      {tenants.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <div className="w-16 h-16 bg-teal/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <p className="text-navy font-semibold mb-2">Noch keine Mieter</p>
          <p className="text-text-light text-sm mb-6">Fügen Sie Ihren ersten Mieter hinzu, um loszulegen.</p>
          <button onClick={() => setShowModal(true)} className="bg-teal text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-navy transition-colors">
            Mieter hinzufügen
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-6 py-4 text-xs font-semibold text-text-light uppercase tracking-wide">Name</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-text-light uppercase tracking-wide">Einheit</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-text-light uppercase tracking-wide">Miete</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-text-light uppercase tracking-wide">Einzug</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-text-light uppercase tracking-wide">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody>
              {tenants.map((t) => (
                <>
                  <tr
                    key={t.id}
                    className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors cursor-pointer"
                    onClick={() => setExpanded(expanded === t.id ? null : t.id)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-teal/10 flex items-center justify-center text-teal font-semibold text-sm">
                          {t.firstName[0]}{t.lastName[0]}
                        </div>
                        <div>
                          <p className="font-medium text-navy text-sm">{t.firstName} {t.lastName}</p>
                          <p className="text-text-light text-xs">{t.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-navy">
                      <p>{t.unitDesignation || "—"}</p>
                      {t.propertyAddress && <p className="text-xs text-text-light">{t.propertyAddress}</p>}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-navy">{formatRent(t.coldRentCents)}</td>
                    <td className="px-6 py-4 text-sm text-text-light">{formatDate(t.moveInDate)}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        t.active !== false ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                      }`}>
                        {t.active !== false ? "Aktiv" : "Ausgezogen"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <svg className={`w-4 h-4 text-text-light transition-transform ${expanded === t.id ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </td>
                  </tr>
                  {expanded === t.id && (
                    <tr key={`${t.id}-expanded`} className="bg-gray-50/50">
                      <td colSpan={6} className="px-6 py-4">
                        <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                          <div>
                            <p className="text-text-light text-xs mb-1">Telefon</p>
                            <p className="text-navy">{t.phone || "—"}</p>
                          </div>
                          <div>
                            <p className="text-text-light text-xs mb-1">Einzugsdatum</p>
                            <p className="text-navy">{formatDate(t.moveInDate)}</p>
                          </div>
                          <div>
                            <p className="text-text-light text-xs mb-1">Auszugsdatum</p>
                            <p className="text-navy">{formatDate(t.moveOutDate)}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <a href={`mailto:${t.email}`} className="text-xs border border-gray-200 text-navy px-3 py-1.5 rounded-lg hover:bg-white transition-colors">
                            E-Mail senden
                          </a>
                          <button className="text-xs border border-red-200 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors">
                            Auszug vermerken
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Tenant Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-navy">Mieter hinzufügen</h2>
              <button onClick={() => setShowModal(false)} className="text-text-light hover:text-navy">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {isDemo && (
              <div className="bg-amber-50 text-amber-700 text-sm rounded-xl p-3 mb-4">
                Im Demo-Modus können keine echten Mieter hinzugefügt werden.
              </div>
            )}
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-text-light mb-1">Vorname *</label>
                  <input required value={form.firstName} onChange={e => setForm(f => ({...f, firstName: e.target.value}))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal" placeholder="Max" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-text-light mb-1">Nachname *</label>
                  <input required value={form.lastName} onChange={e => setForm(f => ({...f, lastName: e.target.value}))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal" placeholder="Mustermann" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-text-light mb-1">E-Mail *</label>
                <input required type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal" placeholder="max@beispiel.de" />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-light mb-1">Telefon</label>
                <input value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal" placeholder="+49 40 ..." />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-light mb-1">Einzugsdatum</label>
                <input type="date" value={form.moveInDate} onChange={e => setForm(f => ({...f, moveInDate: e.target.value}))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)}
                  className="flex-1 border border-gray-200 text-navy py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
                  Abbrechen
                </button>
                <button type="submit" disabled={saving}
                  className="flex-1 bg-teal text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-navy transition-colors disabled:opacity-50">
                  {saving ? "Speichern..." : "Hinzufügen"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
