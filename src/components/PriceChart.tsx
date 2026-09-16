import { Calendar, ChevronRight, Layers, LineChart as ChartIcon, Store, TrendingUp } from 'lucide-react';
import React, { useMemo } from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { useAgritech } from '../context/AgritechContext';
import { useLanguage } from '../context/LanguageContext';
import commoditiesData from '../data/commodities.json';
import marketsData from '../data/markets.json';
import { getHistoricalTrend } from '../lib/mandi';

export const PriceChart: React.FC = () => {
  const {
    selectedMandiCommodityId,
    setSelectedMandiCommodityId,
    selectedMandiMarketId,
    setSelectedMandiMarketId,
    chartTimeRange,
    setChartTimeRange
  } = useAgritech();

  const { language, t } = useLanguage();

  const currentCommodity = commoditiesData.find(c => c.id === selectedMandiCommodityId) || commoditiesData[0];
  const currentMarket = marketsData.find(m => m.id === selectedMandiMarketId);

  const rawTrendData = useMemo(() => {
    return getHistoricalTrend(selectedMandiCommodityId, selectedMandiMarketId);
  }, [selectedMandiCommodityId, selectedMandiMarketId]);

  // Slice data based on time range (7, 15, or 30 days)
  const chartData = useMemo(() => {
    const limit = chartTimeRange === '7' ? 5 : chartTimeRange === '15' ? 8 : 10;
    return rawTrendData.slice(-limit);
  }, [rawTrendData, chartTimeRange]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-stone-900 text-white p-3 rounded-xl shadow-xl border border-stone-700 text-xs space-y-1">
          <p className="font-bold text-stone-200 border-b border-stone-800 pb-1 mb-1.5">
            {label}
          </p>
          {payload.map((entry: any, index: number) => (
            <div key={`item-${index}`} className="flex items-center justify-between space-x-4">
              <span style={{ color: entry.color }} className="font-medium">
                {entry.name}:
              </span>
              <span className="font-mono font-bold">
                ₹{entry.value.toLocaleString('en-IN')}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div id="mandi-price-trend-chart-card" className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
      {/* Chart Header Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-stone-100">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-semibold mb-2">
            <ChartIcon className="w-3.5 h-3.5 text-amber-700" />
            <span>{t('mandi.chartTitle', 'APMC Price Trend History')}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight flex items-center space-x-2">
            <span>{currentCommodity.icon}</span>
            <span>
              {language === 'gu' ? currentCommodity.gujaratiName : currentCommodity.name}
            </span>
            <span className="text-stone-400 font-normal text-base">
              ({currentMarket ? (language === 'gu' ? currentMarket.gujaratiName : currentMarket.name) : (language === 'gu' ? 'તમામ વડોદરા મંડીઓ' : 'All Vadodara APMCs')})
            </span>
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            {t('mandi.chartSubtitle', 'Historical Min, Modal, and Max wholesale rates over recent trading days')} •{' '}
            {language === 'gu' ? `એકમ: ${currentCommodity.unitGu}` : `Unit: ${currentCommodity.unit}`}
          </p>
        </div>

        {/* Commodity & Range Selectors */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Commodity Dropdown */}
          <select
            id="chart-select-commodity"
            value={selectedMandiCommodityId}
            onChange={e => setSelectedMandiCommodityId(e.target.value)}
            className="text-xs font-semibold bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-stone-800 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
          >
            {commoditiesData.map(c => (
              <option key={c.id} value={c.id}>
                {c.icon} {language === 'gu' ? c.gujaratiName : c.name}
              </option>
            ))}
          </select>

          {/* Time range pills */}
          <div className="inline-flex items-center p-1 rounded-xl bg-stone-100 border border-stone-200">
            {(['7', '15', '30'] as const).map(range => (
              <button
                key={range}
                type="button"
                onClick={() => setChartTimeRange(range)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  chartTimeRange === range
                    ? 'bg-white text-stone-900 shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {range} {language === 'gu' ? 'દિવસ' : 'Days'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-72 sm:h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis
              dataKey={language === 'gu' ? 'dateLabelGu' : 'dateLabel'}
              stroke="#6B7280"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#E5E7EB' }}
            />
            <YAxis
              stroke="#6B7280"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={val => `₹${val}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{ paddingBottom: 12, fontSize: 12 }}
            />
            <Line
              type="monotone"
              dataKey="maxPrice"
              name={t('mandi.chartLegendMax', 'Max Price (₹)')}
              stroke="#10B981"
              strokeWidth={2}
              dot={{ r: 3, fill: '#10B981' }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="modalPrice"
              name={t('mandi.chartLegendModal', 'Modal Price (₹)')}
              stroke="#D97706"
              strokeWidth={3}
              dot={{ r: 4, fill: '#D97706' }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="minPrice"
              name={t('mandi.chartLegendMin', 'Min Price (₹)')}
              stroke="#6B7280"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={{ r: 3, fill: '#6B7280' }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Footer Summary note */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-3 border-t border-stone-100 text-xs text-stone-500 gap-2">
        <span className="flex items-center space-x-1.5">
          <TrendingUp className="w-4 h-4 text-emerald-600" />
          <span>
            {language === 'gu'
              ? 'મોડલ ભાવ એ જથ્થાબંધ હરાજીમાં સૌથી વધુ સોદા થયેલો વાસ્તવિક ભાવ છે.'
              : 'Modal price represents the weighted average auction rate for majority trades.'}
          </span>
        </span>
        <span className="text-[11px] font-mono text-stone-400">
          Source: Vadodara APMC Daily Agmarknet Bulletins
        </span>
      </div>
    </div>
  );
};
