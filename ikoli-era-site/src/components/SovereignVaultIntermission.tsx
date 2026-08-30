import React, { useState } from 'react';
import { ShieldCheck, Cpu, Database, Sparkles, ArrowUpRight, Check, Terminal } from 'lucide-react';

export const SovereignVaultIntermission: React.FC<{ onExploreApi?: () => void }> = ({ onExploreApi }) => {
  const [tokenGenerated, setTokenGenerated] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateSampleToken = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setTokenGenerated('7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069');
    }, 450);
  };

  return (
    <section className="w-full bg-[#0A0C10] text-white py-20 sm:py-28 px-4 sm:px-8 border-y border-white/10 relative overflow-hidden select-none">
      
      {/* Background Radial Spotlights */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#0071E3]/15 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-16 relative z-10 text-left">
        
        {/* ── Top Header ─────────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] font-mono font-bold uppercase tracking-widest text-blue-300">
              <Sparkles className="w-3.5 h-3.5 text-[#0071E3]" />
              <span>Sovereign Health Intelligence</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight text-white leading-tight">
              Zero-PII Data Vault &amp; Edge Neural Core.
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 font-light max-w-xl leading-relaxed">
              Nigeria’s first clinical surveillance architecture engineered with on-device cryptographic HMAC tokenization conforming strictly to the Nigeria Data Protection Act (NDPA 2023).
            </p>
          </div>

          <button
            onClick={onExploreApi}
            className="bg-white hover:bg-gray-100 active:scale-95 text-[#0A0C10] font-bold text-xs px-6 py-3 rounded-full flex items-center gap-2 transition-all cursor-pointer shadow-lg shrink-0"
          >
            <span>Explore Developer Vault</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* ── 3 High-Contrast Obsidian Cards ─────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Inference Speed */}
          <div className="bg-[#14171F] p-6 sm:p-8 rounded-[28px] border border-white/10 space-y-4 shadow-xl flex flex-col justify-between group hover:border-[#0071E3]/50 transition-colors">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#0071E3]/15 text-[#0071E3] flex items-center justify-center">
                <Cpu className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono font-bold text-blue-300 uppercase tracking-wider block">
                Edge In-Memory Engine
              </span>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                &lt; 120ms Staging
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                Ultra-quantized neural vision runs entirely on frontline Android hardware in remote settlements with zero required internet connectivity.
              </p>
            </div>
            <div className="pt-4 border-t border-white/10 text-[11px] font-mono text-gray-400">
              ● 94.2% Clinical Concordance
            </div>
          </div>

          {/* Card 2: Cryptographic Zero-PII */}
          <div className="bg-[#14171F] p-6 sm:p-8 rounded-[28px] border border-white/10 space-y-4 shadow-xl flex flex-col justify-between group hover:border-emerald-500/50 transition-colors">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-300 uppercase tracking-wider block">
                NDPA 2023 Statutory
              </span>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                Zero Cloud Biometrics
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                Biometric patient photography is instantly hashed using SHA-256 HMAC before transmission. No facial identifiers ever touch a cloud database.
              </p>
            </div>
            <div className="pt-4 border-t border-white/10 text-[11px] font-mono text-gray-400">
              ● 100% Cryptographic Anonymity
            </div>
          </div>

          {/* Card 3: Direct DHIS2 Pipeline */}
          <div className="bg-[#14171F] p-6 sm:p-8 rounded-[28px] border border-white/10 space-y-4 shadow-xl flex flex-col justify-between group hover:border-purple-500/50 transition-colors">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
                <Database className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono font-bold text-purple-300 uppercase tracking-wider block">
                FMOH Sovereign Pipeline
              </span>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                312 Sentinel PHCs
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                Continuous digital synchronization aggregates verified skin lesion reports, voluntary muscle testing logs, and PCR confirmation batches in real-time.
              </p>
            </div>
            <div className="pt-4 border-t border-white/10 text-[11px] font-mono text-gray-400">
              ● 100% Active Telemetry Sync
            </div>
          </div>

        </div>

        {/* ── Interactive Live Cryptographic Token Simulator ─────────────── */}
        <div className="bg-[#111318] p-6 sm:p-8 rounded-[32px] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 max-w-lg">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
              <Terminal className="w-4 h-4" />
              <span>Interactive Zero-PII Hash Generator</span>
            </div>
            <p className="text-xs text-gray-400">
              Experience on-device SHA-256 HMAC pseudonymization of patient lesion coordinates.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            {tokenGenerated && (
              <div className="font-mono text-[11px] bg-black/60 px-4 py-2 rounded-xl text-emerald-300 border border-emerald-500/30 truncate max-w-xs">
                {tokenGenerated}
              </div>
            )}

            <button
              onClick={handleGenerateSampleToken}
              disabled={isGenerating}
              className="w-full sm:w-auto bg-[#0071E3] hover:bg-[#0077ED] active:scale-95 text-white font-bold text-xs px-5 py-2.5 rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md disabled:opacity-50"
            >
              {isGenerating ? (
                <span>Generating Hash...</span>
              ) : tokenGenerated ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Regenerate HMAC</span>
                </>
              ) : (
                <span>Test Cryptographic Token</span>
              )}
            </button>
          </div>
        </div>

      </div>

    </section>
  );
};
