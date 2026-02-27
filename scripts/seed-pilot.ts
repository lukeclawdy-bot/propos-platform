#!/usr/bin/env tsx
/**
 * Pilot Demo Seed — einfach verwaltet.
 * 
 * Creates a realistic demo client "Thomas Bergmann" with:
 * - 1 property (Altbau, 6 units, Hamburg-Eppendorf)
 * - 6 tenants with varying payment status
 * - Staged ticket events: Handwerker, Mieterbeschwerde, Wasserschaden
 * - Nebenkosten/NKA records for 2025
 * - Mieterversammlung event
 * - Financial transactions incl. overdue rent + Mahnung
 * - AI triage entries and conversation threads
 * 
 * Usage:
 *   DATABASE_URL="..." npx tsx scripts/seed-pilot.ts
 * or:
 *   npm run seed:pilot
 */

import { db } from '@/lib/db';
import {
  landlords,
  properties,
  units,
  tenants,
  tickets,
  financialTransactions,
  nkaRecords,
  aiActions,
} from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

const PILOT_EMAIL = process.env.PILOT_EMAIL || 'pilot@einfach-verwaltet.de';

async function clean() {
  console.log('🧹 Cleaning existing pilot data...');
  const existing = await db.select().from(landlords).where(eq(landlords.email, PILOT_EMAIL));
  if (existing.length > 0) {
    const lid = existing[0].id;
    await db.delete(financialTransactions).where(eq(financialTransactions.landlordId, lid));
    await db.delete(nkaRecords).where(eq(nkaRecords.landlordId, lid));
    await db.delete(aiActions).where(eq(aiActions.landlordId, lid));
    // cascade via landlordId
    const props = await db.select().from(properties).where(eq(properties.landlordId, lid));
    for (const p of props) {
      await db.delete(tickets).where(eq(tickets.propertyId, p.id));
      const us = await db.select().from(units).where(eq(units.propertyId, p.id));
      for (const u of us) {
        await db.delete(tenants).where(eq(tenants.unitId, u.id));
      }
      await db.delete(units).where(eq(units.propertyId, p.id));
    }
    await db.delete(properties).where(eq(properties.landlordId, lid));
    await db.delete(landlords).where(eq(landlords.id, lid));
    console.log('   ✅ Cleaned.');
  }
}

