import { BoltIcon, MapPinIcon, ShieldIcon, StarIcon } from "./Icons";

const proofPoints = [
  { icon: BoltIcon, value: "Sofort", label: "Reaktionszeit — garantiert" },
  { icon: MapPinIcon, value: "Hamburg", label: "Verwurzelt & vor Ort" },
  { icon: ShieldIcon, value: "§34c", label: "GewO zugelassen" },
  { icon: StarIcon, value: "100%", label: "Preistransparenz" },
];

export function SocialProof() {
  return (
    <section className="bg-navy py-6">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {proofPoints.map((p) => (
            <div key={p.label} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <p.icon className="w-5 h-5 text-teal" />
              </div>
              <div>
                <div className="text-white font-bold text-lg leading-tight">{p.value}</div>
                <div className="text-white/60 text-xs">{p.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
