import { useNavigate } from "react-router-dom";
import { ShieldX, LogIn, Home } from "lucide-react";

export default function ForbiddenPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-stone-950 px-6 text-center">
      {/* Logo */}
      <button onClick={() => navigate("/")} className="absolute top-6 left-6 cursor-pointer font-serif text-2xl font-semibold tracking-[0.2em] text-stone-100 transition-colors hover:text-gold-400">
        LUMINA
      </button>

      {/* Icon */}
      <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-orange-500/20 bg-orange-500/5">
        <ShieldX size={36} className="text-orange-400/60" />
      </div>

      {/* Status pill */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-stone-800 bg-stone-900/50 px-4 py-1.5 text-xs font-medium tracking-wide text-stone-400">
        <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
        403 · Acces interzis
      </div>

      {/* Big number */}
      <h1 className="font-serif text-8xl font-bold text-stone-800/50 sm:text-9xl">403</h1>

      {/* Title */}
      <h2 className="mt-4 font-serif text-2xl font-semibold text-stone-100 sm:text-3xl">
        Nu ai permisiunea necesara
      </h2>

      {/* Description */}
      <p className="mt-4 max-w-md text-sm leading-relaxed text-stone-400 sm:text-base">
        Contul tau nu are acces la aceasta pagina. Daca consideri ca este o greseala, contacteaza administratorul sau autentifica-te cu un alt cont.
      </p>

      {/* Buttons */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button onClick={() => navigate("/")} className="flex cursor-pointer items-center justify-center gap-2 border border-gold-400/40 bg-gold-400/10 px-6 py-3 text-sm font-medium tracking-widest uppercase text-gold-400 transition-all duration-300 hover:border-gold-400 hover:bg-gold-400/20">
          <LogIn size={16} />
          Autentificare
        </button>
        <button onClick={() => navigate("/")} className="flex cursor-pointer items-center justify-center gap-2 border border-stone-700 px-6 py-3 text-sm font-medium tracking-widest uppercase text-stone-400 transition-all duration-300 hover:border-stone-600 hover:text-stone-200">
          <Home size={16} />
          Acasa
        </button>
      </div>

      {/* Footer */}
      <p className="absolute bottom-6 text-xs text-stone-700">
        &copy; 2026 Lumina Studio. Toate drepturile rezervate.
      </p>
    </div>
  );
}