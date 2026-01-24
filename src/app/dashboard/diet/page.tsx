'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Utensils, Clipboard, Clock } from 'lucide-react';

export default function DietPage() {
  const [dietPlans, setDietPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiet = async () => {
      try {
        const { data } = await api.get('/diet');
        setDietPlans(data);
      } catch (err) { console.error(err); }
      setLoading(false);
    };
    fetchDiet();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Diet & Canteen</h1>
        <p className="text-slate-500">Manage patient-specific diet plans and daily menus.</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
          <h2 className="font-bold text-slate-900 flex items-center gap-2">
            <Clipboard size={18} className="text-blue-600" />
            Today's Diet Plans
          </h2>
        </div>
        
        <div className="divide-y divide-slate-100">
          {loading ? (
            <p className="p-12 text-center text-slate-500">Loading diet plans...</p>
          ) : dietPlans.length === 0 ? (
            <p className="p-12 text-center text-slate-500">No diet plans assigned for today.</p>
          ) : dietPlans.map((plan: any) => (
            <div key={plan.id} className="p-6 flex flex-col md:flex-row md:items-start gap-6">
              <div className="md:w-1/4">
                <p className="font-bold text-slate-900">{plan.patient_name}</p>
                <p className="text-xs text-slate-500 mt-1">Plan Date: {new Date(plan.plan_date).toLocaleDateString()}</p>
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Utensils size={14} />
                    Daily Menu
                  </h4>
                  <p className="mt-1 text-sm text-slate-600 bg-slate-50 rounded-lg p-3">{plan.menu}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Clock size={14} />
                    Instructions
                  </h4>
                  <p className="mt-1 text-sm text-slate-600">{plan.instructions}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
