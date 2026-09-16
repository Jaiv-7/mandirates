import {
  AlertCircle,
  ArrowRight,
  Bug,
  Calendar,
  CheckCircle2,
  Clock,
  Droplets,
  ExternalLink,
  HeartHandshake,
  Layers,
  Lightbulb,
  Scissors,
  ShieldCheck,
  Sprout,
  Store,
  Sun,
  Thermometer,
  X
} from 'lucide-react';
import React, { useEffect } from 'react';
import { useAgritech } from '../context/AgritechContext';
import { useLanguage } from '../context/LanguageContext';
import { Vegetable } from '../types/agriculture';

export const VegetableDetailsModal: React.FC = () => {
  const { activeVegetableModal, setActiveVegetableModal, navigateToMandiForCommodity, currentArea } = useAgritech();
  const { language, t } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeVegetableModal) {
        setActiveVegetableModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeVegetableModal, setActiveVegetableModal]);

  if (!activeVegetableModal) return null;

  const veg = activeVegetableModal;

  return (
    <div
      id="vegetable-details-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
      onClick={() => setActiveVegetableModal(null)}
    >
      <div
        id="vegetable-details-modal-dialog"
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-900 text-white p-6 sm:p-8 shrink-0 relative">
          <button
            id="btn-close-veg-modal"
            type="button"
            onClick={() => setActiveVegetableModal(null)}
            className="absolute top-5 right-5 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-5">
            <span className="text-5xl sm:text-6xl p-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/20 self-start">
              {veg.emoji}
            </span>
            <div>
              <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-emerald-200 mb-1">
                <span>{language === 'gu' ? veg.categoryGu : veg.category}</span>
                <span>•</span>
                <span className="italic">{veg.scientificName}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                {language === 'gu' ? veg.gujaratiName : veg.name}
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100 mt-1">
                {language === 'gu' ? veg.name : veg.gujaratiName} —{' '}
                {language === 'gu'
                  ? 'વડોદરા જિલ્લા માટે વિગતવાર વાવેતર અને વ્યવસ્થાપન માર્ગદર્શિકા'
                  : 'Complete Vadodara District Growing & Agronomic Guide'}
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 divide-y divide-stone-100">
          {/* Key Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="flex items-center space-x-1 text-[11px] font-bold text-stone-500 uppercase">
                <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                <span>{t('details.bestSeason', 'Season')}</span>
              </span>
              <p className="mt-1 font-bold text-stone-900 text-xs sm:text-sm">
                {language === 'gu' ? veg.bestSeasonGu : veg.bestSeason}
              </p>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="flex items-center space-x-1 text-[11px] font-bold text-stone-500 uppercase">
                <Clock className="w-3.5 h-3.5 text-emerald-700" />
                <span>{t('details.harvestDuration', 'Harvest')}</span>
              </span>
              <p className="mt-1 font-bold text-stone-900 text-xs sm:text-sm">
                {veg.harvestDays} {t('common.days', 'days')}
              </p>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="flex items-center space-x-1 text-[11px] font-bold text-stone-500 uppercase">
                <Thermometer className="w-3.5 h-3.5 text-amber-700" />
                <span>{t('details.temperature', 'Temp Range')}</span>
              </span>
              <p className="mt-1 font-bold text-stone-900 text-xs sm:text-sm">
                {veg.temperature}
              </p>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="flex items-center space-x-1 text-[11px] font-bold text-stone-500 uppercase">
                <Droplets className="w-3.5 h-3.5 text-teal-700" />
                <span>{t('details.waterRequirement', 'Water')}</span>
              </span>
              <p className="mt-1 font-bold text-stone-900 text-xs sm:text-sm">
                {language === 'gu' ? veg.waterCategoryGu : veg.waterCategory}
              </p>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="flex items-center space-x-1 text-[11px] font-bold text-stone-500 uppercase">
                <Sun className="w-3.5 h-3.5 text-amber-600" />
                <span>{t('details.sunlight', 'Sunlight')}</span>
              </span>
              <p className="mt-1 font-bold text-stone-900 text-xs sm:text-sm">
                {language === 'gu' ? veg.sunlightGu : veg.sunlight}
              </p>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="flex items-center space-x-1 text-[11px] font-bold text-stone-500 uppercase">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-700" />
                <span>{t('details.difficulty', 'Difficulty')}</span>
              </span>
              <p className="mt-1 font-bold text-stone-900 text-xs sm:text-sm">
                {language === 'gu' ? veg.difficultyGu : veg.difficulty}
              </p>
            </div>
          </div>

          {/* Soil Requirements & Suitable Soils */}
          <div className="pt-6">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-2 flex items-center space-x-2">
              <Layers className="w-4 h-4 text-emerald-700" />
              <span>{t('details.soilRequirement', 'Soil Requirements')}</span>
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              {language === 'gu' ? veg.soilRequirementGu : veg.soilRequirement}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="text-xs font-semibold text-stone-500">
                {language === 'gu' ? 'સુસંગત જમીન પ્રકારો:' : 'Compatible Vadodara Soils:'}
              </span>
              {(language === 'gu' ? veg.soilTypesGu : veg.soilTypes).map((soil, idx) => (
                <span key={idx} className="text-xs px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
                  {soil}
                </span>
              ))}
            </div>
          </div>

          {/* Step-by-step Cultivation Guidance */}
          <div className="pt-6">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-3 flex items-center space-x-2">
              <Sprout className="w-4 h-4 text-emerald-700" />
              <span>{t('details.cultivationTips', 'Cultivation Guidance')}</span>
            </h3>
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-700 leading-relaxed">
              {language === 'gu' ? veg.cultivationTipsGu : veg.cultivationTips}
            </div>
          </div>

          {/* Harvesting Guidance */}
          <div className="pt-6">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-3 flex items-center space-x-2">
              <Scissors className="w-4 h-4 text-teal-700" />
              <span>{t('details.harvestingTips', 'Harvesting Guidance')}</span>
            </h3>
            <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200/80 flex items-start space-x-3 text-xs text-teal-950">
              <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
              <span className="leading-relaxed">
                {language === 'gu' ? veg.harvestingTipsGu : veg.harvestingTips}
              </span>
            </div>
          </div>

          {/* Common Problems, Pests & Organic Remedies */}
          <div className="pt-6">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-3 flex items-center space-x-2">
              <Bug className="w-4 h-4 text-rose-700" />
              <span>{t('details.commonProblems', 'Common Problems & Pests')}</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(language === 'gu' ? veg.commonProblemsGu : veg.commonProblems).map((problem, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-rose-50/50 border border-rose-200 text-xs text-stone-700 flex items-start space-x-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{problem}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Companion Plants */}
          <div className="pt-6">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-2 flex items-center space-x-2">
              <HeartHandshake className="w-4 h-4 text-lime-700" />
              <span>{t('details.companionPlants', 'Companion Plants')}</span>
            </h3>
            <p className="text-xs text-stone-500 mb-3">
              {language === 'gu'
                ? 'આ પાકની સાથે વાવવાથી કીટક નિયંત્રણ અને જમીનની ફળદ્રુપતા વધે છે:'
                : 'Crops that naturally repel pests or enhance soil when intercropped:'}
            </p>
            <div className="flex flex-wrap gap-2">
              {(language === 'gu' ? veg.companionPlantsGu : veg.companionPlants).map((comp, idx) => (
                <span key={idx} className="text-xs px-3 py-1 rounded-full bg-lime-50 text-lime-900 border border-lime-200 font-medium">
                  🌿 {comp}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer with DIRECT APMC MANDI BRIDGE */}
        <div className="p-5 sm:p-6 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
          <div>
            <span className="text-xs text-stone-500 font-medium block">
              {language === 'gu' ? 'બજાર ભાવ અને હરાજી વિગતો' : 'Wholesale Market & APMC Auctions'}
            </span>
            <span className="text-xs font-semibold text-stone-700">
              {language === 'gu'
                ? `${veg.gujaratiName} માટે વડોદરા APMC મંડીના તાજા દરો ઉપલબ્ધ છે.`
                : `Live / Demo APMC auction rates available for ${veg.name}.`}
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => setActiveVegetableModal(null)}
              className="px-4 py-2.5 rounded-xl bg-white border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              {t('details.close', 'Close')}
            </button>

            {veg.relatedCommodityId ? (
              <button
                id="modal-btn-check-market"
                type="button"
                onClick={() => navigateToMandiForCommodity(veg.relatedCommodityId!, currentArea?.nearestMandi)}
                className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-sm flex items-center space-x-2 cursor-pointer"
              >
                <Store className="w-4 h-4" />
                <span>{t('details.checkMarket', 'Check Market Information')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setActiveVegetableModal(null);
                  navigateToMandiForCommodity('cotton', currentArea?.nearestMandi);
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-sm flex items-center space-x-2 cursor-pointer"
              >
                <Store className="w-4 h-4" />
                <span>{t('nav.mandiRates', 'Mandi Rates')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
