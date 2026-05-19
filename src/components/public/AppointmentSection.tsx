'use client';

import { useState } from 'react';
import { Calendar, User, Phone, ChevronRight, CheckCircle, Stethoscope, Clock } from 'lucide-react';

const departments = ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'General Medicine', 'Dermatology', 'Emergency'];
const doctors = ['Dr. Aditya Sharma', 'Dr. Priya Mehta', 'Dr. Rajesh Kumar', 'Dr. Sunita Rao'];
const timeSlots = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'];

export default function AppointmentSection() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', phone: '', dept: '', doctor: '', date: '', time: '' });
  const [booked, setBooked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBooked(true);
  };

  if (booked) {
    return (
      <section id="appointment" className="py-24 bg-white">
        <div className="container-xl mx-auto px-4 max-w-xl text-center">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-emerald-500" />
          </div>
          <h2 className="text-3xl font-black text-[#0F172A] mb-3">Appointment Confirmed!</h2>
          <p className="text-slate-500 mb-2">Your appointment has been successfully booked.</p>
          <div className="bg-slate-50 rounded-2xl p-5 text-left space-y-2 text-sm mt-6">
            <div className="flex justify-between"><span className="text-slate-500">Patient</span><span className="font-bold">{form.name}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Department</span><span className="font-bold">{form.dept}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Doctor</span><span className="font-bold">{form.doctor}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Date & Time</span><span className="font-bold">{form.date} · {form.time}</span></div>
          </div>
          <button onClick={() => { setBooked(false); setStep(1); setForm({ name: '', phone: '', dept: '', doctor: '', date: '', time: '' }); }} className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition">
            Book Another
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="appointment" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-blue-50 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/2" />

      <div className="container-xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Info */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-blue-700 text-sm font-semibold mb-6">
                Easy Online Booking
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight mb-4">
                Book Your Appointment in Minutes
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                Simple, fast, and secure. Choose your preferred doctor, pick a time, and we'll confirm instantly.
              </p>
            </div>
            {[
              { icon: Stethoscope, title: 'Choose Your Specialist', desc: 'Select from 50+ expert doctors across 15 specialties' },
              { icon: Calendar, title: 'Pick a Convenient Time', desc: 'View real-time availability and book your slot' },
              { icon: CheckCircle, title: 'Instant Confirmation', desc: 'Receive SMS and email confirmation immediately' },
            ].map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0F172A] text-sm">{step.title}</h4>
                    <p className="text-slate-500 text-xs mt-0.5">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Form */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-100/50 p-8">
            <h3 className="text-xl font-black text-[#0F172A] mb-6">Book an Appointment</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-600 mb-1.5 block">Full Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50/50"
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
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 mb-1.5 block">Department *</label>
                <select
                  required
                  value={form.dept}
                  onChange={(e) => setForm({ ...form, dept: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
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
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
                >
                  <option value="">Any Available Doctor</option>
                  {doctors.map((d) => <option key={d}>{d}</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 mb-1.5 block">Appointment Date *</label>
                <input
                  required
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50/50"
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
                      className={`py-2 rounded-lg text-[10px] font-bold border transition-all ${
                        form.time === t
                          ? 'bg-blue-600 text-white border-blue-600'
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
                className="w-full py-3.5 bg-[#2563EB] hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/30 hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                Confirm Appointment
                <ChevronRight size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
