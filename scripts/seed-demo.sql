-- =============================================================
-- einfach verwaltet. — Demo Seed Data (SQL version)
-- Use this to import directly into Neon via psql or Neon console
-- 
-- Usage (psql):
--   psql "$DATABASE_URL" -f scripts/seed-demo.sql
--
-- Generated for: demo@einfach-verwaltet.de / Lukas Schmitz
-- Hamburg demo properties, 12 tenants, 8 tickets
-- =============================================================

-- Cleanup old demo data if exists
DO $$
DECLARE
  v_landlord_id UUID;
BEGIN
  SELECT id INTO v_landlord_id FROM landlords WHERE email = 'demo@einfach-verwaltet.de';
  IF v_landlord_id IS NOT NULL THEN
    DELETE FROM financial_transactions WHERE landlord_id = v_landlord_id;
    DELETE FROM tickets WHERE landlord_id = v_landlord_id;
    DELETE FROM tenants WHERE unit_id IN (
      SELECT u.id FROM units u
      JOIN properties p ON u.property_id = p.id
      WHERE p.landlord_id = v_landlord_id
    );
    DELETE FROM units WHERE property_id IN (
      SELECT id FROM properties WHERE landlord_id = v_landlord_id
    );
    DELETE FROM properties WHERE landlord_id = v_landlord_id;
    DELETE FROM landlords WHERE id = v_landlord_id;
    RAISE NOTICE 'Cleaned up old demo data for landlord %', v_landlord_id;
  END IF;
END $$;

-- =============================================================
-- LANDLORD
-- =============================================================
INSERT INTO landlords (id, email, name, phone, company_name, type, communication_channel, ai_autonomy_level, onboarding_completed, created_at, updated_at)
VALUES (
  'a1b2c3d4-0000-0000-0000-000000000001',
  'demo@einfach-verwaltet.de',
  'Lukas Schmitz',
  '0176-12345678',
  'Demo Verwaltung GmbH',
  'professional',
  'portal',
  'supervised',
  true,
  NOW(),
  NOW()
);

-- =============================================================
-- PROPERTIES (5 Hamburg properties)
-- =============================================================

-- 1. Wandsbeker Chaussee 34 — 6 Wohnungen, Altbau
INSERT INTO properties (id, landlord_id, address, postal_code, city, unit_count, verwaltungstyp, active, created_at)
VALUES ('b1000000-0000-0000-0000-000000000001', 'a1b2c3d4-0000-0000-0000-000000000001',
        'Wandsbeker Chaussee 34', '22089', 'Hamburg', 6, 'miet', true, NOW());

-- 2. Eppendorfer Weg 112 — 4 Wohnungen, Neubau
INSERT INTO properties (id, landlord_id, address, postal_code, city, unit_count, verwaltungstyp, active, created_at)
VALUES ('b2000000-0000-0000-0000-000000000002', 'a1b2c3d4-0000-0000-0000-000000000001',
        'Eppendorfer Weg 112', '20259', 'Hamburg', 4, 'miet', true, NOW());

-- 3. Bergedorfer Straße 88 — 8 Wohnungen
INSERT INTO properties (id, landlord_id, address, postal_code, city, unit_count, verwaltungstyp, active, created_at)
VALUES ('b3000000-0000-0000-0000-000000000003', 'a1b2c3d4-0000-0000-0000-000000000001',
        'Bergedorfer Straße 88', '21029', 'Hamburg-Bergedorf', 8, 'miet', true, NOW());

-- 4. Hoheluftchaussee 45 — 3 Wohnungen + 1 Gewerbe
INSERT INTO properties (id, landlord_id, address, postal_code, city, unit_count, verwaltungstyp, active, created_at)
VALUES ('b4000000-0000-0000-0000-000000000004', 'a1b2c3d4-0000-0000-0000-000000000001',
        'Hoheluftchaussee 45', '20253', 'Hamburg', 4, 'miet', true, NOW());

