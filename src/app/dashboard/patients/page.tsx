'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { 
  Plus, 
  Search, 
  UserPlus, 
  X, 
  FileText, 
  Stethoscope, 
  Sparkles, 
  Activity, 
  ShieldCheck, 
  Calendar,
  Layers,
  ClipboardList
} from 'lucide-react';

export default function PatientsPage() {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modals state
  const [selectedAd, setSelectedAd] = useState<any>(null);
  const [showAdmitModal, setShowAdmitModal] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  // New Admission Form State
  const [admitForm, setAdmitForm] = useState({
    patient_id: '1',
    department_id: '5',
    doctor_id: '1',
    bed_number: 'B-103',
    condition: 'General Observation'
  });
  const [admitSubmitting, setAdmitSubmitting] = useState(false);

  // Edit Condition State
  const [updatingCondition, setUpdatingCondition] = useState(false);
  const [editCondition, setEditCondition] = useState('');
  const [editStatus, setEditStatus] = useState('Admitted');

  const fetchAdmissions = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/admissions');
      setAdmissions(data || []);
    } catch (err) {
      console.error('Failed to fetch admissions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const handleAdmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdmitSubmitting(true);
    try {
      // Map to backend /api/patients/admit (which is patientRoutes admitPatient)
      await api.post('/patients/admit', {
        patient_id: Number(admitForm.patient_id),
        department_id: Number(admitForm.department_id),
        doctor_id: Number(admitForm.doctor_id),
        bed_number: admitForm.bed_number,
        condition: admitForm.condition
      });
      alert('Patient admitted successfully!');
      setShowAdmitModal(false);
      setAdmitForm({
        patient_id: '1',
        department_id: '5',
        doctor_id: '1',
        bed_number: 'B-103',
        condition: 'General Observation'
      });
      fetchAdmissions();
    } catch (err: any) {
      alert(`Admission failed: ${err.response?.data?.error || err.message}`);
    } finally {
      setAdmitSubmitting(false);
    }
  };

  const handleUpdateCondition = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdatingCondition(true);
    try {
      // PATCH /api/patients/:id/status
      const { data } = await api.patch(`/patients/${selectedAd.id}/status`, {
        status: editStatus,
        condition: editCondition
      });
      alert('Clinical condition updated successfully.');
      setSelectedAd({ ...selectedAd, current_condition: editCondition, status: editStatus, condition: editCondition });
      fetchAdmissions();
    } catch (err: any) {
      alert(`Failed to update condition: ${err.message}`);
    } finally {
      setUpdatingCondition(false);
    }
  };

  const handleGenerateSummary = async () => {
    setAiLoading(true);
    try {
      // POST /api/patients/:id/summary
      const { data } = await api.post(`/patients/${selectedAd.id}/summary`);
      setSelectedAd({ ...selectedAd, daily_summary: data.summary });
      alert('AI Summary generated successfully!');
      fetchAdmissions();
    } catch (err: any) {
      alert(`AI Summarization failed: ${err.message}`);
    } finally {
      setAiLoading(false);
    }
  };

  const filteredAdmissions = admissions.filter((ad: any) => 
    (ad.patient_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (ad.bed_number || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (ad.current_condition || ad.condition || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <ClipboardList className="text-blue-600" size={24} />
            Patient Admissions Registry
          </h1>
          <p className="text-slate-500">Manage admitted patients, edit clinical telemetry, and compile AI chart summaries.</p>
        </div>
        <button 
          onClick={() => setShowAdmitModal(true)}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700 transition duration-300 shadow-md shadow-blue-500/20"
        >
          <UserPlus size={18} />
          New Admission
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            className="w-full rounded-xl border border-slate-200 pl-11 pr-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50/50"
            placeholder="Search by patient name, bed location, or symptoms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Admissions Table */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50/70 border-b border-slate-200 text-slate-600 font-semibold">
            <tr>
              <th className="px-6 py-4">Patient Name</th>
              <th className="px-6 py-4">Location/Bed</th>
              <th className="px-6 py-4">Admission Date</th>
              <th className="px-6 py-4">Assigned Clinician</th>
              <th className="px-6 py-4">Condition</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">Diagnostics</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-1/2" /></td>
                  <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-1/3" /></td>
                  <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-2/3" /></td>
                  <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-1/2" /></td>
                  <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-1/4" /></td>
                  <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-1/5" /></td>
                  <td className="px-6 py-4"><div className="h-8 bg-slate-200 rounded w-16 mx-auto" /></td>
                </tr>
              ))
            ) : filteredAdmissions.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-slate-400">No active patient admissions found in registry.</td>
              </tr>
            ) : filteredAdmissions.map((ad: any) => (
              <tr key={ad.id} className="hover:bg-slate-50/50 transition">
                <td className="px-6 py-4 font-bold text-slate-900">{ad.patient_name}</td>
                <td className="px-6 py-4 text-slate-600 font-mono text-xs">{ad.bed_number}</td>
                <td className="px-6 py-4 text-slate-500 text-xs">
                  {new Date(ad.admission_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </td>
                <td className="px-6 py-4 text-slate-700 font-semibold">Dr. {ad.doctor_name || 'Watson'}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    (ad.current_condition || ad.condition) === 'Critical' ? 'bg-red-50 text-red-700' :
                    (ad.current_condition || ad.condition) === 'Stable' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'
                  }`}>
                    {ad.current_condition || ad.condition || 'Observation'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center rounded-full bg-slate-50 border border-slate-200 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                    {ad.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <button 
                    onClick={() => {
                      setSelectedAd(ad);
                      setEditCondition(ad.current_condition || ad.condition || 'Stable');
                      setEditStatus(ad.status || 'Admitted');
                    }}
                    className="rounded-lg border border-blue-200 px-3 py-1.5 text-xs font-bold text-blue-600 bg-blue-50/40 hover:bg-blue-600 hover:text-white transition duration-300 shadow-sm"
                  >
                    Open File
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Slide-Over / Modal: Patient Clinical File Details */}
      {selectedAd && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="h-full w-full max-w-lg bg-white p-8 shadow-2xl overflow-y-auto space-y-6 flex flex-col justify-between animate-in slide-in-from-right duration-300">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-blue-50 border border-blue-100 p-2.5 text-blue-600">
                    <Stethoscope size={20} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-lg">{selectedAd.patient_name}</h3>
                    <p className="text-xs text-slate-400 font-mono">ADMISSION FILE #{selectedAd.id}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedAd(null)}
                  className="rounded-lg border border-slate-200 p-1.5 text-slate-400 hover:bg-slate-50 transition"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Vitals Summary Card */}
              <div className="rounded-2xl border border-slate-150 p-5 bg-slate-50/50 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Telemetry & Ward Location</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-400 text-xs">Assigned Bed</p>
                    <p className="font-bold text-slate-900 mt-0.5">{selectedAd.bed_number}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs">Department Ward</p>
                    <p className="font-bold text-slate-900 mt-0.5">{selectedAd.department_name || 'General Medicine'}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs">Diagnosing Doctor</p>
                    <p className="font-bold text-slate-900 mt-0.5">Dr. {selectedAd.doctor_name || 'Watson'}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs">Admission Date</p>
                    <p className="font-bold text-slate-900 mt-0.5">{new Date(selectedAd.admission_date).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {/* AI Clinical Summary Component */}
              <div className="rounded-2xl border border-blue-100 bg-blue-50/30 p-5 space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
                    <Sparkles size={14} className="animate-spin text-blue-500" style={{ animationDuration: '4s' }} />
                    AI Daily Clinical Summary
                  </h4>
                  <button
                    onClick={handleGenerateSummary}
                    disabled={aiLoading}
                    className="flex items-center gap-1 text-xs font-bold bg-white text-blue-600 border border-blue-200 px-3 py-1 rounded-lg hover:bg-blue-600 hover:text-white transition duration-300 disabled:opacity-50"
                  >
                    {aiLoading ? 'Compiling Chart...' : 'Re-compile Chart'}
                  </button>
                </div>
                <div className="text-sm text-slate-700 italic bg-white border border-blue-50 rounded-xl p-4 shadow-sm min-h-[80px]">
                  {aiLoading ? (
                    <div className="space-y-2 animate-pulse">
                      <div className="h-3.5 bg-slate-100 rounded w-full" />
                      <div className="h-3.5 bg-slate-100 rounded w-5/6" />
                      <div className="h-3.5 bg-slate-100 rounded w-2/3" />
                    </div>
                  ) : (
                    selectedAd.daily_summary || '"No active clinical AI summary generated for this patient. Click Compile Chart above to construct a clinical profile summaries based on the diagnosis."'
                  )}
                </div>
              </div>

              {/* Clinical Condition update form */}
              <div className="border-t border-slate-100 pt-6 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Clinical Evaluation Details</h4>
                <form onSubmit={handleUpdateCondition} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-600">Current Status</label>
                      <select
                        className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white"
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value)}
                      >
                        <option value="Admitted">Admitted</option>
                        <option value="Discharged">Discharged</option>
                        <option value="Transferred">Transferred</option>
                        <option value="Observation">Observation</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-600">Symptom Severity</label>
                      <select
                        className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white"
                        value={editCondition}
                        onChange={(e) => setEditCondition(e.target.value)}
                      >
                        <option value="Stable">Stable</option>
                        <option value="Observation">Observation</option>
                        <option value="Critical">Critical</option>
                        <option value="Guarded">Guarded</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={updatingCondition}
                    className="w-full rounded-xl bg-slate-900 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition duration-300"
                  >
                    {updatingCondition ? 'Updating Evaluation...' : 'Save Evaluation Details'}
                  </button>
                </form>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex gap-4">
              <button
                onClick={() => setSelectedAd(null)}
                className="w-full rounded-xl border border-slate-250 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
              >
                Close Clinical File
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: New Admission Entry */}
      {showAdmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
            <div>
              <h3 className="text-xl font-bold text-slate-950 flex items-center gap-2">
                <UserPlus className="text-blue-600" size={22} />
                Admit In-Patient Record
              </h3>
              <p className="text-xs text-slate-500 mt-1">Record a new patient ward entry and bed allocation details.</p>
            </div>

            <form onSubmit={handleAdmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Patient Selection</label>
                <select
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm bg-white"
                  value={admitForm.patient_id}
                  onChange={(e) => setAdmitForm({ ...admitForm, patient_id: e.target.value })}
                >
                  <option value="1">John Doe (Age 45, Male)</option>
                  <option value="2">Jane Smith (Age 32, Female)</option>
                  <option value="3">Robert Johnson (Age 67, Male)</option>
                  <option value="4">Emily Davis (Age 12, Female)</option>
                  <option value="5">Michael Brown (Age 58, Male)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Department Ward</label>
                  <select
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm bg-white"
                    value={admitForm.department_id}
                    onChange={(e) => setAdmitForm({ ...admitForm, department_id: e.target.value })}
                  >
                    <option value="5">General Medicine</option>
                    <option value="1">Cardiology (ICU)</option>
                    <option value="2">Neurology</option>
                    <option value="3">Orthopedics</option>
                    <option value="4">Pediatrics</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Allocated Bed</label>
                  <input
                    type="text"
                    required
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm"
                    placeholder="ICU-05 or B-201"
                    value={admitForm.bed_number}
                    onChange={(e) => setAdmitForm({ ...admitForm, bed_number: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Assigned Clinician</label>
                <select
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm bg-white"
                  value={admitForm.doctor_id}
                  onChange={(e) => setAdmitForm({ ...admitForm, doctor_id: e.target.value })}
                >
                  <option value="1">Dr. John Watson (General Medicine)</option>
                  <option value="2">Dr. Gregory House (Diagnostics & Cardiology)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Symptoms & Condition</label>
                <textarea
                  required
                  rows={2}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  placeholder="Describe patient condition or diagnosis symptoms..."
                  value={admitForm.condition}
                  onChange={(e) => setAdmitForm({ ...admitForm, condition: e.target.value })}
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAdmitModal(false)}
                  className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={admitSubmitting}
                  className="flex-1 rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition shadow-md shadow-blue-500/20 disabled:opacity-50"
                >
                  {admitSubmitting ? 'Admitting...' : 'Record Admission'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
