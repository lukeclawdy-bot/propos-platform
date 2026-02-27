/**
 * Hausverwaltungsvertrag PDF Generator
 * Generates a print-ready HTML document for the Hausverwaltungsvertrag.
 *
 * No external PDF lib required — outputs HTML that renders perfectly in all
 * browsers and can be printed to PDF via Strg+P / window.print().
 *
 * Legal basis:
 *   §621 BGB      — Kündigung bei Dienstverhältnissen
 *   §34c GewO     — Erlaubnispflicht für Hausverwaltung
 *   DSGVO         — Datenschutz-Grundverordnung
 */

// ─── Input types ─────────────────────────────────────────────────────────────

export interface VertragGeneratorInput {
  ownerName: string;
  ownerAddress?: string;
  propertyAddress: string;
  units: number;
  verwaltungstyp: 'WEG' | 'Miet' | 'Gewerbe';
  feePerUnit: number; // EUR per unit per month
  startDate: Date | string;
  generatedAt?: Date;
}

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
    line-height: 1.6;
  }

  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 22px;
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
  .brand-sub {
    font-size: 8pt;
    color: #6b7280;
    margin-top: 2px;
  }
  .doc-title { text-align: right; }
  .doc-title h1 {
    font-size: 13pt;
    font-weight: 700;
    color: #1a1a2e;
    line-height: 1.2;
  }
  .doc-title .sub {
    font-size: 8.5pt;
    color: #6b7280;
    margin-top: 2px;
  }

  .parties-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    margin-bottom: 20px;
  }
  .party-box {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 10px 14px;
  }
  .party-box .label {
    font-size: 7.5pt;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #9ca3af;
    font-weight: 600;
    margin-bottom: 4px;
  }
  .party-box .value {
    font-size: 9.5pt;
    font-weight: 600;
    color: #1a1a2e;
    line-height: 1.5;
  }
  .party-box .value .name { font-size: 10.5pt; }

  .preamble {
    font-size: 9.5pt;
    color: #374151;
    margin-bottom: 20px;
    padding: 10px 14px;
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    border-radius: 6px;
    line-height: 1.6;
  }

  .section {
    margin-bottom: 16px;
  }
  .section-heading {
    font-size: 10pt;
    font-weight: 700;
    color: #1a1a2e;
    margin-bottom: 6px;
    padding-bottom: 3px;
    border-bottom: 1.5px solid #0d9488;
    display: flex;
    align-items: baseline;
    gap: 8px;
  }
  .section-heading .par {
    font-size: 9pt;
    color: #0d9488;
    font-weight: 700;
  }

  .section-body {
    font-size: 9.5pt;
    color: #374151;
    line-height: 1.65;
  }
  .section-body p { margin-bottom: 4px; }
  .section-body ul {
    margin: 4px 0 4px 18px;
    list-style-type: disc;
  }
  .section-body li { margin-bottom: 2px; }
  .section-body strong { font-weight: 600; color: #1a1a2e; }

  .fee-box {
    display: inline-block;
    background: #f0fdf4;
    border: 1.5px solid #86efac;
    border-radius: 5px;
    padding: 3px 10px;
    font-size: 11pt;
    font-weight: 700;
    color: #15803d;
    font-variant-numeric: tabular-nums;
  }

  .signature-section {
    margin-top: 28px;
    padding-top: 16px;
    border-top: 1px solid #e2e8f0;
  }
  .sig-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    margin-top: 12px;
  }
  .sig-block {
    border-top: 1px solid #9ca3af;
    padding-top: 6px;
    font-size: 8.5pt;
    color: #6b7280;
  }
  .sig-block .sig-name {
    font-size: 8pt;
    color: #374151;
    font-weight: 600;
    margin-top: 2px;
  }
  .sig-space { height: 32px; }

  .print-footer {
    margin-top: 18px;
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
    .section { page-break-inside: avoid; }
  }
