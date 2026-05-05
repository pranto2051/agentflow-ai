'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PlatformBadge } from '@/components/dashboard/shared/PlatformBadge';
import { Play, Calendar, FastForward } from 'lucide-react';

interface TimelineViewProps {
  upcoming: any[];
  onReschedule: (id: string) => void;
  onRun: (id: string) => void;
}

export function TimelineView({ upcoming, onReschedule, onRun }: TimelineViewProps) {
  // Mock grouping
  const sections = [
    { title: "Today", date: "Monday, May 5", items: [
      { id: '1', time: '09:00 AM', title: 'Daily Learning Post', platform: 'linkedin', relative: 'in 2 hours', type: 'daily' },
      { id: '2', time: '02:30 PM', title: 'Project Update', platform: 'twitter', relative: 'in 6 hours', type: 'weekly' }
    ]},
    { title: "Tomorrow", date: "Tuesday, May 6", items: [
      { id: '3', time: '09:00 AM', title: 'Daily Learning Post', platform: 'linkedin', relative: 'tomorrow', type: 'daily' }
    ]}
  ];

  if (upcoming.length === 0) {
    return <div className="text-center p-10 text-txt-muted">No timeline items.</div>;
  }

  return (
    <div className="max-w-[800px] mx-auto py-6">
      {sections.map((section, idx) => (
        <div key={idx} className="mb-10">
          <div className="flex items-center gap-4 mb-6">
            <h3 className="font-space text-[14px] font-bold text-txt">{section.date}</h3>
            {section.title === 'Today' && <span className="px-2 py-0.5 rounded bg-brand-bg border border-brand-border text-[10px] font-bold text-brand-violet-light uppercase tracking-wider">Today</span>}
            <div className="flex-1 h-[1px] bg-gradient-to-r from-[var(--brand-violet)] to-transparent opacity-30" />
          </div>

          <div className="space-y-0">
            {section.items.map((item, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                key={item.id} className="group flex relative"
              >
                {/* Time Column */}
                <div className="w-[80px] pt-4 pr-4 text-right">
                  <span className="font-mono text-[12px] text-txt-muted group-hover:text-txt transition-colors">{item.time}</span>
                </div>

                {/* Line & Dot */}
                <div className="relative flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full z-10 mt-4 border-2 border-bg-void ${section.title === 'Today' ? 'bg-brand-cyan' : 'bg-border-medium group-hover:bg-brand-violet'} transition-colors`} />
                  <div className="w-[1px] bg-border-subtle absolute top-7 bottom-[-20px] group-last:bottom-0" />
                </div>

                {/* Card */}
                <div className="flex-1 pl-6 pb-6 pt-1">
                  <div className="dash-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-space text-[14px] font-bold text-txt mb-2">{item.title}</h4>
                      <div className="flex items-center gap-3">
                        <PlatformBadge platform={item.platform as any} size="sm" />
                        <span className="text-[10px] uppercase font-bold tracking-wider text-txt-muted bg-white/5 px-1.5 py-0.5 rounded">{item.type}</span>
                        <span className="text-[11px] text-txt-muted">{item.relative}</span>
                      </div>
                    </div>

                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                      <button onClick={() => onRun(item.id)} className="p-2 rounded-lg bg-brand-bg text-brand-violet hover:bg-brand-violet hover:text-white transition-colors" title="Run Now">
                        <Play size={14} />
                      </button>
                      <button onClick={() => onReschedule(item.id)} className="p-2 rounded-lg bg-white/5 text-txt-secondary hover:text-txt hover:bg-white/10 transition-colors" title="Reschedule">
                        <Calendar size={14} />
                      </button>
                      <button className="p-2 rounded-lg bg-white/5 text-txt-secondary hover:text-txt hover:bg-white/10 transition-colors" title="Skip">
                        <FastForward size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
