# JUSTICE AI — Legal Case Intelligence Platform (Frontend)

> **Understand Your Case. Make Informed Decisions.**

JUSTICE AI is a multi-role legal technology SaaS web application built for India. It helps ordinary users simplify complex legal documents, identify potential contradictions across filings, analyse arguments from different perspectives, organise case chronologies, explore Indian legal knowledge, and discover suitable advocates.

> **Important Notice (Frontend Demonstration Phase):**  
> This release is frontend-only and uses local browser state and fictional demonstration data. It does not connect to a production database, authentication provider, live LLM/OCR service, or live court portal. All AI analyses, document processing states, legal summaries, and advocate profiles are clearly labelled as demonstration outputs.

---

## Technology Stack

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS v4 + Shadcn/UI primitives (Radix UI + CVA + Sonner)
- **Routing:** React Router v7 (role-protected Client, Advocate, and Admin workspaces)
- **Forms & Validation:** React Hook Form + Zod
- **Data Visualisation:** Recharts
- **Icons & Dates:** Lucide React, date-fns

---

## Application Modules

### 1. Public Website
- Landing Page with interactive workspace preview
- Features, How It Works, About Us, Contact (validated form)
- Public Advocate Directory & Advocate Details
- Login & Registration (with clearly labelled **Demo Mode Access**)
- Privacy Policy, Terms & Conditions, and Legal Disclaimer

### 2. Client Workspace (`/client/*`)
- **Dashboard:** KPIs, quick actions, recent cases, recent analyses, activity feed
- **Case Management:** Search, filter, sort, grid/list toggle, create, edit, archive, delete, and 9-tab Case Details view
- **Document Management:** Drag-and-drop multi-file upload simulation, format/size validation (`PDF`, `DOCX`, `JPG`, `JPEG`, `PNG`), preview modal, status workflow
- **AI Legal Analysis Studio:** Select case & documents, run demonstration analysis, explore 8 result tabs (Summary, Facts, Arguments, Contradictions, Missing Info, Perspective, Dates, Legal References)
- **Dedicated Views:** Important Points, Side-by-Side Contradiction Detection, Personal Perspective Analysis
- **Ask Justice AI:** Multi-conversation demonstration chat with case/document selectors, suggested questions, copy & feedback
- **Indian Legal Knowledge:** Search & filter across 10 legal categories, popular topics, recently viewed, reader modal
- **Case Timeline:** Visual chronology with Add/Edit/Delete, filters, View Source, and source verification labels (`User-entered`, `AI-extracted`, `Court-confirmed`)
- **Advocate Discovery & Enquiries:** 8-filter directory, shortlist/save, profile view, consultation enquiry submission
- **Printable Reports:** Print-friendly and exportable report previews with source references and AI disclaimer
- **Profile, Settings & Notifications**

### 3. Advocate Portal (`/advocate/*`)
- Overview dashboard with completion, enquiry, and profile view stats
- Professional Profile preview & Profile Editor
- Practice Areas manager & Consultation Availability settings
- Credential Verification workflow (`Not Submitted`, `Pending Review`, `Approved`, `Rejected`)
- Client Enquiries & Client Requests inbox with status updates & reply composer
- Notifications & Settings

### 4. Admin Console (`/admin/*`)
- Platform overview with 7 key metrics and Recharts visualisations
- User Management (activate/suspend) & Advocate Directory Management
- Verification Requests review queue (Approve/Reject)
- Indian Legal Sources CMS (add/remove demonstration entries)
- Platform Report Previews, Analytics charts, Audit Logs, and Settings

---

## Local Development Setup (Compatible with Kiro IDE)

```bash
# 1. Install dependencies
npm install

# 2. Start local development server (runs on http://localhost:3000)
npm run dev

# 3. Type-check
npm run lint

# 4. Production build
npm run build
```

---

## Using Demo Mode

1. Visit `/login` (or click **Start Analysing** on the Landing Page).
2. Choose one of the clearly labelled Demo Mode roles:
   - **Continue as Client** (`Varun Maheshwaram`)
   - **Continue as Advocate** (`Adv. Meera Deshmukh`)
   - **Continue as Admin** (`Raghavendra Kulkarni`)
3. Alternatively, sign in or register using the validated demo forms (stored locally in `localStorage`).

---

## Project Structure

```text
src/
├── components/
│   ├── ui/               # Shadcn/UI primitives (Button, Card, Input, Dialog, Tabs, Switch)
│   ├── common/           # JusticeLogo, DisclaimerBanner, PageHeader, StatCard, ReportPreviewModal
│   ├── navigation/       # PublicNavbar, PublicFooter, DashboardShell
│   └── advocates/        # Reusable AdvocateDirectoryView
├── layouts/              # PublicLayout, ClientLayout, AdvocateLayout, AdminLayout
├── pages/
│   ├── public/           # Landing, Features, HowItWorks, About, Contact, Legal policies
│   ├── auth/             # Login & Register
│   ├── client/           # 19 client workspace pages
│   ├── advocate/         # 10 advocate portal pages
│   └── admin/            # 9 administrator console pages
├── services/             # apiConfig + typed service abstractions for future FastAPI integration
├── data/                 # Separate mock data modules (users, cases, docs, analysis, legal, advocates, notifications, admin)
├── context/              # AuthContext & AppDataContext
├── hooks/                # useAppData
├── routes/               # AppRoutes (role-protected routing)
├── types/                # Domain TypeScript interfaces
├── constants/            # Categories, practice areas, legal disclaimer
└── utils/                # cn, date/currency/size formatters
```

---

## Future Backend Integration Readiness

All data access contracts are isolated under `src/services/` with centralised endpoint definitions in `src/services/apiConfig.ts`, prepared for:
- **Backend API:** Python + FastAPI
- **Database & RAG:** PostgreSQL + `pgvector`
- **Auth & Storage:** Supabase Auth + private object storage
- **Document Pipeline:** PyMuPDF + Tesseract OCR
- **AI Engine & Maps:** Gemini API + Google Maps Platform

---

## Legal Disclaimer

*JUSTICE AI is an AI-assisted legal information and document analysis platform. It does not provide legal representation, replace a qualified advocate or guarantee legal outcomes. Information generated by AI may contain errors and must be independently verified.*
