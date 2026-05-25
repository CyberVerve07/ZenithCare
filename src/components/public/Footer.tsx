'use client';

import Link from 'next/link';
import { Heart, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowRight, Shield } from 'lucide-react';

const footerLinks = {
  Wards: ['Cardiology ICU', 'Neurology Ward', 'Orthopedics', 'Pediatrics Wing', 'Emergency Wards', 'Telemedicine Stream'],
  'Quick Links': ['Book Appointment', 'Active Doctors Team', 'OPD Duty Schedule', 'Lab Reports Sync', 'Health Packages', 'Hospital Careers'],
  'Patient Care': ['Patient Rights', 'Visitor Policy Protocols', 'Insurance Partnerships', 'Telemetry Feedback', 'Privacy Policy', 'Terms of Service'],
};

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white overflow-hidden">
      
      {/* SaaS Call-to-action Strip */}
      <div className="border-b border-white/10 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(37,99,235,0.08),transparent)] pointer-events-none" />
        <div className="container-xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div>
            <h3 className="text-2xl font-black font-display leading-snug">Experience Smarter Healthcare Delivery</h3>
            <p className="text-slate-400 text-xs mt-1.5 font-sans font-medium">Join 20,000+ clinical cases managed securely through the MediFlow hospital ecosystem.</p>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0 w-full md:w-auto">
            <Link
              href="/#appointment"
              className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-primary hover:bg-brand-primary/95 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-brand-primary/20"
            >
              Book Appointment
              <ArrowRight size={14} />
            </Link>
            <Link
              href="tel:1800-MEDFLOW"
              className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3.5 border border-white/20 hover:border-white/40 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all hover:bg-white/5"
            >
              <Phone size={14} className="text-rose-450 animate-pulse" />
              Emergency 24/7
            </Link>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="container-xl mx-auto px-4 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Logo & Contact details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center">
                <Heart size={16} className="text-white" fill="white" />
              </div>
              <span className="font-black text-xl font-display">MediFlow</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-xs font-sans font-medium">
              India's premium tech-enabled hospital MIS and patient tracking platform. Delivering smart, secure, and compassionate healthcare ecosystems for over a decade.
            </p>
            <div className="space-y-3.5 text-xs text-slate-400 font-sans font-semibold">
              <div className="flex items-center gap-3">
                <MapPin size={15} className="text-brand-secondary flex-shrink-0" />
                Plot 42, Health City, Hyderabad, Telangana 500081
              </div>
              <div className="flex items-center gap-3">
                <Phone size={15} className="text-brand-secondary flex-shrink-0" />
                1800-MEDFLOW (Hotline Stream)
              </div>
              <div className="flex items-center gap-3">
                <Mail size={15} className="text-brand-secondary flex-shrink-0" />
                care@mediflow.health
              </div>
            </div>

            {/* Social handles */}
            <div className="flex items-center gap-2.5">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-brand-primary flex items-center justify-center transition-all hover:scale-105 border border-white/5"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Links collections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-extrabold text-xs text-white mb-5 tracking-widest uppercase font-display">{title}</h4>
              <ul className="space-y-3 text-xs">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 group font-sans font-medium"
                    >
                      <span className="group-hover:translate-x-0.5 transition-transform">{link}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-[10px] font-sans font-bold">© 2026 MediFlow Health Systems Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-2.5 text-[10px] text-slate-500 font-sans font-bold">
            <Shield size={12} className="text-brand-secondary" />
            NABH Accredited · JCI Quality Audited · HIPAA Compliant
          </div>
        </div>
      </div>

    </footer>
  );
}
