import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Public portal routes — no auth required
const PUBLIC_PORTAL_PATHS = [
  "/portal/login",
  "/portal/onboarding",
  "/api/portal/auth/magic-link",
  "/api/portal/auth/verify",
  "/api/portal/auth/logout",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only intercept /portal/* and /api/portal/* routes
  if (!pathname.startsWith("/portal") && !pathname.startsWith("/api/portal")) {
    return NextResponse.next();
  }

  // Allow public paths (and sub-paths)
  const isPublic = PUBLIC_PORTAL_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );
  if (isPublic) return NextResponse.next();

  // Skip auth if JWT_SECRET not configured (dev/demo mode)
  if (!process.env.JWT_SECRET) {
    return NextResponse.next();
  }

  // Read session cookie
  const token = request.cookies.get("portal_session")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/portal/login", request.url));
  }

  try {
    // Dynamic import to avoid build-time crash
    const { verifyToken } = await import("@/lib/auth/jwt");
    const payload = await verifyToken(token);
    if (!payload?.landlordId) {
      const res = NextResponse.redirect(new URL("/portal/login", request.url));
      res.cookies.set("portal_session", "", { maxAge: 0, path: "/" });
      return res;
    }

    // Inject landlordId as a request header so server components can read it
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-landlord-id", payload.landlordId);
    requestHeaders.set("x-landlord-email", payload.email ?? "");
    return NextResponse.next({ request: { headers: requestHeaders } });
  } catch {
    // Token invalid or JWT_SECRET missing — redirect to login
    const res = NextResponse.redirect(new URL("/portal/login", request.url));
    res.cookies.set("portal_session", "", { maxAge: 0, path: "/" });
    return res;
  }
}

export const config = {
  matcher: ["/portal/:path*", "/api/portal/:path*"],
};
