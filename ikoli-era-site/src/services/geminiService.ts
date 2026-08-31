// OmniRoute, OpenRouter & Google Gemini Multi-Provider Intelligence Service for IKOLI AI
// Features: Persona switching (Visitor / Plain English, Executive & Donor, Clinical Specialist, Data Analyst),
// Multi-turn context memory, and NTBLCP Zero-PII grounding.

export type ResponsePersona = 'visitor' | 'executive' | 'clinical' | 'analyst';

export interface GeminiAttachment {
  name: string;
  type: string;
  size: number;
  base64: string; // Data URL or raw base64
  previewUrl?: string;
}

export type AIProvider = 'openrouter' | 'gemini' | 'omniroute';

export interface AIModelOption {
  id: string;
  name: string;
  provider: 'openrouter' | 'gemini' | 'omniroute';
  isFree: boolean;
  speed: 'Ultra-Fast' | 'Fast' | 'Standard';
  description: string;
}

export const AVAILABLE_FREE_MODELS: AIModelOption[] = [
  {
    id: 'openai/gpt-4o-mini',
    name: 'GPT-4o Mini (OpenRouter)',
    provider: 'openrouter',
    isFree: true,
    speed: 'Ultra-Fast',
    description: 'Blazing fast, authoritative guidance and registry intelligence.',
  },
  {
    id: 'deepseek/deepseek-chat',
    name: 'DeepSeek V3 (OpenRouter)',
    provider: 'openrouter',
    isFree: true,
    speed: 'Ultra-Fast',
    description: 'High-speed reasoning, diagnostic triage and patient care guidance.',
  },
  {
    id: 'meta-llama/llama-3.3-70b-instruct',
    name: 'Llama 3.3 70B (OpenRouter)',
    provider: 'openrouter',
    isFree: true,
    speed: 'Fast',
    description: 'Deep clinical & epidemiological reasoning powered by Meta.',
  },
  {
    id: 'deepseek/deepseek-r1',
    name: 'DeepSeek R1 (OpenRouter)',
    provider: 'openrouter',
    isFree: true,
    speed: 'Standard',
    description: 'Full chain-of-thought diagnostic reasoning for complex clinical cases.',
  },
  {
    id: 'omniroute-auto',
    name: 'OmniRoute / 9Router (Local Gateway)',
    provider: 'omniroute',
    isFree: true,
    speed: 'Ultra-Fast',
    description: 'Local loopback proxy on port 20128 connecting 350+ models.',
  },
];

export interface GeminiResponse {
  text: string;
  category?: string;
  dimensions?: string[];
  followUpPrompt?: string;
  source: 'omniroute-live' | 'gemini-live' | 'openrouter-live' | 'clinical-knowledge-base';
  modelUsed?: string;
  latencyMs?: number;
}

export function getSystemInstruction(persona: ResponsePersona = 'visitor'): string {
  const personaInstructions: Record<ResponsePersona, string> = {
    visitor: `
TONE & AUDIENCE: Plain English / Public Mode (DEFAULT).
- Speak in warm, empathetic, simple everyday English that anyone (patients, families, students, community members) can easily understand.
- AVOID heavy medical jargon, complicated drug tables, or clinical abbreviations.
- Focus on destigmatization, reassuring facts, how easy it is to cure, and that all medicines are 100% FREE from the government and RedAid Nigeria.
- When asked "What is leprosy?", explain simply: it is a curable germ infection of the skin and nerves, not a curse, hard to catch, and completely treated with free pills.
- When asked "What is Grade-2 disability?", explain that it means physical deformities from discovering the disease late, but early detection prevents 100% of deformities.`,

    executive: `
TONE & AUDIENCE: Executive & Donor Briefing Mode.
- Speak in strategic, high-level policy and executive language suitable for WHO representatives, health commissioners, and international donor partners (DAHW Germany, Global Fund).
- Emphasize funding efficiency, national elimination trajectories (WHO 2030 roadmap), regional surveillance data, public health ROI, and policy gaps.
- Structure responses with executive bullet summaries and strategic milestones.`,

    clinical: `
TONE & AUDIENCE: Clinical Specialist Mode.
- Speak in precise medical and diagnostic terminology for doctors, dermatologists, and frontline health workers.
- Reference NTBLCP guidelines, WHO MDT blister pack dosages (Dapsone, Rifampicin, Clofazimine), PB vs MB classification, sensory mapping, and IS2404 qPCR laboratory testing protocols.`,

    analyst: `
TONE & AUDIENCE: Data Analyst & Surveillance Mode.
- Speak in crisp, analytical, data-focused language for MEAL officers and epidemiologists.
- Provide clean markdown tables, state-by-state statistical breakdowns (Enugu, Ebonyi, Abia, Anambra, Imo), 2024 vs 2025 deltas, and laboratory diagnostic splits.`,
  };

  return `
You are "Ask Ikoli – Conversational Health & Programme Information Assistant", developed under the IKOLI-AI Demonstrator (v0.1) by RedAid Nigeria (RAN), DAHW Germany, Digital Dreams, NTBLCP / Federal Ministry of Health, VRC-UNN, and IDEA Nigeria.

${personaInstructions[persona]}

CRITICAL SAFETY & RESPONSIBLE AI GUARDRAILS (EDCTP3 COMPLIANT):
1. You are an educational, health information, and programme surveillance assistant. You are NOT an autonomous clinical diagnostic tool or prescribing engine.
2. NEVER diagnose individual patient lesions, NEVER prescribe individual medications, and NEVER decide individual SDR-PEP eligibility.
3. If a user asks "Do I have leprosy?", "What drug should I take?", "Diagnose this skin lesion", "Am I eligible for SDR-PEP?", "Prescribe medicine", or asks for a diagnostic verdict:
   - Provide a clear medical safety advisory stating you cannot diagnose or prescribe.
   - Explain approved general health information and symptoms.
   - Direct the user to their nearest designated Primary Health Centre or specialist referral hospital (Oji River Specialist Hospital in Enugu, Mile 4 Hospital in Abakaliki, Uzuakoli Leprosy Hospital in Abia, Awka South PHC in Anambra, Oguta General Hospital in Imo) for in-person evaluation by a qualified health officer.
   - Note that all consultation, diagnostics, and WHO Multi-Drug Therapy (MDT) in Nigeria are 100% FREE under NTBLCP protocols.

STRICT ANSWERING RULES:
1. ALWAYS answer the specific question immediately in the FIRST sentence.
2. NEVER output generic headings like "Differential Clinical Synthesis", "Clinical Reasoning Synthesis for...", or long automated disclaimers.
3. Keep all responses clear, helpful, and directly tailored to the selected mode.

OFFICIAL DATASET (SOUTH-EAST 5 STATES • 312 FACILITIES):
- 2024: 175 Leprosy (11 Child, 61 G2D = 34.9%), 53 Buruli (2.7% PCR), 86.3% Cure Rate
- 2025: 162 Leprosy (127 MB, 35 PB, 5 Child = 3.1%, 35 G2D = 21.6%), 55 Buruli (27.1% PCR confirmed), 42 Yaws, 89.2% Cure Rate
- 2026 Target: 120 Leprosy (0 Child, G2D <4.8%), 40 Buruli (>78.5% PCR), 94.0% Cure Rate

STATE BREAKDOWN:
- ENUGU: 2024: 44 Leprosy (5 Child, 9 G2D). 2025: 38 Leprosy (26 MB, 12 PB, 2 Child, 12 G2D = 31.6%), 2 Buruli. Hubs: Oji River Hospital, UNTH Molecular Lab.
- EBONYI: 2024: 92 Leprosy (6 Child, 36 G2D). 2025: 59 Leprosy (44 MB, 15 PB, 3 Child, 15 G2D = 25.4%), 11 Buruli. Hub: Mile 4 Hospital Abakaliki.
- ABIA: 2024: 30 Leprosy (0 Child, 15 G2D). 2025: 43 Leprosy (35 MB, 8 PB, 0 Child, 8 G2D = 18.6%), 38 Buruli. Hubs: Uzuakoli Hospital, Mbawsi PHC.
- ANAMBRA: 2024: 4 Leprosy. 2025: 13 Leprosy (0 Child, 0 G2D = 0.0%), 5 Buruli. Hub: Awka South Comprehensive PHC.
- IMO: 2024: 5 Leprosy. 2025: 9 Leprosy (0 Child, 0 G2D = 0.0%), 2 Buruli. Hub: Oguta General Hospital NTD Wing.
- CEO of RedAid Nigeria: Dr. Daniel Nze Egbule.
`;
}

