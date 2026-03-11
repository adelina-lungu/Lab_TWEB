import { useEffect } from "react";
import { CheckCircle, X } from "lucide-react";

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  photographerName: string;
  date: string;
}

export default function BookingModal({
  open,
  onClose,
  photographerName,
  date,
}: BookingModalProps) {
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

  if (!open) return null;

  const formatted = new Date(date + "T00:00:00").toLocaleDateString("ro-RO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative w-full max-w-md border border-stone-800 bg-stone-900 p-8 text-center animate-fade-in-up sm:p-10">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 cursor-pointer text-stone-500 transition-colors hover:text-stone-300"
          aria-label="Închide"
        >
          <X size={20} />
        </button>

        <CheckCircle size={56} className="mx-auto text-gold-400" />

        <h3 className="mt-6 font-serif text-2xl font-semibold text-stone-100">
          Cerere Trimisă!
        </h3>

        <p className="mt-4 leading-relaxed text-stone-400">
          <span className="font-medium text-gold-400">{photographerName}</span>{" "}
          te va contacta în curând pentru a confirma ședința foto in{" "}
          <span className="font-medium text-stone-200">{formatted}</span>.
        </p>

        <button
          onClick={onClose}
          className="mt-8 w-full cursor-pointer bg-gold-400 py-3 text-sm font-medium tracking-widest uppercase text-stone-950 transition-colors hover:bg-gold-500"
        >
          Gata
        </button>
      </div>
    </div>
  );
}
