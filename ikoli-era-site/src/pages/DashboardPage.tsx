import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CinematicHeroFrame } from '../components/dashboard/CinematicHeroFrame';
import { SurveillanceHubConsole } from '../components/dashboard/SurveillanceHubConsole';

interface DashboardPageProps {
  onNavigate: (page: 'home' | 'dashboard' | 'diseases' | 'ask' | 'about') => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] font-sans antialiased selection:bg-[#0071E3] selection:text-white">
      {/* ── Fixed Navigation Bar ────────────────────────────────────────── */}
      <div className="sticky top-0 z-50">
        <Navbar currentPage="dashboard" onNavigate={onNavigate as any} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 py-8 sm:py-12 space-y-12 sm:space-y-16">
        
        {/* ══════════════════════════════════════════════════════════════════════
            LAYER 1: PINNED / FROZEN SCROLL CINEMATIC HERO SECTION
        ══════════════════════════════════════════════════════════════════════ */}
        <CinematicHeroFrame
          onExplore={() => onNavigate('diseases')}
        />

        {/* ══════════════════════════════════════════════════════════════════════
            LAYER 2: MAIN SURVEILLANCE HUB CONSOLE (Unified All-in-One Dashboard)
        ══════════════════════════════════════════════════════════════════════ */}
        <SurveillanceHubConsole />

      </div>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <Footer onNavigate={onNavigate as any} />
    </div>
  );
};
