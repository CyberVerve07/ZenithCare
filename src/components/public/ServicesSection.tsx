'use client';

import { Ambulance, Video, FlaskConical, Pill, Zap, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    icon: Ambulance,
    title: 'Emergency Care',
    desc: '24/7 emergency response with advanced trauma bays and rapid intervention teams.',
    color: 'from-rose-500 to-red-600',
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
    color: 'from-violet-500 to-purple-605',
    light: 'bg-violet-50 text-violet-650',
  },
  {
    icon: Zap,
    title: 'Ambulance Service',
    desc: 'GPS-tracked advanced life support ambulances, dispatched in under 4 minutes.',
    color: 'from-amber-500 to-orange-600',
    light: 'bg-amber-50 text-amber-600',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-[#0F172A] text-white relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-5 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-xl mx-auto px-4 relative z-10">
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/10 rounded-full text-blue-300 text-sm font-semibold mb-6">
            Our Care Services
          </div>
          <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-4 leading-tight">
            Complete Healthcare Ecosystem
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed">
            From emergency response to daily wellness, we provide end-to-end healthcare solutions under one roof.
          </p>
        </div>

        {/* Services Grid with framer-motion */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={svc.title}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.2, ease: 'easeOut' } }}
              >
                <div
                  className="group h-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2.5xl p-7 transition-all duration-350 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${svc.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-black/20`}>
                      <Icon size={22} className="text-white" />
                    </div>
                    {/* Title */}
                    <h3 className="text-lg font-black mb-2 group-hover:text-blue-300 transition-colors">{svc.title}</h3>
                    {/* Description */}
                    <p className="text-slate-400 text-xs leading-relaxed mb-6 font-medium">{svc.desc}</p>
                  </div>
                  {/* Link CTA */}
                  <div className="flex items-center gap-1.5 text-blue-400 text-xs font-bold group-hover:gap-2.5 transition-all">
                    Explore Details <ArrowRight size={13} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
