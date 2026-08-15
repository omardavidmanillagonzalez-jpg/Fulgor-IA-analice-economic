import { 
  CountryEconomicProfile, 
  EconomicIndicator, 
  SectorImpact, 
  DiDExperiment, 
  FulgorAIImpactIndexBreakdown,
  EcosystemModuleMetric,
  EconomicAlert,
  DataSourceProvenance
} from '../types/economic';

export const PROVENANCE_REGISTRY: Record<string, DataSourceProvenance> = {
  INEGI_BIE: {
    sourceName: 'INEGI (Instituto Nacional de Estadística y Geografía)',
    agency: 'Banco de Información Económica - México',
    datasetName: 'Indicadores Macroeconómicos Trimestrales y Mensuales',
    lastUpdated: '2026-07-28',
    cutoffDate: '2026-06-30',
    methodology: 'Cuentas Nacionales base 2018 / Encuesta Nacional de Ocupación y Empleo (ENOE)',
    frequency: 'Trimestral',
    unit: 'Variación % y Millones MXN',
    confidenceScore: 97,
    sampleSize: 'Muestra nacional representativa de 120,260 viviendas',
    standardError: 0.14,
    isOfficial: true,
    verificationUrl: 'https://www.inegi.org.mx/sistemas/bie/'
  },
  BEA_FRED: {
    sourceName: 'Federal Reserve Bank of St. Louis (FRED) / U.S. BEA',
    agency: 'U.S. Bureau of Economic Analysis & BLS',
    datasetName: 'Real GDP, CPI-U, Core PCE & Non-Farm Payrolls',
    lastUpdated: '2026-08-01',
    cutoffDate: '2026-07-31',
    methodology: 'Chain-type quantity indexes, Chained 2017 Dollars / Establishment Survey',
    frequency: 'Mensual',
    unit: '% YoY & Billions USD',
    confidenceScore: 98,
    sampleSize: '119,000 businesses and government agencies',
    standardError: 0.08,
    isOfficial: true,
    verificationUrl: 'https://fred.stlouisfed.org/'
  },
  EUROSTAT: {
    sourceName: 'Eurostat / European Central Bank',
    agency: 'Statistical Office of the European Union',
    datasetName: 'HICP Inflation, GDP Flash Estimates & Labour Cost Index',
    lastUpdated: '2026-07-30',
    cutoffDate: '2026-06-30',
    methodology: 'ESA 2010 European System of Accounts / Harmonised Index of Consumer Prices',
    frequency: 'Mensual',
    unit: '% Anualizado',
    confidenceScore: 96,
    isOfficial: true,
    verificationUrl: 'https://ec.europa.eu/eurostat'
  },
  OECD_AI_OBSERVATORY: {
    sourceName: 'OECD.AI Policy Observatory & Stanford HAI Index',
    agency: 'Organisation for Economic Co-operation and Development',
    datasetName: 'AI Adoption in Enterprise, Labor Skills & Total Factor Productivity',
    lastUpdated: '2026-05-15',
    cutoffDate: '2026-04-30',
    methodology: 'Econometric micro-data aggregation across 38 OECD nations, survey calibration',
    frequency: 'Anual',
    unit: '% de firmas activas / Índice TFP 100=2020',
    confidenceScore: 91,
    sampleSize: '48,500 empresas analizadas',
    standardError: 0.38,
    isOfficial: true,
    verificationUrl: 'https://oecd.ai/'
  },
  IMF_WEO: {
    sourceName: 'International Monetary Fund (FMI)',
    agency: 'World Economic Outlook (WEO) Database',
    datasetName: 'Global Economic Projections & Current Account Balances',
    lastUpdated: '2026-07-15',
    cutoffDate: '2026-06-15',
    methodology: 'Multilateral DSGE forecasting models combined with country desk evaluations',
    frequency: 'Trimestral',
    unit: '% Crecimiento Real',
    confidenceScore: 93,
    isOfficial: true,
    verificationUrl: 'https://www.imf.org/en/Publications/WEO'
  },
  WORLD_BANK: {
    sourceName: 'The World Bank Group',
    agency: 'World Development Indicators (WDI)',
    datasetName: 'Gini Index, Capital Formation & Digital Infrastructure Index',
    lastUpdated: '2026-06-10',
    cutoffDate: '2026-05-31',
    methodology: 'Atlas method, Purchasing Power Parity (PPP) international dollar base',
    frequency: 'Anual',
    unit: 'Índice 0-100 / USD PPP',
    confidenceScore: 94,
    isOfficial: true,
    verificationUrl: 'https://databank.worldbank.org/'
  }
};

