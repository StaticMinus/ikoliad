import React, { useState } from 'react';
import { MOCK_FACILITIES } from '../../data/surveillanceData';
import {
  Building2,
  Radio,
  RefreshCw,
} from 'lucide-react';

interface FacilityTelemetryMatrixProps {
  selectedStateId: string;
}

export const FacilityTelemetryMatrix: React.FC<FacilityTelemetryMatrixProps> = ({
  selectedStateId,
}) => {
  const [search, setSearch] = useState<string>('');

  const filteredFacilities = MOCK_FACILITIES.filter((fac) => {
    if (selectedStateId !== 'all' && fac.stateId !== selectedStateId) {
      return false;
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        fac.name.toLowerCase().includes(q) ||
        fac.lga.toLowerCase().includes(q) ||
        fac.state.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-left font-sans">
      
      {/* Header */}
      <div className="p-5 sm:p-6 border-b border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#0082FF]" />
            <h3 className="font-display font-extrabold text-xl text-[#0A0C10]">
              Sentinel Facility Telemetry & Logistics
            </h3>
          </div>
          <p className="text-xs text-gray-500 font-sans mt-0.5">
            Real-time telemetry, MDT blister pack supply buffer, PCR specimen turnaround, and DHIS2 connectivity.
          </p>
        </div>

        {/* Quick Filter */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search facility name..."
            className="bg-white text-xs text-slate-800 placeholder-gray-400 px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0082FF] font-sans"
          />
        </div>
      </div>

      {/* Facilities Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse font-sans text-xs">
          <thead>
            <tr className="bg-slate-100 text-slate-700 font-mono text-[11px] uppercase tracking-wider border-b border-slate-200">
              <th className="p-3.5 pl-6 font-bold">Facility Name & Hub</th>
              <th className="p-3.5 font-bold">Facility Type</th>
              <th className="p-3.5 font-bold">Active Cases</th>
              <th className="p-3.5 font-bold">PCR Turnaround</th>
              <th className="p-3.5 font-bold">MDT Stock Buffer</th>
              <th className="p-3.5 font-bold">DHIS2 Sync</th>
              <th className="p-3.5 pr-6 text-right font-bold">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {filteredFacilities.map((fac) => (
              <tr key={fac.id} className="hover:bg-blue-50/40 transition-colors">
                
                {/* Facility Name */}
                <td className="p-3.5 pl-6">
                  <span className="font-bold text-[#0A0C10] block">{fac.name}</span>
                  <span className="text-[11px] text-gray-500 font-sans">
                    {fac.lga}, {fac.state}
                  </span>
                </td>

                {/* Type */}
                <td className="p-3.5 font-mono text-[11px]">
                  <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-semibold">
                    {fac.type}
                  </span>
                </td>

                {/* Active Cases */}
                <td className="p-3.5 font-mono">
                  <span className="font-bold text-[#0082FF] text-sm block">
                    {fac.casesUnderCare}
                  </span>
                  <span className="text-[10px] text-gray-400">
                    {fac.activeOfficers} field staff
                  </span>
                </td>

                {/* PCR Turnaround */}
                <td className="p-3.5 font-mono">
                  <span className="text-gray-800 font-bold block">{fac.pcrTurnaroundDays} days</span>
                  <span className="text-[10px] text-gray-400">IS2404 Assay</span>
                </td>

                {/* MDT Stock Buffer */}
                <td className="p-3.5 font-mono text-[11px]">
                  <span
                    className={`font-bold px-2 py-0.5 rounded-md ${
                      fac.mdtStockLevel.includes('Optimal')
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : fac.mdtStockLevel.includes('Adequate')
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {fac.mdtStockLevel}
                  </span>
                </td>

                {/* DHIS2 Sync */}
                <td className="p-3.5 font-mono text-[11px]">
                  <div className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                    <Radio className="w-3 h-3 animate-pulse" />
                    <span>{fac.dhis2SyncStatus}</span>
                  </div>
                  <span className="text-[10px] text-gray-400 block">{fac.lastTelemetryPing}</span>
                </td>

                {/* Action */}
                <td className="p-3.5 pr-6 text-right">
                  <button
                    onClick={() => alert(`Triggering telemetry diagnostic re-ping for ${fac.name}...`)}
                    className="p-1.5 bg-slate-100 hover:bg-[#0082FF] hover:text-white rounded-lg text-gray-600 transition-colors inline-flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span className="text-[10px] font-mono font-bold hidden sm:inline">Telemetry Ping</span>
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
