"use client";

import { GeneralSettings } from "@/types/admin-settings";
import { SectionCard } from "../shared/SectionCard";
import { SettingRow } from "../shared/SettingRow";
import { TextInput } from "../shared/TextInput";
import { ToggleSwitch } from "../shared/ToggleSwitch";
import { StatusBadge } from "../shared/StatusBadge";
import { Globe, ToggleRight, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GeneralTabProps {
  settings: GeneralSettings;
  onChange: (v: Partial<GeneralSettings>) => void;
}

export function GeneralTab({ settings, onChange }: GeneralTabProps) {
  const timezones = [
    "UTC-12", "UTC-11", "UTC-10", "UTC-9", "UTC-8", "UTC-7", "UTC-6", "UTC-5", 
    "UTC-4", "UTC-3", "UTC-2", "UTC-1", "UTC+0", "UTC+1", "UTC+2", "UTC+3", 
    "UTC+4", "UTC+5", "UTC+5:30", "UTC+6", "UTC+7", "UTC+8", "UTC+9", "UTC+10", 
    "UTC+11", "UTC+12"
  ];

  return (
    <div className="space-y-6">
      <SectionCard title="Platform Identity" icon={<Globe size={16} />} iconColor="orange">
        <SettingRow label="Platform Name" description="The main name of your AI SaaS platform">
          <TextInput
            value={settings.platformName || ""}
            onChange={(v) => onChange({ platformName: v })}
            width="200px"
          />
        </SettingRow>
        <SettingRow label="Support Email" description="Used for system emails and support links">
          <TextInput
            type="email"
            value={settings.supportEmail || ""}
            onChange={(v) => onChange({ supportEmail: v })}
            width="220px"
          />
        </SettingRow>
        <SettingRow label="Platform URL" description="The public base URL of your application">
          <TextInput
            value={settings.platformUrl || ""}
            onChange={(v) => onChange({ platformUrl: v })}
            width="240px"
            copyable
          />
        </SettingRow>
        <SettingRow label="Default Timezone" description="Global timezone for schedules and logs">
          <select
            value={settings.defaultTimezone || "UTC+0"}
            onChange={(e) => onChange({ defaultTimezone: e.target.value })}
            className="bg-white/5 border border-white/10 rounded-[8px] px-3 py-1.5 text-[12px] text-txt-primary outline-none focus:border-admin-orange"
          >
            {timezones.map((tz) => (
              <option key={tz} value={tz} className="bg-bg-surface">
                {tz}
              </option>
            ))}
          </select>
        </SettingRow>
      </SectionCard>

      <SectionCard
        title="Feature Flags"
        icon={<ToggleRight size={16} />}
        iconColor="orange"
        badge={<StatusBadge variant="orange">Live — applies instantly</StatusBadge>}
      >
        <SettingRow label="User Signups" description="Allow new users to create accounts">
          <ToggleSwitch
            checked={!!settings.signupsEnabled}
            onChange={(v) => onChange({ signupsEnabled: v })}
            color="green"
          />
        </SettingRow>
        <SettingRow label="Google OAuth Login" description="Enable login with Google accounts">
          <ToggleSwitch
            checked={!!settings.googleOAuthEnabled}
            onChange={(v) => onChange({ googleOAuthEnabled: v })}
            color="green"
          />
        </SettingRow>
        <SettingRow label="GitHub OAuth Login" description="Enable login with GitHub accounts">
          <ToggleSwitch
            checked={!!settings.githubOAuthEnabled}
            onChange={(v) => onChange({ githubOAuthEnabled: v })}
            color="green"
          />
        </SettingRow>
        <SettingRow label="AI Assistant (global)" description="Main switch for all AI-related features">
          <ToggleSwitch
            checked={!!settings.aiAssistantEnabled}
            onChange={(v) => onChange({ aiAssistantEnabled: v })}
            color="orange"
          />
        </SettingRow>
        <SettingRow label="Analytics Dashboard" description="Enable platform-wide usage analytics">
          <ToggleSwitch
            checked={!!settings.analyticsEnabled}
            onChange={(v) => onChange({ analyticsEnabled: v })}
            color="green"
          />
        </SettingRow>
        <SettingRow label="Maintenance Mode" description="Disable public access and show banner">
          <ToggleSwitch
            checked={!!settings.maintenanceMode}
            onChange={(v) => onChange({ maintenanceMode: v })}
            color="orange"
          />
        </SettingRow>
      </SectionCard>

      <AnimatePresence>
        {settings.maintenanceMode && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <SectionCard
              title="Maintenance Message"
              icon={<AlertTriangle size={16} />}
              iconColor="amber"
              badge={<StatusBadge variant="warning">All users see this</StatusBadge>}
            >
              <div className="p-5 flex flex-col gap-4">
                <textarea
                  value={settings.maintenanceMessage || ""}
                  onChange={(e) => onChange({ maintenanceMessage: e.target.value })}
                  placeholder="Enter maintenance message..."
                  className="w-full h-20 bg-white/5 border border-white/10 rounded-[10px] p-3 text-[13px] text-txt-primary placeholder:text-txt-muted outline-none focus:border-amber-500/50 resize-none"
                />
                
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-amber-500/50 uppercase tracking-widest">
                    Preview Banner
                  </span>
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-[8px] p-3 text-[12px] text-amber-200">
                    <div className="flex items-center gap-2">
                      <AlertTriangle size={14} className="text-amber-500" />
                      <span>{settings.maintenanceMessage || "No message set"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </SectionCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
