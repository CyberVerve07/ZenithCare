'use client';

import { motion } from 'framer-motion';
import { Shield, Clock, Users, LogIn, Sparkles, Check, Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const roster = [
  { name: 'Dr. Aditya Sharma', role: 'Senior Cardiologist', status: 'In Surgery', dept: 'ICU-1', shift: '08:00 - 16:00' },
  { name: 'Dr. Priya Mehta', role: 'Senior Neurologist', status: 'Consultation', dept: 'OPD-3', shift: '10:00 - 18:00' },
  { name: 'Dr. Sunita Rao', role: 'Pediatric Specialist', status: 'Active Wards', dept: 'PED-4', shift: '11:00 - 19:00' },
  { name: 'Nurse Maria Joseph', role: 'ER Nurse Lead', status: 'On Call', dept: 'Trauma Bay', shift: '07:00 - 15:00' },
];

export default function StaffManagementSection() {
  return (
    <section id="staff-management" className="py-24 bg-white relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-[450px] h-[450px] bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-xl mx-auto px-4 relative z-10">
        
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Shift Dashboard Mockup */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, scale: 0.97, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white border border-slate-200/80 rounded-[32px] shadow-2xl p-6 md:p-8 relative overflow-hidden"
            >
              {/* Internal Dashboard Header */}
              <div className="flex justify-between items-center mb-6 pb-5 border-b border-slate-150/70">
                <div>
                  <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">MIS Core Roster</p>
                  <h3 className="text-lg font-black text-[#0F172A] font-display">Duty Roster & Shift Allocations</h3>
                </div>
                <span className="text-[10px] bg-brand-primary/5 text-brand-primary font-black px-3 py-1 rounded-full uppercase tracking-wider">
                  Today's Shift
                </span>
              </div>

              {/* Roster Table Mockup */}
              <div className="space-y-3 mb-6">
                {roster.map((staff, idx) => (
                  <div 
                    key={staff.name} 
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-slate-50 hover:bg-slate-100/70 rounded-[20px] border border-slate-100 hover:border-slate-200 transition-all duration-200 gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center font-black text-slate-700 text-xs shadow-inner">
                        {staff.name.split(' ').slice(1).map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-[#0F172A]">{staff.name}</h4>
                        <p className="text-[10px] text-slate-400 font-semibold">{staff.role}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                      <div className="text-[10px] text-slate-500 font-bold flex items-center gap-1 bg-white border border-slate-150 px-2.5 py-1 rounded-lg">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {staff.shift}
                      </div>
                      <span className="text-[10px] font-bold text-slate-700 bg-white border border-slate-150 px-2.5 py-1 rounded-lg">
                        {staff.dept}
                      </span>
                      <span className={`text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-full ${
                        staff.status === 'In Surgery' 
                          ? 'bg-rose-500 text-white shadow-sm' 
                          : staff.status === 'Consultation'
                            ? 'bg-brand-primary text-white shadow-sm'
                            : staff.status === 'Active Wards'
                              ? 'bg-emerald-500 text-white shadow-sm'
                              : 'bg-amber-500 text-white shadow-sm'
                      }`}>
                        {staff.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Roster Info Strip */}
              <div className="bg-slate-900 text-white rounded-2xl p-4.5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 text-brand-secondary" />
                  </div>
                  <div>
                    <h5 className="text-xs font-black">Clinician Handover Synced</h5>
                    <p className="text-[10px] text-slate-400 font-medium">All shifts verified for next 24 hours</p>
                  </div>
                </div>
                <Link
                  href="/mis/login"
                  className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4.5 py-2.5 bg-brand-primary hover:bg-brand-primary/95 text-white text-xs font-extrabold rounded-xl transition-all shadow-md shadow-brand-primary/25 whitespace-nowrap"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  Staff Portal
                </Link>
              </div>

            </motion.div>
          </div>

          {/* Right Column: Copy */}
          <div className="lg:col-span-5 space-y-8 order-1 lg:order-2">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/5 border border-brand-primary/10 rounded-full text-brand-primary text-xs font-bold uppercase tracking-wider mb-6">
                <Shield className="w-3.5 h-3.5 text-brand-primary" />
                Hospital Governance & MIS
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight font-display mb-6 leading-tight">
                Streamlined Staff & Shift Management.
              </h2>
              <p className="text-slate-500 text-base md:text-lg font-sans leading-relaxed">
                Ensure zero staffing gaps. Secure role-based access control (RBAC) allows administrators, doctors, and nursing staff to manage duties, logs, and patient allocations without conflicting rosters.
              </p>
            </div>

            <div className="space-y-3.5">
              {[
                'Conflict-free doctor and nurse shift planning tools.',
                'Secure Role-Based Access Control (RBAC) authentication.',
                'Audit trails for scheduling changes and patient allocation logs.',
                'Real-time active duty overview dashboard for administrators.',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <Check className="w-3 h-3 text-emerald-500 stroke-[3]" />
                  </div>
                  <span className="text-xs text-slate-600 font-bold leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
