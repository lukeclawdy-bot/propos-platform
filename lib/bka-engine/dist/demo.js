"use strict";
/**
 * BKA/NKA Calculator Engine - Demo
 *
 * Complete example with 4-unit apartment at Rosenweg 5, Hamburg
 * Full year 2025 costs with all 19 §2 BetrKV categories
 */
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const calculator_1 = require("./calculator");
const validator_1 = require("./validator");
const formatter_1 = require("./formatter");
console.log('========================================');
console.log('BKA/NKA Calculator Engine Demo');
console.log('Rosenweg 5, Hamburg - 4 Wohneinheiten');
console.log('Abrechnungsjahr 2025');
console.log('========================================\n');
// Property: Rosenweg 5, Hamburg
const property = {
    id: 'rosenweg-5',
    address: 'Rosenweg 5',
    postalCode: '20095',
    city: 'Hamburg',
    managerContact: 'PropOS Verwaltung, verwaltung@propos.de',
    units: []
};
// Unit 1: Erdgeschoss links - Mueller
const unit1 = {
    id: 'unit-1',
    designation: 'EG links',
    tenant: 'Mueller, Sabine',
    area_m2: 75.0,
    persons: 2,
    meters: [
        { meterId: 'H-001', description: 'Heizung EG links', readingStart: 12450, readingEnd: 14200, unit: 'kWh' },
        { meterId: 'W-001', description: 'Wasser EG links', readingStart: 8500, readingEnd: 9100, unit: 'm3' },
        { meterId: 'WW-001', description: 'Warmwasser EG links', readingStart: 1200, readingEnd: 1450, unit: 'm3' }
    ]
};
// Unit 2: Erdgeschoss rechts - Schmidt
const unit2 = {
    id: 'unit-2',
    designation: 'EG rechts',
    tenant: 'Schmidt, Klaus',
    area_m2: 68.5,
    persons: 1,
    meters: [
        { meterId: 'H-002', description: 'Heizung EG rechts', readingStart: 9800, readingEnd: 10800, unit: 'kWh' },
        { meterId: 'W-002', description: 'Wasser EG rechts', readingStart: 7200, readingEnd: 7550, unit: 'm3' },
        { meterId: 'WW-002', description: 'Warmwasser EG rechts', readingStart: 950, readingEnd: 1050, unit: 'm3' }
    ]
};
// Unit 3: 1. OG links - Weber
const unit3 = {
    id: 'unit-3',
    designation: '1. OG links',
    tenant: 'Weber, Anna',
    area_m2: 82.0,
    persons: 3,
    meters: [
        { meterId: 'H-003', description: 'Heizung 1OG links', readingStart: 14500, readingEnd: 16800, unit: 'kWh' },
        { meterId: 'W-003', description: 'Wasser 1OG links', readingStart: 9800, readingEnd: 10600, unit: 'm3' },
        { meterId: 'WW-003', description: 'Warmwasser 1OG links', readingStart: 1500, readingEnd: 1950, unit: 'm3' }
    ]
};
// Unit 4: 1. OG rechts - Meyer (partial year - moved in April)
const unit4 = {
    id: 'unit-4',
    designation: '1. OG rechts',
    tenant: 'Meyer, Thomas',
    area_m2: 72.5,
    persons: 2,
    moveInDate: new Date('2025-04-01'),
    meters: [
        { meterId: 'H-004', description: 'Heizung 1OG rechts', readingStart: 10500, readingEnd: 11800, unit: 'kWh' },
        { meterId: 'W-004', description: 'Wasser 1OG rechts', readingStart: 8200, readingEnd: 8700, unit: 'm3' },
        { meterId: 'WW-004', description: 'Warmwasser 1OG rechts', readingStart: 1100, readingEnd: 1250, unit: 'm3' }
    ]
};
property.units = [unit1, unit2, unit3, unit4];
// Calculate totals
const totalArea = property.units.reduce((sum, u) => sum + u.area_m2, 0);
const totalPersons = property.units.reduce((sum, u) => sum + u.persons, 0);
console.log('Immobilie:');
console.log(`  Adresse: ${property.address}, ${property.postalCode} ${property.city}`);
console.log(`  Wohnungen: ${property.units.length}`);
console.log(`  Gesamtwohnflaeche: ${totalArea} m2`);
console.log(`  Gesamtpersonen: ${totalPersons}\n`);
console.log('Wohneinheiten:');
for (const unit of property.units) {
    const einzug = unit.moveInDate ? ` (Einzug: ${unit.moveInDate.toLocaleDateString('de-DE')})` : '';
    console.log(`  ${unit.designation}: ${unit.tenant}, ${unit.area_m2} m2, ${unit.persons} Personen${einzug}`);
}
console.log('');
// All 19 §2 BetrKV cost categories
const costs = [
    {
        category: types_1.BKACostCategory.BETRIEBSSTROM,
        total_eur: 450.00,
        allocation_key: types_1.AllocationKey.WOHNFLAECHE,
        description: 'Treppenlicht, Kellerbeleuchtung, Gartenlicht',
        vendor: 'Hamburg Energie GmbH'
    },
    {
        category: types_1.BKACostCategory.WASSERVERSORGUNG,
        total_eur: 850.00,
        allocation_key: types_1.AllocationKey.VERBRAUCH,
        description: 'Trinkwasser',
        vendor: 'Hamburg Wasser'
    },
    {
        category: types_1.BKACostCategory.ENTWAESSERUNG,
        total_eur: 620.00,
        allocation_key: types_1.AllocationKey.VERBRAUCH,
        description: 'Abwasserentsorgung',
        vendor: 'Hamburg Wasser'
    },
    {
        category: types_1.BKACostCategory.HEIZUNG,
        total_eur: 4800.00,
        allocation_key: types_1.AllocationKey.VERBRAUCH,
        description: 'Fernwaerme Heizung',
        vendor: 'Vattenfall Waerme Hamburg'
    },
    {
        category: types_1.BKACostCategory.WARMWASSER,
        total_eur: 2100.00,
        allocation_key: types_1.AllocationKey.VERBRAUCH,
        description: 'Fernwaerme Warmwasser',
        vendor: 'Vattenfall Waerme Hamburg'
    },
    {
        category: types_1.BKACostCategory.AUFZUG,
        total_eur: 1800.00,
        allocation_key: types_1.AllocationKey.WOHNFLAECHE,
        description: 'Wartung, Inspektion, Strom Aufzug',
        vendor: 'Schindler Deutschland AG'
    },
    {
        category: types_1.BKACostCategory.MUELLBeseITIGUNG,
        total_eur: 780.00,
        allocation_key: types_1.AllocationKey.PERSONENZAHL,
        description: 'Abfallentsorgung',
        vendor: 'Stadtreinigung Hamburg'
    },
    {
        category: types_1.BKACostCategory.STRASSENREINIGUNG,
        total_eur: 120.00,
        allocation_key: types_1.AllocationKey.WOHNFLAECHE,
        description: 'Gehweg- und Strassenreinigung',
        vendor: 'Stadtreinigung Hamburg'
    },
    {
        category: types_1.BKACostCategory.GARTENPFLEGE,
        total_eur: 690.00,
        allocation_key: types_1.AllocationKey.WOHNFLAECHE,
        description: 'Rasenmaehen, Hecken schneiden',
        vendor: 'Gaertnerei Blumen GmbH'
    },
    {
        category: types_1.BKACostCategory.BELEUCHTUNG,
        total_eur: 150.00,
        allocation_key: types_1.AllocationKey.WOHNFLAECHE,
        description: 'Aussenbeleuchtung, Hofbeleuchtung',
        vendor: 'Hamburg Energie GmbH'
    },
    {
        category: types_1.BKACostCategory.SCHORNSTEINREINIGUNG,
        total_eur: 180.00,
        allocation_key: types_1.AllocationKey.WOHNFLAECHE,
        description: 'Kehren der Schornsteine',
        vendor: 'Bezirksschornsteinfeger Hamburg'
    },
    {
        category: types_1.BKACostCategory.VERSICHERUNG,
        total_eur: 520.00,
        allocation_key: types_1.AllocationKey.WOHNFLAECHE,
        description: 'Gebaeudeversicherung, Haftpflichtversicherung',
        vendor: 'Allianz Versicherung'
    },
    {
        category: types_1.BKACostCategory.HAUSMEISTER,
        total_eur: 2400.00,
        allocation_key: types_1.AllocationKey.WOHNFLAECHE,
        description: 'Hausmeisterdienste, Treppenhausreinigung',
        vendor: 'Gebaeudereinigung Schmidt'
    },
    {
        category: types_1.BKACostCategory.INSTANDHALTUNG,
        total_eur: 320.00,
        allocation_key: types_1.AllocationKey.WOHNFLAECHE,
        description: 'Regelmaessige Wartung Tueren, Fenster',
        vendor: 'Wartungsservice Hamburg'
    },
    {
        category: types_1.BKACostCategory.INSTANDSETZUNG,
        total_eur: 800.00,
        allocation_key: types_1.AllocationKey.WOHNFLAECHE,
        description: 'Reparatur Dachrinne, Haustueranlage',
        vendor: 'Fenster- und Tuerenreparatur GmbH'
    },
    {
        category: types_1.BKACostCategory.SCHOENHEITSREPARATUREN,
        total_eur: 0.00,
        allocation_key: types_1.AllocationKey.WOHNFLAECHE,
        description: 'Schoenheitsreparaturen (bei expliziter Vereinbarung)',
        vendor: 'Malerbetrieb Hamburg'
    },
    {
        category: types_1.BKACostCategory.TV_EMPFANG,
        total_eur: 360.00,
        allocation_key: types_1.AllocationKey.WOHNFLAECHE,
        description: 'Kabelanschluss fuer TV und Internet',
        vendor: 'Vodafone Deutschland'
    },
    {
        category: types_1.BKACostCategory.VERMIETUNGSKOSTEN,
        total_eur: 0.00,
        allocation_key: types_1.AllocationKey.WOHNFLAECHE,
        description: 'Kosten der Vermietung (nur bei Gewerbemiete)',
        vendor: 'Immobilienverwaltung'
    },
    {
        category: types_1.BKACostCategory.SONSTIGE_KOSTEN,
        total_eur: 180.00,
        allocation_key: types_1.AllocationKey.EINHEIT,
        description: 'Beitrag Fahrradkeller',
        vendor: 'Diverse'
    }
];
// Vorauszahlungen per unit
const vorauszahlungen = {
    'unit-1': 3200.00,
    'unit-2': 2600.00,
    'unit-3': 3500.00,
    'unit-4': 2200.00
};
console.log('KOSTENUEBERSICHT 2025:');
console.log('-'.repeat(60));
let totalKosten = 0;
for (const cost of costs) {
    if (cost.total_eur > 0) {
        console.log(`  ${cost.category}: ${cost.total_eur.toFixed(2).padStart(10)} EUR`);
        totalKosten += cost.total_eur;
    }
}
console.log('-'.repeat(60));
console.log(`  GESAMTKOSTEN: ${totalKosten.toFixed(2).padStart(10)} EUR\n`);
const bkaInput = {
    property,
    periodStart: new Date('2025-01-01'),
    periodEnd: new Date('2025-12-31'),
    costs,
    unit_vorauszahlungen: vorauszahlungen
};
console.log('VALIDIERUNG:');
console.log('-'.repeat(60));
const validationWarnings = (0, validator_1.validateBKAInput)(bkaInput);
console.log((0, validator_1.formatValidationResults)(validationWarnings));
console.log('');
const balance = (0, validator_1.checkCostBalance)(costs, vorauszahlungen);
console.log('KOSTENBILANZ:');
console.log(`  Gesamtkosten:    ${balance.totalCosts.toFixed(2).padStart(10)} EUR`);
console.log(`  Vorauszahlungen: ${balance.totalIncome.toFixed(2).padStart(10)} EUR`);
console.log(`  Differenz:       ${(balance.totalIncome - balance.totalCosts).toFixed(2).padStart(10)} EUR\n`);
console.log('BERECHNUNG:');
console.log('='.repeat(60));
const bkaResult = (0, calculator_1.calculateBKA)(bkaInput);
console.log('\nErgebnisse pro Wohneinheit:');
console.log('-'.repeat(60));
for (const unitResult of bkaResult.unitResults) {
    const saldoText = unitResult.isCredit
        ? `Gutschrift: ${Math.abs(unitResult.saldo).toFixed(2)} EUR`
        : `Nachzahlung: ${unitResult.saldo.toFixed(2)} EUR`;
    console.log(`  ${unitResult.unit.designation}: ${unitResult.unit.tenant.padEnd(20)} Kosten: ${unitResult.totalCost.toFixed(2).padStart(8)} EUR | ${saldoText}`);
}
console.log('-'.repeat(60));
console.log('\n');
console.log((0, formatter_1.formatCostsByCategory)(bkaResult));
console.log('\n\n');
console.log('='.repeat(80));
console.log('  ABRECHNUNGEN FUER ALLE MIETER');
console.log('='.repeat(80));
console.log('\n');
for (const unitResult of bkaResult.unitResults) {
    const statement = (0, formatter_1.formatBKAStatement)(unitResult, property, bkaResult);
    console.log(statement);
    console.log('\n\n');
}
console.log('='.repeat(80));
console.log('  ZUSAMMENFASSUNG');
console.log('='.repeat(80));
console.log((0, formatter_1.formatBKASummary)(bkaResult));
console.log('\n\nDemo abgeschlossen!\n');
