import { useState, useMemo, useEffect } from "react";
import { ChevronLeft, ChevronRight, Lock, Calendar, Bell } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

interface Notification {
  id: string;
  clientName: string;
  clientEmail: string;
  date: string;
  photographerId: string;
  timestamp: number;
}

interface AvailabilityCalendarProps {
  photographerId: string;
  photographerName: string;
  initialBusyDates: string[];
}

export default function AvailabilityCalendar({ photographerId, photographerName, initialBusyDates }: AvailabilityCalendarProps) {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  // Busy dates from localStorage (persistent)
  const [busyDates, setBusyDates] = useState<string[]>(() => {
    const saved = localStorage.getItem(`lumina_busy_${photographerId}`);
    return saved ? JSON.parse(saved) : initialBusyDates;
  });

  // Booked dates (client reservations)
  const [bookedDates, setBookedDates] = useState<string[]>(() => {
    const saved = localStorage.getItem(`lumina_booked_${photographerId}`);
    return saved ? JSON.parse(saved) : [];
  });

  // Notifications
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem(`lumina_notif_${photographerId}`);
    return saved ? JSON.parse(saved) : [];
  });

  const [showNotif, setShowNotif] = useState(false);
  const [confirmDate, setConfirmDate] = useState<string | null>(null);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(`lumina_busy_${photographerId}`, JSON.stringify(busyDates));
  }, [busyDates, photographerId]);

  useEffect(() => {
    localStorage.setItem(`lumina_booked_${photographerId}`, JSON.stringify(bookedDates));
  }, [bookedDates, photographerId]);

  useEffect(() => {
    localStorage.setItem(`lumina_notif_${photographerId}`, JSON.stringify(notifications));
  }, [notifications, photographerId]);

  // Calendar logic
  const [viewMonth, setViewMonth] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });

  const calendarDays = useMemo(() => {
    const { year, month } = viewMonth;
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const offset = firstDay === 0 ? 6 : firstDay - 1;
    const days: (number | null)[] = Array(offset).fill(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(d);
    return days;
  }, [viewMonth]);

  const monthLabel = new Date(viewMonth.year, viewMonth.month).toLocaleDateString("ro-RO", { month: "long", year: "numeric" });

  const toDateStr = (day: number) =>
    `${viewMonth.year}-${String(viewMonth.month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const isPast = (day: number) => {
    const d = new Date(viewMonth.year, viewMonth.month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return d < today;
  };

  const prevMonth = () => setViewMonth((v) => v.month === 0 ? { year: v.year - 1, month: 11 } : { ...v, month: v.month - 1 });
  const nextMonth = () => setViewMonth((v) => v.month === 11 ? { year: v.year + 1, month: 0 } : { ...v, month: v.month + 1 });

  // Admin: toggle busy day
  const handleAdminClick = (dateStr: string) => {
    if (busyDates.includes(dateStr)) {
      setBusyDates((prev) => prev.filter((d) => d !== dateStr));
    } else {
      setBusyDates((prev) => [...prev, dateStr]);
      // Also remove any booking on that date
      setBookedDates((prev) => prev.filter((d) => d !== dateStr));
    }
  };

  // Client: book a free day
  const handleClientBook = (dateStr: string) => {
    if (!user) return;
    setBookedDates((prev) => [...prev, dateStr]);
    setBusyDates((prev) => [...prev, dateStr]);
    // Create notification
    const notif: Notification = {
      id: Date.now().toString(),
      clientName: user.name,
      clientEmail: user.email,
      date: dateStr,
      photographerId,
      timestamp: Date.now(),
    };
    setNotifications((prev) => [notif, ...prev]);
    setConfirmDate(null);
  };

  const clearNotifications = () => {
    setNotifications([]);
    setShowNotif(false);
  };

  const unreadCount = notifications.length;

  return (
    <div className="rounded-lg border border-stone-800 bg-stone-900/30 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-stone-800 px-5 py-4 sm:px-6">
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-gold-400" />
          <h3 className="text-sm font-semibold tracking-wide uppercase text-stone-200">
            {isAdmin ? "Gestioneaza disponibilitatea" : "Disponibilitate"}
          </h3>
        </div>

        {/* Admin notification bell */}
        {isAdmin && (
          <div className="relative">
            <button onClick={() => setShowNotif(!showNotif)} className="relative flex cursor-pointer items-center justify-center h-9 w-9 rounded-full border border-stone-700 text-stone-400 transition-all hover:border-gold-400/50 hover:text-gold-400">
              <Bell size={16} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold-400 text-[10px] font-bold text-stone-950">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification dropdown */}
            {showNotif && (
              <div className="absolute right-0 top-full mt-2 w-80 rounded-lg border border-stone-800 bg-stone-900 shadow-xl z-50">
                <div className="flex items-center justify-between border-b border-stone-800 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-stone-200">Rezervari noi</p>
                  {unreadCount > 0 && (
                    <button onClick={clearNotifications} className="cursor-pointer text-xs text-stone-500 hover:text-gold-400">Sterge tot</button>
                  )}
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <p className="px-4 py-6 text-center text-sm text-stone-600">Nicio rezervare noua</p>
                  ) : (
                    notifications.map((n) => (
                      <div key={n.id} className="border-b border-stone-800/50 px-4 py-3 last:border-none">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-stone-200">{n.clientName}</p>
                          <span className="text-[10px] text-stone-600">
                            {new Date(n.timestamp).toLocaleTimeString("ro-RO", { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs text-stone-500">{n.clientEmail}</p>
                        <p className="mt-1 text-xs text-gold-400">
                          Rezervare: {new Date(n.date + "T00:00:00").toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric" })}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="p-5 sm:p-6">
        {/* Admin hint */}
        {isAdmin && (
          <div className="mb-4 rounded-lg border border-gold-400/20 bg-gold-400/5 px-4 py-2.5 text-xs text-gold-400">
            <Lock size={12} className="inline mr-1.5" />
            Mod administrator — apasa pe o zi pentru a o marca ca ocupata/libera.
          </div>
        )}

        {/* Month navigation */}
        <div className="mb-4 flex items-center justify-between">
          <button onClick={prevMonth} className="cursor-pointer rounded p-1.5 text-stone-500 transition-colors hover:bg-stone-800 hover:text-stone-200">
            <ChevronLeft size={18} />
          </button>
          <span className="text-sm font-semibold capitalize tracking-wide text-stone-200">{monthLabel}</span>
          <button onClick={nextMonth} className="cursor-pointer rounded p-1.5 text-stone-500 transition-colors hover:bg-stone-800 hover:text-stone-200">
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 mb-2">
          {["Lun", "Mar", "Mie", "Joi", "Vin", "Sam", "Dum"].map((d) => (
            <div key={d} className="py-1 text-center text-[11px] font-semibold uppercase tracking-wider text-stone-600">
              {d}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 gap-1.5">
          {calendarDays.map((day, idx) => {
            if (day === null) return <div key={`e-${idx}`} className="h-11" />;

            const dateStr = toDateStr(day);
            const past = isPast(day);
            const busy = busyDates.includes(dateStr);
            const booked = bookedDates.includes(dateStr);
            const free = !busy && !past;

            return (
              <button
                key={`d-${day}`}
                disabled={past && !isAdmin}
                onClick={() => {
                  if (isAdmin) {
                    handleAdminClick(dateStr);
                  } else if (free && user) {
                    setConfirmDate(dateStr);
                  }
                }}
                className={`relative flex h-11 items-center justify-center rounded-lg text-sm transition-all duration-200 ${
                  busy
                    ? booked
                      ? "bg-gold-400/10 border border-gold-400/30 text-gold-400 font-medium"
                      : "bg-red-500/10 border border-red-500/20 text-red-400/70"
                    : past
                      ? "text-stone-700 cursor-not-allowed"
                      : isAdmin
                        ? "border border-stone-800 text-stone-300 cursor-pointer hover:border-green-500/30 hover:bg-green-500/5 hover:text-green-400"
                        : user
                          ? "border border-stone-800 text-stone-300 cursor-pointer hover:border-gold-400/30 hover:bg-gold-400/5 hover:text-gold-400"
                          : "border border-stone-800 text-stone-300"
                }`}
              >
                {day}
                {booked && (
                  <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-gold-400" />
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 border-t border-stone-800/50 pt-4 text-[11px] text-stone-500">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded border border-red-500/30 bg-red-500/10" />
            Ocupat
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded border border-gold-400/30 bg-gold-400/10" />
            Rezervat
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded border border-stone-700 bg-stone-900" />
            Disponibil
          </span>
        </div>
      </div>

      {/* Confirm booking modal */}
      {confirmDate && !isAdmin && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div onClick={() => setConfirmDate(null)} className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm" />
          <div className="relative w-full max-w-sm border border-stone-800 bg-stone-900 p-8 text-center animate-fade-in-up">
            <Calendar size={32} className="mx-auto mb-4 text-gold-400" />
            <h3 className="font-serif text-xl font-semibold text-stone-100">Confirma rezervarea</h3>
            <p className="mt-3 text-sm text-stone-400">
              Vrei sa rezervi o sedinta cu <span className="font-medium text-gold-400">{photographerName}</span> pe data de{" "}
              <span className="font-medium text-stone-200">
                {new Date(confirmDate + "T00:00:00").toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric" })}
              </span>?
            </p>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setConfirmDate(null)} className="flex-1 cursor-pointer border border-stone-700 py-2.5 text-sm font-medium text-stone-400 transition-all hover:border-stone-600 hover:text-stone-200">
                Anuleaza
              </button>
              <button onClick={() => handleClientBook(confirmDate)} className="flex-1 cursor-pointer bg-gold-400 py-2.5 text-sm font-semibold text-stone-950 transition-all hover:bg-gold-500">
                Rezerva
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}