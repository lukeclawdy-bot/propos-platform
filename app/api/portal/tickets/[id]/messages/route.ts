import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { conversations } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const messages = await db.select().from(conversations)
      .where(eq(conversations.ticketId, id))
      .orderBy(conversations.createdAt);
    return NextResponse.json({ data: messages });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { landlordId, tenantId, direction, body: msgBody, aiGenerated } = body;

    if (!msgBody || !direction || !landlordId) {
      return NextResponse.json({ error: 'landlordId, direction, body required' }, { status: 400 });
    }

    const [msg] = await db.insert(conversations).values({
      ticketId: id, landlordId,
      ...(tenantId ? { tenantId } : {}),
      direction, body: msgBody,
      aiGenerated: aiGenerated || false,
      channel: 'portal',
    }).returning();

    return NextResponse.json({ data: msg }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
