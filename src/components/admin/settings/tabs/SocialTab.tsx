"use client";

import { SocialSettings, SocialPlatformConfig } from "@/types/admin-settings";
import { SectionCard } from "../shared/SectionCard";
import { SettingRow } from "../shared/SettingRow";
import { TextInput } from "../shared/TextInput";
import { ToggleSwitch } from "../shared/ToggleSwitch";
import { StatusBadge } from "../shared/StatusBadge";
import { Share2, ExternalLink, RefreshCw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface SocialTabProps {
  settings: SocialSettings;
  onChange: (v: Partial<SocialSettings>) => void;
}

export function SocialTab({ settings, onChange }: SocialTabProps) {
  const [testing, setTesting] = useState<string | null>(null);

  const handleTestConnection = async (platform: string) => {
    setTesting(platform);
    try {
      const res = await fetch("/api/admin/settings/test-social", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`${platform} connection successful`);
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      toast.error(`${platform} test failed: ${String(err)}`);
    } finally {
      setTesting(null);
    }
  };

  const platforms: { id: keyof SocialSettings; label: string; icon: React.ReactNode; color: string }[] = [
    { id: "linkedin", label: "LinkedIn", icon: <Share2 size={18} />, color: "bg-blue-600" },
    { id: "twitter", label: "Twitter/X", icon: <Share2 size={18} />, color: "bg-black" },
    { id: "facebook", label: "Facebook", icon: <Share2 size={18} />, color: "bg-blue-700" },
  ];

  const updatePlatform = (platform: keyof SocialSettings, value: Partial<SocialPlatformConfig>) => {
    onChange({
      [platform]: { ...settings[platform], ...value }
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {platforms.map((p) => (
          <SectionCard
            key={p.id}
            title={`${p.label} API Configuration`}
            icon={p.icon}
            iconColor={p.id === "facebook" ? "violet" : "cyan"}
            badge={
              <div className="flex items-center gap-3">
                <StatusBadge variant={settings[p.id]?.enabled ? "success" : "muted"}>
                  {settings[p.id]?.enabled ? "Active" : "Disabled"}
                </StatusBadge>
                <ToggleSwitch
                  checked={!!settings[p.id]?.enabled}
                  onChange={(v) => updatePlatform(p.id, { enabled: v })}
                  color="green"
                />
              </div>
            }
          >
            <div className={cn("p-5 space-y-4", !settings[p.id]?.enabled && "opacity-50 pointer-events-none transition-opacity")}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Client ID / App ID"
                  value={settings[p.id]?.clientId || ""}
                  onChange={(v) => updatePlatform(p.id, { clientId: v })}
                  placeholder={`Enter ${p.label} Client ID`}
                />
                <TextInput
                  label="Client Secret"
                  type="password"
                  value={settings[p.id]?.clientSecret || ""}
                  onChange={(v) => updatePlatform(p.id, { clientSecret: v })}
                  placeholder={`Enter ${p.label} Client Secret`}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-txt-muted uppercase tracking-wider">
                    Redirect URI
                  </label>
                  <div className="bg-black/20 border border-white/5 rounded-[10px] px-3 py-2 text-[12px] text-txt-muted font-mono flex items-center justify-between">
                    <span>{`https://agentflow.ai/api/auth/callback/${p.id}`}</span>
                    <ExternalLink size={12} className="opacity-40" />
                  </div>
                </div>

                <div className="flex flex-col gap-2 justify-end">
                  <button
                    onClick={() => handleTestConnection(p.id)}
                    disabled={testing === p.id || !settings[p.id]?.clientId}
                    className="h-10 bg-white/5 border border-white/10 hover:bg-white/10 rounded-[10px] flex items-center justify-center gap-2 text-[12px] font-bold uppercase tracking-widest text-txt-primary transition-all duration-200 disabled:opacity-40"
                  >
                    {testing === p.id ? (
                      <RefreshCw size={14} className="animate-spin" />
                    ) : (
                      <RefreshCw size={14} />
                    )}
                    <span>Test Connection</span>
                  </button>
                </div>
              </div>

              {settings[p.id]?.lastTestAt && (
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-txt-muted uppercase tracking-wider">Status:</span>
                    <StatusBadge variant={settings[p.id]?.lastTestStatus === "success" ? "success" : "error"}>
                      {settings[p.id]?.lastTestStatus === "success" ? "Success" : "Failed"}
                    </StatusBadge>
                  </div>
                  <span className="text-[10px] text-txt-muted">
                    Last tested: {new Date(settings[p.id]!.lastTestAt!).toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </SectionCard>
        ))}
      </div>
    </div>
  );
}
