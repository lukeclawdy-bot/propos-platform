'use client';

import { useState } from 'react';
import Link from 'next/link';

type Mode = 'email' | 'code';
type Step = 'input' | 'pin' | 'sent';

export default function TenantLoginPage() {
  const [mode, setMode] = useState<Mode>('email');
  const [step, setStep] = useState<Step>('input');
  const [email, setEmail] = useState('');
  const [unitCode, setUnitCode] = useState('');
  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [devToken, setDevToken] = useState<string | null>(null);

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const body = mode === 'email'
        ? { email: email.trim() }
        : { unitCode: unitCode.trim() };

      const res = await fetch('/api/tenant/auth/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Ein Fehler ist aufgetreten.');
        return;
      }

      if (data.token) setDevToken(data.token);
      setStep('pin');
    } catch {
      setError('Verbindungsfehler. Bitte erneut versuchen.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePinVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const emailForVerify = mode === 'email' ? email.trim() : '';
      const url = `/api/tenant/auth/verify?pin=${encodeURIComponent(pin.trim().toUpperCase())}&email=${encodeURIComponent(emailForVerify)}`;
      // Redirect — verify endpoint sets cookie and redirects to dashboard
      window.location.href = url;
    } catch {
      setError('Fehler bei der Verifikation.');
      setIsLoading(false);
    }
  };

  const Logo = () => (
    <div className="text-center mb-8">
      <Link href="/" className="inline-flex items-center gap-3">
        <div className="w-10 h-10 bg-teal rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </div>
        <span className="text-xl font-bold text-navy">einfach <span className="text-teal">verwaltet.</span></span>
      </Link>
      <p className="text-sm text-gray-500 mt-2">Mieterportal</p>
    </div>
  );

  // ── Step: Enter PIN ────────────────────────────────────────────────────────
  if (step === 'pin') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <Logo />
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="w-14 h-14 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg className="w-7 h-7 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-navy text-center mb-2">Code eingeben</h1>
            <p className="text-sm text-gray-500 text-center mb-6">
              {mode === 'email'
                ? `Wir haben einen 6-stelligen Code an ${email} geschickt.`
                : 'Wir haben einen Code an Ihre hinterlegte E-Mail gesendet.'}
            </p>

            {error && <div className="bg-red-50 text-red-600 text-sm rounded-lg p-3 mb-4">{error}</div>}

            <form onSubmit={handlePinVerify} className="space-y-4">
              <input
                type="text"
                value={pin}
                onChange={(e) => setPin(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''))}
                placeholder="XXXXXX"
                maxLength={6}
                required
                disabled={isLoading}
                className="w-full px-4 py-4 border border-gray-200 rounded-xl text-center text-2xl font-mono font-bold tracking-[0.5em] text-navy focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal disabled:opacity-50 uppercase"
                autoFocus
              />
              <button
                type="submit"
                disabled={isLoading || pin.length < 6}
                className="w-full bg-navy text-white font-semibold py-3.5 rounded-xl hover:bg-navy/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <><svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg>Wird geprüft...</>
                ) : 'Anmelden'}
              </button>
            </form>

            {devToken && (
              <div className="mt-4 bg-amber-50 rounded-lg p-3 text-xs">
                <p className="font-medium text-amber-800 mb-1">DEV: Magic Link</p>
                <a href={`/api/tenant/auth/verify?token=${devToken}`} className="text-teal underline break-all">
                  /api/tenant/auth/verify?token={devToken.slice(0, 20)}…
                </a>
              </div>
            )}

            <button
              onClick={() => { setStep('input'); setPin(''); setError(null); }}
              className="mt-5 w-full text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              ← Zurück
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Step: Input (email or unit code) ──────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <Logo />
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-xl font-bold text-navy mb-1">Willkommen</h1>
          <p className="text-sm text-gray-500 mb-6">Melden Sie sich mit Ihrer E-Mail oder Ihrem Wohnungscode an.</p>

          {/* Mode toggle */}
          <div className="flex bg-slate-100 rounded-xl p-1 mb-6">
            <button
              onClick={() => { setMode('email'); setError(null); }}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'email' ? 'bg-white text-navy shadow-sm' : 'text-gray-500 hover:text-navy'}`}
            >
              E-Mail
            </button>
            <button
              onClick={() => { setMode('code'); setError(null); }}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'code' ? 'bg-white text-navy shadow-sm' : 'text-gray-500 hover:text-navy'}`}
            >
              Wohnungscode
            </button>
          </div>

          {error && <div className="bg-red-50 text-red-600 text-sm rounded-lg p-3 mb-4">{error}</div>}

          <form onSubmit={handleRequest} className="space-y-4">
            {mode === 'email' ? (
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">E-Mail-Adresse</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ihre@email.de"
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-colors disabled:opacity-50"
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Wohnungscode</label>
                <input
                  type="text"
                  value={unitCode}
                  onChange={(e) => setUnitCode(e.target.value.toUpperCase())}
                  placeholder="z.B. A-01-EG"
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-colors font-mono disabled:opacity-50 uppercase"
                />
                <p className="text-xs text-gray-400 mt-1.5">Den Code finden Sie in Ihrem Mietvertrag oder haben ihn von Ihrer Hausverwaltung erhalten.</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || (mode === 'email' ? !email.trim() : !unitCode.trim())}
              className="w-full bg-navy text-white font-semibold py-3.5 rounded-xl hover:bg-navy/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <><svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg>Senden...</>
              ) : 'Code anfordern'}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400">
              Fragen? <a href="mailto:mieter@einfach-verwaltet.de" className="text-teal hover:underline">mieter@einfach-verwaltet.de</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
