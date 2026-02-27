"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ReplyBox } from "./ReplyBox";

const URGENCY_LABEL: Record<number, string> = {
  5: "Notfall",
  4: "Dringend",
  3: "Normal",
  2: "Niedrig",
  1: "Info",
};
const URGENCY_COLOR: Record<number, string> = {
  5: "bg-red-100 text-red-700",
  4: "bg-red-50 text-red-600",
  3: "bg-amber-50 text-amber-600",
  2: "bg-green-50 text-green-600",
  1: "bg-gray-100 text-gray-500",
};

interface Message {
  id: string;
  direction: "inbound" | "outbound";
  body: string;
  aiGenerated: boolean;
  createdAt: string;
}

interface Ticket {
  id: string;
  urgency: number;
  title: string;
  description: string;
  status: string;
  category: string;
  tenantName: string;
  unitDesignation: string;
  createdAt: string;
  slaDeadline: string;
  aiTriage: {
    category: string;
    urgency: number;
    summary: string;
  } | null;
  messages: Message[];
}

// Mock ticket for demo
const MOCK_TICKET: Ticket = {
  id: "t-1",
  urgency: 4,
  title: "Heizung ausgefallen",
  description:
    "Die Heizung in meiner Wohnung funktioniert seit gestern Abend nicht mehr. Es ist sehr kalt.",
  status: "open",
  category: "maintenance",
  tenantName: "M. Richter",
  unitDesignation: "Whg. 3",
  createdAt: new Date().toISOString(),
  slaDeadline: new Date(Date.now() + 24 * 3600000).toISOString(),
  aiTriage: {
    category: "maintenance",
    urgency: 4,
    summary: "Heizungsausfall — dringende Reparatur erforderlich",
  },
  messages: [
    {
      id: "m-1",
      direction: "inbound",
      body: "Die Heizung in meiner Wohnung funktioniert seit gestern Abend nicht mehr. Es ist sehr kalt. Können Sie bitte schnell jemanden schicken?",
      aiGenerated: false,
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: "m-2",
      direction: "outbound",
      body: "Sehr geehrte/r Frau/Herr Richter, vielen Dank für Ihre Meldung. Wir haben einen Heizungsnotdienst kontaktiert und ein Techniker wird sich heute noch bei Ihnen melden. Wir entschuldigen uns für die Unannehmlichkeiten.",
      aiGenerated: true,
      createdAt: new Date(Date.now() - 1800000).toISOString(),
    },
  ],
};

export default function TicketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [ticketId, setTicketId] = useState<string>("");
  const [ticket, setTicket] = useState<Ticket>(MOCK_TICKET);
  const [isResolving, setIsResolving] = useState(false);

  useEffect(() => {
    params.then((p) => {
      setTicketId(p.id);
      // In a real app, fetch the ticket here
      // fetch(`/api/portal/tickets/${p.id}`).then(...)
    });
  }, [params]);

  async function handleResolve() {
    if (!ticketId) return;
    setIsResolving(true);

    try {
      const res = await fetch(`/api/portal/tickets/${ticketId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "resolved" }),
      });

      if (res.ok) {
        setTicket({ ...ticket, status: "resolved" });
      }
    } catch (e) {
      console.error("Failed to resolve ticket:", e);
    } finally {
      setIsResolving(false);
    }
  }

  const isResolved = ticket.status === "resolved";

  return (
    <div className="min-h-screen bg-light-gray flex">
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
          {[
            { label: "Übersicht", href: "/portal/dashboard" },
            { label: "Chat", href: "/portal/chat" },
            { label: "Tickets", href: "/portal/tickets" },
            { label: "NKA", href: "/portal/nka" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/60 hover:bg-white/5 hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="flex-1 ml-56">
        <div className="max-w-3xl mx-auto px-8 py-8">
          {/* Back */}
          <Link
            href="/portal/tickets"
            className="flex items-center gap-1 text-sm text-text-light hover:text-navy mb-6 transition-colors"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Zurück zu Tickets
          </Link>

          {/* Header */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-xl font-bold text-navy mb-2">
                  {ticket.title}
                </h1>
                <div className="flex items-center gap-3 text-sm text-text-light">
                  <span>{ticket.tenantName}</span>
                  <span>•</span>
                  <span>{ticket.unitDesignation}</span>
                  <span>•</span>
                  <span>
                    {new Date(ticket.createdAt).toLocaleDateString("de-DE")}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    URGENCY_COLOR[ticket.urgency]
                  }`}
                >
                  {URGENCY_LABEL[ticket.urgency]}
                </span>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    isResolved
                      ? "bg-green-50 text-green-600"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {isResolved ? "Gelöst" : "Offen"}
                </span>
              </div>
            </div>

            {/* AI Triage */}
            {ticket.aiTriage && (
              <div className="mt-4 bg-teal/5 border border-teal/20 rounded-xl p-4 text-sm">
                <p className="font-semibold text-teal mb-1">KI-Analyse</p>
                <p className="text-text-main">{ticket.aiTriage.summary}</p>
                <p className="text-text-light mt-1">
                  Kategorie: <strong>{ticket.aiTriage.category}</strong> ·
                  Dringlichkeit: <strong>{ticket.aiTriage.urgency}/5</strong>
                </p>
              </div>
            )}

            {/* Resolve Button */}
            {!isResolved && (
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                <button
                  onClick={handleResolve}
                  disabled={isResolving}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {isResolving ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Wird geschlossen...
                    </>
                  ) : (
                    <>
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
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Ticket schließen
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Conversation */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
            <h2 className="font-semibold text-navy mb-4">Gesprächsverlauf</h2>
            <div className="space-y-4">
              {ticket.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.direction === "outbound" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                      msg.direction === "outbound"
                        ? "bg-navy text-white rounded-br-sm"
                        : "bg-gray-100 text-text-main rounded-bl-sm"
                    }`}
                  >
                    {msg.aiGenerated && (
                      <span className="block text-xs opacity-60 mb-1">
                        KI-Entwurf
                      </span>
                    )}
                    <p>{msg.body}</p>
                    <p
                      className={`text-xs mt-1.5 ${
                        msg.direction === "outbound"
                          ? "text-white/50"
                          : "text-text-light"
                      }`}
                    >
                      {new Date(msg.createdAt).toLocaleTimeString("de-DE", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reply Box */}
          {!isResolved && (
            <ReplyBox
              ticketId={ticketId}
              category={ticket.category}
              tenantMessage={ticket.description}
            />
          )}
        </div>
      </div>
    </div>
  );
}
