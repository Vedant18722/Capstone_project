import React from 'react';
import { 
  ShieldCheck, 
  TrendingUp, 
  PieChart, 
  Calculator, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Lock,
  Coins
} from 'lucide-react';
import { VeraLogo } from './VeraLogo.tsx';

interface HeroProps {
  onCheckEligibility: () => void;
  onExploreTools: (tabId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onCheckEligibility,
  onExploreTools,
}) => {
  return (
    <div className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Header Callout with Vera V Symbol */}
        <div className="text-center max-w-3xl mx-auto">
          
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold mb-6 shadow-2xs transition-all duration-200 hover:border-blue-400/50">
            <VeraLogo size={18} variant="mark" />
            <span>VeraCredit Institutional Underwriting & Financial Intelligence</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 leading-[1.12]">
            Know Your Financial Standing{' '}
            <span className="bg-gradient-to-r from-blue-600 via-violet-500 to-cyan-400 bg-clip-text text-transparent">
              Before You Apply
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Instant credit assessment, institutional loan approval odds, debt-to-income analysis, and personalized financial recommendations.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onCheckEligibility}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-semibold text-sm shadow-md shadow-blue-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Check Loan Eligibility</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onExploreTools('tools-section')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white dark:bg-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium text-sm border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
            >
              <span>Explore Financial Tools</span>
            </button>
          </div>

          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-500" />
              Institutional BFSI Math
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-violet-400" />
              Zero Banking Credentials Required
            </span>
          </div>
        </div>

        {/* 4 Floating Metric Cards Showcase (Each with its distinct vibrant accent) */}
        <div className="mt-12 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          
          {/* Card 1: Credit Profile (Royal Sapphire Blue) */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 relative overflow-hidden group hover:border-blue-500/50 transition-all duration-200">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
              <span className="font-semibold tracking-wide uppercase text-[10px] text-blue-600 dark:text-blue-400">Credit Profile</span>
              <ShieldCheck className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 font-mono tracking-tight">742</div>
            <div className="mt-1 text-xs text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1">
              <span>Very Good</span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-normal">· Top 18%</span>
            </div>
            <div className="mt-3 w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-500 h-full w-[78%]" />
            </div>
          </div>

          {/* Card 2: Loan Eligibility (Fresh Cyan Teal) */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 relative overflow-hidden group hover:border-cyan-500/50 transition-all duration-200">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
              <span className="font-semibold tracking-wide uppercase text-[10px] text-cyan-600 dark:text-cyan-400">Eligibility</span>
              <TrendingUp className="w-4 h-4 text-cyan-500" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 font-mono tracking-tight">82%</div>
            <div className="mt-1 text-xs text-cyan-600 dark:text-cyan-400 font-semibold flex items-center gap-1">
              <span>Estimated Approval</span>
            </div>
            <div className="mt-3 text-[11px] text-slate-500 dark:text-slate-400 truncate">
              Eligible: <span className="text-slate-900 dark:text-slate-100 font-mono font-medium">₹7.5 Lakh</span>
            </div>
          </div>

          {/* Card 3: Monthly EMI (Electric Violet) */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 relative overflow-hidden group hover:border-violet-500/50 transition-all duration-200">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
              <span className="font-semibold tracking-wide uppercase text-[10px] text-violet-600 dark:text-violet-400">Monthly EMI</span>
              <Coins className="w-4 h-4 text-violet-500" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 font-mono tracking-tight">₹21,247</div>
            <div className="mt-1 text-xs text-slate-600 dark:text-slate-400 font-medium">
              5 Years Tenure <span className="text-slate-400 dark:text-slate-500">@ 9.5%</span>
            </div>
            <div className="mt-3 text-[11px] text-slate-500 dark:text-slate-400 truncate">
              Balanced Cashflow Plan
            </div>
          </div>

          {/* Card 4: Risk Assessment (Green for Low Risk) */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 relative overflow-hidden group hover:border-emerald-500/50 transition-all duration-200">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
              <span className="font-semibold tracking-wide uppercase text-[10px] text-emerald-600 dark:text-emerald-400">Risk Assessment</span>
              <Sparkles className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono tracking-tight">Low Risk</div>
            <div className="mt-1 text-xs text-slate-600 dark:text-slate-400 font-medium">
              DTI Ratio <span className="text-emerald-600 dark:text-emerald-400 font-mono font-semibold">31%</span>
            </div>
            <div className="mt-3 text-[11px] text-slate-500 dark:text-slate-400 truncate">
              Institutional Underwriting
            </div>
          </div>

        </div>

        {/* Four Major Platform Tools Navigation Cards */}
        <div id="tools-section" className="mt-14 pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="text-center mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-700 bg-slate-100 border border-slate-200 dark:text-slate-300 dark:bg-slate-800/80 dark:border-slate-700 px-2.5 py-1 rounded-full font-medium">
              Unified Platform
            </span>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-2">
              Four Core BFSI Decision Tools
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto mt-1">
              VeraCredit integrates loan underwriting, credit score decomposition, real-time EMI optimization, and personalized financial insights in one cohesive platform.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Tool 1: Sapphire Blue */}
            <div 
              onClick={() => onExploreTools('checker')}
              className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/60 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 active:translate-y-0 active:scale-98 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 mb-4 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-300">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-500 transition-colors">
                  1. Loan Eligibility Checker
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  Evaluate borrowing capacity, debt-to-income (DTI) ratio, institutional risk category, and interest brackets.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-blue-500 font-medium">
                <span>Start Evaluation</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-200" />
              </div>
            </div>

            {/* Tool 2: Electric Violet */}
            <div 
              onClick={() => onExploreTools('credit')}
              className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-violet-500/60 hover:shadow-lg hover:shadow-violet-500/10 hover:-translate-y-1 active:translate-y-0 active:scale-98 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-500 mb-4 group-hover:scale-110 group-hover:bg-violet-500/20 transition-all duration-300">
                  <PieChart className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 group-hover:text-violet-500 transition-colors">
                  2. Credit Score Analyzer
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  Interactive circular meter, 5-pillar breakdown, strengths, risk drivers, and roadmap to reach 750+ score.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-violet-500 font-medium">
                <span>Analyze Score</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-200" />
              </div>
            </div>

            {/* Tool 3: Fresh Cyan Teal */}
            <div 
              onClick={() => onExploreTools('emi')}
              className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-cyan-500/60 hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1 active:translate-y-0 active:scale-98 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-500 mb-4 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all duration-300">
                  <Calculator className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 group-hover:text-cyan-500 transition-colors">
                  3. EMI Calculator
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  Interactive sliders with standard formula, principal vs. interest breakdown, and 3/5/7-year scenario comparisons.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-cyan-500 font-medium">
                <span>Calculate EMI</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-200" />
              </div>
            </div>

            {/* Tool 4: Sunset Coral */}
            <div 
              onClick={() => onExploreTools('checker')}
              className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-rose-500/60 hover:shadow-lg hover:shadow-rose-500/10 hover:-translate-y-1 active:translate-y-0 active:scale-98 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500 mb-4 group-hover:scale-110 group-hover:bg-rose-500/20 transition-all duration-300">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 group-hover:text-rose-500 transition-colors">
                  4. Financial Health Insights
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  Analyzes cashflow vulnerabilities, offers tailored financial advice, and answers custom underwriting questions.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-rose-500 font-medium">
                <span>Explore Insights</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-200" />
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
