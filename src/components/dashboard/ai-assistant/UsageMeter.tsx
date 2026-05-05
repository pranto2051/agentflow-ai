import React from 'react';
import { Sparkles } from 'lucide-react';

interface UsageMeterProps {
  used: number;
  total: number;
  plan?: string;
}

export function UsageMeter({ used, total, plan = 'Pro' }: UsageMeterProps) {
  const percentage = Math.min((used / total) * 100, 100);
  
  let statusColor = 'bg-[var(--brand-gradient)]';
  if (percentage > 95) statusColor = 'bg-red';
  else if (percentage > 80) statusColor = 'bg-amber';

  return (
    <div className="flex items-center justify-between px-6 py-2 bg-[rgba(255,255,255,0.02)] border-b border-border-subtle z-20">
      <div className="flex items-center gap-2 text-[11px] font-medium text-txt-secondary uppercase tracking-wider">
        <Sparkles size={12} className="text-brand-violet-light" />
        Daily AI Usage
      </div>
      
      <div className="flex items-center gap-4">
        <div className="w-[150px] md:w-[200px] h-1.5 bg-bg-card rounded-full overflow-hidden border border-border-subtle">
          <div 
            className={`h-full ${statusColor} rounded-full transition-all duration-500`} 
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className={`text-[11px] font-mono tracking-wider ${percentage >= 100 ? 'text-red font-bold' : 'text-txt-muted'}`}>
          {used} / {total} used
        </div>
        {percentage >= 100 && (
          <button className="hidden md:block text-[10px] text-amber hover:text-amber/80 underline font-medium">
            Upgrade Plan
          </button>
        )}
      </div>
    </div>
  );
}
