import React, { useState } from 'react';
import { Navbar, TabId } from './components/Navbar';
import { MacroHeaderTicker } from './components/MacroHeaderTicker';
import { OverviewView } from './components/OverviewView';
import { IndicatorsView } from './components/IndicatorsView';
import { AiImpactView } from './components/AiImpactView';
import { CausalAnalysisView } from './components/CausalAnalysisView';
import { DigitalTwinView } from './components/DigitalTwinView';
import { PredictiveView } from './components/PredictiveView';
import { FulgorIndexView } from './components/FulgorIndexView';
import { EcosystemView } from './components/EcosystemView';
import { AlertsView } from './components/AlertsView';
import { CopilotDrawer } from './components/CopilotDrawer';
import { ReportStudioModal } from './components/ReportStudioModal';
import { TierModal } from './components/TierModal';
import { ApiExplorerModal } from './components/ApiExplorerModal';
import { ObservabilityModal } from './components/ObservabilityModal';
import { DocumentationModal } from './components/DocumentationModal';
import { DemoModeBanner } from './components/DemoModeBanner';

import { 
  COUNTRIES_DATA, 
  MACRO_INDICATORS, 
  SECTOR_IMPACTS, 
  ECONOMIC_ALERTS 
} from './data/economicData';
import { UserPlanTier } from './types/economic';
import { SupportedLanguage, SupportedCurrency } from './types/localization';
import { LocalizationEngine } from './engines/localizationEngine';
import { DataEngine } from './engines/dataEngine';
import { Bot, Sparkles, ShieldCheck, Database, FileText, Terminal, Activity, BookOpen } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [selectedCountry, setSelectedCountry] = useState<string>('ALL');
  const [currentTier, setCurrentTier] = useState<UserPlanTier>('PRO_MAX');
  
  // Localization & Currency
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>(LocalizationEngine.getCurrentLanguage());
  const [currentCurrency, setCurrentCurrency] = useState<SupportedCurrency>(LocalizationEngine.getCurrentCurrency());
  const [isDemoMode, setIsDemoMode] = useState<boolean>(DataEngine.getIsDemoMode());

  // Modals & Drawers
  const [isCopilotOpen, setIsCopilotOpen] = useState<boolean>(false);
  const [copilotInitialPrompt, setCopilotInitialPrompt] = useState<string>('');
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [isTierModalOpen, setIsTierModalOpen] = useState<boolean>(false);
  const [isApiExplorerOpen, setIsApiExplorerOpen] = useState<boolean>(false);
  const [isObservabilityOpen, setIsObservabilityOpen] = useState<boolean>(false);
  const [isDocumentationOpen, setIsDocumentationOpen] = useState<boolean>(false);

  const handleLanguageChange = (lang: SupportedLanguage) => {
    LocalizationEngine.setLanguage(lang);
    setCurrentLanguage(lang);
  };

  const handleCurrencyChange = (curr: SupportedCurrency) => {
    LocalizationEngine.setCurrency(curr);
    setCurrentCurrency(curr);
  };

  const handleToggleDemoMode = () => {
    const next = !isDemoMode;
    DataEngine.setDemoMode(next);
    setIsDemoMode(next);
  };

  const handleOpenCopilotWithPrompt = (prompt: string) => {
    setCopilotInitialPrompt(prompt);
    setIsCopilotOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Demo Mode Top Banner if enabled */}
      <DemoModeBanner 
        isDemoMode={isDemoMode} 
        onDisableDemoMode={() => handleToggleDemoMode()} 
      />

      {/* Real-time Macro Ticker Feed */}
      <MacroHeaderTicker />

      {/* Primary Global Navigation */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        selectedCountry={selectedCountry}
        onCountryChange={setSelectedCountry}
        currentTier={currentTier}
        onOpenTierModal={() => setIsTierModalOpen(true)}
        onOpenCopilot={() => setIsCopilotOpen(true)}
        onOpenReportStudio={() => setIsReportModalOpen(true)}
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
        currentCurrency={currentCurrency}
        onCurrencyChange={handleCurrencyChange}
        isDemoMode={isDemoMode}
        onToggleDemoMode={handleToggleDemoMode}
        onOpenApiExplorer={() => setIsApiExplorerOpen(true)}
        onOpenObservability={() => setIsObservabilityOpen(true)}
        onOpenDocumentation={() => setIsDocumentationOpen(true)}
      />

      {/* Main Workspace View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'overview' && (
          <OverviewView
            countries={COUNTRIES_DATA}
            primaryIndicators={MACRO_INDICATORS}
            sectors={SECTOR_IMPACTS}
            alerts={ECONOMIC_ALERTS}
            selectedCountry={selectedCountry}
            onNavigateToTab={setActiveTab}
            onOpenCopilotWithPrompt={handleOpenCopilotWithPrompt}
          />
        )}

        {activeTab === 'indicators' && (
          <IndicatorsView
            indicators={MACRO_INDICATORS}
            countries={COUNTRIES_DATA}
            selectedCountry={selectedCountry}
            onOpenCopilotWithPrompt={handleOpenCopilotWithPrompt}
          />
        )}

        {activeTab === 'ai-impact' && (
          <AiImpactView
            sectors={SECTOR_IMPACTS}
            onOpenCopilotWithPrompt={handleOpenCopilotWithPrompt}
          />
        )}

        {activeTab === 'causal-lab' && (
          <CausalAnalysisView
            onOpenCopilotWithPrompt={handleOpenCopilotWithPrompt}
          />
        )}

        {activeTab === 'digital-twin' && (
          <DigitalTwinView
            countries={COUNTRIES_DATA}
            selectedCountry={selectedCountry}
            onOpenCopilotWithPrompt={handleOpenCopilotWithPrompt}
          />
        )}

        {activeTab === 'predictive' && (
          <PredictiveView
            countries={COUNTRIES_DATA}
            primaryIndicators={MACRO_INDICATORS}
            selectedCountry={selectedCountry}
            onOpenCopilotWithPrompt={handleOpenCopilotWithPrompt}
          />
        )}

        {activeTab === 'fulgor-index' && (
          <FulgorIndexView
            onOpenCopilotWithPrompt={handleOpenCopilotWithPrompt}
          />
        )}

        {activeTab === 'ecosystem' && (
          <EcosystemView
            onOpenCopilotWithPrompt={handleOpenCopilotWithPrompt}
          />
        )}

        {activeTab === 'alerts' && (
          <AlertsView
            alerts={ECONOMIC_ALERTS}
            selectedCountry={selectedCountry}
            onOpenCopilotWithPrompt={handleOpenCopilotWithPrompt}
          />
        )}
      </main>

      {/* Floating Copilot Quick Button for High Ergonomics */}
      {!isCopilotOpen && (
        <button
          id="btn-floating-copilot"
          onClick={() => setIsCopilotOpen(true)}
          className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 font-bold shadow-xl shadow-amber-500/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group"
          title="Abrir AI Economic Copilot"
        >
          <Bot className="w-5 h-5" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-xs font-bold">
            Copilot Económico
          </span>
        </button>
      )}

      {/* AI Copilot Drawer */}
      <CopilotDrawer
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        selectedCountry={selectedCountry}
        initialPrompt={copilotInitialPrompt}
        onClearInitialPrompt={() => setCopilotInitialPrompt('')}
      />

      {/* Report Studio Export Modal */}
      <ReportStudioModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        countries={COUNTRIES_DATA}
        primaryIndicators={MACRO_INDICATORS}
        sectors={SECTOR_IMPACTS}
        selectedCountry={selectedCountry}
      />

      {/* Subscription Tier & API Modal */}
      <TierModal
        isOpen={isTierModalOpen}
        onClose={() => setIsTierModalOpen(false)}
        currentTier={currentTier}
        onSelectTier={setCurrentTier}
      />

      {/* REST API Explorer Modal */}
      <ApiExplorerModal
        isOpen={isApiExplorerOpen}
        onClose={() => setIsApiExplorerOpen(false)}
      />

      {/* Observability & Health Modal */}
      <ObservabilityModal
        isOpen={isObservabilityOpen}
        onClose={() => setIsObservabilityOpen(false)}
      />

      {/* Methodological Documentation Modal */}
      <DocumentationModal
        isOpen={isDocumentationOpen}
        onClose={() => setIsDocumentationOpen(false)}
      />

      {/* Global Footer with Epistemic Transparency Statement */}
      <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 py-8 px-4 sm:px-6 lg:px-8 mt-12 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="font-extrabold text-slate-200 font-mono tracking-tight">
                FULGOR <span className="text-amber-400">IA</span> ANALICER ECONOMIC
              </span>
              <span className="text-[10px] text-slate-500">v2.5 Enterprise</span>
            </div>
            <p className="text-[11px] text-slate-400">
              “Convertir datos económicos en inteligencia comprensible para tomar mejores decisiones.”
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-400">
            <button 
              onClick={() => setIsDocumentationOpen(true)}
              className="flex items-center gap-1 hover:text-amber-400 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Fuentes Oficiales: INEGI • FRED • Eurostat • OCDE
            </button>
            <span>•</span>
            <button 
              onClick={() => setIsApiExplorerOpen(true)}
              className="flex items-center gap-1 hover:text-amber-400 transition-colors"
            >
              <Terminal className="w-3.5 h-3.5 text-amber-400" /> API REST v1
            </button>
            <span>•</span>
            <button 
              onClick={() => setIsObservabilityOpen(true)}
              className="flex items-center gap-1 hover:text-emerald-400 transition-colors"
            >
              <Activity className="w-3.5 h-3.5 text-emerald-400" /> Observabilidad (99.98% Uptime)
            </button>
          </div>

          <div className="text-center md:text-right text-[11px] text-slate-400">
            © {new Date().getFullYear()} Ecosistema Fulgor IA. Rigor Epistémico &amp; Trazabilidad ISO.
          </div>
        </div>
      </footer>

    </div>
  );
}
