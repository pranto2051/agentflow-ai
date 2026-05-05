'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { stagger, cardIn } from '@/lib/animations/dashboard';
import { Eye, ThumbsUp, MessageSquare, Share2, TrendingUp, TrendingDown } from 'lucide-react';
import { StatCard } from '@/components/dashboard/shared/StatCard';

interface AnalyticsStatsRowProps {
  stats: {
    totalImpressions: number;
    impressionsTrend: number;
    totalEngagements: number;
    engagementsTrend: number;
    avgClickRate: number;
    clickRateTrend: number;
    postsPublished: number;
  };
}

export function AnalyticsStatsRow({ stats }: AnalyticsStatsRowProps) {
  if (!stats) return null;
  
  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
  };

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <TrendingUp size={12} className="text-green" />;
    if (trend < 0) return <TrendingDown size={12} className="text-red" />;
    return null;
  };

  const getTrendColor = (trend: number) => {
    if (trend > 0) return 'text-green';
    if (trend < 0) return 'text-red';
    return 'text-txt-muted';
  };

  return (
    <motion.div variants={stagger} initial="initial" animate="animate" className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <motion.div variants={cardIn} className="dash-card p-5 flex flex-col justify-between h-[120px]">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-medium text-txt-secondary uppercase tracking-wider">Impressions</span>
          <div className="w-8 h-8 rounded-full bg-brand-bg/50 flex items-center justify-center text-brand-violet"><Eye size={16}/></div>
        </div>
        <div>
          <div className="font-space text-[28px] font-bold text-txt">{formatNumber(stats.totalImpressions)}</div>
          <div className="flex items-center gap-1.5 mt-1">
            {getTrendIcon(stats.impressionsTrend)}
            <span className={`text-[12px] font-medium ${getTrendColor(stats.impressionsTrend)}`}>
              {Math.abs(stats.impressionsTrend)}%
            </span>
            <span className="text-[11px] text-txt-muted">vs last period</span>
          </div>
        </div>
      </motion.div>

      <motion.div variants={cardIn} className="dash-card p-5 flex flex-col justify-between h-[120px]">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-medium text-txt-secondary uppercase tracking-wider">Engagements</span>
          <div className="w-8 h-8 rounded-full bg-cyan/10 flex items-center justify-center text-cyan"><ThumbsUp size={16}/></div>
        </div>
        <div>
          <div className="font-space text-[28px] font-bold text-txt">{formatNumber(stats.totalEngagements)}</div>
          <div className="flex items-center gap-1.5 mt-1">
            {getTrendIcon(stats.engagementsTrend)}
            <span className={`text-[12px] font-medium ${getTrendColor(stats.engagementsTrend)}`}>
              {Math.abs(stats.engagementsTrend)}%
            </span>
            <span className="text-[11px] text-txt-muted">vs last period</span>
          </div>
        </div>
      </motion.div>

      <motion.div variants={cardIn} className="dash-card p-5 flex flex-col justify-between h-[120px]">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-medium text-txt-secondary uppercase tracking-wider">Avg Click Rate</span>
          <div className="w-8 h-8 rounded-full bg-amber/10 flex items-center justify-center text-amber"><Share2 size={16}/></div>
        </div>
        <div>
          <div className="font-space text-[28px] font-bold text-txt">{stats.avgClickRate}%</div>
          <div className="flex items-center gap-1.5 mt-1">
            {getTrendIcon(stats.clickRateTrend)}
            <span className={`text-[12px] font-medium ${getTrendColor(stats.clickRateTrend)}`}>
              {Math.abs(stats.clickRateTrend)}%
            </span>
            <span className="text-[11px] text-txt-muted">vs last period</span>
          </div>
        </div>
      </motion.div>

      <motion.div variants={cardIn} className="dash-card p-5 flex flex-col justify-between h-[120px]">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-medium text-txt-secondary uppercase tracking-wider">Posts Published</span>
          <div className="w-8 h-8 rounded-full bg-green/10 flex items-center justify-center text-green"><MessageSquare size={16}/></div>
        </div>
        <div>
          <div className="font-space text-[28px] font-bold text-txt">{stats.postsPublished}</div>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-[11px] text-txt-muted">Across all networks</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
