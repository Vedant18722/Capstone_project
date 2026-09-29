import React, { useState, useEffect } from 'react';
import { 
  History, 
  Download, 
  ArrowRight, 
  Search, 
  Database 
} from 'lucide-react';
import { FinSightAnalysisResult } from '../types/finance.ts';

interface HistoryViewProps {
  onSelectRecord: (record: FinSightAnalysisResult) => void;
  onStartNew: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ onSelectRecord, onStartNew }) => {
  const [records, setRecords] = useState<FinSightAnalysisResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchHistory = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/history');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setRecords(data.data);
      }
    } catch (err) {
      console.warn('Failed to load history:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const filtered = records.filter((r) => {
    const term = searchTerm.toLowerCase();
    return (
      r.input.fullName.toLowerCase().includes(term) ||
      (r.input.employmentType && r.input.employmentType.toLowerCase().includes(term)) ||
      r.riskLevel.toLowerCase().includes(term)
    );
  });

  const exportCSV = () => {
    if (records.length === 0) return;
    const headers = [
      'Record ID',
      'Timestamp',
      'Full Name',
      'Age',
      'Employment',
      'Monthly Income (INR)',
      'Existing EMI (INR)',
      'Desired Loan (INR)',
      'Tenure (Years)',
      'Credit Score',
      'Eligibility (%)',
      'Risk Level',
      'Estimated Limit (INR)',
      'Monthly EMI (INR)',
      'DTI (%)',
      'Underwriting Model',
      'Google Sheets Synced',
    ];

    const rows = records.map((r) => [
      r.id,
      r.timestamp,
      `"${r.input.fullName}"`,
      r.input.age,
      r.input.employmentType,
      r.input.monthlyIncome,
      r.input.existingMonthlyEmi,
      r.input.desiredLoanAmount,
      r.input.loanTenureYears,
      r.creditAnalysis.score,
      r.eligibilityPercentage,
      r.riskLevel,
      r.estimatedLoanAmount,
      r.monthlyEmiEstimated,
      r.debtToIncomeRatio,
      `"VeraCredit Underwriting Engine"`,
      r.sheetSynced ? 'YES' : 'NO',
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `VeraCredit_History_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 dark:text-blue-300 dark:bg-blue-950/60 dark:border-blue-800/40 px-3 py-1 rounded-full font-semibold shadow-2xs">
            Persistent Audit & Activity Log
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mt-2">
            Recent Financial Activity
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Historical loan assessments, credit health profiles, and Google Sheets audit sync records.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={exportCSV}
            disabled={records.length === 0}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/60 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-95 flex items-center gap-1.5 disabled:opacity-40 cursor-pointer shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-blue-500" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={onStartNew}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-xs font-semibold text-white shadow-sm shadow-blue-500/20 transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-95 flex items-center gap-1.5 cursor-pointer"
          >
            <span>New Assessment</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 transition-colors" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search activity by applicant name or risk tier..."
          className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700 focus:border-blue-500 text-sm text-slate-900 dark:text-slate-100 focus:outline-none placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-200 focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      {/* Record Cards */}
      {isLoading ? (
        <div className="text-center py-16">
          <div className="w-8 h-8 border-2 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-slate-500 dark:text-slate-400">Loading saved assessments...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="glass-panel p-12 text-center rounded-3xl border border-slate-200/80 dark:border-slate-800">
          <History className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">No Financial Activities Found</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            {searchTerm ? 'No results matched your search term.' : 'Run your first loan eligibility analysis to populate persistent activity.'}
          </p>
          <button
            onClick={onStartNew}
            className="mt-5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer shadow-sm shadow-blue-500/20"
          >
            Run Loan Eligibility Check
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((record) => {
            const riskColor = 
              record.riskLevel === 'Low' ? 'text-emerald-600 dark:text-emerald-400' :
              record.riskLevel === 'Moderate' ? 'text-amber-600 dark:text-amber-400' : 'text-rose-600 dark:text-rose-400';

            return (
              <div
                key={record.id}
                className="glass-panel p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/60 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  {/* Top line: Name & Date */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-500 transition-colors">
                        {record.input.fullName}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {record.input.employmentType}
                      </p>
                    </div>

                    <span className="text-[10px] font-mono text-slate-400">
                      {new Date(record.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                    </span>
                  </div>

                  {/* 3 Metric Summary Boxes */}
                  <div className="mt-4 grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-center">
                    <div>
                      <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">Eligibility</div>
                      <div className="text-sm font-bold text-blue-600 dark:text-blue-400 font-mono mt-0.5">
                        {record.eligibilityPercentage}%
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">Credit</div>
                      <div className="text-sm font-bold text-violet-600 dark:text-violet-400 font-mono mt-0.5">
                        {record.creditAnalysis.score}
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">Risk</div>
                      <div className={`text-sm font-bold font-mono mt-0.5 ${riskColor}`}>
                        {record.riskLevel}
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="mt-4 space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-600 dark:text-slate-300">
                      <span className="text-slate-500 dark:text-slate-400">Requested Loan:</span>
                      <span className="font-mono font-medium text-slate-900 dark:text-slate-100">₹{record.input.desiredLoanAmount.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex justify-between text-slate-600 dark:text-slate-300">
                      <span className="text-slate-500 dark:text-slate-400">Estimated Monthly EMI:</span>
                      <span className="font-mono font-bold text-slate-900 dark:text-slate-100">₹{record.monthlyEmiEstimated.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex justify-between text-slate-600 dark:text-slate-300">
                      <span className="text-slate-500 dark:text-slate-400">Monthly Income:</span>
                      <span className="font-mono text-slate-700 dark:text-slate-300">₹{record.input.monthlyIncome.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="mt-5 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                    <Database className="w-3 h-3 text-cyan-500" />
                    <span>Sheets: {record.sheetSynced ? 'Synced' : 'Saved'}</span>
                  </div>

                  <button
                    onClick={() => onSelectRecord(record)}
                    className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>View Snapshot</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
