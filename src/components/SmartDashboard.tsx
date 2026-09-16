import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Compass,
  Droplet,
  ExternalLink,
  Flame,
  Layers,
  Lightbulb,
  MapPin,
  RefreshCw,
  Sparkles,
  Sprout,
  Store,
  TrendingDown,
  TrendingUp
} from 'lucide-react';
import React, { useMemo } from 'react';
import { useAgritech } from '../context/AgritechContext';
import { useLanguage } from '../context/LanguageContext';
import marketData from '../data/marketPrices.json';
import tipsData from '../data/tips.json';
import vegetablesData from '../data/vegetables.json';
import { getNearestMarketForArea } from '../lib/areaHelpers';
import { rankVegetablesForArea } from '../lib/recommendation';
import { Vegetable } from '../types/agriculture';

export const SmartDashboard: React.FC = () => {
  const { language, t } = useLanguage();
  const {
    currentArea,
    setActiveTab,
    setSelectedAreaId,
    setActiveVegetableModal,
    navigateToMandiForCommodity
  } = useAgritech();

  // Compute top recommended vegetables for current area
  const topRecommendations = useMemo(() => {
    if (!currentArea) return [];
    const ranked = rankVegetablesForArea(vegetablesData as Vegetable[], currentArea, {
      season: 'all',
      purpose: 'all'
    });
    return ranked.slice(0, 3);
  }, [currentArea]);

  // Top commodities for preview
  const topPrices = marketData.prices.slice(0, 4);

  // Tip of the day
  const tipOfTheDay = tipsData[0];

  return (
    <section id="smart-dashboard-section" className="py-12 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-stone-100 gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t('dashboard.title', "Today's Vadodara Agriculture Snapshot")}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              {language === 'gu'
                ? `${currentArea?.gujaratiName || 'વડોદરા'} કૃષિ ઝાંખી`
                : `${currentArea?.name || 'Vadodara'} Agriculture Outlook`}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              {t('dashboard.subtitle', 'Personalized agricultural outlook for your selected area')}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              id="dashboard-btn-change-area"
              type="button"
              onClick={() => setActiveTab('vegetableGuide')}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-stone-200 hover:border-emerald-300 bg-white hover:bg-stone-50 text-xs font-semibold text-stone-700 transition-colors cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t('dashboard.changeArea', 'Change Area')}</span>
            </button>
            <button
              id="dashboard-btn-view-mandi"
              type="button"
              onClick={() => setActiveTab('mandiRates')}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-xs font-semibold text-white transition-colors cursor-pointer"
            >
              <Store className="w-3.5 h-3.5" />
              <span>{t('nav.mandiRates', 'Mandi Rates')}</span>
            </button>
          </div>
        </div>

        {/* Dashboard 4-Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 1. Area Snapshot Card (4 cols) */}
          <div className="lg:col-span-4 bg-gradient-to-br from-emerald-800 to-teal-950 rounded-2xl p-6 text-white shadow-lg flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase font-bold tracking-widest text-emerald-300">
                  {t('dashboard.selectedArea', 'Selected Area')}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-700/60 text-emerald-200 text-[11px] font-medium border border-emerald-600/40">
                  {language === 'gu' ? currentArea?.talukaGu : currentArea?.taluka}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
                {language === 'gu' ? currentArea?.gujaratiName : currentArea?.name}
              </h3>
              <p className="text-xs text-emerald-100/80 leading-relaxed mb-6">
                {language === 'gu' ? currentArea?.soilDescriptionGu : currentArea?.soilDescription}
              </p>

              <div className="space-y-2.5 pt-4 border-t border-emerald-700/60 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-emerald-200/90">{language === 'gu' ? 'જમીનનો પ્રકાર:' : 'Primary Soil:'}</span>
                  <span className="font-semibold text-white">
                    {language === 'gu' ? currentArea?.soilTypesGu[0] : currentArea?.soilTypes[0]}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-emerald-200/90">{language === 'gu' ? 'પાણી પ્રાપ્યતા:' : 'Water Status:'}</span>
                  <span className="font-semibold text-white">
                    {language === 'gu' ? currentArea?.waterAvailabilityGu : currentArea?.waterAvailability}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-emerald-200/90">{language === 'gu' ? 'નજીકની મંડી:' : 'Nearest APMC:'}</span>
                  <span className="font-semibold text-emerald-300">
                    {language === 'gu'
                      ? getNearestMarketForArea(currentArea).gujaratiName
                      : getNearestMarketForArea(currentArea).name}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-emerald-700/60 relative z-10">
              <button
                type="button"
                onClick={() => setActiveTab('vegetableGuide')}
                className="w-full py-2.5 px-4 rounded-xl bg-white text-emerald-950 font-bold text-xs hover:bg-emerald-50 transition-colors flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>{language === 'gu' ? 'સંપૂર્ણ વિસ્તાર પ્રોફાઇલ જુઓ' : 'Explore Full Area Profile'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 2. Top Recommended Vegetables (4 cols) */}
          <div className="lg:col-span-4 bg-stone-50 rounded-2xl p-6 border border-stone-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Sprout className="w-4 h-4 text-emerald-700" />
                  <h3 className="font-bold text-stone-900 text-sm sm:text-base">
                    {t('dashboard.recommendedVeggies', 'Top Recommended Vegetables')}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('vegetableGuide')}
                  className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                >
                  {t('dashboard.viewAll', 'View All')} →
                </button>
              </div>

              <div className="space-y-3">
                {topRecommendations.map(({ vegetable, score, level }) => (
                  <div
                    key={vegetable.id}
                    onClick={() => setActiveVegetableModal(vegetable)}
                    className="p-3 bg-white rounded-xl border border-stone-200 hover:border-emerald-300 hover:shadow-2xs transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl group-hover:scale-110 transition-transform">
                        {vegetable.emoji}
                      </span>
                      <div>
                        <h4 className="font-bold text-stone-900 text-xs sm:text-sm group-hover:text-emerald-700 transition-colors">
                          {language === 'gu' ? vegetable.gujaratiName : vegetable.name}
                        </h4>
                        <p className="text-[11px] text-stone-500">
                          {language === 'gu' ? vegetable.categoryGu : vegetable.category} • {vegetable.harvestDays}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        {score}% Match
                      </span>
                      <p className="text-[10px] text-stone-400 mt-0.5 font-medium">
                        {language === 'gu' ? vegetable.bestSeasonGu : vegetable.bestSeason}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-200/70 text-center">
              <span className="text-[11px] text-stone-500">
                {language === 'gu'
                  ? 'વિસ્તારની જમીન અને પાણી આધારે ક્રમાંકિત'
                  : 'Ranked according to local soil & water parameters'}
              </span>
            </div>
          </div>

          {/* 3. Latest Mandi Prices & Trends (4 cols) */}
          <div className="lg:col-span-4 bg-stone-50 rounded-2xl p-6 border border-stone-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Store className="w-4 h-4 text-amber-700" />
                  <h3 className="font-bold text-stone-900 text-sm sm:text-base">
                    {t('dashboard.latestPrices', 'Latest Mandi Prices')}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('mandiRates')}
                  className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                >
                  {t('dashboard.viewAll', 'View All')} →
                </button>
              </div>

              <div className="space-y-2.5">
                {topPrices.map((item) => {
                  const isUp = item.trend === 'up';
                  const isDown = item.trend === 'down';
                  return (
                    <div
                      key={item.id}
                      onClick={() => navigateToMandiForCommodity(item.commodityId, item.marketId)}
                      className="p-2.5 bg-white rounded-xl border border-stone-200 hover:border-emerald-300 transition-all cursor-pointer flex items-center justify-between group"
                    >
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <span className="font-bold text-stone-900 text-xs sm:text-sm group-hover:text-emerald-700">
                            {language === 'gu' ? item.commodityNameGu : item.commodityName}
                          </span>
                          <span className="text-[10px] text-stone-400">
                            • {language === 'gu' ? item.marketNameGu.split(' ')[0] : item.marketName.split(' ')[0]}
                          </span>
                        </div>
                        <p className="text-[10px] text-stone-500">
                          {language === 'gu' ? 'આવક' : 'Arrivals'}: {item.arrivals} {item.arrivalsUnit}
                        </p>
                      </div>

                      <div className="text-right flex items-center space-x-2">
                        <div>
                          <div className="font-bold text-stone-900 text-xs sm:text-sm">
                            ₹{item.modalPrice.toLocaleString('en-IN')}
                          </div>
                          <div className="text-[10px] text-stone-400">
                            /{language === 'gu' ? item.unitGu : item.unit}
                          </div>
                        </div>
                        {isUp && <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" />}
                        {isDown && <TrendingDown className="w-4 h-4 text-rose-500 shrink-0" />}
                        {!isUp && !isDown && <RefreshCw className="w-3.5 h-3.5 text-stone-400 shrink-0" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Mandi Market Trend Note */}
            <div className="mt-3 p-2.5 rounded-xl bg-amber-50 border border-amber-200/80 flex items-start space-x-2 text-[11px] text-amber-900">
              <Flame className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                {language === 'gu'
                  ? 'સયાજીપુરા મંડીમાં ઉનાળુ શાકભાજીની આવક વધતાં ટામેટા-કોબીજના ભાવ સ્થિર છે.'
                  : 'Vegetable arrivals steady at Sayajipura; Tomato & Cabbage modal rates holding firm.'}
              </span>
            </div>
          </div>
        </div>

        {/* Tip of the Day Banner */}
        {tipOfTheDay && (
          <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-stone-100 border border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-800 shrink-0 mt-0.5">
                <Lightbulb className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded">
                    {t('dashboard.tipOfTheDay', 'Agriculture Tip of the Day')}
                  </span>
                  <span className="text-xs font-semibold text-stone-600">
                    {language === 'gu' ? tipOfTheDay.categoryGu : tipOfTheDay.category}
                  </span>
                </div>
                <h4 className="font-bold text-stone-900 text-sm mt-1">
                  {language === 'gu' ? tipOfTheDay.titleGu : tipOfTheDay.title}
                </h4>
                <p className="text-xs text-stone-600 mt-0.5 max-w-4xl">
                  {language === 'gu' ? tipOfTheDay.summaryGu : tipOfTheDay.summary}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveTab('agriTips')}
              className="shrink-0 px-4 py-2 rounded-xl bg-white border border-stone-300 hover:border-stone-400 text-stone-800 font-semibold text-xs transition-colors flex items-center space-x-1.5 cursor-pointer self-start sm:self-center"
            >
              <span>{t('tips.readMore', 'Read Full Practice')}</span>
              <ChevronRight className="w-3.5 h-3.5 text-stone-500" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