-- 5. Rahlstedter Str. 92 — 12 Wohnungen, Großanlage
INSERT INTO properties (id, landlord_id, address, postal_code, city, unit_count, verwaltungstyp, active, created_at)
VALUES ('b5000000-0000-0000-0000-000000000005', 'a1b2c3d4-0000-0000-0000-000000000001',
        'Rahlstedter Str. 92', '22143', 'Hamburg', 12, 'miet', true, NOW());

-- =============================================================
-- UNITS — Wandsbeker Chaussee 34 (6 Wohnungen)
-- =============================================================
INSERT INTO units (id, property_id, designation, area_m2, floor, rooms, cold_rent_cents, occupied) VALUES
  ('c1010000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001', 'Wohnung 1', 62, 0, 2, 89000, true),
  ('c1020000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000001', 'Wohnung 2', 75, 1, 3, 107500, true),
  ('c1030000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000001', 'Wohnung 3', 58, 1, 2, 85000, true),
  ('c1040000-0000-0000-0000-000000000004', 'b1000000-0000-0000-0000-000000000001', 'Wohnung 4', 78, 2, 3, 112000, true),
  ('c1050000-0000-0000-0000-000000000005', 'b1000000-0000-0000-0000-000000000001', 'Wohnung 5', 55, 2, 2, 80000, true),
  ('c1060000-0000-0000-0000-000000000006', 'b1000000-0000-0000-0000-000000000001', 'Wohnung 6', 82, 3, 3, 118000, true);

-- UNITS — Eppendorfer Weg 112 (4 Wohnungen, Neubau)
INSERT INTO units (id, property_id, designation, area_m2, floor, rooms, cold_rent_cents, occupied) VALUES
  ('c2010000-0000-0000-0000-000000000001', 'b2000000-0000-0000-0000-000000000002', 'Wohnung 1', 68, 0, 2, 122000, true),
  ('c2020000-0000-0000-0000-000000000002', 'b2000000-0000-0000-0000-000000000002', 'Wohnung 2', 85, 1, 3, 153000, true),
  ('c2030000-0000-0000-0000-000000000003', 'b2000000-0000-0000-0000-000000000002', 'Wohnung 3', 72, 2, 3, 130000, true),
  ('c2040000-0000-0000-0000-000000000004', 'b2000000-0000-0000-0000-000000000002', 'Wohnung 4', 95, 3, 4, 171000, true);

-- UNITS — Bergedorfer Straße 88 (8 Wohnungen)
INSERT INTO units (id, property_id, designation, area_m2, floor, rooms, cold_rent_cents, occupied) VALUES
  ('c3010000-0000-0000-0000-000000000001', 'b3000000-0000-0000-0000-000000000003', 'Wohnung 1', 52, 0, 2, 75000, true),
  ('c3020000-0000-0000-0000-000000000002', 'b3000000-0000-0000-0000-000000000003', 'Wohnung 2', 65, 0, 2, 93000, true),
  ('c3030000-0000-0000-0000-000000000003', 'b3000000-0000-0000-0000-000000000003', 'Wohnung 3', 70, 1, 3, 100000, true),
  ('c3040000-0000-0000-0000-000000000004', 'b3000000-0000-0000-0000-000000000003', 'Wohnung 4', 60, 1, 2, 86000, true),
  ('c3050000-0000-0000-0000-000000000005', 'b3000000-0000-0000-0000-000000000003', 'Wohnung 5', 78, 2, 3, 112000, true),
  ('c3060000-0000-0000-0000-000000000006', 'b3000000-0000-0000-0000-000000000003', 'Wohnung 6', 55, 2, 2, 79000, true),
  ('c3070000-0000-0000-0000-000000000007', 'b3000000-0000-0000-0000-000000000003', 'Wohnung 7', 80, 3, 3, 115000, true),
  ('c3080000-0000-0000-0000-000000000008', 'b3000000-0000-0000-0000-000000000003', 'Wohnung 8', 64, 3, 2, 92000, true);

