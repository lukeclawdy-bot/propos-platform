import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const base =
    process.env.NEXT_PUBLIC_APP_URL ||
    `${req.nextUrl.protocol}//${req.nextUrl.host}`;
  
  const res = NextResponse.redirect(new URL("/tenant/login", base));
  res.cookies.set("tenant_session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
  
  return res;
}
