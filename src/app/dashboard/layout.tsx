'use client';

import { useAuth } from '@/hooks/useAuth';
import { LayoutDashboard, Users, Calendar, Activity, Utensils, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { name: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
  { name: 'Patients', icon: Users, href: '/dashboard/patients' },
  { name: 'Appointments', icon: Calendar, href: '/dashboard/appointments' },
  { name: 'ICU Monitoring', icon: Activity, href: '/dashboard/icu', roles: ['Doctor', 'Admin'] },
  { name: 'Diet & Canteen', icon: Utensils, href: '/dashboard/diet' },
  { name: 'Management', icon: Settings, href: '/dashboard/admin', roles: ['Admin'] },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  if (!user) return <div className="flex h-screen items-center justify-center">Loading...</div>;

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 border-r border-slate-200 bg-white shadow-sm">
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center border-b border-slate-100 px-6">
            <span className="text-xl font-bold text-blue-600">MediFlow</span>
          </div>

          <nav className="flex-1 space-y-1 px-4 py-4">
            {menuItems
              .filter(item => !item.roles || item.roles.includes(user.role))
              .map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                      isActive ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <item.icon size={18} />
                    {item.name}
                  </Link>
                );
              })}
          </nav>

          <div className="border-t border-slate-100 p-4">
            <div className="mb-4 flex items-center gap-3 px-2">
              <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold">
                {user.full_name[0]}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium text-slate-900">{user.full_name}</p>
                <p className="truncate text-xs text-slate-500">{user.role}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
