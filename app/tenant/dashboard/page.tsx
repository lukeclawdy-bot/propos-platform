import Link from 'next/link';
import { cookies, headers } from 'next/headers';
import { getTenantTokenFromCookie } from '@/lib/auth/tenant-jwt';

async function getTenantId(): Promise<string> {
  // Prefer header injected by middleware
  const hdrs = await headers();
  const fromHeader = hdrs.get('x-tenant-id');
  if (fromHeader) return fromHeader;

  // Fallback: parse cookie
  const cookieStore = await cookies();
  const token = cookieStore.get('tenant_session')?.value;
  if (token) {
    const payload = await getTenantTokenFromCookie(token);
    if (payload?.tenantId) return payload.tenantId;
  }
  return '';
}

async function fetchTenantData(tenantId: string) {
  if (!tenantId) return null;
  try {
    const base = process.env.NEXT_PUBLIC_APP_URL || 'https://einfach-verwaltet.de';
    const res = await fetch(`${base}/api/tenant/me`, {
      cache: 'no-store',
      headers: { 'x-tenant-id': tenantId },
    });
    if (!res.ok) return null;
    const { data } = await res.json();
    return data;
  } catch { return null; }
}

async function fetchTickets(tenantId: string) {
  if (!tenantId) return [];
  try {
    const base = process.env.NEXT_PUBLIC_APP_URL || 'https://einfach-verwaltet.de';
    const res = await fetch(`${base}/api/tenant/tickets`, {
      cache: 'no-store',
      headers: { 'x-tenant-id': tenantId },
    });
    if (!res.ok) return [];
    const { data } = await res.json();
    return data || [];
  } catch { return []; }
}

const STATUS_LABEL: Record<string, string> = {
  open: 'Offen',
  inprogress: 'In Bearbeitung',
  resolved: 'Erledigt',
  closed: 'Abgeschlossen',
};

const STATUS_CLASS: Record<string, string> = {
  open: 'bg-red-50 text-red-600',
  inprogress: 'bg-amber-50 text-amber-700',
  resolved: 'bg-green-50 text-green-700',
  closed: 'bg-gray-100 text-gray-500',
};

function formatDate(d: string | null | undefined) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

// Demo/fallback data when not yet connected to DB
const MOCK = {
  tenant: { firstName: 'Max', lastName: 'Mustermann', email: 'max@example.de' },
  unit: { designation: 'Wohnung 3', floor: 1, areaM2: '68.50' },
  property: { address: 'Musterstraße 12', postalCode: '20099', city: 'Hamburg' },
  landlord: { name: 'einfach verwaltet.', email: 'mieter@einfach-verwaltet.de' },
};

