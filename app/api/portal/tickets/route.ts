import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { tickets, tenants, units } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { inngest } from '@/lib/inngest/client';

export async function GET(req: NextRequest) {
  try {
    const landlordId = req.nextUrl.searchParams.get('landlordId');
    const status = req.nextUrl.searchParams.get('status');
    if (!landlordId) return NextResponse.json({ error: 'landlordId required' }, { status: 400 });

    const conditions = [eq(tickets.landlordId, landlordId)];
    if (status) conditions.push(eq(tickets.status, status));

    const rows = await db.select().from(tickets).where(and(...conditions))
      .orderBy(tickets.createdAt);

    // Enrich with tenant + unit names
    const enriched = await Promise.all(rows.map(async (t) => {
      const tenant = t.tenantId
        ? (await db.select().from(tenants).where(eq(tenants.id, t.tenantId)))[0]
        : null;
      const unit = t.unitId
        ? (await db.select().from(units).where(eq(units.id, t.unitId)))[0]
        : null;
      return { ...t, tenantName: tenant ? `${tenant.firstName} ${tenant.lastName}` : null, unitDesignation: unit?.designation || null };
    }));

    return NextResponse.json({ data: enriched });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tenantId, unitId, landlordId, propertyId, title, description, urgency, category } = body;
    if (!landlordId || !title || !propertyId) return NextResponse.json({ error: 'landlordId, propertyId, title required' }, { status: 400 });

    const slaDeadline = new Date(Date.now() + 48 * 60 * 60 * 1000); // 48h SLA

    const [ticket] = await db.insert(tickets).values({
      tenantId, unitId, landlordId, propertyId, title, description,
      urgency: urgency || 2, category: category || 'other',
      status: 'open', slaDeadline,
    }).returning();

    // Fire notification event for landlord (if tenant-created, otherwise skip)
    if (tenantId) {
      await inngest.send({
        name: "ticket.created",
        data: {
          ticketId: ticket.id,
          tenantId,
          unitId,
          landlordId,
          propertyId,
          title: ticket.title,
          description: ticket.description,
          category: ticket.category,
        },
      });
    }

    return NextResponse.json({ data: ticket }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
