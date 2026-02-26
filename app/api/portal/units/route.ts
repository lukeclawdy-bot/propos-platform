import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { units, tenants, properties } from '@/lib/db/schema';
import { eq, and, inArray } from 'drizzle-orm';
import { getDemoUnits, getDemoTenants } from '@/lib/demo-data';

export async function GET(req: NextRequest) {
  try {
    const propertyId = req.nextUrl.searchParams.get('propertyId');
    const landlordId = req.nextUrl.searchParams.get('landlordId');
    
    if (!propertyId && !landlordId) {
      return NextResponse.json({ error: 'propertyId or landlordId required' }, { status: 400 });
    }

    // Check if this is a demo request
    if (landlordId === 'demo' || landlordId?.startsWith('demo-') || propertyId?.startsWith('demo-')) {
      let demoUnits = getDemoUnits();
      
      // Filter by property if specified
      if (propertyId) {
        demoUnits = demoUnits.filter(u => u.propertyId === propertyId);
      }
      
      // Enrich with tenant info if occupied
      const demoTenants = getDemoTenants();
      const enriched = demoUnits.map((u) => {
        const tenant = u.occupied 
          ? demoTenants.find(t => t.unitId === u.id)
          : null;
        return { 
          ...u, 
          tenantName: tenant ? `${tenant.firstName} ${tenant.lastName}` : null,
          tenantEmail: tenant?.email || null,
        };
      });
      
      return NextResponse.json({ data: enriched });
    }

    let rows;
    
    if (landlordId) {
      // First get properties for this landlord
      const props = await db.select({ id: properties.id }).from(properties).where(eq(properties.landlordId, landlordId));
      const propertyIds = props.map(p => p.id);
      
      if (propertyIds.length === 0) {
        return NextResponse.json({ data: [] });
      }
      
      rows = await db.select().from(units).where(inArray(units.propertyId, propertyIds));
    } else if (propertyId) {
      rows = await db.select().from(units).where(eq(units.propertyId, propertyId));
    } else {
      rows = [];
    }
    
    // Enrich with tenant info if occupied
    const enriched = await Promise.all(rows.map(async (u) => {
      const tenant = u.occupied 
        ? (await db.select().from(tenants).where(eq(tenants.unitId, u.id)))[0]
        : null;
      return { 
        ...u, 
        tenantName: tenant ? `${tenant.firstName} ${tenant.lastName}` : null,
        tenantEmail: tenant?.email || null,
      };
    }));

    return NextResponse.json({ data: enriched });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { propertyId, designation, areaM2, floor, rooms, coldRentCents } = body;
    
    if (!propertyId || !designation) {
      return NextResponse.json({ error: 'propertyId and designation required' }, { status: 400 });
    }

    const [unit] = await db.insert(units).values({
      propertyId,
      designation,
      areaM2: areaM2 ? String(areaM2) : null,
      floor: floor || null,
      rooms: rooms ? String(rooms) : null,
      coldRentCents: coldRentCents || null,
      occupied: false,
    }).returning();

    return NextResponse.json({ data: unit }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, designation, areaM2, floor, rooms, coldRentCents, occupied } = body;
    
    if (!id) {
      return NextResponse.json({ error: 'id required' }, { status: 400 });
    }

    const updates: Record<string, unknown> = {};
    if (designation !== undefined) updates.designation = designation;
    if (areaM2 !== undefined) updates.areaM2 = String(areaM2);
    if (floor !== undefined) updates.floor = floor;
    if (rooms !== undefined) updates.rooms = String(rooms);
    if (coldRentCents !== undefined) updates.coldRentCents = coldRentCents;
    if (occupied !== undefined) updates.occupied = occupied;

    const [unit] = await db.update(units).set(updates).where(eq(units.id, id)).returning();
    if (!unit) return NextResponse.json({ error: 'not found' }, { status: 404 });

    return NextResponse.json({ data: unit });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });

    // Check if unit has an active tenant
    const [tenant] = await db.select().from(tenants).where(eq(tenants.unitId, id));
    if (tenant && !tenant.moveOutDate) {
      return NextResponse.json({ error: 'unit has active tenant' }, { status: 400 });
    }

    // Delete unit (hard delete - units don't have soft delete)
    await db.delete(units).where(eq(units.id, id));

    return NextResponse.json({ data: { id, deleted: true } });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
