// IKOLI AI National & South-East Sentinel Surveillance Dataset
// Reconciled with Official Sources:
// 1. NTBLCP Nigeria Leprosy & Buruli Ulcer Roadmap & National Strategic Plan 2023-2030 (FMOHSW)
// 2. RedAid Nigeria (RAN) MEAL Evidence Contribution Report (2025 Working Baseline)
// 3. WHO Zero-Leprosy 2030 Roadmap Standards & IS2404 Real-Time PCR Guidelines

export interface StateData {
  id: string;
  name: string;
  capital: string;
  zone: string;
  leprosyCases: number;
  leprosyMB: number;
  leprosyPB: number;
  leprosyG2D: number; // Grade-2 disability % (Table 17)
  leprosyG2DCases: number; // Raw G2D cases
  childCases: number; // Child cases <15 years (Table 5 & 17)
  childRate: number; // Child proportion % (Active transmission indicator)
  leprosyCureRate: number; // %
  buruliCases: number;
  buruliCat1: number;
  buruliCat2: number;
  buruliCat3: number;
  buruliPcrRate: number; // % PCR confirmation (Table 7)
  buruliPcrCases: number; // Exact IS2404 PCR confirmed cases
  buruliClinicalCases: number; // Direct clinical diagnosis cases
  buruliMicroscopyCases: number; // ZN Smear/microscopy cases
  specimenLinkageRate: number; // % specimen linked to case within 7d (Table 12)
  yawsCases: number;
  activeFacilities: number;
  sentinelLabs: number;
  avgLabTurnaroundDays: number;
  lastUpdated: string;
  status: 'Validated' | 'Synchronized' | 'Active';
  coordinates: { x: number; y: number; label: string };
  lgasCovered: number;
  totalScreened: number;
  highRiskLgas: string[];
}

export interface NationalSummary {
  totalLeprosy: number;
  totalBuruli: number;
  totalYaws: number;
  totalScreened: number;
  overallG2DRate: number;
  totalG2DCases: number;
  overallChildRate: number;
  totalChildCases: number;
  overallPcrRate: number;
  totalPcrConfirmed: number;
  overallTreatmentSuccess: number;
  activePilotStates: number;
  sentinelSites: number;
  activeFacilities: number;
  recordsSubmitted: number;
  recordsConfirmed: number;
  zeroPiiComplianceScore: number;
  // MEAL & Digital Health Performance Framework (Table 12)
  reportingCompleteness: number; // Target ≥90%
  reportingTimeliness: number; // Target ≥85%
  ingestionLatencyHours: number; // Target ≤24h
  ruleCoveragePercent: number; // Target 100%
  highPriorityResolutionRate: number; // Target ≥80%
  specimenResultLinkageRate: number; // Target ≥90%
}

export interface CaseRecord {
  id: string;
  tokenHash: string;
  state: string;
  stateId: string;
  lga: string;
  facility: string;
  disease: 'Leprosy' | 'Buruli Ulcer' | 'Yaws';
  subType: 'PB' | 'MB' | 'Category I' | 'Category II' | 'Category III' | 'Early Papilloma';
  stageDescription: string;
  lesionSite: string;
  aiConfidence: number;
  verifiedBy: string;
  labStatus: 'PCR Confirmed' | 'Slit-Skin Smear +' | 'DPP Treponemal +' | 'Clinical Verification';
  treatmentStatus: 'MDT Initiated' | 'Cohort Month 3' | 'Oral Rifampicin 8-Wk' | 'Cured' | 'Follow-Up Pending';
  g2dStatus: 'Grade 0 (None)' | 'Grade 1 (Sensory)' | 'Grade 2 (Motor/Deformity)';
  isChildCase: boolean;
  dateRegistered: string;
  lastSync: string;
  hmacVerified: boolean;
}

