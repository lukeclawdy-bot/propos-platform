"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DemoBanner } from "./DemoBanner";

// Canonical nav order — single source of truth
const NAV_ITEMS = [
  { label: "Übersicht",    href: "/portal/dashboard" },
  { label: "Tickets",      href: "/portal/tickets" },
  { label: "Chat",         href: "/portal/chat" },
  { label: "Einheiten",    href: "/portal/einheiten" },
  { label: "Mieter",       href: "/portal/mieter" },
  { label: "Finanzen",     href: "/portal/finanzen" },
  { label: "Miete",        href: "/portal/miete" },
  { label: "Mieterhöhung", href: "/portal/mieterhohung" },
  { label: "NKA",          href: "/portal/nka" },
  { label: "Dokumente",    href: "/portal/dokumente" },
  { label: "Vertrag",      href: "/portal/vertrag" },
  { label: "Partner",      href: "/portal/partner" },
  { label: "Analysen",     href: "/portal/analytics" },
  { label: "DATEV Export", href: "/portal/datev" },
];

interface PortalSidebarProps {
  isDemo?: boolean;
}

export function PortalSidebar({ isDemo }: PortalSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Demo Banner — full width, above everything */}
      {isDemo && (
        <div className="fixed top-0 left-0 right-0 z-50">
          <DemoBanner />
        </div>
      )}

      {/* Sidebar */}
      <aside
        className={`w-56 bg-navy min-h-screen flex flex-col fixed left-0 bottom-0 z-40 ${isDemo ? "top-[52px]" : "top-0"}`}
      >
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

        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-teal/20 text-teal font-medium"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-4 py-4 border-t border-white/10 space-y-2 flex-shrink-0">
          <a
            href="/api/portal/auth/logout"
            className="block text-white/40 hover:text-white/70 text-xs transition-colors"
          >
            Abmelden
          </a>
          <p className="text-white/30 text-xs">einfach verwaltet. v1</p>
        </div>
      </aside>
    </>
  );
}
