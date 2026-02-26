/**
 * POST /api/portal/nka/generate
 *
 * Generiert eine Nebenkostenabrechnung (NKA) als druckfertiges HTML-Dokument.
 *
 * Body: { propertyId: string, tenantId: string, year: number }
 *
 * Auth: JWT-Cookie „portal_session" oder „ev-demo-session" (via middleware)
 * — landlordId wird als x-landlord-id Header injiziert.
 */

import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { db } from '@/lib/db';
import { properties, units, tenants, financialTransactions } from '@/lib/db/schema';
import { eq, and, between } from 'drizzle-orm';
import {
  calculateBKA,
} from '@/lib/bka-engine/calculator';
import {
  BKACostCategory,
  AllocationKey,
  type Property as BKAProperty,
  type Unit as BKAUnit,
  type CostEntry,
  type BKAInput,
} from '@/lib/bka-engine/types';
import { generateNKAHtml } from '@/lib/pdf/nka-generator';

// ─── Demo data ────────────────────────────────────────────────────────────────

function buildDemoInput(
  propertyId: string,
  tenantId: string,
  year: number
): {
  bkaInput: BKAInput;
  landlordName: string;
  unitIndex: number;
  bankDetails: { iban: string; bic: string; bank: string; kontoinhaber: string };
} {
  const bkaProperty: BKAProperty = {
    id: 'musterstrasse-7',
    address: 'Musterstraße 7',
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
          { meterId: 'W-001', description: 'Wasser EG links', readingStart: 8200, readingEnd: 8780, unit: 'm³' },
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
          { meterId: 'H-002', description: 'Heizung EG rechts', readingStart: 9400, readingEnd: 10500, unit: 'kWh' },
          { meterId: 'W-002', description: 'Wasser EG rechts', readingStart: 7000, readingEnd: 7380, unit: 'm³' },
          { meterId: 'WW-002', description: 'Warmwasser EG rechts', readingStart: 900, readingEnd: 1010, unit: 'm³' },
        ],
      },
      {
        id: 'demo-unit-3',
        designation: '1. OG Mitte',
        tenant: 'Lena Hoffmann',
        area_m2: 88.0,
        persons: 3,
        meters: [
          { meterId: 'H-003', description: 'Heizung 1OG Mitte', readingStart: 14200, readingEnd: 16600, unit: 'kWh' },
          { meterId: 'W-003', description: 'Wasser 1OG Mitte', readingStart: 9600, readingEnd: 10450, unit: 'm³' },
          { meterId: 'WW-003', description: 'Warmwasser 1OG Mitte', readingStart: 1450, readingEnd: 1900, unit: 'm³' },
        ],
      },
    ],
  };

  const costs: CostEntry[] = [
    { category: BKACostCategory.BETRIEBSSTROM,     total_eur: 420,  allocation_key: AllocationKey.WOHNFLAECHE, description: 'Treppenhauslicht, Kellerbeleuchtung', vendor: 'Hamburg Energie' },
    { category: BKACostCategory.WASSERVERSORGUNG,  total_eur: 780,  allocation_key: AllocationKey.VERBRAUCH,   description: 'Trinkwasserversorgung', vendor: 'Hamburg Wasser' },
    { category: BKACostCategory.ENTWAESSERUNG,     total_eur: 560,  allocation_key: AllocationKey.VERBRAUCH,   description: 'Abwasserentsorgung', vendor: 'Hamburg Wasser' },
    { category: BKACostCategory.HEIZUNG,           total_eur: 4600, allocation_key: AllocationKey.VERBRAUCH,   description: 'Fernwärme Heizung', vendor: 'Vattenfall Wärme Hamburg' },
    { category: BKACostCategory.WARMWASSER,        total_eur: 1950, allocation_key: AllocationKey.VERBRAUCH,   description: 'Fernwärme Warmwasser', vendor: 'Vattenfall Wärme Hamburg' },
    { category: BKACostCategory.MUELLBeseITIGUNG,  total_eur: 710,  allocation_key: AllocationKey.PERSONENZAHL, description: 'Abfallentsorgung', vendor: 'Stadtreinigung Hamburg' },
    { category: BKACostCategory.STRASSENREINIGUNG, total_eur: 110,  allocation_key: AllocationKey.WOHNFLAECHE, description: 'Gehwegreinigung', vendor: 'Stadtreinigung Hamburg' },
    { category: BKACostCategory.GARTENPFLEGE,      total_eur: 640,  allocation_key: AllocationKey.WOHNFLAECHE, description: 'Rasenpflege, Hecken', vendor: 'Garten Grün GmbH' },
    { category: BKACostCategory.VERSICHERUNG,      total_eur: 490,  allocation_key: AllocationKey.WOHNFLAECHE, description: 'Gebäude- und Haftpflichtversicherung', vendor: 'Allianz' },
    { category: BKACostCategory.HAUSMEISTER,       total_eur: 2200, allocation_key: AllocationKey.WOHNFLAECHE, description: 'Hausmeisterdienste, Treppenhausreinigung', vendor: 'Gebäudereinigung Nord' },
    { category: BKACostCategory.SCHORNSTEINREINIGUNG, total_eur: 160, allocation_key: AllocationKey.WOHNFLAECHE, description: 'Kehrgebühren', vendor: 'Bezirksschornsteinfeger' },
    { category: BKACostCategory.BELEUCHTUNG,       total_eur: 130,  allocation_key: AllocationKey.WOHNFLAECHE, description: 'Außenbeleuchtung', vendor: 'Hamburg Energie' },
    { category: BKACostCategory.SONSTIGE_KOSTEN,   total_eur: 180,  allocation_key: AllocationKey.EINHEIT,     description: 'Gemeinschaftsantenne', vendor: 'Diverse' },
  ];

  const vorauszahlungen: Record<string, number> = {
    'demo-unit-1': 2800,
    'demo-unit-2': 2400,
    'demo-unit-3': 3200,
  };

  // Map tenantId to unit index (fallback: 0)
  const idToIndex: Record<string, number> = {
    'demo-tenant-1': 0,
    'demo-tenant-2': 1,
    'demo-tenant-3': 2,
  };
  const unitIndex = idToIndex[tenantId] ?? 0;

  const bkaInput: BKAInput = {
    property: bkaProperty,
    periodStart: new Date(`${year}-01-01`),
    periodEnd: new Date(`${year}-12-31`),
    costs,
    unit_vorauszahlungen: vorauszahlungen,
  };

  return {
    bkaInput,
    landlordName: 'Max Mustermann · einfach verwaltet.',
    unitIndex,
    bankDetails: {
      kontoinhaber: 'Max Mustermann',
      iban: 'DE89 2005 0550 1234 5678 90',
      bic: 'HASPDEHHXXX',
      bank: 'Hamburger Sparkasse',
    },
  };
}

