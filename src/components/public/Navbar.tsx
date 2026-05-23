'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Heart, Phone, ChevronDown, Activity, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Departments', href: '/departments' },
  { label: 'Doctors', href: '/#doctors' },
  { label: 'Appointments', href: '/#appointment' },
  { label: 'Services', href: '/#services' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Calculate scroll progress
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(window.scrollY / totalScroll);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-slate-100 z-55 pointer-events-none">
        <motion.div 
          className="h-full bg-gradient-to-r from-blue-600 via-teal-400 to-indigo-600"
          style={{ scaleX: scrollProgress, transformOrigin: 'left' }}
        />
      </div>

      {/* Emergency top bar */}
      <div className="bg-[#0F172A] text-white text-xs py-2.5 px-4 flex items-center justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(37,99,235,0.15),transparent)] pointer-events-none" />
        <div className="flex items-center gap-4 container-xl w-full mx-auto relative z-10">
          <div className="flex items-center gap-2 text-rose-400 font-bold tracking-wide">
            <Phone size={13} className="animate-bounce" />
            <span className="font-extrabold uppercase bg-rose-500/20 px-2 py-0.5 rounded text-[10px] text-rose-300">24/7 Hotline</span>
            1800-MEDFLOW
          </div>
          <span className="text-slate-600 hidden md:inline">|</span>
          <span className="text-slate-400 hidden md:inline font-medium">NABH Certified • ISO 9001:2015 • AI-powered summaries</span>
          <div className="ml-auto text-slate-400 flex items-center gap-3">
            <span className="text-xs bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-semibold border border-slate-700/50">ICU Telemetry Live</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-lg shadow-slate-100/40 py-2' 
          : 'bg-white border-b border-slate-100 py-3.5'
      }`}>
        <div className="container-xl mx-auto flex items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-blue-500 to-teal-400 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/30 group-hover:scale-105 transition-all duration-300">
              <Heart size={20} className="text-white" fill="white" />
            </div>
            <div>
              <div className="flex items-center leading-none">
                <span className="font-black text-2xl text-[#0F172A] tracking-tight">Medi</span>
                <span className="font-black text-2xl bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent tracking-tight">Flow</span>
              </div>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none block mt-0.5">Hospital MIS v2.0</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1.5 bg-slate-100/50 border border-slate-200/50 p-1 rounded-xl">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-blue-600 transition-all duration-350"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/mis/login"
              className="flex items-center gap-1.5 px-4.5 py-2.5 text-sm font-bold text-slate-700 hover:text-blue-600 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all duration-200"
            >
              <LogIn size={15} />
              Staff Portal
            </Link>
            <Link
              href="/#appointment"
              className="relative px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-750 text-white text-sm font-extrabold rounded-xl transition-all duration-300 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              Book Appointment
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-slate-100 text-slate-700 border border-transparent hover:border-slate-200 transition-all"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu with AnimatePresence */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden overflow-hidden border-t border-slate-100 bg-white"
            >
              <div className="container mx-auto px-4 pb-8 pt-4 space-y-1.5">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center px-4 py-3 rounded-xl text-sm font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-all border border-transparent hover:border-blue-100"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <Link 
                    href="/mis/login" 
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-extrabold text-slate-700 border border-slate-200 hover:bg-slate-50 transition"
                  >
                    <LogIn size={16} />
                    Staff Portal
                  </Link>
                  <Link 
                    href="/#appointment" 
                    onClick={() => setMobileOpen(false)}
                    className="block text-center px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-extrabold hover:from-blue-700 hover:to-indigo-700 transition shadow-lg shadow-blue-500/10"
                  >
                    Book Appointment
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
