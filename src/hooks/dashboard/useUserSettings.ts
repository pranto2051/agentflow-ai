import { useState } from 'react';
import useSWR from 'swr';
import { UserSettings } from '@/types/dashboard';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useUserSettings() {
  const { data, error, isLoading, mutate } = useSWR<UserSettings>('/api/user/settings', fetcher);
  const [isSaving, setIsSaving] = useState(false);

  const updateProfile = async (profileData: any) => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/user/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData)
      });
      if (res.ok) mutate();
      return res.json();
    } finally {
      setIsSaving(false);
    }
  };

  const uploadAvatar = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const res = await fetch('/api/user/settings/avatar', {
      method: 'POST',
      body: formData
    });
    if (res.ok) mutate();
    return res.json();
  };

  const changePassword = async (currentPass: string, newPass: string) => {
    const res = await fetch('/api/user/settings/password', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword: currentPass, newPassword: newPass })
    });
    return res.json();
  };

  const deleteAccount = async (confirmation: string) => {
    const res = await fetch('/api/user/settings/account', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ confirmation })
    });
    return res.json();
  };

  const saveMemory = async (memory: any) => {
    const res = await fetch('/api/ai/memory', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(memory)
    });
    if (res.ok) mutate();
    return res.json();
  };

  return {
    settings: data,
    isLoading,
    error,
    isSaving,
    updateProfile,
    uploadAvatar,
    changePassword,
    deleteAccount,
    saveMemory
  };
}
