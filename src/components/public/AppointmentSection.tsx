'use client';

import { useState } from 'react';
import { Calendar as CalendarIcon, User, Phone, ChevronRight, CheckCircle, Stethoscope, Clock, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const departments = ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'General Medicine', 'Dermatology', 'Emergency'];
const doctors = ['Dr. Aditya Sharma', 'Dr. Priya Mehta', 'Dr. Rajesh Kumar', 'Dr. Sunita Rao'];
const timeSlots = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'];

export default function AppointmentSection() {
  const [form, setForm] = useState({ name: '', phone: '', dept: '', doctor: '', date: '', time: '' });
  const [booked, setBooked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBooked(true);
  };

  return (
    <section id="appointment" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-[300px] h-[300px] bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column */}
          <div className="space-y-8 lg:col-span-5">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/5 border border-brand-primary/10 rounded-full text-brand-primary text-xs font-bold uppercase tracking-wider mb-6">
                Easy Online Scheduling
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight font-display mb-5 leading-tight">
                Book Your Consultation. <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">Instant Confirmation.</span>
              </h2>
              <p className="text-slate-500 text-base md:text-lg leading-relaxed font-sans">
                Book online in under three minutes. Secure your timeslot with our specialists, synchronized directly with our internal clinician rosters.
              </p>
            </div>
            
            <div className="space-y-5">
              {[
                { icon: Stethoscope, title: 'Choose Your Ward Specialist', desc: 'Select from 50+ board-certified doctors across 15 wards.' },
                { icon: CalendarIcon, title: 'Check Clinician Calendars', desc: 'See true real-time clinic openings and reserve immediately.' },
                { icon: CheckCircle, title: 'Instant Telemetry Sync', desc: 'Receive instant confirmation via SMS and e-mail protocols.' },
              ].map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="flex gap-4">
                    <div className="w-11 h-11 rounded-[16px] bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Icon size={16} className="text-brand-primary" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-[#0F172A] text-sm font-display">{step.title}</h4>
                      <p className="text-slate-450 text-xs mt-0.5 font-medium leading-relaxed font-sans">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column Form card */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[28px] border border-slate-200/80 shadow-2xl p-8 md:p-10 relative overflow-hidden min-h-[520px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {!booked ? (
                  <motion.div
                    key="booking-form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-black text-[#0F172A] mb-6 font-display">Schedule Consultation</h3>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1.5 block">Full Name *</label>
                          <input
                            required
                            type="text"
                            placeholder="Your Name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full px-4.5 py-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary bg-slate-50/50 hover:bg-slate-50 transition-all font-bold text-slate-800"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1.5 block">Phone Number *</label>
                          <input
                            required
                            type="tel"
                            placeholder="+91 XXXXX XXXXX"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            className="w-full px-4.5 py-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary bg-slate-50/50 hover:bg-slate-50 transition-all font-bold text-slate-800"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1.5 block">Department *</label>
                          <select
                            required
                            value={form.dept}
                            onChange={(e) => setForm({ ...form, dept: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary bg-white font-bold text-slate-800 cursor-pointer"
                          >
                            <option value="">Select Ward</option>
                            {departments.map((d) => <option key={d}>{d}</option>)}
                          </select>
                        </div>

                        <div>
                          <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1.5 block">Preferred Consultant</label>
                          <select
                            value={form.doctor}
                            onChange={(e) => setForm({ ...form, doctor: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary bg-white font-bold text-slate-800 cursor-pointer"
                          >
                            <option value="">Any Available Specialist</option>
                            {doctors.map((d) => <option key={d}>{d}</option>)}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1.5 block">Appointment Date *</label>
                        <input
                          required
                          type="date"
                          min={new Date().toISOString().split('T')[0]}
                          value={form.date}
                          onChange={(e) => setForm({ ...form, date: e.target.value })}
                          className="w-full px-4.5 py-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary bg-slate-50/50 hover:bg-slate-50 transition-all font-bold text-slate-800"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-2 block">Preferred Time Slot *</label>
                        <div className="grid grid-cols-5 gap-1.5">
                          {timeSlots.map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => setForm({ ...form, time: t })}
                              className={`py-2 rounded-lg text-[9px] font-black border transition-all ${
                                form.time === t
                                  ? 'bg-brand-primary text-white border-brand-primary shadow-md shadow-brand-primary/15'
                                  : 'bg-white text-slate-600 border-slate-200 hover:border-brand-primary/30'
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 bg-gradient-to-r from-brand-primary to-brand-primary/95 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-brand-primary/20 hover:shadow-xl hover:shadow-brand-primary/35 hover:-translate-y-0.5 flex items-center justify-center gap-1.5 mt-4"
                      >
                        Confirm Booking
                        <ChevronRight size={15} />
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="booking-success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3 }}
                    className="text-center max-w-md mx-auto"
                  >
                    <div className="w-16 h-16 bg-emerald-50 border border-emerald-150 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                      <CheckCircle size={32} className="text-emerald-500" />
                    </div>
                    <h2 className="text-2xl font-black text-[#0F172A] font-display mb-2 leading-tight">Appointment Synced!</h2>
                    <p className="text-slate-500 text-xs font-semibold mb-6 font-sans">Your clinical consultation reservation has been securely logged in the MediFlow MIS database.</p>
                    
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5.5 text-left space-y-3 text-xs font-bold text-slate-650">
                      <div className="flex justify-between items-center"><span className="text-slate-400 font-medium">PATIENT</span><span className="text-slate-800 font-black">{form.name}</span></div>
                      <div className="flex justify-between items-center"><span className="text-slate-400 font-medium">DEPARTMENT</span><span className="text-slate-800 font-black">{form.dept}</span></div>
                      <div className="flex justify-between items-center"><span className="text-slate-400 font-medium">CONSULTANT</span><span className="text-slate-800 font-black">{form.doctor || 'Any Specialist Active'}</span></div>
                      <div className="flex justify-between items-center"><span className="text-slate-400 font-medium">DATE & TIME</span><span className="text-brand-primary font-black">{form.date} · {form.time}</span></div>
                    </div>
                    
                    <button 
                      onClick={() => { 
                      setBooked(false); 
                      setForm({ name: '', phone: '', dept: '', doctor: '', date: '', time: '' }); 
                    }} 
                    className="mt-6 px-6 py-3 bg-[#0F172A] hover:bg-slate-800 text-white rounded-xl text-xs font-black uppercase tracking-wider transition shadow-md"
                  >
                    Book Another Slot
                  </button>
                </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
