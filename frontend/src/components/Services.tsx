import { Check, Sparkles } from "lucide-react";
import { servicePackages } from "../data/mock";
import type { ServicePackage } from "../data/mock";

interface ServicesProps {
  onSelectPackage: (pkg: ServicePackage) => void;
}

export default function Services({ onSelectPackage }: ServicesProps) {
  return (
    <section id="services" className="px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto w-full max-w-6xl">
        {/* Heading */}
        <div className="mb-12 text-center md:mb-16">
          <p className="mb-3 text-sm font-medium tracking-[0.3em] uppercase text-gold-400">
            Investiție
          </p>
          <h2 className="font-serif text-3xl font-semibold text-stone-100 sm:text-4xl md:text-5xl">
            Servicii & Prețuri
          </h2>
        </div>

        {/* Cards */}
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3 items-stretch">
          {servicePackages.map((pkg) => (
            <PricingCard
              key={pkg.id}
              pkg={pkg}
              onSelect={() => onSelectPackage(pkg)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingCard({
  pkg,
  onSelect,
}: {
  pkg: ServicePackage;
  onSelect: () => void;
}) {
  return (
    <div
      className={`group relative flex flex-col border p-6 transition-all duration-500 sm:p-8 ${
        pkg.highlighted
          ? "border-gold-400/40 bg-gold-400/5"
          : "border-stone-800 bg-stone-900/40 hover:border-stone-700"
      }`}
    >
      {pkg.highlighted && (
        <div className="absolute -top-px left-0 right-0 h-px bg-gold-400" />
      )}
      {pkg.highlighted && (
        <div className="mb-4 flex w-fit items-center gap-1.5 bg-gold-400 px-3 py-1 text-xs font-semibold tracking-wider uppercase text-stone-950">
          <Sparkles size={12} />
          Cel Mai Popular
        </div>
      )}

      <h3 className="font-serif text-2xl font-semibold text-stone-100">
        {pkg.name}
      </h3>

      <div className="mt-4 flex items-baseline gap-1">
        <span className="font-serif text-4xl font-bold text-stone-50 sm:text-5xl">
          {pkg.currency}{pkg.price}
        </span>
      </div>

      <ul className="mt-8 flex-1 space-y-3">
        {pkg.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm text-stone-400">
            <Check size={16} className="mt-0.5 shrink-0 text-gold-400" />
            {f}
          </li>
        ))}
      </ul>

      <button
        onClick={onSelect}
        className={`mt-8 w-full cursor-pointer py-3.5 text-sm font-medium tracking-widest uppercase transition-all duration-300 ${
          pkg.highlighted
            ? "bg-gold-400 text-stone-950 hover:bg-gold-500"
            : "border border-stone-700 text-stone-300 hover:border-gold-400/50 hover:text-gold-400"
        }`}
      >
        Selectează
      </button>
    </div>
  );
}
