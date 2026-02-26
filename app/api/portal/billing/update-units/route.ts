// POST /api/portal/billing/update-units
// Updates Stripe subscription quantity when units are added/removed.
// Handles tier transitions (proration applies automatically).

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth/jwt';
import { db } from '@/lib/db';
import { billingSubscriptions } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { getStripe, getTierForUnits, getPriceIdForTier, calcMonthlyGross } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    // Auth check
    const cookieStore = await cookies();
    const token = cookieStore.get('portal_session')?.value;
    if (!token) return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 });

    const payload = await verifyToken(token);
    if (!payload?.landlordId) return NextResponse.json({ error: 'Ungültige Session' }, { status: 401 });

    const landlordId = payload.landlordId as string;

    const body = await req.json();
    const { unitCount } = body;

    if (!unitCount || unitCount < 1 || unitCount > 200) {
      return NextResponse.json({ error: 'Einheitenanzahl muss zwischen 1 und 200 liegen' }, { status: 400 });
    }

    // Get existing subscription
    const [sub] = await db.select().from(billingSubscriptions)
      .where(eq(billingSubscriptions.landlordId, landlordId));

    if (!sub?.stripeSubscriptionId) {
      return NextResponse.json({ error: 'Kein aktives Abonnement gefunden' }, { status: 404 });
    }

    const stripe = getStripe();

    // Determine new tier
    const newTier = getTierForUnits(unitCount);
    const newPriceId = getPriceIdForTier(newTier);
    const newMonthlyGross = calcMonthlyGross(unitCount, newTier);

    // Fetch current subscription to get subscription item ID
    const stripeSubscription = await stripe.subscriptions.retrieve(sub.stripeSubscriptionId);
    const subscriptionItemId = stripeSubscription.items.data[0]?.id;

    if (!subscriptionItemId) {
      return NextResponse.json({ error: 'Abonnement-Item nicht gefunden' }, { status: 404 });
    }

    // Update subscription — Stripe handles proration automatically
    const tierChanged = newPriceId !== sub.stripePriceId;

    if (tierChanged) {
      // Tier change — update price + quantity
      await stripe.subscriptions.update(sub.stripeSubscriptionId, {
        items: [{
          id: subscriptionItemId,
          price: newPriceId,
          quantity: unitCount,
        }],
        proration_behavior: 'create_prorations',
        automatic_tax: { enabled: true },
        metadata: {
          landlordId,
          tier: newTier,
          unitCount: String(unitCount),
        },
      });
    } else {
      // Same tier — only update quantity
      await stripe.subscriptionItems.update(subscriptionItemId, {
        quantity: unitCount,
        proration_behavior: 'create_prorations',
      });
    }

    // Update DB
    await db.update(billingSubscriptions)
      .set({
        tier: newTier,
        unitCount,
        monthlyAmountCents: newMonthlyGross,
        stripePriceId: newPriceId,
        updatedAt: new Date(),
      })
      .where(eq(billingSubscriptions.landlordId, landlordId));

    return NextResponse.json({
      success: true,
      unitCount,
      tier: newTier,
      monthlyGrossCents: newMonthlyGross,
      tierChanged,
    });
  } catch (e: any) {
    console.error('Billing update-units error:', e);
    return NextResponse.json(
      { error: e.message || 'Fehler beim Aktualisieren der Einheiten' },
      { status: 500 }
    );
  }
}
