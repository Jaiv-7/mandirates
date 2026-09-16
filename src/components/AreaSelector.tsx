import { Check, ChevronDown, MapPin, Search } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { useAgritech } from '../context/AgritechContext';
import { useLanguage } from '../context/LanguageContext';
import areasData from '../data/areas.json';
import { Area } from '../types/agriculture';

export const AreaSelector: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { selectedAreaId, setSelectedAreaId } = useAgritech();
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const currentArea = (areasData as Area[]).find(a => a.id === selectedAreaId) || (areasData[0] as Area);

  const filteredAreas = useMemo(() => {
    if (!searchQuery.trim()) return areasData as Area[];
    const q = searchQuery.trim().toLowerCase();
    return (areasData as Area[]).filter(
      a =>
        a.name.toLowerCase().includes(q) ||
        a.gujaratiName.toLowerCase().includes(q) ||
        a.taluka.toLowerCase().includes(q) ||
        a.talukaGu.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <div id="vadodara-area-selector" className={`relative ${className}`}>
      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
        {language === 'gu' ? 'વડોદરા વિસ્તાર પસંદ કરો:' : 'Select Vadodara Area:'}
      </label>

      {/* Main trigger button */}
      <button
        id="btn-area-dropdown-trigger"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white border-2 border-emerald-600/60 rounded-xl shadow-xs hover:border-emerald-700 transition-colors text-left cursor-pointer"
      >
        <div className="flex items-center space-x-3 truncate">
          <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
            <MapPin className="w-5 h-5 text-emerald-700" />
          </div>
          <div className="truncate">
            <div className="font-bold text-stone-900 text-sm sm:text-base">
              {language === 'gu' ? currentArea.gujaratiName : currentArea.name}
            </div>
            <div className="text-xs text-stone-500 truncate">
              {language === 'gu' ? currentArea.talukaGu : currentArea.taluka} • {currentArea.zone}
            </div>
          </div>
        </div>
        <ChevronDown className={`w-5 h-5 text-stone-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-20"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 right-0 z-30 mt-2 bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150 max-h-96 flex flex-col">
            {/* Search within dropdown */}
            <div className="p-3 border-b border-stone-100 bg-stone-50 flex items-center space-x-2">
              <Search className="w-4 h-4 text-stone-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={language === 'gu' ? 'વિસ્તાર શોધો (દા.ત. ગોત્રી, Padra)...' : 'Search area (e.g. Gotri, Padra)...'}
                className="w-full text-xs sm:text-sm bg-transparent border-none focus:outline-hidden text-stone-800 placeholder-stone-400"
                autoFocus
              />
            </div>

            {/* List */}
            <div className="overflow-y-auto p-2 space-y-1">
              {filteredAreas.length === 0 ? (
                <div className="p-4 text-center text-xs text-stone-400">
                  {language === 'gu' ? 'કોઈ વિસ્તાર મળ્યો નથી' : 'No matching area found'}
                </div>
              ) : (
                filteredAreas.map((area) => {
                  const isSelected = area.id === selectedAreaId;
                  return (
                    <button
                      key={area.id}
                      type="button"
                      onClick={() => {
                        setSelectedAreaId(area.id);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs sm:text-sm transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-50 text-emerald-900 font-bold border border-emerald-200'
                          : 'hover:bg-stone-50 text-stone-800'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <MapPin className={`w-4 h-4 ${isSelected ? 'text-emerald-700' : 'text-stone-400'}`} />
                        <div>
                          <div className="font-semibold">
                            {language === 'gu' ? area.gujaratiName : area.name}
                          </div>
                          <div className="text-[11px] text-stone-500 font-normal">
                            {language === 'gu' ? area.talukaGu : area.taluka} | {area.soilTypes[0]}
                          </div>
                        </div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-emerald-700" />}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
