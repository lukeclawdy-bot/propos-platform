/**
 * BKA/NKA Calculator Engine - Type Definitions
 * Based on §2 BetrKV (BetrKV = Betriebskostenverordnung)
 * 
 * This module defines all types for German Nebenkostenabrechnung (BKA/NKA)
 * compliant with German tenancy law (BGB §556, §556a, BetrKV §2)
 */

/**
 * §2 BetrKV Cost Categories (1-19)
 * Source: Verordnung über die Umlage der Kosten für die Versorgung mit Wärme und Warmwasser
 * and Betriebskostenverordnung §2
 */
export enum BKACostCategory {
  // Category 1: Betriebsstrom (Geh-, Treppen- und Straßenbeleuchtung)
  BETRIEBSSTROM = 'BETRIEBSSTROM',
  
  // Category 2: Wasserversorgung
  WASSERVERSORGUNG = 'WASSERVERSORGUNG',
  
  // Category 3: Entwässerung
  ENTWAESSERUNG = 'ENTWAESSERUNG',
  
  // Category 4: Heizung (including heating maintenance)
  HEIZUNG = 'HEIZUNG',
  
  // Category 5: Warmwasserversorgung
  WARMWASSER = 'WARMWASSER',
  
  // Category 6: Aufzug
  AUFZUG = 'AUFZUG',
  
  // Category 7: Straßenreinigung und Müllbeseitigung
  MUELLBeseITIGUNG = 'MUELLBeseITIGUNG',
  
  // Category 8: Geh- und Straßenreinigung
  STRASSENREINIGUNG = 'STRASSENREINIGUNG',
  
  // Category 9: Gartenpflege
  GARTENPFLEGE = 'GARTENPFLEGE',
  
  // Category 10: Beleuchtung
  BELEUCHTUNG = 'BELEUCHTUNG',
  
  // Category 11: Schornsteinreinigung
  SCHORNSTEINREINIGUNG = 'SCHORNSTEINREINIGUNG',
  
  // Category 12: Sach- und Haftpflichtversicherung
  VERSICHERUNG = 'VERSICHERUNG',
  
  // Category 13: Hausmeister
  HAUSMEISTER = 'HAUSMEISTER',
  
  // Category 14: Allgemeine Instandhaltung (Building maintenance)
  INSTANDHALTUNG = 'INSTANDHALTUNG',
  
  // Category 15: Instandsetzung (Repairs)
  INSTANDSETZUNG = 'INSTANDSETZUNG',
  
  // Category 16: Schönheitsreparaturen
  SCHOENHEITSREPARATUREN = 'SCHOENHEITSREPARATUREN',
  
  // Category 17: Gemeinschaftlicher Fernseh- und Rundfunkempfang
  TV_EMPFANG = 'TV_EMPFANG',
  
  // Category 18: Kosten der Vermietung (Leasing costs - only for commercial)
  VERMIETUNGSKOSTEN = 'VERMIETUNGSKOSTEN',
  
  // Category 19: Sonstige Betriebskosten nach Mietvertrag
  SONSTIGE_KOSTEN = 'SONSTIGE_KOSTEN'
}

/**
 * German labels for cost categories
 */
export const BKACostCategoryLabels: Record<BKACostCategory, string> = {
  [BKACostCategory.BETRIEBSSTROM]: 'Betriebsstrom (§2 Nr. 1 BetrKV)',
  [BKACostCategory.WASSERVERSORGUNG]: 'Wasserversorgung (§2 Nr. 2 BetrKV)',
  [BKACostCategory.ENTWAESSERUNG]: 'Entwässerung (§2 Nr. 3 BetrKV)',
  [BKACostCategory.HEIZUNG]: 'Heizung (§2 Nr. 4 BetrKV)',
  [BKACostCategory.WARMWASSER]: 'Warmwasserversorgung (§2 Nr. 5 BetrKV)',
  [BKACostCategory.AUFZUG]: 'Aufzug (§2 Nr. 6 BetrKV)',
  [BKACostCategory.MUELLBeseITIGUNG]: 'Müllbeseitigung (§2 Nr. 7 BetrKV)',
  [BKACostCategory.STRASSENREINIGUNG]: 'Geh- und Straßenreinigung (§2 Nr. 8 BetrKV)',
  [BKACostCategory.GARTENPFLEGE]: 'Gartenpflege (§2 Nr. 9 BetrKV)',
  [BKACostCategory.BELEUCHTUNG]: 'Beleuchtung (§2 Nr. 10 BetrKV)',
  [BKACostCategory.SCHORNSTEINREINIGUNG]: 'Schornsteinreinigung (§2 Nr. 11 BetrKV)',
  [BKACostCategory.VERSICHERUNG]: 'Sach- und Haftpflichtversicherung (§2 Nr. 12 BetrKV)',
  [BKACostCategory.HAUSMEISTER]: 'Hausmeister (§2 Nr. 13 BetrKV)',
  [BKACostCategory.INSTANDHALTUNG]: 'Allgemeine Instandhaltung (§2 Nr. 14 BetrKV)',
  [BKACostCategory.INSTANDSETZUNG]: 'Instandsetzung (§2 Nr. 15 BetrKV)',
  [BKACostCategory.SCHOENHEITSREPARATUREN]: 'Schönheitsreparaturen (§2 Nr. 16 BetrKV)',
  [BKACostCategory.TV_EMPFANG]: 'Gemeinschaftlicher TV/Rundfunkempfang (§2 Nr. 17 BetrKV)',
  [BKACostCategory.VERMIETUNGSKOSTEN]: 'Kosten der Vermietung (§2 Nr. 18 BetrKV)',
  [BKACostCategory.SONSTIGE_KOSTEN]: 'Sonstige Betriebskosten (§2 Nr. 19 BetrKV)'
};

