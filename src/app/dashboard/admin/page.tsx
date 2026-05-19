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
  Database
} from 'lucide-react';
import { toast } from 'sonner';

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
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      alert('Please fill out all fields.');
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/auth/register', form);
      // Success
      alert(`Successfully registered ${form.name} as a ${form.role}!`);
      setForm({ name: '', email: '', password: '', role: 'Doctor' });
      setShowModal(false);
      // Reload lists
      await fetchAdminData();
    } catch (err: any) {
      const msg = err.response?.data?.error || err.message;
      alert(`Registration failed: ${msg}`);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredUsers = usersList.filter((u: any) => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Title Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="text-blue-600 animate-pulse" size={26} />
            Management Workstation
          </h1>
          <p className="text-slate-500">System architecture diagnostics and clinical staff access control.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700 transition duration-300 shadow-md shadow-blue-500/20"
        >
          <UserPlus size={18} />
          Register Clinical Staff
        </button>
      </div>

      {/* Diagnostics Panel Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex items-center gap-5">
          <div className="rounded-xl bg-blue-50 border border-blue-100 p-4 text-blue-600">
            <UserCheck size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Active Staff</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-0.5">
              {loading ? <span className="inline-block h-6 w-10 animate-pulse bg-slate-200 rounded" /> : stats.totalUsers}
            </p>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex items-center gap-5">
          <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4 text-emerald-600">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Patients</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-0.5">
              {loading ? <span className="inline-block h-6 w-10 animate-pulse bg-slate-200 rounded" /> : stats.totalPatients}
            </p>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex items-center gap-5">
          <div className="rounded-xl bg-violet-50 border border-violet-100 p-4 text-violet-600">
            <Database size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active In-Patients</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-0.5">
              {loading ? <span className="inline-block h-6 w-10 animate-pulse bg-slate-200 rounded" /> : stats.activeAdmissions}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Directory List */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {/* Header toolbar */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h3 className="font-bold text-slate-900">Hospital Employee Directory</h3>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              className="w-full rounded-xl border border-slate-200 pl-9 pr-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
              placeholder="Search by name, role, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Directory Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/50 text-slate-600 font-semibold border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Clinical Name</th>
                <th className="px-6 py-4">Auth/Email Credentials</th>
                <th className="px-6 py-4">System Access Role</th>
                <th className="px-6 py-4">Created Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-150">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-2/3" /></td>
                    <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-3/4" /></td>
                    <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-1/3" /></td>
                    <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-1/2" /></td>
                  </tr>
                ))
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-400">No matching employees found in registry.</td>
                </tr>
              ) : (
                filteredUsers.map((u: any) => (
                  <tr key={u.id} className="hover:bg-slate-50/50 transition duration-150">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-blue-50 flex items-center justify-center font-bold text-blue-700 text-sm border border-blue-100">
                          {u.name ? u.name[0].toUpperCase() : 'U'}
                        </div>
                        <span className="font-bold text-slate-900">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-mono text-xs">{u.email}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        u.role === 'Admin' ? 'bg-red-50 text-red-700' :
                        u.role === 'Doctor' ? 'bg-blue-50 text-blue-700' :
                        u.role === 'Nurse' ? 'bg-violet-50 text-violet-700' : 'bg-slate-50 text-slate-700'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-xs flex items-center gap-1.5 mt-1">
                      <Calendar size={13} />
                      {new Date(u.created_at || new Date()).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Registration Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl space-y-6 relative animate-in zoom-in-95 duration-200">
            <div>
              <h3 className="text-xl font-bold text-slate-950 flex items-center gap-2">
                <UserPlus className="text-blue-600" size={22} />
                Register Clinical Staff
              </h3>
              <p className="text-xs text-slate-500 mt-1">Provide administrative credentials to allocate hospital management access.</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="text"
                    required
                    className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Dr. Gregory House"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="email"
                    required
                    className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="house@mediflow.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Temporary Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="password"
                    required
                    className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Access Role Permissions</label>
                <select
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                >
                  <option value="Doctor">Doctor (Clinical Diagnostics)</option>
                  <option value="Nurse">Nurse (Ward Care Monitoring)</option>
                  <option value="Staff">Staff (Operations & Diet)</option>
                  <option value="Admin">Admin (System Operations)</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition shadow-md shadow-blue-500/20 disabled:opacity-50"
                >
                  {submitting ? 'Registering...' : 'Register User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
