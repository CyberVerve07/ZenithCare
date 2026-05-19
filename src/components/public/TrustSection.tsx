'use client';

import { Shield, Award, Heart, CheckCircle } from 'lucide-react';

const certifications = [
  { icon: Shield, label: 'NABH Accredited', sub: 'National Board' },
  { icon: Award, label: 'ISO 9001:2015', sub: 'Quality Standards' },
  { icon: CheckCircle, label: 'HIPAA Compliant', sub: 'Data Security' },
  { icon: Heart, label: 'JCI Standards', sub: 'International' },
];

const trustedBy = ['Apollo', 'Fortis', 'AIIMS', 'Max Health', 'Manipal'];

export default function TrustSection() {
  return (
    <section className="py-14 bg-white border-y border-slate-100">
      <div className="container-xl mx-auto px-4">
        <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-10">
          Certified, Accredited & Trusted by Leading Institutions
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
          {certifications.map((cert) => {
            const Icon = cert.icon;
            return (
              <div key={cert.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Icon size={18} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-black text-[#0F172A]">{cert.label}</p>
                  <p className="text-[10px] text-slate-400">{cert.sub}</p>
                </div>
              </div>
            );
          })}
          <div className="w-px h-10 bg-slate-200 hidden lg:block" />
          <div className="flex items-center gap-6">
            {trustedBy.map((name) => (
              <span key={name} className="text-slate-300 font-black text-lg tracking-tight">{name}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
