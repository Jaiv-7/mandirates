import rawMarketData from '../data/marketPrices.json';
import { MandiApiResponse, MarketPrice, PriceTrendPoint } from '../types/mandi';

export interface FetchMandiResult {
  prices: MarketPrice[];
  isDemoData: boolean;
  timestamp: string;
  source: string;
  error?: string;
}

export async function fetchMandiPrices(): Promise<FetchMandiResult> {
  try {
    const response = await fetch('/api/v1/mandi', {
      headers: { 'Accept': 'application/json' },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`API returned HTTP ${response.status}`);
    }

    const data: MandiApiResponse = await response.json();
    if (!data.data || !Array.isArray(data.data)) {
      throw new Error('Malformed API response structure');
    }

    return {
      prices: data.data,
      isDemoData: data.isDemoData ?? true,
      timestamp: data.timestamp || new Date().toISOString(),
      source: data.source || 'APMC Live Gateway'
    };
  } catch (err: unknown) {
    // Graceful fallback to local mock JSON as required by specifications
    const fallbackPrices = rawMarketData.prices as MarketPrice[];
    return {
      prices: fallbackPrices,
      isDemoData: true,
      timestamp: rawMarketData.timestamp,
      source: 'Local Demo Dataset (Fallback)',
      error: err instanceof Error ? err.message : 'API offline'
    };
  }
}

export function filterAndSortPrices(
  prices: MarketPrice[],
  filters: {
    marketId?: string;
    commodityId?: string;
    searchQuery?: string;
    sortBy?: 'lowest' | 'highest' | 'modal' | 'commodity' | 'latest';
  }
): MarketPrice[] {
  let filtered = [...prices];

  if (filters.marketId && filters.marketId !== 'all') {
    filtered = filtered.filter(p => p.marketId === filters.marketId);
  }

  if (filters.commodityId && filters.commodityId !== 'all') {
    filtered = filtered.filter(p => p.commodityId === filters.commodityId);
  }

  if (filters.searchQuery && filters.searchQuery.trim()) {
    const q = filters.searchQuery.trim().toLowerCase();
    filtered = filtered.filter(p =>
      p.commodityName.toLowerCase().includes(q) ||
      p.commodityNameGu.toLowerCase().includes(q) ||
      p.marketName.toLowerCase().includes(q) ||
      p.marketNameGu.toLowerCase().includes(q)
    );
  }

  switch (filters.sortBy) {
    case 'lowest':
      filtered.sort((a, b) => a.minPrice - b.minPrice);
      break;
    case 'highest':
      filtered.sort((a, b) => b.maxPrice - a.maxPrice);
      break;
    case 'modal':
      filtered.sort((a, b) => b.modalPrice - a.modalPrice);
      break;
    case 'commodity':
      filtered.sort((a, b) => a.commodityName.localeCompare(b.commodityName));
      break;
    case 'latest':
    default:
      // Keep natural order or ID
      break;
  }

  return filtered;
}

export function getHistoricalTrend(commodityId: string, _marketId?: string): PriceTrendPoint[] {
  const trendsRecord = (rawMarketData.historicalTrends as Record<string, PriceTrendPoint[]>)[commodityId];
  if (trendsRecord && trendsRecord.length > 0) {
    return trendsRecord;
  }

  // Fallback synthetic trend based on standard range
  const today = new Date();
  const points: PriceTrendPoint[] = [];
  const basePrice = 1200;

  for (let i = 8; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i * 3);
    const fluctuation = Math.sin(i) * 50 + (8 - i) * 15;
    const modal = Math.round(basePrice + fluctuation);
    points.push({
      date: d.toISOString().split('T')[0],
      dateLabel: `${d.getDate()} ${d.toLocaleString('en', { month: 'short' })}`,
      dateLabelGu: `${d.getDate()} ${d.toLocaleString('gu-IN', { month: 'short' })}`,
      minPrice: Math.round(modal * 0.9),
      modalPrice: modal,
      maxPrice: Math.round(modal * 1.1)
    });
  }

  return points;
}
