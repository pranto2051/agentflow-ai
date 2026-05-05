"use client";

import { motion } from "framer-motion";
import AnalyticsHeroMetrics from "@/components/admin/analytics/AnalyticsHeroMetrics";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

const data = [
  { name: "Mon", signups: 12, cumulative: 2340 },
  { name: "Tue", signups: 18, cumulative: 2358 },
  { name: "Wed", signups: 15, cumulative: 2373 },
  { name: "Thu", signups: 22, cumulative: 2395 },
  { name: "Fri", signups: 30, cumulative: 2425 },
  { name: "Sat", signups: 14, cumulative: 2439 },
  { name: "Sun", signups: 20, cumulative: 2459 },
];

export default function AnalyticsAdminPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold font-heading text-orange-500">Business Intelligence</h1>
          <p className="text-sm text-text-muted">Platform-wide growth and performance analytics</p>
        </div>
        <div className="flex gap-2">
          {["7d", "30d", "90d", "1y"].map(range => (
            <button 
              key={range}
              className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full bg-white/5 border border-white/10 hover:bg-orange-500/10 hover:text-orange-500 transition-all"
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <AnalyticsHeroMetrics />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-text-muted">User Growth Trend</h3>
            <span className="text-[10px] text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">Peak: +47 New</span>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorSignups" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="rgba(255,255,255,0.3)" 
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.3)" 
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#0d0d1a", 
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    fontSize: "12px"
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="signups" 
                  stroke="#f97316" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorSignups)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-text-muted mb-6">Platform Distribution</h3>
            <div className="space-y-6">
              {[
                { label: "LinkedIn", value: 68, color: "bg-indigo-500" },
                { label: "Twitter/X", value: 22, color: "bg-cyan-500" },
                { label: "Facebook", value: 10, color: "bg-blue-500" },
              ].map(p => (
                <div key={p.label} className="space-y-2">
                  <div className="flex justify-between text-xs font-medium">
                    <span>{p.label}</span>
                    <span className="text-text-muted">{p.value}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full", p.color)} style={{ width: `${p.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/5">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-text-muted">
              <span>Avg/Day: 18</span>
              <span>Total: 2,412</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

import { cn } from "@/lib/utils";
