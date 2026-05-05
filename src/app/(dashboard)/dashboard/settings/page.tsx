'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHeader } from '@/components/dashboard/shared/PageHeader';
import { ProfileTab } from '@/components/dashboard/settings/ProfileTab';
import { AIPreferencesTab } from '@/components/dashboard/settings/AIPreferencesTab';
import { NotificationsTab } from '@/components/dashboard/settings/NotificationsTab';
import { DangerZoneTab } from '@/components/dashboard/settings/DangerZoneTab';
import { useUserSettings } from '@/hooks/dashboard/useUserSettings';
import { pageIn } from '@/lib/animations/dashboard';

export default function SettingsPage() {
  const { settings, isLoading, updateSettings } = useUserSettings();
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'ai', label: 'AI Memory' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'danger', label: 'Danger Zone' }
  ];

  const handleSave = async (data: any) => {
    setIsSaving(true);
    await updateSettings(data);
    setTimeout(() => setIsSaving(false), 800);
  };

  return (
    <motion.div variants={pageIn} initial="initial" animate="animate" className="h-full flex flex-col pb-20 md:pb-0">
      <PageHeader 
        title="Settings" 
        subtitle="Manage your account and preferences" 
      />

      <div className="flex flex-col md:flex-row gap-8 mt-4">
        {/* Sidebar Nav */}
        <div className="w-full md:w-[200px] shrink-0">
          <nav className="flex md:flex-col overflow-x-auto custom-scrollbar border-b md:border-b-0 md:border-l border-border-subtle">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-left px-4 py-3 text-[13px] font-medium transition-colors whitespace-nowrap md:border-l-2 -ml-[2px] ${
                  activeTab === tab.id 
                    ? 'text-brand-violet border-brand-violet bg-[rgba(124,58,237,0.05)] md:border-b-0 border-b-2' 
                    : 'text-txt-secondary border-transparent hover:text-txt hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          {isLoading ? (
            <div className="animate-pulse">
              <div className="h-[400px] max-w-2xl rounded-xl bg-white/5" />
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {activeTab === 'profile' && <ProfileTab key="profile" settings={settings} updateSettings={handleSave} isSaving={isSaving} />}
              {activeTab === 'ai' && <AIPreferencesTab key="ai" settings={settings} updateSettings={handleSave} isSaving={isSaving} />}
              {activeTab === 'notifications' && <NotificationsTab key="notif" settings={settings} updateSettings={handleSave} isSaving={isSaving} />}
              {activeTab === 'danger' && <DangerZoneTab key="danger" />}
            </AnimatePresence>
          )}
        </div>
      </div>
    </motion.div>
  );
}
