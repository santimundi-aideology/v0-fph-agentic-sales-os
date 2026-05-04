"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  type ReactNode,
} from "react";

export type Language = "en" | "ar";

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (en: string, ar: string) => string;
  isRTL: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const STORAGE_KEY = "real-estate-demo-locale";

export function I18nProvider({ children }: { children: ReactNode }) {
  const language: Language = "en";
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    setReady(true);
  }, []);

  const setLanguage = useCallback((_lang: Language) => {}, []);

  const t = useCallback((en: string, _ar: string) => en, []);

  const isRTL = false;

  useEffect(() => {
    if (!ready || typeof document === "undefined") return;
    const html = document.documentElement;
    html.setAttribute("lang", "en");
    html.setAttribute("dir", "ltr");
  }, [ready]);

  return (
    <I18nContext.Provider value={{ language, setLanguage, t, isRTL }}>
      <div dir="ltr" className="min-h-screen">
        {children}
      </div>
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
