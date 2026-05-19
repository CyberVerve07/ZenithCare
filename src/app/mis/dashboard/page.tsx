'use client';

import Link from 'next/link';
import {
  Users, UserCheck, Calendar, Activity, ArrowUpRight, TrendingUp,
  AlertTriangle, CheckCircle, Clock, DollarSign, Building2, ChevronRight
} from 'lucide-react';

const statsCards = [
  { label: 'Total Patients', value: '2,847', change: '+12%', trend: 'up', icon: Users, color: 'bg-blue-50 text-blue-600', accent: 'text-blue-600' },
  { label: 'Doctors on Duty', value: '34', change: '+3', trend: 'up', icon: UserCheck, color: 'bg-emerald-50 text-emerald-600', accent: 'text-emerald-600' },
  { label: 'Appointments Today', value: '187', change: '+24%', trend: 'up', icon: Calendar, color: 'bg-violet-50 text-violet-600', accent: 'text-violet-600' },
  { label: 'Revenue (Month)', value: '₹48.2L', change: '+8.4%', trend: 'up', icon: DollarSign, color: 'bg-amber-50 text-amber-600', accent: 'text-amber-600' },
];

const recentAppointments = [
  { patient: 'Riya Sharma', doctor: 'Dr. Aditya Sharma', dept: 'Cardiology', time: '9:00 AM', status: 'Completed' },
  { patient: 'Arun Patel', doctor: 'Dr. Priya Mehta', dept: 'Neurology', time: '10:30 AM', status: 'In Progress' },
  { patient: 'Meena Krishnan', doctor: 'Dr. Sunita Rao', dept: 'Pediatrics', time: '11:00 AM', status: 'Waiting' },
  { patient: 'Vikram Singh', doctor: 'Dr. Rajesh Kumar', dept: 'Orthopedics', time: '2:00 PM', status: 'Scheduled' },
  { patient: 'Lakshmi Iyer', doctor: 'Dr. Aditya Sharma', dept: 'Cardiology', time: '3:30 PM', status: 'Scheduled' },
];

const statusColors: Record<string, string> = {
  'Completed': 'bg-emerald-50 text-emerald-700',
  'In Progress': 'bg-blue-50 text-blue-700',
  'Waiting': 'bg-amber-50 text-amber-700',
  'Scheduled': 'bg-slate-100 text-slate-600',
};

const alerts = [
  { type: 'critical', msg: 'ICU Bed 4 — Patient vitals critical. Immediate attention required.' },
  { type: 'warning', msg: 'Lab report delayed for Patient ID #4821. Expected by 2PM.' },
  { type: 'info', msg: 'Dr. Rajesh Kumar OPD session ending at 1PM today.' },
];

const deptLoad = [
  { name: 'Emergency', load: 92, color: 'bg-red-500' },
  { name: 'Cardiology', load: 78, color: 'bg-blue-500' },
  { name: 'Orthopedics', load: 65, color: 'bg-amber-500' },
  { name: 'General Med', load: 55, color: 'bg-emerald-500' },
  { name: 'Neurology', load: 48, color: 'bg-violet-500' },
];

export default function MISDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 ${card.color} rounded-xl flex items-center justify-center`}>
                  <Icon size={18} />
                </div>
                <span className={`text-xs font-bold flex items-center gap-0.5 ${card.accent}`}>
                  <TrendingUp size={12} />
                  {card.change}
                </span>
              </div>
              <p className="text-2xl font-black text-[#0F172A]">{card.value}</p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">{card.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Appointments Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h3 className="font-black text-[#0F172A] text-sm">Today's Appointments</h3>
            <Link href="/mis/dashboard/appointments" className="text-xs text-blue-600 font-bold flex items-center gap-1 hover:underline">
              View All <ChevronRight size={13} />
            </Link>
          </div>
          <div className="divide-y divide-slate-50">
            {recentAppointments.map((appt, i) => (
              <div key={i} className="flex items-center px-5 py-3.5 hover:bg-slate-50/50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-teal-400 flex items-center justify-center text-white text-[10px] font-black flex-shrink-0">
                  {appt.patient.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#0F172A] truncate">{appt.patient}</p>
                  <p className="text-[11px] text-slate-400 truncate">{appt.doctor} · {appt.dept}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <Clock size={11} />
                    {appt.time}
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusColors[appt.status]}`}>
                    {appt.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Alerts */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h3 className="font-black text-[#0F172A] text-sm">Live Alerts</h3>
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </div>
            <div className="divide-y divide-slate-50">
              {alerts.map((alert, i) => (
                <div key={i} className="flex gap-3 px-5 py-3.5">
                  {alert.type === 'critical' && <AlertTriangle size={14} className="text-red-500 flex-shrink-0 mt-0.5" />}
                  {alert.type === 'warning' && <AlertTriangle size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />}
                  {alert.type === 'info' && <CheckCircle size={14} className="text-blue-500 flex-shrink-0 mt-0.5" />}
                  <p className="text-xs text-slate-600 leading-relaxed">{alert.msg}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Department Load */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <h3 className="font-black text-[#0F172A] text-sm mb-4">Department Load</h3>
            <div className="space-y-3">
              {deptLoad.map((dept) => (
                <div key={dept.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-700">{dept.name}</span>
                    <span className={`font-bold ${dept.load > 80 ? 'text-red-600' : dept.load > 60 ? 'text-amber-600' : 'text-emerald-600'}`}>
                      {dept.load}%
                    </span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${dept.color} rounded-full transition-all`}
                      style={{ width: `${dept.load}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Admit Patient', href: '/mis/dashboard/patients', color: 'bg-blue-600 text-white', icon: Users },
          { label: 'New Appointment', href: '/mis/dashboard/appointments', color: 'bg-emerald-600 text-white', icon: Calendar },
          { label: 'Lab Report', href: '/mis/dashboard/lab', color: 'bg-violet-600 text-white', icon: Activity },
          { label: 'Generate Bill', href: '/mis/dashboard/billing', color: 'bg-amber-600 text-white', icon: DollarSign },
        ].map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.label}
              href={action.href}
              className={`${action.color} rounded-2xl p-4 flex items-center gap-3 font-bold text-sm hover:opacity-90 transition-all hover:-translate-y-0.5 shadow-md`}
            >
              <Icon size={18} />
              {action.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