export interface FacilityTelemetry {
  id: string;
  name: string;
  state: string;
  stateId: string;
  lga: string;
  type: 'PHC Center' | 'Specialist Leprosarium' | 'General Hospital' | 'Mobile Outreach' | 'Reference Lab Hub';
  activeOfficers: number;
  casesUnderCare: number;
  pcrTurnaroundDays: number;
  dhis2SyncStatus: 'Real-time' | 'Pending Queue' | 'Offline Sync';
  mdtStockLevel: 'Optimal (>90d)' | 'Adequate (30-90d)' | 'Reorder Alert (<30d)';
  lastTelemetryPing: string;
  connectivity: 'Cellular 4G' | 'Offline Buffered' | 'Satellite WAN';
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  eventType: 'Inference' | 'DHIS2 Sync' | 'PCR Ingestion' | 'MDT Dispensation' | 'Token Anonymization';
  officer: string;
  facility: string;
  tokenHash: string;
  status: 'Cryptographically Verified' | 'Synchronized' | 'Flagged';
  details: string;
}

// 2025 National & South-East Working Baseline (Table 5, 7, 9 & 12)
export const NATIONAL_SUMMARY: NationalSummary = {
  totalLeprosy: 2842, // Cumulative historical registry
  totalBuruli: 1838, // Cumulative historical registry
  totalYaws: 914,
  totalScreened: 94250,
  overallG2DRate: 21.6, // 35 G2D cases / 162 new cases (Table 5 & 17)
  totalG2DCases: 35,
  overallChildRate: 3.1, // 5 child cases / 162 new cases (Table 5 & 17)
  totalChildCases: 5,
  overallPcrRate: 27.1, // 55 PCR confirmed / 203 notified (Table 7)
  totalPcrConfirmed: 55,
  overallTreatmentSuccess: 89.2, // % cohort completion
  activePilotStates: 5,
  sentinelSites: 38,
  activeFacilities: 312,
  recordsSubmitted: 4820,
  recordsConfirmed: 4680,
  zeroPiiComplianceScore: 100,
  // MEAL & Digital Health Performance Framework
  reportingCompleteness: 93.4, // Baseline vs Target ≥90%
  reportingTimeliness: 88.7, // Baseline vs Target ≥85%
  ingestionLatencyHours: 4.2, // Median latency vs Target ≤24h
  ruleCoveragePercent: 100.0, // Automated arithmetic/hierarchy consistency rules
  highPriorityResolutionRate: 84.6, // Resolved in ≤10 days vs Target ≥80%
  specimenResultLinkageRate: 91.2, // Specimen to case token linked in ≤7d vs Target ≥90%
};

