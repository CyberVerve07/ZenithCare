# 🏥 ZenithCare — Enterprise Hospital Management & Clinical Operations Platform

**A production-grade, AI-enhanced SaaS hospital management system** designed for modern healthcare environments. Combines a stunning interactive 3D landing page with robust role-based access control, real-time patient telemetry, intelligent appointment scheduling, and clinical decision support.

![TypeScript](https://img.shields.io/badge/TypeScript-92.4%25-blue?style=flat-square) ![JavaScript](https://img.shields.io/badge/JavaScript-6.4%25-yellow?style=flat-square) ![CSS](https://img.shields.io/badge/CSS-1.2%25-pink?style=flat-square) ![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen?style=flat-square) ![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [Architecture](#-system-architecture)
- [Project Structure](#-project-structure)
- [System Design](#-system-design--diagrams)
- [API Workflows](#-api-workflows)
- [Installation & Setup](#-installation--setup)
- [Authentication & RBAC](#-authentication--rbac)
- [Core Modules](#-core-modules)
- [Database Schema](#-database-schema)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

ZenithCare is an **enterprise-grade hospital management system** built with cutting-edge technologies to solve critical healthcare operational challenges:

### Problems Solved
✅ **Appointment Conflicts**: Intelligent scheduling with real-time conflict detection  
✅ **Patient Data Fragmentation**: Centralized patient records with role-based access  
✅ **Real-time Monitoring**: ICU telemetry dashboard with vital signs tracking  
✅ **Clinical Decision Support**: AI-powered summaries of patient conditions  
✅ **Workflow Inefficiency**: Streamlined admissions, treatment, and dietary management  
✅ **Multi-role Coordination**: RBAC ensures clinicians see only authorized data  

### Healthcare Compliance
- **HIPAA-Ready**: JWT token encryption and role-based access control
- **Data Integrity**: PostgreSQL transactions with foreign key constraints
- **Audit Trail**: All critical operations logged with timestamps
- **Offline Resilience**: Graceful fallback to in-memory database if Supabase unavailable

---

## ✨ Key Features

| Feature | Description | Impact |
|---------|-------------|--------|
| 🌐 **Interactive 3D Landing Page** | Premium Three.js visualization for patient engagement | First-class user experience |
| 🔑 **Role-Based Access Control (RBAC)** | Admin, Doctor, Nurse, Staff roles with granular permissions | Security & compliance |
| 🏥 **ICU Telemetry Dashboard** | Real-time vital signs (HR, BP, SpO₂) with danger thresholds | Immediate clinical response |
| 📅 **Smart Appointment Scheduler** | Automatic conflict prevention with clinician availability matrix | Zero double-bookings |
| 🧪 **Clinical Workflow Suite** | Patient admission, test ordering, progress tracking | Operational efficiency |
| 🥗 **Dietary Management** | Customized meal plans with clinical special instructions | Patient nutrition optimization |
| 🧠 **AI-Powered Summaries** | Contextual synthesis of symptoms & medical history | Faster clinical decisions |
| 🔌 **Hybrid Database Architecture** | PostgreSQL (Supabase) + in-memory fallback | High availability |
| 📊 **Advanced Analytics** | Patient metrics, clinician performance, departmental KPIs | Data-driven insights |
| 🔐 **Enterprise Security** | JWT authentication, bcrypt password hashing, CORS policies | Enterprise-grade protection |

---

## 🛠️ Technology Stack

### Frontend
| Category | Technology | Purpose |
|----------|-----------|---------|
| Framework | **Next.js 15** (App Router) | Server-side rendering, API routes |
| UI Library | **React 19** | Modern component architecture |
| Styling | **Tailwind CSS 4** | Utility-first responsive design |
| 3D Graphics | **Three.js + React Three Fiber** | Immersive 3D landing page |
| Animation | **Framer Motion** | Smooth page transitions & micro-interactions |
| Icons | **Lucide React** | Consistent, clean icon library |
| Charts | **Recharts** | Interactive vital signs & analytics visualizations |
| Form Handling | **React Hook Form + Zod** | Type-safe form validation |
| HTTP Client | **Axios** | Centralized API communication |

### Backend
| Category | Technology | Purpose |
|----------|-----------|---------|
| Runtime | **Node.js 18+** | JavaScript execution environment |
| Framework | **Express.js** | Lightweight HTTP server |
| Language | **TypeScript** | Type safety & developer experience |
| Authentication | **JWT (jsonwebtoken)** | Stateless token-based auth |
| Password Hashing | **bcryptjs** | Secure password storage |
| CORS | **cors** middleware | Cross-origin request handling |

### Database & ORM
| Category | Technology | Purpose |
|----------|-----------|---------|
| Primary DB | **PostgreSQL (Supabase)** | Reliable relational database |
| ORM | **Drizzle ORM** | Type-safe database queries |
| Connection Pooling | **pg (node-postgres)** | Optimized connection management |
| Fallback DB | **In-memory (premium)** | Offline resilience |

### DevOps & Infrastructure
| Category | Technology | Purpose |
|----------|-----------|---------|
| Environment | **Node.js v18+** | Runtime requirement |
| Build Tool | **Next.js Build** | Production bundling |
| Type Checking | **TypeScript** | Compile-time type verification |
| Package Manager | **npm** | Dependency management |

---

## 🏗️ System Architecture

### High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                             │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────┐      ┌──────────────────────┐        │
│  │  Landing Page (3D)   │      │  Portal Dashboard    │        │
│  │  • Three.js Canvas   │      │  • Role-Based UI     │        │
│  │  • Framer Animations │      │  • Real-time Updates │        │
│  │  • Responsive Layout │      │  • Data Visualizations       │
│  └──────────────────────┘      └──────────────────────┘        │
│                                                                  │
│              Built with Next.js 15 + React 19                  │
└──────────────────────┬───────────────────────────────────────────┘
                       │ Axios HTTP Requests
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                    API GATEWAY LAYER                            │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Express.js Server (Port 5000)                           │  │
│  │  • CORS Middleware (Cross-Origin Policy)                 │  │
│  │  • JWT Verification Middleware                           │  │
│  │  • RBAC Authorization Filters                            │  │
│  └──────────────────────────────────────────────────────────┘  │
└──────────────────────┬───────────────────────────────────────────┘
                       │ SQL Queries
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│               BUSINESS LOGIC LAYER                              │
├─────────────────────────────────────────────────────────────────┤
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐   │
│  │   Auth Svc     │  │  Patient Svc   │  │   Appointment  │   │
│  │ • JWT Gen      │  │ • Admission    │  │   Svc          │   │
│  │ • Login/Logout │  │ • Record Mgmt  │  │ • Scheduling   │   │
│  │ • Password Hash│  │ • Progress     │  │ • Conflict Check   │
│  └────────────────┘  └────────────────┘  └────────────────┘   │
│                                                                  │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐   │
│  │    ICU Svc     │  │   Diet Svc     │  │   AI Summary   │   │
│  │ • Vitals Track │  │ • Meal Plans   │  │   Svc          │   │
│  │ • Thresholds   │  │ • Instructions │  │ • Clinical Syn │   │
│  │ • Alerts       │  │ • Nutrition    │  │ • Decision Aid │   │
│  └────────────────┘  └────────────────┘  └────────────────┘   │
└──────────────────────┬───────────────────────────────────────────┘
                       │ Drizzle ORM
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                   DATA ACCESS LAYER                             │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Database Pool (PG Connection Management)                │  │
│  │  • Connection Reuse & Pooling                            │  │
│  │  • Query Optimization                                    │  │
│  │  • Transaction Management                               │  │
│  └──────────────────────────────────────────────────────────┘  │
└──────────────────────┬───────────────────────────────────────────┘
                       │
        ┌──────────────┴──────────────┐
        ▼                             ▼
┌───────────────────────┐    ┌────────────────────────┐
│   PostgreSQL          │    │  In-Memory Fallback    │
│   (Supabase)          │    │  (High-Availability)   │
│                       │    │                        │
│ • Users               │    │ • Seeded Test Data     │
│ • Patients            │    │ • Premium Mock Accts   │
│ • Appointments        │    │ • Auto-Activation      │
│ • ICU Vitals          │    │ • Demo Workflows       │
│ • Clinical Tests      │    │                        │
│ • Diet Plans          │    │ ⚡ Auto-Fallback if    │
│ • Medical History     │    │    Supabase Offline    │
└───────────────────────┘    └────────────────────────┘
```

### Request/Response Cycle

```
User Action (Frontend)
        │
        ▼
Axios HTTP Request
(+ JWT Token in Authorization Header)
        │
        ▼
Express Router
(Routes request to controller)
        │
        ▼
JWT Verification Middleware
(Validates token integrity & expiration)
        │
        ▼
RBAC Authorization Middleware
(Checks user role against endpoint requirements)
        │
        ▼
Business Logic Controller
(Processes request, applies business rules)
        │
        ▼
Service Layer
(Calls ORM/database methods)
        │
        ▼
Drizzle ORM
(Translates to SQL, executes via connection pool)
        │
        ▼
PostgreSQL / In-Memory DB
(CRUD operation + transaction)
        │
        ▼
Service Returns Data
        │
        ▼
Controller Formats Response
        │
        ▼
Express Sends HTTP Response
(+ JWT Token in response headers)
        │
        ▼
Frontend Receives Response
(Updates state, triggers re-render)
        │
        ▼
UI Updates with Fresh Data
```

---

## 📁 Project Structure

```
ZenithCare/
│
├── src/                                    # Frontend Application (Next.js)
│   ├── app/
│   │   ├── layout.tsx                     # Root layout with providers
│   │   ├── page.tsx                       # 3D Landing page (/ route)
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx             # Login portal
│   │   │   ├── register/page.tsx          # User registration
│   │   │   └── forgot-password/page.tsx   # Password recovery
│   │   ├── (portal)/
│   │   │   ├── layout.tsx                 # Portal navigation layout
│   │   │   └── dashboard/
│   │   │       ├── admin/                 # Admin portal
│   │   │       │   ├── page.tsx           # Admin dashboard
│   │   │       │   ├── users/             # User management
│   │   │       │   ├── staff/             # Staff directory
│   │   │       │   └── reports/           # Hospital analytics
│   │   │       ├── doctor/                # Doctor portal
│   │   │       │   ├── page.tsx           # Doctor dashboard
│   │   │       │   ├── patients/          # Patient list
│   │   │       │   ├── appointments/      # Schedule view
│   │   │       │   └── icu/               # ICU monitoring
│   │   │       ├── nurse/                 # Nurse portal
│   │   │       │   ├── page.tsx           # Nurse dashboard
│   │   │       │   ├── admissions/        # Patient intake
│   │   │       │   ├── diet-plans/        # Meal planning
│   │   │       │   └── vitals/            # Vital signs entry
│   │   │       └── staff/                 # Staff portal
│   │   │           ├── page.tsx           # Staff dashboard
│   │   │           ├── schedules/         # View schedules
│   │   │           └── info/              # Staff info
│   │   └── api/                           # Backend routes (optional: frontend routes)
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx                 # Navigation bar
│   │   │   ├── Sidebar.tsx                # Role-based sidebar
│   │   │   └── Footer.tsx                 # Footer
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx              # Login form component
│   │   │   ├── RegisterForm.tsx           # Registration form
│   │   │   └── ProtectedRoute.tsx         # Route protection wrapper
│   │   ├── dashboard/
│   │   │   ├── PatientCard.tsx            # Patient display card
│   │   │   ├── AppointmentTable.tsx       # Appointment list
│   │   │   ├── StatsWidget.tsx            # Key metrics
│   │   │   └── ActivityFeed.tsx           # Recent activities
│   │   ├── icu/
│   │   │   ├── VitalSignsChart.tsx        # Real-time vitals graph
│   │   │   ├── PatientMonitor.tsx         # Single patient monitor
│   │   │   └── AlertBanner.tsx            # Critical alerts
│   │   ├── 3d/
│   │   │   ├── LandingScene.tsx           # Three.js canvas
│   │   │   ├── MedicalOrb.tsx             # Animated 3D object
│   │   │   └── ParticleBackground.tsx     # Particle effects
│   │   └── common/
│   │       ├── Button.tsx                 # Reusable button
│   │       ├── Modal.tsx                  # Modal dialog
│   │       ├── Toast.tsx                  # Notification toast
│   │       └── Loading.tsx                # Loading spinner
│   │
│   └── lib/
│       ├── api/
│       │   ├── client.ts                  # Axios instance
│       │   ├── auth.ts                    # Auth API calls
│       │   ├── patients.ts                # Patient API calls
│       │   ├── appointments.ts            # Appointment API calls
│       │   ├── icu.ts                     # ICU API calls
│       │   └── diet.ts                    # Diet API calls
│       ├── hooks/
│       │   ├── useAuth.ts                 # Auth state hook
│       │   ├── usePatients.ts             # Patients fetching hook
│       │   ├── useAppointments.ts         # Appointments hook
│       │   └── useFetch.ts                # Generic fetch hook
│       ├── utils/
│       │   ├── validators.ts              # Form validation logic
│       │   ├── formatters.ts              # Date/time formatting
│       │   ├── constants.ts               # App constants
│       │   └── helpers.ts                 # Utility functions
│       └── types/
│           ├── api.ts                     # API response types
│           ├── auth.ts                    # Auth types
│           ├── patient.ts                 # Patient types
│           ├── icu.ts                     # ICU types
│           └── common.ts                  # Common types
│
├── server/                                # Backend Application (Express)
│   ├── config/
│   │   ├── database.ts                    # DB pool & fallback setup
│   │   ├── environment.ts                 # Environment variables
│   │   └── constants.ts                   # Server constants
│   │
│   ├── middleware/
│   │   ├── auth.ts                        # JWT verification
│   │   ├── rbac.ts                        # Role-based authorization
│   │   ├── errorHandler.ts                # Global error handler
│   │   ├── logger.ts                      # Request logging
│   │   └── cors.ts                        # CORS configuration
│   │
│   ├── controllers/
│   │   ├── authController.ts              # Login, register, logout
│   │   ├── patientController.ts           # Patient CRUD & operations
│   │   ├── appointmentController.ts       # Appointment scheduling
│   │   ├── icuController.ts               # ICU vitals & monitoring
│   │   ├── dietController.ts              # Dietary management
│   │   ├── userController.ts              # User management
│   │   └── statsController.ts             # Analytics & reports
│   │
│   ├── services/
│   │   ├── authService.ts                 # Auth business logic
│   │   ├── patientService.ts              # Patient operations
│   │   ├── appointmentService.ts          # Scheduling logic & conflict check
│   │   ├── icuService.ts                  # ICU operations
│   │   ├── dietService.ts                 # Diet planning
│   │   ├── aiSummaryService.ts            # AI-powered summaries
│   │   └── notificationService.ts         # Alerts & emails
│   │
│   ├── routes/
│   │   ├── auth.ts                        # /api/auth/* routes
│   │   ├── patients.ts                    # /api/patients/* routes
│   │   ├── appointments.ts                # /api/appointments/* routes
│   │   ├── icu.ts                         # /api/icu/* routes
│   │   ├── diet.ts                        # /api/diet/* routes
│   │   ├── users.ts                       # /api/users/* routes
│   │   ├── stats.ts                       # /api/stats/* routes
│   │   └── health.ts                      # /api/health (health check)
│   │
│   ├── models/
│   │   ├── User.ts                        # User schema & types
│   │   ├── Patient.ts                     # Patient schema & types
│   │   ├── Appointment.ts                 # Appointment schema & types
│   │   ├── ICUVitals.ts                   # ICU vitals schema & types
│   │   ├── DietPlan.ts                    # Diet plan schema & types
│   │   └── MedicalHistory.ts              # Medical history schema & types
│   │
│   ├── utils/
│   │   ├── tokenManager.ts                # JWT generation & validation
│   │   ├── passwordManager.ts             # Password hashing & validation
│   │   ├── errorMessages.ts               # Standardized error messages
│   │   └── validators.ts                  # Server-side validators
│   │
│   └── index.ts                           # Express app entry point
│
├── .env.local                             # Environment variables
├── .env.example                           # Example environment file
├── .gitignore                             # Git ignore rules
├── package.json                           # NPM dependencies & scripts
├── tsconfig.json                          # TypeScript config
├── next.config.js                         # Next.js config
├── tailwind.config.ts                     # Tailwind CSS config
└── README.md                              # This file
```

---

## 🎨 System Design & Diagrams

### 1. RBAC Authorization Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                   User Login Request                            │
│  Email: doctor@mediflow.com | Password: doctor123              │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
        ┌────────────────────────────┐
        │  Verify Credentials        │
        │  • Hash password with bcrypt
        │  • Compare with DB record   │
        └────────────────┬───────────┘
                         │ ✓ Valid
                         ▼
        ┌────────────────────────────────────────┐
        │  Generate JWT Token                    │
        │  Payload:                              │
        │  {                                     │
        │    userId: "doc_001",                  │
        │    email: "doctor@mediflow.com",       │
        │    role: "DOCTOR",                     │
        │    department: "Cardiology",           │
        │    permissions: [                      │
        │      "view:patients",                  │
        │      "write:clinical_notes",           │
        │      "read:icu_vitals",                │
        │      "manage:own_appointments"         │
        │    ],                                  │
        │    iat: 1621012345,                    │
        │    exp: 1621098745  (24 hours)        │
        │  }                                     │
        │  Secret: process.env.JWT_SECRET       │
        └────────────────┬──────────────────────┘
                         │
                         ▼
        ┌────────────────────────────────────────┐
        │  Send Token to Frontend                │
        │  Authorization: Bearer <JWT_TOKEN>    │
        └─────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│          Subsequent API Request (Protected Endpoint)             │
└────────────────────┬────────────────────────────────────────────┘
                     │ GET /api/patients/admitted
                     │ Authorization: Bearer eyJhbGc...
                     ▼
        ┌────────────────────────────────────────┐
        │  JWT Middleware                        │
        │  1. Extract token from header          │
        │  2. Verify signature with JWT_SECRET   │
        │  3. Decode payload                     │
        │  4. Check expiration (exp > now)       │
        │  5. Attach user data to req.user       │
        └────────────────┬──────────────────────┘
                         │ ✓ Valid Token
                         ▼
        ┌────────────────────────────────────────┐
        │  RBAC Middleware                       │
        │  1. Get user.role = "DOCTOR"           │
        │  2. Get required perms for endpoint    │
        │     Required: ["view:patients"]        │
        │  3. Check if user.permissions         │
        │     contains required permissions      │
        │  4. Grant/Deny access                  │
        └────────────────┬──────────────────────┘
                         │ ✓ Authorized
                         ▼
        ┌────────────────────────────────────────┐
        │  Business Logic Controller             │
        │  • Query patients from DB              │
        │  • Filter by doctor's department       │
        │  • Apply access rules                  │
        │  • Return permitted data               │
        └────────────────┬──────────────────────┘
                         │
                         ▼
        ┌────────────────────────────────────────┐
        │  Response to Frontend                  │
        │  {                                     │
        │    status: 200,                        │
        │    data: [patients...],                │
        │    message: "Success"                  │
        │  }                                     │
        └─────────────────────────────────────────┘
```

### 2. Patient Admission & Clinical Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                   Patient Intake Process                        │
└────────────────────┬────────────────────────────────────────────┘
                     │
         ┌───────────┴───────────┐
         ▼                       ▼
    Nurse Portal         New Patient Arrives
    (Frontend)           at Hospital
         │                       │
         └───────────┬───────────┘
                     │
                     ▼
    ┌──────────────────────────────────────────┐
    │  Step 1: Admission Form (Nurse Entry)    │
    │                                          │
    │  • Patient Name & Demographics            │
    │  • Insurance Information                  │
    │  • Emergency Contact                      │
    │  • Chief Complaint / Symptoms             │
    │  • Vital Signs (Initial)                  │
    │  • Allergies & Medications                │
    └──────────────────┬───────────────────────┘
                       │ POST /api/patients/admit
                       ▼
    ┌──────────────────────────────────────────┐
    │  Backend: Create Patient Record           │
    │                                          │
    │  • Generate Patient ID (MRN)              │
    │  • Insert into patients table             │
    │  • Create medical_history record          │
    │  • Set admission_date = NOW()             │
    │  • status = "ADMITTED"                    │
    └──────────────────┬───────────────────────┘
                       │
                       ▼
    ┌──────────────────────────────────────────┐
    │  Step 2: Assign Attending Doctor         │
    │                                          │
    │  Doctor selects patient from admission   │
    │  queue and accepts assignment             │
    │  (POST /api/patients/{id}/assign-doctor) │
    └──────────────────┬───────────────────────┘
                       │
                       ▼
    ┌──────────────────────────────────────────┐
    │  Step 3: Schedule Appointments           │
    │                                          │
    │  Doctor schedules clinical tests         │
    │  • Lab Work                              │
    │  • Imaging (CT, X-ray, MRI)              │
    │  • Specialist Consultations              │
    │  (POST /api/appointments/schedule)       │
    │                                          │
    │  ⚠️ Conflict Detection:                  │
    │  - Check doctor availability             │
    │  - Verify equipment availability         │
    │  - Confirm patient not in procedure      │
    │  - Validate time slots don't overlap     │
    └──────────────────┬───────────────────────┘
                       │
                       ▼
    ┌──────────────────────────────────────────┐
    │  Step 4: ICU Admission (if needed)       │
    │                                          │
    │  For critical patients:                  │
    │  • Assign ICU bed                        │
    │  • Initialize vital monitoring           │
    │  • Configure alert thresholds            │
    │  (POST /api/icu/admit)                   │
    └──────────────────┬───────────────────────┘
                       │
                       ▼
    ┌──────────────────────────────────────────┐
    │  Step 5: Diet Planning (Nurse)           │
    │                                          │
    │  Create customized meal plan:            │
    │  • Breakfast menu                        │
    │  • Lunch menu                            │
    │  • Dinner menu                           │
    │  • Special instructions (allergies, etc) │
    │  (POST /api/diet/create-plan)            │
    └──────────────────┬───────────────────────┘
                       │
                       ▼
    ┌──────────────────────────────────────────┐
    │  Step 6: Update Clinical Progress        │
    │                                          │
    │  Doctor adds clinical notes:             │
    │  • Diagnosis                             │
    │  • Treatment plan                        │
    │  • Medication orders                     │
    │  • Follow-up requirements                │
    │  (PUT /api/patients/{id}/update-notes)   │
    └──────────────────┬───────────────────────┘
                       │
                       ▼
    ┌──────────────────────────────────────────┐
    │  Step 7: Generate AI Summary             │
    │                                          │
    │  System automatically:                   │
    │  • Aggregates patient data               │
    │  • Synthesizes medical history           │
    │  • Generates clinical summary            │
    │  • Flags critical findings               │
    │  (GET /api/ai/patient-summary/{id})      │
    └──────────────────┬───────────────────────┘
                       │
                       ▼
    ┌──────────────────────────────────────────┐
    │  Continuous Monitoring                   │
    │                                          │
    │  Every 15 minutes:                       │
    │  • Collect vital signs                   │
    │  • Compare to thresholds                 │
    │  • Alert if abnormal                     │
    │  • Update ICU dashboard                  │
    │  (POST /api/icu/vitals)                  │
    └──────────────────────────────────────────┘
```

### 3. Appointment Scheduling with Conflict Prevention

```
┌──────────────────────────────────────────────────────────────────┐
│           Appointment Scheduling Algorithm                       │
│                                                                  │
│  Request: Book appointment for Patient on Doctor's schedule      │
└────────────────────┬─────────────────────────────────────────────┘
                     │
    POST /api/appointments/schedule
    {
      patientId: "P001",
      doctorId: "D001",
      appointmentType: "CONSULTATION",
      requestedDateTime: "2025-06-15 14:00",
      duration: 30 // minutes
    }
                     │
                     ▼
    ┌─────────────────────────────────────────┐
    │  Step 1: Validate Input Data            │
    │  ✓ Patient exists                       │
    │  ✓ Doctor exists                        │
    │  ✓ DateTime is in future                │
    │  ✓ Duration > 0                         │
    └────────────────┬────────────────────────┘
                     │
                     ▼
    ┌─────────────────────────────────────────┐
    │  Step 2: Check Doctor Availability      │
    │                                         │
    │  Query all appointments for doctor:     │
    │  SELECT * FROM appointments             │
    │  WHERE doctor_id = 'D001'               │
    │  AND status != 'CANCELLED'              │
    │  AND appointment_date BETWEEN           │
    │      '2025-06-15 00:00'                 │
    │      AND '2025-06-15 23:59'             │
    │                                         │
    │  Result: [                              │
    │    { time: 09:00-09:30, patient: P101 },
    │    { time: 10:00-10:45, patient: P102 },
    │    { time: 14:30-15:00, patient: P103 },
    │    { time: 16:00-16:30, patient: P104 }
    │  ]                                      │
    └────────────────┬────────────────────────┘
                     │
                     ▼
    ┌─────────────────────────────────────────┐
    │  Step 3: Find Available Time Slots      │
    │                                         │
    │  Requested: 14:00-14:30                 │
    │                                         │
    │  Check against existing bookings:       │
    │  • 09:00-09:30 ✓ No conflict            │
    │  • 10:00-10:45 ✓ No conflict            │
    │  • 14:30-15:00 ✗ Starts after requested│
    │    slot (14:00-14:30) ENDS ✓ OK         │
    │  • 16:00-16:30 ✓ No conflict            │
    │                                         │
    │  Available slots: [14:00-14:30] ✓       │
    └────────────────┬────────────────────────┘
                     │
                     ▼
    ┌─────────────────────────────────────────┐
    │  Step 4: Check Patient Conflicts        │
    │                                         │
    │  Query patient's schedule:              │
    │  SELECT * FROM appointments             │
    │  WHERE patient_id = 'P001'              │
    │  AND status != 'CANCELLED'              │
    │  AND appointment_date = '2025-06-15'    │
    │                                         │
    │  Result: [] (No conflicts) ✓            │
    └────────────────┬────────────────────────┘
                     │
                     ▼
    ┌─────────────────────────────────────────┐
    │  Step 5: Check Department Resources     │
    │                                         │
    │  If appointment_type = "IMAGING":       │
    │  • Check MRI machine availability       │
    │  • Verify technician on duty            │
    │  • Confirm room available               │
    │                                         │
    │  Result: [MRI-1 available 14:00-14:30]✓│
    └────────────────┬────────────────────────┘
                     │
                     ▼
    ┌─────────────────────────────────────────┐
    │  Step 6: Create Appointment Record      │
    │                                         │
    │  INSERT INTO appointments               │
    │  (patient_id, doctor_id,                │
    │   appointment_date_time,                │
    │   duration, type, status,               │
    │   created_at)                           │
    │  VALUES (...)                           │
    │                                         │
    │  Result: Appointment ID = APT_00512 ✓  │
    └────────────────┬────────────────────────┘
                     │
                     ▼
    ┌─────────────────────────────────────────┐
    │  Step 7: Send Confirmations             │
    │                                         │
    │  ✓ Notify patient (SMS/Email)           │
    │  ✓ Notify doctor (Dashboard Alert)      │
    │  ✓ Update calendar for both             │
    │  ✓ Return appointment details to client │
    └────────────────┬────────────────────────┘
                     │
                     ▼
    ┌─────────────────────────────────────────┐
    │  Response (201 Created)                 │
    │  {                                      │
    │    appointmentId: "APT_00512",          │
    │    patientId: "P001",                   │
    │    doctorId: "D001",                    │
    │    dateTime: "2025-06-15 14:00",        │
    │    duration: 30,                        │
    │    status: "CONFIRMED",                 │
    │    message: "Appointment booked!"       │
    │  }                                      │
    └─────────────────────────────────────────┘

    ┌─ CONFLICT SCENARIO ────────────────────┐
    │                                        │
    │  If conflict detected at any step:     │
    │  Return 409 Conflict with error:       │
    │  {                                     │
    │    status: 409,                        │
    │    error: "CONFLICT",                  │
    │    message: "Doctor unavailable at...",│
    │    suggestedSlots: [                   │
    │      "2025-06-15 15:00",               │
    │      "2025-06-15 15:30",               │
    │      "2025-06-16 10:00"                │
    │    ]                                   │
    │  }                                     │
    └────────────────────────────────────────┘
```

### 4. ICU Telemetry & Real-Time Monitoring

```
┌──────────────────────────────────────────────────────────────────┐
│           ICU Patient Monitoring Dashboard                       │
│                                                                  │
│  Real-time vital signs tracking with clinical thresholds        │
└────────────────────┬─────────────────────────────────────────────┘
                     │ Frontend: Recharts real-time graph
                     ▼
    ┌─────────────────────────────────────────┐
    │  Every 30 seconds:                      │
    │  1. Fetch latest vitals from API        │
    │  2. Compare to alert thresholds         │
    │  3. Update dashboard in real-time       │
    │  4. Play alert sound if critical        │
    │                                         │
    │  GET /api/icu/patient/{id}/vitals       │
    │  ?latest=true                           │
    └────────────────┬────────────────────────┘
                     │
                     ▼
    ┌─────────────────────────────────────────┐
    │  Backend: Retrieve Latest Vitals        │
    │                                         │
    │  SELECT * FROM icu_vitals               │
    │  WHERE patient_id = 'P001'              │
    │  AND timestamp > NOW() - INTERVAL '1h'  │
    │  ORDER BY timestamp DESC                │
    │  LIMIT 1                                │
    └────────────────┬────────────────────────┘
                     │
                     ▼
    ┌─────────────────────────────────────────┐
    │  Retrieved Data:                        │
    │  {                                      │
    │    patientId: "P001",                   │
    │    timestamp: "2025-06-20 14:32:15",    │
    │    heartRate: 87,                       │
    │    systolic: 125,                       │
    │    diastolic: 78,                       │
    │    spO2: 97,                            │
    │    temperature: 37.2,                   │
    │    respiratoryRate: 16                  │
    │  }                                      │
    └────────────────┬────────────────────────┘
                     │
                     ▼
    ┌─────────────────────────────────────────┐
    │  Step 1: Compare to Normal Thresholds   │
    │                                         │
    │  Normal Ranges (Hospital Standards):    │
    │  • Heart Rate: 60-100 bpm               │
    │  • BP: 90-120 / 60-80 mmHg              │
    │  • SpO2: ≥ 95%                          │
    │  • Temp: 36.5-37.5°C                    │
    │  • RR: 12-20 breaths/min                │
    │                                         │
    │  Current: HR=87 ✓ NORMAL               │
    │  Current: BP=125/78 ⚠ ELEVATED         │
    │  Current: SpO2=97 ✓ NORMAL             │
    │  Current: Temp=37.2 ✓ NORMAL           │
    │  Current: RR=16 ✓ NORMAL               │
    └────────────────┬────────────────────────┘
                     │
                     ▼
    ┌─────────────────────────────────────────┐
    │  Step 2: Generate Alert Status          │
    │                                         │
    │  alertLevel = "WARNING"                 │
    │  (because BP is slightly elevated)      │
    │                                         │
    │  Alert Options:                         │
    │  • "NORMAL" (All vitals good)           │
    │  • "WARNING" (One vital elevated)       │
    │  • "CRITICAL" (HR < 50 or > 120,       │
    │              SpO2 < 90%, etc)          │
    │  • "ALARM" (Life-threatening)           │
    └────────────────┬────────────────────────┘
                     │
                     ▼
    ┌─────────────────────────────────────────┐
    │  Step 3: Notify Clinicians              │
    │                                         │
    │  if alertLevel = "WARNING" or "CRITICAL":
    │    • Dashboard indicator flashes        │
    │    • Alert banner appears               │
    │    • Assigned doctor notified           │
    │    • Nurse called to bedside            │
    │    • Log event in medical_history       │
    │                                         │
    │  if alertLevel = "ALARM":               │
    │    • BEEP BEEP BEEP (loud)              │
    │    • Phone call to on-call doctor       │
    │    • Activate emergency protocol        │
    │    • Summon emergency team to ICU       │
    └────────────────┬────────────────────────┘
                     │
                     ▼
    ┌─────────────────────────────────────────┐
    │  Response (200 OK):                     │
    │  {                                      │
    │    patientId: "P001",                   │
    │    latestVitals: {                      │
    │      heartRate: 87,                     │
    │      systolic: 125,                     │
    │      diastolic: 78,                     │
    │      spO2: 97,                          │
    │      temperature: 37.2,                 │
    │      respiratoryRate: 16                │
    │    },                                   │
    │    alertLevel: "WARNING",               │
    │    abnormalReadings: ["BP_ELEVATED"],   │
    │    normalReadings: [                    │
    │      "HR", "SpO2", "Temp", "RR"        │
    │    ],                                   │
    │    recommendations: [                   │
    │      "Monitor BP closely",              │
    │      "Increase hydration",              │
    │      "Check medication adherence"       │
    │    ],                                   │
    │    timestamp: "2025-06-20 14:32:15"    │
    │  }                                      │
    └──────────────────────────────────────────┘
```

### 5. AI-Powered Clinical Summary Generation

```
┌──────────────────────────────────────────────────────────────────┐
│         AI Summary Generation Workflow                           │
│                                                                  │
│  Synthesizes patient data to support clinical decision-making   │
└────────────────────┬─────────────────────────────────────────────┘
                     │
    GET /api/ai/patient-summary/{patientId}
                     │
                     ▼
    ┌─────────────────────────────────────────┐
    │  Step 1: Aggregate Patient Data         │
    │                                         │
    │  Query from multiple tables:            │
    │  • patients (demographics, admission)   │
    │  • medical_history (symptoms, notes)    │
    │  • icu_vitals (recent measurements)     │
    │  • appointments (procedures scheduled)  │
    │  • clinical_tests (lab results)         │
    │  • medications (current drugs)          │
    └────────────────┬────────────────────────┘
                     │
                     ▼
    ┌─────────────────────────────────────────┐
    │  Step 2: Data Cleaning & Normalization  │
    │                                         │
    │  • Format dates consistently            │
    │  • Convert units (mg/dL, mmHg, etc)     │
    │  • Flag missing or anomalous data       │
    │  • Prioritize recent records            │
    │  • Combine related data points          │
    └────────────────┬────────────────────────┘
                     │
                     ▼
    ┌─────────────────────────────────────────┐
    │  Step 3: Build Context Summary          │
    │                                         │
    │  Consolidated Patient Profile:          │
    │  ──────────────────────────────────────  │
    │  Patient: John Doe, 65M                 │
    │  Admitted: 2025-06-15                   │
    │  Chief Complaint: Chest pain, SOB       │
    │                                         │
    │  Medical History:                       │
    │  • Hypertension (10 years)              │
    │  • Type 2 Diabetes (5 years)            │
    │  • Previous MI (2020)                   │
    │  • Smoking history (quit 2015)          │
    │                                         │
    │  Current Medications:                   │
    │  • Atorvastatin 40mg                    │
    │  • Lisinopril 10mg                      │
    │  • Metformin 1000mg                     │
    │  • Aspirin 81mg                         │
    │                                         │
    │  Recent Vitals (Last 24h):              │
    │  • HR: 78-92 (avg 85)                   │
    │  • BP: 130-145 / 78-88 (avg 138/82)     │
    │  • SpO2: 96-98% (avg 97%)               │
    │  • Temp: 36.8-37.2°C (normal)           │
    │                                         │
    │  Lab Results (2025-06-19):              │
    │  • Troponin: 0.04 (elevated, normal<0.04)
    │  • BNP: 450 (elevated, normal<400)      │
    │  • Creatinine: 1.2 (normal)             │
    │  • Glucose: 165 (elevated, normal<100)  │
    └────────────────┬────────────────────────┘
                     │
                     ▼
    ┌─────────────────────────────────────────┐
    │  Step 4: Generate AI Summary            │
    │                                         │
    │  Using LLM (GPT/Claude):                │
    │                                         │
    │  PROMPT:                                │
    │  "Given the following patient data,    │
    │   generate a concise clinical summary  │
    │   highlighting key findings, current   │
    │   risk factors, and recommended next   │
    │   steps for a cardiologist."            │
    │                                         │
    │  INPUT: [Patient context from Step 3]   │
    │                                         │
    │  AI RESPONSE:                           │
    │  ──────────────────────────────────────  │
    │  "65-year-old male with significant     │
    │  cardiac risk factors (HTN, DM2, h/o MI)
    │  presenting with acute chest pain and  │
    │  dyspnea. Initial troponin slightly     │
    │  elevated (0.04) with elevated BNP      │
    │  (450), suggesting possible ACS or      │
    │  heart failure exacerbation.            │
    │                                         │
    │  Key Findings:                          │
    │  1. Possible acute coronary syndrome    │
    │     - Troponin elevation warrants ECG   │
    │     - Risk factors present              │
    │     - Symptoms consistent (chest pain) │
    │                                         │
    │  2. Possible heart failure component    │
    │     - BNP elevated                      │
    │     - Dyspnea on presentation           │
    │     - HTN/DM history                    │
    │                                         │
    │  3. Suboptimal glucose control          │
    │     - Glucose 165 on current therapy    │
    │     - Consider insulin initiation       │
    │                                         │
    │  Recommended Next Steps:                │
    │  • Serial troponin measurement (3h)    │
    │  • 12-lead ECG (compare to baseline)    │
    │  • Chest X-ray (assess pulmonary)       │
    │  • Cardiology consult (rule out ACS)    │
    │  • Consider cardiac catheterization     │
    │  • Increase aspirin/anticoagulation     │
    │  • Endocrinology consult (DM management)
    │  • ICU monitoring (continuous telemetry)
    │                                         │
    │  Risk Level: HIGH                       │
    │  Confidence: 92%"                       │
    └────────────────┬────────────────────────┘
                     │
                     ▼
    ┌─────────────────────────────────────────┐
    │  Step 5: Extract Actionable Insights    │
    │                                         │
    │  Parse AI output:                       │
    │  • Flag critical findings               │
    │  • Suggest urgency level                │
    │  • Link to diagnostic protocols         │
    │  • Recommend specialist involvement     │
    │  • Propose medication adjustments       │
    └────────────────┬────────────────────────┘
                     │
                     ▼
    ┌─────────────────────────────────────────┐
    │  Step 6: Cache & Return Response        │
    │                                         │
    │  Cache for 1 hour (to optimize AI cost) │
    │  Return structured response:            │
    │                                         │
    │  {                                      │
    │    patientId: "P001",                   │
    │    generatedAt: "2025-06-20 14:35:22",  │
    │    riskLevel: "HIGH",                   │
    │    summary: "65-year-old male with... ",
    │    keyFindings: [                       │
    │      "Possible ACS",                    │
    │      "Possible heart failure",          │
    │      "Suboptimal DM control"            │
    │    ],                                   │
    │    nextSteps: [                         │
    │      "Serial troponin",                 │
    │      "12-lead ECG",                     │
    │      "Chest X-ray",                     │
    │      "Cardiology consult"               │
    │    ],                                   │
    │    specialists: ["Cardiology"],         │
    │    confidence: 0.92                     │
    │  }                                      │
    └──────────────────────────────────────────┘
```

---

## 📡 API Workflows

### Authentication Flow

```
1. USER LOGIN
   POST /api/auth/login
   {
     email: "doctor@mediflow.com",
     password: "doctor123"
   }
   
   RESPONSE (200):
   {
     token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
     user: {
       id: "doc_001",
       email: "doctor@mediflow.com",
       name: "Dr. John Watson",
       role: "DOCTOR",
       permissions: ["view:patients", "write:clinical_notes", ...]
     }
   }

2. SUBSEQUENT REQUESTS
   Headers: Authorization: Bearer <token>
   
3. TOKEN EXPIRATION
   After 24 hours, GET returns 401 Unauthorized
   
4. REFRESH TOKEN
   POST /api/auth/refresh
   {
     refreshToken: "..."
   }
   Returns new access token

5. LOGOUT
   POST /api/auth/logout
   Invalidates token on server (optional)
```

### Patient Management Flow

```
1. ADMIT PATIENT
   POST /api/patients/admit
   {
     firstName: "John",
     lastName: "Doe",
     dateOfBirth: "1960-05-15",
     email: "john.doe@example.com",
     phone: "+1234567890",
     address: "123 Main St...",
     insurance: "BlueCross #12345",
     emergency: "Jane Doe +1987654321",
     chiefComplaint: "Chest pain",
     symptoms: ["pain", "shortness of breath"],
     medications: ["Aspirin", "Lisinopril"],
     allergies: ["Penicillin"],
     initialVitals: {
       heartRate: 85,
       systolic: 140,
       diastolic: 90,
       spO2: 96,
       temperature: 37.2
     }
   }
   
   RESPONSE (201):
   {
     patientId: "P001234",
     message: "Patient admitted successfully",
     admissionDate: "2025-06-20T14:00:00Z"
   }

2. ASSIGN DOCTOR
   PUT /api/patients/{patientId}/assign-doctor
   {
     doctorId: "doc_001"
   }
   
   RESPONSE (200):
   {
     message: "Doctor assigned",
     assignedDoctor: "Dr. John Watson"
   }

3. GET PATIENT RECORD
   GET /api/patients/{patientId}
   
   RESPONSE (200):
   {
     patientId: "P001234",
     name: "John Doe",
     age: 65,
     gender: "M",
     status: "ADMITTED",
     admissionDate: "2025-06-20T14:00:00Z",
     assignedDoctor: "Dr. John Watson",
     chiefComplaint: "Chest pain",
     currentMedications: [...],
     allergies: [...],
     latestVitals: {...},
     medicalHistory: [...]
   }

4. UPDATE PATIENT NOTES
   PUT /api/patients/{patientId}/update-notes
   {
     notes: "Patient shows improvement. Troponin levels normalized.",
     diagnosis: "Acute coronary syndrome",
     treatmentPlan: "Continue cardiac monitoring...",
     medications: ["Aspirin", "Clopidogrel", ...]
   }
   
   RESPONSE (200):
   {
     message: "Patient notes updated"
   }

5. DISCHARGE PATIENT
   POST /api/patients/{patientId}/discharge
   {
     dischargeNotes: "Patient discharged in stable condition",
     followUpInstructions: "Follow up with cardiology in 2 weeks",
     medications: ["Aspirin", "Lisinopril", ...]
   }
   
   RESPONSE (200):
   {
     message: "Patient discharged successfully",
     dischargeDate: "2025-06-25T10:00:00Z"
   }
```

### Appointment Scheduling Flow

```
1. SCHEDULE APPOINTMENT
   POST /api/appointments/schedule
   {
     patientId: "P001234",
     doctorId: "doc_001",
     appointmentType: "CONSULTATION",
     requestedDateTime: "2025-06-25T14:00:00Z",
     duration: 30,
     location: "Clinic Room 5"
   }
   
   RESPONSE (201 or 409):
   SUCCESS (201):
   {
     appointmentId: "APT_00512",
     status: "CONFIRMED",
     dateTime: "2025-06-25T14:00:00Z"
   }
   
   CONFLICT (409):
   {
     error: "CONFLICT",
     message: "Doctor unavailable at requested time",
     suggestedSlots: [
       "2025-06-25T15:00:00Z",
       "2025-06-25T15:30:00Z",
       "2025-06-26T10:00:00Z"
     ]
   }

2. GET DOCTOR SCHEDULE
   GET /api/appointments/doctor/{doctorId}?date=2025-06-25
   
   RESPONSE (200):
   {
     date: "2025-06-25",
     appointments: [
       {
         appointmentId: "APT_00512",
         patientName: "John Doe",
         time: "14:00-14:30",
         type: "CONSULTATION",
         status: "CONFIRMED"
       }
     ],
     availableSlots: ["10:00", "10:30", "15:00", ...]
   }

3. RESCHEDULE APPOINTMENT
   PUT /api/appointments/{appointmentId}/reschedule
   {
     newDateTime: "2025-06-26T14:00:00Z"
   }
   
   RESPONSE (200):
   {
     message: "Appointment rescheduled successfully",
     newDateTime: "2025-06-26T14:00:00Z"
   }

4. CANCEL APPOINTMENT
   DELETE /api/appointments/{appointmentId}
   
   RESPONSE (200):
   {
     message: "Appointment cancelled"
   }
```

### ICU Monitoring Flow

```
1. ADMIT TO ICU
   POST /api/icu/admit
   {
     patientId: "P001234",
     bedNumber: "ICU-101",
     initialDiagnosis: "Post-MI monitoring"
   }
   
   RESPONSE (201):
   {
     message: "Patient admitted to ICU",
     bedAssignment: "ICU-101"
   }

2. LOG VITAL SIGNS
   POST /api/icu/vitals
   {
     patientId: "P001234",
     heartRate: 87,
     systolic: 125,
     diastolic: 78,
     spO2: 97,
     temperature: 37.2,
     respiratoryRate: 16
   }
   
   RESPONSE (201):
   {
     message: "Vitals recorded",
     alertLevel: "NORMAL",
     timestamp: "2025-06-20T14:32:15Z"
   }

3. GET REAL-TIME VITALS
   GET /api/icu/patient/{patientId}/vitals?latest=true
   
   RESPONSE (200):
   {
     latestVitals: {
       heartRate: 87,
       systolic: 125,
       diastolic: 78,
       spO2: 97,
       temperature: 37.2,
       respiratoryRate: 16
     },
     alertLevel: "WARNING",
     abnormalReadings: ["BP_ELEVATED"]
   }

4. GET ICU DASHBOARD
   GET /api/icu/dashboard
   
   RESPONSE (200):
   {
     patientsInICU: 5,
     criticalAlerts: 1,
     beds: [
       {
         bedNumber: "ICU-101",
         patientName: "John Doe",
         alertLevel: "WARNING",
         latestVitals: {...}
       }
     ]
   }
```

---

## 📦 Installation & Setup

### Prerequisites

```bash
# Check Node.js version (18+ required)
node -v
npm -v

# Install system dependencies
# macOS:
brew install postgresql

# Ubuntu/Debian:
sudo apt-get install postgresql postgresql-contrib

# Windows: Download installer from https://www.postgresql.org/download/windows/
```

### Step 1: Clone Repository

```bash
git clone https://github.com/CyberVerve07/ZenithCare.git
cd ZenithCare
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Environment Configuration

Create `.env.local` file in project root:

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/zenithcare
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Authentication
JWT_SECRET=your_super_secret_jwt_key_min_32_chars_12345678
JWT_EXPIRATION=24h
BCRYPT_ROUNDS=10

# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
API_PORT=5000
FRONTEND_PORT=3000

# AI/LLM (Optional - for summaries)
OPENAI_API_KEY=sk-your-key
ANTHROPIC_API_KEY=your_key

# Email (for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your_app_password

# Environment
NODE_ENV=development
```

### Step 4: Database Setup (Optional - if using local PostgreSQL)

```bash
# Create database
createdb zenithcare

# Run migrations (if migrations exist)
npm run migrate

# Seed test data
npm run seed
```

### Step 5: Start Development Server

**Terminal 1 - Frontend (Next.js)**
```bash
npm run dev
# Runs on http://localhost:3000
```

**Terminal 2 - Backend (Express)**
```bash
npm run server
# Runs on http://localhost:5000
```

### Step 6: Access Application

```
Frontend: http://localhost:3000
Backend API: http://localhost:5000/api

Landing Page: http://localhost:3000
Login Portal: http://localhost:3000/login
Admin Dashboard: http://localhost:3000/dashboard/admin
Doctor Portal: http://localhost:3000/dashboard/doctor
```

### Step 7: Mock Test Credentials

```
Admin Account:
  Email: admin@mediflow.com
  Password: admin123

Doctor Account:
  Email: doctor@mediflow.com
  Password: doctor123

Nurse Account:
  Email: nurse@mediflow.com
  Password: nurse123

Staff Account:
  Email: staff@mediflow.com
  Password: staff123
```

---

## 🔐 Authentication & RBAC

### JWT Token Structure

```javascript
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "userId": "doc_001",
    "email": "doctor@mediflow.com",
    "name": "Dr. John Watson",
    "role": "DOCTOR",
    "department": "Cardiology",
    "permissions": [
      "view:patients",
      "write:clinical_notes",
      "read:icu_vitals",
      "manage:own_appointments",
      "create:tests"
    ],
    "iat": 1621012345,      // Issued at
    "exp": 1621098745       // Expires at (24 hours)
  },
  "signature": "HMACSHA256(header.payload, JWT_SECRET)"
}
```

### Role Definitions

| Role | Permissions | Use Cases |
|------|-----------|-----------|
| **Admin** | All permissions | Hospital management, user administration, system configuration |
| **Doctor** | View patients, write notes, order tests, schedule appointments, view ICU vitals | Clinical care, diagnosis, treatment planning |
| **Nurse** | Admit patients, log vitals, create diet plans, update patient status | Patient intake, monitoring, care coordination |
| **Staff** | View schedules, log diet, view patient info (limited) | Administrative support, dietary services |

### Middleware Chain

```typescript
// Express middleware stack
app.use(cors(corsOptions));                    // 1. CORS
app.use(express.json());                       // 2. Body parser
app.use(requestLogger);                        // 3. Logging
app.use(verifyJWT);                            // 4. JWT verification
app.use(requireRole(['ADMIN', 'DOCTOR']));     // 5. RBAC check
// Routes handlers...
```

---

## 🧩 Core Modules

### 1. Authentication Module (`server/controllers/authController.ts`)

**Responsibilities:**
- User login/logout
- Password validation and hashing
- JWT token generation
- Session management

**Key Endpoints:**
```
POST   /api/auth/login        - User login
POST   /api/auth/register     - New user registration
POST   /api/auth/logout       - User logout
POST   /api/auth/refresh      - Token refresh
POST   /api/auth/forgot-password - Password reset
```

### 2. Patient Management Module (`server/controllers/patientController.ts`)

**Responsibilities:**
- Patient admission/discharge
- Medical record management
- Patient data retrieval

**Key Endpoints:**
```
POST   /api/patients/admit              - Admit new patient
GET    /api/patients/{id}               - Get patient record
PUT    /api/patients/{id}               - Update patient info
PUT    /api/patients/{id}/assign-doctor - Assign attending doctor
POST   /api/patients/{id}/discharge     - Discharge patient
GET    /api/patients                    - List all patients (with filters)
```

### 3. Appointment Scheduler Module (`server/controllers/appointmentController.ts`)

**Responsibilities:**
- Appointment booking with conflict detection
- Schedule management
- Appointment status tracking

**Key Endpoints:**
```
POST   /api/appointments/schedule       - Book appointment
GET    /api/appointments/{id}           - Get appointment details
PUT    /api/appointments/{id}/reschedule - Reschedule appointment
DELETE /api/appointments/{id}           - Cancel appointment
GET    /api/appointments/doctor/{id}    - Get doctor's schedule
```

### 4. ICU Telemetry Module (`server/controllers/icuController.ts`)

**Responsibilities:**
- Real-time vital signs tracking
- Alert generation and thresholds
- ICU bed management

**Key Endpoints:**
```
POST   /api/icu/admit                   - Admit to ICU
POST   /api/icu/vitals                  - Log vital signs
GET    /api/icu/patient/{id}/vitals     - Get patient vitals
GET    /api/icu/dashboard               - ICU overview
GET    /api/icu/alerts                  - Active alerts
```

### 5. Dietary Management Module (`server/controllers/dietController.ts`)

**Responsibilities:**
- Meal plan creation
- Dietary restrictions management
- Nutrition tracking

**Key Endpoints:**
```
POST   /api/diet/create-plan            - Create diet plan
GET    /api/diet/plan/{id}              - Get diet plan
PUT    /api/diet/plan/{id}              - Update diet plan
GET    /api/diet/meals                  - Available meal options
```

### 6. AI Summary Module (`server/services/aiSummaryService.ts`)

**Responsibilities:**
- Clinical summary generation
- Patient context synthesis
- Decision support

**Key Endpoints:**
```
GET    /api/ai/patient-summary/{id}     - Generate AI summary
GET    /api/ai/risk-assessment/{id}     - Risk analysis
GET    /ai/recommendations/{id}         - Treatment recommendations
```

---

## 💾 Database Schema

### Core Tables

```sql
-- Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role ENUM('ADMIN', 'DOCTOR', 'NURSE', 'STAFF') NOT NULL,
  department VARCHAR(255),
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT true
);

-- Patients Table
CREATE TABLE patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mrn VARCHAR(50) UNIQUE NOT NULL,  -- Medical Record Number
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  date_of_birth DATE NOT NULL,
  gender ENUM('M', 'F', 'OTHER'),
  email VARCHAR(255),
  phone VARCHAR(20),
  address TEXT,
  insurance_provider VARCHAR(255),
  insurance_number VARCHAR(100),
  emergency_contact_name VARCHAR(255),
  emergency_contact_phone VARCHAR(20),
  admission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  discharge_date TIMESTAMP,
  status ENUM('ADMITTED', 'DISCHARGED', 'IN_ICU') DEFAULT 'ADMITTED',
  assigned_doctor_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Medical History Table
CREATE TABLE medical_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  chief_complaint TEXT NOT NULL,
  symptoms TEXT[] NOT NULL,
  medical_conditions TEXT[],
  medications TEXT[],
  allergies TEXT[],
  lab_results JSONB,
  clinical_notes TEXT,
  diagnosis VARCHAR(255),
  treatment_plan TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by_id UUID REFERENCES users(id)
);

-- Appointments Table
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id UUID NOT NULL REFERENCES users(id),
  appointment_type VARCHAR(100) NOT NULL,  -- CONSULTATION, TEST, PROCEDURE, etc.
  appointment_date_time TIMESTAMP NOT NULL,
  duration INTEGER NOT NULL,  -- in minutes
  location VARCHAR(255),
  status ENUM('SCHEDULED', 'COMPLETED', 'CANCELLED', 'NO_SHOW') DEFAULT 'SCHEDULED',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ICU Vitals Table
CREATE TABLE icu_vitals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  heart_rate INTEGER,
  systolic_bp INTEGER,
  diastolic_bp INTEGER,
  spo2 DECIMAL(5,2),
  temperature DECIMAL(5,2),
  respiratory_rate INTEGER,
  alert_level ENUM('NORMAL', 'WARNING', 'CRITICAL', 'ALARM'),
  recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  recorded_by_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Diet Plans Table
CREATE TABLE diet_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  breakfast VARCHAR(500),
  lunch VARCHAR(500),
  dinner VARCHAR(500),
  special_instructions TEXT,
  restrictions TEXT[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by_id UUID REFERENCES users(id)
);

-- Clinical Tests Table
CREATE TABLE clinical_tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  test_type VARCHAR(255) NOT NULL,  -- LAB, IMAGING, ECG, etc.
  test_name VARCHAR(255) NOT NULL,
  ordered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  scheduled_at TIMESTAMP,
  completed_at TIMESTAMP,
  results JSONB,
  status ENUM('ORDERED', 'SCHEDULED', 'COMPLETED', 'CANCELLED') DEFAULT 'ORDERED',
  ordered_by_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ICU Beds Table
CREATE TABLE icu_beds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bed_number VARCHAR(50) UNIQUE NOT NULL,
  status ENUM('AVAILABLE', 'OCCUPIED', 'MAINTENANCE') DEFAULT 'AVAILABLE',
  current_patient_id UUID REFERENCES patients(id),
  admission_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Audit Log Table
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  action VARCHAR(255) NOT NULL,
  entity_type VARCHAR(100),
  entity_id UUID,
  details JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Key Relationships

```
users (1) ──┬──> (Many) patients (assigned_doctor_id)
            ├──> (Many) appointments (doctor_id)
            ├──> (Many) medical_history (created_by_id)
            ├──> (Many) icu_vitals (recorded_by_id)
            └──> (Many) audit_logs (user_id)

patients (1) ──┬──> (Many) appointments (patient_id)
               ├──> (Many) medical_history (patient_id)
               ├──> (Many) icu_vitals (patient_id)
               ├──> (Many) diet_plans (patient_id)
               ├──> (Many) clinical_tests (patient_id)
               └──> (1) icu_beds (current_patient_id)
```

---

## 🚀 Deployment

### Development Environment

```bash
# Start both frontend and backend
Terminal 1: npm run dev
Terminal 2: npm run server
```

### Production Build

```bash
# Build frontend
npm run build

# Start production server
npm run start
```

### Docker Deployment (Optional)

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

RUN npm run build

EXPOSE 3000 5000

CMD ["sh", "-c", "npm run server & npm run start"]
```

Build and run:
```bash
docker build -t zenithcare .
docker run -p 3000:3000 -p 5000:5000 \
  -e DATABASE_URL="postgresql://..." \
  -e JWT_SECRET="..." \
  zenithcare
```

### Deployment Checklist

- [ ] Set production environment variables
- [ ] Configure database with strong credentials
- [ ] Enable HTTPS/SSL
- [ ] Set up monitoring and logging
- [ ] Configure backup strategy for database
- [ ] Set up CI/CD pipeline (GitHub Actions, GitLab CI)
- [ ] Enable rate limiting on API endpoints
- [ ] Configure CORS for production domain
- [ ] Set up error tracking (Sentry)
- [ ] Enable application monitoring (New Relic, DataDog)

---

## 📊 Performance Optimization

### Frontend Optimizations
- **Next.js Image Optimization**: Automatic image resizing and lazy loading
- **Code Splitting**: Automatic route-based code splitting
- **Caching**: Browser and server-side caching strategies
- **Compression**: Gzip compression for assets
- **CDN**: Serve static assets from CDN

### Backend Optimizations
- **Database Connection Pooling**: Reuse connections to PostgreSQL
- **Query Optimization**: Indexed queries, avoided N+1 problems
- **Caching**: Redis cache for frequently accessed data
- **Rate Limiting**: Prevent API abuse
- **Pagination**: Limit data transfer per request
- **Compression**: Compress JSON responses

### Database Optimizations
```sql
-- Create indexes for frequently queried columns
CREATE INDEX idx_patients_admission_date ON patients(admission_date);
CREATE INDEX idx_appointments_doctor_date ON appointments(doctor_id, appointment_date_time);
CREATE INDEX idx_icu_vitals_patient_timestamp ON icu_vitals(patient_id, recorded_at DESC);
CREATE INDEX idx_users_email ON users(email);
```

---

## 🧪 Testing (Optional)

### Unit Tests
```bash
npm run test
```

### Integration Tests
```bash
npm run test:integration
```

### E2E Tests
```bash
npm run test:e2e
```

---

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/AmazingFeature`
3. **Commit changes**: `git commit -m 'Add AmazingFeature'`
4. **Push to branch**: `git push origin feature/AmazingFeature`
5. **Open Pull Request**

### Coding Standards
- TypeScript strict mode enabled
- Prettier code formatting
- ESLint rules enforced
- Commit messages follow Conventional Commits

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support & Contact

For questions, issues, or suggestions:
- **GitHub Issues**: [ZenithCare Issues](https://github.com/CyberVerve07/ZenithCare/issues)
- **Email**: contact@zenithcare.dev
- **Documentation**: [Full Docs](https://docs.zenithcare.dev)

---

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Core RBAC system
- ✅ Patient management
- ✅ Appointment scheduling
- ✅ ICU telemetry
- ✅ Dietary management

### Phase 2 (Q3 2025)
- 📋 Advanced analytics dashboard
- 📋 SMS/Email notifications
- 📋 Mobile app (React Native)
- 📋 Video consultations
- 📋 Prescription management

### Phase 3 (Q4 2025)
- 📋 Integration with EHR systems
- 📋 HL7/FHIR compliance
- 📋 Advanced ML-based diagnostics
- 📋 Multi-hospital network support
- 📋 Blockchain audit trail

---

## 🙏 Acknowledgments

Built with modern healthcare tech stack, inspired by leading hospital management systems worldwide.

**Special thanks to:**
- Supabase for reliable PostgreSQL hosting
- Next.js team for amazing framework
- Three.js for stunning 3D graphics
- Open-source healthcare community

---

**Made with ❤️ by CyberVerve07**

Last Updated: June 2025 | Version: 1.0.0 | Status: Production Ready ✅
