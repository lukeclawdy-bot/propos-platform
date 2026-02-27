/**
 * GET/POST /api/pdf/nka
 *
 * Returns an NKA (Nebenkostenabrechnung) as a downloadable HTML document
 * that the browser can print-to-PDF via Strg+P.
 *
 * Query params (GET) / body (POST):
 *   - propertyName: string (default: "Musterstraße 7, Hamburg")
 *   - year: number (default: last year)
 *   - propertyId?: string
 *   - tenantId?: string
 *
 * Uses demo data when DATABASE_URL is unavailable.
 * Auth: not required for demo downloads; production enforces portal session.
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  calculateBKA,
} from '@/lib/bka-engine/calculator';
import {
  BKACostCategory,
  AllocationKey,
  type Property as BKAProperty,
  type BKAInput,
} from '@/lib/bka-engine/types';
import { generateNKAHtml } from '@/lib/pdf/nka-generator';

// ─── Demo data ─────────────────────────────────────────────────────────────

function buildDemoInput(year: number, propertyName?: string): {
  bkaInput: BKAInput;
  landlordName: string;
  unitIndex: number;
  bankDetails: { iban: string; bic: string; bank: string; kontoinhaber: string };
  fileName: string;
} {
  const safeName = (propertyName || 'Musterstrasse-7').replace(/[^a-zA-Z0-9\-_]/g, '-');

  const bkaProperty: BKAProperty = {
    id: 'demo-property',
    address: propertyName || 'Musterstraße 7',
    postalCode: '20099',
    city: 'Hamburg',
    managerContact: 'einfach verwaltet. GmbH, Hamburg',
    units: [
      {
        id: 'demo-unit-1',
        designation: 'EG links',
        tenant: 'Maria Bergmann',
        area_m2: 72.5,
        persons: 2,
        meters: [
          { meterId: 'H-001', description: 'Heizung EG links', readingStart: 12100, readingEnd: 13800, unit: 'kWh' },
          { meterId: 'W-001', description: 'Wasser EG links',  readingStart: 8200,  readingEnd: 8780,  unit: 'm³' },
          { meterId: 'WW-001', description: 'Warmwasser EG links', readingStart: 1100, readingEnd: 1340, unit: 'm³' },
        ],
      },
      {
        id: 'demo-unit-2',
        designation: 'EG rechts',
        tenant: 'Hans Fischer',
        area_m2: 65.0,
        persons: 1,
        meters: [
          { meterId: 'H-002', description: 'Heizung EG rechts', readingStart: 9400,  readingEnd: 10500, unit: 'kWh' },
          { meterId: 'W-002', description: 'Wasser EG rechts',  readingStart: 7000,  readingEnd: 7380,  unit: 'm³' },
          { meterId: 'WW-002', description: 'Warmwasser EG rechts', readingStart: 900, readingEnd: 1010, unit: 'm³' },
        ],
      },
    ],
  };

  const bkaInput: BKAInput = {
    property: bkaProperty,
    year,
    periodStart: new Date(`${year}-01-01`),
    periodEnd: new Date(`${year}-12-31`),
    costs: [
      { category: BKACostCategory.GRUNDSTEUER,          description: 'Grundsteuer',             totalAmount: 1240,  allocationKey: AllocationKey.WOHNFLAECHE },
      { category: BKACostCategory.WASSER,               description: 'Frischwasser/Abwasser',   totalAmount: 980,   allocationKey: AllocationKey.VERBRAUCH },
      { category: BKACostCategory.HEIZUNG,              description: 'Heizkosten Erdgas',       totalAmount: 3420,  allocationKey: AllocationKey.VERBRAUCH },
      { category: BKACostCategory.AUFZUG,               description: 'Aufzugswartung',          totalAmount: 0,     allocationKey: AllocationKey.WOHNFLAECHE },
      { category: BKACostCategory.TREPPENHAUSREINIGUNG, description: 'Treppenhausreinigung',    totalAmount: 480,   allocationKey: AllocationKey.WOHNFLAECHE },
      { category: BKACostCategory.MUELL,                description: 'Müllabfuhr',              totalAmount: 620,   allocationKey: AllocationKey.PERSONENANZAHL },
      { category: BKACostCategory.HAFTPFLICHT,          description: 'Gebäudehaftpflicht',      totalAmount: 340,   allocationKey: AllocationKey.WOHNFLAECHE },
      { category: BKACostCategory.HAUSWART,             description: 'Hausmeisterdienst',       totalAmount: 720,   allocationKey: AllocationKey.WOHNFLAECHE },
      { category: BKACostCategory.ALLGEMEINSTROM,       description: 'Allgemeinstrom/Flur',     totalAmount: 180,   allocationKey: AllocationKey.WOHNFLAECHE },
    ],
    advancePayments: [
      { unitId: 'demo-unit-1', totalPaid: 2400 },
      { unitId: 'demo-unit-2', totalPaid: 2100 },
    ],
  };

  return {
    bkaInput,
    landlordName: 'Max Mustermann',
    unitIndex: 0,
    bankDetails: {
      iban: 'DE89 2004 1155 0123 4567 00',
      bic: 'COBADEFFXXX',
      bank: 'Commerzbank Hamburg',
      kontoinhaber: 'Max Mustermann',
    },
    fileName: `NKA_${safeName}_${year}.html`,
  };
}

// ─── Handler ────────────────────────────────────────────────────────────────

async function handleRequest(req: NextRequest): Promise<NextResponse> {
  try {
    let propertyName: string | undefined;
    let year: number = new Date().getFullYear() - 1;
    let propertyId: string | undefined;

    if (req.method === 'POST') {
      const body = await req.json().catch(() => ({}));
      propertyName = body.propertyName;
      year = Number(body.year) || year;
      propertyId = body.propertyId;
    } else {
      const url = new URL(req.url);
      propertyName = url.searchParams.get('propertyName') ?? undefined;
      year = Number(url.searchParams.get('year')) || year;
      propertyId = url.searchParams.get('propertyId') ?? undefined;
    }

    // For now, always use demo data (real DB path would go here)
    const { bkaInput, landlordName, unitIndex, bankDetails, fileName } = buildDemoInput(year, propertyName);
    const bkaResult = calculateBKA(bkaInput);
    const unitResult = bkaResult.unitResults[unitIndex];

    if (!unitResult) {
      return NextResponse.json({ error: 'Wohneinheit nicht gefunden.' }, { status: 404 });
    }

    const html = generateNKAHtml({
      result: bkaResult,
      unitResult,
      property: bkaInput.property,
      landlordName,
      bankDetails,
      generatedAt: new Date(),
    });

    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    console.error('[/api/pdf/nka] Error:', err);
    return NextResponse.json({ error: 'Fehler beim Generieren der NKA.' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  return handleRequest(req);
}

export async function POST(req: NextRequest) {
  return handleRequest(req);
}
