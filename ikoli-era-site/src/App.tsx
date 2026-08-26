import { useState, useEffect } from 'react';
import { HeroSection } from './components/HeroSection';
import { PartnerRow } from './components/PartnerRow';
import { SpotlightMetrics } from './components/SpotlightMetrics';
import { FeaturesShowcase } from './components/FeaturesShowcase';
import { DiseasesSection } from './components/DiseasesSection';
import { ProjectsCaseStudiesSection } from './components/ProjectsCaseStudiesSection';
import { Footer } from './components/Footer';
import { DiseasesPage } from './pages/DiseasesPage';
import { AskIkoliPage } from './pages/AskIkoliPage';
import { DashboardPage } from './pages/DashboardPage';

export function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'dashboard' | 'diseases' | 'ask'>('home');

  // Sync with window.location.hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#dashboard') {
        setCurrentPage('dashboard');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#ask') {
        setCurrentPage('ask');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#diseases') {
        setCurrentPage('diseases');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#home' || hash === '') {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: 'home' | 'dashboard' | 'diseases' | 'ask') => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 1. Dedicated State Surveillance Intelligence Dashboard Page
  if (currentPage === 'dashboard') {
    return (
      <div className="min-h-screen bg-white text-[#0A0C10] font-sans selection:bg-[#0082FF] selection:text-white">
        <DashboardPage onNavigate={handleNavigate} />
      </div>
    );
  }

  // 2. Dedicated Ask Ikoli Page (Hands Creation Scroll Sequence + Clinical Console)
  if (currentPage === 'ask') {
    return (
      <div className="min-h-screen bg-[#06080D] selection:bg-[#0082FF] selection:text-white font-sans">
        <AskIkoliPage onNavigate={handleNavigate} />
      </div>
    );
  }

  // 3. Dedicated Target Diseases Registry Page
  if (currentPage === 'diseases') {
    return (
      <div className="min-h-screen bg-white text-[#0A0C10] font-sans selection:bg-[#0082FF] selection:text-white">
        <DiseasesPage onNavigate={handleNavigate} />
      </div>
    );
  }

  // 4. Main Home Experience (Interactive 2.5D Android Robot + Capabilities + Case Studies)
  return (
    <main className="w-full min-h-screen bg-white text-[#0A0C10] font-sans selection:bg-[#0082FF] selection:text-white">
      {/* Main Page Content Curtain Layer (z-10 bg-white relative) */}
      <div className="relative z-10 bg-white shadow-2xl">
        {/* 1. Hero Section */}
        <HeroSection
          currentPage="home"
          onNavigate={handleNavigate}
        />

        {/* 2. Partner Marquee Row */}
        <PartnerRow />

        {/* 3. Spotlight & Core Indicators */}
        <SpotlightMetrics />

        {/* 4. Intelligent Capabilities / Features Showcase */}
        <FeaturesShowcase />

        {/* 5. Target Diseases & Clinical Staging Section */}
        <DiseasesSection onOpenDiseases={() => handleNavigate('diseases')} />

        {/* 6. Projects / Case Studies Section */}
        <ProjectsCaseStudiesSection />
      </div>

      {/* 7. Sticky Reveal Curtain Footer */}
      <Footer onNavigate={handleNavigate} />
    </main>
  );
}

export default App;
