'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, List, Clock } from 'lucide-react';

interface ViewToggleProps {
  view: 'calendar' | 'timeline' | 'list';
  onChange: (view: 'calendar' | 'timeline' | 'list') => void;
}

export function ViewToggle({ view, onChange }: ViewToggleProps) {
  const options = [
    { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
    { id: 'timeline', label: 'Timeline', icon: Clock },
    { id: 'list', label: 'List', icon: List }
  ] as const;

  return (
    <div className="flex items-center p-1 bg-bg-card border border-border-soft rounded-full relative">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onChange(option.id)}
          className={`relative z-10 flex items-center gap-2 px-4 py-1.5 text-[12px] font-medium rounded-full transition-colors duration-200 ${
            view === option.id ? 'text-white' : 'text-txt-muted hover:text-txt'
          }`}
        >
          {view === option.id && (
            <motion.div
              layoutId="activeViewTab"
              className="absolute inset-0 bg-[var(--brand-gradient)] rounded-full -z-10 shadow-[0_0_15px_rgba(124,58,237,0.3)]"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <option.icon size={14} />
          {option.label}
        </button>
      ))}
    </div>
  );
}
