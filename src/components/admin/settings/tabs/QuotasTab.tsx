"use client";

import { QuotaSettings, PlanQuota } from "@/types/admin-settings";
import { SectionCard } from "../shared/SectionCard";
import { SettingRow } from "../shared/SettingRow";
import { TextInput } from "../shared/TextInput";
import { ToggleSwitch } from "../shared/ToggleSwitch";
import { StatusBadge } from "../shared/StatusBadge";
import { Layers, Star, UserCog, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuotasTabProps {
  settings: QuotaSettings;
  onChange: (v: Partial<QuotaSettings>) => void;
}

export function QuotasTab({ settings, onChange }: QuotasTabProps) {
  const features = [
    { key: "maxTasks", label: "Max Tasks" },
    { key: "maxGenerationsMonth", label: "AI Generations/mo" },
    { key: "maxSocialAccounts", label: "Social Accounts" },
    { key: "logRetentionDays", label: "Log Retention (days)" },
    { key: "storageMb", label: "Storage (MB)" },
    { key: "apiRatePerHour", label: "API Requests/hour" },
  ];

  const plans: (keyof QuotaSettings["plans"])[] = ["free", "pro", "team"];

  const updatePlanQuota = (plan: keyof QuotaSettings["plans"], key: keyof PlanQuota, value: number) => {
    onChange({
      plans: {
        ...settings.plans,
        [plan]: {
          ...settings.plans[plan],
          [key]: value
        }
      }
    });
  };

  return (
    <div className="space-y-6">
      <SectionCard
        title="Plan Feature Limits"
        icon={<Layers size={16} />}
        iconColor="orange"
        badge={<StatusBadge variant="muted">Edit any cell — saves on Save</StatusBadge>}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5">
                <th className="p-4 text-[11px] font-bold text-txt-muted uppercase tracking-wider w-[160px]">Feature</th>
                <th className="p-4 text-[11px] font-bold text-green uppercase tracking-wider text-center">Free</th>
                <th className="p-4 text-[11px] font-bold text-violet uppercase tracking-wider text-center">Pro</th>
                <th className="p-4 text-[11px] font-bold text-cyan uppercase tracking-wider text-center">Team</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.02]">
              {features.map((f) => (
                <tr key={f.key} className="hover:bg-admin-orange/5 transition-colors">
                  <td className="p-4 text-[12px] text-txt-secondary font-medium">{f.label}</td>
                  {plans.map((p) => (
                    <td key={p} className="p-4 text-center">
                      <input
                        type="number"
                        value={settings.plans?.[p]?.[f.key as keyof PlanQuota] ?? 0}
                        onChange={(e) => updatePlanQuota(p, f.key as keyof PlanQuota, Number(e.target.value))}
                        className="w-20 h-8 bg-black/40 border border-white/5 rounded-[6px] text-center text-[12px] text-txt-primary outline-none focus:border-admin-orange/50"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <SectionCard title="Default Plan" icon={<Star size={16} />} iconColor="cyan">
        <SettingRow label="Assign plan on signup" description="Default tier for new registrations">
          <div className="flex gap-2">
            {plans.map((p) => (
              <button
                key={p}
                onClick={() => onChange({ defaultPlan: p })}
                className={cn(
                  "px-4 py-2 rounded-[8px] border text-[11px] font-bold transition-all duration-200 uppercase tracking-widest",
                  settings.defaultPlan === p
                    ? "bg-admin-orange-bg border-admin-orange text-txt-orange"
                    : "bg-white/5 border-white/10 text-txt-muted hover:border-white/20"
                )}
              >
                {p}
              </button>
            ))}
          </div>
        </SettingRow>
        <SettingRow label="Allow self-upgrade" description="Users can change their plan from settings">
          <ToggleSwitch
            checked={settings.allowSelfUpgrade}
            onChange={(v) => onChange({ allowSelfUpgrade: v })}
            color="green"
          />
        </SettingRow>
      </SectionCard>

      <SectionCard title="Per-User Custom Quota Override" icon={<UserCog size={16} />} iconColor="amber">
        <div className="p-5 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-txt-muted" size={14} />
            <input
              type="text"
              placeholder="Search user by email to set custom limits..."
              className="w-full bg-white/5 border border-white/10 rounded-[10px] pl-10 pr-4 py-2.5 text-[13px] text-txt-primary placeholder:text-txt-muted outline-none focus:border-admin-orange/50"
            />
          </div>
          
          <div className="p-10 border border-dashed border-white/10 rounded-[14px] flex flex-col items-center justify-center gap-2 text-center">
            <UserCog size={24} className="text-txt-muted opacity-20" />
            <p className="text-[12px] text-txt-muted">
              Select a user to configure individual overrides.<br/>
              <span className="text-[10px] opacity-60 italic">Bypasses global plan limits for specific accounts.</span>
            </p>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
