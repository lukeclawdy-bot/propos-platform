# einfach verwaltet. — Mieterportal (Tenant Portal)

> **PropOS Platform | Tenant-facing MVP**  
> Built by p3-product | Version 1.0.0-mvp

Ein mobiles Next.js 15 Webportal für Mieter zur Einreichung von Reparaturanfragen und Statusverfolgung.

---

## Schnellstart

```bash
# 1. Backend API starten (Hono.js, läuft auf :3001)
cd apps/api
npm install
npm run dev

# 2. Mieterportal starten (in neuem Terminal)
cd apps/tenant-portal
npm install
npm run dev
```

Portal läuft auf **http://localhost:3002**

---

## Demo-Login

Das Portal verbindet sich mit der Hono.js API auf `localhost:3001`.

**Demo-Zugangsdaten (in der API geseedet):**

| Feld | Wert |
|------|------|
| E-Mail | `julia.klein@example.de` |
| Passwort | `demo1234` |
| Rolle | Mieterin |

Klicken Sie auf der Login-Seite auf **„Demo-Login (Julia Klein)"** — der Login erfolgt automatisch ohne manuelle Eingabe.

---

## Seiten

| Route | Beschreibung |
|-------|-------------|
| `/` | Login-Seite: E-Mail-Eingabe (Magic Link simuliert) + Demo-Login |
| `/dashboard` | Übersicht: Mietername, aktuelle Tickets, KPIs |
| `/tickets` | Ticket-Liste mit Status-Filter (Offen / In Bearbeitung / Erledigt) |
| `/tickets/new` | Neue Reparaturanfrage einreichen |
| `/tickets/[id]` | Ticket-Details: Status, Zeitlinie, Beschreibung, Lösungsnotiz |

---

## Tech Stack

| Layer | Technologie |
|-------|------------|
| Framework | Next.js 15 (App Router) |
| Sprache | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| API Client | Native `fetch` (kein zusätzliches HTTP-Library) |
| Auth | JWT via `localStorage` (Demo: simulierter Magic Link) |
| Port | 3002 (dev) |

---

## Komponenten

### `StatusBadge`
Zeigt den Ticket-Status als farbige Pill:
- 🟡 **Offen** (gelb)
- 🔵 **In Bearbeitung** (blau)
- 🟢 **Erledigt** (grün)
- ⚫ **Geschlossen** (grau)

### `TicketCard`
Klickbare Karte mit:
- Kategorie-Icon
- Titel + Beschreibungsvorschau
- Statusbadge
- Datum + Kategorie-Label

### `RepairForm`
Vollständiges Formular für neue Anfragen:
- Kategorieauswahl (Heizung, Wasser, Elektrik, Türen/Fenster, Sonstiges)
- Dringlichkeitsstufe (Niedrig / Normal / Dringend / Notfall)
- Beschreibung (Textarea)
- Foto-Upload (File-Input, kein tatsächlicher Upload im MVP)
- Submit → POST `/api/tickets`

### `BottomNav`
Mobile-first Navigationsleiste am unteren Rand:
- 🏠 Übersicht (`/dashboard`)
- 📋 Anfragen (`/tickets`)
- ➕ Neue Anfrage (Floating Action Button, `/tickets/new`)

---

## API-Verbindung

Das Portal nutzt die Hono.js API:

```
API Base URL: http://localhost:3001  (dev)
             https://api.einfach-verwaltet.de  (prod)
```

Konfiguration via Umgebungsvariable:

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Genutzte Endpunkte

| Methode | Pfad | Verwendung |
|---------|------|-----------|
| `POST` | `/api/auth/login` | Demo-Login |
| `GET` | `/api/auth/me` | Nutzer verifizieren |
| `POST` | `/api/auth/logout` | Abmelden |
| `GET` | `/api/tickets` | Ticket-Liste |
| `GET` | `/api/tickets/:id` | Ticket-Details |
| `POST` | `/api/tickets` | Neue Anfrage einreichen |

