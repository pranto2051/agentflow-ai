'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PlatformBadge } from '@/components/dashboard/shared/PlatformBadge';
import { StatusBadge } from '@/components/dashboard/shared/StatusBadge';
import { Clock, Calendar as CalendarIcon } from 'lucide-react';

interface ListScheduleViewProps {
  items: any[];
  onReschedule: (id: string) => void;
}

export function ListScheduleView({ items, onReschedule }: ListScheduleViewProps) {
  if (items.length === 0) return <div className="text-center p-10 text-txt-muted">No scheduled tasks.</div>;

  return (
    <div className="dash-card overflow-x-auto">
      <div className="min-w-[800px]">
        {/* Header */}
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-border-subtle bg-black/20 text-[11px] uppercase tracking-wider text-txt-muted font-bold">
          <div className="col-span-3">Task</div>
          <div className="col-span-2">Platform</div>
          <div className="col-span-2">Frequency</div>
          <div className="col-span-2">Next Run</div>
          <div className="col-span-2">Last Run</div>
          <div className="col-span-1">Status</div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-border-subtle">
          {items.map((item, i) => (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
              key={item.id} 
              className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-white/5 transition-colors group"
            >
              <div className="col-span-3">
                <p className="text-[13px] font-bold text-txt mb-1">{item.title}</p>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => onReschedule(item.id)} className="text-[11px] text-brand-violet hover:underline">Edit Schedule</button>
                </div>
              </div>
              <div className="col-span-2">
                <PlatformBadge platform={item.platform} />
              </div>
              <div className="col-span-2 flex items-center gap-1.5 text-[12px] text-txt-secondary capitalize">
                <CalendarIcon size={12} className="text-txt-muted" /> {item.type}
              </div>
              <div className="col-span-2 text-[12px] text-txt">
                {item.next_run}
              </div>
              <div className="col-span-2 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green" />
                <span className="text-[12px] text-txt-secondary">{item.last_run || 'Never'}</span>
              </div>
              <div className="col-span-1">
                <StatusBadge status="scheduled" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
