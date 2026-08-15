import React, { useState } from 'react';
import { X, Terminal, Copy, Check, Play, Shield, Code, Sparkles, Send } from 'lucide-react';
import { ApiEngine, ApiEndpointDoc } from '../engines/apiEngine';

interface ApiExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiExplorerModal: React.FC<ApiExplorerModalProps> = ({ isOpen, onClose }) => {
  const endpoints = ApiEngine.getEndpointsCatalog();
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpointDoc>(endpoints[0]);
  const [activeTab, setActiveTab] = useState<'request' | 'curl' | 'response'>('request');
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedCurl, setCopiedCurl] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [executionResult, setExecutionResult] = useState<any>(endpoints[0].sampleResponse);

  if (!isOpen) return null;

  const apiKey = ApiEngine.getApiKey();

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const curlCommand = `curl -X ${selectedEndpoint.method} "https://ais-dev-j2dny7ymeduidtrn5kdo6u-480113977584.us-west2.run.app${selectedEndpoint.path}" \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json"${selectedEndpoint.sampleRequestBody ? ` \\\n  -d '${JSON.stringify(selectedEndpoint.sampleRequestBody)}'` : ''}`;

  const handleCopyCurl = () => {
    navigator.clipboard.writeText(curlCommand);
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2000);
  };

  const handleExecute = async () => {
    setIsLoading(true);
    try {
      if (selectedEndpoint.path === '/api/v1/health' || selectedEndpoint.path === '/api/v1/indicators' || selectedEndpoint.path === '/api/v1/countries' || selectedEndpoint.path === '/api/v1/observability') {
        const res = await fetch(selectedEndpoint.path);
        const data = await res.json();
        setExecutionResult(data);
      } else if (selectedEndpoint.path === '/api/v1/simulate') {
        const res = await fetch('/api/v1/simulate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(selectedEndpoint.sampleRequestBody || {})
        });
        const data = await res.json();
        setExecutionResult(data);
      } else {
        setExecutionResult(selectedEndpoint.sampleResponse);
      }
    } catch (e: any) {
      setExecutionResult({ error: e.message || 'Error executing request', fallback: selectedEndpoint.sampleResponse });
    } finally {
      setIsLoading(false);
      setActiveTab('response');
    }
  };

  return (
    <div id="api-explorer-backdrop" className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div id="api-explorer-modal" className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[85vh]">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
              <Terminal className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                FULGOR REST API Explorer <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/30">v1.0.0-PRO</span>
              </h3>
              <p className="text-[11px] text-slate-400">Prueba y consume programáticamente indicadores, simulaciones y modelos de inferencia causal.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyKey}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-mono rounded-lg flex items-center gap-1.5 transition-colors"
            >
              {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copiedKey ? 'API Key Copiada' : 'Copiar Bearer Key'}</span>
            </button>
            <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-100 rounded-md hover:bg-slate-800 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body Split View */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Left Endpoint List */}
          <div className="w-full md:w-80 border-r border-slate-800 bg-slate-950/50 p-3 space-y-1.5 overflow-y-auto">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 block mb-2">Catálogo de Endpoints REST</span>
            {endpoints.map((ep, idx) => {
              const isSelected = selectedEndpoint.path === ep.path && selectedEndpoint.method === ep.method;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedEndpoint(ep);
                    setExecutionResult(ep.sampleResponse);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all flex flex-col gap-1 ${
                    isSelected 
                      ? 'bg-amber-500/10 border-amber-500/40 text-slate-100' 
                      : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      ep.method === 'GET' ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {ep.method}
                    </span>
                    <span className="text-[9px] font-mono text-slate-400 border border-slate-800 px-1 rounded">
                      {ep.requiredTier}
                    </span>
                  </div>
                  <span className="font-mono text-xs font-semibold text-slate-200 truncate">{ep.path}</span>
                  <p className="text-[10px] text-slate-400 line-clamp-1">{ep.description}</p>
                </button>
              );
            })}
          </div>

          {/* Right Console & Testbed */}
          <div className="flex-1 flex flex-col bg-slate-950/90 overflow-hidden">
            
            {/* Action Bar */}
            <div className="p-3 border-b border-slate-800 flex items-center justify-between bg-slate-900/40">
              <div className="flex items-center gap-2">
                <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                  selectedEndpoint.method === 'GET' ? 'bg-sky-500/20 text-sky-400' : 'bg-emerald-500/20 text-emerald-400'
                }`}>
                  {selectedEndpoint.method}
                </span>
                <span className="font-mono text-xs text-amber-300 font-semibold">{selectedEndpoint.path}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('request')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    activeTab === 'request' ? 'bg-slate-800 text-slate-100' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Parámetros
                </button>
                <button
                  onClick={() => setActiveTab('curl')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    activeTab === 'curl' ? 'bg-slate-800 text-slate-100' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  cURL
                </button>
                <button
                  onClick={() => setActiveTab('response')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    activeTab === 'response' ? 'bg-slate-800 text-slate-100' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Respuesta JSON
                </button>
                <button
                  onClick={handleExecute}
                  disabled={isLoading}
                  className="ml-2 px-3.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-slate-950" />
                  <span>{isLoading ? 'Ejecutando...' : 'Enviar Request'}</span>
                </button>
              </div>
            </div>

            {/* Console Content */}
            <div className="flex-1 p-4 overflow-y-auto font-mono text-xs">
              {activeTab === 'request' && (
                <div className="space-y-4">
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                    <span className="text-[11px] font-sans font-semibold text-slate-300 block">Descripción del Endpoint</span>
                    <p className="text-slate-400 font-sans text-xs">{selectedEndpoint.description}</p>
                    <div className="flex items-center gap-4 pt-1 font-sans text-[11px] text-slate-400">
                      <span>Nivel requerido: <strong className="text-amber-300">{selectedEndpoint.requiredTier}</strong></span>
                      <span>Autenticación: <strong className="text-emerald-400">{selectedEndpoint.authRequired ? 'Bearer Token' : 'Público'}</strong></span>
                    </div>
                  </div>

                  {selectedEndpoint.sampleRequestBody && (
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-sans font-semibold text-slate-300">Request Body (JSON):</span>
                      <pre className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl text-amber-300 overflow-x-auto">
                        {JSON.stringify(selectedEndpoint.sampleRequestBody, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'curl' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-sans text-slate-400">Comando cURL listo para ejecutar en terminal:</span>
                    <button
                      onClick={handleCopyCurl}
                      className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-sans rounded flex items-center gap-1"
                    >
                      {copiedCurl ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedCurl ? 'Copiado' : 'Copiar cURL'}</span>
                    </button>
                  </div>
                  <pre className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-emerald-400 overflow-x-auto leading-relaxed">
                    {curlCommand}
                  </pre>
                </div>
              )}

              {activeTab === 'response' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-sans text-slate-400">Status: <strong className="text-emerald-400">200 OK</strong> • Content-Type: application/json</span>
                  </div>
                  <pre className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-sky-300 overflow-x-auto leading-relaxed">
                    {JSON.stringify(executionResult, null, 2)}
                  </pre>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
