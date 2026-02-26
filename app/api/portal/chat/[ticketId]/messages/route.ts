import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { conversations } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ ticketId: string }> }) {
  try {
    const { ticketId } = await params;
    
    const messages = await db.select().from(conversations)
      .where(eq(conversations.ticketId, ticketId))
      .orderBy(desc(conversations.createdAt));
    
    // Transform to the expected format
    const formattedMessages = messages.map(msg => ({
      id: msg.id,
      sender: msg.direction === 'inbound' ? 'tenant' : msg.aiGenerated ? 'ai' : 'human',
      content: msg.body,
      createdAt: msg.createdAt,
      aiConfidence: msg.aiUrgency ? msg.aiUrgency >= 4 ? 'high' : msg.aiUrgency >= 2 ? 'medium' : 'low' : undefined,
    }));

    return NextResponse.json({ data: formattedMessages });
  } catch (e) {
    console.error('Error fetching messages:', e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