---

## Auth-Flow (MVP)

```
1. Nutzer gibt E-Mail ein
   → Simulierter Magic Link ("Link versendet" angezeigt)
   → Demo-Login-Button erscheint

2. Demo-Login klicken
   → POST /api/auth/login mit julia.klein@example.de / demo1234
   → JWT in localStorage gespeichert (Schlüssel: ev_token)
   → User-Objekt in localStorage (Schlüssel: ev_user)
   → Weiterleitung zu /dashboard

3. Alle API-Calls tragen Authorization: Bearer <token>

4. Bei 401-Fehler → Weiterleitung zur Login-Seite
```

**Produktionsreif wäre:**
- HTTP-Only Cookie statt localStorage
- Echter Magic-Link via E-Mail (z.B. Resend)
- Token-Refresh via Refresh Token

---

## Markengestaltung

| Element | Wert |
|---------|------|
| Primärfarbe (Navy) | `#1B2B4B` |
| Akzentfarbe (Teal) | `#2DD4BF` |
| Hintergrund | `#F8FAFC` |
| Karten | `#FFFFFF` |
| Schrift | Inter (Google Fonts) |
| Sprache | Deutsch (DE) |

---

## Mobile-First

Das Portal ist für Smartphones optimiert:
- Sticky Top-Header für Seitennavigation
- Fixed Bottom-Navigation mit Safe-Area-Insets (iOS/Android)
- Touch-optimierte Buttons (min. 44px Klickfläche)
- Responsive max-width: 448px (mobile-centered)

---

## Dateistruktur

```
apps/tenant-portal/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root-Layout (Fonts, Metadata)
│   │   ├── globals.css         # Tailwind v4 + Theme-Variablen
│   │   ├── page.tsx            # Login-Seite (/)
│   │   ├── dashboard/
│   │   │   └── page.tsx        # Dashboard (/dashboard)
│   │   └── tickets/
│   │       ├── page.tsx        # Ticket-Liste (/tickets)
│   │       ├── new/
│   │       │   └── page.tsx    # Neue Anfrage (/tickets/new)
│   │       └── [id]/
│   │           └── page.tsx    # Ticket-Detail (/tickets/[id])
│   ├── components/
│   │   └── ui/
│   │       ├── BottomNav.tsx   # Mobile-Navigation
│   │       ├── RepairForm.tsx  # Reparaturanfrage-Formular
│   │       ├── StatusBadge.tsx # Status-Pill-Komponente
│   │       └── TicketCard.tsx  # Ticket-Karte
│   ├── lib/
│   │   ├── api.ts              # API-Client + Auth-Helpers
│   │   └── utils.ts            # Formatierungshelfer
│   └── types/
│       └── index.ts            # TypeScript-Typen + Konstanten
├── public/
│   └── manifest.json           # PWA-Manifest
├── next.config.ts
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## Weiterentwicklung (Post-MVP)

- [ ] Echter Magic-Link via E-Mail (Resend API)
- [ ] Push-Benachrichtigungen bei Ticket-Updates (PWA + Web Push)
- [ ] Foto-Upload zu S3/Cloudflare R2
- [ ] Echtzeit-Chat mit Hausverwaltung (WebSockets)
- [ ] Dokumentenzugang (Mietvertrag, Betriebskostenabrechnung)
- [ ] Mietzahlungshistorie
- [ ] Mehrsprachigkeit (DE/TR/EN für diverse Mieter)

---

## Referenzen

- **Backend API README:** `apps/api/README.md`
- **DB-Schema:** MC Note `cmm2h7bvg001p2tmimjei12u7`
- **Mieter-Kommunikations-Engine:** MC Note `cmm2i4kca004v2tmi6pedjzon`
- **System Architecture MC:** Folder `cmm2bpcig000911u3ix6jwhje`

---

*einfach verwaltet. GmbH — Hamburg, Germany*  
*Günstigere, bessere Hausverwaltung durch KI.*
