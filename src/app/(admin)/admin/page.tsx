"use client";

import { useState, useEffect } from "react";
import StatsCard from "@/components/dashboard/StatsCard";
import { Users, CheckSquare, Bot, Zap, Activity, Clock } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export default function AdminOverview() {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState([
    { title: "Total Users", value: "0", change: "0%", isPositive: true, icon: Users },
    { title: "Active Tasks", value: "0", change: "0%", isPositive: true, icon: CheckSquare },
    { title: "AI Generations", value: "0", change: "0%", isPositive: true, icon: Bot },
    { title: "Success Rate", value: "0%", change: "0%", isPositive: true, icon: Zap },
  ]);
  const [recentUsers, setRecentUsers] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    async function fetchAdminData() {
      setIsLoading(true);
      try {
        // Fetch Total Users
        const { count: usersCount } = await supabase
          .from("profiles")
          .select("*", { count: "exact", head: true });

        // Fetch Total Tasks
        const { count: tasksCount } = await supabase
          .from("tasks")
          .select("*", { count: "exact", head: true });

        // Fetch Total AI Generations
        const { count: postsCount } = await supabase
          .from("ai_generated_posts")
          .select("*", { count: "exact", head: true });

        // Fetch System Success Rate
        const { data: allLogs } = await supabase
          .from("automation_logs")
          .select("status");

        let successRate = "0%";
        if (allLogs && allLogs.length > 0) {
          const successCount = allLogs.filter(l => l.status === "success").length;
          successRate = ((successCount / allLogs.length) * 100).toFixed(1) + "%";
        }

        // Fetch Recent Users
        const { data: profiles } = await supabase
          .from("profiles")
          .select("full_name, email, created_at, avatar_url")
          .order("created_at", { ascending: false })
          .limit(5);

        setStats([
          { title: "Total Users", value: (usersCount || 0).toLocaleString(), change: "0%", isPositive: true, icon: Users },
          { title: "Active Tasks", value: (tasksCount || 0).toLocaleString(), change: "0%", isPositive: true, icon: CheckSquare },
          { title: "AI Generations", value: (postsCount || 0).toLocaleString(), change: "0%", isPositive: true, icon: Bot },
          { title: "Success Rate", value: successRate, change: "0%", isPositive: true, icon: Zap },
        ]);

        if (profiles) {
          setRecentUsers(profiles);
        }

      } catch (error) {
        console.error("Error fetching admin data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAdminData();
  }, []);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <StatsCard key={stat.title} {...stat} index={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-6 border-brand-violet/20">
          <h3 className="text-sm font-semibold font-heading uppercase tracking-wider text-text-secondary mb-6">System Health</h3>
          <div className="space-y-4">
            {[
              { label: "Supabase DB", status: "Online", icon: Activity },
              { label: "Gemini API", status: "Online", icon: Bot },
              { label: "Vercel Cron", status: "Running", icon: Zap },
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                <div className="flex items-center gap-3">
                  <s.icon className="h-4 w-4 text-brand-violet-light" />
                  <span className="text-sm font-medium">{s.label}</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">{s.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6 border-brand-violet/20">
          <h3 className="text-sm font-semibold font-heading uppercase tracking-wider text-text-secondary mb-6">Recent Users</h3>
          <div className="space-y-4">
            {recentUsers.length > 0 ? (
              recentUsers.map((user, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 group hover:border-brand-violet/20 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-violet/10 flex items-center justify-center text-xs font-bold text-brand-violet-light">
                      {user.full_name?.[0] || user.email?.[0] || "?"}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{user.full_name || "Anonymous"}</p>
                      <p className="text-[10px] text-text-muted">{user.email}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-text-muted">
                    {new Date(user.created_at).toLocaleDateString()}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-8 opacity-50">
                <Clock className="h-8 w-8 mx-auto mb-2" />
                <p className="text-xs">No users found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
