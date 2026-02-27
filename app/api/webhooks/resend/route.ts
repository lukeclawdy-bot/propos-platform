export const dynamic = "force-dynamic";

import { db, hasDatabase } from "@/lib/db";
import { emailEvents, leads } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// Resend webhook handler
// https://resend.com/docs/dashboard/webhooks

interface ResendWebhookPayload {
  type: 'email.sent' | 'email.delivered' | 'email.opened' | 'email.clicked' | 'email.bounced' | 'email.complained';
  created_at: string;
  data: {
    email_id: string;
    from: string;
    to: string[];
    subject: string;
    tags?: Record<string, string>;
  };
}

export async function POST(request: Request) {
  if (!hasDatabase || !db) {
    return NextResponse.json({ error: "Database not available" }, { status: 500 });
  }

  try {
    const payload: ResendWebhookPayload = await request.json();
    
    // Map Resend event type to our event type
    const eventTypeMap: Record<string, string> = {
      'email.sent': 'sent',
      'email.delivered': 'delivered',
      'email.opened': 'opened',
      'email.clicked': 'clicked',
      'email.bounced': 'bounced',
      'email.complained': 'complained',
    };

    const eventType = eventTypeMap[payload.type];
    if (!eventType) {
      return NextResponse.json({ message: "Unknown event type" }, { status: 200 });
    }

    const recipientEmail = payload.data.to[0];
    if (!recipientEmail) {
      return NextResponse.json({ error: "No recipient email" }, { status: 400 });
    }

    // Try to find matching lead by email
    const lead = await db.query.leads.findFirst({
      where: eq(leads.email, recipientEmail),
    });

    // Insert email event
    await db.insert(emailEvents).values({
      resendMessageId: payload.data.email_id,
      recipientEmail,
      eventType,
      leadId: lead?.id || null,
      metadata: {
        from: payload.data.from,
        subject: payload.data.subject,
        tags: payload.data.tags,
        created_at: payload.created_at,
      },
    });

    // Update lead status based on event type
    if (lead) {
      let updateData: Record<string, unknown> = {};
      
      if (eventType === 'opened' && lead.status === 'new') {
        updateData.status = 'contacted';
        updateData.contactedAt = new Date();
      }
      
      if (eventType === 'clicked' && lead.status === 'new') {
        updateData.status = 'contacted';
        updateData.contactedAt = new Date();
      }

      if (Object.keys(updateData).length > 0) {
        await db.update(leads)
          .set(updateData)
          .where(eq(leads.id, lead.id));
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to process Resend webhook:", error);
    return NextResponse.json({ error: "Failed to process webhook" }, { status: 500 });
  }
}
