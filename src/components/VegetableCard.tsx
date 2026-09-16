import {
  ArrowRight,
  Calendar,
  Clock,
  Droplets,
  ExternalLink,
  Flame,
  Gauge,
  Sparkles,
  Store
} from 'lucide-react';
import React from 'react';
import { useAgritech } from '../context/AgritechContext';
import { useLanguage } from '../context/LanguageContext';
import { ScoredVegetable, SuitabilityLevel } from '../lib/recommendation';

export const VegetableCard: React.FC<{
  scoredItem: ScoredVegetable;
  onOpenModal: () => void;
}> = ({ scoredItem, onOpenModal }) => {
  const { vegetable, score, level, reasons, reasonsGu } = scoredItem;
  const { language, t } = useLanguage();
  const { navigateToMandiForCommodity, currentArea } = useAgritech();

  const getBadgeStyle = (lvl: SuitabilityLevel) => {
    switch (lvl) {
      case 'highlySuitable':
        return {
          bg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
          dot: 'bg-emerald-600',
          label: t('guide.suitability.highlySuitable', 'Highly Suitable')
        };
      case 'suitable':
        return {
          bg: 'bg-teal-100 text-teal-900 border-teal-300',
          dot: 'bg-teal-600',
          label: t('guide.suitability.suitable', 'Suitable')
        };
      case 'moderatelySuitable':
        return {
          bg: 'bg-amber-100 text-amber-900 border-amber-300',
          dot: 'bg-amber-600',
          label: t('guide.suitability.moderatelySuitable', 'Moderately Suitable')
        };
      case 'requiresAttention':
      default:
        return {
          bg: 'bg-stone-200 text-stone-800 border-stone-300',
          dot: 'bg-stone-500',
          label: t('guide.suitability.requiresAttention', 'Requires Attention')
        };
    }
  };

  const badge = getBadgeStyle(level);

  return (
    <div
      id={`veg-card-${vegetable.id}`}
      className="bg-white rounded-2xl border border-stone-200 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all duration-200 flex flex-col justify-between overflow-hidden group"
    >
      {/* Top Banner / Emoji / Image Representation */}
      <div className="relative p-5 pb-4 bg-gradient-to-br from-stone-50 to-emerald-50/40 border-b border-stone-100">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-4xl sm:text-5xl group-hover:scale-110 transition-transform duration-200 select-none">
              {vegetable.emoji}
            </span>
            <div>
              <h3 className="text-lg font-bold text-stone-900 leading-snug group-hover:text-emerald-800 transition-colors">
                {language === 'gu' ? vegetable.gujaratiName : vegetable.name}
              </h3>
              <p className="text-xs text-stone-500 font-medium">
                {language === 'gu' ? vegetable.name : vegetable.gujaratiName} •{' '}
                <span className="italic">{vegetable.scientificName}</span>
              </p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${badge.bg}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`}></span>
              <span>{badge.label}</span>
            </span>
            <div className="text-[10px] text-stone-500 mt-1 font-semibold">
              {score}% {language === 'gu' ? 'મેળ' : 'Match'}
            </div>
          </div>
        </div>

        {/* Why this fits reason tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {(language === 'gu' ? reasonsGu : reasons).slice(0, 2).map((reason, idx) => (
            <span
              key={idx}
              className="text-[10px] px-2 py-0.5 rounded-md bg-white text-stone-600 border border-stone-200/80 font-medium truncate max-w-full"
            >
              ✓ {reason}
            </span>
          ))}
        </div>
      </div>

      {/* Attributes Grid */}
      <div className="p-5 py-4 space-y-2.5 text-xs text-stone-600 bg-white">
        <div className="flex items-center justify-between">
          <span className="flex items-center space-x-1.5 text-stone-500">
            <Calendar className="w-3.5 h-3.5 text-stone-400" />
            <span>{t('details.bestSeason', 'Best Season')}:</span>
          </span>
          <span className="font-semibold text-stone-800">
            {language === 'gu' ? vegetable.bestSeasonGu : vegetable.bestSeason}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center space-x-1.5 text-stone-500">
            <Clock className="w-3.5 h-3.5 text-stone-400" />
            <span>{t('details.harvestDuration', 'Harvest Duration')}:</span>
          </span>
          <span className="font-semibold text-stone-800">
            {vegetable.harvestDays} {t('common.days', 'days')}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center space-x-1.5 text-stone-500">
            <Droplets className="w-3.5 h-3.5 text-stone-400" />
            <span>{t('details.waterRequirement', 'Water Need')}:</span>
          </span>
          <span className="font-semibold text-stone-800">
            {language === 'gu' ? vegetable.waterCategoryGu : vegetable.waterCategory}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center space-x-1.5 text-stone-500">
            <Gauge className="w-3.5 h-3.5 text-stone-400" />
            <span>{t('details.difficulty', 'Difficulty')}:</span>
          </span>
          <span className="font-semibold text-stone-800">
            {language === 'gu' ? vegetable.difficultyGu : vegetable.difficulty}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 pt-3 border-t border-stone-100 bg-stone-50/50 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={onOpenModal}
          className="flex-1 py-2 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
        >
          <span>{t('guide.viewDetails', 'Growing Guide')}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        {vegetable.relatedCommodityId && (
          <button
            type="button"
            onClick={() => navigateToMandiForCommodity(vegetable.relatedCommodityId!, currentArea?.nearestMandi)}
            className="py-2 px-3 rounded-xl bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 font-semibold text-xs transition-colors flex items-center space-x-1 cursor-pointer"
            title="Check wholesale market rates for this vegetable"
          >
            <Store className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden sm:inline">{language === 'gu' ? 'મંડી ભાવ' : 'Mandi Rates'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
