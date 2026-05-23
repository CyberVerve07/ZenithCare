'use client';

import { useState } from 'react';
import { Calendar as CalendarIcon, User, Phone, ChevronRight, CheckCircle, Stethoscope, Clock } from 'lucide-react';
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
      <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-blue-50/30 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-[300px] h-[300px] bg-teal-50/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container-xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Info */}
          <div className="space-y-8 lg:col-span-5">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-blue-700 text-sm font-semibold mb-6">
                Easy Online Booking
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight mb-4 leading-tight">
                Book Your Appointment in Minutes
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                Simple, fast, and secure. Choose your preferred doctor, pick a time, and we'll confirm instantly.
              </p>
            </div>
            
            <div className="space-y-6">
              {[
                { icon: Stethoscope, title: 'Choose Your Specialist', desc: 'Select from 50+ expert doctors across 15 specialties' },
                { icon: CalendarIcon, title: 'Pick a Convenient Time', desc: 'View real-time availability and book your slot' },
                { icon: CheckCircle, title: 'Instant Confirmation', desc: 'Receive SMS and email confirmation immediately' },
              ].map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="flex gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100/50 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Icon size={18} className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-[#0F172A] text-sm">{step.title}</h4>
                      <p className="text-slate-500 text-xs mt-0.5 font-medium leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Form with dynamic transitions */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3.5xl border border-slate-150/80 shadow-2xl shadow-slate-100/50 p-8 md:p-10 relative overflow-hidden min-h-[500px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {!booked ? (
                  <motion.div
                    key="booking-form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h3 className="text-2xl font-black text-[#0F172A] mb-6">Schedule Consultation</h3>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-slate-600 mb-1.5 block">Full Name *</label>
                          <input
                            required
                            type="text"
                            placeholder="Your name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50/50 hover:bg-slate-50 transition-all font-semibold"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-600 mb-1.5 block">Phone Number *</label>
                          <input
                            required
                            type="tel"
                            placeholder="+91 XXXXX XXXXX"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50/50 hover:bg-slate-50 transition-all font-semibold"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-slate-600 mb-1.5 block">Department *</label>
                          <select
                            required
                            value={form.dept}
                            onChange={(e) => setForm({ ...form, dept: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white font-semibold cursor-pointer"
                          >
                            <option value="">Select Department</option>
                            {departments.map((d) => <option key={d}>{d}</option>)}
                          </select>
                        </div>

                        <div>
                          <label className="text-xs font-bold text-slate-600 mb-1.5 block">Preferred Doctor</label>
                          <select
                            value={form.doctor}
                            onChange={(e) => setForm({ ...form, doctor: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white font-semibold cursor-pointer"
                          >
                            <option value="">Any Available Doctor</option>
                            {doctors.map((d) => <option key={d}>{d}</option>)}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-600 mb-1.5 block">Appointment Date *</label>
                        <input
                          required
                          type="date"
                          min={new Date().toISOString().split('T')[0]}
                          value={form.date}
                          onChange={(e) => setForm({ ...form, date: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50/50 hover:bg-slate-50 transition-all font-semibold"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-600 mb-2 block">Preferred Time Slot *</label>
                        <div className="grid grid-cols-5 gap-2">
                          {timeSlots.map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => setForm({ ...form, time: t })}
                              className={`py-2 rounded-lg text-[10px] font-extrabold border transition-all ${
                                form.time === t
                                  ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/10'
                                  : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-650 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold rounded-xl transition-all shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/35 hover:-translate-y-0.5 flex items-center justify-center gap-2 mt-2"
                      >
                        Confirm Booking
                        <ChevronRight size={16} />
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="booking-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="text-center max-w-md mx-auto"
                  >
                    <div className="w-20 h-20 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                      <CheckCircle size={38} className="text-emerald-500" />
                    </div>
                    <h2 className="text-3xl font-black text-[#0F172A] mb-2 leading-tight">Appointment Confirmed!</h2>
                    <p className="text-slate-500 text-sm font-medium mb-6">Your clinical booking has been registered in the hospital MIS database successfully.</p>
                    
                    <div className="bg-slate-50 border border-slate-100 rounded-2.5xl p-6 text-left space-y-3.5 text-xs font-bold text-slate-700">
                      <div className="flex justify-between items-center"><span className="text-slate-400 font-medium">PATIENT</span><span className="text-slate-900 font-black">{form.name}</span></div>
                      <div className="flex justify-between items-center"><span className="text-slate-400 font-medium">DEPARTMENT</span><span className="text-slate-900 font-black">{form.dept}</span></div>
                      <div className="flex justify-between items-center"><span className="text-slate-400 font-medium">CONSULTANT</span><span className="text-slate-900 font-black">{form.doctor || 'Any Doctor Available'}</span></div>
                      <div className="flex justify-between items-center"><span className="text-slate-400 font-medium">DATE & TIME</span><span className="text-blue-600 font-black">{form.date} · {form.time}</span></div>
                    </div>
                    
                    <button 
                      onClick={() => { 
                        setBooked(false); 
                        setForm({ name: '', phone: '', dept: '', doctor: '', date: '', time: '' }); 
                      }} 
                      className="mt-8 px-8 py-3.5 bg-[#0F172A] hover:bg-slate-800 text-white rounded-xl font-extrabold transition shadow-md"
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
