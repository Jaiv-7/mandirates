import { ArrowRight, MapPin, Search, Sprout, TrendingUp, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useAgritech } from '../context/AgritechContext';
import { useLanguage } from '../context/LanguageContext';
import { performGlobalSearch, SearchResult } from '../lib/search';

export const GlobalSearch: React.FC = () => {
  const { isSearchModalOpen, setIsSearchModalOpen, setActiveTab, setSelectedAreaId, setSelectedMandiCommodityId } = useAgritech();
  const { language, t } = useLanguage();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchModalOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isSearchModalOpen]);

  useEffect(() => {
    const res = performGlobalSearch(query);
    setResults(res);
  }, [query]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchModalOpen) {
        setIsSearchModalOpen(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchModalOpen, setIsSearchModalOpen]);

  if (!isSearchModalOpen) return null;

  const handleSelectResult = (item: SearchResult) => {
    if (item.type === 'area') {
      setSelectedAreaId(item.payloadId);
      setActiveTab('vegetableGuide');
    } else if (item.type === 'vegetable') {
      setActiveTab('vegetableGuide');
    } else if (item.type === 'commodity' || item.type === 'market') {
      setSelectedMandiCommodityId(item.payloadId);
      setActiveTab('mandiRates');
    } else if (item.type === 'tip') {
      setActiveTab('agriTips');
    }
    setIsSearchModalOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'area':
        return <MapPin className="w-4 h-4 text-emerald-600" />;
      case 'vegetable':
        return <Sprout className="w-4 h-4 text-lime-600" />;
      case 'commodity':
      case 'market':
        return <TrendingUp className="w-4 h-4 text-amber-600" />;
      default:
        return <Search className="w-4 h-4 text-stone-500" />;
    }
  };

  return (
    <div
      id="global-search-modal-backdrop"
      className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={() => setIsSearchModalOpen(false)}
    >
      <div
        id="global-search-modal-dialog"
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-stone-200 bg-stone-50/70">
          <Search className="w-5 h-5 text-emerald-700 mr-3 shrink-0" />
          <input
            ref={inputRef}
            id="global-search-input"
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={
              language === 'gu'
                ? "શોધો: વિસ્તાર (મંજલપુર), શાકભાજી (ટામેટા), પાક (કપાસ), મંડી (પાદરા)..."
                : "Search Vadodara area (Manjalpur), vegetable (Tomato), commodity (Cotton), mandi (Padra)..."
            }
            className="w-full bg-transparent text-stone-900 placeholder-stone-400 focus:outline-hidden text-sm sm:text-base"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-stone-400 hover:text-stone-600 mr-2"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            id="btn-close-global-search"
            type="button"
            onClick={() => setIsSearchModalOpen(false)}
            className="text-xs font-semibold px-2 py-1 rounded-md bg-stone-200 text-stone-700 hover:bg-stone-300 transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2">
          {query.trim().length === 0 ? (
            <div className="py-8 px-4 text-center text-stone-500 text-sm">
              <p className="font-medium text-stone-700 mb-1">
                {language === 'gu' ? "શોધ શરૂ કરવા ટાઈપ કરો" : "Type to search Vadodara Agritech directory"}
              </p>
              <p className="text-xs text-stone-400">
                {language === 'gu'
                  ? "વિસ્તારો: મંજલપુર, ગોત્રી, પાદરા, કરજણ | શાકભાજી: ટામેટા, રીંગણ, ભીંડા | મંડી: સયાજીપુરા"
                  : "Areas: Manjalpur, Gotri, Padra, Karjan | Veg: Tomato, Brinjal, Okra | Mandi: Sayajipura"}
              </p>
            </div>
          ) : results.length === 0 ? (
            <div className="py-10 text-center text-stone-500 text-sm">
              <p className="font-semibold text-stone-800 mb-1">
                {language === 'gu' ? "કોઈ પરિણામ મળ્યું નથી" : "We couldn't find anything matching your search"}
              </p>
              <p className="text-xs text-stone-400">
                {language === 'gu' ? "અંગ્રેજી અથવા ગુજરાતીમાં અન્ય શબ્દ અજમાવો" : "Try searching by English or Gujarati name"}
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {results.map((res) => (
                <button
                  key={res.id}
                  type="button"
                  onClick={() => handleSelectResult(res)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-emerald-50/80 transition-colors text-left group cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-stone-100 group-hover:bg-emerald-100 transition-colors">
                      {getResultIcon(res.type)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-stone-900 text-sm sm:text-base">
                          {language === 'gu' ? res.titleGu : res.title}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 font-medium">
                          {language === 'gu' ? res.badgeGu : res.badge}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 mt-0.5">
                        {language === 'gu' ? res.subtitleGu : res.subtitle}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-700 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
