'use client';

import { motion } from 'framer-motion';
import { Activity, Shield, TrendingUp, Users, Heart, AlertCircle, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

const alertLogs = [
  { id: 1, type: 'critical', msg: 'Vitals trigger: Cardiac arrhythmia alert in ICU Bed #12. Resolving.', time: 'Just now' },
  { id: 2, type: 'success', msg: 'System update: Emergency dispatch response time verified at 2.4 mins.', time: '2 mins ago' },
  { id: 3, type: 'info', msg: 'Admissions: Patient intake capacity updated in Cardiology ward.', time: '8 mins ago' },
  { id: 4, type: 'info', msg: 'Smart Clinic: AI Summarization completed for Dr. Sunita Rao.', time: '15 mins ago' },
];

const wards = [
  { name: 'Cardiology ICU', occupied: 14, total: 18, color: 'from-blue-600 to-indigo-650' },
  { name: 'Neurology Ward', occupied: 10, total: 12, color: 'from-teal-500 to-emerald-600' },
  { name: 'Orthopedics W2', occupied: 8, total: 10, color: 'from-amber-500 to-orange-600' },
  { name: 'Pediatrics Ward', occupied: 9, total: 15, color: 'from-pink-500 to-rose-650' },
];

export default function PatientAnalyticsSection() {
  const [activeAlert, setActiveAlert] = useState(0);

  return (
    <section id="analytics" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-xl mx-auto px-4 relative z-10">
        
        {/* Layout */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: SaaS copy */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-secondary/10 border border-brand-secondary/20 rounded-full text-brand-secondary text-xs font-bold uppercase tracking-wider mb-6">
                <TrendingUp className="w-3.5 h-3.5 text-brand-secondary" />
                Live Patient Informatics
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight font-display mb-6 leading-tight">
                AI-Assisted Patient Analytics & Telemetry.
              </h2>
              <p className="text-slate-500 text-base md:text-lg font-sans leading-relaxed">
                Empower your clinical teams with structured data dashboards. Oversee patient loads, track department throughputs, and leverage predictive occupancy tools from one consolidated command center.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4 p-5 bg-white border border-slate-100 rounded-[20px] shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-brand-primary/5 flex items-center justify-center flex-shrink-0">
                  <Activity className="w-5 h-5 text-brand-primary animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-[#0F172A]">Real-Time Vitals Integration</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">Stream patient telemetry directly to nursing consoles with dynamic arrhythmia detection.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 bg-white border border-slate-100 rounded-[20px] shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-brand-accent/5 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-brand-accent" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-[#0F172A]">Capacity Optimization Engine</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">Optimize discharge times and manage inpatient beds effectively using predictive patient flow logistics.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Dashboard Preview (Glassmorphic Mockup) */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, scale: 0.97, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-[32px] shadow-2xl p-6.5 md:p-8 relative overflow-hidden"
            >
              {/* Header inside dashboard */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-slate-150/70">
                <div>
                  <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">Global Overview</p>
                  <h3 className="text-lg font-black text-[#0F172A] font-display">Hospital MIS Telemetry Console</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
                    Live Stream Synchronized
                  </span>
                </div>
              </div>

              {/* Patient Flow Curve (custom premium SVG graph) */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-xs font-black text-slate-700">Weekly Admission Throughput</p>
                  <span className="text-[10px] text-brand-primary font-extrabold flex items-center gap-0.5">
                    +18.4% intake <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
                <div className="h-32 w-full bg-slate-50/50 rounded-2xl p-3 border border-slate-100 relative">
                  {/* Grid Lines */}
                  <div className="absolute inset-x-0 top-1/4 border-t border-slate-100/70 border-dashed" />
                  <div className="absolute inset-x-0 top-2/4 border-t border-slate-100/70 border-dashed" />
                  <div className="absolute inset-x-0 top-3/4 border-t border-slate-100/70 border-dashed" />
                  
                  {/* Elegant SVG Curve */}
                  <svg viewBox="0 0 500 100" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2563EB" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {/* Shadow Area under path */}
                    <path d="M 0 80 Q 80 50 150 70 T 300 35 T 420 50 T 500 20 L 500 100 L 0 100 Z" fill="url(#chartGlow)" />
                    {/* Line Path */}
                    <path d="M 0 80 Q 80 50 150 70 T 300 35 T 420 50 T 500 20" fill="none" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />
                    {/* Glowing Marker Nodes */}
                    <circle cx="150" cy="70" r="4" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2.5" />
                    <circle cx="300" cy="35" r="4" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2.5" />
                    <circle cx="420" cy="50" r="4" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2.5" />
                    <circle cx="500" cy="20" r="5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2.5" className="animate-ping" />
                  </svg>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-bold px-1 mt-2">
                  <span>MON</span>
                  <span>TUE</span>
                  <span>WED</span>
                  <span>THU</span>
                  <span>FRI</span>
                  <span>SAT</span>
                  <span>SUN</span>
                </div>
              </div>

              {/* Ward Occupancies Progress */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {wards.map((w) => {
                  const pct = Math.round((w.occupied / w.total) * 100);
                  return (
                    <div key={w.name} className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col justify-between">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-bold text-slate-800">{w.name}</span>
                        <span className="text-[10px] text-slate-400 font-bold">{w.occupied}/{w.total} Beds</span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full bg-gradient-to-r ${w.color}`} style={{ width: `${pct}%` }} />
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-[9px] text-slate-400 font-semibold">Live Occupancy</span>
                        <span className="text-[10px] font-black text-[#0F172A]">{pct}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Live Alerts Stream console */}
              <div>
                <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest mb-3.5">Recent Security & Vitals Alerts</p>
                <div className="space-y-2">
                  {alertLogs.map((log) => (
                    <div 
                      key={log.id} 
                      className={`flex items-start gap-3 p-3.5 rounded-2xl border text-xs font-semibold transition-colors ${
                        log.type === 'critical' 
                          ? 'bg-rose-50/50 border-rose-100/70 text-rose-800' 
                          : log.type === 'success'
                            ? 'bg-emerald-50/50 border-emerald-100/70 text-emerald-800'
                            : 'bg-slate-50 border-slate-150/70 text-slate-700'
                      }`}
                    >
                      {log.type === 'critical' ? (
                        <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                      ) : log.type === 'success' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <Activity className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1 flex justify-between gap-4">
                        <span className="leading-relaxed">{log.msg}</span>
                        <span className="text-[9px] text-slate-400 font-bold whitespace-nowrap mt-0.5">{log.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
