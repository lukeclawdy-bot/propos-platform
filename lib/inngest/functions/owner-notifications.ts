import { inngest } from "../client";
import { db } from "@/lib/db";
import { landlords, tenants, units, properties, documents, tickets } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// Types for notification payloads
type TicketCreatedEvent = {
  ticketId: string;
  tenantId?: string | null;
  unitId?: string | null;
  landlordId: string;
  propertyId: string;
  title: string;
  description?: string | null;
  category?: string | null;
};

type RentOverdueEvent = {
  unitId: string;
  tenantId?: string | null;
  landlordId: string;
  propertyId: string;
  amountCents: number;
  daysOverdue: number;
  dueDate: string;
};

type DocumentUploadedEvent = {
  documentId: string;
  landlordId: string;
  propertyId?: string | null;
  unitId?: string | null;
  tenantId?: string | null;
  name: string;
  type: string;
  url: string;
};

type MieterhohungApprovedEvent = {
  landlordId: string;
  propertyId?: string | null;
  unitId?: string | null;
  tenantId?: string | null;
  letterText: string;
  effectiveDate: string;
  increaseAmountCents: number;
};

// Email template base styles
const emailBaseStyles = `
  <style>
    .email-container { max-width: 600px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; }
    .header { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 32px 24px; text-align: center; }
    .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; }
    .header span { color: #14b8a6; }
    .content { background: #ffffff; padding: 32px 24px; }
    .footer { background: #f8fafc; padding: 24px; text-align: center; border-top: 1px solid #e2e8f0; }
    .footer p { color: #64748b; font-size: 12px; margin: 0; }
    .button { display: inline-block; background: #0f172a; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 500; margin: 16px 0; }
    .button:hover { background: #1e293b; }
    .highlight { background: #f0fdf4; border-left: 4px solid #14b8a6; padding: 16px; margin: 16px 0; }
    .warning { background: #fef2f2; border-left: 4px solid #dc2626; padding: 16px; margin: 16px 0; }
    .info-row { margin: 8px 0; color: #334155; }
    .info-label { font-weight: 600; color: #0f172a; }
    h2 { color: #0f172a; font-size: 20px; margin-top: 0; }
    p { color: #475569; line-height: 1.6; }
    .meta { color: #94a3b8; font-size: 12px; margin-top: 24px; }
  </style>
`;

// Helper to format cents to EUR
function formatEuro(cents: number): string {
  return (cents / 100).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
}

// Helper to get base URL
function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL || 'https://einfach-verwaltet.de';
}

// Get notification preferences for landlord
async function getNotificationPreferences(landlordId: string): Promise<{
  emailNewTicket: boolean;
  emailRentOverdue: boolean;
  emailDailyDigest: boolean;
}> {
  try {
    const [landlord] = await db
      .select({
        emailNewTicket: landlords.emailNewTicket,
        emailRentOverdue: landlords.emailRentOverdue,
        emailDailyDigest: landlords.emailDailyDigest,
      })
      .from(landlords)
      .where(eq(landlords.id, landlordId));
    
    return {
      emailNewTicket: landlord?.emailNewTicket ?? true,
      emailRentOverdue: landlord?.emailRentOverdue ?? true,
      emailDailyDigest: landlord?.emailDailyDigest ?? false,
    };
  } catch (error) {
    console.error('[owner-notifications] Error fetching preferences:', error);
    // Default to all enabled if error
    return {
      emailNewTicket: true,
      emailRentOverdue: true,
      emailDailyDigest: false,
    };
  }
}

// Send email via Resend
async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    console.warn('[owner-notifications] RESEND_API_KEY not configured, skipping email');
    return;
  }

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
      from: 'einfach verwaltet. <system@einfach-verwaltet.de>',
      to,
      subject,
      html: `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
  ${emailBaseStyles}
</head>
<body style="background: #f1f5f9; margin: 0; padding: 16px;">
  <div class="email-container">
    <div class="header">
      <h1>einfach <span>verwaltet.</span></h1>
    </div>
    <div class="content">
      ${html}
    </div>
    <div class="footer">
      <p>Dies ist eine automatische Benachrichtigung aus Ihrem Portal.</p>
      <p style="margin-top: 8px;">© ${new Date().getFullYear()} einfach verwaltet. — Alle Rechte vorbehalten.</p>
    </div>
  </div>
</body>
</html>`,
    });
    
    console.log(`[owner-notifications] Email sent to ${to}: ${subject}`);
  } catch (error) {
    console.error('[owner-notifications] Failed to send email:', error);
    // Don't throw - notifications are best-effort
  }
}

