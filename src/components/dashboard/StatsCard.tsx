"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: LucideIcon;
  index: number;
}

const colors = [
  "text-brand-violet-light bg-brand-violet/10 border-brand-violet/20",
  "text-brand-cyan-light bg-brand-cyan/10 border-brand-cyan/20",
  "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  "text-amber-400 bg-amber-500/10 border-amber-500/20",
];

const accents = [
  "bg-brand-violet",
  "bg-brand-cyan",
  "bg-emerald-500",
  "bg-amber-500",
];

export default function StatsCard({ title, value, change, isPositive, icon: Icon, index }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-card p-6 group cursor-pointer relative"
    >
      {/* Top accent line */}
      <div className={cn(
        "absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity",
        `bg-gradient-to-r from-transparent via-${accents[index % 4].split('-')[1]} to-transparent`
      )} />

      <div className="flex items-start justify-between mb-4">
        <div className={cn("p-2.5 rounded-xl border transition-transform group-hover:scale-110", colors[index % 4])}>
          <Icon className="h-5 w-5" />
        </div>
        <div className={cn(
          "text-[10px] font-bold px-2 py-0.5 rounded-full",
          isPositive ? "text-emerald-400 bg-emerald-500/10" : "text-red-400 bg-red-500/10"
        )}>
          {isPositive ? "↑" : "↓"} {change}
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold font-heading mb-1">{value}</h3>
        <p className="text-[10px] text-text-muted uppercase tracking-widest font-medium">{title}</p>
      </div>
    </motion.div>
  );
}
