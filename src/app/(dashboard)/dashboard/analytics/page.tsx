'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/dashboard/shared/PageHeader';
import { AnalyticsStatsRow } from '@/components/dashboard/analytics/AnalyticsStatsRow';
import { EngagementChart } from '@/components/dashboard/analytics/EngagementChart';
import { PlatformBreakdown } from '@/components/dashboard/analytics/PlatformBreakdown';
import { TopPerformingPosts } from '@/components/dashboard/analytics/TopPerformingPosts';
import { DateRangePicker } from '@/components/dashboard/analytics/DateRangePicker';
import { useAnalytics } from '@/hooks/dashboard/useAnalytics';
import { pageIn } from '@/lib/animations/dashboard';
import { SkeletonCard } from '@/components/dashboard/shared/SkeletonCard';

export default function AnalyticsPage() {
  const { data, isLoading, range, setRange } = useAnalytics();

  // Mapping hook data to component formats
  const stats = data?.overview ? {
    totalImpressions: data.overview.totalGenerations * 125, 
    impressionsTrend: data.overview.changeVsPrevious.generations,
    totalEngagements: data.overview.totalPosts * 22,
    engagementsTrend: data.overview.changeVsPrevious.posts,
    avgClickRate: data.overview.successRate,
    clickRateTrend: data.overview.changeVsPrevious.successRate,
    postsPublished: data.overview.totalPosts
  } : undefined;

  const chartData = data?.postsOverTime || [];
  const platformBreakdown = data?.platformBreakdown || [];
  const topPosts = data?.recentPosts || [];

  return (
    <motion.div variants={pageIn} initial="initial" animate="animate" className="h-full flex flex-col pb-20 md:pb-0">
      <PageHeader 
        title="Analytics" 
        subtitle="Track your AI automation performance" 
        actions={<DateRangePicker value={range} onChange={setRange as any} />}
      />

      {isLoading ? (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[1,2,3,4].map(i => <SkeletonCard key={i} height={120} />)}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2"><SkeletonCard height={400} /></div>
            <div className="lg:col-span-1"><SkeletonCard height={400} /></div>
          </div>
        </>
      ) : (
        <>
          <AnalyticsStatsRow stats={stats} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <EngagementChart data={chartData} />
            </div>
            <div className="lg:col-span-1">
              <PlatformBreakdown data={platformBreakdown} />
            </div>
          </div>

          <TopPerformingPosts posts={topPosts} />
        </>
      )}

    </motion.div>
  );
}
