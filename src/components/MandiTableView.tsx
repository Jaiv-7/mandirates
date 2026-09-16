import {
  AlertCircle,
  ArrowDownRight,
  ArrowUpRight,
  ChevronDown,
  Database,
  ExternalLink,
  Filter,
  Flame,
  Info,
  Layers,
  LineChart,
  MapPin,
  RefreshCw,
  Search,
  ShieldAlert,
  Sparkles,
  Store,
  TrendingDown,
  TrendingUp
} from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { useAgritech } from '../context/AgritechContext';
import { useLanguage } from '../context/LanguageContext';
import commoditiesData from '../data/commodities.json';
import marketRawData from '../data/marketPrices.json';
import marketsData from '../data/markets.json';
import { fetchMandiPrices, filterAndSortPrices } from '../lib/mandi';
import { MarketPrice } from '../types/mandi';
import { APMCMarketCard } from './APMCMarketCard';
import { PriceChart } from './PriceChart';

export const MandiTableView: React.FC = () => {
  const {
    selectedMandiCommodityId,
    setSelectedMandiCommodityId,
    selectedMandiMarketId,
    setSelectedMandiMarketId,
    setActiveTab
  } = useAgritech();

  const { language, t } = useLanguage();

  const [prices, setPrices] = useState<MarketPrice[]>(marketRawData.prices as MarketPrice[]);
  const [isDemoData, setIsDemoData] = useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = useState<string>(marketRawData.timestamp);
  const [dataSourceName, setDataSourceName] = useState<string>('Local Demo Dataset');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'modal' | 'lowest' | 'highest' | 'commodity' | 'latest'>('latest');
  const [activeSubTab, setActiveSubTab] = useState<'prices' | 'markets'>('prices');

  // Load prices from API or fallback
  const loadPrices = async () => {
    setIsLoading(true);
    const res = await fetchMandiPrices();
    setPrices(res.prices);
    setIsDemoData(res.isDemoData);
    setLastUpdated(res.timestamp);
    setDataSourceName(res.source);
    setIsLoading(false);
  };

  useEffect(() => {
    loadPrices();
  }, []);

  // Filtered & sorted prices
  const displayedPrices = useMemo(() => {
    return filterAndSortPrices(prices, {
      marketId: selectedMandiMarketId,
      commodityId: selectedMandiCommodityId === 'all' ? undefined : undefined, // Keep open for table filtering
      searchQuery,
      sortBy
    });
  }, [prices, selectedMandiMarketId, searchQuery, sortBy]);

  const handleRowClick = (item: MarketPrice) => {
    setSelectedMandiCommodityId(item.commodityId);
    setSelectedMandiMarketId(item.marketId);
  };

  return (
    <div id="mandi-table-view" className="py-8 sm:py-12 bg-stone-50/70 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-semibold">
                  <Store className="w-3.5 h-3.5 text-amber-700" />
                  <span>{t('mandi.title', 'Vadodara APMC Mandi Market Engine')}</span>
                </span>

                {/* Mandatory DEMO / MOCK DATA Badge */}
                {isDemoData && (
                  <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300 text-[11px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse"></span>
                    <span>{t('disclaimer.demoBadge', 'DEMO / MOCK DATA')}</span>
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                {language === 'gu'
                  ? 'વડોદરા જિલ્લા APMC બજાર હરાજી દરો'
                  : 'Vadodara APMC Wholesale Mandi Rates'}
              </h1>
              <p className="text-xs sm:text-sm text-stone-500 mt-1.5 leading-relaxed">
                {t(
                  'mandi.subtitle',
                  'Wholesale prices and arrival trends across Vadodara district agricultural markets'
                )}
              </p>
            </div>

            {/* Sub-tab Switcher: Rates vs APMC Markets */}
            <div className="flex items-center space-x-2 shrink-0">
              <div className="p-1 bg-stone-100 rounded-2xl border border-stone-200 inline-flex">
                <button
                  type="button"
                  onClick={() => setActiveSubTab('prices')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeSubTab === 'prices'
                      ? 'bg-white text-stone-900 shadow-2xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {language === 'gu' ? 'મંડી દરો અને ચાર્ટ' : 'Rates & Trends'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSubTab('markets')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeSubTab === 'markets'
                      ? 'bg-white text-stone-900 shadow-2xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {language === 'gu' ? '૪ વડોદરા મંડીઓ' : '4 Vadodara APMCs'}
                </button>
              </div>

              <button
                id="btn-refresh-mandi"
                type="button"
                onClick={loadPrices}
                disabled={isLoading}
                className="p-2.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 transition-colors cursor-pointer"
                title={t('mandi.refreshRates', 'Refresh Prices')}
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-emerald-700' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* View APMC Markets Detail Section if toggled */}
        {activeSubTab === 'markets' ? (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-stone-900">
                  {language === 'gu' ? 'વડોદરા જિલ્લાની ૪ અધિકૃત APMC મંડીઓ' : 'Vadodara District Authorized APMC Yards'}
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  {language === 'gu'
                    ? 'બજાર સરનામું, હરાજી સમય, અંતર અને મુખ્ય ખરીદ-વેચાણ ચીજો'
                    : 'Locations, auction timings, distance from city center, and key commodities'}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {marketsData.map(market => (
                <APMCMarketCard key={market.id} market={market} />
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Embedded Interactive Price Trend Chart */}
            <PriceChart />

            {/* Filter & Search Bar */}
            <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
                <div className="flex items-center space-x-2 text-xs font-bold text-stone-800 uppercase tracking-wider">
                  <Filter className="w-4 h-4 text-emerald-700" />
                  <span>{language === 'gu' ? 'મંડી ફિલ્ટર અને શોધ' : 'Filter Mandi Rates'}</span>
                </div>

                <div className="text-xs text-stone-500 font-medium">
                  {language === 'gu' ? 'કુલ પરિણામો:' : 'Showing:'} {displayedPrices.length}{' '}
                  {language === 'gu' ? 'હરાજી દરો' : 'records'}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* 1. Market Filter */}
                <div>
                  <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">
                    {t('mandi.filterMarket', 'Filter by APMC Market')}
                  </label>
                  <select
                    id="filter-mandi-market-select"
                    value={selectedMandiMarketId}
                    onChange={e => setSelectedMandiMarketId(e.target.value)}
                    className="w-full text-xs font-medium bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-stone-800 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  >
                    <option value="all">{t('mandi.allMarkets', 'All 4 Vadodara Markets')}</option>
                    {marketsData.map(m => (
                      <option key={m.id} value={m.id}>
                        {language === 'gu' ? m.gujaratiName : m.name} ({m.type})
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. Sort Options */}
                <div>
                  <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">
                    {t('mandi.sortBy', 'Sort By')}
                  </label>
                  <select
                    id="sort-mandi-select"
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value as any)}
                    className="w-full text-xs font-medium bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-stone-800 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  >
                    <option value="latest">{t('mandi.sortLatest', 'Latest Update')}</option>
                    <option value="modal">{t('mandi.sortModalPrice', 'Modal Price (High to Low)')}</option>
                    <option value="lowest">{t('mandi.sortLowestPrice', 'Lowest Price')}</option>
                    <option value="highest">{t('mandi.sortHighestPrice', 'Highest Price')}</option>
                    <option value="commodity">{t('mandi.sortCommodity', 'Commodity Name')}</option>
                  </select>
                </div>

                {/* 3. Search Commodity */}
                <div>
                  <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">
                    {language === 'gu' ? 'ચીજવસ્તુ શોધો' : 'Search Commodity'}
                  </label>
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder={language === 'gu' ? 'દા.ત. કપાસ, Cotton, Tomato...' : 'e.g. Cotton, Tomato, Paddy...'}
                      className="w-full text-xs bg-stone-50 border border-stone-300 rounded-xl pl-8 p-2.5 text-stone-800 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Mandi Rates Table */}
            <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-stone-50/80 border-b border-stone-200 text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                      <th className="py-3.5 px-4 sm:px-6">{t('mandi.table.commodity', 'Commodity')}</th>
                      <th className="py-3.5 px-4">{t('mandi.table.market', 'Market')}</th>
                      <th className="py-3.5 px-3 text-right">{t('mandi.table.minPrice', 'Min Price')}</th>
                      <th className="py-3.5 px-3 text-right">{t('mandi.table.maxPrice', 'Max Price')}</th>
                      <th className="py-3.5 px-4 text-right">{t('mandi.table.modalPrice', 'Modal Price')}</th>
                      <th className="py-3.5 px-3 text-center">{t('mandi.table.unit', 'Unit')}</th>
                      <th className="py-3.5 px-3">{t('mandi.table.arrivals', 'Arrivals')}</th>
                      <th className="py-3.5 px-3 text-center">{t('mandi.table.trend', 'Trend')}</th>
                      <th className="py-3.5 px-4 text-right">{t('mandi.table.action', 'Action')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-xs">
                    {displayedPrices.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="py-12 text-center text-stone-400">
                          {t('mandi.emptyRates', 'No market rates found for your filter criteria.')}
                        </td>
                      </tr>
                    ) : (
                      displayedPrices.map(item => {
                        const isSelectedInChart =
                          selectedMandiCommodityId === item.commodityId &&
                          (selectedMandiMarketId === 'all' || selectedMandiMarketId === item.marketId);

                        const isUp = item.trend === 'up';
                        const isDown = item.trend === 'down';

                        return (
                          <tr
                            key={item.id}
                            onClick={() => handleRowClick(item)}
                            className={`hover:bg-emerald-50/60 transition-colors cursor-pointer ${
                              isSelectedInChart ? 'bg-amber-50/50 font-medium' : ''
                            }`}
                          >
                            {/* Commodity Name & Variety */}
                            <td className="py-3.5 px-4 sm:px-6">
                              <div className="flex items-center space-x-2.5">
                                <span className="font-bold text-stone-900 text-sm">
                                  {language === 'gu' ? item.commodityNameGu : item.commodityName}
                                </span>
                                <span className="text-[10px] px-2 py-0.5 rounded bg-stone-100 text-stone-600 font-mono">
                                  {item.variety}
                                </span>
                              </div>
                            </td>

                            {/* Market */}
                            <td className="py-3.5 px-4 font-medium text-stone-700">
                              {language === 'gu' ? item.marketNameGu : item.marketName}
                            </td>

                            {/* Min Price */}
                            <td className="py-3.5 px-3 text-right font-mono text-stone-600">
                              ₹{item.minPrice.toLocaleString('en-IN')}
                            </td>

                            {/* Max Price */}
                            <td className="py-3.5 px-3 text-right font-mono text-stone-600">
                              ₹{item.maxPrice.toLocaleString('en-IN')}
                            </td>

                            {/* Modal Price */}
                            <td className="py-3.5 px-4 text-right">
                              <span className="font-mono font-extrabold text-sm text-emerald-900 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
                                ₹{item.modalPrice.toLocaleString('en-IN')}
                              </span>
                            </td>

                            {/* Unit */}
                            <td className="py-3.5 px-3 text-center text-stone-500 text-[11px]">
                              {language === 'gu' ? item.unitGu : item.unit}
                            </td>

                            {/* Arrivals */}
                            <td className="py-3.5 px-3 text-stone-600 font-medium text-[11px]">
                              {item.arrivalsToday}
                            </td>

                            {/* Trend */}
                            <td className="py-3.5 px-3 text-center">
                              {isUp && (
                                <span className="inline-flex items-center space-x-0.5 text-emerald-700 text-[11px] font-bold">
                                  <ArrowUpRight className="w-3.5 h-3.5" />
                                  <span>+</span>
                                </span>
                              )}
                              {isDown && (
                                <span className="inline-flex items-center space-x-0.5 text-rose-600 text-[11px] font-bold">
                                  <ArrowDownRight className="w-3.5 h-3.5" />
                                  <span>-</span>
                                </span>
                              )}
                              {!isUp && !isDown && (
                                <span className="text-stone-400 text-[11px] font-bold">•</span>
                              )}
                            </td>

                            {/* Action: Select Chart */}
                            <td className="py-3.5 px-4 text-right">
                              <button
                                type="button"
                                onClick={e => {
                                  e.stopPropagation();
                                  handleRowClick(item);
                                  window.scrollTo({ top: 400, behavior: 'smooth' });
                                }}
                                className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                                  isSelectedInChart
                                    ? 'bg-amber-600 text-white'
                                    : 'bg-stone-100 hover:bg-emerald-100 text-stone-700'
                                }`}
                              >
                                {t('mandi.viewChart', 'Trend')}
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Table Footer info */}
              <div className="p-4 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-stone-500 gap-2">
                <div className="flex items-center space-x-2">
                  <Database className="w-3.5 h-3.5 text-stone-400" />
                  <span>
                    {language === 'gu' ? 'સ્ત્રોત:' : 'Source:'} {dataSourceName} •{' '}
                    {language === 'gu' ? 'તાજેતરનું અપડેટ:' : 'Last Updated:'} {new Date(lastUpdated).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-[11px] text-stone-400">
                  {language === 'gu'
                    ? 'હરાજીમાં ગુણવત્તા અને લોટ સાઇઝ મુજબ ભાવમાં ફેરફાર થઈ શકે છે.'
                    : 'Auction prices vary based on lot size, grade, and moisture content.'}
                </div>
              </div>
            </div>

            {/* Mandatory Disclaimers */}
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200/80 space-y-2 text-xs text-amber-900">
              <div className="flex items-center space-x-2 font-bold text-amber-950">
                <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
                <span>{t('disclaimer.demoBadge', 'DEMO / MOCK DATA')}</span>
              </div>
              <p className="leading-relaxed">
                {t(
                  'disclaimer.demoText',
                  'APMC mandi prices shown in this prototype are demonstration figures for technical showcase purposes. Always check the official APMC display board or secretary office for certified bidding figures.'
                )}
              </p>
              <p className="text-[11px] text-amber-800/80 pt-1 border-t border-amber-200/60">
                {language === 'gu'
                  ? 'કિંમતો માત્ર સૂચક જથ્થાબંધ દરો છે. વાસ્તવિક સોદા ગુણવત્તા અને વડોદરા મંડી હરાજી પરિણામો પર નિર્ભર રહે છે.'
                  : 'Prices shown are indicative wholesale rates from APMC auctions and may vary by quality, grade, and lot size.'}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
