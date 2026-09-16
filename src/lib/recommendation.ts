import { Area, Vegetable } from '../types/agriculture';

export type SuitabilityLevel = 'highlySuitable' | 'suitable' | 'moderatelySuitable' | 'requiresAttention';

export interface ScoredVegetable {
  vegetable: Vegetable;
  score: number;
  level: SuitabilityLevel;
  reasons: string[];
  reasonsGu: string[];
}

export interface RecommendationFilter {
  season?: 'Summer' | 'Monsoon' | 'Winter' | 'all';
  purpose?: 'homeGarden' | 'smallFarm' | 'commercial' | 'all';
  waterAvailability?: 'Low' | 'Moderate' | 'High' | 'all';
  soilType?: string;
  searchQuery?: string;
}

export function calculateSuitability(
  vegetable: Vegetable,
  area?: Area,
  filter?: RecommendationFilter
): ScoredVegetable {
  let score = 50; // base score
  const reasons: string[] = [];
  const reasonsGu: string[] = [];

  // 1. Area-specific suitability
  if (area) {
    const isDirectlyRecommended = area.suitableVegetables.includes(vegetable.id);
    if (isDirectlyRecommended) {
      score += 25;
      reasons.push(`Directly recommended for ${area.name}'s agro-profile`);
      reasonsGu.push(`${area.gujaratiName}ના કૃષિ પ્રોફાઇલ માટે વિશેષ અનુકૂળ`);
    }

    // Soil compatibility
    const soilOverlap = vegetable.soilTypes.some(st =>
      area.soilTypes.some(ast => ast.toLowerCase().includes(st.toLowerCase()) || st.toLowerCase().includes(ast.toLowerCase()))
    );
    if (soilOverlap) {
      score += 15;
      reasons.push(`Compatible with local ${area.soilTypes[0]} soil`);
      reasonsGu.push(`સ્થાનિક ${area.soilTypesGu[0]} સાથે સુસંગત`);
    } else {
      score -= 5;
    }

    // Water compatibility
    if (area.waterAvailability === 'High' && (vegetable.waterCategory === 'High' || vegetable.waterCategory === 'Moderate')) {
      score += 10;
      reasons.push('Matches area water abundance');
      reasonsGu.push('વિસ્તારના પૂરતા પાણી સાથે યોગ્ય મેળ');
    } else if (area.waterAvailability === 'Seasonal/Borewell' && vegetable.waterCategory === 'Low') {
      score += 15;
      reasons.push('Low water requirement suits borewell conditions');
      reasonsGu.push('ઓછી પાણી જરૂરિયાત બોરવેલ પરિસ્થિતિ માટે અનુકૂળ');
    }
  }

  // 2. Season compatibility
  const selectedSeason = filter?.season || 'all';
  if (selectedSeason !== 'all') {
    if (vegetable.seasons.includes(selectedSeason)) {
      score += 15;
      if (vegetable.bestSeason.toLowerCase().includes(selectedSeason.toLowerCase())) {
        score += 5;
        reasons.push(`Optimal season (${selectedSeason})`);
        reasonsGu.push(`સર્વોત્તમ વાવેતર મોસમ (${selectedSeason})`);
      } else {
        reasons.push(`Good for ${selectedSeason}`);
        reasonsGu.push(`${selectedSeason} માટે સારો પાક`);
      }
    } else {
      score -= 25;
      reasons.push(`Sub-optimal for current selected season (${selectedSeason})`);
      reasonsGu.push(`પસંદ કરેલ ઋતુ (${selectedSeason}) માટે ઓછો અનુકૂળ`);
    }
  }

  // 3. Growing Purpose compatibility
  const selectedPurpose = filter?.purpose || 'all';
  if (selectedPurpose !== 'all') {
    if (vegetable.purposeSuitability[selectedPurpose]) {
      score += 10;
      if (selectedPurpose === 'homeGarden') {
        reasons.push('Excellent container & terrace viability');
        reasonsGu.push('કુંડા અને ધાબાના બગીચા માટે ઉત્તમ');
      } else if (selectedPurpose === 'commercial') {
        reasons.push('High commercial auction yield in Vadodara APMC');
        reasonsGu.push('વડોદરા APMC મંડીમાં ઉચ્ચ વ્યાવસાયિક માંગ');
      }
    } else {
      score -= 15;
      reasons.push(`Requires space adjustments for ${selectedPurpose}`);
      reasonsGu.push(`${selectedPurpose} માટે વિશેષ આયોજન જરૂરી`);
    }
  }

  // 4. Water availability filter override
  if (filter?.waterAvailability && filter.waterAvailability !== 'all') {
    if (vegetable.waterCategory === filter.waterAvailability) {
      score += 10;
    } else if (filter.waterAvailability === 'Low' && vegetable.waterCategory === 'High') {
      score -= 20;
      reasons.push('Requires more water than selected availability');
      reasonsGu.push('પસંદ કરેલ સ્તર કરતાં વધુ પાણીની જરૂર છે');
    }
  }

  // Clamp score between 10 and 98 (no 100% false certainty)
  score = Math.min(98, Math.max(15, score));

  // Determine suitability level
  let level: SuitabilityLevel = 'moderatelySuitable';
  if (score >= 80) {
    level = 'highlySuitable';
  } else if (score >= 65) {
    level = 'suitable';
  } else if (score >= 45) {
    level = 'moderatelySuitable';
  } else {
    level = 'requiresAttention';
  }

  return {
    vegetable,
    score,
    level,
    reasons: reasons.slice(0, 3),
    reasonsGu: reasonsGu.slice(0, 3)
  };
}

export function rankVegetablesForArea(
  vegetables: Vegetable[],
  area?: Area,
  filter?: RecommendationFilter
): ScoredVegetable[] {
  return vegetables
    .map(veg => calculateSuitability(veg, area, filter))
    .sort((a, b) => b.score - a.score);
}
