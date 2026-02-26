/**
 * BKA/NKA Calculator Engine - Validation Rules
 * 
 * Validates BKA inputs for legal compliance and consistency
 * - §2 BetrKV category validation
 * - Umlagefähigkeit checks
 * - Allocation key matching
 * - Period consistency
 * 
 * Sources:
 * - §2 BetrKV: Betriebskostenverordnung
 * - §556 BGB: Nebenkostenabrechnung
 * - §556a BGB: Verteilungsmaßstäbe
 */

import {
  BKACostCategory,
  BKAInput,
  ValidationWarning,
  AllocationKey,
  DefaultAllocationKeys
} from './types';

/**
 * List of categories that are ALWAYS umlagefähig
 * Categories NOT in this list need special checks
 */
const ALWAYS_UMLAGEFÄHIG: BKACostCategory[] = [
  BKACostCategory.BETRIEBSSTROM,
  BKACostCategory.WASSERVERSORGUNG,
  BKACostCategory.ENTWAESSERUNG,
  BKACostCategory.HEIZUNG,
  BKACostCategory.WARMWASSER,
  BKACostCategory.AUFZUG,
  BKACostCategory.MUELLBeseITIGUNG,
  BKACostCategory.STRASSENREINIGUNG,
  BKACostCategory.GARTENPFLEGE,
  BKACostCategory.BELEUCHTUNG,
  BKACostCategory.SCHORNSTEINREINIGUNG,
  BKACostCategory.VERSICHERUNG,
  BKACostCategory.HAUSMEISTER
];

/**
 * Categories that MAY be umlagefähig depending on contract
 * These require explicit agreement in the lease
 */
const CONDITIONALLY_UMLAGEFÄHIG: BKACostCategory[] = [
  BKACostCategory.INSTANDHALTUNG,     // Allgemeine Instandhaltung
  BKACostCategory.INSTANDSETZUNG,      // Instandsetzung (Repairs)
  BKACostCategory.SCHOENHEITSREPARATUREN, // Schönheitsreparaturen
  BKACostCategory.TV_EMPFANG,          // TV/Radio reception
  BKACostCategory.VERMIETUNGSKOSTEN    // Kosten der Vermietung (commercial only)
];

/**
 * NIU (nichternst eine Übernahme begründen) - NOT automatically umlagefähig
 * These should flag warnings if included without explicit contract agreement
 */
const NIU_CATEGORIES: BKACostCategory[] = [
  BKACostCategory.INSTANDSETZUNG,      // Instandsetzung
  BKACostCategory.SCHOENHEITSREPARATUREN // Schönheitsreparaturen
];

/**
 * Categories that are typically NOT included in residential leases
 * unless explicitly agreed
 */
const COMMERCIAL_ONLY_CATEGORIES: BKACostCategory[] = [
  BKACostCategory.VERMIETUNGSKOSTEN
];

/**
 * Check if a category is umlagefähig
 * All §2 BetrKV categories are theoretically umlagefähig
 * but some require explicit agreement
 */
function isUmlagefaehig(category: BKACostCategory): boolean {
  return [...ALWAYS_UMLAGEFÄHIG, ...CONDITIONALLY_UMLAGEFÄHIG].includes(category);
}

/**
 * Check if allocation key is appropriate for the category
 * Based on §556a BGB and common practice
 */
function isAllocationKeyAppropriate(category: BKACostCategory, key: AllocationKey): boolean {
  // Consumption-based categories should ideally use VERBRAUCH key
  const consumptionCategories = [
    BKACostCategory.HEIZUNG,
    BKACostCategory.WARMWASSER,
    BKACostCategory.WASSERVERSORGUNG,
    BKACostCategory.ENTWAESSERUNG
  ];
  
  if (consumptionCategories.includes(category)) {
    // Strong warning if VERBRAUCH is not used for consumption-based costs
    if (key !== AllocationKey.VERBRAUCH) {
      return false;
    }
  }
  
  // Müllbeseitigung typically uses PERSONENZAHL
  if (category === BKACostCategory.MUELLBeseITIGUNG) {
    if (key !== AllocationKey.PERSONENZAHL && key !== AllocationKey.WOHNFLAECHE) {
      return false;
    }
  }
  
  return true;
}

