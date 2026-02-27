import Link from "next/link";
import { cookies, headers } from "next/headers";
import { getTokenFromCookie } from "@/lib/auth/jwt";
import { getDemoMahnungData } from "@/lib/demo-data";
import { DemoBanner } from "@/components/DemoBanner";

// Types
interface OverdueTenant {
  tenantId: string;
  tenantName: string;
  propertyAddress: string;
  unitDesignation: string;
  coldRentCents: number;
  dueDate: string;
  daysOverdue: number;
  mahnungLevel: number;
  lastMahnungDate?: string;
  mahnungCount: number;
}

// Mahnung levels according to BGB §286
const MAHNUNG_LEVELS: Record<number, { label: string; description: string; color: string; icon: string }> = {
  1: {
    label: "Zahlungserinnerung",
    description: "Freundliche Erinnerung (0–7 Tage überfällig)",
    color: "bg-gray-100 text-gray-700",
    icon: "💬",
  },
  2: {
    label: "1. Mahnung",
    description: "Formelle Mahnung mit Fristsetzung (8–30 Tage)",
    color: "bg-amber-100 text-amber-700",
    icon: "⚠️",
  },
  3: {
    label: "2. Mahnung",
    description: "Letzte Mahnung vor Inkasso (31–60 Tage)",
    color: "bg-orange-100 text-orange-700",
    icon: "🚨",
  },
  4: {
    label: "Inkasso-Übergabe",
    description: "Rechtsanwalt/Inkasso (ab 60 Tagen)",
    color: "bg-red-100 text-red-700",
    icon: "⚖️",
  },
};

async function getSessionInfo(): Promise<{ landlordId: string; isDemo: boolean }> {
  const hdrs = await headers();
  const fromHeader = hdrs.get("x-landlord-id");
  const isDemoHeader = hdrs.get("x-is-demo") === "true";
  if (fromHeader) return { landlordId: fromHeader, isDemo: isDemoHeader };

  const cookieStore = await cookies();
  const demoToken = cookieStore.get("ev-demo-session")?.value;
  if (demoToken) {
    const payload = await getTokenFromCookie(demoToken);
    if (payload?.landlordId) return { landlordId: payload.landlordId, isDemo: true };
  }
  const token = cookieStore.get("portal_session")?.value;
  if (token) {
    const payload = await getTokenFromCookie(token);
    if (payload?.landlordId) return { landlordId: payload.landlordId, isDemo: !!payload.isDemo };
  }

  return { landlordId: process.env.DEMO_LANDLORD_ID || "", isDemo: false };
}

