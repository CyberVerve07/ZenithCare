'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Heart, Phone, LogIn, Activity, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Overview', href: '/#overview' },
  { label: 'Analytics', href: '/#analytics' },
  { label: 'Departments', href: '/#departments' },
  { label: 'Doctors', href: '/#doctors' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
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
      <div className="fixed top-0 left-0 w-full h-[3px] bg-slate-100/50 z-55 pointer-events-none">
        <motion.div 
          className="h-full bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent"
          style={{ scaleX: scrollProgress, transformOrigin: 'left' }}
        />
      </div>

      {/* Hotline Strip */}
      <div className="bg-[#0F172A] text-white text-xs py-2.5 px-4 flex items-center justify-between relative overflow-hidden font-semibold z-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(37,99,235,0.12),transparent)] pointer-events-none" />
        <div className="flex items-center gap-4 container-xl w-full mx-auto relative z-10">
          <div className="flex items-center gap-2 text-rose-400 font-bold tracking-wide">
            <Phone size={13} className="animate-bounce" />
            <span className="font-extrabold uppercase bg-rose-500/20 px-2 py-0.5 rounded text-[10px] text-rose-350">24/7 Hotline</span>
            1800-MEDFLOW
          </div>
          <span className="text-slate-700 hidden md:inline">|</span>
          <span className="text-slate-400 hidden md:inline font-medium">NABH Certified • ISO 9001:2015 Quality Standards • HIPAA Compliant</span>
          <div className="ml-auto text-slate-400 flex items-center gap-3">
            <span className="text-[10px] bg-slate-800 px-2.5 py-0.5 rounded text-slate-300 font-bold border border-slate-700/50 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              ICU Sync Live
            </span>
          </div>
        </div>
      </div>

      {/* Main Glassmorphic Navbar */}
      <nav className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/70 backdrop-blur-xl border-b border-slate-200/50 shadow-[0_4px_30px_rgba(0,0,0,0.03)] py-3' 
          : 'bg-white/95 border-b border-slate-100 py-4'
      }`}>
        <div className="container-xl mx-auto flex items-center justify-between px-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-[14px] bg-gradient-to-br from-brand-primary via-brand-secondary to-brand-accent flex items-center justify-center shadow-lg shadow-brand-primary/20 group-hover:scale-105 transition-all duration-350">
              <Heart size={18} className="text-white" fill="white" />
            </div>
            <div>
              <div className="flex items-center leading-none">
                <span className="font-black text-2xl text-[#0F172A] tracking-tight font-display">Medi</span>
                <span className="font-black text-2xl bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent tracking-tight font-display">Flow</span>
              </div>
              <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest leading-none block mt-1 font-sans">Hospital MIS v2.5</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1.5 bg-slate-100/60 border border-slate-200/30 p-1.5 rounded-[16px]">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-4.5 py-2 rounded-[12px] text-xs font-bold text-slate-600 hover:text-brand-primary hover:bg-white transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/mis/login"
              className="flex items-center gap-2 px-4.5 py-2.5 text-xs font-extrabold text-slate-700 hover:text-brand-primary rounded-[14px] hover:bg-slate-50 border border-transparent hover:border-slate-200/60 transition-all duration-200"
            >
              <LogIn size={14} className="text-slate-400" />
              Staff Portal
            </Link>
            <Link
              href="/#appointment"
              className="px-6 py-2.5 bg-gradient-to-r from-brand-primary to-brand-primary/95 text-white text-xs font-black rounded-[14px] transition-all shadow-md shadow-brand-primary/20 hover:shadow-lg hover:shadow-brand-primary/30 hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Calendar size={14} />
              Book Appointment
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-slate-100 text-slate-700 border border-transparent hover:border-slate-200 transition-all"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden absolute top-full left-0 w-full border-b border-slate-200 bg-white/95 backdrop-blur-xl shadow-xl z-50 overflow-hidden"
            >
              <div className="container mx-auto px-4 py-6 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center px-4 py-3 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-brand-primary transition-all border border-transparent hover:border-slate-100"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <Link 
                    href="/mis/login" 
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-slate-700 border border-slate-200 hover:bg-slate-50 transition"
                  >
                    <LogIn size={15} />
                    Staff Portal
                  </Link>
                  <Link 
                    href="/#appointment" 
                    onClick={() => setMobileOpen(false)}
                    className="block text-center px-4 py-3 rounded-xl bg-brand-primary text-white text-sm font-bold shadow-md"
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
