'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock } from 'lucide-react';
import { scaleIn } from '@/lib/animations/dashboard';

interface RescheduleModalProps {
  open: boolean;
  onClose: () => void;
  task: any | null;
  onSave: (id: string, newTime: any) => void;
}

export function RescheduleModal({ open, onClose, task, onSave }: RescheduleModalProps) {
  const [time, setTime] = useState('09:00');
  const [timezone, setTimezone] = useState('UTC');
  const [day, setDay] = useState(1); // 0-6 for weekly

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  if (!open || !task) return null;

  const handleSave = () => {
    onSave(task.id, { schedule_time: time, timezone, schedule_day: day });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
        
        <motion.div variants={scaleIn} initial="initial" animate="animate" exit="initial" className="relative w-full max-w-[400px] bg-bg-surface border border-border-subtle rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden">
          
          <div className="flex items-center justify-between p-5 border-b border-border-subtle">
            <h2 className="font-space text-[16px] font-semibold text-txt">Reschedule Task</h2>
            <button onClick={onClose} className="p-1.5 rounded-md text-txt-muted hover:text-txt hover:bg-white/5 transition-colors">
              <X size={18} />
            </button>
          </div>

          <div className="p-5 space-y-5">
            <div className="text-[13px] text-txt-secondary text-center p-3 rounded-lg bg-bg-card border border-border-subtle">
              Currently: {task.type} at {task.time} (UTC)
            </div>

            {task.type === 'weekly' && (
              <div>
                <label className="block text-[13px] font-medium text-txt-secondary mb-2">Day of Week</label>
                <div className="flex justify-between">
                  {days.map((d, i) => (
                    <button 
                      key={d} 
                      onClick={() => setDay(i)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-[12px] font-medium transition-colors ${day === i ? 'bg-[var(--brand-gradient)] text-white shadow-sm' : 'bg-input text-txt-secondary hover:bg-white/5 border border-border-subtle'}`}
                    >
                      {d[0]}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-medium text-txt-secondary mb-1.5">Time</label>
                <div className="relative">
                  <Clock size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-txt-muted" />
                  <input type="time" value={time} onChange={e => setTime(e.target.value)} className="w-full bg-input border border-border-subtle rounded-lg pl-9 pr-3 py-2 text-[14px] text-txt focus:border-brand-violet outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-[13px] font-medium text-txt-secondary mb-1.5">Timezone</label>
                <select value={timezone} onChange={e => setTimezone(e.target.value)} className="w-full bg-input border border-border-subtle rounded-lg px-3 py-2 text-[14px] text-txt focus:border-brand-violet outline-none appearance-none">
                  <option value="UTC">UTC</option>
                  <option value="Asia/Dhaka">Asia/Dhaka</option>
                  <option value="America/New_York">America/New_York</option>
                  <option value="Europe/London">Europe/London</option>
                </select>
              </div>
            </div>

            <div className="text-center text-[12px] text-brand-violet mt-2">
              Will next run: Tomorrow at {time}
            </div>
          </div>

          <div className="flex gap-3 p-5 border-t border-border-subtle bg-bg-surface">
            <button onClick={onClose} className="flex-1 py-2 rounded-lg border border-border-subtle text-[13px] font-medium text-txt-secondary hover:text-txt hover:bg-white/5 transition-colors">
              Cancel
            </button>
            <button onClick={handleSave} className="flex-1 py-2 rounded-lg bg-[var(--brand-gradient)] text-white text-[13px] font-medium shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-colors">
              Save Schedule
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
