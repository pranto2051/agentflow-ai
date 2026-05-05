'use client';

import React from 'react';
import { ExternalLink, Heart, MessageCircle, Share2, Eye } from 'lucide-react';
import { PlatformBadge } from '@/components/dashboard/shared/PlatformBadge';

interface TopPerformingPostsProps {
  posts: any[];
}

export function TopPerformingPosts({ posts }: TopPerformingPostsProps) {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <div className="dash-card mt-6">
      <div className="p-5 border-b border-border-subtle">
        <h2 className="font-space text-[16px] font-bold text-txt">Top Performing Posts</h2>
        <p className="text-[12px] text-txt-muted mt-1">Posts with the highest engagement across platforms</p>
      </div>

      <div className="divide-y divide-border-subtle">
        {posts.map((post, i) => (
          <div key={post.id} className="p-5 flex flex-col md:flex-row gap-4 hover:bg-white/5 transition-colors">
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 text-[11px] text-txt-muted">
                <PlatformBadge platform={post.platform} size="sm" />
                <span>Published on {new Date(post.published_at).toLocaleDateString()}</span>
              </div>
              <p className="font-mono text-[13px] text-txt-secondary line-clamp-2 leading-relaxed">
                {post.content}
              </p>
            </div>

            <div className="flex items-center gap-6 shrink-0 md:pl-6 md:border-l border-border-subtle">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1.5 text-brand-violet-light font-bold text-[14px]">
                  <Eye size={14} /> {post.impressions?.toLocaleString() || 0}
                </div>
                <span className="text-[9px] uppercase tracking-wider text-txt-muted mt-1">Views</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1.5 text-green font-bold text-[14px]">
                  <Heart size={14} /> {post.likes?.toLocaleString() || 0}
                </div>
                <span className="text-[9px] uppercase tracking-wider text-txt-muted mt-1">Likes</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1.5 text-cyan font-bold text-[14px]">
                  <MessageCircle size={14} /> {post.comments?.toLocaleString() || 0}
                </div>
                <span className="text-[9px] uppercase tracking-wider text-txt-muted mt-1">Comments</span>
              </div>

              <a href="#" className="w-8 h-8 rounded-full bg-bg-card border border-border-subtle flex items-center justify-center text-txt-muted hover:text-txt hover:border-brand-violet transition-colors ml-2">
                <ExternalLink size={14} />
              </a>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
