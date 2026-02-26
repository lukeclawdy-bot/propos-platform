import { desc, eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { conversations, properties, tickets, units } from '@/lib/db/schema';

// GET /api/tenant/tickets/[id] - Get single ticket with messages
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const tenantId = request.headers.get('x-tenant-id');
    
    if (!tenantId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get ticket - must belong to this tenant
    const [ticket] = await db
      .select()
      .from(tickets)
      .where(eq(tickets.id, id));
    
    if (!ticket || String(ticket.tenantId) !== tenantId) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
    }

    // Get messages
    const messages = await db
      .select()
      .from(conversations)
      .where(eq(conversations.ticketId, id))
      .orderBy(desc(conversations.createdAt));

    // Enrich with property/unit info
    const [unit] = ticket.unitId
      ? await db.select().from(units).where(eq(units.id, ticket.unitId))
      : [];
    const [property] = unit?.propertyId
      ? await db.select().from(properties).where(eq(properties.id, unit.propertyId))
      : [];

    return NextResponse.json({
      data: {
        ...ticket,
        unitDesignation: unit?.designation || null,
        propertyAddress: property?.address || null,
        messages,
      },
    });
  } catch (e) {
    console.error('[tenant/ticket] Error:', e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

// PATCH /api/tenant/tickets/[id] - Update ticket (rating, etc.)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const tenantId = request.headers.get('x-tenant-id');
    
    if (!tenantId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { rating } = body;

    // Verify ticket belongs to tenant
    const [ticket] = await db
      .select()
      .from(tickets)
      .where(eq(tickets.id, id));
    
    if (!ticket || String(ticket.tenantId) !== tenantId) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
    }

    // Only allow rating for resolved tickets
    if (rating !== undefined) {
      if (ticket.status !== 'resolved' && ticket.status !== 'closed') {
        return NextResponse.json(
          { error: 'Can only rate resolved tickets' },
          { status: 400 }
        );
      }
      
      const [updated] = await db
        .update(tickets)
        .set({ rating })
        .where(eq(tickets.id, id))
        .returning();
      
      return NextResponse.json({ data: updated });
    }

    return NextResponse.json({ data: ticket });
  } catch (e) {
    console.error('[tenant/ticket] Error:', e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