-- UNITS — Hoheluftchaussee 45 (3 Wohnungen + 1 Gewerbe)
INSERT INTO units (id, property_id, designation, area_m2, floor, rooms, cold_rent_cents, occupied) VALUES
  ('c4010000-0000-0000-0000-000000000001', 'b4000000-0000-0000-0000-000000000004', 'Wohnung 1', 70, 1, 3, 126000, true),
  ('c4020000-0000-0000-0000-000000000002', 'b4000000-0000-0000-0000-000000000004', 'Wohnung 2', 85, 2, 3, 153000, true),
  ('c4030000-0000-0000-0000-000000000003', 'b4000000-0000-0000-0000-000000000004', 'Wohnung 3', 90, 3, 4, 162000, true),
  ('c4040000-0000-0000-0000-000000000004', 'b4000000-0000-0000-0000-000000000004', 'Gewerbe', 60, 0, 0, 165000, true);

-- UNITS — Rahlstedter Str. 92 (12 Wohnungen, Großanlage)
INSERT INTO units (id, property_id, designation, area_m2, floor, rooms, cold_rent_cents, occupied) VALUES
  ('c5010000-0000-0000-0000-000000000001', 'b5000000-0000-0000-0000-000000000005', 'Wohnung 1',  58, 0, 2,  83000, true),
  ('c5020000-0000-0000-0000-000000000002', 'b5000000-0000-0000-0000-000000000005', 'Wohnung 2',  72, 0, 3, 103000, true),
  ('c5030000-0000-0000-0000-000000000003', 'b5000000-0000-0000-0000-000000000005', 'Wohnung 3',  60, 1, 2,  86000, true),
  ('c5040000-0000-0000-0000-000000000004', 'b5000000-0000-0000-0000-000000000005', 'Wohnung 4',  75, 1, 3, 107000, true),
  ('c5050000-0000-0000-0000-000000000005', 'b5000000-0000-0000-0000-000000000005', 'Wohnung 5',  65, 2, 2,  93000, true),
  ('c5060000-0000-0000-0000-000000000006', 'b5000000-0000-0000-0000-000000000005', 'Wohnung 6',  80, 2, 3, 114000, true),
  ('c5070000-0000-0000-0000-000000000007', 'b5000000-0000-0000-0000-000000000005', 'Wohnung 7',  55, 3, 2,  79000, true),
  ('c5080000-0000-0000-0000-000000000008', 'b5000000-0000-0000-0000-000000000005', 'Wohnung 8',  70, 3, 3, 100000, true),
  ('c5090000-0000-0000-0000-000000000009', 'b5000000-0000-0000-0000-000000000005', 'Wohnung 9',  62, 4, 2,  89000, true),
  ('c5100000-0000-0000-0000-000000000010', 'b5000000-0000-0000-0000-000000000005', 'Wohnung 10', 78, 4, 3, 111000, true),
  ('c5110000-0000-0000-0000-000000000011', 'b5000000-0000-0000-0000-000000000005', 'Wohnung 11', 85, 5, 3, 121000, true),
  ('c5120000-0000-0000-0000-000000000012', 'b5000000-0000-0000-0000-000000000005', 'Wohnung 12', 92, 5, 4, 131000, true);

