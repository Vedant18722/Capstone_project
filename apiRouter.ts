/**
 * FinSight AI - Express API Router
 * Exposes all REST endpoints for the AI Loan Eligibility Checker Platform
 */

import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import {
  FinancialInput,
  FinSightAnalysisResult,
  validateFinancialInput,
  runClaudeAIAnalysis,
  runAlgorithmicUnderwriting,
  calculateEmi,
  askFinSightAiChat,
  saveRecordToGoogleSheets,
} from './financeEngine.js';

export const apiRouter = Router();

// In-memory persistent history store (pre-seeded with realistic financial activities)
const historyStore: FinSightAnalysisResult[] = [
  {
    id: 'FIN-PREV-01',
    timestamp: new Date(Date.now() - 3600 * 1000 * 2).toISOString(),
    input: {
      fullName: 'Rahul Sharma',
      age: 29,
      city: 'Bengaluru',
      employmentType: 'Salaried',
      employmentDurationYears: 4,
      monthlyIncome: 95000,
      existingMonthlyEmi: 15000,
      existingLoans: 1,
      desiredLoanAmount: 750000,
      loanTenureYears: 5,
      creditScore: 752,
      paymentHistory: 'Clean (100% on-time)',
      creditUtilization: 24,
      numberOfCreditAccounts: 4,
      recentCreditApplications: 1,
      creditHistoryLengthYears: 5,
    },
    eligibilityPercentage: 84,
    riskLevel: 'Low',
    estimatedLoanAmount: 820000,
    creditAssessment: 'Very Good',
    debtToIncomeRatio: 16,
    estimatedInterestRange: '9.0% – 11.2%',
    repaymentCapacity: 'Strong',
    monthlyEmiEstimated: 15926,
    emiRecommendation: 'Your requested ₹7.5 Lakh loan creates an EMI of ₹15,926, which sits comfortably within your net cashflow.',
    loanInsights: 'Strong employment stability in Bengaluru tech ecosystem paired with 24% credit utilization demonstrates exemplary credit stewardship.',
    financialTips: [
      'Maintain automated auto-debit payments to keep repayment score at 100%.',
      'Pay down revolving credit card balances below 20% prior to final disbursement.',
      'Opt for the 5-year balanced plan to preserve liquid emergency liquidity.',
    ],
    creditAnalysis: {
      score: 752,
      scoreCategory: 'Very Good',
      riskLevel: 'Low',
      paymentHistoryImpact: 'Clean history (Top tier)',
      utilizationImpact: '24% (Optimal)',
      ageImpact: '5 years (Mature footprint)',
      inquiriesImpact: '1 inquiry (Negligible)',
      strengths: ['100% on-time payment track record', 'DTI below 20% limit', 'Stable salaried tenure'],
      potentialConcerns: ['Ensure no new credit applications before loan disbursement'],
      improvementSuggestions: ['Maintain low card utilization to cross 800 threshold within 12 months'],
    },
    loanPlans: [
      {
        tenureYears: 3,
        tenureMonths: 36,
        emi: 24208,
        totalInterest: 121488,
        totalPayment: 871488,
        interestRate: 10.0,
        scenarioName: '3 Years Plan',
        summary: 'Higher monthly EMI with significantly reduced cumulative interest.',
      },
      {
        tenureYears: 5,
        tenureMonths: 60,
        emi: 15936,
        totalInterest: 206160,
        totalPayment: 956160,
        interestRate: 10.0,
        scenarioName: '5 Years Plan',
        summary: 'Balanced monthly EMI and balanced total interest burden.',
        isRecommended: true,
      },
      {
        tenureYears: 7,
        tenureMonths: 84,
        emi: 12470,
        totalInterest: 297480,
        totalPayment: 1047480,
        interestRate: 10.0,
        scenarioName: '7 Years Plan',
        summary: 'Lowest monthly EMI burden, though total interest paid is higher.',
      },
    ],
    financialSignals: [
      { type: 'positive', title: 'Healthy Debt-to-Income', description: 'Your DTI of 16% provides comfortable repayment headroom.' },
      { type: 'positive', title: 'Prime Credit Standing', description: 'Credit score of 752 qualifies for competitive tier-1 prime rates.' },
      { type: 'positive', title: 'Optimal Credit Utilization', description: 'Utilizing 24% of credit limit proves disciplined revolving usage.' },
    ],
    aiEngineUsed: 'VeraCredit Institutional Underwriting Engine',
    disclaimer: 'VeraCredit provides educational financial estimates and algorithmic guidance. Results do not represent actual bank approval and should not be considered professional financial advice.',
    sheetSynced: true,
  },
];

/**
 * POST /api/analyze
 * Main pipeline: User Input -> Data Validation -> Claude API -> Financial Intelligence
 */
