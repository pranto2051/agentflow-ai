'use client';

import React from 'react';
import { Calendar } from 'lucide-react';

interface DateRangePickerProps {
  value: string;
  onChange: (val: string) => void;
}

export function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  const options = [
    { id: '7d', label: 'Last 7 Days' },
    { id: '30d', label: 'Last 30 Days' },
    { id: '90d', label: 'Last 3 Months' },
    { id: 'all', label: 'All Time' }
  ];

  return (
    <div className="relative group">
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-subtle bg-bg-card text-[12px] font-medium text-txt hover:bg-white/5 cursor-pointer transition-colors">
        <Calendar size={14} className="text-txt-muted" />
        {options.find(o => o.id === value)?.label || 'Select Range'}
      </div>
      
      <div className="absolute right-0 top-full mt-1 w-40 bg-bg-surface border border-border-subtle rounded-lg shadow-card py-1 hidden group-hover:block z-10">
        {options.map(opt => (
          <button 
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={`w-full text-left px-3 py-2 text-[12px] hover:bg-white/5 ${value === opt.id ? 'text-brand-violet font-semibold' : 'text-txt-secondary'}`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
