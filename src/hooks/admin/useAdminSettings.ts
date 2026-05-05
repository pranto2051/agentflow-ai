"use client";

import useSWR from 'swr'
import { useState, useCallback } from 'react'
import type { AllAdminSettings, SettingsTab } from '@/types/admin-settings'
import { toast } from 'sonner'

export function useAdminSettings() {
  const { data, error, isLoading, mutate } = useSWR<AllAdminSettings>(
    '/api/admin/settings',
    (url) => fetch(url).then(r => r.json()),
    { revalidateOnFocus: false }
  )

  // Local draft state — holds unsaved changes
  const [draft, setDraft] = useState<Partial<AllAdminSettings>>({})
  // Track which tabs have been modified
  const [dirtyTabs, setDirtyTabs] = useState<Set<SettingsTab>>(new Set())
  const [saving, setSaving] = useState<SettingsTab | null>(null)
  const [lastSaved, setLastSaved] = useState<string | null>(null)

  // Update a specific setting key in the draft
  const updateSetting = useCallback(<K extends keyof AllAdminSettings>(
    tab: K,
    value: Partial<AllAdminSettings[K]>
  ) => {
    setDraft(prev => ({
      ...prev,
      [tab]: { ...(prev[tab] ?? data?.[tab] ?? {}), ...value } as AllAdminSettings[K]
    }))
    setDirtyTabs(prev => new Set(prev).add(tab as SettingsTab))
  }, [data])

  // Save a single tab
  const saveTab = useCallback(async (tab: SettingsTab) => {
    if (!draft[tab as keyof AllAdminSettings]) return { success: true }
    setSaving(tab)
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          key: tab, 
          value: { ...(data?.[tab as keyof AllAdminSettings] ?? {}), ...draft[tab as keyof AllAdminSettings] } 
        })
      })
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to save settings');
      }
      
      await mutate()
      setDirtyTabs(prev => { 
        const s = new Set(prev); 
        s.delete(tab); 
        return s; 
      })
      
      // Clear draft for this tab
      setDraft(prev => {
        const next = { ...prev };
        delete next[tab as keyof AllAdminSettings];
        return next;
      });

      setLastSaved(new Date().toISOString())
      toast.success(`${tab.charAt(0).toUpperCase() + tab.slice(1)} settings saved`);
      return { success: true }
    } catch (err) {
      toast.error(`Error saving ${tab}: ${String(err)}`);
      return { success: false, error: String(err) }
    } finally {
      setSaving(null)
    }
  }, [draft, data, mutate])

  // Save ALL dirty tabs at once
  const saveAll = useCallback(async () => {
    const results = await Promise.all(
      Array.from(dirtyTabs).map(tab => saveTab(tab))
    )
    return results.every(r => r.success)
  }, [dirtyTabs, saveTab])

  // Get current value (draft takes priority over server data)
  const getValue = useCallback(<K extends keyof AllAdminSettings>(tab: K): AllAdminSettings[K] | undefined => {
    if (!data && !draft[tab]) return undefined;
    return { ...(data?.[tab] ?? {}), ...(draft[tab] ?? {}) } as AllAdminSettings[K]
  }, [data, draft])

  return {
    settings: data,
    getValue,
    isLoading,
    error,
    updateSetting,
    saveTab,
    saveAll,
    saving,
    lastSaved,
    isDirty: dirtyTabs.size > 0,
    dirtyTabs,
  }
}
