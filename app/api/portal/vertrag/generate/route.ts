/**
 * POST /api/portal/vertrag/generate
 *
 * Generiert einen Hausverwaltungsvertrag als druckfertiges HTML-Dokument (PDF-ready).
 *
 * Body: { propertyId?, feePerUnit, startDate, ownerName, propertyAddress, units, verwaltungstyp? }
 *
 * Auth: JWT-Cookie „portal_session" oder „ev-demo-session" (via middleware)
 * — landlordId wird als x-landlord-id Header injiziert.
 */

import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { generateVertragBuffer } from '@/lib/pdf/vertrag-generator';

// ─── Handler ─────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    // ── 1. Auth: landlordId from middleware header ──────────────────────────
    const hdrs = await headers();
    const landlordId = hdrs.get('x-landlord-id');

    if (!landlordId) {
      return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
    }

    // ── 2. Parse body ───────────────────────────────────────────────────────
    let body: {
      propertyId?: string;
      feePerUnit?: number;
      startDate?: string;
      ownerName?: string;
      ownerAddress?: string;
      propertyAddress?: string;
      units?: number;
      verwaltungstyp?: 'WEG' | 'Miet' | 'Gewerbe';
    };

    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 400 });
    }

    const {
      feePerUnit,
      startDate,
      ownerName,
      ownerAddress,
      propertyAddress,
      units,
      verwaltungstyp = 'Miet',
    } = body;

    // ── 3. Validate required fields ─────────────────────────────────────────
    if (!feePerUnit || !startDate || !ownerName || !propertyAddress || !units) {
      return NextResponse.json(
        {
          error:
            'feePerUnit, startDate, ownerName, propertyAddress und units sind erforderlich.',
        },
        { status: 400 },
      );
    }

    if (feePerUnit < 10 || feePerUnit > 100) {
      return NextResponse.json(
        { error: 'feePerUnit muss zwischen 10 und 100 EUR liegen.' },
        { status: 400 },
      );
    }

    if (units < 1 || units > 10000) {
      return NextResponse.json(
        { error: 'units muss zwischen 1 und 10.000 liegen.' },
        { status: 400 },
      );
    }

    // ── 4. Generate PDF ─────────────────────────────────────────────────────
    const buffer = generateVertragBuffer({
      ownerName,
      ownerAddress,
      propertyAddress,
      units,
      verwaltungstyp: verwaltungstyp as 'WEG' | 'Miet' | 'Gewerbe',
      feePerUnit,
      startDate: new Date(startDate),
      generatedAt: new Date(),
    });

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Disposition': `attachment; filename="Hausverwaltungsvertrag.html"`,
        'X-Vertrag-Owner': ownerName,
        'X-Vertrag-Property': propertyAddress,
        'X-Vertrag-Units': String(units),
        'X-Vertrag-FeePerUnit': String(feePerUnit),
      },
    });
  } catch (err) {
    console.error('[Vertrag] Fehler beim Generieren:', err);
    return NextResponse.json(
      { error: 'Interner Serverfehler. Bitte versuchen Sie es erneut.' },
      { status: 500 },
    );
  }
}
