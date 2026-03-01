'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

// Types
interface Property {
  id: string;
  address: string;
  city: string;
  postalCode: string;
  unitsCount?: number;
}

interface Unit {
  id: string;
  propertyId: string;
  designation: string;
  areaM2?: string;
  floor?: number;
  rooms?: string;
  coldRentCents?: number;
  occupied?: boolean;
  tenantName?: string;
  lastRentIncreaseDate?: string;
  isMilieuSchutz?: boolean;
}

interface CalculationResult {
  currentRent: number;
  referenzmiete: number;
  maxNewRent: number;
  increaseAmount: number;
  increasePercent: number;
  isWithinKappungsgrenze: boolean;
  kappungsgrenzePercent: number;
  monthsSinceLastIncrease: number;
  isEligible: boolean;
}

// Hamburg Mietspiegel 2025 reference data (€/m² Kaltmiete)
const HAMBURG_MIETSPIEGEL_2025: Record<string, number> = {
  'einfach': 10.50,
  'mittel': 12.80,
  'gut': 15.20,
  'sehr-gut': 18.50,
  'luxus': 23.00,
};

const WOHNLAGE_OPTIONS = [
  { value: 'einfach', label: 'Einfache Lage', price: 10.50 },
  { value: 'mittel', label: 'Mittlere Lage', price: 12.80 },
  { value: 'gut', label: 'Gute Lage', price: 15.20 },
  { value: 'sehr-gut', label: 'Sehr gute Lage', price: 18.50 },
  { value: 'luxus', label: 'Luxuslage', price: 23.00 },
];

// Format cents to Euro
const formatEuro = (cents: number | null | undefined): string => {
  if (cents == null) return '—';
  return (cents / 100).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
};

// Calculate months between dates
const getMonthsSince = (dateString: string | null | undefined): number => {
  if (!dateString) return 999; // No previous increase
  const date = new Date(dateString);
  const now = new Date();
  return (now.getFullYear() - date.getFullYear()) * 12 + (now.getMonth() - date.getMonth());
};

interface MieterhohungClientProps {
  initialProperties: Property[];
  initialUnits: Unit[];
  isDemo: boolean;
}

