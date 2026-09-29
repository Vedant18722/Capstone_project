import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Sun, 
  Moon,
  Sparkles
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext.tsx';
import { VeraLogo } from './VeraLogo.tsx';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'checker', label: 'Loan Eligibility' },
    { id: 'credit', label: 'Credit Analyzer' },
    { id: 'emi', label: 'EMI Calculator' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'history', label: 'Activity History' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/92 dark:bg-[#0c111d]/94 backdrop-blur-xl transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand with VeraCredit 'V' Symbol */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 cursor-pointer group select-none transition-transform duration-200 active:scale-95"
        >
          <VeraLogo size={36} variant="badge" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Vera<span className="text-blue-600 dark:text-blue-400">Credit</span>
              </span>
              <span className="text-[10px] font-mono tracking-wider px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800/40 font-semibold transition-all">
                BFSI Engine
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block transition-colors">
              True Underwriting. Real Financial Clarity.
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links with Smooth Transitions */}
        <nav className="hidden lg:flex items-center gap-1.5" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-3.5 py-2 text-sm font-medium rounded-xl transition-all duration-200 ease-out transform cursor-pointer ${
                  isActive
                    ? 'text-blue-700 bg-blue-50/90 shadow-xs border border-blue-200/90 dark:text-blue-300 dark:bg-blue-950/50 dark:border-blue-800/60 font-semibold scale-[1.02]'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/50 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]'
                }`}
              >
                <span>{item.label}</span>
                {/* Active Indicator Underline Glow */}
                {isActive && (
                  <span className="absolute bottom-0.5 left-3 right-3 h-[2px] rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 shadow-sm animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Desktop Right Actions: Theme Switcher & Primary Action */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Light / Dark Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100/80 hover:bg-slate-200/80 dark:bg-slate-800/60 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-all cursor-pointer shadow-2xs"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="hidden md:inline">Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-blue-600" />
                <span className="hidden md:inline">Dark Mode</span>
              </>
            )}
          </button>

          <button
            onClick={() => handleNavClick('checker')}
            className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 rounded-lg shadow-sm shadow-blue-500/20 transition-all cursor-pointer"
          >
            Check Eligibility
          </button>
        </div>

        {/* Mobile menu and theme toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 text-slate-700 dark:text-slate-200 rounded-lg bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-blue-600" />
            )}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white rounded-lg bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu with Smooth Transitions */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0c111d]/95 backdrop-blur-xl px-4 pt-3 pb-5 space-y-2 shadow-xl animate-tab-view">
          <p className="text-xs text-slate-500 dark:text-slate-400 px-3 py-1 font-mono uppercase tracking-wider text-[10px]">VeraCredit Navigation</p>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ease-out cursor-pointer ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800/60 font-semibold translate-x-1'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:translate-x-1'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2">
            <button
              onClick={() => handleNavClick('checker')}
              className="w-full py-3 text-center text-xs font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 rounded-xl shadow-md shadow-blue-500/20 transition-all duration-200 active:scale-98 cursor-pointer"
            >
              Check Loan Eligibility
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
