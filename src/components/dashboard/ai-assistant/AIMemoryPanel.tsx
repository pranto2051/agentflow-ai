'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, X, ChevronDown, CheckCircle2 } from 'lucide-react';
import { PlatformBadge } from '@/components/dashboard/shared/PlatformBadge';
import { AIMemory } from '@/types/dashboard';

interface AIMemoryPanelProps {
  open: boolean;
  onClose: () => void;
  memory: AIMemory;
  history: any[];
}

export function AIMemoryPanel({ open, onClose, memory, history }: AIMemoryPanelProps) {
  const [expanded, setExpanded] = useState<string | null>('tone');

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: 280, opacity: 1 }}
        exit={{ width: 0, opacity: 0 }}
        className="h-full border-l border-border-subtle bg-[rgba(255,255,255,0.018)] flex flex-col shrink-0 absolute md:relative right-0 z-40"
      >
        <div className="p-4 border-b border-border-subtle flex items-center justify-between bg-bg-surface">
          <div className="flex items-center gap-2 text-txt font-semibold text-[14px]">
            <Brain size={16} className="text-brand-violet" />
            AI Memory
          </div>
          <div className="flex items-center gap-2">
            <button className="text-[11px] text-txt-muted hover:text-txt uppercase tracking-wider font-medium">Edit</button>
            <button onClick={onClose} className="md:hidden text-txt-muted"><X size={16}/></button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
          
          <div className="border border-border-subtle rounded-lg bg-bg-card overflow-hidden">
            <button onClick={() => setExpanded(expanded === 'tone' ? null : 'tone')} className="w-full p-3 flex justify-between items-center text-[12px] font-medium text-txt hover:bg-white/5">
              Writing Tone <ChevronDown size={14} className={`transition-transform ${expanded==='tone' ? 'rotate-180' : ''}`} />
            </button>
            {expanded === 'tone' && (
              <div className="p-3 pt-0 grid grid-cols-2 gap-2">
                {['Professional', 'Casual', 'Technical', 'Bold'].map(t => (
                  <div key={t} className={`p-2 rounded text-[11px] border text-center cursor-pointer transition-colors ${memory.tone === t ? 'border-brand-violet bg-brand-bg text-txt' : 'border-border-subtle text-txt-muted hover:bg-white/5'}`}>
                    {t}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border border-border-subtle rounded-lg bg-bg-card overflow-hidden">
            <button onClick={() => setExpanded(expanded === 'about' ? null : 'about')} className="w-full p-3 flex justify-between items-center text-[12px] font-medium text-txt hover:bg-white/5">
              About Me <ChevronDown size={14} className={`transition-transform ${expanded==='about' ? 'rotate-180' : ''}`} />
            </button>
            {expanded === 'about' && (
              <div className="p-3 pt-0 space-y-3">
                <input type="text" defaultValue={memory.about_me} className="w-full bg-input border border-border-subtle rounded p-2 text-[12px] text-txt outline-none focus:border-brand-violet" />
                <select className="w-full bg-input border border-border-subtle rounded p-2 text-[12px] text-txt outline-none focus:border-brand-violet">
                  <option value={memory.industry}>{memory.industry}</option>
                </select>
              </div>
            )}
          </div>

          <div className="border border-border-subtle rounded-lg bg-bg-card overflow-hidden">
            <button onClick={() => setExpanded(expanded === 'topics' ? null : 'topics')} className="w-full p-3 flex justify-between items-center text-[12px] font-medium text-txt hover:bg-white/5">
              Topics <ChevronDown size={14} className={`transition-transform ${expanded==='topics' ? 'rotate-180' : ''}`} />
            </button>
            {expanded === 'topics' && (
              <div className="p-3 pt-0 flex flex-wrap gap-2">
                {(memory.topics || []).map((topic: string) => (
                  <span key={topic} className="px-2 py-1 bg-white/10 rounded text-[11px] text-txt-secondary">{topic}</span>
                ))}
                <span className="px-2 py-1 border border-dashed border-border-medium rounded text-[11px] text-txt-muted cursor-pointer hover:bg-white/5">+ Add</span>
              </div>
            )}
          </div>

          <button className="w-full py-2 rounded bg-white/5 hover:bg-white/10 text-txt-secondary text-[12px] font-medium transition-colors">
            Update Memory
          </button>

          <div className="pt-6 mt-6 border-t border-border-subtle">
            <h4 className="text-[11px] uppercase tracking-wider text-txt-muted font-bold mb-3">Recent Generations</h4>
            <div className="space-y-3">
              {history.slice(0, 5).map(h => (
                <div key={h.id} className="p-3 rounded-lg border border-border-subtle bg-bg-card hover:border-border-soft cursor-pointer transition-colors">
                  <div className="flex justify-between items-center mb-1.5">
                    <PlatformBadge platform={h.platform} size="sm" />
                    <span className="text-[10px] text-txt-muted">{new Date(h.generated_at).toLocaleDateString()}</span>
                  </div>
                  <p className="text-[11px] text-txt-secondary line-clamp-2 font-mono">
                    {h.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
