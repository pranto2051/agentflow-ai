'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, CalendarDays, Send, RefreshCw } from 'lucide-react';
import { Message } from '@/types/dashboard';
import { PlatformBadge } from '@/components/dashboard/shared/PlatformBadge';

interface ChatMessageProps {
  message: Message;
  onPublish: (post: any) => void;
  onCopy: (content: string) => void;
  onRegenerate: (id: string) => void;
}

export function ChatMessage({ message, onPublish, onCopy, onRegenerate }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const [displayedContent, setDisplayedContent] = useState('');

  // Typewriter effect for AI response
  useEffect(() => {
    if (isUser || message.isLoading) {
      setDisplayedContent(message.content);
      return;
    }

    let i = 0;
    const interval = setInterval(() => {
      setDisplayedContent(message.content.substring(0, i));
      i++;
      if (i > message.content.length) clearInterval(interval);
    }, 10);

    return () => clearInterval(interval);
  }, [message.content, isUser, message.isLoading]);

  if (isUser) {
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end w-full mb-6">
        <div className="flex gap-3 max-w-[85%]">
          <div className="bg-[rgba(124,58,237,0.14)] border border-[rgba(124,58,237,0.22)] rounded-[16px] rounded-tr-[4px] px-5 py-3 text-[14px] text-txt leading-relaxed font-sans shadow-sm">
            {message.content}
          </div>
          <div className="w-8 h-8 rounded-full bg-white/10 flex-shrink-0 flex items-center justify-center text-[12px] font-bold text-txt-secondary border border-border-subtle">
            ME
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full mb-8">
      <div className="w-full dash-card bg-bg-surface/50 border-border-subtle p-0 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-border-subtle bg-black/20">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-space font-bold text-brand-violet-light tracking-wide uppercase">
              ⚡ AgentFlow AI
            </span>
            <span className="px-1.5 py-0.5 rounded border border-border-medium bg-white/5 text-[9px] font-mono text-txt-muted uppercase tracking-wider">
              Gemini 1.5 Flash
            </span>
          </div>
          <span className="text-[11px] text-txt-muted font-medium">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        {/* Content Box */}
        <div className="p-5">
          {message.isLoading ? (
            <div className="flex items-center gap-2 text-txt-muted italic text-[13px]">
              <span className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-violet animate-bounce" style={{ animationDelay: '0ms' }}/>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-violet animate-bounce" style={{ animationDelay: '150ms' }}/>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-violet animate-bounce" style={{ animationDelay: '300ms' }}/>
              </span>
              AI is writing your post...
            </div>
          ) : (
            <>
              <div className="bg-[rgba(255,255,255,0.025)] border border-border-subtle rounded-xl p-5 mb-4 font-mono text-[13px] leading-[1.7] text-txt whitespace-pre-wrap">
                {displayedContent}
              </div>

              {message.post?.hashtags && message.post.hashtags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {message.post.hashtags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 rounded-full border border-brand-border bg-brand-bg text-txt-brand text-[11px] font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {message.post && (
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6 pt-4 border-t border-border-subtle">
                  <div className="flex items-center gap-3 text-[10px] font-mono text-txt-muted uppercase tracking-wider">
                    <span>1,247 tokens</span>
                    <span>&middot;</span>
                    <span>1.2s</span>
                    <span>&middot;</span>
                    <PlatformBadge platform={message.post.platform} size="sm" />
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button onClick={() => onCopy(message.content)} className="h-8 px-3 rounded border border-border-subtle text-[12px] font-medium text-txt-secondary hover:bg-white/10 flex items-center gap-1.5 transition-colors">
                      <Copy size={14} /> Copy
                    </button>
                    <button onClick={() => onRegenerate(message.id)} className="h-8 px-3 rounded border border-border-subtle text-[12px] font-medium text-txt-secondary hover:bg-white/10 flex items-center gap-1.5 transition-colors">
                      <RefreshCw size={14} /> Regenerate
                    </button>
                    <button className="h-8 px-3 rounded border border-border-subtle text-[12px] font-medium text-txt-secondary hover:bg-white/10 flex items-center gap-1.5 transition-colors">
                      <CalendarDays size={14} /> Schedule
                    </button>
                    <button onClick={() => onPublish(message.post)} className="h-8 px-4 rounded bg-[var(--brand-gradient)] text-white text-[12px] font-medium flex items-center gap-1.5 shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] transition-all">
                      <Send size={14} /> Publish Now
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