async function getMahnungData(landlordId: string): Promise<{ items: OverdueTenant[] } | null> {
  if (!landlordId) return null;
  try {
    const base = process.env.NEXT_PUBLIC_APP_URL || "https://einfach-verwaltet.de";
    const res = await fetch(`${base}/api/portal/miete?landlordId=${landlordId}&filter=overdue`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

function formatEuro(cents: number): string {
  return (cents / 100).toLocaleString("de-DE", { style: "currency", currency: "EUR" });
}

// Calculate Verzugszinsen (§288 BGB)
// Basiszinssatz (1.01.2026) = 1.27% + 5% = 6.27% p.a.
const VERZUGSZINS_RATE = 0.0627;

function calculateVerzugszinsen(amountCents: number, daysOverdue: number): number {
  // (Betrag × Tage × Zinssatz) / 365
  return Math.round((amountCents * daysOverdue * VERZUGSZINS_RATE) / 365);
}

// Generate Mahnung letter content
function generateMahnungLetter(item: OverdueTenant): string {
  const level = MAHNUNG_LEVELS[item.mahnungLevel] || MAHNUNG_LEVELS[1];
  const verzugszinsen = calculateVerzugszinsen(item.coldRentCents, item.daysOverdue);
  const totalAmount = item.coldRentCents + verzugszinsen;

  const today = new Date().toLocaleDateString("de-DE");

  const erinnerungText = `Sehr geehrte/r ${item.tenantName},

wir möchten Sie daran erinnern, dass die Miete für Ihre Wohnung ${item.unitDesignation} in ${item.propertyAddress} in Höhe von ${formatEuro(item.coldRentCents)} zum 3. des Monats fällig war.

Bisher haben wir Ihre Zahlung noch nicht erhalten. Bitte überweisen Sie den fälligen Betrag umgehend.

Bei bereits erfolgter Zahlung betrachten Sie dieses Schreiben als gegenstandslos.

Mit freundlichen Grüßen
Ihr Team von einfach verwaltet.`;

  const mahnung1Text = `Sehr geehrte/r ${item.tenantName},

trotz unserer Zahlungserinnerung vom ${item.lastMahnungDate ? new Date(item.lastMahnungDate).toLocaleDateString("de-DE") : today} haben wir Ihre Mietzahlung für die Wohnung ${item.unitDesignation} in ${item.propertyAddress} nicht erhalten.

Hiermit mahnen wir die fällige Miete in Höhe von ${formatEuro(item.coldRentCents)} unter Androhung der kürzungslosen Kündigung gemäß § 543 Abs. 2 Nr. 3 BGB an.

Bitte überweisen Sie den fälligen Betrag innerhalb von 7 Tagen auf folgendes Konto:

Empfänger: einfach verwaltet. GmbH
IBAN: DE00 0000 0000 0000 0000 00
BIC: XXXXXXXX
Verwendungszweck: Miete ${item.unitDesignation}

Nach § 286 BGB sind Sie mit dem 3. des Monats in Verzug geraten. Gemäß § 288 BGB schulden Sie Verzugszinsen in Höhe von 6,27% p.a. (${formatEuro(verzugszinsen)} für ${item.daysOverdue} Tage).

Gesamtforderung: ${formatEuro(totalAmount)}

Mit freundlichen Grüßen
Ihr Team von einfach verwaltet.`;

  const mahnung2Text = `Sehr geehrte/r ${item.tenantName},

wir weisen Sie erneut darauf hin, dass Sie trotz unserer Mahnung vom ${item.lastMahnungDate ? new Date(item.lastMahnungDate).toLocaleDateString("de-DE") : today} Ihre Mietverpflichtungen für die Wohnung ${item.unitDesignation} in ${item.propertyAddress} nicht erfüllt haben.

Fälliger Mietbetrag: ${formatEuro(item.coldRentCents)}
Verzugszinsen (${item.daysOverdue} Tage, 6,27% p.a.): ${formatEuro(verzugszinsen)}
Gesamtforderung: ${formatEuro(totalAmount)}

Dies ist unsere letzte Mahnung. Sollten wir den Gesamtbetrag nicht innerhalb von 7 Tagen erhalten, werden wir leider gezwungen sein:

1. Eine Kündigung des Mietverhältnisses auszusprechen (§ 543 Abs. 2 Nr. 3 BGB)
2. Rechtsanwaltschaftliche Inkassomaßnahmen einzuleiten
3. Eine Meldung an die SCHUFA vorzunehmen

Bitte vermeiden Sie unsere Leistungen und überweisen Sie umgehend auf:

Empfänger: einfach verwaltet. GmbH
IBAN: DE00 0000 0000 0000 0000 00
Verwendungszweck: Miete ${item.unitDesignation}

Mit freundlichen Grüßen
Ihr Team von einfach verwaltet.`;

  const inkassoText = `Sehr geehrte/r ${item.tenantName},

trotz mehrfacher Mahnungen haben Sie Ihre Mietzahlungen für die Wohnung ${item.unitDesignation} in ${item.propertyAddress} weiterhin nicht geleistet.

Gesamtforderung: ${formatEuro(totalAmount)}
inkl. Verzugszinsen (${item.daysOverdue} Tage, 6,27% p.a.): ${formatEuro(verzugszinsen)}

Wir haben heute die Forderung an unseren Rechtsanwalt zur Einleitung des gerichtlichen Mahnverfahrens übergeben.

Darüber hinaus wird eine Meldung an die SCHUFA vorgenommen.

Um weitere Kosten zu vermeiden, raten wir Ihnen dringend, noch heute den fälligen Betrag zu überweisen:

Empfänger: einfach verwaltet. GmbH
IBAN: DE00 0000 0000 0000 0000 00

Mit freundlichen Grüßen
Ihr Team von einfach verwaltet.`;

  switch (item.mahnungLevel) {
    case 1:
      return erinnerungText;
    case 2:
      return mahnung1Text;
    case 3:
      return mahnung2Text;
    case 4:
      return inkassoText;
    default:
      return erinnerungText;
  }
}

export default async function MahnungPage() {
  const { landlordId, isDemo } = await getSessionInfo();

  // Use demo data or fetch from API
  const data = isDemo
    ? getDemoMahnungData()
    : landlordId
    ? await getMahnungData(landlordId)
    : null;

  const items = data?.items || [];

  // Sort by days overdue (most overdue first)
  const sortedItems = items.sort((a, b) => b.daysOverdue - a.daysOverdue);

  // Group by mahnung level
  const groupedByLevel: Record<number, OverdueTenant[]> = {
    1: sortedItems.filter((i) => i.mahnungLevel === 1),
    2: sortedItems.filter((i) => i.mahnungLevel === 2),
    3: sortedItems.filter((i) => i.mahnungLevel === 3),
    4: sortedItems.filter((i) => i.mahnungLevel === 4),
  };

  return (
    <div className="min-h-screen bg-light-gray flex flex-col">
      {isDemo && <DemoBanner />}

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-56 bg-navy min-h-screen flex flex-col fixed left-0 top-0 bottom-0">
          <div className="px-5 py-5 border-b border-white/10">
            <a href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 bg-teal rounded-md flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
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
              { label: "Einheiten", href: "/portal/einheiten" },
              { label: "Mieter", href: "/portal/mieter" },
              { label: "Tickets", href: "/portal/tickets" },
              { label: "Partner", href: "/portal/partner" },
              { label: "Dokumente", href: "/portal/dokumente" },
              { label: "Vertrag", href: "/portal/vertrag" },
              { label: "Finanzen", href: "/portal/finanzen" },
              { label: "Mieterhöhung", href: "/portal/mieterhohung" },
              { label: "Miete", href: "/portal/miete", active: true },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  item.active
                    ? "bg-teal/20 text-teal font-medium"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
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

        {/* Main */}
        <div className="flex-1 ml-56">
          <div className="max-w-6xl mx-auto px-8 py-8">
            {/* Header */}
            <div className="mb-8">
              <Link href="/portal/miete" className="text-sm text-teal hover:underline mb-2 inline-block">
                ← Zurück zu Mietzahlungen
              </Link>
              <h1 className="text-2xl font-bold text-navy">Mahnungsmanagement</h1>
              <p className="text-text-light text-sm mt-0.5">
                {sortedItems.length} überfällige Mieter · Verzugszinsen: 6,27% p.a. (Basiszinssatz 1,27% + 5%)
              </p>
            </div>

            {sortedItems.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-navy mb-2">Keine überfälligen Mieten</h3>
                <p className="text-text-light">Alle Mieter sind aktuell mit ihren Zahlungen im Zeitplan.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Level 4: Inkasso (most urgent) */}
                {groupedByLevel[4].length > 0 && (
                  <section>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xl">⚖️</span>
                      <h2 className="text-lg font-bold text-red-700">Inkasso-Übergabe</h2>
                      <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-sm font-medium">
                        {groupedByLevel[4].length}
                      </span>
                    </div>
                    <div className="space-y-4">
                      {groupedByLevel[4].map((item) => (
                        <MahnungCard key={item.tenantId} item={item} />
                      ))}
                    </div>
                  </section>
                )}

                {/* Level 3: 2. Mahnung */}
                {groupedByLevel[3].length > 0 && (
                  <section>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xl">🚨</span>
                      <h2 className="text-lg font-bold text-orange-700">2. Mahnung</h2>
                      <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-sm font-medium">
                        {groupedByLevel[3].length}
                      </span>
                    </div>
                    <div className="space-y-4">
                      {groupedByLevel[3].map((item) => (
                        <MahnungCard key={item.tenantId} item={item} />
                      ))}
                    </div>
                  </section>
                )}

                {/* Level 2: 1. Mahnung */}
                {groupedByLevel[2].length > 0 && (
                  <section>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xl">⚠️</span>
                      <h2 className="text-lg font-bold text-amber-700">1. Mahnung</h2>
                      <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-sm font-medium">
                        {groupedByLevel[2].length}
                      </span>
                    </div>
                    <div className="space-y-4">
                      {groupedByLevel[2].map((item) => (
                        <MahnungCard key={item.tenantId} item={item} />
                      ))}
                    </div>
                  </section>
                )}

                {/* Level 1: Zahlungserinnerung */}
                {groupedByLevel[1].length > 0 && (
                  <section>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xl">💬</span>
                      <h2 className="text-lg font-bold text-gray-700">Zahlungserinnerung</h2>
                      <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-sm font-medium">
                        {groupedByLevel[1].length}
                      </span>
                    </div>
                    <div className="space-y-4">
                      {groupedByLevel[1].map((item) => (
                        <MahnungCard key={item.tenantId} item={item} />
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}

            {/* Legal reference */}
            <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-4">
              <p className="text-xs text-gray-600">
                <strong>Rechtliche Grundlage:</strong> § 286 BGB (Verzug), § 288 BGB (Verzugszinsen). Der gesetzliche
                Basiszinssatz beträgt seit 01.01.2026 1,27% p.a. Bei Mietrückständen können 5 Prozentpunkte darüber
                hinaus geltend gemacht werden (6,27% p.a. insgesamt).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Individual Mahnung card component
function MahnungCard({ item }: { item: OverdueTenant }) {
  const level = MAHNUNG_LEVELS[item.mahnungLevel] || MAHNUNG_LEVELS[1];
  const verzugszinsen = calculateVerzugszinsen(item.coldRentCents, item.daysOverdue);
  const totalAmount = item.coldRentCents + verzugszinsen;
  const letterContent = generateMahnungLetter(item);

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <span className="text-2xl">{level.icon}</span>
            <div>
              <h3 className="font-bold text-navy">{item.tenantName}</h3>
              <p className="text-sm text-text-light">
                {item.propertyAddress} · {item.unitDesignation}
              </p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-lg text-sm font-medium ${level.color}`}>{level.label}</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div>
            <p className="text-xs text-text-light uppercase">Mietrückstand</p>
            <p className="text-lg font-semibold text-navy">{formatEuro(item.coldRentCents)}</p>
          </div>
          <div>
            <p className="text-xs text-text-light uppercase">Tage überfällig</p>
            <p className="text-lg font-semibold text-red-600">{item.daysOverdue}</p>
          </div>
          <div>
            <p className="text-xs text-text-light uppercase">Verzugszinsen</p>
            <p className="text-lg font-semibold text-navy">{formatEuro(verzugszinsen)}</p>
          </div>
          <div>
            <p className="text-xs text-text-light uppercase">Gesamtforderung</p>
            <p className="text-lg font-bold text-red-600">{formatEuro(totalAmount)}</p>
          </div>
        </div>

        {/* Letter preview */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <p className="text-xs text-text-light uppercase tracking-wide mb-2">Mahnungsentwurf</p>
          <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed max-h-48 overflow-y-auto">
            {letterContent}
          </pre>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <Link
            href={`/api/portal/miete/mahnung/${item.tenantId}`}
            className="text-sm text-teal hover:underline"
          >
            Mahnungsverlauf anzeigen →
          </Link>
          <form action="/api/portal/miete/mahnung" method="POST" className="flex items-center gap-3">
            <input type="hidden" name="tenantId" value={item.tenantId} />
            <input type="hidden" name="mahnungLevel" value={item.mahnungLevel} />
            <input type="hidden" name="redirect" value="/portal/miete/mahnung" />
            <button
              type="submit"
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Mahnung senden & speichern
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
