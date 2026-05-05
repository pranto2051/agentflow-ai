'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { PlatformBadge } from '@/components/dashboard/shared/PlatformBadge';

interface PlatformBreakdownProps {
  data: any;
}

export function PlatformBreakdown({ data }: PlatformBreakdownProps) {
  
  const chartData = [
    { name: 'LinkedIn', value: data.linkedin, color: '#0a66c2' },
    { name: 'Twitter', value: data.twitter, color: '#1da1f2' },
    { name: 'Facebook', value: data.facebook, color: '#1877f2' }
  ].filter(d => d.value > 0);

  const total = chartData.reduce((acc, curr) => acc + curr.value, 0);

  if (total === 0) {
    return (
      <div className="dash-card p-6 h-[400px] flex flex-col items-center justify-center">
        <p className="text-txt-muted text-[13px]">No platform data available.</p>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-bg-card border border-border-subtle p-2 rounded-lg shadow-xl text-[12px] flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: payload[0].payload.color }} />
          <span className="text-txt">{payload[0].name}:</span>
          <span className="font-bold">{payload[0].value.toLocaleString()} views</span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="dash-card p-6 h-[400px] flex flex-col">
      <div>
        <h3 className="font-space text-[16px] font-bold text-txt">Platform Distribution</h3>
        <p className="text-[12px] text-txt-muted mt-1">Where your audience engages most</p>
      </div>

      <div className="flex-1 w-full min-h-0 relative mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[24px] font-bold text-txt">{total >= 1000 ? (total/1000).toFixed(1) + 'k' : total}</span>
          <span className="text-[10px] text-txt-muted uppercase tracking-wider">Total Views</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {chartData.map(d => (
          <div key={d.name} className="flex flex-col items-center p-2 rounded bg-white/5 border border-border-subtle">
            <PlatformBadge platform={d.name.toLowerCase() as any} size="sm" />
            <span className="text-[12px] font-bold text-txt mt-1">{Math.round((d.value/total)*100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
