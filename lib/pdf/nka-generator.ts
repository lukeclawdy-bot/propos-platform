/**
 * NKA PDF Generator — Nebenkostenabrechnung Export
 * 
 * Generates a professional, §556 BGB-compliant Nebenkostenabrechnung
 * as a printable HTML document (browser Print → PDF workflow).
 * 
 * Uses the BKA engine types and calculator for data.
 * Output: HTML string ready for browser rendering + print-to-PDF.
 * 
 * Legal basis: BGB §556, §556a, BetrKV §2
 */

import {
  BKAResult,
  UnitBKAResult,
  BKACostCategoryLabels,
  AllocationKeyLabels,
  BKACostCategory,
  AllocationKey
} from '../bka-engine/types';

export interface NKADocumentInput {
  /** BKA calculation result for this unit */
  unitResult: UnitBKAResult;
  /** Full BKA result (for property-level totals) */
  bkaResult: BKAResult;
  /** Landlord / Verwalter info */
  verwalter: {
    name: string;
    company: string;
    address: string;
    phone?: string;
    email?: string;
  };
  /** Landlord (Eigentümer) name */
  eigentuemer: string;
  /** Bank details for payment */
  bankDetails?: {
    iban: string;
    bic?: string;
    bank: string;
    kontoinhaber: string;
  };
  /** Payment reference */
  zahlungsreferenz?: string;
  /** Document date */
  documentDate?: Date;
}

/**
 * Format EUR currency
 */
function formatEUR(amount: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
}

/**
 * Format date as German string
 */
function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(date));
}

/**
 * Format percentage
 */
function formatPercent(value: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100);
}

/**
 * Get allocation key label (short version)
 */
function shortAllocationLabel(key: AllocationKey): string {
  const map: Record<AllocationKey, string> = {
    [AllocationKey.WOHNFLAECHE]: 'Wohnfläche',
    [AllocationKey.PERSONENZAHL]: 'Personenzahl',
    [AllocationKey.VERBRAUCH]: 'Verbrauch',
    [AllocationKey.EINHEIT]: 'Wohneinheit',
  };
  return map[key] || key;
}

/**
 * Generate NKA HTML document for a single tenant
 */
