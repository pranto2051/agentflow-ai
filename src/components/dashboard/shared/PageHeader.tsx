'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations/dashboard';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  actions?: ReactNode;
  badge?: string;
  breadcrumb?: { label: string; href: string }[];
}

export function PageHeader({ title, subtitle, actions, badge, breadcrumb }: PageHeaderProps) {
  return (
    <motion.div 
      variants={fadeIn}
      initial="initial"
      animate="animate"
      className="pb-4 border-b border-border-subtle mb-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          {breadcrumb && breadcrumb.length > 0 && (
            <div className="flex items-center gap-2 mb-2 text-[10px] uppercase tracking-wider text-txt-muted font-medium">
              {breadcrumb.map((item, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <ChevronRight size={12} />}
                  <Link href={item.href} className="hover:text-txt transition-colors">
                    {item.label}
                  </Link>
                </React.Fragment>
              ))}
            </div>
          )}
          <div className="flex items-center gap-3">
            <h1 className="font-space font-semibold text-[22px] tracking-tight">{title}</h1>
            {badge && (
              <span className="px-2 py-0.5 rounded-full bg-brand-bg border border-brand-border text-txt-brand text-[10px] font-medium tracking-wide">
                {badge}
              </span>
            )}
          </div>
          <p className="text-[13px] text-txt-muted mt-1">{subtitle}</p>
        </div>
        
        {actions && (
          <div className="flex items-center gap-3">
            {actions}
          </div>
        )}
      </div>
    </motion.div>
  );
}