// 2025 Five-State Working Baseline Dataset (Tables 5, 7, 17 & 18)
export const STATES_DATA: Record<string, StateData> = {
  all: {
    id: 'all',
    name: 'South-East Zone (All 5 States)',
    capital: 'Enugu & Regional Hubs',
    zone: 'South-East Zone (5 States + Sentinel Feeds)',
    leprosyCases: 162,
    leprosyMB: 127,
    leprosyPB: 35,
    leprosyG2D: 21.6, // 35/162 (Table 5)
    leprosyG2DCases: 35,
    childCases: 5, // (Table 5 & 17)
    childRate: 3.1, // 5/162
    leprosyCureRate: 89.2,
    buruliCases: 55, // 2025 South-East Notified
    buruliCat1: 28,
    buruliCat2: 18,
    buruliCat3: 9,
    buruliPcrRate: 27.1, // 55 PCR confirmed out of 203 notified (Table 7)
    buruliPcrCases: 55,
    buruliClinicalCases: 108,
    buruliMicroscopyCases: 40,
    specimenLinkageRate: 91.2,
    yawsCases: 42,
    activeFacilities: 312,
    sentinelLabs: 14,
    avgLabTurnaroundDays: 4.8,
    lastUpdated: '26 August 2026',
    status: 'Synchronized',
    coordinates: { x: 250, y: 200, label: 'Regional Hub' },
    lgasCovered: 95,
    totalScreened: 94250,
    highRiskLgas: ['Oji River', 'Izzi', 'Anambra West', 'Isiala Ngwa North', 'Oguta'],
  },
  ebonyi: {
    id: 'ebonyi',
    name: 'Ebonyi State',
    capital: 'Abakaliki',
    zone: 'South-East (Mining & Agricultural Basin)',
    leprosyCases: 59, // Table 17
    leprosyMB: 44,
    leprosyPB: 15,
    leprosyG2D: 25.4, // 15/59 (Table 17)
    leprosyG2DCases: 15,
    childCases: 3, // Table 17
    childRate: 5.1, // 3/59 (Active transmission focus)
    leprosyCureRate: 87.5,
    buruliCases: 11, // Historical focus in Izzi & Ikwo
    buruliCat1: 6,
    buruliCat2: 3,
    buruliCat3: 2,
    buruliPcrRate: 31.5,
    buruliPcrCases: 4,
    buruliClinicalCases: 5,
    buruliMicroscopyCases: 2,
    specimenLinkageRate: 89.5,
    yawsCases: 14,
    activeFacilities: 68,
    sentinelLabs: 3,
    avgLabTurnaroundDays: 5.4,
    lastUpdated: '26 August 2026',
    status: 'Synchronized',
    coordinates: { x: 330, y: 150, label: 'Ebonyi' },
    lgasCovered: 13,
    totalScreened: 21400,
    highRiskLgas: ['Izzi', 'Ikwo', 'Ezza North', 'Ohaukwu'],
  },
  enugu: {
    id: 'enugu',
    name: 'Enugu State',
    capital: 'Enugu',
    zone: 'South-East (Oji River & Nsukka Hubs)',
    leprosyCases: 38, // Table 17
    leprosyMB: 26,
    leprosyPB: 12,
    leprosyG2D: 31.6, // 12/38 (Table 17)
    leprosyG2DCases: 12,
    childCases: 2, // Table 17
    childRate: 5.3, // 2/38
    leprosyCureRate: 91.4,
    buruliCases: 2,
    buruliCat1: 1,
    buruliCat2: 1,
    buruliCat3: 0,
    buruliPcrRate: 35.0,
    buruliPcrCases: 1,
    buruliClinicalCases: 1,
    buruliMicroscopyCases: 0,
    specimenLinkageRate: 94.8,
    yawsCases: 8,
    activeFacilities: 84,
    sentinelLabs: 4,
    avgLabTurnaroundDays: 3.9,
    lastUpdated: '26 August 2026',
    status: 'Synchronized',
    coordinates: { x: 260, y: 145, label: 'Enugu' },
    lgasCovered: 17,
    totalScreened: 24800,
    highRiskLgas: ['Oji River', 'Nsukka', 'Udi', 'Ezeagu'],
  },
  abia: {
    id: 'abia',
    name: 'Abia State',
    capital: 'Umuahia',
    zone: 'South-East (Commercial & Agricultural Corridor)',
    leprosyCases: 43, // Table 17
    leprosyMB: 35,
    leprosyPB: 8,
    leprosyG2D: 18.6, // 8/43 (Table 17)
    leprosyG2DCases: 8,
    childCases: 0, // Table 17: 0 child cases
    childRate: 0.0,
    leprosyCureRate: 88.4,
    buruliCases: 38, // Table 18 (Major Buruli focus)
    buruliCat1: 18,
    buruliCat2: 12,
    buruliCat3: 8,
    buruliPcrRate: 26.5,
    buruliPcrCases: 10,
    buruliClinicalCases: 20,
    buruliMicroscopyCases: 8,
    specimenLinkageRate: 90.1,
    yawsCases: 10,
    activeFacilities: 54,
    sentinelLabs: 2,
    avgLabTurnaroundDays: 5.1,
    lastUpdated: '26 August 2026',
    status: 'Synchronized',
    coordinates: { x: 260, y: 265, label: 'Abia' },
    lgasCovered: 17,
    totalScreened: 15400,
    highRiskLgas: ['Isiala Ngwa North', 'Bende', 'Ohafia', 'Ugwunagbo'],
  },
  anambra: {
    id: 'anambra',
    name: 'Anambra State',
    capital: 'Awka',
    zone: 'South-East (Riverine & Floodplain Zone)',
    leprosyCases: 13, // Table 17
    leprosyMB: 13,
    leprosyPB: 0,
    leprosyG2D: 0.0, // Table 17: 0/13 = 0.0% G2D in 2025
    leprosyG2DCases: 0,
    childCases: 0, // Table 17: 0 child cases
    childRate: 0.0,
    leprosyCureRate: 90.1,
    buruliCases: 5, // Table 18
    buruliCat1: 3,
    buruliCat2: 2,
    buruliCat3: 0,
    buruliPcrRate: 28.0,
    buruliPcrCases: 1,
    buruliClinicalCases: 3,
    buruliMicroscopyCases: 1,
    specimenLinkageRate: 92.4,
    yawsCases: 6,
    activeFacilities: 62,
    sentinelLabs: 3,
    avgLabTurnaroundDays: 4.2,
    lastUpdated: '26 August 2026',
    status: 'Synchronized',
    coordinates: { x: 195, y: 190, label: 'Anambra' },
    lgasCovered: 21,
    totalScreened: 19200,
    highRiskLgas: ['Anambra West', 'Ogbaru', 'Ayamelum', 'Awka North'],
  },
  imo: {
    id: 'imo',
    name: 'Imo State',
    capital: 'Owerri',
    zone: 'South-East (Oil Palm & River Basin Hub)',
    leprosyCases: 9, // Table 17
    leprosyMB: 9,
    leprosyPB: 0,
    leprosyG2D: 0.0, // Table 17: 0/9 = 0.0% G2D in 2025
    leprosyG2DCases: 0,
    childCases: 0, // Table 17: 0 child cases
    childRate: 0.0,
    leprosyCureRate: 89.0,
    buruliCases: 2, // Table 18
    buruliCat1: 1,
    buruliCat2: 1,
    buruliCat3: 0,
    buruliPcrRate: 25.0,
    buruliPcrCases: 1,
    buruliClinicalCases: 1,
    buruliMicroscopyCases: 0,
    specimenLinkageRate: 88.0,
    yawsCases: 4,
    activeFacilities: 44,
    sentinelLabs: 2,
    avgLabTurnaroundDays: 4.9,
    lastUpdated: '26 August 2026',
    status: 'Synchronized',
    coordinates: { x: 210, y: 245, label: 'Imo' },
    lgasCovered: 27,
    totalScreened: 13450,
    highRiskLgas: ['Oguta', 'Ohaji/Egbema', 'Ngor Okpala', 'Njaba'],
  },
};

