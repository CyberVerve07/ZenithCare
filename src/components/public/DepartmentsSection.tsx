'use client';

import Link from 'next/link';
import { Heart, Brain, Activity, Baby, Stethoscope, Zap, Microscope, ChevronRight, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const departments = [
  {
    name: 'Cardiology Ward',
    icon: Heart,
    color: 'text-rose-500',
    bg: 'bg-rose-50',
    border: 'border-rose-100',
    hover: 'hover:border-rose-200 hover:bg-rose-50/40',
    description: 'Advanced interventional cardiology, cardiac surgery, and real-time live telemetry.',
    specialists: 8,
    available: true,
    slug: 'cardiology',
  },
  {
    name: 'Neurology Unit',
    icon: Brain,
    color: 'text-brand-primary',
    bg: 'bg-brand-primary/5',
    border: 'border-brand-primary/10',
    hover: 'hover:border-brand-primary/20 hover:bg-brand-primary/5',
    description: 'Expert diagnostics and critical interventions for brain, spinal, and peripheral nervous system disorders.',
    specialists: 6,
    available: true,
    slug: 'neurology',
  },
  {
    name: 'Orthopedics & Joint Care',
    icon: Activity,
    color: 'text-amber-500',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    hover: 'hover:border-amber-200 hover:bg-amber-50/40',
    description: 'Complex bone, muscle, and joint interventions, robotic knee arthroplasties, and dedicated physical rehab.',
    specialists: 5,
    available: true,
    slug: 'orthopedics',
  },
  {
    name: 'Pediatrics Department',
    icon: Baby,
    color: 'text-pink-500',
    bg: 'bg-pink-50',
    border: 'border-pink-100',
    hover: 'hover:border-pink-200 hover:bg-pink-50/40',
    description: 'Empathetic pediatric care, specialized neonatal intensive care units (NICU), and pediatric surgery.',
    specialists: 7,
    available: true,
    slug: 'pediatrics',
  },
  {
    name: 'General Internal Medicine',
    icon: Stethoscope,
    color: 'text-brand-accent',
    bg: 'bg-brand-accent/5',
    border: 'border-brand-accent/10',
    hover: 'hover:border-brand-accent/20 hover:bg-brand-accent/5',
    description: 'Comprehensive primary care, internal medicine diagnostics, preventive checkups, and diabetes clinics.',
    specialists: 12,
    available: true,
    slug: 'general-medicine',
  },
  {
    name: 'Advanced Dermatology',
    icon: Zap,
    color: 'text-violet-500',
    bg: 'bg-violet-50',
    border: 'border-violet-100',
    hover: 'hover:border-violet-200 hover:bg-violet-50/40',
    description: 'Skin pathology diagnostics, advanced aesthetic laser treatments, phototherapy, and cosmetic clinics.',
    specialists: 4,
    available: false,
    slug: 'dermatology',
  },
  {
    name: 'Level-1 Emergency Trauma',
    icon: Microscope,
    color: 'text-orange-500',
    bg: 'bg-orange-50',
    border: 'border-orange-100',
    hover: 'hover:border-orange-200 hover:bg-orange-50/40',
    description: '24/7 hyperbaric units, polytrauma emergency response bays, and dedicated pediatric trauma bypass.',
    specialists: 10,
    available: true,
    slug: 'emergency',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function DepartmentsSection() {
  return (
    <section id="departments" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute left-0 bottom-0 w-[400px] h-[400px] bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container-xl mx-auto px-4">
        
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/5 border border-brand-primary/10 rounded-full text-brand-primary text-xs font-bold uppercase tracking-wider mb-6">
            Specialized Medical Wards
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight font-display mb-5">
            World-Class Departments
          </h2>
          <p className="text-slate-500 text-base md:text-lg leading-relaxed font-sans">
            Renowned clinical directors and specialized care wings designed for complete diagnostics and secure treatment.
          </p>
        </div>

        {/* Departments Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {departments.map((dept) => {
            const Icon = dept.icon;
            return (
              <motion.div
                key={dept.slug}
                variants={cardVariants}
                className="h-full"
              >
                <Link
                  href={`/departments/${dept.slug}`}
                  className={`group relative flex flex-col h-full bg-white rounded-[24px] border ${dept.border} ${dept.hover} p-6.5 transition-all duration-300 shadow-sm hover:shadow-xl`}
                >
                  {/* Availability Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full ${
                      dept.available ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {dept.available ? '● Active Wards' : '○ Standby'}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className={`w-11 h-11 ${dept.bg} rounded-[16px] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300 shadow-sm`}>
                    <Icon size={20} className={dept.color} />
                  </div>

                  {/* Content */}
                  <h3 className="text-sm font-black text-[#0F172A] font-display mb-2.5 group-hover:text-brand-primary transition-colors">
                    {dept.name}
                  </h3>
                  <p className="text-xs text-slate-450 leading-relaxed flex-1 mb-6 font-medium">
                    {dept.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4.5 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-bold">
                      <Users size={12} className="text-slate-350" />
                      <span>{dept.specialists} Specialists</span>
                    </div>
                    <ChevronRight size={15} className="text-slate-300 group-hover:text-brand-primary group-hover:translate-x-0.5 transition-all" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View All Button */}
        <div className="text-center mt-14">
          <Link
            href="/departments"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#0F172A] hover:bg-[#1E293B] text-white font-extrabold text-xs uppercase tracking-wider rounded-[18px] shadow-lg shadow-slate-900/10 transition-all hover:-translate-y-0.5 group animate-fade-in"
          >
            View All Clinical Wards
            <ChevronRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
