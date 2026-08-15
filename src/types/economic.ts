export type EpistemicType = 
  | 'OBSERVED_DATA'    // Dato factual observado y verificado
  | 'CORRELATION'      // Correlación estadística (r, p-value)
  | 'MODEL_ESTIMATE'   // Estimación econométrica (Beta, R2)
  | 'CAUSAL_INFERENCE' // Posible inferencia causal (DiD, Control Sintético, IV)
  | 'PROJECTION';      // Pronóstico probabilístico con supuestos

export type EpistemicCategory = EpistemicType;

export type ReliabilityLevel = 'HIGH' | 'MEDIUM' | 'PROVISIONAL' | 'EXPERIMENTAL';

export interface DataSourceProvenance {
  sourceName: string;
  agency: string;
  datasetName: string;
  lastUpdated: string;
  cutoffDate: string;
  methodology: string;
  frequency: 'Mensual' | 'Trimestral' | 'Anual' | 'Diaria' | 'Tiempo Real Estimado';
  unit: string;
  confidenceScore: number; // 0 - 100%
  sampleSize?: string;
  standardError?: number;
  verificationUrl?: string;
  isOfficial: boolean;
}

export interface IndicatorDataPoint {
  date: string;
  value: number;
  observed?: boolean;
  lowerBound?: number;
  upperBound?: number;
  scenario?: 'conservative' | 'base' | 'optimistic';
}

export interface EconomicIndicator {
  id: string;
  code: string;
  name: string;
  category: 'Macro' | 'Inflación' | 'Laboral' | 'Productividad' | 'Comercio' | 'Fiscal' | 'Tecnología';
  countryCode: string;
  countryName: string;
  currentValue: number;
  previousValue: number;
  changeYoy: number;
  unit: string;
  epistemicType: EpistemicType;
  provenance: DataSourceProvenance;
  historical: IndicatorDataPoint[];
  forecasts?: {
    conservative: IndicatorDataPoint[];
    base: IndicatorDataPoint[];
    optimistic: IndicatorDataPoint[];
  };
  notes: string;
}

export interface CountryEconomicProfile {
  id: string;
  name: string;
  region: 'LATAM' | 'Norteamérica' | 'Europa' | 'Asia-Pacífico' | 'Global';
  flag: string;
  currency: string;
  gdpNominalBillionUSD: number;
  gdpPerCapitaUSD: number;
  gdpGrowthYoy: number;
  inflationYoy: number;
  unemploymentRate: number;
  centralBankRate: number;
  faiiIndexScore: number; // Fulgor AI Impact Index (0-100)
  aiAdoptionRate: number; // % empresas con IA
  digitalReadinessScore: number; // 0-100
  dataReliabilityScore: number; // 0-100
  provenanceList: string[];
}

export interface SectorImpact {
  id: string;
  name: string;
  icon: string;
  shareOfGDP: number; // %
  currentAiAdoption: number; // %
  productivityGainAnnual: number; // %
  hoursSavedPerWorkerMonth: number;
  costReductionPercentage: number;
  netEmploymentShift: number; // % (p.ej. -1.2% reasignación, +3.4% nuevos roles)
  faiiScore: number;
  keyDrivers: string[];
}

export interface DiDExperiment {
  id: string;
  title: string;
  targetSector: string;
  interventionYear: number;
  treatmentGroupName: string;
  controlGroupName: string;
  parallelTrendsVerified: boolean;
  parallelTrendsPValue: number;
  estimatedTreatmentEffect: number; // beta
  confidenceInterval95: [number, number];
  tStatistic: number;
  rSquared: number;
  sampleSize: number;
  assumptions: string[];
  caveats: string[];
  seriesData: {
    year: number;
    treatmentActual: number;
    treatmentCounterfactual: number;
    controlGroup: number;
  }[];
}

export interface DigitalTwinScenarioInput {
  countryCode: string;
  baseYear: number;
  simulationYears: number; // 1-5 años
  aiAdoptionDelta: number; // p.ej. +10%, +25%, +50%
  rdIncentivePercentage: number; // Subsidio a I+D %
  automationCapitalElasticity: number; // 0.1 a 0.8
  laborUpskillingSpeed: number; // 1 (lento) a 5 (acelerado)
  tradeTechOpenness: number; // 0 a 100%
  regulatoryFriction: number; // 0 a 100%
}

export interface DigitalTwinSimulationOutput {
  scenarioName: string;
  summary: {
    gdpExtraGrowthCumulative: number;
    productivityAnnualLift: number;
    netEmploymentBalance: number;
    fiscalRevenueLiftBillion: number;
    realWageGrowthAnnual: number;
    inflationaryPressureImpact: number;
  };
  yearlyTrajectory: {
    year: number;
    baselineGDP: number;
    simulatedGDP: number;
    productivityIndex: number;
    aiAdoptionRate: number;
    highSkillJobsK: number;
    routineJobsK: number;
    realWageIndex: number;
  }[];
  assumptionsStated: string[];
  uncertaintyScore: number; // 0-100 (mayor = más incertidumbre)
  riskFactors: { risk: string; severity: 'BAJA' | 'MEDIA' | 'ALTA'; probability: string }[];
}

