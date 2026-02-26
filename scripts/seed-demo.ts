#!/usr/bin/env tsx
/**
 * Demo Seed Script for einfach verwaltet.
 * Populates the database with realistic Hamburg data for portal demos.
 * 
 * Usage:
 *   npx tsx scripts/seed-demo.ts
 * or via npm script:
 *   npm run seed:demo
 * 
 * Requires DATABASE_URL environment variable to be set.
 */

import { db } from '@/lib/db';
import {
  landlords,
  properties,
  units,
  tenants,
  tickets,
  financialTransactions,
} from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

const DEMO_EMAIL = 'demo@einfach-verwaltet.de';

// Demo properties in Hamburg
const DEMO_PROPERTIES = [
  {
    address: 'Wandsbeker Chaussee 34',
    postalCode: '22089',
    city: 'Hamburg',
    unitCount: 6,
    verwaltungstyp: 'miet',
    description: 'Altbau-Wohnhaus in guter Lage',
  },
  {
    address: 'Eppendorfer Weg 112',
    postalCode: '20259',
    city: 'Hamburg',
    unitCount: 4,
    verwaltungstyp: 'miet',
    description: 'Modernes Neubau-Mehrfamilienhaus',
  },
  {
    address: 'Bergedorfer Straße 88',
    postalCode: '21029',
    city: 'Hamburg-Bergedorf',
    unitCount: 8,
    verwaltungstyp: 'miet',
    description: 'Großes Wohngebäude mit Einbauküchen',
  },
  {
    address: 'Hoheluftchaussee 45',
    postalCode: '20253',
    city: 'Hamburg',
    unitCount: 4, // 3 Wohnungen + 1 Gewerbe
    verwaltungstyp: 'miet',
    description: 'Gemischtes Wohn- und Geschäftshaus',
  },
  {
    address: 'Rahlstedter Str. 92',
    postalCode: '22143',
    city: 'Hamburg',
    unitCount: 12,
    verwaltungstyp: 'miet',
    description: 'Großanlage mit Aufzug und Tiefgarage',
  },
];

// German first and last names for realistic tenants
const FIRST_NAMES = [
  'Anna', 'Benjamin', 'Clara', 'David', 'Emma',
  'Felix', 'Greta', 'Hans', 'Ina', 'Jakob',
  'Klara', 'Lukas', 'Maria', 'Niklas', 'Olivia',
  'Paul', 'Sophie', 'Thomas', 'Ulrike', 'Viktor',
  'Werner', 'Xenia', 'Yannick', 'Zoe'
];

const LAST_NAMES = [
  'Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber',
  'Meyer', 'Wagner', 'Becker', 'Schulz', 'Hoffmann',
  'Koch', 'Bauer', 'Richter', 'Klein', 'Wolf',
  'Schröder', 'Neumann', 'Schwarz', 'Zimmermann', 'Braun',
  'Krüger', 'Hofmann', 'Lange', 'Schmitt', 'Werner'
];

// Helper: Generate random integer in range
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Helper: Generate random German phone number
function randomPhone(): string {
  const prefix = ['0151', '0152', '0170', '0171', '0172', '0173', '0160', '0162', '0163'][randomInt(0, 8)];
  return `${prefix}-${randomInt(1000000, 9999999)}`;
}

// Helper: Generate email
function generateEmail(first: string, last: string): string {
  const normalized = `${first.toLowerCase()}.${last.toLowerCase().replace(/[^a-z]/g, '')}`;
  return `${normalized}@example.de`;
}

// Helper: Move-in date (past 0-36 months)
function randomMoveInDate(): Date {
  const monthsAgo = randomInt(0, 36);
  const d = new Date();
  d.setMonth(d.getMonth() - monthsAgo);
  d.setDate(1);
  return d;
}

