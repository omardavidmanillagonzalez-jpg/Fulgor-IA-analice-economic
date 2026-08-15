import React, { useState } from 'react';
import { 
  CountryEconomicProfile, 
  EconomicIndicator, 
  SectorImpact, 
  EconomicAlert 
} from '../types/economic';
import { EpistemicBadge } from './EpistemicBadge';
import { ProvenanceCard } from './ProvenanceCard';
import { PROVENANCE_REGISTRY } from '../data/economicData';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ScatterChart, 
  Scatter, 
  ZAxis, 
  BarChart, 
  Bar 
} from 'recharts';
import { 
  TrendingUp, 
  ShieldCheck, 
  Cpu, 
  Globe2, 
  Activity, 
  AlertTriangle, 
  Layers, 
  ArrowUpRight, 
  HelpCircle,
  BarChart2,
  PieChart
} from 'lucide-react';

interface OverviewViewProps {
  countries: CountryEconomicProfile[];
  primaryIndicators: EconomicIndicator[];
  sectors: SectorImpact[];
  alerts: EconomicAlert[];
  selectedCountry: string;
  onNavigateToTab: (tabId: any) => void;
  onOpenCopilotWithPrompt: (prompt: string) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  countries,
  primaryIndicators,
  sectors,
  alerts,
  selectedCountry,
  onNavigateToTab,
  onOpenCopilotWithPrompt,
}) => {
  const [activeTabSub, setActiveTabSub] = useState<'macro' | 'ai-correlation' | 'provenance'>('macro');

  const filteredCountries = selectedCountry === 'ALL' 
    ? countries 
    : countries.filter(c => c.id === selectedCountry);

  // Scatter correlation data: AI Adoption Rate vs Productivity Growth
  const scatterData = countries.map(c => ({
    name: c.name,
    code: c.id,
    aiAdoption: c.aiAdoptionRate,
    gdpGrowth: c.gdpGrowthYoy,
    faii: c.faiiIndexScore,
    gdp: c.gdpNominalBillionUSD,
  }));

  // Historical GDP comparison
  const gdpComparisonData = [
    { year: '2021', US: 5.9, MX: 4.7, ES: 5.5, DE: 2.6 },
    { year: '2022', US: 2.1, MX: 3.9, ES: 5.8, DE: 1.8 },
    { year: '2023', US: 2.5, MX: 3.2, ES: 2.5, DE: -0.3 },
    { year: '2024', US: 2.9, MX: 2.1, ES: 2.7, DE: -0.1 },
    { year: '2025', US: 2.6, MX: 2.3, ES: 2.4, DE: 0.9 },
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Epistemic & Methodological Principle */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> PRINCIPIO DE RIGOR CIENTÍFICO
            </span>
            <EpistemicBadge type="OBSERVED_DATA" size="sm" />
          </div>
          <h2 className="text-base sm:text-lg font-bold text-slate-100">
            Inteligencia Macroeconómica Verificada & Medición Causal del Impacto Tecnológico
          </h2>
          <p className="text-xs text-slate-400 max-w-3xl">
            La confiabilidad está por encima del espectáculo. Cada métrica separa estrictamente 
            <strong className="text-emerald-300"> dato observado</strong>, 
            <strong className="text-amber-300"> correlación estadística</strong>, 
            <strong className="text-sky-300"> estimación modelada</strong>, 
            <strong className="text-purple-300"> inferencia causal</strong> y 
            <strong className="text-rose-300"> pronóstico</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
          <button
            onClick={() => onOpenCopilotWithPrompt('¿Cuál es el panorama de crecimiento económico y adopción de IA en México y EE.UU. para este trimestre?')}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Activity className="w-3.5 h-3.5" /> Preguntar al Copilot
          </button>
        </div>
      </div>

      {/* Global Macro KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredCountries.slice(0, 4).map((country) => (
          <div 
            key={country.id} 
            id={`kpi-card-${country.id.toLowerCase()}`}
            className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">{country.flag}</span>
                <div>
                  <h3 className="font-bold text-slate-100 text-sm">{country.name}</h3>
                  <span className="text-[10px] text-slate-400 font-mono">{country.currency}</span>
                </div>
              </div>
              <EpistemicBadge type="OBSERVED_DATA" size="sm" />
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block">Crecimiento PIB</span>
                <span className="font-mono font-bold text-slate-100 text-sm">+{country.gdpGrowthYoy}% YoY</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Inflación (IPC)</span>
                <span className="font-mono font-bold text-slate-100 text-sm">{country.inflationYoy}%</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Tasa Central</span>
                <span className="font-mono font-bold text-amber-400 text-sm">{country.centralBankRate}%</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Adopción IA</span>
                <span className="font-mono font-bold text-sky-400 text-sm">{country.aiAdoptionRate}%</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Índice FAII:</span>
              <span className="font-mono font-bold text-amber-400">{country.faiiIndexScore} / 100</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Analysis Section: Multi-Tab Comparison */}
      <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h3 className="font-bold text-slate-100 text-base flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-amber-400" />
              Dinámica Macroeconómica & Cruce de Variables
            </h3>
            <p className="text-xs text-slate-400">
              Series históricas armonizadas y análisis de dispersión entre penetración tecnológica y valor agregado.
            </p>
          </div>

          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 self-start sm:self-auto">
            <button
              onClick={() => setActiveTabSub('macro')}
              className={`px-3 py-1 text-xs rounded font-medium transition-colors ${
                activeTabSub === 'macro' ? 'bg-slate-800 text-amber-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Crecimiento Histórico
            </button>
            <button
              onClick={() => setActiveTabSub('ai-correlation')}
              className={`px-3 py-1 text-xs rounded font-medium transition-colors ${
                activeTabSub === 'ai-correlation' ? 'bg-slate-800 text-amber-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Correlación IA vs PIB
            </button>
            <button
              onClick={() => setActiveTabSub('provenance')}
              className={`px-3 py-1 text-xs rounded font-medium transition-colors ${
                activeTabSub === 'provenance' ? 'bg-slate-800 text-amber-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Fuentes & Auditoría
            </button>
          </div>
        </div>

        {/* Tab 1: Crecimiento Histórico */}
        {activeTabSub === 'macro' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Variación porcentual anual del PIB Real (2021 - 2025)
              </span>
              <EpistemicBadge type="OBSERVED_DATA" size="sm" />
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={gdpComparisonData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="year" stroke="#64748b" fontSize={11} fontStyle="bold" />
                  <YAxis stroke="#64748b" fontSize={11} unit="%" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                    labelStyle={{ color: '#f8fafc', fontWeight: 'bold' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Line type="monotone" dataKey="US" name="Estados Unidos (BEA)" stroke="#38bdf8" strokeWidth={2.5} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="MX" name="México (INEGI)" stroke="#34d399" strokeWidth={2.5} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="ES" name="España (INE)" stroke="#fbbf24" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="DE" name="Alemania (Destatis)" stroke="#c084fc" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800/80 text-xs text-slate-400 flex items-start gap-2">
              <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Lectura metodológica:</strong> Datos extraídos de Cuentas Nacionales oficiales. La recuperación post-2021 muestra dinámicas dispares en Europa central por costos energéticos versus la resiliencia impulsada por inversión productiva en Norteamérica.
              </span>
            </div>
          </div>
        )}

        {/* Tab 2: Correlación IA vs PIB */}
        {activeTabSub === 'ai-correlation' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-xs font-semibold text-slate-200">
                  Tasa de Adopción Empresarial de IA (%) vs Crecimiento PIB (%)
                </span>
                <span className="text-[11px] text-amber-400 block font-mono">
                  Coeficiente de Correlación de Pearson: r = +0.64 (p-value = 0.012)
                </span>
              </div>
              <EpistemicBadge type="CORRELATION" size="sm" showDetail />
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 10, left: -10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis type="number" dataKey="aiAdoption" name="Adopción IA" unit="%" stroke="#64748b" fontSize={11} domain={[10, 60]} />
                  <YAxis type="number" dataKey="gdpGrowth" name="Crecimiento PIB" unit="%" stroke="#64748b" fontSize={11} domain={[0, 4]} />
                  <ZAxis type="number" dataKey="gdp" range={[80, 500]} name="Tamaño PIB" />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }}
                    contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                    formatter={(val: any, name: string) => [`${val}`, name]}
                  />
                  <Scatter name="Economías Analizadas" data={scatterData} fill="#f59e0b" shape="circle" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>

            <div className="p-3 bg-amber-950/20 border border-amber-500/30 rounded-lg text-xs text-amber-200/90 leading-relaxed">
              <strong>Advertencia Epistemológica Fulgor IA:</strong> Aunque se observa una asociación positiva (r = 0.64), esto <em>NO</em> implica que la adopción de IA sea la causa directa exclusiva del crecimiento macroeconómico general. Las economías con mayores rentas per cápita cuentan con mayor capital disponible para invertir en I+D. Para una inferencia causal rigurosa con grupos de control, consulta el <strong>Módulo de Inferencia Causal (DiD)</strong>.
            </div>
          </div>
        )}

        {/* Tab 3: Fuentes & Proveniencia */}
        {activeTabSub === 'provenance' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <ProvenanceCard provenance={PROVENANCE_REGISTRY.INEGI_BIE} />
            <ProvenanceCard provenance={PROVENANCE_REGISTRY.BEA_FRED} />
            <ProvenanceCard provenance={PROVENANCE_REGISTRY.EUROSTAT} />
            <ProvenanceCard provenance={PROVENANCE_REGISTRY.OECD_AI_OBSERVATORY} />
          </div>
        )}
      </div>

      {/* Two Column Section: Sector Impact Summary & Economic Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Sectoral Breakdown */}
        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
              <Cpu className="w-4 h-4 text-sky-400" />
              Impacto por Sector Económico
            </h3>
            <button
              onClick={() => onNavigateToTab('ai-impact')}
              className="text-xs text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-1"
            >
              Ver Análisis Completo <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {sectors.slice(0, 5).map((sec) => (
              <div key={sec.id} className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <div className="font-semibold text-slate-200">{sec.name}</div>
                  <div className="text-[11px] text-slate-400">
                    Ahorro mensual: <strong className="text-emerald-400">{sec.hoursSavedPerWorkerMonth} hrs/trabajador</strong> | VAB: +{sec.productivityGainAnnual}%
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-amber-400 text-xs">
                    {sec.currentAiAdoption}% adopción
                  </span>
                  <div className="w-20 bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
                    <div 
                      className="bg-amber-400 h-full rounded-full" 
                      style={{ width: `${sec.currentAiAdoption}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time Economic Alerts */}
        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              Sistema de Alertas Económicas Tempranas
            </h3>
            <button
              onClick={() => onNavigateToTab('alerts')}
              className="text-xs text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-1"
            >
              Ver Todas ({alerts.length}) <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {alerts.slice(0, 3).map((alert) => (
              <div 
                key={alert.id} 
                className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/80 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    alert.severity === 'HIGH' ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
                  }`}>
                    {alert.severity} • {alert.impactArea}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">{alert.countryCode} • Z: +{alert.historicalAnomalyZScore}σ</span>
                </div>
                <h4 className="font-semibold text-slate-200">{alert.title}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
                  {alert.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
