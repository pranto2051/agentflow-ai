'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import CountUp from 'react-countup';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';

interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  changeDir?: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  accentColor: 'violet' | 'cyan' | 'green' | 'amber' | 'red';
  sparklineData?: number[];
}

export function StatCard({ label, value, change, changeDir, icon: Icon, accentColor, sparklineData }: StatCardProps) {
  const getAccentColors = () => {
    switch (accentColor) {
      case 'violet': return { bg: 'bg-violet-bg', text: 'text-violet', border: 'var(--violet)' };
      case 'cyan': return { bg: 'bg-cyan-bg', text: 'text-cyan', border: 'var(--cyan)' };
      case 'green': return { bg: 'bg-green-bg', text: 'text-green', border: 'var(--green)' };
      case 'amber': return { bg: 'bg-amber-bg', text: 'text-amber', border: 'var(--amber)' };
      case 'red': return { bg: 'bg-red-bg', text: 'text-red', border: 'var(--red)' };
      default: return { bg: 'bg-violet-bg', text: 'text-violet', border: 'var(--violet)' };
    }
  };

  const colors = getAccentColors();

  // Convert sparkline array to recharts object array
  const formattedData = sparklineData?.map((val, i) => ({ val, index: i })) || [];

  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className="dash-card p-5 group"
    >
      <div 
        className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-50 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${colors.border}, transparent)` }}
      />
      
      <div className="flex justify-between items-start mb-4">
        <div className={`w-9 h-9 rounded-[10px] flex items-center justify-center ${colors.bg} ${colors.text}`}>
          <Icon size={18} strokeWidth={2.5} />
        </div>
        
        {change && (
          <div className={`flex items-center gap-1 text-[11px] font-medium px-1.5 py-0.5 rounded
            ${changeDir === 'up' ? 'text-green bg-green-bg' : changeDir === 'down' ? 'text-red bg-red-bg' : 'text-txt-muted bg-white/5'}
          `}>
            {changeDir === 'up' ? <TrendingUp size={12} /> : changeDir === 'down' ? <TrendingDown size={12} /> : null}
            {change}
          </div>
        )}
      </div>

      <div className="flex justify-between items-end gap-2">
        <div>
          <div className="text-[28px] font-space font-bold text-txt leading-none tracking-tight mb-1">
            {typeof value === 'number' ? (
              <CountUp end={value} duration={2} separator="," />
            ) : (
              value
            )}
          </div>
          <div className="text-[12px] uppercase tracking-wider text-txt-muted font-medium">
            {label}
          </div>
        </div>

        {sparklineData && sparklineData.length > 0 && (
          <div className="w-[60px] h-[28px] opacity-70 group-hover:opacity-100 transition-opacity">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={formattedData}>
                <YAxis domain={['dataMin', 'dataMax']} hide />
                <Line 
                  type="monotone" 
                  dataKey="val" 
                  stroke={colors.border} 
                  strokeWidth={2} 
                  dot={false}
                  isAnimationActive={true}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </motion.div>
  );
}
