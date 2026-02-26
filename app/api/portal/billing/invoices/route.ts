// GET /api/portal/billing/invoices
// Lists landlord's past Stripe invoices (Rechnungen) with PDF download links.

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth/jwt';
import { db } from '@/lib/db';
import { billingSubscriptions } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { getStripe } from '@/lib/stripe';

export async function GET(req: NextRequest) {
  try {
    // Auth check
    const cookieStore = await cookies();
    const token = cookieStore.get('portal_session')?.value;
    if (!token) return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 });

    const payload = await verifyToken(token);
    if (!payload?.landlordId) return NextResponse.json({ error: 'Ungültige Session' }, { status: 401 });

    const landlordId = payload.landlordId as string;

    // Get Stripe customer ID
    const [sub] = await db.select().from(billingSubscriptions)
      .where(eq(billingSubscriptions.landlordId, landlordId));

    if (!sub?.stripeCustomerId) {
      return NextResponse.json({ invoices: [], subscription: null });
    }

    const stripe = getStripe();

    // Fetch invoices from Stripe
    const invoiceList = await stripe.invoices.list({
      customer: sub.stripeCustomerId,
      limit: 24, // last 24 months
    });

    const invoices = invoiceList.data.map((inv) => ({
      id: inv.id,
      number: inv.number, // Rechnungsnummer
      status: inv.status,
      amountDueCents: inv.amount_due,
      amountPaidCents: inv.amount_paid,
      subtotalCents: inv.subtotal,
      taxCents: (inv as any).tax || 0,
      currency: inv.currency,
      pdfUrl: inv.invoice_pdf,
      hostedUrl: inv.hosted_invoice_url,
      periodStart: inv.period_start ? new Date(inv.period_start * 1000).toISOString() : null,
      periodEnd: inv.period_end ? new Date(inv.period_end * 1000).toISOString() : null,
      createdAt: new Date(inv.created * 1000).toISOString(),
      paidAt: inv.status_transitions?.paid_at
        ? new Date(inv.status_transitions.paid_at * 1000).toISOString()
        : null,
      description: inv.description || 'Verwaltungsgebühr',
    }));

    // Also return current subscription info
    let subscriptionInfo = null;
    if (sub.stripeSubscriptionId) {
      const stripeSub = await stripe.subscriptions.retrieve(sub.stripeSubscriptionId);
      subscriptionInfo = {
        tier: sub.tier,
        unitCount: sub.unitCount,
        monthlyAmountCents: sub.monthlyAmountCents,
        status: stripeSub.status,
        currentPeriodEnd: new Date(((stripeSub as any).current_period_end ?? 0) * 1000).toISOString(),
        cancelAtPeriodEnd: (stripeSub as any).cancel_at_period_end ?? false,
      };
    }

    return NextResponse.json({ invoices, subscription: subscriptionInfo });
  } catch (e: any) {
    console.error('Billing invoices error:', e);
    return NextResponse.json(
      { error: e.message || 'Fehler beim Laden der Rechnungen' },
      { status: 500 }
    );
  }
}