apiRouter.post('/analyze', async (req: Request, res: Response) => {
  try {
    const input: FinancialInput = req.body;

    // 1. Backend Input Validation
    const validationErrors = validateFinancialInput(input);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: validationErrors,
      });
    }

    // 2. Claude AI Analysis (with Gemini/BFSI fallback)
    const analysis = await runClaudeAIAnalysis(input);

    // 3. Attempt Google Sheets Sync if webhook configured or requested
    if (req.body.saveToSheets !== false) {
      const syncResult = await saveRecordToGoogleSheets(analysis);
      analysis.sheetSynced = syncResult.success;
    }

    // 4. Save to history
    historyStore.unshift(analysis);
    if (historyStore.length > 50) historyStore.pop();

    return res.json({
      success: true,
      data: analysis,
    });
  } catch (error: any) {
    console.error('Analysis error:', error);
    return res.status(500).json({
      success: false,
      error: 'Unable to complete underwriting analysis right now. Please check your parameters and try again.',
      message: error?.message || 'Server processing error',
    });
  }
});

/**
 * POST /api/loan-eligibility
 * Direct loan eligibility calculation endpoint
 */
apiRouter.post('/loan-eligibility', (req: Request, res: Response) => {
  try {
    const input: FinancialInput = req.body;
    const errors = validateFinancialInput(input);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }
    const result = runAlgorithmicUnderwriting(input);
    return res.json({
      success: true,
      eligibilityPercentage: result.eligibilityPercentage,
      estimatedLoanAmount: result.estimatedLoanAmount,
      riskLevel: result.riskLevel,
      dti: result.debtToIncomeRatio,
      repaymentCapacity: result.repaymentCapacity,
      estimatedInterestRange: result.estimatedInterestRange,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * POST /api/credit-analysis
 * Dedicated Credit Score breakdown endpoint
 */
apiRouter.post('/credit-analysis', (req: Request, res: Response) => {
  try {
    const input: FinancialInput = req.body;
    if (!input.creditScore || input.creditScore < 300 || input.creditScore > 900) {
      return res.status(400).json({ success: false, error: 'Credit score must be between 300 and 900.' });
    }
    const result = runAlgorithmicUnderwriting(input);
    return res.json({
      success: true,
      creditAnalysis: result.creditAnalysis,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * POST /api/emi
 * Real-time EMI calculator endpoint
 */
apiRouter.post('/emi', (req: Request, res: Response) => {
  try {
    const { principal, interestRate, tenureYears } = req.body;
    const p = Number(principal);
    const r = Number(interestRate);
    const t = Number(tenureYears);

    if (isNaN(p) || p <= 0 || isNaN(r) || r <= 0 || isNaN(t) || t <= 0) {
      return res.status(400).json({ success: false, error: 'Principal, interest rate, and tenure must be positive numbers.' });
    }

    const calculation = calculateEmi(p, r, t);
    return res.json({
      success: true,
      data: {
        principal: p,
        interestRate: r,
        tenureYears: t,
        monthlyEmi: calculation.emi,
        totalInterest: calculation.totalInterest,
        totalPayment: calculation.totalPayment,
        tenureMonths: calculation.tenureMonths,
      },
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * POST /api/financial-tips
 * Get tailored financial recommendations
 */
apiRouter.post('/financial-tips', (req: Request, res: Response) => {
  try {
    const input: FinancialInput = req.body;
    const result = runAlgorithmicUnderwriting(input);
    return res.json({
      success: true,
      tips: result.financialTips,
      signals: result.financialSignals,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * POST /api/save-record
 * Save analysis to Google Sheets and in-memory log
 */
apiRouter.post('/save-record', async (req: Request, res: Response) => {
  try {
    const record: FinSightAnalysisResult = req.body;
    if (!record || !record.input) {
      return res.status(400).json({ success: false, error: 'Invalid record data.' });
    }

    const syncRes = await saveRecordToGoogleSheets(record);

    // Update record in history store if exists
    const idx = historyStore.findIndex(h => h.id === record.id);
    if (idx >= 0) {
      historyStore[idx].sheetSynced = syncRes.success;
    } else {
      historyStore.unshift({ ...record, sheetSynced: syncRes.success });
    }

    return res.json({
      success: true,
      message: syncRes.message,
      sheetSynced: syncRes.success,
      recordId: record.id,
      timestamp: record.timestamp,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * GET /api/history
 * Fetch past financial activities
 */
apiRouter.get('/history', (_req: Request, res: Response) => {
  return res.json({
    success: true,
    data: historyStore,
  });
});

/**
 * POST /api/chat
 * Interactive "Ask FinSight AI" advice channel
 */
apiRouter.post('/chat', async (req: Request, res: Response) => {
  try {
    const { question, context } = req.body;
    if (!question || typeof question !== 'string' || question.trim().length === 0) {
      return res.status(400).json({ success: false, error: 'Question cannot be empty.' });
    }

    const answer = await askFinSightAiChat(question, context || {});
    return res.json({
      success: true,
      answer,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: 'VeraCredit advisor is temporarily unavailable. Please try again.',
      message: err.message,
    });
  }
});

/**
 * GET /api/download-zip
 * Serves the full project archive for GitHub export
 */
apiRouter.get('/download-zip', (_req: Request, res: Response) => {
  const zipPath = path.resolve('finsight-ai.zip');
  if (fs.existsSync(zipPath)) {
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename="finsight-ai.zip"');
    return res.sendFile(zipPath);
  } else {
    return res.status(404).json({ success: false, error: 'Project archive not found.' });
  }
});
