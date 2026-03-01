import { eq, and, desc } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { conversations, properties, tenants, tickets, units } from '@/lib/db/schema';
import { inngest } from '@/lib/inngest/client';

// GET /api/tenant/tickets - List tickets for current tenant
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') as 'open' | 'inprogress' | 'resolved' | 'closed' | null;
    
    // Get tenantId from header (injected by middleware) or query param
    const tenantId = request.headers.get('x-tenant-id') || searchParams.get('tenantId');
    
    if (!tenantId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const conditions = [eq(tickets.tenantId, tenantId)];
    if (status) conditions.push(eq(tickets.status, status));

    const rows = await db
      .select({
        id: tickets.id,
        title: tickets.title,
        description: tickets.description,
        status: tickets.status,
        category: tickets.category,
        urgency: tickets.urgency,
        priority: tickets.priority,
        createdAt: tickets.createdAt,
        updatedAt: tickets.updatedAt,
        resolvedAt: tickets.resolvedAt,
        unitId: tickets.unitId,
        propertyId: tickets.propertyId,
        rating: tickets.rating,
      })
      .from(tickets)
      .where(and(...conditions))
      .orderBy(desc(tickets.createdAt));

    // Enrich with property info
    const enriched = await Promise.all(
      rows.map(async (t) => {
        const [unit] = t.unitId
          ? await db.select().from(units).where(eq(units.id, t.unitId))
          : [];
        const [property] = unit?.propertyId
          ? await db.select().from(properties).where(eq(properties.id, unit.propertyId))
          : [];
        return {
          ...t,
          unitDesignation: unit?.designation || null,
          propertyAddress: property?.address || null,
        };
      })
    );

    return NextResponse.json({ data: enriched });
  } catch (e) {
    console.error('[tenant/tickets] Error:', e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

// Urgency levels — used by v2 wizard
export type UrgencyLevel = 'notfall' | 'dringend' | 'normal' | 'kann-warten';

const URGENCY_SLA: Record<UrgencyLevel, { hours: number; label: string; priority: string; numericUrgency: number }> = {
  'notfall':      { hours: 1,    label: 'Sofort (innerhalb 1 Stunde)',  priority: 'urgent', numericUrgency: 1 },
  'dringend':     { hours: 24,   label: 'Innerhalb von 24 Stunden',     priority: 'high',   numericUrgency: 2 },
  'normal':       { hours: 168,  label: 'Innerhalb von 7 Tagen',        priority: 'normal', numericUrgency: 3 },
  'kann-warten':  { hours: 720,  label: 'Innerhalb von 30 Tagen',       priority: 'low',    numericUrgency: 4 },
};

const CATEGORY_TITLES: Record<string, string> = {
  heating:  'Heizung & Warmwasser',
  water:    'Wasser & Abwasser',
  electric: 'Elektro & Licht',
  window:   'Fenster & Türen',
  mold:     'Schimmel & Feuchtigkeit',
  other:    'Sonstiges',
  // legacy v1 categories
  repair:   'Reparatur',
  lock:     'Schloss / Schlüssel',
  noise:    'Lärm',
};

function resolveUrgency(urgency: number | string | undefined): UrgencyLevel {
  if (typeof urgency === 'string') {
    if (['notfall', 'dringend', 'normal', 'kann-warten'].includes(urgency)) {
      return urgency as UrgencyLevel;
    }
  }
  // Legacy numeric urgency (v1 portal)
  const n = Number(urgency);
  if (n === 1) return 'notfall';
  if (n === 2) return 'dringend';
  if (n === 3) return 'normal';
  return 'normal';
}

// POST /api/tenant/tickets - Create new ticket
// Supports both v1 (numeric urgency) and v2 (string urgency, source, photoUrls) formats
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      category,
      urgency,         // number (v1) or 'notfall'|'dringend'|'normal'|'kann-warten' (v2)
      source = 'portal',
      photoUrls = [],  // v2: array of uploaded photo URLs
      answers,         // v2: raw answers object (stored in aiTriage)
    } = body;
    
    // Get tenantId from header (injected by middleware)
    const tenantId = request.headers.get('x-tenant-id');
    
    if (!tenantId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get tenant info
    const [tenant] = await db
      .select()
      .from(tenants)
      .where(eq(tenants.id, tenantId));
    
    if (!tenant) {
      return NextResponse.json({ error: 'Tenant not found' }, { status: 404 });
    }

    // Get unit and property info
    const [unit] = tenant.unitId
      ? await db.select().from(units).where(eq(units.id, tenant.unitId))
      : [];
    
    const [property] = unit?.propertyId
      ? await db.select().from(properties).where(eq(properties.id, unit.propertyId))
      : [];

    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    // Resolve urgency to SLA
    const urgencyLevel = resolveUrgency(urgency);
    const slaConfig = URGENCY_SLA[urgencyLevel];
    const slaDeadline = new Date(Date.now() + slaConfig.hours * 3600_000);

    // Auto-generate title from category if not provided
    const ticketTitle = title?.slice(0, 200) || CATEGORY_TITLES[category] || 'Schadensmeldung';

    // Build AI triage metadata
    const aiTriage = {
      category: category || 'other',
      urgency: urgencyLevel,
      summary: description?.slice(0, 300) || ticketTitle,
      ...(answers ? { answers } : {}),
      ...(photoUrls?.length ? { photoUrls } : {}),
      source,
    };

    // Create ticket
    const [ticket] = await db
      .insert(tickets)
      .values({
        tenantId,
        unitId: tenant.unitId,
        landlordId: property.landlordId,
        propertyId: property.id,
        title: ticketTitle,
        description: description?.slice(0, 2000) || null,
        category: category || 'other',
        urgency: slaConfig.numericUrgency,
        priority: slaConfig.priority,
        status: 'open',
        slaDeadline,
        aiTriage,
      })
      .returning();

    // Create initial conversation message from tenant
    const conversationBody = [
      `Kategorie: ${CATEGORY_TITLES[category] || 'Sonstiges'}`,
      `Dringlichkeit: ${slaConfig.label}`,
      answers ? `\nAngaben:\n${Object.entries(answers).map(([k, v]) => `• ${k}: ${v}`).join('\n')}` : '',
      description ? `\nBeschreibung:\n${description}` : '',
      photoUrls?.length ? `\n${photoUrls.length} Foto(s) hochgeladen.` : '',
    ].filter(Boolean).join('\n');

    await db.insert(conversations).values({
      tenantId,
      landlordId: property.landlordId!,
      ticketId: ticket.id,
      channel: source === 'portal' ? 'portal' : 'email',
      direction: 'inbound',
      body: conversationBody,
      aiClassification: category || 'other',
      aiUrgency: slaConfig.numericUrgency,
    });

    // Fire Inngest event
    await inngest.send({
      name: "tenant/message.received",
      data: {
        source,
        ticketId: ticket.id,
        tenantId,
        unitId: tenant.unitId,
        landlordId: property.landlordId!,
        propertyId: property.id,
        title: ticket.title,
        description: ticket.description,
        category: ticket.category,
        urgency: urgencyLevel,
        priority: slaConfig.priority,
        photoUrls,
      },
    });

    return NextResponse.json({
      ticketId: ticket.id,
      urgency: urgencyLevel,
      urgencyLabel: slaConfig.label,
      responseTime: slaConfig.label,
      data: ticket,
    }, { status: 201 });
  } catch (e) {
    console.error('[tenant/tickets] Error:', e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