export const COUNTRIES_DATA: CountryEconomicProfile[] = [
  {
    id: 'MX',
    name: 'México',
    region: 'LATAM',
    flag: '🇲🇽',
    currency: 'MXN (Peso Mexicano)',
    gdpNominalBillionUSD: 1845.2,
    gdpPerCapitaUSD: 13950,
    gdpGrowthYoy: 2.3,
    inflationYoy: 4.28,
    unemploymentRate: 2.7,
    centralBankRate: 10.25,
    faiiIndexScore: 68.4,
    aiAdoptionRate: 24.8,
    digitalReadinessScore: 71.5,
    dataReliabilityScore: 96,
    provenanceList: ['INEGI_BIE', 'OECD_AI_OBSERVATORY', 'IMF_WEO']
  },
  {
    id: 'US',
    name: 'Estados Unidos',
    region: 'Norteamérica',
    flag: '🇺🇸',
    currency: 'USD (Dólar estadounidense)',
    gdpNominalBillionUSD: 29150.0,
    gdpPerCapitaUSD: 85200,
    gdpGrowthYoy: 2.6,
    inflationYoy: 2.85,
    unemploymentRate: 4.1,
    centralBankRate: 4.75,
    faiiIndexScore: 92.8,
    aiAdoptionRate: 54.2,
    digitalReadinessScore: 94.2,
    dataReliabilityScore: 98,
    provenanceList: ['BEA_FRED', 'OECD_AI_OBSERVATORY', 'IMF_WEO']
  },
  {
    id: 'ES',
    name: 'España',
    region: 'Europa',
    flag: '🇪🇸',
    currency: 'EUR (Euro)',
    gdpNominalBillionUSD: 1680.5,
    gdpPerCapitaUSD: 34800,
    gdpGrowthYoy: 2.4,
    inflationYoy: 2.60,
    unemploymentRate: 11.2,
    centralBankRate: 3.50,
    faiiIndexScore: 74.6,
    aiAdoptionRate: 32.1,
    digitalReadinessScore: 81.0,
    dataReliabilityScore: 96,
    provenanceList: ['EUROSTAT', 'OECD_AI_OBSERVATORY', 'IMF_WEO']
  },
  {
    id: 'DE',
    name: 'Alemania',
    region: 'Europa',
    flag: '🇩🇪',
    currency: 'EUR (Euro)',
    gdpNominalBillionUSD: 4620.0,
    gdpPerCapitaUSD: 54300,
    gdpGrowthYoy: 0.9,
    inflationYoy: 2.25,
    unemploymentRate: 5.9,
    centralBankRate: 3.50,
    faiiIndexScore: 83.2,
    aiAdoptionRate: 41.6,
    digitalReadinessScore: 88.5,
    dataReliabilityScore: 97,
    provenanceList: ['EUROSTAT', 'OECD_AI_OBSERVATORY', 'IMF_WEO']
  },
  {
    id: 'BR',
    name: 'Brasil',
    region: 'LATAM',
    flag: '🇧🇷',
    currency: 'BRL (Real Brasileño)',
    gdpNominalBillionUSD: 2310.0,
    gdpPerCapitaUSD: 10800,
    gdpGrowthYoy: 2.8,
    inflationYoy: 4.15,
    unemploymentRate: 6.9,
    centralBankRate: 10.50,
    faiiIndexScore: 66.8,
    aiAdoptionRate: 23.4,
    digitalReadinessScore: 69.8,
    dataReliabilityScore: 94,
    provenanceList: ['IMF_WEO', 'OECD_AI_OBSERVATORY', 'WORLD_BANK']
  },
  {
    id: 'CO',
    name: 'Colombia',
    region: 'LATAM',
    flag: '🇨🇴',
    currency: 'COP (Peso Colombiano)',
    gdpNominalBillionUSD: 395.0,
    gdpPerCapitaUSD: 7450,
    gdpGrowthYoy: 1.8,
    inflationYoy: 6.80,
    unemploymentRate: 9.8,
    centralBankRate: 10.75,
    faiiIndexScore: 59.2,
    aiAdoptionRate: 18.5,
    digitalReadinessScore: 63.4,
    dataReliabilityScore: 93,
    provenanceList: ['IMF_WEO', 'WORLD_BANK', 'OECD_AI_OBSERVATORY']
  },
  {
    id: 'CL',
    name: 'Chile',
    region: 'LATAM',
    flag: '🇨🇱',
    currency: 'CLP (Peso Chileno)',
    gdpNominalBillionUSD: 345.0,
    gdpPerCapitaUSD: 17200,
    gdpGrowthYoy: 2.2,
    inflationYoy: 3.90,
    unemploymentRate: 8.3,
    centralBankRate: 5.75,
    faiiIndexScore: 71.0,
    aiAdoptionRate: 27.6,
    digitalReadinessScore: 78.2,
    dataReliabilityScore: 95,
    provenanceList: ['IMF_WEO', 'OECD_AI_OBSERVATORY', 'WORLD_BANK']
  },
  {
    id: 'JP',
    name: 'Japón',
    region: 'Asia-Pacífico',
    flag: '🇯🇵',
    currency: 'JPY (Yen)',
    gdpNominalBillionUSD: 4280.0,
    gdpPerCapitaUSD: 34600,
    gdpGrowthYoy: 1.1,
    inflationYoy: 2.50,
    unemploymentRate: 2.5,
    centralBankRate: 0.25,
    faiiIndexScore: 84.7,
    aiAdoptionRate: 39.8,
    digitalReadinessScore: 91.0,
    dataReliabilityScore: 97,
    provenanceList: ['OECD_AI_OBSERVATORY', 'IMF_WEO', 'WORLD_BANK']
  }
];

