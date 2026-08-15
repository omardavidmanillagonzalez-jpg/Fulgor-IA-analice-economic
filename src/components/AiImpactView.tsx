import React, { useState } from 'react';
import { SectorImpact } from '../types/economic';
import { EpistemicBadge } from './EpistemicBadge';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar 
} from 'recharts';
import { 
  Cpu, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  CheckCircle,
  HelpCircle
} from 'lucide-react';

interface AiImpactViewProps {
  sectors: SectorImpact[];
  onOpenCopilotWithPrompt: (prompt: string) => void;
}

export const AiImpactView: React.FC<AiImpactViewProps> = ({ sectors, onOpenCopilotWithPrompt }) => {
  const [selectedSectorId, setSelectedSectorId] = useState<string>(sectors[0]?.id || '');
  const [comparisonMode, setComparisonMode] = useState<'hours' | 'productivity' | 'costs'>('hours');

  const selectedSector = sectors.find((s) => s.id === selectedSectorId) || sectors[0];

  // Adoption phases data (Pre / During / Post adoption curve)
  const adoptionPhasesData = [
    { phase: 'T-12m (Pre-adopción)', productividad: 100, costosOperativos: 100, tiempoPorTarea: 100 },
    { phase: 'T-6m (Pilotos & Setup)', productividad: 103, costosOperativos: 108, tiempoPorTarea: 96 },
    { phase: 'T0 (Despliegue Empresa)', productividad: 112, costosOperativos: 102, tiempoPorTarea: 85 },
    { phase: 'T+6m (Curva Aprendizaje)', productividad: 122, costosOperativos: 91, tiempoPorTarea: 74 },
    { phase: 'T+12m (Madurez Operativa)', productividad: 128, costosOperativos: 84, tiempoPorTarea: 68 },
    { phase: 'T+24m (Flujos Autónomos)', productividad: 136, costosOperativos: 78, tiempoPorTarea: 59 },
  ];

  // Sectoral comparison chart data
  const sectorChartData = sectors.map((s) => ({
    name: s.name.split(',')[0],
    adopcion: s.currentAiAdoption,
    productividad: s.productivityGainAnnual,
    horasAhorradas: s.hoursSavedPerWorkerMonth,
    reduccionCostos: s.costReductionPercentage,
    desplazamientoNeto: s.netEmploymentShift,
  }));

  // Radar multi-dimensional score for selected sector
  const radarData = [
    { subject: 'Adopción IA', score: selectedSector.currentAiAdoption },
    { subject: 'Ganancia Productividad', score: selectedSector.productivityGainAnnual * 3 },
    { subject: 'Ahorro Tiempo', score: (selectedSector.hoursSavedPerWorkerMonth / 45) * 100 },
    { subject: 'Eficiencia Costes', score: selectedSector.costReductionPercentage * 4 },
    { subject: 'Índice FAII', score: selectedSector.faiiScore },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-sky-400" /> MOTOR DE IMPACTO DE IA (AI IMPACT ENGINE)
            </span>
            <EpistemicBadge type="MODEL_ESTIMATE" size="sm" />
          </div>
          <h2 className="text-lg font-bold text-slate-100">
            Medición de Productividad, Ahorro de Tiempo y Recomposición Laboral
          </h2>
          <p className="text-xs text-slate-400 max-w-3xl">
            Evaluación empírica y econométrica de las curvas pre/durante/post adopción de tecnologías de inteligencia artificial por sector e industria.
          </p>
        </div>

        <button
          onClick={() => onOpenCopilotWithPrompt(`¿Cuáles son los sectores con mayor retorno de inversión y ganancia de productividad laboral tras adoptar herramientas de IA en 2026?`)}
          className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 text-xs font-semibold rounded-lg transition-colors shrink-0 flex items-center gap-1.5"
        >
          <Sparkles className="w-4 h-4" /> Diagnóstico Sectorial IA
        </button>
      </div>

      {/* Primary Metrics Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-400" /> Ahorro Promedio Mensual
          </span>
          <div className="font-mono font-bold text-2xl text-slate-100">
            28.4 <span className="text-xs font-normal text-slate-400">hrs/trabajador</span>
          </div>
          <p className="text-[10px] text-slate-500">Equivalente a 3.5 días laborales mensuales recuperados para tareas de alto valor.</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> Ganancia de Productividad VAB
          </span>
          <div className="font-mono font-bold text-2xl text-emerald-400">
            +18.6% <span className="text-xs font-normal text-slate-400">anual</span>
          </div>
          <p className="text-[10px] text-slate-500">Incremento en Valor Agregado Bruto por empleado en firmas maduras.</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-sky-400" /> Reducción de Costes Operativos
          </span>
          <div className="font-mono font-bold text-2xl text-sky-400">
            -16.2% <span className="text-xs font-normal text-slate-400">TCO</span>
          </div>
          <p className="text-[10px] text-slate-500">Optimización de procesos repetitivos, atención a clientes y código.</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-purple-400" /> Recomposición de Empleo
          </span>
          <div className="font-mono font-bold text-2xl text-purple-400">
            +1.4% <span className="text-xs font-normal text-slate-400">neto</span>
          </div>
          <p className="text-[10px] text-slate-500">Aumento neto positivo impulsado por nuevos roles y expansión de capacidad.</p>
        </div>
      </div>

      {/* Sector Breakdown and Adoption Curve */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Sector Selector Cards */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-semibold text-slate-400">
            Selecciona un Sector para Inspección Detallada
          </div>

          <div className="space-y-2">
            {sectors.map((sec) => {
              const isSelected = sec.id === selectedSectorId;
              return (
                <div
                  key={sec.id}
                  onClick={() => setSelectedSectorId(sec.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-800/90 border-amber-400/60 shadow-md shadow-amber-500/5'
                      : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-slate-100 text-xs">
                      {sec.name}
                    </span>
                    <span className="text-[11px] font-mono text-amber-400 font-bold">
                      {sec.currentAiAdoption}%
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-800/60">
                    <div>
                      <span>Ahorro: </span>
                      <strong className="text-emerald-400">{sec.hoursSavedPerWorkerMonth} hrs/mes</strong>
                    </div>
                    <div>
                      <span>VAB: </span>
                      <strong className="text-sky-400">+{sec.productivityGainAnnual}%</strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Detailed Deep Dive of Selected Sector */}
        <div className="lg:col-span-8 space-y-5">
          <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-5">
            
            {/* Header of selected sector */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs text-amber-400 font-mono font-semibold">
                  Sector: {selectedSector.name}
                </span>
                <h3 className="text-lg font-bold text-slate-100">
                  Curva de Transición Operativa y Factores Clave
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Índice FAII Sectorial:</span>
                <span className="font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                  {selectedSector.faiiScore} / 100
                </span>
              </div>
            </div>

            {/* Key Drivers */}
            <div>
              <span className="text-xs font-semibold text-slate-300 block mb-2">
                Principales Casos de Uso y Motores de Productividad:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {selectedSector.keyDrivers.map((driver, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80 text-xs text-slate-300 flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{driver}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Adoption Phase Timeline Chart */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-semibold">
                  Curva Temporal: Pre-Adopción (T-12m) vs Madurez Operativa (T+24m) (Base 100)
                </span>
                <EpistemicBadge type="MODEL_ESTIMATE" size="sm" />
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={adoptionPhasesData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="phase" stroke="#64748b" fontSize={10} />
                    <YAxis stroke="#64748b" fontSize={10} domain={[40, 150]} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                    <Bar dataKey="productividad" name="Índice Productividad VAB" fill="#34d399" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="costosOperativos" name="Costes Operativos (%)" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="tiempoPorTarea" name="Tiempo Requerido por Tarea (%)" fill="#fbbf24" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Methodological Box */}
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-400 flex items-start gap-2">
              <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Metodología de Calibración:</strong> Mediciones agregadas calibradas a partir de encuestas empresariales de la OCDE y micro-datos de despliegue de plataformas del ecosistema Fulgor IA. Los resultados reflejan promedios de cohorte y pueden variar según el nivel de digitalización previa de cada firma.
              </span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
