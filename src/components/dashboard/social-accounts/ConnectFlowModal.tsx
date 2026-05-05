'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { scaleIn } from '@/lib/animations/dashboard';
import { PlatformBadge } from '@/components/dashboard/shared/PlatformBadge';

interface ConnectFlowModalProps {
  platform: string | null;
  open: boolean;
  onClose: () => void;
  onConfirm: (platform: string) => void;
}

export function ConnectFlowModal({ platform, open, onClose, onConfirm }: ConnectFlowModalProps) {
  const [isConnecting, setIsConnecting] = useState(false);

  if (!open || !platform) return null;

  const handleConnect = () => {
    setIsConnecting(true);
    onConfirm(platform);
    // Modal stays open while redirect happens, or closes depending on flow
  };

  const getBrandColors = () => {
    switch (platform) {
      case 'linkedin': return { bg: '#0a66c2', name: 'LinkedIn' };
      case 'twitter': return { bg: '#000000', name: 'Twitter/X' };
      case 'facebook': return { bg: '#1877f2', name: 'Facebook' };
      default: return { bg: '#7c3aed', name: 'Platform' };
    }
  };

  const brand = getBrandColors();

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
        
        <motion.div variants={scaleIn} initial="initial" animate="animate" exit="initial" className="relative w-full max-w-[400px] bg-bg-surface border border-border-subtle rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden">
          
          <div className="flex items-center justify-between p-5 border-b border-border-subtle">
            <h2 className="font-space text-[16px] font-semibold text-txt flex items-center gap-2">
              <PlatformBadge platform={platform as any} size="sm" /> Connect {brand.name}
            </h2>
            <button onClick={onClose} className="p-1.5 rounded-md text-txt-muted hover:text-txt hover:bg-white/5 transition-colors">
              <X size={18} />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4" style={{ backgroundColor: brand.bg }}>
                <PlatformBadge platform={platform as any} />
              </div>
              <h3 className="font-space text-[18px] font-bold text-txt">Secure Connection</h3>
              <p className="text-[13px] text-txt-muted mt-2">AgentFlow needs access to your {brand.name} account to publish posts.</p>
            </div>

            <div className="bg-bg-card border border-border-subtle rounded-lg p-4 space-y-3">
              <h4 className="text-[12px] font-semibold text-txt-secondary uppercase tracking-wider mb-2 flex items-center gap-1.5"><ShieldCheck size={14}/> What we can do</h4>
              <div className="flex items-start gap-2 text-[13px] text-txt">
                <CheckCircle2 size={16} className="text-green shrink-0 mt-0.5" />
                <span>Post content on your behalf (when scheduled)</span>
              </div>
              <div className="flex items-start gap-2 text-[13px] text-txt">
                <CheckCircle2 size={16} className="text-green shrink-0 mt-0.5" />
                <span>Read your basic profile information</span>
              </div>
              <div className="flex items-start gap-2 text-[13px] text-txt opacity-60">
                <X size={16} className="text-txt-muted shrink-0 mt-0.5" />
                <span>We cannot read your private messages</span>
              </div>
              <div className="flex items-start gap-2 text-[13px] text-txt opacity-60">
                <X size={16} className="text-txt-muted shrink-0 mt-0.5" />
                <span>We cannot follow or unfollow accounts</span>
              </div>
            </div>

            <p className="text-[11px] text-txt-muted text-center px-4">
              By connecting, you agree to our <a href="#" className="underline hover:text-txt">Privacy Policy</a> and <a href="#" className="underline hover:text-txt">Terms of Service</a>. We only request the minimum permissions needed.
            </p>
          </div>

          <div className="p-5 border-t border-border-subtle bg-bg-surface">
            <button 
              onClick={handleConnect}
              disabled={isConnecting}
              className="w-full py-2.5 rounded-lg text-white text-[14px] font-medium shadow-lg flex justify-center items-center gap-2 transition-all hover:opacity-90 disabled:opacity-70"
              style={{ backgroundColor: brand.bg }}
            >
              {isConnecting ? (
                <><span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> Redirecting...</>
              ) : (
                <>Connect {brand.name} <ArrowRight size={16}/></>
              )}
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
