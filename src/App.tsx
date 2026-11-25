import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { ModelProvider } from './context/ModelContext';
import { Navbar } from './components/Navbar';
import { LiveExplorer } from './pages/LiveExplorer';
import { Comparator } from './pages/Comparator';
import { Sandbox } from './pages/Sandbox';
import { Guide } from './pages/Guide';

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
        className="w-full"
      >
        <Routes location={location}>
          <Route path="/" element={<LiveExplorer />} />
          <Route path="/comparator" element={<Comparator />} />
          <Route path="/sandbox" element={<Sandbox />} />
          <Route path="/guide" element={<Guide />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const AmbientBackgroundOrbs: React.FC = () => {
  const { isEspresso } = useTheme();

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {isEspresso ? (
        // Roasted Espresso Glass Ambient Orbs
        <>
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#3A2B1D]/40 blur-[100px] animate-drift-1" />
          <div className="absolute top-1/3 -right-32 w-[32rem] h-[32rem] rounded-full bg-[#2B2520]/50 blur-[120px] animate-drift-2" />
          <div className="absolute -bottom-32 left-1/4 w-96 h-96 rounded-full bg-[#4A382A]/30 blur-[110px] animate-drift-3" />
        </>
      ) : (
        // Warm Beige Liquid Glass Ambient Orbs (Terracotta, Golden Sand, Muted Sage)
        <>
          <div className="absolute -top-32 -left-32 w-[30rem] h-[30rem] rounded-full bg-[#E7D5C3]/70 blur-[100px] animate-drift-1" />
          <div className="absolute top-1/4 -right-32 w-[34rem] h-[34rem] rounded-full bg-[#EFE4CE]/80 blur-[120px] animate-drift-2" />
          <div className="absolute -bottom-32 left-1/3 w-[30rem] h-[30rem] rounded-full bg-[#DCE3D8]/70 blur-[110px] animate-drift-3" />
        </>
      )}
    </div>
  );
};

export const AppContent: React.FC = () => {
  const { isEspresso } = useTheme();

  return (
    <div
      className={`min-h-screen flex flex-col relative transition-colors duration-300 ${
        isEspresso ? 'bg-[#161310] text-[#F5EFE6]' : 'bg-[#F5F0E6] text-[#231F1B]'
      }`}
    >
      {/* Ambient Drifting Orbs Behind Frosted Glass */}
      <AmbientBackgroundOrbs />

      {/* Navigation Dock */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <AnimatedRoutes />
      </main>

      {/* Persistent Editorial Telemetry Footer */}
      <footer className="border-t border-[#E2D9C8]/80 dark:border-[#38312A]/80 py-6 px-4 sm:px-8 text-xs font-mono text-[#6E655A] dark:text-[#A89D8F] relative z-10 bg-[#FBF8F2]/60 dark:bg-[#161310]/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="font-semibold text-[#C25934] dark:text-[#E08A5E]">
              PERPLEXITY EXPLORER // AETHER LAB
            </span>
            <span>MODEL: DISTILGPT-2 (82M)</span>
            <span>PRECISION: Q8 QUANTIZED</span>
            <span>RUNTIME: TRANSFORMERS.JS</span>
          </div>

          <div className="flex items-center gap-3">
            <span>100% IN-BROWSER CLIENT COMPUTATION</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <ModelProvider>
        <Router>
          <AppContent />
        </Router>
      </ModelProvider>
    </ThemeProvider>
  );
}
