import {
  ArrowRight,
  Check,
  Columns,
  Compass,
  Droplet,
  Layers,
  MapPin,
  RefreshCw,
  Sparkles,
  Sprout,
  Store,
  Sun
} from 'lucide-react';
import React from 'react';
import { useAgritech } from '../context/AgritechContext';
import { useLanguage } from '../context/LanguageContext';
import areasData from '../data/areas.json';
import vegetablesData from '../data/vegetables.json';
import { getNearestMarketForArea } from '../lib/areaHelpers';
import { Area } from '../types/agriculture';

export const AreaComparisonView: React.FC = () => {
  const { comparisonAreaIds, setComparisonAreaIds, setSelectedAreaId, setActiveTab } = useAgritech();
  const { language, t } = useLanguage();

  const allAreas = areasData as Area[];

  // Retrieve areas from comparison list
  const area1 = allAreas.find(a => a.id === comparisonAreaIds[0]) || allAreas[0];
  const area2 = allAreas.find(a => a.id === comparisonAreaIds[1]) || allAreas[1];
  const area3 = comparisonAreaIds[2] ? allAreas.find(a => a.id === comparisonAreaIds[2]) : undefined;

  const comparedAreas = [area1, area2, ...(area3 ? [area3] : [])];

  const handleAreaChange = (index: 0 | 1 | 2, areaId: string) => {
    const updated = [...comparisonAreaIds] as [string, string, string?];
    if (areaId === 'none') {
      if (index === 2) {
        setComparisonAreaIds([updated[0], updated[1]]);
      }
    } else {
      updated[index] = areaId;
      setComparisonAreaIds(updated);
    }
  };

  const getVegNames = (vegIds: string[]) => {
    return vegIds.map(id => {
      const v = vegetablesData.find(item => item.id === id);
      if (!v) return id;
      return language === 'gu' ? `${v.emoji} ${v.gujaratiName}` : `${v.emoji} ${v.name}`;
    });
  };

  return (
    <div id="area-comparison-view" className="py-8 sm:py-12 bg-stone-50/70 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold mb-2">
            <Columns className="w-3.5 h-3.5 text-teal-700" />
            <span>{t('comparison.title', 'Compare Vadodara Agricultural Areas')}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            {language === 'gu'
              ? 'વડોદરા વિસ્તારવાર જમીન, પાણી અને પાક સરખામણી'
              : 'Vadodara Soil, Water & Crop Comparison Engine'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1.5 leading-relaxed max-w-3xl">
            {t(
              'comparison.subtitle',
              'Select and evaluate two or more localities to understand soil, water, and crop differences'
            )}
          </p>

          {/* Area Selectors Row */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-100">
            {/* Area 1 */}
            <div>
              <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">
                {t('comparison.selectArea1', 'Select First Area')}
              </label>
              <select
                id="select-compare-area-1"
                value={area1.id}
                onChange={e => handleAreaChange(0, e.target.value)}
                className="w-full text-xs font-semibold bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-stone-800 focus:ring-2 focus:ring-emerald-600"
              >
                {allAreas.map(a => (
                  <option key={`a1-${a.id}`} value={a.id}>
                    {language === 'gu' ? a.gujaratiName : a.name} ({a.taluka})
                  </option>
                ))}
              </select>
            </div>

            {/* Area 2 */}
            <div>
              <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">
                {t('comparison.selectArea2', 'Select Second Area')}
              </label>
              <select
                id="select-compare-area-2"
                value={area2.id}
                onChange={e => handleAreaChange(1, e.target.value)}
                className="w-full text-xs font-semibold bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-stone-800 focus:ring-2 focus:ring-emerald-600"
              >
                {allAreas.map(a => (
                  <option key={`a2-${a.id}`} value={a.id}>
                    {language === 'gu' ? a.gujaratiName : a.name} ({a.taluka})
                  </option>
                ))}
              </select>
            </div>

            {/* Area 3 (Optional) */}
            <div>
              <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">
                {t('comparison.selectArea3', 'Add Third Area (Optional)')}
              </label>
              <select
                id="select-compare-area-3"
                value={area3?.id || 'none'}
                onChange={e => handleAreaChange(2, e.target.value)}
                className="w-full text-xs font-semibold bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-stone-800 focus:ring-2 focus:ring-emerald-600"
              >
                <option value="none">{language === 'gu' ? '-- કોઈ નહિ (બે વિસ્તારો) --' : '-- None (Compare 2) --'}</option>
                {allAreas.map(a => (
                  <option key={`a3-${a.id}`} value={a.id}>
                    {language === 'gu' ? a.gujaratiName : a.name} ({a.taluka})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Side-by-Side Comparison Cards Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-${comparedAreas.length} gap-6`}>
          {comparedAreas.map((area) => {
            const nearestMandi = getNearestMarketForArea(area);
            return (
              <div
                key={area.id}
                className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Header */}
                  <div className="p-6 bg-gradient-to-br from-stone-50 to-emerald-50/50 border-b border-stone-200">
                    <div className="flex items-center justify-between text-xs text-emerald-800 font-bold uppercase mb-1">
                      <span>{language === 'gu' ? area.talukaGu : area.taluka}</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 text-[10px]">
                        {language === 'gu' ? area.zoneGu : area.zone}
                      </span>
                    </div>
                    <h3 className="text-2xl font-black text-stone-900">
                      {language === 'gu' ? area.gujaratiName : area.name}
                    </h3>
                    <p className="text-xs text-stone-500 mt-1">
                      {area.taluka} ({language === 'gu' ? area.talukaGu : ''})
                    </p>
                  </div>

                  {/* Attributes Comparison */}
                  <div className="p-6 space-y-5 text-xs text-stone-700 divide-y divide-stone-100">
                    {/* Soil */}
                    <div>
                      <span className="flex items-center space-x-1.5 text-stone-500 font-bold uppercase text-[10px] mb-1">
                        <Layers className="w-3.5 h-3.5 text-emerald-700" />
                        <span>{t('areaProfile.soil', 'Soil Characteristics')}</span>
                      </span>
                      <p className="font-bold text-stone-900 text-sm">
                        {language === 'gu' ? (area.soilTypesGu?.join(', ') || '') : (area.soilTypes?.join(', ') || '')}
                      </p>
                      <p className="text-stone-500 text-[11px] mt-0.5 leading-relaxed">
                        {language === 'gu' ? area.drainageTypeGu : area.drainageType}
                      </p>
                    </div>

                    {/* Water */}
                    <div className="pt-4">
                      <span className="flex items-center space-x-1.5 text-stone-500 font-bold uppercase text-[10px] mb-1">
                        <Droplet className="w-3.5 h-3.5 text-teal-600" />
                        <span>{t('areaProfile.water', 'Water Profile')}</span>
                      </span>
                      <p className="font-bold text-stone-900 text-sm">
                        {language === 'gu' ? area.waterAvailabilityGu : `${area.waterAvailability} Availability`}
                      </p>
                      <p className="text-stone-500 text-[11px] mt-0.5">
                        {language === 'gu' ? area.waterDetailsGu : area.waterDetails}
                      </p>
                    </div>

                    {/* Climate */}
                    <div className="pt-4">
                      <span className="flex items-center space-x-1.5 text-stone-500 font-bold uppercase text-[10px] mb-1">
                        <Sun className="w-3.5 h-3.5 text-amber-600" />
                        <span>{t('areaProfile.climate', 'Climate & Seasons')}</span>
                      </span>
                      <p className="font-bold text-stone-900 text-sm">
                        {language === 'gu' ? area.climateGu : area.climate}
                      </p>
                      <p className="text-stone-500 text-[11px] mt-0.5">
                        {language === 'gu' ? (area.seasonsGu?.join(', ') || '') : (area.seasons?.join(', ') || '')}
                      </p>
                    </div>

                    {/* Top Suitable Crops */}
                    <div className="pt-4">
                      <span className="flex items-center space-x-1.5 text-stone-500 font-bold uppercase text-[10px] mb-2">
                        <Sprout className="w-3.5 h-3.5 text-emerald-700" />
                        <span>{language === 'gu' ? 'અગ્રણી અનુકૂળ શાકભાજી' : 'Top Suitable Vegetables'}</span>
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {getVegNames(area.suitableVegetables).slice(0, 6).map((name, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-medium"
                          >
                            {name}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Nearest Mandi */}
                    <div className="pt-4">
                      <span className="flex items-center space-x-1.5 text-stone-500 font-bold uppercase text-[10px] mb-1">
                        <Store className="w-3.5 h-3.5 text-amber-600" />
                        <span>{t('areaProfile.nearestMandi', 'Nearest APMC Mandi')}</span>
                      </span>
                      <p className="font-bold text-stone-900">
                        {language === 'gu' ? nearestMandi.gujaratiName : nearestMandi.name}
                      </p>
                      <p className="text-stone-500 text-[11px]">
                        ~{nearestMandi.distanceFromVadodaraCityKm} km {language === 'gu' ? 'શહેરથી' : 'from city center'}
                      </p>
                    </div>
                  </div>
                </div>

              {/* Action */}
              <div className="p-6 pt-3 border-t border-stone-100 bg-stone-50/50">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedAreaId(area.id);
                    setActiveTab('vegetableGuide');
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>{language === 'gu' ? 'આ વિસ્તારની શાકભાજી જુઓ' : 'Explore Vegetables for this Area'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
};
