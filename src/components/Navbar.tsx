import React from 'react';
import { 
  Sparkles, 
  BarChart3, 
  Cpu, 
  Binary, 
  TrendingUp, 
  Layers, 
  Boxes, 
  Bell, 
  FileText, 
  Bot, 
  Globe, 
  ShieldCheck, 
  KeyRound,
  Download,
  Terminal,
  Activity,
  BookOpen,
  Languages,
  DollarSign
} from 'lucide-react';
import { UserPlanTier } from '../types/economic';
import { SupportedLanguage, SupportedCurrency } from '../types/localization';
import { LocalizationEngine } from '../engines/localizationEngine';

export type TabId = 
  | 'overview' 
  | 'indicators' 
  | 'ai-impact' 
  | 'causal-lab' 
  | 'digital-twin' 
  | 'predictive' 
  | 'fulgor-index' 
  | 'ecosystem' 
  | 'alerts';

interface NavbarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  selectedCountry: string;
  onCountryChange: (countryCode: string) => void;
  currentTier: UserPlanTier;
  onOpenTierModal: () => void;
  onOpenCopilot: () => void;
  onOpenReportStudio: () => void;
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  currentCurrency: SupportedCurrency;
  onCurrencyChange: (curr: SupportedCurrency) => void;
  isDemoMode: boolean;
  onToggleDemoMode: () => void;
  onOpenApiExplorer: () => void;
  onOpenObservability: () => void;
  onOpenDocumentation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  selectedCountry,
  onCountryChange,
  currentTier,
  onOpenTierModal,
  onOpenCopilot,
  onOpenReportStudio,
  currentLanguage,
  onLanguageChange,
  currentCurrency,
  onCurrencyChange,
  isDemoMode,
  onToggleDemoMode,
  onOpenApiExplorer,
  onOpenObservability,
  onOpenDocumentation,
}) => {
  const tabs: { id: TabId; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'overview', label: LocalizationEngine.t('nav.overview'), icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'indicators', label: LocalizationEngine.t('nav.indicators'), icon: <Globe className="w-4 h-4" /> },
    { id: 'ai-impact', label: LocalizationEngine.t('nav.aiImpact'), icon: <Cpu className="w-4 h-4" /> },
    { id: 'causal-lab', label: LocalizationEngine.t('nav.causalLab'), icon: <Binary className="w-4 h-4" />, badge: 'Econometría' },
    { id: 'digital-twin', label: LocalizationEngine.t('nav.digitalTwin'), icon: <Boxes className="w-4 h-4" />, badge: 'Simulador' },
    { id: 'predictive', label: LocalizationEngine.t('nav.predictive'), icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'fulgor-index', label: LocalizationEngine.t('nav.fulgorIndex'), icon: <Layers className="w-4 h-4" /> },
    { id: 'ecosystem', label: LocalizationEngine.t('nav.ecosystem'), icon: <Sparkles className="w-4 h-4" /> },
    { id: 'alerts', label: LocalizationEngine.t('nav.alerts'), icon: <Bell className="w-4 h-4" />, badge: '4' },
  ];

  const countries = [
    { code: 'ALL', name: 'Global / Multipaís' },
    { code: 'MX', name: '🇲🇽 México' },
    { code: 'US', name: '🇺🇸 Estados Unidos' },
    { code: 'ES', name: '🇪🇸 España' },
    { code: 'DE', name: '🇩🇪 Alemania' },
    { code: 'BR', name: '🇧🇷 Brasil' },
    { code: 'CO', name: '🇨🇴 Colombia' },
    { code: 'CL', name: '🇨🇱 Chile' },
    { code: 'JP', name: '🇯🇵 Japón' },
  ];

  const languages: { code: SupportedLanguage; label: string }[] = [
    { code: 'es', label: 'Español' },
    { code: 'en', label: 'English' },
    { code: 'pt', label: 'Português' },
    { code: 'fr', label: 'Français' },
    { code: 'de', label: 'Deutsch' },
    { code: 'it', label: 'Italiano' },
    { code: 'zh', label: '中文' },
    { code: 'ja', label: '日本語' },
  ];

  const currencies: SupportedCurrency[] = ['USD', 'MXN', 'EUR', 'BRL', 'GBP'];

  const tierColors: Record<UserPlanTier, string> = {
    FREE: 'bg-slate-800 text-slate-300 border-slate-700',
    PRO: 'bg-sky-950/80 text-sky-400 border-sky-500/40',
    PRO_MAX: 'bg-amber-950/80 text-amber-400 border-amber-500/40',
    ENTERPRISE: 'bg-purple-950/80 text-purple-400 border-purple-500/40',
  };

  return (
    <header className="bg-slate-950 border-b border-slate-800 sticky top-0 z-40">
      
      {/* Top Utility & Control Bar */}
      <div className="bg-slate-900/90 border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-1">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs">
          
          {/* Epistemic Seal Quick Statement */}
          <div className="flex items-center gap-2 overflow-hidden text-slate-400">
            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-1.5 py-0.5 rounded">
              <ShieldCheck className="w-3 h-3" /> ISO 27001 AUDIT
            </span>
            <span className="hidden md:inline text-[11px] truncate">
              {LocalizationEngine.t('epistemic.ruleOfGold')}
            </span>
          </div>

          {/* Tools & Settings Cluster */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Language Picker */}
            <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded px-2 py-0.5">
              <Languages className="w-3 h-3 text-amber-400" />
              <select
                id="language-selector"
                value={currentLanguage}
                onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
                className="bg-transparent text-[11px] text-slate-200 font-medium focus:outline-none cursor-pointer"
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code} className="bg-slate-900 text-slate-200">
                    {l.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Currency Picker */}
            <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded px-1.5 py-0.5">
              <DollarSign className="w-3 h-3 text-emerald-400" />
              <select
                id="currency-selector"
                value={currentCurrency}
                onChange={(e) => onCurrencyChange(e.target.value as SupportedCurrency)}
                className="bg-transparent text-[11px] text-slate-200 font-mono focus:outline-none cursor-pointer"
              >
                {currencies.map((c) => (
                  <option key={c} value={c} className="bg-slate-900 text-slate-200">
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Demo Mode Toggle */}
            <button
              onClick={onToggleDemoMode}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold border transition-all ${
                isDemoMode 
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse' 
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
              title="Alternar entre datos empíricos oficiales y modo de demostración sintético"
            >
              <span>{isDemoMode ? '🟡 MODO DEMO' : '🟢 DATOS REALES'}</span>
            </button>

            {/* Quick Links: API Explorer, Observability, Docs */}
            <button
              onClick={onOpenApiExplorer}
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-amber-400 transition-colors"
              title="Abrir Explorador API REST v1"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">REST API</span>
            </button>

            <button
              onClick={onOpenObservability}
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-emerald-400 transition-colors"
              title="Panel de Observabilidad & Estado del Servidor"
            >
              <Activity className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Salud</span>
            </button>

            <button
              onClick={onOpenDocumentation}
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-sky-400 transition-colors"
              title="Ficha Técnica y Manual Metodológico"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Metodología</span>
            </button>
          </div>
        </div>
      </div>

      {/* Brand & Main Controls Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 gap-4">
          
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 p-0.5 shadow-lg shadow-amber-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-tight text-base sm:text-lg text-slate-100 font-mono">
                  FULGOR <span className="text-amber-400">IA</span>
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                  ECONOMIC
                </span>
              </div>
            </div>
          </div>

          {/* Quick Context Filter: Country / Region */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <select
                id="country-selector"
                value={selectedCountry}
                onChange={(e) => onCountryChange(e.target.value)}
                className="bg-transparent text-xs text-slate-200 font-medium focus:outline-none cursor-pointer pr-2"
              >
                {countries.map((c) => (
                  <option key={c.code} value={c.code} className="bg-slate-900 text-slate-200">
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* AI Copilot Quick Trigger */}
            <button
              id="btn-open-copilot-nav"
              onClick={onOpenCopilot}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all active:scale-95"
            >
              <Bot className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{LocalizationEngine.t('copilot.title')}</span>
            </button>

            {/* Executive Report Studio */}
            <button
              id="btn-open-report-studio"
              onClick={onOpenReportStudio}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors"
              title="Generar Reporte Ejecutivo Exportable"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden lg:inline">{LocalizationEngine.t('reports.title')}</span>
            </button>

            {/* Plan Tier Badge / Simulator */}
            <button
              id="btn-open-tier-modal"
              onClick={onOpenTierModal}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[11px] font-mono font-bold transition-transform hover:scale-105 ${tierColors[currentTier]}`}
              title="Configuración de Licencia y API Pública"
            >
              <KeyRound className="w-3 h-3" />
              <span>{currentTier}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Module Navigation Tabs */}
      <div className="bg-slate-900/60 border-t border-slate-800/80 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 py-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`nav-tab-${tab.id}`}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all duration-150 relative ${
                  isActive
                    ? 'bg-slate-800 text-amber-400 border border-slate-700 shadow-inner'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded-full ${
                    tab.id === 'alerts' 
                      ? 'bg-rose-950 text-rose-300 border border-rose-800' 
                      : 'bg-amber-950/60 text-amber-300 border border-amber-800/50'
                  }`}>
                    {tab.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-amber-400 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
