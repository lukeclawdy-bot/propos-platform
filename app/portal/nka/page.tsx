/**
 * /portal/nka — NKA List Page
 *
 * Zeigt alle Objekte mit NKA-Status:
 *  - Abrechnungsjahr, Status (ausstehend/erstellt/versendet), §556 Abs. 3 Deadline
 * "Neue NKA erstellen" → /portal/nka/neu
 */

import Link from 'next/link';
import { cookies, headers } from 'next/headers';
import { getTokenFromCookie } from '@/lib/auth/jwt';
import { DemoBanner } from '@/components/DemoBanner';

// ─── Types ─────────────────────────────────────────────────────────────────

interface PropertyNkaStatus {
  id: string;
  address: string;
  postalCode: string;
  city: string;
  nkaStatus: 'ausstehend' | 'draft' | 'generated' | 'sent';
  abrechnungsjahr: number;
  deadline: string;
  recordId?: string;
}

// ─── Auth helper ───────────────────────────────────────────────────────────

async function getSessionInfo(): Promise<{ landlordId: string; isDemo: boolean }> {
  const hdrs = await headers();
  const fromHeader = hdrs.get('x-landlord-id');
  const isDemoHeader = hdrs.get('x-is-demo') === 'true';
  if (fromHeader) return { landlordId: fromHeader, isDemo: isDemoHeader };

  const cookieStore = await cookies();
  const demoToken = cookieStore.get('ev-demo-session')?.value;
  if (demoToken) {
    const payload = await getTokenFromCookie(demoToken);
    if (payload?.landlordId) return { landlordId: payload.landlordId, isDemo: true };
  }
  const token = cookieStore.get('portal_session')?.value;
  if (token) {
    const payload = await getTokenFromCookie(token);
    if (payload?.landlordId) return { landlordId: payload.landlordId, isDemo: !!payload.isDemo };
  }
  return { landlordId: process.env.DEMO_LANDLORD_ID || '', isDemo: false };
}

async function getNkaData(landlordId: string) {
  if (!landlordId) return null;
  try {
    const base = process.env.NEXT_PUBLIC_APP_URL || 'https://einfach-verwaltet.de';
    const res = await fetch(`${base}/api/portal/nka?landlordId=${landlordId}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// ─── Status badge ──────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const cfg: Record<string, { cls: string; label: string }> = {
    ausstehend: { cls: 'bg-amber-50 text-amber-700 border-amber-200', label: 'Ausstehend' },
    draft:      { cls: 'bg-blue-50 text-blue-700 border-blue-200',   label: 'Entwurf' },
    generated:  { cls: 'bg-green-50 text-green-700 border-green-200', label: 'Erstellt' },
    sent:       { cls: 'bg-teal/10 text-teal border-teal/30',        label: 'Versendet' },
  };
  const c = cfg[status] ?? cfg.ausstehend;
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${c.cls}`}>
      {c.label}
    </span>
  );
}

// ─── Sidebar ───────────────────────────────────────────────────────────────