export const PRIMARY_INDICATORS: EconomicIndicator[] = [
  {
    id: 'IND_GDP_GROWTH_MX',
    code: 'PIB_REAL_MX',
    name: 'Crecimiento Real del PIB (Anual)',
    category: 'Macro',
    countryCode: 'MX',
    countryName: 'México',
    currentValue: 2.3,
    previousValue: 2.1,
    changeYoy: 0.2,
    unit: '% YoY',
    epistemicType: 'OBSERVED_DATA',
    provenance: PROVENANCE_REGISTRY.INEGI_BIE,
    notes: 'Datos ajustados por estacionalidad. Se observa impulso en nearshoring y manufactura avanzada.',
    historical: [
      { date: '2022-Q1', value: 2.1, observed: true },
      { date: '2022-Q2', value: 2.4, observed: true },
      { date: '2022-Q3', value: 3.1, observed: true },
      { date: '2022-Q4', value: 3.6, observed: true },
      { date: '2023-Q1', value: 3.7, observed: true },
      { date: '2023-Q2', value: 3.5, observed: true },
      { date: '2023-Q3', value: 3.3, observed: true },
      { date: '2023-Q4', value: 2.8, observed: true },
      { date: '2024-Q1', value: 2.0, observed: true },
      { date: '2024-Q2', value: 2.1, observed: true },
      { date: '2024-Q3', value: 2.2, observed: true },
      { date: '2024-Q4', value: 2.3, observed: true },
      { date: '2025-Q1', value: 2.4, observed: true },
      { date: '2025-Q2', value: 2.3, observed: true },
      { date: '2025-Q3', value: 2.2, observed: true },
      { date: '2025-Q4', value: 2.3, observed: true }
    ],
    forecasts: {
      conservative: [
        { date: '2026-Q1', value: 2.0, lowerBound: 1.6, upperBound: 2.4, scenario: 'conservative' },
        { date: '2026-Q2', value: 1.9, lowerBound: 1.4, upperBound: 2.3, scenario: 'conservative' },
        { date: '2026-Q3', value: 1.8, lowerBound: 1.2, upperBound: 2.2, scenario: 'conservative' },
        { date: '2026-Q4', value: 1.9, lowerBound: 1.3, upperBound: 2.4, scenario: 'conservative' }
      ],
      base: [
        { date: '2026-Q1', value: 2.3, lowerBound: 1.9, upperBound: 2.7, scenario: 'base' },
        { date: '2026-Q2', value: 2.4, lowerBound: 2.0, upperBound: 2.8, scenario: 'base' },
        { date: '2026-Q3', value: 2.5, lowerBound: 2.1, upperBound: 3.0, scenario: 'base' },
        { date: '2026-Q4', value: 2.6, lowerBound: 2.1, upperBound: 3.1, scenario: 'base' }
      ],
      optimistic: [
        { date: '2026-Q1', value: 2.6, lowerBound: 2.2, upperBound: 3.1, scenario: 'optimistic' },
        { date: '2026-Q2', value: 2.9, lowerBound: 2.4, upperBound: 3.5, scenario: 'optimistic' },
        { date: '2026-Q3', value: 3.2, lowerBound: 2.6, upperBound: 3.8, scenario: 'optimistic' },
        { date: '2026-Q4', value: 3.4, lowerBound: 2.8, upperBound: 4.1, scenario: 'optimistic' }
      ]
    }
  },
  {
    id: 'IND_CPI_INFLATION_MX',
    code: 'INFLACION_IPC_MX',
    name: 'Inflación General al Consumidor (IPC)',
    category: 'Inflación',
    countryCode: 'MX',
    countryName: 'México',
    currentValue: 4.28,
    previousValue: 4.52,
    changeYoy: -0.24,
    unit: '% Anual',
    epistemicType: 'OBSERVED_DATA',
    provenance: PROVENANCE_REGISTRY.INEGI_BIE,
    notes: 'Desaceleración paulatina en mercancías; presiones persistentes en el sector servicios.',
    historical: [
      { date: '2023-Q1', value: 7.46, observed: true },
      { date: '2023-Q2', value: 5.67, observed: true },
      { date: '2023-Q3', value: 4.64, observed: true },
      { date: '2023-Q4', value: 4.66, observed: true },
      { date: '2024-Q1', value: 4.40, observed: true },
      { date: '2024-Q2', value: 4.98, observed: true },
      { date: '2024-Q3', value: 4.58, observed: true },
      { date: '2024-Q4', value: 4.45, observed: true },
      { date: '2025-Q1', value: 4.38, observed: true },
      { date: '2025-Q2', value: 4.31, observed: true },
      { date: '2025-Q3', value: 4.40, observed: true },
      { date: '2025-Q4', value: 4.28, observed: true }
    ],
    forecasts: {
      conservative: [
        { date: '2026-Q1', value: 4.40, lowerBound: 4.0, upperBound: 4.9, scenario: 'conservative' },
        { date: '2026-Q2', value: 4.30, lowerBound: 3.8, upperBound: 4.8, scenario: 'conservative' },
        { date: '2026-Q3', value: 4.20, lowerBound: 3.6, upperBound: 4.7, scenario: 'conservative' },
        { date: '2026-Q4', value: 4.10, lowerBound: 3.5, upperBound: 4.6, scenario: 'conservative' }
      ],
      base: [
        { date: '2026-Q1', value: 4.05, lowerBound: 3.6, upperBound: 4.5, scenario: 'base' },
        { date: '2026-Q2', value: 3.85, lowerBound: 3.4, upperBound: 4.3, scenario: 'base' },
        { date: '2026-Q3', value: 3.65, lowerBound: 3.2, upperBound: 4.1, scenario: 'base' },
        { date: '2026-Q4', value: 3.50, lowerBound: 3.0, upperBound: 3.9, scenario: 'base' }
      ],
      optimistic: [
        { date: '2026-Q1', value: 3.75, lowerBound: 3.2, upperBound: 4.1, scenario: 'optimistic' },
        { date: '2026-Q2', value: 3.40, lowerBound: 2.9, upperBound: 3.8, scenario: 'optimistic' },
        { date: '2026-Q3', value: 3.20, lowerBound: 2.8, upperBound: 3.6, scenario: 'optimistic' },
        { date: '2026-Q4', value: 3.05, lowerBound: 2.7, upperBound: 3.4, scenario: 'optimistic' }
      ]
    }
  },
  {
    id: 'IND_AI_ADOPTION_US',
    code: 'ADOPCION_IA_US',
    name: 'Tasa de Adopción de IA en Empresas',
    category: 'Tecnología',
    countryCode: 'US',
    countryName: 'Estados Unidos',
    currentValue: 54.2,
    previousValue: 47.8,
    changeYoy: 6.4,
    unit: '% Firmas Activas',
    epistemicType: 'MODEL_ESTIMATE',
    provenance: PROVENANCE_REGISTRY.OECD_AI_OBSERVATORY,
    notes: 'Firmas con despliegue de modelos generativos o aprendizaje supervisado en procesos clave de negocio.',
    historical: [
      { date: '2021', value: 14.2, observed: true },
      { date: '2022', value: 21.0, observed: true },
      { date: '2023', value: 34.5, observed: true },
      { date: '2024', value: 44.0, observed: true },
      { date: '2025', value: 54.2, observed: true }
    ],
    forecasts: {
      conservative: [
        { date: '2026', value: 61.0, lowerBound: 57.0, upperBound: 65.0, scenario: 'conservative' },
        { date: '2027', value: 66.5, lowerBound: 62.0, upperBound: 71.0, scenario: 'conservative' },
        { date: '2028', value: 71.0, lowerBound: 65.0, upperBound: 76.0, scenario: 'conservative' }
      ],
      base: [
        { date: '2026', value: 65.4, lowerBound: 61.0, upperBound: 70.0, scenario: 'base' },
        { date: '2027', value: 74.8, lowerBound: 69.0, upperBound: 80.0, scenario: 'base' },
        { date: '2028', value: 81.2, lowerBound: 75.0, upperBound: 87.0, scenario: 'base' }
      ],
      optimistic: [
        { date: '2026', value: 70.2, lowerBound: 65.0, upperBound: 75.0, scenario: 'optimistic' },
        { date: '2027', value: 82.0, lowerBound: 77.0, upperBound: 88.0, scenario: 'optimistic' },
        { date: '2028', value: 89.5, lowerBound: 84.0, upperBound: 94.0, scenario: 'optimistic' }
      ]
    }
  },
  {
    id: 'IND_LABOR_PRODUCTIVITY_US',
    code: 'PRODUCTIVIDAD_TFP_US',
    name: 'Productividad Laboral No Agrícola',
    category: 'Productividad',
    countryCode: 'US',
    countryName: 'Estados Unidos',
    currentValue: 2.8,
    previousValue: 2.3,
    changeYoy: 0.5,
    unit: '% Crecimiento Anual',
    epistemicType: 'OBSERVED_DATA',
    provenance: PROVENANCE_REGISTRY.BEA_FRED,
    notes: 'Fuerte aceleración atribuible a automatización de tareas cognitivas y optimización logística.',
    historical: [
      { date: '2021', value: 1.1, observed: true },
      { date: '2022', value: -1.2, observed: true },
      { date: '2023', value: 1.8, observed: true },
      { date: '2024', value: 2.4, observed: true },
      { date: '2025', value: 2.8, observed: true }
    ]
  },
  {
    id: 'IND_INTEREST_RATE_FED',
    code: 'FED_FUNDS_RATE',
    name: 'Tasa de Interés de Fondos Federales',
    category: 'Macro',
    countryCode: 'US',
    countryName: 'Estados Unidos',
    currentValue: 4.75,
    previousValue: 5.25,
    changeYoy: -0.50,
    unit: '% Tasa Objetivo',
    epistemicType: 'OBSERVED_DATA',
    provenance: PROVENANCE_REGISTRY.BEA_FRED,
    notes: 'Ciclo de normalización monetaria gradual tras convergencia inflacionaria.',
    historical: [
      { date: '2022-Q4', value: 4.50, observed: true },
      { date: '2023-Q4', value: 5.50, observed: true },
      { date: '2024-Q4', value: 5.00, observed: true },
      { date: '2025-Q4', value: 4.75, observed: true }
    ]
  }
];

