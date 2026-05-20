'use client';

import { useState, useRef, useEffect } from 'react';
import api from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { Sparkles, MessageSquare, X, Send, Stethoscope, Heart, ShieldAlert, Activity } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIChatWidget() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Listen to global open-ai-chat events (triggered from 3D Sidebar button)
  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener('open-ai-chat', handleOpenChat);
    return () => window.removeEventListener('open-ai-chat', handleOpenChat);
  }, []);

  // Set dynamic welcome greeting when user is loaded
  useEffect(() => {
    if (messages.length === 0) {
      const greetingName = user ? (user.name || user.full_name || 'Hospital Member') : 'Hospital Member';
      let content = '';
      if (user?.role === 'Doctor') {
        content = `Welcome back, Dr. ${greetingName}! 🩺\nI am your personal clinical and productivity co-pilot today. I can assist you with patient charts, diagnostic SOAP drafts, ICU vital parameters, drug reference, or any personal task you need. How can I help you today?`;
      } else if (user?.role === 'Admin') {
        content = `Welcome back, Admin ${greetingName}! 💼\nI am your MediFlow executive assistant. I can help you compile department performance statistics, draft staff announcements, check appointment policies, or manage your personal to-do list. How can I support your operations today?`;
      } else if (user?.role === 'Nurse' || user?.role === 'Staff') {
        content = `Welcome back, ${greetingName}! 🧑‍⚕️\nI am your bedside patient-care assistant. I can help you draft nursing shift summaries, update cardiac/diabetic nutrition requirements, run ward checklist prompts, or help with personal shift logs. How can I help you today?`;
      } else {
        content = `Welcome to MediFlow AI Personal Assistant. ✨\nI can assist you with patient summaries, ICU telemetry protocols, dietary care adjustments, scheduling rules, or your daily personal and operational tasks. How can I help you today?`;
      }
      setMessages([
        { role: 'assistant', content }
      ]);
    }
  }, [user, messages.length]);

  // Compute dynamic quick actions based on user role
  const getQuickActions = () => {
    if (!user) {
      return [
        { label: '🩺 ICU Protocols', query: 'Show ICU monitoring standards and pulse limits.' },
        { label: '🍎 Cardiac Nutrition', query: 'What are standard dietary plans for Cardiovascular Strain?' },
        { label: '📋 Admissions General', query: 'Suggest general symptom checklists for newly admitted patients.' }
      ];
    }
    
    switch (user.role) {
      case 'Doctor':
        return [
          { label: '🩺 ICU Protocols', query: 'Show ICU monitoring standards and pulse limits.' },
          { label: '✍️ SOAP Note Draft', query: 'Help me draft a standard clinical SOAP note for a patient with hypertension.' },
          { label: '🔢 Dosage Calc', query: 'What is the formula for calculating pediatric drug dosage?' }
        ];
      case 'Nurse':
      case 'Staff':
        return [
          { label: '📋 Admissions Checklist', query: 'Suggest a standard checklist for a newly admitted ward patient.' },
          { label: '🍎 Diet Guidelines', query: 'Show standard dietary plans for low-sodium cardiovascular patients.' },
          { label: '📝 Shift Handover', query: 'Help me structure a professional nursing shift handover note.' }
        ];
      case 'Admin':
        return [
          { label: '📊 Ward Metrics', query: 'What are key performance indicators to monitor for hospital ward utilization?' },
          { label: '✉️ Draft Staff Email', query: 'Draft a professional notification to staff about upcoming database system maintenance.' },
          { label: '📅 Conflict Rules', query: 'Explain the backend scheduling conflict prevention logic.' }
        ];
      default:
        return [
          { label: '🩺 ICU Protocols', query: 'Show ICU monitoring standards and pulse limits.' },
          { label: '🍎 Cardiac Nutrition', query: 'What are standard dietary plans for Cardiovascular Strain?' },
          { label: '📋 Admissions General', query: 'Suggest general symptom checklists for newly admitted patients.' }
        ];
    }
  };

  const quickActions = getQuickActions();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Attempt to send to our Express backend route with userContext for personalization
      const { data } = await api.post('/chat', {
        messages: [...messages, userMessage],
        userContext: user ? { name: user.name || user.full_name, role: user.role } : undefined
      });
      
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (err: any) {
      console.warn('[AI Assistant Chat] Server offline or request failed, using intelligent offline client advisor fallback:', err.message);
      
      // Simulate delay for a natural clinical reasoning feel
      setTimeout(() => {
        const query = text.toLowerCase();
        let reply = '';

        if (query.includes('icu') || query.includes('critical') || query.includes('monitoring')) {
          reply = `**[MediFlow AI - Clinical Protocols]**
Based on critical care telemetry standards:
- Continuous EKG, pulse oximetry, and arterial blood pressure monitoring is strongly advised.
- Maintain target oxygen saturation (SpO2) above 93% for standard adult ICU admissions.
- Trigger doctor notifications immediately if heart rate fluctuations exceed 120 bpm or drop below 50 bpm.`;
        } else if (query.includes('diet') || query.includes('cardiac') || query.includes('food') || query.includes('nutrition')) {
          reply = `**[MediFlow AI - Clinical Nutrition Plan]**
Standard clinical nutrition recommendations:
1. **Cardiovascular Strain (e.g. Bed B-101/ICU-02)**: Strict sodium restriction (<2g/day), low saturated fat regimen, fluid monitoring (restrict to 1.5L/day if congestive symptoms exist).
2. **Standard Recovery**: High-protein, rich fiber vegetables, mineral-rich broths.
3. **Glycemic Control**: Complex carbohydrates, zero added refined sugar.`;
        } else if (query.includes('checklist') || query.includes('symptom') || query.includes('admit') || query.includes('admission')) {
          reply = `**[MediFlow AI - Admissions Checklist]**
For newly registered admissions (General & ICU Wards):
- Verify baseline vitals (BP, SpO2, Temperature, Heart Rate) within 15 minutes of ward allocation.
- Record primary diagnosis symptoms into the admissions registry.
- Compile initial daily chart status to prompt specific therapeutic plans.`;
        } else if (query.includes('soap') || query.includes('note') || query.includes('draft')) {
          reply = `**[MediFlow AI - Personal SOAP Note Template]**
Subjective, Objective, Assessment, Plan structure:
- **Subjective**: Patient reports persistent chest tightness and moderate headache over the past 24 hours.
- **Objective**: BP 142/92, HR 84 bpm, Temp 98.6°F, SpO2 96% on room air.
- **Assessment**: Stage 2 Hypertension with symptoms, currently stable but requires diet & lifestyle modifications.
- **Plan**: Initiate low-sodium meal plan, monitor BP twice daily, follow up in 3 days.`;
        } else if (query.includes('email') || query.includes('message') || query.includes('notice')) {
          reply = `**[MediFlow AI - Personal Email Draft]**
Subject: Important Notice: Planned MediFlow Database Maintenance

Dear Team,
Please note that our core database registry will undergo a scheduled maintenance update this Friday at 11:00 PM EST (approx. 45 mins duration). 
During this brief window:
- Emergency admissions will bypass the registry to ensure zero conflict.
- All offline telemetry guidelines apply.

Thank you for your dedication to patient care.
Best regards,
Orchids MediFlow Administration`;
        } else if (query.includes('dosage') || query.includes('calc') || query.includes('formula')) {
          reply = `**[MediFlow AI - Personal Calculation Assistant]**
Pediatric dosage calculations standard reference:
- **Clark's Rule**: Weight of child in lbs / 150 * Adult Dose = Child Dose.
- **Body Surface Area (BSA) Rule**: BSA of child (m²) / 1.7 * Adult Dose = Child Dose.
- *Caution*: Standard dosages must be double-checked against electronic medical records (EMR) protocols.`;
        } else if (query.includes('conflict') || query.includes('rule') || query.includes('postgres')) {
          reply = `**[MediFlow AI - System Rules]**
MediFlow Scheduling Rules:
- Backend uses strict transaction-level validation in PostgreSQL to ensure no physician is double-booked for the same time window.
- The system automatically triggers an alert if any conflict is detected.`;
        } else {
          reply = `**[MediFlow AI - Personal Assistant]**
Hello! I am your personalized MediFlow AI Companion.
I am configured for general personal productivity and clinical support.
- Feel free to ask me to **draft emails**, **structure clinical notes**, **calculate clinical values**, or **review ward guidelines**.
- *Tip*: Let me know if you need helper templates for daily tasks!`;
        }

        setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
        setIsLoading(false);
      }, 1000);
      return;
    }

    setIsLoading(false);
  };

  const parseMessageContent = (text: string) => {
    // Basic clinical markdown-to-html helper
    const lines = text.split('\n');
    return (
      <div className="space-y-1.5 text-xs leading-relaxed">
        {lines.map((line, i) => {
          if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
            return (
              <div key={i} className="flex items-start gap-1.5 pl-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>{line.substring(2)}</span>
              </div>
            );
          }
          if (line.startsWith('**') && line.endsWith('**')) {
            return (
              <p key={i} className="font-bold text-slate-900 border-b border-slate-100 pb-0.5 mt-2">
                {line.replace(/\*\*/g, '')}
              </p>
            );
          }
          return <p key={i}>{line}</p>;
        })}
      </div>
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-96 rounded-2xl border border-slate-200/80 bg-white/95 backdrop-blur-md shadow-2xl overflow-hidden flex flex-col h-[500px] animate-in slide-in-from-bottom duration-300">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="rounded-xl bg-white/20 p-2 text-white">
                <Sparkles size={18} className="animate-pulse" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm tracking-wide">MediFlow AI Assistant</h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="h-2 w-2 rounded-full bg-green-400 animate-ping" />
                  <span className="text-[10px] text-blue-100 font-medium">Assistant Online</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1 text-blue-100 hover:bg-white/10 hover:text-white transition"
            >
              <X size={18} />
            </button>
          </div>

          {/* Quick clinical actions */}
          <div className="p-3 bg-slate-50 border-b border-slate-100 flex flex-wrap gap-1.5">
            {quickActions.map((act, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(act.query)}
                className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-[10px] font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition duration-300 shadow-sm"
              >
                {act.label}
              </button>
            ))}
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white border border-slate-100 text-slate-700 rounded-bl-none'
                  }`}
                >
                  {parseMessageContent(msg.content)}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex items-center gap-2">
                  <Activity size={14} className="animate-spin text-blue-600" />
                  <span className="text-xs text-slate-500 font-medium italic animate-pulse">
                    MediFlow AI is formulating advice...
                  </span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(input);
            }}
            className="p-3 border-t border-slate-100 bg-white flex gap-2"
          >
            <input
              type="text"
              className="flex-1 rounded-xl border border-slate-200 px-3.5 py-2 text-xs focus:border-blue-500 focus:outline-none bg-slate-50/50"
              placeholder="Ask MediFlow AI for help with tasks, notes, patients..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="rounded-xl bg-blue-600 p-2.5 text-white hover:bg-blue-700 disabled:opacity-50 transition"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}

      {/* Floating Button Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-[60px] h-[60px] rounded-full p-[2.5px] bg-gradient-to-tr from-violet-600 via-fuchsia-500 to-cyan-400 shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:shadow-[0_0_30px_rgba(168,85,247,0.85)] hover:scale-105 active:scale-95 transition-all duration-300 relative group cursor-pointer"
      >
        {/* Dark inner face */}
        <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center overflow-hidden relative shadow-inner">
          {/* Inner shadow/sheen overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
          
          {isOpen ? (
            <X size={22} className="text-white animate-in spin-in duration-300" />
          ) : (
            <svg viewBox="0 0 100 100" className="w-[36px] h-[36px] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)] transform group-hover:scale-105 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round">
              {/* Premium signature cursive path representing clinical intelligence signature */}
              <path d="M25,65 C30,45 40,25 50,25 C55,25 58,35 55,45 C50,60 40,75 55,75 C65,75 75,55 78,40 M72,30 C76,28 80,32 78,36 C76,42 70,68 76,70 C79,71 84,65 86,60" />
            </svg>
          )}
        </div>
        
        {/* Notification telemetry status dot on top right */}
        {!isOpen && (
          <span className="absolute -top-0.5 -right-0.5 h-[17px] w-[17px] rounded-full bg-red-500 border-2 border-white shadow-sm flex items-center justify-center animate-bounce" style={{ animationDuration: '2.5s' }}>
            <span className="h-[6px] w-[6px] rounded-full bg-white" />
          </span>
        )}
      </button>
    </div>
  );
}
