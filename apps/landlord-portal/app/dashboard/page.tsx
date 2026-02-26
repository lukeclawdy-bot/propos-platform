"use client";

import { useState } from "react";

// Mock data for the dashboard
const mockData = {
  portfolio: {
    totalUnits: 5,
    occupied: 5,
    occupancyRate: 100,
    openTickets: 3,
    activeTenants: 5,
  },
  aiActions: [
    {
      id: 1,
      priority: "urgent",
      icon: "🔴",
      title: "Energieausweis läuft in 30 Tagen ab",
      description: "WE-3, Musterstraße 15 — Gültigkeit endet am 28.03.2026",
      action: "Neuen Ausweis beantragen",
    },
    {
      id: 2,
      priority: "attention",
      icon: "🟡",
      title: "2 Mietzahlungen überfällig",
      description: "Müller (WE-1): €850 • Schulz (WE-4): €920 — Seit 5 Tagen",
      action: "Mahnungen senden",
    },
    {
      id: 3,
      priority: "opportunity",
      icon: "🟢",
      title: "Mieterhöhung bei WE-2 jetzt möglich",
      description: "15 Monate seit letzter Erhöhung — Indexsteigerung: 3.2%",
      action: "Eröhung prüfen",
    },
  ],
  financials: {
    currentMonth: {
      collected: 4200,
      expected: 4200,
      overdue: 1770,
      overdueCount: 2,
    },
  },
  tickets: [
    {
      id: 1,
      urgency: "urgent",
      unit: "WE-2",
      title: "Heizung ausgefallen",
      status: "Offen",
      time: "Vor 2h",
    },
    {
      id: 2,
      urgency: "pending",
      unit: "WE-1",
      title: "Waschbecken tropft",
      status: "Termin vereinbart",
      time: "Vor 1 Tag",
    },
    {
      id: 3,
      urgency: "resolved",
      unit: "WE-4",
      title: "Schlüssel verloren",
      status: "Erledigt",
      time: "Vor 3 Tagen",
    },
  ],
  tenantActivity: [
    { id: 1, type: "ticket", message: "Neues Ticket von WE-2", time: "Vor 15 Min." },
    { id: 2, type: "message", message: "Anfrage zu Nebenkosten (WE-3)", time: "Vor 2 Std." },
    { id: 3, type: "message", message: "3 neue Nachrichten", time: "Gestern" },
  ],
  documentAlerts: [
    { id: 1, type: "Energieausweis", unit: "WE-3", expires: "28.03.2026", daysLeft: 30 },
    { id: 2, type: "Mietvertrag", unit: "WE-1", expires: "31.12.2026", daysLeft: 308 },
  ],
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const formatCurrency = (cents: number) => {
    return `€${(cents / 100).toLocaleString("de-DE", { minimumFractionDigits: 2 })}`;
  };

  return (
    <div className="min-h-screen bg-warm-white">
      {/* Navigation Header */}
      <header className="bg-navy text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal rounded-lg flex items-center justify-center">
                <span className="text-white font-serif text-xl font-bold">e</span>
              </div>
              <div>
                <span className="font-serif text-xl font-semibold">einfach verwaltet.</span>
                <span className="ml-3 text-sm text-white/60 hidden sm:inline">| Vermieter-Dashboard</span>
              </div>
            </div>

            {/* Nav Links */}
            <nav className="hidden md:flex items-center gap-1">
              {["Übersicht", "Portfolio", "Tickets", "Dokumente", "Finanzen"].map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveTab(item.toLowerCase())}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === item.toLowerCase()
                      ? "bg-teal text-white"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-white/70 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-amber rounded-full"></span>
              </button>
              <div className="w-10 h-10 bg-teal/30 rounded-full flex items-center justify-center">
                <span className="font-semibold">TM</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-navy to-navy/90 rounded-2xl p-6 md:p-8 text-white mb-8 shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="font-serif text-3xl font-bold mb-2">
                Guten Morgen, Thomas! ☀️
              </h1>
              <p className="text-white/80">
                Ihre KI hat 3 neue Handlungsempfehlungen für Sie. Eine erfordert sofortige Aufmerksamkeit.
              </p>
            </div>
            <div className="hidden md:block text-right">
              <div className="text-3xl font-bold">{mockData.portfolio.totalUnits}</div>
              <div className="text-white/60 text-sm">Einheiten</div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Portfolio & AI Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Action Feed - PRIORITY WIDGET */}
            <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
              <div className="bg-gradient-to-r from-amber/10 to-amber/5 px-6 py-4 border-b border-amber/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="font-serif text-xl font-bold text-navy">🤖 KI-Action Feed</h2>
                    <p className="text-sm text-text-muted">Priorisierte Handlungsempfehlungen</p>
                  </div>
                </div>
              </div>
              <div className="divide-y divide-border">
                {mockData.aiActions.map((action) => (
                  <div key={action.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-4">
                      <span className="text-2xl">{action.icon}</span>
                      <div className="flex-1">
                        <h3 className="font-semibold text-navy mb-1">{action.title}</h3>
                        <p className="text-sm text-text-muted mb-3">{action.description}</p>
                        <div className="flex items-center gap-3">
                          <button className="px-4 py-2 bg-teal text-white text-sm font-medium rounded-lg hover:bg-teal-dark transition-colors">
                            {action.action}
                          </button>
                          <button className="px-4 py-2 text-text-muted text-sm hover:text-navy transition-colors">
                            Später
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-6 py-4 bg-gray-50 border-t border-border">
                <button className="text-teal font-medium text-sm hover:underline">
                  Alle Empfehlungen anzeigen →
                </button>
              </div>
            </div>

            {/* Portfolio Overview */}
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-border">
                <div className="text-3xl font-bold text-navy mb-1">{mockData.portfolio.totalUnits}</div>
                <div className="text-sm text-text-muted">Gesamteinheiten</div>
                <div className="mt-3 text-xs text-green font-medium">
                  100% belegt
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-border">
                <div className="text-3xl font-bold text-navy mb-1">{mockData.portfolio.activeTenants}</div>
                <div className="text-sm text-text-muted">Aktive Mieter</div>
                <div className="mt-3 text-xs text-green font-medium">
                  Keine Kündigungen
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-border">
                <div className="text-3xl font-bold text-red mb-1">{mockData.portfolio.openTickets}</div>
                <div className="text-sm text-text-muted">Offene Tickets</div>
                <div className="mt-3 text-xs text-red font-medium">
                  1 dringend
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-border">
                <div className="text-3xl font-bold text-navy mb-1">{formatCurrency(mockData.financials.currentMonth.expected)}</div>
                <div className="text-sm text-text-muted">Miete März</div>
                <div className="mt-3 text-xs text-green font-medium">
                  100% erhalten
                </div>
              </div>
            </div>

            {/* Active Tickets */}
            <div className="bg-white rounded-2xl shadow-sm border border-border">
              <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                <h2 className="font-serif text-lg font-bold text-navy">📋 Aktive Tickets</h2>
                <button className="text-teal text-sm font-medium hover:underline">
                  Alle anzeigen
                </button>
              </div>
              <div className="divide-y divide-border">
                {mockData.tickets.map((ticket) => (
                  <div key={ticket.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <span
                        className={`w-3 h-3 rounded-full ${
                          ticket.urgency === "urgent"
                            ? "bg-red"
                            : ticket.urgency === "pending"
                            ? "bg-amber"
                            : "bg-green"
                        }`}
                      />
                      <div>
                        <div className="font-medium text-navy">{ticket.title}</div>
                        <div className="text-sm text-text-muted">
                          {ticket.unit} • {ticket.status}
                        </div>
                      </div>
                    </div>
                    <span className="text-sm text-text-light">{ticket.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Side Widgets */}
          <div className="space-y-6">
            {/* Financial Snapshot */}
            <div className="bg-white rounded-2xl shadow-sm border border-border">
              <div className="px-6 py-4 border-b border-border">
                <h2 className="font-serif text-lg font-bold text-navy">💰 Finanz-Überblick</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-text-muted">Mieteinkommen (März)</span>
                  <span className="font-semibold text-navy">
                    {formatCurrency(mockData.financials.currentMonth.collected)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-muted">Überfällig</span>
                  <span className="font-semibold text-red">
                    {formatCurrency(mockData.financials.currentMonth.overdue)}
                    <span className="text-sm ml-1">({mockData.financials.currentMonth.overdueCount})</span>
                  </span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-border">
                  <span className="font-medium text-navy">Nettoerlös</span>
                  <span className="font-bold text-navy text-lg">
                    {formatCurrency(
                      mockData.financials.currentMonth.collected - mockData.financials.currentMonth.overdue
                    )}
                  </span>
                </div>
              </div>
              <div className="px-6 py-3 bg-gray-50 rounded-b-2xl">
                <button className="text-teal text-sm font-medium hover:underline w-full text-center">
                  Details ansehen
                </button>
              </div>
            </div>

            {/* Recent Tenant Activity */}
            <div className="bg-white rounded-2xl shadow-sm border border-border">
              <div className="px-6 py-4 border-b border-border">
                <h2 className="font-serif text-lg font-bold text-navy">💬 Mieter-Aktivität</h2>
              </div>
              <div className="p-6 space-y-4">
                {mockData.tenantActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        activity.type === "ticket" ? "bg-red/10" : "bg-teal/10"
                      }`}
                    >
                      <span className="text-lg">{activity.type === "ticket" ? "🔧" : "💬"}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-navy font-medium truncate">{activity.message}</p>
                      <p className="text-xs text-text-light">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-6 py-3 bg-gray-50 rounded-b-2xl">
                <button className="text-teal text-sm font-medium hover:underline w-full text-center">
                  Alle Nachrichten
                </button>
              </div>
            </div>

            {/* Document Alerts */}
            <div className="bg-white rounded-2xl shadow-sm border border-border">
              <div className="px-6 py-4 border-b border-border">
                <h2 className="font-serif text-lg font-bold text-navy">📄 Dokumenten-Alerts</h2>
              </div>
              <div className="p-6 space-y-4">
                {mockData.documentAlerts.map((doc) => (
                  <div
                    key={doc.id}
                    className={`p-4 rounded-xl ${doc.daysLeft < 60 ? "bg-red/5 border border-red/20" : "bg-gray-50"}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-navy text-sm">{doc.type}</span>
                      {doc.daysLeft < 60 && (
                        <span className="text-xs bg-red text-white px-2 py-0.5 rounded-full">
                          Dringend
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-text-muted mb-2">{doc.unit}</p>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-text-light">Läuft ab:</span>
                      <span className={doc.daysLeft < 60 ? "text-red font-medium" : "text-text-muted"}>
                        {doc.expires} ({doc.daysLeft} Tage)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}