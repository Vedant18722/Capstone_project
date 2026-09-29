import React from 'react';
import { AlertCircle, Lock } from 'lucide-react';
import { VeraLogo } from './VeraLogo.tsx';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
}) => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#090d16] mt-20 pt-14 pb-10 text-xs text-slate-600 dark:text-slate-400 print:hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <VeraLogo size={32} variant="badge" />
              <span className="text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                Vera<span className="text-blue-600 dark:text-blue-400">Credit</span>
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
              True Underwriting. Real Financial Clarity. An institutional BFSI decision-support platform integrating loan eligibility underwriting, credit bureau pillar decomposition, real-time EMI optimization, and institutional underwriting intelligence.
            </p>
          </div>

          {/* Core Tools */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider font-mono mb-3">
              Platform Tools
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('checker')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Loan Eligibility Checker
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('credit')}
                  className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors cursor-pointer"
                >
                  Credit Score Analyzer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('emi')}
                  className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  EMI Calculator & Scenarios
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('history')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Activity Audit History
                </button>
              </li>
            </ul>
          </div>

          {/* Underwriting Standards */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider font-mono mb-3">
              BFSI Standards
            </h4>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
              <li>Fixed Obligation to Income (FOIR)</li>
              <li>Debt-to-Income (DTI) Guardrails</li>
              <li>Compound Amortization Math</li>
              <li>5-Pillar Credit Decomposition</li>
              <li>Google Sheets Webhook Sync</li>
            </ul>
          </div>

        </div>

        {/* Security & Disclaimer Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400">
          
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>Educational Financial Disclaimer</span>
            </div>
            <p className="leading-relaxed">
              VeraCredit provides educational financial estimates and algorithmic guidance. Results do not represent actual bank approval and should not be considered professional financial advice. Actual loan sanction is subject to lender credit policies, physical verification, and bureau audits.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span>Consumer Privacy & Data Protection</span>
            </div>
            <p className="leading-relaxed">
              VeraCredit will never request or store banking passwords, one-time passwords (OTPs), ATM PINs, card CVVs, or login credentials. Calculations are processed in-memory and via secure server-side API proxy.
            </p>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <div>
            © {new Date().getFullYear()} VeraCredit Platform. True Underwriting. Real Financial Clarity.
          </div>
          <div className="flex items-center gap-2">
            <span>Institutional BFSI Architecture</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
