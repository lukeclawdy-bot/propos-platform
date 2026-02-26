import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { properties, units, tickets } from '@/lib/db/schema';
import { eq, count, isNull } from 'drizzle-orm';
import { getDemoProperties } from '@/lib/demo-data';

export async function GET(req: NextRequest) {
  try {
    const landlordId = req.nextUrl.searchParams.get('landlordId');
    if (!landlordId) return NextResponse.json({ error: 'landlordId required' }, { status: 400 });

    // Check if this is a demo request
    if (landlordId === 'demo' || landlordId.startsWith('demo-')) {
      return NextResponse.json({ data: getDemoProperties() });
    }

    const props = await db.select().from(properties).where(eq(properties.landlordId, landlordId));

    const enriched = await Promise.all(props.map(async (p) => {
      const [unitCount] = await db.select({ count: count() }).from(units).where(eq(units.propertyId, p.id));
      const [openTickets] = await db.select({ count: count() }).from(tickets)
        .where(eq(tickets.propertyId, p.id));
      return { ...p, unitsCount: unitCount.count, openTicketsCount: openTickets.count };
    }));

    return NextResponse.json({ data: enriched });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { landlordId, address, city, postalCode, verwaltungstyp, unitCount } = body;
    if (!landlordId || !address) return NextResponse.json({ error: 'landlordId and address required' }, { status: 400 });

    const [property] = await db.insert(properties).values({
      landlordId, address, city: city || 'Hamburg',
      postalCode: postalCode || '', verwaltungstyp: verwaltungstyp || 'miet',
      unitCount: unitCount || 1,
    }).returning();

    return NextResponse.json({ data: property }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, address, city, postalCode, unitCount } = body;
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });

    const updates: Record<string, unknown> = {};
    if (address !== undefined) updates.address = address;
    if (city !== undefined) updates.city = city;
    if (postalCode !== undefined) updates.postalCode = postalCode;
    if (unitCount !== undefined) updates.unitCount = unitCount;

    const [property] = await db.update(properties).set(updates).where(eq(properties.id, id)).returning();
    if (!property) return NextResponse.json({ error: 'not found' }, { status: 404 });

    return NextResponse.json({ data: property });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });

    // Soft delete by setting active to false
    const [property] = await db.update(properties)
      .set({ active: false })
      .where(eq(properties.id, id))
      .returning();

    if (!property) return NextResponse.json({ error: 'not found' }, { status: 404 });

    return NextResponse.json({ data: { id, deleted: true } });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
