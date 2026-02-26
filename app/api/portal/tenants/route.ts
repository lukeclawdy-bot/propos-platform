import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { tenants, units, properties } from '@/lib/db/schema';
import { eq, inArray } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  try {
    const landlordId = req.nextUrl.searchParams.get('landlordId');
    const propertyId = req.nextUrl.searchParams.get('propertyId');
    
    if (!landlordId && !propertyId) {
      return NextResponse.json({ error: 'landlordId or propertyId required' }, { status: 400 });
    }

    let tenantRows;
    
    if (propertyId) {
      // Get tenants for a specific property
      const propertyUnits = await db.select({ id: units.id }).from(units).where(eq(units.propertyId, propertyId));
      const unitIds = propertyUnits.map(u => u.id);
      
      if (unitIds.length === 0) {
        return NextResponse.json({ data: [] });
      }
      
      tenantRows = await db.select().from(tenants).where(inArray(tenants.unitId, unitIds));
    } else if (landlordId) {
      // Get all properties for landlord, then units, then tenants
      const props = await db.select({ id: properties.id }).from(properties).where(eq(properties.landlordId, landlordId));
      const propertyIds = props.map(p => p.id);
      
      if (propertyIds.length === 0) {
        return NextResponse.json({ data: [] });
      }
      
      const allUnits = await db.select({ id: units.id, propertyId: units.propertyId, designation: units.designation, coldRentCents: units.coldRentCents }).from(units).where(inArray(units.propertyId, propertyIds));
      const unitIds = allUnits.map(u => u.id);
      
      if (unitIds.length === 0) {
        return NextResponse.json({ data: [] });
      }
      
      tenantRows = await db.select().from(tenants).where(inArray(tenants.unitId, unitIds));
      
      // Enrich with unit info
      const enriched = tenantRows.map(t => {
        const unit = allUnits.find(u => u.id === t.unitId);
        const prop = unit ? props.find(p => p.id === unit.propertyId) : null;
        return {
          ...t,
          unit: unit ? {
            id: unit.id,
            designation: unit.designation,
            propertyAddress: prop ? (async () => {
              const [p] = await db.select({ address: properties.address }).from(properties).where(eq(properties.id, unit.propertyId));
              return p?.address || 'Unbekannt';
            })() : 'Unbekannt'
          } : null,
          coldRentCents: unit?.coldRentCents || null
        };
      });
      
      // Resolve addresses
      const enrichedWithAddresses = await Promise.all(
        enriched.map(async (t) => {
          const unit = allUnits.find(u => u.id === t.unitId);
          if (unit) {
            const [p] = await db.select({ address: properties.address }).from(properties).where(eq(properties.id, unit.propertyId));
            return {
              ...t,
              unit: {
                id: unit.id,
                designation: unit.designation,
                propertyAddress: p?.address || 'Unbekannt'
              }
            };
          }
          return t;
        })
      );
      
      return NextResponse.json({ data: enrichedWithAddresses });
    }

    return NextResponse.json({ data: tenantRows || [] });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { unitId, firstName, lastName, email, phone, moveInDate } = body;
    
    if (!unitId || !firstName || !lastName) {
      return NextResponse.json({ error: 'unitId, firstName, and lastName required' }, { status: 400 });
    }

    // Create tenant
    const [tenant] = await db.insert(tenants).values({
      unitId,
      firstName,
      lastName,
      email: email || null,
      phone: phone || null,
      moveInDate: moveInDate ? new Date(moveInDate) : null,
      active: true,
    }).returning();

    // Update unit to occupied
    await db.update(units).set({ occupied: true }).where(eq(units.id, unitId));

    return NextResponse.json({ data: tenant }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });

    const body = await req.json();
    const { email, phone, moveInDate, moveOutDate, active, firstName, lastName } = body;

    const updates: Record<string, unknown> = {};
    if (email !== undefined) updates.email = email;
    if (phone !== undefined) updates.phone = phone;
    if (moveInDate !== undefined) updates.moveInDate = moveInDate ? new Date(moveInDate) : null;
    if (moveOutDate !== undefined) updates.moveOutDate = moveOutDate ? new Date(moveOutDate) : null;
    if (active !== undefined) updates.active = active;
    if (firstName !== undefined) updates.firstName = firstName;
    if (lastName !== undefined) updates.lastName = lastName;

    const [tenant] = await db.update(tenants).set(updates).where(eq(tenants.id, id)).returning();
    if (!tenant) return NextResponse.json({ error: 'not found' }, { status: 404 });

    // If moveOutDate set, update unit to not occupied
    if (moveOutDate) {
      await db.update(units).set({ occupied: false }).where(eq(units.id, tenant.unitId));
    }

    return NextResponse.json({ data: tenant });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });

    const [tenant] = await db.select().from(tenants).where(eq(tenants.id, id));
    if (!tenant) return NextResponse.json({ error: 'not found' }, { status: 404 });

    // Soft delete by setting moveOutDate and inactive
    await db.update(tenants)
      .set({ moveOutDate: new Date(), active: false })
      .where(eq(tenants.id, id));

    // Update unit to not occupied
    await db.update(units).set({ occupied: false }).where(eq(units.id, tenant.unitId));

    return NextResponse.json({ data: { id, deleted: true } });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
