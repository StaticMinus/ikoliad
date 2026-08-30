import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { HeroSection } from './components/HeroSection';
import { SpotlightMetrics } from './components/SpotlightMetrics';
import { FeaturesShowcase } from './components/FeaturesShowcase';
import { DiseasesSection } from './components/DiseasesSection';
import { ProjectsCaseStudiesSection } from './components/ProjectsCaseStudiesSection';
import { Footer } from './components/Footer';
import { DiseasesPage } from './pages/DiseasesPage';
import { AskIkoliPage } from './pages/AskIkoliPage';
import { DashboardPage } from './pages/DashboardPage';
import { AboutPage } from './pages/AboutPage';
import { ApiDocsPage } from './pages/ApiDocsPage';
import { DesignShowcasePage } from './pages/DesignShowcasePage';
import { ProtocolsPage } from './pages/ProtocolsPage';
import { SmoothScroll } from './components/SmoothScroll';
import { PageTransition } from './components/PageTransition';

export type NavPage = 'home' | 'dashboard' | 'diseases' | 'ask' | 'about' | 'styles' | 'api' | 'protocols';

export function App() {
  const [currentPage, setCurrentPage] = useState<NavPage>('home');

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
      } else if (hash === '#about') {
        setCurrentPage('about');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#protocols' || hash === '#governance') {
        setCurrentPage('protocols');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#api' || hash === '#docs') {
        setCurrentPage('api');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#styles' || hash === '#design') {
        setCurrentPage('styles');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: NavPage) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence mode="wait">
      {/* 0. Dedicated Design Style Explorer Studio Page */}
      {currentPage === 'styles' && (
        <PageTransition key="styles" pageKey="styles">
          <SmoothScroll>
            <DesignShowcasePage onNavigate={handleNavigate} />
          </SmoothScroll>
        </PageTransition>
      )}

      {/* 1. Dedicated State Surveillance Intelligence Dashboard Page */}
      {currentPage === 'dashboard' && (
        <PageTransition key="dashboard" pageKey="dashboard">
          <SmoothScroll>
            <div className="min-h-screen bg-white text-[#0A0C10] font-sans selection:bg-[#0082FF] selection:text-white relative">
              <DashboardPage onNavigate={handleNavigate} />
            </div>
          </SmoothScroll>
        </PageTransition>
      )}

      {/* 2. Dedicated Ask Ikoli Page (Clinical AI Workspace) */}
      {currentPage === 'ask' && (
        <PageTransition key="ask" pageKey="ask">
          <div className="min-h-screen bg-[#FBFBFD] selection:bg-[#0082FF] selection:text-white font-sans relative">
            <AskIkoliPage onNavigate={handleNavigate} />
          </div>
        </PageTransition>
      )}

      {/* 3. Dedicated Target Diseases Registry Page */}
      {currentPage === 'diseases' && (
        <PageTransition key="diseases" pageKey="diseases">
          <SmoothScroll>
            <div className="min-h-screen bg-white text-[#0A0C10] font-sans selection:bg-[#0082FF] selection:text-white relative">
              <DiseasesPage onNavigate={handleNavigate} />
            </div>
          </SmoothScroll>
        </PageTransition>
      )}

      {/* 4. Dedicated Developer API Platform Documentation Page */}
      {currentPage === 'api' && (
        <PageTransition key="api" pageKey="api">
          <SmoothScroll>
            <div className="min-h-screen bg-[#FAFAFC] text-[#0A0C10] font-sans selection:bg-[#0082FF] selection:text-white relative">
              <ApiDocsPage onNavigate={handleNavigate} />
            </div>
          </SmoothScroll>
        </PageTransition>
      )}

      {/* 5. Dedicated About Us & Governance Page (Editorial Art Money Architecture) */}
      {currentPage === 'about' && (
        <PageTransition key="about" pageKey="about">
          <SmoothScroll>
            <div className="min-h-screen bg-white text-[#0A0C10] font-sans selection:bg-[#0082FF] selection:text-white relative">
              <AboutPage onNavigate={handleNavigate} />
            </div>
          </SmoothScroll>
        </PageTransition>
      )}

      {/* 5b. National Guidelines, Zero-PII Protocols & Safeguarding Platform */}
      {currentPage === 'protocols' && (
        <PageTransition key="protocols" pageKey="protocols">
          <SmoothScroll>
            <div className="min-h-screen bg-white text-[#0A0C10] font-sans selection:bg-[#0082FF] selection:text-white relative">
              <ProtocolsPage onNavigate={handleNavigate} />
            </div>
          </SmoothScroll>
        </PageTransition>
      )}

      {/* 6. Main Home Experience */}
      {currentPage === 'home' && (
        <PageTransition key="home" pageKey="home">
          <SmoothScroll>
            <main className="w-full min-h-screen bg-white text-[#0A0C10] font-sans selection:bg-[#0082FF] selection:text-white relative">
              <div className="relative z-10 bg-white shadow-2xl">
                {/* 1. Hero Section */}
                <HeroSection
                  currentPage="home"
                  onNavigate={handleNavigate}
                />

                {/* 2. Spotlight & Core Indicators */}
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
          </SmoothScroll>
        </PageTransition>
      )}
    </AnimatePresence>
  );
}

export default App;
