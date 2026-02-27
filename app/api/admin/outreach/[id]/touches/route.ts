export const dynamic = "force-dynamic";

import { db, hasDatabase } from "@/lib/db";
import { outreachTouches, outreachContacts } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { NextResponse } from "next/server";

// GET /api/admin/outreach/[id]/touches - list touches for a contact
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!hasDatabase || !db) {
    return NextResponse.json({ error: "Database not available" }, { status: 500 });
  }

  const { id } = await params;

  try {
    const touches = await db.query.outreachTouches.findMany({
      where: eq(outreachTouches.contactId, id),
      orderBy: desc(outreachTouches.createdAt),
    });

    return NextResponse.json({ touches });
  } catch (error) {
    console.error("Failed to fetch touches:", error);
    return NextResponse.json({ error: "Failed to fetch touches" }, { status: 500 });
  }
}

// POST /api/admin/outreach/[id]/touches - add new touch
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!hasDatabase || !db) {
    return NextResponse.json({ error: "Database not available" }, { status: 500 });
  }

  const { id } = await params;

  try {
    const body = await request.json();
    const { 
      channel,
      direction = 'outbound',
      contentSummary,
      outcome = 'no_response',
      agentId = 'lukas'
    } = body;

    if (!channel) {
      return NextResponse.json({ error: "Channel is required" }, { status: 400 });
    }

    // Insert the touch
    const [newTouch] = await db.insert(outreachTouches)
      .values({
        contactId: id,
        channel,
        direction,
        contentSummary,
        outcome,
        agentId,
      })
      .returning();

    // Update the contact's touch count and last contact date
    const existingTouches = await db.query.outreachTouches.findMany({
      where: eq(outreachTouches.contactId, id),
    });
    
    await db.update(outreachContacts)
      .set({
        touchCount: existingTouches.length,
        lastContactAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(outreachContacts.id, id));

    return NextResponse.json({ touch: newTouch });
  } catch (error) {
    console.error("Failed to create touch:", error);
    return NextResponse.json({ error: "Failed to create touch" }, { status: 500 });
  }
}