// 5-Year Historical & Target Trend Matrix (Table 5, Table 7 & National Roadmap 2023-2030)
export const QUARTERLY_TRENDS = [
  {
    quarter: '2021 Annual',
    leprosyCases: 158,
    childCases: 9,
    childRate: 5.7,
    buruliCases: 50,
    g2dCases: 42,
    g2dRate: 26.6,
    pcrRate: 0.4,
    cureRate: 81.2,
  },
  {
    quarter: '2022 Annual',
    leprosyCases: 119,
    childCases: 4,
    childRate: 3.4,
    buruliCases: 31,
    g2dCases: 30,
    g2dRate: 25.2,
    pcrRate: 1.2,
    cureRate: 82.8,
  },
  {
    quarter: '2023 Annual',
    leprosyCases: 225,
    childCases: 9,
    childRate: 4.0,
    buruliCases: 482,
    g2dCases: 52,
    g2dRate: 23.1,
    pcrRate: 0.4,
    cureRate: 84.1,
  },
  {
    quarter: '2024 Annual',
    leprosyCases: 175,
    childCases: 11,
    childRate: 6.3,
    buruliCases: 1180,
    g2dCases: 61,
    g2dRate: 34.9,
    pcrRate: 2.7,
    cureRate: 86.3,
  },
  {
    quarter: '2025 Actual',
    leprosyCases: 162,
    childCases: 5,
    childRate: 3.1,
    buruliCases: 203,
    g2dCases: 35,
    g2dRate: 21.6,
    pcrRate: 27.1,
    cureRate: 89.2,
  },
  {
    quarter: '2026 Target',
    leprosyCases: 120,
    childCases: 0,
    childRate: 0.0,
    buruliCases: 40,
    g2dCases: 6,
    g2dRate: 4.8,
    pcrRate: 78.5,
    cureRate: 94.0,
  },
];