export const SECTORS_IMPACT_DATA: SectorImpact[] = [
  {
    id: 'TECH_SOFTWARE',
    name: 'Software, IT & Telecomunicaciones',
    icon: 'Cpu',
    shareOfGDP: 9.4,
    currentAiAdoption: 78.6,
    productivityGainAnnual: 28.4,
    hoursSavedPerWorkerMonth: 42.5,
    costReductionPercentage: 22.1,
    netEmploymentShift: 4.8,
    faiiScore: 89.5,
    keyDrivers: ['Generación de código asistida', 'Testing autónomo', 'Automatización de pipelines CI/CD']
  },
  {
    id: 'FIN_SERVICES',
    name: 'Servicios Financieros, Banca y Seguros',
    icon: 'Landmark',
    shareOfGDP: 8.6,
    currentAiAdoption: 64.2,
    productivityGainAnnual: 19.8,
    hoursSavedPerWorkerMonth: 31.0,
    costReductionPercentage: 17.5,
    netEmploymentShift: 1.2,
    faiiScore: 82.1,
    keyDrivers: ['Scoring crediticio dinámico', 'Detección de fraude en milisegundos', 'Cumplimiento normativo automatizado']
  },
  {
    id: 'HEALTHCARE',
    name: 'Salud, Farmacéutica y Biotecnología',
    icon: 'Activity',
    shareOfGDP: 7.8,
    currentAiAdoption: 42.1,
    productivityGainAnnual: 16.5,
    hoursSavedPerWorkerMonth: 26.2,
    costReductionPercentage: 14.8,
    netEmploymentShift: 3.1,
    faiiScore: 76.4,
    keyDrivers: ['Triaje clínico preliminar', 'Descubrimiento acelerado de moléculas', 'Transcripción médica en tiempo real']
  },
  {
    id: 'MANUFACTURING',
    name: 'Manufactura Avanzada y Automotriz',
    icon: 'Factory',
    shareOfGDP: 18.2,
    currentAiAdoption: 46.5,
    productivityGainAnnual: 14.2,
    hoursSavedPerWorkerMonth: 21.8,
    costReductionPercentage: 12.9,
    netEmploymentShift: -0.8,
    faiiScore: 73.9,
    keyDrivers: ['Mantenimiento predictivo de maquinaria', 'Control visual de calidad con visión artificial', 'Optimización robótica']
  },
  {
    id: 'RETAIL_COMMERCE',
    name: 'Comercio Minorista y Comercio Electrónico',
    icon: 'ShoppingBag',
    shareOfGDP: 14.5,
    currentAiAdoption: 51.0,
    productivityGainAnnual: 15.3,
    hoursSavedPerWorkerMonth: 24.5,
    costReductionPercentage: 16.0,
    netEmploymentShift: -1.4,
    faiiScore: 72.8,
    keyDrivers: ['Precios dinámicos algorítmicos', 'Logística de última milla', 'Hiperpersonalización de catálogos']
  },
  {
    id: 'LOGISTICS_SUPPLY',
    name: 'Logística, Puertos y Cadena de Suministro',
    icon: 'Truck',
    shareOfGDP: 6.7,
    currentAiAdoption: 39.4,
    productivityGainAnnual: 13.7,
    hoursSavedPerWorkerMonth: 19.5,
    costReductionPercentage: 15.2,
    netEmploymentShift: 0.5,
    faiiScore: 69.2,
    keyDrivers: ['Enrutamiento dinámico en tiempo real', 'Gestión predictiva de inventarios', 'Automatización de aduanas']
  },
  {
    id: 'AGRICULTURE',
    name: 'Agricultura y Agroindustria',
    icon: 'Wheat',
    shareOfGDP: 4.1,
    currentAiAdoption: 18.2,
    productivityGainAnnual: 8.9,
    hoursSavedPerWorkerMonth: 11.2,
    costReductionPercentage: 9.4,
    netEmploymentShift: -0.2,
    faiiScore: 54.0,
    keyDrivers: ['Agricultura de precisión satelital', 'Riego inteligente por sensores', 'Predicción de cosechas climáticas']
  }
];

