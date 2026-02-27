export const dynamic = "force-dynamic";

import { db, hasDatabase } from "@/lib/db";
import { outreachContacts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// PATCH /api/admin/outreach/[id] - update outreach contact
export async function PATCH(
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
      pipelineStage, 
      notes, 
      followUpDueAt,
      unitsEstimate,
      dealType,
      status,
      lastContactAt,
      touchCount
    } = body;

    const updateData: Record<string, unknown> = {};
    
    if (pipelineStage !== undefined) updateData.pipelineStage = pipelineStage;
    if (notes !== undefined) updateData.notes = notes;
    if (followUpDueAt !== undefined) updateData.followUpDueAt = followUpDueAt ? new Date(followUpDueAt) : null;
    if (unitsEstimate !== undefined) updateData.unitsEstimate = unitsEstimate ? parseInt(unitsEstimate) : null;
    if (dealType !== undefined) updateData.dealType = dealType;
    if (status !== undefined) updateData.status = status;
    if (lastContactAt !== undefined) updateData.lastContactAt = lastContactAt ? new Date(lastContactAt) : null;
    if (touchCount !== undefined) updateData.touchCount = touchCount;
    
    // Always update the updatedAt timestamp
    updateData.updatedAt = new Date();

    const [updated] = await db.update(outreachContacts)
      .set(updateData)
      .where(eq(outreachContacts.id, id))
      .returning();

    return NextResponse.json({ contact: updated });
  } catch (error) {
    console.error("Failed to update outreach contact:", error);
    return NextResponse.json({ error: "Failed to update contact" }, { status: 500 });
  }
}
