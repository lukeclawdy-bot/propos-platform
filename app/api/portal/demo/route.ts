import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import {
  landlords,
  properties,
  units,
  tenants,
  tickets,
  financialTransactions,
} from '@/lib/db/schema';
import { eq, and, count, sum, inArray } from 'drizzle-orm';

const DEMO_EMAIL = 'demo@einfach-verwaltet.de';

/**
 * GET /api/portal/demo
 *
 * Public (no auth) endpoint for Lukas to verify demo seed data is loaded.
 * Returns landlord info + aggregated stats from the database.
 *
 * Response shape:
 * {
 *   seeded: boolean,
 *   landlord: { id, name, email, plan },
 *   stats: {
 *     totalProperties,
 *     totalUnits,
 *     totalTenants,
 *     openTicketsCount,
 *     urgentTicketsCount,
 *     thisMonthRentExpectedCents,
 *     thisMonthRentReceivedCents,
 *     occupancyRate,
 *   }
 * }
 */
export async function GET() {
  try {
    // Find demo landlord
    const [landlord] = await db
      .select()
      .from(landlords)
      .where(eq(landlords.email, DEMO_EMAIL));

    if (!landlord) {
      return NextResponse.json(
        {
          seeded: false,
          message: 'Demo data not found. Run: npm run seed:demo',
          hint: 'DATABASE_URL must be set and the seed script must be executed.',
        },
        { status: 404 },
      );
    }

    const landlordId = landlord.id;

    // Properties
    const [propCount] = await db
      .select({ count: count() })
      .from(properties)
      .where(eq(properties.landlordId, landlordId));

    // Units
    const propRows = await db
      .select({ id: properties.id })
      .from(properties)
      .where(eq(properties.landlordId, landlordId));

    const propIds = propRows.map((p) => p.id);

    let totalUnits = 0;
    let occupiedUnits = 0;

    if (propIds.length > 0) {
      const [totalRes] = await db
        .select({ count: count() })
        .from(units)
        .where(inArray(units.propertyId, propIds));

      const [occupiedRes] = await db
        .select({ count: count() })
        .from(units)
        .where(and(inArray(units.propertyId, propIds), eq(units.occupied, true)));

      totalUnits = Number(totalRes.count);
      occupiedUnits = Number(occupiedRes.count);
    }

    // Tenants (active)
    let totalTenants = 0;
    if (propIds.length > 0) {
      // Get all unit IDs under this landlord
      const unitRows = await db
        .select({ id: units.id })
        .from(units)
        .where(inArray(units.propertyId, propIds));

      const unitIds = unitRows.map((u) => u.id);

      if (unitIds.length > 0) {
        const [tenantRes] = await db
          .select({ count: count() })
          .from(tenants)
          .where(and(inArray(tenants.unitId, unitIds), eq(tenants.active, true)));
        totalTenants = Number(tenantRes.count);
      }
    }

    // Tickets
    const [openRes] = await db
      .select({ count: count() })
      .from(tickets)
      .where(and(eq(tickets.landlordId, landlordId), eq(tickets.status, 'open')));

    const [urgentRes] = await db
      .select({ count: count() })
      .from(tickets)
      .where(and(eq(tickets.landlordId, landlordId), eq(tickets.priority, 'urgent')));

    // Financial — this month's expected vs received rent
    const now = new Date();
    const thisMonthLabel = now.toLocaleString('de-DE', { month: 'long', year: 'numeric' });

    const [expectedRes] = await db
      .select({ total: sum(financialTransactions.amountCents) })
      .from(financialTransactions)
      .where(
        and(
          eq(financialTransactions.landlordId, landlordId),
          eq(financialTransactions.type, 'rent_received'),
        ),
      );

    const [receivedRes] = await db
      .select({ total: sum(financialTransactions.amountCents) })
      .from(financialTransactions)
      .where(
        and(
          eq(financialTransactions.landlordId, landlordId),
          eq(financialTransactions.type, 'rent_received'),
          eq(financialTransactions.status, 'confirmed'),
        ),
      );

    // Property list for display
    const propList = await db
      .select({
        id: properties.id,
        address: properties.address,
        postalCode: properties.postalCode,
        city: properties.city,
        unitCount: properties.unitCount,
        verwaltungstyp: properties.verwaltungstyp,
      })
      .from(properties)
      .where(eq(properties.landlordId, landlordId));

    const thisMonthRentExpectedCents = Number(expectedRes?.total || 0);
    const thisMonthRentReceivedCents = Number(receivedRes?.total || 0);
    const occupancyRate =
      totalUnits > 0 ? Math.round((occupiedUnits / totalUnits) * 100) : 0;

    return NextResponse.json({
      seeded: true,
      generatedAt: new Date().toISOString(),
      landlord: {
        id: landlord.id,
        name: landlord.name,
        email: landlord.email,
        company: landlord.companyName,
        plan: 'pro',
        onboardingCompleted: landlord.onboardingCompleted,
      },
      stats: {
        totalProperties: Number(propCount.count),
        totalUnits,
        occupiedUnits,
        occupancyRate,
        totalTenants,
        openTicketsCount: Number(openRes.count),
        urgentTicketsCount: Number(urgentRes.count),
        thisMonthLabel,
        thisMonthRentExpectedCents,
        thisMonthRentExpectedEur: (thisMonthRentExpectedCents / 100).toFixed(2),
        thisMonthRentReceivedCents,
        thisMonthRentReceivedEur: (thisMonthRentReceivedCents / 100).toFixed(2),
        collectionRate:
          thisMonthRentExpectedCents > 0
            ? Math.round((thisMonthRentReceivedCents / thisMonthRentExpectedCents) * 100)
            : 0,
      },
      properties: propList,
    });
  } catch (e) {
    return NextResponse.json(
      { error: 'Failed to fetch demo data', detail: String(e) },
      { status: 500 },
    );
  }
}