// Build email content for ticket.created
function buildTicketEmail(event: TicketCreatedEvent, tenantName: string | null, unitDesignation: string | null): string {
  const baseUrl = getBaseUrl();
  const ticketUrl = `${baseUrl}/portal/tickets/${event.ticketId}`;
  
  const categoryLabels: Record<string, string> = {
    maintenance: 'Reparatur / Wartung',
    billing: 'Abrechnung',
    complaint: 'Beschwerde',
    other: 'Sonstiges',
    repair: 'Reparatur',
    water: 'Wasserschaden',
    heating: 'Heizung',
    lock: 'Schloss/Schlüssel',
    noise: 'Lärm',
  };
  
  return `
    <h2>Neues Anliegen eingegangen</h2>
    <p>Es wurde ein neues Ticket in Ihrem Portal erstellt.</p>
    
    <div class="highlight">
      <p class="info-row"><span class="info-label">Titel:</span> ${event.title}</p>
      ${tenantName ? `<p class="info-row"><span class="info-label">Mieter:</span> ${tenantName}</p>` : ''}
      ${unitDesignation ? `<p class="info-row"><span class="info-label">Einheit:</span> ${unitDesignation}</p>` : ''}
      ${event.category ? `<p class="info-row"><span class="info-label">Kategorie:</span> ${categoryLabels[event.category] || event.category}</p>` : ''}
    </div>
    
    ${event.description ? `<p><strong>Beschreibung:</strong></p><p>${event.description.replace(/\n/g, '<br>')}</p>` : ''}
    
    <a href="${ticketUrl}" class="button">Ticket öffnen</a>
    
    <p class="meta">Ticket-ID: ${event.ticketId}</p>
  `;
}

// Build email content for rent.overdue
function buildRentOverdueEmail(event: RentOverdueEvent, tenantName: string | null, unitDesignation: string | null): string {
  const baseUrl = getBaseUrl();
  const mieteUrl = `${baseUrl}/portal/miete`;
  
  return `
    <h2>Mietrückstand erkannt</h2>
    <p>Eine Mietzahlung ist überfällig.</p>
    
    <div class="warning">
      <p class="info-row"><span class="info-label">Betrag:</span> ${formatEuro(event.amountCents)}</p>
      ${tenantName ? `<p class="info-row"><span class="info-label">Mieter:</span> ${tenantName}</p>` : ''}
      ${unitDesignation ? `<p class="info-row"><span class="info-label">Einheit:</span> ${unitDesignation}</p>` : ''}
      <p class="info-row"><span class="info-label">Überfällig seit:</span> ${event.daysOverdue} Tagen (fällig am ${new Date(event.dueDate).toLocaleDateString('de-DE')})</p>
    </div>
    
    <p>Über das Portal können Sie eine Mahnung erstellen oder den Zahlungsstatus aktualisieren.</p>
    
    <a href="${mieteUrl}" class="button">Zur Mietübersicht</a>
  `;
}

// Build email content for document.uploaded
function buildDocumentEmail(event: DocumentUploadedEvent): string {
  const baseUrl = getBaseUrl();
  const documentsUrl = `${baseUrl}/portal/dokumente`;
  
  const typeLabels: Record<string, string> = {
    mietvertrag: 'Mietvertrag',
    energieausweis: 'Energieausweis',
    protokoll: 'Protokoll',
    abrechnung: 'Betriebskostenabrechnung',
    mahnung: 'Mahnung',
    sonstiges: 'Sonstiges',
  };
  
  return `
    <h2>Neues Dokument hochgeladen</h2>
    <p>Ein neues Dokument wurde in Ihr Dokumentenarchiv hochgeladen.</p>
    
    <div class="highlight">
      <p class="info-row"><span class="info-label">Dateiname:</span> ${event.name}</p>
      <p class="info-row"><span class="info-label">Typ:</span> ${typeLabels[event.type] || event.type}</p>
    </div>
    
    <p>Die KI analysiert das Dokument automatisch. Sie erhalten eine Benachrichtigung, wenn die Verarbeitung abgeschlossen ist.</p>
    
    <a href="${documentsUrl}" class="button">Dokumente ansehen</a>
  `;
}

