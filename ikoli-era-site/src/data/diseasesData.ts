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
    category_color: '#0071E3',
    image_url: '/media/home_buruli_differential.jpg',
    display_order: 1,
  },
  {
    id: 'disease-2',
    type: 'standard',
    title: 'Identifying Early Hypopigmentation in Paucibacillary Leprosy',
    category: 'Leprosy (PB)',
    category_color: '#0071E3',
    image_url: '/media/home_pb_leprosy_hypopigmentation.jpg',
    display_order: 2,
  },
  {
    id: 'disease-3',
    type: 'standard',
    title: 'Multibacillary Nerve Thickening & Sensory Mapping',
    category: 'Leprosy (MB)',
    category_color: '#0071E3',
    image_url: '/media/home_mb_leprosy_nerve_mapping.jpg',
    display_order: 3,
  },
  {
    id: 'disease-4',
    type: 'standard',
    title: 'Yaws Papilloma & Ulcerative Differential Criteria',
    category: 'Yaws / Leish',
    category_color: '#0071E3',
    image_url: '/media/home_yaws_differential_screening.jpg',
    display_order: 4,
  },
];
