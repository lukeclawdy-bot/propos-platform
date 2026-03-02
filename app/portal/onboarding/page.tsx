"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────
type EigentuemerTyp = "privat" | "profi" | null;


interface WizardData {
  // Step 1
  eigentuemerTyp: EigentuemerTyp;
  // Step 2
  portfolioGroesse: string;
  // Step 3
  struktur: string;
  // Step 4
  strasse: string;
  plz: string;
  stadt: string;
  verwaltungstyp: string; // miet | weg | sev
  einheitenAnzahl: number;
  // Step 5
  // Step 6
  vorname: string;
  nachname: string;
  email: string;
  telefon: string;
  unternehmen: string;
  agbAkzeptiert: boolean;
}

const DRAFT_KEY = "ev-onboarding-draft";
const TOTAL_STEPS = 6;

const STEP_LABELS = ["Typ", "Größe", "Struktur", "Objekt", "Kontakt", "Fertig"];

function defaultData(): WizardData {
  return {
    eigentuemerTyp: null,
    portfolioGroesse: "",
    struktur: "",
    strasse: "",
    plz: "",
    stadt: "",
    verwaltungstyp: "miet",
    einheitenAnzahl: 1,
    vorname: "",
    nachname: "",
    telefon: "",
    unternehmen: "",
    agbAkzeptiert: false,
  };
}

// ─── Progress Stepper ─────────────────────────────────────────────────────────
function ProgressStepper({ step }: { step: number }) {
  if (step === TOTAL_STEPS) return null;

  return (
    <div className="mb-10">
      <div className="flex items-start justify-between gap-1">
        {STEP_LABELS.map((label, idx) => {
          const n = idx + 1;
          const isActive = n === step;
          const isDone = n < step;
          const isFuture = n > step;

          return (
            <div key={n} className="flex flex-col items-center flex-1">
              {/* Dot */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-200
                  ${isActive ? "bg-teal border-teal text-white" : ""}
                  ${isDone ? "bg-teal border-teal text-white" : ""}
                  ${isFuture ? "bg-white border-gray-200 text-gray-400" : ""}
                `}
              >
                {isDone ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  n
                )}
              </div>
              {/* Connector line (between dots) */}
              {idx < STEP_LABELS.length - 1 && (
                <div className="absolute" />
              )}
              {/* Label */}
              <span
                className={`mt-1.5 text-[10px] font-medium text-center leading-tight
                  ${isActive ? "text-teal" : isDone ? "text-teal/70" : "text-gray-400"}
                `}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
      {/* Connecting line */}
      <div className="relative -mt-8 flex items-center justify-between px-4 z-[-1]">
        <div className="absolute left-0 right-0 h-0.5 bg-gray-200 top-3.5 mx-6" />
        <div
          className="absolute left-0 h-0.5 bg-teal top-3.5 ml-6 transition-all duration-500"
          style={{ width: `calc(${((step - 1) / (TOTAL_STEPS - 1)) * 100}% - 3rem)` }}
        />
      </div>
    </div>
  );
}

// ─── SelectionCard ────────────────────────────────────────────────────────────
function SelectionCard({
  selected,
  onClick,
  icon,
  title,
  subtitle,
  perks,
}: {
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  perks: string[];
}) {
  return (
    <button
      onClick={onClick}
      className={`relative w-full text-left p-7 rounded-2xl border-2 transition-all duration-200 cursor-pointer
        ${selected
          ? "border-teal bg-teal/5 shadow-lg scale-[1.02]"
          : "border-gray-200 bg-white hover:border-teal/40 hover:shadow-md"
        }`}
    >
      {/* Checkmark */}
      <div
        className={`absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200
          ${selected ? "bg-teal opacity-100 scale-100" : "opacity-0 scale-75"}`}
      >
        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      {/* Icon */}
      <div
        className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-colors duration-200
          ${selected ? "bg-teal text-white" : "bg-navy/8 text-navy"}`}
      >
        {icon}
      </div>

      <h3 className="font-bold text-xl text-navy mb-1">{title}</h3>
      <p className="text-sm text-text-light mb-4">{subtitle}</p>

      <ul className="space-y-2">
        {perks.map((p) => (
          <li key={p} className="flex items-center gap-2 text-sm text-text-main">
            <svg className="w-4 h-4 text-teal flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            {p}
          </li>
        ))}
      </ul>
    </button>
  );
}

// ─── RadioRow ─────────────────────────────────────────────────────────────────
function RadioRow({
  label,
  selected,
  onClick,
  tooltip,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  tooltip?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl border-2 text-left transition-all duration-150 cursor-pointer
        ${selected
          ? "border-teal bg-teal/5"
          : "border-gray-200 bg-white hover:border-teal/40 hover:bg-gray-50"
        }`}
    >
      <div
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors
          ${selected ? "border-teal bg-teal" : "border-gray-300"}`}
      >
        {selected && <div className="w-2 h-2 rounded-full bg-white" />}
      </div>
      <span className={`text-sm font-medium ${selected ? "text-navy" : "text-gray-700"}`}>{label}</span>
      {tooltip && (
        <span className="relative group ml-auto flex-shrink-0" onClick={(e) => e.stopPropagation()}>
          <svg className="w-4 h-4 text-gray-400 hover:text-teal transition-colors cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="absolute right-0 bottom-full mb-2 w-52 bg-navy text-white text-xs rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-20 text-center shadow-lg leading-relaxed">
            {tooltip}
          </span>
        </span>
      )}
    </button>
  );
}

// ─── STEP 1: Eigentümer-Typ ───────────────────────────────────────────────────
function Step1({
  data,
  onSelect,
}: {
  data: WizardData;
  onSelect: (typ: EigentuemerTyp) => void;
}) {
  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-navy mb-3">Wie verwalten Sie Ihre Immobilien?</h1>
        <p className="text-text-light">Wir passen Ihr Setup genau auf Sie an.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <SelectionCard
          selected={data.eigentuemerTyp === "privat"}
          onClick={() => onSelect("privat")}
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          }
          title="Privateigentümer"
          subtitle="1–10 Einheiten"
          perks={["Persönliche Betreuung", "Schneller Start", "Ideal für kleinere Bestände"]}
        />
        <SelectionCard
          selected={data.eigentuemerTyp === "profi"}
          onClick={() => onSelect("profi")}
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          }
          title="Portfolio-Eigentümer / Unternehmen"
          subtitle="11+ Einheiten oder mehrere Gebäude"
          perks={["Portfolio-Import (CSV)", "Skalierbare Prozesse", "Geeignet für Unternehmen & Family Offices"]}
        />
      </div>

      <p className="text-center mt-8 text-sm text-text-light">
        Bereits registriert?{" "}
        <Link href="/portal/login" className="text-teal font-medium hover:underline">Hier anmelden</Link>
      </p>
    </div>
  );
}

