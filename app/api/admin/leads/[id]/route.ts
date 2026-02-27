export const dynamic = "force-dynamic";

import { db, hasDatabase } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

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
      status, 
      notes, 
      contactedAt, 
      demoAt, 
      proposalSentAt, 
      wonAt, 
      lostAt, 
      lostReason,
      source,
      utmMedium,
      utmCampaign,
      estimatedUnits,
      pipelineValueCents,
      assignedTo
    } = body;

    const updateData: Record<string, unknown> = {};
    if (status !== undefined) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;
    if (contactedAt !== undefined) updateData.contactedAt = contactedAt ? new Date(contactedAt) : null;
    if (demoAt !== undefined) updateData.demoAt = demoAt ? new Date(demoAt) : null;
    if (proposalSentAt !== undefined) updateData.proposalSentAt = proposalSentAt ? new Date(proposalSentAt) : null;
    if (wonAt !== undefined) updateData.wonAt = wonAt ? new Date(wonAt) : null;
    if (lostAt !== undefined) updateData.lostAt = lostAt ? new Date(lostAt) : null;
    if (lostReason !== undefined) updateData.lostReason = lostReason;
    if (source !== undefined) updateData.source = source;
    if (utmMedium !== undefined) updateData.utmMedium = utmMedium;
    if (utmCampaign !== undefined) updateData.utmCampaign = utmCampaign;
    if (estimatedUnits !== undefined) updateData.estimatedUnits = estimatedUnits;
    if (pipelineValueCents !== undefined) updateData.pipelineValueCents = pipelineValueCents;
    if (assignedTo !== undefined) updateData.assignedTo = assignedTo;

    await db.update(leads)
      .set(updateData)
      .where(eq(leads.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to update lead:", error);
    return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
  }
}
