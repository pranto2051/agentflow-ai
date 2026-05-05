import { useState } from 'react';
import useSWR from 'swr';
import { SocialAccount } from '@/types/dashboard';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useSocialAccounts() {
  const [connecting, setConnecting] = useState<string | null>(null);
  const { data, error, isLoading, mutate } = useSWR('/api/social/accounts', fetcher);

  const connectAccount = async (platform: string) => {
    setConnecting(platform);
    try {
      const res = await fetch(`/api/social/connect/${platform}`);
      const data = await res.json();
      if (data.authUrl) {
        window.location.href = data.authUrl;
      }
    } finally {
      setConnecting(null);
    }
  };

  const disconnectAccount = async (id: string) => {
    const res = await fetch(`/api/social/accounts/${id}`, { method: 'DELETE' });
    if (res.ok) mutate();
  };

  const refreshToken = async (id: string) => {
    const res = await fetch(`/api/social/accounts/refresh/${id}`, { method: 'POST' });
    if (res.ok) mutate();
  };

  return {
    accounts: (data?.accounts || []) as SocialAccount[],
    totalConnected: data?.totalConnected || 0,
    platforms: data?.platforms || {},
    isLoading,
    error,
    connecting,
    connectAccount,
    disconnectAccount,
    refreshToken
  };
}
