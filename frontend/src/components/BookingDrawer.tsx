import { useEffect } from "react";
import { X } from "lucide-react";
import Booking from "./Booking";
import type { ServicePackage } from "../data/mock";

interface BookingDrawerProps {
  open: boolean;
  onClose: () => void;
  preselectedPackage: ServicePackage | null;
}

export default function BookingDrawer({ open, onClose, preselectedPackage }: BookingDrawerProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[90] bg-stone-950/70 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* drawer panel — wider */}
      <div
        className={`fixed top-0 right-0 z-[100] h-full w-full max-w-5xl overflow-y-auto bg-stone-950 border-l border-stone-800 shadow-2xl transition-transform duration-500 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-stone-800 bg-stone-950/95 backdrop-blur-sm px-6 py-4">
          <div>
            <p className="text-xs font-medium tracking-[0.3em] uppercase text-gold-400">
              Rezervă Ședința
            </p>
            <h2 className="font-serif text-xl font-semibold text-stone-100 mt-1">
              Programare Online
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Închide"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-stone-800 text-stone-400 transition-all hover:border-gold-400/50 hover:text-gold-400"
          >
            <X size={18} />
          </button>
        </div>

        {/* booking content — hide its own heading via CSS */}
        <div className="pb-10 [&>section>div>div:first-child]:hidden">
          <Booking preselectedPackage={preselectedPackage} />
        </div>
      </div>
    </>
  );
}