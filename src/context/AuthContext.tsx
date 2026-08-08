"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { DEMO_ACCOUNTS } from "@/constants/auth";

export interface AuthUser {
  name: string;
  email: string;
  company: string;
  shipToZip: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  /** True once the persisted session has been read from localStorage. */
  isReady: boolean;
  login: (email: string, password: string) => boolean;
  register: (data: { name: string; email: string; company: string; shipToZip: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const STORAGE_KEY = "hvac-store:auth-user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Reading a persisted session from localStorage genuinely has to happen
  // in an effect (it's not available during SSR/first paint), which is
  // exactly the "synchronize with an external system" case the lint rule
  // otherwise guards against.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setUser(JSON.parse(raw));
    } catch {
      // ignore malformed/blocked storage
    } finally {
      setIsReady(true);
    }
  }, []);

  const persist = useCallback((next: AuthUser | null) => {
    setUser(next);
    try {
      if (next) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      else window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  const login = useCallback(
    (email: string, password: string) => {
      const match = DEMO_ACCOUNTS.find(
        (acc) => acc.email.toLowerCase() === email.trim().toLowerCase() && acc.password === password
      );
      if (!match) return false;
      persist({ name: match.name, email: match.email, company: match.company, shipToZip: match.shipToZip });
      return true;
    },
    [persist]
  );

  const register = useCallback(
    (data: { name: string; email: string; company: string; shipToZip: string }) => {
      // No API call - filling the form and submitting is enough to be "logged in".
      persist(data);
    },
    [persist]
  );

  const logout = useCallback(() => persist(null), [persist]);

  const value = useMemo(
    () => ({ user, isReady, login, register, logout }),
    [user, isReady, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}

/** "John Doe" -> "JD" */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join("");
}
