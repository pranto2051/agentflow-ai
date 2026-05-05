"use client";

import StatsCard from "@/components/dashboard/StatsCard";
import AnalyticsChart from "@/components/dashboard/AnalyticsChart";
import { CheckSquare, Bot, Zap, Share2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ROUTES } from "@/lib/constants";

const stats = [
  { title: "Total Tasks", value: "12", change: "12%", isPositive: true, icon: CheckSquare },
  { title: "AI Posts", value: "148", change: "24%", isPositive: true, icon: Bot },
  { title: "Success Rate", value: "98.2%", change: "2.1%", isPositive: true, icon: Zap },
  { title: "Schedules", value: "5", change: "0%", isPositive: true, icon: Share2 },
];

const recentActivity = [
  { platform: "LinkedIn", task: "Weekly Learning", status: "success", time: "2 hours ago" },
  { platform: "Twitter", task: "Daily Hook", status: "success", time: "5 hours ago" },
  { platform: "Facebook", task: "Project Update", status: "failed", time: "Yesterday" },
  { platform: "LinkedIn", task: "Thought Leadership", status: "success", time: "2 days ago" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <StatsCard key={stat.title} {...stat} index={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2">
          <AnalyticsChart />
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="space-y-8">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-semibold font-heading uppercase tracking-wider text-text-secondary">Recent Activity</h3>
              <Link href={ROUTES.ANALYTICS} className="text-[10px] text-brand-violet hover:underline uppercase tracking-widest font-bold">View All</Link>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-white/5 border border-white/5 group hover:border-brand-violet/20 transition-all">
                  <div className={cn(
                    "w-8 h-8 rounded flex items-center justify-center text-[10px] font-bold",
                    activity.platform === "LinkedIn" ? "bg-blue-600/20 text-blue-400" :
                    activity.platform === "Twitter" ? "bg-sky-400/20 text-sky-400" :
                    "bg-blue-800/20 text-blue-500"
                  )}>
                    {activity.platform[0]}
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="text-xs font-medium text-text-primary truncate">{activity.task}</p>
                    <p className="text-[10px] text-text-muted">{activity.time}</p>
                  </div>
                  <div className={cn(
                    "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-tighter",
                    activity.status === "success" ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
                  )}>
                    {activity.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6 bg-brand-gradient/5 border-brand-violet/20">
            <h3 className="text-sm font-semibold font-heading uppercase tracking-wider text-text-secondary mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link href={ROUTES.TASKS + "/new"}>
                <Button className="w-full justify-between group h-10 bg-brand-violet/10 hover:bg-brand-violet/20 text-brand-violet-light border-brand-violet/20">
                  Create New Task
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href={ROUTES.AI_ASSISTANT}>
                <Button variant="secondary" className="w-full justify-between group h-10">
                  Generate Post Now
                  <Bot className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper to use cn in the component
import { cn } from "@/lib/utils";
