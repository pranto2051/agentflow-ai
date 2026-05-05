"use client";

import { AdvancedSettings } from "@/types/admin-settings";
import { SectionCard } from "../shared/SectionCard";
import { SettingRow } from "../shared/SettingRow";
import { ToggleSwitch } from "../shared/ToggleSwitch";
import { StatusBadge } from "../shared/StatusBadge";
import { TriangleAlert, Terminal, Activity, ShieldX } from "lucide-react";

interface AdvancedTabProps {
  settings: AdvancedSettings;
  onChange: (v: Partial<AdvancedSettings>) => void;
}

export function AdvancedTab({ settings, onChange }: AdvancedTabProps) {
  return (
    <div className="space-y-6">
      <SectionCard
        title="Developer Controls"
        icon={<Terminal size={16} />}
        iconColor="red"
        badge={<StatusBadge variant="error">High Risk — use with caution</StatusBadge>}
      >
        <SettingRow label="Debug Logging" description="Enable verbose logs for all system events">
          <ToggleSwitch
            checked={!!settings.debugLogging}
            onChange={(v) => onChange({ debugLogging: v })}
            color="orange"
          />
        </SettingRow>
        <SettingRow label="Show API Timings" description="Display latency info in the user dashboard">
          <ToggleSwitch
            checked={!!settings.showApiTimings}
            onChange={(v) => onChange({ showApiTimings: v })}
            color="orange"
          />
        </SettingRow>
        <SettingRow
          label="Disable Rate Limiting"
          description="Completely turn off API rate protection (DANGEROUS)"
          danger
        >
          <ToggleSwitch
            checked={!!settings.disableRateLimiting}
            onChange={(v) => onChange({ disableRateLimiting: v })}
            color="orange"
          />
        </SettingRow>
      </SectionCard>

      <SectionCard title="System Performance" icon={<Activity size={16} />} iconColor="orange">
        <div className="p-6 flex flex-col items-center justify-center text-center gap-3">
          <Activity size={32} className="text-txt-muted opacity-20" />
          <div className="flex flex-col">
            <span className="text-[13px] font-bold text-txt-primary uppercase tracking-tight">System Monitor</span>
            <span className="text-[11px] text-txt-muted max-w-[300px]">
              Advanced telemetry and performance monitoring tools are currently in development.
            </span>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
