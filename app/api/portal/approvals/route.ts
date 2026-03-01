import { NextRequest, NextResponse } from "next/server";

// ─── POST /api/portal/approvals ───────────────────────────────────────────────
// Creates a new approval request (called by AI agent) and fires Inngest event
// so the Eigentümer receives an email notification immediately.
export async function POST(request: NextRequest) {
  let body: {
    landlordId?: string;
    ticketId?: string;
    jobId?: string;
    type?: string;
    title?: string;
    description?: string;
    amountCents?: number;
    expiresAt?: string;
    metadata?: Record<string, unknown>;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ungültige JSON-Anfrage" }, { status: 400 });
  }

  const { landlordId, type, title } = body;
  if (!landlordId || !type || !title) {
    return NextResponse.json(
      { error: "landlordId, type und title sind Pflichtfelder" },
      { status: 400 }
    );
  }

  try {
    const { db } = await import("@/lib/db");
    const { approvals, auditTrail } = await import("@/lib/db/schema");

    // Insert approval into DB
    const [created] = await db
      .insert(approvals)
      .values({
        landlordId,
        ticketId: body.ticketId ?? undefined,
        jobId: body.jobId ?? undefined,
        type,
        title,
        description: body.description ?? undefined,
        amountCents: body.amountCents ?? undefined,
        expiresAt: body.expiresAt ? new Date(body.expiresAt) : undefined,
        metadata: body.metadata ?? {},
        status: "pending",
      })
      .returning();

    // Log creation to audit_trail
    try {
      await db.insert(auditTrail).values({
        entityType: "approval",
        entityId: created.id,
        action: "approval_created",
        actorType: "agent",
        actorId: "api:portal/approvals",
        description: `Genehmigungsanfrage erstellt: ${type} — ${title}`,
        metadata: { type, amountCents: body.amountCents ?? null },
      });
    } catch (auditErr) {
      console.warn("[approvals POST] audit trail failed (non-fatal):", auditErr);
    }

    // Fire Inngest event → triggers approval.notify function
    try {
      const { inngest } = await import("@/lib/inngest/client");
      await inngest.send({
        name: "approval/created",
        data: {
          approvalId: created.id,
          landlordId,
          type,
          title,
          amountCents: body.amountCents ?? null,
          ticketId: body.ticketId ?? null,
          jobId: body.jobId ?? null,
        },
      });
    } catch (inngestErr) {
      // Non-fatal — approval is created, notification might just be delayed
      console.warn("[approvals POST] Inngest send failed (non-fatal):", inngestErr);
    }

    return NextResponse.json({ data: created }, { status: 201 });
  } catch (err) {
    console.error("[approvals POST]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// ─── GET /api/portal/approvals ────────────────────────────────────────────────
// List pending approvals for a landlord
export async function GET(request: NextRequest) {
  const landlordId = request.nextUrl.searchParams.get("landlordId");
  if (!landlordId) {
    return NextResponse.json({ error: "landlordId required" }, { status: 400 });
  }

  try {
    const { db } = await import("@/lib/db");
    const { approvals } = await import("@/lib/db/schema");
    const { eq, and, desc } = await import("drizzle-orm");

    const rows = await db
      .select()
      .from(approvals)
      .where(and(eq(approvals.landlordId, landlordId), eq(approvals.status, "pending")))
      .orderBy(desc(approvals.requestedAt));

    return NextResponse.json({ data: rows });
  } catch (err) {
    console.error("[approvals GET]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
