'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { CalendarDay } from '@/types/dashboard';
import { PlatformBadge } from '@/components/dashboard/shared/PlatformBadge';
import { StatusBadge } from '@/components/dashboard/shared/StatusBadge';

interface CalendarViewProps {
  days: CalendarDay[];
  currentMonth: number;
  currentYear: number;
  setMonth: (m: number, y: number) => void;
}

export function CalendarView({ days, currentMonth, currentYear, setMonth }: CalendarViewProps) {
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // This is a mockup of calendar logic, creating a simple grid for demonstration
  const generateGrid = () => {
    // Fake 35 cells for month view
    return Array.from({ length: 35 }).map((_, i) => {
      const dayNum = (i % 31) + 1;
      const isToday = dayNum === 15; // mock today
      const hasRuns = i % 5 === 0;
      return {
        date: `2025-${(currentMonth+1).toString().padStart(2,'0')}-${dayNum.toString().padStart(2,'0')}`,
        dayNum,
        isToday,
        isCurrentMonth: i >= 3 && i <= 33,
        runs: hasRuns ? [
          { task_id: '1', title: 'Daily Post', platform: 'linkedin' as any, time: '09:00', status: 'scheduled' as any }
        ] : []
      };
    });
  };

  const grid = generateGrid();

  const nextMonth = () => {
    if (currentMonth === 11) setMonth(0, currentYear + 1);
    else setMonth(currentMonth + 1, currentYear);
  };

  const prevMonth = () => {
    if (currentMonth === 0) setMonth(11, currentYear - 1);
    else setMonth(currentMonth - 1, currentYear);
  };

  return (
    <div className="flex h-[600px] bg-bg-surface border border-border-subtle rounded-xl overflow-hidden shadow-card">
      <div className="flex-1 flex flex-col min-w-0">
        
        <div className="flex items-center justify-between p-4 border-b border-border-subtle bg-bg-card">
          <button className="px-3 py-1.5 rounded-md border border-border-subtle text-[12px] font-medium text-txt hover:bg-white/5 transition-colors">
            Today
          </button>
          
          <div className="flex items-center gap-4">
            <button onClick={prevMonth} className="p-1 rounded text-txt-muted hover:text-txt hover:bg-white/5">
              <ChevronLeft size={20} />
            </button>
            <h2 className="font-space text-[16px] font-bold text-txt min-w-[140px] text-center">
              {monthNames[currentMonth]} {currentYear}
            </h2>
            <button onClick={nextMonth} className="p-1 rounded text-txt-muted hover:text-txt hover:bg-white/5">
              <ChevronRight size={20} />
            </button>
          </div>
          <div className="w-[60px]" /> {/* Spacer */}
        </div>

        <div className="grid grid-cols-7 border-b border-border-subtle bg-bg-card">
          {daysOfWeek.map(d => (
            <div key={d} className="py-2 text-center text-[11px] font-medium text-txt-muted uppercase tracking-wider">
              {d}
            </div>
          ))}
        </div>

        <div className="flex-1 grid grid-cols-7 grid-rows-5 bg-bg-surface">
          {grid.map((cell, i) => (
            <div 
              key={i} 
              onClick={() => cell.runs.length > 0 ? setSelectedDay(cell) : null}
              className={`border-r border-b border-border-subtle p-2 flex flex-col transition-colors
                ${!cell.isCurrentMonth ? 'bg-black/20 opacity-50' : ''}
                ${cell.runs.length > 0 ? 'cursor-pointer hover:bg-white/5' : ''}
              `}
            >
              <div className="flex justify-end">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-medium
                  ${cell.isToday ? 'bg-[var(--brand-gradient)] text-white shadow-[0_0_10px_rgba(124,58,237,0.4)]' : 'text-txt-secondary'}
                `}>
                  {cell.dayNum}
                </div>
              </div>
              
              <div className="flex-1 mt-1 flex gap-1 flex-wrap content-start">
                {cell.runs.map((run, j) => (
                  <div key={j} className="w-2 h-2 rounded-full bg-brand-violet" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedDay && (
        <motion.div 
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 320, opacity: 1 }}
          className="border-l border-border-subtle bg-bg-card flex flex-col shrink-0"
        >
          <div className="p-4 border-b border-border-subtle flex items-center justify-between bg-bg-surface">
            <h3 className="font-space text-[15px] font-bold text-txt">
              {selectedDay.date}
            </h3>
            <button onClick={() => setSelectedDay(null)} className="p-1 rounded text-txt-muted hover:text-txt">
              <X size={16} />
            </button>
          </div>
          <div className="p-4 flex-1 overflow-y-auto space-y-3">
            {selectedDay.runs.map((run, i) => (
              <div key={i} className="p-3 bg-bg-surface border border-border-subtle rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[12px] font-mono text-txt-muted">{run.time}</span>
                  <StatusBadge status={run.status} />
                </div>
                <h4 className="text-[14px] font-semibold text-txt mb-2">{run.title}</h4>
                <div className="flex items-center justify-between">
                  <PlatformBadge platform={run.platform} size="sm" />
                  <button className="text-[11px] font-medium text-brand-violet hover:underline">Run Now &rarr;</button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
