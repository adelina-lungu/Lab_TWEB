import { useNavigate } from "react-router-dom";
import { ServerCrash, RotateCw, Home } from "lucide-react";

interface ServerErrorPageProps {
  errorMessage?: string;
}

export default function ServerErrorPage({ errorMessage }: ServerErrorPageProps) {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-stone-950 px-6 text-center">
      {/* Logo */}
      <button onClick={() => navigate("/")} className="absolute top-6 left-6 cursor-pointer font-serif text-2xl font-semibold tracking-[0.2em] text-stone-100 transition-colors hover:text-gold-400">
        LUMINA
      </button>

      {/* Icon */}
      <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-red-500/20 bg-red-500/5">
        <ServerCrash size={36} className="text-red-400/60" />
      </div>

      {/* Status pill */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-stone-800 bg-stone-900/50 px-4 py-1.5 text-xs font-medium tracking-wide text-stone-400">
        <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
        500 · Eroare de server
      </div>

      {/* Big number */}
      <h1 className="font-serif text-8xl font-bold text-stone-800/50 sm:text-9xl">500</h1>

      {/* Title */}
      <h2 className="mt-4 font-serif text-2xl font-semibold text-stone-100 sm:text-3xl">
        Ceva nu a functionat corect
      </h2>

      {/* Description */}
      <p className="mt-4 max-w-md text-sm leading-relaxed text-stone-400 sm:text-base">
        A aparut o eroare neasteptata pe server. Echipa noastra a fost notificata. Incearca din nou — de obicei se rezolva rapid.
      </p>

      {/* Error details */}
      {errorMessage && (
        <div className="mt-6 w-full max-w-md rounded-lg border border-stone-800 bg-stone-900/50 px-5 py-4 text-left">
          <p className="mb-2 text-xs font-medium tracking-wide uppercase text-stone-500">Detalii eroare</p>
          <code className="text-sm text-red-400/80">{errorMessage}</code>
        </div>
      )}

      {/* Buttons */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button onClick={() => window.location.reload()} className="flex cursor-pointer items-center justify-center gap-2 border border-gold-400/40 bg-gold-400/10 px-6 py-3 text-sm font-medium tracking-widest uppercase text-gold-400 transition-all duration-300 hover:border-gold-400 hover:bg-gold-400/20">
          <RotateCw size={16} />
          Reincarca
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