// POST /api/portal/billing/portal
// Returns a Stripe Customer Portal link for landlord self-service
// (change payment method, download invoices, cancel subscription).

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth/jwt';
import { db } from '@/lib/db';
import { billingSubscriptions } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { getStripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
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
      return NextResponse.json({ error: 'Kein Stripe-Konto gefunden' }, { status: 404 });
    }

    const stripe = getStripe();

    // Return URL — back to billing page after portal actions
    const returnUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://einfach-verwaltet.de'}/portal/abrechnung`;

    const session = await stripe.billingPortal.sessions.create({
      customer: sub.stripeCustomerId,
      return_url: returnUrl,
      locale: 'de',
    });

    return NextResponse.json({ url: session.url });
  } catch (e: any) {
    console.error('Billing portal error:', e);
    return NextResponse.json(
      { error: e.message || 'Fehler beim Öffnen des Kundenportals' },
      { status: 500 }
    );
  }
}
