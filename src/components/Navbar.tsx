import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Compass,
  GitCompare,
  Sliders,
  BookOpen,
  Sun,
  Moon,
  Sparkles,
  CheckCircle2,
  Clock,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { useModel } from '../context/ModelContext';
import { useTheme } from '../context/ThemeContext';

export const Navbar: React.FC = () => {
  const { status, statusMessage, progress, initModel } = useModel();
  const { theme, toggleTheme, isEspresso } = useTheme();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Live Explorer', icon: Compass },
    { path: '/comparator', label: 'Sentence Comparator', icon: GitCompare },
    { path: '/sandbox', label: 'Manual Sandbox', icon: Sliders },
    { path: '/guide', label: 'Visual Intuition', icon: BookOpen }
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-2xl transition-colors duration-300 border-b border-[#E2D9C8]/80 bg-[#FBF8F2]/75 dark:bg-[#161310]/80 dark:border-[#38312A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo & Telemetry Identity */}
          <NavLink to="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center border transition-all duration-300 border-[#E2D9C8] bg-[#F5F0E6] text-[#C25934] dark:border-[#38312A] dark:bg-[#221E1A] dark:text-[#E08A5E] group-hover:scale-105 shadow-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-sm tracking-wide uppercase text-[#231F1B] dark:text-[#F5EFE6]">
                  Perplexity Explorer
                </span>
                <span className="mono-tabular text-[10px] font-semibold px-1.5 py-0.5 rounded border border-[#C25934]/30 text-[#C25934] bg-[#C25934]/10 dark:text-[#E08A5E] dark:border-[#E08A5E]/30 dark:bg-[#E08A5E]/10">
                  AETHER Lab
                </span>
              </div>
              <span className="text-[10px] mono-tabular text-[#6E655A] dark:text-[#A89D8F] hidden sm:inline">
                IN-BROWSER DISTILGPT-2 TELEMETRY
              </span>
            </div>
          </NavLink>

          {/* Centered Frosted-Glass Floating Pill Navigation Dock */}
          <nav className="hidden md:flex items-center gap-1 bg-[#F5F0E6]/80 dark:bg-[#221E1A]/80 p-1.5 rounded-full border border-[#E2D9C8] dark:border-[#38312A] shadow-inner">
            {navItems.map(item => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-[#231F1B] font-semibold dark:text-[#F5EFE6]'
                      : 'text-[#6E655A] hover:text-[#231F1B] dark:text-[#A89D8F] dark:hover:text-[#F5EFE6]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-[#FBF8F2] dark:bg-[#2B2520] rounded-full shadow-[0_2px_8px_rgba(68,54,39,0.12)] border border-[#E2D9C8] dark:border-[#4A3F35]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5" />
                    {item.label}
                  </span>
                </NavLink>
              );
            })}
          </nav>

          {/* Right Controls: Model Status Badge & Theme Switcher */}
          <div className="flex items-center gap-2.5">
            {/* Live Model Status Badge */}
            <button
              onClick={() => {
                if (status === 'not_loaded') initModel();
              }}
              title={status === 'not_loaded' ? 'Click to pre-download model weights' : statusMessage}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs mono-tabular border transition-all duration-200 ${
                status === 'ready'
                  ? 'border-[#3D7A5C]/30 bg-[#3D7A5C]/10 text-[#3D7A5C] dark:text-[#4ADE80] dark:border-[#4ADE80]/30'
                  : status === 'downloading'
                  ? 'border-[#C8832A]/30 bg-[#C8832A]/10 text-[#C8832A] dark:text-[#FBBF24]'
                  : status === 'error'
                  ? 'border-[#C94A4A]/30 bg-[#C94A4A]/10 text-[#C94A4A]'
                  : 'border-[#E2D9C8] bg-[#F5F0E6] text-[#6E655A] hover:border-[#C25934]/40 hover:text-[#231F1B] dark:border-[#38312A] dark:bg-[#221E1A] dark:text-[#A89D8F]'
              }`}
            >
              {status === 'ready' && <CheckCircle2 className="w-3.5 h-3.5 text-[#3D7A5C] dark:text-[#4ADE80]" />}
              {status === 'downloading' && <Loader2 className="w-3.5 h-3.5 animate-spin text-[#C8832A]" />}
              {status === 'error' && <AlertCircle className="w-3.5 h-3.5 text-[#C94A4A]" />}
              {status === 'not_loaded' && <Clock className="w-3.5 h-3.5 text-[#6E655A] dark:text-[#A89D8F]" />}

              <span className="font-medium hidden sm:inline">
                {status === 'ready' && 'Model ready'}
                {status === 'downloading' && (progress > 0 ? `Downloading ${progress}%` : 'Downloading…')}
                {status === 'error' && 'Model error'}
                {status === 'not_loaded' && 'Model not loaded'}
              </span>
              <span className="font-medium sm:hidden">
                {status === 'ready' ? 'Ready' : status === 'downloading' ? `${progress}%` : 'Standby'}
              </span>
            </button>

            {/* Theme Toggle Button: Beige Paper vs Espresso Dark */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle visual theme"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E2D9C8] dark:border-[#38312A] bg-[#F5F0E6] dark:bg-[#221E1A] text-[#231F1B] dark:text-[#F5EFE6] hover:border-[#C25934] transition-all duration-200 text-xs shadow-sm"
              title={isEspresso ? 'Switch to Beige Paper' : 'Switch to Espresso Dark'}
            >
              {isEspresso ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-[#E08A5E]" />
                  <span className="hidden sm:inline font-medium">Beige Paper</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-[#6E655A]" />
                  <span className="hidden sm:inline font-medium">Espresso Dark</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-[#E2D9C8]/60 dark:border-[#38312A]/60 overflow-x-auto gap-1">
          {navItems.map(item => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-[#C25934] text-white dark:bg-[#E08A5E] dark:text-[#161310] font-semibold'
                    : 'text-[#6E655A] dark:text-[#A89D8F]'
                }`}
              >
                <Icon className="w-3 h-3" />
                {item.label}
              </NavLink>
            );
          })}
        </div>
      </div>
    </header>
  );
};
