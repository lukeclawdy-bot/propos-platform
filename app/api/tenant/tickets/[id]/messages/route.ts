import { desc, eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { conversations, tickets } from '@/lib/db/schema';

// GET /api/tenant/tickets/[id]/messages - Get messages for a ticket
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

    // Verify ticket belongs to tenant
    const [ticket] = await db
      .select()
      .from(tickets)
      .where(eq(tickets.id, id));
    
    if (!ticket || String(ticket.tenantId) !== tenantId) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
    }

    const messages = await db
      .select()
      .from(conversations)
      .where(eq(conversations.ticketId, id))
      .orderBy(desc(conversations.createdAt));

    return NextResponse.json({ data: messages });
  } catch (e) {
    console.error('[tenant/messages] Error:', e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

// POST /api/tenant/tickets/[id]/messages - Add message to ticket
export async function POST(
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
    const { message } = body;

    if (!message || !message.trim()) {
      return NextResponse.json({ error: 'Message required' }, { status: 400 });
    }

    // Verify ticket belongs to tenant
    const [ticket] = await db
      .select()
      .from(tickets)
      .where(eq(tickets.id, id));
    
    if (!ticket || String(ticket.tenantId) !== tenantId) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
    }

    // Don't allow messages on closed tickets
    if (ticket.status === 'closed') {
      return NextResponse.json(
        { error: 'Ticket is closed' },
        { status: 400 }
      );
    }

    const [msg] = await db
      .insert(conversations)
      .values({
        ...(tenantId ? { tenantId } : {}),
        landlordId: ticket.landlordId!,
        ticketId: id,
        channel: 'portal',
        direction: 'inbound',
        body: message.trim().slice(0, 2000),
      })
      .returning();

    // Update ticket updatedAt
    await db
      .update(tickets)
      .set({ updatedAt: new Date() })
      .where(eq(tickets.id, id));

    return NextResponse.json({ data: msg }, { status: 201 });
  } catch (e) {
    console.error('[tenant/messages] Error:', e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