-- =============================================================
-- TENANTS (12 realistic Hamburg tenants, distributed)
-- =============================================================
INSERT INTO tenants (id, unit_id, first_name, last_name, email, phone, move_in_date, active) VALUES
  -- Wandsbeker Chaussee 34
  ('d1010000-0000-0000-0000-000000000001', 'c1010000-0000-0000-0000-000000000001', 'Anna',      'Müller',      'anna.mueller@example.de',      '0170-4523781', '2023-03-01', true),
  ('d1020000-0000-0000-0000-000000000002', 'c1020000-0000-0000-0000-000000000002', 'Benjamin',  'Schmidt',     'benjamin.schmidt@example.de',   '0151-7892134', '2022-07-01', true),
  -- Eppendorfer Weg 112
  ('d2010000-0000-0000-0000-000000000003', 'c2020000-0000-0000-0000-000000000002', 'Clara',     'Weber',       'clara.weber@example.de',        '0172-3341092', '2024-01-01', true),
  ('d2020000-0000-0000-0000-000000000004', 'c2040000-0000-0000-0000-000000000004', 'David',     'Fischer',     'david.fischer@example.de',      '0162-8812005', '2023-11-01', true),
  -- Bergedorfer Straße 88
  ('d3010000-0000-0000-0000-000000000005', 'c3010000-0000-0000-0000-000000000001', 'Emma',      'Hoffmann',    'emma.hoffmann@example.de',      '0160-5573209', '2021-09-01', true),
  ('d3020000-0000-0000-0000-000000000006', 'c3030000-0000-0000-0000-000000000003', 'Felix',     'Koch',        'felix.koch@example.de',         '0152-2294871', '2022-04-01', true),
  ('d3030000-0000-0000-0000-000000000007', 'c3050000-0000-0000-0000-000000000005', 'Greta',     'Bauer',       'greta.bauer@example.de',        '0173-6671234', '2024-06-01', true),
  -- Hoheluftchaussee 45
  ('d4010000-0000-0000-0000-000000000008', 'c4010000-0000-0000-0000-000000000001', 'Hans',      'Richter',     'hans.richter@example.de',       '0171-1234560', '2020-12-01', true),
  ('d4020000-0000-0000-0000-000000000009', 'c4030000-0000-0000-0000-000000000003', 'Ina',       'Schröder',    'ina.schroeder@example.de',      '0163-9988712', '2023-02-01', true),
  -- Rahlstedter Str. 92
  ('d5010000-0000-0000-0000-000000000010', 'c5020000-0000-0000-0000-000000000002', 'Jakob',     'Neumann',     'jakob.neumann@example.de',      '0151-3345678', '2022-08-01', true),
  ('d5020000-0000-0000-0000-000000000011', 'c5060000-0000-0000-0000-000000000006', 'Klara',     'Zimmermann',  'klara.zimmermann@example.de',   '0172-8890123', '2023-05-01', true),
  ('d5030000-0000-0000-0000-000000000012', 'c5110000-0000-0000-0000-000000000011', 'Lukas',     'Braun',       'lukas.braun2@example.de',       '0170-7701234', '2024-09-01', true);

-- =============================================================
-- TICKETS (8 tickets, mix of statuses)
-- =============================================================

-- 2x offen
INSERT INTO tickets (id, property_id, unit_id, tenant_id, landlord_id, title, description, category, status, priority, urgency, sla_deadline, created_at, updated_at)
VALUES (
  'e1000000-0000-0000-0000-000000000001',
  'b1000000-0000-0000-0000-000000000001',
  'c1020000-0000-0000-0000-000000000002',
  'd1020000-0000-0000-0000-000000000002',
  'a1b2c3d4-0000-0000-0000-000000000001',
  'Heizung defekt',
  'Die Heizung im Wohnzimmer wird nicht warm. Heizkörper bleibt kalt. Bitte um schnelle Hilfe — es ist sehr kalt!',
  'maintenance', 'open', 'high', 4,
  NOW() + INTERVAL '48 hours',
  NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days'
);

INSERT INTO tickets (id, property_id, unit_id, tenant_id, landlord_id, title, description, category, status, priority, urgency, sla_deadline, created_at, updated_at)
VALUES (
  'e2000000-0000-0000-0000-000000000002',
  'b3000000-0000-0000-0000-000000000003',
  'c3030000-0000-0000-0000-000000000003',
  'd3020000-0000-0000-0000-000000000006',
  'a1b2c3d4-0000-0000-0000-000000000001',
  'Wasserschaden im Bad',
  'Wasser sickert hinter den Fliesen im Duschbereich durch. Vermutlich undichte Fuge. Fleck an der Wand wird größer.',
  'maintenance', 'open', 'high', 4,
  NOW() + INTERVAL '24 hours',
  NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day'
);

