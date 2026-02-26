import { SignJWT, jwtVerify } from "jose";

// Lazily encode secret so the module doesn't crash if JWT_SECRET isn't set at import time
function getSecretKey(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET environment variable is required");
  return new TextEncoder().encode(secret);
}

export interface TenantSession {
  tenantId: string;
  email: string;
  iat?: number;
  exp?: number;
}

export async function createTenantToken(payload: {
  tenantId: string;
  email: string;
}): Promise<string> {
  return new SignJWT(payload as Record<string, unknown>)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecretKey());
}

export async function verifyTenantToken(
  token: string
): Promise<TenantSession | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload as unknown as TenantSession;
  } catch {
    return null;
  }
}

export async function getTenantTokenFromCookie(
  cookieValue: string | undefined
): Promise<TenantSession | null> {
  if (!cookieValue) return null;
  return verifyTenantToken(cookieValue);
}
