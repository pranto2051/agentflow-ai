"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cardIn } from "@/lib/animations/admin";
import { cn } from "@/lib/utils";

interface SectionCardProps {
  title: string;
  icon: ReactNode;
  iconColor?: "orange" | "violet" | "green" | "cyan" | "red" | "amber";
  badge?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function SectionCard({
  title,
  icon,
  iconColor = "orange",
  badge,
  children,
  className,
}: SectionCardProps) {
  const iconColors = {
    orange: "bg-orange-500/14 text-[#fb923c]",
    violet: "bg-violet-500/14 text-[#a78bfa]",
    green: "bg-emerald-500/12 text-[#6ee7b7]",
    cyan: "bg-cyan-500/12 text-[#67e8f9]",
    red: "bg-red-500/12 text-[#fca5a5]",
    amber: "bg-amber-500/12 text-[#fcd34d]",
  };

  return (
    <motion.div
      variants={cardIn}
      initial="initial"
      animate="animate"
      className={cn("admin-card", className)}
    >
      <div className="section-header">
        <div className="flex items-center gap-3">
          <div className={cn("w-[26px] h-[26px] rounded-[7px] flex items-center justify-center", iconColors[iconColor])}>
            {icon}
          </div>
          <h3 className="text-[14px] font-bold text-txt-primary font-heading uppercase tracking-tight">
            {title}
          </h3>
        </div>
        {badge && <div>{badge}</div>}
      </div>
      <div className="flex flex-col">{children}</div>
    </motion.div>
  );
}
