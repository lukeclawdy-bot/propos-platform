'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

type Step = 'email' | 'pin';

export default function PortalLoginPage() {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 6 individual PIN input refs for auto-advance
  const pinRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (step === 'pin') {
      setTimeout(() => pinRefs.current[0]?.focus(), 100);
    }
  }, [step]);

  // ── Step 1: send PIN ──────────────────────────────────────────────────────
  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/portal/auth/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Ein Fehler ist aufgetreten.');
        return;
      }

      if (data.noAccount) {
        window.location.href = `/portal/onboarding?email=${encodeURIComponent(email.trim())}`;
        return;
      }

      setStep('pin');
    } catch {
      setError('Verbindungsfehler. Bitte versuchen Sie es erneut.');
    } finally {
      setIsLoading(false);
    }
  }

  // ── Step 2: verify PIN ────────────────────────────────────────────────────
  async function handlePinSubmit(e: React.FormEvent) {
    e.preventDefault();
    const fullPin = pin.join('');
    if (fullPin.length !== 6) return;

    setIsLoading(true);
    setError(null);

    try {
      // Redirect to verify route which sets the session cookie
      window.location.href = `/api/portal/auth/verify?pin=${fullPin}&email=${encodeURIComponent(email.trim())}`;
    } catch {
      setError('Fehler bei der Verifizierung. Bitte versuchen Sie es erneut.');
      setIsLoading(false);
    }
  }

  // ── PIN input handlers ────────────────────────────────────────────────────
  function handlePinChange(index: number, value: string) {
    // Only allow digits
    const digit = value.replace(/\D/g, '').slice(-1);
    const newPin = [...pin];
    newPin[index] = digit;
    setPin(newPin);

    // Auto-advance
    if (digit && index < 5) {
      pinRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all 6 filled
    if (digit && index === 5) {
      const fullPin = [...newPin].join('');
      if (fullPin.length === 6) {
        setIsLoading(true);
        window.location.href = `/api/portal/auth/verify?pin=${fullPin}&email=${encodeURIComponent(email.trim())}`;
      }
    }
  }

  function handlePinKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      pinRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowLeft' && index > 0) pinRefs.current[index - 1]?.focus();
    if (e.key === 'ArrowRight' && index < 5) pinRefs.current[index + 1]?.focus();
  }

  function handlePinPaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;
    const newPin = [...pin];
    for (let i = 0; i < 6; i++) {
      newPin[i] = pasted[i] || '';
    }
    setPin(newPin);
    const nextEmpty = newPin.findIndex((d) => !d);
    const focusIdx = nextEmpty === -1 ? 5 : nextEmpty;
    pinRefs.current[focusIdx]?.focus();

    if (pasted.length === 6) {
      setIsLoading(true);
      window.location.href = `/api/portal/auth/verify?pin=${pasted}&email=${encodeURIComponent(email.trim())}`;
    }
  }

  // ── Shared shell ──────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-light-gray flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-10 h-10 bg-teal rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <span className="text-xl font-bold text-navy">
              einfach <span className="text-teal">verwaltet.</span>
            </span>
          </Link>
          <p className="text-text-light text-sm mt-2">Eigentümer-Login</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">

          {/* ── Step 1: Email ── */}
          {step === 'email' && (
            <>
              <h1 className="text-xl font-bold text-navy mb-2">Anmelden</h1>
              <p className="text-text-light text-sm mb-6">
                Geben Sie Ihre E-Mail-Adresse ein — wir senden Ihnen einen 6-stelligen Code.
              </p>

              {error && (
                <div className="bg-red-50 text-red-600 text-sm rounded-lg p-3 mb-4">{error}</div>
              )}

              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-navy mb-1.5">
                    E-Mail-Adresse
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ihre@email.de"
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-colors disabled:opacity-50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !email.trim()}
                  className="w-full bg-navy text-white font-medium py-3 rounded-xl hover:bg-navy/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Wird gesendet…
                    </>
                  ) : (
                    'Code senden →'
                  )}
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                <p className="text-xs text-text-light/70">
                  Noch kein Konto?{' '}
                  <Link href="/anfrage" className="text-teal hover:underline">
                    Jetzt anfragen
                  </Link>
                </p>
              </div>
            </>
          )}

          {/* ── Step 2: PIN ── */}
          {step === 'pin' && (
            <>
              {/* Back button */}
              <button
                onClick={() => { setStep('email'); setPin(['','','','','','']); setError(null); }}
                className="flex items-center gap-1.5 text-sm text-text-light hover:text-navy transition-colors mb-6"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Zurück
              </button>

              <div className="text-center mb-6">
                <div className="w-14 h-14 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h1 className="text-xl font-bold text-navy mb-2">Code eingeben</h1>
                <p className="text-text-light text-sm">
                  Wir haben einen 6-stelligen Code an<br />
                  <span className="font-medium text-navy">{email}</span> gesendet.
                </p>
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 text-sm rounded-lg p-3 mb-4 text-center">{error}</div>
              )}

              <form onSubmit={handlePinSubmit}>
                {/* 6-digit PIN boxes */}
                <div className="flex gap-2 justify-center mb-6" onPaste={handlePinPaste}>
                  {pin.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => { pinRefs.current[i] = el; }}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handlePinChange(i, e.target.value)}
                      onKeyDown={(e) => handlePinKeyDown(i, e)}
                      disabled={isLoading}
                      className="w-11 h-14 text-center text-2xl font-bold text-navy border-2 border-gray-200 rounded-xl focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-colors disabled:opacity-50 bg-gray-50 focus:bg-white"
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={isLoading || pin.join('').length !== 6}
                  className="w-full bg-navy text-white font-medium py-3 rounded-xl hover:bg-navy/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Wird geprüft…
                    </>
                  ) : (
                    'Anmelden →'
                  )}
                </button>
              </form>

              <div className="mt-5 text-center">
                <p className="text-xs text-text-light/70">
                  Keinen Code erhalten?{' '}
                  <button
                    onClick={() => { setStep('email'); setPin(['','','','','','']); setError(null); }}
                    className="text-teal hover:underline"
                  >
                    Erneut senden
                  </button>
                </p>
              </div>
            </>
          )}
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-text-light hover:text-navy transition-colors mt-6 mx-auto w-full justify-center"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Zurück zur Startseite
        </Link>
      </div>
    </div>
  );
}
