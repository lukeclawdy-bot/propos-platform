import { NextRequest, NextResponse } from "next/server";
import { verifyTenantToken, createTenantToken } from "@/lib/auth/tenant-jwt";
import { verifyAndConsumeTenantPin } from "@/lib/auth/tenant-pin-store";

function loginRedirect(req: NextRequest, error?: string) {
  const base =
    process.env.NEXT_PUBLIC_APP_URL ||
    `${req.nextUrl.protocol}//${req.nextUrl.host}`;
  const url = new URL("/tenant/login", base);
  if (error) url.searchParams.set("error", error);
  return NextResponse.redirect(url);
}

function dashboardRedirect(req: NextRequest) {
  const base =
    process.env.NEXT_PUBLIC_APP_URL ||
    `${req.nextUrl.protocol}//${req.nextUrl.host}`;
  return NextResponse.redirect(new URL("/tenant/dashboard", base));
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const token = searchParams.get("token");
  const pin = searchParams.get("pin");
  const email = searchParams.get("email");

  let tenantId: string | null = null;
  let sessionEmail = "";

  // ── Path 1: JWT magic-link token ──────────────────────────────────────────
  if (token) {
    const payload = await verifyTenantToken(token);
    if (payload?.tenantId) {
      tenantId = payload.tenantId;
      sessionEmail = payload.email ?? "";
    }
  }

  // ── Path 2: PIN + email ───────────────────────────────────────────────────
  if (!tenantId && pin && email) {
    const found = verifyAndConsumeTenantPin(email.toLowerCase(), pin);
    if (found) {
      tenantId = found;
      sessionEmail = email.toLowerCase();
    }
  }

  if (!tenantId) {
    return loginRedirect(req, "invalid");
  }

  // Create a fresh 7-day session cookie
  const sessionToken = await createTenantToken({
    tenantId,
    email: sessionEmail,
  });

  const res = dashboardRedirect(req);
  res.cookies.set("tenant_session", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: "/",
  });

  return res;
}
