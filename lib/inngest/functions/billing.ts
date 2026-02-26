// lib/inngest/functions/billing.ts
// Inngest billing event handlers:
//   - billing/invoice.paid → confirmation email to landlord
//   - billing/invoice.payment_failed → dunning sequence (Erinnerung → Mahnung 1 → Mahnung 2)

import { inngest } from '@/lib/inngest/client';
import { db } from '@/lib/db';
import { landlords } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// Lazy Resend init (same pattern as rest of codebase)
function getResend() {
  const { Resend } = require('resend');
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('RESEND_API_KEY not configured');
  return new Resend(key);
}

// ── INVOICE PAID CONFIRMATION ─────────────────────────────────────────────────
export const billingInvoicePaid = inngest.createFunction(
  { id: 'billing-invoice-paid', name: 'Billing: Invoice Paid Confirmation' },
  { event: 'billing/invoice.paid' },
  async ({ event, step }) => {
    const { landlordId, invoiceNumber, amountPaidCents, pdfUrl, periodStart, periodEnd } = event.data;

    // Get landlord email
    const landlord = await step.run('get-landlord', async () => {
      const [l] = await db.select().from(landlords).where(eq(landlords.id, landlordId));
      return l;
    });

    if (!landlord?.email) return { skipped: 'landlord not found' };

    // Send confirmation email
    await step.run('send-confirmation-email', async () => {
      const resend = getResend();

      const periodLabel = periodStart && periodEnd
        ? `${new Date(periodStart * 1000).toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })}`
        : 'letzten Monat';

      const amountEuro = (amountPaidCents / 100).toLocaleString('de-DE', {
        style: 'currency',
        currency: 'EUR',
      });

      await resend.emails.send({
        from: 'einfach verwaltet. <rechnungen@einfach-verwaltet.de>',
        to: landlord.email,
        subject: `✅ Rechnung ${invoiceNumber || ''} bezahlt — ${amountEuro}`,
        html: `
          <div style="font-family: -apple-system, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px;">
            <h2 style="color: #1a2744; margin-bottom: 8px;">Zahlung eingegangen</h2>
            <p style="color: #6b7280; margin-bottom: 24px;">
              Vielen Dank. Ihre Verwaltungsgebühr für <strong>${periodLabel}</strong> wurde erfolgreich eingezogen.
            </p>

            <div style="background: #f9fafb; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="color: #6b7280; font-size: 14px; padding: 4px 0;">Rechnungsnummer</td>
                  <td style="color: #1a2744; font-weight: 600; font-size: 14px; text-align: right;">${invoiceNumber || '—'}</td>
                </tr>
                <tr>
                  <td style="color: #6b7280; font-size: 14px; padding: 4px 0;">Betrag</td>
                  <td style="color: #1a2744; font-weight: 600; font-size: 14px; text-align: right;">${amountEuro}</td>
                </tr>
                <tr>
                  <td style="color: #6b7280; font-size: 14px; padding: 4px 0;">MwSt.</td>
                  <td style="color: #6b7280; font-size: 14px; text-align: right;">19% MwSt. inkl.</td>
                </tr>
              </table>
            </div>

            ${pdfUrl ? `
            <p style="margin-bottom: 24px;">
              <a href="${pdfUrl}" style="background: #0d9488; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 600;">
                📄 Rechnung als PDF herunterladen
              </a>
            </p>` : ''}

            <p style="color: #6b7280; font-size: 13px;">
              Sie können alle Ihre Rechnungen jederzeit im 
              <a href="https://einfach-verwaltet.de/portal/abrechnung" style="color: #0d9488;">Eigentümerportal</a>
              einsehen und herunterladen.
            </p>

            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
            <p style="color: #9ca3af; font-size: 12px;">
              RVLT Ventures GmbH · Singapurstr. 19 · 20457 Hamburg<br/>
              Amtsgericht Hamburg HRB 193395
            </p>
          </div>
        `,
      });
    });

    return { sent: true, landlordId, invoiceNumber };
  }
);

