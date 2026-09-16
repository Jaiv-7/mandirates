import marketsData from '../data/markets.json';
import { Area } from '../types/agriculture';
import { Market } from '../types/mandi';

export function getNearestMarketForArea(area?: Area): Market {
  if (!area) return marketsData[0] as Market;
  const found = (marketsData as Market[]).find(m => m.id === area.nearestMandi);
  return found || (marketsData[0] as Market);
}
