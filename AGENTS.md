## Project Summary
A scalable, reliable hospital management web application (SaaS) designed for modern healthcare environments. It features role-based access control, real-time patient tracking, AI-powered summaries, and a high-performance backend.

## Tech Stack
- **Frontend**: Next.js (React), Tailwind CSS, Three.js (Landing Page), Framer Motion, Lucide React
- **Backend**: Node.js, Express
- **Database**: PostgreSQL (via Supabase)
- **Auth**: JWT (JSON Web Tokens) with RBAC
- **Styling**: Tailwind CSS
- **API**: REST

## Architecture
- **Monorepo Structure**: Frontend in `src/`, Backend in `server/`.
- **Backend Patterns**: Controller-Service-Route pattern. Stateless REST API.
- **Frontend Patterns**: Clean component architecture, custom hooks for data fetching, responsive design.

## User Preferences
- Clean enterprise UI for dashboard/internal pages.
- 3D medical-themed landing page.
- Role-based access for Admin, Doctor, Nurse, and Staff.

## Project Guidelines
- Production-ready, modular, and scalable code.
- Optimized for low AI credit usage.
- AI usage restricted to summaries (Patient condition, ICU metrics).
- Strict conflict prevention for appointments.

## Common Patterns
- **RBAC Middleware**: Ensures only authorized roles access specific endpoints.
- **Stateless Backend**: Backend does not store session state, relying on JWT.
- **Real-time Metrics**: ICU and Patient tracking modules use real-time status updates.
