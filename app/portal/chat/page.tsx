import Link from "next/link";
import { db } from "@/lib/db";
import { tickets, properties, units, tenants, conversations } from "@/lib/db/schema";
import { eq, and, desc, sql } from "drizzle-orm";

const DEMO_LANDLORD_ID = process.env.DEMO_LANDLORD_ID || "";

const STATUS_CONFIG = {
  open: { label: "Offen", bg: "bg-red-50", text: "text-red-600", dot: "bg-red-500" },
  inprogress: { label: "In Bearbeitung", bg: "bg-amber-50", text: "text-amber-600", dot: "bg-amber-500" },
  resolved: { label: "Erledigt", bg: "bg-green-50", text: "text-green-600", dot: "bg-green-500" },
  closed: { label: "Geschlossen", bg: "bg-gray-50", text: "text-gray-600", dot: "bg-gray-400" },
};

const CATEGORY_LABELS: Record<string, string> = {
  maintenance: "Wartung/Reparatur",
  billing: "Abrechnung",
  complaint: "Beschwerde",
  general: "Allgemein",
};

interface ConversationGroup {
  propertyId: string;
  propertyAddress: string;
  tickets: {
    ticketId: string;
    title: string;
    status: string;
    category: string;
    priority: string;
    createdAt: Date;
    tenantName: string;
    unitDesignation: string;
    lastMessage: string;
    lastMessageAt: Date;
    unreadCount: number;
  }[];
}

async function getConversations(landlordId: string): Promise<ConversationGroup[]> {
  if (!landlordId) {
    // Return mock data for demo
    return [
      {
        propertyId: "p-1",
        propertyAddress: "Musterstraße 12, 20095 Hamburg",
        tickets: [
          {
            ticketId: "t-1",
            title: "Heizung ausgefallen",
            status: "open",
            category: "maintenance",
            priority: "high",
            createdAt: new Date(Date.now() - 86400000),
            tenantName: "M. Richter",
            unitDesignation: "Whg. 3",
            lastMessage: "Die Heizung funktioniert seit gestern nicht mehr...",
            lastMessageAt: new Date(Date.now() - 3600000),
            unreadCount: 2,
          },
          {
            ticketId: "t-2",
            title: "Briefkasten defekt",
            status: "inprogress",
            category: "maintenance",
            priority: "normal",
            createdAt: new Date(Date.now() - 172800000),
            tenantName: "S. Müller",
            unitDesignation: "Whg. 1",
            lastMessage: "Vielen Dank für die schnelle Reaktion...",
            lastMessageAt: new Date(Date.now() - 7200000),
            unreadCount: 0,
          },
        ],
      },
      {
        propertyId: "p-2",
        propertyAddress: "Beispielweg 5, 10115 Berlin",
        tickets: [
          {
            ticketId: "t-3",
            title: "Nebenkostenabrechnung Frage",
            status: "resolved",
            category: "billing",
            priority: "low",
            createdAt: new Date(Date.now() - 604800000),
            tenantName: "A. Schmidt",
            unitDesignation: "Whg. 2",
            lastMessage: "Alles klar, vielen Dank für die Erklärung!",
            lastMessageAt: new Date(Date.now() - 86400000),
            unreadCount: 0,
          },
        ],
      },
    ];
  }

  try {
    // Get all tickets with their property info
    const ticketData = await db.select({
      ticketId: tickets.id,
      title: tickets.title,
      status: tickets.status,
      category: tickets.category,
      priority: tickets.priority,
      createdAt: tickets.createdAt,
      propertyId: tickets.propertyId,
      propertyAddress: properties.address,
      tenantId: tickets.tenantId,
      unitId: tickets.unitId,
    })
    .from(tickets)
    .leftJoin(properties, eq(tickets.propertyId, properties.id))
    .where(eq(tickets.landlordId, landlordId))
    .orderBy(desc(tickets.updatedAt));

    // Group by property
    const grouped: Record<string, ConversationGroup> = {};

    for (const t of ticketData) {
      if (!t.propertyId || !grouped[t.propertyId]) {
        grouped[t.propertyId] = {
          propertyId: t.propertyId,
          propertyAddress: t.propertyAddress || "Unbekannte Adresse",
          tickets: [],
        };
      }

      // Get tenant name
      let tenantName = "Unbekannter Mieter";
      if (t.tenantId) {
        const tenantData = await db.select({
          firstName: tenants.firstName,
          lastName: tenants.lastName,
        }).from(tenants).where(eq(tenants.id, t.tenantId));
        if (tenantData.length > 0) {
          const tn = tenantData[0];
          tenantName = `${tn.firstName?.[0] || ""}. ${tn.lastName || ""}`.trim() || "Unbekannt";
        }
      }

      // Get unit designation
      let unitDesignation = "";
      if (t.unitId) {
        const unitData = await db.select({
          designation: units.designation,
        }).from(units).where(eq(units.id, t.unitId));
        if (unitData.length > 0) {
          unitDesignation = unitData[0].designation || "";
        }
      }

      // Get last message
      const lastMsgs = await db.select({
        body: conversations.body,
        createdAt: conversations.createdAt,
        readAt: conversations.readAt,
      })
      .from(conversations)
      .where(eq(conversations.ticketId, t.ticketId))
      .orderBy(desc(conversations.createdAt))
      .limit(1);

      // Count unread messages (inbound messages without readAt)
      const unreadResult = await db.select({
        count: sql<number>`count(*)`,
      })
      .from(conversations)
      .where(
        and(
          eq(conversations.ticketId, t.ticketId),
          eq(conversations.direction, "inbound"),
          sql`${conversations.readAt} IS NULL`
        )
      );

      const lastMsg = lastMsgs[0];
      
      grouped[t.propertyId].tickets.push({
        ticketId: t.ticketId,
        title: t.title,
        status: t.status || "open",
        category: t.category || "general",
        priority: t.priority || "normal",
        createdAt: t.createdAt || new Date(),
        tenantName,
        unitDesignation,
        lastMessage: lastMsg?.body || t.title,
        lastMessageAt: lastMsg?.createdAt || t.createdAt || new Date(),
        unreadCount: unreadResult[0]?.count || 0,
      });
    }

    return Object.values(grouped);
  } catch (e) {
    console.error("Error fetching conversations:", e);
    return [];
  }
}

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - new Date(date).getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Gerade eben";
  if (diffMins < 60) return `Vor ${diffMins} Min.`;
  if (diffHours < 24) return `Vor ${diffHours} Std.`;
  if (diffDays < 7) return `Vor ${diffDays} Tagen`;
  return new Date(date).toLocaleDateString("de-DE");
}

