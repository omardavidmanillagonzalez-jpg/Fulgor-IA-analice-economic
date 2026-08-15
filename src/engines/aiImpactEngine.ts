import { SectorImpact } from '../types/economic';
import { SECTOR_IMPACTS } from '../data/economicData';

export interface SectorProductivityMetric {
  sectorId: string;
  name: string;
  grossValueAddedLiftPct: number;
  monthlyHoursSavedAverage: number;
  costReductionPercentage: number;
  laborReallocationRatePct: number;
  roiMultiple: number;
  methodologyNotes: string;
}

export class AiImpactEngine {
  public static getAllSectors(): SectorImpact[] {
    return SECTOR_IMPACTS;
  }

  public static getSectorById(id: string): SectorImpact | undefined {
    return SECTOR_IMPACTS.find(s => s.id === id);
  }

  public static calculateMacroAnnualImpact(sectors: SectorImpact[]): {
    aggregateProductivityLiftPct: number;
    weightedGdpLiftPct: number;
    totalHoursSavedMonthlyMillions: number;
    avgSectorAdoptionPct: number;
  } {
    let totalWeightedProd = 0;
    let totalHoursSaved = 0;
    let totalAdoption = 0;

    sectors.forEach(s => {
      totalWeightedProd += (s.productivityGainAnnual * (s.shareOfGDP / 100));
      totalHoursSaved += (s.hoursSavedPerWorkerMonth * s.shareOfGDP * 0.4);
      totalAdoption += s.currentAiAdoption;
    });

    const avgAdoption = totalAdoption / (sectors.length || 1);

    return {
      aggregateProductivityLiftPct: Number((totalWeightedProd).toFixed(2)),
      weightedGdpLiftPct: Number((totalWeightedProd * 0.72).toFixed(2)),
      totalHoursSavedMonthlyMillions: Number((totalHoursSaved).toFixed(1)),
      avgSectorAdoptionPct: Number(avgAdoption.toFixed(1)),
    };
  }
}
