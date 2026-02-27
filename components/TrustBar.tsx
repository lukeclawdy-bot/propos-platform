// TrustBar — social proof bar displayed below the Hero section
const proofItems = [
  "✓ DSGVO-konform",
  "✓ Transparent",
  "✓ Immer erreichbar",
  "✓ Festpreise ohne Überraschungen",
];

export function TrustBar() {
  return (
    <section className="bg-teal/8 border-y border-teal/15 py-3 px-6">
      <div className="max-w-[1100px] mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          {proofItems.map((item) => (
            <span key={item} className="text-navy text-sm font-medium whitespace-nowrap">
              {item}
            </span>
          ))}
          <span className="hidden sm:block text-navy/20 select-none">·</span>
          <a
            href="/referenzen"
            className="text-teal text-sm font-semibold hover:text-navy transition-colors underline underline-offset-2 whitespace-nowrap"
          >
            Eigentümer-Erfahrungen lesen →
          </a>
        </div>
      </div>
    </section>
  );
}
