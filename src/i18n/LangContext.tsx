'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Lang } from './translations';

const STORAGE_KEY = 'leather-art.lang';
export const DEFAULT_LANG: Lang = 'KA';

function isLang(v: unknown): v is Lang {
  return v === 'EN' || v === 'KA' || v === 'RU';
}

const LangCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: DEFAULT_LANG,
  setLang: () => {},
});

/**
 * App-wide language state. Lives at the root layout so the chosen language
 * survives client-side navigation, and is persisted to localStorage so it
 * survives full reloads. The server always renders the KA default; the stored
 * choice is applied after mount to keep SSR and first client render identical.
 */
export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (isLang(stored)) setLangState(stored);
    } catch {
      /* storage unavailable (private mode) — keep default */
    }
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* non-persistent session is fine */
    }
  }, []);

  return <LangCtx.Provider value={{ lang, setLang }}>{children}</LangCtx.Provider>;
}

export function useLang() {
  return useContext(LangCtx);
}
