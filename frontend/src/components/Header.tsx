import { useState, useEffect, useRef } from "react";
import { Menu, X, LogIn, LogOut, User, ChevronDown, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { navLinks } from "../data/mock";
import { useAuth } from "../contexts/AuthContext";
import AuthModal from "./AuthModal";

interface HeaderProps {
  onOpenBooking: () => void;
}

export default function Header({ onOpenBooking }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const handleClick = (href: string) => {
    if (href === "#booking") {
      if (!user) {
        setAuthOpen(true);
      } else {
        onOpenBooking();
      }
    }
    setMobileOpen(false);
  };

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    setMobileOpen(false);
  };

  const getInitials = (name: string) => {
    return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
  };

  const linkClass = "relative text-sm font-medium tracking-wide text-stone-400 transition-colors duration-300 hover:text-stone-100 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gold-400 after:transition-all after:duration-300 hover:after:w-full";

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-stone-950/80 backdrop-blur-xl border-b border-stone-800/50" : "bg-transparent"}`}>
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 md:px-10">
          <a href="/" className="group flex items-center gap-2">
            <span className="font-serif text-2xl font-semibold tracking-[0.2em] text-stone-100 transition-colors group-hover:text-gold-400">
              LUMINA
            </span>
          </a>

          <ul className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                {link.href === "#booking" ? (
                  <button onClick={() => handleClick("#booking")} className={`${linkClass} cursor-pointer`}>
                    {link.label}
                  </button>
                ) : (
                  <a href={link.href} className={linkClass}>
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center">
            {user ? (
              <div ref={dropdownRef} className="relative">
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex cursor-pointer items-center gap-2 transition-all duration-300">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-400 text-xs font-bold text-stone-950">
                    {getInitials(user.name)}
                  </div>
                  <ChevronDown size={14} className={`text-stone-400 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-lg border border-stone-800 bg-stone-900 shadow-xl animate-fade-in-up">
                    <div className="border-b border-stone-800 px-4 py-3">
                      <p className="text-sm font-medium text-stone-100">{user.name}</p>
                      <p className="text-xs text-stone-500">{user.email}</p>
                      {user.role === "admin" && (
                        <span className="mt-1 inline-block rounded bg-gold-400/10 border border-gold-400/30 px-2 py-0.5 text-[10px] font-medium tracking-wide uppercase text-gold-400">Admin</span>
                      )}
                    </div>
                    <div className="p-1.5">
                      <button onClick={() => { setDropdownOpen(false); }} className="flex w-full cursor-pointer items-center gap-2.5 rounded-md px-3 py-2 text-sm text-stone-400 transition-colors hover:bg-stone-800 hover:text-stone-100">
                        <User size={15} />
                        Profilul meu
                      </button>
                      {user.role === "admin" && (
                        <button onClick={() => { setDropdownOpen(false); navigate("/admin/support"); }} className="flex w-full cursor-pointer items-center gap-2.5 rounded-md px-3 py-2 text-sm text-stone-400 transition-colors hover:bg-stone-800 hover:text-stone-100">
                          <MessageCircle size={15} />
                          Suport Chat
                        </button>
                      )}
                      <button onClick={handleLogout} className="flex w-full cursor-pointer items-center gap-2.5 rounded-md px-3 py-2 text-sm text-stone-400 transition-colors hover:bg-red-500/10 hover:text-red-400">
                        <LogOut size={15} />
                        Iesire din cont
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={() => setAuthOpen(true)} className="flex cursor-pointer items-center gap-2 border border-gold-400/40 bg-gold-400/10 px-4 py-2 text-xs font-medium tracking-widest uppercase text-gold-400 transition-all duration-300 hover:border-gold-400 hover:bg-gold-400/20">
                <LogIn size={14} />
                Cont
              </button>
            )}
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="cursor-pointer text-stone-300 md:hidden" aria-label="Toggle menu">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        <div className={`overflow-hidden border-b border-stone-800/50 bg-stone-950/95 backdrop-blur-xl transition-all duration-300 md:hidden ${mobileOpen ? "max-h-[450px] opacity-100" : "max-h-0 opacity-0 border-none"}`}>
          <ul className="flex flex-col gap-4 px-6 py-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                {link.href === "#booking" ? (
                  <button onClick={() => handleClick("#booking")} className="block text-lg font-medium text-stone-300 transition-colors hover:text-gold-400 cursor-pointer">
                    {link.label}
                  </button>
                ) : (
                  <a href={link.href} onClick={() => setMobileOpen(false)} className="block text-lg font-medium text-stone-300 transition-colors hover:text-gold-400">
                    {link.label}
                  </a>
                )}
              </li>
            ))}
            <li className="border-t border-stone-800 pt-4 mt-2">
              {user ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-400 text-xs font-bold text-stone-950">
                      {getInitials(user.name)}
                    </div>
                    <span className="text-sm text-stone-200">{user.name}</span>
                  </div>
                  <button onClick={handleLogout} className="text-sm text-red-400 cursor-pointer">Iesire</button>
                </div>
              ) : (
                <button onClick={() => { setAuthOpen(true); setMobileOpen(false); }} className="flex w-full cursor-pointer items-center justify-center gap-2 bg-gold-400/10 border border-gold-400/40 py-2.5 text-sm font-medium text-gold-400">
                  <LogIn size={14} />
                  Autentificare
                </button>
              )}
            </li>
          </ul>
        </div>
      </header>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}