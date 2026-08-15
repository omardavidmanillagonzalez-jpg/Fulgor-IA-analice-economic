import React, { useState } from 'react';
import { X, BookOpen, Shield, Code, Calculator, FileText, CheckCircle, ExternalLink } from 'lucide-react';
import { OFFICIAL_SOURCES_CATALOG } from '../engines/dataEngine';

interface DocumentationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocumentationModal: React.FC<DocumentationModalProps> = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState<'epistemic' | 'econometrics' | 'digitalTwin' | 'faii' | 'sources' | 'developer'>('epistemic');

  if (!isOpen) return null;

  return (
    <div id="docs-modal-backdrop" className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div id="docs-modal" className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[85vh]">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-sm">Ficha Técnica & Manual Metodológico Fulgor IA</h3>
              <p className="text-[11px] text-slate-400">Rigor econométrico, formulaciones formales y trazabilidad de fuentes oficiales.</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-100 rounded-md hover:bg-slate-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 px-4 pt-3 border-b border-slate-800 bg-slate-950/40 overflow-x-auto">
          <button
            onClick={() => setActiveSection('epistemic')}
            className={`px-3 py-2 text-xs font-semibold rounded-t-lg transition-all border-b-2 ${
              activeSection === 'epistemic'
                ? 'border-amber-400 text-amber-400 bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            1. Regla de Oro Epistémica
          </button>

          <button
            onClick={() => setActiveSection('econometrics')}
            className={`px-3 py-2 text-xs font-semibold rounded-t-lg transition-all border-b-2 ${
              activeSection === 'econometrics'
                ? 'border-amber-400 text-amber-400 bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            2. Econometría & Causalidad (DiD)
          </button>

          <button
            onClick={() => setActiveSection('digitalTwin')}
            className={`px-3 py-2 text-xs font-semibold rounded-t-lg transition-all border-b-2 ${
              activeSection === 'digitalTwin'
                ? 'border-amber-400 text-amber-400 bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            3. Gemelo Digital & TFP
          </button>

          <button
            onClick={() => setActiveSection('faii')}
            className={`px-3 py-2 text-xs font-semibold rounded-t-lg transition-all border-b-2 ${
              activeSection === 'faii'
                ? 'border-amber-400 text-amber-400 bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            4. Índice FAII
          </button>

          <button
            onClick={() => setActiveSection('sources')}
            className={`px-3 py-2 text-xs font-semibold rounded-t-lg transition-all border-b-2 ${
              activeSection === 'sources'
                ? 'border-amber-400 text-amber-400 bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            5. Fuentes Oficiales
          </button>

          <button
            onClick={() => setActiveSection('developer')}
            className={`px-3 py-2 text-xs font-semibold rounded-t-lg transition-all border-b-2 ${
              activeSection === 'developer'
                ? 'border-amber-400 text-amber-400 bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            6. Guía Desarrollador / API
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 p-6 overflow-y-auto space-y-5 text-xs text-slate-300 leading-relaxed">
          
          {activeSection === 'epistemic' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-amber-400 text-sm">Mandato Fundamental: "DATO → ANÁLISIS → MODELO → CAUSALIDAD → PRONÓSTICO → SIMULACIÓN"</h4>
                <p className="text-slate-300">
                  En el ecosistema Fulgor IA Analicer Economic, ninguna estimación o inferencia puede ser presentada como un hecho consumado. Toda afirmación, indicador y respuesta del Copiloto se etiqueta formalmente con una de las cinco clasificaciones epistemológicas:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 bg-slate-950 border border-emerald-500/30 rounded-xl space-y-1.5">
                  <span className="font-bold text-emerald-400 flex items-center gap-1.5">🟢 DATO OBSERVADO (Empirical Fact)</span>
                  <p className="text-[11px] text-slate-400">Datos cuantitativos registrados por agencias estadísticas oficiales (INEGI, FRED, Eurostat, Banco Mundial) sujetos a calendarios de corte y revisión periódica.</p>
                </div>

                <div className="p-3.5 bg-slate-950 border border-sky-500/30 rounded-xl space-y-1.5">
                  <span className="font-bold text-sky-400 flex items-center gap-1.5">🔵 CORRELACIÓN ESTADÍSTICA (Association)</span>
                  <p className="text-[11px] text-slate-400">Medición de comovimiento lineal (Pearson r) o de rangos (Spearman rho). El sistema declara expresamente que correlación no implica relación causa-efecto.</p>
                </div>

                <div className="p-3.5 bg-slate-950 border border-amber-500/30 rounded-xl space-y-1.5">
                  <span className="font-bold text-amber-400 flex items-center gap-1.5">🟠 ESTIMACIÓN MODELADA (Parametric Model)</span>
                  <p className="text-[11px] text-slate-400">Coeficientes estimados mediante modelos econométricos (OLS, efectos fijos de panel, VAR), condicionados a supuestos de exogeneidad y especificación.</p>
                </div>

                <div className="p-3.5 bg-slate-950 border border-red-500/30 rounded-xl space-y-1.5">
                  <span className="font-bold text-red-400 flex items-center gap-1.5">🔴 INFERENCIA CAUSAL (Quasi-Experimental)</span>
                  <p className="text-[11px] text-slate-400">Efectos de tratamiento aislados mediante Difference-in-Differences (DiD) o Controles Sintéticos, auditando la validez del supuesto de tendencias paralelas.</p>
                </div>

                <div className="p-3.5 bg-slate-950 border border-purple-500/30 rounded-xl space-y-1.5 md:col-span-2">
                  <span className="font-bold text-purple-400 flex items-center gap-1.5">🟣 PRONÓSTICO PROBABILÍSTICO (Stochastic Fan Chart)</span>
                  <p className="text-[11px] text-slate-400">Proyecciones a futuro expresadas en intervalos de confianza percentiles (P10, P50, P90) con divulgación explícita de supuestos macroeconómicos y riesgos de cola.</p>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'econometrics' && (
            <div className="space-y-4">
              <h4 className="font-bold text-slate-100 text-sm">Formulación del Estimador Difference-in-Differences (DiD)</h4>
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl font-mono text-amber-300 text-xs overflow-x-auto">
                Y_it = β₀ + β₁ · Post_t + β₂ · Treat_i + β₃ · (Post_t × Treat_i) + γ · X_it + ε_it
              </div>
              <p className="text-slate-300">
                Donde <strong className="text-slate-100">β₃</strong> representa el <em>Average Treatment Effect on the Treated (ATT)</em>. La plataforma ejecuta una prueba F de pre-tendencias en t &lt; t₀ para certificar que el grupo de adopción tecnológica y el grupo de control sintético compartían trayectorias paralelas antes de la intervención.
              </p>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <span className="font-bold text-slate-200 block mb-1">Criterio de Aceptación Causal:</span>
                <p className="text-[11px] text-slate-400">Si el p-valor de la prueba de pre-tendencias es &lt; 0.05, el sistema degrada la etiqueta de INFERENCIA CAUSAL a ESTIMACIÓN MODELADA para evitar conclusiones erróneas.</p>
              </div>
            </div>
          )}

          {activeSection === 'digitalTwin' && (
            <div className="space-y-4">
              <h4 className="font-bold text-slate-100 text-sm">Función de Producción Aumentada del Gemelo Digital</h4>
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl font-mono text-amber-300 text-xs overflow-x-auto">
                Y_t = A_t · K_t^α · L_t^(1-α) &nbsp;&nbsp;|&nbsp;&nbsp; Δln(A_t) = σ_K · ln(1 + Δ_AI) · (Openness / 80) · (1 - Friction / 250) + η · (R&D)
              </div>
              <p className="text-slate-300">
                El motor simula la interacción dinámica entre adopción de software inteligente, elasticidad de capital (<strong className="text-slate-100">σ_K</strong>), velocidad de reconversión de habilidades laborales (<strong className="text-slate-100">Upskilling</strong>) y fricciones regulatorias.
              </p>
            </div>
          )}

          {activeSection === 'faii' && (
            <div className="space-y-4">
              <h4 className="font-bold text-slate-100 text-sm">Formulación del Fulgor AI Impact Index (FAII)</h4>
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl font-mono text-amber-300 text-xs overflow-x-auto">
                FAII = [ w_P · Prod + w_A · Veloc + w_C · Cap + w_H · Skills ] - [ w_F · Fricción ]
              </div>
              <p className="text-slate-300">
                Cada pilar se normaliza en una escala de 0 a 100 utilizando la metodología Min-Max con datos de panel transnacionales. Los pesos son 100% configurables por el analista en la interfaz de usuario.
              </p>
            </div>
          )}

          {activeSection === 'sources' && (
            <div className="space-y-3">
              <h4 className="font-bold text-slate-100 text-sm">Catálogo de Proveedores Oficiales e Integración de Datos</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {OFFICIAL_SOURCES_CATALOG.map((s) => (
                  <div key={s.id} className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-100 font-mono">{s.acronym}</span>
                      <span className="text-[10px] text-emerald-400 font-mono">Score: {s.trustScore}%</span>
                    </div>
                    <p className="text-[11px] text-slate-300">{s.name}</p>
                    <p className="text-[10px] text-slate-400">Cobertura: {s.coverage.join(', ')}</p>
                    <a
                      href={s.officialPortalUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] text-amber-400 hover:underline flex items-center gap-1 pt-1"
                    >
                      Portal Oficial <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'developer' && (
            <div className="space-y-4">
              <h4 className="font-bold text-slate-100 text-sm">Guía de Integración REST & Contratos de Arquitectura</h4>
              <p className="text-slate-300">
                Fulgor expone una API REST modular versionada en <code className="text-amber-300">/api/v1/</code> compatible con autenticación Bearer Token, diseñada para integrarse con modelos de Python (Pandas/Statsmodels), R, Stata o data lakes institucionales.
              </p>
              <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <span className="font-bold text-slate-200 block text-xs">Ejemplo de Consumo en Python:</span>
                <pre className="p-3 bg-slate-900 rounded-lg text-emerald-400 font-mono text-[11px] overflow-x-auto">
{`import requests

url = "https://ais-dev-j2dny7ymeduidtrn5kdo6u-480113977584.us-west2.run.app/api/v1/indicators"
headers = {"Authorization": "Bearer YOUR_FULGOR_API_KEY"}

response = requests.get(url, headers=headers)
data = response.json()
print("Indicadores auditados:", len(data["indicators"]))`}
                </pre>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/70 flex items-center justify-between text-xs text-slate-400">
          <span>Certificación Metodológica Fulgor IA • ISO Provenance Standard</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-lg transition-colors"
          >
            Entendido
          </button>
        </div>

      </div>
    </div>
  );
};
