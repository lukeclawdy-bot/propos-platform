"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { trackAnfrageConversion } from "@/lib/gtag";
import { CheckIcon, ArrowRightIcon, HouseLogoIcon, HomeIcon, ScaleIcon, ClipboardIcon, ChatIcon, MapPinIcon, BoltIcon, LockOpenIcon, WrenchIcon, StarIcon, ShieldIcon, BuildingIcon, QuestionIcon, CurrencyIcon, UsersIcon } from "./Icons";

// --- Types ---
type StepType = "choice" | "multi" | "input" | "result";

interface Choice {
  value: string;
  label: string;
  sublabel?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface Step {
  id: string;
  type: StepType;
  headline: string;
  subline?: string;
  choices?: Choice[];
  inputFields?: { name: string; label: string; type: string; required: boolean; placeholder: string }[];
  insight?: (answers: Record<string, string>) => string;
}

// --- Steps ---
const steps: Step[] = [
  {
    id: "verwaltungstyp",
    type: "choice",
    headline: "Um welche Art von Verwaltung geht es?",
    subline: "Damit wir Ihnen das richtige Angebot machen können.",
    choices: [
      { value: "miet", label: "Mietverwaltung", sublabel: "Sie vermieten Wohnungen und brauchen jemanden, der sich kümmert.", icon: HomeIcon },
      { value: "weg", label: "WEG-Verwaltung", sublabel: "Eigentümergemeinschaft sucht eine zuverlässige Hausverwaltung.", icon: BuildingIcon },
      { value: "beides", label: "Beides", sublabel: "Mietverwaltung + WEG für dasselbe Objekt oder mehrere Objekte.", icon: ClipboardIcon },
      { value: "unsicher", label: "Bin mir nicht sicher", sublabel: "Kein Problem — wir klären das gemeinsam im Gespräch.", icon: ChatIcon },
    ],
  },
  {
    id: "einheiten",
    type: "choice",
    headline: "Wie viele Einheiten verwalten Sie?",
    subline: "Einheiten = Wohnungen, Gewerbeeinheiten, Stellplätze.",
    choices: [
      { value: "1-3", label: "1–3 Einheiten", sublabel: "Kleineres Objekt oder Eigentumswohnung" },
      { value: "4-10", label: "4–10 Einheiten", sublabel: "Typisches Mehrfamilienhaus" },
      { value: "11-30", label: "11–30 Einheiten", sublabel: "Größeres Portfolio" },
      { value: "31-100", label: "31–100 Einheiten", sublabel: "Professioneller Bestand" },
      { value: "100+", label: "Über 100", sublabel: "Großes Portfolio — individuelle Konditionen" },
    ],
    insight: (a) => {
      if (a.verwaltungstyp === "miet") return "Gut zu wissen: Bei Mietverwaltung kümmern wir uns um alles — von der Mietersuche bis zur Nebenkostenabrechnung.";
      if (a.verwaltungstyp === "weg") return "WEG-Verwaltung ist unser Kerngeschäft — inklusive Eigentümerversammlung, Wirtschaftsplan und Jahresabrechnung.";
      return "";
    },
  },
  {
    id: "standort",
    type: "choice",
    headline: "Wo befindet sich Ihre Immobilie?",
    subline: "Wir sind bundesweit aktiv — Schwerpunkt Hamburg, Berlin und München.",
    choices: [
      { value: "hamburg", label: "Hamburg & Umland", sublabel: "Unser Heimatmarkt — sofort verfügbar" },
      { value: "berlin", label: "Berlin", sublabel: "Sofort verfügbar" },
      { value: "muenchen", label: "München", sublabel: "Sofort verfügbar" },
      { value: "mehrere", label: "Mehrere Standorte", sublabel: "Portfolio über verschiedene Städte verteilt" },
      { value: "andere", label: "Anderer Standort", sublabel: "Deutschlandweit — wir prüfen gerne" },
    ],
  },
  {
    id: "situation",
    type: "choice",
    headline: "Was beschreibt Ihre Situation am besten?",
    subline: "Jede Situation ist anders — deshalb fragen wir.",
    choices: [
      { value: "unzufrieden", label: "Unzufrieden mit aktueller Verwaltung", sublabel: "Erreichbarkeit, Transparenz oder Qualität stimmen nicht" },
      { value: "neue-immobilie", label: "Neue Immobilie, brauche erstmals Verwaltung", sublabel: "Gerade gekauft oder gebaut" },
      { value: "selbstverwaltet", label: "Verwalte selbst, möchte abgeben", sublabel: "Keine Zeit oder Lust mehr, sich selbst zu kümmern" },
      { value: "vergleich", label: "Möchte einfach Angebote vergleichen", sublabel: "Kein Druck — Transparenz ist uns wichtig" },
    ],
    insight: (a) => {
      if (a.situation === "unzufrieden") return "Sie sind nicht allein: 78% der Eigentümer beklagen, dass ihre Verwaltung telefonisch nie erreichbar ist. Bei uns reagieren wir in unter 5 Minuten.";
      if (a.situation === "selbstverwaltet") return "Verständlich. Wir übernehmen alles — Buchhaltung, Mieterkorrespondenz, Handwerker — und Sie haben endlich wieder freie Wochenenden.";
      return "";
    },
  },
  {
    id: "prioritaet",
    type: "multi",
    headline: "Was ist Ihnen wichtig?",
    subline: "Mehrere Antworten möglich — wir richten uns danach.",
    choices: [
      { value: "erreichbarkeit", label: "Schnelle Reaktionszeiten", sublabel: "Keine Warteschleifen, keine ignorierten E-Mails" },
      { value: "transparenz", label: "Volle Kostentransparenz", sublabel: "Jeder Euro nachvollziehbar, jederzeit einsehbar" },
      { value: "qualitaet", label: "Zuverlässige Handwerker", sublabel: "Gute Arbeit, faire Preise, kein Pfusch" },
      { value: "preis", label: "Faires Preis-Leistungs-Verhältnis", sublabel: "Keine versteckten Kosten, klare Kalkulation" },
      { value: "digital", label: "Digitales Portal & Transparenz", sublabel: "Jederzeit Einblick in Dokumente und Finanzen" },
    ],
  },
  {
    id: "kontakt",
    type: "input",
    headline: "Fast geschafft — wie erreichen wir Sie?",
    subline: "Wir melden uns noch am selben Werktag mit Ihrem individuellen Angebot.",
    inputFields: [
      { name: "name", label: "Name", type: "text", required: true, placeholder: "Herr/Frau Muster" },
      { name: "email", label: "E-Mail", type: "email", required: true, placeholder: "ihre@email.de" },
      { name: "telefon", label: "Telefon (optional)", type: "tel", required: false, placeholder: "+49 40 ..." },
    ],
  },
  {
    id: "ergebnis",
    type: "result",
    headline: "Ihr Angebot ist unterwegs.",
  },
];

// --- Component ---
export function AnfrageQuiz() {
  const searchParams = useSearchParams();
  const isBetaProgram = searchParams.get("beta_program") === "true";
  
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Add beta_program flag to answers if present
  useEffect(() => {
    if (isBetaProgram) {
      setAnswers(prev => ({ ...prev, beta_program: "true" }));
    }
  }, [isBetaProgram]);

  const step = steps[current];
  const totalSteps = steps.length;
  const progress = Math.round(((current) / (totalSteps - 1)) * 100);

  function selectChoice(value: string) {
    const updated = { ...answers, [step.id]: value };
    setAnswers(updated);
    // Auto-advance after short delay
    setTimeout(() => setCurrent((c) => Math.min(c + 1, totalSteps - 1)), 250);
  }

  function toggleMulti(value: string) {
    const current_vals = answers[step.id] ? answers[step.id].split(",") : [];
    const exists = current_vals.includes(value);
    const next = exists ? current_vals.filter(v => v !== value) : [...current_vals, value];
    setAnswers(prev => ({ ...prev, [step.id]: next.join(",") }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const form = new FormData(e.currentTarget);
    const name = form.get("name") as string;
    const email = form.get("email") as string;
    const telefon = form.get("telefon") as string;

    const updated: Record<string, string> = { ...answers, name, email, telefon };
    setAnswers(updated);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Ein Fehler ist aufgetreten");
      }

      setSubmitted(true);
      setCurrent(totalSteps - 1);
      
      // Track Google Ads conversion
      trackAnfrageConversion();
    } catch (err) {
      console.error("Submit error:", err);
      setSubmitError(
        "Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt per Telefon."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function goBack() {
    if (current > 0) setCurrent(current - 1);
  }

  // Result step
  if (step.type === "result" || submitted) {
    const einheiten = answers.einheiten || "";
    const isLarge = ["31-100", "100+"].includes(einheiten);
    const verwaltungstyp = answers.verwaltungstyp;
    const priceRange = verwaltungstyp === "weg" ? "€28–34" : verwaltungstyp === "beides" ? "€26–34" : "€24–28";
    const betaPriceRange = verwaltungstyp === "weg" ? "€14–17" : verwaltungstyp === "beides" ? "€13–17" : "€12–14";

    return (
      <div className="max-w-xl mx-auto px-6 py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-teal/15 flex items-center justify-center mx-auto mb-6">
          <CheckIcon className="w-8 h-8 text-teal" />
        </div>
        <h2 className="text-3xl font-bold text-navy mb-4 font-serif">Ihre Anfrage ist bei uns.</h2>
        
        {isBetaProgram ? (
          <>
            <div className="bg-amber/10 border border-amber/30 rounded-xl p-4 mb-6">
              <p className="text-amber font-semibold mb-1">🎯 Beta-Programm-Anfrage</p>
              <p className="text-navy text-sm">Sie sind auf der Liste für eines der 5 Beta-Plätze!</p>
            </div>
            <p className="text-text-light text-lg mb-8">
              {isLarge
                ? "Bei Ihrem Portfolioumfang prüfen wir die Beta-Teilnahme individuell. Wir melden uns noch heute."
                : `Ihr geschätzter Preis im Beta-Programm: ${betaPriceRange}/Einheit/Monat (statt ${priceRange}). Das endgültige Angebot erhalten Sie am nächsten Werktag.`
              }
            </p>
          </>
        ) : (
          <p className="text-text-light text-lg mb-8">
            {isLarge
              ? "Bei Ihrem Portfolioumfang erstellen wir ein maßgeschneidertes Angebot. Wir melden uns noch heute."
              : `Basierend auf Ihren Angaben liegt Ihr geschätzter Preis bei ${priceRange}/Einheit/Monat. Das endgültige Angebot erhalten Sie am nächsten Werktag.`
            }
          </p>
        )}

        <div className="bg-white rounded-2xl border border-gray-100 p-6 text-left space-y-3 mb-8">
          <div className="text-xs font-semibold text-text-light uppercase tracking-wide mb-4">Ihre Angaben</div>
          {answers.verwaltungstyp && <SummaryRow label="Verwaltungstyp" value={{
            miet: "Mietverwaltung", weg: "WEG-Verwaltung", beides: "Miet- & WEG-Verwaltung", unsicher: "Noch unklar"
          }[answers.verwaltungstyp] || answers.verwaltungstyp} />}
          {answers.einheiten && <SummaryRow label="Einheiten" value={{
            "1-3": "1–3 Einheiten", "4-10": "4–10 Einheiten", "11-30": "11–30 Einheiten", "31-100": "31–100 Einheiten", "100+": "Über 100 Einheiten"
          }[answers.einheiten] || answers.einheiten} />}
          {answers.standort && <SummaryRow label="Standort" value={{
            hamburg: "Hamburg & Umland", "hamburg-umland": "Hamburger Umland", berlin: "Berlin", muenchen: "München", mehrere: "Mehrere Standorte", andere: "Anderer Standort"
          }[answers.standort] || answers.standort} />}
          {answers.situation && <SummaryRow label="Situation" value={{
            unzufrieden: "Unzufrieden mit aktueller Verwaltung", "neue-immobilie": "Neue Immobilie", selbstverwaltet: "Selbstverwaltung abgeben", vergleich: "Angebote vergleichen"
          }[answers.situation] || answers.situation} />}
          {answers.prioritaet && <SummaryRow label="Priorität" value={answers.prioritaet.split(",").map((v: string) => ({
            erreichbarkeit: "Reaktionszeiten", transparenz: "Kostentransparenz", qualitaet: "Handwerkerqualität", preis: "Preis-Leistung", digital: "Digitales Portal"
          }[v] || v)).join(", ")} />}
          {isBetaProgram && <SummaryRow label="Beta-Programm" value="Ja" />}
        </div>

        <div className="bg-navy/5 rounded-xl p-4 text-sm text-navy">
          <strong>Was jetzt passiert:</strong> {isBetaProgram 
            ? "Wir prüfen Ihre Angaben und melden uns noch am selben Werktag — priorisiert als Beta-Interessent."
            : "Wir prüfen Ihre Angaben und melden uns noch am selben Werktag mit einem konkreten Angebot — per E-Mail oder Telefon."
          }
        </div>

        <div className="mt-8 flex flex-col gap-3 items-center">
          <a href="/portal/onboarding" className="w-full text-center bg-teal text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-navy transition-colors">
            Portal einrichten →
          </a>
          <a href="/" className="text-sm text-text-light hover:text-navy transition-colors">
            ← Zurück zur Startseite
          </a>
        </div>
      </div>
    );
  }

  // Quiz insight (dynamic feedback)
  const insight = step.insight ? step.insight(answers) : "";

  return (
    <div className="max-w-xl mx-auto px-6 py-12 lg:py-20">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <HouseLogoIcon className="w-5 h-5 text-navy" />
            <span className="text-xs font-semibold text-text-light">Schritt {current + 1} von {totalSteps - 1}</span>
          </div>
          <span className="text-xs font-semibold text-teal">{progress}%</span>
        </div>
        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-teal to-navy rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Back button */}
      {current > 0 && (
        <button onClick={goBack} className="text-sm text-text-light hover:text-navy mb-6 flex items-center gap-1 transition-colors">
          ← Zurück
        </button>
      )}

      {/* Question */}
      <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-2 font-serif">{step.headline}</h2>
      {step.subline && <p className="text-text-light mb-8">{step.subline}</p>}

      {/* Dynamic insight */}
      {insight && (
        <div className="bg-teal/8 border border-teal/20 rounded-xl p-4 mb-8 text-sm text-navy leading-relaxed">
          <BoltIcon className="w-4 h-4 text-teal inline-block mr-1 -mt-0.5" /> {insight}
        </div>
      )}

      {/* Choices */}
      {step.type === "choice" && step.choices && (
        <div className="space-y-3">
          {step.choices.map((c) => {
            const selected = answers[step.id] === c.value;
            return (
              <button
                key={c.value}
                onClick={() => selectChoice(c.value)}
                className={`w-full text-left p-5 rounded-xl border-2 transition-all ${
                  selected
                    ? "border-teal bg-teal/5 shadow-sm"
                    : "border-gray-200 bg-white hover:border-navy/30 hover:shadow-sm"
                }`}
              >
                <div className="flex items-start gap-3">
                  {c.icon && (
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-navy/8 flex items-center justify-center mt-0.5">
                      <c.icon className="w-5 h-5 text-navy" />
                    </div>
                  )}
                  <div>
                    <div className="font-semibold text-navy">{c.label}</div>
                    {c.sublabel && <div className="text-sm text-text-light mt-0.5">{c.sublabel}</div>}
                  </div>
                  {selected && (
                    <div className="ml-auto flex-shrink-0 w-6 h-6 rounded-full bg-teal flex items-center justify-center">
                      <CheckIcon className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Multi-select */}
      {step.type === "multi" && step.choices && (
        <div className="space-y-3">
          {step.choices.map((c) => {
            const selectedVals = answers[step.id] ? answers[step.id].split(",") : [];
            const selected = selectedVals.includes(c.value);
            return (
              <button
                key={c.value}
                type="button"
                onClick={() => toggleMulti(c.value)}
                className={`w-full text-left p-5 rounded-xl border-2 transition-all ${
                  selected
                    ? "border-teal bg-teal/5 shadow-sm"
                    : "border-gray-200 bg-white hover:border-navy/30 hover:shadow-sm"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`flex-shrink-0 w-5 h-5 rounded border-2 mt-0.5 flex items-center justify-center ${
                    selected ? "border-teal bg-teal" : "border-gray-300"
                  }`}>
                    {selected && <CheckIcon className="w-3 h-3 text-white" />}
                  </div>
                  <div>
                    <div className="font-semibold text-navy">{c.label}</div>
                    {c.sublabel && <div className="text-sm text-text-light mt-0.5">{c.sublabel}</div>}
                  </div>
                </div>
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => {
              if (answers[step.id]) setCurrent(c => Math.min(c + 1, totalSteps - 1));
            }}
            disabled={!answers[step.id]}
            className={`w-full py-3.5 rounded-xl font-semibold transition-all mt-2 ${
              answers[step.id]
                ? "bg-teal text-white hover:bg-navy"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            Weiter →
          </button>
        </div>
      )}

      {/* Input form */}
      {step.type === "input" && step.inputFields && (
        <form onSubmit={handleSubmit} className="space-y-5">
          {step.inputFields.map((f) => (
            <div key={f.name}>
              <label className="block text-sm font-medium text-navy mb-1.5">{f.label}</label>
              <input
                type={f.type}
                name={f.name}
                required={f.required}
                placeholder={f.placeholder}
                className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white text-navy text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all"
              />
            </div>
          ))}

          <div className="flex items-start gap-3 mt-2">
            <input type="checkbox" id="dsgvo" required className="mt-1 w-4 h-4 rounded border-gray-300 text-teal focus:ring-teal cursor-pointer" />
            <label htmlFor="dsgvo" className="text-xs text-text-light leading-relaxed cursor-pointer">
              Ich habe die <a href="/datenschutz" className="underline hover:text-teal">Datenschutzerklärung</a> gelesen und stimme der Verarbeitung meiner Daten zu (Art. 6 Abs. 1 lit. b DSGVO).
            </label>
          </div>

          {submitError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
              {submitError}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-navy text-white py-4 px-6 rounded-xl font-semibold text-base hover:bg-navy/85 transition-all hover:shadow-md mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Wird gesendet...
              </>
            ) : (
              <>
                Angebot anfordern
                <ArrowRightIcon className="w-4 h-4" />
              </>
            )}
          </button>

          <p className="text-xs text-text-light text-center">Kostenlos &amp; unverbindlich. Keine Kreditkarte erforderlich.</p>
        </form>
      )}

      {/* Trust line */}
      <div className="mt-10 pt-6 border-t border-gray-100 flex items-center gap-4 text-xs text-text-light">
        <span>🔒 DSGVO-konform</span>
        <span>⚡ Antwort am selben Tag</span>
        <span>€0 — kostenlos</span>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
      <span className="text-sm text-text-light">{label}</span>
      <span className="text-sm font-medium text-navy capitalize">{value.replace(/-/g, " ")}</span>
    </div>
  );
}
