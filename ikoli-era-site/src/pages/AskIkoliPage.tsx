import React, { useState, useRef, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ContainerScroll } from '../components/ui/container-scroll-animation';
import {
  Sparkles,
  ShieldCheck,
  Send,
  Bot,
  User,
  Image as ImageIcon,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Copy,
  Check,
  ChevronRight,
  Mic,
  Cpu,
} from 'lucide-react';

interface AskIkoliPageProps {
  onNavigate: (page: 'home' | 'dashboard' | 'diseases' | 'ask') => void;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  category?: string;
  protocolBadge?: string;
  confidence?: number;
  suggestions?: string[];
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'msg-1',
    sender: 'ai',
    text: "Hello! I am IKOLI AI, Nigeria's autonomous Clinical Vision & Skin NTD diagnostic assistant. You can ask me regarding clinical staging for Leprosy (PB/MB), Buruli Ulcer Category I/II/III, Yaws treponemal protocols, or Zero-PII data workflows.",
    timestamp: 'Just now',
    category: 'Clinical Staging',
    suggestions: [
      'How to stage Category I Buruli Ulcer?',
      'What are early signs of PB Leprosy?',
      'How is Yaws confirmed and treated?',
      'Explain Zero-PII cryptographic anonymization',
    ],
  },
];

