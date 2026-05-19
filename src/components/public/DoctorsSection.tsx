'use client';

import { Star, Calendar, ChevronRight } from 'lucide-react';
import Link from 'next/link';

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
    color: 'from-red-400 to-rose-600',
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
    color: 'from-blue-400 to-indigo-600',
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
    color: 'from-amber-400 to-orange-600',
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
    color: 'from-pink-400 to-purple-600',
  },
];

export default function DoctorsSection() {
  return (
    <section id="doctors" className="py-24 bg-[#F8FAFC]">
      <div className="container-xl mx-auto px-4">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-blue-700 text-sm font-semibold mb-6">
            Our Medical Team
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight mb-4">
            Meet Our Expert Doctors
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed">
            Board-certified specialists with decades of experience, committed to delivering compassionate, evidence-based care.
          </p>
        </div>

        {/* Doctor Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doc) => (
            <div
              key={doc.name}
              className="group bg-white rounded-3xl border border-slate-100 overflow-hidden card-float hover:shadow-xl"
            >
              {/* Avatar */}
              <div className={`relative h-40 bg-gradient-to-br ${doc.color} flex items-center justify-center`}>
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center text-white text-2xl font-black">
                  {doc.initials}
                </div>
                {/* Available badge */}
                <div className={`absolute top-4 right-4 text-[10px] font-bold px-2.5 py-1 rounded-full ${
                  doc.available ? 'bg-emerald-400 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {doc.available ? 'Available' : 'Busy'}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="mb-3">
                  <h3 className="font-black text-[#0F172A] text-base">{doc.name}</h3>
                  <p className="text-blue-600 text-xs font-bold mt-0.5">{doc.specialty}</p>
                  <p className="text-slate-400 text-[10px] mt-0.5">{doc.tag}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={i < Math.floor(doc.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-700">{doc.rating}</span>
                  <span className="text-[10px] text-slate-400">({doc.reviews} reviews)</span>
                </div>

                {/* Info */}
                <div className="space-y-1.5 mb-4">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <span className="font-semibold text-slate-900">{doc.experience}</span> experience
                  </div>
                  <div className="flex items-start gap-2 text-xs text-slate-500">
                    <Calendar size={11} className="flex-shrink-0 mt-0.5" />
                    {doc.schedule}
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href="/#appointment"
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-[#0F172A] hover:bg-blue-600 text-white text-xs font-bold rounded-xl transition-all duration-200 group-hover:bg-blue-600"
                >
                  Book Appointment
                  <ChevronRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/doctors" className="inline-flex items-center gap-2 text-blue-600 font-bold hover:underline text-sm">
            View all 50+ Doctors
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
