import Link from "next/link";
import { cookies, headers } from "next/headers";
import { getTokenFromCookie } from "@/lib/auth/jwt";
import { getDemoTenants } from "@/lib/demo-data";
import { MieterClient } from "./MieterClient";

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

async function getTenants(landlordId: string, isDemo: boolean) {
  if (isDemo) {
    return getDemoTenants();
  }
  if (!landlordId) return [];
  try {
    const base = process.env.NEXT_PUBLIC_APP_URL || "https://einfach-verwaltet.de";
    const res = await fetch(`${base}/api/portal/tenants?landlordId=${landlordId}`, { cache: "no-store" });
    if (!res.ok) return [];
    const { data } = await res.json();
    return data || [];
  } catch {
    return [];
  }
}

export default async function MieterPage() {
  const { landlordId, isDemo } = await getSessionInfo();
  const tenants = await getTenants(landlordId, isDemo);

  return (
        {/* Sidebar */}

        {/* Main Content */}
        <div className="flex-1">
          <MieterClient initialTenants={tenants} isDemo={isDemo} />
        </div>
      </div>
    </div>
  );
}
