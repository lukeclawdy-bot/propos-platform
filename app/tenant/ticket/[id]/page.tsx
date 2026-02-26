'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

const STATUS_LABEL: Record<string, string> = {
  open: 'Offen',
  inprogress: 'In Bearbeitung',
  resolved: 'Erledigt',
  closed: 'Abgeschlossen',
};

const STATUS_CLASS: Record<string, string> = {
  open: 'bg-red-100 text-red-700',
  inprogress: 'bg-amber-100 text-amber-700',
  resolved: 'bg-green-100 text-green-700',
  closed: 'bg-gray-100 text-gray-500',
};

const CATEGORY_LABEL: Record<string, string> = {
  repair: '🔧 Reparatur',
  water: '💧 Wasserschaden',
  heating: '🔥 Heizung',
  lock: '🔑 Schloss/Schlüssel',
  noise: '🔊 Lärm',
  other: '📋 Sonstiges',
};

function formatDateTime(d: string | null | undefined) {
  if (!d) return '—';
  return new Date(d).toLocaleString('de-DE', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

interface Message {
  id: string;
  direction: 'inbound' | 'outbound';
  body: string;
  createdAt: string;
  aiGenerated?: boolean;
}

interface TicketDetail {
  id: string;
  title: string;
  description: string | null;
  status: string;
  category: string | null;
  urgency: number | null;
  createdAt: string;
  updatedAt: string;
  resolvedAt: string | null;
  unitDesignation: string | null;
  propertyAddress: string | null;
  rating: number | null;
  messages: Message[];
}

// Star rating component
function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className="text-3xl transition-transform hover:scale-110 focus:outline-none"
        >
          <span className={(hover || value) >= star ? 'text-amber-400' : 'text-gray-200'}>★</span>
        </button>
      ))}
    </div>
  );
}

