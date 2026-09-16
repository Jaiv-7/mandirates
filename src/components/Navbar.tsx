import {
  BookOpen,
  Calendar,
  Columns,
  HelpCircle,
  Home,
  Lightbulb,
  LineChart,
  Menu,
  Search,
  Sprout,
  Store,
  X
} from 'lucide-react';
import React, { useState } from 'react';
import { TabType, useAgritech } from '../context/AgritechContext';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Navbar: React.FC = () => {
  const { activeTab, setActiveTab, setIsSearchModalOpen } = useAgritech();
  const { language, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: t('nav.home', 'Home'), icon: <Home className="w-4 h-4" /> },
    { id: 'vegetableGuide', label: t('nav.vegetableGuide', 'Vegetable Guide'), icon: <Sprout className="w-4 h-4" /> },
    { id: 'mandiRates', label: t('nav.mandiRates', 'APMC Mandi Rates'), icon: <Store className="w-4 h-4" /> },
    { id: 'priceTrends', label: t('nav.priceTrends', 'Price Trends'), icon: <LineChart className="w-4 h-4" /> },
    { id: 'seasonalCalendar', label: t('nav.seasonalCalendar', 'Seasonal Calendar'), icon: <Calendar className="w-4 h-4" /> },
    { id: 'areaComparison', label: t('nav.areaComparison', 'Area Comparison'), icon: <Columns className="w-4 h-4" /> },
    { id: 'agriTips', label: t('nav.agriTips', 'Agriculture Tips'), icon: <Lightbulb className="w-4 h-4" /> },
    { id: 'about', label: t('nav.about', 'About'), icon: <HelpCircle className="w-4 h-4" /> }
  ];

  const handleNavClick = (id: TabType) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 transition-shadow duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & District Branding */}
          <div
            id="brand-logo"
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white shadow-md shadow-emerald-900/10 group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6 text-emerald-100" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-stone-900 group-hover:text-emerald-800 transition-colors">
                  {language === 'gu' ? 'વડોદરા કૃષિ મિત્ર' : 'Vadodara Krushi Mitra'}
                </span>
                <span className="hidden lg:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                  Vadodara
                </span>
              </div>
              <p className="text-[11px] text-stone-500 font-medium hidden sm:block truncate max-w-xs md:max-w-md">
                {language === 'gu'
                  ? 'તમારી જમીન જાણો. યોગ્ય પાક ઉગાડો. યોગ્ય બજાર ભાવ જાણો.'
                  : 'Know Your Soil. Grow the Right Crop. Know Your Market.'}
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center space-x-1" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold tracking-normal transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 shadow-2xs font-bold border border-emerald-200/60'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  <span className={isActive ? 'text-emerald-700' : 'text-stone-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right actions: Search + Language switcher */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Search Trigger Button */}
            <button
              id="btn-nav-search"
              type="button"
              onClick={() => setIsSearchModalOpen(true)}
              className="flex items-center space-x-2 px-2.5 sm:px-3 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200/80 border border-stone-200 text-stone-600 transition-colors cursor-pointer text-xs"
              title="Search Vadodara Agritech (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-stone-500" />
              <span className="hidden md:inline font-medium text-stone-600">
                {language === 'gu' ? 'શોધો...' : 'Search...'}
              </span>
              <kbd className="hidden md:inline-flex items-center px-1 text-[10px] text-stone-400 bg-white rounded border border-stone-200 font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Mobile Hamburger Menu button */}
            <button
              id="btn-mobile-menu-toggle"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 xl:hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="xl:hidden bg-white border-b border-stone-200 px-4 pt-2 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top duration-200"
        >
          <div className="grid grid-cols-2 gap-1.5 pt-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-colors ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <span className={isActive ? 'text-emerald-700' : 'text-stone-400'}>
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