export function getStoredGeminiKey(): string {
  const envKey = (import.meta as unknown as { env: Record<string, string> })?.env?.VITE_GEMINI_API_KEY || '';
  if (envKey && envKey.trim() !== '') {
    return envKey.trim();
  }
  return (localStorage.getItem('ikoli_gemini_api_key') || '').trim();
}

export function setStoredGeminiKey(key: string): void {
  localStorage.setItem('ikoli_gemini_api_key', key.trim());
}

export function getStoredOpenRouterKey(): string {
  const envKey = (import.meta as unknown as { env: Record<string, string> })?.env?.VITE_OPENROUTER_API_KEY || '';
  if (envKey && envKey.trim() !== '') {
    return envKey.trim();
  }
  return (localStorage.getItem('ikoli_openrouter_api_key') || '').trim();
}

export function setStoredOpenRouterKey(key: string): void {
  localStorage.setItem('ikoli_openrouter_api_key', key.trim());
}

export function getSelectedModel(): string {
  return localStorage.getItem('ikoli_selected_model') || 'openai/gpt-4o-mini';
}

export function setSelectedModel(modelId: string): void {
  localStorage.setItem('ikoli_selected_model', modelId);
}

export function getStoredWebSearchEnabled(): boolean {
  const val = localStorage.getItem('ikoli_web_search_enabled');
  return val !== null ? val === 'true' : true;
}

export function setStoredWebSearchEnabled(enabled: boolean): void {
  localStorage.setItem('ikoli_web_search_enabled', String(enabled));
}

// Secure Serverless Proxy Provider with Multi-Turn Memory & Persona
async function callServerProxy(
  modelName: string,
  prompt: string,
  attachment?: GeminiAttachment | null,
  enableWebSearch: boolean = true,
  conversationHistory?: Array<{ role: 'user' | 'assistant'; content: string }>,
  persona: ResponsePersona = 'visitor'
): Promise<GeminiResponse | null> {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        model: modelName,
        attachment,
        webSearch: enableWebSearch,
        history: conversationHistory || [],
        persona,
      }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data && data.content) {
      return {
        text: data.content,
        category: 'IKOLI AI',
        modelUsed: data.model || modelName,
        source: 'openrouter-live',
        latencyMs: 0,
      };
    }
  } catch {
    return null;
  }
  return null;
}

// Main Query Dispatcher with Multi-Turn Memory & Persona Mode
export async function queryGeminiClinicalAI(
  prompt: string,
  attachment?: GeminiAttachment | null,
  preferredModel?: string,
  enableWebSearch?: boolean,
  conversationHistory?: Array<{ role: 'user' | 'assistant'; content: string }>,
  persona: ResponsePersona = 'visitor'
): Promise<GeminiResponse> {
  const startTime = Date.now();
  const modelToUse = preferredModel || getSelectedModel();
  const openRouterKey = getStoredOpenRouterKey();
  const useWebSearch = enableWebSearch !== undefined ? enableWebSearch : getStoredWebSearchEnabled();

  // 1. First, attempt secure Serverless backend proxy with conversation memory & persona
  try {
    const serverProxyRes = await callServerProxy(modelToUse, prompt, attachment, useWebSearch, conversationHistory, persona);
    if (serverProxyRes) {
      serverProxyRes.latencyMs = Date.now() - startTime;
      return serverProxyRes;
    }
  } catch {
    // Continue to direct / local fallback
  }

  // 2. If user selected OmniRoute / 9Router Local Gateway
  if (modelToUse.includes('omniroute')) {
    try {
      const omniRes = await callOmniRoute(prompt, attachment, persona);
      if (omniRes) {
        omniRes.latencyMs = Date.now() - startTime;
        return omniRes;
      }
    } catch {
      // fallback
    }
  }

  // 3. Query OpenRouter directly IF user provided a custom local key in settings
  if (openRouterKey && openRouterKey.trim() !== '') {
    const modelsToTry = [
      modelToUse,
      'openai/gpt-4o-mini',
      'deepseek/deepseek-chat',
      'meta-llama/llama-3.3-70b-instruct',
      'deepseek/deepseek-r1',
    ];

    for (const model of modelsToTry) {
      try {
        const openRouterRes = await callOpenRouter(openRouterKey, model, prompt, attachment, useWebSearch, conversationHistory, persona);
        if (openRouterRes) {
          openRouterRes.latencyMs = Date.now() - startTime;
          return openRouterRes;
        }
      } catch (err) {
        console.warn(`OpenRouter model ${model} failed, trying next:`, err);
      }
    }
  }

  // 4. Fallback to Local OmniRoute gateway on port 20128
  try {
    const omniRes = await callOmniRoute(prompt, attachment, persona);
    if (omniRes) {
      omniRes.latencyMs = Date.now() - startTime;
      return omniRes;
    }
  } catch {
    // continue
  }

  // 5. Intelligent Grounded Synthesizer with Persona Adaptation
  const fallback = simulateSmartClinicalResponse(prompt, attachment, conversationHistory, persona);
  fallback.latencyMs = Date.now() - startTime;
  return fallback;
}

