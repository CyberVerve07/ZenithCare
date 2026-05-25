'use client';

import { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    name: 'Riya Sharma',
    location: 'Hyderabad',
    rating: 5,
    text: 'MediFlow completely changed my healthcare experience. Booking an appointment was incredibly easy, the doctors were world-class, and the entire process felt seamless and premium.',
    dept: 'Cardiology',
    initials: 'RS',
    color: 'from-rose-400 to-rose-500',
  },
  {
    name: 'Arun Patel',
    location: 'Bangalore',
    rating: 5,
    text: 'I was amazed by the level of care and attention I received. The neurology team diagnosed my condition within hours. Modern technology combined with genuine compassion.',
    dept: 'Neurology',
    initials: 'AP',
    color: 'from-brand-primary to-brand-primary/80',
  },
  {
    name: 'Meena Krishnan',
    location: 'Chennai',
    rating: 5,
    text: "My daughter's pediatric care here was exceptional. The doctors took time to explain everything, the facility was spotless, and the online booking system is brilliant.",
    dept: 'Pediatrics',
    initials: 'MK',
    color: 'from-pink-400 to-pink-500',
  },
  {
    name: 'Vikram Singh',
    location: 'Mumbai',
    rating: 5,
    text: 'After my orthopedic surgery, the recovery support and follow-up process was outstanding. The MediFlow team truly cares about long-term patient outcomes.',
    dept: 'Orthopedics',
    initials: 'VS',
    color: 'from-amber-400 to-amber-500',
  },
];

const faqs = [
  { q: 'How do I book an appointment?', a: 'You can book online through our website, call our helpline at 1800-MEDFLOW, or visit the hospital registration desk directly. Online booking is available 24/7.' },
  { q: 'What documents should I bring?', a: 'Please bring a valid government ID, your health insurance card (if applicable), previous medical records, and a list of current medications.' },
  { q: 'Is emergency care available 24/7?', a: 'Yes, our Emergency Department operates 24 hours a day, 7 days a week, 365 days a year, including all holidays. Advanced trauma care is available round the clock.' },
  { q: 'Do you accept health insurance?', a: 'We accept all major health insurance providers including Star Health, HDFC Ergo, ICICI Lombard, Bajaj Allianz, and more. Cashless treatment is available for most policies.' },
  { q: 'Can I get lab test reports online?', a: 'Yes! Lab reports are available on our patient portal within 24-48 hours of sample collection. You will receive an SMS alert when your report is ready.' },
];

export default function TestimonialsAndFAQ() {
  const [active, setActive] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* Testimonials Slider */}
      <section id="testimonials" className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="container-xl mx-auto px-4">
          
          <div className="max-w-2xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/5 border border-brand-primary/10 rounded-full text-brand-primary text-xs font-bold uppercase tracking-wider mb-6">
              Patient Testimonials
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight font-display mb-4">
              Trusted by Thousands
            </h2>
          </div>

          {/* Testimonial slider card */}
          <div className="max-w-3xl mx-auto bg-white rounded-[28px] border border-slate-200/60 shadow-xl p-8 md:p-10 relative">
            <Quote size={40} className="text-slate-100 absolute top-8 left-8" />
            
            <div className="relative z-10">
              {/* Rating */}
              <div className="flex items-center gap-1 mb-5">
                {[...Array(testimonials[active].rating)].map((_, i) => (
                  <Star key={i} size={15} className="text-amber-450 fill-amber-450" />
                ))}
              </div>

              {/* Text */}
              <p className="text-base md:text-lg text-slate-700 leading-relaxed italic mb-8 font-medium">
                "{testimonials[active].text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonials[active].color} flex items-center justify-center text-white font-black text-sm`}>
                  {testimonials[active].initials}
                </div>
                <div>
                  <p className="font-black text-[#0F172A] text-sm font-display">{testimonials[active].name}</p>
                  <p className="text-xs text-slate-400 font-semibold">{testimonials[active].location} · {testimonials[active].dept} ward patient</p>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="absolute bottom-8 right-8 flex items-center gap-2.5">
              <button
                onClick={() => setActive((a) => (a - 1 + testimonials.length) % testimonials.length)}
                className="w-9.5 h-9.5 rounded-xl border border-slate-200 hover:bg-slate-50 flex items-center justify-center transition-colors text-slate-650"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setActive((a) => (a + 1) % testimonials.length)}
                className="w-9.5 h-9.5 rounded-xl bg-brand-primary hover:bg-brand-primary/95 text-white flex items-center justify-center transition-colors shadow-sm"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2.5 mt-6">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                onClick={() => setActive(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === active ? 'bg-brand-primary w-5' : 'bg-slate-350'}`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* FAQ Accordion */}
      <section id="faq" className="py-24 bg-white relative overflow-hidden">
        <div className="container-xl mx-auto px-4 max-w-3xl">
          
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/5 border border-brand-primary/10 rounded-full text-brand-primary text-xs font-bold uppercase tracking-wider mb-6">
              Common Inquiries
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight font-display">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`border rounded-[20px] overflow-hidden transition-all duration-300 ${
                  openFaq === i 
                    ? 'border-brand-primary/20 bg-brand-primary/5' 
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4.5 text-left transition-colors font-display"
                >
                  <span className="font-extrabold text-[#0F172A] text-sm">{faq.q}</span>
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ml-4 transition-all duration-300 ${openFaq === i ? 'bg-brand-primary rotate-185' : 'bg-slate-100'}`}>
                    <ChevronRight size={13} className={`transition-all duration-300 ${openFaq === i ? 'text-white rotate-90' : 'text-slate-500'}`} />
                  </div>
                </button>
                
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-xs text-slate-500 leading-relaxed font-sans font-medium">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
