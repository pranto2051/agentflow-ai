"use client";

import { Zap, Loader2, CheckCircle2, XCircle, Timer } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatPillProps {
  label: string;
  value: string | number;
  icon: any;
  color: string;
  animate?: boolean;
}

function StatPill({ label, value, icon: Icon, color, animate }: StatPillProps) {
  return (
    <div className={cn(
      "glass-card p-4 flex items-center gap-4 min-w-[180px] border-t-2 transition-all hover:translate-y-[-2px]",
      color === "orange" ? "border-t-orange-500" :
      color === "cyan" ? "border-t-cyan-500" :
      color === "green" ? "border-t-emerald-500" :
      color === "red" ? "border-t-red-500" : "border-t-amber-500"
    )}>
      <div className={cn(
        "p-2 rounded-lg bg-opacity-10",
        color === "orange" ? "bg-orange-500 text-orange-500" :
        color === "cyan" ? "bg-cyan-500 text-cyan-500" :
        color === "green" ? "bg-emerald-500 text-emerald-500" :
        color === "red" ? "bg-red-500 text-red-500" : "bg-amber-500 text-amber-500"
      )}>
        <Icon className={cn("h-5 w-5", animate && "animate-spin")} />
      </div>
      <div>
        <div className="text-[28px] font-bold font-heading leading-tight tracking-tight text-white">
          {value}
        </div>
        <div className="text-[11px] uppercase tracking-wider text-text-muted font-bold">
          {label}
        </div>
      </div>
    </div>
  );
}

export default function AutomationStatsBar() {
  return (
    <div className="flex flex-wrap gap-4">
      <StatPill label="Total Today" value="1,284" icon={Zap} color="orange" />
      <StatPill label="Running Now" value="12" icon={Loader2} color="cyan" animate />
      <StatPill label="Succeeded" value="1,142" icon={CheckCircle2} color="green" />
      <StatPill label="Failed" value="47" icon={XCircle} color="red" />
      <StatPill label="Avg Duration" value="2.4s" icon={Timer} color="amber" />
    </div>
  );
}
