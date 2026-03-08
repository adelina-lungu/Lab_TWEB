import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920&q=80"
          alt="Studio atmosphere"
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/60 via-stone-950/40 to-stone-950" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 text-center md:px-10">
        <p className="mb-6 text-sm font-medium tracking-[0.3em] uppercase text-gold-400 animate-fade-in-up opacity-0 delay-100">
          Studio Foto
        </p>

        <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-stone-50 sm:text-5xl md:text-7xl lg:text-8xl 2xl:text-9xl animate-fade-in-up opacity-0 delay-200">
          Capturing Light,
          <br />
          <span className="italic text-gold-400">Defining Moments.</span>
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-base font-light leading-relaxed text-stone-400 sm:text-lg md:text-xl animate-fade-in-up opacity-0 delay-300">
          Servicii foto premium în Chișinău. Transformăm fiecare moment în artă.
        </p>

        <div className="mt-12 animate-fade-in-up opacity-0 delay-400">
          <a
            href="#portfolio"
            className="group inline-flex items-center gap-3 border border-gold-400/40 bg-gold-400/10 px-8 py-4 text-sm font-medium tracking-widest uppercase text-gold-400 backdrop-blur-sm transition-all duration-300 hover:border-gold-400 hover:bg-gold-400/20"
          >
            Vezi Portofoliul
            <ArrowDown
              size={16}
              className="transition-transform duration-300 group-hover:translate-y-1"
            />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-fade-in-up opacity-0 delay-500">
        <div className="animate-bounce-slow h-12 w-px bg-gradient-to-b from-transparent via-gold-400/50 to-transparent" />
      </div>
    </section>
  );
}
