import { useState } from "react";
import { X, Mail, Lock, User } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, register } = useAuth();

  if (!open) return null;

  const handleSubmit = () => {
    setError("");
    if (isLogin) {
      const err = login(email, password);
      if (err) { setError(err); } else { resetAndClose(); }
    } else {
      if (!name.trim()) { setError("Completeaza numele."); return; }
      const err = register(name, email, password);
      if (err) { setError(err); } else { resetAndClose(); }
    }
  };

  const resetAndClose = () => {
    setName(""); setEmail(""); setPassword(""); setError(""); onClose();
  };

  const switchMode = () => { setIsLogin(!isLogin); setError(""); };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div onClick={resetAndClose} className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm" />
      <div className="relative w-full max-w-md border border-stone-800 bg-stone-900 p-8 animate-fade-in-up sm:p-10">
        <button onClick={resetAndClose} aria-label="Inchide" className="absolute right-4 top-4 cursor-pointer text-stone-500 transition-colors hover:text-stone-300">
          <X size={20} />
        </button>

        <h2 className="font-serif text-2xl font-semibold text-stone-100">
          {isLogin ? "Autentificare" : "Inregistrare"}
        </h2>
        <p className="mt-2 text-sm text-stone-400">
          {isLogin ? "Intra in contul tau LUMINA." : "Creaza un cont nou."}
        </p>

        {error && (
          <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
            {error}
          </div>
        )}

        <div className="mt-6 flex flex-col gap-4">
          {!isLogin && (
            <div>
              <label className="mb-1.5 flex items-center gap-2 text-xs font-medium tracking-wide text-stone-400">
                <User size={13} /> Nume Complet
              </label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="ex: Adelina Lungu" className="w-full rounded-lg border border-stone-800 bg-stone-950/60 px-4 py-2.5 text-sm text-stone-100 placeholder-stone-600 outline-none transition-colors focus:border-gold-400/50" />
            </div>
          )}

          <div>
            <label className="mb-1.5 flex items-center gap-2 text-xs font-medium tracking-wide text-stone-400">
              <Mail size={13} /> Email
            </label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@exemplu.com" className="w-full rounded-lg border border-stone-800 bg-stone-950/60 px-4 py-2.5 text-sm text-stone-100 placeholder-stone-600 outline-none transition-colors focus:border-gold-400/50" />
          </div>

          <div>
            <label className="mb-1.5 flex items-center gap-2 text-xs font-medium tracking-wide text-stone-400">
              <Lock size={13} /> Parola
            </label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full rounded-lg border border-stone-800 bg-stone-950/60 px-4 py-2.5 text-sm text-stone-100 placeholder-stone-600 outline-none transition-colors focus:border-gold-400/50" />
          </div>

          <button onClick={handleSubmit} className="mt-2 w-full cursor-pointer rounded-lg bg-gold-400 py-3.5 text-xs font-semibold tracking-widest uppercase text-stone-950 transition-all duration-300 hover:bg-gold-500">
            {isLogin ? "Intra in cont" : "Creaza contul"}
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-stone-500">
          {isLogin ? "Nu ai cont? " : "Ai deja cont? "}
          <button onClick={switchMode} className="cursor-pointer text-gold-400 underline underline-offset-4 transition-colors hover:text-gold-500">
            {isLogin ? "Inregistreaza-te" : "Autentifica-te"}
          </button>
        </p>
      </div>
    </div>
  );
}