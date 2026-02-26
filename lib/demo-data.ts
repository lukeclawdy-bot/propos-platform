// Demo data service — hardcoded data for public demo mode
// No database calls, used when isDemo: true in session

export interface DemoLandlord {
  id: string;
  name: string;
  plan: string;
}

export interface DemoProperty {
  id: string;
  name: string;
  units: number;
  city: string;
}

export interface DemoStats {
  totalUnits: number;
  occupancyRate: number;
  openTickets: number;
  monthlyRent: number;
}

export interface DemoData {
  landlord: DemoLandlord;
  properties: DemoProperty[];
  stats: DemoStats;
}

// Demo Property with full details
export interface DemoPropertyDetail {
  id: string;
  landlordId: string;
  address: string;
  city: string;
  postalCode: string;
  verwaltungstyp: string;
  unitCount: number;
  active: boolean;
  unitsCount?: number;
  openTicketsCount?: number;
  createdAt: string;
}

// Demo Unit with full details
export interface DemoUnit {
  id: string;
  propertyId: string;
  designation: string;
  areaM2: string | null;
  floor: number | null;
  rooms: string | null;
  coldRentCents: number | null;
  occupied: boolean;
  tenantName: string | null;
  tenantEmail: string | null;
}

// Demo Tenant with full details
export interface DemoTenant {
  id: string;
  unitId: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  moveInDate: string | null;
  moveOutDate: string | null;
  active: boolean;
  unit: {
    id: string;
    designation: string;
    propertyAddress: string;
  } | null;
  coldRentCents: number | null;
}

// Demo Financial Transaction
export interface DemoTransaction {
  id: string;
  landlordId: string;
  propertyId: string | null;
  unitId: string | null;
  tenantId: string | null;
  type: string;
  amountCents: number;
  description: string | null;
  propertyAddress: string | null;
  status: string;
  createdAt: string;
}

export function getDemoData(): DemoData {
  return {
    landlord: {
      id: "demo",
      name: "Max Mustermann",
      plan: "standard"
    },
    properties: [
      { id: "p1", name: "Musterstraße 12", units: 8, city: "Hamburg" },
      { id: "p2", name: "Alsterblick 5", units: 5, city: "Hamburg" },
    ],
    stats: {
      totalUnits: 13,
      occupancyRate: 92,
      openTickets: 2,
      monthlyRent: 11700
    }
  };
}

// Dashboard stats derived from demo data
export function getDemoDashboardData() {
  const demo = getDemoData();
  
  return {
    propertiesCount: demo.properties.length,
    totalUnits: demo.stats.totalUnits,
    occupiedUnits: Math.round(demo.stats.totalUnits * (demo.stats.occupancyRate / 100)),
    occupancyRate: demo.stats.occupancyRate,
    openTicketsCount: demo.stats.openTickets,
    pendingActionsCount: 3,
    rentThisMonthCents: demo.stats.monthlyRent * 100,
    topAiActions: [
      {
        id: "demo-1",
        urgency: 4,
        title: "Mieter Wohnung 3 hat seit 5 Tagen nicht auf Nebenkostenabrechnung reagiert.",
        actionLabel: "Erinnerung senden",
        dismissLabel: "Ignorieren",
      },
      {
        id: "demo-2",
        urgency: 3,
        title: "Mieterhöhung Wohnung 1 möglich — §558 BGB, letzte Erhöhung vor 19 Monaten (+4,2% möglich).",
        actionLabel: "Berechnen",
        dismissLabel: "Später",
      },
      {
        id: "demo-3",
        urgency: 2,
        title: "Heizungswartung Wohnung 2 — Angebot Müller Heizung: €340. Beauftragen?",
        actionLabel: "Beauftragen",
        dismissLabel: "Ablehnen",
      },
    ],
  };
}

