import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export type ViewMode = 'gateway' | 'crisis' | 'solution';

interface NavigationProps {
  currentView: ViewMode;
  onSwitchView: (view: ViewMode) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, onSwitchView }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const navClasses =
    currentView === 'gateway'
      ? 'fixed top-0 left-0 right-0 z-50 bg-[#fbf9f6]/90 backdrop-blur-md px-4 lg:px-8 py-3 border-b border-[#B8C5B9]/40 shadow-xs transition-colors duration-300'
      : currentView === 'crisis'
      ? 'fixed top-0 left-0 right-0 z-50 glass-panel px-4 lg:px-8 py-3 border-b border-white/10 transition-colors duration-300'
      : 'fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md px-4 lg:px-8 py-3 border-b border-slate-200 shadow-xs transition-colors duration-300';

  const brandClasses =
    currentView === 'crisis'
      ? 'font-display font-bold text-lg tracking-wider text-white'
      : 'font-display font-bold text-lg tracking-wider text-slate-900';

  const brandAccentClasses =
    currentView === 'solution' ? 'text-emerald-500' : 'text-cyan-400';

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 lg:gap-8">
        {/* Brand */}
        <button
          onClick={() => {
            onSwitchView('gateway');
            closeMobileMenu();
          }}
          className="flex items-center gap-3 text-left group focus:outline-none cursor-pointer shrink-0 mr-4 sm:mr-6 lg:mr-8 xl:mr-10"
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center group-hover:scale-105 transition ${
              currentView === 'solution'
                ? 'bg-emerald-500/20 border border-emerald-500'
                : 'bg-cyan-500/20 border border-cyan-400'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full animate-ping ${
                currentView === 'solution' ? 'bg-emerald-500' : 'bg-cyan-400'
              }`}
            />
          </div>
          <span className={brandClasses}>
            PLASTIC<span className={brandAccentClasses}>ECO</span>.PH
          </span>
        </button>

        {/* Author Badge (shown only on Gateway view) */}
        {currentView === 'gateway' && (
          <div className="flex flex-col items-end text-right leading-tight">
            <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-slate-800">
              People &amp; Earth's Ecosystem
            </span>
            <span className="text-[10px] sm:text-xs font-semibold text-[#577568]">
              by Alexies Jean Ballesteros
            </span>
          </div>
        )}

        {/* Crisis Navigation Links */}
        {currentView === 'crisis' && (
          <div className="hidden lg:flex items-center gap-3.5 xl:gap-5 text-[11px] xl:text-xs uppercase tracking-wider font-semibold text-slate-300 ml-auto">
            <a href="#interactives" className="text-cyan-400 hover:text-cyan-300 transition-colors whitespace-nowrap">
              Interactive Hub
            </a>
            <a href="#breakdown" className="hover:text-cyan-400 transition-colors whitespace-nowrap">
              What Happens?
            </a>
            <a href="#scale" className="hover:text-cyan-400 transition-colors whitespace-nowrap">
              Philippine Scale
            </a>
            <a href="#causes" className="hover:text-cyan-400 transition-colors whitespace-nowrap">
              Why Everywhere?
            </a>
            <a href="#destinations" className="hover:text-cyan-400 transition-colors whitespace-nowrap">
              Where It Ends
            </a>
            <a href="#day-in-life" className="hover:text-cyan-400 transition-colors whitespace-nowrap">
              Daily Footprint
            </a>
            <a href="#reflection" className="hover:text-cyan-400 transition-colors whitespace-nowrap">
              The Reflection
            </a>
            <button
              onClick={() => onSwitchView('solution')}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-1.5 rounded-full transition shadow-lg shadow-emerald-500/20 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ml-1"
            >
              <span>Explore Solution</span> →
            </button>
            <button
              onClick={() => onSwitchView('gateway')}
              className="text-xs uppercase tracking-widest text-slate-300 hover:text-white border border-white/20 px-3.5 py-1.5 rounded-full transition cursor-pointer whitespace-nowrap"
            >
              Home
            </button>
          </div>
        )}

        {/* Solution Navigation Links */}
        {currentView === 'solution' && (
          <div className="hidden lg:flex items-center gap-2.5 xl:gap-4 text-[11px] uppercase tracking-wider font-semibold text-slate-700 ml-auto">
            <a href="#sol-vision" className="hover:text-emerald-500 transition-colors whitespace-nowrap">
              Vision
            </a>
            <a href="#sol-swaps" className="hover:text-emerald-500 transition-colors whitespace-nowrap">
              Everyday Swaps
            </a>
            <a href="#sol-system" className="hover:text-emerald-500 transition-colors whitespace-nowrap">
              Circular Builder
            </a>
            <a href="#sol-chain" className="hover:text-emerald-500 transition-colors whitespace-nowrap">
              Intercept
            </a>
            <a href="#sol-innovations" className="hover:text-emerald-500 transition-colors whitespace-nowrap">
              PH Initiatives
            </a>
            <a href="#sol-roles" className="hover:text-emerald-500 transition-colors whitespace-nowrap">
              Shared Roles
            </a>
            <a href="#sol-simulator" className="hover:text-emerald-500 transition-colors whitespace-nowrap">
              My Impact
            </a>
            <a href="#sol-future" className="hover:text-emerald-500 transition-colors whitespace-nowrap">
              The Future
            </a>
            <button
              onClick={() => onSwitchView('crisis')}
              className="bg-ocean-800 hover:bg-ocean-700 text-cyan-300 font-bold px-3 py-1.5 rounded-full transition border border-cyan-500/30 cursor-pointer whitespace-nowrap ml-1"
            >
              ← Review Crisis
            </button>
            <button
              onClick={() => onSwitchView('gateway')}
              className="text-xs uppercase tracking-widest text-slate-700 hover:text-slate-950 border border-slate-300 px-3.5 py-1.5 rounded-full transition cursor-pointer whitespace-nowrap"
            >
              Home
            </button>
          </div>
        )}

        {/* Mobile menu button (only in crisis or solution) */}
        {currentView !== 'gateway' && (
          <button
            onClick={toggleMobileMenu}
            className={`lg:hidden p-2 focus:outline-none cursor-pointer ${
              currentView === 'crisis'
                ? 'text-slate-300 hover:text-white'
                : 'text-slate-700 hover:text-slate-950'
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && currentView !== 'gateway' && (
        <div
          className={`lg:hidden flex flex-col gap-3 pt-4 pb-3 border-t mt-3 text-sm ${
            currentView === 'crisis'
              ? 'border-white/10 text-slate-200 bg-ocean-950/95 p-4 rounded-xl'
              : 'border-slate-200 text-slate-800 bg-white/95 p-4 rounded-xl shadow-lg'
          }`}
        >
          <button
            onClick={() => {
              onSwitchView('gateway');
              closeMobileMenu();
            }}
            className="text-left font-semibold py-1 hover:text-cyan-400"
          >
            Return to Home Gateway
          </button>
          <button
            onClick={() => {
              onSwitchView('crisis');
              closeMobileMenu();
            }}
            className="text-left text-cyan-400 font-semibold py-1"
          >
            The Crisis View
          </button>
          <button
            onClick={() => {
              onSwitchView('solution');
              closeMobileMenu();
            }}
            className="text-left text-emerald-500 font-bold py-1"
          >
            The Solution View
          </button>

          {currentView === 'crisis' && (
            <div className="flex flex-col gap-2.5 pt-3 border-t border-white/10 text-xs uppercase tracking-wider text-slate-300">
              <a href="#interactives" onClick={closeMobileMenu} className="text-cyan-400 font-bold">
                Interactive Hub
              </a>
              <a href="#breakdown" onClick={closeMobileMenu} className="hover:text-cyan-400">
                What Happens To Waste?
              </a>
              <a href="#scale" onClick={closeMobileMenu} className="hover:text-cyan-400">
                Philippine Scale
              </a>
              <a href="#causes" onClick={closeMobileMenu} className="hover:text-cyan-400">
                Why Is Plastic Everywhere?
              </a>
              <a href="#destinations" onClick={closeMobileMenu} className="hover:text-cyan-400">
                Where Does It End Up?
              </a>
              <a href="#day-in-life" onClick={closeMobileMenu} className="hover:text-cyan-400">
                Daily Plastic Footprint
              </a>
              <a href="#reflection" onClick={closeMobileMenu} className="hover:text-cyan-400">
                Visual Reflection
              </a>
            </div>
          )}

          {currentView === 'solution' && (
            <div className="flex flex-col gap-2.5 pt-3 border-t border-slate-200 text-xs uppercase tracking-wider text-slate-600">
              <a href="#sol-vision" onClick={closeMobileMenu} className="hover:text-emerald-500">
                The Vision
              </a>
              <a href="#sol-swaps" onClick={closeMobileMenu} className="hover:text-emerald-500">
                Everyday Swaps
              </a>
              <a href="#sol-system" onClick={closeMobileMenu} className="hover:text-emerald-500">
                Circular System Builder
              </a>
              <a href="#sol-chain" onClick={closeMobileMenu} className="hover:text-emerald-500">
                Intercept The Plastic
              </a>
              <a href="#sol-innovations" onClick={closeMobileMenu} className="hover:text-emerald-500">
                PH Initiatives
              </a>
              <a href="#sol-roles" onClick={closeMobileMenu} className="hover:text-emerald-500">
                Shared Roles
              </a>
              <a href="#sol-simulator" onClick={closeMobileMenu} className="hover:text-emerald-500">
                My Impact Simulator
              </a>
              <a href="#sol-future" onClick={closeMobileMenu} className="hover:text-emerald-500">
                Choose The Future
              </a>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};
