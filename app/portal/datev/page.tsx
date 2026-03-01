"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface DatevRow {
  umsatz: number;
  sollHaben: "S" | "H";
  konto: string;
  gegenkonto: string;
  belegdatum: string;
  belegfeld1: string;
  buchungstext: string;
}

interface PreviewResult {
  transactionCount: number;
  totalIncome: number;
  totalExpenses: number;
  rows: DatevRow[];
}

const MONTHS = [
  "Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember",
];

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = [CURRENT_YEAR - 2, CURRENT_YEAR - 1, CURRENT_YEAR];

function formatCents(cents: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}

// Demo DATEV data for public demo mode
const DEMO_DATEV_PREVIEW: PreviewResult = {
  transactionCount: 14,
  totalIncome: 1247500,
  totalExpenses: 183200,
  rows: [
    { umsatz: 85000, sollHaben: "H", konto: "8400", gegenkonto: "1200", belegdatum: "0102", belegfeld1: "MR-2026-001", buchungstext: "Miete Feb — M. Schmidt Whg. 1" },
    { umsatz: 92000, sollHaben: "H", konto: "8400", gegenkonto: "1200", belegdatum: "0102", belegfeld1: "MR-2026-002", buchungstext: "Miete Feb — T. Müller Whg. 2" },
    { umsatz: 78500, sollHaben: "H", konto: "8400", gegenkonto: "1200", belegdatum: "0302", belegfeld1: "MR-2026-003", buchungstext: "Miete Feb — A. Weber Whg. 3" },
    { umsatz: 110000, sollHaben: "H", konto: "8400", gegenkonto: "1200", belegdatum: "0302", belegfeld1: "MR-2026-004", buchungstext: "Miete Feb — K. Fischer Whg. 4" },
    { umsatz: 95000, sollHaben: "H", konto: "8400", gegenkonto: "1200", belegdatum: "0402", belegfeld1: "MR-2026-005", buchungstext: "Miete Feb — S. Bauer Whg. 5" },
    { umsatz: 880000, sollHaben: "H", konto: "8400", gegenkonto: "1200", belegdatum: "0502", belegfeld1: "MR-2026-NKV", buchungstext: "Nebenkostenvorauszahlung — 9 Einheiten" },
    { umsatz: 45000, sollHaben: "S", konto: "4130", gegenkonto: "3300", belegdatum: "1002", belegfeld1: "RG-2026-021", buchungstext: "Heizungswartung — Techniker GmbH" },
    { umsatz: 28500, sollHaben: "S", konto: "4000", gegenkonto: "3300", belegdatum: "1202", belegfeld1: "RG-2026-022", buchungstext: "Hausmeisterservice Februar" },
    { umsatz: 19800, sollHaben: "S", konto: "4130", gegenkonto: "3300", belegdatum: "1502", belegfeld1: "RG-2026-023", buchungstext: "Treppenhausreinigung Feb" },
    { umsatz: 32500, sollHaben: "S", konto: "4130", gegenkonto: "3300", belegdatum: "1802", belegfeld1: "RG-2026-024", buchungstext: "Reparatur Briefkasten — Handwerker" },
    { umsatz: 12000, sollHaben: "S", konto: "4000", gegenkonto: "3300", belegdatum: "2002", belegfeld1: "RG-2026-025", buchungstext: "Versicherungsanteil Februar" },
    { umsatz: 25400, sollHaben: "S", konto: "4000", gegenkonto: "3300", belegdatum: "2202", belegfeld1: "RG-2026-026", buchungstext: "Grundsteuer Vorauszahlung Q1" },
    { umsatz: 10000, sollHaben: "S", konto: "4130", gegenkonto: "3300", belegdatum: "2502", belegfeld1: "RG-2026-027", buchungstext: "Kleinreparatur Heizung Whg. 3" },
    { umsatz: 10000, sollHaben: "S", konto: "4000", gegenkonto: "3300", belegdatum: "2802", belegfeld1: "RG-2026-028", buchungstext: "Verwaltungsgebühr Februar" },
  ],
};

