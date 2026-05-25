'use client';

import { Shield, Award, Heart, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const certifications = [
  { icon: Shield, label: 'NABH Accredited', sub: 'National Accreditation Board' },
  { icon: Award, label: 'ISO 9001:2015', sub: 'Clinical Quality Certified' },
  { icon: CheckCircle2, label: 'HIPAA Compliant', sub: 'Patient Data Encrypted' },
  { icon: Heart, label: 'JCI Standards', sub: 'International Healthcare Audit' },
];

const trustedBy = ['Apollo Care', 'Fortis Health', 'AIIMS Labs', 'Max Healthcare', 'Manipal Group'];

export default function TrustSection() {
  return (
    <section className="py-14 bg-white border-y border-slate-100 relative overflow-hidden">
      <div className="container-xl mx-auto px-4">
        
        <p className="text-center text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-10 font-sans">
          Certified, Accredited & Trusted by Leading Institutions
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
          {certifications.map((cert, idx) => {
            const Icon = cert.icon;
            return (
              <motion.div 
                key={cert.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="flex items-center gap-3.5"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-primary/5 border border-brand-primary/10 flex items-center justify-center">
                  <Icon size={16} className="text-brand-primary" />
                </div>
                <div>
                  <p className="text-xs font-black text-[#0F172A] font-display">{cert.label}</p>
                  <p className="text-[9px] text-slate-400 font-bold">{cert.sub}</p>
                </div>
              </motion.div>
            );
          })}
          
          <div className="w-px h-10 bg-slate-200 hidden xl:block" />
          
          <div className="flex flex-wrap items-center justify-center gap-6">
            {trustedBy.map((name, idx) => (
              <motion.span 
                key={name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.4 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + idx * 0.05 }}
                className="text-slate-500 font-black text-sm tracking-tight hover:opacity-80 transition-opacity font-display"
              >
                {name}
              </motion.span>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
