/**
 * Test: NKA PDF Generator
 *
 * Generiert eine Muster-NKA für Musterstraße 7, Hamburg
 * und speichert das HTML-Dokument nach /tmp/test-nka.html
 *
 * Ausführen: npx tsx --tsconfig tsconfig.json scripts/test-nka.ts
 *
 * Das erzeugte HTML kann im Browser geöffnet und via Strg+P als PDF gespeichert werden.
 */

import * as fs from 'node:fs';
import * as path from 'node:path';

import {
  BKACostCategory,
  AllocationKey,
  type Unit,
  type Property,
  type CostEntry,
  type BKAInput,
} from '../lib/bka-engine/types';
import { calculateBKA } from '../lib/bka-engine/calculator';

// Import generator with relative path (avoids bundler alias issues in tsx)
import { generateNKAHtml } from '../lib/pdf/nka-generator-standalone';

// ── Testdaten: Musterstraße 7, Hamburg ───────────────────────────────────────

const property: Property = {
  id: 'musterstrasse-7',
  address: 'Musterstraße 7',
  postalCode: '20099',
  city: 'Hamburg',
  managerContact: 'einfach verwaltet. GmbH · Hamburg',
  units: [],
};

const units: Unit[] = [
  {
    id: 'unit-1',
    designation: 'EG links',
    tenant: 'Maria Bergmann',
    area_m2: 72.5,
    persons: 2,
    meters: [
      { meterId: 'H-001', description: 'Heizung EG links',     readingStart: 12100, readingEnd: 13800, unit: 'kWh' },
      { meterId: 'W-001', description: 'Wasser EG links',      readingStart: 8200,  readingEnd: 8780,  unit: 'm³'  },
      { meterId: 'WW-001', description: 'Warmwasser EG links', readingStart: 1100,  readingEnd: 1340,  unit: 'm³'  },
    ],
  },
  {
    id: 'unit-2',
    designation: 'EG rechts',
    tenant: 'Hans Fischer',
    area_m2: 65.0,
    persons: 1,
    meters: [
      { meterId: 'H-002', description: 'Heizung EG rechts',     readingStart: 9400,  readingEnd: 10500, unit: 'kWh' },
      { meterId: 'W-002', description: 'Wasser EG rechts',      readingStart: 7000,  readingEnd: 7380,  unit: 'm³'  },
      { meterId: 'WW-002', description: 'Warmwasser EG rechts', readingStart: 900,   readingEnd: 1010,  unit: 'm³'  },
    ],
  },
  {
    id: 'unit-3',
    designation: '1. OG Mitte',
    tenant: 'Lena Hoffmann',
    area_m2: 88.0,
    persons: 3,
    meters: [
      { meterId: 'H-003', description: 'Heizung 1OG Mitte',     readingStart: 14200, readingEnd: 16600, unit: 'kWh' },
      { meterId: 'W-003', description: 'Wasser 1OG Mitte',      readingStart: 9600,  readingEnd: 10450, unit: 'm³'  },
      { meterId: 'WW-003', description: 'Warmwasser 1OG Mitte', readingStart: 1450,  readingEnd: 1900,  unit: 'm³'  },
    ],
  },
];

property.units = units;

