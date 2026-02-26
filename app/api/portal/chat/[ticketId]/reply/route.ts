import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { conversations, tickets, tenants, units, properties } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest, { params }: { params: Promise<{ ticketId: string }> }) {
  try {
    const { ticketId } = await params;
    const body = await req.json();
    const { content, landlordId } = body;

    if (!content || !landlordId) {
      return NextResponse.json({ error: 'content and landlordId required' }, { status: 400 });
    }

    // Store the human message in conversations table
    const [msg] = await db.insert(conversations).values({
      ticketId,
      landlordId,
      direction: 'outbound',
      body: content,
      aiGenerated: false,
      channel: 'portal',
    }).returning();

    // Update ticket status to inprogress
    await db.update(tickets)
      .set({ status: 'inprogress', updatedAt: new Date() })
      .where(eq(tickets.id, ticketId));

    // Get tenant email for notification
    const ticketResult = await db.select({
      tenantId: tickets.tenantId,
      title: tickets.title,
    }).from(tickets).where(eq(tickets.id, ticketId));

    if (ticketResult.length > 0 && ticketResult[0].tenantId) {
      const tenantResult = await db.select({
        email: tenants.email,
        firstName: tenants.firstName,
        lastName: tenants.lastName,
      }).from(tenants).where(eq(tenants.id, ticketResult[0].tenantId));

      if (tenantResult.length > 0 && tenantResult[0].email) {
        const tenant = tenantResult[0];
        const ticket = ticketResult[0];
        
        // Send email notification to tenant
        try {
          await resend.emails.send({
            from: 'einfach verwaltet <noreply@einfach-verwaltet.de>',
            to: tenant.email,
            subject: 'Neue Nachricht von Ihrer Hausverwaltung',
            html: `
              <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #1B3A5C;">Hallo ${tenant.firstName || tenant.lastName || ''},</h2>
                <p>Sie haben eine neue Nachricht von Ihrer Hausverwaltung zu Ihrem Anliegen:</p>
                <div style="background: #F0EFED; padding: 16px; border-radius: 8px; margin: 16px 0;">
                  <strong>${ticket.title}</strong>
                </div>
                <div style="background: #FAFAF8; padding: 16px; border-radius: 8px; border-left: 4px solid #2A7F7F; margin: 16px 0;">
                  <p style="margin: 0; white-space: pre-wrap;">${content}</p>
                </div>
                <p style="color: #6B6B6B; font-size: 14px;">
                  Antworten Sie einfach auf diese E-Mail oder loggen Sie sich im Mieter-Portal ein.
                </p>
                <hr style="border: none; border-top: 1px solid #E5E5E5; margin: 24px 0;" />
                <p style="color: #6B6B6B; font-size: 12px;">
                  einfach verwaltet. – Ihre digitale Hausverwaltung
                </p>
              </div>
            `,
          });
        } catch (emailError) {
          console.error('Failed to send email:', emailError);
          // Don't fail the request if email fails
        }
      }
    }

    return NextResponse.json({ 
      data: {
        id: msg.id,
        sender: 'human',
        content: msg.body,
        createdAt: msg.createdAt,
      }
    }, { status: 201 });
  } catch (e) {
    console.error('Error sending reply:', e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
