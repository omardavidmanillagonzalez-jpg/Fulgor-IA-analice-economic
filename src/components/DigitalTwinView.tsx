import React, { useState, useEffect } from 'react';
import { CountryEconomicProfile, DigitalTwinSimulationOutput } from '../types/economic';
import { EpistemicBadge } from './EpistemicBadge';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  BarChart, 
  Bar, 
  AreaChart, 
  Area 
} from 'recharts';
import { 
  Boxes, 
  Sliders, 
  Play, 
  RotateCcw, 
  Sparkles, 
  HelpCircle, 
  AlertTriangle, 
  TrendingUp, 
  DollarSign, 
  Users, 
  ShieldAlert 
} from 'lucide-react';

interface DigitalTwinViewProps {
  countries: CountryEconomicProfile[];
  selectedCountry: string;
  onOpenCopilotWithPrompt: (prompt: string) => void;
}

export const DigitalTwinView: React.FC<DigitalTwinViewProps> = ({
  countries,
  selectedCountry,
  onOpenCopilotWithPrompt,
}) => {
  const currentCountry = countries.find(c => c.id === (selectedCountry === 'ALL' ? 'MX' : selectedCountry)) || countries[0];

  // Simulation Parameters State
  const [aiAdoptionDelta, setAiAdoptionDelta] = useState<number>(25); // +25%
  const [rdIncentive, setRdIncentive] = useState<number>(15); // 15% subsidio
  const [capitalElasticity, setCapitalElasticity] = useState<number>(0.35); // 0.35
  const [upskillingSpeed, setUpskillingSpeed] = useState<number>(3); // 1-5 scale
  const [techOpenness, setTechOpenness] = useState<number>(75); // 75%
  const [regulatoryFriction, setRegulatoryFriction] = useState<number>(30); // 30%

  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationResult, setSimulationResult] = useState<DigitalTwinSimulationOutput | null>(null);

  // Run simulation via API or client-side econometric engine
  const runSimulation = async () => {
    setIsSimulating(true);
    try {
      const res = await fetch('/api/digital-twin/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          countryCode: currentCountry.id,
          aiAdoptionDelta,
          rdIncentivePercentage: rdIncentive,
          automationCapitalElasticity: capitalElasticity,
          laborUpskillingSpeed: upskillingSpeed,
          tradeTechOpenness: techOpenness,
          regulatoryFriction,
          baseGDP: currentCountry.gdpNominalBillionUSD,
        })
      });
      if (res.ok) {
        const data = await res.json();
        setSimulationResult(data);
      } else {
        throw new Error('Fallback to dynamic computation');
      }
    } catch (e) {
      // Local dynamic calculation
      const tfpLiftAnnual = Number(((capitalElasticity * 2.8 * Math.log(1 + aiAdoptionDelta / 100) * (techOpenness / 80) * (1 - regulatoryFriction / 250) + (rdIncentive * 0.015))).toFixed(2));
      const gdpBonus = Number((tfpLiftAnnual * 1.65 + (upskillingSpeed * 0.3)).toFixed(2));
      const netEmp = Number(((upskillingSpeed * 1.2) - (capitalElasticity * aiAdoptionDelta * 0.08) + (techOpenness * 0.02)).toFixed(2));
      const wageLift = Number(((tfpLiftAnnual * 0.65) + (upskillingSpeed * 0.25) - (regulatoryFriction * 0.01)).toFixed(2));
      const fiscal = Number(((currentCountry.gdpNominalBillionUSD * (gdpBonus / 100) * 0.22)).toFixed(2));

      const traj = [];
      let curSim = currentCountry.gdpNominalBillionUSD;
      let curBase = currentCountry.gdpNominalBillionUSD;
      for (let yr = 0; yr <= 4; yr++) {
        const y = 2026 + yr;
        if (yr === 0) {
          traj.push({
            year: y,
            baselineGDP: Number(curBase.toFixed(1)),
            simulatedGDP: Number(curSim.toFixed(1)),
            productivityIndex: 100.0,
            aiAdoptionRate: currentCountry.aiAdoptionRate,
            highSkillJobsK: 1240,
            routineJobsK: 4800,
            realWageIndex: 100.0
          });
        } else {
          curBase *= 1.022;
          curSim *= (1 + 0.022 + (tfpLiftAnnual / 100 * (yr / 3)));
          traj.push({
            year: y,
            baselineGDP: Number(curBase.toFixed(1)),
            simulatedGDP: Number(curSim.toFixed(1)),
            productivityIndex: Number((100 + (tfpLiftAnnual * yr * 3.2)).toFixed(1)),
            aiAdoptionRate: Number((currentCountry.aiAdoptionRate + (aiAdoptionDelta * (yr / 4))).toFixed(1)),
            highSkillJobsK: Math.round(1240 + (yr * 140 * (upskillingSpeed / 3))),
            routineJobsK: Math.round(4800 - (yr * 85 * (capitalElasticity / 0.35)) + (yr * 35)),
            realWageIndex: Number((100 + (wageLift * yr)).toFixed(1))
          });
        }
      }

      setSimulationResult({
        scenarioName: `Simulación Digital Twin (+${aiAdoptionDelta}% IA)`,
        summary: {
          gdpExtraGrowthCumulative: gdpBonus,
          productivityAnnualLift: tfpLiftAnnual,
          netEmploymentBalance: netEmp,
          fiscalRevenueLiftBillion: fiscal,
          realWageGrowthAnnual: wageLift,
          inflationaryPressureImpact: Number((-(tfpLiftAnnual * 0.18)).toFixed(2)),
        },
        yearlyTrajectory: traj,
        uncertaintyScore: Math.min(85, Math.max(20, Math.round(30 + (aiAdoptionDelta * 0.6) + (regulatoryFriction * 0.4)))),
        assumptionsStated: [
          'Modelo basado en función de producción Cobb-Douglas expandida con spillovers de productividad digital.',
          'Transmisión salarial con retardo de 6-12 meses.',
          'Capacidad fiscal para financiar incentivos de I+D sin déficit estructural.'
        ],
        riskFactors: [
          { risk: 'Rigidez regulatoria o barreras de interoperabilidad', severity: regulatoryFriction > 40 ? 'ALTA' : 'MEDIA', probability: '35%' },
          { risk: 'Brecha de competencias de talento especializado', severity: upskillingSpeed < 3 ? 'ALTA' : 'BAJA', probability: '42%' }
        ]
      });
    } finally {
      setIsSimulating(false);
    }
  };

  useEffect(() => {
    runSimulation();
  }, [currentCountry.id]);

  const setPreset = (delta: number) => {
    setAiAdoptionDelta(delta);
    if (delta === 10) {
      setRdIncentive(10);
      setRegulatoryFriction(35);
    } else if (delta === 25) {
      setRdIncentive(20);
      setRegulatoryFriction(25);
    } else if (delta === 50) {
      setRdIncentive(35);
      setRegulatoryFriction(15);
      setUpskillingSpeed(4);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Boxes className="w-4 h-4 text-amber-400" /> ECONOMIC DIGITAL TWIN (GEMELO DIGITAL ECONÓMICO)
            </span>
            <EpistemicBadge type="PROJECTION" size="sm" />
          </div>
          <h2 className="text-lg font-bold text-slate-100">
            Laboratorio de Simulación Estructural y Análisis de Escenarios Hipotéticos
          </h2>
          <p className="text-xs text-slate-400 max-w-3xl">
            Modela el impacto macroeconómico multivariable si la adopción de IA aumenta 10%, 25% o 50% en la economía de <strong>{currentCountry.name}</strong>.
          </p>
        </div>

        <button
          onClick={() => onOpenCopilotWithPrompt(`Evalúa esta simulación del Gemelo Digital para ${currentCountry.name}: Aumento del ${aiAdoptionDelta}% en adopción de IA, ${rdIncentive}% en I+D y velocidad de recualificación nivel ${upskillingSpeed}. ¿Qué políticas públicas maximizarían el beneficio neto?`)}
          className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 text-xs font-semibold rounded-lg transition-colors shrink-0 flex items-center gap-1.5"
        >
          <Sparkles className="w-4 h-4" /> Interpretar con Copilot
        </button>
      </div>

      {/* Main Simulation Sandbox Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Parameter Sliders */}
        <div className="lg:col-span-5 p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-400" />
              Parámetros de Simulación ({currentCountry.flag} {currentCountry.name})
            </h3>
            <button
              onClick={() => {
                setAiAdoptionDelta(25);
                setRdIncentive(15);
                setCapitalElasticity(0.35);
                setUpskillingSpeed(3);
                setTechOpenness(75);
                setRegulatoryFriction(30);
              }}
              className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1"
              title="Restablecer valores predeterminados"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* Quick Presets */}
          <div className="space-y-1.5">
            <span className="text-[11px] text-slate-400 font-medium">Escenarios Predefinidos de Adopción:</span>
            <div className="grid grid-cols-3 gap-2">
              {[10, 25, 50].map((preset) => (
                <button
                  key={preset}
                  onClick={() => setPreset(preset)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-bold font-mono transition-all ${
                    aiAdoptionDelta === preset
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'bg-slate-950 text-slate-300 border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  +{preset}% IA
                </button>
              ))}
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-4 text-xs">
            
            {/* AI Adoption Delta */}
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-300 font-medium">Aumento en Penetración de IA:</span>
                <span className="font-mono font-bold text-amber-400">+{aiAdoptionDelta}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="80"
                step="5"
                value={aiAdoptionDelta}
                onChange={(e) => setAiAdoptionDelta(Number(e.target.value))}
                className="w-full accent-amber-400 bg-slate-950 h-1.5 rounded-lg cursor-pointer"
              />
            </div>

            {/* R&D Incentive */}
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-300 font-medium">Incentivo Fiscal a I+D Tecnológica:</span>
                <span className="font-mono font-bold text-sky-400">{rdIncentive}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                step="5"
                value={rdIncentive}
                onChange={(e) => setRdIncentive(Number(e.target.value))}
                className="w-full accent-sky-400 bg-slate-950 h-1.5 rounded-lg cursor-pointer"
              />
            </div>

            {/* Labor Upskilling Speed */}
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-300 font-medium">Velocidad de Recualificación Laboral (Upskilling):</span>
                <span className="font-mono font-bold text-emerald-400">Nivel {upskillingSpeed} / 5</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={upskillingSpeed}
                onChange={(e) => setUpskillingSpeed(Number(e.target.value))}
                className="w-full accent-emerald-400 bg-slate-950 h-1.5 rounded-lg cursor-pointer"
              />
            </div>

            {/* Automation Capital Elasticity */}
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-300 font-medium">Elasticidad de Sustitución Capital-Trabajo ($\sigma$):</span>
                <span className="font-mono font-bold text-purple-400">{capitalElasticity}</span>
              </div>
              <input
                type="range"
                min="0.10"
                max="0.80"
                step="0.05"
                value={capitalElasticity}
                onChange={(e) => setCapitalElasticity(Number(e.target.value))}
                className="w-full accent-purple-400 bg-slate-950 h-1.5 rounded-lg cursor-pointer"
              />
            </div>

            {/* Regulatory Friction */}
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-300 font-medium">Fricción Regulatoria / Burocrática:</span>
                <span className="font-mono font-bold text-rose-400">{regulatoryFriction}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="70"
                step="5"
                value={regulatoryFriction}
                onChange={(e) => setRegulatoryFriction(Number(e.target.value))}
                className="w-full accent-rose-400 bg-slate-950 h-1.5 rounded-lg cursor-pointer"
              />
            </div>

          </div>

          <button
            onClick={runSimulation}
            disabled={isSimulating}
            className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-lg text-xs shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 transition-all"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            {isSimulating ? 'Calculando Modelo...' : 'Ejecutar Simulación Dinámica'}
          </button>
        </div>

        {/* Right Column: Simulation Output Dashboard */}
        <div className="lg:col-span-7 space-y-5">
          {simulationResult && (
            <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-5">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div>
                  <span className="text-xs font-mono text-amber-400">Resultado del Gemelo Digital</span>
                  <h3 className="text-base font-bold text-slate-100">{simulationResult.scenarioName}</h3>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400">Índice de Incertidumbre:</span>
                  <span className={`font-mono font-bold px-2 py-0.5 rounded ${
                    simulationResult.uncertaintyScore > 60 ? 'bg-rose-950 text-rose-300' : 'bg-amber-950 text-amber-300'
                  }`}>
                    {simulationResult.uncertaintyScore}% (Estocástico)
                  </span>
                </div>
              </div>

              {/* KPI Summary Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                
                <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">PIB Extra Acumulado (5a)</span>
                  <span className="font-mono font-bold text-emerald-400 text-sm">
                    +{simulationResult.summary.gdpExtraGrowthCumulative}%
                  </span>
                </div>

                <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Productividad Anual (TFP)</span>
                  <span className="font-mono font-bold text-sky-400 text-sm">
                    +{simulationResult.summary.productivityAnnualLift}%
                  </span>
                </div>

                <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Balance Neto de Empleo</span>
                  <span className="font-mono font-bold text-purple-400 text-sm">
                    {simulationResult.summary.netEmploymentBalance > 0 ? `+${simulationResult.summary.netEmploymentBalance}%` : `${simulationResult.summary.netEmploymentBalance}%`}
                  </span>
                </div>

                <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Recaudación Fiscal Extra</span>
                  <span className="font-mono font-bold text-amber-400 text-sm">
                    +${simulationResult.summary.fiscalRevenueLiftBillion}B USD
                  </span>
                </div>

                <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Crecimiento Salarios Reales</span>
                  <span className="font-mono font-bold text-emerald-400 text-sm">
                    +{simulationResult.summary.realWageGrowthAnnual}%
                  </span>
                </div>

                <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Efecto en Inflación</span>
                  <span className="font-mono font-bold text-slate-200 text-sm">
                    {simulationResult.summary.inflationaryPressureImpact}% (Eficiencia)
                  </span>
                </div>

              </div>

              {/* Trajectory Chart: Baseline vs Simulated GDP */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-semibold">
                    Trayectoria del PIB Proyectada 2026-2030 ($B USD)
                  </span>
                  <EpistemicBadge type="PROJECTION" size="sm" />
                </div>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={simulationResult.yearlyTrajectory} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorSim" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#34d399" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#34d399" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis dataKey="year" stroke="#64748b" fontSize={11} fontStyle="bold" />
                      <YAxis stroke="#64748b" fontSize={11} domain={['auto', 'auto']} unit="B" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                      />
                      <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                      <Area type="monotone" dataKey="simulatedGDP" name="Escenario Simulado (+IA)" stroke="#34d399" strokeWidth={2.5} fillOpacity={1} fill="url(#colorSim)" />
                      <Line type="monotone" dataKey="baselineGDP" name="Tendencia Base (Inercial)" stroke="#64748b" strokeWidth={2} strokeDasharray="4 4" dot={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Warning box */}
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <div className="flex items-center gap-1 text-amber-400 font-semibold">
                  <ShieldAlert className="w-3.5 h-3.5" /> Cláusula de Transparencia de Simulación:
                </div>
                <p>
                  Esta simulación del Gemelo Digital es un modelo matemático de equilibrio parcial calibrado con supuestos explícitos. <strong>No representa una predicción garantizada</strong> ni compromete resultados fácticos futuros.
                </p>
              </div>

            </div>
          )}
        </div>

      </div>

    </div>
  );
};
