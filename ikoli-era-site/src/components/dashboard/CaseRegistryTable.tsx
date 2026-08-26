import React, { useState, useMemo } from 'react';
import {
  X,
  CheckCircle2,
  AlertCircle,
  Eye,
  FileCode,
  ArrowUpDown,
  ShieldCheck,
} from 'lucide-react';
import { MOCK_CASE_RECORDS, type CaseRecord } from '../../data/surveillanceData';

interface CaseRegistryTableProps {
  selectedStateId: string;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const CaseRegistryTable: React.FC<CaseRegistryTableProps> = ({
  selectedStateId,
  searchQuery,
  onSearchChange,
}) => {
  const [selectedDisease, setSelectedDisease] = useState<string>('all');
  const [selectedTreatment, setSelectedTreatment] = useState<string>('all');
  const [selectedCase, setSelectedCase] = useState<CaseRecord | null>(null);
  const [sortField, setSortField] = useState<keyof CaseRecord>('dateRegistered');
  const [sortAsc, setSortAsc] = useState(false);

  // Filtered & Sorted records
  const filteredRecords = useMemo(() => {
    return MOCK_CASE_RECORDS.filter((rec) => {
      // State filter
      if (selectedStateId !== 'all' && rec.stateId !== selectedStateId) {
        return false;
      }
      // Disease filter
      if (selectedDisease !== 'all' && rec.disease !== selectedDisease) {
        return false;
      }
      // Treatment filter
      if (selectedTreatment !== 'all' && rec.treatmentStatus !== selectedTreatment) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          rec.id.toLowerCase().includes(q) ||
          rec.tokenHash.toLowerCase().includes(q) ||
          rec.lga.toLowerCase().includes(q) ||
          rec.facility.toLowerCase().includes(q) ||
          rec.stageDescription.toLowerCase().includes(q)
        );
      }
      return true;
    }).sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortAsc ? valA - valB : valB - valA;
      }
      return 0;
    });
  }, [selectedStateId, selectedDisease, selectedTreatment, searchQuery, sortField, sortAsc]);

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(filteredRecords, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute('href', dataStr);
    dlAnchorElem.setAttribute('download', `ikoli_case_registry_${selectedStateId}_2026.json`);
    dlAnchorElem.click();
  };

  const toggleSort = (field: keyof CaseRecord) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-left font-sans">
      
      {/* ── Table Header Controls ────────────────────────────── */}
      <div className="p-4 sm:p-6 border-b border-slate-200 space-y-4 bg-slate-50/50">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-xl text-[#0A0C10]">
                Active Case Registry & Surveillance Stream
              </span>
              <span className="text-xs font-mono font-bold text-[#0082FF] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                {filteredRecords.length} Cases
              </span>
            </div>
            <p className="text-xs text-gray-500 font-sans mt-0.5">
              Verified clinical lesion encounters, zero-PII cryptographic tokens, and laboratory status across sentinel sites.
            </p>
          </div>

          {/* Action Tools: Export JSON */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleExportJSON}
              className="bg-white hover:bg-slate-100 text-gray-700 px-3 py-2 rounded-xl text-xs font-mono font-semibold border border-slate-200 flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
            >
              <FileCode className="w-3.5 h-3.5 text-purple-600" />
              <span>Export JSON</span>
            </button>
          </div>

        </div>

        {/* Filter Pills Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            
            {/* Disease Filter */}
            <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200">
              <span className="text-[10px] text-gray-400 font-bold px-2 uppercase">Disease:</span>
              <button
                onClick={() => setSelectedDisease('all')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  selectedDisease === 'all' ? 'bg-[#0A0C10] text-white' : 'text-gray-600 hover:text-black'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedDisease('Leprosy')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  selectedDisease === 'Leprosy' ? 'bg-[#0082FF] text-white' : 'text-gray-600 hover:text-black'
                }`}
              >
                Leprosy
              </button>
              <button
                onClick={() => setSelectedDisease('Buruli Ulcer')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  selectedDisease === 'Buruli Ulcer' ? 'bg-[#7d1a4a] text-white' : 'text-gray-600 hover:text-black'
                }`}
              >
                Buruli Ulcer
              </button>
              <button
                onClick={() => setSelectedDisease('Yaws')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  selectedDisease === 'Yaws' ? 'bg-emerald-600 text-white' : 'text-gray-600 hover:text-black'
                }`}
              >
                Yaws
              </button>
            </div>

            {/* Treatment Status Filter */}
            <select
              value={selectedTreatment}
              onChange={(e) => setSelectedTreatment(e.target.value)}
              className="bg-white text-gray-700 text-xs font-mono font-bold px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0082FF] cursor-pointer"
            >
              <option value="all">All Treatment Stages</option>
              <option value="MDT Initiated">MDT Initiated</option>
              <option value="Cohort Month 3">Cohort Month 3</option>
              <option value="Oral Rifampicin 8-Wk">Oral Rifampicin 8-Wk</option>
              <option value="Cured">Cured</option>
            </select>

          </div>

          {/* Quick Clear Filter if active */}
          {(selectedDisease !== 'all' || selectedTreatment !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedDisease('all');
                setSelectedTreatment('all');
                onSearchChange('');
              }}
              className="text-xs font-mono text-[#0082FF] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}

        </div>
      </div>

      {/* ── Table Content Area ───────────────────────────────── */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse font-sans text-xs">
          <thead>
            <tr className="bg-slate-100/80 text-slate-700 border-b border-slate-200 font-mono text-[11px] uppercase tracking-wider">
              <th
                onClick={() => toggleSort('id')}
                className="p-3.5 pl-6 font-bold cursor-pointer hover:text-black"
              >
                <div className="flex items-center gap-1">
                  <span>Case ID / Token</span>
                  <ArrowUpDown className="w-3 h-3 text-gray-400" />
                </div>
              </th>
              <th className="p-3.5 font-bold">State & LGA</th>
              <th
                onClick={() => toggleSort('disease')}
                className="p-3.5 font-bold cursor-pointer hover:text-black"
              >
                <div className="flex items-center gap-1">
                  <span>Diagnosis & Staging</span>
                  <ArrowUpDown className="w-3 h-3 text-gray-400" />
                </div>
              </th>
              <th
                onClick={() => toggleSort('aiConfidence')}
                className="p-3.5 font-bold cursor-pointer hover:text-black"
              >
                <div className="flex items-center gap-1">
                  <span>AI Sensitivity</span>
                  <ArrowUpDown className="w-3 h-3 text-gray-400" />
                </div>
              </th>
              <th className="p-3.5 font-bold">Lab Confirmation</th>
              <th className="p-3.5 font-bold">Treatment Cohort</th>
              <th className="p-3.5 font-bold">G2D Grade</th>
              <th className="p-3.5 pr-6 text-right font-bold">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {filteredRecords.length > 0 ? (
              filteredRecords.map((rec) => (
                <tr
                  key={rec.id}
                  onClick={() => setSelectedCase(rec)}
                  className="hover:bg-blue-50/40 transition-colors cursor-pointer group"
                >
                  {/* Case ID & Token Hash */}
                  <td className="p-3.5 pl-6 font-mono">
                    <div className="font-bold text-[#0A0C10] group-hover:text-[#0082FF] transition-colors">
                      {rec.id}
                    </div>
                    <span className="text-[10px] text-gray-400 font-mono block">
                      {rec.tokenHash}
                    </span>
                  </td>

                  {/* State & LGA */}
                  <td className="p-3.5">
                    <span className="font-semibold text-gray-900 block">{rec.lga}</span>
                    <span className="text-[11px] text-gray-500 font-sans">{rec.state}</span>
                  </td>

                  {/* Diagnosis & Staging */}
                  <td className="p-3.5">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                          rec.disease === 'Leprosy'
                            ? 'bg-blue-100 text-blue-800'
                            : rec.disease === 'Buruli Ulcer'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {rec.disease} ({rec.subType})
                      </span>
                    </div>
                    <span className="text-[11px] text-gray-500 truncate max-w-xs block mt-0.5">
                      {rec.lesionSite}
                    </span>
                  </td>

                  {/* AI Sensitivity */}
                  <td className="p-3.5 font-mono">
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 inline-block">
                      {rec.aiConfidence}%
                    </span>
                  </td>

                  {/* Lab Confirmation */}
                  <td className="p-3.5 font-mono text-[11px]">
                    <span className="text-gray-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-[#0082FF]" />
                      <span>{rec.labStatus}</span>
                    </span>
                  </td>

                  {/* Treatment Cohort */}
                  <td className="p-3.5 font-mono text-[11px]">
                    <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded-md font-semibold inline-block">
                      {rec.treatmentStatus}
                    </span>
                  </td>

                  {/* G2D Grade */}
                  <td className="p-3.5 font-mono text-[11px]">
                    <span
                      className={`font-semibold ${
                        rec.g2dStatus.includes('Grade 0')
                          ? 'text-emerald-600'
                          : rec.g2dStatus.includes('Grade 1')
                          ? 'text-amber-600'
                          : 'text-rose-600'
                      }`}
                    >
                      {rec.g2dStatus}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="p-3.5 pr-6 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCase(rec);
                      }}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-[#0082FF] hover:text-white text-gray-600 transition-colors inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-mono font-bold hidden sm:inline">Details</span>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              /* Empty State following UI UX Pro Max */
              <tr>
                <td colSpan={8} className="p-12 text-center text-gray-500 space-y-3">
                  <AlertCircle className="w-8 h-8 text-gray-400 mx-auto" />
                  <p className="font-semibold text-sm text-[#0A0C10]">No clinical records match your search criteria</p>
                  <p className="text-xs text-gray-400 max-w-sm mx-auto">
                    Try searching for another token hash, changing your state selection, or resetting the disease filter.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedDisease('all');
                      setSelectedTreatment('all');
                      onSearchChange('');
                    }}
                    className="bg-[#0082FF] text-white text-xs font-mono font-bold px-4 py-2 rounded-xl transition-all hover:scale-105 cursor-pointer"
                  >
                    Clear All Filters
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ── Slide-Over Case Details Drawer ───────────────────── */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end transition-opacity">
          <div className="w-full max-w-lg bg-white h-full shadow-2xl p-6 overflow-y-auto space-y-6 flex flex-col justify-between animate-in slide-in-from-right duration-300">
            
            <div className="space-y-6">
              
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#0082FF] uppercase tracking-wider block">
                    CLINICAL CASE DOSSIER • ZERO-PII
                  </span>
                  <h3 className="font-display font-black text-2xl text-[#0A0C10]">
                    {selectedCase.id}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedCase(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-gray-600 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Status Alert Banner */}
              <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <span className="text-xs font-bold text-emerald-900 block font-mono">
                    SHA-256 HMAC Token Verified
                  </span>
                  <span className="text-[11px] text-emerald-700 leading-tight block">
                    Cryptographic token: {selectedCase.tokenHash} (Zero biometric facial exposure).
                  </span>
                </div>
              </div>

              {/* Clinical Staging Overview */}
              <div className="space-y-3 font-mono text-xs">
                <span className="font-bold text-gray-400 uppercase text-[10px] block">
                  Diagnostic Classification
                </span>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="text-gray-500 text-[10px] block">Disease</span>
                    <span className="font-bold text-base text-[#0A0C10]">
                      {selectedCase.disease} ({selectedCase.subType})
                    </span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="text-gray-500 text-[10px] block">AI Confidence</span>
                    <span className="font-bold text-base text-emerald-600">
                      {selectedCase.aiConfidence}%
                    </span>
                  </div>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-gray-500 text-[10px] block">Lesion Site & Clinical Presentation</span>
                  <p className="font-sans text-xs text-gray-800 leading-relaxed">
                    {selectedCase.stageDescription}
                  </p>
                </div>
              </div>

              {/* Verification & Treatment Protocol */}
              <div className="space-y-3 font-mono text-xs">
                <span className="font-bold text-gray-400 uppercase text-[10px] block">
                  Sentinel Facility & Verification
                </span>

                <div className="space-y-2 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Facility:</span>
                    <span className="font-bold text-gray-900">{selectedCase.facility}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">LGA / State:</span>
                    <span className="font-bold text-gray-900">{selectedCase.lga}, {selectedCase.state}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Verified By:</span>
                    <span className="font-bold text-[#0082FF]">{selectedCase.verifiedBy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Laboratory Assay:</span>
                    <span className="font-bold text-emerald-700">{selectedCase.labStatus}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Current Regimen:</span>
                    <span className="font-bold text-purple-700">{selectedCase.treatmentStatus}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Disability Staging:</span>
                    <span className="font-bold text-gray-900">{selectedCase.g2dStatus}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Last Telemetry Sync:</span>
                    <span className="font-mono text-gray-600">{selectedCase.lastSync}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Drawer Bottom Actions */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
              <button
                onClick={() => setSelectedCase(null)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-gray-700 py-2.5 rounded-xl text-xs font-mono font-bold transition-colors cursor-pointer"
              >
                Close Dossier
              </button>
              <button
                onClick={() => alert(`Synchronizing Case ${selectedCase.id} directly with Federal DHIS2 Instance...`)}
                className="flex-1 bg-[#0082FF] hover:bg-[#0066CC] text-white py-2.5 rounded-xl text-xs font-mono font-bold transition-all hover:scale-105 shadow-md cursor-pointer"
              >
                Sync with DHIS2
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
