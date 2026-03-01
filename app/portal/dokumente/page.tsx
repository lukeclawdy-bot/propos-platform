import { cookies, headers } from "next/headers";
import { getTokenFromCookie } from "@/lib/auth/jwt";
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
        {/* Sidebar */}

        {/* Main */}
        <div className="flex-1">
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
