'use client';

import { Ambulance, Video, FlaskConical, Pill, Zap, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Ambulance,
    title: 'Emergency Care',
    desc: '24/7 emergency response with advanced trauma bays and rapid intervention teams.',
    color: 'from-red-500 to-rose-600',
    light: 'bg-red-50 text-red-600',
  },
  {
    icon: Video,
    title: 'Telemedicine',
    desc: 'Consult expert doctors from the comfort of your home via secure video calls.',
    color: 'from-blue-500 to-indigo-600',
    light: 'bg-blue-50 text-blue-600',
  },
  {
    icon: FlaskConical,
    title: 'Lab Testing',
    desc: 'NABL-accredited diagnostic lab with 500+ tests and home sample collection.',
    color: 'from-teal-500 to-emerald-600',
    light: 'bg-teal-50 text-teal-600',
  },
  {
    icon: Pill,
    title: 'In-House Pharmacy',
    desc: '24-hour pharmacy with genuine medicines, home delivery, and e-prescriptions.',
    color: 'from-violet-500 to-purple-600',
    light: 'bg-violet-50 text-violet-600',
  },
  {
    icon: Zap,
    title: 'Ambulance Service',
    desc: 'GPS-tracked advanced life support ambulances, dispatched in under 4 minutes.',
    color: 'from-amber-500 to-orange-600',
    light: 'bg-amber-50 text-amber-600',
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-[#0F172A] text-white relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-10" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl" />

      <div className="container-xl mx-auto px-4 relative z-10">
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/10 rounded-full text-blue-300 text-sm font-semibold mb-6">
            Our Services
          </div>
          <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-4">
            Complete Healthcare Ecosystem
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed">
            From emergency response to daily wellness, we provide end-to-end healthcare solutions under one roof.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.title}
                className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${svc.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="text-lg font-black mb-2 group-hover:text-blue-300 transition-colors">{svc.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{svc.desc}</p>
                <div className="flex items-center gap-1 text-blue-400 text-xs font-bold group-hover:gap-2 transition-all">
                  Learn More <ArrowRight size={13} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
