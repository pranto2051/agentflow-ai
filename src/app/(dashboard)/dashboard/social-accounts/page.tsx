'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/dashboard/shared/PageHeader';
import { ConnectionStatusBar } from '@/components/dashboard/social-accounts/ConnectionStatusBar';
import { SocialAccountCard } from '@/components/dashboard/social-accounts/SocialAccountCard';
import { PostHistoryCard } from '@/components/dashboard/social-accounts/PostHistoryCard';
import { ConnectFlowModal } from '@/components/dashboard/social-accounts/ConnectFlowModal';
import { DisconnectConfirmDialog } from '@/components/dashboard/social-accounts/DisconnectConfirmDialog';
import { useSocialAccounts } from '@/hooks/dashboard/useSocialAccounts';
import { pageIn, stagger, cardIn } from '@/lib/animations/dashboard';

export default function SocialAccountsPage() {
  const { accounts, totalConnected, platforms, connectAccount, disconnectAccount, refreshToken, isLoading } = useSocialAccounts();

  const [connectModalOpen, setConnectModalOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);

  const [disconnectModalOpen, setDisconnectModalOpen] = useState(false);
  const [accountToDisconnect, setAccountToDisconnect] = useState<string | null>(null);
  const [platformToDisconnect, setPlatformToDisconnect] = useState<string | null>(null);

  const handleConnectClick = (platform: string) => {
    setSelectedPlatform(platform);
    setConnectModalOpen(true);
  };

  const handleDisconnectClick = (id: string) => {
    const acc = accounts.find(a => a.id === id);
    if (acc) {
      setAccountToDisconnect(id);
      setPlatformToDisconnect(acc.platform);
      setDisconnectModalOpen(true);
    }
  };

  const getAccountForPlatform = (platform: string) => accounts.find(a => a.platform === platform);

  // Mock recent posts
  const recentPosts: any[] = [
    { id: '1', platform: 'linkedin', content: 'Learning about agentic AI and its future implications...', status: 'published', published_at: new Date().toISOString() },
    { id: '2', platform: 'twitter', content: 'Just deployed my first Next.js 14 app! #buildinpublic', status: 'published', published_at: new Date(Date.now() - 86400000).toISOString() },
    { id: '3', platform: 'facebook', content: 'We are launching something special tomorrow.', status: 'failed', generated_at: new Date(Date.now() - 172800000).toISOString() },
  ];

  return (
    <motion.div variants={pageIn} initial="initial" animate="animate" className="h-full flex flex-col pb-20 md:pb-0">
      <PageHeader 
        title="Social Accounts" 
        subtitle="Manage your connected platforms and tokens" 
      />

      <ConnectionStatusBar totalConnected={totalConnected} platforms={platforms as any} />

      <motion.div variants={stagger} initial="initial" animate="animate" className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div variants={cardIn}>
          <SocialAccountCard 
            platform="linkedin" 
            account={getAccountForPlatform('linkedin')} 
            onConnect={handleConnectClick}
            onDisconnect={handleDisconnectClick}
            onRefresh={refreshToken}
          />
        </motion.div>
        <motion.div variants={cardIn}>
          <SocialAccountCard 
            platform="twitter" 
            account={getAccountForPlatform('twitter')} 
            onConnect={handleConnectClick}
            onDisconnect={handleDisconnectClick}
            onRefresh={refreshToken}
          />
        </motion.div>
        <motion.div variants={cardIn}>
          <SocialAccountCard 
            platform="facebook" 
            account={getAccountForPlatform('facebook')} 
            onConnect={handleConnectClick}
            onDisconnect={handleDisconnectClick}
            onRefresh={refreshToken}
          />
        </motion.div>
      </motion.div>

      <PostHistoryCard posts={recentPosts} />

      <ConnectFlowModal 
        platform={selectedPlatform} 
        open={connectModalOpen} 
        onClose={() => setConnectModalOpen(false)}
        onConfirm={(p) => { connectAccount(p); }}
      />

      <DisconnectConfirmDialog
        platform={platformToDisconnect}
        open={disconnectModalOpen}
        onClose={() => setDisconnectModalOpen(false)}
        onConfirm={() => { if (accountToDisconnect) disconnectAccount(accountToDisconnect); }}
      />
    </motion.div>
  );
}
