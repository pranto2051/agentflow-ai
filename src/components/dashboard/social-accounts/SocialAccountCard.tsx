'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MoreHorizontal, Clock, RefreshCw, LogOut, CheckCircle2, AlertTriangle, XCircle, FileText, Activity } from 'lucide-react';
import { SocialAccount } from '@/types/dashboard';
import { PlatformBadge } from '@/components/dashboard/shared/PlatformBadge';

interface SocialAccountCardProps {
  platform: 'linkedin' | 'twitter' | 'facebook';
  account?: SocialAccount;
  onConnect: (p: string) => void;
  onDisconnect: (id: string) => void;
  onRefresh: (id: string) => void;
}

export function SocialAccountCard({ platform, account, onConnect, onDisconnect, onRefresh }: SocialAccountCardProps) {
  
  const getBrandColors = () => {
    switch (platform) {
      case 'linkedin': return { bg: '#0a66c2', name: 'LinkedIn' };
      case 'twitter': return { bg: '#000000', name: 'Twitter/X' };
      case 'facebook': return { bg: '#1877f2', name: 'Facebook' };
    }
  };

  const brand = getBrandColors();

  if (!account || !account.is_active) {
    return (
      <div className="dash-card relative overflow-hidden group">
        <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />
        <div className="p-6 relative z-0 flex flex-col items-center justify-center min-h-[220px] text-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg mb-4 opacity-50 grayscale" style={{ backgroundColor: brand.bg }}>
            <PlatformBadge platform={platform} size="sm" />
          </div>
          <h3 className="font-space text-[16px] font-semibold text-txt mb-2">{brand.name}</h3>
          <p className="text-[12px] text-txt-muted max-w-[240px] mb-6">Connect to enable automated posting and AI content generation for {brand.name}.</p>
          
          <button 
            onClick={() => onConnect(platform)}
            className="px-6 py-2 rounded-lg text-white text-[13px] font-medium transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.1)] relative z-20"
            style={{ background: brand.bg }}
          >
            Connect {brand.name}
          </button>
        </div>
      </div>
    );
  }

  const isExpired = account.token_health === 'expired';
  const isExpiring = account.token_health === 'expiring';

  return (
    <div className={`dash-card p-6 flex flex-col gap-5 transition-all
      ${isExpired ? 'border-red/40 bg-red/5' : ''}
    `}>
      {isExpired && (
        <div className="absolute top-0 left-0 right-0 py-1 bg-red/20 border-b border-red/20 text-center text-[10px] font-bold tracking-wider text-red uppercase">
          ⚠ Token Expired — Reconnect Required
        </div>
      )}

      {/* Header */}
      <div className={`flex justify-between items-start ${isExpired ? 'mt-4' : ''}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm" style={{ backgroundColor: brand.bg }}>
            <PlatformBadge platform={platform} size="sm" />
          </div>
          <div>
            <h3 className="font-space text-[15px] font-bold text-txt">{brand.name}</h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              {isExpired ? (
                <span className="flex items-center gap-1 text-[11px] text-red font-medium"><XCircle size={12}/> Expired</span>
              ) : isExpiring ? (
                <span className="flex items-center gap-1 text-[11px] text-amber font-medium"><AlertTriangle size={12}/> Expiring soon</span>
              ) : (
                <span className="flex items-center gap-1 text-[11px] text-green font-medium"><CheckCircle2 size={12}/> Active</span>
              )}
            </div>
          </div>
        </div>

        <div className="relative group/menu">
          <button className="p-1.5 rounded-md text-txt-muted hover:text-txt hover:bg-white/5 transition-colors">
            <MoreHorizontal size={18} />
          </button>
          <div className="absolute right-0 top-full mt-1 w-40 bg-bg-surface border border-border-subtle rounded-lg shadow-card py-1 hidden group-hover/menu:block z-10">
            <button onClick={() => onRefresh(account.id)} className="w-full text-left px-3 py-2 text-[12px] text-txt-secondary hover:text-txt hover:bg-white/5 flex items-center gap-2"><RefreshCw size={12}/> Refresh Token</button>
            <div className="h-[1px] bg-border-subtle my-1" />
            <button onClick={() => onDisconnect(account.id)} className="w-full text-left px-3 py-2 text-[12px] text-red hover:bg-red/10 flex items-center gap-2"><LogOut size={12}/> Disconnect</button>
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="flex items-center gap-3 bg-black/20 p-3 rounded-lg border border-border-subtle">
        <div className="w-12 h-12 rounded-full bg-bg-card border border-border-medium flex items-center justify-center text-[16px] font-bold text-txt-secondary overflow-hidden">
          {account.avatar_url ? <img src={account.avatar_url} alt="" className="w-full h-full object-cover" /> : account.username.charAt(0).toUpperCase()}
        </div>
        <div>
          <div className="text-[14px] font-semibold text-txt">{account.username}</div>
          <div className="text-[11px] text-txt-muted mt-0.5">Connected since {new Date(account.connected_at).toLocaleDateString()}</div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-white/5 rounded border border-border-subtle p-2 flex flex-col items-center justify-center gap-1">
          <FileText size={14} className="text-txt-muted" />
          <div className="text-[14px] font-bold text-txt">{account.post_count}</div>
          <div className="text-[9px] uppercase tracking-wider text-txt-muted">Posts</div>
        </div>
        <div className="bg-white/5 rounded border border-border-subtle p-2 flex flex-col items-center justify-center gap-1">
          <Clock size={14} className="text-txt-muted" />
          <div className="text-[12px] font-bold text-txt mt-1">{account.last_post_at ? '2d ago' : 'Never'}</div>
          <div className="text-[9px] uppercase tracking-wider text-txt-muted">Last Post</div>
        </div>
        <div className="bg-white/5 rounded border border-border-subtle p-2 flex flex-col items-center justify-center gap-1">
          <Activity size={14} className="text-txt-muted" />
          <div className="text-[12px] font-bold text-txt mt-1">N/A</div>
          <div className="text-[9px] uppercase tracking-wider text-txt-muted">Engagement</div>
        </div>
      </div>

      {/* Token Progress */}
      <div>
        <div className="flex justify-between text-[11px] mb-1.5">
          <span className="text-txt-muted">Token Status</span>
          <span className={isExpired ? 'text-red' : isExpiring ? 'text-amber' : 'text-txt-secondary'}>
            {isExpired ? 'Expired' : 'Expires in 18 days'}
          </span>
        </div>
        <div className="h-1.5 bg-bg-card rounded-full overflow-hidden border border-border-subtle">
          <div className={`h-full rounded-full ${isExpired ? 'bg-red w-[5%]' : isExpiring ? 'bg-amber w-[20%]' : 'bg-green w-[80%]'}`} />
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex gap-3 pt-2">
        {isExpired ? (
          <button onClick={() => onConnect(platform)} className="flex-1 h-9 rounded-lg bg-red text-white text-[12px] font-medium hover:bg-red/90 transition-colors">
            Reconnect Account
          </button>
        ) : (
          <>
            <button onClick={() => onRefresh(account.id)} className="flex-1 h-9 rounded-lg border border-border-subtle text-txt-secondary text-[12px] font-medium hover:bg-white/5 transition-colors">
              Refresh Token
            </button>
            <button onClick={() => onDisconnect(account.id)} className="px-4 h-9 rounded-lg border border-red/30 text-red text-[12px] font-medium hover:bg-red/10 transition-colors">
              Disconnect
            </button>
          </>
        )}
      </div>

    </div>
  );
}
