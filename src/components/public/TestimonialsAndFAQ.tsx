'use client';

import { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Riya Sharma',
    location: 'Hyderabad',
    rating: 5,
    text: 'MediFlow completely changed my healthcare experience. Booking an appointment was incredibly easy, the doctors were world-class, and the entire process felt seamless and premium.',
    dept: 'Cardiology',
    initials: 'RS',
    color: 'from-red-400 to-rose-500',
  },
  {
    name: 'Arun Patel',
    location: 'Bangalore',
    rating: 5,
    text: 'I was amazed by the level of care and attention I received. The neurology team diagnosed my condition within hours. Modern technology combined with genuine compassion.',
    dept: 'Neurology',
    initials: 'AP',
    color: 'from-blue-400 to-indigo-500',
  },
  {
    name: 'Meena Krishnan',
    location: 'Chennai',
    rating: 5,
    text: 'My daughter\'s pediatric care here was exceptional. The doctors took time to explain everything, the facility was spotless, and the online booking system is brilliant.',
    dept: 'Pediatrics',
    initials: 'MK',
    color: 'from-pink-400 to-purple-500',
  },
  {
    name: 'Vikram Singh',
    location: 'Mumbai',
    rating: 5,
    text: 'After my orthopedic surgery, the recovery support and follow-up process was outstanding. The MediFlow team truly cares about long-term patient outcomes.',
    dept: 'Orthopedics',
    initials: 'VS',
    color: 'from-amber-400 to-orange-500',
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
      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-[#F8FAFC]">
        <div className="container-xl mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-blue-700 text-sm font-semibold mb-6">
              Patient Stories
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight mb-4">
              Trusted by Thousands
            </h2>
          </div>

          {/* Featured Testimonial */}
          <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-100 shadow-xl p-10 relative">
            <Quote size={40} className="text-blue-100 absolute top-8 left-8" />
            <div className="relative">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonials[active].rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-lg text-slate-700 leading-relaxed italic mb-8">
                "{testimonials[active].text}"
              </p>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonials[active].color} flex items-center justify-center text-white font-black`}>
                  {testimonials[active].initials}
                </div>
                <div>
                  <p className="font-black text-[#0F172A]">{testimonials[active].name}</p>
                  <p className="text-sm text-slate-400">{testimonials[active].location} · {testimonials[active].dept} Patient</p>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="absolute bottom-8 right-8 flex items-center gap-2">
              <button
                onClick={() => setActive((a) => (a - 1 + testimonials.length) % testimonials.length)}
                className="w-9 h-9 rounded-full border border-slate-200 hover:bg-slate-50 flex items-center justify-center transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setActive((a) => (a + 1) % testimonials.length)}
                className="w-9 h-9 rounded-full bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Thumbnail Nav */}
          <div className="flex justify-center gap-3 mt-6">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                onClick={() => setActive(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${i === active ? 'bg-blue-600 w-6' : 'bg-slate-300'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-white">
        <div className="container-xl mx-auto px-4 max-w-3xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-blue-700 text-sm font-semibold mb-6">
              Got Questions?
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
                  openFaq === i ? 'border-blue-200 bg-blue-50/30' : 'border-slate-200 bg-white'
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                >
                  <span className="font-bold text-[#0F172A] text-sm">{faq.q}</span>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ml-4 transition-all ${openFaq === i ? 'bg-blue-600 rotate-180' : 'bg-slate-100'}`}>
                    <ChevronRight size={14} className={`transition-all ${openFaq === i ? 'text-white rotate-90' : 'text-slate-500'}`} />
                  </div>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-sm text-slate-500 leading-relaxed">{faq.a}</p>
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
