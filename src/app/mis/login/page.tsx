'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, Mail, Lock, Eye, EyeOff, Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function MISLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Demo credentials check
    const validCredentials: Record<string, string> = {
      'admin@mediflow.com': 'admin123',
      'doctor@mediflow.com': 'doctor123',
      'nurse@mediflow.com': 'nurse123',
      'staff@mediflow.com': 'staff123',
    };

    await new Promise((r) => setTimeout(r, 800)); // simulate API

    if (validCredentials[email] && validCredentials[email] === password) {
      router.push('/mis/dashboard');
    } else {
      setError('Invalid credentials. Check your email and password.');
    }
    setLoading(false);
  };

  const quickFill = (role: string) => {
    const creds: Record<string, [string, string]> = {
      Admin: ['admin@mediflow.com', 'admin123'],
      Doctor: ['doctor@mediflow.com', 'doctor123'],
      Nurse: ['nurse@mediflow.com', 'nurse123'],
      Staff: ['staff@mediflow.com', 'staff123'],
    };
    setEmail(creds[role][0]);
    setPassword(creds[role][1]);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center relative overflow-hidden px-4">
      {/* Background */}
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Heart size={20} className="text-white" fill="white" />
            </div>
            <span className="text-2xl font-black text-white">MediFlow <span className="text-slate-400 text-lg font-semibold">MIS</span></span>
          </Link>
          <p className="text-slate-400 text-sm mt-3">Hospital Management Information System</p>
        </div>

        {/* Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
          <div className="flex items-center gap-2 mb-6">
            <Shield size={18} className="text-blue-400" />
            <span className="text-white font-bold">Secure Staff Portal</span>
          </div>

          {/* Quick fill */}
          <div className="mb-6">
            <p className="text-slate-400 text-xs mb-2 font-semibold">Quick fill credentials:</p>
            <div className="flex gap-2 flex-wrap">
              {['Admin', 'Doctor', 'Nurse', 'Staff'].map((role) => (
                <button
                  key={role}
                  onClick={() => quickFill(role)}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-blue-500/30 text-white text-xs font-bold border border-white/10 hover:border-blue-400/50 transition-all"
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <div>
              <label className="text-slate-400 text-xs font-bold mb-1.5 block">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@mediflow.com"
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-400 text-xs font-bold mb-1.5 block">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type={showPw ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-xl pl-10 pr-11 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#2563EB] hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/30 hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In to MIS
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Credentials hint */}
          <div className="mt-6 p-4 bg-white/5 rounded-2xl border border-white/5">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-2">Demo Credentials</p>
            <div className="space-y-1 text-xs text-slate-400 font-mono">
              <div>admin@mediflow.com / admin123</div>
              <div>doctor@mediflow.com / doctor123</div>
            </div>
          </div>
        </div>

        <p className="text-center text-slate-500 text-xs mt-6">
          <Link href="/" className="hover:text-blue-400 transition-colors">← Back to Hospital Website</Link>
        </p>
      </div>
    </div>
  );
}