export default async function ChatPage() {
  const groups = await getConversations(DEMO_LANDLORD_ID);

  return (
    <div className="min-h-screen bg-light-gray flex">
      {/* Sidebar */}
      <aside className="w-56 bg-navy min-h-screen flex flex-col fixed left-0 top-0 bottom-0">
        <div className="px-5 py-5 border-b border-white/10">
          <a href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-teal rounded-md flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <span className="text-white text-sm font-bold">einfach <span className="text-teal">verwaltet.</span></span>
          </a>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {[
            { label: "Übersicht", href: "/portal/dashboard" },
            { label: "Chat", href: "/portal/chat", active: true },
            { label: "Tickets", href: "/portal/tickets" },
            { label: "Dokumente", href: "/portal/dokumente" },
            { label: "Finanzen", href: "/portal/finanzen" },
          ].map((item) => (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors
                ${item.active ? "bg-teal/20 text-teal font-medium" : "text-white/60 hover:bg-white/5 hover:text-white"}`}>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-56">
        <div className="max-w-4xl mx-auto px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-navy">Chat</h1>
            <span className="text-sm text-text-light">
              {groups.reduce((acc, g) => acc + g.tickets.length, 0)} Gespräche
            </span>
          </div>

          {groups.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 py-16 text-center">
              <div className="text-4xl mb-3">💬</div>
              <p className="text-navy font-semibold">Keine Gespräche</p>
              <p className="text-text-light text-sm mt-1">Hier erscheinen Nachrichten von Ihren Mietern.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {groups.map((group) => (
                <div key={group.propertyId} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  {/* Property Header */}
                  <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <h2 className="font-semibold text-navy">{group.propertyAddress}</h2>
                    </div>
                  </div>

                  {/* Tickets List */}
                  <div className="divide-y divide-gray-50">
                    {group.tickets.map((ticket) => {
                      const status = STATUS_CONFIG[ticket.status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.open;
                      return (
                        <Link
                          key={ticket.ticketId}
                          href={`/portal/chat/${ticket.ticketId}`}
                          className="flex items-start gap-4 p-4 hover:bg-gray-50/50 transition-colors"
                        >
                          {/* Avatar */}
                          <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-teal font-medium text-sm">
                              {ticket.tenantName.split(" ").map(n => n[0]).join("").slice(0, 2)}
                            </span>
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-navy truncate">{ticket.tenantName}</span>
                                {ticket.unitDesignation && (
                                  <span className="text-xs text-text-light bg-gray-100 px-2 py-0.5 rounded">
                                    {ticket.unitDesignation}
                                  </span>
                                )}
                              </div>
                              <span className="text-xs text-text-light flex-shrink-0">
                                {formatRelativeTime(ticket.lastMessageAt)}
                              </span>
                            </div>
                            <p className="text-sm text-navy font-medium truncate mb-1">{ticket.title}</p>
                            <p className="text-sm text-text-light truncate">{ticket.lastMessage}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${status.bg} ${status.text}`}>
                                {status.label}
                              </span>
                              {CATEGORY_LABELS[ticket.category] && (
                                <span className="text-xs text-text-light">
                                  {CATEGORY_LABELS[ticket.category]}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Unread Badge */}
                          {ticket.unreadCount > 0 && (
                            <div className="flex-shrink-0 w-5 h-5 bg-teal rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-medium">{ticket.unreadCount}</span>
                            </div>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
