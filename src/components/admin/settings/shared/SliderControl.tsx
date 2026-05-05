"use client";

import { cn } from "@/lib/utils";

interface SliderControlProps {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (v: number) => void;
  formatValue?: (v: number) => string;
  accentColor?: string;
  showMinMax?: boolean;
}

export function SliderControl({
  min,
  max,
  step = 1,
  value = 0,
  onChange,
  formatValue = (v) => (v ?? 0).toString(),
  accentColor = "var(--admin-orange)",
  showMinMax = false,
}: SliderControlProps) {
  return (
    <div className="flex flex-col gap-1 w-full max-w-[200px]">
      <div className="flex items-center gap-3">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value ?? min}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{ accentColor }}
          className="flex-1 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
        />
        <span className="text-[12px] font-mono text-txt-orange min-w-[44px] text-right">
          {formatValue(value ?? min)}
        </span>
      </div>
      {showMinMax && (
        <div className="flex justify-between text-[10px] text-txt-muted px-0.5">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      )}
    </div>
  );
}
