# FinSight AI — AI Loan Eligibility Checker Platform
> *"Smarter Financial Decisions. Powered by AI."*

FinSight AI is a complete, full-stack BFSI (Banking, Financial Services, and Insurance) financial decision-support platform built strictly according to the reference architectural workflow diagram:

```
                    ┌─────────────────────────────┐
                    │   HTML, CSS, JavaScript     │
                    │        (Frontend)           │
                    └──────────────┬──────────────┘
                                   │
                                   ▼
┌──────────────────────┐     ┌──────────────┐
│ AI Loan Eligibility  │────▶│  User Input  │
│ Checker Platform     │     └──────┬───────┘
└──────────────────────┘            │
                                    │
                                    ▼
                          ┌─────────────────────┐
                          │     Claude API      │
                          │   (Anthropic AI)    │
                          └──────────┬──────────┘
                                     │
                    ┌────────────────┼─────────────────┐
                    ▼                ▼                 ▼
          ┌────────────────┐ ┌────────────────┐ ┌──────────────────┐
          │ AI Financial   │ │ Eligibility    │ │ EMI Suggestions  │
          │ Tips & Insights│ │ Analysis &     │ │ & Loan Insights  │
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
```

---

## 1. Core Platform Modules

The platform unites **FOUR core BFSI tools** into a single cohesive experience:

1. **Loan Eligibility Checker & Risk Assessment**
   - Evaluates borrowing limits, FOIR (Fixed Obligation to Income Ratio), and DTI (Debt-to-Income).
   - Generates an estimated loan eligibility percentage (e.g., 82%), estimated eligible loan amount (e.g., ₹7,50,000), institutional risk tier (Low, Moderate, High), and estimated interest rate range (e.g., 9.5% – 12.5%).
   - Displays circular SVG progress meter, risk badge, and repayment capacity rating.

2. **Credit Score Analyzer**
   - Interactive semi-circular gauge meter (300 to 900 score range).
   - 5-Pillar Bureau Decomposition: Payment History (35%), Credit Card Utilization (30%), Credit Vintage (15%), Credit Mix (10%), New Inquiries (10%).
   - Strengths, Potential Risk Drivers, and Step-by-Step Score Improvement Roadmap.

3. **EMI Calculator & Multi-Tenure Amortization Engine**
   - Real-time calculations with dual sliders and numeric inputs.
   - Standard amortization formula: `EMI = P × R × (1+R)^N / ((1+R)^N - 1)`.
   - Visual breakdown ratio bar of Principal vs. Total Interest.
   - Visual scenario cards comparing 3-Year, 5-Year, and 7-Year repayment plans.

4. **AI Financial Tips & "Ask FinSight AI" Chat**
   - Claude 3.7 Sonnet-generated personalized financial recommendations.
   - Financial health signals (positive indicators vs. warning flags).
   - Real-time interactive AI chat drawer answering profile-specific questions (prepayment advice, co-applicant strategy, tenure optimization).

5. **Google Sheets Webhook Sync & Activity History**
   - Dispatches records via JSON webhook to a Google Sheet in real time.
   - Persistent activity log with CSV export and instant snapshot reload.

---

## 2. Project Structure

```
finsight-ai/
├── server.ts                    # Full-stack Express server (production / standalone)
├── package.json                 # Scripts and dependencies
├── vite.config.ts               # Vite configuration with Express API middleware
├── .env.example                 # Environment variables specification
├── README.md                    # Project documentation, guides, and viva Q&A
├── index.html                   # HTML5 entry point with Plus Jakarta Sans & dark theme
└── src/
    ├── main.tsx                 # React DOM client entry
    ├── App.tsx                  # Master application orchestrator & state manager
    ├── index.css                # Dark Glassmorphism, glows, and mesh gradients
    ├── types/
    │   └── finance.ts           # Shared TypeScript interfaces & models
    ├── server/
    │   ├── financeEngine.ts     # Claude AI integration, Gemini fallback, EMI formula & BFSI rules
    │   └── apiRouter.ts         # REST API routes (/api/*)
    └── components/
        ├── Navbar.tsx           # Responsive navigation with branding & mobile drawer
        ├── Hero.tsx             # Landing hero with animated floating glass cards
        ├── LoanEligibilityForm.tsx # User input ingestion, validation, and demo presets
        ├── FinancialDashboard.tsx  # 4 primary snapshot cards, circular gauge, and scenarios
        ├── EmiCalculator.tsx    # Standalone real-time EMI sliders & formula breakdown
        ├── CreditAnalyzer.tsx   # Standalone circular score meter & 5 pillars
        ├── AiChatDrawer.tsx     # "Ask FinSight AI" interactive chat drawer
        ├── HistoryView.tsx      # Persistent audit history, reload & CSV download
        ├── ArchitectureModal.tsx# Interactive reference flow diagram
        ├── VivaDocsModal.tsx    # Viva Q&A & Google Sheets setup in UI
        └── Footer.tsx           # Institutional disclaimers & security notices
```

