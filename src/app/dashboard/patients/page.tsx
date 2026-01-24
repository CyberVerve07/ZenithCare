'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Plus, Search, UserPlus } from 'lucide-react';

export default function PatientsPage() {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmissions = async () => {
      try {
        const { data } = await api.get('/admissions');
        setAdmissions(data);
      } catch (err) { console.error(err); }
      setLoading(false);
    };
    fetchAdmissions();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Patient Admissions</h1>
          <p className="text-slate-500">Manage admitted patients and track their status.</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition">
          <UserPlus size={18} />
          New Admission
        </button>
      </div>

      <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            className="w-full rounded-lg border border-slate-200 pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Search by patient name or ID..."
          />
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600 font-medium">
            <tr>
              <th className="px-6 py-4">Patient Name</th>
              <th className="px-6 py-4">Age/Gender</th>
              <th className="px-6 py-4">Admission Date</th>
              <th className="px-6 py-4">Condition</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr><td colSpan={6} className="px-6 py-8 text-center text-slate-500">Loading admissions...</td></tr>
            ) : admissions.length === 0 ? (
              <tr><td colSpan={6} className="px-6 py-8 text-center text-slate-500">No active admissions found.</td></tr>
            ) : admissions.map((ad: any) => (
              <tr key={ad.id} className="hover:bg-slate-50 transition">
                <td className="px-6 py-4 font-medium text-slate-900">{ad.patient_name}</td>
                <td className="px-6 py-4 text-slate-600">{ad.age}y / {ad.gender}</td>
                <td className="px-6 py-4 text-slate-600">{new Date(ad.admission_date).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                    {ad.current_condition || 'Normal'}
                  </span>
                </td>
                <td className="px-6 py-4">
                   <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
                    {ad.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:underline">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