async function seed() {
  console.log('🌱 Starting demo data seed...\n');

  try {
    // Check if demo landlord already exists
    const existingLandlord = await db
      .select()
      .from(landlords)
      .where(eq(landlords.email, DEMO_EMAIL));

    if (existingLandlord.length > 0) {
      console.log('⚠️  Demo landlord already exists. Deleting existing data...');
      const landlordId = existingLandlord[0].id;

      // Cascade delete: tickets -> tenants -> units -> properties -> landlord
      await db.delete(financialTransactions).where(eq(financialTransactions.landlordId, landlordId));
      await db.delete(tickets).where(eq(tickets.landlordId, landlordId));
      
      const existingProperties = await db
        .select()
        .from(properties)
        .where(eq(properties.landlordId, landlordId));
      
      for (const prop of existingProperties) {
        const existingUnits = await db
          .select()
          .from(units)
          .where(eq(units.propertyId, prop.id));
        
        for (const unit of existingUnits) {
          await db.delete(tenants).where(eq(tenants.unitId, unit.id));
        }
        await db.delete(units).where(eq(units.propertyId, prop.id));
      }
      
      await db.delete(properties).where(eq(properties.landlordId, landlordId));
      await db.delete(landlords).where(eq(landlords.id, landlordId));
      
      console.log('✅ Existing demo data cleaned up\n');
    }

    // Create demo landlord
    console.log('👤 Creating demo landlord...');
    const [landlord] = await db
      .insert(landlords)
      .values({
        email: DEMO_EMAIL,
        name: 'Lukas Schmitz',
        phone: '0176-12345678',
        companyName: 'Demo Verwaltung GmbH',
        type: 'professional',
        communicationChannel: 'portal',
        aiAutonomyLevel: 'supervised',
        onboardingCompleted: true,
      })
      .returning();

    console.log(`   → Created: ${landlord.name} (${landlord.email})`);
    console.log(`   → ID: ${landlord.id}\n`);

    // Create properties
    console.log('🏢 Creating 5 Hamburg properties...');
    const createdProperties = [];

    for (let i = 0; i < DEMO_PROPERTIES.length; i++) {
      const prop = DEMO_PROPERTIES[i];
      const [property] = await db
        .insert(properties)
        .values({
          landlordId: landlord.id,
          address: prop.address,
          postalCode: prop.postalCode,
          city: prop.city,
          unitCount: prop.unitCount,
          verwaltungstyp: prop.verwaltungstyp,
          active: true,
        })
        .returning();

      createdProperties.push({ ...property, unitCount: prop.unitCount });
      console.log(`   ${i + 1}. ${prop.address}, ${prop.postalCode} ${prop.city} — ${prop.unitCount} units`);
    }
    console.log();

    // Create units and tenants
    console.log('🏠 Creating units and tenants...');
    const createdTenants = [];
    const rentRange = { min: 75000, max: 180000 }; // in cents (€750-1,800)

    for (const property of createdProperties) {
      const isHoheluft = property.address.includes('Hoheluft');
      const isRahlstedt = property.address.includes('Rahlstedter');
      
      for (let u = 0; u < property.unitCount; u++) {
        // Hoheluftchaussee 45: First 3 are Wohnungen, 4th is Gewerbe
        const isGewerbe = isHoheluft && u === 3;
        const designation = isGewerbe ? 'Gewerbe' : `Wohnung ${u + 1}`;
        
        // Area based on property type
        let areaM2: string;
        if (isGewerbe) {
          areaM2 = String(randomInt(40, 80));
        } else if (isRahlstedt) {
          areaM2 = String(randomInt(55, 95));
        } else {
          areaM2 = String(randomInt(45, 85));
        }

        // Rent based on area and location
        const baseRent = isGewerbe
          ? randomInt(120000, 200000) // €1,200-2,000 for Gewerbe
          : randomInt(rentRange.min, rentRange.max);

        const [unit] = await db
          .insert(units)
          .values({
            propertyId: property.id,
            designation,
            areaM2,
            floor: isGewerbe ? 0 : randomInt(0, 4),
            rooms: isGewerbe ? '0' : String(randomInt(2, 4)),
            coldRentCents: baseRent,
            occupied: true,
          })
          .returning();

        // Create tenant for this unit (except Gewerbe for now)
        if (!isGewerbe || Math.random() > 0.5) {
          const firstName = FIRST_NAMES[randomInt(0, FIRST_NAMES.length - 1)];
          const lastName = LAST_NAMES[randomInt(0, LAST_NAMES.length - 1)];
          
          const [tenant] = await db
            .insert(tenants)
            .values({
              unitId: unit.id,
              firstName,
              lastName,
              email: generateEmail(firstName, lastName),
              phone: randomPhone(),
              moveInDate: randomMoveInDate(),
              active: true,
            })
            .returning();

          createdTenants.push({
            ...tenant,
            propertyId: property.id,
            unit,
            coldRentCents: baseRent,
          });
        }
      }
    }

    console.log(`   → Created ${createdTenants.length} tenants across ${createdProperties.reduce((a, p) => a + p.unitCount, 0)} units\n`);

    // Create tickets
    console.log('🎫 Creating 8 tickets...');
    const ticketsData = [
      // 2x offen
      {
        title: 'Heizung defekt',
        description: 'Die Heizung im Wohnzimmer wird nicht warm. Bitte um schnelle Hilfe, es ist sehr kalt.',
        category: 'maintenance',
        status: 'open',
        priority: 'high',
        urgency: 4,
      },
      {
        title: 'Wasserschaden im Bad',
        description: 'Wasser sickert hinter den Fliesen im Duschbereich. Vermutlich undichte Fuge.',
        category: 'maintenance',
        status: 'open',
        priority: 'high',
        urgency: 4,
      },
      // 2x in-bearbeitung
      {
        title: 'Fenster klemmt',
        description: 'Das Schlafzimmerfenster lässt sich nur sehr schwer öffnen und schließen.',
        category: 'maintenance',
        status: 'inprogress',
        priority: 'normal',
        urgency: 2,
      },
      {
        title: 'Briefkasten kaputt',
        description: 'Der Briefkasten der Wohnung 3 kann nicht aufgeschlossen werden.',
        category: 'maintenance',
        status: 'inprogress',
        priority: 'normal',
        urgency: 2,
      },
      // 3x erledigt
      {
        title: 'Glühbirne Treppenhaus',
        description: 'Die Glühbirne im 2. OG rechts ist durchgebrannt.',
        category: 'maintenance',
        status: 'resolved',
        priority: 'low',
        urgency: 1,
      },
      {
        title: 'Meldung Lärm',
        description: 'Ständige Lärmbelästigung aus der Wohnung darüber ab 22 Uhr.',
        category: 'complaint',
        status: 'closed',
        priority: 'normal',
        urgency: 2,
      },
      {
        title: 'Schlüssel verloren',
        description: 'Ich habe meinen Wohnungsschlüssel verloren und benötige Ersatz.',
        category: 'other',
        status: 'resolved',
        priority: 'normal',
        urgency: 3,
      },
      // 1x dringend (created 2h ago)
      {
        title: 'Rohrbruch',
        description: '🚨 DRINGEND: Wasserstrahl aus der Wand hinter dem Waschbecken! '
          + 'Hauptwasserhahn ist bereits zugedreht, aber es tropft weiter.',
        category: 'maintenance',
        status: 'open',
        priority: 'urgent',
        urgency: 5,
      },
    ];

    // Distribute tickets across properties
    for (let i = 0; i < ticketsData.length; i++) {
      const tData = ticketsData[i];
      const tenant = createdTenants[randomInt(0, createdTenants.length - 1)];
      
      // Rohrbruch: created 2 hours ago
      const createdAt = tData.title === 'Rohrbruch'
        ? new Date(Date.now() - 2 * 60 * 60 * 1000)
        : new Date(Date.now() - randomInt(1, 14) * 24 * 60 * 60 * 1000);

      const slaDeadline = new Date(createdAt.getTime() + 48 * 60 * 60 * 1000);
      const resolvedAt = ['resolved', 'closed'].includes(tData.status)
        ? new Date(createdAt.getTime() + randomInt(2, 48) * 60 * 60 * 1000)
        : null;

      const [ticket] = await db
        .insert(tickets)
        .values({
          propertyId: tenant.propertyId,
          unitId: tenant.unitId,
          tenantId: tenant.id,
          landlordId: landlord.id,
          ...tData,
          slaDeadline,
          createdAt,
          updatedAt: createdAt,
          resolvedAt,
        })
        .returning();

      console.log(`   ${i + 1}. [${tData.status.toUpperCase()}] ${tData.title} - ${tData.priority}`);
    }

    // Create financial transactions for this month's expected rent
    console.log('\n💶 Creating financial transactions...');
    const now = new Date();
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    
    let totalRevenueCents = 0;
    for (const tenant of createdTenants) {
      const dueDate = new Date(thisMonthStart);
      dueDate.setDate(3); // Rent due on 3rd of month

      // 85% paid, 15% pending/overdue
      const isPaid = Math.random() < 0.85;
      
      const [tx] = await db
        .insert(financialTransactions)
        .values({
          landlordId: landlord.id,
          propertyId: tenant.propertyId,
          unitId: tenant.unitId,
          tenantId: tenant.id,
          type: 'rent_received',
          amountCents: tenant.coldRentCents,
          currency: 'EUR',
          status: isPaid ? 'confirmed' : 'pending',
          description: `Miete ${now.toLocaleString('de-DE', { month: 'long', year: 'numeric' })}`,
          dueDate,
          paidAt: isPaid ? new Date(dueDate.getTime() + randomInt(0, 3) * 24 * 60 * 60 * 1000) : null,
        })
        .returning();

      totalRevenueCents += tenant.coldRentCents;
    }

    console.log(`   → Created ${createdTenants.length} rent transactions`);
    console.log(`   → Expected this month: €${(totalRevenueCents / 100).toLocaleString('de-DE', { minimumFractionDigits: 2 })}`);

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('✅ Demo seed complete!');
    console.log('='.repeat(60));
    console.log(`\nLandlord ID: ${landlord.id}`);
    console.log(`Demo Login: ${landlord.email}`);
    console.log(`\nStats:`);
    console.log(`  • ${createdProperties.length} properties`);
    console.log(`  • ${createdProperties.reduce((a, p) => a + p.unitCount, 0)} total units`);
    console.log(`  • ${createdTenants.length} tenants`);
    console.log(`  • 8 tickets (2 open, 2 in-progress, 3 resolved, 1 urgent)`);
    console.log(`  • ~€${(totalRevenueCents * 0.85 / 100).toLocaleString('de-DE', { minimumFractionDigits: 0 })} rent received this month`);
    console.log(`\n⚡ Use the demo endpoint to verify: GET /api/portal/demo`);
    console.log();

  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  seed();
}

export { seed };
