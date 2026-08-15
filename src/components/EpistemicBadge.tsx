import React from 'react';
import { EpistemicType } from '../types/economic';
import { ShieldCheck, GitCompare, Calculator, Sparkles, TrendingUp, Info } from 'lucide-react';

interface EpistemicBadgeProps {
  type: EpistemicType;
  size?: 'sm' | 'md' | 'lg';
  showDetail?: boolean;
}

export const EPISTEMIC_CONFIG: Record<EpistemicType, {
  label: string;
  shortLabel: string;
  description: string;
  colorClass: string;
  bgClass: string;
  borderClass: string;
  icon: React.ReactNode;
}> = {
  OBSERVED_DATA: {
    label: 'DATO OBSERVADO (FACTUAL)',
    shortLabel: 'OBSERVADO',
    description: 'Dato empírico verificado por agencia oficial (INEGI, FRED, Eurostat, Banco Mundial). Sin inferencia.',
    colorClass: 'text-emerald-400',
    bgClass: 'bg-emerald-950/40',
    borderClass: 'border-emerald-500/40',
    icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
  },
  CORRELATION: {
    label: 'CORRELACIÓN ESTADÍSTICA',
    shortLabel: 'CORRELACIÓN',
    description: 'Asociación numérica entre variables (r). Recordatorio: La correlación NO demuestra causalidad.',
    colorClass: 'text-amber-400',
    bgClass: 'bg-amber-950/40',
    borderClass: 'border-amber-500/40',
    icon: <GitCompare className="w-3.5 h-3.5 text-amber-400" />
  },
  MODEL_ESTIMATE: {
    label: 'ESTIMACIÓN MODELADA',
    shortLabel: 'ESTIMACIÓN',
    description: 'Resultado de modelo econométrico/estadístico condicional a especificación paramétrica (R², Beta).',
    colorClass: 'text-sky-400',
    bgClass: 'bg-sky-950/40',
    borderClass: 'border-sky-500/40',
    icon: <Calculator className="w-3.5 h-3.5 text-sky-400" />
  },
  CAUSAL_INFERENCE: {
    label: 'INFERENCIA CAUSAL (DiD/IV)',
    shortLabel: 'CAUSALIDAD ESTIMADA',
    description: 'Estimación cuasi-experimental con grupo de control (Difference-in-Differences, controles sintéticos).',
    colorClass: 'text-purple-400',
    bgClass: 'bg-purple-950/40',
    borderClass: 'border-purple-500/40',
    icon: <Sparkles className="w-3.5 h-3.5 text-purple-400" />
  },
  PROJECTION: {
    label: 'PRONÓSTICO PROBABILÍSTICO',
    shortLabel: 'PRONÓSTICO',
    description: 'Proyección estocástica basada en escenarios futuros. Sujeto a incertidumbre intrínseca.',
    colorClass: 'text-rose-400',
    bgClass: 'bg-rose-950/40',
    borderClass: 'border-rose-500/40',
    icon: <TrendingUp className="w-3.5 h-3.5 text-rose-400" />
  }
};

export const EpistemicBadge: React.FC<EpistemicBadgeProps> = ({ 
  type, 
  size = 'md',
  showDetail = false 
}) => {
  const config = EPISTEMIC_CONFIG[type] || EPISTEMIC_CONFIG.OBSERVED_DATA;

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-2'
  }[size];

  return (
    <div className="inline-flex flex-col group relative">
      <span 
        id={`epistemic-badge-${type.toLowerCase()}`}
        className={`inline-flex items-center font-mono font-medium rounded-md border ${config.bgClass} ${config.borderClass} ${config.colorClass} ${sizeClasses} transition-all duration-150 cursor-help shadow-xs`}
        title={config.description}
      >
        {config.icon}
        <span className="tracking-wide">{showDetail ? config.label : config.shortLabel}</span>
        <Info className="w-2.5 h-2.5 opacity-60 ml-0.5" />
      </span>
    </div>
  );
};
