"use client";

import StatsCard from "@/components/dashboard/StatsCard";
import { Users, CheckSquare, Bot, Zap, Activity } from "lucide-react";

const adminStats = [
  { title: "Total Users", value: "1,248", change: "18%", isPositive: true, icon: Users },
  { title: "Active Tasks", value: "3,420", change: "12%", isPositive: true, icon: CheckSquare },
  { title: "AI Generations", value: "45.2K", change: "32%", isPositive: true, icon: Bot },
  { title: "Success Rate", value: "99.1%", change: "0.5%", isPositive: true, icon: Zap },
];

export default function AdminOverview() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminStats.map((stat, i) => (
          <StatsCard key={stat.title} {...stat} index={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-6 border-amber-900/20">
          <h3 className="text-sm font-semibold font-heading uppercase tracking-wider text-orange-400 mb-6">System Health</h3>
          <div className="space-y-4">
            {[
              { label: "Supabase DB", status: "Online", icon: Activity },
              { label: "Gemini API", status: "Online", icon: Bot },
              { label: "Vercel Cron", status: "Running", icon: Zap },
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-orange-500/5 border border-orange-500/10">
                <div className="flex items-center gap-3">
                  <s.icon className="h-4 w-4 text-orange-400" />
                  <span className="text-sm font-medium">{s.label}</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">{s.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6 border-amber-900/20">
          <h3 className="text-sm font-semibold font-heading uppercase tracking-wider text-orange-400 mb-6">Recent Users</h3>
          <div className="space-y-4">
            {/* Placeholder for user list */}
            <p className="text-xs text-text-muted text-center py-8">User management coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
}
