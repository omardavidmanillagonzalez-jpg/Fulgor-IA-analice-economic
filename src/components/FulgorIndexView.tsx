import React, { useState } from 'react';
import { FulgorAIImpactIndexBreakdown } from '../types/economic';
import { FULGOR_INDEX_RANKINGS } from '../data/economicData';
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
  LineChart, 
  Line 
} from 'recharts';
import { 
  Layers, 
  Sliders, 
  RotateCcw, 
  HelpCircle, 
  Calculator, 
  Sparkles, 
  CheckCircle2, 
  Trophy, 
  FileText 
} from 'lucide-react';

interface FulgorIndexViewProps {
  onOpenCopilotWithPrompt: (prompt: string) => void;
}

export const FulgorIndexView: React.FC<FulgorIndexViewProps> = ({ onOpenCopilotWithPrompt }) => {
  // Custom configurable weights for FAII
  const [wProductivity, setWProductivity] = useState<number>(0.30);
  const [wAdoption, setWAdoption] = useState<number>(0.25);
  const [wCapital, setWCapital] = useState<number>(0.20);
  const [wSkills, setWSkills] = useState<number>(0.15);
  const [wFriction, setWFriction] = useState<number>(0.10);

  const [selectedCountryCode, setSelectedCountryCode] = useState<string>('MX');

  // Recalculate rankings based on weights
  const recalculatedRankings = FULGOR_INDEX_RANKINGS.map((item) => {
    const c = item.components;
    const recalculatedScore = Number((
      (c.productivityLift.value * wProductivity) +
      (c.adoptionVelocity.value * wAdoption) +
      (c.capitalTechIntensity.value * wCapital) +
      (c.humanSkillReadiness.value * wSkills) -
      (c.transitionFrictionPenalty.value * wFriction)
    ).toFixed(1));

    return {
      ...item,
      overallScore: recalculatedScore,
      contributions: {
        prod: (c.productivityLift.value * wProductivity).toFixed(1),
        adop: (c.adoptionVelocity.value * wAdoption).toFixed(1),
        cap: (c.capitalTechIntensity.value * wCapital).toFixed(1),
        skills: (c.humanSkillReadiness.value * wSkills).toFixed(1),
        friction: (c.transitionFrictionPenalty.value * wFriction).toFixed(1),
      }
    };
  }).sort((a, b) => b.overallScore - a.overallScore);

  const selectedItem = recalculatedRankings.find(r => r.countryCode === selectedCountryCode) || recalculatedRankings[0];

  const chartData = recalculatedRankings.map((r, idx) => ({
    name: r.countryName,
    rank: idx + 1,
    faiiScore: r.overallScore,
    code: r.countryCode,
  }));

  const resetWeights = () => {
    setWProductivity(0.30);
    setWAdoption(0.25);
    setWCapital(0.20);
    setWSkills(0.15);
    setWFriction(0.10);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header Banner */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-amber-400" /> FULGOR AI IMPACT INDEX (FAII)
            </span>
            <EpistemicBadge type="MODEL_ESTIMATE" size="sm" />
          </div>
          <h2 className="text-lg font-bold text-slate-100">
            Índice de Impacto Económico Agregado de la Adopción de IA & Tecnología
          </h2>
          <p className="text-xs text-slate-400 max-w-3xl">
            Metodología 100% transparente y configurable. Mide la absorción tecnológica, dividendos de productividad, intensidad de capital y fricciones de transición.
          </p>
        </div>

        <button
          onClick={() => onOpenCopilotWithPrompt(`Explica detalladamente la fórmula del índice FAII (Fulgor AI Impact Index), por qué penaliza las fricciones de transición laboral y cuál es el desglose para ${selectedItem.countryName}.`)}
          className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 text-xs font-semibold rounded-lg transition-colors shrink-0 flex items-center gap-1.5"
        >
          <Sparkles className="w-4 h-4" /> Auditar Metodología con Copilot
        </button>
      </div>

      {/* Formula & Weight Customizer Sandbox */}
      <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
              <Calculator className="w-4 h-4 text-amber-400" />
              Estructura Matemática y Ponderaciones Configurables
            </h3>
            <p className="text-xs text-slate-400">
              Fórmula: <code className="text-amber-300 font-mono text-xs bg-slate-950 px-2 py-0.5 rounded border border-slate-800">FAII = w₁·Productividad + w₂·VelocidadAdopción + w₃·IntensidadCapital + w₄·CapacidadesHumanas - w₅·FricciónTransición</code>
            </p>
          </div>

          <button
            onClick={resetWeights}
            className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Ponderaciones Estándar
          </button>
        </div>

        {/* 5 Weight Sliders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-xs pt-1">
          
          <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-300 font-semibold">w₁ Productividad</span>
              <span className="font-mono font-bold text-emerald-400">{(wProductivity * 100).toFixed(0)}%</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="0.5"
              step="0.05"
              value={wProductivity}
              onChange={(e) => setWProductivity(Number(e.target.value))}
              className="w-full accent-emerald-400 bg-slate-900 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-300 font-semibold">w₂ Adopción</span>
              <span className="font-mono font-bold text-sky-400">{(wAdoption * 100).toFixed(0)}%</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="0.5"
              step="0.05"
              value={wAdoption}
              onChange={(e) => setWAdoption(Number(e.target.value))}
              className="w-full accent-sky-400 bg-slate-900 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-300 font-semibold">w₃ Intensidad Cap.</span>
              <span className="font-mono font-bold text-purple-400">{(wCapital * 100).toFixed(0)}%</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="0.4"
              step="0.05"
              value={wCapital}
              onChange={(e) => setWCapital(Number(e.target.value))}
              className="w-full accent-purple-400 bg-slate-900 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-300 font-semibold">w₄ Habilidades</span>
              <span className="font-mono font-bold text-amber-400">{(wSkills * 100).toFixed(0)}%</span>
            </div>
            <input
              type="range"
              min="0.05"
              max="0.3"
              step="0.05"
              value={wSkills}
              onChange={(e) => setWSkills(Number(e.target.value))}
              className="w-full accent-amber-400 bg-slate-900 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-300 font-semibold">w₅ Fricción (Penaliz.)</span>
              <span className="font-mono font-bold text-rose-400">-{(wFriction * 100).toFixed(0)}%</span>
            </div>
            <input
              type="range"
              min="0.0"
              max="0.25"
              step="0.05"
              value={wFriction}
              onChange={(e) => setWFriction(Number(e.target.value))}
              className="w-full accent-rose-400 bg-slate-900 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

        </div>
      </div>

      {/* Rankings Bar Chart & Detailed Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Overall Rankings Chart */}
        <div className="lg:col-span-7 p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              Ranking de Economías por Índice FAII Recalibrado
            </h3>
            <EpistemicBadge type="MODEL_ESTIMATE" size="sm" />
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis type="number" domain={[0, 100]} stroke="#64748b" fontSize={11} />
                <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={11} width={80} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  formatter={(val: any) => [`${val} pts`, 'Puntuación FAII']}
                />
                <Bar 
                  dataKey="faiiScore" 
                  name="Índice FAII" 
                  fill="#f59e0b" 
                  radius={[0, 4, 4, 0]}
                  onClick={(data: any) => setSelectedCountryCode(data.code)}
                  className="cursor-pointer"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <p className="text-[11px] text-slate-400 text-center">
            Haz clic en cualquier barra para ver el desglose factorial detallado por componentes.
          </p>
        </div>

        {/* Right: Selected Country Factor Breakdown */}
        <div className="lg:col-span-5 p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-xs text-amber-400 font-mono">Desglose Factorial</span>
              <h3 className="font-bold text-slate-100 text-base">{selectedItem.countryName}</h3>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block">Puntaje FAII</span>
              <span className="font-mono font-bold text-xl text-amber-400">{selectedItem.overallScore}</span>
            </div>
          </div>

          {/* Component Bars */}
          <div className="space-y-3 text-xs">
            
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-slate-300">Ganancia de Productividad (Prod)</span>
                <span className="font-mono font-bold text-emerald-400">+{selectedItem.contributions.prod} pts</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${selectedItem.components.productivityLift.value}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-slate-300">Velocidad de Adopción (Adop)</span>
                <span className="font-mono font-bold text-sky-400">+{selectedItem.contributions.adop} pts</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-sky-400 h-full rounded-full" style={{ width: `${selectedItem.components.adoptionVelocity.value}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-slate-300">Intensidad de Capital Tecnológico (Cap)</span>
                <span className="font-mono font-bold text-purple-400">+{selectedItem.contributions.cap} pts</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-purple-400 h-full rounded-full" style={{ width: `${selectedItem.components.capitalTechIntensity.value}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-slate-300">Preparación de Habilidades (Skills)</span>
                <span className="font-mono font-bold text-amber-400">+{selectedItem.contributions.skills} pts</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-amber-400 h-full rounded-full" style={{ width: `${selectedItem.components.humanSkillReadiness.value}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-slate-300">Penalización por Fricción Laboral (Friction)</span>
                <span className="font-mono font-bold text-rose-400">-{selectedItem.contributions.friction} pts</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-rose-400 h-full rounded-full" style={{ width: `${selectedItem.components.transitionFrictionPenalty.value}%` }} />
              </div>
            </div>

          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <span className="font-semibold text-slate-300 block">Metodología de Normalización:</span>
            <p>{selectedItem.methodologyNotes}</p>
          </div>
        </div>

      </div>

    </div>
  );
};
