'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, RefreshCw, CalendarDays, Send } from 'lucide-react';
import { GeneratedPost, Task } from '@/types/dashboard';
import { scaleIn } from '@/lib/animations/dashboard';
import { PlatformBadge } from '@/components/dashboard/shared/PlatformBadge';

interface RunTaskModalProps {
  open: boolean;
  onClose: () => void;
  task: Task | null;
  result: GeneratedPost | null;
}

export function RunTaskModal({ open, onClose, task, result }: RunTaskModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (result?.content) {
      navigator.clipboard.writeText(result.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!open || !task || !result) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
        
        <motion.div variants={scaleIn} initial="initial" animate="animate" exit="initial" className="relative w-full max-w-[600px] bg-bg-surface border border-border-subtle rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden">
          
          <div className="flex items-center justify-between p-5 border-b border-border-subtle">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-bg border border-brand-border flex items-center justify-center text-txt-brand">
                <Sparkles size={16} />
              </div>
              <div>
                <h2 className="font-space text-[16px] font-semibold text-txt flex items-center gap-2">
                  ✨ Post Generated <PlatformBadge platform={result.platform} size="sm" />
                </h2>
                <p className="text-[11px] text-txt-muted">{task.title}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-md text-txt-muted hover:text-txt hover:bg-white/5 transition-colors">
              <X size={18} />
            </button>
          </div>

          <div className="p-6">
            <div className="bg-[#09090f] border border-border-subtle rounded-lg p-5 mb-4">
              <div className="font-mono text-[13px] text-txt leading-relaxed whitespace-pre-wrap">
                {result.content}
              </div>
              {result.hashtags && result.hashtags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {result.hashtags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded border border-brand-border bg-brand-bg text-txt-brand text-[11px] font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between text-[10px] text-txt-muted font-mono uppercase tracking-wider mb-6 px-1">
              <span>874 tokens &middot; 1.2s &middot; Gemini 1.5 Flash</span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="flex gap-2">
                <button onClick={handleCopy} className="h-9 px-3 rounded-lg border border-border-subtle text-[12px] font-medium text-txt-secondary hover:bg-white/5 flex items-center gap-1.5 transition-colors">
                  <Copy size={14} /> {copied ? 'Copied!' : 'Copy'}
                </button>
                <button className="h-9 px-3 rounded-lg border border-border-subtle text-[12px] font-medium text-txt-secondary hover:bg-white/5 flex items-center gap-1.5 transition-colors">
                  <RefreshCw size={14} /> Regenerate
                </button>
              </div>
              <div className="flex gap-2">
                <button className="h-9 px-3 rounded-lg border border-border-subtle text-[12px] font-medium text-txt-secondary hover:bg-white/5 flex items-center gap-1.5 transition-colors">
                  <CalendarDays size={14} /> Schedule
                </button>
                <button className="h-9 px-4 rounded-lg bg-[var(--brand-gradient)] text-white text-[12px] font-medium shadow-[0_0_15px_rgba(124,58,237,0.3)] flex items-center gap-1.5 transition-colors hover:shadow-[0_0_25px_rgba(124,58,237,0.5)]">
                  <Send size={14} /> Publish Now
                </button>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}

import { Sparkles } from 'lucide-react';
