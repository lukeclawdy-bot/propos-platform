/**
 * Tenant PIN Store — in-memory for MVP.
 * Replace with Redis/DB-backed store for multi-instance production.
 */

interface TenantPinEntry {
  pin: string;
  tenantId: string;
  expiresAt: number; // Unix ms
}

// Module-level map — persists across requests in the same process
const tenantPinStore = new Map<string, TenantPinEntry>();

export function storeTenantPin(
  email: string,
  pin: string,
  tenantId: string,
  ttlMs = 10 * 60 * 1000
): void {
  tenantPinStore.set(email.toLowerCase(), {
    pin: pin.toUpperCase(),
    tenantId,
    expiresAt: Date.now() + ttlMs,
  });
}

export function verifyAndConsumeTenantPin(
  email: string,
  pin: string
): string | null {
  const entry = tenantPinStore.get(email.toLowerCase());
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    tenantPinStore.delete(email.toLowerCase());
    return null;
  }
  if (entry.pin !== pin.toUpperCase()) return null;
  tenantPinStore.delete(email.toLowerCase()); // one-time use
  return entry.tenantId;
}
