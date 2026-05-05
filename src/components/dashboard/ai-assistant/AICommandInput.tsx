'use client';

import React, { useState, useRef, useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Brain, Zap, X } from 'lucide-react';
import { PlatformBadge } from '@/components/dashboard/shared/PlatformBadge';

interface AICommandInputProps {
  onSubmit: (prompt: string) => void;
  isGenerating: boolean;
  selectedPlatform: string;
  setSelectedPlatform: (p: any) => void;
  selectedTone: string;
  setSelectedTone: (t: string) => void;
  useMemory: boolean;
  setUseMemory: (b: boolean) => void;
  dailyRemaining: number;
}

export function AICommandInput({ onSubmit, isGenerating, selectedPlatform, setSelectedPlatform, selectedTone, setSelectedTone, useMemory, setUseMemory, dailyRemaining }: AICommandInputProps) {
  const [prompt, setPrompt] = useState('');
  const [showPlatformSelect, setShowPlatformSelect] = useState(false);
  const [showToneSelect, setShowToneSelect] = useState(false);

  const quickCommands = [
    "📝 Post about my learning",
    "💡 Summarize my week",
    "🚀 Promote my project",
    "🔁 Repurpose last post",
    "📣 Share a tip"
  ];

  const handleSubmit = () => {
    if (prompt.trim() && !isGenerating) {
      onSubmit(prompt.trim());
      setPrompt('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
    if (e.key === 'Escape') setPrompt('');
  };

  return (
    <div className="w-full relative shrink-0 z-10 pt-4">
      {/* Quick Commands */}
      <div className="flex overflow-x-auto custom-scrollbar gap-2 mb-3 pb-1">
        {quickCommands.map((cmd, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setPrompt(cmd.replace(/[📝💡🚀🔁📣]\s/, ''))}
            className="whitespace-nowrap px-3 py-1.5 rounded-full bg-white/5 border border-border-subtle text-[12px] text-txt-secondary hover:text-txt hover:bg-white/10 hover:border-border-soft transition-all"
          >
            {cmd}
          </motion.button>
        ))}
      </div>

      <div className="bg-[rgba(124,58,237,0.06)] border border-[rgba(124,58,237,0.22)] rounded-[var(--r-xl)] shadow-[0_0_40px_rgba(124,58,237,0.10)] overflow-visible relative transition-all focus-within:border-[rgba(124,58,237,0.4)] focus-within:bg-[rgba(124,58,237,0.08)]">
        
        {/* Ready Indicator */}
        <div className="absolute top-4 left-4 flex items-center gap-1.5 z-10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-violet opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-violet"></span>
          </span>
        </div>

        {/* Textarea */}
        <TextareaAutosize
          minRows={2}
          maxRows={8}
          value={prompt}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tell me what you learned today, or describe what you want to post..."
          className="w-full bg-transparent outline-none text-[14px] text-txt placeholder:text-txt-muted px-4 pt-10 pb-4 resize-none leading-relaxed font-sans"
          maxLength={2000}
        />

        {/* Character count */}
        {prompt.length > 0 && (
          <div className="absolute top-4 right-4 text-[10px] font-mono text-txt-muted">
            {prompt.length} / 2000
          </div>
        )}

        {/* Toolbar */}
        <div className="flex items-center justify-between p-3 border-t border-[rgba(124,58,237,0.15)] bg-black/20 rounded-b-[var(--r-xl)]">
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Platform Select */}
            <div className="relative">
              <button 
                onClick={() => setShowPlatformSelect(!showPlatformSelect)}
                className="flex items-center gap-1.5 h-8 px-2.5 rounded-lg bg-white/5 border border-border-subtle hover:bg-white/10 text-[12px] font-medium text-txt transition-colors"
              >
                <PlatformBadge platform={selectedPlatform as any} size="sm" />
                <span className="capitalize">{selectedPlatform}</span>
                <ChevronDown size={14} className="text-txt-muted" />
              </button>
              
              <AnimatePresence>
                {showPlatformSelect && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
                    className="absolute bottom-full left-0 mb-1 w-40 bg-bg-surface border border-border-subtle rounded-lg shadow-card py-1 overflow-hidden z-20"
                  >
                    {['linkedin', 'twitter', 'facebook'].map(p => (
                      <button key={p} onClick={() => { setSelectedPlatform(p); setShowPlatformSelect(false); }} className="w-full text-left px-3 py-2 text-[12px] hover:bg-white/5 flex items-center gap-2 capitalize">
                        <PlatformBadge platform={p as any} size="sm" /> {p}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Tone Select */}
            <div className="relative">
              <button 
                onClick={() => setShowToneSelect(!showToneSelect)}
                className="flex items-center gap-1.5 h-8 px-2.5 rounded-lg bg-white/5 border border-border-subtle hover:bg-white/10 text-[12px] font-medium text-txt transition-colors"
              >
                {selectedTone} <ChevronDown size={14} className="text-txt-muted" />
              </button>
              
              <AnimatePresence>
                {showToneSelect && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
                    className="absolute bottom-full left-0 mb-1 w-36 bg-bg-surface border border-border-subtle rounded-lg shadow-card py-1 z-20"
                  >
                    {['Professional', 'Casual', 'Technical', 'Inspirational', 'Bold'].map(t => (
                      <button key={t} onClick={() => { setSelectedTone(t); setShowToneSelect(false); }} className="w-full text-left px-3 py-2 text-[12px] hover:bg-white/5">
                        {t}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Memory Toggle */}
            <button 
              onClick={() => setUseMemory(!useMemory)}
              className={`flex items-center gap-1.5 h-8 px-3 rounded-full border text-[12px] font-medium transition-all ${
                useMemory 
                  ? 'bg-brand-bg border-brand-border text-brand-violet-light shadow-[0_0_15px_rgba(124,58,237,0.2)]' 
                  : 'bg-white/5 border-border-subtle text-txt-muted hover:text-txt'
              }`}
            >
              <Brain size={14} /> Use Memory
            </button>
            
          </div>

          <div className="flex items-center gap-3">
            <span className={`text-[10px] font-mono uppercase tracking-wider ${dailyRemaining < 10 ? 'text-red' : 'text-txt-muted'}`}>
              {dailyRemaining} / 50 left
            </span>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              disabled={isGenerating || !prompt.trim()}
              className="h-[42px] px-5 rounded-lg bg-[var(--brand-gradient)] text-white text-[13px] font-semibold flex items-center gap-2 shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Zap size={16} fill="currentColor" /> Generate
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
