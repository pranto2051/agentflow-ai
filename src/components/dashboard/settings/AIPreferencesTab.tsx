'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Brain } from 'lucide-react';

export function AIPreferencesTab({ settings, updateSettings, isSaving }: any) {
  const defaultMemory = settings?.memory || {
    tone: 'Professional',
    industry: 'Technology',
    topics: ['AI', 'React', 'Startups']
  };

  const { register, handleSubmit } = useForm({ defaultValues: defaultMemory });

  const onSubmit = (data: any) => {
    updateSettings({ memory: { ...defaultMemory, ...data } });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl">
      <div className="dash-card p-6">
        <div className="flex items-center gap-3 mb-6 border-b border-border-subtle pb-4">
          <div className="w-10 h-10 rounded-lg bg-brand-bg flex items-center justify-center text-brand-violet">
            <Brain size={20} />
          </div>
          <div>
            <h3 className="font-space text-[16px] font-bold text-txt">AI Memory & Preferences</h3>
            <p className="text-[12px] text-txt-muted">Configure how the AI agent writes for you.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-[13px] font-medium text-txt-secondary mb-1.5">Default Writing Tone</label>
            <select {...register('tone')} className="w-full bg-input border border-border-subtle rounded-lg px-3 py-2 text-[14px] text-txt focus:border-brand-violet outline-none appearance-none">
              <option value="Professional">Professional & Authoritative</option>
              <option value="Casual">Casual & Conversational</option>
              <option value="Technical">Technical & Detailed</option>
              <option value="Bold">Bold & Direct</option>
            </select>
          </div>

          <div>
            <label className="block text-[13px] font-medium text-txt-secondary mb-1.5">Industry Context</label>
            <input {...register('industry')} className="w-full bg-input border border-border-subtle rounded-lg px-3 py-2 text-[14px] text-txt focus:border-brand-violet outline-none" placeholder="e.g. Software Development, Marketing..." />
            <p className="text-[11px] text-txt-muted mt-1.5">Helps the AI use appropriate terminology and examples.</p>
          </div>

          <div>
            <label className="block text-[13px] font-medium text-txt-secondary mb-3">Writing Style Instructions (System Prompt)</label>
            <textarea 
              {...register('writing_style')} 
              rows={4}
              placeholder="E.g. Always use short paragraphs. Never use emojis. End posts with a question."
              className="w-full bg-input border border-border-subtle rounded-lg px-3 py-2 text-[14px] text-txt focus:border-brand-violet outline-none resize-none font-mono" 
            />
          </div>

          <div className="pt-4 border-t border-border-subtle flex justify-end">
            <button type="submit" disabled={isSaving} className="px-6 py-2 rounded-lg bg-[var(--brand-gradient)] text-white text-[13px] font-medium shadow-[0_0_15px_rgba(124,58,237,0.3)] disabled:opacity-50">
              {isSaving ? 'Updating Memory...' : 'Update AI Memory'}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
