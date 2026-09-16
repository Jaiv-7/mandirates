import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const LanguageSwitcher: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      id="language-switcher-container"
      className={`inline-flex items-center p-0.5 rounded-full bg-stone-100 border border-stone-200 shadow-xs ${className}`}
    >
      <button
        id="btn-lang-en"
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer ${
          language === 'en'
            ? 'bg-emerald-700 text-white shadow-xs'
            : 'text-stone-600 hover:text-stone-900'
        }`}
        aria-label="Switch to English"
      >
        English
      </button>
      <button
        id="btn-lang-gu"
        type="button"
        onClick={() => setLanguage('gu')}
        className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer ${
          language === 'gu'
            ? 'bg-emerald-700 text-white shadow-xs'
            : 'text-stone-600 hover:text-stone-900'
        }`}
        aria-label="ગુજરાતી ભાષા પસંદ કરો"
      >
        ગુજરાતી
      </button>
    </div>
  );
};
