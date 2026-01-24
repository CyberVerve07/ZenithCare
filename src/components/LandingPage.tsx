'use client';

import ThreeCanvas from './ThreeCanvas';
import { Heart, Brain, Activity, Baby, Stethoscope, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const departments = [
  { name: 'Cardiology', icon: Heart, description: 'Advanced heart care and cardiovascular diagnostics.' },
  { name: 'Neurology', icon: Brain, description: 'Expert treatment for neurological disorders.' },
  { name: 'Orthopedics', icon: Activity, description: 'Comprehensive bone and joint care.' },
  { name: 'Pediatrics', icon: Baby, description: 'Specialized healthcare for children and infants.' },
  { name: 'General Medicine', icon: Stethoscope, description: 'Primary healthcare and internal medicine.' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-50 py-20 lg:py-32">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center lg:flex-row">
            <div className="lg:w-1/2">
              <h1 className="text-5xl font-bold tracking-tight text-slate-900 lg:text-7xl">
                Scalable Health <br />
                <span className="text-blue-600">Precision Care</span>
              </h1>
              <p className="mt-6 text-lg text-slate-600 max-w-lg">
                Experience the next generation of hospital management. Reliable, real-time, and AI-powered healthcare solutions.
              </p>
              <div className="mt-10 flex gap-4">
                <Link href="/login" className="rounded-lg bg-blue-600 px-8 py-3 text-white font-semibold hover:bg-blue-700 transition">
                  Get Started
                </Link>
                <Link href="/departments" className="rounded-lg border border-slate-300 px-8 py-3 text-slate-700 font-semibold hover:bg-white transition">
                  View Departments
                </Link>
              </div>
            </div>
            <div className="mt-12 lg:mt-0 lg:w-1/2">
              <ThreeCanvas />
            </div>
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Specialized Departments</h2>
            <p className="mt-4 text-lg text-slate-600">Providing world-class care across all major medical fields.</p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {departments.map((dept) => (
              <div key={dept.name} className="group rounded-2xl border border-slate-100 p-8 hover:border-blue-100 hover:bg-blue-50 transition duration-300">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition">
                  <dept.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{dept.name}</h3>
                <p className="mt-2 text-slate-600">{dept.description}</p>
                <Link href={`/departments/${dept.name.toLowerCase()}`} className="mt-4 inline-flex items-center text-blue-600 font-medium hover:underline">
                  Learn more <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
