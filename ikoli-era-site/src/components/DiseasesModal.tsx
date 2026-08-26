import React, { useState } from 'react';
import { X, Microscope } from 'lucide-react';

interface DiseasesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DiseasesModal: React.FC<DiseasesModalProps> = ({ isOpen, onClose }) => {
  const [selectedDisease, setSelectedDisease] = useState<string>('leprosy-pb');

  if (!isOpen) return null;

  const diseasesList = [
    {
      id: 'leprosy-pb',
      name: 'Leprosy (Paucibacillary / PB)',
      category: 'Mycobacterial',
      color: '#2c4c34',
      criteria: '1 to 5 hypopigmented or erythematous skin lesions with definite loss of sensation. No more than 1 enlarged nerve trunk.',
      regimen: '6-month WHO MDT blister pack (Rifampicin + Dapsone).',
      staging: 'Early Field Triage • Grade 0 Disability Target',
      confirmation: 'Clinical sensory mapping + Slit Skin Smear (Negative BI).',
    },
    {
      id: 'leprosy-mb',
      name: 'Leprosy (Multibacillary / MB)',
      category: 'Mycobacterial',
      color: '#a63e2d',
      criteria: '>5 skin lesions, plaques, nodules, or diffuse infiltration with peripheral nerve trunk involvement (>1 nerve).',
      regimen: '12-month WHO MDT blister pack (Rifampicin + Clofazimine + Dapsone).',
      staging: 'Sentinel Clinic Monitoring • Grade 1/2 Prevention',
      confirmation: 'Slit Skin Smear (Positive BI) + Histopathology.',
    },
    {
      id: 'buruli-ulcer',
      name: 'Buruli Ulcer (M. ulcerans)',
      category: 'Necrotizing',
      color: '#7d1a4a',
      criteria: 'Non-ulcerative (papules, nodules, plaques, oedema) to painless necrotic ulcers with characteristic undermined edges.',
      regimen: '8-week Oral Rifampicin (10 mg/kg) + Clarithromycin (7.5 mg/kg).',
      staging: 'Cat I: single <5cm | Cat II: 5-15cm | Cat III: >15cm / osteomyelitis',
      confirmation: 'IS2404 Real-time PCR (UNTH & Mile 4 Reference Hubs).',
    },
    {
      id: 'yaws',
      name: 'Yaws & Cutaneous Leishmaniasis',
      category: 'Treponemal & Parasitic',
      color: '#1a2b8c',
      criteria: 'Early papillomas, "mother yaw" primary ulcer, progressing to osteoperiostitis and late destructive skin lesions.',
      regimen: 'Single-dose oral Azithromycin (30 mg/kg, max 2g).',
      staging: 'Primary Papilloma ➔ Secondary Eruptions ➔ Tertiary',
      confirmation: 'Dual Path Platform (DPP) Syphilis/Yaws Rapid Diagnostic Test.',
    },
  ];

  const active = diseasesList.find((d) => d.id === selectedDisease) || diseasesList[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="bg-[#0A0C10] border border-white/10 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] text-white">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#121824]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#0082FF] flex items-center justify-center text-white font-bold text-sm shadow-md">
              <Microscope className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-lg text-white">Skin NTD Clinical Registry & Staging</span>
                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  WHO 2030 NTD TARGET
                </span>
              </div>
              <span className="text-xs text-gray-400 font-sans">Official Diagnostic & Staging Protocols for Nigeria</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: 2 Columns */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Left Column: Disease Selection List */}
          <div className="md:col-span-5 space-y-2.5">
            <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block mb-2">
              Select Target Disease
            </span>
            {diseasesList.map((d) => (
              <div
                key={d.id}
                onClick={() => setSelectedDisease(d.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  selectedDisease === d.id
                    ? 'bg-[#121824] border-[#0082FF] shadow-lg'
                    : 'bg-white/5 border-white/5 hover:bg-white/10 text-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono px-2 py-0.5 rounded-md text-white font-bold" style={{ backgroundColor: d.color }}>
                    {d.category}
                  </span>
                  {selectedDisease === d.id && <span className="w-2 h-2 rounded-full bg-[#0082FF] animate-pulse" />}
                </div>
                <h4 className="font-display font-bold text-sm text-white">{d.name}</h4>
              </div>
            ))}
          </div>

          {/* Right Column: Detailed Clinical Protocol */}
          <div className="md:col-span-7 bg-[#121824] p-6 rounded-2xl border border-white/10 space-y-6">
            <div>
              <span className="text-xs font-mono font-bold text-[#0082FF] block mb-1">
                • CLINICAL STAGING & DIAGNOSTIC PROFILE
              </span>
              <h3 className="font-display font-bold text-2xl text-white">
                {active.name}
              </h3>
            </div>

            <div className="space-y-4 text-xs font-sans">
              <div>
                <span className="text-gray-400 font-mono block mb-1 uppercase tracking-wider text-[10px]">Differential Clinical Criteria</span>
                <p className="text-gray-200 leading-relaxed bg-black/40 p-3 rounded-xl border border-white/5">
                  {active.criteria}
                </p>
              </div>

              <div>
                <span className="text-gray-400 font-mono block mb-1 uppercase tracking-wider text-[10px]">Recommended WHO Regimen</span>
                <p className="text-emerald-300 leading-relaxed bg-emerald-950/20 p-3 rounded-xl border border-emerald-500/20 font-mono">
                  {active.regimen}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-black/30 p-3 rounded-xl border border-white/5">
                  <span className="text-gray-400 font-mono block text-[10px] uppercase">Surveillance Stage</span>
                  <span className="font-bold text-white mt-1 block">{active.staging}</span>
                </div>
                <div className="bg-black/30 p-3 rounded-xl border border-white/5">
                  <span className="text-gray-400 font-mono block text-[10px] uppercase">Lab Confirmation</span>
                  <span className="font-bold text-white mt-1 block">{active.confirmation}</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 bg-[#121824] border-t border-white/10 flex items-center justify-between text-xs text-gray-400 font-mono">
          <span>National TB, Buruli Ulcer & Leprosy Control Programme (NTBLCP)</span>
          <button
            onClick={onClose}
            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full font-sans font-semibold transition-colors cursor-pointer"
          >
            Close Registry
          </button>
        </div>

      </div>
    </div>
  );
};
