// Vercel Serverless Function: Secure OpenRouter & Gemini AI Gateway for IKOLI AI

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
    const { prompt, model, attachment } = req.body || {};

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const openRouterApiKey = process.env.OPENROUTER_API_KEY || process.env.VITE_OPENROUTER_API_KEY;

    // Strict simplified prompt system instruction
    const systemPrompt = `You are IKOLI AI, the national skin NTD clinical decision support and epidemiological intelligence assistant developed by RedAid Nigeria (RAN), DAHW Germany, Digital Dreams, NTBLCP / Federal Ministry of Health, VRC-UNN, and IDEA Nigeria.

STRICT ANSWERING RULES:
1. ALWAYS answer the specific question directly in the very FIRST sentence in plain, simple English.
2. NEVER output generic headings like "Differential Clinical Synthesis", "Clinical Reasoning Synthesis for...", or long disclaimers.
3. If asked about state cases (e.g. "how many cases do we have in Enugu?"), state the exact numbers immediately, include a clean markdown table showing 2024 vs 2025 vs 2026 Target, and give 2 brief bullet points explaining the key facts.
4. Keep all responses brief, clean, and easy for frontline workers, nurses, and donors to read on mobile.

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
- CEO of RedAid Nigeria: Dr. Daniel Nze Egbule.
- Leprosy Treatment: PB (1–5 patches) = 6-month MDT pack; MB (>5 patches or nerve enlargement) = 12-month MDT pack.
- Buruli Treatment: 8 weeks oral Rifampicin + Clarithromycin + IS2404 qPCR test.`;

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

        const openRouterResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openRouterApiKey}`,
            'HTTP-Referer': 'https://ikoli-ai.vercel.app',
            'X-Title': 'IKOLI AI Clinical Intelligence Gateway',
          },
          body: JSON.stringify({
            model: selectedModel,
            messages: [
              { role: 'system', content: systemPrompt },
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

    // 2. Exact Grounded Fallback Synthesizer
    const lower = prompt.toLowerCase();
    let directAnswer = '';

    if (lower.includes('disability') || lower.includes('grade 2') || lower.includes('grade-2') || lower.includes('g2d') || lower.includes('deformity') || lower.includes('grade1') || lower.includes('grade 1') || lower.includes('grade 0')) {
      directAnswer = `**Grade-2 Disability (G2D)** refers to visible, permanent physical damage caused by leprosy or Buruli ulcer when the disease is detected too late.\n\n### 🩺 WHO Disability Grading Scale\n\n| Grade | Eyes | Hands & Feet | Clinical Meaning |\n| :--- | :--- | :--- | :--- |\n| **Grade 0** | Normal vision | Normal sensation, no visible deformity | Early detection success |\n| **Grade 1** | Mild blurring without lagophthalmos | Loss of sensation (numbness) only; no visible deformity | High risk of unnoticed injuries |\n| **Grade 2** | Severe vision loss / lagophthalmos (unable to close eyes) | Visible physical deformity (claw hand, foot drop, shortened fingers/toes, deep ulcers) | **Permanent nerve/tissue damage (Delayed Diagnosis)** |\n\n**Why G2D is a critical indicator:**\n- When a newly diagnosed patient already has Grade-2 disability, it means the infection was spreading undetected for **2 to 5 years**.\n- Across our 5 South-East states in 2025, **21.6% (35 patients)** had Grade-2 disability at diagnosis (down from 34.9% in 2024).\n- **Target:** Reduce new Grade-2 Disability cases to **<4.8% by 2026** through proactive community screening.`;
    } else if (lower.includes('what is leprosy') || lower.includes('what is hansen') || lower.includes('explain leprosy') || lower.includes('tell me about leprosy') || lower === 'leprosy') {
      directAnswer = `**Leprosy** (also known as **Hansen's Disease**) is a curable, chronic infectious disease caused by the slow-growing bacterium *Mycobacterium leprae*.\n\n### 🩺 Key Facts & Clinical Features\n- **What it affects:** Mainly attacks the **skin** (discolored patches) and **peripheral nerves** (causing numbness, muscle weakness, and loss of feeling in hands, feet, and eyes).\n- **Hallmark Symptom:** A pale or reddish skin patch that has **lost feeling** (cannot feel a light cotton touch, pinprick, or heat).\n- **How it spreads:** Spread through airborne droplets from untreated patients during prolonged close contact over months. It is **not highly infectious** and cannot spread by shaking hands or casual contact.\n- **Is it curable?** **Yes, 100% curable** with standard WHO Multi-Drug Therapy (MDT) blister packs, provided completely free of charge.\n\n### 💊 Treatment Regimens (NTBLCP Guidelines)\n1. **Paucibacillary (PB) (1–5 skin patches):** **6-Month WHO MDT** (daily Dapsone + supervised monthly Rifampicin).\n2. **Multibacillary (MB) (>5 skin patches or nerve involvement):** **12-Month WHO MDT** (daily Dapsone + daily Clofazimine + monthly Rifampicin & Clofazimine).`;
    } else if (lower.includes('what is buruli') || lower.includes('explain buruli') || lower.includes('buruli ulcer') || lower === 'buruli') {
      directAnswer = `**Buruli Ulcer** is a neglected tropical skin disease caused by the environmental bacterium *Mycobacterium ulcerans*. It produces a unique lipid toxin called **mycolactone**, which destroys skin cells, soft tissue, and local nerve endings.\n\n### 🩺 Clinical Staging & Symptoms\n- **Category I (<5 cm):** Early painless nodule, firm plaque, or localized swelling.\n- **Category II (5–15 cm):** Edematous swelling or deep ulcer with undermined borders.\n- **Category III (>15 cm or critical site):** Large extensive ulcer or lesions near the eyes, face, or major joints.\n\n### 🔬 Diagnosis & Treatment\n- **Laboratory Test:** Confirmed by **IS2404 Real-Time qPCR** molecular DNA testing at UNTH Enugu or Mile 4 Hospital Abakaliki.\n- **Medication:** 8 weeks of daily oral **Rifampicin (10 mg/kg) + Clarithromycin (7.5 mg/kg)** plus daily sterile dressing.`;
    } else if (lower.includes('what is yaws') || lower.includes('yaws')) {
      directAnswer = `**Yaws** is a contagious, non-venereal skin and bone infection caused by the spirochete bacterium *Treponema pallidum pertenue*, primarily affecting children living in humid rural tropical areas.\n\n### 🩺 Key Facts & Treatment\n- **Symptoms:** Starts with a single raised skin papule ("mother yaw"), followed weeks later by multiple yellow-crusted skin lesions or bone and joint pain.\n- **Treatment:** A single oral dose of **Azithromycin** (30 mg/kg, maximum 2g).\n- **2025 Baseline:** 42 confirmed cases across South-East Nigeria.`;
    } else if (lower.includes('sdr') || lower.includes('pep') || lower.includes('prophylaxis') || lower.includes('prevention')) {
      directAnswer = `**SDR-PEP (Single-Dose Rifampicin Post-Exposure Prophylaxis)** is a preventive antibiotic regimen given to family members, neighbors, and social contacts of a newly diagnosed leprosy patient.\n\n### 🛡️ Why SDR-PEP is Vital\n- **Reduces Risk:** A single dose of oral Rifampicin reduces the recipient's risk of catching leprosy by up to **60%**.\n- **Halts Spread:** Essential for stopping transmission in communities where child cases have been found (such as Ebonyi and Enugu).\n- **WHO Target:** Universal SDR-PEP coverage for all registered household contacts to achieve zero transmission by 2030.`;
    } else if (lower.includes('child') || lower.includes('pediatric') || lower.includes('transmission')) {
      directAnswer = `In **2025**, there are **5 child leprosy cases** recorded across the 5 pilot states (down from 11 cases in 2024).\n\n### 👶 Child Leprosy Cases by State (2025)\n\n| State | Total Leprosy Cases | Child Cases (<15) | Child Rate (%) |\n| :--- | :--- | :--- | :--- |\n| **Ebonyi** | 59 | **3** | **5.1%** |\n| **Enugu** | 38 | **2** | **5.3%** |\n| **Abia** | 43 | **0** | **0.0%** |\n| **Anambra** | 13 | **0** | **0.0%** |\n| **Imo** | 9 | **0** | **0.0%** |\n| **5-State Total** | **162** | **5** | **3.1%** |\n\n**Why this matters:** When a child gets leprosy, it proves active household transmission. Nigeria is deploying Single-Dose Rifampicin (SDR-PEP) preventive medicine to families to stop transmission.`;
    } else if (lower.includes('treatment') || lower.includes('mdt') || lower.includes('blister') || lower.includes('pb') || lower.includes('mb')) {
      directAnswer = `**Leprosy Treatment Protocols (WHO / NTBLCP Guidelines):**\n\n- **Paucibacillary (PB) (1–5 skin patches):**\n  * **Regimen:** **6-Month WHO MDT Blister Pack** (daily Dapsone 100mg + supervised monthly Rifampicin 600mg).\n\n- **Multibacillary (MB) (>5 skin patches or nerve enlargement):**\n  * **Regimen:** **12-Month WHO MDT Blister Pack** (daily Dapsone 100mg + daily Clofazimine 50mg + supervised monthly Rifampicin 600mg & Clofazimine 300mg).\n\n- **Buruli Ulcer Regimen:** 8 weeks of daily oral **Rifampicin (10 mg/kg) + Clarithromycin (7.5 mg/kg)**.`;
    } else if (lower.includes('enugu')) {
      directAnswer = `In **Enugu State**, there are currently **38 active leprosy cases** and **2 Buruli ulcer cases** recorded in our 2025 working baseline (down from 44 leprosy cases in 2024).\n\n### 📊 Enugu State Case Summary\n\n| Indicator | 2024 (Last Year) | 2025 (Current) | 2026 Target |\n| :--- | :--- | :--- | :--- |\n| **Leprosy Cases** | 44 | **38** (26 MB / 12 PB) | 25 |\n| **Child Cases (<15)** | 5 (11.4%) | **2 (5.3%)** | 0 (0.0%) |\n| **Grade-2 Disability** | 9 (20.5%) | **12 (31.6%)** | <4.8% |\n| **Buruli Ulcer** | 0 | **2** (35% PCR confirmed) | 0 |\n| **MDT Cure Rate** | 88.2% | **91.4%** | 95.0% |\n\n**Key Takeaways:**\n- **Child cases dropped from 5 to 2**, showing that active household transmission is reducing.\n- **Key Centers:** Oji River Specialist Leprosy Hospital and UNTH Molecular Lab Hub (Ituku-Ozalla).`;
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
      directAnswer = `Across the **5 South-East pilot states** (Abia, Anambra, Ebonyi, Enugu, Imo), IKOLI AI tracks **312 health facilities**.\n\n### 📋 2025 Regional Baseline Summary\n\n| Indicator | 2024 (Last Year) | 2025 (Current) | 2026 Target |\n| :--- | :--- | :--- | :--- |\n| **Leprosy Cases** | 175 | **162** (127 MB / 35 PB) | 120 |\n| **Child Leprosy Rate** | 6.3% (11 cases) | **3.1% (5 cases)** | 0.0% (0 cases) |\n| **Grade-2 Disability** | 34.9% (61 cases) | **21.6% (35 cases)** | <4.8% |\n| **Buruli Ulcer Cases** | 53 | **55** (27.1% PCR confirmed) | 40 |\n| **MDT Cure Rate** | 86.3% | **89.2%** | 94.0% |`;
    }

    return res.status(200).json({
      content: directAnswer,
      model: 'ikoli-grounded-synthesizer',
      provider: 'local-evidence-engine',
    });
  } catch (error) {
    console.error('Server proxy error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