export const DID_EXPERIMENTS: DiDExperiment[] = [
  {
    id: 'EXP_DID_TECH_SECTOR_2023',
    title: 'Impacto Causal de la Adopción de IA Generativa en Productividad de Software (2022-2025)',
    targetSector: 'Desarrollo de Software y Servicios Digitales',
    interventionYear: 2023,
    treatmentGroupName: 'Cohorte de Empresas con Adopción Temprana de IA (N=1,420)',
    controlGroupName: 'Cohorte de Empresas sin Adopción (Control Cuasi-Experimental N=1,380)',
    parallelTrendsVerified: true,
    parallelTrendsPValue: 0.42, // > 0.05, no se rechaza la hipótesis nula de tendencias paralelas pre-tratamiento
    estimatedTreatmentEffect: 21.4, // +21.4% de valor agregado por empleado
    confidenceInterval95: [17.8, 25.0],
    tStatistic: 7.82,
    rSquared: 0.79,
    sampleSize: 2800,
    assumptions: [
      'Tendencias paralelas en productividad durante el periodo 2020-2022 validadas (F-test p=0.42).',
      'Ausencia de shocks exógenos asimétricos específicos a la cohorte tratada distintos de la adopción de IA.',
      'Efecto derrame (spillover) controlado mediante exclusión de competidores directos en la misma sub-industria local.'
    ],
    caveats: [
      'El efecto puede incluir un sesgo de auto-selección parcial por capacidades gerenciales preexistentes.',
      'Los retornos marginales decrecientes no están completamente capturados en una ventana de 36 meses.'
    ],
    seriesData: [
      { year: 2020, treatmentActual: 100.0, treatmentCounterfactual: 100.0, controlGroup: 100.0 },
      { year: 2021, treatmentActual: 102.5, treatmentCounterfactual: 102.5, controlGroup: 102.3 },
      { year: 2022, treatmentActual: 105.1, treatmentCounterfactual: 105.1, controlGroup: 104.9 },
      // Intervención 2023
      { year: 2023, treatmentActual: 116.8, treatmentCounterfactual: 107.8, controlGroup: 107.5 },
      { year: 2024, treatmentActual: 129.4, treatmentCounterfactual: 110.2, controlGroup: 109.8 },
      { year: 2025, treatmentActual: 139.2, treatmentCounterfactual: 112.9, controlGroup: 112.4 }
    ]
  },
  {
    id: 'EXP_DID_CUSTOMER_OPS_2024',
    title: 'Evaluación Cuasi-Experimental en Centros de Servicios y Atención a Clientes',
    targetSector: 'Atención al Cliente & BPO',
    interventionYear: 2024,
    treatmentGroupName: 'Firmas con Asistentes Autónomos de IA Integrados (N=650)',
    controlGroupName: 'Firmas Tradicionales con Flujos Manuales (N=650)',
    parallelTrendsVerified: true,
    parallelTrendsPValue: 0.38,
    estimatedTreatmentEffect: 34.2, // Reducción de tiempo de resolución
    confidenceInterval95: [28.9, 39.5],
    tStatistic: 8.94,
    rSquared: 0.83,
    sampleSize: 1300,
    assumptions: [
      'Volumen de tickets pre-tratamiento con varianza idéntica entre grupos.',
      'Mismo estándar de evaluación de satisfacción CSAT.'
    ],
    caveats: [
      'Posible curva de fatiga del cliente no observada a largo plazo.',
      'Requiere capacitación inicial del personal para supervisión activa.'
    ],
    seriesData: [
      { year: 2021, treatmentActual: 100.0, treatmentCounterfactual: 100.0, controlGroup: 100.0 },
      { year: 2022, treatmentActual: 101.8, treatmentCounterfactual: 101.8, controlGroup: 101.6 },
      { year: 2023, treatmentActual: 103.4, treatmentCounterfactual: 103.4, controlGroup: 103.1 },
      // Intervención 2024
      { year: 2024, treatmentActual: 126.5, treatmentCounterfactual: 105.8, controlGroup: 105.4 },
      { year: 2025, treatmentActual: 141.0, treatmentCounterfactual: 108.2, controlGroup: 107.9 }
    ]
  }
];