export default function DatevPage() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); // 0-indexed
  const [selectedYear, setSelectedYear] = useState(CURRENT_YEAR);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [preview, setPreview] = useState<PreviewResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDemo, setIsDemo] = useState(false);

  // Detect demo mode from cookie
  useEffect(() => {
    const hasDemoCookie = document.cookie.includes("ev-demo-session");
    setIsDemo(hasDemoCookie);
  }, []);

  function getDateRange() {
    const from = new Date(selectedYear, selectedMonth, 1);
    const to = new Date(selectedYear, selectedMonth + 1, 0); // Last day of month
    return {
      from: from.toISOString().split("T")[0],
      to: to.toISOString().split("T")[0],
    };
  }

  async function handlePreview() {
    // Demo mode: use hardcoded demo data
    if (isDemo) {
      setLoading(true);
      setError(null);
      await new Promise((r) => setTimeout(r, 600)); // simulate loading
      setPreview(DEMO_DATEV_PREVIEW);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    setPreview(null);

    const { from, to } = getDateRange();

    try {
      const res = await fetch("/portal/api/datev/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from, to }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Vorschau fehlgeschlagen");
      }

      const data = await res.json();
      setPreview(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unbekannter Fehler");
    } finally {
      setLoading(false);
    }
  }

  async function handleExport() {
    // Demo mode: generate a sample CSV download
    if (isDemo) {
      setExporting(true);
      await new Promise((r) => setTimeout(r, 800));
      const csvLines = [
        "\uFEFF\"EXTF\";700;21;\"Buchungsstapel\";7;\"20260227\";;\"\";1;\"20260227\";\"20260201\";\"20260228\";\"00000\";\"00001\";4;\"EUR\"",
        "\"Umsatz (ohne Soll/Haben-Kz)\";\"Soll/Haben-Kennzeichen\";\"WKZ Umsatz\";\"Kurs\";\"Basis-Umsatz\";\"WKZ Basis-Umsatz\";\"Konto\";\"Gegenkonto (ohne BU-Schlüssel)\";\"BU-Schlüssel\";\"Belegdatum\";\"Belegfeld 1\";\"Belegfeld 2\";\"Skonto\";\"Buchungstext\";",
        ...DEMO_DATEV_PREVIEW.rows.map(r =>
          `"${(r.umsatz / 100).toFixed(2).replace(".", ",")}";\"${r.sollHaben}\";\"EUR\";\"\";\"\";\"\";\"${r.konto}\";\"${r.gegenkonto}\";\"\";\"${r.belegdatum}\";\"${r.belegfeld1}\";\"\";\"\";\"`+r.buchungstext+`\";`
        )
      ].join("\r\n");
      const blob = new Blob([csvLines], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `DATEV_Buchungsjournal_Demo_${selectedYear}-${String(selectedMonth + 1).padStart(2, "0")}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setExporting(false);
      return;
    }

    setExporting(true);
    setError(null);

    const { from, to } = getDateRange();

    try {
      const res = await fetch(
        `/portal/api/datev/export?from=${from}&to=${to}`,
        { method: "GET" }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Export fehlgeschlagen");
      }

      // Trigger download
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `DATEV_Buchungsjournal_${selectedYear}-${String(selectedMonth + 1).padStart(2, "0")}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Export fehlgeschlagen");
    } finally {
      setExporting(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50 flex-col">
      {/* Demo Banner */}
      {isDemo && (
        <div className="w-full bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-center justify-center gap-2 text-sm text-amber-800 z-50">
          <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-700 px-2.5 py-0.5 rounded-full text-xs font-medium">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
            Demo-Modus
          </span>
          <span>Sie sehen Beispieldaten. DATEV-Export zeigt eine Muster-CSV.</span>
          <a href="/anfrage" className="ml-2 text-amber-900 underline hover:no-underline font-medium">Jetzt anfragen →</a>
        </div>
      )}
      {/* Sidebar */}

      {/* Main content */}
      <div className="flex-1">
        <div className="max-w-4xl mx-auto px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-navy">DATEV Export</h1>
            <p className="text-text-light text-sm mt-0.5">
              Buchungsjournal für Ihren Steuerberater exportieren (DATEV-Format v700)
            </p>
          </div>

          {/* Date range selector */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
            <h2 className="text-base font-semibold text-navy mb-4">Zeitraum auswählen</h2>
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="block text-xs font-medium text-text-light mb-1">Monat</label>
                <select
                  value={selectedMonth}
                  onChange={(e) => {
                    setSelectedMonth(Number(e.target.value));
                    setPreview(null);
                  }}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-teal/30"
                >
                  {MONTHS.map((m, i) => (
                    <option key={i} value={i}>{m}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium text-text-light mb-1">Jahr</label>
                <select
                  value={selectedYear}
                  onChange={(e) => {
                    setSelectedYear(Number(e.target.value));
                    setPreview(null);
                  }}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-teal/30"
                >
                  {YEARS.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={handlePreview}
                disabled={loading}
                className="px-5 py-2.5 bg-navy text-white text-sm rounded-lg hover:bg-navy/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Lade..." : "Vorschau"}
              </button>
              <button
                onClick={handleExport}
                disabled={exporting}
                className="px-5 py-2.5 bg-teal text-white text-sm rounded-lg hover:bg-teal/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {exporting ? "Exportiere..." : "DATEV CSV exportieren"}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-6">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Summary cards */}
          {preview && (
            <>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-xl border border-gray-100 p-4">
                  <p className="text-xs text-text-light mb-1">Buchungen gesamt</p>
                  <p className="text-2xl font-bold text-navy">{preview.transactionCount}</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 p-4">
                  <p className="text-xs text-text-light mb-1">Einnahmen</p>
                  <p className="text-2xl font-bold text-green-600">{formatCents(preview.totalIncome)}</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 p-4">
                  <p className="text-xs text-text-light mb-1">Ausgaben</p>
                  <p className="text-2xl font-bold text-red-500">{formatCents(preview.totalExpenses)}</p>
                </div>
              </div>

              {/* Transaction preview table */}
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h2 className="text-base font-semibold text-navy">
                    Buchungsvorschau — {MONTHS[selectedMonth]} {selectedYear}
                  </h2>
                </div>
                {preview.rows.length === 0 ? (
                  <div className="px-6 py-12 text-center">
                    <p className="text-text-light text-sm">Keine Buchungen im gewählten Zeitraum.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-text-light">Datum</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-text-light">Konto</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-text-light">Gegenkonto</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-text-light">S/H</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-text-light">Betrag</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-text-light">Buchungstext</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-text-light">Belegnr.</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {preview.rows.map((row, i) => (
                          <tr key={i} className="hover:bg-gray-50/50">
                            <td className="px-4 py-3 font-mono text-xs text-text-light">
                              {row.belegdatum.substring(0, 2)}.{row.belegdatum.substring(2, 4)}
                            </td>
                            <td className="px-4 py-3 font-mono text-xs font-medium">{row.konto}</td>
                            <td className="px-4 py-3 font-mono text-xs text-text-light">{row.gegenkonto}</td>
                            <td className="px-4 py-3">
                              <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${row.sollHaben === "H" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                {row.sollHaben}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right font-medium">
                              {new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(row.umsatz)}
                            </td>
                            <td className="px-4 py-3 text-text-light max-w-[200px] truncate" title={row.buchungstext}>
                              {row.buchungstext}
                            </td>
                            <td className="px-4 py-3 font-mono text-xs text-text-light">{row.belegfeld1}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Info box */}
          <div className="mt-6 bg-blue-50 border border-blue-100 rounded-lg px-5 py-4">
            <h3 className="text-sm font-medium text-blue-800 mb-2">DATEV-Format Informationen</h3>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• Format: DATEV Buchungsstapel v700 (EXTF-Format, Feldkatalog §§ 20-22)</li>
              <li>• Kontenrahmen: SKR 49 / SKR 04 (Hausverwaltung)</li>
              <li>• Mieteinnahmen → Konto 8400 | Nebenkosten → 4000 | Instandhaltung → 4130</li>
              <li>• Bitte prüfen Sie den Export mit Ihrem Steuerberater vor dem Import in DATEV.</li>
            </ul>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
