import { ArrowRight, CheckCircle2, MapPin, ShieldAlert, Sparkles, Store } from 'lucide-react';
import React from 'react';
import { useAgritech } from '../context/AgritechContext';
import { useLanguage } from '../context/LanguageContext';
import areasData from '../data/areas.json';

export const Hero: React.FC = () => {
  const { language, t } = useLanguage();
  const { setSelectedAreaId, setActiveTab, selectedAreaId } = useAgritech();

  const quickAreas = areasData.slice(0, 8);

  const handleSelectArea = (id: string) => {
    setSelectedAreaId(id);
    setActiveTab('vegetableGuide');
  };

  return (
    <section id="hero-section" className="relative overflow-hidden bg-gradient-to-b from-stone-50 via-emerald-50/30 to-stone-50 py-12 sm:py-16 lg:py-20 border-b border-stone-200">
      {/* Subtle organic background decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300/60 text-emerald-900 text-xs font-semibold mb-6 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>{t('hero.badge', 'Vadodara District Agritech Platform')}</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight">
            {language === 'gu' ? (
              <>
                વડોદરામાં તમે શું ઉગાડી શકો <span className="text-emerald-700">તે શોધો</span>
              </>
            ) : (
              <>
                Discover What You Can <span className="text-emerald-700">Grow in Vadodara</span>
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto">
            {t(
              'hero.subtitle',
              'Find vegetables suitable for your area, understand growing conditions, and explore Vadodara APMC market prices — all in one place.'
            )}
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              id="hero-cta-find-veggies"
              type="button"
              onClick={() => setActiveTab('vegetableGuide')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm shadow-md shadow-emerald-800/15 flex items-center justify-center space-x-2 transition-all cursor-pointer group"
            >
              <span>{t('hero.ctaFind', 'Find Vegetables for My Area')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              id="hero-cta-check-mandi"
              type="button"
              onClick={() => setActiveTab('mandiRates')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 font-semibold text-sm shadow-xs flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <Store className="w-4 h-4 text-emerald-700" />
              <span>{t('hero.ctaMandi', 'Check Mandi Rates')}</span>
            </button>
          </div>

          {/* Quick Area Selection */}
          <div className="mt-10 pt-6 border-t border-stone-200/70">
            <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3">
              {t('hero.quickAreaPrompt', 'Quick Select Your Vadodara Area:')}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
              {quickAreas.map((area) => {
                const isSelected = selectedAreaId === area.id;
                return (
                  <button
                    key={area.id}
                    id={`hero-quick-area-${area.id}`}
                    type="button"
                    onClick={() => handleSelectArea(area.id)}
                    className={`inline-flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'bg-white text-stone-700 border border-stone-200 hover:border-emerald-300 hover:bg-emerald-50/50'
                    }`}
                  >
                    <MapPin className={`w-3 h-3 ${isSelected ? 'text-white' : 'text-emerald-600'}`} />
                    <span>{language === 'gu' ? area.gujaratiName : area.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