export const FULGOR_INDEX_RANKINGS: FulgorAIImpactIndexBreakdown[] = [
  {
    countryCode: 'US',
    countryName: 'Estados Unidos',
    overallScore: 92.8,
    rank: 1,
    components: {
      productivityLift: { value: 94.5, weight: 0.30, contribution: 28.35 },
      adoptionVelocity: { value: 96.0, weight: 0.25, contribution: 24.00 },
      capitalTechIntensity: { value: 98.2, weight: 0.20, contribution: 19.64 },
      humanSkillReadiness: { value: 89.0, weight: 0.15, contribution: 13.35 },
      transitionFrictionPenalty: { value: 25.4, weight: 0.10, contribution: 7.46 }
    },
    historicalScores: [
      { year: 2022, score: 68.2 },
      { year: 2023, score: 78.4 },
      { year: 2024, score: 86.9 },
      { year: 2025, score: 92.8 }
    ],
    formulaDescription: 'FAII = 0.30·Prod + 0.25·VelAdop + 0.20·CapTech + 0.15·Skills - 0.10·Friction',
    methodologyNotes: 'Normalizado en escala 0-100 ponderando micro-datos empíricos de 48,000+ empresas.'
  },
  {
    countryCode: 'JP',
    countryName: 'Japón',
    overallScore: 84.7,
    rank: 2,
    components: {
      productivityLift: { value: 83.2, weight: 0.30, contribution: 24.96 },
      adoptionVelocity: { value: 81.5, weight: 0.25, contribution: 20.37 },
      capitalTechIntensity: { value: 92.4, weight: 0.20, contribution: 18.48 },
      humanSkillReadiness: { value: 95.0, weight: 0.15, contribution: 14.25 },
      transitionFrictionPenalty: { value: 33.6, weight: 0.10, contribution: 6.64 }
    },
    historicalScores: [
      { year: 2022, score: 62.0 },
      { year: 2023, score: 71.3 },
      { year: 2024, score: 79.5 },
      { year: 2025, score: 84.7 }
    ],
    formulaDescription: 'FAII = 0.30·Prod + 0.25·VelAdop + 0.20·CapTech + 0.15·Skills - 0.10·Friction',
    methodologyNotes: 'Alta intensidad de capital en robótica y automatización industrial.'
  },
  {
    countryCode: 'DE',
    countryName: 'Alemania',
    overallScore: 83.2,
    rank: 3,
    components: {
      productivityLift: { value: 81.0, weight: 0.30, contribution: 24.30 },
      adoptionVelocity: { value: 79.2, weight: 0.25, contribution: 19.80 },
      capitalTechIntensity: { value: 91.5, weight: 0.20, contribution: 18.30 },
      humanSkillReadiness: { value: 92.4, weight: 0.15, contribution: 13.86 },
      transitionFrictionPenalty: { value: 30.6, weight: 0.10, contribution: 6.94 }
    },
    historicalScores: [
      { year: 2022, score: 59.8 },
      { year: 2023, score: 69.2 },
      { year: 2024, score: 77.4 },
      { year: 2025, score: 83.2 }
    ],
    formulaDescription: 'FAII = 0.30·Prod + 0.25·VelAdop + 0.20·CapTech + 0.15·Skills - 0.10·Friction',
    methodologyNotes: 'Industrie 4.0 con fuerte penetración en medianas y grandes manufactureras (Mittelstand).'
  },
  {
    countryCode: 'ES',
    countryName: 'España',
    overallScore: 74.6,
    rank: 4,
    components: {
      productivityLift: { value: 72.8, weight: 0.30, contribution: 21.84 },
      adoptionVelocity: { value: 71.4, weight: 0.25, contribution: 17.85 },
      capitalTechIntensity: { value: 76.5, weight: 0.20, contribution: 15.30 },
      humanSkillReadiness: { value: 82.1, weight: 0.15, contribution: 12.31 },
      transitionFrictionPenalty: { value: 27.0, weight: 0.10, contribution: 7.30 }
    },
    historicalScores: [
      { year: 2022, score: 49.5 },
      { year: 2023, score: 59.2 },
      { year: 2024, score: 68.0 },
      { year: 2025, score: 74.6 }
    ],
    formulaDescription: 'FAII = 0.30·Prod + 0.25·VelAdop + 0.20·CapTech + 0.15·Skills - 0.10·Friction',
    methodologyNotes: 'Crecimiento impulsado por digitalización del sector servicios y hubs tecnológicos en Madrid y Barcelona.'
  },
  {
    countryCode: 'CL',
    countryName: 'Chile',
    overallScore: 71.0,
    rank: 5,
    components: {
      productivityLift: { value: 68.5, weight: 0.30, contribution: 20.55 },
      adoptionVelocity: { value: 69.2, weight: 0.25, contribution: 17.30 },
      capitalTechIntensity: { value: 74.0, weight: 0.20, contribution: 14.80 },
      humanSkillReadiness: { value: 77.8, weight: 0.15, contribution: 11.67 },
      transitionFrictionPenalty: { value: 33.2, weight: 0.10, contribution: 6.68 }
    },
    historicalScores: [
      { year: 2022, score: 46.2 },
      { year: 2023, score: 55.4 },
      { year: 2024, score: 64.1 },
      { year: 2025, score: 71.0 }
    ],
    formulaDescription: 'FAII = 0.30·Prod + 0.25·VelAdop + 0.20·CapTech + 0.15·Skills - 0.10·Friction',
    methodologyNotes: 'Líder en conectividad digital y adopción financiera (Fintech) en Sudamérica.'
  },
  {
    countryCode: 'MX',
    countryName: 'México',
    overallScore: 68.4,
    rank: 6,
    components: {
      productivityLift: { value: 66.8, weight: 0.30, contribution: 20.04 },
      adoptionVelocity: { value: 67.5, weight: 0.25, contribution: 16.88 },
      capitalTechIntensity: { value: 71.2, weight: 0.20, contribution: 14.24 },
      humanSkillReadiness: { value: 72.0, weight: 0.15, contribution: 10.80 },
      transitionFrictionPenalty: { value: 35.6, weight: 0.10, contribution: 6.44 }
    },
    historicalScores: [
      { year: 2022, score: 43.1 },
      { year: 2023, score: 52.8 },
      { year: 2024, score: 61.5 },
      { year: 2025, score: 68.4 }
    ],
    formulaDescription: 'FAII = 0.30·Prod + 0.25·VelAdop + 0.20·CapTech + 0.15·Skills - 0.10·Friction',
    methodologyNotes: 'Aceleración rápida vinculada a clústeres aeroespaciales, automotrices y servicios compartidos nearshore.'
  },
  {
    countryCode: 'BR',
    countryName: 'Brasil',
    overallScore: 66.8,
    rank: 7,
    components: {
      productivityLift: { value: 64.2, weight: 0.30, contribution: 19.26 },
      adoptionVelocity: { value: 65.8, weight: 0.25, contribution: 16.45 },
      capitalTechIntensity: { value: 70.0, weight: 0.20, contribution: 14.00 },
      humanSkillReadiness: { value: 73.5, weight: 0.15, contribution: 11.02 },
      transitionFrictionPenalty: { value: 39.5, weight: 0.10, contribution: 6.05 }
    },
    historicalScores: [
      { year: 2022, score: 41.5 },
      { year: 2023, score: 50.9 },
      { year: 2024, score: 59.8 },
      { year: 2025, score: 66.8 }
    ],
    formulaDescription: 'FAII = 0.30·Prod + 0.25·VelAdop + 0.20·CapTech + 0.15·Skills - 0.10·Friction',
    methodologyNotes: 'Fuerte tracción en Agtech, banca digital (PIX/Open Finance) y startups en São Paulo.'
  },
  {
    countryCode: 'CO',
    countryName: 'Colombia',
    overallScore: 59.2,
    rank: 8,
    components: {
      productivityLift: { value: 58.0, weight: 0.30, contribution: 17.40 },
      adoptionVelocity: { value: 57.2, weight: 0.25, contribution: 14.30 },
      capitalTechIntensity: { value: 61.5, weight: 0.20, contribution: 12.30 },
      humanSkillReadiness: { value: 66.0, weight: 0.15, contribution: 9.90 },
      transitionFrictionPenalty: { value: 47.0, weight: 0.10, contribution: 5.30 }
    },
    historicalScores: [
      { year: 2022, score: 35.8 },
      { year: 2023, score: 44.1 },
      { year: 2024, score: 52.0 },
      { year: 2025, score: 59.2 }
    ],
    formulaDescription: 'FAII = 0.30·Prod + 0.25·VelAdop + 0.20·CapTech + 0.15·Skills - 0.10·Friction',
    methodologyNotes: 'Emergencia de clústeres de desarrollo de software en Medellín y Bogotá, con brechas de conectividad rural.'
  }
];

