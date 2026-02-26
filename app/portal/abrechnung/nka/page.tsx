'use client';

import { useState } from 'react';

/**
 * Nebenkostenabrechnung Generator — Portal Page
 * /portal/abrechnung/nka
 * 
 * Allows landlords to generate NKA documents for their properties.
 * Uses the NKA PDF generator API route.
 */

// Demo properties for MVP
const DEMO_PROPERTIES = [
  {
    id: 'demo-1',
    address: 'Musterstraße 7',
    city: 'Hamburg',
    units: [
      { id: 'u1', designation: 'EG links', tenant: 'Familie Schmidt', area: 72.5 },
      { id: 'u2', designation: 'EG rechts', tenant: 'Herr Müller', area: 58.0 },
      { id: 'u3', designation: '1. OG links', tenant: 'Frau Weber', area: 85.3 },
      { id: 'u4', designation: '1. OG rechts', tenant: 'Herr & Frau Chen', area: 65.0 },
    ],
  },
  {
    id: 'demo-2',
    address: 'Eppendorfer Weg 42',
    city: 'Hamburg',
    units: [
      { id: 'u5', designation: 'EG', tenant: 'Herr Becker', area: 55.0 },
      { id: 'u6', designation: '1. OG', tenant: 'Frau Hansen', area: 68.0 },
      { id: 'u7', designation: '2. OG', tenant: 'Familie Yılmaz', area: 68.0 },
    ],
  },
];

export default function NKAGeneratorPage() {
  const [selectedProperty, setSelectedProperty] = useState('');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear() - 1);
  const [generating, setGenerating] = useState<string | null>(null);
  const [generatedDocs, setGeneratedDocs] = useState<Record<string, boolean>>({});

  const property = DEMO_PROPERTIES.find((p) => p.id === selectedProperty);

  async function handleGenerateNKA(tenantId: string, tenantName: string) {
    setGenerating(tenantId);
    try {
      const res = await fetch('/api/portal/nka/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyId: selectedProperty,
          tenantId,
          year: selectedYear,
        }),
      });

      if (!res.ok) throw new Error('Fehler bei der Erstellung');

      const html = await res.text();
      // Open in new tab for print-to-PDF
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');

      setGeneratedDocs((prev) => ({ ...prev, [tenantId]: true }));
    } catch (err) {
      alert('Fehler: ' + (err instanceof Error ? err.message : 'Unbekannter Fehler'));
    } finally {
      setGenerating(null);
    }
  }

  async function handleGenerateAll() {
    if (!property) return;
    for (const unit of property.units) {
      await handleGenerateNKA(unit.id, unit.tenant);
    }
  }

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 1 - i);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#0a3d62] text-white px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <nav className="text-sm mb-3 text-white/60">
            <a href="/portal/dashboard" className="hover:text-white">Dashboard</a>
            <span className="mx-2">›</span>
            <a href="/portal/abrechnung" className="hover:text-white">Abrechnung</a>
            <span className="mx-2">›</span>
            <span className="text-white">Nebenkostenabrechnung</span>
          </nav>
          <h1 className="text-2xl font-bold">Nebenkostenabrechnung erstellen</h1>
          <p className="text-white/80 mt-1">
            Erstellen Sie rechtskonforme Nebenkostenabrechnungen gemäß §556 BGB
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Step 1: Select property + year */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            1. Objekt und Abrechnungsjahr auswählen
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Objekt
              </label>
              <select
                value={selectedProperty}
                onChange={(e) => {
                  setSelectedProperty(e.target.value);
                  setGeneratedDocs({});
                }}
                className="w-full border rounded-lg px-3 py-2.5 text-gray-800 bg-white focus:ring-2 focus:ring-[#0a3d62] focus:border-[#0a3d62] outline-none"
              >
                <option value="">Objekt auswählen...</option>
                {DEMO_PROPERTIES.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.address}, {p.city} — {p.units.length} Einheiten
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Abrechnungsjahr
              </label>
              <select
                value={selectedYear}
                onChange={(e) => {
                  setSelectedYear(parseInt(e.target.value));
                  setGeneratedDocs({});
                }}
                className="w-full border rounded-lg px-3 py-2.5 text-gray-800 bg-white focus:ring-2 focus:ring-[#0a3d62] focus:border-[#0a3d62] outline-none"
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Step 2: Unit list with generate buttons */}
        {property && (
          <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                2. Abrechnungen erstellen — {property.address}
              </h2>
              <button
                onClick={handleGenerateAll}
                disabled={generating !== null}
                className="bg-[#0a3d62] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0a3d62]/90 disabled:opacity-50 transition"
              >
                Alle generieren
              </button>
            </div>

            {/* Info banner */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 text-sm text-blue-800">
              <strong>Hinweis:</strong> Die Abrechnung wird als druckbare HTML-Seite geöffnet.
              Nutzen Sie <kbd className="bg-white px-1.5 py-0.5 rounded border text-xs">Strg+P</kbd> (oder <kbd className="bg-white px-1.5 py-0.5 rounded border text-xs">⌘+P</kbd>) um als PDF zu speichern.
            </div>

            <div className="divide-y">
              {property.units.map((unit) => (
                <div
                  key={unit.id}
                  className="flex items-center justify-between py-4"
                >
                  <div>
                    <div className="font-medium text-gray-800">
                      {unit.tenant}
                    </div>
                    <div className="text-sm text-gray-500">
                      {unit.designation} · {unit.area} m²
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {generatedDocs[unit.id] && (
                      <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Erstellt
                      </span>
                    )}
                    <button
                      onClick={() => handleGenerateNKA(unit.id, unit.tenant)}
                      disabled={generating !== null}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                        generating === unit.id
                          ? 'bg-gray-200 text-gray-500'
                          : 'bg-teal-600 text-white hover:bg-teal-700'
                      }`}
                    >
                      {generating === unit.id ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Wird erstellt...
                        </span>
                      ) : (
                        'NKA generieren'
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Deadline info */}
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
              <strong>§556 Abs. 3 BGB Frist:</strong> Die Abrechnung für {selectedYear} muss dem Mieter
              bis spätestens {new Date(selectedYear + 2, 0, 1).toLocaleDateString('de-DE')} zugegangen sein.
              Danach kann keine Nachforderung mehr geltend gemacht werden.
            </div>
          </div>
        )}

        {/* Step 3: History (placeholder) */}
        {property && (
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              3. Erstellte Abrechnungen
            </h2>
            {Object.keys(generatedDocs).length === 0 ? (
              <p className="text-gray-500 text-sm">
                Noch keine Abrechnungen erstellt. Wählen Sie oben einen Mieter oder klicken Sie auf &ldquo;Alle generieren&rdquo;.
              </p>
            ) : (
              <div className="text-sm text-gray-600">
                <p>
                  {Object.keys(generatedDocs).length} von {property.units.length} Abrechnungen
                  für {selectedYear} erstellt.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Back link */}
        <div className="mt-6">
          <a
            href="/portal/abrechnung"
            className="text-[#0a3d62] hover:underline text-sm"
          >
            ← Zurück zur Abrechnungsübersicht
          </a>
        </div>
      </div>
    </div>
  );
}
