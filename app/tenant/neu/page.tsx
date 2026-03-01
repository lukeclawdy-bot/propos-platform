'use client';

import { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// ─── Types ──────────────────────────────────────────────────────────────────

type CategoryKey = 'heating' | 'water' | 'electric' | 'window' | 'mold' | 'other';
type UrgencyLevel = 'notfall' | 'dringend' | 'normal' | 'kann-warten';

interface Category {
  key: CategoryKey;
  icon: string;
  label: string;
  color: string;
}

interface Question {
  key: string;
  label: string;
  type: 'text' | 'select' | 'yesno';
  options?: string[];
  placeholder?: string;
}

// ─── Config ─────────────────────────────────────────────────────────────────

const CATEGORIES: Category[] = [
  { key: 'heating',  icon: '🔥', label: 'Heizung & Warmwasser',   color: 'bg-orange-50 border-orange-200 hover:border-orange-400' },
  { key: 'water',    icon: '💧', label: 'Wasser & Abwasser',      color: 'bg-blue-50 border-blue-200 hover:border-blue-400' },
  { key: 'electric', icon: '⚡', label: 'Elektro & Licht',        color: 'bg-yellow-50 border-yellow-200 hover:border-yellow-400' },
  { key: 'window',   icon: '🪟', label: 'Fenster & Türen',        color: 'bg-green-50 border-green-200 hover:border-green-400' },
  { key: 'mold',     icon: '🦠', label: 'Schimmel & Feuchtigkeit', color: 'bg-purple-50 border-purple-200 hover:border-purple-400' },
  { key: 'other',    icon: '📦', label: 'Sonstiges',              color: 'bg-gray-50 border-gray-200 hover:border-gray-400' },
];

const QUESTIONS: Record<CategoryKey, Question[]> = {
  heating: [
    { key: 'since_when',    label: 'Seit wann ist das Problem vorhanden?',   type: 'select', options: ['Heute', 'Gestern', 'Seit 2–3 Tagen', 'Seit mehr als einer Woche'] },
    { key: 'all_rooms',     label: 'Sind alle Räume betroffen?',              type: 'yesno' },
    { key: 'thermostat_error', label: 'Zeigt der Thermostat eine Fehlermeldung?', type: 'yesno' },
    { key: 'hot_water',     label: 'Ist auch das Warmwasser ausgefallen?',   type: 'yesno' },
  ],
  water: [
    { key: 'location',      label: 'Wo tritt das Wasser aus?',               type: 'text', placeholder: 'z. B. Badezimmer, Küche, Keller...' },
    { key: 'active_leak',   label: 'Läuft gerade aktiv Wasser aus?',         type: 'yesno' },
    { key: 'stain_or_active', label: 'Wasserfleck (trocken) oder aktiver Austritt?', type: 'select', options: ['Aktiver Austritt', 'Wasserfleck/Feuchtigkeitsfleck', 'Beides'] },
    { key: 'cellar',        label: 'Ist der Keller betroffen?',              type: 'yesno' },
  ],
  electric: [
    { key: 'rooms',         label: 'Welche Räume sind ohne Strom?',           type: 'text', placeholder: 'z. B. Wohnzimmer, gesamte Wohnung...' },
    { key: 'fuse_tripped',  label: 'Hat eine Sicherung ausgelöst?',          type: 'yesno' },
    { key: 'burning_smell', label: 'Riechen Sie Verbrennung oder sehen Sie Rauch?', type: 'yesno' },
  ],
  window: [
    { key: 'break_in',      label: 'Liegt ein Einbruch vor?',                type: 'yesno' },
    { key: 'leaking',       label: 'Ist das Fenster/die Tür undicht (zieht)?', type: 'yesno' },
    { key: 'jammed',        label: 'Klemmt das Fenster/die Tür?',            type: 'yesno' },
    { key: 'glass_broken',  label: 'Ist das Glas beschädigt oder gebrochen?', type: 'yesno' },
  ],
  mold: [
    { key: 'size',          label: 'Wie groß ist der befallene Bereich (ca.)?', type: 'select', options: ['Klein (< 20 cm²)', 'Mittel (20–100 cm²)', 'Groß (> 100 cm²)', 'Ich weiß es nicht'] },
    { key: 'since_when',    label: 'Wie lange besteht der Schimmel schon?',  type: 'select', options: ['Neu entdeckt', 'Seit einigen Wochen', 'Seit Monaten', 'Seit mehr als einem Jahr'] },
    { key: 'dampness',      label: 'Ist Feuchtigkeit spürbar oder sichtbar?', type: 'yesno' },
  ],
  other: [
    { key: 'description',   label: 'Bitte beschreiben Sie das Problem:',     type: 'text', placeholder: 'Was genau ist passiert? Seit wann besteht das Problem?' },
  ],
};

const PHOTO_HINTS: Record<CategoryKey, string[]> = {
  heating:  ['1. Thermostat-Anzeige fotografieren', '2. Heizkörper insgesamt', '3. Fehlermeldung falls vorhanden'],
  water:    ['1. Austrittsstelle', '2. Gesamtbild des Raums', '3. Wasserstand / -schaden'],
  electric: ['1. Sicherungskasten', '2. Betroffene Steckdosen / Schalter', '3. Ggf. Brandspuren'],
  window:   ['1. Gesamtansicht Fenster / Tür', '2. Schadhafte Stelle (Nahaufnahme)', '3. Rahmen oder Dichtung'],
  mold:     ['1. Schimmelbereich (Nahaufnahme)', '2. Gesamtbild des Raums', '3. Außenwand / Ecken'],
  other:    ['1. Gesamtbild des Problems', '2. Nahaufnahme der Schadensstelle', '3. Weitere relevante Ansicht'],
};

// ─── Urgency Assessment ──────────────────────────────────────────────────────

function assessUrgency(category: CategoryKey, answers: Record<string, string>): UrgencyLevel {
  const a = answers;

  if (category === 'water') {
    if (a.active_leak === 'Ja' || a.stain_or_active === 'Aktiver Austritt') return 'notfall';
    if (a.cellar === 'Ja') return 'dringend';
    return 'normal';
  }

  if (category === 'electric') {
    if (a.burning_smell === 'Ja') return 'notfall';
    if (a.fuse_tripped === 'Ja') return 'dringend';
    return 'normal';
  }

  if (category === 'heating') {
    const month = new Date().getMonth(); // 0 = Jan, 11 = Dec
    const isWinter = month <= 2 || month >= 10; // Nov–Mar
    if (isWinter && a.all_rooms === 'Ja') return 'notfall';
    if (a.hot_water === 'Ja') return 'dringend';
    return 'normal';
  }

  if (category === 'window') {
    if (a.break_in === 'Ja') return 'notfall';
    if (a.jammed === 'Ja' || a.glass_broken === 'Ja') return 'dringend';
    return 'normal';
  }

  if (category === 'mold') {
    if (a.size === 'Groß (> 100 cm²)') return 'dringend';
    return 'normal';
  }

  return 'normal';
}

const URGENCY_CONFIG: Record<UrgencyLevel, { label: string; badge: string; time: string; color: string; bg: string }> = {
  'notfall':     { label: 'Notfall',      badge: '🚨',  time: 'sofort (innerhalb 1 Stunde)',   color: 'text-red-700',    bg: 'bg-red-50 border-red-300' },
  'dringend':    { label: 'Dringend',     badge: '⚠️',  time: 'innerhalb von 24 Stunden',       color: 'text-orange-700', bg: 'bg-orange-50 border-orange-300' },
  'normal':      { label: 'Normal',       badge: '📋',  time: 'innerhalb von 7 Tagen',          color: 'text-blue-700',   bg: 'bg-blue-50 border-blue-300' },
  'kann-warten': { label: 'Kann warten',  badge: '📅',  time: 'innerhalb von 30 Tagen',         color: 'text-gray-700',   bg: 'bg-gray-50 border-gray-300' },
};

// ─── Progress Bar ────────────────────────────────────────────────────────────

function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-600">Schritt {step} von {total}</span>
        <span className="text-sm text-gray-400">{Math.round((step / total) * 100)}%</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-300"
          style={{ width: `${(step / total) * 100}%` }}
        />
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function TenantNeuPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const TOTAL_STEPS = 5;

  // State
  const [category, setCategory] = useState<CategoryKey | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoPreviewUrls, setPhotoPreviewUrls] = useState<string[]>([]);
  const [aiDescription, setAiDescription] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [urgency, setUrgency] = useState<UrgencyLevel>('normal');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<{ ticketId: string; urgency: UrgencyLevel; responseTime: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Step Navigation ────────────────────────────────────────────────────────

  const goNext = useCallback(() => setStep((s) => Math.min(s + 1, TOTAL_STEPS)), []);
  const goBack = useCallback(() => setStep((s) => Math.max(s - 1, 1)), []);

  // ── Step 1: Category ───────────────────────────────────────────────────────

  const handleSelectCategory = (cat: CategoryKey) => {
    setCategory(cat);
    setAnswers({});
    setAiDescription('');
    setUrgency('normal');
    goNext();
  };

  // ── Step 2: Answers ────────────────────────────────────────────────────────

  const handleAnswer = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const currentQuestions = category ? QUESTIONS[category] : [];
  const answersComplete = currentQuestions.every((q) => answers[q.key]?.trim());

  const handleAnswersNext = () => {
    if (!answersComplete) return;
    goNext();
  };

  // ── Step 3: Photos ─────────────────────────────────────────────────────────

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setPhotos((prev) => [...prev, ...files].slice(0, 5)); // max 5 files
    files.forEach((f) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPhotoPreviewUrls((prev) => [...prev, ev.target?.result as string].slice(0, 5));
      };
      reader.readAsDataURL(f);
    });
  };

  const removePhoto = (idx: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== idx));
    setPhotoPreviewUrls((prev) => prev.filter((_, i) => i !== idx));
  };

  const handlePhotosNext = async () => {
    // Fetch AI description
    setAiLoading(true);
    try {
      const res = await fetch('/api/tenant/ai-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, answers, photoCount: photos.length }),
      });
      if (res.ok) {
        const data = await res.json();
        setAiDescription(data.description ?? '');
      }
    } catch {
      setAiDescription('');
    } finally {
      setAiLoading(false);
    }
    // Assess urgency
    if (category) {
      setUrgency(assessUrgency(category, answers));
    }
    goNext();
  };

  // ── Step 5: Submit ─────────────────────────────────────────────────────────

  const handleSubmit = async () => {
    if (!category || !aiDescription.trim()) return;
    setIsSubmitting(true);
    setError(null);

    try {
      const catConfig = CATEGORIES.find((c) => c.key === category);
      const res = await fetch('/api/tenant/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: catConfig?.label ?? 'Schadensmeldung',
          description: aiDescription,
          category,
          urgency,
          source: 'portal',
          answers,
          photoUrls: [], // TODO: upload photos to Vercel Blob and pass URLs
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Fehler beim Absenden. Bitte versuchen Sie es erneut.');
        return;
      }

      setSubmitted({
        ticketId: data.ticketId ?? data.data?.id ?? '',
        urgency: data.urgency ?? urgency,
        responseTime: data.responseTime ?? URGENCY_CONFIG[urgency].time,
      });
    } catch {
      setError('Verbindungsfehler. Bitte prüfen Sie Ihre Internetverbindung.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Success State ──────────────────────────────────────────────────────────

  if (submitted) {
    const uc = URGENCY_CONFIG[submitted.urgency];
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-md text-center">
          <div className="text-5xl mb-4">✅</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Meldung eingereicht</h1>
          <p className="text-gray-600 mb-6">
            Wir kümmern uns <strong>{submitted.responseTime}</strong>.
          </p>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-6 ${uc.bg} ${uc.color}`}>
            <span>{uc.badge}</span>
            <span>{uc.label}</span>
          </div>
          {submitted.ticketId && (
            <p className="text-xs text-gray-400 mb-8">
              Ticket-Nr: <code>{submitted.ticketId.slice(0, 8).toUpperCase()}</code>
            </p>
          )}
          <div className="flex flex-col gap-3">
            <Link
              href="/tenant/dashboard"
              className="block bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition min-h-[44px]"
            >
              Zum Dashboard
            </Link>
            <button
              onClick={() => {
                setStep(1);
                setCategory(null);
                setAnswers({});
                setPhotos([]);
                setPhotoPreviewUrls([]);
                setAiDescription('');
                setSubmitted(null);
              }}
              className="text-gray-500 hover:text-gray-700 text-sm py-2 min-h-[44px]"
            >
              Neue Meldung einreichen
            </button>
          </div>
        </div>
      </main>
    );
  }

  // ── Layout ─────────────────────────────────────────────────────────────────

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-lg mx-auto">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          {step > 1 && (
            <button
              onClick={goBack}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Zurück"
            >
              ←
            </button>
          )}
          <div>
            <h1 className="text-xl font-bold text-gray-900">Schaden melden</h1>
            <p className="text-sm text-gray-500">
              {step === 1 && 'Was ist passiert?'}
              {step === 2 && 'Ein paar Details'}
              {step === 3 && 'Fotos helfen uns, schneller zu helfen'}
              {step === 4 && 'Automatische Zusammenfassung'}
              {step === 5 && 'Dringlichkeit & Absenden'}
            </p>
          </div>
        </div>

        <ProgressBar step={step} total={TOTAL_STEPS} />

        {/* ── Step 1: Category ── */}
        {step === 1 && (
          <div>
            <p className="text-gray-600 mb-4">Wählen Sie die Kategorie des Problems:</p>
            <div className="grid grid-cols-2 gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => handleSelectCategory(cat.key)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all min-h-[100px] active:scale-95 ${cat.color}`}
                >
                  <span className="text-3xl">{cat.icon}</span>
                  <span className="text-sm font-medium text-gray-800 text-center leading-tight">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Step 2: Questions ── */}
        {step === 2 && category && (
          <div className="space-y-5">
            {currentQuestions.map((q) => (
              <div key={q.key}>
                <label className="block text-sm font-medium text-gray-700 mb-2">{q.label}</label>

                {q.type === 'yesno' && (
                  <div className="flex gap-3">
                    {['Ja', 'Nein'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleAnswer(q.key, opt)}
                        className={`flex-1 py-3 rounded-xl border-2 font-medium transition min-h-[44px] ${
                          answers[q.key] === opt
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : 'bg-white border-gray-200 text-gray-700 hover:border-blue-300'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {q.type === 'select' && q.options && (
                  <div className="grid grid-cols-1 gap-2">
                    {q.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleAnswer(q.key, opt)}
                        className={`w-full text-left py-3 px-4 rounded-xl border-2 transition min-h-[44px] ${
                          answers[q.key] === opt
                            ? 'bg-blue-50 border-blue-500 text-blue-800 font-medium'
                            : 'bg-white border-gray-200 text-gray-700 hover:border-blue-300'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {q.type === 'text' && (
                  <textarea
                    value={answers[q.key] ?? ''}
                    onChange={(e) => handleAnswer(q.key, e.target.value)}
                    placeholder={q.placeholder}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none resize-none text-sm"
                  />
                )}
              </div>
            ))}

            <button
              onClick={handleAnswersNext}
              disabled={!answersComplete}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-700 transition min-h-[44px] mt-4"
            >
              Weiter →
            </button>
          </div>
        )}

        {/* ── Step 3: Photos ── */}
        {step === 3 && category && (
          <div>
            <div className="bg-blue-50 rounded-xl p-4 mb-5 border border-blue-100">
              <p className="text-sm font-semibold text-blue-800 mb-2">📸 Foto-Tipps für {CATEGORIES.find(c => c.key === category)?.label}:</p>
              <ul className="space-y-1">
                {PHOTO_HINTS[category].map((hint, i) => (
                  <li key={i} className="text-sm text-blue-700">{hint}</li>
                ))}
              </ul>
            </div>

            <p className="text-xs text-gray-500 mb-3 text-center">Fotos helfen uns, schneller zu helfen (max. 5)</p>

            {/* Upload area */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-blue-400 hover:bg-blue-50 transition min-h-[100px] mb-4"
            >
              <div className="text-3xl mb-2">📷</div>
              <p className="text-sm font-medium text-gray-700">Foto oder Video auswählen</p>
              <p className="text-xs text-gray-400 mt-1">JPG, PNG, MP4 — bis zu 5 Dateien</p>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={handlePhotoChange}
              className="hidden"
            />

            {/* Previews */}
            {photoPreviewUrls.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mb-4">
                {photoPreviewUrls.map((url, i) => (
                  <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                    <img src={url} alt={`Foto ${i + 1}`} className="w-full h-full object-cover" />
                    <button
                      onClick={() => removePhoto(i)}
                      className="absolute top-1 right-1 bg-black/50 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-black/70"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col gap-3">
              <button
                onClick={handlePhotosNext}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition min-h-[44px]"
              >
                {photos.length > 0 ? `Weiter mit ${photos.length} Foto${photos.length > 1 ? 's' : ''} →` : 'Weiter ohne Fotos →'}
              </button>
            </div>
          </div>
        )}

        {/* ── Step 4: AI Description ── */}
        {step === 4 && (
          <div>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Automatische Zusammenfassung</p>
              {aiLoading ? (
                <div className="flex items-center gap-2 text-gray-500">
                  <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full" />
                  <span className="text-sm">Zusammenfassung wird erstellt…</span>
                </div>
              ) : (
                <textarea
                  value={aiDescription}
                  onChange={(e) => setAiDescription(e.target.value)}
                  rows={5}
                  className="w-full bg-white px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:outline-none text-sm resize-none"
                  placeholder="Schadensbeschreibung…"
                />
              )}
            </div>
            <p className="text-xs text-gray-400 mb-5">
              Sie können den Text vor dem Absenden noch bearbeiten.
            </p>

            <button
              onClick={() => { if (!aiLoading && aiDescription.trim()) goNext(); }}
              disabled={aiLoading || !aiDescription.trim()}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-700 transition min-h-[44px]"
            >
              Weiter →
            </button>
          </div>
        )}

        {/* ── Step 5: Urgency + Submit ── */}
        {step === 5 && category && (
          <div>
            {/* Urgency Badge */}
            <div className={`rounded-2xl border-2 p-5 mb-6 ${URGENCY_CONFIG[urgency].bg}`}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{URGENCY_CONFIG[urgency].badge}</span>
                <div>
                  <p className={`font-bold text-lg ${URGENCY_CONFIG[urgency].color}`}>{URGENCY_CONFIG[urgency].label}</p>
                  <p className="text-sm text-gray-600">Wir kümmern uns <strong>{URGENCY_CONFIG[urgency].time}</strong></p>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mb-6">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Ihre Meldung</p>
              <p className="text-sm font-semibold text-gray-800 mb-1">
                {CATEGORIES.find(c => c.key === category)?.icon} {CATEGORIES.find(c => c.key === category)?.label}
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">{aiDescription}</p>
              {photos.length > 0 && (
                <p className="text-xs text-gray-400 mt-2">📎 {photos.length} Foto{photos.length > 1 ? 's' : ''} angehängt</p>
              )}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl p-4 mb-4">
                {error}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !aiDescription.trim()}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-700 transition min-h-[44px] text-lg"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                  Wird gesendet…
                </span>
              ) : (
                'Schaden melden ✓'
              )}
            </button>

            <p className="text-xs text-gray-400 text-center mt-3">
              Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Daten zu.
            </p>
          </div>
        )}

      </div>
    </main>
  );
}
