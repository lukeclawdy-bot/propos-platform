'use client';

/**
 * NKADownloadButton
 *
 * Downloads a Nebenkostenabrechnung PDF via /api/pdf/nka.
 * Works with demo data when DATABASE_URL is unavailable.
 */

import { useState } from 'react';

interface NKADownloadButtonProps {
  propertyName?: string;
  year?: number;
}

export function NKADownloadButton({ propertyName, year }: NKADownloadButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentYear = new Date().getFullYear();
  const downloadYear = year ?? currentYear - 1;
  const downloadPropertyName = propertyName ?? 'Musterstraße 7';

  async function handleDownload() {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        propertyName: downloadPropertyName,
        year: String(downloadYear),
      });

      const res = await fetch(`/api/pdf/nka?${params.toString()}`);

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? `HTTP ${res.status}`);
      }

      // Get filename from Content-Disposition or build it
      const disposition = res.headers.get('Content-Disposition') ?? '';
      const match = disposition.match(/filename="([^"]+)"/);
      const fileName = match?.[1] ?? `NKA_${downloadPropertyName.replace(/[^a-zA-Z0-9]/g, '-')}_${downloadYear}.html`;

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      // Trigger browser download
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unbekannter Fehler');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        onClick={handleDownload}
        disabled={loading}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal text-white text-sm font-medium hover:bg-teal/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Wird erstellt…
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            NKA PDF herunterladen ({downloadYear})
          </>
        )}
      </button>
      {error && (
        <p className="text-xs text-red-600">Fehler: {error}</p>
      )}
    </div>
  );
}
