export interface DiseaseEntry {
  id: string;
  type: 'featured' | 'standard';
  badge?: string;
  title: string;
  description?: string;
  author?: string;
  category: string;
  category_color: string;
  image_url: string;
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
    category_color: '#1D1D1F',
    image_url: '/media/leprosy_clinical_exam.jpg',
    display_order: 1,
  },
  {
    id: 'disease-2',
    type: 'standard',
    title: 'Identifying Early Hypopigmentation in Paucibacillary Leprosy',
    category: 'Leprosy (PB)',
    category_color: '#1D1D1F',
    image_url: '/media/female_researcher_journal.jpg',
    display_order: 2,
  },
  {
    id: 'disease-3',
    type: 'standard',
    title: 'Multibacillary Nerve Thickening & Sensory Mapping',
    category: 'Leprosy (MB)',
    category_color: '#1D1D1F',
    image_url: '/media/about_contact_creative_color.jpg',
    display_order: 3,
  },
  {
    id: 'disease-4',
    type: 'standard',
    title: 'Yaws Papilloma & Ulcerative Differential Criteria',
    category: 'Yaws / Leish',
    category_color: '#1D1D1F',
    image_url: '/media/submenu_patient_dignity.jpg',
    display_order: 4,
  },
];
