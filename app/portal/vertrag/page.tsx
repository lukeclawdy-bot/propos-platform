"use client";

import { useState } from "react";
import { DemoBanner } from "@/components/DemoBanner";

// ─── Demo contract data ───────────────────────────────────────────────────────

const DEMO_CONTRACT = {
  status: "signed" as "none" | "pending" | "signed",
  ownerName: "Max Mustermann",
  ownerEmail: "max.mustermann@example.com",
  ownerAddress: "Alsterchaussee 12, 20149 Hamburg",
  propertyAddress: "Musterstraße 12, 20095 Hamburg",
  units: 6,
  feePerUnit: 29,
  startDate: "2026-03-01",
  verwaltungstyp: "Miet" as "WEG" | "Miet" | "Gewerbe",
  signedAt: "2026-02-15",
};

// ─── Sidebar nav ──────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: "Übersicht", href: "/portal/dashboard", active: false },
  { label: "Chat", href: "/portal/chat", active: false },
  { label: "Einheiten", href: "/portal/einheiten", active: false },
  { label: "Mieter", href: "/portal/mieter", active: false },
  { label: "Tickets", href: "/portal/tickets", active: false },
  { label: "Partner", href: "/portal/partner", active: false },
  { label: "Dokumente", href: "/portal/dokumente", active: false },
  { label: "Vertrag", href: "/portal/vertrag", active: true },
  { label: "Finanzen", href: "/portal/finanzen", active: false },
  { label: "Analysen", href: "/portal/analytics", active: false },
  { label: "Mieterhöhung", href: "/portal/mieterhohung", active: false },
];

// ─── Icons ────────────────────────────────────────────────────────────────────

function DocumentTextIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
      />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