export default function TenantTicketPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [ticket, setTicket] = useState<TicketDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rating, setRating] = useState(0);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const [ratingLoading, setRatingLoading] = useState(false);

  const loadTicket = useCallback(async () => {
    try {
      const res = await fetch(`/api/tenant/tickets/${id}`);
      if (res.status === 401) { router.push('/tenant/login'); return; }
      if (res.status === 404) { setError('Ticket nicht gefunden.'); return; }
      if (!res.ok) { setError('Fehler beim Laden.'); return; }
      const { data } = await res.json();
      setTicket(data);
      if (data.rating) { setRating(data.rating); setRatingSubmitted(true); }
    } catch {
      setError('Verbindungsfehler.');
    } finally {
      setIsLoading(false);
    }
  }, [id, router]);

  useEffect(() => {
    loadTicket();
  }, [loadTicket]);

  const handleRating = async () => {
    if (!rating || ratingSubmitted) return;
    setRatingLoading(true);
    try {
      const res = await fetch(`/api/tenant/tickets/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating }),
      });
      if (res.ok) {
        setRatingSubmitted(true);
        setTicket(prev => prev ? { ...prev, rating } : prev);
      }
    } catch {
      // silent
    } finally {
      setRatingLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-400">
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          <span className="text-sm">Wird geladen…</span>
        </div>
      </div>
    );
  }

  if (error || !ticket) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <p className="text-red-500 text-sm mb-4">{error || 'Ticket nicht gefunden.'}</p>
        <Link href="/tenant/dashboard" className="text-teal hover:underline text-sm">← Zurück zur Übersicht</Link>
      </div>
    );
  }

  const isResolved = ticket.status === 'resolved' || ticket.status === 'closed';
  const ticketNum = `EV-${ticket.id.slice(0, 8).toUpperCase()}`;

  return (
    <div className="min-h-screen bg-slate-50 pb-8">
      {/* Nav */}
      <nav className="bg-navy text-white sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/tenant/dashboard" className="text-white/60 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <span className="font-bold text-sm flex-1">Ticket {ticketNum}</span>
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_CLASS[ticket.status] || STATUS_CLASS.open}`}>
            {STATUS_LABEL[ticket.status] || 'Offen'}
          </span>
        </div>
      </nav>

      <main className="max-w-lg mx-auto px-4 py-5 space-y-4">
        {/* Ticket header */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <p className="text-xs text-gray-400 mb-1">{ticket.category ? (CATEGORY_LABEL[ticket.category] || ticket.category) : 'Sonstiges'}</p>
              <h1 className="text-base font-bold text-navy">{ticket.title}</h1>
            </div>
          </div>

          {ticket.description && (
            <div className="bg-slate-50 rounded-xl p-3 mb-4">
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{ticket.description}</p>
            </div>
          )}

          <dl className="space-y-2 text-sm">
            {ticket.propertyAddress && (
              <div className="flex justify-between">
                <dt className="text-gray-400">Objekt</dt>
                <dd className="text-navy font-medium text-right max-w-[60%]">{ticket.propertyAddress}</dd>
              </div>
            )}
            {ticket.unitDesignation && (
              <div className="flex justify-between">
                <dt className="text-gray-400">Einheit</dt>
                <dd className="text-navy font-medium">{ticket.unitDesignation}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-gray-400">Erstellt</dt>
              <dd className="text-navy font-medium">{formatDateTime(ticket.createdAt)}</dd>
            </div>
            {ticket.updatedAt && ticket.updatedAt !== ticket.createdAt && (
              <div className="flex justify-between">
                <dt className="text-gray-400">Zuletzt aktualisiert</dt>
                <dd className="text-navy font-medium">{formatDateTime(ticket.updatedAt)}</dd>
              </div>
            )}
            {ticket.resolvedAt && (
              <div className="flex justify-between">
                <dt className="text-gray-400">Erledigt am</dt>
                <dd className="text-green-600 font-medium">{formatDateTime(ticket.resolvedAt)}</dd>
              </div>
            )}
          </dl>
        </div>

        {/* Rating CTA (only for resolved tickets) */}
        {isResolved && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-sm font-semibold text-navy mb-1">Wie zufrieden waren Sie mit der Bearbeitung?</h2>
            <p className="text-xs text-gray-400 mb-4">Ihr Feedback hilft uns, unseren Service zu verbessern.</p>

            {ratingSubmitted ? (
              <div className="text-center py-3">
                <div className="text-3xl mb-2">{'★'.repeat(rating)}{'☆'.repeat(5 - rating)}</div>
                <p className="text-sm text-gray-500">
                  {rating >= 4 ? 'Vielen Dank für Ihr positives Feedback! 🎉' :
                   rating === 3 ? 'Danke für Ihr Feedback.' :
                   'Danke — wir werden uns verbessern.'}
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <StarRating value={rating} onChange={setRating} />
                {rating > 0 && (
                  <button
                    onClick={handleRating}
                    disabled={ratingLoading}
                    className="bg-navy text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-navy/90 transition-colors disabled:opacity-50"
                  >
                    {ratingLoading ? 'Wird gespeichert…' : 'Bewertung abgeben'}
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Messages / Verlauf */}
        <div>
          <h2 className="text-sm font-semibold text-navy mb-3">Verlauf</h2>

          {ticket.messages.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center text-sm text-gray-400">
              Noch keine Nachrichten.
            </div>
          ) : (
            <div className="space-y-3">
              {[...ticket.messages].reverse().map((msg) => {
                const isTenant = msg.direction === 'inbound';
                return (
                  <div key={msg.id} className={`flex ${isTenant ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      isTenant
                        ? 'bg-navy text-white rounded-br-sm'
                        : 'bg-white border border-gray-100 shadow-sm text-navy rounded-bl-sm'
                    }`}>
                      {!isTenant && (
                        <p className="text-xs font-semibold text-teal mb-1">
                          einfach verwaltet.{msg.aiGenerated ? ' (Automatisch)' : ''}
                        </p>
                      )}
                      <p className="text-sm whitespace-pre-wrap">{msg.body}</p>
                      <p className={`text-xs mt-1.5 ${isTenant ? 'text-white/50' : 'text-gray-400'}`}>
                        {formatDateTime(msg.createdAt)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Status info */}
        <div className="bg-slate-50 rounded-2xl border border-gray-100 p-4 text-center">
          {isResolved ? (
            <p className="text-sm text-green-600 font-medium">✓ Dieses Ticket ist abgeschlossen.</p>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-2">Bei weiteren Fragen zu diesem Ticket:</p>
              <a
                href={`mailto:mieter@einfach-verwaltet.de?subject=Ticket ${ticketNum}`}
                className="inline-flex items-center gap-2 text-sm text-teal hover:underline font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                mieter@einfach-verwaltet.de
              </a>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
