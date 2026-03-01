import { cookies, headers } from "next/headers";
import { getTokenFromCookie } from "@/lib/auth/jwt";
import { PortalSidebar } from "@/components/PortalSidebar";

async function getIsDemo(): Promise<boolean> {
  try {
    const hdrs = await headers();
    const isDemoHeader = hdrs.get("x-is-demo") === "true";
    if (isDemoHeader) return true;

    const cookieStore = await cookies();

    // Demo session cookie → always demo
    const demoToken = cookieStore.get("ev-demo-session")?.value;
    if (demoToken) {
      const payload = await getTokenFromCookie(demoToken);
      if (payload?.isDemo) return true;
    }

    // Regular portal session — check if the account is "real" (has a DB record)
    // For now: if landlordId is "demo" or isDemo flag is set → show banner
    const portalToken = cookieStore.get("portal_session")?.value;
    if (portalToken) {
      const payload = await getTokenFromCookie(portalToken);
      if (payload?.isDemo || payload?.landlordId === "demo") return true;
      // Real registered users: isDemo = false
      return false;
    }

    // No session at all (shouldn't happen past middleware, but be safe)
    return true;
  } catch {
    return false;
  }
}

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDemo = await getIsDemo();

  return (
    <div className="min-h-screen bg-light-gray">
      <PortalSidebar isDemo={isDemo} />
      {/* Main content — offset for sidebar (+ demo banner if shown) */}
      <div className={`ml-56 ${isDemo ? "pt-[52px]" : ""}`}>
        {children}
      </div>
    </div>
  );
}
