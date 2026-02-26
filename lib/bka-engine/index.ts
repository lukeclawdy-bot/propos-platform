/**
 * BKA/NKA Calculator Engine
 * German Nebenkostenabrechnung (Betriebskostenabrechnung) Calculator
 * 
 * Compliant with German tenancy law:
 * - §556 BGB: Nebenkostenabrechnung
 * - §556a BGB: Verteilungsmaßstäbe
 * - §288 BGB: Verzugszinsen
 * - §2 BetrKV: Betriebskosten
 * 
 * @package PropOS - Property Management System
 * @module bka-engine
 */

// Type exports
export {
  BKACostCategory,
  AllocationKey,
  BKACostCategoryLabels,
  AllocationKeyLabels,
  DefaultAllocationKeys,
  type Unit,
  type Property,
  type CostEntry,
  type MeterReading,
  type BKAInput,
  type BKAResult,
  type UnitBKAResult,
  type UnitCostBreakdown,
  type ValidationWarning
} from './types';

// Calculator exports
export {
  calculateBKA,
  calculateVerzugszinsen,
  calculateProRataDays,
  roundCents,
  validatePeriod,
  BASISZINSSATZ,
  VERZUGSZINSEN_RATE
} from './calculator';

// Validator exports
export {
  validateBKAInput,
  formatValidationResults,
  checkCostBalance
} from './validator';

// Formatter exports
export {
  formatBKAStatement,
  formatBKASummary,
  formatCostsByCategory,
  formatCurrency,
  formatPercentage,
  formatDate,
  formatNumber
} from './formatter';

// Version
export const VERSION = '1.0.0';

// Quick start examples
export const QUICK_START = `
BKA/NKA Calculator Engine - Quick Start
========================================

1. Create a Property with Units:
   const property: Property = {
     id: 'prop-001',
     address: 'Rosenweg 5',
     postalCode: '20095',
     city: 'Hamburg',
     units: []
   };

2. Add Units with tenant data:
   const unit: Unit = {
     id: 'unit-001',
     designation: '1. OG links',
     tenant: 'Max Mustermann',
     area_m2: 85.5,
     persons: 2
   };

3. Create Cost Entries per §2 BetrKV:
   const cost: CostEntry = {
     category: BKACostCategory.HEIZUNG,
     total_eur: 4800.00,
     allocation_key: AllocationKey.VERBRAUCH
   };

4. Input and Calculate:
   const input: BKAInput = {
     property,
     costs,
     periodStart: new Date('2025-01-01'),
     periodEnd: new Date('2025-12-31'),
     unit_vorauszahlungen: { 'unit-001': 2400.00 }
   };

   const result = calculateBKA(input);

5. Format Output:
   const statement = formatBKAStatement(
     result.unitResults[0], 
     property, 
     result
   );
   console.log(statement);

For full documentation, see the module exports above.
`;

console.log(QUICK_START);
