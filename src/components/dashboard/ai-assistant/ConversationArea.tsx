'use client';

import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Edit3, MessageSquare } from 'lucide-react';
import { Message } from '@/types/dashboard';
import { ChatMessage } from './ChatMessage';

interface ConversationAreaProps {
  messages: Message[];
  isGenerating: boolean;
  onQuickStart: (prompt: string) => void;
  onPublish: (post: any) => void;
  onCopy: (content: string) => void;
  onRegenerate: (id: string) => void;
}

export function ConversationArea({ messages, isGenerating, onQuickStart, onPublish, onCopy, onRegenerate }: ConversationAreaProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, isGenerating]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-4 overflow-y-auto">
        <div className="w-16 h-16 rounded-2xl bg-brand-bg border border-brand-border flex items-center justify-center text-3xl mb-6 shadow-[0_0_40px_rgba(124,58,237,0.15)] relative">
          ✨
          <div className="absolute inset-0 bg-[var(--brand-gradient)] blur-xl opacity-20 rounded-2xl" />
        </div>
        
        <h2 className="font-space text-[22px] font-bold text-txt mb-2 text-center tracking-tight">
          Start a conversation with your AI Agent
        </h2>
        
        <p className="text-[14px] text-txt-muted max-w-[400px] text-center mb-10">
          Tell me what you want to post and I'll write it for you, perfectly tailored to your tone and platform.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-[600px]">
          {[
            { title: "I learned Docker today — write a LinkedIn post", icon: Edit3 },
            { title: "Summarize my React learning this week for Twitter", icon: Sparkles },
            { title: "I launched my freelance business — make an announcement", icon: MessageSquare },
            { title: "Share 3 tips for junior developers on interviewing", icon: Sparkles }
          ].map((card, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onQuickStart(card.title)}
              className="p-4 rounded-xl border border-border-subtle bg-bg-card hover:bg-white/5 hover:border-border-soft text-left group transition-all"
            >
              <card.icon size={16} className="text-txt-muted group-hover:text-brand-violet transition-colors mb-2" />
              <p className="text-[13px] font-medium text-txt-secondary group-hover:text-txt transition-colors">
                "{card.title}"
              </p>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar px-2 lg:px-8 pt-4 pb-10">
      <div className="max-w-[800px] mx-auto w-full">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <ChatMessage 
              key={msg.id} 
              message={msg} 
              onPublish={onPublish}
              onCopy={onCopy}
              onRegenerate={onRegenerate}
            />
          ))}
          {isGenerating && (
            <ChatMessage 
              key="generating"
              message={{ id: 'gen', role: 'assistant', content: '', timestamp: '', isLoading: true }}
              onPublish={() => {}} onCopy={() => {}} onRegenerate={() => {}}
            />
          )}
        </AnimatePresence>
        <div ref={bottomRef} className="h-4" />
      </div>
    </div>
  );
}
