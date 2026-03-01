"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const STATUS_CONFIG = {
  open: { label: "Offen", bg: "bg-red-50", text: "text-red-600" },
  inprogress: { label: "In Bearbeitung", bg: "bg-amber-50", text: "text-amber-600" },
  resolved: { label: "Erledigt", bg: "bg-green-50", text: "text-green-600" },
  closed: { label: "Geschlossen", bg: "bg-gray-50", text: "text-gray-600" },
};

const PRIORITY_CONFIG: Record<string, { label: string; color: string }> = {
  urgent: { label: "Dringend", color: "text-red-600" },
  high: { label: "Hoch", color: "text-orange-500" },
  normal: { label: "Normal", color: "text-amber-500" },
  low: { label: "Niedrig", color: "text-green-500" },
};

const CATEGORY_LABELS: Record<string, string> = {
  maintenance: "Wartung/Reparatur",
  billing: "Abrechnung",
  complaint: "Beschwerde",
  other: "Sonstiges",
};

interface Message {
  id: string;
  sender: "tenant" | "ai" | "human";
  content: string;
  createdAt: string;
  aiConfidence?: "high" | "medium" | "low";
}

interface TicketData {
  id: string;
  title: string;
  status: string;
  category: string;
  priority: string;
  createdAt: string;
  propertyAddress: string;
  unitDesignation: string;
  tenantName: string;
}

// Mock data for demo
const MOCK_TICKET: TicketData = {
  id: "t-1",
  title: "Heizung ausgefallen",
  status: "open",
  category: "maintenance",
  priority: "high",
  createdAt: new Date(Date.now() - 86400000).toISOString(),
  propertyAddress: "Musterstraße 12, 20095 Hamburg",
  unitDesignation: "Whg. 3",
  tenantName: "M. Richter",
};

const MOCK_MESSAGES: Message[] = [
  {
    id: "m-1",
    sender: "tenant",
    content: "Guten Tag, die Heizung in meiner Wohnung funktioniert seit gestern Abend nicht mehr. Es ist sehr kalt und ich habe bereits versucht, die Thermostate zurückzusetzen. Können Sie bitte schnell jemanden schicken?",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "m-2",
    sender: "ai",
    content: "Sehr geehrte/r Frau/Herr Richter, vielen Dank für Ihre Meldung. Wir haben Ihre Anfrage erhalten und als dringend eingestuft. Ein Techniker wird sich noch heute bei Ihnen melden, um das Problem zu beheben. Wir bitten um Ihr Verständnis für die Unannehmlichkeiten.",
    createdAt: new Date(Date.now() - 82800000).toISOString(),
    aiConfidence: "high",
  },
  {
    id: "m-3",
    sender: "tenant",
    content: "Vielen Dank für die schnelle Rückmeldung. Ich werde heute Nachmittag zu Hause sein.",
    createdAt: new Date(Date.now() - 72000000).toISOString(),
  },
];

