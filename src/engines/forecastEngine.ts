export interface FanChartBandPoint {
  period: string;
  p10: number; // Percentil 10 (Escenario pesimista / cola inferior)
  p30: number;
  p50: number; // Mediana / Escenario Central Base
  p70: number;
  p90: number; // Percentil 90 (Escenario optimista / cola superior)
  observed?: boolean;
}

export interface ProbabilisticRiskFactor {
  name: string;
  category: 'Macro' | 'Geopolítico' | 'Tecnológico' | 'Regulatorio' | 'Energético';
  probabilityPct: number;
  impactOnGdpDeltaPct: number;
  direction: 'Negativo' | 'Positivo';
  mitigationStrategy: string;
}

export class ForecastEngine {
  public static generateFanChartSeries(
    baseValue: number,
    historicalGrowth: number = 0.024,
    horizonQuarters: number = 8,
    volatilitySigma: number = 0.015
  ): FanChartBandPoint[] {
    const points: FanChartBandPoint[] = [];
    let currentVal = baseValue;

    // Past 4 quarters (Observed historical)
    for (let q = -4; q < 0; q++) {
      const histVal = baseValue * (1 + historicalGrowth * (q / 4));
      points.push({
        period: `T${q}`,
        p10: Number(histVal.toFixed(2)),
        p30: Number(histVal.toFixed(2)),
        p50: Number(histVal.toFixed(2)),
        p70: Number(histVal.toFixed(2)),
        p90: Number(histVal.toFixed(2)),
        observed: true,
      });
    }

    // Future Quarters (Probabilistic Forecast with widening confidence fan)
    for (let q = 0; q <= horizonQuarters; q++) {
      currentVal *= (1 + historicalGrowth / 4);
      const uncertaintySpread = Math.sqrt(q + 1) * volatilitySigma * currentVal;

      points.push({
        period: `T+${q}`,
        p10: Number((currentVal - 1.645 * uncertaintySpread).toFixed(2)),
        p30: Number((currentVal - 0.524 * uncertaintySpread).toFixed(2)),
        p50: Number(currentVal.toFixed(2)),
        p70: Number((currentVal + 0.524 * uncertaintySpread).toFixed(2)),
        p90: Number((currentVal + 1.645 * uncertaintySpread).toFixed(2)),
        observed: false,
      });
    }

    return points;
  }

  public static getRiskMatrix(): ProbabilisticRiskFactor[] {
    return [
      {
        name: 'Shock inflacionario por disrupción en cadenas de suministro',
        category: 'Macro',
        probabilityPct: 28,
        impactOnGdpDeltaPct: -0.85,
        direction: 'Negativo',
        mitigationStrategy: 'Diversificación de proveedores y nearshoring con socios USMCA/EU.'
      },
      {
        name: 'Aceleración imprevista en adopción corporativa de agentes de IA',
        category: 'Tecnológico',
        probabilityPct: 64,
        impactOnGdpDeltaPct: +1.20,
        direction: 'Positivo',
        mitigationStrategy: 'Incentivos fiscales a I+D y programas de reconversión técnica laboral.'
      },
      {
        name: 'Restricciones de capacidad en infraestructura eléctrica / centros de datos',
        category: 'Energético',
        probabilityPct: 45,
        impactOnGdpDeltaPct: -0.50,
        direction: 'Negativo',
        mitigationStrategy: 'Apertura a coinversión en energías limpias y redes inteligentes de transmisión.'
      },
      {
        name: 'Fricciones de interoperabilidad o fragmentación regulatoria digital',
        category: 'Regulatorio',
        probabilityPct: 32,
        impactOnGdpDeltaPct: -0.35,
        direction: 'Negativo',
        mitigationStrategy: 'Armonización con estándares de gobernanza responsable (OCDE / NIST).'
      }
    ];
  }
}