-- 2x in-bearbeitung
INSERT INTO tickets (id, property_id, unit_id, tenant_id, landlord_id, title, description, category, status, priority, urgency, sla_deadline, created_at, updated_at)
VALUES (
  'e3000000-0000-0000-0000-000000000003',
  'b2000000-0000-0000-0000-000000000002',
  'c2020000-0000-0000-0000-000000000002',
  'd2010000-0000-0000-0000-000000000003',
  'a1b2c3d4-0000-0000-0000-000000000001',
  'Fenster klemmt',
  'Das Schlafzimmerfenster im hinteren Zimmer lässt sich nur sehr schwer öffnen und schließen. Handwerker wurde bereits beauftragt.',
  'maintenance', 'inprogress', 'normal', 2,
  NOW() + INTERVAL '36 hours',
  NOW() - INTERVAL '5 days', NOW() - INTERVAL '2 days'
);

INSERT INTO tickets (id, property_id, unit_id, tenant_id, landlord_id, title, description, category, status, priority, urgency, sla_deadline, created_at, updated_at)
VALUES (
  'e4000000-0000-0000-0000-000000000004',
  'b1000000-0000-0000-0000-000000000001',
  'c1010000-0000-0000-0000-000000000001',
  'd1010000-0000-0000-0000-000000000001',
  'a1b2c3d4-0000-0000-0000-000000000001',
  'Briefkasten kaputt',
  'Der Briefkasten kann nicht mehr aufgeschlossen werden. Schloss ist verklemmt. Hausschlüssel passt nicht mehr.',
  'maintenance', 'inprogress', 'normal', 2,
  NOW() + INTERVAL '48 hours',
  NOW() - INTERVAL '7 days', NOW() - INTERVAL '4 days'
);

-- 3x erledigt / geschlossen
INSERT INTO tickets (id, property_id, unit_id, tenant_id, landlord_id, title, description, category, status, priority, urgency, sla_deadline, resolved_at, created_at, updated_at)
VALUES (
  'e5000000-0000-0000-0000-000000000005',
  'b5000000-0000-0000-0000-000000000005',
  'c5060000-0000-0000-0000-000000000006',
  'd5020000-0000-0000-0000-000000000011',
  'a1b2c3d4-0000-0000-0000-000000000001',
  'Glühbirne Treppenhaus',
  'Die Deckenbeleuchtung im 2. OG rechts (Treppenhaus) ist ausgefallen. Glühbirne durchgebrannt.',
  'maintenance', 'resolved', 'low', 1,
  NOW() - INTERVAL '10 days',
  NOW() - INTERVAL '8 days',
  NOW() - INTERVAL '14 days', NOW() - INTERVAL '8 days'
);

INSERT INTO tickets (id, property_id, unit_id, tenant_id, landlord_id, title, description, category, status, priority, urgency, sla_deadline, resolved_at, created_at, updated_at)
VALUES (
  'e6000000-0000-0000-0000-000000000006',
  'b4000000-0000-0000-0000-000000000004',
  'c4010000-0000-0000-0000-000000000001',
  'd4010000-0000-0000-0000-000000000008',
  'a1b2c3d4-0000-0000-0000-000000000001',
  'Meldung Lärm',
  'Ständige Lärmbelästigung aus der Wohnung im Obergeschoss ab 22 Uhr. Musik und laute Gespräche. Wurde mehrfach gemeldet.',
  'complaint', 'closed', 'normal', 2,
  NOW() - INTERVAL '6 days',
  NOW() - INTERVAL '5 days',
  NOW() - INTERVAL '10 days', NOW() - INTERVAL '5 days'
);

INSERT INTO tickets (id, property_id, unit_id, tenant_id, landlord_id, title, description, category, status, priority, urgency, sla_deadline, resolved_at, created_at, updated_at)
VALUES (
  'e7000000-0000-0000-0000-000000000007',
  'b3000000-0000-0000-0000-000000000003',
  'c3010000-0000-0000-0000-000000000001',
  'd3010000-0000-0000-0000-000000000005',
  'a1b2c3d4-0000-0000-0000-000000000001',
  'Schlüssel verloren',
  'Habe meinen Wohnungsschlüssel verloren und benötige einen Ersatzschlüssel. Bitte um Rückmeldung.',
  'other', 'resolved', 'normal', 3,
  NOW() - INTERVAL '18 days',
  NOW() - INTERVAL '17 days',
  NOW() - INTERVAL '20 days', NOW() - INTERVAL '17 days'
);

