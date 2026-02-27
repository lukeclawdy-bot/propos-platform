import { cookies, headers } from "next/headers";
import { getTokenFromCookie } from "@/lib/auth/jwt";
import { DemoBanner } from "@/components/DemoBanner";
import { DocumentVaultClient } from "./DocumentVaultClient";

import type { DocumentWithExtraction } from "@/lib/types/document";

// Demo documents data
const DEMO_DOCUMENTS: DocumentWithExtraction[] = [
  {
    id: "demo-doc-1",
    name: "Mietvertrag_Musterstraße_12_Whg1.pdf",
    type: "mietvertrag",
    typeLabel: "Mietvertrag",
    ocrStatus: "done",
    ocrText: null,
    extractedData: {},
    documentClassification: "mietvertrag",
    confidence: "98",
    linkedTicketId: null,
    propertyId: "demo-prop-1",
    propertyAddress: "Musterstraße 12",
    unitId: "demo-unit-1",
    unitDesignation: "Whg. 1 (EG links)",
    tenantId: "demo-tenant-1",
    tenantName: "Maria Schmidt",
    url: "#",
    mimeType: "application/pdf",
    sizeBytes: 245760,
    sizeFormatted: "240 KB",
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "demo-doc-2",
    name: "Nebenkostenabrechnung_2025.pdf",
    type: "nebenkostenabrechnung",
    typeLabel: "Nebenkostenabrechnung",
    ocrStatus: "done",
    ocrText: null,
    extractedData: {},
    documentClassification: "nebenkostenabrechnung",
    confidence: "95",
    linkedTicketId: null,
    propertyId: "demo-prop-1",
    propertyAddress: "Musterstraße 12",
    unitId: null,
    unitDesignation: null,
    tenantId: null,
    tenantName: null,
    url: "#",
    mimeType: "application/pdf",
    sizeBytes: 184320,
    sizeFormatted: "180 KB",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "demo-doc-3",
    name: "Heizungswartung_Rechnung_Feb2026.pdf",
    type: "invoice",
    typeLabel: "Rechnung",
    ocrStatus: "done",
    ocrText: null,
    extractedData: {},
    documentClassification: "invoice",
    confidence: "91",
    linkedTicketId: null,
    propertyId: "demo-prop-1",
    propertyAddress: "Musterstraße 12",
    unitId: null,
    unitDesignation: null,
    tenantId: null,
    tenantName: null,
    url: "#",
    mimeType: "application/pdf",
    sizeBytes: 122880,
    sizeFormatted: "120 KB",
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "demo-doc-4",
    name: "Mietvertrag_Alsterblick_5_Whg1.pdf",
    type: "mietvertrag",
    typeLabel: "Mietvertrag",
    ocrStatus: "done",
    ocrText: null,
    extractedData: {},
    documentClassification: "mietvertrag",
    confidence: "97",
    linkedTicketId: null,
    propertyId: "demo-prop-2",
    propertyAddress: "Alsterblick 5",
    unitId: "demo-unit-7",
    unitDesignation: "Whg. 1",
    tenantId: "demo-tenant-5",
    tenantName: "Thomas Klein",
    url: "#",
    mimeType: "application/pdf",
    sizeBytes: 198656,
    sizeFormatted: "194 KB",
    createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "demo-doc-5",
    name: "Übergabeprotokoll_Whg2_Alsterblick.pdf",
    type: "protokoll",
    typeLabel: "Protokoll",
    ocrStatus: "done",
    ocrText: null,
    extractedData: {},
    documentClassification: "protokoll",
    confidence: "89",
    linkedTicketId: null,
    propertyId: "demo-prop-2",
    propertyAddress: "Alsterblick 5",
    unitId: "demo-unit-8",
    unitDesignation: "Whg. 2",
    tenantId: "demo-tenant-6",
    tenantName: "Petra Schulze",
    url: "#",
    mimeType: "application/pdf",
    sizeBytes: 89000,
    sizeFormatted: "87 KB",
    createdAt: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const DEMO_PROPERTIES = [
  { id: "demo-prop-1", address: "Musterstraße 12, 20095 Hamburg", unitCount: 6 },
  { id: "demo-prop-2", address: "Alsterblick 5, 20354 Hamburg", unitCount: 4 },
];

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

async function getDocuments(landlordId: string, isDemo: boolean) {
  if (isDemo || landlordId === "demo") {
    return DEMO_DOCUMENTS;
  }
  if (!landlordId) return [];
  try {
    const base = process.env.NEXT_PUBLIC_APP_URL || "https://einfach-verwaltet.de";
    const res = await fetch(
      `${base}/portal/api/documents?landlordId=${landlordId}`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    const { data } = await res.json();
    return data || [];
  } catch {
    return [];
  }
}

async function getProperties(landlordId: string, isDemo: boolean) {
  if (isDemo || landlordId === "demo") {
    return DEMO_PROPERTIES;
  }
  if (!landlordId) return [];
  try {
    const base = process.env.NEXT_PUBLIC_APP_URL || "https://einfach-verwaltet.de";
    const res = await fetch(
      `${base}/api/portal/properties?landlordId=${landlordId}`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    const { data } = await res.json();
    return data || [];
  } catch {
    return [];
  }
}

export default async function DokumentePage() {
  const { landlordId, isDemo } = await getSessionInfo();
  const documents = await getDocuments(landlordId, isDemo);
  const properties = await getProperties(landlordId, isDemo);

  return (
    <div className="min-h-screen bg-light-gray flex flex-col">
      {isDemo && <DemoBanner />}

      <div className="flex flex-1">
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
              { label: "Dokumente", href: "/portal/dokumente", active: true },
              { label: "Finanzen", href: "/portal/finanzen", active: false },
              { label: "Analysen", href: "/portal/analytics", active: false },
            { label: "Mieterhöhung", href: "/portal/mieterhohung", active: false },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors
                  ${item.active ? "bg-teal/20 text-teal font-medium" : "text-white/60 hover:bg-white/5 hover:text-white"}`}
              >
                {item.label}
              </a>
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
          <DocumentVaultClient 
            initialDocuments={documents} 
            properties={properties}
            landlordId={landlordId}
            isDemo={isDemo}
          />
        </div>
      </div>
    </div>
  );
}
