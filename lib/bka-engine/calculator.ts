/**
 * BKA/NKA Calculator Engine - Core Calculation Logic
 * 
 * Implements German tenancy law (BGB §556, §556a, BetrKV §2)
 * - Cost allocation by various keys (Wohnfläche, Personenzahl, Verbrauch)
 * - Partial year calculation (Mieterwechsel)
 * - Verzugszinsen calculation (Basiszinssatz + 5% = 6.27% p.a.)
 * - Deadline validation (§556 Abs. 3 BGB: 12 months)
 */

import {
  BKACostCategory,
  CostEntry,
  Property,
  Unit,
  BKAInput,
  BKAResult,
  UnitBKAResult,
  UnitCostBreakdown,
  AllocationKey,
  DefaultAllocationKeys
} from './types';

/**
 * Basiszinssatz (base interest rate) as of 2025
 * Source: Deutsche Bundesbank
 * Updated: January 1, 2025
 */
export const BASISZINSSATZ = 0.0127; // 1.27%

/**
 * Default interest rate for late payments (Verzugszinsen per §288 BGB)
 * Basiszinssatz + 5% = 6.27%
 * For consumers: Basiszinssatz + 5%
 * For commercial: Basiszinssatz + 8%
 */
export const VERZUGSZINSEN_RATE = BASISZINSSATZ + 0.05; // 6.27%

/**
 * Days in a year ( accounting year)
 */
const DAYS_PER_YEAR = 365;

/**
 * Milliseconds per day
 */
const MS_PER_DAY = 1000 * 60 * 60 * 24;

/**
 * Calculate days between two dates (inclusive of start, exclusive of end)
 */
function getDaysBetween(start: Date, end: Date): number {
  const startDate = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const endDate = new Date(end.getFullYear(), end.getMonth(), end.getDate());
  return Math.max(0, Math.floor((endDate.getTime() - startDate.getTime()) / MS_PER_DAY));
}

/**
 * Get the last day of a year
 */
function getYearEnd(year: number): Date {
  return new Date(year, 11, 31);
}

/**
 * Get the first day of a year
 */
function getYearStart(year: number): Date {
  return new Date(year, 0, 1);
}

/**
 * Calculate the allocation denominator for a given key
 */
function calculateAllocationDenominator(units: Unit[], key: AllocationKey, periodStart: Date, periodEnd: Date): number {
  let total = 0;
  const totalDays = getDaysBetween(periodStart, periodEnd);
  
  for (const unit of units) {
    const effectiveStart = unit.moveInDate && unit.moveInDate > periodStart ? unit.moveInDate : periodStart;
    const effectiveEnd = unit.moveOutDate && unit.moveOutDate < periodEnd ? unit.moveOutDate : periodEnd;
    const daysOccupied = getDaysBetween(effectiveStart, effectiveEnd);
    const occupancyRatio = daysOccupied / totalDays;
    
    switch (key) {
      case AllocationKey.WOHNFLAECHE:
        total += unit.area_m2 * occupancyRatio;
        break;
      case AllocationKey.PERSONENZAHL:
        total += unit.persons * occupancyRatio;
        break;
      case AllocationKey.EINHEIT:
        total += 1 * occupancyRatio;
        break;
      case AllocationKey.VERBRAUCH:
        total += 1 * occupancyRatio; // Will be adjusted per category
        break;
    }
  }
  
  return total || 0.0001; // Avoid division by zero
}

/**
 * Calculate consumption-based allocation denominator
 */
function calculateConsumptionDenominator(units: Unit[], meterType: 'heizung' | 'wasser' | 'warmwasser' | 'strom', periodStart: Date, periodEnd: Date): number {
  let total = 0;
  
  for (const unit of units) {
    const effectiveStart = unit.moveInDate && unit.moveInDate > periodStart ? unit.moveInDate : periodStart;
    const effectiveEnd = unit.moveOutDate && unit.moveOutDate < periodEnd ? unit.moveOutDate : periodEnd;
    
    // Find relevant meter
    const relevantMeter = unit.meters?.find(m => 
      (meterType === 'heizung' && m.description.toLowerCase().includes('heiz')) ||
      (meterType === 'wasser' && m.description.toLowerCase().includes('wasser') && !m.description.toLowerCase().includes('warm')) ||
      (meterType === 'warmwasser' && m.description.toLowerCase().includes('warmwasser')) ||
      (meterType === 'strom' && m.description.toLowerCase().includes('strom'))
    );
    
    if (relevantMeter) {
      const consumption = relevantMeter.readingEnd - relevantMeter.readingStart;
      total += consumption;
    } else {
      // Fallback: use area if no meter present
      const totalDays = getDaysBetween(periodStart, periodEnd);
      const daysOccupied = getDaysBetween(effectiveStart, effectiveEnd);
      total += (unit.area_m2 * (daysOccupied / totalDays));
    }
  }
  
  return total || 0.0001;
}

/**
 * Get meter type for consumption category
 */