// ─── Handler ─────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    // ── 1. Auth: landlordId from middleware header ──────────────────────────
    const hdrs = await headers();
    const landlordId = hdrs.get('x-landlord-id');
    const isDemo = hdrs.get('x-is-demo') === 'true' || landlordId === 'demo';

    if (!landlordId) {
      return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
    }

    // ── 2. Parse body ───────────────────────────────────────────────────────
    let body: { propertyId?: string; tenantId?: string; year?: number };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 400 });
    }

    const { propertyId, tenantId, year } = body;
    if (!propertyId || !tenantId || !year) {
      return NextResponse.json(
        { error: 'propertyId, tenantId und year sind erforderlich.' },
        { status: 400 },
      );
    }

    // ── 3. Demo mode ────────────────────────────────────────────────────────
    if (isDemo) {
      const { bkaInput, landlordName, unitIndex, bankDetails } = buildDemoInput(
        propertyId,
        tenantId,
        year,
      );
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
          'Content-Disposition': `inline; filename="NKA-${year}-${unitResult.unit.designation.replace(/\s/g, '-')}.html"`,
          'X-NKA-Tenant': unitResult.unit.tenant,
          'X-NKA-Saldo': String(unitResult.saldo),
          'X-NKA-IsCredit': String(unitResult.isCredit),
        },
      });
    }

    // ── 4. Production mode: fetch from Neon DB ──────────────────────────────

    // Property (verify it belongs to this landlord)
    const [property] = await db
      .select()
      .from(properties)
      .where(and(eq(properties.id, propertyId), eq(properties.landlordId!, landlordId)));

    if (!property) {
      return NextResponse.json(
        { error: 'Objekt nicht gefunden oder kein Zugriff.' },
        { status: 404 },
      );
    }

    // Tenant + unit
    const [tenant] = await db
      .select()
      .from(tenants)
      .where(eq(tenants.id, tenantId));

    if (!tenant) {
      return NextResponse.json({ error: 'Mieter nicht gefunden.' }, { status: 404 });
    }

    const [unit] = await db
      .select()
      .from(units)
      .where(eq(units.id, tenant.unitId));

    if (!unit) {
      return NextResponse.json({ error: 'Wohneinheit nicht gefunden.' }, { status: 404 });
    }

    // All units in this property
    const allUnits = await db
      .select()
      .from(units)
      .where(eq(units.propertyId, propertyId));

    // Financial transactions for this year (§2 BetrKV expenses)
    const yearStart = new Date(`${year}-01-01`);
    const yearEnd = new Date(`${year}-12-31`);

    const expenses = await db
      .select()
      .from(financialTransactions)
      .where(
        and(
          eq(financialTransactions.landlordId, landlordId),
          eq(financialTransactions.propertyId, propertyId),
          eq(financialTransactions.type, 'expense'),
          eq(financialTransactions.status, 'confirmed'),
          between(financialTransactions.createdAt!, yearStart, yearEnd),
        ),
      );

    // Vorauszahlungen per unit
    const vorauszahlungenRows = await db
      .select()
      .from(financialTransactions)
      .where(
        and(
          eq(financialTransactions.landlordId, landlordId),
          eq(financialTransactions.propertyId, propertyId),
          eq(financialTransactions.type, 'rent_received'),
          eq(financialTransactions.status, 'confirmed'),
          between(financialTransactions.createdAt!, yearStart, yearEnd),
        ),
      );

    // Map allUnits to BKA Unit type
    const bkaUnits: BKAUnit[] = allUnits.map(u => ({
      id: u.id,
      designation: u.designation,
      tenant: 'Unbekannt',
      area_m2: Number(u.areaM2 ?? 0),
      persons: 1,
    }));

    // Map expenses to BKA CostEntry (group by bkvCategory)
    const costMap: Record<string, number> = {};
    for (const exp of expenses) {
      const cat = exp.bkvCategory ?? BKACostCategory.SONSTIGE_KOSTEN;
      costMap[cat] = (costMap[cat] ?? 0) + Math.abs(exp.amountCents) / 100;
    }

    const costs: CostEntry[] = Object.entries(costMap).map(([cat, total]) => ({
      category: cat as BKACostCategory,
      total_eur: total,
      allocation_key: AllocationKey.WOHNFLAECHE,
    }));

    if (costs.length === 0) {
      // Fallback: empty cost structure still produces valid output
      costs.push({
        category: BKACostCategory.SONSTIGE_KOSTEN,
        total_eur: 0,
        allocation_key: AllocationKey.WOHNFLAECHE,
        description: 'Keine Kosten erfasst',
      });
    }

    // Vorauszahlungen per unit
    const vorauszahlungen: Record<string, number> = {};
    for (const tx of vorauszahlungenRows) {
      if (tx.unitId) {
        vorauszahlungen[tx.unitId] = (vorauszahlungen[tx.unitId] ?? 0) + tx.amountCents / 100;
      }
    }

    const bkaProperty: BKAProperty = {
      id: property.id,
      address: property.address,
      postalCode: property.postalCode,
      city: property.city,
      managerContact: `${property.ownerName ?? ''} · einfach verwaltet.`,
      units: bkaUnits,
    };

    const bkaInput: BKAInput = {
      property: bkaProperty,
      periodStart: yearStart,
      periodEnd: yearEnd,
      costs,
      unit_vorauszahlungen: vorauszahlungen,
    };

    const bkaResult = calculateBKA(bkaInput);
    const unitResult = bkaResult.unitResults.find(ur => ur.unit.id === unit.id);

    if (!unitResult) {
      return NextResponse.json({ error: 'Berechnung fehlgeschlagen.' }, { status: 500 });
    }

    const bkaUnitForTenant: BKAUnit = {
      id: unit.id,
      designation: unit.designation,
      tenant: `${tenant.firstName} ${tenant.lastName}`,
      area_m2: Number(unit.areaM2 ?? 0),
      persons: 1,
      moveInDate: tenant.moveInDate ?? undefined,
      moveOutDate: tenant.moveOutDate ?? undefined,
    };

    // Override tenant name in result
    unitResult.unit = bkaUnitForTenant;

    const landlordName = property.ownerName ?? 'Vermieter';

    const html = generateNKAHtml({
      result: bkaResult,
      unitResult,
      property: bkaProperty,
      landlordName,
      generatedAt: new Date(),
    });

    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Disposition': `inline; filename="NKA-${year}-${unit.designation.replace(/\s/g, '-')}.html"`,
        'X-NKA-Tenant': `${tenant.firstName} ${tenant.lastName}`,
        'X-NKA-Saldo': String(unitResult.saldo),
        'X-NKA-IsCredit': String(unitResult.isCredit),
      },
    });
  } catch (err) {
    console.error('[NKA] Fehler beim Generieren:', err);
    return NextResponse.json(
      { error: 'Interner Serverfehler. Bitte versuchen Sie es erneut.' },
      { status: 500 },
    );
  }
}
