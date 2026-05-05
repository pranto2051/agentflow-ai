"use client";

import { Users2, Activity, Brain, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  icon: any;
  color: string;
  index: number;
}

function MetricCard({ title, value, change, icon: Icon, color }: MetricCardProps) {
  return (
    <div className={cn(
      "glass-card p-6 border-t-2 relative overflow-hidden group hover:translate-y-[-4px] transition-all duration-300",
      color === "orange" ? "border-t-orange-500" :
      color === "cyan" ? "border-t-cyan-500" :
      color === "violet" ? "border-t-violet-500" : "border-t-emerald-500"
    )}>
      <div className="flex justify-between items-start mb-4">
        <div className={cn(
          "p-2 rounded-lg",
          color === "orange" ? "bg-orange-500/10 text-orange-500" :
          color === "cyan" ? "bg-cyan-500/10 text-cyan-500" :
          color === "violet" ? "bg-violet-500/10 text-violet-500" : "bg-emerald-500/10 text-emerald-500"
        )}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">
          {change}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-bold uppercase tracking-widest text-text-muted mb-1">{title}</h3>
        <p className="text-3xl font-bold font-heading text-white">{value}</p>
      </div>
      
      {/* Subtle background decoration */}
      <div className={cn(
        "absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity",
        color === "orange" ? "text-orange-500" :
        color === "cyan" ? "text-cyan-500" :
        color === "violet" ? "text-violet-500" : "text-emerald-500"
      )}>
        <Icon size={120} />
      </div>
    </div>
  );
}

export default function AnalyticsHeroMetrics() {
  const metrics = [
    { title: "Total Users", value: "2,412", change: "+24% wk", icon: Users2, color: "orange" },
    { title: "Active Users", value: "1,728", change: "72% MAU", icon: Activity, color: "cyan" },
    { title: "AI Generations", value: "14.2k", change: "+12% mo", icon: Brain, color: "violet" },
    { title: "Success Rate", value: "97.3%", change: "+2.1%", icon: TrendingUp, color: "green" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((m, i) => (
        <MetricCard key={m.title} {...m} index={i} />
      ))}
    </div>
  );
}
