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
  Sparkles,
} from 'lucide-react';

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
  isDark = false,
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

  return (
    <aside
      className={`h-full flex flex-col justify-between transition-all duration-300 select-none border-r relative z-30 ${
        isCollapsed ? 'w-16' : 'w-64 sm:w-72'
      } ${
        isDark
          ? 'bg-[#121215] border-white/10 text-gray-200'
          : 'bg-[#F9F9FB] border-black/5 text-[#1D1D1F]'
      }`}
    >
      {/* ── TOP SECTION: BRAND & NEW CHAT ─────────────────────────── */}
      <div className="p-3.5 space-y-3 shrink-0">
        
        {/* Brand Header with Logo and Collapse Toggle */}
        <div className="flex items-center justify-between gap-2">
          {!isCollapsed && (
            <div
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#9333EA] to-[#6366F1] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="font-display font-black text-sm tracking-tight text-[#1D1D1F] dark:text-white flex items-center gap-1">
                  <span>IKOLI</span>
                  <span className="text-[#9333EA] font-semibold text-xs">Cortex</span>
                </span>
              </div>
            </div>
          )}

          {isCollapsed && (
            <div
              onClick={() => onNavigate('home')}
              className="w-8 h-8 mx-auto rounded-xl bg-gradient-to-tr from-[#9333EA] to-[#6366F1] flex items-center justify-center text-white shadow-xs cursor-pointer"
              title="IKOLI Cortex"
            >
              <Sparkles className="w-4 h-4" />
            </div>
          )}

          <button
            onClick={onToggleCollapse}
            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
              isDark
                ? 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                : 'bg-white border-black/5 text-gray-500 hover:text-black hover:bg-gray-100 shadow-2xs'
            }`}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-label="Toggle sidebar"
          >
            {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Primary "+ New Chat" Button */}
        {!isCollapsed ? (
          <button
            onClick={onNewSession}
            className="w-full py-2.5 px-3.5 rounded-xl bg-[#1D1D1F] hover:bg-[#2D2D30] dark:bg-white dark:hover:bg-gray-100 text-white dark:text-[#1D1D1F] font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer active:scale-98"
          >
            <Plus className="w-4 h-4" />
            <span>New chat</span>
          </button>
        ) : (
          <button
            onClick={onNewSession}
            className="w-10 h-10 mx-auto rounded-xl bg-[#1D1D1F] dark:bg-white text-white dark:text-[#1D1D1F] flex items-center justify-center shadow-xs hover:scale-105 active:scale-95 transition-transform cursor-pointer"
            title="New chat"
          >
            <Plus className="w-4 h-4" />
          </button>
        )}

        {/* Search Input Filter */}
        {!isCollapsed && (
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chats"
              className={`w-full pl-8 pr-7 py-1.5 rounded-xl text-xs outline-none border transition-all ${
                isDark
                  ? 'bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-purple-400/50'
                  : 'bg-white border-black/10 text-gray-800 placeholder-gray-400 focus:border-purple-500/50 shadow-2xs'
              }`}
            />
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] font-mono text-gray-400">
              ⌘K
            </span>
          </div>
        )}

        {/* Quick Nav Links */}
        {!isCollapsed && (
          <div className="space-y-0.5 pt-1 text-xs font-medium">
            <button
              onClick={() => onNavigate('dashboard')}
              className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-300 transition-colors cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 text-blue-500" />
              <span>Explore Surveillance</span>
            </button>
            <button
              onClick={() => onNavigate('diseases')}
              className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-300 transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-purple-500" />
              <span>Disease Library</span>
            </button>
            <button
              onClick={() => onNavigate('api')}
              className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-300 transition-colors cursor-pointer"
            >
              <FolderArchive className="w-3.5 h-3.5 text-emerald-500" />
              <span>MEAL Datasets &amp; API</span>
            </button>
          </div>
        )}

      </div>

      {/* ── MIDDLE SECTION: CHAT HISTORY STREAM ───────────────────── */}
      <div className="flex-1 overflow-y-auto px-2 space-y-4 text-left scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
        
        {!isCollapsed && (
          <>
            {/* Today Group */}
            {todaySessions.length > 0 && (
              <div className="space-y-1">
                <span className="text-[10px] font-semibold text-gray-400 px-3 uppercase tracking-wider block">
                  Today
                </span>
                {todaySessions.map((session) => (
                  <SessionItem
                    key={session.id}
                    session={session}
                    isActive={session.id === activeSessionId}
                    onSelect={() => onSelectSession(session.id)}
                    onDelete={(e) => onDeleteSession(session.id, e)}
                    isDark={isDark}
                  />
                ))}
              </div>
            )}

            {/* Yesterday Group */}
            {yesterdaySessions.length > 0 && (
              <div className="space-y-1">
                <span className="text-[10px] font-semibold text-gray-400 px-3 uppercase tracking-wider block">
                  Yesterday
                </span>
                {yesterdaySessions.map((session) => (
                  <SessionItem
                    key={session.id}
                    session={session}
                    isActive={session.id === activeSessionId}
                    onSelect={() => onSelectSession(session.id)}
                    onDelete={(e) => onDeleteSession(session.id, e)}
                    isDark={isDark}
                  />
                ))}
              </div>
            )}

            {/* Previous 7 Days Group */}
            {previous7DaysSessions.length > 0 && (
              <div className="space-y-1">
                <span className="text-[10px] font-semibold text-gray-400 px-3 uppercase tracking-wider block">
                  7 Days
                </span>
                {previous7DaysSessions.map((session) => (
                  <SessionItem
                    key={session.id}
                    session={session}
                    isActive={session.id === activeSessionId}
                    onSelect={() => onSelectSession(session.id)}
                    onDelete={(e) => onDeleteSession(session.id, e)}
                    isDark={isDark}
                  />
                ))}
              </div>
            )}

            {/* Older Sessions Group */}
            {olderSessions.length > 0 && (
              <div className="space-y-1">
                <span className="text-[10px] font-semibold text-gray-400 px-3 uppercase tracking-wider block">
                  Older
                </span>
                {olderSessions.map((session) => (
                  <SessionItem
                    key={session.id}
                    session={session}
                    isActive={session.id === activeSessionId}
                    onSelect={() => onSelectSession(session.id)}
                    onDelete={(e) => onDeleteSession(session.id, e)}
                    isDark={isDark}
                  />
                ))}
              </div>
            )}

            {/* Empty history indicator */}
            {sessions.length === 0 && (
              <div className="p-4 text-center text-gray-400 text-xs space-y-1">
                <History className="w-5 h-5 mx-auto opacity-40 mb-1" />
                <p>No chat history yet.</p>
                <p className="text-[10px] opacity-70">Ask a question to start a session.</p>
              </div>
            )}
          </>
        )}

        {isCollapsed && (
          <div className="space-y-2 pt-2">
            {sessions.slice(0, 8).map((session) => (
              <button
                key={session.id}
                onClick={() => onSelectSession(session.id)}
                className={`w-9 h-9 mx-auto rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                  session.id === activeSessionId
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-gray-400 hover:bg-black/5 dark:hover:bg-white/10 hover:text-black dark:hover:text-white'
                }`}
                title={session.title}
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            ))}
          </div>
        )}

      {/* Middle Section closes cleanly without bottom profile */}
      </div>

    </aside>
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
            : 'bg-white text-[#1D1D1F] shadow-xs font-semibold border border-black/5'
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
