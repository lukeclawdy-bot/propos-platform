import Link from "next/link";
import { cookies, headers } from "next/headers";
import { getTokenFromCookie } from "@/lib/auth/jwt";
import { getDemoProperties, getDemoUnits } from "@/lib/demo-data";
import { EinheitenClient } from "./EinheitenClient";

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

async function getProperties(landlordId: string, isDemo: boolean) {
  if (isDemo) {
    return getDemoProperties();
  }
  if (!landlordId) return [];
  try {
    const base = process.env.NEXT_PUBLIC_APP_URL || "https://einfach-verwaltet.de";
    const res = await fetch(`${base}/api/portal/properties?landlordId=${landlordId}`, { cache: "no-store" });
    if (!res.ok) return [];
    const { data } = await res.json();
    return data || [];
  } catch {
    return [];
  }
}

async function getUnits(landlordId: string, isDemo: boolean) {
  if (isDemo) {
    return getDemoUnits();
  }
  if (!landlordId) return [];
  try {
    const base = process.env.NEXT_PUBLIC_APP_URL || "https://einfach-verwaltet.de";
    const res = await fetch(`${base}/api/portal/units?landlordId=${landlordId}`, { cache: "no-store" });
    if (!res.ok) return [];
    const { data } = await res.json();
    return data || [];
  } catch {
    return [];
  }
}

export default async function EinheitenPage() {
  const { landlordId, isDemo } = await getSessionInfo();
  const properties = await getProperties(landlordId, isDemo);
  const units = await getUnits(landlordId, isDemo);

  return (
        {/* Sidebar */}

        {/* Main Content */}
        <div className="flex-1">
          <EinheitenClient 
            initialProperties={properties} 
            initialUnits={units}
            isDemo={isDemo}
          />
        </div>
      </div>
    </div>
  );
}
