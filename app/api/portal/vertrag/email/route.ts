/**
 * POST /api/portal/vertrag/email
 *
 * Sendet den Hausverwaltungsvertrag als E-Mail-Anhang an den Vermieter.
 *
 * Body: { toEmail, toName, feePerUnit, startDate, ownerName, ownerAddress?, propertyAddress, units, verwaltungstyp? }
 *
 * Auth: JWT-Cookie „portal_session" oder „ev-demo-session" (via middleware)
 * — landlordId wird als x-landlord-id Header injiziert.
 */

import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { Resend } from 'resend';
import { generateVertragHtml } from '@/lib/pdf/vertrag-generator';

function getResend() {
  return new Resend(process.env.RESEND_API_KEY ?? 'placeholder');
}

// ─── Handler ─────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    // ── 1. Auth ─────────────────────────────────────────────────────────────
    const hdrs = await headers();
    const landlordId = hdrs.get('x-landlord-id');

    if (!landlordId) {
      return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
    }

    // ── 2. Parse body ───────────────────────────────────────────────────────
    let body: {
      toEmail?: string;
      toName?: string;
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
      toEmail,
      toName,
      feePerUnit,
      startDate,
      ownerName,
      ownerAddress,
      propertyAddress,
      units,
      verwaltungstyp = 'Miet',
    } = body;

    // ── 3. Validate ─────────────────────────────────────────────────────────
    if (!toEmail || !feePerUnit || !startDate || !ownerName || !propertyAddress || !units) {
      return NextResponse.json(
        {
          error:
            'toEmail, feePerUnit, startDate, ownerName, propertyAddress und units sind erforderlich.',
        },
        { status: 400 },
      );
    }

    // ── 4. Generate HTML ────────────────────────────────────────────────────
    const htmlDoc = generateVertragHtml({
      ownerName,
      ownerAddress,
      propertyAddress,
      units,
      verwaltungstyp: verwaltungstyp as 'WEG' | 'Miet' | 'Gewerbe',
      feePerUnit,
      startDate: new Date(startDate),
      generatedAt: new Date(),
    });

    const monthlyFee = (feePerUnit * units).toLocaleString('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
    });

    // ── 5. Send email with HTML attachment ──────────────────────────────────
    const resend = getResend();
    const { error } = await resend.emails.send({
      from: 'einfach verwaltet <noreply@immo.einfach-verwaltet.de>',
      to: toEmail,
      subject: `Ihr Hausverwaltungsvertrag — ${propertyAddress}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1a1a2e;">
          <div style="margin-bottom: 24px;">
            <span style="font-size: 20px; font-weight: 700;">einfach <span style="color: #0d9488;">verwaltet.</span></span>
          </div>
          <h2 style="color: #1a1a2e; font-size: 18px; margin-bottom: 12px;">
            Ihr Hausverwaltungsvertrag ist bereit
          </h2>
          <p style="color: #374151; line-height: 1.6; margin-bottom: 12px;">
            Sehr geehrte${toName ? ` ${toName}` : ''},
          </p>
          <p style="color: #374151; line-height: 1.6; margin-bottom: 12px;">
            im Anhang finden Sie Ihren Hausverwaltungsvertrag für
            <strong>${propertyAddress}</strong>.
          </p>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 16px 0;">
            <div style="font-size: 13px; color: #6b7280; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">Vertragsübersicht</div>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 4px 0; color: #6b7280;">Objekt:</td>
                <td style="padding: 4px 0; font-weight: 600; color: #1a1a2e;">${propertyAddress}</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; color: #6b7280;">Einheiten:</td>
                <td style="padding: 4px 0; font-weight: 600; color: #1a1a2e;">${units}</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; color: #6b7280;">Monatliche Vergütung:</td>
                <td style="padding: 4px 0; font-weight: 600; color: #1a1a2e;">${monthlyFee} zzgl. MwSt.</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; color: #6b7280;">Vertragsbeginn:</td>
                <td style="padding: 4px 0; font-weight: 600; color: #1a1a2e;">${new Date(startDate).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
              </tr>
            </table>
          </div>
          <p style="color: #374151; line-height: 1.6; margin-bottom: 12px;">
            Bitte drucken Sie den Vertrag aus, unterzeichnen Sie beide Exemplare und senden Sie
            ein unterschriebenes Exemplar an uns zurück:
          </p>
          <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 14px; margin-bottom: 20px; font-size: 14px; color: #1a1a2e;">
            RVLT Ventures GmbH — einfach verwaltet.<br/>
            Singapurstr. 19<br/>
            20457 Hamburg
          </div>
          <p style="color: #6b7280; font-size: 13px; line-height: 1.5;">
            Bei Fragen stehen wir Ihnen jederzeit unter
            <a href="mailto:hallo@einfach-verwaltet.de" style="color: #0d9488;">hallo@einfach-verwaltet.de</a>
            zur Verfügung.
          </p>
          <p style="color: #374151; margin-top: 20px;">
            Mit freundlichen Grüßen,<br/>
            <strong>Lukas Schmitz</strong><br/>
            einfach verwaltet. — RVLT Ventures GmbH
          </p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
          <p style="color: #9ca3af; font-size: 11px; line-height: 1.5;">
            RVLT Ventures GmbH · Singapurstr. 19 · 20457 Hamburg · HRB 193395 AG Hamburg ·
            GF: Lukas Schmitz
          </p>
        </div>
      `,
      attachments: [
        {
          filename: 'Hausverwaltungsvertrag.html',
          content: Buffer.from(htmlDoc, 'utf-8').toString('base64'),
        },
      ],
    });

    if (error) {
      console.error('[Vertrag Email] Resend error:', error);
      return NextResponse.json(
        { error: 'E-Mail konnte nicht gesendet werden.' },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, message: `Vertrag wurde an ${toEmail} gesendet.` });
  } catch (err) {
    console.error('[Vertrag Email] Fehler:', err);
    return NextResponse.json(
      { error: 'Interner Serverfehler. Bitte versuchen Sie es erneut.' },
      { status: 500 },
    );
  }
}