export function MieterhohungClient({ initialProperties, initialUnits, isDemo }: MieterhohungClientProps) {
  // Data states
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [units, setUnits] = useState<Unit[]>(initialUnits);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Selection states
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>('');
  const [selectedUnitId, setSelectedUnitId] = useState<string>('');
  const [selectedWohnlage, setSelectedWohnlage] = useState<string>('mittel');

  // Input states
  const [referenzmieteInput, setReferenzmieteInput] = useState<string>('');
  const [customReferenzmiete, setCustomReferenzmiete] = useState<boolean>(false);
  const [effectiveDate, setEffectiveDate] = useState<string>(() => {
    const date = new Date();
    date.setMonth(date.getMonth() + 3);
    return date.toISOString().split('T')[0];
  });

  // Calculation states
  const [calculation, setCalculation] = useState<CalculationResult | null>(null);
  const [generatedLetter, setGeneratedLetter] = useState<string | null>(null);
  const [generatingLetter, setGeneratingLetter] = useState(false);
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const [pdfHtml, setPdfHtml] = useState<string | null>(null);

  // Filter units when property selected
  const filteredUnits = selectedPropertyId 
    ? units.filter(u => u.propertyId === selectedPropertyId)
    : [];

  // Get selected unit
  const selectedUnit = units.find(u => u.id === selectedUnitId);

  // Auto-update referenzmiete when wohnlage changes
  useEffect(() => {
    if (!customReferenzmiete && selectedWohnlage) {
      const unit = units.find(u => u.id === selectedUnitId);
      const area = unit?.areaM2 ? parseFloat(unit.areaM2) : 70; // Default 70m²
      const pricePerM2 = HAMBURG_MIETSPIEGEL_2025[selectedWohnlage] || 12.80;
      const estimatedRent = Math.round(area * pricePerM2 * 100); // Convert to cents
      setReferenzmieteInput((estimatedRent / 100).toFixed(2));
    }
  }, [selectedWohnlage, selectedUnitId, units, customReferenzmiete]);

  // Calculate eligibility and max increase
  const calculateIncrease = useCallback(() => {
    if (!selectedUnit?.coldRentCents || !referenzmieteInput) return;

    const currentRent = selectedUnit.coldRentCents;
    const referenzmiete = Math.round(parseFloat(referenzmieteInput) * 100);
    const monthsSinceLastIncrease = getMonthsSince(selectedUnit.lastRentIncreaseDate);
    
    // Check eligibility (15 months since last increase)
    const isEligible = monthsSinceLastIncrease >= 15;

    // Kappungsgrenze: 20% in 3 years (or 15% in Milieuschutzgebiet)
    const kappungsgrenzePercent = selectedUnit.isMilieuSchutz ? 15 : 20;
    
    // Calculate max new rent based on referenzmiete (max 20% above referenzmiete after Kappungsgrenze considerations)
    const maxIncreasePercent = 20; // Standard 20% cap on increase from current
    const maxIncreaseAmount = Math.round(currentRent * (maxIncreasePercent / 100));
    
    // But cannot exceed referenzmiete + 20%
    const maxBasedOnReferenzmiete = Math.round(referenzmiete * 1.2);
    
    // The new rent is the lower of: current + maxIncrease OR referenzmiete * 1.2
    let maxNewRent = Math.min(currentRent + maxIncreaseAmount, maxBasedOnReferenzmiete);
    
    // Ensure we don't go below current rent
    maxNewRent = Math.max(maxNewRent, currentRent);

    const increaseAmount = maxNewRent - currentRent;
    const increasePercent = (increaseAmount / currentRent) * 100;
    const isWithinKappungsgrenze = increasePercent <= kappungsgrenzePercent;

    setCalculation({
      currentRent,
      referenzmiete,
      maxNewRent,
      increaseAmount,
      increasePercent,
      isWithinKappungsgrenze,
      kappungsgrenzePercent,
      monthsSinceLastIncrease,
      isEligible: isEligible && isWithinKappungsgrenze && increaseAmount > 0,
    });
  }, [selectedUnit, referenzmieteInput]);

  // Recalculate when inputs change
  useEffect(() => {
    calculateIncrease();
  }, [calculateIncrease]);

  // Generate letter
  const generateLetter = async () => {
    if (!calculation || !selectedUnit) return;
    
    setGeneratingLetter(true);
    try {
      const res = await fetch('/api/tools/mieterhohung-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tenantName: selectedUnit.tenantName || 'Mieter',
          address: `${selectedUnit.designation}, ${properties.find(p => p.id === selectedPropertyId)?.address || ''}`,
          currentRent: calculation.currentRent,
          newRent: calculation.maxNewRent,
          increaseAmount: calculation.increaseAmount,
          increasePercent: calculation.increasePercent,
          referenzmiete: calculation.referenzmiete,
          effectiveDate: effectiveDate,
          isMilieuSchutz: selectedUnit.isMilieuSchutz,
        }),
      });

      if (!res.ok) throw new Error('Fehler bei der Briefgenerierung');
      const { letter } = await res.json();
      setGeneratedLetter(letter);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Fehler beim Generieren des Briefes');
    } finally {
      setGeneratingLetter(false);
    }
  };

  // Download as text file
  const downloadLetter = () => {
    if (!generatedLetter) return;
    const blob = new Blob([generatedLetter], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Mieterhohungsverlangen_${selectedUnit?.tenantName || 'Mieter'}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Generate formal §558a PDF letter
  const generatePdfLetter = async () => {
    if (!calculation || !selectedUnit) return;
    setGeneratingPdf(true);
    try {
      const property = properties.find(p => p.id === selectedPropertyId);
      const res = await fetch('/api/portal/mieterhohung/generate-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tenantName: selectedUnit.tenantName || 'Mieter',
          tenantAddress: `${property?.address || ''}, ${property?.postalCode || ''} ${property?.city || ''}`,
          propertyAddress: property?.address || '',
          propertyCity: property?.city || 'Hamburg',
          unitDesignation: selectedUnit.designation,
          currentRentCents: calculation.currentRent,
          newRentCents: calculation.maxNewRent,
          increaseAmountCents: calculation.increaseAmount,
          increasePercent: calculation.increasePercent,
          referenzmiete: calculation.referenzmiete,
          isMilieuSchutz: selectedUnit.isMilieuSchutz,
          effectiveDate,
        }),
      });
      if (!res.ok) throw new Error('Fehler bei der PDF-Generierung');
      const data = await res.json();
      setPdfHtml(data.html);
      // Open in new tab for print-to-PDF
      const win = window.open('', '_blank');
      if (win) {
        win.document.write(data.html);
        win.document.close();
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Fehler beim Generieren des Briefes');
    } finally {
      setGeneratingPdf(false);
    }
  };

  // Download PDF HTML file
  const downloadPdfHtml = () => {
    if (!pdfHtml) return;
    const blob = new Blob([pdfHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `558a-Mieterhoehungsverlangen_${selectedUnit?.tenantName || 'Mieter'}_${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
      {/* Sidebar */}

      {/* Main Content */}
      <div className="flex-1">
        <div className="max-w-4xl mx-auto px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-navy">Mieterhöhung</h1>
            <p className="text-text-light text-sm mt-0.5">
              § 558 BGB Mieterhöhungsverlangen mit KI-Unterstützung erstellen
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Step 1: Property Selector */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
            <h2 className="font-bold text-navy mb-4 flex items-center gap-2">
              <span className="w-6 h-6 bg-teal text-white rounded-full text-xs flex items-center justify-center font-bold">1</span>
              Immobilie wählen
            </h2>
            <select
              value={selectedPropertyId}
              onChange={(e) => {
                setSelectedPropertyId(e.target.value);
                setSelectedUnitId('');
                setCalculation(null);
                setGeneratedLetter(null);
              }}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition-all"
            >
              <option value="">Immobilie auswählen...</option>
              {properties.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.address}, {p.postalCode} {p.city}
                </option>
              ))}
            </select>
          </div>

          {/* Step 2: Unit Selector */}
          {selectedPropertyId && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
              <h2 className="font-bold text-navy mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-teal text-white rounded-full text-xs flex items-center justify-center font-bold">2</span>
                Einheit wählen
              </h2>
              <select
                value={selectedUnitId}
                onChange={(e) => {
                  setSelectedUnitId(e.target.value);
                  setGeneratedLetter(null);
                }}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition-all"
              >
                <option value="">Einheit auswählen...</option>
                {filteredUnits.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.designation} {u.occupied ? `(Belegt${u.tenantName ? ` - ${u.tenantName}` : ''})` : '(Leer)'}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Step 3: Current Rent Display & Eligibility */}
          {selectedUnit && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
              <h2 className="font-bold text-navy mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-teal text-white rounded-full text-xs flex items-center justify-center font-bold">3</span>
                Aktuelle Miete & Berechtigungsprüfung
              </h2>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-xs text-text-light uppercase tracking-wide mb-1">Aktuelle Kaltmiete</p>
                  <p className="text-xl font-bold text-navy">{formatEuro(selectedUnit.coldRentCents)}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-xs text-text-light uppercase tracking-wide mb-1">Letzte Erhöhung</p>
                  <p className="text-xl font-bold text-navy">
                    {selectedUnit.lastRentIncreaseDate 
                      ? new Date(selectedUnit.lastRentIncreaseDate).toLocaleDateString('de-DE')
                      : 'Keine'}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-xs text-text-light uppercase tracking-wide mb-1">Monate seit Erhöhung</p>
                  <p className="text-xl font-bold text-navy">
                    {getMonthsSince(selectedUnit.lastRentIncreaseDate)}
                  </p>
                </div>
              </div>

              {/* Eligibility Status */}
              {calculation && (
                <div className={`p-4 rounded-xl ${calculation.isEligible ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}>
                  <div className="flex items-center gap-3">
                    {calculation.isEligible ? (
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    )}
                    <div>
                      <p className={`font-semibold ${calculation.isEligible ? 'text-green-800' : 'text-amber-800'}`}>
                        {calculation.isEligible 
                          ? '§ 558 BGB Mieterhöhung ist zulässig' 
                          : 'Mieterhöhung derzeit nicht möglich'}
                      </p>
                      <p className={`text-sm ${calculation.isEligible ? 'text-green-700' : 'text-amber-700'}`}>
                        {!calculation.isEligible && calculation.monthsSinceLastIncrease < 15 
                          ? `Nur ${calculation.monthsSinceLastIncrease} von 15 erforderlichen Monaten vergangen`
                          : !calculation.isEligible && !calculation.isWithinKappungsgrenze
                          ? `Erhöhung würde Kappungsgrenze von ${calculation.kappungsgrenzePercent}% überschreiten`
                          : 'Alle Voraussetzungen erfüllt'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Mietspiegel Input */}
          {selectedUnit && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
              <h2 className="font-bold text-navy mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-teal text-white rounded-full text-xs flex items-center justify-center font-bold">4</span>
                Mietspiegel & Vergleichsmiete
              </h2>

              {/* Wohnlage Selector */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-navy mb-2">Wohnlage (Hamburg Mietspiegel 2025)</label>
                <select
                  value={selectedWohnlage}
                  onChange={(e) => {
                    setSelectedWohnlage(e.target.value);
                    setCustomReferenzmiete(false);
                  }}
                  disabled={customReferenzmiete}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition-all disabled:bg-gray-100"
                >
                  {WOHNLAGE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label} — ca. {opt.price.toFixed(2)} €/m²
                    </option>
                  ))}
                </select>
              </div>

              {/* Custom Referenzmiete Input */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-navy">Ortsübliche Vergleichsmiete (Kaltmiete)</label>
                  <label className="flex items-center gap-2 text-sm text-text-light cursor-pointer">
                    <input
                      type="checkbox"
                      checked={customReferenzmiete}
                      onChange={(e) => setCustomReferenzmiete(e.target.checked)}
                      className="rounded border-gray-300 text-teal focus:ring-teal"
                    />
                    Eigenen Wert eingeben
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    value={referenzmieteInput}
                    onChange={(e) => setReferenzmieteInput(e.target.value)}
                    disabled={!customReferenzmiete}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition-all disabled:bg-gray-100 pr-12"
                    placeholder="0.00"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-light">€</span>
                </div>
                <p className="text-xs text-text-light mt-1">
                  Berechnet für ca. {selectedUnit.areaM2 || 70} m² Wohnfläche
                </p>
              </div>
            </div>
          )}

          {/* Step 5: Increase Calculator */}
          {calculation && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
              <h2 className="font-bold text-navy mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-teal text-white rounded-full text-xs flex items-center justify-center font-bold">5</span>
                Erhöhungsberechnung
              </h2>

              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-xs text-text-light uppercase tracking-wide mb-1">Neue Kaltmiete</p>
                  <p className="text-xl font-bold text-navy">{formatEuro(calculation.maxNewRent)}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-xs text-text-light uppercase tracking-wide mb-1">Erhöhung</p>
                  <p className="text-xl font-bold text-teal">+{formatEuro(calculation.increaseAmount)}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-xs text-text-light uppercase tracking-wide mb-1">Erhöhung in %</p>
                  <p className="text-xl font-bold text-navy">+{calculation.increasePercent.toFixed(1)}%</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-xs text-text-light uppercase tracking-wide mb-1">Kappungsgrenze</p>
                  <p className="text-xl font-bold text-navy">{calculation.kappungsgrenzePercent}%</p>
                  <p className="text-xs text-text-light">in 3 Jahren</p>
                </div>
              </div>

              {/* Milieuschutz Warning */}
              {selectedUnit?.isMilieuSchutz && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
                  <strong>Milieuschutzgebiet:</strong> Die Kappungsgrenze beträgt hier nur 15% in 3 Jahren (§ 557 Abs. 4 BGB).
                </div>
              )}
            </div>
          )}

          {/* Step 6: Effective Date */}
          {calculation && calculation.isEligible && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
              <h2 className="font-bold text-navy mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-teal text-white rounded-full text-xs flex items-center justify-center font-bold">6</span>
                Wirksamkeitsdatum
              </h2>
              <input
                type="date"
                value={effectiveDate}
                onChange={(e) => setEffectiveDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition-all"
              />
              <p className="text-xs text-text-light mt-2">
                Mindestens 3 Monate nach Zugang des Schreibens (§ 558a Abs. 1 BGB)
              </p>
            </div>
          )}

          {/* Step 7: Letter Generator */}
          {calculation?.isEligible && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
              <h2 className="font-bold text-navy mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-teal text-white rounded-full text-xs flex items-center justify-center font-bold">7</span>
                Mieterhöhungsverlangen erstellen
              </h2>

              {/* PDF Letter (§558a formal) */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-teal uppercase tracking-wide">Empfohlen</span>
                  <span className="text-xs text-text-light">— Formelles §558a BGB Schreiben als druckfertiges PDF</span>
                </div>
                <button
                  onClick={generatePdfLetter}
                  disabled={generatingPdf}
                  className="w-full bg-teal text-white px-5 py-3 rounded-xl font-semibold hover:bg-navy transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {generatingPdf ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      PDF wird erstellt…
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      §558a Schreiben als PDF öffnen
                    </>
                  )}
                </button>
                {pdfHtml && (
                  <button
                    onClick={downloadPdfHtml}
                    className="mt-2 w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-teal text-teal font-semibold hover:bg-teal/5 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    HTML-Datei herunterladen (für Druck)
                  </button>
                )}
              </div>

              <div className="border-t border-gray-100 pt-4">
                <p className="text-xs text-text-light mb-3">Alternativ: KI-generierter Brieftext</p>
                {!generatedLetter ? (
                  <button
                    onClick={generateLetter}
                    disabled={generatingLetter}
                    className="w-full bg-white border border-gray-200 text-navy px-5 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {generatingLetter ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Brief wird generiert...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        KI-Brieftext generieren
                      </>
                    )}
                  </button>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 max-h-96 overflow-y-auto">
                      <pre className="text-sm text-navy whitespace-pre-wrap font-sans">{generatedLetter}</pre>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={downloadLetter}
                        className="flex-1 bg-gray-100 text-navy px-5 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Als Text herunterladen
                      </button>
                      <button
                        onClick={() => setGeneratedLetter(null)}
                        className="px-5 py-3 rounded-xl border border-gray-200 text-navy font-medium hover:bg-gray-50 transition-colors"
                      >
                        Neu generieren
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Info Box */}
          <div className="bg-navy/5 rounded-2xl border border-navy/10 p-6">
            <h3 className="font-semibold text-navy mb-2 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Rechtliche Hinweise
            </h3>
            <ul className="text-sm text-text-light space-y-1">
              <li>• § 558 BGB: Mieterhöhung auf die ortsübliche Vergleichsmiete möglich</li>
              <li>• § 558a BGB: Begründung der Erhöhung erforderlich (Mietspiegel, Vergleichsobjekte)</li>
              <li>• § 558 Abs. 3 BGB: Kappungsgrenze von 20% innerhalb von 3 Jahren (15% in Milieuschutzgebieten)</li>
              <li>• § 558a Abs. 1 BGB: Wirksamkeitsdatum mindestens 3 Monate nach Zugang</li>
              <li>• § 558b BGB: Zustimmungsfiktion — Mieter gilt als zugestimmt, wenn nicht innerhalb 2 Monaten widersprochen</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