function formatTime(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default function ChatDetailPage({ params }: { params: Promise<{ ticketId: string }> }) {
  const [ticketId, setTicketId] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [ticket, setTicket] = useState<TicketData>(MOCK_TICKET);
  const [replyText, setReplyText] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [closing, setClosing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    params.then(p => setTicketId(p.ticketId));
  }, [params]);

  useEffect(() => {
    if (!ticketId) return;
    
    // Fetch messages from API
    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/portal/chat/${ticketId}/messages`);
        if (res.ok) {
          const { data } = await res.json();
          if (data && data.length > 0) {
            setMessages(data.reverse()); // Oldest first
          }
        }
      } catch (e) {
        console.error("Error fetching messages:", e);
      }
    };
    
    fetchMessages();
  }, [ticketId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendReply = async () => {
    if (!replyText.trim() || !ticketId) return;
    
    setSending(true);
    try {
      const res = await fetch(`/api/portal/chat/${ticketId}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: replyText,
          landlordId: "demo", // TODO: Get from session
        }),
      });
      
      if (res.ok) {
        const { data } = await res.json();
        setMessages([...messages, {
          id: data.id,
          sender: "human",
          content: data.content,
          createdAt: data.createdAt,
        }]);
        setReplyText("");
        
        // Update ticket status locally
        setTicket({ ...ticket, status: "inprogress" });
      }
    } catch (e) {
      console.error("Error sending reply:", e);
    } finally {
      setSending(false);
    }
  };

  const handleCloseTicket = async () => {
    if (!ticketId) return;
    
    setClosing(true);
    try {
      // Update ticket status via API
      const res = await fetch(`/api/portal/tickets/${ticketId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "resolved" }),
      });
      
      if (res.ok) {
        setTicket({ ...ticket, status: "resolved" });
      }
    } catch (e) {
      console.error("Error closing ticket:", e);
    } finally {
      setClosing(false);
    }
  };

  const status = STATUS_CONFIG[ticket.status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.open;
  const priority = PRIORITY_CONFIG[ticket.priority] || PRIORITY_CONFIG.normal;

  return (
          {/* Sidebar */}

      {/* Main Content */}
      <div className="flex-1">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-10">
            <div className="flex items-center gap-4 mb-4">
              <Link href="/portal/chat" className="text-text-light hover:text-navy transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div className="flex-1">
                <h1 className="font-bold text-navy">{ticket.title}</h1>
                <p className="text-sm text-text-light">{ticket.tenantName} • {ticket.unitDesignation}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${status.bg} ${status.text}`}>
                  {status.label}
                </span>
                {ticket.status !== "resolved" && ticket.status !== "closed" && (
                  <button
                    onClick={handleCloseTicket}
                    disabled={closing}
                    className="px-3 py-1.5 bg-green-50 text-green-600 rounded-lg text-xs font-medium hover:bg-green-100 transition-colors"
                  >
                    {closing ? "..." : "Ticket schließen"}
                  </button>
                )}
              </div>
            </div>

            {/* Ticket Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-text-light pt-4 border-t border-gray-50">
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{ticket.propertyAddress}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span>{CATEGORY_LABELS[ticket.category] || ticket.category}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className={priority.color}>{priority.label}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{formatDate(ticket.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="px-6 py-6 space-y-6">
            {messages.map((msg, idx) => {
              const isTenant = msg.sender === "tenant";
              const isAI = msg.sender === "ai";
              const showDate = idx === 0 || 
                new Date(msg.createdAt).toDateString() !== new Date(messages[idx - 1].createdAt).toDateString();

              return (
                <div key={msg.id}>
                  {showDate && (
                    <div className="flex items-center justify-center my-6">
                      <span className="text-xs text-text-light bg-gray-100 px-3 py-1 rounded-full">
                        {formatDate(msg.createdAt)}
                      </span>
                    </div>
                  )}
                  <div className={`flex ${isTenant ? "justify-start" : "justify-end"}`}>
                    <div className={`max-w-[80%] sm:max-w-[70%] ${isTenant ? "" : "flex flex-col items-end"}`}>
                      {/* Sender Label */}
                      <div className="flex items-center gap-2 mb-1 px-1">
                        {isTenant ? (
                          <span className="text-xs text-text-light font-medium">{ticket.tenantName}</span>
                        ) : isAI ? (
                          <span className="text-xs text-teal font-medium">Automatische Antwort</span>
                        ) : (
                          <span className="text-xs text-navy font-medium">Verwalter</span>
                        )}
                      </div>

                      {/* Message Bubble */}
                      <div className={`relative px-4 py-3 rounded-2xl text-sm ${
                        isTenant
                          ? "bg-white border border-gray-100 text-text-main rounded-tl-sm shadow-sm"
                          : isAI
                          ? "bg-teal text-white rounded-tr-sm"
                          : "bg-navy text-white rounded-tr-sm"
                      }`}>
                        <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                        
                        {/* AI Confidence Badge */}
                        {isAI && msg.aiConfidence && (
                          <div className="mt-2 pt-2 border-t border-white/20">
                            <span className="text-xs text-white/70">
                              {msg.aiConfidence === "high" ? "Automatisch beantwortet" : "Manuell erforderlich"}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Time */}
                      <span className={`text-xs text-text-light mt-1 px-1 ${isTenant ? "" : "text-right"}`}>
                        {formatTime(msg.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Reply Box */}
          {ticket.status !== "resolved" && ticket.status !== "closed" && (
            <div className="sticky bottom-0 bg-light-gray px-6 py-4 border-t border-gray-200">
              <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Als Verwalter antworten..."
                  rows={3}
                  className="w-full px-0 py-2 text-navy resize-none outline-none text-sm placeholder:text-gray-400"
                />
                <div className="flex justify-end items-center gap-3 pt-3 border-t border-gray-50">
                  <button
                    onClick={handleSendReply}
                    disabled={!replyText.trim() || sending}
                    className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all flex items-center gap-2
                      ${replyText.trim() && !sending
                        ? "bg-teal text-white hover:bg-navy"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
                  >
                    {sending ? (
                      <>
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Senden...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Als Verwalter antworten
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
