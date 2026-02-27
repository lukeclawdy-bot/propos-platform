/**
 * POST /api/portal/nka/generate
 *
 * Generiert Nebenkostenabrechnung(en) für ein Objekt.
 *
 * Mode A — wizard (from NKA Creator UI):
 *   Body: { propertyId, year, costs: Record<category, number>, mode: 'wizard' }
 *   → Generates HTML for ALL tenants in the property, stores nka_records row, returns JSON with download URLs
 *
 * Mode B — single tenant (legacy from /portal/abrechnung/nka):
 *   Body: { propertyId, tenantId, year }
 *   → Returns HTML for single tenant (existing behavior)
 *
 * Auth: JWT-Cookie „portal_session" oder „ev-demo-session" (via middleware)
 */

import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { db } from '@/lib/db';
import { properties, units, tenants, financialTransactions, nkaRecords } from '@/lib/db/schema';
import { eq, and, between, inArray } from 'drizzle-orm';
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
          { meterId: 'W-003', description: 'Wasser 1OG Mitte', readingStart: 9600, readingEnd: 10240, unit: 'm³' },
          { meterId: 'WW-003', description: 'Warmwasser 1OG Mitte', readingStart: 1400, readingEnd: 1660, unit: 'm³' },
        ],
      },
    ],
  };

  const costs: CostEntry[] = [
    { category: BKACostCategory.WASSERVERSORGUNG,    total_eur: 1200,  allocation_key: AllocationKey.WOHNFLAECHE },
    { category: BKACostCategory.ENTWAESSERUNG,       total_eur: 840,   allocation_key: AllocationKey.WOHNFLAECHE },
    { category: BKACostCategory.HEIZUNG,             total_eur: 3500,  allocation_key: AllocationKey.WOHNFLAECHE },
    { category: BKACostCategory.WARMWASSER,          total_eur: 1100,  allocation_key: AllocationKey.WOHNFLAECHE },
    { category: BKACostCategory.MUELLBeseITIGUNG,   total_eur: 480,   allocation_key: AllocationKey.WOHNFLAECHE },
    { category: BKACostCategory.STRASSENREINIGUNG,   total_eur: 240,   allocation_key: AllocationKey.WOHNFLAECHE },
    { category: BKACostCategory.HAUSMEISTER,         total_eur: 960,   allocation_key: AllocationKey.WOHNFLAECHE },
    { category: BKACostCategory.VERSICHERUNG,        total_eur: 750,   allocation_key: AllocationKey.WOHNFLAECHE },
    { category: BKACostCategory.GARTENPFLEGE,        total_eur: 380,   allocation_key: AllocationKey.WOHNFLAECHE },
    { category: BKACostCategory.BELEUCHTUNG,         total_eur: 180,   allocation_key: AllocationKey.WOHNFLAECHE },
  ];

  // Unit vorauszahlungen per month (simplified)
  const unit_vorauszahlungen: Record<string, number> = {
    'demo-unit-1': 1380,
    'demo-unit-2': 1260,
    'demo-unit-3': 1440,
  };

  const bkaInput: BKAInput = {
    property: bkaProperty,
    periodStart: new Date(`${year}-01-01`),
    periodEnd: new Date(`${year}-12-31`),
    costs,
    unit_vorauszahlungen,
  };

  const unitIndex = bkaProperty.units.findIndex(u => u.id === tenantId) ?? 0;

  return {
    bkaInput,
    landlordName: 'Max Mustermann',
    unitIndex: Math.max(0, unitIndex),
    bankDetails: {
      iban: 'DE89 3704 0044 0532 0130 00',
      bic: 'COBADEFFXXX',
      bank: 'Commerzbank Hamburg',
      kontoinhaber: 'Max Mustermann',
    },
  };
}

