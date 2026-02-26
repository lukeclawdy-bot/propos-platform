// POST /api/portal/billing/create-subscription
// Creates a Stripe Customer + Subscription when landlord confirms Hausverwaltungsvertrag.
// Requires: portal_session JWT (landlordId)

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth/jwt';
import { db } from '@/lib/db';
import { landlords, billingSubscriptions } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { getStripe, getTierForUnits, getPriceIdForTier, calcMonthlyGross, PRICING_TIERS } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    // Auth check
    const cookieStore = await cookies();
    const token = cookieStore.get('portal_session')?.value;
    if (!token) return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 });

    const payload = await verifyToken(token);
    if (!payload?.landlordId) return NextResponse.json({ error: 'Ungültige Session' }, { status: 401 });

    const landlordId = payload.landlordId as string;

    // Get landlord details
    const [landlord] = await db.select().from(landlords).where(eq(landlords.id, landlordId));
    if (!landlord) return NextResponse.json({ error: 'Vermieter nicht gefunden' }, { status: 404 });

    const body = await req.json();
    const { unitCount, paymentMethodId } = body;

    if (!unitCount || unitCount < 1) {
      return NextResponse.json({ error: 'Ungültige Einheitenanzahl' }, { status: 400 });
    }
    if (unitCount > 200) {
      return NextResponse.json({ error: 'Für mehr als 200 Einheiten bitte direkt kontaktieren' }, { status: 400 });
    }

    // Check for existing subscription
    const [existing] = await db.select().from(billingSubscriptions)
      .where(eq(billingSubscriptions.landlordId, landlordId));
    if (existing?.stripeSubscriptionId) {
      return NextResponse.json({ error: 'Abonnement bereits vorhanden' }, { status: 409 });
    }

    const stripe = getStripe();
    const tier = getTierForUnits(unitCount);
    const tierInfo = PRICING_TIERS[tier];
    const priceId = getPriceIdForTier(tier);
    const monthlyGross = calcMonthlyGross(unitCount, tier);

    // 1. Create Stripe Customer
    const customer = await stripe.customers.create({
      email: landlord.email,
      name: landlord.companyName || landlord.name || landlord.email,
      phone: landlord.phone || undefined,
      address: {
        country: 'DE',
      },
      metadata: {
        landlordId,
        tier,
        unitCount: String(unitCount),
      },
      preferred_locales: ['de'],
    });

    // 2. Attach payment method if provided (SEPA Direct Debit)
    if (paymentMethodId) {
      await stripe.paymentMethods.attach(paymentMethodId, { customer: customer.id });
      await stripe.customers.update(customer.id, {
        invoice_settings: { default_payment_method: paymentMethodId },
      });
    }

    // 3. Create Subscription with quantity = unitCount
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId, quantity: unitCount }],
      payment_behavior: 'default_incomplete',
      payment_settings: {
        payment_method_types: ['sepa_debit', 'card'],
        save_default_payment_method: 'on_subscription',
      },
      expand: ['latest_invoice.payment_intent'],
      metadata: {
        landlordId,
        tier,
        unitCount: String(unitCount),
      },
      // Stripe Tax — automatically applies 19% MwSt. with tax enabled on products
      automatic_tax: { enabled: true },
      // German invoice settings
      collection_method: 'charge_automatically',
    });

    // 4. Save to DB
    if (existing) {
      // Update existing record
      await db.update(billingSubscriptions)
        .set({
          stripeCustomerId: customer.id,
          stripeSubscriptionId: subscription.id,
          stripePriceId: priceId,
          tier,
          unitCount,
          monthlyAmountCents: monthlyGross,
          status: subscription.status,
          updatedAt: new Date(),
        })
        .where(eq(billingSubscriptions.landlordId, landlordId));
    } else {
      await db.insert(billingSubscriptions).values({
        landlordId,
        stripeCustomerId: customer.id,
        stripeSubscriptionId: subscription.id,
        stripePriceId: priceId,
        tier,
        unitCount,
        monthlyAmountCents: monthlyGross,
        status: subscription.status,
        sepaMandate: !!paymentMethodId,
      });
    }

    // Extract client secret for Payment Element (SEPA mandate collection)
    const latestInvoice = subscription.latest_invoice as any;
    const clientSecret = latestInvoice?.payment_intent?.client_secret || null;

    return NextResponse.json({
      success: true,
      subscriptionId: subscription.id,
      customerId: customer.id,
      clientSecret,
      tier,
      tierName: tierInfo.name,
      unitCount,
      monthlyGrossCents: monthlyGross,
      status: subscription.status,
    });
  } catch (e: any) {
    console.error('Billing create-subscription error:', e);
    return NextResponse.json(
      { error: e.message || 'Fehler beim Erstellen des Abonnements' },
      { status: 500 }
    );
  }
}