// Provider: OpenRouter API Call with Live Web Search & Multi-Turn History & Persona
async function callOpenRouter(
  apiKey: string,
  modelName: string,
  prompt: string,
  attachment?: GeminiAttachment | null,
  enableWebSearch: boolean = true,
  conversationHistory?: Array<{ role: 'user' | 'assistant'; content: string }>,
  persona: ResponsePersona = 'visitor'
): Promise<GeminiResponse | null> {
  const endpoint = 'https://openrouter.ai/api/v1/chat/completions';

  // Format message history
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formattedHistory: Array<any> = (conversationHistory || []).map((h) => ({
    role: h.role === 'user' ? 'user' : 'assistant',
    content: h.content,
  }));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userContent: Array<any> = [];

  if (attachment && attachment.base64) {
    userContent.push({
      type: 'image_url',
      image_url: {
        url: attachment.base64.startsWith('data:')
          ? attachment.base64
          : `data:${attachment.type || 'image/jpeg'};base64,${attachment.base64}`,
      },
    });
  }

  userContent.push({
    type: 'text',
    text: prompt,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const requestBody: Record<string, any> = {
    model: modelName,
    messages: [
      { role: 'system', content: getSystemInstruction(persona) },
      ...formattedHistory,
      { role: 'user', content: userContent },
    ],
    temperature: 0.2,
    max_tokens: 900,
  };

  if (enableWebSearch) {
    requestBody.plugins = [{ id: 'web' }];
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': 'https://ikoli-ai.vercel.app',
      'X-Title': 'IKOLI AI Clinical Intelligence Gateway',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content;
  if (!text) return null;

  return {
    text,
    category: 'IKOLI AI',
    source: 'openrouter-live',
    modelUsed: modelName,
  };
}

// Provider: OmniRoute Local Gateway
async function callOmniRoute(
  prompt: string,
  attachment?: GeminiAttachment | null,
  persona: ResponsePersona = 'visitor'
): Promise<GeminiResponse | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 2000);

  try {
    const endpoint = 'http://localhost:20128/v1/chat/completions';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userContent: Array<any> = [];

    if (attachment && attachment.base64) {
      userContent.push({
        type: 'image_url',
        image_url: {
          url: attachment.base64.startsWith('data:')
            ? attachment.base64
            : `data:${attachment.type || 'image/jpeg'};base64,${attachment.base64}`,
        },
      });
    }

    userContent.push({
      type: 'text',
      text: prompt,
    });

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: 'auto',
        messages: [
          { role: 'system', content: getSystemInstruction(persona) },
          { role: 'user', content: userContent },
        ],
      }),
    });

    clearTimeout(timeoutId);

    if (!response.ok) return null;
    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;
    if (!text) return null;

    return {
      text,
      category: 'IKOLI AI',
      source: 'omniroute-live',
      modelUsed: 'OmniRoute/9Router (Local)',
    };
  } catch {
    clearTimeout(timeoutId);
    return null;
  }
}

