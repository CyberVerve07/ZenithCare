# 🌸 Orchids MediFlow — Premium Hospital Management & Clinical Operations Suite

A state-of-the-art, enterprise-grade clinical management and MIS platform designed for modern healthcare environments. Combining a stunning interactive 3D landing page with a robust, role-based administrative dashboard, **Orchids MediFlow** streamlines clinical workflows, secures patient data, and empowers medical staff.

---

## ✨ Features at a Glance

*   🌐 **Stunning Interactive 3D Landing Page**: A premium clinical visualization experience built with **Three.js**, **React Three Fiber**, and **Framer Motion** to wow visitors at first glance.
*   🔑 **Strict Role-Based Access Control (RBAC)**: Tailored dashboards and secured endpoints separated by clinical roles: **Admin**, **Doctor**, **Nurse**, and **Staff**.
*   🏥 **ICU Telemetry & Vitals Tracking**: Real-time vital metrics tracking (Pulse, Blood Pressure, SpO2) with visual danger threshold indicators.
*   📅 **Smart Appointment Scheduler**: Advanced scheduling system with strict automatic conflict-prevention validation to ensure no clinician double-booking.
*   🧪 **Clinical Workflow Suite**: Admit patients, assign attending doctors, add clinical tests, and update patient progress.
*   🥗 **Dietary Management Module**: Plan customized daily meal programs (breakfast, lunch, dinner) and special clinical instructions based on patient condition.
*   🧠 **AI-Powered Clinical Summaries**: Instant contextual synthesis of patient symptoms, progress history, and daily reports to aid clinical decision-making.
*   🔌 **Adaptive Database Architecture**: Seamless hybrid engine. Connects to live PostgreSQL (via Supabase), but automatically deploys a robust, premium **in-memory database fallback** if remote databases are offline or credentials are missing! Runs out of the box with zero external setup.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend** | React 19, Next.js (App Router), Tailwind CSS, Three.js, React Three Fiber, Framer Motion, Lucide Icons, Recharts |
| **Backend** | Node.js, Express, JWT (JSON Web Tokens), bcryptjs |
| **Database & ORM** | PostgreSQL (via Supabase), PG Pooler, Drizzle ORM |
| **API Architecture** | Stateless REST API, Custom CORS and RBAC Middlewares |

---

## 📁 Workspace Architecture

```bash
orchids-mediflow-hospital-management/
├── src/                      # Next.js React Frontend Application
│   ├── app/                  # App Router pages (public, portal, dashboard, RBAC folders)
│   │   ├── dashboard/        # Dashboard layout & customized portals (Admin, Doctor, Nurse, Staff)
│   │   └── page.tsx          # Dynamic 3D landing page
│   ├── components/           # Reusable UI components & 3D canvases
│   └── lib/                  # Centralized API client (axios)
├── server/                   # Express TypeScript Backend Server
│   ├── config/               # Database pool and hybrid in-memory fallback config
│   ├── controllers/          # Controllers for authentication, patients, ICU, and diets
│   ├── middleware/           # JWT verification and RBAC authorization filters
│   ├── routes/               # API route endpoints
│   └── index.ts              # Express Server Entrypoint
├── package.json              # Main project dependencies & unified scripts
├── tsconfig.json             # TypeScript compiler settings
└── .gitignore                # Optimized Git ignore file
```

---

## 🚀 How to Run Locally

### 1. Prerequisites
Ensure you have **Node.js** (v18 or higher) installed on your system.
Verify using:
```bash
node -v
npm -v
```

### 2. Installation
Clone or navigate to the workspace directory and install the packages:
```bash
npm install
```

### 3. Running the Application
The application consists of two parts running concurrently:
*   **Next.js Frontend**: Runs on `http://localhost:3000`
*   **Express Backend**: Runs on `http://localhost:5000`

We have configured quick start scripts in `package.json` to make running both simple. Open **two terminal tabs** in your workspace:

#### **Terminal 1: Start Frontend**
```bash
npm run dev
```

#### **Terminal 2: Start Backend**
```bash
npm run server
```

---

## 🔐 Mock Test Accounts (RBAC Logins)

The system automatically seeds premium mock accounts when running in offline fallback mode. Use any of the following credentials on the login screen to explore the tailored clinical portals:

| Icon | Role | Attending Name | Login Email | Password | Allowed Capabilities |
| :---: | :--- | :--- | :--- | :--- | :--- |
| 🛡️ | **Admin** | Dr. Sarah Admin | `admin@mediflow.com` | `admin123` | Control hospital, add staff, manage all records. |
| 🩺 | **Doctor** | Dr. John Watson | `doctor@mediflow.com` | `doctor123` | View admissions, write clinical notes, track ICU vitals. |
| 🩺 | **Doctor (Alt)**| Dr. Gregory House | `dr.house@mediflow.com` | `doctor123` | Cardiology & Diagnostics specialist portal. |
| 🏥 | **Nurse** | Nurse Clara Barton | `nurse@mediflow.com` | `nurse123` | Admit patients, update patient condition, log diets. |
| 💼 | **Staff** | Staff James | `staff@mediflow.com` | `staff123` | View schedules, add dietary records, update info. |

---

## 💡 Website Name Suggestions

If you are looking to launch or brand this product as a SaaS startup, here are a few premium name suggestions curated to give an elite, trustworthy, and modern feel:

1.  🌸 **OrchidCare** — Combining the delicate, high-end organic brand of "Orchids" with clinical care. Perfect for a premium boutique hospital chain.
2.  📈 **MediFlow** *(Default)* — Sleek, modern, and action-oriented. Suggests high-performance, seamless clinical operations.
3.  🧬 **VerveMedical** or **VerveFlow** — Tech-forward, high-energy, and futuristic brand matching an advanced clinical SaaS platform.
4.  🩺 **CarePulse** — A premium, direct name focusing on real-time telemetry and clinical responsiveness.
5.  ✨ **AuraHealth** — A highly aesthetic, clean branding ideal for modern digital healthcare solutions.
6.  🌌 **NovusCare** — Futuristic, premium, and sophisticated. Represents a new era of medical portal excellence.