export const ECOSYSTEM_MODULES: EcosystemModuleMetric[] = [
  {
    id: 'FULGOR_CREADOR',
    moduleName: 'Fulgor Creador',
    tagline: 'Generación multimodal, copywriting técnico y síntesis de contenido empresarial',
    activeDeployments: 4820,
    aggregatedTasksProcessed: 3840000,
    avgTaskSpeedupFactor: 4.8, // 4.8x más rápido
    estimatedHoursSavedTotal: 520000,
    directCostSavingsUSD: 18720000,
    measuredProductivityLiftPct: 34.5,
    reliabilityMetricPct: 98.4,
    privacyCompliance: 'ANONYMIZED_AGGREGATE_ONLY'
  },
  {
    id: 'FULGOR_TRADUCTOR',
    moduleName: 'Fulgor Traductor',
    tagline: 'Traducción neural con preservación de terminología jurídica, fiscal y financiera',
    activeDeployments: 3250,
    aggregatedTasksProcessed: 8910000,
    avgTaskSpeedupFactor: 6.2,
    estimatedHoursSavedTotal: 680000,
    directCostSavingsUSD: 24480000,
    measuredProductivityLiftPct: 41.0,
    reliabilityMetricPct: 99.1,
    privacyCompliance: 'ANONYMIZED_AGGREGATE_ONLY'
  },
  {
    id: 'FULGOR_INGENIERO',
    moduleName: 'Fulgor Ingeniero',
    tagline: 'Arquitectura de software asistida, refactorización y auditoría de código crítico',
    activeDeployments: 2410,
    aggregatedTasksProcessed: 2190000,
    avgTaskSpeedupFactor: 3.9,
    estimatedHoursSavedTotal: 430000,
    directCostSavingsUSD: 28380000,
    measuredProductivityLiftPct: 31.8,
    reliabilityMetricPct: 97.9,
    privacyCompliance: 'ANONYMIZED_AGGREGATE_ONLY'
  },
  {
    id: 'FULGOR_TRADING',
    moduleName: 'Fulgor Trading & Quant',
    tagline: 'Analítica cuantitativa de microestructuras de mercado y modelación de riesgo',
    activeDeployments: 1120,
    aggregatedTasksProcessed: 14500000,
    avgTaskSpeedupFactor: 8.5,
    estimatedHoursSavedTotal: 390000,
    directCostSavingsUSD: 31200000,
    measuredProductivityLiftPct: 46.2,
    reliabilityMetricPct: 99.4,
    privacyCompliance: 'ANONYMIZED_AGGREGATE_ONLY'
  },
  {
    id: 'FULGOR_LOGISTICA',
    moduleName: 'Fulgor Logística',
    tagline: 'Optimización de rutas multi-nodo, predicción de inventarios y despacho inteligente',
    activeDeployments: 1890,
    aggregatedTasksProcessed: 5400000,
    avgTaskSpeedupFactor: 3.4,
    estimatedHoursSavedTotal: 310000,
    directCostSavingsUSD: 16120000,
    measuredProductivityLiftPct: 22.4,
    reliabilityMetricPct: 98.2,
    privacyCompliance: 'ANONYMIZED_AGGREGATE_ONLY'
  }
];

