import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import {
  Copy,
  Check,
  Cpu,
  Database,
  ArrowUpRight,
  ChevronRight,
} from 'lucide-react';

interface ApiDocsPageProps {
  onNavigate: (page: 'home' | 'dashboard' | 'diseases' | 'ask' | 'about' | 'styles' | 'api') => void;
}

type CodeLang = 'javascript' | 'python' | 'curl' | 'go';

export const ApiDocsPage: React.FC<ApiDocsPageProps> = ({ onNavigate }) => {
  const [selectedLang, setSelectedLang] = useState<CodeLang>('javascript');
  const [activeSection, setActiveSection] = useState<string>('quickstart');
  const [copied, setCopied] = useState<boolean>(false);

  const codeSnippets: Record<CodeLang, string> = {
    javascript: `import { IkoliClient } from '@ikoli/sdk';

const ikoli = new IkoliClient({
  apiKey: process.env.IKOLI_API_KEY, // "ikoli_live_9f83a2..."
});

// 1. Submit field image for edge neural vision staging
const staging = await ikoli.vision.stage({
  model: 'ikoli-vision-v2-omni',
  image: 'https://sentinel-phc.ng/media/lesion_sample_312.jpg',
  sensoryLossDetected: true,
  enlargedNervesCount: 0,
  zeroPiiToken: 'a4f9b8c2e17d...',
});

console.log(staging.diagnosis);
// Output: "Paucibacillary (PB) Leprosy (ICD-11: 1B20.0)"
console.log(staging.recommendedRegimen);
// Output: "6-Month WHO Standard PB Blister Pack (Rifampicin + Dapsone)"`,

    python: `from ikoli import IkoliClient
import os

client = IkoliClient(api_key=os.environ.get("IKOLI_API_KEY"))

# Stage skin NTD lesion using multi-spectral edge vision
response = client.vision.stage(
    model="ikoli-vision-v2-omni",
    image_url="https://sentinel-phc.ng/media/lesion_sample_312.jpg",
    sensory_loss=True,
    enlarged_nerves=0,
    lga_node="Ebonyi-Izzi-04",
)

print(f"Disease: {response.predicted_disease}")
print(f"Confidence: {response.confidence * 100:.1f}%")
print(f"WHO Regimen: {response.who_treatment_protocol}")`,

    curl: `curl -X POST https://api.ikoli.health.ng/v1/vision/stage \\
  -H "Authorization: Bearer ikoli_live_9f83a2c74e1d" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "ikoli-vision-v2-omni",
    "imageUrl": "https://sentinel-phc.ng/media/lesion_sample_312.jpg",
    "clinicalSensoryLoss": true,
    "enlargedNervesCount": 0,
    "facilityId": "PHC-ENUGU-089"
  }'`,

    go: `package main

import (
	"context"
	"fmt"
	"github.com/ikoli-ai/ikoli-go/ikoli"
)

func main() {
	client := ikoli.NewClient("ikoli_live_9f83a2c74e1d")

	res, err := client.Vision.Stage(context.Background(), &ikoli.StageRequest{
		Model:       "ikoli-vision-v2-omni",
		ImageURL:    "https://sentinel-phc.ng/media/lesion_sample_312.jpg",
		SensoryLoss: true,
		NervesCount: 0,
	})
	if err != nil {
		panic(err)
	}

	fmt.Printf("Diagnostic Code: %s\\n", res.ICD11Code)
}`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[selectedLang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-[#FAFAFC] text-[#1D1D1F] min-h-screen font-sans selection:bg-[#0071E3] selection:text-white pb-16">
      
      {/* ── Fixed Universal Navbar ───────────────────────────────────────── */}
      <Navbar currentPage="api" onNavigate={onNavigate} />

      <main className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 space-y-12">
        
        {/* ══════════════════════════════════════════════════════════════════════
            TOP DEVELOPER HERO HEADER
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="pb-6 border-b border-black/5 text-left space-y-2">
          <h1 className="font-display font-black text-3xl sm:text-4xl text-[#1D1D1F] tracking-tight">
            IKOLI Developer Documentation
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 max-w-2xl leading-relaxed font-normal">
            Authoritative technical specifications, client SDK references, DHIS2 Tracker schemas, and Zero-PII cryptographic models for healthcare system integration.
          </p>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            MAIN 2-COLUMN DEVELOPER CONSOLE (Matching OpenAI Layout)
        ══════════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
          
          {/* ── Left Column: Developer Docs Navigation Sidebar (Span 3) ───── */}
          <aside className="lg:col-span-3 space-y-6 bg-white p-5 rounded-[28px] border border-black/5 shadow-xs">
            
            {/* Group 1: Get Started */}
            <div className="space-y-1">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-gray-400 block px-3 py-1">
                Get Started
              </span>
              {[
                { id: 'quickstart', label: 'Developer Quickstart' },
                { id: 'auth', label: 'Authentication & Keys' },
                { id: 'models', label: 'Models & Vision AI' },
                { id: 'privacy', label: 'Zero-PII Vault Protocol' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs transition-all cursor-pointer ${
                    activeSection === item.id
                      ? 'bg-[#0071E3] text-white font-bold shadow-xs'
                      : 'text-gray-600 hover:text-[#1D1D1F] hover:bg-black/5'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className={`w-3.5 h-3.5 ${activeSection === item.id ? 'text-white' : 'text-gray-400'}`} />
                </button>
              ))}
            </div>

            {/* Group 2: Core Endpoints */}
            <div className="space-y-1 pt-3 border-t border-black/5">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-gray-400 block px-3 py-1">
                Core Endpoints
              </span>
              {[
                { id: 'vision-api', label: 'POST /v1/vision/stage' },
                { id: 'telemetry-api', label: 'POST /v1/telemetry/cases' },
                { id: 'vault-api', label: 'POST /v1/vault/tokenize' },
                { id: 'supply-api', label: 'GET /v1/supply/buffers' },
                { id: 'dhis2-api', label: 'POST /v1/dhis2/sync' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                    activeSection === item.id
                      ? 'bg-[#0071E3] text-white font-bold shadow-xs'
                      : 'text-gray-600 hover:text-[#1D1D1F] hover:bg-black/5'
                  }`}
                >
                  <span className="truncate">{item.label}</span>
                  <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${activeSection === item.id ? 'text-white' : 'text-gray-400'}`} />
                </button>
              ))}
            </div>

            {/* Group 3: SDKs & Integration */}
            <div className="space-y-1 pt-3 border-t border-black/5">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-gray-400 block px-3 py-1">
                Integrations
              </span>
              {[
                { id: 'dhis2-guide', label: 'DHIS2 Tracker Pipeline' },
                { id: 'openmrs-guide', label: 'OpenMRS FHIR Bridge' },
                { id: 'who-guide', label: 'WHO NTD Global Sync' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs transition-all cursor-pointer ${
                    activeSection === item.id
                      ? 'bg-[#0071E3] text-white font-bold shadow-xs'
                      : 'text-gray-600 hover:text-[#1D1D1F] hover:bg-black/5'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className={`w-3.5 h-3.5 ${activeSection === item.id ? 'text-white' : 'text-gray-400'}`} />
                </button>
              ))}
            </div>

          </aside>

          {/* ── Right Column: Interactive Code Console & Build Paths (Span 9) */}
          <div className="lg:col-span-9 space-y-8">
            
            {/* 1. Main Interactive Developer Quickstart Console */}
            <div className="bg-[#18191C] rounded-[32px] overflow-hidden border border-black/10 shadow-2xl text-white">
              
              {/* Console Top Toolbar */}
              <div className="px-6 py-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono font-bold text-gray-300 ml-2">
                    Developer Quickstart &bull; Neural Staging Engine
                  </span>
                </div>

                {/* Language Switcher Tabs */}
                <div className="flex items-center gap-1 bg-white/10 p-1 rounded-xl text-xs font-mono">
                  {(['javascript', 'python', 'curl', 'go'] as CodeLang[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setSelectedLang(lang)}
                      className={`px-3 py-1 rounded-lg capitalize transition-all cursor-pointer ${
                        selectedLang === lang
                          ? 'bg-[#0071E3] text-white font-bold shadow-xs'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {lang === 'javascript' ? 'JavaScript' : lang === 'curl' ? 'cURL' : lang}
                    </button>
                  ))}
                  <button
                    onClick={handleCopy}
                    className="px-2.5 py-1 text-gray-400 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                    title="Copy code"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Code Snippet Box */}
              <div className="p-6 overflow-x-auto font-mono text-xs text-gray-200 leading-relaxed bg-[#111214]">
                <pre>{codeSnippets[selectedLang]}</pre>
              </div>

              {/* Console Spec Footer */}
              <div className="p-4 px-6 bg-[#18191C] border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                  <span>Production Base:</span>
                  <span className="text-emerald-400 font-bold">https://api.ikoli.health.ng/v1</span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                  <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300">
                    HTTPS &bull; TLS 1.3
                  </span>
                </div>
              </div>

            </div>

            {/* 2. Build Paths (Matching OpenAI Reference) */}
            <div className="space-y-4">
              <h3 className="font-display font-bold text-xl text-[#1D1D1F]">
                Build paths with IKOLI APIs
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Build Path 1: Differential Vision API */}
                <div className="bg-white p-6 sm:p-7 rounded-[28px] border border-black/5 shadow-xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-2xl bg-[#0071E3]/10 text-[#0071E3] flex items-center justify-center">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-base text-[#1D1D1F]">
                      Neural Vision Staging API
                    </h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Make direct model requests for sub-millimeter lesion boundary detection, confidence scores, and WHO multi-drug therapy blister pack recommendations.
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveSection('vision-api')}
                    className="text-xs font-bold text-[#0071E3] hover:text-[#0077ED] flex items-center gap-1.5 pt-2 cursor-pointer"
                  >
                    <span>Read Vision Reference</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Build Path 2: DHIS2 & OpenMRS Connector */}
                <div className="bg-white p-6 sm:p-7 rounded-[28px] border border-black/5 shadow-xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <Database className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-base text-[#1D1D1F]">
                      DHIS2 Tracker &amp; OpenMRS Bridge
                    </h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Build sovereign data pipelines connecting rural primary health centers to national epidemiological registries with zero duplicate entries.
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveSection('dhis2-api')}
                    className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1.5 pt-2 cursor-pointer"
                  >
                    <span>Read DHIS2 Integration Guide</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>

            {/* 3. Sovereign Models & Endpoints Reference */}
            <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-black/5 shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-lg text-[#1D1D1F]">
                    Production Neural Models
                  </h3>
                  <p className="text-xs text-gray-500">
                    High-efficiency multi-spectral neural models trained on clinical field cohorts.
                  </p>
                </div>
                <span className="text-[10px] font-mono text-gray-400 font-bold bg-[#F5F5F7] px-3 py-1 rounded-full border border-black/5">
                  Registry v1.1
                </span>
              </div>

              <div className="divide-y divide-black/5">
                {[
                  {
                    name: 'ikoli-vision-v2-omni',
                    desc: 'Flagship multimodal neural vision model for complex differential diagnosis between Leprosy, Buruli Ulcer, Yaws, and Leishmaniasis.',
                    speed: '< 120ms',
                    concordance: '94.2%',
                  },
                  {
                    name: 'ikoli-staging-edge',
                    desc: 'Ultra-quantized edge model optimized for low-power offline Android devices in remote agrarian LGA settlements.',
                    speed: '< 45ms',
                    concordance: '91.8%',
                  },
                  {
                    name: 'ikoli-vault-hasher',
                    desc: 'Statutory cryptographic tokenizer producing NDPA 2023-compliant SHA-256 HMAC tokens with zero raw facial biometrics.',
                    speed: '< 5ms',
                    concordance: '100% Cryptographic',
                  },
                ].map((m) => (
                  <div key={m.name} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1 max-w-lg">
                      <span className="font-mono font-bold text-xs text-[#0071E3] block">
                        {m.name}
                      </span>
                      <p className="text-xs text-gray-600 leading-relaxed font-normal">
                        {m.desc}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-mono shrink-0">
                      <span className="text-gray-500">Latency: <strong className="text-[#1D1D1F]">{m.speed}</strong></span>
                      <span className="text-emerald-600 font-bold">{m.concordance}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* ── Fixed Universal Footer ───────────────────────────────────────── */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <Footer onNavigate={onNavigate} />
      </div>

    </div>
  );
};
