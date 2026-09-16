import {
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Layers,
  MapPin,
  Phone,
  ShieldCheck,
  Store
} from 'lucide-react';
import React from 'react';
import { useAgritech } from '../context/AgritechContext';
import { useLanguage } from '../context/LanguageContext';
import { Market } from '../types/mandi';

export const APMCMarketCard: React.FC<{ market: Market }> = ({ market }) => {
  const { language, t } = useLanguage();
  const { setSelectedMandiMarketId, setActiveTab } = useAgritech();

  const handleViewRates = () => {
    setSelectedMandiMarketId(market.id);
    setActiveTab('mandiRates');
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  return (
    <div
      id={`apmc-card-${market.id}`}
      className="bg-white rounded-3xl border border-stone-200 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all p-6 sm:p-7 flex flex-col justify-between"
    >
      <div>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-2xl bg-amber-50 text-amber-800 border border-amber-200/80">
              <Store className="w-6 h-6 text-amber-700" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  {language === 'gu' ? market.typeGu : market.type}
                </span>
                <span className="text-xs text-stone-400 font-medium">
                  {market.distanceFromVadodaraCityKm} km {language === 'gu' ? 'શહેરથી' : 'from city center'}
                </span>
              </div>
              <h3 className="text-xl font-bold text-stone-900 mt-1">
                {language === 'gu' ? market.gujaratiName : market.name}
              </h3>
            </div>
          </div>
        </div>

        {/* Location & Address */}
        <div className="space-y-2.5 text-xs text-stone-600 mb-5">
          <div className="flex items-start space-x-2">
            <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <span className="leading-relaxed">
              {language === 'gu' ? market.locationGu : market.location}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong className="text-stone-800">{language === 'gu' ? 'હરાજી સમય:' : 'Auction Timings:'}</strong>{' '}
              {language === 'gu' ? market.tradingDaysGu : market.tradingDays}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4 text-teal-600 shrink-0" />
            <span>
              <strong className="text-stone-800">{language === 'gu' ? 'સંપર્ક:' : 'Helpline:'}</strong>{' '}
              {market.contactNumber}
            </span>
          </div>
        </div>

        {/* Key Commodities Handled */}
        <div className="pt-4 border-t border-stone-100 mb-5">
          <span className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-2">
            {language === 'gu' ? 'મુખ્ય આવક થતી ઉપજો:' : 'Key Traded Commodities:'}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {(market.keyCommodities || []).map((item, idx) => (
              <span
                key={idx}
                className="text-xs px-2.5 py-1 rounded-lg bg-stone-100 text-stone-800 font-medium border border-stone-200 capitalize"
              >
                {item.replace('-', ' ')}
              </span>
            ))}
          </div>
        </div>

        {/* Market Description */}
        <div className="pt-3 border-t border-stone-100 text-xs text-stone-500 space-y-1">
          <p className="text-[11px] leading-relaxed">
            {language === 'gu' ? market.descriptionGu : market.description}
          </p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-stone-100">
        <button
          type="button"
          onClick={handleViewRates}
          className="w-full py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-emerald-800 text-white font-semibold text-xs transition-colors flex items-center justify-center space-x-2 cursor-pointer"
        >
          <span>{language === 'gu' ? 'આ મંડીના ભાવ જુઓ' : 'Filter Mandi Rates'}</span>
        </button>
      </div>
    </div>
  );
};