// Demo tickets
export function getDemoTickets() {
  return [
    {
      id: "demo-t-1",
      urgency: 4,
      title: "Heizung ausgefallen",
      tenantName: "M. Richter",
      unitDesignation: "Whg. 3",
      status: "open",
      createdAt: new Date().toISOString(),
    },
    {
      id: "demo-t-2",
      urgency: 2,
      title: "Briefkasten defekt",
      tenantName: "S. Müller",
      unitDesignation: "Whg. 1",
      status: "open",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
  ];
}

// Rent collection demo data
export function getDemoRentCollectionData() {
  const today = new Date();
  const dueDate = new Date(today.getFullYear(), today.getMonth(), 3);
  
  return {
    items: [
      {
        tenantId: "demo-t1",
        tenantName: "Maria Schmidt",
        propertyAddress: "Musterstraße 12",
        unitDesignation: "Whg. 2",
        coldRentCents: 120000, // €1,200
        dueDate: dueDate.toISOString(),
        paymentStatus: "paid" as const,
        daysOverdue: 0,
        mahnungLevel: 0,
        mahnungCount: 0,
      },
      {
        tenantId: "demo-t2",
        tenantName: "Hans Müller",
        propertyAddress: "Musterstraße 12",
        unitDesignation: "Whg. 3",
        coldRentCents: 98000, // €980
        dueDate: dueDate.toISOString(),
        paymentStatus: "overdue" as const,
        daysOverdue: 12,
        mahnungLevel: 2,
        mahnungCount: 1,
      },
      {
        tenantId: "demo-t3",
        tenantName: "Lisa Weber",
        propertyAddress: "Alsterblick 5",
        unitDesignation: "Whg. 1",
        coldRentCents: 145000, // €1,450
        dueDate: dueDate.toISOString(),
        paymentStatus: "paid" as const,
        daysOverdue: 0,
        mahnungLevel: 0,
        mahnungCount: 0,
      },
      {
        tenantId: "demo-t4",
        tenantName: "Thomas Klein",
        propertyAddress: "Alsterblick 5",
        unitDesignation: "Whg. 2",
        coldRentCents: 110000, // €1,100
        dueDate: dueDate.toISOString(),
        paymentStatus: "pending" as const,
        daysOverdue: 0,
        mahnungLevel: 0,
        mahnungCount: 0,
      },
      {
        tenantId: "demo-t5",
        tenantName: "Sarah Fischer",
        propertyAddress: "Musterstraße 12",
        unitDesignation: "Whg. 5",
        coldRentCents: 87500, // €875
        dueDate: dueDate.toISOString(),
        paymentStatus: "overdue" as const,
        daysOverdue: 25,
        mahnungLevel: 2,
        mahnungCount: 2,
      },
      {
        tenantId: "demo-t6",
        tenantName: "Michael Bauer",
        propertyAddress: "Alsterblick 5",
        unitDesignation: "Whg. 4",
        coldRentCents: 132000, // €1,320
        dueDate: dueDate.toISOString(),
        paymentStatus: "overdue" as const,
        daysOverdue: 5,
        mahnungLevel: 1,
        mahnungCount: 0,
      },
    ],
    stats: {
      totalRentRollCents: 692500, // €6,925 total monthly rent
      collectedThisMonthCents: 365000, // €3,650 collected (52.7%)
      outstandingCents: 327500, // €3,275 outstanding
      collectionRate: 53,
      overdueCount: 3,
    },
  };
}

// Mahnung management demo data
export function getDemoMahnungData() {
  const today = new Date();
  const dueDate = new Date(today.getFullYear(), today.getMonth(), 3);
  
  return {
    items: [
      {
        tenantId: "demo-t2",
        tenantName: "Hans Müller",
        propertyAddress: "Musterstraße 12",
        unitDesignation: "Whg. 3",
        coldRentCents: 98000,
        dueDate: dueDate.toISOString(),
        daysOverdue: 12,
        mahnungLevel: 2,
        lastMahnungDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        mahnungCount: 1,
      },
      {
        tenantId: "demo-t5",
        tenantName: "Sarah Fischer",
        propertyAddress: "Musterstraße 12",
        unitDesignation: "Whg. 5",
        coldRentCents: 87500,
        dueDate: dueDate.toISOString(),
        daysOverdue: 25,
        mahnungLevel: 2,
        lastMahnungDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        mahnungCount: 2,
      },
      {
        tenantId: "demo-t6",
        tenantName: "Michael Bauer",
        propertyAddress: "Alsterblick 5",
        unitDesignation: "Whg. 4",
        coldRentCents: 132000,
        dueDate: dueDate.toISOString(),
        daysOverdue: 5,
        mahnungLevel: 1,
        lastMahnungDate: undefined,
        mahnungCount: 0,
      },
    ],
  };
}

// Demo Properties
export function getDemoProperties(): DemoPropertyDetail[] {
  return [
    {
      id: "demo-prop-1",
      landlordId: "demo",
      address: "Musterstraße 12",
      city: "Hamburg",
      postalCode: "20095",
      verwaltungstyp: "miet",
      unitCount: 6,
      active: true,
      unitsCount: 6,
      openTicketsCount: 2,
      createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "demo-prop-2",
      landlordId: "demo",
      address: "Alsterblick 5",
      city: "Hamburg",
      postalCode: "20354",
      verwaltungstyp: "miet",
      unitCount: 4,
      active: true,
      unitsCount: 4,
      openTicketsCount: 1,
      createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];
}

// Demo Units
export function getDemoUnits(): DemoUnit[] {
  return [
    // Musterstraße 12 units
    {
      id: "demo-unit-1",
      propertyId: "demo-prop-1",
      designation: "Whg. 1 (EG links)",
      areaM2: "72.5",
      floor: 0,
      rooms: "3",
      coldRentCents: 120000,
      occupied: true,
      tenantName: "Maria Schmidt",
      tenantEmail: "maria.schmidt@example.de",
    },
    {
      id: "demo-unit-2",
      propertyId: "demo-prop-1",
      designation: "Whg. 2 (EG rechts)",
      areaM2: "65.0",
      floor: 0,
      rooms: "2.5",
      coldRentCents: 98000,
      occupied: true,
      tenantName: "Hans Müller",
      tenantEmail: "hans.mueller@example.de",
    },
    {
      id: "demo-unit-3",
      propertyId: "demo-prop-1",
      designation: "Whg. 3 (1. OG links)",
      areaM2: "88.0",
      floor: 1,
      rooms: "4",
      coldRentCents: 145000,
      occupied: true,
      tenantName: "Lisa Weber",
      tenantEmail: "lisa.weber@example.de",
    },
    {
      id: "demo-unit-4",
      propertyId: "demo-prop-1",
      designation: "Whg. 4 (1. OG rechts)",
      areaM2: "55.0",
      floor: 1,
      rooms: "2",
      coldRentCents: 87500,
      occupied: true,
      tenantName: "Sarah Fischer",
      tenantEmail: "sarah.fischer@example.de",
    },
    {
      id: "demo-unit-5",
      propertyId: "demo-prop-1",
      designation: "Whg. 5 (2. OG)",
      areaM2: "75.0",
      floor: 2,
      rooms: "3",
      coldRentCents: 110000,
      occupied: false,
      tenantName: null,
      tenantEmail: null,
    },
    {
      id: "demo-unit-6",
      propertyId: "demo-prop-1",
      designation: "Gewerbe (Souterrain)",
      areaM2: "120.0",
      floor: -1,
      rooms: "1",
      coldRentCents: 180000,
      occupied: false,
      tenantName: null,
      tenantEmail: null,
    },
    // Alsterblick 5 units
    {
      id: "demo-unit-7",
      propertyId: "demo-prop-2",
      designation: "Whg. 1",
      areaM2: "58.0",
      floor: 0,
      rooms: "2",
      coldRentCents: 132000,
      occupied: true,
      tenantName: "Thomas Klein",
      tenantEmail: "thomas.klein@example.de",
    },
    {
      id: "demo-unit-8",
      propertyId: "demo-prop-2",
      designation: "Whg. 2",
      areaM2: "70.0",
      floor: 1,
      rooms: "3",
      coldRentCents: 145000,
      occupied: true,
      tenantName: "Petra Schulze",
      tenantEmail: "petra.schulze@example.de",
    },
    {
      id: "demo-unit-9",
      propertyId: "demo-prop-2",
      designation: "Whg. 3",
      areaM2: "85.0",
      floor: 2,
      rooms: "3.5",
      coldRentCents: 175000,
      occupied: true,
      tenantName: "Michael Bauer",
      tenantEmail: "michael.bauer@example.de",
    },
    {
      id: "demo-unit-10",
      propertyId: "demo-prop-2",
      designation: "Penthouse",
      areaM2: "120.0",
      floor: 3,
      rooms: "4.5",
      coldRentCents: 220000,
      occupied: false,
      tenantName: null,
      tenantEmail: null,
    },
  ];
}

// Demo Tenants
export function getDemoTenants(): DemoTenant[] {
  const units = getDemoUnits();
  const properties = getDemoProperties();
  
  return [
    {
      id: "demo-tenant-1",
      unitId: "demo-unit-1",
      firstName: "Maria",
      lastName: "Schmidt",
      email: "maria.schmidt@example.de",
      phone: "+49 151 12345678",
      moveInDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
      moveOutDate: null,
      active: true,
      unit: {
        id: "demo-unit-1",
        designation: "Whg. 1 (EG links)",
        propertyAddress: "Musterstraße 12",
      },
      coldRentCents: 120000,
    },
    {
      id: "demo-tenant-2",
      unitId: "demo-unit-2",
      firstName: "Hans",
      lastName: "Müller",
      email: "hans.mueller@example.de",
      phone: "+49 152 87654321",
      moveInDate: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
      moveOutDate: null,
      active: true,
      unit: {
        id: "demo-unit-2",
        designation: "Whg. 2 (EG rechts)",
        propertyAddress: "Musterstraße 12",
      },
      coldRentCents: 98000,
    },
    {
      id: "demo-tenant-3",
      unitId: "demo-unit-3",
      firstName: "Lisa",
      lastName: "Weber",
      email: "lisa.weber@example.de",
      phone: "+49 160 11223344",
      moveInDate: new Date(Date.now() - 730 * 24 * 60 * 60 * 1000).toISOString(),
      moveOutDate: null,
      active: true,
      unit: {
        id: "demo-unit-3",
        designation: "Whg. 3 (1. OG links)",
        propertyAddress: "Musterstraße 12",
      },
      coldRentCents: 145000,
    },
    {
      id: "demo-tenant-4",
      unitId: "demo-unit-4",
      firstName: "Sarah",
      lastName: "Fischer",
      email: "sarah.fischer@example.de",
      phone: "+49 171 55667788",
      moveInDate: new Date(Date.now() - 270 * 24 * 60 * 60 * 1000).toISOString(),
      moveOutDate: null,
      active: true,
      unit: {
        id: "demo-unit-4",
        designation: "Whg. 4 (1. OG rechts)",
        propertyAddress: "Musterstraße 12",
      },
      coldRentCents: 87500,
    },
    {
      id: "demo-tenant-5",
      unitId: "demo-unit-7",
      firstName: "Thomas",
      lastName: "Klein",
      email: "thomas.klein@example.de",
      phone: "+49 175 99887766",
      moveInDate: new Date(Date.now() - 450 * 24 * 60 * 60 * 1000).toISOString(),
      moveOutDate: null,
      active: true,
      unit: {
        id: "demo-unit-7",
        designation: "Whg. 1",
        propertyAddress: "Alsterblick 5",
      },
      coldRentCents: 132000,
    },
    {
      id: "demo-tenant-6",
      unitId: "demo-unit-8",
      firstName: "Petra",
      lastName: "Schulze",
      email: "petra.schulze@example.de",
      phone: "+49 179 44332211",
      moveInDate: new Date(Date.now() - 600 * 24 * 60 * 60 * 1000).toISOString(),
      moveOutDate: null,
      active: true,
      unit: {
        id: "demo-unit-8",
        designation: "Whg. 2",
        propertyAddress: "Alsterblick 5",
      },
      coldRentCents: 145000,
    },
    {
      id: "demo-tenant-7",
      unitId: "demo-unit-9",
      firstName: "Michael",
      lastName: "Bauer",
      email: "michael.bauer@example.de",
      phone: "+49 151 77665544",
      moveInDate: new Date(Date.now() - 300 * 24 * 60 * 60 * 1000).toISOString(),
      moveOutDate: null,
      active: true,
      unit: {
        id: "demo-unit-9",
        designation: "Whg. 3",
        propertyAddress: "Alsterblick 5",
      },
      coldRentCents: 175000,
    },
  ];
}

// Demo Financial Data
export function getDemoFinanzenData() {
  const today = new Date();
  const monthNames = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
  
  // Create monthly summary for last 6 months
  const monthlySummary = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const isCurrentMonth = i === 0;
    monthlySummary.push({
      month: `${monthNames[d.getMonth()]} ${d.getFullYear()}`,
      income: isCurrentMonth ? 692500 : 692500 + Math.floor(Math.random() * 50000) - 25000,
      expenses: 180000 + Math.floor(Math.random() * 30000) - 15000,
    });
  }

  // Sample transactions
  const transactions: DemoTransaction[] = [
    {
      id: "demo-tx-1",
      landlordId: "demo",
      propertyId: "demo-prop-1",
      unitId: "demo-unit-1",
      tenantId: "demo-tenant-1",
      type: "rent_received",
      amountCents: 120000,
      description: "Miete Februar 2026 - Maria Schmidt",
      propertyAddress: "Musterstraße 12",
      status: "completed",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "demo-tx-2",
      landlordId: "demo",
      propertyId: "demo-prop-1",
      unitId: "demo-unit-2",
      tenantId: "demo-tenant-2",
      type: "rent_received",
      amountCents: 98000,
      description: "Miete Februar 2026 - Hans Müller",
      propertyAddress: "Musterstraße 12",
      status: "completed",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "demo-tx-3",
      landlordId: "demo",
      propertyId: "demo-prop-1",
      unitId: "demo-unit-3",
      tenantId: "demo-tenant-3",
      type: "rent_received",
      amountCents: 145000,
      description: "Miete Februar 2026 - Lisa Weber",
      propertyAddress: "Musterstraße 12",
      status: "completed",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "demo-tx-4",
      landlordId: "demo",
      propertyId: "demo-prop-2",
      unitId: "demo-unit-7",
      tenantId: "demo-tenant-5",
      type: "rent_received",
      amountCents: 132000,
      description: "Miete Februar 2026 - Thomas Klein",
      propertyAddress: "Alsterblick 5",
      status: "completed",
      createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "demo-tx-5",
      landlordId: "demo",
      propertyId: "demo-prop-2",
      unitId: "demo-unit-8",
      tenantId: "demo-tenant-6",
      type: "rent_received",
      amountCents: 145000,
      description: "Miete Februar 2026 - Petra Schulze",
      propertyAddress: "Alsterblick 5",
      status: "completed",
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "demo-tx-6",
      landlordId: "demo",
      propertyId: "demo-prop-1",
      unitId: null,
      tenantId: null,
      type: "expense",
      amountCents: 85000,
      description: "Treppenhausreinigung Februar",
      propertyAddress: "Musterstraße 12",
      status: "completed",
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "demo-tx-7",
      landlordId: "demo",
      propertyId: "demo-prop-1",
      unitId: "demo-unit-2",
      tenantId: "demo-tenant-2",
      type: "mahnung",
      amountCents: 12500,
      description: "Mahngebühr 1. Mahnung - Hans Müller",
      propertyAddress: "Musterstraße 12",
      status: "pending",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "demo-tx-8",
      landlordId: "demo",
      propertyId: "demo-prop-2",
      unitId: null,
      tenantId: null,
      type: "expense",
      amountCents: 42000,
      description: "Gartenpflege Q1 2026",
      propertyAddress: "Alsterblick 5",
      status: "completed",
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "demo-tx-9",
      landlordId: "demo",
      propertyId: "demo-prop-1",
      unitId: null,
      tenantId: null,
      type: "expense",
      amountCents: 125000,
      description: "Heizungswartung Jahresvertrag",
      propertyAddress: "Musterstraße 12",
      status: "completed",
      createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "demo-tx-10",
      landlordId: "demo",
      propertyId: "demo-prop-2",
      unitId: "demo-unit-9",
      tenantId: "demo-tenant-7",
      type: "rent_received",
      amountCents: 175000,
      description: "Miete Februar 2026 - Michael Bauer",
      propertyAddress: "Alsterblick 5",
      status: "completed",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  // Calculate current month stats
  const currentMonthIncome = transactions
    .filter(t => t.type === 'rent_received')
    .reduce((sum, t) => sum + t.amountCents, 0);
  
  const currentMonthExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amountCents, 0);

  return {
    transactions,
    monthlySummary,
    stats: {
      totalIncome: currentMonthIncome,
      pending: 212500, // 2 tenants haven't paid yet
      expenses: currentMonthExpenses,
    },
  };
}

// Demo Landlord Settings
export function getDemoLandlord() {
  return {
    id: "demo",
    email: "demo@einfach-verwaltet.de",
    name: "Max Mustermann",
    companyName: null,
    type: "private",
    communicationChannel: "email",
    aiAutonomyLevel: "supervised",
    onboardingCompleted: true,
    createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
  };
}
