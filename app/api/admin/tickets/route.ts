import { NextRequest, NextResponse } from "next/server";
import { db, hasDatabase } from "@/lib/db";
import { tickets, tenants, properties } from "@/lib/db/schema";
import { desc, eq, and, ne, like, or, sql } from "drizzle-orm";
import { cookies } from "next/headers";

const PAGE_SIZE = 20;

// Auth: check ADMIN_SECRET cookie
function isAuthorized(req: NextRequest): boolean {
  const cookieStore = req.cookies;
  const secret = cookieStore.get("ADMIN_SECRET")?.value;
  // If ADMIN_SECRET env is not set, deny all
  const expectedSecret = process.env.ADMIN_SECRET;
  if (!expectedSecret) return false;
  return secret === expectedSecret;
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!hasDatabase) {
    return NextResponse.json({
      tickets: [],
      total: 0,
      page: 1,
      pageSize: PAGE_SIZE,
      totalPages: 0,
      note: "No database configured",
    });
  }

  const { searchParams } = new URL(req.url);
  const page   = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const status = searchParams.get("status") ?? "";
  const search = searchParams.get("search") ?? "";

  try {
    const offset = (page - 1) * PAGE_SIZE;

    const rows = await db
      .select({
        id: tickets.id,
        title: tickets.title,
        category: tickets.category,
        status: tickets.status,
        priority: tickets.priority,
        createdAt: tickets.createdAt,
        updatedAt: tickets.updatedAt,
        tenantFirstName: tenants.firstName,
        tenantLastName: tenants.lastName,
        tenantEmail: tenants.email,
        propertyAddress: properties.address,
        propertyCity: properties.city,
      })
      .from(tickets)
      .leftJoin(tenants, eq(tickets.tenantId, tenants.id))
      .leftJoin(properties, eq(tickets.propertyId, properties.id))
      .orderBy(desc(tickets.createdAt))
      .limit(PAGE_SIZE)
      .offset(offset);

    // Count total (simplified — status filter applied client-side for now)
    const countResult = await db.select({ count: sql<number>`count(*)` }).from(tickets);
    const total = Number(countResult[0]?.count ?? 0);

    // Apply filters in JS (avoids complex drizzle conditional where chains)
    let filtered = rows;
    if (status) {
      filtered = filtered.filter((t) => t.status === status);
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          (t.tenantFirstName ?? "").toLowerCase().includes(q) ||
          (t.tenantLastName ?? "").toLowerCase().includes(q) ||
          (t.propertyAddress ?? "").toLowerCase().includes(q)
      );
    }

    const mapped = filtered.map((t) => ({
      id: t.id,
      title: t.title,
      category: t.category,
      status: t.status,
      priority: t.priority,
      createdAt: t.createdAt,
      updatedAt: t.updatedAt,
      tenant: t.tenantFirstName
        ? {
            name: `${t.tenantFirstName} ${t.tenantLastName ?? ""}`.trim(),
            email: t.tenantEmail,
          }
        : null,
      property: t.propertyAddress
        ? { address: t.propertyAddress, city: t.propertyCity }
        : null,
    }));

    return NextResponse.json({
      tickets: mapped,
      total,
      page,
      pageSize: PAGE_SIZE,
      totalPages: Math.ceil(total / PAGE_SIZE),
    });
  } catch (err) {
    console.error("GET /api/admin/tickets error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
