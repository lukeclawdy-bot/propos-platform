// POST /api/portal/billing/webhook
// Stripe webhook handler — processes billing events for DB sync + dunning.
// Must be registered as webhook endpoint in Stripe Dashboard.
// Config: STRIPE_WEBHOOK_SECRET env var required.

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { billingSubscriptions, billingInvoices, billingEvents, landlords } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { getStripe } from '@/lib/stripe';
import { inngest } from '@/lib/inngest/client';
import Stripe from 'stripe';

export const dynamic = 'force-dynamic';

// Stripe requires raw body for signature verification
export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET not configured');
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
  }

  const rawBody = await req.text();
  const sig = req.headers.get('stripe-signature');
  if (!sig) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (e: any) {
    console.error('Webhook signature verification failed:', e.message);
    return NextResponse.json({ error: `Webhook Error: ${e.message}` }, { status: 400 });
  }

  // Idempotency check — skip if already processed
  const existing = await db.select().from(billingEvents)
    .where(eq(billingEvents.stripeEventId, event.id));
  if (existing.length > 0 && existing[0].processed) {
    return NextResponse.json({ received: true, skipped: 'already processed' });
  }

  // Log the event
  try {
    await db.insert(billingEvents).values({
      stripeEventId: event.id,
      eventType: event.type,
      payload: event.data.object as any,
    }).onConflictDoNothing();
  } catch (_) {
    // Event already exists — continue processing
  }

  try {
    switch (event.type) {

      // ── INVOICE PAID ────────────────────────────────────────────────────────
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        const landlordId = invoice.metadata?.landlordId || await getLandlordIdFromCustomer(invoice.customer as string);
        if (!landlordId) break;

        // Upsert invoice record
        await db.insert(billingInvoices).values({
          landlordId,
          stripeInvoiceId: invoice.id,
          invoiceNumber: invoice.number || null,
          status: 'paid',
          amountDueCents: invoice.amount_due,
          amountPaidCents: invoice.amount_paid,
          subtotalCents: invoice.subtotal,
          vatAmountCents: (invoice as any).tax || 0,
          pdfUrl: invoice.invoice_pdf || null,
          hostedInvoiceUrl: invoice.hosted_invoice_url || null,
          periodStart: invoice.period_start ? new Date(invoice.period_start * 1000) : null,
          periodEnd: invoice.period_end ? new Date(invoice.period_end * 1000) : null,
          paidAt: new Date(),
        }).onConflictDoNothing();

        // Inngest: send landlord confirmation email
        await inngest.send({
          name: 'billing/invoice.paid',
          data: {
            landlordId,
            invoiceId: invoice.id,
            invoiceNumber: invoice.number,
            amountPaidCents: invoice.amount_paid,
            pdfUrl: invoice.invoice_pdf,
            periodStart: invoice.period_start,
            periodEnd: invoice.period_end,
          },
        });
        break;
      }

      // ── INVOICE PAYMENT FAILED ──────────────────────────────────────────────
      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        const landlordId = invoice.metadata?.landlordId || await getLandlordIdFromCustomer(invoice.customer as string);
        if (!landlordId) break;

        // Upsert invoice record as failed
        await db.insert(billingInvoices).values({
          landlordId,
          stripeInvoiceId: invoice.id,
          invoiceNumber: invoice.number || null,
          status: 'open',
          amountDueCents: invoice.amount_due,
          amountPaidCents: 0,
          subtotalCents: invoice.subtotal,
          vatAmountCents: (invoice as any).tax || 0,
          pdfUrl: invoice.invoice_pdf || null,
          hostedInvoiceUrl: invoice.hosted_invoice_url || null,
          periodStart: invoice.period_start ? new Date(invoice.period_start * 1000) : null,
          periodEnd: invoice.period_end ? new Date(invoice.period_end * 1000) : null,
        }).onConflictDoNothing();

        // Update subscription status to past_due
        await db.update(billingSubscriptions)
          .set({ status: 'past_due', updatedAt: new Date() })
          .where(eq(billingSubscriptions.landlordId, landlordId));

        // Inngest: trigger dunning sequence (Erinnerung → Mahnung 1 → Mahnung 2)
        await inngest.send({
          name: 'billing/invoice.payment_failed',
          data: {
            landlordId,
            invoiceId: invoice.id,
            invoiceNumber: invoice.number,
            amountDueCents: invoice.amount_due,
            attemptCount: invoice.attempt_count,
            nextPaymentAttempt: invoice.next_payment_attempt,
          },
        });
        break;
      }

      // ── SUBSCRIPTION UPDATED ────────────────────────────────────────────────
      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription;
        const landlordId = sub.metadata?.landlordId || await getLandlordIdFromCustomer(sub.customer as string);
        if (!landlordId) break;

        const unitCount = sub.items.data[0]?.quantity || 1;

        await db.update(billingSubscriptions)
          .set({
            status: sub.status,
            unitCount,
            // New Stripe API: period derived from billing_cycle_anchor + start_date
            currentPeriodStart: sub.start_date ? new Date(sub.start_date * 1000) : null,
            currentPeriodEnd: sub.cancel_at ? new Date(sub.cancel_at * 1000) : null,
            cancelAtPeriodEnd: sub.cancel_at_period_end,
            updatedAt: new Date(),
          })
          .where(eq(billingSubscriptions.landlordId, landlordId));
        break;
      }

      // ── SUBSCRIPTION DELETED ────────────────────────────────────────────────
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription;
        const landlordId = sub.metadata?.landlordId || await getLandlordIdFromCustomer(sub.customer as string);
        if (!landlordId) break;

        await db.update(billingSubscriptions)
          .set({ status: 'canceled', updatedAt: new Date() })
          .where(eq(billingSubscriptions.landlordId, landlordId));
        break;
      }

      default:
        // Unhandled event — log and return OK
        break;
    }

    // Mark as processed
    await db.update(billingEvents)
      .set({ processed: true, processedAt: new Date() })
      .where(eq(billingEvents.stripeEventId, event.id));

    return NextResponse.json({ received: true });
  } catch (e: any) {
    console.error('Webhook processing error:', e);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

// Helper — look up landlordId from Stripe customer ID
async function getLandlordIdFromCustomer(customerId: string): Promise<string | null> {
  if (!customerId) return null;
  const [sub] = await db.select({ landlordId: billingSubscriptions.landlordId })
    .from(billingSubscriptions)
    .where(eq(billingSubscriptions.stripeCustomerId, customerId));
  return sub?.landlordId || null;
}