// ─── STEP 2: Portfolio-Größe ──────────────────────────────────────────────────
function Step2({
  data,
  _update,
  onSelect,
}: {
  data: WizardData;
  update: (d: Partial<WizardData>) => void;
  onSelect: (val: string) => void;
}) {
  const privatOptions = ["1", "2–5", "6–10"];
  const profiOptions = ["11–50", "51–200", "200+"];
  const options = data.eigentuemerTyp === "privat" ? privatOptions : profiOptions;

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-navy mb-3">Wie viele Einheiten verwalten Sie insgesamt?</h1>
      </div>

      <div className="space-y-3">
        {options.map((opt) => (
          <RadioRow
            key={opt}
            label={opt}
            selected={data.portfolioGroesse === opt}
            onClick={() => onSelect(opt)}
          />
        ))}
      </div>

    </div>
  );
}

// ─── STEP 3: Struktur ─────────────────────────────────────────────────────────
function Step3({
  data,
  onSelect,
}: {
  data: WizardData;
  onSelect: (val: string) => void;
}) {
  const privatOptions = [
    { label: "Eine einzelne Einheit", tooltip: "z. B. eine Eigentumswohnung" },
    { label: "Mehrere Einheiten im selben Gebäude", tooltip: "z. B. 3 Wohnungen in einem Haus" },
    { label: "Einheiten in mehreren Gebäuden", tooltip: "z. B. Portfolio über mehrere Standorte" },
  ];
  const profiOptions: Array<string | { label: string; tooltip?: string }> = [
    "Hauptsächlich WEG-Verwaltung",
    "Hauptsächlich Mietverwaltung",
    "Gemischt (WEG + Miet)",
    "Gewerbe oder Sonderobjekte",
  ];
  const options: Array<string | { label: string; tooltip?: string }> = data.eigentuemerTyp === "privat" ? privatOptions : profiOptions;

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-navy mb-3">Wie ist Ihr Portfolio strukturiert?</h1>
      </div>

      <div className="space-y-3">
        {options.map((opt) => {
          const label = typeof opt === "string" ? opt : opt.label;
          const tooltip = typeof opt === "string" ? undefined : opt.tooltip;
          return (
            <RadioRow
              key={label}
              label={label}
              tooltip={tooltip}
              selected={data.struktur === label}
              onClick={() => onSelect(label)}
            />
          );
        })}
      </div>
    </div>
  );
}