// ─── Route Handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const hdrs = await headers();
    const landlordIdHeader = hdrs.get('x-landlord-id');

    const body = await req.json();
    const { propertyId, tenantId, year, costs: manualCosts, mode } = body;

    if (!propertyId || !year) {
      return NextResponse.json({ error: 'propertyId und year sind erforderlich.' }, { status: 400 });
    }

    // ─── DEMO MODE ───────────────────────────────────────────────────────────
    if (!landlordIdHeader || landlordIdHeader.startsWith('demo-')) {
      // If wizard mode with manual costs — return JSON with mock download URLs
      if (mode === 'wizard' && manualCosts) {
        const recordId = `demo-nka-${Date.now()}`;
        return NextResponse.json({
          success: true,
          recordId,
          nkaUrls: [
            { tenantName: 'Maria Bergmann', unitDesignation: 'EG links', url: `/api/portal/nka/${recordId}/pdf?tenant=1` },
            { tenantName: 'Hans Fischer', unitDesignation: 'EG rechts', url: `/api/portal/nka/${recordId}/pdf?tenant=2` },
          ],
          message: 'Demo: PDFs generiert',
        });
      }

      // Single tenant mode (legacy)
      const targetTenantId = tenantId ?? 'demo-unit-1';
      const { bkaInput, landlordName, unitIndex, bankDetails } = buildDemoInput(propertyId, targetTenantId, year);
      const bkaResult = calculateBKA(bkaInput);

      const uIdx = Math.min(unitIndex, bkaResult.unitResults.length - 1);
      const unitResult = bkaResult.unitResults[uIdx];
      if (!unitResult) {
        return NextResponse.json({ error: 'Demo-Daten konnten nicht generiert werden.' }, { status: 500 });
      }

      const html = generateNKAHtml({ result: bkaResult, unitResult, property: bkaInput.property, landlordName, bankDetails, generatedAt: new Date() });
      return new NextResponse(html, {
        status: 200,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }

    const landlordId = landlordIdHeader;

    // ─── WIZARD MODE (new NKA Creator) ──────────────────────────────────────
    if (mode === 'wizard' && manualCosts) {
      // Fetch property + all its tenants/units
      const [property] = await db.select().from(properties).where(eq(properties.id, propertyId));
      if (!property || property.landlordId !== landlordId) {
        return NextResponse.json({ error: 'Objekt nicht gefunden.' }, { status: 404 });
      }

      const allUnits = await db.select().from(units).where(eq(units.propertyId, propertyId));
      const unitIds = allUnits.map(u => u.id);
      const allTenants = unitIds.length > 0
        ? await db.select().from(tenants).where(inArray(tenants.unitId, unitIds))
        : [];

      // Build BKA units
      const bkaUnits: BKAUnit[] = allUnits.map(u => {
        const tenant = allTenants.find(t => t.unitId === u.id);
        return {
          id: u.id,
          designation: u.designation,
          tenant: tenant ? `${tenant.firstName} ${tenant.lastName}` : 'Leerstand',
          area_m2: Number(u.areaM2 ?? 0),
          persons: 1,
        };
      });

      // Build cost entries from manual costs
      const costs: CostEntry[] = Object.entries(manualCosts as Record<string, number>)
        .filter(([, v]) => v > 0)
        .map(([cat, total]) => ({
          category: cat as BKACostCategory,
          total_eur: total,
          allocation_key: AllocationKey.WOHNFLAECHE,
        }));

      if (costs.length === 0) {
        return NextResponse.json({ error: 'Keine Kosten eingegeben.' }, { status: 400 });
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
        periodStart: new Date(`${year}-01-01`),
        periodEnd: new Date(`${year}-12-31`),
        costs,
        unit_vorauszahlungen: {},
      };

      const bkaResult = calculateBKA(bkaInput);

      // Generate HTML for each unit and store
      const nkaUrls: { tenantName: string; unitDesignation: string; unitId: string }[] = [];
      
      // Store NKA record in DB
      const [nkaRecord] = await db.insert(nkaRecords).values({
        propertyId,
        landlordId,
        abrechnungsjahr: year,
        status: 'generated',
        totalCosts: manualCosts,
        generatedAt: new Date(),
      }).returning();

      // Build download URL list (HTML generated on-demand at /api/portal/nka/[id]/pdf)
      for (const unitResult of bkaResult.unitResults) {
        const unitData = allUnits.find(u => u.id === unitResult.unit.id);
        if (!unitData) continue;
        nkaUrls.push({
          tenantName: unitResult.unit.tenant,
          unitDesignation: unitResult.unit.designation,
          unitId: unitResult.unit.id,
        });
      }

      return NextResponse.json({
        success: true,
        recordId: nkaRecord.id,
        nkaUrls: nkaUrls.map(u => ({
          ...u,
          url: `/api/portal/nka/${nkaRecord.id}/pdf?unitId=${u.unitId}`,
        })),
        message: `${nkaUrls.length} NKA(s) generiert`,
      });
    }

    // ─── SINGLE TENANT MODE (legacy) ────────────────────────────────────────
    if (!tenantId) {
      return NextResponse.json({ error: 'tenantId ist erforderlich.' }, { status: 400 });
    }

    const [property] = await db.select().from(properties).where(eq(properties.id, propertyId));
    if (!property || property.landlordId !== landlordId) {
      return NextResponse.json({ error: 'Objekt nicht gefunden.' }, { status: 404 });
    }

    const [tenant] = await db.select().from(tenants).where(eq(tenants.id, tenantId));
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

    const allUnits = await db
      .select()
      .from(units)
      .where(eq(units.propertyId, propertyId));

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

    const bkaUnits: BKAUnit[] = allUnits.map(u => ({
      id: u.id,
      designation: u.designation,
      tenant: 'Unbekannt',
      area_m2: Number(u.areaM2 ?? 0),
      persons: 1,
    }));

    const costMap: Record<string, number> = {};
    for (const exp of expenses) {
      const cat = (exp as { bkvCategory?: string }).bkvCategory ?? BKACostCategory.SONSTIGE_KOSTEN;
      costMap[cat] = (costMap[cat] ?? 0) + Math.abs(exp.amountCents) / 100;
    }

    const costs: CostEntry[] = Object.entries(costMap).map(([cat, total]) => ({
      category: cat as BKACostCategory,
      total_eur: total,
      allocation_key: AllocationKey.WOHNFLAECHE,
    }));

    if (costs.length === 0) {
      costs.push({
        category: BKACostCategory.SONSTIGE_KOSTEN,
        total_eur: 0,
        allocation_key: AllocationKey.WOHNFLAECHE,
        description: 'Keine Kosten erfasst',
      });
    }

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
