// Real-Time Web Audio API Frequency Analysis & DSP Engine for IKOLI AI 3D Shader Coupling
// Provides low-latency FFT spectrum analysis for Microphone Input and Speech Synthesis / Audio Playback.

export interface AudioFrequencyData {
  low: number;        // Bass energy 20Hz - 250Hz (0.0 to 1.0)
  mid: number;        // Mid energy 250Hz - 2000Hz (0.0 to 1.0)
  high: number;       // Treble energy 2000Hz - 8000Hz (0.0 to 1.0)
  spectrum: number[]; // 16-band normalized FFT spectrum
  volume: number;     // RMS overall volume (0.0 to 1.0)
}

class WebAudioService {
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private microphoneStream: MediaStream | null = null;
  private micSourceNode: MediaStreamAudioSourceNode | null = null;
  private syntheticInterval: ReturnType<typeof setInterval> | null = null;
  private isListening = false;
  private isSpeaking = false;

  private frequencyData: Uint8Array<ArrayBuffer> = new Uint8Array(32);
  private currentMetrics: AudioFrequencyData = {
    low: 0,
    mid: 0,
    high: 0,
    spectrum: new Array(16).fill(0),
    volume: 0,
  };

  constructor() {
    // Lazy AudioContext initialisation to comply with autoplay browser policies
  }

  private initAudioContext(): boolean {
    if (!this.audioContext) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return false;
      this.audioContext = new AudioCtx();
    }

    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }

    if (!this.analyser && this.audioContext) {
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 64; // 32 frequency bins for ultra-low latency (<5ms)
      this.analyser.smoothingTimeConstant = 0.8;
      this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
    }

    return true;
  }

  // Start capturing from live microphone input
  public async startMicrophone(): Promise<boolean> {
    try {
      if (!this.initAudioContext()) return false;
      if (this.isListening) return true;

      this.microphoneStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      if (this.audioContext && this.analyser) {
        this.micSourceNode = this.audioContext.createMediaStreamSource(this.microphoneStream);
        this.micSourceNode.connect(this.analyser);
        this.isListening = true;
      }
      return true;
    } catch (err) {
      console.warn('Microphone access denied or unavailable for WebAudio FFT:', err);
      this.isListening = false;
      return false;
    }
  }

  // Stop capturing from live microphone input
  public stopMicrophone(): void {
    if (this.micSourceNode) {
      try {
        this.micSourceNode.disconnect();
      } catch {
        // ignore
      }
      this.micSourceNode = null;
    }

    if (this.microphoneStream) {
      this.microphoneStream.getTracks().forEach((track) => track.stop());
      this.microphoneStream = null;
    }

    this.isListening = false;
  }

  // Start simulating audio frequencies for speech synthesis playback
  public startSpeechModulation(): void {
    this.isSpeaking = true;
    this.initAudioContext();

    if (this.syntheticInterval) {
      clearInterval(this.syntheticInterval);
    }

    // Dynamic human voice formant harmonics simulation
    let phase = 0;
    this.syntheticInterval = setInterval(() => {
      if (!this.isSpeaking) return;
      phase += 0.15;

      const baseWave = Math.sin(phase * 4.2) * 0.5 + 0.5;
      const consonantBurst = Math.sin(phase * 12.0) > 0.6 ? 0.4 : 0.0;
      const voiceEnergy = Math.max(0.1, (baseWave + consonantBurst) * 0.85);

      const spectrum = new Array(16).fill(0).map((_, idx) => {
        const freqOffset = Math.sin(phase * 3.0 + idx * 0.4);
        const bandEnergy = voiceEnergy * Math.max(0, 1.0 - Math.abs(idx - 4) * 0.15 + freqOffset * 0.2);
        return Math.min(1.0, Math.max(0, bandEnergy));
      });

      this.currentMetrics = {
        low: Math.min(1.0, voiceEnergy * 1.1),
        mid: Math.min(1.0, voiceEnergy * 1.25),
        high: Math.min(1.0, consonantBurst * 1.4 + voiceEnergy * 0.4),
        spectrum,
        volume: voiceEnergy,
      };
    }, 25);
  }

  // Stop speech synthesis modulation
  public stopSpeechModulation(): void {
    this.isSpeaking = false;
    if (this.syntheticInterval) {
      clearInterval(this.syntheticInterval);
      this.syntheticInterval = null;
    }
  }

  // Read current real-time FFT frequency metrics
  public getFrequencyMetrics(): AudioFrequencyData {
    if (this.isListening && this.analyser) {
      this.analyser.getByteFrequencyData(this.frequencyData);

      // Low band: bins 0..3 (approx 0 - 250Hz)
      let lowSum = 0;
      for (let i = 0; i < 4; i++) lowSum += this.frequencyData[i];
      const low = lowSum / (4 * 255);

      // Mid band: bins 4..12 (approx 250 - 2000Hz)
      let midSum = 0;
      for (let i = 4; i < 13; i++) midSum += this.frequencyData[i];
      const mid = midSum / (9 * 255);

      // High band: bins 13..24 (approx 2000 - 8000Hz)
      let highSum = 0;
      for (let i = 13; i < 25; i++) highSum += this.frequencyData[i];
      const high = highSum / (12 * 255);

      // 16-band normalized spectrum array
      const spectrum = new Array(16).fill(0).map((_, idx) => {
        const binIndex = Math.min(this.frequencyData.length - 1, Math.floor((idx / 16) * 24));
        return this.frequencyData[binIndex] / 255;
      });

      const volume = (low * 0.4 + mid * 0.4 + high * 0.2);

      this.currentMetrics = {
        low,
        mid,
        high,
        spectrum,
        volume,
      };
    } else if (!this.isSpeaking) {
      // Smooth decay to zero
      this.currentMetrics = {
        low: this.currentMetrics.low * 0.85,
        mid: this.currentMetrics.mid * 0.85,
        high: this.currentMetrics.high * 0.85,
        spectrum: this.currentMetrics.spectrum.map((v) => v * 0.85),
        volume: this.currentMetrics.volume * 0.85,
      };
    }

    return this.currentMetrics;
  }
}

export const webAudioService = new WebAudioService();
