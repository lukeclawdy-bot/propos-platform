/**
 * BKA/NKA Calculator Engine - German Text Formatting
 * 
 * Generates legally compliant German text output for Nebenkostenabrechnung
 * Complies with German tenancy law (BGB §556, §556a, BetrKV §2)
 * 
 * Output format suitable for printing and sending to tenants
 */

import {
  BKAResult,
  UnitBKAResult,
  Property,
  BKACostCategory,
  BKACostCategoryLabels
} from './types';
import { VERZUGSZINSEN_RATE } from './calculator';

/**
 * Format currency as German locale (1.234,56 €)
 */
export function formatCurrency(amount: number): string {
  return amount.toLocaleString('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

/**
 * Format percentage as German locale (12,34%)
 */
export function formatPercentage(value: number): string {
  return value.toLocaleString('de-DE', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

/**
 * Format date as German locale (31.12.2025)
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('de-DE');
}

/**
 * Format number as German locale (1.234,56)
 */
export function formatNumber(value: number, decimals = 2): string {
  return value.toLocaleString('de-DE', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}

/**
 * Generate the complete BKA statement for a tenant
 */
export function formatBKAStatement(result: UnitBKAResult, property: Property, fullResult: BKAResult): string {
  const lines: string[] = [];
  
  // Header
  lines.push('='.repeat(80));
  lines.push('  NEBENKOSTENABRECHNUNG (BETRIEBSKOSTENABRECHNUNG)');
  lines.push('='.repeat(80));
  lines.push('');
  
  // Property information
  lines.push(`Objekt: ${property.address}`);
  lines.push(`        ${property.postalCode} ${property.city}`);
  if (property.managerContact) {
    lines.push(`Kontakt: ${property.managerContact}`);
  }
  lines.push('');
  
  // Tenant information
  lines.push(`Wohneinheit: ${result.unit.designation}`);
  lines.push(`Mieter:      ${result.unit.tenant}`);
  lines.push(`Wohnflaeche: ${formatNumber(result.unit.area_m2)} m2`);
  lines.push(`Personen:    ${result.unit.persons}`);
  lines.push('');
  
  // Period information
  lines.push('-'.repeat(80));
  lines.push('ABRECHNUNGSZEITRAUM');
  lines.push('-'.repeat(80));
  lines.push(`Vom: ${formatDate(fullResult.periodStart)}`);
  lines.push(`Bis: ${formatDate(fullResult.periodEnd)}`);
  
  // Partial year information
  if (result.daysOccupied < 365) {
    lines.push('');
    lines.push(`Hinweis: Mietsverhaeltnis war nur ${result.daysOccupied} Tage im Abrechnungszeitraum aktiv.`);
    if (result.unit.moveInDate) {
      lines.push(`Einzugsdatum: ${formatDate(result.unit.moveInDate)}`);
    }
    if (result.unit.moveOutDate) {
      lines.push(`Auszugsdatum: ${formatDate(result.unit.moveOutDate)}`);
    }
  }
  lines.push('');
  
  // Cost breakdown
  lines.push('-'.repeat(80));
  lines.push('UMLAGEFAEHIGE KOSTEN (§2 BetrKV)');
  lines.push('-'.repeat(80));
  lines.push('');
  
  // Group costs by category
  const costsByCategory: Record<string, typeof result.breakdown[number][]> = {};
  for (const breakdown of result.breakdown) {
    if (!costsByCategory[breakdown.category]) {
      costsByCategory[breakdown.category] = [];
    }
    costsByCategory[breakdown.category].push(breakdown);
  }
  
  // List all costs
  let totalKosten = 0;
  for (const category of Object.keys(BKACostCategory) as BKACostCategory[]) {
    const entries = costsByCategory[category];
    if (entries && entries.length > 0) {
      const categoryTotal = entries.reduce((sum, e) => sum + e.amount, 0);
      if (categoryTotal > 0.01) {
        lines.push(`${BKACostCategoryLabels[category]}:`);
        for (const entry of entries) {
          lines.push(`  ${formatCurrency(entry.amount).padStart(12)}  (${entry.calculationBasis} x ${formatNumber(entry.factor, 6)})`);
        }
        lines.push(`  ${formatCurrency(categoryTotal).padStart(12)}  Zwischensumme`);
        lines.push('');
        totalKosten += categoryTotal;
      }
    }
  }
  
  lines.push('-'.repeat(80));
  lines.push(`Gesamtkosten:                        ${formatCurrency(totalKosten).padStart(12)}`);
  lines.push('-'.repeat(80));
  lines.push('');
  
  // Summary section
  lines.push('-'.repeat(80));
  lines.push('ZUSAMMENFASSUNG');
  lines.push('-'.repeat(80));
  lines.push(`Summe der Kosten Ihrer Wohneinheit:  ${formatCurrency(result.totalCost).padStart(12)}`);
  lines.push(`Ihr Kostenanteil am Gesamtergebnis:  ${formatPercentage(result.costShare / 100).padStart(12)}`);
  lines.push('');
  
  // Advance payments
  lines.push(`Bisher gezahlte Vorauszahlungen:     ${formatCurrency(result.vorauszahlungen).padStart(12)}`);
  lines.push('-'.repeat(80));
  
  // Final balance
  if (result.isCredit) {
    lines.push(`GUTSCHRIFT fuer Sie:                  ${formatCurrency(Math.abs(result.saldo)).padStart(12)}`);
    lines.push('');
    lines.push('Sie haben zu viel gezahlt. Der Differenzbetrag wird Ihnen gutgeschrieben.');
  } else if (result.saldo > 0.01) {
    lines.push(`NACHZAHLUNGSBETRAG von Ihnen:        ${formatCurrency(result.saldo).padStart(12)}`);
    lines.push('');
    lines.push('Bitte ueberweisen Sie den Nachzahlungsbetrag innerhalb von 14 Tagen.');
    if (property.managerContact) {
      lines.push(`Kontakt: ${property.managerContact}`);
    }
  } else {
    lines.push(`Saldo:                               ${formatCurrency(0).padStart(12)}`);
    lines.push('');
    lines.push('Ihre Vorauszahlungen decken die Kosten exakt.');
  }
  
  lines.push('');
  
  // Deadline reminder
  lines.push('-'.repeat(80));
  lines.push('HINWEIS ZUR RECHTSLAGE');
  lines.push('-'.repeat(80));
  lines.push('');
  lines.push(`Abrechnungsfrist gemaess 556 Abs. 3 BGB: ${formatDate(fullResult.dueDate)}`);
  
  if (fullResult.daysUntilDue < 0) {
    lines.push('');
    lines.push('ACHTUNG: Die gesetzliche Abrechnungsfrist ist bereits abgelaufen.');
  } else if (fullResult.deadlineWarning) {
    lines.push('');
    lines.push(`ACHTUNG: Die Abrechnungsfrist laeuft in ${fullResult.daysUntilDue} Tagen ab.`);
  }
  lines.push('');
  
  // Interest notice
  if (fullResult.verzugszinsen && fullResult.verzugszinsen > 0.01) {
    lines.push(`Hinweis: Aufgrund verspaeteter Abrechnung koennen Verzugszinsen`);
    lines.push(`anfallen (Basiszinssatz + 5% = ${formatPercentage(VERZUGSZINSEN_RATE)} p.a., 288 BGB).`);
    lines.push(`Berechnete Verzugszinsen: ${formatCurrency(fullResult.verzugszinsen)}`);
    lines.push('');
  }
  
  // Legal references
  lines.push('-'.repeat(80));
  lines.push('RECHTSGRUNDLAGEN');
  lines.push('-'.repeat(80));
  lines.push('');
  lines.push('556 BGB - Nebenkostenabrechnung');
  lines.push('556a BGB - Verteilungsmasstaebe');
  lines.push('2 BetrKV - Betriebskosten');
  lines.push('288 BGB - Verzugszinsen');
  lines.push('');
  
  // Calculated date
  lines.push('-'.repeat(80));
  lines.push(`Ermittelt am: ${formatDate(fullResult.calculationDate)}`);
  lines.push('-'.repeat(80));
  lines.push('');
  
  return lines.join('\n');
}

/**
 * Generate a summary report for all tenants
 */
export function formatBKASummary(fullResult: BKAResult): string {
  const lines: string[] = [];
  
  lines.push('='.repeat(80));
  lines.push('  GESAMTABRECHNUNG - ALLE MIETER');
  lines.push('='.repeat(80));
  lines.push('');
  
  lines.push(`Objekt: ${fullResult.input.property.address}`);
  lines.push(`        ${fullResult.input.property.postalCode} ${fullResult.input.property.city}`);
  lines.push('');
  
  lines.push(`Abrechnungszeitraum: ${formatDate(fullResult.periodStart)} - ${formatDate(fullResult.periodEnd)}`);
  lines.push(`Ermittelt am: ${formatDate(fullResult.calculationDate)}`);
  lines.push(`Frist gemaess 556 Abs. 3 BGB: ${formatDate(fullResult.dueDate)}`);
  lines.push('');
  
  lines.push('-'.repeat(80));
  lines.push('UEBERSICHT');
  lines.push('-'.repeat(80));
  lines.push('');
  
  lines.push(`Gesamtkosten des Objekts:            ${formatCurrency(fullResult.totalCosts).padStart(12)}`);
  lines.push(`Kosten pro m2 (Durchschnitt):      ${formatCurrency(fullResult.costPerSqm).padStart(12)}`);
  lines.push('');
  
  lines.push('-'.repeat(80));
  lines.push('MIETERUEBERSICHT');
  lines.push('-'.repeat(80));
  lines.push('');
  
  lines.push('Wohnung'.padEnd(15) + 'Mieter'.padEnd(20) + 'Kosten'.padStart(12) + 'Vorauszahlung'.padStart(15) + 'Saldo'.padStart(12));
  lines.push('-'.repeat(80));
  
  for (const unitResult of fullResult.unitResults) {
    const dispUnit = unitResult.unit.designation.padEnd(15).substring(0, 15);
    const dispTenant = unitResult.unit.tenant.padEnd(20).substring(0, 20);
    const dispKosten = formatCurrency(unitResult.totalCost).padStart(12);
    const dispVoraus = formatCurrency(unitResult.vorauszahlungen).padStart(15);
    const dispSaldo = (unitResult.isCredit ? '+' : '-') + formatCurrency(Math.abs(unitResult.saldo)).padStart(11);
    lines.push(dispUnit + dispTenant + dispKosten + dispVoraus + dispSaldo);
  }
  
  lines.push('-'.repeat(80));
  lines.push('');
  
  return lines.join('\n');
}

/**
 * Format costs by category (for property overview)
 */
export function formatCostsByCategory(fullResult: BKAResult): string {
  const lines: string[] = [];
  
  lines.push('KOSTENUEBERSICHT NACH KATEGORIE (2 BetrKV)');
  lines.push('='.repeat(80));
  lines.push('');
  
  // Aggregate costs by category
  const costsByCategory: Record<string, number> = {};
  for (const cost of fullResult.input.costs) {
    costsByCategory[cost.category] = (costsByCategory[cost.category] || 0) + cost.total_eur;
  }
  
  lines.push('Nr.'.padEnd(5) + 'Kategorie'.padEnd(45) + 'Betrag'.padStart(12) + 'Anteil'.padStart(12));
  lines.push('-'.repeat(80));
  
  let total = 0;
  for (const [category, amount] of Object.entries(costsByCategory)) {
    const label = BKACostCategoryLabels[category as BKACostCategory];
    const shortLabel = label.split('(')[0].trim();
    const dispNr = category.replace(/\D/g, '').padEnd(5) || category.substring(0, 4).padEnd(5);
    const dispCat = shortLabel.padEnd(45).substring(0, 45);
    const dispBetrag = formatCurrency(amount).padStart(12);
    const anteil = fullResult.totalCosts > 0 ? (amount / fullResult.totalCosts) * 100 : 0;
    const dispAnteil = formatNumber(anteil, 1).padStart(11) + '%';
    lines.push(dispNr + dispCat + dispBetrag + dispAnteil);
    total += amount;
  }
  
  lines.push('-'.repeat(80));
  lines.push('Gesamt'.padEnd(50) + formatCurrency(total).padStart(12));
  lines.push('');
  
  return lines.join('\n');
}
