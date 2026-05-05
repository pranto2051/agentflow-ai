'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertOctagon, X } from 'lucide-react';
import { scaleIn } from '@/lib/animations/dashboard';

interface DisconnectConfirmDialogProps {
  platform: string | null;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DisconnectConfirmDialog({ platform, open, onClose, onConfirm }: DisconnectConfirmDialogProps) {
  if (!open || !platform) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
        
        <motion.div variants={scaleIn} initial="initial" animate="animate" exit="initial" className="relative w-full max-w-[420px] bg-bg-surface border border-red/30 rounded-xl shadow-[0_0_40px_rgba(239,68,68,0.2)] overflow-hidden">
          
          <div className="p-6">
            <div className="w-12 h-12 rounded-full bg-red/10 border border-red/20 flex items-center justify-center text-red mb-4">
              <AlertOctagon size={24} />
            </div>
            
            <h2 className="font-space text-[18px] font-bold text-txt mb-2 capitalize">
              Disconnect {platform}?
            </h2>
            
            <p className="text-[13px] text-txt-secondary leading-relaxed mb-4">
              This will remove your {platform} connection. Scheduled posts to {platform} will fail until you reconnect.
            </p>
            
            <div className="p-3 bg-red/5 border border-red/20 rounded-lg text-[12px] text-red/80">
              <strong>Note:</strong> 3 scheduled tasks currently rely on this connection.
            </div>
          </div>

          <div className="flex gap-3 p-5 border-t border-border-subtle bg-black/20">
            <button onClick={onClose} className="flex-1 py-2 rounded-lg border border-border-subtle text-[13px] font-medium text-txt-secondary hover:text-txt hover:bg-white/5 transition-colors">
              Cancel
            </button>
            <button onClick={() => { onConfirm(); onClose(); }} className="flex-1 py-2 rounded-lg bg-red text-white text-[13px] font-medium shadow-[0_0_15px_rgba(239,68,68,0.3)] hover:bg-red/90 transition-colors">
              Yes, Disconnect
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
