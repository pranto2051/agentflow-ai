'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

export function ProfileTab({ settings, updateSettings, isSaving }: any) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: 'John Doe',
      email: 'john@example.com',
      company: 'Acme Inc'
    }
  });

  const onSubmit = (data: any) => {
    // Save profile logic
    updateSettings({ profile: data });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl">
      <div className="dash-card p-6">
        <h3 className="font-space text-[16px] font-bold text-txt mb-6 border-b border-border-subtle pb-4">Personal Information</h3>
        
        <div className="flex items-center gap-6 mb-8">
          <div className="w-20 h-20 rounded-full bg-[var(--brand-gradient)] flex items-center justify-center text-2xl font-bold text-white shadow-lg">
            JD
          </div>
          <div>
            <button className="px-4 py-2 rounded-lg border border-border-subtle text-[13px] font-medium text-txt hover:bg-white/5 transition-colors mb-2">
              Upload New Photo
            </button>
            <p className="text-[11px] text-txt-muted">JPG, GIF or PNG. Max size 2MB.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-[13px] font-medium text-txt-secondary mb-1.5">Full Name</label>
              <input {...register('name')} className="w-full bg-input border border-border-subtle rounded-lg px-3 py-2 text-[14px] text-txt focus:border-brand-violet outline-none" />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-txt-secondary mb-1.5">Email Address</label>
              <input {...register('email')} type="email" disabled className="w-full bg-input/50 border border-border-subtle rounded-lg px-3 py-2 text-[14px] text-txt-muted cursor-not-allowed outline-none" />
            </div>
          </div>
          
          <div>
            <label className="block text-[13px] font-medium text-txt-secondary mb-1.5">Company</label>
            <input {...register('company')} className="w-full bg-input border border-border-subtle rounded-lg px-3 py-2 text-[14px] text-txt focus:border-brand-violet outline-none" />
          </div>

          <div className="pt-4 border-t border-border-subtle flex justify-end">
            <button type="submit" disabled={isSaving} className="px-6 py-2 rounded-lg bg-[var(--brand-gradient)] text-white text-[13px] font-medium shadow-[0_0_15px_rgba(124,58,237,0.3)] disabled:opacity-50">
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
