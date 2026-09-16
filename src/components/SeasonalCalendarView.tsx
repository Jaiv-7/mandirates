import { Calendar, CheckCircle2, Clock, Droplets, Info, Sparkles, Sprout, Sun } from 'lucide-react';
import React, { useState } from 'react';
import { useAgritech } from '../context/AgritechContext';
import { useLanguage } from '../context/LanguageContext';
import vegetablesData from '../data/vegetables.json';
import { Vegetable } from '../types/agriculture';

export const SeasonalCalendarView: React.FC = () => {
  const { language, t } = useLanguage();
  const { setActiveVegetableModal } = useAgritech();
  const [activeSeason, setActiveSeason] = useState<'all' | 'Summer' | 'Monsoon' | 'Winter'>('all');

  const seasonsList = [
    {
      id: 'all',
      name: 'All Seasons',
      nameGu: 'તમામ ઋતુઓ',
      months: 'Year-round Central Gujarat cycle',
      monthsGu: 'સમગ્ર વર્ષ દરમિયાન'
    },
    {
      id: 'Summer',
      name: 'Summer (ઉનાળો)',
      nameGu: 'ઉનાળો (માર્ચ - જૂન)',
      months: 'March to June (32°C - 42°C)',
      monthsGu: 'માર્ચ થી જૂન (ફાગણ - જેઠ)'
    },
    {
      id: 'Monsoon',
      name: 'Monsoon (ચોમાસું)',
      nameGu: 'ચોમાસું (જુલાઈ - ઓક્ટોબર)',
      months: 'July to October (26°C - 34°C)',
      monthsGu: 'જુલાઈ થી ઓક્ટોબર (અષાઢ - આસો)'
    },
    {
      id: 'Winter',
      name: 'Winter (શિયાળો)',
      nameGu: 'શિયાળો (નવેમ્બર - ફેબ્રુઆરી)',
      months: 'November to February (14°C - 28°C)',
      monthsGu: 'નવેમ્બર થી ફેબ્રુઆરી (કાર્તક - મહા)'
    }
  ];

  const filteredVeggies = (vegetablesData as Vegetable[]).filter(v => {
    if (activeSeason === 'all') return true;
    return v.seasons.includes(activeSeason);
  });

  return (
    <div id="seasonal-calendar-view" className="py-8 sm:py-12 bg-stone-50/70 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Title Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-800 text-xs font-semibold mb-2">
            <Calendar className="w-3.5 h-3.5 text-indigo-700" />
            <span>{t('calendar.title', 'Vadodara Seasonal Vegetable Calendar')}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            {language === 'gu'
              ? 'વડોદરા જિલ્લા મોસમી વાવેતર અને કાપણી કેલેન્ડર'
              : 'Vadodara District Seasonal Vegetable & Harvest Calendar'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1.5 leading-relaxed max-w-3xl">
            {t(
              'calendar.subtitle',
              'Month-by-month planting, vegetative growth, and harvest timelines in Central Gujarat'
            )}
          </p>

          {/* Season filter selector */}
          <div className="mt-6 flex flex-wrap gap-2">
            {seasonsList.map(s => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveSeason(s.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeSeason === s.id
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80 border border-stone-200'
                }`}
              >
                {language === 'gu' ? s.nameGu : s.name}
              </button>
            ))}
          </div>
        </div>

        {/* Season Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2">
            <div className="flex items-center space-x-2 text-amber-900 font-bold text-sm">
              <Sun className="w-4 h-4 text-amber-600" />
              <span>{language === 'gu' ? 'ઉનાળુ પાક આયોજન' : 'Summer Farming Strategy'}</span>
            </div>
            <p className="text-xs text-amber-950/80 leading-relaxed">
              {language === 'gu'
                ? 'મે મહિનામાં તીવ્ર ગરમી પડે છે. ટપક પદ્ધતિ અને શેડનેટનો ઉપયોગ કરવો. ભીંડા, ગુવાર, કાકડી, દૂધી અને ટીંડોરા શ્રેષ્ઠ પરિણામ આપે છે.'
                : 'High evaporation rates require micro-irrigation and organic mulching. Okra, cluster beans, and cucurbits thrive under proper moisture.'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-teal-50/60 border border-teal-200/80 space-y-2">
            <div className="flex items-center space-x-2 text-teal-900 font-bold text-sm">
              <Droplets className="w-4 h-4 text-teal-600" />
              <span>{language === 'gu' ? 'ચોમાસુ વાવેતર વ્યવસ્થા' : 'Monsoon Crop Management'}</span>
            </div>
            <p className="text-xs text-teal-950/80 leading-relaxed">
              {language === 'gu'
                ? 'જમીનમાં પાણી ભરાઈ ન રહે તે માટે ગાદી ક્યારા (Raised beds) બનાવવા. મરચી, રીંગણ અને ટામેટામાં ફૂગનાશક નિયંત્રણ જરૂરી છે.'
                : 'Raised bed planting prevents root rot in black cotton soils. Trellising cucurbits prevents fruit contact with wet ground.'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-200/80 space-y-2">
            <div className="flex items-center space-x-2 text-indigo-900 font-bold text-sm">
              <Sprout className="w-4 h-4 text-indigo-600" />
              <span>{language === 'gu' ? 'શિયાળુ શાકભાજીની સુવર્ણ તક' : 'Winter Peak Abundance'}</span>
            </div>
            <p className="text-xs text-indigo-950/80 leading-relaxed">
              {language === 'gu'
                ? 'અનુકૂળ તાપમાનને કારણે તમામ ભાજી (પાલક, મેથી, ધાણા) અને કોબીજ-ફૂલેવર ખૂબ સારા થાય છે. તબક્કાવાર વાવેતરથી ભાવ પછડાટથી બચી શકાય છે.'
                : 'Optimal moderate temperatures allow fast leafy greens, brassicas, peas, and root crops. Stagger planting by 3 weeks.'}
            </p>
          </div>
        </div>

        {/* Vegetables Timeline Schedule */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-stone-100">
            <h2 className="text-lg sm:text-xl font-bold text-stone-900">
              {language === 'gu' ? 'શાકભાજી વાવેતર અને ઉતારા સમયપત્રક' : 'Vegetable Planting & Harvest Timelines'}
            </h2>
            <span className="text-xs text-stone-500 font-medium">
              {filteredVeggies.length} {language === 'gu' ? 'શાકભાજી' : 'crops listed'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredVeggies.map(veg => (
              <div
                key={veg.id}
                onClick={() => setActiveVegetableModal(veg)}
                className="p-4 rounded-2xl bg-stone-50 hover:bg-emerald-50/50 border border-stone-200 hover:border-emerald-300 transition-all cursor-pointer flex items-start justify-between group"
              >
                <div className="flex items-start space-x-3.5">
                  <span className="text-3xl p-2 rounded-xl bg-white border border-stone-200 group-hover:scale-105 transition-transform select-none">
                    {veg.emoji}
                  </span>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-bold text-stone-900 text-sm sm:text-base group-hover:text-emerald-800">
                        {language === 'gu' ? veg.gujaratiName : veg.name}
                      </h3>
                      <span className="text-xs text-stone-400">
                        ({language === 'gu' ? veg.name : veg.gujaratiName})
                      </span>
                    </div>

                    <p className="text-xs text-stone-500 mt-0.5">
                      {language === 'gu' ? veg.categoryGu : veg.category} • {veg.temperature}
                    </p>

                    <div className="mt-2.5 flex flex-wrap items-center gap-2 text-[11px]">
                      <span className="px-2 py-0.5 rounded-md bg-white border border-stone-200 text-stone-700 font-medium">
                        🌱 {language === 'gu' ? 'શ્રેષ્ઠ મોસમ' : 'Best'}: {language === 'gu' ? veg.bestSeasonGu : veg.bestSeason}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-white border border-stone-200 text-stone-700 font-medium">
                        ⏱️ {veg.harvestDays} {language === 'gu' ? 'દિવસ' : 'days'}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-white border border-stone-200 text-stone-700 font-medium">
                        💧 {language === 'gu' ? veg.waterCategoryGu : veg.waterCategory}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0 pt-1">
                  <span className="text-xs font-bold text-emerald-700 group-hover:underline">
                    {language === 'gu' ? 'વિગતો →' : 'Details →'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
