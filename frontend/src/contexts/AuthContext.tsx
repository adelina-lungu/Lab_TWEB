import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export type UserRole = "admin" | "client";

export interface User {
  name: string;
  email: string;
  phone: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => string | null;
  register: (name: string, email: string, phone: string, password: string) => string | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Admin accounts (photographer emails)
const ADMIN_EMAILS = ["alex@lumina.md", "maria@lumina.md", "victor@lumina.md"];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("lumina_user");
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        localStorage.removeItem("lumina_user");
      }
    }
  }, []);

  const register = (name: string, email: string, phone: string, password: string): string | null => {
    const usersRaw = localStorage.getItem("lumina_users") || "[]";
    const users = JSON.parse(usersRaw) as Array<{ name: string; email: string; phone: string; password: string; role: UserRole }>;

    if (users.some((u) => u.email === email)) {
      return "Acest email este deja inregistrat.";
    }

    const role: UserRole = ADMIN_EMAILS.includes(email) ? "admin" : "client";
    users.push({ name, email, phone, password, role });
    localStorage.setItem("lumina_users", JSON.stringify(users));

    const newUser = { name, email, phone, role };
    setUser(newUser);
    localStorage.setItem("lumina_user", JSON.stringify(newUser));
    return null;
  };

  const login = (email: string, password: string): string | null => {
    const usersRaw = localStorage.getItem("lumina_users") || "[]";
    const users = JSON.parse(usersRaw) as Array<{ name: string; email: string; phone: string; password: string; role: UserRole }>;

    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) {
      return "Email sau parola incorecta.";
    }

    const loggedUser = { name: found.name, email: found.email, phone: found.phone, role: found.role };
    setUser(loggedUser);
    localStorage.setItem("lumina_user", JSON.stringify(loggedUser));
    return null;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("lumina_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth trebuie folosit in interiorul AuthProvider");
  return ctx;
}