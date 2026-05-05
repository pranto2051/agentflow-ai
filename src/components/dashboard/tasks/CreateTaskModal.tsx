'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Globe, Zap, ArrowRight, ArrowLeft } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { scaleIn, fadeIn } from '@/lib/animations/dashboard';

const taskSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100),
  description: z.string().min(10, "Description must be at least 10 characters").max(2000),
  tone: z.string().min(1),
  task_type: z.enum(['daily', 'weekly', 'monthly', 'one-time']),
  schedule_time: z.string(),
  schedule_day: z.number().optional(),
  timezone: z.string(),
  platform: z.enum(['linkedin', 'twitter', 'facebook', 'all']),
});

type TaskFormData = z.infer<typeof taskSchema>;

interface CreateTaskModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateTaskModal({ open, onClose, onSuccess }: CreateTaskModalProps) {
  const [step, setStep] = useState(1);
  const [isGeneratingSample, setIsGeneratingSample] = useState(false);
  const [sampleContent, setSampleContent] = useState('');

  const { register, handleSubmit, control, formState: { errors, isValid }, watch, trigger } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    mode: 'onChange',
    defaultValues: {
      tone: 'Professional',
      task_type: 'daily',
      schedule_time: '09:00',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      platform: 'linkedin'
    }
  });

  const generateSample = async () => {
    setIsGeneratingSample(true);
    // Mock API call
    setTimeout(() => {
      setSampleContent("🚀 Exciting news! Today I learned about how to optimize React applications. #ReactJS #WebDevelopment #AgentFlow");
      setIsGeneratingSample(false);
    }, 1500);
  };

  const onSubmit = async (data: TaskFormData) => {
    // API call mock handled via onSuccess
    onSuccess();
    onClose();
  };

  const nextStep = async () => {
    let fieldsToValidate: any[] = [];
    if (step === 1) fieldsToValidate = ['title', 'description', 'tone'];
    if (step === 2) fieldsToValidate = ['task_type', 'schedule_time', 'timezone'];
    if (step === 3) fieldsToValidate = ['platform'];

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) setStep(step + 1);
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
          onClick={onClose} 
        />
        
        <motion.div 
          variants={scaleIn} initial="initial" animate="animate" exit="initial"
          className="relative w-full max-w-[560px] bg-bg-surface border border-border-subtle rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-border-subtle bg-bg-surface z-10">
            <h2 className="font-space text-lg font-semibold text-txt">Create New Task</h2>
            <button onClick={onClose} className="p-1.5 rounded-md text-txt-muted hover:text-txt hover:bg-white/5 transition-colors">
              <X size={18} />
            </button>
          </div>

          {/* Step Indicator */}
          <div className="px-6 pt-6 pb-2">
            <div className="flex items-center justify-between relative">
              <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-border-subtle -z-10 transform -translate-y-1/2"></div>
              {[1, 2, 3, 4].map(num => (
                <div key={num} className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold border-2 transition-colors ${
                  step === num ? 'bg-[var(--brand-gradient)] border-transparent text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]' :
                  step > num ? 'bg-green border-green text-white' :
                  'bg-bg-surface border-border-subtle text-txt-muted'
                }`}>
                  {step > num ? <CheckCircle2 size={16} /> : num}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-[11px] text-txt-muted mt-2 px-1">
              <span>Content</span>
              <span>Schedule</span>
              <span>Platform</span>
              <span>Preview</span>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
            {step === 1 && (
              <motion.div variants={fadeIn} initial="initial" animate="animate" className="space-y-5">
                <div>
                  <label className="block text-[13px] font-medium text-txt-secondary mb-1.5">Task Name</label>
                  <input {...register('title')} placeholder="e.g. Daily LinkedIn Learning Post" className="w-full bg-input border border-border-subtle rounded-lg px-3 py-2.5 text-[14px] text-txt placeholder:text-txt-muted focus:border-brand-violet outline-none transition-colors" />
                  {errors.title && <p className="text-red text-[11px] mt-1">{errors.title.message}</p>}
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-txt-secondary mb-1.5">Description / Prompt</label>
                  <textarea {...register('description')} placeholder="Every morning, I learn something new. Post about my daily learning..." rows={4} className="w-full bg-input border border-border-subtle rounded-lg px-3 py-2.5 text-[14px] text-txt placeholder:text-txt-muted focus:border-brand-violet outline-none transition-colors resize-none" />
                  <div className="text-right text-[11px] text-txt-muted mt-1">{watch('description')?.length || 0} / 2000</div>
                  {errors.description && <p className="text-red text-[11px] mt-1">{errors.description.message}</p>}
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-txt-secondary mb-1.5">AI Tone</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Professional', 'Casual', 'Technical', 'Inspirational'].map(tone => (
                      <label key={tone} className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-colors ${watch('tone') === tone ? 'bg-brand-bg border-brand-violet' : 'bg-input border-border-subtle hover:border-border-soft'}`}>
                        <input type="radio" value={tone} {...register('tone')} className="hidden" />
                        <span className={`text-[13px] font-medium ${watch('tone') === tone ? 'text-txt' : 'text-txt-secondary'}`}>{tone}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div variants={fadeIn} initial="initial" animate="animate" className="space-y-6">
                <div>
                  <label className="block text-[13px] font-medium text-txt-secondary mb-3">How often should it run?</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'daily', label: 'Daily', icon: Calendar },
                      { id: 'weekly', label: 'Weekly', icon: Calendar },
                      { id: 'monthly', label: 'Monthly', icon: Calendar },
                      { id: 'one-time', label: 'One-Time', icon: Zap }
                    ].map(type => (
                      <label key={type.id} className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border cursor-pointer transition-all ${watch('task_type') === type.id ? 'bg-brand-bg border-brand-violet shadow-[0_0_15px_rgba(124,58,237,0.15)]' : 'bg-input border-border-subtle hover:border-border-soft hover:bg-white/5'}`}>
                        <input type="radio" value={type.id} {...register('task_type')} className="hidden" />
                        <type.icon size={20} className={watch('task_type') === type.id ? 'text-brand-violet' : 'text-txt-muted'} />
                        <span className={`text-[13px] font-medium ${watch('task_type') === type.id ? 'text-txt' : 'text-txt-secondary'}`}>{type.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-medium text-txt-secondary mb-1.5">Time</label>
                    <div className="relative">
                      <Clock size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-txt-muted" />
                      <input type="time" {...register('schedule_time')} className="w-full bg-input border border-border-subtle rounded-lg pl-9 pr-3 py-2.5 text-[14px] text-txt focus:border-brand-violet outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-txt-secondary mb-1.5">Timezone</label>
                    <select {...register('timezone')} className="w-full bg-input border border-border-subtle rounded-lg px-3 py-2.5 text-[14px] text-txt focus:border-brand-violet outline-none appearance-none">
                      <option value="UTC">UTC</option>
                      <option value="Asia/Dhaka">Asia/Dhaka</option>
                      <option value="America/New_York">America/New_York</option>
                      <option value="Europe/London">Europe/London</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div variants={fadeIn} initial="initial" animate="animate" className="space-y-4">
                <label className="block text-[13px] font-medium text-txt-secondary mb-2">Where should it post?</label>
                {[
                  { id: 'linkedin', label: 'LinkedIn', connected: true },
                  { id: 'twitter', label: 'Twitter/X', connected: true },
                  { id: 'facebook', label: 'Facebook', connected: false },
                  { id: 'all', label: 'All Connected Platforms', connected: true }
                ].map(plat => (
                  <label key={plat.id} className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${!plat.connected ? 'opacity-50' : watch('platform') === plat.id ? 'bg-brand-bg border-brand-violet shadow-[0_0_15px_rgba(124,58,237,0.15)]' : 'bg-input border-border-subtle hover:bg-white/5'}`}>
                    <div className="flex items-center gap-3">
                      <input type="radio" value={plat.id} {...register('platform')} disabled={!plat.connected} className="hidden" />
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${watch('platform') === plat.id ? 'border-brand-violet bg-brand-violet' : 'border-border-medium'}`}>
                        {watch('platform') === plat.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <span className="text-[14px] font-medium text-txt">{plat.label}</span>
                    </div>
                    {!plat.connected && <span className="text-[11px] text-brand-violet hover:underline">Connect first &rarr;</span>}
                  </label>
                ))}
              </motion.div>
            )}

            {step === 4 && (
              <motion.div variants={fadeIn} initial="initial" animate="animate" className="space-y-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-[14px] font-medium text-txt">AI Generation Preview</h3>
                  <button onClick={generateSample} className="text-[12px] text-brand-violet hover:text-brand-violet-light flex items-center gap-1">
                    <Sparkles size={14} /> Generate Sample
                  </button>
                </div>
                
                <div className="min-h-[160px] bg-[#09090f] border border-border-subtle rounded-xl p-4 font-mono text-[13px] text-txt-secondary leading-relaxed">
                  {isGeneratingSample ? (
                    <div className="flex items-center gap-2 text-brand-violet">
                      <div className="animate-pulse">AI is generating your post...</div>
                    </div>
                  ) : sampleContent ? (
                    <div>{sampleContent}</div>
                  ) : (
                    <div className="text-txt-muted text-center mt-10">Click "Generate Sample" to see how your task will perform.</div>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-5 border-t border-border-subtle bg-bg-surface flex justify-between items-center z-10">
            {step > 1 ? (
              <button onClick={() => setStep(step - 1)} className="px-4 py-2 text-[13px] font-medium text-txt-secondary hover:text-txt flex items-center gap-2">
                <ArrowLeft size={14} /> Back
              </button>
            ) : <div />}
            
            {step < 4 ? (
              <button onClick={nextStep} className="px-6 py-2 rounded-lg bg-[var(--brand-gradient)] text-white text-[13px] font-medium shadow-[0_0_15px_rgba(124,58,237,0.3)] flex items-center gap-2">
                Next <ArrowRight size={14} />
              </button>
            ) : (
              <button onClick={handleSubmit(onSubmit)} className="px-6 py-2 rounded-lg bg-[var(--brand-gradient)] text-white text-[13px] font-medium shadow-[0_0_15px_rgba(124,58,237,0.3)]">
                Create Task
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