function getConsumptionType(category: BKACostCategory): 'heizung' | 'wasser' | 'warmwasser' | 'strom' | null {
  switch (category) {
    case BKACostCategory.HEIZUNG:
      return 'heizung';
    case BKACostCategory.WASSERVERSORGUNG:
    case BKACostCategory.ENTWAESSERUNG:
      return 'wasser';
    case BKACostCategory.WARMWASSER:
      return 'warmwasser';
    case BKACostCategory.BETRIEBSSTROM:
      return 'strom';
    default:
      return null;
  }
}

/**
 * Calculate unit allocation factor for a given cost entry
 */
function calculateUnitFactor(
  unit: Unit,
  costEntry: CostEntry,
  totalProperty: number,
  periodStart: Date,
  periodEnd: Date
): { factor: number; basis: string } {
  const effectiveStart = unit.moveInDate && unit.moveInDate > periodStart ? unit.moveInDate : periodStart;
  const effectiveEnd = unit.moveOutDate && unit.moveOutDate < periodEnd ? unit.moveOutDate : periodEnd;
  const totalDays = getDaysBetween(periodStart, periodEnd);
  const daysOccupied = getDaysBetween(effectiveStart, effectiveEnd);
  const timeFactor = daysOccupied / totalDays;
  
  const key = costEntry.allocation_key;
  
  let unitValue: number;
  let basis: string;
  
  switch (key) {
    case AllocationKey.WOHNFLAECHE:
      unitValue = unit.area_m2;
      basis = `${unit.area_m2} m²`;
      break;
    case AllocationKey.PERSONENZAHL:
      unitValue = unit.persons;
      basis = `${unit.persons} Personen`;
      break;
    case AllocationKey.EINHEIT:
      unitValue = 1;
      basis = `1 Einheit`;
      break;
    case AllocationKey.VERBRAUCH:
      const consumptionType = getConsumptionType(costEntry.category);
      if (consumptionType) {
        const meter = unit.meters?.find(m => 
          (consumptionType === 'heizung' && m.description.toLowerCase().includes('heiz')) ||
          (consumptionType === 'wasser' && m.description.toLowerCase().includes('wasser') && !m.description.toLowerCase().includes('warm')) ||
          (consumptionType === 'warmwasser' && m.description.toLowerCase().includes('warmwasser')) ||
          (consumptionType === 'strom' && m.description.toLowerCase().includes('strom'))
        );
        if (meter) {
          unitValue = meter.readingEnd - meter.readingStart;
          basis = `${unitValue} ${meter.unit}`;
        } else {
          // Fallback to area
          unitValue = unit.area_m2;
          basis = `${unit.area_m2} m² (kein Zähler)`;
        }
      } else {
        unitValue = unit.area_m2;
        basis = `${unit.area_m2} m²`;
      }
      break;
    default:
      unitValue = unit.area_m2;
      basis = `${unit.area_m2} m²`;
  }
  
  const factor = (unitValue * timeFactor) / totalProperty;
  
  return { factor, basis };
}

/**
 * Calculate Verzugszinsen (late payment interest)
 * §288 BGB: Basiszinssatz + 5% p.a. (for consumers)
 * 
 * @param amount The outstanding amount
 * @param daysLate Number of days payment is overdue
 * @returns Interest amount in EUR
 */
export function calculateVerzugszinsen(amount: number, daysLate: number): number {
  if (daysLate <= 0 || amount <= 0) return 0;
  
  // Daily interest rate
  const dailyRate = VERZUGSZINSEN_RATE / 365;
  
  // Interest = principal * rate * days
  return amount * dailyRate * daysLate;
}

/**
 * Check if §556 Abs. 3 BGB deadline is approaching
 * Deadline: 12 months after end of accounting period
 */
function checkDeadline(periodEnd: Date, calculationDate: Date): {
  dueDate: Date;
  daysUntilDue: number;
  deadlineWarning: boolean;
} {
  const dueDate = new Date(periodEnd);
  dueDate.setFullYear(dueDate.getFullYear() + 1); // 12 months after period end
  
  const daysUntilDue = getDaysBetween(calculationDate, dueDate);
  
  // Warning if less than 30 days remaining
  const deadlineWarning = daysUntilDue <= 30 && daysUntilDue >= 0;
  
  return { dueDate, daysUntilDue, deadlineWarning };
}

/**
 * Main BKA calculation function
 * 
 * @param input BKAInput containing property, costs, and period data
 * @returns BKAResult with breakdown for each unit
 */
