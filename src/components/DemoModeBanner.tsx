import React from 'react';
import { AlertTriangle, ShieldAlert, Sparkles, X } from 'lucide-react';

interface DemoModeBannerProps {
  isDemoMode: boolean;
  onDisableDemoMode: () => void;
}

export const DemoModeBanner: React.FC<DemoModeBannerProps> = ({ isDemoMode, onDisableDemoMode }) => {
  if (!isDemoMode) return null;

  return (
    <div 
      id="demo-mode-banner"
      className="w-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 px-4 py-2 text-xs font-bold shadow-lg flex items-center justify-between z-40 border-b border-amber-400"
    >
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-slate-950/20 text-slate-950">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <span className="tracking-wide">
            [MODO DEMO ACTIVADO] — Los datos presentados son sintéticos para fines de simulación y demostración. No constituyen registros empíricos oficiales.
          </span>
        </div>

        <button
          onClick={onDisableDemoMode}
          className="px-2.5 py-0.5 rounded bg-slate-950 text-amber-300 hover:bg-slate-900 text-[11px] font-bold transition-colors whitespace-nowrap"
        >
          Volver a Datos Reales
        </button>
      </div>
    </div>
  );
};
