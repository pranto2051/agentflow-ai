import React from 'react';
import { Globe } from 'lucide-react';

interface PlatformBadgeProps {
  platform: 'linkedin' | 'twitter' | 'facebook' | 'all';
  size?: 'sm' | 'md';
}

export function PlatformBadge({ platform, size = 'sm' }: PlatformBadgeProps) {
  const isSmall = size === 'sm';
  
  const getPlatformConfig = () => {
    switch (platform) {
      case 'linkedin':
        return {
          bg: 'bg-[#0a66c2]',
          text: 'text-white',
          label: 'LinkedIn',
          icon: <span className="font-bold font-sans text-[11px] leading-none">in</span>
        };
      case 'twitter':
        return {
          bg: 'bg-black',
          text: 'text-white',
          label: 'Twitter/X',
          icon: <span className="font-bold text-[11px] leading-none">𝕏</span>
        };
      case 'facebook':
        return {
          bg: 'bg-[#1877f2]',
          text: 'text-white',
          label: 'Facebook',
          icon: <span className="font-bold font-serif text-[12px] leading-none mr-0.5">f</span>
        };
      case 'all':
      default:
        return {
          bg: 'bg-[var(--brand-gradient)]',
          text: 'text-white',
          label: 'All Platforms',
          icon: <Globe size={12} strokeWidth={2.5} />
        };
    }
  };

  const config = getPlatformConfig();

  return (
    <div className={`flex items-center gap-1.5 ${isSmall ? '' : 'px-2 py-1 bg-white/5 border border-white/10 rounded-full'}`}>
      <div className={`${isSmall ? 'w-5 h-5' : 'w-4 h-4'} rounded-full ${config.bg} ${config.text} flex items-center justify-center shadow-sm`}>
        {config.icon}
      </div>
      {!isSmall && (
        <span className="text-[11px] font-medium text-txt-secondary leading-none">
          {config.label}
        </span>
      )}
    </div>
  );
}
