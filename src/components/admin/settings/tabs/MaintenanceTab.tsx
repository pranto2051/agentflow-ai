"use client";

import { MaintenanceSettings } from "@/types/admin-settings";
import { SectionCard } from "../shared/SectionCard";
import { SettingRow } from "../shared/SettingRow";
import { SliderControl } from "../shared/SliderControl";
import { ToggleSwitch } from "../shared/ToggleSwitch";
import { StatusBadge } from "../shared/StatusBadge";
import { TextInput } from "../shared/TextInput";
import { DangerZoneCard } from "../shared/DangerZoneCard";
import { Wrench, Trash2, Database, ShieldAlert, History } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface MaintenanceTabProps {
  settings: MaintenanceSettings;
  onChange: (v: Partial<MaintenanceSettings>) => void;
}

export function MaintenanceTab({ settings, onChange }: MaintenanceTabProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleMaintenanceAction = async (action: string) => {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/admin/settings/maintenance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Action "${action}" completed successfully`);
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      toast.error(`Failed to perform action: ${String(err)}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <SectionCard title="System Retention" icon={<History size={16} />} iconColor="orange">
        <SettingRow label="Log Retention (Days)" description="Automatically delete automation logs older than this">
          <SliderControl
            min={7}
            max={365}
            value={settings.logRetentionDays}
            onChange={(v) => onChange({ logRetentionDays: v })}
            formatValue={(v) => `${v} days`}
          />
        </SettingRow>
      </SectionCard>

      <SectionCard title="System Tools" icon={<Wrench size={16} />} iconColor="orange">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <button
            onClick={() => handleMaintenanceAction("clear-logs")}
            disabled={isProcessing}
            className="p-4 bg-white/5 border border-white/10 rounded-[12px] flex flex-col items-center gap-2 hover:bg-white/10 transition-all text-center"
          >
            <Trash2 size={20} className="text-txt-muted" />
            <div className="flex flex-col">
              <span className="text-[12px] font-bold text-txt-primary uppercase tracking-tight">Clear Old Logs</span>
              <span className="text-[10px] text-txt-muted">Removes logs beyond retention period</span>
            </div>
          </button>

          <button
            onClick={() => handleMaintenanceAction("recalculate-analytics")}
            disabled={isProcessing}
            className="p-4 bg-white/5 border border-white/10 rounded-[12px] flex flex-col items-center gap-2 hover:bg-white/10 transition-all text-center"
          >
            <Database size={20} className="text-txt-muted" />
            <div className="flex flex-col">
              <span className="text-[12px] font-bold text-txt-primary uppercase tracking-tight">Rebuild Analytics</span>
              <span className="text-[10px] text-txt-muted">Re-aggregate all usage statistics</span>
            </div>
          </button>
        </div>
      </SectionCard>

      <SectionCard title="Danger Zone" icon={<ShieldAlert size={16} />} iconColor="red">
        <div className="p-4 space-y-4">
          <DangerZoneCard
            title="Wipe All Automation Logs"
            description="This will permanently delete every log entry from the automation_logs table. This action cannot be undone."
            confirmText="DELETE ALL LOGS"
            buttonLabel="Wipe Logs"
            onConfirm={async () => handleMaintenanceAction("delete-logs")}
          />

          <DangerZoneCard
            title="Reset All Platform Settings"
            description="Restore all configuration (AI, Email, Quotas, etc.) to factory defaults. Your current settings will be lost."
            confirmText="RESET SETTINGS"
            buttonLabel="Reset to Defaults"
            severity="critical"
            onConfirm={async () => handleMaintenanceAction("reset-all-settings")}
          />
        </div>
      </SectionCard>
    </div>
  );
}
