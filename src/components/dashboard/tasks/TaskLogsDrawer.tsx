'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { StatusBadge } from '@/components/dashboard/shared/StatusBadge';

interface TaskLogsDrawerProps {
  open: boolean;
  onClose: () => void;
  taskId: string;
}

export function TaskLogsDrawer({ open, onClose, taskId }: TaskLogsDrawerProps) {
  // Mock logs
  const logs = [
    { id: '1', status: 'success', time: 'May 5 at 9:02 AM', duration: '1.2s', preview: 'Exciting news! Today I learned about React Server...' },
    { id: '2', status: 'failed', time: 'May 4 at 9:00 AM', error: 'Error: OAuth token expired' },
    { id: '3', status: 'success', time: 'May 3 at 9:01 AM', duration: '1.4s', preview: 'Building an AI SaaS with Next.js is challenging but...' },
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={onClose} />
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-[440px] bg-bg-surface border-l border-border-subtle z-50 flex flex-col shadow-[-10px_0_40px_rgba(0,0,0,0.5)]"
          >
            <div className="flex items-center justify-between p-5 border-b border-border-subtle">
              <h2 className="font-space text-[16px] font-semibold text-txt">Task Logs</h2>
              <button onClick={onClose} className="p-1.5 rounded-md text-txt-muted hover:text-txt hover:bg-white/5 transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="p-4 border-b border-border-subtle bg-bg-card">
              <div className="flex items-center gap-2">
                {['All', 'Success', 'Failed'].map(filter => (
                  <button key={filter} className="px-3 py-1 rounded-full border border-border-subtle text-[11px] text-txt-secondary hover:bg-white/5 font-medium transition-colors">
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
              <div className="relative border-l border-border-subtle ml-3 pl-6 space-y-8">
                {logs.map((log) => (
                  <div key={log.id} className="relative">
                    <div className={`absolute -left-[29px] top-1 w-2.5 h-2.5 rounded-full ring-4 ring-bg-surface ${log.status === 'success' ? 'bg-green' : 'bg-red'}`} />
                    
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-[12px] text-txt-secondary font-medium">{log.time}</span>
                      <StatusBadge status={log.status as any} />
                    </div>
                    
                    {log.status === 'success' ? (
                      <div className="bg-bg-card border border-border-subtle rounded-lg p-3 mt-2 cursor-pointer hover:border-border-soft transition-colors">
                        <p className="font-mono text-[11px] text-txt line-clamp-2 leading-relaxed">
                          {log.preview}
                        </p>
                        <div className="mt-2 text-[10px] text-txt-muted flex justify-between">
                          <span>{log.duration}</span>
                          <span className="text-brand-violet group-hover:underline">View details &rarr;</span>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-red/5 border border-red/20 rounded-lg p-3 mt-2">
                        <p className="font-mono text-[11px] text-red leading-relaxed">
                          {log.error}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
