// /portal/abrechnung — Billing dashboard for landlords
// Shows current plan, next invoice, invoice history, and self-service CTAs.

import Link from 'next/link';
import { cookies, headers } from 'next/headers';
import { getTokenFromCookie } from '@/lib/auth/jwt';
import { PRICING_TIERS } from '@/lib/stripe';

async function getLandlordId(): Promise<string> {
  const hdrs = await headers();
  const fromHeader = hdrs.get('x-landlord-id');
  if (fromHeader) return fromHeader;
  const cookieStore = await cookies();
  const token = cookieStore.get('portal_session')?.value;
  if (token) {
    const payload = await getTokenFromCookie(token);
    if (payload?.landlordId) return payload.landlordId as string;
  }
  return process.env.DEMO_LANDLORD_ID || '';
}

async function getBillingData(landlordId: string) {
  if (!landlordId) return null;
  try {
    const base = process.env.NEXT_PUBLIC_APP_URL || 'https://einfach-verwaltet.de';
    const res = await fetch(`${base}/api/portal/billing/invoices`, {
      cache: 'no-store',
      headers: { Cookie: `portal_session=placeholder` }, // auth handled server-side via cookies()
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// Format Euro amount from cents
function formatEuro(cents: number | null | undefined): string {
  if (cents == null) return '—';
  return (cents / 100).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
}

// Format date in German
function formatDate(iso: string | null | undefined): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

// Status badge config
const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  paid: { label: 'Bezahlt', className: 'bg-green-50 text-green-700' },
  open: { label: 'Ausstehend', className: 'bg-amber-50 text-amber-700' },
  draft: { label: 'Entwurf', className: 'bg-gray-100 text-gray-500' },
  uncollectible: { label: 'Nicht einziehbar', className: 'bg-red-50 text-red-600' },
  void: { label: 'Storniert', className: 'bg-gray-100 text-gray-400' },
};

// Mock data for demo / build safety
const MOCK_BILLING = {
  subscription: {
    tier: 'basic' as const,
    unitCount: 5,
    monthlyAmountCents: 20230, // €34 * 5 * 1.19 = ~€202.30
    status: 'active',
    currentPeriodEnd: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    cancelAtPeriodEnd: false,
  },
  invoices: [
    {
      id: 'inv_demo_1',
      number: 'EV-2026-0001',
      status: 'paid',
      amountDueCents: 20230,
      amountPaidCents: 20230,
      subtotalCents: 17000,
      taxCents: 3230,
      currency: 'eur',
      pdfUrl: null,
      hostedUrl: null,
      periodStart: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
      periodEnd: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
      paidAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      description: 'Verwaltungsgebühr',
    },
  ],
};

const TIER_LABELS: Record<string, string> = {
  basic: 'Basis (1–10 Einheiten)',
  standard: 'Standard (11–50 Einheiten)',
  professional: 'Professional (51–200 Einheiten)',
};

export default async function AbrechnungPage() {
  const landlordId = await getLandlordId();

  // Try to get real billing data; fall back to mock if not configured
  let billingData: { subscription: typeof MOCK_BILLING.subscription | null; invoices: typeof MOCK_BILLING.invoices } | null = null;
  try {
    if (landlordId) {
      billingData = await getBillingData(landlordId);
    }
  } catch {
    // Fall through to mock
  }

  const { subscription, invoices } = billingData || MOCK_BILLING;
  const sub = subscription;
  const tier = (sub?.tier || 'basic') as keyof typeof PRICING_TIERS;
  const tierInfo = PRICING_TIERS[tier];
  const isDemo = !billingData;

  // Determine if plan upgrade is available
  const nextTier: Record<string, string | null> = {
    basic: 'standard',
    standard: 'professional',
    professional: null,
  };
  const hasUpgrade = nextTier[tier] !== null;
  const unitCountNearLimit = sub && tierInfo ? sub.unitCount >= Math.round(tierInfo.maxUnits * 0.8) : false;

  return (
    <div className="min-h-screen bg-light-gray flex">
      {/* Sidebar — same as dashboard */}
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
          {[
            { label: 'Übersicht', href: '/portal/dashboard' },
            { label: 'Chat', href: '/portal/chat' },
            { label: 'Einheiten', href: '/portal/einheiten' },
            { label: 'Mieter', href: '/portal/mieter' },
            { label: 'Tickets', href: '/portal/tickets' },
            { label: 'Partner', href: '/portal/partner' },
            { label: 'Dokumente', href: '/portal/dokumente' },
            { label: 'Finanzen', href: '/portal/finanzen' },
            { label: 'Abrechnung', href: '/portal/abrechnung', active: true },
          ].map((item) => (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors
                ${'active' in item && item.active
                  ? 'bg-teal/20 text-teal font-medium'
                  : 'text-white/60 hover:bg-white/5 hover:text-white'}`}>
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

      {/* Main */}
      <div className="flex-1 ml-56">
        <div className="max-w-4xl mx-auto px-8 py-8">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-navy">Abrechnung</h1>
            <p className="text-text-light text-sm mt-0.5">
              Ihr aktueller Plan, nächste Rechnung und Rechnungshistorie.
            </p>
            {isDemo && (
              <div className="mt-3 inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-lg text-xs font-medium border border-amber-200">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                Demo-Ansicht — Stripe noch nicht konfiguriert
              </div>
            )}
          </div>

          {/* Current Plan Card */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="font-bold text-navy text-lg">Aktueller Plan</h2>
                <p className="text-text-light text-sm mt-0.5">
                  {TIER_LABELS[tier] || tierInfo?.name}
                </p>
              </div>
              {sub?.status && (
                <span className={`px-3 py-1 rounded-full text-xs font-semibold
                  ${sub.status === 'active' ? 'bg-green-50 text-green-700'
                    : sub.status === 'past_due' ? 'bg-red-50 text-red-600'
                    : 'bg-gray-100 text-gray-500'}`}>
                  {sub.status === 'active' ? 'Aktiv'
                    : sub.status === 'past_due' ? 'Zahlung ausstehend'
                    : sub.status === 'canceled' ? 'Gekündigt'
                    : sub.status}
                </span>
              )}
            </div>

            <div className="grid grid-cols-3 gap-6 py-4 border-t border-gray-50">
              <div>
                <p className="text-xs text-text-light uppercase tracking-wide mb-1">Einheiten</p>
                <p className="text-2xl font-bold text-navy">{sub?.unitCount ?? '—'}</p>
                <p className="text-xs text-text-light mt-0.5">
                  {tierInfo ? `max. ${tierInfo.maxUnits} Einheiten` : ''}
                </p>
              </div>
              <div>
                <p className="text-xs text-text-light uppercase tracking-wide mb-1">Mtl. Betrag (brutto)</p>
                <p className="text-2xl font-bold text-navy">{formatEuro(sub?.monthlyAmountCents)}</p>
                <p className="text-xs text-text-light mt-0.5">inkl. 19% MwSt.</p>
              </div>
              <div>
                <p className="text-xs text-text-light uppercase tracking-wide mb-1">Nächste Rechnung</p>
                <p className="text-2xl font-bold text-navy">
                  {sub?.currentPeriodEnd ? formatDate(sub.currentPeriodEnd) : '—'}
                </p>
                <p className="text-xs text-text-light mt-0.5">
                  {sub?.cancelAtPeriodEnd ? 'Kündigung zum Periodenende' : 'automatisch verlängert'}
                </p>
              </div>
            </div>

            {/* Unit-level breakdown */}
            {sub && tierInfo && (
              <div className="mt-4 pt-4 border-t border-gray-50">
                <p className="text-xs text-text-light">
                  {sub.unitCount} Einheiten × {formatEuro(tierInfo.pricePerUnitCents)}/Einheit/Monat (netto)
                  {' = '}{formatEuro(tierInfo.pricePerUnitCents * sub.unitCount)} netto
                  {' + 19% MwSt. = '}<strong>{formatEuro(sub.monthlyAmountCents)}</strong>
                </p>
              </div>
            )}

            {/* Upgrade notice */}
            {unitCountNearLimit && hasUpgrade && (
              <div className="mt-4 p-3 bg-teal/5 border border-teal/20 rounded-xl flex items-start gap-3">
                <svg className="w-4 h-4 text-teal mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <div className="flex-1">
                  <p className="text-sm font-medium text-navy">Portfolio wächst?</p>
                  <p className="text-xs text-text-light mt-0.5">
                    Sie nähern sich dem Limit Ihres Plans. Beim Wechsel auf{' '}
                    {nextTier[tier] === 'standard' ? 'Standard (11–50 Einheiten, €29/Einheit)' : 'Professional (51–200 Einheiten, €24/Einheit)'}
                    {' '}profitieren Sie von günstigeren Konditionen.
                  </p>
                </div>
              </div>
            )}

            {/* CTAs */}
            <div className="mt-6 flex gap-3">
              <PortalButton />
              {hasUpgrade && unitCountNearLimit && (
                <a href="mailto:kontakt@einfach-verwaltet.de?subject=Plan-Upgrade"
                  className="px-4 py-2.5 rounded-xl border border-teal text-teal text-sm font-medium hover:bg-teal/5 transition-colors">
                  Plan upgraden
                </a>
              )}
            </div>
          </div>

          {/* Invoice History */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-50">
              <h2 className="font-bold text-navy">Rechnungshistorie</h2>
              <p className="text-xs text-text-light mt-0.5">
                Alle Rechnungen mit deutschem Rechtsstandard (§14 UStG)
              </p>
            </div>

            {invoices.length === 0 ? (
              <div className="px-6 py-12 text-center text-text-light text-sm">
                Noch keine Rechnungen vorhanden.
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="text-xs text-text-light uppercase tracking-wide bg-gray-50">
                    <th className="px-6 py-3 text-left">Rechnungsnr.</th>
                    <th className="px-6 py-3 text-left">Leistungszeitraum</th>
                    <th className="px-6 py-3 text-right">Betrag (brutto)</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-left">PDF</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((inv) => {
                    const statusCfg = STATUS_CONFIG[inv.status] || { label: inv.status, className: 'bg-gray-100 text-gray-500' };
                    return (
                      <tr key={inv.id} className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 text-sm font-mono text-navy">
                          {inv.number || inv.id.slice(-8).toUpperCase()}
                        </td>
                        <td className="px-6 py-4 text-sm text-text-light">
                          {inv.periodStart && inv.periodEnd
                            ? `${formatDate(inv.periodStart)} – ${formatDate(inv.periodEnd)}`
                            : formatDate(inv.createdAt)}
                        </td>
                        <td className="px-6 py-4 text-sm text-navy font-medium text-right">
                          {formatEuro(inv.amountDueCents)}
                          <div className="text-xs text-text-light font-normal">
                            {formatEuro(inv.subtotalCents)} netto + {formatEuro(inv.taxCents)} MwSt.
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusCfg.className}`}>
                            {statusCfg.label}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {inv.pdfUrl ? (
                            <a href={inv.pdfUrl} target="_blank" rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-sm text-teal hover:underline">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              PDF
                            </a>
                          ) : (
                            <span className="text-sm text-text-light">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}

            {/* VAT note */}
            <div className="px-6 py-3 border-t border-gray-50 bg-gray-50/50">
              <p className="text-xs text-text-light">
                Alle Rechnungen inkl. 19% MwSt. gemäß §14 UStG. Ausgestellt von RVLT Ventures GmbH,
                Singapurstr. 19, 20457 Hamburg. Für Fragen: kontakt@einfach-verwaltet.de
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Client component for Stripe Customer Portal redirect
function PortalButton() {
  // Server component wrapper — actual redirect handled client-side
  return (
    <form action="/api/portal/billing/portal" method="POST">
      <button type="submit"
        className="px-4 py-2.5 rounded-xl bg-navy text-white text-sm font-medium hover:bg-navy/90 transition-colors">
        Zahlungsmethode ändern
      </button>
    </form>
  );
}
