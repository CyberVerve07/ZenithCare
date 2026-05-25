'use client';

import { Star, Calendar, ChevronRight, Users, Heart } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const doctors = [
  {
    name: 'Dr. Aditya Sharma',
    specialty: 'Senior Cardiologist',
    experience: '18 Years',
    rating: 4.9,
    reviews: 342,
    schedule: 'Mon, Wed, Fri • 09:00AM–02:00PM',
    tag: 'MBBS, MD, DM Cardiology',
    available: true,
    initials: 'AS',
    color: 'from-rose-500 to-rose-650',
  },
  {
    name: 'Dr. Priya Mehta',
    specialty: 'Senior Neurologist',
    experience: '14 Years',
    rating: 4.8,
    reviews: 218,
    schedule: 'Tue, Thu, Sat • 10:00AM–03:00PM',
    tag: 'MBBS, MD Neurology',
    available: true,
    initials: 'PM',
    color: 'from-brand-primary to-brand-primary/90',
  },
  {
    name: 'Dr. Rajesh Kumar',
    specialty: 'Orthopedic Surgeon',
    experience: '20 Years',
    rating: 4.9,
    reviews: 456,
    schedule: 'Mon–Fri • 08:00AM–01:00PM',
    tag: 'MBBS, MS Orthopedics',
    available: false,
    initials: 'RK',
    color: 'from-amber-500 to-amber-600',
  },
  {
    name: 'Dr. Sunita Rao',
    specialty: 'Pediatric Specialist',
    experience: '12 Years',
    rating: 4.7,
    reviews: 189,
    schedule: 'Mon, Wed, Fri • 11:00AM–04:00PM',
    tag: 'MBBS, MD Pediatrics',
    available: true,
    initials: 'SR',
    color: 'from-pink-500 to-purple-650',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 25 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function DoctorsSection() {
  return (
    <section id="doctors" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute right-0 top-1/4 w-[400px] h-[400px] bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container-xl mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/5 border border-brand-primary/10 rounded-full text-brand-primary text-xs font-bold uppercase tracking-wider mb-6">
            Expert Consultant Team
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight font-display mb-5">
            Meet Our Specialists
          </h2>
          <p className="text-slate-500 text-base md:text-lg leading-relaxed font-sans">
            Board-certified directors and dedicated clinical consultants with decades of combined intensive-care expertise.
          </p>
        </div>

        {/* Doctors Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {doctors.map((doc) => (
            <motion.div
              key={doc.name}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
              className="group bg-white rounded-[24px] border border-slate-250/70 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Banner & Initials */}
                <div className={`relative h-44 bg-gradient-to-br ${doc.color} flex items-center justify-center overflow-hidden`}>
                  <div className="absolute inset-0 opacity-10 dot-grid pointer-events-none" />
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/40 flex items-center justify-center text-white text-2xl font-black font-display shadow-lg">
                    {doc.initials}
                  </div>
                  
                  {/* Available badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full ${
                      doc.available ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-slate-400'
                    }`}>
                      {doc.available ? 'Duty Active' : 'Off Duty'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="font-black text-[#0F172A] text-base leading-snug group-hover:text-brand-primary transition-colors font-display">{doc.name}</h3>
                    <p className="text-brand-primary text-xs font-extrabold mt-1 uppercase tracking-wider">{doc.specialty}</p>
                    <p className="text-slate-400 text-[9px] font-bold mt-2 bg-slate-50 border border-slate-100 rounded px-2.5 py-1 w-fit">{doc.tag}</p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4 bg-slate-50 p-2 border border-slate-100 rounded-xl w-fit">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={i < Math.floor(doc.rating) ? 'text-amber-450 fill-amber-450' : 'text-slate-200 fill-slate-200'}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] font-black text-slate-700">{doc.rating}</span>
                    <span className="text-[9px] text-slate-400 font-bold">({doc.reviews} reviews)</span>
                  </div>

                  {/* Info list */}
                  <div className="space-y-2 border-t border-slate-100 pt-4 font-sans text-xs">
                    <div className="flex items-center gap-2 text-slate-650 font-semibold">
                      <Users size={12} className="text-slate-400 flex-shrink-0" />
                      <span className="text-slate-800 font-black">{doc.experience}</span> Experience
                    </div>
                    <div className="flex items-start gap-2 text-slate-500 font-medium">
                      <Calendar size={12} className="flex-shrink-0 mt-0.5 text-slate-400" />
                      <span className="leading-snug text-slate-600 font-semibold">{doc.schedule}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Book button */}
              <div className="p-6 pt-0">
                <Link
                  href="/#appointment"
                  className="w-full flex items-center justify-center gap-1.5 py-3.5 bg-[#0F172A] hover:bg-brand-primary text-white text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all duration-200 shadow-sm"
                >
                  Book Consultation
                  <ChevronRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer info link */}
        <div className="text-center mt-12">
          <Link href="/doctors" className="inline-flex items-center gap-1.5 text-brand-primary font-black hover:text-brand-primary/80 transition text-xs uppercase tracking-wider group">
            View All 50+ Consultants
            <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
