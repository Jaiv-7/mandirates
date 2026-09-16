import {
  AlertCircle,
  Calendar,
  Compass,
  Droplets,
  ExternalLink,
  Layers,
  Lightbulb,
  MapPin,
  Store,
  Sun
} from 'lucide-react';
import React from 'react';
import { useAgritech } from '../context/AgritechContext';
import { useLanguage } from '../context/LanguageContext';
import { getNearestMarketForArea } from '../lib/areaHelpers';
import { Area } from '../types/agriculture';

export const AreaProfileCard: React.FC<{ area: Area }> = ({ area }) => {
  const { language, t } = useLanguage();
  const { navigateToMandiForCommodity } = useAgritech();
  const nearestMandi = getNearestMarketForArea(area);

  return (
    <div
      id="area-agriculture-profile-card"
      className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden"
    >
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2 text-xs text-emerald-200 uppercase tracking-wider font-semibold mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{t('areaProfile.zone', 'Agro Zone')}: {language === 'gu' ? area.zoneGu : area.zone}</span>
              <span>•</span>
              <span>{t('areaProfile.taluka', 'Taluka')}: {language === 'gu' ? area.talukaGu : area.taluka}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {language === 'gu' ? area.gujaratiName : area.name}
            </h3>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <span className="px-3 py-1 rounded-full bg-white/15 text-emerald-100 text-xs font-semibold backdrop-blur-xs border border-white/20">
              {language === 'gu' ? area.talukaGu : area.taluka}
            </span>
          </div>
        </div>

        <p className="mt-3 text-xs sm:text-sm text-emerald-50 leading-relaxed max-w-3xl">
          {language === 'gu' ? area.soilDescriptionGu : area.soilDescription}
        </p>
      </div>

      {/* Grid of Key Agronomic Attributes */}
      <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-stone-50/60 border-b border-stone-200">
        {/* Soil Profile */}
        <div className="p-3.5 bg-white rounded-xl border border-stone-200">
          <div className="flex items-center space-x-2 text-stone-500 text-xs font-bold uppercase tracking-wider mb-1.5">
            <Layers className="w-4 h-4 text-emerald-700" />
            <span>{t('areaProfile.soil', 'Soil Type')}</span>
          </div>
          <div className="font-bold text-stone-900 text-sm">
            {language === 'gu' ? (area.soilTypesGu?.join(', ') || '') : (area.soilTypes?.join(', ') || '')}
          </div>
          <p className="text-[11px] text-stone-500 mt-1">
            {language === 'gu' ? area.drainageTypeGu : area.drainageType}
          </p>
        </div>

        {/* Water Source & Status */}
        <div className="p-3.5 bg-white rounded-xl border border-stone-200">
          <div className="flex items-center space-x-2 text-stone-500 text-xs font-bold uppercase tracking-wider mb-1.5">
            <Droplets className="w-4 h-4 text-teal-600" />
            <span>{t('areaProfile.water', 'Water Profile')}</span>
          </div>
          <div className="font-bold text-stone-900 text-sm">
            {language === 'gu' ? area.waterAvailabilityGu : `${area.waterAvailability} Availability`}
          </div>
          <p className="text-[11px] text-stone-500 mt-1">
            {language === 'gu' ? area.waterDetailsGu : area.waterDetails}
          </p>
        </div>

        {/* Climate & Sunlight */}
        <div className="p-3.5 bg-white rounded-xl border border-stone-200">
          <div className="flex items-center space-x-2 text-stone-500 text-xs font-bold uppercase tracking-wider mb-1.5">
            <Sun className="w-4 h-4 text-amber-600" />
            <span>{t('areaProfile.climate', 'Climate')}</span>
          </div>
          <div className="font-bold text-stone-900 text-sm">
            {language === 'gu' ? (area.seasonsGu?.join(', ') || '') : (area.seasons?.join(', ') || '')}
          </div>
          <p className="text-[11px] text-stone-500 mt-1">
            {language === 'gu' ? area.climateGu : area.climate}
          </p>
        </div>

        {/* Nearest APMC Mandi */}
        <div className="p-3.5 bg-emerald-50/70 rounded-xl border border-emerald-200/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1.5">
              <Store className="w-4 h-4 text-emerald-700" />
              <span>{t('areaProfile.nearestMandi', 'Nearest APMC')}</span>
            </div>
            <div className="font-bold text-emerald-950 text-sm">
              {language === 'gu' ? nearestMandi.gujaratiName : nearestMandi.name}
            </div>
            <p className="text-[11px] text-emerald-800/80 mt-1">
              {language === 'gu'
                ? `અંદાજે ${nearestMandi.distanceFromVadodaraCityKm} કિમી અંતર`
                : `Approx ${nearestMandi.distanceFromVadodaraCityKm} km distance`}
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigateToMandiForCommodity('cotton', nearestMandi.id)}
            className="mt-2 text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center space-x-1 cursor-pointer"
          >
            <span>{language === 'gu' ? 'મંડી ભાવ જુઓ' : 'View Mandi Rates'}</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Practical Growing Tips for this Area */}
      <div className="p-5 sm:p-6 bg-white">
        <div className="flex items-center space-x-2 text-xs font-bold text-stone-800 uppercase tracking-wider mb-3">
          <Lightbulb className="w-4 h-4 text-amber-600" />
          <span>{t('areaProfile.growingTips', 'Practical Area Growing Tips')}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {(language === 'gu' ? (area.recommendationsGu || []) : (area.recommendations || [])).map((tip, idx) => (
            <div
              key={idx}
              className="flex items-start space-x-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200/70 text-xs text-stone-700"
            >
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-[10px] mt-0.5">
                {idx + 1}
              </span>
              <span className="leading-relaxed">{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