/**
 * Get the suggested allocation key for a category
 */
function getSuggestedKey(category: BKACostCategory): AllocationKey {
  return DefaultAllocationKeys[category];
}

/**
 * Validate BKA input data
 * 
 * @param input The BKA input to validate
 * @returns Array of validation warnings (empty if valid)
 */
export function validateBKAInput(input: BKAInput): ValidationWarning[] {
  const warnings: ValidationWarning[] = [];
  
  // Validate period
  const periodWarnings = validatePeriod(input.periodStart, input.periodEnd);
  warnings.push(...periodWarnings);
  
  // Validate costs
  for (const cost of input.costs) {
    const costWarnings = validateCostEntry(cost, input);
    warnings.push(...costWarnings);
  }
  
  // Validate units
  const unitWarnings = validateUnits(input);
  warnings.push(...unitWarnings);
  
  // Check for zero or negative costs
  const negativeCosts = input.costs.filter(c => c.total_eur <= 0);
  for (const cost of negativeCosts) {
    warnings.push({
      type: cost.total_eur < 0 ? 'error' : 'warning',
      code: cost.total_eur < 0 ? 'NEGATIVE_COST' : 'ZERO_COST',
      message: cost.total_eur < 0 
        ? `Negativer Betrag für ${cost.category}: ${cost.total_eur} EUR`
        : `Betrag für ${cost.category} beträgt 0 EUR`,
      category: cost.category
    });
  }
  
  // Check if total costs exceed reasonable limits (sanity check)
  const totalCosts = input.costs.reduce((sum, c) => sum + c.total_eur, 0);
  const totalArea = input.property.units.reduce((sum, u) => sum + u.area_m2, 0);
  const costPerSqm = totalArea > 0 ? totalCosts / totalArea : 0;
  
  if (costPerSqm > 50) {
    warnings.push({
      type: 'warning',
      code: 'HIGH_COST_PER_SQM',
      message: `Unusually high cost per m²: ${costPerSqm.toFixed(2)} EUR/m². Bitte überprüfen.`
    });
  }
  
  if (costPerSqm < 1 && totalCosts > 0) {
    warnings.push({
      type: 'warning',
      code: 'LOW_COST_PER_SQM',
      message: `Unusually low cost per m²: ${costPerSqm.toFixed(2)} EUR/m². Bitte überprüfen.`
    });
  }
  
  return warnings;
}

/**
 * Validate period dates
 */
