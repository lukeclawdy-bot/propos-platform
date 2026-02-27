"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { formatDistanceToNow, format } from "date-fns";
import { de } from "date-fns/locale";

interface Lead {
  id: string;
  createdAt: Date;
  name: string;
  email: string;
  telefon: string | null;
  verwaltungstyp: string | null;
  einheiten: string | null;
  standort: string | null;
  situation: string | null;
  prioritaet: string | null;
  status: string | null;
  notes: string | null;
  source: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  contactedAt: Date | string | null;
  demoAt: Date | string | null;
  proposalSentAt: Date | string | null;
  wonAt: Date | string | null;
  lostAt: Date | string | null;
  lostReason: string | null;
  estimatedUnits: number | null;
  pipelineValueCents: number | null;
}

const STATUS_OPTIONS = [
  { value: "new", label: "Neu", color: "bg-slate-100 text-slate-600" },
  { value: "contacted", label: "Kontaktiert", color: "bg-blue-100 text-blue-700" },
  { value: "demo_booked", label: "Demo gebucht", color: "bg-purple-100 text-purple-700" },
  { value: "proposal_sent", label: "Angebot gesendet", color: "bg-yellow-100 text-yellow-700" },
  { value: "won", label: "Gewonnen", color: "bg-green-100 text-green-700" },
  { value: "lost", label: "Verloren", color: "bg-red-100 text-red-700" },
];

const VERWALTUNGSTYP_COLORS: Record<string, string> = {
  weg: "bg-blue-100 text-blue-700",
  miet: "bg-green-100 text-green-700",
  beides: "bg-purple-100 text-purple-700",
};

const SOURCE_LABELS: Record<string, string> = {
  quiz: "Quiz",
  google_ads: "Google Ads",
  blog: "Blog",
  referral: "Referral",
  direct: "Direct",
};

function formatCurrency(cents: number | null): string {
  if (!cents) return "€0";
  return `€${(cents / 100).toFixed(0)}`;
}

