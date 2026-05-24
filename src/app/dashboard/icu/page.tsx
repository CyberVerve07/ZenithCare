'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Search, 
  Heart, 
  ShieldAlert, 
  Sliders, 
  X, 
  Save, 
  Clock, 
  Plus, 
  TrendingUp,
  UserCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ICUPage() {
  const [icuPatients, setIcuPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal Edit State
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [editForm, setEditForm] = useState({
    status_flag: 'Stable',
    pulse: 72,
    bp: '120/80',
    spo2: 98
  });

  const fetchICU = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/icu');
      setIcuPatients(data || []);
    } catch (err) { 
      console.error(err); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchICU();
  }, []);

  // Live fluctuating vitals telemetry simulation
  useEffect(() => {
    if (icuPatients.length === 0) return;

    const interval = setInterval(() => {
      setIcuPatients((prevPatients: any) => 
        prevPatients.map((p: any) => {
          // If currently editing this patient, don't fluctuate to avoid form conflicts
          if (selectedPatient && selectedPatient.id === p.id) return p;

          // Gently fluctuate metrics
          const pulseDelta = Math.floor(Math.random() * 5) - 2; // -2 to +2
          const currentPulse = Number(p.critical_metrics?.pulse) || 72;
          const nextPulse = Math.max(50, Math.min(140, currentPulse + pulseDelta));

          const spo2Delta = Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0;
          const currentSpo2 = Number(p.critical_metrics?.spo2) || 98;
          const nextSpo2 = Math.max(85, Math.min(100, currentSpo2 + spo2Delta));

          // BP Fluctuation
          let nextBp = p.critical_metrics?.bp || '120/80';
          if (Math.random() > 0.8) {
            const parts = nextBp.split('/');
            if (parts.length === 2) {
              const sys = Number(parts[0]) + (Math.floor(Math.random() * 5) - 2);
              const dia = Number(parts[1]) + (Math.floor(Math.random() * 3) - 1);
              nextBp = `${sys}/${dia}`;
            }
          }

          return {
            ...p,
            critical_metrics: {
              ...p.critical_metrics,
              pulse: nextPulse,
              spo2: nextSpo2,
              bp: nextBp
            }
          };
        })
      );
    }, 3500);

    return () => clearInterval(interval);
  }, [icuPatients.length, selectedPatient]);

  const handleOpenEdit = (patient: any) => {
    setSelectedPatient(patient);
    setEditForm({
      status_flag: patient.status_flag || 'Stable',
      pulse: Number(patient.critical_metrics?.pulse) || 72,
      bp: patient.critical_metrics?.bp || '120/80',
      spo2: Number(patient.critical_metrics?.spo2) || 98
    });
    setShowEditModal(true);
  };

  const handleUpdateMetrics = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const updatedMetrics = {
        pulse: editForm.pulse,
        bp: editForm.bp,
        spo2: editForm.spo2
      };

      // PATCH /api/icu/:id/metrics
      await api.patch(`/icu/${selectedPatient.id}/metrics`, {
        critical_metrics: updatedMetrics,
        status_flag: editForm.status_flag
      });

      alert('ICU patient telemetry updated successfully.');
      setShowEditModal(false);
      fetchICU();
    } catch (err: any) {
      alert(`Update failed: ${err.message}`);
    } finally {
      setUpdating(false);
    }
  };

  const filteredPatients = icuPatients.filter((p: any) => 
    (p.patient_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.bed_number || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.status_flag || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Dynamic continuous animated ECG sweep keyframes defined locally */}
      <style>{`
        @keyframes ecg-scan {
          0% { stroke-dashoffset: 400; }
          100% { stroke-dashoffset: 0; }
        }
        .ecg-anim-path {
          stroke-dasharray: 400;
          animation: ecg-scan 4s linear infinite;
        }
      `}</style>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Activity className="text-red-500 animate-pulse" size={24} />
            ICU Telemetry Command Center
          </h1>
          <p className="text-slate-500">Real-time physiological tracking of critical care patient ward telemetry modules.</p>
        </div>

        {/* Filter Bar */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-xs focus:border-blue-500 focus:outline-none bg-white shadow-sm"
            placeholder="Filter beds, patient names..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* ICU Beds Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm animate-pulse space-y-4">
              <div className="h-6 bg-slate-200 rounded w-1/3" />
              <div className="h-20 bg-slate-100 rounded w-full" />
              <div className="h-10 bg-slate-200 rounded w-1/2" />
            </div>
          ))
        ) : filteredPatients.length === 0 ? (
          <div className="col-span-full text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200 text-slate-400">
            <ShieldAlert size={48} className="mx-auto text-slate-350 mb-3" />
            <p className="font-bold text-slate-650">No patients currently tracked in ICU</p>
            <p className="text-xs text-slate-400 mt-1">Check admissions to transfer patients to Critical Care.</p>
          </div>
        ) : filteredPatients.map((patient: any) => {
          const isCritical = patient.status_flag === 'Critical';
          const isObservation = patient.status_flag === 'Observation';
          
          return (
            <motion.div
              layout
              key={patient.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className={`rounded-3xl border bg-slate-950 p-6 text-white shadow-xl relative overflow-hidden transition-all duration-300 ${
                isCritical 
                  ? 'border-red-500/50 shadow-red-500/5' 
                  : isObservation 
                    ? 'border-amber-500/30 shadow-amber-500/5' 
                    : 'border-slate-800 shadow-emerald-500/5'
              }`}
            >
              {/* Alert Beacon (for Critical Patients) */}
              {isCritical && (
                <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-bl-3xl bg-red-500 animate-ping pointer-events-none" />
              )}

              {/* Card Header */}
              <div className="flex items-start justify-between border-b border-slate-900 pb-4 mb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                      BED: {patient.bed_number}
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-700" />
                    <span className="text-[10px] font-bold text-slate-500 font-mono">
                      WARD NODE #{patient.id}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-lg text-white mt-1 group-hover:text-blue-400 transition">
                    {patient.patient_name}
                  </h3>
                </div>

                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider border ${
                  isCritical 
                    ? 'bg-red-500/10 text-red-400 border-red-500/25' 
                    : isObservation 
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/25' 
                      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25'
                }`}>
                  {isCritical ? <AlertTriangle size={12} className="animate-[pulse_1s_infinite]" /> : <CheckCircle size={12} />}
                  {patient.status_flag}
                </span>
              </div>
              
              {/* Simulated Heart Rate Waveform Display (Stunning ECG trace animation) */}
              <div className="rounded-2xl bg-black border border-slate-900 p-4 mb-6 relative overflow-hidden flex items-center justify-between">
                <div className="absolute left-4 top-1.5 text-[8px] font-black font-mono tracking-widest text-slate-500 uppercase">
                  ECG Trace • LEAD II
                </div>
                <div className="absolute right-4 top-1.5 text-[8px] font-black font-mono tracking-widest text-emerald-400/80 flex items-center gap-1 animate-pulse">
                  <span className="h-1 w-1 rounded-full bg-emerald-500" />
                  REAL-TIME SIM
                </div>

                {/* SVG heart rate pulse trace */}
                <div className="w-2/3 h-14 relative flex items-center">
                  <svg className="w-full h-10 text-emerald-400/80 opacity-80" viewBox="0 0 200 40" preserveAspectRatio="none">
                    <path
                      d="M 0,20 L 20,20 L 25,20 L 28,12 L 31,28 L 34,20 L 45,20 L 60,20 L 65,20 L 68,5 L 71,35 L 74,20 L 85,20 L 100,20 L 120,20 L 125,20 L 128,12 L 131,28 L 134,20 L 145,20 L 160,20 L 165,20 L 168,5 L 171,35 L 174,20 L 185,20 L 200,20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="ecg-anim-path"
                    />
                  </svg>
                </div>

                <div className="text-right">
                  <Heart className={`inline text-red-500 mb-1 ${isCritical ? 'animate-ping' : 'animate-[bounce_1.5s_infinite]'}`} size={16} fill="currentColor" />
                  <p className="text-2xl font-black font-mono leading-none tracking-tighter text-white">
                    {patient.critical_metrics?.pulse || '--'}
                  </p>
                  <p className="text-[9px] text-slate-500 font-extrabold uppercase font-mono tracking-wider mt-0.5">BPM</p>
                </div>
              </div>

              {/* Vitals stats numbers */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="rounded-2xl bg-slate-900/50 border border-slate-900/80 p-3 text-center">
                  <p className="text-[9px] text-slate-500 font-extrabold uppercase tracking-wider font-mono">Pulse Rate</p>
                  <p className={`text-xl font-bold font-mono mt-1 ${isCritical ? 'text-red-400' : 'text-slate-100'}`}>
                    {patient.critical_metrics?.pulse || '--'}
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-900/50 border border-slate-900/80 p-3 text-center">
                  <p className="text-[9px] text-slate-500 font-extrabold uppercase tracking-wider font-mono">Blood Press</p>
                  <p className="text-xl font-bold font-mono text-slate-100 mt-1">
                    {patient.critical_metrics?.bp || '--'}
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-900/50 border border-slate-900/80 p-3 text-center">
                  <p className="text-[9px] text-slate-500 font-extrabold uppercase tracking-wider font-mono">SpO2 Oxygen</p>
                  <p className={`text-xl font-bold font-mono mt-1 ${
                    (Number(patient.critical_metrics?.spo2) || 98) < 92 ? 'text-red-400 animate-pulse font-black' : 'text-slate-100'
                  }`}>
                    {patient.critical_metrics?.spo2 || '--'}%
                  </p>
                </div>
              </div>
              
              {/* Clinical summary drawer block */}
              <div className="space-y-2">
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 font-mono">Attending Diagnostics</p>
                <div className="rounded-2xl bg-slate-900/40 border border-slate-900/80 p-4 text-xs text-slate-300 leading-relaxed italic">
                  "{patient.current_condition || patient.condition || 'Observation requested. Monitoring active vitals.'}"
                </div>
              </div>

              {/* Action */}
              <button 
                onClick={() => handleOpenEdit(patient)}
                className="mt-6 w-full rounded-2xl bg-white text-slate-950 py-3.5 text-xs font-black uppercase tracking-wider hover:bg-slate-100 hover:shadow-lg transition duration-200 cursor-pointer"
              >
                Modify Telemetry Wards
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Slide-Over / Modal: Update Telemetry Metrics */}
      <AnimatePresence>
        {showEditModal && selectedPatient && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md rounded-[2rem] border border-slate-800 bg-slate-900 p-8 shadow-2xl space-y-6 text-white"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-3 text-red-500">
                    <Sliders size={20} className="animate-[spin_4s_infinite]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black tracking-tight">{selectedPatient.patient_name}</h3>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">MODIFY TELEMETRY: BED {selectedPatient.bed_number}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="rounded-xl border border-slate-800 p-2 text-slate-400 hover:bg-slate-850 hover:text-white transition cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleUpdateMetrics} className="space-y-5">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 font-mono">Status Flag Assessment</label>
                  <select
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm focus:border-red-500 focus:outline-none"
                    value={editForm.status_flag}
                    onChange={(e) => setEditForm({ ...editForm, status_flag: e.target.value })}
                  >
                    <option value="Stable">Stable (Nominal trace)</option>
                    <option value="Observation">Observation (Moderate warning)</option>
                    <option value="Critical">Critical (High priority emergency)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 font-mono">Pulse Rate (BPM)</label>
                    <input
                      type="number"
                      required
                      min={30}
                      max={200}
                      className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm focus:border-red-500 focus:outline-none"
                      value={editForm.pulse}
                      onChange={(e) => setEditForm({ ...editForm, pulse: Number(e.target.value) })}
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 font-mono">Oxygen SpO2 (%)</label>
                    <input
                      type="number"
                      required
                      min={50}
                      max={100}
                      className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm focus:border-red-500 focus:outline-none"
                      value={editForm.spo2}
                      onChange={(e) => setEditForm({ ...editForm, spo2: Number(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 font-mono">Blood Pressure (BP)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 120/80"
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm focus:border-red-500 focus:outline-none font-mono"
                    value={editForm.bp}
                    onChange={(e) => setEditForm({ ...editForm, bp: e.target.value })}
                  />
                </div>

                <div className="flex gap-4 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 rounded-2xl border border-slate-800 py-3.5 text-xs font-bold text-slate-400 hover:bg-slate-850 hover:text-white transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={updating}
                    className="flex-1 rounded-2xl bg-red-600 py-3.5 text-xs font-black uppercase tracking-wider text-white hover:bg-red-500 transition shadow-lg shadow-red-650/15 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    {updating ? (
                      'Updating Wards...'
                    ) : (
                      <>
                        <Save size={13} /> Secure Telemetry
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
