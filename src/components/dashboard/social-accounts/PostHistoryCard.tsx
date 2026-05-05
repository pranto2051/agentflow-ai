'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Filter } from 'lucide-react';
import { GeneratedPost } from '@/types/dashboard';
import { PlatformBadge } from '@/components/dashboard/shared/PlatformBadge';
import { StatusBadge } from '@/components/dashboard/shared/StatusBadge';

interface PostHistoryCardProps {
  posts: GeneratedPost[];
}

export function PostHistoryCard({ posts }: PostHistoryCardProps) {
  const [filter, setFilter] = useState<'all'|'linkedin'|'twitter'|'facebook'>('all');

  const filteredPosts = posts.filter(p => filter === 'all' || p.platform === filter);

  return (
    <div className="dash-card mt-6">
      <div className="p-5 border-b border-border-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-space text-[16px] font-bold text-txt">Recent Publications</h2>
          <p className="text-[12px] text-txt-muted mt-1">Your latest automated posts across all networks</p>
        </div>
        
        <div className="flex items-center gap-1.5 p-1 bg-bg-surface border border-border-subtle rounded-lg">
          {['all', 'linkedin', 'twitter', 'facebook'].map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-3 py-1.5 rounded-md text-[12px] font-medium capitalize transition-colors ${filter === f ? 'bg-white/10 text-txt shadow-sm' : 'text-txt-muted hover:text-txt'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="divide-y divide-border-subtle">
        {filteredPosts.length === 0 ? (
          <div className="p-8 text-center text-txt-muted text-[13px]">No posts found for this filter.</div>
        ) : (
          filteredPosts.slice(0, 10).map((post, i) => (
            <motion.div 
              key={post.id} 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
              className="p-5 hover:bg-white/5 transition-colors group flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <div className="w-[120px] shrink-0">
                <PlatformBadge platform={post.platform} />
                <div className="text-[11px] text-txt-muted mt-2">{new Date(post.published_at || post.generated_at).toLocaleDateString()}</div>
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="font-mono text-[12px] text-txt-secondary line-clamp-2 leading-relaxed">
                  {post.content}
                </p>
              </div>
              
              <div className="flex items-center gap-4 shrink-0 justify-between sm:justify-end">
                <StatusBadge status={post.status} />
                {post.status === 'published' && (
                  <a href="#" className="p-1.5 rounded-md text-txt-muted hover:text-txt hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>

      {filteredPosts.length > 0 && (
        <div className="p-4 border-t border-border-subtle text-center bg-bg-surface">
          <button className="text-[12px] font-medium text-brand-violet hover:underline">
            View all in Analytics &rarr;
          </button>
        </div>
      )}
    </div>
  );
}
