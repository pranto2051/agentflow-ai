"use client";

import { motion } from "framer-motion";
import { Shield, AlertTriangle, CheckCircle2, Server, Database, Brain, Mail, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

const services = [
  {
    name: "Supabase Database",
    icon: Database,
    status: "online",
    metrics: [
      { label: "Response Time", value: "12ms", color: "text-emerald-500" },
      { label: "Pool Usage", value: "8/20", color: "text-text-primary" },
      { label: "Storage", value: "247MB/500MB", color: "text-text-primary" }
    ],
    uptime: 99.98
  },
  {
    name: "Gemini AI API",
    icon: Brain,
    status: "online",
    metrics: [
      { label: "Status", value: "Operational", color: "text-emerald-500" },
      { label: "Avg Latency", value: "1.2s", color: "text-amber-500" },
      { label: "Tokens Used", value: "847k/1M", color: "text-amber-500" }
    ],
    uptime: 99.95
  },
  {
    name: "Cron Jobs",
    icon: Clock,
    status: "degraded",
    metrics: [
      { label: "run-tasks", value: "Succeeded", color: "text-emerald-500" },
      { label: "sync-stats", value: "Delayed", color: "text-amber-500" },
      { label: "cleanup", value: "Succeeded", color: "text-emerald-500" }
    ],
    uptime: 98.42
  },
  {
    name: "Email Service",
    icon: Mail,
    status: "online",
    metrics: [
      { label: "Delivery Rate", value: "99.2%", color: "text-emerald-500" },
      { label: "Bounces", value: "0.4%", color: "text-emerald-500" },
      { label: "Quota", value: "12k/50k", color: "text-text-primary" }
    ],
    uptime: 100.00
  }
];

export default function SystemHealthPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Overall Status Banner */}
      <div className={cn(
        "p-6 rounded-2xl border flex items-center justify-between transition-all",
        "bg-emerald-500/5 border-emerald-500/20 text-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.05)]"
      )}>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
            <Shield className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-heading">All Systems Operational</h2>
            <p className="text-sm opacity-70">Platform is performing optimally across all regions</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] uppercase tracking-widest font-bold opacity-50 mb-1">Last Checked</div>
          <div className="text-sm font-mono">Just now</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <div key={service.name} className="glass-card p-5 space-y-4 hover:border-white/10 transition-colors">
            <div className="flex justify-between items-start">
              <div className="p-2 rounded-lg bg-white/5 text-text-secondary">
                <service.icon size={20} />
              </div>
              <div className={cn(
                "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-tighter",
                service.status === "online" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
              )}>
                {service.status}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-bold text-white mb-3">{service.name}</h3>
              <div className="space-y-2">
                {service.metrics.map((m, i) => (
                  <div key={i} className="flex justify-between text-xs">
                    <span className="text-text-muted">{m.label}</span>
                    <span className={cn("font-medium", m.color)}>{m.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/5">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-text-muted mb-2">
                <span>90-Day Uptime</span>
                <span>{service.uptime}%</span>
              </div>
              <div className="flex gap-1">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "h-4 flex-grow rounded-sm",
                      service.status === "online" || i < 18 ? "bg-emerald-500/20" : "bg-amber-500/20"
                    )} 
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-text-muted mb-6">Recent System Events</h3>
          <div className="space-y-4">
            {[
              { time: "14:32", msg: "Cron job 'run-tasks' completed successfully", icon: CheckCircle2, color: "text-emerald-500" },
              { time: "14:15", msg: "Gemini API latency spiked to 4.2s", icon: AlertTriangle, color: "text-amber-500" },
              { time: "13:45", msg: "Database connection pool reached 80% capacity", icon: AlertTriangle, color: "text-amber-500" },
              { time: "12:00", msg: "Daily system maintenance completed", icon: Server, color: "text-cyan-500" },
            ].map((event, i) => (
              <div key={i} className="flex gap-4 items-start group">
                <span className="text-xs font-mono text-text-muted py-1">{event.time}</span>
                <div className="mt-1.5 p-1 rounded-full bg-white/5">
                  <event.icon size={12} className={event.color} />
                </div>
                <p className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">{event.msg}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-text-muted mb-6">Resource Usage (Vercel)</h3>
          <div className="space-y-6">
            {[
              { label: "Build Minutes", used: 1450, total: 6000, color: "bg-orange-500" },
              { label: "Serverless Invocations", used: 42, total: 100, color: "bg-cyan-500", unit: "k" },
              { label: "Edge Bandwidth", used: 12, total: 100, color: "bg-emerald-500", unit: "GB" },
            ].map((r, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span>{r.label}</span>
                  <span className="text-text-muted">{r.used}{r.unit || ""} / {r.total}{r.unit || ""}</span>
                </div>
                <Progress value={(r.used / r.total) * 100} className="h-1.5 bg-white/5" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