export const MOCK_CASE_RECORDS: CaseRecord[] = [
  {
    id: 'CASE-EN-0842',
    tokenHash: '0x7f4a...92b1c4',
    state: 'Enugu State',
    stateId: 'enugu',
    lga: 'Oji River',
    facility: 'Oji River Specialist Leprosy Clinic',
    disease: 'Leprosy',
    subType: 'MB',
    stageDescription: '6 hypopigmented macules with marked sensory loss on right forearm and earlobes induration',
    lesionSite: 'Right Forearm & Facial Contour',
    aiConfidence: 99.4,
    verifiedBy: 'Dr. C. Okoli (STBLCO Lead)',
    labStatus: 'Slit-Skin Smear +',
    treatmentStatus: 'Cohort Month 3',
    g2dStatus: 'Grade 1 (Sensory)',
    isChildCase: false,
    dateRegistered: '2026-08-14',
    lastSync: '2026-08-26 14:30',
    hmacVerified: true,
  },
  {
    id: 'CASE-EB-1209',
    tokenHash: '0x3c9d...7e88a2',
    state: 'Ebonyi State',
    stateId: 'ebonyi',
    lga: 'Izzi',
    facility: 'Mile 4 Hospital Reference Center',
    disease: 'Buruli Ulcer',
    subType: 'Category II',
    stageDescription: '8.5 cm undermined necrotic ulcer with edematous indurated borders on lower right tibia',
    lesionSite: 'Right Lower Tibia',
    aiConfidence: 98.7,
    verifiedBy: 'Sr. B. Nweke (Clinical Officer)',
    labStatus: 'PCR Confirmed',
    treatmentStatus: 'Oral Rifampicin 8-Wk',
    g2dStatus: 'Grade 2 (Motor/Deformity)',
    isChildCase: true,
    dateRegistered: '2026-08-18',
    lastSync: '2026-08-26 13:45',
    hmacVerified: true,
  },
  {
    id: 'CASE-AB-0417',
    tokenHash: '0x9a2b...44f109',
    state: 'Abia State',
    stateId: 'abia',
    lga: 'Isiala Ngwa North',
    facility: 'Mbawsi Leprosy Outpost PHC',
    disease: 'Leprosy',
    subType: 'PB',
    stageDescription: '2 well-demarcated anesthetic erythematous plaques with central clearing on dorsal torso',
    lesionSite: 'Mid-Thoracic Back',
    aiConfidence: 97.2,
    verifiedBy: 'Dr. E. Eze (NTBLCP Zonal Supv)',
    labStatus: 'Clinical Verification',
    treatmentStatus: 'MDT Initiated',
    g2dStatus: 'Grade 0 (None)',
    isChildCase: false,
    dateRegistered: '2026-08-21',
    lastSync: '2026-08-26 11:20',
    hmacVerified: true,
  },
  {
    id: 'CASE-AN-0331',
    tokenHash: '0x1e8c...bb3912',
    state: 'Anambra State',
    stateId: 'anambra',
    lga: 'Anambra West',
    facility: 'Awka South Model Comprehensive PHC',
    disease: 'Buruli Ulcer',
    subType: 'Category I',
    stageDescription: '3.2 cm firm subcutaneous non-ulcerated nodule on left lateral malleolus',
    lesionSite: 'Left Lateral Malleolus',
    aiConfidence: 96.5,
    verifiedBy: 'Nurse M. Obi (Surveillance Focal)',
    labStatus: 'PCR Confirmed',
    treatmentStatus: 'Oral Rifampicin 8-Wk',
    g2dStatus: 'Grade 0 (None)',
    isChildCase: false,
    dateRegistered: '2026-08-22',
    lastSync: '2026-08-26 15:10',
    hmacVerified: true,
  },
  {
    id: 'CASE-IM-0198',
    tokenHash: '0x55d1...66c884',
    state: 'Imo State',
    stateId: 'imo',
    lga: 'Oguta',
    facility: 'Oguta General Hospital NTD Wing',
    disease: 'Yaws',
    subType: 'Early Papilloma',
    stageDescription: 'Multiple raspberry-like exudative papillomatous lesions on bilateral lower extremities',
    lesionSite: 'Bilateral Shins & Ankles',
    aiConfidence: 95.8,
    verifiedBy: 'Dr. T. Nwosu (Field MO)',
    labStatus: 'DPP Treponemal +',
    treatmentStatus: 'MDT Initiated',
    g2dStatus: 'Grade 0 (None)',
    isChildCase: true,
    dateRegistered: '2026-08-24',
    lastSync: '2026-08-26 09:50',
    hmacVerified: true,
  },
];

