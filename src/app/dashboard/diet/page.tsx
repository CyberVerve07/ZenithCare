'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { 
  Utensils, 
  Clipboard, 
  Clock, 
  Plus, 
  X, 
  Save, 
  Check, 
  Activity, 
  Flame, 
  TrendingUp, 
  AlertCircle,
  Truck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DietPage() {
  const [dietPlans, setDietPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Modal & Form State
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState('');
  const [form, setForm] = useState({
    patient_id: '1',
    breakfast: '',
    lunch: '',
    dinner: '',
    instructions: '',
    preset: 'none'
  });

  // Simulated queue states for recovery meals
  const queueStages = [
    { label: 'Ingr Prep', icon: Clipboard, color: 'text-blue-500 bg-blue-500/10 border-blue-500/20' },
    { label: 'Cooking', icon: Flame, color: 'text-amber-500 bg-amber-500/10 border-amber-500/20' },
    { label: 'Plating', icon: Utensils, color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20' },
    { label: 'Dispatched', icon: Truck, color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' }
  ];

  const presets: Record<string, { breakfast: string, lunch: string, dinner: string, instructions: string }> = {
    cardiac: {
      breakfast: 'Egg white scramble, spinach, whole wheat toast, green tea',
      lunch: 'Quinoa bowl with steamed vegetables, baked salmon (omega-3 rich)',
      dinner: 'Vegetable broth, grilled tofu, sweet potato mash',
      instructions: 'Cardiovascular Diet: Strictly low sodium, no caffeine, fluid cap: 1.5L.'
    },
    diabetic: {
      breakfast: 'Oatmeal cooked in water, unsweetened almond butter, berries',
      lunch: 'Mixed green salad, grilled chicken breast, light olive oil drizzle',
      dinner: 'Steamed white fish, roasted asparagus, brown rice',
      instructions: 'Diabetic Safe: Strictly sugar-free, low glycemic index, carbohydrate cap: 45g/meal.'
    },
    protein: {
      breakfast: 'Greek yogurt with raw honey, whey protein shake, scrambled eggs',
      lunch: 'Lean beef sirloin strips, black beans, steamed broccoli crown',
      dinner: 'Baked salmon filet, lentil salad, mixed garden greens',
      instructions: 'High Protein Recovery: Targeted for post-surgical muscular ward rehabilitation.'
    }
  };

  const fetchDiet = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/diet');
      setDietPlans(data || []);
    } catch (err) { 
      console.error(err); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiet();
  }, []);

  const handlePresetChange = (preset: string) => {
    setForm(prev => {
      if (preset === 'none') {
        return { ...prev, preset, breakfast: '', lunch: '', dinner: '', instructions: '' };
      }
      const selected = presets[preset];
      return {
        ...prev,
        preset,
        breakfast: selected.breakfast,
        lunch: selected.lunch,
        dinner: selected.dinner,
        instructions: selected.instructions
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError('');
    setFormSuccess(false);

    try {
      // POST /api/diet/update
      await api.post('/diet/update', {
        patient_id: Number(form.patient_id),
        breakfast: form.breakfast,
        lunch: form.lunch,
        dinner: form.dinner,
        instructions: form.instructions
      });

      setFormSuccess(true);
      setTimeout(() => {
        setShowModal(false);
        setFormSuccess(false);
        setForm({
          patient_id: '1',
          breakfast: '',
          lunch: '',
          dinner: '',
          instructions: '',
          preset: 'none'
        });
        fetchDiet();
      }, 1500);

    } catch (err: any) {
      setFormError(err.response?.data?.error || err.message || 'Failed to update diet plan.');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredPlans = dietPlans.filter((plan: any) => 
    (plan.patient_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (plan.instructions || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Utensils className="text-blue-600 animate-pulse" size={24} />
            Dietary & Nutrition Command
          </h1>
          <p className="text-slate-500">Prescribe customized clinical recovery meals, monitor nutritional values, and track kitchen queues.</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3.5 text-xs font-black uppercase tracking-wider text-white hover:bg-blue-700 transition duration-300 shadow-lg shadow-blue-500/20 cursor-pointer"
        >
          <Plus size={16} />
          Prescribe Meal Plan
        </button>
      </div>

      {/* Filter toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400 font-mono">Nutrition Database Search</span>
        <input
          type="text"
          className="w-full sm:w-80 rounded-2xl border border-slate-200 px-4 py-3 text-xs focus:border-blue-500 focus:outline-none bg-slate-50/50"
          placeholder="Filter patients, categories, keywords..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Diet Cards Grid */}
      <div className="grid gap-8 lg:grid-cols-2">
        {loading ? (
          Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm animate-pulse space-y-4">
              <div className="h-6 bg-slate-200 rounded w-1/3" />
              <div className="h-24 bg-slate-100 rounded w-full" />
            </div>
          ))
        ) : filteredPlans.length === 0 ? (
          <div className="col-span-full text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200 text-slate-400">
            <Clipboard size={48} className="mx-auto text-slate-300 mb-3" />
            <p className="font-bold text-slate-650 text-sm">No diet plans assigned today</p>
            <p className="text-xs text-slate-400 mt-1">Prescribe structured nutrient meals above to get started.</p>
          </div>
        ) : filteredPlans.map((plan: any, idx) => {
          // Simulated calorie/macro targets depending on patient ID to keep interface dynamic
          const cals = plan.patient_id === 3 ? 1800 : plan.patient_id === 1 ? 2200 : 2000;
          const prot = plan.patient_id === 3 ? '85g' : plan.patient_id === 1 ? '110g' : '95g';
          const carbs = plan.patient_id === 3 ? '180g' : plan.patient_id === 1 ? '240g' : '200g';
          
          // Simulated kitchen queue stage depending on patient ID
          const activeStageIdx = plan.patient_id === 3 ? 3 : 1;

          return (
            <motion.div
              layout
              key={plan.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl hover:translate-y-[-2px] transition duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div className="space-y-6">
                {/* Card Header */}
                <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="font-extrabold text-lg text-slate-950">{plan.patient_name}</h3>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono mt-0.5">PLAN NODE #{plan.id}</p>
                  </div>
                  
                  <span className="flex items-center gap-1.5 text-[10px] font-extrabold text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full font-mono uppercase tracking-wide">
                    <Flame size={12} className="text-amber-500" />
                    {cals} Kcal Target
                  </span>
                </div>

                {/* Nutrient Macros Progress Indicators */}
                <div className="space-y-3 bg-slate-50/50 rounded-2xl p-4 border border-slate-100">
                  <div className="flex items-center justify-between text-[10px] font-extrabold text-slate-450 uppercase font-mono tracking-wider">
                    <span>Clinical Macro Target</span>
                    <span>Nominal Ratio</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Protein:</span>
                        <strong className="text-slate-800">{prot}</strong>
                      </div>
                      <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: plan.patient_id === 3 ? '45%' : '65%' }} />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Carbs:</span>
                        <strong className="text-slate-800">{carbs}</strong>
                      </div>
                      <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: plan.patient_id === 3 ? '35%' : '55%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Meals Menu breakdown */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-450 font-mono">Breakfast Menu</h4>
                    <p className="text-xs text-slate-650 bg-slate-50 rounded-xl p-3 border border-slate-100 leading-relaxed font-medium">
                      {plan.breakfast || 'Not specified.'}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-450 font-mono">Lunch Menu</h4>
                    <p className="text-xs text-slate-650 bg-slate-50 rounded-xl p-3 border border-slate-100 leading-relaxed font-medium">
                      {plan.lunch || 'Not specified.'}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-450 font-mono">Dinner Menu</h4>
                    <p className="text-xs text-slate-650 bg-slate-50 rounded-xl p-3 border border-slate-100 leading-relaxed font-medium">
                      {plan.dinner || 'Not specified.'}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-450 font-mono flex items-center gap-1.5">
                      <Clock size={13} className="text-blue-500" />
                      Prescriptive Instructions
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed pl-1 font-semibold">
                      {plan.instructions}
                    </p>
                  </div>
                </div>
              </div>

              {/* Kitchen active queue tracker pipeline */}
              <div className="border-t border-slate-100 pt-6 mt-6">
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 font-mono mb-3.5">
                  Canteen Active Service Pipeline
                </p>
                <div className="grid grid-cols-4 gap-2 text-center text-[9px] font-extrabold font-mono">
                  {queueStages.map((stage, idx) => {
                    const StageIcon = stage.icon;
                    const isActive = idx <= activeStageIdx;
                    const isCurrent = idx === activeStageIdx;
                    
                    return (
                      <div key={stage.label} className="space-y-1.5">
                        <div className={`mx-auto rounded-xl p-2.5 border flex items-center justify-center w-fit transition duration-300 ${
                          isActive 
                            ? stage.color + ' shadow-md scale-105' 
                            : 'bg-slate-50 border-slate-200 text-slate-350'
                        } ${isCurrent ? 'animate-pulse' : ''}`}>
                          <StageIcon size={12} />
                        </div>
                        <span className={`block truncate ${isActive ? 'text-slate-800' : 'text-slate-400'}`}>
                          {stage.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Slide-Over / Modal: Prescribe Diet Plan */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md rounded-[2.2rem] border border-slate-200 bg-white p-8 shadow-2xl space-y-6 text-slate-900 overflow-y-auto max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-blue-50 border border-blue-100 p-3 text-blue-600">
                    <Utensils size={20} className="animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black tracking-tight text-slate-950">Prescribe Recovery Menu</h3>
                    <p className="text-[10px] text-slate-550 font-mono uppercase tracking-widest">CLINICAL DIET WARD MATRIX</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-slate-200 p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-800 transition cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Preset Selector */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 font-mono block mb-2">Auto-fill Clinician Presets</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: 'cardiac', label: 'Cardiac' },
                    { key: 'diabetic', label: 'Diabetic' },
                    { key: 'protein', label: 'High Protein' }
                  ].map((preset) => (
                    <button
                      key={preset.key}
                      type="button"
                      onClick={() => handlePresetChange(preset.key)}
                      className={`py-2 px-1.5 rounded-xl border text-[10px] font-extrabold tracking-wide transition duration-200 cursor-pointer ${
                        form.preset === preset.key 
                          ? 'bg-blue-50 border-blue-500 text-blue-700 font-black shadow-inner' 
                          : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Feedback messages */}
              {formError && (
                <div className="rounded-2xl bg-red-50 border border-red-150 p-4 text-xs text-red-700 flex gap-2">
                  <AlertCircle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="font-semibold">{formError}</span>
                </div>
              )}

              {formSuccess && (
                <div className="rounded-2xl bg-green-50 border border-green-200 p-4 text-xs text-green-700 flex items-center gap-2">
                  <Check size={16} className="text-green-600" />
                  <span className="font-bold">Recovery diet plan recorded and synced to registry.</span>
                </div>
              )}

              {/* Form */}
              {!formSuccess && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 font-mono">Target Patient Profile</label>
                    <select
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 text-xs bg-white focus:border-blue-500 focus:outline-none"
                      value={form.patient_id}
                      onChange={(e) => setForm({ ...form, patient_id: e.target.value })}
                    >
                      <option value="1">John Doe (Age 45, Male)</option>
                      <option value="2">Jane Smith (Age 32, Female)</option>
                      <option value="3">Robert Johnson (Age 67, Male)</option>
                      <option value="4">Emily Davis (Age 12, Female)</option>
                      <option value="5">Michael Brown (Age 58, Male)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 font-mono">Breakfast Composition</label>
                    <textarea
                      required
                      rows={2}
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-xs focus:border-blue-500 focus:outline-none bg-white font-medium"
                      placeholder="e.g. Oats with fruit..."
                      value={form.breakfast}
                      onChange={(e) => setForm({ ...form, breakfast: e.target.value })}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 font-mono">Lunch Composition</label>
                    <textarea
                      required
                      rows={2}
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-xs focus:border-blue-500 focus:outline-none bg-white font-medium"
                      placeholder="e.g. Quinoa salad with grilled protein..."
                      value={form.lunch}
                      onChange={(e) => setForm({ ...form, lunch: e.target.value })}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 font-mono">Dinner Composition</label>
                    <textarea
                      required
                      rows={2}
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-xs focus:border-blue-500 focus:outline-none bg-white font-medium"
                      placeholder="e.g. Heart broth and vegetables..."
                      value={form.dinner}
                      onChange={(e) => setForm({ ...form, dinner: e.target.value })}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 font-mono">Special Directives / Instructions</label>
                    <textarea
                      required
                      rows={2}
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-xs focus:border-blue-500 focus:outline-none bg-white font-medium"
                      placeholder="e.g. Strictly low glycemic, cap fluid intake..."
                      value={form.instructions}
                      onChange={(e) => setForm({ ...form, instructions: e.target.value })}
                    />
                  </div>

                  <div className="flex gap-4 pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="flex-1 rounded-2xl border border-slate-200 py-3.5 text-xs font-bold text-slate-550 hover:bg-slate-50 transition cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 rounded-2xl bg-blue-600 py-3.5 text-xs font-black uppercase tracking-wider text-white hover:bg-blue-700 transition shadow-lg shadow-blue-500/15 cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      {submitting ? (
                        'Syncing Matrix...'
                      ) : (
                        <>
                          <Save size={13} /> Prescribe Diet
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
