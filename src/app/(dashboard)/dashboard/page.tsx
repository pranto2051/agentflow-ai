"use client";

import { useState, useEffect } from "react";
import StatsCard from "@/components/dashboard/StatsCard";
import AnalyticsChart from "@/components/dashboard/AnalyticsChart";
import { CheckSquare, Bot, Zap, Share2, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ROUTES } from "@/lib/constants";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState([
    { title: "Total Tasks", value: "0", change: "0%", isPositive: true, icon: CheckSquare },
    { title: "AI Posts", value: "0", change: "0%", isPositive: true, icon: Bot },
    { title: "Success Rate", value: "0%", change: "0%", isPositive: true, icon: Zap },
    { title: "Schedules", value: "0", change: "0%", isPositive: true, icon: Share2 },
  ]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    async function fetchDashboardData() {
      setIsLoading(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Fetch Tasks Count
        const { count: tasksCount } = await supabase
          .from("tasks")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id);

        // Fetch AI Posts Count
        const { count: postsCount } = await supabase
          .from("ai_generated_posts")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id);

        // Fetch Recent Activity
        const { data: logs } = await supabase
          .from("automation_logs")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(4);

        // Fetch Success Rate
        const { data: allLogs } = await supabase
          .from("automation_logs")
          .select("status")
          .eq("user_id", user.id);

        let successRate = "0%";
        if (allLogs && allLogs.length > 0) {
          const successCount = allLogs.filter(l => l.status === "success").length;
          successRate = ((successCount / allLogs.length) * 100).toFixed(1) + "%";
        }

        setStats([
          { title: "Total Tasks", value: (tasksCount || 0).toString(), change: "0%", isPositive: true, icon: CheckSquare },
          { title: "AI Posts", value: (postsCount || 0).toString(), change: "0%", isPositive: true, icon: Bot },
          { title: "Success Rate", value: successRate, change: "0%", isPositive: true, icon: Zap },
          { title: "Schedules", value: (tasksCount || 0).toString(), change: "0%", isPositive: true, icon: Share2 },
        ]);

        if (logs) {
          setRecentActivity(logs.map(log => ({
            platform: log.action?.split(" ")[0] || "System",
            task: log.action || "Automation Task",
            status: log.status,
            time: new Date(log.created_at).toLocaleDateString()
          })));
        }

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

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
              {recentActivity.length > 0 ? (
                recentActivity.map((activity, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-white/5 border border-white/5 group hover:border-brand-violet/20 transition-all">
                    <div className={cn(
                      "w-8 h-8 rounded flex items-center justify-center text-[10px] font-bold",
                      activity.platform === "LinkedIn" ? "bg-blue-600/20 text-blue-400" :
                      activity.platform === "Twitter" ? "bg-sky-400/20 text-sky-400" :
                      "bg-brand-violet/20 text-brand-violet"
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
                ))
              ) : (
                <div className="text-center py-8 opacity-50">
                  <Clock className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-xs">No recent activity</p>
                </div>
              )}
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