// ─── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: "none" | "pending" | "signed" }) {
  if (status === "signed") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
        <CheckCircleIcon className="w-4 h-4" />
        Unterzeichnet
      </span>
    );
  }
  if (status === "pending") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
        <ClockIcon className="w-4 h-4" />
        Ausstehende Unterschrift
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600">
      Kein Vertrag
    </span>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function VertragPage() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // In a real implementation, this would be fetched server-side
  // For now, we use demo data with a client component
  const contract = DEMO_CONTRACT;
  const isDemo = true;

  const monthlyFee = contract.feePerUnit * contract.units;
  const annualFee = monthlyFee * 12;

  function fmtEur(n: number) {
    return n.toLocaleString("de-DE", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
    });
  }

  function fmtDate(d: string) {
    return new Date(d).toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  async function handleDownload() {
    setIsDownloading(true);
    setError(null);
    try {
      const res = await fetch("/api/portal/vertrag/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ownerName: contract.ownerName,
          ownerAddress: contract.ownerAddress,
          propertyAddress: contract.propertyAddress,
          units: contract.units,
          feePerUnit: contract.feePerUnit,
          startDate: contract.startDate,
          verwaltungstyp: contract.verwaltungstyp,
        }),
      });

      if (!res.ok) {
        const { error: errMsg } = await res.json();
        throw new Error(errMsg || "Fehler beim Generieren.");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Hausverwaltungsvertrag.html";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unbekannter Fehler.");
    } finally {
      setIsDownloading(false);
    }
  }

  async function handleSendEmail() {
    setIsSendingEmail(true);
    setEmailSent(false);
    setError(null);
    try {
      const res = await fetch("/api/portal/vertrag/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toEmail: contract.ownerEmail,
          toName: contract.ownerName,
          ownerName: contract.ownerName,
          ownerAddress: contract.ownerAddress,
          propertyAddress: contract.propertyAddress,
          units: contract.units,
          feePerUnit: contract.feePerUnit,
          startDate: contract.startDate,
          verwaltungstyp: contract.verwaltungstyp,
        }),
      });

      if (!res.ok) {
        const { error: errMsg } = await res.json();
        throw new Error(errMsg || "E-Mail konnte nicht gesendet werden.");
      }

      setEmailSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unbekannter Fehler.");
    } finally {
      setIsSendingEmail(false);
    }
  }

  return (
    <div className="min-h-screen bg-light-gray flex flex-col">
      {isDemo && <DemoBanner />}

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-56 bg-navy min-h-screen flex flex-col fixed left-0 top-0 bottom-0">
          <div className="px-5 py-5 border-b border-white/10">
            <a href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 bg-teal rounded-md flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <span className="text-white text-sm font-bold">
                einfach <span className="text-teal">verwaltet.</span>
              </span>
            </a>
          </div>
          <nav className="flex-1 px-3 py-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors
                  ${item.active
                    ? "bg-teal/20 text-teal font-medium"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
              >
                {item.label === "Vertrag" && (
                  <DocumentTextIcon className="w-4 h-4 flex-shrink-0" />
                )}
                {item.label}
              </a>
            ))}
          </nav>
          <div className="px-4 py-4 border-t border-white/10 space-y-2">
            <a
              href="/api/portal/auth/logout"
              className="block text-white/40 hover:text-white/70 text-xs transition-colors"
            >
              Abmelden
            </a>
            <p className="text-white/30 text-xs">einfach verwaltet. v1</p>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 ml-56 p-8">
          <div className="max-w-3xl mx-auto">
            {/* Page header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-teal/10 rounded-xl flex items-center justify-center">
                  <DocumentTextIcon className="w-5 h-5 text-teal" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-navy">Mein Vertrag</h1>
                  <p className="text-gray-500 text-sm">Hausverwaltungsvertrag mit einfach verwaltet.</p>
                </div>
              </div>
            </div>

            {/* Status card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-navy">Vertragsstatus</h2>
                <StatusBadge status={contract.status} />
              </div>

              {contract.status === "none" ? (
                <div className="text-center py-8">
                  <DocumentTextIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm mb-4">
                    Sie haben noch keinen aktiven Hausverwaltungsvertrag.
                  </p>
                  <a
                    href="/kontakt"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal text-white rounded-xl text-sm font-medium hover:bg-teal/90 transition-colors"
                  >
                    Vertrag anfragen
                  </a>
                </div>
              ) : (
                <>
                  {/* Contract details */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                        Objekt
                      </div>
                      <div className="text-sm font-semibold text-navy">
                        {contract.propertyAddress}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                        Einheiten
                      </div>
                      <div className="text-sm font-semibold text-navy">
                        {contract.units} Einheit{contract.units !== 1 ? "en" : ""}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                        Vergütung / Monat
                      </div>
                      <div className="text-sm font-semibold text-navy">
                        {fmtEur(monthlyFee)}{" "}
                        <span className="text-gray-400 font-normal text-xs">zzgl. MwSt.</span>
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">
                        {fmtEur(contract.feePerUnit)} × {contract.units} Einheiten
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                        Vertragsbeginn
                      </div>
                      <div className="text-sm font-semibold text-navy">
                        {fmtDate(contract.startDate)}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                        Verwaltungstyp
                      </div>
                      <div className="text-sm font-semibold text-navy">
                        {contract.verwaltungstyp === "WEG"
                          ? "WEG-Verwaltung"
                          : contract.verwaltungstyp === "Miet"
                            ? "Mietverwaltung"
                            : "Gewerbeverwaltung"}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                        Jahresvergütung
                      </div>
                      <div className="text-sm font-semibold text-navy">
                        {fmtEur(annualFee)}{" "}
                        <span className="text-gray-400 font-normal text-xs">zzgl. MwSt.</span>
                      </div>
                    </div>
                  </div>

                  {/* Key contract terms */}
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
                    <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">
                      Wesentliche Vertragskonditionen
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Kündigung: 3 Monate zum Ende eines Kalendervierteljahres (§621 BGB)</li>
                      <li>• Abrechnung: monatlich per SEPA-Lastschrift</li>
                      <li>• Haftungsgrenze: einfache Jahresvergütung ({fmtEur(annualFee)})</li>
                      <li>• Gerichtsstand: Hamburg · Deutsches Recht</li>
                    </ul>
                  </div>

                  {/* Error message */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 text-sm text-red-700">
                      {error}
                    </div>
                  )}

                  {/* Success message */}
                  {emailSent && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-4 text-sm text-green-700 flex items-center gap-2">
                      <CheckCircleIcon className="w-4 h-4" />
                      Vertrag wurde erfolgreich an {contract.ownerEmail} gesendet.
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={handleDownload}
                      disabled={isDownloading}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-teal text-white rounded-xl text-sm font-medium hover:bg-teal/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <DownloadIcon className="w-4 h-4" />
                      {isDownloading ? "Wird erstellt…" : "Vertrag herunterladen"}
                    </button>
                    <button
                      onClick={handleSendEmail}
                      disabled={isSendingEmail || emailSent}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-navy text-white rounded-xl text-sm font-medium hover:bg-navy/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <MailIcon className="w-4 h-4" />
                      {isSendingEmail
                        ? "Wird gesendet…"
                        : emailSent
                          ? "E-Mail gesendet ✓"
                          : "Vertrag per E-Mail senden"}
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Info box */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-sm font-semibold text-navy mb-3">
                Über Ihren Hausverwaltungsvertrag
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <p>
                  Der Vertrag wird durch die <strong>RVLT Ventures GmbH</strong> —
                  handelnd als „einfach verwaltet." — mit Sitz in Hamburg geschlossen.
                  Die Gesellschaft hält die erforderliche Erlaubnis gemäß{" "}
                  <strong>§34c GewO</strong>.
                </p>
                <p>
                  Bei Fragen zu Ihrem Vertrag wenden Sie sich bitte direkt an uns:{" "}
                  <a
                    href="mailto:hallo@einfach-verwaltet.de"
                    className="text-teal hover:underline"
                  >
                    hallo@einfach-verwaltet.de
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