/**
 * Allowed allocation keys for cost distribution
 * Source: §556a BGB (Verteilungsmaßstäbe)
 */
export enum AllocationKey {
  /** Distribution by living space (Wohnfläche) - §556a Abs. 1 S. 1 BGB */
  WOHNFLAECHE = 'WOHNFLAECHE',
  
  /** Distribution by number of persons (Personenzahl) - §556a Abs. 1 S. 2 BGB */
  PERSONENZAHL = 'PERSONENZAHL',
  
  /** Distribution by consumption (Verbrauch) - §556a Abs. 1 S. 4 BGB */
  VERBRAUCH = 'VERBRAUCH',
  
  /** Distribution per unit (Wohneinheit) */
  EINHEIT = 'EINHEIT'
}

/**
 * German labels for allocation keys
 */
export const AllocationKeyLabels: Record<AllocationKey, string> = {
  [AllocationKey.WOHNFLAECHE]: 'nach Wohnfläche (§556a Abs. 1 S. 1 BGB)',
  [AllocationKey.PERSONENZAHL]: 'nach Personenzahl (§556a Abs. 1 S. 2 BGB)',
  [AllocationKey.VERBRAUCH]: 'nach Verbrauch (§556a Abs. 1 S. 4 BGB)',
  [AllocationKey.EINHEIT]: 'nach Wohneinheit'
};

/**
 * Default allocation keys per cost category (customizable by contract)
 * Based on common practice and BetrKV guidelines
 */
export const DefaultAllocationKeys: Record<BKACostCategory, AllocationKey> = {
  [BKACostCategory.BETRIEBSSTROM]: AllocationKey.WOHNFLAECHE,
  [BKACostCategory.WASSERVERSORGUNG]: AllocationKey.VERBRAUCH,
  [BKACostCategory.ENTWAESSERUNG]: AllocationKey.VERBRAUCH,
  [BKACostCategory.HEIZUNG]: AllocationKey.VERBRAUCH,
  [BKACostCategory.WARMWASSER]: AllocationKey.VERBRAUCH,
  [BKACostCategory.AUFZUG]: AllocationKey.WOHNFLAECHE,
  [BKACostCategory.MUELLBeseITIGUNG]: AllocationKey.PERSONENZAHL,
  [BKACostCategory.STRASSENREINIGUNG]: AllocationKey.WOHNFLAECHE,
  [BKACostCategory.GARTENPFLEGE]: AllocationKey.WOHNFLAECHE,
  [BKACostCategory.BELEUCHTUNG]: AllocationKey.WOHNFLAECHE,
  [BKACostCategory.SCHORNSTEINREINIGUNG]: AllocationKey.WOHNFLAECHE,
  [BKACostCategory.VERSICHERUNG]: AllocationKey.WOHNFLAECHE,
  [BKACostCategory.HAUSMEISTER]: AllocationKey.WOHNFLAECHE,
  [BKACostCategory.INSTANDHALTUNG]: AllocationKey.WOHNFLAECHE,
  [BKACostCategory.INSTANDSETZUNG]: AllocationKey.WOHNFLAECHE,
  [BKACostCategory.SCHOENHEITSREPARATUREN]: AllocationKey.WOHNFLAECHE,
  [BKACostCategory.TV_EMPFANG]: AllocationKey.WOHNFLAECHE,
  [BKACostCategory.VERMIETUNGSKOSTEN]: AllocationKey.WOHNFLAECHE,
  [BKACostCategory.SONSTIGE_KOSTEN]: AllocationKey.WOHNFLAECHE
};

/**
 * Meter reading for consumption-based allocation
 */
export interface MeterReading {
  /** Meter ID (unique identifier) */
  meterId: string;
  
  /** Meter type/description */
  description: string;
  
  /** Reading at period start */
  readingStart: number;
  
  /** Reading at period end */
  readingEnd: number;
  
  /** Unit (kWh, m³, etc.) */
  unit: string;
}

/**
 * Represents a rental unit (apartment)
 */
export interface Unit {
  /** Unique identifier for the unit */
  id: string;
  
  /** Apartment number or designation */
  designation: string;
  
  /** Current tenant name */
  tenant: string;
  
  /** Living space in square meters */
  area_m2: number;
  
  /** Number of persons living in the unit */
  persons: number;
  
