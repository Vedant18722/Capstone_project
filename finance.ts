export interface FinancialInput {
  fullName: string;
  age: number;
  city: string;
  gender?: 'Male' | 'Female' | 'Other';
  employmentType: 'Salaried' | 'Self Employed' | 'Business Owner' | 'Freelancer' | 'Student' | 'Other';
  employmentDurationYears: number;
  monthlyIncome: number;
  existingMonthlyEmi: number;
  existingLoans: number;
  desiredLoanAmount: number;
  loanTenureYears: number;
  loanPurpose?: string;
  creditScore: number;
  paymentHistory: 'Clean (100% on-time)' | 'Occasional late (30-60 days)' | 'Multiple defaults / delinquencies';
  creditUtilization: number;
  creditCardLimit?: number;
  numberOfCreditAccounts: number;
  recentCreditApplications: number;
  creditHistoryLengthYears: number;
}

export interface LoanPlanScenario {
  tenureYears: number;
  tenureMonths: number;
  emi: number;
  totalInterest: number;
  totalPayment: number;
  interestRate: number;
  scenarioName: string;
  summary: string;
  isRecommended?: boolean;
}

export interface FinancialSignal {
  type: 'positive' | 'warning' | 'neutral';
  title: string;
  description: string;
}

export interface CreditBreakdown {
  score: number;
  scoreCategory: 'Excellent' | 'Very Good' | 'Good' | 'Fair' | 'Poor';
  riskLevel: 'Low' | 'Moderate' | 'High';
  paymentHistoryImpact: string;
  utilizationImpact: string;
  ageImpact: string;
  inquiriesImpact: string;
  strengths: string[];
  potentialConcerns: string[];
  improvementSuggestions: string[];
}

export interface FinSightAnalysisResult {
  id: string;
  timestamp: string;
  input: FinancialInput;
  eligibilityPercentage: number;
  riskLevel: 'Low' | 'Moderate' | 'High';
  estimatedLoanAmount: number;
  creditAssessment: 'Excellent' | 'Very Good' | 'Good' | 'Fair' | 'Poor';
  debtToIncomeRatio: number;
  estimatedInterestRange: string;
  repaymentCapacity: 'Strong' | 'Good' | 'Moderate' | 'Stretched';
  monthlyEmiEstimated: number;
  emiRecommendation: string;
  loanInsights: string;
  financialTips: string[];
  creditAnalysis: CreditBreakdown;
  loanPlans: LoanPlanScenario[];
  financialSignals: FinancialSignal[];
  aiEngineUsed: string;
  disclaimer: string;
  sheetSynced?: boolean;
}

export interface ValidationError {
  field: string;
  message: string;
}
