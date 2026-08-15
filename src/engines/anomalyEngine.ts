import { EconomicAlert } from '../types/economic';
import { ECONOMIC_ALERTS } from '../data/economicData';

export interface AnomalyDetectionResult {
  isAnomaly: boolean;
  zScore: number;
  observedDelta: number;
  thresholdZ: number;
  severity: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'INFO';
  epistemicType: 'OBSERVED_DATA' | 'CORRELATION' | 'MODEL_ESTIMATE' | 'CAUSAL_INFERENCE' | 'PROJECTION';
  suggestedAction: string;
}

export class AnomalyEngine {
  public static getAlerts(countryCode?: string): EconomicAlert[] {
    if (!countryCode || countryCode === 'ALL') {
      return ECONOMIC_ALERTS;
    }
    return ECONOMIC_ALERTS.filter(a => a.countryCode === countryCode);
  }

  public static evaluateZScore(
    currentValue: number,
    historicalMean: number,
    historicalStdDev: number,
    thresholdZ: number = 2.0
  ): AnomalyDetectionResult {
    if (historicalStdDev === 0) {
      return {
        isAnomaly: false,
        zScore: 0,
        observedDelta: 0,
        thresholdZ,
        severity: 'INFO',
        epistemicType: 'OBSERVED_DATA',
        suggestedAction: 'Monitoreo estándar de serie de tiempo.'
      };
    }

    const zScore = (currentValue - historicalMean) / historicalStdDev;
    const absZ = Math.abs(zScore);
    const isAnomaly = absZ >= thresholdZ;

    let severity: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'INFO' = 'INFO';
    if (absZ >= 3.0) severity = 'CRITICAL';
    else if (absZ >= 2.5) severity = 'HIGH';
    else if (absZ >= 2.0) severity = 'MODERATE';

    return {
      isAnomaly,
      zScore: Number(zScore.toFixed(2)),
      observedDelta: Number((currentValue - historicalMean).toFixed(2)),
      thresholdZ,
      severity,
      epistemicType: 'OBSERVED_DATA',
      suggestedAction: isAnomaly 
        ? 'Activar protocolo de revisión analítica y validar consistencia con fuentes cruzadas.'
        : 'Parámetros dentro del intervalo de variación normal.'
    };
  }
}
