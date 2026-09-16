export interface Area {
  id: string;
  name: string;
  gujaratiName: string;
  taluka: string;
  talukaGu: string;
  zone: string; // e.g., 'Urban / Suburban', 'Rural Agri Belt', 'Canal Irrigated'
  zoneGu: string;
  soilTypes: string[];
  soilTypesGu: string[];
  soilDescription: string;
  soilDescriptionGu: string;
  waterAvailability: 'High' | 'Moderate' | 'Seasonal/Borewell';
  waterAvailabilityGu: string;
  waterDetails: string;
  waterDetailsGu: string;
  climate: string;
  climateGu: string;
  seasons: ('Summer' | 'Monsoon' | 'Winter')[];
  seasonsGu: string[];
  drainageType: string;
  drainageTypeGu: string;
  recommendations: string[];
  recommendationsGu: string[];
  suitableVegetables: string[]; // vegetable IDs
  nearestMandi: string; // market ID
}

export interface Vegetable {
  id: string;
  name: string;
  gujaratiName: string;
  scientificName: string;
  category: 'Fruit Vegetable' | 'Leafy' | 'Root' | 'Legume' | 'Cucurbit';
  categoryGu: string;
  emoji: string;
  imageUrl?: string;
  seasons: ('Summer' | 'Monsoon' | 'Winter')[];
  seasonsGu: string[];
  bestSeason: string;
  bestSeasonGu: string;
  soilTypes: string[];
  soilTypesGu: string[];
  soilRequirement: string;
  soilRequirementGu: string;
  waterRequirement: number; // 1 to 5 scale
  waterCategory: 'Low' | 'Moderate' | 'High';
  waterCategoryGu: string;
  sunlight: string;
  sunlightGu: string;
  temperature: string;
  temperatureGu: string;
  harvestDays: string;
  harvestDaysGu: string;
  difficulty: 'Easy' | 'Moderate' | 'Advanced';
  difficultyGu: string;
  purposeSuitability: {
    homeGarden: boolean;
    smallFarm: boolean;
    commercial: boolean;
  };
  cultivationTips: string;
  cultivationTipsGu: string;
  harvestingTips: string;
  harvestingTipsGu: string;
  commonProblems: string[];
  commonProblemsGu: string[];
  companionPlants: string[];
  companionPlantsGu: string[];
  relatedCommodityId?: string; // Links vegetable directly to APMC commodity!
}

export interface AgricultureTip {
  id: string;
  title: string;
  titleGu: string;
  category:
    | 'Soil Preparation'
    | 'Water Management'
    | 'Seasonal Farming'
    | 'Organic Practices'
    | 'Pest Management'
    | 'Vegetable Growing'
    | 'Harvesting'
    | 'Storage'
    | 'Market Selling';
  categoryGu: string;
  summary: string;
  summaryGu: string;
  content: string;
  contentGu: string;
  iconName: string;
  vadodaraContext: string;
  vadodaraContextGu: string;
}

export interface SeasonalCalendarItem {
  vegetableId: string;
  vegetableName: string;
  vegetableGu: string;
  season: 'Summer' | 'Monsoon' | 'Winter';
  seasonGu: string;
  plantingMonths: string;
  plantingMonthsGu: string;
  growingMonths: string;
  growingMonthsGu: string;
  harvestMonths: string;
  harvestMonthsGu: string;
  waterNeed: string;
  waterNeedGu: string;
  expectedYield: string;
  expectedYieldGu: string;
}
