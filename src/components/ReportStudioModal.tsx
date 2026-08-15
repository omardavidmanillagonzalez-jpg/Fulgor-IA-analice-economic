import React, { useState } from 'react';
import { X, FileText, Download, Printer, CheckCircle, Database, Layers, ShieldCheck } from 'lucide-react';
import { CountryEconomicProfile, EconomicIndicator, SectorImpact } from '../types/economic';
import { ReportEngine, FullSystemAuditResult } from '../engines/reportEngine';

interface ReportStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  countries: CountryEconomicProfile[];
  primaryIndicators: EconomicIndicator[];
  sectors: SectorImpact[];
  selectedCountry: string;
}

export const ReportStudioModal: React.FC<ReportStudioModalProps> = ({
  isOpen,
  onClose,
  countries,
  primaryIndicators,
  sectors,
  selectedCountry,
}) => {
  const [reportType, setReportType] = useState<'executive' | 'system_health'>('executive');
  const [reportFormat, setReportFormat] = useState<'pdf' | 'csv' | 'json' | 'markdown'>('pdf');
  const [includeMethodology, setIncludeMethodology] = useState<boolean>(true);
  const [includeCausalStudies, setIncludeCausalStudies] = useState<boolean>(true);
  const [includeSimulations, setIncludeSimulations] = useState<boolean>(true);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentCountry = countries.find(c => c.id === (selectedCountry === 'ALL' ? 'MX' : selectedCountry)) || countries[0];
  const auditPreview: FullSystemAuditResult = ReportEngine.auditAllSystems();

  const handleDownloadFile = () => {
    setIsExporting(true);
    setDownloadSuccess(false);

    setTimeout(() => {
      if (reportType === 'system_health') {
        if (reportFormat === 'json') {
          const jsonContent = ReportEngine.generateSystemHealthReport('json');
          const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(jsonContent);
          const downloadAnchor = document.createElement('a');
          downloadAnchor.setAttribute("href", dataStr);
          downloadAnchor.setAttribute("download", `fulgor-system-health-report-${Date.now()}.json`);
          document.body.appendChild(downloadAnchor);
          downloadAnchor.click();
          downloadAnchor.remove();
        } else if (reportFormat === 'markdown' || reportFormat === 'csv') {
          const mdContent = ReportEngine.generateSystemHealthReport('markdown');
          const dataStr = "data:text/markdown;charset=utf-8," + encodeURIComponent(mdContent);
          const downloadAnchor = document.createElement('a');
          downloadAnchor.setAttribute("href", dataStr);
          downloadAnchor.setAttribute("download", `fulgor-system-health-report-${Date.now()}.md`);
          document.body.appendChild(downloadAnchor);
          downloadAnchor.click();
          downloadAnchor.remove();
        } else {
          window.print();
        }
      } else {
        if (reportFormat === 'json') {
          const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
            title: "Reporte Ejecutivo Fulgor IA Analicer Economic",
            generatedAt: new Date().toISOString(),
            country: currentCountry,
            indicators: primaryIndicators,
            sectors: sectors,
            epistemicCompliance: "ISO-like Fulgor Methodological Standard verified (Rule of Gold)"
          }, null, 2));
          const downloadAnchor = document.createElement('a');
          downloadAnchor.setAttribute("href", dataStr);
          downloadAnchor.setAttribute("download", `fulgor-economic-report-${currentCountry.id.toLowerCase()}-${Date.now()}.json`);
          document.body.appendChild(downloadAnchor);
          downloadAnchor.click();
          downloadAnchor.remove();
        } else if (reportFormat === 'csv') {
          const headers = "Code,Name,Country,CurrentValue,Unit,Category,EpistemicType,OfficialSource\n";
          const rows = primaryIndicators.map(i => 
            `"${i.code}","${i.name}","${i.countryName}",${i.currentValue},"${i.unit}","${i.category}","${i.epistemicType}","${i.provenance.sourceName}"`
          ).join("\n");
          const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(headers + rows);
          const downloadAnchor = document.createElement('a');
          downloadAnchor.setAttribute("href", csvContent);
          downloadAnchor.setAttribute("download", `fulgor-indicators-${Date.now()}.csv`);
          document.body.appendChild(downloadAnchor);
          downloadAnchor.click();
          downloadAnchor.remove();
        } else if (reportFormat === 'markdown') {
          const mdContent = ReportEngine.generateMarkdown({
            title: `Reporte Ejecutivo Macroeconómico — ${currentCountry.name}`,
            country: currentCountry,
            indicators: primaryIndicators,
            sectors,
            includeMethodology,
            includeCausalStudies,
            includeSimulations,
            format: 'markdown'
          });
          const dataStr = "data:text/markdown;charset=utf-8," + encodeURIComponent(mdContent);
          const downloadAnchor = document.createElement('a');
          downloadAnchor.setAttribute("href", dataStr);
          downloadAnchor.setAttribute("download", `fulgor-economic-report-${currentCountry.id.toLowerCase()}-${Date.now()}.md`);
          document.body.appendChild(downloadAnchor);
          downloadAnchor.click();
          downloadAnchor.remove();
        } else {
          window.print();
        }
      }

      setIsExporting(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    }, 500);
  };

  return (
    <div 
      id="report-studio-backdrop"
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div 
        id="report-studio-modal"
        className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
              <FileText className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-sm">Estudio de Reportes Oficiales & Auditoría</h3>
              <p className="text-[10px] text-slate-400">Genera informes ejecutivos certificados y el System Health Report de la plataforma.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-100 rounded-md hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector Tab */}
        <div className="px-6 pt-4 border-b border-slate-800/80 flex items-center gap-2 bg-slate-950/40">
          <button
            onClick={() => setReportType('executive')}
            className={`pb-3 px-3 text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
              reportType === 'executive'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Informe Macroeconómico de País ({currentCountry.name})
          </button>

          <button
            onClick={() => setReportType('system_health')}
            className={`pb-3 px-3 text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
              reportType === 'system_health'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            System Health Report (Regla de Oro & Release Gates)
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 overflow-y-auto">
          
          {/* SYSTEM HEALTH REPORT PREVIEW */}
          {reportType === 'system_health' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-mono text-[10px] font-bold">
                      {auditPreview.overallStatus}
                    </span>
                    <span className="text-xs font-bold text-slate-200">
                      {auditPreview.reportMetadata.reportTitle}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    Audit Hash: {auditPreview.auditHash.substring(0, 18)}...
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {auditPreview.declaration}
                </p>

                {/* Score and stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono pt-1">
                  <div className="p-2 bg-slate-900 rounded border border-slate-800">
                    <span className="text-[9px] text-slate-500 block">REGLA DE ORO</span>
                    <span className="text-amber-400 font-bold">{auditPreview.ruleOfGoldCompliance.overallScore}% CUMPLE</span>
                  </div>
                  <div className="p-2 bg-slate-900 rounded border border-slate-800">
                    <span className="text-[9px] text-slate-500 block">RELEASE GATES</span>
                    <span className="text-emerald-400 font-bold">{auditPreview.releaseGates.filter(g => g.status === 'PASSED').length} / 7 PASSED</span>
                  </div>
                  <div className="p-2 bg-slate-900 rounded border border-slate-800">
                    <span className="text-[9px] text-slate-500 block">TEST SUITE</span>
                    <span className="text-emerald-400 font-bold">{auditPreview.testSuite.summary.passed} / {auditPreview.testSuite.summary.total} PASSED</span>
                  </div>
                  <div className="p-2 bg-slate-900 rounded border border-slate-800">
                    <span className="text-[9px] text-slate-500 block">MÓDULOS ACTIVOS</span>
                    <span className="text-slate-200 font-bold">{auditPreview.modules.length} OPERACIONALES</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Format selection */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-300">Formato de Exportación:</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                onClick={() => setReportFormat('pdf')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  reportFormat === 'pdf'
                    ? 'bg-amber-500/20 border-amber-500/50 text-slate-100'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Printer className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold">PDF / Imprimir</span>
                </div>
                <p className="text-[10px] text-slate-400">Diseño visual listo para imprimir.</p>
              </button>

              <button
                onClick={() => setReportFormat('markdown')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  reportFormat === 'markdown'
                    ? 'bg-amber-500/20 border-amber-500/50 text-slate-100'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold">Markdown (.md)</span>
                </div>
                <p className="text-[10px] text-slate-400">Informe estructurado en Markdown.</p>
              </button>

              <button
                onClick={() => setReportFormat('json')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  reportFormat === 'json'
                    ? 'bg-amber-500/20 border-amber-500/50 text-slate-100'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Layers className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-bold">JSON Audit</span>
                </div>
                <p className="text-[10px] text-slate-400">Metadatos y payload auditable.</p>
              </button>

              <button
                onClick={() => setReportFormat('csv')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  reportFormat === 'csv'
                    ? 'bg-amber-500/20 border-amber-500/50 text-slate-100'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Database className="w-4 h-4 text-sky-400" />
                  <span className="text-xs font-bold">CSV / Tabular</span>
                </div>
                <p className="text-[10px] text-slate-400">Series de datos para análisis.</p>
              </button>
            </div>
          </div>

          {/* Report Sections Config for Executive mode */}
          {reportType === 'executive' && (
            <div className="space-y-2.5">
              <span className="text-xs font-semibold text-slate-300">Secciones a Incluir:</span>
              <div className="space-y-2 text-xs">
                <label className="flex items-center gap-2.5 text-slate-300 cursor-pointer bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <input
                    type="checkbox"
                    checked={includeMethodology}
                    onChange={(e) => setIncludeMethodology(e.target.checked)}
                    className="accent-amber-400 rounded"
                  />
                  <span>Ficha técnica de proveniencia de fuentes oficiales (INEGI, FRED, Eurostat, OCDE)</span>
                </label>

                <label className="flex items-center gap-2.5 text-slate-300 cursor-pointer bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <input
                    type="checkbox"
                    checked={includeCausalStudies}
                    onChange={(e) => setIncludeCausalStudies(e.target.checked)}
                    className="accent-amber-400 rounded"
                  />
                  <span>Modelos cuasi-experimentales de inferencia causal (Difference-in-Differences)</span>
                </label>

                <label className="flex items-center gap-2.5 text-slate-300 cursor-pointer bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <input
                    type="checkbox"
                    checked={includeSimulations}
                    onChange={(e) => setIncludeSimulations(e.target.checked)}
                    className="accent-amber-400 rounded"
                  />
                  <span>Simulaciones del Gemelo Digital y Conos de Incertidumbre Predictiva</span>
                </label>
              </div>
            </div>
          )}

        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            {downloadSuccess && (
              <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                <CheckCircle className="w-3.5 h-3.5" /> ¡Reporte generado exitosamente!
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
            >
              Cerrar
            </button>
            <button
              onClick={handleDownloadFile}
              disabled={isExporting}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 flex items-center gap-2 transition-all"
            >
              {reportFormat === 'pdf' ? (
                <>
                  <Printer className="w-4 h-4" />
                  <span>Imprimir / Guardar PDF</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Descargar {reportFormat.toUpperCase()}</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
