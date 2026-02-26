"use client";

import { PhoneIcon, EnvelopeIcon, MapPinIcon } from "./Icons";
import { useState, FormEvent } from "react";

export function Kontakt() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const telefon = data.get("telefon") as string;
    const einheiten = data.get("einheiten") as string;
    const typ = data.get("typ") as string;
    const nachricht = data.get("nachricht") as string;

    const subject = encodeURIComponent(`Anfrage von ${name} — einfach verwaltet.`);
    const body = encodeURIComponent(
      `Name: ${name}\nE-Mail: ${email}\nTelefon: ${telefon || "—"}\nEinheiten: ${einheiten || "—"}\nTyp: ${typ || "—"}\n\nNachricht:\n${nachricht || "—"}`
    );
    window.location.href = `mailto:kontakt@einfach-verwaltet.de?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <section id="kontakt" className="py-20 lg:py-32 bg-white">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 bg-teal/10 rounded-full px-4 py-1.5 mb-6">
              <span className="text-teal text-sm font-semibold">Kontakt</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4 font-serif">
              Wir melden uns noch am selben Tag
            </h2>
            <p className="text-text-light text-lg leading-relaxed mb-8">
              Kein Warteschlangensystem. Kein „Wir melden uns irgendwann." Sie bekommen eine sofortige Bestätigung und ein konkretes Angebot — am nächsten Werktag, nicht in zwei Wochen.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-warm-white border border-gray-100 flex items-center justify-center flex-shrink-0">
                  <PhoneIcon className="w-5 h-5 text-navy" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-text-light uppercase tracking-wide">Telefon</div>
                  <div className="text-navy font-medium">+49 (0)40 — folgt</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-warm-white border border-gray-100 flex items-center justify-center flex-shrink-0">
                  <EnvelopeIcon className="w-5 h-5 text-navy" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-text-light uppercase tracking-wide">E-Mail</div>
                  <a href="mailto:kontakt@einfach-verwaltet.de" className="text-navy font-medium hover:text-teal transition-colors">
                    kontakt@einfach-verwaltet.de
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-warm-white border border-gray-100 flex items-center justify-center flex-shrink-0">
                  <MapPinIcon className="w-5 h-5 text-navy" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-text-light uppercase tracking-wide">Standort</div>
                  <div className="text-navy font-medium">Singapurstr. 19, 20457 Hamburg</div>
                </div>
              </div>
            </div>

            <div className="mt-10 bg-warm-white rounded-xl p-5 border border-gray-100">
              <div className="text-sm font-semibold text-navy mb-2">Was nach Ihrer Anfrage passiert:</div>
              <ol className="space-y-2 text-sm text-text-light">
                <li className="flex items-start gap-2"><span className="font-bold text-teal flex-shrink-0">1.</span>Sofortige Bestätigung Ihrer Anfrage</li>
                <li className="flex items-start gap-2"><span className="font-bold text-teal flex-shrink-0">2.</span>Rückruf noch am selben Werktag</li>
                <li className="flex items-start gap-2"><span className="font-bold text-teal flex-shrink-0">3.</span>Schriftliches Angebot am nächsten Tag</li>
              </ol>
            </div>
          </div>

          {/* Right — Form */}
          <div className="bg-warm-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <h3 className="text-lg font-bold text-navy mb-1">Kostenloses Erstgespräch anfragen</h3>
                <p className="text-sm text-text-light">Alle Felder mit * sind Pflichtfelder.</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-navy mb-1">Name *</label>
                  <input type="text" name="name" required placeholder="Herr/Frau Muster" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-navy text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1">Telefon</label>
                  <input type="tel" name="telefon" placeholder="+49 40 ..." className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-navy text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-navy mb-1">E-Mail *</label>
                <input type="email" name="email" required placeholder="ihre@email.de" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-navy text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all" />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-navy mb-1">Anzahl Einheiten *</label>
                  <select name="einheiten" required className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-navy text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all">
                    <option value="">Bitte wählen</option>
                    <option value="1-3">1–3 Einheiten</option>
                    <option value="4-10">4–10 Einheiten</option>
                    <option value="11-30">11–30 Einheiten</option>
                    <option value="30+">Mehr als 30</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1">Verwaltungstyp *</label>
                  <select name="typ" required className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-navy text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all">
                    <option value="">Bitte wählen</option>
                    <option value="miet">Mietverwaltung</option>
                    <option value="weg">WEG-Verwaltung</option>
                    <option value="beides">Beides</option>
                    <option value="unsicher">Noch unsicher</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-navy mb-1">Ihre Nachricht (optional)</label>
                <textarea name="nachricht" rows={4} placeholder="Was bewegt Sie gerade? Was läuft mit Ihrer aktuellen Verwaltung nicht gut?" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-navy text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all resize-none" />
              </div>

              <div className="flex items-start gap-3">
                <input type="checkbox" id="datenschutz" required className="mt-1 w-4 h-4 rounded border-gray-300 text-teal focus:ring-teal cursor-pointer" />
                <label htmlFor="datenschutz" className="text-xs text-text-light leading-relaxed cursor-pointer">
                  Ich habe die <a href="/datenschutz" className="underline hover:text-teal">Datenschutzerklärung</a> gelesen und stimme der Verarbeitung meiner Daten zur Bearbeitung meiner Anfrage zu (Art. 6 Abs. 1 lit. b DSGVO). *
                </label>
              </div>

              <button type="submit" className="w-full bg-navy text-white py-4 px-6 rounded-xl font-semibold text-base hover:bg-navy/85 disabled:opacity-60 transition-all hover:shadow-md">
                Kostenlos anfragen →
              </button>

              {submitted && (
                <p className="text-teal font-semibold text-center text-sm">
                  ✓ Vielen Dank! Wir melden uns noch heute bei Ihnen.
                </p>
              )}

              <p className="text-xs text-text-light text-center">Kostenlos &amp; unverbindlich. Keine Kaltakquise.</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
