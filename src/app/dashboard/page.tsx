'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import api from '@/lib/api';
import { 
  Users, 
  Calendar, 
  Activity, 
  Utensils, 
  AlertTriangle, 
  Clock, 
  ChevronRight,
  ArrowRight,
  UserPlus,
  Shield,
  HeartHandshake
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardOverview() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    activeAdmissions: 0,
    scheduledAppointments: 0,
    icuOccupancy: 0,
    dietPlans: 0,
  });
  const [recentAdmissions, setRecentAdmissions] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch all datasets in parallel to build real-time stats
        const [admissionsRes, appointmentsRes, icuRes, dietRes] = await Promise.all([
          api.get('/admissions').catch(() => ({ data: [] })),
          api.get('/appointments').catch(() => ({ data: [] })),
          api.get('/icu').catch(() => ({ data: [] })),
          api.get('/diet').catch(() => ({ data: [] })),
        ]);

        const admissions = admissionsRes.data || [];
        const appointments = appointmentsRes.data || [];
        const icu = icuRes.data || [];
        const diets = dietRes.data || [];

        setStats({
          activeAdmissions: admissions.filter((a: any) => a.status === 'Admitted').length || admissions.length,
          scheduledAppointments: appointments.length,
          icuOccupancy: icu.length,
          dietPlans: diets.length,
        });

        // Set top 3 recent admissions & scheduled appointments
        setRecentAdmissions(admissions.slice(0, 3));
        setUpcomingAppointments(appointments.slice(0, 3));
      } catch (err) {
        console.error('Failed to load dashboard telemetry:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const cardData = [
    {
      title: 'Active Admissions',
      value: stats.activeAdmissions,
      desc: 'In-patient wards',
      icon: Users,
      color: 'text-blue-600 bg-blue-50 border-blue-100',
      href: '/dashboard/patients',
    },
    {
      title: 'Appointments Today',
      value: stats.scheduledAppointments,
      desc: 'Scheduled OPD slots',
      icon: Calendar,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
      href: '/dashboard/appointments',
    },
    {
      title: 'ICU Critical Care',
      value: stats.icuOccupancy,
      desc: 'Active telemetry beds',
      icon: Activity,
      color: 'text-red-600 bg-red-50 border-red-100',
      href: '/dashboard/icu',
      roles: ['Doctor', 'Admin'],
    },
    {
      title: 'Assigned Diet Plans',
      value: stats.dietPlans,
      desc: 'Daily recovery meals',
      icon: Utensils,
      color: 'text-amber-600 bg-amber-50 border-amber-100',
      href: '/dashboard/diet',
    },
  ];

  if (!user) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Dynamic Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 translate-x-10 -translate-y-10 scale-150 pointer-events-none">
          <Activity size={300} />
        </div>
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold uppercase tracking-wider text-blue-100">
            <Shield size={12} />
            Secure Session • {user.role}
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Welcome back, {user.name}
          </h1>
          <p className="text-blue-100 max-w-xl text-sm md:text-base">
            Your clinical workstation is active. You have real-time overview telemetry and complete control over the hospital status dashboard.
          </p>
        </div>
        <div className="flex items-center gap-3 relative z-10">
          <Link
            href="/dashboard/patients"
            className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-700 shadow-md hover:bg-slate-50 transition duration-300 transform hover:scale-[1.02]"
          >
            <UserPlus size={16} />
            Admit Patient
          </Link>
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cardData
          .filter(card => !card.roles || card.roles.includes(user.role))
          .map((card, idx) => {
            const Icon = card.icon;
            return (
              <Link
                key={idx}
                href={card.href}
                className="group relative block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition duration-300 hover:border-slate-300"
              >
                <div className="flex items-center justify-between">
                  <div className={`rounded-xl border p-3 ${card.color}`}>
                    <Icon size={22} />
                  </div>
                  <span className="text-xs text-slate-400 group-hover:text-blue-600 transition flex items-center gap-1 font-semibold">
                    View Details
                    <ChevronRight size={14} className="group-hover:translate-x-0.5 transition" />
                  </span>
                </div>
                <div className="mt-4">
                  <span className="text-3xl font-extrabold tracking-tight text-slate-900">
                    {loading ? (
                      <span className="inline-block h-8 w-12 animate-pulse bg-slate-200 rounded-md" />
                    ) : (
                      card.value
                    )}
                  </span>
                  <h3 className="mt-1 text-sm font-bold text-slate-900 group-hover:text-blue-600 transition">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-500">{card.desc}</p>
                </div>
              </Link>
            );
          })}
      </div>

      {/* Main Content Layout */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column: Recent Patients & Alerts */}
        <div className="lg:col-span-2 space-y-8">
          {/* Recent Admissions Card */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="flex items-center justify-between bg-slate-50 px-6 py-4 border-b border-slate-100">
              <h2 className="font-bold text-slate-900 flex items-center gap-2">
                <HeartHandshake className="text-blue-600" size={18} />
                Recent In-Patient Admissions
              </h2>
              <Link href="/dashboard/patients" className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-0.5">
                All Admissions
                <ArrowRight size={12} />
              </Link>
            </div>
            <div className="divide-y divide-slate-100">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="p-6 space-y-2 animate-pulse">
                    <div className="h-4 bg-slate-200 rounded w-1/3" />
                    <div className="h-3 bg-slate-150 rounded w-1/2" />
                  </div>
                ))
              ) : recentAdmissions.length === 0 ? (
                <div className="p-8 text-center text-slate-500">No active admissions records found.</div>
              ) : (
                recentAdmissions.map((ad: any) => (
                  <div key={ad.id} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition">
                    <div className="space-y-1">
                      <p className="font-bold text-slate-900">{ad.patient_name}</p>
                      <p className="text-xs text-slate-500 flex items-center gap-2">
                        <span>Age {ad.age || 30} • {ad.gender || 'Male'}</span>
                        <span className="inline-block h-1 w-1 rounded-full bg-slate-300" />
                        <span>Bed {ad.bed_number}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        ad.current_condition === 'Critical' ? 'bg-red-50 text-red-700' :
                        ad.current_condition === 'Stable' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'
                      }`}>
                        {ad.current_condition || 'Stable'}
                      </span>
                      <Link href="/dashboard/patients" className="text-slate-400 hover:text-blue-600 transition">
                        <ChevronRight size={18} />
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Clinician Quick Alert widget */}
          <div className="rounded-2xl border border-red-100 bg-red-50/30 p-6 flex gap-4 relative overflow-hidden">
            <div className="absolute right-0 bottom-0 translate-y-3 translate-x-3 opacity-5 text-red-900 scale-125">
              <AlertTriangle size={150} />
            </div>
            <div className="rounded-xl bg-red-50 border border-red-100 p-3 h-fit text-red-600">
              <AlertTriangle size={20} />
            </div>
            <div className="space-y-1.5 relative z-10">
              <h4 className="font-bold text-red-950">Patient Vitals Alert • Room ICU-02</h4>
              <p className="text-xs text-red-800 leading-relaxed max-w-xl">
                Patient <strong>Robert Johnson</strong> has critical heart telemetry markers (Pulse: 105 bpm, SpO2: 91%). Ensure the attending cardiologist has reviewed the daily diagnostics.
              </p>
              <div className="pt-2">
                <Link href="/dashboard/icu" className="text-xs font-bold text-red-700 hover:underline flex items-center gap-0.5">
                  Enter ICU Telemetry View
                  <ChevronRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Upcoming Appointments Schedule */}
        <div className="space-y-8">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col h-full">
            <div className="flex items-center justify-between bg-slate-50 px-6 py-4 border-b border-slate-100">
              <h2 className="font-bold text-slate-900 flex items-center gap-2">
                <Clock className="text-emerald-600" size={18} />
                OPD Schedule (Today)
              </h2>
              <Link href="/dashboard/appointments" className="text-xs font-semibold text-emerald-600 hover:underline">
                View Calendar
              </Link>
            </div>
            
            <div className="divide-y divide-slate-100 flex-1">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="p-6 space-y-2 animate-pulse">
                    <div className="h-4 bg-slate-100 rounded w-2/3" />
                    <div className="h-3 bg-slate-50 rounded w-1/2" />
                  </div>
                ))
              ) : upcomingAppointments.length === 0 ? (
                <div className="p-12 text-center text-slate-500 flex flex-col items-center justify-center gap-2">
                  <Calendar size={32} className="text-slate-300" />
                  <p className="text-sm font-medium">No appointments remaining today.</p>
                </div>
              ) : (
                upcomingAppointments.map((app: any) => (
                  <div key={app.id} className="p-6 hover:bg-slate-50/50 transition space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        <Clock size={12} />
                        {app.appointment_time}
                      </span>
                      <span className="text-xs text-slate-400 font-semibold">{app.status}</span>
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{app.patient_name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">Assigned: Dr. {app.doctor_name}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <div className="bg-slate-50 border-t border-slate-100 p-4 text-center">
              <Link 
                href="/dashboard/appointments" 
                className="inline-flex items-center justify-center gap-1 text-xs font-bold text-slate-700 hover:text-blue-600 transition"
              >
                Schedule New Appointment slot
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
