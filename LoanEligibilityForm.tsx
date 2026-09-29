import React, { useState } from 'react';
import { 
  ShieldAlert, 
  HelpCircle, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  DollarSign, 
  Calendar, 
  User, 
  Briefcase, 
  CreditCard,
  Building2,
  TrendingUp,
  Info
} from 'lucide-react';
import { FinancialInput } from '../types/finance.ts';
import { VeraLogo } from './VeraLogo.tsx';

interface LoanEligibilityFormProps {
  onAnalyze: (input: FinancialInput, saveToSheets: boolean) => Promise<void>;
  isLoading: boolean;
}

export const LoanEligibilityForm: React.FC<LoanEligibilityFormProps> = ({
  onAnalyze,
  isLoading,
}) => {
  const [formData, setFormData] = useState<FinancialInput>({
    fullName: 'Aditya Verma',
    age: 32,
    city: 'Bengaluru',
    employmentType: 'Salaried',
    monthlyIncome: 95000,
    existingMonthlyEmi: 15000,
    desiredLoanAmount: 1800000,
    loanTenureYears: 5,
    creditScore: 742,
    existingLoans: 1,
    paymentHistory: 'Clean (100% on-time)',
    creditUtilization: 24,
    creditHistoryLengthYears: 6,
    numberOfCreditAccounts: 4,
    recentCreditApplications: 1,
    employmentDurationYears: 7,
  });

  const [saveToSheets, setSaveToSheets] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.age || formData.age < 18 || formData.age > 70) {
      errs.age = 'Age must be between 18 and 70';
    }
    if (!formData.monthlyIncome || formData.monthlyIncome <= 0) {
      errs.monthlyIncome = 'Monthly income must be greater than 0';
    }
    if (formData.existingMonthlyEmi < 0) {
      errs.existingMonthlyEmi = 'Existing EMI cannot be negative';
    }
    if (!formData.desiredLoanAmount || formData.desiredLoanAmount <= 0) {
      errs.desiredLoanAmount = 'Loan amount must be greater than 0';
    }
    if (!formData.loanTenureYears || formData.loanTenureYears <= 0 || formData.loanTenureYears > 30) {
      errs.loanTenureYears = 'Tenure must be between 1 and 30 years';
    }
    if (!formData.creditScore || formData.creditScore < 300 || formData.creditScore > 900) {
      errs.creditScore = 'Credit score must be between 300 and 900';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onAnalyze(formData, saveToSheets);
    }
  };

  // Sample preset profiles
  const loadPreset = (type: 'salaried-prime' | 'self-employed' | 'subprime') => {
    if (type === 'salaried-prime') {
      setFormData({
        fullName: 'Sneha Kulkarni',
        age: 29,
        city: 'Pune',
        gender: 'Female',
        employmentType: 'Salaried',
        monthlyIncome: 140000,
        existingMonthlyEmi: 12000,
        desiredLoanAmount: 2500000,
        loanTenureYears: 7,
        loanPurpose: 'Home Loan',
        creditScore: 785,
        paymentHistory: 'Clean (100% on-time)',
        existingLoans: 1,
        creditCardLimit: 400000,
        creditUtilization: 14,
        creditHistoryLengthYears: 8,
        numberOfCreditAccounts: 5,
        recentCreditApplications: 0,
        employmentDurationYears: 6,
      });
    } else if (type === 'self-employed') {
      setFormData({
        fullName: 'Vikram Mehta',
        age: 38,
        city: 'Mumbai',
        gender: 'Male',
        employmentType: 'Business Owner',
        monthlyIncome: 220000,
        existingMonthlyEmi: 45000,
        desiredLoanAmount: 5000000,
        loanTenureYears: 10,
        loanPurpose: 'Business Loan',
        creditScore: 710,
        paymentHistory: 'Clean (100% on-time)',
        existingLoans: 2,
        creditCardLimit: 600000,
        creditUtilization: 38,
        creditHistoryLengthYears: 11,
        numberOfCreditAccounts: 7,
        recentCreditApplications: 2,
        employmentDurationYears: 12,
      });
    } else {
      setFormData({
        fullName: 'Amit Patel',
        age: 26,
        city: 'Ahmedabad',
        gender: 'Male',
        employmentType: 'Freelancer',
        monthlyIncome: 48000,
        existingMonthlyEmi: 18000,
        desiredLoanAmount: 800000,
        loanTenureYears: 3,
        loanPurpose: 'Personal Loan',
        creditScore: 615,
        paymentHistory: 'Occasional late (30-60 days)',
        existingLoans: 3,
        creditCardLimit: 100000,
        creditUtilization: 72,
        creditHistoryLengthYears: 2,
        numberOfCreditAccounts: 3,
        recentCreditApplications: 4,
        employmentDurationYears: 2,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <span className="text-xs font-mono uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 dark:text-blue-300 dark:bg-blue-950/50 dark:border-blue-800/40 px-3 py-1 rounded-full font-semibold shadow-2xs">
          Module 1 · Underwriting Engine
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mt-2">
          Loan Eligibility Assessment
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
          Provide your financial metrics to calculate accurate borrowing limits, DTI ratios, and actuarial risk underwriting.
        </p>
      </div>

      {/* Preset Profiles Bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
          <Sparkles className="w-3.5 h-3.5 text-blue-500" />
          <span className="font-semibold">Quick Demo Profiles:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => loadPreset('salaried-prime')}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/50 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/40 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-xs active:translate-y-0 active:scale-95 cursor-pointer"
          >
            Salaried Prime (785 CIBIL)
          </button>
          <button
            type="button"
            onClick={() => loadPreset('self-employed')}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-violet-50 hover:bg-violet-100 dark:bg-violet-950/50 dark:hover:bg-violet-900/60 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800/40 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-xs active:translate-y-0 active:scale-95 cursor-pointer"
          >
            Business Owner (₹50L Loan)
          </button>
          <button
            type="button"
            onClick={() => loadPreset('subprime')}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/50 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/40 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-xs active:translate-y-0 active:scale-95 cursor-pointer"
          >
            High DTI / Subprime (615 CIBIL)
          </button>
        </div>
      </div>

      {/* Main Form Card */}
      <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
        
        {/* Progress Guide */}
        <div className="border-b border-slate-200 dark:border-slate-800/80 pb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
              Institutional BFSI Underwriting Parameters
            </span>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            All fields evaluated against lender risk thresholds
          </div>
        </div>

        {/* 4 Form Sections */}
        <div className="space-y-8">
          
          {/* Section 1: Personal Information (Royal Sapphire Blue) */}
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 mb-4 uppercase tracking-wider font-mono">
              <User className="w-4 h-4" />
              <span>1. Personal Information</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border ${
                      errors.fullName ? 'border-rose-500' : 'border-slate-300 dark:border-slate-700/60 focus:border-blue-500 dark:focus:border-blue-400'
                    } text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-all`}
                  />
                </div>
                {errors.fullName && (
                  <p className="mt-1 text-xs text-rose-500 dark:text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.fullName}
                  </p>
                )}
              </div>

              {/* Age */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Age (18–70) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="18"
                    max="70"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border ${
                      errors.age ? 'border-rose-500' : 'border-slate-300 dark:border-slate-700/60 focus:border-blue-500 dark:focus:border-blue-400'
                    } text-sm text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-all font-mono`}
                  />
                </div>
                {errors.age && (
                  <p className="mt-1 text-xs text-rose-500 dark:text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.age}
                  </p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Gender
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700/60 text-sm text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-all"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female (Eligible for 0.05% rate rebate)</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Employment Details (Electric Violet) */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 text-sm font-semibold text-violet-600 dark:text-violet-400 mb-4 uppercase tracking-wider font-mono">
              <Briefcase className="w-4 h-4" />
              <span>2. Employment & Stability</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Employment Type */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Employment Type
                </label>
                <select
                  value={formData.employmentType}
                  onChange={(e) => setFormData({ ...formData, employmentType: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700/60 text-sm text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:border-violet-500 dark:focus:border-violet-400 transition-all"
                >
                  <option value="Salaried">Salaried (Corporate / Govt / MNC)</option>
                  <option value="Self Employed">Self Employed Professional</option>
                  <option value="Business Owner">Business Owner / Enterprise</option>
                  <option value="Freelancer">Freelancer / Gig Economy</option>
                  <option value="Student">Student</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Employment Duration */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Employment Duration (Years)
                </label>
                <input
                  type="number"
                  min="0"
                  max="45"
                  value={formData.employmentDurationYears}
                  onChange={(e) => setFormData({ ...formData, employmentDurationYears: parseInt(e.target.value) || 0 })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700/60 text-sm text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:border-violet-500 dark:focus:border-violet-400 transition-all font-mono"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Financial Information (Fresh Cyan Teal) */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 text-sm font-semibold text-cyan-600 dark:text-cyan-400 mb-4 uppercase tracking-wider font-mono">
              <DollarSign className="w-4 h-4" />
              <span>3. Financial Information</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {/* Monthly Income */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Monthly Income (₹) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  step="1000"
                  value={formData.monthlyIncome}
                  onChange={(e) => setFormData({ ...formData, monthlyIncome: parseInt(e.target.value) || 0 })}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border ${
                    errors.monthlyIncome ? 'border-rose-500' : 'border-slate-300 dark:border-slate-700/60 focus:border-cyan-500 dark:focus:border-cyan-400'
                  } text-sm text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 font-mono`}
                />
                {errors.monthlyIncome && (
                  <p className="mt-1 text-xs text-rose-500 dark:text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.monthlyIncome}
                  </p>
                )}
              </div>

              {/* Existing Monthly EMI */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Existing Monthly EMI (₹)
                </label>
                <input
                  type="number"
                  step="500"
                  value={formData.existingMonthlyEmi}
                  onChange={(e) => setFormData({ ...formData, existingMonthlyEmi: parseInt(e.target.value) || 0 })}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border ${
                    errors.existingMonthlyEmi ? 'border-rose-500' : 'border-slate-300 dark:border-slate-700/60 focus:border-cyan-500 dark:focus:border-cyan-400'
                  } text-sm text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 font-mono`}
                />
                {errors.existingMonthlyEmi && (
                  <p className="mt-1 text-xs text-rose-500 dark:text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.existingMonthlyEmi}
                  </p>
                )}
              </div>

              {/* Existing Active Loans Count */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Existing Active Loans
                </label>
                <input
                  type="number"
                  min="0"
                  max="15"
                  value={formData.existingLoans}
                  onChange={(e) => setFormData({ ...formData, existingLoans: parseInt(e.target.value) || 0 })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700/60 text-sm text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 font-mono"
                />
              </div>

              {/* Desired Loan Amount */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Desired Loan Amount (₹) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  step="10000"
                  value={formData.desiredLoanAmount}
                  onChange={(e) => setFormData({ ...formData, desiredLoanAmount: parseInt(e.target.value) || 0 })}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border ${
                    errors.desiredLoanAmount ? 'border-rose-500' : 'border-slate-300 dark:border-slate-700/60 focus:border-cyan-500 dark:focus:border-cyan-400'
                  } text-sm text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 font-mono`}
                />
                {errors.desiredLoanAmount && (
                  <p className="mt-1 text-xs text-rose-500 dark:text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.desiredLoanAmount}
                  </p>
                )}
              </div>

              {/* Loan Tenure */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Loan Tenure (Years) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={formData.loanTenureYears}
                  onChange={(e) => setFormData({ ...formData, loanTenureYears: parseInt(e.target.value) || 0 })}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border ${
                    errors.loanTenureYears ? 'border-rose-500' : 'border-slate-300 dark:border-slate-700/60 focus:border-cyan-500 dark:focus:border-cyan-400'
                  } text-sm text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 font-mono`}
                />
                {errors.loanTenureYears && (
                  <p className="mt-1 text-xs text-rose-500 dark:text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.loanTenureYears}
                  </p>
                )}
              </div>

              {/* Loan Purpose */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Loan Purpose
                </label>
                <select
                  value={formData.loanPurpose}
                  onChange={(e) => setFormData({ ...formData, loanPurpose: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700/60 text-sm text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400"
                >
                  <option value="Home Loan">Home Loan (Lowest Base Rate: ~8.50%)</option>
                  <option value="Personal Loan">Personal Loan (Unsecured: ~11.00%)</option>
                  <option value="Business Loan">Business Loan (Commercial: ~12.50%)</option>
                  <option value="Education Loan">Education Loan (Tax Concessions)</option>
                  <option value="Auto Loan">Auto Loan (Collateralized)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 4: Credit Bureau Parameters (Soft Amber Gold) */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 text-sm font-semibold text-amber-600 dark:text-amber-400 mb-4 uppercase tracking-wider font-mono">
              <CreditCard className="w-4 h-4" />
              <span>4. Credit Bureau Parameters</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {/* Credit Score */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5 flex items-center justify-between">
                  <span>Credit Score (300–900) <span className="text-rose-500">*</span></span>
                  <span className={`text-[10px] font-mono font-semibold ${
                    formData.creditScore >= 750 ? 'text-blue-600 dark:text-blue-400' : formData.creditScore >= 670 ? 'text-teal-600 dark:text-teal-400' : 'text-amber-600 dark:text-amber-400'
                  }`}>
                    {formData.creditScore >= 750 ? 'Prime Tier' : formData.creditScore >= 670 ? 'Standard Tier' : 'Subprime Tier'}
                  </span>
                </label>
                <input
                  type="number"
                  min="300"
                  max="900"
                  value={formData.creditScore}
                  onChange={(e) => setFormData({ ...formData, creditScore: parseInt(e.target.value) || 0 })}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border ${
                    errors.creditScore ? 'border-rose-500' : 'border-slate-300 dark:border-slate-700/60 focus:border-amber-500 dark:focus:border-amber-400'
                  } text-sm text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500/30 font-mono`}
                />
                {errors.creditScore && (
                  <p className="mt-1 text-xs text-rose-500 dark:text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.creditScore}
                  </p>
                )}
              </div>

              {/* Credit Card Limit */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Total Credit Limit (₹)
                </label>
                <input
                  type="number"
                  step="10000"
                  value={formData.creditCardLimit}
                  onChange={(e) => setFormData({ ...formData, creditCardLimit: parseInt(e.target.value) || 0 })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700/60 text-sm text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 font-mono"
                />
              </div>

              {/* Credit Utilization */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5 flex justify-between">
                  <span>Revolving Utilization (%)</span>
                  <span className={`text-[10px] font-mono ${formData.creditUtilization <= 30 ? 'text-teal-600 dark:text-teal-400' : 'text-amber-600 dark:text-amber-400'}`}>
                    {formData.creditUtilization <= 30 ? 'Healthy (<30%)' : 'Elevated'}
                  </span>
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.creditUtilization}
                  onChange={(e) => setFormData({ ...formData, creditUtilization: parseInt(e.target.value) || 0 })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700/60 text-sm text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 font-mono"
                />
              </div>

              {/* Credit History Length */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Credit History Vintage (Years)
                </label>
                <input
                  type="number"
                  min="0"
                  max="35"
                  value={formData.creditHistoryLengthYears}
                  onChange={(e) => setFormData({ ...formData, creditHistoryLengthYears: parseInt(e.target.value) || 0 })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700/60 text-sm text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 font-mono"
                />
              </div>

              {/* Number of Credit Accounts */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Number of Credit Accounts (Cards/Loans)
                </label>
                <input
                  type="number"
                  min="1"
                  max="25"
                  value={formData.numberOfCreditAccounts}
                  onChange={(e) => setFormData({ ...formData, numberOfCreditAccounts: parseInt(e.target.value) || 0 })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700/60 text-sm text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 font-mono"
                />
              </div>

              {/* Recent Inquiries */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Recent Inquiries (Past 6 Months)
                </label>
                <input
                  type="number"
                  min="0"
                  max="15"
                  value={formData.recentCreditApplications}
                  onChange={(e) => setFormData({ ...formData, recentCreditApplications: parseInt(e.target.value) || 0 })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700/60 text-sm text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 font-mono"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Options & Google Sheets Sync Toggle */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={saveToSheets}
              onChange={(e) => setSaveToSheets(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-xs text-slate-600 dark:text-slate-300">
              Save analysis record to <strong className="text-slate-900 dark:text-slate-100">Google Sheets & Activity Log</strong>
            </span>
          </label>

          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            Institutional BFSI Underwriting & Actuarial Algorithm
          </div>
        </div>

        {/* Submit Button with Rich Dynamic Transitions & VeraCredit V Monogram */}
        <div className="mt-6">
          <button
            type="submit"
            disabled={isLoading}
            className={`relative group overflow-hidden w-full py-4 px-6 rounded-2xl font-semibold text-sm tracking-wide transition-all duration-300 ease-out shadow-md flex items-center justify-center gap-3 cursor-pointer ${
              isLoading
                ? 'bg-slate-400 dark:bg-slate-800 text-slate-200 dark:text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.985] animate-engine-gradient'
            }`}
          >
            {/* Shimmer Light Ray Transition on Hover */}
            {!isLoading && (
              <span 
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" 
                aria-hidden="true"
              />
            )}

            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span className="animate-pulse">Underwriting Engine Analyzing Financial Profile...</span>
              </>
            ) : (
              <>
                <div className="w-6 h-6 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <VeraLogo size={22} variant="mark" />
                </div>
                <span className="font-bold tracking-wide">Analyze with VeraCredit Engine</span>
                <Sparkles className="w-4 h-4 text-cyan-200 group-hover:rotate-12 transition-transform duration-300" />
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
};