export function generateNKAHTML(input: NKADocumentInput): string {
  const { unitResult, bkaResult, verwalter, eigentuemer, bankDetails, zahlungsreferenz } = input;
  const docDate = input.documentDate || new Date();
  const periodStart = new Date(bkaResult.periodStart);
  const periodEnd = new Date(bkaResult.periodEnd);
  const year = periodStart.getFullYear();
  const property = bkaResult.input.property;
  const unit = unitResult.unit;

  // Build cost rows
  const costRows = unitResult.breakdown
    .filter(b => b.amount > 0)
    .map((b) => {
      const totalForCategory = bkaResult.input.costs.find(c => c.category === b.category)?.total_eur || 0;
      const allocKey = bkaResult.input.costs.find(c => c.category === b.category)?.allocation_key || AllocationKey.WOHNFLAECHE;
      return `
        <tr>
          <td class="category">${BKACostCategoryLabels[b.category] || b.category}</td>
          <td class="number">${formatEUR(totalForCategory)}</td>
          <td class="center">${shortAllocationLabel(allocKey)}</td>
          <td class="number">${b.calculationBasis}</td>
          <td class="number bold">${formatEUR(b.amount)}</td>
        </tr>`;
    })
    .join('\n');

  const saldoText = unitResult.isCredit
    ? `Es ergibt sich ein <strong>Guthaben</strong> von <strong>${formatEUR(Math.abs(unitResult.saldo))}</strong> zu Ihren Gunsten.`
    : `Es ergibt sich eine <strong>Nachzahlung</strong> von <strong>${formatEUR(unitResult.saldo)}</strong>.`;

  const paymentInfo = unitResult.isCredit
    ? `<p>Das Guthaben wird Ihnen innerhalb von 30 Tagen auf Ihr bekanntes Konto überwiesen.</p>`
    : bankDetails
      ? `<div class="payment-box">
          <h3>Zahlungsinformationen</h3>
          <p>Bitte überweisen Sie den Betrag von <strong>${formatEUR(unitResult.saldo)}</strong> innerhalb von 30 Tagen auf folgendes Konto:</p>
          <table class="bank-table">
            <tr><td>Kontoinhaber:</td><td>${bankDetails.kontoinhaber}</td></tr>
            <tr><td>IBAN:</td><td>${bankDetails.iban}</td></tr>
            ${bankDetails.bic ? `<tr><td>BIC:</td><td>${bankDetails.bic}</td></tr>` : ''}
            <tr><td>Bank:</td><td>${bankDetails.bank}</td></tr>
            ${zahlungsreferenz ? `<tr><td>Verwendungszweck:</td><td>${zahlungsreferenz}</td></tr>` : ''}
          </table>
        </div>`
      : `<p>Bitte überweisen Sie den Betrag innerhalb von 30 Tagen. Kontodaten erhalten Sie auf Anfrage.</p>`;

  const dueDate = new Date(bkaResult.dueDate);

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nebenkostenabrechnung ${year} — ${unit.tenant}</title>
  <style>
    @page {
      size: A4;
      margin: 20mm 15mm 25mm 15mm;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-size: 10pt;
      line-height: 1.5;
      color: #1a1a2e;
      background: white;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 30px;
      border-bottom: 3px solid #0a3d62;
      padding-bottom: 15px;
    }
    .header-left h1 {
      font-size: 18pt;
      color: #0a3d62;
      font-weight: 700;
      margin-bottom: 4px;
    }
    .header-left p {
      color: #555;
      font-size: 9pt;
    }
    .header-right {
      text-align: right;
      font-size: 9pt;
      color: #555;
    }
    .header-right .brand {
      font-size: 12pt;
      font-weight: 700;
      color: #0a3d62;
    }
    .meta-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      margin-bottom: 25px;
    }
    .meta-box {
      background: #f8f9fa;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      padding: 12px 16px;
    }
    .meta-box h3 {
      font-size: 8pt;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #888;
      margin-bottom: 6px;
    }
    .meta-box p { font-size: 10pt; }
    .meta-box .highlight { font-weight: 600; color: #0a3d62; }
    
    h2 {
      font-size: 12pt;
      color: #0a3d62;
      margin: 20px 0 10px;
      border-bottom: 1px solid #e0e0e0;
      padding-bottom: 5px;
    }
    
    table.costs {
      width: 100%;
      border-collapse: collapse;
      margin: 10px 0 20px;
      font-size: 9pt;
    }
    table.costs th {
      background: #0a3d62;
      color: white;
      padding: 8px 10px;
      text-align: left;
      font-weight: 600;
      font-size: 8pt;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    table.costs th.number,
    table.costs th.center { text-align: right; }
    table.costs td {
      padding: 6px 10px;
      border-bottom: 1px solid #eee;
    }
    table.costs td.number { text-align: right; font-variant-numeric: tabular-nums; }
    table.costs td.center { text-align: center; }
    table.costs td.bold { font-weight: 600; }
    table.costs td.category { max-width: 200px; }
    table.costs tr:nth-child(even) { background: #fafafa; }
    table.costs tr.total-row {
      background: #0a3d62 !important;
      color: white;
      font-weight: 700;
    }
    table.costs tr.total-row td { border: none; padding: 10px; }
    
    .summary-box {
      background: #f0f4f8;
      border: 2px solid #0a3d62;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }
    .summary-row {
      display: flex;
      justify-content: space-between;
      padding: 6px 0;
      font-size: 10pt;
    }
    .summary-row.final {
      border-top: 2px solid #0a3d62;
      margin-top: 8px;
      padding-top: 10px;
      font-size: 13pt;
      font-weight: 700;
      color: #0a3d62;
    }
    .summary-row.credit { color: #27ae60; }
    .summary-row.debit { color: #c0392b; }
    
    .payment-box {
      background: #fff3cd;
      border: 1px solid #ffc107;
      border-radius: 6px;
      padding: 15px;
      margin: 15px 0;
    }
    .payment-box h3 {
      color: #856404;
      font-size: 10pt;
      margin-bottom: 8px;
    }
    .bank-table { margin-top: 8px; }
    .bank-table td { padding: 3px 10px 3px 0; font-size: 10pt; }
    .bank-table td:first-child { font-weight: 600; color: #555; min-width: 140px; }
    
    .legal-note {
      margin-top: 25px;
      padding: 12px;
      background: #f8f9fa;
      border-left: 3px solid #0a3d62;
      font-size: 8pt;
      color: #666;
      line-height: 1.6;
    }
    .legal-note strong { color: #333; }
    
    .signature {
      margin-top: 40px;
      display: flex;
      justify-content: space-between;
    }
    .signature-block {
      width: 45%;
    }
    .signature-line {
      border-top: 1px solid #333;
      margin-top: 50px;
      padding-top: 5px;
      font-size: 9pt;
      color: #555;
    }
    
    .footer {
      margin-top: 30px;
      padding-top: 10px;
      border-top: 1px solid #ddd;
      font-size: 7pt;
      color: #999;
      text-align: center;
    }
    
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="header-left">
      <h1>Nebenkostenabrechnung ${year}</h1>
      <p>Abrechnungszeitraum: ${formatDate(periodStart)} — ${formatDate(periodEnd)}</p>
    </div>
    <div class="header-right">
      <div class="brand">einfach verwaltet.</div>
      <p>${verwalter.company}</p>
      <p>${verwalter.address}</p>
      ${verwalter.phone ? `<p>Tel: ${verwalter.phone}</p>` : ''}
      ${verwalter.email ? `<p>${verwalter.email}</p>` : ''}
    </div>
  </div>

  <div class="meta-grid">
    <div class="meta-box">
      <h3>Objekt</h3>
      <p class="highlight">${property.address}</p>
      <p>${property.postalCode} ${property.city}</p>
      <p>Eigentümer: ${eigentuemer}</p>
    </div>
    <div class="meta-box">
      <h3>Mieter</h3>
      <p class="highlight">${unit.tenant}</p>
      <p>Wohnung: ${unit.designation}</p>
      <p>Wohnfläche: ${unit.area_m2.toFixed(2)} m² · ${unit.persons} Person${unit.persons !== 1 ? 'en' : ''}</p>
      ${unitResult.daysOccupied < 365 ? `<p>Nutzungszeitraum: ${unitResult.daysOccupied} Tage (anteilig)</p>` : ''}
    </div>
  </div>

  <p style="margin-bottom:5px;">Datum: ${formatDate(docDate)}</p>
  <p style="margin-bottom:15px;">Sehr geehrte/r ${unit.tenant},</p>
  <p style="margin-bottom:15px;">hiermit erhalten Sie die Abrechnung der Betriebskosten gemäß §556 BGB für den Abrechnungszeitraum ${formatDate(periodStart)} bis ${formatDate(periodEnd)}. Die Umlage erfolgt gemäß der in Ihrem Mietvertrag vereinbarten Verteilerschlüssel.</p>

  <h2>Betriebskostenaufstellung</h2>
  <table class="costs">
    <thead>
      <tr>
        <th>Kostenart (§2 BetrKV)</th>
        <th class="number">Gesamtkosten</th>
        <th class="center">Verteilerschlüssel</th>
        <th class="number">Ihr Anteil</th>
        <th class="number">Ihr Betrag</th>
      </tr>
    </thead>
    <tbody>
      ${costRows}
      <tr class="total-row">
        <td colspan="4">Gesamte umlagefähige Betriebskosten</td>
        <td class="number">${formatEUR(unitResult.totalCost)}</td>
      </tr>
    </tbody>
  </table>

  <div class="summary-box">
    <div class="summary-row">
      <span>Umlagefähige Betriebskosten gesamt</span>
      <span>${formatEUR(unitResult.totalCost)}</span>
    </div>
    <div class="summary-row">
      <span>Geleistete Vorauszahlungen (${formatDate(periodStart)} — ${formatDate(periodEnd)})</span>
      <span>− ${formatEUR(unitResult.vorauszahlungen)}</span>
    </div>
    <div class="summary-row final ${unitResult.isCredit ? 'credit' : 'debit'}">
      <span>${unitResult.isCredit ? 'Guthaben zu Ihren Gunsten' : 'Nachzahlung'}</span>
      <span>${unitResult.isCredit ? '−' : ''} ${formatEUR(Math.abs(unitResult.saldo))}</span>
    </div>
  </div>

  <p>${saldoText}</p>
  ${paymentInfo}

  <div class="legal-note">
    <strong>Hinweis gemäß §556 Abs. 3 BGB:</strong> Einwendungen gegen diese Abrechnung sind bis zum Ablauf des zwölften Monats nach Zugang der Abrechnung geltend zu machen. Nach Ablauf dieser Frist kann der Mieter Einwendungen nicht mehr geltend machen, es sei denn, der Mieter hat die verspätete Geltendmachung nicht zu vertreten.<br><br>
    <strong>Belegeinsicht:</strong> Gemäß §259 BGB haben Sie das Recht, die der Abrechnung zugrunde liegenden Belege einzusehen. Bitte vereinbaren Sie hierfür einen Termin unter ${verwalter.email || verwalter.phone || 'den oben genannten Kontaktdaten'}.<br><br>
    <strong>Frist dieser Abrechnung:</strong> ${formatDate(dueDate)} (gemäß §556 Abs. 3 S. 2 BGB)
  </div>

  <div class="signature">
    <div class="signature-block">
      <div class="signature-line">
        Datum, Ort
      </div>
    </div>
    <div class="signature-block">
      <div class="signature-line">
        ${verwalter.company}<br>
        ${verwalter.name}, Hausverwaltung
      </div>
    </div>
  </div>

  <div class="footer">
    <p>Erstellt durch einfach verwaltet. · ${verwalter.company} · ${verwalter.address}</p>
    <p>Diese Abrechnung wurde maschinell erstellt und ist ohne Unterschrift gültig.</p>
  </div>
</body>
</html>`;
}

/**
 * Generate NKA documents for ALL units in a property
 */
export function generateAllNKADocuments(
  bkaResult: BKAResult,
  verwalter: NKADocumentInput['verwalter'],
  eigentuemer: string,
  bankDetails?: NKADocumentInput['bankDetails']
): { tenantName: string; unitDesignation: string; html: string }[] {
  return bkaResult.unitResults.map((unitResult) => ({
    tenantName: unitResult.unit.tenant,
    unitDesignation: unitResult.unit.designation,
    html: generateNKAHTML({
      unitResult,
      bkaResult,
      verwalter,
      eigentuemer,
      bankDetails,
      zahlungsreferenz: `NKA-${new Date(bkaResult.periodStart).getFullYear()}-${unitResult.unit.designation}`,
    }),
  }));
}
