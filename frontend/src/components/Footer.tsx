import { MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-stone-800/50 px-6 py-10 md:px-10 md:py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
        <span className="font-serif text-lg font-semibold tracking-[0.2em] text-stone-400">
          LUMINA
        </span>

        <div className="flex items-center gap-2 text-sm text-stone-500">
          <MapPin size={14} />
          Chișinău, Moldova
        </div>

        <p className="text-sm text-stone-600">
          &copy; {new Date().getFullYear()} Lumina Studio. Toate drepturile rezervate.
        </p>
      </div>
    </footer>
  );
}
