'use client';

/**
 * /portal/nka/neu — Multi-step NKA Creation Wizard
 *
 * Step 1: Property selector + Abrechnungszeitraum
 * Step 2: §2 BetrKV cost entry (19 categories) with live total
 * Step 3: Tenant allocation preview (by Wohnfläche)
 * Step 4: Review + Generate
 * Step 5: Success — download links per tenant
 */

import { useState, useEffect, useCallback, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

// ─── Types ─────────────────────────────────────────────────────────────────

interface PropertyOption {
  id: string;
  address: string;
  postalCode: string;
  city: string;
}

interface TenantAllocation {
  tenantName: string;
  unitDesignation: string;
  areaM2: number;
  sharePercent: number;
  shareAmount: number;
}

interface NkaUrl {
  tenantName: string;
  unitDesignation: string;
  unitId: string;
  url: string;
}

// ─── §2 BetrKV Categories ──────────────────────────────────────────────────

const BETR_KV_CATEGORIES: { key: string; label: string; hint?: string }[] = [
  { key: 'WASSERVERSORGUNG',    label: 'Wasserversorgung',                  hint: '§2 Nr. 2 BetrKV' },
  { key: 'ENTWAESSERUNG',       label: 'Entwässerung',                      hint: '§2 Nr. 3 BetrKV' },
  { key: 'HEIZUNG',             label: 'Heizung',                           hint: '§2 Nr. 4 BetrKV' },
  { key: 'WARMWASSER',          label: 'Warmwasserversorgung',              hint: '§2 Nr. 5 BetrKV' },
  { key: 'AUFZUG',              label: 'Fahrstuhl / Aufzug',                hint: '§2 Nr. 6 BetrKV' },
  { key: 'STRASSENREINIGUNG',   label: 'Straßenreinigung',                  hint: '§2 Nr. 8 BetrKV' },
  { key: 'MUELLBeseITIGUNG',   label: 'Müllabfuhr / Müllbeseitigung',      hint: '§2 Nr. 7 BetrKV' },
  { key: 'HAUSREINIGUNG',       label: 'Hausreinigung',                     hint: '§2 Nr. — BetrKV' },
  { key: 'GARTENPFLEGE',        label: 'Gartenpflege',                      hint: '§2 Nr. 9 BetrKV' },
  { key: 'BELEUCHTUNG',         label: 'Beleuchtung',                       hint: '§2 Nr. 10 BetrKV' },
  { key: 'SCHORNSTEINREINIGUNG', label: 'Schornsteinreinigung',             hint: '§2 Nr. 11 BetrKV' },
  { key: 'VERSICHERUNG',        label: 'Sach-/Haftpflichtversicherung',     hint: '§2 Nr. 12 BetrKV' },
  { key: 'HAUSMEISTER',         label: 'Hauswart / Hausmeister',            hint: '§2 Nr. 13 BetrKV' },
  { key: 'TV_EMPFANG',          label: 'Gemeinschaftsantenne / Kabelfernsehen', hint: '§2 Nr. 17 BetrKV' },
  { key: 'WAESCHE',             label: 'Einrichtungen für die Wäschepflege', hint: '§2 Nr. — BetrKV' },
  { key: 'SONSTIGE_KOSTEN',     label: 'Sonstige Betriebskosten',           hint: '§2 Nr. 19 BetrKV' },
  { key: 'GRUNDSTEUER',         label: 'Grundsteuer',                       hint: '§2 Nr. 1 BetrKV' },
  { key: 'GEBAEUDEVERSICHERUNG', label: 'Gebäudeversicherung',              hint: '§2 Nr. 12 BetrKV' },
  { key: 'HAFTPFLICHTVERSICHERUNG', label: 'Haftpflichtversicherung',       hint: '§2 Nr. 12 BetrKV' },
];

// ─── Helpers ───────────────────────────────────────────────────────────────

function fmt(n: number): string {
  return n.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 });
}

function fmtPct(n: number): string {
  return n.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' %';
}

// ─── Sidebar ───────────────────────────────────────────────────────────────

