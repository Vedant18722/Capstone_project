VeraCredit — Institutional Loan Eligibility & Financial Intelligence Platform
"True Underwriting. Real Financial Clarity."

VeraCredit is a complete, full-stack BFSI (Banking, Financial Services, and Insurance) financial decision-support platform built strictly according to the reference architectural workflow diagram:

                    ┌─────────────────────────────┐
                    │   HTML, CSS, JavaScript     │
                    │        (Frontend)           │
                    └──────────────┬──────────────┘
                                   │
                                   ▼
┌──────────────────────┐     ┌──────────────┐
│  VeraCredit Loan     │────▶│  User Input  │
│  Eligibility Engine  │     └──────┬───────┘
└──────────────────────┘            │
                                    │
                                    ▼
                          ┌─────────────────────┐
                          │   Underwriting AI   │
                          │   & Actuarial Rules │
                          └──────────┬──────────┘
                                     │
                    ┌────────────────┼─────────────────┐
                    ▼                ▼                 ▼
          ┌────────────────┐ ┌────────────────┐ ┌──────────────────┐
          │ Financial Tips │ │ Eligibility    │ │ EMI Suggestions  │
          │ & Insights     │ │ Analysis &     │ │ & Loan Insights  │
          │                │ │ Risk Assessment│ │                  │
          └────────────────┘ └────────────────┘ └──────────────────┘
                                     │
                                     ▼
                            ┌──────────────────┐
                            │ Credit Score     │
                            │ Analysis         │
                            └──────────────────┘
                                     │
                                     ▼
                            ┌──────────────────┐
                            │  Google Sheets   │
                            │  (Storage/Audit) │
                            └──────────────────┘
1. Core Platform Modules
The platform unites FOUR core BFSI tools into a single cohesive experience:

Loan Eligibility Checker & Risk Assessment

Evaluates borrowing limits, FOIR (Fixed Obligation to Income Ratio), and DTI (Debt-to-Income).
Generates an estimated loan eligibility percentage (e.g., 82%), estimated eligible loan amount (e.g., ₹7,50,000), institutional risk tier (Low, Moderate, High), and estimated interest rate range (e.g., 9.5% – 12.5%).
Displays circular SVG progress meter, risk badge, and repayment capacity rating.
Credit Score Analyzer

Interactive semi-circular gauge meter (300 to 900 score range).
5-Pillar Bureau Decomposition: Payment History (35%), Credit Card Utilization (30%), Credit Vintage (15%), Credit Mix (10%), New Inquiries (10%).
Strengths, Potential Risk Drivers, and Step-by-Step Score Improvement Roadmap.
EMI Calculator & Multi-Tenure Amortization Engine

Real-time calculations with dual sliders and numeric inputs.
Standard amortization formula: EMI = P × R × (1+R)^N / ((1+R)^N - 1).
Visual breakdown ratio bar of Principal vs. Total Interest.
Visual scenario cards comparing 3-Year, 5-Year, and 7-Year repayment plans.
Financial Health Insights & "Ask VeraCredit Advisor" Chat

AI-synthesized personalized financial recommendations.
Financial health signals (positive indicators vs. warning flags).
Real-time interactive AI chat drawer answering profile-specific questions (prepayment advice, co-applicant strategy, tenure optimization).
Google Sheets Webhook Sync & Activity History

Dispatches records via JSON webhook to a Google Sheet in real time.
Persistent activity log with CSV export and instant snapshot reload.
2. Project Structure
veracredit/
├── server.ts                    # Full-stack Express server (production / standalone)
├── package.json                 # Scripts and dependencies
├── vite.config.ts               # Vite configuration with Express API middleware
├── .env.example                 # Environment variables specification
├── README.md                    # Project documentation, guides, and viva Q&A
├── index.html                   # HTML5 entry point with Plus Jakarta Sans & VeraCredit favicon
└── src/
    ├── main.tsx                 # React DOM client entry
    ├── App.tsx                  # Master application orchestrator & state manager
    ├── index.css                # Multi-color harmonic canvas, glassmorphism, & tab transitions
    ├── types/
    │   └── finance.ts           # Shared TypeScript interfaces & models
    ├── server/
    │   ├── financeEngine.ts     # Underwriting engine, AI integration, EMI formula & BFSI rules
    │   └── apiRouter.ts         # REST API routes (/api/*)
    └── components/
        ├── VeraLogo.tsx         # Custom geometric "V" monogram symbol
        ├── Navbar.tsx           # Responsive navigation with VeraLogo & tab transitions
        ├── Hero.tsx             # Landing hero with animated floating glass cards
        ├── LoanEligibilityForm.tsx # User input ingestion, validation, and demo presets
        ├── FinancialDashboard.tsx  # 4 primary snapshot cards, circular gauge, and scenarios
        ├── EmiCalculator.tsx    # Standalone real-time EMI sliders & formula breakdown
        ├── CreditAnalyzer.tsx   # Standalone circular score meter & 5 pillars
        ├── AiChatDrawer.tsx     # "Ask VeraCredit Advisor" interactive chat drawer
        ├── HistoryView.tsx      # Persistent audit history, reload & CSV download
        ├── ArchitectureModal.tsx# Interactive reference flow diagram
        ├── VivaDocsModal.tsx    # Viva Q&A & Google Sheets setup in UI
        └── Footer.tsx           # Institutional disclaimers & VeraLogo branding
