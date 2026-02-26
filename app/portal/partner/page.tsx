"use client";

import { useState } from "react";
import Link from "next/link";

// Types
type Category = "all" | "sanitär" | "elektro" | "schlüssel" | "reinigung" | "garten" | "allgemein";
type Priority = "normal" | "dringend" | "notfall";

interface Partner {
  id: string;
  name: string;
  category: Exclude<Category, "all">;
  description: string;
  rating: number;
  responseTime: string;
}

interface Property {
  id: string;
  name: string;
}

// Demo partner data
const PARTNERS: Partner[] = [
  // Sanitär & Heizung
  {
    id: "p1",
    name: "HH Sanitär GmbH",
    category: "sanitär",
    description: "Rohrbrüche, Heizungswartung, Badinstallation",
    rating: 4.8,
    responseTime: "~1h",
  },
  {
    id: "p2",
    name: "Nordheizung Hamburg",
    category: "sanitär",
    description: "Heizungsservice, Wartungsverträge",
    rating: 4.6,
    responseTime: "~3h",
  },
  // Elektro
  {
    id: "p3",
    name: "Blitz Elektro Hamburg",
    category: "elektro",
    description: "Elektroinstallation, Störungsbeseitigung",
    rating: 4.7,
    responseTime: "~2h",
  },
  // Schlüsseldienst
  {
    id: "p4",
    name: "Hamburg Schlüssel 24",
    category: "schlüssel",
    description: "Türöffnung, Schlossaustausch, 24/7",
    rating: 4.9,
    responseTime: "~30min",
  },
  // Reinigung
  {
    id: "p5",
    name: "Sauber Hamburg",
    category: "reinigung",
    description: "Treppenhausreinigung, Grundreinigung, Wohnungsübergabe",
    rating: 4.5,
    responseTime: "~4h",
  },
  {
    id: "p6",
    name: "CleanPro Nord",
    category: "reinigung",
    description: "Gewerbliche Reinigung & Haushaltsauflösung",
    rating: 4.3,
    responseTime: "~6h",
  },
  // Garten
  {
    id: "p7",
    name: "GrünHH",
    category: "garten",
    description: "Gartenpflege, Rasenmähen, Schneeräumung",
    rating: 4.4,
    responseTime: "~1 Tag",
  },
  // Allgemein (additional for demo variety)
  {
    id: "p8",
    name: "Handwerk & Co GmbH",
    category: "allgemein",
    description: "Allgemeine Reparaturen, Malerarbeiten, Trockenbau",
    rating: 4.2,
    responseTime: "~2h",
  },
  {
    id: "p9",
    name: "Malerbetrieb Schmidt",
    category: "allgemein",
    description: "Innen- & Außenanstriche, Tapezierung, Lackierung",
    rating: 4.7,
    responseTime: "~4h",
  },
  {
    id: "p10",
    name: "FensterService Nord",
    category: "allgemein",
    description: "Fensterreparatur, Glaswechsel, Rollladen",
    rating: 4.5,
    responseTime: "~3h",
  },
];

// Demo properties for selector
const DEMO_PROPERTIES: Property[] = [
  { id: "prop1", name: "Musterstraße 12, 20095 Hamburg" },
  { id: "prop2", name: "Beispielweg 5, 20354 Hamburg" },
  { id: "prop3", name: "Demoallee 42, 20457 Hamburg" },
];

// Category labels
const CATEGORY_LABELS: Record<Category, string> = {
  all: "Alle",
  sanitär: "Sanitär & Heizung",
  elektro: "Elektro",
  schlüssel: "Schlüsseldienst",
  reinigung: "Reinigung",
  garten: "Garten",
  allgemein: "Allgemein",
};

// Category badge colors
const CATEGORY_COLORS: Record<Exclude<Category, "all">, string> = {
  sanitär: "bg-blue-50 text-blue-700",
  elektro: "bg-yellow-50 text-yellow-700",
  schlüssel: "bg-red-50 text-red-700",
  reinigung: "bg-green-50 text-green-700",
  garten: "bg-emerald-50 text-emerald-700",
  allgemein: "bg-gray-50 text-gray-700",
};

