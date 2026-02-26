import { eq, and, desc } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { conversations, properties, tenants, tickets, units } from '@/lib/db/schema';
import { inngest } from '@/lib/inngest/client';

// GET /api/tenant/tickets - List tickets for current tenant
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') as 'open' | 'inprogress' | 'resolved' | 'closed' | null;
    
    // Get tenantId from header (injected by middleware) or query param
    const tenantId = request.headers.get('x-tenant-id') || searchParams.get('tenantId');
    
    if (!tenantId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const conditions = [eq(tickets.tenantId, tenantId)];
    if (status) conditions.push(eq(tickets.status, status));

    const rows = await db
      .select({
        id: tickets.id,
        title: tickets.title,
        description: tickets.description,
        status: tickets.status,
        category: tickets.category,
        urgency: tickets.urgency,
        priority: tickets.priority,
        createdAt: tickets.createdAt,
        updatedAt: tickets.updatedAt,
        resolvedAt: tickets.resolvedAt,
        unitId: tickets.unitId,
        propertyId: tickets.propertyId,
        rating: tickets.rating,
      })
      .from(tickets)
      .where(and(...conditions))
      .orderBy(desc(tickets.createdAt));

    // Enrich with property info
    const enriched = await Promise.all(
      rows.map(async (t) => {
        const [unit] = t.unitId
          ? await db.select().from(units).where(eq(units.id, t.unitId))
          : [];
        const [property] = unit?.propertyId
          ? await db.select().from(properties).where(eq(properties.id, unit.propertyId))
          : [];
        return {
          ...t,
          unitDesignation: unit?.designation || null,
          propertyAddress: property?.address || null,
        };
      })
    );

    return NextResponse.json({ data: enriched });
  } catch (e) {
    console.error('[tenant/tickets] Error:', e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

// POST /api/tenant/tickets - Create new ticket
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, category, urgency, photos } = body;
    
    // Get tenantId from header (injected by middleware)
    const tenantId = request.headers.get('x-tenant-id');
    
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

    // Get unit and property info
    const [unit] = tenant.unitId
      ? await db.select().from(units).where(eq(units.id, tenant.unitId))
      : [];
    
    const [property] = unit?.propertyId
      ? await db.select().from(properties).where(eq(properties.id, unit.propertyId))
      : [];

    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    // Calculate SLA deadline based on urgency
    const now = Date.now();
    let slaHours = 120; // 5 Werktage default
    if (urgency === 1) slaHours = 24; // Dringend
    if (urgency === 2) slaHours = 120; // Normal
    if (urgency === 3) slaHours = 336; // Nicht dringend (14 Tage)
    
    const slaDeadline = new Date(now + slaHours * 60 * 60 * 1000);

    // Create ticket
    const [ticket] = await db
      .insert(tickets)
      .values({
        tenantId,
        unitId: tenant.unitId,
        landlordId: property.landlordId,
        propertyId: property.id,
        title: title.slice(0, 200),
        description: description?.slice(0, 2000) || null,
        category,
        urgency: urgency || 2,
        priority: urgency === 1 ? 'high' : urgency === 2 ? 'normal' : 'low',
        status: 'open',
        slaDeadline,
      })
      .returning();

    // Create initial conversation message from tenant
    await db.insert(conversations).values({
      ...(tenantId ? { tenantId } : {}),
      landlordId: property.landlordId!,
      ticketId: ticket.id,
      channel: 'portal',
      direction: 'inbound',
      body: `Kategorie: ${getCategoryLabel(category)}\nDringlichkeit: ${getUrgencyLabel(urgency)}\n\n${description || title}`,
      aiClassification: category || 'other',
      aiUrgency: urgency || 2,
    });

    // Fire notification event for landlord
    await inngest.send({
      name: "ticket.created",
      data: {
        ticketId: ticket.id,
        tenantId,
        unitId: tenant.unitId,
        landlordId: property.landlordId!,
        propertyId: property.id,
        title: ticket.title,
        description: ticket.description,
        category: ticket.category,
      },
    });

    return NextResponse.json({ data: ticket }, { status: 201 });
  } catch (e) {
    console.error('[tenant/tickets] Error:', e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    'repair': 'Reparatur',
    'water': 'Wasserschaden',
    'heating': 'Heizung',
    'lock': 'Schloss/Schlüssel',
    'noise': 'Lärm',
    'other': 'Sonstiges',
  };
  return labels[category] || 'Sonstiges';
}

function getUrgencyLabel(urgency: number): string {
  const labels: Record<number, string> = {
    1: 'Dringend',
    2: 'Normal',
    3: 'Nicht dringend',
  };
  return labels[urgency] || 'Normal';
}
