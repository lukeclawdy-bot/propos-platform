"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

interface TOP {
  nr: string;
  titel: string;
  beschlusstext: string;
  ergebnis: "angenommen" | "abgelehnt" | "vertagt";
  ja: number;
  nein: number;
  enthalten: number;
}

const defaultTop = (): TOP => ({
  nr: "", titel: "", beschlusstext: "", ergebnis: "angenommen", ja: 0, nein: 0, enthalten: 0,
});

export default function BeschlussprotokolPage() {
  const [datum, setDatum] = useState("");
  const [ort, setOrt] = useState("");
  const [verwalter, setVerwalter] = useState("einfach verwaltet., Hamburg");
  const [vorsitzender, setVorsitzender] = useState("");
  const [anwesend, setAnwesend] = useState("");
  const [beschlussfaehig, setBeschlussfaehig] = useState(true);
  const [tops, setTops] = useState<TOP[]>([defaultTop()]);
  const [loading, setLoading] = useState(false);
  const [protokoll, setProtokoll] = useState("");
  const [error, setError] = useState("");

  const addTop = () => setTops([...tops, defaultTop()]);
  const removeTop = (i: number) => setTops(tops.filter((_, idx) => idx !== i));
  const updateTop = (i: number, field: keyof TOP, value: string | number) => {
    setTops(tops.map((t, idx) => idx === i ? { ...t, [field]: value } : t));
  };

  const generate = async () => {
    if (!datum || tops.some(t => !t.titel)) {
      setError("Bitte Datum und alle TOP-Titel ausfüllen.");
      return;
    }
    setError("");
    setLoading(true);
    setProtokoll("");
    try {
      const res = await fetch("/api/werkzeuge/beschlussprotokoll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ datum, ort, verwalter, vorsitzender, anwesend, beschlussfaehig, tops }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setProtokoll(data.protokoll);
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(protokoll);
  };

  const downloadTxt = () => {
    const blob = new Blob([protokoll], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Beschlussprotokoll-${datum}.txt`;
    a.click();
  };

  return (
    <>
      <Navbar />
      <main className="pt-16 bg-warm-white min-h-screen">
        {/* Hero */}
        <div className="bg-navy py-14 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-teal/20 text-teal text-xs font-semibold px-3 py-1 rounded-full mb-4">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              KI-Werkzeug · Kostenlos
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">WEG Beschlussprotokoll Generator</h1>
            <p className="text-white/70 text-lg">Erstellt ein rechtssicheres Protokoll nach § 24 Abs. 6 WEG in Sekunden — kostenlos, direkt im Browser.</p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">
          {/* Versammlungsdaten */}
          <section className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-bold text-navy mb-5 flex items-center gap-2">
              <svg className="w-5 h-5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Versammlungsdaten
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Datum *</label>
                <input type="date" value={datum} onChange={e => setDatum(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none text-navy" />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Ort</label>
                <input type="text" value={ort} onChange={e => setOrt(e.target.value)} placeholder="z.B. Gemeinschaftsraum, Musterstr. 1"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none text-navy" />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Verwalter</label>
                <input type="text" value={verwalter} onChange={e => setVerwalter(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none text-navy" />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Vorsitzender</label>
                <input type="text" value={vorsitzender} onChange={e => setVorsitzender(e.target.value)} placeholder="Name des Versammlungsleiters"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none text-navy" />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Anwesende Miteigentumsanteile</label>
                <input type="text" value={anwesend} onChange={e => setAnwesend(e.target.value)} placeholder="z.B. 650/1000"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none text-navy" />
              </div>
              <div className="flex items-center gap-3 pt-5">
                <button onClick={() => setBeschlussfaehig(!beschlussfaehig)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${beschlussfaehig ? "bg-teal" : "bg-gray-200"}`}>
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${beschlussfaehig ? "translate-x-6" : ""}`} />
                </button>
                <span className="text-sm font-medium text-navy">Beschlussfähig (§ 25 Abs. 3 WEG)</span>
              </div>
            </div>
          </section>

          {/* TOPs */}
          <section className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-bold text-navy mb-5 flex items-center gap-2">
              <svg className="w-5 h-5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Tagesordnungspunkte
            </h2>
            <div className="space-y-6">
              {tops.map((top, i) => (
                <div key={i} className="border border-gray-100 rounded-xl p-5 relative">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-teal uppercase tracking-wide">TOP {i + 1}</span>
                    {tops.length > 1 && (
                      <button onClick={() => removeTop(i)} className="text-gray-400 hover:text-red-500 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                  <div className="space-y-3">
                    <input type="text" value={top.titel} onChange={e => updateTop(i, "titel", e.target.value)}
                      placeholder="Titel des TOP *" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-teal outline-none text-navy text-sm" />
                    <textarea value={top.beschlusstext} onChange={e => updateTop(i, "beschlusstext", e.target.value)}
                      placeholder="Beschlussantrag / Beschlusstext" rows={2}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-teal outline-none text-navy text-sm resize-none" />
                    <div className="grid grid-cols-4 gap-3">
                      <div>
                        <label className="block text-xs text-text-light mb-1">Ergebnis</label>
                        <select value={top.ergebnis} onChange={e => updateTop(i, "ergebnis", e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-navy text-sm outline-none focus:border-teal">
                          <option value="angenommen">Angenommen</option>
                          <option value="abgelehnt">Abgelehnt</option>
                          <option value="vertagt">Vertagt</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-text-light mb-1">Ja-Stimmen</label>
                        <input type="number" min={0} value={top.ja} onChange={e => updateTop(i, "ja", Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-navy text-sm outline-none focus:border-teal" />
                      </div>
                      <div>
                        <label className="block text-xs text-text-light mb-1">Nein-Stimmen</label>
                        <input type="number" min={0} value={top.nein} onChange={e => updateTop(i, "nein", Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-navy text-sm outline-none focus:border-teal" />
                      </div>
                      <div>
                        <label className="block text-xs text-text-light mb-1">Enthaltungen</label>
                        <input type="number" min={0} value={top.enthalten} onChange={e => updateTop(i, "enthalten", Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-navy text-sm outline-none focus:border-teal" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={addTop} className="mt-4 flex items-center gap-2 text-teal text-sm font-medium hover:text-navy transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              TOP hinzufügen
            </button>
          </section>

          {/* Generate button */}
          {error && <p className="text-red-500 text-sm bg-red-50 px-4 py-3 rounded-xl">{error}</p>}
          <button onClick={generate} disabled={loading}
            className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${loading ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-teal text-white hover:bg-navy"}`}>
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Protokoll wird erstellt...
              </span>
            ) : "Beschlussprotokoll generieren →"}
          </button>

          {/* Result */}
          {protokoll && (
            <section className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-navy">Ihr Beschlussprotokoll</h2>
                <div className="flex gap-2">
                  <button onClick={copyToClipboard} className="flex items-center gap-1.5 text-sm text-teal border border-teal/30 px-3 py-1.5 rounded-lg hover:bg-teal/5 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Kopieren
                  </button>
                  <button onClick={downloadTxt} className="flex items-center gap-1.5 text-sm bg-navy text-white px-3 py-1.5 rounded-lg hover:bg-teal transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download (.txt)
                  </button>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 text-sm text-navy font-mono whitespace-pre-wrap leading-relaxed max-h-[600px] overflow-y-auto">
                {protokoll.replace(/\*\*(.*?)\*\*/g, '$1')}
              </div>
              <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700">
                <strong>Hinweis:</strong> Dieses Protokoll wurde KI-gestützt erstellt und dient als Vorlage. Bitte prüfen Sie den Inhalt auf Vollständigkeit und Richtigkeit vor der Unterzeichnung. Für rechtsverbindliche Protokolle empfehlen wir eine Prüfung durch einen Fachanwalt für WEG-Recht.
              </div>
              <div className="mt-4 border-t border-gray-100 pt-4 text-center">
                <p className="text-sm text-text-light mb-3">Wollen Sie die WEG-Verwaltung professionell auslagern?</p>
                <a href="/anfrage" className="inline-block bg-teal text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-navy transition-colors">
                  Kostenloses Angebot anfragen →
                </a>
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
