"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SettingMetaProps {
  items: {
    label: string;
    icon?: LucideIcon;
  }[];
  className?: string;
}

export function SettingMeta({ items, className }: SettingMetaProps) {
  return (
    <ul className={cn("flex flex-wrap gap-x-6 gap-y-2", className)}>
      {items.map((item, i) => (
        <li key={i} className="flex items-center gap-2 text-[11px] text-amber-500/50 uppercase tracking-wider font-medium">
          {item.icon && <item.icon className="h-3 w-3" />}
          {item.label}
        </li>
      ))}
    </ul>
  );
}

interface SettingTagProps {
  label: string;
  onClick?: () => void;
  className?: string;
}

export function SettingTag({ label, onClick, className }: SettingTagProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-[10px] px-2 py-0.5 rounded border border-orange-500/20 bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 transition-colors uppercase font-bold tracking-tighter",
        className
      )}
    >
      {label}
    </button>
  );
}
