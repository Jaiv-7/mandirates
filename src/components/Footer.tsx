import { Heart, MapPin, ShieldAlert, Sprout, Store } from 'lucide-react';
import React from 'react';
import { TabType, useAgritech } from '../context/AgritechContext';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { setActiveTab } = useAgritech();
  const { language, t } = useLanguage();

  const handleNav = (tab: TabType) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-stone-900 text-stone-300 pt-12 pb-8 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-8 border-b border-stone-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNav('home')}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-md">
                <Sprout className="w-6 h-6 text-emerald-100" />
              </div>
              <div>
                <span className="text-lg font-bold text-white tracking-tight">
                  {language === 'gu' ? 'વડોદરા કૃષિ મિત્ર' : 'Vadodara Krushi Mitra'}
                </span>
                <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-emerald-900 text-emerald-300 font-semibold uppercase">
                  District Agri
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              {language === 'gu'
                ? 'તમારી જમીન જાણો. યોગ્ય પાક ઉગાડો. યોગ્ય બજાર ભાવ જાણો. વડોદરા જિલ્લાના તમામ ૧૭ તાલુકા-વિસ્તારો માટે સંકલિત એગ્રીટેક પ્લેટફોર્મ.'
                : 'Know Your Soil. Grow the Right Crop. Know Your Market. Dedicated agritech and APMC wholesale price engine for Vadodara District, Gujarat.'}
            </p>

            <div className="pt-2 flex items-center space-x-2 text-xs text-stone-400">
              <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Vadodara District, Gujarat, India</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              {language === 'gu' ? 'મુખ્ય વિભાગો' : 'Platform Navigation'}
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t('nav.home', 'Home')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('vegetableGuide')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t('nav.vegetableGuide', 'Vegetable Guide')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('mandiRates')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t('nav.mandiRates', 'APMC Mandi Rates')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('priceTrends')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t('nav.priceTrends', 'Price Trends')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('seasonalCalendar')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t('nav.seasonalCalendar', 'Seasonal Calendar')}
                </button>
              </li>
            </ul>
          </div>

          {/* District APMCs */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              {language === 'gu' ? 'વડોદરા APMC મંડીઓ' : 'Vadodara APMC Markets'}
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('mandiRates')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Sayajipura APMC (City)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('mandiRates')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Padra APMC
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('mandiRates')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Karjan APMC
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('mandiRates')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Dabhoi APMC
                </button>
              </li>
            </ul>
          </div>

          {/* Resources & Tips */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              {language === 'gu' ? 'કૃષિ સંસાધનો' : 'Agronomy Resources'}
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('areaComparison')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t('nav.areaComparison', 'Area Comparison')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('agriTips')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t('nav.agriTips', 'Agriculture Tips')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t('nav.about', 'About Vadodara Agri')}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Mandatory Prominent Disclaimers Banner */}
        <div className="p-5 rounded-2xl bg-stone-800/80 border border-stone-700/80 space-y-3 text-xs text-stone-300">
          <div className="flex items-center space-x-2 text-amber-400 font-bold">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{t('disclaimer.badge', 'Data Accuracy & Indicative Notice')}</span>
            <span className="mx-2 text-stone-600">•</span>
            <span className="px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-800 text-[10px] font-bold">
              {t('disclaimer.demoBadge', 'DEMO / MOCK DATA')}
            </span>
          </div>

          <p className="text-stone-300 leading-relaxed text-[11px] sm:text-xs">
            {t(
              'disclaimer.text',
              'Recommendations are indicative and should be verified with local soil testing and agricultural experts before commercial cultivation.'
            )}
          </p>

          <p className="text-stone-400 text-[11px] leading-relaxed">
            {t(
              'disclaimer.demoText',
              'APMC mandi prices shown in this prototype are demonstration figures for technical showcase purposes. Always check the official APMC display board or secretary office for certified bidding figures.'
            )}
          </p>
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 pt-4 gap-2">
          <div>
            © {new Date().getFullYear()} Vadodara Krushi Mitra. Built for Vadodara District Agricultural Development.
          </div>
          <div className="text-[11px]">
            {language === 'gu'
              ? 'વડોદરા ખેડૂત સમુદાય અને શહેરી બાગાયતકારો માટે સમર્પિત'
              : 'Dedicated to Vadodara farmers & urban cultivators'}
          </div>
        </div>
      </div>
    </footer>
  );
};
