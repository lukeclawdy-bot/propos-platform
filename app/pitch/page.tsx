import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "einfach verwaltet. — Pre-Seed Investment Opportunity",
  description:
    "AI-native Hausverwaltung für den deutschen Markt. €7.1B TAM. 91% Rohmarge. Hamburg-first. Pre-Seed: €350K–500K bei €3.5M Cap (Wandeldarlehen).",
  robots: { index: false, follow: false }, // Not indexed — pitch-only
};

export default function PitchPage() {
  return (
    <main
      style={{
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
        background: "linear-gradient(135deg, #0a1628 0%, #0d1f3c 50%, #091420 100%)",
        minHeight: "100vh",
        color: "#e8f0fe",
        margin: 0,
        padding: 0,
      }}
    >
      {/* ── Header ── */}
      <header
        style={{
          borderBottom: "1px solid rgba(32, 210, 190, 0.15)",
          padding: "32px 48px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 40,
              height: 40,
              background: "#20d2be",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
            }}
          >
            🏢
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", letterSpacing: "-0.5px" }}>
              einfach <span style={{ color: "#20d2be" }}>verwaltet.</span>
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 1 }}>
              RVLT Ventures GmbH · Hamburg
            </div>
          </div>
        </div>
        <div
          style={{
            background: "rgba(32, 210, 190, 0.1)",
            border: "1px solid rgba(32, 210, 190, 0.3)",
            borderRadius: 24,
            padding: "6px 18px",
            fontSize: 12,
            color: "#20d2be",
            fontWeight: 600,
          }}
        >
          CONFIDENTIAL · PRE-SEED
        </div>
      </header>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "60px 48px" }}>

        {/* ── Hero ── */}
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(32, 210, 190, 0.1)",
              border: "1px solid rgba(32, 210, 190, 0.2)",
              borderRadius: 20,
              padding: "6px 16px",
              fontSize: 12,
              color: "#20d2be",
              fontWeight: 600,
              marginBottom: 24,
              letterSpacing: "0.05em",
            }}
          >
            <span>●</span> PRE-SEED INVESTMENT OPPORTUNITY
          </div>
          <h1
            style={{
              fontSize: 48,
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-1.5px",
              lineHeight: 1.1,
              marginBottom: 20,
            }}
          >
            einfach verwaltet.
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #20d2be, #4fd8c7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              AI-native Hausverwaltung
            </span>
          </h1>
          <p
            style={{
              fontSize: 18,
              color: "rgba(232, 240, 254, 0.7)",
              maxWidth: 580,
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Wir ersetzen die 3,2-Sterne-Branche mit einem vollständig automatisierten,
            transparenten Verwaltungsportal — AI-first, Hamburg zuerst, 40.000 Firmen im Visier.
          </p>
        </div>

        {/* ── Key Metrics ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
            marginBottom: 64,
          }}
        >
          {[
            { value: "€7.1B", label: "Total Addressable Market", sub: "Deutsche Hausverwaltung" },
            { value: "€24–34", label: "pro Einheit/Monat", sub: "Gegenüber €20–35 Incumbent" },
            { value: "91%", label: "Rohmarge", sub: "Bei 500+ Einheiten" },
            { value: "340 Einh.", label: "Break-even", sub: "Ca. 36 Monate" },
          ].map((metric) => (
            <div
              key={metric.label}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(32, 210, 190, 0.15)",
                borderRadius: 16,
                padding: "28px 24px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: 36,
                  fontWeight: 800,
                  color: "#20d2be",
                  letterSpacing: "-1px",
                  marginBottom: 8,
                }}
              >
                {metric.value}
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 4 }}>
                {metric.label}
              </div>
              <div style={{ fontSize: 11, color: "rgba(232, 240, 254, 0.45)" }}>
                {metric.sub}
              </div>
            </div>
          ))}
        </div>

        {/* ── Two Column: Problem + Solution ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 48 }}>

          {/* Problem */}
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,100,100,0.2)",
              borderRadius: 20,
              padding: 36,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,100,100,0.1)",
                borderRadius: 8,
                padding: "4px 12px",
                fontSize: 11,
                color: "#ff6b6b",
                fontWeight: 700,
                marginBottom: 20,
                letterSpacing: "0.05em",
              }}
            >
              🚨 PROBLEM
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 16, letterSpacing: "-0.5px" }}>
              Die Hausverwaltungsbranche ist kaputt
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { icon: "⭐", text: "Ø 3,2 Sterne auf Google — strukturelle Unzufriedenheit" },
                { icon: "🏭", text: "40.000 Firmen — hochfragmentiert, kein Tech-Standard" },
                { icon: "📵", text: "Telefonische Erreichbarkeit <30% — Mieter frustriert" },
                { icon: "📄", text: "Papierbasierte Prozesse dominieren noch 2026" },
                { icon: "💸", text: "€7.1B Marktvolumen — ohne echte Disruption seit 20 Jahren" },
              ].map((item) => (
                <div key={item.text} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>{item.icon}</span>
                  <span style={{ fontSize: 13, color: "rgba(232, 240, 254, 0.7)", lineHeight: 1.5 }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Solution */}
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(32, 210, 190, 0.2)",
              borderRadius: 20,
              padding: 36,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(32, 210, 190, 0.1)",
                borderRadius: 8,
                padding: "4px 12px",
                fontSize: 11,
                color: "#20d2be",
                fontWeight: 700,
                marginBottom: 20,
                letterSpacing: "0.05em",
              }}
            >
              ✅ LÖSUNG
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 16, letterSpacing: "-0.5px" }}>
              AI-native — 24/7, transparent, skalierbar
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { icon: "🤖", text: "KI-Agenten übernehmen: Tickets, Abrechnungen, Kommunikation" },
                { icon: "🌐", text: "Eigentümer-Portal: vollständige Echtzeit-Übersicht" },
                { icon: "📑", text: "Automatisierte NKA, Mieterhöhungen, Beschlussprotokolle" },
                { icon: "🏙️", text: "Hamburg-first — €200M+ Markt, dichte WEG-Dichte" },
                { icon: "🔒", text: "DSGVO-konform, DATEV-ready, vollständige Audit-Trails" },
              ].map((item) => (
                <div key={item.text} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>{item.icon}</span>
                  <span style={{ fontSize: 13, color: "rgba(232, 240, 254, 0.7)", lineHeight: 1.5 }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Traction ── */}
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(32, 210, 190, 0.12)",
            borderRadius: 20,
            padding: 40,
            marginBottom: 48,
          }}
        >
          <h2
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#fff",
              marginBottom: 28,
              letterSpacing: "-0.5px",
            }}
          >
            📈 Traction — Was steht bereits
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {[
              {
                icon: "🌐",
                title: "Website live",
                desc: "einfach-verwaltet.de mit vollständigem SEO-Framework. 50+ Blog-Beiträge zu Hausverwaltungsthemen publiziert.",
              },
              {
                icon: "📱",
                title: "Vollständiger Portal-Demo",
                desc: "Eigentümer- und Mieter-Portal vollständig gebaut und unter /demo erlebbar. Tickets, NKA, Chat, Analytics.",
              },
              {
                icon: "⚖️",
                title: "Rechtsrahmen gesichert",
                desc: "§34c GewO Analyse, DSGVO-Konzept, BGB/WEG Compliance vollständig dokumentiert.",
              },
              {
                icon: "🤖",
                title: "AI-Agenten-System",
                desc: "Multi-Agenten-Architektur: Ticket-Routing, Lead-Scoring, NKA-Generierung, Outreach — alles operativ.",
              },
              {
                icon: "📧",
                title: "Lead-CRM aktiv",
                desc: "Admin-Portal mit Leads-CRM, Outreach-Tracker, Funnel-Analytics. Inbound-Leads über /anfrage-Wizard.",
              },
              {
                icon: "🏗️",
                title: "Tech-Stack Enterprise-ready",
                desc: "Next.js 15, PostgreSQL/Drizzle, Stripe, Resend, JWT-Auth. Vercel-deployed. Multi-Tenant skalierbar.",
              },
            ].map((item) => (
              <div key={item.title} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <span
                  style={{
                    fontSize: 22,
                    flexShrink: 0,
                    background: "rgba(32, 210, 190, 0.1)",
                    borderRadius: 8,
                    width: 40,
                    height: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 4 }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: 12, color: "rgba(232, 240, 254, 0.55)", lineHeight: 1.5 }}>
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Business Model ── */}
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(32, 210, 190, 0.12)",
            borderRadius: 20,
            padding: 40,
            marginBottom: 48,
          }}
        >
          <h2
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#fff",
              marginBottom: 24,
              letterSpacing: "-0.5px",
            }}
          >
            💰 Business Model
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
            <div>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: "#20d2be", marginBottom: 12 }}>
                SaaS + Service Bundles
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  ["Basis", "1–10 Einheiten", "€34/Einheit/Monat"],
                  ["Standard", "11–50 Einheiten", "€29/Einheit/Monat"],
                  ["Professional", "51–200 Einheiten", "€24/Einheit/Monat"],
                ].map(([tier, range, price]) => (
                  <div
                    key={tier}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "10px 14px",
                      background: "rgba(255,255,255,0.03)",
                      borderRadius: 10,
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{tier}</span>
                      <span style={{ fontSize: 11, color: "rgba(232, 240, 254, 0.45)", marginLeft: 8 }}>
                        {range}
                      </span>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#20d2be" }}>{price}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: "#20d2be", marginBottom: 12 }}>
                Einheitenökonomik (500 Einheiten)
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  ["MRR", "€14.500"],
                  ["ARR", "€174.000"],
                  ["COGS/Einheit", "~€3"],
                  ["Rohmarge", "91%"],
                  ["Break-even", "340 Einheiten"],
                  ["CAC (est.)", "€800–1.200"],
                  ["LTV", "€6.000+"],
                ].map(([label, val]) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "8px 0",
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <span style={{ fontSize: 13, color: "rgba(232, 240, 254, 0.6)" }}>{label}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Team + The Ask ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 48 }}>

          {/* Team */}
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(32, 210, 190, 0.12)",
              borderRadius: 20,
              padding: 36,
            }}
          >
            <h2
              style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 24, letterSpacing: "-0.5px" }}
            >
              👤 Team
            </h2>
            <div
              style={{
                display: "flex",
                gap: 16,
                alignItems: "flex-start",
                padding: "20px",
                background: "rgba(32, 210, 190, 0.05)",
                border: "1px solid rgba(32, 210, 190, 0.15)",
                borderRadius: 16,
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 12,
                  background: "linear-gradient(135deg, #20d2be, #0a8f82)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  flexShrink: 0,
                }}
              >
                🚀
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>Lukas Schmitz</div>
                <div style={{ fontSize: 13, color: "#20d2be", marginBottom: 8 }}>
                  Founder & Geschäftsführer
                </div>
                <div style={{ fontSize: 12, color: "rgba(232, 240, 254, 0.55)", lineHeight: 1.6 }}>
                  27 Jahre, HafenCity Hamburg. RVLT Ventures GmbH.
                  Vision: KI-native Hausverwaltung für den deutschen Mittelstand.
                  Gebaut den kompletten Tech-Stack selbst mit AI-Agenten-Architektur.
                </div>
              </div>
            </div>
            <div style={{ marginTop: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(232, 240, 254, 0.4)", marginBottom: 10, letterSpacing: "0.05em" }}>
                WIR SUCHEN
              </div>
              {[
                "Co-Founder Vertrieb / Immobilien (Equity)",
                "Erstes Kundenprojekt in Hamburg (Q2 2026)",
                "Strategischer Angel-Investor mit PropTech-Netzwerk",
              ].map((item) => (
                <div key={item} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
                  <span style={{ color: "#20d2be", fontSize: 14, flexShrink: 0 }}>→</span>
                  <span style={{ fontSize: 12, color: "rgba(232, 240, 254, 0.65)", lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* The Ask */}
          <div
            style={{
              background: "linear-gradient(135deg, rgba(32, 210, 190, 0.08), rgba(32, 210, 190, 0.03))",
              border: "1px solid rgba(32, 210, 190, 0.25)",
              borderRadius: 20,
              padding: 36,
            }}
          >
            <h2
              style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 24, letterSpacing: "-0.5px" }}
            >
              🎯 The Ask
            </h2>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{ fontSize: 44, fontWeight: 800, color: "#20d2be", letterSpacing: "-2px" }}>
                €350K–500K
              </div>
              <div style={{ fontSize: 14, color: "rgba(232, 240, 254, 0.7)", marginTop: 6 }}>
                Pre-Seed · Wandeldarlehen (Convertible Note)
              </div>
              <div style={{ fontSize: 14, color: "#fff", fontWeight: 600, marginTop: 4 }}>
                Cap: €3.5M · Zins: 5% p.a.
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { label: "Instrument", value: "Wandeldarlehen (Convertible Note)" },
                { label: "Pre-Money Cap", value: "€3.5M" },
                { label: "Zinssatz", value: "5% p.a." },
                { label: "Laufzeit", value: "24 Monate" },
                { label: "Mindestticket", value: "€25.000" },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px 14px",
                    background: "rgba(255,255,255,0.04)",
                    borderRadius: 10,
                  }}
                >
                  <span style={{ fontSize: 13, color: "rgba(232, 240, 254, 0.55)" }}>{label}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{value}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(232, 240, 254, 0.4)", marginBottom: 10, letterSpacing: "0.05em" }}>
                MITTELVERWENDUNG
              </div>
              {[
                ["40%", "Vertrieb & Erstakquisition Hamburg"],
                ["30%", "Tech & Integrationen (DATEV, DocuSign)"],
                ["20%", "Operations & Compliance"],
                ["10%", "Marketing & Brand"],
              ].map(([pct, use]) => (
                <div key={use} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "center" }}>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#20d2be",
                      minWidth: 34,
                      flexShrink: 0,
                    }}
                  >
                    {pct}
                  </span>
                  <span style={{ fontSize: 12, color: "rgba(232, 240, 254, 0.65)" }}>{use}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── CTA ── */}
        <div
          style={{
            background: "rgba(32, 210, 190, 0.06)",
            border: "1px solid rgba(32, 210, 190, 0.2)",
            borderRadius: 24,
            padding: "48px",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: 28, fontWeight: 700, color: "#fff", marginBottom: 12, letterSpacing: "-0.5px" }}>
            Interesse? Sprechen wir.
          </h2>
          <p style={{ fontSize: 15, color: "rgba(232, 240, 254, 0.6)", maxWidth: 480, margin: "0 auto 28px" }}>
            Wir befinden uns in der frühen Aufbauphase und suchen strategische Erstinvestoren,
            die den deutschen PropTech-Markt mitgestalten wollen.
          </p>
          <a
            href="mailto:lukas.schmitz@years.co?subject=einfach%20verwaltet.%20%E2%80%94%20Investment%20Interest"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "#20d2be",
              color: "#0a1628",
              fontWeight: 700,
              fontSize: 15,
              padding: "14px 32px",
              borderRadius: 12,
              textDecoration: "none",
            }}
          >
            ✉️ lukas.schmitz@years.co
          </a>
          <div style={{ marginTop: 20, display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="/demo"
              style={{
                fontSize: 13,
                color: "#20d2be",
                textDecoration: "none",
                borderBottom: "1px solid rgba(32, 210, 190, 0.3)",
                paddingBottom: 2,
              }}
            >
              → Portal Demo anschauen
            </a>
            <a
              href="https://einfach-verwaltet.de"
              style={{
                fontSize: 13,
                color: "rgba(232, 240, 254, 0.5)",
                textDecoration: "none",
                borderBottom: "1px solid rgba(232, 240, 254, 0.15)",
                paddingBottom: 2,
              }}
            >
              → Website öffnen
            </a>
          </div>
        </div>

        {/* ── Footer ── */}
        <div
          style={{
            marginTop: 48,
            paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div style={{ fontSize: 12, color: "rgba(232, 240, 254, 0.3)" }}>
            RVLT Ventures GmbH · Singapurstr. 19 · 20457 Hamburg · Vertrauliches Dokument
          </div>
          <div style={{ fontSize: 12, color: "rgba(232, 240, 254, 0.3)" }}>
            Prognosen basieren auf internen Modellen. Kein Investmentangebot im rechtlichen Sinne.
          </div>
        </div>

      </div>
    </main>
  );
}
