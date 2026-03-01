import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { aiActions, approvals, auditTrail } from '@/lib/db/schema';
import { eq, and, desc } from 'drizzle-orm';

// Types that require Eigentümer approval
const APPROVAL_TYPES = new Set([
  'repair_cost',
  'rent_increase',
  'contractor_hire',
  'legal_action',
  'mieterhoehung',
  'mahnung',
]);

export async function GET(req: NextRequest) {
  try {
    const landlordId = req.nextUrl.searchParams.get('landlordId');
    if (!landlordId) return NextResponse.json({ error: 'landlordId required' }, { status: 400 });

    const actions = await db.select().from(aiActions)
      .where(and(eq(aiActions.landlordId, landlordId), eq(aiActions.status, 'pending')))
      .orderBy(desc(aiActions.urgency), desc(aiActions.createdAt));

    return NextResponse.json({ data: actions });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      landlordId,
      propertyId,
      unitId,
      tenantId,
      type,
      urgency,
      title,
      bodyText,
      actionLabel,
      dismissLabel,
      metadata,
      expiresAt,
      // Approval fields (optional)
      requiresApproval,
      approvalType,
      description,
      amountCents,
      ticketId,
      jobId,
    } = body;

    if (!landlordId || !type || !title) {
      return NextResponse.json({ error: 'landlordId, type und title sind Pflichtfelder' }, { status: 400 });
    }

    // Insert AI action
    const [action] = await db.insert(aiActions).values({
      landlordId,
      propertyId: propertyId ?? null,
      unitId: unitId ?? null,
      tenantId: tenantId ?? null,
      type,
      urgency: urgency ?? 2,
      title,
      body: bodyText ?? null,
      actionLabel: actionLabel ?? 'Handeln',
      dismissLabel: dismissLabel ?? 'Ignorieren',
      metadata: metadata ?? {},
      expiresAt: expiresAt ? new Date(expiresAt) : null,
      status: 'pending',
    }).returning();

    // If action requires approval, create approval record + fire Inngest event
    const needsApproval = requiresApproval || APPROVAL_TYPES.has(type);
    let createdApproval = null;

    if (needsApproval) {
      const resolvedApprovalType = approvalType || type;

      // Insert approval
      const [approval] = await db.insert(approvals).values({
        landlordId,
        ticketId: ticketId ?? null,
        jobId: jobId ?? null,
        type: resolvedApprovalType,
        title,
        description: description ?? bodyText ?? null,
        amountCents: amountCents ?? null,
        status: 'pending',
        metadata: { aiActionId: action.id, ...(metadata ?? {}) },
      }).returning();

      createdApproval = approval;

      // Log to audit_trail
      try {
        await db.insert(auditTrail).values({
          entityType: 'approval',
          entityId: approval.id,
          action: 'approval_created',
          actorType: 'agent',
          actorId: 'api:portal/ai-actions',
          description: `KI-Agent erstellt Genehmigungsanfrage: ${resolvedApprovalType} — ${title}`,
          metadata: { aiActionId: action.id, amountCents: amountCents ?? null },
        });
      } catch (auditErr) {
        console.warn('[ai-actions POST] audit trail failed (non-fatal):', auditErr);
      }

      // Fire Inngest event → triggers approval.notify → sends email to Eigentümer
      try {
        const { inngest } = await import('@/lib/inngest/client');
        await inngest.send({
          name: 'approval/created',
          data: {
            approvalId: approval.id,
            landlordId,
            type: resolvedApprovalType,
            title,
            amountCents: amountCents ?? null,
            ticketId: ticketId ?? null,
            jobId: jobId ?? null,
          },
        });
      } catch (inngestErr) {
        console.warn('[ai-actions POST] Inngest send failed (non-fatal):', inngestErr);
      }
    }

    return NextResponse.json({ data: action, approval: createdApproval }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body;
    if (!id || !status) return NextResponse.json({ error: 'id and status required' }, { status: 400 });

    const [action] = await db.update(aiActions)
      .set({ status })
      .where(eq(aiActions.id, id))
      .returning();

    return NextResponse.json({ data: action });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
