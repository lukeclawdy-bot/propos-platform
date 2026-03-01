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
          {/* Sidebar */}

      {/* Main */}
      <div className="flex-1">
        <EinstellungenClient 
          landlord={landlord}
        />
      </div>
    </div>
  );
}
