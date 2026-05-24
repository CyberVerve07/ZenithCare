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
  HeartHandshake,
  Sparkles,
  TrendingUp,
  Cpu,
  RefreshCw,
  Layers,
  Database
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

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
  
  // Real-time simulated telemetry vitals for the dashboard header/telemetry widget
  const [telemetryState, setTelemetryState] = useState({
    latency: '18ms',
    uptime: '99.98%',
    syncStatus: 'Synced',
    clinicalAlerts: 1,
    activeSensors: 42
  });

  // Simulated live fluctuating sparkline graph values (representing patient admission trends)
  const sparklineData = [24, 30, 26, 45, 38, 52, 60, 48, 55, 68, 72, 85];
  const [liveVitalsRate, setLiveVitalsRate] = useState(72);

  useEffect(() => {
    // Fluctuating vitals rate simulation
    const vitalsInterval = setInterval(() => {
      setLiveVitalsRate(prev => {
        const delta = Math.floor(Math.random() * 5) - 2;
        const next = prev + delta;
        return next > 90 ? 88 : next < 60 ? 65 : next;
      });
      
      // Fluctuating telemetry simulation
      setTelemetryState(prev => ({
        ...prev,
        latency: `${Math.floor(Math.random() * 6) + 14}ms`,
        activeSensors: Math.floor(Math.random() * 4) + 40
      }));
    }, 4000);

    return () => clearInterval(vitalsInterval);
  }, []);

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

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const cardData = [
    {
      title: 'Active Admissions',
      value: stats.activeAdmissions,
      desc: 'In-patient wards',
      icon: Users,
      color: 'text-blue-600 bg-blue-500/10 border-blue-500/20',
      glow: 'shadow-blue-500/5 hover:border-blue-500/40',
      href: '/dashboard/patients',
    },
    {
      title: 'Appointments Today',
      value: stats.scheduledAppointments,
      desc: 'Scheduled OPD slots',
      icon: Calendar,
      color: 'text-emerald-600 bg-emerald-500/10 border-emerald-500/20',
      glow: 'shadow-emerald-500/5 hover:border-emerald-500/40',
      href: '/dashboard/appointments',
    },
    {
      title: 'ICU Critical Care',
      value: stats.icuOccupancy,
      desc: 'Active telemetry beds',
      icon: Activity,
      color: 'text-red-600 bg-red-500/10 border-red-500/20',
      glow: 'shadow-red-500/5 hover:border-red-500/40',
      href: '/dashboard/icu',
      roles: ['Doctor', 'Admin'],
    },
    {
      title: 'Assigned Diet Plans',
      value: stats.dietPlans,
      desc: 'Daily recovery meals',
      icon: Utensils,
      color: 'text-amber-600 bg-amber-500/10 border-amber-500/20',
      glow: 'shadow-amber-500/5 hover:border-amber-500/40',
      href: '/dashboard/diet',
    },
  ];

  if (!user) return null;

  // SVG grid sparkline calculation helper
  const maxVal = Math.max(...sparklineData);
  const minVal = Math.min(...sparklineData);
  const points = sparklineData.map((val, index) => {
    const x = (index / (sparklineData.length - 1)) * 100;
    const y = 90 - ((val - minVal) / (maxVal - minVal)) * 60;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Header with custom gradient and interactive mesh elements */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 rounded-[2.5rem] p-8 md:p-10 text-white shadow-2xl relative overflow-hidden border border-white/10"
      >
        {/* Abstract 3D pulse wave background pattern */}
        <div className="absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 1000 300" preserveAspectRatio="none">
            <path d="M0,150 Q150,50 300,150 T600,150 T900,100 T1000,150" fill="none" stroke="url(#wave-grad)" strokeWidth="6" className="animate-[pulse_4s_infinite]" />
            <defs>
              <linearGradient id="wave-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="absolute right-0 top-0 opacity-5 translate-x-12 -translate-y-12 scale-150 pointer-events-none text-white">
          <Activity size={350} />
        </div>

        <div className="space-y-3.5 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-xl text-xs font-bold uppercase tracking-widest text-cyan-300 border border-white/10 shadow-inner">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <Shield size={12} className="inline mr-0.5" />
            Clinical Terminal • {user.role}
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-none bg-gradient-to-r from-white via-slate-100 to-blue-200 bg-clip-text text-transparent">
            Welcome back, {user.name}
          </h1>
          <p className="text-slate-300 max-w-xl text-sm md:text-base font-medium leading-relaxed">
            Your clinical workstation is active. You have real-time overview telemetry and complete control over the hospital status dashboard.
          </p>
          
          {/* Workstation specs bar */}
          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5 bg-slate-900/60 border border-white/5 rounded-lg px-2.5 py-1">
              <Database size={12} className="text-cyan-400" /> DB Node: <strong className="text-emerald-400">Supabase PG</strong>
            </span>
            <span className="flex items-center gap-1.5 bg-slate-900/60 border border-white/5 rounded-lg px-2.5 py-1">
              <Cpu size={12} className="text-violet-400" /> Latency: <strong className="text-white">{telemetryState.latency}</strong>
            </span>
            <span className="flex items-center gap-1.5 bg-slate-900/60 border border-white/5 rounded-lg px-2.5 py-1">
              <RefreshCw size={12} className="text-amber-400 animate-spin" style={{ animationDuration: '6s' }} /> Sync: <strong className="text-emerald-400">{telemetryState.syncStatus}</strong>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 relative z-10 self-start md:self-center">
          <Link
            href="/dashboard/patients"
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4 text-sm font-bold text-white shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:from-blue-600 hover:to-indigo-700 transition duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <UserPlus size={16} />
            Admit Patient
          </Link>
        </div>
      </motion.div>

      {/* 2. Grid Stats with dynamic hover effects and premium glass overlays */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cardData
          .filter(card => !card.roles || card.roles.includes(user.role))
          .map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
              >
                <Link
                  href={card.href}
                  className={`group relative block rounded-3xl border border-slate-200 bg-white p-6 shadow-sm ${card.glow} transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] overflow-hidden`}
                >
                  {/* Subtle inner card accent background ring */}
                  <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-slate-50 group-hover:scale-150 transition-all duration-500 pointer-events-none" />

                  <div className="flex items-center justify-between relative z-10">
                    <div className={`rounded-2xl border p-3.5 transition duration-300 group-hover:scale-110 ${card.color}`}>
                      <Icon size={22} className="group-hover:rotate-6 transition-all duration-300" />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 group-hover:text-blue-600 transition flex items-center gap-0.5 font-bold">
                      Explore
                      <ChevronRight size={12} className="group-hover:translate-x-1 transition" />
                    </span>
                  </div>

                  <div className="mt-5 relative z-10 space-y-1">
                    <span className="text-4xl font-black tracking-tight text-slate-900">
                      {loading ? (
                        <span className="inline-block h-9 w-16 animate-pulse bg-slate-200 rounded-lg" />
                      ) : (
                        card.value
                      )}
                    </span>
                    <h3 className="text-sm font-extrabold text-slate-800 group-hover:text-blue-600 transition duration-300">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-semibold">{card.desc}</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
      </div>

      {/* 3. Main Content Layout (Glass cards, custom SVG clinical chart, live widgets) */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column: Recent Patients & Analytics Sparkline */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Custom SVG Sparkline Dashboard Chart */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-slate-50/70 px-6 py-5 border-b border-slate-200 gap-4">
              <div>
                <h2 className="font-extrabold text-slate-900 flex items-center gap-2 text-base">
                  <TrendingUp className="text-blue-600 animate-pulse" size={18} />
                  Clinic Admission Flow & Capacity Analytics
                </h2>
                <p className="text-xs text-slate-400 font-semibold">Live 12-day patient ward load factor tracking</p>
              </div>
              
              <div className="flex items-center gap-2 bg-white rounded-xl border border-slate-200 px-3 py-1.5 shadow-sm text-xs font-bold text-slate-600">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                Live Feed Rate: <strong className="text-slate-800 font-mono font-bold">{liveVitalsRate} bpm</strong>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              {/* Telemetry quick values */}
              <div className="grid grid-cols-3 gap-4 border-b border-slate-100 pb-5 text-center">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider">Peak Intake</p>
                  <p className="text-xl font-black text-slate-800 mt-0.5">85 Patients</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider">Median Recovery</p>
                  <p className="text-xl font-black text-slate-800 mt-0.5">4.2 Days</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider">Sensor Matrix</p>
                  <p className="text-xl font-black text-slate-800 mt-0.5">{telemetryState.activeSensors} Node Ports</p>
                </div>
              </div>

              {/* Sparkline Plotting */}
              <div className="relative w-full h-[140px] pt-4">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="20" x2="100" y2="20" stroke="#f1f5f9" strokeWidth="0.5" />
                  <line x1="0" y1="50" x2="100" y2="50" stroke="#f1f5f9" strokeWidth="0.5" />
                  <line x1="0" y1="80" x2="100" y2="80" stroke="#f1f5f9" strokeWidth="0.5" />
                  
                  {/* Gradient Area Fill */}
                  <path
                    d={`M0,100 L0,${sparklineData[0]} ${points.split(' ').map(p => `L${p}`).join(' ')} L100,100 Z`}
                    fill="url(#sparkline-grad)"
                    opacity="0.1"
                  />
                  
                  {/* Plot line */}
                  <polyline
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="2"
                    points={points}
                    className="stroke-[1.5]"
                  />
                  
                  {/* Gradients */}
                  <defs>
                    <linearGradient id="sparkline-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#ffffff" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Recent Admissions Card */}
          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="flex items-center justify-between bg-slate-50/70 px-6 py-5 border-b border-slate-200">
              <h2 className="font-extrabold text-slate-900 flex items-center gap-2 text-base">
                <HeartHandshake className="text-blue-600" size={18} />
                Recent In-Patient Admissions
              </h2>
              <Link href="/dashboard/patients" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-0.5">
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
                <div className="p-8 text-center text-slate-500 font-medium">No active admissions records found.</div>
              ) : (
                recentAdmissions.map((ad: any) => (
                  <div key={ad.id} className="p-6 flex items-center justify-between hover:bg-slate-50/40 transition duration-200">
                    <div className="space-y-1">
                      <p className="font-bold text-slate-900 text-sm">{ad.patient_name}</p>
                      <p className="text-xs text-slate-500 flex items-center gap-2 font-semibold">
                        <span>Age {ad.age || 30} • {ad.gender || 'Male'}</span>
                        <span className="inline-block h-1 w-1 rounded-full bg-slate-300" />
                        <span>Bed {ad.bed_number}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide border ${
                        ad.current_condition === 'Critical' ? 'bg-red-50 text-red-700 border-red-200' :
                        ad.current_condition === 'Stable' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-blue-50 text-blue-700 border-blue-200'
                      }`}>
                        {ad.current_condition || 'Stable'}
                      </span>
                      <Link href="/dashboard/patients" className="text-slate-400 hover:text-blue-600 transition duration-200">
                        <ChevronRight size={18} />
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Clinician Quick Alert widget */}
          <div className="rounded-3xl border border-red-100 bg-gradient-to-br from-red-50/50 via-rose-50/20 to-transparent p-6 flex gap-4 relative overflow-hidden shadow-sm">
            <div className="absolute right-0 bottom-0 translate-y-3 translate-x-3 opacity-5 text-red-900 scale-125">
              <AlertTriangle size={150} />
            </div>
            <div className="rounded-2xl bg-red-100/80 border border-red-200/50 p-3 h-fit text-red-600 shadow-inner">
              <AlertTriangle size={20} className="animate-[bounce_2s_infinite]" />
            </div>
            <div className="space-y-2 relative z-10">
              <h4 className="font-extrabold text-red-950 text-sm flex items-center gap-1.5">
                Critical Alert • Patient Heart Telemetry Room ICU-02
              </h4>
              <p className="text-xs text-red-800 leading-relaxed max-w-xl font-medium">
                Patient <strong>Robert Johnson</strong> has critical heart telemetry markers (Pulse: 105 bpm, SpO2: 91%). Ensure the attending cardiologist has reviewed the daily diagnostics.
              </p>
              <div className="pt-1">
                <Link href="/dashboard/icu" className="text-xs font-extrabold text-red-700 hover:text-red-850 hover:underline flex items-center gap-0.5">
                  Enter ICU Telemetry View
                  <ChevronRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Upcoming Appointments Schedule & Telemetry Node */}
        <div className="space-y-8">
          
          {/* OPD Schedule Card */}
          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col h-full">
            <div className="flex items-center justify-between bg-slate-50/70 px-6 py-5 border-b border-slate-200">
              <h2 className="font-extrabold text-slate-900 flex items-center gap-2 text-base">
                <Clock className="text-emerald-600" size={18} />
                OPD Schedule (Today)
              </h2>
              <Link href="/dashboard/appointments" className="text-xs font-bold text-emerald-600 hover:underline">
                View Calendar
              </Link>
            </div>
            
            <div className="divide-y divide-slate-100 flex-1">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="p-6 space-y-2 animate-pulse">
                    <div className="h-4 bg-slate-150 rounded w-2/3" />
                    <div className="h-3 bg-slate-100 rounded w-1/2" />
                  </div>
                ))
              ) : upcomingAppointments.length === 0 ? (
                <div className="p-12 text-center text-slate-400 flex flex-col items-center justify-center gap-2.5">
                  <Calendar size={36} className="text-slate-300" />
                  <p className="text-xs font-bold">No appointments remaining today.</p>
                </div>
              ) : (
                upcomingAppointments.map((app: any) => (
                  <div key={app.id} className="p-6 hover:bg-slate-50/40 transition duration-200 space-y-3.5">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-lg">
                        <Clock size={12} />
                        {app.appointment_time}
                      </span>
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">{app.status}</span>
                    </div>
                    <div>
                      <p className="font-bold text-slate-950 text-sm">{app.patient_name}</p>
                      <p className="text-xs text-slate-500 font-semibold mt-1">Assigned Clinician: Dr. {app.doctor_name}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <div className="bg-slate-50/70 border-t border-slate-200 p-4 text-center">
              <Link 
                href="/dashboard/appointments" 
                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-slate-700 hover:text-blue-600 transition"
              >
                Schedule New Appointment
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* Interactive AI Advisory mini billboard */}
          <div 
            onClick={() => window.dispatchEvent(new Event('open-ai-chat'))}
            className="group relative cursor-pointer overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 p-6 text-white border border-white/5 shadow-2xl hover:translate-y-[-2px] transition duration-300"
          >
            {/* Shimmer line */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
            <div className="absolute -right-4 -bottom-4 opacity-10 text-white group-hover:rotate-12 transition duration-500">
              <Sparkles size={110} />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="rounded-xl bg-white/10 p-2 border border-white/10 text-amber-300">
                  <Sparkles size={16} className="animate-pulse" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-300">
                  Quick Advising Node
                </span>
              </div>
              <div className="space-y-1">
                <h5 className="font-extrabold text-base leading-snug">Launch Advisory Portal</h5>
                <p className="text-xs text-indigo-200/80 font-medium leading-relaxed">
                  Request diagnostic summaries or formulate daily clinical tasks with your advisory copilot.
                </p>
              </div>
              <div className="w-full py-2.5 rounded-xl bg-white text-indigo-950 font-black text-xs text-center border-t border-white/40 shadow-md group-hover:bg-slate-50 transition duration-200">
                Consult Assistant
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
