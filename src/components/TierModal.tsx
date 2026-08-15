import React, { useState } from 'react';
import { X, Check, KeyRound, Sparkles, Shield, Zap, Building2, Copy } from 'lucide-react';
import { UserPlanTier } from '../types/economic';

interface TierModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTier: UserPlanTier;
  onSelectTier: (tier: UserPlanTier) => void;
}

export const TierModal: React.FC<TierModalProps> = ({
  isOpen,
  onClose,
  currentTier,
  onSelectTier,
}) => {
  const [copiedApiKey, setCopiedApiKey] = useState(false);
  const mockApiKey = 'flg_sec_live_99a84b3e02f1889c09d_prod';

  if (!isOpen) return null;

  const tiers = [
    {
      id: 'FREE' as UserPlanTier,
      name: 'Free Starter',
      price: '$0',
      period: 'por siempre',
      description: 'Acceso esencial a indicadores macroeconómicos oficiales y series históricas básicas.',
      features: [
        'Indicadores macroeconómicos principales',
        'Series históricas de hasta 3 años',
        'Visualización de gráficos estándar',
        'AI Copilot (5 consultas diarias)',
        'Epistemic Badges básicos'
      ],
      badge: 'Básico',
      isPopular: false,
    },
    {
      id: 'PRO' as UserPlanTier,
      name: 'Pro Analicer',
      price: '$49',
      period: 'USD / mes',
      description: 'Para analistas, consultores e investigadores que requieren inferencia causal e impacto de IA.',
      features: [
        'Todas las funciones Free',
        'Laboratorio de Inferencia Causal (DiD)',
        'Gemelo Digital (hasta 50 simulaciones/mes)',
        'Pronósticos probabilísticos a 3 años',
        'AI Copilot ilimitado con Gemini 2.5 Pro',
        'Exportación de reportes en PDF y CSV'
      ],
      badge: 'Recomendado',
      isPopular: true,
    },
    {
      id: 'PRO_MAX' as UserPlanTier,
      name: 'Pro Max Intelligence',
      price: '$199',
      period: 'USD / mes',
      description: 'Para directivos, fondos de inversión y equipos de estrategia corporativa de alto rendimiento.',
      features: [
        'Todas las funciones Pro',
        'Simulaciones ilimitadas en Gemelo Digital',
        'Sistema de Alertas Tempranas en tiempo real',
        'API REST para consumo programático',
        'Desglose completo del Índice FAII factorial',
        'Auditoría y trazabilidad de datos avanzada'
      ],
      badge: 'Avanzado',
      isPopular: false,
    },
    {
      id: 'ENTERPRISE' as UserPlanTier,
      name: 'Enterprise / Gov',
      price: 'Personalizado',
      period: 'anual',
      description: 'Para instituciones gubernamentales, bancos centrales y corporativos multinacionales.',
      features: [
        'Todo lo de Pro Max',
        'Modelos econométricos a la medida',
        'Integración directa con Data Lakes / SQL',
        'SLA 99.9% y soporte metodológico dedicado',
        'Despliegue on-premise o nube privada',
        'Capacitación y consultoría con economistas'
      ],
      badge: 'Corporativo',
      isPopular: false,
    },
  ];

  const handleCopyKey = () => {
    navigator.clipboard.writeText(mockApiKey);
    setCopiedApiKey(true);
    setTimeout(() => setCopiedApiKey(false), 2000);
  };

  return (
    <div 
      id="tier-modal-backdrop"
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
    >
      <div 
        id="tier-modal"
        className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-8"
      >
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
              <KeyRound className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-base">Planes de Suscripción & Acceso a la API</h3>
              <p className="text-xs text-slate-400">Selecciona el nivel de acceso para desbloquear capacidades analíticas avanzadas.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-100 rounded-md hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tiers Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {tiers.map((tier) => {
            const isCurrent = currentTier === tier.id;
            return (
              <div
                key={tier.id}
                className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 transition-all relative ${
                  tier.isPopular 
                    ? 'bg-slate-950/90 border-amber-500/50 shadow-lg shadow-amber-500/10' 
                    : 'bg-slate-950/50 border-slate-800'
                }`}
              >
                {tier.isPopular && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider">
                    Más Popular
                  </span>
                )}

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-100 text-sm">{tier.name}</span>
                    <span className="text-[10px] font-mono text-slate-400 border border-slate-800 px-1.5 py-0.5 rounded">
                      {tier.badge}
                    </span>
                  </div>

                  <div className="pt-2">
                    <span className="font-mono font-extrabold text-2xl text-slate-100">{tier.price}</span>
                    <span className="text-xs text-slate-400 font-normal"> /{tier.period}</span>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-relaxed min-h-[40px]">
                    {tier.description}
                  </p>

                  <div className="space-y-2 pt-3 border-t border-slate-800/80">
                    <span className="text-[11px] font-semibold text-slate-300 block">Incluye:</span>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {tier.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-[11px]">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="text-slate-300">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onSelectTier(tier.id);
                    onClose();
                  }}
                  className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${
                    isCurrent
                      ? 'bg-slate-800 text-amber-400 border border-slate-700 cursor-default'
                      : tier.isPopular
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                  }`}
                >
                  {isCurrent ? 'Plan Actual' : `Cambiar a ${tier.name}`}
                </button>
              </div>
            );
          })}
        </div>

        {/* API Credentials Management Section */}
        <div className="p-5 border-t border-slate-800 bg-slate-950/80 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h4 className="font-bold text-slate-200 text-xs flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" /> Clave de API para Integraciones Externas (SDK & REST)
              </h4>
              <p className="text-[11px] text-slate-400">
                Usa tu API key en encabezados HTTP: <code className="text-amber-300">Authorization: Bearer YOUR_API_KEY</code>
              </p>
            </div>

            <button
              onClick={handleCopyKey}
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto"
            >
              {copiedApiKey ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Copiada
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Copiar API Key
                </>
              )}
            </button>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-amber-400 flex items-center justify-between overflow-x-auto">
            <span>{mockApiKey}</span>
            <span className="text-[10px] text-slate-500 ml-4 shrink-0 font-sans">Permisos: Read Indicators, Run Digital Twin</span>
          </div>
        </div>

      </div>
    </div>
  );
};
