"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

// --- Icons ---
function DocumentIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  );
}

function TrashIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  );
}

function ArrowDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );
}

function SpinnerIcon({ className }: { className?: string }) {
  return (
    <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );
}

interface BeschlussItem {
  id: string;
  tagesordnungspunkt: string;
  beschluss: string;
  abstimmung: { ja: number; nein: number; enthaltung: number };
  ergebnis: "angenommen" | "abgelehnt";
}

const defaultTOPs: BeschlussItem[] = [
  {
    id: "1",
    tagesordnungspunkt: "Genehmigung des Protokolls der letzten Eigentümerversammlung",
    beschluss: "Das Protokoll der Eigentümerversammlung vom Vorjahr wird genehmigt.",
    abstimmung: { ja: 8, nein: 0, enthaltung: 1 },
    ergebnis: "angenommen",
  },
  {
    id: "2",
    tagesordnungspunkt: "Jahresabrechnung und Entlastung des Verwalters",
    beschluss: "Die Jahresabrechnung wird genehmigt. Der Verwalter wird entlastet.",
    abstimmung: { ja: 7, nein: 1, enthaltung: 1 },
    ergebnis: "angenommen",
  },
];

export default function BeschlussprotokollPage() {
  const [gemeinschaft, setGemeinschaft] = useState("WEG Musterstraße 12");
  const [adresse, setAdresse] = useState("Musterstraße 12, 20255 Hamburg");
  const [datum, setDatum] = useState(new Date().toLocaleDateString("de-DE"));
  const [uhrzeit, setUhrzeit] = useState("18:00");
  const [ort, setOrt] = useState("Gemeinschaftsraum, Musterstraße 12, 20255 Hamburg");
  const [verwalter, setVerwalter] = useState("einfach verwaltet., Hamburg");
  const [vorsitzender, setVorsitzender] = useState("");
  const [anwesende, setAnwesende] = useState("");
  const [gesamtMiteigentuemer, setGesamtMiteigentuemer] = useState(10);
  const [vertreteneAnteile, setVertreteneAnteile] = useState(750);
  const [gesamtanteile, setGesamtanteile] = useState(1000);
  const [sonstiges, setSonstiges] = useState("");
  const [tops, setTops] = useState<BeschlussItem[]>(defaultTOPs);
  const [protokoll, setProtokoll] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  const beschlussfaehigkeit = ((vertreteneAnteile / gesamtanteile) * 100).toFixed(1);

  function addTOP() {
    setTops([
      ...tops,
      {
        id: Date.now().toString(),
        tagesordnungspunkt: "",
        beschluss: "",
        abstimmung: { ja: 0, nein: 0, enthaltung: 0 },
        ergebnis: "angenommen",
      },
    ]);
  }

  function removeTOP(id: string) {
    setTops(tops.filter((t) => t.id !== id));
  }

  function updateTOP(id: string, field: string, value: string | number | { ja: number; nein: number; enthaltung: number }) {
    setTops(
      tops.map((t) =>
        t.id === id ? { ...t, [field]: value } : t
      )
    );
  }

  function updateAbstimmung(id: string, field: "ja" | "nein" | "enthaltung", value: number) {
    setTops(
      tops.map((t) =>
        t.id === id
          ? { ...t, abstimmung: { ...t.abstimmung, [field]: value } }
          : t
      )
    );
  }

  async function generateProtokoll() {
    setIsGenerating(true);
    setError("");
    setProtokoll("");

    try {
      const res = await fetch("/api/tools/beschlussprotokoll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gemeinschaft,
          adresse,
          datum,
          uhrzeit,
          ort,
          verwalter,
          vorsitzender,
          anwesende,
          gesamtmiteigentuemer: gesamtMiteigentuemer,
          vertreteneAnteile,
          gesamtanteile,
          tagesordnung: tops,
          sonstiges,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Fehler beim Generieren");
      setProtokoll(data.protokoll);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unbekannter Fehler");
    } finally {
      setIsGenerating(false);
    }
  }

  function downloadProtokoll() {
    const blob = new Blob([protokoll], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Beschlussprotokoll-${gemeinschaft.replace(/\s+/g, "-")}-${datum.replace(/\./g, "-")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-warm-white">
        {/* Hero */}
        <section className="bg-navy text-white py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <DocumentIcon className="w-4 h-4" />
              Kostenlos & KI-gestützt
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              WEG Beschlussprotokoll<br />Generator
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Rechtssichere Beschlussprotokolle nach § 24 WEG in Sekunden. Eingaben machen — KI schreibt das Protokoll.
            </p>
          </div>
        </section>

        {/* Main content */}
        <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">

          {/* Versammlungsdaten */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-navy mb-6">Versammlungsdaten</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">WEG-Bezeichnung</label>
                <input
                  type="text"
                  value={gemeinschaft}
                  onChange={(e) => setGemeinschaft(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-navy text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Anschrift der WEG</label>
                <input
                  type="text"
                  value={adresse}
                  onChange={(e) => setAdresse(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-navy text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Datum der Versammlung</label>
                <input
                  type="text"
                  value={datum}
                  onChange={(e) => setDatum(e.target.value)}
                  placeholder="z.B. 26.02.2026"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-navy text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Uhrzeit (Beginn)</label>
                <input
                  type="text"
                  value={uhrzeit}
                  onChange={(e) => setUhrzeit(e.target.value)}
                  placeholder="z.B. 18:00"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-navy text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-navy mb-1.5">Versammlungsort</label>
                <input
                  type="text"
                  value={ort}
                  onChange={(e) => setOrt(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-navy text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Versammlungsleiter / Vorsitzender</label>
                <input
                  type="text"
                  value={vorsitzender}
                  onChange={(e) => setVorsitzender(e.target.value)}
                  placeholder="Name des Versammlungsleiters"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-navy text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Verwalter</label>
                <input
                  type="text"
                  value={verwalter}
                  onChange={(e) => setVerwalter(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-navy text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-navy mb-1.5">
                  Anwesende Eigentümer (Namen / Wohneinheiten)
                </label>
                <textarea
                  value={anwesende}
                  onChange={(e) => setAnwesende(e.target.value)}
                  rows={3}
                  placeholder="z.B. Müller (WE 1), Schmidt (WE 2, 3), Meier-Hoffmann (WE 4) — in Vertretung für Weber (WE 5)..."
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-navy text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Beschlussfähigkeit */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-navy mb-6">Beschlussfähigkeit</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Gesamtzahl Miteigentümer</label>
                <input
                  type="number"
                  value={gesamtMiteigentuemer}
                  onChange={(e) => setGesamtMiteigentuemer(parseInt(e.target.value) || 0)}
                  min={1}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-navy text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Vertretene Anteile</label>
                <input
                  type="number"
                  value={vertreteneAnteile}
                  onChange={(e) => setVertreteneAnteile(parseInt(e.target.value) || 0)}
                  min={0}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-navy text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Gesamte Anteile (MEA)</label>
                <input
                  type="number"
                  value={gesamtanteile}
                  onChange={(e) => setGesamtanteile(parseInt(e.target.value) || 1)}
                  min={1}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-navy text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all"
                />
              </div>
            </div>
            <div className={`mt-5 p-4 rounded-xl text-sm font-medium ${parseFloat(beschlussfaehigkeit) > 50 ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
              {parseFloat(beschlussfaehigkeit) > 50
                ? `✓ Beschlussfähig — ${beschlussfaehigkeit}% der Anteile vertreten (> 50%)`
                : `⚠ ${beschlussfaehigkeit}% vertreten — nach § 25 Abs. 4 WEG n.F. trotzdem beschlussfähig (Quorum abgeschafft)`}
            </div>
            <p className="mt-3 text-xs text-gray-500">
              Hinweis: Nach der WEG-Reform 2020 (§ 25 Abs. 4 WEG n.F.) gibt es kein Mindestquorum mehr. Jede Versammlung ist beschlussfähig, sofern sie ordnungsgemäß einberufen wurde.
            </p>
          </div>

          {/* Tagesordnungspunkte */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-navy">Tagesordnung & Beschlüsse</h2>
              <button
                onClick={addTOP}
                className="flex items-center gap-2 text-sm font-medium text-teal bg-teal/10 hover:bg-teal/20 px-4 py-2 rounded-xl transition-all"
              >
                <PlusIcon className="w-4 h-4" />
                TOP hinzufügen
              </button>
            </div>
            <div className="space-y-6">
              {tops.map((top, index) => (
                <div key={top.id} className="border-2 border-gray-100 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold text-navy bg-navy/10 px-3 py-1 rounded-full">
                      TOP {index + 1}
                    </span>
                    <button
                      onClick={() => removeTOP(top.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Tagesordnungspunkt</label>
                      <input
                        type="text"
                        value={top.tagesordnungspunkt}
                        onChange={(e) => updateTOP(top.id, "tagesordnungspunkt", e.target.value)}
                        placeholder="z.B. Instandsetzung Tiefgarage — Auftragsvergabe"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-navy text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Beschlusswortlaut</label>
                      <textarea
                        value={top.beschluss}
                        onChange={(e) => updateTOP(top.id, "beschluss", e.target.value)}
                        rows={2}
                        placeholder="z.B. Die WEG beauftragt Firma XY mit der Instandsetzung der Tiefgarage zu einem Preis von maximal 25.000 € inkl. MwSt."
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-navy text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all"
                      />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-green-700 mb-1">Ja-Stimmen</label>
                        <input
                          type="number"
                          value={top.abstimmung.ja}
                          onChange={(e) => updateAbstimmung(top.id, "ja", parseInt(e.target.value) || 0)}
                          min={0}
                          className="w-full px-3 py-2.5 rounded-xl border-2 border-green-200 text-navy text-sm focus:outline-none focus:border-green-500 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-red-600 mb-1">Nein-Stimmen</label>
                        <input
                          type="number"
                          value={top.abstimmung.nein}
                          onChange={(e) => updateAbstimmung(top.id, "nein", parseInt(e.target.value) || 0)}
                          min={0}
                          className="w-full px-3 py-2.5 rounded-xl border-2 border-red-200 text-navy text-sm focus:outline-none focus:border-red-500 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Enthaltungen</label>
                        <input
                          type="number"
                          value={top.abstimmung.enthaltung}
                          onChange={(e) => updateAbstimmung(top.id, "enthaltung", parseInt(e.target.value) || 0)}
                          min={0}
                          className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-navy text-sm focus:outline-none focus:border-teal transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-navy mb-1">Ergebnis</label>
                        <select
                          value={top.ergebnis}
                          onChange={(e) => updateTOP(top.id, "ergebnis", e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-navy text-sm focus:outline-none focus:border-teal transition-all"
                        >
                          <option value="angenommen">✓ Angenommen</option>
                          <option value="abgelehnt">✗ Abgelehnt</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sonstiges */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-navy mb-4">Sonstiges / Verschiedenes</h2>
            <textarea
              value={sonstiges}
              onChange={(e) => setSonstiges(e.target.value)}
              rows={3}
              placeholder="Weitere Punkte, Wortmeldungen, nächste Versammlung..."
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-navy text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all"
            />
          </div>

          {/* Generate button */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            onClick={generateProtokoll}
            disabled={isGenerating || tops.length === 0}
            className="w-full flex items-center justify-center gap-3 bg-teal text-white py-4 px-6 rounded-xl font-semibold text-base hover:bg-teal/90 transition-all hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <SpinnerIcon className="w-5 h-5" />
                Protokoll wird erstellt...
              </>
            ) : (
              <>
                <DocumentIcon className="w-5 h-5" />
                Beschlussprotokoll generieren
              </>
            )}
          </button>

          {/* Result */}
          {protokoll && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-navy">Ihr Beschlussprotokoll</h2>
                <button
                  onClick={downloadProtokoll}
                  className="flex items-center gap-2 text-sm font-medium text-teal bg-teal/10 hover:bg-teal/20 px-4 py-2 rounded-xl transition-all"
                >
                  <ArrowDownIcon className="w-4 h-4" />
                  Herunterladen
                </button>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 font-mono text-sm text-gray-800 whitespace-pre-wrap leading-relaxed border border-gray-200">
                {protokoll}
              </div>
              <div className="mt-5 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
                <strong>Hinweis:</strong> Dieses Protokoll wurde automatisch erstellt. Bitte prüfen Sie es vor der Verwendung auf Vollständigkeit und Richtigkeit. Für rechtssichere Protokollierung empfehlen wir die Begleitung durch einen erfahrenen WEG-Verwalter.
              </div>
              <div className="mt-4 p-4 bg-navy/5 rounded-xl text-sm text-navy">
                <strong>Als Eigentümer oder Verwalter Hilfe benötigt?</strong>{" "}
                <a href="/anfrage" className="underline text-teal hover:text-teal/80 font-medium">
                  Jetzt einfach verwaltet. anfragen
                </a>{" "}
                — wir übernehmen WEG-Verwaltung inkl. Eigentümerversammlung, Jahresabrechnung und Beschlussprotokoll.
              </div>
            </div>
          )}

          {/* SEO content block */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-bold text-navy mb-4">
              Beschlussprotokoll WEG — Was muss rein?
            </h2>
            <div className="prose prose-sm text-gray-700 space-y-4">
              <p>
                Das Beschlussprotokoll der Eigentümerversammlung ist ein zentrales Dokument im WEG-Recht. Nach <strong>§ 24 Abs. 6 WEG</strong> muss der Verwalter das Protokoll führen und unterzeichnen. Seit der WEG-Reform 2020 gelten neue Anforderungen.
              </p>
              <h3 className="text-base font-bold text-navy">Pflichtangaben nach § 24 WEG:</h3>
              <ul className="space-y-1 list-none pl-0">
                {[
                  "Ort, Datum und Uhrzeit der Versammlung",
                  "Namen der anwesenden und vertretenen Eigentümer",
                  "Feststellung der Beschlussfähigkeit (kein Quorum mehr nötig!)",
                  "Tagesordnungspunkte mit Abstimmungsergebnissen",
                  "Wortlaut jedes Beschlusses",
                  "Stimmverhältnis (Ja/Nein/Enthaltung)",
                  "Unterschrift des Versammlungsleiters und Protokollführers",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-teal font-bold mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <h3 className="text-base font-bold text-navy mt-6">WEG-Reform 2020: Was hat sich geändert?</h3>
              <p className="text-sm">
                Die WEG-Reform von 2020 hat das Quorum abgeschafft: Jede ordnungsgemäß einberufene Versammlung ist beschlussfähig, unabhängig davon, wie viele Miteigentumsanteile vertreten sind. Das vereinfacht die Praxis erheblich.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
