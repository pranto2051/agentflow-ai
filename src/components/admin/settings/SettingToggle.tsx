"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface SettingToggleProps {
  label: string;
  description?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
  disabled?: boolean;
}

export function SettingToggle({
  label,
  description,
  checked,
  defaultChecked,
  onCheckedChange,
  className,
  disabled = false,
}: SettingToggleProps) {
  return (
    <div className={cn("flex items-center justify-between p-3 rounded-lg bg-orange-500/5 border border-orange-500/10", className)}>
      <div className="space-y-0.5">
        <Label className="text-sm font-medium text-amber-500/80">
          {label}
        </Label>
        {description && (
          <p className="text-[10px] text-amber-500/40">
            {description}
          </p>
        )}
      </div>
      <Switch
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className="data-[state=checked]:bg-orange-500"
      />
    </div>
  );
}
