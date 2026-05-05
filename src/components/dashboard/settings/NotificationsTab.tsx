'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function NotificationsTab({ settings, updateSettings, isSaving }: any) {
  
  const toggleNotification = (key: string) => {
    // update logic
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl">
      <div className="dash-card p-6">
        <h3 className="font-space text-[16px] font-bold text-txt mb-2">Notification Preferences</h3>
        <p className="text-[12px] text-txt-muted border-b border-border-subtle pb-6 mb-6">Choose what events you want to be notified about.</p>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[13px] font-medium text-txt">Task Execution Failed</div>
              <div className="text-[11px] text-txt-muted mt-0.5">Receive an email when a scheduled post fails to publish.</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-9 h-5 bg-bg-surface border border-border-subtle peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-txt-muted peer-checked:after:bg-white after:border-border-subtle after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-violet peer-checked:border-brand-violet"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-[13px] font-medium text-txt">Weekly Digest</div>
              <div className="text-[11px] text-txt-muted mt-0.5">A summary of your AI's performance and engagement.</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-9 h-5 bg-bg-surface border border-border-subtle peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-txt-muted peer-checked:after:bg-white after:border-border-subtle after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-violet peer-checked:border-brand-violet"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-[13px] font-medium text-txt">Token Expiration Warnings</div>
              <div className="text-[11px] text-txt-muted mt-0.5">Get notified 7 days before a social account token expires.</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-9 h-5 bg-bg-surface border border-border-subtle peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-txt-muted peer-checked:after:bg-white after:border-border-subtle after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-violet peer-checked:border-brand-violet"></div>
            </label>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
