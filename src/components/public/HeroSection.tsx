'use client';

import Link from 'next/link';
import { ArrowRight, Calendar, ChevronRight, Activity, Shield, Zap } from 'lucide-react';

const stats = [
  { value: '50+', label: 'Expert Doctors' },
  { value: '20K+', label: 'Patients Treated' },
  { value: '24/7', label: 'Emergency Care' },
  { value: '15+', label: 'Departments' },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-[#F8FAFC]">
      {/* Background */}
      <div className="absolute inset-0 dot-grid opacity-50" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-100/40 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4" />

      <div className="container-xl mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div className="space-y-8 max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-blue-700 text-sm font-semibold">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              NABH Accredited · Serving Since 2010
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black text-[#0F172A] leading-[1.05] tracking-tight">
                Smart Healthcare<br />for Modern<br />
                <span className="gradient-text">Hospitals</span>
              </h1>
              <p className="text-lg text-slate-500 leading-relaxed max-w-md">
                Secure, scalable, AI-powered healthcare management platform trusted by 20,000+ patients.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/#appointment"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#2563EB] text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/30 hover:-translate-y-0.5 group"
              >
                <Calendar size={18} />
                Book Appointment
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/departments"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white text-[#0F172A] font-bold rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition-all shadow-sm hover:-translate-y-0.5 group"
              >
                Explore Departments
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-4 gap-4 pt-4 border-t border-slate-200">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-black text-[#0F172A]">{s.value}</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Dashboard Mockup */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-200/30 to-teal-200/30 rounded-3xl blur-2xl scale-110" />
            <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Hospital Analytics</p>
                  <p className="text-lg font-black text-[#0F172A]">Real-Time Dashboard</p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 rounded-full">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-xs text-emerald-700 font-bold">Live</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { label: 'OPD Today', val: '124', color: 'bg-blue-50 text-blue-700' },
                  { label: 'In-Patients', val: '48', color: 'bg-teal-50 text-teal-700' },
                  { label: 'Surgeries', val: '7', color: 'bg-violet-50 text-violet-700' },
                ].map((m) => (
                  <div key={m.label} className={`${m.color} rounded-2xl p-3 text-center`}>
                    <p className="text-2xl font-black">{m.val}</p>
                    <p className="text-[10px] font-semibold mt-0.5 opacity-80">{m.label}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mb-6">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Weekly Patient Flow</p>
                <div className="flex items-end gap-2 h-16">
                  {[60, 85, 45, 90, 70, 95, 75].map((h, i) => (
                    <div key={i} className={`flex-1 rounded-t-md ${i === 5 ? 'bg-blue-600' : 'bg-blue-100'}`} style={{ height: `${h}%` }} />
                  ))}
                </div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                    <span key={i} className={`flex-1 text-center ${i === 5 ? 'text-blue-600 font-bold' : ''}`}>{d}</span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-3 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-teal-400 border-2 border-white flex items-center justify-center text-xs font-bold text-white">
                      {['JW', 'SC', 'MK'][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">12 Doctors Available</p>
                  <p className="text-[10px] text-slate-400">Now accepting patients</p>
                </div>
                <span className="ml-auto text-[10px] bg-emerald-100 text-emerald-700 font-bold px-2 py-1 rounded-full">Live</span>
              </div>
            </div>

            {/* Floating Badges */}
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg border border-slate-100 p-3 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Activity size={14} className="text-white" />
              </div>
              <div>
                <p className="text-xs font-bold">ICU Monitoring</p>
                <p className="text-[10px] text-slate-400">All vitals normal</p>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg border border-slate-100 p-3 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
                <Shield size={14} className="text-white" />
              </div>
              <div>
                <p className="text-xs font-bold">NABH Certified</p>
                <p className="text-[10px] text-slate-400">ISO 9001:2015</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
