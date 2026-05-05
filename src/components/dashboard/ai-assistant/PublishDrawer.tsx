'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CalendarDays } from 'lucide-react';
import { GeneratedPost } from '@/types/dashboard';

interface PublishDrawerProps {
  open: boolean;
  onClose: () => void;
  post: GeneratedPost | null;
}

export function PublishDrawer({ open, onClose, post }: PublishDrawerProps) {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['linkedin']);
  const [scheduleMode, setScheduleMode] = useState<'now' | 'schedule'>('now');
  const [isPublishing, setIsPublishing] = useState(false);

  const togglePlatform = (p: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]
    );
  };

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      onClose();
    }, 1500);
  };

  if (!open || !post) return null;

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={onClose} />
      <motion.div
        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed top-0 right-0 bottom-0 w-[400px] bg-bg-surface border-l border-border-subtle z-50 flex flex-col shadow-[-10px_0_40px_rgba(0,0,0,0.5)]"
      >
        <div className="flex items-center justify-between p-5 border-b border-border-subtle">
          <h2 className="font-space text-[16px] font-semibold text-txt">Publish Post</h2>
          <button onClick={onClose} className="p-1.5 rounded-md text-txt-muted hover:text-txt hover:bg-white/5 transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          <div>
            <label className="block text-[13px] font-medium text-txt-secondary mb-3">Select Platforms</label>
            <div className="space-y-2">
              {[
                { id: 'linkedin', name: 'LinkedIn', detail: 'John Doe · 1,240 followers' },
                { id: 'twitter', name: 'Twitter', detail: '@johndoe' },
              ].map(p => (
                <label key={p.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${selectedPlatforms.includes(p.id) ? 'border-brand-violet bg-brand-bg' : 'border-border-subtle hover:bg-white/5'}`}>
                  <input type="checkbox" className="hidden" checked={selectedPlatforms.includes(p.id)} onChange={() => togglePlatform(p.id)} />
                  <div className={`w-4 h-4 rounded flex items-center justify-center border ${selectedPlatforms.includes(p.id) ? 'bg-brand-violet border-brand-violet text-white' : 'border-border-medium'}`}>
                    {selectedPlatforms.includes(p.id) && <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.33333 2.5L3.75 7.08333L1.66667 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>
                  <div>
                    <div className="text-[13px] font-medium text-txt">{p.name}</div>
                    <div className="text-[11px] text-txt-muted">{p.detail}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-medium text-txt-secondary mb-3">When to publish?</label>
            <div className="flex gap-2 p-1 bg-input border border-border-subtle rounded-lg mb-4">
              <button onClick={() => setScheduleMode('now')} className={`flex-1 py-1.5 rounded text-[12px] font-medium transition-all ${scheduleMode === 'now' ? 'bg-white/10 text-txt shadow-sm' : 'text-txt-muted hover:text-txt'}`}>Publish Now</button>
              <button onClick={() => setScheduleMode('schedule')} className={`flex-1 py-1.5 rounded text-[12px] font-medium transition-all ${scheduleMode === 'schedule' ? 'bg-white/10 text-txt shadow-sm' : 'text-txt-muted hover:text-txt'}`}>Schedule</button>
            </div>

            {scheduleMode === 'schedule' && (
              <div className="p-3 bg-bg-card border border-border-subtle rounded-lg space-y-3">
                <input type="date" className="w-full bg-input border border-border-subtle rounded px-3 py-2 text-[13px] text-txt outline-none focus:border-brand-violet" />
                <input type="time" className="w-full bg-input border border-border-subtle rounded px-3 py-2 text-[13px] text-txt outline-none focus:border-brand-violet" />
              </div>
            )}
          </div>

          <div>
            <label className="block text-[13px] font-medium text-txt-secondary mb-3">Preview</label>
            <div className="bg-white rounded-xl p-4 shadow-sm text-black">
              <div className="flex gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gray-200" />
                <div>
                  <div className="text-[14px] font-bold">John Doe</div>
                  <div className="text-[11px] text-gray-500">Software Engineer</div>
                  <div className="text-[10px] text-gray-400">Just now • 🌍</div>
                </div>
              </div>
              <p className="text-[13px] whitespace-pre-wrap leading-relaxed">
                {post.content}
              </p>
              {post.hashtags && (
                <p className="text-[13px] text-brand-violet mt-2">
                  {post.hashtags.join(' ')}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="p-5 border-t border-border-subtle bg-bg-surface">
          <button 
            onClick={handlePublish}
            disabled={selectedPlatforms.length === 0 || isPublishing}
            className="w-full py-2.5 rounded-lg bg-[var(--brand-gradient)] text-white text-[13px] font-medium shadow-[0_0_15px_rgba(124,58,237,0.3)] flex justify-center items-center gap-2 disabled:opacity-50"
          >
            {isPublishing ? (
              <><span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> Publishing...</>
            ) : scheduleMode === 'now' ? (
              <><Send size={16} /> Publish to {selectedPlatforms.length} platforms</>
            ) : (
              <><CalendarDays size={16} /> Schedule Post</>
            )}
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