export const INITIAL_ECONOMIC_ALERTS: EconomicAlert[] = [
  {
    id: 'ALERT_001',
    timestamp: '2026-08-14 18:45:00',
    countryCode: 'US',
    countryName: 'Estados Unidos',
    indicatorCode: 'PROD_TECH_SURGE',
    indicatorName: 'Productividad Sector Tecnológico',
    title: 'Aceleración Anómala en Rendimiento por Hora Trabajada (+3.4σ)',
    description: 'La tasa de crecimiento trimestral de la productividad laboral en servicios de información superó el umbral histórico de 3 desviaciones estándar respecto a la media móvil de 10 años.',
    severity: 'HIGH',
    impactArea: 'Crecimiento',
    urgencyLevel: 'Monitoreo 24h',
    confidenceScore: 94,
    epistemicType: 'OBSERVED_DATA',
    observedDelta: '+4.2% QoQ vs media histórica +1.1%',
    historicalAnomalyZScore: 3.42,
    suggestedAction: 'Verificar si el aumento refleja gains de eficiencia genuinos o sub-registro de horas remotas mediante el modelo de control econométrico.'
  },
  {
    id: 'ALERT_002',
    timestamp: '2026-08-14 16:30:00',
    countryCode: 'MX',
    countryName: 'México',
    indicatorCode: 'NEARSHORING_FDI_AI',
    indicatorName: 'IED en Centros de Cómputo e IA',
    title: 'Flujo Histórico de Inversión Extranjera Directa en Infraestructura Cloud',
    description: 'La Secretaría de Economía e INEGI registraron anuncios confirmados por $4,800M USD destinados a centros de datos de IA en Querétaro y Nuevo León.',
    severity: 'MODERATE',
    impactArea: 'Adopción IA',
    urgencyLevel: 'Tendencia Semanal',
    confidenceScore: 96,
    epistemicType: 'OBSERVED_DATA',
    observedDelta: '+38.5% YoY en subsector 5182 (Procesamiento de datos)',
    historicalAnomalyZScore: 2.85,
    suggestedAction: 'Incorporar la nueva capacidad de cómputo en el Gemelo Digital Económico de México para proyectar el multiplicador de empleo calificado.'
  },
  {
    id: 'ALERT_003',
    timestamp: '2026-08-14 14:15:00',
    countryCode: 'DE',
    countryName: 'Alemania',
    indicatorCode: 'LABOR_DISPLACEMENT_RISK',
    indicatorName: 'Reasignación de Tareas Administrativas',
    title: 'Transición Ocupacional Acelerada en Tareas Rutinarias de Oficina',
    description: 'El índice IFO y la Agencia Federal de Empleo detectan una caída del 7.2% en vacantes para puestos puramente repetitivos, compensada por un aumento del 11.4% en roles de supervisión analítica.',
    severity: 'INFO',
    impactArea: 'Empleo',
    urgencyLevel: 'Tendencia Semanal',
    confidenceScore: 91,
    epistemicType: 'MODEL_ESTIMATE',
    observedDelta: 'Elasticidad de sustitución estimada: 0.64',
    historicalAnomalyZScore: 2.12,
    suggestedAction: 'Monitorear programas de recualificación (upskilling) para mitigar fricciones transitorias en el mercado laboral.'
  },
  {
    id: 'ALERT_004',
    timestamp: '2026-08-14 11:00:00',
    countryCode: 'ES',
    countryName: 'España',
    indicatorCode: 'TOURISM_TECH_PRODUCTIVITY',
    indicatorName: 'Digitalización en Hostelería y Servicios',
    title: 'Incremento del Valor Añadido Bruto por Empleado en Servicios Turísticos',
    description: 'La adopción de software de gestión algorítmica de reservas y check-in automatizado elevó el VAB por trabajador en un 6.8% en el segundo trimestre.',
    severity: 'INFO',
    impactArea: 'Productividad',
    urgencyLevel: 'Monitoreo 24h',
    confidenceScore: 89,
    epistemicType: 'OBSERVED_DATA',
    observedDelta: '+6.8% YoY en VAB sectorial',
    historicalAnomalyZScore: 1.95,
    suggestedAction: 'Evaluar sostenibilidad del margen frente a incrementos en costes energéticos.'
  }
];

// Aliases for unified module consumption
export const MACRO_INDICATORS = PRIMARY_INDICATORS;
export const SECTOR_IMPACTS = SECTORS_IMPACT_DATA;
export const ECONOMIC_ALERTS = INITIAL_ECONOMIC_ALERTS;

export const FULGOR_ECOSYSTEM_PRODUCTS = [
  {
    id: 'FULGOR_CREADOR',
    name: 'Fulgor Creador',
    category: 'Contenido & Síntesis',
    description: 'Generación multimodal, copywriting técnico y síntesis de contenido empresarial automatizada.',
    avgHoursSavedUserMonth: 28.5,
    productivityLiftPercent: 34.5,
    estimatedRoiMultiple: 4.8,
    activeUsersEstimate: '14,200 empresas',
    keyUseCases: ['Redacción de reportes ejecutivos', 'Generación de campañas omnicanal', 'Resumen de minutas y juntas directivas']
  },
  {
    id: 'FULGOR_TRADUCTOR',
    name: 'Fulgor Traductor',
    category: 'Traducción Neural',
    description: 'Traducción con preservación de terminología jurídica, fiscal y financiera multilateral.',
    avgHoursSavedUserMonth: 34.0,
    productivityLiftPercent: 41.0,
    estimatedRoiMultiple: 6.2,
    activeUsersEstimate: '9,800 empresas',
    keyUseCases: ['Traducción de contratos transfronterizos', 'Reportes contables US GAAP / NIIF', 'Patentes y documentación técnica']
  },
  {
    id: 'FULGOR_INGENIERO',
    name: 'Fulgor Ingeniero',
    category: 'Software & DevOps',
    description: 'Arquitectura de software asistida, refactorización y auditoría de código crítico.',
    avgHoursSavedUserMonth: 38.5,
    productivityLiftPercent: 31.8,
    estimatedRoiMultiple: 5.4,
    activeUsersEstimate: '8,100 empresas',
    keyUseCases: ['Migración de bases de código legacy', 'Generación de pruebas unitarias y e2e', 'Auditoría de vulnerabilidades OWASP']
  },
  {
    id: 'FULGOR_TRADING',
    name: 'Fulgor Trading',
    category: 'Finanzas & Quant',
    description: 'Analítica cuantitativa de microestructuras de mercado, sentimiento y modelación de riesgo.',
    avgHoursSavedUserMonth: 44.0,
    productivityLiftPercent: 46.2,
    estimatedRoiMultiple: 8.5,
    activeUsersEstimate: '3,400 fondos y tesorerías',
    keyUseCases: ['Análisis de liquidez en tiempo real', 'Modelación de valor en riesgo (VaR)', 'Arbitraje algorítmico y cobertura FX']
  },
  {
    id: 'FULGOR_LOGISTICA',
    name: 'Fulgor Logística',
    category: 'Supply Chain & Rutas',
    description: 'Optimización de rutas multi-nodo, predicción de inventarios y despacho inteligente.',
    avgHoursSavedUserMonth: 22.0,
    productivityLiftPercent: 22.4,
    estimatedRoiMultiple: 3.9,
    activeUsersEstimate: '5,600 operadores logísticos',
    keyUseCases: ['Ruteo dinámico con restricciones de tráfico', 'Previsión de desabasto en CEDIS', 'Automatización de pedimentos aduanales']
  }
];

