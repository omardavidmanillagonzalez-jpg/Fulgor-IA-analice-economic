import { DataSourceProvenance, EpistemicType } from '../types/economic';

export interface EpistemicVerificationSeal {
  sealId: string;
  category: EpistemicType;
  label: string;
  badgeColorHex: string;
  badgeBorderHex: string;
  bgHex: string;
  ruleExplanation: string;
  evidenceRequirement: string;
}

export const EPISTEMIC_SEALS: Record<EpistemicType, EpistemicVerificationSeal> = {
  OBSERVED_DATA: {
    sealId: 'SEAL_OBS_01',
    category: 'OBSERVED_DATA',
    label: '🟢 DATO OBSERVADO',
    badgeColorHex: '#10b981',
    badgeBorderHex: 'rgba(16, 185, 129, 0.4)',
    bgHex: 'rgba(16, 185, 129, 0.1)',
    ruleExplanation: 'Registro empírico publicado por organismo oficial con metodología abierta y fecha de corte auditada.',
    evidenceRequirement: 'Identificador oficial de serie, URL institucional y ficha técnica.'
  },
  CORRELATION: {
    sealId: 'SEAL_CORR_02',
    category: 'CORRELATION',
    label: '🔵 CORRELACIÓN ESTADÍSTICA',
    badgeColorHex: '#38bdf8',
    badgeBorderHex: 'rgba(56, 189, 248, 0.4)',
    bgHex: 'rgba(56, 189, 248, 0.1)',
    ruleExplanation: 'Asociación matemática entre dos variables (Pearson / Spearman). No demuestra causalidad.',
    evidenceRequirement: 'Coeficiente de correlación (r), p-valor y matriz de dispersión.'
  },
  MODEL_ESTIMATE: {
    sealId: 'SEAL_MOD_03',
    category: 'MODEL_ESTIMATE',
    label: '🟠 ESTIMACIÓN MODELADA',
    badgeColorHex: '#f59e0b',
    badgeBorderHex: 'rgba(245, 158, 11, 0.4)',
    bgHex: 'rgba(245, 158, 11, 0.1)',
    ruleExplanation: 'Resultado de regresión econométrica (OLS, panel, series de tiempo) condicionado a supuestos.',
    evidenceRequirement: 'Ecuación formal, parámetros Beta, R² ajustado y errores estándar robustos.'
  },
  CAUSAL_INFERENCE: {
    sealId: 'SEAL_CAUS_04',
    category: 'CAUSAL_INFERENCE',
    label: '🔴 INFERENCIA CAUSAL',
    badgeColorHex: '#ef4444',
    badgeBorderHex: 'rgba(239, 68, 68, 0.4)',
    bgHex: 'rgba(239, 68, 68, 0.1)',
    ruleExplanation: 'Efecto atribuible aislado mediante diseño cuasi-experimental (DiD, Control Sintético).',
    evidenceRequirement: 'Prueba de tendencias paralelas superada, grupo de control válido e intervalos de confianza 95%.'
  },
  PROJECTION: {
    sealId: 'SEAL_PROJ_05',
    category: 'PROJECTION',
    label: '🟣 PRONÓSTICO PROBABILÍSTICO',
    badgeColorHex: '#c084fc',
    badgeBorderHex: 'rgba(192, 132, 252, 0.4)',
    bgHex: 'rgba(192, 132, 252, 0.1)',
    ruleExplanation: 'Modelación hacia el futuro bajo escenarios estocásticos e incertidumbre explícita.',
    evidenceRequirement: 'Conos de incertidumbre (P10, P50, P90), supuestos declarados y factores de riesgo.'
  }
};

export class ProvenanceEngine {
  public static getSeal(type: EpistemicType): EpistemicVerificationSeal {
    return EPISTEMIC_SEALS[type] || EPISTEMIC_SEALS.OBSERVED_DATA;
  }

  public static generateCitationString(provenance: DataSourceProvenance): string {
    return `${provenance.sourceName} (${provenance.agency}). "${provenance.datasetName}". Corte: ${provenance.cutoffDate}. Frecuencia: ${provenance.frequency}. Unidad: ${provenance.unit}. Confianza: ${provenance.confidenceScore}%.`;
  }

  public static generateAuditHash(seriesId: string, timestamp: string): string {
    let hash = 0;
    const str = `${seriesId}::${timestamp}::FULGOR_AUDIT_STANDARD_ISO`;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0;
    }
    return `FLG-AUDIT-${Math.abs(hash).toString(16).toUpperCase().padStart(8, '0')}`;
  }
}
