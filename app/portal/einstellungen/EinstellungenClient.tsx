"use client";

import { useState } from "react";

type Landlord = {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  companyName: string | null;
  type: string;
  communicationChannel: string | null;
  aiAutonomyLevel: string | null;
  emailNewTicket: boolean;
  emailRentOverdue: boolean;
  emailDailyDigest: boolean;
  onboardingCompleted: boolean;
  createdAt: string;
  updatedAt: string;
};

interface EinstellungenClientProps {
  landlord: Landlord;
}

export function EinstellungenClient({ landlord }: EinstellungenClientProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: landlord.name || "",
    phone: landlord.phone || "",
    companyName: landlord.companyName || "",
    emailNewTicket: landlord.emailNewTicket ?? true,
    emailRentOverdue: landlord.emailRentOverdue ?? true,
    emailDailyDigest: landlord.emailDailyDigest ?? false,
  });

  const handleToggle = (field: keyof typeof formData) => {
    setFormData((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage(null);
    
    try {
      const res = await fetch("/api/portal/landlord", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: landlord.id,
          ...formData,
        }),
      });

      if (!res.ok) {
        throw new Error("Speichern fehlgeschlagen");
      }

      setSaveMessage({ type: "success", text: "Einstellungen gespeichert" });
      
      // Clear success message after 3 seconds
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (error) {
      setSaveMessage({ type: "error", text: "Fehler beim Speichern. Bitte versuchen Sie es erneut." });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-navy">Einstellungen</h1>
        <p className="text-text-light text-sm mt-0.5">
          Verwalten Sie Ihre Profilinformationen und Benachrichtigungseinstellungen.
        </p>
      </div>

      {/* Save Message */}
      {saveMessage && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            saveMessage.type === "success"
              ? "bg-green-50 border border-green-200 text-green-700"
              : "bg-red-50 border border-red-200 text-red-700"
          }`}
        >
          <p className="text-sm font-medium">{saveMessage.text}</p>
        </div>
      )}

      <div className="space-y-6">
        {/* Profile Section */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
            <h2 className="font-semibold text-navy">Profil</h2>
            <p className="text-xs text-text-light mt-0.5">Ihre persönlichen Daten</p>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-navy mb-1.5">
                E-Mail-Adresse
              </label>
              <input
                type="email"
                id="email"
                value={landlord.email}
                disabled
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 cursor-not-allowed"
              />
              <p className="text-xs text-text-light mt-1">Die E-Mail-Adresse kann nicht geändert werden.</p>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-navy mb-1.5">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Ihr vollständiger Name"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-navy mb-1.5">
                Telefonnummer
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="+49 123 456789"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal"
              />
            </div>

            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-navy mb-1.5">
                Firmenname (optional)
              </label>
              <input
                type="text"
                id="companyName"
                value={formData.companyName}
                onChange={(e) => handleChange("companyName", e.target.value)}
                placeholder="Ihre Firma"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal"
              />
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
            <h2 className="font-semibold text-navy">Benachrichtigungen</h2>
            <p className="text-xs text-text-light mt-0.5">Wählen Sie, wann Sie per E-Mail informiert werden möchten</p>
          </div>
          <div className="p-6 space-y-4">
            {/* New Ticket Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-navy">E-Mail bei neuem Ticket</h3>
                <p className="text-xs text-text-light mt-0.5">
                  Erhalten Sie eine E-Mail, wenn ein Mieter ein neues Anliegen einreicht.
                </p>
              </div>
              <button
                onClick={() => handleToggle("emailNewTicket")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  formData.emailNewTicket ? "bg-teal" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    formData.emailNewTicket ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="border-t border-gray-100" />

            {/* Rent Overdue Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-navy">E-Mail bei überfälliger Miete</h3>
                <p className="text-xs text-text-light mt-0.5">
                  Erhalten Sie eine E-Mail, wenn eine Mietzahlung überfällig ist.
                </p>
              </div>
              <button
                onClick={() => handleToggle("emailRentOverdue")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  formData.emailRentOverdue ? "bg-teal" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    formData.emailRentOverdue ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="border-t border-gray-100" />

            {/* Daily Digest Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-navy">Tägliche Zusammenfassung</h3>
                <p className="text-xs text-text-light mt-0.5">
                  Erhalten Sie jeden Morgen eine E-Mail mit den wichtigsten Aktivitäten des Tages.
                </p>
              </div>
              <button
                onClick={() => handleToggle("emailDailyDigest")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  formData.emailDailyDigest ? "bg-teal" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    formData.emailDailyDigest ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Account Info */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
            <h2 className="font-semibold text-navy">Kontoinformationen</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-navy">Kontotyp</span>
              <span className="text-sm text-text-light capitalize">
                {landlord.type === "private" ? "Privat" : "Gewerblich"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-navy">Registriert am</span>
              <span className="text-sm text-text-light">
                {new Date(landlord.createdAt).toLocaleDateString("de-DE")}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-navy">Onboarding abgeschlossen</span>
              <span className="text-sm text-text-light">
                {landlord.onboardingCompleted ? "Ja" : "Nein"}
              </span>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2.5 bg-navy text-white rounded-lg text-sm font-medium hover:bg-navy/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Wird gespeichert...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Änderungen speichern
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