async function seed() {
  await clean();

  // ── LANDLORD ─────────────────────────────────────────────────────────────
  console.log('👤 Creating pilot landlord...');
  const [landlord] = await db.insert(landlords).values({
    email: PILOT_EMAIL,
    name: 'Thomas Bergmann',
    phone: '+49 171 4823901',
    companyName: null,
    type: 'private',
    status: 'active',
    plan: 'starter',
    unitCount: 6,
    onboardingCompleted: true,
    metadata: {
      source: 'pilot',
      note: 'Beta-Pilot 1 — Eppendorf Altbau, 6 Einheiten',
    },
  }).returning();
  console.log(`   ✅ Landlord: ${landlord.name} (${landlord.id})`);

  // ── PROPERTY ─────────────────────────────────────────────────────────────
  console.log('🏠 Creating property...');
  const [property] = await db.insert(properties).values({
    landlordId: landlord.id,
    address: 'Hegestraße 47',
    postalCode: '20249',
    city: 'Hamburg',
    verwaltungstyp: 'miet',
    unitCount: 6,
    description: 'Gründerzeitaltbau, 4 Etagen, Baujahr 1908, zuletzt saniert 2019. Gemeinschaftsgarten, kein Aufzug.',
    metadata: {
      baujahr: 1908,
      heizung: 'Zentralheizung Gas',
      energieausweis: 'Bedarfsausweis, D, gültig bis 2027-03-15',
      wohnflaeche_gesamt: 468,
    },
  }).returning();
  console.log(`   ✅ Property: ${property.address} (${property.id})`);

  // ── UNITS + TENANTS ───────────────────────────────────────────────────────
  console.log('🚪 Creating 6 units + tenants...');

  const unitData = [
    { floor: 'EG links',  sqm: 72,  kaltmiete: 97200,  nebenkosten: 18000, tenant: { name: 'Markus Hoffmann',   email: 'm.hoffmann@gmail.com',    phone: '+49 176 11223344', moveIn: '2019-05-01', paymentStatus: 'ok' } },
    { floor: 'EG rechts', sqm: 68,  kaltmiete: 91800,  nebenkosten: 17000, tenant: { name: 'Sarah Müller',      email: 's.mueller@web.de',         phone: '+49 160 99887766', moveIn: '2021-10-15', paymentStatus: 'overdue' } },
    { floor: '1. OG links',sqm: 78, kaltmiete: 104400, nebenkosten: 19500, tenant: { name: 'Petra Schneider',   email: 'petra.s@gmx.de',           phone: '+49 172 55443322', moveIn: '2018-03-01', paymentStatus: 'ok' } },
    { floor: '1. OG rechts',sqm:74, kaltmiete: 99600,  nebenkosten: 18500, tenant: { name: 'Ahmed Al-Rashid',   email: 'a.alrashid@outlook.com',   phone: '+49 179 88776655', moveIn: '2022-07-01', paymentStatus: 'ok' } },
    { floor: '2. OG links', sqm: 82,kaltmiete: 110400, nebenkosten: 20000, tenant: { name: 'Gabriele Richter',  email: 'g.richter@t-online.de',    phone: '+49 162 44556677', moveIn: '2015-09-01', paymentStatus: 'partial' } },
    { floor: '2. OG rechts',sqm: 76,kaltmiete: 102000, nebenkosten: 19000, tenant: { name: 'Jonas Weber',       email: 'j.weber@gmail.com',        phone: '+49 175 33221100', moveIn: '2023-02-01', paymentStatus: 'ok' } },
  ];

  const createdUnits: { id: string; floor: string; tenantId: string; tenantName: string; kaltmiete: number; paymentStatus: string }[] = [];

  for (const u of unitData) {
    const [unit] = await db.insert(units).values({
      propertyId: property.id,
      landlordId: landlord.id,
      label: u.floor,
      floorArea: u.sqm,
      rent: u.kaltmiete,
      occupied: true,
    }).returning();

    const nameParts = u.tenant.name.split(' ');
    const [tenant] = await db.insert(tenants).values({
      unitId: unit.id,
      firstName: nameParts[0],
      lastName: nameParts.slice(1).join(' '),
      email: u.tenant.email,
      phone: u.tenant.phone,
      moveInDate: new Date(u.tenant.moveIn),
      active: true,
    }).returning();

    createdUnits.push({ id: unit.id, floor: u.floor, tenantId: tenant.id, tenantName: u.tenant.name, kaltmiete: u.kaltmiete, paymentStatus: u.tenant.paymentStatus });
    console.log(`   ✅ ${u.floor} — ${u.tenant.name}`);
  }

  // ── TICKETS — STAGED EVENTS ───────────────────────────────────────────────
  console.log('\n🎫 Creating staged ticket events...');

  const now = new Date();
  const daysAgo = (d: number) => new Date(now.getTime() - d * 86400000);
  const daysAhead = (d: number) => new Date(now.getTime() + d * 86400000);

  // 1. Wasserschaden — URGENT, in progress
  const [ticketWasser] = await db.insert(tickets).values({
    propertyId: property.id,
    landlordId: landlord.id,
    unitId: createdUnits[2].id,
    tenantId: createdUnits[2].tenantId,
    title: 'Wasserschaden im Badezimmer — Rohrbruch',
    description: 'Wasser läuft aus der Wand hinter der Dusche. Der Boden ist bereits durchnässt. Schimmel möglicherweise dahinter. Bitte sofort Handwerker schicken!',
    category: 'maintenance',
    status: 'inprogress',
    priority: 'urgent',
    urgency: 5,
    assignee: 'Viktor (AI)',
    aiTriage: {
      category: 'Wasserschaden',
      urgency: 5,
      summary: 'Rohrbruch hinter Dusche — sofortiger Handwerkertermin erforderlich. Versicherungsmeldung prüfen.',
      suggestedAction: 'Notfall-Sanitär beauftragen, Versicherung informieren, Mieter kontaktieren',
      estimatedCost: '€800–2.400',
      insuranceRelevant: true,
    },
    slaDeadline: daysAgo(1), // SLA bereits überschritten — zeigt Alert
    createdAt: daysAgo(2),
  }).returning();

  // 2. Heizungsausfall — resolved
  await db.insert(tickets).values({
    propertyId: property.id,
    landlordId: landlord.id,
    title: 'Heizung fällt aus — gesamtes Haus kalt',
    description: 'Seit heute Morgen 06:00 Uhr keine Heizung mehr im gesamten Gebäude. Außentemperatur -2°C.',
    category: 'maintenance',
    status: 'resolved',
    priority: 'high',
    urgency: 4,
    assignee: 'Viktor (AI)',
    aiTriage: {
      category: 'Heizungsausfall',
      urgency: 4,
      summary: 'Zentralheizung ausgefallen. Notdienst beauftragt, Therme gewartet.',
      resolvedBy: 'Heizungsnotdienst Hamburg-Nord, Brennersteuerung getauscht',
      cost: '€340',
    },
    resolvedAt: daysAgo(8),
    createdAt: daysAgo(10),
    rating: 5,
  }).returning();

  // 3. Mieterbeschwerde — Lärmbelästigung
  const [ticketLaerm] = await db.insert(tickets).values({
    propertyId: property.id,
    landlordId: landlord.id,
    unitId: createdUnits[3].id,
    tenantId: createdUnits[3].tenantId,
    title: 'Lärmbelästigung durch Nachbarn (EG links)',
    description: 'Herr Hoffmann im EG links spielt regelmäßig bis 23:30 Uhr laute Musik. Mehrfache persönliche Ansprache hat nichts gebracht.',
    category: 'complaint',
    status: 'inprogress',
    priority: 'normal',
    urgency: 2,
    assignee: 'Viktor (AI)',
    aiTriage: {
      category: 'Lärmbelästigung',
      urgency: 2,
      summary: 'Wiederholte Ruhestörung durch Mieter EG links. Formelle Abmahnung empfohlen nach §541 BGB.',
      suggestedAction: 'Abmahnung Hoffmann, Protokoll führen, bei Wiederholung fristlose Kündigung prüfen',
      legalReference: '§541 BGB, §569 BGB',
    },
    createdAt: daysAgo(5),
  }).returning();

  // 4. NKA Frage — Mieter fragt nach Abrechnung
  await db.insert(tickets).values({
    propertyId: property.id,
    landlordId: landlord.id,
    unitId: createdUnits[4].id,
    tenantId: createdUnits[4].tenantId,
    title: 'Frage zur Nebenkostenabrechnung 2024',
    description: 'Ich habe die NKA 2024 erhalten und verstehe den Posten "Allgemeinstrom" nicht. Können Sie mir das erklären?',
    category: 'billing',
    status: 'open',
    priority: 'low',
    urgency: 1,
    aiTriage: {
      category: 'NKA-Anfrage',
      urgency: 1,
      summary: 'Mieter Richter fragt nach Allgemeinstrom-Posten. Standard-Erklärung ausreichend.',
      suggestedAction: 'Standardantwort mit §2 Nr. 11 BetrKV Erklärung senden',
    },
    createdAt: daysAgo(1),
  }).returning();

  // 5. Handwerker — Türschloss defekt, closed
  await db.insert(tickets).values({
    propertyId: property.id,
    landlordId: landlord.id,
    unitId: createdUnits[5].id,
    tenantId: createdUnits[5].tenantId,
    title: 'Haustürschloss klemmt — Schlüssel dreht nicht durch',
    description: 'Das Schloss der Haustür lässt sich nur schwer aufschließen. Bei Kälte ist es besonders schlimm.',
    category: 'maintenance',
    status: 'resolved',
    priority: 'normal',
    urgency: 2,
    aiTriage: {
      category: 'Schloss/Tür',
      urgency: 2,
      summary: 'Schlosszylinder verschlissen. Schlüsseldienst beauftragt.',
      cost: '€185',
    },
    resolvedAt: daysAgo(3),
    createdAt: daysAgo(7),
    rating: 4,
  }).returning();

  // 6. Mieterversammlung — upcoming
  await db.insert(tickets).values({
    propertyId: property.id,
    landlordId: landlord.id,
    title: 'Mieterversammlung — Modernisierungsankündigung §555b BGB',
    description: 'Ankündigung der geplanten energetischen Sanierung (Fassadendämmung + neue Fenster). Mieterversammlung zur Erläuterung der Maßnahmen und Mieterhöhungsprüfung.',
    category: 'other',
    status: 'open',
    priority: 'normal',
    urgency: 2,
    aiTriage: {
      category: 'Mieterversammlung',
      urgency: 2,
      summary: 'Modernisierungsankündigung gemäß §555b BGB. Einladungen an alle 6 Mieter versenden. Protokoll vorbereiten.',
      suggestedAction: 'Einladung mit 3 Monaten Vorlauf (§555c BGB), Versammlungsprotokoll vorbereiten',
      plannedDate: daysAhead(21).toISOString(),
      legalReference: '§555b BGB, §555c BGB',
    },
    createdAt: daysAgo(0),
  }).returning();

  console.log('   ✅ 6 tickets created (Wasserschaden, Heizung, Lärmbeschwerde, NKA-Frage, Schloss, Mieterversammlung)');

  // ── FINANCIAL TRANSACTIONS ────────────────────────────────────────────────
  console.log('\n💶 Creating financial transactions...');

  const txns = [];

  // Monthly rents — Feb 2026
  for (const u of createdUnits) {
    if (u.paymentStatus === 'ok') {
      txns.push({
        landlordId: landlord.id,
        propertyId: property.id,
        unitId: u.id,
        tenantId: u.tenantId,
        type: 'rent_received' as const,
        amountCents: u.kaltmiete,
        status: 'confirmed' as const,
        description: `Mietzahlung Februar 2026 — ${u.floor}`,
        dueDate: new Date('2026-02-03'),
        paidAt: new Date('2026-02-03'),
      });
    } else if (u.paymentStatus === 'overdue') {
      // Sarah Müller — overdue, Mahnung sent
      txns.push({
        landlordId: landlord.id,
        propertyId: property.id,
        unitId: u.id,
        tenantId: u.tenantId,
        type: 'rent_received' as const,
        amountCents: u.kaltmiete,
        status: 'pending' as const,
        description: `Mietzahlung Februar 2026 — ${u.floor} — ÜBERFÄLLIG`,
        dueDate: new Date('2026-02-03'),
        paidAt: null,
        metadata: { mahnungSent: true, mahnungDate: daysAgo(5).toISOString(), mahnungLevel: 1 },
      });
      txns.push({
        landlordId: landlord.id,
        propertyId: property.id,
        unitId: u.id,
        tenantId: u.tenantId,
        type: 'mahnung' as const,
        amountCents: 1000, // €10 Mahngebühr
        status: 'confirmed' as const,
        description: `Mahngebühr 1. Mahnung — ${u.floor}`,
        dueDate: daysAgo(5),
        paidAt: null,
      });
    } else if (u.paymentStatus === 'partial') {
      // Gabriele Richter — paid partial
      txns.push({
        landlordId: landlord.id,
        propertyId: property.id,
        unitId: u.id,
        tenantId: u.tenantId,
        type: 'rent_received' as const,
        amountCents: Math.round(u.kaltmiete * 0.5),
        status: 'confirmed' as const,
        description: `Teilzahlung Miete Februar 2026 — ${u.floor} (50%)`,
        dueDate: new Date('2026-02-03'),
        paidAt: new Date('2026-02-07'),
      });
    }
  }

  // Expenses — Heizungsreparatur
  txns.push({
    landlordId: landlord.id,
    propertyId: property.id,
    unitId: null,
    tenantId: null,
    type: 'expense' as const,
    amountCents: -34000,
    status: 'confirmed' as const,
    bkvCategory: 'heizung',
    description: 'Heizungsnotdienst — Brennersteuerung getauscht',
    dueDate: daysAgo(8),
    paidAt: daysAgo(8),
    metadata: { vendor: 'Heizungsnotdienst Hamburg-Nord', invoice: 'RE-2026-0089' },
  });

  // Expenses — Schloss
  txns.push({
    landlordId: landlord.id,
    propertyId: property.id,
    unitId: null,
    tenantId: null,
    type: 'expense' as const,
    amountCents: -18500,
    status: 'confirmed' as const,
    bkvCategory: 'sonstige',
    description: 'Schlüsseldienst — Schlosszylinder Haustür',
    dueDate: daysAgo(3),
    paidAt: daysAgo(3),
    metadata: { vendor: 'Schlüsseldienst Eimsbüttel', invoice: 'RE-2026-0102' },
  });

  // Hausverwaltungsgebühr — einfach verwaltet.
  txns.push({
    landlordId: landlord.id,
    propertyId: property.id,
    type: 'expense' as const,
    amountCents: -102000, // €17/unit × 6 × 100 = beta pricing
    status: 'confirmed' as const,
    description: 'Hausverwaltungsgebühr März 2026 — einfach verwaltet. (6 Einheiten × €17)',
    dueDate: new Date('2026-03-01'),
    paidAt: new Date('2026-03-01'),
    metadata: { plan: 'beta', unitCount: 6, pricePerUnit: 1700 },
  });

  await db.insert(financialTransactions).values(txns as any[]);
  console.log(`   ✅ ${txns.length} transactions (Miete, Mahnung, Ausgaben, HV-Gebühr)`);

  // ── NKA RECORD ────────────────────────────────────────────────────────────
  console.log('\n📋 Creating NKA record for 2025...');
  await db.insert(nkaRecords).values({
    landlordId: landlord.id,
    propertyId: property.id,
    abrechnungsjahr: 2025,
    status: 'draft',
    totalCosts: {
      heizkosten: 486000,
      wasser: 198000,
      allgemeinstrom: 84000,
      versicherung: 216000,
      hausmeister: 144000,
      muellabfuhr: 96000,
      strassenreinigung: 60000,
    },
  });
  console.log('   ✅ NKA 2025 draft created');

  // ── AI ACTION LOG ─────────────────────────────────────────────────────────
  console.log('\n🤖 Creating AI action log...');
  await db.insert(aiActions).values([
    {
      landlordId: landlord.id,
      propertyId: property.id,
      type: 'ticket',
      urgency: 5,
      title: '🚨 Wasserschaden — Notfall-Sanitär beauftragen',
      body: 'Rohrbruch hinter Dusche in 1. OG links. SLA überschritten. Versicherung informieren.',
      actionLabel: 'Handwerker beauftragen',
      status: 'pending',
      metadata: { ticketId: ticketWasser.id, model: 'gemini-2.5-flash' },
    },
    {
      landlordId: landlord.id,
      propertyId: property.id,
      type: 'mahnung',
      urgency: 3,
      title: 'Miete überfällig — Sarah Müller (EG rechts)',
      body: '1. Mahnung versendet am ' + daysAgo(5).toLocaleDateString('de-DE') + '. Keine Zahlung eingegangen. 2. Mahnung prüfen.',
      actionLabel: '2. Mahnung senden',
      status: 'pending',
      metadata: { tenantName: 'Sarah Müller', mahnungLevel: 1 },
    },
    {
      landlordId: landlord.id,
      propertyId: property.id,
      type: 'ticket',
      urgency: 2,
      title: 'Abmahnung Lärmbelästigung — Markus Hoffmann',
      body: 'Formelle Abmahnung nach §541 BGB wurde vorbereitet. Versand ausstehend.',
      actionLabel: 'Abmahnung absenden',
      status: 'pending',
      metadata: { ticketId: ticketLaerm.id },
    },
  ]);
  console.log('   ✅ 3 AI action log entries');

  // ── SUMMARY ───────────────────────────────────────────────────────────────
  console.log('\n' + '='.repeat(60));
  console.log('✅ PILOT SEED COMPLETE');
  console.log('='.repeat(60));
  console.log(`\nLandlord:     ${landlord.name}`);
  console.log(`Login email:  ${PILOT_EMAIL}`);
  console.log(`Property:     Hegestraße 47, 20249 Hamburg`);
  console.log(`Units:        6`);
  console.log(`\nDemo scenarios ready:`);
  console.log('  🚨 Wasserschaden (urgent, SLA überschritten) → /portal/tickets');
  console.log('  💬 Lärmbeschwerde (in progress) → /portal/chat');
  console.log('  💶 Überfällige Miete + Mahnung → /portal/miete');
  console.log('  📋 NKA 2025 Draft → /portal/nka');
  console.log('  📅 Mieterversammlung geplant → /portal/tickets');
  console.log('  💰 Finanztransaktionen → /portal/finanzen');
  console.log(`\nTo login: go to /portal/login → enter ${PILOT_EMAIL}`);
}

seed().catch(console.error).finally(() => process.exit(0));