  /** Move-in date (for partial year calculations) */
  moveInDate?: Date;
  
  /** Move-out date (for partial year calculations) */
  moveOutDate?: Date;
  
  /** Meter readings for consumption-based costs */
  meters?: MeterReading[];
  
  /** Custom allocation keys (overrides defaults) */
  customAllocationKeys?: Partial<Record<BKACostCategory, AllocationKey>>;
}

/**
 * Represents a property/address with multiple units
 */
export interface Property {
  /** Property identifier */
  id: string;
  
  /** Street address */
  address: string;
  
  /** Postal code */
  postalCode: string;
  
  /** City */
  city: string;
  
  /** All rental units in this property */
  units: Unit[];
  
  /** Property manager contact */
  managerContact?: string;
}

/**
 * A single cost entry for the accounting period
 */
export interface CostEntry {
  /** Cost category per §2 BetrKV */
  category: BKACostCategory;
  
  /** Total cost for the entire property in EUR */
  total_eur: number;
  
  /** Allocation key for this cost */
  allocation_key: AllocationKey;
  
  /** Description of the service/charge */
  description?: string;
  
  /** Invoice date */
  invoiceDate?: Date;
  
  /** Supplier/vendor name */
  vendor?: string;
  
  /** Notes or remarks */
  notes?: string;
}

/**
 * Monthly advance payment made by a tenant (Vorauszahlung)
 */
export interface Vorauszahlung {
  unitId: string;
  amount: number;
  monthsPaid: number;
}

/**
 * Full BKA calculation input
 */
export interface BKAInput {
  /** Property data including all units */
  property: Property;
  
  /** Accounting period start date */
  periodStart: Date;
  
  /** Accounting period end date */
  periodEnd: Date;
  
  /** All cost entries for the period */
  costs: CostEntry[];
  
  /** Advance payments made by each unit */
  unit_vorauszahlungen: Record<string, number>; // unitId -> total paid
  
  /** Due date for the BKA (§556 Abs. 3 BGB: end of 12 months after period end) */
  dueDate?: Date;
}

/**
 * Cost breakdown per category for a unit
 */
export interface UnitCostBreakdown {
  /** Cost category */
  category: BKACostCategory;
  
  /** Amount allocated to this unit in EUR */
  amount: number;
  
  /** Calculation basis used */
  calculationBasis: string;
  
  /** Calculation factor applied */
  factor: number;
}

/**
 * Per-unit BKA result
 */
export interface UnitBKAResult {
  /** Reference to the unit */
  unit: Unit;
  
  /** Total costs allocated to this unit */
  totalCost: number;
  
  /** Detailed breakdown by category */
  breakdown: UnitCostBreakdown[];
  
  /** Total Vorauszahlungen paid */
  vorauszahlungen: number;
  
  /** Final balance (positive = Nachzahlung, negative = Gutschrift) */
  saldo: number;
  
  /** True if tenant is owed money (Gutschrift) */
  isCredit: boolean;
  
  /** Share of costs in percentage */
  costShare: number;
  
  /** Days occupied during the period (for pro-rata calculation) */
  daysOccupied: number;
}

/**
 * Full BKA calculation result
 */
export interface BKAResult {
  /** Original input data */
  input: BKAInput;
  
  /** Total costs for the entire property */
  totalCosts: number;
  
  /** Cost per square meter (for information) */
  costPerSqm: number;
  
  /** Results for each unit */
  unitResults: UnitBKAResult[];
  
  /** Accounting period start */
  periodStart: Date;
  
  /** Accounting period end */
  periodEnd: Date;
  
  /** Calculation timestamp */
  calculationDate: Date;
  
  /** Due date per §556 Abs. 3 BGB */
  dueDate: Date;
  
  /** Days until due date (negative if overdue) */
  daysUntilDue: number;
  
  /** Warning if deadline is approaching */
  deadlineWarning: boolean;
  
  /** Interest on late payments (Verzugszinsen) in EUR */
  verzugszinsen?: number;
}

/**
 * Validation warning
 */
export interface ValidationWarning {
  /** Warning type */
  type: 'error' | 'warning' | 'info';
  
  /** Warning code */
  code: string;
  
  /** Human-readable message */
  message: string;
  
  /** Affected cost entry or field */
  field?: string;
  
  /** Affected category if applicable */
  category?: BKACostCategory;
}

/**
 * Non-umlagefähige (non-allocable) cost categories per §2 BetrKV
 * These costs CANNOT be passed to tenants
 */
export const NonUmlagefaehigeCategories: BKACostCategory[] = [
  // Verwaltungskosten (management costs) are NOT umlagefähig
  // These must be paid by the landlord
];

/**
 * Check if a cost category is umlagefähig (allocable to tenants)
 * All §2 BetrKV categories are generally umlagefähig
 * unless specifically excluded by law
 */
export function isUmlagefaehig(category: BKACostCategory): boolean {
  // Management/Verwaltungskosten are NOT in BetrKV §2
  // If they were they'd be flagged here
  return !NonUmlagefaehigeCategories.includes(category);
}