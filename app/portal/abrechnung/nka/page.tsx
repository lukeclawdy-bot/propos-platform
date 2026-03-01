'use client';

/**
 * /portal/abrechnung/nka — Nebenkostenabrechnung Generator
 *
 * Übersicht aller verwalteten Objekte mit Mieter-Liste.
 * Per Klick wird eine NKA als druckfertiges HTML generiert und im neuen Tab geöffnet.
 * „Alle generieren" öffnet alle NKAs des ausgewählten Jahres sequenziell.
 */

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

// ─── Types ────────────────────────────────────────────────────────────────────

interface TenantRow {
  id: string;
  unitId: string;
  firstName: string;
  lastName: string;
  unitDesignation: string;
  areaM2: number | null;
  status: 'ausstehend' | 'erstellt';
  generatedAt?: string;
}

interface PropertyRow {
  id: string;
  address: string;
  postalCode: string;
  city: string;
  tenants: TenantRow[];
}

type GenerationState = 'idle' | 'loading' | 'done' | 'error';

// ─── Demo data ─────────────────────────────────────────────────────────────

const DEMO_PROPERTIES: PropertyRow[] = [
  {
    id: 'demo-prop-1',
    address: 'Musterstraße 7',
    postalCode: '20099',
    city: 'Hamburg',
    tenants: [
      { id: 'demo-tenant-1', unitId: 'demo-unit-1', firstName: 'Maria', lastName: 'Bergmann',  unitDesignation: 'EG links',    areaM2: 72.5, status: 'ausstehend' },
      { id: 'demo-tenant-2', unitId: 'demo-unit-2', firstName: 'Hans',  lastName: 'Fischer',   unitDesignation: 'EG rechts',   areaM2: 65.0, status: 'ausstehend' },
      { id: 'demo-tenant-3', unitId: 'demo-unit-3', firstName: 'Lena',  lastName: 'Hoffmann',  unitDesignation: '1. OG Mitte', areaM2: 88.0, status: 'ausstehend' },
    ],
  },
  {
    id: 'demo-prop-2',
    address: 'Alsterblick 5',
    postalCode: '22303',
    city: 'Hamburg',
    tenants: [
      { id: 'demo-tenant-4', unitId: 'demo-unit-4', firstName: 'Klaus', lastName: 'Zimmermann', unitDesignation: 'Whg. 1', areaM2: 58.0, status: 'ausstehend' },
      { id: 'demo-tenant-5', unitId: 'demo-unit-5', firstName: 'Petra', lastName: 'Schulze',    unitDesignation: 'Whg. 2', areaM2: 70.0, status: 'ausstehend' },
    ],
  },
];

// ─── Sidebar ─────────────────────────────────────────────────────────────────

function Sidebar() {
  const navItems = [
    { label: 'Übersicht',   href: '/portal/dashboard' },
    { label: 'Einheiten',   href: '/portal/einheiten' },
    { label: 'Mieter',      href: '/portal/mieter' },
    { label: 'Tickets',     href: '/portal/tickets' },
    { label: 'Dokumente',   href: '/portal/dokumente' },
    { label: 'Finanzen',    href: '/portal/finanzen' },
    { label: 'Mieterhöhung', href: '/portal/mieterhohung' },
    { label: 'NKA',          href: '/portal/nka' },
    { label: 'Analysen',     href: '/portal/analytics' },
    { label: 'DATEV Export', href: '/portal/datev' },
    { label: 'Abrechnung',  href: '/portal/abrechnung', active: true },
  ];

  return (
  );
}