// ─── STEP 4: Erstes Objekt ─────────────────────────────────────────────────────
function Step4({
  data,
  update,
  onWeiter,
  onSkip,
}: {
  data: WizardData;
  update: (d: Partial<WizardData>) => void;
  onWeiter: () => void;
  onSkip: () => void;
}) {
  const canProceed = data.strasse.trim().length > 0 && data.plz.trim().length > 0;

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-navy mb-3">Ihr erstes Objekt</h1>
        <p className="text-text-light">Sie können weitere Objekte jederzeit später hinzufügen.</p>
      </div>

      <div className="space-y-5 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        {/* Straße & Hausnummer */}
        <div>
          <label className="block text-sm font-medium text-navy mb-1">Straße &amp; Hausnummer</label>
          <input
            type="text"
            value={data.strasse}
            onChange={(e) => update({ strasse: e.target.value })}
            placeholder="Musterstraße 12a"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30"
          />
        </div>

        {/* PLZ + Stadt */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-navy mb-1">PLZ</label>
            <input
              type="text"
              value={data.plz}
              onChange={(e) => update({ plz: e.target.value })}
              placeholder="20095"
              maxLength={5}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1">Stadt</label>
            <input
              type="text"
              value={data.stadt}
              onChange={(e) => update({ stadt: e.target.value })}
              placeholder="Hamburg"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30"
            />
          </div>
        </div>

        {/* Verwaltungstyp */}
        <div>
          <label className="block text-sm font-medium text-navy mb-2">Verwaltungstyp</label>
          <div className="flex gap-3 flex-wrap">
            {[
              { val: "miet", label: "Mietverwaltung" },
              { val: "weg", label: "WEG" },
              { val: "sev", label: "Sondereigentum (SEV)" },
            ].map(({ val, label }) => (
              <button
                key={val}
                type="button"
                onClick={() => update({ verwaltungstyp: val })}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  data.verwaltungstyp === val
                    ? "bg-teal text-white border-teal"
                    : "bg-white text-gray-600 border-gray-200 hover:border-teal/50"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Anzahl Einheiten */}
        <div>
          <label className="block text-sm font-medium text-navy mb-2">Anzahl Einheiten</label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => update({ einheitenAnzahl: Math.max(1, data.einheitenAnzahl - 1) })}
              className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-lg font-bold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              −
            </button>
            <span className="w-16 text-center text-lg font-bold text-navy">{data.einheitenAnzahl}</span>
            <button
              type="button"
              onClick={() => update({ einheitenAnzahl: Math.min(200, data.einheitenAnzahl + 1) })}
              className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-lg font-bold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center gap-4">
        <button
          type="button"
          disabled={!canProceed}
          onClick={onWeiter}
          className="w-full py-3 bg-teal text-white font-semibold rounded-xl hover:bg-teal/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Weiter →
        </button>
        <button
          type="button"
          onClick={onSkip}
          className="text-sm text-text-light hover:text-navy transition-colors"
        >
          Objekt später hinzufügen →
        </button>
      </div>
    </div>
  );
}


// ─── STEP 6: Kontaktdaten & Vertrag ───────────────────────────────────────────
function Step6({
  data,
  update,
  onSubmit,
  submitting,
  submitError,
}: {
  data: WizardData;
  update: (d: Partial<WizardData>) => void;
  onSubmit: () => void;
  submitting: boolean;
  submitError: string | null;
}) {
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((data.email ?? "").trim());
  const phoneValid = !data.telefon?.trim() || /^[+0-9][0-9 ()\-]{6,}$/.test(data.telefon.trim());
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const canSubmit =
    (data.vorname ?? "").trim().length > 0 &&
    (data.nachname ?? "").trim().length > 0 &&
    emailValid &&
    phoneValid &&
    data.agbAkzeptiert;

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-navy mb-3">Fast fertig — Ihre Kontaktdaten</h1>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-5">
        {/* Vorname + Nachname */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-navy mb-1">Vorname</label>
            <input
              type="text"
              value={data.vorname}
              onChange={(e) => update({ vorname: e.target.value })}
              placeholder="Max"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1">Nachname</label>
            <input
              type="text"
              value={data.nachname}
              onChange={(e) => update({ nachname: e.target.value })}
              placeholder="Mustermann"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30"
            />
          </div>
        </div>

        {/* E-Mail */}
        <div>
          <label className="block text-sm font-medium text-navy mb-1">E-Mail-Adresse</label>
          <input
            type="email"
            value={data.email}
            onBlur={() => setTouched(t => ({ ...t, email: true }))}
            onChange={(e) => update({ email: e.target.value })}
            placeholder="max@mustermann.de"
            className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-colors ${
              touched.email && !emailValid
                ? "border-red-300 focus:ring-red-200 bg-red-50"
                : "border-gray-200 focus:ring-teal/30"
            }`}
          />
          {touched.email && !emailValid && (
            <p className="text-red-500 text-xs mt-1">Bitte geben Sie eine gültige E-Mail-Adresse ein.</p>
          )}
        </div>

        {/* Telefon */}
        <div>
          <label className="block text-sm font-medium text-navy mb-1">
            Telefon <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            type="tel"
            value={data.telefon}
            onBlur={() => setTouched(t => ({ ...t, telefon: true }))}
            onChange={(e) => update({ telefon: e.target.value })}
            placeholder="+49 40 123456789"
            className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-colors ${
              touched.telefon && data.telefon.trim() && !phoneValid
                ? "border-red-300 focus:ring-red-200 bg-red-50"
                : "border-gray-200 focus:ring-teal/30"
            }`}
          />
          {touched.telefon && data.telefon.trim() && !phoneValid && (
            <p className="text-red-500 text-xs mt-1">Bitte geben Sie eine gültige Telefonnummer ein (z. B. +49 40 123456).</p>
          )}
        </div>

        {/* Unternehmen (nur für Portfolio-Eigentümer) */}
        {data.eigentuemerTyp === "profi" && (
          <div>
            <label className="block text-sm font-medium text-navy mb-1">
              Unternehmen / Firma <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={data.unternehmen}
              onChange={(e) => update({ unternehmen: e.target.value })}
              placeholder="Muster Immobilien GmbH"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30"
            />
          </div>
        )}

        {/* AGB Checkbox */}
        <label className="flex items-start gap-3 cursor-pointer bg-gray-50 rounded-xl p-4">
          <input
            type="checkbox"
            checked={data.agbAkzeptiert}
            onChange={(e) => update({ agbAkzeptiert: e.target.checked })}
            className="mt-0.5 accent-teal flex-shrink-0 w-4 h-4"
          />
          <span className="text-sm text-navy">
            Ich akzeptiere die{" "}
            <Link href="/agb" className="text-teal hover:underline" target="_blank">AGB</Link>
            {" "}und{" "}
            <Link href="/datenschutz" className="text-teal hover:underline" target="_blank">Datenschutzerklärung</Link>
          </span>
        </label>
      </div>

      {submitError && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-600">
          {submitError}
        </div>
      )}

      <button
        type="button"
        disabled={!canSubmit || submitting}
        onClick={onSubmit}
        className="mt-6 w-full py-4 bg-teal text-white font-semibold rounded-xl hover:bg-teal/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-base"
      >
        {submitting ? (
          <>
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Wird erstellt…
          </>
        ) : (
          "Konto erstellen & loslegen →"
        )}
      </button>
    </div>
  );
}

