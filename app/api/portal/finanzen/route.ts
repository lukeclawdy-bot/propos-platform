import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { financialTransactions, properties, units } from '@/lib/db/schema';
import { eq, inArray, gte, and } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  try {
    const landlordId = req.nextUrl.searchParams.get('landlordId');
    if (!landlordId) return NextResponse.json({ error: 'landlordId required' }, { status: 400 });

    // Get last 6 months of transactions
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const transactions = await db.select().from(financialTransactions)
      .where(
        and(
          eq(financialTransactions.landlordId, landlordId),
          gte(financialTransactions.createdAt, sixMonthsAgo)
        )
      )
      .orderBy(financialTransactions.createdAt);

    // Enrich with property addresses
    const propertyIds = [...new Set(transactions.map(t => t.propertyId).filter(Boolean))];
    const props = propertyIds.length > 0 
      ? await db.select({ id: properties.id, address: properties.address }).from(properties).where(inArray(properties.id, propertyIds))
      : [];

    const enrichedTransactions = transactions.map(t => {
      const prop = props.find(p => p.id === t.propertyId);
      return {
        ...t,
        propertyAddress: prop?.address || null,
      };
    });

    // Calculate monthly summary (last 6 months)
    const monthlySummary: Record<string, { income: number; expenses: number }> = {};
    const monthNames = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];

    // Initialize last 6 months
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const key = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
      monthlySummary[key] = { income: 0, expenses: 0 };
    }

    transactions.forEach(t => {
      const d = new Date(t.createdAt);
      const key = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
      if (monthlySummary[key]) {
        if (t.type === 'rent_received' || t.type === 'refund') {
          monthlySummary[key].income += t.amountCents;
        } else if (t.type === 'expense' || t.type === 'mahnung') {
          monthlySummary[key].expenses += t.amountCents;
        }
      }
    });

    const monthlySummaryArray = Object.entries(monthlySummary).map(([month, data]) => ({
      month,
      income: data.income,
      expenses: data.expenses,
    }));

    // Calculate stats
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const thisMonthTransactions = transactions.filter(t => {
      const d = new Date(t.createdAt);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    });

    const totalIncome = thisMonthTransactions
      .filter(t => t.type === 'rent_received')
      .reduce((sum, t) => sum + t.amountCents, 0);

    const pending = thisMonthTransactions
      .filter(t => t.type === 'rent_received' && t.status === 'pending')
      .reduce((sum, t) => sum + t.amountCents, 0);

    const expenses = thisMonthTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amountCents, 0);

    return NextResponse.json({
      data: {
        transactions: enrichedTransactions,
        monthlySummary: monthlySummaryArray,
        stats: {
          totalIncome,
          pending,
          expenses,
        }
      }
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { landlordId, propertyId, unitId, tenantId, type, amountCents, description, dueDate, bkvCategory } = body;
    
    if (!landlordId || !type || !amountCents) {
      return NextResponse.json({ error: 'landlordId, type, and amountCents required' }, { status: 400 });
    }

    const [transaction] = await db.insert(financialTransactions).values({
      landlordId,
      propertyId: propertyId || null,
      unitId: unitId || null,
      tenantId: tenantId || null,
      type,
      amountCents,
      description: description || null,
      dueDate: dueDate ? new Date(dueDate) : null,
      bkvCategory: bkvCategory || null,
    }).returning();

    return NextResponse.json({ data: transaction }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
