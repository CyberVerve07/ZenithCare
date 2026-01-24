'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Activity, AlertTriangle, CheckCircle, Search } from 'lucide-react';

export default function ICUPage() {
  const [icuPatients, setIcuPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchICU = async () => {
      try {
        const { data } = await api.get('/icu');
        setIcuPatients(data);
      } catch (err) { console.error(err); }
      setLoading(false);
    };
    fetchICU();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">ICU Monitoring</h1>
        <p className="text-slate-500">Real-time tracking of critical care patients.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {loading ? (
          <p className="col-span-full text-center py-12 text-slate-500">Loading ICU data...</p>
        ) : icuPatients.length === 0 ? (
          <p className="col-span-full text-center py-12 text-slate-500">No patients currently in ICU.</p>
        ) : icuPatients.map((patient: any) => (
          <div key={patient.id} className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900">{patient.patient_name}</h3>
                <p className="text-xs text-slate-500 text-uppercase tracking-wider">BED: {patient.bed_number}</p>
              </div>
              <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                patient.status_flag === 'Critical' ? 'bg-red-100 text-red-700' : 
                patient.status_flag === 'Stable' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {patient.status_flag === 'Critical' ? <AlertTriangle size={14} /> : <CheckCircle size={14} />}
                {patient.status_flag}
              </span>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="rounded-xl bg-slate-50 p-3 text-center">
                  <p className="text-xs text-slate-500 font-medium uppercase">Pulse</p>
                  <p className="text-xl font-bold text-slate-900">{patient.critical_metrics?.pulse || '--'}</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-3 text-center">
                  <p className="text-xs text-slate-500 font-medium uppercase">BP</p>
                  <p className="text-xl font-bold text-slate-900">{patient.critical_metrics?.bp || '--'}</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-3 text-center">
                  <p className="text-xs text-slate-500 font-medium uppercase">SpO2</p>
                  <p className="text-xl font-bold text-slate-900">{patient.critical_metrics?.spo2 || '--'}%</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-semibold text-slate-700">Condition Summary</p>
                <div className="rounded-lg bg-blue-50/50 p-3 text-sm text-slate-600 italic">
                  "{patient.current_condition || 'No summary available.'}"
                </div>
              </div>

              <button className="mt-6 w-full rounded-lg bg-slate-900 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition">
                Update Metrics
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
