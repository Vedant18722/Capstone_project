import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { LoanEligibilityForm } from './components/LoanEligibilityForm.tsx';
import { FinancialDashboard } from './components/FinancialDashboard.tsx';
import { EmiCalculator } from './components/EmiCalculator.tsx';
import { CreditAnalyzer } from './components/CreditAnalyzer.tsx';
import { HistoryView } from './components/HistoryView.tsx';
import { AiChatDrawer } from './components/AiChatDrawer.tsx';
import { Footer } from './components/Footer.tsx';
import { FinancialInput, FinSightAnalysisResult } from './types/finance.ts';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { MessageSquare } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'checker' | 'credit' | 'emi' | 'dashboard' | 'history'>('home');
  const [currentAnalysis, setCurrentAnalysis] = useState<FinSightAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);
  
  // Chat Drawer
  const [isChatDrawerOpen, setIsChatDrawerOpen] = useState(false);

  // Preload initial assessment into memory so the dashboard always has rich demo data if visited directly
  useEffect(() => {
    // If no analysis is loaded, fetch the latest from history
    fetch('/api/history')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setCurrentAnalysis(data.data[0]);
        }
      })
      .catch((err) => console.warn('History init sync notice:', err));
  }, []);

  const handleFormSubmit = async (data: any, saveToSheets: boolean) => {
    setIsLoading(true);
    setErrorBanner(null);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          saveToSheets,
        }),
      });

      const responseData = await res.json();

      if (responseData.success && responseData.data) {
        setCurrentAnalysis(responseData.data);
        setActiveTab('dashboard');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setErrorBanner(responseData.error || 'Unable to complete underwriting analysis. Please verify your inputs.');
      }
    } catch (err: any) {
      console.error('Submission error:', err);
      setErrorBanner('Network error connecting to the VeraCredit server. Please verify your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveToSheets = async (record: FinSightAnalysisResult): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await fetch('/api/save-record', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
      });
      const data = await res.json();
      return {
        success: data.success,
        message: data.message || 'Record successfully processed.',
      };
    } catch (err: any) {
      return {
        success: false,
        message: 'Saved in local activity session.',
      };
    }
  };

  const handleApplyEmiToChecker = (amount: number, tenure: number) => {
    setActiveTab('checker');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCheckLoanWithScore = (score: number, utilization: number) => {
    setActiveTab('checker');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen financial-canvas text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-blue-500/25 selection:text-blue-900 dark:selection:text-blue-200 transition-colors duration-200 relative overflow-x-hidden">
        
        {/* Balanced Harmonic Ambient Aurora with Gentle Warm Yellowish Shades */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden select-none -z-10" aria-hidden="true">
          {/* Subtle Warm Yellow Atmosphere Glow across canvas */}
          <div className="absolute top-[5%] left-[20%] w-[500px] sm:w-[680px] h-[350px] sm:h-[420px] rounded-full bg-yellow-300/14 dark:bg-yellow-400/8 blur-[130px] transform-gpu" />
          <div className="absolute top-[48%] right-[10%] w-[420px] sm:w-[560px] h-[320px] sm:h-[400px] rounded-full bg-amber-300/12 dark:bg-amber-400/7 blur-[140px] transform-gpu" />

          {/* Color 1: Royal Sapphire Blue (Top-Left) */}
          <div className="absolute -top-28 -left-20 w-96 sm:w-[500px] h-96 sm:h-[500px] rounded-full bg-blue-600/10 dark:bg-blue-500/12 blur-[110px] transform-gpu" />
          {/* Color 2: Electric Violet (Top-Right) */}
          <div className="absolute -top-10 -right-20 w-96 sm:w-[480px] h-96 sm:h-[480px] rounded-full bg-violet-600/9 dark:bg-violet-500/11 blur-[115px] transform-gpu" />
          {/* Color 3: Sunset Coral (Mid-Left) */}
          <div className="absolute top-[44%] -left-24 w-80 sm:w-[460px] h-80 sm:h-[460px] rounded-full bg-rose-500/8 dark:bg-rose-500/10 blur-[110px] transform-gpu" />
          {/* Color 4: Fresh Cyan Teal (Bottom-Right) */}
          <div className="absolute -bottom-20 right-4 w-96 sm:w-[500px] h-96 sm:h-[500px] rounded-full bg-cyan-500/9 dark:bg-cyan-500/11 blur-[120px] transform-gpu" />
        </div>

        {/* Navigation Bar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={(tab: string) => {
            setActiveTab(tab as any);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        {/* Main Container */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          
          {/* Global Error Banner */}
          {errorBanner && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-950/40 border border-rose-500/30 text-rose-200 text-xs sm:text-sm flex items-center justify-between">
              <span>{errorBanner}</span>
              <button
                onClick={() => setErrorBanner(null)}
                className="px-2 py-1 text-xs text-rose-300 hover:text-white rounded cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Tab 1: Home / Landing View with Smooth Tab Transition */}
          {activeTab === 'home' && (
            <div key="home" className="space-y-16 animate-tab-view">
              <Hero
                onCheckEligibility={() => {
                  setActiveTab('checker');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onExploreTools={(toolId) => {
                  if (toolId === 'tools-section') {
                    const el = document.getElementById('tools-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    setActiveTab(toolId as any);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
              />

              {/* Quick Ingestion Form Directly Accessible Below Hero */}
              <div className="pt-8 border-t border-slate-200 dark:border-slate-800/60">
                <div className="text-center mb-10">
                  <span className="text-xs font-mono uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 dark:text-blue-300 dark:bg-blue-950/50 dark:border-blue-800/40 px-3 py-1 rounded-full font-semibold shadow-2xs">
                    Instant Assessment
                  </span>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight mt-2">
                    Check Your VeraCredit Loan Eligibility
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto mt-1">
                    Complete the BFSI underwriting profile below to receive instant eligibility scoring, risk ratings, and underwriting recommendations.
                  </p>
                </div>

                <LoanEligibilityForm
                  onAnalyze={handleFormSubmit}
                  isLoading={isLoading}
                />
              </div>
            </div>
          )}

          {/* Tab 2: Standalone Loan Eligibility Checker View with Smooth Tab Transition */}
          {activeTab === 'checker' && (
            <div key="checker" className="space-y-8 pt-4 animate-tab-view">
              <div className="text-center max-w-2xl mx-auto">
                <span className="text-xs font-mono uppercase tracking-wider text-violet-700 bg-violet-50 border border-violet-200 dark:text-violet-300 dark:bg-violet-950/50 dark:border-violet-800/40 px-3 py-1 rounded-full font-semibold shadow-2xs">
                  Module 1 · Underwriting Engine
                </span>
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mt-2">
                  VeraCredit Loan Eligibility Checker
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Evaluate your debt servicing capacity, benchmark borrowing limits, and examine multi-tenure repayment scenarios powered by actuarial underwriting.
                </p>
              </div>

              <LoanEligibilityForm
                onAnalyze={handleFormSubmit}
                isLoading={isLoading}
              />
            </div>
          )}

          {/* Tab 3: Standalone Credit Analyzer View with Smooth Tab Transition */}
          {activeTab === 'credit' && (
            <div key="credit" className="pt-4 animate-tab-view">
              <CreditAnalyzer
                onCheckLoanWithScore={handleCheckLoanWithScore}
              />
            </div>
          )}

          {/* Tab 4: Standalone EMI Calculator View with Smooth Tab Transition */}
          {activeTab === 'emi' && (
            <div key="emi" className="pt-4 animate-tab-view">
              <EmiCalculator
                onApplyToChecker={handleApplyEmiToChecker}
              />
            </div>
          )}

          {/* Tab 5: Dashboard / Results View with Smooth Tab Transition */}
          {activeTab === 'dashboard' && (
            <div key="dashboard" className="pt-4 animate-tab-view">
              {currentAnalysis ? (
                <FinancialDashboard
                  analysis={currentAnalysis}
                  onEditInputs={() => {
                    setActiveTab('checker');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onOpenChat={() => setIsChatDrawerOpen(true)}
                  onSaveToSheets={handleSaveToSheets}
                />
              ) : (
                <div className="glass-panel p-12 text-center rounded-3xl border border-slate-200 dark:border-slate-800 max-w-lg mx-auto">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">No Active Assessment</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                    Complete the Loan Eligibility form to generate your Financial Snapshot and underwriting report.
                  </p>
                  <button
                    onClick={() => setActiveTab('checker')}
                    className="mt-6 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-semibold text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                  >
                    Start Loan Eligibility Assessment
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Tab 6: Activity History View with Smooth Tab Transition */}
          {activeTab === 'history' && (
            <div key="history" className="pt-4 animate-tab-view">
              <HistoryView
                onSelectRecord={(record) => {
                  setCurrentAnalysis(record);
                  setActiveTab('dashboard');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onStartNew={() => {
                  setActiveTab('checker');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </div>
          )}

        </main>

        {/* Footer */}
        <Footer
          onNavigate={(tab) => {
            setActiveTab(tab as any);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        {/* Floating Advisor Button (Balanced Sapphire & Indigo Gradient) */}
        <div className="fixed bottom-6 right-6 z-30 print:hidden">
          <button
            onClick={() => setIsChatDrawerOpen(true)}
            className="px-4 py-3 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-semibold text-xs shadow-xl shadow-indigo-950/40 transition-all flex items-center gap-2 border border-white/20 group hover:scale-105 active:scale-95 cursor-pointer"
          >
            <div className="w-2 h-2 rounded-full bg-cyan-300 animate-ping" />
            <MessageSquare className="w-3.5 h-3.5 text-white" />
            <span>Ask VeraCredit Advisor</span>
          </button>
        </div>

        {/* Interactive AI Chat Drawer */}
        <AiChatDrawer
          isOpen={isChatDrawerOpen}
          onClose={() => setIsChatDrawerOpen(false)}
          currentAnalysis={currentAnalysis}
        />

      </div>
    </ThemeProvider>
  );
}
