import {
  Bug,
  Calendar,
  CheckCircle2,
  Droplets,
  Filter,
  Leaf,
  Lightbulb,
  MapPin,
  Scissors,
  Search,
  Shovel,
  Sparkles,
  Sprout,
  Store,
  TrendingUp,
  Warehouse
} from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import tipsData from '../data/tips.json';
import { AgricultureTip } from '../types/agriculture';

export const AgricultureTipsView: React.FC = () => {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', name: 'All Categories', nameGu: 'તમામ શ્રેણીઓ' },
    { id: 'Soil Preparation', name: 'Soil Preparation', nameGu: 'જમીન તૈયાર કરવી' },
    { id: 'Water Management', name: 'Water Management', nameGu: 'જળ વ્યવસ્થાપન' },
    { id: 'Organic Practices', name: 'Organic Practices', nameGu: 'સેન્દ્રીય / પ્રાકૃતિક ખેતી' },
    { id: 'Pest Management', name: 'Pest Management', nameGu: 'જીવાત નિયંત્રણ' },
    { id: 'Seasonal Farming', name: 'Seasonal Farming', nameGu: 'મોસમી આયોજન' },
    { id: 'Vegetable Growing', name: 'Vegetable Growing', nameGu: 'શાકભાજી સંવર્ધન' },
    { id: 'Harvesting', name: 'Harvesting', nameGu: 'કાપણી / ઉતારો' },
    { id: 'Storage', name: 'Storage', nameGu: 'સંગ્રહ વ્યવસ્થા' },
    { id: 'Market Selling', name: 'Market Selling', nameGu: 'બજાર વેચાણ કૌશલ્ય' }
  ];

  const filteredTips = useMemo(() => {
    return (tipsData as AgricultureTip[]).filter(tip => {
      const matchCat = selectedCategory === 'all' || tip.category === selectedCategory;
      if (!matchCat) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.trim().toLowerCase();
      return (
        tip.title.toLowerCase().includes(q) ||
        tip.titleGu.toLowerCase().includes(q) ||
        tip.summary.toLowerCase().includes(q) ||
        tip.summaryGu.toLowerCase().includes(q) ||
        tip.content.toLowerCase().includes(q)
      );
    });
  }, [selectedCategory, searchQuery]);

  const getTipIcon = (category: string) => {
    switch (category) {
      case 'Soil Preparation':
        return <Shovel className="w-5 h-5 text-amber-700" />;
      case 'Water Management':
        return <Droplets className="w-5 h-5 text-teal-700" />;
      case 'Organic Practices':
        return <Leaf className="w-5 h-5 text-emerald-700" />;
      case 'Pest Management':
        return <Bug className="w-5 h-5 text-rose-700" />;
      case 'Seasonal Farming':
        return <Calendar className="w-5 h-5 text-indigo-700" />;
      case 'Vegetable Growing':
        return <Sprout className="w-5 h-5 text-lime-700" />;
      case 'Harvesting':
        return <Scissors className="w-5 h-5 text-teal-700" />;
      case 'Storage':
        return <Warehouse className="w-5 h-5 text-stone-700" />;
      case 'Market Selling':
        return <TrendingUp className="w-5 h-5 text-emerald-700" />;
      default:
        return <Lightbulb className="w-5 h-5 text-amber-600" />;
    }
  };

  return (
    <div id="agri-tips-view" className="py-8 sm:py-12 bg-stone-50/70 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold mb-2">
            <Lightbulb className="w-3.5 h-3.5 text-amber-700" />
            <span>{t('tips.title', 'Vadodara Agricultural Knowledge Base')}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            {language === 'gu'
              ? 'વડોદરા ખેડૂત અને બાગાયત જ્ઞાન કેન્દ્ર'
              : 'Vadodara Practical Agronomy & Cultivation Knowledge'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1.5 leading-relaxed max-w-3xl">
            {t(
              'tips.subtitle',
              'Expert agronomic recommendations, organic methods, and market strategies for Vadodara growers'
            )}
          </p>

          {/* Search Bar */}
          <div className="mt-6 max-w-xl relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={language === 'gu' ? 'કૃષિ સલાહ શોધો (દા.ત. લીંબોળી તેલ, મલ્ચિંગ, જીવામૃત)...' : 'Search tips (e.g. Jeevamrut, Neem oil, Mulching)...'}
              className="w-full text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-xl pl-10 pr-4 py-3 text-stone-800 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {language === 'gu' ? cat.nameGu : cat.name}
            </button>
          ))}
        </div>

        {/* Tips Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTips.length === 0 ? (
            <div className="col-span-full py-12 text-center bg-white rounded-3xl border border-stone-200 text-stone-400">
              <Lightbulb className="w-10 h-10 text-stone-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-stone-700">
                {language === 'gu' ? 'કોઈ કૃષિ સલાહ મળી નથી' : 'No agriculture tips found matching your query'}
              </p>
            </div>
          ) : (
            filteredTips.map(tip => (
              <div
                key={tip.id}
                className="bg-white rounded-3xl border border-stone-200 shadow-xs hover:shadow-md transition-all p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="p-2.5 rounded-xl bg-stone-100 border border-stone-200">
                      {getTipIcon(tip.category)}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-stone-100 text-stone-600">
                      {language === 'gu' ? tip.categoryGu : tip.category}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-snug mb-2">
                    {language === 'gu' ? tip.titleGu : tip.title}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    {language === 'gu' ? tip.summaryGu : tip.summary}
                  </p>

                  <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 text-xs text-stone-700 leading-relaxed">
                    {language === 'gu' ? tip.contentGu : tip.content}
                  </div>
                </div>

                {tip.vadodaraContext && (
                  <div className="mt-5 pt-3 border-t border-stone-100 flex items-start space-x-2 text-[11px] text-emerald-800">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-tight">
                      <strong>{t('tips.localContext', 'Vadodara Context')}:</strong>{' '}
                      {language === 'gu' ? tip.vadodaraContextGu : tip.vadodaraContext}
                    </span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
