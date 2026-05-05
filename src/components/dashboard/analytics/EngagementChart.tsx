'use client';

import React, { useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface EngagementChartProps {
  data: any[];
}

export function EngagementChart({ data }: EngagementChartProps) {
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-bg-card border border-border-subtle p-3 rounded-lg shadow-xl">
          <p className="text-[12px] text-txt-muted mb-2 font-medium">{label}</p>
          <div className="space-y-1">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-[13px] text-txt capitalize">{entry.name}:</span>
                <span className="text-[13px] font-bold" style={{ color: entry.color }}>
                  {entry.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="dash-card p-6 h-[400px] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-space text-[16px] font-bold text-txt">Engagement Overview</h3>
          <p className="text-[12px] text-txt-muted mt-1">Total interactions across all connected networks</p>
        </div>
        <div className="flex gap-4 text-[11px] font-medium">
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#7c3aed]" /> Likes</div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#06b6d4]" /> Comments</div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#f59e0b]" /> Shares</div>
        </div>
      </div>

      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorLikes" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorComments" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorShares" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis 
              dataKey="date" 
              stroke="rgba(255,255,255,0.2)" 
              tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }} 
              tickMargin={10}
              tickFormatter={(val) => {
                const date = new Date(val);
                return `${date.getMonth()+1}/${date.getDate()}`;
              }}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.2)" 
              tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }} 
              tickMargin={10}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, strokeDasharray: '4 4' }} />
            <Area type="monotone" dataKey="likes" stroke="#7c3aed" strokeWidth={2} fillOpacity={1} fill="url(#colorLikes)" />
            <Area type="monotone" dataKey="comments" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorComments)" />
            <Area type="monotone" dataKey="shares" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#colorShares)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
