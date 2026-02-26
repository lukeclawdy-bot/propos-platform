// Google Ads Conversion Tracking Utility

declare global {
  interface Window {
    gtag: (
      command: "event" | "config" | "js",
      action: string,
      params?: Record<string, string | number | boolean>
    ) => void;
    dataLayer: unknown[];
  }
}

/**
 * Track a Google Ads conversion event
 * @param conversionId - The conversion ID (e.g., "AW-123456789/abc123xyz")
 */
export function trackConversion(conversionId?: string) {
  const targetId = conversionId || process.env.NEXT_PUBLIC_GADS_CONVERSION_ID;
  
  if (typeof window !== "undefined" && window.gtag && targetId) {
    window.gtag("event", "conversion", {
      send_to: targetId,
    });
    console.log("[GAds] Conversion tracked:", targetId);
  } else {
    // Log for debugging in development
    if (typeof window !== "undefined") {
      console.log("[GAds] Conversion would be tracked:", targetId);
    }
  }
}

/**
 * Track an anfrage quiz completion conversion
 */
export function trackAnfrageConversion() {
  trackConversion();
}

/**
 * Track a kontakt form submission conversion
 */
export function trackKontaktConversion() {
  trackConversion();
}