function validatePeriod(periodStart: Date, periodEnd: Date): ValidationWarning[] {
  const warnings: ValidationWarning[] = [];
  
  // Check if start is before end
  if (periodStart >= periodEnd) {
    warnings.push({
      type: 'error',
      code: 'INVALID_PERIOD',
      message: 'Abrechnungsbeginn muss vor Abrechnungsende liegen.'
    });
    return warnings;
  }
  
  // Check if period exceeds one year
  const periodDays = Math.ceil((periodEnd.getTime() - periodStart.getTime()) / (1000 * 60 * 60 * 24));
  if (periodDays > 366) {
    warnings.push({
      type: 'error',
      code: 'PERIOD_TOO_LONG',
      message: `Abrechnungszeitraum (${periodDays} Tage) darf maximal ein Jahr betragen (§556 Abs. 1 BGB).`
    });
  }
  
  // Check if period is calendar year (§556 Abs. 1 S. 2 BGB: preferred)
  const startYear = periodStart.getFullYear();
  const isCalendarYear = periodStart.getTime() === new Date(startYear, 0, 1).getTime() && 
                        periodEnd.getTime() === new Date(startYear, 11, 31).getTime();
  
  if (!isCalendarYear) {
    warnings.push({
      type: 'info',
      code: 'NON_CALENDAR_YEAR',
      message: `Abrechnungszeitraum (${periodStart.toLocaleDateString('de-DE')} - ${periodEnd.toLocaleDateString('de-DE')}) ist kein Kalenderjahr. §556 Abs. 1 S. 2 BGB sieht Kalenderjahr vor.`
    });
  }
  
  // Check §556 Abs. 3 BGB deadline (12 months after period end)
  const deadline = new Date(periodEnd);
  deadline.setFullYear(deadline.getFullYear() + 1);
  const today = new Date();
  
  if (today > deadline) {
    warnings.push({
      type: 'error',
      code: 'DEADLINE_EXCEEDED',
      message: `Frist nach §556 Abs. 3 BGB (12 Monate nach Abrechnungsende) überschritten. Frist war: ${deadline.toLocaleDateString('de-DE')}. Kosten können nicht mehr abgerechnet werden.`
    });
  } else {
    const daysUntilDeadline = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (daysUntilDeadline <= 30) {
      warnings.push({
        type: 'warning',
        code: 'DEADLINE_APPROACHING',
        message: `§556 Abs. 3 BGB Frist läuft bald ab (${daysUntilDeadline} Tage bis ${deadline.toLocaleDateString('de-DE')}).`
      });
    }
  }
  
  return warnings;
}

/**
 * Validate a single cost entry
 */
function validateCostEntry(cost: { category: BKACostCategory; total_eur: number; allocation_key: AllocationKey; description?: string },
                          input: BKAInput): ValidationWarning[] {
  const warnings: ValidationWarning[] = [];
  
  // Check umlagefähigkeit
  if (!isUmlagefaehig(cost.category)) {
    warnings.push({
      type: 'error',
      code: 'NOT_UMLANGEFÄHIG',
      message: `${cost.category} ist nicht umlagefähig und darf nicht auf Mieter umgelegt werden.`,
      category: cost.category
    });
  }
  
  // Check for NIU categories
  if (NIU_CATEGORIES.includes(cost.category)) {
    warnings.push({
      type: 'warning',
      code: 'NIU_CATEGORY',
      message: `${cost.category} ist nur bei ausdrücklicher Vereinbarung im Mietvertrag umlagefähig (NIU - nicht insich umlagefähig).`,
      category: cost.category
    });
  }
  
  // Check allocation key appropriateness
  const isKeyAppropriate = isAllocationKeyAppropriate(cost.category, cost.allocation_key);
  if (!isKeyAppropriate) {
    const suggestedKey = getSuggestedKey(cost.category);
    warnings.push({
      type: 'warning',
      code: 'SUBOPTIMAL_ALLOCATION_KEY',
      message: `Umlageschlüssel ${cost.allocation_key} für ${cost.category} ist nicht optimal. Empfohlen: ${suggestedKey} (§556a BGB).`,
      category: cost.category
    });
  }
  
  // Check for commercial-only categories in residential context
  if (COMMERCIAL_ONLY_CATEGORIES.includes(cost.category)) {
    warnings.push({
      type: 'warning',
      code: 'COMMERCIAL_CATEGORY',
      message: `${cost.category} ist typischerweise nur bei Gewerbemietverträgen umlagefähig.`,
      category: cost.category
    });
  }
  
  return warnings;
}

/**
 * Validate units
 */
