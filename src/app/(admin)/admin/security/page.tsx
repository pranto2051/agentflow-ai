"use client";

import { motion } from "framer-motion";
import { Shield, AlertTriangle, Eye, UserX, Globe, Monitor, ShieldCheck, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function SecurityAdminPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold font-heading text-orange-500">Security Operations</h1>
          <p className="text-sm text-text-muted">Monitor threats, sessions, and platform security posture</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" className="h-9 border-red-500/20 text-red-400 hover:bg-red-500/10">
            <ShieldAlert size={14} className="mr-2" /> View Active Threats
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Security Score Gauge */}
        <div className="glass-card p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="relative w-48 h-48 mb-6">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                className="text-white/5"
              />
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={552}
                strokeDashoffset={552 - (552 * 87) / 100}
                className="text-orange-500 transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-bold font-heading">87</span>
              <span className="text-[10px] uppercase tracking-widest font-bold text-text-muted">Security Score</span>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-widest mb-6">
            <ShieldCheck size={12} /> Excellent Posture
          </div>
          <div className="w-full space-y-3 text-left">
            {[
              { label: "RLS Policies", score: "+20", status: "success" },
              { label: "Admin 2FA", score: "+15", status: "success" },
              { label: "Rate Limiting", score: "+10", status: "warning" },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center text-xs">
                <span className="text-text-muted">{item.label}</span>
                <span className={item.status === "success" ? "text-emerald-500" : "text-amber-500"}>{item.score}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Threat Feed */}
        <div className="lg:col-span-2 glass-card p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-text-muted">Live Threat Detection</h3>
            <div className="flex gap-2">
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-red-500/10 text-red-500 text-[10px] font-bold uppercase tracking-tighter">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                2 Active Threats
              </span>
            </div>
          </div>
          
          <div className="space-y-4 flex-grow">
            {[
              { type: "BRUTE FORCE", msg: "5 failed logins from 123.45.67.89", severity: "critical", time: "2m ago", country: "US" },
              { type: "SUSPICIOUS", msg: "Login from new location: Dhaka, BD", severity: "warning", time: "14m ago", country: "BD" },
              { type: "OAUTH", msg: "LinkedIn token refresh failed (User #42)", severity: "info", time: "1h ago", country: "DE" },
            ].map((threat, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 group hover:border-white/10 transition-all">
                <div className={cn(
                  "p-2 rounded-lg",
                  threat.severity === "critical" ? "bg-red-500/10 text-red-500" :
                  threat.severity === "warning" ? "bg-amber-500/10 text-amber-500" : "bg-blue-500/10 text-blue-500"
                )}>
                  {threat.severity === "critical" ? <ShieldAlert size={18} /> : <AlertTriangle size={18} />}
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/5 text-text-secondary tracking-tight">{threat.type}</span>
                    <span className="text-[10px] text-text-muted">{threat.time}</span>
                  </div>
                  <p className="text-sm text-text-primary">{threat.msg}</p>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="secondary" size="sm" className="h-8 text-[10px] uppercase font-bold">Block</Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8"><Eye size={14} /></Button>
                </div>
              </div>
            ))}
          </div>
          
          <Button variant="ghost" className="mt-4 w-full text-[10px] uppercase font-bold tracking-widest text-text-muted hover:text-white">
            View All Security Events
          </Button>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="glass-card p-6">
        <h3 className="text-sm font-bold uppercase tracking-widest text-text-muted mb-6">Global Active Sessions</h3>
        <div className="space-y-4">
          {[
            { user: "admin@agentflow.ai", role: "admin", ip: "192.168.1.1", location: "Dhaka, BD", device: "Desktop", browser: "Chrome", active: "Just now" },
            { user: "john@email.com", role: "user", ip: "123.45.67.89", location: "New York, US", device: "Mobile", browser: "Safari", active: "5m ago" },
          ].map((session, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 font-bold">
                  {session.user[0].toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{session.user}</span>
                    {session.role === "admin" && (
                      <span className="text-[8px] bg-orange-500/10 text-orange-500 border border-orange-500/20 px-1 rounded uppercase font-bold">Admin</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1 text-[10px] text-text-muted"><Globe size={10} /> {session.location}</span>
                    <span className="flex items-center gap-1 text-[10px] text-text-muted font-mono">{session.ip}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-8">
                <div className="text-right">
                  <div className="flex items-center gap-1.5 text-xs text-text-secondary justify-end">
                    {session.device === "Desktop" ? <Monitor size={12} /> : <Globe size={12} />}
                    {session.browser}
                  </div>
                  <div className="text-[10px] text-text-muted mt-1">Last active: {session.active}</div>
                </div>
                <Button variant="ghost" size="icon" className="text-text-muted hover:text-red-500">
                  <UserX size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
