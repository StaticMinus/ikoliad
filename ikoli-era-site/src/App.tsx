import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
import { AboutPage } from './pages/AboutPage';
import { DesignShowcasePage } from './pages/DesignShowcasePage';
import { SmoothScroll } from './components/SmoothScroll';

export function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'dashboard' | 'diseases' | 'ask' | 'about' | 'styles'>('home');

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
      } else if (hash === '#styles' || hash === '#design') {
        setCurrentPage('styles');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#home' || hash === '') {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: 'home' | 'dashboard' | 'diseases' | 'ask' | 'about' | 'styles') => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pageTransitionVariants = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
  };

  const pageTransitionConfig = {
    duration: 0.35,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  };

  return (
    <AnimatePresence mode="wait">
      {/* 0. Dedicated Design Style Explorer Studio Page */}
      {currentPage === 'styles' && (
        <motion.div
          key="styles"
          variants={pageTransitionVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={pageTransitionConfig}
          className="w-full"
        >
          <SmoothScroll>
            <DesignShowcasePage onNavigate={handleNavigate} />
          </SmoothScroll>
        </motion.div>
      )}

      {/* 1. Dedicated State Surveillance Intelligence Dashboard Page */}
      {currentPage === 'dashboard' && (
        <motion.div
          key="dashboard"
          variants={pageTransitionVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={pageTransitionConfig}
          className="w-full"
        >
          <SmoothScroll>
            <div className="min-h-screen bg-white text-[#0A0C10] font-sans selection:bg-[#0082FF] selection:text-white relative">
              <DashboardPage onNavigate={handleNavigate} />
            </div>
          </SmoothScroll>
        </motion.div>
      )}

      {/* 2. Dedicated Ask Ikoli Page (Clinical AI Workspace - Default Light Mode) */}
      {currentPage === 'ask' && (
        <motion.div
          key="ask"
          variants={pageTransitionVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={pageTransitionConfig}
          className="w-full"
        >
          <div className="min-h-screen bg-[#FBFBFD] selection:bg-[#0082FF] selection:text-white font-sans relative">
            <AskIkoliPage onNavigate={handleNavigate} />
          </div>
        </motion.div>
      )}

      {/* 3. Dedicated Target Diseases Registry Page */}
      {currentPage === 'diseases' && (
        <motion.div
          key="diseases"
          variants={pageTransitionVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={pageTransitionConfig}
          className="w-full"
        >
          <SmoothScroll>
            <div className="min-h-screen bg-white text-[#0A0C10] font-sans selection:bg-[#0082FF] selection:text-white relative">
              <DiseasesPage onNavigate={handleNavigate} />
            </div>
          </SmoothScroll>
        </motion.div>
      )}

      {/* 4. Dedicated About Us & Governance Page */}
      {currentPage === 'about' && (
        <motion.div
          key="about"
          variants={pageTransitionVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={pageTransitionConfig}
          className="w-full"
        >
          <SmoothScroll>
            <div className="min-h-screen bg-white text-[#0A0C10] font-sans selection:bg-[#0082FF] selection:text-white relative">
              <AboutPage onNavigate={handleNavigate} />
            </div>
          </SmoothScroll>
        </motion.div>
      )}

      {/* 5. Main Home Experience */}
      {currentPage === 'home' && (
        <motion.div
          key="home"
          variants={pageTransitionVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={pageTransitionConfig}
          className="w-full"
        >
          <SmoothScroll>
            <main className="w-full min-h-screen bg-white text-[#0A0C10] font-sans selection:bg-[#0082FF] selection:text-white relative">
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
          </SmoothScroll>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;
