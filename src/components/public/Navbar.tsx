'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Heart, Phone, ChevronDown } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Departments', href: '/departments' },
  { label: 'Doctors', href: '/#doctors' },
  { label: 'Appointments', href: '/#appointment' },
  { label: 'Emergency', href: '/#emergency' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Emergency top bar */}
      <div className="bg-[#0F172A] text-white text-xs py-2 px-4 flex items-center justify-between">
        <div className="flex items-center gap-4 container-xl w-full mx-auto">
          <div className="flex items-center gap-1.5 text-red-400 font-semibold">
            <Phone size={12} className="animate-pulse" />
            Emergency: 1800-MEDFLOW
          </div>
          <span className="text-slate-400">|</span>
          <span className="text-slate-400">NABH Certified • ISO 9001:2015 • 24/7 Services</span>
          <div className="ml-auto text-slate-400 hidden sm:block">
            Mon–Sat: 8AM–8PM &nbsp;|&nbsp; Emergency: 24/7
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm shadow-slate-100/50' 
          : 'bg-white border-b border-slate-100'
      }`}>
        <div className="container-xl mx-auto flex items-center justify-between h-16 px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all">
              <Heart size={18} className="text-white" fill="white" />
            </div>
            <div>
              <span className="font-black text-xl text-[#0F172A] tracking-tight">Medi</span>
              <span className="font-black text-xl gradient-text tracking-tight">Flow</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/mis/login"
              className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors"
            >
              Staff Login
            </Link>
            <Link
              href="/#appointment"
              className="px-5 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-md shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5"
            >
              Book Appointment
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-white border-t border-slate-100 px-4 pb-6 pt-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center px-4 py-3 rounded-xl text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-all"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <Link href="/mis/login" className="block text-center px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 border border-slate-200 hover:bg-slate-50">
                Staff Login
              </Link>
              <Link href="/#appointment" className="block text-center px-4 py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors">
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
