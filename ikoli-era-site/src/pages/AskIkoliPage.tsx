import React, { useState, useRef, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import {
  queryGeminiClinicalAI,
  type GeminiAttachment,
} from '../services/geminiService';
import { ClinicalMarkdown } from '../components/ui/ClinicalMarkdown';
import { MagneticButton } from '../components/ui/MagneticButton';
import {
  Sparkles,
  Plus,
  Mic,
  MicOff,
  ArrowUp,
  User,
  Copy,
  Check,
  X,
  FileText,
  Sun,
  Moon,
  Volume2,
  RotateCcw,
} from 'lucide-react';

interface AskIkoliPageProps {
  onNavigate: (page: 'home' | 'dashboard' | 'diseases' | 'ask' | 'about' | 'styles' | 'api') => void;
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

export const AskIkoliPage: React.FC<AskIkoliPageProps> = ({ onNavigate }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  // Clean fresh start on every entry
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Attachments state
  const [attachedFile, setAttachedFile] = useState<GeminiAttachment | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Voice recording state
  const [isListening, setIsListening] = useState(false);
  const [recognitionError, setRecognitionError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isDark = theme === 'dark';

  // Smoothly scroll only message feed container when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Voice Recognition Handler using Web Speech API
  const handleToggleVoice = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const windowObj = window as any;
    const SpeechRecognition = windowObj.SpeechRecognition || windowObj.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setRecognitionError('Speech recognition is not supported in this browser. Please type your query.');
      setTimeout(() => setRecognitionError(null), 3500);
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setRecognitionError(null);
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results as ArrayLike<any>)
          .map((result: any) => result[0].transcript)
          .join('');
        setInputQuery(transcript);
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
        if (event.error !== 'no-speech') {
          setRecognitionError(`Microphone error: ${event.error}`);
          setTimeout(() => setRecognitionError(null), 3000);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.error('Speech recognition exception:', err);
      setIsListening(false);
    }
  };

  // File Upload Handler (Images, PDFs, documents)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      const isImg = file.type.startsWith('image/');

      setAttachedFile({
        name: file.name,
        type: file.type || 'application/octet-stream',
        size: file.size,
        base64: base64,
        previewUrl: isImg ? base64 : undefined,
      });
    };

    reader.readAsDataURL(file);
  };

  const handleRemoveAttachment = () => {
    setAttachedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Main Query Submission Handler with Live AI Model & Web Search
  const handleSend = async (textToSend: string) => {
    const query = textToSend.trim();
    if (!query && !attachedFile) return;

    const currentAttachment = attachedFile;
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query || `[Uploaded file: ${currentAttachment?.name}]`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      attachment: currentAttachment || undefined,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setAttachedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setIsTyping(true);

    try {
      const result = await queryGeminiClinicalAI(
        query || 'Analyze this attached clinical skin NTD file/image according to NTBLCP guidelines.',
        currentAttachment
      );

      setIsTyping(false);

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: result.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        category: result.category,
        dimensions: result.dimensions,
        followUpPrompt: result.followUpPrompt,
        source: result.source,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('Send error:', err);
      setIsTyping(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Text to Speech
  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/\*\*/g, '').replace(/•/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleResetConsultation = () => {
    setMessages([]);
    setInputQuery('');
    setAttachedFile(null);
  };

  return (
    <main
      className={`w-full min-h-screen font-sans selection:bg-[#0071E3] selection:text-white flex flex-col transition-colors duration-300 ${
        isDark ? 'bg-[#0C0C0C] text-white' : 'bg-[#FBFBFD] text-[#1D1D1F]'
      }`}
    >
      {/* ── Fixed Centered Capsule Navbar ─────────────────────────────────── */}
      <Navbar currentPage="ask" onNavigate={onNavigate} />

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*,.pdf,.doc,.docx"
        className="hidden"
      />

      {/* ══════════════════════════════════════════════════════════════════════
          MAIN REFINED CLINICAL INTELLIGENCE WORKSPACE (CLEAN & MINIMAL)
      ══════════════════════════════════════════════════════════════════════ */}
      <section className={`relative w-full pt-28 sm:pt-32 pb-16 px-4 sm:px-6 md:px-8 overflow-hidden transition-colors duration-300 flex-1 flex flex-col items-center ${
        isDark ? 'bg-[#0C0C0C]' : 'bg-[#FBFBFD]'
      }`}>
        
        {/* Subtle Ambient Lighting Glow */}
        <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[780px] h-[520px] blur-3xl pointer-events-none ${
          isDark
            ? 'bg-gradient-to-b from-[#0071E3]/15 via-[#10B981]/10 to-transparent'
            : 'bg-gradient-to-b from-[#0071E3]/10 via-[#10B981]/8 to-transparent'
        }`} />

        <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center relative z-10 space-y-6">
          
          {/* Top Status Header Bar (Clean, Minimal, No Developer/Model Pills) */}
          <div className="w-full flex items-center justify-between gap-3 border-b pb-4 pt-1 transition-colors duration-300 border-black/5 dark:border-white/10">
            
            {/* Left: Clean Brand Status Badge */}
            <div className="flex items-center gap-2">
              <div className={`px-3.5 py-1.5 rounded-full flex items-center gap-2 border text-xs font-mono font-medium backdrop-blur-xl ${
                isDark ? 'bg-white/5 border-white/10 text-gray-200' : 'bg-white border-black/10 text-gray-800 shadow-xs'
              }`}>
                <span className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981]" />
                <span className="font-bold tracking-tight">IKOLI version 1.1 • Clinical Diagnostic Workspace</span>
              </div>
            </div>

            {/* Right: Reset Consultation & Theme Toggle */}
            <div className="flex items-center gap-2">
              {messages.length > 0 && (
                <button
                  onClick={handleResetConsultation}
                  className={`px-3.5 py-1.5 rounded-full border text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                    isDark ? 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white' : 'bg-white border-black/10 text-gray-700 hover:bg-gray-100 shadow-xs'
                  }`}
                  title="Start fresh screening"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span className="hidden sm:inline">New Screening</span>
                </button>
              )}

              {/* Theme Switcher Button */}
              <button
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className={`p-1.5 px-3 rounded-full border transition-all cursor-pointer flex items-center gap-1.5 text-xs ${
                  isDark
                    ? 'bg-white/5 border-white/10 text-yellow-300 hover:bg-white/10'
                    : 'bg-white border-black/10 text-gray-700 hover:bg-black/5 shadow-xs'
                }`}
                title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              >
                {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                <span className="text-[11px] font-sans font-medium">
                  {isDark ? 'Light' : 'Dark'}
                </span>
              </button>
            </div>

          </div>

          {/* Masked Hero Headline */}
          <div className="space-y-2 text-center">
            <h1 className={`font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tight leading-[1.06] ${
              isDark ? 'text-white' : 'text-[#1D1D1F]'
            }`}>
              Think clearly. Diagnose confidently.
            </h1>
            <p className={`text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed font-medium ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Nigeria's frontline clinical intelligence engine for Leprosy, Buruli Ulcer & Yaws differential staging.
            </p>
          </div>

          {/* ══════════════════════════════════════════════════════════════════
              CONVERSATION & CLINICAL REASONING STREAM (ONLY WHEN MESSAGES EXIST)
          ══════════════════════════════════════════════════════════════════ */}
          {messages.length > 0 && (
            <div className="w-full space-y-5 pt-2 text-left">
              
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3.5 ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {/* Clean Apple-style Clinical AI Avatar */}
                  {msg.sender === 'ai' && (
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border shadow-sm ${
                      isDark ? 'bg-[#181818] border-white/15 text-[#00D2FF]' : 'bg-white border-black/10 text-[#0071E3]'
                    }`}>
                      <Sparkles className="w-4 h-4" />
                    </div>
                  )}

                  {/* Message Card Container */}
                  <div
                    className={`rounded-[22px] p-5 sm:p-6 text-sm sm:text-base leading-relaxed max-w-[92%] sm:max-w-[85%] border shadow-xl transition-all ${
                      msg.sender === 'user'
                        ? isDark ? 'bg-[#1C1C1C] text-[#EFEFEF] border-white/10' : 'bg-white text-[#1D1D1F] border-black/10 shadow-sm'
                        : isDark ? 'bg-[#141414] text-[#EFEFEF] border-white/15' : 'bg-white text-[#1D1D1F] border-black/10 shadow-md'
                    }`}
                  >
                    {/* Attached media preview in bubble */}
                    {msg.attachment && (
                      <div className={`mb-3 p-2.5 rounded-xl border flex items-center gap-3 ${
                        isDark ? 'bg-black/40 border-white/10' : 'bg-gray-50 border-gray-200'
                      }`}>
                        {msg.attachment.previewUrl ? (
                          <img src={msg.attachment.previewUrl} alt="Attached" className="w-12 h-12 rounded-lg object-cover" />
                        ) : (
                          <FileText className="w-6 h-6 text-[#0071E3]" />
                        )}
                        <div className="truncate text-xs">
                          <p className="font-bold truncate">{msg.attachment.name}</p>
                          <p className="text-[10px] text-gray-400">Attached clinical evidence file</p>
                        </div>
                      </div>
                    )}

                    {/* AI Response Header with Clean Category & Audio/Copy Actions */}
                    {msg.sender === 'ai' && (
                      <div className={`flex items-center justify-between gap-2 mb-3 pb-2.5 border-b ${
                        isDark ? 'border-white/10' : 'border-black/5'
                      }`}>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#10B981]">
                            {msg.category || 'Clinical Guidance'}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleSpeak(msg.text)}
                            className="p-1 text-gray-400 hover:text-white transition-colors cursor-pointer text-xs"
                            title="Listen to clinical guidance"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleCopy(msg.id, msg.text)}
                            className="p-1 text-gray-400 hover:text-white transition-colors cursor-pointer text-xs"
                            title="Copy response"
                          >
                            {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Formatted Markdown Content with Clickable Interactive Options */}
                    <ClinicalMarkdown 
                      content={msg.text} 
                      onSelectOption={(optionText) => handleSend(optionText)}
                      isDark={isDark} 
                    />

                    {/* Structured Dimensions (Bullet Points) */}
                    {msg.dimensions && msg.dimensions.length > 0 && (
                      <ul className={`mt-3 space-y-2 pt-3 border-t text-xs sm:text-sm ${
                        isDark ? 'border-white/10 text-gray-300' : 'border-black/5 text-gray-700'
                      }`}>
                        {msg.dimensions.map((dim, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-[#10B981] font-bold shrink-0 mt-0.5">•</span>
                            <div className="flex-1">
                              <ClinicalMarkdown
                                content={dim}
                                onSelectOption={(opt) => handleSend(opt)}
                                isDark={isDark}
                              />
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Interactive Follow-up Action Chip */}
                    {msg.followUpPrompt && (
                      <button
                        onClick={() => handleSend(msg.followUpPrompt!)}
                        className={`mt-3.5 w-full p-2.5 rounded-xl border text-xs font-medium transition-all cursor-pointer flex items-center justify-between gap-2 text-left group ${
                          isDark
                            ? 'bg-[#0071E3]/10 hover:bg-[#0071E3]/20 border-[#0071E3]/30 text-[#00D2FF]'
                            : 'bg-blue-50 hover:bg-blue-100 border-blue-200 text-[#0071E3]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5 shrink-0" />
                          <span>Suggested Next Step: {msg.followUpPrompt}</span>
                        </div>
                        <ArrowUp className="w-3.5 h-3.5 rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                      </button>
                    )}
                  </div>

                  {/* User Avatar */}
                  {msg.sender === 'user' && (
                    <div className={`w-9 h-9 rounded-full border flex items-center justify-center shrink-0 shadow-sm ${
                      isDark ? 'bg-[#222222] border-white/10 text-gray-300' : 'bg-gray-200 border-black/10 text-gray-700'
                    }`}>
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {/* Live Typing State */}
              {isTyping && (
                <div className="flex items-center gap-3.5">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border shadow-sm ${
                    isDark ? 'bg-[#181818] border-white/15 text-[#00D2FF]' : 'bg-white border-black/10 text-[#0071E3]'
                  }`}>
                    <Sparkles className="w-4 h-4 animate-spin" />
                  </div>
                  <div className={`rounded-2xl px-4 py-2.5 text-xs flex items-center gap-2 border shadow-sm ${
                    isDark ? 'bg-[#141414] border-white/10 text-gray-300' : 'bg-white border-black/10 text-gray-700'
                  }`}>
                    <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
                    <span>Ikoli is thinking…</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════
              PRIMARY CLINICAL COMPOSER CARD
          ══════════════════════════════════════════════════════════════════ */}
          <div className="w-full relative group text-left pt-2">
            
            {/* Elegant Ambient Elevation Glow */}
            <div 
              className="absolute -inset-0.5 rounded-[24px] opacity-80 blur-[2px] transition-all group-hover:opacity-100 -z-10"
              style={{
                background: isDark
                  ? 'linear-gradient(90deg, #0071E3 0%, #10B981 50%, #00D2FF 100%)'
                  : 'linear-gradient(90deg, #0071E3 0%, #10B981 50%, #0082FF 100%)',
              }}
            />

            {/* Composer Card Body */}
            <div className={`w-full rounded-[22px] p-4 sm:p-6 shadow-2xl flex flex-col justify-between min-h-[160px] border transition-colors duration-300 ${
              isDark
                ? 'bg-[#111111] border-white/10 text-white'
                : 'bg-white border-black/10 text-[#1D1D1F]'
            }`}>
              
              {/* Attachment Preview Banner if File Selected */}
              {attachedFile && (
                <div className={`mb-3 p-2.5 rounded-xl border flex items-center justify-between gap-3 ${
                  isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex items-center gap-3 overflow-hidden">
                    {attachedFile.previewUrl ? (
                      <img
                        src={attachedFile.previewUrl}
                        alt="Attachment preview"
                        className="w-10 h-10 rounded-lg object-cover border border-white/10 shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-[#0071E3]/20 flex items-center justify-center text-[#0071E3] shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                    )}
                    <div className="truncate">
                      <p className="text-xs font-bold truncate">{attachedFile.name}</p>
                      <p className="text-[10px] text-gray-400">{(attachedFile.size / 1024).toFixed(1)} KB • Attached Evidence</p>
                    </div>
                  </div>
                  <button
                    onClick={handleRemoveAttachment}
                    className="p-1 rounded-full text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Voice Listening Feedback Alert */}
              {isListening && (
                <div className="mb-2 p-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-2 text-xs font-mono animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span>Listening for clinical voice dictation… speak now</span>
                </div>
              )}

              {recognitionError && (
                <div className="mb-2 p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono">
                  {recognitionError}
                </div>
              )}

              {/* Interactive Input Area */}
              <div className="w-full">
                <textarea
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend(inputQuery);
                    }
                  }}
                  placeholder="Describe patient symptoms, lesion count, sensory loss, or ask an epidemiological question…"
                  className={`w-full bg-transparent text-sm sm:text-base outline-none resize-none min-h-[75px] font-sans leading-relaxed ${
                    isDark ? 'text-white placeholder-gray-500' : 'text-[#1D1D1F] placeholder-gray-400'
                  }`}
                />
              </div>

              {/* Controls Row */}
              <div className={`flex items-center justify-between gap-3 pt-3 border-t ${
                isDark ? 'border-white/5' : 'border-black/5'
              }`}>
                
                <div className="flex items-center gap-2">
                  {/* Round + Attachment Button */}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    title="Upload skin lesion photo, PDF, or document"
                    className={`h-9 px-3.5 rounded-full border flex items-center gap-1.5 text-xs font-medium transition-all active:scale-95 cursor-pointer ${
                      isDark
                        ? 'bg-white/5 hover:bg-white/10 border-white/15 text-gray-200'
                        : 'bg-gray-100 hover:bg-gray-200 border-black/10 text-gray-800'
                    }`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Attach File</span>
                  </button>
                </div>

                <div className="flex items-center gap-2.5">
                  {/* Voice Dictation Mic Button */}
                  <button 
                    onClick={handleToggleVoice}
                    title={isListening ? 'Stop listening' : 'Start voice dictation'}
                    className={`p-2 transition-all cursor-pointer rounded-full ${
                      isListening
                        ? 'bg-red-500 text-white animate-pulse'
                        : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black'
                    }`}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>

                  {/* Send Button */}
                  <MagneticButton onClick={() => handleSend(inputQuery)}>
                    <button
                      disabled={!inputQuery.trim() && !attachedFile}
                      className="w-9 h-9 rounded-full bg-[#0071E3] hover:bg-[#0077ED] text-white flex items-center justify-center transition-transform hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-md shadow-[#0071E3]/20"
                    >
                      <ArrowUp className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </MagneticButton>
                </div>

              </div>

            </div>

          </div>

          {/* Quick Preset Diagnostic Suggestions with Magnetic Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
            <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>Suggested queries:</span>
            {[
              'Who is the CEO of RedAid Nigeria?',
              'Staging Buruli Category I vs II',
              'Leprosy PB vs MB MDT pack',
              'Mile 4 Lab PCR turnaround',
            ].map((p, idx) => (
              <MagneticButton key={idx} onClick={() => handleSend(p)}>
                <button
                  className={`px-3 py-1 rounded-full border transition-all cursor-pointer ${
                    isDark
                      ? 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white'
                      : 'bg-white border-black/10 text-gray-700 hover:bg-gray-100 hover:text-black shadow-xs'
                  }`}
                >
                  {p}
                </button>
              </MagneticButton>
            ))}
          </div>

        </div>

      </section>

      {/* ── Completely Static, Non-Moving Footer ── */}
      <Footer onNavigate={onNavigate} isStatic={true} />

    </main>
  );
};