const costs: CostEntry[] = [
  { category: BKACostCategory.BETRIEBSSTROM,        total_eur: 420,  allocation_key: AllocationKey.WOHNFLAECHE,  description: 'Treppenhauslicht', vendor: 'Hamburg Energie' },
  { category: BKACostCategory.WASSERVERSORGUNG,     total_eur: 780,  allocation_key: AllocationKey.VERBRAUCH,    description: 'Trinkwasserversorgung', vendor: 'Hamburg Wasser' },
  { category: BKACostCategory.ENTWAESSERUNG,        total_eur: 560,  allocation_key: AllocationKey.VERBRAUCH,    description: 'Abwasserentsorgung', vendor: 'Hamburg Wasser' },
  { category: BKACostCategory.HEIZUNG,              total_eur: 4600, allocation_key: AllocationKey.VERBRAUCH,    description: 'Fernwärme Heizung', vendor: 'Vattenfall Wärme Hamburg' },
  { category: BKACostCategory.WARMWASSER,           total_eur: 1950, allocation_key: AllocationKey.VERBRAUCH,    description: 'Fernwärme Warmwasser', vendor: 'Vattenfall Wärme Hamburg' },
  { category: BKACostCategory.MUELLBeseITIGUNG,     total_eur: 710,  allocation_key: AllocationKey.PERSONENZAHL, description: 'Abfallentsorgung', vendor: 'Stadtreinigung Hamburg' },
  { category: BKACostCategory.STRASSENREINIGUNG,    total_eur: 110,  allocation_key: AllocationKey.WOHNFLAECHE,  description: 'Gehwegreinigung', vendor: 'Stadtreinigung Hamburg' },
  { category: BKACostCategory.GARTENPFLEGE,         total_eur: 640,  allocation_key: AllocationKey.WOHNFLAECHE,  description: 'Rasenpflege, Hecken', vendor: 'Garten Grün GmbH' },
  { category: BKACostCategory.VERSICHERUNG,         total_eur: 490,  allocation_key: AllocationKey.WOHNFLAECHE,  description: 'Gebäude- und Haftpflichtversicherung', vendor: 'Allianz' },
  { category: BKACostCategory.HAUSMEISTER,          total_eur: 2200, allocation_key: AllocationKey.WOHNFLAECHE,  description: 'Hausmeisterdienste', vendor: 'Gebäudereinigung Nord' },
  { category: BKACostCategory.SCHORNSTEINREINIGUNG, total_eur: 160,  allocation_key: AllocationKey.WOHNFLAECHE,  description: 'Kehrgebühren', vendor: 'Bezirksschornsteinfeger' },
  { category: BKACostCategory.BELEUCHTUNG,          total_eur: 130,  allocation_key: AllocationKey.WOHNFLAECHE,  description: 'Außenbeleuchtung', vendor: 'Hamburg Energie' },
  { category: BKACostCategory.SONSTIGE_KOSTEN,      total_eur: 180,  allocation_key: AllocationKey.EINHEIT,      description: 'Gemeinschaftsantenne', vendor: 'Diverse' },
];

const vorauszahlungen: Record<string, number> = {
  'unit-1': 2800,
  'unit-2': 2400,
  'unit-3': 3200,
};

const bkaInput: BKAInput = {
  property,
  periodStart: new Date('2025-01-01'),
  periodEnd: new Date('2025-12-31'),
  costs,
  unit_vorauszahlungen: vorauszahlungen,
};

// ── Berechnen ─────────────────────────────────────────────────────────────────

console.log('');
console.log('═══════════════════════════════════════════════════════════════');
console.log('  NKA Generator Test — Musterstraße 7, Hamburg — 2025');
console.log('═══════════════════════════════════════════════════════════════');
console.log('');

const bkaResult = calculateBKA(bkaInput);

console.log('Gesamtkosten Objekt:', bkaResult.totalCosts.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' }));
console.log('');
console.log('Ergebnisse pro Einheit:');
for (const ur of bkaResult.unitResults) {
  const saldo = ur.isCredit
    ? `Gutschrift: ${Math.abs(ur.saldo).toFixed(2)} €`
    : `Nachzahlung: ${ur.saldo.toFixed(2)} €`;
  console.log(`  ${ur.unit.designation.padEnd(14)} ${ur.unit.tenant.padEnd(20)} Kosten: ${ur.totalCost.toFixed(2).padStart(8)} € | ${saldo}`);
}
console.log('');

// ── HTML generieren (alle drei Mieter) ───────────────────────────────────────

const bankDetails = {
  kontoinhaber: 'Max Mustermann',
  iban: 'DE89 2005 0550 1234 5678 90',
  bic: 'HASPDEHHXXX',
  bank: 'Hamburger Sparkasse',
};

const outputDir = '/tmp';
let generated = 0;

for (const unitResult of bkaResult.unitResults) {
  const html = generateNKAHtml({
    result: bkaResult,
    unitResult,
    property,
    landlordName: 'Max Mustermann · einfach verwaltet.',
    bankDetails,
    generatedAt: new Date(),
  });

  const filename = `test-nka-${unitResult.unit.designation.replace(/[\s.]+/g, '-').toLowerCase()}.html`;
  const outPath = path.join(outputDir, filename);
  fs.writeFileSync(outPath, html, 'utf-8');
  console.log(`✓ Gespeichert: ${outPath}  (${(html.length / 1024).toFixed(1)} KB)`);
  generated++;
}

// Hauptdatei = erster Mieter
const firstHtml = generateNKAHtml({
  result: bkaResult,
  unitResult: bkaResult.unitResults[0],
  property,
  landlordName: 'Max Mustermann · einfach verwaltet.',
  bankDetails,
  generatedAt: new Date(),
});
fs.writeFileSync('/tmp/test-nka.html', firstHtml, 'utf-8');

console.log('');
console.log(`✓ Hauptdatei: /tmp/test-nka.html`);
console.log('');
console.log(`${generated} NKA-Dokumente erfolgreich generiert.`);
console.log('');
console.log('Öffnen Sie /tmp/test-nka.html im Browser und drucken Sie via Strg+P → Als PDF speichern.');
console.log('');
