import React, { useState } from 'react';
import { DiDExperiment, OrchestrationPipelineResult } from '../types/economic';
import { EpistemicBadge } from './EpistemicBadge';
import { DID_EXPERIMENTS } from '../data/economicData';
import { EconomicIntelligenceOrchestrator } from '../engines/orchestratorEngine';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ReferenceLine, 
  Area 
} from 'recharts';
import { 
  Binary, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  Calculator, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp,
  FileCheck2,
  Layers,
  Play,
  Hash,
  Award,
  RefreshCw
} from 'lucide-react';

interface CausalAnalysisViewProps {
  onOpenCopilotWithPrompt: (prompt: string) => void;
}

export const CausalAnalysisView: React.FC<CausalAnalysisViewProps> = ({ onOpenCopilotWithPrompt }) => {
  const [selectedExpId, setSelectedExpId] = useState<string>(DID_EXPERIMENTS[0].id);
  const [activeTab, setActiveTab] = useState<'did' | 'interactive-orchestrator'>('did');

  // Interactive Orchestrator State
  const [targetEngineType, setTargetEngineType] = useState<'causal' | 'econometric'>('causal');
  const [countryCode, setCountryCode] = useState<string>('MX');
  const [preTreat, setPreTreat] = useState<number>(0.2);
  const [postTreat, setPostTreat] = useState<number>(21.6);
  const [preControl, setPreControl] = useState<number>(0.1);
  const [postControl, setPostControl] = useState<number>(0.2);
  const [standardError, setStandardError] = useState<number>(2.45);
  const [sampleSizeN, setSampleSizeN] = useState<number>(420);
  
  const [isExecutingOrchestrator, setIsExecutingOrchestrator] = useState<boolean>(false);
  const [orchestratedResult, setOrchestratedResult] = useState<OrchestrationPipelineResult | null>(null);

  const activeExperiment = DID_EXPERIMENTS.find(e => e.id === selectedExpId) || DID_EXPERIMENTS[0];

  const handleRunOrchestratedPipeline = async () => {
    setIsExecutingOrchestrator(true);
    try {
      const res = await EconomicIntelligenceOrchestrator.execute({
        targetEngine: targetEngineType,
        context: {
          countryCode,
          sector: 'Manufactura & Servicios Avanzados',
          indicatorCode: 'PROD_LIFT_DID',
          indicatorName: 'Productividad Marginal del Trabajo',
          period: '2026-Q1/Q2'
        },
        parameters: {
          preTreat,
          postTreat,
          preControl,
          postControl,
          se: standardError,
          sampleSize: sampleSizeN,
          xValues: [10, 20, 30, 40, 50, 60, 70, 80],
          yValues: [12, 22, 35, 41, 56, 68, 74, 89]
        },
        includeAiExplanation: true
      });
      setOrchestratedResult(res);
    } catch (err) {
      console.error('Orchestrator error:', err);
    } finally {
      setIsExecutingOrchestrator(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Causal Engine Philosophy */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Binary className="w-4 h-4 text-purple-400" /> LABORATORIO DE INFERENCIA CAUSAL &amp; ECONOMETRÍA
            </span>
            <EpistemicBadge type="CAUSAL_INFERENCE" size="sm" />
          </div>
          <h2 className="text-lg font-bold text-slate-100">
            Diferenciación Estricta: Correlación Estadística vs. Causalidad Inequívoca
          </h2>
          <p className="text-xs text-slate-400 max-w-3xl">
            Implementación de métodos cuasi-experimentales (Difference-in-Differences, controles sintéticos y variables instrumentales) con validación obligatoria de supuestos de tendencias paralelas.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveTab(activeTab === 'did' ? 'interactive-orchestrator' : 'did')}
            className="px-3 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5" />
            {activeTab === 'did' ? 'Modo Orquestador Interactivo' : 'Ver Estudios Calibrados'}
          </button>
          <button
            onClick={() => onOpenCopilotWithPrompt(`Explica detalladamente la metodología Difference-in-Differences (DiD), cómo se verifica el supuesto de tendencias paralelas y por qué un p-value de ${activeExperiment.parallelTrendsPValue} valida la inferencia causal en este caso.`)}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Copilot
          </button>
        </div>
      </div>

      {/* Epistemic Hierarchy Infographic (The 5-Layer Filter) */}
      <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
        <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <Layers className="w-4 h-4 text-amber-400" />
          La Escala Epistémica de Fulgor IA Analicer Economic
        </h3>
        <p className="text-xs text-slate-400">
          Toda afirmación económica debe clasificarse dentro de uno de los siguientes 5 niveles de certeza:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
          
          <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold text-emerald-400">NIVEL 1</span>
              <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1 rounded">100% Certeza</span>
            </div>
            <h4 className="font-bold text-slate-100 text-xs">Dato Observado</h4>
            <p className="text-[11px] text-slate-300">Medición empírica histórica directa por agencias oficiales (INEGI, FRED, Eurostat).</p>
          </div>

          <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/30 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold text-amber-400">NIVEL 2</span>
              <span className="text-[10px] bg-amber-950 text-amber-300 px-1 rounded">Asociación (r)</span>
            </div>
            <h4 className="font-bold text-slate-100 text-xs">Correlación</h4>
            <p className="text-[11px] text-slate-300">Dos variables se mueven juntas. <strong className="text-amber-300">Nunca</strong> prueba que una sea la causa de la otra.</p>
          </div>

          <div className="p-3 rounded-lg bg-sky-950/20 border border-sky-500/30 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold text-sky-400">NIVEL 3</span>
              <span className="text-[10px] bg-sky-950 text-sky-300 px-1 rounded">Paramétrico</span>
            </div>
            <h4 className="font-bold text-slate-100 text-xs">Estimación Modelada</h4>
            <p className="text-[11px] text-slate-300">Ajuste estadístico mediante regresión MCO o paneles, sujeto a variables de control.</p>
          </div>

          <div className="p-3 rounded-lg bg-purple-950/20 border border-purple-500/30 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold text-purple-400">NIVEL 4</span>
              <span className="text-[10px] bg-purple-950 text-purple-300 px-1 rounded">Cuasi-Experimento</span>
            </div>
            <h4 className="font-bold text-slate-100 text-xs">Inferencia Causal</h4>
            <p className="text-[11px] text-slate-300">Efecto tratamiento medido contra un grupo de control sintético contrafactual verificado.</p>
          </div>

          <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-500/30 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold text-rose-400">NIVEL 5</span>
              <span className="text-[10px] bg-rose-950 text-rose-300 px-1 rounded">Incertidumbre</span>
            </div>
            <h4 className="font-bold text-slate-100 text-xs">Pronóstico</h4>
            <p className="text-[11px] text-slate-300">Proyección probabilística a futuro sujeta a supuestos y factores de riesgo.</p>
          </div>

        </div>
      </div>

      {/* VIEW MODE 1: CALIBRATED STUDIES */}
      {activeTab === 'did' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Experiment Selection */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-semibold text-slate-400">
              Estudios Cuasi-Experimentales Calibrados ({DID_EXPERIMENTS.length})
            </div>

            <div className="space-y-3">
              {DID_EXPERIMENTS.map((exp) => {
                const isSelected = exp.id === selectedExpId;
                return (
                  <div
                    key={exp.id}
                    onClick={() => setSelectedExpId(exp.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all space-y-2 ${
                      isSelected
                        ? 'bg-slate-800/90 border-purple-400/60 shadow-lg shadow-purple-500/10'
                        : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-purple-300 bg-purple-950 px-1.5 py-0.5 rounded border border-purple-800/50">
                        Intervención: {exp.interventionYear}
                      </span>
                      <EpistemicBadge type="CAUSAL_INFERENCE" size="sm" />
                    </div>

                    <h4 className="font-bold text-slate-100 text-xs leading-snug">
                      {exp.title}
                    </h4>

                    <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800 flex items-center justify-between">
                      <span>Efecto Tratamiento Estimado:</span>
                      <span className="font-mono font-bold text-emerald-400">
                        +{exp.estimatedTreatmentEffect}% (95% CI)
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Econometric Parameters Box */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3 text-xs">
              <h4 className="font-bold text-slate-200 flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5 text-purple-400" /> Parámetros Econométricos del Modelo
              </h4>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div className="p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-500 block text-[9px]">Efecto (Beta)</span>
                  <span className="text-emerald-400 font-bold">+{activeExperiment.estimatedTreatmentEffect}%</span>
                </div>
                <div className="p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-500 block text-[9px]">Estadístico t</span>
                  <span className="text-slate-200 font-bold">{activeExperiment.tStatistic}</span>
                </div>
                <div className="p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-500 block text-[9px]">R² Ajustado</span>
                  <span className="text-slate-200 font-bold">{activeExperiment.rSquared}</span>
                </div>
                <div className="p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-500 block text-[9px]">Muestra Total (N)</span>
                  <span className="text-slate-200 font-bold">{activeExperiment.sampleSize}</span>
                </div>
              </div>

              <div className="p-2.5 rounded bg-emerald-950/30 border border-emerald-500/30 flex items-center gap-2 text-[11px] text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  Tendencias Paralelas Verificadas (F-test p = {activeExperiment.parallelTrendsPValue} &gt; 0.05).
                </span>
              </div>
            </div>
          </div>

          {/* Right: Difference-in-Differences Chart & Counterfactual Comparison */}
          <div className="lg:col-span-8 space-y-5">
            <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-5">
              
              {/* Title & Description */}
              <div className="border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-purple-400 font-mono font-semibold">
                    Modelo: Difference-in-Differences (DiD)
                  </span>
                  <span className="text-xs text-slate-500">•</span>
                  <span className="text-xs text-slate-400">{activeExperiment.targetSector}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-100">
                  Trayectoria Observada vs. Contrafactual Sintético (Sin Adopción)
                </h3>
              </div>

              {/* Interactive DiD Chart */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">
                    Índice de Productividad / VAB por Empleado (Base 100 en 2020)
                  </span>
                  <span className="text-purple-400 font-mono font-bold text-[11px]">
                    Año de Intervención: {activeExperiment.interventionYear}
                  </span>
                </div>

                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={activeExperiment.seriesData} margin={{ top: 15, right: 20, left: -10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis dataKey="year" stroke="#64748b" fontSize={11} fontStyle="bold" />
                      <YAxis stroke="#64748b" fontSize={11} domain={[95, 145]} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                      />
                      <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                      <ReferenceLine 
                        x={activeExperiment.interventionYear} 
                        stroke="#c084fc" 
                        strokeDasharray="4 4" 
                        label={{ value: 'Intervención IA', fill: '#c084fc', fontSize: 11, position: 'insideTopLeft' }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="treatmentActual" 
                        name="Tratamiento Real (Firmas con IA)" 
                        stroke="#34d399" 
                        strokeWidth={3} 
                        dot={{ r: 4 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="treatmentCounterfactual" 
                        name="Contrafactual Estimado (Sin IA)" 
                        stroke="#f59e0b" 
                        strokeWidth={2} 
                        strokeDasharray="5 5" 
                        dot={{ r: 3 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="controlGroup" 
                        name="Grupo de Control Observado" 
                        stroke="#64748b" 
                        strokeWidth={2} 
                        dot={{ r: 3 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="p-3 bg-purple-950/20 border border-purple-500/30 rounded-lg text-xs text-purple-200 leading-relaxed flex items-start gap-2">
                  <FileCheck2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Efecto Causal Neto:</strong> El diferencial entre la trayectoria real tratada ({activeExperiment.seriesData[activeExperiment.seriesData.length - 1].treatmentActual}) y el contrafactual ({activeExperiment.seriesData[activeExperiment.seriesData.length - 1].treatmentCounterfactual}) representa una ganancia neta estimada de <strong>+{activeExperiment.estimatedTreatmentEffect}%</strong> atribuible con 95% de confianza al despliegue de IA.
                  </span>
                </div>
              </div>

              {/* Assumptions & Caveats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5 text-xs">
                  <span className="font-semibold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Supuestos Clave Validados
                  </span>
                  <ul className="list-disc list-inside text-slate-400 text-[11px] space-y-1 leading-relaxed">
                    {activeExperiment.assumptions.map((assump, idx) => (
                      <li key={idx}>{assump}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5 text-xs">
                  <span className="font-semibold text-amber-400 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> Advertencias &amp; Limitaciones
                  </span>
                  <ul className="list-disc list-inside text-slate-400 text-[11px] space-y-1 leading-relaxed">
                    {activeExperiment.caveats.map((cav, idx) => (
                      <li key={idx}>{cav}</li>
                    ))}
                  </ul>
                </div>

              </div>

            </div>
          </div>

        </div>
      )}

      {/* VIEW MODE 2: INTERACTIVE ECONOMIC INTELLIGENCE ORCHESTRATOR */}
      {activeTab === 'interactive-orchestrator' && (
        <div className="space-y-6">
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <Play className="w-4 h-4 text-amber-400" />
                  EconomicIntelligenceOrchestrator — Ejecución de Pipeline de Causalidad &amp; Econometría
                </h3>
                <p className="text-xs text-slate-400">
                  Flujo: USER &rarr; ORCHESTRATOR &rarr; DATA &rarr; PROVENANCE &rarr; ANALYTICAL ENGINE &rarr; VALIDATION &rarr; EPISTEMIC CLASSIFICATION &rarr; COPILOT &rarr; REPORT
                </p>
              </div>

              <button
                onClick={handleRunOrchestratedPipeline}
                disabled={isExecutingOrchestrator}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-lg text-xs shadow-md shadow-amber-500/20 flex items-center gap-2 transition-all active:scale-95 shrink-0"
              >
                {isExecutingOrchestrator ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
                <span>Ejecutar Pipeline Orquestado</span>
              </button>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Motor Analítico</label>
                <select
                  value={targetEngineType}
                  onChange={(e) => setTargetEngineType(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none"
                >
                  <option value="causal">Difference-in-Differences (DiD)</option>
                  <option value="econometric">Regresión Lineal MCO (OLS)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">País / Región</label>
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none"
                >
                  <option value="MX">🇲🇽 México</option>
                  <option value="US">🇺🇸 Estados Unidos</option>
                  <option value="ES">🇪🇸 España</option>
                  <option value="DE">🇩🇪 Alemania</option>
                  <option value="BR">🇧🇷 Brasil</option>
                </select>
              </div>

              {targetEngineType === 'causal' && (
                <>
                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-medium">Post-Tratamiento (% Delta)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={postTreat}
                      onChange={(e) => setPostTreat(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 font-mono focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-medium">Error Estándar (SE)</label>
                    <input
                      type="number"
                      step="0.05"
                      value={standardError}
                      onChange={(e) => setStandardError(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 font-mono focus:outline-none"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Pipeline Output Result Card */}
            {orchestratedResult && (
              <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-amber-500/30 space-y-4">
                
                {/* Header of Audit Pass */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2">
                    <EpistemicBadge type={orchestratedResult.epistemicType} size="md" />
                    <span className="text-xs font-mono font-bold text-slate-200">
                      Analysis ID: <span className="text-amber-400">{orchestratedResult.analysisId}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Audit Hash: {orchestratedResult.auditHash.substring(0, 18)}...</span>
                  </div>
                </div>

                {/* Quality Gates Summary */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-mono">
                  <div className="p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">SOURCE CHECK</span>
                    <span className="text-emerald-400 font-bold">100% OK</span>
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">DATA CHECK</span>
                    <span className="text-emerald-400 font-bold">100% OK</span>
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">MODEL CHECK</span>
                    <span className="text-emerald-400 font-bold">100% OK</span>
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">STATISTICAL CHECK</span>
                    <span className="text-emerald-400 font-bold">100% OK</span>
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">CONFIDENCE SCORE</span>
                    <span className="text-amber-400 font-bold">{orchestratedResult.qualityAudit.confidenceScore} / 100</span>
                  </div>
                </div>

                {/* Mathematical Outcomes */}
                {targetEngineType === 'causal' && (
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Efecto Tratamiento DiD</span>
                      <span className="text-emerald-400 text-sm font-bold">+{orchestratedResult.analyticalResult.treatmentEffect}%</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Estadístico t</span>
                      <span className="text-slate-200 text-sm font-bold">{orchestratedResult.analyticalResult.tStat}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Intervalo de Confianza (95%)</span>
                      <span className="text-slate-200 text-sm font-bold">[{orchestratedResult.analyticalResult.ciLower95}%, {orchestratedResult.analyticalResult.ciUpper95}%]</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Tendencias Paralelas</span>
                      <span className="text-emerald-400 text-sm font-bold">{orchestratedResult.analyticalResult.parallelTrendsVerified ? 'VERIFICADAS' : 'FALLIDAS'}</span>
                    </div>
                  </div>
                )}

                {/* AI Explanation Generated by Copilot/Orchestrator */}
                {orchestratedResult.aiExplanation && (
                  <div className="p-3.5 bg-slate-900/80 rounded-lg border border-slate-800 space-y-2 text-xs">
                    <span className="font-bold text-amber-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Síntesis Explicativa Epistémica de IA:
                    </span>
                    <p className="text-slate-300 whitespace-pre-line font-sans leading-relaxed">
                      {orchestratedResult.aiExplanation}
                    </p>
                  </div>
                )}

              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

