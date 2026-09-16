import { Calendar, Layers, MapPin, Sprout, Store } from 'lucide-react';
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import areasData from '../data/areas.json';
import commoditiesData from '../data/commodities.json';
import marketsData from '../data/markets.json';
import vegetablesData from '../data/vegetables.json';

export const Stats: React.FC = () => {
  const { language, t } = useLanguage();

  const statsList = [
    {
      id: 'stat-areas',
      count: `${areasData.length}`,
      label: t('stats.areasCovered', 'Vadodara Areas Covered'),
      labelGu: 'આવરી લીધેલા વડોદરા વિસ્તારો',
      icon: <MapPin className="w-5 h-5 text-emerald-600" />,
      subtext: language === 'gu' ? 'શહેર અને ગ્રામ્ય તાલુકા' : 'Urban & Rural Talukas'
    },
    {
      id: 'stat-vegetables',
      count: `${vegetablesData.length}+`,
      label: t('stats.vegetablesCovered', 'Vegetables Covered'),
      labelGu: 'શાકભાજી પાકો',
      icon: <Sprout className="w-5 h-5 text-lime-600" />,
      subtext: language === 'gu' ? 'સંપૂર્ણ વાવેતર માર્ગદર્શન' : 'Full Cultivation Guides'
    },
    {
      id: 'stat-markets',
      count: `${marketsData.length}`,
      label: t('stats.apmcMarkets', 'APMC Markets'),
      labelGu: 'APMC મંડી બજારો',
      icon: <Store className="w-5 h-5 text-amber-600" />,
      subtext: language === 'gu' ? 'સયાજીપુરા, પાદરા, કરજણ, ડભોઇ' : 'Sayajipura, Padra, Karjan, Dabhoi'
    },
    {
      id: 'stat-commodities',
      count: `${commoditiesData.length}`,
      label: t('stats.commodities', 'Market Commodities'),
      labelGu: 'બજાર ચીજો',
      icon: <Layers className="w-5 h-5 text-teal-600" />,
      subtext: language === 'gu' ? 'રોજિંદા હરાજી દરો' : 'Daily Auction Rates'
    },
    {
      id: 'stat-seasons',
      count: '3',
      label: t('stats.seasons', 'Growing Seasons'),
      labelGu: 'વાવેતર ઋતુઓ',
      icon: <Calendar className="w-5 h-5 text-indigo-600" />,
      subtext: language === 'gu' ? 'ઉનાળો • ચોમાસું • શિયાળો' : 'Summer • Monsoon • Winter'
    }
  ];

  return (
    <section id="stats-section" className="bg-white py-8 sm:py-10 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {statsList.map((stat) => (
            <div
              key={stat.id}
              id={stat.id}
              className="p-4 sm:p-5 rounded-2xl bg-stone-50/80 border border-stone-200/80 flex flex-col justify-between hover:border-emerald-300 transition-colors group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="p-2 rounded-xl bg-white border border-stone-200 group-hover:scale-105 transition-transform shadow-2xs">
                  {stat.icon}
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                  {stat.count}
                </span>
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-stone-800">
                  {language === 'gu' ? stat.labelGu : stat.label}
                </h4>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  {stat.subtext}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
