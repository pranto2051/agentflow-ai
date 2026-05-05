"use client";

import { useState } from "react";
import { SettingsSidebar } from "@/components/admin/settings/SettingsSidebar";
import { useAdminSettings } from "@/hooks/admin/useAdminSettings";
import { SettingsTab } from "@/types/admin-settings";
import { GeneralTab } from "@/components/admin/settings/tabs/GeneralTab";
import { AIConfigTab } from "@/components/admin/settings/tabs/AIConfigTab";
import { EmailTab } from "@/components/admin/settings/tabs/EmailTab";
import { QuotasTab } from "@/components/admin/settings/tabs/QuotasTab";
import { SocialTab } from "@/components/admin/settings/tabs/SocialTab";
import { AdminsTab } from "@/components/admin/settings/tabs/AdminsTab";
import { MaintenanceTab } from "@/components/admin/settings/tabs/MaintenanceTab";
import { AdvancedTab } from "@/components/admin/settings/tabs/AdvancedTab";
import { SaveTabButton } from "@/components/admin/settings/shared/SaveTabButton";
import { motion, AnimatePresence } from "framer-motion";
import { pageIn, tabIn } from "@/lib/animations/admin";
import { Loader2 } from "lucide-react";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("general");
  const {
    getValue,
    updateSetting,
    saveTab,
    saveAll,
    isLoading,
    saving,
    dirtyTabs,
    isDirty,
  } = useAdminSettings();

  const renderTab = () => {
    switch (activeTab) {
      case "general":
        return (
          <GeneralTab
            settings={getValue("general")!}
            onChange={(v) => updateSetting("general", v)}
          />
        );
      case "ai":
        return (
          <AIConfigTab
            settings={getValue("ai")!}
            onChange={(v) => updateSetting("ai", v)}
          />
        );
      case "email":
        return (
          <EmailTab
            settings={getValue("email")!}
            onChange={(v) => updateSetting("email", v)}
          />
        );
      case "quotas":
        return (
          <QuotasTab
            settings={getValue("quotas")!}
            onChange={(v) => updateSetting("quotas", v)}
          />
        );
      case "social":
        return (
          <SocialTab
            settings={getValue("social")!}
            onChange={(v) => updateSetting("social", v)}
          />
        );
      case "admins":
        return <AdminsTab />;
      case "maintenance":
        return (
          <MaintenanceTab
            settings={getValue("maintenance")!}
            onChange={(v) => updateSetting("maintenance", v)}
          />
        );
      case "advanced":
        return (
          <AdvancedTab
            settings={getValue("advanced")!}
            onChange={(v) => updateSetting("advanced", v)}
          />
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <Loader2 className="w-8 h-8 text-admin-orange animate-spin" />
        <p className="text-[12px] font-bold text-txt-muted uppercase tracking-widest">
          Loading Platform Settings...
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={pageIn}
      initial="initial"
      animate="animate"
      className="max-w-[1200px] mx-auto"
    >
      {/* Header Area */}
      <div className="flex items-center justify-between mb-8 sticky top-[64px] z-30 bg-background/80 backdrop-blur-md py-4 border-b border-white/5">
        <div>
          <h1 className="text-2xl font-bold font-heading text-txt-primary">
            Settings
          </h1>
          <p className="text-[11px] text-txt-muted uppercase tracking-[1px] mt-0.5">
            Configure global platform behavior & integrations
          </p>
        </div>

        <SaveTabButton
          tab={activeTab}
          isDirty={dirtyTabs.has(activeTab)}
          isSaving={saving === activeTab}
          onClick={() => saveTab(activeTab)}
        />
      </div>

      <div className="flex gap-10">
        {/* Sidebar Navigation */}
        <SettingsSidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          dirtyTabs={dirtyTabs}
          isSavingAll={saving === "general" && dirtyTabs.size > 1} // Simplified for demo
          onSaveAll={saveAll}
        />

        {/* Content Area */}
        <div className="flex-1 min-w-0 pb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={tabIn}
              initial="initial"
              animate="animate"
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderTab()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
