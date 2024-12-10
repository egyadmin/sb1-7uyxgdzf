import React from 'react';
import { Languages } from 'lucide-react';
import { Locale } from '../i18n/types';

interface LanguageSwitcherProps {
  currentLocale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLocale,
  onLocaleChange,
}) => {
  return (
    <button
      onClick={() => onLocaleChange(currentLocale === 'en' ? 'ar' : 'en')}
      className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
      dir={currentLocale === 'ar' ? 'rtl' : 'ltr'}
    >
      <Languages className="w-5 h-5" />
      <span>{currentLocale === 'en' ? 'العربية' : 'English'}</span>
    </button>
  );
};