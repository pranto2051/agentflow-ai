"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface SettingFieldProps {
  label: string;
  description?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  type?: string;
  className?: string;
  disabled?: boolean;
}

export function SettingField({
  label,
  description,
  placeholder,
  value,
  defaultValue,
  onChange,
  type = "text",
  className,
  disabled = false,
}: SettingFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label className="text-[10px] font-bold text-amber-500/70 uppercase tracking-widest">
        {label}
      </Label>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        className="bg-orange-500/5 border-orange-500/10 focus:border-orange-500/30 text-sm h-10 placeholder:text-amber-500/20"
      />
      {description && (
        <p className="text-[10px] text-amber-500/40 italic">
          {description}
        </p>
      )}
    </div>
  );
}