export interface FulgorAIImpactIndexBreakdown {
  countryCode: string;
  countryName: string;
  overallScore: number;
  rank: number;
  components: {
    productivityLift: { value: number; weight: number; contribution: number };
    adoptionVelocity: { value: number; weight: number; contribution: number };
    capitalTechIntensity: { value: number; weight: number; contribution: number };
    humanSkillReadiness: { value: number; weight: number; contribution: number };
    transitionFrictionPenalty: { value: number; weight: number; contribution: number };
  };
  historicalScores: { year: number; score: number }[];
  formulaDescription: string;
  methodologyNotes: string;
}

export interface FulgorProductImpact {
  id: string;
  name: string;
  category: string;
  description: string;
  avgHoursSavedUserMonth: number;
  productivityLiftPercent: number;
  estimatedRoiMultiple: number;
  activeUsersEstimate: string;
  keyUseCases: string[];
}

export interface EcosystemModuleMetric {
  id: string;
  moduleName: string;
  tagline: string;
  activeDeployments: number;
  aggregatedTasksProcessed: number;
  avgTaskSpeedupFactor: number;
  estimatedHoursSavedTotal: number;
  directCostSavingsUSD: number;
  measuredProductivityLiftPct: number;
  reliabilityMetricPct: number;
  privacyCompliance: 'ANONYMIZED_AGGREGATE_ONLY' | 'GDPR_COMPLIANT' | 'CCPA_COMPLIANT';
}

export interface EconomicAlert {
  id: string;
  timestamp: string;
  countryCode: string;
  countryName: string;
  indicatorCode: string;
  indicatorName: string;
  title: string;
  description: string;
  severity: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'INFO';
  impactArea: 'Inflación' | 'Crecimiento' | 'Empleo' | 'Mercados' | 'Adopción IA' | 'Productividad';
  urgencyLevel: 'Inmediata' | 'Monitoreo 24h' | 'Tendencia Semanal';
  confidenceScore: number;
  epistemicType: EpistemicType;
  observedDelta: string;
  historicalAnomalyZScore: number;
  suggestedAction: string;
}

export interface CopilotMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  epistemicAudit?: {
    containsObservedFacts: boolean;
    containsCorrelations: boolean;
    containsModelEstimates: boolean;
    containsCausalClaims: boolean;
    containsProjections: boolean;
    confidenceLevel: 'Alta' | 'Media' | 'Baja' | 'Condicional a supuestos';
    sourcesCited: DataSourceProvenance[];
    epistemicDisclaimer: string;
  };
}

export type UserPlanTier = 'FREE' | 'PRO' | 'PRO_MAX' | 'ENTERPRISE';

// ==========================================
// ORCHESTRATOR & EPISTEMIC PIPELINE TYPES
// ==========================================

export interface AnalysisContext {
  countryCode: string;
  countryName: string;
  region: string;
  sector: string;
  indicatorCode?: string;
  indicatorName?: string;
  period: string;
}

export type AnalysisErrorCode = 
  | 'USER_ERROR'
  | 'DATA_ERROR'
  | 'MODEL_ERROR'
  | 'API_ERROR'
  | 'SYSTEM_ERROR';

export interface AnalysisError {
  code: AnalysisErrorCode;
  userMessage: string;
  technicalDetails?: string;
  timestamp: string;
}

export interface EpistemicQualityCheck {
  sourceCheckPassed: boolean;
  sourceCheckNotes: string;
  dataCheckPassed: boolean;
  dataCheckNotes: string;
  modelCheckPassed: boolean;
  modelCheckNotes: string;
  statisticalCheckPassed: boolean;
  statisticalCheckNotes: string;
  epistemicCheckPassed: boolean;
  epistemicCategoryAssigned: EpistemicType;
  confidenceScore: number; // 0-100
  confidenceDegraded: boolean;
  degradationReason?: string;
  ruleOfGoldCompliance: boolean;
}

export interface OrchestrationPipelineResult<T = any> {
  analysisId: string;
  auditHash: string;
  timestamp: string;
  context: AnalysisContext;
  requestedEngine: string;
  epistemicType: EpistemicType;
  isDemoData: boolean;
  qualityAudit: EpistemicQualityCheck;
  dataProvenance: DataSourceProvenance[];
  analyticalResult: T;
  aiExplanation?: string;
  formattedLimitations: string[];
  reproducibilityPayload: {
    analysisId: string;
    engineVersion: string;
    parameters: any;
    auditHash: string;
  };
}

export interface SystemReleaseGate {
  gateId: 'G1' | 'G2' | 'G3' | 'G4' | 'G5' | 'G6' | 'G7';
  name: string;
  category: 'DATA' | 'STATISTICAL' | 'CAUSAL' | 'FORECAST' | 'AI' | 'PRODUCTION' | 'PUBLICATION';
  description: string;
  status: 'PASSED' | 'FAILED' | 'WARNING';
  details: string;
  metrics: Record<string, any>;
}

export interface SystemHealthAuditReport {
  generatedAt: string;
  version: string;
  overallStatus: 'READY FOR RELEASE' | 'NOT READY FOR RELEASE';
  totalGatesChecked: number;
  gatesPassed: number;
  gatesFailed: number;
  totalTestsRun: number;
  testsPassed: number;
  testsFailed: number;
  enginesOperational: string[];
  sourcesConfigured: string[];
  apisOperational: string[];
  securityStatus: string;
  observabilityStatus: string;
  i18nStatus: string;
  documentationStatus: string;
  releaseBlockers: string[];
  executiveSummary: string;
}
