import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  AlertCircle, 
  TrendingUp, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight, 
  PieChart, 
  Sliders, 
  Sparkles,
  Info
} from 'lucide-react';

interface CreditAnalyzerProps {
  onCheckLoanWithScore?: (score: number, utilization: number) => void;
}

export const CreditAnalyzer: React.FC<CreditAnalyzerProps> = ({
  onCheckLoanWithScore,
}) => {
  const [score, setScore] = useState<number>(742);
  const [paymentHistory, setPaymentHistory] = useState<'clean' | 'occasional' | 'defaults'>('clean');
  const [utilization, setUtilization] = useState<number>(24);
  const [historyYears, setHistoryYears] = useState<number>(6);
  const [accountsCount, setAccountsCount] = useState<number>(4);
  const [recentApplications, setRecentApplications] = useState<number>(1);

  // Dynamic analysis computation
  const analysis = useMemo(() => {
    let category = 'Very Good';
    let riskLevel: 'Low' | 'Moderate' | 'High' = 'Low';
    let colorClass = 'text-emerald-500 dark:text-emerald-400';
    let strokeColor = '#10b981';

    if (score >= 800) {
      category = 'Exceptional';
      riskLevel = 'Low';
      colorClass = 'text-emerald-500 dark:text-emerald-400';
      strokeColor = '#10b981';
    } else if (score >= 740) {
      category = 'Very Good';
      riskLevel = 'Low';
      colorClass = 'text-emerald-500 dark:text-emerald-400';
      strokeColor = '#10b981';
    } else if (score >= 670) {
      category = 'Good';
      riskLevel = 'Moderate';
      colorClass = 'text-amber-500 dark:text-amber-400';
      strokeColor = '#f59e0b';
    } else if (score >= 580) {
      category = 'Fair (Subprime)';
      riskLevel = 'Moderate';
      colorClass = 'text-amber-600 dark:text-amber-400';
      strokeColor = '#d97706';
    } else {
      category = 'Poor';
      riskLevel = 'High';
      colorClass = 'text-rose-600 dark:text-rose-400';
      strokeColor = '#e11d48';
    }

    const strengths: string[] = [];
    const concerns: string[] = [];
    const tips: string[] = [];

    // Strengths
    if (paymentHistory === 'clean') {
      strengths.push('Clean payment record (35% bureau weight): Zero 30+ day delinquencies.');
    }
    if (utilization <= 30) {
      strengths.push(`Controlled revolving utilization (${utilization}%): Well below 30% ceiling.`);
    }
    if (historyYears >= 5) {
      strengths.push(`Established credit vintage (${historyYears} yrs): Shows reliable stewardship.`);
    }
    if (recentApplications <= 1) {
      strengths.push('Minimal hard inquiries: Demonstrates non-credit-hungry behavior.');
    }

    // Concerns
    if (paymentHistory === 'occasional') {
      concerns.push('Occasional late payments trigger risk adjustments on unsecured personal loans.');
    } else if (paymentHistory === 'defaults') {
      concerns.push('Severe delinquencies present: Major institutional lenders will require collateral.');
    }
    if (utilization > 50) {
      concerns.push(`High credit utilization (${utilization}%): Negatively impacts debt servicing scores.`);
    } else if (utilization > 30) {
      concerns.push(`Moderate utilization (${utilization}%): Aim for <25% to maximize approvals.`);
    }
    if (historyYears < 3) {
      concerns.push('Relatively young credit vintage: Limited historical underwriting trail.');
    }
    if (recentApplications >= 3) {
      concerns.push(`${recentApplications} inquiries in 6 months indicates aggressive credit seeking.`);
    }

    // Tips
    tips.push('Automate minimum payments to guarantee zero accidental 30-day delinquencies.');
    if (utilization > 30) {
      tips.push('Make mid-cycle payments on credit cards prior to monthly statement generation date.');
    }
    tips.push('Keep older credit cards active to preserve your average credit account age.');
    if (recentApplications > 1) {
      tips.push('Pause applying for new credit cards or consumer loans for the next 90 days.');
    }

    return {
      category,
      riskLevel,
      colorClass,
      strokeColor,
      strengths,
      concerns,
      tips,
    };
  }, [score, paymentHistory, utilization, historyYears, accountsCount, recentApplications]);

  // Score meter geometry (300 to 900 scale)
  const normalizedPercentage = Math.min(100, Math.max(0, ((score - 300) / (900 - 300)) * 100));
  const radius = 80;
  const circumference = Math.PI * radius; // 180 degree semi-circle
  const strokeDashoffset = circumference - (normalizedPercentage / 100) * circumference;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-mono uppercase tracking-wider text-violet-700 bg-violet-50 border border-violet-200 dark:text-violet-300 dark:bg-violet-950/60 dark:border-violet-800/40 px-3 py-1 rounded-full font-semibold shadow-2xs">
          Module 2 · Credit Health Intelligence
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mt-2">
          Credit Score Analyzer
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
          Deconstruct your credit score into the 5 core bureau pillars, evaluate risk tiers, and identify targeted score improvement steps.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 5 Cols: Interactive Score Inputs */}
        <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-6">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <PieChart className="w-4 h-4 text-violet-500" />
            Credit Profile Inputs
          </h3>

          {/* Quick Score Presets with Smooth Transitions */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono uppercase">Presets:</span>
            {[
              { val: 820, label: '820 Prime' },
              { val: 750, label: '750 Good' },
              { val: 660, label: '660 Fair' },
              { val: 550, label: '550 Poor' },
            ].map((preset) => (
              <button
                key={preset.val}
                type="button"
                onClick={() => setScore(preset.val)}
                className={`px-2 py-0.5 text-[11px] font-mono rounded-lg border transition-all duration-200 ease-out cursor-pointer ${
                  score === preset.val
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs scale-105'
                    : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:-translate-y-0.5 active:scale-95'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Score Slider & Input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Bureau Score (300–900)</label>
              <input
                type="number"
                min="300"
                max="900"
                value={score}
                onChange={(e) => setScore(Math.min(900, Math.max(300, parseInt(e.target.value) || 300)))}
                className="w-20 px-2 py-1 rounded-lg bg-slate-50 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 font-mono text-center text-sm font-bold text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <input
              type="range"
              min="300"
              max="900"
              value={score}
              onChange={(e) => setScore(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-blue-400 transition-all"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400">
              <span>300 (Poor)</span>
              <span>650</span>
              <span>750</span>
              <span>900 (Excellent)</span>
            </div>
          </div>

          {/* Payment History */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Payment History</label>
            <select
              value={paymentHistory}
              onChange={(e) => setPaymentHistory(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-violet-500"
            >
              <option value="clean">Clean (100% on-time record)</option>
              <option value="occasional">Occasional Late (30-60 day slip)</option>
              <option value="defaults">Defaults / Severe Delinquencies</option>
            </select>
          </div>

          {/* Credit Utilization */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-medium text-slate-700 dark:text-slate-300">Credit Card Utilization</label>
              <span className="font-mono text-violet-600 dark:text-violet-400 font-bold">{utilization}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={utilization}
              onChange={(e) => setUtilization(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-600 dark:accent-violet-400"
            />
          </div>

          {/* Credit History Length */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-medium text-slate-700 dark:text-slate-300">Credit History Length</label>
              <span className="font-mono text-cyan-600 dark:text-cyan-400 font-bold">{historyYears} Years</span>
            </div>
            <input
              type="range"
              min="0"
              max="25"
              value={historyYears}
              onChange={(e) => setHistoryYears(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-600 dark:accent-cyan-400"
            />
          </div>

          {/* Active Accounts & Inquiries */}
          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-200 dark:border-slate-800">
            <div>
              <label className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">Active Accounts</label>
              <input
                type="number"
                min="1"
                max="20"
                value={accountsCount}
                onChange={(e) => setAccountsCount(parseInt(e.target.value) || 1)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 font-mono text-sm text-slate-900 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">Recent Inquiries (6mo)</label>
              <input
                type="number"
                min="0"
                max="10"
                value={recentApplications}
                onChange={(e) => setRecentApplications(parseInt(e.target.value) || 0)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 font-mono text-sm text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          {onCheckLoanWithScore && (
            <button
              onClick={() => onCheckLoanWithScore(score, utilization)}
              className="w-full py-3 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 dark:hover:bg-blue-900/70 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/40 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 active:scale-98 cursor-pointer"
            >
              <span>Check Loan Eligibility with this Score</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

        </div>

        {/* Right 7 Cols: Semi-Circular Gauge Meter & 5-Pillar Decomposition */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Circular Score Meter Card */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 text-center relative overflow-hidden">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Credit Bureau Standing
            </div>

            {/* Gauge SVG */}
            <div className="relative w-64 h-36 mx-auto flex items-end justify-center overflow-hidden">
              <svg className="w-64 h-64 -rotate-180" viewBox="0 0 200 200">
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  stroke="currentColor"
                  className="text-slate-200 dark:text-slate-800"
                  strokeWidth="14"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset="0"
                />
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  stroke={analysis.strokeColor}
                  strokeWidth="14"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-700 ease-out"
                />
              </svg>

              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center">
                <div className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 font-mono tracking-tight">
                  {score}
                </div>
                <div className={`text-xs font-extrabold uppercase tracking-wider mt-1 ${analysis.colorClass}`}>
                  {analysis.category}
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center gap-4 text-xs">
              <span className="text-slate-500 dark:text-slate-400">Risk Level:</span>
              <span className={`font-semibold font-mono px-2 py-0.5 rounded ${
                analysis.riskLevel === 'Low' 
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800/40' 
                  : analysis.riskLevel === 'Moderate'
                  ? 'bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800/40'
                  : 'bg-rose-50 text-rose-800 border border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800/40'
              }`}>
                {analysis.riskLevel} Risk
              </span>
              <span className="text-slate-400 dark:text-slate-600">·</span>
              <span className="text-slate-500 dark:text-slate-400">Score Range: 300 to 900</span>
            </div>

            {/* 5 Pillar Breakdown Bar */}
            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 text-left">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 font-mono mb-3">
                Bureau Scoring Weights Breakdown (5 Pillars)
              </h4>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                {/* Pillar 1: Sapphire */}
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Payment History</div>
                  <div className="font-bold text-slate-900 dark:text-slate-100 mt-0.5">35% Weight</div>
                  <div className="text-[10px] text-blue-600 dark:text-blue-400 font-mono font-medium">
                    {paymentHistory === 'clean' ? 'Optimal (+)' : 'High Penalty (-)'}
                  </div>
                </div>

                {/* Pillar 2: Violet */}
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Credit Utilization</div>
                  <div className="font-bold text-slate-900 dark:text-slate-100 mt-0.5">30% Weight</div>
                  <div className="text-[10px] text-violet-600 dark:text-violet-400 font-mono font-medium">
                    {utilization <= 30 ? 'Controlled (+)' : 'Elevated (-)'}
                  </div>
                </div>

                {/* Pillar 3: Cyan */}
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Credit History Age</div>
                  <div className="font-bold text-slate-900 dark:text-slate-100 mt-0.5">15% Weight</div>
                  <div className="text-[10px] text-cyan-600 dark:text-cyan-400 font-mono font-medium">
                    {historyYears >= 5 ? 'Seasoned (+)' : 'Young Stage'}
                  </div>
                </div>

                {/* Pillar 4: Amber */}
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Credit Account Mix</div>
                  <div className="font-bold text-slate-900 dark:text-slate-100 mt-0.5">10% Weight</div>
                  <div className="text-[10px] text-amber-600 dark:text-amber-400 font-mono font-medium">
                    {accountsCount >= 3 ? 'Balanced' : 'Limited Mix'}
                  </div>
                </div>

                {/* Pillar 5: Coral */}
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 col-span-2 sm:col-span-1">
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Recent Inquiries</div>
                  <div className="font-bold text-slate-900 dark:text-slate-100 mt-0.5">10% Weight</div>
                  <div className="text-[10px] text-rose-600 dark:text-rose-400 font-mono font-medium">
                    {recentApplications <= 1 ? 'Optimal' : `${recentApplications} Inquiries (-)`}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Strengths & Actionable Roadmap */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Strengths (Teal / Cyan) */}
            <div className="glass-panel p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 font-mono flex items-center gap-1.5 mb-3">
                <CheckCircle2 className="w-4 h-4 text-teal-500" />
                Profile Strengths
              </h4>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                {analysis.strengths.map((str, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Concerns & Improvement Tips (Violet / Amber) */}
            <div className="glass-panel p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 font-mono flex items-center gap-1.5 mb-3">
                <Sparkles className="w-4 h-4 text-violet-500" />
                Score Uplift Roadmap
              </h4>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                {analysis.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-1.5 shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
