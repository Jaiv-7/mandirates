import {
  AlertTriangle,
  Calendar,
  Compass,
  Droplet,
  Filter,
  Layers,
  MapPin,
  RefreshCw,
  Search,
  ShieldAlert,
  Sparkles,
  Sprout,
  Users
} from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { useAgritech } from '../context/AgritechContext';
import { useLanguage } from '../context/LanguageContext';
import vegetablesData from '../data/vegetables.json';
import { rankVegetablesForArea } from '../lib/recommendation';
import { Vegetable } from '../types/agriculture';
import { AreaProfileCard } from './AreaProfileCard';
import { AreaSelector } from './AreaSelector';
import { VegetableCard } from './VegetableCard';

export const VegetableGuideView: React.FC = () => {
  const {
    currentArea,
    selectedSeason,
    setSelectedSeason,
    selectedPurpose,
    setSelectedPurpose,
    selectedWaterAvailability,
    setSelectedWaterAvailability,
    setActiveVegetableModal
  } = useAgritech();

  const { language, t } = useLanguage();
  const [searchVeg, setSearchVeg] = useState('');

  // Calculate suitability scores for all vegetables under active area & filters
  const scoredVegetables = useMemo(() => {
    let ranked = rankVegetablesForArea(
      vegetablesData as Vegetable[],
      currentArea,
      {
        season: selectedSeason,
        purpose: selectedPurpose,
        waterAvailability: selectedWaterAvailability
      }
    );

    if (searchVeg.trim()) {
      const q = searchVeg.trim().toLowerCase();
      ranked = ranked.filter(item =>
        item.vegetable.name.toLowerCase().includes(q) ||
        item.vegetable.gujaratiName.toLowerCase().includes(q) ||
        item.vegetable.category.toLowerCase().includes(q)
      );
    }

    return ranked;
  }, [currentArea, selectedSeason, selectedPurpose, selectedWaterAvailability, searchVeg]);

  const resetFilters = () => {
    setSelectedSeason('all');
    setSelectedPurpose('all');
    setSelectedWaterAvailability('all');
    setSearchVeg('');
  };

  return (
    <div id="vegetable-guide-view" className="py-8 sm:py-12 bg-stone-50/70 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Title & Area Selector Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-2">
                <Sprout className="w-3.5 h-3.5 text-emerald-700" />
                <span>{t('guide.title', 'Vadodara Vegetable Recommendation Engine')}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                {language === 'gu'
                  ? `${currentArea ? currentArea.gujaratiName : 'વડોદરા'} શાકભાજી વાવેતર માર્ગદર્શિકા`
                  : `Vegetable Guide for ${currentArea ? currentArea.name : 'Vadodara'}`}
              </h1>
              <p className="text-xs sm:text-sm text-stone-500 mt-1.5 leading-relaxed">
                {t(
                  'guide.subtitle',
                  'Which vegetables can I grow in my Vadodara area? Discover recommendations scored according to soil type, water status, and microclimate.'
                )}
              </p>
            </div>

            {/* Interactive Area Selector */}
            <div className="w-full lg:w-80 shrink-0">
              <AreaSelector />
            </div>
          </div>
        </div>

        {/* Selected Area Profile Card */}
        {currentArea && (
          <AreaProfileCard area={currentArea} />
        )}

        {/* Multi-Condition Filter Toolbar */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
            <div className="flex items-center space-x-2 text-xs font-bold text-stone-800 uppercase tracking-wider">
              <Filter className="w-4 h-4 text-emerald-700" />
              <span>{language === 'gu' ? 'વાવેતર પરિમાણો ફિલ્ટર કરો' : 'Filter Growing Conditions'}</span>
            </div>

            {(selectedSeason !== 'all' || selectedPurpose !== 'all' || selectedWaterAvailability !== 'all' || searchVeg) && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center space-x-1 cursor-pointer self-start sm:self-center"
              >
                <RefreshCw className="w-3 h-3" />
                <span>{t('common.reset', 'Reset Filters')}</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* 1. Growing Purpose */}
            <div>
              <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">
                {t('guide.purpose', 'Growing Purpose')}
              </label>
              <select
                id="filter-purpose-select"
                value={selectedPurpose}
                onChange={e => setSelectedPurpose(e.target.value as any)}
                className="w-full text-xs font-medium bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-stone-800 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
              >
                <option value="all">{t('guide.purposeAll', 'All Purposes')}</option>
                <option value="homeGarden">{t('guide.homeGarden', 'Home / Terrace Garden')}</option>
                <option value="smallFarm">{t('guide.smallFarm', 'Small / Peri-Urban Farm')}</option>
                <option value="commercial">{t('guide.commercial', 'Commercial Farming')}</option>
              </select>
            </div>

            {/* 2. Season */}
            <div>
              <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">
                {t('guide.season', 'Season')}
              </label>
              <select
                id="filter-season-select"
                value={selectedSeason}
                onChange={e => setSelectedSeason(e.target.value as any)}
                className="w-full text-xs font-medium bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-stone-800 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
              >
                <option value="all">{t('guide.allSeasons', 'All Seasons')}</option>
                <option value="Summer">{t('guide.summer', 'Summer (ઉનાળો)')}</option>
                <option value="Monsoon">{t('guide.monsoon', 'Monsoon (ચોમાસું)')}</option>
                <option value="Winter">{t('guide.winter', 'Winter (શિયાળો)')}</option>
              </select>
            </div>

            {/* 3. Water Availability */}
            <div>
              <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">
                {t('guide.waterFilter', 'Water Availability')}
              </label>
              <select
                id="filter-water-select"
                value={selectedWaterAvailability}
                onChange={e => setSelectedWaterAvailability(e.target.value as any)}
                className="w-full text-xs font-medium bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-stone-800 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
              >
                <option value="all">{t('guide.waterAll', 'All Water Levels')}</option>
                <option value="Low">{t('guide.waterLow', 'Low (Drought Hardy)')}</option>
                <option value="Moderate">{t('guide.waterModerate', 'Moderate')}</option>
                <option value="High">{t('guide.waterHigh', 'High Availability')}</option>
              </select>
            </div>

            {/* 4. Vegetable Name Search */}
            <div>
              <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">
                {language === 'gu' ? 'શાકભાજી નામ શોધો' : 'Search Vegetable'}
              </label>
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchVeg}
                  onChange={e => setSearchVeg(e.target.value)}
                  placeholder={language === 'gu' ? 'દા.ત. ટામેટા, Okra...' : 'e.g. Tomato, Okra...'}
                  className="w-full text-xs bg-stone-50 border border-stone-300 rounded-xl pl-8 p-2.5 text-stone-800 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Count & Suitability Key */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1 text-xs">
          <span className="font-semibold text-stone-700">
            {language === 'gu'
              ? `${scoredVegetables.length} શાકભાજી પાકો મળ્યા (${currentArea?.gujaratiName || ''})`
              : `Showing ${scoredVegetables.length} vegetables for ${currentArea?.name || 'Vadodara'}`}
          </span>

          <div className="flex flex-wrap items-center gap-2 text-[11px]">
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              <span>{t('guide.suitability.highlySuitable', 'Highly Suitable')}</span>
            </span>
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
              <span>{t('guide.suitability.suitable', 'Suitable')}</span>
            </span>
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
              <span>{t('guide.suitability.moderatelySuitable', 'Moderately Suitable')}</span>
            </span>
          </div>
        </div>

        {/* Vegetable Cards Grid */}
        {scoredVegetables.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-stone-200">
            <Sprout className="w-10 h-10 text-stone-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-stone-700">
              {t('guide.emptyVegetables', 'No matching vegetables found for the selected criteria.')}
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-3 px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 cursor-pointer"
            >
              {t('common.reset', 'Reset Filters')}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scoredVegetables.map((item) => (
              <VegetableCard
                key={item.vegetable.id}
                scoredItem={item}
                onOpenModal={() => setActiveVegetableModal(item.vegetable)}
              />
            ))}
          </div>
        )}

        {/* Mandatory Agronomic Disclaimer Notice */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-start space-x-3 text-xs text-amber-900">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold text-amber-950">
              {t('disclaimer.badge', 'Data Accuracy & Indicative Notice')}
            </p>
            <p className="leading-relaxed">
              {t(
                'disclaimer.text',
                'Recommendations are indicative and should be verified with local soil testing and agricultural experts before commercial cultivation.'
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
