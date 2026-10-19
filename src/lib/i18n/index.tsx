import { useMemo, useState, type ReactNode } from 'react';
import { en } from './en';
import { sw } from './sw';
import { LanguageContext, type Lang, type LanguageContextValue } from './context';

const dictionaries: Record<Lang, Record<string, string>> = { en, sw };

const STORAGE_KEY = 'kinga:lang';

function initialLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'sw' || stored === 'en') return stored;
  } catch {
    // storage unavailable
  }
  return 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  const value = useMemo<LanguageContextValue>(() => {
    const setLang = (next: Lang) => {
      setLangState(next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // storage unavailable
      }
      document.documentElement.lang = next === 'sw' ? 'sw' : 'en';
    };

    const t = (key: string, vars?: Record<string, string | number>): string => {
      let text = dictionaries[lang][key] ?? dictionaries.en[key] ?? key;
      if (vars) {
        for (const [name, val] of Object.entries(vars)) {
          text = text.replaceAll(`{${name}}`, String(val));
        }
      }
      return text;
    };

    return { lang, setLang, t };
  }, [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
