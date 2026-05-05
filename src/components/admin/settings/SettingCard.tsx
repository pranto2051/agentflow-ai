"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SettingCardProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
}

export function SettingCard({
  title,
  description,
  icon: Icon,
  children,
  className,
  footer,
}: SettingCardProps) {
  return (
    <div className={cn("glass-card p-6 border-amber-900/20 h-full flex flex-col", className)}>
      <div className="flex items-start justify-between mb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            {Icon && <Icon className="h-4 w-4 text-orange-500" />}
            <h3 className="text-sm font-semibold font-heading uppercase tracking-wider text-orange-400">
              {title}
            </h3>
          </div>
          {description && (
            <p className="text-xs text-amber-500/50">
              {description}
            </p>
          )}
        </div>
      </div>

      <div className="grow space-y-4">
        {children}
      </div>

      {footer && (
        <div className="mt-8 pt-6 border-t border-amber-900/10 flex items-center justify-end gap-3">
          {footer}
        </div>
      )}
    </div>
  );
}
