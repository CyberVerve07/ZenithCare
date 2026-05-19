'use client';

import Link from 'next/link';
import { Heart, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowRight, Shield } from 'lucide-react';

const footerLinks = {
  Services: ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Emergency Care', 'Telemedicine'],
  'Quick Links': ['Book Appointment', 'Find a Doctor', 'OPD Timings', 'Lab Reports', 'Health Packages', 'Careers'],
  'Patient Care': ['Patient Rights', 'Visitor Policy', 'Insurance Plans', 'Feedback', 'Privacy Policy', 'Terms of Use'],
};

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white">
      {/* CTA Strip */}
      <div className="border-b border-white/10">
        <div className="container-xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold">Ready to Experience Better Healthcare?</h3>
            <p className="text-slate-400 text-sm mt-1">Join 20,000+ patients who trust MediFlow for their healthcare needs.</p>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0">
            <Link
              href="/#appointment"
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold text-sm transition-all hover:-translate-y-0.5 shadow-lg shadow-blue-600/30"
            >
              Book Appointment
              <ArrowRight size={16} />
            </Link>
            <Link
              href="tel:18001234567"
              className="flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-white/40 rounded-xl font-semibold text-sm transition-all hover:bg-white/5"
            >
              <Phone size={15} />
              Emergency
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center">
                <Heart size={18} className="text-white" fill="white" />
              </div>
              <span className="font-black text-xl">MediFlow</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              India's most trusted hospital management platform. Delivering smart, secure, and compassionate healthcare for over a decade.
            </p>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <MapPin size={16} className="text-blue-400 flex-shrink-0" />
                Plot 42, Health City, Hyderabad, Telangana 500081
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <Phone size={16} className="text-blue-400 flex-shrink-0" />
                1800-MEDFLOW (24/7 Emergency)
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <Mail size={16} className="text-blue-400 flex-shrink-0" />
                care@mediflow.health
              </div>
            </div>
            {/* Socials */}
            <div className="flex items-center gap-3 mt-6">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-blue-600 flex items-center justify-center transition-all hover:scale-110"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Cols */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-bold text-sm text-white mb-5 tracking-wide">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1 group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform">{link}</span>
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
        <div className="container-xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-xs">© 2025 MediFlow Health Systems Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Shield size={13} className="text-blue-400" />
            NABH Accredited · ISO 9001:2015 Certified · HIPAA Compliant
          </div>
        </div>
      </div>
    </footer>
  );
}
