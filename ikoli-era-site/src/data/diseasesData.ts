export interface DiseaseEntry {
  id: string;
  type: 'featured' | 'standard';
  badge?: string;
  title: string;
  description?: string;
  author?: string;
  category: string;
  category_color: string;
  video_url: string;
  display_order: number;
}

export const INITIAL_DISEASES: DiseaseEntry[] = [
  {
    id: 'disease-1',
    type: 'featured',
    badge: 'Clinical Priority',
    title: 'Buruli Ulcer vs. Chronic Ulcers: Differential AI Staging',
    description: 'An evidence-based clinical analysis of Mycobacterium ulcerans tissue necrosis, undermined edges, and Category I/II/III classification for rapid surgical triage.',
    author: 'By NTBLCP & RedAid Clinical Registry',
    category: 'Buruli Ulcer',
    category_color: '#7d1a4a',
    video_url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_155500_808e6fdd-761f-4acd-b3be-cb7e6e700def.mp4',
    display_order: 1,
  },
  {
    id: 'disease-2',
    type: 'standard',
    title: 'Identifying Early Hypopigmentation in Paucibacillary Leprosy',
    category: 'Leprosy (PB)',
    category_color: '#2c4c34',
    video_url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260506_030111_a9e15665-d379-4a7f-8116-695bbe452ad1.mp4',
    display_order: 2,
  },
  {
    id: 'disease-3',
    type: 'standard',
    title: 'Multibacillary Nerve Thickening & Sensory Mapping',
    category: 'Leprosy (MB)',
    category_color: '#a63e2d',
    video_url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4',
    display_order: 3,
  },
  {
    id: 'disease-4',
    type: 'standard',
    title: 'Yaws Papilloma & Ulcerative Differential Criteria',
    category: 'Yaws / Leish',
    category_color: '#1a2b8c',
    video_url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_154232_f8809bd2-a6c3-4a38-908d-2005e5b3cb3e.mp4',
    display_order: 4,
  },
];
