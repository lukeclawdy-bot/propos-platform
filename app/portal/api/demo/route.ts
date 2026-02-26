import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { landlords, properties, units, tenants, tickets, financialTransactions } from '@/lib/db/schema';
import { eq, sql } from 'drizzle-orm';

const DEMO_EMAIL = 'demo@einfach-verwaltet.de';

export async function GET() {
  try {
    // Find demo landlord
    const [landlord] = await db
      .select()
      .from(landlords)
      .where(eq(landlords.email, DEMO_EMAIL));

    if (!landlord) {
      return NextResponse.json(
        { error: 'Demo data not seeded. Run: npm run seed:demo' },
        { status: 404 }
      );
    }

    // Get property count + total units
    const propertyRows = await db
      .select()
      .from(properties)
      .where(eq(properties.landlordId, landlord.id));

    const totalUnits = propertyRows.reduce((sum, p) => sum + (p.unitCount || 0), 0);

    // Count tenants across all units of all properties
    const allPropertyIds = propertyRows.map(p => p.id);
    let tenantCount = 0;
    for (const propId of allPropertyIds) {
      const propUnits = await db
        .select()
        .from(units)
        .where(eq(units.propertyId, propId));
      for (const u of propUnits) {
        const unitTenants = await db
          .select()
          .from(tenants)
          .where(eq(tenants.unitId, u.id));
        tenantCount += unitTenants.filter(t => t.active).length;
      }
    }

    // Count tickets by status
    const ticketRows = await db
      .select()
      .from(tickets)
      .where(eq(tickets.landlordId, landlord.id));

    const ticketsByStatus = {
      open: ticketRows.filter(t => t.status === 'open').length,
      inprogress: ticketRows.filter(t => t.status === 'inprogress').length,
      resolved: ticketRows.filter(t => t.status === 'resolved').length,
      closed: ticketRows.filter(t => t.status === 'closed').length,
    };

    // Sum rent this month
    const txRows = await db
      .select()
      .from(financialTransactions)
      .where(eq(financialTransactions.landlordId, landlord.id));

    const totalRentCents = txRows
      .filter(t => t.type === 'rent_received')
      .reduce((sum, t) => sum + (t.amountCents || 0), 0);

    const paidRentCents = txRows
      .filter(t => t.type === 'rent_received' && t.status === 'confirmed')
      .reduce((sum, t) => sum + (t.amountCents || 0), 0);

    return NextResponse.json({
      landlord: {
        id: landlord.id,
        name: landlord.name,
        email: landlord.email,
        type: landlord.type,
        onboardingCompleted: landlord.onboardingCompleted,
      },
      stats: {
        properties: propertyRows.length,
        totalUnits,
        tenants: tenantCount,
        tickets: {
          total: ticketRows.length,
          ...ticketsByStatus,
        },
        revenue: {
          expectedCents: totalRentCents,
          receivedCents: paidRentCents,
          expectedEur: (totalRentCents / 100).toFixed(2),
          receivedEur: (paidRentCents / 100).toFixed(2),
          collectionRate: totalRentCents > 0
            ? `${((paidRentCents / totalRentCents) * 100).toFixed(1)}%`
            : '0%',
        },
      },
      properties: propertyRows.map(p => ({
        id: p.id,
        address: `${p.address}, ${p.postalCode} ${p.city}`,
        units: p.unitCount,
        type: p.verwaltungstyp,
      })),
      seeded: true,
    });
  } catch (error) {
    console.error('Demo endpoint error:', error);
    return NextResponse.json(
      { error: 'Database not available', seeded: false },
      { status: 500 }
    );
  }
}