function PipelineDots({ 
  status, 
  contactedAt, 
  demoAt, 
  proposalSentAt, 
  wonAt, 
  lostAt 
}: { 
  status: string | null;
  contactedAt: Date | string | null;
  demoAt: Date | string | null;
  proposalSentAt: Date | string | null;
  wonAt: Date | string | null;
  lostAt: Date | string | null;
}) {
  const steps = [
    { label: "Quiz", done: true },
    { label: "Called", done: !!contactedAt },
    { label: "Demo", done: !!demoAt },
    { label: "Proposal", done: !!proposalSentAt },
    { label: "Signed", done: !!wonAt },
  ];

  return (
    <div className="flex items-center gap-1">
      {steps.map((step, i) => (
        <div key={step.label} className="flex items-center">
          <div 
            className={`w-2 h-2 rounded-full ${
              step.done ? 'bg-teal' : 'bg-slate-200'
            }`}
            title={step.label}
          />
          {i < steps.length - 1 && (
            <div className={`w-2 h-0.5 ${step.done ? 'bg-teal/50' : 'bg-slate-200'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

function downloadCSV(leads: Lead[]) {
  const headers = [
    "ID", "Datum", "Name", "E-Mail", "Telefon", "Verwaltungstyp", "Einheiten",
    "Geschatzte Einheiten", "Pipeline Value (EUR)", "Standort", "Situation",
    "Priorität", "Status", "Source", "Kontaktiert am", "Demo am", "Angebot gesendet am",
    "Gewonnen am", "Verloren am", "Verloren Grund", "Notizen"
  ];

  const rows = leads.map((lead) => [
    lead.id,
    new Date(lead.createdAt).toISOString(),
    lead.name,
    lead.email,
    lead.telefon || "",
    lead.verwaltungstyp || "",
    lead.einheiten || "",
    lead.estimatedUnits?.toString() || "0",
    ((lead.pipelineValueCents || 0) / 100).toString(),
    lead.standort || "",
    lead.situation || "",
    lead.prioritaet || "",
    lead.status || "",
    lead.source || "",
    lead.contactedAt ? new Date(lead.contactedAt).toISOString() : "",
    lead.demoAt ? new Date(lead.demoAt).toISOString() : "",
    lead.proposalSentAt ? new Date(lead.proposalSentAt).toISOString() : "",
    lead.wonAt ? new Date(lead.wonAt).toISOString() : "",
    lead.lostAt ? new Date(lead.lostAt).toISOString() : "",
    lead.lostReason || "",
    lead.notes || "",
  ]);

  const csvContent = [
    headers.join(";"),
    ...rows.map((row) =>
      row
        .map((cell) => {
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
  link.setAttribute("download", `leads-${new Date().toISOString().split("T")[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

interface LeadsCRMClientProps {
  leads: Lead[];
}

export function LeadsCRMClient({ leads }: LeadsCRMClientProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [standortFilter, setStandortFilter] = useState<string>("all");
  const [typFilter, setTypFilter] = useState<string>("all");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"date" | "pipeline" | "einheiten">("date");
  const [expandedLead, setExpandedLead] = useState<string | null>(null);
  const [noteDrafts, setNoteDrafts] = useState<Record<string, string>>({});

  const filteredLeads = useMemo(() => {
    let result = leads.filter((lead) => {
      const matchesSearch =
        !search ||
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.email.toLowerCase().includes(search.toLowerCase()) ||
        (lead.telefon && lead.telefon.includes(search));

      const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
      const matchesStandort = standortFilter === "all" || lead.standort === standortFilter;
      const matchesTyp = typFilter === "all" || lead.verwaltungstyp === typFilter;
      const matchesSource = sourceFilter === "all" || lead.source === sourceFilter;

      return matchesSearch && matchesStatus && matchesStandort && matchesTyp && matchesSource;
    });

    result = [...result].sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === "pipeline") {
        return (b.pipelineValueCents || 0) - (a.pipelineValueCents || 0);
      }
      return (b.estimatedUnits || 0) - (a.estimatedUnits || 0);
    });

    return result;
  }, [leads, search, statusFilter, standortFilter, typFilter, sourceFilter, sortBy]);

  const standorte = useMemo(() => 
    [...new Set(leads.map(l => l.standort).filter(Boolean))] as string[],
    [leads]
  );

  async function updateLead(leadId: string, data: Partial<Lead>) {
    try {
      const response = await fetch(`/api/admin/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to update lead:", error);
    }
  }

  async function saveNotes(leadId: string) {
    const notes = noteDrafts[leadId];
    if (notes === undefined) return;
    
    try {
      const response = await fetch(`/api/admin/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes }),
      });
      if (response.ok) {
        setNoteDrafts(prev => {
          const next = { ...prev };
          delete next[leadId];
          return next;
        });
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to update notes:", error);
    }
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-3 bg-white rounded-xl border border-gray-100 p-4">
        <input
          type="text"
          placeholder="Suchen (Name, E-Mail, Telefon)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 w-64"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-teal"
        >
          <option value="all">Alle Status</option>
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <select
          value={standortFilter}
          onChange={(e) => setStandortFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-teal"
        >
          <option value="all">Alle Standorte</option>
          {standorte.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select
          value={typFilter}
          onChange={(e) => setTypFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-teal"
        >
          <option value="all">Alle Typen</option>
          <option value="weg">WEG</option>
          <option value="miet">Miet</option>
          <option value="beides">Beides</option>
        </select>
        <select
          value={sourceFilter}
          onChange={(e) => setSourceFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-teal"
        >
          <option value="all">Alle Quellen</option>
          <option value="quiz">Quiz</option>
          <option value="google_ads">Google Ads</option>
          <option value="blog">Blog</option>
          <option value="referral">Referral</option>
          <option value="direct">Direct</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "date" | "pipeline" | "einheiten")}
          className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-teal"
        >
          <option value="date">Sort: Datum</option>
          <option value="pipeline">Sort: Pipeline Value</option>
          <option value="einheiten">Sort: Einheiten</option>
        </select>
        <button
          onClick={() => downloadCSV(filteredLeads)}
          className="ml-auto flex items-center gap-2 bg-navy text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-navy/85 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-navy">Name / Kontakt</th>
                <th className="text-left px-4 py-3 font-semibold text-navy">Typ</th>
                <th className="text-left px-4 py-3 font-semibold text-navy">Einheiten</th>
                <th className="text-left px-4 py-3 font-semibold text-navy">Pipeline</th>
                <th className="text-left px-4 py-3 font-semibold text-navy">Stage</th>
                <th className="text-left px-4 py-3 font-semibold text-navy">Status</th>
                <th className="text-left px-4 py-3 font-semibold text-navy">Quelle</th>
                <th className="text-left px-4 py-3 font-semibold text-navy">Datum</th>
                <th className="text-left px-4 py-3 font-semibold text-navy">Aktionen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center text-slate-400">
                    Keine Leads gefunden.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <>
                    <tr 
                      key={lead.id} 
                      className="hover:bg-slate-50/50 cursor-pointer"
                      onClick={() => setExpandedLead(expandedLead === lead.id ? null : lead.id)}
                    >
                      <td className="px-4 py-3">
                        <p className="font-medium text-navy">{lead.name}</p>
                        <p className="text-teal text-xs">{lead.email}</p>
                        {lead.telefon && <p className="text-slate-400 text-xs">{lead.telefon}</p>}
                      </td>
                      <td className="px-4 py-3">
                        {lead.verwaltungstyp && (
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${VERWALTUNGSTYP_COLORS[lead.verwaltungstyp] || "bg-slate-100"}`}>
                            {lead.verwaltungstyp.toUpperCase()}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-slate-500">{lead.einheiten || "—"}</td>
                      <td className="px-4 py-3">
                        <span className="font-bold text-teal">{formatCurrency(lead.pipelineValueCents)}</span>
                      </td>
                      <td className="px-4 py-3">
                        <PipelineDots 
                          status={lead.status}
                          contactedAt={lead.contactedAt}
                          demoAt={lead.demoAt}
                          proposalSentAt={lead.proposalSentAt}
                          wonAt={lead.wonAt}
                          lostAt={lead.lostAt}
                        />
                      </td>
                      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={lead.status || "new"}
                          onChange={(e) => updateLead(lead.id, { status: e.target.value })}
                          className={`text-xs px-2 py-1 rounded-full border-0 font-medium cursor-pointer ${
                            STATUS_OPTIONS.find(s => s.value === (lead.status || 'new'))?.color || 'bg-slate-100'
                          }`}
                        >
                          {STATUS_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded">
                          {SOURCE_LABELS[lead.source || 'quiz'] || lead.source}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-400 text-xs whitespace-nowrap">
                        {formatDistanceToNow(new Date(lead.createdAt), { addSuffix: true, locale: de })}
                      </td>
                      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => updateLead(lead.id, { status: 'contacted', contactedAt: new Date().toISOString() })}
                            className="p-1.5 text-blue-500 hover:bg-blue-50 rounded"
                            title="Als angerufen markieren"
                          >
                            📞
                          </button>
                          <button
                            onClick={() => updateLead(lead.id, { status: 'proposal_sent', proposalSentAt: new Date().toISOString() })}
                            className="p-1.5 text-yellow-500 hover:bg-yellow-50 rounded"
                            title="Angebot gesendet"
                          >
                            📋
                          </button>
                          <button
                            onClick={() => updateLead(lead.id, { status: 'won', wonAt: new Date().toISOString() })}
                            className="p-1.5 text-green-500 hover:bg-green-50 rounded"
                            title="Gewonnen"
                          >
                            ✓
                          </button>
                          <button
                            onClick={() => updateLead(lead.id, { status: 'lost', lostAt: new Date().toISOString() })}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded"
                            title="Verloren"
                          >
                            ✗
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedLead === lead.id && (
                      <tr className="bg-slate-50/50">
                        <td colSpan={9} className="px-4 py-4">
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-xs font-semibold text-navy mb-2">Quiz Antworten</p>
                                <div className="space-y-2">
                                  <div>
                                    <span className="text-xs text-slate-400">Situation:</span>
                                    <p className="text-sm text-slate-600">{lead.situation || "—"}</p>
                                  </div>
                                  <div>
                                    <span className="text-xs text-slate-400">Priorität:</span>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {lead.prioritaet?.split(',').map(p => p.trim()).filter(Boolean).map(p => (
                                        <span key={p} className="text-xs bg-teal-50 text-teal px-2 py-0.5 rounded">
                                          {p}
                                        </span>
                                      )) || <span className="text-sm text-slate-400">—</span>}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-navy mb-2">Pipeline Berechnung</p>
                                <div className="bg-white p-3 rounded-lg border border-slate-100 text-sm">
                                  <div className="flex justify-between py-1">
                                    <span className="text-slate-500">Geschätzte Einheiten:</span>
                                    <span className="font-medium">{lead.estimatedUnits}</span>
                                  </div>
                                  <div className="flex justify-between py-1">
                                    <span className="text-slate-500">Preis pro Einheit:</span>
                                    <span className="font-medium">€29/Monat</span>
                                  </div>
                                  <div className="border-t border-slate-100 my-2" />
                                  <div className="flex justify-between py-1">
                                    <span className="text-slate-700 font-medium">Monatlicher Wert:</span>
                                    <span className="font-bold text-teal">{formatCurrency(lead.pipelineValueCents)}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <p className="text-xs font-semibold text-navy mb-2">Notizen</p>
                              <textarea
                                value={noteDrafts[lead.id] !== undefined ? noteDrafts[lead.id] : (lead.notes || "")}
                                onChange={(e) => setNoteDrafts(prev => ({ ...prev, [lead.id]: e.target.value }))}
                                onBlur={() => saveNotes(lead.id)}
                                placeholder="Notizen zu diesem Lead..."
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20"
                                rows={3}
                              />
                            </div>
                            
                            {/* Timeline */}
                            <div>
                              <p className="text-xs font-semibold text-navy mb-2">Timeline</p>
                              <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-3">
                                  <div className="w-2 h-2 rounded-full bg-teal" />
                                  <span className="text-slate-500 w-32">Quiz abgeschlossen</span>
                                  <span className="text-slate-700">{format(new Date(lead.createdAt), 'dd.MM.yyyy HH:mm')}</span>
                                </div>
                                {lead.contactedAt && (
                                  <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                                    <span className="text-slate-500 w-32">Kontaktiert</span>
                                    <span className="text-slate-700">{format(new Date(lead.contactedAt), 'dd.MM.yyyy HH:mm')}</span>
                                  </div>
                                )}
                                {lead.demoAt && (
                                  <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-purple-400" />
                                    <span className="text-slate-500 w-32">Demo gebucht</span>
                                    <span className="text-slate-700">{format(new Date(lead.demoAt), 'dd.MM.yyyy HH:mm')}</span>
                                  </div>
                                )}
                                {lead.proposalSentAt && (
                                  <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                                    <span className="text-slate-500 w-32">Angebot gesendet</span>
                                    <span className="text-slate-700">{format(new Date(lead.proposalSentAt), 'dd.MM.yyyy HH:mm')}</span>
                                  </div>
                                )}
                                {lead.wonAt && (
                                  <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-green-400" />
                                    <span className="text-slate-500 w-32">Gewonnen</span>
                                    <span className="text-slate-700">{format(new Date(lead.wonAt), 'dd.MM.yyyy HH:mm')}</span>
                                  </div>
                                )}
                                {lead.lostAt && (
                                  <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-red-400" />
                                    <span className="text-slate-500 w-32">Verloren</span>
                                    <span className="text-slate-700">{format(new Date(lead.lostAt), 'dd.MM.yyyy HH:mm')}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-slate-400">
        {filteredLeads.length} von {leads.length} Leads angezeigt
      </p>
    </div>
  );
}