export function calculateBKA(input: BKAInput): BKAResult {
  const calculationDate = new Date();
  const totalCosts = input.costs.reduce((sum, c) => sum + c.total_eur, 0);
  
  // Calculate total area for reference
  const totalArea = input.property.units.reduce((sum, u) => sum + u.area_m2, 0);
  const costPerSqm = totalArea > 0 ? totalCosts / totalArea : 0;
  
  // Calculate denominators for each allocation key
  const denominators: Record<AllocationKey, number> = {
    [AllocationKey.WOHNFLAECHE]: calculateAllocationDenominator(input.property.units, AllocationKey.WOHNFLAECHE, input.periodStart, input.periodEnd),
    [AllocationKey.PERSONENZAHL]: calculateAllocationDenominator(input.property.units, AllocationKey.PERSONENZAHL, input.periodStart, input.periodEnd),
    [AllocationKey.EINHEIT]: calculateAllocationDenominator(input.property.units, AllocationKey.EINHEIT, input.periodStart, input.periodEnd),
    [AllocationKey.VERBRAUCH]: calculateAllocationDenominator(input.property.units, AllocationKey.VERBRAUCH, input.periodStart, input.periodEnd)
  };
  
  // Calculate unit results
  const unitResults: UnitBKAResult[] = input.property.units.map(unit => {
    const breakdown: UnitCostBreakdown[] = [];
    let unitTotal = 0;
    
    // Calculate days occupied
    const effectiveStart = unit.moveInDate && unit.moveInDate > input.periodStart ? unit.moveInDate : input.periodStart;
    const effectiveEnd = unit.moveOutDate && unit.moveOutDate < input.periodEnd ? unit.moveOutDate : input.periodEnd;
    const totalDays = getDaysBetween(input.periodStart, input.periodEnd);
    const daysOccupied = getDaysBetween(effectiveStart, effectiveEnd);
    
    for (const costEntry of input.costs) {
      const denom = costEntry.allocation_key === AllocationKey.VERBRAUCH
        ? (() => {
            const type = getConsumptionType(costEntry.category);
            return type
              ? calculateConsumptionDenominator(input.property.units, type, input.periodStart, input.periodEnd)
              : denominators[AllocationKey.WOHNFLAECHE];
          })()
        : denominators[costEntry.allocation_key];
      
      const { factor, basis } = calculateUnitFactor(unit, costEntry, denom, input.periodStart, input.periodEnd);
      const amount = costEntry.total_eur * factor;
      
      breakdown.push({
        category: costEntry.category,
        amount,
        calculationBasis: basis,
        factor
      });
      
      unitTotal += amount;
    }
    
    // Get advance payments for this unit
    const vorauszahlungen = input.unit_vorauszahlungen[unit.id] || 0;
    
    // Calculate saldo (positive = Nachzahlung, negative = Gutschrift)
    const saldo = unitTotal - vorauszahlungen;
    
    // Calculate cost share percentage
    const costShare = totalCosts > 0 ? (unitTotal / totalCosts) * 100 : 0;
    
    return {
      unit,
      totalCost: unitTotal,
      breakdown,
      vorauszahlungen,
      saldo,
      isCredit: saldo < 0,
      costShare,
      daysOccupied
    };
  });
  
  // Check deadline
  const { dueDate, daysUntilDue, deadlineWarning } = checkDeadline(input.periodEnd, calculationDate);
  
  // Calculate Verzugszinsen if overdue
  let verzugszinsen: number | undefined;
  if (daysUntilDue < 0) {
    // Payment is overdue
    verzugszinsen = unitResults
      .filter(ur => ur.saldo > 0) // Only for units that owe money
      .reduce((sum, ur) => sum + calculateVerzugszinsen(ur.saldo, Math.abs(daysUntilDue)), 0);
  }
  
  return {
    input,
    totalCosts,
    costPerSqm,
    unitResults,
    periodStart: input.periodStart,
    periodEnd: input.periodEnd,
    calculationDate,
    dueDate,
    daysUntilDue,
    deadlineWarning,
    verzugszinsen
  };
}

/**
 * Calculate proportional days for partial year
 * Useful for Mieterwechsel (tenant change) calculations
 * 
 * @param startDate Occupancy start date
 * @param endDate Occupancy end date (or null for ongoing)
 * @param periodStart Accounting period start
 * @param periodEnd Accounting period end
 * @returns Number of days to account for
 */
export function calculateProRataDays(
  startDate: Date,
  endDate: Date | null,
  periodStart: Date,
  periodEnd: Date
): number {
  const effectiveStart = startDate > periodStart ? startDate : periodStart;
  const effectiveEnd = endDate && endDate < periodEnd ? endDate : periodEnd;
  
  return getDaysBetween(effectiveStart, effectiveEnd);
}

/**
 * Round amount to 2 decimal places (cents)
 */
export function roundCents(amount: number): number {
  return Math.round(amount * 100) / 100;
}

/**
 * Validate period consistency
 */
export function validatePeriod(periodStart: Date, periodEnd: Date): { valid: boolean; error?: string } {
  if (periodStart >= periodEnd) {
    return { valid: false, error: 'Period start must be before period end' };
  }
  
  if (getDaysBetween(periodStart, periodEnd) > 366) {
    return { valid: false, error: 'Accounting period cannot exceed one year' };
  }
  
  return { valid: true };
}
