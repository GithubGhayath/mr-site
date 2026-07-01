import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { translations, LANGS } from '../i18n/translations';

const LanguageContext = createContext(null);

const STORAGE_KEY = 'mrm-lang';

function getInitialLang() {
  if (typeof window === 'undefined') return 'ar';
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return LANGS.includes(saved) ? saved : 'ar'; // Arabic is the default
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang);
  const dir = translations[lang].dir;

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  // t('section.key') — resolves a dotted path into the active language tree.
  const t = useCallback(
    (path) => {
      const parts = path.split('.');
      let node = translations[lang];
      for (const p of parts) {
        if (node == null) return path;
        node = node[p];
      }
      return node == null ? path : node;
    },
    [lang],
  );

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  }, []);

  const value = { lang, dir, setLang, toggleLang, t };
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
}
