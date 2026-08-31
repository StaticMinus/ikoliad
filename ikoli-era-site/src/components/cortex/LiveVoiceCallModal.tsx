import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GlowingOrb } from './GlowingOrb';
import { webAudioService } from '../../services/webAudioService';
import { queryGeminiClinicalAI, type ResponsePersona } from '../../services/geminiService';
import {
  PhoneOff,
  Mic,
  MicOff,
  MessageSquare,
  Volume2,
  RefreshCw,
} from 'lucide-react';

interface LiveVoiceCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTranscriptMessage?: (userText: string, aiText: string) => void;
  persona?: ResponsePersona;
}

export const LiveVoiceCallModal: React.FC<LiveVoiceCallModalProps> = ({
  isOpen,
  onClose,
  onTranscriptMessage,
  persona = 'visitor',
}) => {
  const [callState, setCallState] = useState<'listening' | 'thinking' | 'speaking' | 'paused'>('listening');
  const [isMuted, setIsMuted] = useState(false);
  const [userTranscript, setUserTranscript] = useState('');
  const [aiTranscript, setAiTranscript] = useState('');
  const [statusMessage, setStatusMessage] = useState('Listening to your voice…');
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const isCallActiveRef = useRef(false);
  const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingQueryRef = useRef('');

  // 1. Preload voices
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const updateVoices = () => {
        try {
          const v = window.speechSynthesis.getVoices();
          if (v && v.length > 0) setAvailableVoices(v);
        } catch {
          // ignore
        }
      };
      updateVoices();
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, []);

  // 2. Speak response with natural voice and WebAudio DSP
  const speakAiResponse = useCallback((textToSpeak: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setCallState('listening');
      return;
    }

    try {
      window.speechSynthesis.cancel();
      window.speechSynthesis.resume();

      // Clean markdown tokens, citations, and symbols for natural voice
      const cleanText = textToSpeak
        .replace(/\[\^?[^\]]+\]/g, '')
        .replace(/[*_#`~>]/g, '')
        .replace(/•/g, '')
        .replace(/```[\s\S]*?```/g, 'Visual data breakdown is available in your chat transcript.')
        .replace(/\n+/g, '. ')
        .trim();

      if (!cleanText) {
        setCallState('listening');
        return;
      }

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utteranceRef.current = utterance;

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

      if (naturalVoice) utterance.voice = naturalVoice;

      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      utterance.onstart = () => {
        setCallState('speaking');
        setStatusMessage('Ask Ikoli is speaking…');
        webAudioService.startSpeechModulation();
      };

      utterance.onend = () => {
        webAudioService.stopSpeechModulation();
        utteranceRef.current = null;
        if (isCallActiveRef.current && !isMuted) {
          // Automatically re-arm mic for next conversational turn
          setCallState('listening');
          setStatusMessage('Listening to your voice…');
          startSpeechRecognition();
        }
      };

      utterance.onerror = (e) => {
        console.warn('Voice call synthesis error:', e);
        webAudioService.stopSpeechModulation();
        utteranceRef.current = null;
        if (isCallActiveRef.current) {
          setCallState('listening');
          setStatusMessage('Listening to your voice…');
          startSpeechRecognition();
        }
      };

      window.speechSynthesis.speak(utterance);
      window.speechSynthesis.resume();
    } catch (err) {
      console.error('TTS execution error in voice call:', err);
      webAudioService.stopSpeechModulation();
      setCallState('listening');
      startSpeechRecognition();
    }
  }, [availableVoices, isMuted]);

  // 3. Process user query when user stops speaking
  const processUserQuery = useCallback(async (query: string) => {
    if (!query.trim()) return;

    setCallState('thinking');
    setStatusMessage('Thinking & cross-referencing surveillance data…');
    stopSpeechRecognition();

    try {
      const response = await queryGeminiClinicalAI(query, undefined, persona);
      setAiTranscript(response.text);

      if (onTranscriptMessage) {
        onTranscriptMessage(query, response.text);
      }

      speakAiResponse(response.text);
    } catch (err) {
      console.error('Call query processing error:', err);
      const fallbackText = "I encountered a network difficulty, but I am still on the line with you. Please ask your question again.";
      setAiTranscript(fallbackText);
      speakAiResponse(fallbackText);
    }
  }, [persona, onTranscriptMessage, speakAiResponse]);

  // 4. Start speech recognition engine
  const startSpeechRecognition = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const windowObj = window as any;
    const SpeechRecognition = windowObj.SpeechRecognition || windowObj.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setStatusMessage('Voice speech recognition not supported in this browser.');
      return;
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-NG'; // Nigerian English standard

      recognition.onstart = async () => {
        setCallState('listening');
        setStatusMessage('Listening to your voice…');
        await webAudioService.startMicrophone();
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        const liveText = (finalTranscript || interimTranscript).trim();
        if (liveText) {
          setUserTranscript(liveText);
          pendingQueryRef.current = liveText;

          // Clear prior silence timer
          if (silenceTimerRef.current) {
            clearTimeout(silenceTimerRef.current);
          }

          // Trigger AI query if user is silent for 1.4 seconds
          silenceTimerRef.current = setTimeout(() => {
            if (pendingQueryRef.current && isCallActiveRef.current) {
              const queryToSend = pendingQueryRef.current;
              pendingQueryRef.current = '';
              processUserQuery(queryToSend);
            }
          }, 1400);
        }
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onerror = (event: any) => {
        if (event.error !== 'no-speech') {
          console.warn('Speech recognition voice error:', event.error);
        }
      };

      recognition.onend = () => {
        if (isCallActiveRef.current && callState === 'listening' && !isMuted) {
          // Restart if still in listening turn
          try {
            recognition.start();
          } catch {
            // ignore
          }
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.warn('Failed to start speech recognition in voice call:', err);
    }
  }, [callState, isMuted, processUserQuery]);

  const stopSpeechRecognition = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
      recognitionRef.current = null;
    }
    webAudioService.stopMicrophone();
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
  };

  // 5. Lifecycle when Call opens / closes
  useEffect(() => {
    if (isOpen) {
      isCallActiveRef.current = true;
      setUserTranscript('');
      setAiTranscript("Hello! I am Ask Ikoli. I'm listening—ask me anything about leprosy, Buruli ulcer, or South-East surveillance data.");
      speakAiResponse("Hello! I am Ask Ikoli. I'm listening—ask me anything about leprosy, Buruli ulcer, or South-East surveillance data.");
    } else {
      isCallActiveRef.current = false;
      stopSpeechRecognition();
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
          window.speechSynthesis.cancel();
        } catch {
          // ignore
        }
      }
      webAudioService.stopSpeechModulation();
      webAudioService.stopMicrophone();
    }

    return () => {
      isCallActiveRef.current = false;
      stopSpeechRecognition();
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
          window.speechSynthesis.cancel();
        } catch {
          // ignore
        }
      }
      webAudioService.stopSpeechModulation();
      webAudioService.stopMicrophone();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Toggle Mute
  const handleToggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      startSpeechRecognition();
    } else {
      setIsMuted(true);
      stopSpeechRecognition();
      setCallState('paused');
      setStatusMessage('Microphone muted');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between p-6 bg-[#08080A]/98 backdrop-blur-2xl text-white select-none animate-fadeIn">
      
      {/* ── Top Header Toolbar ────────────────────────────────────────── */}
      <div className="w-full max-w-xl flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_#34D399] animate-pulse" />
          <span className="font-display font-bold text-sm tracking-tight text-white">
            Ask Ikoli Live Voice Call
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-gray-400 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            {callState === 'listening' ? '🟢 Live' : callState === 'speaking' ? '🔊 AI Speaking' : callState === 'thinking' ? '⚡ Processing' : '⏸ Paused'}
          </span>
        </div>
      </div>

      {/* ── Center: 3D Blue Orb with Reactive FFT Physics ─────────────── */}
      <div className="my-auto flex flex-col items-center justify-center space-y-8 max-w-lg w-full text-center">
        
        {/* Dynamic Glowing 3D Orb */}
        <div className="relative flex items-center justify-center cursor-pointer transform hover:scale-105 transition-transform duration-500">
          <GlowingOrb
            size={220}
            interactive={true}
            isAudioActive={callState === 'speaking' || callState === 'listening'}
            isTyping={callState === 'thinking'}
          />

          {/* Pulse Halo */}
          <div className={`absolute -inset-8 rounded-full border border-blue-500/20 pointer-events-none transition-all duration-700 ${
            callState === 'listening' ? 'scale-110 opacity-70 animate-ping' : 'opacity-20'
          }`} />
        </div>

        {/* Dynamic Status Capsule */}
        <div className="space-y-3 px-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-[#00D2FF] shadow-lg">
            {callState === 'listening' && <Mic className="w-3.5 h-3.5 animate-pulse text-emerald-400" />}
            {callState === 'speaking' && <Volume2 className="w-3.5 h-3.5 animate-bounce text-[#00D2FF]" />}
            {callState === 'thinking' && <RefreshCw className="w-3.5 h-3.5 animate-spin text-purple-400" />}
            <span>{statusMessage}</span>
          </div>

          {/* Live Subtitle Transcript */}
          <div className="min-h-[70px] max-h-[110px] overflow-y-auto px-4 py-2 rounded-2xl bg-white/5 border border-white/5 text-xs text-gray-300 leading-relaxed italic">
            {callState === 'listening' && userTranscript && (
              <p className="text-white not-italic font-medium">
                &ldquo;{userTranscript}&rdquo;
              </p>
            )}
            {callState === 'speaking' && aiTranscript && (
              <p className="text-blue-200">
                &ldquo;{aiTranscript.slice(0, 180)}...&rdquo;
              </p>
            )}
            {!userTranscript && callState === 'listening' && (
              <span className="text-gray-500">Speak naturally into your microphone…</span>
            )}
          </div>
        </div>

      </div>

      {/* ── Bottom Call Actions (Mute, End Call, Switch to Chat) ────────── */}
      <div className="w-full max-w-sm flex items-center justify-center gap-6 pb-6">
        
        {/* Mute Button */}
        <button
          onClick={handleToggleMute}
          className={`w-13 h-13 rounded-full flex flex-col items-center justify-center transition-all cursor-pointer ${
            isMuted
              ? 'bg-amber-500/20 border border-amber-500/50 text-amber-400'
              : 'bg-white/10 hover:bg-white/20 border border-white/15 text-white'
          }`}
          title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
        >
          {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        {/* End Call Button (Big Red Pill) */}
        <button
          onClick={onClose}
          className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-[0_0_25px_rgba(239,68,68,0.5)] transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          title="End voice call"
        >
          <PhoneOff className="w-7 h-7" />
        </button>

        {/* Switch to Text Chat */}
        <button
          onClick={onClose}
          className="w-13 h-13 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white flex flex-col items-center justify-center transition-all cursor-pointer"
          title="Switch to text mode"
        >
          <MessageSquare className="w-5 h-5" />
        </button>

      </div>

    </div>
  );
};
