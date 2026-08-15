import React, { useState } from 'react';
import { EconomicAlert } from '../types/economic';
import { EpistemicBadge } from './EpistemicBadge';
import { 
  Bell, 
  AlertTriangle, 
  AlertOctagon, 
  Info, 
  Filter, 
  Search, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  ShieldAlert
} from 'lucide-react';

interface AlertsViewProps {
  alerts: EconomicAlert[];
  selectedCountry: string;
  onOpenCopilotWithPrompt: (prompt: string) => void;
}

export const AlertsView: React.FC<AlertsViewProps> = ({
  alerts,
  selectedCountry,
  onOpenCopilotWithPrompt,
}) => {
  const [severityFilter, setSeverityFilter] = useState<'ALL' | 'HIGH' | 'MEDIUM' | 'LOW'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedAlertId, setSelectedAlertId] = useState<string>(alerts[0]?.id || '');

  const filteredAlerts = alerts.filter((a) => {
    const matchCountry = selectedCountry === 'ALL' || a.countryCode === selectedCountry || a.countryCode === 'GLOBAL';
    const matchSev = severityFilter === 'ALL' || a.severity === severityFilter;
    const matchSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        a.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCountry && matchSev && matchSearch;
  });

  const selectedAlert = alerts.find(a => a.id === selectedAlertId) || alerts[0];

  const severityBadgeColors = {
    HIGH: 'bg-rose-950 text-rose-300 border-rose-800',
    MEDIUM: 'bg-amber-950 text-amber-300 border-amber-800',
    LOW: 'bg-sky-950 text-sky-300 border-sky-800',
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
              <Bell className="w-4 h-4 text-rose-400" /> SISTEMA DE ALERTAS TEMPRANAS & ANOMALÍAS ECONÓMICAS
            </span>
            <EpistemicBadge type="OBSERVED_DATA" size="sm" />
          </div>
          <h2 className="text-lg font-bold text-slate-100">
            Detección de Desviaciones Estadísticas & Puntos Críticos de Fricción
          </h2>
          <p className="text-xs text-slate-400 max-w-3xl">
            Algoritmos continuos de detección de outliers (Z-Score &gt; 2.0σ) en variables de inversión, costos energéticos, desacoplamiento salarios-productividad y cuellos de botella tecnológicos.
          </p>
        </div>

        <button
          onClick={() => onOpenCopilotWithPrompt(`¿Cuáles son las 3 alertas económicas más urgentes para la región de ${selectedCountry === 'ALL' ? 'Norteamérica y Europa' : selectedCountry} y qué medidas de mitigación se recomiendan?`)}
          className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 text-xs font-semibold rounded-lg transition-colors shrink-0 flex items-center gap-1.5"
        >
          <Sparkles className="w-4 h-4" /> Mitigación con Copilot
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Severidad:
          </span>
          {(['ALL', 'HIGH', 'MEDIUM', 'LOW'] as const).map((sev) => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(sev)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                severityFilter === sev
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {sev === 'ALL' ? 'Todas' : sev}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Buscar por palabra clave..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400/50 w-full sm:w-60"
          />
        </div>
      </div>

      {/* Main Alerts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Alert List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-semibold text-slate-400 flex items-center justify-between">
            <span>Alertas Activas Detectadas ({filteredAlerts.length})</span>
            <span className="text-[10px] text-slate-500 font-mono">Motor Heurístico Z-Score</span>
          </div>

          <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
            {filteredAlerts.map((alert) => {
              const isSelected = alert.id === selectedAlertId;
              return (
                <div
                  key={alert.id}
                  onClick={() => setSelectedAlertId(alert.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all space-y-2 ${
                    isSelected
                      ? 'bg-slate-800/90 border-amber-400/60 shadow-lg shadow-amber-500/10'
                      : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${severityBadgeColors[alert.severity]}`}>
                        {alert.severity}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">{alert.countryCode}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">
                      Z: +{alert.historicalAnomalyZScore}σ
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-100 text-xs leading-snug">
                    {alert.title}
                  </h4>

                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {alert.description}
                  </p>
                </div>
              );
            })}

            {filteredAlerts.length === 0 && (
              <div className="p-8 text-center text-xs text-slate-500 bg-slate-900/40 rounded-xl border border-slate-800">
                No se encontraron anomalías con los criterios especificados.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Alert Detail Inspector */}
        <div className="lg:col-span-7 space-y-5">
          {selectedAlert && (
            <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-5">
              
              <div className="border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${severityBadgeColors[selectedAlert.severity]}`}>
                    SEVERIDAD {selectedAlert.severity}
                  </span>
                  <span className="text-xs text-slate-500">•</span>
                  <span className="text-xs text-amber-400 font-mono font-semibold">Área: {selectedAlert.impactArea}</span>
                  <span className="text-xs text-slate-500">•</span>
                  <span className="text-xs text-slate-400 font-mono">Región: {selectedAlert.countryCode}</span>
                </div>
                <h3 className="font-bold text-slate-100 text-base sm:text-lg">
                  {selectedAlert.title}
                </h3>
              </div>

              {/* Description & Epistemic Evaluation */}
              <div className="space-y-3">
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3.5 rounded-lg border border-slate-800/80">
                  {selectedAlert.description}
                </p>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Desviación Estadística (Z-Score)</span>
                    <span className="font-mono font-bold text-rose-400 text-sm">
                      +{selectedAlert.historicalAnomalyZScore}σ sobre la media
                    </span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Puntaje de Confianza del Modelo</span>
                    <span className="font-mono font-bold text-emerald-400 text-sm">
                      {selectedAlert.confidenceScore}% Confiabilidad
                    </span>
                  </div>
                </div>
              </div>

              {/* Suggested Strategic Actions */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Recomendaciones Estratégicas y Acciones de Mitigación:
                </span>
                <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-300 space-y-1.5 leading-relaxed">
                  <p className="text-slate-200">
                    <strong>Acción sugerida:</strong> {selectedAlert.suggestedAction}
                  </p>
                </div>
              </div>

              {/* Quick Action Button with Copilot */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => onOpenCopilotWithPrompt(`Genera un plan de acción ejecutivo y análisis de impacto para mitigar la alerta: "${selectedAlert.title}" en la economía de ${selectedAlert.countryCode}.`)}
                  className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-lg text-xs shadow-md shadow-amber-500/10 flex items-center gap-2 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Elaborar Plan de Mitigación en Copilot
                </button>
              </div>

            </div>
          )}
        </div>

      </div>

    </div>
  );
};