export const MOCK_FACILITIES: FacilityTelemetry[] = [
  {
    id: 'FAC-EB-01',
    name: 'Mile 4 Hospital Reference Center',
    state: 'Ebonyi State',
    stateId: 'ebonyi',
    lga: 'Abakaliki',
    type: 'Reference Lab Hub',
    activeOfficers: 15,
    casesUnderCare: 210,
    pcrTurnaroundDays: 4.8,
    dhis2SyncStatus: 'Real-time',
    mdtStockLevel: 'Optimal (>90d)',
    lastTelemetryPing: '2 mins ago',
    connectivity: 'Cellular 4G',
  },
  {
    id: 'FAC-EN-01',
    name: 'Oji River Specialist Leprosy Hospital',
    state: 'Enugu State',
    stateId: 'enugu',
    lga: 'Oji River',
    type: 'Specialist Leprosarium',
    activeOfficers: 12,
    casesUnderCare: 184,
    pcrTurnaroundDays: 3.9,
    dhis2SyncStatus: 'Real-time',
    mdtStockLevel: 'Optimal (>90d)',
    lastTelemetryPing: '4 mins ago',
    connectivity: 'Cellular 4G',
  },
  {
    id: 'FAC-EN-02',
    name: 'UNTH Molecular Reference Laboratory Hub',
    state: 'Enugu State',
    stateId: 'enugu',
    lga: 'Ituku-Ozalla',
    type: 'Reference Lab Hub',
    activeOfficers: 8,
    casesUnderCare: 64,
    pcrTurnaroundDays: 3.2,
    dhis2SyncStatus: 'Real-time',
    mdtStockLevel: 'Optimal (>90d)',
    lastTelemetryPing: '1 min ago',
    connectivity: 'Cellular 4G',
  },
  {
    id: 'FAC-AN-01',
    name: 'Awka South Model Comprehensive PHC',
    state: 'Anambra State',
    stateId: 'anambra',
    lga: 'Awka South',
    type: 'PHC Center',
    activeOfficers: 10,
    casesUnderCare: 126,
    pcrTurnaroundDays: 4.2,
    dhis2SyncStatus: 'Real-time',
    mdtStockLevel: 'Optimal (>90d)',
    lastTelemetryPing: '7 mins ago',
    connectivity: 'Cellular 4G',
  },
  {
    id: 'FAC-IM-01',
    name: 'Oguta General Hospital NTD Wing',
    state: 'Imo State',
    stateId: 'imo',
    lga: 'Oguta',
    type: 'General Hospital',
    activeOfficers: 9,
    casesUnderCare: 114,
    pcrTurnaroundDays: 4.9,
    dhis2SyncStatus: 'Real-time',
    mdtStockLevel: 'Optimal (>90d)',
    lastTelemetryPing: '12 mins ago',
    connectivity: 'Cellular 4G',
  },
  {
    id: 'FAC-AB-01',
    name: 'Mbawsi Leprosy Outpost PHC',
    state: 'Abia State',
    stateId: 'abia',
    lga: 'Isiala Ngwa North',
    type: 'PHC Center',
    activeOfficers: 8,
    casesUnderCare: 98,
    pcrTurnaroundDays: 5.1,
    dhis2SyncStatus: 'Real-time',
    mdtStockLevel: 'Adequate (30-90d)',
    lastTelemetryPing: '15 mins ago',
    connectivity: 'Cellular 4G',
  },
  {
    id: 'FAC-EB-02',
    name: 'Izzi Frontier Health Post',
    state: 'Ebonyi State',
    stateId: 'ebonyi',
    lga: 'Izzi',
    type: 'Mobile Outreach',
    activeOfficers: 6,
    casesUnderCare: 72,
    pcrTurnaroundDays: 5.8,
    dhis2SyncStatus: 'Offline Sync',
    mdtStockLevel: 'Adequate (30-90d)',
    lastTelemetryPing: '28 mins ago',
    connectivity: 'Satellite WAN',
  },
];