function Sidebar() {
  return (
    <aside className="w-56 bg-navy min-h-screen flex flex-col fixed left-0 top-0 bottom-0">
      <div className="px-5 py-5 border-b border-white/10">
        <a href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-teal rounded-md flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <span className="text-white text-sm font-bold">
            einfach <span className="text-teal">verwaltet.</span>
          </span>
        </a>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {[
          { label: 'Übersicht',    href: '/portal/dashboard' },
          { label: 'Chat',         href: '/portal/chat' },
          { label: 'Einheiten',    href: '/portal/einheiten' },
          { label: 'Mieter',       href: '/portal/mieter' },
          { label: 'Tickets',      href: '/portal/tickets' },
          { label: 'Partner',      href: '/portal/partner' },
          { label: 'Dokumente',    href: '/portal/dokumente' },
          { label: 'Vertrag',      href: '/portal/vertrag' },
          { label: 'Finanzen',     href: '/portal/finanzen' },
          { label: 'Mieterhöhung', href: '/portal/mieterhohung' },
          { label: 'NKA',          href: '/portal/nka', active: true },
          { label: 'Analysen',     href: '/portal/analytics' },
          { label: 'DATEV Export', href: '/portal/datev' },
        ].map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors
              ${'active' in item && item.active
                ? 'bg-teal/20 text-teal font-medium'
                : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="px-4 py-4 border-t border-white/10 space-y-2">
        <a href="/api/portal/auth/logout" className="block text-white/40 hover:text-white/70 text-xs transition-colors">
          Abmelden
        </a>
        <p className="text-white/30 text-xs">einfach verwaltet. v1</p>
      </div>
    </aside>
  );
}

// ─── Step Indicator ────────────────────────────────────────────────────────

function StepIndicator({ current, total }: { current: number; total: number }) {
  const steps = [
    'Objekt',
    'Kosten',
    'Mieter',
    'Prüfen',
    'Fertig',
  ];
  return (
    <div className="flex items-center gap-1 mb-8">
      {steps.map((label, i) => {
        const stepNum = i + 1;
        const isActive = stepNum === current;
        const isDone = stepNum < current;
        return (
          <div key={stepNum} className="flex items-center">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all
              ${isActive ? 'bg-teal text-white' : isDone ? 'bg-teal/20 text-teal' : 'bg-gray-100 text-text-light'}`}
            >
              {isDone ? (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <span>{stepNum}</span>
              )}
              <span>{label}</span>
            </div>
            {stepNum < total && (
              <div className={`w-6 h-px mx-1 ${isDone ? 'bg-teal/40' : 'bg-gray-200'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Main Wizard Component ─────────────────────────────────────────────────

function NkaWizardContent() {
  const searchParams = useSearchParams();
  const preselectedPropertyId = searchParams.get('propertyId') ?? '';

  const currentYear = new Date().getFullYear();
  const lastYear = currentYear - 1;

  // ── State ──
  const [step, setStep] = useState(1);
  const [properties, setProperties] = useState<PropertyOption[]>([]);
  const [loadingProps, setLoadingProps] = useState(true);

  // Step 1
  const [selectedPropertyId, setSelectedPropertyId] = useState(preselectedPropertyId);
  const [startDate, setStartDate] = useState(`01.01.${lastYear}`);
  const [endDate, setEndDate] = useState(`31.12.${lastYear}`);
  const [abrechnungsjahr, setAbrechnungsjahr] = useState(lastYear);

  // Step 2
  const [costs, setCosts] = useState<Record<string, string>>({});

  // Step 3
  const [allocations, setAllocations] = useState<TenantAllocation[]>([]);
  const [loadingAllocations, setLoadingAllocations] = useState(false);

  // Step 4/5
  const [generating, setGenerating] = useState(false);
  const [nkaUrls, setNkaUrls] = useState<NkaUrl[]>([]);
  const [generationError, setGenerationError] = useState('');
  const [recordId, setRecordId] = useState('');

  // ── Load properties ──
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/portal/nka?landlordId=me');
        if (res.ok) {
          const data = await res.json();
          setProperties(data.properties ?? []);
          if (!selectedPropertyId && data.properties?.length > 0) {
            setSelectedPropertyId(data.properties[0].id);
          }
        }
      } catch {
        // Use demo fallback
        setProperties([
          { id: 'demo-prop-1', address: 'Musterstraße 7', postalCode: '20099', city: 'Hamburg' },
          { id: 'demo-prop-2', address: 'Alsterblick 5', postalCode: '22303', city: 'Hamburg' },
        ]);
        if (!selectedPropertyId) setSelectedPropertyId('demo-prop-1');
      } finally {
        setLoadingProps(false);
      }
    }
    load();
  }, []);

  // ── Compute total costs ──
  const totalCosts = Object.values(costs).reduce((sum, v) => {
    const n = parseFloat(v.replace(',', '.'));
    return sum + (isNaN(n) ? 0 : n);
  }, 0);

  // ── Load tenant allocations (Step 3) ──
  const loadAllocations = useCallback(async () => {
    setLoadingAllocations(true);
    try {
      // Use units API (has areaM2) — join with tenant names
      const [unitsRes, tenantsRes] = await Promise.all([
        fetch(`/api/portal/units?propertyId=${selectedPropertyId}`),
        fetch(`/api/portal/tenants?propertyId=${selectedPropertyId}`),
      ]);

      if (unitsRes.ok) {
        const unitsData = await unitsRes.json();
        const unitList: Array<{ id: string; designation: string; areaM2?: number | string | null; tenantName?: string | null }> = unitsData.data ?? [];

        // Merge tenant names
        let tenantMap: Record<string, string> = {};
        if (tenantsRes.ok) {
          const tenantsData = await tenantsRes.json();
          const tenantList: Array<{ unitId: string; firstName: string; lastName: string }> = tenantsData.data ?? [];
          tenantMap = Object.fromEntries(tenantList.map(t => [t.unitId, `${t.firstName} ${t.lastName}`]));
        }

        const totalArea = unitList.reduce((s, u) => s + (Number(u.areaM2) || 0), 0);
        const allocList: TenantAllocation[] = unitList
          .filter(u => Number(u.areaM2) > 0)
          .map(u => {
            const area = Number(u.areaM2) || 0;
            const pct = totalArea > 0 ? (area / totalArea) * 100 : 0;
            const tenantName = tenantMap[u.id] ?? u.tenantName ?? 'Leerstand';
            return {
              tenantName,
              unitDesignation: u.designation,
              areaM2: area,
              sharePercent: pct,
              shareAmount: (pct / 100) * totalCosts,
            };
          });
        setAllocations(allocList);
        return;
      }
      throw new Error('API error');
    } catch {
      // Demo fallback
      const demoTenants = [
        { name: 'Maria Bergmann', unit: 'EG links', area: 72.5 },
        { name: 'Hans Fischer',   unit: 'EG rechts', area: 65.0 },
        { name: 'Lena Hoffmann',  unit: '1. OG Mitte', area: 88.0 },
      ];
      const totalArea = demoTenants.reduce((s, t) => s + t.area, 0);
      setAllocations(demoTenants.map(t => ({
        tenantName: t.name,
        unitDesignation: t.unit,
        areaM2: t.area,
        sharePercent: (t.area / totalArea) * 100,
        shareAmount: (t.area / totalArea) * totalCosts,
      })));
    } finally {
      setLoadingAllocations(false);
    }
  }, [selectedPropertyId, totalCosts]);

  // ── Generate NKAs ──
  const handleGenerate = useCallback(async () => {
    setGenerating(true);
    setGenerationError('');
    try {
      const numericCosts: Record<string, number> = {};
      for (const [k, v] of Object.entries(costs)) {
        const n = parseFloat(v.replace(',', '.'));
        if (!isNaN(n) && n > 0) numericCosts[k] = n;
      }

      const res = await fetch('/api/portal/nka/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyId: selectedPropertyId,
          year: abrechnungsjahr,
          costs: numericCosts,
          mode: 'wizard',
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? 'Unbekannter Fehler');
      }

      const result = await res.json();
      setNkaUrls(result.nkaUrls ?? []);
      setRecordId(result.recordId ?? '');
      setStep(5);
    } catch (e) {
      setGenerationError(e instanceof Error ? e.message : 'Fehler beim Generieren');
    } finally {
      setGenerating(false);
    }
  }, [costs, selectedPropertyId, abrechnungsjahr]);

  const selectedProperty = properties.find(p => p.id === selectedPropertyId);

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-light-gray flex">
      <Sidebar />

      <div className="flex-1 ml-56">
        <div className="max-w-3xl mx-auto px-8 py-8">

          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              <Link href="/portal/nka" className="text-sm text-text-light hover:text-navy transition-colors">
                NKA
              </Link>
              <span className="text-text-light/50">›</span>
              <span className="text-sm text-navy font-medium">Neue NKA erstellen</span>
            </div>
            <h1 className="text-2xl font-bold text-navy">NKA-Assistent</h1>
            <p className="text-text-light text-sm mt-0.5">
              Erstellen Sie eine gesetzeskonforme Nebenkostenabrechnung in 5 Schritten.
            </p>
          </div>

          <StepIndicator current={step} total={5} />

          {/* ── STEP 1: Property + Zeitraum ── */}
          {step === 1 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-8">
              <h2 className="text-lg font-bold text-navy mb-6">Schritt 1: Objekt & Abrechnungszeitraum</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    Objekt auswählen <span className="text-red-500">*</span>
                  </label>
                  {loadingProps ? (
                    <div className="h-10 bg-gray-100 rounded-lg animate-pulse" />
                  ) : (
                    <select
                      value={selectedPropertyId}
                      onChange={e => setSelectedPropertyId(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-teal/30"
                    >
                      <option value="">— Objekt wählen —</option>
                      {properties.map(p => (
                        <option key={p.id} value={p.id}>
                          {p.address}, {p.postalCode} {p.city}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    Abrechnungsjahr
                  </label>
                  <select
                    value={abrechnungsjahr}
                    onChange={e => {
                      const y = Number(e.target.value);
                      setAbrechnungsjahr(y);
                      setStartDate(`01.01.${y}`);
                      setEndDate(`31.12.${y}`);
                    }}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-teal/30"
                  >
                    {[lastYear, lastYear - 1, lastYear - 2].map(y => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">Beginn</label>
                    <input
                      type="text"
                      value={startDate}
                      onChange={e => setStartDate(e.target.value)}
                      placeholder="01.01.2024"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-teal/30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">Ende</label>
                    <input
                      type="text"
                      value={endDate}
                      onChange={e => setEndDate(e.target.value)}
                      placeholder="31.12.2024"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-teal/30"
                    />
                  </div>
                </div>

                <div className="bg-teal/5 border border-teal/20 rounded-lg p-4 text-xs text-text-light">
                  <strong className="text-navy">Hinweis:</strong> Standardmäßig wird das Vorjahr als Abrechnungszeitraum vorbelegt
                  (§556 Abs. 3 BGB — Frist 12 Monate nach Jahresende).
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  disabled={!selectedPropertyId}
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 bg-teal text-white text-sm font-semibold rounded-xl hover:bg-teal/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Weiter: Kosten eingeben →
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 2: Cost Entry ── */}
          {step === 2 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-navy">Schritt 2: Betriebskosten eingeben</h2>
                  <p className="text-xs text-text-light mt-0.5">
                    {selectedProperty?.address} · Abrechnungsjahr {abrechnungsjahr}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-text-light">Gesamtkosten</p>
                  <p className="text-2xl font-bold text-teal">{fmt(totalCosts)}</p>
                </div>
              </div>

              <div className="space-y-3">
                {BETR_KV_CATEGORIES.map(cat => (
                  <div key={cat.key} className="flex items-center gap-4">
                    <div className="flex-1">
                      <label className="text-sm text-navy font-medium">{cat.label}</label>
                      {cat.hint && <p className="text-xs text-text-light/70">{cat.hint}</p>}
                    </div>
                    <div className="relative w-36">
                      <input
                        type="text"
                        value={costs[cat.key] ?? ''}
                        onChange={e => setCosts(prev => ({ ...prev, [cat.key]: e.target.value }))}
                        placeholder="0,00"
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-navy text-right focus:outline-none focus:ring-2 focus:ring-teal/30 pr-8"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-text-light">€</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Live total bar */}
              <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between">
                <span className="text-sm font-medium text-navy">Gesamtkosten (§2 BetrKV)</span>
                <span className="text-xl font-bold text-teal">{fmt(totalCosts)}</span>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 text-sm font-medium text-text-light hover:text-navy transition-colors"
                >
                  ← Zurück
                </button>
                <button
                  disabled={totalCosts === 0}
                  onClick={() => { setStep(3); loadAllocations(); }}
                  className="px-6 py-2.5 bg-teal text-white text-sm font-semibold rounded-xl hover:bg-teal/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"

                >
                  Weiter: Mieteranteile →
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 3: Tenant Allocation Preview ── */}
          {step === 3 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-8">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-navy">Schritt 3: Mieteranteile (Vorschau)</h2>
                <p className="text-xs text-text-light mt-0.5">
                  Verteilung nach Wohnfläche gemäß §556a BGB · Gesamtkosten: {fmt(totalCosts)}
                </p>
              </div>

              {loadingAllocations ? (
                <div className="space-y-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="h-12 bg-gray-100 rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : allocations.length === 0 ? (
                <div className="text-center py-10 text-text-light text-sm">
                  Keine Mieter für dieses Objekt gefunden.
                </div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="text-xs text-text-light uppercase tracking-wide bg-gray-50/80">
                      <th className="py-3 text-left">Mieter</th>
                      <th className="py-3 text-left">Einheit</th>
                      <th className="py-3 text-right">Fläche</th>
                      <th className="py-3 text-right">Anteil</th>
                      <th className="py-3 text-right">Betrag</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allocations.map((a, i) => (
                      <tr key={i} className="border-t border-gray-50">
                        <td className="py-3 text-sm font-medium text-navy">{a.tenantName}</td>
                        <td className="py-3 text-sm text-text-light">{a.unitDesignation}</td>
                        <td className="py-3 text-sm text-text-light text-right">
                          {a.areaM2.toLocaleString('de-DE')} m²
                        </td>
                        <td className="py-3 text-sm text-text-light text-right">{fmtPct(a.sharePercent)}</td>
                        <td className="py-3 text-sm font-semibold text-navy text-right">{fmt(a.shareAmount)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t border-gray-200">
                      <td colSpan={4} className="py-3 text-sm font-bold text-navy">Gesamt</td>
                      <td className="py-3 text-sm font-bold text-teal text-right">{fmt(totalCosts)}</td>
                    </tr>
                  </tfoot>
                </table>
              )}

              <div className="mt-6 bg-teal/5 border border-teal/20 rounded-lg p-4 text-xs text-text-light">
                <strong className="text-navy">Verteilungsschlüssel:</strong> Wohnfläche (§556a Abs. 1 BGB).
                Vorauszahlungen werden bei der finalen PDF-Generierung pro Mieter berücksichtigt.
              </div>

              <div className="mt-8 flex items-center justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 text-sm font-medium text-text-light hover:text-navy transition-colors"
                >
                  ← Zurück
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="px-6 py-2.5 bg-teal text-white text-sm font-semibold rounded-xl hover:bg-teal/90 transition-colors"
                >
                  Weiter: Prüfen & Generieren →
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 4: Review + Generate ── */}
          {step === 4 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-8">
              <h2 className="text-lg font-bold text-navy mb-6">Schritt 4: Prüfen & Generieren</h2>

              {/* Summary */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-text-light">Objekt</span>
                  <span className="text-sm font-medium text-navy">
                    {selectedProperty?.address}, {selectedProperty?.postalCode} {selectedProperty?.city}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-text-light">Abrechnungszeitraum</span>
                  <span className="text-sm font-medium text-navy">{startDate} – {endDate}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-text-light">Abrechnungsjahr</span>
                  <span className="text-sm font-medium text-navy">{abrechnungsjahr}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-text-light">Frist (§556 Abs. 3 BGB)</span>
                  <span className="text-sm font-medium text-navy">31.12.{abrechnungsjahr + 1}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-text-light">Mieter</span>
                  <span className="text-sm font-medium text-navy">{allocations.length} Mieter</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-sm font-semibold text-navy">Gesamte Betriebskosten</span>
                  <span className="text-lg font-bold text-teal">{fmt(totalCosts)}</span>
                </div>
              </div>

              {/* Cost breakdown */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <p className="text-xs font-semibold text-text-light uppercase tracking-wide mb-3">Kostenaufstellung</p>
                <div className="space-y-1.5">
                  {BETR_KV_CATEGORIES.filter(c => {
                    const v = parseFloat((costs[c.key] ?? '0').replace(',', '.'));
                    return !isNaN(v) && v > 0;
                  }).map(cat => (
                    <div key={cat.key} className="flex items-center justify-between text-sm">
                      <span className="text-text-light">{cat.label}</span>
                      <span className="font-medium text-navy">
                        {fmt(parseFloat((costs[cat.key] ?? '0').replace(',', '.')))}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {generationError && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
                  <strong>Fehler:</strong> {generationError}
                </div>
              )}

              <div className="mt-8 flex items-center justify-between">
                <button
                  onClick={() => setStep(3)}
                  disabled={generating}
                  className="px-4 py-2.5 text-sm font-medium text-text-light hover:text-navy transition-colors disabled:opacity-50"
                >
                  ← Zurück
                </button>
                <button
                  onClick={handleGenerate}
                  disabled={generating || totalCosts === 0}
                  className="flex items-center gap-2 px-6 py-2.5 bg-navy text-white text-sm font-semibold rounded-xl hover:bg-navy/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {generating ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Generiere PDFs …
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Alle PDFs generieren ({allocations.length})
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 5: Success ── */}
          {step === 5 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-8">
              {/* Success header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-navy">NKA erfolgreich erstellt!</h2>
                <p className="text-text-light text-sm mt-1">
                  {nkaUrls.length} Nebenkostenabrechnung(en) für das Abrechnungsjahr {abrechnungsjahr} generiert.
                </p>
              </div>

              {/* Download links */}
              <div className="space-y-3 mb-8">
                <p className="text-xs font-semibold text-text-light uppercase tracking-wide">Download je Mieter</p>
                {nkaUrls.map((nka, i) => (
                  <div key={i} className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="text-sm font-medium text-navy">{nka.tenantName}</p>
                      <p className="text-xs text-text-light">{nka.unitDesignation}</p>
                    </div>
                    <a
                      href={nka.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-teal text-white text-xs font-medium rounded-lg hover:bg-teal/90 transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      PDF öffnen
                    </a>
                  </div>
                ))}

                {/* Demo fallback if no URLs */}
                {nkaUrls.length === 0 && (
                  <div className="text-center py-6 text-text-light text-sm">
                    Im Demo-Modus werden keine echten PDFs generiert.
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                <Link
                  href="/portal/nka"
                  className="px-4 py-2.5 text-sm font-medium text-text-light hover:text-navy transition-colors"
                >
                  ← Zur NKA-Übersicht
                </Link>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setStep(1);
                      setCosts({});
                      setNkaUrls([]);
                      setGenerationError('');
                    }}
                    className="px-4 py-2.5 border border-gray-200 text-sm font-medium text-navy rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Neue NKA erstellen
                  </button>
                  {recordId && (
                    <a
                      href={`/api/portal/nka/${recordId}/pdf`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 bg-navy text-white text-sm font-semibold rounded-xl hover:bg-navy/90 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Alle herunterladen
                    </a>
                  )}
                </div>
              </div>

              {/* Legal reminder */}
              <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4 text-xs text-amber-700">
                <strong>Wichtig:</strong> Senden Sie die NKA per Post oder nachweisbarer E-Mail an den Mieter.
                Die Abrechnungsfrist nach §556 Abs. 3 BGB gilt ab Zugang beim Mieter, nicht ab Erstellung.
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

// ─── Page Export (with Suspense for useSearchParams) ─────────────────────────

export default function NkaWizardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-light-gray flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-teal border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <NkaWizardContent />
    </Suspense>
  );
}
