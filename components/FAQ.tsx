"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Ist einfach verwaltet. eine seriöse Hausverwaltung?",
    a: "Ja. Wir sind eine zugelassene Hausverwaltung nach § 34c GewO mit Sitz in Hamburg. Unser Geschäftsführer ist IHK-zertifiziert, wir sind berufshaftpflichtversichert (§ 15 MaBV) und DSGVO-konform. Unsere Preise stehen offen auf dieser Seite — etwas, das 90 % der Hausverwaltungen nicht machen.",
  },
  {
    q: "Wie läuft der Wechsel von meiner bisherigen Hausverwaltung ab?",
    a: "Wir übernehmen den gesamten Wechselprozess für Sie. Sie kündigen Ihren bestehenden Vertrag (oder wir unterstützen Sie dabei), und wir koordinieren die Übergabe aller Dokumente, Verträge und Konten. Der Übergang dauert in der Regel 3–4 Wochen — ohne Lücken, ohne Chaos, ohne Stress für Sie oder Ihre Mieter.",
  },
  {
    q: "Was ist im Preis enthalten?",
    a: "Alles. Unsere Preise sind All-inclusive — keine versteckten Gebühren für Telefonate, Kopien, Briefverkehr oder ähnliches. Was Sie auf unserer Preisliste sehen, ist was Sie zahlen. Neuvermietungen und gerichtliche Vertretung werden separat vereinbart.",
  },
  {
    q: "Wie schnell reagieren Sie auf Anfragen?",
    a: "Sofort. Jede Anfrage wird unmittelbar bearbeitet und am selben Werktag beantwortet — das ist vertraglich festgehalten. Zum Vergleich: Die meisten Hausverwaltungen versprechen 48 Stunden oder gar nichts. In dringenden Fällen (Wasserrohrbruch, Heizungsausfall) sind wir auch außerhalb der Geschäftszeiten erreichbar.",
  },
  {
    q: "Bin ich an eine Mindestlaufzeit gebunden?",
    a: "Die Mindestvertragslaufzeit beträgt 12 Monate. Danach können Sie jederzeit mit einer Frist von 3 Monaten kündigen. Keine automatische Verlängerung um Jahre — wie bei vielen klassischen Verwaltungen üblich.",
  },
  {
    q: "Was unterscheidet Sie von großen Hausverwaltungen wie Buena oder Matera?",
    a: "Transparenz und Geschwindigkeit. Wir zeigen unsere Preise offen — bei den meisten Wettbewerbern müssen Sie erst ein Formular ausfüllen. Und wir sind ein Hamburger Unternehmen, das vor Ort ist — kein Fernverwalter aus Berlin oder München. Dazu kommt: sofortige Bearbeitung statt tagelangem Warten, ein digitales Portal mit voller Kostentransparenz, und ein Wechselprozess, der tatsächlich reibungslos funktioniert.",
  },
  {
    q: "Verwalten Sie auch WEG-Gemeinschaften?",
    a: "Ja. Wir bieten sowohl Mietverwaltung als auch WEG-Verwaltung an — inklusive Organisation der Eigentümerversammlung, Wirtschaftsplan und Jahresabrechnung nach WEG. Unser Fokus liegt derzeit auf Hamburg.",
  },
  {
    q: "Wo finde ich meine Dokumente und Abrechnungen?",
    a: "In Ihrem persönlichen digitalen Eigentümerportal. Dort finden Sie alle Verträge, Abrechnungen, Belege und Protokolle — jederzeit abrufbar, ohne Anruf oder E-Mail. Vollständig DSGVO-konform.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-20 lg:py-32 bg-warm-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-navy/8 rounded-full px-4 py-1.5 mb-6">
            <span className="text-navy text-sm font-semibold">FAQ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4 font-serif">
            Häufige Fragen
          </h2>
          <p className="text-text-light">
            Keine versteckten Antworten. Wenn Ihre Frage nicht dabei ist —{" "}
            <a href="#kontakt" className="text-teal underline">schreiben Sie uns</a>.
          </p>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={f.q} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50/50 transition-colors"
              >
                <span className="font-semibold text-navy pr-4">{f.q}</span>
                <span className={`flex-shrink-0 w-6 h-6 rounded-full border-2 border-navy/20 flex items-center justify-center transition-transform ${open === i ? "rotate-45" : ""}`}>
                  <svg className="w-3 h-3 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-6 -mt-2">
                  <p className="text-text-light text-sm leading-relaxed">{f.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
