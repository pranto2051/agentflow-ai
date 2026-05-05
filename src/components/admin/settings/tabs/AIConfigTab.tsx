"use client";

import { AISettings } from "@/types/admin-settings";
import { SectionCard } from "../shared/SectionCard";
import { SettingRow } from "../shared/SettingRow";
import { SliderControl } from "../shared/SliderControl";
import { TextInput } from "../shared/TextInput";
import { ToggleSwitch } from "../shared/ToggleSwitch";
import { StatusBadge } from "../shared/StatusBadge";
import { Brain, Gauge, FileCode2, Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";

interface AIConfigTabProps {
  settings: AISettings;
  onChange: (v: Partial<AISettings>) => void;
}

export function AIConfigTab({ settings, onChange }: AIConfigTabProps) {
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ content: string; tokens: number; latency: number } | null>(null);

  const handleTestAI = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const res = await fetch("/api/admin/settings/test-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: "Hello, tell me a joke about AI." }),
      });
      const data = await res.json();
      if (data.success) {
        setTestResult({ content: data.content, tokens: data.tokensUsed, latency: data.latencyMs });
        toast.success("AI Test successful");
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      toast.error(`AI Test failed: ${String(err)}`);
    } finally {
      setIsTesting(false);
    }
  };

  const models = [
    { id: "gemini-1.5-flash", label: "Gemini 1.5 Flash", status: "Free", color: "cyan" },
    { id: "gemini-1.5-pro", label: "Gemini 1.5 Pro", status: "Paid", color: "violet" },
    { id: "gemini-2.0-flash", label: "Gemini 2.0 Flash", status: "Beta", color: "orange" },
  ];

  return (
    <div className="space-y-6">
      <SectionCard
        title="Model & Generation"
        icon={<Brain size={16} />}
        iconColor="violet"
        badge={
          <StatusBadge variant="info">
            {models.find(m => m.id === settings.model)?.label} — {models.find(m => m.id === settings.model)?.status}
          </StatusBadge>
        }
      >
        <SettingRow label="AI Model" description="Select the primary model for generations">
          <div className="flex gap-2">
            {models.map((m) => (
              <button
                key={m.id}
                onClick={() => onChange({ model: m.id as AISettings['model'] })}
                className={cn(
                  "px-3 py-2 rounded-[8px] border text-[11px] font-bold transition-all duration-200 flex flex-col items-start gap-0.5 min-w-[120px]",
                  settings.model === m.id
                    ? "bg-admin-orange-bg border-admin-orange text-txt-orange shadow-lg shadow-orange-900/10"
                    : "bg-white/5 border-white/10 text-txt-muted hover:border-white/20"
                )}
              >
                <div className="flex items-center justify-between w-full">
                  <span>{m.label}</span>
                  {settings.model === m.id && <Check size={12} />}
                </div>
                <span className={cn(
                  "text-[9px] uppercase tracking-wider opacity-60",
                  settings.model === m.id ? "text-txt-orange" : "text-txt-muted"
                )}>
                  {m.status}
                </span>
              </button>
            ))}
          </div>
        </SettingRow>

        <SettingRow label="Max Output Tokens" description="Upper limit for AI response length">
          <SliderControl
            min={256}
            max={4096}
            step={64}
            value={settings.maxOutputTokens}
            onChange={(v) => onChange({ maxOutputTokens: v })}
            formatValue={(v) => `${v} tokens`}
          />
        </SettingRow>

        <SettingRow label="Temperature" description="0 = focused & predictable · 1 = creative & varied">
          <div className="flex flex-col gap-1">
            <SliderControl
              min={0}
              max={1}
              step={0.1}
              value={settings.temperature}
              onChange={(v) => onChange({ temperature: v })}
            />
            <div className="flex justify-between text-[9px] text-txt-muted uppercase tracking-tighter px-1">
              <span>Precise</span>
              <span>Balanced</span>
              <span>Creative</span>
            </div>
          </div>
        </SettingRow>

        <SettingRow label="Top-P (Nucleus)" description="Diversity control via cumulative probability">
          <SliderControl
            min={0}
            max={1}
            step={0.1}
            value={settings.topP}
            onChange={(v) => onChange({ topP: v })}
          />
        </SettingRow>
      </SectionCard>

      <SectionCard title="Rate Limits" icon={<Gauge size={16} />} iconColor="amber">
        <div className="grid grid-cols-2">
          <SettingRow label="Daily limit (Free users)">
            <div className="flex items-center gap-2">
              <TextInput
                type="number"
                value={String(settings.dailyLimitFree ?? 0)}
                onChange={(v) => onChange({ dailyLimitFree: Number(v) })}
                width="80px"
              />
              <span className="text-[10px] text-txt-muted">/day</span>
            </div>
          </SettingRow>
          <SettingRow label="Monthly limit (Free users)">
            <div className="flex items-center gap-2">
              <TextInput
                type="number"
                value={String(settings.monthlyLimitFree ?? 0)}
                onChange={(v) => onChange({ monthlyLimitFree: Number(v) })}
                width="80px"
              />
              <span className="text-[10px] text-txt-muted">/month</span>
            </div>
          </SettingRow>
          <SettingRow label="Daily limit (Pro users)">
            <TextInput
              type="number"
              value={String(settings.dailyLimitPro ?? 0)}
              onChange={(v) => onChange({ dailyLimitPro: Number(v) })}
              width="80px"
            />
          </SettingRow>
          <SettingRow label="Monthly limit (Pro users)">
            <TextInput
              type="number"
              value={String(settings.monthlyLimitPro ?? 0)}
              onChange={(v) => onChange({ monthlyLimitPro: Number(v) })}
              width="80px"
            />
          </SettingRow>
        </div>
        <SettingRow label="Cooldown between requests" description="Prevents rapid-fire API spam">
          <SliderControl
            min={0}
            max={60}
            value={settings.cooldownSeconds ?? 0}
            onChange={(v) => onChange({ cooldownSeconds: v })}
            formatValue={(v) => `${v}s`}
          />
        </SettingRow>
        <SettingRow label="Admin bypasses rate limits">
          <ToggleSwitch
            checked={!!settings.adminBypassRateLimit}
            onChange={(v) => onChange({ adminBypassRateLimit: v })}
            color="orange"
          />
        </SettingRow>
        <SettingRow label="Block profanity in output">
          <ToggleSwitch
            checked={!!settings.blockProfanity}
            onChange={(v) => onChange({ blockProfanity: v })}
            color="green"
          />
        </SettingRow>
      </SectionCard>

      <SectionCard title="Prompt Templates" icon={<FileCode2 size={16} />} iconColor="violet">
        <div className="p-4 space-y-4">
          {[
            { id: "promptLinkedIn", label: "LinkedIn Post Template", value: settings.promptLinkedIn ?? "" },
            { id: "promptTwitter", label: "Twitter/X Thread Template", value: settings.promptTwitter ?? "" },
            { id: "promptFacebook", label: "Facebook Post Template", value: settings.promptFacebook ?? "" },
          ].map((prompt) => (
            <div key={prompt.id} className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <span className="text-[11px] font-bold text-txt-muted uppercase tracking-wider">
                  {prompt.label}
                </span>
                <button
                  onClick={() => onChange({ [prompt.id]: "" })}
                  className="text-[10px] text-txt-orange hover:underline"
                >
                  Reset to Default
                </button>
              </div>
              <textarea
                value={prompt.value}
                onChange={(e) => onChange({ [prompt.id]: e.target.value })}
                className="w-full h-24 bg-[#050508] border border-white/5 rounded-[10px] p-3 text-[12px] text-violet-400 font-mono outline-none focus:border-violet-500/50 resize-y"
              />
            </div>
          ))}

          <button
            onClick={handleTestAI}
            disabled={isTesting}
            className="w-full h-11 bg-admin-orange/10 border border-admin-orange/20 rounded-[10px] flex items-center justify-center gap-2 text-txt-orange text-[12px] font-bold uppercase tracking-widest hover:bg-admin-orange/20 transition-all duration-200"
          >
            {isTesting ? (
              <>
                <div className="w-4 h-4 border-2 border-txt-orange/30 border-t-txt-orange rounded-full animate-spin" />
                <span>Testing Configuration...</span>
              </>
            ) : (
              <>
                <Sparkles size={14} />
                <span>Test AI Configuration</span>
              </>
            )}
          </button>

          {testResult && (
            <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-[10px] space-y-2 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-txt-primary uppercase tracking-wider">
                  Test Result
                </span>
                <span className="text-[10px] text-txt-muted">
                  {testResult.tokens} tokens · {testResult.latency}ms
                </span>
              </div>
              <div className="p-3 bg-black/40 rounded-[8px] text-[12px] text-txt-secondary leading-relaxed font-sans">
                {testResult.content}
              </div>
            </div>
          )}
        </div>
      </SectionCard>
    </div>
  );
}