// Build email content for mieterhohung.approved
function buildMieterhohungEmail(event: MieterhohungApprovedEvent, tenantName: string | null): string {
  const baseUrl = getBaseUrl();
  const mieterhohungUrl = `${baseUrl}/portal/mieterhohung`;
  
  return `
    <h2>Mieterhöhung bestätigt</h2>
    <p>Ihr Mieterhöhungsverlangen wurde erstellt und ist bereit zum Versand.</p>
    
    <div class="highlight">
      ${tenantName ? `<p class="info-row"><span class="info-label">Mieter:</span> ${tenantName}</p>` : ''}
      <p class="info-row"><span class="info-label">Erhöhungsbetrag:</span> ${formatEuro(event.increaseAmountCents)}</p>
      <p class="info-row"><span class="info-label">Wirksam ab:</span> ${new Date(event.effectiveDate).toLocaleDateString('de-DE')}</p>
    </div>
    
    <p>Das Schreiben wurde nach § 558 BGB erstellt und ist rechtssicher formuliert.</p>
    
    <a href="${mieterhohungUrl}" class="button">Zur Mieterhöhung</a>
  `;
}

// Main notification function
export const ownerNotifications = inngest.createFunction(
  { id: "owner-notifications", name: "Owner Email Notifications" },
  [
    { event: "ticket.created" },
    { event: "rent.overdue" },
    { event: "document.uploaded" },
    { event: "mieterhohung.approved" },
  ],
  async ({ event, step }) => {
    const eventName = event.name as string;
    const data = event.data as any;
    
    console.log(`[owner-notifications] Processing ${eventName}`, { data });
    
    // Get landlord email
    const landlordEmail = await step.run("get-landlord-email", async () => {
      try {
        const [landlord] = await db
          .select({ email: landlords.email, name: landlords.name })
          .from(landlords)
          .where(eq(landlords.id, data.landlordId));
        
        if (!landlord?.email) {
          console.warn(`[owner-notifications] No email found for landlord ${data.landlordId}`);
          return null;
        }
        
        return landlord.email;
      } catch (error) {
        console.error('[owner-notifications] Error fetching landlord:', error);
        return null;
      }
    });
    
    if (!landlordEmail) {
      return { sent: false, reason: 'no_landlord_email' };
    }
    
    // Get notification preferences
    const preferences = await step.run("check-preferences", async () => {
      return getNotificationPreferences(data.landlordId);
    });
    
    // Handle ticket.created
    if (eventName === 'ticket.created') {
      if (!preferences.emailNewTicket) {
        return { sent: false, reason: 'disabled_by_preference' };
      }
      
      const ticketData = data as TicketCreatedEvent;
      
      // Get tenant and unit info
      const { tenantName, unitDesignation } = await step.run("enrich-ticket-data", async () => {
        let tenantName: string | null = null;
        let unitDesignation: string | null = null;
        
        if (ticketData.tenantId) {
          const [tenant] = await db
            .select({ firstName: tenants.firstName, lastName: tenants.lastName })
            .from(tenants)
            .where(eq(tenants.id, ticketData.tenantId));
          if (tenant) {
            tenantName = `${tenant.firstName} ${tenant.lastName}`;
          }
        }
        
        if (ticketData.unitId) {
          const [unit] = await db
            .select({ designation: units.designation })
            .from(units)
            .where(eq(units.id, ticketData.unitId));
          if (unit) {
            unitDesignation = unit.designation;
          }
        }
        
        return { tenantName, unitDesignation };
      });
      
      await step.run("send-ticket-email", async () => {
        const html = buildTicketEmail(ticketData, tenantName, unitDesignation);
        await sendEmail({
          to: landlordEmail,
          subject: `Neues Anliegen${tenantName ? ` von ${tenantName}` : ''} — ${ticketData.title.slice(0, 50)}`,
          html,
        });
      });
      
      return { sent: true, type: 'ticket.created', to: landlordEmail };
    }
    
    // Handle rent.overdue
    if (eventName === 'rent.overdue') {
      if (!preferences.emailRentOverdue) {
        return { sent: false, reason: 'disabled_by_preference' };
      }
      
      const rentData = data as RentOverdueEvent;
      
      // Get tenant and unit info
      const { tenantName, unitDesignation } = await step.run("enrich-rent-data", async () => {
        let tenantName: string | null = null;
        let unitDesignation: string | null = null;
        
        if (rentData.tenantId) {
          const [tenant] = await db
            .select({ firstName: tenants.firstName, lastName: tenants.lastName })
            .from(tenants)
            .where(eq(tenants.id, rentData.tenantId));
          if (tenant) {
            tenantName = `${tenant.firstName} ${tenant.lastName}`;
          }
        }
        
        const [unit] = await db
          .select({ designation: units.designation })
          .from(units)
          .where(eq(units.id, rentData.unitId));
        if (unit) {
          unitDesignation = unit.designation;
        }
        
        return { tenantName, unitDesignation };
      });
      
      await step.run("send-rent-email", async () => {
        const html = buildRentOverdueEmail(rentData, tenantName, unitDesignation);
        await sendEmail({
          to: landlordEmail,
          subject: `Miete überfällig: ${formatEuro(rentData.amountCents)}${tenantName ? ` von ${tenantName}` : ''} seit ${rentData.daysOverdue} Tagen`,
          html,
        });
      });
      
      return { sent: true, type: 'rent.overdue', to: landlordEmail };
    }
    
    // Handle document.uploaded
    if (eventName === 'document.uploaded') {
      // Document upload notifications are always sent (no preference for now)
      const docData = data as DocumentUploadedEvent;
      
      await step.run("send-document-email", async () => {
        const html = buildDocumentEmail(docData);
        await sendEmail({
          to: landlordEmail,
          subject: `Neues Dokument hochgeladen: ${docData.name}`,
          html,
        });
      });
      
      return { sent: true, type: 'document.uploaded', to: landlordEmail };
    }
    
    // Handle mieterhohung.approved
    if (eventName === 'mieterhohung.approved') {
      const mhData = data as MieterhohungApprovedEvent;
      
      // Get tenant name
      const { tenantName } = await step.run("get-tenant-name", async () => {
        if (!mhData.tenantId) return { tenantName: null };
        
        const [tenant] = await db
          .select({ firstName: tenants.firstName, lastName: tenants.lastName })
          .from(tenants)
          .where(eq(tenants.id, mhData.tenantId));
        
        return { 
          tenantName: tenant ? `${tenant.firstName} ${tenant.lastName}` : null 
        };
      });
      
      await step.run("send-mieterhohung-email", async () => {
        const html = buildMieterhohungEmail(mhData, tenantName);
        await sendEmail({
          to: landlordEmail,
          subject: `Mieterhöhung bestätigt — Schreiben liegt bereit${tenantName ? ` für ${tenantName}` : ''}`,
          html,
        });
      });
      
      return { sent: true, type: 'mieterhohung.approved', to: landlordEmail };
    }
    
    return { sent: false, reason: 'unknown_event_type' };
  }
);

// Export individual event senders for use in API routes
export async function sendTicketCreatedNotification(data: TicketCreatedEvent): Promise<void> {
  await inngest.send({
    name: "ticket.created",
    data,
  });
}

export async function sendRentOverdueNotification(data: RentOverdueEvent): Promise<void> {
  await inngest.send({
    name: "rent.overdue",
    data,
  });
}

export async function sendDocumentUploadedNotification(data: DocumentUploadedEvent): Promise<void> {
  await inngest.send({
    name: "document.uploaded",
    data,
  });
}

export async function sendMieterhohungApprovedNotification(data: MieterhohungApprovedEvent): Promise<void> {
  await inngest.send({
    name: "mieterhohung.approved",
    data,
  });
}