// ─── STEP 7: Erfolg ───────────────────────────────────────────────────────────
function Step7() {
  return (
    <div className="text-center">
      {/* Checkmark */}
      <div className="w-20 h-20 rounded-full bg-teal/10 flex items-center justify-center mx-auto mb-6">
        <div className="w-14 h-14 rounded-full bg-teal flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      <h1 className="text-3xl font-bold text-navy mb-3">Willkommen bei einfach verwaltet. 🎉</h1>
      <p className="text-text-light mb-10">
        Ihr Konto ist eingerichtet. Sie erhalten in Kürze eine E-Mail zur Bestätigung.
      </p>

      {/* Next-step cards */}
      <div className="grid md:grid-cols-3 gap-4 text-left mb-8">
        <Link
          href="/portal/dashboard"
          className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-teal/40 hover:shadow-md transition-all group"
        >
          <div className="w-10 h-10 bg-teal/10 rounded-xl flex items-center justify-center mb-3 group-hover:bg-teal/20 transition-colors">
            <svg className="w-5 h-5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </div>
          <h3 className="font-bold text-navy text-sm mb-1">Portal erkunden →</h3>
          <p className="text-xs text-text-light">Zum Dashboard</p>
        </Link>

        <Link
          href="/portal/onboarding/objekt"
          className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-teal/40 hover:shadow-md transition-all group"
        >
          <div className="w-10 h-10 bg-teal/10 rounded-xl flex items-center justify-center mb-3 group-hover:bg-teal/20 transition-colors">
            <svg className="w-5 h-5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <h3 className="font-bold text-navy text-sm mb-1">Objekt vervollständigen →</h3>
          <p className="text-xs text-text-light">Einheiten, Mieter, Dokumente</p>
        </Link>

        <Link
          href="/demo"
          className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-teal/40 hover:shadow-md transition-all group"
        >
          <div className="w-10 h-10 bg-teal/10 rounded-xl flex items-center justify-center mb-3 group-hover:bg-teal/20 transition-colors">
            <svg className="w-5 h-5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="font-bold text-navy text-sm mb-1">Demo ansehen →</h3>
          <p className="text-xs text-text-light">Alle Funktionen live erleben</p>
        </Link>
      </div>

      <p className="text-sm text-text-light">
        Haben Sie Fragen? Schreiben Sie uns:{" "}
        <a href="mailto:anfrage@immo.einfach-verwaltet.de" className="text-teal hover:underline">
          anfrage@immo.einfach-verwaltet.de
        </a>
      </p>
    </div>
  );
}