// ─── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: 'ausstehend' | 'erstellt' | 'loading' | 'error' }) {
  const cfg = {
    ausstehend: { cls: 'bg-amber-50 text-amber-700 border-amber-200',  label: 'Ausstehend' },
    erstellt:   { cls: 'bg-green-50 text-green-700 border-green-200',  label: 'Erstellt' },
    loading:    { cls: 'bg-blue-50 text-blue-700 border-blue-200',     label: 'Generiere …' },
    error:      { cls: 'bg-red-50 text-red-700 border-red-200',        label: 'Fehler' },
  }[status];

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${cfg.cls}`}>
      {cfg.label}
    </span>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function NKAPage() {
  const currentYear = new Date().getFullYear();
  const defaultYear = currentYear - 1; // Vorjahr als Standard

  const [year, setYear] = useState<number>(defaultYear);
  const [properties, setProperties] = useState<PropertyRow[]>(DEMO_PROPERTIES);
  const [generationStates, setGenerationStates] = useState<Record<string, GenerationState>>({});
  const [batchRunning, setBatchRunning] = useState(false);

  // Fetch real properties once mounted (falls vorhanden)
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/portal/properties?landlordId=me');
        if (!res.ok) return;
        const data = await res.json();
        if (data?.properties?.length) {
          // Map to PropertyRow format (simplified — real API would include tenants)
          setProperties(data.properties);
        }
      } catch {
        // Fall back to demo data silently
      }
    }
    load();
  }, []);

  // Generate single NKA
  const generateNKA = useCallback(
    async (propertyId: string, tenantId: string, tenantName: string) => {
      const key = `${propertyId}:${tenantId}`;
      setGenerationStates(prev => ({ ...prev, [key]: 'loading' }));

      try {
        const res = await fetch('/api/portal/nka/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ propertyId, tenantId, year }),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error ?? 'Unbekannter Fehler');
        }

        const html = await res.text();
        // Öffne in neuem Tab — Browser kann via Strg+P als PDF speichern
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const win = window.open(url, '_blank');
        if (win) {
          win.addEventListener('load', () => URL.revokeObjectURL(url), { once: true });
        }

        setGenerationStates(prev => ({ ...prev, [key]: 'done' }));

        // Update tenant row status
        setProperties(prev =>
          prev.map(p => ({
            ...p,
            tenants: p.tenants.map(t =>
              t.id === tenantId
                ? { ...t, status: 'erstellt' as const, generatedAt: new Date().toISOString() }
                : t,
            ),
          })),
        );
      } catch (e) {
        console.error('[NKA] Fehler:', e);
        setGenerationStates(prev => ({ ...prev, [key]: 'error' }));
      }
    },
    [year],
  );

  // Alle NKAs generieren (sequenziell, um Server nicht zu überlasten)
  const generateAll = useCallback(async () => {
    setBatchRunning(true);
    for (const prop of properties) {
      for (const tenant of prop.tenants) {
        await generateNKA(prop.id, tenant.id, `${tenant.firstName} ${tenant.lastName}`);
        // Kurze Pause zwischen den Anfragen
        await new Promise(r => setTimeout(r, 300));
      }
    }
    setBatchRunning(false);
  }, [properties, generateNKA]);

  const totalTenants = properties.reduce((s, p) => s + p.tenants.length, 0);
  const doneCount = Object.values(generationStates).filter(s => s === 'done').length;

  return (
          <Sidebar />

      <div className="flex-1">
        <div className="max-w-5xl mx-auto px-8 py-8">

          {/* ── Header ── */}
          <div className="mb-8 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Link href="/portal/abrechnung" className="text-sm text-text-light hover:text-navy transition-colors">
                  Abrechnung
                </Link>
                <span className="text-text-light/50">›</span>
                <span className="text-sm text-navy font-medium">Nebenkostenabrechnung</span>
              </div>
              <h1 className="text-2xl font-bold text-navy">Nebenkostenabrechnung</h1>
              <p className="text-text-light text-sm mt-0.5">
                Betriebskostenabrechnung gemäß §2 BetrKV für alle Mieter erstellen.
              </p>
            </div>

            {/* Jahr-Auswahl + Alle generieren */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <label className="text-sm text-text-light font-medium whitespace-nowrap">
                  Abrechnungsjahr:
                </label>
                <select
                  value={year}
                  onChange={e => setYear(Number(e.target.value))}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-navy bg-white focus:outline-none focus:ring-2 focus:ring-teal/30"
                >
                  {[currentYear - 1, currentYear - 2, currentYear - 3].map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={generateAll}
                disabled={batchRunning}
                className="flex items-center gap-2 px-4 py-2 bg-navy text-white text-sm font-medium rounded-xl hover:bg-navy/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {batchRunning ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Generiere …
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Alle generieren ({totalTenants})
                  </>
                )}
              </button>
            </div>
          </div>

          {/* ── Progress bar (batch) ── */}
          {batchRunning && (
            <div className="mb-6 bg-white rounded-xl border border-gray-100 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-navy">Generierung läuft …</span>
                <span className="text-sm text-text-light">{doneCount} / {totalTenants}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div
                  className="bg-teal h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${totalTenants > 0 ? (doneCount / totalTenants) * 100 : 0}%` }}
                />
              </div>
            </div>
          )}

          {/* ── Hinweis §556 Abs. 3 BGB ── */}
          <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
            <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-amber-800">Abrechnungsfrist beachten (§556 Abs. 3 BGB)</p>
              <p className="text-xs text-amber-700 mt-0.5">
                Die Abrechnung für {year} muss spätestens bis zum{' '}
                <strong>31.12.{year + 1}</strong> beim Mieter eingegangen sein.
                Nach Ablauf der Frist sind Nachforderungen ausgeschlossen.
              </p>
            </div>
          </div>

          {/* ── Eigenschaften ── */}
          <div className="space-y-6">
            {properties.map(prop => (
              <div key={prop.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                {/* Property header */}
                <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
                  <div>
                    <h2 className="font-bold text-navy">{prop.address}</h2>
                    <p className="text-xs text-text-light mt-0.5">
                      {prop.postalCode} {prop.city} · {prop.tenants.length} Mieter
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-text-light">
                      {prop.tenants.filter(t => t.status === 'erstellt').length} / {prop.tenants.length} erstellt
                    </span>
                  </div>
                </div>

                {/* Tenants table */}
                {prop.tenants.length === 0 ? (
                  <div className="px-6 py-10 text-center text-text-light text-sm">
                    Keine Mieter für dieses Objekt erfasst.
                  </div>
                ) : (
                  <table className="w-full">
                    <thead>
                      <tr className="text-xs text-text-light uppercase tracking-wide bg-gray-50/80">
                        <th className="px-6 py-3 text-left">Mieter</th>
                        <th className="px-6 py-3 text-left">Wohneinheit</th>
                        <th className="px-6 py-3 text-left">Fläche</th>
                        <th className="px-6 py-3 text-left">Status</th>
                        <th className="px-6 py-3 text-left">Erstellt am</th>
                        <th className="px-6 py-3 text-right">Aktion</th>
                      </tr>
                    </thead>
                    <tbody>
                      {prop.tenants.map(tenant => {
                        const key = `${prop.id}:${tenant.id}`;
                        const genState = generationStates[key] ?? 'idle';
                        const isLoading = genState === 'loading';
                        const isError = genState === 'error';
                        const displayStatus = isLoading ? 'loading' : isError ? 'error' : tenant.status;

                        return (
                          <tr key={tenant.id} className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors">
                            <td className="px-6 py-4 text-sm font-medium text-navy">
                              {tenant.firstName} {tenant.lastName}
                            </td>
                            <td className="px-6 py-4 text-sm text-text-light">
                              {tenant.unitDesignation}
                            </td>
                            <td className="px-6 py-4 text-sm text-text-light">
                              {tenant.areaM2 != null
                                ? `${Number(tenant.areaM2).toLocaleString('de-DE')} m²`
                                : '—'}
                            </td>
                            <td className="px-6 py-4">
                              <StatusBadge status={displayStatus as 'ausstehend' | 'erstellt' | 'loading' | 'error'} />
                            </td>
                            <td className="px-6 py-4 text-sm text-text-light">
                              {tenant.generatedAt
                                ? new Date(tenant.generatedAt).toLocaleDateString('de-DE')
                                : '—'}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button
                                disabled={isLoading || batchRunning}
                                onClick={() =>
                                  generateNKA(prop.id, tenant.id, `${tenant.firstName} ${tenant.lastName}`)
                                }
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                                  bg-teal/10 text-teal hover:bg-teal/20 transition-colors
                                  disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {isLoading ? (
                                  <>
                                    <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                    </svg>
                                    Generiere …
                                  </>
                                ) : (
                                  <>
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    NKA generieren
                                  </>
                                )}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            ))}
          </div>

          {/* ── Empty state ── */}
          {properties.length === 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 px-8 py-16 text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="font-semibold text-navy mb-1">Keine Objekte vorhanden</h3>
              <p className="text-sm text-text-light">
                Fügen Sie zuerst Objekte und Mieter im Portal hinzu.
              </p>
            </div>
          )}

          {/* ── Info box ── */}
          <div className="mt-8 bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="text-sm font-bold text-navy mb-2">So funktioniert die NKA-Generierung</h3>
            <ol className="text-xs text-text-light space-y-1.5 list-decimal list-inside">
              <li>Wählen Sie das Abrechnungsjahr (Standard: Vorjahr).</li>
              <li>Klicken Sie auf „NKA generieren" – das Dokument öffnet sich in einem neuen Tab.</li>
              <li>Drucken Sie das Dokument (Strg+P / ⌘+P) und wählen Sie „Als PDF speichern".</li>
              <li>Senden Sie die NKA per Post oder E-Mail an den Mieter.</li>
            </ol>
            <p className="text-xs text-text-light mt-3 border-t border-gray-50 pt-3">
              Rechtsgrundlage: §556 BGB (Nebenkostenabrechnung) · §556a BGB (Verteilungsmaßstäbe) · §2 BetrKV (Betriebskosten)
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
