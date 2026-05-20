'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, Mail, Lock, Eye, EyeOff, Shield, ArrowRight, Sparkles, Activity, AlertCircle, Stethoscope, User, Briefcase, Database, Cpu, HardDrive, Key } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';

export default function MISLoginPage() {
  const router = useRouter();
  const { login, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Real-time interactive states
  const [loginMode, setLoginMode] = useState<'passkey' | 'classic'>('passkey');
  const [selectedRole, setSelectedRole] = useState<'Admin' | 'Doctor' | 'Nurse' | 'Staff' | null>(null);
  const [capsLock, setCapsLock] = useState(false);
  const [activeTab, setActiveTab] = useState<'credentials' | 'sso'>('credentials');
  
  // Real-time vitals and statistics simulation
  const [liveVitals, setLiveVitals] = useState({ hr: 72, bp: '120/80', temp: '98.6' });
  const [sysLoad, setSysLoad] = useState(12);

  // Fluctuating real-time stats for the live terminal
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveVitals({
        hr: Math.floor(Math.random() * (85 - 68) + 68),
        bp: `${Math.floor(Math.random() * (128 - 116) + 116)}/${Math.floor(Math.random() * (84 - 76) + 76)}`,
        temp: (Math.random() * (98.9 - 98.2) + 98.2).toFixed(1)
      });
      setSysLoad(Math.floor(Math.random() * (18 - 8) + 8));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Listen to Caps Lock
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.getModifierState('CapsLock')) {
      setCapsLock(true);
    } else {
      setCapsLock(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Execute the unified login hook (handles Firebase, Express DB, unique IDs, and local mock fallbacks internally)
      await login(email, password);
    } catch (err: any) {
      setError(err.message || 'Invalid passkey or credentials. Check your code.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      await loginWithGoogle();
    } catch (err: any) {
      setError(err.message || 'Google Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  const quickFill = (role: 'Admin' | 'Doctor' | 'Nurse' | 'Staff') => {
    setSelectedRole(role);
    const passkeys: Record<string, string> = {
      Admin: 'MED-ADM-777',
      Doctor: 'MED-DOC-888',
      Nurse: 'MED-NUR-999',
      Staff: 'MED-STF-111',
    };
    
    const creds: Record<string, [string, string]> = {
      Admin: ['admin@mediflow.com', 'admin123'],
      Doctor: ['doctor@mediflow.com', 'doctor123'],
      Nurse: ['nurse@mediflow.com', 'nurse123'],
      Staff: ['staff@mediflow.com', 'staff123'],
    };

    if (loginMode === 'passkey') {
      setEmail(passkeys[role]);
      setPassword(passkeys[role]);
    } else {
      setEmail(creds[role][0]);
      setPassword(creds[role][1]);
    }
  };

  // Recognize demo credentials in real-time
  const isDemoCredential = () => {
    const demos = ['MED-ADM-777', 'MED-DOC-888', 'MED-NUR-999', 'MED-STF-111', 'admin@mediflow.com', 'doctor@mediflow.com', 'nurse@mediflow.com', 'staff@mediflow.com'];
    return demos.includes(email.toUpperCase().trim());
  };

  // Calculate password/passkey strength in real-time
  const getPasswordStrength = () => {
    const textToEvaluate = loginMode === 'passkey' ? email : password;
    if (!textToEvaluate) return { score: 0, label: 'Enter security code', color: 'bg-slate-700', text: 'text-slate-400' };
    
    // Passkey evaluation (highly secure unique standard formats)
    if (loginMode === 'passkey') {
      const isFormat = /^MED-[A-Z]{3}-\d{3}$/i.test(textToEvaluate);
      if (isFormat) {
        return { score: 5, label: 'Clinician Verified Protocol', color: 'bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.6)]', text: 'text-cyan-400' };
      }
      if (textToEvaluate.length >= 6) {
        return { score: 3, label: 'Standard Passkey', color: 'bg-amber-500', text: 'text-amber-400' };
      }
      return { score: 1, label: 'Incomplete Protocol', color: 'bg-rose-500', text: 'text-rose-400' };
    }

    // Classic Password evaluation
    let score = 0;
    if (textToEvaluate.length >= 6) score += 1;
    if (textToEvaluate.length >= 8) score += 1;
    if (/[A-Z]/.test(textToEvaluate)) score += 1;
    if (/[0-9]/.test(textToEvaluate)) score += 1;
    if (/[^A-Za-z0-9]/.test(textToEvaluate)) score += 1;

    if (score <= 1) return { score, label: 'Weak Protocol', color: 'bg-rose-500', text: 'text-rose-400' };
    if (score <= 3) return { score, label: 'Standard Protocol', color: 'bg-amber-500', text: 'text-amber-400' };
    if (score <= 4) return { score, label: 'Secure Protocol', color: 'bg-emerald-500', text: 'text-emerald-400' };
    return { score, label: 'Ultra-Secure Protocol', color: 'bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.6)]', text: 'text-cyan-400' };
  };

  const strength = getPasswordStrength();
  // Verified responsive telemetry layout and dynamic color themes

  // Dynamic theme colors depending on selected role
  const getThemeColors = () => {
    switch (selectedRole) {
      case 'Admin':
        return {
          glow: 'from-amber-500/20 to-indigo-500/20',
          border: 'border-amber-500/30',
          accent: 'text-amber-400',
          badge: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
          button: 'bg-gradient-to-r from-amber-500 to-indigo-650 hover:from-amber-600 hover:to-indigo-750 shadow-amber-500/20',
          bgBlur: 'bg-amber-500/5'
        };
      case 'Doctor':
        return {
          glow: 'from-blue-500/20 to-cyan-500/20',
          border: 'border-blue-500/30',
          accent: 'text-blue-400',
          badge: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
          button: 'bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 shadow-blue-500/20',
          bgBlur: 'bg-blue-500/5'
        };
      case 'Nurse':
        return {
          glow: 'from-emerald-500/20 to-teal-500/20',
          border: 'border-emerald-500/30',
          accent: 'text-emerald-400',
          badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
          button: 'bg-gradient-to-r from-emerald-500 to-teal-650 hover:from-emerald-600 hover:to-teal-750 shadow-emerald-500/20',
          bgBlur: 'bg-emerald-500/5'
        };
      case 'Staff':
        return {
          glow: 'from-fuchsia-500/20 to-violet-500/20',
          border: 'border-fuchsia-500/30',
          accent: 'text-fuchsia-400',
          badge: 'bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/20',
          button: 'bg-gradient-to-r from-fuchsia-500 to-violet-600 hover:from-fuchsia-600 hover:to-violet-700 shadow-fuchsia-500/20',
          bgBlur: 'bg-fuchsia-500/5'
        };
      default:
        return {
          glow: 'from-blue-500/10 to-indigo-500/10',
          border: 'border-slate-800',
          accent: 'text-blue-400',
          badge: 'bg-slate-800 text-slate-400 border-slate-700',
          button: 'bg-gradient-to-r from-blue-600 to-indigo-650 hover:from-blue-700 hover:to-indigo-700 shadow-blue-500/10',
          bgBlur: 'bg-slate-900/40'
        };
    }
  };

  const theme = getThemeColors();

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center relative overflow-hidden px-4 py-8 select-none font-sans">
      {/* Interactive Radial Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black z-0" />
      
      {/* Dynamic Animated Ambient Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 40, 0],
          y: [0, -20, 0]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className={`absolute top-1/4 right-1/4 w-[450px] h-[450px] rounded-full blur-[140px] bg-gradient-to-tr ${theme.glow} opacity-40 z-0 pointer-events-none transition-all duration-1000`}
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -30, 0],
          y: [0, 30, 0]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute bottom-1/4 left-1/4 w-[380px] h-[380px] rounded-full blur-[120px] bg-teal-500/10 opacity-30 z-0 pointer-events-none"
      />

      <div className="relative z-10 w-full max-w-6xl grid lg:grid-cols-12 gap-8 items-center">
        
        {/* LEFT COLUMN: Modern Clinical Telemetry Display */}
        <div className="hidden lg:flex lg:col-span-5 flex-col gap-6 text-white self-stretch justify-center h-full pr-4">
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform duration-300">
                <Heart size={22} className="text-white" fill="white" />
              </div>
              <span className="text-3xl font-extrabold tracking-tight text-white">
                MediFlow <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 text-xl font-bold">MIS Terminal</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Secure administrative gateway & intelligent clinical coordination workspace. Authorised hospital personnel only.
            </p>
          </div>

          {/* Interactive Live Workstation Monitor */}
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 relative overflow-hidden flex-1 shadow-2xl flex flex-col justify-between min-h-[350px]">
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
            
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <div className="flex items-center gap-2.5">
                <Cpu size={16} className={theme.accent + " animate-pulse transition-colors duration-500"} />
                <span className="text-[11px] font-extrabold tracking-widest text-slate-400 uppercase">SYS STATUS: ACTIVE</span>
              </div>
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            </div>

            {/* Vitals Telemetry Box */}
            <div className="space-y-4 py-4">
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Station Node</p>
                <motion.p
                  key={selectedRole}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-lg font-black tracking-wide text-white mt-0.5"
                >
                  {selectedRole ? `${selectedRole} Terminal` : 'Idle Workstation'}
                </motion.p>
              </div>

              {/* Dynamic stats */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-950/40 border border-slate-800/50 rounded-xl p-3">
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Telemetry Sim</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Activity size={12} className="text-red-400 animate-bounce" />
                    <span className="text-xs font-mono font-bold text-slate-200">{liveVitals.hr} BPM</span>
                  </div>
                </div>
                <div className="bg-slate-950/40 border border-slate-800/50 rounded-xl p-3">
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Est. Response</p>
                  <div className="flex items-center gap-2 mt-1">
                    <HardDrive size={12} className="text-teal-400" />
                    <span className="text-xs font-mono font-bold text-slate-200">{sysLoad}ms</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Futuristic terminal details */}
            <div className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-4 font-mono text-[10px] text-slate-400 space-y-1.5 shadow-inner">
              <div className="flex justify-between">
                <span>[GATEWAY IP]</span>
                <span className="text-slate-300">192.168.1.104</span>
              </div>
              <div className="flex justify-between">
                <span>[PG DB SYNC]</span>
                <span className="text-emerald-400 font-bold">ONLINE</span>
              </div>
              <div className="flex justify-between">
                <span>[JWT ENCRYPTION]</span>
                <span className="text-blue-400">HS256 DIRECT</span>
              </div>
              <div className="flex justify-between">
                <span>[DEMO BYPASS KEY]</span>
                <span className="text-cyan-400 font-semibold">MED-XXX-XXX</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Premium Staff Login Form Card */}
        <div className="lg:col-span-7 flex justify-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`w-full max-w-lg bg-slate-900/50 backdrop-blur-2xl border ${theme.border} rounded-3xl p-8 shadow-2xl relative overflow-hidden transition-all duration-1000`}
          >
            {/* Ambient border inner glow */}
            <div className={`absolute -top-[1px] -left-[1px] -right-[1px] h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent pointer-events-none transition-colors duration-1000`} />
            
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  <Shield size={20} className="animate-pulse" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold tracking-tight text-white">Staff Authentication</h2>
                  <p className="text-[11px] text-slate-400 font-medium">Verify single access key to start session</p>
                </div>
              </div>
              
              {/* Dynamic Badge */}
              <AnimatePresence mode="wait">
                <motion.span
                  key={selectedRole || 'visitor'}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={`text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-full border ${theme.badge} transition-all duration-1000`}
                >
                  {selectedRole || 'Awaiting Key'}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Quick Fill Credentials Panel */}
            <div className="mb-6 bg-slate-950/40 border border-slate-800/80 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
                  <Sparkles size={11} className="text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
                  Quick Fill Clinician Passkey
                </span>
                <span className="text-[9px] font-bold text-slate-500 italic">One-click simulation</span>
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                {[
                  { role: 'Admin', icon: Shield },
                  { role: 'Doctor', icon: Stethoscope },
                  { role: 'Nurse', icon: Heart },
                  { role: 'Staff', icon: User }
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = selectedRole === item.role;
                  return (
                    <button
                      key={item.role}
                      type="button"
                      onClick={() => quickFill(item.role as any)}
                      className={`py-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all duration-300 cursor-pointer ${
                        isSelected 
                          ? 'bg-blue-500/10 border-blue-500 text-blue-300 shadow-md shadow-blue-500/5' 
                          : 'bg-white/[0.02] border-slate-800 text-slate-400 hover:bg-white/[0.06] hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <Icon size={14} className={isSelected ? 'text-blue-400' : 'text-slate-500'} />
                      <span className="text-[10px] font-extrabold tracking-wide">{item.role}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive Form Tabs (SSO vs Email) */}
            <div className="flex border-b border-slate-800/85 mb-6">
              <button
                type="button"
                onClick={() => setActiveTab('credentials')}
                className={`pb-2.5 px-4 text-xs font-bold transition-all relative ${
                  activeTab === 'credentials' ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                Clinician Credentials
                {activeTab === 'credentials' && (
                  <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500" />
                )}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('sso')}
                className={`pb-2.5 px-4 text-xs font-bold transition-all relative ${
                  activeTab === 'sso' ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                Single Sign-On (SSO)
                {activeTab === 'sso' && (
                  <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500" />
                )}
              </button>
            </div>

            {activeTab === 'credentials' ? (
              <form onSubmit={handleLogin} onKeyDown={handleKeyDown} className="space-y-5">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold px-4 py-3.5 rounded-xl flex items-start gap-2"
                  >
                    <AlertCircle size={15} className="flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </motion.div>
                )}

                {loginMode === 'passkey' ? (
                  /* SINGLE ACCESS PASSKEY INPUT MODE (ULTRA-SIMPLIFIED & HIGHLY SECURE) */
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom duration-350">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-slate-400 text-xs font-bold flex items-center gap-1.5">
                          <Key size={13} className="text-blue-400" />
                          Secure Clinician Passkey
                        </span>
                        {isDemoCredential() && (
                          <span className="text-[9px] font-extrabold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                            Secure Key Recognized
                          </span>
                        )}
                      </div>
                      
                      <div className="relative group">
                        <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                        <input
                          type={showPw ? 'text' : 'password'}
                          required
                          value={email}
                          onChange={(e) => {
                            const val = e.target.value;
                            setEmail(val);
                            setPassword(val); // In passkey mode, password holds the same passkey value
                            
                            // Auto detect role matching passkeys
                            const formattedVal = val.trim().toUpperCase();
                            const matchingRole = Object.entries({
                              Admin: 'MED-ADM-777',
                              Doctor: 'MED-DOC-888',
                              Nurse: 'MED-NUR-999',
                              Staff: 'MED-STF-111',
                            }).find(([_, passkey]) => passkey === formattedVal);
                            
                            if (matchingRole) {
                              setSelectedRole(matchingRole[0] as any);
                            } else {
                              setSelectedRole(null);
                            }
                          }}
                          placeholder="e.g. MED-DOC-888"
                          className="w-full bg-slate-950/60 border border-slate-800 hover:border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15 text-white placeholder-slate-600 rounded-xl pl-11 pr-12 py-4 text-base focus:outline-none transition-all duration-300 font-mono tracking-widest text-center uppercase"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPw(!showPw)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-200 transition-colors cursor-pointer"
                        >
                          {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* CLASSIC DUAL FIELD MODE (EMAIL & PASSWORD) */
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom duration-350">
                    {/* Email Field */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-slate-400 text-xs font-bold">Email Registry</label>
                        {isDemoCredential() && (
                          <span className="text-[9px] font-extrabold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                            Demo Account Verified
                          </span>
                        )}
                      </div>
                      <div className="relative group">
                        <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            const matchingRole = Object.entries({
                              Admin: 'admin@mediflow.com',
                              Doctor: 'doctor@mediflow.com',
                              Nurse: 'nurse@mediflow.com',
                              Staff: 'staff@mediflow.com',
                            }).find(([_, val]) => val === e.target.value.toLowerCase());
                            if (matchingRole) setSelectedRole(matchingRole[0] as any);
                          }}
                          placeholder="e.g. physician@mediflow.com"
                          className="w-full bg-slate-950/60 border border-slate-800 hover:border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15 text-white placeholder-slate-600 rounded-xl pl-11 pr-4 py-3.5 text-sm focus:outline-none transition-all duration-300"
                        />
                      </div>
                    </div>

                    {/* Password Field */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-slate-400 text-xs font-bold">Access Password Key</label>
                        
                        {/* Live Caps Lock Warning */}
                        {capsLock && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-[9px] font-extrabold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full flex items-center gap-1 border border-amber-500/20"
                          >
                            ⚠️ CAPS LOCK ACTIVE
                          </motion.span>
                        )}
                      </div>
                      <div className="relative group">
                        <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                        <input
                          type={showPw ? 'text' : 'password'}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full bg-slate-950/60 border border-slate-800 hover:border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15 text-white placeholder-slate-600 rounded-xl pl-11 pr-12 py-3.5 text-sm focus:outline-none transition-all duration-300"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPw(!showPw)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-200 transition-colors cursor-pointer"
                        >
                          {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Password/Passkey Strength Meter & Live Feedback */}
                {(loginMode === 'passkey' ? email : password) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-3 space-y-1.5 overflow-hidden"
                  >
                    <div className="flex items-center justify-between text-[10px] font-bold">
                      <span className="text-slate-500 uppercase">Access Cryptography Check:</span>
                      <span className={strength.text}>{strength.label}</span>
                    </div>
                    
                    {/* Interactive Progress Bar */}
                    <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((step) => (
                        <div
                          key={step}
                          className={`h-full flex-1 rounded-full transition-all duration-500 ${
                            strength.score >= step ? strength.color : 'bg-slate-950'
                          }`}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Toggle Login Mode */}
                <div className="flex justify-between items-center text-xs pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setLoginMode(loginMode === 'passkey' ? 'classic' : 'passkey');
                      setEmail('');
                      setPassword('');
                      setSelectedRole(null);
                    }}
                    className="text-blue-400 hover:text-blue-300 font-bold transition duration-200 cursor-pointer text-[11px] flex items-center gap-1"
                  >
                    <span>➔</span>
                    <span>
                      {loginMode === 'passkey' ? 'Use traditional Email & Password' : 'Use Secured Clinician Passkey'}
                    </span>
                  </button>
                </div>

                {/* Submit button */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 ${theme.button} disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-black rounded-xl transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 cursor-pointer duration-300`}
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                  ) : (
                    <>
                      Verify and Open Session
                      <ArrowRight size={15} />
                    </>
                  )}
                </motion.button>
              </form>
            ) : (
              <div className="space-y-4 py-2 animate-in fade-in duration-300">
                <p className="text-xs text-slate-400 text-center leading-relaxed max-w-sm mx-auto mb-4">
                  For federated access using Google Health Network or secure enterprise SSO, proceed with authentication below.
                </p>
                
                {/* Premium Federated Google Auth Button */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full py-3.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-3 cursor-pointer shadow-lg shadow-black/25"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#EA4335"
                      d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.535 0-6.4-2.865-6.4-6.4s2.865-6.4 6.4-6.4c1.558 0 2.973.564 4.07 1.498l3.078-3.078C18.995 2.1 15.82 1 12.24 1 5.922 1 12s4.922 11 11.24 11c6.702 0 11.24-4.708 11.24-11.24 0-.756-.07-1.485-.2-2.185H12.24z"
                    />
                  </svg>
                  Sign In with Google Health Workspace
                </motion.button>
              </div>
            )}

            {/* Back Button */}
            <p className="text-center text-slate-500 text-xs mt-8">
              <Link href="/" className="hover:text-blue-400 transition-colors inline-flex items-center gap-1.5 font-bold">
                <span>←</span>
                <span>Return to Patient Portal Home</span>
              </Link>
            </p>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