-- 1x dringend — Rohrbruch (created 2 hours ago)
INSERT INTO tickets (id, property_id, unit_id, tenant_id, landlord_id, title, description, category, status, priority, urgency, sla_deadline, created_at, updated_at)
VALUES (
  'e8000000-0000-0000-0000-000000000008',
  'b5000000-0000-0000-0000-000000000005',
  'c5110000-0000-0000-0000-000000000011',
  'd5030000-0000-0000-0000-000000000012',
  'a1b2c3d4-0000-0000-0000-000000000001',
  'Rohrbruch',
  '🚨 DRINGEND: Wasserstrahl aus der Wand hinter dem Waschbecken! Hauptwasserhahn ist bereits zugedreht, aber es tropft weiter stark. Sofortiger Notfalleinsatz erforderlich!',
  'maintenance', 'open', 'urgent', 5,
  NOW() + INTERVAL '4 hours',
  NOW() - INTERVAL '2 hours', NOW() - INTERVAL '2 hours'
);

-- =============================================================
-- FINANCIAL TRANSACTIONS (this month's rent)
-- =============================================================

-- Wandsbeker Chaussee 34 tenants
INSERT INTO financial_transactions (landlord_id, property_id, unit_id, tenant_id, type, amount_cents, currency, status, description, due_date, paid_at, created_at)
VALUES
  ('a1b2c3d4-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001', 'c1010000-0000-0000-0000-000000000001', 'd1010000-0000-0000-0000-000000000001',
   'rent_received', 89000, 'EUR', 'confirmed', 'Miete Februar 2026', DATE_TRUNC('month', NOW()) + INTERVAL '3 days', DATE_TRUNC('month', NOW()) + INTERVAL '2 days', NOW()),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001', 'c1020000-0000-0000-0000-000000000002', 'd1020000-0000-0000-0000-000000000002',
   'rent_received', 107500, 'EUR', 'confirmed', 'Miete Februar 2026', DATE_TRUNC('month', NOW()) + INTERVAL '3 days', DATE_TRUNC('month', NOW()) + INTERVAL '3 days', NOW());

-- Eppendorfer Weg 112 tenants
INSERT INTO financial_transactions (landlord_id, property_id, unit_id, tenant_id, type, amount_cents, currency, status, description, due_date, paid_at, created_at)
VALUES
  ('a1b2c3d4-0000-0000-0000-000000000001', 'b2000000-0000-0000-0000-000000000002', 'c2020000-0000-0000-0000-000000000002', 'd2010000-0000-0000-0000-000000000003',
   'rent_received', 153000, 'EUR', 'confirmed', 'Miete Februar 2026', DATE_TRUNC('month', NOW()) + INTERVAL '3 days', DATE_TRUNC('month', NOW()) + INTERVAL '1 days', NOW()),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'b2000000-0000-0000-0000-000000000002', 'c2040000-0000-0000-0000-000000000004', 'd2020000-0000-0000-0000-000000000004',
   'rent_received', 171000, 'EUR', 'pending', 'Miete Februar 2026', DATE_TRUNC('month', NOW()) + INTERVAL '3 days', NULL, NOW());

