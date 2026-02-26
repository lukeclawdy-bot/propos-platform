"use client";

import { useState } from "react";
import Link from "next/link";

interface Property {
  id: string;
  address: string;
  city: string;
  unitsCount: number;
}

interface Unit {
  id: string;
  propertyId: string;
  designation: string;
  areaM2: string | null;
  floor: number | null;
  rooms: string | null;
  coldRentCents: number | null;
  occupied: boolean;
  tenantName: string | null;
}

interface EinheitenClientProps {
  initialProperties: Property[];
  initialUnits: Unit[];
  isDemo: boolean;
}

export function EinheitenClient({ initialProperties, initialUnits, isDemo }: EinheitenClientProps) {
  const [properties] = useState<Property[]>(initialProperties);
  const [units] = useState<Unit[]>(initialUnits);
  const [showModal, setShowModal] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState("");
  const [formData, setFormData] = useState({
    designation: "",
    floor: "",
    areaM2: "",
    rooms: "",
    coldRent: "",
  });

  function formatRent(cents: number | null): string {
    if (!cents) return "—";
    return `€${(cents / 100).toLocaleString("de-DE", { minimumFractionDigits: 2 })}`;
  }

  const unitsByProperty = properties.map((prop) => ({
    ...prop,
    units: units.filter((u) => u.propertyId === prop.id),
  }));

  return (
    <div className="max-w-5xl mx-auto px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy">Einheiten</h1>
          <p className="text-text-light text-sm mt-0.5">
            Verwalten Sie Ihre Wohnungen und Gewerbeeinheiten
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          disabled={isDemo}
          className="bg-teal hover:bg-teal/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          {isDemo ? "Nur im Live-Portal verfügbar" : "Einheit hinzufügen"}
        </button>
      </div>

      {unitsByProperty.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <div className="text-4xl mb-3">🏢</div>
          <p className="text-navy font-semibold">Noch keine Objekte</p>
          <p className="text-text-light text-sm mt-1">
            Fügen Sie zuerst ein Objekt im Onboarding hinzu.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {unitsByProperty.map((prop) => (
            <div key={prop.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-50 bg-gray-50/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-semibold text-navy">{prop.address}</h2>
                    <p className="text-text-light text-sm">
                      {prop.city} · {prop.unitsCount} Einheiten
                    </p>
                  </div>
                </div>
              </div>

              {prop.units.length === 0 ? (
                <div className="px-6 py-8 text-center text-text-light text-sm">
                  Keine Einheiten in diesem Objekt
                </div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="text-xs text-text-light uppercase tracking-wide bg-gray-50">
                      <th className="px-6 py-3 text-left">Bezeichnung</th>
                      <th className="px-6 py-3 text-left">Etage</th>
                      <th className="px-6 py-3 text-left">Fläche</th>
                      <th className="px-6 py-3 text-left">Zimmer</th>
                      <th className="px-6 py-3 text-left">Kaltmiete</th>
                      <th className="px-6 py-3 text-left">Status</th>
                      <th className="px-6 py-3 text-left">Mieter</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prop.units.map((unit) => (
                      <tr key={unit.id} className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-navy">{unit.designation}</td>
                        <td className="px-6 py-4 text-sm text-text-light">
                          {unit.floor !== null ? `${unit.floor}.` : "—"}
                        </td>
                        <td className="px-6 py-4 text-sm text-text-light">
                          {unit.areaM2 ? `${unit.areaM2} m²` : "—"}
                        </td>
                        <td className="px-6 py-4 text-sm text-text-light">{unit.rooms || "—"}</td>
                        <td className="px-6 py-4 text-sm font-medium text-navy">{formatRent(unit.coldRentCents)}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            unit.occupied ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"
                          }`}>
                            {unit.occupied ? "Besetzt" : "Leer"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-text-light">{unit.tenantName || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal - only shown in non-demo mode */}
      {showModal && !isDemo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <h2 className="text-lg font-bold text-navy mb-4">Neue Einheit hinzufügen</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-navy mb-1">Objekt</label>
                <select
                  required
                  value={selectedPropertyId}
                  onChange={(e) => setSelectedPropertyId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal"
                >
                  <option value="">Objekt auswählen...</option>
                  {properties.map((prop) => (
                    <option key={prop.id} value={prop.id}>
                      {prop.address}
                    </option>
                  ))}
                </select>
              </div>
              <p className="text-sm text-text-light">
                Formular im Demo-Modus deaktiviert.
              </p>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 text-text-light rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  Abbrechen
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
