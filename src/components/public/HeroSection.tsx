'use client';

import Link from 'next/link';
import { ArrowRight, Calendar, ChevronRight, Activity, Shield, Heart, Plus, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const ThreeCanvas = dynamic(() => import('@/components/ThreeCanvas'), { ssr: false });

const stats = [
  { value: '50+', label: 'Expert Doctors' },
  { value: '20K+', label: 'Patients Cured' },
  { value: '2.4m', label: 'Avg ER Response' },
  { value: '15+', label: 'Specialist Wards' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
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
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-slate-50 py-16 lg:py-24">
      {/* Subtle background grids and glowing lights */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-primary/5 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="container-xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column */}
          <motion.div 
            className="space-y-8 max-w-xl lg:col-span-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              variants={itemVariants} 
              className="inline-flex items-center gap-2.5 px-4 py-2 bg-brand-primary/5 border border-brand-primary/10 rounded-full text-brand-primary text-xs font-bold shadow-sm"
            >
              <span className="w-2 h-2 bg-brand-primary rounded-full animate-ping" />
              Serving Patients Since 2010 · NABH Accredited
            </motion.div>

            <div className="space-y-4">
              <motion.h1 
                variants={itemVariants} 
                className="text-5xl md:text-6xl xl:text-7.5xl font-black text-[#0F172A] leading-[1.08] tracking-tight font-display"
              >
                Smart Healthcare <br />
                For Modern <br />
                <span className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent">Clinical Wards</span>
              </motion.h1>
              <motion.p 
                variants={itemVariants} 
                className="text-base md:text-lg text-slate-500 leading-relaxed font-sans max-w-md"
              >
                Secure, enterprise-grade hospital management and real-time patient telemetry trusted by over 20,000+ patients.
              </motion.p>
            </div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <Link
                href="/#appointment"
                className="inline-flex items-center gap-2.5 px-7 py-4 bg-brand-primary hover:bg-brand-primary/95 text-white font-extrabold text-sm rounded-[18px] transition-all shadow-lg shadow-brand-primary/20 hover:shadow-xl hover:shadow-brand-primary/35 hover:-translate-y-0.5 group"
              >
                <Calendar size={16} />
                Book Appointment
                <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform duration-200" />
              </Link>
              <Link
                href="/departments"
                className="inline-flex items-center gap-2.5 px-7 py-4 bg-white text-[#0F172A] font-extrabold text-sm rounded-[18px] border border-slate-200 hover:border-brand-primary hover:bg-brand-primary/5 hover:text-brand-primary transition-all shadow-sm hover:-translate-y-0.5 group"
              >
                Explore Wards
                <ChevronRight size={15} className="group-hover:translate-x-1.5 transition-transform duration-200" />
              </Link>
            </motion.div>

            <motion.div 
              variants={itemVariants} 
              className="grid grid-cols-4 gap-4 pt-8 border-t border-slate-200/80"
            >
              {stats.map((s) => (
                <div key={s.label} className="group">
                  <div className="text-2xl md:text-3xl font-black text-[#0F172A] font-display group-hover:text-brand-primary transition-colors duration-200">{s.value}</div>
                  <div className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-wide font-sans">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column: Dashboard Mockup + 3D Canvas */}
          <div className="relative lg:col-span-6 h-[520px] flex items-center justify-center">
            
            {/* Interactive 3D Medical Fluid/Organ representation */}
            <div className="absolute -left-12 -top-12 w-72 h-72 z-0 opacity-70 pointer-events-auto mix-blend-multiply filter blur-[2px]">
              <ThreeCanvas />
            </div>

            <div className="absolute -right-12 bottom-0 w-64 h-64 z-0 opacity-60 pointer-events-auto filter blur-[2px]">
              <ThreeCanvas />
            </div>

            {/* Glowing blur background */}
            <div className="absolute inset-x-8 inset-y-12 bg-gradient-to-br from-brand-primary/10 to-brand-accent/10 rounded-[32px] blur-3xl scale-110 -z-10" />
            
            {/* Floating Card Mockup - Premium Hospital MIS dashboard */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.96, y: 35 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full bg-white/80 backdrop-blur-xl rounded-[28px] shadow-2xl border border-slate-200/60 p-6 z-10 hover:shadow-3xl transition-all duration-500 cursor-pointer overflow-hidden"
            >
              {/* Internal Mockup Header */}
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-150/70">
                <div>
                  <p className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest">Global Telemetry</p>
                  <p className="text-base font-black text-[#0F172A] font-display">Hospital MIS Console</p>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 rounded-full border border-emerald-100">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                  <span className="text-[9px] text-emerald-700 font-extrabold tracking-wide uppercase">Active Sync</span>
                </div>
              </div>

              {/* Stats Widgets */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { label: 'OPD Admissions', val: '148', color: 'bg-brand-primary/5 text-brand-primary border-brand-primary/10' },
                  { label: 'Active Beds', val: '42/45', color: 'bg-brand-accent/5 text-brand-accent border-brand-accent/10' },
                  { label: 'Active Surgeons', val: '12', color: 'bg-violet-50 text-violet-750 border-violet-100' },
                ].map((m) => (
                  <div key={m.label} className={`${m.color} rounded-2xl p-3 text-center border shadow-sm hover:scale-103 transition-transform duration-300`}>
                    <p className="text-xl font-black font-display tracking-tight leading-none">{m.val}</p>
                    <p className="text-[9px] font-bold mt-1.5 opacity-90 uppercase tracking-wider leading-tight">{m.label}</p>
                  </div>
                ))}
              </div>

              {/* Graphic Flow */}
              <div className="space-y-2 mb-5">
                <p className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">Inpatient Intake Curve</p>
                <div className="flex items-end gap-2.5 h-14 pt-2">
                  {[45, 80, 50, 90, 75, 95, 60].map((h, i) => (
                    <div key={i} className={`flex-1 rounded-t-md transition-all duration-500 ${i === 5 ? 'bg-gradient-to-t from-brand-primary to-brand-secondary' : 'bg-slate-100'}`} style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>

              {/* Staff strip inside mockup */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary border-2 border-white flex items-center justify-center text-[10px] font-black text-white shadow-sm">
                      {['JW', 'PM', 'AS'][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-[11px] font-black text-slate-800">12 Specialist Consultants</p>
                  <p className="text-[9px] text-slate-400 font-semibold">Active duty and synchronized</p>
                </div>
                <span className="ml-auto text-[9px] bg-brand-primary/10 text-brand-primary font-black px-2 py-0.5 rounded-full uppercase">Duty</span>
              </div>
            </motion.div>

            {/* Floating Badges */}
            <motion.div 
              initial={{ x: 25, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-100 p-3.5 flex items-center gap-3 z-20 hover:scale-105 transition-all duration-300"
            >
              <div className="w-8.5 h-8.5 rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center shadow-md">
                <Activity size={14} className="text-white animate-pulse" />
              </div>
              <div>
                <p className="text-[11px] font-black text-[#0F172A] font-display">ICU Stream</p>
                <p className="text-[9px] text-slate-400 font-bold">Arrhythmia safe</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ x: -25, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-100 p-3.5 flex items-center gap-3 z-20 hover:scale-105 transition-all duration-300"
            >
              <div className="w-8.5 h-8.5 rounded-xl bg-gradient-to-br from-brand-accent to-emerald-500 flex items-center justify-center shadow-md">
                <Shield size={14} className="text-white" />
              </div>
              <div>
                <p className="text-[11px] font-black text-[#0F172A] font-display">NABH Certified</p>
                <p className="text-[9px] text-slate-400 font-bold">ISO 9001 Standards</p>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
