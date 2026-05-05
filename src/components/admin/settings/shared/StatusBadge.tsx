"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  variant: "success" | "error" | "warning" | "info" | "orange" | "muted";
  children: ReactNode;
  pulse?: boolean;
}

export function StatusBadge({ variant, children, pulse }: StatusBadgeProps) {
  const variants = {
    success: "bg-green-bg text-green border-green-border",
    error: "bg-red-bg text-red border-red-border",
    warning: "bg-amber-bg text-amber border-amber-border",
    info: "bg-cyan-bg text-cyan border-cyan-border",
    orange: "bg-admin-orange-bg text-txt-orange border-admin-orange-border",
    muted: "bg-white/5 text-txt-muted border-white/10",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-[9px] py-[2px] rounded-[20px] border text-[10px] font-medium font-sans whitespace-nowrap",
        variants[variant]
      )}
    >
      {pulse && variant === "success" && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green"></span>
        </span>
      )}
      {children}
    </div>
  );
}
