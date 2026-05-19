'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Calendar as CalendarIcon, Clock, User, Plus, X, CalendarCheck, ShieldAlert, Check } from 'lucide-react';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(true);
  
  // Modal & Form State
  const [showModal, setShowModal] = useState(false);
  const [bookingError, setBookingError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    patient_id: '2',
    doctor_id: '1',
    appointment_date: new Date().toISOString().split('T')[0]
  });

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/appointments?date=${date}`);
      // Filter appointments locally if the backend doesn't filter by date
      const filtered = data.filter((app: any) => app.appointment_date === date) || data;
      setAppointments(filtered);
    } catch (err) { 
      console.error(err); 
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAppointments();
  }, [date]);

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setBookingError('');
    setBookingSuccess(false);

    try {
      // POST /api/appointments/book (which maps to /book in appointments route)
      await api.post('/appointments/book', {
        patient_id: Number(form.patient_id),
        doctor_id: Number(form.doctor_id),
        appointment_date: form.appointment_date
      });
      
      setBookingSuccess(true);
      setTimeout(() => {
        setShowModal(false);
        setBookingSuccess(false);
        fetchAppointments();
      }, 1500);

    } catch (err: any) {
      if (err.response?.status === 409) {
        setBookingError('Schedule Conflict: This clinician is already booked for an OPD appointment on the selected date. Please choose another date or doctor.');
      } else {
        setBookingError(err.response?.data?.error || err.message || 'Failed to complete scheduling. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <CalendarCheck className="text-blue-600" size={24} />
            OPD Scheduling & Calendar
          </h1>
          <p className="text-slate-500">Manage clinician hours, book slots, and enforce booking conflict checking.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700 transition duration-300 shadow-md shadow-blue-500/20"
        >
          <Plus size={18} />
          Book Appointment Slot
        </button>
      </div>

      {/* Filter toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <span className="text-sm font-semibold text-slate-500">Select Operating Date:</span>
        <input
          type="date"
          className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50/50 font-semibold text-slate-700"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {/* Grid Schedule */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm animate-pulse space-y-4">
              <div className="h-4 bg-slate-200 rounded w-1/3" />
              <div className="h-5 bg-slate-200 rounded w-2/3" />
              <div className="h-4 bg-slate-150 rounded w-1/2" />
            </div>
          ))
        ) : appointments.length === 0 ? (
          <div className="col-span-full rounded-2xl border-2 border-dashed border-slate-200 p-12 text-center text-slate-500">
            <CalendarIcon size={40} className="mx-auto text-slate-300 mb-2" />
            <p className="font-semibold text-slate-600">No scheduled clinic slots</p>
            <p className="text-xs text-slate-400 mt-1">There are no appointments registered for this calendar day.</p>
          </div>
        ) : appointments.map((app: any) => (
          <div key={app.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition duration-300 relative overflow-hidden group">
            <div className="absolute right-0 top-0 h-1.5 w-full bg-blue-600" />
            
            <div className="mb-4 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg">
                <Clock size={13} />
                {app.appointment_time}
              </span>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                app.status === 'Scheduled' ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700'
              }`}>
                {app.status}
              </span>
            </div>
            
            <h3 className="flex items-center gap-2 text-base font-bold text-slate-900">
              <User size={16} className="text-slate-400" />
              {app.patient_name}
            </h3>
            
            <div className="mt-4 border-t border-slate-100 pt-4 flex justify-between items-center">
              <div>
                <p className="text-xs font-bold text-slate-800">Dr. {app.doctor_name}</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">{app.specialty || 'General Medicine'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Book Appointment Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl space-y-6 relative animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div>
              <h3 className="text-xl font-bold text-slate-950 flex items-center gap-2">
                <CalendarIcon className="text-blue-600" size={22} />
                Book OPD Appointment
              </h3>
              <p className="text-xs text-slate-500 mt-1">Select clinical practitioner, target patient, and target schedule slot.</p>
            </div>

            {/* Notifications */}
            {bookingError && (
              <div className="rounded-xl bg-red-50 border border-red-100 p-4 text-xs text-red-700 flex gap-2.5">
                <ShieldAlert size={18} className="text-red-500 flex-shrink-0" />
                <span className="font-semibold leading-relaxed">{bookingError}</span>
              </div>
            )}

            {bookingSuccess && (
              <div className="rounded-xl bg-green-50 border border-green-150 p-4 text-xs text-green-700 flex items-center gap-2">
                <Check size={18} className="text-green-600" />
                <span className="font-semibold">Clinic slot allocated and secured successfully!</span>
              </div>
            )}

            {/* Form */}
            {!bookingSuccess && (
              <form onSubmit={handleBook} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Select Patient Profile</label>
                  <select
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm bg-white"
                    value={form.patient_id}
                    onChange={(e) => setForm({ ...form, patient_id: e.target.value })}
                  >
                    <option value="2">Jane Smith (Age 32, Female)</option>
                    <option value="1">John Doe (Age 45, Male)</option>
                    <option value="3">Robert Johnson (Age 67, Male)</option>
                    <option value="4">Emily Davis (Age 12, Female)</option>
                    <option value="5">Michael Brown (Age 58, Male)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Select Clinician</label>
                  <select
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm bg-white"
                    value={form.doctor_id}
                    onChange={(e) => setForm({ ...form, doctor_id: e.target.value })}
                  >
                    <option value="1">Dr. John Watson (General Medicine)</option>
                    <option value="2">Dr. Gregory House (Diagnostics & Cardiology)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Target Appointment Date</label>
                  <input
                    type="date"
                    required
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm bg-white"
                    value={form.appointment_date}
                    onChange={(e) => setForm({ ...form, appointment_date: e.target.value })}
                  />
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
                    {submitting ? 'Allocating slot...' : 'Allocate Slot'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
