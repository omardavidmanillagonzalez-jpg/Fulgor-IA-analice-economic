import { 
  CountryEconomicProfile, 
  EconomicIndicator, 
  SectorImpact, 
  EconomicAlert, 
  DataSourceProvenance 
} from '../types/economic';

import { 
  COUNTRIES_DATA, 
  MACRO_INDICATORS, 
  SECTOR_IMPACTS, 
  ECONOMIC_ALERTS 
} from '../data/economicData';

export interface OfficialCatalogSource {
  id: string;
  name: string;
  acronym: string;
  countryOrRegion: string;
  coverage: string[];
  officialPortalUrl: string;
  trustScore: number;
  apiProtocol: 'REST / JSON' | 'SDMX / XML' | 'Bulk CSV' | 'OpenData';
}

export const OFFICIAL_SOURCES_CATALOG: OfficialCatalogSource[] = [
  {
    id: 'INEGI',
    name: 'Instituto Nacional de Estadística y Geografía',
    acronym: 'INEGI',
    countryOrRegion: 'México',
    coverage: ['PIB Trimestral', 'INPC Inflación', 'ENOE Empleo', 'BIE Indicadores'],
    officialPortalUrl: 'https://www.inegi.org.mx',
    trustScore: 99.4,
    apiProtocol: 'REST / JSON'
  },
  {
    id: 'BANXICO',
    name: 'Banco de México',
    acronym: 'Banxico',
    countryOrRegion: 'México',
    coverage: ['Tasa Objetivo TIIE', 'Tipo de Cambio FIX', 'Reservas Internacionales', 'Balanza de Pagos'],
    officialPortalUrl: 'https://www.banxico.org.mx/SieAPIRest',
    trustScore: 99.8,
    apiProtocol: 'REST / JSON'
  },
  {
    id: 'FRED',
    name: 'Federal Reserve Bank of St. Louis Economic Data',
    acronym: 'FRED',
    countryOrRegion: 'Estados Unidos & Global',
    coverage: ['US GDP', 'Core CPI', 'Non-Farm Payrolls', 'Fed Funds Rate', 'M2 Money Supply'],
    officialPortalUrl: 'https://fred.stlouisfed.org',
    trustScore: 99.9,
    apiProtocol: 'REST / JSON'
  },
  {
    id: 'EUROSTAT',
    name: 'European Commission Statistical Office',
    acronym: 'Eurostat',
    countryOrRegion: 'Unión Europea',
    coverage: ['Eurozone HICP Inflation', 'Euro Area GDP Growth', 'Labour Market Statistics'],
    officialPortalUrl: 'https://ec.europa.eu/eurostat',
    trustScore: 99.6,
    apiProtocol: 'SDMX / XML'
  },
  {
    id: 'OECD',
    name: 'Organisation for Economic Co-operation and Development',
    acronym: 'OECD / OCDE',
    countryOrRegion: 'Países Miembros OECD',
    coverage: ['OECD.AI Policy Observatory', 'Productivity Database', 'Science & Tech Indicators'],
    officialPortalUrl: 'https://oecd.ai',
    trustScore: 99.2,
    apiProtocol: 'REST / JSON'
  },
  {
    id: 'IMF',
    name: 'International Monetary Fund',
    acronym: 'FMI / IMF',
    countryOrRegion: 'Global Multilateral',
    coverage: ['World Economic Outlook (WEO)', 'International Financial Statistics (IFS)'],
    officialPortalUrl: 'https://www.imf.org/en/Data',
    trustScore: 99.5,
    apiProtocol: 'REST / JSON'
  },
  {
    id: 'WORLD_BANK',
    name: 'The World Bank Group Open Data',
    acronym: 'Banco Mundial',
    countryOrRegion: 'Global Multilateral',
    coverage: ['World Development Indicators (WDI)', 'GNI per capita', 'Digital Adoption Index'],
    officialPortalUrl: 'https://data.worldbank.org',
    trustScore: 99.1,
    apiProtocol: 'REST / JSON'
  }
];

export class DataEngine {
  private static isDemoMode: boolean = false;

  public static setDemoMode(active: boolean): void {
    this.isDemoMode = active;
  }

  public static getIsDemoMode(): boolean {
    return this.isDemoMode;
  }

  public static getCountries(): CountryEconomicProfile[] {
    return COUNTRIES_DATA;
  }

  public static getCountryByCode(code: string): CountryEconomicProfile | undefined {
    return COUNTRIES_DATA.find(c => c.id === code);
  }

  public static getIndicators(countryCode?: string): EconomicIndicator[] {
    if (!countryCode || countryCode === 'ALL') {
      return MACRO_INDICATORS;
    }
    return MACRO_INDICATORS.filter(ind => ind.countryCode === countryCode);
  }

  public static getSectorImpacts(): SectorImpact[] {
    return SECTOR_IMPACTS;
  }

  public static getAlerts(countryCode?: string): EconomicAlert[] {
    if (!countryCode || countryCode === 'ALL') {
      return ECONOMIC_ALERTS;
    }
    return ECONOMIC_ALERTS.filter(a => a.countryCode === countryCode);
  }

  public static getSourcesCatalog(): OfficialCatalogSource[] {
    return OFFICIAL_SOURCES_CATALOG;
  }

  public static searchIndicators(query: string, countryCode?: string): EconomicIndicator[] {
    const q = query.toLowerCase().trim();
    const list = this.getIndicators(countryCode);
    if (!q) return list;

    return list.filter(item => 
      item.name.toLowerCase().includes(q) ||
      item.code.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.provenance.sourceName.toLowerCase().includes(q) ||
      item.provenance.agency.toLowerCase().includes(q)
    );
  }
}
