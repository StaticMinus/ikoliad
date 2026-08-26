import { useState } from 'react';
import { STATES_DATA } from '../data/surveillanceData';
import type { StateData } from '../data/surveillanceData';
import { ShieldCheck, Building2, Microscope, Radio } from 'lucide-react';
import { motion } from 'framer-motion';

interface InteractiveMapProps {
  selectedStateId: string;
  onSelectState: (stateId: string) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  selectedStateId,
  onSelectState,
}) => {
  const [hoveredStateId, setHoveredStateId] = useState<string | null>(null);

  const statesGeo = [
    {
      id: 'enugu',
      name: 'Enugu',
      capital: 'Enugu',
      d: 'M 180 100 L 270 90 L 305 155 L 250 200 L 170 175 Z',
      labelPos: { x: 235, y: 140 },
      nodePos: { x: 245, y: 135 },
      data: STATES_DATA.enugu,
    },
    {
      id: 'ebonyi',
      name: 'Ebonyi',
      capital: 'Abakaliki',
      d: 'M 270 90 L 355 115 L 375 200 L 300 220 L 305 155 Z',
      labelPos: { x: 325, y: 160 },
      nodePos: { x: 335, y: 155 },
      data: STATES_DATA.ebonyi,
    },
    {
      id: 'anambra',
      name: 'Anambra',
      capital: 'Awka',
      d: 'M 105 145 L 180 135 L 195 230 L 130 245 L 85 190 Z',
      labelPos: { x: 138, y: 185 },
      nodePos: { x: 145, y: 175 },
      data: STATES_DATA.anambra,
    },
    {
      id: 'abia',
      name: 'Abia',
      capital: 'Umuahia',
      d: 'M 195 220 L 290 210 L 315 295 L 215 315 L 180 260 Z',
      labelPos: { x: 245, y: 260 },
      nodePos: { x: 255, y: 250 },
      data: STATES_DATA.abia,
    },
    {
      id: 'imo',
      name: 'Imo',
      capital: 'Owerri',
      d: 'M 130 235 L 205 235 L 205 315 L 140 305 L 110 260 Z',
      labelPos: { x: 155, y: 270 },
      nodePos: { x: 165, y: 265 },
      data: STATES_DATA.imo,
    },
  ];

  const activeId = hoveredStateId || (selectedStateId !== 'all' ? selectedStateId : 'enugu');
  const activeData: StateData = STATES_DATA[activeId] || STATES_DATA.all;

  return (
    <div className="w-full bg-[#0A0C10] text-white rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl overflow-hidden relative">
      
      {/* Background Neural Grid Glow */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#0082FF_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#0082FF]/10 blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
        <div>
          <div className="flex items-center gap-2 text-[#0082FF] font-mono text-xs font-bold uppercase tracking-wider mb-1">
            <Radio className="w-3.5 h-3.5 animate-pulse text-[#9fff00]" />
            <span>South-East Sentinel Telemetry Grid</span>
          </div>
          <h3 className="font-display font-extrabold text-2xl text-white tracking-tight">
            Geospatial Surveillance Map
          </h3>
        </div>

        {/* State Quick Switch Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => onSelectState('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
              selectedStateId === 'all'
                ? 'bg-[#0082FF] text-white shadow-md'
                : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/5'
            }`}
          >
            All 5 States
          </button>
          {statesGeo.map((st) => (
            <button
              key={st.id}
              onClick={() => onSelectState(st.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                selectedStateId === st.id
                  ? 'bg-[#0082FF] text-white shadow-md'
                  : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/5'
              }`}
            >
              {st.name}
            </button>
          ))}
        </div>
      </div>

      {/* Map + Telemetry HUD Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left: Interactive Vector Map Visual (7 cols) */}
        <div className="lg:col-span-7 relative flex items-center justify-center min-h-[380px] bg-[#0F1420]/80 rounded-2xl p-6 border border-white/10 shadow-inner overflow-hidden">
          
          <svg viewBox="50 60 360 280" className="w-full max-w-[460px] h-auto drop-shadow-2xl">
            {/* Background Regional Boundary Outline */}
            <path
              d="M 75 125 C 135 70, 250 60, 380 95 C 400 190, 340 335, 210 335 C 100 325, 65 230, 75 125 Z"
              fill="#141B2A"
              stroke="#0082FF"
              strokeWidth="1.2"
              strokeDasharray="4 4"
              opacity="0.5"
            />

            {/* Individual State Interactive Polygons */}
            {statesGeo.map((st) => {
              const isSelected = selectedStateId === st.id;
              const isHovered = hoveredStateId === st.id;
              const isActive = isSelected || isHovered;

              return (
                <g
                  key={st.id}
                  onClick={() => onSelectState(st.id)}
                  onMouseEnter={() => setHoveredStateId(st.id)}
                  onMouseLeave={() => setHoveredStateId(null)}
                  className="cursor-pointer transition-all duration-300"
                >
                  {/* State Area Polygon */}
                  <path
                    d={st.d}
                    fill={
                      isActive
                        ? '#0082FF'
                        : isSelected
                        ? '#0066CC'
                        : '#1C263A'
                    }
                    fillOpacity={isActive ? '0.85' : '0.65'}
                    stroke={isActive ? '#9fff00' : '#2A3B57'}
                    strokeWidth={isActive ? '2.5' : '1.5'}
                    className="transition-all duration-300 hover:filter hover:brightness-125"
                  />

                  {/* Pulsing Sentinel Lab Node Dot */}
                  <circle
                    cx={st.nodePos.x}
                    cy={st.nodePos.y}
                    r={isActive ? '6' : '4'}
                    fill={isActive ? '#9fff00' : '#0082FF'}
                    className="transition-all"
                  />
                  {isActive && (
                    <circle
                      cx={st.nodePos.x}
                      cy={st.nodePos.y}
                      r="12"
                      fill="none"
                      stroke="#9fff00"
                      strokeWidth="1.5"
                      className="animate-ping"
                    />
                  )}

                  {/* State Name Text Label */}
                  <text
                    x={st.labelPos.x}
                    y={st.labelPos.y}
                    fill={isActive ? '#FFFFFF' : '#A0AEC0'}
                    fontSize={isActive ? '13' : '11'}
                    fontWeight={isActive ? '800' : '600'}
                    fontFamily="Inter, sans-serif"
                    textAnchor="middle"
                    className="select-none pointer-events-none transition-all"
                  >
                    {st.name}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Map Overlay Indicator */}
          <div className="absolute bottom-3 left-4 flex items-center gap-2 font-mono text-[10px] text-gray-400">
            <span className="w-2 h-2 rounded-full bg-[#9fff00]" />
            <span>Active Sentinel Labs (PCR / MDT Hubs)</span>
          </div>

        </div>

        {/* Right: State Telemetry KPI HUD (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Active State Card */}
          <motion.div
            key={activeData.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-[#121826] p-6 rounded-2xl border border-white/15 shadow-xl space-y-5"
          >
            {/* Header info */}
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#0082FF] font-bold uppercase tracking-wider block">
                  {activeData.zone}
                </span>
                <h4 className="font-display font-black text-2xl text-white">
                  {activeData.name}
                </h4>
                <p className="text-xs text-gray-400 font-mono">
                  State Capital: <span className="text-white font-bold">{activeData.capital}</span>
                </p>
              </div>

              <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-full text-[11px] font-mono font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{activeData.status}</span>
              </div>
            </div>

            {/* 4 Metric Grid */}
            <div className="grid grid-cols-2 gap-3 font-mono">
              <div className="bg-white/5 p-3.5 rounded-xl border border-white/5 space-y-1">
                <span className="text-[10px] text-gray-400 uppercase">Leprosy Cases</span>
                <div className="text-xl font-bold text-white flex items-baseline gap-1.5">
                  <span>{activeData.leprosyCases}</span>
                  <span className="text-[10px] text-emerald-400">({activeData.leprosyCureRate}% Cure)</span>
                </div>
                <div className="text-[9px] text-gray-400">
                  PB: {activeData.leprosyPB} | MB: {activeData.leprosyMB}
                </div>
              </div>

              <div className="bg-white/5 p-3.5 rounded-xl border border-white/5 space-y-1">
                <span className="text-[10px] text-[#0082FF] uppercase">Buruli Ulcer</span>
                <div className="text-xl font-bold text-white flex items-baseline gap-1.5">
                  <span>{activeData.buruliCases}</span>
                  <span className="text-[10px] text-[#0082FF]">({activeData.buruliPcrRate}% PCR)</span>
                </div>
                <div className="text-[9px] text-gray-400">
                  Cat I: {activeData.buruliCat1} | Cat II/III: {activeData.buruliCat2 + activeData.buruliCat3}
                </div>
              </div>

              <div className="bg-white/5 p-3.5 rounded-xl border border-white/5 space-y-1">
                <span className="text-[10px] text-gray-400 uppercase">Sentinel Clinics</span>
                <div className="text-xl font-bold text-white flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#9fff00]" />
                  <span>{activeData.activeFacilities}</span>
                </div>
                <div className="text-[9px] text-gray-400">DHIS2 Integrated</div>
              </div>

              <div className="bg-white/5 p-3.5 rounded-xl border border-white/5 space-y-1">
                <span className="text-[10px] text-gray-400 uppercase">Lab Turnaround</span>
                <div className="text-xl font-bold text-white flex items-center gap-2">
                  <Microscope className="w-4 h-4 text-purple-400" />
                  <span>{activeData.avgLabTurnaroundDays}d</span>
                </div>
                <div className="text-[9px] text-gray-400">{activeData.sentinelLabs} Reference Labs</div>
              </div>
            </div>

            {/* Disability & WHO 2030 Status */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono">
              <span className="text-gray-400">Grade-2 Disability Rate:</span>
              <span className="font-bold text-amber-400">{activeData.leprosyG2D}%</span>
            </div>

          </motion.div>

        </div>

      </div>

    </div>
  );
};
