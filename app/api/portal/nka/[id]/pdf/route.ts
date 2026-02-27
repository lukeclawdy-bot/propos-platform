/**
 * GET /api/portal/nka/[id]/pdf
 *
 * Downloads the generated NKA as HTML (print-to-PDF via browser).
 * Fetches the nka_records row, reconstructs the BKA calculation,
 * and returns the HTML document.
 *
 * Query params: ?unitId=<unit-uuid>
 */

import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { db } from '@/lib/db';
import { nkaRecords, properties, units, tenants } from '@/lib/db/schema';
import { eq, and, inArray } from 'drizzle-orm';
import { calculateBKA } from '@/lib/bka-engine/calculator';
import {
  BKACostCategory,
  AllocationKey,
  type Property as BKAProperty,
  type Unit as BKAUnit,
  type CostEntry,
  type BKAInput,
} from '@/lib/bka-engine/types';
import { generateNKAHtml } from '@/lib/pdf/nka-generator';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const hdrs = await headers();
    const landlordIdHeader = hdrs.get('x-landlord-id');
    const unitId = req.nextUrl.searchParams.get('unitId');

    // Demo mode
    if (!landlordIdHeader || landlordIdHeader.startsWith('demo-') || id.startsWith('demo-')) {
      return new NextResponse('<html><body><h1>Demo NKA — Musterstraße 7</h1><p>Öffnen Sie die NKA über den NKA-Assistenten.</p></body></html>', {
        status: 200,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }

    const landlordId = landlordIdHeader;

    // Fetch NKA record
    const [record] = await db.select().from(nkaRecords).where(
      and(eq(nkaRecords.id, id), eq(nkaRecords.landlordId, landlordId))
    );

    if (!record) {
      return NextResponse.json({ error: 'NKA nicht gefunden.' }, { status: 404 });
    }

    const [property] = await db.select().from(properties).where(eq(properties.id, record.propertyId));
    if (!property) {
      return NextResponse.json({ error: 'Objekt nicht gefunden.' }, { status: 404 });
    }

    const allUnits = await db.select().from(units).where(eq(units.propertyId, record.propertyId));
    const unitIds2 = allUnits.map(u => u.id);
    const allTenants = unitIds2.length > 0
      ? await db.select().from(tenants).where(inArray(tenants.unitId, unitIds2))
      : [];

    const bkaUnits: BKAUnit[] = allUnits.map(u => {
      const tenant = allTenants.find(t => t.unitId === u.id);
      return {
        id: u.id,
        designation: u.designation,
        tenant: tenant ? `${tenant.firstName} ${tenant.lastName}` : 'Leerstand',
        area_m2: Number(u.areaM2 ?? 0),
        persons: 1,
        moveInDate: tenant?.moveInDate ?? undefined,
        moveOutDate: tenant?.moveOutDate ?? undefined,
      };
    });

    const storedCosts = (record.totalCosts as Record<string, number>) ?? {};
    const costs: CostEntry[] = Object.entries(storedCosts)
      .filter(([, v]) => v > 0)
      .map(([cat, total]) => ({
        category: cat as BKACostCategory,
        total_eur: total,
        allocation_key: AllocationKey.WOHNFLAECHE,
      }));

    if (costs.length === 0) {
      costs.push({ category: BKACostCategory.SONSTIGE_KOSTEN, total_eur: 0, allocation_key: AllocationKey.WOHNFLAECHE });
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
      periodStart: new Date(`${record.abrechnungsjahr}-01-01`),
      periodEnd: new Date(`${record.abrechnungsjahr}-12-31`),
      costs,
      unit_vorauszahlungen: {},
    };

    const bkaResult = calculateBKA(bkaInput);

    // If specific unit requested, return that unit's NKA
    const targetUnit = unitId
      ? bkaResult.unitResults.find(r => r.unit.id === unitId)
      : bkaResult.unitResults[0];

    if (!targetUnit) {
      return NextResponse.json({ error: 'Wohneinheit nicht gefunden.' }, { status: 404 });
    }

    const landlordName = property.ownerName ?? 'Vermieter';
    const html = generateNKAHtml({
      result: bkaResult,
      unitResult: targetUnit,
      property: bkaProperty,
      landlordName,
      generatedAt: record.generatedAt ?? new Date(),
    });

    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Disposition': `inline; filename="NKA-${record.abrechnungsjahr}-${targetUnit.unit.designation.replace(/\s+/g, '-')}.html"`,
      },
    });
  } catch (err) {
    console.error('[GET /api/portal/nka/[id]/pdf]', err);
    return NextResponse.json({ error: 'Interner Fehler' }, { status: 500 });
  }
}
