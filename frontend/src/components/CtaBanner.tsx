import { ArrowRight } from "lucide-react";

interface CtaBannerProps {
  onOpenBooking?: () => void;
}

export default function CtaBanner({ onOpenBooking }: CtaBannerProps) {
  return (
    <section className="px-6 py-20 md:px-10 md:py-28">
      <div className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-lg border border-gold-400/20 bg-gradient-to-r from-gold-400/5 via-stone-900/50 to-gold-400/5 px-8 py-14 text-center sm:px-12 sm:py-20">
        <div className="absolute top-0 left-0 h-16 w-16 border-t border-l border-gold-400/30" />
        <div className="absolute bottom-0 right-0 h-16 w-16 border-b border-r border-gold-400/30" />

        <p className="mb-4 text-sm font-medium tracking-[0.3em] uppercase text-gold-400">
          Hai Să Creăm Împreună
        </p>
        <h2 className="mx-auto max-w-2xl font-serif text-2xl font-semibold text-stone-100 sm:text-3xl md:text-4xl">
          Pregătit să transformi momentele tale în amintiri de neuitat?
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-sm text-stone-400 sm:text-base">
          Contactează-ne astăzi și hai să discutăm despre proiectul tău. Prima
          consultație este gratuită.
        </p>
        <button onClick={onOpenBooking} className="group mt-8 inline-flex cursor-pointer items-center gap-3 border border-gold-400/40 bg-gold-400/10 px-8 py-4 text-sm font-medium tracking-widest uppercase text-gold-400 backdrop-blur-sm transition-all duration-300 hover:border-gold-400 hover:bg-gold-400/20">
          Programează Acum
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
}