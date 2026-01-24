'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Calendar as CalendarIcon, Clock, User } from 'lucide-react';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/appointments?date=${date}`);
        setAppointments(data);
      } catch (err) { console.error(err); }
      setLoading(false);
    };
    fetchAppointments();
  }, [date]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Doctor Appointments</h1>
          <p className="text-slate-500">View and manage daily OPD schedules.</p>
        </div>
        <input
          type="date"
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <p className="col-span-full text-center py-12 text-slate-500">Loading appointments...</p>
        ) : appointments.length === 0 ? (
          <p className="col-span-full text-center py-12 text-slate-500">No appointments scheduled for this date.</p>
        ) : appointments.map((app: any) => (
          <div key={app.id} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
            <div className="mb-4 flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm font-semibold text-blue-600">
                <Clock size={16} />
                {app.appointment_time}
              </span>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                app.status === 'Scheduled' ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700'
              }`}>
                {app.status}
              </span>
            </div>
            <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
              <User size={18} className="text-slate-400" />
              {app.patient_name}
            </h3>
            <div className="mt-4 border-t border-slate-100 pt-4">
              <p className="text-sm font-medium text-slate-700">Dr. {app.doctor_name}</p>
              <p className="text-xs text-slate-500">{app.specialty}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
