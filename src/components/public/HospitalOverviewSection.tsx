'use client';

import { motion } from 'framer-motion';
import { Activity, ShieldAlert, Award, Clock, Star, Flame, Eye, Layers } from 'lucide-react';
import { useState, useEffect } from 'react';

const liveStats = [
  { label: 'Active ICU Beds', value: '42/45', sub: '93% occupancy', trend: 'Stable' },
  { label: 'ER Response Time', value: '2.4 Min', sub: 'Target <4 mins', trend: 'Optimal' },
  { label: 'Live ICU Telemetry', value: '184', sub: 'Monitored streams', trend: 'Active' },
  { label: 'Duty Doctors', value: '38', sub: 'In house right now', trend: 'Ready' },
];

const infrastructure = [
  {
    title: 'Hybrid Operating Rooms',
    desc: 'Equipped with real-time fluoroscopy, ultra-high-definition imaging, and surgical robotics.',
    metric: '3 Active Theaters',
    tag: 'Surgical Excellence',
  },
  {
    title: 'Level 1 Trauma Center',
    desc: 'Equipped for complex polytrauma with dedicated MRI/CT and immediate bypass protocols.',
    metric: '24/7 Direct Access',
    tag: 'Critical Care',
  },
  {
    title: 'Live Telemetry ICU Wards',
    desc: 'Continual AI-enhanced cardiac and pulmonary telemetry feed streamed to central hubs.',
    metric: '45 Intensive Beds',
    tag: 'Live Monitoring',
  },
];

export default function HospitalOverviewSection() {
  const [pulse, setPulse] = useState(72);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => p + (Math.random() > 0.5 ? 1 : -1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="overview" className="py-24 bg-white relative overflow-hidden">
      {/* Background radial gradients for glass effect */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-secondary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-xl mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/5 border border-brand-primary/10 rounded-full text-brand-primary text-xs font-bold uppercase tracking-wider mb-6"
          >
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            Hospital Live Status
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight font-display mb-6"
          >
            Smart Infrastructure. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent">Real-Time Clinical Telemetry.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto font-sans leading-relaxed"
          >
            We bridge the gap between advanced medical technology and compassionate care. Experience a medical ecosystem powered by real-time analytics and state-of-the-art facility oversight.
          </motion.p>
        </div>

        {/* Real-time Status Panel */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch mb-20">
          
          {/* Telemetry Panel */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-[24px] p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between border border-slate-800"
          >
            {/* Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-black tracking-widest text-emerald-400 uppercase">Live Systems Stream</span>
                </div>
                <div className="text-[10px] bg-slate-800 text-slate-400 font-bold px-2 py-1 rounded border border-slate-700/50">
                  Node: IND-HYD-04
                </div>
              </div>

              <div className="mb-8">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">Simulated Vitals</p>
                <div className="flex items-baseline gap-2.5">
                  <span className="text-5xl font-black text-white font-display tracking-tight">{pulse}</span>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">BPM (Normal)</span>
                </div>
              </div>

              {/* Heartbeat SVG Animation */}
              <div className="h-16 w-full opacity-60 mb-8 overflow-hidden relative">
                <svg viewBox="0 0 300 60" className="w-full h-full stroke-emerald-400 stroke-2 fill-none">
                  <path d="M 0 30 L 80 30 L 90 10 L 95 50 L 100 30 L 110 30 L 115 15 L 120 45 L 125 30 L 200 30 L 210 5 L 215 55 L 220 30 L 300 30" 
                    className="stroke-[2.5]"
                    style={{
                      strokeDasharray: '600',
                      strokeDashoffset: '0',
                      animation: 'shimmer 1.8s linear infinite',
                    }}
                  />
                </svg>
              </div>
            </div>

            <div className="bg-slate-800/50 border border-slate-700/40 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white">Central Vitals Command</p>
                <p className="text-[10px] text-slate-400 font-medium">All ICU units online and synchronized</p>
              </div>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-black px-2 py-1 rounded uppercase tracking-wider">
                Sync Status: OK
              </span>
            </div>
          </motion.div>

          {/* Core metrics Grid */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
            {liveStats.map((stat, idx) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white border border-slate-100 shadow-lg shadow-slate-100/40 rounded-[22px] p-6.5 flex flex-col justify-between hover:shadow-xl hover:border-slate-200 transition-all duration-300 relative group overflow-hidden"
              >
                {/* Floating blur hover element */}
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/5 via-brand-secondary/0 to-brand-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                <div className="flex justify-between items-start mb-6">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                  <span className="text-[10px] bg-brand-primary/5 text-brand-primary font-black px-2.5 py-1 rounded-full uppercase">
                    {stat.trend}
                  </span>
                </div>
                
                <div>
                  <p className="text-3xl font-black text-[#0F172A] font-display tracking-tight mb-1">{stat.value}</p>
                  <p className="text-[11px] text-slate-500 font-bold">{stat.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Infrastructure Highlights */}
        <div className="grid md:grid-cols-3 gap-6">
          {infrastructure.map((infra, idx) => (
            <motion.div 
              key={infra.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12 }}
              className="bg-slate-50/50 hover:bg-white rounded-[24px] border border-slate-100 hover:border-slate-200 hover:shadow-xl p-8 transition-all duration-400 group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] text-brand-secondary font-black uppercase tracking-widest bg-brand-secondary/5 px-3 py-1 rounded-full">
                  {infra.tag}
                </span>
                <span className="text-xs text-slate-400 font-extrabold">{infra.metric}</span>
              </div>
              <h3 className="text-lg font-black text-[#0F172A] font-display mb-3 group-hover:text-brand-primary transition-colors">
                {infra.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                {infra.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
