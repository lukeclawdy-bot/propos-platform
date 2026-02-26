import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { landlords, properties, tickets } from '@/lib/db/schema';
import { eq, count } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, type, communicationChannel } = body;
    if (!email) return NextResponse.json({ error: 'email required' }, { status: 400 });

    const [landlord] = await db.insert(landlords).values({
      email, name, type: type || 'private', communicationChannel: communicationChannel || 'email',
    }).onConflictDoNothing().returning();

    if (!landlord) {
      // Already exists — return existing
      const [existing] = await db.select().from(landlords).where(eq(landlords.email, email));
      return NextResponse.json({ data: existing });
    }

    return NextResponse.json({ data: landlord }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get('email');
    const id = req.nextUrl.searchParams.get('id');
    if (!email && !id) return NextResponse.json({ error: 'email or id required' }, { status: 400 });

    const [landlord] = email
      ? await db.select().from(landlords).where(eq(landlords.email, email))
      : await db.select().from(landlords).where(eq(landlords.id, id!));

    if (!landlord) return NextResponse.json({ error: 'not found' }, { status: 404 });

    const [propCount] = await db.select({ count: count() }).from(properties).where(eq(properties.landlordId, landlord.id));
    const [ticketCount] = await db.select({ count: count() }).from(tickets).where(eq(tickets.landlordId, landlord.id));

    return NextResponse.json({ data: { ...landlord, propertiesCount: propCount.count, ticketsCount: ticketCount.count } });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

// PATCH - Update landlord preferences (notification settings, etc.)
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, emailNewTicket, emailRentOverdue, emailDailyDigest, name, phone, companyName } = body;
    
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });

    // Build update object with only provided fields
    const updateData: Partial<typeof landlords.$inferInsert> = {};
    
    if (name !== undefined) updateData.name = name;
    if (phone !== undefined) updateData.phone = phone;
    if (companyName !== undefined) updateData.companyName = companyName;
    if (emailNewTicket !== undefined) updateData.emailNewTicket = emailNewTicket;
    if (emailRentOverdue !== undefined) updateData.emailRentOverdue = emailRentOverdue;
    if (emailDailyDigest !== undefined) updateData.emailDailyDigest = emailDailyDigest;
    
    // Always update the updatedAt timestamp
    updateData.updatedAt = new Date();

    const [updated] = await db
      .update(landlords)
      .set(updateData)
      .where(eq(landlords.id, id))
      .returning();

    if (!updated) return NextResponse.json({ error: 'landlord not found' }, { status: 404 });

    return NextResponse.json({ data: updated });
  } catch (e) {
    console.error('[landlord/patch] Error:', e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
