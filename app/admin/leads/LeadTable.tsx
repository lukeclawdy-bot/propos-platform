"use client";

import { useState, useMemo } from "react";

export interface Lead {
  id: number;
  createdAt: Date | string;
  name: string;
  email: string;
  telefon: string | null;
  verwaltungstyp: string | null;
  einheiten: string | null;
  standort: string | null;
  situation: string | null;
  prioritaet: string | null;
  quelle: string;
  notizen: string | null;
}

interface LeadTableProps {
  leads: Lead[];
}

function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatValue(value: string | null): string {
  if (!value) return "—";
  return value.replace(/-/g, " ");
}

function downloadCSV(leads: Lead[]) {
  const headers = [
    "ID",
    "Datum",
    "Name",
    "E-Mail",
    "Telefon",
    "Verwaltungstyp",
    "Einheiten",
    "Standort",
    "Situation",
    "Priorität",
    "Quelle",
    "Notizen",
  ];

  const rows = leads.map((lead) => [
    lead.id,
    new Date(lead.createdAt).toISOString(),
    lead.name,
    lead.email,
    lead.telefon || "",
    lead.verwaltungstyp || "",
    lead.einheiten || "",
    lead.standort || "",
    lead.situation || "",
    lead.prioritaet || "",
    lead.quelle,
    lead.notizen || "",
  ]);

  const csvContent = [
    headers.join(";"),
    ...rows.map((row) =>
      row
        .map((cell) => {
          // Escape semicolons and quotes
          const cellStr = String(cell);
          if (cellStr.includes(";") || cellStr.includes('"')) {
            return `"${cellStr.replace(/"/g, '""')}"`;
          }
          return cellStr;
        })
        .join(";")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `leads-${new Date().toISOString().split("T")[0]}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function LeadTable({ leads }: LeadTableProps) {
  const [filter, setFilter] = useState("");
  const [quelleFilter, setQuelleFilter] = useState<string>("all");

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        !filter ||
        lead.name.toLowerCase().includes(filter.toLowerCase()) ||
        lead.email.toLowerCase().includes(filter.toLowerCase()) ||
        (lead.telefon && lead.telefon.includes(filter));

      const matchesQuelle =
        quelleFilter === "all" || lead.quelle === quelleFilter;

      return matchesSearch && matchesQuelle;
    });
  }, [leads, filter, quelleFilter]);

  const stats = useMemo(() => {
    return {
      total: leads.length,
      anfrage: leads.filter((l) => l.quelle === "anfrage").length,
      kontakt: leads.filter((l) => l.quelle === "kontakt").length,
    };
  }, [leads]);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-text-light">Gesamt Leads</p>
          <p className="text-2xl font-bold text-navy">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-text-light">Über Anfrage-Quiz</p>
          <p className="text-2xl font-bold text-teal">{stats.anfrage}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-text-light">Über Kontaktformular</p>
          <p className="text-2xl font-bold text-amber">{stats.kontakt}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Suchen (Name, E-Mail, Telefon)..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 w-full sm:w-64"
          />
          <select
            value={quelleFilter}
            onChange={(e) => setQuelleFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20"
          >
            <option value="all">Alle Quellen</option>
            <option value="anfrage">Anfrage-Quiz</option>
            <option value="kontakt">Kontaktformular</option>
          </select>
        </div>
        <button
          onClick={() => downloadCSV(filteredLeads)}
          className="flex items-center gap-2 bg-navy text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-navy/85 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          CSV Export ({filteredLeads.length})
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-navy">Datum</th>
                <th className="text-left px-4 py-3 font-semibold text-navy">Name</th>
                <th className="text-left px-4 py-3 font-semibold text-navy">E-Mail</th>
                <th className="text-left px-4 py-3 font-semibold text-navy">Telefon</th>
                <th className="text-left px-4 py-3 font-semibold text-navy">Typ</th>
                <th className="text-left px-4 py-3 font-semibold text-navy">Einheiten</th>
                <th className="text-left px-4 py-3 font-semibold text-navy">Standort</th>
                <th className="text-left px-4 py-3 font-semibold text-navy">Situation</th>
                <th className="text-left px-4 py-3 font-semibold text-navy">Quelle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    className="px-4 py-12 text-center text-text-light"
                  >
                    {filter || quelleFilter !== "all"
                      ? "Keine Leads gefunden."
                      : "Noch keine Leads vorhanden."}
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3 text-text-light whitespace-nowrap">
                      {formatDate(lead.createdAt)}
                    </td>
                    <td className="px-4 py-3 font-medium text-navy">{lead.name}</td>
                    <td className="px-4 py-3">
                      <a
                        href={`mailto:${lead.email}`}
                        className="text-teal hover:underline"
                      >
                        {lead.email}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-text-light">
                      {lead.telefon || "—"}
                    </td>
                    <td className="px-4 py-3 text-text-light">
                      {formatValue(lead.verwaltungstyp)}
                    </td>
                    <td className="px-4 py-3 text-text-light">
                      {formatValue(lead.einheiten)}
                    </td>
                    <td className="px-4 py-3 text-text-light">
                      {formatValue(lead.standort)}
                    </td>
                    <td className="px-4 py-3 text-text-light">
                      {formatValue(lead.situation)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          lead.quelle === "anfrage"
                            ? "bg-teal/10 text-teal"
                            : "bg-amber/10 text-amber"
                        }`}
                      >
                        {lead.quelle === "anfrage" ? "Quiz" : "Kontakt"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-text-light text-center">
        {filteredLeads.length} von {leads.length} Leads angezeigt
      </p>
    </div>
  );
}
