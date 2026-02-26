// Database Schema for einfach verwaltet.
// Tables: leads, properties, units, tenants, tickets
// Using Neon PostgreSQL + Drizzle ORM

import { pgTable, text, timestamp, integer, boolean, decimal, uuid } from 'drizzle-orm/pg-core';

// Leads from /anfrage quiz
export const leads = pgTable('leads', {
  id: uuid('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at').defaultNow(),
  verwaltungstyp: text('verwaltungstyp'), // miet | weg | beides | unsicher
  einheiten: text('einheiten'),            // 1-3 | 4-10 | 11-30 | 31-100 | 100+
  standort: text('standort'),              // hamburg | hamburg-umland | berlin | andere
  situation: text('situation'),
  prioritaet: text('prioritaet'),
  name: text('name').notNull(),
  email: text('email').notNull(),
  telefon: text('telefon'),
  status: text('status').default('new'),   // new | contacted | qualified | rejected
  notes: text('notes'),
});

// Real estate properties under management
export const properties = pgTable('properties', {
  id: uuid('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at').defaultNow(),
  address: text('address').notNull(),
  postalCode: text('postal_code').notNull(),
  city: text('city').notNull().default('Hamburg'),
  unitCount: integer('unit_count').notNull(),
  verwaltungstyp: text('verwaltungstyp').notNull(), // miet | weg
  ownerName: text('owner_name'),
  ownerEmail: text('owner_email'),
  ownerPhone: text('owner_phone'),
  active: boolean('active').default(true),
});

// Individual units (apartments) within properties
export const units = pgTable('units', {
  id: uuid('id').defaultRandom().primaryKey(),
  propertyId: uuid('property_id').notNull(),
  designation: text('designation').notNull(), // e.g. "WE 1", "EG links"
  areaM2: decimal('area_m2', { precision: 8, scale: 2 }),
  floor: integer('floor'),
  rooms: decimal('rooms', { precision: 4, scale: 1 }),
  coldRentCents: integer('cold_rent_cents'), // store in cents for precision
  occupied: boolean('occupied').default(true),
});

// Tenant records
export const tenants = pgTable('tenants', {
  id: uuid('id').defaultRandom().primaryKey(),
  unitId: uuid('unit_id').notNull(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email'),
  phone: text('phone'),
  moveInDate: timestamp('move_in_date'),
  moveOutDate: timestamp('move_out_date'),
  active: boolean('active').default(true),
});

// Maintenance and service tickets
export const tickets = pgTable('tickets', {
  id: uuid('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  propertyId: uuid('property_id').notNull(),
  unitId: uuid('unit_id'),
  tenantId: uuid('tenant_id'),
  title: text('title').notNull(),
  description: text('description'),
  category: text('category'), // maintenance | billing | complaint | other
  status: text('status').default('open'), // open | inprogress | resolved | closed
  priority: text('priority').default('normal'), // low | normal | high | urgent
  assignee: text('assignee'), // viktor | lukas | external
});
