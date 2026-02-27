"use client";

// Analytics.tsx — GA4 Event Tracking Utility
// Wraps window.gtag for safe use in SSR/Next.js 15

declare global {
  interface Window {
    gtag: (
      command: "event" | "config" | "js",
      action: string,
      params?: Record<string, string | number | boolean | undefined>
    ) => void;
    dataLayer: unknown[];
  }
}

/**
 * Fire a GA4 custom event.
 * Safe to call server-side — no-ops if window or gtag is unavailable.
 */
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (
    typeof window !== "undefined" &&
    window.gtag &&
    process.env.NEXT_PUBLIC_GA_ID
  ) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

/**
 * Convenience: track a CTA click
 */
export function trackCTAClick(label: string) {
  trackEvent("cta_click", "engagement", label);
}

/**
 * Convenience: track /referenzen page engagement
 */
export function trackReferenzenEngagement(action: string) {
  trackEvent(action, "social_proof", "referenzen_page");
}
