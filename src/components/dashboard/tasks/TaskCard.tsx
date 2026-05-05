'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MoreHorizontal, Play, Pause, FileText, Trash2, Edit2, CheckCircle2, Clock, CalendarDays } from 'lucide-react';
import { Task } from '@/types/dashboard';
import { PlatformBadge } from '@/components/dashboard/shared/PlatformBadge';
import { StatusBadge } from '@/components/dashboard/shared/StatusBadge';

interface TaskCardProps {
  task: Task;
  onRun: (id: string) => void;
  onToggle: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onViewLogs: (id: string) => void;
}

export function TaskCard({ task, onRun, onToggle, onEdit, onDelete, onViewLogs }: TaskCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const isPaused = task.status === 'paused';
  const isFailed = task.status === 'failed';
  const isRunning = task.status === 'running';

  return (
    <div className={`dash-card p-[18px] w-full flex flex-col gap-4 transition-all duration-300
      ${isPaused ? 'opacity-60 grayscale-[0.2]' : ''}
      ${isFailed ? 'border-l-[3px] border-l-red bg-red/5' : ''}
      ${isRunning ? 'border-brand-cyan shadow-[0_0_15px_rgba(6,182,212,0.2)] animate-pulse' : ''}
    `}>
      {isPaused && (
        <div className="absolute top-2 right-2 text-[10px] font-bold tracking-widest text-txt-muted opacity-30 select-none">
          PAUSED
        </div>
      )}

      {/* Row 1: Header */}
      <div className="flex items-start justify-between relative">
        <div className="flex items-center gap-3">
          <PlatformBadge platform={task.platform} size="sm" />
          <h3 className="font-space text-[15px] font-semibold text-txt">{task.title}</h3>
        </div>
        
        <div className="flex items-center gap-2">
          <StatusBadge status={task.status} />
          <div className="relative">
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 rounded text-txt-muted hover:text-txt hover:bg-white/10 transition-colors"
            >
              <MoreHorizontal size={16} />
            </button>
            
            {showMenu && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
                <div className="absolute right-0 mt-1 w-40 bg-bg-surface border border-border-subtle rounded-lg shadow-card z-20 py-1 overflow-hidden">
                  <button onClick={() => { onEdit(task.id); setShowMenu(false); }} className="w-full text-left px-3 py-2 text-[12px] text-txt-secondary hover:bg-white/5 hover:text-txt flex items-center gap-2"><Edit2 size={12}/> Edit</button>
                  <button onClick={() => { onRun(task.id); setShowMenu(false); }} className="w-full text-left px-3 py-2 text-[12px] text-txt-secondary hover:bg-white/5 hover:text-txt flex items-center gap-2"><Play size={12}/> Run Now</button>
                  <button onClick={() => { onToggle(task.id); setShowMenu(false); }} className="w-full text-left px-3 py-2 text-[12px] text-txt-secondary hover:bg-white/5 hover:text-txt flex items-center gap-2">{isPaused ? <Play size={12}/> : <Pause size={12}/>} {isPaused ? 'Resume' : 'Pause'}</button>
                  <button onClick={() => { onViewLogs(task.id); setShowMenu(false); }} className="w-full text-left px-3 py-2 text-[12px] text-txt-secondary hover:bg-white/5 hover:text-txt flex items-center gap-2"><FileText size={12}/> View Logs</button>
                  <div className="h-[1px] bg-border-subtle my-1" />
                  <button onClick={() => { onDelete(task.id); setShowMenu(false); }} className="w-full text-left px-3 py-2 text-[12px] text-red hover:bg-red/10 flex items-center gap-2"><Trash2 size={12}/> Delete</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Row 2: Metadata */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-[11px] text-txt-muted font-medium bg-white/5 px-2 py-1 rounded">
          <Clock size={12} />
          <span className="capitalize">{task.task_type} &middot; {task.schedule_time}</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-txt-muted font-medium bg-white/5 px-2 py-1 rounded">
          <CalendarDays size={12} />
          <span>{task.next_run || 'Not scheduled'}</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-txt-muted font-medium bg-white/5 px-2 py-1 rounded">
          <CheckCircle2 size={12} className="text-green" />
          <span>95.7% success</span>
        </div>
      </div>

      {/* Row 3: AI Preview + Actions */}
      <div className="flex items-center justify-between mt-2 pt-4 border-t border-border-subtle">
        <div className="flex-1 mr-4">
          <div className="font-mono text-[11px] italic text-txt-muted line-clamp-1">
            "Here's what I learned about Next.js server actions today..."
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onToggle(task.id)}
            className="h-8 px-3 rounded-md border border-border-subtle text-[12px] font-medium text-txt-secondary hover:bg-white/5 hover:text-txt transition-colors"
          >
            {isPaused ? 'Resume' : 'Pause'}
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onRun(task.id)}
            disabled={isRunning}
            className="h-8 px-3 rounded-md bg-[var(--brand-gradient)] text-white text-[12px] font-medium flex items-center gap-1.5 shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] transition-shadow disabled:opacity-50"
          >
            <Play size={12} fill="currentColor" /> Run
          </motion.button>
        </div>
      </div>

      {isRunning && (
        <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden">
          <div className="h-full w-full bg-[var(--brand-gradient)] animate-shimmer" style={{ backgroundSize: '200% 100%' }}></div>
        </div>
      )}
    </div>
  );
}