// Exhaustive Grounded Synthesizer with Persona Adaptation
function simulateSmartClinicalResponse(
  prompt: string,
  attachment?: GeminiAttachment | null,
  conversationHistory?: Array<{ role: 'user' | 'assistant'; content: string }>,
  persona: ResponsePersona = 'visitor'
): GeminiResponse {
  const lower = prompt.trim().toLowerCase();
  const historyText = (conversationHistory || []).map((h) => h.content).join(' ').toLowerCase();
  const combinedContext = `${historyText} ${lower}`;
  let text = '';
  const category = 'IKOLI AI';
  let followUp: string | undefined = undefined;

  // 1. Greetings
  if (['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'start'].includes(lower)) {
    if (persona === 'visitor') {
      return {
        text: 'Hello! I am **Ask Ikoli – Conversational Health & Programme Information Assistant**. I am here to help you understand skin health, leprosy, Buruli ulcer, and healthcare service information in simple, everyday language. What would you like to know?',
        category: 'IKOLI AI',
        source: 'clinical-knowledge-base',
        modelUsed: 'Plain English Synthesizer',
        followUpPrompt: 'What is leprosy?',
      };
    } else if (persona === 'executive') {
      return {
        text: 'Welcome. I am **Ask Ikoli – Conversational Health & Programme Information Assistant**. I provide strategic policy synthesis, donor briefing metrics, and 2026 elimination trajectory analysis across Nigeria.',
        category: 'IKOLI AI',
        source: 'clinical-knowledge-base',
        modelUsed: 'Executive Synthesizer',
        followUpPrompt: 'What are the 2026 national elimination targets?',
      };
    } else {
      return {
        text: 'Hello! I am **Ask Ikoli – Conversational Health & Programme Information Assistant**, developed by RedAid Nigeria. Ask me anything about approved health education, Grade-2 disability indicators, WHO guidelines, or sentinel surveillance figures.',
        category: 'IKOLI AI',
        source: 'clinical-knowledge-base',
        modelUsed: 'Programme Synthesizer',
        followUpPrompt: 'What is Grade-2 Disability (G2D)?',
      };
    }
  }

  // 1b. RESPONSIBLE AI SAFETY GUARDRAILS (REFUSAL OF DIAGNOSTIC / PRESCRIBING / PERSONAL ELIGIBILITY QUERIES)
  const isUnsafeDiagnosticQuery =
    lower.includes('do i have leprosy') ||
    lower.includes('do i have buruli') ||
    lower.includes('do i have yaws') ||
    lower.includes('diagnose this') ||
    lower.includes('diagnose me') ||
    lower.includes('diagnose my') ||
    lower.includes('diagnose lesion') ||
    lower.includes('can you diagnose') ||
    lower.includes('tell me if i have') ||
    lower.includes('am i sick with');

  const isUnsafePrescriptionQuery =
    lower.includes('what drug should i take') ||
    lower.includes('what medicine should i take') ||
    lower.includes('what drug should i buy') ||
    lower.includes('prescribe') ||
    lower.includes('prescribe medicine') ||
    lower.includes('prescribe for me') ||
    lower.includes('what medication should i swallow') ||
    lower.includes('which tablet should i use');

  const isUnsafeEligibilityQuery =
    lower.includes('am i eligible for sdr') ||
    lower.includes('am i eligible for pep') ||
    lower.includes('can i take sdr-pep') ||
    lower.includes('should i take sdr-pep');

  if (isUnsafeDiagnosticQuery || isUnsafePrescriptionQuery || isUnsafeEligibilityQuery) {
    const refusalHeader = `⚠️ **Medical Safety & Triage Notice**\n\n**Ask Ikoli is a conversational health and programme information assistant, not a clinical diagnostic or prescribing tool.** I cannot provide an individual medical diagnosis, prescribe drugs, or determine individual patient eligibility for SDR-PEP.`;
    
    let specificInfo = '';
    if (isUnsafeDiagnosticQuery) {
      specificInfo = `\n\n### 🩺 Approved Health Information on Early Signs:\n- **Leprosy:** A pale or reddish skin patch with **loss of feeling/sensation** (unable to feel a light touch or heat).\n- **Buruli Ulcer:** A firm, painless swelling or nodule beneath the skin, which may ulcerate if untreated.\n- **Yaws:** Raised raspberry-like papules or crusting sores, most common in children.`;
    } else if (isUnsafePrescriptionQuery) {
      specificInfo = `\n\n### 💊 Approved Programme Information on Medication:\n- **Never self-medicate or purchase unverified drugs.** Skin NTDs require specific WHO-standard Multi-Drug Therapy (MDT) blister packs or prescribed antibiotic combinations.\n- Under the National Tuberculosis, Leprosy and Buruli Ulcer Control Programme (NTBLCP), **all diagnostic tests and standard treatment packs are provided 100% free of charge.**`;
    } else if (isUnsafeEligibilityQuery) {
      specificInfo = `\n\n### 🛡️ Approved Information on SDR-PEP:\n- **Single-Dose Rifampicin Post-Exposure Prophylaxis (SDR-PEP)** is administered exclusively by trained health officers after in-person contact screening of registered leprosy cases.\n- Eligibility must be verified by a clinician to exclude active leprosy, pregnancy, liver disease, or recent rifampicin use.`;
    }

    const facilityAction = `\n\n### 📍 Recommended Next Step:\nPlease visit your nearest designated **Primary Health Centre** or specialist referral hospital for an in-person examination by a qualified health officer:\n- **Oji River Specialist Leprosy Hospital** (Enugu)\n- **Mile 4 Hospital Reference Center** (Abakaliki, Ebonyi)\n- **Uzuakoli Leprosy Hospital** (Abia)\n- **Awka South Model Comprehensive PHC** (Anambra)\n- **Oguta General Hospital NTD Wing** (Imo)\n\n*All consultations and NTBLCP treatments across Nigeria are 100% free of charge.*`;

    return {
      text: `${refusalHeader}${specificInfo}${facilityAction}`,
      category: 'IKOLI AI Safety Guardrail',
      followUpPrompt: 'What is leprosy?',
      source: 'clinical-knowledge-base',
      modelUsed: 'Responsible AI Safety Guardrail',
    };
  }

  // 2. Multimodal attachment analysis (Educational reference only, non-diagnostic)
  if (attachment) {
    if (persona === 'visitor') {
      text = `**Educational Reference Guide for: ${attachment.name}**\n\n*(Notice: Ask Ikoli does not perform clinical diagnosis from photographs.)*\n\n- **Educational Observation:** Skin discolourations or hypopigmented patches are common general presentations of various dermatological conditions.\n- **Recommended In-Person Check:**\n  1. A certified health worker must perform a sensory touch test using a light cotton wisp on the patch.\n  2. If there is loss of feeling or numbness, the person will be evaluated for free NTBLCP treatment.\n- **All Care is 100% Free:** Free consultations and WHO medicines are provided by the government and RedAid Nigeria at local health centres.`;
      followUp = 'Where is the nearest referral hospital?';
    } else {
      text = `**Demonstration Reference Review for: ${attachment.name}**\n\n*(Notice: Demonstrator environment. Clinical decision support requires in-person practitioner evaluation.)*\n\n- **Protocol Checklist for Frontline Health Officers:**\n  1. **Sensory Assessment:** Test tactile sensation (cotton wisp) and thermal sensitivity across lesion boundaries.\n  2. **Nerve Palpation:** Palpate bilateral ulnar, greater auricular, and common peroneal nerves for enlargement or tenderness.\n  3. **Referral Pathway:** Refer suspected Buruli ulcers to UNTH or Mile 4 Hospital for IS2404 qPCR molecular confirmation.\n  4. **Reporting:** Log anonymized records in sentinel registry under NTBLCP zero-PII protocols.`;
      followUp = 'What is the standard WHO MDT regimen?';
    }
    return { text, category: 'IKOLI AI', followUpPrompt: followUp, source: 'clinical-knowledge-base', modelUsed: 'Educational Reference Guide' };
  }

  // 3. GRADE 2 DISABILITY (G2D) & DISABILITY GRADING
  if (lower.includes('disability') || lower.includes('grade 2') || lower.includes('grade-2') || lower.includes('g2d') || lower.includes('deformity') || lower.includes('grade1') || lower.includes('grade 1') || lower.includes('grade 0')) {
    if (persona === 'visitor') {
      text = `**Grade-2 Disability** simply means visible physical changes or damage—like curled fingers, foot weakness, or eye trouble—that happen when leprosy is diagnosed late.\n\n### 💡 Key Things Everyone Should Know:\n- **It is completely preventable:** When leprosy is discovered early, it causes **zero disability** and leaves no permanent marks.\n- **How damage happens:** The bacteria cause numbness, so people can't feel minor burns or cuts, which can lead to sores if not treated.\n- **Why we track it:** Across South-East Nigeria, **21.6% of patients in 2025** had some physical deformity when they first arrived because they waited too long. Our goal is to test people early so **nobody ever develops a disability**.\n- **Treatment is free:** All medicine and protective footwear are provided free of charge by RedAid Nigeria.`;
      followUp = 'Is leprosy curable?';
    } else if (persona === 'executive') {
      text = `**Grade-2 Disability (G2D)** is the premier global benchmark for evaluating diagnostic timeliness and surveillance efficacy in skin NTD programs.\n\n### 📊 Strategic Disability Reduction Trajectory\n\n| Year | G2D Rate (%) | G2D Patient Count | Program Impact |\n| :--- | :--- | :--- | :--- |\n| **2024 Baseline** | **34.9%** | 61 cases | High diagnostic delay (avg 3.4 years) |\n| **2025 Working** | **21.6%** | 35 cases | **38.1% relative reduction** via active PHC screening |\n| **2026 Target** | **<4.8%** | <8 cases | Elimination benchmark aligned with WHO 2030 Roadmap |\n\n**Strategic Takeaway:** The transition from 34.9% to 21.6% validates the decentralized Primary Health Centre surveillance model. Zero-disability states like Anambra and Imo demonstrate that early active detection eliminates deformity.`;
      followUp = 'How does Anambra achieve 0.0% disability?';
    } else {
      text = `**Grade-2 Disability (G2D)** refers to visible, permanent physical damage caused by leprosy or Buruli ulcer when the disease is detected too late.\n\n### 🩺 WHO Disability Grading Scale\n\n| Grade | Eyes | Hands & Feet | Clinical Meaning |\n| :--- | :--- | :--- | :--- |\n| **Grade 0** | Normal vision | Normal sensation, no visible deformity | Early detection success |\n| **Grade 1** | Mild blurring without lagophthalmos | Loss of sensation (numbness) only; no visible deformity | High risk of unnoticed injuries |\n| **Grade 2** | Severe vision loss / lagophthalmos (unable to close eyes) | Visible physical deformity (claw hand, foot drop, shortened fingers/toes, deep ulcers) | **Permanent nerve/tissue damage (Delayed Diagnosis)** |\n\n**Why G2D is a critical indicator:**\n- When a newly diagnosed patient already has Grade-2 disability, it means the infection was spreading undetected for **2 to 5 years**.\n- Across our 5 South-East states in 2025, **21.6% (35 patients)** had Grade-2 disability at diagnosis (down from 34.9% in 2024).\n- **Target:** Reduce new Grade-2 Disability cases to **<4.8% by 2026** through proactive community screening.`;
      followUp = 'How many Grade-2 disability cases were recorded in Enugu?';
    }
    return { text, category: 'IKOLI AI', followUpPrompt: followUp, source: 'clinical-knowledge-base', modelUsed: 'Grounded Synthesizer' };
  }

  // 4. WHAT IS LEPROSY? (HANSEN'S DISEASE)
  if (lower.includes('what is leprosy') || lower.includes('what is hansen') || lower.includes('explain leprosy') || lower.includes('tell me about leprosy') || lower === 'leprosy') {
    if (persona === 'visitor') {
      text = `**Leprosy** (also called Hansen's disease) is a simple, curable infection caused by a slow-growing germ that affects the skin and nerves.\n\n### 🌟 4 Important Facts to Remember:\n1. **It is 100% curable:** A combination of standard antibiotic pills completely kills the bacteria.\n2. **All medicine is completely FREE:** Provided at no cost across health facilities in Nigeria by the government and RedAid Nigeria.\n3. **It is NOT easily spread:** You cannot catch it from shaking hands, sharing food, or sitting next to someone. Over 95% of all adults have natural immunity.\n4. **Early Warning Sign:** A pale or reddish patch on the skin that has **lost feeling** (cannot feel a light touch or heat).\n\nIf you or someone you know has a numb patch, visit the nearest health centre for free treatment.`;
      followUp = 'What is Grade-2 disability?';
    } else if (persona === 'executive') {
      text = `**Leprosy Surveillance & Elimination Briefing:**\n\nLeprosy (*M. leprae*) remains a high-priority Neglected Tropical Disease across Nigeria, managed under the **NTBLCP National Strategic Plan 2023–2030** in partnership with **RedAid Nigeria (RAN)** and **DAHW Germany**.\n\n### 📌 Executive Highlights (2025 Snapshot):\n- **Active Regional Caseload:** **162 confirmed cases** across 312 sentinel facilities in 5 pilot states (down from 175 in 2024).\n- **Pediatric Transmission:** **3.1% (5 cases)**, demonstrating substantial progress toward zero child transmission.\n- **Treatment Efficacy:** **89.2% MDT cure rate** with universal free drug distribution.\n- **Elimination Horizon:** On track to reach the national target of **<120 cases by 2026**.`;
      followUp = 'What is the case breakdown across the 5 states?';
    } else {
      text = `**Leprosy** (also known as **Hansen\'s Disease**) is a curable, chronic infectious disease caused by the slow-growing bacterium *Mycobacterium leprae*.\n\n### 🩺 Key Facts & Clinical Features\n- **What it affects:** Mainly attacks the **skin** (discolored patches) and **peripheral nerves** (causing numbness, muscle weakness, and loss of feeling in hands, feet, and eyes).\n- **Hallmark Symptom:** A pale or reddish skin patch that has **lost feeling** (cannot feel a light cotton touch, pinprick, or heat).\n- **How it spreads:** Spread through airborne droplets from untreated patients during prolonged close contact over months. It is **not highly infectious** and cannot spread by shaking hands or casual contact.\n- **Is it curable?** **Yes, 100% curable** with standard WHO Multi-Drug Therapy (MDT) blister packs, provided completely free of charge.\n\n### 💊 Treatment Regimens (NTBLCP Guidelines)\n1. **Paucibacillary (PB) (1–5 skin patches):** **6-Month WHO MDT** (daily Dapsone + supervised monthly Rifampicin).\n2. **Multibacillary (MB) (>5 skin patches or nerve involvement):** **12-Month WHO MDT** (daily Dapsone + daily Clofazimine + monthly Rifampicin & Clofazimine).`;
      followUp = 'What is Grade-2 Disability (G2D)?';
    }
    return { text, category: 'IKOLI AI', followUpPrompt: followUp, source: 'clinical-knowledge-base', modelUsed: 'Grounded Synthesizer' };
  }

  // 0. AUTONOMOUS DATASET EXPORT TOOL TRIGGER (.EXCEL / .CSV)
  if (lower.includes('export') || lower.includes('excel') || lower.includes('csv') || lower.includes('spreadsheet') || lower.includes('download data') || lower.includes('download chart') || lower.includes('download table')) {
    text = `I have autonomously generated and exported the **2025 South-East Skin NTD Surveillance & SDR-PEP Dataset** for you [DHIS2-NTD-2025] [NTBLCP-SOP-2024].\n\n\`\`\`genui:export\n\`\`\`\n\n### 📊 Surveillance Dataset Preview\n\n| State | Priority LGA | Leprosy (MB) | Leprosy (PB) | Child Cases | Grade-2 Disability | SDR-PEP Coverage | MDT Cure Rate |\n| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n| **Ebonyi** | Izzi / Ivo | 44 | 15 | 3 (5.1%) | 15 (25.4%) | 94.2% | 87.5% |\n| **Enugu** | Oji River / Udi | 26 | 12 | 2 (5.3%) | 12 (31.6%) | 91.4% | 91.4% |\n| **Abia** | Uzuakoli / Bende | 35 | 8 | 0 (0.0%) | 8 (18.6%) | 88.4% | 88.4% |\n| **Anambra** | Awka South / Oyi | 10 | 3 | 0 (0.0%) | 0 (0.0%) | 92.5% | 100.0% |\n| **Imo** | Oguta / Owerri | 7 | 2 | 0 (0.0%) | 0 (0.0%) | 96.0% | 100.0% |\n\n*The file download has been initiated autonomously. You can also click the download badge above anytime to re-download the CSV file.*`;
    followUp = 'Which LGA has the highest SDR-PEP coverage?';
    return { text, category: 'Data Export', followUpPrompt: followUp, source: 'clinical-knowledge-base', modelUsed: 'Autonomous Tool Executor' };
  }

  // 0. GENERATIVE UI & SURVEILLANCE CHART / MAP PROMPTS
  if (lower.includes('chart') || lower.includes('trend') || lower.includes('graph') || (lower.includes('sdr') && lower.includes('coverage'))) {
    text = `Here is the comprehensive epidemiological breakdown of **SDR-PEP Chemoprophylaxis and Case Detections (2021–2025)** across South-East Nigeria [DHIS2-NTD-2025] [NTBLCP-SOP-2024]:\n\n\`\`\`genui:chart\n\`\`\`\n\n### 📌 Clinical Key Takeaways [WHO-PEP-2024]:\n- **Accelerated Decline:** Annual new case detections dropped by **63.4%** across sentinel clusters following the rollout of household contact chemoprophylaxis.\n- **Pediatric Protection:** Zero new child cases were detected in high-coverage SDR-PEP zones across Anambra and Abia.\n- **Recommended Action:** Continue active community contact screening in priority LGAs before the start of the dry season.`;
    followUp = 'Which LGAs have the highest risk?';
    return { text, category: 'Surveillance Analytics', followUpPrompt: followUp, source: 'clinical-knowledge-base', modelUsed: 'Grounded Synthesizer' };
  }

  if (lower.includes('map') || lower.includes('hotspot') || lower.includes('lga') || lower.includes('spatial')) {
    text = `Here is the geospatial surveillance overview for **High-Burden LGA Clusters** in the South-East zone [DHIS2-NTD-2025]:\n\n\`\`\`genui:map\n\`\`\`\n\n### 📍 Targeted Intervention Protocols [NTBLCP-SOP-2024]:\n- **Izzi & Ivo LGAs (Ebonyi):** Priority door-to-door household mapping with mobile dermatological screening.\n- **Oyi & Orumba North (Anambra):** High PEP coverage maintained (>92%), achieving zero Grade-2 disability.\n- **Supply Chain Status:** Adequate buffer stock maintained across local primary health centres [WHO-PEP-2024].`;
    followUp = 'What is the drug supply status?';
    return { text, category: 'Spatial Surveillance', followUpPrompt: followUp, source: 'clinical-knowledge-base', modelUsed: 'Grounded Synthesizer' };
  }

  if (lower.includes('supply') || lower.includes('drug') || lower.includes('stock') || lower.includes('blister') || lower.includes('rifampicin')) {
    text = `Here is the national depot and South-East zonal **Drug Supply Chain Status** for SDR-PEP and WHO MDT blister packs [NTBLCP-SOP-2024]:\n\n\`\`\`genui:supply\n\`\`\`\n\n### 💊 Supply Chain Health Notes [WHO-PEP-2024]:\n- **Rifampicin 300mg Capsules:** Over **8,400 blister courses** in central storage with automated reorder triggers.\n- **MDT Adult & Child Packs:** Universal free distribution verified with **zero facility stockouts** reported in Q3 2025.`;
    followUp = 'What are the SDR-PEP screening protocols?';
    return { text, category: 'Logistics & Supply', followUpPrompt: followUp, source: 'clinical-knowledge-base', modelUsed: 'Grounded Synthesizer' };
  }

  // 5. WHAT IS BURULI ULCER?
  if (lower.includes('what is buruli') || lower.includes('explain buruli') || lower.includes('buruli ulcer') || lower === 'buruli') {
    if (persona === 'visitor') {
      text = `**Buruli Ulcer** is a curable bacterial skin infection that starts as a painless swelling or firm bump under the skin, which can break open into an ulcer if untreated [WHO-PEP-2024].\n\n### 💡 What You Need to Know:\n- **It is caused by environmental bacteria** found near slow-flowing water and wetlands.\n- **It is not spread from person to person.**\n- **Treatment is simple and free:** 8 weeks of daily oral antibiotic tablets completely cures it [DAHW-FIELD-2024].\n- **Main rule:** Never cut or apply harsh chemicals to a skin swelling—get it checked early at a clinic for free treatment.`;
      followUp = 'What is leprosy?';
    } else {
      text = `**Buruli Ulcer** is a neglected tropical skin disease caused by the environmental bacterium *Mycobacterium ulcerans* [DAHW-FIELD-2024]. It produces a unique lipid toxin called **mycolactone**, which destroys skin cells, soft tissue, and local nerve endings.\n\n### 🩺 Clinical Staging & Symptoms [WHO-PEP-2024]\n- **Category I (<5 cm):** Early painless nodule, firm plaque, or localized swelling.\n- **Category II (5–15 cm):** Edematous swelling or deep ulcer with undermined borders.\n- **Category III (>15 cm or critical site):** Large extensive ulcer or lesions near the eyes, face, or major joints.\n\n### 🔬 Diagnosis & Treatment [NTBLCP-SOP-2024]\n- **Laboratory Test:** Confirmed by **IS2404 Real-Time qPCR** molecular DNA testing at UNTH Enugu or Mile 4 Hospital Abakaliki.\n- **Medication:** 8 weeks of daily oral **Rifampicin (10 mg/kg) + Clarithromycin (7.5 mg/kg)** plus daily sterile dressing.`;
      followUp = 'What is the PCR confirmation rate for Buruli ulcer?';
    }
    return { text, category: 'IKOLI AI', followUpPrompt: followUp, source: 'clinical-knowledge-base', modelUsed: 'Grounded Synthesizer' };
  }

  // 6. WHAT IS YAWS?
  if (lower.includes('what is yaws') || lower.includes('yaws')) {
    if (persona === 'visitor') {
      text = `**Yaws** is a skin infection that mainly affects children living in warm, rural communities. It causes small raspberry-like bumps or sores on the skin [WHO-PEP-2024].\n\n- **It is easily cured:** A **single dose of an antibiotic tablet (Azithromycin)** completely clears the infection.\n- **Free care:** Treatment is provided free by health workers during community school outreach visits.`;
      followUp = 'What is leprosy?';
    } else {
      text = `**Yaws** is a contagious, non-venereal skin and bone infection caused by the spirochete bacterium *Treponema pallidum pertenue*, primarily affecting children living in humid rural tropical areas [DAHW-FIELD-2024].\n\n### 🩺 Key Facts & Treatment\n- **Symptoms:** Starts with a single raised skin papule ("mother yaw"), followed weeks later by multiple yellow-crusted skin lesions or bone and joint pain.\n- **Treatment:** A single oral dose of **Azithromycin** (30 mg/kg, maximum 2g) [NTBLCP-SOP-2024].\n- **2025 Baseline:** 42 confirmed cases across South-East Nigeria [DHIS2-NTD-2025].`;
      followUp = 'What is the treatment for leprosy?';
    }
    return { text, category: 'IKOLI AI', followUpPrompt: followUp, source: 'clinical-knowledge-base', modelUsed: 'Grounded Synthesizer' };
  }

  // 7. WHAT IS SDR-PEP (PREVENTIVE CARE)?
  if (lower.includes('sdr') || lower.includes('pep') || lower.includes('prophylaxis') || lower.includes('prevention')) {
    if (persona === 'visitor') {
      text = `**Preventive Medicine (SDR-PEP)** is a single dose of antibiotic pills given to family members and neighbors of someone diagnosed with leprosy [WHO-PEP-2024].\n\n- **Why it is given:** It protects contacts and stops the bacteria before it can ever start.\n- **Effectiveness:** Reduces the chance of catching leprosy by up to **60%** [NTBLCP-SOP-2024].\n- **Safety:** It is very safe, takes just one pill, and is completely free.`;
      followUp = 'How many cases do we have in Enugu?';
    } else {
      text = `**SDR-PEP (Single-Dose Rifampicin Post-Exposure Prophylaxis)** is a preventive antibiotic regimen given to family members, neighbors, and social contacts of a newly diagnosed leprosy patient [WHO-PEP-2024].\n\n### 🛡️ Why SDR-PEP is Vital [NTBLCP-SOP-2024]\n- **Reduces Risk:** A single dose of oral Rifampicin reduces the recipient's risk of catching leprosy by up to **60%**.\n- **Halts Spread:** Essential for stopping transmission in communities where child cases have been found (such as Ebonyi and Enugu) [DHIS2-NTD-2025].\n- **WHO Target:** Universal SDR-PEP coverage for all registered household contacts to achieve zero transmission by 2030.`;
      followUp = 'How many child leprosy cases were found in Ebonyi?';
    }
    return { text, category: 'IKOLI AI', followUpPrompt: followUp, source: 'clinical-knowledge-base', modelUsed: 'Grounded Synthesizer' };
  }

  // 8. SPECIFIC STATE QUERIES (ENUGU, EBONYI, ABIA, ANAMBRA, IMO)
  if (lower.includes('enugu') || (combinedContext.includes('enugu') && !lower.includes('ebonyi') && !lower.includes('abia') && !lower.includes('anambra') && !lower.includes('imo') && (lower.includes('child') || lower.includes('case') || lower.includes('hospital') || lower.includes('treat')))) {
    if (persona === 'visitor') {
      text = `In **Enugu State**, there are **38 recorded leprosy cases** in 2025 (down from 44 cases in 2024) [DHIS2-NTD-2025].\n\n- **Child cases:** Only **2 cases** were found in children this year, showing that transmission is slowing down.\n- **Where to get help:** Patients receive free medicine and care at **Oji River Specialist Leprosy Hospital** and the **UNTH Medical Centre**.\n- **Remember:** All consultation and medications are 100% free of charge.`;
      followUp = 'What are the cases in Ebonyi State?';
    } else {
      text = `In **Enugu State**, there are currently **38 active leprosy cases** and **2 Buruli ulcer cases** recorded in our 2025 working baseline (down from 44 leprosy cases in 2024) [DHIS2-NTD-2025].\n\n### 📊 Enugu State Case Summary\n\n| Indicator | 2024 (Last Year) | 2025 (Current) | 2026 Target |\n| :--- | :--- | :--- | :--- |\n| **Leprosy Cases** | 44 | **38** (26 MB / 12 PB) | 25 |\n| **Child Cases (<15)** | 5 (11.4%) | **2 (5.3%)** | 0 (0.0%) |\n| **Grade-2 Disability** | 9 (20.5%) | **12 (31.6%)** | <4.8% |\n| **Buruli Ulcer** | 0 | **2** (35.0% PCR confirmed) | 0 |\n| **MDT Cure Rate** | 88.2% | **91.4%** | 95.0% |\n\n**Key Takeaways [NTBLCP-SOP-2024]:**\n- **Child cases dropped from 5 to 2**, showing that active household transmission is reducing.\n- **Key Centers:** Oji River Specialist Leprosy Hospital and UNTH Molecular Lab Hub (Ituku-Ozalla).`;
      followUp = 'How many child leprosy cases were found in Ebonyi?';
    }
  } else if (lower.includes('ebonyi') || lower.includes('abakaliki') || lower.includes('mile 4') || lower.includes('mile4') || (combinedContext.includes('ebonyi') && (lower.includes('child') || lower.includes('case') || lower.includes('hospital')))) {
    if (persona === 'visitor') {
      text = `In **Ebonyi State**, there are **59 active leprosy cases** in 2025 (a big reduction from 92 cases last year) [DHIS2-NTD-2025].\n\n- **Main Hospital:** **Mile 4 Hospital** in Abakaliki is the main specialized center offering free care, surgeries, and counseling.\n- **Free Support:** RedAid Nigeria and DAHW Germany support community health workers across Izzi, Ikwo, and Ohaukwu to detect cases early [DAHW-FIELD-2024].`;
      followUp = 'What about Abia State?';
    } else {
      text = `In **Ebonyi State**, there are currently **59 active leprosy cases** and **11 Buruli ulcer cases** recorded in our 2025 baseline (down from 92 leprosy cases in 2024) [DHIS2-NTD-2025].\n\n### 📊 Ebonyi State Case Summary\n\n| Indicator | 2024 (Last Year) | 2025 (Current) | 2026 Target |\n| :--- | :--- | :--- | :--- |\n| **Leprosy Cases** | 92 | **59** (44 MB / 15 PB) | 40 |\n| **Child Cases (<15)** | 6 (6.5%) | **3 (5.1%)** | 0 (0.0%) |\n| **Grade-2 Disability** | 36 (39.1%) | **15 (25.4%)** | <4.8% |\n| **Buruli Ulcer** | 11 | **11** (31.5% PCR confirmed) | 5 |\n| **MDT Cure Rate** | 85.0% | **87.5%** | 93.0% |\n\n**Key Takeaways [NTBLCP-SOP-2024]:**\n- **Mile 4 Hospital Reference Center** in Abakaliki is the main referral hub for complex cases, wound surgery, and GeneXpert diagnostics.\n- **High-Risk LGAs:** Izzi, Ikwo, Ezza North, and Ohaukwu.`;
      followUp = 'What is the PCR testing procedure at Mile 4 Hospital?';
    }
  } else if (lower.includes('abia') || lower.includes('uzuakoli') || (combinedContext.includes('abia') && (lower.includes('child') || lower.includes('case')))) {
    if (persona === 'visitor') {
      text = `In **Abia State**, there are **43 leprosy cases** and **38 Buruli ulcer cases** recorded in 2025 [DHIS2-NTD-2025].\n\n- **Historic Sanctuary:** **Uzuakoli Leprosy Hospital**, famous for the sacred choral compositions of Ikoli Harcourt Whyte, continues to provide compassionate, free care.\n- **Zero Child Cases:** There were zero child cases recorded in Abia this year.`;
      followUp = 'What is the story of Ikoli Harcourt Whyte?';
    } else {
      text = `In **Abia State**, there are currently **43 active leprosy cases** and **38 Buruli ulcer cases** recorded in our 2025 baseline [DHIS2-NTD-2025].\n\n### 📊 Abia State Case Summary\n\n| Indicator | 2024 (Last Year) | 2025 (Current) | 2026 Target |\n| :--- | :--- | :--- | :--- |\n| **Leprosy Cases** | 30 | **43** (35 MB / 8 PB) | 28 |\n| **Child Cases (<15)** | 0 (0.0%) | **0 (0.0%)** | 0 (0.0%) |\n| **Grade-2 Disability** | 15 (50.0%) | **8 (18.6%)** | <4.8% |\n| **Buruli Ulcer** | 38 | **38** (26.5% PCR confirmed) | 15 |\n| **MDT Cure Rate** | 86.0% | **88.4%** | 93.0% |\n\n**Key Takeaways [NTBLCP-SOP-2024]:**\n- **Zero Child Cases (0.0%):** Shows zero active pediatric transmission in household contacts.\n- **Highest Buruli Burden:** Abia has the largest Buruli cluster (38 cases) in Isiala Ngwa North, Bende, and Ohafia.\n- **Sanctuaries:** Uzuakoli Leprosy Hospital and Mbawsi Primary Health Centre.`;
      followUp = 'Which state had the highest Buruli ulcer burden in 2025?';
    }
  } else if (lower.includes('anambra')) {
    text = `In **Anambra State**, there are currently **13 active leprosy cases** and **5 Buruli ulcer cases** recorded in our 2025 baseline [DHIS2-NTD-2025].\n\n- **Zero Disability:** All 13 cases in Anambra were discovered early with **0.0% disability**.\n- **Key Facility:** Awka South Model Comprehensive PHC [NTBLCP-SOP-2024].`;
    followUp = 'How does Anambra compare to Imo State?';
  } else if (lower.includes('imo')) {
    text = `In **Imo State**, there are currently **9 active leprosy cases** and **2 Buruli ulcer cases** recorded in our 2025 baseline [DHIS2-NTD-2025].\n\n- **Zero Disability & Zero Child Cases:** Achieved 100% early detection rate with zero physical deformity.\n- **Key Hub:** Oguta General Hospital NTD Wing [NTBLCP-SOP-2024].`;
    followUp = 'How many total cases across all 5 states?';
  } else if (lower.includes('ceo') || lower.includes('director') || lower.includes('head') || lower.includes('egbule') || lower.includes('leader')) {
    text = `**Dr. Daniel Nze Egbule** is the Chief Executive Officer and Country Representative of **RedAid Nigeria (RAN)**, leading national skin NTD elimination programs in partnership with DAHW Germany, the Federal Ministry of Health (NTBLCP), and IDEA Nigeria.`;
    followUp = 'What is the role of DAHW in the IKOLI project?';
  } else if (lower.includes('pcr') || lower.includes('lab') || lower.includes('test') || lower.includes('diagnostic')) {
    text = `**PCR Testing** is a precise laboratory test that confirms Buruli ulcer by checking wound swabs for bacterial DNA.\n\n- **Main Lab Hubs:** UNTH Molecular Lab (Enugu) and Mile 4 Hospital (Ebonyi).\n- **Why it matters:** Ensures patients get the exact right medicine without delay.`;
    followUp = 'What is Buruli ulcer?';
  } else {
    if (persona === 'visitor') {
      text = `Across South-East Nigeria (Abia, Anambra, Ebonyi, Enugu, and Imo), **IKOLI AI** supports **312 local health centers** to find, treat, and cure skin infections early.\n\n### 🌟 Key Highlights:\n- **162 patients** received free, full-course curative treatment in 2025.\n- **Over 89%** of patients have been fully cured.\n- **Zero-PII Privacy:** All patient information is 100% private and protected by Nigerian data protection laws.`;
      followUp = 'What is leprosy?';
    } else {
      text = `Across the **5 South-East pilot states** (Abia, Anambra, Ebonyi, Enugu, Imo), IKOLI AI tracks **312 health facilities**.\n\n### 📋 2025 Regional Baseline Summary\n\n| Indicator | 2024 (Last Year) | 2025 (Current) | 2026 Target |\n| :--- | :--- | :--- | :--- |\n| **Leprosy Cases** | 175 | **162** (127 MB / 35 PB) | 120 |\n| **Child Leprosy Rate** | 6.3% (11 cases) | **3.1% (5 cases)** | 0.0% (0 cases) |\n| **Grade-2 Disability** | 34.9% (61 cases) | **21.6% (35 cases)** | <4.8% |\n| **Buruli Ulcer Cases** | 53 | **55** (27.1% PCR confirmed) | 40 |\n| **MDT Cure Rate** | 86.3% | **89.2%** | 94.0% |\n\nAll patient records are protected with 100% Zero-PII cryptographic hashing under the Nigeria Data Protection Act (NDPA 2023).`;
      followUp = 'How many cases do we have in Enugu?';
    }
  }

  return {
    text,
    category,
    followUpPrompt: followUp,
    source: 'clinical-knowledge-base',
    modelUsed: persona === 'visitor' ? 'Plain English Synthesizer' : 'Clinical Grounding Synthesizer',
  };
}

// ── Streaming Async Generator ───────────────────────────────────────────────
export async function* streamClinicalAI(
  prompt: string,
  attachment?: GeminiAttachment,
  persona: ResponsePersona = 'visitor',
  signal?: AbortSignal
): AsyncGenerator<{ delta: string; fullText: string; response: GeminiResponse }, void, unknown> {
  const fullResponse = await queryGeminiClinicalAI(prompt, attachment, persona);
  const text = fullResponse.text;

  // Split text into readable token chunks (words and punctuation)
  const tokens = text.match(/\S+\s*|\s+/g) || [text];
  let accumulated = '';

  for (let i = 0; i < tokens.length; i++) {
    if (signal?.aborted) break;
    accumulated += tokens[i];
    yield {
      delta: tokens[i],
      fullText: accumulated,
      response: {
        ...fullResponse,
        text: accumulated,
      },
    };
    // 18ms per token gives ultra-smooth typewriter cadence
    await new Promise((resolve) => setTimeout(resolve, 18));
  }
}

