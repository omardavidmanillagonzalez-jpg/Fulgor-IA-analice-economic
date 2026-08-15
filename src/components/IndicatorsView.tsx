import React, { useState } from 'react';
import { EconomicIndicator, CountryEconomicProfile } from '../types/economic';
import { EpistemicBadge } from './EpistemicBadge';
import { ProvenanceCard } from './ProvenanceCard';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  AreaChart, 
  Area 
} from 'recharts';
import { 
  Globe, 
  Search, 
  Filter, 
  Database, 
  Calendar, 
  TrendingUp, 
  Layers, 
  Info, 
  CheckCircle2, 
  Download 
} from 'lucide-react';

interface IndicatorsViewProps {
  indicators: EconomicIndicator[];
  countries: CountryEconomicProfile[];
  selectedCountry: string;
  onOpenCopilotWithPrompt: (prompt: string) => void;
}

export const IndicatorsView: React.FC<IndicatorsViewProps> = ({
  indicators,
  countries,
  selectedCountry,
  onOpenCopilotWithPrompt,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeIndicatorId, setActiveIndicatorId] = useState<string>(indicators[0]?.id || '');
  const [showForecastScenario, setShowForecastScenario] = useState<'none' | 'base' | 'all'>('base');

  const categories = ['ALL', 'Macro', 'Inflación', 'Laboral', 'Productividad', 'Tecnología'];

  const filteredIndicators = indicators.filter((ind) => {
    const matchCountry = selectedCountry === 'ALL' || ind.countryCode === selectedCountry;
    const matchCat = selectedCategory === 'ALL' || ind.category === selectedCategory;
    const matchSearch = ind.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        ind.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCountry && matchCat && matchSearch;
  });

  const activeIndicator = indicators.find((i) => i.id === activeIndicatorId) || indicators[0];

  // Prepare chart series combining historical and forecast points
  const chartData = [...(activeIndicator?.historical || [])];
  if (showForecastScenario !== 'none' && activeIndicator?.forecasts) {
    const baseForecasts = activeIndicator.forecasts.base || [];
    baseForecasts.forEach((f) => {
      chartData.push({
        date: f.date,
        value: f.value,
        observed: false,
        lowerBound: f.lowerBound,
        upperBound: f.upperBound,
      });
    });
  }

  return (
    <div className="space-y-6">
      
      {/* Header with Search and Category Pills */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Globe className="w-5 h-5 text-amber-400" />
              Explorador de Indicadores Macroeconómicos
            </h2>
            <p className="text-xs text-slate-400">
              Datos normalizados y auditados provenientes de institutos oficiales (INEGI, FRED, Eurostat, OCDE, FMI).
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Buscar indicador (PIB, Inflación...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400/50 w-full sm:w-64"
              />
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <span className="text-xs text-slate-400 flex items-center gap-1 shrink-0 mr-1">
            <Filter className="w-3.5 h-3.5" /> Categoría:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors shrink-0 ${
                selectedCategory === cat
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat === 'ALL' ? 'Todos los Indicadores' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Two-Column Layout: Indicator List & Deep-Dive Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Indicator Selector Cards */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-semibold text-slate-400 flex items-center justify-between">
            <span>Indicadores Disponibles ({filteredIndicators.length})</span>
            <span className="text-[10px] text-slate-500 font-mono">Actualizado Semanal</span>
          </div>

          <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
            {filteredIndicators.map((ind) => {
              const isSelected = ind.id === activeIndicatorId;
              return (
                <div
                  key={ind.id}
                  onClick={() => setActiveIndicatorId(ind.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-800/90 border-amber-400/60 shadow-md shadow-amber-500/5'
                      : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                      {ind.code}
                    </span>
                    <EpistemicBadge type={ind.epistemicType} size="sm" />
                  </div>

                  <h4 className="font-semibold text-slate-100 text-xs mt-1">
                    {ind.countryName}: {ind.name}
                  </h4>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/60 text-xs">
                    <span className="text-slate-400">Valor Actual:</span>
                    <span className="font-mono font-bold text-amber-400">
                      {ind.currentValue} {ind.unit}
                    </span>
                  </div>
                </div>
              );
            })}

            {filteredIndicators.length === 0 && (
              <div className="p-6 text-center text-xs text-slate-500 bg-slate-900/40 rounded-lg border border-slate-800">
                No se encontraron indicadores con los filtros seleccionados.
              </div>
            )}
          </div>
        </div>

        {/* Right: Detailed Deep-Dive Chart & Methodology Card */}
        <div className="lg:col-span-8 space-y-4">
          {activeIndicator && (
            <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-5">
              
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-slate-100">{activeIndicator.countryName}</span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-amber-400 font-mono">{activeIndicator.category}</span>
                    <EpistemicBadge type={activeIndicator.epistemicType} size="sm" showDetail />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-100">
                    {activeIndicator.name}
                  </h3>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <button
                    onClick={() => onOpenCopilotWithPrompt(`Analiza en profundidad el indicador ${activeIndicator.name} (${activeIndicator.countryName}), su impacto en la economía y su tendencia esperada.`)}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 text-xs font-semibold rounded-md transition-colors"
                  >
                    Explicar con Copilot
                  </button>
                </div>
              </div>

              {/* Chart Controls & Fan toggle */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  Serie Temporal Trimestral / Anual ({activeIndicator.unit})
                </span>

                <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-md border border-slate-800">
                  <span className="text-[10px] text-slate-500 px-1">Proyección:</span>
                  <button
                    onClick={() => setShowForecastScenario('none')}
                    className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                      showForecastScenario === 'none' ? 'bg-slate-800 text-slate-200' : 'text-slate-400'
                    }`}
                  >
                    Solo Observados
                  </button>
                  <button
                    onClick={() => setShowForecastScenario('base')}
                    className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                      showForecastScenario === 'base' ? 'bg-amber-950 text-amber-300 border border-amber-800/60' : 'text-slate-400'
                    }`}
                  >
                    Escenario Base + Intervalo
                  </button>
                </div>
              </div>

              {/* Responsive Chart */}
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="date" stroke="#64748b" fontSize={11} />
                    <YAxis stroke="#64748b" fontSize={11} unit={activeIndicator.unit.includes('%') ? '%' : ''} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                      formatter={(val: any, name: string) => [`${val} ${activeIndicator.unit}`, name]}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      name="Valor Histórico / Proyectado" 
                      stroke="#f59e0b" 
                      strokeWidth={2.5} 
                      fillOpacity={1} 
                      fill="url(#colorVal)" 
                    />
                    {showForecastScenario === 'base' && (
                      <>
                        <Line type="monotone" dataKey="lowerBound" name="Límite Inferior (95% CI)" stroke="#94a3b8" strokeDasharray="3 3" dot={false} />
                        <Line type="monotone" dataKey="upperBound" name="Límite Superior (95% CI)" stroke="#94a3b8" strokeDasharray="3 3" dot={false} />
                      </>
                    )}
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Notes & Caveats */}
              {activeIndicator.notes && (
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                  <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Nota analítica:</strong> {activeIndicator.notes}
                  </span>
                </div>
              )}

              {/* Provenance Card */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-amber-400" /> Ficha Técnica y Verificación de Fuente
                </span>
                <ProvenanceCard provenance={activeIndicator.provenance} />
              </div>

            </div>
          )}
        </div>

      </div>

    </div>
  );
};
