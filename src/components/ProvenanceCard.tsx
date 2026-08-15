import React from 'react';
import { DataSourceProvenance } from '../types/economic';
import { Database, CheckCircle, ExternalLink, Calendar, Layers, Activity } from 'lucide-react';

interface ProvenanceCardProps {
  provenance: DataSourceProvenance;
  compact?: boolean;
}

export const ProvenanceCard: React.FC<ProvenanceCardProps> = ({ provenance, compact = false }) => {
  return (
    <div 
      id={`provenance-${provenance.agency.replace(/\s+/g, '-').toLowerCase()}`}
      className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 text-xs space-y-2"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Database className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-semibold text-slate-100">{provenance.sourceName}</span>
          {provenance.isOfficial && (
            <span className="flex items-center gap-1 text-[10px] bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.5 rounded">
              <CheckCircle className="w-2.5 h-2.5" /> Oficial
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-slate-400">Confiabilidad:</span>
          <span className={`font-mono font-bold text-xs ${provenance.confidenceScore >= 95 ? 'text-emerald-400' : 'text-amber-400'}`}>
            {provenance.confidenceScore}%
          </span>
        </div>
      </div>

      <p className="text-[11px] text-slate-400 leading-relaxed">
        <strong className="text-slate-300">Dataset:</strong> {provenance.datasetName}
      </p>

      {!compact && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 border-t border-slate-800/80 text-[11px] text-slate-400">
          <div>
            <span className="text-slate-500 block text-[10px]">Corte de Datos</span>
            <span className="font-mono text-slate-300 flex items-center gap-1 mt-0.5">
              <Calendar className="w-3 h-3 text-slate-500" /> {provenance.cutoffDate}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">Frecuencia</span>
            <span className="font-mono text-slate-300 flex items-center gap-1 mt-0.5">
              <Layers className="w-3 h-3 text-slate-500" /> {provenance.frequency}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">Error Estándar (SE)</span>
            <span className="font-mono text-slate-300 flex items-center gap-1 mt-0.5">
              <Activity className="w-3 h-3 text-slate-500" /> {provenance.standardError ? `±${provenance.standardError}` : 'N/A'}
            </span>
          </div>
        </div>
      )}

      {!compact && provenance.methodology && (
        <div className="text-[10px] text-slate-400 bg-slate-950/60 p-2 rounded border border-slate-800/60">
          <span className="font-semibold text-slate-300">Metodología: </span>
          {provenance.methodology}
        </div>
      )}

      {provenance.verificationUrl && (
        <div className="flex justify-end pt-1">
          <a
            href={provenance.verificationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 transition-colors"
          >
            Verificar en fuente oficial <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}
    </div>
  );
};
