/**
 * NKA PDF Generator — Nebenkostenabrechnung
 * Generates a print-ready HTML document for the Betriebskostenabrechnung.
 *
 * No external PDF lib required — outputs HTML that renders perfectly in all
 * browsers and can be printed to PDF via Strg+P / window.print().
 *
 * Compliant with:
 *   §556 Abs. 3 BGB  — 12-month deadline
 *   §556a BGB        — Verteilungsmaßstäbe
 *   §2 BetrKV        — Betriebskostenkategorien
 */

import {
  BKAResult,
  UnitBKAResult,
  Property,
  BKACostCategoryLabels,
  AllocationKeyLabels,
  BKACostCategory,
} from '../bka-engine/types';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmt(n: number): string {
  return n.toLocaleString('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function fmtDate(d: Date | string | null | undefined): string {
  if (!d) return '—';
  const dt = typeof d === 'string' ? new Date(d) : d;
  return dt.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

function fmtPct(n: number): string {
  return n.toLocaleString('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) + ' %';
}

// ─── Input types ─────────────────────────────────────────────────────────────

export interface NKAGeneratorInput {
  result: BKAResult;
  unitResult: UnitBKAResult;
  property: Property;
  landlordName: string;
  bankDetails?: {
    iban?: string;
    bic?: string;
    bank?: string;
    kontoinhaber?: string;
  };
  generatedAt?: Date;
}

// ─── CSS ─────────────────────────────────────────────────────────────────────

const STYLES = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  @page {
    size: A4;
    margin: 20mm 18mm 22mm 18mm;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 10pt;
    color: #1a1a2e;
    background: #ffffff;
    line-height: 1.5;
  }

  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;
    padding-bottom: 14px;
    border-bottom: 2px solid #1a1a2e;
  }
  .brand {
    font-size: 15pt;
    font-weight: 700;
    color: #1a1a2e;
    letter-spacing: -0.3px;
  }
  .brand span { color: #0d9488; }
  .doc-title { text-align: right; }
  .doc-title h1 {
    font-size: 14pt;
    font-weight: 700;
    color: #1a1a2e;
    line-height: 1.2;
  }
  .doc-title .sub {
    font-size: 8.5pt;
    color: #6b7280;
    margin-top: 2px;
  }

  .meta-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 18px;
  }
  .meta-box {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 10px 14px;
  }
  .meta-box .label {
    font-size: 7.5pt;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #9ca3af;
    font-weight: 600;
    margin-bottom: 4px;
  }
  .meta-box .value {
    font-size: 9.5pt;
    font-weight: 600;
    color: #1a1a2e;
    line-height: 1.4;
  }

  .section-title {
    font-size: 9pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    color: #0d9488;
    margin: 18px 0 8px;
    padding-bottom: 4px;
    border-bottom: 1px solid #e2e8f0;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 9pt;
    margin-bottom: 4px;
  }
  thead th {
    background: #1a1a2e;
    color: #ffffff;
    font-size: 7.5pt;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    padding: 5px 8px;
    text-align: left;
  }
  thead th.right { text-align: right; }
  tbody tr:nth-child(even) { background: #f8fafc; }
  tbody td {
    padding: 5px 8px;
    border-bottom: 1px solid #f1f5f9;
    vertical-align: top;
  }
  tbody td.right { text-align: right; font-variant-numeric: tabular-nums; }
  tfoot td {
    padding: 6px 8px;
    font-weight: 700;
    border-top: 2px solid #1a1a2e;
  }
  tfoot td.right { text-align: right; font-variant-numeric: tabular-nums; }

  .summary-table { width: 100%; margin-top: 14px; border-collapse: collapse; }
  .summary-table td { padding: 5px 10px; font-size: 9.5pt; }
  .summary-table .sum-label { color: #374151; }
  .summary-table .sum-value {
    text-align: right;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }
  .summary-table tr.divider td {
    border-top: 1px solid #e2e8f0;
    padding-top: 6px;
  }

  .result-box {
    margin-top: 12px;
    border-radius: 6px;
    padding: 12px 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .result-box.nachzahlung { background: #fef2f2; border: 1.5px solid #fca5a5; }
  .result-box.gutschrift  { background: #f0fdf4; border: 1.5px solid #86efac; }
  .result-box .result-label { font-size: 10pt; font-weight: 700; color: #1a1a2e; }
  .result-box .result-amount { font-size: 14pt; font-weight: 700; font-variant-numeric: tabular-nums; }
  .result-box.nachzahlung .result-amount { color: #dc2626; }
  .result-box.gutschrift  .result-amount { color: #16a34a; }

  .bank-box {
    margin-top: 10px;
    background: #f0f9ff;
    border: 1px solid #bae6fd;
    border-radius: 6px;
    padding: 10px 14px;
    font-size: 9pt;
  }
  .bank-box .bank-label { font-weight: 700; color: #0369a1; margin-bottom: 4px; }

  .legal-box {
    margin-top: 18px;
    padding: 10px 14px;
    background: #fffbeb;
    border: 1px solid #fde68a;
    border-radius: 6px;
    font-size: 8.5pt;
    color: #78350f;
    line-height: 1.5;
  }
  .legal-box strong { font-weight: 700; }

  .signature-section { margin-top: 24px; display: flex; gap: 40px; }
  .sig-block {
    flex: 1;
    border-top: 1px solid #9ca3af;
    padding-top: 6px;
    font-size: 8.5pt;
    color: #6b7280;
  }

  .print-footer {
    margin-top: 20px;
    padding-top: 10px;
    border-top: 1px solid #e2e8f0;
    font-size: 7.5pt;
    color: #9ca3af;
    display: flex;
    justify-content: space-between;
  }

  @media print {
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .no-print { display: none !important; }
  }
`;

// ─── Generator ───────────────────────────────────────────────────────────────

export function generateNKAHtml(input: NKAGeneratorInput): string {
  const { result, unitResult, property, landlordName, bankDetails, generatedAt } = input;
  const unit = unitResult.unit;
  const year = result.periodStart.getFullYear();
  const genDate = generatedAt ?? new Date();

  const costRows = unitResult.breakdown
    .filter(b => b.amount > 0.005)
    .map(b => {
      const catLabel = BKACostCategoryLabels[b.category as BKACostCategory] ?? b.category;
      const costEntry = result.input.costs.find(c => c.category === b.category);
      const allocationLabel = costEntry ? AllocationKeyLabels[costEntry.allocation_key] : '—';
      const totalForCategory = costEntry?.total_eur ?? 0;
      const pct = totalForCategory > 0 ? (b.amount / totalForCategory) * 100 : 0;
      return `
        <tr>
          <td>${catLabel}</td>
          <td>${allocationLabel}</td>
          <td class="right">${fmt(totalForCategory)}</td>
          <td class="right">${b.calculationBasis}</td>
          <td class="right">${fmtPct(pct)}</td>
          <td class="right">${fmt(b.amount)}</td>
        </tr>`;
    })
    .join('');

  const totalKosten = unitResult.totalCost;
  const vorauszahlungen = unitResult.vorauszahlungen;
  const saldo = unitResult.saldo;
  const isCredit = unitResult.isCredit;

  const resultBlock = isCredit
    ? `<div class="result-box gutschrift">
        <div>
          <div class="result-label">Gutschrift für Sie</div>
          <div style="font-size:8.5pt;color:#15803d;margin-top:2px">
            Wir überweisen den Betrag auf Ihr Konto. Bitte teilen Sie uns Ihre Bankverbindung mit.
          </div>
        </div>
        <div class="result-amount">+ ${fmt(Math.abs(saldo))}</div>
      </div>`
    : `<div class="result-box nachzahlung">
        <div>
          <div class="result-label">Nachzahlungsbetrag</div>
          <div style="font-size:8.5pt;color:#991b1b;margin-top:2px">
            Bitte überweisen Sie den Betrag innerhalb von 14 Tagen.
          </div>
        </div>
        <div class="result-amount">${fmt(saldo)}</div>
      </div>`;

  const bankBlock = (!isCredit && bankDetails && (bankDetails.iban || bankDetails.bank))
    ? `<div class="bank-box">
        <div class="bank-label">Bankverbindung für Ihre Überweisung</div>
        ${bankDetails.kontoinhaber ? `<div>Kontoinhaber: <strong>${bankDetails.kontoinhaber}</strong></div>` : ''}
        ${bankDetails.iban ? `<div>IBAN: <strong>${bankDetails.iban}</strong></div>` : ''}
        ${bankDetails.bic ? `<div>BIC: ${bankDetails.bic}</div>` : ''}
        ${bankDetails.bank ? `<div>Kreditinstitut: ${bankDetails.bank}</div>` : ''}
        <div style="margin-top:4px;color:#0369a1;font-size:8.5pt">
          Verwendungszweck: NKA ${year} / ${unit.designation} / ${unit.tenant}
        </div>
      </div>`
    : '';

  const mietzeit = unit.moveInDate || unit.moveOutDate
    ? `${fmtDate(unit.moveInDate ?? result.periodStart)} – ${fmtDate(unit.moveOutDate ?? result.periodEnd)} (${unitResult.daysOccupied} Tage)`
    : `${fmtDate(result.periodStart)} – ${fmtDate(result.periodEnd)} (Gesamtes Jahr)`;

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Nebenkostenabrechnung ${year} — ${unit.tenant} — ${property.address}</title>
  <style>${STYLES}</style>
</head>
<body>

  <header class="page-header">
    <div class="brand">einfach <span>verwaltet.</span></div>
    <div class="doc-title">
      <h1>Nebenkostenabrechnung ${year}</h1>
      <div class="sub">Betriebskostenabrechnung gemäß §556 BGB · §2 BetrKV</div>
    </div>
  </header>

  <div class="meta-grid">
    <div class="meta-box">
      <div class="label">Mietobjekt</div>
      <div class="value">${property.address}<br/>${property.postalCode} ${property.city}</div>
    </div>
    <div class="meta-box">
      <div class="label">Vermieter / Verwalter</div>
      <div class="value">${landlordName}</div>
    </div>
    <div class="meta-box">
      <div class="label">Mieter</div>
      <div class="value">${unit.tenant}</div>
    </div>
    <div class="meta-box">
      <div class="label">Wohneinheit</div>
      <div class="value">${unit.designation} · ${unit.area_m2.toLocaleString('de-DE')} m² · ${unit.persons} ${unit.persons === 1 ? 'Person' : 'Personen'}</div>
    </div>
    <div class="meta-box">
      <div class="label">Abrechnungszeitraum</div>
      <div class="value">${fmtDate(result.periodStart)} – ${fmtDate(result.periodEnd)}</div>
    </div>
    <div class="meta-box">
      <div class="label">Mietzeit im Zeitraum</div>
      <div class="value">${mietzeit}</div>
    </div>
  </div>

  <div class="section-title">Umlagefähige Betriebskosten (§2 BetrKV)</div>
  <table>
    <thead>
      <tr>
        <th>Kostenart</th>
        <th>Verteilerschlüssel</th>
        <th class="right">Gesamtkosten</th>
        <th class="right">Ihr Anteil (Basis)</th>
        <th class="right">Anteil %</th>
        <th class="right">Ihr Betrag</th>
      </tr>
    </thead>
    <tbody>
      ${costRows || '<tr><td colspan="6" style="text-align:center;color:#9ca3af;padding:12px">Keine umlagefähigen Kosten im Abrechnungszeitraum.</td></tr>'}
    </tbody>
    <tfoot>
      <tr>
        <td colspan="5">Summe der auf Ihre Wohneinheit entfallenden Betriebskosten</td>
        <td class="right">${fmt(totalKosten)}</td>
      </tr>
    </tfoot>
  </table>

  <div class="section-title">Zusammenfassung</div>
  <table class="summary-table">
    <tbody>
      <tr>
        <td class="sum-label">Summe umlagefähige Betriebskosten (Ihr Anteil)</td>
        <td class="sum-value">${fmt(totalKosten)}</td>
      </tr>
      <tr class="divider">
        <td class="sum-label">Geleistete Vorauszahlungen im Abrechnungszeitraum</td>
        <td class="sum-value" style="color:#16a34a">− ${fmt(vorauszahlungen)}</td>
      </tr>
    </tbody>
  </table>

  ${resultBlock}
  ${bankBlock}

  <div class="legal-box">
    <strong>Hinweis gemäß §556 Abs. 3 BGB:</strong>
    Diese Abrechnung ist Ihnen spätestens bis zum
    <strong>${fmtDate(result.dueDate)}</strong>
    zugegangen (12 Monate nach Ende des Abrechnungszeitraums).
    Einwendungen gegen diese Abrechnung sind nach §556 Abs. 3 Satz 5 BGB nur bis zum Ablauf
    des zwölften Monats nach Zugang der Abrechnung möglich. Danach können Einwendungen nicht
    mehr geltend gemacht werden.
    Rechtsgrundlagen: §556 BGB · §556a BGB · §2 BetrKV · §288 BGB.
  </div>

  <div class="signature-section">
    <div class="sig-block">
      Hamburg, den ${fmtDate(genDate)}
      <div style="margin-top:28px">&nbsp;</div>
      Unterschrift Vermieter / Verwalter
    </div>
    <div class="sig-block">
      &nbsp;
      <div style="margin-top:28px">&nbsp;</div>
      Datum / Unterschrift Mieter (Kenntnisnahme)
    </div>
  </div>

  <div class="print-footer">
    <span>Erstellt am ${fmtDate(genDate)} · einfach verwaltet.</span>
    <span>Seite 1 von 1 · ${property.address}, ${property.postalCode} ${property.city}</span>
  </div>

</body>
</html>`;
}

export function generateNKABuffer(input: NKAGeneratorInput): Buffer {
  return Buffer.from(generateNKAHtml(input), 'utf-8');
}
