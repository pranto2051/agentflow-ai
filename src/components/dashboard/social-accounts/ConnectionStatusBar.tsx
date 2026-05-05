'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ConnectionStatusBarProps {
  totalConnected: number;
  platforms: {
    linkedin: { connected: boolean; status?: string; expiring?: boolean };
    twitter: { connected: boolean; status?: string; expiring?: boolean };
    facebook: { connected: boolean; status?: string; expiring?: boolean };
  }
}

export function ConnectionStatusBar({ totalConnected, platforms }: ConnectionStatusBarProps) {
  const hasExpired = Object.values(platforms).some(p => p.status === 'expired');

  return (
    <div className="mb-6 space-y-4">
      {hasExpired && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-lg bg-amber/10 border border-amber/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber/20 flex items-center justify-center text-amber text-lg">⚠️</div>
            <div>
              <h4 className="text-[14px] font-semibold text-amber">Connection Error</h4>
              <p className="text-[12px] text-amber/80 mt-0.5">One or more of your social accounts has expired tokens.</p>
            </div>
          </div>
          <button className="px-4 py-1.5 rounded-md bg-amber text-black text-[12px] font-medium shadow-sm hover:bg-amber/90 transition-colors">
            Reconnect Now
          </button>
        </motion.div>
      )}

      <div className="dash-card p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-[13px] font-medium text-txt">
          <span className="text-brand-violet">{totalConnected} of 3</span> accounts connected
        </div>

        <div className="flex items-center gap-3">
          {Object.entries(platforms).map(([key, data]) => {
            let dotClass = 'bg-white/20';
            let label = 'Not connected';
            if (data.connected) {
              dotClass = data.expiring ? 'bg-amber' : data.status === 'expired' ? 'bg-red' : 'bg-green';
              label = data.status === 'expired' ? 'Reconnect required' : data.expiring ? 'Expires soon' : `Connected`;
            }

            return (
              <div key={key} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-border-subtle">
                <div className={`w-2 h-2 rounded-full ${dotClass}`} />
                <span className="text-[11px] font-medium text-txt-secondary capitalize">{key}</span>
                {data.connected && <span className="text-[10px] text-txt-muted ml-1">&middot; {label}</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
