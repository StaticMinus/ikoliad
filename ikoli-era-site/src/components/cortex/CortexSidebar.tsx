import React, { useState } from 'react';
import {
  Plus,
  Search,
  Compass,
  BookOpen,
  FolderArchive,
  History,
  MessageSquare,
  Trash2,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';
import { GlowingOrb } from './GlowingOrb';

export interface ChatSession {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  messages: any[];
}

interface CortexSidebarProps {
  sessions: ChatSession[];
  activeSessionId: string | null;
  onSelectSession: (id: string) => void;
  onNewSession: () => void;
  onDeleteSession: (id: string, e: React.MouseEvent) => void;
  onNavigate: (page: 'home' | 'dashboard' | 'diseases' | 'ask' | 'about' | 'styles' | 'api' | 'protocols') => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  isDark?: boolean;
}

export const CortexSidebar: React.FC<CortexSidebarProps> = ({
  sessions,
  activeSessionId,
  onSelectSession,
  onNewSession,
  onDeleteSession,
  onNavigate,
  isCollapsed,
  onToggleCollapse,
  isOpenMobile = false,
  onCloseMobile,
  isDark = true,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter sessions by search query
  const filteredSessions = sessions.filter((s) =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group sessions by Today, Yesterday, and Previous 7 days
  const now = Date.now();
  const ONE_DAY_MS = 24 * 60 * 60 * 1000;

  const todaySessions = filteredSessions.filter((s) => now - s.updatedAt < ONE_DAY_MS);
  const yesterdaySessions = filteredSessions.filter(
    (s) => now - s.updatedAt >= ONE_DAY_MS && now - s.updatedAt < 2 * ONE_DAY_MS
  );
  const previous7DaysSessions = filteredSessions.filter(
    (s) => now - s.updatedAt >= 2 * ONE_DAY_MS && now - s.updatedAt < 7 * ONE_DAY_MS
  );
  const olderSessions = filteredSessions.filter((s) => now - s.updatedAt >= 7 * ONE_DAY_MS);

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between select-none">
      {/* ── TOP SECTION: BRAND & NEW CHAT ─────────────────────────── */}
      <div className="p-3.5 space-y-3 shrink-0">
        
        {/* Brand Header with Logo and Collapse/Close Toggle */}
        <div className="flex items-center justify-between gap-2">
          {(!isCollapsed || isOpenMobile) && (
            <div
              onClick={() => {
                onNavigate('home');
                if (isOpenMobile && onCloseMobile) onCloseMobile();
              }}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-7 h-7 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <GlowingOrb size={28} interactive={false} />
              </div>
              <div className="text-left">
                <span className={`font-display font-bold text-sm tracking-tight flex items-center gap-1.5 ${
                  isDark ? 'text-white' : 'text-[#1D1D1F]'
                }`}>
                  <span>Ask</span>
                  <span className="text-[#0071E3] font-bold">Ikoli</span>
                </span>
              </div>
            </div>
          )}

          {isCollapsed && !isOpenMobile && (
            <div
              onClick={() => onNavigate('home')}
              className="w-7 h-7 mx-auto flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
              title="Ask Ikoli"
            >
              <GlowingOrb size={28} interactive={false} />
            </div>
          )}

          {/* Desktop Collapse / Mobile Close */}
          {isOpenMobile ? (
            <button
              onClick={onCloseMobile}
              className={`p-1.5 rounded-lg border transition-colors cursor-pointer md:hidden ${
                isDark
                  ? 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                  : 'bg-white border-black/10 text-gray-600 hover:text-black'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onToggleCollapse}
              className={`hidden md:flex p-1.5 rounded-lg border transition-colors cursor-pointer ${
                isDark
                  ? 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                  : 'bg-white border-black/10 text-gray-600 hover:text-black hover:bg-gray-100 shadow-2xs'
              }`}
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              aria-label="Toggle sidebar"
            >
              {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>

        {/* Primary "+ New Chat" Button */}
        {(!isCollapsed || isOpenMobile) ? (
          <button
            onClick={() => {
              onNewSession();
              if (isOpenMobile && onCloseMobile) onCloseMobile();
            }}
            className={`w-full py-2.5 px-3.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer active:scale-98 ${
              isDark
                ? 'bg-white text-black hover:bg-gray-200'
                : 'bg-[#1D1D1F] text-white hover:bg-black'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>New Chat</span>
          </button>
        ) : (
          <button
            onClick={onNewSession}
            className={`w-9 h-9 mx-auto rounded-xl flex items-center justify-center transition-all cursor-pointer shadow-xs ${
              isDark
                ? 'bg-white text-black hover:bg-gray-200'
                : 'bg-[#1D1D1F] text-white hover:bg-black'
            }`}
            title="New Chat"
          >
            <Plus className="w-4 h-4" />
          </button>
        )}

        {/* Search Consultation Input */}
        {(!isCollapsed || isOpenMobile) && (
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chats..."
              className={`w-full text-xs pl-8 pr-3 py-1.5 rounded-lg border outline-none transition-colors ${
                isDark
                  ? 'bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-[#0071E3]'
                  : 'bg-white border-black/10 text-black placeholder-gray-400 focus:border-[#0071E3]'
              }`}
            />
          </div>
        )}

        {/* Quick Navigation Links */}
        {(!isCollapsed || isOpenMobile) && (
          <div className="space-y-1 pt-1 border-t border-white/5 dark:border-white/5">
            <button
              onClick={() => {
                onNavigate('dashboard');
                if (isOpenMobile && onCloseMobile) onCloseMobile();
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                isDark ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-black hover:bg-black/5'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-[#0071E3]" />
              <span>Surveillance Dashboard</span>
            </button>

            <button
              onClick={() => {
                onNavigate('protocols');
                if (isOpenMobile && onCloseMobile) onCloseMobile();
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                isDark ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-black hover:bg-black/5'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              <span>WHO & NTBLCP Guidelines</span>
            </button>

            <button
              onClick={() => {
                onNavigate('diseases');
                if (isOpenMobile && onCloseMobile) onCloseMobile();
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                isDark ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-black hover:bg-black/5'
              }`}
            >
              <FolderArchive className="w-3.5 h-3.5 text-blue-400" />
              <span>Skin-NTD Disease Index</span>
            </button>
          </div>
        )}

      </div>

      {/* ── MIDDLE SECTION: CONVERSATION HISTORY CHRONOLOGY ───────── */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-4">
        
        {(!isCollapsed || isOpenMobile) ? (
          <>
            {/* Today */}
            {todaySessions.length > 0 && (
              <div className="space-y-1">
                <div className="flex items-center gap-1 px-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  <History className="w-3 h-3" />
                  <span>Today</span>
                </div>
                {todaySessions.map((session) => (
                  <SessionItem
                    key={session.id}
                    session={session}
                    isActive={session.id === activeSessionId}
                    onSelect={() => {
                      onSelectSession(session.id);
                      if (isOpenMobile && onCloseMobile) onCloseMobile();
                    }}
                    onDelete={(e) => onDeleteSession(session.id, e)}
                    isDark={isDark}
                  />
                ))}
              </div>
            )}

            {/* Yesterday */}
            {yesterdaySessions.length > 0 && (
              <div className="space-y-1">
                <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  <span>Yesterday</span>
                </div>
                {yesterdaySessions.map((session) => (
                  <SessionItem
                    key={session.id}
                    session={session}
                    isActive={session.id === activeSessionId}
                    onSelect={() => {
                      onSelectSession(session.id);
                      if (isOpenMobile && onCloseMobile) onCloseMobile();
                    }}
                    onDelete={(e) => onDeleteSession(session.id, e)}
                    isDark={isDark}
                  />
                ))}
              </div>
            )}

            {/* Previous 7 Days */}
            {previous7DaysSessions.length > 0 && (
              <div className="space-y-1">
                <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  <span>Previous 7 Days</span>
                </div>
                {previous7DaysSessions.map((session) => (
                  <SessionItem
                    key={session.id}
                    session={session}
                    isActive={session.id === activeSessionId}
                    onSelect={() => {
                      onSelectSession(session.id);
                      if (isOpenMobile && onCloseMobile) onCloseMobile();
                    }}
                    onDelete={(e) => onDeleteSession(session.id, e)}
                    isDark={isDark}
                  />
                ))}
              </div>
            )}

            {/* Older */}
            {olderSessions.length > 0 && (
              <div className="space-y-1">
                <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  <span>Older Consultations</span>
                </div>
                {olderSessions.map((session) => (
                  <SessionItem
                    key={session.id}
                    session={session}
                    isActive={session.id === activeSessionId}
                    onSelect={() => {
                      onSelectSession(session.id);
                      if (isOpenMobile && onCloseMobile) onCloseMobile();
                    }}
                    onDelete={(e) => onDeleteSession(session.id, e)}
                    isDark={isDark}
                  />
                ))}
              </div>
            )}

            {/* Empty Search Fallback */}
            {filteredSessions.length === 0 && (
              <div className="text-center py-8 text-xs text-gray-500">
                No matching consultations.
              </div>
            )}
          </>
        ) : (
          <div className="space-y-2 pt-2">
            {sessions.slice(0, 8).map((session) => (
              <button
                key={session.id}
                onClick={() => onSelectSession(session.id)}
                className={`w-9 h-9 mx-auto rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                  session.id === activeSessionId
                    ? 'bg-[#0071E3] text-white shadow-xs'
                    : isDark
                    ? 'text-gray-400 hover:bg-white/10 hover:text-white'
                    : 'text-gray-500 hover:bg-black/5 hover:text-black'
                }`}
                title={session.title}
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            ))}
          </div>
        )}

      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (hidden on mobile) */}
      <aside
        className={`hidden md:flex flex-col justify-between transition-all duration-300 select-none border-r relative z-30 ${
          isCollapsed ? 'w-16' : 'w-64 sm:w-72'
        } ${
          isDark
            ? 'bg-[#111114] border-white/10 text-gray-200'
            : 'bg-[#F9F9FB] border-black/8 text-[#1D1D1F]'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer (Visible when isOpenMobile === true) */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 md:hidden flex animate-fadeIn">
          {/* Backdrop Overlay */}
          <div
            onClick={onCloseMobile}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer Panel */}
          <div
            className={`relative z-10 w-72 max-w-[85vw] h-full shadow-2xl transition-transform duration-300 ${
              isDark
                ? 'bg-[#111114] border-r border-white/10 text-gray-200'
                : 'bg-[#F9F9FB] border-r border-black/10 text-[#1D1D1F]'
            }`}
          >
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

// Subcomponent for individual session button
const SessionItem: React.FC<{
  session: ChatSession;
  isActive: boolean;
  onSelect: () => void;
  onDelete: (e: React.MouseEvent) => void;
  isDark: boolean;
}> = ({ session, isActive, onSelect, onDelete, isDark }) => {
  return (
    <div
      onClick={onSelect}
      className={`group w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
        isActive
          ? isDark
            ? 'bg-white/15 text-white shadow-xs font-semibold'
            : 'bg-white text-[#1D1D1F] shadow-xs font-semibold border border-black/10'
          : isDark
          ? 'text-gray-400 hover:bg-white/5 hover:text-white'
          : 'text-gray-600 hover:bg-black/5 hover:text-black'
      }`}
    >
      <span className="truncate flex-1 text-left">{session.title || 'Untitled Consultation'}</span>

      <button
        onClick={onDelete}
        title="Delete conversation"
        className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-500 rounded transition-opacity"
      >
        <Trash2 className="w-3 h-3" />
      </button>
    </div>
  );
};