const MOCK_TICKETS = [
  { id: 'demo-1', title: 'Heizung ausgefallen', status: 'inprogress', category: 'heating', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
];

export default async function TenantDashboardPage() {
  const tenantId = await getTenantId();
  const [tenantData, allTickets] = await Promise.all([
    fetchTenantData(tenantId),
    fetchTickets(tenantId),
  ]);

  const d = tenantData || MOCK;
  const tickets = allTickets.length > 0 ? allTickets : (tenantId ? [] : MOCK_TICKETS);
  const openTickets = tickets.filter((t: { status: string }) => t.status === 'open' || t.status === 'inprogress');
  const resolvedTickets = tickets.filter((t: { status: string }) => t.status === 'resolved' || t.status === 'closed');

  const fullAddress = d.property
    ? `${d.property.address}, ${d.property.postalCode} ${d.property.city}`
    : null;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top nav */}
      <nav className="bg-navy text-white sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-teal rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <span className="font-bold text-sm">einfach <span className="text-teal">verwaltet.</span></span>
          </Link>
          <a
            href="/api/tenant/auth/logout"
            className="text-white/50 hover:text-white text-xs transition-colors"
          >
            Abmelden
          </a>
        </div>
      </nav>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-5">
        {/* Greeting */}
        <div>
          <h1 className="text-xl font-bold text-navy">
            Hallo, {d.tenant?.firstName || 'Mieter'} 👋
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">Ihr Mieterportal — alles auf einen Blick</p>
        </div>

        {/* 3 primary CTAs */}
        <div className="grid grid-cols-3 gap-3">
          <Link
            href="/tenant/neu"
            className="flex flex-col items-center gap-2 bg-teal text-white rounded-2xl p-4 shadow-sm hover:bg-teal/90 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-xs font-semibold text-center leading-tight">Neues Anliegen</span>
          </Link>
          <a
            href="#offene-tickets"
            className="flex flex-col items-center gap-2 bg-white text-navy rounded-2xl p-4 shadow-sm hover:bg-slate-50 transition-colors border border-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span className="text-xs font-semibold text-center leading-tight">
              Meine Tickets
              {openTickets.length > 0 && (
                <span className="block mt-0.5 text-teal">{openTickets.length} offen</span>
              )}
            </span>
          </a>
          <a
            href="mailto:mieter@einfach-verwaltet.de"
            className="flex flex-col items-center gap-2 bg-white text-navy rounded-2xl p-4 shadow-sm hover:bg-slate-50 transition-colors border border-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-xs font-semibold text-center leading-tight">Kontakt</span>
          </a>
        </div>

        {/* Property info */}
        {(d.unit || d.property) && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-sm font-semibold text-navy mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Ihre Wohnung
            </h2>
            <dl className="space-y-2">
              {d.unit?.designation && (
                <div className="flex justify-between text-sm">
                  <dt className="text-gray-500">Einheit</dt>
                  <dd className="font-medium text-navy">{d.unit.designation}</dd>
                </div>
              )}
              {fullAddress && (
                <div className="flex justify-between text-sm">
                  <dt className="text-gray-500">Adresse</dt>
                  <dd className="font-medium text-navy text-right max-w-[60%]">{fullAddress}</dd>
                </div>
              )}
              {d.unit?.floor !== null && d.unit?.floor !== undefined && (
                <div className="flex justify-between text-sm">
                  <dt className="text-gray-500">Etage</dt>
                  <dd className="font-medium text-navy">{d.unit.floor === 0 ? 'Erdgeschoss' : `${d.unit.floor}. Etage`}</dd>
                </div>
              )}
              {d.unit?.areaM2 && (
                <div className="flex justify-between text-sm">
                  <dt className="text-gray-500">Wohnfläche</dt>
                  <dd className="font-medium text-navy">{d.unit.areaM2} m²</dd>
                </div>
              )}
            </dl>
          </div>
        )}

        {/* Open tickets */}
        <div id="offene-tickets">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-navy">Offene Anfragen</h2>
            {openTickets.length > 0 && (
              <span className="text-xs bg-teal/10 text-teal px-2 py-0.5 rounded-full font-medium">
                {openTickets.length}
              </span>
            )}
          </div>

          {openTickets.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
              <svg className="w-10 h-10 text-green-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-gray-500">Alles erledigt — keine offenen Anfragen.</p>
              <Link href="/tenant/neu" className="inline-block mt-3 text-sm text-teal hover:underline font-medium">
                + Neue Anfrage stellen
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              {openTickets.map((t: {
                id: string; title: string; status: string;
                category: string | null; createdAt: string; updatedAt: string;
              }) => (
                <Link
                  key={t.id}
                  href={`/tenant/ticket/${t.id}`}
                  className="flex items-center gap-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:border-teal/30 hover:shadow-md transition-all"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-navy text-sm truncate">{t.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Erstellt {formatDate(t.createdAt)} · Aktualisiert {formatDate(t.updatedAt)}
                    </p>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium whitespace-nowrap ${STATUS_CLASS[t.status] || STATUS_CLASS.open}`}>
                    {STATUS_LABEL[t.status] || 'Offen'}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Resolved tickets */}
        {resolvedTickets.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-navy mb-3">Erledigte Anfragen</h2>
            <div className="space-y-2">
              {resolvedTickets.map((t: {
                id: string; title: string; status: string;
                resolvedAt: string | null; rating: number | null;
              }) => (
                <Link
                  key={t.id}
                  href={`/tenant/ticket/${t.id}`}
                  className="flex items-center gap-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 opacity-75 hover:opacity-100 hover:border-green-200 transition-all"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-navy text-sm truncate">{t.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Erledigt {formatDate(t.resolvedAt)}
                      {t.rating ? ` · ${'★'.repeat(t.rating)}` : ' · Bewertung ausstehend'}
                    </p>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-green-50 text-green-700">Erledigt</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Contact info */}
        <div className="bg-navy rounded-2xl p-5 text-white">
          <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Ihre Hausverwaltung
          </h2>
          <p className="text-white/60 text-xs mb-3">einfach verwaltet.</p>
          <a
            href="mailto:mieter@einfach-verwaltet.de"
            className="flex items-center gap-2 text-sm text-teal hover:text-teal/80 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            mieter@einfach-verwaltet.de
          </a>
          <p className="text-white/40 text-xs mt-3">
            Für dringende Schäden nutzen Sie bitte das Formular &quot;Neues Anliegen&quot; und wählen Sie die Dringlichkeitsstufe &quot;Dringend&quot;.
          </p>
        </div>
      </main>
    </div>
  );
}
