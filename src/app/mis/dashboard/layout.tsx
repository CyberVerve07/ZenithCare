'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Users, UserCheck, Calendar, Building2,
  FlaskConical, DollarSign, Bell, Settings, Menu, X,
  Heart, LogOut, ChevronRight, Moon, Sun
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/mis/dashboard' },
  { icon: Users, label: 'Patients', href: '/mis/dashboard/patients' },
  { icon: UserCheck, label: 'Doctors', href: '/mis/dashboard/doctors' },
  { icon: Calendar, label: 'Appointments', href: '/mis/dashboard/appointments' },
  { icon: Building2, label: 'Departments', href: '/mis/dashboard/departments' },
  { icon: FlaskConical, label: 'Lab Reports', href: '/mis/dashboard/lab' },
  { icon: DollarSign, label: 'Billing', href: '/mis/dashboard/billing' },
  { icon: Bell, label: 'Notifications', href: '/mis/dashboard/notifications' },
  { icon: Settings, label: 'Settings', href: '/mis/dashboard/settings' },
];

export default function MISDashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const pathname = usePathname();

  return (
    <div className={`flex h-screen overflow-hidden ${darkMode ? 'bg-[#0F172A]' : 'bg-[#F8FAFC]'}`}>
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 flex-shrink-0 ${darkMode ? 'bg-[#1E293B] border-slate-700' : 'bg-white border-slate-200'} border-r flex flex-col`}>
        {/* Logo */}
        <div className={`h-16 flex items-center px-4 border-b ${darkMode ? 'border-slate-700' : 'border-slate-100'}`}>
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center flex-shrink-0">
            <Heart size={15} className="text-white" fill="white" />
          </div>
          {sidebarOpen && (
            <span className={`ml-3 font-black text-base ${darkMode ? 'text-white' : 'text-[#0F172A]'}`}>
              Medi<span className="gradient-text">Flow</span>
              <span className={`ml-1 text-xs font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-400'}`}>MIS</span>
            </span>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`ml-auto p-1.5 rounded-lg ${darkMode ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-slate-100 text-slate-500'} transition-colors`}
          >
            {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : darkMode
                    ? 'text-slate-400 hover:text-white hover:bg-slate-700'
                    : 'text-slate-600 hover:text-[#0F172A] hover:bg-slate-100'
                }`}
              >
                <Icon size={18} className="flex-shrink-0" />
                {sidebarOpen && (
                  <>
                    <span className="text-sm font-semibold flex-1">{item.label}</span>
                    {isActive && <ChevronRight size={14} />}
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className={`p-3 border-t ${darkMode ? 'border-slate-700' : 'border-slate-100'} space-y-1`}>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
              darkMode ? 'text-slate-400 hover:text-white hover:bg-slate-700' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            {sidebarOpen && <span className="text-sm font-semibold">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>}
          </button>
          <Link
            href="/mis/login"
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
              darkMode ? 'text-red-400 hover:bg-red-500/10' : 'text-red-500 hover:bg-red-50'
            }`}
          >
            <LogOut size={18} />
            {sidebarOpen && <span className="text-sm font-semibold">Sign Out</span>}
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className={`h-16 flex items-center justify-between px-6 border-b ${darkMode ? 'bg-[#1E293B] border-slate-700' : 'bg-white border-slate-200'} flex-shrink-0`}>
          <div>
            <h1 className={`text-sm font-black ${darkMode ? 'text-white' : 'text-[#0F172A]'}`}>
              {navItems.find(n => n.href === pathname)?.label || 'Dashboard'}
            </h1>
            <p className={`text-[10px] ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
              {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className={`relative p-2 rounded-lg ${darkMode ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-slate-100 text-slate-500'}`}>
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center text-white text-xs font-black">
                AD
              </div>
              {sidebarOpen && (
                <div className="hidden sm:block">
                  <p className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-[#0F172A]'}`}>Dr. Sarah Admin</p>
                  <p className={`text-[10px] ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Administrator</p>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className={`flex-1 overflow-y-auto p-6 ${darkMode ? 'text-white' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  );
}