function validateUnits(input: BKAInput): ValidationWarning[] {
  const warnings: ValidationWarning[] = [];
  
  // Check for units
  if (input.property.units.length === 0) {
    warnings.push({
      type: 'error',
      code: 'NO_UNITS',
      message: 'Keine Wohneinheiten vorhanden.'
    });
    return warnings;
  }
  
  // Check each unit
  const totalArea = input.property.units.reduce((sum, u) => sum + u.area_m2, 0);
  
  for (const unit of input.property.units) {
    // Check for zero or negative area
    if (unit.area_m2 <= 0) {
      warnings.push({
        type: 'error',
        code: 'INVALID_AREA',
        message: `Wohnfläche für ${unit.tenant || unit.id} ist ungültig: ${unit.area_m2} m².`
      });
    }
    
    // Check for zero or negative persons
    if (unit.persons <= 0) {
      warnings.push({
        type: 'warning',
        code: 'NO_PERSONS',
        message: `Keine Personen angegeben für ${unit.tenant || unit.id}. Müllgebühren werden ohne Personenanteil berechnet.`
      });
    }
    
    // Check move dates
    if (unit.moveInDate && unit.moveInDate > input.periodEnd) {
      warnings.push({
        type: 'info',
        code: 'FUTURE_MOVE_IN',
        message: `${unit.tenant || unit.id} hat Einzugsdatum nach dem Abrechnungszeitraum.`
      });
    }
    
    if (unit.moveOutDate && unit.moveOutDate < input.periodStart) {
      warnings.push({
        type: 'info',
        code: 'PAST_MOVE_OUT',
        message: `${unit.tenant || unit.id} hat Auszugsdatum vor dem Abrechnungszeitraum.`
      });
    }
  }
  
  // Check for duplicate units
  const unitIds = input.property.units.map(u => u.id);
  const duplicates = unitIds.filter((item, index) => unitIds.indexOf(item) !== index);
  if (duplicates.length > 0) {
    warnings.push({
      type: 'error',
      code: 'DUPLICATE_UNITS',
      message: `Doppelte Unit-IDs gefunden: ${duplicates.join(', ')}.`
    });
  }
  
  // Check for missing advance payments
  for (const unit of input.property.units) {
    const hasAdvancePayment = unit.id in input.unit_vorauszahlungen;
    if (!hasAdvancePayment) {
      warnings.push({
        type: 'info',
        code: 'NO_ADVANCE_PAYMENT',
        message: `Keine Vorauszahlungen angegeben für ${unit.tenant || unit.id}. Es wird 0 EUR angenommen.`
      });
    }
  }
  
  return warnings;
}

/**
 * Check if costs are balanced (income = expenses)
 * Note: This is a simplified check, real accounting would be more complex
 */
export function checkCostBalance(costs: { total_eur: number; category: BKACostCategory }[], 
                                 vorauszahlungen: Record<string, number>): {
  balanced: boolean;
  totalCosts: number;
  totalIncome: number;
  difference: number;
} {
  const totalCosts = costs.reduce((sum, c) => sum + c.total_eur, 0);
  const totalIncome = Object.values(vorauszahlungen).reduce((sum, v) => sum + (v || 0), 0);
  const difference = totalIncome - totalCosts; // Positive = overpaid, negative = underpaid
  
  // Balanced if within rounding error (±0.01)
  const balanced = Math.abs(difference) < 0.01;
  
  return {
    balanced,
    totalCosts,
    totalIncome,
    difference
  };
}

/**
 * Format validation results for display
 */
export function formatValidationResults(warnings: ValidationWarning[]): string {
  if (warnings.length === 0) {
    return 'Keine Warnungen oder Fehler gefunden.';
  }
  
  const byType: Record<string, ValidationWarning[]> = {
    error: [],
    warning: [],
    info: []
  };
  
  for (const w of warnings) {
    byType[w.type].push(w);
  }
  
  const lines: string[] = [];
  
  if (byType.error.length > 0) {
    lines.push(`${byType.error.length} Fehler:`);
    for (const e of byType.error) {
      lines.push(`  [${e.code}] ${e.message}`);
    }
  }
  
  if (byType.warning.length > 0) {
    lines.push(`${byType.warning.length} Warnungen:`);
    for (const w of byType.warning) {
      lines.push(`  [${w.code}] ${w.message}`);
    }
  }
  
  if (byType.info.length > 0) {
    lines.push(`${byType.info.length} Hinweise:`);
    for (const i of byType.info) {
      lines.push(`  [${i.code}] ${i.message}`);
    }
  }
  
  return lines.join('\n');
}
