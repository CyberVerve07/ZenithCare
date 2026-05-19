'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Heart, 
  Brain, 
  Activity, 
  Baby, 
  Stethoscope, 
  ArrowLeft, 
  CheckCircle, 
  Users, 
  Clock, 
  Sparkles,
  Award,
  ChevronRight
} from 'lucide-react';

const departmentDetails: Record<string, {
  name: string;
  icon: any;
  color: string;
  banner: string;
  badgeColor: string;
  description: string;
  longDescription: string;
  doctors: string[];
  equipment: string[];
  procedures: string[];
  vitalsChecked: string[];
}> = {
  cardiology: {
    name: 'Cardiology Clinic',
    icon: Heart,
    color: 'text-red-500 bg-red-50 border-red-100',
    badgeColor: 'bg-red-50 text-red-700 border-red-150',
    banner: 'from-red-500 to-rose-600',
    description: 'Advanced heart care, real-time telemetry, and cardiovascular diagnostics.',
    longDescription: 'Our Cardiology Division is a certified clinical care facility specializing in non-invasive telemetry monitoring, cardiac MRI scans, custom valvular evaluations, and catheterization diagnostics. Backed by real-time heart rhythm alerts, we ensure maximum precision.',
    doctors: ['Dr. Gregory House (Cardio-Diagnostics)', 'Dr. Sarah Mitchell (Cardiovascular Surgeon)'],
    equipment: ['Continuous telemetry monitors', 'High-speed CT coronary angiographs', 'Advanced robotic cath labs'],
    procedures: ['Electrocardiogram (ECG) profiling', 'Cardiac stress telemetry tests', 'Coronary angioplasty support'],
    vitalsChecked: ['Heart Rate (BPM)', 'Blood Pressure (systolic/diastolic)', 'Pulse Oximetry (SpO2%)']
  },
  neurology: {
    name: 'Neurology Division',
    icon: Brain,
    color: 'text-blue-500 bg-blue-50 border-blue-100',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-150',
    banner: 'from-blue-500 to-indigo-600',
    description: 'Expert diagnostics and critical care for neural and neuromuscular disorders.',
    longDescription: 'Our Neurology Division focuses on deep brain telemetry mapping, electroencephalogram evaluation, neuromuscular rehabilitation, and neuropathic diagnostic testing. We integrate high-speed imaging to secure immediate recovery metrics.',
    doctors: ['Dr. John Watson (Neurologist)', 'Dr. Charles Xavier (Neurological Diagnostics)'],
    equipment: ['3T high-field MRI scanner', 'Somatic sensory testing terminals', 'EEG monitoring beds'],
    procedures: ['Electroencephalogram mapping', 'Nerve conduction diagnostics', 'Sleep telemetry analysis'],
    vitalsChecked: ['Brainwaves (EEG)', 'Reflex kinetics', 'Intracranial pressure indicators']
  },
  orthopedics: {
    name: 'Orthopedics & Joint Clinic',
    icon: Activity,
    color: 'text-amber-500 bg-amber-50 border-amber-100',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-150',
    banner: 'from-amber-500 to-orange-600',
    description: 'Comprehensive musculoskeletal reconstruction, surgery, and joint recovery.',
    longDescription: 'MediFlow Orthopedic care offers cutting-edge kinetic motion analysis, bone mineral density scanning, joint reconstruction, and dedicated athletic recovery programs designed to secure complete biomechanical stability.',
    doctors: ['Dr. John Watson (Surgical Orthopedics)', 'Dr. Clara Barton (Sports Medicine Consultant)'],
    equipment: ['Image-guided surgical tools', 'Dual-energy X-ray bone scanners', 'Musculoskeletal ultrasound'],
    procedures: ['Arthroscopic recovery diagnostics', 'Biomechanical posture profiling', 'Physical therapy tracking'],
    vitalsChecked: ['Bone density indicator', 'Joint range-of-motion percentage', 'Kinetic weight balance']
  },
  pediatrics: {
    name: 'Pediatrics Care Unit',
    icon: Baby,
    color: 'text-pink-500 bg-pink-50 border-pink-100',
    badgeColor: 'bg-pink-50 text-pink-700 border-pink-150',
    banner: 'from-pink-500 to-purple-600',
    description: 'Nurturing, world-class clinical care tailored for children and infant development.',
    longDescription: 'Dedicated to newborn development, neonatal intensive care telemetry, pediatric primary vaccinations, developmental screening charts, and specialized sensory monitoring wards designed to make recovery pleasant.',
    doctors: ['Dr. Clara Barton (Pediatric Chief)', 'Dr. Allison Cameron (Developmental Specialist)'],
    equipment: ['Neonatal incubators', 'High-sensitivity infant vitals monitors', 'Sensory monitoring wards'],
    procedures: ['Developmental screening tests', 'Neonatal telemetry reviews', 'Infant nutritional assessments'],
    vitalsChecked: ['Developmental index', 'Body mass telemetry', 'Core temperature charts']
  },
  'general-medicine': {
    name: 'General Medicine & OPD',
    icon: Stethoscope,
    color: 'text-emerald-500 bg-emerald-50 border-emerald-100',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-150',
    banner: 'from-emerald-500 to-teal-600',
    description: 'Primary internal medicine, preventive health screenings, and diagnostics.',
    longDescription: 'The General Medicine ward is the core triage and outpatient diagnostic center of MediFlow. Providing general check-ups, fluid telemetry monitoring, recovery diets, and primary clinical consults across all age groups.',
    doctors: ['Dr. John Watson (Primary General Internist)', 'Dr. Eric Foreman (Diagnostic Chief)'],
    equipment: ['Multi-parameter vitals terminal', 'Outpatient triage modules', 'Continuous fluid infusion pumps'],
    procedures: ['Preventive health screening exams', 'Diagnostic telemetry checkups', 'In-patient dietary profiles'],
    vitalsChecked: ['Body temperature (°C)', 'Respiration frequency', 'Blood glucose profile']
  }
};

