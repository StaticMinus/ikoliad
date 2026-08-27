import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Activity,
  Building2,
  Filter,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export type DesignStyleId =
  | 'apple-clean'
  | 'warm-editorial'
  | 'neo-brutalist'
  | 'nordic-sand'
  | 'terranova-glass'
  | 'obsidian-cyber'
  | 'noir-luxury'
  | 'clinical-terminal'
  | 'claymorphism'
  | 'cyber-y2k'
  | 'japanese-zen'
  | 'bento-supercharged'
  | 'biophilic-botanical'
  | 'duotone-print'
  | 'aurora-holographic';

interface StyleMeta {
  id: DesignStyleId;
  category: 'minimal' | 'editorial' | 'cyber' | 'bold' | 'experimental';
  number: string;
  name: string;
  badge: string;
  tagline: string;
  desc: string;
  colors: string[];
  fonts: string;
  heroImage: string;
  cardImage1: string;
  cardImage2: string;
}

export const STYLES_CATALOG: StyleMeta[] = [
  {
    id: 'apple-clean',
    category: 'minimal',
    number: '01',
    name: 'Apple Clean / Spatial Minimalist',
    badge: 'Apple • VisionOS Light Glass',
    tagline: 'Pure white canvas, frosted light glass, and airy humanist typography.',
    desc: 'Soft optical shadows, floating translucent pill bars, generous negative space, and refined clinical photography.',
    colors: ['#FFFFFF', '#F5F5F7', '#0071E3', '#1D1D1F', '#86868B'],
    fonts: 'Plus Jakarta Sans / SF Pro',
    heroImage: 'https://images.pexels.com/photos/7088530/pexels-photo-7088530.jpeg?auto=compress&cs=tinysrgb&w=800',
    cardImage1: 'https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg?auto=compress&cs=tinysrgb&w=800',
    cardImage2: 'https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'warm-editorial',
    category: 'editorial',
    number: '02',
    name: 'Warm Editorial / Swiss Archival',
    badge: 'Kinfolk • Stripe Press',
    tagline: 'Warm ivory paper, deep forest green, and classical serif headlines.',
    desc: 'Numbered sequence stamps, tactile paper cards, hairline borders, and official public health authority seals.',
    colors: ['#F4F0E7', '#263D35', '#DE322D', '#A85D3A', '#C9A45C'],
    fonts: 'DM Serif Display + DM Sans',
    heroImage: 'https://images.pexels.com/photos/5428003/pexels-photo-5428003.jpeg?auto=compress&cs=tinysrgb&w=800',
    cardImage1: 'https://images.pexels.com/photos/7691249/pexels-photo-7691249.jpeg?auto=compress&cs=tinysrgb&w=800',
    cardImage2: 'https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'neo-brutalist',
    category: 'bold',
    number: '03',
    name: 'Neo-Brutalist / Bold Graphic Pop',
    badge: 'Figma Config • Gumroad',
    tagline: 'High-voltage electric yellow, 3px hard black borders, and heavy grotesque.',
    desc: 'Solid 6px offset drop shadows, sticker badges, raw high-contrast energy, and punchy uppercase headlines.',
    colors: ['#FFE600', '#FF5C38', '#00F0FF', '#000000', '#FFFFFF'],
    fonts: 'Space Grotesk / Heavy Grotesque',
    heroImage: 'https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg?auto=compress&cs=tinysrgb&w=800',
    cardImage1: 'https://images.pexels.com/photos/4049870/pexels-photo-4049870.jpeg?auto=compress&cs=tinysrgb&w=800',
    cardImage2: 'https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'nordic-sand',
    category: 'minimal',
    number: '04',
    name: 'Nordic Minimal / Architectural Sand',
    badge: 'Scandinavian • Architectural Digest',
    tagline: 'Muted limestone sand, slate charcoal, and hairline gridlines.',
    desc: 'Understated quiet luxury, serene natural tones, calm architectural spacing, and muted matte surfaces.',
    colors: ['#EAE6DF', '#2B2D2F', '#8C827A', '#D5CFC4', '#1A1B1C'],
    fonts: 'Inter / Outfit',
    heroImage: 'https://images.pexels.com/photos/3844581/pexels-photo-3844581.jpeg?auto=compress&cs=tinysrgb&w=800',
    cardImage1: 'https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=800',
    cardImage2: 'https://images.pexels.com/photos/3786157/pexels-photo-3786157.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'terranova-glass',
    category: 'experimental',
    number: '05',
    name: 'Refractive Liquid Glass (Terranova)',
    badge: 'Terranova • Deep Green Glass',
    tagline: 'Deep emerald green, real-time glass refraction, and chromatic dispersion.',
    desc: 'Physical 2D refractive canvas cards, luminous emerald glows, frosted floating pill docks, and optic depth.',
    colors: ['#081C15', '#10B981', '#00D2FF', '#0F382B', '#E6FAF2'],
    fonts: 'Plus Jakarta Sans + Monospace',
    heroImage: 'https://images.pexels.com/photos/3825539/pexels-photo-3825539.jpeg?auto=compress&cs=tinysrgb&w=800',
    cardImage1: 'https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg?auto=compress&cs=tinysrgb&w=800',
    cardImage2: 'https://images.pexels.com/photos/3844581/pexels-photo-3844581.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'obsidian-cyber',
    category: 'cyber',
    number: '06',
    name: 'Obsidian Cyber-SaaS (Linear/Raycast)',
    badge: 'Linear • Raycast Obsidian',
    tagline: 'Deep pitch black, electric blue neon highlights, and dark Bento grids.',
    desc: 'Translucent dark glass cards, radial spotlights, glowing status dots, and tabular monospace telemetry.',
    colors: ['#0A0C10', '#0082FF', '#00D2FF', '#161B22', '#30363D'],
    fonts: 'Outfit + IBM Plex Mono',
    heroImage: 'https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=800',
    cardImage1: 'https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=800',
    cardImage2: 'https://images.pexels.com/photos/7691249/pexels-photo-7691249.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'noir-luxury',
    category: 'editorial',
    number: '07',
    name: 'Noir Luxury / High-Fashion Gold',
    badge: 'Saint Laurent • V Magazine',
    tagline: 'Pitch black, metallic gold leaf accents, and high-drama italic serifs.',
    desc: 'High-contrast monochrome photography, gold hairline dividers, opulent typography, and haute-couture editorial grid.',
    colors: ['#0D0D0D', '#D4AF37', '#FFFFFF', '#1F1F1F', '#F3E5AB'],
    fonts: 'Playfair Display + Inter',
    heroImage: 'https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=800',
    cardImage1: 'https://images.pexels.com/photos/7691249/pexels-photo-7691249.jpeg?auto=compress&cs=tinysrgb&w=800',
    cardImage2: 'https://images.pexels.com/photos/5428003/pexels-photo-5428003.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'clinical-terminal',
    category: 'cyber',
    number: '08',
    name: 'Industrial Clinical Terminal',
    badge: 'Bloomberg • NASA Mission Control',
    tagline: 'Slate navy, phosphor green telemetry, and dense monospace data matrices.',
    desc: 'Tabular coordinate grids, CRT phosphor glowing indicators, clinical sensor telemetry, and zero decorative fluff.',
    colors: ['#0B1120', '#22C55E', '#F59E0B', '#1E293B', '#38BDF8'],
    fonts: 'IBM Plex Mono (Tabular)',
    heroImage: 'https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg?auto=compress&cs=tinysrgb&w=800',
    cardImage1: 'https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=800',
    cardImage2: 'https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'claymorphism',
    category: 'experimental',
    number: '09',
    name: 'Soft Claymorphism / Tactile 3D',
    badge: 'Soft UI • 3D Tactile Puffy',
    tagline: 'Warm cloud clay surfaces, soft inner pill shadows, and friendly curves.',
    desc: 'Double-layered soft inset shadows, floating marshmallow cards, welcoming friendly pastel tones, and tactile buttons.',
    colors: ['#EEF2F6', '#6366F1', '#F43F5E', '#FFFFFF', '#CBD5E1'],
    fonts: 'Plus Jakarta Sans / Rounded',
    heroImage: 'https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=800',
    cardImage1: 'https://images.pexels.com/photos/4049870/pexels-photo-4049870.jpeg?auto=compress&cs=tinysrgb&w=800',
    cardImage2: 'https://images.pexels.com/photos/7088530/pexels-photo-7088530.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'cyber-y2k',
    category: 'bold',
    number: '10',
    name: 'Retro-Futuristic Cyber-Y2K / Chrome',
    badge: 'Y2K Cyber • Iridescent Chrome',
    tagline: 'Midnight violet, liquid chrome gradients, and starburst badges.',
    desc: 'Metallic chrome pill borders, cyberpunk wireframe grids, holographic purple accents, and futuristic monospace tags.',
    colors: ['#0E0B16', '#A855F7', '#E2E8F0', '#221D38', '#06B6D4'],
    fonts: 'Syne / Space Grotesk',
    heroImage: 'https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg?auto=compress&cs=tinysrgb&w=800',
    cardImage1: 'https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg?auto=compress&cs=tinysrgb&w=800',
    cardImage2: 'https://images.pexels.com/photos/3844581/pexels-photo-3844581.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'japanese-zen',
    category: 'minimal',
    number: '11',
    name: 'Japanese Zen / Wabi-Sabi Natural',
    badge: 'Muji • Kyoto Minimal',
    tagline: 'Linen canvas, matcha moss green, and tranquil contemplative balance.',
    desc: 'Expansive breathing space, organic asymmetry, warm earthy pigments, natural fiber textures, and quiet serenity.',
    colors: ['#F7F5F0', '#4A5D4E', '#8B7355', '#E3DDD3', '#2C302E'],
    fonts: 'DM Serif + Inter',
    heroImage: 'https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=800',
    cardImage1: 'https://images.pexels.com/photos/3786157/pexels-photo-3786157.jpeg?auto=compress&cs=tinysrgb&w=800',
    cardImage2: 'https://images.pexels.com/photos/7088530/pexels-photo-7088530.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'bento-supercharged',
    category: 'minimal',
    number: '12',
    name: 'Bento Grid Supercharged / Modular Hub',
    badge: 'Apple Keynote • Modular Bento',
    tagline: 'Multi-sized Bento modules, interactive micro-widgets, and live metric pills.',
    desc: 'Dense, highly structured Bento boxes packing live toggles, charts, clinical imagery, and status badges with crisp hierarchy.',
    colors: ['#FAFAFA', '#18181B', '#2563EB', '#E4E4E7', '#10B981'],
    fonts: 'Inter / Plus Jakarta Sans',
    heroImage: 'https://images.pexels.com/photos/7691249/pexels-photo-7691249.jpeg?auto=compress&cs=tinysrgb&w=800',
    cardImage1: 'https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg?auto=compress&cs=tinysrgb&w=800',
    cardImage2: 'https://images.pexels.com/photos/5428003/pexels-photo-5428003.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'biophilic-botanical',
    category: 'editorial',
    number: '13',
    name: 'Biophilic Botanical / Deep Jungle',
    badge: 'Bio-Clinical • Botanical Lab',
    tagline: 'Deep rainforest jade, luminous neon mint, and botanical clinical imagery.',
    desc: 'Organic curvature, medical plant cellular imagery, regenerative therapy tokens, and calming biological telemetry.',
    colors: ['#091A14', '#10B981', '#A7F3D0', '#132E24', '#059669'],
    fonts: 'DM Sans / Outfit',
    heroImage: 'https://images.pexels.com/photos/3844581/pexels-photo-3844581.jpeg?auto=compress&cs=tinysrgb&w=800',
    cardImage1: 'https://images.pexels.com/photos/3825539/pexels-photo-3825539.jpeg?auto=compress&cs=tinysrgb&w=800',
    cardImage2: 'https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'duotone-print',
    category: 'bold',
    number: '14',
    name: 'Monochrome Duotone / Broadside Print',
    badge: 'Swiss Poster • Risograph Print',
    tagline: 'High-contrast ink black, stark white, and electric crimson stamps.',
    desc: 'Halftone dot textures, woodblock headlines, rubber ink stamp badges, and bold Swiss poster layout principles.',
    colors: ['#111111', '#FAFAFA', '#E11D48', '#333333', '#F4F4F5'],
    fonts: 'DM Serif Display + Courier Mono',
    heroImage: 'https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=800',
    cardImage1: 'https://images.pexels.com/photos/4049870/pexels-photo-4049870.jpeg?auto=compress&cs=tinysrgb&w=800',
    cardImage2: 'https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'aurora-holographic',
    category: 'experimental',
    number: '15',
    name: 'Aurora Holographic / Fluid Luminous',
    badge: 'Multi-Spectral • Mesh Gradient',
    tagline: 'Midnight indigo, multi-spectral magenta/cyan fluid mesh, and iridescent cards.',
    desc: 'Vibrant fluid lighting, floating iridescent glass cards, glowing borders, and high-energy modern visual dynamism.',
    colors: ['#0F0C20', '#EC4899', '#8B5CF6', '#06B6D4', '#F472B6'],
    fonts: 'Plus Jakarta Sans / Syne',
    heroImage: 'https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=800',
    cardImage1: 'https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg?auto=compress&cs=tinysrgb&w=800',
    cardImage2: 'https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

interface DesignShowcasePageProps {
  onNavigate: (page: 'home' | 'dashboard' | 'diseases' | 'ask') => void;
}

export const DesignShowcasePage: React.FC<DesignShowcasePageProps> = ({ onNavigate }) => {
  const [selectedStyleId, setSelectedStyleId] = useState<DesignStyleId>('apple-clean');
  const [activeCategory, setActiveCategory] = useState<'all' | 'minimal' | 'editorial' | 'cyber' | 'bold' | 'experimental'>('all');
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const filteredStyles = STYLES_CATALOG.filter(
    (s) => activeCategory === 'all' || s.category === activeCategory
  );

  const activeStyle = STYLES_CATALOG.find((s) => s.id === selectedStyleId) || STYLES_CATALOG[0];

  const handleCopyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedToken(color);
    setTimeout(() => setCopiedToken(null), 1500);
  };

  return (
    <div className="min-h-screen bg-[#0A0C10] text-white selection:bg-[#0082FF] selection:text-white pb-32">
      {/* ── Studio Top Header Bar ──────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-[#0A0C10]/95 backdrop-blur-2xl border-b border-white/10 px-4 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#0082FF] to-[#DE322D] flex items-center justify-center text-white font-black text-sm shadow-lg shadow-[#0082FF]/30">
            ✦
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-white font-sans">
                IKOLI AI
              </span>
              <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-white/10 text-[#00D2FF] border border-white/10">
                15 Design Archetypes Studio
              </span>
            </div>
            <p className="text-[11px] text-gray-400 font-mono hidden sm:block">
              Interactive Design System Benchmark & Comprehensive Style Explorer
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('home')}
          className="text-xs font-mono font-bold px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer flex items-center gap-2"
        >
          <span>Back to Hub</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </header>

      {/* ── Filter Tabs & Style Switcher Carousel ───────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 space-y-4">
        
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-mono text-gray-400 flex items-center gap-1.5 mr-2 shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span>Category:</span>
          </span>
          {[
            { id: 'all', label: 'All 15 Styles' },
            { id: 'minimal', label: 'Minimal & Spatial' },
            { id: 'editorial', label: 'Editorial & Archival' },
            { id: 'cyber', label: 'Dark & Cyber-SaaS' },
            { id: 'bold', label: 'Bold & Graphic' },
            { id: 'experimental', label: 'Experimental & Glass' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-white text-[#0A0C10] shadow-md'
                  : 'bg-[#181C26] text-gray-400 hover:text-white border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 15 Styles Grid Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {filteredStyles.map((s) => {
            const isSelected = selectedStyleId === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setSelectedStyleId(s.id)}
                className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between gap-2 relative overflow-hidden group ${
                  isSelected
                    ? 'bg-white text-black border-white shadow-xl scale-[1.02] ring-2 ring-[#0082FF]'
                    : 'bg-[#161A23] text-gray-300 border-white/10 hover:border-white/20 hover:bg-[#1E2330]'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`text-[10px] font-mono font-black ${
                    isSelected ? 'text-[#0082FF]' : 'text-gray-500 group-hover:text-gray-300'
                  }`}>
                    {s.number}
                  </span>
                  {/* Swatch dots */}
                  <div className="flex -space-x-1">
                    {s.colors.slice(0, 3).map((c, i) => (
                      <div
                        key={i}
                        style={{ backgroundColor: c }}
                        className="w-3 h-3 rounded-full border border-black/30 shadow-xs"
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-extrabold line-clamp-1 leading-tight">{s.name}</div>
                  <div className={`text-[9px] font-mono truncate mt-0.5 ${
                    isSelected ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {s.badge}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Active Style Metadata Bar ───────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 my-6">
        <div className="bg-[#161B26] border border-white/10 rounded-3xl p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-mono font-black px-2.5 py-0.5 rounded-full bg-[#0082FF]/20 text-[#00D2FF] border border-[#0082FF]/30">
                Style {activeStyle.number} of 15
              </span>
              <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">
                {activeStyle.badge}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
              {activeStyle.name}
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
              {activeStyle.desc}
            </p>
            <div className="pt-1 flex items-center gap-4 text-[11px] font-mono text-gray-400">
              <span>Typography: <strong className="text-white">{activeStyle.fonts}</strong></span>
            </div>
          </div>

          {/* Copyable Palette Chips */}
          <div className="space-y-2 shrink-0">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400 block">
              Color Tokens (Click to copy)
            </span>
            <div className="flex items-center gap-2">
              {activeStyle.colors.map((color, i) => (
                <button
                  key={i}
                  onClick={() => handleCopyColor(color)}
                  title={`Copy ${color}`}
                  style={{ backgroundColor: color }}
                  className="w-8 h-8 rounded-xl border border-white/20 shadow-md cursor-pointer hover:scale-115 transition-transform flex items-center justify-center text-[9px] font-mono font-black relative"
                >
                  {copiedToken === color && (
                    <span className="absolute -top-7 bg-black text-white text-[9px] px-2 py-0.5 rounded shadow-xl font-mono whitespace-nowrap z-30">
                      Copied!
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── LIVE RENDERED STYLE MOCKUP SECTION ───────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStyle.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="w-full"
          >

            {/* ========================================================== */}
            {/* 1. APPLE CLEAN / SPATIAL MINIMALIST                        */}
            {/* ========================================================== */}
            {activeStyle.id === 'apple-clean' && (
              <div className="bg-[#F5F5F7] text-[#1D1D1F] rounded-[36px] p-6 sm:p-10 md:p-12 border border-black/5 shadow-2xl space-y-10 font-sans">
                {/* Navbar Dock */}
                <nav className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs">
                      ✦
                    </div>
                    <span className="font-extrabold text-base tracking-tight">IKOLI Vision</span>
                  </div>

                  <div className="hidden md:flex items-center gap-1 bg-white/90 backdrop-blur-md p-1.5 rounded-full border border-black/5 shadow-xs text-xs font-semibold">
                    <span className="bg-[#1D1D1F] text-white px-4 py-1.5 rounded-full">Home</span>
                    <span className="px-4 py-1.5 rounded-full text-gray-500 hover:text-black transition-colors cursor-pointer">Surveillance</span>
                    <span className="px-4 py-1.5 rounded-full text-gray-500 hover:text-black transition-colors cursor-pointer">Diseases</span>
                    <span className="px-4 py-1.5 rounded-full text-gray-500 hover:text-black transition-colors cursor-pointer">Governance</span>
                  </div>

                  <button className="bg-[#0071E3] hover:bg-[#0077ED] text-white px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer">
                    <span>Ask Ikoli</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </nav>

                {/* Hero Section with High-Res Image */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
                  <div className="lg:col-span-7 space-y-5 text-left">
                    <span className="inline-block text-xs font-bold text-[#0071E3] bg-[#0071E3]/10 px-3 py-1 rounded-full">
                      Nigeria Skin NTD Public Health Intelligence
                    </span>
                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.08] text-[#1D1D1F]">
                      Clinical Clarity. <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0071E3] to-[#5856D6]">
                        Epidemiological Scale.
                      </span>
                    </h1>
                    <p className="text-base text-gray-600 max-w-lg leading-relaxed">
                      Autonomous clinical staging and surveillance for Leprosy, Buruli Ulcer, and Yaws across 36 states with zero patient biometric storage.
                    </p>
                    <div className="flex items-center gap-3 pt-2">
                      <button className="bg-[#0071E3] hover:bg-[#0077ED] text-white px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg transition-all cursor-pointer">
                        Start Screening
                      </button>
                      <button className="bg-white hover:bg-gray-100 text-[#1D1D1F] border border-black/10 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-xs transition-all cursor-pointer">
                        National Telemetry
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-5 relative">
                    <img
                      src={activeStyle.heroImage}
                      alt="Clinical Staging Vision"
                      className="w-full h-80 sm:h-96 object-cover rounded-3xl shadow-xl border border-black/5"
                    />
                    <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-black/5 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-gray-500 uppercase block">Treatment Completion</span>
                        <span className="text-lg font-black text-[#1D1D1F]">89.2% MDT Rate</span>
                      </div>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                        WHO 2030 Target
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3-Card Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                  <div className="bg-white p-6 rounded-3xl shadow-sm border border-black/5 space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#0071E3]/10 flex items-center justify-center text-[#0071E3]">
                      <Activity className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-base text-[#1D1D1F]">Multimodal Vision Model</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Instant neural classification for Category I-III Buruli Ulcers, PB/MB Leprosy, and Yaws papilloma.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-3xl shadow-sm border border-black/5 space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#5856D6]/10 flex items-center justify-center text-[#5856D6]">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-base text-[#1D1D1F]">Zero-PII Tokenization</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Client-side encryption ensures patient facial biometrics and coordinates are never stored.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-3xl shadow-sm border border-black/5 space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-base text-[#1D1D1F]">FMoHSW & DHIS2 Sync</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Automated telemetry transmission into the National Leprosy & Buruli Ulcer Control Programme.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================== */}
            {/* 2. WARM EDITORIAL / SWISS ARCHIVAL                         */}
            {/* ========================================================== */}
            {activeStyle.id === 'warm-editorial' && (
              <div className="bg-[#F4F0E7] text-[#0A0C10] rounded-[36px] p-6 sm:p-10 md:p-12 border border-[#263D35]/20 shadow-2xl space-y-10 font-serif" style={{ fontFamily: "'DM Serif Display', serif" }}>
                {/* Navbar */}
                <nav className="flex items-center justify-between border-b border-[#263D35]/15 pb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#263D35] flex items-center justify-center text-[#F4F0E7] font-bold text-base">
                      I
                    </div>
                    <div>
                      <span className="font-black text-xl text-[#263D35] leading-none block">IKOLI AI</span>
                      <span className="text-[9px] font-mono text-[#A85D3A] font-bold uppercase tracking-widest block font-sans mt-0.5">
                        National Surveillance Archive
                      </span>
                    </div>
                  </div>

                  <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-[#263D35] font-sans">
                    <span className="text-[#DE322D] border-b-2 border-[#DE322D] pb-1 cursor-pointer">01 / Overview</span>
                    <span className="hover:text-[#DE322D] transition-colors cursor-pointer">02 / Telemetry</span>
                    <span className="hover:text-[#DE322D] transition-colors cursor-pointer">03 / Target NTDs</span>
                    <span className="hover:text-[#DE322D] transition-colors cursor-pointer">04 / Governance</span>
                  </div>

                  <button className="bg-[#263D35] hover:bg-[#1E302A] text-[#F4F0E7] px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 font-sans transition-all cursor-pointer">
                    <span>Clinical Portal</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#C9A45C]" />
                  </button>
                </nav>

                {/* Hero */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
                  <div className="lg:col-span-7 space-y-5 text-left font-sans">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#263D35]/10 text-[#263D35] text-[11px] font-mono font-bold uppercase tracking-widest">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#DE322D]" />
                      <span>FMoHSW & RedAid Nigeria Custodianship</span>
                    </div>
                    <h1 className="font-serif text-4xl sm:text-6xl font-normal leading-[1.04] text-[#0A0C10]" style={{ fontFamily: "'DM Serif Display', serif" }}>
                      Autonomous Surveillance, <br />
                      <span className="italic text-[#263D35]">Preserving Patient Dignity.</span>
                    </h1>
                    <p className="text-base text-[#0A0C10]/80 leading-relaxed max-w-lg font-sans">
                      A federated public health intelligence platform advancing early diagnosis and disability prevention across Nigeria's 36 federation states.
                    </p>
                    <div className="flex items-center gap-4 pt-2">
                      <button className="bg-[#DE322D] hover:bg-[#B82521] text-white px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-2 transition-all cursor-pointer">
                        <span>Begin Staging Protocol</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button className="border border-[#263D35]/30 hover:bg-white text-[#263D35] px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer">
                        <span>Read WHO Framework</span>
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-5 relative">
                    <img
                      src={activeStyle.heroImage}
                      alt="Archival Surveillance"
                      className="w-full h-80 sm:h-96 object-cover rounded-3xl border border-[#263D35]/20 shadow-xl"
                    />
                    <div className="absolute top-4 right-4 bg-[#263D35] text-[#F4F0E7] px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider">
                      Archival Vault 2026
                    </div>
                  </div>
                </div>

                {/* Numbered Bento Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 font-sans">
                  <div className="bg-white p-6 rounded-3xl border border-[#263D35]/15 shadow-sm space-y-3">
                    <span className="font-mono text-xs font-bold text-[#A85D3A] block">01 / STAGING</span>
                    <h3 className="font-serif text-xl font-bold text-[#263D35]" style={{ fontFamily: "'DM Serif Display', serif" }}>
                      Buruli Ulcer PCR Protocol
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      IS2404 laboratory alignment with automated category staging (I, II, III).
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-3xl border border-[#263D35]/15 shadow-sm space-y-3">
                    <span className="font-mono text-xs font-bold text-[#A85D3A] block">02 / TREATMENT</span>
                    <h3 className="font-serif text-xl font-bold text-[#263D35]" style={{ fontFamily: "'DM Serif Display', serif" }}>
                      89.2% MDT Completion
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      6-month PB & 12-month MB multi-drug therapy tracking across primary health centers.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-3xl border border-[#263D35]/15 shadow-sm space-y-3">
                    <span className="font-mono text-xs font-bold text-[#A85D3A] block">03 / COMPLIANCE</span>
                    <h3 className="font-serif text-xl font-bold text-[#263D35]" style={{ fontFamily: "'DM Serif Display', serif" }}>
                      Zero-PII Encryption
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      SHA-256 field-level tokenization compliant with NDPR and WHO guidelines.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================== */}
            {/* 3. NEO-BRUTALIST / BOLD GRAPHIC POP                        */}
            {/* ========================================================== */}
            {activeStyle.id === 'neo-brutalist' && (
              <div className="bg-[#FFE600] text-black rounded-[28px] p-6 sm:p-10 md:p-12 border-4 border-black shadow-[10px_10px_0px_#000] space-y-10 font-sans" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {/* Navbar */}
                <nav className="flex items-center justify-between border-b-4 border-black pb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-black text-lg border-2 border-black shadow-[3px_3px_0px_#FFF]">
                      IK
                    </div>
                    <span className="font-black text-2xl uppercase tracking-tight">IKOLI.AI</span>
                  </div>

                  <div className="hidden md:flex items-center gap-3 text-xs font-black uppercase">
                    <span className="bg-black text-white px-4 py-2 border-2 border-black shadow-[2px_2px_0px_#000] cursor-pointer">
                      Home
                    </span>
                    <span className="bg-white text-black px-4 py-2 border-2 border-black shadow-[2px_2px_0px_#000] hover:bg-[#FF5C38] hover:text-white transition-colors cursor-pointer">
                      Dashboard
                    </span>
                    <span className="bg-white text-black px-4 py-2 border-2 border-black shadow-[2px_2px_0px_#000] hover:bg-[#00F0FF] transition-colors cursor-pointer">
                      Diseases
                    </span>
                  </div>

                  <button className="bg-[#FF5C38] text-white px-6 py-2.5 border-3 border-black font-black text-xs uppercase tracking-wider shadow-[4px_4px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer">
                    Launch Assistant ↗
                  </button>
                </nav>

                {/* Hero */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
                  <div className="lg:col-span-7 space-y-5 text-left">
                    <div className="inline-block bg-white text-black font-black text-xs uppercase px-3 py-1.5 border-2 border-black shadow-[3px_3px_0px_#000]">
                      ⚡ WHO 2030 NTD ELIMINATION TARGET
                    </div>
                    <h1 className="text-5xl sm:text-7xl font-black uppercase tracking-tight leading-[0.92] text-black">
                      ZERO NTD. <br />
                      <span className="bg-white px-3 border-3 border-black shadow-[6px_6px_0px_#000] inline-block mt-2">
                        ZERO COMPROMISE.
                      </span>
                    </h1>
                    <p className="text-base sm:text-lg font-bold text-black max-w-lg leading-snug">
                      Nigeria's autonomous Skin NTD diagnostic engine. 100% encrypted, 0% patient tracking across 36 states.
                    </p>
                    <div className="flex items-center gap-4 pt-2">
                      <button className="bg-black text-white px-8 py-4 border-3 border-black font-black text-xs uppercase tracking-wider shadow-[5px_5px_0px_#FF5C38] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer">
                        Start Screening Protocol
                      </button>
                      <button className="bg-white text-black px-7 py-4 border-3 border-black font-black text-xs uppercase tracking-wider shadow-[5px_5px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer">
                        State Telemetry
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-5 relative">
                    <img
                      src={activeStyle.heroImage}
                      alt="Neo-Brutalist NTD"
                      className="w-full h-80 sm:h-96 object-cover rounded-2xl border-4 border-black shadow-[8px_8px_0px_#000]"
                    />
                    <div className="absolute -bottom-4 -left-4 bg-[#00F0FF] text-black font-black text-xs px-4 py-2 border-3 border-black shadow-[4px_4px_0px_#000] uppercase">
                      89.2% MDT RATE
                    </div>
                  </div>
                </div>

                {/* 3 Hard Bento Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                  <div className="bg-white p-6 rounded-2xl border-4 border-black shadow-[6px_6px_0px_#000] space-y-3">
                    <div className="bg-[#FF5C38] text-white font-black text-xs px-2.5 py-1 w-fit border-2 border-black">
                      AI MODEL
                    </div>
                    <h3 className="font-black text-xl uppercase">Neural Staging</h3>
                    <p className="text-xs font-bold text-gray-800">
                      Category I/II/III Buruli Ulcer and PB/MB Leprosy detection.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border-4 border-black shadow-[6px_6px_0px_#000] space-y-3">
                    <div className="bg-[#00F0FF] text-black font-black text-xs px-2.5 py-1 w-fit border-2 border-black">
                      SECURITY
                    </div>
                    <h3 className="font-black text-xl uppercase">Zero-PII Vault</h3>
                    <p className="text-xs font-bold text-gray-800">
                      SHA-256 tokenization. No facial biometrics stored anywhere.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border-4 border-black shadow-[6px_6px_0px_#000] space-y-3">
                    <div className="bg-[#FFE600] text-black font-black text-xs px-2.5 py-1 w-fit border-2 border-black">
                      COVERAGE
                    </div>
                    <h3 className="font-black text-xl uppercase">36 States Telemetry</h3>
                    <p className="text-xs font-bold text-gray-800">
                      Real-time synchronized surveillance feeds across federation clinics.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================== */}
            {/* 4. NORDIC MINIMAL / ARCHITECTURAL SAND                     */}
            {/* ========================================================== */}
            {activeStyle.id === 'nordic-sand' && (
              <div className="bg-[#EAE6DF] text-[#2B2D2F] rounded-[36px] p-6 sm:p-10 md:p-12 border border-[#D5CFC4] shadow-2xl space-y-10 font-sans">
                {/* Navbar */}
                <nav className="flex items-center justify-between border-b border-[#2B2D2F]/10 pb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#2B2D2F] text-[#EAE6DF] flex items-center justify-center font-bold text-xs">
                      IK
                    </div>
                    <span className="font-bold text-base tracking-tight text-[#2B2D2F]">IKOLI • ARCHIVE</span>
                  </div>

                  <div className="hidden md:flex items-center gap-6 text-xs font-medium text-[#2B2D2F]/70">
                    <span className="text-[#2B2D2F] font-bold border-b border-[#2B2D2F] pb-0.5 cursor-pointer">Surveillance</span>
                    <span className="hover:text-[#2B2D2F] transition-colors cursor-pointer">Registry</span>
                    <span className="hover:text-[#2B2D2F] transition-colors cursor-pointer">Research</span>
                    <span className="hover:text-[#2B2D2F] transition-colors cursor-pointer">Governance</span>
                  </div>

                  <button className="bg-[#2B2D2F] text-[#EAE6DF] px-5 py-2 rounded-xl text-xs font-medium hover:bg-black transition-all cursor-pointer">
                    Consult Intelligence
                  </button>
                </nav>

                {/* Hero */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
                  <div className="lg:col-span-7 space-y-5 text-left">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#8C827A] block">
                      Autonomous Epidemiological Intelligence
                    </span>
                    <h1 className="text-4xl sm:text-6xl font-light tracking-tight leading-[1.08] text-[#1A1B1C]">
                      Quiet Precision for <br />
                      <span className="font-medium">Public Health Diagnostics.</span>
                    </h1>
                    <p className="text-sm text-[#2B2D2F]/80 max-w-lg leading-relaxed">
                      A serene, hardware-calibrated system screening neglected tropical diseases with strict biometric privacy across Nigeria.
                    </p>
                    <div className="flex items-center gap-3 pt-2">
                      <button className="bg-[#2B2D2F] hover:bg-black text-[#EAE6DF] px-6 py-3 rounded-xl text-xs font-medium transition-all cursor-pointer">
                        Access Platform
                      </button>
                      <button className="bg-transparent hover:bg-white/50 text-[#2B2D2F] border border-[#2B2D2F]/20 px-6 py-3 rounded-xl text-xs font-medium transition-all cursor-pointer">
                        Documentation
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-5 relative">
                    <img
                      src={activeStyle.heroImage}
                      alt="Nordic Minimal"
                      className="w-full h-80 sm:h-96 object-cover rounded-2xl border border-[#D5CFC4] shadow-md"
                    />
                  </div>
                </div>

                {/* 3 Sand Bento Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                  <div className="bg-[#F3EFE9] p-6 rounded-2xl border border-[#D5CFC4] space-y-2.5">
                    <span className="text-[10px] font-mono text-[#8C827A] uppercase">01 / Protocol</span>
                    <h3 className="font-semibold text-base text-[#1A1B1C]">Buruli Ulcer PCR</h3>
                    <p className="text-xs text-[#2B2D2F]/70 leading-relaxed">
                      IS2404 laboratory verification standard with clinical category classification.
                    </p>
                  </div>

                  <div className="bg-[#F3EFE9] p-6 rounded-2xl border border-[#D5CFC4] space-y-2.5">
                    <span className="text-[10px] font-mono text-[#8C827A] uppercase">02 / Outcome</span>
                    <h3 className="font-semibold text-base text-[#1A1B1C]">Disability Prevention</h3>
                    <p className="text-xs text-[#2B2D2F]/70 leading-relaxed">
                      Targeted &lt; 5% Grade-2 disability benchmark across federated clinics.
                    </p>
                  </div>

                  <div className="bg-[#F3EFE9] p-6 rounded-2xl border border-[#D5CFC4] space-y-2.5">
                    <span className="text-[10px] font-mono text-[#8C827A] uppercase">03 / Privacy</span>
                    <h3 className="font-semibold text-base text-[#1A1B1C]">Zero Biometrics</h3>
                    <p className="text-xs text-[#2B2D2F]/70 leading-relaxed">
                      Ephemeral zero-PII cryptographic hashing ensuring NDPR compliance.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================== */}
            {/* 5. REFRACTIVE LIQUID GLASS (TERRANOVA)                      */}
            {/* ========================================================== */}
            {activeStyle.id === 'terranova-glass' && (
              <div className="bg-[#081C15] text-[#E6FAF2] rounded-[36px] p-6 sm:p-10 md:p-12 border border-[#10B981]/30 shadow-2xl space-y-10 relative overflow-hidden font-sans">
                {/* Emerald Aura */}
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#10B981]/15 rounded-full blur-3xl pointer-events-none" />

                {/* Navbar */}
                <nav className="flex items-center justify-between bg-[#0F382B]/60 backdrop-blur-xl border border-[#10B981]/20 p-2.5 rounded-full max-w-3xl mx-auto shadow-2xl relative z-10">
                  <div className="flex items-center gap-2 pl-3">
                    <div className="w-7 h-7 rounded-full bg-[#10B981] text-[#081C15] flex items-center justify-center font-bold text-xs">
                      ✦
                    </div>
                    <span className="font-extrabold text-sm tracking-tight text-white">TERRANOVA • IKOLI</span>
                  </div>

                  <div className="hidden md:flex items-center gap-2 text-xs font-mono text-[#E6FAF2]/70">
                    <span className="bg-[#10B981]/20 text-[#10B981] px-3 py-1 rounded-full font-bold">Signals</span>
                    <span className="hover:text-white px-3 py-1 rounded-full transition-colors cursor-pointer">Deep Green</span>
                    <span className="hover:text-white px-3 py-1 rounded-full transition-colors cursor-pointer">Staging</span>
                  </div>

                  <button className="bg-[#10B981] hover:bg-[#059669] text-[#081C15] text-xs font-bold px-4 py-2 rounded-full flex items-center gap-1.5 transition-all shadow-lg shadow-[#10B981]/30 cursor-pointer">
                    <span>Clinical Console</span>
                    <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </nav>

                {/* Hero */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2 relative z-10">
                  <div className="lg:col-span-7 space-y-5 text-left">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#10B981] bg-[#10B981]/10 px-3 py-1 rounded-full border border-[#10B981]/20 inline-block">
                      Refractive Liquid Glass Architecture
                    </span>
                    <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.05] text-white">
                      Signals from the <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] via-[#00D2FF] to-white">
                        Deep Green.
                      </span>
                    </h1>
                    <p className="text-sm text-[#E6FAF2]/80 max-w-lg leading-relaxed">
                      Single-screen real-time refractive liquid-glass 2D canvas card with SVG chromatic dispersion and autonomous skin lesion diagnostic intelligence.
                    </p>
                    <div className="flex items-center gap-3 pt-2">
                      <button className="bg-[#10B981] hover:bg-[#059669] text-[#081C15] px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#10B981]/30 transition-all cursor-pointer">
                        Launch Refractive Card
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-5 relative">
                    <img
                      src={activeStyle.heroImage}
                      alt="Terranova Glass"
                      className="w-full h-80 sm:h-96 object-cover rounded-3xl border border-[#10B981]/30 shadow-2xl"
                    />
                  </div>
                </div>

                {/* 3 Glass Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 relative z-10">
                  <div className="bg-[#0F382B]/60 backdrop-blur-xl p-6 rounded-3xl border border-[#10B981]/20 shadow-lg space-y-2">
                    <span className="text-[10px] font-mono text-[#10B981] uppercase">Chromatics</span>
                    <h3 className="font-bold text-base text-white">Dispersion Filter</h3>
                    <p className="text-xs text-[#E6FAF2]/70 leading-relaxed">
                      SVG feColorMatrix real-time refraction distorting background light.
                    </p>
                  </div>

                  <div className="bg-[#0F382B]/60 backdrop-blur-xl p-6 rounded-3xl border border-[#10B981]/20 shadow-lg space-y-2">
                    <span className="text-[10px] font-mono text-[#10B981] uppercase">Staging</span>
                    <h3 className="font-bold text-base text-white">IS2404 PCR Match</h3>
                    <p className="text-xs text-[#E6FAF2]/70 leading-relaxed">
                      78.5% molecular confirmed Buruli Ulcer laboratory pipeline.
                    </p>
                  </div>

                  <div className="bg-[#0F382B]/60 backdrop-blur-xl p-6 rounded-3xl border border-[#10B981]/20 shadow-lg space-y-2">
                    <span className="text-[10px] font-mono text-[#10B981] uppercase">Trust</span>
                    <h3 className="font-bold text-base text-white">Zero-PII Standard</h3>
                    <p className="text-xs text-[#E6FAF2]/70 leading-relaxed">
                      Zero patient facial biometric storage across Nigerian health centers.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================== */}
            {/* 6. OBSIDIAN CYBER-SAAS (LINEAR/RAYCAST PRO)                */}
            {/* ========================================================== */}
            {activeStyle.id === 'obsidian-cyber' && (
              <div className="bg-[#0A0C10] text-white rounded-[36px] p-6 sm:p-10 md:p-12 border border-white/15 shadow-2xl space-y-10 font-sans relative overflow-hidden" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {/* Glow */}
                <div className="absolute top-0 left-1/3 w-96 h-96 bg-[#0082FF]/10 rounded-full blur-3xl pointer-events-none" />

                {/* Navbar */}
                <nav className="flex items-center justify-between bg-[#161B22]/80 backdrop-blur-xl border border-white/10 p-2 rounded-full max-w-3xl mx-auto shadow-2xl relative z-10">
                  <div className="flex items-center gap-2 pl-3">
                    <div className="w-7 h-7 rounded-full bg-[#0082FF]/20 border border-[#0082FF]/50 text-[#00D2FF] flex items-center justify-center font-bold text-xs">
                      ✦
                    </div>
                    <span className="font-black text-sm tracking-tight text-white">IKOLI <span className="text-[#0082FF]">AI</span></span>
                  </div>

                  <div className="hidden md:flex items-center gap-1 text-xs font-mono text-gray-400">
                    <span className="bg-white/10 text-white px-3.5 py-1.5 rounded-full font-bold">Home</span>
                    <span className="hover:text-white px-3.5 py-1.5 rounded-full transition-colors cursor-pointer">Dashboard</span>
                    <span className="hover:text-white px-3.5 py-1.5 rounded-full transition-colors cursor-pointer">Diseases</span>
                  </div>

                  <button className="bg-[#0082FF] hover:bg-[#0066CC] text-white text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2 transition-all shadow-lg shadow-[#0082FF]/30 cursor-pointer">
                    <span>Ask Ikoli</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </nav>

                {/* Hero */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2 relative z-10">
                  <div className="lg:col-span-7 space-y-5 text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0082FF] animate-ping" />
                      <span>312+ Telemetry Nodes Active • Zero-PII Standard</span>
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[0.95] text-white">
                      AUTONOMOUS <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0082FF] via-[#00D2FF] to-white">
                        CLINICAL VISION
                      </span>
                    </h1>
                    <p className="text-sm sm:text-base text-gray-400 max-w-lg leading-relaxed font-sans">
                      Deep learning skin lesion staging and epidemiological telemetry built to WHO Data Portal standards.
                    </p>
                    <div className="flex items-center gap-3 pt-2">
                      <button className="bg-[#0082FF] hover:bg-[#0066CC] text-white px-7 py-3 rounded-full text-xs font-extrabold uppercase font-mono tracking-wider shadow-lg shadow-[#0082FF]/30 transition-all cursor-pointer">
                        Start Screening
                      </button>
                      <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full text-xs font-bold uppercase font-mono tracking-wider border border-white/10 transition-all cursor-pointer">
                        Telemetry Hub
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-5 relative">
                    <img
                      src={activeStyle.heroImage}
                      alt="Cyber-SaaS Hero"
                      className="w-full h-80 sm:h-96 object-cover rounded-3xl border border-white/15 shadow-2xl"
                    />
                  </div>
                </div>

                {/* 3 Bento Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 relative z-10">
                  <div className="bg-[#121824]/90 p-5 rounded-2xl border border-white/10 space-y-2">
                    <span className="text-[10px] font-mono text-gray-400 uppercase">PCR Confirmation</span>
                    <div className="text-2xl font-black text-[#00D2FF]">78.5%</div>
                    <p className="text-[11px] text-gray-400">Buruli Ulcer IS2404 Verified</p>
                  </div>

                  <div className="bg-[#121824]/90 p-5 rounded-2xl border border-white/10 space-y-2">
                    <span className="text-[10px] font-mono text-gray-400 uppercase">MDT Completion</span>
                    <div className="text-2xl font-black text-emerald-400">89.2%</div>
                    <p className="text-[11px] text-gray-400">Leprosy Multidrug Treatment Protocol</p>
                  </div>

                  <div className="bg-[#121824]/90 p-5 rounded-2xl border border-white/10 space-y-2">
                    <span className="text-[10px] font-mono text-gray-400 uppercase">Security Vault</span>
                    <div className="text-2xl font-black text-purple-400">SHA-256</div>
                    <p className="text-[11px] text-gray-400">Zero facial biometrics persisted</p>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================== */}
            {/* 7. NOIR LUXURY / HIGH-FASHION GOLD                         */}
            {/* ========================================================== */}
            {activeStyle.id === 'noir-luxury' && (
              <div className="bg-[#0D0D0D] text-white rounded-[36px] p-6 sm:p-10 md:p-12 border border-[#D4AF37]/30 shadow-2xl space-y-10 font-serif" style={{ fontFamily: "'Playfair Display', serif" }}>
                {/* Navbar */}
                <nav className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-5">
                  <span className="font-serif font-black text-2xl tracking-widest text-[#D4AF37]">IKOLI</span>
                  <div className="hidden md:flex items-center gap-8 text-xs font-sans uppercase tracking-widest text-gray-400">
                    <span className="text-[#D4AF37] border-b border-[#D4AF37] pb-1">Archive</span>
                    <span className="hover:text-white transition-colors cursor-pointer">Surveillance</span>
                    <span className="hover:text-white transition-colors cursor-pointer">Registry</span>
                  </div>
                  <button className="border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black px-6 py-2 rounded-full text-xs font-sans uppercase tracking-widest transition-all cursor-pointer">
                    Enter Portal
                  </button>
                </nav>

                {/* Hero */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
                  <div className="lg:col-span-7 space-y-5 text-left font-serif">
                    <span className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#D4AF37] block">
                      The Haute Clinical Standard
                    </span>
                    <h1 className="text-4xl sm:text-6xl font-normal tracking-tight leading-[1.08] text-white">
                      Dignity in Staging. <br />
                      <span className="italic text-[#D4AF37]">Absolute Discretion.</span>
                    </h1>
                    <p className="text-sm font-sans text-gray-400 max-w-lg leading-relaxed">
                      Elevating neglected tropical disease surveillance into an art of mathematical precision and uncompromised privacy.
                    </p>
                    <div className="flex items-center gap-4 pt-2 font-sans">
                      <button className="bg-[#D4AF37] hover:bg-[#B3922D] text-black px-7 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer">
                        Explore Intelligence
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-5 relative">
                    <img
                      src={activeStyle.heroImage}
                      alt="Noir Luxury"
                      className="w-full h-80 sm:h-96 object-cover grayscale rounded-2xl border border-[#D4AF37]/30 shadow-2xl"
                    />
                  </div>
                </div>

                {/* 3 Luxury Bento Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 font-sans">
                  <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-[#D4AF37]/20 space-y-2">
                    <span className="text-[10px] font-mono text-[#D4AF37] uppercase">01 / PRECISION</span>
                    <h3 className="font-serif text-lg font-bold text-white">Gold Standard Staging</h3>
                    <p className="text-xs text-gray-400">Deep neural validation aligned with WHO 2030 targets.</p>
                  </div>
                  <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-[#D4AF37]/20 space-y-2">
                    <span className="text-[10px] font-mono text-[#D4AF37] uppercase">02 / PROTOCOL</span>
                    <h3 className="font-serif text-lg font-bold text-white">89.2% MDT Efficacy</h3>
                    <p className="text-xs text-gray-400">Treatment tracking across Nigerian state centers.</p>
                  </div>
                  <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-[#D4AF37]/20 space-y-2">
                    <span className="text-[10px] font-mono text-[#D4AF37] uppercase">03 / TRUST</span>
                    <h3 className="font-serif text-lg font-bold text-white">Zero Biometric Storage</h3>
                    <p className="text-xs text-gray-400">Full client-side SHA-256 field encryption.</p>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================== */}
            {/* 8. INDUSTRIAL CLINICAL TERMINAL (NASA/BLOOMBERG)           */}
            {/* ========================================================== */}
            {activeStyle.id === 'clinical-terminal' && (
              <div className="bg-[#0B1120] text-[#22C55E] rounded-[24px] p-6 sm:p-10 md:p-12 border-2 border-[#22C55E]/40 shadow-2xl space-y-8 font-mono">
                {/* Navbar */}
                <nav className="flex items-center justify-between border-b border-[#22C55E]/30 pb-4 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="animate-pulse">●</span>
                    <span className="font-black text-white">IKOLI_TERMINAL_V2.6</span>
                  </div>
                  <div className="hidden md:flex items-center gap-4 text-gray-400">
                    <span className="text-[#22C55E]">[SYS_ONLINE]</span>
                    <span>DHIS2_GATEWAY: ACTIVE</span>
                    <span>NODE_COUNT: 312</span>
                  </div>
                  <button className="bg-[#22C55E] text-[#0B1120] font-black px-4 py-1.5 rounded-sm hover:bg-[#16A34A] transition-all cursor-pointer">
                    QUERY_AI_DB ↗
                  </button>
                </nav>

                {/* Hero */}
                <div className="space-y-4 text-left">
                  <span className="text-xs text-[#F59E0B] bg-[#F59E0B]/10 px-2.5 py-0.5 border border-[#F59E0B]/30 inline-block">
                    FEDERAL_MINISTRY_HEALTH_SURVEILLANCE_MATRIX
                  </span>
                  <h1 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight leading-tight">
                    AUTONOMOUS_NTD_SENSOR_NETWORK
                  </h1>
                  <p className="text-xs text-gray-400 max-w-xl leading-relaxed">
                    Continuous multimodal classification telemetry across 36 Nigerian federation states. Zero patient identification records stored in accordance with NDPR-2026.
                  </p>
                </div>

                {/* Terminal Matrix Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="bg-[#111C33] p-4 border border-[#22C55E]/20 space-y-1">
                    <span className="text-gray-400">BURULI_PCR_RATE:</span>
                    <div className="text-2xl font-black text-white">78.5% CONFIRMED</div>
                    <span className="text-[#F59E0B] text-[10px]">IS2404_VALIDATION: PASS</span>
                  </div>
                  <div className="bg-[#111C33] p-4 border border-[#22C55E]/20 space-y-1">
                    <span className="text-gray-400">LEPROSY_MDT_RATE:</span>
                    <div className="text-2xl font-black text-[#22C55E]">89.2% COMPLETION</div>
                    <span className="text-emerald-400 text-[10px]">6/12MO_SCHEDULE: ON_TRACK</span>
                  </div>
                  <div className="bg-[#111C33] p-4 border border-[#22C55E]/20 space-y-1">
                    <span className="text-gray-400">DISABILITY_GRADE2:</span>
                    <div className="text-2xl font-black text-white">&lt; 4.8% BENCHMARK</div>
                    <span className="text-[#38BDF8] text-[10px]">TARGET_2030: MET</span>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================== */}
            {/* 9. SOFT CLAYMORPHISM / TACTILE 3D                          */}
            {/* ========================================================== */}
            {activeStyle.id === 'claymorphism' && (
              <div className="bg-[#EEF2F6] text-[#1E293B] rounded-[40px] p-6 sm:p-10 md:p-12 border border-white/80 shadow-[20px_20px_60px_#cad0db,-20px_-20px_60px_#ffffff] space-y-10 font-sans">
                {/* Navbar */}
                <nav className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-2xl bg-[#6366F1] text-white flex items-center justify-center font-bold text-sm shadow-[inset_2px_2px_4px_rgba(255,255,255,0.4)]">
                      ✦
                    </div>
                    <span className="font-extrabold text-base tracking-tight text-[#1E293B]">Ikoli Tactile</span>
                  </div>
                  <div className="hidden md:flex items-center gap-2 bg-[#EEF2F6] p-1.5 rounded-2xl shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff] text-xs font-bold text-gray-600">
                    <span className="bg-[#6366F1] text-white px-4 py-2 rounded-xl shadow-md">Overview</span>
                    <span className="px-4 py-2 rounded-xl hover:text-black transition-colors cursor-pointer">Surveillance</span>
                    <span className="px-4 py-2 rounded-xl hover:text-black transition-colors cursor-pointer">Diseases</span>
                  </div>
                  <button className="bg-[#6366F1] hover:bg-[#4F46E5] text-white px-5 py-2.5 rounded-2xl text-xs font-bold shadow-[4px_4px_10px_rgba(99,102,241,0.4)] transition-all cursor-pointer">
                    Ask Assistant
                  </button>
                </nav>

                {/* Hero */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
                  <div className="lg:col-span-7 space-y-5 text-left">
                    <span className="text-xs font-bold text-[#6366F1] bg-[#6366F1]/10 px-3 py-1 rounded-xl inline-block">
                      Soft & Friendly Clinical Health
                    </span>
                    <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.08] text-[#1E293B]">
                      Intuitive Care. <br />
                      <span className="text-[#6366F1]">Gentle Diagnostics.</span>
                    </h1>
                    <p className="text-sm text-gray-600 max-w-lg leading-relaxed font-medium">
                      Making neglected tropical disease screening approachable, humane, and deeply secure for all patients.
                    </p>
                  </div>
                  <div className="lg:col-span-5 relative">
                    <img
                      src={activeStyle.heroImage}
                      alt="Claymorphism"
                      className="w-full h-80 sm:h-96 object-cover rounded-3xl shadow-[12px_12px_30px_#cad0db,-12px_-12px_30px_#ffffff]"
                    />
                  </div>
                </div>

                {/* 3 Clay Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                  <div className="bg-[#EEF2F6] p-6 rounded-3xl shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff] space-y-2">
                    <h3 className="font-bold text-base text-[#1E293B]">Buruli Ulcer Protocol</h3>
                    <p className="text-xs text-gray-500">Early painless nodule detection saving limb mobility.</p>
                  </div>
                  <div className="bg-[#EEF2F6] p-6 rounded-3xl shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff] space-y-2">
                    <h3 className="font-bold text-base text-[#1E293B]">Leprosy Screening</h3>
                    <p className="text-xs text-gray-500">Hypopigmented patch and peripheral nerve assessment.</p>
                  </div>
                  <div className="bg-[#EEF2F6] p-6 rounded-3xl shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff] space-y-2">
                    <h3 className="font-bold text-base text-[#1E293B]">Zero-PII Safe</h3>
                    <p className="text-xs text-gray-500">End-to-end cryptographic patient privacy protection.</p>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================== */}
            {/* 10. RETRO-FUTURISTIC CYBER-Y2K / CHROME                    */}
            {/* ========================================================== */}
            {activeStyle.id === 'cyber-y2k' && (
              <div className="bg-[#0E0B16] text-white rounded-[32px] p-6 sm:p-10 md:p-12 border-2 border-[#A855F7]/50 shadow-[0_0_50px_rgba(168,85,247,0.3)] space-y-10 font-sans relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#A855F7]/20 rounded-full blur-3xl pointer-events-none" />

                {/* Navbar */}
                <nav className="flex items-center justify-between border-b border-[#A855F7]/30 pb-5 relative z-10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#A855F7] to-[#06B6D4] flex items-center justify-center text-black font-black text-sm">
                      ★
                    </div>
                    <span className="font-black text-lg tracking-widest bg-gradient-to-r from-white via-purple-200 to-[#A855F7] text-transparent bg-clip-text">
                      IKOLI.2000
                    </span>
                  </div>
                  <button className="bg-gradient-to-r from-[#A855F7] to-[#06B6D4] text-black font-black text-xs px-5 py-2 rounded-full uppercase tracking-wider shadow-lg hover:scale-105 transition-all cursor-pointer">
                    System Staging ↗
                  </button>
                </nav>

                {/* Hero */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2 relative z-10">
                  <div className="lg:col-span-7 space-y-5 text-left">
                    <span className="text-xs font-mono text-[#06B6D4] uppercase tracking-widest border border-[#06B6D4]/40 px-3 py-1 rounded-full bg-[#06B6D4]/10 inline-block">
                      ★ Cyber-Y2K Neural Engine
                    </span>
                    <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight leading-[0.95] text-white">
                      FUTURE SCAN <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] via-[#06B6D4] to-white">
                        HYPER-DIAGNOSIS
                      </span>
                    </h1>
                    <p className="text-sm text-gray-400 max-w-lg leading-relaxed">
                      Next-era multimodal dermatological screening matrix with encrypted decentralized patient registries.
                    </p>
                  </div>
                  <div className="lg:col-span-5 relative">
                    <img
                      src={activeStyle.heroImage}
                      alt="Cyber Y2K"
                      className="w-full h-80 sm:h-96 object-cover rounded-2xl border-2 border-[#A855F7]/50 shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================== */}
            {/* 11. JAPANESE ZEN / WABI-SABI NATURAL                       */}
            {/* ========================================================== */}
            {activeStyle.id === 'japanese-zen' && (
              <div className="bg-[#F7F5F0] text-[#2C302E] rounded-[36px] p-6 sm:p-10 md:p-12 border border-[#E3DDD3] shadow-xl space-y-10 font-serif">
                {/* Navbar */}
                <nav className="flex items-center justify-between border-b border-[#2C302E]/10 pb-5">
                  <span className="font-serif text-lg tracking-widest text-[#4A5D4E]">生 • IKOLI</span>
                  <div className="hidden md:flex items-center gap-8 text-xs font-sans text-gray-600">
                    <span className="text-[#4A5D4E] font-bold">Surveillance</span>
                    <span>Pathways</span>
                    <span>Dignity</span>
                  </div>
                  <button className="border border-[#4A5D4E] text-[#4A5D4E] hover:bg-[#4A5D4E] hover:text-white px-5 py-1.5 rounded-full text-xs font-sans transition-all cursor-pointer">
                    Consultation
                  </button>
                </nav>

                {/* Hero */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
                  <div className="lg:col-span-7 space-y-5 text-left">
                    <span className="text-xs font-sans uppercase tracking-widest text-[#8B7355] block">
                      Harmonious Public Health Care
                    </span>
                    <h1 className="text-4xl sm:text-6xl font-normal leading-[1.08] text-[#2C302E]">
                      Tranquil Wisdom. <br />
                      <span className="italic text-[#4A5D4E]">Restored Vitality.</span>
                    </h1>
                    <p className="text-sm font-sans text-gray-600 max-w-lg leading-relaxed">
                      Embracing patient dignity with natural clinical balance and zero identity residue.
                    </p>
                  </div>
                  <div className="lg:col-span-5">
                    <img
                      src={activeStyle.heroImage}
                      alt="Japanese Zen"
                      className="w-full h-80 sm:h-96 object-cover rounded-2xl border border-[#E3DDD3] shadow-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================== */}
            {/* 12. BENTO GRID SUPERCHARGED / MODULAR HUB                  */}
            {/* ========================================================== */}
            {activeStyle.id === 'bento-supercharged' && (
              <div className="bg-[#FAFAFA] text-[#18181B] rounded-[36px] p-6 sm:p-10 md:p-12 border border-[#E4E4E7] shadow-2xl space-y-8 font-sans">
                {/* Navbar */}
                <nav className="flex items-center justify-between bg-white p-3 rounded-2xl border border-[#E4E4E7] shadow-xs">
                  <div className="flex items-center gap-2.5 pl-2">
                    <div className="w-8 h-8 rounded-xl bg-[#2563EB] text-white flex items-center justify-center font-bold text-xs">
                      ✦
                    </div>
                    <span className="font-extrabold text-sm tracking-tight text-[#18181B]">IKOLI BENTO HUB</span>
                  </div>
                  <button className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer">
                    Launch Assistant
                  </button>
                </nav>

                {/* Modular Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-8 bg-white p-6 rounded-3xl border border-[#E4E4E7] shadow-xs space-y-4">
                    <span className="text-xs font-bold text-[#2563EB] bg-blue-50 px-3 py-1 rounded-full">
                      National Surveillance Hub
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#18181B]">
                      Skin NTD Diagnostics <br />
                      Built into Modular Bento Blocks.
                    </h2>
                    <p className="text-xs text-gray-500 max-w-md">
                      Autonomous classification for Buruli Ulcer, Leprosy, and Yaws with zero patient tracking.
                    </p>
                  </div>

                  <div className="md:col-span-4 bg-white p-6 rounded-3xl border border-[#E4E4E7] shadow-xs flex flex-col justify-between">
                    <span className="text-xs font-mono text-gray-400 uppercase">MDT Completion</span>
                    <div className="text-4xl font-black text-[#2563EB]">89.2%</div>
                    <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded-md w-fit">
                      +4.1% Above Target
                    </span>
                  </div>

                  <div className="md:col-span-4 bg-white p-6 rounded-3xl border border-[#E4E4E7] shadow-xs space-y-2">
                    <span className="text-xs font-mono text-gray-400 uppercase">PCR Validation</span>
                    <div className="text-2xl font-bold text-[#18181B]">78.5% Confirmed</div>
                    <p className="text-[11px] text-gray-500">Buruli Ulcer IS2404 Laboratory Verified</p>
                  </div>

                  <div className="md:col-span-4 bg-white p-6 rounded-3xl border border-[#E4E4E7] shadow-xs space-y-2">
                    <span className="text-xs font-mono text-gray-400 uppercase">Disability Prevention</span>
                    <div className="text-2xl font-bold text-emerald-600">&lt; 4.8% Grade-2</div>
                    <p className="text-[11px] text-gray-500">WHO 2030 Disability Benchmark</p>
                  </div>

                  <div className="md:col-span-4 bg-[#18181B] text-white p-6 rounded-3xl shadow-md space-y-2">
                    <span className="text-xs font-mono text-gray-400 uppercase">Security Vault</span>
                    <div className="text-2xl font-bold text-[#60A5FA]">Zero-PII</div>
                    <p className="text-[11px] text-gray-400">SHA-256 field encryption standard</p>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================== */}
            {/* 13. BIOPHILIC BOTANICAL / DEEP JUNGLE                      */}
            {/* ========================================================== */}
            {activeStyle.id === 'biophilic-botanical' && (
              <div className="bg-[#091A14] text-[#A7F3D0] rounded-[36px] p-6 sm:p-10 md:p-12 border border-[#10B981]/30 shadow-2xl space-y-10 font-sans">
                <nav className="flex items-center justify-between border-b border-[#10B981]/20 pb-5">
                  <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-2">
                    <span className="text-[#10B981]">🌿</span> IKOLI BIO-CARE
                  </span>
                  <button className="bg-[#10B981] hover:bg-[#059669] text-[#091A14] font-bold text-xs px-5 py-2.5 rounded-full transition-all cursor-pointer">
                    Clinical Assistant ↗
                  </button>
                </nav>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4 text-left">
                    <span className="text-xs font-mono uppercase text-[#10B981] tracking-widest">
                      Biological Healthcare Intelligence
                    </span>
                    <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
                      Restoring Skin Health <br />
                      <span className="text-[#10B981]">Naturally at Scale.</span>
                    </h1>
                    <p className="text-sm text-gray-300 max-w-lg">
                      Deep learning pathology detection modeled on biological cellular healing principles.
                    </p>
                  </div>
                  <div className="lg:col-span-5">
                    <img src={activeStyle.heroImage} alt="Botanical" className="w-full h-80 object-cover rounded-3xl border border-[#10B981]/30" />
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================== */}
            {/* 14. MONOCHROME DUOTONE / BROADSIDE PRINT                   */}
            {/* ========================================================== */}
            {activeStyle.id === 'duotone-print' && (
              <div className="bg-[#FAFAFA] text-[#111111] rounded-[24px] p-6 sm:p-10 md:p-12 border-2 border-black shadow-2xl space-y-8 font-serif" style={{ fontFamily: "'DM Serif Display', serif" }}>
                <nav className="flex items-center justify-between border-b-2 border-black pb-4 font-sans">
                  <span className="font-black text-xl tracking-tighter uppercase">THE IKOLI CHRONICLE</span>
                  <span className="text-xs font-mono font-bold bg-black text-white px-3 py-1">VOL. 2026</span>
                </nav>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4 text-left">
                    <span className="text-xs font-mono font-bold text-[#E11D48] uppercase tracking-widest font-sans">
                      SPECIAL REPORT: NATIONAL NTD SURVEILLANCE
                    </span>
                    <h1 className="text-4xl sm:text-6xl font-normal leading-[0.98] tracking-tight">
                      AUTONOMOUS CLINICAL INTELLIGENCE DEPLOYED ACROSS 36 STATES.
                    </h1>
                    <p className="text-sm font-sans text-gray-700 leading-relaxed max-w-lg">
                      Nigeria's national leprosy, Buruli ulcer, and Yaws elimination protocol achieves historic treatment completion benchmark under strict privacy protocols.
                    </p>
                  </div>
                  <div className="lg:col-span-5">
                    <img src={activeStyle.heroImage} alt="Duotone Print" className="w-full h-80 object-cover grayscale contrast-150 rounded-lg border-2 border-black" />
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================== */}
            {/* 15. AURORA HOLOGRAPHIC / FLUID LUMINOUS                    */}
            {/* ========================================================== */}
            {activeStyle.id === 'aurora-holographic' && (
              <div className="bg-[#0F0C20] text-white rounded-[36px] p-6 sm:p-10 md:p-12 border border-purple-500/30 shadow-[0_0_60px_rgba(236,72,153,0.2)] space-y-10 font-sans relative overflow-hidden">
                <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#EC4899]/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#8B5CF6]/20 rounded-full blur-3xl pointer-events-none" />

                <nav className="flex items-center justify-between bg-white/5 backdrop-blur-xl p-3 rounded-full border border-white/10 relative z-10">
                  <div className="flex items-center gap-2 pl-3">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] flex items-center justify-center text-white text-xs font-bold">
                      ✦
                    </div>
                    <span className="font-black text-sm tracking-tight bg-gradient-to-r from-white via-pink-200 to-[#EC4899] text-transparent bg-clip-text">
                      IKOLI AURORA
                    </span>
                  </div>
                  <button className="bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] text-white text-xs font-bold px-5 py-2 rounded-full shadow-lg shadow-pink-500/30 hover:scale-105 transition-all cursor-pointer">
                    Ask Assistant
                  </button>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2 relative z-10">
                  <div className="lg:col-span-7 space-y-5 text-left">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#EC4899] bg-[#EC4899]/10 px-3 py-1 rounded-full border border-[#EC4899]/30 inline-block">
                      Multi-Spectral Diagnostic Canvas
                    </span>
                    <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.02] text-white">
                      Luminous Precision. <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#06B6D4]">
                        Next-Gen Health.
                      </span>
                    </h1>
                    <p className="text-sm text-gray-300 max-w-lg leading-relaxed">
                      Vibrant holographic telemetry bringing neglected tropical disease staging into radiant focus.
                    </p>
                  </div>
                  <div className="lg:col-span-5 relative">
                    <img src={activeStyle.heroImage} alt="Aurora" className="w-full h-80 sm:h-96 object-cover rounded-3xl border border-pink-500/30 shadow-2xl" />
                  </div>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Selection Call-to-Action Footer ──────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-16 text-center">
        <div className="bg-[#161A24] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
          <div className="w-10 h-10 rounded-2xl bg-[#0082FF]/20 text-[#00D2FF] flex items-center justify-center font-black mx-auto">
            ✓
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-white">
            Choose Your Platform Default Style
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 max-w-lg mx-auto leading-relaxed">
            Which number between <strong>01 to 15</strong> do you want as the primary theme for Ikoli AI? Tell me your choice and I will adapt all pages to match that exact design system!
          </p>
        </div>
      </div>

    </div>
  );
};
