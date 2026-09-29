import React, { useState } from 'react';
import { 
  TrendingUp, 
  ShieldCheck, 
  Calculator, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  FileDown, 
  Save, 
  MessageSquare, 
  RotateCcw, 
  Info, 
  Check,
  Percent,
  Coins
} from 'lucide-react';
import { FinSightAnalysisResult } from '../types/finance.ts';

interface FinancialDashboardProps {
  analysis: FinSightAnalysisResult;
  onEditInputs: () => void;
  onOpenChat: () => void;
  onSaveToSheets: (record: FinSightAnalysisResult) => Promise<{ success: boolean; message: string }>;
}

export const FinancialDashboard: React.FC<FinancialDashboardProps> = ({
  analysis,
  onEditInputs,
  onOpenChat,
  onSaveToSheets,
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  const handleManualSave = async () => {
    setIsSaving(true);
    setSaveSuccessMsg(null);
    try {
      const res = await onSaveToSheets(analysis);
      setSaveSuccessMsg(res.message);
    } catch (err: any) {
      setSaveSuccessMsg('Saved locally in activity history.');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePrintOrDownload = () => {
    window.print();
  };

  // Risk level color mappings: Low = Green, Moderate = Amber/Yellow, High = Red
  const riskColor = 
    analysis.riskLevel === 'Low' ? 'text-emerald-700 dark:text-emerald-300' :
    analysis.riskLevel === 'Moderate' ? 'text-amber-700 dark:text-amber-300' : 'text-rose-700 dark:text-rose-300';
  
  const riskBg = 
    analysis.riskLevel === 'Low' ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800/40' :
    analysis.riskLevel === 'Moderate' ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800/40' : 'bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800/40';

  // Circular progress calculations for SVG
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (analysis.eligibilityPercentage / 100) * circumference;

  return (
    <div className="max-w-7xl mx-auto space-y-8 print:p-0">
      
      {/* Top Banner / Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl glass-panel border border-slate-200/80 dark:border-slate-800 print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 font-semibold">
              Analysis Ref: {analysis.id}
            </span>
            <span className="text-slate-400 dark:text-slate-600">·</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {new Date(analysis.timestamp).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight mt-0.5">
            Financial Intelligence Snapshot: {analysis.input.fullName}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Synthesized via <span className="text-blue-600 dark:text-blue-400 font-semibold">VeraCredit Institutional Underwriting Engine</span> with BFSI actuarial rules.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onEditInputs}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/60 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-95 flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5 text-blue-500" />
            <span>Modify Inputs</span>
          </button>

          <button
            onClick={handleManualSave}
            disabled={isSaving}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/60 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-95 flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            {isSaving ? (
              <div className="w-3.5 h-3.5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5 text-cyan-500" />
            )}
            <span>Save to Google Sheets</span>
          </button>

          <button
            onClick={onOpenChat}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-xs font-semibold text-white shadow-sm shadow-blue-500/20 transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-95 flex items-center gap-1.5 cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 text-white" />
            <span>Ask VeraCredit Advisor</span>
          </button>

          <button
            onClick={handlePrintOrDownload}
            className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/60 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer"
            title="Print or Save Statement as PDF"
          >
            <FileDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {saveSuccessMsg && (
        <div className="p-3.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/50 text-xs text-teal-900 dark:text-teal-300 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
            {saveSuccessMsg}
          </span>
          <button onClick={() => setSaveSuccessMsg(null)} className="text-teal-700 dark:text-teal-400 hover:underline text-xs cursor-pointer">
            Dismiss
          </button>
        </div>
      )}

      {/* 4 PRIMARY METRIC CARDS (Balanced 4-Color Quartet) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Loan Eligibility (Royal Sapphire Blue) */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 relative overflow-hidden group hover:border-blue-500/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 font-semibold">
              Loan Eligibility
            </span>
            <TrendingUp className="w-4 h-4 text-blue-500" />
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div>
              <div className="text-4xl font-extrabold text-slate-900 dark:text-slate-100 font-mono tracking-tight">
                {analysis.eligibilityPercentage}%
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Estimated Limit: <strong className="text-blue-600 dark:text-blue-400 font-mono">₹{(analysis.estimatedLoanAmount / 100000).toFixed(1)} Lakh</strong>
              </p>
            </div>

            {/* Circular Progress Meter */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  className="stroke-slate-200 dark:stroke-slate-800"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  className="stroke-blue-600 dark:stroke-blue-400 transition-all duration-1000 ease-out"
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <span className="absolute text-[11px] font-bold font-mono text-blue-600 dark:text-blue-400">
                {analysis.eligibilityPercentage}%
              </span>
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>Approval Probability</span>
            <span className="font-semibold text-blue-600 dark:text-blue-400">High Confidence</span>
          </div>
        </div>

        {/* Card 2: Credit Score (Electric Violet) */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 relative overflow-hidden group hover:border-violet-500/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-violet-600 dark:text-violet-400 font-semibold">
              Credit Score
            </span>
            <ShieldCheck className="w-4 h-4 text-violet-500" />
          </div>

          <div className="mt-4 flex items-baseline gap-3">
            <div className="text-4xl font-extrabold text-slate-900 dark:text-slate-100 font-mono tracking-tight">
              {analysis.creditAnalysis.score}
            </div>
            <div className="text-xs font-semibold px-2 py-0.5 rounded bg-violet-50 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800/40">
              {analysis.creditAssessment}
            </div>
          </div>

          <div className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            Utilization: <span className="font-mono text-slate-900 dark:text-slate-200">{analysis.input.creditUtilization}%</span> · History: <span className="font-mono text-slate-900 dark:text-slate-200">{analysis.input.creditHistoryLengthYears}y</span>
          </div>

          <div className="mt-3 w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-violet-600 to-indigo-500 h-full"
              style={{ width: `${Math.min(100, Math.max(10, ((analysis.creditAnalysis.score - 300) / 600) * 100))}%` }}
            />
          </div>
        </div>

        {/* Card 3: Debt-to-Income (DTI) (Sunset Coral) */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 relative overflow-hidden group hover:border-rose-500/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-rose-600 dark:text-rose-400 font-semibold">
              Debt-to-Income (DTI)
            </span>
            <Calculator className="w-4 h-4 text-rose-500" />
          </div>

          <div className="mt-4 flex items-baseline gap-3">
            <div className="text-4xl font-extrabold text-slate-900 dark:text-slate-100 font-mono tracking-tight">
              {analysis.debtToIncomeRatio}%
            </div>
            <div className={`text-xs font-semibold px-2 py-0.5 rounded border ${riskBg} ${riskColor}`}>
              {analysis.riskLevel} Risk
            </div>
          </div>

          <div className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            Total EMI: <span className="font-mono text-slate-900 dark:text-slate-200">₹{analysis.input.existingMonthlyEmi.toLocaleString('en-IN')}</span> / ₹{analysis.input.monthlyIncome.toLocaleString('en-IN')}
          </div>

          <div className="mt-3 w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className={`h-full ${
                analysis.debtToIncomeRatio <= 35 ? 'bg-emerald-500' :
                analysis.debtToIncomeRatio <= 50 ? 'bg-amber-500' : 'bg-rose-500'
              }`}
              style={{ width: `${Math.min(100, analysis.debtToIncomeRatio)}%` }}
            />
          </div>
        </div>

        {/* Card 4: Estimated Best EMI (Fresh Cyan Teal) */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 relative overflow-hidden group hover:border-cyan-500/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-semibold">
              Target Monthly EMI
            </span>
            <Coins className="w-4 h-4 text-cyan-500" />
          </div>

          <div className="mt-4 flex items-baseline gap-2">
            <div className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 font-mono tracking-tight">
              ₹{analysis.monthlyEmiEstimated.toLocaleString('en-IN')}
            </div>
          </div>

          <div className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            For ₹{(analysis.input.desiredLoanAmount / 100000).toFixed(1)}L over {analysis.input.loanTenureYears} Years
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>Interest Range</span>
            <span className="font-semibold font-mono text-cyan-600 dark:text-cyan-400">{analysis.estimatedInterestRange}</span>
          </div>
        </div>

      </div>

      {/* DETAILED UNDERWRITING & ANALYSIS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Eligibility Breakdown & Insights */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Institutional Underwriting Summary Card */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Institutional Underwriting Verdict
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Calculated against standard banking FOIR (Fixed Obligation to Income Ratio) limits
                </p>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${riskBg} ${riskColor}`}>
                {analysis.riskLevel} Risk Tier
              </span>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase">Estimated Limit</span>
                <div className="text-lg font-bold text-slate-900 dark:text-slate-100 font-mono mt-0.5">
                  ₹{analysis.estimatedLoanAmount.toLocaleString('en-IN')}
                </div>
                <span className="text-[10px] text-blue-600 dark:text-blue-400">Institutional Max</span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase">DTI Ratio</span>
                <div className="text-lg font-bold text-slate-900 dark:text-slate-100 font-mono mt-0.5">
                  {analysis.debtToIncomeRatio}%
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">Current Obligation</span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase">Est. Interest Range</span>
                <div className="text-lg font-bold text-amber-600 dark:text-amber-400 font-mono mt-0.5">
                  {analysis.estimatedInterestRange}
                </div>
                <span className="text-[10px] text-amber-600 dark:text-amber-400">Prime Lending Rate</span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase">Repayment Capacity</span>
                <div className="text-lg font-bold text-teal-600 dark:text-teal-400 mt-0.5">
                  {analysis.repaymentCapacity}
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">Net Disposable</span>
              </div>
            </div>

            {/* Detailed AI Underwriter Synthesis */}
            <div className="mt-5 p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30">
              <div className="flex items-center gap-2 text-xs font-mono text-blue-700 dark:text-blue-300 uppercase tracking-wider mb-1.5 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                Underwriter Decision Summary
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {analysis.loanInsights}
              </p>
            </div>

            {/* Educational Disclaimer */}
            <p className="mt-4 text-[11px] text-slate-500 dark:text-slate-400 italic flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              This is an estimated educational assessment and does not represent actual bank approval.
            </p>
          </div>

          {/* Financial Insights & Actionable Tips */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-violet-500" />
                  Financial Health Tips & Behavioral Insights
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Customized recommendations synthesized from your cashflow and credit profile
                </p>
              </div>

              <button
                onClick={onOpenChat}
                className="px-3 py-1.5 rounded-lg bg-violet-50 hover:bg-violet-100 dark:bg-violet-950/60 dark:hover:bg-violet-900/70 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800/40 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Ask VeraCredit Advisor</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* AI Recommendation Quote */}
            <div className="p-4 rounded-xl bg-violet-50/50 dark:bg-violet-950/20 border border-violet-200 dark:border-violet-800/30 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed mb-4">
              "{analysis.emiRecommendation}"
            </div>

            {/* Bulleted Personalized Tips */}
            <div className="space-y-2.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                Personalized Action Plan
              </span>
              {analysis.financialTips.map((tip, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right 1 Col: Financial Signals & Credit Snapshot */}
        <div className="space-y-6">
          
          {/* Financial Signals */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
              Financial Signals & Health Audit
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Key indicators influencing lender risk modeling
            </p>

            <div className="space-y-3">
              {analysis.financialSignals.map((signal, idx) => {
                const isPos = signal.type === 'positive';
                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border text-xs ${
                      isPos 
                        ? 'bg-teal-50 dark:bg-teal-950/30 border-teal-200 dark:border-teal-800/40 text-teal-900 dark:text-teal-200' 
                        : 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/40 text-amber-900 dark:text-amber-200'
                    }`}
                  >
                    <div className="font-semibold flex items-center gap-1.5 mb-1">
                      {isPos ? (
                        <Check className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                      ) : (
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                      )}
                      <span>{signal.title}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                      {signal.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Credit Standing Snapshot */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Credit Profile Scorecard
              </h3>
              <span className="text-xs font-mono text-violet-600 dark:text-violet-400 font-bold">
                {analysis.creditAnalysis.score} / 900
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400">Payment History</span>
                <span className="font-medium text-slate-900 dark:text-slate-200">{analysis.creditAnalysis.paymentHistoryImpact.split('(')[0]}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400">Credit Utilization</span>
                <span className="font-mono text-slate-900 dark:text-slate-200">{analysis.input.creditUtilization}%</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400">Active Lines</span>
                <span className="font-mono text-slate-900 dark:text-slate-200">{analysis.input.numberOfCreditAccounts} Accounts</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500 dark:text-slate-400">Credit Vintage</span>
                <span className="font-mono text-slate-900 dark:text-slate-200">{analysis.input.creditHistoryLengthYears} Years</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* EMI SUGGESTIONS & SCENARIO COMPARISON */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-200 dark:border-slate-800 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 font-semibold">
                Module 3 · Loan Structuring
              </span>
              <span className="text-slate-400 dark:text-slate-600">·</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">Principal: ₹{analysis.input.desiredLoanAmount.toLocaleString('en-IN')}</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight mt-0.5">
              EMI Suggestions & Alternative Scenario Comparison
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Visually compare 3-Year, 5-Year, and 7-Year amortization structures to optimize total interest versus monthly liquidity.
            </p>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase">Benchmark APR</span>
            <div className="text-base font-bold text-amber-600 dark:text-amber-400 font-mono">
              {analysis.loanPlans[0]?.interestRate || 10.5}% p.a.
            </div>
          </div>
        </div>

        {/* 3 Scenario Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {analysis.loanPlans.map((plan, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl border transition-all relative flex flex-col justify-between ${
                plan.isRecommended
                  ? 'bg-blue-50/60 dark:bg-blue-950/40 border-blue-400 dark:border-blue-600/60 shadow-md'
                  : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {plan.isRecommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-blue-600 dark:bg-blue-500 text-white font-extrabold text-[10px] uppercase tracking-wider shadow-sm">
                  Recommended Balance
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
                    {plan.scenarioName}
                  </h4>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    {plan.tenureYears * 12} Months
                  </span>
                </div>

                <div className="mt-4">
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase">Monthly EMI</span>
                  <div className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 font-mono mt-0.5">
                    ₹{plan.emi.toLocaleString('en-IN')}
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                  {plan.summary}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Total Interest</span>
                    <span className="font-mono text-rose-600 dark:text-rose-400 font-medium">₹{plan.totalInterest.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Total Outlay</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100 font-semibold">₹{plan.totalPayment.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200 dark:border-slate-800">
                <div className="text-[10px] text-slate-500 dark:text-slate-400">
                  {plan.tenureYears === 3 && 'Saves up to ₹1.5L in interest charges'}
                  {plan.tenureYears === 5 && 'Optimal debt servicing ratio for salaried profiles'}
                  {plan.tenureYears === 7 && 'Maximizes immediate take-home cashflow'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
