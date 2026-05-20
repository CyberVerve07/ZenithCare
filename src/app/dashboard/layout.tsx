'use client';

import { useAuth } from '@/hooks/useAuth';
import { LayoutDashboard, Users, Calendar, Activity, Utensils, Settings, LogOut, Sparkles, Stethoscope } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import AIChatWidget from '@/components/AIChatWidget';

const menuItems = [
  { name: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
  { name: 'Patients', icon: Users, href: '/dashboard/patients' },
  { name: 'Appointments', icon: Calendar, href: '/dashboard/appointments' },
  { name: 'ICU Monitoring', icon: Activity, href: '/dashboard/icu', roles: ['Doctor', 'Admin'] },
  { name: 'Diet & Canteen', icon: Utensils, href: '/dashboard/diet' },
  { name: 'Management', icon: Settings, href: '/dashboard/admin', roles: ['Admin'] },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/mis/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-slate-50 gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
        <p className="text-sm font-semibold text-slate-500">Securing your session...</p>
      </div>
    );
  }

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

          {/* 3D AI Assistant Promo Card */}
          <div className="px-4 mb-4">
            <div 
              onClick={() => window.dispatchEvent(new Event('open-ai-chat'))}
              className="group relative cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-750 p-4 text-white shadow-[0_12px_24px_-10px_rgba(79,70,229,0.5)] hover:shadow-[0_20px_35px_-12px_rgba(79,70,229,0.7)] transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0.5"
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
            >
              {/* Shimmer effect reflection layer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              
              {/* Metallic border */}
              <div className="absolute inset-0 border border-white/20 rounded-2xl pointer-events-none" />

              {/* Decorative 3D Sparkle Background Icon */}
              <div className="absolute -right-5 -bottom-5 opacity-10 text-white group-hover:scale-110 group-hover:rotate-12 transition duration-500">
                <Sparkles size={80} />
              </div>

              {/* Card Contents using transform-preserve */}
              <div className="relative z-10 space-y-2.5" style={{ transform: 'translateZ(30px)' }}>
                <div className="flex items-center gap-2">
                  <div className="rounded-xl bg-white/20 p-2 shadow-inner group-hover:rotate-12 transition-transform duration-300">
                    <Sparkles className="text-amber-300 animate-pulse" size={16} />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-200">
                    MediFlow Intelligence
                  </span>
                </div>

                <div>
                  <h5 className="font-extrabold text-xs tracking-wide">MediFlow AI Assistant</h5>
                  <p className="text-[10px] text-blue-100/80 leading-relaxed mt-0.5">
                    Real-time diagnostics support, telemetry checks & diet suggestions.
                  </p>
                </div>

                {/* 3D Pushable button surface */}
                <div className="relative pt-1">
                  {/* Pushable button dark base */}
                  <div className="absolute inset-x-0 h-9 bottom-0 rounded-xl bg-indigo-900 shadow-md" />
                  
                  {/* Pushable actual face */}
                  <div className="relative w-full h-9 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-extrabold text-[11px] shadow-inner flex items-center justify-center gap-1.5 border-t border-amber-300/40 transform hover:-translate-y-0.5 active:translate-y-0.5 transition-transform duration-100">
                    <Stethoscope size={13} className="animate-bounce" />
                    <span>Launch AI Advisory</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 p-4">
            <div className="mb-4 flex items-center gap-3 px-2">
              <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold uppercase">
                {(user?.full_name || user?.name || 'U')[0]}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium text-slate-900">{user?.full_name || user?.name}</p>
                <p className="truncate text-xs text-slate-500">{user?.role}</p>
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
      
      {/* Global Clinical AI Chat Assistant Widget */}
      <AIChatWidget />
    </div>
  );
}