---

## 3. Environment Variables Configuration

Create a `.env` file in the root directory (based on `.env.example`):

```bash
# Anthropic Claude API Key (Central AI Engine)
ANTHROPIC_API_KEY="sk-ant-api03-..."

# Google Sheets Webhook URL (from Google Apps Script)
GOOGLE_APPS_SCRIPT_URL="https://script.google.com/macros/s/AKfycb.../exec"
GOOGLE_SHEET_ID=""

# Optional Gemini API Key (Automatic fallback)
GEMINI_API_KEY=""

# Application Port
PORT=3000
```

> **Security Note:** Keys are strictly loaded server-side in `src/server/financeEngine.ts` and `server.ts`. No API secrets or tokens are ever bundled or exposed to frontend JavaScript.

---

## 4. Google Sheets Setup in 60 Seconds

1. Create a blank Google Sheet at [https://sheets.new](https://sheets.new).
2. Click **Extensions > Apps Script**.
3. Replace the existing content with the script below and click **Save**:

```javascript
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
      data.recordId || "FIN-UNKNOWN",
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
      data.aiEngineUsed || "Claude 3.7 Sonnet"
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click **Deploy > New Deployment**.
5. Select type: **Web app**.
6. Set:
   - **Execute as:** `Me`
   - **Who has access:** `Anyone`
7. Click **Deploy**, copy the generated **Web App URL**, and paste it into your `.env` file as `GOOGLE_APPS_SCRIPT_URL`.

---

## 5. How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Run development server (Vite + Express API Middleware on Port 3000)
npm run dev

# 3. Build for production
npm run build

# 4. Start standalone full-stack Express production server
npm start
```

Open `http://localhost:3000` in your browser.

---

## 6. Viva Questions and Answers (Examiner Preparation)

### Q1: What is the exact mathematical formula for EMI calculation?
**Answer:**
$$\text{EMI} = \frac{P \times R \times (1+R)^N}{(1+R)^N - 1}$$
Where:
- $P$ is the Principal Loan Amount.
- $R$ is the periodic Monthly Interest Rate ($\text{Annual Interest Rate} / 12 / 100$).
- $N$ is the Total Loan Tenure in Months ($\text{Years} \times 12$).

### Q2: What is FOIR and how does FinSight AI use it?
**Answer:**
FOIR stands for **Fixed Obligation to Income Ratio**. In banking, it represents the maximum percentage of take-home income a borrower can allocate to debt servicing (typically 50% to 65% for prime borrowers, and 40% for subprime). FinSight AI calculates the maximum allowable EMI:
$$\text{Max Allowable EMI} = \text{Monthly Income} \times \text{FOIR Limit} - \text{Existing EMIs}$$
If the proposed loan's EMI exceeds this buffer, the eligibility percentage is scaled down and cautionary financial signals are raised.

### Q3: How is Anthropic Claude AI integrated?
**Answer:**
Claude 3.7 Sonnet (`claude-3-7-sonnet-20250219`) acts as the central intelligence engine. The server constructs a system prompt instructing Claude to behave as a senior BFSI credit analyst and outputs a strictly verified JSON schema containing eligibility scoring, credit assessment, risk categorization, DTI evaluation, and personalized cashflow tips.

### Q4: Why is a server-side proxy architecture mandatory?
**Answer:**
Placing `ANTHROPIC_API_KEY` or Google credentials directly in client-side JavaScript exposes private secrets to the public network tab. By routing all API requests through the Express backend (`/api/analyze`), credentials remain strictly on the server.

### Q5: How are the 5 pillars of a credit score weighted?
**Answer:**
1. **Payment History (35%):** Track record of on-time installments without 30/60/90-day delinquencies.
2. **Credit Utilization (30%):** Ratio of card balance to credit limit (ideally under 30%).
3. **Credit History Length (15%):** Age of oldest and average credit lines.
4. **Credit Mix (10%):** Healthy combination of secured (home/auto) and unsecured (personal/card) credit.
5. **Recent Inquiries (10%):** Frequency of hard inquiries within a 6-month window.

---

## 7. Institutional Disclaimer

FinSight AI provides educational financial estimates and AI-generated guidance. Results do not represent actual bank sanction or approval and should not be considered professional financial advice. Actual loan sanction is subject to lender credit policies, physical verification, and official bureau reports.