export const AskIkoliPage: React.FC<AskIkoliPageProps> = ({ onNavigate }) => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeProtocol, setActiveProtocol] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of chat when new messages arrive
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Dynamic AI response generation simulation based on clinical knowledge base
    setTimeout(() => {
      setIsTyping(false);
      const lower = text.toLowerCase();
      let reply = '';
      let category = 'Differential Diagnosis';
      let protocolBadge = 'WHO 2030 Standard';
      let confidence = 98.6;
      let suggestions: string[] = [];

      if (lower.includes('buruli') || lower.includes('ulcer') || lower.includes('cat')) {
        category = 'Buruli Ulcer Protocol';
        protocolBadge = 'IS2404 PCR & Oral Regimen';
        confidence = 99.4;
        reply = `**Buruli Ulcer (Mycobacterium ulcerans) Clinical Protocol:**\n\n- **Category I:** Single lesion < 5 cm diameter. Primary field regimen is 8 consecutive weeks (56 days) of oral **Rifampicin (10 mg/kg)** + **Clarithromycin (7.5 mg/kg)** daily.\n- **Category II:** Single lesion 5–15 cm.\n- **Category III:** Single lesion > 15 cm or multiple lesions/osteomyelitis.\n\n*Laboratory Confirmation:* Field swabs or fine-needle aspirates (FNA) should be verified via IS2404 real-time PCR at state reference laboratories. >95% cure achieved without debridement when caught in Category I.`;
        suggestions = [
          'What is the pediatric dosing for Rifampicin?',
          'How to differentiate Buruli from venous stasis?',
          'What are the sentinel PCR labs in Anambra & Enugu?',
        ];
      } else if (lower.includes('leprosy') || lower.includes('pb') || lower.includes('mb') || lower.includes('hansen')) {
        category = 'Leprosy MDT Protocol';
        protocolBadge = 'MDT Blister Pack Guidelines';
        confidence = 98.9;
        reply = `**Leprosy (Hansen's Disease) Staging & Management:**\n\n- **Paucibacillary (PB):** 1 to 5 hypopigmented or erythematous skin lesions with definite loss of thermal/light touch sensation, and ≤1 affected nerve trunk. Treatment: **6-month WHO Blister Pack** (Rifampicin + Dapsone).\n- **Multibacillary (MB):** >5 skin lesions, nodular infiltrations, or >1 enlarged nerve trunk. Treatment: **12-month WHO Blister Pack** (Rifampicin + Clofazimine + Dapsone).\n\n*Disability Prevention:* Routine voluntary muscle testing (VMT) and sensory testing (ST) prevent Grade-2 irreversible nerve clawing.`;
        suggestions = [
          'How to manage Type 1 Lepra Reaction in the field?',
          'What is the WHO definition of Grade-2 Disability (G2D)?',
          'How does Dapsone hypersensitivity present?',
        ];
      } else if (lower.includes('yaws') || lower.includes('azithromycin') || lower.includes('papule')) {
        category = 'Yaws Eradication Protocol';
        protocolBadge = 'Morgenthaler TCT Framework';
        confidence = 99.1;
        reply = `**Yaws (Treponema pallidum pertenue) Clinical Protocol:**\n\n- **Primary Stage:** Solitary painless erythematous papule/ulcer ("Mother Yaw") on lower extremities.\n- **Secondary Stage:** Generalized cutaneous papillomata and osteoperiostitis.\n- **First-Line Field Regimen:** Single-dose oral **Azithromycin (30 mg/kg, max 2g)**.\n- **Second-Line:** Intramuscular Benzathine Penicillin (0.6M units <10 yrs, 1.2M units ≥10 yrs).\n\n*Diagnostics:* Confirmed on-site via point-of-care Dual Path Platform (DPP) treponemal/non-treponemal rapid assays.`;
        suggestions = [
          'What is the protocol for Total Community Treatment (TCT)?',
          'How to differentiate secondary Yaws from fungal lesions?',
          'What are the exclusion criteria for Azithromycin?',
        ];
      } else if (lower.includes('pii') || lower.includes('privacy') || lower.includes('zero') || lower.includes('anonym')) {
        category = 'Zero-PII Security Architecture';
        protocolBadge = 'NDPR & WHO Ethical Compliance';
        confidence = 99.9;
        reply = `**Zero-PII Cryptographic Pipeline Architecture:**\n\n1. **On-Device Ephemeral Processing:** Patient images are processed entirely within volatile Android tablet memory; raw photos are never written to unencrypted disks.\n2. **Biometric Scrubbing:** Facial contours, background identifiers, and metadata landmarks are stripped via neural bounding masks.\n3. **Feature Vector Tokenization:** Only non-reversible high-dimensional latent vectors (SHA-256 HMAC) are transmitted to the federal DHIS2 endpoint for aggregate epidemiological mapping.`;
        suggestions = [
          'Is IKOLI AI NDPR certified in Nigeria?',
          'Can field health workers operate fully offline?',
          'How does DHIS2 aggregate synchronization work?',
        ];
      } else {
        reply = `Thank you for your inquiry on **"${text}"**.\n\nIKOLI AI synthesizes clinical records from Nigeria's National TB, Buruli Ulcer & Leprosy Control Programme (NTBLCP) and WHO 2030 Skin NTD Roadmap.\n\nFor verified differentials, please specify whether you are screening for:\n- **Leprosy** (Macular/Plaque lesion with sensory deficit)\n- **Buruli Ulcer** (Painless indurated nodule, plaque, or undermined ulcer)\n- **Yaws** (Papilloma, ulcus, or bone tenderness)\n- **Field Telemetry / Zero-PII Compliance**`;
        suggestions = [
          'How to stage Category I Buruli Ulcer?',
          'What are early signs of PB Leprosy?',
          'Explain Zero-PII cryptographic anonymization',
        ];
      }

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        category,
        protocolBadge,
        confidence,
        suggestions,
      };

      setMessages((prev) => [...prev, aiMsg]);
    }, 900);
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    setMessages(INITIAL_MESSAGES);
  };

  return (
    <main className="w-full min-h-screen bg-[#06080E] text-white font-sans selection:bg-[#0082FF] selection:text-white">
      
      {/* ── Navbar ───────────────────────────────────────────── */}
      <div className="relative z-50 bg-[#06080E]/90 backdrop-blur-md border-b border-white/10">
        <Navbar
          currentPage="ask"
          onNavigate={onNavigate}
        />
      </div>

      {/* ── 3D Container Scroll Hero & Interactive Chat Interface ── */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#06080E] via-[#0A0F1D] to-[#06080E] pt-4 sm:pt-8 pb-12">
        
        {/* Ambient Neural Backlight */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial from-[#0082FF]/20 via-transparent to-transparent blur-3xl pointer-events-none" />

        <ContainerScroll
          titleComponent={
            <div className="space-y-4 max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-[#0082FF]/15 text-[#0082FF] px-4 py-1.5 rounded-full font-mono text-xs font-bold border border-[#0082FF]/30 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#00D2FF]" />
                <span>AUTONOMOUS CLINICAL INTELLIGENCE • IKOLI AI</span>
              </div>

              <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tight leading-[1.05]">
                Conversational AI for <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0082FF] via-[#45a6ff] to-[#9fff00]">
                  Skin NTD Diagnostics
                </span>
              </h1>

              <p className="text-xs sm:text-sm text-gray-400 max-w-2xl mx-auto font-sans leading-relaxed">
                Query Nigeria NTBLCP clinical protocols, WHO 2030 Skin NTD staging guidelines, pharmaceutical MDT regimens, or zero-PII cryptographic pipelines in natural language.
              </p>
            </div>
          }
        >
          {/* ── Embedded Full Interactive Clinical AI Chat Console ── */}
          <div className="w-full h-full flex flex-col justify-between bg-[#0B101D] text-left select-text relative">
            
            {/* ── Top Chat Header & Protocol Selector Bar ─────────── */}
            <div className="px-4 sm:px-6 py-3.5 bg-[#0E1526] border-b border-white/10 flex flex-wrap items-center justify-between gap-3 shrink-0">
              
              {/* Left: AI Status */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#0082FF]/20 border border-[#0082FF]/40 flex items-center justify-center text-[#0082FF] shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white font-mono">IKOLI Clinical AI</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <span className="text-[10px] text-gray-400 font-mono">v2.6 • 99.2% Sensitivity • Zero-PII</span>
                </div>
              </div>

              {/* Center: Protocol Filter Chips */}
              <div className="hidden md:flex items-center gap-1.5 bg-[#080C16] p-1 rounded-xl border border-white/5 font-mono text-[11px]">
                <button
                  onClick={() => setActiveProtocol('all')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    activeProtocol === 'all'
                      ? 'bg-[#0082FF] text-white shadow-xs'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  All NTDs
                </button>
                <button
                  onClick={() => setActiveProtocol('buruli')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    activeProtocol === 'buruli'
                      ? 'bg-[#0082FF] text-white shadow-xs'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Buruli Ulcer
                </button>
                <button
                  onClick={() => setActiveProtocol('leprosy')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    activeProtocol === 'leprosy'
                      ? 'bg-[#0082FF] text-white shadow-xs'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Leprosy MDT
                </button>
                <button
                  onClick={() => setActiveProtocol('yaws')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    activeProtocol === 'yaws'
                      ? 'bg-[#0082FF] text-white shadow-xs'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Yaws
                </button>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleClearChat}
                  title="Reset conversation"
                  className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-xs font-mono flex items-center gap-1.5 border border-white/10 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              </div>

            </div>

            {/* ── Middle Chat Messages Stream ───────────────────── */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 scrollbar-thin scrollbar-thumb-white/10">
              
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 sm:gap-4 ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {/* AI Avatar */}
                  {msg.sender === 'ai' && (
                    <div className="w-8 h-8 rounded-full bg-[#0082FF] text-white flex items-center justify-center shrink-0 shadow-md">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  {/* Message Bubble Content */}
                  <div
                    className={`max-w-xl sm:max-w-2xl rounded-2xl p-4 sm:p-5 space-y-3 ${
                      msg.sender === 'user'
                        ? 'bg-[#0082FF] text-white rounded-tr-xs shadow-md'
                        : 'bg-[#121A2E] text-gray-100 border border-white/10 rounded-tl-xs shadow-lg'
                    }`}
                  >
                    {/* Header Badges for AI Replies */}
                    {msg.sender === 'ai' && msg.category && (
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono font-bold text-[#00D2FF] uppercase">
                            {msg.category}
                          </span>
                          {msg.protocolBadge && (
                            <span className="bg-[#0082FF]/20 text-[#00D2FF] px-2 py-0.5 rounded-md text-[10px] font-mono border border-[#0082FF]/30">
                              {msg.protocolBadge}
                            </span>
                          )}
                        </div>

                        {msg.confidence && (
                          <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                            {msg.confidence}% Confidence
                          </span>
                        )}
                      </div>
                    )}

                    {/* Formatted Markdown Body */}
                    <div className="text-xs sm:text-sm font-sans leading-relaxed whitespace-pre-line">
                      {msg.text}
                    </div>

                    {/* Footer Actions for AI Replies */}
                    {msg.sender === 'ai' && (
                      <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[10px] font-mono text-gray-400">
                        <span>{msg.timestamp}</span>
                        
                        <button
                          onClick={() => handleCopyMessage(msg.id, msg.text)}
                          className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy Protocol</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}

                    {/* Interactive Suggested Follow-Up Prompts */}
                    {msg.suggestions && msg.suggestions.length > 0 && (
                      <div className="pt-2 space-y-1.5">
                        <span className="text-[10px] font-mono text-gray-400 font-bold uppercase block">
                          Suggested Inquiries:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {msg.suggestions.map((sug, i) => (
                            <button
                              key={i}
                              onClick={() => handleSendMessage(sug)}
                              className="text-[11px] font-sans bg-white/5 hover:bg-[#0082FF]/20 text-gray-300 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 hover:border-[#0082FF]/40 transition-all text-left cursor-pointer flex items-center gap-1.5"
                            >
                              <span>{sug}</span>
                              <ChevronRight className="w-3 h-3 text-gray-500" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* User Avatar */}
                  {msg.sender === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-[#1A2333] text-gray-300 flex items-center justify-center shrink-0 border border-white/20">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex gap-3 items-center">
                  <div className="w-8 h-8 rounded-full bg-[#0082FF] text-white flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-[#121A2E] p-4 rounded-2xl border border-white/10 flex items-center gap-2 text-xs font-mono text-[#00D2FF]">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#0082FF] animate-bounce" />
                      <span className="w-2 h-2 rounded-full bg-[#0082FF] animate-bounce [animation-delay:0.2s]" />
                      <span className="w-2 h-2 rounded-full bg-[#0082FF] animate-bounce [animation-delay:0.4s]" />
                    </div>
                    <span>Synthesizing NTBLCP Diagnostic Protocol...</span>
                  </div>
                </div>
              )}

              <div ref={chatBottomRef} />
            </div>

            {/* ── Bottom Interactive Chat Input & Action Bar ───── */}
            <div className="p-3 sm:p-4 bg-[#0E1526] border-t border-white/10 shrink-0 space-y-2.5">
              
              {/* Quick Prompt Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] font-sans text-gray-300 no-scrollbar">
                <span className="text-[10px] font-mono text-gray-500 font-bold uppercase shrink-0 mr-1 flex items-center gap-1">
                  <HelpCircle className="w-3 h-3 text-[#0082FF]" /> Presets:
                </span>
                <button
                  onClick={() => handleSendMessage('What is the difference between PB and MB Leprosy?')}
                  className="whitespace-nowrap px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
                >
                  PB vs MB Leprosy
                </button>
                <button
                  onClick={() => handleSendMessage('How to stage Category I Buruli Ulcer?')}
                  className="whitespace-nowrap px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
                >
                  Category I Buruli
                </button>
                <button
                  onClick={() => handleSendMessage('What is the single-dose Azithromycin regimen for Yaws?')}
                  className="whitespace-nowrap px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
                >
                  Yaws DPP & Dosing
                </button>
                <button
                  onClick={() => handleSendMessage('How does Zero-PII protect patient photos?')}
                  className="whitespace-nowrap px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
                >
                  Zero-PII Privacy
                </button>
              </div>

              {/* Form Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2 bg-[#080C16] p-1.5 sm:p-2 rounded-2xl border border-white/15 focus-within:border-[#0082FF] transition-all shadow-inner"
              >
                <button
                  type="button"
                  onClick={() => handleSendMessage('Evaluate uploaded clinical photo: Hypopigmented macule with sensory deficit on forearm.')}
                  title="Simulate Lesion Image Screening"
                  className="p-2 sm:p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <ImageIcon className="w-4 h-4 text-[#0082FF]" />
                </button>

                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ask about Buruli staging, Leprosy MDT, Yaws DPP, or Zero-PII..."
                  className="flex-1 bg-transparent px-2 sm:px-3 py-2 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none font-sans"
                />

                <button
                  type="button"
                  onClick={() => handleSendMessage('Simulating audio consultation: Tell me about Leprosy Grade-2 Disability prevention.')}
                  title="Voice Consultation"
                  className="hidden sm:inline-flex p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <Mic className="w-4 h-4" />
                </button>

                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className={`p-2 sm:px-5 sm:py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider inline-flex items-center gap-1.5 transition-all shadow-md cursor-pointer ${
                    inputText.trim()
                      ? 'bg-[#0082FF] hover:bg-[#0066CC] text-white hover:scale-105'
                      : 'bg-white/10 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Consult AI</span>
                </button>
              </form>

            </div>

          </div>
        </ContainerScroll>

      </section>

      {/* ── 4 Pillars Bento Section Below ────────────────────── */}
      <section className="w-full bg-[#080B14] py-20 px-4 sm:px-8 md:px-12 border-t border-white/10 relative z-20">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold border border-emerald-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ETHICAL CLINICAL ARCHITECTURE</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              Four Pillars of Autonomous Surveillance
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto font-sans leading-relaxed">
              Designed in partnership with RedAid Nigeria and the Federal Ministry of Health to eliminate diagnostic disparities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            
            {/* Pillar 1 */}
            <div className="bg-[#0D1322] p-6 rounded-2xl border border-white/10 space-y-3 shadow-md hover:border-[#0082FF] transition-colors group">
              <div className="w-10 h-10 rounded-xl bg-[#0082FF]/20 flex items-center justify-center text-[#0082FF]">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white">Offline Edge Vision</h3>
              <p className="text-xs text-gray-400 font-sans leading-relaxed">
                120ms local neural inference runs directly on field Android tablets without requiring internet connectivity in remote villages.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-[#0D1322] p-6 rounded-2xl border border-white/10 space-y-3 shadow-md hover:border-emerald-400 transition-colors group">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white">Zero-PII Anonymization</h3>
              <p className="text-xs text-gray-400 font-sans leading-relaxed">
                Visual vectors are tokenized with SHA-256 HMAC in volatile memory; zero recognizable facial landmarks or patient names are stored.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-[#0D1322] p-6 rounded-2xl border border-white/10 space-y-3 shadow-md hover:border-purple-400 transition-colors group">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white">Laboratory Verified</h3>
              <p className="text-xs text-gray-400 font-sans leading-relaxed">
                Differential screenings are backed by IS2404 PCR assays and slit-skin smear correlation across 6 South-East reference laboratories.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="bg-[#0D1322] p-6 rounded-2xl border border-white/10 space-y-3 shadow-md hover:border-[#9fff00] transition-colors group">
              <div className="w-10 h-10 rounded-xl bg-[#9fff00]/20 flex items-center justify-center text-[#9fff00]">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white">DHIS2 Auto-Sync</h3>
              <p className="text-xs text-gray-400 font-sans leading-relaxed">
                Verified cases synchronize seamlessly with the Federal Health Information System to drive targeted drug supplies and MDT logistics.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <Footer onNavigate={onNavigate} />

    </main>
  );
};
