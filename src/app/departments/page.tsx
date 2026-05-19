'use client';

import Link from 'next/link';
import { 
  Heart, 
  Brain, 
  Activity, 
  Baby, 
  Stethoscope, 
  ArrowLeft, 
  ChevronRight,
  ShieldCheck,
  Star,
  Users,
  BedDouble
} from 'lucide-react';

const departments = [
  {
    name: 'Cardiology',
    slug: 'cardiology',
    icon: Heart,
    color: 'text-red-500 bg-red-50 border-red-100/50',
    banner: 'from-red-500 to-rose-600',
    description: 'Advanced heart care, real-time telemetry, and cardiovascular diagnostics.',
    doctors: 8,
    beds: 12,
    rating: 4.9,
    equipment: ['Continuous Cardiac Telemetry', 'Advanced Cardiac MRI', 'Robotic Catheter Labs']
  },
  {
    name: 'Neurology',
    slug: 'neurology',
    icon: Brain,
    color: 'text-blue-500 bg-blue-50 border-blue-100/50',
    banner: 'from-blue-500 to-indigo-600',
    description: 'Expert diagnostics and critical care for neural and neuromuscular disorders.',
    doctors: 6,
    beds: 8,
    rating: 4.8,
    equipment: ['High-Field 3T MRI', 'Computed Tomography (CT)', 'Polysomnography Sleep Labs']
  },
  {
    name: 'Orthopedics',
    slug: 'orthopedics',
    icon: Activity,
    color: 'text-amber-500 bg-amber-50 border-amber-100/50',
    banner: 'from-amber-500 to-orange-600',
    description: 'Comprehensive musculoskeletal reconstruction, surgery, and joint recovery.',
    doctors: 5,
    beds: 10,
    rating: 4.7,
    equipment: ['Image-Guided Navigation Systems', 'Minimally Invasive Tools', 'Kinetic Motion Labs']
  },
  {
    name: 'Pediatrics',
    slug: 'pediatrics',
    icon: Baby,
    color: 'text-pink-500 bg-pink-50 border-pink-100/50',
    banner: 'from-pink-500 to-purple-600',
    description: 'Nurturing, world-class clinical care tailored for children and infant development.',
    doctors: 7,
    beds: 15,
    rating: 4.9,
    equipment: ['Neonatal ICU Telemetry', 'Pediatric Patient Monitors', 'Sensory Play Wards']
  },
  {
    name: 'General Medicine',
    slug: 'general-medicine',
    icon: Stethoscope,
    color: 'text-emerald-500 bg-emerald-50 border-emerald-100/50',
    banner: 'from-emerald-500 to-teal-600',
    description: 'Primary internal medicine, preventive health screenings, and diagnostics.',
    doctors: 12,
    beds: 20,
    rating: 4.6,
    equipment: ['Digital Diagnostics Terminal', 'Outpatient Infusion Systems', 'Telemetry Wards']
  }
];

export default function DepartmentsOverview() {
  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-6">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-0 left-1/4 h-[400px] w-[400px] rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 h-[400px] w-[400px] rounded-full bg-indigo-100/40 blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-6xl space-y-10 relative z-10">
        {/* Header Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-blue-600 transition"
          >
            <ArrowLeft size={16} />
            Back to Control Center
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck size={13} />
            Certified Medical Wards
          </div>
        </div>

        {/* Hero title */}
        <div className="space-y-3">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            Specialized Medical Departments
          </h1>
          <p className="text-slate-500 max-w-2xl text-sm md:text-base leading-relaxed">
            MediFlow clinical departments leverage cutting-edge diagnostic telemetry, specialized clinical beds, and peer-reviewed consultants.
          </p>
        </div>

        {/* Department Grid Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {departments.map((dept) => {
            const Icon = dept.icon;
            return (
              <div 
                key={dept.slug}
                className="group relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl transition duration-500 hover:border-slate-300 overflow-hidden"
              >
                {/* Accent top gradient stripe */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${dept.banner}`} />

                <div className="space-y-5">
                  {/* Icon & Rating */}
                  <div className="flex items-center justify-between">
                    <div className={`rounded-2xl border p-3.5 ${dept.color}`}>
                      <Icon size={24} />
                    </div>
                    <div className="flex items-center gap-1 text-amber-500 bg-amber-50/50 border border-amber-100 px-2.5 py-1 rounded-xl text-xs font-extrabold">
                      <Star size={13} fill="currentColor" />
                      {dept.rating}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1.5">
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition">
                      {dept.name}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {dept.description}
                    </p>
                  </div>

                  {/* Telemetry quick metrics */}
                  <div className="grid grid-cols-2 gap-4 border-t border-b border-slate-100 py-4 text-xs font-bold text-slate-700">
                    <div className="flex items-center gap-1.5">
                      <Users size={14} className="text-slate-400" />
                      <span>{dept.doctors} Consultants</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BedDouble size={14} className="text-slate-400" />
                      <span>{dept.beds} Telemetry Beds</span>
                    </div>
                  </div>

                  {/* Equipment checklist */}
                  <div className="space-y-1.5">
                    <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Core Telemetry & Tools</p>
                    <ul className="text-xs text-slate-600 space-y-1 list-inside list-disc">
                      {dept.equipment.map((eq, i) => (
                        <li key={i} className="truncate">{eq}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <Link
                    href={`/departments/${dept.slug}`}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-50 border border-slate-200 py-3 text-xs font-bold text-slate-700 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition duration-300 shadow-sm"
                  >
                    Clinical Ward Overview
                    <ChevronRight size={14} className="group-hover:translate-x-0.5 transition" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
