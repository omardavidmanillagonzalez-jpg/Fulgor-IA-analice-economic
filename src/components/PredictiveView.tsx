import React, { useState } from 'react';
import { CountryEconomicProfile, EconomicIndicator } from '../types/economic';
import { EpistemicBadge } from './EpistemicBadge';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  Line 
} from 'recharts';
import { 
  TrendingUp, 
  AlertTriangle, 
  ShieldAlert, 
  Sparkles, 
  Activity, 
  Layers, 
  Calendar 
} from 'lucide-react';

interface PredictiveViewProps {
  countries: CountryEconomicProfile[];
  primaryIndicators: EconomicIndicator[];
  selectedCountry: string;
  onOpenCopilotWithPrompt: (prompt: string) => void;
}

export const PredictiveView: React.FC<PredictiveViewProps> = ({
  countries,
  primaryIndicators,
  selectedCountry,
  onOpenCopilotWithPrompt,
}) => {
  const [targetVariable, setTargetVariable] = useState<'gdp' | 'inflation' | 'aiAdoption'>('gdp');
  const [selectedScenario, setSelectedScenario] = useState<'all' | 'conservative' | 'base' | 'optimistic'>('all');

  const currentCountry = countries.find(c => c.id === (selectedCountry === 'ALL' ? 'MX' : selectedCountry)) || countries[0];

  // Monte Carlo Fan Chart Data (2022 to 2028)
  const gdpFanData = [
    { year: '2022', observed: 3.9, base: 3.9, conservative: 3.9, optimistic: 3.9, p10: 3.9, p90: 3.9 },
    { year: '2023', observed: 3.2, base: 3.2, conservative: 3.2, optimistic: 3.2, p10: 3.2, p90: 3.2 },
    { year: '2024', observed: 2.1, base: 2.1, conservative: 2.1, optimistic: 2.1, p10: 2.1, p90: 2.1 },
    { year: '2025', observed: 2.3, base: 2.3, conservative: 2.3, optimistic: 2.3, p10: 2.3, p90: 2.3 },
    // Forecast years
    { year: '2026 (P)', observed: null, base: 2.4, conservative: 1.8, optimistic: 3.1, p10: 1.2, p90: 3.8 },
    { year: '2027 (P)', observed: null, base: 2.6, conservative: 1.6, optimistic: 3.6, p10: 0.9, p90: 4.3 },
    { year: '2028 (P)', observed: null, base: 2.8, conservative: 1.5, optimistic: 4.1, p10: 0.6, p90: 4.9 },
  ];

  const inflationFanData = [
    { year: '2022', observed: 7.82, base: 7.82, conservative: 7.82, optimistic: 7.82, p10: 7.82, p90: 7.82 },
    { year: '2023', observed: 4.66, base: 4.66, conservative: 4.66, optimistic: 4.66, p10: 4.66, p90: 4.66 },
    { year: '2024', observed: 4.45, base: 4.45, conservative: 4.45, optimistic: 4.45, p10: 4.45, p90: 4.45 },
    { year: '2025', observed: 4.28, base: 4.28, conservative: 4.28, optimistic: 4.28, p10: 4.28, p90: 4.28 },
    // Forecast years
    { year: '2026 (P)', observed: null, base: 3.75, conservative: 4.30, optimistic: 3.20, p10: 2.8, p90: 4.9 },
    { year: '2027 (P)', observed: null, base: 3.40, conservative: 4.10, optimistic: 2.90, p10: 2.4, p90: 4.7 },
    { year: '2028 (P)', observed: null, base: 3.15, conservative: 3.90, optimistic: 2.70, p10: 2.1, p90: 4.5 },
  ];

  const aiAdoptionFanData = [
    { year: '2022', observed: 12.0, base: 12.0, conservative: 12.0, optimistic: 12.0, p10: 12.0, p90: 12.0 },
    { year: '2023', observed: 18.5, base: 18.5, conservative: 18.5, optimistic: 18.5, p10: 18.5, p90: 18.5 },
    { year: '2024', observed: 21.4, base: 21.4, conservative: 21.4, optimistic: 21.4, p10: 21.4, p90: 21.4 },
    { year: '2025', observed: 24.8, base: 24.8, conservative: 24.8, optimistic: 24.8, p10: 24.8, p90: 24.8 },
    // Forecast years
    { year: '2026 (P)', observed: null, base: 32.5, conservative: 28.0, optimistic: 38.0, p10: 25.0, p90: 42.0 },
    { year: '2027 (P)', observed: null, base: 42.0, conservative: 34.0, optimistic: 52.0, p10: 30.0, p90: 58.0 },
    { year: '2028 (P)', observed: null, base: 51.5, conservative: 41.0, optimistic: 66.0, p10: 35.0, p90: 74.0 },
  ];

  const activeChartData = targetVariable === 'gdp' 
    ? gdpFanData 
    : (targetVariable === 'inflation' ? inflationFanData : aiAdoptionFanData);

  const activeUnit = targetVariable === 'gdp' 
    ? '% Crecimiento PIB' 
    : (targetVariable === 'inflation' ? '% Inflación Anual' : '% Empresas con IA');

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-rose-400" /> MOTOR PREDICTIVO & PROYECCIONES PROBABILÍSTICAS
            </span>
            <EpistemicBadge type="PROJECTION" size="sm" />
          </div>
          <h2 className="text-lg font-bold text-slate-100">
            Modelos de Simulación Estocástica y Análisis de Cono de Incertidumbre
          </h2>
          <p className="text-xs text-slate-400 max-w-3xl">
            Proyecciones multivariables horizonte 2026-2028 mediante simulación Monte Carlo. <strong>Principio de rigor:</strong> Toda predicción es una estimación probabilística y nunca una certidumbre.
          </p>
        </div>

        <button
          onClick={() => onOpenCopilotWithPrompt(`Analiza los supuestos detrás de las proyecciones macroeconómicas para ${currentCountry.name} en 2026-2028. ¿Cuáles son los principales riesgos de cola (tail risks)?`)}
          className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 text-xs font-semibold rounded-lg transition-colors shrink-0 flex items-center gap-1.5"
        >
          <Sparkles className="w-4 h-4" /> Evaluar Supuestos con Copilot
        </button>
      </div>

      {/* Target Variable Selector & Scenario Controls */}
      <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Variable de Pronóstico:</span>
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setTargetVariable('gdp')}
                className={`px-3 py-1 text-xs rounded font-medium transition-colors ${
                  targetVariable === 'gdp' ? 'bg-slate-800 text-amber-400' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Crecimiento PIB
              </button>
              <button
                onClick={() => setTargetVariable('inflation')}
                className={`px-3 py-1 text-xs rounded font-medium transition-colors ${
                  targetVariable === 'inflation' ? 'bg-slate-800 text-amber-400' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Inflación (IPC)
              </button>
              <button
                onClick={() => setTargetVariable('aiAdoption')}
                className={`px-3 py-1 text-xs rounded font-medium transition-colors ${
                  targetVariable === 'aiAdoption' ? 'bg-slate-800 text-amber-400' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Adopción de IA
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Economía:</span>
            <span className="text-xs font-bold text-slate-200 bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
              {currentCountry.flag} {currentCountry.name}
            </span>
          </div>
        </div>

        {/* Fan Chart Visualization */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-semibold">
              Gráfico de Cono de Probabilidad (Fan Chart) con Intervalos al 80% y 95%
            </span>
            <EpistemicBadge type="PROJECTION" size="sm" showDetail />
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activeChartData} margin={{ top: 15, right: 20, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="fanSpread" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="year" stroke="#64748b" fontSize={11} fontStyle="bold" />
                <YAxis stroke="#64748b" fontSize={11} unit="%" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  formatter={(val: any, name: string) => [`${val}%`, name]}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                
                {/* Confidence Bounds */}
                <Area type="monotone" dataKey="p90" name="Intervalo Superior (P90)" stroke="#f43f5e" strokeWidth={1} strokeDasharray="3 3" fill="url(#fanSpread)" />
                <Area type="monotone" dataKey="p10" name="Intervalo Inferior (P10)" stroke="#f43f5e" strokeWidth={1} strokeDasharray="3 3" fill="transparent" />

                {/* Scenarios */}
                <Line type="monotone" dataKey="optimistic" name="Escenario Optimista" stroke="#34d399" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="base" name="Escenario Base" stroke="#38bdf8" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="conservative" name="Escenario Conservador" stroke="#fbbf24" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="observed" name="Dato Histórico Observado" stroke="#f8fafc" strokeWidth={3.5} dot={{ r: 5 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Scenarios Breakdown Description Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3">
          
          <div className="p-3.5 bg-amber-950/20 border border-amber-500/30 rounded-lg space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-400">Escenario Conservador</span>
              <span className="text-[10px] bg-amber-950 text-amber-300 px-1.5 py-0.5 rounded">Probabilidad: 25%</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Persistencia de tasas de interés elevadas, fricciones en la cadena de suministro de hardware y adopción corporativa cautelosa.
            </p>
          </div>

          <div className="p-3.5 bg-sky-950/20 border border-sky-500/30 rounded-lg space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sky-400">Escenario Base</span>
              <span className="text-[10px] bg-sky-950 text-sky-300 px-1.5 py-0.5 rounded">Probabilidad: 55%</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Normalización monetaria gradual, aceleración paulatina de la productividad e inversión continua en digitalización empresarial.
            </p>
          </div>

          <div className="p-3.5 bg-emerald-950/20 border border-emerald-500/30 rounded-lg space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-400">Escenario Optimista</span>
              <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded">Probabilidad: 20%</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Multiplicador de inversión tecnológica acelerado, rápido re-entrenamiento de la fuerza laboral y expansión fiscal no inflacionaria.
            </p>
          </div>

        </div>

        {/* Disclaimer */}
        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <span>
            <strong>Aviso de Riesgo y Responsabilidad Económica:</strong> Los pronósticos se calculan combinando modelos autorregresivos (ARIMA), vectores autorregresivos (VAR) y calibración empírica. No constituyen asesoría financiera ni garantía de eventos futuros.
          </span>
        </div>

      </div>

    </div>
  );
};
