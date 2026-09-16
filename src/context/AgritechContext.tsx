import React, { createContext, useContext, useState } from 'react';
import areasData from '../data/areas.json';
import { Area, Vegetable } from '../types/agriculture';

export type TabType =
  | 'home'
  | 'vegetableGuide'
  | 'areaCrops'
  | 'mandiRates'
  | 'priceTrends'
  | 'agriTips'
  | 'seasonalCalendar'
  | 'areaComparison'
  | 'about';

interface AgritechContextType {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  selectedAreaId: string;
  setSelectedAreaId: (id: string) => void;
  currentArea: Area | undefined;
  selectedSeason: 'Summer' | 'Monsoon' | 'Winter' | 'all';
  setSelectedSeason: (season: 'Summer' | 'Monsoon' | 'Winter' | 'all') => void;
  selectedPurpose: 'homeGarden' | 'smallFarm' | 'commercial' | 'all';
  setSelectedPurpose: (purpose: 'homeGarden' | 'smallFarm' | 'commercial' | 'all') => void;
  selectedWaterAvailability: 'Low' | 'Moderate' | 'High' | 'all';
  setSelectedWaterAvailability: (water: 'Low' | 'Moderate' | 'High' | 'all') => void;
  activeVegetableModal: Vegetable | null;
  setActiveVegetableModal: (veg: Vegetable | null) => void;
  selectedMandiCommodityId: string;
  setSelectedMandiCommodityId: (id: string) => void;
  selectedMandiMarketId: string;
  setSelectedMandiMarketId: (id: string) => void;
  chartTimeRange: '7' | '15' | '30';
  setChartTimeRange: (range: '7' | '15' | '30') => void;
  comparisonAreaIds: [string, string, string?];
  setComparisonAreaIds: (ids: [string, string, string?]) => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;
  navigateToMandiForCommodity: (commodityId: string, marketId?: string) => void;
  navigateToVegetable: (vegId: string) => void;
  navigateToArea: (areaId: string) => void;
}

const AgritechContext = createContext<AgritechContextType | undefined>(undefined);

export const AgritechProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedAreaId, setSelectedAreaId] = useState<string>('manjalpur');
  const [selectedSeason, setSelectedSeason] = useState<'Summer' | 'Monsoon' | 'Winter' | 'all'>('all');
  const [selectedPurpose, setSelectedPurpose] = useState<'homeGarden' | 'smallFarm' | 'commercial' | 'all'>('all');
  const [selectedWaterAvailability, setSelectedWaterAvailability] = useState<'Low' | 'Moderate' | 'High' | 'all'>('all');
  const [activeVegetableModal, setActiveVegetableModal] = useState<Vegetable | null>(null);
  const [selectedMandiCommodityId, setSelectedMandiCommodityId] = useState<string>('cotton');
  const [selectedMandiMarketId, setSelectedMandiMarketId] = useState<string>('all');
  const [chartTimeRange, setChartTimeRange] = useState<'7' | '15' | '30'>('15');
  const [comparisonAreaIds, setComparisonAreaIds] = useState<[string, string, string?]>([
    'manjalpur',
    'gotri',
    'padra'
  ]);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);

  const currentArea = (areasData as Area[]).find(a => a.id === selectedAreaId) || (areasData[0] as Area);

  const navigateToMandiForCommodity = (commodityId: string, marketId?: string) => {
    setSelectedMandiCommodityId(commodityId);
    if (marketId) {
      setSelectedMandiMarketId(marketId);
    }
    setActiveVegetableModal(null);
    setActiveTab('mandiRates');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToVegetable = (vegId: string) => {
    setActiveTab('vegetableGuide');
    // will trigger detail or highlight
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToArea = (areaId: string) => {
    setSelectedAreaId(areaId);
    setActiveTab('vegetableGuide');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AgritechContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedAreaId,
        setSelectedAreaId,
        currentArea,
        selectedSeason,
        setSelectedSeason,
        selectedPurpose,
        setSelectedPurpose,
        selectedWaterAvailability,
        setSelectedWaterAvailability,
        activeVegetableModal,
        setActiveVegetableModal,
        selectedMandiCommodityId,
        setSelectedMandiCommodityId,
        selectedMandiMarketId,
        setSelectedMandiMarketId,
        chartTimeRange,
        setChartTimeRange,
        comparisonAreaIds,
        setComparisonAreaIds,
        isSearchModalOpen,
        setIsSearchModalOpen,
        navigateToMandiForCommodity,
        navigateToVegetable,
        navigateToArea
      }}
    >
      {children}
    </AgritechContext.Provider>
  );
};

export const useAgritech = (): AgritechContextType => {
  const context = useContext(AgritechContext);
  if (!context) {
    throw new Error('useAgritech must be used within an AgritechProvider');
  }
  return context;
};
