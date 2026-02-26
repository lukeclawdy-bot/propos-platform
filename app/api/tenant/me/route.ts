import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { tenants, units, properties, landlords } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// GET /api/tenant/me - Get current tenant info with property details
export async function GET(req: NextRequest) {
  try {
    const tenantId = req.headers.get('x-tenant-id');
    
    if (!tenantId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get tenant info
    const [tenant] = await db
      .select()
      .from(tenants)
      .where(eq(tenants.id, tenantId));
    
    if (!tenant) {
      return NextResponse.json({ error: 'Tenant not found' }, { status: 404 });
    }

    // Get unit info
    const [unit] = tenant.unitId
      ? await db.select().from(units).where(eq(units.id, tenant.unitId))
      : [];

    // Get property info
    const [property] = unit?.propertyId
      ? await db.select().from(properties).where(eq(properties.id, unit.propertyId))
      : [];

    // Get landlord info
    const [landlord] = property?.landlordId
      ? await db.select().from(landlords).where(eq(landlords.id, property.landlordId))
      : [];

    return NextResponse.json({
      data: {
        tenant: {
          id: tenant.id,
          firstName: tenant.firstName,
          lastName: tenant.lastName,
          email: tenant.email,
          phone: tenant.phone,
          moveInDate: tenant.moveInDate,
        },
        unit: unit
          ? {
              id: unit.id,
              designation: unit.designation,
              floor: unit.floor,
              areaM2: unit.areaM2,
              rooms: unit.rooms,
            }
          : null,
        property: property
          ? {
              id: property.id,
              address: property.address,
              postalCode: property.postalCode,
              city: property.city,
            }
          : null,
        landlord: landlord
          ? {
              id: landlord.id,
              name: landlord.name,
              companyName: landlord.companyName,
              email: landlord.email,
              phone: landlord.phone,
            }
          : null,
      },
    });
  } catch (e) {
    console.error('[tenant/me] Error:', e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