-- Bergedorfer Straße 88 tenants
INSERT INTO financial_transactions (landlord_id, property_id, unit_id, tenant_id, type, amount_cents, currency, status, description, due_date, paid_at, created_at)
VALUES
  ('a1b2c3d4-0000-0000-0000-000000000001', 'b3000000-0000-0000-0000-000000000003', 'c3010000-0000-0000-0000-000000000001', 'd3010000-0000-0000-0000-000000000005',
   'rent_received', 75000, 'EUR', 'confirmed', 'Miete Februar 2026', DATE_TRUNC('month', NOW()) + INTERVAL '3 days', DATE_TRUNC('month', NOW()) + INTERVAL '2 days', NOW()),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'b3000000-0000-0000-0000-000000000003', 'c3030000-0000-0000-0000-000000000003', 'd3020000-0000-0000-0000-000000000006',
   'rent_received', 100000, 'EUR', 'confirmed', 'Miete Februar 2026', DATE_TRUNC('month', NOW()) + INTERVAL '3 days', DATE_TRUNC('month', NOW()) + INTERVAL '3 days', NOW()),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'b3000000-0000-0000-0000-000000000003', 'c3050000-0000-0000-0000-000000000005', 'd3030000-0000-0000-0000-000000000007',
   'rent_received', 112000, 'EUR', 'pending', 'Miete Februar 2026', DATE_TRUNC('month', NOW()) + INTERVAL '3 days', NULL, NOW());

-- Hoheluftchaussee 45 tenants
INSERT INTO financial_transactions (landlord_id, property_id, unit_id, tenant_id, type, amount_cents, currency, status, description, due_date, paid_at, created_at)
VALUES
  ('a1b2c3d4-0000-0000-0000-000000000001', 'b4000000-0000-0000-0000-000000000004', 'c4010000-0000-0000-0000-000000000001', 'd4010000-0000-0000-0000-000000000008',
   'rent_received', 126000, 'EUR', 'confirmed', 'Miete Februar 2026', DATE_TRUNC('month', NOW()) + INTERVAL '3 days', DATE_TRUNC('month', NOW()) + INTERVAL '2 days', NOW()),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'b4000000-0000-0000-0000-000000000004', 'c4030000-0000-0000-0000-000000000003', 'd4020000-0000-0000-0000-000000000009',
   'rent_received', 162000, 'EUR', 'confirmed', 'Miete Februar 2026', DATE_TRUNC('month', NOW()) + INTERVAL '3 days', DATE_TRUNC('month', NOW()) + INTERVAL '3 days', NOW());

-- Rahlstedter Str. 92 tenants
INSERT INTO financial_transactions (landlord_id, property_id, unit_id, tenant_id, type, amount_cents, currency, status, description, due_date, paid_at, created_at)
VALUES
  ('a1b2c3d4-0000-0000-0000-000000000001', 'b5000000-0000-0000-0000-000000000005', 'c5020000-0000-0000-0000-000000000002', 'd5010000-0000-0000-0000-000000000010',
   'rent_received', 103000, 'EUR', 'confirmed', 'Miete Februar 2026', DATE_TRUNC('month', NOW()) + INTERVAL '3 days', DATE_TRUNC('month', NOW()) + INTERVAL '1 days', NOW()),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'b5000000-0000-0000-0000-000000000005', 'c5060000-0000-0000-0000-000000000006', 'd5020000-0000-0000-0000-000000000011',
   'rent_received', 114000, 'EUR', 'confirmed', 'Miete Februar 2026', DATE_TRUNC('month', NOW()) + INTERVAL '3 days', DATE_TRUNC('month', NOW()) + INTERVAL '2 days', NOW()),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'b5000000-0000-0000-0000-000000000005', 'c5110000-0000-0000-0000-000000000011', 'd5030000-0000-0000-0000-000000000012',
   'rent_received', 121000, 'EUR', 'pending', 'Miete Februar 2026', DATE_TRUNC('month', NOW()) + INTERVAL '3 days', NULL, NOW());

-- =============================================================
-- SUMMARY
-- =============================================================
-- Landlord:   Lukas Schmitz (demo@einfach-verwaltet.de)
-- Properties: 5 (Wandsbek, Eppendorf, Bergedorf, Hoheluft, Rahlstedt)
-- Total units: 34 (6+4+8+4+12)
-- Tenants:    12
-- Tickets:    8 (2 offen, 2 in-bearbeitung, 3 erledigt, 1 dringend)
-- Expected monthly rent: ~€13,334 from 12 tenants
-- =============================================================
SELECT 'Demo seed complete ✅' AS status;
