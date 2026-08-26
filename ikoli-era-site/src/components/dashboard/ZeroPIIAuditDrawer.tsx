import React from 'react';
import { MOCK_AUDIT_LOGS } from '../../data/surveillanceData';
import { ShieldCheck, X, CheckCircle2, Lock, Key } from 'lucide-react';

interface ZeroPIIAuditDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ZeroPIIAuditDrawer: React.FC<ZeroPIIAuditDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex justify-end transition-opacity select-none">
      <div className="w-full max-w-xl bg-[#0B0F19] text-white h-full shadow-2xl p-6 overflow-y-auto space-y-6 flex flex-col justify-between animate-in slide-in-from-right duration-300 font-sans border-l border-white/10">
        
        <div className="space-y-6">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                  ETHICAL DATA TRUST PROTOCOL
                </span>
                <h3 className="font-display font-black text-xl text-white">
                  Zero-PII Cryptographic Audit Ledger
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Compliance Status Cards */}
          <div className="grid grid-cols-2 gap-3 font-mono text-xs">
            <div className="bg-[#121826] p-3.5 rounded-2xl border border-white/10 space-y-1">
              <span className="text-[10px] text-gray-400 block uppercase">NDPR Certification</span>
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>100% Compliant</span>
              </div>
              <span className="text-[10px] text-gray-500 block">Zero Patient PII Stored</span>
            </div>

            <div className="bg-[#121826] p-3.5 rounded-2xl border border-white/10 space-y-1">
              <span className="text-[10px] text-gray-400 block uppercase">Encryption Standard</span>
              <div className="flex items-center gap-1.5 text-[#0082FF] font-bold text-sm">
                <Key className="w-4 h-4" />
                <span>SHA-256 HMAC</span>
              </div>
              <span className="text-[10px] text-gray-500 block">Ephemeral Device Vector</span>
            </div>
          </div>

          {/* Architecture Guarantee */}
          <div className="bg-[#121826] p-4 rounded-2xl border border-white/10 space-y-2">
            <span className="text-xs font-mono font-bold text-[#00D2FF] flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              <span>Three-Tier Anonymization Pipeline:</span>
            </span>
            <ul className="text-xs text-gray-300 space-y-1.5 pl-4 list-disc font-sans leading-relaxed">
              <li>
                <strong>On-Device Inference:</strong> Machine vision segmentation operates in volatile memory on the health worker tablet; raw images are purged immediately.
              </li>
              <li>
                <strong>Facial Masking:</strong> Automated bounding masks eliminate any accidental facial biometric contours prior to vector tokenization.
              </li>
              <li>
                <strong>Federal Aggregate Sync:</strong> Only non-reversible cryptographic hashes are sent to the FMoHSW DHIS2 database for epidemiological tracking.
              </li>
            </ul>
          </div>

          {/* Real-time Audit Trail Log */}
          <div className="space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-400 uppercase text-[10px]">
                Cryptographic Event Logs (Latest 4 Batches)
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full">
                Ledger Live
              </span>
            </div>

            <div className="space-y-2.5">
              {MOCK_AUDIT_LOGS.map((log) => (
                <div
                  key={log.id}
                  className="bg-[#121826] p-3.5 rounded-xl border border-white/10 space-y-2"
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#0082FF] font-bold">{log.id} • {log.eventType}</span>
                    <span className="text-gray-500">{log.timestamp}</span>
                  </div>
                  <p className="text-gray-300 font-sans text-xs leading-relaxed">
                    {log.details}
                  </p>
                  <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[10px] text-gray-400">
                    <span>Officer: {log.officer}</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{log.status}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3 font-mono text-xs">
          <button
            onClick={onClose}
            className="flex-1 bg-white/10 hover:bg-white/15 text-white py-2.5 rounded-xl font-bold transition-colors cursor-pointer"
          >
            Close Audit Ledger
          </button>
          <button
            onClick={() => alert('Exporting signed Zero-PII Cryptographic Audit Certificate (PDF)...')}
            className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 rounded-xl font-bold transition-all hover:scale-105 shadow-md cursor-pointer"
          >
            Export Signed Cert
          </button>
        </div>

      </div>
    </div>
  );
};
