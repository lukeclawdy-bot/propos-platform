import Link from "next/link";

export const metadata = {
  title: "Demo — einfach verwaltet.",
  description: "Sehen Sie einfach verwaltet. in Aktion. Testen Sie das Demo-Portal sofort — keine Registrierung, alle Daten fiktiv.",
};

// ─── LOOM VIDEO ────────────────────────────────────────────────────────────────
// Wenn leer: Platzhalter wird angezeigt.
// Wenn ausgefüllt: Video wird als iframe eingebettet.
// Beispiel: "https://www.loom.com/embed/abc123"
const LOOM_URL = "";
// ──────────────────────────────────────────────────────────────────────────────

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ── Header ── */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <Link href="/" className="flex items-center gap-2 w-fit">
            <div className="w-8 h-8 bg-navy rounded-lg flex items-center justify-center">
              <span className="text-teal font-bold text-sm">ev</span>
            </div>
            <span className="text-navy font-bold">
              einfach <span className="text-teal">verwaltet.</span>
            </span>
          </Link>
        </div>
      </header>

      <main>
        {/* ══════════════════════════════════════════════════════════
            SECTION 1 — VIDEO
        ══════════════════════════════════════════════════════════ */}
        <section className="bg-gray-50 py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-sm font-semibold text-teal uppercase tracking-widest mb-3">
              Demo
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-navy text-center mb-10">
              Sehen Sie einfach verwaltet. in Aktion
            </h1>

            {/* Video area */}
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-200"
              style={{ paddingBottom: "56.25%" /* 16:9 */ }}>
              {LOOM_URL ? (
                <iframe
                  src={LOOM_URL}
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; fullscreen"
                />
              ) : (
                /* Placeholder */
                <div className="absolute inset-0 bg-navy flex flex-col items-center justify-center gap-4">
                  {/* Play button */}
                  <div className="w-20 h-20 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <p className="text-white/50 text-sm">Video wird geladen…</p>
                </div>
              )}
            </div>

            {/* Developer hint */}
            <p className="text-center text-xs text-gray-400 mt-3 italic">
              ← Platzhalter für Ihr Loom-Video. URL in{" "}
              <code className="bg-gray-100 px-1 rounded">app/demo/page.tsx</code>{" "}
              Zeile&nbsp;~30 eintragen.
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 2 — KEY BENEFITS (3 columns)
        ══════════════════════════════════════════════════════════ */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Benefit 1 */}
              <div className="text-center">
                <div className="w-14 h-14 bg-teal/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-navy mb-2">24/7 Erreichbar</h3>
                <p className="text-text-light text-sm leading-relaxed">
                  Mieter immer versorgt — jede Anfrage wird sofort entgegengenommen, rund um die Uhr.
                </p>
              </div>

              {/* Benefit 2 */}
              <div className="text-center">
                <div className="w-14 h-14 bg-teal/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-navy mb-2">Echtzeit-Dashboard</h3>
                <p className="text-text-light text-sm leading-relaxed">
                  Sie sehen alles sofort — Mieteinnahmen, offene Tickets, Dokumente auf einen Blick.
                </p>
              </div>

              {/* Benefit 3 */}
              <div className="text-center">
                <div className="w-14 h-14 bg-teal/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-navy mb-2">Transparente Kosten</h3>
                <p className="text-text-light text-sm leading-relaxed">
                  €27–29/Einheit/Monat — keine versteckten Gebühren, keine Überraschungen.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 3 — DEMO PORTAL CTA
        ══════════════════════════════════════════════════════════ */}
        <section className="py-16 px-6 bg-gray-50 border-t border-b border-gray-100">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-3">
              Selbst ausprobieren
            </h2>
            <p className="text-text-light mb-8">
              Klicken Sie sich durch das vollständige Vermieter-Portal — mit echten Beispieldaten.
            </p>
            <Link
              href="/portal/dashboard?demo=true"
              className="inline-flex items-center gap-2 bg-teal text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-teal/90 transition-colors shadow-lg"
            >
              Demo-Portal öffnen
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <p className="text-sm text-gray-400 mt-3">
              Keine Registrierung. Sofort. Alle Daten fiktiv.
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 4 — ANGEBOT ANNEHMEN CTA (full-width, navy bg)
        ══════════════════════════════════════════════════════════ */}
        <section className="bg-navy py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Bereit loszulegen?
            </h2>
            <p className="text-white/70 text-lg mb-10">
              Füllen Sie die Anfrage aus — Ihr persönliches Angebot kommt in 3 Minuten.
            </p>
            <Link
              href="/anfrage"
              className="inline-flex items-center gap-2 bg-teal text-white font-bold px-10 py-4 rounded-xl text-lg hover:bg-teal/90 transition-colors shadow-xl"
            >
              Jetzt Angebot anfordern
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            {/* Trust signals */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-white/40 text-sm">
              <span>§34c GewO lizenziert</span>
              <span className="hidden sm:inline">·</span>
              <span>Hamburg &amp; Berlin</span>
              <span className="hidden sm:inline">·</span>
              <span>Seit 2026</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
