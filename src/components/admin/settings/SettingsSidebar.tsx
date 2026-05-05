"use client";

import { SettingsTab } from "@/types/admin-settings";
import { 
  Settings2, 
  Brain, 
  Mail, 
  Layers, 
  Share2, 
  Users2, 
  Wrench, 
  TriangleAlert,
  Loader2,
  Save
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { stagger } from "@/lib/animations/admin";

interface SettingsSidebarProps {
  activeTab: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
  dirtyTabs: Set<SettingsTab>;
  isSavingAll?: boolean;
  onSaveAll?: () => void;
}

export function SettingsSidebar({
  activeTab,
  onTabChange,
  dirtyTabs,
  isSavingAll,
  onSaveAll,
}: SettingsSidebarProps) {
  const groups = [
    {
      label: "Platform",
      items: [
        { id: "general" as SettingsTab, label: "General", icon: <Settings2 size={16} /> },
        { id: "ai" as SettingsTab, label: "AI Configuration", icon: <Brain size={16} /> },
        { id: "email" as SettingsTab, label: "Email & Alerts", icon: <Mail size={16} /> },
        { id: "quotas" as SettingsTab, label: "Quotas & Plans", icon: <Layers size={16} /> },
      ],
    },
    {
      label: "Integrations",
      items: [
        { id: "social" as SettingsTab, label: "Social API Keys", icon: <Share2 size={16} /> },
        { id: "admins" as SettingsTab, label: "Admin Accounts", icon: <Users2 size={16} /> },
      ],
    },
    {
      label: "System",
      items: [
        { id: "maintenance" as SettingsTab, label: "Maintenance", icon: <Wrench size={16} /> },
        { id: "advanced" as SettingsTab, label: "Advanced", icon: <TriangleAlert size={16} />, color: "text-red-400/60" },
      ],
    },
  ];

  return (
    <div className="w-[220px] h-[calc(100vh-140px)] flex flex-col border-r border-white/5 pr-4 sticky top-[120px]">
      <div className="mb-6 px-2">
        <h2 className="text-[10px] font-bold text-admin-orange uppercase tracking-[0.9px]">
          Admin Settings
        </h2>
        <p className="text-[10px] text-txt-muted">Platform Control Center</p>
      </div>

      <motion.div 
        variants={stagger}
        initial="initial"
        animate="animate"
        className="flex-1 space-y-6 overflow-y-auto pr-2 custom-scrollbar"
      >
        {groups.map((group) => (
          <div key={group.label} className="space-y-1">
            <h3 className="px-2 text-[9px] font-bold text-txt-muted uppercase tracking-[1.2px] mb-2">
              {group.label}
            </h3>
            {group.items.map((item) => (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={cn(
                  "relative w-full h-9 px-3 rounded-[8px] flex items-center gap-3 transition-all duration-200 group",
                  activeTab === item.id
                    ? "bg-admin-orange-bg text-txt-orange border border-admin-orange-border"
                    : "text-txt-muted hover:bg-white/5 hover:text-txt-secondary"
                )}
              >
                <div className={cn("shrink-0", item.color)}>
                  {item.icon}
                </div>
                <span className="text-[12px] font-medium truncate">{item.label}</span>
                
                {dirtyTabs.has(item.id) && (
                  <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                )}

                {activeTab === item.id && (
                  <div className="absolute left-0 top-2 bottom-2 w-[2px] bg-admin-orange rounded-full" />
                )}
              </button>
            ))}
          </div>
        ))}
      </motion.div>

      <div className="pt-6 border-t border-white/5 space-y-3">
        <button
          onClick={onSaveAll}
          disabled={dirtyTabs.size === 0 || isSavingAll}
          className={cn(
            "w-full h-10 rounded-[10px] flex items-center justify-center gap-2 text-[12px] font-bold uppercase tracking-wider transition-all duration-300",
            dirtyTabs.size > 0
              ? "bg-linear-to-r from-orange-600 to-orange-500 text-white shadow-lg shadow-orange-900/20 hover:scale-[1.02] active:scale-[0.98]"
              : "bg-white/5 text-txt-muted cursor-not-allowed"
          )}
        >
          {isSavingAll ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Save size={14} />
          )}
          <span>Save Changes {dirtyTabs.size > 0 && `(${dirtyTabs.size})`}</span>
        </button>
        <p className="text-center text-[10px] text-txt-muted italic">
          Last saved: Just now
        </p>
      </div>
    </div>
  );
}
