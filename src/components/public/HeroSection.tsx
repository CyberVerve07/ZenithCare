'use client';

import Link from 'next/link';
import { ArrowRight, Calendar, ChevronRight, Activity, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const ThreeCanvas = dynamic(() => import('@/components/ThreeCanvas'), { ssr: false });

const stats = [
  { value: '50+', label: 'Expert Doctors' },
  { value: '20K+', label: 'Patients Treated' },
  { value: '24/7', label: 'Emergency Care' },
  { value: '15+', label: 'Departments' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#F8FAFC]">
      {/* Background patterns */}
      <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-blue-150/40 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-150/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="container-xl mx-auto px-4 py-16 lg:py-24 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column */}
          <motion.div 
            className="space-y-8 max-w-xl lg:col-span-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2.5 px-4 py-2 bg-blue-50 border border-blue-100/80 rounded-full text-blue-700 text-sm font-semibold shadow-sm">
              <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse" />
              NABH Accredited · Serving Since 2010
            </motion.div>

            <div className="space-y-4">
              <motion.h1 
                variants={itemVariants} 
                className="text-5xl md:text-6xl xl:text-7xl font-black text-[#0F172A] leading-[1.05] tracking-tight"
              >
                Smart Healthcare<br />for Modern<br />
                <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">Hospitals</span>
              </motion.h1>
              <motion.p 
                variants={itemVariants} 
                className="text-lg text-slate-500 leading-relaxed max-w-md"
              >
                Secure, scalable, AI-powered healthcare management platform trusted by 20,000+ patients.
              </motion.p>
            </div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <Link
                href="/#appointment"
                className="inline-flex items-center gap-2.5 px-7 py-4 bg-gradient-to-r from-blue-600 to-blue-750 text-white font-extrabold rounded-2xl hover:from-blue-750 hover:to-blue-800 transition-all shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 hover:-translate-y-0.5 group"
              >
                <Calendar size={18} />
                Book Appointment
                <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-200" />
              </Link>
              <Link
                href="/departments"
                className="inline-flex items-center gap-2.5 px-7 py-4 bg-white text-[#0F172A] font-extrabold rounded-2xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 hover:text-blue-700 transition-all shadow-sm hover:-translate-y-0.5 group"
              >
                Explore Departments
                <ChevronRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-200" />
              </Link>
            </motion.div>

            <motion.div 
              variants={itemVariants} 
              className="grid grid-cols-4 gap-4 pt-6 border-t border-slate-200/80"
            >
              {stats.map((s) => (
                <div key={s.label} className="group">
                  <div className="text-2xl md:text-3xl font-black text-[#0F172A] group-hover:text-blue-600 transition-colors duration-200">{s.value}</div>
                  <div className="text-[11px] text-slate-500 font-bold mt-0.5 uppercase tracking-wide">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column: Dashboard Mockup + 3D ThreeCanvas */}
          <div className="relative hidden lg:block lg:col-span-6 h-[500px]">
            {/* Interactive 3D Medical Fluid/Organ representation */}
            <div className="absolute -left-20 -top-16 w-80 h-80 z-0 opacity-90 pointer-events-auto mix-blend-multiply filter blur-sm">
              <ThreeCanvas />
            </div>

            <div className="absolute -right-10 bottom-4 w-72 h-72 z-0 opacity-80 pointer-events-auto filter blur-xs">
              <ThreeCanvas />
            </div>

            {/* Glowing blur background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-200/20 to-teal-200/20 rounded-3xl blur-3xl scale-110 -z-10" />
            
            {/* Floating Card Mockup */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.96, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-slate-150/70 p-7 z-10 hover:shadow-3xl hover:border-slate-200 transition-all duration-500 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">Hospital Analytics</p>
                  <p className="text-xl font-black text-[#0F172A]">Real-Time Telemetry</p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 rounded-full border border-emerald-100">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                  <span className="text-[11px] text-emerald-700 font-bold tracking-wide uppercase">Live</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3.5 mb-6">
                {[
                  { label: 'OPD Today', val: '124', color: 'bg-blue-50 border border-blue-100/50 text-blue-700' },
                  { label: 'In-Patients', val: '48', color: 'bg-teal-50 border border-teal-100/50 text-teal-700' },
                  { label: 'Surgeries', val: '7', color: 'bg-violet-50 border border-violet-100/50 text-violet-700' },
                ].map((m) => (
                  <div key={m.label} className={`${m.color} rounded-2xl p-3.5 text-center shadow-sm hover:scale-105 transition-transform duration-300`}>
                    <p className="text-2xl font-black tracking-tight">{m.val}</p>
                    <p className="text-[10px] font-bold mt-1 opacity-90 uppercase tracking-wider">{m.label}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6">
                <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Weekly Patient Flow</p>
                <div className="flex items-end gap-2.5 h-16 pt-2">
                  {[60, 85, 45, 90, 70, 95, 75].map((h, i) => (
                    <div key={i} className={`flex-1 rounded-t-lg transition-all duration-500 hover:opacity-90 ${i === 5 ? 'bg-gradient-to-t from-blue-600 to-indigo-500' : 'bg-blue-100/80'}`} style={{ height: `${h}%` }} />
                  ))}
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                    <span key={i} className={`flex-1 text-center ${i === 5 ? 'text-blue-600 font-extrabold' : ''}`}>{d}</span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center gap-3">
                <div className="flex -space-x-2.5">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="w-8.5 h-8.5 rounded-full bg-gradient-to-br from-blue-500 to-teal-400 border-2 border-white flex items-center justify-center text-xs font-black text-white shadow-sm">
                      {['JW', 'SC', 'MK'][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">12 Doctors Available</p>
                  <p className="text-[10px] text-slate-400 font-medium">Now accepting appointments</p>
                </div>
                <span className="ml-auto text-[9px] bg-emerald-100 text-emerald-700 font-bold px-2 py-1 rounded-full uppercase tracking-wider">Active</span>
              </div>
            </motion.div>

            {/* Floating Badges */}
            <motion.div 
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-slate-100 p-3.5 flex items-center gap-3 z-20 hover:scale-105 transition-all duration-300"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-650 flex items-center justify-center shadow-md">
                <Activity size={16} className="text-white animate-pulse" />
              </div>
              <div>
                <p className="text-xs font-extrabold text-[#0F172A]">ICU Monitoring</p>
                <p className="text-[9px] text-slate-400 font-bold">Vitals fully stable</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-slate-100 p-3.5 flex items-center gap-3 z-20 hover:scale-105 transition-all duration-300"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center shadow-md">
                <Shield size={16} className="text-white" />
              </div>
              <div>
                <p className="text-xs font-extrabold text-[#0F172A]">NABH Certified</p>
                <p className="text-[9px] text-slate-400 font-bold">ISO 9001:2015 Quality</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
