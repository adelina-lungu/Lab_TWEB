import { useNavigate } from "react-router-dom";
import { Camera, ArrowLeft, Home } from "lucide-react";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-stone-950 px-6 text-center">
      {/* Logo */}
      <button onClick={() => navigate("/")} className="absolute top-6 left-6 cursor-pointer font-serif text-2xl font-semibold tracking-[0.2em] text-stone-100 transition-colors hover:text-gold-400">
        LUMINA
      </button>

      {/* Icon */}
      <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-gold-400/20 bg-gold-400/5">
        <Camera size={36} className="text-gold-400/40" />
      </div>

      {/* Status pill */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-stone-800 bg-stone-900/50 px-4 py-1.5 text-xs font-medium tracking-wide text-stone-400">
        <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
        404 · Pagina nu a fost gasita
      </div>

      {/* Big number */}
      <h1 className="font-serif text-8xl font-bold text-stone-800/50 sm:text-9xl">404</h1>

      {/* Title */}
      <h2 className="mt-4 font-serif text-2xl font-semibold text-stone-100 sm:text-3xl">
        Aceasta pagina nu exista
      </h2>

      {/* Description */}
      <p className="mt-4 max-w-md text-sm leading-relaxed text-stone-400 sm:text-base">
        Pagina pe care o cauti nu exista, a fost mutata sau linkul este incorect. Verifica URL-ul si incearca din nou.
      </p>

      {/* Buttons */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button onClick={() => navigate("/")} className="flex cursor-pointer items-center justify-center gap-2 border border-gold-400/40 bg-gold-400/10 px-6 py-3 text-sm font-medium tracking-widest uppercase text-gold-400 transition-all duration-300 hover:border-gold-400 hover:bg-gold-400/20">
          <Home size={16} />
          Acasa
        </button>
        <button onClick={() => navigate(-1)} className="flex cursor-pointer items-center justify-center gap-2 border border-stone-700 px-6 py-3 text-sm font-medium tracking-widest uppercase text-stone-400 transition-all duration-300 hover:border-stone-600 hover:text-stone-200">
          <ArrowLeft size={16} />
          Inapoi
        </button>
      </div>

      {/* Footer */}
      <p className="absolute bottom-6 text-xs text-stone-700">
        &copy; 2026 Lumina Studio. Toate drepturile rezervate.
      </p>
    </div>
  );
}