import React from 'react';
import {
  LayoutDashboard,
  MapPin,
  ClipboardList,
  TrendingUp,
  Building2,
  ShieldCheck,
  Radio,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export type DashboardTab = 'overview' | 'map' | 'registry' | 'trends' | 'facilities' | 'audit';

interface DashboardSidebarProps {
  activeTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  totalCases: number;
  totalFacilities: number;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  activeTab,
  onSelectTab,
  isCollapsed,
  onToggleCollapse,
  totalCases,
  totalFacilities,
}) => {
  const navItems = [
    {
      id: 'overview' as DashboardTab,
      label: 'Executive Overview',
      icon: <LayoutDashboard className="w-4 h-4" />,
      badge: 'Live',
      badgeColor: 'bg-emerald-500/20 text-emerald-400',
    },
    {
      id: 'map' as DashboardTab,
      label: 'Geospatial Explorer',
      icon: <MapPin className="w-4 h-4" />,
      badge: '5 States',
      badgeColor: 'bg-[#0082FF]/20 text-[#00D2FF]',
    },
    {
      id: 'registry' as DashboardTab,
      label: 'Active Case Registry',
      icon: <ClipboardList className="w-4 h-4" />,
      badge: totalCases.toLocaleString(),
      badgeColor: 'bg-blue-500/20 text-blue-300',
    },
    {
      id: 'trends' as DashboardTab,
      label: '10-Quarter Trajectory',
      icon: <TrendingUp className="w-4 h-4" />,
      badge: '2024-26',
      badgeColor: 'bg-purple-500/20 text-purple-300',
    },
    {
      id: 'facilities' as DashboardTab,
      label: 'Sentinel Facilities',
      icon: <Building2 className="w-4 h-4" />,
      badge: `${totalFacilities}`,
      badgeColor: 'bg-amber-500/20 text-amber-300',
    },
    {
      id: 'audit' as DashboardTab,
      label: 'Zero-PII Audit Ledger',
      icon: <ShieldCheck className="w-4 h-4" />,
      badge: '100% Valid',
      badgeColor: 'bg-emerald-500/20 text-emerald-400',
    },
  ];

  return (
    <aside
      className={`bg-[#0A0D16] border-r border-white/10 text-white flex flex-col justify-between transition-all duration-300 select-none z-30 shrink-0 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* ── Top Navigation Links ─────────────────────────────── */}
      <div className="p-3 space-y-6">
        
        {/* Collapse / Expand Toggle Button */}
        <div className="flex items-center justify-between px-2 pt-2">
          {!isCollapsed && (
            <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">
              Surveillance Modules
            </span>
          )}
          <button
            onClick={onToggleCollapse}
            className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer ml-auto"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Nav Items List */}
        <nav className="space-y-1.5 font-sans">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                title={isCollapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#0082FF] text-white shadow-md font-bold'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className={`${isActive ? 'text-white' : 'text-gray-400'}`}>
                  {item.icon}
                </div>

                {!isCollapsed && (
                  <div className="flex-1 flex items-center justify-between overflow-hidden">
                    <span className="truncate text-left">{item.label}</span>
                    {item.badge && (
                      <span
                        className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-md ${
                          isActive ? 'bg-white/20 text-white' : item.badgeColor
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </nav>

      </div>

      {/* ── Bottom Telemetry & Compliance Box ───────────────── */}
      {!isCollapsed && (
        <div className="p-4 m-3 rounded-2xl bg-[#0F1524] border border-white/10 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between text-gray-400">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px]">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>DHIS2 v2.41 Active</span>
            </div>
            <span className="text-[10px] text-gray-500">Live API</span>
          </div>

          <div className="space-y-1 text-[10px] text-gray-400">
            <div className="flex justify-between">
              <span>Sync Protocol:</span>
              <span className="text-white font-semibold">REST JSON / HTTPS</span>
            </div>
            <div className="flex justify-between">
              <span>Token Standard:</span>
              <span className="text-emerald-400 font-semibold">SHA-256 HMAC</span>
            </div>
            <div className="flex justify-between">
              <span>National Node:</span>
              <span className="text-[#0082FF] font-semibold">FMoHSW Abuja</span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
