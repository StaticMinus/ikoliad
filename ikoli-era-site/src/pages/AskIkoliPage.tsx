import React, { useState, useRef, useEffect } from 'react';
import {
  streamClinicalAI,
  type GeminiAttachment,
  type ResponsePersona,
} from '../services/geminiService';
import { webAudioService } from '../services/webAudioService';
import { ClinicalMarkdown } from '../components/ui/ClinicalMarkdown';
import { MagneticButton } from '../components/ui/MagneticButton';
import { GlowingOrb } from '../components/cortex/GlowingOrb';
import { FeatureActionCards } from '../components/cortex/FeatureActionCards';
import { CortexSidebar, type ChatSession } from '../components/cortex/CortexSidebar';
import { LiveVoiceCallModal } from '../components/cortex/LiveVoiceCallModal';
import {
  Paperclip,
  ArrowUp,
  User,
  Copy,
  Check,
  X,
  FileText,
  Sun,
  Moon,
  Volume2,
  Square,
  Share2,
  HelpCircle,
  Menu,
  PhoneCall,
  Plus,
  Globe,
  ChevronDown,
  BarChart2,
  Edit3,
} from 'lucide-react';

interface AskIkoliPageProps {
  onNavigate: (page: 'home' | 'dashboard' | 'diseases' | 'ask' | 'about' | 'styles' | 'api' | 'protocols') => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  category?: string;
  dimensions?: string[];
  followUpPrompt?: string;
  attachment?: GeminiAttachment;
  source?: 'omniroute-live' | 'gemini-live' | 'openrouter-live' | 'clinical-knowledge-base';
}

const SESSIONS_STORAGE_KEY = 'ikoli_cortex_sessions_v2';
const ACTIVE_SESSION_STORAGE_KEY = 'ikoli_cortex_active_session_v2';

