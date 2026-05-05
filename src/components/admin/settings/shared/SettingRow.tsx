"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SettingRowProps {
  label: string;
  description?: string;
  children: ReactNode;
  danger?: boolean;
  className?: string;
}

export function SettingRow({
  label,
  description,
  children,
  danger,
  className,
}: SettingRowProps) {
  return (
    <div
      className={cn(
        "setting-row",
        danger && "border-l-2 border-l-red-500/40",
        className
      )}
    >
      <div className="flex flex-col gap-0.5 max-w-[70%]">
        <span className="text-[13px] font-medium text-txt-primary font-sans">
          {label}
        </span>
        {description && (
          <span className="text-[11px] text-txt-muted font-sans leading-tight">
            {description}
          </span>
        )}
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  );
}