// ── DUNNING SEQUENCE ──────────────────────────────────────────────────────────
// Erinnerung (Day 3) → Mahnung 1 (Day 10) → Mahnung 2 (Day 21, with Mahngebühr)
export const billingDunningSequence = inngest.createFunction(
  {
    id: 'billing-dunning-sequence',
    name: 'Billing: Dunning Sequence (Erinnerung → Mahnung)',
    // Prevent duplicate dunning sequences for same invoice
    idempotency: 'event.data.invoiceId',
  },
  { event: 'billing/invoice.payment_failed' },
  async ({ event, step }) => {
    const { landlordId, invoiceId, invoiceNumber, amountDueCents, attemptCount } = event.data;

    // Get landlord
    const landlord = await step.run('get-landlord', async () => {
      const [l] = await db.select().from(landlords).where(eq(landlords.id, landlordId));
      return l;
    });

    if (!landlord?.email) return { skipped: 'landlord not found' };

    const amountEuro = (amountDueCents / 100).toLocaleString('de-DE', {
      style: 'currency',
      currency: 'EUR',
    });

    // ── Step 1: Immediate Erinnerung (first failed attempt) ────────────────
    if (attemptCount === 1) {
      await step.run('send-erinnerung', async () => {
        const resend = getResend();
        await resend.emails.send({
          from: 'einfach verwaltet. <rechnungen@einfach-verwaltet.de>',
          to: landlord.email,
          subject: `⚠️ Zahlung nicht erfolgreich — Rechnung ${invoiceNumber || ''}`,
          html: `
            <div style="font-family: -apple-system, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px;">
              <h2 style="color: #1a2744;">Zahlungserinnerung</h2>
              <p style="color: #6b7280;">
                Die Abbuchung für Rechnung <strong>${invoiceNumber || invoiceId}</strong> (${amountEuro}) 
                konnte leider nicht durchgeführt werden.
              </p>
              <p style="color: #6b7280;">
                Stripe wird die Zahlung automatisch erneut versuchen. Bitte stellen Sie sicher, 
                dass Ihr hinterlegtes Konto ausreichend gedeckt ist.
              </p>
              <p style="margin-top: 20px;">
                <a href="https://einfach-verwaltet.de/portal/abrechnung" 
                   style="background: #1a2744; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 600;">
                  Zahlungsmethode aktualisieren
                </a>
              </p>
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
              <p style="color: #9ca3af; font-size: 12px;">
                RVLT Ventures GmbH · Singapurstr. 19 · 20457 Hamburg
              </p>
            </div>
          `,
        });
      });
    }

    // ── Step 2: Mahnung 1 — after 7 days if still unpaid ──────────────────
    await step.sleepUntil('wait-for-mahnung-1', new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));

    // Check if invoice still unpaid (Stripe may have retried successfully)
    const stillUnpaid = await step.run('check-still-unpaid', async () => {
      try {
        const { getStripe } = await import('@/lib/stripe');
        const stripe = getStripe();
        const inv = await stripe.invoices.retrieve(invoiceId);
        return inv.status !== 'paid';
      } catch {
        return true; // assume still unpaid if check fails
      }
    });

    if (!stillUnpaid) return { resolved: 'invoice paid before mahnung' };

    await step.run('send-mahnung-1', async () => {
      const resend = getResend();
      await resend.emails.send({
        from: 'einfach verwaltet. <rechnungen@einfach-verwaltet.de>',
        to: landlord.email,
        subject: `🔴 1. Mahnung — Rechnung ${invoiceNumber || ''} (${amountEuro})`,
        html: `
          <div style="font-family: -apple-system, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px;">
            <h2 style="color: #dc2626;">1. Mahnung</h2>
            <p style="color: #6b7280;">
              Trotz unserer Erinnerung ist der Betrag für Rechnung <strong>${invoiceNumber || invoiceId}</strong> 
              (${amountEuro}) noch nicht eingegangen.
            </p>
            <p style="color: #6b7280;">
              Bitte aktualisieren Sie Ihre Zahlungsmethode oder gleichen Sie den Betrag innerhalb von 
              <strong>7 Tagen</strong> aus, um eine Unterbrechung Ihres Service zu vermeiden.
            </p>
            <p style="margin-top: 20px;">
              <a href="https://einfach-verwaltet.de/portal/abrechnung" 
                 style="background: #dc2626; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 600;">
                Jetzt bezahlen
              </a>
            </p>
            <p style="color: #6b7280; font-size: 13px; margin-top: 16px;">
              Bei Fragen erreichen Sie uns unter kontakt@einfach-verwaltet.de
            </p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
            <p style="color: #9ca3af; font-size: 12px;">
              RVLT Ventures GmbH · Singapurstr. 19 · 20457 Hamburg
            </p>
          </div>
        `,
      });
    });

    // ── Step 3: Mahnung 2 — after another 7 days (total 14 days overdue) ──
    await step.sleepUntil('wait-for-mahnung-2', new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));

    const stillUnpaidFinal = await step.run('check-still-unpaid-final', async () => {
      try {
        const { getStripe } = await import('@/lib/stripe');
        const stripe = getStripe();
        const inv = await stripe.invoices.retrieve(invoiceId);
        return inv.status !== 'paid';
      } catch {
        return true;
      }
    });

    if (!stillUnpaidFinal) return { resolved: 'invoice paid before mahnung-2' };

    await step.run('send-mahnung-2', async () => {
      const resend = getResend();
      // Mahngebühr: €5 flat fee for second notice (standard German practice)
      const mahngebuehrEuro = '€5,00';
      await resend.emails.send({
        from: 'einfach verwaltet. <rechnungen@einfach-verwaltet.de>',
        to: landlord.email,
        subject: `🔴 2. Mahnung — Letzte Aufforderung — Rechnung ${invoiceNumber || ''}`,
        html: `
          <div style="font-family: -apple-system, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px;">
            <h2 style="color: #dc2626;">2. und letzte Mahnung</h2>
            <p style="color: #6b7280;">
              Dies ist unsere letzte Zahlungsaufforderung für Rechnung <strong>${invoiceNumber || invoiceId}</strong>.
            </p>
            <div style="background: #fef2f2; border: 1px solid #fca5a5; border-radius: 8px; padding: 16px; margin: 16px 0;">
              <table style="width: 100%;">
                <tr>
                  <td style="color: #6b7280; font-size: 14px;">Offener Betrag</td>
                  <td style="color: #dc2626; font-weight: 700; text-align: right;">${amountEuro}</td>
                </tr>
                <tr>
                  <td style="color: #6b7280; font-size: 14px;">Mahngebühr</td>
                  <td style="color: #dc2626; font-weight: 700; text-align: right;">${mahngebuehrEuro}</td>
                </tr>
              </table>
            </div>
            <p style="color: #6b7280;">
              Sollte der Betrag nicht innerhalb von <strong>5 Werktagen</strong> eingehen, 
              sehen wir uns leider gezwungen, das Verwaltungsmandat zu pausieren und 
              rechtliche Schritte einzuleiten.
            </p>
            <p style="margin-top: 20px;">
              <a href="https://einfach-verwaltet.de/portal/abrechnung" 
                 style="background: #dc2626; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 600;">
                Sofort bezahlen
              </a>
            </p>
            <p style="color: #6b7280; font-size: 13px; margin-top: 16px;">
              Für Rückfragen: kontakt@einfach-verwaltet.de · +49 40 000 000 00
            </p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
            <p style="color: #9ca3af; font-size: 12px;">
              RVLT Ventures GmbH · Singapurstr. 19 · 20457 Hamburg · HRB 193395 Amtsgericht Hamburg
            </p>
          </div>
        `,
      });
    });

    return { dunningComplete: true, landlordId, invoiceId };
  }
);
