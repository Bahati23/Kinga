import { createContext } from 'react';

export type Lang = 'en' | 'sw';

export interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  /** Translate a key; interpolates {placeholders} from vars. Falls back to English. */
  t: (key: string, vars?: Record<string, string | number>) => string;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);
