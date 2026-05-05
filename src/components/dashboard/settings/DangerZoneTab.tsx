'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

export function DangerZoneTab() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl">
      <div className="dash-card border-red/30 bg-red/5 p-6">
        <div className="flex items-center gap-3 mb-4 text-red">
          <AlertTriangle size={20} />
          <h3 className="font-space text-[16px] font-bold">Danger Zone</h3>
        </div>
        
        <p className="text-[13px] text-txt-secondary mb-6">
          Irreversible actions related to your account. Please proceed with caution.
        </p>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-red/20 rounded-lg bg-black/20">
            <div>
              <div className="text-[13px] font-medium text-txt">Delete all scheduled tasks</div>
              <div className="text-[11px] text-txt-muted mt-1">Remove all pending automation tasks immediately.</div>
            </div>
            <button className="shrink-0 px-4 py-2 rounded-lg border border-red/30 text-red text-[12px] font-medium hover:bg-red/10 transition-colors">
              Delete Tasks
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-red/20 rounded-lg bg-black/20">
            <div>
              <div className="text-[13px] font-medium text-txt">Delete Account</div>
              <div className="text-[11px] text-txt-muted mt-1">Permanently delete your account, generated posts, and disconnect all social profiles.</div>
            </div>
            <button className="shrink-0 px-4 py-2 rounded-lg bg-red text-white text-[12px] font-medium hover:bg-red/90 shadow-[0_0_15px_rgba(239,68,68,0.3)] transition-colors">
              Delete Account
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