export const AskIkoliPage: React.FC<AskIkoliPageProps> = ({ onNavigate }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [deeperResearchActive, setDeeperResearchActive] = useState(true);
  const [isVoiceCallOpen, setIsVoiceCallOpen] = useState(false);
  const persona: ResponsePersona = 'visitor';

  // ── 1. Multi-Session Persistent Storage ───────────────────────────
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    try {
      const saved = localStorage.getItem(SESSIONS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.warn('Failed to load chat sessions:', err);
    }
    const initialSession: ChatSession = {
      id: 'session-' + Date.now(),
      title: 'New Consultation',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      messages: [],
    };
    return [initialSession];
  });

  const [activeSessionId, setActiveSessionId] = useState<string>(() => {
    try {
      const savedId = localStorage.getItem(ACTIVE_SESSION_STORAGE_KEY);
      if (savedId) return savedId;
    } catch {
      // fallback
    }
    return sessions[0]?.id || 'session-' + Date.now();
  });

  // Active Session Helper
  const currentSession = sessions.find((s) => s.id === activeSessionId) || sessions[0];
  const messages: ChatMessage[] = currentSession?.messages || [];

  // Sync sessions to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(sessions));
      if (activeSessionId) {
        localStorage.setItem(ACTIVE_SESSION_STORAGE_KEY, activeSessionId);
      }
    } catch (err) {
      console.warn('Failed to persist sessions:', err);
    }
  }, [sessions, activeSessionId]);

  // Input & Messaging States
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isActivelyTyping, setIsActivelyTyping] = useState(false);
  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleInputChange = (val: string) => {
    setInputQuery(val);
    setIsActivelyTyping(true);
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
    }
    typingTimerRef.current = setTimeout(() => {
      setIsActivelyTyping(false);
    }, 600);
  };

  const handleInputKeyDown = () => {
    setIsActivelyTyping(true);
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
    }
    typingTimerRef.current = setTimeout(() => {
      setIsActivelyTyping(false);
    }, 600);
  };

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showShareToast, setShowShareToast] = useState(false);

  // Attachments State
  const [attachedFile, setAttachedFile] = useState<GeminiAttachment | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Voice & Audio State
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  // Preload and keep voices refreshed
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const updateVoices = () => {
        try {
          const voices = window.speechSynthesis.getVoices();
          if (voices && voices.length > 0) {
            setAvailableVoices(voices);
          }
        } catch {
          // ignore
        }
      };
      updateVoices();
      window.speechSynthesis.onvoiceschanged = updateVoices;
      return () => {
        try {
          window.speechSynthesis.cancel();
          webAudioService.stopSpeechModulation();
        } catch {
          // ignore
        }
      };
    }
  }, []);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isDark = theme === 'dark';

  // Smooth scroll feed when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, isStreaming]);

  // ── 2. Session Management Actions ─────────────────────────────────
  const handleNewSession = () => {
    const newSession: ChatSession = {
      id: 'session-' + Date.now(),
      title: 'New Consultation',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      messages: [],
    };
    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
    setInputQuery('');
    setAttachedFile(null);
  };

  const handleSelectSession = (id: string) => {
    setActiveSessionId(id);
    setInputQuery('');
    setAttachedFile(null);
  };

  const handleDeleteSession = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSessions((prev) => {
      const filtered = prev.filter((s) => s.id !== id);
      if (filtered.length === 0) {
        const fresh: ChatSession = {
          id: 'session-' + Date.now(),
          title: 'New Consultation',
          createdAt: Date.now(),
          updatedAt: Date.now(),
          messages: [],
        };
        setActiveSessionId(fresh.id);
        return [fresh];
      }
      if (activeSessionId === id) {
        setActiveSessionId(filtered[0].id);
      }
      return filtered;
    });
  };

  const handleShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 2500);
  };

  // ── 3. Voice Recognition Handler with WebAudio DSP ───────────────
  const handleToggleVoice = async () => {
    // Open full-screen live voice call interactive mode
    setIsVoiceCallOpen(true);
  };

  // ── 4. File Attachment Handler ────────────────────────────────────
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      alert('File size exceeds 8MB limit for clinical uploads.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64Data = (reader.result as string).split(',')[1];
      setAttachedFile({
        name: file.name,
        type: file.type || 'application/octet-stream',
        size: file.size,
        base64: base64Data,
        previewUrl: URL.createObjectURL(file),
      });
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // ── 5. Main Send Message Dispatcher with Real-Time Streaming ──────
  const handleSend = async (overridePrompt?: string) => {
    const queryToSend = overridePrompt || inputQuery.trim();
    if (!queryToSend && !attachedFile) return;

    const userMessage: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: queryToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      attachment: attachedFile || undefined,
    };

    // Auto-title session if first message
    const isFirstMessage = messages.length === 0;
    const sessionTitle = isFirstMessage
      ? queryToSend.slice(0, 36) + (queryToSend.length > 36 ? '...' : '')
      : currentSession?.title || 'Consultation';

    // Clear composer
    setInputQuery('');
    const currentAttachment = attachedFile;
    setAttachedFile(null);
    setIsTyping(true);
    setIsStreaming(true);

    // Optimistically update session with User Message only (no empty AI placeholder)
    const baseMessages = [...messages, userMessage];
    setSessions((prev) =>
      prev.map((s) =>
        s.id === activeSessionId
          ? {
              ...s,
              title: sessionTitle,
              updatedAt: Date.now(),
              messages: baseMessages,
            }
          : s
      )
    );

    // Abort controller for stream cancelation
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    const aiMessageId = 'msg-' + (Date.now() + 1);

    try {
      for await (const chunk of streamClinicalAI(
        queryToSend,
        currentAttachment || undefined,
        persona,
        abortController.signal
      )) {
        setIsTyping(false); // First token arrived!

        const currentAiMsg: ChatMessage = {
          id: aiMessageId,
          sender: 'ai',
          text: chunk.fullText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          source: chunk.response.source,
          category: chunk.response.category,
          dimensions: chunk.response.dimensions,
          followUpPrompt: chunk.response.followUpPrompt,
        };

        setSessions((prev) =>
          prev.map((s) =>
            s.id === activeSessionId
              ? {
                  ...s,
                  updatedAt: Date.now(),
                  messages: [...baseMessages, currentAiMsg],
                }
              : s
          )
        );
      }

      setIsStreaming(false);
      setIsTyping(false);
    } catch (err) {
      console.error('Send streaming error:', err);
      setIsStreaming(false);
      setIsTyping(false);
    }
  };

  // Handle voice call log into chat transcript
  const handleVoiceCallTranscript = (userText: string, aiText: string) => {
    const userMessage: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const aiMessage: ChatMessage = {
      id: 'msg-' + (Date.now() + 1),
      sender: 'ai',
      text: aiText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      source: 'clinical-knowledge-base',
    };

    setSessions((prev) =>
      prev.map((s) =>
        s.id === activeSessionId
          ? {
              ...s,
              updatedAt: Date.now(),
              messages: [...s.messages, userMessage, aiMessage],
            }
          : s
      )
    );
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // ── 6. Speech Synthesis with Low-Latency Web Audio DSP ─────────────
  const handleSpeak = (id: string, text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported on this browser.');
      return;
    }

    // If currently speaking this message, stop it immediately
    if (speakingMessageId === id) {
      try {
        window.speechSynthesis.cancel();
        webAudioService.stopSpeechModulation();
      } catch {
        // ignore
      }
      setSpeakingMessageId(null);
      setIsSpeaking(false);
      return;
    }

    try {
      // Chromium pause/resume fix: unfreeze synthesis engine
      window.speechSynthesis.cancel();
      window.speechSynthesis.resume();

      // Clean text of markdown characters, citations, bullets
      const cleanText = text
        .replace(/\[\^?[^\]]+\]/g, '')
        .replace(/[*_#`~>]/g, '')
        .replace(/•/g, '')
        .replace(/\n+/g, '. ')
        .trim();

      if (!cleanText) return;

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utteranceRef.current = utterance;

      // Pick best natural English voice available
      const voices = availableVoices.length > 0 ? availableVoices : window.speechSynthesis.getVoices();
      const naturalVoice = voices.find(
        (v) =>
          (v.name.includes('Natural') ||
            v.name.includes('Google') ||
            v.name.includes('Samantha') ||
            v.name.includes('Daniel') ||
            v.name.includes('English') ||
            v.name.includes('Jenny')) &&
          v.lang.startsWith('en')
      ) || voices.find((v) => v.lang.startsWith('en')) || voices[0];

      if (naturalVoice) {
        utterance.voice = naturalVoice;
      }

      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      utterance.onstart = () => {
        setSpeakingMessageId(id);
        setIsSpeaking(true);
        webAudioService.startSpeechModulation();
      };

      utterance.onend = () => {
        setSpeakingMessageId(null);
        setIsSpeaking(false);
        webAudioService.stopSpeechModulation();
        utteranceRef.current = null;
      };

      utterance.onerror = (e) => {
        console.warn('Speech synthesis cancelled or encountered error:', e);
        setSpeakingMessageId(null);
        setIsSpeaking(false);
        webAudioService.stopSpeechModulation();
        utteranceRef.current = null;
      };

      window.speechSynthesis.speak(utterance);
      // Double resume for Chromium audio engine unlock
      window.speechSynthesis.resume();
    } catch (err) {
      console.error('Speech synthesis exception:', err);
      setSpeakingMessageId(null);
      setIsSpeaking(false);
      webAudioService.stopSpeechModulation();
    }
  };

  return (
    <div className={`w-screen h-screen overflow-hidden flex select-none font-sans antialiased transition-colors duration-300 ${
      isDark ? 'bg-[#0A0A0C] text-white' : 'bg-[#FBFBFD] text-[#1D1D1F]'
    }`}>
      
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*,.pdf,.doc,.docx"
        className="hidden"
      />

      {/* Live Interactive Voice Call Modal */}
      <LiveVoiceCallModal
        isOpen={isVoiceCallOpen}
        onClose={() => setIsVoiceCallOpen(false)}
        onTranscriptMessage={handleVoiceCallTranscript}
        persona={persona}
      />

      {/* ── Left Sidebar Drawer (Desktop Collapsible & Mobile Slide-Over) ── */}
      <CortexSidebar
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSelectSession={handleSelectSession}
        onNewSession={handleNewSession}
        onDeleteSession={handleDeleteSession}
        onNavigate={onNavigate}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
        isDark={isDark}
      />

      {/* ── Main Right Studio Workspace (Full Width) ────────────────────── */}
      <main className={`flex-1 h-full flex flex-col justify-between overflow-hidden relative transition-colors duration-300 ${
        isDark ? 'bg-[#0D0D11]' : 'bg-[#F5F5F7]'
      }`}>
        
        {/* ── Top Header Toolbar (Clean & Focused) ───────────────────────── */}
        <header className={`h-14 px-3 sm:px-6 border-b flex items-center justify-between shrink-0 select-none backdrop-blur-md z-20 transition-colors duration-300 ${
          isDark
            ? 'border-white/10 bg-[#0D0D11]/90 text-white'
            : 'border-black/5 bg-white/90 text-[#1D1D1F]'
        }`}>
          
          {/* Left: Mobile Hamburger & Model Selector Pill */}
          <div className="flex items-center gap-2">
            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={`md:hidden w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                isDark ? 'bg-white/10 text-white hover:bg-white/15' : 'bg-black/5 text-[#1D1D1F] hover:bg-black/10'
              }`}
              title="Open conversations menu"
            >
              <Menu className="w-4 h-4" />
            </button>

            {/* Model / Brand Pill Button (Clean, No v0.1) */}
            <button
              className={`px-3.5 py-1.5 rounded-full border text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-xs ${
                isDark
                  ? 'border-white/10 bg-white/5 text-gray-200 hover:bg-white/10'
                  : 'border-black/10 bg-[#EBEBED] text-[#1D1D1F] hover:bg-gray-200'
              }`}
            >
              <div className="w-2 h-2 rounded-full bg-[#0071E3] shadow-[0_0_8px_#0071E3] animate-pulse" />
              <span className={`tracking-tight font-display font-bold ${
                isDark ? 'text-white' : 'text-[#1D1D1F]'
              }`}>
                Ask Ikoli
              </span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>
          </div>

          {/* Right: Actions (Interactive Voice Call, Share, Theme) */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Live Interactive Voice Call Action */}
            <button
              onClick={() => setIsVoiceCallOpen(true)}
              className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-semibold transition-all cursor-pointer shadow-xs ${
                isDark
                  ? 'bg-[#0071E3]/20 hover:bg-[#0071E3]/30 text-[#00D2FF] border border-[#0071E3]/40 shadow-[0_0_12px_rgba(0,113,227,0.3)]'
                  : 'bg-[#0071E3] hover:bg-[#0077ED] text-white shadow-[0_0_12px_rgba(0,113,227,0.3)]'
              }`}
              title="Start Live Voice Call"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Voice Call</span>
            </button>

            {/* Desktop Share Button */}
            <button
              onClick={handleShareLink}
              className={`hidden sm:flex p-2 rounded-xl transition-colors cursor-pointer ${
                isDark
                  ? 'text-gray-400 hover:text-white hover:bg-white/5'
                  : 'text-gray-600 hover:text-black hover:bg-black/5'
              }`}
              title="Copy conversation link"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                isDark ? 'text-yellow-400 hover:bg-white/10' : 'text-gray-700 hover:bg-black/5'
              }`}
              title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

        </header>

        {/* Share Toast Notification */}
        {showShareToast && (
          <div className="absolute top-16 right-6 z-50 bg-[#1D1D1F] text-white border border-white/15 px-4 py-2 rounded-full text-xs font-semibold shadow-2xl flex items-center gap-2 animate-bounce">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>Link copied to clipboard!</span>
          </div>
        )}

        {/* ── Main Chat / Empty State Container ─────────────────────────── */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar px-4 sm:px-8 py-4 sm:py-6 space-y-6 flex flex-col justify-start">
          
          {/* ── A. EMPTY STATE ───────────────────────────────────────────── */}
          {messages.length === 0 && (
            <>
              {/* 1. DESKTOP VIEW (Rich Studio with Composer Card & Feature Tiles) */}
              <div className="hidden md:block my-auto max-w-3xl w-full mx-auto space-y-8 text-center select-none py-6">
                
                {/* 3D Blue Orb (Clicking opens voice call!) */}
                <div
                  onClick={() => setIsVoiceCallOpen(true)}
                  className="flex items-center justify-center transform hover:scale-105 transition-transform duration-500 cursor-pointer group"
                  title="Click to start live interactive voice call"
                >
                  <GlowingOrb
                    size={140}
                    isTyping={isActivelyTyping}
                    isAudioActive={isSpeaking}
                  />
                </div>

                {/* Headline */}
                <div className="space-y-2">
                  <h1 className={`font-display font-black text-3xl sm:text-5xl tracking-tight leading-tight ${
                    isDark ? 'text-white' : 'text-[#1D1D1F]'
                  }`}>
                    How can I assist you today?
                  </h1>
                </div>

                {/* Demonstration Notice */}
                <div className={`max-w-xl mx-auto rounded-full px-4 py-1.5 text-[11px] font-medium flex items-center justify-center gap-2 border ${
                  isDark
                    ? 'bg-amber-500/10 border-amber-500/20 text-amber-300'
                    : 'bg-amber-500/10 border-amber-500/30 text-amber-900'
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                  <span>
                    <strong>Demonstration environment:</strong> Data are synthetic/illustrative.
                  </span>
                </div>

                {/* Elevated Initial Composer Card */}
                <div className={`rounded-[26px] p-4 sm:p-5 border space-y-3 text-left transition-all ${
                  isDark
                    ? 'bg-[#141418] border-white/10 shadow-[0_16px_50px_rgba(0,0,0,0.3)]'
                    : 'bg-white border-black/8 shadow-[0_16px_50px_rgba(0,0,0,0.06)]'
                }`}>

                  {attachedFile && (
                    <div className={`p-2.5 rounded-xl border flex items-center justify-between text-xs ${
                      isDark ? 'bg-blue-950/40 border-blue-800 text-blue-200' : 'bg-blue-50 border-blue-200 text-blue-900'
                    }`}>
                      <div className="flex items-center gap-2 truncate">
                        <FileText className="w-4 h-4 shrink-0 text-[#0071E3]" />
                        <span className="truncate font-medium">{attachedFile.name}</span>
                      </div>
                      <button
                        onClick={() => setAttachedFile(null)}
                        className="p-1 hover:opacity-70 rounded-full"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {/* Textarea Input */}
                  <textarea
                    value={inputQuery}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onInput={(e) => handleInputChange((e.target as HTMLTextAreaElement).value)}
                    onKeyDown={(e) => {
                      handleInputKeyDown();
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder="Ask about leprosy early signs, 2025 South-East cases, or WHO protocols..."
                    className={`w-full bg-transparent text-sm sm:text-base outline-none resize-none min-h-[64px] font-sans leading-relaxed ${
                      isDark ? 'text-white placeholder-gray-500' : 'text-[#1D1D1F] placeholder-gray-400'
                    }`}
                  />

                  {/* Inside Composer Toolbar */}
                  <div className={`flex items-center justify-between pt-2 border-t ${
                    isDark ? 'border-white/5' : 'border-black/5'
                  }`}>
                    
                    {/* Left: Deeper Research Pill */}
                    <button
                      onClick={() => setDeeperResearchActive(!deeperResearchActive)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
                        deeperResearchActive
                          ? isDark
                            ? 'bg-[#0071E3]/20 text-[#00D2FF] border-[#0071E3]/40 shadow-[0_0_12px_rgba(0,113,227,0.3)]'
                            : 'bg-[#0071E3]/15 text-[#0071E3] border-[#0071E3]/30'
                          : isDark
                          ? 'bg-white/5 text-gray-400 border-white/5 hover:text-white'
                          : 'bg-black/5 text-gray-500 border-black/5 hover:text-black'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${deeperResearchActive ? 'bg-[#00D2FF] animate-pulse' : 'bg-gray-400'}`} />
                      <span>Deeper research</span>
                    </button>

                    {/* Right: Attach, Voice Call, Send */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className={`p-2 rounded-xl transition-colors cursor-pointer ${
                          isDark ? 'text-gray-400 hover:text-[#00D2FF] hover:bg-white/5' : 'text-gray-500 hover:text-[#0071E3] hover:bg-black/5'
                        }`}
                        title="Attach clinical document or image"
                      >
                        <Paperclip className="w-4 h-4" />
                      </button>

                      <button
                        onClick={handleToggleVoice}
                        className={`p-2 rounded-xl transition-all cursor-pointer ${
                          isDark
                            ? 'text-gray-400 hover:text-[#00D2FF] hover:bg-white/5'
                            : 'text-gray-500 hover:text-[#0071E3] hover:bg-black/5'
                        }`}
                        title="Start live interactive voice call"
                      >
                        <PhoneCall className="w-4 h-4" />
                      </button>

                      <MagneticButton onClick={() => handleSend()}>
                        <button
                          disabled={!inputQuery.trim() && !attachedFile}
                          className="px-4 py-2 rounded-xl bg-[#0071E3] hover:bg-[#0077ED] text-white font-semibold text-xs flex items-center gap-1.5 transition-transform hover:scale-105 active:scale-95 disabled:opacity-30 cursor-pointer shadow-[0_0_12px_rgba(0,113,227,0.4)]"
                        >
                          <span>Send</span>
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                      </MagneticButton>
                    </div>

                  </div>
                </div>

                {/* Feature Quick Action Cards */}
                <div className="pt-2">
                  <FeatureActionCards onSelectQuery={(query: string) => handleSend(query)} isDark={isDark} />
                </div>

              </div>

              {/* 2. MOBILE VIEW (ChatGPT-Style Ultra Minimal) */}
              <div className="md:hidden flex-1 flex flex-col justify-between py-6 max-w-sm mx-auto w-full">
                
                {/* Centered Minimal 3D Blue Orb */}
                <div
                  onClick={() => setIsVoiceCallOpen(true)}
                  className="my-auto flex flex-col items-center justify-center space-y-4 cursor-pointer"
                  title="Tap to start live voice call"
                >
                  <GlowingOrb
                    size={110}
                    isTyping={isActivelyTyping}
                    isAudioActive={isSpeaking}
                  />
                  <h2 className={`font-display font-bold text-lg tracking-tight ${
                    isDark ? 'text-white' : 'text-[#1D1D1F]'
                  }`}>
                    What can I help with?
                  </h2>
                </div>

                {/* Clean Vertical Action List (No 'Create Image', Clean Clinical Focus) */}
                <div className="space-y-2 pt-4">
                  <button
                    onClick={() => handleSend("Generate an epidemiological breakdown and chart of 2025 SDR-PEP coverage vs case reduction.")}
                    className={`w-full flex items-center gap-3.5 p-3.5 rounded-2xl border transition-all text-left text-sm font-medium cursor-pointer ${
                      isDark
                        ? 'bg-white/5 border-white/10 text-gray-200 hover:bg-white/10'
                        : 'bg-white border-black/8 text-[#1D1D1F] hover:bg-gray-50 shadow-xs'
                    }`}
                  >
                    <BarChart2 className="w-5 h-5 text-[#00D2FF] shrink-0" />
                    <span>Synthesize 2025 South-East surveillance data</span>
                  </button>

                  <button
                    onClick={() => handleSend("Draft a clinical referral note for a suspected multibacillary patient at Mile 4 Hospital.")}
                    className={`w-full flex items-center gap-3.5 p-3.5 rounded-2xl border transition-all text-left text-sm font-medium cursor-pointer ${
                      isDark
                        ? 'bg-white/5 border-white/10 text-gray-200 hover:bg-white/10'
                        : 'bg-white border-black/8 text-[#1D1D1F] hover:bg-gray-50 shadow-xs'
                    }`}
                  >
                    <Edit3 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>Write or edit patient referral</span>
                  </button>

                  <button
                    onClick={() => handleSend("Search WHO & NTBLCP 2024 protocols for Single-Dose Rifampicin (SDR-PEP) contact screening.")}
                    className={`w-full flex items-center gap-3.5 p-3.5 rounded-2xl border transition-all text-left text-sm font-medium cursor-pointer ${
                      isDark
                        ? 'bg-white/5 border-white/10 text-gray-200 hover:bg-white/10'
                        : 'bg-white border-black/8 text-[#1D1D1F] hover:bg-gray-50 shadow-xs'
                    }`}
                  >
                    <Globe className="w-5 h-5 text-blue-400 shrink-0" />
                    <span>Search surveillance &amp; WHO guidelines</span>
                  </button>
                </div>

              </div>
            </>
          )}

          {/* ── B. ACTIVE CHAT CONVERSATION STREAM ───────────────────────── */}
          {messages.length > 0 && (
            <div className="max-w-3xl w-full mx-auto space-y-6 pb-4">
              {messages.map((msg, idx) => {
                if (msg.sender === 'ai' && !msg.text) return null;
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 sm:gap-3.5 ${
                      msg.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {/* AI Avatar Mini Orb */}
                    {msg.sender === 'ai' && (
                      <div className="w-8 h-8 flex items-center justify-center shrink-0 mt-0.5">
                        <GlowingOrb
                          size={28}
                          interactive={false}
                          isAudioActive={speakingMessageId === msg.id}
                          isTyping={isStreaming && idx === messages.length - 1}
                        />
                      </div>
                    )}

                    {/* Message Bubble Card */}
                    <div
                      className={`max-w-[85%] sm:max-w-[78%] rounded-[24px] p-4 sm:p-5 shadow-xs transition-all space-y-3 ${
                        msg.sender === 'user'
                          ? 'bg-[#0071E3] text-white font-medium rounded-tr-xs'
                          : isDark
                          ? 'bg-[#141418] border border-white/10 text-gray-100 rounded-tl-xs'
                          : 'bg-white border border-black/8 text-[#1D1D1F] rounded-tl-xs shadow-[0_4px_20px_rgba(0,0,0,0.03)]'
                      }`}
                    >
                      {/* Attachment Preview */}
                      {msg.attachment && (
                        <div className={`p-2.5 rounded-xl border text-xs flex items-center gap-2 font-mono ${
                          isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/5'
                        }`}>
                          <FileText className="w-4 h-4 text-[#0071E3]" />
                          <span className="truncate">{msg.attachment.name}</span>
                        </div>
                      )}

                      {/* Content Rendered with Citations & GenUI */}
                      <ClinicalMarkdown
                        content={msg.text}
                        onSelectOption={(opt) => handleSend(opt)}
                        isDark={isDark}
                      />

                      {/* Typewriter pulse cursor when actively streaming */}
                      {isStreaming && idx === messages.length - 1 && msg.sender === 'ai' && (
                        <span className="inline-block w-2 h-4 bg-[#00D2FF] ml-1 animate-pulse align-middle" />
                      )}

                      {/* AI Response Tools */}
                      {msg.sender === 'ai' && msg.text && (
                        <div className={`flex items-center justify-between gap-3 pt-2 border-t text-[11px] ${
                          isDark ? 'border-white/5 text-gray-400' : 'border-black/5 text-gray-500'
                        }`}>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleCopy(msg.id, msg.text)}
                              className={`flex items-center gap-1 transition-colors cursor-pointer ${
                                isDark ? 'hover:text-[#00D2FF]' : 'hover:text-[#0071E3]'
                              }`}
                            >
                              {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                              <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                            </button>

                            <button
                              onClick={() => handleSpeak(msg.id, msg.text)}
                              className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                                speakingMessageId === msg.id
                                  ? 'text-red-400 font-semibold'
                                  : isDark
                                  ? 'hover:text-[#00D2FF] text-gray-400'
                                  : 'hover:text-[#0071E3] text-gray-500'
                              }`}
                              title={speakingMessageId === msg.id ? 'Stop listening' : 'Listen to response'}
                            >
                              {speakingMessageId === msg.id ? (
                                <>
                                  <Square className="w-3 h-3 fill-red-400 text-red-400 animate-pulse" />
                                  <span>Stop</span>
                                </>
                              ) : (
                                <>
                                  <Volume2 className="w-3.5 h-3.5" />
                                  <span>Listen</span>
                                </>
                              )}
                            </button>
                          </div>

                          <span className="font-mono text-[10px] opacity-70">
                            {msg.timestamp}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* User Avatar */}
                    {msg.sender === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-[#0071E3] text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                );
              })}

              {/* AI Thinking Indicator (before first token stream) */}
              {isTyping && (
                <div className="flex items-start gap-3.5 justify-start">
                  <div className="w-8 h-8 flex items-center justify-center shrink-0">
                    <GlowingOrb size={28} interactive={false} isTyping={true} />
                  </div>
                  <div className={`p-4 rounded-2xl border shadow-xs flex items-center gap-2.5 text-xs font-medium ${
                    isDark
                      ? 'bg-[#141418] border-white/10 text-[#00D2FF]'
                      : 'bg-white border-black/8 text-[#0071E3]'
                  }`}>
                    <span className="w-2 h-2 rounded-full bg-[#0071E3] shadow-[0_0_8px_#0071E3] animate-ping" />
                    <span className="font-sans font-medium">Synthesizing clinical evidence…</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}

        </div>

        {/* ── 1. DESKTOP BOTTOM COMPOSER (When Messages Exist) ─────────── */}
        {messages.length > 0 && (
          <div className={`hidden md:block p-4 sm:p-6 border-t backdrop-blur-xl shrink-0 transition-colors ${
            isDark ? 'border-white/10 bg-[#0D0D11]/95' : 'border-black/5 bg-white/95'
          }`}>
            <div className={`max-w-3xl mx-auto rounded-2xl p-3 border shadow-md space-y-2 text-left transition-colors ${
              isDark ? 'bg-[#141418] border-white/10 text-white' : 'bg-[#F9F9FB] border-black/10 text-[#1D1D1F]'
            }`}>
              
              {attachedFile && (
                <div className={`p-2 rounded-lg text-xs flex items-center justify-between ${
                  isDark ? 'bg-blue-950/40 text-blue-200' : 'bg-blue-50 text-blue-900'
                }`}>
                  <span className="truncate font-medium">{attachedFile.name}</span>
                  <button onClick={() => setAttachedFile(null)} className="p-1 hover:text-red-400">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <textarea
                value={inputQuery}
                onChange={(e) => handleInputChange(e.target.value)}
                onInput={(e) => handleInputChange((e.target as HTMLTextAreaElement).value)}
                onKeyDown={(e) => {
                  handleInputKeyDown();
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask a follow-up question or query surveillance records..."
                className={`w-full bg-transparent text-sm outline-none resize-none min-h-[44px] ${
                  isDark ? 'text-white placeholder-gray-500' : 'text-[#1D1D1F] placeholder-gray-400'
                }`}
              />

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className={`p-1.5 rounded-lg transition-colors ${
                      isDark ? 'text-gray-400 hover:text-[#00D2FF] hover:bg-white/5' : 'text-gray-500 hover:text-[#0071E3] hover:bg-black/5'
                    }`}
                  >
                    <Paperclip className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleToggleVoice}
                    className={`p-1.5 rounded-lg ${isDark ? 'text-gray-400 hover:text-[#00D2FF] hover:bg-white/5' : 'text-gray-500 hover:text-[#0071E3] hover:bg-black/5'}`}
                    title="Start Live Voice Call"
                  >
                    <PhoneCall className="w-4 h-4" />
                  </button>
                </div>

                <MagneticButton onClick={() => handleSend()}>
                  <button
                    disabled={(!inputQuery.trim() && !attachedFile) || isStreaming}
                    className="px-3.5 py-1.5 rounded-xl bg-[#0071E3] hover:bg-[#0077ED] text-white font-semibold text-xs flex items-center gap-1.5 transition-transform hover:scale-105 active:scale-95 disabled:opacity-30 cursor-pointer shadow-[0_0_10px_rgba(0,113,227,0.4)]"
                  >
                    <span>Send</span>
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                </MagneticButton>
              </div>
            </div>
          </div>
        )}

        {/* ── 2. MOBILE FLOATING PILL COMPOSER (ChatGPT Mobile Style) ──── */}
        <div className="md:hidden p-3 w-full backdrop-blur-xl shrink-0 z-30">
          {attachedFile && (
            <div className={`mb-2 p-2 rounded-xl border flex items-center justify-between text-xs ${
              isDark ? 'bg-blue-950/50 border-blue-800 text-blue-200' : 'bg-blue-50 border-blue-200 text-blue-900'
            }`}>
              <div className="flex items-center gap-2 truncate">
                <FileText className="w-3.5 h-3.5 text-[#0071E3] shrink-0" />
                <span className="truncate">{attachedFile.name}</span>
              </div>
              <button onClick={() => setAttachedFile(null)} className="p-1 hover:opacity-70">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <div className={`w-full rounded-full px-3 py-1.5 border shadow-2xl flex items-center gap-2 transition-all ${
            isDark ? 'bg-[#18181C] border-white/15 text-white' : 'bg-white border-black/15 text-[#1D1D1F]'
          }`}>
            {/* Attachment '+' Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
                isDark ? 'bg-white/10 text-gray-200 hover:bg-white/20' : 'bg-black/5 text-gray-700 hover:bg-black/10'
              }`}
              title="Attach document or image"
            >
              <Plus className="w-4 h-4" />
            </button>

            {/* Input */}
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => handleInputChange(e.target.value)}
              onInput={(e) => handleInputChange((e.target as HTMLInputElement).value)}
              onKeyDown={(e) => {
                handleInputKeyDown();
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask Ikoli..."
              className="flex-1 bg-transparent text-sm outline-none placeholder-gray-400 py-1.5 font-sans"
            />

            {/* Voice Call or Send Arrow Button */}
            {inputQuery.trim() || attachedFile ? (
              <button
                onClick={() => handleSend()}
                disabled={isTyping || isStreaming}
                className="w-8 h-8 rounded-full bg-[#0071E3] text-white flex items-center justify-center shrink-0 shadow-xs cursor-pointer active:scale-95 transition-all"
              >
                <ArrowUp className="w-4 h-4 stroke-[2.5]" />
              </button>
            ) : (
              <button
                onClick={() => setIsVoiceCallOpen(true)}
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                  isDark
                    ? 'bg-white/10 text-gray-200 hover:bg-white/20'
                    : 'bg-black/5 text-gray-700 hover:bg-black/10'
                }`}
                title="Start live voice call"
              >
                <PhoneCall className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* ── Studio Bottom Footer (Desktop) ────────────────────────────── */}
        <footer className={`hidden md:flex h-9 px-6 border-t items-center justify-between text-[11px] shrink-0 select-none transition-colors ${
          isDark ? 'border-white/5 bg-[#0A0A0C] text-gray-500' : 'border-black/5 bg-[#F5F5F7] text-gray-500'
        }`}>
          <span className="truncate">
            IKOLI Consortium &bull; RedAid Nigeria (RAN), DAHW Germany &amp; NTBLCP
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('protocols')}
              className={`flex items-center gap-1 cursor-pointer transition-colors ${
                isDark ? 'hover:text-[#00D2FF]' : 'hover:text-[#0071E3]'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>WHO Protocols</span>
            </button>
          </div>
        </footer>

      </main>

    </div>
  );
};
