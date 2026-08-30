import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CinematicHeroFrame } from '../components/dashboard/CinematicHeroFrame';
import { SurveillanceHubConsole } from '../components/dashboard/SurveillanceHubConsole';

interface DashboardPageProps {
  onNavigate: (page: 'home' | 'dashboard' | 'diseases' | 'ask' | 'about' | 'styles' | 'api') => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#FBFBFD] text-[#1D1D1F] font-sans antialiased selection:bg-[#0071E3] selection:text-white">
      
      {/* ── Fixed Clean Capsule Navbar ─────────────────────────────────── */}
      <Navbar currentPage="dashboard" onNavigate={onNavigate} />

      {/* ── Layer 1: Pinned Scroll Cinematic Sequence ──────────────────── */}
      <CinematicHeroFrame
        onExplore={() => onNavigate('diseases')}
      />

      {/* ── Layer 2: Main Surveillance Console ─────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
        <SurveillanceHubConsole />
      </div>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <Footer onNavigate={onNavigate} />

    </div>
  );
};
