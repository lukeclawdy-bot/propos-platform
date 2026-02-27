import { cookies, headers } from "next/headers";
import { getTokenFromCookie } from "@/lib/auth/jwt";
import { redirect } from "next/navigation";
import { EinstellungenClient } from "./EinstellungenClient";

async function getLandlordId(): Promise<string> {
  const hdrs = await headers();
  const fromHeader = hdrs.get("x-landlord-id");
  if (fromHeader) return fromHeader;

  const cookieStore = await cookies();
  const token = cookieStore.get("portal_session")?.value;
  if (token) {
    const payload = await getTokenFromCookie(token);
    if (payload?.landlordId) return payload.landlordId;
  }

  return process.env.DEMO_LANDLORD_ID || "";
}

async function getLandlord(landlordId: string) {
  if (!landlordId) return null;
  try {
    const base = process.env.NEXT_PUBLIC_APP_URL || "https://einfach-verwaltet.de";
    const res = await fetch(
      `${base}/api/portal/landlord?id=${landlordId}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    const { data } = await res.json();
    return data;
  } catch {
    return null;
  }
}

export default async function EinstellungenPage() {
  const landlordId = await getLandlordId();
  
  if (!landlordId) {
    redirect("/portal/login");
  }

  const landlord = await getLandlord(landlordId);

  if (!landlord) {
    redirect("/portal/login");
  }

  return (
    <div className="min-h-screen bg-light-gray flex">
      {/* Sidebar */}
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
            { label: "Übersicht", href: "/portal/dashboard", active: false },
            { label: "Chat", href: "/portal/chat", active: false },
            { label: "Einheiten", href: "/portal/einheiten", active: false },
            { label: "Mieter", href: "/portal/mieter", active: false },
            { label: "Tickets", href: "/portal/tickets", active: false },
            { label: "Partner", href: "/portal/partner", active: false },
            { label: "Dokumente", href: "/portal/dokumente", active: false },
            { label: "Vertrag", href: "/portal/vertrag", active: false },
            { label: "Finanzen", href: "/portal/finanzen", active: false },
            { label: "Analysen", href: "/portal/analytics", active: false },
            { label: "Mieterhöhung", href: "/portal/mieterhohung", active: false },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors
                ${
                  item.active
                    ? "bg-teal/20 text-teal font-medium"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="px-4 py-4 border-t border-white/10 space-y-2">
          <a
            href="/portal/einstellungen"
            className="flex items-center gap-2 px-3 py-2 text-teal text-sm font-medium bg-teal/10 rounded-lg"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Einstellungen
          </a>
          <a
            href="/api/portal/auth/logout"
            className="block text-white/40 hover:text-white/70 text-xs transition-colors px-3"
          >
            Abmelden
          </a>
          <p className="text-white/30 text-xs px-3">einfach verwaltet. v1</p>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 ml-56">
        <EinstellungenClient 
          landlord={landlord}
        />
      </div>
    </div>
  );
}