`;

// ─── Generator ───────────────────────────────────────────────────────────────

export function generateVertragHtml(input: VertragGeneratorInput): string {
  const {
    ownerName,
    ownerAddress,
    propertyAddress,
    units,
    verwaltungstyp,
    feePerUnit,
    startDate,
    generatedAt,
  } = input;

  const genDate = generatedAt ?? new Date();
  const monthlyFee = feePerUnit * units;
  const annualFee = monthlyFee * 12;
  const verwaltungstypLabel =
    verwaltungstyp === 'WEG'
      ? 'WEG-Verwaltung (Wohnungseigentümergemeinschaft)'
      : verwaltungstyp === 'Miet'
        ? 'Mietverwaltung'
        : 'Gewerbeverwaltung';

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Hausverwaltungsvertrag — ${propertyAddress}</title>
  <style>${STYLES}</style>
</head>
<body>

  <header class="page-header">
    <div>
      <div class="brand">einfach <span>verwaltet.</span></div>
      <div class="brand-sub">
        RVLT Ventures GmbH · Singapurstr. 19 · 20457 Hamburg<br/>
        HRB 193395 · AG Hamburg · GF: Lukas Schmitz
      </div>
    </div>
    <div class="doc-title">
      <h1>Hausverwaltungsvertrag</h1>
      <div class="sub">Vertragsschluss: ${fmtDate(genDate)}</div>
    </div>
  </header>

  <!-- Parteien -->
  <div class="parties-grid">
    <div class="party-box">
      <div class="label">Auftragnehmer (Verwalter)</div>
      <div class="value">
        <div class="name">RVLT Ventures GmbH</div>
        <div>— handelnd als „einfach verwaltet."</div>
        <div>Singapurstr. 19, 20457 Hamburg</div>
        <div>HRB 193395 · AG Hamburg</div>
        <div>GF: Lukas Schmitz</div>
      </div>
    </div>
    <div class="party-box">
      <div class="label">Auftraggeber (Eigentümer / Verband)</div>
      <div class="value">
        <div class="name">${ownerName}</div>
        ${ownerAddress ? `<div>${ownerAddress.replace(/\n/g, '<br/>')}</div>` : ''}
      </div>
    </div>
  </div>

  <div class="preamble">
    Die RVLT Ventures GmbH (im Folgenden „Verwalter") und ${ownerName} (im Folgenden „Auftraggeber")
    schließen den nachfolgenden Hausverwaltungsvertrag. Beide Parteien wollen eine langfristige,
    professionelle und digitale Verwaltung des unten bezeichneten Objekts sicherstellen.
  </div>

  <!-- §1 -->
  <div class="section">
    <div class="section-heading">
      <span class="par">§1</span> Vertragsgegenstand
    </div>
    <div class="section-body">
      <p>
        Der Verwalter übernimmt die <strong>${verwaltungstypLabel}</strong> für das folgende Objekt:
      </p>
      <p style="margin: 8px 0 8px 16px; font-weight: 600; font-size: 10pt;">${propertyAddress}</p>
      <p>
        Das Objekt umfasst <strong>${units} Einheit${units !== 1 ? 'en' : ''}</strong>.
        Der Verwaltungsauftrag beginnt am <strong>${fmtDate(startDate)}</strong> und richtet sich nach
        den Bestimmungen dieses Vertrages sowie den einschlägigen gesetzlichen Vorschriften
        (insbesondere WEG, BGB, BetrKV).
      </p>
    </div>
  </div>

  <!-- §2 -->
  <div class="section">
    <div class="section-heading">
      <span class="par">§2</span> Vergütung
    </div>
    <div class="section-body">
      <p>
        Für die Verwaltungsleistungen gemäß §3 erhebt der Verwalter eine monatliche Vergütung von
        <span class="fee-box">${fmt(feePerUnit)}</span> je Einheit (netto zzgl. gesetzlicher MwSt.).
      </p>
      <p style="margin-top: 6px;">
        Für <strong>${units} Einheit${units !== 1 ? 'en' : ''}</strong> ergibt sich eine monatliche Gesamtvergütung von
        <strong>${fmt(monthlyFee)}</strong> (zzgl. MwSt.) bzw. jährlich <strong>${fmt(annualFee)}</strong> (zzgl. MwSt.).
      </p>
      <p style="margin-top: 6px;">
        Die Abrechnung erfolgt <strong>monatlich im Voraus per SEPA-Lastschrift</strong>.
        Der Auftraggeber erteilt dem Verwalter ein SEPA-Lastschriftmandat in separater Vereinbarung.
        Änderungen der Vergütung sind mit einer Frist von <strong>drei Monaten</strong> schriftlich anzukündigen.
      </p>
      <p style="margin-top: 6px;">
        Sonderleistungen (z.B. Eigentümerversammlungen über die erste im Kalenderjahr, WEG-Gerichtsprozesse,
        Projektsteuerung größerer Sanierungen) werden nach gesonderter Vereinbarung abgerechnet.
      </p>
    </div>
  </div>

  <!-- §3 -->
  <div class="section">
    <div class="section-heading">
      <span class="par">§3</span> Leistungsumfang
    </div>
    <div class="section-body">
      <p>Der Verwalter erbringt im Rahmen dieses Vertrages insbesondere folgende Leistungen:</p>
      <ul>
        <li><strong>Mieter-/Eigentümerkommunikation:</strong> Erreichbarkeit per Telefon, E-Mail und digitalem Portal; Bearbeitung von Anfragen innerhalb von 2 Werktagen.</li>
        <li><strong>Buchhaltung &amp; Finanzmanagement:</strong> Führung der Hausgeldkonten, monatliche Auswertungen, Mahnwesen bei Zahlungsverzug (§286 BGB), DATEV-kompatible Jahresabrechnungen.</li>
        <li><strong>Nebenkostenabrechnung (NKA):</strong> Jährliche Betriebskostenabrechnung gemäß §556 BGB und §2 BetrKV fristgerecht innerhalb von 12 Monaten nach Abrechnungsjahr.</li>
        <li><strong>Instandhaltungskoordination:</strong> Beauftragung und Überwachung von Handwerkern, Einholung von Angeboten, Abnahme von Leistungen.</li>
        <li><strong>Dokumentenmanagement:</strong> Digitale Archivierung sämtlicher Vertragsunterlagen, Protokolle, Rechnungen und Korrespondenz im Eigentümerportal.</li>
        ${verwaltungstyp === 'WEG' ? `
        <li><strong>WEG-Verwaltung:</strong> Vorbereitung, Einberufung und Leitung der jährlichen Eigentümerversammlung (eine im Jahr im Grundhonorar), Umsetzung der Beschlüsse, Führung der Beschlusssammlung gemäß §24 Abs. 7 WEG.</li>
        <li><strong>Hausgeldforderungen:</strong> Überwachung und Geltendmachung rückständiger Hausgelder.</li>
        ` : `
        <li><strong>Mietvertragsverwaltung:</strong> Überwachung der Mietzahlungen, Mietanpassungen nach §558 ff. BGB, Übergabeprotokolle bei Mieterwechsel.</li>
        `}
      </ul>
    </div>
  </div>

  <!-- §4 -->
  <div class="section">
    <div class="section-heading">
      <span class="par">§4</span> Laufzeit und Kündigung
    </div>
    <div class="section-body">
      <p>
        Der Vertrag beginnt am <strong>${fmtDate(startDate)}</strong> und wird auf unbestimmte Zeit geschlossen.
      </p>
      <p style="margin-top: 6px;">
        Gemäß <strong>§621 Nr. 3 BGB</strong> kann der Vertrag von beiden Parteien mit einer Frist von
        <strong>drei Monaten zum Ende eines Kalendervierteljahres</strong> (31. März, 30. Juni, 30. September,
        31. Dezember) schriftlich gekündigt werden.
      </p>
      <p style="margin-top: 6px;">
        Das Recht zur außerordentlichen Kündigung aus wichtigem Grund (§626 BGB) bleibt unberührt.
        Ein wichtiger Grund liegt insbesondere vor bei schwerwiegendem Vertrauensbruch, nachhaltigem
        Zahlungsverzug (mehr als 2 Monate) oder erheblicher Pflichtverletzung.
      </p>
      <p style="margin-top: 6px;">
        Nach Beendigung des Vertragsverhältnisses übergibt der Verwalter sämtliche Unterlagen,
        Kontoguthaben und digitalen Zugänge innerhalb von <strong>30 Tagen</strong> an den Auftraggeber
        oder einen von diesem benannten Nachfolgeverwalter.
      </p>
    </div>
  </div>

  <!-- §5 -->
  <div class="section">
    <div class="section-heading">
      <span class="par">§5</span> Haftung
    </div>
    <div class="section-body">
      <p>
        Der Verwalter haftet für Schäden, die durch schuldhafte Pflichtverletzung entstehen.
        Die Haftung des Verwalters ist der Höhe nach begrenzt auf den <strong>einfachen Betrag der
        Jahresvergütung</strong> (${fmt(annualFee)} zzgl. MwSt., Stand Vertragsschluss), sofern nicht
        Vorsatz oder grobe Fahrlässigkeit vorliegt.
      </p>
      <p style="margin-top: 6px;">
        <strong>Force Majeure:</strong> Der Verwalter haftet nicht für Leistungsausfälle, die durch
        Umstände außerhalb seines Einflussbereichs verursacht werden (höhere Gewalt), wie
        Naturkatastrophen, Pandemien, Cyberangriffe auf Drittinfrastruktur, behördliche Anordnungen
        oder vergleichbare unvorhersehbare Ereignisse. In solchen Fällen wird der Verwalter den
        Auftraggeber unverzüglich informieren und zumutbare Alternativlösungen anbieten.
      </p>
      <p style="margin-top: 6px;">
        Der Verwalter ist verpflichtet, eine angemessene Berufshaftpflichtversicherung gemäß
        §15 MaBV (mindestens €500.000 je Schadensfall) aufrechtzuerhalten.
      </p>
    </div>
  </div>

  <!-- §6 -->
  <div class="section">
    <div class="section-heading">
      <span class="par">§6</span> Datenschutz
    </div>
    <div class="section-body">
      <p>
        Beide Parteien verpflichten sich zur Einhaltung der Datenschutz-Grundverordnung
        (<strong>DSGVO</strong>) und des Bundesdatenschutzgesetzes (BDSG).
      </p>
      <p style="margin-top: 6px;">
        Der Verwalter verarbeitet personenbezogene Daten von Mietern, Eigentümern und Dritten
        ausschließlich zur Erfüllung der Verwaltungsaufgaben gemäß Art. 6 Abs. 1 lit. b DSGVO
        (Vertragserfüllung) sowie Art. 6 Abs. 1 lit. c DSGVO (gesetzliche Verpflichtungen).
      </p>
      <p style="margin-top: 6px;">
        Die Parteien schließen parallel zu diesem Vertrag einen
        <strong>Auftragsverarbeitungsvertrag (AVV)</strong> gemäß Art. 28 DSGVO ab, soweit der
        Verwalter als Auftragsverarbeiter für den Auftraggeber tätig wird.
      </p>
      <p style="margin-top: 6px;">
        Nach Beendigung des Vertragsverhältnisses löscht oder gibt der Verwalter alle
        personenbezogenen Daten zurück, soweit keine gesetzlichen Aufbewahrungspflichten
        entgegenstehen (z.B. §257 HGB, §147 AO).
      </p>
    </div>
  </div>

  <!-- §7 -->
  <div class="section">
    <div class="section-heading">
      <span class="par">§7</span> Erlaubnispflicht (§34c GewO)
    </div>
    <div class="section-body">
      <p>
        Der Verwalter bestätigt, dass die RVLT Ventures GmbH die erforderliche Erlaubnis zur
        Hausverwaltung gemäß <strong>§34c Abs. 1 Satz 1 Nr. 4 GewO</strong> besitzt und alle
        Anforderungen der <strong>Makler- und Bauträgerverordnung (MaBV)</strong> erfüllt.
      </p>
      <p style="margin-top: 6px;">
        Der Verwalter verpflichtet sich, die Erlaubnis während der gesamten Laufzeit dieses
        Vertrages aufrechtzuerhalten und den Auftraggeber unverzüglich zu informieren, falls
        die Erlaubnis erlischt oder eingeschränkt wird.
      </p>
      <p style="margin-top: 6px;">
        Eine gültige Berufshaftpflichtversicherung gemäß §15 MaBV mit einer Deckungssumme
        von mindestens €500.000 je Schadensfall und €1.000.000 jährlich ist abgeschlossen.
        Nachweis wird auf Verlangen des Auftraggebers vorgelegt.
      </p>
    </div>
  </div>

  <!-- §8 -->
  <div class="section">
    <div class="section-heading">
      <span class="par">§8</span> Schlussbestimmungen
    </div>
    <div class="section-body">
      <p>
        <strong>Gerichtsstand &amp; anwendbares Recht:</strong>
        Für alle Streitigkeiten aus oder im Zusammenhang mit diesem Vertrag gilt
        <strong>deutsches Recht</strong> unter Ausschluss des UN-Kaufrechts (CISG).
        Ausschließlicher Gerichtsstand ist <strong>Hamburg</strong>, soweit gesetzlich zulässig.
      </p>
      <p style="margin-top: 6px;">
        <strong>Schriftform:</strong>
        Änderungen und Ergänzungen dieses Vertrages bedürfen der Schriftform (E-Mail genügt).
        Dies gilt auch für die Abbedingung des Schriftformerfordernisses selbst.
      </p>
      <p style="margin-top: 6px;">
        <strong>Salvatorische Klausel:</strong>
        Sollte eine Bestimmung dieses Vertrages unwirksam oder undurchführbar sein, bleibt
        der Vertrag im Übrigen wirksam. Die unwirksame Bestimmung ist durch eine wirksame
        Regelung zu ersetzen, die dem wirtschaftlichen Zweck der unwirksamen Bestimmung
        am nächsten kommt.
      </p>
      <p style="margin-top: 6px;">
        <strong>Gesamte Vereinbarung:</strong>
        Dieser Vertrag einschließlich seiner Anlagen stellt die gesamte Vereinbarung zwischen
        den Parteien über seinen Gegenstand dar und ersetzt alle früheren schriftlichen oder
        mündlichen Absprachen.
      </p>
    </div>
  </div>

  <!-- Signatures -->
  <div class="signature-section">
    <div style="font-size: 9.5pt; color: #374151; margin-bottom: 10px;">
      Beide Parteien haben diesen Vertrag gelesen, verstanden und stimmen seinen Bedingungen zu.
    </div>
    <div class="sig-row">
      <div>
        <div style="font-size: 9pt; color: #6b7280; margin-bottom: 6px;">Hamburg, den ${fmtDate(genDate)}</div>
        <div class="sig-space"></div>
        <div class="sig-block">
          Für RVLT Ventures GmbH<br/>
          <span class="sig-name">Lukas Schmitz (Geschäftsführer)</span>
        </div>
      </div>
      <div>
        <div style="font-size: 9pt; color: #6b7280; margin-bottom: 6px;">Ort, Datum</div>
        <div class="sig-space"></div>
        <div class="sig-block">
          Auftraggeber (Eigentümer / WEG-Vertreter)<br/>
          <span class="sig-name">${ownerName}</span>
        </div>
      </div>
    </div>
  </div>

  <div class="print-footer">
    <span>Erstellt am ${fmtDate(genDate)} · einfach verwaltet. — RVLT Ventures GmbH</span>
    <span>Seite 1 · ${propertyAddress}</span>
  </div>

</body>
</html>`;
}

export function generateVertragBuffer(input: VertragGeneratorInput): Buffer {
  return Buffer.from(generateVertragHtml(input), 'utf-8');
}
