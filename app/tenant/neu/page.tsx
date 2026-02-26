'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Category = { value: string; label: string; icon: string };
type UrgencyOption = { value: number; label: string; sub: string };

const CATEGORIES: Category[] = [
  { value: 'repair',  label: 'Reparatur',       icon: '🔧' },
  { value: 'water',   label: 'Wasserschaden',    icon: '💧' },
  { value: 'heating', label: 'Heizung',          icon: '🔥' },
  { value: 'lock',    label: 'Schloss / Schlüssel', icon: '🔑' },
  { value: 'noise',   label: 'Lärm',             icon: '🔊' },
  { value: 'other',   label: 'Sonstiges',        icon: '📋' },
];

const URGENCY_OPTIONS: UrgencyOption[] = [
  { value: 1, label: 'Dringend',        sub: 'Reaktion innerhalb 24 Stunden' },
  { value: 2, label: 'Normal',          sub: 'Bearbeitung in 5 Werktagen' },
  { value: 3, label: 'Nicht dringend', sub: 'Termin nach Vereinbarung' },
];

const CATEGORY_LABELS: Record<string, string> = {
  repair: 'Reparatur',
  water: 'Wasserschaden',
  heating: 'Heizung',
  lock: 'Schloss/Schlüssel',
  noise: 'Lärm',
  other: 'Sonstiges',
};

export default function TenantNeuPage() {
  const router = useRouter();
  const [category, setCategory] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState<number>(2);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<{ id: string; ticketNum: string } | null>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setPhotoPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const isValid = category && description.trim().length >= 20;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setIsLoading(true);
    setError(null);

    try {
      // Build title from category
      const title = `${CATEGORY_LABELS[category!]}: ${description.trim().slice(0, 60)}${description.trim().length > 60 ? '…' : ''}`;

      const res = await fetch('/api/tenant/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description: description.trim(),
          category: category!,
          urgency,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          router.push('/tenant/login');
          return;
        }
        setError(data.error || 'Fehler beim Absenden. Bitte erneut versuchen.');
        return;
      }

      // Generate a human-readable ticket number from UUID prefix
      const ticketNum = `EV-${(data.data?.id || '').slice(0, 8).toUpperCase()}`;
      setSubmitted({ id: data.data?.id || '', ticketNum });
    } catch {
      setError('Verbindungsfehler. Bitte erneut versuchen.');
    } finally {
      setIsLoading(false);
    }
  };

  // ── Confirmation screen ────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <nav className="bg-navy text-white">
          <div className="max-w-lg mx-auto px-4 h-14 flex items-center">
            <span className="font-bold text-sm">einfach <span className="text-teal">verwaltet.</span></span>
          </div>
        </nav>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-sm w-full text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-navy mb-2">Anfrage gesendet!</h1>
            <p className="text-gray-500 mb-4">
              Ihre Anfrage wurde erfolgreich übermittelt. Wir melden uns schnellstmöglich bei Ihnen.
            </p>
            <div className="bg-navy/5 rounded-2xl p-4 mb-6 inline-block">
              <p className="text-xs text-gray-500 mb-1">Ihre Ticketnummer</p>
              <p className="text-2xl font-bold font-mono text-navy tracking-widest">{submitted.ticketNum}</p>
            </div>
            <div className="flex flex-col gap-3">
              {submitted.id && (
                <Link
                  href={`/tenant/ticket/${submitted.id}`}
                  className="block w-full bg-navy text-white font-semibold py-3 rounded-xl hover:bg-navy/90 transition-colors"
                >
                  Ticket ansehen
                </Link>
              )}
              <Link
                href="/tenant/dashboard"
                className="block w-full bg-white border border-gray-200 text-navy font-semibold py-3 rounded-xl hover:bg-slate-50 transition-colors"
              >
                Zurück zur Übersicht
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Form ───────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-navy text-white sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/tenant/dashboard" className="text-white/60 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <span className="font-bold text-sm">Neue Anfrage</span>
        </div>
      </nav>

      <main className="max-w-lg mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-700 text-sm rounded-xl p-4">
              {error}
            </div>
          )}

          {/* Category selector */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-sm font-semibold text-navy mb-4">
              Art des Anliegens <span className="text-red-500">*</span>
            </h2>
            <div className="grid grid-cols-3 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setCategory(cat.value)}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all text-center ${
                    category === cat.value
                      ? 'border-teal bg-teal/5 text-navy'
                      : 'border-gray-100 bg-white text-gray-600 hover:border-gray-200'
                  }`}
                >
                  <span className="text-2xl">{cat.icon}</span>
                  <span className="text-xs font-medium leading-tight">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <label className="block text-sm font-semibold text-navy mb-3">
              Beschreibung <span className="text-red-500">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Bitte beschreiben Sie das Problem so genau wie möglich. Was ist passiert? Seit wann? Wo genau?"
              rows={5}
              required
              minLength={20}
              disabled={isLoading}
              className="w-full px-3 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-colors resize-none disabled:opacity-50"
            />
            <div className="flex justify-between mt-1.5">
              <p className={`text-xs ${description.trim().length < 20 && description.length > 0 ? 'text-red-500' : 'text-gray-400'}`}>
                {description.trim().length < 20
                  ? `Noch ${20 - description.trim().length} Zeichen mindestens`
                  : `${description.trim().length} Zeichen`}
              </p>
            </div>
          </div>

          {/* Urgency / Dringlichkeit */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-sm font-semibold text-navy mb-4">Dringlichkeit</h2>
            <div className="space-y-2">
              {URGENCY_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setUrgency(opt.value)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                    urgency === opt.value
                      ? 'border-teal bg-teal/5'
                      : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                    urgency === opt.value ? 'border-teal bg-teal' : 'border-gray-300'
                  }`} />
                  <div>
                    <p className={`text-sm font-medium ${urgency === opt.value ? 'text-navy' : 'text-gray-700'}`}>
                      {opt.label}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{opt.sub}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Photo upload */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-sm font-semibold text-navy mb-1">Foto hinzufügen <span className="font-normal text-gray-400">(optional)</span></h2>
            <p className="text-xs text-gray-400 mb-4">Ein Foto hilft uns, das Problem schneller einzuschätzen.</p>

            {photoPreview ? (
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photoPreview} alt="Vorschau" className="w-full h-48 object-cover rounded-xl" />
                <button
                  type="button"
                  onClick={() => { setPhotoFile(null); setPhotoPreview(null); }}
                  className="absolute top-2 right-2 bg-black/60 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs hover:bg-black/80 transition-colors"
                >
                  ✕
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center gap-2 p-6 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-teal/50 hover:bg-teal/5 transition-colors">
                <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm text-gray-500">Foto aufnehmen oder hochladen</span>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="sr-only"
                  onChange={handlePhotoChange}
                />
              </label>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!isValid || isLoading}
            className="w-full bg-teal text-white font-bold py-4 rounded-2xl text-base hover:bg-teal/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
          >
            {isLoading ? (
              <><svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg>Wird gesendet…</>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Anfrage senden
              </>
            )}
          </button>

          <p className="text-xs text-gray-400 text-center pb-4">
            Durch das Absenden stimmen Sie zu, dass wir Ihre Anfrage zur Bearbeitung weitergeben dürfen.
          </p>
        </form>
      </main>
    </div>
  );
}
