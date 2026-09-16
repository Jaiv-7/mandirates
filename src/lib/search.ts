import areasData from '../data/areas.json';
import commoditiesData from '../data/commodities.json';
import marketsData from '../data/markets.json';
import tipsData from '../data/tips.json';
import vegetablesData from '../data/vegetables.json';

export type SearchResultType = 'area' | 'vegetable' | 'commodity' | 'market' | 'tip';

export interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  titleGu: string;
  subtitle: string;
  subtitleGu: string;
  badge: string;
  badgeGu: string;
  targetTab: 'home' | 'vegetableGuide' | 'areaCrops' | 'mandiRates' | 'priceTrends' | 'agriTips' | 'seasonalCalendar' | 'areaComparison';
  payloadId: string;
}

export function performGlobalSearch(query: string): SearchResult[] {
  if (!query || query.trim().length < 1) return [];

  const q = query.trim().toLowerCase();
  const results: SearchResult[] = [];

  // 1. Search Areas
  for (const area of areasData) {
    if (
      area.name.toLowerCase().includes(q) ||
      area.gujaratiName.toLowerCase().includes(q) ||
      area.taluka.toLowerCase().includes(q) ||
      area.talukaGu.toLowerCase().includes(q)
    ) {
      results.push({
        id: `area-${area.id}`,
        type: 'area',
        title: area.name,
        titleGu: area.gujaratiName,
        subtitle: `${area.zone} • Taluka: ${area.taluka}`,
        subtitleGu: `${area.zoneGu} • તાલુકો: ${area.talukaGu}`,
        badge: 'Area Profile',
        badgeGu: 'વિસ્તાર પ્રોફાઇલ',
        targetTab: 'vegetableGuide',
        payloadId: area.id
      });
    }
  }

  // 2. Search Vegetables
  for (const veg of vegetablesData) {
    if (
      veg.name.toLowerCase().includes(q) ||
      veg.gujaratiName.toLowerCase().includes(q) ||
      veg.scientificName.toLowerCase().includes(q)
    ) {
      results.push({
        id: `veg-${veg.id}`,
        type: 'vegetable',
        title: `${veg.emoji} ${veg.name}`,
        titleGu: `${veg.emoji} ${veg.gujaratiName}`,
        subtitle: `${veg.category} • Best: ${veg.bestSeason}`,
        subtitleGu: `${veg.categoryGu} • શ્રેષ્ઠ: ${veg.bestSeasonGu}`,
        badge: 'Vegetable Guide',
        badgeGu: 'શાકભાજી માર્ગદર્શિકા',
        targetTab: 'vegetableGuide',
        payloadId: veg.id
      });
    }
  }

  // 3. Search Commodities
  for (const com of commoditiesData) {
    if (
      com.name.toLowerCase().includes(q) ||
      com.gujaratiName.toLowerCase().includes(q) ||
      com.variety.toLowerCase().includes(q)
    ) {
      results.push({
        id: `com-${com.id}`,
        type: 'commodity',
        title: `${com.icon} ${com.name}`,
        titleGu: `${com.icon} ${com.gujaratiName}`,
        subtitle: `${com.category} • ${com.unit}`,
        subtitleGu: `${com.categoryGu} • ${com.unitGu}`,
        badge: 'APMC Mandi',
        badgeGu: 'APMC મંડી',
        targetTab: 'mandiRates',
        payloadId: com.id
      });
    }
  }

  // 4. Search Markets
  for (const mkt of marketsData) {
    if (
      mkt.name.toLowerCase().includes(q) ||
      mkt.gujaratiName.toLowerCase().includes(q) ||
      mkt.location.toLowerCase().includes(q)
    ) {
      results.push({
        id: `mkt-${mkt.id}`,
        type: 'market',
        title: mkt.name,
        titleGu: mkt.gujaratiName,
        subtitle: `${mkt.type} • ${mkt.distanceFromVadodaraCityKm} km from City`,
        subtitleGu: `${mkt.typeGu} • શહેરથી ${mkt.distanceFromVadodaraCityKm} કિમી`,
        badge: 'APMC Yard',
        badgeGu: 'APMC યાર્ડ',
        targetTab: 'mandiRates',
        payloadId: mkt.id
      });
    }
  }

  // 5. Search Agriculture Tips
  for (const tip of tipsData) {
    if (
      tip.title.toLowerCase().includes(q) ||
      tip.titleGu.toLowerCase().includes(q) ||
      tip.category.toLowerCase().includes(q) ||
      tip.summary.toLowerCase().includes(q) ||
      tip.summaryGu.toLowerCase().includes(q)
    ) {
      results.push({
        id: `tip-${tip.id}`,
        type: 'tip',
        title: tip.title,
        titleGu: tip.titleGu,
        subtitle: `${tip.category} — ${tip.summary.slice(0, 60)}...`,
        subtitleGu: `${tip.categoryGu} — ${tip.summaryGu.slice(0, 60)}...`,
        badge: 'Agri Tip',
        badgeGu: 'કૃષિ સલાહ',
        targetTab: 'agriTips',
        payloadId: tip.id
      });
    }
  }

  return results.slice(0, 8);
}