export const MOCK_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'AUD-88210',
    timestamp: '2026-08-26 15:42:11',
    eventType: 'Inference',
    officer: 'Dr. C. Okoli',
    facility: 'Oji River Specialist Leprosy Hospital',
    tokenHash: '0x7f4a...92b1c4',
    status: 'Cryptographically Verified',
    details: 'Clinical assistant inference completed for MB Leprosy; sensory mapping verified against NTBLCP 2024 Protocol.',
  },
  {
    id: 'AUD-88209',
    timestamp: '2026-08-26 15:38:04',
    eventType: 'PCR Ingestion',
    officer: 'Lab Officer K. Ani',
    facility: 'UNTH Molecular Reference Laboratory Hub',
    tokenHash: '0x3c9d...7e88a2',
    status: 'Cryptographically Verified',
    details: 'IS2404 Real-Time PCR positive amplicon result mapped to token payload; linked to Mile 4 Hospital case record.',
  },
  {
    id: 'AUD-88208',
    timestamp: '2026-08-26 15:30:29',
    eventType: 'DHIS2 Sync',
    officer: 'System Daemon (Auto-Cron)',
    facility: 'Federal Ministry of Health Gateway',
    tokenHash: '0x9a2b...44f109',
    status: 'Synchronized',
    details: 'Quarterly aggregate indicators synchronized to National DHIS2 Skin NTD instance with 100% hash validation.',
  },
  {
    id: 'AUD-88207',
    timestamp: '2026-08-26 15:15:50',
    eventType: 'Token Anonymization',
    officer: 'Edge Device Agent',
    facility: 'Awka South Model Comprehensive PHC',
    tokenHash: '0x1e8c...bb3912',
    status: 'Cryptographically Verified',
    details: 'Biometric image SHA-256 HMAC generated and local storage purged immediately per NDPA 2023 Zero-PII Policy.',
  },
  {
    id: 'AUD-88206',
    timestamp: '2026-08-26 14:58:12',
    eventType: 'MDT Dispensation',
    officer: 'Pharm. T. Nwosu',
    facility: 'Oguta General Hospital NTD Wing',
    tokenHash: '0x55d1...66c884',
    status: 'Synchronized',
    details: 'MDT blister pack dispensed (Adult MB 12-Month regimen); electronic stock register balance decremented.',
  },
];
