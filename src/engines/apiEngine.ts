export interface ApiEndpointDoc {
  method: 'GET' | 'POST';
  path: string;
  version: 'v1' | 'v2';
  description: string;
  authRequired: boolean;
  requiredTier: 'FREE' | 'PRO' | 'PRO_MAX' | 'ENTERPRISE';
  sampleRequestBody?: any;
  sampleResponse?: any;
}

export class ApiEngine {
  private static apiKey: string = 'flg_live_99a84b3e02f1889c09d_prod';

  public static getApiKey(): string {
    return this.apiKey;
  }

  public static setApiKey(key: string): void {
    this.apiKey = key;
  }

  public static getEndpointsCatalog(): ApiEndpointDoc[] {
    return [
      {
        method: 'GET',
        path: '/api/v1/health',
        version: 'v1',
        description: 'Verifica la disponibilidad del servicio, la versión y la latencia.',
        authRequired: false,
        requiredTier: 'FREE',
        sampleResponse: {
          status: 'ok',
          service: 'FULGOR IA ANALICER ECONOMIC API',
          version: '1.0.0-PRO',
          timestamp: '2026-08-15T00:00:00.000Z'
        }
      },
      {
        method: 'GET',
        path: '/api/v1/indicators',
        version: 'v1',
        description: 'Obtiene el listado completo de indicadores macroeconómicos con ficha de trazabilidad ISO.',
        authRequired: true,
        requiredTier: 'FREE',
        sampleResponse: {
          count: 12,
          indicators: [
            { code: 'MX_GDP_Q', name: 'PIB Trimestral México', currentValue: 2.1, unit: '% YoY', epistemicType: 'OBSERVED_DATA' }
          ]
        }
      },
      {
        method: 'GET',
        path: '/api/v1/countries',
        version: 'v1',
        description: 'Perfiles macroeconómicos de países y puntuaciones del índice FAII.',
        authRequired: true,
        requiredTier: 'FREE',
        sampleResponse: {
          countries: [{ id: 'MX', name: 'México', faiiIndexScore: 68.4 }]
        }
      },
      {
        method: 'POST',
        path: '/api/v1/simulate',
        version: 'v1',
        description: 'Ejecuta el Gemelo Digital Económico con parámetros multivariables personalizados.',
        authRequired: true,
        requiredTier: 'PRO',
        sampleRequestBody: {
          countryCode: 'MX',
          aiAdoptionDelta: 25,
          rdIncentivePercentage: 15,
          automationCapitalElasticity: 0.35,
          laborUpskillingSpeed: 3
        },
        sampleResponse: {
          scenarioName: 'Simulación Digital Twin (+25% Adopción IA)',
          gdpExtraGrowthCumulative: 1.85,
          uncertaintyScore: 38
        }
      },
      {
        method: 'POST',
        path: '/api/v1/causal',
        version: 'v1',
        description: 'Calcula estimaciones econométricas Difference-in-Differences y pruebas de robustez.',
        authRequired: true,
        requiredTier: 'PRO',
        sampleRequestBody: {
          preTreatmentDiff: 0.2,
          postTreatmentDiff: 21.6,
          standardError: 2.76
        },
        sampleResponse: {
          treatmentEffect: 21.4,
          tStatistic: 7.75,
          pValue: 0.001,
          isStatisticallySignificant: true
        }
      },
      {
        method: 'GET',
        path: '/api/v1/alerts',
        version: 'v1',
        description: 'Sistema de alertas tempranas y anomalías estadísticas detectadas (Z-score > 2.0).',
        authRequired: true,
        requiredTier: 'PRO_MAX',
        sampleResponse: {
          activeAlertsCount: 4,
          alerts: [{ id: 'ALT-01', severity: 'HIGH', impactArea: 'Inflación' }]
        }
      },
      {
        method: 'GET',
        path: '/api/v2/preview',
        version: 'v2',
        description: 'Contrato de arquitectura v2 para streaming de microestructuras de alta frecuencia (En desarrollo).',
        authRequired: true,
        requiredTier: 'ENTERPRISE',
        sampleResponse: {
          status: 'contract_draft_ready',
          nextGenStream: true
        }
      }
    ];
  }
}
