export interface Market {
  id: string;
  name: string;
  gujaratiName: string;
  location: string;
  locationGu: string;
  taluka: string;
  talukaGu: string;
  type: string;
  typeGu: string;
  tradingDays: string;
  tradingDaysGu: string;
  contactNumber: string;
  description: string;
  descriptionGu: string;
  keyCommodities: string[];
  distanceFromVadodaraCityKm: number;
}

export interface Commodity {
  id: string;
  name: string;
  gujaratiName: string;
  category: 'Vegetable' | 'Cash Crop' | 'Grain' | 'Pulse' | 'Oilseed' | 'Fruit';
  categoryGu: string;
  unit: string; // e.g. "Quintal (100 kg)" or "20 kg (Mann)"
  unitGu: string;
  variety: string;
  varietyGu: string;
  icon: string;
  relatedVegetableId?: string;
  description: string;
  descriptionGu: string;
}

export interface MarketPrice {
  id: string;
  marketId: string;
  marketName: string;
  marketNameGu: string;
  commodityId: string;
  commodityName: string;
  commodityNameGu: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  unit: string;
  unitGu: string;
  arrivals: number; // in tonnes or quintals
  arrivalsUnit: string;
  trend: 'up' | 'down' | 'stable';
  changeAmount: number;
  changePercentage: number;
  updatedAt: string;
  isDemoData?: boolean;
}

export interface PriceTrendPoint {
  date: string;
  dateLabel: string;
  dateLabelGu: string;
  minPrice: number;
  modalPrice: number;
  maxPrice: number;
  arrivals?: number;
}

export interface MandiApiResponse {
  success: boolean;
  timestamp: string;
  source: string;
  isDemoData: boolean;
  disclaimer: string;
  disclaimerGu: string;
  data: MarketPrice[];
}
