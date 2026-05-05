"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { createClient } from "@/lib/supabase/client";

export default function AnalyticsChart() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchChartData() {
      setIsLoading(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Fetch logs from last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const { data: logs } = await supabase
          .from("automation_logs")
          .select("created_at")
          .eq("user_id", user.id)
          .gte("created_at", sevenDaysAgo.toISOString());

        // Process data for chart
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const last7Days: { name: string; fullDate: string; value: number }[] = [];
        for (let i = 6; i >= 0; i--) {
          const d = new Date();
          d.setDate(d.getDate() - i);
          last7Days.push({
            name: days[d.getDay()],
            fullDate: d.toLocaleDateString(),
            value: 0
          });
        }

        if (logs) {
          logs.forEach(log => {
            const logDate = new Date(log.created_at).toLocaleDateString();
            const dayEntry = last7Days.find(d => d.fullDate === logDate);
            if (dayEntry) dayEntry.value++;
          });
        }

        setData(last7Days);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchChartData();
  }, []);

  return (
    <div className="glass-card p-6 h-[400px] flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-sm font-semibold font-heading uppercase tracking-wider text-text-secondary">AI Generations</h3>
          <p className="text-xs text-text-muted mt-1">Activity over the last 7 days</p>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-medium text-emerald-400 uppercase tracking-tighter">Live</span>
        </div>
      </div>

      <div className="flex-grow">
        {data.length > 0 && data.some(d => d.value > 0) ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'rgba(240,240,255,0.28)', fontSize: 10 }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'rgba(240,240,255,0.28)', fontSize: 10 }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0d0d1a', 
                  border: '1px solid rgba(124,58,237,0.3)', 
                  borderRadius: '10px',
                  fontSize: '12px',
                  color: '#f0f0ff'
                }}
                itemStyle={{ color: '#a78bfa' }}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#7c3aed" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorValue)" 
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full w-full flex flex-col items-center justify-center opacity-30 border border-dashed border-white/10 rounded-xl">
            <p className="text-xs uppercase tracking-widest font-bold">No Generation Data</p>
            <p className="text-[10px] mt-1">Real-time stats will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}