3. Environment Variables Configuration
Create a .env file in the root directory (based on .env.example):

# AI Engine API Key
ANTHROPIC_API_KEY="sk-ant-api03-..."

# Google Sheets Webhook URL (from Google Apps Script)
GOOGLE_APPS_SCRIPT_URL="https://script.google.com/macros/s/AKfycb.../exec"
GOOGLE_SHEET_ID=""

# Optional Gemini API Key (Automatic fallback)
GEMINI_API_KEY=""

# Application Port
PORT=3000
Security Note: Keys are strictly loaded server-side in src/server/financeEngine.ts and server.ts. No API secrets or tokens are ever bundled or exposed to frontend JavaScript.

4. Google Sheets Setup in 60 Seconds
Create a blank Google Sheet at https://sheets.new.
Click Extensions > Apps Script.
Replace the existing content with the script below and click Save:
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Add header row on first entry
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp", "Record ID", "Full Name", "Age", "City",
        "Employment Type", "Monthly Income", "Existing EMI",
        "Desired Loan Amount", "Tenure (Years)", "Credit Score",
        "Eligibility (%)", "Risk Level", "Estimated Loan Limit",
        "Monthly EMI", "DTI (%)", "AI Recommendation", "AI Engine"
      ]);
    }
    
    var data = JSON.parse(e.postData.contents);
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.recordId || "VERA-UNKNOWN",
      data.fullName || "",
      data.age || "",
      data.city || "",
      data.employmentType || "",
      data.monthlyIncome || 0,
      data.existingMonthlyEmi || 0,
      data.desiredLoanAmount || 0,
      data.loanTenureYears || 0,
      data.creditScore || 0,
      data.eligibilityPercentage || 0,
      data.riskLevel || "Low",
      data.estimatedLoanAmount || 0,
      data.monthlyEmiEstimated || 0,
      data.debtToIncomeRatio || 0,
      data.aiRecommendation || "",
      data.aiEngineUsed || "VeraCredit Intelligence Engine"
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
Click Deploy > New Deployment.
Select type: Web app.
Set:
Execute as: Me
Who has access: Anyone
Click Deploy, copy the generated Web App URL, and paste it into your .env file as GOOGLE_APPS_SCRIPT_URL.
5. How to Run Locally
# 1. Install dependencies
npm install

# 2. Run development server (Vite + Express API Middleware on Port 3000)
npm run dev

# 3. Build for production
npm run build

# 4. Start standalone full-stack Express production server
npm start
Open http://localhost:3000 in your browser.

6. Viva Questions and Answers (Examiner Preparation)
Q1: What is the exact mathematical formula for EMI calculation?
Answer: 
EMI
=
P
×
R
×
(
1
+
R
)
N
(
1
+
R
)
N
−
1
 Where:

P
 is the Principal Loan Amount.
R
 is the periodic Monthly Interest Rate (
Annual Interest Rate
/
12
/
100
).
N
 is the Total Loan Tenure in Months (
Years
×
12
).
Q2: What is FOIR and how does VeraCredit use it?
Answer: FOIR stands for Fixed Obligation to Income Ratio. In banking, it represents the maximum percentage of take-home income a borrower can allocate to debt servicing (typically 50% to 65% for prime borrowers, and 40% for subprime). VeraCredit calculates the maximum allowable EMI: 
Max Allowable EMI
=
Monthly Income
×
FOIR Limit
−
Existing EMIs
 If the proposed loan's EMI exceeds this buffer, the eligibility percentage is scaled down and cautionary financial signals are raised.

Q3: How is the Underwriting AI integrated?
Answer: The AI engine acts as the central intelligence layer. The server constructs a system prompt instructing the model to behave as a senior BFSI credit analyst and outputs a strictly verified JSON schema containing eligibility scoring, credit assessment, risk categorization, DTI evaluation, and personalized cashflow tips.

Q4: Why is a server-side proxy architecture mandatory?
Answer: Placing API keys or Google credentials directly in client-side JavaScript exposes private secrets to the public network tab. By routing all API requests through the Express backend (/api/analyze), credentials remain strictly on the server.

Q5: How are the 5 pillars of a credit score weighted?
Answer:

Payment History (35%): Track record of on-time installments without 30/60/90-day delinquencies.
Credit Utilization (30%): Ratio of card balance to credit limit (ideally under 30%).
Credit History Length (15%): Age of oldest and average credit lines.
Credit Mix (10%): Healthy combination of secured (home/auto) and unsecured (personal/card) credit.
Recent Inquiries (10%): Frequency of hard inquiries within a 6-month window.
7. Institutional Disclaimer