// ─── Main Wizard ──────────────────────────────────────────────────────────────
export default function OnboardingWizardPage() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<WizardData>(defaultData());
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Load draft on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(DRAFT_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<WizardData> & { mieterOption?: unknown; mieter?: unknown; _step?: number };
        // If draft has stale keys from old schema, discard it entirely
        if ('mieterOption' in parsed || 'mieter' in parsed) {
          localStorage.removeItem(DRAFT_KEY);
        } else {
          // Merge safely — ensure all string fields are strings, not undefined
          setData((prev) => ({
            ...prev,
            ...parsed,
            email: typeof parsed.email === 'string' ? parsed.email : prev.email,
            telefon: typeof parsed.telefon === 'string' ? parsed.telefon : prev.telefon,
            vorname: typeof parsed.vorname === 'string' ? parsed.vorname : prev.vorname,
            nachname: typeof parsed.nachname === 'string' ? parsed.nachname : prev.nachname,
            unternehmen: typeof parsed.unternehmen === 'string' ? parsed.unternehmen : prev.unternehmen,
          }));
          // Restore step if in-progress (not on success step)
          const savedStep = parsed._step;
          if (savedStep && savedStep > 1 && savedStep < TOTAL_STEPS) {
            setStep(savedStep);
          }
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const saveDraft = useCallback((d: WizardData, currentStep: number) => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ ...d, _step: currentStep }));
    } catch {
      // ignore quota errors
    }
  }, []);

  function update(patch: Partial<WizardData>) {
    setData((prev) => {
      const next = { ...prev, ...patch };
      saveDraft(next, step);
      return next;
    });
  }

  function goTo(n: number) {
    setStep(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function next() {
    goTo(Math.min(TOTAL_STEPS, step + 1));
  }

  function back() {
    goTo(Math.max(1, step - 1));
  }

  // Step 1: Select type → auto-advance after 300ms
  function handleSelectTyp(typ: EigentuemerTyp) {
    const next = { ...data, eigentuemerTyp: typ };
    setData(next);
    saveDraft(next, 1);
    setTimeout(() => goTo(2), 300);
  }

  // Step 2: Select Größe → auto-advance
  function handleSelectGroesse(val: string) {
    const next = { ...data, portfolioGroesse: val };
    setData(next);
    saveDraft(next, 2);
    setTimeout(() => goTo(3), 300);
  }

  // Step 3: Select Struktur → auto-advance
  function handleSelectStruktur(val: string) {
    const next = { ...data, struktur: val };
    setData(next);
    saveDraft(next, 3);
    setTimeout(() => goTo(4), 300);
  }

  async function handleSubmit() {
    setSubmitting(true);
    setSubmitError(null);

    try {
      const payload = {
        type: data.eigentuemerTyp === "profi" ? "profi" : "privat",
        portfolioGroesse: data.portfolioGroesse,
        struktur: data.struktur,
        verwaltungstyp: data.verwaltungstyp,
        einheitenAnzahl: data.einheitenAnzahl,
        strasse: data.strasse,
        plz: data.plz,
        stadt: data.stadt,

        vorname: data.vorname,
        nachname: data.nachname,
        name: `${data.vorname} ${data.nachname}`.trim(),
        telefon: data.telefon || null,
        unternehmen: data.unternehmen || null,
        firma: data.unternehmen || null,
        email: data.email || "",
      };

      const res = await fetch("/api/portal/onboarding/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as { error?: string }).error ?? "Fehler beim Erstellen des Kontos");
      }

      // Clear draft
      try { localStorage.removeItem(DRAFT_KEY); } catch { /* ignore */ }

      // Advance to success step
      goTo(6);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Unbekannter Fehler — bitte erneut versuchen"
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-warm-white flex flex-col">
      {/* Top bar */}
      <header className="fixed top-0 w-full z-50 bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-navy rounded-md flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <span className="font-bold text-navy text-sm">einfach <span className="text-teal">verwaltet.</span></span>
          </Link>
          {step < TOTAL_STEPS && (
            <span className="text-xs text-text-light font-medium">
              Schritt {step} von {TOTAL_STEPS - 1}
            </span>
          )}
        </div>
        {/* Thin progress bar */}
        {step < TOTAL_STEPS && (
          <div className="h-0.5 bg-gray-100">
            <div
              className="h-full bg-teal transition-all duration-500 ease-out"
              style={{ width: `${Math.round((step / (TOTAL_STEPS - 1)) * 100)}%` }}
            />
          </div>
        )}
      </header>

      <main className="flex-1 flex items-start justify-center px-6 pt-24 pb-10">
        <div className="max-w-2xl w-full">
          {/* Step dots stepper */}
          {step < TOTAL_STEPS && <ProgressStepper step={step} />}

          {/* Step content */}
          {step === 1 && <Step1 data={data} onSelect={handleSelectTyp} />}

          {step === 2 && (
            <Step2 data={data} update={update} onSelect={handleSelectGroesse} />
          )}

          {step === 3 && (
            <Step3 data={data} onSelect={handleSelectStruktur} />
          )}

          {step === 4 && (
            <Step4
              data={data}
              update={update}
              onWeiter={next}
              onSkip={() => goTo(5)}
            />
          )}


          {step === 5 && (
            <Step6
              data={data}
              update={update}
              onSubmit={handleSubmit}
              submitting={submitting}
              submitError={submitError}
            />
          )}

          {step === 6 && <Step7 />}

          {/* Back button (steps 2-6, not on auto-advance steps) */}
          {step >= 2 && step <= 6 && step !== 4 && (
            <div className="mt-6 flex justify-start">
              <button
                type="button"
                onClick={back}
                className="px-4 py-2 text-sm text-gray-500 hover:text-navy transition-colors flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Zurück
              </button>
            </div>
          )}
          {step === 4 && (
            <div className="mt-2 flex justify-start">
              <button
                type="button"
                onClick={back}
                className="px-4 py-2 text-sm text-gray-500 hover:text-navy transition-colors flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Zurück
              </button>
            </div>
          )}

          {/* Draft indicator */}
          {step >= 2 && step <= 6 && (
            <p className="text-center text-xs text-gray-400 mt-6">
              Entwurf wird automatisch gespeichert
            </p>
          )}
        </div>
      </main>

      <footer className="py-4 text-center text-xs text-text-light">
        <Link href="/datenschutz" className="hover:text-navy mx-3">Datenschutz</Link>
        <Link href="/impressum" className="hover:text-navy mx-3">Impressum</Link>
      </footer>
    </div>
  );
}
