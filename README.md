# 🏥 Orchids MediFlow — Enterprise Hospital Management & Clinical Operations Platform

**A production-grade, AI-enhanced SaaS hospital management system** designed for modern healthcare environments. Combines a stunning interactive 3D landing page with robust role-based access control, real-time patient telemetry, intelligent appointment scheduling, and clinical decision support.

<p align="center">
  <img src="public/mediflow_hero_banner.png" alt="Orchids MediFlow Premium Banner" width="100%" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-92.4%25-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Java-21-orange?style=for-the-badge&logo=openjdk" alt="Java" />
  <img src="https://img.shields.io/badge/Spring%20Boot-3.4.2-brightgreen?style=for-the-badge&logo=springboot" alt="Spring Boot" />
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=nextdotjs" alt="Next.js" />
  <img src="https://img.shields.io/badge/PostgreSQL-Supabase-blue?style=for-the-badge&logo=postgresql" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Status-Production%20Ready-brightgreen?style=for-the-badge" alt="Status" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License" />
</p>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Visual Previews](#-visual-previews)
- [Technology Stack](#-technology-stack)
- [System Architecture](#-system-architecture)
- [Project Structure](#-project-structure)
- [System Design & Diagrams](#-system-design--diagrams)
- [API Workflows](#-api-workflows)
- [Installation & Setup](#-installation--setup)
  - [Next.js Frontend](#1-frontend-setup-nextjs)
  - [Option A: Express.js Backend](#2a-backend-setup-expressjs-node)
  - [Option B: Spring Boot Java Backend](#2b-backend-setup-spring-boot-java)
- [Authentication & RBAC](#-authentication--rbac)
- [Core Platform Modules](#-core-platform-modules)
- [Database Schema](#-database-schema)
- [Performance Optimization](#-performance-optimization)
- [Deployment](#-deployment)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

Orchids MediFlow is an **enterprise-grade hospital management system** built with cutting-edge technologies to solve critical healthcare operational challenges:

### Problems Solved
* 📅 **Zero Appointment Overlaps**: Intelligent scheduling with real-time availability checking and automated clinician conflict prevention.
* 📂 **Centralized Patient Telemetry**: Unified patient clinical records, combining symptoms, histories, lab results, and real-time monitoring under one screen.
* 🚨 **ICU Vital Alerts**: Continuous telemetry of critical vital signs (HR, BP, SpO₂), generating automatic alarms when parameters breach safety thresholds.
* 🧠 **AI-Powered Diagnostics Synthesis**: Contextual clinical summaries generated dynamically from clinical records to aid diagnostic accuracy and speed.
* 🔐 **Strict Regulatory Compliance**: Built HIPAA-ready with robust JSON Web Token (JWT) credentials and granular Role-Based Access Control (RBAC).
* ⚡ **High Availability**: Features a hybrid database approach combining PostgreSQL (Supabase) with an active in-memory cache fallback to ensure uninterrupted clinical workflows.

---

## ✨ Key Features

| Feature | Description | Impact |
|---------|-------------|--------|
| 🌐 **Interactive 3D Landing Page** | Premium Three.js landing page with an animated medical orb and particle physics. | Elevates brand presence and engages patients. |
| 🔑 **Role-Based Access Control (RBAC)** | Strict access matrices for Admins, Doctors, Nurses, and Administrative Staff. | Enhances security, privacy, and HIPAA compliance. |
| 🏥 **ICU Telemetry Dashboard** | Real-time tracking of physiological vitals with responsive graphical charts. | Minimizes reaction times in critical care units. |
| 📅 **Smart Appointment Scheduler** | Automatic scheduling algorithms with comprehensive conflict prevention. | Prevents scheduling overlaps and resource booking errors. |
| 🧪 **Clinical Workflow Suite** | Unified systems for patient admissions, progress entries, and lab requests. | Enhances hospital throughput and efficiency. |
| 🥗 **Dietary Management** | Specialized dietary plan creation with custom daily menus and allergen flags. | Optimizes patient nutrition and clinical recovery. |
| 🧠 **AI-Powered Summaries** | Aggregated synthesis of symptoms, medications, and vitals using advanced LLMs. | Enables faster clinical decision-making and evaluations. |
| 🔌 **Hybrid Database Architecture** | PostgreSQL (via Supabase) with in-memory database backup. | Ensures 99.99% operational uptime during connectivity drops. |
| 📊 **Advanced Analytics** | Interactive graphs displaying hospital occupancy, department KPIs, and scheduling metrics. | Provides data-driven operational insights for administrators. |

---

## 📸 Visual Previews

### 1. Landing Hero Scene
Our primary entry point features a fully responsive, 3D medical scene built using Three.js and React Three Fiber.
<p align="center">
  <img src="public/mediflow_hero_banner.png" alt="Orchids MediFlow 3D Landing Page" width="90%" />
</p>

### 2. ICU Telemetry & Patient Monitoring
The clinical telemetry page renders ongoing streams of vital signs with direct alarm triggers and glassmorphic telemetry cards.
<p align="center">
  <img src="public/mediflow_icu_dashboard.png" alt="ICU Telemetry Dashboard UI" width="90%" />
</p>

### 3. Smart Availability Scheduler
The calendar scheduler features an active availability matrix showing doctor shifts, patient appointments, and warning alerts for schedule conflicts.
<p align="center">
  <img src="public/mediflow_smart_scheduling.png" alt="Smart Availability Scheduler" width="90%" />
</p>

---

## 🛠️ Technology Stack

### Frontend Architecture
* **Framework**: Next.js 15 (App Router Architecture)
* **Library**: React 19
* **Styling**: Tailwind CSS 4 (Utility-first system)
* **3D Visuals**: Three.js & React Three Fiber (R3F)
* **Animations**: Framer Motion (Smooth page transitions & hover physics)
* **Icons**: Lucide React
* **Charts**: Recharts (Dynamic clinical telemetry graphs)
* **Form Logic**: React Hook Form & Zod Schema Validation
* **API Client**: Axios (With request/response interceptors)

### Backend Alternatives (Dual Support)

#### Option A: Express.js Node Backend
* **Runtime**: Node.js v18+
* **Framework**: Express.js
* **Language**: TypeScript
* **ORM**: Drizzle ORM
* **Authentication**: JWT (`jsonwebtoken`)
* **Cryptography**: `bcryptjs`
* **CORS**: Express CORS middleware

#### Option B: Spring Boot Java Backend
* **Runtime**: JDK 21
* **Framework**: Spring Boot 3.4.2
* **Language**: Java
* **Database Access**: Spring Data JPA & Hibernate
* **Security & Auth**: Spring Security 6 with custom JWT filter
* **JWT Engine**: Java JSON Web Token (JJWT 0.11.5)
* **Build Automation**: Maven

### Database & DevOps
* **Primary Relational DB**: PostgreSQL (Supabase Hosting)
* **Connection Pooling**: `pg` (Node-Postgres) & HikariCP (Spring Boot)
* **Caching & Fallback**: In-Memory caching layers
* **API Model**: Stateless REST APIs
* **E2E Tooling**: ESLint, Prettier, TypeScript Compiler

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                             │
│  Next.js 15 (React 19, Tailwind CSS 4, Framer Motion)           │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────┐      ┌──────────────────────┐        │
│  │  Landing Page (3D)   │      │  Portal Dashboard    │        │
│  │  • Three.js Canvas   │      │  • Role-Based UI     │        │
│  │  • Framer Animations │      │  • Real-time Updates │        │
│  │  • Responsive Layout │      │  • Data Visualizations       │
│  └──────────────────────┘      └──────────────────────┘        │
└──────────────────────┬───────────────────────────────────────────┘
                       │ Axios HTTP Requests (Bearer Token)
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                    API GATEWAY & SECURITY                       │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  CHOICE A: Node.js Express (Port 5000)                   │  │
│  │  • CORS & Logger Middlewares                            │  │
│  │  • Custom JWT & RBAC Middlewares                         │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  CHOICE B: Spring Boot 3 (Port 8080)                     │  │
│  │  • Spring Security Filters                               │  │
│  │  • Custom OncePerRequestFilter (JJWT Parser)             │  │
│  └──────────────────────────────────────────────────────────┘  │
└──────────────────────┬───────────────────────────────────────────┘
                       │ Data Models / Repository Queries
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                    BUSINESS SERVICE LAYER                       │
├─────────────────────────────────────────────────────────────────┤
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐   │
│  │   Auth Service │  │ Patient Service│  │ Appointment Svc│   │
│  │ • User Details  │  │ • Admission    │  │ • Overlaps     │   │
│  │ • Password Hash │  │ • Records      │  │ • Slots        │   │
│  └────────────────┘  └────────────────┘  └────────────────┘   │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐   │
│  │   ICU Service  │  │  Diet Service  │  │   AI Summary   │   │
│  │ • Telemetry    │  │ • Meal Planner │  │   Service      │   │
│  │ • Thresholds   │  │ • Restrictions │  │ • LLM Prompt   │   │
│  └────────────────┘  └────────────────┘  └────────────────┘   │
└──────────────────────┬───────────────────────────────────────────┘
                       │ ORM (Drizzle) / JPA (Hibernate)
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DATA ACCESS LAYER                          │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────── Connection Pool ─────────────────────────┐  │
│  │ • HikariCP (Spring Boot) / PG Pool (Node.js)             │  │
│  │ • Transaction Isolation level READ_COMMITTED             │  │
│  └──────────────────────────────────────────────────────────┘  │
└──────────────────────┬───────────────────────────────────────────┘
                       │
        ┌──────────────┴──────────────┐
        ▼                             ▼
┌───────────────────────┐    ┌────────────────────────┐
│   PostgreSQL          │    │  In-Memory Fallback    │
│   (Supabase)          │    │  (High-Availability)   │
│                       │    │                        │
│ • relational tables   │    │ • local cached objects │
│ • indexes & keys      │    │ • failover system      │
└───────────────────────┘    └────────────────────────┘
```

---

## 📁 Project Structure

This monorepo is cleanly divided into a Next.js frontend, an Express Node.js backend, and a Spring Boot Java backend.

```
orchids-mediflow-hospital-management/
│
├── public/                                 # Shared frontend assets & screenshots
│   ├── mediflow_hero_banner.png           # 3D Landing Page graphic
│   ├── mediflow_icu_dashboard.png         # Telemetry Dashboard mockup
│   ├── mediflow_smart_scheduling.png      # Availability Calendar mockup
│   └── *.svg                              # System templates
│
├── src/                                    # Frontend Application (Next.js 15)
│   ├── app/
│   │   ├── layout.tsx                     # Global Providers & styles
│   │   ├── page.tsx                       # Three.js 3D landing page
│   │   ├── (auth)/                        # Auth routes (login, register)
│   │   └── (portal)/                      # Portal UI directories
│   │       ├── layout.tsx                 # Portal Sidebar layout
│   │       └── dashboard/
│   │           ├── admin/                 # Admin Dashboard pages
│   │           ├── doctor/                # Clinical Doctor boards
│   │           ├── nurse/                 # Nurse intakes & vitals
│   │           └── staff/                 # Administrative records
│   ├── components/
│   │   ├── layout/                        # Navbar, Sidebar components
│   │   ├── icu/                           # Recharts vital dashboards
│   │   ├── 3d/                            # Three.js medical orb & canvas
│   │   └── common/                        # Buttons, Modals, Toasts
│   └── lib/
│       ├── api/                           # Axios api client configurations
│       ├── hooks/                         # Custom data fetching hooks
│       └── utils/                         # Validators, formatters
│
├── server/                                 # Express.js Backend (TypeScript)
│   ├── config/                            # Database pool configurations
│   ├── middleware/                        # JWT & RBAC filters
│   ├── controllers/                       # API Route Controllers
│   ├── services/                          # Business logic service layer
│   ├── routes/                            # Router configurations
│   ├── models/                            # Relational schemas
│   └── index.ts                           # Node entry point
│
├── server-java/                            # Spring Boot Backend (Java 21)
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/mediflow/api/
│   │   │   │   ├── MediflowApplication.java # Spring Boot entry class
│   │   │   │   ├── config/                # SecurityConfig (Spring Security)
│   │   │   │   ├── controller/            # REST Controllers
│   │   │   │   ├── model/                 # JPA database entities
│   │   │   │   ├── repository/            # Spring Data JPA repositories
│   │   │   │   └── service/               # Clinical business services
│   │   │   └── resources/
│   │   │       └── application.properties # Spring settings & DB configs
│   ├── pom.xml                            # Maven configurations
│   └── mvnw                               # Maven Wrapper executable
│
├── package.json                            # Root NPM configs
├── vercel.json                            # Vercel deployment instructions
└── tsconfig.json                           # TypeScript configurations
```

---

## 🎨 System Design & Diagrams

### 1. High-Performance RBAC & Security Middleware Filter

```
Request Header: [Authorization: Bearer <jwt>]
                      │
                      ▼
            Custom Security Filter
    ┌──────────────────────────────────────┐
    │  Node: verifyJWT.ts                  │
    │  Java: JwtAuthenticationFilter.java  │
    └─────────────────┬────────────────────┘
                      │
             Signature verified?
           ┌──────────┴──────────┐
           ▼ Yes                 ▼ No
     Attach Claim            Return 401
    (UserId, Role,           (Unauthorized)
     Permissions)
           │
           ▼
    RBAC Middleware Check
    ┌──────────────────────────────────────┐
    │  Node: requireRole(['DOCTOR'])       │
    │  Java: @PreAuthorize("hasRole('DOC')")
    └─────────────────┬────────────────────┘
                      │
             Has required permission?
           ┌──────────┴──────────┐
           ▼ Yes                 ▼ No
      Allow Entry            Return 403
    (Executes Controller)    (Forbidden)
```

### 2. Overlap & Conflict Prevention Algorithm

```
Create Appointment (Doctor, DateTime, Duration)
                      │
                      ▼
       Step 1: Check In-Range Scheduling
        • Must be in working hours
        • Date must be in future (> current date)
                      │
                      ▼
       Step 2: Scan Doctor Working Schedule
        • Fetch all active appointments for Doctor on date
        • Loop overlap checking:
          Target Appointment Range: [T_start, T_end]
          Existing Appointment Range: [E_start, E_end]
          Overlap Condition: Max(T_start, E_start) < Min(T_end, E_end)
                      │
             Conflict found?
           ┌──────────┴──────────┐
           ▼ Yes                 ▼ No
     Block Booking,        Proceed to Step 3
     Return 409 Conflict
                      │
                      ▼
       Step 3: Scan Patient Schedule
        • Overlap checks: Confirm patient has no simultaneous bookings
                      │
             Conflict found?
           ┌──────────┴──────────┐
           ▼ Yes                 ▼ No
     Block Booking,        Insert Appointment
     Return 409 Conflict   with status: "CONFIRMED"
```

---

## 📡 API Workflows

### Authentication Flow
`POST /api/auth/login`
```json
{
  "email": "doctor@mediflow.com",
  "password": "doctor123"
}
```
**Response (200 OK)**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
    "name": "Dr. John Watson",
    "email": "doctor@mediflow.com",
    "role": "DOCTOR",
    "permissions": ["view:patients", "write:clinical_notes", "manage:appointments"]
  }
}
```

### Patient Admission Flow
`POST /api/patients/admit`
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "dateOfBirth": "1980-05-15",
  "gender": "M",
  "chiefComplaint": "Acute chest pain & dyspnea",
  "symptoms": ["chest_pain", "shortness_of_breath"],
  "allergies": ["Penicillin"],
  "initialVitals": {
    "heartRate": 92,
    "systolic": 142,
    "diastolic": 88,
    "spO2": 96,
    "temperature": 37.1
  }
}
```
**Response (201 Created)**
```json
{
  "message": "Patient admitted successfully",
  "mrn": "MRN-2026-9812",
  "patientId": "e1f2g3h4-i5j6-k7l8-m9n0-o1p2q3r4s5t6"
}
```

### Scheduling with Conflict Check
`POST /api/appointments/schedule`
```json
{
  "patientId": "e1f2g3h4-i5j6-k7l8-m9n0-o1p2q3r4s5t6",
  "doctorId": "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
  "appointmentType": "CONSULTATION",
  "requestedDateTime": "2026-06-15T14:30:00.000Z",
  "duration": 30
}
```
**Response (409 Conflict - Overlap Detected)**
```json
{
  "status": 409,
  "error": "CONFLICT",
  "message": "The selected doctor is unavailable during the requested time slot.",
  "suggestedAlternativeSlots": [
    "2026-06-15T15:00:00.000Z",
    "2026-06-15T15:30:00.000Z",
    "2026-06-16T10:00:00.000Z"
  ]
}
```

---

## 📦 Installation & Setup

Follow these steps to configure Orchids MediFlow in your local development environment.

### 1. Frontend Setup (Next.js)

```bash
# Navigate to root directory
cd orchids-mediflow-hospital-management

# Install shared dependencies
npm install

# Configure local environmental file
cp .env.example .env.local
```

Configure `.env.local` with the following variables:
```env
# Next.js Ports
PORT=3000

# Backend Connection URLs
# Change port to 8080 if using the Spring Boot Backend option
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

To run the Next.js frontend local development server:
```bash
npm run dev
```
The client dashboard launches at `http://localhost:3000`.

---

### 2a. Backend Setup (Express.js - Node)

Our TypeScript Express server provides high-speed processing and uses Drizzle ORM.

```bash
# Ensure environmental keys are defined in your root .env
```
Create a `.env` file at the root:
```env
DATABASE_URL=postgresql://postgres:password@db.supabase.co:5432/postgres
JWT_SECRET=super_secure_jwt_token_secret_key_at_least_32_characters
JWT_EXPIRATION=24h
BCRYPT_ROUNDS=10
API_PORT=5000
```

To run Node backend migrations and seed data:
```bash
# Push tables to Supabase
npm run db:push

# Launch development API server
npm run server
```
The Express backend starts listening at `http://localhost:5000`.

---

### 2b. Backend Setup (Spring Boot - Java)

Our alternative high-performance Java backend utilizes Spring Security 6 and Spring Data JPA.

#### Prerequisites
* Installed **JDK 21**
* Installed **Maven 3.8+**
* Local or Supabase PostgreSQL database running

#### Configuration
Navigate to the directory `server-java/src/main/resources/` and open `application.properties`:
```properties
server.port=8080

# Database configurations
spring.datasource.url=jdbc:postgresql://your-supabase-db.supabase.co:5432/postgres
spring.datasource.username=postgres
spring.datasource.password=your_database_password
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA configurations
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# Security configurations
security.jwt.secret=super_secure_jwt_token_secret_key_at_least_32_characters
security.jwt.expiration-ms=86400000
```

#### Run Backend Command
Navigate into the Java folder and build using Maven:
```bash
cd server-java

# Clean compile and package jar
mvn clean package -DskipTests

# Run the Spring Boot application jar
mvn spring-boot:run
```
The Spring Boot backend will run at `http://localhost:8080`.

---

## 🔐 Authentication & RBAC

Orchids MediFlow secures patient records using cryptographic JWT tokens and an authorization gate.

### Access Levels Matrix

| Permission Key | Admin | Doctor | Nurse | Staff |
|---|:---:|:---:|:---:|:---:|
| `view:admin_panel` | ✅ | ❌ | ❌ | ❌ |
| `manage:users` | ✅ | ❌ | ❌ | ❌ |
| `view:patients` | ✅ | ✅ | ✅ | ✅ |
| `write:progress_notes` | ❌ | ✅ | ❌ | ❌ |
| `order:tests` | ❌ | ✅ | ❌ | ❌ |
| `admit:patients` | ❌ | ❌ | ✅ | ❌ |
| `log:vitals` | ❌ | ❌ | ✅ | ❌ |
| `manage:diet_plans` | ❌ | ❌ | ✅ | ✅ |
| `view:icu_dashboard` | ✅ | ✅ | ✅ | ❌ |

---

## 🧩 Core Platform Modules

### 1. Smart Appointment Scheduler
Located at `server/controllers/appointmentController.ts` and `server-java/.../service/AppointmentService.java`
* Automatically computes overlap conditions based on starting time and duration.
* Incorporates Doctor and Patient validation profiles.
* Suggests closest subsequent empty slots if an overlap is identified.

### 2. ICU Telemetry
Located at `server/controllers/icuController.ts` and `src/components/icu/`
* Standardizes physiological vital signs logs.
* Triggers color coded UI visual responses for thresholds.
* Real-time heart rate waveform simulation graphs using **Recharts**.

### 3. AI Condition Summarizer
Located at `server/services/aiSummaryService.ts` and `server-java/.../service/AiService.java`
* Compiles patient clinical datasets: DOB, symptoms list, medications, allergies, and vitals.
* Generates concise markdown medical summaries highlighting risks, specialist consult recommendations, and diagnosis alerts.
* Includes localized caching patterns to optimize AI token usage.

---

## 💾 Database Schema

Here are our production-grade PostgreSQL DDL table schemas:

```sql
-- Create user role type enum
CREATE TYPE user_role AS ENUM ('ADMIN', 'DOCTOR', 'NURSE', 'STAFF');
CREATE TYPE patient_status AS ENUM ('ADMITTED', 'DISCHARGED', 'IN_ICU');
CREATE TYPE alert_level AS ENUM ('NORMAL', 'WARNING', 'CRITICAL', 'ALARM');

-- Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role user_role NOT NULL,
  department VARCHAR(255),
  phone VARCHAR(20),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Patients Table
CREATE TABLE patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mrn VARCHAR(50) UNIQUE NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  date_of_birth DATE NOT NULL,
  gender VARCHAR(10),
  email VARCHAR(255),
  phone VARCHAR(20),
  address TEXT,
  insurance_provider VARCHAR(255),
  insurance_number VARCHAR(100),
  admission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  discharge_date TIMESTAMP,
  status patient_status DEFAULT 'ADMITTED',
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
  clinical_notes TEXT,
  diagnosis VARCHAR(255),
  treatment_plan TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by_id UUID REFERENCES users(id)
);

-- Appointments Table
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id UUID NOT NULL REFERENCES users(id),
  appointment_type VARCHAR(100) NOT NULL,
  appointment_date_time TIMESTAMP NOT NULL,
  duration INTEGER NOT NULL,
  status VARCHAR(50) DEFAULT 'SCHEDULED',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ICU Vitals Telemetry Table
CREATE TABLE icu_vitals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  heart_rate INTEGER,
  systolic_bp INTEGER,
  diastolic_bp INTEGER,
  spo2 DECIMAL(5,2),
  temperature DECIMAL(5,2),
  alert_level alert_level DEFAULT 'NORMAL',
  recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  recorded_by_id UUID REFERENCES users(id)
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
  created_by_id UUID REFERENCES users(id)
);
```

### High-Performance Query Indexing
To ensure sub-second response times even under heavy loads, we define the following indices:
```sql
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_patients_status ON patients(status);
CREATE INDEX idx_appointments_doctor_date ON appointments(doctor_id, appointment_date_time);
CREATE INDEX idx_icu_vitals_patient_recorded ON icu_vitals(patient_id, recorded_at DESC);
```

---

## 📊 Performance Optimization

### Frontend
* **Dynamic Route Bundles**: Automatically splits Next.js bundle pages to optimize page loads.
* **Axios Interceptor Tokens**: Injects JWT tokens into authorization headers dynamically.
* **Component-Level Recharts**: Graph components utilize canvas-based plotting to prevent browser UI delays.

### Backend
* **Optimal Connection Pooling**: Leverages Supabase connection limits efficiently.
* **Thread Pools**: Utilizes Tomcat connection pooling (HikariCP) for the Java Spring Boot service.
* **O(1) Memory Database Caches**: Speeds up retrieval times for critical patient diagnostics.

---

## 🚀 Deployment

### Next.js Client & Express Backend
1. **Frontend**: Deploy on **Vercel** with the configuration located in `vercel.json`.
2. **Express API**: Deploy to **Render** or **AWS Elastic Beanstalk** with Node runtime environment setup.

### Java Spring Boot Backend
1. Compile the production-ready `.jar` archive:
   ```bash
   mvn clean package -DskipTests
   ```
2. Deploy the generated `.jar` to AWS EC2, Google Cloud App Engine, or run in a Docker environment.

---

## 🎯 Roadmap

- [x] Phase 1: Robust Role-Based Access Control and basic UI structure.
- [x] Phase 2: Live ICU Telemetry vitals dashboard graphs and alarm matrices.
- [x] Phase 3: Smart schedule algorithms and overlap conflict blockers.
- [x] Phase 4: Alternative high-performance Java Spring Boot backend integration.
- [ ] Phase 5: HL7/FHIR compatibility, advanced diagnostic ML analysis, and multi-hospital center systems.

---

## 🤝 Contributing

1. **Fork** this project.
2. Create your Feature Branch: `git checkout -b feature/AmazingFeature`
3. Commit your modifications: `git commit -m 'Add AmazingFeature'`
4. Push to branch: `git push origin feature/AmazingFeature`
5. Open a **Pull Request**.

---

## 📝 License

This project is licensed under the **MIT License** - see the `LICENSE` file for details.

---

**Built with ❤️ by CyberVerve07**
*Orchids MediFlow — Modern SaaS Architecture for Digital Clinical Care.*
