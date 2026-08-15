export type SupportedLanguage = 'es' | 'en' | 'pt' | 'fr' | 'de' | 'it' | 'zh' | 'ja';

export type SupportedCurrency = 'USD' | 'MXN' | 'EUR' | 'BRL' | 'GBP';
export type CurrencyCode = SupportedCurrency;

export interface TranslationDictionary {
  appName: string;
  appSubtitle: string;
  ruleOfGoldTitle: string;
  ruleOfGoldSubtitle: string;
  
  // Epistemic Categories
  observedData: string;
  statisticalCorrelation: string;
  modeledEstimate: string;
  causalInference: string;
  probabilisticForecast: string;

  // Tabs
  tabOverview: string;
  tabIndicators: string;
  tabAiImpact: string;
  tabCausalLab: string;
  tabDigitalTwin: string;
  tabPredictive: string;
  tabFulgorIndex: string;
  tabEcosystem: string;
  tabAlerts: string;
  
  // Actions
  copilot: string;
  exportReport: string;
  subscriptionTiers: string;
  demoMode: string;
  demoModeNotice: string;
  apiExplorer: string;
  systemHealth: string;
  methodologyDocs: string;
  filterByCountry: string;
  allCountries: string;
  runSimulation: string;
  resetDefaults: string;
  downloadData: string;
  printReport: string;
  
  // Common terms
  sources: string;
  provenance: string;
  methodology: string;
  uncertainty: string;
  assumptions: string;
  sampleSize: string;
  standardError: string;
  cutoffDate: string;
  frequency: string;
  unit: string;
  officialSource: string;
  confidenceScore: string;
  statisticallySignificant: string;
}
