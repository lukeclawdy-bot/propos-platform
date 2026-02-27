export const dynamic = "force-dynamic";

import { db, hasDatabase } from "@/lib/db";
import { outreachContacts, outreachTouches } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// GET /api/admin/outreach - list all outreach contacts
export async function GET(request: Request) {
  if (!hasDatabase || !db) {
    return NextResponse.json({ error: "Database not available" }, { status: 500 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const dealType = searchParams.get('dealType');
    const pipelineStage = searchParams.get('pipelineStage');
    const overdue = searchParams.get('overdue');

    let query = db.query.outreachContacts.findMany({
      orderBy: desc(outreachContacts.createdAt),
    });

    const contacts = await query;

    // Filter in memory since we may have complex filters
    let filtered = contacts;
    
    if (dealType && dealType !== 'all') {
      filtered = filtered.filter(c => c.dealType === dealType);
    }
    
    if (pipelineStage && pipelineStage !== 'all') {
      filtered = filtered.filter(c => c.pipelineStage === pipelineStage);
    }
    
    if (overdue === 'true') {
      const now = new Date();
      filtered = filtered.filter(c => {
        if (c.pipelineStage === 'signed' || c.pipelineStage === 'dead') return false;
        if (!c.followUpDueAt) return false;
        return new Date(c.followUpDueAt) < now;
      });
    }

    return NextResponse.json({ contacts: filtered });
  } catch (error) {
    console.error("Failed to fetch outreach contacts:", error);
    return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 });
  }
}

// POST /api/admin/outreach - create new outreach contact
export async function POST(request: Request) {
  if (!hasDatabase || !db) {
    return NextResponse.json({ error: "Database not available" }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { 
      name, 
      company, 
      email, 
      phone, 
      channel = 'email',
      source = 'cold',
      pipelineStage = 'identified',
      dealType = 'cold',
      unitsEstimate,
      notes
    } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const [newContact] = await db.insert(outreachContacts)
      .values({
        name,
        company,
        email,
        phone,
        channel,
        source,
        pipelineStage,
        dealType,
        unitsEstimate: unitsEstimate ? parseInt(unitsEstimate) : null,
        notes,
      })
      .returning();

    return NextResponse.json({ contact: newContact });
  } catch (error) {
    console.error("Failed to create outreach contact:", error);
    return NextResponse.json({ error: "Failed to create contact" }, { status: 500 });
  }
}
