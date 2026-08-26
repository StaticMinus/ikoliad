import React, { useState } from 'react';
import { X, Send, Sparkles } from 'lucide-react';

interface AskIkoliModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AskIkoliModal: React.FC<AskIkoliModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; time: string }>>([
    {
      sender: 'ai',
      text: "Hello! I am Ikoli AI, your specialized Skin NTD clinical intelligence assistant. How can I assist you with clinical lesion assessments, Buruli ulcer staging, or sentinel telemetry in South-East Nigeria?",
      time: 'Just now',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userText = query;
    setMessages((prev) => [...prev, { sender: 'user', text: userText, time: 'Just now' }]);
    setQuery('');
    setIsTyping(true);

    setTimeout(() => {
      let aiResponse = "According to national NTBLCP and RedAid Nigeria clinical guidelines, single hypopigmented macules with definite sensory loss are classified as Paucibacillary (PB) Leprosy, treated with a 6-month MDT blister pack regimen. Buruli ulcer presenting as a painless nodule <5cm is Category I, treated with Rifampicin and Clarithromycin for 8 weeks.";

      if (userText.toLowerCase().includes('state') || userText.toLowerCase().includes('enugu') || userText.toLowerCase().includes('ebonyi')) {
        aiResponse = "South-East Sentinel Telemetry: Enugu reports 64 active clinics anchored by UNTH Ituku-Ozalla. Ebonyi operates 78 sentinel nodes coordinated by Mile 4 Hospital Abakaliki. All field data undergo local zero-PII UUID cryptographic hashing before State STBLCO verification.";
      }

      setMessages((prev) => [...prev, { sender: 'ai', text: aiResponse, time: 'Just now' }]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="bg-[#0A0C10] border border-white/10 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[600px] text-white">
        
        {/* Modal Header */}
        <div className="p-5 px-6 border-b border-white/10 flex items-center justify-between bg-[#121824]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#0082FF] flex items-center justify-center text-white font-bold text-sm shadow-md">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-base text-white">Ask Ikoli AI</span>
                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  ZERO-PII SECURE
                </span>
              </div>
              <span className="text-xs text-gray-400 font-sans">Multimodal Skin NTD Intelligence & Clinical Support</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 font-sans text-sm">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] p-4 rounded-2xl ${
                  m.sender === 'user'
                    ? 'bg-[#0082FF] text-white rounded-br-none'
                    : 'bg-[#121824] text-gray-200 border border-white/10 rounded-bl-none shadow-lg leading-relaxed'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-[#121824] text-gray-400 p-4 rounded-2xl border border-white/10 text-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0082FF] animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-[#0082FF] animate-bounce delay-100" />
                <span className="w-2 h-2 rounded-full bg-[#0082FF] animate-bounce delay-200" />
                <span>Ikoli AI is analyzing clinical evidence...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Footer */}
        <form onSubmit={handleSend} className="p-4 bg-[#121824] border-t border-white/10 flex items-center gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about skin lesions, Buruli staging, or state surveillance..."
            className="flex-1 bg-[#0A0C10] border border-white/10 rounded-full px-5 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#0082FF]"
          />
          <button
            type="submit"
            className="bg-[#0082FF] hover:bg-[#0066CC] text-white p-3 rounded-full transition-all hover:scale-105 shadow-md flex items-center justify-center cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
