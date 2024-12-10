import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { Locale } from '../../i18n/types';
import { LanguageSwitcher } from '../LanguageSwitcher';

interface MainLayoutProps {
  children: React.ReactNode;
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  locale,
  onLocaleChange,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isRTL = locale === 'ar';
  
  return (
    <div className={`min-h-screen ${isRTL ? 'pr-0 lg:pr-64' : 'pl-0 lg:pl-64'}`}>
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 bg-white shadow-sm z-40 px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu className="w-6 h-6" />
          </button>
          <LanguageSwitcher
            currentLocale={locale}
            onLocaleChange={onLocaleChange}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 lg:pt-0 min-h-screen">
        <div className="p-4 lg:p-8">
          <div className="hidden lg:flex lg:justify-end mb-6">
            <LanguageSwitcher
              currentLocale={locale}
              onLocaleChange={onLocaleChange}
            />
          </div>
          {children}
        </div>
      </main>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};