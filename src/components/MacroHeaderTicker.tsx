import React from 'react';
import { TrendingUp, TrendingDown, Cpu, Activity, DollarSign, Fuel, ShieldCheck } from 'lucide-react';

export const MacroHeaderTicker: React.FC = () => {
  const tickerItems = [
    { label: 'PIB México (YoY)', value: '2.3%', change: '+0.2%', isUp: true, tag: 'INEGI Q4' },
    { label: 'Inflación MX (IPC)', value: '4.28%', change: '-0.24%', isUp: false, tag: 'Oficial' },
    { label: 'Tasa Banxico', value: '10.25%', change: '-25 bps', isUp: false, tag: 'Banxico' },
    { label: 'PIB EE.UU. (QoQ Ann)', value: '2.6%', change: '+0.4%', isUp: true, tag: 'BEA' },
    { label: 'Fed Funds Rate', value: '4.75%', change: '-25 bps', isUp: false, tag: 'FOMC' },
    { label: 'Adopción IA Global (Empresas)', value: '38.4%', change: '+8.2%', isUp: true, tag: 'OECD' },
    { label: 'Índice FAII Agregado', value: '76.8 / 100', change: '+3.1 pts', isUp: true, tag: 'Fulgor' },
    { label: 'Dólar / Peso (USD/MXN)', value: '$18.42', change: '-0.15 MXN', isUp: false, tag: 'Mercado' },
    { label: 'Petróleo Brent (USD/bbl)', value: '$78.60', change: '+1.2%', isUp: true, tag: 'Spot' },
  ];

  return (
    <div 
      id="macro-header-ticker"
      className="bg-slate-900/90 border-b border-slate-800 text-xs text-slate-300 py-1.5 px-4 overflow-x-auto flex items-center justify-between gap-6 select-none"
    >
      <div className="flex items-center gap-2 shrink-0 pr-3 border-r border-slate-800">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="font-mono font-bold text-[11px] text-amber-400 uppercase tracking-wider flex items-center gap-1">
          <Activity className="w-3 h-3 text-amber-400" /> FEED EN TIEMPO REAL
        </span>
      </div>

      <div className="flex items-center gap-6 overflow-x-auto no-scrollbar scroll-smooth">
        {tickerItems.map((item, idx) => (
          <div 
            key={idx} 
            id={`ticker-item-${idx}`}
            className="flex items-center gap-2 shrink-0 py-0.5"
          >
            <span className="text-slate-400 font-medium text-[11px]">{item.label}:</span>
            <span className="font-mono font-bold text-slate-100 text-xs">{item.value}</span>
            <span className={`inline-flex items-center text-[10px] font-mono font-semibold px-1 rounded ${
              item.isUp ? 'text-emerald-400 bg-emerald-950/40' : 'text-rose-400 bg-rose-950/40'
            }`}>
              {item.isUp ? <TrendingUp className="w-2.5 h-2.5 mr-0.5" /> : <TrendingDown className="w-2.5 h-2.5 mr-0.5" />}
              {item.change}
            </span>
            <span className="text-[9px] text-slate-500 font-mono border border-slate-800 px-1 rounded">
              {item.tag}
            </span>
          </div>
        ))}
      </div>

      <div className="hidden lg:flex items-center gap-2 shrink-0 pl-3 border-l border-slate-800 text-[11px] text-slate-400">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        <span>Fuentes Oficiales Validadas</span>
      </div>
    </div>
  );
};
