'use client';

import Link from 'next/link';
import { Heart, Brain, Activity, Baby, Stethoscope, Zap, Microscope, ChevronRight, Users, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const departments = [
  {
    name: 'Cardiology',
    icon: Heart,
    color: 'text-red-500',
    bg: 'bg-red-50',
    border: 'border-red-100',
    hover: 'hover:border-red-200 hover:bg-red-50/50',
    description: 'Advanced cardiac care with real-time telemetry and interventional cardiology.',
    specialists: 8,
    available: true,
    slug: 'cardiology',
  },
  {
    name: 'Neurology',
    icon: Brain,
    color: 'text-blue-500',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    hover: 'hover:border-blue-200 hover:bg-blue-50/50',
    description: 'Expert diagnosis and treatment for brain, spine, and nervous system disorders.',
    specialists: 6,
    available: true,
    slug: 'neurology',
  },
  {
    name: 'Orthopedics',
    icon: Activity,
    color: 'text-amber-500',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    hover: 'hover:border-amber-200 hover:bg-amber-50/50',
    description: 'Complete bone and joint care, from diagnosis to surgical intervention and rehab.',
    specialists: 5,
    available: true,
    slug: 'orthopedics',
  },
  {
    name: 'Pediatrics',
    icon: Baby,
    color: 'text-pink-500',
    bg: 'bg-pink-50',
    border: 'border-pink-100',
    hover: 'hover:border-pink-200 hover:bg-pink-50/50',
    description: 'Dedicated child healthcare from neonatal care to adolescent medicine.',
    specialists: 7,
    available: true,
    slug: 'pediatrics',
  },
  {
    name: 'General Medicine',
    icon: Stethoscope,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    hover: 'hover:border-emerald-200 hover:bg-emerald-50/50',
    description: 'Primary healthcare, internal medicine, and preventive health consultations.',
    specialists: 12,
    available: true,
    slug: 'general-medicine',
  },
  {
    name: 'Dermatology',
    icon: Zap,
    color: 'text-violet-500',
    bg: 'bg-violet-50',
    border: 'border-violet-100',
    hover: 'hover:border-violet-200 hover:bg-violet-50/50',
    description: 'Skin, hair, and nail treatments with advanced laser and cosmetic dermatology.',
    specialists: 4,
    available: false,
    slug: 'dermatology',
  },
  {
    name: 'Emergency Care',
    icon: Microscope,
    color: 'text-orange-500',
    bg: 'bg-orange-50',
    border: 'border-orange-100',
    hover: 'hover:border-orange-200 hover:bg-orange-50/50',
    description: '24/7 emergency services with advanced trauma care and rapid response teams.',
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

export default function DepartmentsSection() {
  return (
    <section id="departments" className="py-24 bg-white relative">
      <div className="absolute left-0 bottom-0 w-[300px] h-[300px] bg-blue-50/30 rounded-full blur-3xl pointer-events-none" />
      <div className="container-xl mx-auto px-4">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-blue-700 text-sm font-semibold mb-6">
            Specialized Medical Wards
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight mb-4">
            World-Class Departments
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed">
            Expert care across all major medical specialties with state-of-the-art infrastructure and renowned specialists.
          </p>
        </div>

        {/* Department Cards Grid with framer-motion */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {departments.map((dept) => {
            const Icon = dept.icon;
            return (
              <motion.div
                key={dept.slug}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
                className="h-full"
              >
                <Link
                  href={`/departments/${dept.slug}`}
                  className={`group relative flex flex-col h-full bg-white rounded-2.5xl border ${dept.border} ${dept.hover} p-6.5 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-blue-500/5`}
                >
                  {/* Availability Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`text-[9px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded-full ${
                      dept.available ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {dept.available ? '● Active' : '○ Limited'}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className={`w-12 h-12 ${dept.bg} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={22} className={dept.color} />
                  </div>

                  {/* Content */}
                  <h3 className="text-base font-black text-[#0F172A] mb-2 group-hover:text-blue-600 transition-colors">
                    {dept.name}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed flex-1 mb-5">
                    {dept.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                      <Users size={13} className="text-slate-400" />
                      <span>{dept.specialists} specialists</span>
                    </div>
                    <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/departments"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#0F172A] hover:bg-[#1E293B] text-white font-extrabold rounded-2xl shadow-lg transition-all hover:-translate-y-0.5 group"
          >
            View All Wards
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
