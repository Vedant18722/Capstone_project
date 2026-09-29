import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  DollarSign, 
  Percent, 
  Calendar, 
  ArrowRight,
  Coins
} from 'lucide-react';
import { calculateEmi } from '../server/financeEngine.ts';

interface EmiCalculatorProps {
  onApplyToChecker?: (amount: number, tenure: number) => void;
}

export const EmiCalculator: React.FC<EmiCalculatorProps> = ({ onApplyToChecker }) => {
  const [principal, setPrincipal] = useState<number>(750000);
  const [interestRate, setInterestRate] = useState<number>(10.5);
  const [tenureYears, setTenureYears] = useState<number>(5);

  // Real-time calculation using the exact standard formula
  const result = useMemo(() => {
    return calculateEmi(principal, interestRate, tenureYears);
  }, [principal, interestRate, tenureYears]);

  const principalPercent = result.totalPayment > 0 
    ? Math.round((principal / result.totalPayment) * 100) 
    : 100;
  const interestPercent = 100 - principalPercent;

  const presets = [
    { name: 'Personal Loan', p: 500000, r: 11.5, t: 5 },
    { name: 'Home Loan', p: 3500000, r: 8.5, t: 20 },
    { name: 'Car Loan', p: 800000, r: 9.0, t: 5 },
    { name: 'Education Loan', p: 1500000, r: 9.5, t: 7 },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-mono uppercase tracking-wider text-cyan-700 bg-cyan-50 border border-cyan-200 dark:text-cyan-300 dark:bg-cyan-950/60 dark:border-cyan-800/40 px-3 py-1 rounded-full font-medium shadow-2xs">
          Module 3 · Precision Mathematical Engine
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mt-2">
          Interactive EMI Calculator
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
          Compute real-time monthly installments, total interest accrual, and principal breakdowns using standard banking amortization formulas.
        </p>
      </div>

      {/* Preset Buttons with Smooth Transitions */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="text-xs text-slate-500 dark:text-slate-400 mr-2 font-mono uppercase text-[11px]">Quick Benchmarks:</span>
        {presets.map((preset, idx) => (
          <button
            key={idx}
            onClick={() => {
              setPrincipal(preset.p);
              setInterestRate(preset.r);
              setTenureYears(preset.t);
            }}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer shadow-2xs"
          >
            {preset.name} (₹{(preset.p / 100000).toFixed(1)}L @ {preset.r}%)
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Sliders & Number Inputs */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-8">
          
          {/* 1. Loan Amount (Sapphire Blue) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Coins className="w-4 h-4 text-blue-500" />
                <span>Loan Amount</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">₹</span>
                <input
                  type="number"
                  step="10000"
                  min="50000"
                  max="10000000"
                  value={principal}
                  onChange={(e) => setPrincipal(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-40 pl-7 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 focus:border-blue-500 text-sm font-mono text-slate-900 dark:text-slate-100 text-right focus:outline-none"
                />
              </div>
            </div>

            <input
              type="range"
              min="50000"
              max="10000000"
              step="25000"
              value={principal}
              onChange={(e) => setPrincipal(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-blue-400"
            />
            <div className="flex justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
              <span>₹50K</span>
              <span>₹25 Lakh</span>
              <span>₹50 Lakh</span>
              <span>₹1 Crore</span>
            </div>
          </div>

          {/* 2. Interest Rate (Sunset Coral / Rose) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Percent className="w-4 h-4 text-rose-500" />
                <span>Interest Rate (% per annum)</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  min="5"
                  max="30"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Math.max(0.1, parseFloat(e.target.value) || 0.1))}
                  className="w-28 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 focus:border-rose-500 text-sm font-mono text-slate-900 dark:text-slate-100 text-right focus:outline-none"
                />
              </div>
            </div>

            <input
              type="range"
              min="6"
              max="24"
              step="0.25"
              value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500 dark:accent-rose-400"
            />
            <div className="flex justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
              <span>6% (Prime Secured)</span>
              <span>12%</span>
              <span>18%</span>
              <span>24% (Unsecured)</span>
            </div>
          </div>

          {/* 3. Loan Tenure (Electric Violet) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-violet-500" />
                <span>Loan Tenure</span>
              </label>
              <div className="text-sm font-mono font-bold text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-xl">
                {tenureYears} Years ({tenureYears * 12} Mos)
              </div>
            </div>

            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={tenureYears}
              onChange={(e) => setTenureYears(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-600 dark:accent-violet-400"
            />
            <div className="flex justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
              <span>1 Year</span>
              <span>5 Years</span>
              <span>15 Years</span>
              <span>30 Years</span>
            </div>
          </div>

          {onApplyToChecker && (
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => onApplyToChecker(principal, tenureYears)}
                className="w-full py-3.5 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 dark:hover:bg-blue-900/70 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/40 text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 active:scale-98 cursor-pointer"
              >
                <span>Check Eligibility with this Amount & Tenure</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>

        {/* Right Column: Calculated Results & Breakdowns */}
        <div className="lg:col-span-5 glass-panel-elevated p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-6 flex flex-col justify-between">
          
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Calculated Monthly Obligation
            </div>
            
            <div className="mt-2 text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 font-mono tracking-tight">
              ₹{result.emi.toLocaleString('en-IN')}
            </div>

            <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
              Fixed equal monthly installment amortized over {tenureYears * 12} payment cycles.
            </p>

            {/* Principal vs Interest Breakdown Visual Bar */}
            <div className="mt-8 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-blue-600" />
                  Principal ({principalPercent}%)
                </span>
                <span className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-rose-500" />
                  Interest ({interestPercent}%)
                </span>
              </div>

              <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex">
                <div 
                  className="bg-blue-600 transition-all duration-300"
                  style={{ width: `${principalPercent}%` }}
                />
                <div 
                  className="bg-rose-500 transition-all duration-300"
                  style={{ width: `${interestPercent}%` }}
                />
              </div>
            </div>

            {/* Amortization Summary Figures */}
            <div className="mt-6 space-y-3 pt-6 border-t border-slate-200 dark:border-slate-800 text-xs">
              <div className="flex justify-between py-1">
                <span className="text-slate-500 dark:text-slate-400">Principal Borrowed</span>
                <span className="font-mono font-semibold text-slate-900 dark:text-slate-100">₹{principal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500 dark:text-slate-400">Total Interest Payable</span>
                <span className="font-mono font-semibold text-rose-600 dark:text-rose-400">₹{result.totalInterest.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between py-1 border-t border-slate-100 dark:border-slate-800 pt-2 text-sm">
                <span className="font-bold text-slate-800 dark:text-slate-200">Total Outlay (P + I)</span>
                <span className="font-mono font-extrabold text-slate-900 dark:text-slate-100">₹{result.totalPayment.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
            Formula: <code className="font-mono text-cyan-600 dark:text-cyan-400 font-semibold">EMI = [P x r x (1+r)^n] / [(1+r)^n - 1]</code>. Actual bank amortizations include processing charges and stamp duty.
          </div>

        </div>

      </div>
    </div>
  );
};
