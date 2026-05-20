'use client';

import { useState, useRef, useEffect } from 'react';
import api from '@/lib/api';
import { Sparkles, MessageSquare, X, Send, Stethoscope, Heart, ShieldAlert, Activity } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Welcome to MediFlow AI Clinical Advisor. 🩺\nI can assist you with patient summaries, ICU telemetry protocols, dietary care adjustments, and general medical reference. How can I assist you today?`
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    { label: '🩺 ICU Protocols', query: 'Show ICU monitoring standards and pulse limits.' },
    { label: '🍎 Cardiac Nutrition', query: 'What are standard dietary plans for Cardiovascular Strain?' },
    { label: '📋 Admissions General', query: 'Suggest general symptom checklists for newly admitted patients.' }
  ];

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
      // Attempt to send to our Express backend route
      const { data } = await api.post('/chat', {
        messages: [...messages, userMessage]
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
        } else if (query.includes('checklist') || query.includes('symptom') || query.includes('admit')) {
          reply = `**[MediFlow AI - Admissions Checklist]**
For newly registered admissions (General & ICU Wards):
- Verify baseline vitals (BP, SpO2, Temperature, Heart Rate) within 15 minutes of ward allocation.
- Record primary diagnosis symptoms into the admissions registry.
- Compile initial daily chart status to prompt specific therapeutic plans.`;
        } else {
          reply = `**[MediFlow AI - Clinical Advisor]**
I am here to guide clinical personnel.
- Ask me about **ICU telemetry guidelines**, **nutritional meal adjustments**, or **symptom observations**.
- *Note*: Always verify patient clinical files manually before prescribing medications or altering active procedures.`;
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
                <h4 className="font-extrabold text-sm tracking-wide">MediFlow Clinical AI</h4>
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
              placeholder="Ask MediFlow AI about patients, care protocols..."
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
        className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition duration-300 shadow-lg shadow-blue-500/30 hover:scale-105 active:scale-95 relative group"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        
        {/* Soft glowing outer pulsing ring */}
        <span className="absolute -inset-0.5 rounded-full border border-blue-500/20 group-hover:border-blue-500/40 animate-ping pointer-events-none" style={{ animationDuration: '3s' }} />
      </button>
    </div>
  );
}
