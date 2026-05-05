import React from 'react';
import { AlertTriangle } from 'lucide-react';

export type StatusType = 'active' | 'paused' | 'completed' | 'failed' | 'running' | 'draft' | 'scheduled' | 'published';

interface StatusBadgeProps {
  status: StatusType;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'active':
        return { bg: 'bg-violet-bg', text: 'text-violet', border: 'border-violet-border', label: 'Active' };
      case 'running':
        return { bg: 'bg-cyan-bg', text: 'text-cyan', border: 'border-cyan-border', label: 'Running', dot: true };
      case 'completed':
      case 'published':
        return { bg: 'bg-green-bg', text: 'text-green', border: 'border-green-border', label: status.charAt(0).toUpperCase() + status.slice(1) };
      case 'failed':
        return { bg: 'bg-red-bg', text: 'text-red', border: 'border-red-border', label: 'Failed', icon: true };
      case 'paused':
        return { bg: 'bg-amber-bg', text: 'text-amber', border: 'border-amber-border', label: 'Paused' };
      case 'draft':
      case 'scheduled':
      default:
        return { bg: 'bg-white/5', text: 'text-txt-muted', border: 'border-white/10', label: status.charAt(0).toUpperCase() + status.slice(1) };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full border ${config.bg} ${config.border} ${config.text} text-[10px] font-medium uppercase tracking-wider`}>
      {config.dot && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan"></span>
        </span>
      )}
      {config.icon && <AlertTriangle size={10} />}
      {config.label}
    </div>
  );
}