export default function DepartmentDetailPage({ params }: { params: Promise<{ name: string }> }) {
  const resolvedParams = React.use(params);
  const slug = (resolvedParams.name || '').toLowerCase();
  
  // Default to general medicine if slug doesn't match
  const dept = departmentDetails[slug] || departmentDetails['general-medicine'];
  const Icon = dept.icon;

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-6">
      {/* Decorative Blur Background */}
      <div className="absolute top-0 right-1/4 h-[300px] w-[300px] rounded-full bg-blue-100/30 blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-4xl space-y-8 relative z-10">
        {/* Back navigation */}
        <Link
          href="/departments"
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-blue-600 transition"
        >
          <ArrowLeft size={16} />
          Back to Specialisms Directory
        </Link>

        {/* Dynamic Showcase Header Card */}
        <div className={`relative rounded-3xl bg-gradient-to-r ${dept.banner} p-8 md:p-12 text-white shadow-lg overflow-hidden`}>
          <div className="absolute right-0 top-0 opacity-10 translate-x-8 -translate-y-8 scale-150 pointer-events-none">
            <Icon size={200} />
          </div>

          <div className="space-y-4 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[10px] font-extrabold uppercase tracking-widest text-white border border-white/20">
              <Clock size={11} />
              100% Ward Telemetry Active
            </span>
            <h1 className="text-3xl font-black md:text-5xl tracking-tight">{dept.name}</h1>
            <p className="text-white/90 text-sm md:text-base max-w-xl leading-relaxed">
              {dept.description}
            </p>
          </div>
        </div>

        {/* Details Layout */}
        <div className="grid gap-8 md:grid-cols-3">
          {/* Main Info Column */}
          <div className="md:col-span-2 space-y-6">
            {/* Overview */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
              <h3 className="font-extrabold text-slate-900 flex items-center gap-2">
                <Award className="text-blue-600" size={20} />
                Clinical Overview
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {dept.longDescription}
              </p>
            </div>

            {/* Advanced Capabilities Checklists */}
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Equipment */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">Advanced Telemetry Machinery</h4>
                <ul className="space-y-2.5">
                  {dept.equipment.map((eq, i) => (
                    <li key={i} className="text-xs text-slate-700 flex items-start gap-2 leading-relaxed">
                      <CheckCircle size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{eq}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Procedures */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">Clinical Procedures</h4>
                <ul className="space-y-2.5">
                  {dept.procedures.map((proc, i) => (
                    <li key={i} className="text-xs text-slate-700 flex items-start gap-2 leading-relaxed">
                      <CheckCircle size={14} className="text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>{proc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar Info Column */}
          <div className="space-y-6">
            {/* Rostered Medical Experts */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Users size={14} />
                Attending Consultants
              </h4>
              <div className="space-y-3">
                {dept.doctors.map((doc, i) => (
                  <div key={i} className="flex items-center gap-2.5 bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
                    <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center font-bold text-blue-600 text-xs">
                      {doc[4].toUpperCase()}
                    </div>
                    <span className="text-xs font-bold text-slate-800 leading-snug">{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Vitals Charted */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles size={14} />
                Monitored Metrics
              </h4>
              <div className="flex flex-wrap gap-2">
                {dept.vitalsChecked.map((vit, i) => (
                  <span 
                    key={i} 
                    className="inline-block rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700"
                  >
                    {vit}
                  </span>
                ))}
              </div>
            </div>

            {/* Schedule Slot Call to Action */}
            <div className="rounded-2xl bg-slate-900 p-6 text-white space-y-4 shadow-md relative overflow-hidden">
              <div className="space-y-1.5 relative z-10">
                <h4 className="font-bold text-sm">Need a clinician slot?</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Allocate your clinic slots with our advanced conflict prevention scheduling.
                </p>
              </div>
              <Link
                href="/login"
                className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-white py-3 text-xs font-extrabold text-slate-900 hover:bg-slate-100 transition duration-300 relative z-10"
              >
                Book OPD Appointment
                <ChevronRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
