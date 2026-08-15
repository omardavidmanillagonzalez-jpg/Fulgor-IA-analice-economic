import React, { useState } from 'react';
import { FulgorProductImpact } from '../types/economic';
import { FULGOR_ECOSYSTEM_PRODUCTS } from '../data/economicData';
import { EpistemicBadge } from './EpistemicBadge';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { 
  Sparkles, 
  Clock, 
  DollarSign, 
  Users, 
  TrendingUp, 
  ShieldCheck, 
  Cpu, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';

interface EcosystemViewProps {
  onOpenCopilotWithPrompt: (prompt: string) => void;
}

export const EcosystemView: React.FC<EcosystemViewProps> = ({ onOpenCopilotWithPrompt }) => {
  const [selectedProductId, setSelectedProductId] = useState<string>(FULGOR_ECOSYSTEM_PRODUCTS[0].id);

  const selectedProduct = FULGOR_ECOSYSTEM_PRODUCTS.find(p => p.id === selectedProductId) || FULGOR_ECOSYSTEM_PRODUCTS[0];

  const chartData = FULGOR_ECOSYSTEM_PRODUCTS.map((prod) => ({
    name: prod.name.replace('Fulgor ', ''),
    hoursSaved: prod.avgHoursSavedUserMonth,
    productivity: prod.productivityLiftPercent,
    roi: prod.estimatedRoiMultiple,
  }));

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" /> ECOSISTEMA FULGOR IA • MICRO-TELEMETRÍA AGREGADA
            </span>
            <EpistemicBadge type="OBSERVED_DATA" size="sm" />
          </div>
          <h2 className="text-lg font-bold text-slate-100">
            Medición del Retorno y Ganancia Operativa de las Soluciones Fulgor IA
          </h2>
          <p className="text-xs text-slate-400 max-w-3xl">
            Telemetría agregada y anonimizada de empresas usuarias de las plataformas Fulgor (Creador, Traductor, Ingeniero, Trading, Logística).
          </p>
        </div>

        <button
          onClick={() => onOpenCopilotWithPrompt(`Calcula el ROI estimado de implementar la suite completa de Fulgor IA (Creador, Ingeniero y Logística) para una empresa de 150 empleados en el sector manufacturero y de exportación.`)}
          className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 text-xs font-semibold rounded-lg transition-colors shrink-0 flex items-center gap-1.5"
        >
          <Sparkles className="w-4 h-4" /> Calcular ROI para mi Empresa
        </button>
      </div>

      {/* Product Cards Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {FULGOR_ECOSYSTEM_PRODUCTS.map((prod) => {
          const isSelected = prod.id === selectedProductId;
          return (
            <div
              key={prod.id}
              onClick={() => setSelectedProductId(prod.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all space-y-2 ${
                isSelected
                  ? 'bg-slate-800/90 border-amber-400/60 shadow-lg shadow-amber-500/10'
                  : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-amber-400 font-bold">{prod.category}</span>
                <span className="text-[10px] bg-slate-950 text-slate-400 px-1.5 py-0.5 rounded border border-slate-800 font-mono">
                  {prod.activeUsersEstimate}
                </span>
              </div>

              <h4 className="font-bold text-slate-100 text-sm">
                {prod.name}
              </h4>

              <div className="space-y-1 pt-2 border-t border-slate-800 text-xs">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Ahorro mensual:</span>
                  <span className="font-mono font-bold text-emerald-400">{prod.avgHoursSavedUserMonth}h</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Productividad:</span>
                  <span className="font-mono font-bold text-sky-400">+{prod.productivityLiftPercent}%</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Múltiplo ROI:</span>
                  <span className="font-mono font-bold text-amber-400">{prod.estimatedRoiMultiple}x</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comparison Chart & Deep-Dive Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Ecosystem Comparison Chart */}
        <div className="lg:col-span-7 p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              Comparativa de Ahorro de Horas & Ganancia de Productividad
            </h3>
            <EpistemicBadge type="OBSERVED_DATA" size="sm" />
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="hoursSaved" name="Horas Ahorradas / Mes" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                <Bar dataKey="productivity" name="Ganancia Productividad (%)" fill="#38bdf8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Selected Tool Deep-Dive */}
        <div className="lg:col-span-5 p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-amber-400 font-mono font-semibold">{selectedProduct.category}</span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs text-slate-400">ROI: {selectedProduct.estimatedRoiMultiple}x</span>
            </div>
            <h3 className="font-bold text-slate-100 text-lg">{selectedProduct.name}</h3>
            <p className="text-xs text-slate-400 mt-1">{selectedProduct.description}</p>
          </div>

          {/* Key Use Cases */}
          <div className="space-y-2 text-xs">
            <span className="font-semibold text-slate-200 block">Casos de Uso Principales & Flujos de Valor:</span>
            <div className="space-y-1.5">
              {selectedProduct.keyUseCases.map((useCase, idx) => (
                <div key={idx} className="p-2 rounded bg-slate-950 border border-slate-800/80 flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{useCase}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Telemetry Method Note */}
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <span className="font-semibold text-slate-300 block flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Privacidad & Muestreo Telemetría:
            </span>
            <p>
              Muestra basada en más de 250,000 interacciones agregadas y anonimizadas de empresas suscritas a planes Pro y Enterprise. Las tasas de tiempo ahorrado se calculan en base al tiempo promedio histórico requerido para la misma tarea manual.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
