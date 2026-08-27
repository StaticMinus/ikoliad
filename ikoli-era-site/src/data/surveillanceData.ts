export interface StateData {
  id: string;
  name: string;
  capital: string;
  zone: string;
  leprosyCases: number;
  leprosyMB: number;
  leprosyPB: number;
  leprosyG2D: number; // Grade-2 disability %
  leprosyCureRate: number; // %
  buruliCases: number;
  buruliCat1: number;
  buruliCat2: number;
  buruliCat3: number;
  buruliPcrRate: number; // % PCR confirmation
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
  overallPcrRate: number;
  overallTreatmentSuccess: number;
  activePilotStates: number;
  sentinelSites: number;
  activeFacilities: number;
  recordsSubmitted: number;
  recordsConfirmed: number;
  zeroPiiComplianceScore: number;
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
  type: 'PHC Center' | 'Specialist Leprosarium' | 'General Hospital' | 'Mobile Outreach';
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

export const NATIONAL_SUMMARY: NationalSummary = {
  totalLeprosy: 2842,
  totalBuruli: 1838,
  totalYaws: 914,
  totalScreened: 94250,
  overallG2DRate: 11.4, // Down from 16.8% in baseline
  overallPcrRate: 78.5, // % confirmed by IS2404 PCR
  overallTreatmentSuccess: 89.2, // % cohort completion
  activePilotStates: 5,
  sentinelSites: 38,
  activeFacilities: 312,
  recordsSubmitted: 4820,
  recordsConfirmed: 4680,
  zeroPiiComplianceScore: 100,
};

export const STATES_DATA: Record<string, StateData> = {
  all: {
    id: 'all',
    name: 'South-East Zone (All 5 States)',
    capital: 'Enugu & Regional Hubs',
    zone: 'South-East Zone (5 States + Sentinel Feeds)',
    leprosyCases: 162,
    leprosyMB: 127,
    leprosyPB: 35,
    leprosyG2D: 21.6,
    leprosyCureRate: 89.2,
    buruliCases: 55,
    buruliCat1: 28,
    buruliCat2: 18,
    buruliCat3: 9,
    buruliPcrRate: 27.1,
    yawsCases: 42,
    activeFacilities: 312,
    sentinelLabs: 14,
    avgLabTurnaroundDays: 4.8,
    lastUpdated: '26 August 2026',
    status: 'Synchronized',
    coordinates: { x: 250, y: 200, label: 'Regional Hub' },
    lgasCovered: 95,
    totalScreened: 94250,
    highRiskLgas: ['Oji River', 'Izzi', 'Anambra West', 'Isiala Ngwa', 'Oguta'],
  },
  enugu: {
    id: 'enugu',
    name: 'Enugu State',
    capital: 'Enugu',
    zone: 'South-East (Oji River & Nsukka Hubs)',
    leprosyCases: 38,
    leprosyMB: 26,
    leprosyPB: 12,
    leprosyG2D: 31.6,
    leprosyCureRate: 91.4,
    buruliCases: 2,
    buruliCat1: 1,
    buruliCat2: 1,
    buruliCat3: 0,
    buruliPcrRate: 35.0,
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
  ebonyi: {
    id: 'ebonyi',
    name: 'Ebonyi State',
    capital: 'Abakaliki',
    zone: 'South-East (Mining & Agricultural Basin)',
    leprosyCases: 59,
    leprosyMB: 44,
    leprosyPB: 15,
    leprosyG2D: 25.4,
    leprosyCureRate: 87.5,
    buruliCases: 11,
    buruliCat1: 6,
    buruliCat2: 3,
    buruliCat3: 2,
    buruliPcrRate: 31.5,
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
  anambra: {
    id: 'anambra',
    name: 'Anambra State',
    capital: 'Awka',
    zone: 'South-East (Riverine & Floodplain Zone)',
    leprosyCases: 13,
    leprosyMB: 13,
    leprosyPB: 0,
    leprosyG2D: 16.7,
    leprosyCureRate: 90.1,
    buruliCases: 5,
    buruliCat1: 3,
    buruliCat2: 2,
    buruliCat3: 0,
    buruliPcrRate: 28.0,
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
  abia: {
    id: 'abia',
    name: 'Abia State',
    capital: 'Umuahia',
    zone: 'South-East (Commercial & Agricultural Corridor)',
    leprosyCases: 43,
    leprosyMB: 35,
    leprosyPB: 8,
    leprosyG2D: 18.6,
    leprosyCureRate: 88.4,
    buruliCases: 38,
    buruliCat1: 18,
    buruliCat2: 12,
    buruliCat3: 8,
    buruliPcrRate: 26.5,
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
  imo: {
    id: 'imo',
    name: 'Imo State',
    capital: 'Owerri',
    zone: 'South-East (Oil Palm & River Basin Hub)',
    leprosyCases: 9,
    leprosyMB: 9,
    leprosyPB: 0,
    leprosyG2D: 14.3,
    leprosyCureRate: 89.0,
    buruliCases: 2,
    buruliCat1: 1,
    buruliCat2: 1,
    buruliCat3: 0,
    buruliPcrRate: 25.0,
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

export const QUARTERLY_TRENDS = [
  { quarter: '2021 Annual', leprosyCases: 158, buruliCases: 50, g2dRate: 26.6, pcrRate: 0.4, cureRate: 81.2 },
  { quarter: '2022 Annual', leprosyCases: 119, buruliCases: 31, g2dRate: 25.2, pcrRate: 1.2, cureRate: 82.8 },
  { quarter: '2023 Annual', leprosyCases: 225, buruliCases: 46, g2dRate: 23.1, pcrRate: 0.4, cureRate: 84.1 },
  { quarter: '2024 Annual', leprosyCases: 175, buruliCases: 53, g2dRate: 34.9, pcrRate: 2.7, cureRate: 86.3 },
  { quarter: '2025 Actual', leprosyCases: 162, buruliCases: 55, g2dRate: 21.6, pcrRate: 27.1, cureRate: 89.2 },
  { quarter: '2026 Target', leprosyCases: 120, buruliCases: 40, g2dRate: 4.8, pcrRate: 78.5, cureRate: 94.0 },
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
    subType: 'Category I',
    stageDescription: 'Solitary painless nodule (3.2 cm) with early central induration and undermined borders',
    lesionSite: 'Left Lower Leg (Tibial)',
    aiConfidence: 98.8,
    verifiedBy: 'Dr. A. Nweke (NTD Focal Officer)',
    labStatus: 'PCR Confirmed',
    treatmentStatus: 'Oral Rifampicin 8-Wk',
    g2dStatus: 'Grade 0 (None)',
    dateRegistered: '2026-08-19',
    lastSync: '2026-08-26 16:15',
    hmacVerified: true,
  },
  {
    id: 'CASE-AN-0451',
    tokenHash: '0x9a22...51df67',
    state: 'Anambra State',
    stateId: 'anambra',
    lga: 'Anambra West',
    facility: 'Inoma Comprehensive Health Centre',
    disease: 'Buruli Ulcer',
    subType: 'Category II',
    stageDescription: 'Circumscribed undermined ulcer (8.4 cm) with necrotic yellowish base on calf',
    lesionSite: 'Posterior Right Calf',
    aiConfidence: 99.1,
    verifiedBy: 'Dr. I. Ezeh (Zonal Epidemiologist)',
    labStatus: 'PCR Confirmed',
    treatmentStatus: 'Oral Rifampicin 8-Wk',
    g2dStatus: 'Grade 1 (Sensory)',
    dateRegistered: '2026-08-10',
    lastSync: '2026-08-26 11:20',
    hmacVerified: true,
  },
  {
    id: 'CASE-AB-0934',
    tokenHash: '0x1b77...88f4e1',
    state: 'Abia State',
    stateId: 'abia',
    lga: 'Isiala Ngwa North',
    facility: 'Mbawsi Leprosy Outpost PHC',
    disease: 'Leprosy',
    subType: 'PB',
    stageDescription: 'Single well-defined anesthetic erythematous patch (4.1 cm) with hypohidrosis',
    lesionSite: 'Upper Left Lumbar Back',
    aiConfidence: 98.2,
    verifiedBy: 'Dr. E. Kalu (State STBLCO)',
    labStatus: 'Clinical Verification',
    treatmentStatus: 'MDT Initiated',
    g2dStatus: 'Grade 0 (None)',
    dateRegistered: '2026-08-22',
    lastSync: '2026-08-26 15:45',
    hmacVerified: true,
  },
  {
    id: 'CASE-IM-0318',
    tokenHash: '0x6e55...03aa99',
    state: 'Imo State',
    stateId: 'imo',
    lga: 'Oguta',
    facility: 'Oguta General Hospital NTD Unit',
    disease: 'Yaws',
    subType: 'Early Papilloma',
    stageDescription: 'Exudative raspberry-like cutaneous papilloma (Mother Yaw) on malleolus',
    lesionSite: 'Lateral Ankle Malleolus',
    aiConfidence: 97.9,
    verifiedBy: 'Nurse F. Onyeka (Field Lead)',
    labStatus: 'DPP Treponemal +',
    treatmentStatus: 'Cured',
    g2dStatus: 'Grade 0 (None)',
    dateRegistered: '2026-08-05',
    lastSync: '2026-08-26 09:10',
    hmacVerified: true,
  },
  {
    id: 'CASE-EN-0992',
    tokenHash: '0x88bb...42fa11',
    state: 'Enugu State',
    stateId: 'enugu',
    lga: 'Nsukka',
    facility: 'Nsukka Urban PHC Sentinel Site',
    disease: 'Leprosy',
    subType: 'MB',
    stageDescription: 'Multiple symmetrical hypopigmented plaques across trunk with early ulnar nerve thickening',
    lesionSite: 'Anterior Chest & Left Ulnar',
    aiConfidence: 99.6,
    verifiedBy: 'Dr. C. Okoli (STBLCO Lead)',
    labStatus: 'Slit-Skin Smear +',
    treatmentStatus: 'MDT Initiated',
    g2dStatus: 'Grade 1 (Sensory)',
    dateRegistered: '2026-08-24',
    lastSync: '2026-08-26 17:00',
    hmacVerified: true,
  },
  {
    id: 'CASE-EB-1340',
    tokenHash: '0x44dd...91fe33',
    state: 'Ebonyi State',
    stateId: 'ebonyi',
    lga: 'Ikwo',
    facility: 'Ndufu Alike Comprehensive PHC',
    disease: 'Buruli Ulcer',
    subType: 'Category I',
    stageDescription: 'Firm non-tender subcutaneous plaque (4.5 cm) with localized cutaneous warmth',
    lesionSite: 'Right Anterior Thigh',
    aiConfidence: 98.7,
    verifiedBy: 'Dr. A. Nweke (NTD Focal Officer)',
    labStatus: 'PCR Confirmed',
    treatmentStatus: 'Oral Rifampicin 8-Wk',
    g2dStatus: 'Grade 0 (None)',
    dateRegistered: '2026-08-21',
    lastSync: '2026-08-26 13:50',
    hmacVerified: true,
  },
];

export const MOCK_FACILITIES: FacilityTelemetry[] = [
  {
    id: 'FAC-EN-01',
    name: 'Oji River Specialist Leprosy Hospital',
    state: 'Enugu State',
    stateId: 'enugu',
    lga: 'Oji River',
    type: 'Specialist Leprosarium',
    activeOfficers: 12,
    casesUnderCare: 184,
    pcrTurnaroundDays: 3.2,
    dhis2SyncStatus: 'Real-time',
    mdtStockLevel: 'Optimal (>90d)',
    lastTelemetryPing: '2 mins ago',
    connectivity: 'Cellular 4G',
  },
  {
    id: 'FAC-EB-01',
    name: 'Mile 4 Hospital Reference Center',
    state: 'Ebonyi State',
    stateId: 'ebonyi',
    lga: 'Abakaliki',
    type: 'General Hospital',
    activeOfficers: 15,
    casesUnderCare: 210,
    pcrTurnaroundDays: 4.1,
    dhis2SyncStatus: 'Real-time',
    mdtStockLevel: 'Optimal (>90d)',
    lastTelemetryPing: '1 min ago',
    connectivity: 'Cellular 4G',
  },
  {
    id: 'FAC-AN-01',
    name: 'Inoma Comprehensive Health Centre',
    state: 'Anambra State',
    stateId: 'anambra',
    lga: 'Anambra West',
    type: 'PHC Center',
    activeOfficers: 8,
    casesUnderCare: 92,
    pcrTurnaroundDays: 4.8,
    dhis2SyncStatus: 'Real-time',
    mdtStockLevel: 'Adequate (30-90d)',
    lastTelemetryPing: '8 mins ago',
    connectivity: 'Satellite WAN',
  },
  {
    id: 'FAC-AB-01',
    name: 'Mbawsi Leprosy Outpost PHC',
    state: 'Abia State',
    stateId: 'abia',
    lga: 'Isiala Ngwa North',
    type: 'PHC Center',
    activeOfficers: 6,
    casesUnderCare: 68,
    pcrTurnaroundDays: 5.2,
    dhis2SyncStatus: 'Pending Queue',
    mdtStockLevel: 'Adequate (30-90d)',
    lastTelemetryPing: '24 mins ago',
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
    casesUnderCare: 76,
    pcrTurnaroundDays: 4.5,
    dhis2SyncStatus: 'Real-time',
    mdtStockLevel: 'Optimal (>90d)',
    lastTelemetryPing: '5 mins ago',
    connectivity: 'Cellular 4G',
  },
];

export const MOCK_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'LOG-88421',
    timestamp: '2026-08-26 17:15:02',
    eventType: 'Inference',
    officer: 'Dr. C. Okoli (STBLCO Lead)',
    facility: 'Oji River Specialist Leprosy Clinic',
    tokenHash: '0x7f4a...92b1c4',
    status: 'Cryptographically Verified',
    details: 'Melanin-compensated neural edge segmentation classified MB Leprosy with 99.4% confidence. Zero PII extracted.',
  },
  {
    id: 'LOG-88420',
    timestamp: '2026-08-26 16:54:19',
    eventType: 'DHIS2 Sync',
    officer: 'System Auto-Sync Pipeline',
    facility: 'Mile 4 Hospital Reference Center',
    tokenHash: '0x3c9d...7e88a2',
    status: 'Synchronized',
    details: 'Aggregate telemetry batch of 14 validated Category I Buruli cases transmitted to Federal DHIS2 Instance.',
  },
  {
    id: 'LOG-88419',
    timestamp: '2026-08-26 15:30:44',
    eventType: 'PCR Ingestion',
    officer: 'Lab Officer K. Igwe',
    facility: 'Mile 4 Hospital Reference Center',
    tokenHash: '0x9a22...51df67',
    status: 'Cryptographically Verified',
    details: 'IS2404 Real-Time PCR positive amplicon result mapped to token payload without patient exposure.',
  },
  {
    id: 'LOG-88418',
    timestamp: '2026-08-26 14:10:11',
    eventType: 'MDT Dispensation',
    officer: 'Pharmacist T. Eze',
    facility: 'Oji River Specialist Leprosy Clinic',
    tokenHash: '0x7f4a...92b1c4',
    status: 'Synchronized',
    details: 'WHO 12-Month MB Blister Pack Batch #MDT-2026-09 logged into national supply chain inventory.',
  },
];
