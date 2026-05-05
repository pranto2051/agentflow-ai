'use client';

import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TaskFiltersBarProps {
  filters: Record<string, string>;
  onChange: (filters: Record<string, string>) => void;
}

export function TaskFiltersBar({ filters, onChange }: TaskFiltersBarProps) {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const hasActiveFilters = Object.keys(filters).length > 0;

  const handleClear = () => onChange({});

  const updateFilter = (key: string, value: string) => {
    const newFilters = { ...filters };
    if (!value || value === 'all') delete newFilters[key];
    else newFilters[key] = value;
    onChange(newFilters);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div className="flex items-center">
        <motion.div 
          animate={{ width: isSearchExpanded ? 240 : 40 }}
          className="relative h-10 flex items-center bg-input border border-border-subtle rounded-lg overflow-hidden focus-within:border-brand-violet focus-within:ring-1 focus-within:ring-brand-violet transition-colors"
        >
          <button 
            onClick={() => setIsSearchExpanded(true)}
            className="w-10 h-10 flex items-center justify-center text-txt-muted hover:text-txt transition-colors absolute left-0"
          >
            <Search size={16} />
          </button>
          <input
            type="text"
            placeholder="Search tasks..."
            value={filters.search || ''}
            onChange={(e) => updateFilter('search', e.target.value)}
            onFocus={() => setIsSearchExpanded(true)}
            onBlur={(e) => { if (!e.target.value) setIsSearchExpanded(false); }}
            className={`h-full bg-transparent outline-none text-[13px] pl-10 pr-3 w-full transition-opacity ${isSearchExpanded ? 'opacity-100' : 'opacity-0'}`}
          />
        </motion.div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center bg-bg-card border border-border-subtle rounded-lg p-1">
          {['all', 'active', 'paused', 'failed'].map((status) => {
            const isActive = (filters.status || 'all') === status;
            return (
              <button
                key={status}
                onClick={() => updateFilter('status', status)}
                className={`px-3 py-1.5 text-[12px] font-medium rounded-md capitalize transition-colors ${
                  isActive ? 'bg-brand-violet text-white shadow-[0_0_10px_rgba(124,58,237,0.3)]' : 'text-txt-muted hover:text-txt hover:bg-white/5'
                }`}
              >
                {status}
              </button>
            );
          })}
        </div>

        <select 
          value={filters.platform || 'all'}
          onChange={(e) => updateFilter('platform', e.target.value)}
          className="h-10 bg-bg-card border border-border-subtle rounded-lg px-3 text-[13px] text-txt-secondary outline-none focus:border-brand-violet"
        >
          <option value="all">All Platforms</option>
          <option value="linkedin">LinkedIn</option>
          <option value="twitter">Twitter/X</option>
          <option value="facebook">Facebook</option>
        </select>

        <select 
          value={filters.type || 'all'}
          onChange={(e) => updateFilter('type', e.target.value)}
          className="h-10 bg-bg-card border border-border-subtle rounded-lg px-3 text-[13px] text-txt-secondary outline-none focus:border-brand-violet"
        >
          <option value="all">All Types</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="one-time">One-Time</option>
        </select>

        <AnimatePresence>
          {hasActiveFilters && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={handleClear}
              className="flex items-center gap-1 text-[12px] text-violet hover:text-violet-light font-medium transition-colors ml-2"
            >
              <X size={14} /> Clear filters
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
