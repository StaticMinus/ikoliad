// Vercel Serverless Function: Secure OpenRouter & Gemini AI Gateway for IKOLI AI with Persona Support

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, model, attachment, history, persona = 'visitor' } = req.body || {};

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const openRouterApiKey = process.env.OPENROUTER_API_KEY || process.env.VITE_OPENROUTER_API_KEY;

    const personaTones = {
      visitor: `
TONE & AUDIENCE: Plain English / Public & Visitor Mode (DEFAULT).
- Speak in warm, empathetic, simple everyday English that anyone (patients, families, students, community members) can easily understand.
- AVOID heavy medical jargon, complicated drug tables, or clinical abbreviations.
- Focus on destigmatization, reassuring facts, how easy it is to cure, and that all medicines are 100% FREE from the government and RedAid Nigeria.
- When asked "What is leprosy?", explain simply: it is a curable germ infection of the skin and nerves, not a curse, hard to catch, and completely treated with free pills.
- When asked "What is Grade-2 disability?", explain that it means physical deformities from discovering the disease late, but early detection prevents 100% of deformities.`,

      executive: `
TONE & AUDIENCE: Executive & Donor Briefing Mode.
- Speak in strategic, high-level policy and executive language suitable for WHO representatives, health commissioners, and international donor partners (DAHW Germany, Global Fund).
- Emphasize funding efficiency, national elimination trajectories (WHO 2030 roadmap), regional surveillance data, public health ROI, and policy gaps.`,

      clinical: `
TONE & AUDIENCE: Clinical Specialist Mode.
- Speak in precise medical and diagnostic terminology for doctors, dermatologists, and frontline health workers.
- Reference NTBLCP guidelines, WHO MDT blister pack dosages (Dapsone, Rifampicin, Clofazimine), PB vs MB classification, sensory mapping, and IS2404 qPCR laboratory testing protocols.`,

      analyst: `
TONE & AUDIENCE: Data Analyst & Surveillance Mode.
- Speak in crisp, analytical, data-focused language for MEAL officers and epidemiologists.
- Provide clean markdown tables, state-by-state statistical breakdowns (Enugu, Ebonyi, Abia, Anambra, Imo), 2024 vs 2025 deltas, and laboratory diagnostic splits.`,
    };

    // Strict simplified prompt system instruction with safety guardrails
    const systemPrompt = `You are "Ask Ikoli – Conversational Health & Programme Information Assistant", developed under the IKOLI-AI Demonstrator (v0.1) by RedAid Nigeria (RAN), DAHW Germany, Digital Dreams, NTBLCP / Federal Ministry of Health, VRC-UNN, and IDEA Nigeria.

${personaTones[persona] || personaTones.visitor}

CRITICAL SAFETY & RESPONSIBLE AI GUARDRAILS (EDCTP3 DEMONSTRATOR):
1. You are an educational, health information, and programme surveillance assistant. You are NOT an autonomous clinical diagnostic tool or prescribing engine.
2. NEVER diagnose individual patient lesions, NEVER prescribe individual medications, and NEVER decide individual SDR-PEP eligibility.
3. If a user asks "Do I have leprosy?", "What drug should I take?", "Diagnose this skin lesion", "Am I eligible for SDR-PEP?", "Prescribe medicine", or asks for a diagnostic verdict:
   - Provide a clear medical safety advisory stating you cannot diagnose or prescribe.
   - Explain approved general health information and symptoms.
   - Direct the user to their nearest designated Primary Health Centre or specialist referral hospital (Oji River Specialist Hospital in Enugu, Mile 4 Hospital in Abakaliki, Uzuakoli Leprosy Hospital in Abia, Awka South PHC in Anambra, Oguta General Hospital in Imo) for in-person evaluation by a qualified health officer.
   - Note that all consultation, diagnostics, and WHO Multi-Drug Therapy (MDT) in Nigeria are 100% FREE under NTBLCP protocols.

STRICT ANSWERING RULES:
1. ALWAYS answer the specific question directly in the very FIRST sentence.
2. NEVER output generic headings like "Differential Clinical Synthesis", "Clinical Reasoning Synthesis for...", or long disclaimers.
3. Keep all responses brief, clean, and directly tailored to the selected persona.

OFFICIAL DATASET:
- SOUTH-EAST 5 STATES (312 health centers):
  * 2024: 175 Leprosy (11 Child, 61 G2D = 34.9%), 53 Buruli (2.7% PCR), 86.3% Cure Rate
  * 2025: 162 Leprosy (127 MB, 35 PB, 5 Child = 3.1%, 35 G2D = 21.6%), 55 Buruli (27.1% PCR confirmed), 42 Yaws, 89.2% Cure Rate
  * 2026 Target: 120 Leprosy (0 Child, G2D <4.8%), 40 Buruli (>78.5% PCR), 94.0% Cure Rate

- ENUGU STATE: 2024: 44 Leprosy (5 Child, 9 G2D), 0 Buruli. 2025: 38 Leprosy (26 MB, 12 PB, 2 Child, 12 G2D = 31.6%), 2 Buruli (35% PCR). Centers: Oji River Hospital, UNTH Molecular Lab.
- EBONYI STATE: 2024: 92 Leprosy (6 Child, 36 G2D), 11 Buruli. 2025: 59 Leprosy (44 MB, 15 PB, 3 Child, 15 G2D = 25.4%), 11 Buruli (31.5% PCR). Center: Mile 4 Hospital Abakaliki.
- ABIA STATE: 2024: 30 Leprosy (0 Child, 15 G2D), 38 Buruli. 2025: 43 Leprosy (35 MB, 8 PB, 0 Child, 8 G2D = 18.6%), 38 Buruli (26.5% PCR). Centers: Uzuakoli Hospital, Mbawsi PHC.
- ANAMBRA STATE: 2024: 4 Leprosy, 2 Buruli. 2025: 13 Leprosy (13 MB, 0 Child, 0 G2D = 0.0%), 5 Buruli (28% PCR). Center: Awka South Comprehensive PHC.
- IMO STATE: 2024: 5 Leprosy, 2 Buruli. 2025: 9 Leprosy (9 MB, 0 Child, 0 G2D = 0.0%), 2 Buruli (25% PCR). Center: Oguta General Hospital NTD Wing.
- CEO of RedAid Nigeria: Dr. Daniel Nze Egbule.`;

    // 1. Try OpenRouter if API key is configured
    if (openRouterApiKey) {
      try {
        const userContent = [];
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
        userContent.push({ type: 'text', text: prompt });

        const selectedModel = model || 'openai/gpt-4o-mini';
        const formattedHistory = Array.isArray(history)
          ? history.map((h) => ({
              role: h.role === 'user' ? 'user' : 'assistant',
              content: typeof h.content === 'string' ? h.content : JSON.stringify(h.content),
            }))
          : [];

        const openRouterResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openRouterApiKey}`,
            'HTTP-Referer': 'https://ikoli-ai.vercel.app',
            'X-Title': 'IKOLI-AI Demonstrator v0.1 Gateway',
          },
          body: JSON.stringify({
            model: selectedModel,
            messages: [
              { role: 'system', content: systemPrompt },
              ...formattedHistory,
              { role: 'user', content: userContent },
            ],
            temperature: 0.2,
            max_tokens: 800,
          }),
        });

        if (openRouterResponse.ok) {
          const data = await openRouterResponse.json();
          const content = data.choices?.[0]?.message?.content;
          if (content) {
            return res.status(200).json({
              content,
              model: selectedModel,
              provider: 'openrouter',
            });
          }
        }
      } catch (err) {
        console.warn('OpenRouter API call error:', err);
      }
    }

    // 2. Exact Grounded Fallback Synthesizer with Persona Awareness
    const lower = prompt.toLowerCase();
    let directAnswer = '';

    // Safety Interceptor
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
      directAnswer = `⚠️ **Medical Safety & Triage Notice**\n\n**Ask Ikoli is a conversational health and programme information assistant, not a clinical diagnostic or prescribing tool.** I cannot provide an individual medical diagnosis, prescribe drugs, or determine individual patient eligibility for SDR-PEP.\n\n### 📍 Recommended Next Step:\nPlease visit your nearest designated **Primary Health Centre** or specialist referral hospital for an in-person examination by a qualified health officer:\n- **Oji River Specialist Leprosy Hospital** (Enugu)\n- **Mile 4 Hospital Reference Center** (Abakaliki, Ebonyi)\n- **Uzuakoli Leprosy Hospital** (Abia)\n- **Awka South Model Comprehensive PHC** (Anambra)\n- **Oguta General Hospital NTD Wing** (Imo)\n\n*All consultations, laboratory tests, and WHO Multi-Drug Therapy (MDT) blister packs across Nigeria are 100% free of charge under NTBLCP national protocols.*`;
      return res.status(200).json({
        content: directAnswer,
        model: 'ikoli-safety-guardrail',
        provider: 'local-evidence-engine',
      });
    }

    if (lower.includes('disability') || lower.includes('grade 2') || lower.includes('grade-2') || lower.includes('g2d') || lower.includes('deformity') || lower.includes('grade1') || lower.includes('grade 1') || lower.includes('grade 0')) {
      if (persona === 'visitor') {
        directAnswer = `**Grade-2 Disability** simply means visible physical changes or damage—like curled fingers, foot weakness, or eye trouble—that happen when leprosy is diagnosed late.\n\n### 💡 Key Things Everyone Should Know:\n- **It is completely preventable:** When leprosy is discovered early, it causes **zero disability** and leaves no permanent marks.\n- **How damage happens:** The bacteria cause numbness, so people can't feel minor burns or cuts, which can lead to sores if not treated.\n- **Why we track it:** Across South-East Nigeria, **21.6% of patients in 2025** had some physical deformity when they first arrived because they waited too long. Our goal is to test people early so **nobody ever develops a disability**.\n- **Treatment is free:** All medicine and protective footwear are provided free of charge by RedAid Nigeria.`;
      } else {
        directAnswer = `**Grade-2 Disability (G2D)** refers to visible, permanent physical damage caused by leprosy or Buruli ulcer when the disease is detected too late.\n\n### 🩺 WHO Disability Grading Scale\n\n| Grade | Eyes | Hands & Feet | Clinical Meaning |\n| :--- | :--- | :--- | :--- |\n| **Grade 0** | Normal vision | Normal sensation, no visible deformity | Early detection success |\n| **Grade 1** | Mild blurring without lagophthalmos | Loss of sensation (numbness) only; no visible deformity | High risk of unnoticed injuries |\n| **Grade 2** | Severe vision loss / lagophthalmos (unable to close eyes) | Visible physical deformity (claw hand, foot drop, shortened fingers/toes, deep ulcers) | **Permanent nerve/tissue damage (Delayed Diagnosis)** |\n\n**Why G2D is a critical indicator:**\n- When a newly diagnosed patient already has Grade-2 disability, it means the infection was spreading undetected for **2 to 5 years**.\n- Across our 5 South-East states in 2025, **21.6% (35 patients)** had Grade-2 disability at diagnosis (down from 34.9% in 2024).\n- **Target:** Reduce new Grade-2 Disability cases to **<4.8% by 2026** through proactive community screening.`;
      }
    } else if (lower.includes('what is leprosy') || lower.includes('what is hansen') || lower.includes('explain leprosy') || lower.includes('tell me about leprosy') || lower === 'leprosy') {
      if (persona === 'visitor') {
        directAnswer = `**Leprosy** (also called Hansen's disease) is a simple, curable infection caused by a slow-growing germ that affects the skin and nerves.\n\n### 🌟 4 Important Facts to Remember:\n1. **It is 100% curable:** A combination of standard antibiotic pills completely kills the bacteria.\n2. **All medicine is completely FREE:** Provided at no cost across health facilities in Nigeria by the government and RedAid Nigeria.\n3. **It is NOT easily spread:** You cannot catch it from shaking hands, sharing food, or sitting next to someone. Over 95% of all adults have natural immunity.\n4. **Early Warning Sign:** A pale or reddish patch on the skin that has **lost feeling** (cannot feel a light touch or heat).\n\nIf you or someone you know has a numb patch, visit the nearest health centre for free treatment.`;
      } else {
        directAnswer = `**Leprosy** (also known as **Hansen's Disease**) is a curable, chronic infectious disease caused by the slow-growing bacterium *Mycobacterium leprae*.\n\n### 🩺 Key Facts & Clinical Features\n- **What it affects:** Mainly attacks the **skin** (discolored patches) and **peripheral nerves** (causing numbness, muscle weakness, and loss of feeling in hands, feet, and eyes).\n- **Hallmark Symptom:** A pale or reddish skin patch that has **lost feeling** (cannot feel a light cotton touch, pinprick, or heat).\n- **How it spreads:** Spread through airborne droplets from untreated patients during prolonged close contact over months. It is **not highly infectious** and cannot spread by shaking hands or casual contact.\n- **Is it curable?** **Yes, 100% curable** with standard WHO Multi-Drug Therapy (MDT) blister packs, provided completely free of charge.\n\n### 💊 Treatment Regimens (NTBLCP Guidelines)\n1. **Paucibacillary (PB) (1–5 skin patches):** **6-Month WHO MDT** (daily Dapsone + supervised monthly Rifampicin).\n2. **Multibacillary (MB) (>5 skin patches or nerve involvement):** **12-Month WHO MDT** (daily Dapsone + daily Clofazimine + monthly Rifampicin & Clofazimine).`;
      }
    } else if (lower.includes('what is buruli') || lower.includes('explain buruli') || lower.includes('buruli ulcer') || lower === 'buruli') {
      directAnswer = `**Buruli Ulcer** is a curable bacterial skin infection that starts as a painless swelling or firm bump under the skin, which can break open into an ulcer if untreated.\n\n### 💡 What You Need to Know:\n- **It is caused by environmental bacteria** found near slow-flowing water and wetlands.\n- **It is not spread from person to person.**\n- **Treatment is simple and free:** 8 weeks of daily oral antibiotic tablets completely cures it.\n- **Main rule:** Never cut or apply harsh chemicals to a skin swelling—get it checked early at a clinic for free treatment.`;
    } else if (lower.includes('what is yaws') || lower.includes('yaws')) {
      directAnswer = `**Yaws** is a skin infection that mainly affects children living in warm, rural communities. It causes small raspberry-like bumps or sores on the skin.\n\n- **It is easily cured:** A **single dose of an antibiotic tablet (Azithromycin)** completely clears the infection.\n- **Free care:** Treatment is provided free by health workers during community school outreach visits.`;
    } else if (lower.includes('sdr') || lower.includes('pep') || lower.includes('prophylaxis') || lower.includes('prevention')) {
      directAnswer = `**Preventive Medicine (SDR-PEP)** is a single dose of antibiotic pills given to family members and neighbors of someone diagnosed with leprosy.\n\n- **Why it is given:** It protects contacts and stops the bacteria before it can ever start.\n- **Effectiveness:** Reduces the chance of catching leprosy by up to **60%**.\n- **Safety:** It is very safe, takes just one pill, and is completely free.`;
    } else if (lower.includes('child') || lower.includes('pediatric') || lower.includes('transmission')) {
      directAnswer = `In **2025**, there are **5 child leprosy cases** recorded across the 5 pilot states (down from 11 cases in 2024).\n\n### 👶 Child Leprosy Cases by State (2025)\n\n| State | Total Leprosy Cases | Child Cases (<15) | Child Rate (%) |\n| :--- | :--- | :--- | :--- |\n| **Ebonyi** | 59 | **3** | **5.1%** |\n| **Enugu** | 38 | **2** | **5.3%** |\n| **Abia** | 43 | **0** | **0.0%** |\n| **Anambra** | 13 | **0** | **0.0%** |\n| **Imo** | 9 | **0** | **0.0%** |\n| **5-State Total** | **162** | **5** | **3.1%** |\n\n**Why this matters:** When a child gets leprosy, it proves active household transmission. Nigeria is deploying Single-Dose Rifampicin (SDR-PEP) preventive medicine to families to stop transmission.`;
    } else if (lower.includes('treatment') || lower.includes('mdt') || lower.includes('blister') || lower.includes('pb') || lower.includes('mb')) {
      directAnswer = `**Leprosy Treatment Protocols (WHO / NTBLCP Guidelines):**\n\n- **Paucibacillary (PB) (1–5 skin patches):**\n  * **Regimen:** **6-Month WHO MDT Blister Pack** (daily Dapsone 100mg + supervised monthly Rifampicin 600mg).\n\n- **Multibacillary (MB) (>5 skin patches or nerve enlargement):**\n  * **Regimen:** **12-Month WHO MDT Blister Pack** (daily Dapsone 100mg + daily Clofazimine 50mg + supervised monthly Rifampicin 600mg & Clofazimine 300mg).\n\n- **Buruli Ulcer Regimen:** 8 weeks of daily oral **Rifampicin (10 mg/kg) + Clarithromycin (7.5 mg/kg)**.`;
    } else if (lower.includes('enugu')) {
      if (persona === 'visitor') {
        directAnswer = `In **Enugu State**, there are **38 recorded leprosy cases** in 2025 (down from 44 cases in 2024).\n\n- **Child cases:** Only **2 cases** were found in children this year, showing that transmission is slowing down.\n- **Where to get help:** Patients receive free medicine and care at **Oji River Specialist Leprosy Hospital** and the **UNTH Medical Centre**.\n- **Remember:** All consultation and medications are 100% free of charge.`;
      } else {
        directAnswer = `In **Enugu State**, there are currently **38 active leprosy cases** and **2 Buruli ulcer cases** recorded in our 2025 working baseline (down from 44 leprosy cases in 2024).\n\n### 📊 Enugu State Case Summary\n\n| Indicator | 2024 (Last Year) | 2025 (Current) | 2026 Target |\n| :--- | :--- | :--- | :--- |\n| **Leprosy Cases** | 44 | **38** (26 MB / 12 PB) | 25 |\n| **Child Cases (<15)** | 5 (11.4%) | **2 (5.3%)** | 0 (0.0%) |\n| **Grade-2 Disability** | 9 (20.5%) | **12 (31.6%)** | <4.8% |\n| **Buruli Ulcer** | 0 | **2** (35% PCR confirmed) | 0 |\n| **MDT Cure Rate** | 88.2% | **91.4%** | 95.0% |\n\n**Key Takeaways:**\n- **Child cases dropped from 5 to 2**, showing that active household transmission is reducing.\n- **Key Centers:** Oji River Specialist Leprosy Hospital and UNTH Molecular Lab Hub (Ituku-Ozalla).`;
      }
    } else if (lower.includes('ebonyi') || lower.includes('abakaliki') || lower.includes('mile 4') || lower.includes('mile4')) {
      directAnswer = `In **Ebonyi State**, there are currently **59 active leprosy cases** and **11 Buruli ulcer cases** recorded in our 2025 baseline (down from 92 leprosy cases in 2024).\n\n### 📊 Ebonyi State Case Summary\n\n| Indicator | 2024 (Last Year) | 2025 (Current) | 2026 Target |\n| :--- | :--- | :--- | :--- |\n| **Leprosy Cases** | 92 | **59** (44 MB / 15 PB) | 40 |\n| **Child Cases (<15)** | 6 (6.5%) | **3 (5.1%)** | 0 (0.0%) |\n| **Grade-2 Disability** | 36 (39.1%) | **15 (25.4%)** | <4.8% |\n| **Buruli Ulcer** | 11 | **11** (31.5% PCR confirmed) | 5 |\n| **MDT Cure Rate** | 85.0% | **87.5%** | 93.0% |\n\n**Key Takeaways:**\n- **Mile 4 Hospital Reference Center** in Abakaliki is the main referral hub for complex cases, wound surgery, and GeneXpert diagnostics.\n- **High-Risk LGAs:** Izzi, Ikwo, Ezza North, and Ohaukwu.`;
    } else if (lower.includes('abia') || lower.includes('uzuakoli')) {
      directAnswer = `In **Abia State**, there are currently **43 active leprosy cases** and **38 Buruli ulcer cases** recorded in our 2025 baseline.\n\n### 📊 Abia State Case Summary\n\n| Indicator | 2024 (Last Year) | 2025 (Current) | 2026 Target |\n| :--- | :--- | :--- | :--- |\n| **Leprosy Cases** | 30 | **43** (35 MB / 8 PB) | 28 |\n| **Child Cases (<15)** | 0 (0.0%) | **0 (0.0%)** | 0 (0.0%) |\n| **Grade-2 Disability** | 15 (50.0%) | **8 (18.6%)** | <4.8% |\n| **Buruli Ulcer** | 38 | **38** (26.5% PCR confirmed) | 15 |\n| **MDT Cure Rate** | 86.0% | **88.4%** | 93.0% |\n\n**Key Takeaways:**\n- **Zero Child Cases (0.0%):** Shows zero active pediatric transmission in household contacts.\n- **Highest Buruli Burden:** Abia has the largest Buruli cluster (38 cases) in Isiala Ngwa North, Bende, and Ohafia.\n- **Sanctuaries:** Uzuakoli Leprosy Hospital and Mbawsi Primary Health Centre.`;
    } else if (lower.includes('anambra')) {
      directAnswer = `In **Anambra State**, there are currently **13 active leprosy cases** and **5 Buruli ulcer cases** recorded in our 2025 baseline.\n\n### 📊 Anambra State Case Summary\n\n| Indicator | 2024 (Last Year) | 2025 (Current) | 2026 Target |\n| :--- | :--- | :--- | :--- |\n| **Leprosy Cases** | 4 | **13** (all 13 MB) | 8 |\n| **Child Cases (<15)** | 0 (0.0%) | **0 (0.0%)** | 0 (0.0%) |\n| **Grade-2 Disability** | 1 (25.0%) | **0 (0.0%)** | 0.0% |\n| **Buruli Ulcer** | 2 | **5** (28.0% PCR confirmed) | 1 |\n| **MDT Cure Rate** | 88.9% | **90.1%** | 96.0% |\n\n**Key Takeaways:**\n- **0.0% Disability Rate in 2025:** All 13 cases were diagnosed early with zero physical deformity.\n- **Primary Center:** Awka South Model Comprehensive PHC.`;
    } else if (lower.includes('imo')) {
      directAnswer = `In **Imo State**, there are currently **9 active leprosy cases** and **2 Buruli ulcer cases** recorded in our 2025 baseline.\n\n### 📊 Imo State Case Summary\n\n| Indicator | 2024 (Last Year) | 2025 (Current) | 2026 Target |\n| :--- | :--- | :--- | :--- |\n| **Leprosy Cases** | 5 | **9** (all 9 MB) | 4 |\n| **Child Cases (<15)** | 0 (0.0%) | **0 (0.0%)** | 0 (0.0%) |\n| **Grade-2 Disability** | 0 (0.0%) | **0 (0.0%)** | 0.0% |\n| **Buruli Ulcer** | 2 | **2** (25.0% PCR confirmed) | 0 |\n| **MDT Cure Rate** | 87.8% | **89.0%** | 95.0% |\n\n**Key Takeaways:**\n- **Maintained 0.0% Disability & 0.0% Child Cases.**\n- **Primary Hub:** Oguta General Hospital NTD Wing.`;
    } else if (lower.includes('ceo') || lower.includes('egbule') || lower.includes('head') || lower.includes('director')) {
      directAnswer = `**Dr. Daniel Nze Egbule** is the Chief Executive Officer and Country Representative of **RedAid Nigeria (RAN)**, leading national skin NTD elimination programs in partnership with DAHW Germany, NTBLCP, and IDEA Nigeria.`;
    } else if (lower.includes('pcr') || lower.includes('lab') || lower.includes('test')) {
      directAnswer = `**What is PCR testing?**\n\n**PCR (Polymerase Chain Reaction)** is a laboratory test that detects the DNA of the *Mycobacterium ulcerans* bacteria from a wound swab. It is the WHO gold standard for confirming Buruli ulcer.\n\n### 🔬 2025 Laboratory Diagnostic Split\n\n| Diagnostic Method | 2025 Cases | Proportion (%) | Role |\n| :--- | :--- | :--- | :--- |\n| **IS2404 Real-Time qPCR** | **55** | **27.1%** | Gold standard molecular confirmation (Target >70%) |\n| **Clinical Staging** | **108** | **53.2%** | Bedside physical measurement by field health officers |\n| **ZN Smear Microscopy** | **40** | **19.7%** | Light microscopy acid-fast staining at district labs |\n\n**Reference Hubs:** UNTH Molecular Lab Hub (Enugu) and Mile 4 Hospital (Ebonyi).`;
    } else {
      directAnswer = `Across South-East Nigeria (Abia, Anambra, Ebonyi, Enugu, and Imo), **IKOLI AI** supports **312 local health centers** to find, treat, and cure skin infections early.\n\n### 🌟 Key Highlights:\n- **162 patients** received free, full-course curative treatment in 2025.\n- **Over 89%** of patients have been fully cured.\n- **Zero-PII Privacy:** All patient information is 100% private and protected by Nigerian data protection laws.`;
    }

    return res.status(200).json({
      content: directAnswer,
      model: 'ikoli-persona-synthesizer',
      provider: 'local-evidence-engine',
    });
  } catch (error) {
    console.error('Server proxy error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
