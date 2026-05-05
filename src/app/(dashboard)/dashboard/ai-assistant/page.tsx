'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';
import { UsageMeter } from '@/components/dashboard/ai-assistant/UsageMeter';
import { ConversationArea } from '@/components/dashboard/ai-assistant/ConversationArea';
import { AICommandInput } from '@/components/dashboard/ai-assistant/AICommandInput';
import { AIMemoryPanel } from '@/components/dashboard/ai-assistant/AIMemoryPanel';
import { PublishDrawer } from '@/components/dashboard/ai-assistant/PublishDrawer';
import { useAIAssistant } from '@/hooks/dashboard/useAIAssistant';
import { useUserSettings } from '@/hooks/dashboard/useUserSettings';
import { pageIn } from '@/lib/animations/dashboard';

export default function AIAssistantPage() {
  const { 
    messages, isGenerating, generate, dailyRemaining, history,
    selectedPlatform, setSelectedPlatform,
    selectedTone, setSelectedTone,
    useMemory, setUseMemory
  } = useAIAssistant();
  
  const { settings } = useUserSettings();

  const [memoryOpen, setMemoryOpen] = useState(false);
  const [publishOpen, setPublishOpen] = useState(false);
  const [activePost, setActivePost] = useState<any>(null);

  const handlePublish = (post: any) => {
    setActivePost(post);
    setPublishOpen(true);
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const handleRegenerate = (id: string) => {
    // Regenerate logic
  };

  return (
    <motion.div variants={pageIn} initial="initial" animate="animate" className="h-[calc(100vh-64px)] flex flex-col md:flex-row overflow-hidden relative -mx-4 md:-mx-8 -my-4 md:-my-8">
      
      <div className="flex-1 flex flex-col min-w-0 h-full relative">
        <UsageMeter used={50 - dailyRemaining} total={50} />
        
        <div className="absolute top-4 right-4 z-20 md:hidden">
          <button 
            onClick={() => setMemoryOpen(!memoryOpen)}
            className="w-8 h-8 rounded-full bg-bg-card border border-border-subtle flex items-center justify-center text-txt-muted hover:text-txt"
          >
            <Brain size={14} />
          </button>
        </div>

        <ConversationArea 
          messages={messages} 
          isGenerating={isGenerating} 
          onQuickStart={generate}
          onPublish={handlePublish}
          onCopy={handleCopy}
          onRegenerate={handleRegenerate}
        />
        
        <div className="px-2 lg:px-8 pb-4">
          <AICommandInput 
            onSubmit={generate}
            isGenerating={isGenerating}
            selectedPlatform={selectedPlatform}
            setSelectedPlatform={setSelectedPlatform}
            selectedTone={selectedTone}
            setSelectedTone={setSelectedTone}
            useMemory={useMemory}
            setUseMemory={setUseMemory}
            dailyRemaining={dailyRemaining}
          />
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <AIMemoryPanel 
          open={true} 
          onClose={() => {}} 
          memory={settings?.memory || {tone: 'Professional', industry: '', writing_style: '', topics: [], about_me: ''}}
          history={history}
        />
      </div>

      {/* Mobile overlay sidebar */}
      <div className="md:hidden">
        <AIMemoryPanel 
          open={memoryOpen} 
          onClose={() => setMemoryOpen(false)} 
          memory={settings?.memory || {tone: 'Professional', industry: '', writing_style: '', topics: [], about_me: ''}}
          history={history}
        />
      </div>

      <PublishDrawer 
        open={publishOpen} 
        onClose={() => setPublishOpen(false)} 
        post={activePost} 
      />

    </motion.div>
  );
}
