"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "🏠 Übersicht", href: "/admin" },
  { label: "🎫 Tickets", href: "/admin/tickets" },
  { label: "🏢 Eigentümer", href: "/admin/landlords" },
  { label: "🔨 Freelancer", href: "/admin/freelancers" },
  { label: "✅ Genehmigungen", href: "/admin/approvals" },
  { label: "👥 Leads", href: "/admin/leads" },
  { label: "📤 Outreach", href: "/admin/outreach" },
  { label: "📊 Funnel", href: "/admin/funnel" },
  { label: "🤖 Agenten", href: "/admin/agents" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-navy min-h-screen flex flex-col fixed left-0 top-0 bottom-0">
      <div className="px-5 py-5 border-b border-white/10">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-teal rounded-lg flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <div>
            <span className="text-white text-sm font-bold block leading-tight">
              Command Center
            </span>
            <span className="text-white/40 text-xs">einfach verwaltet.</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors
                ${
                  isActive
                    ? "bg-teal/20 text-teal font-medium"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
            >
              {item.label}
            </Link>
          );
        })}

        <div className="my-4 border-t border-white/10" />

        <a
          href="/portal/dashboard"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/60 hover:bg-white/5 hover:text-white transition-colors"
        >
          🔗 Portal öffnen
        </a>
        <a
          href="https://einfach-verwaltet.de"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/60 hover:bg-white/5 hover:text-white transition-colors"
        >
          🌐 Website öffnen
        </a>
      </nav>

      <div className="px-4 py-4 border-t border-white/10 space-y-2">
        <a
          href="/admin/logout"
          className="block text-white/40 hover:text-white/70 text-xs transition-colors"
        >
          Abmelden
        </a>
        <p className="text-white/30 text-xs">Admin v1.0</p>
      </div>
    </aside>
  );
}

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-light-gray flex">
      <AdminSidebar />
      <main className="flex-1 ml-64">
        {children}
      </main>
    </div>
  );
}
