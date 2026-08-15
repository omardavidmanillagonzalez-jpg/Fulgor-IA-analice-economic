import { FulgorAIImpactIndexBreakdown } from '../types/economic';
import { FULGOR_INDEX_RANKINGS } from '../data/economicData';

export interface FAIIWeights {
  productivityLift: number;
  adoptionVelocity: number;
  capitalTechIntensity: number;
  humanSkillReadiness: number;
  transitionFrictionPenalty: number;
}

export const DEFAULT_FAII_WEIGHTS: FAIIWeights = {
  productivityLift: 0.30,
  adoptionVelocity: 0.25,
  capitalTechIntensity: 0.20,
  humanSkillReadiness: 0.25,
  transitionFrictionPenalty: 0.15, // Penalty factor
};

export class FaiiEngine {
  public static getAllRankings(): FulgorAIImpactIndexBreakdown[] {
    return FULGOR_INDEX_RANKINGS;
  }

  public static recalculateIndex(
    baseRanking: FulgorAIImpactIndexBreakdown,
    weights: FAIIWeights = DEFAULT_FAII_WEIGHTS
  ): number {
    const pVal = baseRanking.components.productivityLift.value;
    const aVal = baseRanking.components.adoptionVelocity.value;
    const cVal = baseRanking.components.capitalTechIntensity.value;
    const hVal = baseRanking.components.humanSkillReadiness.value;
    const fVal = baseRanking.components.transitionFrictionPenalty.value;

    const totalWeight = weights.productivityLift + weights.adoptionVelocity + weights.capitalTechIntensity + weights.humanSkillReadiness;
    const normalizedP = weights.productivityLift / (totalWeight || 1);
    const normalizedA = weights.adoptionVelocity / (totalWeight || 1);
    const normalizedC = weights.capitalTechIntensity / (totalWeight || 1);
    const normalizedH = weights.humanSkillReadiness / (totalWeight || 1);

    const grossScore = (pVal * normalizedP) + (aVal * normalizedA) + (cVal * normalizedC) + (hVal * normalizedH);
    const netScore = Math.max(0, Math.min(100, grossScore - (fVal * weights.transitionFrictionPenalty)));

    return Number(netScore.toFixed(1));
  }
}
