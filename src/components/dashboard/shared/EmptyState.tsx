'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  icon: string | ReactNode;
  title: string;
  subtitle: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon, title, subtitle, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 w-full h-full min-h-[300px]">
      <div className="w-16 h-16 rounded-full bg-brand-bg border border-brand-border flex items-center justify-center mb-6 text-3xl shadow-[0_0_30px_rgba(124,58,237,0.15)]">
        {icon}
      </div>
      
      <h3 className="font-space text-[16px] font-semibold text-txt mb-2">
        {title}
      </h3>
      
      <p className="text-[13px] text-txt-muted max-w-[340px] mb-6 leading-relaxed">
        {subtitle}
      </p>
      
      {action && (
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={action.onClick}
          className="px-5 py-2.5 rounded-lg bg-[var(--brand-gradient)] text-white text-[13px] font-medium shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] transition-shadow"
        >
          {action.label}
        </motion.button>
      )}
    </div>
  );
}
