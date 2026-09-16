import { ArrowDownRight, ArrowUpRight, TrendingUp } from 'lucide-react';
import React from 'react';
import { useAgritech } from '../context/AgritechContext';
import { useLanguage } from '../context/LanguageContext';
import marketData from '../data/marketPrices.json';

export const MarketTicker: React.FC = () => {
  const { language, t } = useLanguage();
  const { navigateToMandiForCommodity } = useAgritech();
  const tickerItems = marketData.prices.slice(0, 10);

  return (
    <div
      id="apmc-mandi-ticker"
      className="bg-emerald-950 text-emerald-100 border-b border-emerald-900/60 text-xs py-1.5 px-4 overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto flex items-center">
        {/* Ticker badge */}
        <div className="flex items-center space-x-1.5 shrink-0 pr-3 border-r border-emerald-800/80 mr-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-emerald-300 tracking-wide uppercase text-[11px]">
            {t('mandi.tickerLabel', 'APMC Mandi Ticker')}
          </span>
        </div>

        {/* Scrolling or Flex ticker track */}
        <div className="flex items-center space-x-6 overflow-x-auto no-scrollbar whitespace-nowrap py-0.5">
          {tickerItems.map((item) => {
            const isUp = item.trend === 'up';
            const isDown = item.trend === 'down';
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => navigateToMandiForCommodity(item.commodityId, item.marketId)}
                className="inline-flex items-center space-x-1.5 hover:text-white transition-colors cursor-pointer group"
                title="Click to view detailed mandi rates"
              >
                <span className="text-emerald-200 group-hover:text-white font-medium">
                  {language === 'gu' ? item.commodityNameGu : item.commodityName}
                </span>
                <span className="text-stone-400 text-[10px]">
                  ({language === 'gu' ? item.marketNameGu.split(' ')[0] : item.marketName.split(' ')[0]})
                </span>
                <span className="font-bold text-emerald-100">
                  ₹{item.modalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-emerald-300/80">
                  /{language === 'gu' ? item.unitGu : item.unit}
                </span>
                {isUp && <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />}
                {isDown && <ArrowDownRight className="w-3.5 h-3.5 text-rose-400" />}
                {!isUp && !isDown && <TrendingUp className="w-3.5 h-3.5 text-amber-400" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
