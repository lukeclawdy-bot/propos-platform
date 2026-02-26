// lib/stripe.ts — Lazy Stripe initialization
// Does NOT crash build if STRIPE_SECRET_KEY is missing (only throws at runtime)

import Stripe from 'stripe';

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error(
      'STRIPE_SECRET_KEY is not configured. Add it to your Vercel environment variables.'
    );
  }
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2026-02-25.clover',
      typescript: true,
    });
  }
  return _stripe;
}

// Pricing tiers — German Mietverwaltung Staffelung
export const PRICING_TIERS = {
  basic: {
    name: 'Mietverwaltung Basis',
    description: 'Bis 10 Einheiten',
    pricePerUnitCents: 3400, // €34/unit/month (Netto)
    minUnits: 1,
    maxUnits: 10,
    priceEnvVar: 'STRIPE_PRICE_BASIC',
  },
  standard: {
    name: 'Mietverwaltung Standard',
    description: '11–50 Einheiten',
    pricePerUnitCents: 2900, // €29/unit/month (Netto)
    minUnits: 11,
    maxUnits: 50,
    priceEnvVar: 'STRIPE_PRICE_STANDARD',
  },
  professional: {
    name: 'Mietverwaltung Professional',
    description: '51–200 Einheiten',
    pricePerUnitCents: 2400, // €24/unit/month (Netto)
    minUnits: 51,
    maxUnits: 200,
    priceEnvVar: 'STRIPE_PRICE_PROFESSIONAL',
  },
} as const;

export type PricingTier = keyof typeof PRICING_TIERS;

// Determine tier from unit count
export function getTierForUnits(unitCount: number): PricingTier {
  if (unitCount <= 10) return 'basic';
  if (unitCount <= 50) return 'standard';
  return 'professional';
}

// Get Stripe Price ID for a tier from env vars
export function getPriceIdForTier(tier: PricingTier): string {
  const envVar = PRICING_TIERS[tier].priceEnvVar;
  const priceId = process.env[envVar];
  if (!priceId) {
    throw new Error(
      `${envVar} is not configured. Set the Stripe Price ID in your environment variables.`
    );
  }
  return priceId;
}

// Calculate monthly gross amount (incl. 19% MwSt.)
export function calcMonthlyGross(unitCount: number, tier: PricingTier): number {
  const netCents = PRICING_TIERS[tier].pricePerUnitCents * unitCount;
  return Math.round(netCents * 1.19); // 19% MwSt.
}
