export interface DiseaseEntry {
  id: string;
  type: 'featured' | 'standard';
  badge?: string;
  title: string;
  description?: string;
  author?: string;
  category: string;
  category_color: string;
  video_url?: string;
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
    category_color: '#10B981',
    video_url: '/media/clinical-exam.mp4',
    image_url: '/media/field-screening-action.jpg',
    display_order: 1,
  },
  {
    id: 'disease-2',
    type: 'standard',
    title: 'Identifying Early Hypopigmentation in Paucibacillary Leprosy',
    category: 'Leprosy (PB)',
    category_color: '#0071E3',
    video_url: '/media/patient-consult.mp4',
    image_url: '/media/sensory-mapping-consult.jpg',
    display_order: 2,
  },
  {
    id: 'disease-3',
    type: 'standard',
    title: 'Multibacillary Nerve Thickening & Sensory Mapping',
    category: 'Leprosy (MB)',
    category_color: '#DE322D',
    video_url: '/media/community-worker.mp4',
    image_url: '/media/lab-microscopy.jpg',
    display_order: 3,
  },
  {
    id: 'disease-4',
    type: 'standard',
    title: 'Yaws Papilloma & Ulcerative Differential Criteria',
    category: 'Yaws / Leish',
    category_color: '#8B5CF6',
    video_url: '/media/Hero.mp4',
    image_url: '/media/tablet-diagnostics.jpg',
    display_order: 4,
  },
];
