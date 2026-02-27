export const dynamic = "force-dynamic";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// POST /api/admin/auth - login
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    const adminSecret = process.env.ADMIN_SECRET;
    
    if (!adminSecret) {
      console.error("ADMIN_SECRET not configured");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    if (password !== adminSecret) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set("admin_secret", password, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}

// GET /api/admin/auth - logout
export async function GET() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_secret");
  
  return NextResponse.redirect(new URL("/admin/login", process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"));
}
