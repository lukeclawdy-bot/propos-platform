/**
 * GET /api/portal/nka
 *
 * Returns all NKA records and properties with NKA status for the authenticated landlord.
 *
 * Response: { records: NkaRecord[], properties: PropertyNkaStatus[] }
 */

import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { db } from '@/lib/db';
import { nkaRecords, properties } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  try {
    const hdrs = await headers();
    const landlordId = hdrs.get('x-landlord-id') || req.nextUrl.searchParams.get('landlordId') || '';

    if (!landlordId) {
      return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 });
    }

    // Demo mode — return sample data
    if (landlordId.startsWith('demo-')) {
      const currentYear = new Date().getFullYear();
      return NextResponse.json({
        records: [
          {
            id: 'demo-nka-1',
            propertyId: 'demo-prop-1',
            abrechnungsjahr: currentYear - 1,
            status: 'generated',
            totalCosts: { WASSERVERSORGUNG: 1200, HEIZUNG: 3500, MUELLBESEITIGUNG: 480 },
            generatedAt: new Date(Date.now() - 7 * 86400000).toISOString(),
            createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
          },
        ],
        properties: [
          {
            id: 'demo-prop-1',
            address: 'Musterstraße 7',
            postalCode: '20099',
            city: 'Hamburg',
            nkaStatus: 'generated',
            abrechnungsjahr: currentYear - 1,
            deadline: `31.12.${currentYear}`,
          },
          {
            id: 'demo-prop-2',
            address: 'Alsterblick 5',
            postalCode: '22303',
            city: 'Hamburg',
            nkaStatus: 'ausstehend',
            abrechnungsjahr: currentYear - 1,
            deadline: `31.12.${currentYear}`,
          },
        ],
      });
    }

    // Real DB fetch
    const [allProperties, allRecords] = await Promise.all([
      db.select().from(properties).where(eq(properties.landlordId, landlordId)),
      db.select().from(nkaRecords).where(eq(nkaRecords.landlordId, landlordId)),
    ]);

    const currentYear = new Date().getFullYear();
    const lastYear = currentYear - 1;

    // Build property NKA status overview
    const propertiesWithStatus = allProperties.map((prop) => {
      const latestRecord = allRecords
        .filter((r) => r.propertyId === prop.id && r.abrechnungsjahr === lastYear)
        .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime())[0];

      return {
        id: prop.id,
        address: prop.address,
        postalCode: prop.postalCode,
        city: prop.city,
        nkaStatus: latestRecord ? latestRecord.status : 'ausstehend',
        abrechnungsjahr: lastYear,
        deadline: `31.12.${currentYear}`,
        recordId: latestRecord?.id,
      };
    });

    return NextResponse.json({
      records: allRecords,
      properties: propertiesWithStatus,
    });
  } catch (err) {
    console.error('[GET /api/portal/nka]', err);
    return NextResponse.json({ error: 'Interner Fehler' }, { status: 500 });
  }
}
