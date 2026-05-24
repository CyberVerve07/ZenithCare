'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { 
  ShieldCheck, 
  UserPlus, 
  Mail, 
  User, 
  Lock, 
  Calendar,
  Activity,
  UserCheck,
  Search,
  Database,
  Cpu,
  HardDrive,
  RefreshCw,
  X,
  Save,
  Check,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminPage() {
  const [usersList, setUsersList] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPatients: 0,
    activeAdmissions: 0
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Registration Form State
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Doctor'
  });
  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [regError, setRegError] = useState('');
  const [regSuccess, setRegSuccess] = useState(false);

  // Simulated node telemetry
  const [sysTelemetry, setSysTelemetry] = useState({
    latency: '16ms',
    clusterLoad: '8.4%',
    securityAudit: 'Compliant'
  });

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [usersRes, statsRes] = await Promise.all([
        api.get('/admin/users'),
        api.get('/admin/stats')
      ]);
      setUsersList(usersRes.data || []);
      setStats(statsRes.data || { totalUsers: 0, totalPatients: 0, activeAdmissions: 0 });
    } catch (err) {
      console.error('Failed to load administrative telemetry:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
    
    // Telemetry updates simulation
    const telemetryInterval = setInterval(() => {
      setSysTelemetry(prev => ({
        ...prev,
        latency: `${Math.floor(Math.random() * 5) + 12}ms`,
        clusterLoad: `${(Math.random() * 3 + 7).toFixed(1)}%`
      }));
    }, 4500);

    return () => clearInterval(telemetryInterval);
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');
    setRegSuccess(false);

    if (!form.name || !form.email || !form.password) {
      setRegError('All credentials must be provided for security clearance.');
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/auth/register', form);
      
      setRegSuccess(true);
      setForm({ name: '', email: '', password: '', role: 'Doctor' });
      
      setTimeout(() => {
        setShowModal(false);
        setRegSuccess(false);
        fetchAdminData();
      }, 1500);

    } catch (err: any) {
      setRegError(err.response?.data?.error || err.message || 'Administrative registration failed.');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredUsers = usersList.filter((u: any) => 
    (u.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (u.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (u.role || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="text-blue-600 animate-pulse" size={26} />
            System Administration Workstation
          </h1>
          <p className="text-slate-500">Configure global settings, audits clinical logs, and manage workforce clearance permissions.</p>
        </div>
        
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3.5 text-xs font-black uppercase tracking-wider text-white hover:bg-blue-700 transition duration-300 shadow-lg shadow-blue-500/20 cursor-pointer"
        >
          <UserPlus size={16} />
          Register Clinician Staff
        </button>
      </div>

      {/* Diagnostics Panel Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: 'Active Core Staff',
            value: stats.totalUsers,
            desc: 'Authorized clinic users',
            icon: UserCheck,
            color: 'text-blue-600 bg-blue-500/10 border-blue-500/20',
            glow: 'shadow-blue-500/5 border-slate-200'
          },
          {
            title: 'Total Active Patients',
            value: stats.totalPatients,
            desc: 'Global patient registries',
            icon: Activity,
            color: 'text-emerald-600 bg-emerald-500/10 border-emerald-500/20',
            glow: 'shadow-emerald-500/5 border-slate-200'
          },
          {
            title: 'Wards Load Sync',
            value: stats.activeAdmissions,
            desc: 'Active admissions beds',
            icon: Database,
            color: 'text-violet-600 bg-violet-500/10 border-violet-500/20',
            glow: 'shadow-violet-500/5 border-slate-200'
          }
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className={`rounded-3xl border bg-white p-6 shadow-sm flex items-center gap-5 hover:shadow-md transition duration-200 ${item.glow}`}
            >
              <div className={`rounded-2xl border p-4 ${item.color}`}>
                <Icon size={24} />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest font-mono">{item.title}</p>
                <p className="text-3xl font-black text-slate-900 leading-none">
                  {loading ? (
                    <span className="inline-block h-8 w-12 animate-pulse bg-slate-200 rounded-md" />
                  ) : (
                    item.value
                  )}
                </p>
                <p className="text-[10px] text-slate-400 font-semibold">{item.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Cyber Security System Monitor Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="rounded-[2rem] border border-slate-950 bg-slate-950 p-6 text-white relative overflow-hidden shadow-xl"
      >
        <div className="absolute right-0 bottom-0 opacity-5 translate-x-12 translate-y-12 pointer-events-none">
          <ShieldCheck size={200} />
        </div>
        <div className="flex items-center justify-between border-b border-slate-900 pb-3.5 mb-4">
          <span className="text-[10px] font-black font-mono tracking-widest text-slate-500 uppercase flex items-center gap-1.5">
            <Cpu size={14} className="text-blue-400 animate-spin" style={{ animationDuration: '6s' }} />
            Security & Operations Telemetry Monitor
          </span>
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
        </div>

        <div className="grid grid-cols-3 gap-6 text-center">
          <div className="space-y-1">
            <p className="text-[9px] text-slate-500 font-extrabold uppercase font-mono tracking-wider">Cluster Ping</p>
            <p className="text-xl font-bold font-mono text-white mt-0.5">{sysTelemetry.latency}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[9px] text-slate-500 font-extrabold uppercase font-mono tracking-wider">DB Sync Load</p>
            <p className="text-xl font-bold font-mono text-white mt-0.5">{sysTelemetry.clusterLoad}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[9px] text-slate-500 font-extrabold uppercase font-mono tracking-wider">Audit Security</p>
            <p className="text-xl font-bold font-mono text-emerald-400 mt-0.5">{sysTelemetry.securityAudit}</p>
          </div>
        </div>
      </motion.div>

      {/* Interactive Directory List */}
      <div className="rounded-[2.2rem] border border-slate-200 bg-white shadow-sm overflow-hidden">
        {/* Header toolbar */}
        <div className="bg-slate-50/70 border-b border-slate-200 px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm">Hospital Personnel Directory</h3>
            <p className="text-xs text-slate-400 font-semibold">Active staff registries and system access clearance</p>
          </div>
          
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              className="w-full rounded-2xl border border-slate-200 pl-10 pr-4 py-2.5 text-xs focus:border-blue-500 focus:outline-none bg-white"
              placeholder="Search by name, role, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Directory Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/30 text-slate-650 font-extrabold border-b border-slate-200 uppercase tracking-wider font-mono">
              <tr>
                <th className="px-6 py-4">Clinical Name</th>
                <th className="px-6 py-4">Auth/Email Credentials</th>
                <th className="px-6 py-4">System Access Role</th>
                <th className="px-6 py-4">Created Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4"><div className="h-4 bg-slate-150 rounded w-2/3" /></td>
                    <td className="px-6 py-4"><div className="h-4 bg-slate-150 rounded w-3/4" /></td>
                    <td className="px-6 py-4"><div className="h-4 bg-slate-150 rounded w-1/3" /></td>
                    <td className="px-6 py-4"><div className="h-4 bg-slate-150 rounded w-1/2" /></td>
                  </tr>
                ))
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-400 font-bold">No matching employees found in registry.</td>
                </tr>
              ) : (
                filteredUsers.map((u: any) => (
                  <tr key={u.id} className="hover:bg-slate-50/40 transition duration-200">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-2xl bg-blue-50/80 flex items-center justify-center font-black text-blue-700 text-xs border border-blue-100 uppercase">
                          {u.name ? u.name[0] : 'U'}
                        </div>
                        <span className="font-extrabold text-slate-900 text-sm">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-550 font-mono">{u.email}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide border ${
                        u.role === 'Admin' ? 'bg-red-50 text-red-700 border-red-200' :
                        u.role === 'Doctor' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        u.role === 'Nurse' ? 'bg-violet-50 text-violet-700 border-violet-200' : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 font-semibold font-mono">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-slate-350" />
                        {new Date(u.created_at || new Date()).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Registration Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md rounded-[2.2rem] border border-slate-200 bg-white p-8 shadow-2xl space-y-6 text-slate-900 relative"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-blue-50 border border-blue-100 p-3 text-blue-600">
                    <UserPlus size={20} className="animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black tracking-tight text-slate-950">Register Workforce</h3>
                    <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">SYSTEM SECURITY REGISTRY</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-slate-200 p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-850 transition cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Warnings and Success Alerts */}
              {regError && (
                <div className="rounded-2xl bg-red-50 border border-red-150 p-4 text-xs text-red-700 flex gap-2">
                  <AlertCircle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="font-semibold">{regError}</span>
                </div>
              )}

              {regSuccess && (
                <div className="rounded-2xl bg-green-50 border border-green-200 p-4 text-xs text-green-700 flex items-center gap-2">
                  <Check size={16} className="text-green-600" />
                  <span className="font-bold">Clinical staff recorded and synced to registry.</span>
                </div>
              )}

              {/* Form */}
              {!regSuccess && (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 font-mono">Full Clinician Name</label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={16} />
                      <input
                        type="text"
                        required
                        className="w-full rounded-2xl border border-slate-200 pl-11 pr-4 py-3.5 text-xs focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 bg-white font-semibold"
                        placeholder="e.g. Dr. Gregory House"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 font-mono">Email Address Credentials</label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={16} />
                      <input
                        type="email"
                        required
                        className="w-full rounded-2xl border border-slate-200 pl-11 pr-4 py-3.5 text-xs focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 bg-white font-semibold"
                        placeholder="e.g. house@mediflow.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 font-mono">Security Access Password</label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={16} />
                      <input
                        type="password"
                        required
                        className="w-full rounded-2xl border border-slate-200 pl-11 pr-4 py-3.5 text-xs focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 bg-white font-mono"
                        placeholder="••••••••"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 font-mono">Access Level Permissions</label>
                    <select
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 text-xs focus:border-blue-500 focus:outline-none bg-white font-bold text-slate-700"
                      value={form.role}
                      onChange={(e) => setForm({ ...form, role: e.target.value })}
                    >
                      <option value="Doctor">Doctor (Clinical Diagnostics)</option>
                      <option value="Nurse">Nurse (Ward Care Monitoring)</option>
                      <option value="Staff">Staff (Operations & Diet)</option>
                      <option value="Admin">Admin (System Operations)</option>
                    </select>
                  </div>

                  <div className="flex gap-4 pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="flex-1 rounded-2xl border border-slate-200 py-3.5 text-xs font-bold text-slate-550 hover:bg-slate-50 transition cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 rounded-2xl bg-blue-600 py-3.5 text-xs font-black uppercase tracking-wider text-white hover:bg-blue-700 transition shadow-lg shadow-blue-500/15 cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      {submitting ? (
                        'Syncing Registry...'
                      ) : (
                        <>
                          <Save size={13} /> Grant Clearance
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