// Get initials from company name
function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

// Star rating component (SVG, no emoji)
function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-0.5">
      {/* Full stars */}
      {Array.from({ length: fullStars }).map((_, i) => (
        <svg
          key={`full-${i}`}
          className="w-4 h-4 text-amber-500 fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
      {/* Half star */}
      {hasHalfStar && (
        <svg
          key="half"
          className="w-4 h-4 text-amber-500"
          viewBox="0 0 24 24"
        >
          <defs>
            <linearGradient id="halfStar">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path
            fill="url(#halfStar)"
            stroke="currentColor"
            strokeWidth="1"
            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
          />
        </svg>
      )}
      {/* Empty stars */}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <svg
          key={`empty-${i}`}
          className="w-4 h-4 text-gray-300 fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
      <span className="ml-1 text-sm font-medium text-text-main">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

// Partner Card Component
function PartnerCard({
  partner,
  onOrder,
}: {
  partner: Partner;
  onOrder: (partner: Partner) => void;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        {/* Logo placeholder (initials) */}
        <div className="w-14 h-14 bg-teal rounded-xl flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-lg">
            {getInitials(partner.name)}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-navy text-lg truncate">{partner.name}</h3>
          <span
            className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium mt-1 ${
              CATEGORY_COLORS[partner.category]
            }`}
          >
            {CATEGORY_LABELS[partner.category]}
          </span>
        </div>
      </div>

      <p className="text-text-light text-sm mt-4 line-clamp-2">
        {partner.description}
      </p>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
        <StarRating rating={partner.rating} />
        <span className="text-sm text-text-light flex items-center gap-1">
          <svg className="w-4 h-4 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Reagiert in {partner.responseTime}
        </span>
      </div>

      <button
        onClick={() => onOrder(partner)}
        className="w-full mt-4 bg-teal hover:bg-teal/90 text-white font-medium py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
        Auftrag erteilen
      </button>
    </div>
  );
}

// Order Modal Component
function OrderModal({
  partner,
  isOpen,
  onClose,
}: {
  partner: Partner | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [selectedProperty, setSelectedProperty] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<Priority>("normal");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen || !partner) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setShowSuccess(true);

    // Reset after showing success
    setTimeout(() => {
      setShowSuccess(false);
      setSelectedProperty("");
      setDescription("");
      setPriority("normal");
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-navy/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
        {/* Success Toast */}
        {showSuccess && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/95">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-navy mb-2">Auftrag wurde übermittelt</h3>
              <p className="text-text-light text-sm">
                {partner.name} wurde benachrichtigt.
              </p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-navy">Auftrag erteilen</h2>
            <p className="text-sm text-text-light">{partner.name}</p>
          </div>
          <button
            onClick={onClose}
            className="text-text-light hover:text-text-main transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Property Selector */}
          <div>
            <label className="block text-sm font-medium text-navy mb-2">
              Für welche Immobilie?
            </label>
            <select
              value={selectedProperty}
              onChange={(e) => setSelectedProperty(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition-all text-sm"
            >
              <option value="">Bitte wählen...</option>
              {DEMO_PROPERTIES.map((prop) => (
                <option key={prop.id} value={prop.id}>
                  {prop.name}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-navy mb-2">
              Beschreibung des Auftrags
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              placeholder="Beschreiben Sie kurz, was erledigt werden muss..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition-all text-sm resize-none"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-navy mb-2">
              Priorität
            </label>
            <div className="flex gap-2">
              {[
                { value: "normal" as Priority, label: "Normal", color: "bg-gray-100 text-gray-700 hover:bg-gray-200" },
                { value: "dringend" as Priority, label: "Dringend", color: "bg-amber-100 text-amber-700 hover:bg-amber-200" },
                { value: "notfall" as Priority, label: "Notfall", color: "bg-red-100 text-red-700 hover:bg-red-200" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setPriority(opt.value)}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-sm font-medium transition-all ${
                    priority === opt.value
                      ? opt.value === "normal"
                        ? "bg-gray-200 text-gray-800 ring-2 ring-gray-300"
                        : opt.value === "dringend"
                        ? "bg-amber-200 text-amber-800 ring-2 ring-amber-300"
                        : "bg-red-200 text-red-800 ring-2 ring-red-300"
                      : opt.color
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || !selectedProperty || !description.trim()}
            className="w-full bg-teal hover:bg-teal/90 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Wird übermittelt...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Auftrag senden
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

// Main Page Component
export default function PartnerPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredPartners =
    activeCategory === "all"
      ? PARTNERS
      : PARTNERS.filter((p) => p.category === activeCategory);

  const handleOrderClick = (partner: Partner) => {
    setSelectedPartner(partner);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-light-gray flex flex-col">
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-56 bg-navy min-h-screen flex flex-col fixed left-0 top-0 bottom-0">
          <div className="px-5 py-5 border-b border-white/10">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 bg-teal rounded-md flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <span className="text-white text-sm font-bold">
                einfach <span className="text-teal">verwaltet.</span>
              </span>
            </Link>
          </div>
          <nav className="flex-1 px-3 py-4 space-y-1">
            {[
              { label: "Übersicht", href: "/portal/dashboard", active: false },
              { label: "Chat", href: "/portal/chat", active: false },
              { label: "Einheiten", href: "/portal/einheiten", active: false },
              { label: "Mieter", href: "/portal/mieter", active: false },
              { label: "Tickets", href: "/portal/tickets", active: false },
              { label: "Partner", href: "/portal/partner", active: true },
              { label: "Dokumente", href: "/portal/dokumente", active: false },
              { label: "Finanzen", href: "/portal/finanzen", active: false },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors
                  ${
                    item.active
                      ? "bg-teal/20 text-teal font-medium"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="px-4 py-4 border-t border-white/10 space-y-2">
            <a
              href="/api/portal/auth/logout"
              className="block text-white/40 hover:text-white/70 text-xs transition-colors"
            >
              Abmelden
            </a>
            <p className="text-white/30 text-xs">einfach verwaltet. v1</p>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 ml-56">
          <div className="max-w-6xl mx-auto px-8 py-8">
            {/* Hero/Intro Bar */}
            <div className="bg-navy rounded-2xl p-8 mb-8">
              <h1 className="text-2xl font-bold text-white mb-2">
                Ihr Partnernetzwerk
              </h1>
              <p className="text-white/70">
                Geprüfte Dienstleister für Ihre Immobilien
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {(
                [
                  "all",
                  "sanitär",
                  "elektro",
                  "schlüssel",
                  "reinigung",
                  "garten",
                  "allgemein",
                ] as Category[]
              ).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? "bg-teal text-white"
                      : "bg-white text-text-light hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  {CATEGORY_LABELS[cat]}
                </button>
              ))}
            </div>

            {/* Partners Grid */}
            {filteredPartners.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPartners.map((partner) => (
                  <PartnerCard
                    key={partner.id}
                    partner={partner}
                    onOrder={handleOrderClick}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-navy mb-2">
                  Keine Partner in dieser Kategorie
                </h3>
                <p className="text-text-light text-sm mb-4 max-w-md mx-auto">
                  Wir arbeiten daran, unser Partnernetzwerk zu erweitern.
                  Haben Sie einen spezifischen Bedarf?
                </p>
                <a
                  href="mailto:kontakt@einfach-verwaltet.de"
                  className="inline-flex items-center gap-2 text-teal hover:underline text-sm font-medium"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Kontaktieren Sie uns
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Order Modal */}
      <OrderModal
        partner={selectedPartner}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPartner(null);
        }}
      />
    </div>
  );
}
