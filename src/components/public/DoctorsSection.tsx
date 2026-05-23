'use client';

import { Star, Calendar, ChevronRight, Users, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const doctors = [
  {
    name: 'Dr. Aditya Sharma',
    specialty: 'Senior Cardiologist',
    experience: '18 Years',
    rating: 4.9,
    reviews: 342,
    schedule: 'Mon, Wed, Fri • 9AM–2PM',
    tag: 'MBBS, MD, DM Cardiology',
    available: true,
    initials: 'AS',
    color: 'from-rose-500 to-red-650',
  },
  {
    name: 'Dr. Priya Mehta',
    specialty: 'Neurologist',
    experience: '14 Years',
    rating: 4.8,
    reviews: 218,
    schedule: 'Tue, Thu, Sat • 10AM–3PM',
    tag: 'MBBS, MD Neurology',
    available: true,
    initials: 'PM',
    color: 'from-blue-500 to-indigo-650',
  },
  {
    name: 'Dr. Rajesh Kumar',
    specialty: 'Orthopedic Surgeon',
    experience: '20 Years',
    rating: 4.9,
    reviews: 456,
    schedule: 'Mon–Fri • 8AM–1PM',
    tag: 'MBBS, MS Orthopedics',
    available: false,
    initials: 'RK',
    color: 'from-amber-500 to-orange-650',
  },
  {
    name: 'Dr. Sunita Rao',
    specialty: 'Pediatric Specialist',
    experience: '12 Years',
    rating: 4.7,
    reviews: 189,
    schedule: 'Mon, Wed, Fri • 11AM–4PM',
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
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function DoctorsSection() {
  return (
    <section id="doctors" className="py-24 bg-[#F8FAFC] relative overflow-hidden">
      <div className="absolute right-0 top-1/4 w-[400px] h-[400px] bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="container-xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-blue-700 text-sm font-semibold mb-6">
            Our Specialist Team
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight mb-4">
            Meet Our Expert Consultants
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed">
            Board-certified specialists with decades of experience, committed to delivering compassionate, evidence-based care.
          </p>
        </div>

        {/* Doctor Cards */}
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
              className="group bg-white rounded-3.5xl border border-slate-150/70 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Avatar Banner */}
                <div className={`relative h-44 bg-gradient-to-br ${doc.color} flex items-center justify-center overflow-hidden`}>
                  <div className="absolute inset-0 opacity-15 dot-grid pointer-events-none" />
                  <div className="w-22 h-22 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/40 flex items-center justify-center text-white text-2.5xl font-black shadow-lg">
                    {doc.initials}
                  </div>
                  
                  {/* Available badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full ${
                      doc.available ? 'bg-emerald-500 text-white shadow-sm' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {doc.available ? 'Active' : 'On Leave'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="font-black text-[#0F172A] text-lg leading-snug group-hover:text-blue-600 transition-colors">{doc.name}</h3>
                    <p className="text-blue-600 text-xs font-extrabold mt-0.5 uppercase tracking-wider">{doc.specialty}</p>
                    <p className="text-slate-400 text-[10px] font-semibold mt-1 bg-slate-50 border border-slate-100 rounded px-2 py-0.5 w-fit">{doc.tag}</p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4 bg-slate-50/50 p-2 border border-slate-100 rounded-2xl w-fit">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={13}
                          className={i < Math.floor(doc.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-black text-slate-700">{doc.rating}</span>
                    <span className="text-[10px] text-slate-400 font-medium">({doc.reviews})</span>
                  </div>

                  {/* Info */}
                  <div className="space-y-2 border-t border-slate-100/80 pt-4">
                    <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold">
                      <Users size={13} className="text-slate-400" />
                      <span className="text-slate-900 font-extrabold">{doc.experience}</span> Experience
                    </div>
                    <div className="flex items-start gap-2 text-xs text-slate-500 font-medium">
                      <Calendar size={13} className="flex-shrink-0 mt-0.5 text-slate-400" />
                      <span className="leading-snug">{doc.schedule}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="p-6 pt-0">
                <Link
                  href="/#appointment"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-slate-900 hover:bg-blue-600 text-white text-xs font-extrabold rounded-xl transition-all duration-300 group-hover:bg-blue-600 shadow-sm"
                >
                  Book Consultation
                  <ChevronRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <Link href="/doctors" className="inline-flex items-center gap-2 text-blue-600 font-extrabold hover:text-blue-750 transition text-sm group">
            View All 50+ Doctors
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
