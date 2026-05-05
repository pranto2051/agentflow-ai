"use client";

import { EmailSettings } from "@/types/admin-settings";
import { SectionCard } from "../shared/SectionCard";
import { SettingRow } from "../shared/SettingRow";
import { TextInput } from "../shared/TextInput";
import { ToggleSwitch } from "../shared/ToggleSwitch";
import { StatusBadge } from "../shared/StatusBadge";
import { Mail, ShieldAlert, Bell, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface EmailTabProps {
  settings: EmailSettings;
  onChange: (v: Partial<EmailSettings>) => void;
}

export function EmailTab({ settings, onChange }: EmailTabProps) {
  const [isTesting, setIsTesting] = useState(false);
  const [testEmail, setTestEmail] = useState("");

  const handleTestEmail = async () => {
    if (!testEmail) {
      toast.error("Please enter a test email address");
      return;
    }
    setIsTesting(true);
    try {
      const res = await fetch("/api/admin/settings/test-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toEmail: testEmail }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Test email sent successfully");
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      toast.error(`Failed to send test email: ${String(err)}`);
    } finally {
      setIsTesting(false);
    }
  };

  const providers = [
    { id: "resend", label: "Resend", description: "Best for simplicity" },
    { id: "smtp", label: "SMTP", description: "Standard protocol" },
    { id: "sendgrid", label: "SendGrid", description: "Enterprise ready" },
  ];

  return (
    <div className="space-y-6">
      <SectionCard
        title="Email Provider"
        icon={<Mail size={16} />}
        iconColor="cyan"
        badge={<StatusBadge variant="success" pulse>Connected</StatusBadge>}
      >
        <SettingRow label="Provider" description="Service used to deliver system emails">
          <div className="flex gap-2">
            {providers.map((p) => (
              <button
                key={p.id}
                onClick={() => onChange({ provider: p.id as EmailSettings['provider'] })}
                className={cn(
                  "px-4 py-2 rounded-[8px] border text-[11px] font-bold transition-all duration-200 flex flex-col items-center gap-0.5",
                  settings.provider === p.id
                    ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
                    : "bg-white/5 border-white/10 text-txt-muted hover:border-white/20"
                )}
              >
                <span>{p.label}</span>
              </button>
            ))}
          </div>
        </SettingRow>

        <SettingRow label="Sender Name" description="How the email appears in the inbox">
          <TextInput
            value={settings.fromName}
            onChange={(v) => onChange({ fromName: v })}
            width="200px"
          />
        </SettingRow>

        <SettingRow label="Sender Email" description="The 'from' address (must be verified)">
          <TextInput
            type="email"
            value={settings.fromEmail}
            onChange={(v) => onChange({ fromEmail: v })}
            width="220px"
          />
        </SettingRow>

        {settings.provider === "resend" && (
          <SettingRow label="Resend API Key" description="Get this from resend.com dashboard">
            <TextInput
              type="password"
              value={settings.resendApiKey || ""}
              onChange={(v) => onChange({ resendApiKey: v })}
              width="300px"
            />
          </SettingRow>
        )}

        {(settings.provider === "smtp") && (
          <div className="p-4 bg-white/[0.02] border-y border-white/5 space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <TextInput
                label="SMTP Host"
                value={settings.smtpHost || ""}
                onChange={(v) => onChange({ smtpHost: v })}
              />
              <TextInput
                label="SMTP Port"
                type="number"
                value={String(settings.smtpPort || "")}
                onChange={(v) => onChange({ smtpPort: Number(v) })}
              />
              <TextInput
                label="SMTP User"
                value={settings.smtpUser || ""}
                onChange={(v) => onChange({ smtpUser: v })}
              />
              <TextInput
                label="SMTP Password"
                type="password"
                value={settings.smtpPassword || ""}
                onChange={(v) => onChange({ smtpPassword: v })}
              />
            </div>
          </div>
        )}
      </SectionCard>

      <SectionCard title="Admin Notifications" icon={<Bell size={16} />} iconColor="cyan">
        <div className="divide-y divide-white/5">
          {Object.entries(settings.notifications || {}).map(([key, prefs]) => (
            <div key={key} className="setting-row">
              <div className="flex flex-col gap-0.5">
                <span className="text-[12px] font-medium text-txt-primary uppercase tracking-tight">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <span className="text-[10px] text-txt-muted">
                  Alert admin when this event occurs
                </span>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-txt-muted uppercase">Email</span>
                  <ToggleSwitch
                    checked={prefs.email}
                    onChange={(v) => onChange({
                      notifications: {
                        ...settings.notifications,
                        [key]: { ...prefs, email: v }
                      }
                    })}
                    color="green"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-txt-muted uppercase">In-App</span>
                  <ToggleSwitch
                    checked={prefs.inApp}
                    onChange={(v) => onChange({
                      notifications: {
                        ...settings.notifications,
                        [key]: { ...prefs, inApp: v }
                      }
                    })}
                    color="violet"
                  />
                </div>
              </div>
            </div>
          ))}
          {(!settings.notifications || Object.keys(settings.notifications).length === 0) && (
            <div className="p-8 text-center text-[11px] text-txt-muted uppercase tracking-widest">
              No notification preferences configured
            </div>
          )}
        </div>
      </SectionCard>

      <SectionCard title="Email Delivery Test" icon={<Send size={16} />} iconColor="cyan">
        <div className="p-5 flex gap-3">
          <TextInput
            placeholder="Enter recipient email..."
            value={testEmail}
            onChange={setTestEmail}
            width="100%"
          />
          <button
            onClick={handleTestEmail}
            disabled={isTesting}
            className="px-6 h-10 bg-cyan-600 hover:bg-cyan-500 text-white rounded-[10px] text-[12px] font-bold uppercase tracking-widest disabled:opacity-50 transition-all duration-200 flex items-center gap-2 whitespace-nowrap"
          >
            {isTesting ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Send size={14} />
            )}
            <span>Send Test</span>
          </button>
        </div>
      </SectionCard>
    </div>
  );
}