function Sidebar({ active }: { active?: string }) {
  const navItems = [
    { label: 'Übersicht',    href: '/portal/dashboard' },
    { label: 'Chat',         href: '/portal/chat' },
    { label: 'Einheiten',    href: '/portal/einheiten' },
    { label: 'Mieter',       href: '/portal/mieter' },
    { label: 'Tickets',      href: '/portal/tickets' },
    { label: 'Partner',      href: '/portal/partner' },
    { label: 'Dokumente',    href: '/portal/dokumente' },
    { label: 'Vertrag',      href: '/portal/vertrag' },
    { label: 'Finanzen',     href: '/portal/finanzen' },
    { label: 'Mieterhöhung', href: '/portal/mieterhohung' },
    { label: 'NKA',          href: '/portal/nka', active: true },
    { label: 'Analysen',     href: '/portal/analytics' },
    { label: 'DATEV Export', href: '/portal/datev' },
  ];

  return (
    <aside className="w-56 bg-navy min-h-screen flex flex-col fixed left-0 top-0 bottom-0">
      <div className="px-5 py-5 border-b border-white/10">
        <a href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-teal rounded-md flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <span className="text-white text-sm font-bold">
            einfach <span className="text-teal">verwaltet.</span>
          </span>
        </a>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors
              ${'active' in item && item.active
                ? 'bg-teal/20 text-teal font-medium'
                : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="px-4 py-4 border-t border-white/10 space-y-2">
        <a href="/api/portal/auth/logout" className="block text-white/40 hover:text-white/70 text-xs transition-colors">
          Abmelden
        </a>
        <p className="text-white/30 text-xs">einfach verwaltet. v1</p>
      </div>
    </aside>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────

export default async function NkaListPage() {
  const { landlordId, isDemo } = await getSessionInfo();
  const data = await getNkaData(landlordId);

  const propertiesData: PropertyNkaStatus[] = data?.properties ?? [];

  const currentMonth = new Date().getMonth() + 1; // 1-12
  const showDeadlineWarning = currentMonth >= 10; // Okt, Nov, Dez

  const stats = {
    total: propertiesData.length,
    erstellt: propertiesData.filter(p => p.nkaStatus === 'generated' || p.nkaStatus === 'sent').length,
    ausstehend: propertiesData.filter(p => p.nkaStatus === 'ausstehend' || p.nkaStatus === 'draft').length,
  };

  return (
    <div className="min-h-screen bg-light-gray flex">
      <Sidebar />

      <div className="flex-1 ml-56">
        {isDemo && <DemoBanner />}

        <div className="max-w-5xl mx-auto px-8 py-8">

          {/* ── Header ── */}
          <div className="mb-8 flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-navy">Nebenkostenabrechnung</h1>
              <p className="text-text-light text-sm mt-0.5">
                Betriebskostenabrechnungen gemäß §2 BetrKV erstellen und verwalten.
              </p>
            </div>
            <Link
              href="/portal/nka/neu"
              className="flex items-center gap-2 px-4 py-2.5 bg-teal text-white text-sm font-semibold rounded-xl hover:bg-teal/90 transition-colors shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Neue NKA erstellen
            </Link>
          </div>

          {/* ── §556 Deadline Warning (Oct–Dec) ── */}
          {showDeadlineWarning && (
            <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
              <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <p className="text-sm font-semibold text-amber-800">Abrechnungsfrist läuft ab! (§556 Abs. 3 BGB)</p>
                <p className="text-xs text-amber-700 mt-0.5">
                  Die Nebenkostenabrechnungen für {new Date().getFullYear() - 1} müssen spätestens bis zum{' '}
                  <strong>31. Dezember {new Date().getFullYear()}</strong> beim Mieter eingegangen sein.
                  Nach Ablauf der Frist sind Nachforderungen ausgeschlossen — auch wenn der Mieter weniger
                  gezahlt hat als er schuldete.
                </p>
              </div>
            </div>
          )}

          {/* ── Stats ── */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Objekte gesamt', value: stats.total, cls: 'text-navy' },
              { label: 'NKA erstellt', value: stats.erstellt, cls: 'text-green-600' },
              { label: 'Ausstehend', value: stats.ausstehend, cls: 'text-amber-600' },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-5">
                <p className="text-xs text-text-light mb-1">{s.label}</p>
                <p className={`text-3xl font-bold ${s.cls}`}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* ── Table ── */}
          {propertiesData.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 px-8 py-16 text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-navy mb-1">Keine Objekte vorhanden</h3>
              <p className="text-sm text-text-light mb-6">
                Fügen Sie zuerst Objekte im Portal hinzu, um NKAs zu erstellen.
              </p>
              <Link
                href="/portal/einheiten"
                className="inline-flex items-center gap-2 px-4 py-2 bg-navy text-white text-sm font-medium rounded-lg hover:bg-navy/90 transition-colors"
              >
                Objekte hinzufügen
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="text-xs text-text-light uppercase tracking-wide bg-gray-50/80 border-b border-gray-100">
                    <th className="px-6 py-3 text-left">Objekt</th>
                    <th className="px-6 py-3 text-left">Abrechnungsjahr</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-left">Frist (§556 Abs. 3)</th>
                    <th className="px-6 py-3 text-right">Aktionen</th>
                  </tr>
                </thead>
                <tbody>
                  {propertiesData.map((prop) => {
                    const isPending = prop.nkaStatus === 'ausstehend' || prop.nkaStatus === 'draft';
                    return (
                      <tr key={prop.id} className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-navy">{prop.address}</p>
                          <p className="text-xs text-text-light mt-0.5">{prop.postalCode} {prop.city}</p>
                        </td>
                        <td className="px-6 py-4 text-sm text-navy">{prop.abrechnungsjahr}</td>
                        <td className="px-6 py-4">
                          <StatusBadge status={prop.nkaStatus} />
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-sm ${showDeadlineWarning && isPending ? 'text-amber-600 font-semibold' : 'text-text-light'}`}>
                            {prop.deadline}
                            {showDeadlineWarning && isPending && (
                              <span className="ml-1.5 text-xs">⚠️</span>
                            )}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {prop.recordId && (
                              <a
                                href={`/api/portal/nka/${prop.recordId}/pdf`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-teal/10 text-teal hover:bg-teal/20 transition-colors"
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Download
                              </a>
                            )}
                            <Link
                              href={`/portal/nka/neu?propertyId=${prop.id}`}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-navy/5 text-navy hover:bg-navy/10 transition-colors"
                            >
                              {isPending ? 'Erstellen' : 'Neue erstellen'}
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* ── Info ── */}
          <div className="mt-8 bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="text-sm font-bold text-navy mb-2">Rechtliche Grundlagen</h3>
            <ul className="text-xs text-text-light space-y-1">
              <li>• <strong>§556 Abs. 3 BGB</strong> — Abrechnung muss dem Mieter spätestens 12 Monate nach Ende des Abrechnungszeitraums zugehen.</li>
              <li>• <strong>§556a BGB</strong> — Verteilungsmaßstäbe (Standard: Wohnfläche).</li>
              <li>• <strong>§2 BetrKV</strong> — Abschließende Liste der umlagefähigen Betriebskosten.</li>
              <li>• Bei verspäteter Abrechnung verliert der Vermieter das Recht auf Nachforderungen — auch bei Unterzahlung durch den Mieter.</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
